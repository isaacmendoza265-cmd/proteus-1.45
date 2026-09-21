# 🏛️ PROYECTO PROTEUS 1.2 — CENTRO ESTRATÉGICO ELECTORAL & MULTI-AGENTE IA

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.8_Flash-8e75ff?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Plataforma de inteligencia geoespacial, análisis político y generación de contenido estratégico diseñada para campañas electorales y salas de gobierno. Integra cartografía en 5 escalas jerárquicas, un repositorio municipal universal, modelado psicográfico de votantes, un estudio de semiótica visual/video y una cuadrilla de 5 agentes autónomos potenciados por **Google Gemini**.

---

## 🎯 Triple Propósito del Sistema

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                     TRIPLE PROPÓSITO DE PROTEUS 1.2                                    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                        │
│  1. REPOSITORIO MUNICIPAL UNIVERSAL                                                                    │
│  • Microdatos consolidados de los 125 municipios de Antioquia y el Área Metropolitana:                 │
│    Censo DANE, potencial electoral, NBI/pobreza, alcaldes electos, bancadas de concejo y orden público. │
│  • Generador de Contexto para Gemini: Inyección transparente de datos duros locales en cada búsqueda    │
│    web con Google Search Grounding para eliminar alucinaciones.                                        │
│  • Pipeline extensible y abierto para que desarrolladores ingesten nuevos municipios en JSON.          │
│                                                                                                        │
│  2. ANALISTA Y RECOPILADOR EN TIEMPO REAL                                                              │
│  • Cruce multidimensional de variables: Grupos de edad (18-28, 29-59, 60+), estratos socioeconómicos    │
│    (Bajo, Medio, Alto) y comportamiento electoral histórico.                                          │
│  • Modelado de Arquetipos de Votantes (Jóvenes Digitales, Madres Populares, Comerciantes, Campesinos)   │
│    con canales óptimos de llegada, narrativa recomendada y desactivación de objeciones.                │
│  • Detección del "Votante Bisagra" y psicología electoral con IA.                                      │
│                                                                                                        │
│  3. DIRECTOR DE CREACIÓN DE CONTENIDO                                                                  │
│  • Generación automatizada de Briefs de Campaña hiperlocales que combinan las cifras reales del         │
│    municipio con el perfil programático del candidato activo.                                          │
│  • Formatos: Discursos de plaza pública, guiones de video corto (TikTok/Reels con ganchos de 3 seg),   │
│    mensajes para WhatsApp comunitario y respuestas a ataques en debates.                               │
│  • Exportación instantánea a PDF institucional y respaldo directo en Google Drive.                     │
│                                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 Arquitectura de Zoom Territorial Continuo (5 Escalas GeoJSON)

Navegación espacial interactiva basada en Leaflet con capas coropléticas temáticas (Electoral, Demográfico, NBI/Pobreza y Semáforo de Riesgo):

1. **Nivel 1: Nacional** — Colombia (32 Departamentos + Bogotá D.C., Censo de 39.2M+ votantes).
2. **Nivel 2: Departamental** — Antioquia (9 Subregiones y 125 Municipios oficiales con código DANE DIVIPOLA).
3. **Nivel 3: Metropolitano** — Valle de Aburrá (Conurbación de 10 municipios: Medellín, Bello, Itagüí, Envigado, Caldas, Copacabana, Girardota, Sabaneta, Barbosa, La Estrella).
4. **Nivel 4: Municipal** — Medellín (16 Comunas Urbanas y 5 Corregimientos Rurales: Palmitas, San Cristóbal, Altavista, San Antonio de Prado y Santa Elena).
5. **Nivel 5: Hiperlocal / Barrial** — Comunas y Barrios del Valle de Aburrá (Microdatos electorales E-24 históricos 2015-2023, IPM multidimensional, criminalidad CIEF EAFIT y proyecciones DANE).

---

## 🤖 Cuadrilla de 5 Agentes IA Autónomos

