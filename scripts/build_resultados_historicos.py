#!/usr/bin/env python3
"""
Serie histórica 2015-2022 por puesto de votación (125 municipios de Antioquia).

Fuente: Registraduría Nacional del Estado Civil, Observatorio, "Histórico de resultados electorales"
(observatorio.registraduria.gov.co/views/electoral/historicos-resultados.php): archivos de votación
mesa a mesa del escrutinio (MMV). Descargados en _originales/registraduria/historico/:
- 2019: comprimidosTwo/MMV_TERRITORIALES2019_ANTIOQUIA.zip  (Gobernación, Asamblea, Alcaldía, Concejo)
- 2022: congreso22/MMV_CONGRESO_2022_ANTIOQUIA.zip (Senado nacional, Cámara Antioquia) y
        anexos/MMV_NACIONAL_PRESIDENTE_2022_1v.zip / _2v.zip
- 2018: anexos/MMV_NACIONAL_PRESIDENTE_2018_1v.zip / _2v.zip (xlsx, sin nombre de puesto)
- 2015: comprimidoThree/2015_ELECCIONES_TERRITORIALES.zip: el "aplicativo de estadísticas" de la
        Registraduría trae los datos en texto plano (app/db/txt/Antioquia.txt), que se extrae del
        instalador con innoextract, sin ejecutarlo. No trae códigos de puesto, solo nombres.
El Congreso 2018 no tiene archivo mesa a mesa en el Observatorio: no se incluye.

Reglas:
- No se guardan cédulas. Circunscripciones especiales (indígenas, afro, CITREP) y JAL no se incluyen.
- Votantes = votos de la corporación en sus mesas (candidatos + listas + blanco + nulos + no marcados).
- Habilitados: el MMV no los trae; quedan en 0 (la app no muestra participación para estas elecciones).
- Los códigos de puesto cambian entre elecciones, así que cada año lleva sus propias ubicaciones.
  Cada puesto se ubica por su NOMBRE dentro del municipio, contra los puestos 2026 con coordenadas y
  la Divipole 2023: igual, equivalente (sin palabras genéricas) o parecido (>= 0,85). Si no cruza:
  zona rural (99) -> la vereda que nombra el puesto; municipios de 20.000 votantes o menos, zona
  urbana -> la cabecera (ambas "aproximada"). Lo demás queda sin ubicar (cuenta en el municipio).
- 2018 no trae nombres de puesto: se toma el nombre del mismo código en 2019 si el número de mesas
  es parecido (+/- 30 %); si no, queda sin ubicar.

Uso: python3 scripts/build_resultados_historicos.py <2015|2018|2019|2022>
Salida: src/data/electoral/resultadosPuestoHistorico/<año>/<slug>.json
"""
import collections, csv, io, json, re, sys, zipfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_puestos_20k import norm, canon, similitud, aceptable  # noqa: E402
from build_puestos_fase_c_antioquia import tokens, contiene, cargar_territorios, punto, centro_poblado  # noqa: E402
from shapely.geometry import shape, Point  # noqa: E402
from shapely.ops import unary_union  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
H = ROOT / '_originales/registraduria/historico'
OUT = ROOT / 'src/data/electoral/resultadosPuestoHistorico'
FUENTE = 'Registraduría Nacional del Estado Civil, Observatorio: histórico de resultados, votación mesa a mesa del escrutinio (MMV)'

