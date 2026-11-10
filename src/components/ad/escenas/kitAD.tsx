import React from 'react';
import { useEscena as useEscenaEQ } from '../../equipos/escenas/kitEQ';
import { NARANJA, ROSA, tono, sombra, Txt, cl, lerp } from '../../vc/escenas/kitVC';
import { PAGINAS } from '../paginas';

/* Kit de «Ofertas y adquisición» (método de Alex Hormozi): reexporta el armazón y los dibujos de «CRM en pymes»
   y suma los objetos propios de la clase (el frasco de caja, el imán, el megáfono, el sobre, el volante, el cubo de
   entrega, la etiqueta de precio y el escudo de garantía). Sólidos rellenos, sin contornos. */

export * from '../../cp/escenas/kitCP';

/* Armazón de la escena de una página: los nombres de las marcas salen de las anclas de la página. */
export function useEscenaAD(id: string, marcas: number[], estatico = false) {
  const nombres = React.useMemo(() => Object.keys(PAGINAS[id]?.anclas ?? {}), [id]);
  const r = useEscenaEQ(nombres, marcas, estatico);
  return { ...r, m: (n: string) => r.M(n), c: tono };
}

/* Frasco de caja: un vaso de vidrio cuyo nivel `v` (0 a 1) sube o baja; `color` es el líquido. (x, y) es la base. */
export const Frasco: React.FC<{ x: number; y: number; w?: number; h?: number; v: number; color?: string; t?: number; op?: number; c: ReturnType<typeof tono>; rojo?: boolean }> = ({ x, y, w = 150, h = 220, v, color = '#10b981', t = 0, op = 1, c, rojo = false }) => {
  if (op < 0.01) return null;
  const lv = cl(v);
  const hy = -h * lv;
  const ola = (k: number) => Math.sin(t * 3 + k) * 4 * (lv > 0.02 ? 1 : 0);
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <ellipse cx={0} cy={4} rx={w * 0.62} ry={10} fill="#000" opacity={0.14} />
      <rect x={-w / 2} y={-h} width={w} height={h} rx={22} fill={c.panel2} opacity={0.9} />
      {lv > 0.005 && <path d={`M ${-w / 2 + 6} ${-6} V ${hy + ola(0)} Q ${-w / 4} ${hy - 6 + ola(1)} 0 ${hy + ola(2)} T ${w / 2 - 6} ${hy + ola(3)} V ${-6} Q ${w / 2 - 6} 0 ${w / 2 - 22} 0 H ${-w / 2 + 22} Q ${-w / 2 + 6} 0 ${-w / 2 + 6} -6 Z`} fill={rojo ? '#e5484d' : color} opacity={0.88} />}
      <rect x={-w / 2 + 14} y={-h + 18} width={14} height={h - 40} rx={7} fill="#ffffff" opacity={0.35} />
      <rect x={-w / 2 - 8} y={-h - 18} width={w + 16} height={24} rx={10} fill={c.apagado} />
    </g>
  );
};

/* Billete que vuela: rectángulo verde con el círculo del valor. (x, y) es su centro. */
export const Billete: React.FC<{ x: number; y: number; s?: number; rot?: number; op?: number; color?: string }> = ({ x, y, s = 1, rot = 0, op = 1, color = '#16a34a' }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
      <rect x={-40} y={-22} width={80} height={44} rx={6} fill={color} style={sombra(0.2, 2, 4)} />
      <rect x={-34} y={-16} width={68} height={32} rx={4} fill="#ffffff" opacity={0.18} />
      <circle r={12} fill="#ffffff" opacity={0.5} />
      <Txt x={0} y={7} textAnchor="middle" fontSize={18} fill={color}>$</Txt>
    </g>
  );

