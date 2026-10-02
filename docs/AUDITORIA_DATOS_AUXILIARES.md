# Auditoría de los datos "escritos a mano" (tablas auxiliares)

- **Fecha:** 2-oct-2026. **Autor:** Claude, sesión de Cowork.
- **Alcance:** 49 archivos `.ts` de `src/data/` que no genera ningún script de `scripts/`, más 4 tablas metidas dentro de servicios.
- **Contenido completo:** dos archivos, entregados aparte y fuera del repositorio.
  - `datos_escritos_a_mano.xlsx`: 62 hojas, una por tabla exportada, con 2.318 filas en total, más un índice con el veredicto de cada archivo. Se exportó del código ya sin cédulas.
  - `datos_escritos_a_mano_fuentes.zip`: los `.ts` de `src/data/` como están hoy en `main`, más los 4 servicios que tenían tablas internas en su versión anterior (`cc07d6f`), para ver lo que se quitó.
- **Método:** cada tabla se cruzó con los datos oficiales que el aplicativo ya tiene. La prueba se corrió con vitest para poder usar los cargadores de la app.
  - DANE: proyección 2026 y NBI 2018 (`src/data/dane/antioquiaDane.json`), y CNPV 2018 por manzana sumado a cada comuna.
  - Registraduría: censo electoral 2026, escrutinio de la Alcaldía 2023 y resultados por puesto.

## 1. Resumen

| Veredicto | Qué significa | Archivos |
|---|---|---|
| **A. Copia de lo oficial** | El dato ya está en una fuente oficial cargada; el archivo lo repite. Es redundante, pero correcto. | Cifras del maestro de 125 municipios, del archivo metropolitano, de los 7 municipios estratégicos, de las subregiones (7 de 9) y de los resultados de 2023 del observatorio. También los `e24/*`, que ya se construyen desde los resultados por puesto. |
| **B. Fuente identificable, sin verificar** | Coherente con una fuente pública municipal o de prensa; sirve como AUXILIAR para llenar vacíos y, sobre todo, como **serie de tiempo**. | `observatorioComunas/populationData` y `housingData` (proyecciones 2018-2030 por comuna), `ipmData` (IPM por comuna 2010-2025), `criminalityData` (SISC y EAFIT), `rionegroECV2020Data` (ECV 2020 Rionegro), `politicalHousesMasterData` (relaciones con medio citado), `observatorioAntioquia/analyst*` (rotulados "información obtenida de la web" o EAFIT) |
| **C. Plantilla o supuesto sin fuente** | Valores escritos para llenar la interfaz. | Textos de seguridad, problemas y riesgo del maestro; población por comuna de `metropolitanAndMedellinData`; "% del censo" de `voterAudienceCatalog`; CTR y CPM de `adTargetingModelData`; `TERRITORY_HEATMAP_REGISTRY`; pesos de `voterDemographicsService`; `baseVotes` del simulador; actas de ejemplo de `electoralAuditMasterData` |
| **D. Mixto** | Parte copia y parte texto o aproximación. | `antioquiaData` (descripciones municipales con poblaciones "~"), `nbiDetailedData`, `antioquiaSubregionesData` (cifras oficiales más textos de diagnóstico sin fuente) |
| **Sin uso** | Nada lo importa. | `presidentialElections2026` (191 municipios del país, 4 de Antioquia), `governmentPlan` (programa de Paloma Valencia), `strategicPeople`, `majorCitiesData`, `publicServicesData`, `powerNetworksData`, `e24/historicalData`, `e24/candidateProcessing`, `observatorioAntioquia/{analystData, partiesColors, demographicCombinations, unidentifiedService}` |

**Corrección a la evaluación anterior.** Los 2.650.000 habitantes de Medellín **no son inventados**.
- Salen de `observatorioComunas/populationData.ts`, una serie de proyección del Distrito por comuna y año que da 2.650.662 para 2026.
- Esa serie es coherente con las proyecciones del Departamento Administrativo de Planeación de Medellín: en 2018 da 2.427.129, y cada comuna queda a menos del 2 % del CNPV 2018 en las que se pudieron cruzar.
- El DANE da 2.526.795 para el mismo año. Son **dos proyecciones oficiales distintas**:
  - el DANE es la cifra de referencia nacional y la que usa la ley de categorización;
  - la del Distrito sirve para la serie por comuna, donde el DANE no publica proyección.
- El motor las presenta así, con su fuente, en vez de esconder una u otra.

**Cédulas (regla de AGENTS.md).**
- Había **337 cédulas** de actores y candidatos en 4 archivos:
  - `observatorioAntioquia/municipalitiesData`: 192
  - `powerNetworksData`: 97
  - `politicalHousesMasterData`: 30
  - `powerHousesData`: 18
- Se quitaron, y una prueba (`sinCedulas.test.ts`) impide que vuelvan.
- **Siguen en el historial de git de un repositorio público**. Borrarlas de ahí exige reescribir el historial (force push), y eso le corresponde a Isaac como dueño del repositorio.

## 2. Hallazgos con cifras

