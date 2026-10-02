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

const cachePuestos = new Map<string, Promise<PuestosTerritorio>>();

/**
 * Puestos de un municipio ubicados en sus comunas y barrios/veredas (los de 2026 y los de las elecciones con códigos
 * propios). Sin React, con caché por municipio: la usan la ficha (por el hook) y el dossier del analista.
 * @param muniId id del municipio en el índice de fichas
 * @param nombreMunicipio para los municipios sin cartografía interna (solo se cargan sus puestos)
 */
export function cargarPuestosTerritorio(muniId: string | null, nombreMunicipio?: string): Promise<PuestosTerritorio> {
  const clave = `${muniId ?? ''}|${nombreMunicipio ?? ''}`;
  if (!cachePuestos.has(clave)) {
    const p = construirPuestos(muniId, nombreMunicipio);
    p.catch(() => cachePuestos.delete(clave));
    cachePuestos.set(clave, p);
  }
  return cachePuestos.get(clave)!;
}

async function construirPuestos(muniId: string | null, nombreMunicipio?: string): Promise<PuestosTerritorio> {
  const entry = muniId ? MUNICIPAL_DIVISIONS_REGISTRY[muniId] : undefined;
  const m = entry ? getMunicipioConPuestos(entry.name) : nombreMunicipio ? getMunicipioConPuestos(nombreMunicipio) : undefined;
  // Solo territorios con ficha (se descarta, p. ej., el contorno completo de Medellín)
  const conFicha = <T extends { features: TerritoryGeoFeature[] }>(c: T | undefined) => c && { ...c, features: c.features.filter((f) => tieneFicha(String(f.id))) };
  if (!m) {
    // Municipio con cartografía pero sin puestos 2026 cargados: puede haber resultados 2023 por puesto con su
    // propia ubicación (Divipole 2023); se ubican igual.
    if (!entry) return VACIO;
    const [divsCapa, subsCapa, elecciones] = await Promise.all([entry.loadDivisions?.(), entry.loadSubdivisions?.(), cargarElecciones(entry.daneCode)]);
    const divs = conFicha(divsCapa), subs = conFicha(subsCapa);
    return { ...VACIO, resultadosDivision: ubicarResultados(elecciones, divs?.features ?? []), resultadosSubdivision: ubicarResultados(elecciones, subs?.features ?? []) };
  }
  // Sin cartografía interna: solo los puestos del municipio (todos cuentan en el municipio)
  if (!entry) return { ...VACIO, todos: await loadPuestosMunicipio(m) };
  const [puestos, divsCapa, subsCapa, elecciones] = await Promise.all([loadPuestosMunicipio(m), entry.loadDivisions?.(), entry.loadSubdivisions?.(), cargarElecciones(entry.daneCode)]);
  const divs = conFicha(divsCapa), subs = conFicha(subsCapa);
  const a = asignarPuestosATerritorios(puestos, divs?.features ?? []);
  const b = asignarPuestosATerritorios(puestos, subs?.features ?? []);
  return {
    cargando: false, todos: puestos, sinUbicar: divs?.features.length ? a.sinCoordenadas : [], division: a.territorioDePuesto, subdivision: b.territorioDePuesto,
    resultadosDivision: ubicarResultados(elecciones, divs?.features ?? []),
    resultadosSubdivision: ubicarResultados(elecciones, subs?.features ?? []),
  };
}

export function usePuestosTerritorio(muniId: string | null, nombreMunicipio?: string): PuestosTerritorio {
  const [estado, setEstado] = useState<PuestosTerritorio>(VACIO);
  useEffect(() => {
    if (!muniId && !nombreMunicipio) { setEstado(VACIO); return; }
    let activo = true;
    setEstado({ ...VACIO, cargando: true });
    cargarPuestosTerritorio(muniId, nombreMunicipio)
      .then((p) => { if (activo) setEstado(p); })
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
