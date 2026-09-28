/**
 * IDENTIDAD DEL CANDIDATO: lo que el candidato personaliza y a lo que se ajustan todas las respuestas de Proteus
 * (generador de contenido, análisis de piezas, publicidad, segmentos).
 *
 * Nueve bloques. Los campos vacíos son "sin definir": Proteus no los inventa; en las instrucciones a la IA
 * solo entran los que el candidato llenó. El perfil antiguo (CandidateProfile) se mantiene por compatibilidad:
 * `sincronizarLegado` copia a sus campos lo que los módulos viejos leen (tono, estilo, temas, partido...).
 */

// ---------- Tipos ----------------------------------------------------------------------------------

export const CARGOS = ['Alcaldía', 'Concejo', 'Gobernación', 'Asamblea', 'Cámara de Representantes', 'Senado', 'Presidencia', 'Junta Administradora Local'] as const;
export type Cargo = (typeof CARGOS)[number];

export const ARQUETIPOS = [
  { id: 'gestor', nombre: 'Gestor', idea: 'Resultados, obras y cifras; "yo sé hacerlo".' },
  { id: 'reformador', nombre: 'Reformador', idea: 'Cambio de fondo frente a lo establecido.' },
  { id: 'cercano', nombre: 'Cercano', idea: 'Uno de nosotros; barrio, vereda, calle.' },
  { id: 'protector', nombre: 'Protector', idea: 'Orden, seguridad y cuidado.' },
  { id: 'experto', nombre: 'Experto', idea: 'Conocimiento técnico y rigor.' },
  { id: 'renovador', nombre: 'Renovador', idea: 'Nueva generación, otra forma de hacer política.' },
  { id: 'conciliador', nombre: 'Conciliador', idea: 'Acuerdos, puentes, diálogo entre sectores.' },
] as const;
export type Arquetipo = (typeof ARQUETIPOS)[number]['id'];

export const REDES = ['Instagram', 'TikTok', 'Facebook', 'X', 'YouTube', 'WhatsApp', 'Radio', 'Prensa', 'Televisión', 'Territorio (voz a voz)'] as const;
export type Red = (typeof REDES)[number];

export interface EjeProgramatico { tema: string; propuesta: string }
export interface ColorMarca { rol: 'Primario' | 'Secundario' | 'Acento' | 'Neutro'; hex: string; nombre?: string }
export interface Integrante { nombre: string; rol: string; aprueba: boolean }
export interface Referente { url: string; nota: string; tipo: 'propia' | 'competidor' | 'inspiración' }

export interface IdentidadCandidato {
  version: 1;
  /** 1. Ficha: quién es y a qué aspira */
  ficha: {
    nombre: string;
    nombreCampana: string;
    cargo: Cargo | '';
    circunscripcion: string;
    partido: string;
    numeroTarjeton: string;
    fechaEleccion: string;
    rangoEdad: string;
    lugarResidencia: string;
    formacion: string;
    trayectoria: string;
  };
  /** 2. Posicionamiento: qué representa y frente a quién */
  posicionamiento: {
    propuestaValor: string;
    arquetipo: Arquetipo | '';
    ejes: EjeProgramatico[];
    publicos: string[];
    territoriosPrioritarios: string[];
    contraste: string;
  };
  /** 3. Voz y oratoria: cómo habla (texto, discurso, video) */
  voz: {
    formalidad: number; // 1 muy cercano … 5 muy formal
    energia: number; // 1 sereno … 5 enérgico
    tecnicismo: number; // 1 coloquial … 5 técnico
    persona: 'yo' | 'nosotros' | 'mixta' | '';
    ritmoMin: number; // palabras por minuto objetivo (oratoria)
    ritmoMax: number;
    humor: 'nunca' | 'a veces' | 'frecuente' | '';
    frasesFirma: string[];
    lexicoPropio: string[];
    palabrasProhibidas: string[];
    muletillas: string[];
    regionalismos: string;
  };
  /** 4. Imagen: paleta, tipografía, fotografía y vestuario */
  imagen: {
    paleta: ColorMarca[];
    toleranciaColor: number; // ΔE2000 máximo para considerar que un color "es de marca"
    tipografiaTitulos: string;
    tipografiaTexto: string;
    estiloFotografico: string;
    encuadres: string;
    vestuarioSi: string;
    vestuarioNo: string;
    noNegociables: string;
  };
  /** 5. Límites: líneas rojas y cumplimiento */
  limites: {
    temasVedados: string[];
    lineasRojas: string[];
    exigirFuente: boolean;
    marcaPublicidadPagada: boolean;
    responsableLegal: string;
  };
  /** 6. Canales: dónde y cómo publica */
  canales: {
    activos: Red[];
    principal: Red | '';
    duracionVideoSeg: number;
    subtitulosSiempre: boolean;
    notas: string;
  };
  /** 7. Equipo y aprobaciones */
  equipo: {
    integrantes: Integrante[];
    revisionesAntesDePublicar: number;
  };
  /** 8. Referentes: piezas para comparar */
  referentes: Referente[];
  /** 9. Privacidad y uso de IA */
  privacidad: {
    enviarFotosAIA: boolean;
    enviarVideosAIA: boolean;
    guardarAnalisis: boolean;
  };
  actualizado: string;
}

