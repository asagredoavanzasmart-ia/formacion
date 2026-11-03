import type { PaginaVC } from './paginas1';
import { ORDEN1 } from './paginas1';
import { ORDEN2 } from './paginas2';

/* Páginas de «Ventas complejas», en el orden del guion (25 = las 25 diapositivas de Ventas B2B). */
export const ORDEN: PaginaVC[] = [...ORDEN1, ...ORDEN2];

export const PAGINAS: Record<string, PaginaVC> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
