import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Brazos, Burbuja, Chip, Cruz, Espalda, Etiqueta, Gesto, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Hablar con autenticidad», escena propia. Acto A: Carol en el escenario ante su equipo, de espaldas:
 * anécdota, gráficos de crecimiento, gestos y una meta; el medidor de energía de la sala no sube.
 * Acto B: dos conversaciones viajan de Carol a quien escucha, palabras arriba y cuerpo abajo; el
 * público le cree al cuerpo. El gesto nace antes que la palabra (dos impulsos en el tiempo) y el
 * abrazo empieza antes que el «me alegra verte». Acto C: improvisar es un camino que tambalea; el gesto
 * ensayado llega tarde y la pieza no encaja; el público escéptico cruza la mirada.
 */

const ID = 'ce1a';
const nombres = ['falsa', 'morgan', 'carol', 'anecdota', 'graficos', 'gestos', 'meta', 'enciende', 'dos', 'cuerpo', 'cree', 'primero', 'abrazo', 'improvisar', 'ensayar', 'despues', 'cuadra', 'escepticos', 'pregunta'] as const;

/* Pulso en una línea de tiempo: pico que sube y baja en x0. */
const Pulso: React.FC<{ x0: number; y: number; alto: number; color: string; u: number }> = ({ x0, y, alto, color, u }) => (
  <path d={`M 140 ${y} L ${x0 - 40} ${y} L ${x0} ${y - alto * u} L ${x0 + 40} ${y} L 900 ${y}`} stroke={color} strokeWidth={7} fill="none" strokeLinejoin="round" strokeLinecap="round" />
);

