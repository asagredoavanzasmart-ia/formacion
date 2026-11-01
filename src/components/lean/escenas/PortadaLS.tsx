import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, Calendario, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, VERDE, VIOLETA } from './comunLS';
import { Toma, Letrero, Apoyo, Portatil, PilaMonedas, Visto, Cruz, Furgon, sm, cl } from './kitLS';
import type { PropsCE } from './comunLS';

/**
 * «Aprender rápido, gastar lo mínimo» (portada narrada), en tres tomas.
 * 1 · La promesa: semanas en vez de años; una idea que llega a sus clientes por un camino corto, el libro de
 *     Eric Ries, a toda velocidad y gastando lo mínimo.
 * 2 · La vida de Ries como un único paseo: la cámara lo sigue por un mundo de hitos (1978, la guía de Java,
 *     Yale y su primera startup con un amigo, la graduación de 2001, Silicon Valley, el fracaso de Catalyst,
 *     la quiebra de There.com, IMVU con Will Harvey y sus avatares, los premios, Harvard y el libro de 2011).
 * 3 · El mapa del recorrido: ocho paradas que la furgoneta visita a medida que se nombran.
 */

const ID = 'ls1';
const nombres = ['semanas', 'anos', 'clientes', 'ries', 'velocidad', 'minimo', 'nace', 'guia', 'yale', 'amigo', 'gradua', 'silicon', 'catalyst', 'y2004', 'there', 'imvu', 'avatares', 'desacred',
  'y2007', 'techfellow', 'harvard', 'y2011', 'superventas', 'recorreremos', 'viene', 'ciclo', 'pmv', 'pivotes', 'tecnicas', 'motores', 'aplicarlo', 'criticas', 'pregunta'] as const;
type N = typeof nombres[number];

/* Libro «El método Lean Startup». (x, y) es el centro. */
const Libro: React.FC<{ x: number; y: number; s?: number; id: string; giro?: number }> = ({ x, y, s = 1, id, giro = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s * Math.max(0.05, giro)} ${s})`}>
    <rect x={-80} y={-108} width={170} height={216} rx={10} fill="#e5e7eb" />
    <rect x={-90} y={-112} width={170} height={220} rx={10} fill={`url(#${id}-marca)`} style={sombra(0.3, 6, 12)} />
    <rect x={-90} y={-112} width={18} height={220} rx={8} fill="#000" opacity={0.18} />
    <Txt x={0} y={-50} textAnchor="middle" fontSize={22} fill="#fff" opacity={0.9}>EL MÉTODO</Txt>
    <Txt x={0} y={-16} textAnchor="middle" fontSize={30} fill="#fff">LEAN</Txt>
    <Txt x={0} y={18} textAnchor="middle" fontSize={30} fill="#fff">STARTUP</Txt>
    <path d="M -34 52 A 22 22 0 1 1 -12 74" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
    <Txt x={0} y={92} textAnchor="middle" fontSize={20} fill="#fff" opacity={0.85}>ERIC RIES</Txt>
  </g>
);

/* Edificio clásico de universidad. (x, y) es la base. */
const Universidad: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <g transform={`translate(${x} ${y})`}>
    <Apoyo x={0} y={4} rx={180} />
    <rect x={-170} y={-24} width={340} height={24} rx={4} fill="#cbd5e1" />
    {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-140 + k * 54} y={-170} width={22} height={146} rx={4} fill="#e5e7eb" />)}
    <rect x={-160} y={-190} width={320} height={24} rx={4} fill="#cbd5e1" />
    <path d="M -175 -190 L 0 -270 L 175 -190 Z" fill={color} />
    <circle cx={0} cy={-215} r={16} fill="#fde68a" />
  </g>
);

