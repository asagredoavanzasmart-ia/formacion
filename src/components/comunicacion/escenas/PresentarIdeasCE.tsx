import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Etiqueta, Gesto, PanelPregunta, Reloj, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Te juzgan antes que a tu idea» (Elsbach), escena propia. Acto A: la ampolleta de las ideas; Elsbach
 * observa seis años en las colinas de Hollywood, sesiones de treinta minutos y otras salas (diseño,
 * marketing, capital de riesgo). Acto B: el receptor; la persona eclipsa a la idea; 150 milisegundos; el
 * sombrero seleccionador sobre su cabeza; docenas de carpetas y un embudo del que sale solo el 1 %.
 * Acto C: los cuatro estereotipos en cuatro cuadros (el pusilánime que cambia rojo por azul, el robot
 * enlatado, el vendedor de autos usados que repite, el caso de caridad que ruega). Acto D: el 25 % que
 * triunfa construye la idea junto al receptor, con pasión, como colaborador.
 */

const ID = 'ce25';
const nombres = ['ideas', 'elsbach', 'seisAnos', 'hollywood', 'treinta', 'capital', 'receptor', 'eclipsar', 'ms150', 'juicios', 'sombrero', 'docenas', 'uno', 'cuatro', 'pusilanime', 'rojo', 'robot', 'enlatadas', 'autos', 'otraVez', 'caridad', 'p25', 'pasion', 'colaborador', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Ampolleta encendida. */
const Ampolleta: React.FC<{ x: number; y: number; t: number; id: string }> = ({ x, y, t, id }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={90} fill="#fde68a" opacity={0.25 + 0.1 * Math.sin(t * 4)} />
    <path d="M -46 10 Q -66 -30 -40 -62 Q 0 -100 40 -62 Q 66 -30 46 10 Q 30 30 28 50 H -28 Q -30 30 -46 10 Z" fill={`url(#${id}-marca)`} />
    <rect x={-26} y={52} width={52} height={14} rx={5} fill="#9ca3af" /><rect x={-22} y={68} width={44} height={12} rx={5} fill="#6b7280" />
    <path d="M -14 0 L -6 -24 L 6 0 L 14 -24" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>
);

/* Colinas con el letrero de Hollywood (bloques blancos). */
const Colinas: React.FC<{ x: number; y: number; c: C; u: number }> = ({ x, y, c, u }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -320 120 Q -200 -40 -60 40 Q 80 -60 220 30 Q 300 0 340 120 Z" fill="#65a30d" opacity={0.7} />
    <path d="M -340 120 Q -240 40 -120 90 Q 40 20 340 120 Z" fill="#4d7c0f" opacity={0.8} />
    {Array.from({ length: 9 }, (_, k) => (
      <rect key={k} x={-230 + k * 50} y={-10 + Math.abs(k - 4) * 6} width={36} height={46} rx={3} fill={c.blanco} opacity={ac(u, k / 12, k / 12 + 0.25)} style={sombra(c.sombra, 2, 4)} />
    ))}
  </g>
);

/* Sombrero puntiagudo de mago, algo arrugado. */
const Sombrero: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <g transform={`translate(${x} ${y}) rotate(${6 * Math.sin(t * 2)})`}>
    <ellipse cx={0} cy={0} rx={70} ry={16} fill="#5b3a26" />
    <path d="M -46 -4 Q -30 -60 -10 -90 Q 10 -120 40 -110 Q 20 -96 18 -70 Q 22 -30 46 -4 Z" fill="#7c4a24" />
    <path d="M -26 -50 Q 0 -40 24 -52" stroke="#5b3a26" strokeWidth={5} fill="none" />
  </g>
);

/* Cabeza de robot. */
const Robot: React.FC<{ x: number; y: number; t: number; c: C }> = ({ x, y, t, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <line x1={0} y1={-62} x2={0} y2={-84} stroke={c.tenue} strokeWidth={5} /><circle cx={0} cy={-88} r={8} fill={ROSA} opacity={0.5 + 0.5 * Math.sin(t * 6)} />
    <rect x={-54} y={-62} width={108} height={90} rx={16} fill="#94a3b8" />
    <rect x={-36} y={-40} width={22} height={18} rx={4} fill="#1f2937" /><rect x={14} y={-40} width={22} height={18} rx={4} fill="#1f2937" />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-30 + k * 16} y={-2} width={10} height={12} fill="#1f2937" />)}
  </g>
);

