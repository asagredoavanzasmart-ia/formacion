import React from 'react';
import { NARANJA, ROSA, tono, sombra } from '../../remotion/comun';
import { useEscena as useEscenaEQ } from '../../equipos/escenas/kitEQ';
import { Txt, useMovil } from '../../revops/escenas/kitRO';
import { lerp } from '../../lean/escenas/comunLS';
import { sm, cl } from '../../lean/escenas/kitLS';
import { PAGINAS } from '../indice';

/* Kit de «Ventas complejas»: reexporta el armazón de escenas y suma lo propio de la clase: el nodo redondo
   con curvas en degradado de «Evolución de la venta», la propuesta que viaja de parada en parada y el barco
   de los modos de respuesta (el mismo dibujo de la diapositiva original de Ventas B2B). Sólidos rellenos. */

export { Lienzo, Suelo, Cuenta, Cartel, Cifra, Monitor, Arco, enArco, Barra, brillo, mezcla, PIZARRA, AMBAR } from '../../equipos/escenas/kitEQ';
export { Toma, Apoyo, Hoja, Reloj, Visto, Cruz, Flujo, Corazon, Moneda3D, PilaMonedas, Portatil, sm, cl, azar } from '../../lean/escenas/kitLS';
export { Engranaje, Bombilla, Calendario, Telefono } from '../../lean/escenas/comunLS';
export { Rotulo, W, H, MIN_TXT, lerp, escribe, e1, ventana, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, Flecha, Curva, Burbuja } from '../../lean/escenas/comunLS';
export type { PropsCE } from '../../lean/escenas/comunLS';
export { Letrero, Txt, useMovil, Embudo, Tabla, enRuta, Lead } from '../../revops/escenas/kitRO';
export { Fajo, Brujula, Pin, Contrato, Escalon, Cuadrantes, Nube, GRIS } from '../../ep/escenas/kitEP';
export { NARANJA, ROSA, tono, sombra };
export { Persona, ac, pop } from '../../remotion/comun';

/* Armazón de la escena de una página: los nombres de las marcas salen de las anclas de la página. */
export function useEscenaVC(id: string, marcas: number[], estatico = false) {
  const nombres = React.useMemo(() => Object.keys(PAGINAS[id]?.anclas ?? {}), [id]);
  const r = useEscenaEQ(nombres, marcas, estatico);
  return { ...r, m: (n: string) => r.M(n), c: tono };
}

/* Curva horizontal en S (la de la diapositiva original): de (x1, y1) a (x2, y2) con tangentes horizontales. */
export const curvaS = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
};
/* Punto sobre esa curva para u entre 0 y 1. */
export const enS = (x1: number, y1: number, x2: number, y2: number, u: number): [number, number] => {
  const mx = (x1 + x2) / 2, v = 1 - u;
  const x = v * v * v * x1 + 3 * v * v * u * mx + 3 * v * u * u * mx + u * u * u * x2;
  const y = v * v * v * y1 + 3 * v * v * u * y1 + 3 * v * u * u * y2 + u * u * u * y2;
  return [x, y];
};

/* Hilo en degradado que se traza con u (0 a 1). */
export const Hilo: React.FC<{ x1: number; y1: number; x2: number; y2: number; u: number; id: string; grosor?: number; op?: number; color?: string }> = ({ x1, y1, x2, y2, u, id, grosor = 6, op = 1, color }) => {
  if (u <= 0.01) return null;
  // Degradado en coordenadas absolutas: así también se pinta en un tramo recto horizontal o vertical (caja sin alto).
  const gid = `${id}-hilo-${Math.round(x1)}-${Math.round(y1)}-${Math.round(x2)}-${Math.round(y2)}`;
  return (
    <g opacity={op}>
      {!color && <defs><linearGradient id={gid} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2 === x1 && y2 === y1 ? x1 + 1 : x2} y2={y2}><stop offset="0" stopColor={NARANJA} /><stop offset="1" stopColor={ROSA} /></linearGradient></defs>}
      <path d={curvaS(x1, y1, x2, y2)} fill="none" stroke={color ?? `url(#${gid})`} strokeWidth={grosor} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - cl(u)} />
    </g>
  );
};

/* Edificio de oficinas en volumen: fachada, costado y techo en tres tonos del mismo color, grilla de ventanas
   (algunas encendidas), zócalo, puerta y equipos en el techo. (x, y) es el centro de la base de la fachada. */
