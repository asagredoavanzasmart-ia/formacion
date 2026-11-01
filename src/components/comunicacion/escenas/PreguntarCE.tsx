import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Preguntar rinde más», escena propia. Acto A: el vendedor que habla bien frente al que pregunta; cada
 * pregunta que llega al cliente llena dos medidores, aprender y caer bien; el cliente se queja de que
 * no le preguntaron. Acto B: el experimento: dos chats, uno con nueve preguntas y otro con cuatro; las
 * barras de simpatía y de aprendizaje; veinte citas rápidas donde una pregunta más suma una persona.
 * Acto C: la cabeza que recuerda cuántas preguntas hubo pero no conecta eso con agradar; y la balanza:
 * sentirse escuchado pesa más que el mejor argumento.
 */

const ID = 'ce1q';
const nombres = ['hablar', 'brooks', 'rinde', 'suficiente', 'ojala', 'aprender', 'miles', 'nueve', 'cuatro', 'mejor', 'adivinaban', 'veinte', 'recuerda', 'intuye', 'escuchado', 'argumento', 'pregunta'] as const;

/* Signo de pregunta en una burbuja redonda. */
const Pregunta: React.FC<{ x: number; y: number; s?: number; op?: number; marca?: boolean; id: string; c: Tono }> = ({ x, y, s = 1, op = 1, marca = true, id, c }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <circle r={26} fill={marca ? `url(#${id}-marca)` : c.panel2} />
    <Txt x={0} y={12} textAnchor="middle" fontSize={34} fill={marca ? '#fff' : c.tenue} peso={800}>?</Txt>
  </g>
);

