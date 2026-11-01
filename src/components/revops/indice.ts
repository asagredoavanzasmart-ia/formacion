import type { PaginaRO } from './tipos';
import { portada, definicion, ruta, escala, empezar, velocidad, casos, flywheel, fuerza, friccion, friccionUtil, mapa } from './paginas1';
import { porque, contacto, judicial } from './paginas2';
import { paradoja, comprador, filtros, salida, playbook, estados } from './paginas3';
import { proceso, gobierno, indicadores, stack } from './paginas4';
import { lenguaje, a3, prewiring, monroe, objeciones, retroceso } from './paginas5';
import { silos, capas, necesidad, cuadrante, entrevista, ciclo, metas } from './paginas6';
import { diagnostico, calculadoraSLA, valorLead, velocidades, copq } from './calculadoras';

/* Páginas narradas de «RevOps», en el orden de la clase. */
export const ORDEN: PaginaRO[] = [
  portada, definicion, ruta,
  escala, diagnostico, empezar, velocidad, casos,
  flywheel, fuerza, friccion, friccionUtil, mapa,
  porque, calculadoraSLA, valorLead, contacto, judicial, velocidades,
  paradoja, comprador, filtros, salida, playbook, estados,
  proceso, gobierno, indicadores, stack,
  lenguaje, copq, a3, prewiring, monroe, objeciones, retroceso,
  silos, capas,
  necesidad, cuadrante, entrevista,
  ciclo, metas,
];

export const PAGINAS: Record<string, PaginaRO> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
