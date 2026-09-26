/**
 * Estructura de la reforma: 5 módulos + Ajustes (antes, 18 ventanas sueltas).
 * Cada módulo agrupa las vistas que antes estaban separadas; una vista solo vive en un módulo.
 */
import type { LucideIcon } from 'lucide-react';
import { Home, Map, Users, PenLine, ShieldCheck, SlidersHorizontal } from 'lucide-react';

export type NavViewId =
  | 'inicio'
  | 'national-overview'
  | 'national-candidates'
  | 'national-tools'
  | 'territorial-zoom'
  | 'municipal-repository'
  | 'voter-segmentation'
  | 'content-director'
  | 'targeted-advertising'
  | 'multimedia-studio'
  | 'agent-team'
  | 'political-houses-graph'
  | 'electoral-audit-forensics'
  | 'antioquia-gobernacion'
  | 'antioquia-subregiones'
  | 'antioquia-municipios'
  | 'antigravity-console'
  | 'brand-manual';

export type ModuleId = 'inicio' | 'territorio' | 'electorado' | 'contenido' | 'diae' | 'ajustes';

export interface ModuleDef {
  id: ModuleId;
  label: string;
  descripcion: string;
  icon: LucideIcon;
  vistas: { id: NavViewId; label: string }[];
}

export const MODULES: ModuleDef[] = [
  { id: 'inicio', label: 'Inicio', descripcion: 'Lo esencial y lo último en lo que trabajaste.', icon: Home, vistas: [{ id: 'inicio', label: 'Inicio' }] },
  {
    id: 'territorio', label: 'Territorio', descripcion: 'Un solo mapa de Colombia a barrio, con la ficha de cada territorio y sus redes de poder.', icon: Map,
    vistas: [
      { id: 'territorial-zoom', label: 'Mapa y fichas' },
      { id: 'municipal-repository', label: 'Municipios' },
      { id: 'antioquia-subregiones', label: 'Subregiones' },
      { id: 'antioquia-gobernacion', label: 'Departamento' },
      { id: 'national-overview', label: 'País' },
    ],
  },
  {
    id: 'electorado', label: 'Electorado', descripcion: 'Segmentos de votantes y escenarios electorales.', icon: Users,
    vistas: [
      { id: 'voter-segmentation', label: 'Segmentos' },
      { id: 'national-tools', label: 'Escenarios y encuestas' },
    ],
  },
  {
    id: 'contenido', label: 'Contenido', descripcion: 'Un solo estudio para discursos, piezas, publicidad y multimedia.', icon: PenLine,
    vistas: [
      { id: 'content-director', label: 'Redactar' },
      { id: 'targeted-advertising', label: 'Publicidad' },
      { id: 'multimedia-studio', label: 'Multimedia' },
      { id: 'agent-team', label: 'Revisores' },
    ],
  },
  { id: 'diae', label: 'Día E', descripcion: 'Auditoría de actas E-14 y E-24 y reclamaciones.', icon: ShieldCheck, vistas: [{ id: 'electoral-audit-forensics', label: 'Auditoría E-14 / E-24' }] },
  {
    id: 'ajustes', label: 'Ajustes', descripcion: 'Perfil del candidato, identidad visual y herramientas técnicas.', icon: SlidersHorizontal,
    vistas: [
      { id: 'national-candidates', label: 'Perfil del candidato' },
      { id: 'brand-manual', label: 'Identidad visual' },
      { id: 'antigravity-console', label: 'Consola técnica' },
    ],
  },
];

/**
 * Vistas retiradas del menú por duplicar funciones (el código se conserva):
 * - 'antioquia-municipios' (125 Municipios) → la cubre Territorio › Municipios.
 * - 'political-houses-graph' (Casas Políticas) → la cubre Territorio › Mapa y fichas › Redes de poder.
 * Si alguien navega a ellas, se muestran dentro de Territorio.
 */
const RETIRADAS: Partial<Record<NavViewId, ModuleId>> = {
  'antioquia-municipios': 'territorio',
  'political-houses-graph': 'territorio',
};

export function moduloDeVista(v: NavViewId): ModuleDef {
  const m = MODULES.find((x) => x.vistas.some((y) => y.id === v)) ?? MODULES.find((x) => x.id === RETIRADAS[v]);
  return m ?? MODULES[0];
}
