import React from 'react';
import { NARANJA, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Chip, e1, lerp, ROJO_M, VERDE, AZUL_M } from './comunLS';

/**
 * La fábrica de Toyota (primer acto de «De Toyota a las empresas emergentes»), contada como tomas de cámara:
 * 1) el logo de Toyota; 2) la fábrica se levanta por fuera y la cámara entra por el portón; 3) la línea de
 * montaje por dentro: chasis, grúa con la carrocería, robot soldador, cabina de pintura y la operaria que pone
 * las ruedas; «magro» deshincha las existencias, los costes bajan en la pantalla de la pared, lo defectuoso cae
 * al contenedor de la muda y el tablero andon enciende las siete fuentes de despilfarro; 4) la cámara sale y,
 * con el auge del consumo, los autos fluyen hacia la ciudad cada vez más rápido.
 */

const TOYOTA = '#eb0a1e';
const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const sm = (x: number, a: number, b: number) => { const u = cl((x - a) / (b - a)); return u * u * (3 - 2 * u); };
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, u: number) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * u)).join(',')})`; };
const ell = (cx: number, cy: number, rx: number, ry: number) => `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`;

/* Logo de Toyota (versión plana): óvalo exterior, óvalo horizontal arriba y óvalo vertical al centro, que juntos
   forman la T. Trazo grueso a los lados y fino arriba y abajo, como el original. Mide 200 × 132 en s = 1. */
const ANILLOS = [
  ell(0, 0, 100, 64) + ell(0, 0.4, 86, 57.5),
  ell(0, -28, 74, 20.5) + ell(0, -29.8, 57.5, 12.3),
  ell(0, 2.2, 22.8, 56.6) + ell(0, 2.6, 13.2, 43),
];
export const LogoToyota: React.FC<{ x: number; y: number; s?: number; op?: number; brillo?: number; id: string; disco?: number; color?: string; giro?: number }> = ({ x, y, s = 1, op = 1, brillo = -1, id, disco = 0, color = TOYOTA, giro = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    {disco > 0 && <circle r={disco} fill="#ffffff" style={sombra(0.28, 6, 16)} />}
    <g transform={`scale(${giro} 1)`}>
      <defs><clipPath id={`${id}-lg`}>{ANILLOS.map((d, k) => <path key={k} d={d} clipRule="evenodd" />)}</clipPath></defs>
      {ANILLOS.map((d, k) => <path key={k} d={d} fillRule="evenodd" fill={color} />)}
      {brillo >= 0 && brillo <= 1 && <g clipPath={`url(#${id}-lg)`}><rect x={-150 + 300 * brillo} y={-90} width={30} height={180} fill="#ffffff" opacity={0.8} transform="skewX(-20)" /></g>}
    </g>
  </g>
);

