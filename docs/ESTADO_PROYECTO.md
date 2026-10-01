# Proteus — estado del proyecto (memoria compartida entre agentes)

Última actualización: 1-oct-2026 (Claude Opus: capa institucional del mapa, `53cd8e5`). **Todo agente debe actualizar este archivo al terminar.**
Repositorio local: `C:\Users\isaac\OneDrive\Documentos\Proyecto Proteus`. Remoto: github.com/isaacmendoza265-cmd/proteus-1.45.
Ramas `codex/navegacion-mapa`, `claude/inicio` y `claude/encuestas-2026` ya fusionadas en `main` (28-sep). No subir bundles a GitHub por la web: se aplican con `git fetch <bundle>`.
Entorno Windows: Node 24 está en `C:\Program Files\nodejs` pero no siempre en el PATH de los agentes
(`$env:Path = "C:\Program Files\nodejs;" + $env:Path`). `npx tsc` también revisa las carpetas locales ignoradas
(`_archivo/`, `_originales/`, `SUBIR_A_GITHUB/`) y da 24 errores ahí: no cuentan, `src/` está limpio.

## 1. Qué está hecho en Antioquia (125 municipios)
- **Cartografía**: 46 municipios > 20.000 votantes con comunas/barrios y veredas; 79 municipios ≤ 20.000
  solo con cabecera + veredas. Medellín con Altavista y Palmitas; Bello con 12 comunas + 19 veredas + sector Ovejas.
- **Demografía y economía por manzana (CNPV 2018)**: estrato, sexo, edad, vivienda, IPM, vulnerabilidad,
  unidades económicas; NBI municipal; pirámide sexo × edad 2026 (proyección DANE).
- **Resultados por puesto (22 elecciones)**: 2026 Senado, Cámara, Presidencia 1.ª/2.ª; 2023 Alcaldía,
  Concejo, Gobernación, Asamblea; 2022 Senado, Cámara, Presidencia; 2019 y 2015 territoriales; 2018 Presidencia.
  Fuente: escrutinio mesa a mesa (MMV) de la Registraduría. Congreso 2018 no existe mesa a mesa.
  Ubicación de puestos históricos: 2015 90 %, 2018 85 %, 2019 93 %, 2022 95 %.
- **Concejo 2023 por candidato** (29-sep, `fbfad26`): voto preferente y voto solo por la lista de cada candidato,
  por municipio, en la ficha del municipio (Política › 2023 › Concejo). 13 municipios de escrutinio E-24/E-26, 86 de
  preconteo con ≥ 98 % de mesas, 26 "Sin información" (sin cifras), Pueblorrico "Oficial · incompleto" (jornada
  repetida). `src/data/electoral/concejo2023/`, `concejo2023Service.ts`, `Concejo2023Candidatos.tsx`.
- **Puestos 2026**: 1.280 en Antioquia; 57 sin ubicar (22 en los grandes, 35 rurales en los pequeños).
  Coordenadas: Divipole 2023 → dirección → lugar → OpenStreetMap (validado: urbano mediana 40 m) →
  cabecera/centro poblado/vereda (aproximada).
- **App**: ficha de territorio con selector de año, panel y ficha de puesto, visor E-24 de Medellín con
  datos reales, estética "sobrio cívico" en todas las vistas.
- **Mapa** (27-sep): clic en comuna → sus barrios; clic en barrio → ficha; comunas y municipios vecinos
  clicables alrededor (sin volver a la subregión); barra lateral ocultable con territorio, capa y puestos.
  Capas Electoral (año + tipo; puestos de esa elección), Demográfica y Económica (`mapColorService.ts`).
- **Encuestas 2026** (27-sep, rama `claude/encuestas-2026`): módulo `<voto-correlaciones>` 0.3.0 (proyecto
  voto-demografia-2026: 43 encuestas y acumulados del Registro Nacional de Encuestas del CNE, solo agregados, n < 30
  suprimido) en `public/modulos/voto-correlaciones/`. Vista Electorado › Encuestas 2026 con la estética cívica
  (tema claro/oscuro) y, debajo del mapa, "Encuestas y urnas": acumulado de la fase previa a cada elección
  (Senado, 1.ª y 2.ª vuelta) frente al resultado oficial del municipio o de Antioquia, con IC 95 %.
