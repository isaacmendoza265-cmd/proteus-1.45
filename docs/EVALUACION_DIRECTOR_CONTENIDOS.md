# Evaluación: el director de contenidos frente a los datos, la identidad y el marco

Fecha: 2-oct-2026 · Autor: Claude (sesión de Cowork) · Estado del código: `ba9ed7c`.
Método: inventario de todas las vistas y servicios que producen texto con Gemini (grafo de importaciones desde
`main.tsx`), lectura de cada prompt y de su fuente de datos, y medición de lo que llega a Gemini. Las cifras de esta
nota están verificadas en el código; las rutas permiten revisarlas.

## 1. Veredicto

Proteus tiene **tres generaciones de herramientas de IA conviviendo**, y solo la más nueva cumple el propósito del
aplicativo (datos con fuente, interpretados con el marco, en la voz del candidato):

| Generación | Herramientas | Datos | Identidad | Marco |
|---|---|---|---|---|
| **A. Núcleo nuevo** | Generador de contenido (mapa), Analista territorial, Análisis de piezas | Reales, con fuente (dossier territorial) | Sí (generador y piezas) | Sí, pero solo el "piso 3" (≈1,3 mil de 42,6 mil caracteres) |
| **B. Heredadas** | Redactar, Publicidad, Segmentos, Revisores, Multimedia, Analista de video, Subregiones, Departamento (PDF), País, Escenarios | **Escritas a mano** o simuladas en su mayoría | No (solo nombre y tono del perfil viejo) | No |
| **C. Muertas** | 25 archivos sin importar, 2 vistas retiradas pero aún montadas, `CandidateProfileManager` (2.292 líneas en el bundle) | — | — | — |

- De **25 prompts alcanzables** desde el menú, **22 no reciben ni la identidad ni el marco**.
- Solo 2 reciben datos con fuente: el generador y el analista.
- **10 archivos de datos escritos a mano alimentan prompts de Gemini directamente**. Gemini los repite como si fueran oficiales.

La dispersión no es solo estética: **las herramientas B producen cifras sin fuente y contradicen el reglamento**. La
optimización consiste en **una sola tubería** (dato con fuente → marco → identidad → tarea), con pocas herramientas
encima. Hoy hay 35 prompts sueltos.

## 2. Cómo llegan hoy los insumos a Gemini

| Prompt | Datos del territorio | Identidad | Marco | Libro de reglas |
|---|---|---|---|---|
| `/api/contenido/generar` (Generador del mapa) | Dossier completo y foco de la elección | Sí | Piso 3 | No |
| `/api/analista/preguntar` (Analista) | Dossier completo | **No** | Piso 3 | No |
| `/api/piezas/analizar` (Análisis de piezas) | No | Sí | Piso 3 | Sí |
| `/api/gemini/generar` (≈20 llamadores: Redactar, Publicidad, Segmentos, Revisores, Multimedia, Video, Subregiones, PDF, País, Escenarios) | Datos a mano (`antioquia125MunicipalitiesMasterData`, `activeTerritoryContextService`, `voterAudienceCatalog`, `adTargetingModelData`, `politicalHousesMasterData`…) o ninguno | Solo nombre y tono del perfil legado | **No** | No |

Lo que el marco tiene y **no llega a ningún prompt**:
- las reglas 1–8 y 10–17 del reglamento v1.2;
- la distinción entre censos;
- las frases permitidas;
- el dossier de la Familia 4 (arrastre, 15,7 mil caracteres).

Las capas 2, 3 y 4 están vacías. El libro de reglas de piezas hace de Capa 3 provisional, pero solo lo usa Análisis de
piezas.

## 3. Problemas, por gravedad

### Críticos: el usuario recibe cifras o afirmaciones falsas