ELECCIONES = {  # id -> (nombre, fecha, porCandidato)
    'gobernacion-2019': ('Gobernación 2019', '27-oct-2019', True), 'asamblea-2019': ('Asamblea 2019', '27-oct-2019', False),
    'alcaldia-2019': ('Alcaldía 2019', '27-oct-2019', True), 'concejo-2019': ('Concejo 2019', '27-oct-2019', False),
    'senado-2022': ('Senado 2022', '13-mar-2022', False), 'camara-2022': ('Cámara 2022 (Antioquia)', '13-mar-2022', False),
    'presidente-2022-1': ('Presidencia 2022 · 1.ª vuelta', '29-may-2022', True), 'presidente-2022-2': ('Presidencia 2022 · 2.ª vuelta', '19-jun-2022', True),
    'presidente-2018-1': ('Presidencia 2018 · 1.ª vuelta', '27-may-2018', True), 'presidente-2018-2': ('Presidencia 2018 · 2.ª vuelta', '17-jun-2018', True),
    'gobernacion-2015': ('Gobernación 2015', '25-oct-2015', True), 'asamblea-2015': ('Asamblea 2015', '25-oct-2015', False),
    'alcaldia-2015': ('Alcaldía 2015', '25-oct-2015', True), 'concejo-2015': ('Concejo 2015', '25-oct-2015', False),
}
ORDEN = list(ELECCIONES)


# --- Lectura de las fuentes: filas normalizadas -------------------------------------------------
# (reg municipio 5, código puesto 9 o None, zona 2, nombre puesto, mesa, id elección, cod partido, partido, cod candidato, candidato, votos)

def filas_2019():
    corp = {'GOBERNADOR': 'gobernacion-2019', 'ASAMBLEA': 'asamblea-2019', 'ALCALDE': 'alcaldia-2019', 'CONCEJO': 'concejo-2019'}
    with zipfile.ZipFile(H / 'MMV_TERRITORIALES2019_ANTIOQUIA.zip') as z:
        r = csv.reader(io.TextIOWrapper(z.open('MMV_2019_01_ANTIOQUIA.csv'), encoding='utf-8'))
        next(r)
        for x in r:
            e = corp.get(x[11])
            if e:
                reg = x[0] + x[2]
                yield reg, reg + x[4] + x[5], x[4], x[6], x[7], e, x[13], x[14], x[15], x[16], int(x[17] or 0)


def filas_2022():
    with zipfile.ZipFile(H / 'MMV_CONGRESO_2022_ANTIOQUIA.zip') as z:
        nombre = next(n for n in z.namelist() if n.endswith('.csv'))
        r = csv.reader(io.TextIOWrapper(z.open(nombre), encoding='utf-16'))
        next(r)
        for x in r:
            e = 'senado-2022' if (x[11], x[12]) == ('SENADO', '01') else 'camara-2022' if (x[11], x[12]) == ('CAMARA', '02') else None
            if e:
                reg = x[0] + x[2]
                yield reg, reg + x[4] + x[5], x[4], x[6], x[7], e, x[16], x[17], x[18], x[19], int(x[20] or 0)
    for v in ('1', '2'):
        with zipfile.ZipFile(H / f'MMV_NACIONAL_PRESIDENTE_2022_{v}v.zip') as z:
            f = io.TextIOWrapper(z.open(z.namelist()[0]), encoding='latin1')
            next(f)
            for l in f:
                x = [c.strip() for c in l.rstrip('\r\n').split(';')]
                if x[0] != '01':
                    continue
                reg = x[0] + x[2]
                yield reg, reg + x[4] + x[5], x[4], x[6], x[7], f'presidente-2022-{v}', x[11], x[12], x[13], x[14], int(x[15] or 0)


def nombres_2019():
    """código de puesto 2019 -> (nombre, mesas) para ponerle nombre a los puestos 2018"""
    nom, mesas = {}, collections.defaultdict(set)
    for reg, cod, zona, puesto, mesa, e, *_ in filas_2019():
        if e == 'gobernacion-2019':
            nom[cod] = puesto
            mesas[cod].add(int(mesa))
    return {c: (nom[c], len(mesas[c])) for c in nom}


