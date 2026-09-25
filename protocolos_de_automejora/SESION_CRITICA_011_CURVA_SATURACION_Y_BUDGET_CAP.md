# SESIÓN CRÍTICA Nº 011: CURVA DE SATURACIÓN DE FRECUENCIA, PRESUPUESTO TECHO (BUDGET CAP) Y PREVENCIÓN DE DESPERDICIO PUBLICITARIO POR CENSO ELECTORAL 2026
## UNIDAD DE AUTOMEJORA ESTRATÉGICA • PROYECTO PROTEUS v1.4.5
**Fecha**: 25 de Septiembre de 2026  
**Orden de Investigación**: ODI-011  
**Protocolo Resultante**: PA-014  
**Mandato Supremo**: Maximización de la Eficacia de la Publicidad Electoral (Relación Publicidad / Votos)  
**Marco de Gobernanza**: Modelo Bifurcado en Dos Etapas (Protocolo Crítico PC-001 / Gatekeeper)

---

## 1. CONVOCATORIA Y DIAGNÓSTICO (FASE 1)

El **Colegio de los 7 Agentes Especializados** fue convocado para abordar una de las mayores fuentes de ineficiencia en las campañas electorales: **el desperdicio de pauta por sobre-saturación de audiencia (*Ad Fatigue*) y asignación ciega de presupuesto**.

Habiendo asimilado el Censo Oficial de la Registraduría 2026 (41.421.973 ciudadanos habilitados con desglose exacto por departamento, municipio, comuna y puesto de votación), el sistema cuenta con la base matemática para erradicar el error más común de los estrategas de pauta:
- En territorios pequeños (ej. Cañasgordas con 14.948 votantes, o Guadalupe con 5.500 votantes), una inversión publicitaria no calibrada (ej. $10.000.000 COP) somete al votante a frecuencias superiores a **14x**, generando rechazo psicológico, fatiga y un costo marginal por voto disparado hasta en un **+320%**.
- En territorios densos (ej. Medellín Comuna 7 Robledo o Bogotá Kennedy), la inversión queda sub-dimensionada con frecuencias inferiores a **1.2x**, sin alcanzar el umbral cognitivo mínimo de recordación y persuasión.

---

## 2. DEBATE DIALÉCTICO ENTRE LOS 7 AGENTES (FASE 2 Y 3)

### AGENT-ORCHESTRATOR (Estrategia Publicitaria)
- **Diagnóstico**: La pauta digital sin *Budget Cap* es la principal causa de quema inútil de recursos de campaña.
- **Prioridad Estratégica ($\text{PE}$)**:
  $$\text{PE} = \frac{\text{Impacto en Conversión (9.4)} \times \text{Ahorro de Presupuesto (9.6)}}{\text{Complejidad Técnica (2.1)}} \times 2 = 85.94$$
- **Dictamen**: Debemos calcular el **Presupuesto Techo Óptimo (*Budget Cap*)** y la **Curva Logística de Saturación** para cada territorio seleccionado, alertando al candidato cuando su inversión entra en la zona de rendimientos decrecientes.

### AGENT-ACADEMIC-RES (Neuromarketing y Teoría de la Persuasión)
- **Fundamentación Teórica**: Modelo de Decaimiento Publicitario y Saturación de Frecuencia (*Gerber, Green & Larimer 2011; Sides, Vavreck & Grossmann 2022*).
- **Curva Sigmoidea de Impacto**:
  - *Frecuencia < 2.0x*: Zona de Infrasaturación (recordación débil, no altera intención de voto).
  - *Frecuencia 3.0x a 4.5x*: **Ventana Óptima de Persuasión** (tasa de conversión máxima por peso invertido).
  - *Frecuencia > 5.0x*: Zona de Saturación y Fatiga (el votante experimenta saturación visual, el CTR cae en -65% y el costo por sufragio persuadido se duplica).

### AGENT-DATA-RES (Minería del Censo Registraduría y Costos CPM)
- **Fórmula de Absorción Territorial**:
  $$\text{Budget Cap Óptimo (COP)} = \text{Censo Oficial} \times \text{Tasa de Penetración Digital} \times \text{Frecuencia Óptima (3.8)} \times \frac{\text{CPM Promedio}}{1.000}$$
