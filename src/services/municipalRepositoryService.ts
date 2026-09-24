/**
 * PROTEUS MUNICIPAL REPOSITORY SERVICE
 * Repositorio de información relevante por municipio, simple, accesible y masivo.
 * Diseñado para ser consultado por agentes IA y por Gemini (proveyendo contexto local
 * exacto para búsquedas web con Google Search grounding).
 * 
 * Ingesta los 125 Municipios Oficiales de Antioquia con información auténtica:
 * - Censo DANE & Censo Electoral Registraduría
 * - Mandatarios 2024-2027 (Gobernación de Antioquia) & Partidos/Coaliciones
 * - Bancadas y curules del Concejo Municipal
 * - Indicadores NBI y vulnerabilidad socioeconómica
 * - Dinámica de seguridad (actores armados, extorsión, homicidios)
 * - Vocaciones económicas e inteligencia electoral estratégica
 */

import { 
  ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA, 
  UnifiedMunicipalityRecord,
  CouncilPartySeat,
  RunnerUpCandidate
} from '../data/antioquia125MunicipalitiesMasterData';
import { callGeminiApi } from './geminiService';
import { CENSUS_SOURCE_LABEL, formatCensus, getDepartmentCensus, getMunicipalCensus } from './electoralCensusService';

export type { UnifiedMunicipalityRecord, CouncilPartySeat, RunnerUpCandidate };

// In-memory registry with pre-loaded data and dynamic ingestion support
class MunicipalRepositoryRegistry {
  private records: Map<string, UnifiedMunicipalityRecord> = new Map();

  constructor() {
    this.bootstrapRepository();
  }

  private bootstrapRepository() {
    // Ingest all 125 municipalities of Antioquia with 100% verified master data
    ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA.forEach((rec) => {
      this.records.set(rec.id, rec);
      this.records.set(rec.name.toLowerCase(), rec);
      if (rec.daneCode) {
        this.records.set(rec.daneCode, rec);
      }
    });
  }

  public getMunicipality(query: string): UnifiedMunicipalityRecord | null {
    if (!query) return null;
    const q = query.trim().toLowerCase();
    if (this.records.has(q)) {
      return this.records.get(q)!;
    }
    // Partial search
    for (const [key, val] of this.records.entries()) {
      if (key.includes(q) || val.name.toLowerCase().includes(q)) {
        return val;
      }
    }
    return null;
  }

