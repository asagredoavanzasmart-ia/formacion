import type { Pagina } from '../influencia/tipos';
import { intro, diagnostico, motores, roles, traspasos, pipeline, piramide, aplanar, graicunas } from './paginas1';
import { pods, ramp, enablement, roleplay, silencioso, stack, agile, madurez, cierre } from './paginas2';

/* Páginas narradas de «Diseño y arquitectura de equipos de ventas», en el orden del guion. */
export const ORDEN: Pagina[] = [intro, diagnostico, motores, roles, traspasos, pipeline, piramide, aplanar, graicunas, pods, ramp, enablement, roleplay, silencioso, stack, agile, madurez, cierre];

export const PAGINAS: Record<string, Pagina> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
