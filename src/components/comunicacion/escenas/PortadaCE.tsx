import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Cruz, Etiqueta, Gesto, Institucion, Mesa, Ondas, PanelPregunta, Reloj, Rotulo, ESCUDO, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * Portada · «Quien vende bien entiende cómo lo escuchan». Acto A: el vendedor lanza palabras que caen
 * antes de llegar y presume un argumento brillante; luego el flujo se invierte: el cliente emite y el
 * vendedor escucha. Acto B: la reunión como conversación, con las tres estaciones del cliente
 * (interpreta, juzga, decide) y los tres canales que viajan (palabras, tono, gesto). Acto C: la
 * investigación y los cuatro mecanismos predecibles. Acto D: no manipular, no depender de la suerte.
 * Acto E: lo que crees transmitir (un círculo) llega deformado; dos círculos que casi no se tocan.
 */

const ID = 'ce1p';
const nombres = ['habla', 'brillante', 'escucha', 'aprender', 'reunion', 'interpreta', 'juzga', 'decide', 'palabras', 'harvard', 'predecibles', 'minutos', 'creible', 'preguntas', 'convence', 'manipular', 'suerte', 'incomodo', 'recibe', 'coinciden', 'pregunta'] as const;

/* Diamante que brilla: «el argumento más brillante». */
const Diamante: React.FC<{ x: number; y: number; s: number; t: number; id: string; op: number }> = ({ x, y, s, t, id, op }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    {Array.from({ length: 8 }, (_, k) => {
      const a = (k * Math.PI) / 4 + t * 0.5;
      const l = 70 + 12 * Math.sin(t * 4 + k);
      return <line key={k} x1={Math.cos(a) * 62} y1={Math.sin(a) * 62} x2={Math.cos(a) * l} y2={Math.sin(a) * l} stroke={NARANJA} strokeWidth={5} strokeLinecap="round" opacity={0.6} />;
    })}
    <path d="M -50 -14 L -26 -42 L 26 -42 L 50 -14 L 0 50 Z" fill={`url(#${id}-marca)`} />
    <path d="M -50 -14 L 50 -14 L 0 50 Z" fill="#000" opacity={0.15} />
    <path d="M -26 -42 L -12 -14 L 0 -42 L 12 -14 L 26 -42" fill="none" stroke="#fff" strokeWidth={3} opacity={0.6} />
  </g>
);

/* Dado con puntos. */
const Dado: React.FC<{ x: number; y: number; n: number; rot: number; c: Tono }> = ({ x, y, n, rot, c }) => {
  const P: Record<number, [number, number][]> = { 1: [[0, 0]], 2: [[-18, -18], [18, 18]], 3: [[-18, -18], [0, 0], [18, 18]], 4: [[-18, -18], [18, -18], [-18, 18], [18, 18]], 5: [[-18, -18], [18, -18], [0, 0], [-18, 18], [18, 18]], 6: [[-18, -20], [18, -20], [-18, 0], [18, 0], [-18, 20], [18, 20]] };
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-46} y={-46} width={92} height={92} rx={18} fill={c.panel} style={sombra(c.sombra, 6, 12)} />
      {P[n].map(([px, py], k) => <circle key={k} cx={px} cy={py} r={8} fill={c.texto} />)}
    </g>
  );
};

/* Marioneta: cruceta con hilos que mueven a una figura. */
const Marioneta: React.FC<{ x: number; y: number; t: number; id: string }> = ({ x, y, t, id }) => {
  const b = Math.sin(t * 2.4) * 10;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g transform={`rotate(${b * 0.6})`}>
        <rect x={-110} y={-210} width={220} height={16} rx={8} fill="#8a5a3c" />
        <rect x={-8} y={-250} width={16} height={90} rx={8} fill="#8a5a3c" />
      </g>
      {[-100, -40, 40, 100].map((hx, k) => <line key={k} x1={hx} y1={-200 + b * (hx / 100) * 0.6} x2={hx * 0.45} y2={-40 + (k % 2 ? b : -b)} stroke="#9ca3af" strokeWidth={2} />)}
      <Persona id={id} x={0} y={140} s={0.75} />
    </g>
  );
};

