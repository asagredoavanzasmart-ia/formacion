import type { Pagina } from '../influencia/tipos';
import { portada2, hamm, estructura, resultados, tiempo, culturaGanar, conversacionOrg, interactividad } from './p2/paginasA';
import { intencionalidad, silencio, diferencias, espiral, romper, coraje, terreno, actuar } from './p2/paginasB';
import { retro, recibir, desarmar, pedirConsejo, darConsejo, conflicto, hablarSentir, sintesis2 } from './p2/paginasC';

/* Páginas de la parte 2 («La organización que vende»), en el orden del guion. */
export const ORDEN: Pagina[] = [
  portada2, hamm, estructura, resultados, tiempo, culturaGanar, conversacionOrg, interactividad,
  intencionalidad, silencio, diferencias, espiral, romper, coraje, terreno, actuar,
  retro, recibir, desarmar, pedirConsejo, darConsejo, conflicto, hablarSentir, sintesis2,
];

export const PAGINAS: Record<string, Pagina> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
