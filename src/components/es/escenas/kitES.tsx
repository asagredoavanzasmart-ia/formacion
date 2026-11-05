import React from 'react';
import { useEscena as useEscenaEQ } from '../../equipos/escenas/kitEQ';
import { NARANJA, ROSA, tono, sombra, Txt, cl, lerp, GRIS } from '../../vc/escenas/kitVC';
import { PAGINAS } from '../paginas';

/* Kit de «Esencialismo»: reexporta el armazón y los dibujos de las clases anteriores y suma los objetos propios.
   Escala: la persona (s = 1) mide ~170 unidades ≈ 1,75 m, así que 1 m ≈ 97 unidades. Los objetos se dibujan a esa
   escala; lo chico se muestra en un plano cercano (sin personas al lado), nunca agrandado junto a una persona. */

export * from '../../cp/escenas/kitCP';
export { Auto, Carretera, Camion, Bus } from '../../ep/escenas/kitEP';
export { Mesa, Cara, Lupa, Estrella, Copa } from '../../comunicacion/escenas/comunCE';
export { Barco, Mar, Tienda } from '../../oceano/escenas/comunOA';

export function useEscenaES(id: string, marcas: number[], estatico = false) {
  const nombres = React.useMemo(() => Object.keys(PAGINAS[id]?.anclas ?? {}), [id]);
  const r = useEscenaEQ(nombres, marcas, estatico);
  return { ...r, m: (n: string) => r.M(n), c: tono };
}

type C = ReturnType<typeof tono>;