def filas_2018():
    import openpyxl
    n19 = nombres_2019()
    completos = set()  # nombres completos de la 1.ª vuelta ("IVAN DUQUE"); la 2.ª solo trae "DUQUE"
    for v in ('1', '2'):
        z = H / f'MMV_NACIONAL_PRESIDENTE_2018_{v}v.zip'
        with zipfile.ZipFile(z) as zf:
            ruta = H / 'x' / zf.namelist()[0]
            if not ruta.exists():
                zf.extract(zf.namelist()[0], H / 'x')
        ws = openpyxl.load_workbook(ruta, read_only=True).active
        filas, mesas, col = [], collections.defaultdict(set), None
        for i, x in enumerate(ws.iter_rows(values_only=True)):
            if i == 0:
                h = [str(c).strip() for c in x]
                # 1.ª vuelta: ... PAR, PARTIDO, CODCAN, CANDIDATO, VOTOS; 2.ª vuelta: ... PAR, CAN, CANDIDATO, VOTOS
                col = (h.index('PAR'), h.index('PARTIDO') if 'PARTIDO' in h else None,
                       h.index('CODCAN') if 'CODCAN' in h else h.index('CAN'), h.index('CANDIDATO'), h.index('VOTOS'))
                continue
            if int(x[0]) != 1:
                continue
            reg = '01' + str(x[1]).zfill(3)
            cod = reg + str(x[2]).zfill(2) + str(x[3]).zfill(2)
            mesas[cod].add(int(x[4]))
            cp, cpn, cc, ccn, cv = col
            filas.append((reg, cod, str(x[2]).zfill(2), int(x[4]), str(x[cp]), str(x[cpn] if cpn is not None else ''), str(x[cc]), str(x[ccn]), int(x[cv] or 0)))
        nombre = {}
        for cod, ms in mesas.items():
            n = n19.get(cod)
            nombre[cod] = n[0] if n and abs(len(ms) - n[1]) <= max(1, 0.3 * n[1]) else None
        if v == '1':
            completos = {f[7] for f in filas}
            partido_de = {f[7]: f[5] for f in filas}
        else:
            def completo(n):
                c = [x for x in completos if n.upper() in x.upper().split()]
                return c[0] if len(c) == 1 else n
            filas = [f[:5] + (partido_de.get(completo(f[7]), ''),) + f[6:7] + (completo(f[7]),) + f[8:] for f in filas]
        for reg, cod, zona, mesa, par, pnom, can, cnom, votos in filas:
            # La 2.ª vuelta no trae el nombre del partido: se usa el del candidato
            yield reg, cod, zona, nombre[cod], str(mesa), f'presidente-2018-{v}', par, pnom or cnom, can, cnom, votos


def filas_2015():
    corp = {'GOBERNACION': 'gobernacion-2015', 'ASAMBLEA': 'asamblea-2015', 'ALCALDIA': 'alcaldia-2015', 'CONCEJO': 'concejo-2015'}
    reg_de = {norm(m['nombre']): m['codigoRegistraduria'] for m in json.load(open(ROOT / 'src/data/electoral/censoElectoral2026.json'))['municipios'] if m['departamento'] == 'antioquia'}
    ALIAS = {'SANTAFE DE ANTIOQUIA': 'SANTA FE DE ANTIOQUIA', 'CARMEN DE VIBORAL': 'EL CARMEN DE VIBORAL', 'SAN VICENTE': 'SAN VICENTE FERRER'}
    faltan = set()
    with open(H / '2015/app/db/txt/Antioquia.txt', encoding='latin1') as f:
        next(f)
        for l in f:
            x = l.rstrip('\r\n').split(';')
            e = corp.get(x[0])
            if not e:
                continue
            n = norm(x[2])
            reg = reg_de.get(n) or reg_de.get(norm(ALIAS.get(n, n)))
            if not reg:
                faltan.add(x[2]); continue
            zona = x[3].replace('ZONA', '').strip().zfill(2)
            yield reg, None, zona, x[4].strip(), x[5], e, x[6], x[7].strip(), x[8], x[9].strip(), int(x[10] or 0)
    if faltan:
        print('Municipios 2015 sin cruzar:', sorted(faltan))