/* Imán de herradura con sus dos polos; `atrae` (0 a 1) dibuja las líneas de campo que tiran. (x, y) es la curva. */
export const Iman: React.FC<{ x: number; y: number; s?: number; rot?: number; op?: number; atrae?: number; t?: number }> = ({ x, y, s = 1, rot = 0, op = 1, atrae = 0, t = 0 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
      {atrae > 0.01 && [0, 1, 2].map((k) => { const ph = (t * 0.9 + k / 3) % 1; return <path key={k} d={`M -46 ${70 + 60 * ph} Q 0 ${120 + 120 * ph} 46 ${70 + 60 * ph}`} stroke={NARANJA} strokeWidth={5} fill="none" opacity={atrae * (1 - ph) * 0.7} strokeLinecap="round" />; })}
      <path d="M -70 60 V -10 A 70 70 0 0 1 70 -10 V 60 H 30 V -10 A 30 30 0 0 0 -30 -10 V 60 Z" fill={ROSA} style={sombra(0.22, 3, 8)} />
      <path d="M -70 30 H -30 V 60 H -70 Z" fill="#e5e7eb" /><path d="M 30 30 H 70 V 60 H 30 Z" fill="#e5e7eb" />
      <path d="M -70 -10 A 70 70 0 0 1 0 -80 V -40 A 30 30 0 0 0 -30 -10 Z" fill="#000" opacity={0.1} />
    </g>
  );

/* Megáfono de los anuncios con ondas que salen; `habla` (0 a 1) enciende las ondas. (x, y) es el mango. */
export const Megafono: React.FC<{ x: number; y: number; s?: number; op?: number; habla?: number; t?: number; flip?: boolean }> = ({ x, y, s = 1, op = 1, habla = 0, t = 0, flip = false }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={op}>
      <rect x={-10} y={-6} width={22} height={50} rx={8} fill="#334155" />
      <path d="M -20 -40 L 70 -90 V 50 L -20 0 Z" fill={NARANJA} style={sombra(0.22, 3, 8)} />
      <path d="M 70 -90 V 50 L 50 39 V -79 Z" fill="#000" opacity={0.12} />
      <rect x={-46} y={-40} width={30} height={40} rx={8} fill="#c2410c" />
      {habla > 0.01 && [0, 1, 2].map((k) => { const ph = (t * 1.3 + k / 3) % 1; const r = 50 + 90 * ph; return <path key={k} d={`M ${70 + r * 0.6} ${-20 - r * 0.8} Q ${80 + r} -20 ${70 + r * 0.6} ${-20 + r * 0.8}`} stroke={ROSA} strokeWidth={7} fill="none" opacity={habla * (1 - ph)} strokeLinecap="round" />; })}
    </g>
  );

/* Sobre de correo: cerrado o abierto (`abre` de 0 a 1). (x, y) es su centro. */
export const Sobre: React.FC<{ x: number; y: number; s?: number; rot?: number; op?: number; abre?: number; color?: string }> = ({ x, y, s = 1, rot = 0, op = 1, abre = 0, color = '#2f7bf6' }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
      {abre > 0.05 && <rect x={-40} y={-30 - 34 * abre} width={80} height={56} rx={4} fill="#ffffff" style={sombra(0.15, 2, 4)} />}
      <rect x={-56} y={-36} width={112} height={72} rx={8} fill={color} style={sombra(0.22, 3, 6)} />
      <path d="M -56 34 L 0 -4 L 56 34 Z" fill="#000" opacity={0.12} />
      <path d={`M -56 -34 L 0 ${lerp(10, -70, abre)} L 56 -34 Z`} fill={color} />
      <path d={`M -56 -34 L 0 ${lerp(10, -70, abre)} L 56 -34 Z`} fill="#fff" opacity={0.15} />
    </g>
  );

/* Volante de papel con titular y líneas. (x, y) es su centro. */
export const Volante: React.FC<{ x: number; y: number; s?: number; rot?: number; op?: number; color?: string }> = ({ x, y, s = 1, rot = 0, op = 1, color = NARANJA }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
      <rect x={-34} y={-46} width={68} height={92} rx={6} fill="#ffffff" style={sombra(0.18, 2, 5)} />
      <rect x={-26} y={-38} width={52} height={22} rx={4} fill={color} />
      {[0, 1, 2].map((k) => <rect key={k} x={-26} y={-6 + k * 14} width={k === 2 ? 30 : 52} height={7} rx={3} fill="#cbd5e1" />)}
    </g>
  );

/* Cubo isométrico (sin contornos, tres caras con distinto tono). (x, y) es la arista inferior; `l` el lado. */
export const Cubo: React.FC<{ x: number; y: number; l?: number; color: string; op?: number; letra?: string }> = ({ x, y, l = 80, color, op = 1, letra }) => {
  if (op < 0.01) return null;
  const dx = l * 0.87, dy = l * 0.5;
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <path d={`M 0 0 L ${-dx} ${-dy} V ${-dy - l} L 0 ${-l} Z`} fill={color} />
      <path d={`M 0 0 L ${dx} ${-dy} V ${-dy - l} L 0 ${-l} Z`} fill={color} />
      <path d={`M 0 0 L ${dx} ${-dy} V ${-dy - l} L 0 ${-l} Z`} fill="#000" opacity={0.18} />
      <path d={`M 0 ${-l} L ${-dx} ${-dy - l} L 0 ${-2 * dy - l} L ${dx} ${-dy - l} Z`} fill="#fff" opacity={0.28} />
      <path d={`M 0 ${-l} L ${-dx} ${-dy - l} L 0 ${-2 * dy - l} L ${dx} ${-dy - l} Z`} fill={color} opacity={0.72} />
      {letra && <Txt x={-dx / 2} y={-dy / 2 - l / 2 + 12} textAnchor="middle" fontSize={l * 0.42} fill="#fff">{letra}</Txt>}
    </g>
  );
};

