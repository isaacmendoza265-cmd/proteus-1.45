/**
 * SERVICIO DE INTELIGENCIA OSINT Y RASTREO EN VIVO CON GOOGLE SEARCH
 * Proyecto Proteus - Protocolo PA-009 (Subunidad SO-NEWS)
 * 
 * Permite auditar en tiempo real redes sociales (X, Facebook, Instagram), noticias de prensa
 * y contradicciones dialécticas de cualquier actor o casa política mediante Gemini 3.8 Flash con Google Search Grounding.
 */

import { callGeminiApi, formatAiError } from './geminiService';
import { getMunicipalCensus } from './electoralCensusService';
import { perfilRegistrado } from './ia/registroPerfil';
import type { SeleccionDossier } from './dossierTerritorialService';

/** Unidad del municipio base del actor, para las macrofuentes (sin importar el motor completo aquí) */
async function seleccionMunicipio(nombre: string): Promise<SeleccionDossier | undefined> {
  const dane = getMunicipalCensus(nombre)?.dane;
  if (!dane) return undefined;
  const { seleccionDeDane } = await import('./ia/macrofuentes');
  return seleccionDeDane(dane);
}
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
        systemInstruction: 'Eres un analista de fuentes abiertas especializado en redes de poder electoral en Colombia. Devuelve siempre JSON estructurado. Solo lo que encuentres en la búsqueda; lo que no encuentres, déjalo vacío.',
        useSearch: true, // Activa Google Search Grounding
        proteus: { tarea: 'investigar', seleccion: await seleccionMunicipio(actor.municipality) },
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
        // "verified" solo lo puede afirmar una persona: lo que dice Gemini queda sin verificar
        socialHandlesFound: (parsed.socialHandles || []).map((h: { platform: string; handleOrUrl: string }) => ({ ...h, verified: false })),
        recentHeadlines: parsed.recentHeadlines || [],
        powerAssessment: parsed.powerAssessment || 'Sin dato: la búsqueda no lo devolvió.',
        contradictionAnalysis: parsed.contradictionAnalysis || 'Sin dato: la búsqueda no lo devolvió.'
      };
    } catch (error) {
      console.warn('Error o fallback en búsqueda OSINT para:', actor.name, error);

      // Fallback local enriquecido a partir de los datos maestros
      const fallbackSocials = [];
      if (actor.socialProfiles.xTwitter) {
        fallbackSocials.push({ platform: 'X (Twitter)', handleOrUrl: actor.socialProfiles.xTwitter, verified: false });
      }
      if (actor.socialProfiles.facebook) {
        fallbackSocials.push({ platform: 'Facebook', handleOrUrl: actor.socialProfiles.facebook, verified: false });
      }
      if (actor.socialProfiles.instagram) {
        fallbackSocials.push({ platform: 'Instagram', handleOrUrl: actor.socialProfiles.instagram, verified: false });
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
        // Sin búsqueda: solo lo que trae la ficha interna (AUXILIAR, sin verificar); nada de titulares de relleno
        searchedAt: `Sin búsqueda (${formatAiError(error)}): ficha interna auxiliar, sin verificar`,
        socialHandlesFound: fallbackSocials,
        recentHeadlines: fallbackNews,
        powerAssessment: `Ficha auxiliar: ${actor.name} opera en la esfera ${actor.sphere.toUpperCase()}, entre ${actor.municipalAnchor} y ${actor.extramunicipalConnection}.`,
        contradictionAnalysis: actor.dialecticalNotes || 'Sin dato.'
      };
    }
  }

  /**
   * Genera un brief dialéctico estratégico para que la campaña del candidato
   * sepa cómo aproximarse o competir frente a una Casa Política específica.
   */
  public static async generateTacticalCampaignBrief(house: PoliticalHouse, candidateName: string = perfilRegistrado()?.nombre || 'el candidato del perfil'): Promise<string> {
    const prompt = `
Genera un BRIEF TÁCTICO DE NEGOCIACIÓN Y DISPUTA ELECTORAL para la campaña de ${candidateName} frente a la siguiente Casa Política en Antioquia.
La ficha de la casa es AUXILIAR (tabla interna con fuentes de prensa sin verificar): preséntala así, y contrasta sus votos con los resultados oficiales de la macrofuente A. La postura del candidato frente a esta casa la decide su perfil (macrofuente B).

- Casa Política: ${house.name}
- Jefe Político: ${house.leader}
- Cuartel General: ${house.headquarters}
- Municipios Feudo: ${house.municipalitiesUnderInfluence.join(', ')}
- Votos 2023 según la ficha (auxiliar): ${house.totalVotes2023.toLocaleString('es-CO')}
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
        useSearch: false,
        proteus: { tarea: 'brief', seleccion: await seleccionMunicipio(house.headquarters) },
      });
      return brief;
    } catch (err: unknown) {
      // Antes: una "estrategia recomendada" de texto fijo. Ahora se avisa.
      return `No se pudo generar el brief con Gemini: ${formatAiError(err)}`;
    }
  }
}