/* Un Toyota de perfil: según las etapas se ve el chasis, la carrocería, la pintura, las ruedas y las luces. (x, y) es la base. */
const Coche: React.FC<{ x: number; y: number; s?: number; carro: number; pint: number; ruedas: number; luces: number; giro: number; op?: number; id: string }> = ({ x, y, s = 1, carro, pint, ruedas, luces, giro, op = 1, id }) => {
  const cuerpo = mix('#9aa5b1', TOYOTA, pint);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <rect x={-78} y={-27} width={158} height={13} rx={6} fill="#334155" />
      <rect x={-60} y={-31} width={120} height={6} rx={3} fill="#64748b" />
      {carro > 0.01 && (
        <g transform={`translate(0 ${-(1 - carro) * 120})`}>
          <path d="M -78 -22 V -40 Q -78 -50 -64 -52 L -34 -56 L -14 -82 Q -10 -86 -2 -86 H 34 Q 42 -86 48 -80 L 62 -58 L 72 -54 Q 80 -50 80 -40 V -22 Z" fill={cuerpo} />
          <path d="M 2 -86 H 34 Q 42 -86 48 -80 L 62 -58 L 72 -54 Q 80 -50 80 -40 V -22 H 2 Z" fill="#000" opacity={0.12} />
          <path d="M -76 -38 H 78" stroke="#000" strokeWidth={2} opacity={0.12} />
          <path d="M -22 -57 L -9 -78 H 12 V -57 Z" fill="#cfe8ff" /><path d="M 20 -78 H 33 Q 38 -78 42 -73 L 52 -57 H 20 Z" fill="#cfe8ff" />
          <path d="M -20 -60 L -12 -74" stroke="#fff" strokeWidth={3} opacity={0.6} strokeLinecap="round" />
          <rect x={-73} y={-35} width={6} height={9} rx={2} fill={luces > 0.5 ? '#ff4d4f' : '#7f1d1d'} />
          <circle cx={75} cy={-42} r={5.5} fill={luces > 0.5 ? '#fff3a3' : '#94a3b8'} />
          {pint > 0.95 && <g><circle cx={60} cy={-40} r={8} fill="#fff" /><LogoToyota x={60} y={-40} s={0.065} id={`${id}-m`} /></g>}
        </g>
      )}
      {[-44, 46].map((cx) => (
        <g key={cx} transform={`translate(${cx} ${-17 + (1 - ruedas) * 30}) scale(${0.2 + 0.8 * ruedas})`} opacity={ruedas}>
          <circle r={17} fill="#1f2937" /><circle r={9} fill="#cbd5e1" />
          <g transform={`rotate(${giro})`}>{[0, 90, 180, 270].map((a) => <circle key={a} cx={0} cy={-5} r={1.8} fill="#475569" transform={`rotate(${a})`} />)}</g>
        </g>
      ))}
    </g>
  );
};

/* Brazo robótico colgado de la viga (base en y = by). Devuelve codo y punta. */
const brazo = (x: number, by: number, t: number, vivo: number, fase: number) => {
  const a = 0.22 + 0.28 * Math.sin(t * 2.2 + fase) * vivo, b = a + 0.45 * Math.sin(t * 2.2 + fase + 1.3) * vivo - 0.1;
  const p1: [number, number] = [x + 92 * Math.sin(a), by + 92 * Math.cos(a)];
  const p2: [number, number] = [p1[0] + 80 * Math.sin(b), p1[1] + 80 * Math.cos(b)];
  return { p1, p2, b };
};

const Robot: React.FC<{ x: number; by: number; t: number; vivo: number; fase: number; herramienta: 'soldar' | 'pintar'; cerca: number }> = ({ x, by, t, vivo, fase, herramienta, cerca }) => {
  const { p1, p2, b } = brazo(x, by, t, vivo, fase);
  const [tx, ty] = p2;
  return (
    <g>
      <rect x={x - 26} y={by - 14} width={52} height={24} rx={8} fill="#334155" />
      <line x1={x} y1={by} x2={p1[0]} y2={p1[1]} stroke={NARANJA} strokeWidth={22} strokeLinecap="round" />
      <line x1={x} y1={by} x2={p1[0]} y2={p1[1]} stroke="#000" strokeWidth={6} strokeLinecap="round" opacity={0.12} transform="translate(5 0)" />
      <line x1={p1[0]} y1={p1[1]} x2={tx} y2={ty} stroke="#f59e0b" strokeWidth={16} strokeLinecap="round" />
      <circle cx={p1[0]} cy={p1[1]} r={13} fill="#334155" /><circle cx={x} cy={by} r={12} fill="#334155" />
      <g transform={`translate(${tx} ${ty}) rotate(${(-b * 180) / Math.PI})`}><rect x={-8} y={0} width={16} height={22} rx={5} fill={herramienta === 'soldar' ? '#475569' : '#64748b'} /></g>
      {herramienta === 'soldar' && cerca > 0.05 && Array.from({ length: 9 }, (_, i) => {
        const h = Math.floor(t * 16) + i * 7, dx = Math.sin(h * 12.9898) * 30, dy = Math.abs(Math.sin(h * 78.233)) * 34;
        return <circle key={i} cx={tx + dx} cy={ty + 24 + dy} r={2.4 + (i % 3)} fill={i % 2 ? '#fde047' : '#fb923c'} opacity={cerca} />;
      })}
      {herramienta === 'soldar' && cerca > 0.05 && <circle cx={tx} cy={ty + 24} r={12 + 3 * Math.sin(t * 40)} fill="#fff7d6" opacity={0.8 * cerca} />}
      {herramienta === 'pintar' && cerca > 0.05 && (
        <g opacity={cerca}>
          <path d={`M ${tx} ${ty + 22} L ${tx - 40} ${ty + 96} L ${tx + 40} ${ty + 96} Z`} fill={TOYOTA} opacity={0.3} />
          {Array.from({ length: 7 }, (_, i) => { const u = (t * 2.4 + i / 7) % 1; return <circle key={i} cx={tx + (i - 3) * 12 * u} cy={ty + 22 + 74 * u} r={3.6 - 1.6 * u} fill={TOYOTA} opacity={1 - u * 0.6} />; })}
        </g>
      )}
    </g>
  );
};

