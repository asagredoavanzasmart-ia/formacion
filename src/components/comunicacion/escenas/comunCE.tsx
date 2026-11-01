import React from 'react';
import { NARANJA, ROSA, Txt, ac, pop, sombra, PisoTexto } from '../../remotion/comun';
import type { Tono } from '../../proteccion/escenas/comunPD';

/* Piezas compartidas por las escenas de «Comunicación efectiva» (dibujos SVG propios). */
export { Rotulo, PanelPregunta, ventana, lerp, escribe, Insignia, Hoja, Institucion, Oficinas, Reloj, Visto, Cruz, ESCUDO } from '../../proteccion/escenas/comunPD';
export type { Tono } from '../../proteccion/escenas/comunPD';

export const W = 1200, H = 860;

/* Tamaño de las etiquetas dentro de la escena en PC (el rótulo superior y la pregunta usan 44, así hay
   jerarquía). En pantallas angostas el piso de PisoTexto lo sube hasta 13 px reales. */
export const MIN_TXT = 28;

/* Tamaño efectivo de un texto: el de diseño o el piso de la pantalla angosta, el que sea mayor.
   Sirve para dimensionar cajas (chips, burbujas) que deben contener el texto en PC y en móvil. */
export const useTam = (tam: number) => Math.max(tam, React.useContext(PisoTexto));

/* Props de toda escena de la clase. */
export type PropsCE = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

/* Entrada y salida limpias de la escena completa: aparece en los primeros 0,35 s y se apaga en los
   últimos 0,5 s del tramo, así al cambiar de página no queda ningún elemento a medio animar. */
export const borde = (t: number, fin: number) => ac(t, 0, 0.35) * (1 - ac(t, fin - 0.55, fin - 0.08));

/* Lista de marcas con nombre: M('x') devuelve el segundo de la marca, o un valor lejano si falta. */
export const marcador = <N extends string>(nombres: readonly N[], marcas: number[]) => (n: N) => marcas[nombres.indexOf(n)] ?? 1e6;

/* Gesto sobre la cabeza de una Persona (x, y, s iguales a los de la Persona): cejas y boca.
   `animo` va de −1 (enojo) a 1 (alegría); 0 es neutro. */
export const Gesto: React.FC<{ x: number; y: number; s?: number; animo: number }> = ({ x, y, s = 1, animo }) => {
  const a = Math.max(-1, Math.min(1, animo));
  const ceja = -a * 9;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`M -19 ${-144 - ceja * 0.2} L -5 ${-142 + ceja}`} stroke="#3b2a20" strokeWidth={3.5} strokeLinecap="round" />
      <path d={`M 19 ${-144 - ceja * 0.2} L 5 ${-142 + ceja}`} stroke="#3b2a20" strokeWidth={3.5} strokeLinecap="round" />
      <path d={`M -11 -118 Q 0 ${-118 + a * 9} 11 -118`} stroke="#8a3b2a" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      {a < -0.3 && <circle cx={0} cy={-134} r={31} fill={ROSA} opacity={(-a - 0.3) * 0.35} />}
    </g>
  );
};

