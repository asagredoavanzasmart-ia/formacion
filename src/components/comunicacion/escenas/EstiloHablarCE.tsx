import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Etiqueta, Gesto, Medidor, Mesa, Ondas, PanelPregunta, Rotulo, Visto, Cruz, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «El estilo al hablar» (Tannen), escena propia. Acto A: la reunión de ascensos; los gerentes dicen que
 * ninguna mujer tiene seguridad, las fichas se apagan y el director duda. Acto B: Tannen; la confianza se
 * infiere del habla (ondas que mueven un medidor); el director que decide en 5 minutos lo que otros
 * trabajaron 5 meses. Acto C: el estilo lingüístico como una consola de mezcla con perillas (directo,
 * pausas, palabras, bromas, disculpas) que son señales aprendidas. Acto D: Bob y Joe en una línea de
 * turnos donde Joe llena la pausa que Bob espera; Sally se muda de Texas a Washington y pasa de segura
 * a tímida porque nunca encuentra su turno.
 */

const ID = 'ce1e';
const nombres = ['reunion', 'mujeres', 'oidos', 'tannen', 'inferir', 'minutos', 'meses', 'seguro', 'suena', 'estilo', 'directo', 'pausas', 'palabras', 'bromas', 'senales', 'minimas', 'bob', 'joe', 'llena', 'avasallador', 'aportar', 'sally', 'texas', 'nunca', 'timida', 'pregunta'] as const;