FUENTES = {'2019': filas_2019, '2022': filas_2022, '2018': filas_2018, '2015': filas_2015}


# --- Ubicación de puestos ----------------------------------------------------------------------

def pools():
    """Puestos con coordenadas por municipio (código Registraduría): 2026 (censo) y Divipole 2023"""
    pool = collections.defaultdict(list)  # reg -> [(nombre, lat, lon, fuente)]
    for f in ['src/data/electoral/puestos/antioquia.json', 'src/data/electoral/puestosFaseC/antioquia.json']:
        for p in json.load(open(ROOT / f)):
            d = p.get('divipole2023') or {}
            if d.get('lat') is not None and d.get('precision') != 'aproximada':
                pool[p['codMunicipio']].append((p['puesto'], d['lat'], d['lon'], ''))
    reg_de = {(norm(m['nombre'])): m['codigoRegistraduria'] for m in json.load(open(ROOT / 'src/data/electoral/censoElectoral2026.json'))['municipios'] if m['departamento'] == 'antioquia'}
    for r in csv.DictReader(open(ROOT / '_originales/divipole/divipole_2023_georreferenciada.csv', encoding='utf-8')):
        if r['departamento'] != 'ANTIOQUIA':
            continue
        reg = reg_de.get(norm(r['municipio']))
        try:
            lat, lon = float(r['latitud']), float(r['longitud'])
        except ValueError:
            continue
        if reg and -4.3 <= lat <= 13.6:
            pool[reg].append((r['puesto'], lat, lon, re.sub(r'^\d+', '', r['comuna']).strip()))
    return pool


def ubicar(nombre, zona, candidatos, territorio, pequeno, limite, slug=None):
    """-> {'lat','lon'} (+ 'a': 1 si es aproximada) o None"""
    def ok(lat, lon):
        return limite is None or limite.contains(Point(lon, lat))
    if nombre:
        n, c = norm(nombre), canon(nombre)
        for clave, val in ((norm, n), (canon, c)):
            hits = {(round(la, 5), round(lo, 5)) for nm, la, lo, _ in candidatos if clave(nm) == val and val}
            if len(hits) == 1:
                la, lo = hits.pop()
                if ok(la, lo):
                    return {'lat': la, 'lon': lo}
        mejor = max(((similitud(c, canon(nm)), la, lo, nm) for nm, la, lo, _ in candidatos), default=None)
        if mejor and mejor[0] >= 0.85 and aceptable(nombre, mejor[3], mejor[0]) and ok(mejor[1], mejor[2]):
            return {'lat': round(mejor[1], 5), 'lon': round(mejor[2], 5)}
        if zona == '99':
            t = tokens(nombre)
            lugares = [(len(tokens(nm)), la, lo) for nm, la, lo, _ in candidatos if tokens(nm) and contiene(tokens(nm), t)]
            if lugares:
                _, la, lo = max(lugares)
                if ok(la, lo):
                    return {'lat': round(la, 5), 'lon': round(lo, 5), 'a': 1}
            # "Corregimiento Centro" -> centro de los puestos 2023 de la comuna/corregimiento "CTO CENTRO ..."
            if t:
                por_com = collections.defaultdict(list)
                for nm, la, lo, com in candidatos:
                    if com and contiene(t, tokens(com)):
                        por_com[com].append((la, lo))
                if len(por_com) == 1:
                    pts = next(iter(por_com.values()))
                    la, lo = sum(x[0] for x in pts) / len(pts), sum(x[1] for x in pts) / len(pts)
                    if ok(la, lo):
                        return {'lat': round(la, 5), 'lon': round(lo, 5), 'a': 1}
    cab, veredas, corrs = territorio
    if zona == '99' and nombre:
        t = tokens(nombre)
        cp = centro_poblado(slug, t) if slug else None
        if cp:
            return {'lat': cp[0], 'lon': cp[1], 'a': 1}
        for lista in (veredas, corrs):
            cands = [(len(nm), f) for nm, f in lista if contiene(nm, t)]
            if cands:
                la, lo = punto(max(cands, key=lambda x: x[0])[1])
                return {'lat': la, 'lon': lo, 'a': 1}
        return None
    if pequeno and cab:
        la, lo = punto(cab)
        return {'lat': la, 'lon': lo, 'a': 1}
    return None


