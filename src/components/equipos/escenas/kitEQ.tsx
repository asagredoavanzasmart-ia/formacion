import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { PanelPregunta, W, H, borde, e1, marcador, lerp, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL } from '../../lean/escenas/comunLS';
import { Letrero } from '../../lean/escenas/kitLS';

/* Kit de «Diseño y arquitectura de equipos de ventas»: los siete roles como personajes con su herramienta,
   la cuenta que viaja entre ellos y el armazón común de cada escena. Sólidos rellenos, sin contornos. */

export { Toma, Letrero, Apoyo, Piso, Hoja, Reloj, Visto, Cruz, Flujo, Corazon, Moneda3D, PilaMonedas, sm, cl, azar } from '../../lean/escenas/kitLS';
export { Engranaje, Bombilla, Calendario, Rotulo, W, H, MIN_TXT, lerp, escribe, e1, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, Edificio, Flecha, Curva } from '../../lean/escenas/comunLS';
export type { PropsCE } from '../../lean/escenas/comunLS';
export { NARANJA, ROSA, Persona, Txt, ac, sombra, tono };

export const ROSA_LG = '#ec4899', PIZARRA = '#64748b', AMBAR = '#f59e0b';

export type RolK = 'bdr' | 'lg' | 'sdr' | 'ae' | 'ps' | 'am' | 'mg';
export const ROLES: Record<RolK, { sigla: string; color: string }> = {
  bdr: { sigla: 'BDR', color: VIOLETA },
  lg: { sigla: 'Lead Gen', color: ROSA_LG },
  sdr: { sigla: 'SDR', color: AZUL_M },
  ae: { sigla: 'AE', color: NARANJA },
  ps: { sigla: 'Pre-Sales', color: TEAL },
  am: { sigla: 'AM', color: VERDE },
  mg: { sigla: 'Manager', color: PIZARRA },
};

/* Armazón de una escena: tiempo, marcas con nombre, pregunta final y atenuado del fondo. */
export function useEscena<N extends string>(nombres: readonly N[], marcas: number[], estatico = false) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const M = marcador(nombres, marcas) as (n: N) => number;
  const validas = marcas.slice(0, -1).filter((m) => m < 9999);
  const ult = validas.length ? validas[validas.length - 1] : 0;
  const t = estatico ? ult + 2.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = marcas[marcas.length - 1] ?? 1e6;
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);
  return { t, fin, M, vP, fondo };
}

/* Lienzo común: degradados, entrada/salida limpias y la pregunta que atenúa todo al final. */
export const Lienzo: React.FC<{ id: string; t: number; fin: number; fondo: number; vP: number; pregunta?: string; isDark: boolean; titulo: string; children: React.ReactNode }> = ({ id, t, fin, fondo, vP, pregunta, isDark, titulo, children }) => (
  <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label={titulo}>
      <Gradientes id={id} />
      <g opacity={borde(t, fin)}>
        <g opacity={fondo}>{children}</g>
        <PanelPregunta texto={pregunta} v={vP} c={tono(isDark)} id={id} />
      </g>
    </svg>
  </AbsoluteFill>
);

/* Banda del piso del escenario. */
export const Suelo: React.FC<{ y: number; isDark: boolean; x0?: number; x1?: number; op?: number }> = ({ y, isDark, x0 = 60, x1 = 1140, op = 1 }) => (
  <rect x={x0} y={y} width={x1 - x0} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} opacity={op} />
);

