import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, Calendario, Edificio, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, VERDE, VIOLETA, Mar } from './comunLS';
import { Toma, Letrero, Apoyo, Reloj, Corazon, Cohete, PilaMonedas, Visto, Cruz, sm, azar } from './kitLS';
import type { PropsCE } from './comunLS';

/**
 * «La incertidumbre y el ciclo de feedback», escena propia en seis tomas.
 * 1 · El velero de la startup en un mar de incertidumbre: rumbo a una estrella (potencial), tormenta y rocas
 *     (riesgos), la brújula de los dirigentes que duda y mejoras que se suman al barco sin parar.
 * 2 · Los tres rasgos en un tablero: cronómetro, cliente y matraz.
 * 3 · El bucle: una pista con el taller (crear), la estación de medida y la de aprender; el producto la
 *     recorre en un carrito, la pista se acorta y bajan las pérdidas de tiempo, dinero y energía.
 * 4 · A empujones: el velero corrige el rumbo con lo que le indican los clientes; el cohete lanzado por todo
 *     lo alto cae al mar.
 * 5 · Un grupo reducido bajo el foco, entre una multitud: más barato y con la lupa que encuentra el error.
 * 6 · Los menús saludables: el carrito en vez de la cocina industrial, cinco platos a dos oficinas, dos
 *     semanas, la libreta de lo que piden, dejan y repiten, que vale más que un año de planos.
 */

const ID = 'ls3';
const nombres = ['joven', 'potencial', 'riesgos', 'cuestion', 'innov', 'rasgos', 'rapido', 'deseos', 'ciencia', 'ciclo', 'cma', 'crea', 'mide', 'aprende', 'reducir', 'perdidas',
  'empujones', 'rectif', 'todoalto', 'grupo', 'coste', 'errores', 'ejemplo', 'menus', 'cocina', 'cinco', 'dosof', 'dossem', 'piden', 'planos', 'pregunta'] as const;
type N = typeof nombres[number];

/* Velero de la startup: casco de marca, velas, tripulación y mejoras que se le suman. (x, y) es la línea de agua. */
const Velero: React.FC<{ x: number; y: number; s?: number; t: number; id: string; rot?: number; mejoras?: number; tripulantes?: boolean; cuerpo: string }> = ({ x, y, s = 1, t, id, rot = 0, mejoras = 0, tripulantes = true, cuerpo }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-4} y={-230} width={8} height={230} rx={4} fill="#4b5563" />
    <g style={{ filter: 'drop-shadow(0 0 2.5px rgba(30,41,59,0.5))' }}>
      <path d={`M 8 -222 Q ${70 + 8 * Math.sin(t * 2)} -140 8 -40 Z`} fill={mejoras > 1.5 ? `url(#${id}-marca)` : '#ffffff'} />
      <path d={`M -8 -200 Q ${-60 - 6 * Math.sin(t * 2)} -130 -8 -50 Z`} fill="#ffffff" opacity={0.92} />
    </g>
    {mejoras > 0.5 && <path d={`M 4 -230 L ${40 + 4 * Math.sin(t * 6)} -220 L 4 -210 Z`} fill={VERDE} />}
    {tripulantes && <g><Persona id={id} x={-46} y={-12} s={0.32} cuerpo={cuerpo} corbata /><Persona id={id} x={42} y={-12} s={0.32} cuerpo={VIOLETA} /></g>}
    <path d="M -130 -20 H 130 Q 120 30 80 40 H -80 Q -120 30 -130 -20 Z" fill={`url(#${id}-marca)`} />
    <path d="M 0 -20 H 130 Q 120 30 80 40 H 0 Z" fill="#000" opacity={0.12} />
    {[-70, -20, 30, 80].map((cx) => <circle key={cx} cx={cx} cy={4} r={7} fill="#fff" opacity={0.7} />)}
    {mejoras > 2.5 && <g transform="translate(-140 24)"><rect x={-6} y={-6} width={16} height={12} fill="#475569" /><g transform={`rotate(${t * 720})`}><ellipse rx={4} ry={16} fill="#94a3b8" /></g></g>}
    {mejoras > 3.5 && <g transform="translate(-90 -44)"><rect x={-30} y={-6} width={60} height={20} rx={3} fill="#1e3a8a" />{[0, 1, 2].map((k) => <rect key={k} x={-26 + k * 19} y={-3} width={15} height={14} fill="#3b82f6" />)}</g>}
  </g>
);

