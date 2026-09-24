# INFORME TÉCNICO Y FUNCIONAL DE PROYECTO PROTEUS v1.2.0
**Mapeo Exhaustivo de Funciones, Herramientas y su Ubicación en la Aplicación**

---

## 1. RESUMEN EJECUTIVO Y ARQUITECTURA GENERAL

**Proyecto Proteus 1.2** es una plataforma de inteligencia política, analítica electoral y dirección estratégica de campaña desarrollada con **React 19, TypeScript, Tailwind CSS, Leaflet GIS y Google Gemini 3.8 Flash**. Su arquitectura articula tres componentes centrales:
1. **Arquitectura de Zoom Territorial Multi-Escala (5 Escalas GIS GeoJSON continuas)**: desde el nivel nacional hasta el nivel hiperlocal de comunas y barrios.
2. **Motor de Triple Propósito**: 
   - *Propósito 1*: Repositorio municipal universal de datos (125 municipios de Antioquia y país).
   - *Propósito 2*: Analista y segmentador de votantes (cruce de variables demográficas, NBI y perfiles psicográficos).
   - *Propósito 3*: Director de creación de contenido (generador de discursos, guiones y briefs de campaña anclados a territorio).
3. **Cuadrilla de 5 Agentes IA Autónomos**: equipo especializado en investigación territorial, segmentación, redacción narrativa, auditoría multimedia y sincronización en la nube.

A continuación se desglosa cada función del sistema, su propósito operativo, sus dependencias técnicas y su **doble ubicación** (en la interfaz de usuario y en los archivos del código fuente).

---

## 2. MATRIZ GENERAL DE VISTAS Y NAVEGACIÓN (SHELL DEL SISTEMA)

