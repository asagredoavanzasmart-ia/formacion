import React from 'react';
import { useEscena as useEscenaEQ } from '../../equipos/escenas/kitEQ';
import { NARANJA, ROSA, tono, sombra, Txt, cl, lerp } from '../../vc/escenas/kitVC';
import { PAGINAS } from '../paginas';

/* Kit de «Los secretos de Brunson»: reexporta el kit de «Ofertas y adquisición» (frasco, billete, imán, megáfono, sobre,
   cubo, etiqueta, escudo, regalo) y suma la ficha de dominó, el carrito de compra y el termómetro del tráfico.
   Sólidos rellenos, sin contornos. */

export * from '../../ad/escenas/kitAD';
export * from './kit2BR';

/* Armazón de la escena de una página: los nombres de las marcas salen de las anclas de la página. */
export function useEscenaBR(id: string, marcas: number[], estatico = false) {
  const nombres = React.useMemo(() => Object.keys(PAGINAS[id]?.anclas ?? {}), [id]);
  const r = useEscenaEQ(nombres, marcas, estatico);
  return { ...r, m: (n: string) => r.M(n), c: tono };
}

/* Ficha de dominó de pie que cae: `cae` de 0 (de pie) a 1 (tendida hacia la derecha). (x, y) es el punto de apoyo. */
export const Domino: React.FC<{ x: number; y: number; h?: number; cae?: number; color?: string; puntos?: number; op?: number; texto?: string; tam?: number }> = ({ x, y, h = 160, cae = 0, color = '#334155', puntos = 3, op = 1, texto, tam = 24 }) => {
  if (op < 0.01) return null;
  const w = h * 0.48;
  const ang = 78 * cl(cae);
  return (
    <g transform={`translate(${x} ${y}) rotate(${ang})`} opacity={op}>
      <rect x={-w / 2} y={-h} width={w} height={h} rx={12} fill={color} style={sombra(0.25, 3, 8)} />
      <rect x={-w / 2} y={-h} width={w * 0.18} height={h} rx={8} fill="#fff" opacity={0.12} />
      <rect x={-w / 2 + 8} y={-h / 2 - 3} width={w - 16} height={6} rx={3} fill="#fff" opacity={0.55} />
      {Array.from({ length: puntos }, (_, k) => <circle key={k} cx={0} cy={-h * 0.78 + k * (h * 0.12)} r={w * 0.08} fill="#fff" opacity={0.85} />)}
      {texto && <Txt x={0} y={-h * 0.2} textAnchor="middle" fontSize={tam} fill="#fff" peso={800}>{texto}</Txt>}
    </g>
  );
};

/* Carrito de compra con sus ruedas; `lleno` de 0 a 1 apila paquetes en la canasta. (x, y) es el piso entre las ruedas. */
export const Carrito: React.FC<{ x: number; y: number; s?: number; lleno?: number; color?: string; op?: number; colores?: string[] }> = ({ x, y, s = 1, lleno = 0, color = '#334155', op = 1, colores = [NARANJA, ROSA, '#2f7bf6', '#10b981'] }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      {colores.map((col, k) => {
        const u = cl(lleno * colores.length - k);
        return u > 0.01 ? <rect key={k} x={-92 + k * 44} y={-150 - 40 * (1 - u)} width={40} height={52} rx={6} fill={col} opacity={u} /> : null;
      })}
      <path d="M -110 -150 H 100 L 82 -60 H -92 Z" fill={color} opacity={0.88} style={sombra(0.22, 3, 8)} />
      <path d="M -110 -150 H 100 L 96 -130 H -106 Z" fill="#fff" opacity={0.16} />
      <path d="M 100 -150 L 120 -190 H 150" stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" />
      <rect x={-92} y={-52} width={174} height={10} rx={5} fill={color} />
      <circle cx={-70} cy={-14} r={14} fill="#1f2937" /><circle cx={62} cy={-14} r={14} fill="#1f2937" />
    </g>
  );

/* Termómetro con su bulbo; `v` de 0 a 1 sube el mercurio. (x, y) es el centro del bulbo. */
export const Termometro: React.FC<{ x: number; y: number; h?: number; v: number; color: string; op?: number; c: ReturnType<typeof tono> }> = ({ x, y, h = 260, v, color, op = 1, c }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <rect x={-20} y={-h} width={40} height={h} rx={20} fill={c.apagado} />
      <rect x={-11} y={-h * lerp(0.08, 0.95, cl(v))} width={22} height={h * lerp(0.08, 0.95, cl(v))} rx={11} fill={color} />
      <circle cx={0} cy={0} r={38} fill={color} style={sombra(0.2, 3, 8)} />
      <circle cx={-10} cy={-10} r={9} fill="#fff" opacity={0.35} />
    </g>
  );
