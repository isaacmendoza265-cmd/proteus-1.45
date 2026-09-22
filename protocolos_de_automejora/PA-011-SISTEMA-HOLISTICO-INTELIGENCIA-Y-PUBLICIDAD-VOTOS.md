# PROTOCOLO DE AUTOMEJORA PA-011
## SISTEMA HOLÍSTICO DE INTELIGENCIA ESTRATÉGICA Y MAXIMIZACIÓN PUBLICIDAD/VOTOS
**Área de Impacto**: Núcleo Arquitectónico y Teleológico de Proyecto Proteus  
**Agentes Responsables**: Agente Orquestador, Investigador Académico, Investigador de Datos, Investigador Lex Artis, Analista de Software  
**Auditado por**: Agente Auditor Imparcial  
**Custodiado por**: Agente Organizador  

---

### 1. QUÉ CAMBIAR
Se establece la articulación sistémica obligatoria entre la **Capa de Inteligencia Estratégica Territorial** y la **Capa de Conversión Publicitaria**:
1. El optimizador de publicidad segmentada no operará como un generador de textos aislado o genérico, sino como el **nodo de salida (output layer)** que metaboliza la inteligencia geopolítica acumulada por los otros módulos de Proteus.
2. Cada decisión de pauta publicitaria se enriquecerá automáticamente con:
   - **Identificación de la Casa Política Dominante** del municipio o subregión activa (`politicalHousesMasterData.ts`).
   - **Vulnerabilidades y Grietas de Hegemonía** de dicha casa política.
   - **Estado del Monitoreo Multinivel**: Agenda y prioridades de la Gobernación de Antioquia y reportes de campo del Proyecto Independencia (`gobernacionService.ts`).
   - **Densidad Electoral y Concentración Demográfica** de mapas de calor territoriales.
   - **Cálculo del Índice de Retorno Publicidad/Votos (IRPV)**: Factor predictivo de conversión que indica cuántos votos adicionales se generan por cada millón de pesos invertidos.

---

### 2. POR QUÉ CAMBIARLO (LA DOCTRINA HOLÍSTICA DE PROTEUS)
- **Eliminación del Reduccionismo Publicitario**: Una campaña que pauta creatividades sin entender el ecosistema de poder local desperdicia hasta el 70% de su presupuesto atacando causas irrelevantes o ignorando a las maquinarias que controlan la contratación y las juntas comunales.
- **Sinergia Sistémica de Proteus**: Módulos como el Observatorio de Casas Políticas (grafos 2D/3D), los Mapas de Calor electorales y el Monitoreo de Gobernación cobran su verdadero valor instrumental cuando alimentan directamente la estrategia de persuasión y el microtargeting publicitario del candidato Isaac Mendoza.
- **Ventaja Competitiva Decisiva**: Permite a la campaña reaccionar con agilidad militar: si el monitoreo de Gobernación detecta una crisis presupuestal o la ruptura de una alianza política en Bello o Itagüí, el optimizador de publicidad formula al instante la pauta digital para capitalizar esa fractura electoral.

---

### 3. CÓMO CAMBIARLO (ESPECIFICACIÓN TÉCNICA Y DE SOFTWARE)

#### A. Servicio de Inteligencia Publicitaria Holística
Crear `src/services/holisticAdvertisingIntelligenceService.ts`:
- **Entradas**:
  - Territorio seleccionado (municipio, comuna o departamento).
  - Datos de casas políticas (`POLITICAL_HOUSES_DATA`).
  - Estado del monitoreo de Gobernación e Independencia (`getGobernacionStatus`).
  - Perfil del candidato (`CandidateProfile`).
- **Salidas (`TerritoryAdvertisingIntelligence`)**:
  - Casa política dominante, líder, partidos y áreas de control institucional.
  - Síntesis dialéctica territorial (Tesis de gobernanza, Antítesis/desgaste, Síntesis de oportunidad electoral).
  - Postura táctica recomendada:
    - *Confrontación Directa*: Ante dinastías desgastadas con alta oposición ciudadana.
    - *Cooptación de Base*: Conquista de votantes de estratos 1-3 mediante propuestas sociales sin chocar con caciques locales.
    - *Capitalización de Fractura*: Aprovechamiento de disputas entre concejales y alcaldías o gobernación.
    - *Consolidación de Bastión*: Blindaje de zonas de alta favorabilidad de Isaac Mendoza.
  - Multiplicador de Retorno Publicidad/Votos (IRPV) proyectado (e.g. 1.85x sobre la media).
  - Ganchos geopolíticos para creatividades publicitarias (Hooks contextuales).

#### B. Componente Visual de Puente Territorial
Crear `src/components/advertising/TerritoryIntelligenceBridgeCard.tsx`:
- Tarjeta de mando con diseño Glassmorphism Cyber-Electoral.
- Indicador visual del IRPV con barra de resonancia y factor multiplicador.
- Resumen de la casa política dominante en el territorio y sus vulnerabilidades.
- Estado de conexión con el Monitoreo de Gobernación / Proyecto Independencia.
- Acceso rápido en un clic al Observatorio de Grafos de Redes de Poder (`observatorio-redes`).

#### C. Integración en el Optimizador de Publicidad
Actualizar `src/modules/advertising/TargetedAdvertisingOptimizerView.tsx`:
- Selector de territorio metropolitano y departamental (Medellín, Itagüí, Bello, Envigado, Sabaneta, Caldas, La Estrella, Copacabana, Girardota, Barbosa, Antioquia General).
- Inserción de la tarjeta `TerritoryIntelligenceBridgeCard`.
- Alimentación dinámica del generador de creatividades con los ángulos de poder local.

---

### 4. RECURSOS NECESARIOS
- Pila de Desarrollo: React 19, TypeScript, Lucide React, Tailwind CSS.
- Datos: Base de datos maestra de casas políticas (`politicalHousesMasterData.ts`) y servicio de Gobernación (`gobernacionService.ts`).
- Verificación: Suite de pruebas de importación estricta (`verify_imports.py`).

---

### 5. ALTERNATIVAS AL CAMBIO
- **Alternativa A (Aislamiento Funcional)**: Dejar el observatorio de casas políticas en una pestaña lejana y el optimizador de publicidad en otra, obligando al usuario a cruzar mentalmente la información. (Descartada por ineficiencia operativa).
- **Alternativa B (Amputación de Inteligencia)**: Eliminar los grafos y monitoreo para dejar solo un generador de textos de pauta. (Descartada tajantemente por orden expresa de la Dirección).
- **Resolución**: **Aprobar e implementar el PA-011 como estándar integral de Proyecto Proteus.**