| Vista / Sección | Identificador (`NavViewId`) | Componente Raíz | Ubicación en UI | Propósito Central |
|---|---|---|---|---|
| **Zoom Territorial (5 Escalas)** | `'territorial-zoom'` | [`TerritorialZoomHubView.tsx`](../../src/modules/territorial/TerritorialZoomHubView.tsx) | Grupo *Triple Propósito* > Botón *"Zoom Territorial"* | GIS continuo jerárquico de 5 niveles con analítica E-24 e IPM |
| **1. Repositorio Municipal** | `'municipal-repository'` | [`MunicipalRepositoryExplorerView.tsx`](../../src/modules/repository/MunicipalRepositoryExplorerView.tsx) | Grupo *Triple Propósito* > Botón *"1. Repositorio Municipal"* | Base de datos territorial 360°, contexto para Gemini e ingesta JSON |
| **2. Segmentación & Votantes** | `'voter-segmentation'` | [`VoterSegmentationEngine.tsx`](../../src/modules/analytics/VoterSegmentationEngine.tsx) | Grupo *Triple Propósito* > Botón *"2. Segmentación & Votantes"* | Clustering demográfico, arquetipos de votantes y fit de candidato |
| **3. Director de Contenido** | `'content-director'` | [`CampaignContentDirectorView.tsx`](../../src/modules/content/CampaignContentDirectorView.tsx) | Grupo *Triple Propósito* > Botón *"3. Director de Contenido"* | Generador de briefs estratégicos, discursos y exportador a PDF |
| **Analista Multimedia** | `'multimedia-studio'` | [`CandidateMultimediaStudioView.tsx`](../../src/modules/multimedia/CandidateMultimediaStudioView.tsx) | Grupo *Triple Propósito* > Botón *"Analista Multimedia"* | Auditoría de oratoria en video, colorimetría y semiótica visual |
| **Cuadrilla de 5 Agentes** | `'agent-team'` | [`AgentTeamConsoleView.tsx`](../../src/modules/agents/AgentTeamConsoleView.tsx) | Grupo *Triple Propósito* > Botón *"Cuadrilla de 5 Agentes"* | Despacho de misiones operativas a los 5 agentes IA |
| **Presidencia & Territorio** | `'national-overview'` | [`NationalDashboardView.tsx`](../../src/modules/national/NationalDashboardView.tsx) | Grupo *Ámbito Nacional* > Botón *"Presidencia & Territorio"* | Tablero de 32 departamentos de Colombia y mapas de NBI |
| **Candidato & Perfil** | `'national-candidates'` | [`CandidateProfilesView.tsx`](../../src/modules/national/CandidateProfilesView.tsx) | Grupo *Ámbito Nacional* > Botón *"Candidato & Perfil"* | Biografía, tono narrativo, ejes programáticos y colorimetría |
| **Herramientas de Campaña** | `'national-tools'` | [`CampaignToolsView.tsx`](../../src/modules/national/CampaignToolsView.tsx) | Grupo *Ámbito Nacional* > Botón *"Herramientas de Campaña"* | Procesador y comparador de encuestas demoscópicas |
| **Sala Gobernación** | `'antioquia-gobernacion'` | [`GobernacionExecutiveView.tsx`](../../src/modules/antioquia/departamental/GobernacionExecutiveView.tsx) | Grupo *Command Center Antioquia* > *"Sala Gobernación"* | 28 actores políticos, 7 ejes de gobierno y lector de planes PDF |
| **9 Subregiones** | `'antioquia-subregiones'` | [`SubregionesView.tsx`](../../src/modules/antioquia/subregiones/SubregionesView.tsx) | Grupo *Command Center Antioquia* > *"9 Subregiones"* | Análisis geoestratégico, NBI y simulador de alineación política |
| **125 Municipios** | `'antioquia-municipios'` | [`AntioquiaExplorerView.tsx`](../../src/modules/antioquia/municipios/AntioquiaExplorerView.tsx) | Grupo *Command Center Antioquia* > *"125 Municipios"* | Directorio municipal, dioramas 3D, mapas vectoriales y ECV |
| **Enlace Google Drive** | Modal Global | [`GoogleDriveSyncModal.tsx`](../../src/components/drive/GoogleDriveSyncModal.tsx) | Grupo *Sistema & Persistencia* > *"Enlace Google Drive"* | Conexión OAuth/Email, respaldo y sincronización en la nube |
| **Identidad Institucional** | `'brand-manual'` | [`BrandIdentityView.tsx`](../../src/modules/system/BrandIdentityView.tsx) | Grupo *Sistema & Persistencia* > *"Identidad Institucional"* | Manual de identidad CMT Proteus, isotipo y tokens visuales |
| **Consola Antigravity** | `'antigravity-console'` | [`AntigravityAgentConsole.tsx`](../../src/components/AntigravityAgentConsole.tsx) | Accesible por consola/desarrollo | Pipeline de datos, optimizador D'Hondt y auditorías de código |

---

## 3. DESGLOSE DETALLADO DE FUNCIONES POR MÓDULO

### 3.1. MÓDULO GIS: ZOOM TERRITORIAL MULTI-ESCALA (5 ESCALAS CONTINUAS)

Permite una navegación fluida y sin cortes desde la vista nacional hasta las manzanas de un barrio, integrando cartografía oficial DANE y los 4 aplicativos preexistentes.

```
NIVEL 1: NACIONAL (32 Departamentos)
   │
   ▼
NIVEL 2: DEPARTAMENTAL (Antioquia - 9 Subregiones / 125 Municipios)
   │
   ▼
NIVEL 3: METROPOLITANO (Valle de Aburrá - 10 Municipios Conurbados)
   │
   ▼
NIVEL 4: MUNICIPAL (Medellín - 16 Comunas DANE y 5 Corregimientos)
   │
   ▼
NIVEL 5: COMUNAS & BARRIOS (Microdatos E-24 Históricos 2015-2023, IPM y Criminalidad)
```

#### Funciones y Herramientas del Módulo:
1. **Navegación Dinámica por Breadcrumb de 5 Escalas**:
   - *Ubicación UI*: Parte superior de la pantalla de Zoom Territorial ([`MapBreadcrumb.tsx`](../../src/components/maps/MapBreadcrumb.tsx)).
   - *Función*: Permite saltar instantáneamente a cualquier nivel superior o reenfocar a la escala nacional con un clic.
