import React from 'react';
import { useEscena as useEscenaEQ } from '../../equipos/escenas/kitEQ';
import { NARANJA, ROSA, tono, sombra, Txt, lerp, GRIS, ac, MIN_TXT, AZUL_M, VERDE, ROJO_M } from '../../es/escenas/kitES';
import { PAGINAS } from '../paginas';

/* Kit de «Feedback en equipos». Reexporta el armazón y los dibujos de Esencialismo y suma:
   - TomaFB: cambio de plano limpio (la toma que sale termina de irse antes de que entre la siguiente, con un
     leve acercamiento), para que nunca se vean dos planos encimados.
   - RotuloFB: el rótulo superior se desvanece antes de que entre el siguiente (sin cortes secos).
   - Objetos propios: escritorio, silla, cuenta de confianza, semáforo, red, interruptor, escudo, pieza de
     rompecabezas, carril, auricular, dial y mapa simple.
   Escala: la persona (s = 1) mide ~170 unidades ≈ 1,75 m. */

export * from '../../es/escenas/kitES';
export { Brazos, Gesto, Ondas, Espalda, Medidor as MedidorCE } from '../../comunicacion/escenas/comunCE';

type C = ReturnType<typeof tono>;

export function useEscenaFB(id: string, marcas: number[], estatico = false) {
  const nombres = React.useMemo(() => Object.keys(PAGINAS[id]?.anclas ?? {}), [id]);
  const r = useEscenaEQ(nombres, marcas, estatico);
  return { ...r, m: (n: string) => r.M(n), c: tono };
}

/* Toma con transición limpia: entra en [a, a + 0,55] y sale en [b − 0,5, b − 0,05]. Entre una y otra queda un
   instante vacío, así que nunca se superponen dos planos. `zi` acerca al entrar y `zo` aleja al salir. */
export const TomaFB: React.FC<{ t: number; a: number; b: number; cx?: number; cy?: number; zi?: number; zo?: number; children: React.ReactNode }> = ({ t, a, b, cx = 600, cy = 470, zi = 1.06, zo = 0.96, children }) => {
  const op = ac(t, a, a + 0.55) * (1 - ac(t, b - 0.5, b - 0.05));
  if (op <= 0.005) return null;
  const z = lerp(zi, 1, ac(t, a, a + 1)) * lerp(1, zo, ac(t, b - 0.6, b - 0.05));
  return <g opacity={op} transform={`translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})`}>{children}</g>;
};

/* Cámara dentro de una toma: acerca (z) hacia (cx, cy) de forma suave entre a y b. */
export const Camara: React.FC<{ t: number; a: number; b: number; cx: number; cy: number; z: number; children: React.ReactNode }> = ({ t, a, b, cx, cy, z, children }) => {
  const u = ac(t, a, b);
  const k = lerp(1, z, u);
  const dx = lerp(0, 600 - cx, u), dy = lerp(0, 470 - cy, u);
  return <g transform={`translate(${600 + dx} ${470 + dy}) scale(${k}) translate(${-600} ${-470})`}>{children}</g>;
};

/* Rótulo superior con relevo suave: el actual se va en los 0,3 s previos al siguiente y el nuevo entra después.
   Un rótulo que duraría menos de 1 s se omite. */
export const RotuloFB: React.FC<{ t: number; lista: [number, string][]; id: string }> = ({ t, lista, id }) => {
  const orden = [...lista].filter(([m]) => m < 9000).sort((a, b) => a[0] - b[0]);
  const util = orden.filter(([m], j) => j === orden.length - 1 || orden[j + 1][0] - m >= 1);
  let k = -1;
  util.forEach(([m], j) => { if (t >= m - 0.05) k = j; });
  if (k < 0) return null;
  const [m, txt] = util[k];
  const sig = util[k + 1]?.[0] ?? 1e9;
  const e = ac(t, m - 0.05, m + 0.4) * (1 - ac(t, sig - 0.35, sig - 0.05));
  if (e < 0.01) return null;
  return <Txt x={600} y={72} textAnchor="middle" fontSize={MIN_TXT} fill={`url(#${id}-marcaH)`} opacity={e} transform={`translate(0 ${(1 - e) * 12})`}>{txt}</Txt>;
};

/* Fundido de un elemento que ocupa un lugar entre a y b (más suave que ventana). */
export const vent = (t: number, a: number, b: number, f = 0.45) => ac(t, a, a + f) * (1 - ac(t, b - f, b));