/* Herramienta de cada rol, dibujada en el origen (se ubica junto a la mano). */
export const Herramienta: React.FC<{ rol: RolK; t?: number; u?: number }> = ({ rol, t = 0, u = 1 }) => {
  switch (rol) {
    case 'bdr': return (
      <g>
        <path d="M -30 -22 L -10 -28 L 10 -22 L 30 -28 V 22 L 10 28 L -10 22 L -30 28 Z" fill="#fef3c7" />
        <path d="M -10 -28 L 10 -22 V 28 L -10 22 Z" fill="#fde68a" />
        <path d="M -22 8 Q -6 -14 18 -4" stroke="#10b981" strokeWidth={4} fill="none" />
        <g transform={`translate(8 ${-10 - 3 * Math.abs(Math.sin(t * 3))})`}><path d="M 0 0 C -10 -10 -8 -22 0 -22 C 8 -22 10 -10 0 0 Z" fill={ROJO_M} /><circle cy={-15} r={3.5} fill="#fff" /></g>
      </g>
    );
    case 'lg': return (
      <g>
        <path d="M -24 -10 L 14 -26 V 26 L -24 10 Z" fill={ROSA_LG} /><rect x={-34} y={-10} width={12} height={20} rx={4} fill="#9d174d" />
        <rect x={-30} y={8} width={8} height={18} rx={3} fill="#9d174d" />
        {[0, 1, 2].map((k) => { const ph = (t * 1.2 + k / 3) % 1; return <path key={k} d={`M ${22 + ph * 26} -16 Q ${30 + ph * 30} 0 ${22 + ph * 26} 16`} stroke={ROSA_LG} strokeWidth={4} fill="none" opacity={(1 - ph) * u} strokeLinecap="round" />; })}
      </g>
    );
    case 'sdr': return (
      <g>
        <path d="M -20 -26 Q -32 0 -20 26 L -10 22 Q -16 0 -10 -22 Z" fill="#1f2937" />
        <rect x={-26} y={-34} width={20} height={14} rx={6} fill="#1f2937" /><rect x={-26} y={20} width={20} height={14} rx={6} fill="#1f2937" />
        {[0, 1].map((k) => { const ph = (t * 1.5 + k / 2) % 1; return <path key={k} d={`M ${4 + 14 * ph} -12 Q ${12 + 16 * ph} 0 ${4 + 14 * ph} 12`} stroke={AZUL_M} strokeWidth={4} fill="none" opacity={1 - ph} strokeLinecap="round" />; })}
      </g>
    );
    case 'ae': return (
      <g>
        <rect x={-24} y={-30} width={48} height={60} rx={6} fill="#ffffff" style={{ filter: 'drop-shadow(0 2px 3px rgba(15,23,42,0.35))' }} />
        {[0, 1, 2].map((k) => <rect key={k} x={-16} y={-20 + k * 11} width={k === 2 ? 20 : 32} height={5} rx={2.5} fill="#cbd5e1" />)}
        <path d={`M -14 18 q 6 -10 12 0 t 12 0`} stroke={NARANJA} strokeWidth={3} fill="none" strokeDasharray="40" strokeDashoffset={40 * (1 - u)} strokeLinecap="round" />
      </g>
    );
    case 'ps': return (
      <g transform={`rotate(${t * 40})`}>
        {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-5} y={-30} width={10} height={12} rx={2} fill={TEAL} transform={`rotate(${k * 45})`} />)}
        <circle r={22} fill={TEAL} /><circle r={9} fill="#ccfbf1" />
      </g>
    );
    case 'am': return (
      <g>
        <path d="M -20 4 H 20 L 14 30 H -14 Z" fill="#b45309" /><rect x={-22} y={0} width={44} height={8} rx={3} fill="#92400e" />
        <rect x={-2} y={-28 * u} width={4} height={28 * u + 2} fill="#15803d" />
        <ellipse cx={-10} cy={-16 * u} rx={11 * u} ry={6 * u} fill={VERDE} transform={`rotate(-30 -10 ${-16 * u})`} />
        <ellipse cx={10} cy={-24 * u} rx={11 * u} ry={6 * u} fill={VERDE} transform={`rotate(30 10 ${-24 * u})`} />
      </g>
    );
    case 'mg': return (
      <g>
        <rect x={-30} y={-24} width={60} height={46} rx={7} fill="#1f2937" />
        {[0, 1, 2, 3].map((k) => { const h = 10 + 18 * (0.5 + 0.5 * Math.sin(t * 1.4 + k * 1.3)); return <rect key={k} x={-22 + k * 12} y={14 - h} width={8} height={h} rx={2} fill={[NARANJA, AZUL_M, VERDE, ROSA][k]} />; })}
      </g>
    );
  }
};

