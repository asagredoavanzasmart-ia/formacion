import React from 'react';
import { NARANJA, ROSA, Txt } from '../../remotion/comun';

/* Piezas compartidas por las escenas de «El método Lean Startup» (dibujos SVG propios, sólidos rellenos). Reexporta las de Océano azul. */
export { W, H, MIN_TXT, Rotulo, PanelPregunta, ventana, e1, borde, marcador, Chip, Etiqueta, Burbuja, Gesto, Ondas, lerp, escribe } from '../../oceano/escenas/comunOA';
export { AZUL_M, AZUL_O, AZUL_C, ROJO_M, ROJO_O, ROJO_C, Mar, Barco, Celda, Curva, Edificio, Tienda, Precio, Flecha, Moneda } from '../../oceano/escenas/comunOA';
export type { PropsCE } from '../../oceano/escenas/comunOA';

export const VERDE = '#10b981', VIOLETA = '#7c3aed', TEAL = '#0f766e';

/* Ampolleta de idea: vidrio con brillo y reflejo, filamento, rosca metálica, halo y rayos que laten con t.
   `luz` (0 a 1) la enciende. (x, y) es su centro; mide unos 140 de alto en s = 1. */
export const Bombilla: React.FC<{ x: number; y: number; s?: number; op?: number; id: string; t?: number; luz?: number }> = ({ x, y, s = 1, op = 1, id, t = 0, luz = 1 }) => {
  const late = 0.88 + 0.12 * Math.sin(t * 3.2);
  const vidrio = 'M -30 20 C -30 6 -46 -6 -46 -28 C -46 -56 -24 -74 0 -74 C 24 -74 46 -56 46 -28 C 46 -6 30 6 30 20 Z';
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <defs>
        <radialGradient id={`${id}-bomH`}><stop offset="0" stopColor="#fde047" stopOpacity="0.75" /><stop offset="0.55" stopColor="#fbbf24" stopOpacity="0.25" /><stop offset="1" stopColor="#f59e0b" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}-bomV`} cx="0.42" cy="0.38" r="0.7"><stop offset="0" stopColor="#fffbe6" /><stop offset="0.45" stopColor="#fde047" /><stop offset="1" stopColor="#f59e0b" /></radialGradient>
        <linearGradient id={`${id}-bomR`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#d1d5db" /><stop offset="0.45" stopColor="#f3f4f6" /><stop offset="1" stopColor="#6b7280" /></linearGradient>
      </defs>
      {luz > 0.01 && <circle cy={-28} r={98} fill={`url(#${id}-bomH)`} opacity={luz * late} />}
      {luz > 0.01 && Array.from({ length: 8 }, (_, k) => {
        const len = 16 + 7 * Math.sin(t * 4 + k * 1.7);
        return <rect key={k} x={-4.5} y={-78 - 18 - len} width={9} height={len} rx={4.5} fill="#fbbf24" opacity={luz * 0.9} transform={`rotate(${-67.5 + k * (135 / 7)} 0 -28)`} />;
      })}
      <path d={vidrio} fill={luz > 0.01 ? `url(#${id}-bomV)` : '#e5e7eb'} style={{ filter: 'drop-shadow(0 0 2px rgba(120,53,15,0.45))' }} />
      {luz > 0.01 && luz < 1 && <path d={vidrio} fill="#e5e7eb" opacity={1 - luz} />}
      <path d="M 4 -74 C 28 -72 46 -54 46 -28 C 46 -6 30 6 30 20 H 4 Z" fill="#b45309" opacity={0.12} />
      <ellipse cx={-22} cy={-46} rx={8} ry={17} fill="#ffffff" opacity={0.75} transform="rotate(28 -22 -46)" />
      <path d="M -9 20 V -16 M 9 20 V -16" stroke="#9ca3af" strokeWidth={3} strokeLinecap="round" />
      <path d="M -11 -16 q 3.7 -10 7.3 0 q 3.7 -10 7.3 0 q 3.7 -10 7.3 0" stroke={luz > 0.5 ? '#fff7d6' : '#78716c'} strokeWidth={4} fill="none" strokeLinecap="round" style={luz > 0.5 ? { filter: 'drop-shadow(0 0 4px #f97316)' } : undefined} />
      <rect x={-26} y={18} width={52} height={10} rx={4} fill="#9ca3af" />
      {[0, 1, 2].map((k) => <rect key={k} x={-23 + k} y={28 + k * 10} width={46 - 2 * k} height={10} rx={5} fill={`url(#${id}-bomR)`} />)}
      {[0, 1].map((k) => <rect key={k} x={-22} y={36 + k * 10} width={44} height={2.5} rx={1.2} fill="#4b5563" opacity={0.5} />)}
      <path d="M -11 58 H 11 L 6 67 H -6 Z" fill="#374151" />
    </g>
  );
};

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
    <rect x={-84} y={-80} width={168} height={160} rx={20} fill="#fff" style={{ filter: "drop-shadow(0 4px 10px rgba(15,23,42,0.35))" }} />
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
