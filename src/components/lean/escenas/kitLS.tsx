import React from 'react';
import { NARANJA, ROSA, Txt, ac, sombra } from '../../remotion/comun';
import { MIN_TXT, lerp } from './comunLS';
import { useTam } from '../../comunicacion/escenas/comunCE';

/* Kit de dirección de arte de «El método Lean Startup»: cámara por tomas, letreros que respetan el piso de
   texto en móvil y objetos dibujados que se repiten entre escenas. Todo en sólidos rellenos, sin contornos. */

export const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/* Suavizado entre a y b (0 → 1). */
export const sm = (x: number, a: number, b: number) => { const u = cl((x - a) / (b - a)); return u * u * (3 - 2 * u); };
/* Ruido determinista para chispas y partículas. */
export const azar = (n: number) => { const s = Math.sin(n * 12.9898) * 43758.5453; return s - Math.floor(s); };

/* Una toma de cámara: entra en `a` y sale en `b` con fundido y un acercamiento suave alrededor de (cx, cy).
   `zi` es la escala al entrar (1.12 = viene de cerca) y `zo` al salir. Fuera de su tramo no se dibuja. */
export const Toma: React.FC<{ t: number; a: number; b: number; cx?: number; cy?: number; zi?: number; zo?: number; children: React.ReactNode }> = ({ t, a, b, cx = 600, cy = 470, zi = 1.08, zo = 0.94, children }) => {
  const op = ac(t, a - 0.05, a + 0.55) * (1 - ac(t, b - 0.5, b));
  if (op <= 0.005) return null;
  const z = lerp(zi, 1, ac(t, a - 0.05, a + 0.9)) * lerp(1, zo, ac(t, b - 0.6, b));
  return <g opacity={op} transform={`translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})`}>{children}</g>;
};

/* Letrero: píldora con texto que crece con el piso de móvil sin salirse. `fondo` admite el degradado de marca. */
export const Letrero: React.FC<{ x: number; y: number; texto: string; op?: number; fondo?: string; color?: string; tam?: number; id: string; ancla?: 'middle' | 'start' | 'end'; sombraS?: number }> = ({ x, y, texto, op = 1, fondo, color = '#fff', tam = MIN_TXT, id, ancla = 'middle', sombraS = 0.22 }) => {
  const t2 = useTam(tam);
  if (op < 0.01) return null;
  const w = texto.length * t2 * 0.56 + t2 * 1.2, h = t2 * 1.6;
  const x0 = ancla === 'middle' ? -w / 2 : ancla === 'start' ? 0 : -w;
  return (
    <g opacity={op} transform={`translate(${x} ${y + (1 - op) * 10})`}>
      <rect x={x0} y={-h / 2} width={w} height={h} rx={h / 2} fill={fondo ?? `url(#${id}-marca)`} style={sombra(sombraS, 3, 8)} />
      <Txt f="a" x={x0 + w / 2} y={t2 * 0.36} textAnchor="middle" fontSize={tam} fill={color}>{texto}</Txt>
    </g>
  );
};

/* Sombra de apoyo bajo un objeto. */
export const Apoyo: React.FC<{ x: number; y: number; rx: number; op?: number }> = ({ x, y, rx, op = 0.16 }) => <ellipse cx={x} cy={y} rx={rx} ry={rx * 0.14} fill="#000" opacity={op} />;

/* Piso del escenario: una banda suave que ancla la escena. */
export const Piso: React.FC<{ y: number; isDark: boolean; x0?: number; x1?: number; op?: number }> = ({ y, isDark, x0 = 60, x1 = 1140, op = 1 }) => (
  <g opacity={op}>
    <rect x={x0} y={y} width={x1 - x0} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
  </g>
);