| Agente | Nombre en Código | Especialidad y Misión |
| :--- | :--- | :--- |
| **Investigador Territorial** | `SENTINEL-TERRITORY` | Audita, rastrea y valida las estadísticas de los 125 municipios (DANE, Registraduría, CIEF). |
| **Analista de Inteligencia** | `STRAT-SEGMENT` | Cruza variables sociodemográficas y genera perfiles psicográficos y clusters de votantes. |
| **Director de Contenido** | `CREATIVE-DIRECTOR` | Redacta briefs estratégicos, discursos de tarima y ganchos de redes con anclaje territorial. |
| **Analista Multimedia** | `MEDIA-VISION` | Audita videos (dicción, pausas, muletillas, encuadre) y fotografías (colorimetría y vestuario). |
| **Sintetizador Search & Drive** | `SYNC-NEXUS` | Inyecta contexto local a Google Search y coordina la persistencia en Google Drive. |

---

## 🧮 Simulador Electoral D'Hondt & Curul Marginal (Protocolo PA-001)

Motor determinista en memoria (<2 ms, 60 FPS) para la proyección matemática de curules en tiempo real:
* **Fórmula Constitucional (Art. 263 C.P.)**: Divisores sucesivos D'Hondt para Cámara de Antioquia (17 curules) y Senado Nacional (100 curules).
* **Umbral Legal Electoral**: Cálculo del 3% de los votos válidos para determinar qué listas acceden al reparto de curules.
* **Inteligencia Táctica de la Curul Marginal**: Detecta con exactitud qué partido retiene el último escaño disputado y cuántos votos adicionales exactos necesita el perseguidor más cercano para arrebatárselo o blindarlo.
* **Matriz de Asignación Subregional**: Distribución territorial automática del déficit de votos (Valle de Aburrá 48%, Oriente 24%, Urabá 15%, Norte/Occidente 8%, Suroeste 5%).
* **Generador de Planes Tácticos con IA**: Motor `gemini-3.8-flash` que formula planes de choque con micro-metas de votación, argumentos por subregión y cronograma para los últimos 21 días y Día D.

---

## 🧠 Persuasión Cognitiva & Framing Prospectivo (Protocolo PA-003)

Integración de la Teoría de las Perspectivas (*Kahneman & Tversky*) en el Director de Contenido:
* **Enfoque de Ganancia & Esperanza**: Centrado en oportunidades, optimismo, progreso y futuro.
* **Enfoque de Pérdida & Blindaje**: Centrado en la aversión a la pérdida, protección familiar, defensa frente al riesgo y freno a la improvisación.
* **Enfoque de Equilibrio Prospectivo**: Contraste frontal entre el riesgo de la inacción y la certeza de victoria con la propuesta de campaña.

---

## 🛡️ Unidad de Automejora de 7 Agentes & Protocolo Crítico (PC-001)