// ---------- Valores iniciales ----------------------------------------------------------------------

export const PALETA_VACIA: ColorMarca[] = [
  { rol: 'Primario', hex: '' },
  { rol: 'Secundario', hex: '' },
  { rol: 'Acento', hex: '' },
  { rol: 'Neutro', hex: '' },
];

export function identidadVacia(nombre = ''): IdentidadCandidato {
  return {
    version: 1,
    ficha: { nombre, nombreCampana: '', cargo: '', circunscripcion: '', partido: '', numeroTarjeton: '', fechaEleccion: '', rangoEdad: '', lugarResidencia: '', formacion: '', trayectoria: '' },
    posicionamiento: { propuestaValor: '', arquetipo: '', ejes: [], publicos: [], territoriosPrioritarios: [], contraste: '' },
    voz: { formalidad: 3, energia: 3, tecnicismo: 2, persona: '', ritmoMin: 130, ritmoMax: 160, humor: '', frasesFirma: [], lexicoPropio: [], palabrasProhibidas: [], muletillas: [], regionalismos: '' },
    imagen: { paleta: PALETA_VACIA.map((c) => ({ ...c })), toleranciaColor: 10, tipografiaTitulos: '', tipografiaTexto: '', estiloFotografico: '', encuadres: '', vestuarioSi: '', vestuarioNo: '', noNegociables: '' },
    limites: { temasVedados: [], lineasRojas: [], exigirFuente: true, marcaPublicidadPagada: true, responsableLegal: '' },
    canales: { activos: [], principal: '', duracionVideoSeg: 45, subtitulosSiempre: true, notas: '' },
    equipo: { integrantes: [], revisionesAntesDePublicar: 1 },
    referentes: [],
    privacidad: { enviarFotosAIA: false, enviarVideosAIA: false, guardarAnalisis: true },
    actualizado: '',
  };
}

/** Completa con valores por defecto una identidad guardada con una versión anterior o incompleta */
export function normalizarIdentidad(x: unknown, nombre = ''): IdentidadCandidato {
  const base = identidadVacia(nombre);
  if (!x || typeof x !== 'object') return base;
  const o = x as Partial<IdentidadCandidato>;
  const mezcla = <T extends object>(a: T, b: unknown): T => (b && typeof b === 'object' ? { ...a, ...(b as Partial<T>) } : a);
  const paleta = Array.isArray(o.imagen?.paleta) && o.imagen!.paleta.length ? o.imagen!.paleta : base.imagen.paleta;
  return {
    ...base,
    ficha: mezcla(base.ficha, o.ficha),
    posicionamiento: mezcla(base.posicionamiento, o.posicionamiento),
    voz: mezcla(base.voz, o.voz),
    imagen: { ...mezcla(base.imagen, o.imagen), paleta },
    limites: mezcla(base.limites, o.limites),
    canales: mezcla(base.canales, o.canales),
    equipo: mezcla(base.equipo, o.equipo),
    referentes: Array.isArray(o.referentes) ? o.referentes : [],
    privacidad: mezcla(base.privacidad, o.privacidad),
    actualizado: typeof o.actualizado === 'string' ? o.actualizado : '',
  };
}