/* Cara suelta (círculo) con expresión: ojos, cejas y boca configurables. */
export const Cara: React.FC<{ x: number; y: number; r?: number; id: string; ojos?: number; cejas?: number; boca?: number; abierta?: number; asco?: boolean }> = ({ x, y, r = 60, id, ojos = 1, cejas = 0, boca = 0, abierta = 0, asco = false }) => {
  const k = r / 60;
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <ellipse cx={0} cy={66} rx={46} ry={8} fill="#000" opacity={0.12} />
      <circle r={60} fill={`url(#${id}-cara)`} />
      <ellipse cx={-21} cy={-8} rx={6} ry={6 * ojos} fill="#3b2a20" />
      <ellipse cx={21} cy={-8} rx={6} ry={6 * ojos} fill="#3b2a20" />
      <path d={`M -32 ${-28 - cejas * 4} L -12 ${-26 + cejas * 6}`} stroke="#3b2a20" strokeWidth={5} strokeLinecap="round" />
      <path d={`M 32 ${-28 - cejas * 4} L 12 ${-26 + cejas * 6}`} stroke="#3b2a20" strokeWidth={5} strokeLinecap="round" />
      {abierta > 0.05
        ? <ellipse cx={0} cy={28} rx={10 + 6 * abierta} ry={12 * abierta} fill="#6b2a20" />
        : asco
          ? <path d="M -20 30 Q -10 22 0 30 Q 10 38 20 28" stroke="#8a3b2a" strokeWidth={5} fill="none" strokeLinecap="round" />
          : <path d={`M -20 28 Q 0 ${28 + boca * 16} 20 28`} stroke="#8a3b2a" strokeWidth={5} fill="none" strokeLinecap="round" />}
    </g>
  );
};

/* Burbuja de diálogo con el texto escribiéndose (u de 0 a 1). (x, y) es la punta de la cola. */
export const Burbuja: React.FC<{ x: number; y: number; w: number; texto: string; u: number; c: Tono; lado?: 'izq' | 'der'; marca?: boolean; id: string; tam?: number }> = ({ x, y, w, texto, u, c, lado = 'izq', marca = false, id, tam: tamDiseno = MIN_TXT }) => {
  const tam = useTam(tamDiseno);
  const lineas: string[] = []; let l = '';
  // Arimo en negrita mide ~0,58 del tamaño por letra: se usa 0,6 y se descuenta el margen interno (26 por lado).
  const porLinea = Math.max(6, Math.floor((w - 52) / (tam * 0.6)));
  for (const p of texto.split(' ')) { if ((l + ' ' + p).trim().length > porLinea) { lineas.push(l.trim()); l = p; } else l += ' ' + p; }
  if (l.trim()) lineas.push(l.trim());
  const h = 46 + lineas.length * tam * 1.2;
  const x0 = lado === 'izq' ? x - 40 : x - w + 40;
  const y0 = y - 26 - h;
  const total = lineas.join(' ').length;
  let resto = Math.floor(total * Math.min(1, u));
  return (
    <g style={sombra(c.sombra, 4, 10)}>
      <rect x={x0} y={y0} width={w} height={h} rx={26} fill={marca ? `url(#${id}-marca)` : c.panel} />
      <path d={`M ${x - 18} ${y0 + h - 2} L ${x} ${y} L ${x + 18} ${y0 + h - 2} Z`} fill={marca ? (lado === 'izq' ? NARANJA : ROSA) : c.panel} />
      {lineas.map((ln, j) => {
        const vis = ln.slice(0, Math.max(0, resto)); resto -= ln.length + 1;
        return <Txt key={j} f="a" x={x0 + 26} y={y0 + 22 + (j + 0.85) * tam * 1.2} fontSize={tam} fill={marca ? '#fff' : c.texto}>{vis}</Txt>;
      })}
    </g>
  );
};

/* Ondas que viajan de (x1, y1) a (x2, y2): arcos que se desplazan, como sonido o escucha. */
export const Ondas: React.FC<{ x1: number; y1: number; x2: number; y2: number; t: number; color: string; op?: number; n?: number }> = ({ x1, y1, x2, y2, t, color, op = 1, n = 4 }) => {
  const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const d = Math.hypot(x2 - x1, y2 - y1);
  return (
    <g transform={`translate(${x1} ${y1}) rotate(${ang})`} opacity={op}>
      {Array.from({ length: n }, (_, k) => {
        const u = (t * 0.6 + k / n) % 1;
        const r = 26 + 10 * Math.sin(Math.PI * u);
        return <path key={k} d={`M ${u * d} ${-r} Q ${u * d + r * 0.7} 0 ${u * d} ${r}`} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" opacity={Math.sin(Math.PI * u)} />;
      })}
    </g>
  );
};

