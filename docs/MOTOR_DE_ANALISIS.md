# Motor de análisis: las tres macrofuentes de toda llamada a IA

- **Fecha:** 2-oct-2026.
- **Autor:** Claude, en una sesión de Cowork.
- **Código:** `src/services/ia/` (`macrofuentes.ts`, `registroPerfil.ts`, `registroLlamadas.ts`, `motor/`).
- **Datos declarativos:** `src/data/motor/` (ver su `README.md`).

## 1. Regla

Toda herramienta de Proteus que use IA generativa parte, completas, de tres macrofuentes:

1. **A. Datos del aplicativo.** Todo lo que Proteus tiene de la unidad territorial elegida, de todos los tipos, niveles y categorías.
   - Las secciones oficiales del dossier (`dossierTerritorialService`): DANE, Registraduría, Contraloría, Contaduría, AMVA, catastro y otras.
   - Las fuentes registradas en el motor:
     - auxiliares por código (`motor/fuentesAuxiliares.ts`);
     - JSON declarativos (`src/data/motor/*.json`).
   - Cada sección lleva su nivel: oficial o AUXILIAR (sin verificar).
2. **B. Perfil del candidato.**
   - Su naturaleza: la identidad completa, con la postura política.
   - Lo que el equipo escribió en el perfil.
   - Su historial en los datos (`motor/historialCandidato.ts`):
     - elecciones del municipio en que aparece por nombre, con votos en esa elección;
     - piezas analizadas.
3. **C. Marco teórico interpretativo.** Todo lo integrado, igual para toda tarea:
   - cada bloque ingestado de las capas 0 a 4;
   - la semilla de posturas políticas (`src/data/marco/semilla/`);
   - el libro de reglas de piezas;
   - el inventario de lo que falta.

La regla de integridad (`JERARQUIA`) las ordena:

- los datos son la verdad; lo oficial prevalece sobre lo auxiliar;
- el perfil decide voz, ejes y postura; lo que no define no se supone;
- el marco interpreta;
- nada se inventa: lo que falte se dice.

## 2. Cómo se aplica

`geminiService.generateContent` y `callGeminiApi` anteponen el bloque a la instrucción de sistema de **toda** llamada. Cada herramienta declara qué hace con la opción `proteus`:

| Opción | Para qué |
|---|---|
| `tarea` | `analizar`, `redactar`, `brief`, `evaluar`, `revisar`, `investigar` o `general`. Cambia la instrucción, no lo que se lee. |
| `seleccion` | La unidad de la herramienta. Por defecto, el territorio activo de la barra superior. Helpers: `seleccionDeDane()`, `seleccionDeSubregion()`, `seleccionDeEstado()`. |
| `incluirDatos: false` | Cuando la herramienta ya manda el dossier en su instrucción (generador del mapa, analista), o cuando trabaja fuera de Antioquia o sobre una persona que no es el candidato del perfil. |
| `sinMacrofuentes: true` | **Solo** para extraer literalmente un texto o PDF del usuario o para **capturar el perfil** (lo que luego es la macrofuente B). Si se le pasaran las fuentes, Gemini mezclaría datos del territorio o del perfil cargado con lo que debe copiar. |

La prueba `src/services/__tests__/tuberiaIA.test.ts` falla si una llamada nueva no declara `proteus`.

### Calidad del análisis (3-oct-2026)

Isaac vio análisis "muy mediocres": recitaban cifras sin implicaciones, no comparaban, no priorizaban y ponían una cautela en cada frase. Cambios:

- **Orden del sistema**: macrofuentes → instrucción propia de la herramienta → `ESTANDAR` → `TAREAS[tarea]` (`macrofuentes.ts`). Lo último es lo que Gemini sigue mejor con contextos largos.
- **`ESTANDAR`** (común a toda herramienta): conclusión primero, el "¿y qué?" de cada cifra, comparar siempre, 3 a 5 hallazgos priorizados, nombres concretos, nada genérico, buscar lo no obvio, recomendaciones accionables, la incertidumbre una sola vez, verbos del marco por hallazgo (no por frase) y una revisión antes de responder. Si la herramienta fija un formato (JSON, apartados), ese formato manda.
- **`TAREAS`**: cada tarea es un método con estructura de salida (analizar: Lo esencial · Hallazgos · Qué haría el candidato · Lo que falta saber; brief: diagnóstico, cuenta de votos, públicos, mensajes, acciones y riesgos, indicadores; redactar: gancho, lenguaje local, sin clichés, nada de cuentas o lemas inventados, espacio para la mención de financiación de la propaganda).
- **Indicadores derivados** (`ia/indicadoresDerivados.ts`): sección nueva del dossier con margen 1.º-2.º, participación y votos en juego, variación frente a la jornada anterior del mismo tipo y, en comunas y barrios, brecha frente al municipio. Firmados "Modelo Proteus con datos de la Registraduría".
- **Servidor**: `configAnalisis` (razonamiento `HIGH`, sin fijar temperatura: Gemini 3 razona peor con temperatura baja; se quitó el 0,2 de piezas) y `exigirTexto` (una respuesta vacía es 503 y baja de modelo, en vez de 200 con texto vacío) en analista, contenido, piezas y el genérico.
- Prueba A/B con la clave paga (analista, Medellín, mismo perfil): la respuesta nueva abre con la conclusión, usa las variaciones en puntos, da la meta de votos preferentes y cierra con apuestas y datos faltantes; la vieja recitaba cifras por partido.

