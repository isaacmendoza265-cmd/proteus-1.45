# Auditoría final de las herramientas de Proteus

**Fecha:** 2 de octubre de 2026 (cierre de la sesión de Claude en Cowork). **Código:** `main` después de `68616fa`.

## Cómo se hizo

1. **Inventario de las 19 vistas del menú** (`src/components/layout/navigation.ts`) y de los componentes que cada una carga: qué llama a Gemini, a qué rutas del servidor y qué datos usa.
2. **Prueba en el navegador de las 19 vistas** (Playwright contra `npm run dev` con PostgreSQL local): cada vista se abrió por el menú y se registraron errores de página, errores de consola y respuestas `/api/*` con estado 400 o más. **Resultado: 0 errores en las 19.**
3. **Suite completa:** 36 archivos, **392 pruebas en verde**, incluidas las 9 de integración con PostgreSQL. `npm run ci:local` en verde: migraciones, tipos, lint, pruebas y build.
4. **Revisión de rótulos:** se revisó que lo que no es dato oficial diga que no lo es: ejemplo, supuesto, estimado, auxiliar o sin verificar.

Lo que **no** se pudo probar: ninguna llamada real a Gemini, porque la clave de producción da 403 y aquí no hay clave. Todo lo de IA está probado con respuestas simuladas.

## Estado por herramienta

Leyenda: **Lista**: funciona en producción hoy. **Lista, falta la clave**: el código está completo y probado con Gemini simulado; sin clave válida responde con un error claro. **Con condición**: depende de algo externo.

| Módulo › vista | Qué hace | IA | Datos | Estado |
|---|---|---|---|---|
| Inicio | Esquema de fuentes, proceso y capacidades; figuras 3D | No | Leídos de los servicios | **Lista** |
| Territorio › Mapa y fichas | Consola de navegación: la unidad elegida es el territorio activo de todo Proteus. Incluye la ficha, el análisis del territorio, las noticias, el generador, el analista, las redes de poder y las encuestas | Analizar, redactar, noticias | Registraduría, DANE, Distrito de Medellín, seguridad, Defensoría y noticias | Ficha y análisis calculado: **lista**. Gemini: **lista, falta la clave** |
| Territorio › Municipios | Explorador de los 125 municipios | No | Oficiales | **Lista** |
| Territorio › Subregiones | Informe transversal, noticias del mes y guiones (búsqueda de Google) | Investigar | Motor y búsqueda | **Lista, falta la clave** |
| Territorio › Departamento | Informe de la Gobernación y guiones desde un PDF | Investigar | SQLite en el PC de Isaac | **Con condición**: en el servidor el puente responde con un error controlado (pendiente pasar a PostgreSQL). El informe de ejemplo está rotulado |
| Territorio › País | Tablero nacional con búsqueda de Google | Investigar | Búsqueda | **Lista, falta la clave** |
| Electorado › Segmentos | Personas de 18+ por sexo, edad, estrato y educación; Medellín con proyección 2030; análisis de un segmento | Analizar | DANE y Distrito (Oficial o Estimado, rotulado) | Cifras: **lista**. Gemini: **lista, falta la clave** |
| Electorado › Encuestas 2026 | Encuestas registradas ante el CNE | No | CNE | **Lista** |
| Electorado › Escenarios | Simulador D'Hondt, plan táctico y DAFO | Analizar | Supuestos editables, rotulados | Simulador: **lista**. Gemini: **lista, falta la clave** |
| Contenido › Redactar | Brief de 7 puntos por audiencia | Brief y redactar | Motor | **Lista, falta la clave** |
| Contenido › Publicidad | Variantes de anuncios por arquetipo | Redactar | Supuestos de pauta, rotulados | **Lista, falta la clave** |
| Contenido › Multimedia | Auditoría de la foto y los videos del candidato | Evaluar | Mediciones en el navegador | **Lista, falta la clave**. Para que Gemini vea fotos y videos, activar Identidad › Privacidad |
| Contenido › Revisores | Cinco roles de Gemini | Varias | Motor | **Lista, falta la clave** |
| Día E › Auditoría E-14 / E-24 | Descuadres entre actas y minutas de reclamación | No | **Datos de ejemplo** escritos a mano | **Lista como demostración**. Corregido en esta auditoría: no decía en la vista que era de ejemplo |
| Ajustes › Identidad del candidato | Identidad, privacidad, análisis de piezas y libro de reglas | Evaluar | Base de datos | Guardado: **lista**. Gemini: **lista, falta la clave** |
| Ajustes › Marca Proteus | Manual de marca | No | — | **Lista** |
| Ajustes › Marco metodológico | Capas 0-4 del marco y reglamento vigente | No | `src/data/marco/` | **Lista**. Capa 2 (Isaac) y Capa 3 en producción |
| Ajustes › Consola técnica | Interacciones de Antigravity | Agente (sin las tres macrofuentes, a propósito: es técnica) | — | **Lista, falta la clave** |
| Ajustes › Usuarios y acceso | Alta, roles y bloqueo de usuarios | No | Base de datos | **Lista** |

