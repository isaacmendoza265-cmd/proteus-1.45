# PROTOCOLO DE AUTOMEJORA PA-002
## PIPELINE AUTOMATIZADO DE EXTRACCIÓN Y NORMALIZACIÓN DE MICRODATOS ELECTORALES (REGISTRADURÍA / CNE / DANE)
**Área de Impacto**: Propósito 1 (Repositorio Municipal Universal) y Visor Territorial de 5 Escalas  
**Agentes Responsables**: Investigador de Datos, Analista de Software, Auditor Imparcial  
**Organizado por**: Agente Organizador  
**Supervisado por**: Agente Orquestador  

---

### 1. QUÉ CAMBIAR
Actualmente, el repositorio municipal (`municipalRepositoryService.ts`) contiene datos consolidados de los 125 municipios y las comunas de Medellín precargados estáticamente en TypeScript. **Se propone implementar un Subprotocolo de Ingesta Continua y Verificación de Integridad de Microdatos** con adaptadores directos para:
1. **Portal de Datos Abiertos de Colombia (`datos.gov.co`)**: Censo electoral oficial y DIVIPOLA DANE actualizada.
2. **Boletines y Formularios E-14 / E-24 de la Registraduría**: Esquema de importación automática de microdatos de mesas y comisiones escrutadoras por puesto de votación.
3. **Módulo de Detección de Anomalías Electorales**: Algoritmo de Ley de Benford y detección de mesas con atipicidades (ej. participación > 98% o mesas con 0 votos nulos).

---

### 2. POR QUÉ CAMBIARLO (MAXIMIZACIÓN DE EFICIENCIA Y EFICACIA)

- **Eficiencia Operativa**: Reducción del 90% en el tiempo que los asesores de campaña dedican a descargar PDFs y compilar hojas de cálculo dispersas tras cada jornada electoral o simulacro.
- **Eficacia y Control Territorial**: Las elecciones en Colombia no terminan a las 4:00 p.m. del domingo. La eficacia de una campaña depende críticamente de la **auditoría en escrutinios**. Si el aplicativo permite cruzar los datos del E-14 de mesa con el E-24 de comisión, el equipo de testigos del candidato puede detectar en minutos discrepancias donde se pierden votos valiosos por errores de digitación.
- **Micro-Estrategia de Movilización**: Identificar con precisión de manzana censal qué puestos de votación tienen el mayor abstencionismo histórico permite focalizar el transporte, los coordinadores barriales y las llamadas del call-center únicamente en las mesas con mayor retorno de voto.

---

### 3. CÓMO CAMBIARLO (SUBPROTOCOLO DE EJECUCIÓN TÉCNICA)

#### Paso 1: Definición del Esquema Unificado de Microdatos (`src/data/schemas/electoralMicrodata.ts`)
```typescript
export interface PollingStationRecord {
  daneCode: string;             // Código municipio (ej. "05001")
  zoneNumber: number;           // Zona electoral
  stationId: string;            // Identificador de puesto (ej. "Col. San José")
  stationName: string;
  address: string;
  totalTables: number;          // Número de mesas instaladas
  electoralCensus: number;      // Censo potencial del puesto
  coordinates: [number, number];// [Lat, Lng] para Leaflet
  historicalTurnout: number;    // % promedio de participación
  predominantParty2022: string;
  benfordAnomalyScore: number;  // 0 a 100 (índice de atipicidad)
}
```

#### Paso 2: Subprotocolo de Carga y Validación por Drag-and-Drop
En la vista [`MunicipalRepositoryExplorerView.tsx`](src/modules/repository/MunicipalRepositoryExplorerView.tsx):
- Ampliar el botón *"Ingestar Datos (Desarrollador)"* para aceptar archivos `.csv` y `.xlsx` exportados directamente por la Registraduría Nacional o la plataforma CNE Cuentas Claras.
- Validar hashes criptográficos (SHA-256) para garantizar que la información no fue alterada.

#### Paso 3: Capa de Georreferenciación de Puestos de Votación
Enlazar los puestos de votación como marcadores interactivos dentro de [`MultiLevelZoomMap.tsx`](src/components/maps/MultiLevelZoomMap.tsx) en el Nivel 4 y Nivel 5 de zoom.

---

### 4. RECURSOS NECESARIOS PARA CAMBIARLO
- **Lector de Archivos en el Cliente**: Librería `papaparse` (ligera, 15KB) para parseo de CSV en streaming sin saturar la memoria del navegador.
- **Fuentes de Datos Abiertas**: APIs de Socrata (`datos.gov.co/api/`) y repositorio de geometrías DANE DIVIPOLA 2024.
- **Costos de Servidor**: $0 USD adicionales (todo el procesamiento de filtrado se ejecuta del lado del cliente en el navegador).

---

### 5. ALTERNATIVAS AL CAMBIO
1. **Alternativa A (Status Quo)**: Mantener únicamente los datos precargados manualmente en archivos de código TypeScript.
   - *Desventaja*: Si el CNE modifica puestos o si la campaña compite en un municipio no antioqueño, requiere editar código fuente a mano, lo que imposibilita la escalabilidad comercial del software.
2. **Alternativa B (Web Scraping Directo sin Autorización)**: Construir bots que extraigan datos en vivo durante las horas del preconteo.
   - *Desventaja y Riesgo*: La Registraduría implementa Cloudflare y bloqueos antibot que pueden tumbar el servicio el día de elecciones.
3. **Decisión del Comité**: **Adoptar el protocolo de ingesta estándar basado en archivos abiertos oficiales y APIs de datos abiertos con validación de integridad**.

---
*Aprobado por el Auditor Imparcial y registrado en el Repositorio de Automejora.*
