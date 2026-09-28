import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Search, Vote, AlertTriangle } from 'lucide-react';
import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON, type TerritoryGeoFeature, type ZoomLevelId } from '../../data/geojson';
import { MUNICIPAL_DIVISIONS_REGISTRY, MunicipalDivisionEntry } from '../../data/geojson/municipalDivisions';
import { SubregionAggregationEngine } from '../../services/subregionAggregationEngine';
import {
  AsignacionPuestos,
  Municipio20k,
  MUNICIPIOS_CON_PUESTOS,
  PUESTOS_META,
  PuestoVotacion,
  asignarPuestosATerritorios,
  describirCruce,
  getMunicipioConPuestos,
  getMunicipiosConPuestosDepartamento,
  loadPuestosMunicipio,
  loadTodosPuestosDepartamento,
  normalizarPuesto,
  tieneCoordenadas,
} from '../../services/pollingStationsService';

interface PollingStationsPanelProps {
  currentLevel: ZoomLevelId;
  selectedDepartmentName: string;
  selectedMunicipalityId: string;
  /** Territorio elegido en el mapa (comuna, barrio, vereda o municipio) */
  selectedFeature?: TerritoryGeoFeature | null;
  /** Comuna abierta en el nivel de barrios */
  comunaAbiertaId?: string | null;
  /** Subregión elegida en el mapa (vista de subregiones de Antioquia) */
  subregion?: { id: string; nombre: string } | null;
}

