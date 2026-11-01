import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, Hoja, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { SeisPasos } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Desarma, pide una cosa y experimenta» (Heen y Stone, pasos 4 a 6), escena propia. Acto A: Johann le dice
 * a Kara «sé más asertiva»; la frase se desarma en tres preguntas (qué significa, de dónde viene, hacia
 * dónde va) y Kara decide no cambiar: sus referentes son callados y curiosos, no el vendedor agresivo.
 * Acto B: la pregunta enorme «¿algún comentario?» se tacha y queda una sola: «¿qué me frena?»; la pila de
 * dieciocho hojas de Roberto se reemplaza por una cosa por trimestre que muestra temas que se repiten.
 * Acto C: experimentar: una balanza con riesgo pequeño y beneficio grande; el correo que James envía una
 * semana antes; nadie puede impedirte aprender.
 */

const ID = 'ce2s';
const nombres = ['desarmar', 'kara', 'johann', 'asertiva', 'significa', 'sonreir', 'deDonde', 'haciaDonde', 'noQuiere', 'calladas', 'agresivo', 'unaCosa', 'comentario', 'frena', 'roberto', 'dieciocho', 'trimestre', 'repiten', 'critica', 'experimentar', 'riesgo', 'jamesSiguio', 'semana', 'nadie', 'pregunta'] as const;

