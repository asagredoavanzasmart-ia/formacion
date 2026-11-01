import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Brazos, Burbuja, Chip, Etiqueta, Gesto, Hoja, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { Cierre } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Romper la espiral» (Perlow y Williams), escena propia. Acto A: el comandante Harry ante su batallón,
 * dos tercios en gris por el combate simulado; reconoce su culpa y eso permite que Nick, el explorador,
 * levante la mano y confiese que se durmió; Harry lleva la conversación al agotamiento. Acto B: tres
 * prácticas: reconocer tu poder (flechas de ida y vuelta entre jefe y equipo), Linda que vuelve donde
 * Robert, y una persona que pregunta en una fila que calla. Acto C: la coalición de Nancy Hopkins: una
 * carta, 14 de 15 firmas y un comité. Acto D: la pregunta se invierte: la excepción ya no es hablar, sino
 * callar.
 */

const ID = 'ce2m';
const nombres = ['valor', 'harry', 's500', 'tercios', 'culpa', 'falle', 'nick', 'dormido', 'castigarlo', 'agotamiento', 'soldado', 'practicas', 'poder', 'necesita', 'linda', 'distinta', 'dificiles', 'coalicion', 'hopkins', 'carta', 'p14', 'comite', 'momentos', 'conviene', 'pregunta'] as const;

