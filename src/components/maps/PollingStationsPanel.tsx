import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Search, Vote, AlertTriangle } from 'lucide-react';
import type { ZoomLevelId } from '../../data/geojson';
import { MUNICIPAL_DIVISIONS_REGISTRY, MunicipalDivisionEntry } from '../../data/geojson/municipalDivisions';
import { ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA } from '../../data/antioquia125MunicipalitiesMasterData';
import {
  AsignacionPuestos,
  Municipio20k,
  MUNICIPIOS_20K,
  PUESTOS_META,
  PuestoVotacion,
  UMBRAL_MUNICIPIOS_PUESTOS,
  asignarPuestosATerritorios,
  describirCruce,
  getMunicipio20k,
  getMunicipios20kDepartamento,
  loadPuestosMunicipio,
  normalizarPuesto,
  tieneCoordenadas,
} from '../../services/pollingStationsService';

interface PollingStationsPanelProps {
  currentLevel: ZoomLevelId;
  selectedDepartmentName: string;
  selectedMunicipalityId: string;
}

const VALLE_ABURRA_DANE = new Set(
  ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA.filter((m) => m.subregionId === 'valle-de-aburra').map((m) => m.daneCode),
);

const fmt = (n: number) => n.toLocaleString('es-CO');
const titulo = (s: string) => s.toLowerCase().replace(/(^|[\s(.-])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());

/** Registro de cartografía municipal (comunas/barrios) de un municipio, si existe */
function cartografiaDe(m: Municipio20k): MunicipalDivisionEntry | undefined {
  return Object.values(MUNICIPAL_DIVISIONS_REGISTRY).find(
    (e) => e.disponible && getMunicipio20k(e.name, e.department)?.codMunicipio === m.codMunicipio,
  );
}

interface Ubicacion {
  division?: AsignacionPuestos;
  subdivision?: AsignacionPuestos;
  nombres: Record<string, string>;
  entry: MunicipalDivisionEntry;
}

/**
 * Puestos de votación del territorio que se está viendo en el mapa: lista de municipios con más
 * de 20.000 votantes y, para el municipio elegido, sus puestos con censo, mesas, dirección y la
 * comuna/barrio donde caen según la cartografía disponible.
 */
export const PollingStationsPanel: React.FC<PollingStationsPanelProps> = ({ currentLevel, selectedDepartmentName, selectedMunicipalityId }) => {
  const isMunicipal = currentLevel === 'municipal' || currentLevel === 'hiperlocal' || currentLevel === 'comunas-barrios';

  const municipios = useMemo<Municipio20k[]>(() => {
    if (currentLevel === 'nacional') return MUNICIPIOS_20K;
    if (currentLevel === 'metropolitano') return MUNICIPIOS_20K.filter((m) => m.dane && VALLE_ABURRA_DANE.has(m.dane));
    if (isMunicipal) {
      const e = MUNICIPAL_DIVISIONS_REGISTRY[selectedMunicipalityId];
      const m = e && getMunicipio20k(e.name, e.department);
      return m ? [m] : [];
    }
    return getMunicipios20kDepartamento(selectedDepartmentName || 'Antioquia');
  }, [currentLevel, isMunicipal, selectedDepartmentName, selectedMunicipalityId]);

  const [codigo, setCodigo] = useState<string>('');
  useEffect(() => {
    setCodigo(municipios[0]?.codMunicipio ?? '');
  }, [municipios]);
  const municipio = municipios.find((m) => m.codMunicipio === codigo) ?? municipios[0];

  const [puestos, setPuestos] = useState<PuestoVotacion[]>([]);
  const [ubicacion, setUbicacion] = useState<Ubicacion | null>(null);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [limite, setLimite] = useState(40);

  useEffect(() => {
    setPuestos([]);
    setUbicacion(null);
    setLimite(40);
    if (!municipio) return;
    let active = true;
    setCargando(true);
    (async () => {
      const lista = await loadPuestosMunicipio(municipio);
      if (!active) return;
      setPuestos(lista);
      const entry = cartografiaDe(municipio);
      if (entry) {
        const [div, sub] = await Promise.all([entry.loadDivisions?.(), entry.loadSubdivisions?.()]);
        if (!active) return;
        const nombres: Record<string, string> = {};
        for (const f of [...(div?.features ?? []), ...(sub?.features ?? [])]) nombres[String(f.id)] = f.properties.name;
        setUbicacion({
          entry,
          nombres,
          division: div ? asignarPuestosATerritorios(lista, div.features) : undefined,
          subdivision: sub && sub !== div ? asignarPuestosATerritorios(lista, sub.features) : undefined,
        });
      }
    })()
      .catch((e) => console.error('[Proteus] Error cargando puestos:', e))
      .finally(() => { if (active) setCargando(false); });
    return () => { active = false; };
  }, [municipio]);

  const filtrados = useMemo(() => {
    const q = normalizarPuesto(busqueda);
    const lista = [...puestos].sort((a, b) => b.total - a.total);
    if (!q) return lista;
    return lista.filter((p) =>
      normalizarPuesto(`${p.puesto} ${p.divipole2023?.direccion ?? ''} ${p.divipole2023?.comuna ?? ''} ${p.codPuesto}`).includes(q),
    );
  }, [puestos, busqueda]);

  const resumenDivisiones = useMemo(() => {
    const a = ubicacion?.division;
    if (!a) return [];
    return Object.entries(a.porTerritorio)
      .map(([id, t]) => ({ id, nombre: ubicacion!.nombres[id] ?? id, ...t }))
      .sort((x, y) => y.censo - x.censo);
  }, [ubicacion]);

  if (!municipios.length) {
    return (
      <div className="p-4 rounded-3xl bg-slate-950/40 border border-white/15 text-xs text-slate-400">
        <Vote className="w-4 h-4 inline mr-1.5 text-slate-500" />
        Este territorio no tiene municipios con más de {fmt(UMBRAL_MUNICIPIOS_PUESTOS)} votantes: no se cargan puestos de votación.
      </div>
    );
  }

  const conCoord = puestos.filter(tieneCoordenadas).length;
  const totalCenso = municipios.reduce((s, m) => s + m.censo, 0);
  const totalPuestos = municipios.reduce((s, m) => s + m.puestos, 0);

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.4)] space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
        <div>
          <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
            <Vote className="w-4 h-4 text-emerald-400" />
            Puestos de votación
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5 max-w-3xl">
            {municipios.length > 1
              ? `${fmt(municipios.length)} municipios con más de ${fmt(UMBRAL_MUNICIPIOS_PUESTOS)} votantes · ${fmt(totalPuestos)} puestos · censo ${fmt(totalCenso)}.`
              : `Municipio con más de ${fmt(UMBRAL_MUNICIPIOS_PUESTOS)} votantes.`}{' '}
            Censo por puesto: Registraduría (corte 30-abr-2026). Dirección y coordenadas: Divipole 2023, cruzada por nombre.
          </p>
        </div>
        {municipios.length > 1 && (
          <select
            value={municipio?.codMunicipio}
            onChange={(e) => setCodigo(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900/90 border border-white/20 text-xs text-white font-bold max-w-xs"
            aria-label="Municipio"
          >
            {municipios.map((m) => (
              <option key={m.codMunicipio} value={m.codMunicipio}>
                {titulo(m.municipio)} · {fmt(m.censo)} votantes · {m.puestos} puestos
              </option>
            ))}
          </select>
        )}
      </div>

      {municipio && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              ['Censo 2026', fmt(municipio.censo)],
              ['Puestos', fmt(municipio.puestos)],
              ['Mesas', fmt(municipio.mesas)],
              ['Con coordenadas', `${fmt(municipio.puestosConCoordenadas)} (${Math.round((100 * municipio.puestosConCoordenadas) / municipio.puestos)} %)`],
            ].map(([k, v]) => (
              <div key={k} className="px-3 py-2 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">{k}</div>
                <div className="text-sm font-black text-emerald-300 font-mono">{v}</div>
              </div>
            ))}
          </div>

          {resumenDivisiones.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-300 mb-1.5">
                Censo por {ubicacion!.entry.nivelComunas ? 'comuna / zona' : 'barrio / vereda'} según la ubicación de sus puestos
                <span className="text-slate-500 font-normal"> · cartografía: {ubicacion!.entry.divisionLabel}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {resumenDivisiones.map((d) => (
                  <span key={d.id} className="px-2 py-1 rounded-lg bg-sky-500/10 border border-sky-400/20 text-[10px] text-sky-100">
                    <strong>{d.nombre}</strong>: {fmt(d.censo)} · {d.puestos} p.
                  </span>
                ))}
              </div>
              {(ubicacion!.division!.sinCoordenadas.length > 0 || ubicacion!.division!.fueraDeLaCapa.length > 0) && (
                <div className="mt-1.5 text-[10px] text-amber-200/80 flex items-start gap-1">
                  <AlertTriangle className="w-3 h-3 mt-px shrink-0" />
                  <span>
                    Sin ubicar: {fmt(ubicacion!.division!.sinCoordenadas.reduce((s, p) => s + p.total, 0))} votantes en{' '}
                    {ubicacion!.division!.sinCoordenadas.length} puestos sin coordenadas
                    {ubicacion!.division!.fueraDeLaCapa.length > 0 &&
                      ` y ${fmt(ubicacion!.division!.fueraDeLaCapa.reduce((s, p) => s + p.total, 0))} en ${ubicacion!.division!.fueraDeLaCapa.length} puestos fuera de la cartografía`}
                    . No se reparten ni se estiman.
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar puesto, dirección o comuna"
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900/80 border border-white/15 text-xs text-white placeholder:text-slate-500"
              />
            </div>
            <span className="text-[10px] text-slate-400">
              {cargando ? 'Cargando…' : `${fmt(filtrados.length)} puestos · ${fmt(conCoord)} con coordenadas`}
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-white/5 text-slate-400 uppercase text-[9px] tracking-wider">
                <tr>
                  <th className="px-2.5 py-2">Puesto</th>
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
                  return (
                    <tr key={p.codPuesto} className="text-slate-200 hover:bg-white/5">
                      <td className="px-2.5 py-1.5">
                        <div className="font-bold text-white flex items-center gap-1">
                          {tieneCoordenadas(p) && <MapPin className={`w-3 h-3 shrink-0 ${d!.cruce === 'aproximado' ? 'text-amber-400' : 'text-emerald-400'}`} />}
                          {p.puesto}
                        </div>
                        <div className={`text-[9px] ${d?.cruce === 'aproximado' || !d ? 'text-amber-300/80' : 'text-slate-500'}`}>{describirCruce(p)}</div>
                      </td>
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
  );
};
