# DOCUMENTO MAESTRO: SISTEMA DE INTELIGENCIA ELECTORAL PROYECTO PROTEUS v1.4.5
## Centro Estratégico de Campaña, Modelado Territorial y Conversión Publicitaria
**Autoría Institucional**: CMT Proteus Research Group & Unidad de Automejora Estratégica  
**Versión de Sistema**: 1.4.5 (Edición Nacional y Departamental)  
**Propósito Supremo**: Maximización de la Eficacia Publicitaria (Relación Publicidad / Votos) mediante Inteligencia Territorial y Micro-Targeting  

---

## 1. INTRODUCCIÓN GENERAL: QUÉ HACE PROTEUS, CÓMO LO HACE Y CÓMO SE VE

### 1.1. ¿Qué hace Proyecto Proteus?
**Proyecto Proteus** es un sistema integral de **estrategia, inteligencia territorial, analítica predictiva y optimización de conversión publicitaria** concebido para campañas electorales contemporáneas en Colombia. 

A diferencia de las herramientas tradicionales de gestión de campaña (que se limitan a ser agendas de eventos o gestores de gastos postelectorales), el **Propósito Supremo** de Proteus es **maximizar la eficacia de la publicidad electoral**, lo que matemáticamente equivale a **maximizar la relación Publicidad / Votos (reducir el costo por voto persuadido y multiplicar los sufragios netos captados por cada peso invertido en pauta)**.

Para alcanzar este propósito supremo, Proteus no trata la pauta digital como una compra masiva y ciega de impresiones, sino como la punta de lanza de una maquinaria de inteligencia previa en dos estratos:
1. **Estrato de Inteligencia y Dominio del Terreno (El Medio Indispensable)**:
   - Modela las redes de poder hegemónicas y las casas políticas tradicionales mediante grafos 2D y 3D.
   - Audita e integra micro-redes de concejales de base y releva cambios de curules oficiales.
   - Despliega cartografía GIS continua en 5 escalas desde el mapa nacional hasta barrios y comunas.
   - Analiza variables multidimensionales (censos electorales, NBI, IPM, criminalidad y demografía de votantes).
   - Ejecuta auditoría forense electoral de actas E-14 y E-24 mediante la Ley de Benford.
   - Mantiene monitoreo multinivel de coyunturas críticas y proyectos de infraestructura regional.
2. **Estrato de Conversión y Persuasión Cognitiva (El Fin Supremo)**:
   - Transforma los datos duros de cada comuna, vereda o departamento en **Ganchos Geopolíticos Hiperlocales** que apelan a las angustias e intereses reales del ciudadano.
   - Aplica modelos de persuasión cognitiva basados en la *Teoría de las Perspectivas* de Daniel Kahneman y Amos Tversky (*Framing* de Ganancia vs. Pérdida).
   - Genera creatividades de pauta A/B con inteligencia artificial (Gemini 3.8 Flash con Grounding) orientadas a 5 arquetipos de votantes.
   - Calcula el **Índice de Retorno Publicidad/Votos (IRPV)** y simula la distribución presupuestal óptima entre canales digitales y de proximidad.

---

### 1.2. ¿Cómo lo hace Proteus? (Arquitectura Algorítmica y de Datos)
Proteus opera mediante una arquitectura cliente-servidor de alto rendimiento construida en **React 18, TypeScript estricto, Tailwind CSS y Node.js**, apoyada en motores analíticos matemáticos en el navegador y modelos de lenguaje de última generación:

```
                                  ┌────────────────────────────────────────────────────────┐
                                  │           PROPÓSITO SUPREMO: CONVERSIÓN                │
                                  │   Targeted Advertising Optimizer & ROI Simulator       │
                                  └───────────────────────────▲────────────────────────────┘
                                                              │
                                     Inyección Dinámica de Contexto e Inteligencia (PA-011/012)
                                                              │
               ┌──────────────────────────────────────────────┴──────────────────────────────────────────────┐
               │                                                                                            │
  ┌────────────┴─────────────┐                                                             ┌────────────────┴───────────┐
  │   CAPA GEOESPACIAL GIS   │                                                             │   REDES DE PODER & GRAFOS  │
  │ • 33 Entidades (Depts)   │                                                             │ • 7 Casas Políticas        │
  │ • 1.122 Municipios DANE  │                                                             │ • 71 Concejales de Base    │
  │ • 16 Comunas + 5 Correg. │                                                             │ • Relevos de Curules 2026  │
  └────────────┬─────────────┘                                                             └────────────────┬───────────┘
               │                                                                                            │
               └──────────────────────────────────────┬─────────────────────────────────────────────────────┘
                                                      │
                                    ┌─────────────────┴─────────────────┐
                                    │     MOTORES MATEMÁTICOS & IA      │
                                    │ • Gemini 3.8 Flash + Web Grounding│
                                    │ • Simulador D'Hondt & Cifra Rep.  │
                                    │ • Forense Benford (1º y 2º dígito)│
                                    │ • Repositorio Municipal (NBI/IPM) │
                                    └───────────────────────────────────┘
```

1. **Ingesta y Normalización de Datos**:
   - Geometrías vectoriales oficiales del DANE (`colombia_municipios_completo.geojson` con 1.122 municipios) y de la Alcaldía de Medellín (`medellin16ComunasOfficial.geo.json`).
   - Algoritmo de normalización canónica de cadenas (`clean_dept` y `normalizeText`) que elimina diacríticos, resuelve homónimos y previene superposiciones entre departamentos y municipios.
2. **Motores Matemáticos Deterministas en Memoria**:
   - Algoritmo analítico de asignación de escaños de **Victor D'Hondt** (Art. 263 Constitución Política de Colombia), con cálculo en tiempo real del déficit marginal de votos en sub-milisegundos.
   - Motor de análisis forense digital basado en la **Distribución Logarítmica de Benford** ($P(d) = \log_{10}(1 + 1/d)$) para detectar fraude o manipulación en escrutinios.
3. **Orquestación Cognitiva con Gemini 3.8 Flash**:
   - Inyección previa de datos duros territoriales (*Grounding Contextual*) en el prompt de la IA antes de cualquier consulta en Google Search, garantizando que el modelo razone sobre realidades del censo, índices de pobreza y concejales reales sin alucinar.
4. **Almacenamiento y Persistencia**:
   - Persistencia de estados en `localStorage` y exportación / respaldo estructurado en **Google Drive** con categorización automática de análisis, briefs, pautas y multimedia.

---

