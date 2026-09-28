/**
 * Electorado › Encuestas 2026: el módulo <voto-correlaciones> (microdatos CNE del ciclo 2026) dentro de Proteus.
 * Llega aquí desde el mapa ("Ver la evolución de …") ya situado en el municipio o en Antioquia.
 */
import React from 'react';
import { Map as MapIcon } from 'lucide-react';
import { VotoCorrelaciones, type SeleccionEncuestas } from '../../components/encuestas/VotoCorrelaciones';

interface Props {
  seleccion?: SeleccionEncuestas | null;
  onVolverAlMapa?: () => void;
}

export const Encuestas2026View: React.FC<Props> = ({ seleccion, onVolverAlMapa }) => {
  return (
    <div className="proteus-civico flex flex-col gap-5 pb-12">
      <header className="flex items-start gap-4 flex-wrap">
        <p className="m-0 grow basis-[28rem] text-sm text-[var(--c-muted)] max-w-3xl leading-relaxed">
          Intención de voto del ciclo 2026 (Presidencia 1.ª y 2.ª vuelta, Senado, aprobación del Gobierno) cruzada por
          demografía y territorio, a partir de los microdatos que las firmas publican en el Registro Nacional de Encuestas
          del CNE. Solo agregados; celdas con menos de 30 casos suprimidas. En el mapa, cada municipio compara estas
          encuestas con el resultado oficial.
        </p>
        {onVolverAlMapa && (
          <button type="button" onClick={onVolverAlMapa}
            className="inline-flex items-center gap-1.5 min-h-10 px-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-sm font-semibold hover:bg-[var(--c-sunken)]">
            <MapIcon className="w-4 h-4" strokeWidth={1.7} /> Volver al mapa
          </button>
        )}
      </header>

      <section className="px-2 pb-2 sm:px-3 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)]">
        <VotoCorrelaciones seleccion={seleccion ?? undefined} sinEncabezado />
      </section>

      <p className="m-0 text-xs text-[var(--c-muted)] leading-snug max-w-3xl">
        Estado de los datos: Estimado (encuestas). Asociación no es causalidad; los intervalos no incluyen el efecto de
        estratos y conglomerados que las firmas no publican. Reglamento de interpretación v1.2: estas encuestas calibran
        actitudes a municipio, área metropolitana o departamento, no a barrio. Durante la veda electoral no se publican.
      </p>
    </div>
  );
};