| Tabla | Cruce | Resultado |
|---|---|---|
| Maestro 125 (`antioquia125MunicipalitiesMasterData`) | Población, NBI y censo frente a DANE y Registraduría | 125/125 exactos, porque el archivo los sobrescribe con lo oficial al final. Alcalde: 121/125 igual al escrutinio. |
| Maestro 125: textos | Repetición de textos | Seguridad: "Estadísticas pacíficas." ×28, "Baja letalidad." ×20. Presencia armada: "Sin presencia estructural activa." ×21. Problemas: "Servicios básicos estables." ×11. Riesgo: Bajo 24, Medio 33, Alto 41, Crítico 27, sin método. → **C** |
| Subregiones | Suma de poblaciones frente al DANE 2026 | 7 de 9 exactas. Oriente da 763.096 frente a 686.369 y Occidente 227.034 frente a 193.069: hay municipios mal asignados o duplicados. |
| Metropolitano (10 municipios) | Población, NBI y censo | Exactos. Comunas de Medellín: el censo electoral es oficial (rotulado). La **población por comuna no coincide** ni con el CNPV 2018 ni con la serie del Distrito (Guayabal 99.450 frente a 63.589; El Poblado 134.210 frente a 107.219). → **C** |
| `populationData` (comunas 2018-2030) | Frente al CNPV 2018 | Comuna 14: 106.805 frente a 107.219; comuna 15: 64.651 frente a 63.589. Coherente con proyecciones sobre el censo. → **B**, valiosa como serie. |
| `ipmData` (IPM por comuna 2010-2025) | Frente al IPM DANE por manzana (CNPV 2018) | Son **índices distintos**: el archivo trae el IPM de Medellín de la Encuesta de Calidad de Vida (Popular 15,3 en 2025) y el DANE el IPM del censo (Popular 26,3). No se contradicen, pero no se mezclan. → **B** |
| `criminalityData` | Fuente declarada | SISC (Alcaldía), SPOA (Fiscalía) e informe EAFIT de gobernanza criminal; extorsión en porcentaje y bandas por comuna. No hay copia oficial en el repo para verificar. → **B** |
| `politicalHousesMasterData` | Fuentes | 84 relaciones con campo `source`. Las de prensa citan medio (El Colombiano 9, La Silla Vacía 5, El Espectador), **sin URL ni fecha**. → **B**, sin verificar |
| `observatorioAntioquia/analyst*` (comunas de Medellín, Bello, Itagüí, Envigado y 6 municipios) | Bloques electorales | Votos y curules del Concejo "por comuna" (p. ej., Popular, 34.210 votos, Creemos 2 curules) **no existen en ninguna fuente**: el Concejo no reparte curules por comuna. → **C**. Los textos de demografía, economía, social y criminalidad están rotulados "información obtenida de la web" o EAFIT. → **B** |
| `antioquiaData` (305 descripciones) | Poblaciones "~" frente al DANE 2026 | 109 cruzaron por nombre: 0 exactas, mediana de desviación 10 %, máximo 61 %. → **D** |
| `nbiDetailedData` | NBI frente al DANE 2018 | Medellín 4,5 frente a 5,23; Apartadó 15,2 frente a 14,67. Aproximado. → **D** |
| `voterAudienceCatalog` (23 segmentos) | `shareEstimatedNational` | Sin fuente ni método. → **C** |
| `adTargetingModelData`, `TERRITORY_HEATMAP_REGISTRY` | CTR, CPM, indecisos, swing | Sin fuente; no hay encuestas cargadas. → **C** |

## 3. Cómo entran al motor de análisis (decisión aplicada)

El motor interno (`src/services/ia/motor/`) arma, para cada unidad territorial, **todo** lo que el aplicativo tiene, ordenado así:

1. **Oficial:** DANE, Registraduría, Contraloría, Contaduría, alcaldías, AMVA. Siempre va y prevalece.
2. **AUXILIAR (B):** entra rotulado "auxiliar, sin verificar" y con su fuente declarada. Sirve sobre todo para series y para vacíos que no cubre lo oficial:
   - población y vivienda por comuna 2018-2030;
   - IPM de Medellín por comuna 2010-2025;
   - extorsión y bandas por comuna;
   - ECV de Rionegro;
   - casas políticas.
3. **Supuestos (C):** **no** entran como dato. Las herramientas que los muestran los rotulan "supuesto de referencia, no medido". Los textos de plantilla del maestro se reemplazan por "Sin información".
4. **A** no entra: es la misma cifra oficial que ya está en el nivel 1.

## 4. Recomendaciones

- **Verificar lo B con su fuente original**, en este orden:
  1. proyecciones del DAP de Medellín (población y vivienda por comuna);
  2. ECV Medellín (IPM por comuna);
  3. SISC (extorsión).
- Al conseguir el archivo original, se carga con un script en `scripts/` y pasa a oficial.
- **Corregir las subregiones** Oriente y Occidente (municipios mal asignados).
- **Retirar las tablas sin uso** después de que Isaac las revise: están en el `.xlsx` por si sirven.
- Los prompts ya no reciben ninguna cifra C como dato.