1. **Datos a mano presentados como oficiales**.
   - `activeTerritoryContextService.ts:66` fija Medellín en 2.650.000 habitantes; el DANE 2026 da 2.526.795. Para cualquier territorio sin registro pone 50.000 habitantes y NBI 12 % (l.174-178).
   - `municipalRepositoryService.buildContextPrompt` rotula "FICHA TERRITORIAL OFICIAL" y rellena seguridad con valores inventados ("Bajo control de la fuerza pública", "Moderado").
   - `antioquia125MunicipalitiesMasterData.ts` repite `homicideRate: "Estadísticas pacíficas."` 28 veces y copia textos idénticos entre municipios.
   - Redactar, Publicidad, Segmentos y Revisores mandan todo esto a Gemini.
2. **Segmentos** (`voterDemographicsService.ts`) calcula "votos estimados" por cohorte con pesos nacionales fijos (0,488/0,512; 26/52/22 %; participación base 0,43). Esos pesos son iguales para todo territorio, y el prompt los llama "votos reales en urnas" (`VoterSegmentationEngine.tsx:209`). Además viola la regla 8 (falacia ecológica) y la sección 3 (el censo no trae edad).
3. **Publicidad** usa una tabla inventada: `TERRITORY_HEATMAP_REGISTRY` con 42,5 % de jóvenes indecisos, 34 % de swing, CTR y CPM. Fuera de las 17 ciudades de la tabla usa los mismos valores por defecto. Además **llama a Gemini sola** al abrir la vista y en cada cambio de territorio o arquetipo (`TargetedAdvertisingOptimizerView.tsx:75-94`), lo que gasta cuota sin que nadie lo pida.
4. **Posturas políticas fijas dentro de los prompts**: `PdfScriptGenerator.tsx:763,1060`, `SubregionesStrategicDeepening.tsx:496-611` y `subregionesDeepening/helpers.ts:511` (hashtags), más `ElectoralSimulatorDashboard` ("Candidato Líder: Isaac Mendoza"). Deberían venir de la identidad, que es editable. Algunas piden "máxima viralidad" y "tono demoledor" sin datos con fuente.
5. **Multimedia, pestaña imagen**: pide una "auditoría de colorimetría" **sin enviar ninguna imagen** (la deduce del nombre y la edad) y la guarda en el perfil. Por su parte, **el Analista de video** rellena con valores inventados lo que Gemini no devuelve ("130 ppm", muletillas, paleta).

### Altos: incoherencia y desperdicio

6. **La identidad no gobierna casi nada**, aunque la pantalla de Identidad promete "Todo Proteus se ajusta a esta identidad" (`IdentidadCandidatoView.tsx:86`).
7. **El marco llega recortado**: 1,3 mil de 42,6 mil caracteres. El analista recibe la orden de ser breve, pero la sección 7 del reglamento pide un mínimo útil. El análisis de piezas recibe reglas "para la pieza" que no aplican a una pieza ajena.
8. **Reglas duplicadas a mano**: la regla "los votos se cuentan donde está el puesto" está escrita en 4 sitios, y los verbos en 2. El análisis narrativo (`municipioNarrativeService`) fija verbos y números de regla sin leer el marco: si Isaac cambia el reglamento, esas copias no se actualizan.
9. **Dos "territorios activos"** que no se hablan: `SeleccionTerritorio` (generador y analista) y `activeTerritoryContextService` (Redactar, Segmentos, Publicidad).
10. **Todos los botones "Generar contenido" del mapa** (drawer, popup, banner) llevan a Redactar, la herramienta vieja con datos a mano, y no al generador que está en la misma pantalla.

### Medios: deuda

11. **Funciones duplicadas**:
    - cuatro generadores de piezas o guiones: Redactar, Generador, Publicidad, PDF/Subregiones;
    - dos analizadores de video: Analista de video y Análisis de piezas;
    - cuatro copias de "buscar el perfil del candidato en la web".
12. **Código muerto**:
    - 25 archivos sin importar, entre ellos `presidentialElections2026.ts` con 12.815 líneas;
    - 2 vistas retiradas que siguen montadas en `App.tsx`;
    - un enlace a una vista inexistente (`'observatorio-redes'`), que deja la pantalla en blanco;
    - `queryGeminiWithMunicipalContext` sin uso.
13. **Bundle**: `CandidateProfileManager` entra entero porque `App` importa de él un perfil por defecto.

