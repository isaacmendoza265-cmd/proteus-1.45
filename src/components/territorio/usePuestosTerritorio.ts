/**
 * Carga los puestos de un municipio con ficha (hoy Bello) y los ubica en sus comunas y en sus
 * barrios/veredas. No reparte ni estima: un puesto sin coordenadas queda "sin ubicar".
 */
import { useEffect, useState } from 'react';
import { MUNICIPAL_DIVISIONS_REGISTRY } from '../../data/geojson/municipalDivisions';
import {
  getMunicipio20k, loadPuestosMunicipio, asignarPuestosATerritorios, puntoEnTerritorio, type PuestoVotacion,
} from '../../services/pollingStationsService';
import { puestosConResultados, tieneFicha } from '../../services/territoryProfileService';
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

function ubicarResultados(dane: string, features: TerritoryGeoFeature[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const p of puestosConResultados(dane)) {
    if (p.lon == null || p.lat == null) continue;
    const f = features.find((x) => puntoEnTerritorio(p.lon!, p.lat!, x));
    if (f) out[p.codigo] = String(f.id);
  }
  return out;
}

const VACIO: PuestosTerritorio = { cargando: false, todos: [], sinUbicar: [], division: {}, subdivision: {}, resultadosDivision: {}, resultadosSubdivision: {} };

export function usePuestosTerritorio(muniId: string | null): PuestosTerritorio {
  const [estado, setEstado] = useState<PuestosTerritorio>(VACIO);
  useEffect(() => {
    const entry = muniId ? MUNICIPAL_DIVISIONS_REGISTRY[muniId] : undefined;
    const m = entry ? getMunicipio20k(entry.name) : undefined;
    if (!entry || !m) {
      setEstado(VACIO);
      return;
    }
    let activo = true;
    setEstado({ ...VACIO, cargando: true });
    Promise.all([loadPuestosMunicipio(m), entry.loadDivisions?.(), entry.loadSubdivisions?.()])
      .then(([puestos, divsCapa, subsCapa]) => {
        if (!activo) return;
        // Solo territorios con ficha (se descarta, p. ej., el contorno completo de Medellín)
        const divs = divsCapa && { ...divsCapa, features: divsCapa.features.filter((f) => tieneFicha(String(f.id))) };
        const subs = subsCapa && { ...subsCapa, features: subsCapa.features.filter((f) => tieneFicha(String(f.id))) };
        const a = asignarPuestosATerritorios(puestos, divs?.features ?? []);
        const b = asignarPuestosATerritorios(puestos, subs?.features ?? []);
        setEstado({
          cargando: false, todos: puestos, sinUbicar: a.sinCoordenadas, division: a.territorioDePuesto, subdivision: b.territorioDePuesto,
          resultadosDivision: ubicarResultados(entry.daneCode, divs?.features ?? []),
          resultadosSubdivision: ubicarResultados(entry.daneCode, subs?.features ?? []),
        });
      })
      .catch((err) => {
        console.error('No se pudieron cargar los puestos del municipio:', err);
        if (activo) setEstado(VACIO);
      });
    return () => { activo = false; };
  }, [muniId]);
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