2. **Motor Cartográfico Vectorial (Leaflet / GeoJSON Reactivo)**:
   - *Ubicación UI*: Área central de la pantalla ([`MultiLevelZoomMap.tsx`](../../src/components/maps/MultiLevelZoomMap.tsx)).
   - *Función*: Renderiza geometrías de polígonos GeoJSON con zoom suave (`flyToBounds`), detección de clics, tooltips al pasar el ratón y coropletas de color graduado.
3. **Selector de Capas Temáticas (Choropleth Toggles)**:
   - *Ubicación UI*: Barra de control superior del mapa ([`MapLayerControls.tsx`](../../src/components/maps/MapLayerControls.tsx)).
   - *Función*: Alterna la visualización del mapa entre 4 capas analíticas:
     - *Capa Electoral*: Censo electoral, potencial de votantes y participación.
     - *Capa Demográfica*: Población proyectada DANE y pirámides de edad.
     - *Capa Pobreza NBI / IPM*: Índice de Necesidades Básicas Insatisfechas e Índice de Pobreza Multidimensional.
     - *Capa Seguridad / Riesgo*: Incidencia de extorsión, delitos y alertas de orden público.
4. **Buscador Predictivo Territorial**:
   - *Ubicación UI*: Input de búsqueda en [`MapLayerControls.tsx`](../../src/components/maps/MapLayerControls.tsx).
   - *Función*: Filtra en tiempo real los polígonos visibles en el mapa según el nombre del territorio, código DANE o subregión.
5. **Panel Lateral de Analítica Profunda (Deep Analytics Multi-Tab Drawer)**:
   - *Ubicación UI*: Cajón lateral derecho que se despliega al hacer clic en cualquier comuna, barrio o municipio ([`CommuneDeepAnalyticsDrawer.tsx`](../../src/components/maps/CommuneDeepAnalyticsDrawer.tsx)).
   - *Subpestañas de Información*:
     - **Pestaña Resumen**: Ficha rápida de población, censo, zona geográfica y botón de drill-down a la siguiente escala.
     - **Pestaña E-24 Histórico** ([`E24HistoricalViewer.tsx`](../../src/components/maps/E24HistoricalViewer.tsx)): Matriz histórica de votaciones para Alcaldía, Concejo y Congreso en los periodos 2015, 2019 y 2023. Permite consultar mesas, votos válidos, blanco, nulos y candidatos ganadores.
     - **Pestaña Pobreza IPM**: Desglose de dimensiones de privación (salud, educación, empleo y servicios públicos) según microdatos de la encuesta de calidad de vida.
     - **Pestaña Seguridad & Extorsión**: Métricas de extorsión barrial, presencia de estructuras delictivas y victimización según el CIEF de la Universidad EAFIT.
     - **Pestaña Demografía DANE**: Indicadores de masculinidad, tasa de envejecimiento y proyecciones de población a 2026.
     - **Pestaña Alcaldía & Concejo**: Resultados específicos del municipio seleccionado con distribución de fuerzas políticas.

---

### 3.2. TRIPLE PROPÓSITO: PROPÓSITO 1 - REPOSITORIO MUNICIPAL UNIVERSAL

- **Ubicación en UI**: Barra lateral izquierda > Sección *"Triple Propósito & Analítica"* > **`1. Repositorio Municipal`**.
- **Archivos de Código**: 
  - Vista: [`MunicipalRepositoryExplorerView.tsx`](../../src/modules/repository/MunicipalRepositoryExplorerView.tsx)
  - Servicio / Base de Datos: [`municipalRepositoryService.ts`](../../src/services/municipalRepositoryService.ts)

#### Funciones y Herramientas:
1. **Directorio y Búsqueda Multicriterio 360°**:
   - Búsqueda instantánea por nombre del municipio, código DANE, alcalde electo o partido predominante.
   - Filtro por cualquiera de las 9 subregiones de Antioquia.
2. **Ficha Técnica Integral del Municipio**:
   - Despliega población total, censo electoral, porcentaje de NBI, alcalde en ejercicio, partido político, afiliación ideológica, retos prioritarios de infraestructura/sociales y factores de riesgo en seguridad.