## 4. Propuesta: una sola tubería y pocas herramientas

```
  Dato con fuente           Interpretación            Voz                  Tarea
  ─────────────────         ──────────────            ─────────            ──────────────────────────
  dossierTerritorial  ──►   marco (reglamento   ──►   identidad    ──►     analizar · redactar pieza ·
  (único; ya existe)        completo por capa)        del candidato        brief · evaluar · revisar
```

- **Fuente única de datos**: `dossierTerritorialService`, que ya existe y ya usan el analista y el generador.
  - Ninguna herramienta vuelve a leer `antioquia125MunicipalitiesMasterData`, `activeTerritoryContextService` (en sus cifras), `voterAudienceCatalog` ni `adTargetingModelData` para darle cifras a Gemini.
  - Lo que hoy solo existe a mano (seguridad, problemas, vocaciones económicas) entra al dossier **solo con fuente**: Medicina Legal o SIEDCO para seguridad, DANE para economía. Si no hay fuente, el dossier dice "sin información".
- **Un constructor de prompts** (`armarPrompt({ tarea, dossier, identidad, marco })`). Cada tarea declara qué recibe:

| Tarea | Dossier | Identidad | Marco | Libro de piezas | Salida |
|---|---|---|---|---|---|
| Analizar (analista) | completo | sí (para recomendaciones) | **reglamento completo** de la Capa 1 (24 mil caracteres) + Capa 2 cuando exista | no | texto con verbos |
| Redactar pieza | completo + foco | sí | piso 3 + Capa 3/4 cuando existan | criterios del tipo de pieza | pieza en texto plano |
| Brief o estrategia | completo | sí | reglamento completo | no | 7 puntos (lo que hoy hace Redactar) |
| Evaluar pieza | foco | sí | piso 3 | sí | JSON (lo que hoy hace Análisis de piezas) |
| Revisar | la pieza generada + dossier | sí | piso 3 + Regla 9 | sí | observaciones (los "Revisores" como paso, no como vista) |

- **Las reglas se leen del marco, no se copian**:
  - verbos, frases prohibidas y regla del puesto salen de `marcoService`;
  - `municipioNarrativeService` toma de ahí los números de regla;
  - Gemini recibe el reglamento entero donde cabe. Un dossier de 35-50 mil caracteres y un reglamento de 24 mil suman unos 20 mil tokens, holgados para Gemini 3.8 Flash.
- **Un solo territorio activo**: `SeleccionTerritorio`. `activeTerritoryContextService` queda solo para recordar la selección, sin cifras.
- **Flujo encadenado**: Analista → "convertir en pieza" → Generador → Revisar (evaluación automática de la pieza con el libro) → Guardar en Archivos. Hoy cada paso es una isla.

### Qué se queda, qué se fusiona y qué se retira

| Herramienta | Decisión | Por qué |
|---|---|---|
| Generador de contenido (mapa) | **Se queda** como "Director de contenidos" y absorbe Redactar y Publicidad | Es la única con datos reales, identidad y marco |
| Analista territorial | **Se queda**; recibe el reglamento completo y la identidad | Fuente única: el dossier |
| Análisis de piezas | **Se queda**; absorbe al Analista de video | Mide en el navegador y evalúa contra el libro |
| Redactar (brief de 7 puntos) | **Fusionar** como tarea "Brief" del director | Duplica al generador con datos a mano |
| Publicidad (variantes por arquetipo) | **Fusionar** como tarea "Variantes por segmento"; borrar la tabla inventada y la llamada automática | Cifras inventadas; gasta cuota |
| Segmentos | **Rehacer** con datos reales (proyección DANE sexo × edad 2026 a municipio, censo por puesto), sin "votos por cohorte" | Viola las reglas 8 y la sección 3 |
| Revisores (5 agentes) | **Convertir** en el paso "Revisar" de la tubería | Hoy son 5 prompts con datos a mano y la etiqueta "versión 2.4, online" fija |
| Multimedia: imagen | **Retirar** hasta que analice una foto real (Análisis de piezas ya lo hace) | Inventa sin imagen |
| Analista de video | **Retirar** (lo cubre Análisis de piezas) | Duplicado; rellena valores inventados |
| Subregiones, Departamento (PDF), País | **Dejar como vistas de datos**; quitar sus generadores de guiones o pasarlos a la tubería | Prompts con posturas fijas y datos de muestra |
| Escenarios (simulador) | **Retirar el análisis de Gemini** hasta tener votos base reales; el D'Hondt sí sirve | `baseVotes` a mano y candidato fijo en el prompt |
| Código muerto y vistas retiradas | **Borrar** | Peso, confusión y un enlace roto |

