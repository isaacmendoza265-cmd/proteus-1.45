/**
 * AJUSTES › IDENTIDAD DEL CANDIDATO
 * La identidad (nueve bloques) a la que se ajustan todas las respuestas de Proteus, el análisis de piezas que
 * depende de ella y el libro de reglas que Gemini aplica. Se guarda sola en este navegador.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, Check, Fingerprint, ScanSearch } from 'lucide-react';
import type { CandidateProfile } from '../../components/CandidateProfileManager';
import {
  BLOQUES, completitud, completitudTotal, identidadDesdeLegado, identidadParaIA, paletaDefinida, sincronizarLegado,
  type BloqueId, type IdentidadCandidato,
} from '../../services/identidad/identidad';
import { EDITORES, ListasSugeridas } from './bloques';
import { AnalisisPiezas } from './AnalisisPiezas';
import { LibroReglas } from './LibroReglas';

interface Props {
  candidateProfile: CandidateProfile;
  onSaveProfile: (p: CandidateProfile) => void;
}

type Pestana = 'identidad' | 'piezas' | 'libro';

const Anillo: React.FC<{ valor: number; tam?: number }> = ({ valor, tam = 64 }) => {
  const r = (tam - 8) / 2, c = 2 * Math.PI * r;
  return (
    <svg width={tam} height={tam} viewBox={`0 0 ${tam} ${tam}`} role="img" aria-label={`Identidad completa al ${Math.round(valor * 100)} %`}>
      <circle cx={tam / 2} cy={tam / 2} r={r} fill="none" stroke="var(--c-border)" strokeWidth="6" />
      <circle cx={tam / 2} cy={tam / 2} r={r} fill="none" stroke="var(--c-accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${c * valor} ${c}`} transform={`rotate(-90 ${tam / 2} ${tam / 2})`} />
      <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fontSize={tam * 0.26} fontWeight="600" fill="var(--c-ink)">{Math.round(valor * 100)}</text>
    </svg>
  );
};

export const IdentidadCandidatoView: React.FC<Props> = ({ candidateProfile, onSaveProfile }) => {
  const [identidad, setIdentidad] = useState<IdentidadCandidato>(() => identidadDesdeLegado(candidateProfile as never));
  const [pestana, setPestana] = useState<Pestana>('identidad');
  const [bloque, setBloque] = useState<BloqueId>('ficha');
  const [guardado, setGuardado] = useState<string | null>(identidad.actualizado || null);
  const primera = useRef(true);
  const perfil = useRef(candidateProfile);
  perfil.current = candidateProfile;
  const guardar = useRef(onSaveProfile);
  guardar.current = onSaveProfile;

  // Guardado automático (medio segundo después del último cambio)
  useEffect(() => {
    if (primera.current) { primera.current = false; return; }
    const t = setTimeout(() => {
      const ahora = new Date().toISOString();
      const conFecha = { ...identidad, actualizado: ahora };
      guardar.current({ ...sincronizarLegado(perfil.current, conFecha), updatedAt: ahora } as CandidateProfile);
      setGuardado(ahora);
    }, 500);
    return () => clearTimeout(t);
  }, [identidad]);

  const comp = useMemo(() => completitud(identidad), [identidad]);
  const total = useMemo(() => completitudTotal(identidad), [identidad]);
  const paleta = paletaDefinida(identidad);
  const f = identidad.ficha;
  const Editor = EDITORES[bloque];
  const meta = BLOQUES.find((b) => b.id === bloque)!;
  const irA = (b: BloqueId) => { setPestana('identidad'); setBloque(b); };

  const pestanas: { id: Pestana; t: string; d: string; icono: React.ReactNode }[] = [
    { id: 'identidad', t: 'Identidad', d: 'Nueve bloques', icono: <Fingerprint className="w-4 h-4" /> },
    { id: 'piezas', t: 'Análisis de piezas', d: 'Imagen, video, audio y texto', icono: <ScanSearch className="w-4 h-4" /> },
    { id: 'libro', t: 'Libro de reglas', d: 'El comando de Gemini', icono: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="proteus-civico flex flex-col gap-6 pb-12">
      <ListasSugeridas />

      {/* Cabecera: quién es el candidato activo y qué tan definida está su identidad */}
      <header className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] overflow-hidden">
        {paleta.length > 0 && <div className="flex h-1.5" aria-hidden>{paleta.map((c) => <span key={c.rol} className="grow" style={{ background: c.hex }} />)}</div>}
        <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="grow flex flex-col gap-2 min-w-0">
            <span className="font-mono text-xs tracking-[0.14em] text-[var(--c-accent-text)]">IDENTIDAD DEL CANDIDATO</span>
            <h2 className="m-0 font-titulo text-[36px] md:text-[44px] leading-[1.05] font-medium truncate">{f.nombreCampana || f.nombre || 'Sin nombre'}</h2>
            <p className="m-0 text-[15px] text-[var(--c-muted)]">
              {[f.cargo && `Aspira a ${f.cargo}`, f.circunscripcion, f.partido, f.numeroTarjeton && `N.º ${f.numeroTarjeton}`].filter(Boolean).join(' · ') || 'Cargo, circunscripción y partido sin definir'}
            </p>
            <p className="m-0 text-sm max-w-3xl leading-relaxed">Todo Proteus se ajusta a esta identidad: el generador de contenido del mapa, el análisis de piezas, la publicidad y los segmentos. Lo que no esté definido aquí, Proteus no lo supone.</p>
          </div>
          <div className="shrink-0 flex items-center gap-4">
            <Anillo valor={total} tam={76} />
            <div className="flex flex-col text-sm">
              <span className="font-semibold">Identidad definida</span>
              <span className="text-[var(--c-muted)] inline-flex items-center gap-1">{guardado ? <><Check className="w-3.5 h-3.5 text-[var(--c-ok)]" /> Guardado {new Date(guardado).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</> : 'Se guarda sola al editar'}</span>
            </div>
          </div>
        </div>
        <div role="tablist" aria-label="Secciones de la identidad" className="flex gap-1 px-4 md:px-6 border-t border-[var(--c-border)] overflow-x-auto">
          {pestanas.map((p) => (
            <button key={p.id} role="tab" aria-selected={pestana === p.id} onClick={() => setPestana(p.id)}
              className={`shrink-0 min-h-14 px-4 -mb-px flex items-center gap-2.5 border-b-2 text-left ${pestana === p.id ? 'border-[var(--c-accent)]' : 'border-transparent text-[var(--c-muted)] hover:text-[var(--c-ink)]'}`}>
              {p.icono}<span className="flex flex-col"><span className="text-sm font-semibold">{p.t}</span><span className="text-xs text-[var(--c-muted)]">{p.d}</span></span>
            </button>
          ))}
        </div>
      </header>

      {pestana === 'identidad' && (
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-6 items-start">
          <nav aria-label="Bloques de la identidad" className="lg:sticky lg:top-2 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] p-2 flex lg:flex-col gap-1 overflow-x-auto">
            {BLOQUES.map((b, k) => {
              const on = b.id === bloque;
              return (
                <button key={b.id} type="button" onClick={() => setBloque(b.id)} aria-current={on ? 'page' : undefined}
                  className={`shrink-0 min-h-12 px-3 rounded-lg text-left flex items-center gap-3 ${on ? 'bg-[var(--c-accent-soft)]' : 'hover:bg-[var(--c-sunken)]'}`}>
                  <span className={`font-mono text-xs w-5 ${on ? 'text-[var(--c-accent-text)]' : 'text-[var(--c-muted)]'}`}>{String(k + 1).padStart(2, '0')}</span>
                  <span className="grow flex flex-col gap-1 min-w-[110px]">
                    <span className={`text-sm ${on ? 'font-semibold text-[var(--c-accent-text)]' : 'font-medium'}`}>{b.titulo}</span>
                    <span className="h-1 rounded-full bg-[var(--c-border)] overflow-hidden"><span className="block h-full bg-[var(--c-accent)]" style={{ width: `${comp[b.id] * 100}%` }} /></span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="flex flex-col gap-6 min-w-0">
            <section className="rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] p-5 md:p-7 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="m-0 font-titulo text-[30px] font-medium">{meta.titulo}</h2>
                <p className="m-0 text-[15px] text-[var(--c-muted)]">{meta.descripcion}</p>
              </div>
              <Editor i={identidad} set={(fn) => setIdentidad((x) => fn(x))} />
            </section>

            <details className="rounded-xl border border-[var(--c-border)] bg-[var(--c-sunken)] px-5">
              <summary className="cursor-pointer min-h-14 flex items-center justify-between gap-3">
                <span className="flex flex-col py-2"><span className="text-sm font-semibold">Lo que Proteus le dice a la IA sobre el candidato</span><span className="text-xs text-[var(--c-muted)]">Solo lo definido. Nunca correo, teléfono ni fotos.</span></span>
              </summary>
              <pre className="m-0 mb-5 whitespace-pre-wrap text-xs leading-relaxed font-mono">{identidadParaIA(identidad)}</pre>
            </details>
          </div>
        </div>
      )}

      {pestana === 'piezas' && <AnalisisPiezas identidad={identidad} onIrABloque={irA} />}
      {pestana === 'libro' && <LibroReglas identidad={identidad} />}
    </div>
  );
};
