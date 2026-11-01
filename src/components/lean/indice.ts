import type { Pagina } from '../influencia/tipos';
import { portada, toyota, ciclo, pmv, medir, pivotar, tipos } from './paginas1';
import { lotes, porques, motores, aplicar, criticas, sintesis } from './paginas2';

/* Páginas de «El método Lean Startup», en el orden del guion. */
export const ORDEN: Pagina[] = [portada, toyota, ciclo, pmv, medir, pivotar, tipos, lotes, porques, motores, aplicar, criticas, sintesis];

export const PAGINAS: Record<string, Pagina> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
