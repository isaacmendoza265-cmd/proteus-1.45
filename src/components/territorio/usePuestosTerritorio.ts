/**
 * Carga los puestos de un municipio con ficha y los ubica en sus comunas y en sus barrios/veredas;
 * también ubica los puestos de 2023 que tienen resultados. No reparte ni estima: un puesto sin coordenadas queda "sin ubicar".
 */
import { useEffect, useState } from 'react';
import { MUNICIPAL_DIVISIONS_REGISTRY } from '../../data/geojson/municipalDivisions';
import {
  getMunicipioConPuestos, loadPuestosMunicipio, asignarPuestosATerritorios, puntoEnTerritorio, type PuestoVotacion,
} from '../../services/pollingStationsService';
import { tieneFicha } from '../../services/territoryProfileService';
import { cargarElecciones, type EleccionPuestos } from '../../services/electionResultsService';
import type { TerritoryGeoFeature } from '../../data/geojson/types';

export interface PuestosTerritorio {
  cargando: boolean;
  todos: PuestoVotacion[];
  sinUbicar: PuestoVotacion[];
  /** codPuesto -> id de comuna/zona */
  division: Record<string, string>;
  /** codPuesto -> id de barrio/vereda */
  subdivision: Record<string, string>;
  /** Puestos de elecciones con códigos propios (2023 y la serie 2015-2022), ubicados por sus
   *  coordenadas: "<año de los códigos>|<código>" -> id de comuna/zona y de barrio/vereda */
  resultadosDivision: Record<string, string>;
  resultadosSubdivision: Record<string, string>;
}

/** Ubica los puestos de las elecciones con códigos propios en los territorios de una capa */
function ubicarResultados(elecciones: EleccionPuestos[], features: TerritoryGeoFeature[]): Record<string, string> {
  const out: Record<string, string> = {};
  const vistos = new Set<string>();
  for (const e of elecciones) {
    if (e.codigos === '2026' || !e.ubicaciones || vistos.has(e.codigos)) continue;
    vistos.add(e.codigos);
    for (const [codigo, u] of Object.entries(e.ubicaciones)) {
      const f = features.find((x) => puntoEnTerritorio(u.lon, u.lat, x));
      if (f) out[`${e.codigos}|${codigo}`] = String(f.id);
    }
  }
  return out;
}

const VACIO: PuestosTerritorio = { cargando: false, todos: [], sinUbicar: [], division: {}, subdivision: {}, resultadosDivision: {}, resultadosSubdivision: {} };

/**
 * @param muniId id del municipio en el índice de fichas
 * @param nombreMunicipio para los municipios sin cartografía interna (solo se cargan sus puestos)
 */
export function usePuestosTerritorio(muniId: string | null, nombreMunicipio?: string): PuestosTerritorio {
  const [estado, setEstado] = useState<PuestosTerritorio>(VACIO);
  useEffect(() => {
    const entry = muniId ? MUNICIPAL_DIVISIONS_REGISTRY[muniId] : undefined;
    const m = entry ? getMunicipioConPuestos(entry.name) : nombreMunicipio ? getMunicipioConPuestos(nombreMunicipio) : undefined;
    if (!m) {
      // Municipio con cartografía pero sin puestos 2026 cargados: puede haber resultados 2023 por
      // puesto con su propia ubicación (Divipole 2023); se ubican igual. (Desde el 27-sep los 79
      // municipios de fase C sí tienen puestos 2026: getMunicipioConPuestos los encuentra.)
      if (!entry) {
        setEstado(VACIO);
        return;
      }
      let activo = true;
      setEstado({ ...VACIO, cargando: true });
      Promise.all([entry.loadDivisions?.(), entry.loadSubdivisions?.(), cargarElecciones(entry.daneCode)])
        .then(([divsCapa, subsCapa, elecciones]) => {
          if (!activo) return;
          const divs = divsCapa && { ...divsCapa, features: divsCapa.features.filter((f) => tieneFicha(String(f.id))) };
          const subs = subsCapa && { ...subsCapa, features: subsCapa.features.filter((f) => tieneFicha(String(f.id))) };
          setEstado({
            ...VACIO, cargando: false,
            resultadosDivision: ubicarResultados(elecciones, divs?.features ?? []),
            resultadosSubdivision: ubicarResultados(elecciones, subs?.features ?? []),
          });
        })
        .catch((err) => {
          console.error('No se pudieron cargar los resultados 2023 del municipio:', err);
          if (activo) setEstado(VACIO);
        });
      return () => { activo = false; };
    }
    if (!entry) {
      // Sin cartografía interna: solo los puestos del municipio
      let activo = true;
      setEstado({ ...VACIO, cargando: true });
      loadPuestosMunicipio(m).then((puestos) => {
        // Sin comunas con ficha no hay dónde ubicarlos: todos cuentan en el municipio
        if (activo) setEstado({ ...VACIO, todos: puestos });
      }).catch(() => { if (activo) setEstado(VACIO); });
      return () => { activo = false; };
    }
    let activo = true;
    setEstado({ ...VACIO, cargando: true });
    Promise.all([loadPuestosMunicipio(m), entry.loadDivisions?.(), entry.loadSubdivisions?.(), cargarElecciones(entry.daneCode)])
      .then(([puestos, divsCapa, subsCapa, elecciones]) => {
        if (!activo) return;
        // Solo territorios con ficha (se descarta, p. ej., el contorno completo de Medellín)
        const divs = divsCapa && { ...divsCapa, features: divsCapa.features.filter((f) => tieneFicha(String(f.id))) };
        const subs = subsCapa && { ...subsCapa, features: subsCapa.features.filter((f) => tieneFicha(String(f.id))) };
        const a = asignarPuestosATerritorios(puestos, divs?.features ?? []);
        const b = asignarPuestosATerritorios(puestos, subs?.features ?? []);
        setEstado({
          cargando: false, todos: puestos, sinUbicar: divs?.features.length ? a.sinCoordenadas : [], division: a.territorioDePuesto, subdivision: b.territorioDePuesto,
          resultadosDivision: ubicarResultados(elecciones, divs?.features ?? []),
          resultadosSubdivision: ubicarResultados(elecciones, subs?.features ?? []),
        });
      })
      .catch((err) => {
        console.error('No se pudieron cargar los puestos del municipio:', err);
        if (activo) setEstado(VACIO);
      });
    return () => { activo = false; };
  }, [muniId, nombreMunicipio]);
  return estado;
}

/** Puestos dentro de un territorio de la ficha */
export function puestosDe(p: PuestosTerritorio, tipo: 'municipio' | 'division' | 'subdivision', id: string): PuestoVotacion[] {
  if (tipo === 'municipio') return p.todos.filter((x) => !p.sinUbicar.includes(x));
  const mapa = tipo === 'division' ? p.division : p.subdivision;
  return p.todos.filter((x) => mapa[x.codPuesto] === id);
}

/** Claves "<año>|<código>" de los puestos con resultados (códigos propios) dentro de un territorio */
export function codigosResultadosDe(p: PuestosTerritorio, tipo: 'municipio' | 'division' | 'subdivision', id: string): string[] {
  if (tipo === 'municipio') return [];
  const mapa = tipo === 'division' ? p.resultadosDivision : p.resultadosSubdivision;
  return Object.keys(mapa).filter((c) => mapa[c] === id);
}