export const Edificio: React.FC<{ x: number; y: number; w?: number; h?: number; color?: string; op?: number }> = ({ x, y, w = 100, h = 150, color = '#475569', op = 1 }) => {
  if (op < 0.01) return null;
  const d = Math.max(8, w * 0.26), dy = d * 0.5;
  const cols = Math.max(2, Math.min(5, Math.round(w / 28)));
  const filas = Math.max(2, Math.min(9, Math.round((h - 34) / 30)));
  const mx = w * 0.14, gx = w * 0.07;
  const vw = (w - 2 * mx - (cols - 1) * gx) / cols;
  const top = -h + h * 0.08, base = -Math.max(18, h * 0.16);
  const vh = Math.max(4, ((base - top) - (filas - 1) * 6) / filas);
  const luz = (r: number, k: number) => ((r * 7 + k * 13 + Math.round(w)) % 5) < 2;
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <ellipse cx={d * 0.4} cy={4} rx={w * 0.66 + d * 0.4} ry={Math.max(5, w * 0.08)} fill="#000" opacity={0.2} />
      <path d={`M ${w / 2} 0 L ${w / 2 + d} ${-dy} L ${w / 2 + d} ${-h - dy} L ${w / 2} ${-h} Z`} fill={color} />
      <path d={`M ${w / 2} 0 L ${w / 2 + d} ${-dy} L ${w / 2 + d} ${-h - dy} L ${w / 2} ${-h} Z`} fill="#000" opacity={0.28} />
      <path d={`M ${-w / 2} ${-h} L ${w / 2} ${-h} L ${w / 2 + d} ${-h - dy} L ${-w / 2 + d} ${-h - dy} Z`} fill={color} />
      <path d={`M ${-w / 2} ${-h} L ${w / 2} ${-h} L ${w / 2 + d} ${-h - dy} L ${-w / 2 + d} ${-h - dy} Z`} fill="#fff" opacity={0.3} />
      <rect x={-w / 2} y={-h} width={w} height={h} fill={color} />
      <rect x={-w / 2} y={-h} width={w * 0.1} height={h} fill="#fff" opacity={0.14} />
      <rect x={-w / 2} y={-Math.max(5, h * 0.04)} width={w} height={Math.max(5, h * 0.04)} fill="#000" opacity={0.18} />
      {Array.from({ length: filas }, (_, r) => Array.from({ length: cols }, (_, k) => (
        <rect key={`${r}-${k}`} x={-w / 2 + mx + k * (vw + gx)} y={top + r * (vh + 6)} width={vw} height={vh} rx={Math.min(3, vw * 0.2)}
          fill={luz(r, k) ? '#fde68a' : '#dbeafe'} opacity={luz(r, k) ? 0.95 : 0.55} />
      )))}
      {Array.from({ length: filas }, (_, r) => <path key={r} d={`M ${w / 2 + d * 0.25} ${top + r * (vh + 6) - dy * 0.25} l ${d * 0.5} ${-dy * 0.5} v ${vh} l ${-d * 0.5} ${dy * 0.5} Z`} fill="#dbeafe" opacity={0.3} />)}
      <rect x={-w * 0.12} y={base + 4} width={w * 0.24} height={-base - 4} rx={2} fill="#1e293b" opacity={0.75} />
      <rect x={-w * 0.17} y={base} width={w * 0.34} height={4} rx={2} fill="#fff" opacity={0.6} />
      {h > 70 && <rect x={-w * 0.3 + d * 0.4} y={-h - dy - h * 0.06} width={w * 0.22} height={h * 0.06} rx={2} fill={color} />}
      {h > 70 && <rect x={-w * 0.3 + d * 0.4} y={-h - dy - h * 0.06} width={w * 0.22} height={h * 0.06} rx={2} fill="#000" opacity={0.2} />}
      {h > 110 && <path d={`M ${w * 0.22} ${-h - dy * 0.6} v ${-h * 0.12}`} stroke={color} strokeWidth={Math.max(2, w * 0.025)} strokeLinecap="round" />}
      {h > 110 && <circle cx={w * 0.22} cy={-h - dy * 0.6 - h * 0.12} r={Math.max(2, w * 0.025)} fill={ROSA} />}
    </g>
  );
};

