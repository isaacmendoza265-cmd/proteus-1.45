#!/usr/bin/env python3
"""
Figuras 3D de la página de Inicio, dibujadas con la geometría real (no ilustraciones):

1. src/assets/inicio/antioquia-3d.svg: Antioquia inclinada; una columna por municipio con altura según los
   votantes habilitados (censo electoral 2026 por puesto, sumado por municipio).
2. src/assets/inicio/capas-territorio.svg: las escalas del territorio apiladas: departamento, 9 subregiones,
   125 municipios, comunas y corregimientos de Medellín, barrios/veredas de Medellín con sus puestos.
3. src/data/inicio/figuras.json: posición (en px del SVG) de las etiquetas y de cada capa, para que la
   página ponga los textos en HTML con los números del censo leídos en vivo.

Fuentes: src/data/geojson/antioquia125Municipios.geo.json, medellinBarrios.geo.json,
src/data/electoral/puestos(FaseC)/resumen.json y antioquia.json. Sin descargas.
Uso: python3 scripts/build_figuras_inicio.py
"""
import json
import math
from pathlib import Path
from shapely.geometry import shape, Polygon, MultiPolygon
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parent.parent
OUT_SVG = ROOT / 'src/assets/inicio'
OUT_JSON = ROOT / 'src/data/inicio/figuras.json'
KX = math.cos(math.radians(6.9))  # corrección de longitud a la latitud media de Antioquia
CMAX = 1_950_000  # escala de las columnas (Medellín ≈ 1,9 millones)
ETIQUETAS = ['05001', '05045', '05154', '05615']  # Medellín, Apartadó, Caucasia, Rionegro

SUBREGION_FONDO = {'Valle de Aburrá': '#3a2a30', 'Oriente': '#2c2a33', 'Suroeste': '#2e2b2a', 'Occidente': '#2b2e30',
                   'Norte': '#302b2e', 'Nordeste': '#2a2c2f', 'Magdalena Medio': '#2d2d2b', 'Bajo Cauca': '#2f2a2c',
                   'Urabá': '#2a2d2d'}
SUBREGION_CAPA = ['#3a1e27', '#2f2530', '#2a2b33', '#33292a', '#2b3030', '#35262d', '#2d2a36', '#322c28', '#2a2f2c']


def leer(ruta):
    return json.loads((ROOT / ruta).read_text(encoding='utf-8'))


def polys(g):
    return [p for p in (g.geoms if isinstance(g, MultiPolygon) else [g]) if not p.is_empty]


def pts(lista):
    return ' '.join(f'{x:.1f},{y:.1f}' for x, y in lista)


def mezcla(a, b, k):
    A = [int(a[i:i + 2], 16) for i in (1, 3, 5)]
    B = [int(b[i:i + 2], 16) for i in (1, 3, 5)]
    return '#%02x%02x%02x' % tuple(int(A[j] + (B[j] - A[j]) * k) for j in range(3))


def plano(g):
    """lon/lat -> plano (x al este, y al sur)."""
    return unary_union([Polygon([(x * KX, -y) for x, y in p.exterior.coords]) for p in polys(g)])


