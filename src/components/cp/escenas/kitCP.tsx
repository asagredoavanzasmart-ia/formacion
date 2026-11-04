import React from 'react';
import { useEscena as useEscenaEQ } from '../../equipos/escenas/kitEQ';
import { NARANJA, ROSA, tono, sombra, Txt, cl, lerp, GRIS } from '../../vc/escenas/kitVC';
import { PAGINAS } from '../paginas';

/* Kit de «CRM en pymes»: reexporta el armazón y los dibujos de «Ventas complejas» y suma lo propio de la clase
   (la ficha de cliente, el CRM como pantalla con módulos, el libro, el medidor y el sello). Sólidos rellenos. */

export * from '../../vc/escenas/kitVC';

/* Armazón de la escena de una página: los nombres de las marcas salen de las anclas de la página. */
export function useEscenaCP(id: string, marcas: number[], estatico = false) {
  const nombres = React.useMemo(() => Object.keys(PAGINAS[id]?.anclas ?? {}), [id]);
  const r = useEscenaEQ(nombres, marcas, estatico);
  return { ...r, m: (n: string) => r.M(n), c: tono };
}

/* Ficha de cliente (tarjeta de contacto con foto y líneas). (x, y) es su centro. */
export const Ficha: React.FC<{ x: number; y: number; s?: number; op?: number; rot?: number; color?: string }> = ({ x, y, s = 1, op = 1, rot = 0, color = NARANJA }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
      <rect x={-46} y={-30} width={92} height={60} rx={10} fill="#ffffff" style={sombra(0.22, 3, 6)} />
      <rect x={-46} y={-30} width={92} height={12} rx={6} fill={color} />
      <circle cx={-24} cy={6} r={11} fill="#f7c4a0" /><path d="M -38 26 Q -24 10 -10 26 Z" fill={color} />
      <rect x={-4} y={-2} width={40} height={6} rx={3} fill="#cbd5e1" /><rect x={-4} y={10} width={30} height={6} rx={3} fill="#e2e8f0" />
    </g>
  );

/* El CRM como pantalla grande con módulos (franjas de color). `n` módulos visibles; `brillo` lo hace relucir. (x, y) es la base. */
export const PantallaCRM: React.FC<{ x: number; y: number; s?: number; n?: number; op?: number; t?: number; brillo?: number; vacia?: boolean; isDark: boolean }> = ({ x, y, s = 1, n = 3, op = 1, t = 0, brillo = 0, vacia = false, isDark }) => {
  if (op < 0.01) return null;
  const MOD = ['#f97316', '#ec4899', '#2f7bf6', '#10b981', '#7c3aed', '#f59e0b'];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <ellipse cx={0} cy={6} rx={170} ry={14} fill="#000" opacity={0.14} />
      <path d="M -60 0 H 60 L 44 -22 H -44 Z" fill={isDark ? '#64748b' : '#94a3b8'} /><rect x={-14} y={-60} width={28} height={40} fill={isDark ? '#475569' : '#64748b'} />
      <rect x={-170} y={-300} width={340} height={244} rx={18} fill="#334155" style={sombra(0.25, 5, 12)} />
      <rect x={-156} y={-286} width={312} height={216} rx={8} fill="#0b1220" />
      <rect x={-156} y={-286} width={312} height={30} rx={8} fill="#1e293b" />
      <text x={-140} y={-264} fontFamily="Ubuntu" fontWeight={800} fontSize={20} fill="#ffffff">CRM</text>
      {!vacia && Array.from({ length: n }, (_, k) => (
        <g key={k}>
          <rect x={-140 + (k % 3) * 98} y={-240 + Math.floor(k / 3) * 80} width={86} height={64} rx={8} fill={MOD[k % MOD.length]} opacity={0.9} />
          <rect x={-130 + (k % 3) * 98} y={-226 + Math.floor(k / 3) * 80} width={50} height={8} rx={4} fill="#ffffff" opacity={0.7} />
          <rect x={-130 + (k % 3) * 98} y={-210 + Math.floor(k / 3) * 80} width={34} height={8} rx={4} fill="#ffffff" opacity={0.45} />
        </g>
      ))}
      {brillo > 0 && [0, 1, 2, 3].map((k) => { const a = t * 1.5 + k * 1.57; return <path key={k} d="M 0 -12 L 4 -4 L 12 0 L 4 4 L 0 12 L -4 4 L -12 0 L -4 -4 Z" fill="#fde68a" opacity={brillo * (0.5 + 0.5 * Math.sin(a * 2))} transform={`translate(${Math.cos(a) * 200} ${-180 + Math.sin(a) * 150}) scale(${1.2 + 0.4 * Math.sin(a * 3)})`} />; })}
    </g>
  );
};

