"""
Cartografía interna de los municipios de la fase B que no tenían mapa (42 de los 46 de Antioquia con
más de 20.000 personas en el censo electoral).

Fuentes (en _originales/, cada una con su FUENTE.md):
- Barrios oficiales del municipio cuando existen (_originales/<slug>/barrios.geojson).
- Si no: sectores urbanos de la cabecera del Marco Geoestadístico Nacional 2018 del DANE
  (_originales/dane_mgn/<slug>/sectores_urbanos.geojson). El DANE no les pone nombre.
- Veredas: nivel de referencia de veredas 2024 del DANE (_originales/dane_mgn/<slug>/veredas.geojson),
  recortadas para no superponerse con la zona urbana.
- Comunas (solo Envigado y Apartadó): capa Comuna_Localidad 2018 del DANE.

Salida:
- src/data/geojson/municipios/<slug>.divisiones.geo.json   (comunas o cabecera, y zona rural)
- src/data/geojson/municipios/<slug>.subdivisiones.geo.json (barrios o sectores urbanos, y veredas)
- src/data/territorio/indiceTerritorios.json (divisiones y subdivisiones de cada municipio)
- src/data/geojson/municipios/registroFaseB.json (datos para el registro de divisiones)

Uso: python3 scripts/build_cartografia_fase_b.py <lista.json>   (lista: [{slug, dane}])
"""
import json, os, re, sys
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

OUT = 'src/data/geojson/municipios'
PALETA = ['#e11d48', '#16a34a', '#2563eb', '#d97706', '#9333ea', '#0891b2', '#ea580c', '#65a30d',
          '#db2777', '#0284c7', '#ca8a04', '#7c3aed', '#059669', '#b45309', '#c026d3', '#4d7c0f', '#0f766e',
          '#be123c', '#1d4ed8', '#a16207']
PEQ = {'de', 'del', 'la', 'las', 'los', 'el', 'y', 'e', 'en'}
TOL_URB, TOL_RUR = 0.00004, 0.00025

FUENTES_B = json.load(open('_originales/barrios_fase_b/fuentes.json'))
# Barrios oficiales: slug -> (archivo, campo código, campo nombre, confianza, filtro)
def _cat(s):  # Catastro Departamental: solo barrios de la cabecera (corregimiento 001 / sector urbano 01)
    return (f'_originales/barrios_fase_b/{s}.geojson', 'CODIGO', 'NOMBRE', 'oficial', 'catastro')
BARRIOS = {s: _cat(s) for s in ['apartado', 'turbo', 'caucasia', 'la_ceja', 'chigorodo', 'carepa', 'carmen_de_viboral', 'guarne',
    'el_bagre', 'necocli', 'andes', 'yarumal', 'puerto_berrio', 'segovia', 'san_pedro_de_uraba', 'santa_rosa_de_osos', 'sonson',
    'urrao', 'taraza', 'remedios', 'bolivar', 'arboletes', 'santa_barbara', 'san_juan_de_uraba', 'caceres', 'dabeiba']}
BARRIOS.update({
    'envigado': ('_originales/barrios_fase_b/envigado.geojson', 'BARRIO', 'NOMBARRIO', 'oficial', None),
    'copacabana': ('_originales/barrios_fase_b/copacabana.geojson', 'PK_BARRIO', 'NOM_BARRIO', 'oficial', None),
    'barbosa': ('_originales/barrios_fase_b/barbosa.geojson', 'PK_BARRIO', 'NOM_BARRIO', 'oficial', None),
    'caldas': ('_originales/barrios_fase_b/caldas.geojson', 'BARRIO', 'NOM_BARRIO', 'oficial', None),
    'la_estrella': ('_originales/barrios_fase_b/la_estrella.geojson', None, 'nombre_uni', 'oficial', 'la_estrella'),
    'sabaneta': ('_originales/sabaneta/barrios.geojson', 'PK_BARRIO', 'NOMBRE', 'oficial', None),
    'marinilla': ('_originales/marinilla/barrios.geojson', 'cod_barrio', 'nom_barrio', 'oficial', None),
    'itagui': ('_originales/barrios_fase_b/itagui.geojson', 'CODIGO_BAR', 'NMG', 'oficial', None),
})
FUENTE_TXT = {'sabaneta': 'Alcaldía de Sabaneta, barrios del PBOT (ArcGIS Online de la Alcaldía)',
              'marinilla': 'Municipio de Marinilla, Secretaría de Planeación: capa "Barrios" (ArcGIS Online del municipio)'}
NO_BARRIO = re.compile(r'(?i)^(#|cabecera municipal|limite urbano\.?|zona (de )?expansi[oó]n.*|zona urbanizable|sin identificar|calle 6|santa fe de antioquia)$')

