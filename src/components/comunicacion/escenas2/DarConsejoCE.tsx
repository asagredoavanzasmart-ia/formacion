import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Copa, Estrella, Etiqueta, Gesto, MesaRestaurante, Ondas, PanelPregunta, Plato, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Aconsejar como instructor» (Garvin y Margolis), escena propia. Acto A: un espacio privado y sin
 * distracciones, preguntas amplias y el auto del instructor de manejo que suelta el volante. Acto B: el
 * gerente que quiere juntar marketing con ingeniería; el director de operaciones le ofrece alternativas;
 * el abogado del diablo y una segunda opinión: dos bastan. Acto C: los debates eternos entre veteranos y
 * recién llegados se ordenan al combinar tres consejos alrededor del cliente. Acto D: el almuerzo de
 * William Lee: la conversación más difícil y, años después, la mejor; aconsejar es una conversación
 * continua.
 */

const ID = 'ce2u';
const nombres = ['privado', 'juzgar', 'amplias', 'sientes', 'instructor', 'solo', 'alternativas', 'gerente', 'ingenieria', 'operaciones', 'pequenas', 'clientes', 'diablo', 'segunda', 'dos', 'combinar', 'eternos', 'tresConsejos', 'lee', 'socio', 'entorno', 'mejor', 'continua', 'pregunta'] as const;

