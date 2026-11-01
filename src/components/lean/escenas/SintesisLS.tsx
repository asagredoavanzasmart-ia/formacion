import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, Engranaje, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, VERDE, VIOLETA } from './comunLS';
import { Toma, Letrero, Apoyo, Furgon, Cohete, Corazon, Visto, Cruz, Moneda3D, sm, cl } from './kitLS';
import { LogoToyota } from './FabricaLS';
import type { PropsCE } from './comunLS';

/**
 * «Aprender más rápido de lo que se gasta» (síntesis), en dos tomas.
 * 1 · Un último paseo: la cámara sigue a la furgoneta por un mundo donde reaparecen los protagonistas de cada
 *     lección: el lanzamiento caro que falla, la fábrica de Toyota, la ampolleta de la innovación, la salida al
 *     terreno con los clientes, los ajustes hacia el blanco, los lotes y el taladro de los porqués, el motor que
 *     encaja con su mercado, el bucle que se acelera y ahorra, y el globo de emprendedores con un árbol que crece
 *     pese a la tormenta de críticas.
 * 2 · La idea de conjunto: no acertar a la primera, sino que la curva de lo que se aprende suba más rápido que
 *     la de lo que se gasta.
 */

const ID = 'ls13';
const nombres = ['avanzar', 'toyota', 'innovacion', 'clientes', 'terreno', 'ajustes', 'lotes', 'porques', 'motores', 'ciclo', 'espera', 'ahorrando', 'mundo', 'criticas', 'crecer', 'acertar', 'aprender', 'pregunta'] as const;
type N = typeof nombres[number];