export const PortadaCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('coinciden') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;

  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Quien vende bien…'], [M('habla'), 'No es quien más habla'], [M('brillante'), 'Ni quien trae el mejor argumento'],
    [M('escucha'), 'Entiende cómo lo escuchan'], [M('aprender'), 'Y eso se aprende'], [M('reunion'), 'Cada reunión es una conversación'],
    [M('palabras'), 'Mucho más que palabras'], [M('harvard'), 'Lo que dice la investigación'], [M('predecibles'), 'Mecanismos predecibles'],
    [M('manipular'), 'No es manipular'], [M('suerte'), 'Es dejar de depender de la suerte'], [M('incomodo'), 'Un hecho incómodo'],
    [M('coinciden'), 'Casi nunca coinciden'],
  ];

  // Actos (cada uno libera el escenario antes de que entre el siguiente).
  const aA = ventana(t, -1, M('reunion'));
  const aB = ventana(t, M('reunion'), M('harvard'));
  const aC = ventana(t, M('harvard'), M('manipular'));
  const aD = ventana(t, M('manipular'), M('incomodo'));
  const aE = ac(t, M('incomodo'), M('incomodo') + 0.4);

  // Personas presentes en A, B y E: se quedan quietas entre actos para que la escena sea continua.
  const personas = Math.max(aA, aB, aE);
  const escucha = ac(t, M('escucha'), M('escucha') + 0.8);
  const inclina = escucha * (1 - aE) * -6;
  const animoCliente = lerp(-0.25 * ac(t, M('habla') + 1, M('habla') + 2.5), 0.7, escucha) * (1 - ac(t, M('reunion'), M('reunion') + 0.4)) + 0.4 * aB;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Quien vende bien entiende cómo lo escucha el cliente: las palabras caen, la escucha conecta, y lo que crees transmitir casi nunca coincide con lo que el otro recibe">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* Vendedor y cliente, presentes en los actos A, B y E */}
            {personas > 0.01 && (
              <g opacity={personas}>
                <g transform={`rotate(${inclina} 260 760)`}>
                  <Persona id={ID} x={260} y={760} s={0.95} />
                  <Gesto x={260} y={760} s={0.95} animo={0.3} />
                </g>
                <Persona id={ID} x={940} y={760} s={0.95} cuerpo="#64748b" corbata />
                <Gesto x={940} y={760} s={0.95} animo={animoCliente} />
              </g>
            )}

            {/* ACTO A · hablar más no llega; escuchar conecta */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {/* Palabras que salen del vendedor y caen antes de llegar */}
                {(() => {
                  const op = ventana(t, M('habla'), M('escucha') + 0.6);
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      {Array.from({ length: 7 }, (_, k) => {
                        const u = ((t - M('habla')) * 0.55 + k / 7) % 1;
                        if (t < M('habla')) return null;
                        const x = lerp(330, 760, Math.min(1, u * 1.3));
                        const y = 560 - Math.sin(Math.PI * Math.min(1, u * 1.3)) * 60 + Math.max(0, u - 0.7) * 600;
                        return (
                          <g key={k} transform={`translate(${x} ${y})`} opacity={Math.sin(Math.PI * u)}>
                            <rect x={-44} y={-22} width={88} height={44} rx={22} fill={c.panel} style={sombra(c.sombra, 3, 6)} />
                            <Txt f="a" x={0} y={9} textAnchor="middle" fontSize={26} fill={c.tenue}>bla</Txt>
                          </g>
                        );
                      })}
                    </g>
                  );
                })()}
                <Diamante x={330} y={300} s={1} t={t} id={ID} op={e1(t, M('brillante')) * (1 - 0.7 * escucha)} />
                <Etiqueta x={330} y={430} texto="argumento" op={e1(t, M('brillante') + 0.3) * (1 - 0.7 * escucha)} c={c} id={ID} />
                {/* La escucha: ondas del cliente al vendedor */}
                <Ondas x1={860} y1={600} x2={360} y2={600} t={t} color={NARANJA} op={escucha} />
                {escucha > 0.01 && (
                  <g opacity={escucha} transform="translate(940 270)">
                    <path d="M -18 -40 Q 30 -60 34 -6 Q 36 26 6 40 Q -6 46 -4 30 Q 2 18 12 10 Q 22 -8 4 -16 Q -10 -20 -14 -6" fill="none" stroke={`url(#${ID}-marca)`} strokeWidth={10} strokeLinecap="round" />
                    <Etiqueta x={0} y={110} texto="escucha" op={1} c={c} id={ID} marca />
                  </g>
                )}
                {(() => {
                  const op = e1(t, M('aprender'));
                  return op > 0.01 ? (
                    <g opacity={op} transform={`translate(600 ${200 + (1 - op) * 20})`}>
                      <rect x={-150} y={-40} width={300} height={80} rx={40} fill={`url(#${ID}-marca)`} style={sombra(c.sombra, 4, 10)} />
                      <Txt f="a" x={0} y={15} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">se aprende</Txt>
                    </g>
                  ) : null;
                })()}
              </g>
            )}

            {/* ACTO B · la reunión: lo que hace el cliente y los canales que viajan */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Mesa x={600} y={650} w={380} c={c} />
                {([['interpreta', 'interpreta', 330], ['juzga', 'juzga', 600], ['decide', 'decide', 870]] as const).map(([n, txt, x]) => {
                  const op = e1(t, M(n));
                  const activo = ventana(t, M(n), n === 'decide' ? M('palabras') : M(nombres[nombres.indexOf(n) + 1]));
                  if (op < 0.01) return null;
                  return (
                    <g key={n} opacity={op} transform={`translate(${x} 250) scale(${0.9 + 0.1 * op + 0.06 * activo})`}>
                      <circle r={74} fill={activo > 0.5 ? `url(#${ID}-marca)` : c.panel} style={sombra(c.sombra, 6, 14)} />
                      {n === 'interpreta' && <g stroke={activo > 0.5 ? '#fff' : NARANJA} strokeWidth={7} fill="none"><path d="M -44 0 Q 0 -40 44 0 Q 0 40 -44 0 Z" /><circle r={14} fill={activo > 0.5 ? '#fff' : NARANJA} /></g>}
                      {n === 'juzga' && <g stroke={activo > 0.5 ? '#fff' : NARANJA} strokeWidth={7} fill="none" strokeLinecap="round"><path d="M 0 -40 V 36 M -40 36 H 40" /><path d={`M -46 ${-22 + 8 * Math.sin(t * 2)} L 46 ${-22 - 8 * Math.sin(t * 2)}`} /><path d={`M -46 ${-22 + 8 * Math.sin(t * 2)} l -12 26 h 24 z M 46 ${-22 - 8 * Math.sin(t * 2)} l -12 26 h 24 z`} /></g>}
                      {n === 'decide' && <path d="M -30 2 L -8 26 L 34 -24" stroke={activo > 0.5 ? '#fff' : VERDE} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                      <Txt f="a" x={0} y={128} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                    </g>
                  );
                })}
                {/* Tres canales: palabra, tono y gesto, que viajan del vendedor al cliente */}
                {(() => {
                  const op = ac(t, M('palabras'), M('palabras') + 0.5);
                  if (op < 0.01) return null;
                  const canal = (k: number, alto: number) => {
                    const u = ((t - M('palabras')) * 0.45 + k * 0.33) % 1;
                    return { x: lerp(340, 860, u), y: 560 - alto * Math.sin(Math.PI * u), o: Math.sin(Math.PI * u) };
                  };
                  const a = canal(0, 30), b = canal(1, 70), g = canal(2, 110);
                  return (
                    <g opacity={op}>
                      <g transform={`translate(${a.x} ${a.y})`} opacity={a.o}><rect x={-46} y={-22} width={92} height={44} rx={22} fill={c.panel} style={sombra(c.sombra, 3, 6)} /><Txt f="a" x={0} y={9} textAnchor="middle" fontSize={24} fill={c.texto}>palabra</Txt></g>
                      <g transform={`translate(${b.x} ${b.y})`} opacity={b.o}><path d="M -40 0 Q -30 -24 -20 0 T 0 0 T 20 0 T 40 0" stroke={ROSA} strokeWidth={7} fill="none" strokeLinecap="round" /></g>
                      <g transform={`translate(${g.x} ${g.y})`} opacity={g.o}><path d="M -14 26 V -10 Q -14 -20 -6 -20 Q 2 -20 2 -10 V -30 Q 2 -40 10 -40 Q 18 -40 18 -30 V 0 L 26 -10 Q 34 -16 38 -8 L 22 26 Z" fill={NARANJA} /></g>
                      <Etiqueta x={600} y={812} texto="palabras · tono · gesto" op={e1(t, M('palabras') + 0.6)} c={c} id={ID} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · investigación y cuatro mecanismos predecibles */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <g opacity={ventana(t, M('harvard'), M('minutos'))}>
                  <Institucion x={600} y={560} s={1.5} c={c} id={ID} escudo />
                  <Etiqueta x={600} y={660} texto="investigación" op={e1(t, M('harvard') + 0.4)} c={c} id={ID} />
                </g>
                {([['minutos', 'primeros minutos', 420, 330], ['creible', 'credibilidad', 780, 330], ['preguntas', 'preguntas', 420, 590], ['convence', 'convence o se hunde', 780, 590]] as const).map(([n, txt, x, y]) => {
                  const op = e1(t, M(n));
                  if (op < 0.01) return null;
                  return (
                    <g key={n} opacity={op} transform={`translate(${x} ${y + (1 - op) * 24})`}>
                      <rect x={-170} y={-108} width={340} height={216} rx={30} fill={c.panel} style={sombra(c.sombra)} />
                      {n === 'minutos' && <Reloj x={0} y={-24} s={1.05} c={c} progreso={(t - M(n)) * 0.25} />}
                      {n === 'creible' && <path transform="translate(0 -26) scale(1.3)" d={ESCUDO} fill={`url(#${ID}-marca)`} />}
                      {n === 'preguntas' && <Txt x={0} y={4} textAnchor="middle" fontSize={110} fill={NARANJA} peso={800}>?</Txt>}
                      {n === 'convence' && <g transform="translate(0 -26)"><path d={`M -40 ${30 - 10 * Math.sin(t * 2)} L -40 -30 L -60 -10 M -40 -30 L -20 -10`} stroke={VERDE} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d={`M 40 ${-30 + 10 * Math.sin(t * 2)} L 40 30 L 20 10 M 40 30 L 60 10`} stroke={ROSA} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}
                      <Txt f="a" x={0} y={82} textAnchor="middle" fontSize={MIN_TXT * 0.8} fill={c.texto}>{txt}</Txt>
                    </g>
                  );
                })}
              </g>
            )}

            {/* ACTO D · no es manipular; es dejar de depender de la suerte */}
            {aD > 0.01 && (
              <g opacity={aD}>
                <g opacity={e1(t, M('manipular'))}>
                  <Marioneta x={380} y={450} t={t} id={ID} />
                  <g transform={`translate(380 300) scale(${2.4 * e1(t, M('manipular') + 0.8)})`}><Cruz x={0} y={0} /></g>
                  <Etiqueta x={380} y={720} texto="manipular" op={e1(t, M('manipular') + 0.3)} c={c} id={ID} />
                </g>
                {(() => {
                  const op = e1(t, M('suerte'));
                  if (op < 0.01) return null;
                  const giro = Math.max(0, 1 - (t - M('suerte')) / 1.6);
                  const caras = (k: number) => 1 + (Math.floor((t - M('suerte')) * 8 + k * 3) % 6);
                  const apaga = ac(t, M('suerte') + 1.8, M('suerte') + 2.6);
                  return (
                    <g opacity={op * (1 - 0.65 * apaga)}>
                      <Dado x={760} y={430 - giro * 60} n={giro > 0 ? caras(0) : 5} rot={giro * 400} c={c} />
                      <Dado x={890} y={460 - giro * 40} n={giro > 0 ? caras(1) : 2} rot={-giro * 300 + 12} c={c} />
                      <Etiqueta x={825} y={600} texto="la suerte" op={1} c={c} id={ID} />
                      <line x1={680} y1={585} x2={970} y2={585} stroke={ROSA} strokeWidth={8} strokeLinecap="round" opacity={apaga} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO E · lo que crees transmitir y lo que el otro recibe */}
            {aE > 0.01 && (
              <g opacity={aE}>
                {(() => {
                  const viaje = ac(t, M('incomodo') + 0.4, M('recibe'));
                  const forma = ac(t, M('recibe') - 0.6, M('recibe') + 0.4);
                  const x = lerp(360, 820, viaje);
                  const r = 70;
                  const pts = Array.from({ length: 24 }, (_, k) => {
                    const a = (k / 24) * Math.PI * 2;
                    const d = r * (1 + forma * (0.28 * Math.sin(a * 3 + 1) + 0.18 * Math.sin(a * 5)));
                    return `${Math.cos(a) * d},${Math.sin(a) * d}`;
                  }).join(' ');
                  const sep = ac(t, M('coinciden') - 0.1, M('coinciden') + 0.3);
                  return (
                    <g opacity={1 - sep}>
                      <g transform={`translate(${x} ${430 - Math.sin(Math.PI * viaje) * 90})`}>
                        <polygon points={pts} fill={forma > 0.5 ? c.tenue : `url(#${ID}-marca)`} style={sombra(c.sombra, 6, 12)} />
                      </g>
                      <Etiqueta x={360} y={300} texto="lo que crees" op={e1(t, M('incomodo') + 0.2) * (1 - viaje * 0.6)} c={c} id={ID} marca />
                      <Etiqueta x={840} y={300} texto="lo que recibe" op={e1(t, M('recibe'))} c={c} id={ID} />
                    </g>
                  );
                })()}
                {(() => {
                  const op = e1(t, M('coinciden') + 0.3);
                  if (op < 0.01) return null;
                  const d = lerp(0, 150, ac(t, M('coinciden') + 0.3, M('coinciden') + 1.5));
                  return (
                    <g opacity={op}>
                      <circle cx={600 - d} cy={420} r={150} fill={NARANJA} opacity={0.55} />
                      <circle cx={600 + d} cy={420} r={150} fill="#64748b" opacity={0.55} />
                      <Txt f="a" x={600 - d - 40} y={430} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">crees</Txt>
                      <Txt f="a" x={600 + d + 40} y={430} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">recibe</Txt>
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