export const DarConsejoCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('continua') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Un espacio privado'], [M('amplias'), 'Preguntas amplias'], [M('instructor'), 'Instructor de manejo'], [M('alternativas'), 'Varias alternativas'],
    [M('operaciones'), 'Opciones, no órdenes'], [M('diablo'), 'Abogado del diablo'], [M('dos'), 'Dos opiniones bastan'], [M('combinar'), 'Combinar consejos'],
    [M('lee'), 'William Lee'], [M('mejor'), 'La mejor conversación'], [M('continua'), 'Una conversación continua'],
  ];

  const aA = ventana(t, -1, M('alternativas'));
  const aB = ventana(t, M('alternativas'), M('combinar'));
  const aC = ventana(t, M('combinar'), M('lee'));
  const aD = ac(t, M('lee'), M('lee') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="El buen consejero guía como un instructor de manejo para que el otro conduzca solo">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · el espacio privado y el instructor de manejo */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const auto = ac(t, M('instructor') - 0.3, M('instructor') + 0.4);
                  const suelta = ac(t, M('solo'), M('solo') + 1);
                  return (
                    <g>
                      <g opacity={1 - auto}>
                        <rect x={140} y={240} width={920} height={560} rx={24} fill={c.panel2} opacity={0.6} />
                        <rect x={980} y={480} width={60} height={320} rx={6} fill="#a16207" />
                        <Persona id={ID} x={360} y={760} cuerpo="#334155" corbata />
                        <Gesto x={360} y={760} animo={0.5} />
                        <Etiqueta x={360} y={820} texto="consejero" op={1} c={c} id={ID} />
                        <Persona id={ID} x={760} y={760} cuerpo="#0f766e" />
                        <Gesto x={760} y={760} animo={0.2 + 0.3 * e1(t, M('sientes'))} />
                        <Ondas x1={720} y1={600} x2={420} y2={600} t={t} color={NARANJA} n={3} op={e1(t, M('juzgar'))} />
                        <Chip x={600} y={320} texto="sin juzgar" c={c} id={ID} op={ventana(t, M('juzgar'), M('amplias'))} />
                        <g opacity={e1(t, M('sientes') - 0.6)}>
                          <Burbuja x={390} y={560} w={440} texto="¿Cómo te sientes con esto?" u={ac(t, M('sientes') - 0.6, M('sientes') + 0.8)} c={c} id={ID} marca />
                        </g>
                      </g>
                      <g opacity={auto}>
                        <g transform={`translate(${600 + 140 * suelta * Math.sin(t)} 560)`}>
                          <ellipse cx={0} cy={110} rx={300} ry={18} fill="#000" opacity={0.12} />
                          <path d="M -280 60 Q -280 10 -220 4 L -150 0 Q -100 -90 0 -90 Q 110 -90 150 0 L 230 6 Q 280 14 280 60 V 90 H -280 Z" fill={`url(#${ID}-marca)`} />
                          <path d="M -120 -6 Q -80 -72 -10 -72 V -6 Z M 10 -72 Q 90 -72 120 -6 H 10 Z" fill="#bfdbfe" />
                          <Persona id={ID} x={-60} y={30} s={0.45} cuerpo="#0f766e" />
                          <Persona id={ID} x={60} y={30} s={0.45} cuerpo="#334155" corbata />
                          <circle cx={-34} cy={-10} r={16} fill="none" stroke="#1f2937" strokeWidth={5} />
                          <path d={`M 50 -18 L ${30 - 30 * (1 - suelta)} ${-12 + 6 * suelta}`} stroke="#e2a37c" strokeWidth={6} strokeLinecap="round" />
                          {[-170, 170].map((x) => <circle key={x} cx={x} cy={90} r={36} fill="#1f2937" />)}
                        </g>
                        <Chip x={600} y={300} texto="que conduzca solo" c={c} id={ID} op={e1(t, M('solo'))} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · alternativas, abogado del diablo, segunda opinión */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const junta = ac(t, M('ingenieria'), M('ingenieria') + 1.5);
                  const diablo = ac(t, M('diablo') - 0.3, M('diablo') + 0.4);
                  return (
                    <g>
                      <g opacity={1 - diablo}>
                        <Persona id={ID} x={200} y={760} cuerpo="#334155" corbata />
                        <Gesto x={200} y={760} animo={0.5} />
                        <Etiqueta x={200} y={820} texto="gerente" op={e1(t, M('gerente'))} c={c} id={ID} />
                        <g opacity={e1(t, M('gerente'))}>
                          <rect x={420 + 120 * junta} y={300} width={200} height={110} rx={14} fill={ROSA} opacity={0.85} />
                          <Txt f="a" x={520 + 120 * junta} y={364} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">marketing</Txt>
                          <rect x={900} y={300} width={200} height={110} rx={14} fill="#1e3a8a" opacity={0.85} />
                          <Txt f="a" x={1000} y={364} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">ingeniería</Txt>
                        </g>
                        <g opacity={e1(t, M('operaciones'))}>
                          <Persona id={ID} x={1000} y={760} cuerpo="#1f2937" pelo="#9ca3af" corbata />
                          <Gesto x={1000} y={760} animo={0.5} />
                          <Etiqueta x={1000} y={820} texto="operaciones" op={1} c={c} id={ID} />
                        </g>
                        <Chip x={600} y={500} texto="reuniones pequeñas" c={c} id={ID} op={e1(t, M('pequenas'))} />
                        <Chip x={600} y={590} texto="grandes clientes" c={c} id={ID} op={e1(t, M('clientes'))} />
                      </g>
                      <g opacity={diablo}>
                        <Persona id={ID} x={220} y={760} cuerpo="#334155" corbata />
                        <Gesto x={220} y={760} animo={0.3} />
                        <Persona id={ID} x={600} y={760} cuerpo="#b91c1c" />
                        <Gesto x={600} y={760} animo={-0.3} />
                        <Etiqueta x={600} y={820} texto="abogado del diablo" op={1} c={c} id={ID} />
                        <Burbuja x={620} y={560} w={300} texto="¿Y si no?" u={1} c={c} id={ID} />
                        <g opacity={e1(t, M('segunda'))}>
                          <Persona id={ID} x={980} y={760} cuerpo="#0f766e" />
                          <Gesto x={980} y={760} animo={0.4} />
                          <Etiqueta x={980} y={820} texto="segunda opinión" op={1} c={c} id={ID} />
                        </g>
                        <Chip x={600} y={300} texto="dos bastan" c={c} id={ID} op={e1(t, M('dos'))} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · combinar tres consejos */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const orden = ac(t, M('tresConsejos'), M('tresConsejos') + 2);
                  return (
                    <g>
                      {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={200 + k * 90} y={760} s={0.75} cuerpo="#475569" pelo="#9ca3af" />)}
                      {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={820 + k * 90} y={760} s={0.75} cuerpo="#0f766e" />)}
                      <Etiqueta x={290} y={820} texto="veteranos" op={1} c={c} id={ID} />
                      <Etiqueta x={910} y={820} texto="recién llegados" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('eternos')) * (1 - orden)}>
                        <path d="M 440 560 l 40 -40 l -10 40 l 40 -40" stroke="#f59e0b" strokeWidth={8} fill="none" />
                        <path d="M 700 560 l 40 -40 l -10 40 l 40 -40" stroke="#f59e0b" strokeWidth={8} fill="none" />
                        <Chip x={600} y={330} texto="debates eternos" c={c} id={ID} op={1 - e1(t, M('tresConsejos') - 0.4)} />
                      </g>
                      <g opacity={e1(t, M('tresConsejos'))}>
                        {[0, 1, 2].map((k) => {
                          const a = (k / 3) * Math.PI * 2 - Math.PI / 2;
                          const r = 170 - 70 * orden;
                          return <rect key={k} x={600 + Math.cos(a) * r - 50} y={480 + Math.sin(a) * r - 35} width={100} height={70} rx={12} fill={[NARANJA, ROSA, '#7c3aed'][k]} opacity={0.85} />;
                        })}
                        <g opacity={orden}>
                          <circle cx={600} cy={480} r={34} fill={c.panel} style={sombra(c.sombra)} />
                          <Txt f="a" x={600} y={490} textAnchor="middle" fontSize={26} fill={c.texto}>cliente</Txt>
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · el almuerzo de William Lee */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const anos = ac(t, M('mejor') - 1, M('mejor'));
                  return (
                    <g>
                      <g opacity={1 - ac(t, M('continua'), M('continua') + 0.6)}>
                        <Persona id={ID} x={380} y={660} cuerpo="#1f2937" pelo="#9ca3af" corbata />
                        <Gesto x={380} y={660} animo={0.2} />
                        <Persona id={ID} x={820} y={660} cuerpo={anos > 0.5 ? '#7c3aed' : '#475569'} />
                        <Gesto x={820} y={660} animo={-0.3 + 1.1 * anos} />
                        <MesaRestaurante x0={260} x1={920} y={640} c={c} />
                        <Plato x={420} y={620} c={c} comida="pasta" s={0.8} />
                        <Plato x={800} y={620} c={c} comida="carne" s={0.8} />
                        <Copa x={610} y={612} c={c} />
                        <Etiqueta x={380} y={850} texto="William Lee" op={1} c={c} id={ID} />
                        <g opacity={ventana(t, M('socio') - 0.5, M('mejor') - 0.5)}>
                          <Burbuja x={400} y={440} w={520} texto="No llegarás a socio, pero triunfarás en otro lugar." u={ac(t, M('socio') - 0.5, M('entorno') + 0.8)} c={c} id={ID} />
                        </g>
                        <g opacity={e1(t, M('mejor') - 0.5)}>
                          <Estrella x={900} y={300} r={30} fill="#fbbf24" rot={t * 30} />
                          <Burbuja x={800} y={440} w={520} texto="Fue la mejor conversación de mi vida." u={ac(t, M('mejor') - 0.5, M('mejor') + 1.2)} c={c} lado="der" id={ID} marca />
                        </g>
                      </g>
                      <g opacity={e1(t, M('continua'))} transform={`rotate(${t * 30} 600 480)`}>
                        <circle cx={600} cy={480} r={150} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={12} strokeDasharray="220 30" />
                      </g>
                      <g opacity={e1(t, M('continua'))}>
                        <Txt f="a" x={600} y={470} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>entender</Txt>
                        <Txt f="a" x={600} y={510} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>y buscar caminos</Txt>
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
