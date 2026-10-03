# Fuentes nuevas verificadas: población de la Alcaldía de Medellín y seguridad

> **Estado al 2-oct-2026 (tarde):** cargados con permiso de Isaac la proyección del Distrito (archivos 4 y 5, hasta
> 2030), la estadística delictiva de la Policía/MinDefensa y las alertas de la Defensoría. Scripts:
> `importar_proyecciones_medellin.py`, `importar_seguridad.py`, `importar_alertas_defensoria.py`; JSON del motor en
> `src/data/motor/`. Siguen pendientes Fiscalía, MOE y estudios académicos (pasos 3 a 5 de la propuesta).

- **Fecha:** 2-oct-2026.
- **Autor:** Claude, en una sesión de Cowork.
- **Alcance:** qué se puede traer, en qué formato y con qué nivel de detalle.
  - Se descargó un solo archivo de prueba, de 313 KB, para comprobar el formato. No se cargó nada al aplicativo.
  - Cargar exige el permiso de Isaac por lote (archivo, fuente, tamaño), según AGENTS.md.

## 1. Población por sexo y edad de la Alcaldía de Medellín (no DANE)

**Sí se puede.** La publica el Departamento Administrativo de Planeación (DAP) de Medellín, Subdirección de Prospectiva, Información y Evaluación Estratégica.

