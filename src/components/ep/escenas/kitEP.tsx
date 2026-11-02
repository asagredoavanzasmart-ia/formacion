import React from 'react';
import { NARANJA, ROSA, tono } from '../../remotion/comun';
import { useEscena as useEscenaEQ } from '../../equipos/escenas/kitEQ';
import { Txt } from '../../revops/escenas/kitRO';
import { PAGINAS } from '../indice';

/* Kit de «Enamórate del problema, no de la solución»: reexporta el armazón de escenas (tomas, letreros,
   personas, cifras) y suma los objetos que se repiten en el libro de Uri Levine: autos y carreteras, el pin
   del mapa, fajos de billetes, la brújula del problema, la nube de frustración, el desierto, el tanque de
   combustible, el contrato y los anillos. Sólidos rellenos, sin contornos. */

export { Lienzo, Suelo, Cuenta, Cartel, Cifra, Monitor, Arco, enArco, Barra, brillo, mezcla, PIZARRA, AMBAR } from '../../equipos/escenas/kitEQ';
export { Toma, Apoyo, Hoja, Reloj, Visto, Cruz, Flujo, Corazon, Moneda3D, PilaMonedas, Portatil, sm, cl, azar } from '../../lean/escenas/kitLS';
export { Engranaje, Bombilla, Calendario, Telefono } from '../../lean/escenas/comunLS';
export { Rotulo, W, H, MIN_TXT, lerp, escribe, e1, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, Edificio, Flecha, Curva, Burbuja } from '../../lean/escenas/comunLS';
export type { PropsCE } from '../../lean/escenas/comunLS';
export { Letrero, Txt, useMovil, Embudo, Tabla, enRuta, Lead, Nucleo } from '../../revops/escenas/kitRO';
export { NARANJA, ROSA, tono };
export { Persona, sombra, ac, pop } from '../../remotion/comun';

/* Armazón de la escena de una página: los nombres de las marcas salen de las anclas de la página. */
export function useEscenaEP(id: string, marcas: number[], estatico = false) {
  const nombres = React.useMemo(() => Object.keys(PAGINAS[id]?.anclas ?? {}), [id]);
  const r = useEscenaEQ(nombres, marcas, estatico);
  return { ...r, m: (n: string) => r.M(n), c: tono };
}

export const AZUL_W = '#33ccff', GRIS = '#94a3b8', BILLETE = '#22a06b';