def main():
    feats = leer('src/data/geojson/antioquia125Municipios.geo.json')['features']
    res = leer('src/data/electoral/puestos/resumen.json')['municipios'] + leer('src/data/electoral/puestosFaseC/resumen.json')['municipios']
    censo = {m['dane']: m['censo'] for m in res if m['departamento'] == 'antioquia'}
    muni = [(f['properties'], plano(shape(f['geometry']).buffer(0))) for f in feats]
    dep = unary_union([g for _, g in muni])
    x0, y0, x1, y1 = dep.bounds
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2

    # ---------- 1. Mapa 3D ----------
    W, H, S, OX, OY, HMAX, TILT, GROSOR = 820, 700, 235, 410, 380, 300, 0.5, 14

    def P(x, y, z=0):
        return (OX + (x - cx) * S, OY + (y - cy) * S * TILT - z)

    o = ['<defs><filter id="d" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>'
         '<linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a1c28"/><stop offset="1" stop-color="#1a0c10"/></linearGradient></defs>']
    for p in polys(dep.simplify(0.006)):
        ring = list(p.exterior.coords)
        o.append(f'<polygon points="{pts([P(x, y, -GROSOR - 18) for x, y in ring])}" fill="#000" opacity="0.45" filter="url(#d)"/>')
        area = sum(ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1] for i in range(len(ring) - 1))
        sg = 1 if area > 0 else -1
        for i in range(len(ring) - 1):
            a, b = ring[i], ring[i + 1]
            if -(b[0] - a[0]) * sg <= 0:  # canto que mira al norte: no se ve
                continue
            o.append(f'<polygon points="{pts([P(*a), P(*b), P(*b, -GROSOR), P(*a, -GROSOR)])}" fill="url(#c)"/>')
    for p, g in muni:
        for poly in polys(g.simplify(0.004, preserve_topology=True)):
            o.append(f'<polygon points="{pts([P(x, y) for x, y in poly.exterior.coords])}" fill="{SUBREGION_FONDO.get(p["subregion"], "#2c2c2c")}" '
                     'stroke="#F6F4EF" stroke-opacity="0.22" stroke-width="0.6"/>')
    columnas, etiquetas = [], {}
    for p, g in muni:
        c = censo.get(p['daneCode'], 0)
        if not c:
            continue
        pt = g.centroid if p['daneCode'] == '05001' else g.representative_point()
        columnas.append((pt.y, pt.x, HMAX * (c / CMAX) ** 0.55, p, c))
    columnas.sort(key=lambda t: t[0])
    for y, x, h, p, c in columnas:
        r = 3.2 if c < 200_000 else 5.5
        bx, by = P(x, y)
        L, F, R, B = (bx - r, by), (bx, by + r * TILT), (bx + r, by), (bx, by - r * TILT)
        up = lambda q: (q[0], q[1] - h)
        t = min(1, (c / CMAX) ** 0.3)
        o.append(f'<ellipse cx="{bx:.1f}" cy="{by:.1f}" rx="{r * 2.6:.1f}" ry="{r * 1.3:.1f}" fill="#F0CE8C" opacity="{0.10 + 0.25 * t:.2f}" filter="url(#d)"/>')
        o.append(f'<polygon points="{pts([L, F, up(F), up(L)])}" fill="{mezcla("#6e1426", "#c98a4a", t)}"/>')
        o.append(f'<polygon points="{pts([F, R, up(R), up(F)])}" fill="{mezcla("#4a0e1b", "#9c6534", t)}"/>')
        o.append(f'<polygon points="{pts([up(L), up(F), up(R), up(B)])}" fill="{mezcla("#b3324c", "#F6DDA6", t)}"/>')
        if p['daneCode'] in ETIQUETAS:
            etiquetas[p['daneCode']] = {'nombre': p['name'], 'x': round(bx), 'y': round(by - h)}
    OUT_SVG.mkdir(parents=True, exist_ok=True)
    (OUT_SVG / 'antioquia-3d.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{"".join(o)}</svg>\n', encoding='utf-8')

    # ---------- 2. Capas del territorio ----------
    CW, CH, TILT2, X0, ANCHO, PASO = 600, 900, 0.36, 300, 380, 165
    bf = leer('src/data/geojson/medellinBarrios.geo.json')['features']
    barrios = [plano(shape(f['geometry']).buffer(0)) for f in bf]
    grupos = {}
    for f, g in zip(bf, barrios):
        grupos.setdefault(f['properties']['comunaCode'], []).append(g.buffer(0.00005))
    comunas = [(k, unary_union(v).buffer(-0.00005)) for k, v in sorted(grupos.items())]
    med = unary_union(barrios)
    subs = {}
    for p, g in muni:
        subs.setdefault(p['subregion'], []).append(g)

    def capa(geoms, marco, ancho, cy_px, fills, op, sw, tol):
        bx0, by0, bx1, by1 = marco.bounds
        mx, my, s = (bx0 + bx1) / 2, (by0 + by1) / 2, ancho / (bx1 - bx0)
        f = lambda x, y: (X0 + (x - mx) * s, cy_px + (y - my) * s * TILT2)
        out = []
        for g, fill in zip(geoms, fills):
            for poly in polys(g.simplify(tol, preserve_topology=True)):
                out.append(f'<polygon points="{pts([f(x, y) for x, y in poly.exterior.coords])}" fill="{fill}" stroke="#F6F4EF" stroke-opacity="{op}" stroke-width="{sw}"/>')
        return out, f

    ys = [90, 90 + PASO, 90 + 2 * PASO, 90 + 3 * PASO + 10, 90 + 4 * PASO + 10]
    c1, _ = capa([dep], dep, ANCHO, ys[0], ['#4a1c28'], 0.5, 1.0, 0.003)
    c2, _ = capa(list(map(unary_union, subs.values())), dep, ANCHO, ys[1], SUBREGION_CAPA, 0.55, 0.9, 0.003)
    c3, fm = capa([g for _, g in muni], dep, ANCHO, ys[2], ['#26282c'] * len(muni), 0.4, 0.5, 0.003)
    c4, fc = capa([g for _, g in comunas], med, ANCHO * 0.95, ys[3], ['#5a2030' if k.isdigit() and int(k) <= 16 else '#2a2f2c' for k, _ in comunas], 0.6, 0.8, 0.0004)
    c5, fb = capa(barrios, med, ANCHO * 0.95, ys[4], ['#2b2d31'] * len(barrios), 0.35, 0.4, 0.0002)
    puestos = [p for p in leer('src/data/electoral/puestos/antioquia.json') if p['codMunicipio'] == '01001' and (p['divipole2023'] or {}).get('lat') is not None]
    c5 += [f'<circle cx="{fb(d["lon"] * KX, -d["lat"])[0]:.1f}" cy="{fb(d["lon"] * KX, -d["lat"])[1]:.1f}" r="1.8" fill="#F0CE8C"/>'
           for d in (p['divipole2023'] for p in puestos)]
    mc = med.centroid
    mx, my = fm(mc.x, mc.y)
    bx0, by0, bx1, by1 = med.bounds
    izq, der = fc(bx0, (by0 + by1) / 2), fc(bx1, (by0 + by1) / 2)
    zoom = [f'<path d="M{mx:.1f},{my:.1f} L{e[0]:.1f},{e[1]:.1f}" stroke="#F0CE8C" stroke-opacity="0.55" stroke-width="1" stroke-dasharray="3 4" fill="none"/>' for e in (izq, der)]
    zoom.append(f'<circle cx="{mx:.1f}" cy="{my:.1f}" r="3.5" fill="#F0CE8C"/>')
    capas = c5 + c4 + zoom + c3 + c2 + c1  # de abajo hacia arriba
    (OUT_SVG / 'capas-territorio.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{CW}" height="{CH}" viewBox="0 0 {CW} {CH}">{"".join(capas)}</svg>\n', encoding='utf-8')

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps({
        'mapa': {'ancho': W, 'alto': H, 'etiquetas': [dict(dane=k, **v) for k, v in etiquetas.items()]},
        'capas': {'ancho': CW, 'alto': CH, 'centros': ys, 'barrios': len(bf), 'comunas': sum(1 for k, _ in comunas if k.isdigit() and int(k) <= 16),
                  'corregimientos': sum(1 for k, _ in comunas if k.isdigit() and int(k) >= 50), 'puestosMedellin': len(puestos)},
    }, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    print('OK', [f.name for f in OUT_SVG.iterdir()], OUT_JSON.relative_to(ROOT), etiquetas)


if __name__ == '__main__':
    main()
