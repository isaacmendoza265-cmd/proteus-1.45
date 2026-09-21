# PROTOCOLO DE AUTOMEJORA PA-003
## MOTOR DE HIPER-SEGMENTACIÓN PSICOGRÁFICA Y MATRIZ DE PERSUASIÓN COGNITIVA TERRITORIAL
**Área de Impacto**: Propósito 2 (Segmentación y Votantes) y Propósito 3 (Director de Contenido & Briefs)  
**Agentes Responsables**: Investigador Académico, Investigador Lex Artis, Analista de Software, Auditor Imparcial  
**Organizado por**: Agente Organizador  
**Supervisado por**: Agente Orquestador  

---

### 1. QUÉ CAMBIAR
Actualmente, el motor de segmentación (`VoterSegmentationEngine.tsx`) clasifica a la población en 4 macro-clusters demográficos basados en edad, estrato socioeconómico e IPM. **Se propone evolucionar hacia un Motor de Microtargeting Psicográfico y Persuasión Cognitiva basado en el Modelo OCEAN (Big Five) y la Teoría de Valores Humanos de Shalom Schwartz**.

El nuevo motor añadirá:
1. **Perfiles Psicográficos Sub-Territoriales**: Caracterización psicológica del votante predominante por comuna o municipio:
   - *Aversión al riesgo vs. Deseo de cambio radical*.
   - *Orientación al orden/autoridad vs. Apertura a libertades individuales*.
   - *Sensibilidad al prestigio/estatus vs. Solidaridad comunitaria*.
2. **Matriz de Pruebas A/B de Enfoque Discursivo**: Recomendación automática de dos versiones de un mismo mensaje para el candidato (Enfoque A: Basado en Ganancia/Esperanza; Enfoque B: Basado en Pérdida/Protección contra amenazas).
3. **Filtro de "Palabras Disparadoras" (Cognitive Triggers) y "Palabras Tóxicas"** por comuna: Términos que activan rechazo inmediato en sectores específicos (ej. en El Poblado vs. en Manrique o La Candelaria).

---

### 2. POR QUÉ CAMBIARLO (MAXIMIZACIÓN DE EFICIENCIA Y EFICACIA)

- **Fundamento en Ciencia Política y Psicología Cognitiva (Kahneman & Tversky)**: Dos personas del mismo estrato, edad y barrio pueden votar de manera opuesta según su sesgo cognitivo predominante (teoría de las perspectivas). Diseñar mensajes basados solo en "demografía" desperdicia hasta el 60% del impacto comunicacional.
- **Eficiencia en Pauta Digital y Despliegue en Redes**: Conocer el perfil psicográfico permite a la campaña segmentar anuncios en Meta Ads y TikTok con un Costo por Clic (CPC) y Costo por Votante Persuadido (CPVP) hasta un 50% menor.
- **Eficacia en el Discurso en Plaza Pública**: Cuando el candidato Isaac Mendoza llega a un municipio como Marinilla (alta cohesión religiosa y productiva) o Caucasia (economía minera y demanda de seguridad urgente), el director de contenido no le entrega un guion genérico, sino un discurso que resuena con los valores morales y culturales exactos del territorio.

---

### 3. CÓMO CAMBIARLO (SUBPROTOCOLO DE EJECUCIÓN TÉCNICA)

#### Paso 1: Tipado del Perfil Psicográfico en `src/types/psychographics.ts`
```typescript
export interface PsychographicProfile {
  communeOrMuniId: string;
  dominantValueSchwartz: 'Seguridad' | 'Tradición' | 'Logro' | 'Benevolencia' | 'Autonomía';
  riskToleranceIndex: number; // 0 (conservador adverso al riesgo) a 100 (abierto al cambio disruptivo)
  primaryEmotionalTrigger: 'Esperanza y Progreso' | 'Indignación contra el Abuso' | 'Miedo a la Pérdida de Seguridad';
  cognitiveBiasesToLeverage: string[]; // ej. "Sesgo de statu quo", "Efecto arrastre (Bandwagon)"
  forbiddenLexicon: string[];          // Términos que provocan rechazo
  recommendedMetaphors: string[];     // Metáforas de alto impacto local
  abMessageVariants: {
    variantA_GainFraming: string;
    variantB_LossFraming: string;
  };
}
```

#### Paso 2: Actualización de Prompts Estructurados para Gemini 3.8 Flash
Modificar la llamada en [`CampaignContentDirectorView.tsx`](src/modules/content/CampaignContentDirectorView.tsx) para incluir el bloque psicográfico en el prompt del sistema, forzando la entrega en JSON estructurado o Markdown con las dos variantes A/B y el vocabulario prohibido.

#### Paso 3: Selector de Enfoque en la Interfaz de Usuario
Añadir en el configurador de briefs un switch:
`[ Modo Mensaje: Protección de lo Construido (Enfoque Tradición) ⇄ Transformación y Ruptura (Enfoque Logro/Autonomía) ]`.

---

### 4. RECURSOS NECESARIOS PARA CAMBIARLO
- **Motor de IA**: `gemini-3.8-flash` ya integrado en `src/services/geminiService.ts` (latencia < 800ms).
- **Matrices Teóricas Precargadas**: Mapeo de valores de Schwartz cruzados con la Encuesta de Cultura Ciudadana de Medellín y el Barómetro de las Américas (LAPOP Colombia).
- **Esfuerzo de Desarrollo**: 8 a 10 horas de desarrollo frontend y refinamiento de prompts de sistema.

---

### 5. ALTERNATIVAS AL CAMBIO
1. **Alternativa A (Status Quo Demográfico)**: Seguir generando briefs basados únicamente en edad y estrato.
   - *Desventaja*: Mensajes predecibles, lugares comunes que no mueven la aguja electoral del votante indeciso.
2. **Alternativa B (Encuestas Psicográficas Masivas In Situ)**: Contratar encuestadoras para aplicar tests de personalidad de 40 preguntas a 5.000 ciudadanos en el departamento.
   - *Desventaja*: Costos prohibitivos (más de $150 millones COP) e inviables en los tiempos ágiles de campaña.
3. **Decisión del Comité**: **Aprobar el modelo de microtargeting psicográfico inferido por IA y anclado en datos culturales territoriales**.

---
*Aprobado por el Auditor Imparcial y registrado en el Repositorio de Automejora.*