### 1.3. ¿Cómo se ve Proteus cuando lo hace? (Estética y Experiencia Visual)
La interfaz de Proteus ha sido diseñada bajo una dirección de arte denominada **"Glassmorphism Táctico Ciber-Electoral (Slate 950 / Cyber-Command)"**:
- **Fondo y Profundidad**: Fondo ultra-oscuro en tonalidades `slate-950` con gradientes radiales sutiles en ámbar, zafiro y esmeralda. Las ventanas y tarjetas utilizan desenfoque de cristal (`backdrop-blur-2xl`) con bordes micro-iluminados (`border-white/10` a `border-amber-500/30`), transmitiendo la sensación de un centro de mando militar de alta seguridad.
- **Jerarquía Cromática Táctica**:
  - **Ámbar / Oro Táctico (`#f59e0b`)**: Utilizado para destacar el Propósito Supremo (Publicidad/Votos), advertencias electorales, relevos de curules y el candidato activo.
  - **Azul Cielo / Zafiro (`#38bdf8`)**: Utilizado para datos geoespaciales, navegación territorial, códigos DANE e interactividad.
  - **Verde Esmeralda (`#10b981`)**: Utilizado para victorias proyectadas, curules aseguradas, índices de eficiencia ROI y confirmación de enlaces.
  - **Rosa / Carmesí (`#f43f5e`)**: Utilizado para alertas de anomalías en Benford, casas políticas rivales y zonas de alta criminalidad o tensión.
- **Tipografía y Telemetría**: Combinación de tipografía de interfaz limpia e hiper-legible con bloques de telemetría en fuentes monoespaciadas (`font-mono`), etiquetas en mayúsculas sostenidas y chips con micropuntos pulsantes (`animate-pulse`) que reflejan el estado vivo de los sensores del sistema.
- **Rendimiento a 60 FPS**: Mapas interactivos vectoriales con transiciones de zoom suaves, grafos con simulación de fuerzas elásticas en WebGL y modales instantáneos.

---

## 2. CATÁLOGO MAESTRO: ANÁLISIS HERRAMIENTA POR HERRAMIENTA

A continuación se detalla cada una de las 18 herramientas y módulos de Proyecto Proteus.

```
========================================================================================
ÍNDICE DE HERRAMIENTAS:
1.  Optimizador de Publicidad Electoral Segmentada (Targeted Advertising Optimizer)
2.  Director de Creación de Contenido & Briefs Estratégicos (Content Director)
3.  Motor de Inteligencia & Segmentación de Votantes (Voter Segmentation Engine)
4.  Zoom Territorial Continuo GIS en 5 Escalas (Territorial Zoom Hub)
5.  Repositorio Municipal Universal & Pipeline de Contexto (Municipal Repository)
6.  Observatorio Electoral de Casas Políticas y Redes de Poder (Political Houses Graph 2D/3D)
7.  Auditoría Forense Electoral, Ley de Benford y Escrutinios (Electoral Forensics Audit)
8.  Simulador Matemático D'Hondt & Curul Marginal (Campaign Tools - D'Hondt Simulator)
9.  Procesador Demoscópico Inteligente de Encuestas (Campaign Tools - Survey Processor)
10. Comparador Político y Análisis Cruzado Nacional (Campaign Tools - Strategic Comparator)
11. Tablero Presidencia & Cobertura Departamental Universal (National Dashboard Overview)
12. Centro de Personalización del Candidato Activo (Candidate Profiles View)
13. Analista Multimedia: Estudio de Imagen & Video del Candidato (Multimedia Studio)
14. Sala Ejecutiva de Gobernación de Antioquia & Monitoreo Multinivel (Gobernacion Executive)
15. Motor de Agregación Geoespacial de 9 Subregiones (Antioquia Subregiones View)
16. Directorio & Sensor de 125 Municipios de Antioquia (Antioquia Explorer View)
17. Cuadrilla de 5 Agentes IA Especializados (Agent Team Console View)
18. Consola de la Unidad de Automejora Estratégica (7 Agentes / Protocolo Crítico)
========================================================================================
```

---

### HERRAMIENTA 1: OPTIMIZADOR DE PUBLICIDAD ELECTORAL SEGMENTADA
*Propósito Supremo • Protocolos PA-010, PA-011 y PA-012*

#### 1. ¿Qué hace la herramienta?
Es el cerebro de conversión de Proteus. Toma la inteligencia acumulada sobre casas políticas, mapas de calor, concejales de proximidad y coyunturas institucionales para **diseñar, simular y optimizar campañas de publicidad digital y territorial**, proyectando cuántos votos netos generará cada millón de pesos invertido y redactando anuncios hiper-segmentados con ganchos contextuales irrefutables.

#### 2. ¿Por qué es útil?
En una campaña tradicional, más del 70% del presupuesto de pauta digital se desperdicia en audiencias ciegas que ignoran el mensaje porque no conecta con su cotidianidad. Esta herramienta multiplica la efectividad del gasto:
- Elimina el gasto en pauta genérica e ineficaz.
- Permite atacar las vulnerabilidades institucionales de las maquinarias dominantes.
- Capitaliza los relevos de curules (ej. la salida de Sebastián López y Claudia Carrasquilla en el Concejo de Medellín).
- Proporciona un desglose presupuestal exacto por canal para no malgastar recursos.

#### 3. ¿Cómo lo hace?
- **Algoritmo IRPV (Índice de Retorno Publicidad/Votos)**: Calcula el multiplicador de eficiencia territorial ($\text{IRPV} = 1.35x - 1.95x$) en función de la postura táctica (*Confrontación Directa*, *Capitalización de Fractura*, *Cooptación de Base* o *Consolidación de Bastión*).
- **Ingesta Dinámica de Concejales**: Filtra en memoria los 71 concejales registrados en `GRAPH_NODES_DATA` para el municipio seleccionado, extrayendo sus bancadas y votación histórica para alimentar los copys de pauta.
- **Detector de Relevos de Curules**: Identifica vacantes y posesiones recientes (como el ingreso del médico Dr. Jorge Julián Osorio para pautar en el gremio de la salud de Metrosalud, o Milton Vasco para pautar en seguridad ciudadana).
- **Simulador Presupuestal**: Calcula votos base esperados vs. votos holísticos con Proteus, costo por voto persuadido y ahorro porcentual, dividiendo el presupuesto recomendado en Meta Ads (45%), TikTok Ads (30%), WhatsApp Micro-Barrial (15%) y Pauta Hiperlocal/Radial (10%).