/* Auto de perfil apoyado en (x, y). */
export const Auto: React.FC<{ x: number; y: number; s?: number; color?: string; flip?: boolean; giro?: number; op?: number; luz?: number }> = ({ x, y, s = 1, color = NARANJA, flip = false, giro = 0, op = 1, luz = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={op}>
    <ellipse cx={0} cy={4} rx={86} ry={8} fill="#000" opacity={0.18} />
    <path d="M -84 -14 V -40 Q -84 -52 -70 -54 L -44 -58 L -22 -84 Q -16 -90 -6 -90 H 34 Q 44 -90 50 -82 L 66 -58 L 76 -56 Q 88 -54 88 -40 V -14 Z" fill={color} />
    <path d="M -84 -36 H 88 V -14 H -84 Z" fill="#000" opacity={0.12} />
    <path d="M -36 -60 L -18 -80 Q -14 -84 -8 -84 H 8 V -60 Z" fill="#cfe8ff" /><path d="M 16 -84 H 32 Q 40 -84 44 -78 L 56 -60 H 16 Z" fill="#cfe8ff" />
    <circle cx={84} cy={-40} r={5} fill={luz > 0.5 ? '#fbbf24' : '#fde68a'} />
    {[-50, 54].map((wx) => <g key={wx} transform={`translate(${wx} -14) rotate(${giro})`}><circle r={17} fill="#1f2937" /><circle r={7} fill="#cbd5e1" /><rect x={-1.5} y={-7} width={3} height={14} fill="#475569" /></g>)}
  </g>
);

/* Carretera recta con línea discontinua que avanza con `avance`. (y) es el centro de la calzada. */
export const Carretera: React.FC<{ y: number; x0?: number; x1?: number; ancho?: number; avance?: number; op?: number }> = ({ y, x0 = 40, x1 = 1160, ancho = 70, avance = 0, op = 1 }) => (
  <g opacity={op}>
    <rect x={x0} y={y - ancho / 2} width={x1 - x0} height={ancho} rx={ancho / 2} fill="#475569" />
    <line x1={x0 + 30} y1={y} x2={x1 - 30} y2={y} stroke="#f8fafc" strokeWidth={5} strokeDasharray="34 26" strokeDashoffset={-avance} opacity={0.8} />
  </g>
);

/* Pin del mapa. (x, y) es la punta. */
export const Pin: React.FC<{ x: number; y: number; s?: number; color?: string; op?: number }> = ({ x, y, s = 1, color = ROSA, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <ellipse cx={0} cy={2} rx={14} ry={4} fill="#000" opacity={0.2} />
    <path d="M 0 0 C -10 -18 -26 -30 -26 -48 A 26 26 0 0 1 26 -48 C 26 -30 10 -18 0 0 Z" fill={color} />
    <circle cy={-48} r={10} fill="#fff" />
  </g>
);

/* Fajo de billetes visto en perspectiva; `n` capas. (x, y) es la base. */
export const Fajo: React.FC<{ x: number; y: number; n?: number; w?: number; op?: number }> = ({ x, y, n = 6, w = 120, op = 1 }) => (
  <g opacity={op}>
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, k) => (
      <g key={k} transform={`translate(${x} ${y - k * 12})`}>
        <path d={`M ${-w / 2} 0 L ${-w / 2 + 24} -18 H ${w / 2 + 24} L ${w / 2} 0 Z`} fill="#7ee2b0" />
        <rect x={-w / 2} y={0} width={w} height={10} fill={BILLETE} />
        <ellipse cx={12} cy={-9} rx={16} ry={6} fill={BILLETE} opacity={0.55} />
        <rect x={-w / 2 + 50} y={-18} width={14} height={18} fill="#fde68a" opacity={0.85} transform="skewX(-50)" />
      </g>
    ))}
  </g>
);

/* Brújula con la aguja apuntando a `ang` grados (0 = arriba). */
export const Brujula: React.FC<{ x: number; y: number; r?: number; ang?: number; id: string; op?: number; rotulo?: string }> = ({ x, y, r = 90, ang = 0, id, op = 1, rotulo }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <ellipse cx={0} cy={r + 14} rx={r * 0.9} ry={r * 0.14} fill="#000" opacity={0.14} />
    <circle r={r} fill={`url(#${id}-marca)`} /><circle r={r * 0.84} fill="#fffaf5" />
    {[0, 90, 180, 270].map((a) => <rect key={a} x={-3} y={-r * 0.8} width={6} height={r * 0.16} rx={3} fill="#94a3b8" transform={`rotate(${a})`} />)}
    <g transform={`rotate(${ang})`}>
      <path d={`M 0 ${-r * 0.7} L ${r * 0.14} 0 L ${-r * 0.14} 0 Z`} fill={ROSA} />
      <path d={`M 0 ${r * 0.7} L ${r * 0.14} 0 L ${-r * 0.14} 0 Z`} fill="#64748b" />
    </g>
    <circle r={r * 0.09} fill="#334155" />
    {rotulo && <Txt x={0} y={r + 52} textAnchor="middle" fontSize={30} fill={NARANJA}>{rotulo}</Txt>}
  </g>
);

/* Nube de frustración con rayos que titilan. (x, y) es el centro. */
export const Nube: React.FC<{ x: number; y: number; s?: number; t?: number; op?: number; color?: string; rayos?: boolean }> = ({ x, y, s = 1, t = 0, op = 1, color = '#64748b', rayos = true }) => (
  <g transform={`translate(${x} ${y + 4 * Math.sin(t * 2)}) scale(${s})`} opacity={op}>
    <path d="M -70 20 Q -100 20 -96 -6 Q -92 -30 -64 -26 Q -60 -60 -24 -58 Q 0 -80 30 -60 Q 66 -66 70 -30 Q 100 -26 96 0 Q 94 20 66 20 Z" fill={color} />
    <path d="M -70 20 Q -100 20 -96 -6 Q -40 4 0 -2 Q 50 6 96 0 Q 94 20 66 20 Z" fill="#000" opacity={0.12} />
    {rayos && <path d="M -10 22 L -24 52 L -8 52 L -20 82" stroke="#fbbf24" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.5 + 0.5 * Math.abs(Math.sin(t * 5))} />}
  </g>
);