def es_cabecera(codigo):
    c = str(codigo)
    if len(c) == 13:  # depto 2 + municipio 3 + sector 2 + corregimiento 3 + barrio 3
        return c[5:7] == '01' and c[7:10] in ('000', '001')
    if len(c) == 10:  # municipio 3 + sector 1 + corregimiento 3 + barrio 3
        return c[3] == '1' and c[4:7] == '001'
    return True

def titulo(s):
    s = re.sub(r'\s+', ' ', str(s).strip()).lower()
    return ' '.join(w if i and w in PEQ else w[:1].upper() + w[1:] for i, w in enumerate(s.split(' ')))

def limpia(g, tol):
    g = g.buffer(0)
    g = g.simplify(tol, preserve_topology=True).buffer(0)
    return g

def redondear(geom):
    def r(c):
        if isinstance(c, (list, tuple)) and c and isinstance(c[0], (int, float)):
            return [round(c[0], 5), round(c[1], 5)]
        return [r(x) for x in c]
    m = mapping(geom)
    return {'type': m['type'], 'coordinates': r(m['coordinates'])}

def leer(ruta):
    return [f for f in json.load(open(ruta))['features'] if f.get('geometry')]

CORREGIMIENTOS = [f for f in json.load(open('_originales/barrios_fase_b/corregimientos.geojson'))['features'] if f.get('geometry')]