#### 4. ¿Cómo se ve cuando lo hace?
- **Encabezado con Selector Territorial Universal**: Un menú desplegable estilizado que permite alternar instantáneamente entre los 10 municipios del Valle de Aburrá, Rionegro y cualquiera de los 32 departamentos + Bogotá D.C.
- **Medidor IRPV**: Una tarjeta con reborde dorado/esmeralda que muestra el multiplicador (ej. `1.85x`) y la métrica destacada de sufragios estimados por millón de pesos.
- **Tarjeta de Inteligencia Puente (`TerritoryIntelligenceBridgeCard`)**:
  - Columna 1: Casa política dominante con su color oficial y vulnerabilidad crítica.
  - Columna 2: Mapa de calor con porcentaje de jóvenes indecisos y zonas de alta densidad electoral.
  - Columna 3: Monitoreo multinivel con agendas calientes y alertas auditadas.
  - Banner de Relevos de Curules: Muestra visualmente las transiciones de poder (ej. *Sebastián López ➜ Milton Vasco*) con badges interactivos y botón "Usar Gancho de Relevo".
  - Grid de Concejales Locales: Tarjetas compactas con el nombre del concejal, partido, votos y tema central de agenda.
- **Selector de Arquetipos y Variantes A/B**: Pestañas de 5 perfiles de votantes que despliegan tres variantes creativas (Copy A: Emocional/Identitario, Copy B: Racional/Beneficio Concreto, Copy C: Confrontativo/Anti-Maquinaria) con vestuario recomendado y botón de copiado.
- **Simulador de Presupuesto Interactivo**: Slider numérico en pesos colombianos que calcula en tiempo real los votos ganados adicionales y la reducción del costo por voto.

---

### HERRAMIENTA 2: DIRECTOR DE CREACIÓN DE CONTENIDO & BRIEFS ESTRATÉGICOS
*Propósito 3 • Persuasión Cognitiva & Framing Prospectivo (PA-003)*

#### 1. ¿Qué hace la herramienta?
Genera briefs estratégicos ultra-precisos y discursos listos para producción audiovisual, intervenciones en plaza pública, cadenas de micro-WhatsApp barrial o intervenciones en debates televisados, adaptados milimétricamente al candidato activo y al territorio seleccionado.

#### 2. ¿Por qué es útil?
Impide que los candidatos cometan errores comunes como emitir discursos vacíos, usar lenguaje desconectado de la región o llegar desprevenidos a preguntas difíciles de periodistas y opositores. Transforma al candidato en una figura informada, empática y dialécticamente sólida.

#### 3. ¿Cómo lo hace?
- **Inyección de Contexto Municipal DANE**: Antes de redactar, el servicio extrae automáticamente la población, el NBI, las tasas de criminalidad y las principales actividades económicas del territorio desde el repositorio central.
- **Motor de Encuadre Cognitivo (*Prospect Theory*)**: Permite al estratega elegir el sesgo cognitivo a activar:
  - *Ganancia & Esperanza*: Narrativa de progreso, futuro y atracción de inversiones.
  - *Pérdida & Protección*: Aversión a la pérdida, seguridad, preservación del empleo y defensa institucional.
  - *Equilibrio Prospectivo*: Contraste riguroso entre el costo del continuismo y las soluciones del candidato.
- **Estructura Hexagonal del Brief**:
  1. Gancho inicial (Hook) para retener en los primeros 3 segundos.
  2. Datos territoriales duros para generar autoridad.
  3. Propuesta programática concreta adaptada a la subregión.
  4. Llamado a la Acción (CTA) enfocado en la movilización electoral.
  5. Preguntas difíciles anticipadas con respuestas blindadas.
  6. Recomendación de vestuario y colorimetría basada en psicología del color.

#### 4. ¿Cómo se ve cuando lo hace?
- **Panel Superior de Parámetros**: Selectores de formato (Discurso de Plaza, Video TikTok/Reels de 15s-60s, Mensaje de WhatsApp, Intervención en Debate), territorio objetivo y selector de sesgo prospectivo con botones brillantes.
- **Editor de Brief Estilizado**: Área de visualización tipográfica estructurada con bloques de advertencia, citas destacadas, cajas de preguntas difíciles con fondo carmesí sutil y paletas de color con muestras visuales (swatches).
- **Acciones Rápidas**: Botón de "Generar con Gemini 3.8 Flash", botón de "Copiar al Portapapeles", botón de "Exportar a PDF Editorial" y botón de "Guardar en Google Drive".

---

### HERRAMIENTA 3: MOTOR DE INTELIGENCIA & SEGMENTACIÓN DE VOTANTES
*Propósito 2 • Analítica Multidimensional & Psicografía*

#### 1. ¿Qué hace la herramienta?
Cruza bases de datos demográficas, socioeconómicas y electorales para segmentar el censo electoral de cualquier municipio en grupos psicográficos homogéneos, detallando cómo piensan, qué medios consumen, qué les preocupa y qué argumentos neutralizan sus objeciones.

#### 2. ¿Por qué es útil?
Tratar al electorado como una masa uniforme es la causa principal del fracaso publicitario. Esta herramienta identifica exactamente a qué nichos dirigirse, cuál es el volumen de votos en juego en cada segmento y cómo articular la narrativa del candidato para conquistarlos sin alienar a otras bases.

#### 3. ¿Cómo lo hace?
- **Matriz de Intersección de Variables**: Cruza tres ejes:
  - Eje Etario: Jóvenes (18-28), Adultos Productivos (29-59), Adultos Mayores (60+).
  - Eje Estratificado: Estratos Populares (1-2), Clase Media (3-4), Estratos Altos (5-6).
  - Eje Territorial/Económico: Urbano-Comercial, Industrial-Maquila, Rural-Campesino.
- **Modelado de 4 Arquetipos Clave por Territorio**:
  1. *Jóvenes Digitales e Indecisos*: Priorizan empleo tecnológico, libertades individuales y rechazan la política tradicional.
  2. *Madres Cabeza de Hogar y Cuidadoras*: Sensibles a programas de nutrición infantil, subsidios y seguridad barrial.
  3. *Comerciantes y Emprendedores Independientes*: Preocupados por extorsiones, microtráfico, impuestos y facilidad de créditos.
  4. *Comunidad Campesina y Productores Rurales*: Enfocados en vías terciarias, precios de insumos agrícolas y peajes.
- **Diagnóstico Psicográfico Asistido por Gemini**: Activa un análisis de causas profundas de desafección electoral con Google Search Grounding.

