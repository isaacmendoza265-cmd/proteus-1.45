/**
 * Noticias de la unidad (búsqueda de Google desde Gemini, botón "Noticias" del mapa) como fuente AUXILIAR del motor:
 * entran a todos los análisis (analista, generador, brief, evaluación, segmentos...) con su fecha de búsqueda, medio,
 * tema y enlace. Un barrio recibe las de su comuna, y una comuna también las de su municipio, rotuladas.
 */
import { registrarFuente } from './registro';
import { cargarNoticias, idsParaDossier } from '../../noticias/noticiasCliente';
import { lineasNoticias } from '../../noticias/noticias';

registrarFuente({
  id: 'aux-noticias-google',
  titulo: 'Noticias recientes de la unidad (búsqueda de Google)',
  categoria: 'diagnóstico',
  nivel: 'auxiliar',
  fuente: 'Medios de comunicación encontrados con la búsqueda de Google desde Gemini, bajo demanda; solo enlaces que devolvió Google. Son noticias, no datos verificados: cada una con su medio, fecha y enlace',
  aplica: () => true,
  lineas: async ({ t, subregion }) => {
    const objetivos = idsParaDossier(t, subregion);
    const regs = await cargarNoticias(objetivos.map((o) => o.id));
    return objetivos.flatMap((o) => (regs[o.id] ? lineasNoticias(regs[o.id], o.rotulo, o.max) : []));
  },
});