/* Auto con signo de dólar para el vendedor de autos usados. */
const AutoUsado: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -80 0 Q -80 -24 -56 -28 L -30 -30 Q -14 -58 20 -58 Q 50 -58 62 -30 L 74 -28 Q 86 -24 86 0 Z" fill="#a8a29e" />
    <circle cx={-44} cy={2} r={15} fill="#1f2937" /><circle cx={50} cy={2} r={15} fill="#1f2937" />
    <rect x={-10} y={-96} width={60} height={34} rx={6} fill="#facc15" />
    <Txt x={20} y={-70} textAnchor="middle" fontSize={26} fill="#1f2937">$</Txt>
  </g>
);

export const PresentarIdeasCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('colaborador') + 1 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Ideas creativas'], [M('elsbach'), 'Kimberly Elsbach'], [M('hollywood'), 'Hollywood'], [M('treinta'), 'Treinta minutos'],
    [M('receptor'), 'El receptor'], [M('eclipsar'), 'Te juzga a ti'], [M('ms150'), '150 milisegundos'], [M('sombrero'), 'Clasifica en segundos'],
    [M('uno'), 'Solo pasa el 1 %'], [M('cuatro'), 'Cuatro estereotipos'], [M('p25'), 'El 25 % que triunfa'], [M('colaborador'), 'Un colaborador'],
  ];

  const aA = ventana(t, -1, M('receptor'));
  const aB = ventana(t, M('receptor'), M('cuatro'));
  const aC = ventana(t, M('cuatro'), M('p25'));
  const aD = ac(t, M('p25'), M('p25') + 0.4);

  /* Los cuatro estereotipos: posición del cuadro, rótulo y marca en que entra. */
  const cuadros = [
    { x: 330, y: 210, txt: 'pusilánime', t0: M('pusilanime') },
    { x: 870, y: 210, txt: 'robot', t0: M('robot') },
    { x: 330, y: 480, txt: 'autos usados', t0: M('autos') },
    { x: 870, y: 480, txt: 'caso de caridad', t0: M('caridad') },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Quien escucha te juzga antes que a tu idea: cuatro estereotipos y lo que hacen quienes triunfan">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · Elsbach en Hollywood */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <g opacity={ventana(t, -1, M('treinta'))}>
                  <Ampolleta x={900} y={320} t={t} id={ID} />
                  <Etiqueta x={900} y={460} texto="ideas creativas" op={1} c={c} id={ID} />
                </g>
                <g opacity={e1(t, M('elsbach'))}>
                  <Persona id={ID} x={180} y={760} pelo="#7c3f1d" cuerpo="#7c3aed" />
                  <Gesto x={180} y={760} animo={0.4} />
                  <rect x={204} y={640} width={46} height={60} rx={6} fill={c.blanco} style={sombra(c.sombra, 2, 4)} />
                  <Etiqueta x={180} y={820} texto="Elsbach" op={1} c={c} id={ID} />
                </g>
                <g opacity={ventana(t, M('seisAnos'), M('capital') - 1.2)}>
                  <Txt x={470} y={300} textAnchor="middle" fontSize={72} fill={`url(#${ID}-marcaH)`}>6 años</Txt>
                  <Etiqueta x={470} y={360} texto="50 ejecutivos" op={1} c={c} id={ID} />
                </g>
                <g opacity={e1(t, M('hollywood'))}><Colinas x={660} y={620} c={c} u={ac(t, M('hollywood'), M('hollywood') + 1.4)} /></g>
                <g opacity={e1(t, M('treinta'))}>
                  <Reloj x={900} y={320} s={1.3} c={c} progreso={ac(t, M('treinta'), M('treinta') + 3) * 0.5} />
                  <Etiqueta x={900} y={430} texto="30 minutos" op={1} c={c} id={ID} />
                </g>
                {['diseño', 'marketing', 'capital de riesgo'].map((txt, k) => <Chip key={txt} x={470} y={250 + k * 85} texto={txt} c={c} id={ID} op={e1(t, M('capital') - 1 + k * 0.5)} />)}
              </g>
            )}

            {/* B · el receptor juzga a quien presenta */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const ecl = ac(t, M('eclipsar'), M('eclipsar') + 2);
                  const flujo = ventana(t, M('docenas'), M('uno') + 0.6);
                  return (
                    <g>
                      <Persona id={ID} x={200} y={760} cuerpo="#334155" />
                      <Gesto x={200} y={760} animo={0.3} />
                      <Etiqueta x={200} y={820} texto="quien presenta" op={1} c={c} id={ID} />
                      <Persona id={ID} x={1000} y={760} cuerpo="#1f2937" corbata />
                      <Gesto x={1000} y={760} animo={0} />
                      <Etiqueta x={1000} y={820} texto="receptor" op={1} c={c} id={ID} marca />
                      <g opacity={e1(t, M('sombrero'))}><Sombrero x={1000} y={600} t={t} /></g>
                      {/* la persona eclipsa a la idea */}
                      <g opacity={ventana(t, M('eclipsar'), M('ms150'))}>
                        <circle cx={600} cy={420} r={90} fill={NARANJA} />
                        <Txt f="a" x={600} y={430} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">idea</Txt>
                        <circle cx={380 + 170 * ecl} cy={420} r={100} fill={ROSA} opacity={0.92} />
                        <Txt f="a" x={380 + 170 * ecl} y={430} textAnchor="middle" fontSize={MIN_TXT} fill="#fff" opacity={ecl}>tú</Txt>
                      </g>
                      <g opacity={ventana(t, M('ms150'), M('docenas'))}>
                        <Txt x={600} y={420} textAnchor="middle" fontSize={96} fill={`url(#${ID}-marcaH)`}>150 ms</Txt>
                        <Chip x={600} y={520} texto="juicio duradero" c={c} id={ID} op={e1(t, M('juicios'))} />
                      </g>
                      {/* docenas de carpetas hacia el embudo */}
                      <g opacity={flujo}>
                        {Array.from({ length: 8 }, (_, k) => {
                          const u = ((t - M('docenas')) * 0.5 + k / 8) % 1;
                          return <rect key={k} x={300 + 260 * u - 30} y={260 + 60 * Math.sin(k)} width={60} height={44} rx={6} fill={k % 2 ? NARANJA : c.apagado} opacity={1 - u} />;
                        })}
                      </g>
                      <g opacity={e1(t, M('uno'))}>
                        <path d="M 520 260 H 760 L 660 400 V 470 H 620 V 400 Z" fill={c.panel2} style={sombra(c.sombra, 3, 8)} />
                        <circle cx={640} cy={500 + 20 * ((t * 0.8) % 1)} r={12} fill={NARANJA} />
                        <Txt x={640} y={590} textAnchor="middle" fontSize={64} fill={`url(#${ID}-marcaH)`}>1 %</Txt>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · los cuatro estereotipos */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {cuadros.map((q, k) => {
                  const marco = e1(t, M('cuatro') + 0.3 + k * 0.25);
                  const op = e1(t, q.t0);
                  if (marco < 0.01) return null;
                  return (
                    <g key={q.txt} opacity={marco}>
                      <rect x={q.x - 210} y={q.y} width={420} height={240} rx={22} fill={c.panel} style={sombra(c.sombra)} />
                      <Txt x={q.x} y={q.y + 140} textAnchor="middle" fontSize={64} fill={c.apagado} opacity={1 - op}>?</Txt>
                      <Txt f="a" x={q.x} y={q.y + 222} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={op}>{q.txt}</Txt>
                      <g opacity={op} transform={`translate(${q.x} ${q.y + 130})`}>
                        {k === 0 && (() => {
                          const cambia = ac(t, M('rojo'), M('rojo') + 1);
                          return (
                            <g>
                              <Persona id={ID} x={-90} y={30} s={0.6 - 0.08 * cambia} cuerpo="#64748b" />
                              <Gesto x={-90} y={30} s={0.6 - 0.08 * cambia} animo={-0.4} />
                              <rect x={10} y={-70} width={60} height={60} rx={10} fill="#ef4444" opacity={1 - 0.7 * cambia} />
                              <rect x={90} y={-70} width={60} height={60} rx={10} fill="#3b82f6" opacity={0.3 + 0.7 * cambia} />
                            </g>
                          );
                        })()}
                        {k === 1 && (
                          <g>
                            <Robot x={-80} y={0} t={t} c={c} />
                            {[0, 1, 2].map((j) => <rect key={j} x={10} y={-80 + j * 26} width={140} height={12} rx={6} fill={c.apagado} opacity={e1(t, M('enlatadas') + j * 0.3)} />)}
                          </g>
                        )}
                        {k === 2 && (
                          <g>
                            <AutoUsado x={-60} y={20} />
                            <g opacity={e1(t, M('otraVez'))} transform={`translate(100 -40) rotate(${t * 180})`}>
                              <path d="M 0 -34 A 34 34 0 1 1 -30 -16" stroke={ROSA} strokeWidth={8} fill="none" strokeLinecap="round" />
                              <path d="M -40 -26 L -30 -10 L -16 -22" stroke={ROSA} strokeWidth={8} fill="none" strokeLinecap="round" />
                            </g>
                          </g>
                        )}
                        {k === 3 && (
                          <g>
                            <Persona id={ID} x={-80} y={30} s={0.6} cuerpo="#64748b" />
                            <Gesto x={-80} y={30} s={0.6} animo={-0.6} />
                            <path d="M 20 -40 Q 60 -80 100 -40 Q 60 0 20 -40 Z" fill={ROSA} opacity={0.7} transform={`translate(0 ${6 * Math.sin(t * 3)})`} />
                            <Txt f="a" x={60} y={10} textAnchor="middle" fontSize={24} fill={c.tenue}>por favor</Txt>
                          </g>
                        )}
                      </g>
                    </g>
                  );
                })}
              </g>
            )}

            {/* D · el 25 % construye la idea con el receptor */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const arma = ac(t, M('pasion') + 1, M('colaborador'));
                  const n = Math.round(6 * arma);
                  return (
                    <g>
                      <Txt x={600} y={280} textAnchor="middle" fontSize={96} fill={`url(#${ID}-marcaH)`}>25 %</Txt>
                      <Persona id={ID} x={250} y={760} cuerpo="#334155" />
                      <Gesto x={250} y={760} animo={0.8} />
                      <Persona id={ID} x={950} y={760} cuerpo="#1f2937" corbata />
                      <Gesto x={950} y={760} animo={0.2 + 0.7 * arma} />
                      <Etiqueta x={950} y={820} texto="receptor" op={1} c={c} id={ID} />
                      {/* la pasión: una llama sobre quien presenta */}
                      <g opacity={e1(t, M('pasion'))} transform={`translate(250 ${520 + 4 * Math.sin(t * 8)})`}>
                        <path d="M 0 40 Q -40 10 -20 -30 Q -10 -10 0 -50 Q 14 -10 24 -30 Q 40 10 0 40 Z" fill={`url(#${ID}-marca)`} />
                      </g>
                      {/* la idea que construyen juntos */}
                      {Array.from({ length: n }, (_, k) => (
                        <rect key={k} x={540 + (k % 2) * 60 - 2} y={700 - Math.floor(k / 2) * 52 - 50} width={56} height={46} rx={8} fill={k % 2 ? ROSA : NARANJA} style={sombra(c.sombra, 2, 4)} />
                      ))}
                      <rect x={500} y={700} width={200} height={14} rx={6} fill={c.apagado} opacity={e1(t, M('pasion') + 0.8)} />
                      <Chip x={600} y={400} texto="colaborador" c={c} id={ID} op={e1(t, M('colaborador'))} marca />
                      <g opacity={ventana(t, M('pasion') + 1.2, M('colaborador'))}>
                        <Burbuja x={930} y={560} w={300} texto="¿Y si...?" u={1} c={c} lado="der" id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