export const SintesisLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('aprender') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);
  const traje = isDark ? '#8da2c0' : '#334155';

  const rotulos: [number, string][] = [
    [0.2, 'Lanzar es caro'], [M('avanzar'), 'Otra forma de avanzar'], [M('toyota'), 'Nació en Toyota'], [M('innovacion'), 'Llevado a la innovación'], [M('clientes'), 'Conocer a los clientes'], [M('terreno'), 'Salir al terreno'],
    [M('ajustes'), 'Ajustes progresivos'], [M('lotes'), 'Lotes y porqués'], [M('motores'), 'El motor encaja'], [M('ciclo'), 'Un ciclo mejor'], [M('ahorrando'), 'Ahorrar tiempo y dinero'],
    [M('mundo'), 'En todo el mundo'], [M('criticas'), 'Pese a las críticas'], [M('crecer'), 'No deja de crecer'], [M('acertar'), 'No acertar a la primera'], [M('aprender'), 'Aprender más rápido'],
  ];

  /* Toma 1: el paseo */
  const hitos: [N, number][] = [['avanzar', 1150], ['toyota', 1700], ['innovacion', 2250], ['clientes', 2800], ['ajustes', 3400], ['lotes', 3950], ['motores', 4500], ['ciclo', 5100], ['mundo', 5750]];
  let camX = 600;
  for (const [n, x] of hitos) camX = lerp(camX, x, sm(t, M(n) - 1.2, M(n) - 0.05));
  const moviendo = t > 0.4 && hitos.some(([n]) => t > M(n) - 1.2 && t < M(n) - 0.05);
  const dx = 600 - camX;
  const ve = (wx: number) => Math.abs(wx - camX) < 820;
  const suelo = 690;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Síntesis: aprender más rápido de lo que se gasta">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · el último paseo */}
            <Toma t={t} a={-1} b={M('acertar')} zi={1} zo={0.85}>
              <g transform={`translate(${dx * 0.35} 0)`}>{Array.from({ length: 14 }, (_, k) => <circle key={k} cx={200 + k * 380} cy={suelo + 30} r={150 + (k % 3) * 40} fill={isDark ? '#2b3038' : '#eef1f5'} />)}</g>
              <rect x={0} y={suelo} width={1200} height={170} fill={isDark ? '#2a2f37' : '#e5e9ef'} />
              <g transform={`translate(600 ${suelo}) scale(1.2) translate(-600 ${-suelo})`}>
                <g transform={`translate(${dx} 0)`}>
                  <rect x={200} y={suelo + 26} width={6000} height={12} rx={6} fill={isDark ? '#3a424e' : '#cbd5e1'} />
                  {Array.from({ length: 60 }, (_, k) => <rect key={k} x={260 + k * 100} y={suelo + 29} width={46} height={6} rx={3} fill="#fbbf24" opacity={0.7} />)}

                  {/* lanzar es caro y equivocarse, más caro */}
                  {ve(600) && (() => { const sube = sm(t, 0.6, 3), cae = sm(t, 3, 4.6); const y = suelo - 40 - 360 * sube + 400 * cae; return (
                    <g>
                      <Cohete x={600 + 100 * cae} y={Math.min(suelo - 10, y)} s={0.55} t={t} rot={160 * cae} llama={1 - cae} color="#64748b" />
                      <g transform={`translate(720 ${suelo - 260})`} opacity={e1(t, 0.5)}><path d="M -60 -26 H 40 L 64 0 L 40 26 H -60 Z" fill="#f59e0b" /><circle cx={40} cy={0} r={6} fill={c.panel} /><Moneda3D x={-26} y={0} r={14} /><Moneda3D x={4} y={0} r={14} /></g>
                      {cae > 0.9 && <Cruz x={720} y={suelo - 60} r={30} op={sm(t, 4.4, 4.8)} />}
                    </g>
                  ); })()}
                  {/* otra forma de avanzar */}
                  {ve(1150) && <g opacity={e1(t, M('avanzar'))}>{[0, 1, 2, 3].map((k) => <circle key={k} cx={1040 + k * 70} cy={suelo - 30 - k * 20} r={10} fill={NARANJA} opacity={sm(t, M('avanzar') + k * 0.3, M('avanzar') + 0.3 + k * 0.3)} />)}<Letrero x={1150} y={330} texto="Paso a paso" id={ID} /></g>}
                  {/* Toyota */}
                  {ve(1700) && <g opacity={e1(t, M('toyota'))}>
                    <g transform={`translate(1700 ${suelo})`}><Apoyo x={0} y={2} rx={190} /><rect x={-170} y={-170} width={340} height={170} rx={10} fill={isDark ? '#3a4350' : '#e3e8ef'} style={sombra(c.sombra, 6, 14)} />{Array.from({ length: 4 }, (_, k) => <path key={k} d={`M ${-170 + k * 85} -170 L ${-170 + k * 85} -220 L ${-85 + k * 85} -170 Z`} fill="#94a3b8" />)}<rect x={100} y={-90} width={56} height={90} rx={6} fill="#64748b" /><circle cx={-40} cy={-90} r={46} fill="#fff" /><LogoToyota x={-40} y={-90} s={0.36} id={`${ID}-t`} /></g>
                  </g>}
                  {/* la innovación */}
                  {ve(2250) && <g opacity={e1(t, M('innovacion'))}><Bombilla x={2250} y={suelo - 200} s={1.3} t={t} id={ID} /><g transform={`translate(2250 ${suelo - 240})`}><Engranaje x={-12} y={0} r={14} t={t * 3} hueco="#fde047" color="#92400e" /><Engranaje x={14} y={10} r={10} t={-t * 4} hueco="#fde047" color="#b45309" /></g></g>}
                  {/* clientes y terreno */}
                  {ve(2800) && <g opacity={e1(t, M('clientes'))}>
                    <rect x={2600} y={suelo - 18} width={420} height={20} rx={8} fill="#86efac" opacity={0.7} />
                    {[0, 1, 2].map((k) => <g key={k}><Persona id={ID} x={2860 + k * 70} y={suelo} s={0.46} cuerpo={['#ec4899', '#f59e0b', AZUL_M][k]} /><Txt x={2860 + k * 70} y={suelo - 110 + 5 * Math.sin(t * 2 + k)} textAnchor="middle" fontSize={34} fill={c.tenue} opacity={1 - ac(t, M('terreno') + 1, M('terreno') + 2)}>?</Txt><Corazon x={2860 + k * 70} y={suelo - 110} s={0.35} op={ac(t, M('terreno') + 1, M('terreno') + 2)} /></g>)}
                    {t >= M('terreno') && <g opacity={e1(t, M('terreno'))} transform="translate(2700 0)"><Persona id={ID} x={0} y={suelo} s={0.55} cuerpo={traje} corbata /><g transform={`translate(26 ${suelo - 76})`}><rect x={0} y={-10} width={24} height={20} rx={6} fill="#1f2937" /><rect x={0} y={10} width={24} height={20} rx={6} fill="#1f2937" /><circle cx={28} cy={0} r={9} fill="#93c5fd" /><circle cx={28} cy={20} r={9} fill="#93c5fd" /></g></g>}
                  </g>}
                  {/* ajustes progresivos hacia el blanco */}
                  {ve(3400) && <g opacity={e1(t, M('ajustes'))}>
                    <g transform={`translate(3500 ${suelo - 220})`}>{[60, 42, 24, 8].map((r, k) => <circle key={k} r={r} fill={k % 2 ? '#fff' : ROJO_M} />)}</g>
                    {(() => { const pts = [[3240, suelo - 120], [3320, suelo - 240], [3400, suelo - 160], [3460, suelo - 230], [3500, suelo - 220]]; const n = Math.round(ac(t, M('ajustes') + 0.3, M('ajustes') + 3) * 4); return <polyline points={pts.slice(0, n + 1).map((p) => p.join(',')).join(' ')} fill="none" stroke={NARANJA} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12 8" />; })()}
                    <g transform={`translate(3240 ${suelo})`}><rect x={-30} y={-50} width={60} height={50} rx={8} fill="#f59e0b" /><path d="M -30 -50 L 0 -66 L 30 -50 Z" fill="#fde68a" /></g>
                  </g>}
                  {/* lotes pequeños y cinco porqués */}
                  {ve(3950) && <g>
                    <g opacity={e1(t, M('lotes'))}>{[0, 1, 2].map((k) => <rect key={k} x={3780 + k * 56} y={suelo - 44 - 6 * Math.abs(Math.sin(t * 4 + k))} width={44} height={44} rx={8} fill={AZUL_M} />)}</g>
                    <g opacity={e1(t, M('porques'))}>
                      <rect x={3990} y={suelo + 4} width={160} height={150} rx={10} fill={isDark ? '#5b3a1e' : '#c9a27a'} />
                      <rect x={4062} y={suelo - 60} width={16} height={60 + 110 * ac(t, M('porques'), M('porques') + 2)} fill="#94a3b8" /><rect x={4048} y={suelo - 80} width={44} height={24} rx={6} fill="#475569" />
                      <circle cx={4070} cy={suelo + 130} r={14 + 3 * Math.sin(t * 4)} fill={ROJO_M} opacity={ac(t, M('porques') + 1.6, M('porques') + 2)} />
                      <Txt x={4140} y={suelo - 100} textAnchor="middle" fontSize={44} fill={NARANJA}>?</Txt>
                    </g>
                  </g>}
                  {/* el motor encaja con su mercado */}
                  {ve(4500) && <g opacity={e1(t, M('motores'))}>
                    <g transform={`translate(4420 ${suelo})`}><Apoyo x={0} y={2} rx={90} />{[-30, 30].map((px, k) => <rect key={k} x={px - 16} y={-150 - 18 * Math.sin(t * 8 + k * Math.PI)} width={32} height={44} rx={6} fill="#94a3b8" />)}<rect x={-74} y={-110} width={148} height={110} rx={14} fill={NARANJA} /></g>
                    <g transform={`translate(4610 ${suelo - 200})`}><path d="M -70 -36 H -14 V -14 A 14 14 0 0 1 -14 14 V 36 H -70 Z" fill={NARANJA} /><path d="M 56 -36 H 0 V -14 A 14 14 0 0 0 0 14 V 36 H 56 Z" fill={AZUL_M} transform={`translate(${-14 + 30 * (1 - sm(t, M('motores') + 0.5, M('motores') + 1.6))} 0)`} /></g>
                  </g>}
                  {/* el ciclo que rinde más y ahorra */}
                  {ve(5100) && (() => { const vel = lerp(0.5, 2.2, sm(t, M('ciclo'), M('ciclo') + 2)); return (
                    <g opacity={e1(t, M('ciclo'))}>
                      <g transform={`translate(5020 ${suelo - 200})`}>
                        <circle r={100} fill="none" stroke={c.apagado} strokeWidth={14} opacity={0.5} />
                        {[0, 1, 2].map((k) => { const a0 = -Math.PI / 2 + (k * 2 * Math.PI) / 3 + 0.35, a1 = a0 + (2 * Math.PI) / 3 - 0.7; return <path key={k} d={`M ${100 * Math.cos(a0)} ${100 * Math.sin(a0)} A 100 100 0 0 1 ${100 * Math.cos(a1)} ${100 * Math.sin(a1)}`} stroke={[NARANJA, AZUL_M, ROSA][k]} strokeWidth={14} fill="none" strokeLinecap="round" />; })}
                        {(() => { const a = -Math.PI / 2 + t * vel * 2; return <circle cx={100 * Math.cos(a)} cy={100 * Math.sin(a)} r={16} fill="#fff" stroke={NARANJA} strokeWidth={6} />; })()}
                        {t >= M('espera') && <Corazon x={0} y={0} s={0.7 + 0.06 * Math.sin(t * 5)} op={e1(t, M('espera'))} />}
                      </g>
                      {t >= M('ahorrando') && <g opacity={e1(t, M('ahorrando'))} transform={`translate(5230 ${suelo})`}>
                        <ellipse cx={0} cy={-60} rx={70} ry={56} fill={ROSA} /><circle cx={60} cy={-70} r={18} fill={ROSA} /><circle cx={66} cy={-72} r={4} fill="#9d174d" /><rect x={-40} y={-16} width={16} height={18} rx={4} fill={ROSA} /><rect x={24} y={-16} width={16} height={18} rx={4} fill={ROSA} /><circle cx={-20} cy={-82} r={8} fill="#fff" opacity={0.4} /><rect x={-16} y={-118} width={32} height={8} rx={4} fill="#9d174d" />
                        {[0, 1, 2].map((k) => { const ph = ((t - M('ahorrando')) * 0.8 + k / 3) % 1; return <Moneda3D key={k} x={0} y={-220 + 100 * ph} r={14} op={ph < 0.9 ? 1 : 0} giro={Math.cos(t * 4 + k)} />; })}
                      </g>}
                    </g>
                  ); })()}
                  {/* el mundo, las críticas y el crecimiento */}
                  {ve(5750) && <g>
                    <g opacity={e1(t, M('mundo'))} transform={`translate(5650 ${suelo - 190})`}>
                      <circle r={110} fill={AZUL_M} /><path d="M -60 -60 Q -20 -80 0 -50 Q 20 -20 -10 0 Q -40 10 -50 -20 Z M 20 20 Q 60 10 70 40 Q 50 80 20 70 Z M 30 -80 Q 70 -70 80 -30 Q 50 -40 30 -80 Z" fill="#22c55e" />
                      {Array.from({ length: 6 }, (_, k) => { const a = k * 1.1 + 0.4; const r = 70 + (k % 2) * 20; return <g key={k} opacity={sm(t, M('mundo') + 0.3 + k * 0.2, M('mundo') + 0.6 + k * 0.2)} transform={`translate(${r * Math.cos(a)} ${r * Math.sin(a) - 14})`}><path d="M 0 14 C -12 0 -12 -14 0 -14 C 12 -14 12 0 0 14 Z" fill={NARANJA} /><circle cy={-4} r={4} fill="#fff" /></g>; })}
                    </g>
                    {t >= M('criticas') && <g opacity={e1(t, M('criticas'))} transform={`translate(5900 ${suelo - 360})`}><circle cx={-50} cy={10} r={40} fill="#64748b" /><circle cx={0} cy={-10} r={52} fill="#64748b" /><circle cx={56} cy={8} r={42} fill="#64748b" /><rect x={-90} y={10} width={190} height={40} rx={20} fill="#64748b" />{Array.from({ length: 8 }, (_, k) => { const ph = (t * 1.5 + k / 8) % 1; return <rect key={k} x={-80 + k * 22} y={56 + 120 * ph} width={3} height={14} rx={1.5} fill={AZUL_M} opacity={0.6 * (1 - ph)} />; })}</g>}
                    {t >= M('crecer') && (() => { const g = sm(t, M('crecer'), M('crecer') + 3); return <g transform={`translate(5910 ${suelo})`}><rect x={-8} y={-200 * g} width={16} height={200 * g} rx={6} fill="#7c4a1e" /><circle cx={0} cy={-200 * g - 50 * g} r={80 * g} fill="#22c55e" /><circle cx={-50 * g} cy={-200 * g - 10 * g} r={44 * g} fill="#16a34a" /><circle cx={50 * g} cy={-200 * g - 20 * g} r={48 * g} fill="#16a34a" /></g>; })()}
                  </g>}
                </g>
                {/* la furgoneta que recorre todo */}
                <g transform={`translate(0 ${moviendo ? -Math.abs(Math.sin(t * 9)) * 4 : 0})`}><Furgon x={360} y={suelo + 28} s={0.55} id={ID} t={t} giro={camX * 2} luz={1} /></g>
              </g>
            </Toma>

            {/* TOMA 2 · aprender más rápido de lo que se gasta */}
            <Toma t={t} a={M('acertar')} b={fin + 5} zi={1.15}>
              <rect x={170} y={210} width={860} height={520} rx={28} fill={c.panel} style={sombra(c.sombra, 10, 26)} />
              <rect x={240} y={660} width={740} height={5} rx={2} fill={c.apagado} /><rect x={240} y={270} width={5} height={395} rx={2} fill={c.apagado} />
              {(() => { const u = ac(t, M('acertar') + 0.3, M('aprender') + 2.4); const n = Math.max(2, Math.round(30 * u)); const ap = Array.from({ length: 30 }, (_, k) => { const f = k / 29; return [250 + f * 720, 650 - 360 * (f ** 1.4)] as [number, number]; }); const ga = Array.from({ length: 30 }, (_, k) => { const f = k / 29; return [250 + f * 720, 650 - 120 * f - 20 * Math.sin(f * 6) * f] as [number, number]; }); return (
                <g>
                  <polyline points={ga.slice(0, n).map((p) => p.join(',')).join(' ')} fill="none" stroke="#f59e0b" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points={ap.slice(0, n).map((p) => p.join(',')).join(' ')} fill="none" stroke={VERDE} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
                  <path d={`M ${ap.slice(0, n).map((p) => p.join(' ')).join(' L ')} L ${ga[n - 1][0]} ${ga[n - 1][1]} L ${ga.slice(0, n).reverse().map((p) => p.join(' ')).join(' L ')} Z`} fill={VERDE} opacity={0.12} />
                  {u > 0.95 && <g><Letrero x={ap[29][0] - 60} y={ap[29][1] - 40} texto="Aprender" fondo={VERDE} id={ID} /><Letrero x={ga[29][0] - 50} y={ga[29][1] + 46} texto="Gastar" fondo="#f59e0b" id={ID} /></g>}
                </g>
              ); })()}
              {/* no acertar a la primera: un dardo que falla y otro que acierta */}
              <g opacity={1 - ac(t, M('aprender') + 0.5, M('aprender') + 1)}>
                <g transform="translate(360 330)">{[34, 22, 10].map((r, k) => <circle key={k} r={r} fill={k % 2 ? '#fff' : ROJO_M} />)}</g>
                <g transform={`translate(${lerp(260, 300, sm(t, M('acertar') + 0.3, M('acertar') + 0.8))} ${lerp(420, 300, sm(t, M('acertar') + 0.3, M('acertar') + 0.8))}) rotate(-40)`}><rect x={-3} y={-30} width={6} height={30} fill="#64748b" /><path d="M -8 -30 L 0 -42 L 8 -30 Z" fill="#334155" /></g>
              </g>
            </Toma>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