export const AutenticidadCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('escepticos') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Bien ensayada y suena falsa'], [M('carol'), 'Carol, vicepresidenta de ventas'], [M('enciende'), 'La sala no se enciende'],
    [M('dos'), 'Dos conversaciones'], [M('cree'), 'El público le cree al cuerpo'], [M('primero'), 'El gesto llega primero'],
    [M('abrazo'), 'Como un abrazo'], [M('improvisar'), 'Improvisar no funciona'], [M('ensayar'), 'Ensayar gestos, tampoco'],
    [M('cuadra'), 'Algo no cuadra'], [M('escepticos'), 'Clientes más escépticos'],
  ];

  const aA = ventana(t, -1, M('dos'));
  const aB = ventana(t, M('dos'), M('improvisar'));
  const aC = ac(t, M('improvisar'), M('improvisar') + 0.4);

  // Gestos de Carol: suben y bajan mientras «acompaña sus palabras con gestos».
  const g = ac(t, M('gestos'), M('gestos') + 0.4) * (1 - ac(t, M('meta') + 1.5, M('meta') + 2));
  const brazoI = 10 + g * (60 + 35 * Math.sin(t * 3)) + 120 * ac(t, M('meta'), M('meta') + 0.6) * (1 - ac(t, M('enciende'), M('enciende') + 0.6));
  const brazoD = 10 + g * (60 + 35 * Math.sin(t * 3 + 1.4));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Carol presenta todo bien ensayado pero no conecta: el público escucha dos conversaciones y le cree al cuerpo, cuyo gesto nace antes que la palabra">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · Carol en el escenario */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <g opacity={e1(t, M('morgan'))}><Chip x={270} y={170} texto="Nick Morgan" c={c} id={ID} op={1} /></g>
                {/* escenario */}
                <path d="M 150 600 L 810 600 L 760 640 L 200 640 Z" fill={c.apagado} opacity={e1(t, 0.2)} />
                <path d="M 200 640 L 760 640 L 760 664 L 200 664 Z" fill={c.tenue} opacity={0.6 * e1(t, 0.2)} />
                {/* pantalla con gráficos de crecimiento */}
                <g opacity={e1(t, M('graficos'))} transform="translate(640 330)">
                  <rect x={-150} y={-110} width={300} height={200} rx={16} fill={c.panel} style={sombra(c.sombra)} />
                  {[0.35, 0.55, 0.75, 0.95].map((v, k) => {
                    const h = 150 * v * ac(t, M('graficos') + 0.2 + k * 0.2, M('graficos') + 0.8 + k * 0.2);
                    return <rect key={k} x={-110 + k * 60} y={70 - h} width={40} height={h} rx={8} fill={k === 3 ? NARANJA : c.tenue} />;
                  })}
                </g>
                {/* Carol */}
                <g opacity={e1(t, M('carol') - 0.2)}>
                  <Brazos x={400} y={610} s={1} izq={brazoI} der={brazoD} id={ID} />
                  <Persona id={ID} x={400} y={610} s={1} pelo="#7c2d12" />
                  <Gesto x={400} y={610} s={1} animo={0.5} />
                </g>
                {/* anécdota */}
                <g opacity={ventana(t, M('anecdota'), M('graficos'))}>
                  <Burbuja x={430} y={420} w={380} texto="Cuando era vendedora en terreno…" u={ac(t, M('anecdota'), M('anecdota') + 1.4)} c={c} id={ID} />
                </g>
                {/* meta exigente */}
                {(() => {
                  const op = e1(t, M('meta'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op} transform="translate(230 360)">
                      <rect x={-4} y={-90} width={8} height={150} rx={4} fill={c.tenue} />
                      <path d={`M 4 -90 Q 40 ${-96 + 6 * Math.sin(t * 4)} 76 -84 V -40 Q 40 ${-48 - 6 * Math.sin(t * 4)} 4 -44 Z`} fill={`url(#${ID}-marca)`} />
                      <Txt f="a" x={0} y={100} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>meta</Txt>
                    </g>
                  );
                })()}
                {/* público de espaldas */}
                <g opacity={e1(t, M('carol'))}>
                  {[0, 1, 2, 3, 4, 5].map((k) => <Espalda key={`a${k}`} x={190 + k * 125} y={730} s={1} c={c} pelo={['#2b1a12', '#5b3a29', '#1f2937', '#7c2d12', '#374151', '#2b1a12'][k]} cuerpo={k % 2 ? '#64748b' : '#94a3b8'} />)}
                  {[0, 1, 2, 3, 4].map((k) => <Espalda key={`b${k}`} x={250 + k * 125} y={810} s={1.05} c={c} pelo={['#374151', '#2b1a12', '#5b3a29', '#1f2937', '#7c2d12'][k]} cuerpo={k % 2 ? '#94a3b8' : '#64748b'} />)}
                </g>
                {/* energía de la sala: no sube */}
                {(() => {
                  const op = e1(t, M('enciende') - 0.2);
                  if (op < 0.01) return null;
                  const v = 0.18 + 0.05 * Math.sin(t * 2);
                  return (
                    <g opacity={op} transform="translate(1010 250)">
                      <rect x={-26} y={0} width={52} height={300} rx={26} fill={c.apagado} />
                      <rect x={-26} y={300 - 300 * v} width={52} height={300 * v} rx={26} fill={ROSA} />
                      <circle cx={0} cy={330} r={40} fill={ROSA} />
                      <Txt f="a" x={0} y={-24} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>energía</Txt>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B · dos conversaciones, el gesto primero, el abrazo */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const op = ventana(t, M('dos'), M('abrazo'));
                  if (op < 0.01) return null;
                  const cree = ac(t, M('cree'), M('cree') + 0.6);
                  return (
                    <g opacity={op}>
                      <Brazos x={240} y={780} s={1.1} izq={20 + 40 * (0.5 + 0.5 * Math.sin(t * 2.6))} der={18} id={ID} />
                      <Persona id={ID} x={240} y={780} s={1.1} pelo="#7c2d12" />
                      <Gesto x={240} y={780} s={1.1} animo={0.4} />
                      <Persona id={ID} x={960} y={780} s={1.1} cuerpo="#64748b" />
                      <Gesto x={960} y={780} s={1.1} animo={0.1 + 0.5 * cree} />
                      {cree > 0.5 && <g transform="translate(960 560)"><Visto x={0} y={0} s={1.1} /></g>}
                    </g>
                  );
                })()}
                {/* Las dos pistas: palabras y cuerpo */}
                {(() => {
                  const op = ventana(t, M('dos'), M('primero'));
                  if (op < 0.01) return null;
                  const cree = ac(t, M('cree'), M('cree') + 0.6);
                  const pista = (y: number, k: number, tipo: 'p' | 'c') => {
                    const u = ((t - M('dos')) * 0.4 + k / 3) % 1;
                    const x = lerp(330, 880, u);
                    return tipo === 'p'
                      ? <g key={`p${k}`} transform={`translate(${x} ${y})`} opacity={Math.sin(Math.PI * u) * (1 - 0.7 * cree)}><rect x={-44} y={-22} width={88} height={44} rx={22} fill={c.panel} style={sombra(c.sombra, 3, 6)} /><rect x={-26} y={-4} width={52} height={8} rx={4} fill={c.apagado} /></g>
                      : <g key={`c${k}`} transform={`translate(${x} ${y}) scale(${1 + 0.25 * cree})`} opacity={Math.sin(Math.PI * u)}><path d="M -14 26 V -10 Q -14 -20 -6 -20 Q 2 -20 2 -10 V -30 Q 2 -40 10 -40 Q 18 -40 18 -30 V 0 L 26 -10 Q 34 -16 38 -8 L 22 26 Z" fill={NARANJA} /></g>;
                  };
                  return (
                    <g opacity={op}>
                      <line x1={330} y1={330} x2={880} y2={330} stroke={c.apagado} strokeWidth={4} strokeDasharray="8 12" opacity={1 - 0.6 * cree} />
                      <line x1={330} y1={480} x2={880} y2={480} stroke={NARANJA} strokeWidth={4 + 4 * cree} strokeDasharray="8 12" opacity={0.5 + 0.5 * cree} />
                      {[0, 1, 2].map((k) => pista(330, k, 'p'))}
                      {[0, 1, 2].map((k) => pista(480, k, 'c'))}
                      <Etiqueta x={600} y={280} texto="lo que dices" op={e1(t, M('dos') + 0.4) * (1 - 0.6 * cree)} c={c} id={ID} />
                      <Etiqueta x={600} y={430} texto="lo que dice tu cuerpo" op={e1(t, M('cuerpo'))} c={c} id={ID} marca />
                    </g>
                  );
                })()}
                {/* El gesto nace antes que la palabra */}
                {(() => {
                  const op = ventana(t, M('primero'), M('abrazo'));
                  if (op < 0.01) return null;
                  const ug = ac(t, M('primero') + 0.3, M('primero') + 0.8), up = ac(t, M('primero') + 1.1, M('primero') + 1.6);
                  return (
                    <g opacity={op} transform="translate(80 0)">
                      <rect x={110} y={200} width={830} height={340} rx={26} fill={c.panel} style={sombra(c.sombra)} />
                      <Txt f="a" x={150} y={250} fontSize={MIN_TXT} fill={NARANJA}>gesto</Txt>
                      <Pulso x0={430} y={360} alto={90} color={NARANJA} u={ug} />
                      <Txt f="a" x={150} y={420} fontSize={MIN_TXT} fill={c.texto}>palabra</Txt>
                      <Pulso x0={620} y={500} alto={70} color={c.tenue} u={up} />
                      <path d="M 440 395 L 600 395" stroke={c.texto} strokeWidth={4} markerEnd="" opacity={up} />
                      <path d="M 588 385 L 604 395 L 588 405" stroke={c.texto} strokeWidth={4} fill="none" opacity={up} />
                    </g>
                  );
                })()}
                {/* El abrazo empieza antes que la frase */}
                {(() => {
                  const op = ventana(t, M('abrazo'), M('improvisar'));
                  if (op < 0.01) return null;
                  const abre = ac(t, M('abrazo') + 0.3, M('abrazo') + 1.1);
                  const junta = ac(t, M('abrazo') + 1.6, M('abrazo') + 2.4);
                  return (
                    <g opacity={op}>
                      <Brazos x={lerp(430, 540, junta)} y={720} s={1.1} izq={20} der={lerp(20, 120, abre) - 30 * junta} id={ID} />
                      <Persona id={ID} x={lerp(430, 540, junta)} y={720} s={1.1} />
                      <Gesto x={lerp(430, 540, junta)} y={720} s={1.1} animo={0.8} />
                      <Brazos x={lerp(770, 660, junta)} y={720} s={1.1} izq={lerp(20, 120, abre) - 30 * junta} der={20} color="#64748b" id={ID} />
                      <Persona id={ID} x={lerp(770, 660, junta)} y={720} s={1.1} cuerpo="#64748b" />
                      <Gesto x={lerp(770, 660, junta)} y={720} s={1.1} animo={0.8} />
                      <g opacity={ac(t, M('abrazo') + 1.4, M('abrazo') + 1.8)}>
                        <Burbuja x={700} y={460} w={340} texto="¡Me alegra verte!" u={ac(t, M('abrazo') + 1.5, M('abrazo') + 2.6)} c={c} lado="der" id={ID} />
                      </g>
                      <Etiqueta x={600} y={820} texto="primero el impulso" op={e1(t, M('abrazo') + 0.8)} c={c} id={ID} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · improvisar, ensayar gestos y el público escéptico */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {/* Improvisar: un camino que tambalea */}
                {(() => {
                  const op = e1(t, M('improvisar'));
                  if (op < 0.01) return null;
                  const u = ((t - M('improvisar')) * 0.25) % 1;
                  const camino = Array.from({ length: 20 }, (_, k) => `${130 + k * 20},${420 + Math.sin(k * 1.3) * 30}`).join(' ');
                  return (
                    <g opacity={op}>
                      <rect x={100} y={190} width={440} height={360} rx={26} fill={c.panel} style={sombra(c.sombra)} />
                      <polyline points={camino} stroke={c.apagado} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray="14 10" />
                      <g transform={`translate(${130 + u * 380} ${420 + Math.sin(u * 19 * 1.3) * 30}) rotate(${Math.sin(t * 6) * 10})`}><Persona id={ID} x={0} y={0} s={0.45} /></g>
                      <Txt x={460} y={300} textAnchor="middle" fontSize={64} fill={c.tenue} peso={800}>?</Txt>
                      <Txt f="a" x={320} y={520} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>improvisar</Txt>
                      <g transform="translate(500 230) scale(0.9)" opacity={e1(t, M('improvisar') + 1)}><Cruz x={0} y={0} /></g>
                    </g>
                  );
                })()}
                {/* Ensayar gestos: el gesto llega después de la palabra */}
                {(() => {
                  const op = e1(t, M('ensayar'));
                  if (op < 0.01) return null;
                  const tarde = ac(t, M('despues'), M('despues') + 0.8);
                  return (
                    <g opacity={op}>
                      <rect x={640} y={190} width={460} height={360} rx={26} fill={c.panel} style={sombra(c.sombra)} />
                      <Txt f="a" x={670} y={250} fontSize={MIN_TXT} fill={c.texto}>palabra</Txt>
                      <path d="M 670 330 L 780 330 L 810 280 L 840 330 L 1070 330" stroke={c.tenue} strokeWidth={7} fill="none" strokeLinejoin="round" />
                      <Txt f="a" x={670} y={400} fontSize={MIN_TXT} fill={NARANJA}>gesto</Txt>
                      <path d={`M 670 480 L ${lerp(780, 920, tarde)} 480 L ${lerp(810, 950, tarde)} 430 L ${lerp(840, 980, tarde)} 480 L 1070 480`} stroke={NARANJA} strokeWidth={7} fill="none" strokeLinejoin="round" />
                      <Txt f="a" x={870} y={530} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>ensayado</Txt>
                      <g transform="translate(1060 230) scale(0.9)" opacity={e1(t, M('despues') + 0.8)}><Cruz x={0} y={0} /></g>
                    </g>
                  );
                })()}
                {/* Algo no cuadra: dos piezas que no encajan */}
                {(() => {
                  const op = ventana(t, M('cuadra'), M('escepticos'));
                  if (op < 0.01) return null;
                  const d = 14 + 8 * Math.sin(t * 3);
                  return (
                    <g opacity={op} transform="translate(600 690)">
                      <path d={`M ${-150 - d} -50 H ${-30 - d} V -20 Q ${-5 - d} -20 ${-5 - d} 0 Q ${-5 - d} 20 ${-30 - d} 20 V 50 H ${-150 - d} Z`} fill={`url(#${ID}-marca)`} />
                      <path d={`M ${30 + d} -50 H ${150 + d} V 50 H ${30 + d} V 26 Q ${10 + d} 26 ${10 + d} 0 Q ${10 + d} -26 ${30 + d} -26 Z`} fill={c.tenue} />
                    </g>
                  );
                })()}
                {/* Clientes escépticos */}
                {(() => {
                  const op = e1(t, M('escepticos'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      {[0, 1, 2, 3, 4].map((k) => (
                        <g key={k}>
                          <Persona id={ID} x={280 + k * 160} y={820} s={0.62} cuerpo={k % 2 ? '#64748b' : '#94a3b8'} pelo={['#2b1a12', '#5b3a29', '#1f2937', '#7c2d12', '#374151'][k]} />
                          <Gesto x={280 + k * 160} y={820} s={0.62} animo={-0.45} />
                        </g>
                      ))}
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
