import React from 'react';
import { NARANJA, ROSA, Persona, Txt as TxtBase, sombra, tono, PisoTexto } from '../../remotion/comun';
import { Letrero as LetreroBase } from '../../lean/escenas/kitLS';
import { useTam } from '../../comunicacion/escenas/comunCE';
import { lerp, AZUL_M, VERDE, VIOLETA, TEAL } from '../../lean/escenas/comunLS';

/* Kit de «RevOps»: los tres equipos que tocan al cliente (marketing, ventas, servicio) y quien opera
   los ingresos, el núcleo de datos que comparten, la rueda del flywheel, el lead que viaja y el CRM.
   Reexporta el armazón de escenas de Equipos de ventas. Sólidos rellenos, sin contornos. */

export { Lienzo, useEscena, Suelo, Cuenta, Cartel, Cifra, Monitor, Arco, enArco, Barra, brillo, mezcla, Rol, PIZARRA, AMBAR, ROSA_LG } from '../../equipos/escenas/kitEQ';
export { Toma, Apoyo, Piso, Hoja, Reloj, Visto, Cruz, Flujo, Corazon, Moneda3D, PilaMonedas, Portatil, sm, cl, azar } from '../../lean/escenas/kitLS';
export { Engranaje, Bombilla, Calendario, Rotulo, W, H, MIN_TXT, lerp, escribe, e1, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, Edificio, Flecha, Curva, Burbuja, Chip } from '../../lean/escenas/comunLS';
export type { PropsCE } from '../../lean/escenas/comunLS';
export { NARANJA, ROSA, Persona, sombra, tono };
export { ac } from '../../remotion/comun';

/* Letrero que se corre lo necesario para no salirse del lienzo (en móvil el texto crece por el piso de 13 px). */
export const Letrero: React.FC<React.ComponentProps<typeof LetreroBase>> = (p) => {
  const t2 = useTam(p.tam ?? 28);
  const w = p.texto.length * t2 * 0.56 + t2 * 1.2;
  const anc = p.ancla ?? 'middle';
  const x0 = anc === 'middle' ? p.x - w / 2 : anc === 'start' ? p.x : p.x - w;
  const dx = Math.max(0, 24 - x0) - Math.max(0, x0 + w - 1176);
  return <LetreroBase {...p} x={p.x + dx} />;
};

/* Txt de las escenas: en móvil (piso de 13 px) los textos secundarios chicos se ocultan para que nada se monte. */
type TxtP = React.ComponentProps<typeof TxtBase>;
export const Txt: React.FC<TxtP> = (p) => {
  const piso = React.useContext(PisoTexto);
  if (piso > 0 && p.f === 'a' && typeof p.fontSize === 'number' && p.fontSize <= 22) return null;
  return <TxtBase {...p} />;
};

/* true cuando la escena se ve angosta (móvil): el texto sube a 13 px y conviene mostrar menos detalle. */
export const useMovil = () => React.useContext(PisoTexto) > 0;

export type EquipoK = 'mkt' | 'ven' | 'ser' | 'ops';
export const EQUIPOS: Record<EquipoK, { nombre: string; color: string }> = {
  mkt: { nombre: 'Marketing', color: '#f59e0b' },
  ven: { nombre: 'Ventas', color: NARANJA },
  ser: { nombre: 'Servicio', color: TEAL },
  ops: { nombre: 'RevOps', color: VIOLETA },
};

