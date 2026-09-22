# INFORME TOTAL Y DEFINITIVO DE PROYECTO PROTEUS v1.4.5
## Ecosistema Integral de Inteligencia Territorial, Redes de Poder, Auditoría Forense y Maximización Publicitaria Electoral

---

### TABLA DE CONTENIDOS
1. **Misión Teleológica y Filosofía Arquitectónica**
2. **Inventario Total de Datos Integrados (Data Lake)**
3. **Catálogo Exhaustivo de Herramientas y Módulos (17 Módulos)**
4. **Matriz de Funciones y Algoritmos Matemáticos de Precisión**
5. **Espectro Completo de Análisis que es Capaz de Realizar Proteus**
6. **Arquitectura de Modelos de Lenguaje (LLMs) y Motores de IA**
7. **La Unidad de Automejora y Gobernanza Dialéctica (7 Agentes)**
8. **Infraestructura de Software, Despliegue y Persistencia**

---

## 1. MISIÓN TELEOLÓGICA Y FILOSOFÍA ARQUITECTÓNICA

Proyecto Proteus ha sido concebido y refinado para cumplir un propósito rector inviolable:  
**La maximización de la eficacia de la publicidad electoral (la maximización de la relación Publicidad / Votos)** antes de que el ciudadano acuda a las urnas, utilizando la segmentación científica y la inteligencia territorial como armas determinantes.

Para alcanzar este fin supremo sin incurrir en un reduccionismo publicitario ciego, Proteus opera bajo un **Modelo Arquitectónico en 2 Capas**:

```
┌────────────────────────────────────────────────────────────────────────────────┐
│             CAPA DE SALIDA: CONVERSIÓN PUBLICITARIA (FIN SUPREMO)              │
│  - Generación de Creatividades Multiformato con IA (Reels, TikTok, WhatsApp)   │
│  - Simulador de Pacing Presupuestal y Optimización del Costo por Voto (CPVP)   │
│  - Encuadre Psicológico A/B (Framing Ganancia/Esperanza vs Pérdida/Protección) │
└──────────────────────────────────────▲─────────────────────────────────────────┘
                                       │ Alimenta y Calibra
┌──────────────────────────────────────┴─────────────────────────────────────────┐
│        CAPA DE ENTRADA: INTELIGENCIA ESTRATÉGICA (MEDIOS NECESARIOS)           │
│  1. Grafos de Redes de Poder y Casas Políticas (Feudos, Caciques, Grietas)     │
│  2. Mapas de Calor y Concentración Geoespacial (Densidad de Voto Volátil)      │
│  3. Sistema Integrado de Variables (DANE 54 Clusters, Registraduría E-24/E-14) │
│  4. Monitoreo Multinivel en Tiempo Real (Nacional, Gobernación, Independencia) │
└────────────────────────────────────────────────────────────────────────────────┘
```

El software no redacta publicidad en el vacío: cada pieza, cada gancho y cada peso invertido en pauta está hiper-contextualizado por el conocimiento de quién gobierna el municipio, qué contratos controla la maquinaria rival, qué tensiones existen con la Gobernación de Antioquia y qué necesidades socioeconómicas priman en la comuna o vereda impactada.

---

## 2. INVENTARIO TOTAL DE DATOS INTEGRADOS (DATA LAKE)

Proteus integra un banco masivo de datos electorales, demográficos, institucionales y geoespaciales estructurados en memoria y optimizados para consulta instantánea:

### 2.1. Cartografía Vectorial GeoJSON de 5 Escalas Continuas
- **Escala 1 (Nacional)**: 32 Departamentos de Colombia con polígonos GeoJSON oficiales (`colombiaDepartmentsGeoJson.ts`).
- **Escala 2 (Departamental)**: 125 Municipios de Antioquia subdivididos en sus 9 Subregiones geográficas (`antioquia125MunicipiosGeoJson.ts`, `antioquiaSubregionesGeoJson.ts`).
- **Escala 3 (Metropolitana)**: 10 Municipios conurbados del Valle de Aburrá con conectividad interurbana (`valleAburraMunicipiosGeoJson.ts`).
- **Escala 4 (Municipal / Distrital)**: Distrito Especial de Medellín dividido en sus 16 Comunas urbanas y 5 Corregimientos rurales (`medellin16ComunasOfficialGeoJson.ts`, `medellinComunasGeoJson.ts`).
- **Escala 5 (Hiperlocal)**: Manzanas censales y barrios representativos de Medellín y municipios clave (`medellinBarriosGeoJson.ts`).

