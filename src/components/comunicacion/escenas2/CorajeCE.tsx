import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Estrella, Etiqueta, Gesto, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Valientes, pero competentes» (James Detert), escena propia. Acto A: el héroe solitario en una isla y la
 * caja del despido se tachan; en su lugar, personas respetadas de todos los niveles, con una estrella en
 * el pecho, que ganan prestigio. Acto B: Martha: los comentarios de doble sentido como burbujas dentadas,
 * la alerta de la reunión, la puerta de la oficina del presidente y lo que le dijo; la caja del despido
 * que temía se desvanece, él se disculpa, la felicita y un año después ella sube a vicepresidenta. Acto C:
 * cuatro conductas que se aprenden y la señal de que el riesgo es real.
 */

const ID = 'ce2n';
const nombres = ['aislado', 'detert', 'martires', 'respetadas', 'correcto', 'prestigio', 'martha', 'doble', 'reunion', 'renunciar', 'incomodaba', 'igual', 'fallando', 'temia', 'disculpo', 'felicito', 'formalmente', 'anio', 'vicepresidenta', 'competentes', 'terreno', 'batallas', 'persuadir', 'seguimiento', 'riesgo', 'pregunta'] as const;

export const CorajeCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('riesgo') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Las historias de coraje'], [M('detert'), 'James Detert'], [M('martires'), 'No son mártires'], [M('prestigio'), 'Ganan prestigio'],
    [M('martha'), 'Martha'], [M('reunion'), 'Cruzó el límite'], [M('renunciar'), 'Fue a su oficina'], [M('temia'), 'Temía el despido'],
    [M('disculpo'), 'Él se disculpó'], [M('anio'), 'Un año después'], [M('competentes'), 'Competentemente valientes'], [M('riesgo'), 'El riesgo es real'],
  ];

  const aA = ventana(t, -1, M('martha'));
  const aB = ventana(t, M('martha'), M('competentes'));
  const aC = ac(t, M('competentes'), M('competentes') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La mayoría de los actos de valor en el trabajo los hacen personas respetadas que actúan con competencia">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · del mártir solitario a las personas respetadas */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <g opacity={ventana(t, M('aislado'), M('martires') + 1)}>
                  <ellipse cx={420} cy={640} rx={170} ry={40} fill="#93c5fd" opacity={0.5} />
                  <ellipse cx={420} cy={620} rx={90} ry={24} fill="#d6a76c" />
                  <Persona id={ID} x={420} y={620} s={0.7} cuerpo="#64748b" />
                  <Gesto x={420} y={620} s={0.7} animo={-0.5} />
                  <g transform="translate(780 560)">
                    <path d="M -70 -50 H 70 V 50 H -70 Z" fill="#d6a76c" stroke="#a16207" strokeWidth={4} />
                    <path d="M -70 -50 L -50 -80 H 90 L 70 -50" fill="#e7c08a" stroke="#a16207" strokeWidth={4} />
                  </g>
                  <Etiqueta x={600} y={760} texto="aislado o despedido" op={1} c={c} id={ID} />
                  <g opacity={e1(t, M('martires'))}><Cruz x={600} y={420} s={1.3} /></g>
                </g>
                <g opacity={e1(t, M('detert'))}>
                  <Persona id={ID} x={170} y={760} s={0.9} cuerpo="#334155" corbata />
                  <Gesto x={170} y={760} s={0.9} animo={0.5} />
                  <Etiqueta x={170} y={820} texto="James Detert" op={1} c={c} id={ID} />
                </g>
                <g opacity={e1(t, M('respetadas'))}>
                  {[[480, 760, '#334155'], [640, 760, '#0f766e'], [800, 760, '#7c3aed'], [960, 760, '#a16207']].map(([x, y, col], k) => (
                    <g key={k} opacity={ac(t, M('respetadas') + k * 0.3, M('respetadas') + k * 0.3 + 0.4)}>
                      <Persona id={ID} x={x as number} y={y as number} s={0.8 + 0.08 * k} cuerpo={col as string} corbata={k > 1} />
                      <Gesto x={x as number} y={y as number} s={0.8 + 0.08 * k} animo={0.6} />
                      <Estrella x={x as number} y={(y as number) - 50} r={12} fill="#fbbf24" />
                    </g>
                  ))}
                  <Chip x={720} y={330} texto="lo correcto" c={c} id={ID} op={e1(t, M('correcto'))} />
                  <Chip x={720} y={420} texto="ganan prestigio" c={c} id={ID} op={e1(t, M('prestigio'))} marca />
                </g>
              </g>
            )}

            {/* B · Martha */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const oficina = ac(t, M('renunciar') - 0.4, M('renunciar') + 0.6);
                  const sube = ac(t, M('vicepresidenta'), M('vicepresidenta') + 1.4);
                  const disculpa = ac(t, M('disculpo'), M('disculpo') + 0.6);
                  return (
                    <g>
                      <g transform={`translate(${200 * sube} ${-60 * sube})`}>
                        <Persona id={ID} x={260} y={760} cuerpo="#be185d" pelo="#5b3a26" />
                        <Gesto x={260} y={760} animo={-0.3 + 0.3 * oficina + 0.6 * disculpa} />
                        <Etiqueta x={260} y={820} texto="Martha" op={1 - sube} c={c} id={ID} />
                        <g opacity={sube}>
                          <rect x={226} y={640} width={68} height={30} rx={8} fill={`url(#${ID}-marca)`} />
                          <Txt x={260} y={663} textAnchor="middle" fontSize={22} fill="#fff">VP</Txt>
                        </g>
                      </g>
                      <g opacity={1 - sube}>
                        <Persona id={ID} x={940} y={760} cuerpo="#1f2937" corbata />
                        <Gesto x={940} y={760} animo={0.6 * (1 - oficina) - 0.6 * ac(t, M('disculpo') - 1, M('disculpo')) + 0.8 * ac(t, M('felicito'), M('felicito') + 0.6)} />
                        <Etiqueta x={940} y={820} texto="el presidente" op={1} c={c} id={ID} />
                      </g>
                      {/* comentarios de doble sentido */}
                      <g opacity={ventana(t, M('doble'), M('renunciar'))}>
                        {[0, 1, 2].map((k) => (
                          <g key={k} transform={`translate(${780 - k * 130} ${470 - k * 70})`} opacity={ac(t, M('doble') + k * 0.6, M('doble') + k * 0.6 + 0.4)}>
                            <path d="M -60 -30 L -40 -40 L -20 -30 L 0 -42 L 20 -30 L 40 -40 L 60 -28 V 24 L 40 34 L 20 24 L 0 36 L -20 24 L -40 34 L -60 24 Z" fill={c.apagado} />
                            <Txt x={0} y={10} textAnchor="middle" fontSize={26} fill={c.texto}>¿?</Txt>
                          </g>
                        ))}
                        <g opacity={e1(t, M('reunion'))}>
                          <path d="M 380 300 L 440 410 H 320 Z" fill="#dc2626" />
                          <Txt x={380} y={398} textAnchor="middle" fontSize={56} fill="#fff">!</Txt>
                        </g>
                      </g>
                      {/* en la oficina */}
                      <g opacity={oficina * (1 - sube)}>
                        <rect x={1050} y={420} width={90} height={340} rx={8} fill="#a16207" opacity={0.8} />
                        <g opacity={ventana(t, M('incomodaba') - 0.6, M('igual'))}><Burbuja x={290} y={560} w={420} texto="Su conducta me incomoda." u={ac(t, M('incomodaba') - 0.6, M('incomodaba') + 0.8)} c={c} id={ID} /></g>
                        <g opacity={ventana(t, M('igual'), M('fallando'))}><Burbuja x={290} y={560} w={460} texto="No me ve como una igual." u={ac(t, M('igual') - 0.6, M('igual') + 0.8)} c={c} id={ID} /></g>
                        <g opacity={ventana(t, M('fallando'), M('temia'))}><Burbuja x={290} y={560} w={420} texto="Está fallando." u={ac(t, M('fallando') - 0.3, M('fallando') + 0.6)} c={c} id={ID} marca /></g>
                        <g opacity={ventana(t, M('temia'), M('disculpo'))}>
                          <g transform="translate(600 430)"><path d="M -60 -40 H 60 V 40 H -60 Z" fill="#d6a76c" stroke="#a16207" strokeWidth={4} /></g>
                          <Etiqueta x={600} y={520} texto="¿el despido?" op={1} c={c} id={ID} />
                        </g>
                        <g opacity={ventana(t, M('disculpo'), M('formalmente'))}><Burbuja x={920} y={560} w={300} texto="Lo siento." u={ac(t, M('disculpo'), M('disculpo') + 0.6)} c={c} lado="der" id={ID} /></g>
                        <Chip x={600} y={300} texto="lo felicitó por hablar" c={c} id={ID} op={ventana(t, M('felicito'), M('formalmente'))} />
                        <Chip x={600} y={300} texto="disculpa ante el personal" c={c} id={ID} op={ventana(t, M('formalmente'), M('anio'))} marca />
                      </g>
                      {/* un año después */}
                      <g opacity={e1(t, M('anio'))}>
                        {[0, 1, 2, 3].map((k) => <rect key={k} x={300 + k * 110} y={700 - k * 40} width={110} height={60 + k * 40} fill={c.panel2} />)}
                        <Chip x={720} y={330} texto="un año después" c={c} id={ID} op={1} />
                        <Chip x={720} y={420} texto="vicepresidenta" c={c} id={ID} op={e1(t, M('vicepresidenta'))} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · cuatro conductas que se aprenden */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {([['preparar el terreno', M('terreno')], ['elegir las batallas', M('batallas')], ['persuadir en el momento', M('persuadir')], ['hacer seguimiento', M('seguimiento')]] as const).map(([txt, t0], k) => (
                  <g key={txt} opacity={e1(t, t0)}>
                    <circle cx={260} cy={290 + k * 105} r={34} fill={`url(#${ID}-marca)`} />
                    <Txt x={260} y={306 + k * 105} textAnchor="middle" fontSize={40} fill="#fff">{k + 1}</Txt>
                    <Txt f="a" x={320} y={302 + k * 105} fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                  </g>
                ))}
                <g opacity={e1(t, M('riesgo'))}>
                  <path d="M 960 560 L 1060 740 H 860 Z" fill="#f59e0b" />
                  <Txt x={960} y={720} textAnchor="middle" fontSize={72} fill="#fff">!</Txt>
                  <Etiqueta x={960} y={800} texto="el riesgo es real" op={1} c={c} id={ID} />
                </g>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