/* Torres de cristal de Silicon Valley junto a la bahía. */
const Valle: React.FC<{ x: number; y: number; t: number; isDark: boolean }> = ({ x, y, t, isDark }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -250 0 Q -170 -150 -70 -60 Q 20 -170 140 -70 Q 210 -130 250 0 Z" fill={isDark ? '#14532d' : '#86efac'} opacity={0.75} />
    <rect x={-250} y={-16} width={500} height={20} rx={8} fill={AZUL_M} opacity={0.75} />
    {[[-180, 200, 70], [-90, 270, 80], [10, 230, 64], [100, 300, 76], [190, 210, 60]].map(([dx, h, w], k) => (
      <g key={k}><rect x={dx - w / 2} y={-h} width={w} height={h - 16} rx={6} fill={isDark ? '#3b82f6' : '#60a5fa'} />
        <rect x={dx} y={-h} width={w / 2} height={h - 16} rx={6} fill="#1e3a8a" opacity={0.25} />
        {Array.from({ length: Math.floor(h / 36) }, (_, r) => <rect key={r} x={dx - w / 2 + 8} y={-h + 14 + r * 36} width={w - 16} height={8} rx={3} fill="#e0f2fe" opacity={0.5 + 0.4 * Math.sin(t * 2 + r + k)} />)}</g>
    ))}
  </g>
);

