/**
 * Carga los puestos de un municipio con ficha y los ubica en sus comunas y en sus barrios/veredas;
 * también ubica los puestos de 2023 que tienen resultados. No reparte ni estima: un puesto sin coordenadas queda "sin ubicar".
 */
import { useEffect, useState } from 'react';
import { MUNICIPAL_DIVISIONS_REGISTRY } from '../../data/geojson/municipalDivisions';
import {
  getMunicipio20k, loadPuestosMunicipio, asignarPuestosATerritorios, puntoEnTerritorio, type PuestoVotacion,
} from '../../services/pollingStationsService';
import { tieneFicha } from '../../services/territoryProfileService';
import { cargarElecciones } from '../../services/electionResultsService';
import type { TerritoryGeoFeature } from '../../data/geojson/types';

export interface PuestosTerritorio {
  cargando: boolean;
  todos: PuestoVotacion[];
  sinUbicar: PuestoVotacion[];
  /** codPuesto -> id de comuna/zona */
  division: Record<string, string>;
  /** codPuesto -> id de barrio/vereda */
  subdivision: Record<string, string>;
  /** Puestos de 2023 con resultados: código 2023 -> id de comuna/zona y de barrio/vereda */
  resultadosDivision: Record<string, string>;
  resultadosSubdivision: Record<string, string>;
}

/** Ubica los puestos de 2023 (con coordenadas de la Divipole 2023) en los territorios de una capa */
function ubicarResultados(ubicaciones: Record<string, { lat: number; lon: number }>, features: TerritoryGeoFeature[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [codigo, u] of Object.entries(ubicaciones)) {
    const f = features.find((x) => puntoEnTerritorio(u.lon, u.lat, x));
    if (f) out[codigo] = String(f.id);
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
    const m = entry ? getMunicipio20k(entry.name) : nombreMunicipio ? getMunicipio20k(nombreMunicipio) : undefined;
    if (!m) {
      // Municipio con 20.000 votantes o menos (fase C): no hay censo 2026 por puesto con coordenadas
      // (build_puestos_20k.py se limita a los municipios de más de 20.000), pero sí puede haber
      // resultados 2023 por puesto con su propia ubicación (Divipole 2023): se ubican igual, para
      // que el municipio y sus comunas/barrios muestren la Alcaldía y el Concejo 2023.
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
          const ub = elecciones.find((e) => e.codigos === '2023')?.ubicaciones ?? {};
          setEstado({
            ...VACIO, cargando: false,
            resultadosDivision: ubicarResultados(ub, divs?.features ?? []),
            resultadosSubdivision: ubicarResultados(ub, subs?.features ?? []),
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
        const ub = elecciones.find((e) => e.codigos === '2023')?.ubicaciones ?? {};
        const a = asignarPuestosATerritorios(puestos, divs?.features ?? []);
        const b = asignarPuestosATerritorios(puestos, subs?.features ?? []);
        setEstado({
          cargando: false, todos: puestos, sinUbicar: divs?.features.length ? a.sinCoordenadas : [], division: a.territorioDePuesto, subdivision: b.territorioDePuesto,
          resultadosDivision: ubicarResultados(ub, divs?.features ?? []),
          resultadosSubdivision: ubicarResultados(ub, subs?.features ?? []),
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

/** Códigos 2023 de los puestos con resultados dentro de un territorio */
export function codigosResultadosDe(p: PuestosTerritorio, tipo: 'municipio' | 'division' | 'subdivision', id: string): string[] {
  if (tipo === 'municipio') return [];
  const mapa = tipo === 'division' ? p.resultadosDivision : p.resultadosSubdivision;
  return Object.keys(mapa).filter((c) => mapa[c] === id);
}
