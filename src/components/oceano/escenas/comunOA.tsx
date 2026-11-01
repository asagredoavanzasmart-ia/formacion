import React from 'react';
import { Txt, sombra } from '../../remotion/comun';
import type { Tono } from '../../comunicacion/escenas/comunCE';

/* Piezas compartidas por las escenas de «Estrategia del océano azul» (dibujos SVG propios, sólidos rellenos). */
export { W, H, MIN_TXT, Rotulo, PanelPregunta, ventana, e1, borde, marcador, Chip, Etiqueta, Burbuja, Gesto, Ondas, Brazos, lerp, escribe } from '../../comunicacion/escenas/comunCE';
export type { PropsCE } from '../../comunicacion/escenas/comunCE';

export const ROJO_M = '#e5484d', ROJO_O = '#b4232a', ROJO_C = '#ffb4b8';
export const AZUL_M = '#2f7bf6', AZUL_O = '#1d4fbf', AZUL_C = '#9bd2ff';

/* Banda de mar con dos capas de olas que se desplazan. (x, y) es la esquina superior izquierda. */
export const Mar: React.FC<{ x: number; y: number; w: number; h: number; t: number; color: string; oscuro: string; op?: number; amp?: number }> = ({ x, y, w, h, t, color, oscuro, op = 1, amp = 9 }) => {
  const capa = (fase: number, dy: number, k: number) => {
    let d = `M ${x} ${y + dy}`;
    for (let i = 0; i <= w; i += 30) d += ` L ${x + i} ${y + dy + amp * Math.sin((i / w) * Math.PI * k + t * 1.2 + fase)}`;
    return `${d} L ${x + w} ${y + h} L ${x} ${y + h} Z`;
  };
  return (
    <g opacity={op}>
      <path d={capa(0, 0, 6)} fill={color} />
      <path d={capa(2.1, amp * 1.6, 5)} fill={oscuro} opacity={0.55} />
    </g>
  );
};