/* Duna del desierto entre x0 y x1 con altura h. */
export const Duna: React.FC<{ x0: number; x1: number; y: number; h: number; color?: string }> = ({ x0, x1, y, h, color = '#f6c56d' }) => (
  <path d={`M ${x0} ${y} Q ${(x0 + x1) / 2} ${y - h * 2} ${x1} ${y} Z`} fill={color} />
);

/* Bidón de combustible con nivel (0 a 1). (x, y) es la base. */
export const Bidon: React.FC<{ x: number; y: number; s?: number; nivel?: number; op?: number }> = ({ x, y, s = 1, nivel = 1, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <ellipse cx={0} cy={4} rx={56} ry={8} fill="#000" opacity={0.16} />
    <rect x={-46} y={-120} width={92} height={120} rx={14} fill="#e5484d" />
    <rect x={-34} y={-104} width={68} height={88} rx={8} fill="#7f1d1d" opacity={0.35} />
    <rect x={-34} y={-16 - 88 * nivel} width={68} height={88 * nivel} rx={8} fill="#fbbf24" />
    <rect x={14} y={-142} width={22} height={26} rx={5} fill="#b91c1c" /><path d="M -40 -124 L -10 -144 H 6 L -24 -124 Z" fill="#b91c1c" />
  </g>
);

/* Contrato de una hoja con firma que se traza con `firma` (0 a 1). (x, y) es el centro. */
export const Contrato: React.FC<{ x: number; y: number; s?: number; firma?: number; rot?: number; op?: number; titulo?: string }> = ({ x, y, s = 1, firma = 0, rot = 0, op = 1, titulo }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
    <rect x={-80} y={-104} width={160} height={208} rx={10} fill="#fff" style={{ filter: 'drop-shadow(0 4px 8px rgba(15,23,42,0.3))' }} />
    <rect x={-56} y={-82} width={112} height={12} rx={6} fill={NARANJA} />
    {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-56} y={-52 + k * 22} width={k === 4 ? 70 : 112} height={7} rx={3.5} fill="#cbd5e1" />)}
    <path d="M -50 70 q 14 -24 26 -4 q 12 20 24 -6 q 10 -20 22 2 q 8 12 28 -6" stroke="#1d4ed8" strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray={170} strokeDashoffset={170 * (1 - firma)} />
    <rect x={-56} y={84} width={112} height={4} rx={2} fill="#94a3b8" />
    {titulo && <Txt x={0} y={-118} textAnchor="middle" fontSize={26} fill="#64748b">{titulo}</Txt>}
  </g>
);