3. **Extractor de Contexto para Gemini & Google Search Grounding**:
   - Función `buildContextPrompt(municipalityId)`: Genera un prompt estructurado con los datos oficiales del municipio para inyectárselo a la IA antes de realizar búsquedas web o redactar briefs, impidiendo alucinaciones o datos desactualizados.
   - Botón *"Copiar Contexto para IA"*: Pasa al portapapeles del usuario el bloque de contexto optimizado.
4. **Módulo de Ingesta Masiva de Datos (Modo Desarrollador)**:
   - Botón *"Ingestar Datos (Desarrollador)"*: Abre un modal interactivo donde se pueden pegar matrices JSON con nuevos municipios o actualizar los existentes en el repositorio en memoria/almacenamiento local.

---

### 3.3. TRIPLE PROPÓSITO: PROPÓSITO 2 - ANALISTA Y SEGMENTADOR DE VOTANTES

- **Ubicación en UI**: Barra lateral izquierda > Sección *"Triple Propósito & Analítica"* > **`2. Segmentación & Votantes`**.
- **Archivos de Código**: 
  - Vista / Motor: [`VoterSegmentationEngine.tsx`](../../src/modules/analytics/VoterSegmentationEngine.tsx)

#### Funciones y Herramientas:
1. **Modelado Dinámico de Arquetipos Demográficos**:
   - Cruza el censo electoral del municipio seleccionado y su índice de NBI para calcular el volumen real de votantes y el peso porcentual de 4 clusters clave:
     - *Jóvenes Urbanos & Primera Oportunidad (18 a 28 años)*.
     - *Madres Cabeza de Hogar & Núcleos Populares (Estratos 1 y 2)*.
     - *Comerciantes, Emprendedores & Independientes (Estratos 2 al 4)*.
     - *Comunidad Rural, Campesinos & Familias Tradicionales (Veredas)*.
2. **Filtros Cruzados de Cohorte y Estrato**:
   - Controles de selección rápida por rango de edad (*Jóvenes*, *Adultos*, *Adultos Mayores*) y estrato socioeconómico (*Bajo*, *Medio*, *Alto*).
3. **Puntuación de Ajuste con el Candidato (Candidate Fit Score)**:
   - Evalúa matemáticamente el porcentaje de afinidad del candidato activo con cada segmento poblacional.
4. **Matriz de Objeciones y Contra-Argumentos de Campaña**:
   - Entrega para cada segmento el ángulo narrativo ideal, los canales de contacto más efectivos (WhatsApp, TikTok, ferias comunales) y la respuesta fulminante ante las críticas más comunes de la oposición.
5. **Generador de Arquetipos Hipersegmentados con Gemini 3.8 Flash**:
   - Botón *"Generar Arquetipo IA con Gemini"*: Envía a la IA las variables del municipio y del candidato para crear un perfil psicográfico de alta resolución con miedos, aspiraciones, canales y mensajes tabú.
6. **Respaldo Directo en Google Drive**:
   - Botón *"Guardar en Drive"*: Sincroniza el análisis en la carpeta de campaña del candidato.

---

### 3.4. TRIPLE PROPÓSITO: PROPÓSITO 3 - DIRECTOR DE CREACIÓN DE CONTENIDO & BRIEFS

- **Ubicación en UI**: Barra lateral izquierda > Sección *"Triple Propósito & Analítica"* > **`3. Director de Contenido`**.
- **Archivos de Código**: 
  - Vista: [`CampaignContentDirectorView.tsx`](../../src/modules/content/CampaignContentDirectorView.tsx)
  - Motor PDF: `jspdf`

#### Funciones y Herramientas:
1. **Configurador Estratégico de Piezas de Campaña**:
   - Selección de Municipio y Territorio específico.
   - Selección de Audiencia Objetivo (Jóvenes, Madres, Comerciantes, Votante Rural, etc.).
   - Selección de Tono Discursivo (*Firmeza y Autoridad*, *Cercanía y Empatía*, *Técnico y Riguroso*, *Inspirador*, *Confrontacional*).
   - Selección de Formato de Salida:
     - *Video Corto (TikTok / Reels / Shorts)* con ganchos de 3 segundos.
     - *Discurso de Plaza Pública* con referencias a veredas y problemas locales.
     - *Cápsula de WhatsApp Comunitaria* en lenguaje directo y cercano.
     - *Comunicado de Prensa Oficial* para medios regionales.
     - *Réplica de Debate Televisivo* para neutralizar ataques en 20 segundos.
