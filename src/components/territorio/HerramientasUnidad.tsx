/**
 * Columna de herramientas del mapa. El mapa es la consola de navegación de Proteus: al elegir una unidad territorial
 * (subregión, municipio, comuna, barrio o vereda) esa unidad pasa a ser el territorio activo y aquí aparecen todas las
 * herramientas de generación y análisis con IA, con una línea de qué hace cada una. Todas leen las tres macrofuentes
 * de esa unidad (datos del aplicativo, perfil del candidato y marco).
 */
import React from 'react';
import {
  BarChart3, Building2, Calculator, FileSearch, Map, Megaphone, MessagesSquare, Network, Newspaper, PenLine, Sparkles, Users, Video,
} from 'lucide-react';
import type { NavViewId } from '../layout/navigation';

export type AnclaMapa = 'generador' | 'analista' | 'redes' | 'noticias';

interface Herramienta {
  id: string;
  titulo: string;
  descripcion: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  destino: { vista: NavViewId } | { ancla: AnclaMapa };
  /** Solo para unidades de Antioquia */
  soloAntioquia?: boolean;
}

const GRUPOS: { titulo: string; items: Herramienta[] }[] = [
  {
    titulo: 'En esta pantalla',
    items: [
      { id: 'generador', titulo: 'Generador de contenido', descripcion: 'Piezas para redes y medios con los datos de la unidad, la voz del candidato y el marco.', icon: Sparkles, destino: { ancla: 'generador' } },
      { id: 'analista', titulo: 'Analista territorial', descripcion: 'Pregunta lo que quieras: responde con todo lo que Proteus tiene de la unidad.', icon: MessagesSquare, destino: { ancla: 'analista' } },
      { id: 'noticias', titulo: 'Noticias', descripcion: 'Noticias de los últimos 60 días con la búsqueda de Google; entran a todos los análisis.', icon: Newspaper, destino: { ancla: 'noticias' }, soloAntioquia: true },
      { id: 'redes', titulo: 'Redes de poder', descripcion: 'Casas políticas y actores con presencia en el territorio, en 3D.', icon: Network, destino: { ancla: 'redes' } },
    ],
  },
  {
    titulo: 'Contenido',
    items: [
      { id: 'redactar', titulo: 'Redactar (brief)', descripcion: 'Brief estratégico de 7 puntos para una audiencia de la unidad.', icon: PenLine, destino: { vista: 'content-director' } },
      { id: 'publicidad', titulo: 'Publicidad segmentada', descripcion: 'Variantes de anuncios por arquetipo, con los supuestos de pauta rotulados.', icon: Megaphone, destino: { vista: 'targeted-advertising' } },
      { id: 'multimedia', titulo: 'Multimedia', descripcion: 'Auditoría de la foto (color, vestuario) y de los videos del candidato.', icon: Video, destino: { vista: 'multimedia-studio' } },
      { id: 'revisores', titulo: 'Revisores', descripcion: 'Cinco roles de Gemini: investigación, segmentos, creativo, multimedia y búsqueda.', icon: Users, destino: { vista: 'agent-team' } },
      { id: 'piezas', titulo: 'Análisis de piezas', descripcion: 'Evalúa una imagen, video o texto contra la identidad y el libro de reglas.', icon: FileSearch, destino: { vista: 'national-candidates' } },
    ],
  },
  {
    titulo: 'Electorado',
    items: [
      { id: 'segmentos', titulo: 'Segmentos de población', descripcion: 'Personas de 18+ por sexo, edad, estrato y educación (DANE) y análisis de un segmento.', icon: BarChart3, destino: { vista: 'voter-segmentation' } },
      { id: 'escenarios', titulo: 'Escenarios', descripcion: 'Simulador D’Hondt con plan táctico, clima político y DAFO de encuestas.', icon: Calculator, destino: { vista: 'national-tools' } },
    ],
  },
  {
    titulo: 'Antioquia',
    items: [
      { id: 'subregiones', titulo: 'Subregiones', descripcion: 'Informe transversal de la subregión, noticias del último mes y guiones.', icon: Map, destino: { vista: 'antioquia-subregiones' }, soloAntioquia: true },
      { id: 'departamento', titulo: 'Departamento', descripcion: 'Guiones a partir del informe de la Gobernación o de un PDF de directrices.', icon: Building2, destino: { vista: 'antioquia-gobernacion' }, soloAntioquia: true },
    ],
  },
];

interface Props {
  /** Nombre de la unidad elegida; null si todavía no se ha elegido ninguna */
  nombre: string | null;
  antioquia: boolean;
  onIr: (vista: NavViewId) => void;
  onAncla: (ancla: AnclaMapa) => void;
  /** Cuadrícula horizontal (pantallas medianas) en vez de columna */
  enCuadricula?: boolean;
}

export const HerramientasUnidad: React.FC<Props> = ({ nombre, antioquia, onIr, onAncla, enCuadricula }) => (
  <section aria-label="Herramientas para la unidad elegida" className="proteus-civico rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-3 flex flex-col gap-3">
    <header className="flex flex-col gap-0.5">
      <span className="text-xs uppercase tracking-wide font-bold text-[var(--c-accent-text)]">Herramientas</span>
      {nombre ? (
        <>
          <h2 className="m-0 text-base font-bold leading-snug">{nombre}</h2>
          <p className="m-0 text-xs text-[var(--c-muted)]">Todas trabajan sobre esta unidad con sus datos, el perfil del candidato y el marco. Las que tienen selector propio arrancan aquí y se pueden cambiar.</p>
        </>
      ) : (
        <p className="m-0 text-sm text-[var(--c-muted)]">Elige una subregión, un municipio, una comuna o un barrio en el mapa para ver las herramientas.</p>
      )}
    </header>
    {nombre && (
      <div className={enCuadricula ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3' : 'flex flex-col gap-3'}>
        {GRUPOS.map((g) => (
          <div key={g.titulo} className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[var(--c-muted)]">{g.titulo}</span>
            {g.items.map((h) => {
              const off = h.soloAntioquia && !antioquia;
              const Icon = h.icon;
              return (
                <button
                  key={h.id}
                  type="button"
                  disabled={off}
                  title={off ? 'Solo para unidades de Antioquia' : undefined}
                  onClick={() => ('vista' in h.destino ? onIr(h.destino.vista) : onAncla(h.destino.ancla))}
                  className="w-full text-left flex gap-2.5 items-start rounded-xl px-2.5 py-2 border border-transparent hover:border-[var(--c-border)] hover:bg-[var(--c-sunken)] disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <Icon className="w-4 h-4 mt-0.5 shrink-0 text-[var(--c-accent)]" strokeWidth={1.8} />
                  <span className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold leading-tight">{h.titulo}</span>
                    <span className="text-xs text-[var(--c-muted)] leading-snug">{h.descripcion}</span>
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    )}
  </section>
);

export default HerramientasUnidad;