/* Avión de pasajeros de perfil, nariz a la derecha. (x, y) es el centro del fuselaje; mide ~420 de largo con s = 1. */
export const Avion: React.FC<{ x: number; y: number; s?: number; color?: string; cola?: string; rot?: number; op?: number; flip?: boolean; concorde?: boolean }> = ({ x, y, s = 1, color = '#f8fafc', cola = NARANJA, rot = 0, op = 1, flip = false, concorde = false }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`} opacity={op}>
      {concorde ? (
        <>
          <path d="M -210 -6 Q -150 -18 120 -14 L 230 0 L 120 12 Q -150 16 -210 8 Z" fill={color} style={sombra(0.2, 4, 8)} />
          <path d="M -60 8 L 80 10 L -150 70 L -170 68 Z" fill="#cbd5e1" />
          <path d="M -200 -4 L -170 -80 L -150 -80 L -150 -8 Z" fill={cola} />
          {[-90, -60, -30, 0, 30, 60].map((wx) => <rect key={wx} x={wx} y={-8} width={12} height={7} rx={3} fill="#1e3a5f" />)}
        </>
      ) : (
        <>
          <path d="M -200 -26 Q -210 0 -196 22 L 150 22 Q 210 18 214 0 Q 210 -22 150 -26 Z" fill={color} style={sombra(0.2, 4, 8)} />
          <path d="M 150 -26 Q 200 -24 212 -6 L 168 -6 Z" fill="#1e3a5f" />
          <path d="M -40 10 L 70 10 L -60 90 L -100 90 Z" fill="#cbd5e1" />
          <path d="M -196 -20 L -170 -100 L -130 -100 L -120 -24 Z" fill={cola} />
          <path d="M -190 6 L -140 6 L -180 40 L -200 40 Z" fill="#cbd5e1" />
          {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-110 + k * 24} y={-14} width={12} height={12} rx={4} fill="#1e3a5f" opacity={0.85} />)}
          <rect x={-200} y={4} width={400} height={8} fill={cola} opacity={0.85} />
        </>
      )}
    </g>
  );

/* Bandera en un mástil: la punta del mástil queda en (x, y - alto). (x, y) es la base. */
export const Bandera: React.FC<{ x: number; y: number; alto?: number; color?: string; t?: number; op?: number }> = ({ x, y, alto = 200, color = NARANJA, t = 0, op = 1 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <ellipse cx={0} cy={2} rx={16} ry={4} fill="#000" opacity={0.2} />
      <rect x={-3} y={-alto} width={6} height={alto} rx={3} fill="#64748b" />
      <path d={`M 3 ${-alto} Q 30 ${-alto - 8 + 6 * Math.sin(t * 4)} 60 ${-alto + 4} L 60 ${-alto + 44} Q 30 ${-alto + 36 + 6 * Math.sin(t * 4 + 1)} 3 ${-alto + 40} Z`} fill={color} />
    </g>
  );

/* Termómetro de calificación de 0 a 100 con una línea de corte. (x, y) es el bulbo; `v` de 0 a 1. */
export const Termometro: React.FC<{ x: number; y: number; alto?: number; v: number; corte?: number; color?: string; c: C; op?: number }> = ({ x, y, alto = 420, v, corte, color = NARANJA, c, op = 1 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <rect x={-26} y={-alto} width={52} height={alto} rx={26} fill={c.apagado} />
      <rect x={-14} y={-alto * cl(v)} width={28} height={alto * cl(v)} rx={14} fill={color} />
      <circle r={44} fill={color} />
      {corte != null && <g><rect x={-54} y={-alto * corte - 3} width={108} height={6} rx={3} fill="#e5484d" /></g>}
    </g>
  );

/* Frasco de pastillas (plano cercano). (x, y) es la base; mide 70 × 110 con s = 1. */
export const Frasco: React.FC<{ x: number; y: number; s?: number; op?: number; rot?: number; etiqueta?: string }> = ({ x, y, s = 1, op = 1, rot = 0, etiqueta = '#e5484d' }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
      <rect x={-35} y={-96} width={70} height={96} rx={12} fill="#f8fafc" style={sombra(0.18, 3, 6)} />
      <rect x={-40} y={-118} width={80} height={26} rx={8} fill="#e2e8f0" />
      <rect x={-35} y={-70} width={70} height={42} fill={etiqueta} />
      <rect x={-22} y={-56} width={44} height={8} rx={4} fill="#ffffff" opacity={0.8} />
    </g>
  );

/* Taza de café (plano cercano). (x, y) es la base; mide 110 × 100 con s = 1. */
export const Taza: React.FC<{ x: number; y: number; s?: number; color?: string; op?: number; t?: number }> = ({ x, y, s = 1, color = NARANJA, op = 1, t = 0 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <ellipse cx={0} cy={4} rx={70} ry={10} fill="#000" opacity={0.15} />
      <path d="M 44 -70 Q 86 -70 86 -44 Q 86 -18 44 -18" stroke={color} strokeWidth={14} fill="none" />
      <path d="M -50 -96 H 50 V -20 Q 50 0 30 0 H -30 Q -50 0 -50 -20 Z" fill={color} />
      <ellipse cx={0} cy={-96} rx={50} ry={10} fill="#7c2d12" />
      {[-16, 0, 16].map((dx, k) => <path key={dx} d={`M ${dx} -112 q 8 -14 0 -28 q -8 -14 0 -28`} stroke="#94a3b8" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.3 + 0.3 * Math.sin(t * 3 + k)} />)}
    </g>
  );

/* Perro de perfil, a escala de la persona (≈ 60 de alto con s = 1). (x, y) son las patas. */
export const Perro: React.FC<{ x: number; y: number; s?: number; color?: string; op?: number; flip?: boolean; animo?: number; salto?: number }> = ({ x, y, s = 1, color = '#b45309', op = 1, flip = false, animo = 1, salto = 0 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y - salto}) scale(${flip ? -s : s} ${s})`} opacity={op}>
      <ellipse cx={0} cy={2 + salto} rx={44} ry={6} fill="#000" opacity={0.18} />
      <rect x={-34} y={-46} width={64} height={30} rx={15} fill={color} />
      {[-26, -12, 12, 24].map((lx) => <rect key={lx} x={lx - 4} y={-22} width={8} height={22} rx={4} fill={color} />)}
      <circle cx={36} cy={-52 + (1 - animo) * 14} r={17} fill={color} />
      <path d={`M 30 ${-64 + (1 - animo) * 14} L 24 ${-46 + (1 - animo) * 22} L 34 ${-52 + (1 - animo) * 14} Z`} fill="#7c2d12" />
      <circle cx={42} cy={-56 + (1 - animo) * 14} r={2.6} fill="#1f2937" /><circle cx={52} cy={-50 + (1 - animo) * 14} r={4} fill="#1f2937" />
      <path d={`M -34 -40 Q -50 ${-60 + (1 - animo) * 36} -46 ${-70 + (1 - animo) * 44}`} stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" />
    </g>
  );

