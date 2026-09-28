/** Los nueve bloques editables de la identidad del candidato */
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  ARQUETIPOS, CARGOS, REDES, paletaDefinida,
  type BloqueId, type IdentidadCandidato, type Red, type Arquetipo, type Integrante, type Referente,
} from '../../services/identidad/identidad';
import { contrasteWcag, hexARgb } from '../../services/analisisPiezas/medicion';
import { SUBREGIONES, municipiosDe } from '../../services/contentGeneratorService';
import { Area, Campo, Escala, Etiquetas, Fichas, Grupo, Interruptor, Selector } from './campos';

export type Actualizar = (f: (i: IdentidadCandidato) => IdentidadCandidato) => void;
interface P { i: IdentidadCandidato; set: Actualizar }

const TERRITORIOS = [...SUBREGIONES.map((s) => `Subregión ${s}`), ...municipiosDe(null).map((m) => m.nombre)];
const PUBLICOS = ['Jóvenes de 18 a 28 años', 'Mujeres cabeza de hogar', 'Adultos mayores', 'Primeros votantes', 'Comerciantes y tenderos', 'Campesinos', 'Transportadores', 'Estudiantes universitarios', 'Víctimas del conflicto', 'Trabajadores informales', 'Clase media profesional', 'Líderes comunales (JAC)'];

const btnSec = 'inline-flex items-center gap-1.5 min-h-11 px-3.5 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-sm font-semibold hover:border-[var(--c-accent)]';

function Ficha({ i, set }: P) {
  const f = i.ficha;
  const u = (k: keyof typeof f) => (v: string) => set((x) => ({ ...x, ficha: { ...x.ficha, [k]: v } }));
  return (
    <>
      <Grupo titulo="Quién es" descripcion="Lo básico que Proteus pone en cada pieza y cada análisis.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Campo titulo="Nombre completo" valor={f.nombre} onChange={u('nombre')} />
          <Campo titulo="Nombre de campaña" ayuda="Como quiere que lo llamen (por ejemplo, solo el apellido)." valor={f.nombreCampana} onChange={u('nombreCampana')} />
          <Campo titulo="Rango de edad" valor={f.rangoEdad} onChange={u('rangoEdad')} placeholder="Por ejemplo, 35 a 44" />
          <Campo titulo="Lugar de residencia" valor={f.lugarResidencia} onChange={u('lugarResidencia')} lista="identidad-territorios" />
          <Campo titulo="Formación u ocupación" valor={f.formacion} onChange={u('formacion')} className="md:col-span-2" />
        </div>
        <Area titulo="Trayectoria" ayuda="Cargos, logros verificables y experiencia. Proteus solo usará lo que esté aquí." valor={f.trayectoria} onChange={u('trayectoria')} filas={4} />
      </Grupo>
      <Grupo titulo="A qué aspira" descripcion="Define la escala del mensaje: lo que un cargo puede prometer y dónde se juega la elección.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Selector titulo="Cargo" valor={f.cargo} onChange={u('cargo')} opciones={CARGOS.map((c) => ({ v: c, t: c }))} />
          <Campo titulo="Circunscripción" ayuda="Municipio, departamento o nacional." valor={f.circunscripcion} onChange={u('circunscripcion')} lista="identidad-territorios" />
          <Campo titulo="Partido, movimiento o coalición" valor={f.partido} onChange={u('partido')} />
          <Campo titulo="Número en el tarjetón" valor={f.numeroTarjeton} onChange={u('numeroTarjeton')} />
          <Campo titulo="Fecha de la elección" tipo="date" valor={f.fechaEleccion} onChange={u('fechaEleccion')} />
        </div>
      </Grupo>
    </>
  );
}

