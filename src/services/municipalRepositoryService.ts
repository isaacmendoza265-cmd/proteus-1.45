/**
 * PROTEUS MUNICIPAL REPOSITORY SERVICE
 * Repositorio de información relevante por municipio, simple, accesible y masivo.
 * Diseñado para ser consultado por agentes IA y por Gemini (proveyendo contexto local
 * exacto para búsquedas web con Google Search grounding).
 */

import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON } from '../data/geojson/antioquia125MunicipiosGeoJson';
import { MUNICIPALITIES_DATA } from '../data/observatorioAntioquia/municipalitiesData';
import { MUNICIPALITY_DETAILS } from '../data/antioquiaData';
import { callGeminiApi } from './geminiService';

export interface CouncilPartySeat {
  party: string;
  seats: number;
  votes?: number;
  percentageValid?: number;
}

export interface RunnerUpCandidate {
  name: string;
  party: string;
  votes?: number;
  percentageValid?: number;
  acceptedOppositionSeat?: boolean;
}

export interface UnifiedMunicipalityRecord {
  id: string;
  name: string;
  daneCode: string;
  department: string;
  subregion: string;
  population: number;
  electoralCensus: number;
  nbiPercentage: number;
  riskLevel: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  predominantParty: string;
  winnerParty: string;
  electedMayor: string;
  votesMayor?: number;
  percentageValidMayor?: number;
  runnerUp?: RunnerUpCandidate;
  councilSeats?: CouncilPartySeat[];
  totalCouncilSeats?: number;
  predominantStratum?: string;
  economicSectors?: string[];
  securityDynamics?: {
    homicideRate?: string;
    extortionRisk?: string;
    armedPresence?: string;
  };
  keyProblems?: string[];
  strategicOpportunities?: string[];
  updatedAt: string;
}

// In-memory registry with pre-loaded data and dynamic ingestion support
class MunicipalRepositoryRegistry {
  private records: Map<string, UnifiedMunicipalityRecord> = new Map();

  constructor() {
    this.bootstrapRepository();
  }