export const PreguntarCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('argumento') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '¿Hablar bien?'], [M('rinde'), 'Preguntar rinde más'], [M('suficiente'), 'No preguntamos lo suficiente'],
    [M('aprender'), 'Aprender y caer bien'], [M('miles'), 'Miles de conversaciones'], [M('mejor'), 'Más preguntas, más simpatía'],
    [M('veinte'), '+1 pregunta = +1 cita'], [M('recuerda'), 'Lo recordamos, no lo intuimos'], [M('escuchado'), 'Sentirse escuchado'],
    [M('argumento'), 'Vale más que el mejor argumento'],
  ];

  const aA = ventana(t, -1, M('miles'));
  const aB = ventana(t, M('miles'), M('recuerda'));
  const aC = ac(t, M('recuerda'), M('recuerda') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Quien pregunta más aprende más y cae mejor: con nueve preguntas en quince minutos, más simpatía y una cita más de cada veinte">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · hablar frente a preguntar */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const preg = ac(t, M('rinde'), M('rinde') + 0.6);
                  const aprende = ac(t, M('aprender'), M('aprender') + 2.4);
                  return (
                    <g>
                      <Persona id={ID} x={260} y={790} s={1.05} />
                      <Gesto x={260} y={790} s={1.05} animo={0.4} />
                      <Persona id={ID} x={940} y={790} s={1.05} cuerpo="#64748b" corbata />
                      <Gesto x={940} y={790} s={1.05} animo={-0.3 + 0.9 * aprende} />
                      {/* hablar bien: líneas de texto que no llegan */}
                      {preg < 0.99 && [0, 1, 2, 3].map((k) => {
                        const u = ((t * 0.5) + k / 4) % 1;
                        return <rect key={k} x={lerp(330, 680, u)} y={560 + (k % 2) * 30} width={90} height={14} rx={7} fill={c.apagado} opacity={Math.sin(Math.PI * u) * (1 - preg)} />;
                      })}
                      {/* preguntas que viajan y sí llegan */}
                      {preg > 0.01 && [0, 1, 2].map((k) => {
                        const u = ((t - M('rinde')) * 0.45 + k / 3) % 1;
                        return <Pregunta key={k} x={lerp(330, 870, u)} y={610 - Math.sin(Math.PI * u) * 60} s={1.1} op={preg * Math.sin(Math.PI * u)} id={ID} c={c} />;
                      })}
                      <g opacity={ventana(t, M('ojala'), M('aprender'))}>
                        <Burbuja x={920} y={580} w={460} texto="Ojalá me hubiera preguntado más" u={ac(t, M('ojala'), M('ojala') + 1.6)} c={c} lado="der" id={ID} />
                      </g>
                      {/* dos medidores: aprender y caer bien */}
                      <g opacity={e1(t, M('aprender'))}>
                        {([['aprender', 440, NARANJA], ['caer bien', 760, ROSA]] as const).map(([txt, x, col], k) => {
                          const v = 0.15 + 0.75 * ac(t, M('aprender') + 0.3 + k * 0.3, M('aprender') + 3 + k * 0.3);
                          return (
                            <g key={txt}>
                              <rect x={x - 34} y={190} width={68} height={240} rx={34} fill={c.apagado} />
                              <rect x={x - 34} y={190 + 240 * (1 - v)} width={68} height={240 * v} rx={34} fill={col} />
                              {k === 0
                                ? <path transform={`translate(${x} 160)`} d="M -14 -6 Q -14 -24 0 -24 Q 14 -24 14 -6 Q 14 2 8 8 V 14 H -8 V 8 Q -14 2 -14 -6 Z" fill={NARANJA} />
                                : <path transform={`translate(${x} 160)`} d="M 0 14 C -22 0 -22 -18 -8 -18 C 0 -18 0 -12 0 -10 C 0 -12 0 -18 8 -18 C 22 -18 22 0 0 14 Z" fill={ROSA} />}
                              <Txt f="a" x={x} y={480} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                            </g>
                          );
                        })}
                      </g>
                      <g opacity={e1(t, M('brooks'))}><Chip x={300} y={190} texto="Brooks y John" c={c} id={ID} op={1 - ac(t, M('aprender'), M('aprender') + 0.4)} /></g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B · el experimento */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const op = ventana(t, M('miles'), M('veinte'));
                  if (op < 0.01) return null;
                  const ventanaChat = (x: number, n: number, t0: number, titulo: string) => (
                    <g opacity={e1(t, t0)}>
                      <rect x={x} y={160} width={440} height={330} rx={26} fill={c.panel} style={sombra(c.sombra)} />
                      <rect x={x} y={160} width={440} height={56} rx={24} fill={c.panel2} />
                      <Txt f="a" x={x + 220} y={198} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{titulo}</Txt>
                      {Array.from({ length: n }, (_, k) => <Pregunta key={k} x={x + 60 + (k % 5) * 80} y={270 + Math.floor(k / 5) * 80} s={0.95} op={e1(t, t0 + 0.4 + k * 0.18)} id={ID} c={c} />)}
                      <Txt f="a" x={x + 220} y={470} textAnchor="middle" fontSize={MIN_TXT * 0.85} fill={c.tenue}>en 15 minutos</Txt>
                    </g>
                  );
                  const barras = (x: number, v1: number, v2: number, k: number) => (
                    <g>
                      {[v1, v2].map((v, j) => {
                        const t0 = j === 0 ? M('mejor') : M('adivinaban');
                        const h = 150 * v * ac(t, t0 + 0.2 + k * 0.2, t0 + 1 + k * 0.2);
                        return <rect key={j} x={x + 120 + j * 110} y={700 - h} width={80} height={h} rx={14} fill={j === 0 ? ROSA : NARANJA} opacity={k === 0 ? 1 : 0.45} />;
                      })}
                    </g>
                  );
                  return (
                    <g opacity={op}>
                      <g opacity={e1(t, M('miles'))}>
                        <Txt x={600} y={330} textAnchor="middle" fontSize={64} fill={NARANJA} peso={800} opacity={1 - ac(t, M('nueve'), M('nueve') + 0.4)}>miles</Txt>
                      </g>
                      {ventanaChat(110, 9, M('nueve'), 'al menos 9')}
                      {ventanaChat(650, 4, M('cuatro'), 'no más de 4')}
                      <g opacity={e1(t, M('mejor'))}>
                        {barras(110, 0.9, 0.85, 0)}
                        {barras(650, 0.5, 0.45, 1)}
                        <line x1={110} y1={700} x2={1090} y2={700} stroke={c.apagado} strokeWidth={4} />
                        <Txt f="a" x={600} y={770} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>simpatía · aprendizaje</Txt>
                      </g>
                    </g>
                  );
                })()}
                {/* Veinte citas rápidas: una pregunta más, una persona más */}
                {(() => {
                  const op = e1(t, M('veinte'));
                  if (op < 0.01) return null;
                  const mas = ac(t, M('veinte') + 1, M('veinte') + 1.6);
                  return (
                    <g opacity={op}>
                      {Array.from({ length: 20 }, (_, k) => {
                        const x = 180 + (k % 10) * 94, y = 400 + Math.floor(k / 10) * 190;
                        const on = k < 6 || (k === 6 && mas > 0.5);
                        return (
                          <g key={k} transform={k === 6 ? `translate(${x} ${y}) scale(${1 + 0.15 * Math.sin(Math.PI * mas)}) translate(${-x} ${-y})` : undefined}>
                            <Persona id={ID} x={x} y={y} s={0.48} cuerpo={on ? (k === 6 ? undefined : '#f59e0b') : c.apagado} pelo={on ? '#2b1a12' : c.tenue} />
                          </g>
                        );
                      })}
                      <g opacity={mas}><Chip x={600} y={690} texto="+1 de 20" c={c} id={ID} op={1} marca /></g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · recordamos, no intuimos; sentirse escuchado pesa más */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const op = ventana(t, M('recuerda'), M('escuchado'));
                  if (op < 0.01) return null;
                  const roto = e1(t, M('intuye'));
                  return (
                    <g opacity={op}>
                      <g transform="translate(330 430)">
                        <circle r={140} fill={c.panel} style={sombra(c.sombra)} />
                        <Txt x={0} y={30} textAnchor="middle" fontSize={110} fill={NARANJA} peso={800}>9</Txt>
                        <Txt f="a" x={0} y={95} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>preguntas</Txt>
                        <g transform="translate(90 -110)"><Visto x={0} y={0} s={1} /></g>
                      </g>
                      <path d="M 480 430 L 720 430" stroke={c.apagado} strokeWidth={8} strokeDasharray="18 14" />
                      <g transform="translate(600 430)" opacity={roto}><Cruz x={0} y={0} s={1.2} /></g>
                      <g transform="translate(870 430)">
                        <circle r={140} fill={c.panel} style={sombra(c.sombra)} />
                        <path transform="scale(2.6)" d="M 0 14 C -22 0 -22 -18 -8 -18 C 0 -18 0 -12 0 -10 C 0 -12 0 -18 8 -18 C 22 -18 22 0 0 14 Z" fill={ROSA} opacity={0.4 + 0.6 * (1 - roto)} />
                        <Txt f="a" x={0} y={95} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>agrado</Txt>
                      </g>
                      <Etiqueta x={600} y={680} texto="no lo intuimos" op={roto} c={c} id={ID} />
                    </g>
                  );
                })()}
                {(() => {
                  const op = e1(t, M('escuchado'));
                  if (op < 0.01) return null;
                  const pesa = ac(t, M('argumento'), M('argumento') + 1.2);
                  const ang = -14 * pesa + 2 * Math.sin(t * 2) * pesa;
                  return (
                    <g opacity={op}>
                      <path d="M 600 330 L 600 700 M 500 700 H 700" stroke={c.tenue} strokeWidth={14} strokeLinecap="round" />
                      <g transform={`rotate(${ang} 600 330)`}>
                        <rect x={300} y={322} width={600} height={16} rx={8} fill={c.tenue} />
                        <g transform="translate(330 330)">
                          <path d={`M 0 0 L -60 140 M 0 0 L 60 140`} stroke={c.apagado} strokeWidth={4} transform={`rotate(${-ang})`} />
                          <g transform={`rotate(${-ang}) translate(0 140)`}>
                            <path d="M -90 0 Q 0 50 90 0 Z" fill={c.apagado} />
                            <path transform="translate(0 -46) scale(1.3)" d="M -18 -40 Q 30 -60 34 -6 Q 36 26 6 40 Q -6 46 -4 30 Q 2 18 12 10 Q 22 -8 4 -16 Q -10 -20 -14 -6" fill="none" stroke={`url(#${ID}-marca)`} strokeWidth={10} strokeLinecap="round" />
                          </g>
                        </g>
                        <g transform="translate(870 330)">
                          <path d={`M 0 0 L -60 140 M 0 0 L 60 140`} stroke={c.apagado} strokeWidth={4} transform={`rotate(${-ang})`} />
                          <g transform={`rotate(${-ang}) translate(0 140)`} opacity={e1(t, M('argumento'))}>
                            <path d="M -90 0 Q 0 50 90 0 Z" fill={c.apagado} />
                            <path transform="translate(0 -40) scale(0.7)" d="M -50 -14 L -26 -42 L 26 -42 L 50 -14 L 0 50 Z" fill={c.tenue} />
                          </g>
                        </g>
                      </g>
                      <Etiqueta x={330} y={780} texto="sentirse escuchado" op={1} c={c} id={ID} marca />
                      <Etiqueta x={870} y={780} texto="mejor argumento" op={e1(t, M('argumento'))} c={c} id={ID} />
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