/* Dos anillos entrelazados. */
export const Anillos: React.FC<{ x: number; y: number; s?: number; op?: number }> = ({ x, y, s = 1, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <circle cx={-26} cy={0} r={40} fill="none" stroke="#f59e0b" strokeWidth={14} /><circle cx={26} cy={0} r={40} fill="none" stroke="#fbbf24" strokeWidth={14} />
    <path d="M -2 -36 l 6 -12 l 6 12 l -6 6 Z" fill="#7dd3fc" />
  </g>
);

/* Camión de reparto de perfil. (x, y) es la base. */
export const Camion: React.FC<{ x: number; y: number; s?: number; color?: string; op?: number; giro?: number; gris?: boolean }> = ({ x, y, s = 1, color = '#2f7bf6', op = 1, giro = 0, gris = false }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <ellipse cx={0} cy={4} rx={120} ry={9} fill="#000" opacity={0.18} />
    <rect x={-120} y={-118} width={156} height={104} rx={10} fill={gris ? '#cbd5e1' : '#e2e8f0'} />
    <path d="M 40 -14 V -86 H 84 L 116 -54 V -14 Z" fill={gris ? '#94a3b8' : color} /><path d="M 52 -78 H 80 L 102 -56 H 52 Z" fill="#cfe8ff" />
    {[-86, -30, 82].map((wx) => <g key={wx} transform={`translate(${wx} -12) rotate(${giro})`}><circle r={18} fill="#1f2937" /><circle r={7} fill="#cbd5e1" /></g>)}
  </g>
);

/* Bus de perfil. (x, y) es la base. */
export const Bus: React.FC<{ x: number; y: number; s?: number; color?: string; op?: number }> = ({ x, y, s = 1, color = VIOLETA_BUS, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <ellipse cx={0} cy={4} rx={130} ry={9} fill="#000" opacity={0.18} />
    <rect x={-130} y={-120} width={260} height={106} rx={18} fill={color} />
    {[-104, -58, -12, 34].map((wx) => <rect key={wx} x={wx} y={-104} width={38} height={36} rx={6} fill="#cfe8ff" />)}
    <rect x={82} y={-104} width={34} height={78} rx={6} fill="#cfe8ff" />
    {[-82, 82].map((wx) => <g key={wx} transform={`translate(${wx} -12)`}><circle r={18} fill="#1f2937" /><circle r={7} fill="#cbd5e1" /></g>)}
  </g>
);
const VIOLETA_BUS = '#7c3aed';

/* Montaña rusa: riel ondulado de x0 a x1 y un carrito que lo recorre con u (0 a 1). */
export const rielY = (x: number, y: number, amp: number) => y - amp * Math.sin((x - 60) / 110) * Math.max(0.3, Math.cos((x - 60) / 520));
export const MontanaRusa: React.FC<{ x0?: number; x1?: number; y: number; amp?: number; u: number; color?: string; op?: number; id: string; giro?: number }> = ({ x0 = 60, x1 = 1140, y, amp = 120, u, color = '#64748b', op = 1, id }) => {
  const pts: string[] = [];
  for (let x = x0; x <= x1; x += 10) pts.push(`${x},${rielY(x, y, amp).toFixed(1)}`);
  const cx = x0 + (x1 - x0) * Math.min(1, Math.max(0, u)), cy = rielY(cx, y, amp);
  const dy = rielY(cx + 4, y, amp) - rielY(cx - 4, y, amp);
  const ang = Math.atan2(dy, 8) * 180 / Math.PI;
  return (
    <g opacity={op}>
      {Array.from({ length: Math.floor((x1 - x0) / 80) + 1 }, (_, k) => { const px = x0 + k * 80; return <rect key={k} x={px - 4} y={rielY(px, y, amp)} width={8} height={y + amp + 60 - rielY(px, y, amp)} fill={color} opacity={0.35} />; })}
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={10} strokeLinejoin="round" />
      <g transform={`translate(${cx} ${cy}) rotate(${ang})`}>
        <rect x={-36} y={-40} width={72} height={34} rx={10} fill={`url(#${id}-marca)`} />
        <circle cx={-22} cy={-4} r={8} fill="#1f2937" /><circle cx={22} cy={-4} r={8} fill="#1f2937" />
        <circle cx={-10} cy={-54} r={10} fill="#f7c4a0" /><circle cx={14} cy={-54} r={10} fill="#f7c4a0" />
      </g>
    </g>
  );
};

/* Escalón numerado de una escalera de pasos. (x, y) es la base izquierda. */
export const Escalon: React.FC<{ x: number; y: number; w: number; h: number; color: string; op?: number }> = ({ x, y, w, h, color, op = 1 }) => (
  <g opacity={op}>
    <rect x={x} y={y - h} width={w} height={h} rx={10} fill={color} />
    <rect x={x + w / 2} y={y - h} width={w / 2} height={h} rx={10} fill="#000" opacity={0.12} />
  </g>
);

/* Tablero de cuatro cuadrantes. (x, y) es la esquina inferior izquierda; s el lado de cada celda. */
export const Cuadrantes: React.FC<{ x: number; y: number; s: number; colores: string[]; op?: number[]; c: ReturnType<typeof tono> }> = ({ x, y, s, colores, op = [1, 1, 1, 1], c }) => (
  <g>
    {[[0, 1], [1, 1], [0, 0], [1, 0]].map(([i, j], k) => (
      <rect key={k} x={x + i * (s + 10)} y={y - (j + 1) * s - j * 10} width={s} height={s} rx={18} fill={op[k] > 0.05 ? colores[k] : c.panel2} opacity={op[k] > 0.05 ? 0.25 + 0.75 * op[k] : 1} />
    ))}
  </g>
);