/* Barco de vela: casco, mástil y dos velas. (x, y) es la línea de flotación. */
export const Barco: React.FC<{ x: number; y: number; s?: number; casco?: string; vela?: string; rot?: number; op?: number; flip?: boolean }> = ({ x, y, s = 1, casco = '#7c2d12', vela = '#ffffff', rot = 0, op = 1, flip = false }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`} opacity={op}>
    <path d="M -62 -2 L 62 -2 L 42 28 L -42 28 Z" fill={casco} />
    <path d="M 0 -2 L 62 -2 L 42 28 L 0 28 Z" fill="#000" opacity={0.16} />
    <rect x={-3} y={-92} width={6} height={92} rx={3} fill="#4b5563" />
    <g style={{ filter: "drop-shadow(0 0 2.5px rgba(30,41,59,0.55))" }}>
      <path d="M 6 -88 L 6 -10 L 54 -10 Z" fill={vela} />
      <path d="M -6 -76 L -6 -10 L -44 -10 Z" fill={vela} opacity={0.88} />
    </g>
    <path d="M 6 -88 L 6 -10 L 54 -10 Z" fill="#000" opacity={0.06} />
  </g>
);

/* Celda de una cuadrícula: panel redondeado con sombra; se atenúa si no es la activa. */
export const Celda: React.FC<{ x: number; y: number; w: number; h: number; c: Tono; op?: number; activa?: boolean; children?: React.ReactNode }> = ({ x, y, w, h, c, op = 1, activa = false, children }) => (
  <g opacity={op} transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={28} fill={c.panel} style={sombra(c.sombra, activa ? 12 : 6, activa ? 26 : 14)} />
    <g transform={`translate(0 ${activa ? -3 : 0})`}>{children}</g>
  </g>
);

/* Ejes de un lienzo estratégico: a la izquierda «alto» y «bajo». */
export const EjesLienzo: React.FC<{ x0: number; y0: number; w: number; h: number; c: Tono; op?: number }> = ({ x0, y0, w, h, c, op = 1 }) => (
  <g opacity={op}>
    <rect x={x0} y={y0} width={w} height={h} rx={20} fill={c.panel} style={sombra(c.sombra, 6, 16)} />
    <rect x={x0 + 70} y={y0 + 24} width={6} height={h - 80} rx={3} fill={c.apagado} />
    <rect x={x0 + 70} y={y0 + h - 56} width={w - 100} height={6} rx={3} fill={c.apagado} />
    <Txt f="a" x={x0 + 58} y={y0 + 40} textAnchor="end" fontSize={28} fill={c.tenue}>alto</Txt>
    <Txt f="a" x={x0 + 58} y={y0 + h - 60} textAnchor="end" fontSize={28} fill={c.tenue}>bajo</Txt>
  </g>
);

/* Camino de puntos unidos por una curva que se dibuja hasta la fracción `u` (0 a 1). */
export const Curva: React.FC<{ pts: [number, number][]; u: number; color: string; grosor?: number; punteada?: boolean; op?: number }> = ({ pts, u, color, grosor = 9, punteada = false, op = 1 }) => {
  if (u <= 0.001) return null;
  const n = pts.length - 1, f = Math.min(1, u) * n;
  const k = Math.min(n - 1, Math.floor(f)), r = f - k;
  const vis = pts.slice(0, k + 1);
  const fin: [number, number] = [pts[k][0] + (pts[k + 1][0] - pts[k][0]) * r, pts[k][1] + (pts[k + 1][1] - pts[k][1]) * r];
  const d = [...vis, fin].map(([px, py], i) => `${i ? 'L' : 'M'} ${px} ${py}`).join(' ');
  return (
    <g opacity={op}>
      <path d={d} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={punteada ? `${grosor * 1.2} ${grosor * 1.6}` : undefined} />
      {vis.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={grosor * 0.9} fill={color} />)}
      <circle cx={fin[0]} cy={fin[1]} r={grosor * 0.9} fill={color} />
    </g>
  );
};

/* Edificio de oficinas: (x, y) es el centro de su base. */
export const Edificio: React.FC<{ x: number; y: number; w?: number; h?: number; color?: string; op?: number }> = ({ x, y, w = 100, h = 150, color = '#475569', op = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <ellipse cx={0} cy={4} rx={w * 0.62} ry={9} fill="#000" opacity={0.22} />
    <rect x={-w / 2} y={-h} width={w} height={h} rx={10} fill={color} />
    <rect x={0} y={-h} width={w / 2} height={h} rx={10} fill="#000" opacity={0.16} />
    {Array.from({ length: 3 }, (_, r) => Array.from({ length: 2 }, (_, k) => <rect key={`${r}${k}`} x={-w / 2 + 16 + k * (w / 2 - 6)} y={-h + 18 + r * (h / 3.4)} width={w / 4} height={h / 8} rx={4} fill="#fde68a" opacity={0.9} />))}
  </g>
);

/* Tienda pequeña con toldo: (x, y) es el centro de su base. */
export const Tienda: React.FC<{ x: number; y: number; w?: number; color?: string; op?: number }> = ({ x, y, w = 130, color = '#0f766e', op = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <ellipse cx={0} cy={4} rx={w * 0.62} ry={8} fill="#000" opacity={0.22} />
    <rect x={-w / 2} y={-90} width={w} height={90} rx={8} fill={color} />
    <path d={`M ${-w / 2 - 8} -90 L ${-w / 2 + 14} -122 H ${w / 2 - 14} L ${w / 2 + 8} -90 Z`} fill="#f43f5e" />
    {[-2, -1, 0, 1, 2].map((k) => <path key={k} d={`M ${k * w / 5 - w / 10} -122 H ${k * w / 5 + w / 10} L ${k * w / 5 + w / 10 + 4} -90 H ${k * w / 5 - w / 10 + 4} Z`} fill="#fff" opacity={k % 2 ? 0 : 0.85} />)}
    <rect x={-w / 2 + 14} y={-60} width={w * 0.32} height={w * 0.26} rx={6} fill="#fde68a" /><rect x={w * 0.1} y={-58} width={w * 0.26} height={58} rx={6} fill="#064e3b" />
  </g>
);

/* Etiqueta de precio con orificio; (x, y) es su centro. */
export const Precio: React.FC<{ x: number; y: number; s?: number; color?: string; op?: number }> = ({ x, y, s = 1, color, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <path d="M -50 -46 H 18 L 56 0 L 18 46 H -50 Q -62 46 -62 34 V -34 Q -62 -46 -50 -46 Z" fill={color ?? ROJO_M} />
    <circle cx={-30} cy={0} r={10} fill="#fff" opacity={0.9} />
  </g>
);

/* Flecha recta de (x1, y1) a (x2, y2) que crece con u (0 a 1). */
export const Flecha: React.FC<{ x1: number; y1: number; x2: number; y2: number; u?: number; color: string; grosor?: number; punteada?: boolean; op?: number }> = ({ x1, y1, x2, y2, u = 1, color, grosor = 12, punteada = false, op = 1 }) => {
  if (u <= 0.01) return null;
  const ex = x1 + (x2 - x1) * u, ey = y1 + (y2 - y1) * u;
  const a = Math.atan2(y2 - y1, x2 - x1), h = grosor * 2.2;
  return (
    <g opacity={op}>
      <line x1={x1} y1={y1} x2={ex - Math.cos(a) * h * 0.5} y2={ey - Math.sin(a) * h * 0.5} stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeDasharray={punteada ? `${grosor * 1.4} ${grosor * 1.4}` : undefined} />
      <path d={`M ${ex} ${ey} L ${ex - Math.cos(a - 0.5) * h} ${ey - Math.sin(a - 0.5) * h} L ${ex - Math.cos(a + 0.5) * h} ${ey - Math.sin(a + 0.5) * h} Z`} fill={color} />
    </g>
  );
};

/* Moneda de valor. */
export const Moneda: React.FC<{ x: number; y: number; r?: number; op?: number }> = ({ x, y, r = 20, op = 1 }) => (
  <g opacity={op}><circle cx={x} cy={y} r={r} fill="#f59e0b" /><circle cx={x} cy={y} r={r * 0.68} fill="#fde047" /><rect x={x - r * 0.1} y={y - r * 0.4} width={r * 0.2} height={r * 0.8} rx={r * 0.1} fill="#f59e0b" /></g>
);