2. **Generación con Grounding Territorial en Tiempo Real (Gemini + Google Search)**:
   - La IA consulta los datos oficiales del Repositorio Proteus y busca noticias recientes del municipio para anclar el discurso a hechos verídicos (acueductos, vías, desempleo, tarifas de servicios).
3. **Estructura Formal del Brief de Campaña (7 Puntos Clave)**:
   - 1. Objetivo de la pieza.
   - 2. El Gancho (Hook de los primeros 3 segundos).
   - 3. Datos territoriales y cifras concretas citadas.
   - 4. Núcleo del mensaje y propuesta de valor del candidato.
   - 5. Llamado a la Acción (CTA).
   - 6. Puesta en escena, lenguaje corporal y vestuario (según la colorimetría del candidato).
   - 7. Pregunta incómoda de prensa/oposición y cómo desarmarla.
4. **Exportación Ejecutiva a PDF**:
   - Botón *"Exportar PDF"* genera un documento formal listo para imprimir o enviar al equipo de comunicaciones y al candidato.
5. **Copia Rápida al Portapapeles y Respaldo en Drive**.

---

### 3.5. ESTUDIO MULTIMEDIA & SEMIÓTICA POLÍTICA

- **Ubicación en UI**: Barra lateral izquierda > Sección *"Triple Propósito & Analítica"* > **`Analista Multimedia`**.
- **Archivos de Código**: 
  - Vista: [`CandidateMultimediaStudioView.tsx`](../../src/modules/multimedia/CandidateMultimediaStudioView.tsx)
  - Componente de Video: [`CandidateVideoAnalyzer.tsx`](../../src/components/CandidateVideoAnalyzer.tsx)

#### Funciones y Herramientas:
1. **Analista de Video (Oratoria, Ritmo y Dicción)**:
   - Carga de clips de intervenciones del candidato o discursos en tarima.
   - Análisis multimodal de pausas, dicción, modulación vocal, muletillas recurrentes y control del tiempo.
2. **Analista de Imagen y Colorimetría Política**:
   - Diagnóstico del fototipo y estación cromática del candidato (*Invierno*, *Verano*, *Otoño*, *Primavera*).
   - Definición de Paleta de Colores de Poder (para debates y eventos formales) y Paleta de Cercanía (para recorridos en territorio).
   - Guía de telas, cuellos y colores prohibidos que restan credibilidad ante cámaras.
3. **Auditoría Semiótica y Lenguaje Corporal**:
   - Evaluación de postura, posición de manos (cúpula de poder vs. brazos caídos), contacto visual con el lente y microexpresiones faciales.
   - Recomendaciones de esquema de iluminación de 3 puntos (key, fill, rim light).

---

### 3.6. CUADRILLA DE 5 AGENTES IA AUTÓNOMOS

- **Ubicación en UI**: Barra lateral izquierda > Sección *"Triple Propósito & Analítica"* > **`Cuadrilla de 5 Agentes`**.
- **Archivos de Código**: 
  - Vista: [`AgentTeamConsoleView.tsx`](../../src/modules/agents/AgentTeamConsoleView.tsx)
  - Configuración del Equipo: [`proteusAgentTeam.ts`](../../src/data/agentic/proteusAgentTeam.ts)

#### Roles, Misiones y Herramientas de cada Agente:

