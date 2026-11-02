import type { PaginaEP } from './paginas1';
import { ORDEN1 } from './paginas1';
import { ORDEN2 } from './paginas2';

/* Páginas de «Enamórate del problema, no de la solución», en el orden del guion. */
export const ORDEN: PaginaEP[] = [...ORDEN1, ...ORDEN2];

export const PAGINAS: Record<string, PaginaEP> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