### 2.2. Microdatos Electorales Históricos E-14 y E-24 (Registraduría)
- **Congreso 2022**:
  - Cámara de Representantes por Antioquia: Votaciones desagregadas por mesa, candidato y lista (`camara2022Data.ts`, `camara2022RawData.ts`).
  - Senado de la República: Comportamiento electoral de las principales listas en los 125 municipios (`senado2022Data.ts`, `senado2022RawData.ts`).
- **Elecciones Territoriales 2019 y 2023**:
  - Alcaldía y Concejo de Medellín: Votos mesa a mesa (`officialAlcaldia2019.ts`, `officialConcejo2019.ts`, `comunasData.ts`).
  - Histórico de participación, abstención, votos en blanco, nulos y no marcados para los periodos 2015, 2019 y 2023 (`historicalData.ts`, `e24Data.ts`).
- **Presidencia 2022**: Votaciones de primera y segunda vuelta por departamento y subregión (`presidenciaData.ts`).

### 2.3. Base de Datos Maestra de Casas Políticas y Redes de Poder
- **6 Casas Hegemónicas Modeladas en Profundidad** (`politicalHousesMasterData.ts`):
  1. *Casa Carlos Andrés Trujillo (Equipo de Antioquia)*: Feudo en Itagüí, extensión en Caldas, La Estrella, Sabaneta y Apartadó (215.400 votos).
  2. *Casa Suárez Mira (Feudo Bellanita)*: Control de Bello, Copacabana, Girardota y Barbosa (135.800 votos).
  3. *Casa Héctor Londoño / Liberales de Envigado*: Hegemonía monocolor histórica en Envigado y Sabaneta (88.500 votos).
  4. *Casa Creemos (Federico Gutiérrez)*: Maquinaria de opinión y estructura metropolitana en Medellín (689.500 votos).
  5. *Casa Pacto Histórico / Independientes (Daniel Quintero)*: Base electoral de resistencia y voto alternativo metropolitano.
  6. *Casa Centro Democrático (Álvaro Uribe Vélez)*: Estructura doctrinal con bastiones en Oriente, Suroeste y Medellín.
- **40+ Actores Políticos Individuales**: Senadores, Representantes a la Cámara, Diputados, Alcaldes en ejercicio, Concejales y Operadores de contratación territorial tipificados en 5 niveles de jerarquía.
- **80+ Relaciones de Red**: Tipificadas como `jerarquia_directa`, `alianza_electoral`, `tension_disputa` y `pacto_bancada`.
- **Perfiles Digitales**: Cuentas auditadas de X/Twitter, Facebook, Instagram y LinkedIn para cada actor.

### 2.4. Demografía Continua DANE y Vulnerabilidad Social
- **54 Clusters Demográficos Continuos**: Cruce 4D de Grupo Etario (18-28, 29-45, 46-60, 60+), Estrato Socioeconómico (1 al 6), Escolaridad y Empleabilidad.
- **Índice de Pobreza Multidimensional (IPM)**: Desglose en 5 dimensiones (salud, educación, niñez, trabajo, vivienda y servicios públicos) por comuna (`ipmData.ts`, `ipmDimensionsInfo.ts`).
- **Necesidades Básicas Insatisfechas (NBI)**: Registros oficiales para los 1.122 municipios de Colombia y los 125 de Antioquia (`nbiDetailedData.ts`).
- **Seguridad y Criminalidad**: Estadísticas de extorsión, homicidios y victimización barrial elaboradas con insumos del CIEF de la Universidad EAFIT (`criminalityData.ts`).