// ---------- Completitud ----------------------------------------------------------------------------

export const BLOQUES = [
  { id: 'ficha', titulo: 'Ficha', descripcion: 'Quién es y a qué aspira.' },
  { id: 'posicionamiento', titulo: 'Posicionamiento', descripcion: 'Qué representa y frente a quién.' },
  { id: 'voz', titulo: 'Voz y oratoria', descripcion: 'Cómo habla en texto, tarima y video.' },
  { id: 'imagen', titulo: 'Imagen', descripcion: 'Paleta, tipografía, fotografía y vestuario.' },
  { id: 'limites', titulo: 'Límites', descripcion: 'Líneas rojas y cumplimiento electoral.' },
  { id: 'canales', titulo: 'Canales', descripcion: 'Dónde publica y con qué formato.' },
  { id: 'equipo', titulo: 'Equipo', descripcion: 'Quién revisa y aprueba.' },
  { id: 'referentes', titulo: 'Referentes', descripcion: 'Piezas propias y de otros para comparar.' },
  { id: 'privacidad', titulo: 'Privacidad', descripcion: 'Qué puede ver la IA.' },
] as const;
export type BloqueId = (typeof BLOQUES)[number]['id'];

const lleno = (v: unknown) => (Array.isArray(v) ? v.length > 0 : typeof v === 'string' ? v.trim() !== '' : v != null);
const hexValido = (h: string) => /^#[0-9a-f]{6}$/i.test(h.trim());

/** Fracción (0-1) de lo esencial de cada bloque que ya está definido */
export function completitud(i: IdentidadCandidato): Record<BloqueId, number> {
  const frac = (xs: unknown[]) => xs.filter(lleno).length / xs.length;
  return {
    ficha: frac([i.ficha.nombre, i.ficha.cargo, i.ficha.circunscripcion, i.ficha.partido, i.ficha.trayectoria]),
    posicionamiento: frac([i.posicionamiento.propuestaValor, i.posicionamiento.arquetipo, i.posicionamiento.ejes.filter((e) => e.tema.trim()), i.posicionamiento.publicos]),
    voz: frac([i.voz.persona, i.voz.humor, i.voz.frasesFirma, i.voz.lexicoPropio]),
    imagen: frac([i.imagen.paleta.filter((c) => hexValido(c.hex)).length >= 2 ? 'ok' : '', i.imagen.tipografiaTitulos, i.imagen.estiloFotografico, i.imagen.vestuarioSi]),
    limites: frac([i.limites.temasVedados.length || i.limites.lineasRojas.length ? 'ok' : '', i.limites.responsableLegal]),
    canales: frac([i.canales.activos, i.canales.principal]),
    equipo: frac([i.equipo.integrantes]),
    referentes: frac([i.referentes]),
    privacidad: 1,
  };
}

export function completitudTotal(i: IdentidadCandidato): number {
  const c = completitud(i);
  const pesos: Record<BloqueId, number> = { ficha: 3, posicionamiento: 3, voz: 3, imagen: 3, limites: 2, canales: 2, equipo: 1, referentes: 1, privacidad: 0 };
  const total = Object.values(pesos).reduce((a, b) => a + b, 0);
  return (Object.keys(pesos) as BloqueId[]).reduce((s, k) => s + c[k] * pesos[k], 0) / total;
}

export const paletaDefinida = (i: IdentidadCandidato) => i.imagen.paleta.filter((c) => hexValido(c.hex));

// ---------- Texto para la IA -----------------------------------------------------------------------

const escala = (n: number, bajo: string, alto: string) => (n <= 2 ? bajo : n >= 4 ? alto : `entre ${bajo} y ${alto}`);
const lista = (xs: string[]) => xs.map((x) => x.trim()).filter(Boolean).join('; ');

/**
 * La identidad en texto compacto para las instrucciones de Gemini. Solo entra lo definido; lo vacío se omite
 * (la IA no debe suponerlo). Nunca incluye correo, fotos ni datos de contacto.
 */
