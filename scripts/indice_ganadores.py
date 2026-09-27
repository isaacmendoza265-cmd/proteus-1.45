#!/usr/bin/env python3
"""
Índice de ganadores por municipio y elección, para colorear la capa "Resultado electoral" del mapa
a escala departamental sin cargar todos los resultados por puesto.

Lee los mismos archivos que la app (resultadosPuesto2023, resultadosPuesto2026,
resultadosPuestoPresidencial2026 y resultadosPuestoHistorico/<año>) y guarda, para cada elección y
municipio (código DANE): [ganador, partido, % sobre votos válidos, votantes]. En las elecciones por
lista (Concejo, Asamblea, Senado, Cámara) el ganador es el partido o lista más votado.
Uso: python3 scripts/indice_ganadores.py   (después de construir los resultados)
Salida: src/data/electoral/ganadoresMunicipio.json
"""
import glob, json, os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
E = ROOT / 'src/data/electoral'
indice = json.load(open(E / 'resultadosPuesto/indice.json'))
out, nombres = {}, {}


def registrar(eid, nombre, dane, fila, partidos, candidatos, por_candidato):
    validos = sum(v for _, v in fila.get('partidos', [])) + fila.get('blanco', 0)
    if por_candidato and fila.get('candidatos'):
        i, v = max(fila['candidatos'], key=lambda x: x[1])
        g, p = candidatos[i]['n'], partidos[candidatos[i]['p']]
    elif fila.get('partidos'):
        i, v = max(fila['partidos'], key=lambda x: x[1])
        g = p = partidos[i]
    else:
        return
    out.setdefault(eid, {})[dane] = [g, p, round(100 * v / validos, 1) if validos else 0, fila.get('votantes', 0)]
    nombres[eid] = nombre


for dane, e in indice.items():
    if e.get('2023'):
        a = json.load(open(E / f"resultadosPuesto2023/{e['2023']}.json"))
        m = a['municipio']
        # Alcaldía/Gobernación: los partidos salen de sumar sus candidatos
        for eid, nombre, k, pc in [('alcaldia-2023', 'Alcaldía 2023', 'alcaldia', True), ('concejo-2023', 'Concejo 2023', 'concejo', False),
                                   ('gobernacion-2023', 'Gobernación 2023', 'gobernacion', True), ('asamblea-2023', 'Asamblea 2023', 'asamblea', False)]:
            if k not in m:
                continue
            f = dict(m[k])
            if pc:
                par = {}
                for i, v in f['candidatos']:
                    par[a['candidatos'][i]['p']] = par.get(a['candidatos'][i]['p'], 0) + v
                f['partidos'] = list(par.items())
            registrar(eid, nombre, dane, f, a['partidos'], a['candidatos'], pc)
    for carpeta, pc in [('resultadosPuesto2026', False), ('resultadosPuestoPresidencial2026', True)]:
        slug = e.get('2026') if carpeta == 'resultadosPuesto2026' else e.get('pres2026')
        if slug and (E / carpeta / f'{slug}.json').exists():
            a = json.load(open(E / carpeta / f'{slug}.json'))
            for eid, x in a['elecciones'].items():
                registrar(eid, x['nombre'], dane, x['municipio'], x['partidos'], x['candidatos'], pc)
    slug = e.get('2023')
    for ruta in sorted(glob.glob(str(E / f'resultadosPuestoHistorico/*/{slug}.json'))):
        a = json.load(open(ruta))
        for eid, x in a['elecciones'].items():
            registrar(eid, x['nombre'], dane, x['municipio'], x['partidos'], x['candidatos'], x['porCandidato'])

TIPOS = ['alcaldia', 'gobernacion', 'concejo', 'asamblea', 'presidente', 'senado', 'camara']
orden = sorted(out, key=lambda k: (-int(next(t for t in k.split('-') if t.isdigit() and len(t) == 4)), TIPOS.index(k.split('-')[0]), k))
json.dump({'elecciones': [{'id': k, 'nombre': nombres[k]} for k in orden], 'ganadores': {k: out[k] for k in orden}},
          open(E / 'ganadoresMunicipio.json', 'w'), ensure_ascii=False, separators=(',', ':'))
print(len(orden), 'elecciones;', os.path.getsize(E / 'ganadoresMunicipio.json') // 1000, 'KB')