- **Identidad del candidato** (28-sep, rama `claude/identidad`): Ajustes › Identidad del candidato reescrita en
  nueve bloques (ficha, posicionamiento, voz y oratoria, imagen, límites, canales, equipo, referentes, privacidad),
  guardado automático, completitud por bloque y vista de "lo que Proteus le dice a la IA". El generador de contenido
  ya usa la identidad completa (`identidadParaIA`); los campos viejos del perfil se sincronizan (`sincronizarLegado`).
  Dentro de la misma ventana: **Análisis de piezas** (imagen, video, audio, texto, YouTube) con capa *Medido* en el
  navegador (paleta k-means en CIELAB, ΔE2000 contra la paleta de marca, WCAG, temperatura, tercios, cortes por
  histograma) y capa *Estimado* con Gemini 3.8 vía `/api/piezas/analizar` y `/api/piezas/subir` (Files API), y el
  **Libro de reglas v1.0** (`src/data/analisisPiezas/libroDeReglas.ts`): 11 principios, escala 1-5, 8 dimensiones y
  36 criterios anclados, esquema JSON de respuesta; el puntaje global lo calcula Proteus.
- Verificación al último commit (`f0b3769`): tsc limpio en `src/`, 211 pruebas, build OK.

## 2. Decisiones de Isaac (respetarlas)
- 28-sep: el análisis de video, oratoria, composición y colorimetría con Gemini 3.8 **no es un módulo independiente**:
  depende de Ajustes › Identidad del candidato. Libertad para definir las características personalizables, el libro de
  reglas de Gemini y otros bloques de personalización.
- Seguridad y etapa 2 (social listening, encuestas propias): aplazados.
- 27-sep: integrar el módulo de encuestas CNE 2026 (`voto-correlaciones`, de la aplicación modular de encuestas)
  "de forma orgánica y útil" (libertad de diseño). Encuestas CNE a municipio o departamento, nunca a barrio (reglamento v1.2).
- 27-sep: **marco metodológico** en marcha (antes aplazado). 4 capas (interpretación/publicidad × general/local),
  subido por bloques. Bloque 1: reglamento de interpretación v1.2 + dossier Familia 4 (arrastre). El reglamento
  vigente prevalece sobre cualquier salida de la aplicación (ver `docs/marco/README.md`).
- 27-sep: listas de puestos y de actores de la ficha, desplegables.
- 27-sep: **el mapa es el filtro de todo**: el usuario navega por el mapa y cada herramienta (ficha, puestos,
  generador de contenido, análisis narrativo) sigue el área elegida. Subregión: primer clic la elige, el
  segundo abre el municipio.
- 27-sep: análisis narrativo (Valle de Aburrá + 30 municipios de mayor censo; Medellín por comuna) generado
  sin Gemini, determinista a partir de datos con fuente. Isaac no ha dicho si quiere ampliar la lista de
  municipios o si prefiere que se redacte con Gemini una vez la clave funcione (hoy sigue en 403).
- Estrato: se mantiene CNPV 2018 hasta encontrar la estratificación vigente (cada municipio tiene la suya;
  luego investigar por municipio, de los más grandes a los más pequeños).
- Pobreza monetaria: rescindida (no existe por municipio). Usar NBI.
- Valor agregado DANE: se evalúa reemplazarlo por presupuesto de la alcaldía.
- Sin predicción de votos por dinero; sin Ley de Benford (ver `protocolos_de_automejora/DECISION_*`).
- Municipios ≤ 20.000 votantes: sin barrios, solo cabecera y veredas; ubicar puestos aunque sea aproximado.
- Puestos 2026 que no existían en 2015: normal, no es error.
- Descargas: pedir permiso por lote (archivo, fuente, tamaño).
- 27-sep: navegación del mapa por clic (comuna → barrio; barrio directo si el municipio no tiene comunas;
  cambiar de comuna o municipio sin retroceder). Recuadros del mapa en barra lateral ocultable. La ficha de
  puesto se cierra al hacer clic en otra cosa.
- 27-sep: el mapa colorea territorios y puestos según la capa: electoral (año; tipo de elección),
  demográfica y económica. Capas NBI y Riesgo quitadas como botones (NBI dentro de la económica; Riesgo sin fuente).

- 27-sep: el mapa y el panel derecho muestran la misma selección (elección y capa); el mapa lleva un
  generador de contenido con Gemini 3.8 (territorio del mapa, red o medio, tipo de pieza).