export const RomperCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('conviene') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Valor y contexto'], [M('harry'), 'El comandante Harry'], [M('culpa'), '«La culpa fue mía»'], [M('nick'), 'Nick habla'],
    [M('castigarlo'), 'El problema de fondo'], [M('practicas'), 'Tres prácticas'], [M('poder'), '1 · Reconoce tu poder'], [M('distinta'), '2 · Actúa distinto'],
    [M('coalicion'), '3 · Forma una coalición'], [M('momentos'), 'La pregunta cambia'],
  ];

  const aA = ventana(t, -1, M('practicas'));
  const aB = ventana(t, M('practicas'), M('coalicion'));
  const aC = ventana(t, M('coalicion'), M('momentos'));
  const aD = ac(t, M('momentos'), M('momentos') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Reconocer el propio error rompe la espiral del silencio; tres prácticas para hablar">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · Harry y Nick */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const gris = ac(t, M('tercios'), M('tercios') + 1.2) * (1 - ac(t, M('soldado'), M('soldado') + 1));
                  const mano = ac(t, M('nick') - 0.5, M('nick') + 0.3);
                  return (
                    <g>
                      <Chip x={600} y={250} texto="valor individual" c={c} id={ID} op={ventana(t, M('valor'), M('harry'))} />
                      <g opacity={e1(t, M('harry'))}>
                        <Persona id={ID} x={200} y={760} cuerpo="#3f6212" pelo="#2b1a12" />
                        <Gesto x={200} y={760} animo={0.1 - 0.4 * ventana(t, M('culpa'), M('nick'))} />
                        <rect x={162} y={604} width={76} height={16} rx={6} fill="#365314" />
                        <Etiqueta x={200} y={820} texto="Harry" op={1} c={c} id={ID} />
                      </g>
                      {/* el batallón */}
                      <g opacity={ventana(t, M('s500'), M('nick'))}>
                        {Array.from({ length: 30 }, (_, k) => {
                          const x = 660 + (k % 10) * 46, y = 330 + Math.floor(k / 10) * 66;
                          const muerto = k % 3 !== 0 && gris > 0.01;
                          return <g key={k} opacity={muerto ? 1 - 0.65 * gris : 1}><circle cx={x} cy={y} r={14} fill={muerto && gris > 0.5 ? c.apagado : '#4d7c0f'} /><path d={`M ${x - 18} ${y + 34} Q ${x} ${y + 8} ${x + 18} ${y + 34} Z`} fill={muerto && gris > 0.5 ? c.apagado : '#3f6212'} /></g>;
                        })}
                        <Etiqueta x={870} y={550} texto={t > M('tercios') ? 'dos tercios, muertos' : 'más de 500 soldados'} op={1} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('culpa') - 0.3, M('nick'))}>
                        <Burbuja x={230} y={560} w={420} texto="La culpa fue mía. Les fallé." u={ac(t, M('culpa') - 0.3, M('falle') + 1)} c={c} id={ID} marca />
                      </g>
                      {/* Nick levanta la mano */}
                      <g opacity={e1(t, M('nick'))}>
                        <Brazos x={1000} y={760} s={0.8} izq={10} der={10 + 150 * mano} id={ID} color="#3f6212" />
                        <Persona id={ID} x={1000} y={760} s={0.8} cuerpo="#3f6212" pelo="#7c3f1d" />
                        <Gesto x={1000} y={760} s={0.8} animo={-0.2} />
                        <Etiqueta x={1000} y={820} texto="Nick" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('dormido') - 0.5, M('castigarlo'))}>
                        <Burbuja x={980} y={600} w={440} texto="No fue su culpa. Me quedé dormido." u={ac(t, M('dormido') - 2.5, M('dormido') + 0.5)} c={c} lado="der" id={ID} />
                      </g>
                      <Chip x={600} y={690} texto="sin castigo" c={c} id={ID} op={ventana(t, M('castigarlo'), M('agotamiento'))} />
                      <Chip x={600} y={690} texto="el agotamiento" c={c} id={ID} op={e1(t, M('agotamiento'))} marca />
                      <g opacity={e1(t, M('soldado'))}>
                        <Burbuja x={230} y={560} w={420} texto="Nick es un buen soldado. Todos lo son." u={ac(t, M('soldado') - 0.5, M('soldado') + 1.5)} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · las tres prácticas */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const poder = ventana(t, M('poder'), M('linda'));
                  const linda = ventana(t, M('linda'), M('distinta'));
                  const fila = e1(t, M('distinta'));
                  return (
                    <g>
                      {['1 · poder', '2 · distinto', '3 · coalición'].map((txt, k) => (
                        <Chip key={txt} x={[210, 570, 970][k]} y={240} texto={txt} c={c} id={ID} op={e1(t, M('practicas') + k * 0.4)} marca={(k === 0 && t > M('poder') && t < M('distinta')) || (k === 1 && t > M('distinta'))} />
                      ))}
                      <g opacity={poder}>
                        <Persona id={ID} x={300} y={760} cuerpo="#334155" corbata />
                        <Gesto x={300} y={760} animo={0.3} />
                        <Etiqueta x={300} y={820} texto="jefe" op={1} c={c} id={ID} />
                        <Persona id={ID} x={900} y={760} cuerpo="#0f766e" />
                        <Gesto x={900} y={760} animo={0.4} />
                        <Etiqueta x={900} y={820} texto="tú" op={1} c={c} id={ID} />
                        <path d="M 360 430 Q 600 360 840 430" stroke={c.tenue} strokeWidth={8} fill="none" />
                        <path d="M 816 410 L 846 434 L 812 446" stroke={c.tenue} strokeWidth={8} fill="none" strokeLinecap="round" />
                        <Txt f="a" x={600} y={360} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>poder formal</Txt>
                        <g opacity={e1(t, M('necesita'))}>
                          <path d="M 840 540 Q 600 610 360 540" stroke={NARANJA} strokeWidth={8} fill="none" />
                          <path d="M 384 520 L 354 544 L 388 556" stroke={NARANJA} strokeWidth={8} fill="none" strokeLinecap="round" />
                          <Txt f="a" x={600} y={640} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>también te necesita</Txt>
                        </g>
                      </g>
                      <g opacity={linda}>
                        <Persona id={ID} x={300} y={760} cuerpo="#be185d" pelo="#5b3a26" />
                        <Gesto x={300} y={760} animo={0.5} />
                        <Etiqueta x={300} y={820} texto="Linda" op={1} c={c} id={ID} />
                        <Persona id={ID} x={900} y={760} cuerpo="#1f2937" corbata />
                        <Gesto x={900} y={760} animo={0.3} />
                        <Etiqueta x={900} y={820} texto="Robert" op={1} c={c} id={ID} />
                        <Burbuja x={330} y={560} w={480} texto="Para ti no es importante; para mi equipo, sí." u={ac(t, M('linda'), M('linda') + 2)} c={c} id={ID} marca />
                      </g>
                      <g opacity={fila}>
                        {[200, 340, 480, 620, 760, 900, 1040].map((x, k) => (
                          <g key={x}>
                            {k === 3 && <Brazos x={x} y={760} s={0.75} izq={10} der={160} id={ID} color="#7c3aed" />}
                            <Persona id={ID} x={x} y={760} s={0.75} cuerpo={k === 3 ? '#7c3aed' : '#94a3b8'} />
                            <Gesto x={x} y={760} s={0.75} animo={k === 3 ? 0.5 : 0} />
                            {k !== 3 && <Cierre x={x} y={760} s={0.75} op={1} />}
                          </g>
                        ))}
                        <Burbuja x={640} y={560} w={300} texto="¿Por qué?" u={ac(t, M('dificiles'), M('dificiles') + 0.6)} c={c} id={ID} marca />
                        <Etiqueta x={620} y={360} texto="un acto creativo" op={e1(t, M('dificiles') + 1)} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · la coalición de Nancy Hopkins */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <Persona id={ID} x={200} y={760} cuerpo="#7c3aed" pelo="#9ca3af" />
                <Gesto x={200} y={760} animo={0.5} />
                <Etiqueta x={200} y={820} texto="Nancy Hopkins" op={e1(t, M('hopkins'))} c={c} id={ID} />
                <g opacity={e1(t, M('carta'))}><Hoja x={430} y={460} w={200} h={250} c={c} cabeza={NARANJA} titulo="carta" llena={1} tituloTam={22} /></g>
                <g opacity={e1(t, M('p14'))}>
                  {Array.from({ length: 15 }, (_, k) => {
                    const x = 640 + (k % 5) * 100, y = 330 + Math.floor(k / 5) * 110;
                    const firma = k < 14 && t > M('p14') + k * 0.12;
                    return <g key={k}><circle cx={x} cy={y} r={20} fill={k < 14 ? '#7c3aed' : c.apagado} /><path d={`M ${x - 28} ${y + 46} Q ${x} ${y + 12} ${x + 28} ${y + 46} Z`} fill={k < 14 ? '#a78bfa' : c.apagado} />{firma && <Visto x={x + 22} y={y - 18} s={0.45} />}</g>;
                  })}
                  <Etiqueta x={840} y={700} texto="14 de 15 firman" op={1} c={c} id={ID} marca />
                </g>
                <Chip x={840} y={780} texto="un comité lo corrige" c={c} id={ID} op={e1(t, M('comite'))} />
              </g>
            )}

            {/* D · la excepción ya no es hablar, es callar */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const giro = ac(t, M('conviene') - 3, M('conviene'));
                  return (
                    <g>
                      <g transform={`translate(600 480) rotate(${-14 + 28 * giro})`}>
                        <rect x={-300} y={-8} width={600} height={16} rx={8} fill={c.tenue} />
                        <rect x={-340} y={8} width={130} height={56} rx={12} fill={NARANJA} />
                        <Txt f="a" x={-275} y={46} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">hablar</Txt>
                        <rect x={210} y={8} width={130} height={56} rx={12} fill={c.apagado} />
                        <Txt f="a" x={275} y={46} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>callar</Txt>
                      </g>
                      <path d="M 600 480 L 560 620 H 640 Z" fill={c.tenue} />
                      <Chip x={600} y={290} texto="hay momentos para callar" c={c} id={ID} op={ventana(t, M('momentos'), M('conviene') - 0.5)} />
                      <Chip x={600} y={290} texto="lo raro es callar" c={c} id={ID} op={e1(t, M('conviene') - 0.5)} marca />
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