/* Objeto que distingue a cada equipo, dibujado en el origen (junto a la mano). */
export const Distintivo: React.FC<{ k: EquipoK; t?: number }> = ({ k, t = 0 }) => {
  if (k === 'mkt') return (
    <g>
      <path d="M -24 -10 L 14 -26 V 26 L -24 10 Z" fill="#f59e0b" /><rect x={-34} y={-10} width={12} height={20} rx={4} fill="#b45309" />
      <rect x={-30} y={8} width={8} height={18} rx={3} fill="#b45309" />
      {[0, 1, 2].map((j) => { const ph = (t * 1.2 + j / 3) % 1; return <path key={j} d={`M ${22 + ph * 26} -16 Q ${30 + ph * 30} 0 ${22 + ph * 26} 16`} stroke="#f59e0b" strokeWidth={4} fill="none" opacity={1 - ph} strokeLinecap="round" />; })}
    </g>
  );
  if (k === 'ven') return (
    <g>
      <rect x={-26} y={-20} width={52} height={40} rx={8} fill="#7c2d12" /><rect x={-26} y={-20} width={52} height={14} rx={7} fill="#9a3412" />
      <rect x={-9} y={-30} width={18} height={12} rx={4} fill="none" stroke="#7c2d12" strokeWidth={4} /><rect x={-5} y={-4} width={10} height={8} rx={2} fill="#fde68a" />
    </g>
  );
  if (k === 'ser') {
    const s = 1 + 0.08 * Math.sin(t * 5);
    return <g transform={`scale(${s})`}><path d="M 0 22 C -38 -4 -20 -38 0 -14 C 20 -38 38 -4 0 22 Z" fill={ROSA} /><ellipse cx={-12} cy={-12} rx={5} ry={8} fill="#fff" opacity={0.35} transform="rotate(-30 -12 -12)" /></g>;
  }
  return (
    <g transform={`rotate(${t * 30})`}>
      {Array.from({ length: 8 }, (_, j) => <rect key={j} x={-5} y={-30} width={10} height={12} rx={2} fill={VIOLETA} transform={`rotate(${j * 45})`} />)}
      <circle r={22} fill={VIOLETA} /><circle r={9} fill="#ede9fe" />
    </g>
  );
};

/* Un equipo como persona de su color con su distintivo y, si se pide, el nombre debajo. (x, y) son los pies. */
export const Equipo: React.FC<{ id: string; k: EquipoK; x: number; y: number; s?: number; t?: number; op?: number; nombre?: boolean | string; distintivo?: boolean; gris?: boolean; tam?: number; flip?: boolean }> = ({ id, k, x, y, s = 0.7, t = 0, op = 1, nombre = true, distintivo = true, gris = false, tam = 26, flip = false }) => {
  if (op < 0.01) return null;
  const color = gris ? '#94a3b8' : EQUIPOS[k].color;
  return (
    <g opacity={op}>
      <Persona id={id} x={x} y={y} s={s} cuerpo={color} corbata={k === 'ven'} pelo={k === 'ser' ? '#4a2c1a' : k === 'mkt' ? '#3b2a20' : '#1f140d'} />
      {distintivo && <g transform={`translate(${x + (flip ? -1 : 1) * 64 * s} ${y - 66 * s}) scale(${s * 1.1})`}><Distintivo k={k} t={t} /></g>}
      {nombre && <Letrero x={x} y={y + 30} texto={typeof nombre === 'string' ? nombre : EQUIPOS[k].nombre} fondo={color} id={id} tam={tam} />}
    </g>
  );
};

/* Núcleo de datos compartidos: esfera con anillos que laten. `pulso` (0 a 1) la agranda. (x, y) es el centro. */
export const Nucleo: React.FC<{ x: number; y: number; r?: number; t: number; id: string; pulso?: number; op?: number; color?: string }> = ({ x, y, r = 60, t, id, pulso = 0, op = 1, color }) => {
  const rr = r * (1 + 0.25 * pulso);
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      {[0, 1, 2].map((j) => { const ph = (t * 0.5 + j / 3) % 1; return <circle key={j} r={rr * (1 + ph * 0.9)} fill="none" stroke={color ?? NARANJA} strokeWidth={4} opacity={(1 - ph) * 0.45} />; })}
      <circle r={rr} fill={color ?? `url(#${id}-marca)`} style={sombra(0.25, 6, 14)} />
      <ellipse cx={-rr * 0.32} cy={-rr * 0.36} rx={rr * 0.28} ry={rr * 0.18} fill="#fff" opacity={0.4} transform={`rotate(-30 ${-rr * 0.32} ${-rr * 0.36})`} />
      {[0, 1, 2].map((j) => <rect key={j} x={-rr * 0.42} y={-rr * 0.32 + j * rr * 0.26} width={rr * 0.84} height={rr * 0.14} rx={rr * 0.07} fill="#fff" opacity={0.75} />)}
    </g>
  );
};

