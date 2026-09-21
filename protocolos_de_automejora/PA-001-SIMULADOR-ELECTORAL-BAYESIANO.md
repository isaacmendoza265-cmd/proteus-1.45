# PROTOCOLO DE AUTOMEJORA PA-001
## MOTOR PREDICTIVO BAYESIANO DE CIFRA REPARTIDORA D'HONDT Y COSTO MARGINAL DEL VOTO
**Área de Impacto**: Ámbito Nacional (Senado), Departamental (Cámara/Asamblea) y Municipal (Concejos)  
**Agentes Responsables**: Investigador Académico, Investigador Lex Artis, Analista de Software, Auditor Imparcial  
**Organizado por**: Agente Organizador  
**Supervisado por**: Agente Orquestador  

---

### 1. QUÉ CAMBIAR
Actualmente, el aplicativo cuenta con un repositorio histórico de datos E-24 (2015-2023) y un visor estático de encuestas demoscópicas. **Se propone implementar un Motor de Simulación Electoral Predictivo (Monte Carlo / Inferencia Bayesiana)** integrado en `CampaignToolsView.tsx` y en el visor territorial de 5 escalas. 

Este motor calculará en tiempo real:
1. La probabilidad exacta de superar el umbral electoral (3% en Senado/Cámara).
2. La **Cifra Repartidora D'Hondt proyectada** para cada circunscripción según diversos escenarios de abstención (50% a 65%).
3. La **curul marginal** (el número exacto de votos adicionales que necesita una lista para arrebatarle el último escaño al partido rival).
4. El **Retorno de Inversión Electoral (ROI por Voto)**: asignación óptima del presupuesto de pauta y movilización territorial por municipio para maximizar votos al menor costo unitario.

---

### 2. POR QUÉ CAMBIARLO (MAXIMIZACIÓN DE EFICIENCIA Y EFICACIA)

- **Falla en la Práctica Política Convencional**: Las campañas tradicionales despilfarran hasta el 40% de sus recursos de pauta y eventos en municipios donde o ya tienen los votos asegurados (rendimientos decrecientes) o donde la barrera de entrada es tan alta que cada voto nuevo cuesta 10 veces más.
- **Eficiencia**: Permite redistribuir el presupuesto publicitario y las semanas de gira del candidato hacia los municipios y comunas donde la densidad de "votos bisagra" (indecisos de centro y abstencionistas blandos) es más barata de persuadir y movilizar.
- **Eficacia**: En el sistema electoral colombiano (Art. 263 C.P.), las curules no se ganan por promedio, sino por cruzar el umbral residual en la Cifra Repartidora. Ganar una curul puede depender de una diferencia de 400 a 1.200 votos en una subregión como Urabá o el Oriente Antioqueño. Conocer ese número con intervalo de confianza del 95% transforma una campaña ciega en una operación quirúrgica.

---

### 3. CÓMO CAMBIARLO (SUBPROTOCOLO DE EJECUCIÓN TÉCNICA)

#### Paso 1: Algoritmo de Simulación D'Hondt con Incertidumbre Estocástica
Implementar un servicio en `src/services/electoralSimulatorService.ts`:
```typescript
export interface PartyVoteDistribution {
  partyId: string;
  partyName: string;
  expectedVotes: number;
  varianceSigma: number; // Incertidumbre de encuesta/histórico
}

export interface SimulationResult {
  simulationsRun: number;
  thresholdVotes: number;
  seatsWonProbability: Record<string, number[]>; // Probabilidad de ganar N curules
  marginalVoteCost: number; // Votos para ganar la curul N+1
  recommendedResourceAllocation: { municipalityId: string; targetVotes: number; priority: 'alta' | 'media' | 'baja' }[];
}
```

#### Paso 2: Componente Visual Interactivo en `src/components/analytics/ElectoralSimulatorDashboard.tsx`
- Sliders dinámicos de:
  - *Participación electoral estimada* (ej. 48% a 58%).
  - *Voto en blanco proyectado* (determina el umbral real).
  - *Volatilidad del electorado indeciso* (+/- 5%).
- Gráfica de distribución de probabilidad de curules (Histograma interactivo).
- Termómetro de "Riesgo de Umbral" (Verde > 95%, Amarillo 70-95%, Rojo < 70%).

#### Paso 3: Conexión con el Repositorio Municipal
El simulador cruzará automáticamente los 125 municipios de Antioquia con el censo electoral oficial para sugerir dónde concentrar las activaciones territoriales del candidato Isaac Mendoza.

---

### 4. RECURSOS NECESARIOS PARA CAMBIARLO
- **Librerías de Cómputo**: Algoritmo numérico ligero en TypeScript nativo (0 dependencias pesadas para no degradar el bundle).
- **Librerías de Gráficos**: Reutilización de Tailwind CSS + Canvas nativo o SVG responsivo con animaciones suaves.
- **Datos Requeridos**: Matriz de votación histórica 2018-2022 de Senado y Cámara de Antioquia (ya disponible en `src/data/e24/`).
- **Tiempo de Implementación Estimado**: 1 Sprint de desarrollo (12 a 16 horas de desarrollo y pruebas unitarias).

---

### 5. ALTERNATIVAS AL CAMBIO
1. **Alternativa A (Status Quo - Tablas Estáticas)**: Mantener únicamente los datos históricos de 2022 sin proyección interactiva.
   - *Desventaja*: El candidato y su comité estratégico deben calcular las metas a mano en Excel, perdiendo agilidad y precisión ante giros de última hora en encuestas.
2. **Alternativa B (Modelos de IA basados únicamente en prompts a Gemini)**: Pedirle a Gemini que estime las curules en cada prompt.
   - *Desventaja*: La IA generativa puede cometer inconsistencias aritméticas en divisiones sucesivas de Cifra Repartidora. El cómputo determinista debe hacerse en TypeScript, y la IA debe dedicarse a interpretar estratégicamente los resultados.
3. **Decisión del Comité**: **Aprobar la implementación híbrida (Matemática determinista en TypeScript + Narrativa interpretativa con Gemini 3.8 Flash)**.

---
*Aprobado por el Auditor Imparcial y registrado en el Repositorio de Automejora.*
