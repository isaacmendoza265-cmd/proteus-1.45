import { PartyPowerNetwork, PowerActor, PowerHouseNode, PoliticalRole } from './types';

export interface RoleGroup {
  role: PoliticalRole;
  label: string;
  count: number;
  actors: PowerActor[];
}

export interface MunicipalityGroup {
  municipalityId: string;
  municipalityName: string;
  count: number;
  actors: PowerActor[];
}

export interface UnidentifiedStats {
  totalActorsInParty: number;
  identifiedCount: number;
  unidentifiedCount: number;
  identificationPercentage: number;
  unidentifiedPercentage: number;
  byRole: RoleGroup[];
  byMunicipality: MunicipalityGroup[];
  allUnidentifiedActors: PowerActor[];
}

// Special known party figures not tied to an identified house
export const SPECIAL_UNASSIGNED_ACTORS: Record<string, PowerActor[]> = {
  'centro-democratico': [
    {
      id: 'cd-unid-1',
      name: 'José Obdulio Gaviria Vélez',
      role: 'lider_historico',
      roleLabel: 'Líder Histórico',
      municipality: 'Nacional / Departamental',
      status: 'Líder Histórico e Ideólogo del Centro Democrático',
      notes: 'Exsenador y asesor presidencial, sin casa municipal asignada'
    },
    {
      id: 'cd-unid-2',
      name: 'Jorge Julián Osorio',
      role: 'concejal_reemplazo',
      roleLabel: 'Concejal de Medellín',
      municipality: 'Medellín',
      status: 'Posesionado tras renuncia de Claudia Carrasquilla Minami',
      notes: 'Ingresó al Concejo de Medellín por la bancada CD'
    },
    {
      id: 'cd-unid-3',
      name: 'Carlos Humberto García',
      role: 'diputado',
      roleLabel: 'Diputado de Antioquia',
      municipality: 'Departamental',
      status: 'Posesionado tras salida de Gregorio Orjuela de la Asamblea',
      subGroup: 'Subunidad Comunal',
      notes: 'Diputado en la Asamblea Departamental de Antioquia'
    },
    {
      id: 'cd-unid-4',
      name: 'Anderson Duque Morales',
      role: 'excandidato',
      roleLabel: 'Excandidato al Concejo',
      municipality: 'Medellín',
      status: 'Excandidato al Concejo de Medellín',
      subGroup: 'Subunidad Comunal',
      notes: 'Líder comunal del Centro Democrático'
    }
  ]
};

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .trim();
}

function nameMatches(nameA: string, nameB: string): boolean {
  const normA = normalizeString(nameA);
  const normB = normalizeString(nameB);
  if (normA === normB) return true;
  if (normA.includes(normB) || normB.includes(normA)) return true;

  const wordsA = normA.split(/\s+/).filter((w) => w.length > 2);
  const wordsB = normB.split(/\s+/).filter((w) => w.length > 2);

  // If at least 2 significant words match
  const matchingWords = wordsA.filter((w) => wordsB.includes(w));
  return matchingWords.length >= 2;
}