const fmt = (n: number) => n.toLocaleString('es-CO');
const titulo = (s: string) => s.toLowerCase().replace(/(^|[\s(.-])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());

/** Registro de cartografía municipal (comunas/barrios) de un municipio, si existe */
function cartografiaDe(m: Municipio20k): MunicipalDivisionEntry | undefined {
  return Object.values(MUNICIPAL_DIVISIONS_REGISTRY).find(
    (e) => e.disponible && getMunicipioConPuestos(e.name, e.department)?.codMunicipio === m.codMunicipio,
  );
}

/** Códigos DANE de los municipios de una subregión (misma capa que el mapa) */
const danesSubregion = (id: string) =>
  new Set(SubregionAggregationEngine.getMunicipalitiesForSubregion(id).map((f) => String((f.properties as { daneCode?: string }).daneCode)));

interface Ubicacion {
  division?: AsignacionPuestos;
  subdivision?: AsignacionPuestos;
  nombres: Record<string, string>;
  /** ids de la capa de barrios y veredas (para saber si lo elegido es barrio o comuna) */
  idsSubdivision: Set<string>;
  entry: MunicipalDivisionEntry;
}

/**
 * Puestos de votación del área elegida en el mapa. El mapa es el filtro: departamento, subregión
 * (Valle de Aburrá o la elegida en la vista de subregiones), municipio, comuna y barrio o vereda.
 * Las cifras (censo, puestos, mesas) son la suma de los puestos del área; un puesto cuenta en un
 * territorio solo si su punto cae dentro (no se reparte ni se estima).
 */
export const PollingStationsPanel: React.FC<PollingStationsPanelProps> = ({
  currentLevel, selectedDepartmentName, selectedMunicipalityId, selectedFeature = null, comunaAbiertaId = null, subregion = null,
}) => {
  const isMunicipal = currentLevel === 'municipal' || currentLevel === 'hiperlocal' || currentLevel === 'comunas-barrios';
  const departamento = selectedDepartmentName || 'Antioquia';

  // 1. Municipios del área del mapa
  const municipios = useMemo<Municipio20k[]>(() => {
    if (currentLevel === 'nacional') return [];
    if (isMunicipal) {
      const e = MUNICIPAL_DIVISIONS_REGISTRY[selectedMunicipalityId];
      const m = e && getMunicipioConPuestos(e.name, e.department);
      return m ? [m] : [];
    }
    if (currentLevel === 'metropolitano') {
      const d = danesSubregion('valle-de-aburra');
      return MUNICIPIOS_CON_PUESTOS.filter((m) => m.dane && d.has(m.dane));
    }
    const todos = getMunicipiosConPuestosDepartamento(departamento);
    if (subregion) {
      const d = danesSubregion(subregion.id);
      return todos.filter((m) => m.dane && d.has(m.dane));
    }
    return todos;
  }, [currentLevel, isMunicipal, departamento, selectedMunicipalityId, subregion]);

  const [puestos, setPuestos] = useState<PuestoVotacion[]>([]);
  const [ubicacion, setUbicacion] = useState<Ubicacion | null>(null);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [limite, setLimite] = useState(40);

  const claveMunicipios = municipios.map((m) => m.codMunicipio).join(',');
  useEffect(() => {
    setPuestos([]);
    setUbicacion(null);
    setLimite(40);
    if (!municipios.length) return;
    let active = true;
    setCargando(true);
    (async () => {
      const codigos = new Set(municipios.map((m) => m.codMunicipio));
      const lista = municipios.length === 1
        ? await loadPuestosMunicipio(municipios[0])
        : (await loadTodosPuestosDepartamento(municipios[0].departamento)).filter((p) => codigos.has(p.codMunicipio));
      if (!active) return;
      setPuestos(lista);
      // Un solo municipio con cartografía: cada puesto se ubica en su comuna y en su barrio o vereda
      const entry = municipios.length === 1 ? cartografiaDe(municipios[0]) : undefined;
      if (entry) {
        const [div, sub] = await Promise.all([entry.loadDivisions?.(), entry.loadSubdivisions?.()]);
        if (!active) return;
        const nombres: Record<string, string> = {};
        for (const f of [...(div?.features ?? []), ...(sub?.features ?? [])]) nombres[String(f.id)] = f.properties.name;
        setUbicacion({
          entry,
          nombres,
          idsSubdivision: new Set(sub && sub !== div ? sub.features.map((f) => String(f.id)) : []),
          division: div ? asignarPuestosATerritorios(lista, div.features) : undefined,
          subdivision: sub && sub !== div ? asignarPuestosATerritorios(lista, sub.features) : undefined,
        });
      }
    })()
      .catch((e) => console.error('[Proteus] Error cargando puestos:', e))
      .finally(() => { if (active) setCargando(false); });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claveMunicipios]);

  // 2. Territorio dentro del municipio: barrio o vereda, o comuna (seleccionada o abierta)
  const idTerritorio = isMunicipal ? (selectedFeature ? String(selectedFeature.id) : comunaAbiertaId) : null;
  const filtroTerritorio = useMemo(() => {
    if (!idTerritorio || !ubicacion?.nombres[idTerritorio]) return null;
    return { id: idTerritorio, nivel: ubicacion.idsSubdivision.has(idTerritorio) ? 'subdivision' as const : 'division' as const };
  }, [idTerritorio, ubicacion]);

  const enArea = useMemo(() => {
    if (!filtroTerritorio || !ubicacion) return puestos;
    const asignacion = filtroTerritorio.nivel === 'subdivision' ? ubicacion.subdivision : ubicacion.division;
    return puestos.filter((p) => asignacion?.territorioDePuesto[p.codPuesto] === filtroTerritorio.id);
  }, [puestos, filtroTerritorio, ubicacion]);

  // 3. Búsqueda dentro del área
  const filtrados = useMemo(() => {
    const q = normalizarPuesto(busqueda);
    const lista = [...enArea].sort((a, b) => b.total - a.total);
    if (!q) return lista;
    return lista.filter((p) =>
      normalizarPuesto(`${p.puesto} ${p.divipole2023?.direccion ?? ''} ${p.divipole2023?.comuna ?? ''} ${p.codPuesto}`).includes(q),
    );
  }, [enArea, busqueda]);

  // Nombre del área: Antioquia › Valle de Aburrá › Medellín › Comuna 4 › San Isidro
  const ruta = useMemo(() => {
    const partes = [departamento];
    // Subregión: la elegida, el Valle de Aburrá (nivel metropolitano) o la del municipio abierto
    const unico = municipios.length === 1 ? municipios[0] : null;
    const featMuni = unico?.dane ? ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.find((f) => (f.properties as { daneCode?: string }).daneCode === unico.dane) : undefined;
    if (subregion && !isMunicipal) partes.push(subregion.nombre);
    else if (currentLevel === 'metropolitano') partes.push('Valle de Aburrá');
    else if (featMuni?.properties.subregion) partes.push(String(featMuni.properties.subregion));
    if (unico) partes.push(featMuni?.properties.name ?? MUNICIPAL_DIVISIONS_REGISTRY[selectedMunicipalityId]?.name ?? titulo(unico.municipio));
    if (filtroTerritorio && ubicacion) {
      const padre = filtroTerritorio.nivel === 'subdivision'
        ? ubicacion.division?.territorioDePuesto[enArea[0]?.codPuesto ?? ''] ?? (comunaAbiertaId && comunaAbiertaId !== filtroTerritorio.id ? comunaAbiertaId : null)
        : null;
      if (padre && ubicacion.entry.nivelComunas && ubicacion.nombres[padre]) partes.push(ubicacion.nombres[padre]);
      partes.push(ubicacion.nombres[filtroTerritorio.id] ?? filtroTerritorio.id);
    }
    return partes;
  }, [departamento, subregion, isMunicipal, currentLevel, municipios, filtroTerritorio, ubicacion, enArea, comunaAbiertaId, selectedMunicipalityId]);

  // Resumen por zona del área: por municipio (varios), por comuna (municipio) o por barrio (comuna)
  const resumenZonas = useMemo(() => {
    const grupos = new Map<string, { nombre: string; censo: number; puestos: number }>();
    const sumar = (id: string, nombre: string, p: PuestoVotacion) => {
      const g = grupos.get(id) ?? { nombre, censo: 0, puestos: 0 };
      g.censo += p.total; g.puestos += 1; grupos.set(id, g);
    };
    let etiqueta = '';
    if (municipios.length > 1) {
      etiqueta = 'municipio';
      const nombre = new Map(municipios.map((m) => [m.codMunicipio, titulo(m.municipio)]));
      for (const p of enArea) sumar(p.codMunicipio, nombre.get(p.codMunicipio) ?? p.codMunicipio, p);
    } else if (ubicacion && filtroTerritorio?.nivel !== 'subdivision') {
      const usarSub = !!filtroTerritorio || !ubicacion.entry.nivelComunas;
      const a = usarSub ? ubicacion.subdivision ?? ubicacion.division : ubicacion.division;
      etiqueta = usarSub ? 'barrio / vereda' : 'comuna / zona';
      for (const p of enArea) {
        const id = a?.territorioDePuesto[p.codPuesto];
        if (id) sumar(id, ubicacion.nombres[id] ?? id, p);
      }
    }
    return { etiqueta, filas: [...grupos.entries()].map(([id, g]) => ({ id, ...g })).sort((x, y) => y.censo - x.censo) };
  }, [municipios, enArea, ubicacion, filtroTerritorio]);

  // Panel abierto o cerrado (preferencia del navegador)
  const [abierto, setAbierto] = useState<boolean>(() => {
    try { return localStorage.getItem('proteus.puestos.panel') !== 'cerrado'; } catch { return true; }
  });
  const alternar = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const v = e.currentTarget.open;
    setAbierto(v);
    try { localStorage.setItem('proteus.puestos.panel', v ? 'abierto' : 'cerrado'); } catch { /* sin almacenamiento */ }
  };

  const censo = enArea.reduce((s, p) => s + p.total, 0);
  const mesas = enArea.reduce((s, p) => s + p.mesas, 0);
  const conCoord = enArea.filter(tieneCoordenadas).length;
  const asignacionFiltro = filtroTerritorio && ubicacion ? (filtroTerritorio.nivel === 'subdivision' ? ubicacion.subdivision : ubicacion.division) : ubicacion?.division;

  return (
    <details open={abierto} onToggle={alternar} className="group p-4 sm:p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
      <summary className="flex flex-wrap items-center gap-x-3 gap-y-1 cursor-pointer list-none">
        <span className="text-slate-400 transition-transform group-open:rotate-90" aria-hidden>▸</span>
        <h2 className="m-0 text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
          <Vote className="w-4 h-4 text-emerald-400" />
          Puestos de votación
        </h2>
        <span className="text-xs text-slate-300 font-semibold">{currentLevel === 'nacional' ? 'Colombia' : ruta.join(' › ')}</span>
        <span className="ml-auto text-[11px] text-slate-400">
          {currentLevel === 'nacional' ? 'Elige un departamento en el mapa' : cargando ? 'Cargando…' : `${fmt(enArea.length)} puestos · ${fmt(censo)} habilitados`}
        </span>
      </summary>

      <div className="mt-4 space-y-4">
        {currentLevel === 'nacional' && (
          <p className="m-0 text-xs text-slate-400">El filtro es el mapa: elige un departamento, una subregión, un municipio, una comuna o un barrio para ver sus puestos.</p>
        )}
        {currentLevel !== 'nacional' && !municipios.length && (
          <p className="m-0 text-xs text-slate-400">Esta área no tiene puestos de votación cargados.</p>
        )}

        {municipios.length > 0 && (
          <>
            <p className="m-0 text-[11px] text-slate-400 max-w-3xl">
              El filtro es el área elegida en el mapa. Censo por puesto: Registraduría (corte 30-abr-2026). Dirección y coordenadas: Divipole 2023, cruzada por nombre.
              {filtroTerritorio && ' Un puesto cuenta en el territorio solo si su punto cae dentro: no se reparte ni se estima.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                ['Censo 2026', fmt(censo)],
                ['Puestos', fmt(enArea.length)],
                ['Mesas', fmt(mesas)],
                ['Con coordenadas', enArea.length ? `${fmt(conCoord)} (${Math.round((100 * conCoord) / enArea.length)} %)` : '—'],
              ].map(([k, v]) => (
                <div key={k} className="px-3 py-2 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">{k}</div>
                  <div className="text-sm font-black text-emerald-300 font-mono">{v}</div>
                </div>
              ))}
            </div>

            {resumenZonas.filas.length > 0 && (
              <details className="group/zonas rounded-xl border border-white/15 px-3">
                <summary className="flex items-center gap-2 py-2 cursor-pointer list-none text-[11px] font-bold text-slate-300">
                  <span className="text-slate-400 transition-transform group-open/zonas:rotate-90" aria-hidden>▸</span>
                  <span className="grow">
                    Censo por {resumenZonas.etiqueta}{resumenZonas.etiqueta === 'municipio' ? '' : ' según la ubicación de sus puestos'} ({resumenZonas.filas.length})
                    {ubicacion && municipios.length === 1 && <span className="text-slate-500 font-normal"> · cartografía: {ubicacion.entry.divisionLabel}</span>}
                  </span>
                </summary>
                <ul className="m-0 p-0 pb-2 list-none flex flex-col max-h-80 overflow-y-auto">
                  {resumenZonas.filas.map((d) => (
                    <li key={d.id} className="flex items-center gap-2 py-1.5 border-t border-white/10 text-xs">
                      <span className="grow font-semibold truncate">{d.nombre}</span>
                      <span className="tabular-nums font-semibold">{fmt(d.censo)}</span>
                      <span className="w-20 text-right text-slate-400">{d.puestos} {d.puestos === 1 ? 'puesto' : 'puestos'}</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {!filtroTerritorio && asignacionFiltro && (asignacionFiltro.sinCoordenadas.length > 0 || asignacionFiltro.fueraDeLaCapa.length > 0) && (
              <div className="text-[10px] text-amber-200/80 flex items-start gap-1">
                <AlertTriangle className="w-3 h-3 mt-px shrink-0" />
                <span>
                  Sin ubicar: {fmt(asignacionFiltro.sinCoordenadas.reduce((s, p) => s + p.total, 0))} votantes en{' '}
                  {asignacionFiltro.sinCoordenadas.length} puestos sin coordenadas
                  {asignacionFiltro.fueraDeLaCapa.length > 0 &&
                    ` y ${fmt(asignacionFiltro.fueraDeLaCapa.reduce((s, p) => s + p.total, 0))} en ${asignacionFiltro.fueraDeLaCapa.length} puestos fuera de la cartografía`}
                  . Cuentan en el municipio, no en sus comunas ni barrios.
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar puesto o dirección dentro del área"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900/80 border border-white/15 text-xs text-white placeholder:text-slate-500"
                />
              </div>
              <span className="text-[10px] text-slate-400">
                {cargando ? 'Cargando…' : `${fmt(filtrados.length)} de ${fmt(enArea.length)} puestos`}
              </span>
            </div>

            {filtrados.length === 0 && !cargando ? (
              <p className="m-0 text-xs text-slate-400">
                {filtroTerritorio ? 'Ningún puesto cae dentro de este territorio: sus habitantes votan en puestos vecinos.' : 'Ningún puesto coincide con la búsqueda.'}
              </p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-white/5 text-slate-400 uppercase text-[9px] tracking-wider">
                    <tr>
                      <th className="px-2.5 py-2">Puesto</th>
                      {municipios.length > 1 && <th className="px-2.5 py-2">Municipio</th>}
                      <th className="px-2.5 py-2">Zona</th>
                      <th className="px-2.5 py-2">Dirección (Divipole 2023)</th>
                      <th className="px-2.5 py-2">{ubicacion ? 'Ubicación en el mapa' : 'Comuna (Registraduría)'}</th>
                      <th className="px-2.5 py-2 text-right">Censo</th>
                      <th className="px-2.5 py-2 text-right">Mesas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filtrados.slice(0, limite).map((p) => {
                      const d = p.divipole2023;
                      const div = ubicacion?.division?.territorioDePuesto[p.codPuesto];
                      const sub = ubicacion?.subdivision?.territorioDePuesto[p.codPuesto];
                      const lugar = [div && ubicacion!.nombres[div], sub && ubicacion!.nombres[sub]].filter(Boolean).join(' · ');
                      const muni = municipios.find((m) => m.codMunicipio === p.codMunicipio);
                      return (
                        <tr key={p.codPuesto} className="text-slate-200 hover:bg-white/5">
                          <td className="px-2.5 py-1.5">
                            <div className="font-bold text-white flex items-center gap-1">
                              {tieneCoordenadas(p) && <MapPin className={`w-3 h-3 shrink-0 ${(d!.cruce === 'aproximado' || d!.precision === 'aproximada') ? 'text-amber-400' : 'text-emerald-400'}`} />}
                              {p.puesto}
                            </div>
                            <div className={`text-[9px] ${d?.cruce === 'aproximado' || !d ? 'text-amber-300/80' : 'text-slate-500'}`}>{describirCruce(p)}</div>
                          </td>
                          {municipios.length > 1 && <td className="px-2.5 py-1.5 text-slate-300">{muni ? titulo(muni.municipio) : ''}</td>}
                          <td className="px-2.5 py-1.5 font-mono text-slate-400">{p.zona}</td>
                          <td className="px-2.5 py-1.5 text-slate-300">{d?.direccion ?? '—'}</td>
                          <td className="px-2.5 py-1.5 text-slate-300">
                            {ubicacion ? lugar || (tieneCoordenadas(p) ? 'Fuera de la cartografía' : '—') : d?.comuna ?? '—'}
                            {ubicacion && d?.comuna && <div className="text-[9px] text-slate-500">Registraduría: {d.comuna}</div>}
                          </td>
                          <td className="px-2.5 py-1.5 text-right font-mono font-bold text-emerald-300">{fmt(p.total)}</td>
                          <td className="px-2.5 py-1.5 text-right font-mono text-slate-300">{p.mesas}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {filtrados.length > limite && (
              <button
                onClick={() => setLimite((l) => l + 100)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-bold"
              >
                Ver más ({fmt(filtrados.length - limite)} restantes)
              </button>
            )}
            <p className="text-[10px] text-slate-500">
              {PUESTOS_META.nota} Cruce en todo el país: {fmt(PUESTOS_META.cruce.exacto ?? 0)} exactos,{' '}
              {fmt(PUESTOS_META.cruce.normalizado ?? 0)} normalizados, {fmt(PUESTOS_META.cruce.aproximado ?? 0)} aproximados y{' '}
              {fmt(PUESTOS_META.cruce.sin_divipole ?? 0)} sin cruce.
            </p>
          </>
        )}
      </div>
    </details>
  );
};