/* Libro cerrado de pie con lomo y título corto. (x, y) es la base. */
export const Libro: React.FC<{ x: number; y: number; color: string; titulo: string; autor: string; op?: number; s?: number; c: ReturnType<typeof tono> }> = ({ x, y, color, titulo, autor, op = 1, s = 1, c }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y + (1 - op) * 20}) scale(${s})`} opacity={op}>
      <ellipse cx={0} cy={6} rx={110} ry={12} fill="#000" opacity={0.14} />
      <rect x={-96} y={-250} width={192} height={250} rx={12} fill={color} style={sombra(c.sombra, 5, 12)} />
      <rect x={-96} y={-250} width={26} height={250} rx={8} fill="#000" opacity={0.18} />
      <rect x={-56} y={-210} width={130} height={8} rx={4} fill="#ffffff" opacity={0.6} />
      <Txt x={8} y={-150} textAnchor="middle" fontSize={30} fill="#ffffff">{titulo}</Txt>
      <rect x={-56} y={-110} width={130} height={8} rx={4} fill="#ffffff" opacity={0.6} />
      <Txt f="a" x={0} y={50} textAnchor="middle" fontSize={28} fill={c.texto}>{autor}</Txt>
    </g>
  );

/* Medidor semicircular con aguja: `v` entre 0 y 1. (x, y) es el centro del arco. */
export const Medidor: React.FC<{ x: number; y: number; r?: number; v: number; color?: string; op?: number; c: ReturnType<typeof tono> }> = ({ x, y, r = 110, v, color = NARANJA, op = 1, c }) => {
  if (op < 0.01) return null;
  const a = Math.PI * (1 - cl(v));
  const arco = (u: number) => `M ${-r} 0 A ${r} ${r} 0 0 1 ${r * Math.cos(Math.PI * (1 - u))} ${-r * Math.sin(Math.PI * (1 - u))}`;
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <path d={arco(1)} stroke={c.apagado} strokeWidth={r * 0.2} fill="none" />
      {v > 0.005 && <path d={arco(v)} stroke={color} strokeWidth={r * 0.2} fill="none" />}
      <g transform={`rotate(${(-a * 180) / Math.PI})`}><rect x={0} y={-4} width={r * 0.86} height={8} rx={4} fill={c.texto} /></g>
      <circle r={12} fill={c.texto} />
    </g>
  );
};

/* Sello de goma que cae y golpea. (x, y) es su centro; `u` de 0 a 1 es la caída. */
export const Sello: React.FC<{ x: number; y: number; texto: string; u: number; color?: string; rot?: number; tam?: number }> = ({ x, y, texto, u, color = '#e5484d', rot = -8, tam = 34 }) => {
  if (u <= 0.01) return null;
  const k = lerp(2.2, 1, cl(u * 1.3));
  const w = texto.length * tam * 0.62 + 50;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`} opacity={cl(u * 3)}>
      <rect x={-w / 2} y={-tam * 0.95} width={w} height={tam * 1.9} rx={14} fill="none" stroke={color} strokeWidth={7} />
      <Txt x={0} y={tam * 0.36} textAnchor="middle" fontSize={tam} fill={color} peso={800} letterSpacing={2}>{texto}</Txt>
    </g>
  );
};

/* Fila de figuras pequeñas (íconos de persona sólidos) para proporciones: `activos` se pintan con `color`. */
export const Gente: React.FC<{ x: number; y: number; n: number; activos: number; color: string; paso?: number; s?: number; op?: number; gris?: string; fuera?: number }> = ({ x, y, n, activos, color, paso = 70, s = 1, op = 1, gris = GRIS, fuera = 0 }) =>
  op < 0.01 ? null : (
    <g opacity={op}>
      {Array.from({ length: n }, (_, k) => {
        const on = k < activos;
        const dx = on ? fuera * (120 + k * 14) : 0;
        return (
          <g key={k} transform={`translate(${x + k * paso + dx} ${y}) scale(${s})`} opacity={on && fuera > 0 ? 1 - 0.7 * fuera : 1}>
            <circle cx={0} cy={-58} r={15} fill="#f7c4a0" />
            <path d="M -22 0 Q -22 -40 0 -40 Q 22 -40 22 0 Z" fill={on ? color : gris} />
          </g>
        );
      })}
    </g>
  );

/* Cámara del rótulo de lección: lista de tomas fácil de leer. */
export const enTramo = (t: number, a: number, b: number) => t >= a && t < b;