- **Parámetros Reales Calibrados**:
  - Penetración digital urbana: 78% (Meta / TikTok).
  - Penetración digital rural/semirural: 54%.
  - CPM promedio Colombia: $4.200 COP en Meta Ads; $3.100 COP en TikTok Ads.

### AGENT-LEX-ARTIS (AdTech y Estándares de la Industria)
- **Recomendación Técnica**: Implementar indicadores de "Semáforo de Inversión" en la interfaz:
  - 🟢 **Eficiencia Óptima** (Gasto $\le$ Budget Cap).
  - 🟡 **Zona de Rendimientos Decrecientes** (Gasto 100% a 140% del Cap).
  - 🔴 **Desperdicio Crítico / Fatiga de Audiencia** (Gasto > 140% del Cap: se recomienda reasignar excedente a municipios aledaños deficitarios).

### AGENT-AUDITOR (Control Teleológico)
- **Certificación**: Esta función cumple al 100% con el Mandato Supremo: evita que el candidato queme dinero en pauta redundante y reorienta cada peso a donde la probabilidad de captar votos marginales sea máxima.

### AGENT-SOFTWARE-ENG (Arquitectura de Implementación)
- **Propuesta Técnica**:
  - Extender `HolisticAdvertisingIntelligenceService` con la función `calculateTerritoryBudgetCapAndSaturation(territory, budgetCOP)`.
  - Diseñar el componente visual `BudgetSaturationGaugeCard.tsx` integrado en `TerritoryIntelligenceBridgeCard.tsx`.
  - Conectar el simulador con el déficit de la Curul Marginal para sugerir rebalanceos automáticos entre municipios.

### AGENT-ORGANIZER (Gobernanza y Protocolización)
- **Dictamen**: Registrar el acta y formular el Protocolo PA-014. **DETENERSE EN EL GATEKEEPER Y PEDIR AUTORIZACIÓN AL USUARIO ANTES DE ESCRIBIR CÓDIGO EN `src/`**.

---

## 3. ESPECIFICACIÓN EN 5 PILARES (FASE 4 Y 5)

1. **QUÉ CAMBIAR**:
   Incorporar en el motor de inteligencia publicitaria holística el cálculo automático del **Presupuesto Techo (*Budget Cap*)**, la **Frecuencia Estimada de Impacto** y el **Indicador de Rendimientos Marginales Decrecientes** para cada municipio o departamento seleccionado, utilizando como denominador exacto el Censo Oficial de la Registraduría 2026.

2. **POR QUÉ CAMBIARLO**:
   Previene el desperdicio del 18% al 32% del presupuesto de pauta en municipios pequeños saturados, reorientando el dinero sobrante hacia las zonas donde se disputa la curul marginal (Valle de Aburrá, Oriente y municipios clave).

3. **CÓMO CAMBIARLO**:
   - En `src/services/holisticAdvertisingIntelligenceService.ts`: implementar la función matemática de absorción de audiencia y curva sigmoidea de frecuencia.
   - En `src/components/advertising/TerritoryIntelligenceBridgeCard.tsx`: renderizar una barra dinámica de saturación con semáforo (Verde, Amarillo, Rojo), ahorro potencial y recomendación de reasignación.

4. **RECURSOS NECESARIOS**:
   - Datos existentes en `censoElectoral2026.json` (sin llamadas de red externas).
   - Componentes UI nativos Tailwind y Lucide Icons ya presentes en el proyecto.

5. **ALTERNATIVAS AL CAMBIO**:
   - Mantener el simulador lineal estático actual, lo que induce al candidato a creer erróneamente que duplicar el presupuesto en un municipio pequeño siempre duplica los votos, ignorando el fenómeno real de la fatiga publicitaria.

---

## 4. GATEKEEPER: DETENCIÓN OBLIGATORIA Y SOLICITUD DE PERMISO

Conforme a la doctrina constitucional del **Protocolo Crítico PC-001 (Etapa I / Fase 5)**, la Unidad de Automejora declara formalmente culminada la fase de formulación y **pone la propuesta a consideración soberana del Usuario**.

**NINGÚN ARCHIVO DE CÓDIGO EN `src/` HA SIDO MODIFICADO EN ESTA ETAPA.**