export function calculateUnidentifiedMetrics(party: PartyPowerNetwork): UnidentifiedStats {
  const houses = party.powerHouses || [];

  // Filter out any catch-all houses so we only look at explicitly identified power houses
  const identifiedHouses = houses.filter(
    (h) => h.id !== 'no-alineados' && !h.id.includes('desconocido') && !h.id.includes('liberales-no-alineados')
  );

  const identifiedActorsList = identifiedHouses.flatMap((h) => h.actors);
  const identifiedCount = identifiedActorsList.length;

  const unidentifiedActors: PowerActor[] = [];

  // 1. Check all councilors across all municipalities in the party
  party.presenceByMunicipality.forEach((mun) => {
    mun.councilors.forEach((c) => {
      const isIdentified = identifiedActorsList.some((act) => nameMatches(act.name, c.name));

      if (!isIdentified) {
        unidentifiedActors.push({
          id: `unid-${party.id}-${mun.municipalityId}-${normalizeString(c.name).replace(/\s+/g, '-')}`,
          name: c.name,
          role: c.isOppositionSeat ? 'concejal' : 'concejal',
          roleLabel: c.isOppositionSeat
            ? `Concejal de ${mun.municipalityName} (Oposición)`
            : `Concejal de ${mun.municipalityName}`,
          municipality: mun.municipalityName,
          status: c.isOppositionSeat ? 'Curul Ley 1909 Estatuto de Oposición' : 'En funciones',
          votes: c.votes,
          cedula: c.cedula,
          notes:
            c.notes ||
            `Concejal electo de ${mun.municipalityName} por ${party.shortName} (Casa política matriz por identificar)`
        });
      }
    });

    // Check if the mayor is from this party and if they are assigned
    if (mun.isMayorParty && mun.mayorName) {
      const mayorCleanName = mun.mayorName.split('(')[0].trim();
      const isIdentified = identifiedActorsList.some((act) => nameMatches(act.name, mayorCleanName));

      if (!isIdentified) {
        unidentifiedActors.push({
          id: `unid-mayor-${party.id}-${mun.municipalityId}`,
          name: mayorCleanName,
          role: 'alcalde',
          roleLabel: `Alcalde(sa) de ${mun.municipalityName}`,
          municipality: mun.municipalityName,
          status: 'Alcalde Electo 2024-2027',
          notes: mun.mayorName
        });
      }
    }
  });

  // 2. Add any special unassigned actors for this party
  const specialActors = SPECIAL_UNASSIGNED_ACTORS[party.id] || [];
  specialActors.forEach((spec) => {
    const isAlreadyIncluded = unidentifiedActors.some((a) => nameMatches(a.name, spec.name));
    const isIdentified = identifiedActorsList.some((act) => nameMatches(act.name, spec.name));
    if (!isAlreadyIncluded && !isIdentified) {
      unidentifiedActors.push(spec);
    }
  });

  // Calculate breakdown by Role
  const roleMap: Record<string, { label: string; role: PoliticalRole; actors: PowerActor[] }> = {
    concejal: { label: 'Concejales Electos', role: 'concejal', actors: [] },
    concejal_reemplazo: { label: 'Concejales Reemplazo', role: 'concejal_reemplazo', actors: [] },
    alcalde: { label: 'Alcaldes', role: 'alcalde', actors: [] },
    diputado: { label: 'Diputados', role: 'diputado', actors: [] },
    senador: { label: 'Senadores', role: 'senador', actors: [] },
    representante: { label: 'Representantes a la Cámara', role: 'representante', actors: [] },
    lider_historico: { label: 'Líderes Históricos', role: 'lider_historico', actors: [] },
    excandidato: { label: 'Excandidatos', role: 'excandidato', actors: [] },
    exalcalde: { label: 'Exalcaldes', role: 'exalcalde', actors: [] },
    exsenador: { label: 'Exsenadores', role: 'exsenador', actors: [] },
    gobernador: { label: 'Gobernador', role: 'gobernador', actors: [] }
  };

  unidentifiedActors.forEach((act) => {
    if (roleMap[act.role]) {
      roleMap[act.role].actors.push(act);
    } else {
      roleMap.concejal.actors.push(act);
    }
  });

  const byRole: RoleGroup[] = Object.values(roleMap)
    .filter((g) => g.actors.length > 0)
    .map((g) => ({
      role: g.role,
      label: g.label,
      count: g.actors.length,
      actors: g.actors
    }))
    .sort((a, b) => b.count - a.count);

  // Group by Municipality and sort alphabetically
  const municipalityMap: Record<string, PowerActor[]> = {};
  unidentifiedActors.forEach((act) => {
    const mun = act.municipality || 'Sin Municipio Específico';
    if (!municipalityMap[mun]) {
      municipalityMap[mun] = [];
    }
    municipalityMap[mun].push(act);
  });

  const byMunicipality: MunicipalityGroup[] = Object.keys(municipalityMap)
    .sort((a, b) => {
      // Put standard municipalities in alphabetical order, 'Departamental / Nacional' at the end
      if (a.includes('Nacional') || a.includes('Departamental')) return 1;
      if (b.includes('Nacional') || b.includes('Departamental')) return -1;
      return a.localeCompare(b, 'es');
    })
    .map((munName) => ({
      municipalityId: normalizeString(munName).replace(/\s+/g, '-'),
      municipalityName: munName,
      count: municipalityMap[munName].length,
      actors: municipalityMap[munName]
    }));

  const totalActors = identifiedCount + unidentifiedActors.length;
  const identificationPercentage =
    totalActors > 0 ? Math.round((identifiedCount / totalActors) * 1000) / 10 : 0;
  const unidentifiedPercentage =
    totalActors > 0 ? Math.round((unidentifiedActors.length / totalActors) * 1000) / 10 : 0;

  return {
    totalActorsInParty: totalActors,
    identifiedCount,
    unidentifiedCount: unidentifiedActors.length,
    identificationPercentage,
    unidentifiedPercentage,
    byRole,
    byMunicipality,
    allUnidentifiedActors: unidentifiedActors
  };
}