function Posicionamiento({ i, set }: P) {
  const p = i.posicionamiento;
  const u = <K extends keyof typeof p>(k: K) => (v: (typeof p)[K]) => set((x) => ({ ...x, posicionamiento: { ...x.posicionamiento, [k]: v } }));
  const ejes = p.ejes;
  const cambiarEje = (k: number, campo: 'tema' | 'propuesta', v: string) => u('ejes')(ejes.map((e, j) => (j === k ? { ...e, [campo]: v } : e)));
  return (
    <>
      <Grupo titulo="Propuesta de valor" descripcion="La razón para votar por el candidato, en una o dos frases. Todo lo demás se mide contra esto.">
        <Area titulo="Propuesta de valor" valor={p.propuestaValor} onChange={u('propuestaValor')} filas={2} placeholder="Por qué este candidato y no otro" />
        <Fichas<Arquetipo> titulo="Arquetipo" ayuda="La figura que encarna. Orienta encuadres, tono y escenarios." opciones={ARQUETIPOS.map((a) => ({ v: a.id, t: a.nombre, d: a.idea }))} valor={p.arquetipo ? [p.arquetipo] : []} onChange={(v) => u('arquetipo')(v[0] ?? '')} />
      </Grupo>
      <Grupo titulo="Ejes programáticos" descripcion="En orden de prioridad. El primero es el que más se repite.">
        <div className="flex flex-col gap-3">
          {ejes.map((e, k) => (
            <div key={k} className="grid grid-cols-[32px_minmax(0,1fr)] md:grid-cols-[32px_minmax(0,1fr)_minmax(0,2fr)_44px] gap-3 items-end">
              <span className="font-titulo text-2xl text-[var(--c-accent-text)] pb-2">{k + 1}</span>
              <Campo titulo="Tema" valor={e.tema} onChange={(v) => cambiarEje(k, 'tema', v)} />
              <Campo titulo="Propuesta concreta" valor={e.propuesta} onChange={(v) => cambiarEje(k, 'propuesta', v)} className="col-start-2 md:col-start-auto" />
              <button type="button" onClick={() => u('ejes')(ejes.filter((_, j) => j !== k))} aria-label={`Quitar eje ${k + 1}`} className="w-11 h-11 inline-flex items-center justify-center rounded-lg border border-[var(--c-border)] hover:border-[var(--c-accent)] col-start-2 md:col-start-auto"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          {ejes.length < 5 && <button type="button" onClick={() => u('ejes')([...ejes, { tema: '', propuesta: '' }])} className={`${btnSec} self-start`}><Plus className="w-4 h-4" /> Agregar eje</button>}
        </div>
      </Grupo>
      <Grupo titulo="A quién y dónde" descripcion="Públicos y territorios en los que se concentra la campaña. El mapa y los segmentos los priorizan.">
        <Etiquetas titulo="Públicos prioritarios" valores={p.publicos} onChange={u('publicos')} lista="identidad-publicos" placeholder="Escribe y presiona Enter" />
        <Etiquetas titulo="Territorios prioritarios" valores={p.territoriosPrioritarios} onChange={u('territoriosPrioritarios')} lista="identidad-territorios" placeholder="Municipio o subregión" />
        <Area titulo="Contraste con los adversarios" ayuda="Qué lo diferencia, dicho sin atacar personas." valor={p.contraste} onChange={u('contraste')} />
      </Grupo>
    </>
  );
}

function Voz({ i, set }: P) {
  const v = i.voz;
  const u = <K extends keyof typeof v>(k: K) => (val: (typeof v)[K]) => set((x) => ({ ...x, voz: { ...x.voz, [k]: val } }));
  return (
    <>
      <Grupo titulo="Registro" descripcion="Cómo suena el candidato. Se aplica a textos, discursos y a la evaluación de sus videos.">
        <Escala titulo="Formalidad" valor={v.formalidad} onChange={u('formalidad')} bajo="Muy cercano" alto="Muy formal" />
        <Escala titulo="Energía" valor={v.energia} onChange={u('energia')} bajo="Sereno" alto="Enérgico" />
        <Escala titulo="Nivel técnico" valor={v.tecnicismo} onChange={u('tecnicismo')} bajo="Coloquial" alto="Técnico" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Selector titulo="Persona gramatical" valor={v.persona} onChange={(x) => u('persona')(x as typeof v.persona)} opciones={[{ v: 'yo', t: 'Yo (primera singular)' }, { v: 'nosotros', t: 'Nosotros (primera plural)' }, { v: 'mixta', t: 'Mixta' }]} />
          <Selector titulo="Humor" valor={v.humor} onChange={(x) => u('humor')(x as typeof v.humor)} opciones={[{ v: 'nunca', t: 'Nunca' }, { v: 'a veces', t: 'A veces' }, { v: 'frecuente', t: 'Frecuente' }]} />
        </div>
      </Grupo>
      <Grupo titulo="Oratoria" descripcion="El análisis de video mide el ritmo real sobre la transcripción y lo compara con este rango.">
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <Campo titulo="Ritmo mínimo" ayuda="Palabras por minuto" tipo="number" valor={String(v.ritmoMin)} onChange={(x) => u('ritmoMin')(Number(x) || 0)} />
          <Campo titulo="Ritmo máximo" ayuda="Palabras por minuto" tipo="number" valor={String(v.ritmoMax)} onChange={(x) => u('ritmoMax')(Number(x) || 0)} />
        </div>
        <Etiquetas titulo="Muletillas a vigilar" ayuda="Se cuentan en cada transcripción." valores={v.muletillas} onChange={u('muletillas')} placeholder="eh, o sea, digamos…" />
      </Grupo>
      <Grupo titulo="Léxico" descripcion="Palabras que construyen marca y palabras que la destruyen.">
        <Etiquetas titulo="Frases firma" valores={v.frasesFirma} onChange={u('frasesFirma')} />
        <Etiquetas titulo="Palabras propias" valores={v.lexicoPropio} onChange={u('lexicoPropio')} />
        <Etiquetas titulo="Palabras que no usa" valores={v.palabrasProhibidas} onChange={u('palabrasProhibidas')} />
        <Campo titulo="Regionalismos" ayuda="Por ejemplo: paisa moderado, sin voseo en piezas escritas." valor={v.regionalismos} onChange={u('regionalismos')} />
      </Grupo>
    </>
  );
}

function Imagen({ i, set }: P) {
  const im = i.imagen;
  const u = <K extends keyof typeof im>(k: K) => (v: (typeof im)[K]) => set((x) => ({ ...x, imagen: { ...x.imagen, [k]: v } }));
  const cambiarColor = (k: number, campo: 'hex' | 'nombre', v: string) => u('paleta')(im.paleta.map((c, j) => (j === k ? { ...c, [campo]: v } : c)));
  const definidos = paletaDefinida(i);
  return (
    <>
      <Grupo titulo="Paleta de marca" descripcion="El análisis mide cuánto de cada pieza cae en estos colores (diferencia ΔE2000 dentro de la tolerancia).">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {im.paleta.map((c, k) => {
            const valido = /^#[0-9a-f]{6}$/i.test(c.hex);
            return (
              <div key={c.rol} className="rounded-xl border border-[var(--c-border)] overflow-hidden bg-[var(--c-surface)]">
                <div className="h-24 flex items-end p-3" style={{ background: valido ? c.hex : 'repeating-linear-gradient(45deg, var(--c-sunken), var(--c-sunken) 8px, var(--c-surface) 8px, var(--c-surface) 16px)' }}>
                  <span className="text-xs font-bold uppercase tracking-wide px-2 py-1 rounded bg-[var(--c-surface)]/90 text-[var(--c-ink)]">{c.rol}</span>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <input type="color" aria-label={`Elegir color ${c.rol}`} value={valido ? c.hex : '#888888'} onChange={(e) => cambiarColor(k, 'hex', e.target.value.toUpperCase())} className="shrink-0 w-11 h-11 rounded-lg border border-[var(--c-border)] bg-transparent p-1 cursor-pointer" />
                    <input aria-label={`Código del color ${c.rol}`} value={c.hex} placeholder="#RRGGBB" onChange={(e) => cambiarColor(k, 'hex', e.target.value)} className="min-w-0 w-full h-11 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] px-3 font-mono text-sm uppercase" />
                  </div>
                  <input aria-label={`Nombre del color ${c.rol}`} value={c.nombre ?? ''} placeholder="Nombre (opcional)" onChange={(e) => cambiarColor(k, 'nombre', e.target.value)} className="min-w-0 w-full h-10 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] px-3 text-sm" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="max-w-xs">
          <Campo titulo="Tolerancia de color (ΔE2000)" ayuda="Hasta cuánto puede alejarse un color y seguir contando como de marca. 5 es estricto; 10, usual; 15, laxo." tipo="number" valor={String(im.toleranciaColor)} onChange={(v) => u('toleranciaColor')(Math.max(1, Math.min(30, Number(v) || 10)))} />
        </div>
        {definidos.length >= 2 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Contraste entre colores de la paleta (texto sobre fondo)</span>
            <span className="text-xs text-[var(--c-muted)]">Medido con la fórmula de WCAG: 4,5:1 sirve para texto normal; 3:1, solo para texto grande.</span>
            <div className="overflow-x-auto">
              <table className="text-sm border-collapse">
                <thead><tr><th className="p-2" />{definidos.map((c) => <th key={c.rol} scope="col" className="p-2 text-xs font-semibold text-[var(--c-muted)]">{c.rol} <span className="font-normal">(texto)</span></th>)}</tr></thead>
                <tbody>
                  {definidos.map((a) => (
                    <tr key={a.rol}>
                      <th className="p-2 text-xs font-semibold text-[var(--c-muted)] text-right" scope="row">{a.rol} <span className="font-normal">(fondo)</span></th>
                      {definidos.map((b) => {
                        if (a.rol === b.rol) return <td key={b.rol} className="p-1"><div className="w-24 h-10 rounded-md bg-[var(--c-sunken)]" /></td>;
                        const cr = contrasteWcag(hexARgb(a.hex)!, hexARgb(b.hex)!);
                        return (
                          <td key={b.rol} className="p-1">
                            <div className="w-24 flex flex-col gap-1">
                              <div className="h-10 rounded-md flex items-center justify-center border border-[var(--c-border)] font-titulo text-xl" style={{ background: a.hex, color: b.hex }} aria-hidden>Aa</div>
                              <span className={`text-[11px] font-semibold text-center ${cr >= 4.5 ? 'text-[var(--c-ok)]' : cr >= 3 ? 'text-[var(--c-warn)]' : 'text-[var(--c-accent-text)]'}`}>{cr.toFixed(1)}:1 · {cr >= 4.5 ? 'texto normal' : cr >= 3 ? 'solo grande' : 'no usar'}</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Grupo>
      <Grupo titulo="Tipografía y fotografía">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Campo titulo="Tipografía de títulos" valor={im.tipografiaTitulos} onChange={u('tipografiaTitulos')} />
          <Campo titulo="Tipografía de texto" valor={im.tipografiaTexto} onChange={u('tipografiaTexto')} />
        </div>
        <Area titulo="Estilo fotográfico" ayuda="Luz, temperatura, tratamiento de color." valor={im.estiloFotografico} onChange={u('estiloFotografico')} placeholder="Luz natural, cálida, sin filtros saturados…" />
        <Area titulo="Encuadres preferidos" valor={im.encuadres} onChange={u('encuadres')} placeholder="Plano medio a la altura de los ojos; con gente del territorio al fondo…" />
      </Grupo>
      <Grupo titulo="Vestuario y no negociables">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Area titulo="Vestuario recomendado" valor={im.vestuarioSi} onChange={u('vestuarioSi')} />
          <Area titulo="Vestuario a evitar" valor={im.vestuarioNo} onChange={u('vestuarioNo')} />
        </div>
        <Area titulo="Elementos no negociables" ayuda="Lo que toda pieza debe llevar (logo, número, color de fondo…)." valor={im.noNegociables} onChange={u('noNegociables')} />
      </Grupo>
    </>
  );
}

function Limites({ i, set }: P) {
  const l = i.limites;
  const u = <K extends keyof typeof l>(k: K) => (v: (typeof l)[K]) => set((x) => ({ ...x, limites: { ...x.limites, [k]: v } }));
  return (
    <>
      <Grupo titulo="Líneas rojas" descripcion="Lo que ninguna pieza cruza. Si un análisis lo encuentra, el puntaje global queda en 2 como máximo.">
        <Etiquetas titulo="Temas vedados" valores={l.temasVedados} onChange={u('temasVedados')} />
        <Etiquetas titulo="Líneas rojas" ayuda="Conductas: por ejemplo, no mencionar a la familia de los adversarios." valores={l.lineasRojas} onChange={u('lineasRojas')} />
      </Grupo>
      <Grupo titulo="Cumplimiento" descripcion="Reglas de publicidad política que el generador y el análisis revisan.">
        <Interruptor titulo="Exigir fuente en toda cifra" valor={l.exigirFuente} onChange={u('exigirFuente')} />
        <Interruptor titulo="Marcar la publicidad pagada" ayuda="Las piezas de pauta llevan la leyenda de publicidad política pagada y su responsable." valor={l.marcaPublicidadPagada} onChange={u('marcaPublicidadPagada')} />
        <Campo titulo="Responsable legal de la publicidad" valor={l.responsableLegal} onChange={u('responsableLegal')} className="max-w-xl" />
      </Grupo>
    </>
  );
}

function Canales({ i, set }: P) {
  const c = i.canales;
  const u = <K extends keyof typeof c>(k: K) => (v: (typeof c)[K]) => set((x) => ({ ...x, canales: { ...x.canales, [k]: v } }));
  return (
    <Grupo titulo="Dónde publica" descripcion="Define formatos, duración y zonas seguras que el análisis de piezas aplica.">
      <Fichas<Red> titulo="Canales activos" multiple opciones={REDES.map((r) => ({ v: r, t: r }))} valor={c.activos} onChange={u('activos')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Selector titulo="Canal principal" valor={c.principal} onChange={(v) => u('principal')(v as Red)} opciones={(c.activos.length ? c.activos : [...REDES]).map((r) => ({ v: r, t: r }))} />
        <Campo titulo="Duración objetivo de video (segundos)" tipo="number" valor={String(c.duracionVideoSeg)} onChange={(v) => u('duracionVideoSeg')(Number(v) || 0)} />
      </div>
      <Interruptor titulo="Subtítulos siempre" valor={c.subtitulosSiempre} onChange={u('subtitulosSiempre')} />
      <Area titulo="Notas por canal" valor={c.notas} onChange={u('notas')} placeholder="Horarios, tono por red, formatos que funcionan…" />
    </Grupo>
  );
}

function Equipo({ i, set }: P) {
  const e = i.equipo;
  const u = <K extends keyof typeof e>(k: K) => (v: (typeof e)[K]) => set((x) => ({ ...x, equipo: { ...x.equipo, [k]: v } }));
  const cambiar = (k: number, p: Partial<Integrante>) => u('integrantes')(e.integrantes.map((x, j) => (j === k ? { ...x, ...p } : x)));
  return (
    <Grupo titulo="Quién revisa y aprueba" descripcion="Proteus no publica: prepara piezas para que el equipo las apruebe. Aquí se define ese flujo.">
      <div className="flex flex-col gap-3">
        {e.integrantes.map((x, k) => (
          <div key={k} className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_44px] gap-3 items-end">
            <Campo titulo="Nombre" valor={x.nombre} onChange={(v) => cambiar(k, { nombre: v })} />
            <Campo titulo="Rol" valor={x.rol} onChange={(v) => cambiar(k, { rol: v })} placeholder="Jefe de comunicaciones, abogado…" />
            <Interruptor titulo="Aprueba" valor={x.aprueba} onChange={(v) => cambiar(k, { aprueba: v })} />
            <button type="button" onClick={() => u('integrantes')(e.integrantes.filter((_, j) => j !== k))} aria-label={`Quitar a ${x.nombre || 'integrante'}`} className="w-11 h-11 inline-flex items-center justify-center rounded-lg border border-[var(--c-border)] hover:border-[var(--c-accent)]"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        <button type="button" onClick={() => u('integrantes')([...e.integrantes, { nombre: '', rol: '', aprueba: false }])} className={`${btnSec} self-start`}><Plus className="w-4 h-4" /> Agregar integrante</button>
      </div>
      <div className="max-w-xs">
        <Campo titulo="Revisiones antes de publicar" tipo="number" valor={String(e.revisionesAntesDePublicar)} onChange={(v) => u('revisionesAntesDePublicar')(Math.max(0, Number(v) || 0))} />
      </div>
    </Grupo>
  );
}

function Referentes({ i, set }: P) {
  const r = i.referentes;
  const u = (v: Referente[]) => set((x) => ({ ...x, referentes: v }));
  const cambiar = (k: number, p: Partial<Referente>) => u(r.map((x, j) => (j === k ? { ...x, ...p } : x)));
  return (
    <Grupo titulo="Piezas de referencia" descripcion="Enlaces a piezas propias que funcionaron, de adversarios y de inspiración. Se analizan con el mismo libro de reglas.">
      <div className="flex flex-col gap-3">
        {r.map((x, k) => (
          <div key={k} className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_160px_minmax(0,2fr)_44px] gap-3 items-end">
            <Campo titulo="Enlace" tipo="url" valor={x.url} onChange={(v) => cambiar(k, { url: v })} placeholder="https://…" />
            <Selector titulo="Tipo" valor={x.tipo} onChange={(v) => cambiar(k, { tipo: (v || 'propia') as Referente['tipo'] })} opciones={[{ v: 'propia', t: 'Propia' }, { v: 'competidor', t: 'Adversario' }, { v: 'inspiración', t: 'Inspiración' }]} />
            <Campo titulo="Por qué importa" valor={x.nota} onChange={(v) => cambiar(k, { nota: v })} />
            <button type="button" onClick={() => u(r.filter((_, j) => j !== k))} aria-label="Quitar referente" className="w-11 h-11 inline-flex items-center justify-center rounded-lg border border-[var(--c-border)] hover:border-[var(--c-accent)]"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        <button type="button" onClick={() => u([...r, { url: '', nota: '', tipo: 'propia' }])} className={`${btnSec} self-start`}><Plus className="w-4 h-4" /> Agregar referente</button>
      </div>
    </Grupo>
  );
}

function Privacidad({ i, set }: P) {
  const p = i.privacidad;
  const u = <K extends keyof typeof p>(k: K) => (v: (typeof p)[K]) => set((x) => ({ ...x, privacidad: { ...x.privacidad, [k]: v } }));
  return (
    <Grupo titulo="Qué puede ver la IA" descripcion="Las mediciones de color, composición y ritmo se hacen en este navegador y no salen de él. Solo el análisis interpretado envía la pieza a Gemini, a través del servidor de Proteus.">
      <Interruptor titulo="Enviar imágenes a Gemini" ayuda="Necesario para el análisis interpretado de fotos y afiches." valor={p.enviarFotosAIA} onChange={u('enviarFotosAIA')} />
      <Interruptor titulo="Enviar videos y audios a Gemini" ayuda="Los enlaces públicos de YouTube no dependen de esto: Gemini los abre directamente." valor={p.enviarVideosAIA} onChange={u('enviarVideosAIA')} />
      <Interruptor titulo="Guardar los análisis en este navegador" ayuda="Para comparar piezas en el tiempo. No se suben a ningún servidor." valor={p.guardarAnalisis} onChange={u('guardarAnalisis')} />
      <p className="m-0 text-xs text-[var(--c-muted)]">Nunca se envían a la IA el correo, el teléfono ni los datos de contacto del candidato.</p>
    </Grupo>
  );
}

export const EDITORES: Record<BloqueId, React.FC<P>> = {
  ficha: Ficha, posicionamiento: Posicionamiento, voz: Voz, imagen: Imagen, limites: Limites,
  canales: Canales, equipo: Equipo, referentes: Referentes, privacidad: Privacidad,
};

/** Listas de sugerencias compartidas por los campos */
export const ListasSugeridas: React.FC = () => (
  <>
    <datalist id="identidad-territorios">{TERRITORIOS.map((t) => <option key={t} value={t} />)}</datalist>
    <datalist id="identidad-publicos">{PUBLICOS.map((t) => <option key={t} value={t} />)}</datalist>
  </>
);