### 2.5. Datos de Resonancia Publicitaria y Audiencias
- **5 Arquetipos Macro de Votantes** (`adTargetingModelData.ts`):
  - *Jóvenes Universitarios & Primera Oportunidad (18-28 años)*.
  - *Madres Populares & Cabeza de Hogar (Estratos 1-2)*.
  - *Comerciantes, Emprendedores & Independientes (Estratos 2-4)*.
  - *Adultos Mayores & Pensionados Tradicionales (Estratos 2-5)*.
  - *Comunidad Rural, Campesinos & Familias del Agro*.
- **Variables Publicitarias Predictivas**: CTR esperado (%), Costo por Mil Impresiones (CPM), Costo por Votante Persuadido (CPVP), ganchos de detención de scroll, palabras de poder y términos tóxicos a evitar.

### 2.6. Monitoreo de Gobernación e Independencia
- **28 Actores Departamentales Monitoreados** en tiempo real (`gobernacionService.ts`).
- **7 Ejes de Gobierno**: Seguridad, Vías 4G, Salud, Educación, Competitividad, Sostenibilidad y Transparencia.
- **Sensor Territorial Independencia**: Base de datos de campo con noticias locales, alertas y análisis de coyuntura municipal.

---

## 3. CATÁLOGO EXHAUSTIVO DE HERRAMIENTAS Y MÓDULOS (17 MÓDULOS)

Proteus organiza su suite a través de un shell integrado (`AppShell.tsx`, `SidebarNav.tsx`) con 17 interfaces especializadas:

| Nº | Módulo / Herramienta | ID de Vista | Componente Principal | Propósito Operativo |
|---|---|---|---|---|
| **01** | **Candidato & Perfil (Inicio)** | `'national-candidates'` | `CandidateProfilesView.tsx` | Ventana inicial de personalización. Configura la identidad, tono, ejes programáticos de **Isaac Mendoza** y alberga el Launchpad Táctico. |
| **02** | **Publicidad Segmentada (PA-010/011)** | `'targeted-advertising'` | `TargetedAdvertisingOptimizerView.tsx` | Motor de persuasión publicitaria. Genera creatividades A/B, simula pauta y articula la inteligencia geopolítica con el retorno en votos. |
| **03** | **Observatorio de Casas Políticas (PA-009)** | `'political-houses-graph'` | `PoliticalHousesGraphView.tsx` | Visualizador interactivo 2D y 3D de grafos de poder, feudos municipales, actores, dialéctica hegeliana y redes sociales. |
| **04** | **Auditor Forense Electoral (PA-002/006)** | `'electoral-audit-forensics'` | `ElectoralForensicsAuditView.tsx` | Análisis forense de escrutinios con Ley de Benford de segundo dígito, detección de anomalías y discrepancias E-14 vs E-24. |
| **05** | **Zoom Territorial (5 Escalas)** | `'territorial-zoom'` | `TerritorialZoomHubView.tsx` | GIS reactivo continuo desde Colombia hasta barrios de Medellín con mapas coropléticos de censo, IPM y delito. |
| **06** | **Repositorio Municipal Universal** | `'municipal-repository'` | `MunicipalRepositoryExplorerView.tsx` | Base de datos 360° de los 125 municipios de Antioquia. Extractor de contexto territorial para inyección en prompts de IA. |
| **07** | **Segmentación & Votantes** | `'voter-segmentation'` | `VoterSegmentationEngine.tsx` | Clustering de audiencias por cohorte y NBI, cálculo del Candidate Fit Score y generador de arquetipos psicográficos. |
| **08** | **Director de Contenido & Briefs** | `'content-director'` | `CampaignContentDirectorView.tsx` | Generador de discursos, guiones y briefs estructurados en 7 puntos anclados al territorio, con exportación ejecutiva a PDF. |
| **09** | **Estudio Multimedia & Semiótica** | `'multimedia-studio'` | `CandidateMultimediaStudioView.tsx` | Auditoría de dicción en video, modulación vocal, lenguaje corporal, fototipo y colorimetría política (Power Palette). |
| **10** | **Cuadrilla de 5 Agentes IA** | `'agent-team'` | `AgentTeamConsoleView.tsx` | Consola operativa para despachar misiones a los 5 agentes IA de campaña (Territorio, Segmentación, Creatividad, Multimedia, Sincronización). |
| **11** | **Presidencia & Territorio Nacional** | `'national-overview'` | `NationalDashboardView.tsx` | Cuadro de mando de las 5 regiones naturales y 32 departamentos de Colombia con indicadores de NBI y reportes IA. |
| **12** | **Herramientas de Campaña** | `'national-tools'` | `CampaignToolsView.tsx` | Procesador y comparador demoscópico de encuestas electorales con análisis de tendencias asistido por IA. |
| **13** | **Sala Gobernación de Antioquia** | `'antioquia-gobernacion'` | `GobernacionExecutiveView.tsx` | Centro de comando departamental: seguimiento a 28 actores, termómetro de opinión, 7 ejes de gobierno y lector de planes PDF. |
| **14** | **9 Subregiones Estratégicas** | `'antioquia-subregiones'` | `SubregionesView.tsx` | Inmersión socioeconómica en las 9 subregiones y Simulador de Alineación Política (Aliado, Independiente, Opositor). |
| **15** | **Directorio de 125 Municipios** | `'antioquia-municipios'` | `AntioquiaExplorerView.tsx` | Directorio integral con dioramas 3D interactivos (Bello, Rionegro), mapas vectoriales y tableros de Calidad de Vida. |
| **16** | **Consola Antigravity** | `'antigravity-console'` | `AntigravityAgentConsole.tsx` | Consola técnica para auditoría de código, verificación de imports, pipelines de datos y simulador D'Hondt. |
| **17** | **Identidad Institucional (Brand)** | `'brand-manual'` | `BrandIdentityView.tsx` | Manual de identidad CMT Proteus: isotipo en SVG, tokens de diseño Glassmorphism Frost y paletas de contraste. |

