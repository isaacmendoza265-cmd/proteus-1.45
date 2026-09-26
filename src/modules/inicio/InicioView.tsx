/**
 * INICIO: lo esencial del departamento, accesos a donde se trabajó y el estado real de cada fuente.
 */
import React from 'react';
import { getDepartmentCensus, CENSUS_META } from '../../services/electoralCensusService';
import { getMunicipios20kDepartamento } from '../../services/pollingStationsService';
import { useActiveTerritory } from '../../services/activeTerritoryContextService';
import type { NavViewId } from '../../components/layout/navigation';

const fmt = (n: number) => n.toLocaleString('es-CO');

interface Props {
  onNavigate: (v: NavViewId) => void;
}

export const InicioView: React.FC<Props> = ({ onNavigate }) => {
  const { activeTerritory } = useActiveTerritory();
  const dep = getDepartmentCensus('antioquia');
  const m20 = getMunicipios20kDepartamento('antioquia');
  const puestos20 = m20.reduce((s, m) => s + m.puestos, 0);
  const ubicados = m20.reduce((s, m) => s + m.puestosConCoordenadas, 0);
  const corte = CENSUS_META.corte.split('-').reverse().join('/');
  const nombre = activeTerritory.name;

  const kpis = [
    { label: 'Censo electoral de Antioquia', value: dep ? fmt(dep.total) : '—', nota: `Registraduría, corte ${corte}` },
    { label: 'Mesas', value: dep ? fmt(dep.mesas) : '—', nota: dep ? `en ${fmt(dep.puestos)} puestos` : '' },
    { label: 'Municipios', value: dep ? fmt(dep.municipios) : '125', nota: `${m20.length} con más de 20.000 votantes` },
    { label: 'Puestos ubicados en el mapa', value: fmt(ubicados), nota: `de ${fmt(puestos20)} en esos ${m20.length} municipios` },
  ];
  const continuar: { modulo: string; titulo: string; detalle: string; v: NavViewId }[] = [
    { modulo: 'Territorio', titulo: `Seguir explorando ${nombre}`, detalle: 'Mapa de país a barrio, ficha en cuatro secciones y redes de poder.', v: 'territorial-zoom' },
    { modulo: 'Electorado', titulo: 'Segmentos del territorio activo', detalle: 'La misma lista de segmentos alimenta Contenido y Publicidad.', v: 'voter-segmentation' },
    { modulo: 'Contenido', titulo: `Nuevo discurso para ${nombre}`, detalle: 'Con datos del territorio y fuentes citadas.', v: 'content-director' },
  ];
  const fuentes: { dato: string; fuente: string; estado: string; tono: 'ok' | 'warn' | 'muted' }[] = [
    { dato: 'Censo electoral', fuente: `Registraduría, corte ${corte}`, estado: 'Oficial', tono: 'ok' },
    { dato: 'Resultados 2023', fuente: 'Registraduría: Alcaldía y Concejo por municipio; por puesto en Rionegro (preconteo)', estado: 'Oficial', tono: 'ok' },
    { dato: 'Población y NBI', fuente: 'DANE: proyecciones 2026 y CNPV 2018; por barrio en Bello', estado: 'Oficial', tono: 'ok' },
    { dato: 'Puestos de votación', fuente: 'Censo 2026 por puesto cruzado con la Divipole 2023', estado: `${Math.round((100 * ubicados) / Math.max(1, puestos20))} % ubicados`, tono: 'warn' },
    { dato: 'Redes de poder', fuente: 'Base curada del desarrollador; sin enlaces web todavía', estado: 'Sin verificar', tono: 'warn' },
    { dato: 'Segmentos de votantes', fuente: 'Motor de segmentación (modelado)', estado: 'Estimado', tono: 'warn' },
  ];
  const color = { ok: 'text-[var(--c-ok)]', warn: 'text-[var(--c-warn)]', muted: 'text-[var(--c-muted)]' };
  const punto = { ok: 'bg-[var(--c-ok)]', warn: 'bg-[var(--c-warn)]', muted: 'bg-[var(--c-muted)]' };

  return (
    <div className="proteus-civico flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="font-titulo m-0 text-[34px] leading-tight font-medium tracking-tight">Inicio</h1>
        <p className="m-0 text-[15px] text-[var(--c-muted)]">Lo esencial de Antioquia y lo último en lo que trabajaste.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="p-5 rounded-xl bg-[var(--c-surface)] border border-[var(--c-border)] flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[var(--c-muted)]">{k.label}</span>
            <span className="font-titulo text-[34px] leading-tight font-medium tabular-nums">{k.value}</span>
            <span className="text-xs text-[var(--c-muted)]">{k.nota}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {continuar.map((c) => (
          <button key={c.titulo} onClick={() => onNavigate(c.v)} className="text-left p-5 min-h-[132px] rounded-xl bg-[var(--c-surface)] border border-[var(--c-border)] hover:border-[var(--c-accent)] flex flex-col gap-2 transition-colors">
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--c-accent-text)]">{c.modulo}</span>
            <span className="text-[17px] font-semibold">{c.titulo}</span>
            <span className="text-sm text-[var(--c-muted)]">{c.detalle}</span>
          </button>
        ))}
      </div>
      <section className="p-5 rounded-xl bg-[var(--c-surface)] border border-[var(--c-border)] flex flex-col gap-1" aria-label="Estado de los datos">
        <h2 className="m-0 mb-2 text-[15px] font-semibold">Estado de los datos</h2>
        {fuentes.map((f) => (
          <div key={f.dato} className="flex items-center gap-3 py-2.5 border-t border-[var(--c-border)]">
            <span className={`w-2 h-2 rounded-full shrink-0 ${punto[f.tono]}`} />
            <span className="w-52 shrink-0 text-sm font-semibold">{f.dato}</span>
            <span className="grow text-sm text-[var(--c-muted)]">{f.fuente}</span>
            <span className={`text-xs font-semibold ${color[f.tono]}`}>{f.estado}</span>
          </div>
        ))}
      </section>
    </div>
  );
};