export const DesarmarCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('nadie') + 0.8 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '4 · Desarmar'], [M('kara'), 'Kara y Johann'], [M('significa'), '¿Qué significa?'], [M('deDonde'), '¿De dónde viene?'],
    [M('haciaDonde'), '¿Hacia dónde va?'], [M('noQuiere'), 'Decide no cambiar'], [M('unaCosa'), '5 · Pide una sola cosa'], [M('roberto'), 'Roberto'],
    [M('repiten'), 'Temas que se repiten'], [M('experimentar'), '6 · Experimenta'], [M('jamesSiguio'), 'James lo probó'],
  ];

  const activo = t > M('experimentar') ? 5 : t > M('unaCosa') ? 4 : 3;
  const aA = ventana(t, -1, M('unaCosa'));
  const aB = ventana(t, M('unaCosa'), M('experimentar'));
  const aC = ac(t, M('experimentar'), M('experimentar') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Desarmar la crítica, pedir una sola cosa y experimentar con el consejo">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <SeisPasos t={t} t0={0} activo={activo} c={c} id={ID} />

            {/* A · «sé más asertiva» desarmada */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const piezas = ac(t, M('significa') - 0.5, M('significa') + 0.5);
                  const modelos = e1(t, M('calladas'));
                  return (
                    <g>
                      <g opacity={e1(t, M('kara'))}>
                        <Persona id={ID} x={200} y={760} cuerpo="#be185d" pelo="#7c3f1d" />
                        <Gesto x={200} y={760} animo={0.3} />
                        <Etiqueta x={200} y={820} texto="Kara, vendedora" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('johann')) * (1 - ac(t, M('noQuiere'), M('noQuiere') + 0.6))}>
                        <Persona id={ID} x={1000} y={760} cuerpo="#1f2937" pelo="#9ca3af" />
                        <Gesto x={1000} y={760} animo={0.3} />
                        <Etiqueta x={1000} y={820} texto="Johann" op={1} c={c} id={ID} />
                      </g>
                      {/* la frase entera y luego desarmada */}
                      <g opacity={ventana(t, M('asertiva') - 0.3, M('significa'))}>
                        <Burbuja x={980} y={560} w={420} texto="Sé más asertiva." u={ac(t, M('asertiva') - 0.3, M('asertiva') + 0.6)} c={c} lado="der" id={ID} marca />
                      </g>
                      <g opacity={ventana(t, M('significa') - 0.3, M('noQuiere'))}>
                        {([['¿qué significa?', M('significa')], ['¿de dónde viene?', M('deDonde')], ['¿hacia dónde va?', M('haciaDonde')]] as const).map(([txt, t0], k) => (
                          <g key={txt} transform={`translate(${(k - 1) * 30 * (1 - piezas)} 0)`}>
                            <Chip x={600} y={300 + k * 95} texto={txt} c={c} id={ID} op={e1(t, t0)} marca={t > t0 && (k === 2 ? true : t < [M('deDonde'), M('haciaDonde')][k])} />
                          </g>
                        ))}
                        <g opacity={ventana(t, M('significa') + 1, M('deDonde'))}>
                          <Txt f="a" x={600} y={620} textAnchor="middle" fontSize={26} fill={c.tenue}>¿hablar más? ¿sonreír?</Txt>
                        </g>
                      </g>
                      {/* sus referentes frente al vendedor agresivo */}
                      <g opacity={e1(t, M('noQuiere'))}>
                        <Chip x={600} y={250} texto="no quiere cambiar" c={c} id={ID} op={1} />
                        <g opacity={modelos}>
                          {[440, 560, 680].map((x, k) => (
                            <g key={x}>
                              <Persona id={ID} x={x} y={600} s={0.6} cuerpo={['#0f766e', '#7c3aed', '#a16207'][k]} />
                              <Gesto x={x} y={600} s={0.6} animo={0.5} />
                            </g>
                          ))}
                          <Etiqueta x={560} y={660} texto="calladas y curiosas" op={1} c={c} id={ID} marca />
                        </g>
                        <g opacity={e1(t, M('agresivo'))}>
                          <Persona id={ID} x={960} y={600} s={0.7} cuerpo="#dc2626" corbata />
                          <Gesto x={960} y={600} s={0.7} animo={-0.7} />
                          <Cruz x={1010} y={450} s={0.8} />
                          <Etiqueta x={960} y={660} texto="agresivo" op={1} c={c} id={ID} />
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · una sola cosa; Roberto */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const rob = ac(t, M('roberto') - 0.2, M('roberto') + 0.5);
                  const temas = ac(t, M('repiten'), M('repiten') + 1.5);
                  return (
                    <g>
                      <Persona id={ID} x={200} y={760} cuerpo={rob > 0.5 ? '#1e3a8a' : '#be185d'} pelo={rob > 0.5 ? '#2b1a12' : '#7c3f1d'} corbata={rob > 0.5} />
                      <Gesto x={200} y={760} animo={0.5} />
                      <Etiqueta x={200} y={820} texto={rob > 0.5 ? 'Roberto' : 'tú'} op={1} c={c} id={ID} />
                      <g opacity={1 - rob}>
                        <g opacity={e1(t, M('comentario'))}>
                          <Burbuja x={240} y={540} w={380} texto="¿Tienes algún comentario?" u={1} c={c} id={ID} />
                          <Cruz x={640} y={380} s={0.9} />
                        </g>
                        <g opacity={e1(t, M('frena'))}>
                          <Burbuja x={980} y={560} w={420} texto="¿Qué hago que me frena?" u={ac(t, M('frena'), M('frena') + 1)} c={c} lado="der" id={ID} marca />
                        </g>
                      </g>
                      <g opacity={rob}>
                        <g opacity={ventana(t, M('dieciocho'), M('trimestre'))} transform={`rotate(${4 * Math.sin(t * 3)} 560 480)`}>
                          {Array.from({ length: 6 }, (_, k) => <rect key={k} x={440 + k * 10} y={340 - k * 10} width={220} height={280} rx={8} fill={c.blanco} stroke={c.apagado} strokeWidth={2} transform={`rotate(${(k - 3) * 4} 550 480)`} />)}
                          <Etiqueta x={560} y={680} texto="18 hojas" op={1} c={c} id={ID} />
                        </g>
                        <g opacity={e1(t, M('trimestre'))}>
                          {Array.from({ length: 4 }, (_, q) => (
                            <g key={q}>
                              <rect x={420 + q * 160} y={300} width={130} height={60} rx={12} fill={c.panel2} />
                              <Txt f="a" x={485 + q * 160} y={340} textAnchor="middle" fontSize={26} fill={c.texto}>{`T${q + 1}`}</Txt>
                              {[0, 1].map((j) => <circle key={j} cx={455 + q * 160 + j * 60} cy={420 + temas * (j ? 0 : 80) + (1 - temas) * (j * 40 + q * 15)} r={16} fill={j ? NARANJA : ROSA} />)}
                            </g>
                          ))}
                          <Etiqueta x={740} y={560} texto="una cosa por trimestre" op={1} c={c} id={ID} />
                          <Chip x={740} y={640} texto="temas que se repiten" c={c} id={ID} op={temas} marca />
                        </g>
                        <Chip x={740} y={740} texto="pedir crítica, no elogios" c={c} id={ID} op={e1(t, M('critica'))} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · experimentar */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <g opacity={ventana(t, M('experimentar'), M('jamesSiguio'))}>
                  <g transform="translate(600 440) rotate(-12)">
                    <rect x={-260} y={-8} width={520} height={16} rx={8} fill={c.tenue} />
                    <circle cx={-220} cy={-30} r={22} fill={c.apagado} />
                    <circle cx={220} cy={-60} r={52} fill={`url(#${ID}-marca)`} />
                  </g>
                  <path d="M 600 440 L 570 560 H 630 Z" fill={c.tenue} />
                  <Etiqueta x={360} y={420} texto="riesgo pequeño" op={e1(t, M('riesgo'))} c={c} id={ID} />
                  <Etiqueta x={1000} y={450} texto="beneficio grande" op={e1(t, M('riesgo') + 0.6)} c={c} id={ID} marca />
                </g>
                <g opacity={e1(t, M('jamesSiguio'))}>
                  <Persona id={ID} x={220} y={760} cuerpo="#1e3a8a" corbata />
                  <Gesto x={220} y={760} animo={0.6} />
                  <Etiqueta x={220} y={820} texto="James" op={1} c={c} id={ID} />
                  <g transform={`translate(${520 + 200 * ac(t, M('semana'), M('semana') + 1.5)} 460)`}>
                    <rect x={-80} y={-50} width={160} height={100} rx={10} fill={c.blanco} style={sombra(c.sombra)} />
                    <path d="M -80 -50 L 0 10 L 80 -50" fill="none" stroke={c.apagado} strokeWidth={4} />
                  </g>
                  <g opacity={e1(t, M('semana'))}>
                    <rect x={880} y={560} width={150} height={130} rx={14} fill={c.blanco} style={sombra(c.sombra)} />
                    <rect x={880} y={560} width={150} height={36} rx={14} fill={ROSA} />
                    <Txt x={955} y={660} textAnchor="middle" fontSize={44} fill={c.texto}>−7</Txt>
                    <Etiqueta x={955} y={740} texto="días antes" op={1} c={c} id={ID} />
                  </g>
                  <Chip x={600} y={290} texto="¿qué dudas urgentes tienen?" c={c} id={ID} op={e1(t, M('semana') + 1)} />
                </g>
                <g opacity={e1(t, M('nadie'))}><Chip x={520} y={680} texto="nadie puede impedírtelo" c={c} id={ID} op={1} marca /></g>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
