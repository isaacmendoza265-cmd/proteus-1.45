/**
 * TIPOS Y DEFINICIONES DE DATOS PARA EL OBSERVATORIO ELECTORAL DE CASAS POLÍTICAS
 * Proyecto Proteus - Protocolo PA-009
 */

export type HierarchyLevel = 
  | 1 // Nivel 1: Cúpula / Patriarca / Barón Político
  | 2 // Nivel 2: Poder Extramunicipal / Congreso Nacional (Senado / Cámara)
  | 3 // Nivel 3: Poder Departamental (Asamblea / Gobernación / Secretarías)
  | 4 // Nivel 4: Poder Municipal (Alcaldes / Concejales / Ex-candidatos oposición)
  | 5; // Nivel 5: Operadores Territoriales / Enlaces de Base / Contratistas

export type PowerSphere = 'municipal' | 'extramunicipal' | 'mixto';

export type RelationType = 
  | 'jerarquia_directa'     // Subordinación orgánica dentro de la casa
  | 'alianza_electoral'     // Acuerdo táctico de coalición para comicios
  | 'tension_disputa'       // Conflicto abierto, competencia de feudo o traición
  | 'pacto_bancada';        // Acuerdo de trámite en corporaciones públicas

export interface PoliticalHouse {
  id: string;
  name: string;
  leader: string;
  color: string;
  secondaryColor?: string;
  headquarters: string; // Municipio feudo central (ej: 'Itagüí', 'Bello', 'Medellín', 'Envigado')
  municipalitiesUnderInfluence: string[];
  totalVotes2023: number;
  dominantParties: string[];
  coreIdeology: string;
  description: string;
  dialecticalSummary: {
    thesis: string;      // Discurso oficial y narrativa de legitimación
    antithesis: string;  // Puntos ciegos, contradicciones y disputas internas
    synthesis: string;   // Realidad operativa y perspectiva hacia 2026
  };
  keyInstitutionsControlled: string[]; // Secretarías, ESEs, institutos descentralizados
}

export interface ActorSocialProfiles {
  xTwitter?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  linkedIn?: string | null;
  verifiedOfficial?: boolean;
}

export interface ActorNewsItem {
  title: string;
  source: string;
  url?: string;
  snippet?: string;
  year?: number;
  sentiment?: 'positivo' | 'neutro' | 'critico' | 'judicial';
}

export interface GraphNodeActor {
  id: string;
  name: string;
  alias?: string;
  role: string;             // 'senador', 'alcalde', 'representante', 'concejal', 'patriarca', 'diputado', etc.
  roleLabel: string;        // 'Senador de la República (2022-2026)', etc.
  partyId?: string;
  partyName?: string;
  houseId: string;
  houseName: string;
  level: HierarchyLevel;
  sphere: PowerSphere;
  municipality: string;     // 'Itagüí', 'Medellín', 'Bello', etc.
  department: string;
  votes2023?: number;
  cedula?: string;
  status: string;           // 'En funciones', 'Líder Histórico', 'Condenado / Inhabilitado', 'Candidato 2026'
  bio: string;
  extramunicipalConnection: string; // Cómo se conecta este actor con Bogotá o la Gobernación
  municipalAnchor: string;          // Dónde radica su base electoral en el municipio
  socialProfiles: ActorSocialProfiles;
  newsLinks: ActorNewsItem[];
  dialecticalNotes?: string;
  avatarUrl?: string;
}

export interface GraphEdgeRelation {
  id: string;
  source: string;           // ID del actor emisor
  target: string;           // ID del actor receptor
  type: RelationType;
  strength: number;         // 1 (débil) a 5 (inquebrantable)
  label: string;            // 'Jefe Político Directo', 'Pacto Presupuestal', etc.
  description: string;
}

export interface PoliticalGraphData {
  houses: PoliticalHouse[];
  nodes: GraphNodeActor[];
  edges: GraphEdgeRelation[];
}

export interface ActorOSINTReport {
  actorId: string;
  actorName: string;
  houseName: string;
  searchedAt: string;
  socialHandlesFound: {
    platform: string;
    handleOrUrl: string;
    verified: boolean;
  }[];
  recentHeadlines: {
    headline: string;
    source: string;
    dateOrSnippet: string;
  }[];
  powerAssessment: string;
  contradictionAnalysis: string;
}