Arquitectura multi-agente epistemológica orientada a la evolución continua y auditoría interna del aplicativo:
1. **Orquestador Metodológico (`AGENT-ORCHESTRATOR`)**: Dirección estratégica, formulación de órdenes de investigación (ODI) y cálculo del índice de prioridad.
2. **Investigador Académico (`AGENT-ACADEMIC-RES`)**: Revisión de literatura científica, teoremas de votación (Duverger, D'Hondt, Palfrey-Rosenthal) y evidencia empírica.
3. **Organizador de Protocolos (`AGENT-ORGANIZER`)**: Estructuración del repositorio interno `protocolos_de_automejora/`.
4. **Auditor Imparcial (`AGENT-AUDITOR`)**: Verificador de razonamientos, detector de falacias lógicas (falacia de sobre-ingeniería) y garante de rigor empírico.
5. **Investigador de Datos Empíricos (`AGENT-DATA-RES`)**: Validación de cifras oficiales de la Registraduría y DANE.
6. **Analista de Software (`AGENT-SOFTWARE`)**: Modelado técnico, optimización de algoritmos en cliente y viabilidad en React 19 / TypeScript.
7. **Investigador de Lex Artis (`AGENT-LEX-ARTIS`)**: Benchmarking internacional contra plataformas electorales globales (Cook Political Report, LSE).

---

## 📸 Estudio Multimedia & Semiótica Política

* **Analista de Video**: Diagnóstico escénico y de oratoria (claridad, cadencia, pausas de poder, muletillas verbales, ritmo de cortes y microfonía).
* **Analista de Imagen & Colorimetría**: Identificación de fototipo de piel, estación cromática (Invierno/Otoño/Primavera/Verano), paleta Hex de poder y cercanía, colores a evitar y esquema de iluminación de 3 puntos.
* **Hoja de Ruta Semiótica (4 Semanas)**: Plan de entrenamiento semanal en voz, postura, vestuario y técnica de puente en debates.

---

## 💾 Integración con Google Drive

* Enlace con una **única cuenta de Google Drive** para respaldar:
  * `/Analisis_Territoriales/`
  * `/Briefs_Contenido/`
  * `/Segmentacion_Votantes/`
  * `/Multimedia_Evaluaciones/`
* Modal de sincronización con telemetría en tiempo real y enlaces directos a los archivos respaldados.

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
* Node.js v18 o superior
* npm, pnpm o bun

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/proyecto-proteus.git
cd proyecto-proteus
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz (puedes basarte en `.env.example`):
```env
GEMINI_API_KEY=tu_api_key_de_google_gemini
PORT=3000
```
> *Nota: Puedes obtener tu clave gratuita de Gemini en [Google AI Studio](https://aistudio.google.com/).*

### 4. Iniciar en modo desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000` (o el puerto asignado).

### 5. Compilar para producción
```bash
npm run build
npm start
```

---

## 📁 Estructura del Proyecto

```
proyecto-proteus/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Integración continua (Typecheck y validación)
├── public/
│   └── data/
│       ├── colombia_municipios_dane.geojson
│       └── municipios_colombia_original.geojson
├── scripts/
│   ├── verify_imports.py          # Verificador de resolución de módulos
│   └── verify_geojson_integrity.py# Verificador de integridad cartográfica
├── src/
│   ├── components/
│   │   ├── drive/                 # Modal y conector Google Drive
│   │   ├── layout/                # AppShell, SidebarNav, TopStatusBar
│   │   ├── maps/                  # MultiLevelZoomMap, CommuneDeepAnalyticsDrawer, E24Viewer
│   │   ├── CandidateProfileManager.tsx
│   │   └── CandidateVideoAnalyzer.tsx
│   ├── data/
│   │   ├── agentic/               # Definiciones del equipo de 5 agentes IA
│   │   ├── geojson/               # Cartografía oficial (Colombia, Antioquia 125, Comunas, Barrios)
│   │   ├── observatorioAntioquia/ # Datos electorales de municipios y concejos
│   │   ├── observatorioComunas/   # IPM, criminalidad y población DANE
│   │   └── metropolitanAndMedellinData.ts
│   ├── modules/
│   │   ├── agents/                # Consola del equipo multi-agente
│   │   ├── analytics/             # Motor de segmentación y arquetipos
│   │   ├── content/               # Director de briefs de campaña
│   │   ├── multimedia/            # Estudio de video y colorimetría
│   │   ├── repository/            # Explorador del Repositorio Municipal
│   │   └── territorial/           # Hub de Zoom Continuo (5 Escalas)
│   ├── services/
│   │   ├── geminiService.ts       # Cliente Google GenAI con Google Search
│   │   ├── googleDriveService.ts  # Servicio de persistencia en Drive
│   │   └── municipalRepositoryService.ts # API del Repositorio Municipal
│   ├── App.tsx                    # Orquestador raíz de vistas
│   └── main.tsx                   # Punto de entrada React 19
├── .env.example
├── .gitignore
├── LICENSE                        # Licencia MIT
├── package.json
├── server.ts                      # Servidor Express/Vite full-stack
├── tsconfig.json
└── vite.config.ts
```

---

## 📤 Cómo Subir esta Carpeta a tu Repositorio en GitHub

Si descargaste esta carpeta y deseas publicarla en un nuevo repositorio de GitHub:

1. Abre tu terminal en la carpeta `SUBIR_A_GITHUB` (o en la carpeta que contiene estos archivos):
   ```bash
   git init
   git add .
   git commit -m "feat: Lanzamiento Proyecto Proteus 1.2 - Centro Estratégico y Multi-Agente"
   ```
2. Crea un nuevo repositorio en [GitHub](https://github.com/new) (vacío, sin README ni .gitignore).
3. Vincula el remoto y sube tus cambios:
   ```bash
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/proyecto-proteus.git
   git push -u origin main
   ```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
