/**
 * Ficha del municipio: la alcaldía en cifras. Categoría (Contaduría), presupuesto de gastos programado y
 * ejecutado (Contraloría, CUIPO) y curules del concejo (Registraduría). Cada cifra con su fuente.
 */
import React from 'react';
import { CATEGORIA_TEXTO, categoriaMunicipio, corteTexto, curulesConcejo, pesos, presupuestoMunicipio } from '../../services/perfilMunicipalService';
import { ETIQUETA_ESTADO, fmt, pct } from '../../services/territoryProfileService';

const Cifra: React.FC<{ label: string; value: string; detalle?: string }> = ({ label, value, detalle }) => (
  <div className="px-2.5 py-1.5 rounded-lg bg-[var(--c-surface)] flex flex-col min-w-0">
    <span className="text-xs font-semibold text-[var(--c-muted)]">{label}</span>
    <span className="text-base font-semibold tabular-nums">{value}</span>
    {detalle && <span className="text-xs text-[var(--c-muted)]">{detalle}</span>}
  </div>
);

export const AlcaldiaMunicipio: React.FC<{ dane: string }> = ({ dane }) => {
  const pres = presupuestoMunicipio(dane);
  const cat = categoriaMunicipio(dane);
  const cur = curulesConcejo(dane, '2023');
  if (!pres && !cat && !cur) return null;
  const [catActual, catAnterior] = cat?.lista ?? [];
  const ultimo = pres?.anios[0];
  return (
    <div className="flex flex-col gap-2 px-3 py-2.5 rounded-xl bg-[var(--c-sunken)]">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold grow">La alcaldía en cifras</span>
        <span className="shrink-0 px-2 py-0.5 rounded-md text-xs font-bold bg-[var(--c-ok-soft)] text-[var(--c-ok)]">{ETIQUETA_ESTADO.oficial}</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {catActual && (
          <Cifra label={`Categoría ${catActual.vigencia}`} value={CATEGORIA_TEXTO[catActual.categoria] ?? catActual.categoria}
            detalle={catAnterior ? `${catAnterior.vigencia}: ${CATEGORIA_TEXTO[catAnterior.categoria] ?? catAnterior.categoria}` : undefined} />
        )}
        {cur && (
          <Cifra label="Concejo 2023" value={`${fmt(cur.curules)} curules`}
            detalle={cur.aListas != null && cur.aListas < cur.curules ? `${fmt(cur.aListas)} repartidas a listas` : undefined} />
        )}
        {pres?.anios.map(({ anio, datos: d }) => (
          <Cifra key={anio} label={`Presupuesto ${anio}${d.corte.endsWith('1201') ? '' : ` (a ${corteTexto(d.corte)})`}`} value={pesos(d.definitivo)}
            detalle={`${pesos(d.porHabitante)} por habitante${d.compromisos != null ? ` · ${pct((100 * d.compromisos) / Math.max(1, d.definitivo))} comprometido` : ''}`} />
        ))}
      </div>
      {pres?.anios.filter((a) => a.datos.alerta).map((a) => (
        <p key={a.anio} className="m-0 text-xs px-2.5 py-1.5 rounded-lg bg-[var(--c-warn-soft)] text-[var(--c-ink)]"><strong>{a.anio}:</strong> {a.datos.alerta}</p>
      ))}
      {ultimo && (
        <span className="text-xs text-[var(--c-muted)]">
          {ultimo.anio}: presupuesto inicial {pesos(ultimo.datos.inicial)}; {pesos(ultimo.datos.compromisos)} comprometidos y {pesos(ultimo.datos.pagos)} pagados
          {ultimo.datos.corte.endsWith('1201') ? '.' : ` al corte de ${corteTexto(ultimo.datos.corte)} (el año no ha terminado).`}
        </span>
      )}
      <details className="text-xs text-[var(--c-muted)]">
        <summary className="cursor-pointer font-semibold">Fuentes y método</summary>
        <div className="flex flex-col gap-1 pt-1">
          {pres && <span>Presupuesto: {pres.fuente}. {pres.que} Por habitante: {pres.porHabitanteNota}</span>}
          {cat && <span>Categoría: {cat.fuente}.</span>}
          {cur && <span>Curules: {cur.fuente}. Por la Ley 136 de 1994 dependen de la población del municipio, no de su categoría ni de su presupuesto.</span>}
        </div>
      </details>
    </div>
  );
};

export default AlcaldiaMunicipio;