---

## 4. MATRIZ DE FUNCIONES Y ALGORITMOS MATEMÁTICOS DE PRECISIÓN

Proteus no se limita a mostrar datos estáticos: implementa algoritmos computacionales y estadísticos avanzados:

### 4.1. Algoritmo del Índice de Retorno Publicidad/Votos (IRPV)
Formalizado en el Protocolo PA-011 (`holisticAdvertisingIntelligenceService.ts`):
$$\text{IRPV} = \text{Base Conversion} \times (1 + B_{\text{geopolitico}}) \times (1 + B_{\text{fractura}}) \times F_{\text{densidad}}$$
- **Rendimiento**: Eleva la conversión de 75 votos/M COP en pauta ciega tradicional hasta **139 - 165 votos netos por millón de COP invertido** (multiplicador de hasta 1.85x).
- **Reducción de Costo**: Reduce el Costo por Votante Persuadido (CPVP) de \$13.333 COP a menos de \$6.060 COP.

### 4.2. Simulador Electoral D'Hondt y Modelado Monte Carlo (PA-001)
Formalizado en `electoralSimulatorService.ts`:
1. **Umbral Electoral (Art. 263 Constitución de Colombia)**:
   $$\text{Umbral} = 0.5 \times \frac{\text{Votos Válidos}}{\text{Total Curules}}$$
   Las listas que no superan el umbral quedan eliminadas de la asignación.
2. **Cifra Repartidora D'Hondt**: Ordenamiento descendente de cocientes $V_i / k$ (donde $k = 1, 2, \dots, N$) hasta asignar las $N$ curules (17 curules para Cámara de Representantes por Antioquia, 108 para Senado).
3. **Simulaciones Comparativas**: Ejecución paralela con el método Sainte-Laguë / Webster y Cociente Hare con Mayor Residuo.
4. **Motor Probabilístico Monte Carlo**: 10.000 iteraciones con variabilidad bayesiana para determinar el intervalo de confianza (P10, P50, P90) de la curul de Isaac Mendoza.

