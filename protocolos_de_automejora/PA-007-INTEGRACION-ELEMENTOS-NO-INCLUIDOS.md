# PROTOCOLO DE AUTOMEJORA PA-007
## INGENIERÍA E INTEGRACIÓN DE ELEMENTOS NO INCLUIDOS
**Unidad Autónoma Responsable**: Unidad de Ingeniería e Integración Progresiva (UIIP - 7 Agentes)  
**Fecha de Protocolización**: 2026-09-20  
**Estado**: [APROBADO POR EL CUERPO COLEGIADO Y EJECUTADO]  
**Norma Matriz**: [`PROTOCOLO_CRITICO.md`](PROTOCOLO_CRITICO.md)

---

## 1. COMPOSICIÓN Y ROLES DE LA UNIDAD AUTÓNOMA (UIIP)

| Agente | Identificador | Rol y Mandato en la Integración Técnica |
| :--- | :--- | :--- |
| **1. Orquestador de Integración** | `UIIP-ORCHESTRATOR` | Establece el cronograma, la prioridad de componentes y la secuencia de despliegue sin romper la estabilidad del sistema. |
| **2. Ingeniero de Software** | `UIIP-SOFTWARE-ARCHITECT` | Diseña interfaces TypeScript estrictas, componentes modulares en React 19 y optimizaciones de renderizado. |
| **3. Ingeniero de Datos** | `UIIP-DATA-ENGINEER` | Estructura las matrices de datos para Congreso (Senado y Cámara) y Presidencia por comuna, y las proyecciones DANE 2018-2030. |
| **4. Especialista UI/UX** | `UIIP-UIUX-DESIGNER` | Implementa los controles interactivos bajo el sistema de diseño Glassmorphism Frost / Modern Aero. |
| **5. Auditor de Cero Regresiones** | `UIIP-IMPARTIAL-AUDITOR` | Verifica que el código añadido compile con 0 errores TypeScript, 0 rutas rotas y mantenga 60 FPS en navegación. |
| **6. Garante de Personalización** | `UIIP-PERSONALIZATION-OFFICER` | Asegura que los nuevos datos alimenten el perfil del candidato activo y el Director de Contenido. |
| **7. Organizador del Pipeline** | `UIIP-ORGANIZER` | Documenta los subprotocolos paso a paso en los 5 pilares reglamentarios. |

---

## 2. LOS 5 PILARES DEL PROTOCOLO PA-007

### PILAR 1: QUÉ CAMBIAR
Integrar formalmente en Proteus 1.2 los tres subsistemas críticos detectados como omitidos o sub-representados en la auditoría PA-006:
1. **Módulo de Votaciones Históricas de Congreso y Presidencia por Comuna**:
   - Incorporar en el visor histórico (`E24HistoricalViewer.tsx` o extensión dedicada) la selección de elecciones a **Senado**, **Cámara de Representantes (Antioquia)** y **Presidencia de la República (2018 y 2022)** para cada una de las 16 comunas y 5 corregimientos de Medellín.
2. **Módulo de Pirámides Demográficas Dinámicas Multianuales DANE (2018-2030)**:
   - Integrar un componente gráfico interactivo con barra deslizadora (slider temporal) y animación automática para visualizar la evolución por cohortes quinquenales (0 a 80+ años) y grandes etapas de vida para hombres y mujeres en cada territorio.
3. **Enriquecimiento del Repositorio Municipal Universal**:
   - Vincular al repositorio municipal los indicadores de esfuerzo fiscal, transferencias SGP, regalías y peso del censo rural vs. urbano para los 125 municipios.

### PILAR 2: POR QUÉ CAMBIARLO
- **Alineación con la Campaña Legislativa y Presidencial**: Los candidatos a Senado y Cámara basan su estrategia de "Día D" y testigos electorales en los históricos de elecciones legislativas, no solo locales. Saber cómo votó Laureles, Belén o Manrique en el Senado de 2022 es el insumo primordial para saber dónde concentrar la pauta y los recorridos.
- **Microtargeting Etario Preciso**: Las pirámides dinámicas revelan si un barrio se está envejeciendo o si hay una masa crítica de jóvenes de 18 a 25 años que votarán por primera vez, permitiendo calibrar la oferta del candidato (empleo juvenil vs. subsidios de cuidado y salud).

### PILAR 3: CÓMO CAMBIARLO (SUBPROTOCOLO TÉCNICO DE EJECUCIÓN)
- **Subprotocolo 1: Estructura de Datos Electorales Multicomuna**:
  - Crear o extender el archivo de datos electorales con el esquema:
    ```typescript
    export interface ComunaElectoralRecord {
      comunaId: string;
      comunaName: string;
      elecciones: {
        alcaldia: HistoricalElectionData[];
        concejo: HistoricalElectionData[];
        senado: HistoricalElectionData[];
        camara: HistoricalElectionData[];
        presidencia: HistoricalElectionData[];
      };
    }
    ```
- **Subprotocolo 2: Componente de Pirámide Dinámica Interactivo**:
  - Montar en el drawer analítico (`CommuneDeepAnalyticsDrawer.tsx`) la pestaña demográfica enriquecida consumiendo `POPULATION_DATA` de `src/data/observatorioComunas/populationData.ts`.
  - Proveer controles de: (1) Selector de Año 2018-2030; (2) Botón de Reproducción Automática (*Play/Pause*); (3) Conmutador entre cohortes quinquenales y grandes etapas; (4) Indicadores automáticos: Edad Mediana, Tasa de Envejecimiento, Bono Demográfico y Relación de Dependencia.
- **Subprotocolo 3: Cableado con el Motor de Contexto Activo**:
  - Conectar estas nuevas dimensiones con `activeTerritoryContextService.ts` para que al seleccionar una comuna, el Director de Contenido pueda citar: *"En la Comuna 13 el 35% de los votantes son jóvenes según la pirámide DANE y en el Congreso de 2022 las fuerzas alternativas obtuvieron X votos"*.

### PILAR 4: RECURSOS NECESARIOS
- Librerías: `recharts`, `lucide-react`, `motion`.
- Datasets maestros existentes en `src/data/observatorioComunas/`.
- 6 horas de implementación y pruebas automatizadas con `verify_imports.py`.

### PILAR 5: ALTERNATIVAS AL CAMBIO Y RIESGOS
- *Alternativa de Enlaces Externos*: Dejar que el usuario abra enlaces a la Registraduría o al portal DANE. **Rechazada**: rompe el flujo de trabajo de la campaña y dispersa la atención del equipo estratégico.
- *Riesgo de Inacción*: La plataforma se queda corta frente a consultores profesionales que exigen microdatos consolidados en un solo clic.