/* Rueda del flywheel: tres sectores (Atraer, Interactuar, Deleitar) que giran alrededor del cliente.
   `giro` es el ángulo en grados; `activo` resalta un sector; `rotulos` escribe los nombres dentro. */
export const SECTORES = [
  { n: 'Atraer', color: '#f59e0b' },
  { n: 'Interactuar', color: NARANJA },
  { n: 'Deleitar', color: ROSA },
];
export const Rueda: React.FC<{ x: number; y: number; r?: number; giro: number; id: string; activo?: number; rotulos?: boolean; op?: number; gris?: boolean; centro?: string; isDark?: boolean }> = ({ x, y, r = 200, giro, id, activo = -1, rotulos = true, op = 1, gris = false, centro = 'Cliente', isDark = false }) => {
  const ri = r * 0.42;
  const P = (a: number, rad: number): [number, number] => [rad * Math.cos(a), rad * Math.sin(a)];
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <circle r={r + 12} fill="#000" opacity={0.08} cy={10} />
      <g transform={`rotate(${giro})`}>
        {SECTORES.map((s, k) => {
          const a0 = -Math.PI / 2 + (k * 2 * Math.PI) / 3 + 0.03, a1 = a0 + (2 * Math.PI) / 3 - 0.06;
          const [x0, y0] = P(a0, r), [x1, y1] = P(a1, r), [x2, y2] = P(a1, ri), [x3, y3] = P(a0, ri);
          const on = activo === k;
          return <path key={s.n} d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} L ${x2} ${y2} A ${ri} ${ri} 0 0 0 ${x3} ${y3} Z`} fill={gris ? '#94a3b8' : s.color} opacity={activo >= 0 && !on ? 0.45 : 1} />;
        })}
        {rotulos && SECTORES.map((s, k) => {
          const a = -Math.PI / 2 + (k * 2 * Math.PI) / 3 + Math.PI / 3;
          const [tx, ty] = P(a, (r + ri) / 2);
          return <g key={s.n} transform={`translate(${tx} ${ty}) rotate(${-giro})`}><TxtBase f="a" x={0} y={9} textAnchor="middle" fontSize={r > 170 ? 26 : 22} fill="#fff" peso={700}>{s.n}</TxtBase></g>;
        })}
      </g>
      <circle r={ri - 8} fill={isDark ? '#1f2937' : '#ffffff'} style={sombra(0.18, 3, 8)} />
      {centro && <TxtBase f="a" x={0} y={9} textAnchor="middle" fontSize={24} fill={isDark ? '#e5e7eb' : '#374151'} peso={700}>{centro}</TxtBase>}
      {!rotulos && <circle r={0} fill={`url(#${id}-marca)`} />}
    </g>
  );
};

/* Lead: sobre con una persona dentro; `calor` (0 a 1) lo tiñe de naranja. (x, y) es el centro. */
export const Lead: React.FC<{ x: number; y: number; s?: number; op?: number; color?: string; rot?: number }> = ({ x, y, s = 1, op = 1, color = NARANJA, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
    <ellipse cx={0} cy={30} rx={30} ry={5} fill="#000" opacity={0.14} />
    <rect x={-32} y={-22} width={64} height={44} rx={8} fill={color} />
    <path d="M -32 -18 L 0 6 L 32 -18" fill="none" stroke="#fff" strokeWidth={4} strokeLinejoin="round" opacity={0.8} />
    <circle cx={0} cy={-34} r={9} fill="#fff" /><path d="M -14 -14 Q 0 -30 14 -14 Z" fill="#fff" />
  </g>
);

/* Embudo de franjas que se angostan. (x, y) es el borde superior al centro; w el ancho arriba. */
export const Embudo: React.FC<{ x: number; y: number; w?: number; franjas: { n: string; color: string }[]; alto?: number; op?: number; tam?: number }> = ({ x, y, w = 520, franjas, alto = 78, op = 1, tam = 24 }) => (
  <g opacity={op}>
    {franjas.map((f, k) => {
      const w0 = w * (1 - k * 0.15), w1 = w * (1 - (k + 1) * 0.15), y0 = y + k * (alto + 6);
      return (
        <g key={f.n}>
          <path d={`M ${x - w0 / 2} ${y0} H ${x + w0 / 2} L ${x + w1 / 2} ${y0 + alto} H ${x - w1 / 2} Z`} fill={f.color} />
          <TxtBase f="a" x={x} y={y0 + alto / 2 + 9} textAnchor="middle" fontSize={tam} fill="#fff" peso={700}>{f.n}</TxtBase>
        </g>
      );
    })}
  </g>
);

/* Plataforma isométrica (bloque) con su cara superior, para etapas y pilares. (x, y) es el centro de la cara superior. */
export const Bloque: React.FC<{ x: number; y: number; w?: number; h?: number; color: string; op?: number; alto?: number }> = ({ x, y, w = 160, h = 40, color, op = 1, alto = 0 }) => (
  <g opacity={op} transform={`translate(${x} ${y - alto})`}>
    <path d={`M ${-w / 2} 0 L 0 ${h / 2} L ${w / 2} 0 V ${h * 0.9 + alto} L 0 ${h * 1.4 + alto} L ${-w / 2} ${h * 0.9 + alto} Z`} fill={color} />
    <path d={`M 0 ${h / 2} L ${w / 2} 0 V ${h * 0.9 + alto} L 0 ${h * 1.4 + alto} Z`} fill="#000" opacity={0.18} />
    <path d={`M ${-w / 2} 0 L 0 ${-h / 2} L ${w / 2} 0 L 0 ${h / 2} Z`} fill={color} />
    <path d={`M ${-w / 2} 0 L 0 ${-h / 2} L ${w / 2} 0 L 0 ${h / 2} Z`} fill="#fff" opacity={0.25} />
  </g>
);

/* Tabla simple dentro de la escena: filas de celdas con texto. */
export const Tabla: React.FC<{ x: number; y: number; cols: number[]; filas: string[][]; alto?: number; c: ReturnType<typeof tono>; cabecera?: string; op?: number; resaltar?: number; tam?: number; soloMovil?: number[] }> = ({ x, y, cols: cols0, filas: filas0, alto = 56, c, cabecera = NARANJA, op = 1, resaltar = -1, tam = 22, soloMovil }) => {
  // En móvil, si se indica, solo algunas columnas, repartidas en el mismo ancho.
  const movil = useMovil();
  const total = cols0.reduce((a, b) => a + b, 0);
  const sel = movil && soloMovil ? soloMovil : cols0.map((_, j) => j);
  const suma = sel.reduce((a, j) => a + cols0[j], 0);
  const cols = sel.map((j) => (cols0[j] * total) / suma);
  const filas = filas0.map((f) => sel.map((j) => f[j]));
  return (
    <g opacity={op} transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={total} height={alto * filas.length} rx={16} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
      {filas.map((f, i) => {
        let cx = 0;
        return (
          <g key={i}>
            {i === 0 && <rect x={0} y={0} width={total} height={alto} rx={16} fill={cabecera} />}
            {i === resaltar && <rect x={4} y={i * alto + 4} width={total - 8} height={alto - 8} rx={12} fill={NARANJA} opacity={0.16} />}
            {f.map((txt, j) => { const x0 = cx; cx += cols[j]; return <TxtBase key={j} f="a" x={x0 + 16} y={i * alto + alto / 2 + 8} fontSize={tam} fill={i === 0 ? '#fff' : c.texto} peso={i === 0 ? 700 : 400}>{txt}</TxtBase>; })}
          </g>
        );
      })}
    </g>
  );
};

/* Pulso de energía que recorre una ruta de puntos (u de 0 a 1). */
export const enRuta = (pts: [number, number][], u: number): [number, number] => {
  const seg = pts.length - 1;
  const v = Math.min(seg - 1e-6, Math.max(0, u * seg));
  const k = Math.floor(v), f = v - k;
  return [lerp(pts[k][0], pts[k + 1][0], f), lerp(pts[k][1], pts[k + 1][1], f)];
};

export const COLOR_EQ = { mkt: EQUIPOS.mkt.color, ven: EQUIPOS.ven.color, ser: EQUIPOS.ser.color, ops: EQUIPOS.ops.color, azul: AZUL_M, verde: VERDE };