#### 4. ¿Cómo se ve cuando lo hace?
- **Matriz Visual de Distribución**: Gráficos de barra segmentados que muestran el peso relativo de cada grupo etario y estrato en el municipio.
- **Carrusel de Arquetipos**: Fichas visuales con avatares cromáticos, etiquetas de nivel de riesgo y potencial de conversión en porcentaje.
- **Ficha Desplegable de Microtargeting**: Al seleccionar un arquetipo, se despliegan canales recomendados (ej. *TikTok Reels de 9pm a 11pm* o *Grupos barriales de WhatsApp*), disparadores emocionales y objeciones frecuentes con contra-argumentos estructurados.

---

### HERRAMIENTA 4: ZOOM TERRITORIAL CONTINUO GIS EN 5 ESCALAS
*Arquitectura Cartográfica Multi-Escala • GeoJSON Vectorial*

#### 1. ¿Qué hace la herramienta?
Proporciona un visor cartográfico interactivo que navega sin cortes ni recargas a través de **5 niveles jerárquicos de división político-administrativa**:
1. Nivel Nacional: 32 Departamentos + Bogotá D.C.
2. Nivel Departamental: Antioquia y los departamentos de Colombia con sus municipios oficiales.
3. Nivel Subregional: Las 9 subregiones de Antioquia calculadas por motor de agregación.
4. Nivel Municipal: Los 125 municipios de Antioquia y 1.122 municipios de Colombia.
5. Nivel Local / Barrial: Las 16 comunas y 5 corregimientos oficiales de Medellín con división barrial.

#### 2. ¿Por qué es útil?
Permite al estratega tener una vista de "ojo de halcón" de todo el país y, en tres clics, hacer zoom hasta la comuna o barrio específico donde el candidato tiene programada una caminata o pauta geocercada, cargando en el acto las estadísticas del territorio.

#### 3. ¿Cómo lo hace?
- **Motor Leaflet Vectorial**: Renderizado de polígonos GeoJSON optimizados en memoria para alta tasa de refresco.
- **Opción 3 de Cartografía de Medellín**: Resuelve la delimitación histórica de los corregimientos combinando el polígono base del municipio, los 5 centros geográficos corregimentales (Palmitas, San Cristóbal, Altavista, San Antonio de Prado y Santa Elena) con círculos proporcionales y las 16 comunas urbanas sin solapamiento.
- **Sincronización Bidireccional de Contexto**: Al hacer clic en cualquier polígono, el `activeTerritoryContextService` actualiza globalmente la memoria del aplicativo, propagando el territorio seleccionado a las herramientas de publicidad, contenido y segmentación.

#### 4. ¿Cómo se ve cuando lo hace?
- **Lienzo Cartográfico en Dark Mode**: Mapa con fondo antracita de alto contraste, fronteras iluminadas en azul neón y sombreados poligonales reactivos al puntero (*hover effects*).
- **Controlador Flotante de Escalas**: Barra superior con botones estilo chip que indican la escala actual (`[Nacional] ➔ [Departamental] ➔ [Subregional] ➔ [Municipal] ➔ [Comunas/Barrios]`) con flechas indicadoras de migas de pan (*breadcrumbs*).
- **Tarjeta Flotante de Telemetría**: Al pasar el ratón o hacer clic en un municipio o comuna, aparece una tarjeta semitransparente con el nombre oficial, código DANE, censo electoral, porcentaje de NBI y alcalde electo.

---

### HERRAMIENTA 5: REPOSITORIO MUNICIPAL UNIVERSAL & PIPELINE DE CONTEXTO
*Propósito 1 • Repositorio Abierto e Inyección IA*

#### 1. ¿Qué hace la herramienta?
Es el almacén centralizado de datos duros de los **1.122 municipios de Colombia y los 125 municipios de Antioquia**. Consolida censos electorales, NBI, Índice de Pobreza Multidimensional (IPM), composición de concejos, alcaldes y factores de riesgo en una base unificada.

#### 2. ¿Por qué es útil?
Garantiza que toda la inteligencia del aplicativo provenga de datos institucionales contrastados (DANE, Registraduría, DNP) y permite a cualquier analista o desarrollador copiar en un solo clic el bloque de contexto necesario para alimentar modelos de IA externos o herramientas internas.

#### 3. ¿Cómo lo hace?
- **Método `buildContextPrompt(queryOrId)`**: Compila en tiempo real un prompt estructurado en Markdown con todas las variables del municipio para inyectarlo en la ventana de contexto de Gemini.
- **Pipeline Abierto `ingest(records)`**: Interfaz tipada en TypeScript que permite la carga de nuevos registros municipales o actualización de datos electorales en caliente sin necesidad de recompilar la suite.
- **Motor de Búsqueda Predictiva**: Búsqueda instantánea por nombre, código DANE o subregión mediante normalización fonética y de acentos.

#### 4. ¿Cómo se ve cuando lo hace?
- **Buscador Inteligente**: Barra de búsqueda con icono de lupa y filtros rápidos por subregión o rango de población.
- **Tabla de Registros de Alta Densidad**: Vista en tarjetas o filas con badges de colores para el nivel de NBI (Bajo, Medio, Alto, Crítico) y censo electoral.
- **Modal de Contexto para IA**: Ventana emergente con el bloque de texto formateado listo para copiar con un botón de подтверждение ("Copiado al portapapeles").
- **Modal de Ingesta JSON**: Formulario para pegar objetos JSON con validación de esquema en tiempo real.

---

### HERRAMIENTA 6: OBSERVATORIO ELECTORAL DE CASAS POLÍTICAS Y REDES DE PODER
*Modelado Topológico de Redes • Grafos 2D y 3D en WebGL*

#### 1. ¿Qué hace la herramienta?
Modela las estructuras de poder político real en Antioquia y el Valle de Aburrá. Representa a las **7 grandes casas políticas hegemónicas** (Casa Trujillo, Casa Suárez Mira, Casa Federico Gutiérrez / Creemos, Casa Uribe / Rendón CD, Casa Julián Bedoya, Casa John Jairo Roldán y Casa Germán Blanco), a más de **71 concejales reales** y sus relaciones de subordinación, alianzas de gobierno o disputas abiertas mediante grafos de fuerza dirigida en 2D y 3D.

#### 2. ¿Por qué es útil?
Permite al estratega ver "los hilos invisibles" de la política: quién responde a qué senador, qué concejales controlan la contratación municipal, dónde hay fracturas internas que el candidato puede explotar y cómo se distribuyen los feudos barriales.

