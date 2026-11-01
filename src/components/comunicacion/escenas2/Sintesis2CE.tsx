import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Chip, Etiqueta, Gesto, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Se vende como se conversa» (síntesis de la parte 2), escena propia. Acto A: el cliente afuera y el
 * equipo adentro, separados por una puerta; el líder preciso alinea flechas y el vago las dispersa. Acto
 * B: dos columnas, afuera y adentro, con las mismas reglas: preguntas, la objeción y la mala noticia que
 * crecen hasta volverse caras, la historia y la reorganización, la conversación tensa y la crítica, el
 * consejo y el conflicto. Acto C: cuatro hábitos en una rueda, el ladrillo de lo que no es blando, el
 * gráfico de resultados y la flecha final que va de adentro hacia afuera.
 */

const ID = 'ce2x';
const nombres = ['idea', 'conversa', 'adentro', 'intencion', 'precision', 'vagas', 'preguntas', 'equipo', 'objecion', 'malaNoticia', 'caro', 'historia', 'reorg', 'tensa', 'darRecibir', 'consejo', 'conflicto', 'claridad', 'escuchar', 'atreverse', 'blandas', 'resultados', 'afuera', 'adentro2', 'pregunta'] as const;

export const Sintesis2CE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('adentro2') + 0.8 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Una misma idea'], [M('adentro'), 'Las mismas reglas'], [M('precision'), 'Precisión o frases vagas'], [M('preguntas'), 'Afuera y adentro'],
    [M('caro'), 'Lo callado se vuelve caro'], [M('claridad'), 'Cuatro hábitos'], [M('blandas'), 'No son blandas'], [M('afuera'), 'Afuera nace de adentro'],
  ];

  const aA = ventana(t, -1, M('preguntas'));
  const aB = ventana(t, M('preguntas'), M('claridad'));
  const aC = ac(t, M('claridad'), M('claridad') + 0.4);

  const filas: [string, string, number][] = [
    ['preguntas', 'preguntas', M('preguntas')],
    ['una objeción', 'mala noticia', M('objecion')],
    ['una historia', 'reorganización', M('historia')],
    ['conversación tensa', 'crítica, conflicto', M('tensa')],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Una organización vende tan bien como conversa: lo que se dice afuera nace de lo que se habla adentro">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · el cliente, la puerta y el líder */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const preciso = ac(t, M('precision'), M('precision') + 1.4);
                  const vago = ac(t, M('vagas'), M('vagas') + 1.4);
                  return (
                    <g>
                      <Chip x={600} y={250} texto="vende como conversa" c={c} id={ID} op={e1(t, M('conversa'))} marca />
                      <rect x={580} y={300} width={40} height={500} rx={8} fill="#a16207" opacity={e1(t, M('adentro')) * 0.8} />
                      <Persona id={ID} x={300} y={760} cuerpo="#1f2937" />
                      <Gesto x={300} y={760} animo={0.4} />
                      <Etiqueta x={300} y={820} texto="cliente" op={1} c={c} id={ID} />
                      <Persona id={ID} x={900} y={760} cuerpo="#334155" corbata />
                      <Gesto x={900} y={760} animo={0.4} />
                      <Etiqueta x={900} y={820} texto="líder" op={1} c={c} id={ID} />
                      <Etiqueta x={900} y={340} texto="tu intención no se ve" op={ventana(t, M('intencion'), M('precision'))} c={c} id={ID} />
                      {/* flechas alineadas o dispersas */}
                      <g opacity={e1(t, M('precision'))}>
                        {Array.from({ length: 5 }, (_, k) => {
                          const ang = vago * [-60, 40, -120, 90, 150][k];
                          return (
                            <g key={k} transform={`translate(${760 + (k % 3) * 100} ${380 + Math.floor(k / 3) * 90}) rotate(${ang})`}>
                              <path d="M -30 0 H 24 M 10 -14 L 26 0 L 10 14" stroke={vago > 0.5 ? c.tenue : NARANJA} strokeWidth={8} fill="none" strokeLinecap="round" opacity={preciso} />
                            </g>
                          );
                        })}
                        <Etiqueta x={860} y={550} texto={vago > 0.5 ? 'rumores' : 'alinea'} op={1} c={c} id={ID} marca={vago < 0.5} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · dos columnas con las mismas reglas */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <line x1={600} y1={240} x2={600} y2={760} stroke={c.apagado} strokeWidth={4} strokeDasharray="10 12" />
                <Txt f="a" x={320} y={262} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>con el cliente</Txt>
                <Txt f="a" x={880} y={262} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>con el equipo</Txt>
                {filas.map(([a, b, t0], k) => (
                  <g key={a} opacity={e1(t, t0)}>
                    <Chip x={320} y={340 + k * 100} texto={a} c={c} id={ID} op={1} marca={k === 1 && t > M('caro')} />
                    <Chip x={880} y={340 + k * 100} texto={b} c={c} id={ID} op={k === 1 ? e1(t, M('malaNoticia')) : k === 2 ? e1(t, M('reorg')) : 1} marca={k === 1 && t > M('caro')} />
                  </g>
                ))}
                <g opacity={e1(t, M('caro'))}>
                  <Txt x={600} y={458} textAnchor="middle" fontSize={44} fill="#dc2626">$</Txt>
                </g>
                <Chip x={880} y={740} texto="el consejo" c={c} id={ID} op={e1(t, M('consejo'))} />
              </g>
            )}

            {/* C · cuatro hábitos, no blandos, que dan resultados */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const final = ac(t, M('afuera'), M('afuera') + 1);
                  return (
                    <g>
                      <g opacity={1 - final}>
                        {([['hablar claro', M('claridad')], ['escuchar', M('escuchar')], ['atreverse', M('atreverse')], ['saber recibir', M('atreverse') + 1.4]] as const).map(([txt, t0], k) => {
                          const a = (k / 4) * Math.PI * 2 - Math.PI / 2;
                          return <Chip key={txt} x={600 + Math.cos(a) * 280} y={480 + Math.sin(a) * 190} texto={txt} c={c} id={ID} op={e1(t, t0)} />;
                        })}
                        <g opacity={e1(t, M('blandas'))}>
                          <rect x={530} y={440} width={140} height={80} rx={6} fill="#b45309" />
                          <path d="M 530 480 H 670 M 600 440 V 480 M 565 480 V 520 M 635 480 V 520" stroke="#7c2d12" strokeWidth={4} />
                        </g>
                        <g opacity={e1(t, M('resultados'))}>
                          <path d="M 780 760 L 860 720 L 940 730 L 1040 640" stroke={`url(#${ID}-marcaH)`} strokeWidth={10} fill="none" strokeLinecap="round" />
                          <Etiqueta x={910} y={810} texto="resultados" op={1} c={c} id={ID} />
                        </g>
                      </g>
                      <g opacity={final}>
                        <rect x={580} y={300} width={40} height={500} rx={8} fill="#a16207" opacity={0.8} />
                        <Persona id={ID} x={300} y={760} cuerpo="#1f2937" />
                        <Gesto x={300} y={760} animo={0.7} />
                        <Etiqueta x={300} y={820} texto="afuera" op={1} c={c} id={ID} />
                        {[820, 960].map((x, k) => <g key={x}><Persona id={ID} x={x} y={760} s={0.9} cuerpo={k ? '#0f766e' : '#334155'} /><Gesto x={x} y={760} s={0.9} animo={0.7} /></g>)}
                        <Etiqueta x={890} y={820} texto="adentro" op={e1(t, M('adentro2'))} c={c} id={ID} marca />
                        <path d="M 880 460 Q 600 340 340 460" stroke={NARANJA} strokeWidth={10} fill="none" strokeLinecap="round" />
                        <path d="M 366 436 L 334 464 L 372 476" stroke={NARANJA} strokeWidth={10} fill="none" strokeLinecap="round" />
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
