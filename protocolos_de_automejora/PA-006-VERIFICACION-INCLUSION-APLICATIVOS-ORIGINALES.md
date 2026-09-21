# PROTOCOLO DE AUTOMEJORA PA-006
## AUDITORÍA FORENSE E INVENTARIO COMPARATIVO DE APLICATIVOS ORIGINALES
**Unidad Autónoma Responsable**: Unidad de Auditoría e Inventario Forense (UAIF - 7 Agentes)  
**Fecha de Protocolización**: 2026-09-20  
**Estado**: [APROBADO POR EL CUERPO COLEGIADO Y EJECUTADO]  
**Norma Matriz**: [`PROTOCOLO_CRITICO.md`](PROTOCOLO_CRITICO.md)

---

## 1. COMPOSICIÓN Y ROLES DE LA UNIDAD AUTÓNOMA (UAIF)

| Agente | Identificador | Rol y Mandato en la Auditoría Forense |
| :--- | :--- | :--- |
| **1. Orquestador Forense** | `UAIF-ORCHESTRATOR` | Define el alcance del inventario forense, coordina el cruce de matrices y arbitra la calificación de cumplimiento de cada aplicativo original. |
| **2. Investigador de Fuentes** | `UAIF-SOURCE-ANALYST` | Reconstruye la especificación original de los 4 aplicativos fuente (Proteus Base, Observatorio Antioquia, Observatorio de Comunas, E-24 Histórico). |
| **3. Organizador Custodio** | `UAIF-ORGANIZER` | Estructura la Matriz de Brechas (Gap Matrix), cataloga las omisiones y custodia las actas en el repositorio. |
| **4. Auditor Imparcial** | `UAIF-IMPARTIAL-JUDGE` | Aplica criterio estricto sin complacencia para calificar como *OMITIDO*, *SINTETIZADO EN EXCESO* o *INCLUIDO AL 100%*. |
| **5. Investigador de Datos** | `UAIF-DATA-MINER` | Rastrea la integridad de los datasets (mesas E-24, 15 dimensiones IPM, pirámides DANE 2018-2030, censo 125 municipios). |
| **6. Analista de Software** | `UAIF-SOFTWARE-AUDITOR` | Inspecciona el árbol de código fuente en `src/`, mide líneas activas, componentes montados y endpoints huérfanos. |
| **7. Estratega Electoral** | `UAIF-STRATEGIST` | Evalúa el costo electoral de las omisiones (pérdida de capacidad persuasiva, falta de microtargeting o ceguera ante históricos). |

---

## 2. LOS 5 PILARES DEL PROTOCOLO PA-006

### PILAR 1: QUÉ AUDITAR
Ejecución de un inventario forense exhaustivo que compare cada funcionalidad, pantalla, dataset, gráfica y modelo analítico de los **4 aplicativos originales** que debían consolidarse en Proteus 1.2:
1. **Aplicativo 1: Proteus Base 2026** (Campaña Presidencial y Senado, Censo Nacional 39.2M, Simulador Electoral, 32 Departamentos, Personalización de Candidato).
2. **Aplicativo 2: Observatorio Antioquia (Command Center)** (125 Municipios, 9 Subregiones, 28 Casas Políticas, Escrutinio Gobernación E-26, Dioramas 3D, 7 Ejes de Gobierno).
3. **Aplicativo 3: Observatorio de Comunas de Medellín** (16 Comunas + 5 Corregimientos, Pirámides Poblacionales dinámicas DANE 2018-2030, IPM Multidimensional con 15 variables, Gobernanza Criminal y Extorsión CIEF/EAFIT).
4. **Aplicativo 4: Histórico E-24 Registraduría** (Votaciones históricas 2015, 2019, 2023 desagregadas por comuna y puesto para Alcaldía, Concejo Cifra Repartidora, Congreso -Senado y Cámara- y Presidencia).

### PILAR 2: POR QUÉ AUDITARLO
- **Riesgo de Ceguera Estratégica**: La síntesis excesiva de datos empobrece la toma de decisiones. Si un candidato a Cámara o Senado no puede ver la votación histórica de Congreso por comuna, no puede planificar su meta de mesas ni contrastar su desempeño con elecciones legislativas previas.
- **Pérdida de la Ventaja Hiperlocal**: Omitir las pirámides dinámicas DANE priva a la campaña de identificar transiciones demográficas críticas (ej. envejecimiento acelerado en Comuna 11 - Laureles vs. bono juvenil en Comuna 1 - Popular).
- **Mandato de Integridad**: La promesa arquitectónica de Proteus 1.2 fue consolidar 4 aplicativos en 1 sin perder profundidad analítica.

### PILAR 3: CÓMO AUDITARLO (SUBPROTOCOLO DE INSPECCIÓN EN 4 FASES)
- **Fase 1: Mapeo de Código Fuente**: Inspección estricta de `src/modules/`, `src/components/` y `src/data/` contabilizando componentes activos, tipos exportados y servicios instanciados.
- **Fase 2: Cruce de Datasets**: Verificación de registros cargados en memoria vs. datasets maestros originales (archivos en `src/data/observatorioComunas/`, `src/data/observatorioAntioquia/`, `src/data/geojson/`).
- **Fase 3: Evaluación de la Experiencia de Usuario**: Validación funcional de la navegación entre vistas y apertura de paneles de analítica profunda.
- **Fase 4: Emisión de la Matriz de Cumplimiento**: Catalogación en semáforo de cada función:
  - 🟢 **INCLUIDO AL 100%**: Presente, funcional y conectado.
  - 🟡 **PARCIAL / SOBRE-SINTETIZADO**: Presente pero con agregación excesiva o sin interactividad completa.
  - 🔴 **OMITIDO / NO INTEGRADO**: Existía en el aplicativo original pero no se incorporó en el código fuente.

### PILAR 4: RECURSOS NECESARIOS
- Scripts de inspección AST y grep sobre `src/`.
- Acceso a la documentación histórica del proyecto (`INFORME_TECNICO_FUNCIONES_Y_UBICACION_PROTEUS.md`, `README.md`, `scripts/generar_presentacion_maestra.py`).
- 4 horas de deliberación colegiada de la unidad UAIF.

### PILAR 5: ALTERNATIVAS Y RIESGOS DE NO ACTUAR
- *Alternativa de Descarte*: Mantener la síntesis actual para no aumentar el peso del bundle. **Rechazada categóricamente por la UAIF**: vulnera el valor central de Proteus como plataforma de inteligencia de precisión.
- *Riesgo de Inacción*: La campaña opera con suposiciones genéricas en lugar de microdatos verídicos, perdiendo elecciones en comunas decisivas por falta de granularidad.