/* Furgoneta de la startup (degradado de marca). (x, y) es la base. */
export const Furgon: React.FC<{ x: number; y: number; s?: number; rot?: number; giro?: number; id: string; flip?: boolean; humo?: number; t: number; luz?: number }> = ({ x, y, s = 1, rot = 0, giro = 0, id, flip = false, humo = 0, t, luz = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`}>
    {humo > 0.01 && [0, 1, 2].map((k) => { const ph = (t * 1.6 + k / 3) % 1; return <circle key={k} cx={-96 - 40 * ph} cy={-14 - 30 * ph} r={8 + 16 * ph} fill="#9ca3af" opacity={humo * 0.7 * (1 - ph)} />; })}
    <ellipse cx={0} cy={4} rx={96} ry={9} fill="#000" opacity={0.18} />
    <path d="M -92 -12 V -76 Q -92 -96 -72 -96 H 28 Q 48 -96 60 -80 L 86 -48 Q 94 -38 94 -26 V -12 Z" fill={`url(#${id}-marca)`} />
    <path d="M 0 -96 H 28 Q 48 -96 60 -80 L 86 -48 Q 94 -38 94 -26 V -12 H 0 Z" fill="#000" opacity={0.1} />
    <path d="M 34 -84 H 50 L 74 -52 H 34 Z" fill="#cfe8ff" /><rect x={-74} y={-82} width={40} height={30} rx={6} fill="#cfe8ff" /><rect x={-24} y={-82} width={44} height={30} rx={6} fill="#cfe8ff" />
    <circle cx={88} cy={-36} r={6} fill={luz > 0.5 ? '#fbbf24' : '#fde68a'} />
    {luz > 0.5 && <path d="M 94 -36 L 170 -56 V -16 Z" fill="#fde68a" opacity={0.3 * luz} />}
    {[-56, 56].map((wx) => <g key={wx} transform={`translate(${wx} -12) rotate(${giro})`}><circle r={18} fill="#1f2937" /><circle r={8} fill="#cbd5e1" /><rect x={-2} y={-8} width={4} height={16} fill="#475569" /></g>)}
  </g>
);

/* Cohete de la startup: cuerpo blanco con halo, punta y aletas de color, ventanilla y llama. (x, y) es la base. */
export const Cohete: React.FC<{ x: number; y: number; s?: number; t: number; rot?: number; llama?: number; color?: string }> = ({ x, y, s = 1, t, rot = 0, llama = 1, color = '#e5484d' }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {llama > 0.01 && <g opacity={llama}><path d={`M -22 0 Q 0 ${70 + 14 * Math.sin(t * 22)} 22 0 Z`} fill="#f97316" /><path d={`M -12 0 Q 0 ${44 + 8 * Math.sin(t * 27)} 12 0 Z`} fill="#fde047" /></g>}
    <path d="M -34 -6 L -62 26 L -60 -2 L -34 -40 Z" fill={color} /><path d="M 34 -6 L 62 26 L 60 -2 L 34 -40 Z" fill={color} />
    <path d="M -34 0 V -110 Q -34 -170 0 -200 Q 34 -170 34 -110 V 0 Z" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 3px rgba(30,41,59,0.55))' }} />
    <path d="M 0 -200 Q 34 -170 34 -110 V 0 H 0 Z" fill="#94a3b8" opacity={0.25} />
    <path d="M -24 -160 Q 0 -200 24 -160 Z" fill={color} />
    <circle cy={-110} r={17} fill="#334155" /><circle cy={-110} r={11} fill="#2f7bf6" /><circle cx={-4} cy={-114} r={4} fill="#fff" opacity={0.8} />
    <rect x={-34} y={-14} width={68} height={14} fill="#cbd5e1" />
  </g>
);

/* Portátil abierto con pantalla de color; `children` se dibuja dentro de la pantalla (origen arriba a la izquierda, 200 × 124). */
export const Portatil: React.FC<{ x: number; y: number; s?: number; pantalla?: string; children?: React.ReactNode }> = ({ x, y, s = 1, pantalla = '#0b1220', children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-112} y={-150} width={224} height={146} rx={12} fill="#334155" />
    <rect x={-100} y={-138} width={200} height={124} rx={6} fill={pantalla} />
    <g transform="translate(-100 -138)">{children}</g>
    <path d="M -136 -4 H 136 L 124 12 H -124 Z" fill="#94a3b8" /><rect x={-24} y={-4} width={48} height={5} rx={2} fill="#64748b" />
  </g>
);

/* Hoja de papel con renglones. (x, y) es el centro. */
export const Hoja: React.FC<{ x: number; y: number; w?: number; h?: number; rot?: number; lineas?: number; color?: string; op?: number }> = ({ x, y, w = 90, h = 116, rot = 0, lineas = 5, color = '#94a3b8', op = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={op}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={8} fill="#ffffff" style={{ filter: 'drop-shadow(0 3px 6px rgba(15,23,42,0.3))' }} />
    {Array.from({ length: lineas }, (_, k) => <rect key={k} x={-w / 2 + 12} y={-h / 2 + 18 + k * ((h - 30) / lineas)} width={(w - 24) * (k % 3 === 2 ? 0.6 : 1)} height={6} rx={3} fill={color} />)}
  </g>
);

/* Moneda con canto. */
export const Moneda3D: React.FC<{ x: number; y: number; r?: number; op?: number; giro?: number }> = ({ x, y, r = 20, op = 1, giro = 1 }) => (
  <g opacity={op} transform={`translate(${x} ${y}) scale(${Math.max(0.12, Math.abs(giro))} 1)`}>
    <circle cx={2} cy={3} r={r} fill="#d97706" /><circle r={r} fill="#f59e0b" /><circle r={r * 0.7} fill="#fde047" />
    <rect x={-r * 0.1} y={-r * 0.42} width={r * 0.2} height={r * 0.84} rx={r * 0.1} fill="#f59e0b" />
  </g>
);

/* Pila de monedas de n unidades. (x, y) es la base. */
export const PilaMonedas: React.FC<{ x: number; y: number; n: number; w?: number }> = ({ x, y, n, w = 70 }) => (
  <g>{Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => <g key={k}><rect x={x - w / 2} y={y - 16 - k * 13} width={w} height={16} rx={8} fill="#f59e0b" /><rect x={x - w / 2} y={y - 16 - k * 13} width={w} height={7} rx={3.5} fill="#fde047" /></g>)}</g>
);

/* Reloj de pared; las agujas avanzan con `t` multiplicado por `vel`. */
export const Reloj: React.FC<{ x: number; y: number; r?: number; t: number; vel?: number; aro?: string }> = ({ x, y, r = 60, t, vel = 1, aro = NARANJA }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#ffffff" style={{ filter: 'drop-shadow(0 2px 5px rgba(15,23,42,0.3))' }} /><circle r={r} fill="none" stroke={aro} strokeWidth={r * 0.14} />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-1.5} y={-r * 0.82} width={3} height={r * 0.14} fill="#94a3b8" transform={`rotate(${k * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-r * 0.5} stroke="#334155" strokeWidth={r * 0.1} strokeLinecap="round" transform={`rotate(${t * 30 * vel})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.72} stroke="#334155" strokeWidth={r * 0.06} strokeLinecap="round" transform={`rotate(${t * 360 * vel})`} />
    <circle r={r * 0.09} fill="#334155" />
  </g>
);

/* Corazón. */
export const Corazon: React.FC<{ x: number; y: number; s?: number; color?: string; op?: number }> = ({ x, y, s = 1, color = ROSA, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}><path d="M 0 26 C -46 -6 -24 -46 0 -18 C 24 -46 46 -6 0 26 Z" fill={color} /><ellipse cx={-14} cy={-14} rx={6} ry={9} fill="#fff" opacity={0.35} transform="rotate(-30 -14 -14)" /></g>
);

/* Visto y cruz en círculo. */
export const Visto: React.FC<{ x: number; y: number; r?: number; color?: string; op?: number }> = ({ x, y, r = 30, color = '#10b981', op = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}><circle r={r} fill={color} /><path d={`M ${-r * 0.45} 0 l ${r * 0.3} ${r * 0.32} l ${r * 0.58} ${-r * 0.62}`} stroke="#fff" strokeWidth={r * 0.22} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
);
export const Cruz: React.FC<{ x: number; y: number; r?: number; color?: string; op?: number }> = ({ x, y, r = 30, color = '#e5484d', op = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}><circle r={r} fill={color} /><path d={`M ${-r * 0.38} ${-r * 0.38} L ${r * 0.38} ${r * 0.38} M ${r * 0.38} ${-r * 0.38} L ${-r * 0.38} ${r * 0.38}`} stroke="#fff" strokeWidth={r * 0.22} strokeLinecap="round" /></g>
);

/* Partículas que viajan de (x1, y1) a (x2, y2) en arco, en bucle. */
export const Flujo: React.FC<{ x1: number; y1: number; x2: number; y2: number; t: number; n?: number; vel?: number; arco?: number; color?: string | string[]; r?: number; op?: number }> = ({ x1, y1, x2, y2, t, n = 5, vel = 0.6, arco = 40, color = NARANJA, r = 7, op = 1 }) => (
  <g opacity={op}>{Array.from({ length: n }, (_, k) => { const ph = (t * vel + k / n) % 1; const x = lerp(x1, x2, ph), y = lerp(y1, y2, ph) - arco * Math.sin(Math.PI * ph); return <circle key={k} cx={x} cy={y} r={r} fill={Array.isArray(color) ? color[k % color.length] : color} opacity={Math.min(1, ph * 6, (1 - ph) * 6)} />; })}</g>
);
