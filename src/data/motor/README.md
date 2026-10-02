# Datos que entran solos al motor de análisis

Todo JSON que se deje en esta carpeta entra al dossier de cada unidad territorial y, con él, a toda herramienta de IA de
Proteus (analista, generador, brief, evaluación de piezas, segmentos, publicidad...). No hace falta tocar código: basta
con volver a construir la app (`npm run build`) y desplegar.

```json
{
  "meta": {
    "titulo": "Homicidios por comuna (SISC)",
    "fuente": "Alcaldía de Medellín, Sistema de Información para la Seguridad y la Convivencia",
    "nivel": "oficial",
    "categoria": "seguridad",
    "corte": "2026-09-30",
    "nota": "Tasa por 100.000 habitantes"
  },
  "municipios":  { "05001": { "valores": { "Homicidios 2025": 391 } } },
  "territorios": { "comuna-14": { "lineas": ["Tasa 2025: 4,1 por 100.000"] } },
  "subregiones": { "Valle de Aburrá": { "lineas": ["..."] } },
  "departamento": { "lineas": ["..."] }
}
```

- `nivel`: `oficial` (archivo original de una entidad) o `auxiliar` (sin verificar). Lo auxiliar se presenta como tal y
  nunca contradice lo oficial.
- `categoria`: identificación, población, economía, estratificación, institucional, censo electoral, resultados
  electorales, seguridad, actores políticos, diagnóstico u otra.
- Claves: `municipios` por código DANE (`"05001"`); `territorios` por id de Proteus (`comuna-14`, `barrio-1411`,
  `bello-div-6`, `envigado-sub-B022`; están en `src/data/territorio/indiceTerritorios.json`).
- Un barrio también recibe lo de su comuna y de su municipio, rotulado.
- Datos grandes o con geometría: mejor un script en `scripts/` que genere aquí el JSON ya agregado por territorio.
- Nada de cédulas ni datos personales (AGENTS.md).