- 28-sep: Inicio = página de presentación en esquema (fuentes, proceso, organización, salidas), diseño aprobado en
  el lienzo "Proteus — página de inicio" de claude.ai. Siempre oscura, con figuras 3D de mapas reales.

## 3. Pendientes (en orden sugerido)

### Pendientes de Jose (Network IA Solutions) — anotados el 29-sep-2026
1. **Login con landing page**, similar a la de Casa Korea (`Casa Korea/CasaKoreaProject/apps/web/src/pages/InicioPage.tsx`),
   usando el prompt maestro `D:\Network IA Solutions\Clientes\dexprolaw\docs\PROMPT-MAESTRO-INICIO-PAGINA.md`
   (pide un spec y un plan para una página "de 10.000 dólares", con animaciones de calidad cine; adaptarlo de
   abogados a inteligencia electoral) y la skill `construyendo-landings-premium`.
   Hoy el login es una página mínima servida por `src/server/sesion.ts` (`PAGINA_LOGIN`).
2. **Rediseño con la skill `redisenando-interfaces-en-produccion`** (`D:\Notas super importantes\skills\redisenando-interfaces-en-produccion\SKILL.md`).
   Proteus ya tiene tokens `--c-*` (sobrio cívico), pero muchos módulos viejos siguen con el estilo oscuro/cristal
   (p. ej. `CandidateProfileManager`): unificar sin reescribir módulos que funcionan.
   **29-sep: auditoría y propuesta hechas** → https://claude.ai/artifact/A3EjhbQh7wooxdSqNQpfog («Cada cifra con su
   sello»). Medido: 30/79 pantallas en el sistema (el resto vive de la capa de traducción de `index.css`); en un
   teléfono de 390 px quedan 150 px útiles y las 10 pantallas se desbordan; 75 % del texto de Municipios < 11 px;
   6 pares de contraste fallan (borde de campo 1,24–1,38:1, foco oscuro 2,29–2,52:1). Segmentos presenta
   «Votos proyectados» (modelo de pesos fijos) sin sello de Estimado. Plan en 3 fases; esperando las 3 decisiones
   de la propuesta. El test de contraste está en `docs/rediseno/contraste-tokens.test.ts` (en rojo a propósito; pasa a `src/theme/` en la Fase 0).
3. **Arquitectura multi-tenant de verdad**: que cada cliente que compre el sistema (o que registremos nosotros) tenga
   sus propios datos. Hoy la base es de **un solo inquilino**: un perfil `activo` y todos los usuarios ven todo.
   A decidir en el diseño:
   - Modelo `Organizacion` (campaña/cliente) y `organizacionId` en `Usuario`, `PerfilCandidato`, `PiezaAnalizada`,
     `ArchivoGuardado` y en lo que venga (Gobernación, ajustes). Filtrado obligatorio por inquilino en el servidor
     (desde la sesión, nunca desde el cliente) y pruebas de aislamiento (un usuario de A nunca ve datos de B).
   - Rol de plataforma (nosotros) para dar de alta organizaciones y su primer admin.
   - Qué es común y qué es de cada cliente: los datos oficiales (Registraduría, DANE, GeoJSON) son públicos y
     compartidos, pero hoy están **fijos en el bundle y centrados en Antioquia**. Un cliente de otro departamento
     o de otra elección necesitaría datos por territorio: evaluar pasarlos a la base o a archivos por territorio.
   - "Que todo quede guardado en BD": inventariar lo que aún vive en el navegador (territorio activo, tema y
     paneles pueden seguir locales) y en el PC de Isaac (Gobernación, SQLite).
   - Decisión de negocio con Isaac: el producto es suyo (dueño del repo).

### Pendientes técnicos (Claude, 29-sep-2026)
- **Verificar el 30-sep** que `proteus-db` aparece en la copia diaria del T40 (`/tank/copias-bd/<fecha>/`).
- **Auto-deploy**: el webhook lo debe crear Isaac (admin del repo). Verificar la primera entrega (que el cuerpo no
  diga `Invalid signature`). Mientras tanto, desplegar a mano en Coolify.
