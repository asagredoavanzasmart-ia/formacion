import type { Pagina } from '../influencia/tipos';
import { portada, rojoAzul, valor, acciones, curva, seis } from './paginas1';
import { etapas, productos, noClientes, wii, limites, aplicar, sintesis } from './paginas2';

/* Páginas de «Estrategia del océano azul», en el orden del guion. */
export const ORDEN: Pagina[] = [portada, rojoAzul, valor, acciones, curva, seis, etapas, productos, noClientes, wii, limites, aplicar, sintesis];

export const PAGINAS: Record<string, Pagina> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