/* Escritorio de oficina visto de frente; (x, y) es el piso al centro. */
export const Escritorio: React.FC<{ x: number; y: number; w?: number; op?: number }> = ({ x, y, w = 300, op = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <ellipse cx={0} cy={4} rx={w * 0.58} ry={10} fill="#000" opacity={0.12} />
    <rect x={-w / 2} y={-80} width={w} height={22} rx={8} fill="#a16b3f" />
    <rect x={-w / 2 + 14} y={-58} width={18} height={58} fill="#8b5a2b" /><rect x={w / 2 - 32} y={-58} width={18} height={58} fill="#8b5a2b" />
    <rect x={w / 2 - 110} y={-58} width={80} height={44} rx={4} fill="#8b5a2b" opacity={0.85} />
  </g>
);

/* Silla de oficina de perfil; (x, y) es el piso. */
export const Silla: React.FC<{ x: number; y: number; flip?: boolean; color?: string; op?: number }> = ({ x, y, flip = false, color = '#475569', op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`} opacity={op}>
    <rect x={-30} y={-62} width={60} height={12} rx={6} fill={color} />
    <rect x={18} y={-130} width={12} height={78} rx={6} fill={color} />
    <rect x={-4} y={-50} width={8} height={40} fill="#64748b" />
    <path d="M -28 0 L 28 0 L 0 -12 Z" fill="#64748b" />
  </g>
);

/* Cuenta de confianza: frasco con monedas verdes (positivas) y rojas (negativas). */
export const CuentaConfianza: React.FC<{ x: number; y: number; pos: number; neg: number; c: C; op?: number }> = ({ x, y, pos, neg, c, op = 1 }) => {
  const total = Math.max(0, Math.round(pos)) + Math.max(0, Math.round(neg));
  return op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <ellipse cx={0} cy={6} rx={110} ry={14} fill="#000" opacity={0.14} />
      <path d="M -100 0 L -100 -230 Q -100 -250 -80 -250 L 80 -250 Q 100 -250 100 -230 L 100 0 Z" fill="#bfdbfe" opacity={0.35} />
      {Array.from({ length: total }, (_, k) => {
        const roja = k >= Math.round(pos);
        const fila = Math.floor(k / 4), col = k % 4;
        return <ellipse key={k} cx={-60 + col * 40 + (fila % 2) * 12} cy={-18 - fila * 22} rx={20} ry={9} fill={roja ? ROJO_M : VERDE} style={sombra(0.15, 1, 2)} />;
      })}
      <rect x={-70} y={-268} width={140} height={20} rx={8} fill={c.apagado} />
      <rect x={-24} y={-266} width={48} height={8} rx={4} fill={c.texto} opacity={0.5} />
    </g>
  );
};

/* Semáforo de dos luces: `v` de 0 (rojo) a 1 (verde). */
export const Semaforo: React.FC<{ x: number; y: number; v: number; op?: number; s?: number }> = ({ x, y, v, op = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <rect x={-6} y={0} width={12} height={180} fill="#64748b" />
    <rect x={-46} y={-150} width={92} height={160} rx={22} fill="#1f2937" style={sombra(0.25, 3, 8)} />
    <circle cx={0} cy={-108} r={30} fill={ROJO_M} opacity={0.2 + 0.8 * (1 - v)} />
    <circle cx={0} cy={-34} r={30} fill={VERDE} opacity={0.2 + 0.8 * v} />
  </g>
);

/* Red de tenis vista de frente: separa tu lado del lado del otro. (x, y) es la base al centro. */
export const Red: React.FC<{ x: number; y: number; alto?: number; ancho?: number; op?: number }> = ({ x, y, alto = 300, ancho = 26, op = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <rect x={-6} y={-alto - 20} width={12} height={alto + 20} rx={6} fill="#64748b" />
    {Array.from({ length: Math.floor(alto / 22) }, (_, k) => <rect key={k} x={-ancho / 2} y={-alto + k * 22} width={ancho} height={3} fill="#94a3b8" opacity={0.7} />)}
    <rect x={-ancho / 2 - 4} y={-alto - 4} width={ancho + 8} height={10} rx={4} fill="#f8fafc" />
  </g>
);

/* Interruptor de un disparador: palanca que sube cuando se enciende (on de 0 a 1) y una luz. */
export const Interruptor: React.FC<{ x: number; y: number; on: number; color: string; texto: string; c: C; op?: number; tam?: number }> = ({ x, y, on, color, texto, c, op = 1, tam = 30 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <rect x={-60} y={-110} width={120} height={180} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
      <circle cx={0} cy={-80} r={16} fill={color} opacity={0.2 + 0.8 * on} />
      {on > 0.3 && <circle cx={0} cy={-80} r={16 + 14 * on} fill={color} opacity={0.18 * on} />}
      <rect x={-18} y={-50} width={36} height={90} rx={18} fill={c.apagado} />
      <circle cx={0} cy={lerp(22, -32, on)} r={22} fill={on > 0.5 ? color : c.tenue} />
      <Txt x={0} y={112} textAnchor="middle" fontSize={tam} fill={c.texto}>{texto}</Txt>
    </g>
  );

/* Escudo que levanta quien se defiende. */
export const Escudo: React.FC<{ x: number; y: number; s?: number; op?: number; color?: string }> = ({ x, y, s = 1, op = 1, color = '#64748b' }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <path d="M 0 -60 L 48 -44 Q 50 20 0 62 Q -50 20 -48 -44 Z" fill={color} style={sombra(0.22, 3, 8)} />
      <path d="M 0 -60 L 48 -44 Q 50 20 0 62 Z" fill="#000" opacity={0.12} />
      <path d="M 0 -36 L 0 40" stroke="#fff" strokeWidth={6} opacity={0.4} strokeLinecap="round" />
    </g>
  );

/* Pieza de rompecabezas (un encastre a la derecha y uno abajo). */
export const Pieza: React.FC<{ x: number; y: number; s?: number; color?: string; rot?: number; op?: number }> = ({ x, y, s = 1, color = NARANJA, rot = 0, op = 1 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
      <path d="M -40 -40 L 40 -40 L 40 -12 A 14 14 0 1 1 40 12 L 40 40 L 12 40 A 14 14 0 1 1 -12 40 L -40 40 Z" fill={color} style={sombra(0.2, 2, 5)} />
    </g>
  );

/* Auricular con micrófono (mesa de ayuda) sobre la cabeza de una Persona en (x, y, s). */
export const Auricular: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 -132 Q -30 -176 0 -176 Q 30 -176 30 -132" stroke="#1f2937" strokeWidth={6} fill="none" />
    <rect x={-38} y={-142} width={14} height={24} rx={6} fill="#1f2937" />
    <rect x={24} y={-142} width={14} height={24} rx={6} fill="#1f2937" />
    <path d="M -31 -122 Q -26 -100 -8 -102" stroke="#1f2937" strokeWidth={4} fill="none" />
    <circle cx={-8} cy={-102} r={5} fill="#1f2937" />
  </g>
);

/* Dial (perilla) con aguja de 0 a 1 y rótulo debajo. */
export const Dial: React.FC<{ x: number; y: number; v: number; texto: string; c: C; id: string; r?: number; op?: number; tam?: number; color?: string }> = ({ x, y, v, texto, c, id, r = 70, op = 1, tam = 30, color }) => {
  const a = Math.PI * (1 - Math.max(0, Math.min(1, v)));
  return op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <path d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`} stroke={c.apagado} strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${Math.cos(a) * r} ${-Math.sin(a) * r}`} stroke={color ?? `url(#${id}-marcaH)`} strokeWidth={18} fill="none" strokeLinecap="round" />
      <line x1={0} y1={0} x2={Math.cos(a) * (r - 22)} y2={-Math.sin(a) * (r - 22)} stroke={c.texto} strokeWidth={6} strokeLinecap="round" />
      <circle r={9} fill={c.texto} />
      <Txt x={0} y={48} textAnchor="middle" fontSize={tam} fill={c.texto}>{texto}</Txt>
    </g>
  );
};

/* Píldora de texto alineada a la izquierda, con un punto de color (paso de una lista). */
export const Paso: React.FC<{ x: number; y: number; texto: string; color?: string; c: C; op?: number; hecho?: number; tam?: number; w?: number }> = ({ x, y, texto, color = NARANJA, c, op = 1, hecho = 0, tam = 30, w = 520 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x + (1 - op) * -16} ${y})`} opacity={op}>
      <rect x={0} y={-30} width={w} height={60} rx={30} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
      <circle cx={30} cy={0} r={16} fill={color} />
      {hecho > 0.05 && <path d="M 22 0 L 28 7 L 39 -7" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeDasharray={30} strokeDashoffset={30 * (1 - hecho)} />}
      <Txt x={60} y={tam * 0.36} fontSize={tam} fill={c.texto}>{texto}</Txt>
    </g>
  );

/* Línea de pulso (electrocardiograma) que se acelera con `v` de 0 a 1. */
export const Pulso: React.FC<{ x: number; y: number; w: number; t: number; v: number; color?: string; op?: number }> = ({ x, y, w, t, v, color = ROJO_M, op = 1 }) => {
  let d = `M ${x} ${y}`;
  const per = lerp(140, 60, v), amp = lerp(30, 70, v);
  for (let i = 0; i <= w; i += 4) {
    const fase = ((i + t * 120 * (1 + v)) % per) / per;
    const yy = fase > 0.4 && fase < 0.46 ? -amp : fase >= 0.46 && fase < 0.52 ? amp * 0.5 : 0;
    d += ` L ${x + i} ${y + yy}`;
  }
  return <path d={d} stroke={color} strokeWidth={5} fill="none" opacity={op} strokeLinejoin="round" />;
};

export { NARANJA, ROSA, GRIS, AZUL_M, VERDE, ROJO_M };