#### 3. ¿Cómo lo hace?
- **Motor Force-Directed en WebGL**: Simula fuerzas físicas (repulsión entre nodos, atracción por resortes en aristas y gravedad central) para organizar visualmente los actores políticos según su jerarquía (Nivel 1: Patriarca/Barón, Nivel 2: Congreso Nacional, Nivel 3: Departamental/Asamblea, Nivel 4: Concejales y Alcaldes).
- **Tipología de Aristas**: Modela 4 tipos de relaciones con pesos numéricos:
  - *Jerarquía Directa* (fuerza 5/5): Subordinación orgánica dentro de la casa.
  - *Alianza Electoral* (fuerza 4/5): Acuerdos pragmáticos de coalición.
  - *Pacto de Bancada* (fuerza 3/5): Trámite conjunto en corporaciones públicas.
  - *Tensión o Disputa* (aristas discontinuas carmesí): Rupturas, traiciones o competencia de feudo.
- **Filtros por Partido y Territorio**: Permite aislar en un clic la bancada de concejales de cualquier colectividad (CD, Creemos, Liberal, Conservador, Pacto Histórico, Verde) o de cualquier municipio metropolitano.

#### 4. ¿Cómo se ve cuando lo hace?
- **Espacio Tridimensional Interactivo**: Lienzo negro estelar donde los nodos orbitan como esferas policromáticas luminosas (con los colores oficiales de cada partido o casa).
- **Controles de Cámara**: Permite rotar en 360 grados, hacer zoom orbital, alternar entre proyección 2D y 3D, y activar o desactivar la física de partículas.
- **Panel Lateral de Inteligencia OSINT**: Al hacer clic en cualquier actor (ej. Carlos Andrés Trujillo, Federico Gutiérrez, Milton Vasco o Jorge Julián Osorio), se despliega una ficha completa con:
  - Fotografía oficial y rol.
  - Votación 2023 y cédula.
  - Enlace extramunicipal (conexión con Bogotá) y anclaje municipal (feudo de votos).
  - Enlaces a perfiles sociales oficiales verificados.
  - Resumen de noticias de fuentes abiertas (OSINT) con análisis de sentimiento (positivo, neutro, crítico, judicial).

---

### HERRAMIENTA 7: AUDITORÍA FORENSE ELECTORAL, LEY DE BENFORD Y ESCRUTINIOS
*Prevención de Fraude & Control Electoral E-14 vs E-24*

#### 1. ¿Qué hace la herramienta?
Es el módulo de integridad electoral. Analiza las distribuciones numéricas de sufragios en actas de mesa (E-14) y formularios de escrutinio (E-24) mediante pruebas estadísticas avanzadas (**Ley de Benford en primer y segundo dígito, test Chi-cuadrado $\chi^2$ y Z-score**) para identificar mesas o zonas donde hubo manipulación antinatural de votos, mesas espejo o alteraciones artificiales.

#### 2. ¿Por qué es útil?
Blindar el triunfo en las urnas es tan crucial como ganar la simpatía en la calle. Esta herramienta permite a los abogados y testigos electorales presentar reclamaciones fundadas con evidencia estadística matemática ante los jueces escrutadores y comisiones escrutadoras de la Registraduría.

#### 3. ¿Cómo lo hace?
- **Prueba Benfordiana**: Evalúa si el primer dígito significativo de la votación por mesa cumple con la ley logarítmica universal:
  $$P(d) = \log_{10}\left(1 + \frac{1}{d}\right)$$
  Las desviaciones estadísticamente anómalas (p-valor $< 0.05$ o picos en dígitos no esperados) son marcadas como alertas de manipulación deliberada o relleno de urnas.
- **Comparador Forense E-14 vs E-24**: Detecta discrepancias de transcripción entre el acta de jurados y el resultado computado en comisiones escrutadoras.
- **Protocolo de Testigos y Cadena de Custodia**: Genera hojas de ruta para el Día D con puntos críticos de vigilancia en mesas históricamente atípicas.

#### 4. ¿Cómo se ve cuando lo hace?
- **Gráfico de Barras Benfordiano**: Curva teórica ideal (línea azul) superpuesta a las barras de frecuencia real de la votación observada (barras verdes para concordantes, barras carmesí para picos anómalos).
- **Semáforo Forense**: Tarjeta con indicador general (*"Riesgo Estadístico Bajo"*, *"Discrepancia Moderada"* o *"Alerta Crítica de Intervención"*).
- **Tabla de Mesas Auditadas**: Listado de mesas con códigos de puesto, número de votantes y valor de desviación estándar, con botón para descargar el informe pericial.

---

### HERRAMIENTA 8: SIMULADOR MATEMÁTICO D'HONDT & CURUL MARGINAL
*Cálculo Analítico de Escaños & Umbral Constitucional (PA-001)*

#### 1. ¿Qué hace la herramienta?
Calcula con exactitud matemática instantánea (<2ms en el cliente) la distribución de curules para cuerpos colegiados (Senado, Cámara de Representantes, Asambleas y Concejos) aplicando el **sistema D'Hondt con cifra repartidora y umbral del 3%** (Art. 263 C.P.), identificando cuántos votos le faltan a la lista del candidato para conquistar la siguiente curul residual ("Curul Marginal") o cuántos votos necesita para defender la suya del competidor más cercano.

#### 2. ¿Por qué es útil?
En listas de voto preferente o cerradas, miles de millones de pesos se pierden persiguiendo metas ilusorias. El simulador indica el número exacto de sufragios que separan la victoria de la derrota (el "gap marginal"), permitiendo concentrar el esfuerzo publicitario y logístico en los últimos 21 días exclusivamente en los votos necesarios para asegurar el escaño.

#### 3. ¿Cómo lo hace?
- **Motor D'Hondt Vectorial**: Ordena los cocientes decrecientes resultantes de dividir los votos de cada lista que superó el umbral por la serie natural de enteros ($1, 2, 3, \dots, N$). El enésimo cociente define la Cifra Repartidora.
- **Algoritmo de Curul Marginal**: Determina la distancia euclidiana en votos entre el último cociente ganador y el primer cociente no asignado, calculando la meta residual.
- **Desglose Subregional de Metas**: Distribuye la meta de votos marginales por subregiones con ponderadores empíricos de rendimiento (Valle de Aburrá 48%, Oriente 24%, Urabá 15%, etc.).
- **Generador de Planes de Choque con IA**: Invoca a Gemini 3.8 Flash para transformar ese déficit matemático en un plan de acción para el Día D.

