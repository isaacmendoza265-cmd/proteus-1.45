/**
 * SERVICIO DE INTELIGENCIA OSINT Y RASTREO EN VIVO CON GOOGLE SEARCH
 * Proyecto Proteus - Protocolo PA-009 (Subunidad SO-NEWS)
 * 
 * Permite auditar en tiempo real redes sociales (X, Facebook, Instagram), noticias de prensa
 * y contradicciones dialécticas de cualquier actor o casa política mediante Gemini 3.8 Flash con Google Search Grounding.
 */

import { callGeminiApi, formatAiError } from './geminiService';
import { GraphNodeActor, PoliticalHouse, ActorOSINTReport } from '../data/politicalHouses/types';

export class PoliticalActorIntelligenceService {
  /**
   * Rastrea en vivo las redes sociales, noticias recientes y relaciones jerárquicas
   * de un actor político utilizando Google Search a través de Gemini.
   */
  public static async searchActorIntelligence(actor: GraphNodeActor): Promise<ActorOSINTReport> {
    const prompt = `
Actúa como la Subunidad SO-NEWS de Inteligencia Electoral y OSINT Político de Proyecto Proteus.
Realiza una búsqueda exhaustiva y actualizada en Google Search sobre el siguiente actor político en Antioquia / Colombia:

- Nombre del Actor: "${actor.name}"
- Alias o Título: "${actor.alias || 'N/A'}"
- Cargo Actual / Histórico: "${actor.roleLabel}"
- Casa Política a la que pertenece: "${actor.houseName}"
- Municipio base: "${actor.municipality}"
- Departamento: "${actor.department}"

INSTRUCCIONES DE BÚSQUEDA Y EXTRACCIÓN:
1. REDES SOCIALES: Encuentra los enlaces oficiales o nombres de usuario (@handles) de:
   - Twitter / X
   - Instagram
   - Facebook (Página de figura pública o perfil)
   - LinkedIn (si existe)
2. NOTICIAS RECIENTES (2023 a 2026): Identifica 2 a 3 titulares o noticias confirmadas de prensa (La Silla Vacía, El Colombiano, El Espectador, Semana, Caracol, etc.) sobre sus alianzas políticas, votaciones, nombramientos o investigaciones.
3. EVALUACIÓN DE PODER: Sintetiza en un párrafo breve cómo se articula su poder municipal con el nivel extramunicipal (Congreso o Gobernación).
4. ANÁLISIS DIALÉCTICO: Identifica una contradicción real entre su discurso público partidista y sus pactos pragmáticos de maquinaria bajo la mesa.

Devuelve la respuesta estrictamente en el siguiente formato JSON válido (sin texto extra antes o después):
{
  "socialHandles": [
    { "platform": "X (Twitter)", "handleOrUrl": "https://x.com/...", "verified": true },
    { "platform": "Instagram", "handleOrUrl": "https://instagram.com/...", "verified": true },
    { "platform": "Facebook", "handleOrUrl": "https://facebook.com/...", "verified": true }
  ],
  "recentHeadlines": [
    { "headline": "Título de noticia 1", "source": "Medio de comunicación", "dateOrSnippet": "Resumen en una frase y fecha aproximada" }
  ],
  "powerAssessment": "Resumen analítico del poder municipal vs extramunicipal...",
  "contradictionAnalysis": "Análisis de la contradicción dialéctica..."
}
`;

    try {
      const rawResponse = await callGeminiApi({
        promptText: prompt,
        model: 'gemini-3.8-flash',
        systemInstruction: 'Eres un analista de inteligencia OSINT y fuentes abiertas especializado en clanes y redes de poder electoral en Colombia. Devuelve siempre JSON estructurado.',
        useSearch: true // Activa Google Search Grounding
      });

      // Limpieza de formato markdown codeblocks
      const cleaned = rawResponse
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleaned);

      return {
        actorId: actor.id,
        actorName: actor.name,
        houseName: actor.houseName,
        searchedAt: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        socialHandlesFound: parsed.socialHandles || [],
        recentHeadlines: parsed.recentHeadlines || [],
        powerAssessment: parsed.powerAssessment || `${actor.name} ejerce liderazgo en ${actor.municipality} con articulación a ${actor.houseName}.`,
        contradictionAnalysis: parsed.contradictionAnalysis || 'Tensión habitual entre la lealtad partidista estatutaria y los acuerdos transaccionales de gobierno.'
      };
    } catch (error) {
      console.warn('Error o fallback en búsqueda OSINT para:', actor.name, error);

      // Fallback local enriquecido a partir de los datos maestros
      const fallbackSocials = [];
      if (actor.socialProfiles.xTwitter) {
        fallbackSocials.push({ platform: 'X (Twitter)', handleOrUrl: actor.socialProfiles.xTwitter, verified: true });
      }
      if (actor.socialProfiles.facebook) {
        fallbackSocials.push({ platform: 'Facebook', handleOrUrl: actor.socialProfiles.facebook, verified: true });
      }
      if (actor.socialProfiles.instagram) {
        fallbackSocials.push({ platform: 'Instagram', handleOrUrl: actor.socialProfiles.instagram, verified: true });
      }
      if (fallbackSocials.length === 0) {
        fallbackSocials.push({
          platform: 'Google Search Direct',
          handleOrUrl: `https://www.google.com/search?q=${encodeURIComponent(actor.name + ' ' + actor.municipality + ' politica')}`,
          verified: false
        });
      }

      const fallbackNews = actor.newsLinks.map(n => ({
        headline: n.title,
        source: n.source,
        dateOrSnippet: `${n.snippet || ''} (${n.year || 'Reciente'})`
      }));

      return {
        actorId: actor.id,
        actorName: actor.name,
        houseName: actor.houseName,
        searchedAt: 'Base de Datos Proteus (Offline)',
        socialHandlesFound: fallbackSocials,
        recentHeadlines: fallbackNews.length > 0 ? fallbackNews : [
          {
            headline: `${actor.name} consolida estructura electoral en ${actor.municipality}`,
            source: 'Registro Electoral Proteus',
            dateOrSnippet: 'Seguimiento de bancadas locales y acuerdos de gobernabilidad.'
          }
        ],
        powerAssessment: `${actor.name} opera en la esfera ${actor.sphere.toUpperCase()}, actuando como nodo de articulación entre ${actor.municipalAnchor} y ${actor.extramunicipalConnection}.`,
        contradictionAnalysis: actor.dialecticalNotes || 'Disputa de visibilidad institucional y negociación de avales para los comicios legislativos.'
      };
    }
  }

  /**
   * Genera un brief dialéctico estratégico para que la campaña del candidato
   * sepa cómo aproximarse o competir frente a una Casa Política específica.
   */
  public static async generateTacticalCampaignBrief(house: PoliticalHouse, candidateName: string = 'Isaac Mendoza'): Promise<string> {
    const prompt = `
Genera un BRIEF TÁCTICO DE NEGOCIACIÓN Y DISPUTA ELECTORAL para la campaña de ${candidateName} frente a la siguiente Casa Política en Antioquia:

- Casa Política: ${house.name}
- Jefe Político: ${house.leader}
- Cuartel General: ${house.headquarters}
- Municipios Feudo: ${house.municipalitiesUnderInfluence.join(', ')}
- Votos Totales Calculados: ${house.totalVotes2023.toLocaleString('es-CO')}
- Ideología / Enfoque: ${house.coreIdeology}
- Tesis Oficial: ${house.dialecticalSummary.thesis}
- Antítesis / Vulnerabilidades: ${house.dialecticalSummary.antithesis}

Estructura el informe en 3 secciones ejecutivas y directas:
1. 🎯 MAPA DE VULNERABILIDADES (¿Dónde le duele a esta casa política y qué flancos tiene abiertos hacia 2026?)
2. 🤝 LÍNEAS ROJAS Y PUNTOS DE ACUERDO POSIBLES (¿Es viable un pacto de no agresión o qué exigirán a cambio de votos?)
3. 📢 NARRATIVA DE PERSUASIÓN CIUDADANA (¿Cómo debe hablarle ${candidateName} a los votantes cautivos de este feudo para convencerlos con el framing cognitivo adecuado?)
`;

    try {
      const brief = await callGeminiApi({
        promptText: prompt,
        model: 'gemini-3.8-flash',
        systemInstruction: 'Eres el Director de Estrategia Electoral y Análisis Maquiavélico de Campaña en Proyecto Proteus. Respuestas tácticas, sin rodeos, orientadas a la victoria.',
        useSearch: false
      });
      return brief;
    } catch (err: any) {
      return `### Análisis Táctico para ${house.name}\n\n- **Vulnerabilidad Central**: ${house.dialecticalSummary.antithesis}\n- **Estrategia Recomendada**: Focalizar la persuasión en los votantes desencantados de ${house.headquarters}, contrastando el modelo clientelista tradicional con la propuesta de transformación y empleo productivo de ${candidateName}.`;
    }
  }
}