/* Caja abierta de cartón (estilo isométrico simple). (x, y) es la base; `w` su ancho. */
export const Caja: React.FC<{ x: number; y: number; w?: number; h?: number; color?: string; op?: number; texto?: string; tam?: number }> = ({ x, y, w = 140, h = 100, color = '#d6a36a', op = 1, texto, tam = 24 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <ellipse cx={0} cy={4} rx={w * 0.6} ry={8} fill="#000" opacity={0.15} />
      <rect x={-w / 2} y={-h} width={w} height={h} rx={6} fill={color} />
      <rect x={w / 6} y={-h} width={w / 3} height={h} fill="#000" opacity={0.08} />
      <path d={`M ${-w / 2} ${-h} L ${-w / 2 - 22} ${-h - 26} L ${w / 2 - 22} ${-h - 26} L ${w / 2} ${-h} Z`} fill="#b07d46" />
      {texto && <Txt x={0} y={-h / 2 + tam * 0.36} textAnchor="middle" fontSize={tam} fill="#5b3a1a">{texto}</Txt>}
    </g>
  );

/* Lista de verificación en un portapapeles. (x, y) es el centro; `n` ítems, `hechos` marcados. */
export const Lista: React.FC<{ x: number; y: number; s?: number; n?: number; hechos?: number; op?: number; titulo?: string; c: C }> = ({ x, y, s = 1, n = 5, hechos = 0, op = 1, titulo, c }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <rect x={-110} y={-150} width={220} height={300} rx={16} fill="#b07d46" style={sombra(c.sombra, 5, 10)} />
      <rect x={-94} y={-128} width={188} height={262} rx={8} fill="#ffffff" />
      <rect x={-34} y={-162} width={68} height={30} rx={8} fill="#64748b" />
      {titulo && <Txt x={0} y={-96} textAnchor="middle" fontSize={24} fill="#334155">{titulo}</Txt>}
      {Array.from({ length: n }, (_, k) => {
        const yy = -60 + k * (180 / n);
        const ok = k < hechos;
        return (
          <g key={k}>
            <rect x={-80} y={yy - 12} width={24} height={24} rx={6} fill={ok ? '#10b981' : '#e2e8f0'} />
            {ok && <path d={`M -75 ${yy} l 6 6 l 12 -12`} stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />}
            <rect x={-44} y={yy - 5} width={110 - (k % 2) * 30} height={10} rx={5} fill={ok ? '#94a3b8' : '#cbd5e1'} />
          </g>
        );
      })}
    </g>
  );

/* Valla de madera de `n` tablas. (x, y) es la base izquierda. */
export const Valla: React.FC<{ x: number; y: number; n?: number; u?: number; op?: number; alto?: number }> = ({ x, y, n = 8, u = 1, op = 1, alto = 110 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      {Array.from({ length: n }, (_, k) => {
        const e = cl(u * n - k);
        return e > 0 && <path key={k} d={`M ${k * 40} 0 V ${-alto * e + 14} L ${k * 40 + 14} ${-alto * e} L ${k * 40 + 28} ${-alto * e + 14} V 0 Z`} fill="#c08552" />;
      })}
      {u > 0.3 && [0.3, 0.7].map((f) => <rect key={f} x={-6} y={-alto * f - 6} width={n * 40 - 4} height={12} rx={4} fill="#a16b3f" opacity={cl(u * 2 - 0.6)} />)}
    </g>
  );

/* Proyector de mesa con haz de luz; `on` de 0 a 1. (x, y) es la base; ~100 de ancho. */
export const Proyector: React.FC<{ x: number; y: number; on: number; op?: number; largo?: number }> = ({ x, y, on, op = 1, largo = 300 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      {on > 0.01 && <path d={`M 50 -38 L ${50 + largo} ${-120} L ${50 + largo} ${40} Z`} fill="#fde68a" opacity={0.35 * on} />}
      <rect x={-50} y={-60} width={100} height={60} rx={10} fill="#475569" />
      <circle cx={42} cy={-30} r={16} fill={on > 0.5 ? '#fde68a' : '#1f2937'} />
      <rect x={-36} y={-50} width={40} height={8} rx={4} fill="#94a3b8" />
    </g>
  );

/* Bote de basura grande. (x, y) es la base; ~110 de alto. */
export const Basurero: React.FC<{ x: number; y: number; s?: number; op?: number; tapa?: number }> = ({ x, y, s = 1, op = 1, tapa = 0 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <ellipse cx={0} cy={3} rx={60} ry={8} fill="#000" opacity={0.18} />
      <path d="M -50 -110 H 50 L 42 0 H -42 Z" fill="#64748b" />
      {[-24, 0, 24].map((lx) => <rect key={lx} x={lx - 4} y={-96} width={8} height={84} rx={4} fill="#000" opacity={0.15} />)}
      <g transform={`translate(-56 -112) rotate(${-50 * tapa})`}><rect x={0} y={-12} width={112} height={14} rx={6} fill="#475569" /></g>
    </g>
  );

/* Tira de película con `n` fotogramas; los `cortados` aparecen tachados. (x, y) es la esquina izquierda. */
export const Pelicula: React.FC<{ x: number; y: number; n?: number; w?: number; cortados?: number[]; corte?: number; op?: number }> = ({ x, y, n = 6, w = 120, cortados = [], corte = 0, op = 1 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      {Array.from({ length: n }, (_, k) => {
        const fuera = cortados.includes(k) ? corte : 0;
        return (
          <g key={k} transform={`translate(${k * w} ${fuera * 160})`} opacity={1 - fuera * 0.8}>
            <rect x={0} y={0} width={w - 4} height={100} fill="#1f2937" />
            {[8, 30, 52, 74, 96].map((hx) => <g key={hx}><rect x={hx * (w / 120)} y={6} width={10} height={8} rx={2} fill="#e5e7eb" /><rect x={hx * (w / 120)} y={86} width={10} height={8} rx={2} fill="#e5e7eb" /></g>)}
            <rect x={8} y={20} width={w - 20} height={60} rx={4} fill={['#f59e0b', '#fb7185', '#60a5fa', '#34d399', '#a78bfa', '#fbbf24'][k % 6]} opacity={0.85} />
          </g>
        );
      })}
    </g>
  );

/* Estatuilla dorada (premio). (x, y) es la base; ~150 de alto con s = 1 (plano cercano). */
export const Estatuilla: React.FC<{ x: number; y: number; s?: number; op?: number }> = ({ x, y, s = 1, op = 1 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <rect x={-34} y={-24} width={68} height={24} rx={4} fill="#1f2937" />
      <rect x={-22} y={-34} width={44} height={12} rx={4} fill="#d97706" />
      <path d="M -10 -34 L -12 -100 Q -24 -110 -12 -118 L 12 -118 Q 24 -110 12 -100 L 10 -34 Z" fill="#f59e0b" />
      <circle cx={0} cy={-132} r={14} fill="#f59e0b" />
      <path d="M -8 -110 L 8 -110 L 0 -60 Z" fill="#fbbf24" />
    </g>
  );

/* Planta con raíces (el problema que vuelve). (x, y) es el nivel del suelo; `corte` 0..1 recorta las hojas, `arranque` la saca. */
export const Maleza: React.FC<{ x: number; y: number; s?: number; corte?: number; arranque?: number; op?: number; t?: number }> = ({ x, y, s = 1, corte = 0, arranque = 0, op = 1, t = 0 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y - arranque * 160}) scale(${s})`} opacity={op * (1 - arranque * 0.3)}>
      <path d="M 0 0 Q -20 40 -50 70 M 0 0 Q 6 50 -6 100 M 0 0 Q 26 36 60 60 M -6 60 Q 10 80 30 96" stroke="#92400e" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.8} />
      {[-1, 1, -0.6, 0.6].map((d, k) => {
        const h = (90 - k * 14) * (1 - corte);
        return <path key={k} d={`M 0 0 Q ${d * 30} ${-h * 0.6} ${d * (40 + 6 * Math.sin(t * 2 + k))} ${-h}`} stroke="#16a34a" strokeWidth={10} fill="none" strokeLinecap="round" />;
      })}
    </g>
  );

/* Mochila (para un niño o adulto). (x, y) es su base; `carga` 0..1 la infla. */
export const Mochila: React.FC<{ x: number; y: number; carga?: number; color?: string; op?: number }> = ({ x, y, carga = 1, color = '#16a34a', op = 1 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <rect x={-20 - 14 * carga} y={-40 - 50 * carga} width={40 + 28 * carga} height={40 + 50 * carga} rx={14} fill={color} />
      <rect x={-14 - 10 * carga} y={-20 - 10 * carga} width={28 + 20 * carga} height={18} rx={6} fill="#000" opacity={0.15} />
    </g>
  );

/* Tranvía de San Francisco. (x, y) es la base; ~380 de largo con s = 1 (≈ 4 m de alto relativo a la persona). */
export const Tranvia: React.FC<{ x: number; y: number; s?: number; op?: number }> = ({ x, y, s = 1, op = 1 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <ellipse cx={0} cy={4} rx={200} ry={12} fill="#000" opacity={0.15} />
      <rect x={-190} y={-250} width={380} height={30} rx={10} fill="#7c2d12" />
      <rect x={-180} y={-220} width={360} height={190} rx={8} fill="#b91c1c" />
      {[-150, -80, -10, 60, 130].map((wx) => <rect key={wx} x={wx} y={-200} width={50} height={70} rx={6} fill="#fde68a" opacity={0.85} />)}
      <rect x={-180} y={-90} width={360} height={14} fill="#fbbf24" />
      {[-120, 120].map((wx) => <circle key={wx} cx={wx} cy={-20} r={20} fill="#1f2937" />)}
    </g>
  );

/* Caja registradora con boleto de papel que sale. (x, y) es la base; `boleto` 0..1. Plano cercano. */
export const Registradora: React.FC<{ x: number; y: number; s?: number; boleto?: number; op?: number; texto?: string }> = ({ x, y, s = 1, boleto = 0, op = 1, texto = 'ESTO ES UN BOLETO' }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      {boleto > 0.01 && (
        <g transform={`translate(-40 ${-170 - 120 * boleto})`}>
          <rect x={-90} y={0} width={180} height={120 * boleto + 10} fill="#ffffff" style={sombra(0.2, 3, 6)} />
          {boleto > 0.6 && <Txt x={0} y={46} textAnchor="middle" fontSize={22} fill="#0f172a">{texto.split(' ').slice(0, 2).join(' ')}</Txt>}
          {boleto > 0.6 && <Txt x={0} y={78} textAnchor="middle" fontSize={22} fill="#0f172a">{texto.split(' ').slice(2).join(' ')}</Txt>}
        </g>
      )}
      <ellipse cx={0} cy={4} rx={150} ry={12} fill="#000" opacity={0.16} />
      <path d="M -140 0 L -120 -120 H 120 L 140 0 Z" fill="#475569" />
      <rect x={-140} y={-170} width={200} height={56} rx={10} fill="#334155" />
      <rect x={70} y={-200} width={70} height={60} rx={8} fill="#0b1220" /><rect x={80} y={-188} width={50} height={22} rx={4} fill="#10b981" />
      {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-100 + (k % 3) * 42} y={-100 + Math.floor(k / 3) * 30} width={34} height={22} rx={5} fill="#94a3b8" />)}
    </g>
  );

/* Teléfono fijo que suena (anillos). (x, y) es la base; plano cercano. */
export const TelefonoFijo: React.FC<{ x: number; y: number; s?: number; t?: number; suena?: number; op?: number; color?: string }> = ({ x, y, s = 1, t = 0, suena = 0, op = 1, color = '#e5484d' }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${suena * 6 * Math.sin(t * 30)}) scale(${s})`} opacity={op}>
      <path d="M -60 0 L -46 -60 H 46 L 60 0 Z" fill={color} />
      <rect x={-70} y={-86} width={140} height={30} rx={14} fill={color} />
      <circle cx={0} cy={-32} r={18} fill="#ffffff" opacity={0.8} />
      {suena > 0.01 && [0, 1].map((k) => <path key={k} d={`M ${80 + k * 16} -90 q 10 20 0 40 M ${-80 - k * 16} -90 q -10 20 0 40`} stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" opacity={suena * (0.5 + 0.5 * Math.sin(t * 12 + k))} />)}
    </g>
  );

/* Cama sencilla con almohada. (x, y) es la base; ~2 m (≈ 200) de largo. */
export const Cama: React.FC<{ x: number; y: number; op?: number; color?: string }> = ({ x, y, op = 1, color = '#7c3aed' }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <ellipse cx={0} cy={4} rx={120} ry={10} fill="#000" opacity={0.15} />
      <rect x={-110} y={-60} width={220} height={40} rx={10} fill="#e2e8f0" />
      <rect x={-110} y={-20} width={220} height={20} rx={6} fill="#94a3b8" />
      <rect x={-120} y={-100} width={20} height={100} rx={6} fill="#64748b" />
      <rect x={-96} y={-80} width={60} height={24} rx={12} fill="#ffffff" />
      <rect x={-30} y={-70} width={140} height={22} rx={10} fill={color} />
    </g>
  );

/* Batería vertical con nivel de carga `v` (0..1). (x, y) es el centro. */
export const Bateria: React.FC<{ x: number; y: number; v: number; alto?: number; op?: number; c: C }> = ({ x, y, v, alto = 220, op = 1, c }) => {
  if (op < 0.01) return null;
  const col = v > 0.6 ? '#10b981' : v > 0.3 ? '#f59e0b' : '#e5484d';
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <rect x={-24} y={-alto / 2 - 18} width={48} height={20} rx={6} fill={c.apagado} />
      <rect x={-60} y={-alto / 2} width={120} height={alto} rx={18} fill={c.apagado} />
      <rect x={-48} y={alto / 2 - 12 - (alto - 24) * cl(v)} width={96} height={(alto - 24) * cl(v)} rx={10} fill={col} />
    </g>
  );
};

/* Diana con flecha clavada; `u` 0..1 lleva la flecha. (x, y) es el centro. */
export const Diana: React.FC<{ x: number; y: number; r?: number; u?: number; op?: number }> = ({ x, y, r = 120, u = 1, op = 1 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      {[1, 0.75, 0.5, 0.25].map((f, k) => <circle key={f} r={r * f} fill={k % 2 ? '#ffffff' : '#e5484d'} />)}
      {u > 0.01 && <g transform={`translate(${lerp(-420, 0, u)} 0)`}><rect x={-160} y={-4} width={160} height={8} rx={4} fill="#475569" /><path d="M -170 -16 L -150 0 L -170 16 L -140 0 Z" fill={NARANJA} /></g>}
    </g>
  );

/* Puerta con marco; `abre` 0..1. (x, y) es la base; ~2,1 m (≈ 205) de alto. */
export const Puerta: React.FC<{ x: number; y: number; abre?: number; color?: string; op?: number; texto?: string; c: C }> = ({ x, y, abre = 0, color = '#a16b3f', op = 1, texto, c }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <rect x={-56} y={-212} width={112} height={212} rx={6} fill={c.apagado} />
      <rect x={-48} y={-204} width={96 * (1 - 0.8 * abre)} height={204} rx={4} fill={color} />
      <circle cx={-48 + 96 * (1 - 0.8 * abre) - 14} cy={-100} r={5} fill="#fbbf24" />
      {texto && <Txt x={0} y={-226} textAnchor="middle" fontSize={22} fill={c.texto}>{texto}</Txt>}
    </g>
  );

/* Brillo (destello) de cuatro puntas. */
export const Destello: React.FC<{ x: number; y: number; r?: number; op?: number; color?: string }> = ({ x, y, r = 14, op = 1, color = '#fde68a' }) =>
  op < 0.01 ? null : <path d={`M ${x} ${y - r} L ${x + r * 0.28} ${y - r * 0.28} L ${x + r} ${y} L ${x + r * 0.28} ${y + r * 0.28} L ${x} ${y + r} L ${x - r * 0.28} ${y + r * 0.28} L ${x - r} ${y} L ${x - r * 0.28} ${y - r * 0.28} Z`} fill={color} opacity={op} />;

/* Fondo de paisaje simple: cielo degradado suave y colinas. */
export const Colinas: React.FC<{ y: number; isDark: boolean; op?: number; t?: number }> = ({ y, isDark, op = 1, t = 0 }) => (
  <g opacity={op}>
    <path d={`M 0 ${y} Q 200 ${y - 90} 420 ${y - 30} Q 640 ${y - 120} 860 ${y - 40} Q 1040 ${y - 100} 1200 ${y - 30} V ${y + 200} H 0 Z`} fill={isDark ? '#1f3b2c' : '#bbf7d0'} />
    <path d={`M 0 ${y + 30} Q 300 ${y - 20} 600 ${y + 20} Q 900 ${y - 10} 1200 ${y + 30} V ${y + 200} H 0 Z`} fill={isDark ? '#14532d' : '#86efac'} />
    <circle cx={1040 + 6 * Math.sin(t * 0.3)} cy={y - 230} r={44} fill="#fde68a" opacity={0.85} />
  </g>
);

export { NARANJA, ROSA, GRIS };