#### 4. ¿Cómo se ve cuando lo hace?
- **Barra de Escaños Policromática**: Barra horizontal interactiva dividida en segmentos proporcionales con los colores de cada partido que obtiene representación.
- **Controles Deslizantes (Sliders)**: Deslizadores en tiempo real para ajustar la participación electoral general, el porcentaje de voto en blanco y la votación estimada de cada colectividad.
- **Tarjeta Alerta de Curul Marginal**: Banner dorado que anuncia: *"Curul Marginal #17 en Disputa: Faltan 4.820 votos para asegurar el escaño frente a la lista rival más cercana"*.
- **Matriz Subregional de Votos**: Tabla con la meta de votos a buscar por cada municipio cabecera.

---

### HERRAMIENTA 9: PROCESADOR DEMOSCÓPICO INTELIGENTE DE ENCUESTAS
*Extracción Inteligente de Datos de Encuestas con IA*

#### 1. ¿Qué hace la herramienta?
Procesa textos libres, comunicados de prensa o reportes en PDF de firmas encuestadoras reconocidas (Invamer, Cifras & Conceptos, Centro Nacional de Consultoría, GAD3, YanHaas) y **extrae automáticamente en una estructura limpia de datos JSON** las intenciones de voto para primera y segunda vuelta, cruces por región, género y fichas técnicas metodológicas.

#### 2. ¿Por qué es útil?
Ahorra horas de transcripción manual a los asesores de campaña y elimina errores humanos al consolidar encuestas dispares en una matriz homogénea que alimenta las predicciones del sistema.

#### 3. ¿Cómo lo hace?
- **Prompt Especializado de Extracción**: Envía el texto a Gemini 3.8 Flash configurado como experto en demoscopia política, con un esquema estricto de salida en formato JSON.
- **Mapeo de Atributos**: Extrae márgenes de error, tamaño muestral, fechas de campo, porcentajes de voto espontáneo o guiado y los almacena en el estado del aplicativo.

#### 4. ¿Cómo se ve cuando lo hace?
- **Área de Entrada Dual**: Cuadro de texto para pegar fragmentos de encuestas y botón de carga de archivos.
- **Visor de Ficha Técnica Extraída**: Tarjetas ordenadas que desglosan la intención de voto por candidato con barras porcentuales y cuadro de metodología con tamaño de muestra y fechas de campo.

---

### HERRAMIENTA 10: COMPARADOR POLÍTICO Y ANÁLISIS CRUZADO NACIONAL
*Análisis Prospectivo Multifuente Asistido por Google Search*

#### 1. ¿Qué hace la herramienta?
Ejecuta búsquedas profundas y análisis comparativos en tiempo real sobre el clima de opinión pública, alianzas de última hora entre precandidatos, tendencias en redes sociales y movimientos en el Congreso a nivel nacional.

#### 2. ¿Por qué es útil?
Brinda a la mesa directiva de la campaña una visión panorámica de la coyuntura del país en minutos, detectando temas emergentes (ej. crisis en el sector salud, peajes, debates de reformas) antes de que la competencia reaccione.

#### 3. ¿Cómo lo hace?
- Utiliza **Google Search Grounding** integrado en Gemini para consultar las fuentes periodísticas más recientes, sintetizar debates y contrastar las posturas de los diferentes bloques políticos frente al candidato activo.

#### 4. ¿Cómo se ve cuando lo hace?
- Tres botones tácticos: `[ Contexto Político Nacional ]`, `[ Análisis Regional Cruzado ]` y `[ Dinámicas de Alianzas ]`.
- Al hacer clic, se despliega un reporte ejecutivo con citas a fuentes periodísticas, viñetas analíticas y recomendaciones de posicionamiento mediático.

---

### HERRAMIENTA 11: TABLERO PRESIDENCIA & COBERTURA DEPARTAMENTAL UNIVERSAL
*Visión Macro-Territorial de los 32 Departamentos de Colombia + Bogotá D.C.*

#### 1. ¿Qué hace la herramienta?
Ofrece un panel de mando macro-electoral que consolida los **32 departamentos de Colombia y el Distrito Capital de Bogotá**, organizados por regiones geográficas (Andina, Caribe, Pacífica, Orinoquía, Amazonía). Permite consultar censos, escaños de Cámara, promedios de NBI y generar diagnósticos departamentales e hiperlocales con IA.

#### 2. ¿Por qué es útil?
Es esencial para candidatos al Senado de la República (circunscripción nacional) o campañas presidenciales que requieren balancear su agenda y presupuesto publicitario entre diferentes regiones del país sin perder el foco en los bastiones electorales clave.

#### 3. ¿Cómo lo hace?
- Consulta las bases de datos de `COLOMBIA_REGIONS`, `DEPARTMENT_NBI_SUMMARY` y `NATIONAL_MUNICIPALITIES`.
- Genera en caliente reportes departamentales con Gemini evaluando fortalezas de los liderazgos locales y prioridades económicas.

#### 4. ¿Cómo se ve cuando lo hace?
- **Selector de Regiones Naturales**: Pestañas superiores para filtrar por región geográfica.
- **Grilla de Departamentos**: Tarjetas con banderas o escudos, capital departamental, población, escaños legislativos y nivel de NBI.
- **Desglose Municipal**: Al seleccionar un departamento, se despliegan todos sus municipios oficiales con buscador interactivo y botón de reporte por municipio.

---

### HERRAMIENTA 12: CENTRO DE PERSONALIZACIÓN DEL CANDIDATO ACTIVO
*Gestión Global de Identidad, Ideología y Colorimetría*

#### 1. ¿Qué hace la herramienta?
Es el centro de configuración del candidato. Permite definir o modificar el nombre, rol de campaña (Senado, Cámara Antioquia, Alcaldía, Concejo, etc.), partido, ideología central, tono comunicativo (Confrontativo, Técnico, Empático, Inspirador), ejes programáticos y código cromático distintivo.

#### 2. ¿Por qué es útil?
Permite que Proteus sea una suite completamente multi-candidato. Con solo cambiar o personalizar el perfil activo, **todo el sistema adapta en tiempo real** sus discursos, pautas publicitarias, sugerencias de vestuario y análisis de rivales al nuevo candidato seleccionado.

#### 3. ¿Cómo lo hace?
- Almacena el perfil en `localStorage` bajo un esquema tipado `CandidateProfile`.
- Propaga el contexto a través de React Context a todos los módulos y componentes de la aplicación.

