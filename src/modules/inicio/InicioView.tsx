/**
 * INICIO: la página de presentación de Proteus, en forma de esquema.
 * Fuentes → proceso → organización del territorio → qué ofrece. Diseño "noche cívica" (lienzo de diseño
 * del 27-sep-2026). Las dos figuras 3D se dibujan con la geometría real (scripts/build_figuras_inicio.py)
 * y todos los números se leen de los datos de la app: nada escrito a mano.
 */
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getDepartmentCensus, getMunicipalCensus, CENSUS_META } from '../../services/electoralCensusService';
import { getMunicipiosConPuestosDepartamento } from '../../services/pollingStationsService';
import { cargarGanadores } from '../../services/winnersService';
import type { NavViewId } from '../../components/layout/navigation';
import mapa3d from '../../assets/inicio/antioquia-3d.svg';
import capasSvg from '../../assets/inicio/capas-territorio.svg';
import figuras from '../../data/inicio/figuras.json';

const fmt = (n: number) => n.toLocaleString('es-CO');
const millones = (n: number) => `${(n / 1e6).toLocaleString('es-CO', { maximumFractionDigits: 1 })} millones`;
/** Rionegro queda entre las columnas del Valle de Aburrá: su etiqueta taparía el mapa */
const ETIQUETAS_VISIBLES = ['05001', '05045', '05154'];
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

interface Props {
  onNavigate: (v: NavViewId) => void;
}

/** Tarjeta del esquema, con las líneas que la unen a la columna vecina (solo en pantallas anchas) */
const Nodo: React.FC<{ izq?: boolean; der?: boolean; className?: string; children: React.ReactNode }> = ({ izq, der, className = '', children }) => (
  <div className={`relative min-h-[88px] box-border rounded-[10px] border ${className}`}>
    {izq && <span aria-hidden className="hidden lg:block absolute right-full top-1/2 w-7 border-t border-[var(--n-oro)]/45" />}
    {izq && <span aria-hidden className="hidden lg:block absolute -left-[4px] top-1/2 -mt-[3.5px] w-[7px] h-[7px] rounded-full border border-[var(--n-oro)] bg-[var(--n-bg)]" />}
    {der && <span aria-hidden className="hidden lg:block absolute left-full top-1/2 w-7 border-t border-[var(--n-oro)]/45" />}
    {children}
  </div>
);

/** Columna del esquema; `izq`/`der` dibujan el bus vertical que recoge las líneas */
const Columna: React.FC<{ paso: string; titulo: string; izq?: boolean; der?: boolean; children: React.ReactNode }> = ({ paso, titulo, izq, der, children }) => (
  <div className="flex flex-col gap-3.5">
    <div className="h-[76px] flex flex-col justify-end gap-1.5">
      <span className="i-mono text-[12px] text-[var(--n-dim)]">{paso}</span>
      <h3 className="m-0 text-[28px] font-normal" style={serif}>{titulo}</h3>
    </div>
    <div className="relative flex flex-col gap-3.5">
      {izq && <span aria-hidden className="hidden lg:block absolute -left-7 top-11 bottom-11 border-l border-[var(--n-oro)]/45" />}
      {der && <span aria-hidden className="hidden lg:block absolute -right-7 top-11 bottom-11 border-r border-[var(--n-oro)]/45" />}
      {children}
    </div>
  </div>
);

const Encabezado: React.FC<{ eyebrow: string; titulo: React.ReactNode; texto: string }> = ({ eyebrow, titulo, texto }) => (
  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
    <div className="flex flex-col gap-4">
      <span className="i-mono text-[13px] text-[var(--n-oro)]">{eyebrow}</span>
      <h2 className="m-0 text-[32px] sm:text-[40px] md:text-[56px] leading-[1.05] font-medium tracking-[-0.01em]" style={serif}>{titulo}</h2>
    </div>
    <p className="m-0 lg:w-[420px] text-[17px] leading-relaxed text-[var(--n-muted)]">{texto}</p>
  </div>
);