/* Mesa de reunión en volumen (tablero y frente), centrada en (x, y). */
export const Mesa: React.FC<{ x: number; y: number; w?: number; c: Tono }> = ({ x, y, w = 420, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={86} rx={w * 0.55} ry={18} fill="#000" opacity={0.12} />
    <path d={`M ${-w / 2} 0 L ${-w / 2 + 40} -40 L ${w / 2 + 40} -40 L ${w / 2} 0 Z`} fill={c.panel} />
    <rect x={-w / 2} y={0} width={w} height={22} fill={c.apagado} />
    <rect x={-w / 2 + 20} y={22} width={18} height={62} fill={c.apagado} />
    <rect x={w / 2 - 38} y={22} width={18} height={62} fill={c.apagado} />
  </g>
);

/* Mesa de restaurante en perspectiva (tablero, canto, costado y cuatro patas). (x0, x1) es el canto
   delantero a la altura y; el fondo se corre (dx, −dy). Se dibuja DESPUÉS de las personas sentadas,
   así el tablero tapa la parte baja de sus cuerpos. */
export const MesaRestaurante: React.FC<{ x0: number; x1: number; y: number; c: Tono; dx?: number; dy?: number; alto?: number }> = ({ x0, x1, y, c, dx = 40, dy = 46, alto = 150 }) => (
  <g>
    <ellipse cx={(x0 + x1) / 2 + dx / 2} cy={y + alto + 14} rx={(x1 - x0) * 0.56} ry={22} fill="#000" opacity={0.12} />
    {/* patas traseras */}
    <rect x={x0 + dx + 14} y={y - dy + 10} width={16} height={alto} rx={5} fill={c.apagado} />
    <rect x={x1 + dx - 30} y={y - dy + 10} width={16} height={alto} rx={5} fill={c.apagado} />
    {/* tablero */}
    <path d={`M ${x0} ${y} L ${x1} ${y} L ${x1 + dx} ${y - dy} L ${x0 + dx} ${y - dy} Z`} fill={c.panel} style={sombra(c.sombra, 6, 14)} />
    <path d={`M ${x0 + 18} ${y - 8} L ${x1 - 10} ${y - 8}`} stroke="#fff" strokeWidth={3} opacity={0.35} strokeLinecap="round" />
    {/* canto delantero y costado */}
    <rect x={x0} y={y} width={x1 - x0} height={22} fill={c.apagado} />
    <path d={`M ${x1} ${y} L ${x1 + dx} ${y - dy} L ${x1 + dx} ${y - dy + 22} L ${x1} ${y + 22} Z`} fill={c.tenue} opacity={0.75} />
    {/* patas delanteras */}
    <rect x={x0 + 16} y={y + 22} width={20} height={alto - 6} rx={6} fill={c.tenue} />
    <rect x={x1 - 36} y={y + 22} width={20} height={alto - 6} rx={6} fill={c.tenue} />
  </g>
);

/* Plato con borde y comida con volumen. `comida`: 'carne' (con verduras) o 'pasta'. */
export const Plato: React.FC<{ x: number; y: number; c: Tono; comida?: 'carne' | 'pasta' | 'nada'; s?: number }> = ({ x, y, c, comida = 'nada', s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={66} ry={19} fill="#000" opacity={0.12} />
    <ellipse cx={0} cy={0} rx={64} ry={18} fill={c.blanco} />
    <ellipse cx={0} cy={0} rx={46} ry={12} fill={c.panel2} />
    {comida === 'carne' && <g>
      <ellipse cx={-8} cy={-4} rx={28} ry={10} fill="#7a3a22" />
      <ellipse cx={-8} cy={-7} rx={26} ry={8} fill="#a5532f" />
      <path d="M -24 -8 L 6 -8" stroke="#7a3a22" strokeWidth={2} opacity={0.6} />
      <circle cx={24} cy={-4} r={7} fill="#15803d" /><circle cx={30} cy={-8} r={6} fill="#22c55e" /><circle cx={20} cy={-10} r={5} fill="#16a34a" />
    </g>}
    {comida === 'pasta' && <g>
      <ellipse cx={0} cy={-5} rx={28} ry={10} fill="#d99a2b" />
      <ellipse cx={0} cy={-8} rx={24} ry={7} fill="#f2c14e" />
      <circle cx={-6} cy={-10} r={4} fill="#ef4444" /><circle cx={8} cy={-9} r={3.5} fill="#ef4444" />
    </g>}
  </g>
);

/* Copa de cristal con algo de líquido. */
export const Copa: React.FC<{ x: number; y: number; c: Tono }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={2} rx={16} ry={5} fill="#000" opacity={0.12} />
    <ellipse cx={0} cy={0} rx={14} ry={4} fill={c.apagado} />
    <rect x={-2.5} y={-30} width={5} height={30} fill={c.apagado} />
    <path d="M -18 -66 Q -18 -32 0 -30 Q 18 -32 18 -66 Z" fill="#bfdbfe" opacity={0.55} />
    <path d="M -15 -50 Q -12 -33 0 -32 Q 12 -33 15 -50 Z" fill="#b91c1c" opacity={0.65} />
    <path d="M -12 -62 Q -12 -46 -6 -40" stroke="#fff" strokeWidth={3} fill="none" opacity={0.7} strokeLinecap="round" />
  </g>
);

/* Lente redonda con mango: `vista` es lo que se dibuja dentro (recortado al círculo). */
export const Lupa: React.FC<{ x: number; y: number; r: number; c: Tono; id: string; clip: string; children?: React.ReactNode; rot?: number }> = ({ x, y, r, c, id, clip, children, rot = 40 }) => (
  <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={clip}><circle r={r} /></clipPath></defs>
    <g transform={`rotate(${rot})`}><rect x={r - 6} y={-11} width={r * 0.9} height={22} rx={11} fill={c.tenue} /></g>
    <circle r={r} fill={c.panel2} opacity={0.6} />
    <g clipPath={`url(#${clip})`}>{children}</g>
    <circle r={r} fill="none" stroke={`url(#${id}-marca)`} strokeWidth={12} />
    <path d={`M ${-r * 0.55} ${-r * 0.45} Q ${-r * 0.35} ${-r * 0.75} ${-r * 0.05} ${-r * 0.78}`} stroke="#fff" strokeWidth={6} fill="none" opacity={0.5} strokeLinecap="round" />
  </g>
);

/* Estrella de cinco puntas (logro, brillo). */
export const Estrella: React.FC<{ x: number; y: number; r: number; fill: string; rot?: number; op?: number }> = ({ x, y, r, fill, rot = 0, op = 1 }) => {
  const pts = Array.from({ length: 10 }, (_, k) => { const a = (Math.PI / 5) * k - Math.PI / 2; const rr = k % 2 ? r * 0.45 : r; return `${Math.cos(a) * rr},${Math.sin(a) * rr}`; }).join(' ');
  return <polygon points={pts} fill={fill} transform={`translate(${x} ${y}) rotate(${rot})`} opacity={op} />;
};

/* Medidor semicircular: aguja de 0 a 1 con etiqueta debajo. */
export const Medidor: React.FC<{ x: number; y: number; r?: number; v: number; c: Tono; id: string; etiqueta: string; tono?: string }> = ({ x, y, r = 110, v, c, id, etiqueta, tono }) => {
  const a = Math.PI * (1 - Math.max(0, Math.min(1, v)));
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`} stroke={c.apagado} strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${Math.cos(a) * r} ${-Math.sin(a) * r}`} stroke={tono ?? `url(#${id}-marcaH)`} strokeWidth={26} fill="none" strokeLinecap="round" />
      <line x1={0} y1={0} x2={Math.cos(a) * (r - 30)} y2={-Math.sin(a) * (r - 30)} stroke={c.texto} strokeWidth={8} strokeLinecap="round" />
      <circle r={12} fill={c.texto} />
      <Txt f="a" x={0} y={62} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{etiqueta}</Txt>
    </g>
  );
};