  public getAll(): UnifiedMunicipalityRecord[] {
    // Unique by daneCode or ID
    const unique = new Map<string, UnifiedMunicipalityRecord>();
    for (const r of this.records.values()) {
      unique.set(r.daneCode || r.id, r);
    }
    return Array.from(unique.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  public search(query: string): UnifiedMunicipalityRecord[] {
    if (!query.trim()) return this.getAll();
    const q = query.toLowerCase();
    const all = this.getAll();
    return all.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.subregion.toLowerCase().includes(q) ||
        m.daneCode.includes(q) ||
        m.electedMayor.toLowerCase().includes(q) ||
        m.winnerParty.toLowerCase().includes(q) ||
        m.predominantParty.toLowerCase().includes(q)
    );
  }

  /**
   * Ingest new custom data for any municipality (Extensibility API for developers)
   */
  public ingest(records: Partial<UnifiedMunicipalityRecord>[]): { success: boolean; count: number } {
    let count = 0;
    records.forEach((rec) => {
      if (!rec.id && !rec.name) return;
      const key = (rec.id || rec.name!).toLowerCase();
      const existing = this.getMunicipality(key);
      const updated: UnifiedMunicipalityRecord = {
        id: rec.id || existing?.id || `mpio-${Date.now()}`,
        name: rec.name || existing?.name || 'Municipio',
        daneCode: rec.daneCode || existing?.daneCode || '05000',
        department: rec.department || existing?.department || 'Antioquia',
        subregion: rec.subregion || existing?.subregion || 'General',
        subregionId: rec.subregionId || existing?.subregionId || 'general',
        category: rec.category || existing?.category || '6',
        population: rec.population || existing?.population || 10000,
        // El censo oficial prevalece sobre lo que se ingrese a mano
        electoralCensus:
          getMunicipalCensus(rec.daneCode || existing?.daneCode || rec.name || existing?.name || '')?.total ??
          rec.electoralCensus ??
          existing?.electoralCensus ??
          0,
        nbiPercentage: rec.nbiPercentage || existing?.nbiPercentage || 12.0,
        areaKm2: rec.areaKm2 || existing?.areaKm2 || 100.0,
        predominantStratum: rec.predominantStratum || existing?.predominantStratum || 'Estrato 1 y 2',
        riskLevel: rec.riskLevel || existing?.riskLevel || 'Medio',
        predominantParty: rec.predominantParty || existing?.predominantParty || 'Sin partido',
        winnerParty: rec.winnerParty || existing?.winnerParty || 'Sin partido',
        electedMayor: rec.electedMayor || existing?.electedMayor || 'Alcalde',
        mayorTitle: rec.mayorTitle || existing?.mayorTitle || 'Alcalde',
        contact: rec.contact || existing?.contact || { phone: 'PBX Municipal', email: 'alcaldia@antioquia.gov.co' },
        votesMayor: rec.votesMayor ?? existing?.votesMayor,
        percentageValidMayor: rec.percentageValidMayor ?? existing?.percentageValidMayor,
        runnerUp: rec.runnerUp || existing?.runnerUp,
        councilSeats: rec.councilSeats || existing?.councilSeats,
        totalCouncilSeats: rec.totalCouncilSeats || existing?.totalCouncilSeats || 11,
        economicSectors: rec.economicSectors || existing?.economicSectors || [],
        securityDynamics: rec.securityDynamics || existing?.securityDynamics || {},
        keyProblems: rec.keyProblems || existing?.keyProblems || [],
        strategicOpportunities: rec.strategicOpportunities || existing?.strategicOpportunities || [],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      this.records.set(updated.id, updated);
      this.records.set(updated.name.toLowerCase(), updated);
      if (updated.daneCode) {
        this.records.set(updated.daneCode, updated);
      }
      count++;
    });

    return { success: true, count };
  }

  /**
   * Generates a rich, structured context block for Gemini.
   * This is fed into Gemini prompts or Google Search Grounding to anchor
   * web search and analytical synthesis in real municipal indicators.
   */
  public buildContextPrompt(queryOrId: string): string {
    const muni = this.getMunicipality(queryOrId);
    if (!muni) {
      return `[CONTEXTO TERRITORIAL: Antioquia General - 125 Municipios, 9 Subregiones, Censo Electoral ${formatCensus(getDepartmentCensus('antioquia')?.total ?? 0)} votantes (${CENSUS_SOURCE_LABEL})]`;
    }

    const councilSummary = muni.councilSeats && muni.councilSeats.length > 0
      ? muni.councilSeats.map((c) => `${c.party} (${c.seats} curules)`).join(', ')
      : 'Bancadas multipartidistas';

    const runnerUpText = muni.runnerUp
      ? `Segundo lugar: ${muni.runnerUp.name} (${muni.runnerUp.party}, ${muni.runnerUp.votes?.toLocaleString() || 'N/D'} votos, ${muni.runnerUp.percentageValid || 'N/D'}%)`
      : '';

    const contactText = muni.contact
      ? `Contacto Oficial: Tel. ${muni.contact.phone} | Email: ${muni.contact.email}`
      : '';

    return `
[FICHA TERRITORIAL OFICIAL REPOSITORIO PROTEUS 1.2]:
- Municipio: ${muni.name} (Código DIVIPOLA DANE: ${muni.daneCode})
- Departamento: ${muni.department} | Subregión: ${muni.subregion} (Categoría: ${muni.category})
- Población Oficial DANE: ${muni.population.toLocaleString()} habitantes
- Censo Electoral Registraduría: ${muni.electoralCensus.toLocaleString('es-CO')} sufragantes (${CENSUS_SOURCE_LABEL})
- Incidencia de Pobreza / NBI: ${muni.nbiPercentage}%
- Extensión Territorial: ${muni.areaKm2 ? `${muni.areaKm2} km²` : 'N/D'}
- Estrato Predominante: ${muni.predominantStratum}
- Mandatario Local (2024-2027): ${muni.electedMayor} (${muni.winnerParty})
  ${muni.votesMayor ? `Votación: ${muni.votesMayor.toLocaleString()} votos (${muni.percentageValidMayor}%)` : ''}
  ${runnerUpText ? `${runnerUpText}` : ''}
  ${contactText ? `${contactText}` : ''}
- Bancadas del Concejo Municipal (${muni.totalCouncilSeats || 11} Curules): ${councilSummary}
- Nivel de Riesgo Operativo: ${muni.riskLevel}
- Tasa de Homicidios: ${muni.securityDynamics?.homicideRate || 'Normal subregional'}
- Extorsión y Delitos: ${muni.securityDynamics?.extortionRisk || 'Moderado'}
- Actores Armados / Presencia: ${muni.securityDynamics?.armedPresence || 'Bajo control de la fuerza pública'}
- Vocaciones Económicas Principales: ${muni.economicSectors?.join(', ') || 'Agropecuario y comercio'}
- Problemáticas prioritarias de la comunidad: ${muni.keyProblems?.join('; ') || 'Infraestructura y empleo'}
- Oportunidades estratégicas (Campaña / Gobernanza): ${muni.strategicOpportunities?.join('; ') || 'Desarrollo regional'}
    `.trim();
  }
}

export const municipalRepository = new MunicipalRepositoryRegistry();

/**
 * Enhanced Gemini query with automatic municipal context injection and optional Google Search
 */
export async function queryGeminiWithMunicipalContext(options: {
  municipalityIdOrName: string;
  userPrompt: string;
  candidateProfileContext?: string;
  useGoogleSearch?: boolean;
}): Promise<{ text: string; contextUsed: string }> {
  const contextBlock = municipalRepository.buildContextPrompt(options.municipalityIdOrName);
  
  const candidateContext = options.candidateProfileContext 
    ? `\n\n[PERFIL DEL CANDIDATO ACTIVO]:\n${options.candidateProfileContext}`
    : '';

  const systemInstruction = `Eres el Agente Estratégico de Proyecto Proteus.
Usa obligatoriamente los datos territoriales oficiales provistos en la FICHA TERRITORIAL del Repositorio Proteus.
Si el usuario requiere contrastar con eventos recientes en internet, mantén siempre la consistencia con las cifras oficiales de población, censo electoral y gobierno local aquí consignadas.
Todos los análisis, recomendaciones o briefs deben ser hiper-específicos al municipio consultado y alineados con el perfil del candidato.`;

  const fullPrompt = `${contextBlock}${candidateContext}\n\n[CONSULTA DEL USUARIO]:\n${options.userPrompt}`;

  const text = await callGeminiApi({
    promptText: fullPrompt,
    systemInstruction,
    useSearch: options.useGoogleSearch ?? true
  });

  return { text, contextUsed: contextBlock };
}