def construir(slug, dane):
    base = f'_originales/dane_mgn/{slug}'
    veredas = leer(f'{base}/veredas.geojson')
    comunas = leer(f'{base}/comunas.geojson')
    urb = []  # (code, nombre, tipo, geom)
    tipo_urb = None
    if slug in BARRIOS:
        ruta, fc, fn, conf, filtro = BARRIOS[slug]
        grupos = {}
        for i, f in enumerate(leer(ruta)):
            p = f['properties']
            nombre = str(p.get(fn) or '').strip()
            if filtro == 'catastro' and not es_cabecera(p.get('CODIGO')): continue
            if filtro == 'la_estrella' and p.get('tipo') != 'Barrio': continue
            if not nombre or NO_BARRIO.match(nombre): continue
            code = re.sub(r'\W', '', str(p.get(fc) if fc else nombre)) or str(i)
            g = shape(f['geometry']).buffer(0)
            if code in grupos and grupos[code][0] != titulo(nombre):  # mismo código, otro nombre: no se funden
                code = f'{code}_{i}'
            if code in grupos: grupos[code] = (grupos[code][0], grupos[code][1].union(g))  # partes del mismo barrio
            else: grupos[code] = (titulo(nombre), g)
        if len(grupos) >= 3:
            for code, (nombre, g) in sorted(grupos.items(), key=lambda kv: kv[1][0]):
                urb.append((f'B{code}', nombre, 'Barrio', limpia(g, TOL_URB)))
            fuente_urb = FUENTE_TXT.get(slug) or FUENTES_B[slug]['fuente']
            tipo_urb = 'barrios'
    if tipo_urb is None:
        conf = 'oficial'
        ruta_sec = f'{base}/secciones_urbanas.geojson'
        secs = [f for f in leer(ruta_sec) if f['properties'].get('CLAS_CCDGO') == '1'] if os.path.exists(ruta_sec) else []
        if len(secs) >= 3:
            secs.sort(key=lambda f: f['properties'].get('SECU_CCNCT') or f['properties'].get('SETU_CCNCT'))
            for i, f in enumerate(secs, 1):
                p = f['properties']
                urb.append((f"S{p.get('SECU_CCNCT', p.get('SETU_CCNCT'))[-6:]}", f'Sección urbana {i:02d}', 'Sección urbana', limpia(shape(f['geometry']), TOL_URB)))
            fuente_urb, tipo_urb = 'DANE, Marco Geoestadístico Nacional 2018: secciones urbanas de la cabecera (sin nombre de barrio)', 'secciones'
        else:
            secs = [f for f in leer(f'{base}/sectores_urbanos.geojson') if f['properties'].get('CLAS_CCDGO') == '1']
            secs.sort(key=lambda f: f['properties']['SETU_CCNCT'])
            for i, f in enumerate(secs, 1):
                p = f['properties']
                urb.append((f"S{p['SETU_CCDGO']}", f'Sector urbano {i:02d}', 'Sector urbano', limpia(shape(f['geometry']), TOL_URB)))
            fuente_urb, tipo_urb = 'DANE, Marco Geoestadístico Nacional 2018: sectores urbanos de la cabecera (sin nombre de barrio)', 'sectores'
    # Códigos únicos
    vistos = {}
    for k, u in enumerate(urb):
        c = u[0]
        if c in vistos:
            vistos[c] += 1; urb[k] = (f'{c}_{vistos[c]}',) + u[1:]
        else:
            vistos[c] = 0
    zona_urb = unary_union([u[3] for u in urb]).buffer(0)
    rur = []
    for f in veredas:
        p = f['properties']
        g = shape(f['geometry']).buffer(0).difference(zona_urb)
        g = limpia(g, TOL_RUR)
        if g.is_empty or g.area < 1e-7:
            continue
        rur.append((f"V{p['CODIGO_VER']}", titulo(p['NOMBRE_VER']), 'Vereda', g))
    vistos = {}
    for k, u in enumerate(rur):
        c = u[0]
        if c in vistos:
            vistos[c] += 1; rur[k] = (f'{c}_{vistos[c]}',) + u[1:]
        else:
            vistos[c] = 0

    # Divisiones urbanas: comunas (Apartadó: DANE; Envigado: campo ZONA 01-09 de sus barrios) o la cabecera
    divs = []  # (code, nombre, tipo, geom)
    padre_urb = {}
    if slug == 'envigado':
        zonas = {}
        for f in leer(BARRIOS['envigado'][0]):
            z = f['properties'].get('ZONA'); cod = 'B' + re.sub(r'\W', '', str(f['properties']['BARRIO']))
            if z and z.isdigit() and int(z) <= 9: padre_urb[cod] = f'C{int(z):02d}'
        for u in urb:
            zonas.setdefault(padre_urb.get(u[0], 'U'), []).append(u[3])
        for c in sorted(zonas):
            divs.append((c, f'Comuna {int(c[1:])}' if c != 'U' else 'Cabecera (sin comuna)', 'Comuna' if c != 'U' else 'Zona urbana', unary_union(zonas[c]).buffer(0)))
        comunas = [d for d in divs if d[2] == 'Comuna']
    elif comunas:
        for f in sorted(comunas, key=lambda f: f['properties']['COD_LOC_COM']):
            p = f['properties']
            num = re.sub(r'\D', '', p['COD_LOC_COM'])[-2:]
            nom = p['NOM_LOC_COM']
            nombre = f"Comuna {int(num)}" if re.match(r'(?i)^comuna\s*0*\d+$', nom.strip()) else (f"Comuna {int(num)} - {titulo(nom)}" if not re.match(r'(?i)comuna', nom) else titulo(nom))
            divs.append((f'C{num}', nombre, 'Comuna', limpia(shape(f['geometry']), TOL_URB)))
    else:
        divs.append(('U', 'Cabecera municipal', 'Zona urbana', zona_urb))
    # Divisiones rurales: corregimientos de la Gobernación; cada vereda va al que contiene su punto interior
    corrs = [(titulo(f['properties']['NOMBRE_CORREG']), shape(f['geometry']).buffer(0)) for f in CORREGIMIENTOS if f['properties']['COD_MPIO'] == dane]
    padre_rur, grupos_r = {}, {}
    for code, nombre, tipo, g in rur:
        pt = g.representative_point()
        dentro = [i for i, (_, cg) in enumerate(corrs) if cg.contains(pt)]
        k = f'K{dentro[0] + 1:02d}' if dentro else 'R'
        padre_rur[code] = k
        grupos_r.setdefault(k, []).append(g)
    for k in sorted(grupos_r, key=lambda k: (k == 'R', k)):
        nombre = f'Corregimiento {corrs[int(k[1:]) - 1][0]}' if k != 'R' else ('Zona rural' if len(grupos_r) == 1 else 'Veredas sin corregimiento')
        divs.append((k, nombre, 'Corregimiento' if k != 'R' else 'Zona rural', limpia(unary_union(grupos_r[k]).buffer(0), TOL_RUR)))
    n_corr = sum(1 for k in grupos_r if k != 'R')

    def padre(tipo, g, code):
        if tipo == 'Vereda':
            return padre_rur[code]
        if slug == 'envigado':
            return padre_urb.get(code, 'U')
        if not comunas:
            return 'U'
        pt = g.representative_point()
        dentro = [d for d in divs if d[2] == 'Comuna' and d[3].contains(pt)]
        if dentro:
            return dentro[0][0]
        return max((d for d in divs if d[2] == 'Comuna'), key=lambda d: d[3].intersection(g).area)[0]

    # Las comunas del DANE no coinciden exactamente con los barrios oficiales: cada comuna se dibuja
    # como la unión de los barrios que se le asignan (así los bordes coinciden con los barrios).
    if comunas and slug != 'envigado':
        miembros = {}
        for code, nombre, tipo, g in urb:
            miembros.setdefault(padre(tipo, g, code), []).append(g)
        divs = [(c, n, t, limpia(unary_union(miembros[c]).buffer(0), TOL_URB) if t == 'Comuna' and c in miembros else g) for c, n, t, g in divs
                if not (t == 'Comuna' and c not in miembros)]
    fdivs, fsubs, idiv, isub = [], [], {}, {}
    nombre_div = {d[0]: d[1] for d in divs}
    for k, (code, nombre, tipo, g) in enumerate(divs):
        c = g.representative_point()
        did = f'{slug}-div-{code}'
        fdivs.append({'type': 'Feature', 'id': did, 'geometry': redondear(g), 'properties': {
            'id': did, 'name': nombre, 'code': code, 'tipo': tipo, 'muniId': slug, 'level': 'municipal',
            'centroid': [round(c.y, 5), round(c.x, 5)], 'colorCode': PALETA[k % len(PALETA)], 'isInteractiveTarget': True}})
        idiv[did] = {'nombre': nombre, 'tipo': tipo}
    for k, (code, nombre, tipo, g) in enumerate(urb + rur):
        c = g.representative_point()
        pc = padre(tipo, g, code)
        sid, pid = f'{slug}-sub-{code}', f'{slug}-div-{pc}'
        fsubs.append({'type': 'Feature', 'id': sid, 'geometry': redondear(g), 'properties': {
            'id': sid, 'name': nombre, 'code': code, 'tipo': tipo, 'parentId': pid, 'parentName': nombre_div[pc], 'muniId': slug,
            'level': 'comunas-barrios', 'centroid': [round(c.y, 5), round(c.x, 5)], 'colorCode': PALETA[k % len(PALETA)], 'isInteractiveTarget': False}})
        isub[sid] = {'nombre': nombre, 'tipo': tipo, 'padre': pid}
    json.dump({'type': 'FeatureCollection', 'features': fdivs}, open(f'{OUT}/{slug}.divisiones.geo.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    json.dump({'type': 'FeatureCollection', 'features': fsubs}, open(f'{OUT}/{slug}.subdivisiones.geo.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    n_urb, n_rur = len(urb), len(rur)
    etiqueta_urb = {'barrios': f'{n_urb} barrios', 'secciones': f'{n_urb} secciones urbanas (DANE)', 'sectores': f'{n_urb} sectores urbanos (DANE)'}[tipo_urb]
    registro = {
        'id': slug, 'daneCode': dane,
        'divisionLabel': (f'{len(comunas)} comunas' if comunas else 'Cabecera') + (f' y {n_corr} corregimiento' + ('s' if n_corr > 1 else '') if n_corr else ' y zona rural'),
        'subdivisionLabel': f'{etiqueta_urb} y {n_rur} veredas',
        'fuente': f'{fuente_urb}; veredas: DANE, nivel de referencia de veredas 2024; corregimientos: Gobernación de Antioquia (2025)' + ('; comunas: DANE 2018' if comunas and slug != 'envigado' else ''),
        'confianza': conf,
        'nota': ('No se encontró un mapa público de barrios con límites: la zona urbana se muestra por unidades del DANE, sin nombre de barrio. ' if tipo_urb != 'barrios' else '')
                + 'Las veredas se recortan donde se cruzan con la zona urbana. Los centros poblados quedan dentro de su vereda.',
    }
    return idiv, isub, registro, (n_urb, n_rur, os.path.getsize(f'{OUT}/{slug}.subdivisiones.geo.json'))

if __name__ == '__main__':
    lista = json.load(open(sys.argv[1]))
    indice = json.load(open('src/data/territorio/indiceTerritorios.json'))
    reg_path = f'{OUT}/registroFaseB.json'
    registro = json.load(open(reg_path)) if os.path.exists(reg_path) else {}
    for m in lista:
        idiv, isub, r, (nu, nr, tam) = construir(m['slug'], m['dane'])
        indice[m['slug']]['divisiones'] = idiv
        indice[m['slug']]['subdivisiones'] = isub
        r['name'] = {'antioquia': 'Santa Fe de Antioquia'}.get(m['slug'], indice[m['slug']]['nombre'])  # nombre que reconoce el censo
        registro[m['slug']] = r
        print(f"{m['slug']:20s} urbanas {nu:3d} veredas {nr:3d}  {tam/1e3:6.0f} KB", flush=True)
    json.dump(indice, open('src/data/territorio/indiceTerritorios.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    json.dump(registro, open(reg_path, 'w'), ensure_ascii=False, indent=1)