/* Un rol del equipo: persona de su color con su herramienta y, si se pide, la sigla debajo. (x, y) son los pies. */
export const Rol: React.FC<{ id: string; rol: RolK; x: number; y: number; s?: number; t?: number; op?: number; sigla?: boolean; herramienta?: boolean; u?: number; gris?: boolean; tam?: number; flip?: boolean }> = ({ id, rol, x, y, s = 0.7, t = 0, op = 1, sigla = true, herramienta = true, u = 1, gris = false, tam = 26, flip = false }) => {
  if (op < 0.01) return null;
  const color = gris ? '#94a3b8' : ROLES[rol].color;
  return (
    <g opacity={op}>
      <Persona id={id} x={x} y={y} s={s} cuerpo={color} corbata={rol === 'ae' || rol === 'mg'} />
      {herramienta && <g transform={`translate(${x + (flip ? -1 : 1) * 64 * s} ${y - 66 * s}) scale(${s * 1.1})`}><Herramienta rol={rol} t={t} u={u} /></g>}
      {sigla && <Letrero x={x} y={y + 30} texto={ROLES[rol].sigla} fondo={color} id={id} tam={tam} />}
    </g>
  );
};

/* Ficha de cuenta (carpeta con un edificio): lo que viaja entre roles. (x, y) es el centro. */
export const Cuenta: React.FC<{ x: number; y: number; s?: number; color?: string; op?: number; rot?: number; rota?: boolean; fria?: number }> = ({ x, y, s = 1, color = NARANJA, op = 1, rot = 0, rota = false, fria = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
    <ellipse cx={0} cy={36} rx={36} ry={6} fill="#000" opacity={0.15} />
    <path d="M -40 -26 H -12 L -4 -34 H 18 L 24 -26 H 40 V 30 H -40 Z" fill={rota ? '#94a3b8' : color} />
    <rect x={-40} y={-18} width={80} height={48} rx={6} fill={rota ? '#cbd5e1' : color} />
    <rect x={-40} y={-18} width={80} height={48} rx={6} fill="#fff" opacity={0.22} />
    <rect x={-14} y={-8} width={28} height={30} rx={3} fill="#fff" opacity={0.9} />
    {[0, 1, 2].map((k) => <rect key={k} x={-9 + (k % 2) * 10} y={-3 + Math.floor(k / 2) * 10} width={6} height={6} rx={1} fill={rota ? '#94a3b8' : color} />)}
    {rota && <path d="M -30 -20 L -6 4 L -18 14 L 8 30" stroke="#64748b" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    {fria > 0.01 && <g opacity={fria}>{[[-30, -30], [30, -34], [0, -44]].map(([cx, cy], k) => <g key={k} transform={`translate(${cx} ${cy})`}>{[0, 60, 120].map((a) => <rect key={a} x={-1.5} y={-9} width={3} height={18} rx={1.5} fill="#7dd3fc" transform={`rotate(${a})`} />)}</g>)}<rect x={-40} y={-26} width={80} height={56} rx={6} fill="#bae6fd" opacity={0.45} /></g>}
  </g>
);

/* Tarjeta de texto dentro de la escena (cartel): un solo elemento con fondo, franja de color y texto. */
export const Cartel: React.FC<{ x: number; y: number; w: number; texto: string; sub?: string; color?: string; op?: number; c: ReturnType<typeof tono>; tam?: number }> = ({ x, y, w, texto, sub, color = NARANJA, op = 1, c, tam = 28 }) => {
  if (op < 0.01) return null;
  const h = sub ? 92 : 62;
  return (
    <g opacity={op} transform={`translate(${x} ${y + (1 - op) * 10})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
      <rect x={-w / 2} y={-h / 2} width={10} height={h} rx={5} fill={color} />
      <Txt f="a" x={-w / 2 + 28} y={sub ? -6 : 10} fontSize={tam} fill={c.texto}>{texto}</Txt>
      {sub && <Txt f="a" x={-w / 2 + 28} y={30} fontSize={24} peso={400} fill={c.tenue}>{sub}</Txt>}
    </g>
  );
};

/* Cifra grande que cuenta desde 0 hasta `valor`. */
export const Cifra: React.FC<{ x: number; y: number; valor: number; u: number; dec?: number; pre?: string; suf?: string; tam?: number; color: string; ancla?: 'middle' | 'start' | 'end'; miles?: boolean }> = ({ x, y, valor, u, dec = 0, pre = '', suf = '', tam = 84, color, ancla = 'middle', miles = false }) => {
  const v = valor * Math.min(1, Math.max(0, u));
  let s = v.toFixed(dec).replace('.', ',');
  if (miles) s = Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return <Txt x={x} y={y} textAnchor={ancla} fontSize={tam} fill={color} peso={800}>{pre}{s}{suf}</Txt>;
};

/* Pantalla de computador con contenido dentro (origen arriba a la izquierda, w × h). (x, y) es la base del pie. */
export const Monitor: React.FC<{ x: number; y: number; w?: number; h?: number; s?: number; children?: React.ReactNode; pantalla?: string }> = ({ x, y, w = 260, h = 160, s = 1, children, pantalla = '#0b1220' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 0 H 50 L 36 -14 H -36 Z" fill="#64748b" /><rect x={-10} y={-40} width={20} height={28} fill="#475569" />
    <rect x={-w / 2 - 12} y={-40 - h - 24} width={w + 24} height={h + 24} rx={14} fill="#334155" />
    <rect x={-w / 2} y={-40 - h - 12} width={w} height={h} rx={6} fill={pantalla} />
    <g transform={`translate(${-w / 2} ${-40 - h - 12})`}>{children}</g>
  </g>
);

/* Flecha curva de punto a punto que se dibuja con u (0 a 1). */
export const Arco: React.FC<{ x1: number; y1: number; x2: number; y2: number; u: number; color: string; alto?: number; grosor?: number; op?: number; punta?: boolean }> = ({ x1, y1, x2, y2, u, color, alto = 80, grosor = 7, op = 1, punta = true }) => {
  if (u <= 0.001) return null;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - alto;
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const largo = Math.hypot(x2 - x1, y2 - y1) + Math.abs(alto) * 1.2;
  const ang = Math.atan2(y2 - my, x2 - mx) * 180 / Math.PI;
  return (
    <g opacity={op}>
      <path d={d} stroke={color} strokeWidth={grosor} fill="none" strokeLinecap="round" strokeDasharray={largo} strokeDashoffset={largo * (1 - u)} />
      {punta && u > 0.95 && <path d={`M 0 0 L -18 -10 L -18 10 Z`} fill={color} transform={`translate(${x2} ${y2}) rotate(${ang})`} />}
    </g>
  );
};

/* Punto de un recorrido cuadrático (para que un objeto viaje sobre un Arco). */
export const enArco = (x1: number, y1: number, x2: number, y2: number, alto: number, u: number): [number, number] => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - alto;
  const a = (1 - u) * (1 - u), b = 2 * u * (1 - u), cc = u * u;
  return [a * x1 + b * mx + cc * x2, a * y1 + b * my + cc * y2];
};

/* Barra vertical con valor y rótulo: crece con u. (x, y) es el centro de la base. */
export const Barra: React.FC<{ x: number; y: number; w?: number; hMax: number; valor: number; max?: number; u: number; color: string; rotulo: string; c: ReturnType<typeof tono>; suf?: string; tam?: number; brillo?: number }> = ({ x, y, w = 110, hMax, valor, max = 100, u, color, rotulo, c, suf = ' %', tam = 26, brillo = 0 }) => {
  const h = (hMax * valor * u) / max;
  return (
    <g>
      <rect x={x - w / 2} y={y - h} width={w} height={h} rx={12} fill={color} opacity={1 - 0.05 * brillo} />
      <rect x={x - w / 2} y={y - h} width={w / 2} height={h} rx={12} fill="#fff" opacity={0.14} />
      {u > 0.05 && <Txt x={x} y={y - h - 14} textAnchor="middle" fontSize={40} fill={c.texto} peso={800}>{Math.round(valor * u)}{suf}</Txt>}
      <Txt f="a" x={x} y={y + 38} textAnchor="middle" fontSize={tam} fill={c.tenue}>{rotulo}</Txt>
    </g>
  );
};

/* Parpadeo suave (±5 %) para la parte de un gráfico de la que se habla. */
export const brillo = (t: number, activo: boolean) => (activo ? 0.5 + 0.5 * Math.sin(t * 6.3) : 0);

/* Interpolación lineal de una posición entre dos puntos. */
export const mezcla = (p: [number, number], q: [number, number], u: number): [number, number] => [lerp(p[0], q[0], u), lerp(p[1], q[1], u)];

export { ROJO_M as ROJO_EQ };