- **`GEMINI_API_KEY` válida** en Coolify (la actual da 403): sin ella la IA no funciona en producción.
- **Cambiar la clave del admin `kali@kali.com`** (es `kali`) desde Ajustes › Usuarios y acceso.
- **Gobernación → PostgreSQL** (hoy SQLite en el PC de Isaac; en el servidor da un error controlado).
- Código muerto por limpiar: `HomePageStructure.tsx` y el "Paso 1: Conexión a Google Drive" simulado dentro de
  `CandidateProfileManager.tsx` (inalcanzable desde que se borró `CandidateProfilesView`).
- `www.polimetrics.app` redirige a `http://polimetrics.app` y de ahí a https (dos saltos): funciona, se puede pulir.
- Pruebas más lentas: `electionResultsService` (4,8 s), `municipalDivisions` (3,6 s), `faseB` (3,3 s): cargan los
  JSON grandes. Postgres no es el cuello (suite completa: HDD 10,7 s vs NVMe 10,1 s).
0000. **Análisis de piezas con Gemini**: listo pero sin probar con Gemini real (la clave del servidor sigue en 403).
   Al arreglarla, validar con 3-4 piezas reales (una imagen, un video propio, uno de YouTube, un texto) y ajustar el
   libro. Cuando Isaac cargue la Capa 3 del marco (retórica y creación), integrar sus reglas al libro (sube la versión).
   Deuda: `CandidateProfileManager`/`CandidateVideoAnalyzer`/`CandidateProfileModal` aún llaman a Gemini desde el
   navegador con la clave incrustada por Vite (`process.env.GEMINI_API_KEY`); ya no se usan desde Ajustes, pero la
   clave sigue en el bundle mientras `vite.config.ts` la defina. Migrar lo que falte al servidor y quitar el `define`.
000. **Marco metodológico, bloques siguientes**: Isaac los subirá por partes. Capa 1: dossiers de las familias
   1 (temporal), 2 (mismo ciclo) y 3 (ecológica); capas 2, 3 y 4 vacías. Ingesta: `scripts/ingestar_marco.mjs`.
   Reglas del reglamento v1.2 que la app aún no cumple del todo (a revisar con Isaac): regla 5 (los puestos con
   ubicación aproximada hoy colorean el barrio igual que los exactos), reglas 1/13/17 (tabla de correlaciones y
   arrastre por recorte: módulo por construir), regla 6/14 (fichas B de casas con tipo_fuente, vigente_al, estado).
00. **Clave de Gemini**: la de `.env` recibe 403 "Your project has been denied access". Isaac debe revisarla en
   Google AI Studio; sin eso el generador no produce texto (la interfaz muestra el motivo).
0. **Datos simulados en pantalla (hallados el 27-sep, sin corregir)**: "Día E" muestra actas E-14/E-24 mesa a
   mesa escritas a mano (`src/data/electoralAudit/electoralAuditMasterData.ts`); "Contenido" usa 2.650.000
   habitantes fijos para Medellín (`activeTerritoryContextService.ts`, `antioquiaSubregionesData.ts`,
   `antioquia125MunicipalitiesMasterData.ts`); "Electorado" muestra "votos proyectados" sin método
   (`voterDemographicsService.ts`). Isaac no ha decidido si van antes de P4.
1. **P4 — Presupuesto de alcaldía** (lo más rápido): CUIPO en datos.gov.co, API Socrata:
   "OVCF - CUIPO - Programación de Gastos" (`d9mu-h6ar`) y "Ejecución de Gastos" (`4f7r-epif`).
   Filtrar Antioquia, vigencia 2025/2026; mostrar total y por habitante. Pendiente de aprobación de Isaac.
2. **P4 — Estratificación vigente**: proxy = suscriptores residenciales de energía por estrato y municipio (SUI,
   Superservicios). Por barrio solo con el decreto/capa de cada alcaldía.
3. **P4 — Casas políticas**: base curada "sin verificar". Cruzar ganadores 2015-2023 con Cuentas Claras (CNE);
   cada vínculo necesita fuente citada y revisión humana. Protocolo PA-009.
4. **57 puestos sin ubicar**: probar capa de sedes educativas georreferenciadas (Gobernación/MEN), con permiso.
5. **Barrios con nombre** en Girardota, El Retiro, La Unión, Nechí, Zaragoza, San Pedro de los Milagros,
   Santa Fe de Antioquia, Amagá y El Santuario: no hay capa pública; pedir a las alcaldías.
6. Bello: nombre de la comuna 12 (El Pinar); componentes con datos a mano (BelloInteractiveMap.tsx,
   analystOtherMunisData.ts).
