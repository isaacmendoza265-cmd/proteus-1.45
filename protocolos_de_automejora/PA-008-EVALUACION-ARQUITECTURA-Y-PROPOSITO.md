# PROTOCOLO DE AUTOMEJORA PA-008
## EVALUACIÓN ARQUITECTÓNICA Y CORRESPONDENCIA TELEOLÓGICA CON EL PROPÓSITO DE PERSONALIZACIÓN
**Unidad Autónoma Responsable**: Unidad de Evaluación Arquitectónica y Teleológica (UEAT - 7 Agentes)  
**Fecha de Protocolización**: 2026-09-20  
**Estado**: [APROBADO POR EL CUERPO COLEGIADO Y EJECUTADO]  
**Norma Matriz**: [`PROTOCOLO_CRITICO.md`](PROTOCOLO_CRITICO.md)

---

## 1. COMPOSICIÓN Y ROLES DE LA UNIDAD AUTÓNOMA (UEAT)

| Agente | Identificador | Rol y Mandato en la Evaluación Arquitectónica |
| :--- | :--- | :--- |
| **1. Arquitecto Jefe** | `UEAT-CHIEF-ARCHITECT` | Evalúa el acoplamiento de componentes, el flujo unidireccional de datos y la coherencia estructural de la aplicación. |
| **2. Guardián de Personalización** | `UEAT-PERSONALIZATION-OFFICER` | Fiscaliza si el candidato activo es el eje gravitacional del sistema o si la personalización es un módulo decorativo aislado. |
| **3. Científico Cognitivo** | `UEAT-COGNITIVE-SCIENTIST` | Evalúa la resonancia psicográfica, el framing prospectivo (PA-003) y la semiótica de la interfaz. |
| **4. Inquisidor Imparcial** | `UEAT-INQUISITOR` | Identifica falacias arquitectónicas (*wishful thinking*, sobre-ingeniería desvinculada del usuario, desvío de propósito). |
| **5. Ingeniero de Rendimiento** | `UEAT-PERFORMANCE-ENG` | Evalúa el impacto de la arquitectura en tiempo de carga, tamaño del bundle y fluidez de renderizado. |
| **6. Comandante de Campaña** | `UEAT-CAMPAIGN-DIRECTOR` | Valida la experiencia del usuario desde los ojos del candidato y su jefe de debate en el día a día. |
| **7. Organizador del Blueprint** | `UEAT-ORGANIZER` | Redacta el dictamen de correspondencia teleológica y las directrices de refactorización. |

---

## 2. LOS 5 PILARES DEL PROTOCOLO PA-008

### PILAR 1: QUÉ EVALUAR
Evaluar la arquitectura de software de Proyecto Proteus 1.2 frente a su **propósito supremo (la personalización del candidato)**:
1. **La Puerta de Entrada (Entry Point)**: ¿Qué ve el usuario en los primeros 5 segundos al abrir la aplicación? ¿Se le presenta un mapa geográfico abstracto o se le posiciona en el **Centro Estratégico de Personalización** de su candidatura?
2. **Propagación Transversal del Estado del Candidato**: ¿El perfil activo (Isaac Mendoza u otro: ideología, fototipo, colorimetría, tono narrativo y ejes de propuesta) condiciona de verdad los generadores de discursos, la segmentación y el análisis territorial, o estos operan de forma genérica?
3. **Ergonomía y Estética Institucional**: ¿La interfaz de bienvenida cumple con el estándar original de Proteus 1.2 (Glassmorphism Frost, orbes luminosos, especularidad interior y claridad operativa)?

### PILAR 2: POR QUÉ EVALUARLO
- **Vicio de Desvío Teleológico**: Un software electoral que priorice los mapas por encima del candidato pierde su esencia. La cartografía GIS y los datos demográficos son meros instrumentos; el fin último de Proteus es dotar al **candidato de una ventaja competitiva hiperpersonalizada** para ganar elecciones.
- **Principio de Identidad Inmediata**: El usuario de campaña no entra al software a "ver un mapa de Colombia", entra a **preparar su campaña, diseñar sus discursos, alinear sus colores y medir su fuerza electoral**.

### PILAR 3: CÓMO EVALUARLO (SUBPROTOCOLO DE AUDITORÍA ARQUITECTÓNICA)
- **Fase 1: Mapeo de la Ruta Crítica de Usuario**: Inspección del punto de montaje en `src/App.tsx`. Detección del valor inicial de `currentView`.
- **Fase 2: Trazabilidad del Objeto `CandidateProfile`**: Verificación de props pasadas a `AppShell`, `CandidateProfilesView`, `CampaignContentDirectorView`, `VoterSegmentationEngine` y `CandidateMultimediaStudioView`.
- **Fase 3: Diagnóstico de la Experiencia de Entrada**: Comparación visual entre la maqueta original de Proteus 1.2 (`vista_previa_proteus.html`) y la pantalla de inicio actual.
- **Fase 4: Dictamen de Correspondencia Teleológica**: Calificación de 1 a 10 de la coherencia entre arquitectura y propósito.

### PILAR 4: RECURSOS NECESARIOS
- Transcripción del diseño original de Proteus 1.2.
- Inspección de `src/App.tsx` y `src/modules/national/CandidateProfilesView.tsx`.
- Sesión deliberativa de la unidad UEAT.

### PILAR 5: ALTERNATIVAS Y DECISIÓN
- *Alternativa 1*: Dejar que el usuario configure en ajustes qué vista quiere ver al inicio. **Descartada**: añade fricción innecesaria. La personalización debe ser la norma por defecto.
- *Decisión Vinculante*: Establecer la **Ventana de Perfil & Personalización** como la pantalla inicial obligatoria de Proteus 1.2, rediseñada con un Hero institucional idéntico a la estética original.
