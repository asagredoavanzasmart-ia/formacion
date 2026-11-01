import React from 'react';
import { NARANJA, ROSA, Txt } from '../../remotion/comun';

/* Piezas compartidas por las escenas de «El método Lean Startup» (dibujos SVG propios, sólidos rellenos). Reexporta las de Océano azul. */
export { W, H, MIN_TXT, Rotulo, PanelPregunta, ventana, e1, borde, marcador, Chip, Etiqueta, Burbuja, Gesto, Ondas, lerp, escribe } from '../../oceano/escenas/comunOA';
export { AZUL_M, AZUL_O, AZUL_C, ROJO_M, ROJO_O, ROJO_C, Mar, Barco, Celda, Curva, Edificio, Tienda, Precio, Flecha, Moneda } from '../../oceano/escenas/comunOA';
export type { PropsCE } from '../../oceano/escenas/comunOA';

export const VERDE = '#10b981', VIOLETA = '#7c3aed', TEAL = '#0f766e';

/* Bombilla de idea. (x, y) es su centro. */
export const Bombilla: React.FC<{ x: number; y: number; s?: number; op?: number; id: string }> = ({ x, y, s = 1, op = 1, id }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <circle r={64} fill="#fde047" opacity={0.25} />
    <path d="M -28 12 Q -44 -20 -24 -44 Q 0 -68 24 -44 Q 44 -20 28 12 Q 18 24 16 34 H -16 Q -18 24 -28 12 Z" fill={`url(#${id}-marca)`} />
    <rect x={-15} y={36} width={30} height={10} rx={5} fill="#9ca3af" />
  </g>
);

/* Engranaje; gira con t. */
export const Engranaje: React.FC<{ x: number; y: number; r?: number; t?: number; color?: string; hueco: string; op?: number }> = ({ x, y, r = 44, t = 0, color = '#64748b', hueco, op = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${t * 30})`} opacity={op}>
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-r * 0.16} y={-r * 1.3} width={r * 0.32} height={r * 0.42} rx={r * 0.06} fill={color} transform={`rotate(${k * 45})`} />)}
    <circle r={r} fill={color} /><circle r={r * 0.42} fill={hueco} />
  </g>
);

/* Teléfono con n pantallas de funciones; `grieta` lo muestra roto pero andando. (x, y) es su centro. */
export const Telefono: React.FC<{ x: number; y: number; s?: number; widgets?: number; grieta?: boolean; op?: number }> = ({ x, y, s = 1, widgets = 4, grieta = false, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <rect x={-58} y={-110} width={116} height={220} rx={22} fill="#1f2937" />
    <rect x={-48} y={-94} width={96} height={188} rx={12} fill="#2f7bf6" />
    {Array.from({ length: widgets }, (_, k) => <rect key={k} x={-38 + (k % 2) * 40} y={-82 + Math.floor(k / 2) * 42} width={34} height={32} rx={8} fill={['#ffffff', '#fde68a', '#fbcfe8', '#bbf7d0', '#c7d2fe', '#fed7aa'][k % 6]} opacity={0.92} />)}
    {grieta && <path d="M 8 -94 L -6 -50 L 14 -26 L -4 10 L 12 60 L 2 94" stroke="#0f172a" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
  </g>
);

/* Calendario con n casillas tachadas. */
export const Calendario: React.FC<{ x: number; y: number; s?: number; marcados?: number; op?: number }> = ({ x, y, s = 1, marcados = 0, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <rect x={-84} y={-80} width={168} height={160} rx={20} fill="#fff" />
    <rect x={-84} y={-80} width={168} height={40} rx={20} fill={ROSA} /><rect x={-84} y={-58} width={168} height={18} fill={ROSA} />
    {Array.from({ length: 14 }, (_, k) => <g key={k}><rect x={-72 + (k % 7) * 22} y={-28 + Math.floor(k / 7) * 34} width={18} height={26} rx={5} fill="#e5e7eb" />{k < marcados && <path d={`M ${-69 + (k % 7) * 22} ${-18 + Math.floor(k / 7) * 34} l 6 8 l 8 -14`} stroke={VERDE} strokeWidth={4} fill="none" strokeLinecap="round" />}</g>)}
  </g>
);

/* Bucle de tres nodos (crear, medir, aprender) con una flecha que lo recorre. r es el radio; u (0 a 1) avanza el punto. */
export const Bucle: React.FC<{ cx: number; cy: number; r: number; u: number; activo?: number; id: string; op?: number; rotulos?: boolean }> = ({ cx, cy, r, u, activo = -1, id, op = 1, rotulos = false }) => {
  const ang = (k: number) => -Math.PI / 2 + (k * 2 * Math.PI) / 3;
  const P = (a: number): [number, number] => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const cols = [NARANJA, '#2f7bf6', ROSA];
  return (
    <g opacity={op}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#9ca3af" strokeWidth={10} opacity={0.35} />
      {[0, 1, 2].map((k) => {
        const a0 = ang(k) + 0.35, a1 = ang(k + 1) - 0.35;
        const [x0, y0] = P(a0), [x1, y1] = P(a1);
        return <path key={k} d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`} fill="none" stroke={cols[k]} strokeWidth={14} strokeLinecap="round" />;
      })}
      {[0, 1, 2].map((k) => { const [x, y] = P(ang(k)); return <circle key={k} cx={x} cy={y} r={activo === k ? 38 : 30} fill={cols[k]} />; })}
      {rotulos && ['Crear', 'Medir', 'Aprender'].map((n, k) => { const [x, y] = P(ang(k)); const dx = k === 0 ? 0 : k === 1 ? 52 : -52; const dy = k === 0 ? -56 : 20; return <Txt key={n} f="a" x={x + dx} y={y + dy} textAnchor={k === 0 ? 'middle' : k === 1 ? 'start' : 'end'} fontSize={28} fill={cols[k]}>{n}</Txt>; })}
      {(() => { const [x, y] = P(-Math.PI / 2 + u * 2 * Math.PI); return <circle cx={x} cy={y} r={14} fill="#fff" stroke={`url(#${id}-marca)`} strokeWidth={6} />; })()}
    </g>
  );
};