| Agente | Nombre Clave | Versión | Rol y Especialidad | Herramientas Asignadas |
|---|---|---|---|---|
| **Agente 1** | `SENTINEL-TERRITORY` | v2.4 | **Investigador Territorial & Electoral**: Monitorea mesas de votación, censo electoral, NBI, criminalidad y alimenta el Repositorio Municipal. | Repositorio Proteus, GeoJSON Parser, DANE Feeds, Registraduría |
| **Agente 2** | `STRAT-SEGMENT` | v2.2 | **Analista de Inteligencia & Segmentación**: Modela arquetipos psicográficos, estima elasticidad del voto y detecta el "Votante Bisagra". | Motor Multidimensional, Calculador de Afinidad, Clusterizador |
| **Agente 3** | `CREATIVE-DIRECTOR` | v3.0 | **Director de Creación de Contenido & Narrativa**: Diseña discursos, guiones para TikTok, briefs de WhatsApp y respuestas a debates. | Gemini 3.8 Flash, Generador de Briefs, Motor de Puesta en Escena |
| **Agente 4** | `MEDIA-VISION` | v2.8 | **Analista Multimedia & Semiótica Política**: Audita dicción en video, colorimetría, lenguaje corporal e iluminación del candidato. | Gemini Vision, Detector de Muletillas, Estudio de Fotometría |
| **Agente 5** | `SYNC-NEXUS` | v1.9 | **Sintetizador Gemini Search & Google Drive**: Pre-procesa búsquedas web evitando alucinaciones territoriales y respalda archivos en Google Drive. | Google Search API, Google Drive Connector, Buffer Territorial |

#### Consola Operativa del Equipo:
- Permite seleccionar a cualquier agente, asignarle un municipio objetivo y redactar una instrucción operativa.
- El agente ejecuta la orden inyectando el contexto de Proteus y genera el informe ejecutivo en la consola en tiempo real.

---

### 3.7. ÁMBITO NACIONAL Y PRESIDENCIA

- **Ubicación en UI**: Barra lateral izquierda > Grupo *"Ámbito Nacional"*.

#### 1. Presidencia & Territorio (`'national-overview'`):
- **Archivo**: [`NationalDashboardView.tsx`](../../src/modules/national/NationalDashboardView.tsx)
- **Funciones**:
  - Visualizador de las 5 regiones naturales de Colombia (Andina, Caribe, Pacífica, Orinoquía, Amazonía).
  - Selector de los 32 departamentos y municipios del país.
  - Indicadores de NBI departamental y municipal oficiales del DANE.
  - Generador de informes de inteligencia con IA para cualquier departamento o municipio nacional.

#### 2. Candidato & Perfil (`'national-candidates'`):
- **Archivo**: [`CandidateProfilesView.tsx`](../../src/modules/national/CandidateProfilesView.tsx) & [`CandidateProfileManager.tsx`](../../src/components/CandidateProfileManager.tsx)
- **Funciones**:
  - Configuración completa de la identidad del candidato activo (Nombre, partido, tono narrativo, estilo de comunicación, ejes programáticos, fototipo).
  - Perfil predeterminado: **Isaac Mendoza** (Líder y Estratega).
  - Selector para importar perfiles desde los 28 actores departamentales de Antioquia.
  - Persistencia automática en `localStorage` del navegador.

#### 3. Herramientas de Campaña (`'national-tools'`):
- **Archivo**: [`CampaignToolsView.tsx`](../../src/modules/national/CampaignToolsView.tsx)
- **Funciones**:
  - Procesador demoscópico de encuestas electorales (permite pegar textos o cargar archivos de encuestas).
  - Extractor automático de intención de voto para primera y segunda vuelta, preferencias por región y metodologías.
  - Comparador de encuestas entre diferentes firmas encuestadoras con análisis de tendencias asistido por IA.

---

### 3.8. COMMAND CENTER ANTIOQUIA (TRATO JERÁRQUICO ESPECIAL)

- **Ubicación en UI**: Barra lateral izquierda > Grupo *"Command Center Antioquia"*.

#### 1. Sala Gobernación (`'antioquia-gobernacion'`):
- **Archivo**: [`GobernacionExecutiveView.tsx`](../../src/modules/antioquia/departamental/GobernacionExecutiveView.tsx) & [`PdfScriptGenerator.tsx`](../../src/components/PdfScriptGenerator.tsx)
- **Funciones**:
  - Monitoreo de 28 actores políticos departamentales y medios de comunicación regionales.
  - Seguimiento a los **7 Ejes Estratégicos de Gobierno**:
    1. Seguridad y Orden
    2. Infraestructura Vial
    3. Salud & Hospitales
    4. Educación & Universidad
    5. Competitividad Económica
    6. Sostenibilidad & Agua
    7. Transparencia & Gobernanza
  - Lector e Ingestador de Documentos Oficiales en PDF (Planes de Desarrollo, Acuerdos, etc.).
  - Matriz de Asuntos Críticos y Termómetro de la Opinión Pública.
  - Generador de Discursos y Guiones Institucionales con descarga en PDF.

