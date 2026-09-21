export interface DemographicCombination {
  id: string;
  label: string;
  grupoEtario: string;
  sexo: string;
  nivelEducativo: string;
  estrato: string;
  category: string;
}

export const GRUPOS_ETARIOS = [
  { id: 'jovenes', label: 'Jóvenes (15 a 29 años)' },
  { id: 'adultos', label: 'Adultos (30 a 59 años)' },
  { id: 'mayores', label: 'Adultos Mayores (60+ años)' }
];

export const GENEROS = [
  { id: 'mujeres', label: 'Mujeres' },
  { id: 'hombres', label: 'Hombres' }
];

export const NIVELES_EDUCATIVOS = [
  { id: 'primaria', label: 'Primaria / Básica' },
  { id: 'secundaria', label: 'Secundaria / Media' },
  { id: 'tecnico', label: 'Técnico / Tecnológico' },
  { id: 'universitario', label: 'Universitario / Posgrado' }
];

export const ESTRATOS = [
  { id: 'bajo', label: 'Estrato 1-2 (Bajo)' },
  { id: 'medio', label: 'Estrato 3-4 (Medio)' },
  { id: 'alto', label: 'Estrato 5-6 (Alto)' }
];

export const TIPOS_ELECCION = [
  { id: 'alcaldia', label: 'c) Alcaldía', title: 'Alcaldía Municipal', desc: 'Poder Ejecutivo Local' },
  { id: 'concejo', label: 'b) Concejo', title: 'Concejo Municipal', desc: 'Curules y listas locales' },
  { id: 'asamblea', label: 'a) Asamblea', title: 'Asamblea Departamental', desc: 'Curules de Antioquia' },
  { id: 'gobernacion', label: 'd) Gobernación', title: 'Gobernación de Antioquia', desc: 'Liderazgo Departamental' }
];

// Generate all combined demographic permutations
export function generateAllDemographicCombinations(): DemographicCombination[] {
  const combos: DemographicCombination[] = [];

  for (const etario of GRUPOS_ETARIOS) {
    for (const sexo of GENEROS) {
      for (const edu of NIVELES_EDUCATIVOS) {
        for (const est of ESTRATOS) {
          const id = `${sexo.id}-${etario.id}-${edu.id}-${est.id}`;
          const label = `${sexo.label} • ${etario.label} • ${edu.label} • ${est.label}`;
          combos.push({
            id,
            label,
            grupoEtario: etario.label,
            sexo: sexo.label,
            nivelEducativo: edu.label,
            estrato: est.label,
            category: `${etario.label} - ${sexo.label}`
          });
        }
      }
    }
  }

  return combos;
}

export const ALL_DEMOGRAPHIC_COMBINATIONS = generateAllDemographicCombinations();