# --- Construcción --------------------------------------------------------------------------------

def especial(par, can):
    try:
        p, c = int(par or 0), int(can or 0)
    except ValueError:
        return None
    if c in (996, 997, 998) and p in (0, 996, 997, 998):
        return {996: 'blanco', 997: 'nulos', 998: 'noMarcados'}[c]
    return None


def titulo(s):
    return ' '.join(str(s or '').split()).title()


def main(anio):
    censo = json.load(open(ROOT / 'src/data/electoral/censoElectoral2026.json'))['municipios']
    info = {m['codigoRegistraduria']: m for m in censo if m['departamento'] == 'antioquia'}
    slug_de = {v['dane']: k for k, v in json.load(open(ROOT / 'src/data/territorio/indiceTerritorios.json')).items()}

    # Acumular: reg -> elección -> estructuras
    acc = collections.defaultdict(lambda: collections.defaultdict(lambda: {
        'puestos': collections.defaultdict(lambda: {'votantes': 0, 'blanco': 0, 'nulos': 0, 'noMarcados': 0, 'mesas': set(), 'par': collections.Counter(), 'can': collections.Counter()}),
        'partidos': {}, 'candidatos': {}}))
    nombres = collections.defaultdict(dict)   # reg -> cod -> nombre
    zonas = collections.defaultdict(dict)     # reg -> cod -> zona
    ids_2015 = collections.defaultdict(dict)  # reg -> (zona, nombre norm) -> cod
    for reg, cod, zona, puesto, mesa, e, par, parnom, can, cannom, votos in FUENTES[anio]():
        if reg not in info:
            continue
        if cod is None:  # 2015: sin código de puesto; se numera por zona y nombre
            k = (zona, norm(puesto))
            if k not in ids_2015[reg]:
                ids_2015[reg][k] = None
            cod = k
        E = acc[reg][e]
        P = E['puestos'][cod]
        P['votantes'] += votos
        P['mesas'].add(mesa)
        if cod not in nombres[reg] and puesto:
            nombres[reg][cod] = puesto
        zonas[reg][cod] = zona
        s = especial(par, can)
        if s:
            P[s] += votos
            continue
        pk = str(int(par)) if str(par).strip().isdigit() else par
        E['partidos'].setdefault(pk, titulo(parnom))
        P['par'][pk] += votos
        if str(can).strip().isdigit() and int(can) != 0:
            ck = (pk, str(int(can)))
            E['candidatos'].setdefault(ck, titulo(cannom))
            P['can'][ck] += votos

    pool = pools()
    OUT_Y = OUT / anio
    OUT_Y.mkdir(parents=True, exist_ok=True)
    resumen = collections.Counter()
    for reg, elecciones in sorted(acc.items()):
        m = info[reg]
        slug = slug_de[m['dane']]
        # 2015: códigos estables por zona + orden alfabético del nombre
        if anio == '2015':
            por_zona = collections.defaultdict(list)
            for k in ids_2015[reg]:
                por_zona[k[0]].append(k)
            ren = {}
            for z, ks in por_zona.items():
                for i, k in enumerate(sorted(ks, key=lambda k: k[1]), 1):
                    ren[k] = f'{reg}{z}H{i:02d}'
            for E in elecciones.values():
                E['puestos'] = {ren[k]: v for k, v in E['puestos'].items()}
            nombres[reg] = {ren[k]: v for k, v in nombres[reg].items()}
            zonas[reg] = {ren[k]: v for k, v in zonas[reg].items()}
        # Ubicación
        if slug == 'medellin':  # capa propia de Medellín (barrios y veredas del Distrito)
            subs = json.load(open(ROOT / 'src/data/geojson/medellinBarrios.geo.json'))['features']
            territorio = (None, [(tokens(f['properties']['name']), f) for f in subs if f['properties']['tipo'] == 'Vereda' and tokens(f['properties']['name'])], [])
        else:
            territorio = cargar_territorios(slug)
            subs = json.load(open(ROOT / f'src/data/geojson/municipios/{slug}.subdivisiones.geo.json'))['features']
        limite = unary_union([shape(f['geometry']).buffer(0) for f in subs]).buffer(0.005) if subs else None
        pequeno = m['total'] <= 20_000
        ubic = {}
        todos = set().union(*[E['puestos'].keys() for E in elecciones.values()])
        for cod in sorted(todos):
            u = ubicar(nombres[reg].get(cod), zonas[reg].get(cod, ''), pool.get(reg, []), territorio, pequeno, limite, slug)
            if u:
                ubic[cod] = u
                resumen['aproximada' if u.get('a') else 'ubicado'] += 1
            else:
                resumen['sin_ubicar'] += 1
        # Salida
        out_e = {}
        for e in [x for x in ORDEN if x in elecciones]:
            E = elecciones[e]
            nombre, fecha, porCandidato = ELECCIONES[e]
            pidx = {k: i for i, k in enumerate(E['partidos'])}
            cidx = {k: i for i, k in enumerate(E['candidatos'])}

            def fila(P, completo):
                cs = sorted(((cidx[k], v) for k, v in P['can'].items() if v), key=lambda x: -x[1])
                if not porCandidato and not completo:
                    tot, a, keep = sum(v for _, v in cs), 0, []
                    for c in cs:
                        if len(keep) >= 25 or (tot and a >= 0.97 * tot):
                            break
                        keep.append(c); a += c[1]
                    cs = keep
                return {'habilitados': 0, 'mesas': len(P['mesas']), 'votantes': P['votantes'], 'blanco': P['blanco'], 'nulos': P['nulos'],
                        'noMarcados': P['noMarcados'], 'partidos': sorted(([pidx[k], v] for k, v in P['par'].items() if v), key=lambda x: -x[1]),
                        'candidatos': [list(c) for c in cs]}
            tot = {'votantes': 0, 'blanco': 0, 'nulos': 0, 'noMarcados': 0, 'mesas': set(), 'par': collections.Counter(), 'can': collections.Counter()}
            for P in E['puestos'].values():
                for k in ('votantes', 'blanco', 'nulos', 'noMarcados'):
                    tot[k] += P[k]
                tot['mesas'] |= {(id(P), x) for x in P['mesas']}
                tot['par'].update(P['par']); tot['can'].update(P['can'])
            out_e[e] = {
                'nombre': nombre, 'fecha': fecha, 'porCandidato': porCandidato,
                'partidos': list(E['partidos'].values()),
                'candidatos': [{'n': n, 'p': pidx[k[0]]} for k, n in E['candidatos'].items()],
                'municipio': fila(tot, True),
                'puestos': {c: fila(P, False) for c, P in sorted(E['puestos'].items())},
            }
        json.dump({
            'meta': {'fuente': FUENTE, 'tipo': 'escrutinio', 'codigos': anio,
                     'nota': 'Escrutinio mesa a mesa. Los códigos de puesto son los de ese año (no los del censo 2026); cada puesto se '
                             'ubica por su nombre. "a": ubicación aproximada (cabecera o vereda). El archivo no trae habilitados.'},
            'nombres': {c: titulo(n) for c, n in sorted(nombres[reg].items()) if n},
            'ubicaciones': ubic,
            'elecciones': out_e,
        }, open(OUT_Y / f'{slug}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
        resumen['municipios'] += 1
    print(anio, dict(resumen))


if __name__ == '__main__':
    main(sys.argv[1])
