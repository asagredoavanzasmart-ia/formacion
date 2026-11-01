import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Estrella, Etiqueta, Gesto, PanelPregunta, Rotulo, Visto, ESCUDO, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';
import { Emblema } from './EstilosDecisionCE';

/**
 * «Escépticos, seguidores y controladores», escena propia. Acto A: el escéptico marca con «?» cada dato,
 * decide por intuición, contesta el teléfono en plena presentación y decide en días; la confianza corre
 * por el piso del jefe a su director de operaciones, que se parece a él, y de ahí a Flood. Acto B: el
 * seguidor sigue las huellas de otros ejecutivos y de marcas conocidas; no planta banderas; se convence
 * con testimonios, con un maletín protegido (su empleo), ocho casos, tres opciones y una medalla de
 * primero. Acto C: el controlador aparta la niebla de la incertidumbre, no compra lo que le venden,
 * recibe bloques en orden, retrocede si lo presionan y, tras cuatro informes mensuales, pide la reunión.
 */

const ID = 'ce1o';
const nombres = ['escepticos', 'intuicion', 'fuertes', 'levantarse', 'llamada', 'donde', 'dias', 'parecida', 'transferida', 'operaciones', 'seguramente', 'concreto', 'seguidores', 'marcas', 'pioneros', 'identificar', 'faciles', 'referencias', 'probadas', 'empleo', 'ocho', 'tres', 'primeros', 'controladores', 'hechos', 'noVende', 'estructurada', 'solos', 'presionarlos', 'meses', 'cuatro', 'reunion', 'pregunta'] as const;

/* Tarjeta de dato pequeña (gráfico de barras). */
const Dato: React.FC<{ x: number; y: number; c: Tono; k: number }> = ({ x, y, c, k }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-50} width={140} height={100} rx={14} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
    {[0, 1, 2].map((j) => { const h = [30, 50, 40, 60, 25, 45][(k + j) % 6]; return <rect key={j} x={-45 + j * 32} y={32 - h} width={22} height={h} rx={4} fill={j === 1 ? NARANJA : c.apagado} />; })}
  </g>
);

/* Sobre de un informe. */
const Informe: React.FC<{ x: number; y: number; c: Tono; id: string }> = ({ x, y, c, id }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-36} y={-26} width={72} height={52} rx={8} fill={c.panel} style={sombra(c.sombra, 3, 6)} />
    <path d="M -36 -22 L 0 6 L 36 -22" fill="none" stroke={`url(#${id}-marca)`} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