7. Deuda técnica: clave de Gemini en el cliente; Google Drive simulado; JSX monolítico.
8. Séptimo de "los 7 puntos de la app" (26-sep): Isaac no lo ha aclarado.
9. Después de Antioquia: resto del país (fases D y E).

## 4. Mapa de scripts (regenerar datos)
- Cartografía: `build_cartografia_fase_b.py`, `completar_bello_ovejas.py`, `agregar_manzanas.py`.
- Puestos: `build_puestos_20k.py` (nacional, > 20.000), `build_puestos_fase_c_antioquia.py` (79 pequeños),
  `geocodificar_puestos_osm_antioquia.py` (OSM; crudos en `_originales/osm/`).
- Municipio (alcaldía): `build_presupuesto_municipal.py`, `build_categoria_municipal.py`, `build_curules_concejo.py`
  → `src/data/municipal/`, servicio `perfilMunicipalService.ts`.
- Resultados: `build_concejo_2023_candidatos.py` (Concejo 2023 por candidato; crudo
  `_originales/registraduria/Concejo_Antioquia_2023_Todos_los_resultados.xlsx`), `build_resultados_puesto_2023.py`, `build_resultados_historicos.py <2015|2018|2019|2022>`,
  `build_presidencial_2026.py`, `indice_resultados_puesto.py`, `indice_ganadores.py`, `build_e24_medellin_zonas.py`.
- Demografía: `build_censo_electoral.mjs`, `build_proyeccion_sexo_edad.py`.
- Servicios clave: `src/services/pollingStationsService.ts`, `electionResultsService.ts`, `winnersService.ts`,
  `territoryProfileService.ts`; ficha: `src/components/territorio/`.