## Motor de análisis (lo que reciben todas las herramientas de IA)

- **30 llamadas a Gemini en el cliente**. Todas declaran su tarea: investigar 9, evaluar 5, redactar 5, brief 5 y analizar 4. Hay 9 que van sin las tres macrofuentes a propósito: extracción de PDF y captura del perfil. Un test (`tuberiaIA.test.ts`) impide que se agregue una llamada sin declararla.
- **Rutas del servidor:**
  - `/api/contenido` y `/api/analista` reciben las macrofuentes desde su servicio.
  - `/api/piezas` las recibe desde `analisisPiezas`.
  - `/api/noticias` alimenta el motor.
- **Fuentes del dossier de cada unidad:**
  - las oficiales fijas: Registraduría, DANE, CUIPO y categoría;
  - 8 auxiliares registradas por código;
  - 3 JSON declarativos: proyección del Distrito 2018-2030, seguridad de la Policía y alertas de la Defensoría;
  - las noticias guardadas (auxiliar);
  - el historial del candidato.
- **El dossier se arma en los 125 municipios.** Se corrigió hoy: fallaba en 5 municipios.
- **Gemini nunca recibe la clave desde el navegador:** `vite.config.ts` ya no la inyecta y el build no contiene claves de Google.

## Correcciones hechas en esta auditoría

- **Día E sin rótulo de ejemplo:**
  - La vista mostraba puestos, mesas y votos escritos a mano, y generaba "Minutas formales de reclamación" con el aviso "Fundamentación legal verificada… para ser radicada inmediatamente", sin decir que eran de ejemplo. Solo la página de Inicio lo decía.
  - Ahora hay un aviso "Datos de ejemplo" en la vista. El modal dice "Minuta de ejemplo: no la radiques", y el texto que se copia empieza con "[MINUTA DE EJEMPLO… No radicar.]".
  - Así se cumple la decisión de Isaac del 2 de octubre: los datos de ejemplo se mantienen, rotulados como de ejemplo.
- **Nota vieja en `ESTADO_PROYECTO.md`:** decía que la clave de Gemini seguía en el bundle del cliente. Ya no está; se actualizó la nota.

## Lo que falta (en orden de impacto)

1. **`GEMINI_API_KEY` válida en Coolify.** Hoy da 403 ("Your project has been denied access"). Sin ella, ninguna función de IA responde en producción: análisis redactado, generador, analista, segmentos, piezas, multimedia, noticias, subregiones, país y revisores. Al arreglarla:
   - probar una llamada de cada tipo;
   - validar el análisis de piezas con 3 o 4 piezas reales;
   - confirmar la tarifa de la búsqueda de Google desde Gemini.
2. **Redesplegar en Coolify** el último `main`, que trae la tabla de noticias, la seguridad y la proyección 2030.
3. **Modelo de respaldo:** por definir (Isaac mencionó DeepSeek). Hoy todo depende de `gemini-3.8-flash`.
4. **Privacidad de la identidad:** activar "Enviar imágenes/videos a Gemini" si se quiere que la IA vea fotos y videos.
5. **Multi-tenant** (prioridad, tarea de Jose): hoy es un solo inquilino y todos los usuarios ven todo.
6. **Gobernación → PostgreSQL** (hoy SQLite en el PC de Isaac).
7. **Día E con actas reales**: cargar los E-14 y E-24 cuando existan y retirar los de ejemplo.
8. **Seguridad, siguientes fuentes**: Fiscalía (líderes, periodistas y defensores), MOE 2027 y los estudios que elija Isaac.
9. **Marco**: la Capa 2 la compila Isaac; los dossiers de familias 1-3 y la Capa 3 están en producción.
10. **Operación**:
    - cambiar la clave del admin `kali@kali.com`;
    - crear el webhook de auto-deploy (Isaac);
    - instalar la aplicación de Claude en GitHub en el repositorio, para que las sesiones puedan subir sin bundles (Isaac).