### 4.3. Auditor Forense Electoral: Ley de Benford de Segundo Dígito (PA-002, PA-005)
Formalizado en `electoralForensicsService.ts`:
- **Distribución Teórica de Benford (2do Dígito)**:
  $$P(d_2 = k) = \sum_{j=1}^{9} \log_{10} \left(1 + \frac{1}{10j + k}\right), \quad k \in \{0, 1, \dots, 9\}$$
- **Prueba de Bondad de Ajuste Chi-Cuadrado ($\chi^2$)**:
  $$\chi^2 = \sum_{k=0}^{9} \frac{(O_k - E_k)^2}{E_k}$$
  Evalúa si las actas E-14 y E-24 de una comisión o municipio presentan alteraciones humanas intencionales ($p < 0.05 \implies$ indicio fundado de fraude o manipulación de votos).

### 4.4. Algoritmo de Pacing Presupuestal y Asignación Eficiente de Pauta
Formalizado en `adTargetingOptimizerService.ts`:
- Distribución de presupuesto ($1M a $150M COP) entre canales según elasticidad de cohorte:
  - *Meta Ads*: 45% (Retargeting territorial hiperlocal en radio de 1 km).
  - *TikTok Ads*: 30% (Video vertical con gancho emocional en 2 segundos).
  - *WhatsApp P2P*: 15% (Micro-copys distribuidos por líderes comunitarios).
  - *Vía Pública / Radio*: 10% (Pauta hiperlocal en días de mercado).

### 4.5. Algoritmo de Grafos de Fuerzas (Force-Directed Graph 2D/3D)
Implementado con `d3-force` y `three.js`:
- Repulsión electrostática entre nodos de actores para evitar solapamientos.
- Atracción elástica ponderada por la fuerza de la relación política.
- Agrupamiento gravitacional por Casa Política hegemónica y municipio de influencia.

---

## 5. ESPECTRO COMPLETO DE ANÁLISIS QUE ES CAPAZ DE REALIZAR PROTEUS

Proteus ofrece una suite analítica que cubre las cuatro fases de una contienda política:

### 5.1. Inteligencia Geopolítica y Dinámica de Poder
1. **Detección de Monopolios y Feudos Municipales**: Identifica qué casas controlan las alcaldías, concejos y contratos públicos en cada uno de los 10 municipios del Valle de Aburrá.
2. **Análisis de Vulnerabilidad y Desgaste Institucional**: Mapea la contradicción dialéctica (antítesis) de cada casa política (ej. acusaciones judiciales, sobrecostos hospitalarios, nepotismo).
3. **Identificación de Fracturas Electorales**: Detecta disputas entre concejales y alcaldes para orientar la pauta hacia votantes desencantados de la maquinaria oficial.
4. **Postura Táctica Recomendada**: Asigna automáticamente una de 4 posturas:
   - *Confrontación Directa* (contra feudos desgastados).
   - *Cooptación de Base* (en zonas de alta vulnerabilidad económica).
   - *Capitalización de Fractura* (en municipios en disputa).
   - *Consolidación de Bastión* (en territorios con simpatía hacia Isaac Mendoza).

### 5.2. Persuasión y Neuromarketing Electoral
1. **Resonancia Cognitiva por Cohorte**: Cruza 54 perfiles demográficos con sus ganchos emocionales para detener el scroll en redes sociales.
2. **Pruebas A/B de Encuadre Psicológico (Kahneman & Tversky)**:
   - *Framing de Ganancia / Oportunidad*: Maximiza persuasión en jóvenes y emprendedores.
   - *Framing de Pérdida / Protección*: Activa la aversión a la pérdida en madres y pensionados.
3. **Análisis de Discurso y Detección de Palabras Tóxicas**: Filtra términos que generan reactancia psicológica o rechazo en cada segmento.
4. **Auditoría Semiótica y de Colorimetría**: Analiza el impacto visual del vestuario y lenguaje corporal del candidato ante cámaras.