/* Figura mínima (cabeza y hombros) para dentro de un nodo. */
export const Busto: React.FC<{ x: number; y: number; s?: number; color: string; cara?: string }> = ({ x, y, s = 1, color, cara = '#f7c4a0' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -22 22 Q -22 -2 0 -2 Q 22 -2 22 22 Z" fill={color} />
    <circle cx={0} cy={-16} r={13} fill={cara} />
  </g>
);

export type FiguraNodo = 'uno' | 'dos' | 'grupo' | 'nada';

/* Nodo redondo con figura y nombre debajo (como los de «Evolución de la venta»). `destino` lo pinta con el
   degradado de marca; `corto` es el nombre que se usa en pantallas angostas. */
export const Nodo: React.FC<{ x: number; y: number; r?: number; nombre: string; corto?: string; op?: number; destino?: boolean; figura?: FiguraNodo; color?: string; isDark: boolean; id: string; pulso?: number; arriba?: boolean; children?: React.ReactNode }> = ({ x, y, r = 56, arriba = false, nombre, corto, op = 1, destino = false, figura = 'uno', color = '#64748b', isDark, id, pulso = 0, children }) => {
  const movil = useMovil();
  if (op < 0.01) return null;
  const c = tono(isDark);
  const fig = destino ? '#ffffff' : color;
  const s = 0.6 + 0.4 * Math.min(1, op);
  return (
    <g opacity={Math.min(1, op)} transform={`translate(${x} ${y}) scale(${s})`}>
      {pulso > 0 && <circle r={r + 14 + 8 * pulso} fill={NARANJA} opacity={0.18 * pulso} />}
      <circle r={r} fill={destino ? `url(#${id}-marca)` : c.panel} style={sombra(c.sombra, 6, 14)} />
      {figura === 'uno' && <Busto x={0} y={6} s={r / 52} color={fig} />}
      {figura === 'dos' && <><Busto x={-r * 0.3} y={8} s={r / 64} color={fig} /><Busto x={r * 0.3} y={8} s={r / 64} color={destino ? '#ffe4d6' : ROSA} /></>}
      {figura === 'grupo' && <><Busto x={-r * 0.4} y={14} s={r / 80} color={fig} /><Busto x={r * 0.4} y={14} s={r / 80} color={fig} /><Busto x={0} y={2} s={r / 70} color={destino ? '#ffe4d6' : NARANJA} /></>}
      {children}
      {(movil && corto ? corto : nombre).split('|').map((ln, j, a) => <Txt key={j} x={0} y={arriba ? -r - 22 - (a.length - 1 - j) * (movil ? 48 : 30) : r + (movil ? 52 : 38) + j * (movil ? 48 : 30)} textAnchor="middle" fontSize={26} fill={c.texto}>{ln}</Txt>)}
    </g>
  );
};

/* Propuesta: un sobre con hoja que viaja. (x, y) es su centro. */
export const Propuesta: React.FC<{ x: number; y: number; s?: number; op?: number; rot?: number; sello?: string }> = ({ x, y, s = 1, op = 1, rot = 0, sello }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
      <rect x={-30} y={-38} width={60} height={70} rx={6} fill="#ffffff" style={sombra(0.25, 3, 6)} />
      {[0, 1, 2, 3].map((k) => <rect key={k} x={-20} y={-26 + k * 13} width={k === 3 ? 24 : 40} height={6} rx={3} fill="#cbd5e1" />)}
      <rect x={-30} y={18} width={60} height={14} rx={4} fill={sello ?? NARANJA} />
    </g>
  );

/* Barco de los modos de respuesta: el mismo dibujo de la diapositiva original (casco, cabina, chimenea, franja
   por modo, puerto con grúa en crecimiento, agujero y humo en problemas, viento y estela en exceso de confianza,
   dos capas de olas). Cada modo pesa entre 0 y 1 (`k`): así el barco pasa de un modo a otro sin saltos.
   (x, y) es el centro del recuadro de w × h. */
export type PesosModo = { crec: number; prob: number; equi: number; exce: number };
const CIELO = { crec: '#3b82f6', prob: '#ef4444', equi: '#10b981', exce: '#a855f7' };

export const BarcoModos: React.FC<{ x: number; y: number; w: number; h: number; t: number; k: PesosModo; isDark: boolean; id: string; op?: number }> = ({ x, y, w, h, t, k, isDark, id, op = 1 }) => {
  if (op < 0.01) return null;
  const total = k.crec + k.prob + k.equi + k.exce || 1;
  const p = { crec: k.crec / total, prob: k.prob / total, equi: k.equi / total, exce: k.exce / total };
  // Pose del barco (los mismos valores de la diapositiva, escalados al recuadro: 1 px original = 2,2 unidades).
  const E = 2.2;
  const by = (28 * p.prob + 4 * p.exce + 18 * (p.crec + p.equi)) * E;
  const br = 15 * p.prob - 15 * p.exce;
  const bx = (20 * p.exce - 30 * p.crec) * E;
  const per = 8 * p.crec + 4 * p.prob + 6 * p.equi + 2 * p.exce;
  const ola = Math.sin((t * 2 * Math.PI) / per);
  const casco = isDark ? '#e2e8f0' : '#334155';
  const cab = isDark ? '#94a3b8' : '#cbd5e1';
  const vid = isDark ? '#38bdf8' : '#0ea5e9';
  const naranjo = isDark ? '#f59e0b' : '#d97706';
  const franja = p.prob > 0.5 ? CIELO.prob : p.crec > 0.5 ? CIELO.crec : p.exce > 0.5 ? CIELO.exce : CIELO.equi;
  const desp = (t / per) % 1;
  const desp2 = (t / (per + 2)) % 1;
  const grua = 0.5 - 0.5 * Math.cos((t * 2 * Math.PI) / 4);
  const WL = h * 0.68;
  return (
    <g transform={`translate(${x - w / 2} ${y - h / 2})`} opacity={op}>
      <defs>
        <clipPath id={`${id}-mar`}><rect width={w} height={h} rx={28} /></clipPath>
        {(['crec', 'prob', 'equi', 'exce'] as const).map((m) => (
          <linearGradient key={m} id={`${id}-cielo-${m}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={CIELO[m]} stopOpacity={0.3} /><stop offset="1" stopColor={CIELO[m]} stopOpacity={0} /></linearGradient>
        ))}
      </defs>
      <g clipPath={`url(#${id}-mar)`}>
        <rect width={w} height={h} fill={isDark ? '#1e3a8a' : '#dbeafe'} opacity={isDark ? 0.2 : 0.5} />
        {(['crec', 'prob', 'equi', 'exce'] as const).map((m) => p[m] > 0.01 && <rect key={m} width={w} height={h} fill={`url(#${id}-cielo-${m})`} opacity={p[m]} />)}

        {/* puerto en construcción (crecimiento) */}
        {p.crec > 0.01 && (
          <g opacity={p.crec} transform={`translate(${w - 175 * E + 50 + 50 * (1 - p.crec)} ${WL - 140 * E}) scale(${E})`}>
            <rect x={20} y={145} width={150} height={35} fill={isDark ? '#334155' : '#94a3b8'} opacity={0.8} />
            <rect x={40} y={140} width={15} height={40} fill={isDark ? '#334155' : '#64748b'} /><rect x={120} y={140} width={15} height={40} fill={isDark ? '#334155' : '#64748b'} />
            <rect x={20} y={130} width={150} height={15} fill={isDark ? '#475569' : '#94a3b8'} />
            <rect x={80} y={50} width={70} height={80} fill={isDark ? '#1e293b' : '#cbd5e1'} />
            <path d="M80 70 L150 70 M80 90 L150 90 M80 110 L150 110 M100 50 L100 130 M130 50 L130 130" stroke={naranjo} strokeWidth={2} />
            <path d={`M110 50 L110 10 L20 ${30 - 15 * grua}`} stroke={isDark ? '#eab308' : '#ca8a04'} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d={`M110 25 L150 ${15 - 10 * grua}`} stroke={isDark ? '#eab308' : '#ca8a04'} strokeWidth={4} strokeLinecap="round" fill="none" />
            <line x1={20} y1={30 - 15 * grua} x2={20} y2={80 - 15 * grua} stroke={isDark ? '#94a3b8' : '#64748b'} strokeWidth={1.5} strokeDasharray="3 3" />
            <g transform={`translate(0 ${-15 * grua})`}>
              <path d="M0 80 L10 50 L40 50 L40 80 Z" fill={cab} /><rect x={15} y={60} width={10} height={10} rx={1} fill={vid} />
            </g>
          </g>
        )}

        {/* viento (exceso de confianza) */}
        {p.exce > 0.01 && [[0.35, 150, 2, 0.5, 0], [0.45, 200, 3, 0.7, 0.2], [0.55, 100, 2, 0.4, 0.4], [0.65, 120, 2, 0.6, 0.1]].map(([fy, lw, gr, d, de], j) => {
          const u = ((t + de) / d) % 1;
          return <rect key={j} x={w / 2 + (400 - 800 * u) * E - lw} y={h * fy} width={lw * 1.6} height={gr * 2} rx={gr} fill="#fff" opacity={0.8 * Math.sin(Math.PI * u) * p.exce} />;
        })}

        {/* barco */}
        <g transform={`translate(${w / 2 + bx} ${WL + 14 - 50 * E + by - 18 * E + 4 * E * (0.5 + 0.5 * ola)}) rotate(${br + ola}) `}>
          <g transform={`scale(${E}) translate(-80 -60)`}>
            {p.exce > 0.01 && (
              <g opacity={p.exce * (0.85 + 0.15 * Math.sin(t * 21))} transform={`translate(-72 -2) scale(${1.12 + 0.15 * Math.sin(t * 21)}) rotate(${5 * Math.sin(t * 21)} 112 96)`}>
                <g transform="scale(1.12 0.96)">
                  <path d="M100 100 C80 80 60 40 40 20 C20 0 0 10 10 30 C20 50 40 80 100 100 Z" fill="white" opacity={0.9} />
                  <path d="M100 100 C70 90 50 60 30 40 C10 20 0 30 15 50 C30 70 50 90 100 100 Z" fill="#bae6fd" opacity={0.8} />
                  <path d="M100 100 C90 70 70 30 50 10 C30 -10 10 0 20 20 C30 40 60 70 100 100 Z" fill="white" />
                </g>
              </g>
            )}
            <g style={sombra(0.3, 4, 6)}>
              <path d="M10 80 L40 110 L120 110 L150 80 Z" fill={casco} />
              <path d="M10 80 L40 110 L120 110 L150 80 Z" fill="black" fillOpacity={0.1} />
              {p.prob > 0.01 && <path d="M90 95 C95 90 105 90 110 95 C115 100 105 110 95 105 C85 100 85 100 90 95 Z" fill={isDark ? '#1e293b' : '#0f172a'} opacity={p.prob} />}
              <g opacity={1 - p.crec}>
                <path d="M50 80 L60 40 L110 40 L110 80 Z" fill={cab} />
                <rect x={70} y={50} width={15} height={15} rx={2} fill={vid} /><rect x={90} y={50} width={15} height={15} rx={2} fill={vid} />
                <rect x={85} y={20} width={12} height={20} fill={isDark ? '#64748b' : '#94a3b8'} />
              </g>
              {p.crec > 0.01 && (
                <g opacity={p.crec}>
                  <path d="M50 80 L55 60 L110 60 L110 80 Z" fill={cab} />
                  <path d="M55 60 L55 40 M80 60 L80 40 M105 60 L105 40 M50 50 L110 50 M50 40 L110 40" stroke={naranjo} strokeWidth={2} />
                </g>
              )}
              <path d="M15 85 L145 85" stroke={franja} strokeWidth={4} />
            </g>
            {p.prob > 0.01 && [[0, 1.5, 60, 2, -30, 0.8], [0.5, 1.8, 80, 2.5, -40, 0.6]].map(([de, d, dy, sc, dx, o], j) => {
              const u = (((t - de) / d) % 1 + 1) % 1;
              return <circle key={j} cx={96 + dx * u} cy={26 - dy * u} r={(8 + 4 * j) * (0.5 + (sc - 0.5) * u)} fill={isDark ? '#cbd5e1' : '#3a3a3a'} opacity={o * Math.sin(Math.PI * u) * p.prob} />;
            })}
          </g>
        </g>

        {/* agua: dos capas de olas que avanzan en sentidos opuestos */}
        <g transform={`translate(${-w * desp} ${WL - 64})`}>
          {[0, 1].map((j) => <path key={j} transform={`translate(${j * w} 0) scale(${w / 1200} 1.6)`} d="M0,40 C150,43.6 350,36.4 600,40 C850,43.6 1050,36.4 1200,40 L1200,200 L0,200 Z" fill={isDark ? 'rgba(59,130,246,0.4)' : 'rgba(96,165,250,0.5)'} />)}
        </g>
        <g transform={`translate(${-w + w * desp2} ${WL + 34 - 96})`}>
          {[0, 1].map((j) => <path key={j} transform={`translate(${j * w} 0) scale(${w / 1200} 1.6)`} d="M0,60 C200,40 400,80 600,60 C800,40 1000,80 1200,60 L1200,200 L0,200 Z" fill={isDark ? 'rgba(37,99,235,0.6)' : 'rgba(59,130,246,0.7)'} />)}
        </g>
      </g>
    </g>
  );
};

/* Pesos de modo que pasan suavemente de uno a otro según el tiempo. `cambios` = [[t, modo], ...]. */
export const pesosModo = (t: number, cambios: [number, keyof PesosModo][]): PesosModo => {
  const k: PesosModo = { crec: 0, prob: 0, equi: 0, exce: 0 };
  let prev: keyof PesosModo = cambios[0][1];
  let u = 1, cur = prev;
  for (const [t0, m] of cambios) {
    if (t >= t0) { prev = cur; cur = m; u = sm(t, t0, t0 + 1.2); }
  }
  k[prev] += 1 - u; k[cur] += u;
  return k;
};


