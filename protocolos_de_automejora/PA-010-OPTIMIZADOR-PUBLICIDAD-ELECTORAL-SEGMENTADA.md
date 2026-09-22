# PROTOCOLO DE AUTOMEJORA PA-010
## MOTOR DE OPTIMIZACIÓN DE PUBLICIDAD ELECTORAL SEGMENTADA Y PERSUASIÓN CREATIVA
**Área de Impacto**: Propósito Supremo del Aplicativo (Publicidad Electoral & Segmentación Científica)  
**Agentes Responsables**: Investigador Académico, Investigador de Datos, Investigador Lex Artis, Analista de Software  
**Supervisado por**: Agente Orquestador  
**Auditado por**: Agente Auditor Imparcial  
**Custodiado por**: Agente Organizador  

---

### 1. QUÉ CAMBIAR
Actualmente, el aplicativo cuenta con un motor de segmentación demográfica y un generador de contenido discursivo, pero carecía de una **herramienta unificada de ingeniería publicitaria** que articule directamente la cohorte del votante con:
1. **La recomendación óptima del canal de pauta publicitaria** (Meta Ads, TikTok, WhatsApp conversacional, Valla exterior, Radio local).
2. **El cálculo de métricas publicitarias predictivas**: CTR esperado, Costo por Mil Impresiones (CPM) y Costo Estimado por Votante Persuadido (CPVP).
3. **El generador multivariado de creatividades con IA en 3 formatos específicos**:
   - Spot audiovisual corto (Reels / TikTok de 15 segundos con gancho de retención).
   - Micro-mensaje de WhatsApp para activistas de base y líderes barriales.
   - Titular para pieza gráfica de vía pública / volante hiperlocal.
4. **La simulación interactiva de asignación presupuestal** para distribuir la pauta entre segmentos territoriales y optimizar el retorno en votos.

---

### 2. POR QUÉ CAMBIARLO (MAXIMIZACIÓN DE EFICACIA PUBLICITARIA)
- **Eliminación del Despilfarro en Pauta Masiva**: En elecciones legislativas y regionales, emitir publicidad indiscriminada genera fatiga y saturación. El microtargeting publicitario enfoca cada peso donde la probabilidad de persuadir al votante indeciso es máxima.
- **Resonancia Cognitiva Inmediata**: La aplicación de la Teoría de las Perspectivas (Kahneman & Tversky) mediante variantes A/B (Ganancia/Esperanza vs. Pérdida/Protección) asegura que el mensaje active el resorte psicológico exacto del segmento.
- **Velocidad de Reacción en Campaña**: El equipo de campaña puede configurar una campaña publicitaria segmentada por comuna o municipio en menos de 2 minutos, con copys pre-optimizados y listos para pautar.

---

### 3. CÓMO CAMBIARLO (SUBPROTOCOLO TÉCNICO DE EJECUCIÓN)
1. **Modelado de Datos (`src/data/advertising/adTargetingModelData.ts`)**:
   - Mapeo de perfiles de resonancia para las 54 cohortes y los 4 arquetipos macro.
   - Definición de ganchos emocionales, triggers cognitivos y términos prohibidos.
2. **Servicio Optimizador (`src/services/adTargetingOptimizerService.ts`)**:
   - Algoritmo de ponderación de canales publicitarios por cohorte.
   - Función de generación de creatividades A/B usando Gemini 3.8 Flash con inyección del perfil del candidato activo.
   - Algoritmo de simulación presupuestal y estimación de votantes persuadidos.
3. **Componentes Visuales**:
   - `AdCreativeVariantCard.tsx`: Visualizador de anuncios con estética Glassmorphism Frost y copia en 1 clic.
   - `BudgetPacingSimulator.tsx`: Sliders interactivos de inversión en pauta y estimación de alcance y conversión.
   - `TargetedAdvertisingOptimizerView.tsx`: Módulo principal en la suite de Proteus.
4. **Enrutamiento y Menú**:
   - Conexión a la vista `'targeted-advertising'` en `App.tsx`, `SidebarNav.tsx` y el Launchpad del Candidato en `CandidateProfilesView.tsx`.

---

### 4. RECURSOS NECESARIOS
- Pila tecnológica: React 19, TypeScript, Tailwind CSS, Lucide Icons.
- Inteligencia Artificial: Gemini 3.8 Flash para generación de variantes en tiempo real (< 1.2 segundos).
- Datos: Cohortes DANE 4D y matrices de hábitos de consumo de medios en Antioquia.

---

### 5. ALTERNATIVAS AL CAMBIO
- **Alternativa A (Status Quo)**: Seguir pautando mensajes genéricos en Meta con altos costos de adquisición. (Descartada por ineficacia).
- **Alternativa B (Agencia de Publicidad Externa Tradicional)**: Contratar redacción manual de copys con tiempos de entrega de 3 a 5 días y costos elevados. (Descartada por lentitud).
- **Resolución**: **Aprobar e implementar el Optimizador de Publicidad Electoral Segmentada en memoria de Proteus.**
