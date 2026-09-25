# PROTOCOLO PA-013: INTEGRACIÓN DEL CENSO OFICIAL REGISTRADURÍA Y MICRO-DIVISIONES CARTOGRÁFICAS EN LA OPTIMIZACIÓN PUBLICITARIA
## UNIDAD DE AUTOMEJORA ESTRATÉGICA • PROYECTO PROTEUS v1.4.5
**Fecha de Emisión**: 24 de Septiembre de 2026  
**Derivado de**: Sesión Crítica Nº 010 (ODI-010)  
**Objetivo Operativo**: Vincular el censo oficial de la Registraduría (41.421.973 habilitados) y los niveles 4 y 5 de Bogotá, Itagüí y Rionegro con el cálculo del IRPV, la tasa de penetración publicitaria y las geocercas de pauta digital.

---

## 1. REGLA DE CALIBRACIÓN DE SATURACIÓN PUBLICITARIA
Todo cálculo de costo por voto persuadido en Proteus debe estar anclado al censo electoral oficial de la Registraduría:

$$\text{Tasa de Penetración Teórica} = \frac{\text{Votos Esperados con Pauta}}{\text{Censo Oficial del Territorio}} \times 100$$

1. Si el territorio seleccionado es un **Municipio**:
   - Se consulta `getMunicipalCensus(nombre, departamento)` de `electoralCensusService.ts`.
   - Se extrae el total de habilitados, la proporción de mujeres vs. hombres y el número de puestos y mesas.
2. Si el territorio seleccionado es un **Departamento**:
   - Se consulta `getDepartmentCensus(nombre)`.
   - Se despliega el censo oficial consolidado departamental.
3. Si el municipio cuenta con **Divisiones Cartográficas Registradas**:
   - Se consultan las divisiones de `municipalDivisions.ts` (ej. 20 localidades en Bogotá, 7 comunas en Itagüí, 4 comunas/corregimientos en Rionegro, 16 comunas en Medellín) para recomendar geocercas hiperlocales en pauta de Meta Ads y TikTok Ads.

---

## 2. MODIFICACIONES DE CÓDIGO
1. **`src/services/holisticAdvertisingIntelligenceService.ts`**:
   - Integrar `electoralCensusService.ts` y `municipalDivisions.ts`.
   - Retornar `officialCensus` y `municipalDivisionMeta` dentro de `TerritoryGeopoliticalIntelligence`.
2. **`src/components/advertising/TerritoryIntelligenceBridgeCard.tsx`**:
   - Desplegar el censo oficial con desglose de género y el badge de divisiones territoriales disponibles.
3. **Pruebas y Verificación**:
   - Incorporar verificaciones en `scripts/test_cartography_and_graphs.py`.