type Nombre = 'y1972' | 'signif' | 'disminuir' | 'muda' | 'siete' | 'auge';

export const FabricaToyota: React.FC<{ t: number; isDark: boolean; M: (n: Nombre) => number; id: string }> = ({ t, isDark, M, id }) => {
  const c = tono(isDark);
  const t0 = M('y1972'), tA = M('auge'), tD = M('disminuir'), tS = M('signif'), tM = M('muda'), t7 = M('siete');
  const tIn = t0 + 3.2;                        // la cámara entra a la nave
  const vista1 = 1 - sm(t, tIn, tIn + 0.9);    // logo + exterior
  const vista2 = sm(t, tIn, tIn + 0.9) * (1 - sm(t, tA, tA + 0.9));
  const vista3 = sm(t, tA, tA + 0.9);          // exterior con la salida de autos

  /* Colores del lugar. */
  const fachada = isDark ? '#3a4350' : '#e3e8ef', techo = isDark ? '#5b6676' : '#94a3b8', suelo = isDark ? '#2a2f37' : '#cfd6df';
  const pared = isDark ? '#2b323d' : '#e9edf3', acero = isDark ? '#8294b3' : '#475569';

  /* --- Toma 1 y 2: logo y exterior --- */
  const hero = pop(t, 0.3, 0.9);
  const giroLogo = Math.cos((1 - sm(t, 0.3, 1.1)) * Math.PI / 2);
  const u = sm(t, t0 - 0.1, t0 + 0.9);
  const lx = lerp(600, 470, u), ly = lerp(400, 388, u), ls = lerp(1.5, 0.42, u);
  const sube = (k: number) => sm(t, t0 + 0.1 + k * 0.15, t0 + 0.7 + k * 0.15);
  const zoom1 = 1 + 1.6 * sm(t, tIn - 0.2, tIn + 0.9);

  /* --- Toma 3: la línea por dentro --- */
  const vel = 75;
  const dist = Math.max(0, t - t0) * vel;
  const vivo = sm(t, tIn, tIn + 1);
  const xs = [0, 1, 2, 3, 4].map((k) => -110 + ((((dist + k * 290) % 1450) + 1450) % 1450));
  const cerca = (px: number) => Math.max(0, ...xs.map((x) => Math.max(0, 1 - Math.abs(x - px) / 60)));
  const giro = (dist / 21) * (180 / Math.PI);
  const zoom2 = lerp(1.18, 1, sm(t, tIn, tIn + 1)) * lerp(1, 0.7, sm(t, tA, tA + 0.9));
  const yb = 640;                              // altura de la cinta

  const cajas = Array.from({ length: 10 }, (_, k) => {
    const entra = e1(t, tS + k * 0.1, 0.4);
    const sale = k >= 3 ? ac(t, tS + 1.5 + (9 - k) * 0.4, tS + 1.9 + (9 - k) * 0.4) : 0;
    return { k, op: entra * (1 - sale), dy: -30 * sale };
  });
  const costes = ac(t, tD + 0.4, tD + 5);
  const lamparas = (k: number) => e1(t, t7 + 0.3 + k * 0.42, 0.35);

  /* --- Toma 4: salida de autos con el auge --- */
  const ta = Math.max(0, t - tA);
  const dist3 = 90 * ta + 22 * ta * ta;
  const autos = [0, 1, 2, 3, 4, 5].map((k) => 720 + ((dist3 + k * 140) % 840));

  /* Fábrica exterior (común a las tomas 2 y 4). */
  const Exterior = (base: number) => (
    <g>
      <rect x={30} y={640} width={1140} height={150} rx={20} fill={suelo} />
      <rect x={30} y={690} width={1140} height={50} fill={isDark ? '#1f2329' : '#9aa5b4'} />
      {Array.from({ length: 12 }, (_, k) => <rect key={k} x={50 + k * 96} y={712} width={50} height={6} rx={3} fill="#fbbf24" opacity={0.9} />)}
      {[[90, 600, 34], [150, 612, 26]].map(([x, y, r], k) => <g key={k} opacity={sube(5) * base}><rect x={x - 5} y={y} width={10} height={40} rx={4} fill="#7c4a1e" /><circle cx={x} cy={y - r * 0.4} r={r} fill={k ? '#16a34a' : '#22c55e'} /></g>)}
      <g transform={`translate(0 ${640 * (1 - sube(0))}) scale(1 ${sube(0)})`}>
        <rect x={190} y={330} width={600} height={310} rx={10} fill={fachada} style={sombra(c.sombra, 8, 18)} />
        <rect x={490} y={330} width={300} height={310} fill="#000" opacity={0.05} />
        {Array.from({ length: 6 }, (_, k) => <rect key={k} x={215 + k * 66} y={470} width={44} height={56} rx={6} fill="#fde68a" opacity={0.85} />)}
        <rect x={190} y={600} width={600} height={40} fill="#000" opacity={0.06} />
        <rect x={640} y={480} width={130} height={160} rx={8} fill={isDark ? '#1f2329' : '#64748b'} />
        {Array.from({ length: 6 }, (_, k) => <rect key={k} x={646} y={490 + k * 24} width={118} height={4} rx={2} fill="#000" opacity={0.15} />)}
      </g>
      {Array.from({ length: 5 }, (_, k) => { const e = sube(1 + k * 0.4); return <path key={k} d={`M ${190 + k * 120} 332 L ${190 + k * 120} ${332 - 70 * e} L ${310 + k * 120} 332 Z`} fill={techo} />; })}
      {Array.from({ length: 5 }, (_, k) => { const e = sube(1 + k * 0.4); return <path key={k} d={`M ${194 + k * 120} ${332 - 8 * e} L ${194 + k * 120} ${332 - 62 * e} L ${236 + k * 120} ${332 - 38 * e} Z`} fill="#bfe3ff" opacity={0.75} />; })}
      <g opacity={sube(4)}>
        <rect x={720} y={180} width={40} height={160} rx={6} fill={techo} /><rect x={714} y={176} width={52} height={14} rx={5} fill="#64748b" />
        {[0, 1, 2].map((k) => { const ph = (t * 0.35 + k / 3) % 1; return <circle key={k} cx={740 + 40 * ph} cy={165 - 90 * ph} r={14 + 26 * ph} fill={isDark ? '#6b7280' : '#cbd5e1'} opacity={0.8 * (1 - ph)} />; })}
      </g>
    </g>
  );

  return (
    <g>
      {/* TOMA 1–2 · logo y fábrica por fuera; la cámara entra por el portón */}
      {vista1 > 0.01 && (
        <g opacity={vista1} transform={`translate(705 560) scale(${zoom1}) translate(-705 -560)`}>
          {t >= t0 && Exterior(1)}
          {t >= t0 && <Chip x={980} y={390} texto="1972" c={c} id={id} op={e1(t, t0 + 0.5)} marca />}
          <LogoToyota x={lx} y={ly} s={ls * Math.min(1.06, hero)} id={id} disco={u > 0.5 ? 118 : 0} giro={giroLogo} op={Math.min(1, hero * 2)} brillo={sm(t, 1.3, 2.3) > 0 && sm(t, 1.3, 2.3) < 1 ? sm(t, 1.3, 2.3) : -1} />
          {u < 1 && <Txt x={600} y={lerp(560, 520, u)} textAnchor="middle" fontSize={64} letterSpacing={18} fill={TOYOTA} opacity={sm(t, 0.9, 1.5) * (1 - u)}>TOYOTA</Txt>}
        </g>
      )}

      {/* TOMA 3 · la línea de montaje por dentro */}
      {vista2 > 0.01 && (
        <g opacity={vista2} transform={`translate(600 470) scale(${zoom2}) translate(-600 -470)`}>
          <defs><clipPath id={`${id}-nave`}><rect x={30} y={130} width={1140} height={690} rx={26} /></clipPath></defs>
          <g clipPath={`url(#${id}-nave)`}>
            <rect x={30} y={130} width={1140} height={690} fill={pared} />
            {Array.from({ length: 5 }, (_, k) => <rect key={k} x={140 + k * 240} y={130} width={18} height={530} fill="#000" opacity={0.05} />)}
            <rect x={30} y={130} width={1140} height={26} fill={isDark ? '#1f2329' : '#94a3b8'} />
            {[260, 600, 940].map((x) => <g key={x}><rect x={x - 2} y={156} width={4} height={14} fill="#64748b" /><path d={`M ${x - 26} 178 Q ${x} 160 ${x + 26} 178 Z`} fill="#64748b" /><path d={`M ${x - 22} 178 L ${x - 90} 330 H ${x + 90} L ${x + 22} 178 Z`} fill="#fef9c3" opacity={isDark ? 0.07 : 0.35} /></g>)}
            <rect x={30} y={660} width={1140} height={160} fill={suelo} />
            {Array.from({ length: 24 }, (_, k) => <path key={k} d={`M ${30 + k * 50} 672 l 26 0 l -12 14 l -26 0 Z`} fill="#fbbf24" opacity={0.8} />)}

            {/* letrero de Toyota en la pared */}
            <rect x={70} y={180} width={230} height={120} rx={16} fill="#ffffff" style={sombra(0.2, 4, 10)} />
            <LogoToyota x={185} y={240} s={0.62} id={`${id}-p`} />

            {/* viga y cabina de pintura */}
            <rect x={30} y={330} width={1140} height={18} fill="#64748b" />
            <rect x={30} y={346} width={1140} height={4} fill="#fbbf24" />
            <rect x={680} y={350} width={170} height={yb - 350} fill={isDark ? '#93c5fd' : '#bfdbfe'} opacity={0.18} />
            <rect x={676} y={350} width={8} height={yb - 350} fill="#64748b" /><rect x={846} y={350} width={8} height={yb - 350} fill="#64748b" />

            {/* cinta */}
            <rect x={30} y={yb} width={1140} height={22} fill={acero} />
            {Array.from({ length: 30 }, (_, i) => <rect key={i} x={30 + ((i * 48 + dist) % 1440) - 48} y={yb + 6} width={28} height={10} rx={5} fill="#94a3b8" />)}

            {/* autos */}
            {xs.map((x, k) => (
              <Coche key={k} x={x} y={yb} s={1.2} id={`${id}${k}`}
                carro={sm(x, 210, 320)} pint={sm(x, 690, 835)} ruedas={sm(x, 935, 1015)} luces={sm(x, 1040, 1080)} giro={giro} />
            ))}
            {/* grúa que baja la carrocería */}
            {xs.map((x, k) => { const b = sm(x, 210, 320); if (b <= 0.01 || b >= 0.99) return null; const top = yb - 1.2 * (86 + (1 - b) * 120); return <g key={k}><rect x={x - 20} y={348} width={40} height={12} rx={4} fill="#334155" /><line x1={x - 14} y1={360} x2={x - 30} y2={top} stroke="#334155" strokeWidth={4} /><line x1={x + 14} y1={360} x2={x + 30} y2={top} stroke="#334155" strokeWidth={4} /></g>; })}

            <Robot x={520} by={358} t={t} vivo={vivo} fase={0} herramienta="soldar" cerca={cerca(520) * vivo} />
            <Robot x={765} by={358} t={t} vivo={vivo} fase={1.8} herramienta="pintar" cerca={cerca(765) * vivo} />

            {/* operaria que pone las ruedas */}
            <g>
              <Persona id={id} x={975} y={800} s={0.62} cuerpo={AZUL_M} />
              <path d="M 950 698 Q 975 670 1000 698 Z" fill="#fbbf24" /><rect x={946} y={694} width={58} height={8} rx={4} fill="#f59e0b" />
              <line x1={995} y1={740} x2={1010 + 8 * Math.sin(t * 6) * vivo} y2={690} stroke="#f7c4a0" strokeWidth={9} strokeLinecap="round" />
              <rect x={1003 + 8 * Math.sin(t * 6) * vivo} y={672} width={12} height={22} rx={4} fill="#475569" />
            </g>

            {/* existencias que se deshinchan («magro») */}
            {t >= tS && (
              <g>
                <rect x={70} y={790} width={220} height={12} rx={4} fill="#92400e" opacity={e1(t, tS)} />
                {cajas.map(({ k, op, dy }) => op > 0.01 && (
                  <g key={k} transform={`translate(${100 + (k % 4) * 52 + (Math.floor(k / 4) % 2) * 26} ${770 - Math.floor(k / 4) * 42 + dy})`} opacity={op}>
                    <rect x={-24} y={-20} width={48} height={40} rx={6} fill="#b7791f" /><rect x={-24} y={-20} width={48} height={10} rx={4} fill="#d69e2e" /><rect x={-5} y={-20} width={10} height={40} fill="#92400e" opacity={0.45} />
                  </g>
                ))}
              </g>
            )}

            {/* contenedor del despilfarro */}
            {t >= tD && (
              <g opacity={e1(t, tD)}>
                <path d="M 560 712 H 700 L 688 800 H 572 Z" fill="#64748b" /><path d="M 630 712 H 700 L 688 800 H 630 Z" fill="#000" opacity={0.15} /><rect x={552} y={702} width={156} height={14} rx={6} fill="#94a3b8" />
                {[0, 1, 2].map((k) => {
                  const ph = ((t - tD) / 1.5 + k / 3) % 1, px = lerp(530, 630, ph), py = lerp(yb - 10, 712, ph) - 80 * Math.sin(Math.PI * ph);
                  return <rect key={k} x={px - 12} y={py - 12} width={24} height={24} rx={5} fill={ROJO_M} transform={`rotate(${ph * 280} ${px} ${py})`} opacity={ph > 0.9 ? (1 - ph) * 10 : 1} />;
                })}
                {t >= tM && (() => { const q = ac(t, tM, tM + 0.35); return <g transform={`translate(630 760) rotate(-6) scale(${lerp(1.8, 1, q)})`} opacity={q}><rect x={-62} y={-24} width={124} height={48} rx={10} fill={ROJO_M} /><Txt x={0} y={13} textAnchor="middle" fontSize={36} fill="#fff">MUDA</Txt></g>; })()}
              </g>
            )}

            {/* pantalla de costes en la pared */}
            {t >= tD && (
              <g opacity={e1(t, tD)}>
                <rect x={890} y={176} width={240} height={136} rx={14} fill="#1f2937" style={sombra(0.25, 4, 10)} />
                <Txt f="a" x={912} y={214} fontSize={28} fill="#e5e7eb">Costes</Txt>
                <polyline points={[0, 1, 2, 3, 4, 5].map((k) => `${915 + k * 38},${236 + (k / 5) * 54 * costes + 6 * Math.sin(k * 2)}`).join(' ')} fill="none" stroke={VERDE} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
                <path d={`M 1088 ${196 + 40 * costes} h 24 l -12 18 Z`} fill={VERDE} />
              </g>
            )}

            {/* tablero andon con las siete fuentes */}
            {t >= t7 && (() => { const b = e1(t, t7, 0.5); return (
              <g transform={`translate(0 ${-120 * (1 - b)})`} opacity={b}>
                <line x1={420} y1={156} x2={420} y2={196} stroke="#64748b" strokeWidth={4} /><line x1={780} y1={156} x2={780} y2={196} stroke="#64748b" strokeWidth={4} />
                <rect x={380} y={196} width={440} height={96} rx={14} fill="#111827" style={sombra(0.3, 4, 10)} />
                {Array.from({ length: 7 }, (_, k) => { const l = lamparas(k); return <g key={k}><circle cx={420 + k * 60} cy={244} r={22} fill={l > 0.05 ? ROJO_M : '#374151'} style={l > 0.5 ? { filter: `drop-shadow(0 0 ${8 + 3 * Math.sin(t * 5 + k)}px #f87171)` } : undefined} /><Txt x={420 + k * 60} y={254} textAnchor="middle" fontSize={28} fill={l > 0.05 ? '#fff' : '#9ca3af'}>{k + 1}</Txt></g>; })}
              </g>
            ); })()}
          </g>
        </g>
      )}

      {/* TOMA 4 · auge del consumo: los autos salen hacia la ciudad */}
      {vista3 > 0.01 && (
        <g opacity={vista3} transform={`translate(600 470) scale(${lerp(1.25, 1, vista3)}) translate(-600 -470)`}>
          {[[900, 470, 70, 170], [975, 420, 60, 220], [1045, 500, 70, 140], [1110, 450, 50, 190]].map(([x, y, w, h], k) => (
            <g key={k}><rect x={x - w / 2} y={640 - h} width={w} height={h} rx={6} fill={isDark ? '#4b5563' : '#94a3b8'} />{Array.from({ length: Math.floor(h / 40) }, (_, r) => <rect key={r} x={x - w / 2 + 10} y={640 - h + 14 + r * 40} width={w - 20} height={14} rx={3} fill="#fde68a" opacity={0.8} />)}</g>
          ))}
          {Exterior(1)}
          <LogoToyota x={470} y={388} s={0.42} id={`${id}-f`} disco={118} />
          <polyline points={`860,330 940,310 1010,270 1080,220 1130,170`} fill="none" stroke={VERDE} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" pathLength={1} strokeDashoffset={1 - ac(t, tA + 0.6, tA + 2.4)} />
          <path d="M 1146 150 L 1118 162 L 1140 182 Z" fill={VERDE} opacity={sm(t, tA + 2.2, tA + 2.5)} />
          {autos.map((x, k) => <Coche key={k} x={x} y={735} s={0.72} carro={1} pint={1} ruedas={1} luces={1} giro={(dist3 / 17) * 57} id={`${id}a${k}`} op={sm(x, 720, 780) * (1 - sm(x, 1060, 1120))} />)}
        </g>
      )}
    </g>
  );
};