## 5. Bitácora (agregar arriba lo más reciente)
- 1-oct (Claude Opus, `main`) `53cd8e5`: **capa institucional del mapa** (aprobada por el equipo): presupuesto 2025 por
  habitante, categoría 2026 y curules del Concejo 2023, por municipio (`valorInstitucional` en `mapColorService.ts`).
  Dentro de un municipio no aplica (la leyenda lo dice). Plan de acción del proyecto en Claude Docs ("Proteus — plan
  de acción", 1-oct) y mapa mental en un artifact ("Mapa de Proteus").
- 29-sep (Claude Opus, `main`) `328c3e2`: **informe de Google AI Studio** (29-sep). Aplicado solo el punto 6: el generador de
  contenido pide texto plano y limpia el Markdown de la respuesta (`limpiarMarkdown`, con pruebas). Puntos 1-4 no se
  aplicaron porque ya estaban en `main` (AI Studio trabajó sobre una copia incompleta: reportó 17 suites y 255 pruebas).
  **Pendiente de decisión de Isaac/Jose — punto 5, respaldo de modelos** (si Gemini da 503, pasar a
  `gemini-3.1-flash-lite` y luego `gemini-flash-latest`): hoy `MODELOS_PERMITIDOS` admite solo `gemini-3.8-flash`.
  Implicaciones anotadas en la conversación: calidad distinta y sin aviso, `-latest` cambia de modelo sin aviso, más
  llamadas contra la misma cuota, las reglas del reglamento y el libro de reglas se probaron con 3.8.
- 29-sep (Claude Opus, `main`) `027de41`: **Presupuesto, categoría y curules del concejo** de los 125 municipios (lotes
  1, 2 y 4 aprobados por el equipo; el 3, curules por lista 2019 y 2015 de la Registraduría, va después). Ficha del
  municipio › Demografía › "La alcaldía en cifras"; la vista del Concejo 2023 dice las curules a proveer.
  - Curules 2023: PDF de la Registraduría (19-jul-2023) → `build_curules_concejo.py`. En 88 municipios es una más
    que las repartidas a listas (lo habitual: Estatuto de la Oposición); no se verificó uno por uno.
  - Presupuesto: CUIPO de la Contraloría General de la República (API de datos.gov.co) →
    `build_presupuesto_municipal.py [--descargar]`. 2025 cierre y 2026 a jun-2026. Solo la alcaldía. Medellín 2025:
    11,64 billones. **Reemplaza la idea del valor agregado DANE** (decisión pendiente de Isaac del 27-sep).
  - Categoría: historial de la Contaduría (`HISTORICOS.xlsx`, vigencias 2003-2026) → `build_categoria_municipal.py`.
  - Hallazgo: las curules siguen la población (Ley 136, art. 22), no la categoría ni el presupuesto (Sabaneta, de
    primera y con 593 mil millones, tiene 13 curules como Abejorral, de sexta). Con la población DANE 2026, 89 de
    125 caen en el rango de la ley; los otros 36 tienen el rango de abajo porque la Registraduría usa la población
    certificada para la elección.
  - Crudos (fuera del repo): el PDF y `HISTORICOS.xlsx` se bajaron desde un navegador (Cloudflare y la Contaduría
    cortan las descargas desde la nube); CUIPO se consulta por API.
- 29-sep (Claude Opus, `main`) `4e4241a`: **Concejo 2019 y 2015 por candidato en la ficha**. Los datos ya estaban (MMV
  por puesto, 125 municipios); la ficha solo mostraba 8 candidatos. Ahora usan la vista del Concejo 2023 (listas
  desplegables, voto solo por lista, buscador), en el municipio y en comuna/barrio (suma de sus puestos). Ojo: por
  puesto, `build_resultados_historicos.py` guarda solo los candidatos que suman el 97 % del voto preferente (hasta
  25): en comuna/barrio los candidatos son mínimos y no se calcula el voto solo por lista (se avisa). Para tenerlos
  completos por puesto habría que regenerar la serie sin ese recorte (crudos MMV en `_originales/`). Sin curules de
  2019/2015. ci:local en verde (314 pruebas, 2 nuevas).
- 29-sep (Claude Opus, `main`) `fbfad26`: **Concejo 2023 por partido y candidato** en los 125 municipios, desde el libro
  "Concejo 2023 — Todos los resultados" que entregó el equipo (escrutinio E-24/E-26 CON en 13; preconteo oficial con
  ≥ 98 % de mesas en 86). El crudo va en `_originales/registraduria/` (no está en el repo: hay que copiarlo ahí para
  regenerar). Controles del script: lista + candidatos = total del partido; suma de partidos = votos por partidos.
  Cruces: en los 86 de preconteo, los 913 totales por partido coinciden exacto con el preconteo por puesto ya
  cargado; las curules por lista del escrutinio municipal cuadran en los 99 (la sigla entre comillas, p. ej. "AICO",
  se ignora al cruzar nombres). 26 municipios sin datos sólidos (preconteo < 98 %): "Sin información", sin cifras.
  **Pueblorrico**: el E-26 del 06-nov-2023 solo tiene 103 votos de 7.532 habilitados y la Registraduría repitió la
  elección del Concejo: se muestra con aviso ("Oficial · incompleto"); falta el resultado de la repetición.
  En la ficha: listas desplegables, % de lista sobre válidos y de candidato sobre su lista, buscador. No se marca
  quién quedó electo. ci:local en verde (312 pruebas, 6 nuevas); probado en el navegador (Medellín, Pueblorrico y,
  aislado, Abejorral, Turbo y Envigado).
  **Pendiente**: resultado de la repetición del Concejo de Pueblorrico; escrutinio E-24 de los 26 municipios sin
  datos sólidos (Turbo, Caucasia, Copacabana, La Ceja, La Estrella, Chigorodó…). Ojo: para esos 26 la ficha sigue
  mostrando arriba los votos por partido del preconteo por puesto (< 98 % de mesas), con su sello de preconteo.
- 29-sep (Claude Opus, `main`): **Fase 0 del rediseño** (decisiones de Jose: sello como firma, granate único acento,
  herramientas de desarrollador solo para admin). Tokens `--c-border-campo` y `--c-foco` (test de contraste en verde:
  42 pares, 2 temas); `:focus-visible` global; mínimo de 12 px; barra inferior de módulos por debajo de 1.024 px;
  "Cerrar sesión" en Mi cuenta. Medido con un usuario EQUIPO: 0 desbordes a 390 px (antes las 10 pantallas) y 0
  textos < 11,5 px (Municipios tenía 533/708). Decisiones y porqué en `docs/DESIGN.md`. Arregladas dos intermitencias
  de `ci:local` bajo carga: la prueba de integración conecta a Prisma en `beforeAll` y `testTimeout` sube a 20 s.
- 29-sep (Claude Opus, `codex/ci-local-y-pendientes`): **PR #4 publicado en polimetrics.app** (login + Postgres,
  verificado en navegador; retiradas las variables del acceso provisional). `npm run ci:local`: los pasos de la CI en
  paralelo y con caché contra el Postgres del NVMe: 81 s en serie (igual que GitHub) → 44 s en frío, 34 s con caché.
  Pendientes nuevos de Jose anotados en §3 (landing de login, rediseño, multi-tenant).