export const EstiloHablarCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('timida') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'El estilo al hablar'], [M('reunion'), 'Una reunión de ascensos'], [M('mujeres'), '«Les falta seguridad»'], [M('oidos'), '¿A todas?'],
    [M('tannen'), 'Deborah Tannen'], [M('inferir'), 'La seguridad se infiere'], [M('minutos'), '5 minutos para decidir'], [M('seguro'), '¿Parece seguro?'],
    [M('estilo'), 'Estilo lingüístico'], [M('senales'), 'Señales aprendidas'], [M('minimas'), 'Diferencias mínimas'], [M('bob'), 'Bob y Joe'],
    [M('avasallador'), 'Dos lecturas erradas'], [M('sally'), 'Sally'], [M('timida'), 'De segura a tímida'],
  ];

  const aA = ventana(t, -1, M('tannen'));
  const aB1 = ventana(t, M('tannen'), M('minutos'));
  const aB2 = ventana(t, M('minutos'), M('estilo'));
  const aC = ventana(t, M('estilo'), M('bob'));
  const aD1 = ventana(t, M('bob'), M('sally'));
  const aD2 = ac(t, M('sally'), M('sally') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La seguridad se infiere de cómo hablas: pausas, palabras y rodeos son señales aprendidas que otros leen a su manera">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · la reunión de ascensos */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const duda = ac(t, M('oidos'), M('oidos') + 0.6);
                  const apaga = ac(t, M('mujeres') + 0.6, M('mujeres') + 2.4) * (1 - duda);
                  const e0 = e1(t, M('reunion'));
                  return (
                    <g opacity={e0}>
                      <Persona id={ID} x={380} y={590} s={0.95} cuerpo="#64748b" />
                      <Persona id={ID} x={820} y={590} s={0.95} cuerpo="#475569" pelo="#5b3a26" />
                      <Persona id={ID} x={600} y={580} s={1} corbata />
                      <Gesto x={600} y={580} animo={0.2 - 0.9 * duda} />
                      <Mesa x={580} y={610} w={640} c={c} />
                      {/* «?» del director que duda */}
                      <g opacity={duda} transform={`translate(668 ${410 - 6 * Math.sin(t * 3)})`}>
                        <circle r={34} fill={`url(#${ID}-marca)`} style={sombra(c.sombra, 3, 8)} />
                        <Txt x={0} y={15} textAnchor="middle" fontSize={44} fill="#fff" peso={800}>?</Txt>
                      </g>
                      {/* los gerentes, uno tras otro */}
                      <g opacity={ventana(t, M('mujeres'), M('oidos'))}>
                        <Burbuja x={380} y={400} w={300} texto="Ninguna tiene seguridad" u={ac(t, M('mujeres'), M('mujeres') + 1.2)} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('mujeres') + 1.2, M('oidos'))}>
                        <Burbuja x={820} y={400} w={300} texto="En mi grupo, tampoco" u={ac(t, M('mujeres') + 1.2, M('mujeres') + 2.4)} c={c} id={ID} />
                      </g>
                      {/* las mujeres de cada grupo */}
                      {[330, 470, 730, 870].map((x, k) => {
                        const op = e1(t, M('mujeres') + 0.2 + k * 0.25);
                        if (op < 0.01) return null;
                        return (
                          <g key={x} opacity={op}>
                            <rect x={x - 55} y={722} width={110} height={110} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                            <g opacity={1 - 0.7 * apaga}>
                              <Persona id={ID} x={x} y={818} s={0.5} pelo={['#5b3a26', '#2b1a12', '#8a5a2b', '#3b2a20'][k]} cuerpo={apaga > 0.5 ? c.apagado : undefined} />
                            </g>
                            {duda > 0.01 && <circle cx={x + 40} cy={738} r={9} fill={NARANJA} opacity={duda * (0.7 + 0.3 * Math.sin(t * 4 + k))} />}
                          </g>
                        );
                      })}
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B1 · Tannen: la seguridad se infiere del habla */}
            {aB1 > 0.01 && (
              <g opacity={aB1}>
                <Persona id={ID} x={250} y={740} s={1.1} pelo="#9a8478" />
                <Etiqueta x={250} y={800} texto="Deborah Tannen" op={e1(t, M('tannen') + 0.3)} c={c} id={ID} />
                <Chip x={250} y={500} texto="desde 1974" c={c} id={ID} op={e1(t, M('tannen') + 0.8)} />
                {(() => {
                  const op = e1(t, M('inferir'));
                  if (op < 0.01) return null;
                  const v = 0.55 + 0.25 * Math.sin(t * 1.6);
                  return (
                    <g opacity={op}>
                      <Persona id={ID} x={620} y={740} s={1} cuerpo="#64748b" />
                      <Ondas x1={660} y1={600} x2={840} y2={520} t={t} color={ROSA} />
                      <Medidor x={950} y={540} v={v} c={c} id={ID} etiqueta="seguridad" />
                      <Chip x={790} y={250} texto="se infiere del habla" c={c} id={ID} op={e1(t, M('inferir') + 0.6)} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B2 · 5 minutos frente a 5 meses */}
            {aB2 > 0.01 && (
              <g opacity={aB2}>
                <Persona id={ID} x={230} y={760} s={1.1} cuerpo="#334155" corbata />
                <Gesto x={230} y={760} s={1.1} animo={0} />
                {(() => {
                  const barra = (y: number, txt: string, largo: number, t0: number, col: string) => {
                    const op = e1(t, t0);
                    if (op < 0.01) return null;
                    return (
                      <g opacity={op}>
                        <Txt f="a" x={430} y={y - 26} fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                        <rect x={430} y={y - 18} width={600} height={36} rx={18} fill={c.apagado} opacity={0.5} />
                        <rect x={430} y={y - 18} width={Math.max(36, largo * ac(t, t0, t0 + 1.4))} height={36} rx={18} fill={col} />
                      </g>
                    );
                  };
                  const s = e1(t, M('seguro'));
                  return (
                    <g>
                      {barra(250, 'su decisión: 5 minutos', 40, M('minutos'), NARANJA)}
                      {barra(370, 'el trabajo de otros: 5 meses', 600, M('meses'), c.tenue)}
                      {s > 0.01 && (
                        <g opacity={s}>
                          <Visto x={470} y={500} s={1.1} />
                          <Txt f="a" x={515} y={510} fontSize={MIN_TXT} fill={c.texto}>parece seguro: sí</Txt>
                          <Cruz x={470} y={600} s={1.1} />
                          <Txt f="a" x={515} y={610} fontSize={MIN_TXT} fill={c.texto}>no lo parece: no</Txt>
                        </g>
                      )}
                      <Chip x={720} y={730} texto="¿cómo suena alguien seguro?" c={c} id={ID} op={e1(t, M('suena'))} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · el estilo lingüístico como consola de mezcla */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const filas: [string, number][] = [['directo', M('directo')], ['pausas', M('pausas')], ['palabras', M('palabras')], ['bromas', M('bromas')], ['disculpas', M('bromas') + 0.9]];
                  const min = ac(t, M('minimas'), M('minimas') + 0.5);
                  return (
                    <g>
                      <rect x={160} y={140} width={880} height={510} rx={30} fill={c.panel} style={sombra(c.sombra)} opacity={e1(t, M('estilo'))} />
                      {filas.map(([txt, t0], k) => {
                        const op = e1(t, t0);
                        if (op < 0.01) return null;
                        const y = 215 + k * 95;
                        const foco = k === 1 ? 1 : 1 - 0.6 * min;
                        const libre = 0.5 + 0.28 * Math.sin(t * 0.9 + k * 1.7);
                        const v = k === 1 ? lerp(libre, 0.5 + 0.12 * Math.sin(t * 3), min) : lerp(libre, 0.5, min);
                        return (
                          <g key={txt} opacity={op * foco}>
                            <Txt f="a" x={210} y={y + 10} fontSize={MIN_TXT} fill={k === 1 && min > 0.5 ? NARANJA : c.texto}>{txt}</Txt>
                            <rect x={480} y={y - 8} width={500} height={16} rx={8} fill={c.apagado} />
                            <rect x={480} y={y - 8} width={500 * v} height={16} rx={8} fill={`url(#${ID}-marcaH)`} />
                            <circle cx={480 + 500 * v} cy={y} r={22} fill={c.blanco} style={sombra(c.sombra, 3, 6)} />
                            <circle cx={480 + 500 * v} cy={y} r={8} fill={k === 1 ? ROSA : NARANJA} />
                          </g>
                        );
                      })}
                      <Chip x={600} y={705} texto="aprendidas en la cultura" c={c} id={ID} op={e1(t, M('senales'))} marca />
                      {['decir', 'interpretar', 'juzgar'].map((txt, k) => <Chip key={txt} x={300 + k * 300} y={795} texto={txt} c={c} id={ID} op={e1(t, M('senales') + 0.8 + k * 0.4)} />)}
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO D1 · Bob y Joe: la pausa que nunca llega */}
            {aD1 > 0.01 && (
              <g opacity={aD1}>
                {(() => {
                  const lect = ac(t, M('avasallador'), M('avasallador') + 0.5);
                  const lect2 = ac(t, M('aportar'), M('aportar') + 0.5);
                  const joeOp = e1(t, M('joe'));
                  const habla = ventana(t, M('joe'), M('sally'));
                  const seg = (x0: number, x1: number, t0: number, col: string) => {
                    const u = ac(t, t0, t0 + 1);
                    return u > 0.01 ? <rect x={x0} y={712} width={Math.max(10, (x1 - x0) * u)} height={36} rx={18} fill={col} /> : null;
                  };
                  const espera = ventana(t, M('joe') + 1.2, M('llena') + 0.9);
                  return (
                    <g>
                      <g opacity={e1(t, M('bob'))}>
                        <Persona id={ID} x={230} y={520} />
                        <Gesto x={230} y={520} animo={0.3 - 0.9 * lect} />
                        <Chip x={230} y={578} texto="Bob" c={c} id={ID} op={1} />
                        <Etiqueta x={230} y={650} texto="Detroit" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={joeOp}>
                        <Persona id={ID} x={970} y={520} cuerpo="#64748b" pelo="#5b3a26" />
                        <Gesto x={970} y={520} animo={0.5 - 0.8 * lect2} />
                        <Chip x={970} y={578} texto="Joe" c={c} id={ID} op={1} />
                        <Etiqueta x={970} y={650} texto="Nueva York" op={1} c={c} id={ID} />
                      </g>
                      <Ondas x1={900} y1={386} x2={300} y2={386} t={t} color={ROSA} op={habla * 0.8} />
                      {/* la línea de turnos */}
                      <rect x={160} y={712} width={880} height={36} rx={18} fill={c.apagado} opacity={0.35 * e1(t, M('bob'))} />
                      {seg(160, 400, M('bob'), NARANJA)}
                      {seg(430, 700, M('joe'), ROSA)}
                      {espera > 0.01 && (
                        <g opacity={espera}>
                          <rect x={704} y={708} width={150} height={44} rx={20} fill="none" stroke={NARANJA} strokeWidth={4} strokeDasharray="10 8" />
                          <Etiqueta x={780} y={800} texto="la pausa de Bob" op={1} c={c} id={ID} />
                        </g>
                      )}
                      {seg(708, 1040, M('llena'), ROSA)}
                      <Chip x={970} y={290} texto="avasallador" c={c} id={ID} op={e1(t, M('avasallador') + 0.2)} />
                      <Chip x={230} y={290} texto="no aporta" c={c} id={ID} op={e1(t, M('aportar') + 0.2)} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO D2 · Sally: de Texas a Washington */}
            {aD2 > 0.01 && (
              <g opacity={aD2}>
                {(() => {
                  const mapa = ventana(t, M('sally'), M('nunca'));
                  const viaje = ac(t, M('texas'), M('texas') + 2.4);
                  const pt = (u: number) => ({ x: (1 - u) ** 2 * 300 + 2 * u * (1 - u) * 560 + u * u * 920, y: (1 - u) ** 2 * 640 + 2 * u * (1 - u) * 300 + u * u * 400 });
                  const p = pt(viaje);
                  const reu = ac(t, M('nunca'), M('nunca') + 0.5);
                  const tim = ac(t, M('timida'), M('timida') + 0.5);
                  const camino: string[] = [];
                  for (let u = 0; u <= viaje + 0.001; u += 0.02) { const q = pt(Math.min(u, viaje)); camino.push(`${q.x},${q.y}`); }
                  return (
                    <g>
                      {/* lo que ven de ella: cambia al final */}
                      <g opacity={1 - tim}><Chip x={600} y={170} texto="extrovertida y segura" c={c} id={ID} op={e1(t, M('sally') + 0.4)} /></g>
                      <Chip x={600} y={170} texto="tímida" c={c} id={ID} op={tim} marca />
                      {mapa > 0.01 && (
                        <g opacity={mapa}>
                          <path d="M 300 640 Q 560 300 920 400" fill="none" stroke={c.apagado} strokeWidth={6} strokeDasharray="4 14" strokeLinecap="round" />
                          {camino.length > 1 && <polyline points={camino.join(' ')} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={8} strokeLinecap="round" />}
                          <ellipse cx={300} cy={646} rx={70} ry={16} fill={NARANJA} opacity={0.25} />
                          <Etiqueta x={300} y={705} texto="Texas" op={1} c={c} id={ID} />
                          <g opacity={e1(t, M('texas'))}>
                            <ellipse cx={920} cy={406} rx={70} ry={16} fill={ROSA} opacity={0.25} />
                            <Etiqueta x={920} y={470} texto="Washington" op={1} c={c} id={ID} />
                          </g>
                          <Persona id={ID} x={p.x} y={p.y} s={0.8} pelo="#8a5a2b" />
                          <Gesto x={p.x} y={p.y} s={0.8} animo={0.7} />
                        </g>
                      )}
                      {reu > 0.01 && (
                        <g opacity={reu}>
                          <Persona id={ID} x={380} y={690} s={0.95} pelo="#8a5a2b" />
                          <Gesto x={380} y={690} s={0.95} animo={0.4 - 0.7 * tim} />
                          <Persona id={ID} x={640} y={690} s={0.95} cuerpo="#64748b" />
                          <Persona id={ID} x={850} y={690} s={0.95} cuerpo="#475569" pelo="#5b3a26" corbata />
                          <Mesa x={600} y={720} w={640} c={c} />
                          <Ondas x1={680} y1={566} x2={810} y2={566} t={t} color={ROSA} n={3} />
                          <Ondas x1={810} y1={540} x2={680} y2={540} t={t + 0.8} color={NARANJA} n={3} />
                          <Burbuja x={400} y={500} w={140} texto="…" u={1} c={c} id={ID} />
                        </g>
                      )}
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
