import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Espalda, Estrella, Etiqueta, Gesto, Hoja, Institucion, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Una historia mínima» (Denning), escena propia. Acto A: Denning presenta gráficos y su público queda
 * aturdido (espirales sobre las cabezas). Acto B: la trabajadora de salud en un pueblo de Zambia, a
 * 600 km de la capital, que se conecta con los Centros para el Control de Enfermedades y obtiene la
 * respuesta sobre la malaria; el Banco Mundial no aparece, millones de personas sin ese saber y, al
 * imaginarlo, el banco que se enciende y las alcanza. Acto C: la narradora («eso no es una historia»),
 * la versión épica tachada y el público que piensa en su propia organización en el espacio que deja el
 * relato. Acto D: el análisis corta la niebla, pero no llega al corazón; los números elaboran, la
 * historia aprueba.
 */

const ID = 'ce27';
const nombres = ['denning', 'banco', 'aturdido', 'a1996', 'junio95', 'zambia', 'km600', 'cdc', 'malaria', 'noAparece', 'millones', 'imagina', 'narradora', 'sinTrama', 'equivocaba', 'epica', 'propia', 'porQue', 'espacio', 'analisis', 'niebla', 'corazon', 'numeros', 'historia', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Choza con techo de paja. */
const Choza: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-60} y={-70} width={120} height={70} fill="#d6a76c" />
    <path d="M -80 -66 L 0 -140 L 80 -66 Z" fill="#a16207" />
    <rect x={-16} y={-44} width={32} height={44} fill="#7c4a24" />
  </g>
);

/* Silueta de ciudad (la capital). */
const Ciudad: React.FC<{ x: number; y: number; c: C }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    {[[-70, 60], [-34, 100], [4, 76], [40, 120], [80, 70]].map(([dx, h], k) => <rect key={k} x={dx - 16} y={-h} width={34} height={h} rx={3} fill={c.tenue} opacity={0.7} />)}
  </g>
);

/* Nube de niebla. */
const Nube: React.FC<{ x: number; y: number; s: number; op: number; c: C }> = ({ x, y, s, op, c }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <path d="M -80 20 Q -90 -20 -50 -24 Q -40 -60 0 -54 Q 40 -70 56 -30 Q 96 -26 86 16 Z" fill={c.apagado} />
  </g>
);