- 29-sep (Claude Opus, `codex/postgres-login`): **PostgreSQL + login con roles**, como Casa Korea/Matriarca. Prisma
  (`prisma/schema.prisma`, migraciones al arrancar el contenedor); JWT de acceso 15 min + refresh 7 días rotado en
  cookies httpOnly; claves scrypt, bloqueo tras 5 fallos; roles ADMIN/EQUIPO; Ajustes › Usuarios y acceso. Perfil del
  candidato (con identidad), piezas analizadas y archivos guardados pasan de `localStorage` a la base (se migran solos
  la primera vez). El "Google Drive" era **simulado** (enlaces inexistentes): sustituido por «Archivos guardados»
  reales; borrado `CandidateProfilesView` (código muerto). Pruebas de integración contra Postgres real y CI con
  servicio postgres. El acceso HTTP Basic de `codex/despliegue-coolify` se retira.
- 29-sep (Claude Opus, `codex/ci-y-gemini`): publicado en **https://polimetrics.app** (Coolify). CI en GitHub Actions
  (tipos, lint, pruebas, build; commit de `claude/ci`); el módulo importado `voto-correlaciones` sale del lint (no se
  edita a mano). Gemini: 20 peticiones/min por cliente y lista cerrada de modelos y agentes; `/api` inexistente da 404;
  el servidor escucha en IPv4 e IPv6.
- 29-sep (Claude Opus, `codex/despliegue-coolify`): preparación para publicar en Coolify (data center de Network IA
  Solutions). `Dockerfile` multi-stage + `.dockerignore`; acceso con usuario y clave opcional
  (`PROTEUS_USUARIO`/`PROTEUS_CLAVE`, `src/server/acceso.ts`) porque la app no tiene login y publicada sin él dejaba
  la clave de Gemini abierta a cualquiera. Guía en `docs/DESPLIEGUE_COOLIFY.md`. Pendiente: dominio, clave de Gemini
  válida (la actual da 403) y webhook de auto-deploy (requiere admin del repo: Isaac).
- 28-sep (Claude Opus, `claude/identidad`): Identidad del candidato (9 bloques) + Análisis de piezas + Libro de reglas v1.0.
  Archivos: `src/services/identidad/identidad.ts`, `src/services/analisisPiezas/{medicion,pieza,analisis}.ts`,
  `src/data/analisisPiezas/libroDeReglas.ts`, `src/modules/identidad/*`, rutas `/api/piezas/*` en `server.ts`.
  Probado en navegador con imagen y video de prueba (cortes detectados en 00:03 y 00:06) y con una respuesta de
  Gemini simulada para la vista interpretada. 253 pruebas (ΔE2000 contra los pares de Sharma et al.), build OK.
- 28-sep (Claude Opus, rama `claude/inicio`): nueva página de Inicio "noche cívica" en forma de esquema (fuentes →
  proceso → organización → qué ofrece), con dos figuras 3D de geometría real: Antioquia con una columna por municipio
  (altura = censo 2026) y las capas del territorio apiladas. `src/modules/inicio/InicioView.tsx`; figuras con
  `scripts/build_figuras_inicio.py` → `src/assets/inicio/*.svg` + `src/data/inicio/figuras.json`. Números leídos
  de los servicios (censo, puestos, elecciones). Día E y Red de poder llevan aviso (datos de ejemplo / en verificación).
  Reemplaza el Inicio anterior (KPI + "continuar" + estado de datos). 232 pruebas, build OK.