export const InicioView: React.FC<Props> = ({ onNavigate }) => {
  const dep = getDepartmentCensus('antioquia');
  const municipios = getMunicipiosConPuestosDepartamento('antioquia');
  const puestos = municipios.reduce((s, m) => s + m.puestos, 0);
  const [elecciones, setElecciones] = useState<number | null>(null);
  useEffect(() => {
    let vivo = true;
    cargarGanadores().then((i) => vivo && setElecciones(i.elecciones.length)).catch(() => undefined);
    return () => { vivo = false; };
  }, []);
  const corte = CENSUS_META.corte.split('-')[0];
  const c = figuras.capas;

  const cifras = [
    { valor: dep ? millones(dep.total) : '—', texto: `votantes habilitados en ${corte}` },
    { valor: fmt(municipios.length), texto: 'municipios, 9 subregiones' },
    { valor: fmt(puestos), texto: 'puestos de votación' },
    { valor: elecciones == null ? '—' : String(elecciones), texto: 'elecciones por puesto, 2015–2026' },
  ];
  const fuentes = [
    { quien: 'REGISTRADURÍA', que: 'Escrutinio mesa a mesa, 2015–2026', color: 'var(--n-rosa)' },
    { quien: 'REGISTRADURÍA', que: 'Censo electoral y Divipole por puesto', color: 'var(--n-rosa)' },
    { quien: 'DANE', que: 'Censo 2018 por manzana y proyecciones 2026', color: 'var(--n-azul)' },
    { quien: 'DANE', que: 'Marco geoestadístico: veredas y centros poblados', color: 'var(--n-azul)' },
    { quien: 'ALCALDÍAS · GOBERNACIÓN', que: 'Comunas y barrios de los POT, alcaldes electos', color: 'var(--n-verde)' },
    { quien: 'OPENSTREETMAP', que: 'Ubicación de puestos sin coordenadas', color: '#D9C38A' },
  ];
  const pasos = [
    { t: 'Archivar el original', d: 'Tal cual se publicó, sin cédulas' },
    { t: 'Cruzar por nombre', d: 'Los códigos de puesto cambian en cada elección' },
    { t: 'Georreferenciar', d: 'Divipole, dirección, OpenStreetMap o vereda' },
    { t: 'Agregar por territorio', d: 'De la mesa y la manzana a la subregión' },
    { t: 'Etiquetar y validar', d: 'Las sumas por puesto cuadran con el municipio' },
  ];
  const niveles: { n: string; v: React.ReactNode }[] = [
    { n: 'Departamento', v: '1' },
    { n: 'Subregiones', v: '9' },
    { n: 'Municipios', v: fmt(municipios.length) },
    { n: 'Comunas y corregimientos', v: <span className="i-mono text-[10px] text-[var(--n-muted)] text-right shrink-0">MUNICIPIOS<br />GRANDES</span> },
    { n: 'Barrios y veredas', v: <span className="i-mono text-[10px] text-[var(--n-muted)] text-right shrink-0">{fmt(municipios.length)}<br />MUNICIPIOS</span> },
    { n: 'Puestos y manzanas', v: fmt(puestos) },
  ];
  const salidas: { t: string; d: string; v: NavViewId; icono: React.ReactNode; nota?: string }[] = [
    {
      t: 'Mapa multinivel', v: 'territorial-zoom', d: 'Del departamento al barrio, con capas de ganador por elección, estrato, censo y puestos.',
      icono: <svg width="120" height="72" viewBox="0 0 120 72" aria-hidden><path d="M10 50 L60 34 L110 50 L60 66 Z" fill="#2B2F34" /><path d="M10 36 L60 20 L110 36 L60 52 Z" fill="#4A2029" stroke="#F08A9A" strokeOpacity="0.6" /><path d="M10 22 L60 6 L110 22 L60 38 Z" fill="none" stroke="#F0CE8C" strokeWidth="1.4" /></svg>,
    },
    {
      t: 'Ficha de territorio', v: 'territorial-zoom', d: 'El perfil de cada lugar: población, estrato, vulnerabilidad y resultados, con la misma elección en otros años.',
      icono: <svg width="120" height="72" viewBox="0 0 120 72" aria-hidden><rect x="20" y="4" width="80" height="64" rx="6" fill="none" stroke="#F0CE8C" strokeWidth="1.4" /><line x1="32" y1="20" x2="70" y2="20" stroke="#ECE9E3" strokeWidth="3" /><line x1="32" y1="32" x2="88" y2="32" stroke="#50565C" strokeWidth="2" /><line x1="32" y1="42" x2="80" y2="42" stroke="#50565C" strokeWidth="2" /><line x1="32" y1="52" x2="60" y2="52" stroke="#F08A9A" strokeWidth="2" /></svg>,
    },
    {
      t: 'Serie histórica', v: 'territorial-zoom', d: `${elecciones ?? 'Las'} elecciones por puesto entre 2015 y 2026: territoriales, Congreso y Presidencia.`,
      icono: <svg width="120" height="72" viewBox="0 0 120 72" aria-hidden><line x1="8" y1="66" x2="112" y2="66" stroke="#2B2F34" strokeWidth="1.4" /><path d="M14 50 L36 38 L58 44 L80 24 L104 14" fill="none" stroke="#F0CE8C" strokeWidth="1.4" /><g fill="#F0CE8C"><circle cx="14" cy="50" r="3" /><circle cx="36" cy="38" r="3" /><circle cx="58" cy="44" r="3" /><circle cx="80" cy="24" r="3" /><circle cx="104" cy="14" r="3" /></g></svg>,
    },
    {
      t: 'Puestos de votación', v: 'territorial-zoom', d: 'Censo, mesas, dirección y resultado de cada puesto, filtrados por el área que se elige en el mapa.',
      icono: <svg width="120" height="72" viewBox="0 0 120 72" aria-hidden><path d="M30 58 C30 58 16 40 16 30 A14 14 0 0 1 44 30 C44 40 30 58 30 58 Z" fill="#4A2029" stroke="#F08A9A" strokeWidth="1.4" /><circle cx="30" cy="30" r="5" fill="#F0CE8C" /><path d="M78 50 C78 50 68 37 68 30 A10 10 0 0 1 88 30 C88 37 78 50 78 50 Z" fill="none" stroke="#F0CE8C" strokeWidth="1.4" /><path d="M102 40 C102 40 95 31 95 26 A7 7 0 0 1 109 26 C109 31 102 40 102 40 Z" fill="none" stroke="#50565C" strokeWidth="1.4" /></svg>,
    },
    {
      t: 'Día E', v: 'electoral-audit-forensics', d: 'Visor E-24 por zona y auditoría de mesas para acompañar el escrutinio.', nota: 'Las actas de la auditoría aún son de ejemplo',
      icono: <svg width="120" height="72" viewBox="0 0 120 72" aria-hidden><g fill="none" stroke="#50565C" strokeWidth="1.4"><rect x="10" y="8" width="20" height="16" rx="2" /><rect x="36" y="8" width="20" height="16" rx="2" /><rect x="62" y="8" width="20" height="16" rx="2" /><rect x="10" y="30" width="20" height="16" rx="2" /><rect x="62" y="30" width="20" height="16" rx="2" /><rect x="10" y="52" width="20" height="16" rx="2" /><rect x="36" y="52" width="20" height="16" rx="2" /><rect x="62" y="52" width="20" height="16" rx="2" /></g><rect x="36" y="30" width="20" height="16" rx="2" fill="#4A2029" stroke="#F08A9A" strokeWidth="1.4" /><path d="M92 38 L100 46 L114 28" fill="none" stroke="#F0CE8C" strokeWidth="1.8" /></svg>,
    },
    {
      t: 'Red de poder', v: 'territorial-zoom', d: 'Casas políticas y sus vínculos en 3D.', nota: 'En verificación: cada vínculo necesita fuente',
      icono: <svg width="120" height="72" viewBox="0 0 120 72" aria-hidden><g stroke="#50565C" strokeWidth="1.2"><line x1="60" y1="36" x2="22" y2="16" /><line x1="60" y1="36" x2="24" y2="58" /><line x1="60" y1="36" x2="98" y2="14" /><line x1="60" y1="36" x2="100" y2="56" /><line x1="22" y1="16" x2="24" y2="58" /></g><circle cx="60" cy="36" r="9" fill="#4A2029" stroke="#F08A9A" strokeWidth="1.4" /><circle cx="22" cy="16" r="5" fill="#F0CE8C" /><circle cx="24" cy="58" r="5" fill="none" stroke="#F0CE8C" strokeWidth="1.4" /><circle cx="98" cy="14" r="5" fill="none" stroke="#F0CE8C" strokeWidth="1.4" /><circle cx="100" cy="56" r="5" fill="#F0CE8C" /></svg>,
    },
  ];
  const capas: { v: string; n: string; d: string }[] = [
    { v: '1', n: 'Departamento', d: `Antioquia completo: ${dep ? fmt(dep.total) : '—'} votantes habilitados en el censo ${corte}.` },
    { v: '9', n: 'Subregiones', d: 'Valle de Aburrá, Oriente, Suroeste, Occidente, Norte, Nordeste, Magdalena Medio, Bajo Cauca y Urabá.' },
    { v: fmt(municipios.length), n: 'Municipios', d: `Alcalde electo, población 2026, NBI y el ganador de cada una de las ${elecciones ?? ''} elecciones.`.replace('  ', ' ') },
    { v: `${c.comunas} + ${c.corregimientos}`, n: 'Comunas y corregimientos', d: 'En la figura, Medellín. Censo por zona y resultados sumados desde sus puestos.' },
    { v: fmt(c.barrios), n: 'Barrios, veredas y puestos', d: `Estrato, edad, IPM y vulnerabilidad por manzana del DANE; en dorado, los ${fmt(c.puestosMedellin)} puestos ubicados de Medellín con su resultado mesa a mesa.` },
  ];

  return (
    <div className="proteus-civico inicio-noche -mx-6 md:-mx-8 -my-6 overflow-hidden">
      {/* PORTADA */}
      <section className="relative grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-x-8 gap-y-6 px-6 md:px-12 xl:px-20 pt-16 pb-14">
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 620px 420px at 72% 45%, rgba(163,36,58,0.22), rgba(14,16,18,0) 70%)' }} />
        <div className="relative flex flex-col gap-7 xl:pt-6">
          <span className="i-mono text-[13px] text-[var(--n-oro)]">INTELIGENCIA ELECTORAL · ANTIOQUIA</span>
          <h1 className="m-0 text-[40px] sm:text-[52px] md:text-[68px] 2xl:text-[84px] leading-[0.98] font-medium tracking-[-0.02em]" style={serif}>El territorio,<br />voto a voto.</h1>
          <p className="m-0 max-w-[500px] text-[19px] leading-relaxed text-[#BFC4C9]">Proteus reúne los resultados oficiales mesa a mesa, el censo y la cartografía en un solo mapa: de la subregión a la manzana, de 2015 a 2026.</p>
          <div className="flex flex-wrap gap-3.5">
            <button onClick={() => onNavigate('territorial-zoom')} className="inline-flex items-center gap-2 h-[52px] px-7 rounded-full bg-[var(--n-guinda)] hover:bg-[#B52B43] text-white font-semibold text-base transition-colors">
              Explorar el mapa <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
            </button>
            <a href="#inicio-esquema" className="inline-flex items-center h-[52px] px-6 rounded-full border border-[#3A3F45] hover:border-[var(--n-oro)] text-[var(--n-ink)] font-medium text-base no-underline transition-colors">Cómo funciona</a>
          </div>
        </div>
        <figure className="relative m-0 self-center">
          <div className="relative w-full" style={{ aspectRatio: `${figuras.mapa.ancho} / ${figuras.mapa.alto}` }}>
            <img src={mapa3d} alt="Mapa 3D de Antioquia: cada columna es un municipio y su altura, los votantes habilitados" className="absolute inset-0 w-full h-full" />
            {figuras.mapa.etiquetas.filter((e) => ETIQUETAS_VISIBLES.includes(e.dane)).map((e) => {
              const m = getMunicipalCensus(e.dane);
              const izquierda = e.x < figuras.mapa.ancho / 3;
              return (
                <div key={e.dane} className={`absolute hidden sm:flex flex-col gap-0.5 i-mono text-[10px] md:text-[11px] ${izquierda ? 'items-end text-right pr-2.5 border-r' : 'pl-2.5 border-l'} border-[var(--n-oro)]/60`}
                  style={{ left: `${(100 * e.x) / figuras.mapa.ancho}%`, top: `${(100 * (e.y - 40)) / figuras.mapa.alto}%`, transform: izquierda ? 'translateX(-100%)' : undefined }}>
                  <span className={e.dane === '05001' ? 'text-[var(--n-oro)]' : 'text-[var(--n-ink)]'}>{e.nombre.toUpperCase()}</span>
                  {m && <span className="text-[var(--n-muted)]">{fmt(m.total)}{e.dane === '05001' ? ' votantes' : ''}</span>}
                </div>
              );
            })}
          </div>
          <figcaption className="i-mono text-[11px] text-[var(--n-dim)] text-center mt-2">ALTURA = VOTANTES HABILITADOS · CENSO ELECTORAL {corte} · REGISTRADURÍA</figcaption>
        </figure>
          <dl className="relative m-0 xl:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-7">
            {cifras.map((x) => (
              <div key={x.texto} className="flex flex-col-reverse gap-1 border-t border-[var(--n-line)] pt-3.5">
                <dt className="text-sm text-[var(--n-muted)]">{x.texto}</dt>
                <dd className="m-0 text-[26px] sm:text-[32px] md:text-[38px] sm:whitespace-nowrap font-medium text-[var(--n-oro)] tabular-nums" style={serif}>{x.valor}</dd>
              </div>
            ))}
          </dl>
      </section>

      {/* ESQUEMA */}
      <section id="inicio-esquema" className="bg-[var(--n-alt)] border-t border-[var(--n-line-suave)] px-6 md:px-12 xl:px-20 py-24 flex flex-col gap-14 scroll-mt-4">
        <Encabezado eyebrow="EL ESQUEMA" titulo={<>De la fuente oficial<br />al territorio que decide.</>}
          texto="Seis fuentes públicas entran por la izquierda. Cinco pasos las limpian y las cruzan. Salen ordenadas en seis niveles del territorio y se ven en seis herramientas." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-14 gap-y-12">
          <Columna paso="01 · ENTRA" titulo="Fuentes" der>
            {fuentes.map((f) => (
              <Nodo key={f.que} der className="px-4 py-3.5 bg-[var(--n-card)] border-[var(--n-line)] flex flex-col gap-1.5">
                <span className="i-mono text-[11px]" style={{ color: f.color }}>{f.quien}</span>
                <span className="text-[14px] leading-snug">{f.que}</span>
              </Nodo>
            ))}
          </Columna>
          <Columna paso="02 · TRANSFORMA" titulo="Proceso" izq der>
            {pasos.map((p, i) => (
              <Nodo key={p.t} izq der className="px-4 py-3.5 bg-[var(--n-card-proceso)] border-[var(--n-line-proceso)] flex gap-3.5 items-start">
                <span className="text-[26px] leading-none text-[var(--n-oro)]" style={serif}>{i + 1}</span>
                <span className="flex flex-col gap-1"><span className="text-[15px] font-semibold">{p.t}</span><span className="text-[13px] leading-snug text-[var(--n-muted)]">{p.d}</span></span>
              </Nodo>
            ))}
          </Columna>
          <Columna paso="03 · ORDENA" titulo="Organización" izq der>
            {niveles.map((n) => (
              <Nodo key={n.n} izq der className="px-[18px] bg-[var(--n-card)] border-[var(--n-line)] flex items-center justify-between gap-3">
                <span className="text-[15px] leading-snug">{n.n}</span>
                {typeof n.v === 'string' ? <span className="text-[26px] text-[var(--n-oro)] tabular-nums" style={serif}>{n.v}</span> : n.v}
              </Nodo>
            ))}
          </Columna>
          <Columna paso="04 · ENTREGA" titulo="Qué ofrece" izq>
            {salidas.map((s, i) => (
              <Nodo key={s.t} izq className={`p-0 ${i === 0 ? 'bg-[var(--n-guinda)] border-[var(--n-guinda)]' : 'bg-[var(--n-card)] border-[var(--n-line)]'}`}>
                <button onClick={() => onNavigate(s.v)} className={`w-full h-full px-[18px] flex items-center justify-between rounded-[10px] text-left text-[15px] font-semibold ${i === 0 ? 'text-white hover:bg-[#B52B43]' : 'text-[var(--n-ink)] hover:bg-[#22262A]'} transition-colors`}>
                  {s.t}<ArrowRight className={`w-[18px] h-[18px] ${i === 0 ? 'text-white' : 'text-[var(--n-oro)]'}`} strokeWidth={1.6} />
                </button>
              </Nodo>
            ))}
          </Columna>
        </div>
      </section>

      {/* ORGANIZACIÓN */}
      <section className="relative border-t border-[var(--n-line-suave)] px-6 md:px-12 xl:px-20 py-24 flex flex-col gap-10">
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 520px 600px at 25% 55%, rgba(240,206,140,0.07), rgba(14,16,18,0) 70%)' }} />
        <div className="relative">
          <Encabezado eyebrow="CÓMO SE ORGANIZA" titulo={<>Un mismo lugar,<br />seis escalas.</>}
            texto="Cada dato cae en la escala más fina en que existe y sube por suma, nunca por reparto. Por eso el municipio siempre cuadra con sus puestos." />
        </div>
        <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,600px)_minmax(0,1fr)] gap-x-16 gap-y-8">
          <img src={capasSvg} alt="Capas del territorio apiladas: departamento, subregiones, municipios, comunas de Medellín y barrios con sus puestos" className="w-full max-w-[600px] mx-auto" style={{ aspectRatio: `${c.ancho} / ${c.alto}` }} />
          <ol className="m-0 p-0 list-none flex flex-col gap-6 lg:block lg:relative">
            {capas.map((x, i) => (
              <li key={x.n} className="lg:absolute left-0 right-0 flex gap-5 items-baseline border-t border-[var(--n-line)] pt-3.5" style={{ top: `${(100 * (c.centros[i] - 28)) / c.alto}%` }}>
                <span className="w-[104px] shrink-0 whitespace-nowrap text-[30px] md:text-[34px] text-[var(--n-oro)] tabular-nums" style={serif}>{x.v}</span>
                <span className="flex flex-col gap-1.5"><span className="text-lg font-semibold">{x.n}</span><span className="text-sm leading-relaxed text-[var(--n-muted)]">{x.d}</span></span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* QUÉ OFRECE */}
      <section className="bg-[var(--n-alt)] border-t border-[var(--n-line-suave)] px-6 md:px-12 xl:px-20 py-24 flex flex-col gap-14">
        <Encabezado eyebrow="QUÉ OFRECE" titulo={<>Seis maneras de leer<br />el mismo territorio.</>}
          texto="Todas beben de la misma base: lo que cambia en una se ve en las demás." />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {salidas.map((s) => (
            <button key={s.t} onClick={() => onNavigate(s.v)} className="min-h-[280px] box-border p-7 rounded-[14px] bg-[var(--n-card)] border border-[var(--n-line)] hover:border-[var(--n-oro)] flex flex-col justify-between gap-6 text-left text-[var(--n-ink)] transition-colors">
              {s.icono}
              <span className="flex flex-col gap-2.5">
                <span className="text-[28px]" style={serif}>{s.t}</span>
                <span className="text-[15px] leading-relaxed text-[var(--n-muted)]">{s.d}</span>
                {s.nota && <span className="i-mono text-[11px] text-[var(--n-ambar)]">{s.nota.toUpperCase()}</span>}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* UNA REGLA */}
      <section className="border-t border-[var(--n-line-suave)] px-6 md:px-12 xl:px-20 py-16 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
        <div className="lg:w-[380px] shrink-0 flex flex-col gap-3">
          <span className="i-mono text-[13px] text-[var(--n-oro)]">UNA REGLA</span>
          <span className="text-[34px] leading-tight" style={serif}>Ningún dato sin su procedencia.</span>
        </div>
        <div className="grow grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: 'Oficial', d: 'Publicado por la Registraduría, el DANE o la alcaldía, sin cambios.', c: 'var(--n-verde)' },
            { t: 'Estimado', d: 'Calculado por Proteus, siempre con el método a la vista.', c: 'var(--n-ambar)' },
            { t: 'Sin información', d: 'Se dice que falta. Nunca se rellena.', c: '#BFC4C9' },
          ].map((r) => (
            <div key={r.t} className="flex flex-col gap-2.5 border-t-2 pt-[18px]" style={{ borderColor: r.c }}>
              <span className="text-lg font-semibold" style={{ color: r.c }}>{r.t}</span>
              <span className="text-[15px] leading-relaxed text-[var(--n-muted)]">{r.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CIERRE */}
      <footer className="bg-[var(--n-alt)] border-t border-[var(--n-line-suave)] px-6 md:px-12 xl:px-20 py-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="flex flex-col gap-3.5 max-w-[760px]">
          <span className="text-[36px] md:text-[44px] leading-[1.1]" style={serif}>Antioquia primero.<br />Colombia después.</span>
          <span className="text-[13px] leading-relaxed text-[var(--n-dim)]">Datos: Registraduría Nacional del Estado Civil, DANE, Gobernación de Antioquia, alcaldías municipales y © colaboradores de OpenStreetMap (ODbL).</span>
        </div>
        <button onClick={() => onNavigate('territorial-zoom')} className="self-start lg:self-auto inline-flex items-center gap-3 h-[60px] px-8 rounded-full bg-[var(--n-guinda)] hover:bg-[#B52B43] text-white font-semibold text-lg transition-colors">
          Entrar a Proteus <ArrowRight className="w-[18px] h-[18px]" strokeWidth={1.8} />
        </button>
      </footer>
    </div>
  );
};