## 5. Plan por fases (con criterio de aceptación)

**Fase 0. Apagar lo que hace daño (1-2 días)**
- Quitar la llamada automática de Publicidad: solo se genera al pulsar.
- Quitar las posturas políticas fijas de los prompts (PDF, Subregiones, Simulador); si se necesitan, que vengan de la identidad.
- Los botones "Generar contenido" del mapa llevan al generador del mapa.
- `activeTerritoryContextService`: población y NBI del DANE, o "sin información"; nada de 2.650.000 ni 50.000.
- Ocultar Multimedia imagen, Analista de video y el análisis de Gemini de Escenarios.
- Borrar el código muerto y las 2 vistas retiradas; arreglar `'observatorio-redes'`.
- *Aceptación:* ningún prompt alcanzable contiene cifras de archivos a mano ni nombres de políticos escritos en el código; `ci:local` en verde.

**Fase 1. Fuente única (3-4 días)**
- `armarPrompt` y las tareas de la tabla.
- Redactar y Publicidad pasan a ser pestañas del director (Pieza, Brief, Variantes por segmento) y leen el dossier.
- Un solo territorio activo.
- *Aceptación:* las 25 llamadas alcanzables quedan en 5 tareas; cada respuesta muestra "datos usados" (como hoy el generador).

**Fase 2. Marco completo (2 días)**
- El reglamento completo llega al analista y al brief.
- Verbos y frases prohibidas se leen del marco en todos los prompts y en la narrativa.
- `docs/marco/README.md` se actualiza.
- *Aceptación:* cambiar una regla en el `.docx` de Isaac y reingestarla cambia lo que recibe Gemini, sin tocar código.

**Fase 3. Calidad medida (2-3 días; requiere clave de Gemini válida)**
- Batería de 30 preguntas por nivel (barrio, comuna, municipio) con lo que la respuesta debe y no debe decir.
- Medir alucinación (cifras que no están en el dossier) y errores de unidad (votos atribuidos a residentes, preconteo frente a escrutinio).
- Repetir la batería al cambiar un prompt.
- *Aceptación:* 0 cifras fuera del dossier en la batería; el resultado de las pruebas queda en `docs/`.

**Fase 4. Segmentos con datos reales y capas 2-4 del marco** (cuando Isaac las entregue).

## 6. Decisiones que necesitan a Isaac y Jose

1. ¿Se aprueba fusionar Redactar y Publicidad en el director, y retirar Multimedia imagen, Analista de video y el análisis de Escenarios?
2. Las posturas políticas que hoy están fijas en los prompts (PDF, Subregiones): ¿pasan a la identidad o se eliminan?
3. ¿Se borran los 29 archivos de datos a mano, o se conservan solo para la interfaz, marcados "sin verificar" y nunca enviados a Gemini?
4. Prueba con Gemini real: hace falta la clave del servidor válida (hoy da 403 en producción).

## 7. Lo que ya se hizo en esta sesión (base de la propuesta)

- Existe el `dossierTerritorialService`, que el analista y el generador leen completo.
- Hay un nuevo endpoint `/api/analista/preguntar`.
- La ubicación de los puestos por territorio quedó compartida entre la ficha y el dossier (`cargarPuestosTerritorio`).
- El dossier ya respeta la sección 3 (sin "votantes" por sexo × edad), marca los actores sin verificar línea por línea y hace prevalecer el escrutinio sobre el preconteo.