#### 2. 9 Subregiones Estratégicas (`'antioquia-subregiones'`):
- **Archivo**: [`SubregionesView.tsx`](../../src/modules/antioquia/subregiones/SubregionesView.tsx) & [`SubregionesManager.tsx`](../../src/components/SubregionesManager.tsx)
- **Funciones**:
  - Inmersión en las 9 subregiones: *Valle de Aburrá, Oriente, Suroeste, Occidente, Norte, Bajo Cauca, Magdalena Medio, Nordeste, Urabá*.
  - Indicadores de NBI, población, vocación productiva y actores clave.
  - Simulador de Alineación Política (Nacional vs. Gobernación: *Aliado*, *Independiente*, *Opositor*).
  - Profundización estratégica asistida por Gemini y exportación de informes subregionales.

#### 3. Directorio de 125 Municipios (`'antioquia-municipios'`):
- **Archivo**: [`AntioquiaExplorerView.tsx`](../../src/modules/antioquia/municipios/AntioquiaExplorerView.tsx) & [`AntioquiaMunicipiosManager.tsx`](../../src/components/AntioquiaMunicipiosManager.tsx)
- **Funciones**:
  - Explorador territorial de los 125 municipios antioqueños.
  - **Dioramas 3D Interactivos** ([`Municipio3DDiorama.tsx`](../../src/components/Municipio3DDiorama.tsx) y [`Rionegro3DDiorama.tsx`](../../src/components/Rionegro3DDiorama.tsx)) con representación espacial de hitos urbanos.
  - Mapas cartográficos específicos de Bello, Rionegro y el Valle de San Nicolás.
  - Tableros de Encuesta de Calidad de Vida (ECV) a nivel de comuna y vereda.

---

### 3.9. SISTEMA, PERSISTENCIA E INFRAESTRUCTURA DE SOPORTE

#### 1. Enlace y Sincronización con Google Drive:
- **Ubicación UI**: Botón *"Enlace Google Drive"* en la barra lateral o modal emergente.
- **Archivos**: [`GoogleDriveSyncModal.tsx`](../../src/components/drive/GoogleDriveSyncModal.tsx) y [`googleDriveService.ts`](../../src/services/googleDriveService.ts).
- **Funciones**:
  - Enlace de cuenta de Google Drive del usuario.
  - Respaldo estructurado de documentos en 4 categorías: `analisis_territorial`, `brief_contenido`, `segmentacion_votantes`, `multimedia`.
  - Historial de archivos respaldados con fecha, formato y opción de eliminación/descarga.

#### 2. Identidad Institucional y Manual de Marca:
- **Ubicación UI**: Barra lateral > *"Identidad Institucional"*.
- **Archivos**: [`BrandIdentityView.tsx`](../../src/modules/system/BrandIdentityView.tsx) y [`CmtProteusLogo.tsx`](../../src/components/CmtProteusLogo.tsx).
- **Funciones**:
  - Especificaciones del Isotipo (Tridente geométrico CMT), Logotipo e Imagotipo en SVG escalable.
  - Sistema de diseño **Glassmorphism Frost**: fondos `slate-950/40`, desenfoque `backdrop-blur-3xl`, bordes `white/20` e iluminación especular interior.

#### 3. Capa de Servicios de Inteligencia Artificial & Backend:
- **[`geminiService.ts`](../../src/services/geminiService.ts)**: Cliente unificado para llamadas a Google Gemini 3.8 Flash, con soporte para Google Search Grounding y manejo robusto de excepciones y cuotas.
- **[`antigravityService.ts`](../../src/services/antigravityService.ts)**: Conexión con el runtime de Antigravity para ejecución de agentes en segundo plano y pipelines de código.

