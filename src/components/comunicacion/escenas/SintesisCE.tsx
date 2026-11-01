import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Vender es una conversación» (síntesis de la parte 1), escena propia. Acto A: la intención del
 * vendedor brilla detrás de un muro; el cliente solo ve lo que hace, y lo juzga en segundos con sus
 * lentes, su estilo, su cultura y lo que sintió. Acto B: quien persuade no empuja (la flecha de empujar
 * se tacha): prepara, y una lista se marca: credibilidad, preguntas, quien decide, beneficios, historias
 * y la conversación tensa. Acto C: no es manipulación (la máscara tachada): funciona porque es verdadero.
 * Acto D: la cámara se abre del cliente al equipo, al líder y a la organización que habla con franqueza.
 */

const ID = 'ce34';
const nombres = ['idea', 'intencion', 'haces', 'segundos', 'lentes', 'estilo', 'silencio', 'cultura', 'sintio', 'noEmpuja', 'prepara', 'credibilidad', 'preguntas', 'decide', 'beneficios', 'historias', 'tensa', 'manipulacion', 'verdadero', 'hastaAqui', 'solo', 'equipo', 'lider', 'franqueza', 'pregunta'] as const;

export const SintesisCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('franqueza') + 1 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Todo converge'], [M('intencion'), 'No ve tu intención'], [M('segundos'), 'Te juzga en segundos'], [M('sintio'), 'Recuerda lo que sintió'],
    [M('noEmpuja'), 'No empuja: prepara'], [M('manipulacion'), 'No es manipulación'], [M('verdadero'), 'Funciona si es verdad'], [M('hastaAqui'), 'Hasta aquí, el cliente'],
    [M('equipo'), 'Un equipo y un líder'], [M('franqueza'), 'Hablar con franqueza'],
  ];

  const aA = ventana(t, -1, M('noEmpuja'));
  const aB = ventana(t, M('noEmpuja'), M('manipulacion'));
  const aC = ventana(t, M('manipulacion'), M('hastaAqui'));
  const aD = ac(t, M('hastaAqui'), M('hastaAqui') + 0.4);

  const juicios: [string, number][] = [['en segundos', M('segundos')], ['sus lentes', M('lentes')], ['su estilo', M('estilo')], ['tu silencio', M('silencio')], ['su cultura', M('cultura')], ['lo que sintió', M('sintio')]];
  const lista: [string, number][] = [['credibilidad', M('credibilidad')], ['preguntas', M('preguntas')], ['quien decide', M('decide')], ['beneficios', M('beneficios')], ['historias', M('historias')], ['conversación tensa', M('tensa')]];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Síntesis: el otro solo ve lo que haces; quien persuade prepara; una venta la sostiene una organización">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · la intención tras el muro; el cliente ve lo que haces */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const ve = ac(t, M('haces'), M('haces') + 1);
                  return (
                    <g>
                      <Persona id={ID} x={170} y={760} cuerpo="#334155" corbata />
                      <Gesto x={170} y={760} animo={0.5} />
                      <Etiqueta x={170} y={820} texto="tú" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('intencion'))}>
                        <circle cx={170} cy={560} r={46 + 6 * Math.sin(t * 3)} fill="#fde68a" opacity={0.6} />
                        <path d="M 170 590 C 130 565 130 530 152 528 C 162 527 168 535 170 541 C 172 535 178 527 188 528 C 210 530 210 565 170 590 Z" fill={ROSA} />
                        <rect x={410} y={380} width={70} height={390} rx={10} fill={c.apagado} />
                        <Etiqueta x={170} y={460} texto="tu intención" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('intencion') + 0.4)}>
                        <Persona id={ID} x={1090} y={760} cuerpo="#0f766e" />
                        <Gesto x={1090} y={760} animo={0.3} />
                        <Etiqueta x={1090} y={820} texto="cliente" op={1} c={c} id={ID} />
                      </g>
                      {/* lo que haces sí pasa el muro */}
                      <g opacity={ve}>
                        {[0, 1, 2].map((k) => {
                          const u = ((t - M('haces')) * 0.5 + k / 3) % 1;
                          return <circle key={k} cx={240 + 780 * u} cy={240 - 50 * Math.sin(Math.PI * u)} r={14} fill={NARANJA} opacity={Math.sin(Math.PI * u)} />;
                        })}
                        <Etiqueta x={640} y={300} texto="lo que haces" op={ventana(t, M('haces'), M('segundos'))} c={c} id={ID} marca />
                      </g>
                      {juicios.map(([txt, t0], k) => <Chip key={txt} x={780} y={300 + k * 82} texto={txt} c={c} id={ID} op={e1(t, t0)} marca={k === 5} />)}
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · no empuja: prepara */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Persona id={ID} x={220} y={760} cuerpo="#334155" corbata />
                <Gesto x={220} y={760} animo={0.6} />
                <g opacity={ventana(t, M('noEmpuja'), M('credibilidad'))}>
                  <path d="M 280 600 H 440" stroke={ROSA} strokeWidth={14} strokeLinecap="round" />
                  <path d="M 420 574 L 456 600 L 420 626" stroke={ROSA} strokeWidth={14} fill="none" strokeLinecap="round" />
                  <Txt f="a" x={360} y={560} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>empujar</Txt>
                  <g opacity={e1(t, M('noEmpuja') + 0.5)}><Cruz x={360} y={510} s={0.9} /></g>
                </g>
                <Etiqueta x={220} y={820} texto="prepara" op={e1(t, M('prepara'))} c={c} id={ID} marca />
                <rect x={500} y={225} width={600} height={560} rx={24} fill={c.panel} style={sombra(c.sombra)} opacity={e1(t, M('prepara'))} />
                {lista.map(([txt, t0], k) => (
                  <g key={txt} opacity={(0.35 + 0.65 * ac(t, t0, t0 + 0.4)) * e1(t, M('prepara'))}>
                    <rect x={540} y={262 + k * 86} width={44} height={44} rx={10} fill={c.panel2} />
                    {t > t0 && <g transform={`translate(562 ${284 + k * 86}) scale(${e1(t, t0)})`}><Visto x={0} y={0} s={0.7} /></g>}
                    <Txt f="a" x={606} y={294 + k * 86} fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                  </g>
                ))}
              </g>
            )}

            {/* C · no es manipulación: funciona porque es verdadero */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <g transform="translate(380 460)">
                  <path d="M -110 -60 Q 0 -110 110 -60 Q 120 40 0 100 Q -120 40 -110 -60 Z" fill={c.tenue} />
                  <ellipse cx={-44} cy={-20} rx={26} ry={14} fill={c.panel} /><ellipse cx={44} cy={-20} rx={26} ry={14} fill={c.panel} />
                  <path d="M -40 50 Q 0 70 40 50" stroke={c.panel} strokeWidth={6} fill="none" />
                </g>
                <g opacity={e1(t, M('manipulacion') + 0.5)}><Cruz x={480} y={360} s={1.2} /></g>
                <Etiqueta x={380} y={640} texto="manipulación" op={1} c={c} id={ID} />
                <g opacity={e1(t, M('verdadero'))}>
                  <path d="M 820 560 C 700 480 700 360 770 352 C 800 349 815 372 820 390 C 825 372 840 349 870 352 C 940 360 940 480 820 560 Z" fill={ROSA} transform={`translate(820 456) scale(${1 + 0.04 * Math.max(0, Math.sin(t * 6))}) translate(-820 -456)`} />
                  <Visto x={920} y={360} s={1.1} />
                  <Etiqueta x={820} y={640} texto="porque es verdad" op={1} c={c} id={ID} marca />
                </g>
              </g>
            )}

            {/* D · del cliente a la organización */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const abre = ac(t, M('equipo'), M('equipo') + 1.5);
                  return (
                    <g>
                      <g opacity={ventana(t, M('hastaAqui'), M('equipo'))}>
                        <Persona id={ID} x={600} y={760} cuerpo="#334155" corbata />
                        <Gesto x={600} y={760} animo={0.3} />
                        <Chip x={600} y={430} texto="un vendedor solo" c={c} id={ID} op={e1(t, M('solo'))} />
                        <g opacity={e1(t, M('solo') + 0.8)}><Cruz x={880} y={430} s={0.9} /></g>
                      </g>
                      <g opacity={abre}>
                        {/* la organización */}
                        <rect x={380} y={230} width={380} height={300} rx={16} fill={`url(#${ID}-marca)`} opacity={e1(t, M('franqueza') - 1)} />
                        {Array.from({ length: 12 }, (_, k) => <rect key={k} x={405 + (k % 4) * 90} y={260 + Math.floor(k / 4) * 85} width={60} height={50} rx={6} fill={c.blanco} opacity={0.85 * e1(t, M('franqueza') - 1)} />)}
                        {[[380, 'equipo', M('equipo')], [600, 'tú', M('equipo')], [820, 'equipo', M('equipo')]].map(([x, txt, t0], k) => (
                          <g key={k}>
                            <Persona id={ID} x={x as number} y={760} s={0.9} cuerpo={['#475569', '#334155', '#64748b'][k]} corbata={k === 1} />
                            <Gesto x={x as number} y={760} s={0.9} animo={0.6} />
                          </g>
                        ))}
                        <g opacity={e1(t, M('lider'))}>
                          <Persona id={ID} x={1050} y={760} cuerpo="#1f2937" corbata />
                          <Gesto x={1050} y={760} animo={0.6} />
                          <Etiqueta x={1050} y={820} texto="líder" op={1} c={c} id={ID} marca />
                        </g>
                        <Etiqueta x={600} y={830} texto="un equipo" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('franqueza'))}>
                        <Burbuja x={1030} y={570} w={280} texto="Hablemos claro." lado="der" u={ac(t, M('franqueza'), M('franqueza') + 0.8)} c={c} id={ID} marca />
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