### 5.3. Analítica Electoral y Escenarios Prospectivos
1. **Cálculo de Curules Necesarias**: Determina cuántos votos adicionales requiere la lista de Isaac Mendoza para conquistar la siguiente curul en Cámara o Senado.
2. **Proyección de Volatilidad y Votante Bisagra**: Identifica en qué comunas o municipios el votante es más elástico y susceptible al cambio de preferencia mediante pauta digital.
3. **Auditoría Forense Preventiva**: Identifica discrepancias numéricas en actas de votación para preparar reclamaciones ante comisiones escrutadoras.

### 5.4. Monitoreo Institucional y Análisis de Coyuntura
1. **Alineación de Gobernabilidad Regional**: Monitorea los 7 ejes de la Gobernación de Antioquia para colgar el mensaje de campaña en las discusiones públicas candentes (vías 4G, seguridad, empleo).
2. **Procesamiento de Planes de Desarrollo en PDF**: Extrae automáticamente metas e inversiones no cumplidas de los municipios para utilizarlas como insumo en discursos de plaza pública.

---

## 6. ARQUITECTURA DE MODELOS DE LENGUAJE (LLMS) Y MOTORES DE IA

Proteus utiliza una arquitectura híbrida de modelos de lenguaje de última generación de Google DeepMind:

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                       ORQUESTADOR DE IA (GEMINI SDK)                           │
│                      src/services/geminiService.ts                             │
└───────────────┬───────────────────────────────┬────────────────────────────────┘
                │                               │
                ▼                               ▼
  ┌───────────────────────────┐   ┌───────────────────────────┐
  │     GEMINI 3.8 FLASH      │   │ GEMINI 3.8 PRO / 1.5 PRO  │
  │   (Ultrabaja Latencia)    │   │  (Razonamiento Dialéctico)│
  ├───────────────────────────┤   ├───────────────────────────┤
  │ • Creatividades de Pauta  │   │ • Síntesis Hegelianas     │
  │ • Scripts de Video 15s    │   │ • Redes de Poder Complejas│
  │ • Micro-copys de WhatsApp │   │ • Auditoría Forense       │
  │ • Briefs y Discursos      │   │ • Resolución Contradicciones│
  └─────────────┬─────────────┘   └─────────────┬─────────────┘
                │                               │
                └───────────────┬───────────────┘
                                │
                                ▼
  ┌───────────────────────────────────────────────────────────┐
  │                 GOOGLE SEARCH GROUNDING                   │
  │                tools: [{ googleSearch: {} }]              │
  ├───────────────────────────────────────────────────────────┤
  │ • Rastreo de Redes Sociales (X/Twitter, Facebook, IG)     │
  │ • Noticias de Última Hora en Municipios y Gobernación     │
  │ • Anclaje Factual Antialucinaciones                      │
  └─────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
  ┌───────────────────────────────────────────────────────────┐
  │                     GEMINI VISION                         │
  ├───────────────────────────────────────────────────────────┤
  │ • Análisis Multimodal de Video (Oratoria, Pausas, Dicción)│
  │ • Colorimetría, Iluminación y Semiótica Corporal          │
  └───────────────────────────────────────────────────────────┘