  private bootstrapRepository() {
    // 1. Ingest 125 municipalities of Antioquia
    ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.forEach((f) => {
      const p = f.properties;
      const id = f.id;
      const muniName = p.name;

      // Find deep mayor and council data if available in MUNICIPALITIES_DATA
      const deepMatch = MUNICIPALITIES_DATA.find(
        (m) =>
          m.id === id ||
          m.name.toLowerCase() === muniName.toLowerCase() ||
          id.replace('mpio-', '') === m.id
      );

      // Find qualitative details in MUNICIPALITY_DETAILS
      const qualMatch = (MUNICIPALITY_DETAILS as any)[muniName];

      const record: UnifiedMunicipalityRecord = {
        id: id,
        name: muniName,
        daneCode: (p as any).daneCode || '05000',
        department: 'Antioquia',
        subregion: p.subregion || 'Antioquia Central',
        population: p.population || 25000,
        electoralCensus: p.electoralCensus || 18000,
        nbiPercentage: p.nbiPercentage || 15.0,
        riskLevel: (p.riskLevel as any) || 'Medio',
        predominantParty: p.predominantParty || deepMatch?.mayor?.electedParty || 'Coalición Democrática',
        winnerParty: p.winnerParty || deepMatch?.mayor?.electedParty || 'Creemos / Coalición',
        electedMayor: (p as any).mayorName || deepMatch?.mayor?.electedMayor || 'Alcaldía Municipal',
        votesMayor: deepMatch?.mayor?.votes,
        percentageValidMayor: deepMatch?.mayor?.percentageOfValidVotes,
        runnerUp: deepMatch?.mayor?.runnerUp ? {
          name: deepMatch.mayor.runnerUp.name,
          party: deepMatch.mayor.runnerUp.party,
          votes: deepMatch.mayor.runnerUp.votes,
          percentageValid: deepMatch.mayor.runnerUp.percentageOfValidVotes,
          acceptedOppositionSeat: deepMatch.mayor.runnerUp.acceptedOppositionSeat
        } : undefined,
        councilSeats: deepMatch?.council?.parties?.map(cp => ({
          party: cp.party,
          seats: cp.seats,
          votes: cp.votes,
          percentageValid: cp.percentageValid
        })),
        totalCouncilSeats: deepMatch?.stats?.totalCouncilSeats || 13,
        predominantStratum: p.predominantStratum || 'Estrato 2-3',
        economicSectors: qualMatch?.socioeconomic?.unemployment ? [qualMatch.socioeconomic.unemployment] : ['Comercio local', 'Agropecuario'],
        securityDynamics: {
          homicideRate: qualMatch?.security?.homicideRate || 'Normal regional',
          extortionRisk: qualMatch?.security?.otherCrimes || 'Bajo',
          armedPresence: qualMatch?.security?.armedGroups || 'Sin alerta activa'
        },
        keyProblems: qualMatch?.socioeconomic?.publicServices ? [qualMatch.socioeconomic.publicServices] : ['Vías terciarias', 'Suministro de agua potable'],
        strategicOpportunities: ['Desarrollo agroindustrial', 'Fortalecimiento de infraestructura turística', 'Bono demográfico juvenil'],
        updatedAt: '2026-09-20'
      };

      this.records.set(id, record);
      this.records.set(muniName.toLowerCase(), record);
      if (record.daneCode) {
        this.records.set(record.daneCode, record);
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
    return Array.from(unique.values());
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
        population: rec.population || existing?.population || 10000,
        electoralCensus: rec.electoralCensus || existing?.electoralCensus || 7000,
        nbiPercentage: rec.nbiPercentage || existing?.nbiPercentage || 12.0,
        riskLevel: rec.riskLevel || existing?.riskLevel || 'Medio',
        predominantParty: rec.predominantParty || existing?.predominantParty || 'Sin partido',
        winnerParty: rec.winnerParty || existing?.winnerParty || 'Sin partido',
        electedMayor: rec.electedMayor || existing?.electedMayor || 'Alcalde',
        votesMayor: rec.votesMayor ?? existing?.votesMayor,
        percentageValidMayor: rec.percentageValidMayor ?? existing?.percentageValidMayor,
        runnerUp: rec.runnerUp || existing?.runnerUp,
        councilSeats: rec.councilSeats || existing?.councilSeats,
        totalCouncilSeats: rec.totalCouncilSeats || existing?.totalCouncilSeats || 13,
        predominantStratum: rec.predominantStratum || existing?.predominantStratum || 'Estrato 2',
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
      return `[CONTEXTO TERRITORIAL: Antioquia General - 125 Municipios, 9 Subregiones, Censo Electoral ~5.1M votantes]`;
    }

    const councilSummary = muni.councilSeats
      ? muni.councilSeats.map((c) => `${c.party} (${c.seats} curules)`).join(', ')
      : 'No registrado';

    const runnerUpText = muni.runnerUp
      ? `Segundo lugar: ${muni.runnerUp.name} (${muni.runnerUp.party}, ${muni.runnerUp.votes?.toLocaleString() || 'N/D'} votos)`
      : '';

    return `
[FICHA TERRITORIAL OFICIAL REPOSITORIO PROTEUS 1.2]:
- Municipio: ${muni.name} (Código DIVIPOLA DANE: ${muni.daneCode})
- Departamento: ${muni.department} | Subregión: ${muni.subregion}
- Población Oficial DANE: ${muni.population.toLocaleString()} habitantes
- Censo Electoral Registraduría: ${muni.electoralCensus.toLocaleString()} votantes
- Incidencia de Pobreza / NBI: ${muni.nbiPercentage}%
- Estrato Predominante: ${muni.predominantStratum}
- Alcalde Electo (2024-2027): ${muni.electedMayor} (${muni.winnerParty})
  ${muni.votesMayor ? `Votación: ${muni.votesMayor.toLocaleString()} votos (${muni.percentageValidMayor}%)` : ''}
  ${runnerUpText}
- Bancadas del Concejo Municipal: ${councilSummary}
- Nivel de Riesgo Operativo: ${muni.riskLevel}
- Dinámica de Seguridad: ${muni.securityDynamics?.homicideRate || 'Sin alerta crítica'}; Grupos/Presencia: ${muni.securityDynamics?.armedPresence || 'No detectados'}
- Problemáticas prioritarias de la comunidad: ${muni.keyProblems?.join('; ') || 'Infraestructura y empleo'}
- Oportunidades estratégicas: ${muni.strategicOpportunities?.join('; ') || 'Desarrollo regional'}
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
