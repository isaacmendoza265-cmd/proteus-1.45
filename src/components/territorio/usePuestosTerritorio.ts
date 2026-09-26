/**
 * Carga los puestos de un municipio con ficha (hoy Bello) y los ubica en sus comunas y en sus
 * barrios/veredas. No reparte ni estima: un puesto sin coordenadas queda "sin ubicar".
 */
import { useEffect, useState } from 'react';
import { MUNICIPAL_DIVISIONS_REGISTRY } from '../../data/geojson/municipalDivisions';
import {
  getMunicipio20k, loadPuestosMunicipio, asignarPuestosATerritorios, type PuestoVotacion,
} from '../../services/pollingStationsService';

export interface PuestosTerritorio {
  cargando: boolean;
  todos: PuestoVotacion[];
  sinUbicar: PuestoVotacion[];
  /** codPuesto -> id de comuna/zona */
  division: Record<string, string>;
  /** codPuesto -> id de barrio/vereda */
  subdivision: Record<string, string>;
}

const VACIO: PuestosTerritorio = { cargando: false, todos: [], sinUbicar: [], division: {}, subdivision: {} };

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
      .then(([puestos, divs, subs]) => {
        if (!activo) return;
        const a = asignarPuestosATerritorios(puestos, divs?.features ?? []);
        const b = asignarPuestosATerritorios(puestos, subs?.features ?? []);
        setEstado({ cargando: false, todos: puestos, sinUbicar: a.sinCoordenadas, division: a.territorioDePuesto, subdivision: b.territorioDePuesto });
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