/* Etiqueta de precio colgante con su valor. (x, y) es el agujero; `bal` hace que se balancee. */
export const EtiquetaPrecio: React.FC<{ x: number; y: number; texto: string; color?: string; s?: number; op?: number; bal?: number; t?: number; tam?: number }> = ({ x, y, texto, color = NARANJA, s = 1, op = 1, bal = 0, t = 0, tam = 34 }) => {
  if (op < 0.01) return null;
  const w = Math.max(110, texto.length * tam * 0.62 + 60);
  return (
    <g transform={`translate(${x} ${y}) rotate(${bal * 6 * Math.sin(t * 2.2)}) scale(${s})`} opacity={op}>
      <path d={`M 0 0 L 22 ${-34} H ${w} V 34 H 22 Z`} transform="translate(0 0)" fill={color} style={sombra(0.22, 3, 8)} />
      <circle cx={18} cy={0} r={8} fill="#ffffff" />
      <Txt x={22 + (w - 22) / 2 + 4} y={tam * 0.36} textAnchor="middle" fontSize={tam} fill="#ffffff">{texto}</Txt>
    </g>
  );
};

/* Escudo de garantía con el visto; `u` (0 a 1) lo hace crecer desde el centro. (x, y) es su centro. */
export const Escudo: React.FC<{ x: number; y: number; s?: number; u?: number; color?: string; op?: number }> = ({ x, y, s = 1, u = 1, color = '#10b981', op = 1 }) =>
  u < 0.01 || op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s * lerp(0.4, 1, cl(u))})`} opacity={op * cl(u * 2)}>
      <path d="M 0 -90 L 72 -62 V 0 Q 72 62 0 96 Q -72 62 -72 0 V -62 Z" fill={color} style={sombra(0.25, 4, 10)} />
      <path d="M 0 -90 L 72 -62 V 0 Q 72 62 0 96 Z" fill="#000" opacity={0.12} />
      <path d="M -30 2 L -8 26 L 34 -22" stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );

/* Caja de regalo (bono) con lazo. (x, y) es la base. */
export const Regalo: React.FC<{ x: number; y: number; s?: number; color?: string; op?: number; rot?: number }> = ({ x, y, s = 1, color = ROSA, op = 1, rot = 0 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
      <ellipse cx={0} cy={3} rx={54} ry={8} fill="#000" opacity={0.14} />
      <rect x={-46} y={-70} width={92} height={70} rx={8} fill={color} />
      <rect x={-46} y={-70} width={46} height={70} rx={8} fill="#000" opacity={0.08} />
      <rect x={-54} y={-92} width={108} height={26} rx={8} fill={color} />
      <rect x={-8} y={-92} width={16} height={92} fill="#fde68a" />
      <path d="M 0 -92 Q -40 -130 -30 -96 Z M 0 -92 Q 40 -130 30 -96 Z" fill="#fde68a" />
    </g>
  );