export const CicloLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('planos') + 3 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);
  const traje = isDark ? '#8da2c0' : '#334155';
  const agua = isDark ? '#1d4ed8' : '#93c5fd', aguaO = isDark ? '#1e3a8a' : '#60a5fa';
  const niebla = isDark ? '#4b5563' : '#e2e8f0';

  const rotulos: [number, string][] = [
    [0.2, 'Vivir en la incertidumbre'], [M('potencial'), 'Gran potencial'], [M('riesgos'), 'Incertidumbre y riesgos'], [M('cuestion'), 'Cuestionarse siempre'], [M('innov'), 'Innovar sin parar'],
    [M('rasgos'), 'Tres rasgos'], [M('rapido'), 'Un ciclo muy rápido'], [M('deseos'), 'Lo que desea el cliente'], [M('ciencia'), 'Decisiones con ciencia'],
    [M('ciclo'), 'Ciclo de feedback'], [M('crea'), 'Crear'], [M('mide'), 'Medir'], [M('aprende'), 'Aprender'], [M('reducir'), 'Un ciclo más corto'], [M('perdidas'), 'Menos pérdidas'],
    [M('empujones'), 'A empujones'], [M('rectif'), 'Rectificar con el cliente'], [M('todoalto'), 'Por todo lo alto'], [M('grupo'), 'Un grupo reducido'], [M('coste'), 'Menor coste'], [M('errores'), 'Errores a tiempo'],
    [M('ejemplo'), 'Ejemplo imaginario'], [M('menus'), 'Menús saludables'], [M('cocina'), 'Sin cocina industrial'], [M('cinco'), 'Cinco menús, dos oficinas'], [M('dossem'), 'Dos semanas'], [M('piden'), 'Qué piden'], [M('planos'), 'Más que un año de planos'],
  ];

  /* Toma 1 */
  const rumbo = ac(t, M('potencial'), M('potencial') + 1.8);
  const rayo = (k: number) => { const ph = ((t - M('riesgos')) * 0.7 + k * 0.5) % 1; return t >= M('riesgos') && ph < 0.12; };
  const balanceo = Math.sin(t * 1.4) * (3 + 3 * ac(t, M('riesgos'), M('riesgos') + 1));
  const mejoras = t < M('innov') ? 0 : 1 + (t - M('innov')) / 0.9;
  const aguja = t < M('cuestion') ? 20 : 20 + 200 * Math.sin((t - M('cuestion')) * 1.7) * Math.exp(-0.05 * (t - M('cuestion')));

  /* Toma 3: pista */
  const red = ac(t, M('reducir'), M('reducir') + 2.2);
  const R = lerp(220, 140, red), RY = R * 0.62;
  const cx0 = 470, cy0 = 520;
  const vuelta = t > M('ciclo') ? (t < M('reducir') ? (t - M('ciclo')) * 0.12 : (M('reducir') - M('ciclo')) * 0.12 + (t - M('reducir')) * lerp(0.12, 0.42, red)) : 0;
  const pos = (a: number): [number, number] => [cx0 + R * Math.cos(a), cy0 + RY * Math.sin(a)];
  const estAng = [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6];
  const activo = t < M('crea') ? -1 : t < M('mide') ? 0 : t < M('aprende') ? 1 : t < M('reducir') ? 2 : Math.floor((((vuelta % 1) + 1) % 1) * 3);
  const colEst = [NARANJA, AZUL_M, ROSA];

  /* Toma 4: rumbo a empujones */
  const pasos = 9;
  const avance = ac(t, M('empujones') + 0.3, M('todoalto') + 3);
  const curso = (u: number): [number, number] => [lerp(160, 940, u), lerp(560, 520, u) + 50 * Math.sin(u * Math.PI * 4) * (1 - u)];
  const lanz = ac(t, M('todoalto') + 0.3, M('todoalto') + 2.8, 0, 1);
  const arco = (u: number): [number, number] => [lerp(120, 820, u), 540 - 4 * 400 * u * (1 - u)];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="El ciclo de feedback: crear, medir y aprender">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · el velero en la incertidumbre */}
            <Toma t={t} a={-1} b={M('rasgos')} zi={1}>
              {t >= M('potencial') && (
                <g opacity={e1(t, M('potencial'))}>
                  <path d="M 640 470 Q 860 380 1040 250" stroke={NARANJA} strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray="2 18" pathLength={1000} strokeDashoffset={1000 * (1 - rumbo)} />
                  <g transform={`translate(1050 230) rotate(${t * 30}) scale(${0.9 + 0.1 * Math.sin(t * 4)})`}><circle r={60} fill="#fde047" opacity={0.25} /><path d="M 0 -42 L 11 -12 L 42 -12 L 17 7 L 26 38 L 0 19 L -26 38 L -17 7 L -42 -12 L -11 -12 Z" fill="#fbbf24" /></g>
                  <Letrero x={1050} y={330} texto="Potencial" id={ID} op={sm(t, M('potencial') + 1.2, M('potencial') + 1.7)} />
                </g>
              )}
              {t >= M('riesgos') && (
                <g opacity={e1(t, M('riesgos'))}>
                  <g transform={`translate(${280 + 14 * Math.sin(t * 0.6)} 220)`}>
                    <circle cx={-70} cy={10} r={50} fill="#64748b" /><circle cx={0} cy={-16} r={66} fill="#64748b" /><circle cx={76} cy={8} r={52} fill="#64748b" /><rect x={-118} y={10} width={246} height={52} rx={26} fill="#64748b" />
                    {[0, 1].map((k) => rayo(k) ? <path key={k} d={`M ${-36 + k * 70} 56 l -18 54 h 22 l -14 58 l 48 -76 h -24 l 16 -36 Z`} fill="#fde047" /> : null)}
                    {Array.from({ length: 10 }, (_, k) => { const ph = (t * 1.6 + azar(k)) % 1; return <rect key={k} x={-100 + k * 22} y={66 + 120 * ph} width={3} height={14} rx={1.5} fill={AZUL_M} opacity={0.6 * (1 - ph)} />; })}
                  </g>
                </g>
              )}
              {[0, 1, 2].map((k) => <ellipse key={k} cx={300 + k * 330 + 50 * Math.sin(t * 0.4 + k * 2)} cy={585 + (k % 2) * 16} rx={220} ry={34} fill={niebla} opacity={0.7} />)}
              <Mar x={40} y={600} w={1120} h={240} t={t} color={agua} oscuro={aguaO} amp={8 + 6 * ac(t, M('riesgos'), M('riesgos') + 1)} />
              {t >= M('riesgos') && [[800, 650, 1], [960, 620, 0.8]].map(([x, y, s], k) => { const sube = sm(t, M('riesgos') + 0.5 + k * 0.4, M('riesgos') + 1.3 + k * 0.4); return <g key={k} transform={`translate(${x} ${y + 40 * (1 - sube)}) scale(${s})`} opacity={sube}><path d="M -60 20 L -40 -30 L -10 -50 L 20 -36 L 50 -10 L 64 20 Z" fill="#475569" /><path d="M -10 -50 L 20 -36 L 50 -10 L 64 20 H 10 Z" fill="#000" opacity={0.18} /><circle cx={0} cy={-76} r={15} fill={ROJO_M} opacity={0.6 + 0.4 * Math.sin(t * 5 + k)} /><rect x={-3} y={-86} width={6} height={12} rx={3} fill="#fff" /><circle cx={0} cy={-68} r={3} fill="#fff" /></g>; })}
              <g opacity={e1(t, M('joven'))}>
                <Velero x={520} y={640 + 5 * Math.sin(t * 1.8)} t={t} id={ID} rot={balanceo} mejoras={mejoras} cuerpo={traje} />
              </g>
              {t >= M('cuestion') && (
                <g opacity={e1(t, M('cuestion'))} transform="translate(230 450)">
                  <circle r={72} fill={c.panel} style={sombra(c.sombra, 6, 14)} />
                  <circle r={56} fill="none" stroke={c.apagado} strokeWidth={4} />
                  {['N', 'E', 'S', 'O'].map((l, k) => <Txt key={l} f="a" x={44 * Math.sin((k * Math.PI) / 2)} y={-44 * Math.cos((k * Math.PI) / 2) + 9} textAnchor="middle" fontSize={24} fill={c.tenue}>{l}</Txt>)}
                  <g transform={`rotate(${aguja})`}><path d="M 0 -42 L 9 0 L 0 8 L -9 0 Z" fill={ROJO_M} /><path d="M 0 42 L 9 0 L 0 -8 L -9 0 Z" fill="#94a3b8" /></g>
                  <circle r={6} fill={c.texto} />
                </g>
              )}
              {t >= M('innov') && <Letrero x={520} y={790} texto="Mejoras sin parar" id={ID} op={e1(t, M('innov') + 0.3)} />}
            </Toma>

            {/* TOMA 2 · los tres rasgos */}
            <Toma t={t} a={M('rasgos')} b={M('ciclo')}>
              <rect x={90} y={220} width={1020} height={460} rx={34} fill={c.panel} style={sombra(c.sombra, 10, 26)} />
              {(['rapido', 'deseos', 'ciencia'] as N[]).map((m, k) => {
                const e = e1(t, M(m)); const x = 260 + k * 340;
                return (
                  <g key={m} opacity={Math.max(0.2, e)}>
                    <circle cx={x} cy={420} r={120} fill={c.panel2} />
                    {k === 0 && <Reloj x={x} y={420} r={84} t={t} vel={e > 0.5 ? 6 : 0.5} />}
                    {k === 1 && <g><Persona id={ID} x={x - 26} y={520} s={0.62} cuerpo={VIOLETA} /><Corazon x={x + 52} y={350} s={0.85 + 0.08 * Math.sin(t * 5)} /></g>}
                    {k === 2 && <g transform={`translate(${x} 430)`}><path d="M -22 -88 H 22 V -28 L 66 60 Q 74 84 46 84 H -46 Q -74 84 -66 60 L -22 -28 Z" fill="#e0f2fe" /><path d={`M -44 ${24 + 4 * Math.sin(t * 3)} Q 0 ${14 - 4 * Math.sin(t * 3)} 44 ${24 + 4 * Math.sin(t * 3)} L 66 60 Q 74 84 46 84 H -46 Q -74 84 -66 60 Z`} fill={VERDE} />{[0, 1, 2, 3].map((q) => { const ph = (t * 0.8 + q / 4) % 1; return <circle key={q} cx={-24 + q * 16} cy={74 - 80 * ph} r={6 - 3 * ph} fill="#fff" opacity={1 - ph} />; })}<rect x={-28} y={-96} width={56} height={12} rx={6} fill="#94a3b8" /></g>}
                    <Letrero x={x} y={600} texto={['Ciclo rápido', 'El cliente', 'Ciencia'][k]} id={ID} op={e} fondo={colEst[k]} />
                  </g>
                );
              })}
            </Toma>

            {/* TOMA 3 · la pista del ciclo */}
            <Toma t={t} a={M('ciclo')} b={M('empujones')} cx={470}>
              <ellipse cx={cx0} cy={cy0 + 16} rx={R + 40} ry={RY + 30} fill="#000" opacity={0.06} />
              <ellipse cx={cx0} cy={cy0} rx={R + 26} ry={RY + 22} fill={isDark ? '#3a424e' : '#cbd5e1'} />
              <ellipse cx={cx0} cy={cy0} rx={R - 26} ry={RY - 22} fill={c.panel} />
              <ellipse cx={cx0} cy={cy0} rx={R} ry={RY} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="14 14" opacity={0.7} />
              {t >= M('ciclo') && (() => { const a = -Math.PI / 2 + vuelta * 2 * Math.PI; const [x, y] = pos(a); return (
                <g transform={`translate(${x} ${y})`}><ellipse cx={0} cy={14} rx={30} ry={6} fill="#000" opacity={0.2} /><rect x={-28} y={-8} width={56} height={18} rx={6} fill="#334155" /><circle cx={-16} cy={12} r={7} fill="#1f2937" /><circle cx={16} cy={12} r={7} fill="#1f2937" /><rect x={-18} y={-36} width={36} height={28} rx={5} fill="#f59e0b" /><path d="M -18 -36 L 0 -46 L 18 -36 Z" fill="#fde68a" /></g>
              ); })()}
              {estAng.map((a, k) => {
                const [x, y] = pos(a); const e = e1(t, M('cma') + k * 0.25); const act = activo === k;
                const lx = k === 0 ? x : k === 1 ? x + 150 : x - 150, ly = k === 0 ? y - 140 : y + 40;
                return (
                  <g key={k} opacity={e}>
                    {act && <path d={`M ${x} ${y} L ${lx} ${ly + 40}`} stroke={colEst[k]} strokeWidth={4} strokeDasharray="6 6" />}
                    <g transform={`translate(${lx} ${ly}) scale(${act ? 1.1 : 1})`}>
                      <Apoyo x={0} y={40} rx={70} />
                      <rect x={-64} y={-50} width={128} height={90} rx={12} fill={colEst[k]} style={act ? { filter: `drop-shadow(0 0 16px ${colEst[k]})` } : undefined} />
                      <path d="M -74 -46 L 0 -86 L 74 -46 Z" fill={colEst[k]} opacity={0.75} />
                      {k === 0 && <g><rect x={-40} y={0} width={80} height={10} rx={4} fill="#7c4a1e" /><rect x={-20} y={-30} width={36} height={30} rx={5} fill="#fde68a" /><g transform={`rotate(${act ? 25 * Math.sin(t * 9) : 0} 30 -36)`}><rect x={22} y={-50} width={10} height={36} rx={4} fill="#334155" /><rect x={16} y={-54} width={22} height={12} rx={4} fill="#334155" /></g></g>}
                      {k === 1 && <g><path d="M -36 14 A 36 36 0 0 1 36 14" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" /><line x1={0} y1={14} x2={0} y2={-18} stroke="#fff" strokeWidth={6} strokeLinecap="round" transform={`rotate(${act ? 50 * Math.sin(t * 3) : -40} 0 14)`} /></g>}
                      {k === 2 && <Bombilla x={0} y={4} s={0.4} t={t} luz={act ? 1 : 0.3} id={ID} />}
                    </g>
                    <Letrero x={lx} y={k === 0 ? ly - 120 : ly + 80} texto={['Crear', 'Medir', 'Aprender'][k]} fondo={colEst[k]} id={ID} op={t >= M((['crea', 'mide', 'aprende'] as N[])[k]) ? 1 : 0.35} />
                  </g>
                );
              })}
              {t >= M('perdidas') && [['Tiempo', '#64748b'], ['Dinero', '#f59e0b'], ['Energía', VERDE]].map(([n, col], k) => {
                const e = e1(t, M('perdidas') + k * 0.3), v = lerp(1, 0.35, ac(t, M('perdidas') + 0.8, M('perdidas') + 2.4));
                return (
                  <g key={n} transform={`translate(${930 + k * 90} 650)`} opacity={e}>
                    <rect x={-30} y={-260} width={60} height={260} rx={14} fill={c.apagado} opacity={0.45} />
                    <rect x={-30} y={-260 * v} width={60} height={260 * v} rx={14} fill={col} />
                    <Txt f="a" x={0} y={40} textAnchor="middle" fontSize={26} fill={c.texto}>{n}</Txt>
                  </g>
                );
              })}
            </Toma>

            {/* TOMA 4 · a empujones, no por todo lo alto */}
            <Toma t={t} a={M('empujones')} b={M('grupo')}>
              <Mar x={40} y={540} w={1120} h={200} t={t} color={agua} oscuro={aguaO} amp={6} />
              <g transform="translate(1060 550)"><rect x={-90} y={-14} width={180} height={20} rx={4} fill="#a16207" /><rect x={30} y={-150} width={34} height={136} fill="#f8fafc" style={{ filter: 'drop-shadow(0 0 2px rgba(30,41,59,0.5))' }} /><rect x={30} y={-110} width={34} height={20} fill={ROJO_M} /><rect x={30} y={-60} width={34} height={20} fill={ROJO_M} /><path d="M 24 -150 L 47 -180 L 70 -150 Z" fill={ROJO_M} /><circle cx={47} cy={-160} r={10} fill="#fde047" opacity={0.6 + 0.4 * Math.sin(t * 4)} /></g>
              {(() => { const pts = Array.from({ length: 40 }, (_, k) => curso((k / 39) * avance)); return <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="10 8" opacity={0.85} />; })()}
              {Array.from({ length: pasos }, (_, k) => { if ((k + 1) / pasos > avance) return null; const [x, y] = curso((k + 1) / pasos); return <circle key={k} cx={x} cy={y} r={6} fill={NARANJA} />; })}
              {(() => { const [x, y] = curso(avance); const [x2, y2] = curso(Math.min(1, avance + 0.01)); return <Velero x={x} y={y + 4 * Math.sin(t * 2)} s={0.6} t={t} id={ID} rot={((Math.atan2(y2 - y, x2 - x) * 180) / Math.PI) * 0.5} mejoras={4} cuerpo={traje} />; })()}
              {t >= M('rectif') && (
                <g>
                  <rect x={40} y={730} width={1120} height={110} rx={10} fill={isDark ? '#a16207' : '#fde68a'} opacity={0.8} />
                  {[300, 560, 820].map((x, k) => (
                    <g key={k} opacity={e1(t, M('rectif') + k * 0.5)}>
                      <Persona id={ID} x={x} y={820} s={0.45} cuerpo={['#ec4899', AZUL_M, VERDE][k]} />
                      <g transform={`translate(${x + 60} 660)`}><rect x={-34} y={-24} width={68} height={44} rx={14} fill={c.panel} style={sombra(0.2, 2, 6)} /><path d={k % 2 ? 'M -14 0 H 14 M 4 -10 L 14 0 L 4 10' : 'M 14 0 H -14 M -4 -10 L -14 0 L -4 10'} stroke={NARANJA} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" transform={`rotate(${k % 2 ? -30 : 30})`} /></g>
                    </g>
                  ))}
                </g>
              )}
              {t >= M('todoalto') && (() => { const [ax, ay] = arco(lanz); const [bx, by] = arco(Math.min(1, lanz + 0.01)); const rot = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI + 90; const choque = sm(t, M('todoalto') + 2.7, M('todoalto') + 3.5); return (
                <g opacity={e1(t, M('todoalto'))}>
                  <path d="M 120 540 Q 470 -260 820 540" stroke="#94a3b8" strokeWidth={4} fill="none" strokeDasharray="8 12" opacity={0.5} />
                  {lanz < 0.99 && <Cohete x={ax} y={ay} s={0.5} t={t} rot={rot} color="#64748b" />}
                  {choque > 0 && <g transform="translate(820 550)">{Array.from({ length: 7 }, (_, k) => { const a = -Math.PI * (0.15 + 0.7 * (k / 6)); const r = 90 * choque; return <circle key={k} cx={r * Math.cos(a)} cy={r * Math.sin(a) * 1.2} r={10 - 4 * choque} fill="#e0f2fe" />; })}<Cruz x={0} y={-140} r={32} op={choque} /></g>}
                </g>
              ); })()}
            </Toma>

            {/* TOMA 5 · un grupo reducido */}
            <Toma t={t} a={M('grupo')} b={M('ejemplo')}>
              {Array.from({ length: 24 }, (_, k) => { const col = k % 8, fila = Math.floor(k / 8); return <Persona key={k} id={ID} x={640 + col * 64 + (fila % 2) * 32} y={420 + fila * 110} s={0.3} cuerpo={c.apagado} />; })}
              <path d="M 330 160 L 160 720 H 500 Z" fill="#fde68a" opacity={isDark ? 0.18 : 0.45} />
              <Apoyo x={330} y={720} rx={170} op={0.12} />
              {[[250, 700], [330, 690], [410, 700], [290, 610], [370, 610]].map(([x, y], k) => <Persona key={k} id={ID} x={x} y={y} s={0.42} cuerpo={NARANJA} />)}
              <g transform="translate(330 470)"><rect x={-30} y={-26} width={60} height={46} rx={8} fill="#f59e0b" /><path d="M -30 -26 L 0 -42 L 30 -26 Z" fill="#fde68a" /></g>
              <Letrero x={330} y={780} texto="Grupo reducido" id={ID} op={e1(t, M('grupo') + 0.4)} />
              {t >= M('coste') && <g opacity={e1(t, M('coste'))}><PilaMonedas x={540} y={770} n={lerp(4, 1, ac(t, M('coste'), M('coste') + 1))} w={60} /></g>}
              {t >= M('errores') && (() => { const lx = 330 + 26 * Math.sin(t * 2), ly = 460; const ok = ac(t, M('errores') + 1, M('errores') + 1.5); return (
                <g opacity={e1(t, M('errores'))}>
                  <g transform="translate(330 460)">{ok < 1 && <g opacity={1 - ok}><ellipse rx={12} ry={8} fill={ROJO_M} />{[-1, 1].map((sx) => [0, 1].map((q) => <line key={`${sx}${q}`} x1={sx * 8} y1={-3 + q * 6} x2={sx * 17} y2={-8 + q * 12} stroke={ROJO_M} strokeWidth={3} />))}</g>}</g>
                  <g transform={`translate(${lx} ${ly})`}><circle r={52} fill="#bfdbfe" opacity={0.2} /><circle r={52} fill="none" stroke="#334155" strokeWidth={10} /><rect x={32} y={32} width={18} height={62} rx={9} fill="#334155" transform="rotate(-45 41 41)" /></g>
                  <Visto x={430} y={380} r={26} op={ok} />
                </g>
              ); })()}
            </Toma>

            {/* TOMA 6 · los menús saludables */}
            <Toma t={t} a={M('ejemplo')} b={fin + 5}>
              <rect x={60} y={660} width={1080} height={70} rx={12} fill={isDark ? '#3a424e' : '#d7dce3'} />
              {Array.from({ length: 10 }, (_, k) => <rect key={k} x={90 + k * 106} y={692} width={50} height={6} rx={3} fill="#fff" opacity={0.7} />)}
              <g transform="translate(220 0)" opacity={e1(t, M('ejemplo'))}>
                <rect x={-120} y={560} width={240} height={90} rx={12} fill={VERDE} /><rect x={-120} y={560} width={240} height={16} rx={8} fill="#065f46" opacity={0.4} />
                <path d="M -130 490 H 130 L 110 450 H -110 Z" fill="#f43f5e" />{[0, 1, 2, 3].map((k) => <rect key={k} x={-92 + k * 52} y={452} width={26} height={38} fill="#fff" opacity={0.85} />)}
                <rect x={-112} y={490} width={8} height={70} fill="#64748b" /><rect x={104} y={490} width={8} height={70} fill="#64748b" />
                <circle cx={-70} cy={660} r={18} fill="#1f2937" /><circle cx={70} cy={660} r={18} fill="#1f2937" />
                <Persona id={ID} x={0} y={568} s={0.42} cuerpo={AZUL_M} /><rect x={-18} y={456} width={36} height={22} rx={8} fill="#fff" style={{ filter: 'drop-shadow(0 0 2px rgba(30,41,59,0.5))' }} />
                {t >= M('menus') && <g opacity={e1(t, M('menus'))} transform="translate(80 548)"><ellipse rx={34} ry={10} fill="#e5e7eb" /><circle cx={-12} cy={-6} r={9} fill={VERDE} /><circle cx={6} cy={-8} r={8} fill={NARANJA} /><circle cx={16} cy={-3} r={6} fill="#ef4444" /></g>}
              </g>
              {t >= M('cocina') && t < M('dossem') + 0.6 && (() => { const x = ac(t, M('cocina') + 0.8, M('cocina') + 1.3); return (
                <g opacity={e1(t, M('cocina')) * (1 - ac(t, M('dossem'), M('dossem') + 0.5))} transform="translate(620 420)">
                  <rect x={-160} y={-120} width={320} height={180} rx={10} fill={isDark ? '#8294b3' : '#64748b'} /><rect x={90} y={-200} width={34} height={90} fill={isDark ? '#8294b3' : '#64748b'} /><rect x={30} y={-180} width={34} height={70} fill={isDark ? '#8294b3' : '#64748b'} />
                  {Array.from({ length: 4 }, (_, k) => <rect key={k} x={-134 + k * 68} y={-90} width={44} height={40} rx={5} fill="#fde68a" opacity={0.8} />)}
                  <path d={`M -170 -170 L ${-170 + 340 * x} ${-170 + 250 * x}`} stroke={ROJO_M} strokeWidth={18} strokeLinecap="round" opacity={x > 0 ? 1 : 0} />
                  <path d={`M 170 -170 L ${170 - 340 * x} ${-170 + 250 * x}`} stroke={ROJO_M} strokeWidth={18} strokeLinecap="round" opacity={x > 0 ? 1 : 0} />
                </g>
              ); })()}
              {t >= M('dosof') - 0.5 && [0, 1].map((k) => <g key={k} opacity={e1(t, M('dosof') - 0.5 + k * 0.3)}><Edificio x={940 + k * 150} y={660} w={120} h={230 + k * 50} color={isDark ? '#8294b3' : '#334155'} /></g>)}
              {t >= M('cinco') && Array.from({ length: 5 }, (_, k) => {
                const dt = t - M('cinco') - k * 0.4; if (dt < 0) return null; const ph = (dt * 0.4) % 1;
                const x = lerp(330, 860, ph), y = 680 - 30 * Math.sin(Math.PI * ph);
                return <g key={k} transform={`translate(${x} ${y})`} opacity={Math.min(1, ph * 6, (1 - ph) * 6)}><ellipse rx={30} ry={9} fill="#e5e7eb" /><circle cx={-9} cy={-5} r={8} fill={VERDE} /><circle cx={8} cy={-6} r={7} fill={NARANJA} /></g>;
              })}
              {t >= M('dossem') && t < M('planos') && <g opacity={e1(t, M('dossem')) * (1 - ac(t, M('planos') - 0.3, M('planos') - 0.05))} transform={`translate(560 ${350 - 60 * ac(t, M('planos') - 0.3, M('planos'))})`}><Calendario x={0} y={0} s={1.1} marcados={Math.round(14 * ac(t, M('dossem') + 0.3, M('dossem') + 3.5))} /></g>}
              {t >= M('piden') && (
                <g opacity={e1(t, M('piden'))} transform="translate(860 330)">
                  <rect x={-130} y={-96} width={260} height={192} rx={14} fill="#fffbeb" style={{ filter: 'drop-shadow(0 4px 10px rgba(15,23,42,0.35))' }} />
                  {['Piden', 'Dejan', 'Repiten'].map((n, k) => (
                    <g key={n} opacity={e1(t, M('piden') + k * 0.6)}>
                      <Txt f="a" x={-112} y={-44 + k * 56} fontSize={28} fill="#334155">{n}</Txt>
                      {Array.from({ length: Math.round([5, 2, 4][k] * ac(t, M('piden') + k * 0.6, M('piden') + 2 + k * 0.6)) }, (_, q) => <rect key={q} x={14 + q * 18} y={-68 + k * 56} width={7} height={30} rx={3} fill={[VERDE, ROJO_M, AZUL_M][k]} />)}
                    </g>
                  ))}
                </g>
              )}
              {t >= M('planos') && (
                <g opacity={e1(t, M('planos'))}>
                  <g transform="translate(300 330)">{[0, 1, 2, 3].map((k) => <g key={k}><rect x={-90 + k * 4} y={10 - k * 22} width={170} height={24} rx={12} fill={k % 2 ? '#3b82f6' : '#2563eb'} opacity={0.5} /><circle cx={-90 + k * 4} cy={22 - k * 22} r={12} fill="#1d4ed8" opacity={0.5} /></g>)}</g>
                  <Letrero x={300} y={420} texto="Un año de planos" fondo={c.panel2} color={c.tenue} id={ID} />
                  <Txt x={600} y={352} textAnchor="middle" fontSize={72} fill={NARANJA}>&lt;</Txt>
                </g>
              )}
            </Toma>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