export const PortadaLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('criticas') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'En semanas, no en años'], [M('ries'), 'El método de Eric Ries'], [M('velocidad'), 'Aprender rápido'], [M('minimo'), 'Gastar lo mínimo'],
    [M('nace'), 'Nace en 1978'], [M('guia'), 'Una guía de Java'], [M('yale'), 'Universidad de Yale'], [M('gradua'), 'Se gradúa en 2001'], [M('silicon'), 'Silicon Valley'],
    [M('catalyst'), 'Catalyst fracasa'], [M('y2004'), '2004: quiebra There.com'], [M('imvu'), 'Funda IMVU'], [M('avatares'), 'Avatares en 3D'], [M('desacred'), 'Contra la gestión clásica'],
    [M('y2007'), 'BusinessWeek, 2007'], [M('techfellow'), 'TechFellow, 2009'], [M('harvard'), 'Harvard, 2010'], [M('y2011'), 'El libro, 2011'], [M('superventas'), 'Un superventas'],
    [M('recorreremos'), 'El recorrido'],
  ];

  /* ---------- Toma 2: el paseo por la vida de Ries ---------- */
  const hitos: [N, number][] = [['nace', 600], ['guia', 1150], ['yale', 1720], ['gradua', 2280], ['silicon', 2880], ['catalyst', 3500], ['there', 4080], ['imvu', 4700], ['y2007', 5320], ['techfellow', 5800], ['harvard', 6280], ['y2011', 6800]];
  let camX = hitos[0][1];
  for (let k = 1; k < hitos.length; k++) { const [n, x] = hitos[k]; camX = lerp(camX, x, sm(t, M(n) - 1.3, M(n) - 0.05)); }
  const moviendo = hitos.some(([n]) => t > M(n) - 1.3 && t < M(n) - 0.05);
  const dx = 600 - camX;
  const ve = (wx: number) => Math.abs(wx - camX) < 900;
  const suelo = 690;

  /* ---------- Toma 3: mapa ---------- */
  const paradas: [N, string, number, number][] = (['viene', 'ciclo', 'pmv', 'pivotes', 'tecnicas', 'motores', 'aplicarlo', 'criticas'] as N[]).map((n, k) => [n, ['Origen', 'Ciclo', 'PMV', 'Pivotes', 'Técnicas', 'Motores', 'Aplicar', 'Críticas'][k], 140 + k * 131, k % 2 ? 380 : 580]);
  let fx = paradas[0][2], fy = paradas[0][3];
  for (let k = 1; k < paradas.length; k++) { const u = sm(t, M(paradas[k][0]) - 0.7, M(paradas[k][0])); fx = lerp(fx, paradas[k][2], u); fy = lerp(fy, paradas[k][3], u); }
  const ruta = paradas.map(([, , x, y], k) => (k === 0 ? `M ${x} ${y}` : `Q ${(paradas[k - 1][2] + x) / 2} ${k % 2 ? y - 80 : y + 80} ${x} ${y}`)).join(' ');

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Eric Ries y el método Lean Startup">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · la promesa */}
            <Toma t={t} a={0} b={M('nace')}>
              {/* años que se tachan, semanas que pasan */}
              {t < M('ries') + 0.6 && (
                <g transform={`translate(600 ${300}) scale(${1 - 0.0 * t})`} opacity={1 - ac(t, M('ries') - 0.3, M('ries'))}>
                  <Calendario x={0} y={0} s={1.15} marcados={Math.floor(((t - M('semanas')) * 4) % 15)} />
                  <Letrero x={0} y={128} texto="Semanas" id={ID} op={e1(t, M('semanas'))} />
                </g>
              )}
              {t >= M('anos') && t < M('clientes') + 1 && (
                <g opacity={e1(t, M('anos')) * (1 - ac(t, M('clientes'), M('clientes') + 0.8))} transform="translate(300 330)">
                  {Array.from({ length: 6 }, (_, k) => <g key={k}><rect x={-70} y={40 - k * 30} width={140} height={26} rx={6} fill="#cbd5e1" /><rect x={-70} y={40 - k * 30} width={140} height={8} rx={4} fill="#94a3b8" /></g>)}
                  <Txt f="a" x={0} y={110} textAnchor="middle" fontSize={30} fill={c.tenue}>Años</Txt>
                  <path d={`M -90 -130 L ${-90 + 180 * ac(t, M('anos') + 0.4, M('anos') + 0.9)} ${-130 + 230 * ac(t, M('anos') + 0.4, M('anos') + 0.9)}`} stroke={ROJO_M} strokeWidth={12} strokeLinecap="round" />
                </g>
              )}
              {/* el libro de Ries, que aparece girando donde estaba el calendario */}
              {t >= M('ries') - 0.3 && <Libro x={600} y={290} s={0.95} id={ID} giro={sm(t, M('ries') - 0.2, M('ries') + 0.5)} />}
              {/* la idea llega a sus clientes */}
              {t >= M('clientes') && (
                <g opacity={e1(t, M('clientes'))}>
                  <path d="M 260 600 C 420 520 760 700 930 600" stroke={c.apagado} strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray="2 22" />
                  <Bombilla x={220} y={600} s={0.8} t={t} id={ID} />
                  {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={930 + k * 70} y={700 - (k % 2) * 20} s={0.42} cuerpo={['#ec4899', AZUL_M, VERDE][k]} />)}
                  <Visto x={1000} y={510} r={30} op={e1(t, M('clientes') + 1)} />
                </g>
              )}
              {t >= M('velocidad') && (() => { const ph = ((t - M('velocidad')) * 0.75) % 1; const x = lerp(270, 920, ph), y = 600 - 60 * Math.sin(Math.PI * ph) + 40 * ph * (1 - ph) * Math.sin(ph * 6); return (
                <g opacity={e1(t, M('velocidad'))}>
                  {[1, 2, 3].map((k) => <rect key={k} x={x - 30 - k * 26} y={y - 3 + (k - 2) * 10} width={20 + k * 4} height={5} rx={2.5} fill={NARANJA} opacity={0.6 - k * 0.15} />)}
                  <circle cx={x} cy={y} r={16} fill={NARANJA} /><circle cx={x} cy={y} r={7} fill="#fff" />
                </g>
              ); })()}
              {t >= M('minimo') && (
                <g opacity={e1(t, M('minimo'))}>
                  <PilaMonedas x={600} y={800} n={lerp(6, 1, ac(t, M('minimo') + 0.3, M('minimo') + 1.6))} w={96} />
                  <path d="M 676 700 V 770 M 660 754 L 676 772 L 692 754" stroke={VERDE} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              )}
            </Toma>

            {/* TOMA 2 · el paseo por la vida de Ries */}
            <Toma t={t} a={M('nace')} b={M('recorreremos')} zi={1.06} zo={0.82}>
              {/* fondo lejano en paralaje */}
              <g transform={`translate(${dx * 0.35} 0)`}>
                {Array.from({ length: 14 }, (_, k) => <circle key={k} cx={200 + k * 380} cy={suelo + 30} r={150 + (k % 3) * 40} fill={isDark ? '#2b3038' : '#eef1f5'} />)}
              </g>
              <rect x={0} y={suelo} width={1200} height={170} fill={isDark ? '#2a2f37' : '#e5e9ef'} />
              <g transform={`translate(600 ${suelo}) scale(1.3) translate(-600 ${-suelo})`}>
              <g transform={`translate(${dx} 0)`}>
                <rect x={200} y={suelo + 26} width={7000} height={12} rx={6} fill={isDark ? '#3a424e' : '#cbd5e1'} />
                {Array.from({ length: 70 }, (_, k) => <rect key={k} x={260 + k * 100} y={suelo + 29} width={46} height={6} rx={3} fill="#fbbf24" opacity={0.7} />)}

                {/* 1978: nace */}
                {ve(600) && <g opacity={e1(t, M('nace'))}>
                  <g transform={`translate(600 ${suelo})`}><Apoyo x={0} y={2} rx={110} /><rect x={-90} y={-130} width={180} height={130} rx={10} fill="#f8fafc" style={{ filter: 'drop-shadow(0 0 2px rgba(30,41,59,0.4))' }} /><path d="M -110 -126 L 0 -210 L 110 -126 Z" fill={ROJO_M} /><rect x={-24} y={-70} width={48} height={70} rx={6} fill="#7c4a1e" /><rect x={-74} y={-100} width={36} height={32} rx={4} fill="#bfdbfe" /><rect x={38} y={-100} width={36} height={32} rx={4} fill="#bfdbfe" /></g>
                  {Array.from({ length: 8 }, (_, k) => { const a = (k * Math.PI) / 4 + t * 0.5; return <circle key={k} cx={600 + 150 * Math.cos(a)} cy={420 + 60 * Math.sin(a)} r={6} fill={k % 2 ? '#fbbf24' : ROSA} opacity={0.8} />; })}
                  <Letrero x={600} y={300} texto="1978" id={ID} op={e1(t, M('nace') + 0.3)} />
                </g>}
                {/* la guía de Java */}
                {ve(1150) && <g opacity={e1(t, M('guia'))}>
                  <g transform={`translate(1150 ${suelo})`}>
                    <rect x={-150} y={-120} width={300} height={16} rx={6} fill="#a16207" /><rect x={-130} y={-104} width={14} height={104} fill="#a16207" /><rect x={116} y={-104} width={14} height={104} fill="#a16207" />
                    <g transform="translate(-40 -120)"><rect x={-60} y={-24} width={120} height={24} rx={4} fill={AZUL_M} /><rect x={-56} y={-46} width={112} height={22} rx={4} fill={ROJO_M} /><rect x={-52} y={-66} width={104} height={20} rx={4} fill="#f59e0b" /></g>
                    <g transform="translate(80 -120)"><path d="M -24 -50 H 24 L 20 0 H -20 Z" fill="#fff" style={{ filter: 'drop-shadow(0 0 2px rgba(30,41,59,0.45))' }} /><path d="M 24 -40 Q 42 -36 38 -20 Q 34 -10 22 -12" fill="none" stroke="#e5e7eb" strokeWidth={6} />{[0, 1].map((q) => <path key={q} d={`M ${-8 + q * 14} -60 q -8 -14 0 -26 q 8 -12 0 -24`} stroke="#94a3b8" strokeWidth={4} fill="none" opacity={0.4 + 0.4 * Math.sin(t * 3 + q)} strokeLinecap="round" />)}</g>
                  </g>
                  <Letrero x={1150} y={330} texto="Guía de Java" id={ID} op={e1(t, M('guia') + 0.3)} />
                </g>}
                {/* Yale y la primera startup con un amigo */}
                {ve(1720) && <g opacity={e1(t, M('yale'))}>
                  <Universidad x={1720} y={suelo} color={AZUL_M} />
                  <Letrero x={1720} y={330} texto="Yale" id={ID} fondo="#1e3a8a" op={e1(t, M('yale') + 0.3)} />
                  {t >= M('amigo') && <g opacity={e1(t, M('amigo'))}><Persona id={ID} x={1940} y={suelo + 4} s={0.5} cuerpo={VIOLETA} /><g transform={`translate(1880 ${suelo - 130 - 10 * Math.sin(t * 3)})`}><rect x={-26} y={-22} width={52} height={44} rx={8} fill="#f59e0b" /><path d="M -26 -22 L 0 -38 L 26 -22 Z" fill="#fde68a" /></g></g>}
                </g>}
                {/* graduación 2001 */}
                {ve(2280) && <g opacity={e1(t, M('gradua'))}>
                  {[0, 1, 2].map((k) => { const ph = ((t - M('gradua')) * 0.6 + k * 0.33) % 1; const y = suelo - 120 - 240 * Math.sin(Math.PI * ph); return <g key={k} transform={`translate(${2200 + k * 80} ${y}) rotate(${ph * 360 * (k % 2 ? 1 : -1)})`}><path d="M -40 0 L 0 -16 L 40 0 L 0 16 Z" fill="#1f2937" /><rect x={-20} y={2} width={40} height={16} rx={4} fill="#1f2937" /><path d="M 30 2 V 26" stroke="#fbbf24" strokeWidth={4} /></g>; })}
                  <Letrero x={2280} y={300} texto="2001" id={ID} op={e1(t, M('gradua') + 0.3)} />
                </g>}
                {/* Silicon Valley */}
                {ve(2880) && <g opacity={e1(t, M('silicon'))}><Valle x={2880} y={suelo} t={t} isDark={isDark} /><Letrero x={2880} y={300} texto="California" id={ID} op={e1(t, M('silicon') + 0.3)} /></g>}
                {/* Catalyst fracasa */}
                {ve(3500) && <g opacity={e1(t, M('catalyst'))}>
                  {(() => { const cae = ac(t, M('catalyst') + 0.3, M('catalyst') + 1.6); return (
                    <g transform={`translate(3500 ${suelo})`}>
                      <Apoyo x={0} y={2} rx={120} />
                      <g transform={`rotate(${-8 * cae} -100 0)`}><rect x={-100} y={-200} width={200} height={200} rx={10} fill={isDark ? '#8294b3' : '#64748b'} />{Array.from({ length: 6 }, (_, k) => <rect key={k} x={-80 + (k % 2) * 100} y={-180 + Math.floor(k / 2) * 56} width={60} height={34} rx={5} fill={cae > 0.5 ? '#475569' : '#fde68a'} />)}</g>
                      <path d={`M -40 -200 L -20 -150 L -46 -100 L -24 -40`} stroke="#1f2937" strokeWidth={5} fill="none" opacity={cae} />
                      <g transform="translate(0 -250)"><polyline points={`-80,-40 -30,-50 20,${-20 + 60 * cae} 80,${10 + 70 * cae}`} fill="none" stroke={ROJO_M} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></g>
                    </g>
                  ); })()}
                  <Letrero x={3500} y={300} texto="Catalyst Recruiting" fondo={ROJO_M} id={ID} op={e1(t, M('catalyst') + 0.3)} />
                </g>}
                {/* 2004: quiebra There.com */}
                {ve(4080) && <g opacity={e1(t, M('y2004'))}>
                  <g transform={`translate(4080 ${suelo})`}>
                    <Apoyo x={0} y={2} rx={140} />
                    <rect x={-130} y={-210} width={260} height={210} rx={10} fill={isDark ? '#8294b3' : '#475569'} />
                    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-110 + (k % 4) * 58} y={-190 + Math.floor(k / 4) * 60} width={44} height={40} rx={5} fill={t > M('there') + 0.8 + k * 0.15 ? '#334155' : '#fde68a'} />)}
                    <rect x={-40} y={-70} width={80} height={70} rx={6} fill="#1f2937" />
                    {t >= M('there') && <g opacity={e1(t, M('there') + 1.5)} transform={`rotate(${6 * Math.sin(t * 2)} 0 -86)`}><line x1={-20} y1={-86} x2={0} y2={-104} stroke="#94a3b8" strokeWidth={3} /><line x1={20} y1={-86} x2={0} y2={-104} stroke="#94a3b8" strokeWidth={3} /><rect x={-56} y={-86} width={112} height={36} rx={6} fill={ROJO_M} /><Txt f="a" x={0} y={-60} textAnchor="middle" fontSize={22} fill="#fff">CERRADO</Txt></g>}
                  </g>
                  <Letrero x={4080} y={300} texto="There.com" fondo="#475569" id={ID} op={e1(t, M('there'))} />
                </g>}
                {/* IMVU con Will Harvey y sus avatares */}
                {ve(4700) && <g opacity={e1(t, M('imvu'))}>
                  <Portatil x={4700} y={suelo - 20} s={1.35}>
                    <rect x={0} y={0} width={200} height={124} fill="#1e1b4b" />
                    {[0, 1, 2].map((k) => <g key={k} opacity={e1(t, M('imvu') + 0.6 + k * 0.5)}><rect x={k % 2 ? 96 : 14} y={12 + k * 36} width={90} height={26} rx={10} fill={k % 2 ? ROSA : '#6366f1'} /><rect x={(k % 2 ? 96 : 14) + 10} y={22 + k * 36} width={60} height={6} rx={3} fill="#fff" opacity={0.8} /></g>)}
                  </Portatil>
                  {t >= M('avatares') && [0, 1, 2].map((k) => { const sale = sm(t, M('avatares') + k * 0.4, M('avatares') + 1 + k * 0.4); return (
                    <g key={k} transform={`translate(${4700 + (k - 1) * 120} ${suelo - 280 - 20 * sale + 6 * Math.sin(t * 2.5 + k)}) scale(${0.4 + 0.6 * sale})`} opacity={sale}>
                      <path d="M -26 30 L -30 -10 Q 0 -26 30 -10 L 26 30 Z" fill={['#a855f7', '#06b6d4', '#f97316'][k]} /><path d="M 0 -26 Q 30 -10 26 30 H 0 Z" fill="#000" opacity={0.15} />
                      <circle cy={-46} r={22} fill="#fcd9b8" /><path d={`M -22 -50 Q 0 -80 22 -50 Q 10 -60 -22 -50 Z`} fill={['#1f2937', '#f59e0b', '#7c2d12'][k]} />
                    </g>
                  ); })}
                  <Persona id={ID} x={4930} y={suelo + 4} s={0.5} cuerpo={AZUL_M} />
                  <Letrero x={4930} y={suelo + 70} texto="Will Harvey" fondo={AZUL_M} id={ID} op={e1(t, M('imvu') + 0.8)} tam={24} />
                  <Letrero x={4700} y={300} texto="IMVU" id={ID} op={e1(t, M('imvu') + 0.3)} />
                  {t >= M('desacred') && <g opacity={e1(t, M('desacred'))} transform={`translate(5090 ${suelo - 70})`}><rect x={-50} y={-70} width={100} height={130} rx={8} fill="#64748b" /><rect x={-50} y={-70} width={14} height={130} rx={6} fill="#000" opacity={0.2} /><rect x={-30} y={-46} width={64} height={8} rx={4} fill="#cbd5e1" /><rect x={-30} y={-30} width={48} height={8} rx={4} fill="#cbd5e1" /><Cruz x={40} y={-70} r={26} op={e1(t, M('desacred') + 0.8)} /></g>}
                </g>}
                {/* premios */}
                {ve(5320) && <g opacity={e1(t, M('y2007'))}>
                  <g transform={`translate(5320 ${suelo - 140}) rotate(-4)`}><rect x={-90} y={-120} width={180} height={240} rx={8} fill="#fff" style={{ filter: 'drop-shadow(0 4px 10px rgba(15,23,42,0.35))' }} /><rect x={-90} y={-120} width={180} height={44} rx={8} fill="#1f2937" /><Txt f="a" x={0} y={-90} textAnchor="middle" fontSize={20} fill="#fff">BusinessWeek</Txt><Persona id={ID} x={0} y={96} s={0.6} cuerpo={isDark ? '#334155' : '#334155'} corbata /></g>
                  <Letrero x={5320} y={300} texto="2007" id={ID} op={e1(t, M('y2007') + 0.3)} />
                </g>}
                {ve(5800) && <g opacity={e1(t, M('techfellow'))}>
                  <g transform={`translate(5800 ${suelo - 10})`}><Apoyo x={0} y={8} rx={80} /><rect x={-50} y={-40} width={100} height={40} rx={6} fill="#7c4a1e" /><rect x={-12} y={-90} width={24} height={50} fill="#f59e0b" /><path d="M -60 -200 H 60 V -150 Q 60 -96 0 -90 Q -60 -96 -60 -150 Z" fill="#fbbf24" /><path d="M 0 -200 H 60 V -150 Q 60 -96 0 -90 Z" fill="#d97706" opacity={0.4} /><rect x={-40} y={-200 + ((t * 80) % 110)} width={80} height={8} fill="#fff" opacity={0.35} /></g>
                  <Letrero x={5800} y={300} texto="TechFellow, 2009" id={ID} op={e1(t, M('techfellow') + 0.3)} />
                </g>}
                {ve(6280) && <g opacity={e1(t, M('harvard'))}><Universidad x={6280} y={suelo} color="#9f1239" /><Letrero x={6280} y={330} texto="Harvard, 2010" fondo="#9f1239" id={ID} op={e1(t, M('harvard') + 0.3)} /></g>}
                {/* el libro de 2011, superventas */}
                {ve(6800) && <g opacity={e1(t, M('y2011'))}>
                  {Array.from({ length: Math.round(6 * ac(t, M('superventas'), M('superventas') + 1.4)) }, (_, k) => <g key={k} transform={`translate(${6640 + (k % 3) * 40} ${suelo - 10 - Math.floor(k / 3) * 30})`}><rect x={-34} y={-24} width={68} height={24} rx={4} fill={`url(#${ID}-marca)`} /><rect x={-34} y={-24} width={68} height={6} rx={3} fill="#fff" opacity={0.5} /></g>)}
                  <Libro x={6820} y={suelo - 150} s={0.9} id={ID} />
                  {t >= M('superventas') && <g opacity={e1(t, M('superventas'))} transform={`translate(6940 ${suelo - 270}) rotate(${t * 20})`}><path d="M 0 -48 L 13 -15 L 48 -15 L 20 7 L 30 42 L 0 21 L -30 42 L -20 7 L -48 -15 L -13 -15 Z" fill="#fbbf24" /></g>}
                  <Letrero x={6820} y={300} texto="2011" id={ID} op={e1(t, M('y2011') + 0.3)} />
                </g>}
              </g>
              {/* Eric Ries camina por su historia */}
              <g transform={`translate(0 ${moviendo ? -Math.abs(Math.sin(t * 9)) * 6 : 0})`}><Persona id={ID} x={330} y={suelo + 4} s={0.62} cuerpo={isDark ? '#8da2c0' : '#334155'} corbata /></g>
              </g>
            </Toma>

            {/* TOMA 3 · el mapa del recorrido */}
            <Toma t={t} a={M('recorreremos')} b={fin + 5} zi={1.15}>
              <path d={ruta} stroke={c.apagado} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
              <path d={ruta} stroke={`url(#${ID}-marcaH)`} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray="1 1" pathLength={1} strokeDashoffset={1 - ac(t, M('viene') - 0.5, M('criticas') + 0.2)} />
              {paradas.map(([n, txt, x, y], k) => {
                const e = e1(t, M(n));
                const arriba = k % 2 === 1;
                return (
                  <g key={n} opacity={Math.max(0.25, e)}>
                    <circle cx={x} cy={y} r={30} fill={e > 0.5 ? `url(#${ID}-marca)` : c.apagado} style={sombra(0.2, 3, 6)} />
                    <Txt f="a" x={x} y={y + 10} textAnchor="middle" fontSize={28} fill="#fff">{k + 1}</Txt>
                    <Letrero x={x} y={arriba ? y - 64 : y + 64} texto={txt} fondo={c.panel} color={c.texto} id={ID} op={e} />
                  </g>
                );
              })}
              <Furgon x={fx} y={fy + 16} s={0.4} id={ID} t={t} giro={t * 300} />
            </Toma>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
