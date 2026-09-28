/** Controles de formulario de la ventana de identidad (estética sobrio cívico, tokens --c-*) */
import React, { useId, useState } from 'react';
import { X } from 'lucide-react';

const base = 'w-full rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] px-3 text-[15px] text-[var(--c-ink)] placeholder:text-[var(--c-muted)]/70 focus:outline-none focus:border-[var(--c-accent)] focus:ring-2 focus:ring-[var(--c-accent-soft)]';

export const Etiqueta: React.FC<{ htmlFor?: string; titulo: string; ayuda?: string }> = ({ htmlFor, titulo, ayuda }) => (
  <span className="flex flex-col gap-0.5">
    <label htmlFor={htmlFor} className="text-sm font-semibold">{titulo}</label>
    {ayuda && <span className="text-xs text-[var(--c-muted)] leading-snug">{ayuda}</span>}
  </span>
);

/** Texto de ayuda debajo del control (así los controles de una fila quedan alineados) */
const Ayuda: React.FC<{ id: string; texto?: string }> = ({ id, texto }) => (texto ? <span id={id} className="text-xs text-[var(--c-muted)] leading-snug">{texto}</span> : null);

export const Campo: React.FC<{ titulo: string; ayuda?: string; valor: string; onChange: (v: string) => void; placeholder?: string; tipo?: string; lista?: string; className?: string }> = ({ titulo, ayuda, valor, onChange, placeholder, tipo = 'text', lista, className = '' }) => {
  const id = useId();
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Etiqueta htmlFor={id} titulo={titulo} />
      <input id={id} type={tipo} list={lista} value={valor} placeholder={placeholder} aria-describedby={ayuda ? `${id}-a` : undefined} onChange={(e) => onChange(e.target.value)} className={`${base} h-11`} />
      <Ayuda id={`${id}-a`} texto={ayuda} />
    </div>
  );
};

export const Area: React.FC<{ titulo: string; ayuda?: string; valor: string; onChange: (v: string) => void; placeholder?: string; filas?: number; className?: string }> = ({ titulo, ayuda, valor, onChange, placeholder, filas = 3, className = '' }) => {
  const id = useId();
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Etiqueta htmlFor={id} titulo={titulo} />
      <textarea id={id} rows={filas} value={valor} placeholder={placeholder} aria-describedby={ayuda ? `${id}-a` : undefined} onChange={(e) => onChange(e.target.value)} className={`${base} py-2.5 leading-relaxed resize-y`} />
      <Ayuda id={`${id}-a`} texto={ayuda} />
    </div>
  );
};

export const Selector: React.FC<{ titulo: string; ayuda?: string; valor: string; onChange: (v: string) => void; opciones: { v: string; t: string }[]; className?: string }> = ({ titulo, ayuda, valor, onChange, opciones, className = '' }) => {
  const id = useId();
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Etiqueta htmlFor={id} titulo={titulo} />
      <select id={id} value={valor} aria-describedby={ayuda ? `${id}-a` : undefined} onChange={(e) => onChange(e.target.value)} className={`${base} h-11`}>
        <option value="">Sin definir</option>
        {opciones.map((o) => <option key={o.v} value={o.v}>{o.t}</option>)}
      </select>
      <Ayuda id={`${id}-a`} texto={ayuda} />
    </div>
  );
};

/** Lista de frases o palabras: Enter o coma agrega; la X quita */
export const Etiquetas: React.FC<{ titulo: string; ayuda?: string; valores: string[]; onChange: (v: string[]) => void; placeholder?: string; lista?: string; className?: string }> = ({ titulo, ayuda, valores, onChange, placeholder, lista, className = '' }) => {
  const id = useId();
  const [borrador, setBorrador] = useState('');
  const agregar = () => {
    const nuevos = borrador.split(/[,;\n]/).map((x) => x.trim()).filter(Boolean).filter((x) => !valores.includes(x));
    if (nuevos.length) onChange([...valores, ...nuevos]);
    setBorrador('');
  };
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Etiqueta htmlFor={id} titulo={titulo} ayuda={ayuda} />
      <div className="flex flex-wrap gap-1.5 min-h-11 items-center rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] px-2 py-1.5 focus-within:border-[var(--c-accent)] focus-within:ring-2 focus-within:ring-[var(--c-accent-soft)]">
        {valores.map((v) => (
          <span key={v} className="inline-flex items-center gap-1 h-8 pl-2.5 pr-1 rounded-md bg-[var(--c-sunken)] border border-[var(--c-border)] text-sm">
            {v}
            <button type="button" onClick={() => onChange(valores.filter((x) => x !== v))} aria-label={`Quitar ${v}`} className="w-6 h-6 inline-flex items-center justify-center rounded hover:bg-[var(--c-border)]">
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
        <input id={id} list={lista} value={borrador} placeholder={valores.length ? '' : placeholder}
          onChange={(e) => setBorrador(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); agregar(); } else if (e.key === 'Backspace' && !borrador && valores.length) onChange(valores.slice(0, -1)); }}
          onBlur={agregar}
          className="grow min-w-[140px] h-8 bg-transparent px-1 text-[15px] focus:outline-none" />
      </div>
    </div>
  );
};