/* Etiqueta de texto centrada que entra con un leve salto (op de 0 a 1). */
export const Etiqueta: React.FC<{ x: number; y: number; texto: string; op: number; c: Tono; marca?: boolean; id: string; ancla?: 'middle' | 'start' | 'end' }> = ({ x, y, texto, op, c, marca = false, id, ancla = 'middle' }) =>
  op > 0.01 ? <Txt f="a" x={x} y={y + (1 - op) * 10} textAnchor={ancla} fontSize={MIN_TXT} fill={marca ? `url(#${id}-marcaH)` : c.texto} opacity={op}>{texto}</Txt> : null;

/* Brazos para una Persona (mismos x, y, s): ángulos en grados, 0 = colgando, 90 = horizontal hacia afuera,
   150 = arriba. Se dibujan detrás del cuerpo si `atras`, si no delante. */
export const Brazos: React.FC<{ x: number; y: number; s?: number; izq: number; der: number; color?: string; id: string }> = ({ x, y, s = 1, izq, der, color, id }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(-34 -92) rotate(${izq})`}><rect x={-10} y={-4} width={20} height={70} rx={10} fill={color ?? `url(#${id}-marca)`} /><circle cx={0} cy={68} r={10} fill={`url(#${id}-cara)`} /></g>
    <g transform={`translate(34 -92) rotate(${-der})`}><rect x={-10} y={-4} width={20} height={70} rx={10} fill={color ?? `url(#${id}-marca)`} /><path d="M 10 -4 V 60 H 0 Z" fill="#000" opacity={0.1} /><circle cx={0} cy={68} r={10} fill={`url(#${id}-cara)`} /></g>
  </g>
);

/* Cabeza y hombros de alguien del público, visto de espaldas. */
export const Espalda: React.FC<{ x: number; y: number; s?: number; pelo?: string; cuerpo?: string; c: Tono }> = ({ x, y, s = 1, pelo = '#2b1a12', cuerpo, c }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -44 40 Q -44 4 0 4 Q 44 4 44 40 Z" fill={cuerpo ?? c.tenue} />
    <circle cx={0} cy={-22} r={26} fill="#e2a37c" />
    <path d="M -27 -18 Q -30 -52 0 -50 Q 30 -52 27 -18 Q 14 -8 0 -8 Q -14 -8 -27 -18 Z" fill={pelo} />
  </g>
);

/* Píldora con texto; su ancho se calcula con el tamaño efectivo del texto. */
export const Chip: React.FC<{ x: number; y: number; texto: string; c: Tono; id: string; op: number; marca?: boolean; cae?: boolean }> = ({ x, y, texto, c, id, op, marca = false, cae = false }) => {
  const tam = useTam(MIN_TXT);
  if (op < 0.01) return null;
  const w = texto.length * tam * 0.6 + tam * 1.6, h = tam * 1.7;
  return (
    <g opacity={op} transform={`translate(${x} ${y - (cae ? (1 - op) * 40 : 0)}) scale(${cae ? 1 : 0.85 + 0.15 * op})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={marca ? `url(#${id}-marca)` : c.panel2} style={sombra(c.sombra, 3, 8)} />
      <Txt f="a" x={0} y={tam * 0.36} textAnchor="middle" fontSize={MIN_TXT} fill={marca ? '#fff' : c.texto}>{texto}</Txt>
    </g>
  );
};

/* Entrada con rebote recortada a 1 (útil para opacidad y escala). */
export const e1 = (t: number, t0: number, d = 0.5) => Math.min(1, pop(t, t0, d));