---

## 4. MAPA DE ARCHIVOS Y RUTAS CLAVE DEL CÓDIGO

```text
src/
├── App.tsx                                        # Enrutador principal y gestor de estado
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx                          # Marco visual, barra superior y contenedor
│   │   ├── SidebarNav.tsx                        # Menú de navegación principal (14 vistas)
│   │   └── TopStatusBar.tsx                      # Barra superior de estado y métricas
│   ├── maps/
│   │   ├── MultiLevelZoomMap.tsx                 # Visor GIS Leaflet / GeoJSON multi-escala
│   │   ├── MapBreadcrumb.tsx                     # Migas de pan de navegación de 5 escalas
│   │   ├── MapLayerControls.tsx                  # Toggles de capas (electoral, IPM, delito)
│   │   ├── CommuneDeepAnalyticsDrawer.tsx        # Cajón lateral de microdatos
│   │   └── E24HistoricalViewer.tsx               # Matriz de votaciones históricas 2015-2023
│   ├── drive/
│   │   └── GoogleDriveSyncModal.tsx              # Modal de sincronización con Google Drive
│   ├── CandidateProfileManager.tsx               # Gestor del perfil del candidato
│   ├── CandidateVideoAnalyzer.tsx                # Analizador de oratoria y dicción en video
│   ├── PdfScriptGenerator.tsx                    # Lector de planes PDF y creador de discursos
│   ├── SubregionesManager.tsx                    # Gestor analítico de las 9 subregiones
│   └── AntioquiaMunicipiosManager.tsx            # Gestor de los 125 municipios antioqueños
├── modules/
│   ├── territorial/TerritorialZoomHubView.tsx    # Hub del Zoom Territorial de 5 Escalas
│   ├── repository/MunicipalRepositoryExplorerView.tsx # Propósito 1: Repositorio Municipal
│   ├── analytics/VoterSegmentationEngine.tsx     # Propósito 2: Segmentación y Votantes
│   ├── content/CampaignContentDirectorView.tsx   # Propósito 3: Director de Contenido & Briefs
│   ├── multimedia/CandidateMultimediaStudioView.tsx # Estudio de Analítica Multimedia
│   ├── agents/AgentTeamConsoleView.tsx           # Consola de la Cuadrilla de 5 Agentes IA
│   ├── national/
│   │   ├── NationalDashboardView.tsx             # Tablero de 32 Departamentos de Colombia
│   │   ├── CandidateProfilesView.tsx             # Vistas de Perfiles Estratégicos
│   │   └── CampaignToolsView.tsx                 # Procesador y Comparador de Encuestas
│   ├── antioquia/
│   │   ├── departamental/GobernacionExecutiveView.tsx # Sala Gobernación (7 Ejes)
│   │   ├── subregiones/SubregionesView.tsx       # Vista de las 9 Subregiones
│   │   └── municipios/AntioquiaExplorerView.tsx  # Vista de 125 Municipios (3D y ECV)
│   └── system/BrandIdentityView.tsx              # Manual de Identidad Visual CMT Proteus
├── services/
│   ├── geminiService.ts                          # Cliente Gemini 1.5 Pro / Flash con Search
│   ├── municipalRepositoryService.ts             # Base de datos y generador de contexto municipal
│   ├── googleDriveService.ts                     # Servicio de persistencia y respaldo en Drive
│   ├── gobernacionService.ts                     # Monitoreo de 28 actores y ciclos de gobierno
│   └── antigravityService.ts                     # Runtime de agentes y consola de código
└── data/
    ├── agentic/proteusAgentTeam.ts               # Definición de los 5 agentes IA autónomos
    ├── geojson/                                  # Capas cartográficas vectoriales (Niveles 1 al 5)
    ├── observatorioAntioquia/                    # Estadísticas de los 125 municipios
    ├── observatorioComunas/                      # Microdatos de IPM, criminalidad y DANE Medellín
    └── e24/                                      # Microdatos E-24 históricos 2015-2023
```

---

*Informe generado para el equipo directivo de Proyecto Proteus. Isaac Mendoza — 2026.*
