import type { Pagina } from '../influencia/tipos';
import { portada, primeraImpresion, lentes, corregir, credibilidad, construir } from './paginas1';
import { autenticidad, intenciones, cuidado, preguntar, tiposPregunta, ventasPreguntas } from './paginas2';
import { estiloHablar, dosNiveles, estilosDecision, carismaticosPensadores, otrosEstilos, cultura } from './paginas3';
import { confianza, cialdini, respaldoConsistencia, autoridadEscasez, terrenoComun, evidenciaEmocion } from './paginas4';
import { presentarIdeas, tresTipos, denning, propositos, antihistorias } from './paginas5';
import { tensas, prepararTensa, jugadas, aconsejar, sintesis } from './paginas6';

/* Páginas ya animadas de la parte 1, en el orden del guion. Cada una corresponde a una sección del
   guion (se ubica por su `inicio`); su tramo de audio termina donde empieza la sección siguiente,
   aunque esa todavía no tenga página. */
export const ORDEN: Pagina[] = [
  portada, primeraImpresion, lentes, corregir, credibilidad, construir,
  autenticidad, intenciones, cuidado, preguntar, tiposPregunta, ventasPreguntas,
  estiloHablar, dosNiveles, estilosDecision, carismaticosPensadores, otrosEstilos, cultura,
  confianza, cialdini, respaldoConsistencia, autoridadEscasez, terrenoComun, evidenciaEmocion,
  presentarIdeas, tresTipos, denning, propositos, antihistorias,
  tensas, prepararTensa, jugadas, aconsejar, sintesis,
];

export const PAGINAS: Record<string, Pagina> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