### Mapa de herramientas (2-oct-2026)

| Herramienta | Tarea | Unidad |
|---|---|---|
| Generador de contenido del mapa | redactar (sin repetir datos) | territorio del mapa |
| Analista territorial | analizar (sin repetir datos) | territorio del mapa |
| Análisis de piezas | evaluar | territorio activo |
| Segmentos | analizar | territorio activo |
| Publicidad segmentada | redactar | territorio activo |
| Multimedia: colorimetría y video | evaluar | territorio activo |
| Director de contenidos (brief) | brief | territorio activo |
| Subregiones: informe / noticias / guiones | brief / investigar / redactar | la subregión |
| Municipios de Antioquia: informe | brief | el municipio |
| Tablero nacional (departamento, municipio) | investigar | Antioquia o su municipio; otro departamento sin datos |
| Herramientas de campaña (clima político, DAFO) | investigar / analizar | territorio activo |
| Guiones desde PDF | redactar | territorio activo |
| Simulador (plan táctico) | brief | Antioquia |
| Cuadrilla de agentes | según el rol | el municipio escrito |
| Casas políticas (actor, brief) | investigar / brief | municipio del actor o de la casa |
| Búsqueda web de una persona (Subregiones, Municipios, PDF) | investigar, sin datos | — |
| Captura del perfil (web, PDF) y extracción de encuestas, temas e informes PDF | sin macrofuentes | — |

## 3. Dinámico: cómo entra algo nuevo sin tocar las herramientas

| Llega… | Qué hacer | Entra en |
|---|---|---|
| Un dato por territorio | Un JSON en `src/data/motor/` con el contrato del README (lo valida `validarDeclarativo`) | la siguiente compilación |
| Una fuente que necesita código | `registrarFuente({ id, titulo, categoria, nivel, fuente, aplica, lineas })` en `motor/` | la siguiente compilación |
| Un bloque del marco | Reingesta de los `.docx` (`scripts/ingestar_marco.mjs`) | la siguiente compilación |
| Un cambio del perfil o de la identidad | Nada: `App` llama a `registrarPerfil()` al guardarlo | la siguiente llamada |

Las cachés se invalidan por versión (`versionFuentes()`, `versionPerfil()`) y por unidad.

El dossier informa la **cobertura**: cada fuente registrada sale "con datos", "sin datos" o "no aplica" para la unidad. El panel **Motor de análisis** del analista (`components/ia/EstadoMotorIA.tsx`) la muestra junto con la última llamada: tarea, unidad y caracteres de cada macrofuente.

## 4. Eficiencia

- **Orden estable.** El bloque va de lo más estable a lo más variable: jerarquía → marco → perfil → datos → herramienta. Así Gemini reutiliza el prefijo común entre llamadas (caché implícita).
- **Una sola construcción.** Cada macrofuente se arma una vez por unidad y versión.
- **Tamaño medido (El Poblado).** Unos 119 mil caracteres: datos 60 mil, perfil 1 mil y marco 57 mil. Está por debajo del límite de 250 mil que el servidor admite para la instrucción de sistema.
- **Sin repetición.** `incluirDatos: false` evita mandar dos veces el dossier en las herramientas que ya lo incluyen.

## 5. Datos auxiliares

La auditoría (`docs/AUDITORIA_DATOS_AUXILIARES.md`) clasificó los archivos escritos a mano:

- **A. Copia de lo oficial:** no entra, porque repite lo oficial.
- **B. Fuente identificable sin verificar:** entra rotulado AUXILIAR, con su fuente declarada.
- **C. Plantilla o supuesto sin fuente:** no entra como dato. Las herramientas que lo muestran lo rotulan "supuesto" o "texto fijo".

Las herramientas heredadas que todavía leen fichas internas las mandan rotuladas "FICHA AUXILIAR" y repiten que prevalece la macrofuente A.
