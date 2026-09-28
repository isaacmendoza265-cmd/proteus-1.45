/** El libro de reglas que Gemini aplica en cada análisis, tal cual se le envía */
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { DIMENSIONES, ESCALA, LIBRO, PRINCIPIOS, libroEnTexto, instruccionAnalisis, type TipoPieza } from '../../data/analisisPiezas/libroDeReglas';
import type { IdentidadCandidato } from '../../services/identidad/identidad';
import { reglasPiso3 } from '../../services/marcoService';

const MEDIDAS: Record<string, string> = {
  paleta: 'Paleta dominante', adherencia: 'Adherencia a la marca (ΔE2000)', contraste: 'Contraste WCAG', tonalidad: 'Brillo, clave y temperatura',
  composicion: 'Tercios y espacio negativo', cortes: 'Cortes por minuto', ritmoHabla: 'Palabras por minuto', muletillas: 'Conteo de muletillas',
};

export const LibroReglas: React.FC<{ identidad: IdentidadCandidato }> = ({ identidad }) => {
  const [tipo, setTipo] = useState<TipoPieza>('video');
  const [copiado, setCopiado] = useState(false);
  const comando = `${libroEnTexto(tipo, reglasPiso3())}\n\n----- INSTRUCCIÓN DE CADA ANÁLISIS -----\n${instruccionAnalisis({ identidad, tipo, propia: true, mediciones: ['(las mediciones de la pieza)'] })}`;
  const copiar = async () => {
    try { await navigator.clipboard.writeText(comando); setCopiado(true); setTimeout(() => setCopiado(false), 1800); } catch { /* sin portapapeles */ }
  };
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] p-5 flex flex-col gap-2">
        <span className="font-mono text-xs tracking-[0.12em] text-[var(--c-accent-text)]">LIBRO DE REGLAS · v{LIBRO.version} · {LIBRO.fecha}</span>
        <p className="m-0 text-[15px] leading-relaxed max-w-3xl">Es el comando que recibe Gemini en cada análisis: once principios, una escala común y {DIMENSIONES.length} dimensiones con {DIMENSIONES.reduce((s, d) => s + d.criterios.length, 0)} criterios anclados. La identidad del candidato es la vara; las mediciones de Proteus mandan sobre la opinión del modelo, y el puntaje global lo calcula Proteus.</p>
        <p className="m-0 text-xs text-[var(--c-muted)]">{LIBRO.estado}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="m-0 font-titulo text-[22px] font-medium">Principios</h3>
        <ol className="m-0 p-0 list-none grid grid-cols-1 lg:grid-cols-2 gap-3">
          {PRINCIPIOS.map((p) => (
            <li key={p.id} className="rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] p-4 flex gap-3">
              <span className="font-mono text-xs text-[var(--c-accent-text)] pt-0.5 w-7 shrink-0">{p.id}</span>
              <span className="flex flex-col gap-1"><span className="text-sm font-semibold">{p.titulo}</span><span className="text-sm text-[var(--c-muted)] leading-relaxed">{p.regla}</span></span>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="m-0 font-titulo text-[22px] font-medium">Escala</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {Object.entries(ESCALA).map(([k, v]) => (
            <div key={k} className="rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] p-3 flex flex-col gap-1">
              <span className="font-titulo text-2xl">{k}</span><span className="text-xs text-[var(--c-muted)] leading-snug">{v}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="m-0 font-titulo text-[22px] font-medium">Dimensiones y criterios</h3>
        <div className="rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] divide-y divide-[var(--c-border)]">
          {DIMENSIONES.map((d) => (
            <details key={d.id} className="px-4">
              <summary className="cursor-pointer min-h-14 flex items-center justify-between gap-3">
                <span className="flex flex-col py-2"><span className="font-semibold">{d.nombre}</span><span className="text-xs text-[var(--c-muted)]">{d.pregunta}</span></span>
                <span className="shrink-0 text-xs text-[var(--c-muted)]">peso {d.peso} · {d.aplica.join(', ')}</span>
              </summary>
              <div className="overflow-x-auto pb-4">
                <table className="w-full text-sm border-collapse min-w-[760px]">
                  <thead>
                    <tr className="text-left text-xs text-[var(--c-muted)]">
                      <th className="py-2 pr-3 font-semibold">Criterio</th><th className="py-2 pr-3 font-semibold">Qué mirar</th>
                      <th className="py-2 pr-3 font-semibold">1</th><th className="py-2 pr-3 font-semibold">3</th><th className="py-2 pr-3 font-semibold">5</th><th className="py-2 font-semibold">Medición</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.criterios.map((c) => (
                      <tr key={c.id} className="align-top border-t border-[var(--c-border)]">
                        <td className="py-2 pr-3 font-semibold">{c.nombre}</td><td className="py-2 pr-3">{c.mirar}</td>
                        <td className="py-2 pr-3 text-[var(--c-muted)]">{c.ancla1}</td><td className="py-2 pr-3 text-[var(--c-muted)]">{c.ancla3}</td><td className="py-2 pr-3 text-[var(--c-muted)]">{c.ancla5}</td>
                        <td className="py-2 text-xs">{c.medida ? MEDIDAS[c.medida] : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="m-0 font-titulo text-[22px] font-medium">El comando completo</h3>
            <span className="text-sm text-[var(--c-muted)]">Exactamente lo que recibe Gemini, con la identidad actual del candidato.</span>
          </div>
          <div className="flex gap-2">
            <label htmlFor="libro-tipo" className="sr-only">Tipo de pieza</label>
            <select id="libro-tipo" value={tipo} onChange={(e) => setTipo(e.target.value as TipoPieza)} className="h-11 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] px-3 text-sm">
              <option value="video">Video</option><option value="imagen">Imagen</option><option value="audio">Audio</option><option value="texto">Texto</option>
            </select>
            <button type="button" onClick={() => void copiar()} className="inline-flex items-center gap-2 min-h-11 px-4 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-sm font-semibold hover:border-[var(--c-accent)]">
              {copiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copiado ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </div>
        <pre className="m-0 max-h-[520px] overflow-auto rounded-xl border border-[var(--c-border)] bg-[var(--c-sunken)] p-4 text-xs leading-relaxed whitespace-pre-wrap font-mono">{comando}</pre>
      </section>
    </div>
  );
};