/** Escala 1-5 con sus dos extremos nombrados */
export const Escala: React.FC<{ titulo: string; valor: number; onChange: (v: number) => void; bajo: string; alto: string }> = ({ titulo, valor, onChange, bajo, alto }) => (
  <fieldset className="flex flex-col gap-2 m-0 p-0 border-0">
    <legend className="text-sm font-semibold mb-2">{titulo}</legend>
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-xs text-[var(--c-muted)] text-right">{bajo}</span>
      <div className="grow grid grid-cols-5 gap-1.5" role="radiogroup" aria-label={titulo}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" role="radio" aria-checked={valor === n} aria-label={`${n} de 5`} onClick={() => onChange(n)}
            className={`h-11 rounded-lg border text-sm font-semibold transition-colors ${valor === n ? 'bg-[var(--c-accent)] border-[var(--c-accent)] text-white' : n < valor ? 'bg-[var(--c-accent-soft)] border-[var(--c-border)] text-[var(--c-accent-text)]' : 'bg-[var(--c-surface)] border-[var(--c-border)] text-[var(--c-muted)] hover:border-[var(--c-accent)]'}`}>
            {n}
          </button>
        ))}
      </div>
      <span className="w-24 shrink-0 text-xs text-[var(--c-muted)]">{alto}</span>
    </div>
  </fieldset>
);

export const Interruptor: React.FC<{ titulo: string; ayuda?: string; valor: boolean; onChange: (v: boolean) => void }> = ({ titulo, ayuda, valor, onChange }) => {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <Etiqueta htmlFor={id} titulo={titulo} ayuda={ayuda} />
      <button id={id} type="button" role="switch" aria-checked={valor} onClick={() => onChange(!valor)}
        className={`relative shrink-0 w-12 h-7 rounded-full transition-colors ${valor ? 'bg-[var(--c-accent)]' : 'bg-[var(--c-border)]'}`}>
        <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${valor ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
};

/** Grupo de opciones como fichas seleccionables (una o varias) */
export function Fichas<T extends string>({ titulo, ayuda, opciones, valor, onChange, multiple }: { titulo: string; ayuda?: string; opciones: { v: T; t: string; d?: string }[]; valor: T[]; onChange: (v: T[]) => void; multiple?: boolean }) {
  return (
    <fieldset className="flex flex-col gap-2 m-0 p-0 border-0">
      <legend className="text-sm font-semibold">{titulo}</legend>
      {ayuda && <span className="text-xs text-[var(--c-muted)] -mt-1">{ayuda}</span>}
      <div className="flex flex-wrap gap-2">
        {opciones.map((o) => {
          const on = valor.includes(o.v);
          return (
            <button key={o.v} type="button" aria-pressed={on} title={o.d}
              onClick={() => onChange(multiple ? (on ? valor.filter((x) => x !== o.v) : [...valor, o.v]) : on ? [] : [o.v])}
              className={`min-h-11 px-3.5 rounded-lg border text-sm text-left transition-colors ${on ? 'border-[var(--c-accent)] bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] font-semibold' : 'border-[var(--c-border)] bg-[var(--c-surface)] hover:border-[var(--c-accent)]'}`}>
              {o.t}{o.d && <span className="block text-xs font-normal text-[var(--c-muted)]">{o.d}</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export const Grupo: React.FC<{ titulo: string; descripcion?: string; children: React.ReactNode }> = ({ titulo, descripcion, children }) => (
  <section className="flex flex-col gap-4 pt-6 first:pt-0 border-t border-[var(--c-border)] first:border-t-0">
    <div className="flex flex-col gap-1">
      <h3 className="m-0 font-titulo text-[22px] font-medium">{titulo}</h3>
      {descripcion && <p className="m-0 text-sm text-[var(--c-muted)] max-w-2xl">{descripcion}</p>}
    </div>
    {children}
  </section>
);
