# PROTOCOLO DE AUTOMEJORA PA-014
## MOTOR DE CURVA DE SATURACIÓN DE FRECUENCIA, PRESUPUESTO TECHO (BUDGET CAP) Y PREVENCIÓN DE DESPERDICIO PUBLICITARIO POR CENSO ELECTORAL 2026

**Mandato Supremo**: Maximización de la Eficacia de la Publicidad Electoral (Relación Publicidad / Votos)  
**Sesión de Origen**: Sesión Crítica Nº 011 (ODI-011)  
**Estado Actual**: PROPUESTA FORMULADA • ESPERANDO AUTORIZACIÓN DEL USUARIO (GATEKEEPER)  
**Prioridad Estratégica**: $\text{PE} = 85.94$ (Crítica)

---

## 1. OBJETIVO DEL PROTOCOLO
Impedir que el presupuesto publicitario del candidato se malgaste en zonas de sobre-saturación de audiencia (*Ad Fatigue*), calculando para cada municipio y departamento de Colombia el **Presupuesto Techo Óptimo (*Budget Cap*)**, la **Frecuencia Estimada** y la **Curva de Rendimientos Decrecientes** utilizando el Censo Oficial de la Registraduría 2026 como denominador estricto.

---

## 2. FORMULACIÓN MATEMÁTICA Y MODELO TEÓRICO

### 2.1. Cálculo del Presupuesto Techo Territorial ($BC_{\text{territorio}}$)
Para cualquier territorio $T$ con potencial electoral oficial $C_T$:
$$BC_T = C_T \times \rho_T \times \bar{f}_{\text{opt}} \times \frac{\overline{\text{CPM}}}{1.000}$$

Donde:
- $C_T$: Censo electoral oficial (extraído de `electoralCensusService.ts`).
- $\rho_T$: Tasa de penetración digital efectiva (78% en cabeceras metropolitanas, 54% en municipios no metropolitanos).
- $\bar{f}_{\text{opt}} = 3.8$: Frecuencia óptima recomendada de impactos en un ciclo de 21 días (literatura de persuasión *Gerber & Green 2011*).
- $\overline{\text{CPM}} = \$3.850\text{ COP}$: Costo promedio ponderado por mil impresiones (Meta Ads + TikTok Ads en Colombia).

### 2.2. Curva Logística de Rendimiento Marginal y Factor de Desperdicio
Si el presupuesto asignado $B$ supera el techo $BC_T$:
- **Frecuencia resultante**:
  $$f(B) = \frac{B \times 1.000}{C_T \times \rho_T \times \overline{\text{CPM}}}$$
- **Factor de Eficiencia Marginal ($\eta$)**:
  $$\eta(f) = \begin{cases} 
  1.00 & \text{si } f \le 3.8 \\
  \max\left(0.20, 1.00 - 0.25 \times (f - 3.8)\right) & \text{si } f > 3.8 
  \end{cases}$$
- **Desperdicio Monetario Estimado**:
  $$\text{Desperdicio COP} = B \times (1 - \eta(f))$$

---

## 3. ARCHIVOS QUE SE MODIFICARÍAN TRAS AUTORIZACIÓN

| Archivo | Intervención Planificada |
| :--- | :--- |
| [`src/services/holisticAdvertisingIntelligenceService.ts`](file:///c:/Users/isaac/OneDrive/Documentos/Proyecto%20Proteus/src/services/holisticAdvertisingIntelligenceService.ts) | Agregar interfaz `BudgetSaturationMetrics` y método `calculateBudgetCapAndSaturation(territory, budgetCOP)`. Modificar `calculateAdvertisingVotesEfficiency()` para aplicar el factor $\eta(f)$ sobre los votos marginales esperados. |
| [`src/components/advertising/TerritoryIntelligenceBridgeCard.tsx`](file:///c:/Users/isaac/OneDrive/Documentos/Proyecto%20Proteus/src/components/advertising/TerritoryIntelligenceBridgeCard.tsx) | Incorporar bloque visual con barra de saturación, semáforo (Verde / Amarillo / Rojo), Budget Cap calculado en millones de COP y alerta de reasignación cuando el gasto supera el punto de saturación. |
| [`scripts/test_cartography_and_graphs.py`](file:///c:/Users/isaac/OneDrive/Documentos/Proyecto%20Proteus/scripts/test_cartography_and_graphs.py) | Agregar Sección 7 de pruebas automatizadas para verificar el cálculo del Budget Cap en municipios pequeños (ej. Cañasgordas) vs grandes (Medellín/Bogotá) y la degradación matemática por fatiga publicitaria. |

---

## 4. ESTADO DE BLOQUEO (GATEKEEPER)
En cumplimiento estricto del principio de **Disociación de Automejora y Ejecución**:
- Ningún archivo de `src/` ha sido modificado.
- Ninguna suite de código ha sido alterada.
- **La ejecución queda en espera de la respuesta del Usuario.**