#### 4. ¿Cómo se ve cuando lo hace?
- **Tarjeta de Identidad del Candidato**: Muestra la fotografía oficial, nombre en tipografía destacada, partido y lema de campaña.
- **Modal de Edición Completo**: Campos para editar biografía, propuestas bandera, color primario y secundario en selector hexadecimal, y configuración de prioridades subregionales.
- **Barra Superior Global (`TopStatusBar`)**: Muestra permanentemente en toda la aplicación el nombre del candidato activo con su color oficial y botón de acceso rápido al perfil.

---

### HERRAMIENTA 13: ANALISTA MULTIMEDIA: ESTUDIO DE IMAGEN & VIDEO DEL CANDIDATO
*Semiótica del Poder, Fototipo y Entrenamiento Escénico*

#### 1. ¿Qué hace la herramienta?
Es el asesor de imagen y media training automatizado. Evalúa intervenciones audiovisuales del candidato en tres dimensiones fundamentales:
1. Desempeño en video (oratoria, pausas, muletillas, micro-expresiones y dicción).
2. Colorimetría y fototipo estacional (definición de swatches Hex de trajes y vestuario de poder vs. cercanía).
3. Semiótica del liderazgo (matriz de percepción de autoridad vs. empatía).

#### 2. ¿Por qué es útil?
El 85% de la persuasión política en formatos cortos (TikTok, Reels) y televisión entra por los ojos y los primeros micro-segundos de audio. Un candidato con vestuario discordante o dicción insegura pierde votos instantáneamente. Esta herramienta proporciona una hoja de ruta técnica de entrenamiento para maximizar el impacto visual y escénico.

#### 3. ¿Cómo lo hace?
- Algoritmos de análisis semiótico y principios de colorimetría estacional (Primavera, Verano, Otoño, Invierno).
- Generación de plan de entrenamiento estructurado en 4 semanas para perfeccionar el delivery discursivo y el contacto visual con la cámara.

#### 4. ¿Cómo se ve cuando lo hace?
- **Pestaña de Video**: Métricas en barras de progreso de Ritmo, Contacto Visual, Claridad y Control de Muletillas, con recomendaciones de edición técnica de audio/video.
- **Pestaña de Imagen**: Identificación del fototipo con muestras de color Hex interactivas para *Traje de Autoridad* (ej. Azul Medianoche `#1B2A4A`), *Vestuario de Cercanía Comunitaria* y *Colores Prohibidos en Pantalla*.
- **Pestaña Semiótica**: Plan de 4 semanas con ejercicios vocales y de postura corporal paso a paso.

---

### HERRAMIENTA 14: SALA EJECUTIVA DE GOBERNACIÓN DE ANTIOQUIA & MONITOREO MULTINIVEL
*Radar de Coyuntura Departamental & Sensor de Proyectos*

#### 1. ¿Qué hace la herramienta?
Monitorea la dinámica institucional del departamento de Antioquia, evaluando la gobernabilidad, la tensión fiscal de transferencias del SGP, el estado de las megaobras viales (Vías 4G, Túnel del Toyo, Túnel de Oriente) y rastreando noticias regionales de fuentes abiertas en tiempo real.

#### 2. ¿Por qué es útil?
Permite al candidato conectar sus propuestas con los temas que dominan los titulares de los medios locales y departamentales (ej. El Colombiano, Teleantioquia), aprovechando las coyunturas de descontento o las demandas de autonomía regional.

#### 3. ¿Cómo lo hace?
- Bridge con servicio de scraping y agregación de noticias (`gobernacion_bridge.py` / `gobernacionService.ts`).
- Semáforo de riesgo y categorización temática (Finanzas, Seguridad, Infraestructura, Salud).

#### 4. ¿Cómo se ve cuando lo hace?
- **Panel de Estado de Sincronización**: Indicador de conexión en verde con el número total de alertas y noticias auditadas (ej. 142 eventos).
- **Radar de Megaobras**: Tarjetas de seguimiento a vías 4G con porcentajes de avance y cuellos de botella identificados.
- **Feed de Noticias**: Lista cronológica de titulares regionales con etiquetas de sentimiento y relevancia electoral.

---

### HERRAMIENTA 15: MOTOR DE AGREGACIÓN GEOESPACIAL DE 9 SUBREGIONES
*Cálculo Topológico de las Subregiones de Antioquia*

#### 1. ¿Qué hace la herramienta?
Agrupa los 125 municipios oficiales de Antioquia en sus **9 subregiones geográficas y políticas** (Valle de Aburrá, Oriente, Suroeste, Occidente, Norte, Bajo Cauca, Magdalena Medio, Nordeste y Urabá), calculando de forma agregada el peso del censo, la concentración del voto, la vocación económica y los cacicazgos dominantes.

#### 2. ¿Por qué es útil?
La campaña no se puede planificar municipio a municipio de forma aislada; las subregiones comparten economías comunes (café en el Suroeste, banano y logística en Urabá, agroindustria y tecnología en Oriente). Esta herramienta permite diseñar giras y mensajes regionales coherentes.

#### 3. ¿Cómo lo hace?
- Servicio `subregionAggregationEngine.ts`: Realiza la unión geométrica en memoria y la sumatoria ponderada de variables demográficas y electorales de los municipios pertenecientes a cada subregión oficial.

#### 4. ¿Cómo se ve cuando lo hace?
- **Selector de Subregiones en Cuícula**: 9 tarjetas visuales con fotografías representativas y códigos de color asignados.
- **Ficha Agregada**: Al seleccionar una subregión, se resalta en el mapa su contorno completo y se despliega la lista de municipios integrantes, censo total y padrinazgos en la Asamblea Departamental.

---

### HERRAMIENTA 16: DIRECTORIO & SENSOR DE 125 MUNICIPIOS DE ANTIOQUIA
*Explorador Exhaustivo Municipal de Antioquia*

#### 1. ¿Qué hace la herramienta?
Proporciona fichas técnicas individuales y comparativas para **cada uno de los 125 municipios de Antioquia**, detallando el alcalde en funciones (2024-2027), partido ganador, conformación del concejo municipal, tasa de homicidios, extorsión y NBI.

#### 2. ¿Por qué es útil?
Es el "manual de bolsillo" indispensable para cuando el candidato visita cualquier municipio antioqueño (desde Vigía del Fuerte hasta Yondó o Arboletes), permitiéndole saber quién manda, quién hace oposición y cuáles son las principales obras inconclusas.

#### 3. ¿Cómo lo hace?
- Dataset `METROPOLITAN_MUNICIPALITIES_DATA` y `antioquiaData.ts`.
- Botón directo de enlace con el Director de Contenido: Al hacer clic, pasa los datos del municipio al generador de discursos sin salir de la vista.