- 27-sep (Opus, `claude/encuestas-2026`): integración de `<voto-correlaciones>` 0.3.0. `scripts/importar_voto_correlaciones.py`
  copia el paquete (dist o .zip) a `public/modulos/voto-correlaciones/`; `encuestasService.ts` (estimación por
  municipio/departamento con n efectivo de Kish e IC de Wilson, igual que el módulo; cruce con el escrutinio de la
  Registraduría; emparejamiento de nombres); `VotoCorrelaciones.tsx` (envoltorio React, tokens --c-* → --vc-*);
  `Encuestas2026View.tsx`; `EncuestasTerritorio.tsx` bajo el mapa, con botón que abre la evolución del mismo
  territorio. Hallazgo: en 1.ª vuelta las encuestas (9-mar a 31-may) subestimaron a De la Espriella en ~25 pts en
  Medellín y Antioquia y sobreestimaron a Paloma Valencia en ~20; Cepeda cayó dentro del intervalo.
  Verificado: tsc limpio, 236 pruebas, build OK, capturas claro/oscuro.
- 27-sep (Opus, `codex/navegacion-mapa`) `1187a79`: análisis narrativo debajo del mapa (Valle de Aburrá + 30
  municipios de mayor censo; Medellín por comuna). 4 familias de correlación calculadas (Regla 17), verbos
  epistémicos y cita de fuente por oración (`municipioNarrativeService.ts`, sin Gemini, determinista).
- 27-sep (Opus, `codex/navegacion-mapa`) `25ac50b`: panel de puestos como ventana desplegable filtrada por el mapa
  (departamento › subregión › municipio › comuna › barrio); subregiones seleccionables en la vista de subregiones.
- 27-sep (Opus, `codex/navegacion-mapa`) `93d3108`: censo por comuna/zona del panel de puestos en lista desplegable;
  el contorno de Medellín se quedaba con los 27 puestos (135.063 habilitados) de los 5 corregimientos: corregido.
- 27-sep (Opus, `codex/navegacion-mapa`) `efde46a`: marco metodológico (ingesta por bloques, 4 capas, bloque 1:
  diagrama, reglamento v1.2 y dossier Familia 4; vista Ajustes › Marco metodológico; piso 3 en el generador);
  listas desplegables en la ficha.
- 27-sep (Opus, `codex/navegacion-mapa`) `d0df840`: mapa y ficha comparten elección y capa→sección; generador
  de contenido (subregión › municipio › comuna › barrio, medio y tipo de pieza) con gemini-3.8-flash vía
  `POST /api/contenido/generar` (clave en el servidor). La clave de `.env` da 403 PERMISSION_DENIED.
- 27-sep (Opus, `codex/navegacion-mapa`) `c55ef86`: el mapa se ajusta cuando cambia su contenedor (ResizeObserver →
  invalidateSize); antes quedaban franjas grises y la capa cortada al abrir/cerrar la ficha.
- 27-sep (Opus, `codex/navegacion-mapa`) `95acefc`: Gobernación coloreada por candidato (sus coaliciones no tienen
  color propio y todo Antioquia salía igual); la vista de Antioquia abre en 125 municipios.
- 27-sep (Opus, `codex/navegacion-mapa`) `26f6b57`: puestos coloreados también en Valle de Aburrá y Antioquia
  (resultados por puesto de cada municipio visible; valor del municipio en demografía/economía) y radio según
  el zoom. Municipios del Valle sin código DANE: se buscan por nombre.
- 27-sep (Opus, `codex/navegacion-mapa`) `f0b3769`: color por capa (electoral año+tipo con los puestos de cada
  elección; demográfica y económica con CNPV 2018 por manzana, proyección 2026 y NBI); corregimientos de
  Medellín con el color de la capa.
- 27-sep (Opus, `codex/navegacion-mapa`) `33020c4`: la capa de puestos (canvas) y el contorno de Medellín se
  quedaban con los clics; comuna → sus barrios; comunas y municipios vecinos clicables; barra lateral
  ocultable; la ficha de puesto se cierra con clic fuera o Esc; límite de 30 s a la prueba de los 125 municipios.
- 27-sep (Opus) `1968fd5`: puestos sin coordenadas ubicados con OpenStreetMap (111 → 57 sin ubicar).
- 27-sep (Opus) `aa5f6c3`: Altavista/Palmitas, sector Ovejas, sexo × edad 2026, puestos rurales aproximados.
- 27-sep (Opus) `7610f3c`, `e3de622`: serie histórica 2015-2022 por puesto; visor E-24 real; Concejo 2023 corregido.
- 27-sep (Opus) `6c99bd7`: municipios ≤ 20.000 solo cabecera y veredas; sus puestos en el mapa.
- 26/27-sep (Sonnet): fase C (79 municipios), restyle de vistas, "7 puntos" de la app.