export const OtrosEstilosCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('reunion') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Los escépticos'], [M('intuicion'), 'Deciden por intuición'], [M('levantarse'), 'Se levantan, contestan'], [M('donde'), 'Sabes dónde estás'],
    [M('parecida'), 'Credibilidad transferida'], [M('seguramente'), 'Cuida su ego'], [M('seguidores'), 'Los seguidores'], [M('pioneros'), 'Rara vez pioneros'],
    [M('faciles'), 'Fáciles de persuadir'], [M('empleo'), 'No perder su empleo'], [M('ocho'), 'Ocho casos, tres opciones'], [M('primeros'), 'Los primeros de su industria'],
    [M('controladores'), 'Los controladores'], [M('noVende'), 'No se les vende'], [M('estructurada'), 'Ordenado y creíble'], [M('presionarlos'), 'Presionar los aleja'],
    [M('meses'), 'Meses de paciencia'], [M('reunion'), 'Ellos piden la reunión'],
  ];

  const aA = ventana(t, -1, M('seguidores'));
  const aA1 = ventana(t, -1, M('parecida'));
  const aA2 = ventana(t, M('parecida'), M('seguidores'));
  const aB = ventana(t, M('seguidores'), M('controladores'));
  const aB1 = ventana(t, M('seguidores'), M('referencias'));
  const aB2 = ventana(t, M('referencias'), M('controladores'));
  const aC = ac(t, M('controladores'), M('controladores') + 0.4);
  const aC1 = ventana(t, M('controladores'), M('estructurada'));
  const aC2 = ac(t, M('estructurada'), M('estructurada') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Al escéptico, credibilidad transferida; al seguidor, casos probados; al controlador, informes ordenados y paciencia">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · el escéptico */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const sube = ventana(t, M('levantarse'), M('donde'), 0.4);
                  const y = 750 - 30 * sube;
                  return (
                    <g>
                      <Persona id={ID} x={230} y={y} cuerpo="#475569" />
                      <Gesto x={230} y={y} animo={-0.15 - 0.35 * ac(t, M('fuertes'), M('fuertes') + 0.5)} />
                      <Emblema k={2} x={230} y={800} c={c} id={ID} s={0.8} />
                      {/* intuición: una luz en el estómago */}
                      <circle cx={230} cy={y - 50} r={16 + 4 * Math.sin(t * 4)} fill={NARANJA} opacity={0.8 * ventana(t, M('intuicion'), M('levantarse'))} />
                      {/* el teléfono en plena presentación */}
                      <g opacity={ventana(t, M('llamada'), M('donde') + 0.5)} transform={`translate(272 ${y - 140})`}>
                        <rect x={-10} y={-26} width={24} height={50} rx={6} fill={c.texto} />
                        {[0, 1].map((k) => <path key={k} d={`M ${24 + k * 12} -14 q 8 14 0 28`} stroke={ROSA} strokeWidth={4} fill="none" opacity={0.5 + 0.5 * Math.sin(t * 8 + k)} />)}
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}
            {aA1 > 0.01 && (
              <g opacity={aA1}>
                {[520, 700, 880].map((x, k) => {
                  const op = e1(t, M('escepticos') + 0.3 + k * 0.3);
                  if (op < 0.01) return null;
                  const sello = e1(t, M('escepticos') + 1.4 + k * 0.4);
                  return (
                    <g key={x} opacity={op}>
                      <Dato x={x} y={320} c={c} k={k} />
                      {sello > 0.01 && <g opacity={sello} transform={`translate(${x + 52} 282) scale(${0.6 + 0.4 * sello})`}><circle r={24} fill={ROSA} /><Txt x={0} y={10} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>?</Txt></g>}
                    </g>
                  );
                })}
                <g opacity={ventana(t, M('intuicion'), M('donde'))}><Chip x={700} y={520} texto="decide por intuición" c={c} id={ID} op={1} /></g>
                <g opacity={ventana(t, M('donde'), M('parecida'))}><Chip x={700} y={520} texto="sabes dónde estás" c={c} id={ID} op={1} marca /></g>
                {(() => {
                  const op = e1(t, M('dias'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      <rect x={560} y={630} width={280} height={120} rx={18} fill={c.panel} style={sombra(c.sombra)} />
                      <rect x={560} y={630} width={280} height={30} rx={15} fill={`url(#${ID}-marca)`} />
                      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={578 + k * 52} y={678} width={40} height={40} rx={8} fill={k < 3 * ac(t, M('dias'), M('dias') + 0.9) ? NARANJA : c.panel2} />)}
                      <Etiqueta x={700} y={800} texto="decide en días" op={1} c={c} id={ID} />
                    </g>
                  );
                })()}
              </g>
            )}
            {aA2 > 0.01 && (
              <g opacity={aA2}>
                {(() => {
                  const l1 = ac(t, M('parecida') + 0.3, M('parecida') + 1.3);
                  const l2 = ac(t, M('transferida'), M('transferida') + 1.2);
                  return (
                    <g>
                      <Persona id={ID} x={600} y={750} cuerpo="#475569" />
                      <Gesto x={600} y={750} animo={0.4} />
                      <Etiqueta x={600} y={815} texto="operaciones" op={e1(t, M('operaciones'))} c={c} id={ID} />
                      <g opacity={e1(t, M('transferida'))}>
                        <Persona id={ID} x={950} y={750} pelo="#8a5a2b" />
                        <Gesto x={950} y={750} animo={0.5} />
                        <Etiqueta x={950} y={815} texto="Flood" op={1} c={c} id={ID} />
                      </g>
                      {/* la confianza corre por el piso */}
                      <rect x={270} y={768} width={290 * l1} height={10} rx={5} fill={NARANJA} />
                      <rect x={640} y={768} width={270 * l2} height={10} rx={5} fill={ROSA} />
                      {[0, 1, 2].map((k) => { const u = (t * 0.6 + k / 3) % 1; return <circle key={k} cx={lerp(270, 270 + 640 * Math.min(1, (l1 + l2) / 2 * 1.0), u)} cy={773} r={7} fill="#fff" opacity={Math.sin(Math.PI * u) * l1} />; })}
                      <g opacity={e1(t, M('seguramente') - 0.3)}>
                        <Burbuja x={930} y={560} w={380} texto="Seguramente ya viste este caso" u={ac(t, M('seguramente') - 0.3, M('seguramente') + 1.3)} c={c} lado="der" id={ID} />
                      </g>
                      <Chip x={420} y={240} texto="concreto" c={c} id={ID} op={e1(t, M('concreto'))} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B · el seguidor */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Persona id={ID} x={230} y={750} cuerpo="#64748b" pelo="#5b3a26" />
                <Gesto x={230} y={750} animo={0.3 + 0.4 * ac(t, M('ocho'), M('ocho') + 1)} />
                <Emblema k={3} x={230} y={800} c={c} id={ID} s={0.8} />
              </g>
            )}
            {aB1 > 0.01 && (
              <g opacity={aB1}>
                {/* otros ejecutivos que ya pasaron, y sus huellas */}
                {[560, 740, 920].map((x, k) => (
                  <g key={x} opacity={e1(t, M('seguidores') + 0.3 + k * 0.25)}>
                    <Persona id={ID} x={x} y={560} s={0.7} cuerpo={['#334155', '#475569', '#94a3b8'][k]} corbata />
                    <Visto x={x + 34} y={430} s={0.6} />
                  </g>
                ))}
                {Array.from({ length: 6 }, (_, k) => <ellipse key={k} cx={500 - k * 40} cy={600 + (k % 2) * 16} rx={12} ry={7} fill={c.tenue} opacity={0.6 * e1(t, M('seguidores') + 1 + k * 0.15)} />)}
                {/* marcas conocidas */}
                <g opacity={e1(t, M('marcas'))}>
                  {[0, 1, 2].map((k) => (
                    <g key={k} transform={`translate(${600 + k * 150} 710)`}>
                      <rect x={-50} y={-38} width={100} height={76} rx={16} fill={c.panel} style={sombra(c.sombra, 3, 6)} />
                      {k === 0 && <circle r={20} fill={NARANJA} />}
                      {k === 1 && <rect x={-20} y={-20} width={40} height={40} rx={6} fill={ROSA} />}
                      {k === 2 && <path d="M 0 -22 L 22 18 L -22 18 Z" fill={c.tenue} />}
                    </g>
                  ))}
                </g>
                {/* no planta banderas */}
                <g opacity={e1(t, M('pioneros'))} transform="translate(980 290)">
                  <rect x={-3} y={-70} width={6} height={90} fill={c.tenue} />
                  <path d="M 3 -70 L 60 -54 L 3 -36 Z" fill={`url(#${ID}-marca)`} />
                  <Cruz x={40} y={10} s={0.8} />
                </g>
                <g opacity={ventana(t, M('identificar'), M('faciles'))}><Chip x={640} y={250} texto="difícil de reconocer" c={c} id={ID} op={1} /></g>
                <g opacity={ventana(t, M('faciles'), M('referencias'))}><Chip x={640} y={250} texto="fácil de persuadir" c={c} id={ID} op={1} marca /></g>
              </g>
            )}
            {aB2 > 0.01 && (
              <g opacity={aB2}>
                {/* testimonios */}
                <g opacity={ventana(t, M('referencias'), M('ocho'))}>
                  {[520, 720, 920].map((x, k) => (
                    <g key={x} opacity={e1(t, M('referencias') + k * 0.3)} transform={`translate(${x} 300)`}>
                      <rect x={-85} y={-60} width={170} height={120} rx={16} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                      <Persona id={ID} x={-48} y={30} s={0.32} cuerpo={c.tenue} />
                      {[0, 1, 2].map((j) => <Estrella key={j} x={-10 + j * 30} y={-22} r={11} fill={NARANJA} />)}
                      <rect x={-20} y={4} width={80} height={8} rx={4} fill={c.apagado} />
                      <rect x={-20} y={22} width={60} height={8} rx={4} fill={c.apagado} />
                    </g>
                  ))}
                  <Chip x={720} y={460} texto="innovador, pero probado" c={c} id={ID} op={e1(t, M('probadas'))} marca />
                </g>
                {/* su empleo, protegido */}
                <g opacity={e1(t, M('empleo'))} transform="translate(420 690)">
                  <rect x={-50} y={-30} width={100} height={70} rx={12} fill="#8a5a2b" />
                  <rect x={-18} y={-44} width={36} height={18} rx={6} fill="none" stroke="#8a5a2b" strokeWidth={6} />
                  <g transform={`translate(52 -42) scale(${0.85 + 0.05 * Math.sin(t * 3)})`}><path d={ESCUDO} fill={`url(#${ID}-marca)`} /></g>
                </g>
                {/* ocho casos */}
                <g opacity={ventana(t, M('ocho'), M('primeros'))}>
                  {Array.from({ length: 8 }, (_, k) => (
                    <g key={k} opacity={e1(t, M('ocho') + k * 0.12)} transform={`translate(${530 + (k % 4) * 130} ${270 + Math.floor(k / 4) * 130})`}>
                      <rect x={-52} y={-48} width={104} height={96} rx={14} fill={c.panel} style={sombra(c.sombra, 3, 6)} />
                      <Visto x={0} y={0} s={0.8} />
                    </g>
                  ))}
                </g>
                {/* tres opciones */}
                <g opacity={ventana(t, M('tres') - 0.3, M('primeros'))}>
                  {['A', 'B', 'C'].map((l, k) => (
                    <g key={l} opacity={e1(t, M('tres') + k * 0.25)} transform={`translate(${640 + k * 150} 600)`}>
                      <rect x={-56} y={-62} width={112} height={124} rx={16} fill={c.panel} style={sombra(c.sombra)} />
                      <Txt x={0} y={16} textAnchor="middle" fontSize={48} fill={k === 1 ? ROSA : NARANJA} peso={800}>{l}</Txt>
                    </g>
                  ))}
                </g>
                {/* los primeros de su industria */}
                {(() => {
                  const op = e1(t, M('primeros'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op} transform={`translate(740 ${330 - 10 * Math.sin(t * 2)})`}>
                      <path d="M -30 -120 L -10 -40 M 30 -120 L 10 -40" stroke={ROSA} strokeWidth={14} strokeLinecap="round" />
                      <circle r={62} fill={`url(#${ID}-marca)`} style={sombra(c.sombra)} />
                      <circle r={46} fill="none" stroke="#fff" strokeWidth={4} opacity={0.6} />
                      <Txt x={0} y={20} textAnchor="middle" fontSize={56} fill="#fff" peso={800}>1º</Txt>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · el controlador */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const atras = ac(t, M('presionarlos') + 0.4, M('presionarlos') + 1.2) * (1 - ac(t, M('meses'), M('meses') + 1));
                  const asiente = ventana(t, M('solos'), M('presionarlos'));
                  const x = 230 - 40 * atras;
                  return (
                    <g>
                      <Persona id={ID} x={x} y={750} cuerpo="#334155" corbata />
                      <Gesto x={x} y={750 + 6 * Math.sin(t * 6) * asiente} animo={0.1 + 0.5 * asiente - 0.6 * atras} />
                      <Emblema k={4} x={230} y={800} c={c} id={ID} s={0.8} />
                    </g>
                  );
                })()}
              </g>
            )}
            {aC1 > 0.01 && (
              <g opacity={aC1}>
                {(() => {
                  const aparta = ac(t, M('hechos') - 0.4, M('hechos') + 0.6);
                  return (
                    <g>
                      <g opacity={e1(t, M('controladores') + 0.4) * (1 - aparta)} transform={`translate(${620 + 300 * aparta} 330)`}>
                        {[[-70, 10, 60], [0, -20, 80], [80, 10, 62], [20, 40, 70]].map(([dx, dy, r], k) => <circle key={k} cx={dx + 6 * Math.sin(t + k)} cy={dy} r={r} fill={c.apagado} opacity={0.75} />)}
                        <Txt x={0} y={22} textAnchor="middle" fontSize={64} fill="#fff" peso={800}>?</Txt>
                      </g>
                      <Chip x={520} y={330} texto="hechos" c={c} id={ID} op={e1(t, M('hechos') + 0.3)} />
                      <Chip x={800} y={330} texto="análisis" c={c} id={ID} op={e1(t, M('hechos') + 0.7)} />
                      <g opacity={e1(t, M('noVende'))}>
                        <Persona id={ID} x={960} y={750} cuerpo="#64748b" pelo="#5b3a26" />
                        <Burbuja x={940} y={570} w={300} texto="¡Compre hoy!" u={ac(t, M('noVende'), M('noVende') + 0.8)} c={c} lado="der" id={ID} />
                        <g opacity={ac(t, M('noVende') + 1, M('noVende') + 1.4)}><Cruz x={940} y={470} s={1.1} /></g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}
            {aC2 > 0.01 && (
              <g opacity={aC2}>
                {[0, 1, 2].map((k) => {
                  const op = e1(t, M('estructurada') + k * 0.4);
                  if (op < 0.01) return null;
                  const x = 520 + k * 210;
                  return (
                    <g key={k} opacity={op}>
                      {k > 0 && <path d={`M ${x - 140} 330 L ${x - 76} 330`} stroke={c.apagado} strokeWidth={6} strokeLinecap="round" />}
                      <rect x={x - 70} y={280} width={140} height={100} rx={16} fill={k === 2 ? `url(#${ID}-marca)` : c.panel} style={sombra(c.sombra, 3, 8)} />
                      <Txt x={x} y={348} textAnchor="middle" fontSize={44} fill={k === 2 ? '#fff' : c.texto} peso={800}>{k + 1}</Txt>
                    </g>
                  );
                })}
                <g opacity={ventana(t, M('solos'), M('presionarlos'))}><Chip x={730} y={200} texto="se convence solo" c={c} id={ID} op={1} /></g>
                <g opacity={ventana(t, M('presionarlos'), M('meses'))}>
                  <path d="M 640 690 L 420 690" stroke={ROSA} strokeWidth={12} strokeLinecap="round" />
                  <path d="M 440 664 L 400 690 L 440 716 Z" fill={ROSA} />
                  <Chip x={720} y={770} texto="presionar los aleja" c={c} id={ID} op={1} />
                </g>
                {(() => {
                  const op = e1(t, M('meses'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      <rect x={590} y={604} width={470} height={10} rx={5} fill={c.apagado} />
                      <Etiqueta x={822} y={730} texto="cuatro meses" op={e1(t, M('cuatro'))} c={c} id={ID} />
                      {[0, 1, 2, 3].map((k) => {
                        const x = 620 + k * 135;
                        const llega = ac(t, M('cuatro') + k * 0.5, M('cuatro') + k * 0.5 + 0.6);
                        return (
                          <g key={k}>
                            <circle cx={x} cy={609} r={10} fill={llega > 0.5 ? NARANJA : c.tenue} />
                            <Txt f="a" x={x} y={660} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{k + 1}</Txt>
                            {llega > 0.01 && <g opacity={llega}><Informe x={x} y={lerp(470, 560, llega)} c={c} id={ID} /></g>}
                          </g>
                        );
                      })}
                    </g>
                  );
                })()}
                <g opacity={e1(t, M('reunion'))}>
                  <Burbuja x={260} y={560} w={330} texto="¿Nos reunimos?" u={ac(t, M('reunion'), M('reunion') + 1)} c={c} id={ID} marca />
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
