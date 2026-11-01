import type { Pagina } from '../influencia/tipos';

/* Página narrada de «RevOps»: número de página del guion (guiones/revops_narracion.txt), audio de esa página
   (salida/revops/fuentes/<audio>.mp3) y, si hace falta, los tramos del audio que se conservan. */
export type PaginaRO = Pagina & {
  pagina: number;
  audio: string | null;
  cortes?: [number, number][];
  /** Calculadora interactiva en lugar de escena (la narración rellena sus campos). */
  calculadora?: boolean;
};
