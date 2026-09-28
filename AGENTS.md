# AGENTS.md — instrucciones para cualquier agente (Codex, Claude, Antigravity)

Proyecto Proteus: inteligencia electoral de Colombia (React + TypeScript + Vite + Leaflet). Dueño: Isaac.
Foco actual: **terminar Antioquia** (125 municipios). Resto del país (fases D y E) en suspenso.

## Antes de tocar nada (cada sesión)
1. Lee `docs/ESTADO_PROYECTO.md` (estado, decisiones de Isaac y pendientes). Es la memoria del proyecto.
2. Revisa `git status`, `git log --oneline -10`, `git reflog -5` y que no haya `.git/*.lock`.
3. No hagas `git reset --hard`, `git push --force`, `rebase` ni borres commits o archivos de otros agentes.
   Trabaja en una rama (`codex/<tema>`) y deja que Isaac haga el merge.

## Al terminar (cada sesión, obligatorio)
1. Verifica: `npx tsc --noEmit -p .`, `npx vitest run`, `npm run build`. No declares algo hecho sin esto.
2. Commit con mensaje en español que diga qué cambió y por qué.
3. **Actualiza `docs/ESTADO_PROYECTO.md`**: qué hiciste (con hash de commit), qué quedó pendiente,
   decisiones nuevas de Isaac (con fecha). Si no lo actualizas, el progreso se pierde.

## Reglas de datos (no negociables)
- Honestidad: todo dato es Oficial, Estimado (con método) o Sin información. Nunca inventar ni simular
  cifras presentadas como reales. Nada de predicción de votos por dinero; nada de Ley de Benford.
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

## Estilo
- Interfaz y textos en español. Estética "sobrio cívico" (tokens `--c-*` en `src/index.css`).
- Cambios pequeños y aditivos; no reescribir módulos que funcionan.
