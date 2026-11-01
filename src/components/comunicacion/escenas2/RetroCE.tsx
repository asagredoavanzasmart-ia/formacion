import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Brazos, Burbuja, Chip, Cruz, Etiqueta, Gesto, Hoja, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { BarraV } from '../escenas/comunPersuasion';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Recibir retroalimentación» (Heen y Stone), escena propia. Acto A: cuatro barras de por qué no funciona:
 * 36 % de evaluaciones a tiempo, 55 % que se sienten injustas, uno de cada cuatro con temor y 63 % de
 * directivos de personas que ven el problema en los gerentes. Acto B: el otro lado: el foco está en quien
 * da la crítica, pero quien la recibe tiene la puerta; levanta la mano para pedirla; dos necesidades tiran
 * en sentidos opuestos: crecer y ser aceptado. Acto C: los tres detonantes: la verdad (una hoja tachada),
 * la relación («¿y tú me lo dices?») y la identidad (un espejo que se agrieta).
 */

const ID = 'ce2q';
const nombres = ['noFunciona', 'p36', 'p55', 'injusta', 'cuatro', 'p63', 'dificiles', 'heen', 'veinte', 'otroLado', 'recibe', 'cambia', 'pedirla', 'crecer', 'aceptado', 'tres', 'verdad', 'equivocada', 'relacion', 'yTu', 'todo', 'identidad', 'quien', 'pregunta'] as const;

