import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Etiqueta, Gesto, Hoja, PanelPregunta, Reloj, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { Cierre } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «El silencio es carísimo» (Perlow y Williams), escena propia. Acto A: el silencio con buena fama: una
 * fila de personas iguales y calladas; la portada de Time con quienes denunciaron, y la mayoría que queda
 * marginada en gris. Acto B: la etiqueta de precio del silencio; la rabia que se acumula como un globo, la
 * ampolleta de la creatividad que se apaga y la barra de productividad que baja. Acto C: Jeff y su informe
 * de miércoles a domingo para la reunión del martes con Matt; se queja con sus colegas pero calla ante
 * Matt; el resentimiento sube, el proyecto se atrasa, y Matt confiesa que esa reunión le parece inútil.
 */

const ID = 'ce2j';
const nombres = ['fama', 'modestia', 'tonto', 'empleo', 'enron', 'time', 'castigados', 'perlow', 'carisimo', 'humillacion', 'creatividad', 'productividad', 'jeff', 'miercoles', 'informe', 'martes', 'quejaba', 'nunca', 'resentimiento', 'atrasaba', 'matt', 'inutil', 'pregunta'] as const;

export const SilencioCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('inutil') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'El silencio tiene buena fama'], [M('empleo'), 'Alinearse para no perder'], [M('enron'), 'Los que denunciaron'], [M('castigados'), 'La mayoría, castigada'],
    [M('perlow'), 'Perlow y Williams'], [M('carisimo'), 'Carísimo'], [M('jeff'), 'El informe de Jeff'], [M('quejaba'), 'Se quejaba con otros'],
    [M('nunca'), 'Nunca se lo dijo'], [M('matt'), 'Lo que pensaba Matt'],
  ];

  const aA = ventana(t, -1, M('perlow'));
  const aB = ventana(t, M('perlow'), M('jeff'));
  const aC = ac(t, M('jeff'), M('jeff') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="El silencio parece prudente, pero es carísimo para la empresa y la persona">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · la buena fama del silencio y quienes hablaron */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const fila = ac(t, M('empleo'), M('empleo') + 1.2);
                  const portada = ventana(t, M('enron'), M('castigados') + 1);
                  const gris = ac(t, M('castigados'), M('castigados') + 1);
                  return (
                    <g>
                      <g opacity={1 - ac(t, M('enron'), M('enron') + 0.4)}>
                        {[0, 1, 2, 3, 4].map((k) => {
                          const x = k === 2 ? 600 : 600 + (k - 2) * 190 * fila;
                          const op = k === 2 ? 1 : fila;
                          return (
                            <g key={k} opacity={op}>
                              <Persona id={ID} x={x} y={760} s={0.9} cuerpo="#64748b" />
                              <Gesto x={x} y={760} s={0.9} animo={0.1} />
                              <Cierre x={x} y={760} s={0.9} op={k === 2 ? e1(t, M('fama')) : fila} />
                            </g>
                          );
                        })}
                        <Chip x={300} y={300} texto="modestia" c={c} id={ID} op={e1(t, M('modestia'))} />
                        <Chip x={600} y={300} texto="respeto" c={c} id={ID} op={e1(t, M('modestia') + 0.6)} />
                        <Chip x={900} y={300} texto="prudencia" c={c} id={ID} op={e1(t, M('modestia') + 1.2)} />
                        <Etiqueta x={600} y={420} texto="«calla y parece tonto»" op={e1(t, M('tonto'))} c={c} id={ID} />
                        <Etiqueta x={600} y={500} texto="conservar el empleo" op={fila} c={c} id={ID} marca />
                      </g>
                      {/* la portada de Time */}
                      <g opacity={portada}>
                        <rect x={190} y={260} width={300} height={400} rx={10} fill={c.blanco} style={sombra(c.sombra)} />
                        <rect x={190} y={260} width={300} height={70} rx={10} fill="#dc2626" />
                        <Txt x={340} y={316} textAnchor="middle" fontSize={48} fill="#fff">TIME</Txt>
                        {[270, 340, 410].map((x, k) => <Persona key={x} id={ID} x={x} y={620} s={0.55} cuerpo={['#334155', '#7c3aed', '#0f766e'][k]} />)}
                        <Etiqueta x={340} y={710} texto="personajes del año" op={e1(t, M('time'))} c={c} id={ID} />
                        <Chip x={830} y={300} texto="Enron · WorldCom · FBI" c={c} id={ID} op={1} />
                      </g>
                      <g opacity={e1(t, M('castigados'))}>
                        {[650, 800, 950, 1100].map((x, k) => (
                          <g key={x} transform={`translate(${gris * (k % 2 ? 12 : -12)} ${gris * 20})`} opacity={1 - 0.5 * gris}>
                            <Persona id={ID} x={x} y={760} s={0.8} cuerpo={gris > 0.5 ? '#9ca3af' : '#64748b'} />
                            <Gesto x={x} y={760} s={0.8} animo={-0.5 * gris} />
                          </g>
                        ))}
                        <Etiqueta x={880} y={560} texto="castigados o marginados" op={gris} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · el costo del silencio */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const presion = ac(t, M('humillacion'), M('humillacion') + 3);
                  const apaga = ac(t, M('creatividad'), M('creatividad') + 1.2);
                  const baja = ac(t, M('productividad'), M('productividad') + 1.2);
                  return (
                    <g>
                      <Persona id={ID} x={220} y={760} cuerpo="#64748b" />
                      <Gesto x={220} y={760} animo={-0.6 * presion} />
                      <Cierre x={220} y={760} op={1} />
                      <g opacity={e1(t, M('carisimo'))} transform="translate(600 320) rotate(-8)">
                        <path d="M -150 -48 H 110 L 150 0 L 110 48 H -150 Z" fill={c.blanco} stroke={ROSA} strokeWidth={5} style={sombra(c.sombra)} />
                        <circle cx={112} cy={0} r={10} fill={ROSA} />
                        <Txt f="a" x={-20} y={10} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>el silencio: $$$</Txt>
                      </g>
                      <g opacity={e1(t, M('humillacion'))}>
                        <circle cx={220} cy={500 - 30 * presion} r={30 + 50 * presion} fill="#dc2626" opacity={0.25 + 0.3 * presion} />
                        <Txt f="a" x={220} y={510 - 30 * presion} textAnchor="middle" fontSize={26} fill={c.texto} opacity={presion}>rabia</Txt>
                      </g>
                      <g opacity={e1(t, M('creatividad'))} transform="translate(620 560)">
                        <circle r={70} fill="#fde68a" opacity={0.35 * (1 - apaga)} />
                        <path d="M -36 10 Q -52 -22 -32 -48 Q 0 -76 32 -48 Q 52 -22 36 10 Q 24 24 22 40 H -22 Q -24 24 -36 10 Z" fill={apaga > 0.5 ? c.apagado : '#fbbf24'} />
                        <rect x={-20} y={42} width={40} height={12} rx={5} fill="#9ca3af" />
                        <Txt f="a" x={0} y={110} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>creatividad</Txt>
                      </g>
                      <g opacity={e1(t, M('productividad'))}>
                        <rect x={900} y={420} width={90} height={260} rx={14} fill={c.panel2} />
                        <rect x={900} y={420 + 200 * baja} width={90} height={260 - 200 * baja} rx={14} fill={`url(#${ID}-marca)`} />
                        <Etiqueta x={945} y={730} texto="productividad" op={1} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · Jeff, su informe y la reunión de los martes */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const resent = ac(t, M('resentimiento'), M('resentimiento') + 2);
                  const dias = ['mi', 'ju', 'vi', 'sá', 'do', 'lu', 'ma'];
                  return (
                    <g>
                      <Persona id={ID} x={200} y={760} cuerpo="#334155" corbata />
                      <Gesto x={200} y={760} animo={0.2 - 0.8 * resent} />
                      <Etiqueta x={200} y={820} texto="Jeff" op={1} c={c} id={ID} />
                      <Cierre x={200} y={760} op={ventana(t, M('nunca'), M('matt'))} />
                      <g opacity={ventana(t, M('miercoles'), M('quejaba'))}>
                        {dias.map((d, k) => (
                          <g key={d}>
                            <rect x={330 + k * 92} y={270} width={80} height={80} rx={12} fill={k < 5 ? (k < Math.round(5 * ac(t, M('miercoles'), M('informe'))) ? NARANJA : c.panel2) : k === 6 ? ROSA : c.panel2} />
                            <Txt f="a" x={370 + k * 92} y={320} textAnchor="middle" fontSize={26} fill={k < 5 || k === 6 ? '#fff' : c.tenue}>{d}</Txt>
                          </g>
                        ))}
                        <g opacity={e1(t, M('informe'))}>
                          {[0, 1, 2, 3].map((k) => <rect key={k} x={430 + k * 8} y={420 - k * 8} width={220} height={260} rx={8} fill={c.blanco} stroke={c.apagado} strokeWidth={2} />)}
                          <Etiqueta x={560} y={740} texto="informe semanal" op={1} c={c} id={ID} />
                        </g>
                        <Etiqueta x={970} y={400} texto="reunión del martes" op={e1(t, M('martes'))} c={c} id={ID} />
                      </g>
                      {/* Matt */}
                      <g opacity={e1(t, M('martes'))}>
                        <Persona id={ID} x={1000} y={760} cuerpo="#1f2937" corbata />
                        <Gesto x={1000} y={760} animo={0.1 - 0.3 * e1(t, M('inutil'))} />
                        <Etiqueta x={1000} y={820} texto="Matt" op={1} c={c} id={ID} />
                      </g>
                      {/* se queja con sus colegas */}
                      <g opacity={ventana(t, M('quejaba'), M('matt'))}>
                        {[450, 600].map((x, k) => <g key={x}><Persona id={ID} x={x} y={760} s={0.8} cuerpo={k ? '#0f766e' : '#7c3aed'} /><Gesto x={x} y={760} s={0.8} animo={0} /></g>)}
                        <Burbuja x={230} y={560} w={300} texto="¡Qué inútil!" u={1} c={c} id={ID} />
                        <path d="M 260 585 L 860 585" stroke={c.apagado} strokeWidth={5} strokeDasharray="8 10" opacity={e1(t, M('nunca'))} />
                      </g>
                      <g opacity={ventana(t, M('resentimiento'), M('matt'))}>
                        <rect x={700} y={300} width={300} height={24} rx={12} fill={c.panel2} />
                        <rect x={700} y={300} width={300 * (0.2 + 0.7 * resent)} height={24} rx={12} fill="#dc2626" />
                        <Txt f="a" x={850} y={280} textAnchor="middle" fontSize={26} fill={c.texto}>resentimiento</Txt>
                        <rect x={700} y={380} width={300} height={24} rx={12} fill={c.panel2} />
                        <rect x={700} y={380} width={300 * (0.8 - 0.6 * resent)} height={24} rx={12} fill="#0f766e" />
                        <Txt f="a" x={850} y={360} textAnchor="middle" fontSize={26} fill={c.texto}>respeto</Txt>
                      </g>
                      <g opacity={ventana(t, M('atrasaba'), M('matt'))}><Reloj x={850} y={500} c={c} progreso={0.95} /><Etiqueta x={850} y={575} texto="proyecto atrasado" op={1} c={c} id={ID} /></g>
                      <g opacity={e1(t, M('matt'))}>
                        <Burbuja x={980} y={560} w={560} texto="Cada martes tengo una reunión dolorosamente inútil." u={ac(t, M('matt') + 2, M('inutil') + 1)} c={c} lado="der" id={ID} marca />
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
