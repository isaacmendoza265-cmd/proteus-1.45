# AGENTS.md — instrucciones para cualquier agente (Codex, Claude, Antigravity)

Proyecto Proteus: inteligencia electoral de Colombia (React + TypeScript + Vite + Leaflet). Dueño: Isaac.
Foco actual: **terminar Antioquia** (125 municipios). Resto del país (fases D y E) en suspenso.

## Antes de tocar nada (cada sesión)
1. Lee `docs/ESTADO_PROYECTO.md` (estado, decisiones de Isaac y pendientes). Es la memoria del proyecto.
2. Revisa `git status`, `git log --oneline -10`, `git reflog -5` y que no haya `.git/*.lock`.
3. No hagas `git reset --hard`, `git push --force`, `rebase` ni borres commits o archivos de otros agentes.
   Se trabaja directo en `main` (decisión de Jose, 29-sep-2026) con `npm run ci:local` en verde antes de cada
   push; rama + PR solo para cambios grandes que Isaac deba revisar antes.

## Al terminar (cada sesión, obligatorio)
1. Verifica con `npm run ci:local` (tipos, lint, pruebas con PostgreSQL y build, en paralelo; ver `CLAUDE.md`).
   No declares algo hecho ni hagas push sin esto en verde.
2. Commit con mensaje en español que diga qué cambió y por qué.
3. **Actualiza `docs/ESTADO_PROYECTO.md`**: qué hiciste (con hash de commit), qué quedó pendiente,
   decisiones nuevas de Isaac (con fecha). Si no lo actualizas, el progreso se pierde.

## Reglas de datos (no negociables)
- Honestidad: todo dato es Oficial, Estimado (con método) o Sin información. Nunca inventar ni simular
  cifras presentadas como reales. Nada de predicción de votos por dinero; nada de Ley de Benford.
- Base de datos (PostgreSQL) solo para lo que produce el equipo (usuarios, perfil, piezas, archivos). Los datos
  electorales y geográficos siguen siendo archivos generados por `scripts/`.
- No guardar cédulas ni datos personales. No redistribuir crudos: van en `_originales/` (en .gitignore).
- Cada dato derivado se genera con un script en `scripts/` (reproducible, con docstring de fuente y uso).
- Descargas: antes de cada lote, pedir permiso a Isaac con archivo, fuente y tamaño.
- Municipios con ≤ 20.000 votantes: solo cabecera y veredas (sin barrios).
- Puestos: los códigos cambian por elección; se cruzan por nombre. Coordenadas aproximadas se marcan
  `precision: 'aproximada'`. OpenStreetMap: solo con la regla de `scripts/geocodificar_puestos_osm_antioquia.py`.
- No cambiar el umbral nacional de `scripts/build_puestos_20k.py` (`MUNICIPIOS_20K` = > 20.000 en todo el país).
- Encuestas 2026: el módulo `public/modulos/voto-correlaciones/` NO se edita a mano; se actualiza con
  `scripts/importar_voto_correlaciones.py` desde el paquete de voto-demografia-2026. Solo agregados; nunca bajar
  encuestas a comuna o barrio.
- Marco metodológico: todo análisis o pieza sigue el reglamento de interpretación vigente
  (`src/data/marco/capa1/reglamento-*.md`); si algo lo contradice, prevalece el reglamento. Los bloques nuevos
  se ingestan con `scripts/ingestar_marco.mjs` (ver `docs/marco/README.md`).

## Producción (Coolify en Guarne)
<!-- guarne-deploy -->
- **https://polimetrics.app** — Coolify del data center de Network IA Solutions (`https://coolify-guarne.networksols.com.co`),
  proyecto EMPRESA, app `proteus` (`d4y08fa3m5uhwvpmba5le0h3`), build pack Dockerfile, puerto 3000.
- PostgreSQL 18 (recurso de Coolify). Las migraciones de `prisma/` se aplican al arrancar el contenedor.
- Publicado por Cloudflare Tunnel (cuenta personal de Jose, túnel `guarne-personal`). Guía: `docs/DESPLIEGUE_COOLIFY.md`.
- No hay Railway ni Cloud Run: si un documento antiguo lo dice, es histórico.
<!-- /guarne-deploy -->

## Estilo
- Interfaz y textos en español. Estética "sobrio cívico" (tokens `--c-*` en `src/index.css`).
- Cambios pequeños y aditivos; no reescribir módulos que funcionan.
