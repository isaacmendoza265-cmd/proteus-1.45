# PROTOCOLO DE AUTOMEJORA PA-004
## ARQUITECTURA GIS VECTORIAL DE ALTO RENDIMIENTO (CANVAS/WEBGL) Y SOPORTE OFFLINE-FIRST PARA TERRITORIO
**Área de Impacto**: Visor Territorial de 5 Escalas, Repositorio Municipal y Movilidad en Campaña  
**Agentes Responsables**: Analista de Software, Investigador Lex Artis, Auditor Imparcial  
**Organizado por**: Agente Organizador  
**Supervisado por**: Agente Orquestador  

---

### 1. QUÉ CAMBIAR
Actualmente, el visor territorial (`MultiLevelZoomMap.tsx`) utiliza Leaflet renderizando elementos vectoriales mediante SVG en el DOM estándar del navegador y requiere conexión a internet para descargar mapas base o sincronizar datos. **Se propone migrar el motor de renderizado a modo Canvas/WebGL y dotar a la plataforma de una arquitectura Offline-First (PWA con persistencia en IndexedDB)**.

Las mejoras clave incluyen:
1. **Renderizado por Canvas/WebGL**: Activar `preferCanvas: true` y capas optimizadas para cargar más de 1.000 polígonos de barrios y puestos de votación a 60 FPS sin ralentizar computadores portátiles de campaña.
2. **Modo "Campaña en Territorio" (100% Offline)**:
   - Almacenamiento local en el navegador (IndexedDB / Cache API) de los 125 municipios, datos de NBI, histórico E-24 y geometrías de Antioquia.
   - Si el candidato viaja a una vereda de Urabá o el Nordeste sin señal móvil, el aplicativo continúa funcionando de forma transparente.
3. **Sincronización Diferida**: Cuando el dispositivo recupera señal de red, sincroniza automáticamente con Google Drive los nuevos análisis, notas de gira y briefs generados.

---

### 2. POR QUÉ CAMBIARLO (MAXIMIZACIÓN DE EFICIENCIA Y EFICACIA)

- **Realidad Territorial Colombiana**: En Antioquia y Colombia, las campañas no se ganan únicamente desde oficinas en Medellín o Bogotá con fibra óptica. Se ganan recorriendo veredas, corregimientos y carreteras donde la señal 4G se corta durante horas. Un aplicativo que se bloquea sin internet es inútil para la avanzada del candidato en territorio.
- **Eficiencia Operativa del Equipo de Campo**: La avanzada y los coordinadores de día D pueden consultar las fichas de los líderes, los puestos de votación y el historial de votos sin depender de datos móviles.
- **Rendimiento de Hardware**: El renderizado por Canvas consume hasta un 70% menos memoria RAM y alarga la duración de la batería de las laptops y tablets durante las jornadas de gira.

---

### 3. CÓMO CAMBIARLO (SUBPROTOCOLO DE EJECUCIÓN TÉCNICA)

#### Paso 1: Configuración de Leaflet en Modo Canvas de Alto Desempeño
En [`src/components/maps/MultiLevelZoomMap.tsx`](src/components/maps/MultiLevelZoomMap.tsx):
```typescript
<MapContainer
  preferCanvas={true} // Renderiza polígonos en Canvas HTML5 en vez de cientos de nodos SVG en el DOM
  renderer={L.canvas({ padding: 0.5, tolerance: 10 })}
  // ...
>
```

#### Paso 2: Servicio de Caché Offline en `src/services/offlineStorageService.ts`
Implementar un wrapper simple de IndexedDB para almacenar los GeoJSONs y el Repositorio Municipal:
```typescript
export class OfflineStorageService {
  private dbName = 'proteus_offline_vault';
  
  async prefetchAndCacheAllTerritories(): Promise<void> {
    // Guarda en IndexedDB los 125 municipios, comunas y geometrías DANE
  }

  async getTerritoryDataOffline(id: string): Promise<any> {
    // Retorna datos locales instantáneamente sin hacer peticiones de red
  }
}
```

#### Paso 3: Indicador de Conectividad en `TopStatusBar.tsx`
Añadir un badge visual que indique:
- 🟢 *Online (Google Search & Drive sincronizado)*
- 🟡 *Offline (Modo Territorio Activo - 100% Funcional con Datos Locales)*

---

### 4. RECURSOS NECESARIOS PARA CAMBIARLO
- **Tecnologías**: IndexedDB nativo del navegador (estándar HTML5, compatible con Chrome, Edge, Safari, Firefox).
- **Librerías Adicionales**: Ninguna (cero dependencias externas adicionales, manteniendo el paquete liviano).
- **Espacio en Disco Local**: ~25 MB de almacenamiento en el navegador (espacio mínimo imperceptible).

---

### 5. ALTERNATIVAS AL CAMBIO
1. **Alternativa A (Status Quo)**: Exigir conexión constante a internet vía tethering o datos móviles.
   - *Desventaja*: Bloqueos frecuentes y frustración en giras rurales donde no hay conectividad.
2. **Alternativa B (Crear una app nativa separada para iOS/Android con SQLite)**:
   - *Desventaja*: Requiere duplicar el código, pagar cuentas de desarrollador de Apple/Google y esperar aprobaciones en tiendas, retrasando el cronograma de campaña por semanas.
3. **Decisión del Comité**: **Aprobar la arquitectura PWA Offline-First en la web app actual**.

---
*Aprobado por el Auditor Imparcial y registrado en el Repositorio de Automejora.*