```

### 6.1. Google Gemini 3.8 Flash (`gemini-3.8-flash`)
- **Rol**: Motor de inferencia rápida y alta disponibilidad.
- **Latencia**: Tiempos de respuesta inferiores a **1.2 segundos**.
- **Tareas Asignadas**:
  - Generación de los 3 formatos publicitarios adaptados a la cohorte seleccionada (`adTargetingOptimizerService.ts`).
  - Creación de briefs de campaña estructurados en 7 puntos (`CampaignContentDirectorView.tsx`).
  - Generación de perfiles psicográficos instantáneos de votantes (`VoterSegmentationEngine.tsx`).
  - Extracción y síntesis de contextos territoriales municipales (`municipalRepositoryService.ts`).

### 6.2. Google Gemini 3.8 Pro / 1.5 Pro
- **Rol**: Motor de razonamiento dialéctico profundo y resolución de problemas de alta complejidad epistémica.
- **Tareas Asignadas**:
  - Construcción de las síntesis dialécticas de las Casas Políticas (Tesis vs. Antítesis $\implies$ Síntesis).
  - Interpretación cualitativa de anomalías estadísticas detectadas por la Ley de Benford.
  - Generación de estrategias de campaña ante escenarios electorales adversos o fragmentados.

### 6.3. Google Search Grounding (`tools: [{ googleSearch: {} }]`)
- **Rol**: Sensor en vivo con la web mundial.
- **Tareas Asignadas**:
  - Rastreo en tiempo real de redes sociales de actores políticos (declaraciones polémicas en X, publicaciones de campaña).
  - Consulta de noticias municipales de última hora (obras paralizadas, problemas de orden público) para garantizar que los discursos y piezas de pauta citen hechos verificables del día.

### 6.4. Google Gemini Vision (Multimodal)
- **Rol**: Analista de imagen, video y semiótica política (`CandidateMultimediaStudioView.tsx`).
- **Tareas Asignadas**:
  - Auditoría de oratoria del candidato a partir de archivos de video: detección de ritmo, muletillas, pausas estratégicas y modulación vocal.
  - Evaluación de lenguaje corporal: postura en atril, contacto visual con el lente, gesticulación con manos de poder.
  - Fotometría y colorimetría: análisis del tono de piel del candidato y recomendación de paleta de colores para debates televisivos vs. recorridos barriales.

### 6.5. Inyección Contextual y Blindaje Anti-Alucinaciones
Todos los prompts de Proteus se someten a un pipeline de pre-procesamiento que inyecta:
1. **La identidad del candidato**: `Isaac Mendoza` (partido, tono narrativo, ejes programáticos).
2. **El contexto del territorio activo**: Población DANE, NBI, alcalde actual, casa política dominante y datos de monitoreo de Gobernación.
3. **Instrucción de Sistema Inviolable**: Prohibición de redactar frases cliché o datos inventados, exigiendo referencias a la realidad territorial concreta.

---

## 7. LA UNIDAD DE AUTOMEJORA Y GOBERNANZA DIALÉCTICA (7 AGENTES)

Proteus no es un software estático: cuenta con una **Unidad Autónoma de Automejora** gobernada por 7 agentes colegiados que auditan y evolucionan el sistema bajo el método dialéctico:

### 7.1. Los 7 Agentes de la Unidad de Automejora
1. `AGENT-ORCHESTRATOR` (Agente Orquestador): Dirección general, priorización estratégica de desarrollo y formulación de Órdenes de Investigación (ODI).
2. `AGENT-ACADEMIC-RES` (Investigador Académico): Fundamentación en ciencia política, neuromarketing, economía del comportamiento y psicología cognitiva (Kahneman, Tversky, Duverger).
3. `AGENT-DATA-RES` (Investigador de Datos): Minería de datos, modelado demográfico DANE, análisis de series temporales de la Registraduría y algoritmos de pauta.
4. `AGENT-LEX-ARTIS` (Investigador de Lex Artis): Benchmarking con plataformas líderes mundiales (TargetSmart, NGP VAN, Meta Ads Library, Cambridge AdTech).
5. `AGENT-AUDITOR` (Auditor Imparcial): Guardián epistemológico, control teleológico anti-desvío burocrático y detección de falacias en el diseño de software.
6. `AGENT-SOFTWARE-ENG` (Analista de Software): Diseño de arquitectura en React 19, TypeScript, servicios desacoplados y verificación estricta de imports.
7. `AGENT-ORGANIZER` (Agente Organizador): Documentación de actas, custodia de protocolos en markdown y sincronización del repositorio.

### 7.2. Registro Histórico de Sesiones Críticas (001 a 008)
- **Sesión 001**: Simulador Electoral Bayesiano, D'Hondt y Umbral Electoral (PA-001).
- **Sesión 002**: Verificación de Inclusión de los 4 Aplicativos Originales (PA-006).
- **Sesión 003**: Plan de Integración de Componentes No Incluidos (PA-007).
- **Sesión 004**: Evaluación de Arquitectura y Correspondencia con el Propósito (PA-008).
- **Sesión 005**: Mapeo Relacional de Casas Políticas y Grafos 2D/3D (PA-009).
- **Sesión 006**: Auditoría Forense Electoral, Ley de Benford de 2do Dígito y Escrutinios E-14 vs E-24 (PA-002/005).
- **Sesión 007**: Reorientación Teleológica hacia la Maximización de la Eficacia Publicitaria mediante Segmentación (PA-010).
- **Sesión 008**: Arquitectura Holística: Articulación de la Inteligencia Territorial (Casas Políticas, Monitoreo, Mapas de Calor) con el Retorno Publicidad/Votos (PA-011).

### 7.3. Catálogo de Protocolos de Automejora (PA-001 a PA-011)
- `PA-001`: Simulador Electoral Bayesiano y Cifra Repartidora.
- `PA-002`: Extracción y Análisis Forense de Microdatos E-14/E-24.
- `PA-003`: Microtargeting Psicográfico y Territorial.
- `PA-004`: Optimización de Arquitectura GIS y Renderizado WebGL.
- `PA-005`: Auditoría Interna de Razonamiento, Validación y Métricas $\chi^2$.
- `PA-006`: Protocolo de Verificación de Inclusión de Aplicativos Originales.
- `PA-007`: Protocolo de Integración de Elementos No Incluidos.
- `PA-008`: Protocolo de Evaluación Arquitectónica y Cumplimiento del Propósito.
- `PA-009`: Mapeo Relacional de Casas Políticas y Observatorio en Grafos 2D/3D.
- `PA-010`: Motor de Optimización de Publicidad Electoral Segmentada y Persuasión Creativa.
- `PA-011`: Sistema Holístico de Inteligencia Estratégica y Maximización de la Relación Publicidad/Votos.

---

## 8. INFRAESTRUCTURA DE SOFTWARE, DESPLIEGUE Y PERSISTENCIA

### 8.1. Pila Tecnológica (Tech Stack)
- **Frontend Core**: React 19, TypeScript 5.8, Vite 6.
- **Estilo y Diseño**: Tailwind CSS v4, Lucide React Icons, estética Glassmorphism Frost.
- **Cartografía & Visualización Espacial**: Leaflet GIS, React-Leaflet, D3.js, Three.js (Dioramas 3D y Grafos de Fuerzas).
- **Inteligencia Artificial**: Google Gen AI SDK (`@google/genai`) con modelos Gemini 3.8 Flash, Gemini 3.8 Pro y Google Search Grounding.
- **Generación de Documentos**: `jspdf` para exportación ejecutiva de discursos y briefs.
- **Persistencia**: LocalStorage en navegador para perfiles de candidatos y conector de respaldo en Google Drive (`googleDriveService.ts`).

### 8.2. Aseguramiento de Calidad y Verificación Continua
- **Prueba de Cero Errores de Importación**: Script automatizado en Python (`scripts/verify_imports.py`) que valida las rutas relativas de todos los archivos en `src/`.
- **Sincronización Automatizada**: Script `scripts/sync_github_and_zip.py` que mantiene sincronizado el directorio `SUBIR_A_GITHUB` y genera el paquete de despliegue para Google AI Studio.

### 8.3. Estado Actual de Despliegue en Producción
- **Repositorio Remoto Oficial**: GitHub [`isaacmendoza265-cmd/proteus-1.45`](https://github.com/isaacmendoza265-cmd/proteus-1.45.git) en la rama `main`.
- **Último Commit de Despliegue**: `347d28e` (*"feat: Arquitectura holistica de inteligencia estrategica y conversion publicitaria (PA-011 y Sesion Critica 008)"*).
- **Paquete Listo para Google AI Studio**: `PROTEUS_ACTUALIZADO_AI_STUDIO.zip` (2.97 MB).

---

*Informe maestro redactado para la Dirección Estratégica de Proyecto Proteus. Isaac Mendoza — Septiembre de 2026.*