export function identidadParaIA(i: IdentidadCandidato): string {
  const f = i.ficha, p = i.posicionamiento, v = i.voz, im = i.imagen, l = i.limites, c = i.canales;
  const arq = ARQUETIPOS.find((a) => a.id === p.arquetipo);
  const lineas: (string | false)[] = [
    `Candidato: ${f.nombreCampana || f.nombre || 'sin nombre definido'}${f.cargo ? `, aspira a ${f.cargo}` : ''}${f.circunscripcion ? ` en ${f.circunscripcion}` : ''}${f.partido ? ` (${f.partido})` : ''}${f.numeroTarjeton ? `, número ${f.numeroTarjeton} en el tarjetón` : ''}.`,
    !!f.trayectoria.trim() && `Trayectoria: ${f.trayectoria.trim()}`,
    !!p.propuestaValor.trim() && `Propuesta de valor: ${p.propuestaValor.trim()}`,
    !!arq && `Arquetipo: ${arq.nombre} (${arq.idea})`,
    p.ejes.some((e) => e.tema.trim()) && `Ejes programáticos, en orden de prioridad: ${p.ejes.filter((e) => e.tema.trim()).map((e, k) => `${k + 1}) ${e.tema.trim()}${e.propuesta.trim() ? `: ${e.propuesta.trim()}` : ''}`).join(' ')}`,
    p.publicos.length > 0 && `Públicos prioritarios: ${lista(p.publicos)}`,
    p.territoriosPrioritarios.length > 0 && `Territorios prioritarios: ${lista(p.territoriosPrioritarios)}`,
    !!p.contraste.trim() && `Contraste con los adversarios: ${p.contraste.trim()}`,
    `Voz: ${escala(v.formalidad, 'cercana', 'formal')}, ${escala(v.energia, 'serena', 'enérgica')}, ${escala(v.tecnicismo, 'coloquial', 'técnica')}${v.persona ? `; habla en ${v.persona === 'mixta' ? 'primera persona singular y plural' : v.persona === 'yo' ? 'primera persona del singular' : 'primera persona del plural'}` : ''}${v.humor ? `; humor: ${v.humor}` : ''}.`,
    `Ritmo de oratoria objetivo: ${v.ritmoMin} a ${v.ritmoMax} palabras por minuto.`,
    v.frasesFirma.length > 0 && `Frases firma: ${lista(v.frasesFirma)}`,
    v.lexicoPropio.length > 0 && `Palabras propias: ${lista(v.lexicoPropio)}`,
    v.palabrasProhibidas.length > 0 && `Palabras que no usa: ${lista(v.palabrasProhibidas)}`,
    v.muletillas.length > 0 && `Muletillas a vigilar: ${lista(v.muletillas)}`,
    !!v.regionalismos.trim() && `Regionalismos: ${v.regionalismos.trim()}`,
    paletaDefinida(i).length > 0 && `Paleta de marca: ${paletaDefinida(i).map((x) => `${x.rol} ${x.hex.toUpperCase()}${x.nombre ? ` (${x.nombre})` : ''}`).join(', ')}. Tolerancia ΔE2000: ${im.toleranciaColor}.`,
    !!(im.tipografiaTitulos || im.tipografiaTexto) && `Tipografías: títulos ${im.tipografiaTitulos || 'sin definir'}; texto ${im.tipografiaTexto || 'sin definir'}.`,
    !!im.estiloFotografico.trim() && `Estilo fotográfico: ${im.estiloFotografico.trim()}`,
    !!im.encuadres.trim() && `Encuadres preferidos: ${im.encuadres.trim()}`,
    !!im.vestuarioSi.trim() && `Vestuario recomendado: ${im.vestuarioSi.trim()}`,
    !!im.vestuarioNo.trim() && `Vestuario a evitar: ${im.vestuarioNo.trim()}`,
    !!im.noNegociables.trim() && `Elementos visuales no negociables: ${im.noNegociables.trim()}`,
    l.temasVedados.length > 0 && `Temas vedados: ${lista(l.temasVedados)}`,
    l.lineasRojas.length > 0 && `Líneas rojas: ${lista(l.lineasRojas)}`,
    l.exigirFuente && 'Toda cifra debe tener fuente verificable.',
    c.activos.length > 0 && `Canales: ${c.activos.join(', ')}${c.principal ? `; principal: ${c.principal}` : ''}. Video objetivo: ${c.duracionVideoSeg} s${c.subtitulosSiempre ? ', siempre con subtítulos' : ''}.`,
  ];
  return lineas.filter(Boolean).join('\n');
}

