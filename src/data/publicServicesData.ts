export interface ServiceStats {
  service: string;
  urban: number; // % of municipalities with > 75% coverage
  rural: number; // % of municipalities with low coverage (usually <= 30% or < 45%)
  description: string;
}

export const NATIONAL_COVERAGE_STATS: ServiceStats[] = [
  {
    service: "Acueducto",
    urban: 87.85,
    rural: 55.5,
    description: "El 87.85% de los municipios (969) presentan una cobertura urbana mayor al 75%. En contraste, el 55.5% del país (613 municipios) presenta una cobertura rural menor al 45%."
  },
  {
    service: "Alcantarillado",
    urban: 75.83,
    rural: 75.15,
    description: "El 75.83% de los municipios (852) presentan una cobertura urbana mayor al 75%. En la zona rural, el 75.15% del país (829 municipios) presenta coberturas menores al 30%."
  },
  {
    service: "Aseo",
    urban: 87.00,
    rural: 71.70,
    description: "El 87% de los municipios (960) presentan una cobertura urbana mayor al 75%. En el asentamiento rural, el 71.7% del país (791 municipios) presenta coberturas menores o iguales al 30%."
  }
];

export const NBI_INSIGHTS = [
  {
    title: "Relación NBI vs Cobertura",
    content: "Existe una correlación directa entre la falta de servicios públicos y la propensión a la miseria. Municipios con coberturas urbanas de acueducto mayores al 75% suelen tener propensiones a la miseria entre 0% y 5%."
  },
  {
    title: "Casos Críticos",
    content: "Capitales como Quibdó, Santa Marta, San Andrés, Leticia, Puerto Inírida y San José del Guaviare presentan coberturas urbanas de acueducto y alcantarillado por debajo del 50%."
  },
  {
    title: "Brecha Rural",
    content: "La zona rural dispersa presenta el mayor rezago, con 643 municipios con coberturas de alcantarillado menores al 15% y 561 municipios con coberturas de aseo por debajo del 15%."
  }
];
