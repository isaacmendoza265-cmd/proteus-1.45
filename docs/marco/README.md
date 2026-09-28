# Marco metodológico de Proteus: cómo se ingesta

El marco se organiza en **4 capas** (diagrama en `src/data/marco/capa0/diagrama-capas.md`) y se sube **por bloques**.

| | General | Local |
| --- | --- | --- |
| **Interpretación y análisis de datos** | Capa 1 | Capa 2 |
| **Oportunidades publicitarias (retórica, creación y segmentación)** | Capa 3 | Capa 4 |

## Pasos para cada bloque nuevo

1. **Ingestar el documento** (Isaac entrega el `.docx`):
   ```
   node scripts/ingestar_marco.mjs --capa <0-4> --bloque <id> --titulo "<título>" [--familia "<familia>"] [--version <v>] [--estado bruto|revisado|publicado] <archivo.docx>
   ```
   - Escribe el texto en `src/data/marco/capa<N>/<id>.md` y lo registra en `src/data/marco/registro.json`
     (archivo, fecha, sha256, estado). Copia el original a `_originales/marco/` (no se sube).
   - Volver a ingestar el mismo `--bloque` reemplaza la versión anterior.
2. **Estructurar el bloque** (lo hace un agente): la aplicación lee el `.md` con `src/services/marcoService.ts`.
   - Si el bloque tiene la forma de uno existente (reglamento: secciones `N. Título` y `Regla N — Título`;
     dossier: fichas `N. Título` con `Referencia/Escala/Qué afirma/Dato/Variable/Límite` y un `Cierre`), basta
     con nombrarlo `reglamento-*` o `dossier-*`: se lee solo.
   - Si es una forma nueva (p. ej. normas de publicidad de la Capa 3), agregar su lector en `marcoService.ts`,
     su vista en `src/modules/marco/MarcoMetodologicoView.tsx` y sus pruebas en
     `src/services/__tests__/marcoService.test.ts`.
3. **Conectar** lo que aplica: hoy, las reglas del piso 3 del reglamento vigente (`reglasPiso3()`) entran en
   las instrucciones del generador de contenido (`contentGeneratorService.ts`).
4. Verificar (`tsc`, `vitest`, `build`), commit y actualizar `docs/ESTADO_PROYECTO.md`.

## Bloques cargados

| Bloque | Capa | Documento | Qué usa la aplicación |
| --- | --- | --- | --- |
| `diagrama-capas` | 0 | MARCO TEÓRICO DE PROTEUS.docx | Definición de las 4 capas (`src/data/marco/capas.ts`) |
| `reglamento-v1-2` | 1 | Proteus marco general.docx | Secciones, 17 reglas, verbos, frases prohibidas y permitidas, instrucción para IAs; piso 3 en el generador |
| `dossier-familia-4-arrastre` | 1 | Dossier Proteus Capa 1 — Familia 4 Arrastre.docx | 15 fichas de fuentes, enunciados portables y locales, debates y vacíos |

Capas 2, 3 y 4: listas para recibir bloques, sin contenido todavía.

**Relación con el libro de reglas del análisis de piezas** (`src/data/analisisPiezas/libroDeReglas.ts`, v1.0): es la
versión provisional de Proteus para la retórica y la creación (lo que corresponde a la Capa 3). Recibe las reglas del
piso 3 del reglamento vigente y declara que el reglamento prevalece. Cuando se cargue la Capa 3, sus reglas se integran
al libro y sube su versión.