- **Versión:** "Actualización Año 2025", hecha por contrato interadministrativo con el DANE.
- **Dónde:** [Centro documental: proyecciones de población, viviendas y hogares](https://www.medellin.gov.co/es/centro-documental/proyecciones-poblacion-viviendas-y-hogares/).

| Archivo (.xlsx) | Nivel | Variables | Años |
|---|---|---|---|
| 2. Proyecciones por sexo, comunas y corregimientos | 16 comunas + 5 corregimientos | hombres, mujeres | 2018-2030 |
| 3. Sexo y edad simple | comunas y corregimientos | sexo × edad año a año | 2018-2030 |
| 4. Sexo y edad quinquenal (**probado**) | comunas, corregimientos y total | sexo × 21 grupos (0-4 … 100 y más) | 2018-2030 |
| 5. Barrios y veredas | barrio y vereda | total | 2018-2030 |
| 6 y 7. Hogares y viviendas | comuna y barrio | totales | 2018-2030 |
| Versiones "Post Covid-19" | comunas y corregimientos; urbano y rural | sexo y edad | 2018-2030 |

**Prueba del archivo 4**

- Tiene una hoja por comuna o corregimiento y una de total; las filas son sexo × grupo quinquenal y las columnas, años.
- Ejemplo: El Poblado, hombres de 30 a 34 años en 2026 = 4.410.
- Se lee directamente con un script (`openpyxl`).

**Qué aportaría**

- La pirámide sexo × edad **2026 por comuna y corregimiento**. Hoy Proteus solo tiene a ese nivel el CNPV 2018, con sexo y edad por separado y rotulado "Estimado".
- Los cruces de Segmentos en las comunas de Medellín pasarían de "Estimado (CNPV 2018)" a "Oficial (proyección del Distrito 2026)".

**Ojo**

- Es la serie del Distrito; la del DANE es la de referencia nacional (ver la nota de los 2.650.662 frente a 2.526.795 en `AUDITORIA_DATOS_AUXILIARES.md`). Hay que presentarlas lado a lado, con su fuente.
- El mapa de la Alcaldía ([VC_Distribucion_Poblacional](https://www.medellin.gov.co/servidormapas/rest/services/mapas_nacionales/VC_Distribucion_Poblacional/MapServer/layers)) solo trae totales: lo útil son los `.xlsx`.

**Propuesta de carga (pendiente de permiso)**

- Archivos 3 o 4, y 5: unos 2-3 MB en total.
- Irían a `_originales/` con un script `scripts/importar_proyecciones_medellin.py` que genere `src/data/motor/medellin-proyeccion-sexo-edad.json`. Así entra solo al motor y además se usa en Segmentos.

## 2. Seguridad

| Fuente | Qué trae | Nivel | Actualización | Acceso | Uso en Proteus |
|---|---|---|---|---|---|
| **Policía Nacional / MinDefensa, estadística delictiva** ([datos.gov.co](https://www.datos.gov.co)) | Un conjunto por delito: homicidio (`m8fd-ahd9`), extorsión (`q2ib-t9am`), secuestro (`d7zw-hpf4`), masacres (`u8eq-92tb`), terrorismo (`yi5j-5fe9`), hurtos, amenazas, afectación a la fuerza pública, incautaciones, minería ilegal, voladuras, erradicación | **municipio** (código DANE), día, sexo, arma, modalidad | mensual; probado con datos hasta el **31-ago-2026** | API abierta (Socrata); **probada desde aquí** (homicidios de Antioquia 2025 por municipio: Medellín 333, Andes 67, Caucasia 63…) | **Oficial.** Serie por municipio y tasa por 100.000 habitantes con la población DANE. Es la base del bloque de seguridad. |
| **Fiscalía General, datos abiertos** ([Víctimas V3](https://www.datos.gov.co/d/hr73-zqjf), [Procesos V3](https://www.datos.gov.co/d/dbdv-iihs), Procesados V3) | Noticias criminales (SPOA): delito, etapa, estado; víctimas por sexo, edad, etnia, si son líderes, periodistas o defensores de DD. HH. | **municipio del hecho** (código DANE), año y mes | mensual (sep-2026) | API abierta; muy grandes (consultas agregadas) | **Oficial**, con su rótulo: denuncias, no hechos (subregistro). Útil para extorsión y para delitos contra líderes y periodistas. |
| **Defensoría del Pueblo, Sistema de Alertas Tempranas** ([consulta](https://alertastempranas.defensoria.gov.co/Alerta/Reporte)) | 369 alertas desde 2017; **46 tocan Antioquia**: número, tipo (inminencia o estructural), fecha, escenario de riesgo, municipios, grupos armados, conductas (reclutamiento, desplazamiento, extorsión…), PDF completo | **municipio** (y veredas en el PDF) | continua | Página pública con filtros y botón "Generar Excel"; **probada desde aquí** | **Oficial** (es la fuente del Estado sobre riesgo de violaciones de DD. HH.). Lista de alertas vigentes por municipio, con su escenario y los grupos que nombra. |
| **MOE, Mapas y factores de riesgo electoral 2026** ([comunicado](https://new.moe.org.co/wp-content/uploads/2026/02/Mapa-de-riesgo-electoral-2026-MOE-Comunciado-Nacional.pdf)) | Riesgo por **fraude** y por **violencia** (y consolidado), por nivel; presencia de grupos armados | municipio | por elección (nacionales 2026; para 2027 sale el de territoriales) | Los PDF y el libro son públicos; **no encontré datos abiertos descargables** del mapa municipal | **Fuente identificable** (sociedad civil). Hay que transcribir las tablas del libro o pedírselas a la MOE. Según la prensa: unos 50 municipios de Antioquia en riesgo de fraude (Cámara) y unos 10 en riesgo extremo. |
| **Estudios académicos y de centros de pensamiento** | **Presencia de grupos por municipio:** Indepaz ([Comunidades en medio de la violencia, balance 2025](https://indepaz.org.co/wp-content/uploads/2026/01/Comunidades-en-medio-de-la-violencia-balance-2025-2_compressed.pdf)). **Gobernanza criminal en Medellín:** IPA, EAFIT y U. de Chicago ([nota de política](https://es.poverty-action.org/sites/default/files/publications/IPA-Gobernanza-Medellin-Colombia_Espanol.pdf)). **Gobernanza criminal en el Bajo Cauca:** U. de Antioquia ([tesis 2024](https://bibliotecadigital.udea.edu.co/bitstream/10495/43867/5/GarciaDairo_2024_Gobernanza_Criminal_BajoCauca.pdf)). | municipio o comuna, según el estudio | anual o puntual | PDF | **Auxiliar** con cita, al motor como JSON declarativo, fecha y fuente. Antes de cargarlos conviene que Isaac elija cuáles adopta el marco (son interpretaciones, no conteos). |
| Medicina Legal (lesiones fatales) | Homicidios por necropsia | municipio | mensual | datos.gov.co / Forensis | Contraste de la cifra de la Policía (opcional). |
| SISC Medellín | Homicidios y delitos por comuna y barrio | comuna, barrio | mensual | No encontré su conjunto abierto en esta búsqueda; hay que confirmarlo en MEData | Detalle intramunicipal para Medellín (hoy solo hay la tabla auxiliar de extorsión por comuna). |

### Propuesta de orden (cada paso con el permiso de descarga de Isaac)

1. **Policía/MinDefensa:** homicidio, extorsión, secuestro, masacres, amenazas y afectación a la fuerza pública, 2018-2026, por municipio de Antioquia. Son consultas agregadas a la API, de pocos KB, con un script que genere `src/data/motor/seguridad-policia.json`. Entra de inmediato al dossier, al analista y a todas las herramientas, rotulado oficial, con la tasa por 100.000 habitantes.
2. **Defensoría:** el Excel de alertas, filtrado a Antioquia, a `src/data/motor/alertas-tempranas.json`, con número, fecha, tipo, municipios, grupos y conductas, y el enlace al PDF.
3. **Fiscalía:** extorsión y delitos contra líderes, periodistas y defensores, por municipio y año (agregado).
4. **MOE 2027**, cuando publique el mapa de las territoriales; mientras tanto, el de 2026 transcrito, rotulado "elecciones nacionales 2026".
5. **Estudios académicos:** los que Isaac elija para el marco.

**Advertencias para el reglamento**

- La cifra de seguridad es del municipio donde ocurrió el hecho. La presencia de un grupo armado es una afirmación de la fuente, no un dato medido.
- Nada de esto se cruza con el voto de un barrio sin la advertencia de falacia ecológica (Regla 8).