export const RetroCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('quien') + 1 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'La retroalimentación'], [M('noFunciona'), 'No funciona'], [M('heen'), 'Heen y Stone'], [M('otroLado'), 'Mirar al otro lado'],
    [M('pedirla'), 'Aprender a pedirla'], [M('crecer'), 'Dos necesidades'], [M('tres'), 'Tres detonantes'], [M('verdad'), 'La verdad'],
    [M('relacion'), 'La relación'], [M('identidad'), 'La identidad'],
  ];

  const aA = ventana(t, -1, M('heen'));
  const aB = ventana(t, M('heen'), M('tres'));
  const aC = ac(t, M('tres'), M('tres') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Quien recibe la retroalimentación decide si la deja entrar; tres detonantes lo impiden">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · por qué no funciona */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <BarraV x={270} base={660} alto={36 * 4.6} valor="36 %" etiqueta="a tiempo" u={ac(t, M('p36'), M('p36') + 1)} c={c} id={ID} />
                <BarraV x={490} base={660} alto={55 * 4.6} valor="55 %" etiqueta="injusta" u={ac(t, M('p55'), M('p55') + 1)} c={c} id={ID} marca={t > M('injusta')} />
                <BarraV x={710} base={660} alto={25 * 4.6} valor="1 de 4" etiqueta="temor" u={ac(t, M('cuatro'), M('cuatro') + 1)} c={c} id={ID} />
                <BarraV x={930} base={660} alto={63 * 4.6} valor="63 %" etiqueta="RR. HH." u={ac(t, M('p63'), M('p63') + 1)} c={c} id={ID} marca={t > M('dificiles')} />
                <Chip x={600} y={780} texto="conversaciones difíciles" c={c} id={ID} op={e1(t, M('dificiles'))} />
              </g>
            )}

            {/* B · el otro lado: quien recibe */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const puerta = ac(t, M('recibe'), M('cambia') + 1);
                  const pide = ac(t, M('pedirla'), M('pedirla') + 0.6);
                  const tira = Math.sin(t * 2.5) * 20;
                  return (
                    <g>
                      <Chip x={600} y={250} texto="Heen y Stone · 20 años" c={c} id={ID} op={ventana(t, M('heen'), M('otroLado'))} />
                      <Persona id={ID} x={230} y={760} cuerpo="#334155" corbata />
                      <Gesto x={230} y={760} animo={0.3} />
                      <Etiqueta x={230} y={820} texto="quien la da" op={1} c={c} id={ID} />
                      {/* el foco sobre quien da */}
                      <path d="M 230 220 L 120 760 H 340 Z" fill="#fde68a" opacity={0.25 * (1 - ac(t, M('otroLado'), M('otroLado') + 1))} />
                      <path d="M 970 220 L 860 760 H 1080 Z" fill="#fde68a" opacity={0.25 * ac(t, M('otroLado'), M('otroLado') + 1)} />
                      {pide > 0.01 && <Brazos x={970} y={760} izq={10} der={10 + 150 * pide} id={ID} color="#0f766e" />}
                      <Persona id={ID} x={970} y={760} cuerpo="#0f766e" />
                      <Gesto x={970} y={760} animo={0.3} />
                      <Etiqueta x={970} y={820} texto="quien la recibe" op={1} c={c} id={ID} marca />
                      {/* la crítica que llega a una puerta */}
                      <g opacity={ventana(t, M('otroLado'), M('crecer'))}>
                        <rect x={760} y={480} width={24} height={260} rx={6} fill="#a16207" />
                        <g transform={`translate(784 480) scale(${1 - 0.8 * puerta} 1)`}><rect x={0} y={0} width={90} height={260} rx={6} fill="#d6a76c" /></g>
                        {[0, 1, 2].map((k) => {
                          const u = ((t * 0.5) + k / 3) % 1;
                          return <rect key={k} x={300 + 420 * u} y={560} width={40} height={30} rx={6} fill={NARANJA} opacity={Math.sin(Math.PI * u)} />;
                        })}
                        <Etiqueta x={600} y={460} texto="¿la deja entrar?" op={ventana(t, M('recibe'), M('pedirla'))} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('pedirla'), M('crecer'))}>
                        <Burbuja x={950} y={500} w={420} texto="¿Qué puedo mejorar?" u={ac(t, M('pedirla'), M('pedirla') + 1)} c={c} lado="der" id={ID} marca />
                      </g>
                      {/* dos necesidades que tiran */}
                      <g opacity={e1(t, M('crecer'))}>
                        <path d={`M 360 480 H ${840}`} stroke="#a16207" strokeWidth={10} transform={`translate(${tira} 0)`} />
                        <g transform={`translate(${330 + tira} 470)`}>
                          <rect x={-8} y={-10} width={16} height={60} fill="#15803d" />
                          <ellipse cx={-22} cy={-12} rx={24} ry={12} fill="#22c55e" /><ellipse cx={22} cy={-26} rx={24} ry={12} fill="#16a34a" />
                        </g>
                        <Etiqueta x={330} y={400} texto="aprender y crecer" op={1} c={c} id={ID} />
                        <g opacity={e1(t, M('aceptado'))}>
                          <g transform={`translate(${870 + tira} 470) scale(1.6)`}><path d="M 0 30 C -40 4 -40 -28 -18 -30 C -8 -31 -2 -24 0 -18 C 2 -24 8 -31 18 -30 C 40 -28 40 4 0 30 Z" fill={ROSA} /></g>
                          <Etiqueta x={870} y={400} texto="ser aceptado" op={1} c={c} id={ID} />
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · los tres detonantes */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const grieta = ac(t, M('quien') - 1, M('quien') + 0.5);
                  return (
                    <g>
                      {/* la verdad */}
                      <g opacity={e1(t, M('verdad'))}>
                        <Hoja x={230} y={460} w={190} h={220} c={c} cabeza={c.tenue} titulo="" llena={1} gris />
                        <g opacity={e1(t, M('equivocada'))}><Cruz x={300} y={380} s={0.9} /></g>
                        <Etiqueta x={230} y={640} texto="la verdad" op={1} c={c} id={ID} marca />
                        <Txt f="a" x={230} y={690} textAnchor="middle" fontSize={24} fill={c.tenue}>el contenido</Txt>
                      </g>
                      {/* la relación */}
                      <g opacity={e1(t, M('relacion'))}>
                        <Persona id={ID} x={540} y={540} s={0.7} cuerpo="#334155" />
                        <Persona id={ID} x={680} y={540} s={0.7} cuerpo="#0f766e" />
                        <Gesto x={680} y={540} s={0.7} animo={-0.6} />
                        <Etiqueta x={610} y={640} texto="la relación" op={1} c={c} id={ID} marca />
                        <Txt f="a" x={610} y={690} textAnchor="middle" fontSize={24} fill={c.tenue}>quién lo dice</Txt>
                        <g opacity={ventana(t, M('yTu') - 0.3, M('identidad'))}>
                          <Burbuja x={700} y={400} w={360} texto="¿Y tú me lo dices?" u={ac(t, M('yTu') - 0.3, M('yTu') + 0.8)} c={c} id={ID} />
                        </g>
                      </g>
                      {/* la identidad: un espejo que se agrieta */}
                      <g opacity={e1(t, M('identidad'))}>
                        <ellipse cx={980} cy={450} rx={100} ry={130} fill="#a16207" />
                        <ellipse cx={980} cy={450} rx={86} ry={116} fill="#dbeafe" />
                        <circle cx={980} cy={430} r={34} fill="#e2a37c" />
                        <path d={`M 940 360 L 975 ${420 + 40 * grieta} L 955 ${470 + 60 * grieta} M 975 ${420 + 40 * grieta} L ${1010 + 20 * grieta} ${490 + 40 * grieta}`} stroke={c.texto} strokeWidth={4} fill="none" opacity={grieta} />
                        <Etiqueta x={980} y={640} texto="la identidad" op={1} c={c} id={ID} marca />
                        <Txt f="a" x={980} y={690} textAnchor="middle" fontSize={24} fill={c.tenue}>quién crees ser</Txt>
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