#### 4. ¿Cómo se ve cuando lo hace?
- **Grilla de Búsqueda con Filtros**: Filtros por subregión, categoría municipal (1 a 6) y partido del alcalde.
- **Ficha Técnica Expandible**: Muestra el nombre del mandatario, coalición vencedora, composición de las curules del concejo y gráficos de barras de criminalidad y pobreza.

---

### HERRAMIENTA 17: CUADRILLA DE 5 AGENTES IA ESPECIALIZADOS
*Agentes Autónomos de Inteligencia de Campaña*

#### 1. ¿Qué hace la herramienta?
Es una consola de despacho de misiones donde interactúan 5 agentes de inteligencia artificial especializados en tareas críticas de la campaña:
1. `SENTINEL-TERRITORY`: Monitoreo y exploración de datos territoriales y alertas tempranas.
2. `STRAT-SEGMENT`: Analista de nichos psicográficos y polarización electoral.
3. `CREATIVE-DIRECTOR`: Redacción de briefs, piezas creativas y ganchos de persuasión.
4. `MEDIA-VISION`: Auditoría de imagen, semiótica y dicción en piezas multimedia.
5. `SYNC-NEXUS`: Síntesis de Google Search Grounding y persistencia en Google Drive.

#### 2. ¿Por qué es útil?
Permite al equipo de campaña delegar investigaciones complejas a agentes paralelos que ejecutan búsquedas, analizan documentos y redactan informes ejecutivos mientras el equipo humano se concentra en la toma de decisiones políticas.

#### 3. ¿Cómo lo hace?
- Definiciones modulares en `proteusAgentTeam.ts`.
- Despacho asíncrono con telemetría en tiempo real y registro de auditoría en la consola.

#### 4. ¿Cómo se ve cuando lo hace?
- **Consola Estilo Terminal Táctica**: Interfaz con tarjetas de estado de cada agente (Activo, En Misión, En Espera), botón para asignar misiones y ventana de terminal donde desfilan los logs de ejecución en verde fósforo.

---

### HERRAMIENTA 18: CONSOLA DE LA UNIDAD DE AUTOMEJORA ESTRATÉGICA
*Cuerpo Colegiado de los 7 Agentes • Protocolo Crítico PC-001 y PA-001 a PA-012*

#### 1. ¿Qué hace la herramienta?
Es el órgano epistemológico y de gobernanza interna de Proyecto Proteus. Alberga al **Cuerpo Colegiado de los 7 Agentes de Autoperfeccionamiento Continuo**:
1. `AGENT-ORCHESTRATOR`: Apertura de sesiones, cálculo de Prioridad Estratégica (PE) y balance global.
2. `AGENT-ACADEMIC-RES`: Sustentación científica, sociológica y bibliográfica de cada decisión.
3. `AGENT-DATA-RES`: Auditoría y diseño de arquitecturas de bases de datos y algoritmos.
4. `AGENT-LEX-ARTIS`: Aseguramiento de estándares de campaña moderna y micro-targeting internacional.
5. `AGENT-AUDITOR`: Guardián del Mandato Supremo; impide la fuga hacia la gestión administrativa y garantiza el enfoque en Publicidad/Votos.
6. `AGENT-SOFTWARE-ENG`: Ejecución de código limpio, tipado estricto y cero latencia.
7. `AGENT-ORGANIZER`: Protocolización, actas oficiales y bitácora de automejora.

#### 2. ¿Por qué es útil?
Garantiza que el aplicativo no se desvíe jamás de su propósito rector, no acumule deuda técnica y mantenga una rigurosa trazabilidad de cada protocolo implementado (desde el PA-001 del simulador D'Hondt hasta el PA-012 de inyección de concejales de proximidad).

#### 3. ¿Cómo lo hace?
- Ciclos dialécticos de 6 fases: Convocatoria ➔ Investigación Tripartita ➔ Mesa Redonda Dialéctica (Tesis vs Antítesis) ➔ Auditoría Epistemológica ➔ Especificación Técnica en 5 Pilares ➔ Protocolización y Despliegue en Código.

#### 4. ¿Cómo se ve cuando lo hace?
- **Repositorio de Actas y Protocolos**: Acceso a los documentos normativos en Markdown (`protocolos_de_automejora/`).
- **Bitácora de Sesiones Críticas**: Historial documentado con veredictos, fórmulas de cálculo de prioridad y actas unánimes aprobadas.

---

## 3. SÍNTESIS DE FLUJO INTEGRADO: EL VIAJE DEL DATO HACIA EL VOTO

El valor diferencial de Proyecto Proteus radica en la **sinergia absoluta entre todas sus herramientas**. No son módulos aislados, sino un engranaje continuo:

$$\boxed{\text{GIS / Repositorio Municipal}} \longrightarrow \boxed{\text{Grafos de Casas Políticas & Concejales}} \longrightarrow \boxed{\text{Segmentación Psicográfica}} \longrightarrow \boxed{\text{Director de Contenido}} \longrightarrow \boxed{\text{Optimizador Publicitario (IRPV)}} \Longrightarrow \mathbf{\text{VOTOS}}$$

1. El estratega selecciona en el **Zoom Territorial** la Comuna 10 (La Candelaria) de Medellín.
2. El **Repositorio Municipal** inyecta automáticamente los datos de estratos, población flotante y problemas de seguridad.
3. El **Observatorio de Casas Políticas** identifica la presencia de los concejales del Centro Democrático y Creemos, y detecta el relevo de curul del Dr. Jorge Julián Osorio Gómez (exrector CES).
4. El **Motor de Segmentación** señala que el gremio médico y los comerciantes independientes de la zona exigen una solución urgente para Metrosalud y orden barrial.
5. El **Director de Contenido** redacta un brief con encuadre de *Pérdida & Protección* blindando al candidato ante preguntas sobre presupuesto.
6. El **Optimizador de Publicidad** formula anuncios A/B con el gancho del Dr. Osorio y Metrosalud, calcula un retorno IRPV de `1.85x` y distribuye el presupuesto geocercado en Meta Ads y TikTok.
7. El **Simulador D'Hondt** verifica cómo estos sufragios adicionales recortan la distancia para asegurar la curul marginal residual.

Este es el funcionamiento integral de **Proyecto Proteus**: ciencia de datos, rigor geoespacial y psicología cognitiva puestos al servicio exclusivo de la victoria electoral.