export const DenningCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('historia') + 1 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Stephen Denning'], [M('aturdido'), 'Argumentos que aturden'], [M('junio95'), 'Zambia, junio de 1995'], [M('cdc'), 'La respuesta, en internet'],
    [M('noAparece'), 'El Banco Mundial no está'], [M('imagina'), 'Imagina si llegara'], [M('narradora'), '¿Eso es una historia?'], [M('epica'), 'Sin épica'],
    [M('propia'), 'Piensan en lo propio'], [M('espacio'), 'Espacio mental'], [M('analisis'), 'El análisis'], [M('corazon'), 'No llega al corazón'],
    [M('numeros'), 'Números e historias'],
  ];

  const aA = ventana(t, -1, M('junio95'));
  const aB = ventana(t, M('junio95'), M('narradora'));
  const aC = ventana(t, M('narradora'), M('analisis'));
  const aD = ac(t, M('analisis'), M('analisis') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Denning: una historia mínima mueve a actuar donde el análisis no llega">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · gráficos que aturden */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const mareo = ac(t, M('aturdido'), M('aturdido') + 0.8);
                  return (
                    <g>
                      <Persona id={ID} x={180} y={760} cuerpo="#334155" corbata />
                      <Gesto x={180} y={760} animo={0.3 - 0.4 * mareo} />
                      <Etiqueta x={180} y={820} texto="Denning" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('banco'))}>
                        <rect x={300} y={210} width={500} height={280} rx={18} fill={c.panel} style={sombra(c.sombra)} />
                        {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={340 + k * 72} y={450 - (60 + ((k * 37) % 140))} width={48} height={60 + ((k * 37) % 140)} rx={6} fill={k % 2 ? c.apagado : NARANJA} opacity={0.85} />)}
                        <Etiqueta x={550} y={530} texto="Banco Mundial" op={1} c={c} id={ID} />
                      </g>
                      {[620, 800, 980].map((x, k) => (
                        <g key={x}>
                          <Espalda x={x} y={760} s={1.1} c={c} pelo={['#2b1a12', '#5b3a26', '#9ca3af'][k]} />
                          <g opacity={mareo} transform={`translate(${x} 650) rotate(${t * 200 + k * 60})`}>
                            <path d="M 0 0 m -4 0 a 4 4 0 1 1 8 0 a 8 8 0 1 1 -16 0 a 12 12 0 1 1 24 0" stroke={ROSA} strokeWidth={3} fill="none" />
                          </g>
                        </g>
                      ))}
                      <Chip x={980} y={300} texto="1996" c={c} id={ID} op={e1(t, M('a1996'))} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · Zambia: la respuesta llega, el Banco no */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const datos = ac(t, M('cdc'), M('cdc') + 1);
                  const llega = ac(t, M('imagina'), M('imagina') + 2);
                  return (
                    <g>
                      <g opacity={e1(t, M('zambia'))}>
                        <Choza x={400} y={720} />
                        <Persona id={ID} x={250} y={770} s={0.9} cuerpo="#0e7490" pelo="#2b1a12" />
                        <Gesto x={250} y={770} s={0.9} animo={0.3 + 0.5 * ac(t, M('malaria'), M('malaria') + 0.6)} />
                        <rect x={272} y={660} width={60} height={40} rx={4} fill="#1f2937" />
                        <rect x={276} y={664} width={52} height={30} rx={2} fill="#93c5fd" opacity={0.5 + 0.5 * datos} />
                        <Etiqueta x={300} y={825} texto="Zambia" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('km600'))}>
                        <Ciudad x={170} y={330} c={c} />
                        <path d="M 200 350 Q 260 470 380 560" stroke={c.tenue} strokeWidth={5} fill="none" strokeDasharray="10 10" />
                        <Txt f="a" x={330} y={430} fontSize={MIN_TXT} fill={c.texto}>600 km</Txt>
                      </g>
                      <g opacity={e1(t, M('cdc'))}>
                        <Institucion x={900} y={380} s={0.7} c={c} id={ID} escudo />
                        <Etiqueta x={900} y={430} texto="Control de Enfermedades" op={1} c={c} id={ID} />
                        <path d="M 340 650 Q 600 470 830 390" stroke={NARANJA} strokeWidth={5} fill="none" strokeDasharray="14 12" strokeDashoffset={t * 40} opacity={datos * (1 - ac(t, M('noAparece'), M('noAparece') + 0.6))} />
                      </g>
                      <Chip x={600} y={250} texto="junio de 1995" c={c} id={ID} op={ventana(t, M('junio95'), M('cdc'))} />
                      <Chip x={600} y={290} texto="malaria: respuesta" c={c} id={ID} op={ventana(t, M('malaria'), M('noAparece'))} marca />
                      {/* el Banco Mundial que no aparece y que, al imaginarlo, llega a millones */}
                      <g opacity={e1(t, M('noAparece'))}>
                        <g opacity={0.3 + 0.7 * llega}><Institucion x={900} y={720} s={0.7} c={c} id={ID} /></g>
                        <Etiqueta x={900} y={770} texto="Banco Mundial" op={1} c={c} id={ID} />
                        <Txt x={1000} y={600} fontSize={56} fill={c.tenue} opacity={1 - llega}>?</Txt>
                      </g>
                      <g opacity={e1(t, M('millones'))}>
                        {Array.from({ length: 24 }, (_, k) => {
                          const x = 520 + (k % 8) * 40, y = 560 + Math.floor(k / 8) * 50;
                          const lit = ac(llega, k / 30, k / 30 + 0.2);
                          return <g key={k}><circle cx={x} cy={y - 10} r={9} fill={lit > 0.5 ? NARANJA : c.apagado} /><path d={`M ${x - 13} ${y + 14} Q ${x} ${y - 4} ${x + 13} ${y + 14} Z`} fill={lit > 0.5 ? ROSA : c.apagado} /></g>;
                        })}
                        <Etiqueta x={660} y={720} texto="millones" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('imagina'))}>
                        <Burbuja x={480} y={300} w={360} texto="Imagina si llegara." u={ac(t, M('imagina'), M('imagina') + 1.2)} c={c} id={ID} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · la narradora, la épica y el espacio mental */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const piensa = ac(t, M('propia'), M('propia') + 1);
                  const espacio = ac(t, M('espacio'), M('espacio') + 1.5);
                  return (
                    <g>
                      <Persona id={ID} x={180} y={760} cuerpo="#334155" corbata />
                      <Gesto x={180} y={760} animo={0.5} />
                      <Etiqueta x={180} y={820} texto="Denning" op={1} c={c} id={ID} />
                      <g opacity={ventana(t, M('narradora') - 0.3, M('propia'))}>
                        <Persona id={ID} x={1010} y={760} cuerpo="#be185d" pelo="#5b3a26" />
                        <Gesto x={1010} y={760} animo={-0.2} />
                        <Etiqueta x={1010} y={820} texto="narradora" op={1} c={c} id={ID} />
                        <g opacity={ventana(t, M('narradora') - 0.3, M('epica'))}><Burbuja x={990} y={560} w={420} texto="Eso no es una historia." u={ac(t, M('narradora'), M('narradora') + 1.3)} c={c} lado="der" id={ID} /></g>
                        <g opacity={ventana(t, M('sinTrama'), M('epica'))}>
                          <Chip x={560} y={250} texto="sin trama" c={c} id={ID} op={1} />
                          <Chip x={560} y={330} texto="sin personajes" c={c} id={ID} op={e1(t, M('sinTrama') + 0.8)} />
                        </g>
                        <g opacity={ventana(t, M('equivocaba'), M('epica'))}><Cruz x={1010} y={390} s={0.9} /></g>
                      </g>
                      {/* la versión épica, tachada */}
                      <g opacity={ventana(t, M('epica'), M('propia'))}>
                        <rect x={420} y={240} width={300} height={200} rx={16} fill="#fde68a" style={sombra(c.sombra)} />
                        <rect x={400} y={230} width={340} height={26} rx={13} fill="#d97706" /><rect x={400} y={424} width={340} height={26} rx={13} fill="#d97706" />
                        {[0, 1, 2].map((k) => <Estrella key={k} x={480 + k * 90} y={340} r={26} fill={ROSA} rot={t * 30} />)}
                        <g opacity={e1(t, M('epica') + 1)}><Cruz x={570} y={340} s={1.3} /></g>
                      </g>
                      {/* el público piensa en su propia organización */}
                      <g opacity={piensa}>
                        {[560, 720, 880].map((x, k) => <Espalda key={x} x={x} y={770} s={1.1} c={c} pelo={['#2b1a12', '#5b3a26', '#9ca3af'][k]} />)}
                        <circle cx={740} cy={640} r={10} fill={c.panel2} /><circle cx={760} cy={600} r={16} fill={c.panel2} />
                        <ellipse cx={760} cy={400} rx={200 + 60 * espacio} ry={130 + 30 * espacio} fill={c.panel2} />
                        <Oficina x={760} y={430} s={0.6 + 0.2 * piensa} c={c} id={ID} />
                        <Txt f="a" x={760} y={490} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>tu organización</Txt>
                        <Chip x={760} y={530} texto="espacio mental" c={c} id={ID} op={e1(t, M('espacio') + 0.4)} marca />
                      </g>
                      <g opacity={ventana(t, M('porQue'), M('espacio') + 0.4)}>
                        <Burbuja x={220} y={560} w={300} texto="¿Por qué no el Banco?" u={ac(t, M('porQue'), M('porQue') + 1.2)} c={c} id={ID} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · el análisis corta la niebla, pero no llega al corazón */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const corta = ac(t, M('niebla'), M('niebla') + 2);
                  const flecha = ac(t, M('corazon'), M('corazon') + 1);
                  return (
                    <g>
                      <g opacity={ventana(t, M('analisis'), M('numeros'))}>
                        {[[260, 300], [420, 360], [300, 460], [480, 480], [200, 400]].map(([x, y], k) => (
                          <Nube key={k} x={x + (k % 2 ? 1 : -1) * 120 * corta} y={y} s={1} op={0.9 - 0.7 * corta} c={c} />
                        ))}
                        <path d={`M 120 400 H ${120 + 520 * ac(t, M('analisis'), M('analisis') + 1.2)}`} stroke={NARANJA} strokeWidth={10} strokeLinecap="round" />
                        <Etiqueta x={350} y={590} texto="análisis" op={1} c={c} id={ID} marca />
                        {/* el corazón que no alcanza */}
                        <path d="M 920 470 C 830 410 830 330 880 324 C 904 321 916 338 920 350 C 924 338 936 321 960 324 C 1010 330 1010 410 920 470 Z" fill={ROSA} opacity={e1(t, M('corazon'))} />
                        <path d={`M 660 400 H ${660 + 140 * flecha}`} stroke={c.tenue} strokeWidth={8} strokeDasharray="12 10" opacity={flecha} />
                        <g opacity={e1(t, M('corazon') + 1)}><Cruz x={785} y={400} s={0.8} /></g>
                        <Etiqueta x={920} y={540} texto="corazón" op={e1(t, M('corazon'))} c={c} id={ID} />
                      </g>
                      {/* los números elaboran, la historia aprueba */}
                      <g opacity={e1(t, M('numeros'))}>
                        <Hoja x={380} y={460} w={260} h={300} c={c} cabeza={c.tenue} titulo="números" llena={1} tituloTam={26} gris />
                        <path d="M 540 460 H 640" stroke={c.apagado} strokeWidth={8} strokeLinecap="round" />
                      </g>
                      <g opacity={e1(t, M('historia'))}>
                        <g transform="translate(820 460)">
                          <path d="M -140 -100 Q -70 -130 0 -100 V 110 Q -70 80 -140 110 Z" fill={c.blanco} style={sombra(c.sombra)} />
                          <path d="M 140 -100 Q 70 -130 0 -100 V 110 Q 70 80 140 110 Z" fill={c.blanco} style={sombra(c.sombra)} />
                          <path d="M 0 -100 V 110" stroke={NARANJA} strokeWidth={6} />
                          {[0, 1, 2, 3].map((k) => <rect key={k} x={-116} y={-60 + k * 34} width={90} height={8} rx={4} fill={c.apagado} />)}
                          <path d="M 30 20 Q 60 -30 100 0 Q 120 30 80 50 Q 40 60 30 20 Z" fill={`url(#${ID}-marca)`} opacity={0.8} />
                        </g>
                        <Etiqueta x={820} y={630} texto="historia" op={1} c={c} id={ID} marca />
                        <g opacity={e1(t, M('historia') + 0.6)}><Visto x={950} y={340} s={1.1} /></g>
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

/* Edificio de oficinas pequeño (la organización propia). */
const Oficina: React.FC<{ x: number; y: number; s: number; c: C; id: string }> = ({ x, y, s, c, id }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-180} width={160} height={180} rx={10} fill={`url(#${id}-marca)`} />
    {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-56 + (k % 3) * 44} y={-160 + Math.floor(k / 3) * 50} width={24} height={30} rx={4} fill={c.blanco} opacity={0.85} />)}
  </g>
);