// ---------- Compatibilidad con el perfil anterior -------------------------------------------------

/** Campos del perfil anterior que leen los módulos existentes */
export interface PerfilLegado {
  nombre: string;
  afiliacionPartidista?: string;
  tonoNarrativo?: string;
  estiloComunicacion?: string;
  ejeTematicoComodo?: string;
  experienciaPrevia?: string;
  resumenEstrategico?: string;
  rangoEdad?: string;
  formacionOcupacion?: string;
  lugarResidencia?: string;
  presenciaRedes?: string;
  quEvitar?: string;
  paletaColores?: string;
  estiloFotografico?: string;
}

export function sincronizarLegado<T extends PerfilLegado>(perfil: T, i: IdentidadCandidato): T & PerfilLegado & { identidad: IdentidadCandidato } {
  const v = i.voz;
  const ejes = i.posicionamiento.ejes.map((e) => e.tema.trim()).filter(Boolean);
  const tono = [escala(v.formalidad, 'Cercano', 'Formal'), escala(v.energia, 'sereno', 'enérgico')].join(', ');
  const evitar = [...i.limites.temasVedados, ...i.voz.palabrasProhibidas].filter(Boolean);
  return {
    ...perfil,
    identidad: i,
    nombre: i.ficha.nombre.trim() || perfil.nombre,
    afiliacionPartidista: i.ficha.partido || perfil.afiliacionPartidista,
    tonoNarrativo: tono,
    estiloComunicacion: escala(v.tecnicismo, 'Coloquial', 'Técnico'),
    ejeTematicoComodo: ejes.join(', ') || perfil.ejeTematicoComodo,
    experienciaPrevia: i.ficha.trayectoria || perfil.experienciaPrevia,
    resumenEstrategico: i.posicionamiento.propuestaValor || perfil.resumenEstrategico,
    rangoEdad: i.ficha.rangoEdad || perfil.rangoEdad,
    formacionOcupacion: i.ficha.formacion || perfil.formacionOcupacion,
    lugarResidencia: i.ficha.lugarResidencia || perfil.lugarResidencia,
    presenciaRedes: i.canales.activos.join(', ') || perfil.presenciaRedes,
    quEvitar: evitar.join(', ') || perfil.quEvitar,
    paletaColores: paletaDefinida(i).map((c) => c.hex.toUpperCase()).join(', ') || perfil.paletaColores,
    estiloFotografico: i.imagen.estiloFotografico || perfil.estiloFotografico,
  };
}

/** Identidad inicial a partir de un perfil anterior (primera vez que se abre la ventana nueva) */
export function identidadDesdeLegado(perfil: PerfilLegado & { identidad?: unknown }): IdentidadCandidato {
  if (perfil.identidad) return normalizarIdentidad(perfil.identidad, perfil.nombre);
  const i = identidadVacia(perfil.nombre);
  i.ficha.partido = perfil.afiliacionPartidista ?? '';
  i.ficha.trayectoria = perfil.experienciaPrevia ?? '';
  i.ficha.rangoEdad = perfil.rangoEdad ?? '';
  i.ficha.formacion = perfil.formacionOcupacion ?? '';
  i.ficha.lugarResidencia = perfil.lugarResidencia ?? '';
  i.posicionamiento.propuestaValor = perfil.resumenEstrategico ?? '';
  i.posicionamiento.ejes = (perfil.ejeTematicoComodo ?? '').split(/[,;]/).map((t) => t.trim()).filter(Boolean).slice(0, 5).map((tema) => ({ tema, propuesta: '' }));
  i.imagen.estiloFotografico = perfil.estiloFotografico ?? '';
  return i;
}
