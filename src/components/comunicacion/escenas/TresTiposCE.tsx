import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Estrella, Etiqueta, Gesto, Ondas, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Showrunner, artista o neófito» (Elsbach), escena propia. Arriba, una barra que se reparte en 20 %,
 * 40 % y 40 % a medida que se nombra cada tipo. Acto A: el showrunner guía al productor por un recuerdo
 * compartido (el sombrero de Robin Hood) que se transforma en un cohete de ciencia ficción, «¡me
 * encanta!»; luego improvisa un rap ante un cliente con el ceño fruncido, que ríe y se suma. Acto B: el
 * artista tímido vacía cajas de cereal, arma un fuerte y los ejecutivos compiten por la torre más alta.
 * Acto C: el neófito pregunta como alumno; las dos hermanas recorren tiendas y crece su red de mentores.
 * Acto D: desconfiar del brillo: la lata de la «nueva Coca-Cola» de 1985 que brilla y se cae.
 */

const ID = 'ce26';
const nombres = ['tres', 'showrunner', 'practico', 'dueto', 'robin', 'scifi', 'encanta', 'improvisar', 'ceno', 'rap', 'rio', 'cientos', 'p20', 'artista', 'p40a', 'cereal', 'fuerte', 'torre', 'fingirse', 'neofito', 'p40b', 'mentor', 'hermanas', 'red', 'brillo', 'coca', 'desastre', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Nota musical. */
const Nota: React.FC<{ x: number; y: number; color: string; op: number }> = ({ x, y, color, op }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <ellipse cx={0} cy={0} rx={12} ry={9} fill={color} transform="rotate(-20)" />
    <rect x={9} y={-44} width={5} height={44} fill={color} />
    <path d="M 14 -44 Q 30 -36 26 -20" stroke={color} strokeWidth={5} fill="none" />
  </g>
);

/* Caja de cereal. */
const CajaCereal: React.FC<{ x: number; y: number; rot?: number; color: string }> = ({ x, y, rot = 0, color }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-34} y={-90} width={68} height={90} rx={6} fill={color} />
    <circle cx={0} cy={-50} r={18} fill="#fde68a" />
    <rect x={-24} y={-82} width={48} height={10} rx={4} fill="#fff" opacity={0.8} />
  </g>
);

/* Lata de bebida. */
const Lata: React.FC<{ x: number; y: number; rot: number; c: C }> = ({ x, y, rot, c }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-50} y={-160} width={100} height={160} rx={18} fill="#dc2626" style={sombra(c.sombra)} />
    <rect x={-50} y={-160} width={100} height={18} rx={9} fill="#d1d5db" />
    <path d="M -50 -90 Q 0 -60 50 -100" stroke="#fff" strokeWidth={8} fill="none" />
    <Txt x={0} y={-30} textAnchor="middle" fontSize={22} fill="#fff">NUEVA</Txt>
  </g>
);

export const TresTiposCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('desastre') + 1 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Tres tipos que suman'], [M('showrunner'), 'El showrunner'], [M('dueto'), 'Un dueto de conocimiento'], [M('encanta'), '¡Me encanta!'],
    [M('improvisar'), 'Sabe improvisar'], [M('rap'), 'Un rap en el momento'], [M('p20'), 'Apenas el 20 %'], [M('artista'), 'El artista'],
    [M('cereal'), 'Cajas de cereal'], [M('fingirse'), 'No se puede fingir'], [M('neofito'), 'El neófito'], [M('hermanas'), 'Dos hermanas'],
    [M('red'), 'Una red de mentores'], [M('brillo'), 'Desconfía del brillo'], [M('coca'), 'La nueva Coca-Cola, 1985'],
  ];

  const aA1 = ventana(t, -1, M('improvisar'));
  const aA2 = ventana(t, M('improvisar'), M('artista'));
  const aB = ventana(t, M('artista'), M('neofito'));
  const aC = ventana(t, M('neofito'), M('brillo'));
  const aD = ac(t, M('brillo'), M('brillo') + 0.4);

  /* Barra de reparto: 20 % showrunner, 40 % artista, 40 % neófito. */
  const tramos = [
    { w: 160, t0: M('p20'), col: NARANJA, txt: '20 %', act: aA1 + aA2 },
    { w: 320, t0: M('p40a'), col: ROSA, txt: '40 %', act: aB },
    { w: 320, t0: M('p40b'), col: '#7c3aed', txt: '40 %', act: aC },
  ];
  const barra = (1 - aD) * e1(t, M('tres'));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Showrunner, artista o neófito: tres maneras de lograr que quien escucha se sume">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            {/* barra de reparto */}
            <g opacity={barra}>
              <rect x={200} y={160} width={800} height={56} rx={28} fill={c.panel2} />
              {tramos.map((q, k) => {
                const u = ac(t, q.t0, q.t0 + 0.8);
                const x0 = 200 + tramos.slice(0, k).reduce((a, b) => a + b.w, 0);
                return (
                  <g key={k} opacity={u}>
                    <rect x={x0 + 2} y={162} width={(q.w - 4) * u} height={52} rx={26} fill={q.col} opacity={0.55 + 0.45 * Math.min(1, q.act)} />
                    <Txt f="a" x={x0 + q.w / 2} y={198} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">{q.txt}</Txt>
                  </g>
                );
              })}
            </g>

            {/* A1 · el showrunner y el dueto de conocimiento */}
            {aA1 > 0.01 && (
              <g opacity={aA1}>
                {(() => {
                  const cohete = ac(t, M('scifi'), M('scifi') + 1);
                  return (
                    <g>
                      <g opacity={e1(t, M('showrunner'))}>
                        <Persona id={ID} x={230} y={760} cuerpo="#334155" />
                        <Gesto x={230} y={760} animo={0.7} />
                        <Etiqueta x={230} y={820} texto="showrunner" op={1} c={c} id={ID} marca />
                      </g>
                      <g opacity={ventana(t, M('showrunner') + 0.6, M('robin'))}>
                        <Chip x={600} y={320} texto="pasión" c={c} id={ID} op={1} marca />
                        <Chip x={600} y={410} texto="oficio" c={c} id={ID} op={e1(t, M('practico'))} />
                      </g>
                      <g opacity={e1(t, M('dueto'))}>
                        <Persona id={ID} x={970} y={760} cuerpo="#1f2937" corbata />
                        <Gesto x={970} y={760} animo={0.1 + 0.8 * ac(t, M('encanta'), M('encanta') + 0.5)} />
                        <Etiqueta x={970} y={820} texto="productor" op={1} c={c} id={ID} />
                        <path d="M 290 520 Q 600 440 910 520" stroke={c.apagado} strokeWidth={5} fill="none" strokeDasharray="10 12" strokeDashoffset={-t * 30} />
                      </g>
                      {/* el recuerdo compartido: Robin Hood que se vuelve ciencia ficción */}
                      <g opacity={ventana(t, M('robin'), M('encanta'))}>
                        <circle cx={600} cy={370} r={120} fill={c.panel} style={sombra(c.sombra)} />
                        <g opacity={1 - cohete} transform="translate(600 380)">
                          <path d="M -70 20 Q -40 -60 30 -40 Q 70 -30 80 20 Z" fill="#15803d" />
                          <path d="M 20 -40 Q 70 -100 60 -110 Q 40 -70 10 -46 Z" fill="#dc2626" />
                        </g>
                        <g opacity={cohete} transform={`translate(600 ${380 - 10 * Math.sin(t * 4)})`}>
                          <path d="M 0 -80 Q 30 -50 30 10 H -30 Q -30 -50 0 -80 Z" fill={`url(#${ID}-marca)`} />
                          <circle cx={0} cy={-30} r={11} fill="#bfdbfe" />
                          <path d="M -30 0 L -50 30 L -30 20 Z M 30 0 L 50 30 L 30 20 Z" fill={ROSA} />
                          <path d="M -14 14 Q 0 50 14 14 Z" fill="#fbbf24" />
                        </g>
                        <Etiqueta x={600} y={530} texto={cohete > 0.5 ? 'ciencia ficción' : 'Robin Hood'} op={1} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('encanta') - 0.2, M('improvisar'))}>
                        <Burbuja x={940} y={560} w={380} texto="¡Me encanta!" u={ac(t, M('encanta') - 0.2, M('encanta') + 0.6)} c={c} lado="der" id={ID} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* A2 · improvisar un rap */}
            {aA2 > 0.01 && (
              <g opacity={aA2}>
                {(() => {
                  const rap = ac(t, M('rap'), M('rap') + 0.6);
                  const rie = ac(t, M('rio'), M('rio') + 0.6);
                  return (
                    <g>
                      <Persona id={ID} x={230} y={760} cuerpo="#334155" />
                      <Gesto x={230} y={760} animo={0.4 + 0.4 * rap} />
                      <Etiqueta x={230} y={820} texto="agencia" op={1} c={c} id={ID} />
                      <Persona id={ID} x={970} y={760} cuerpo="#0f766e" />
                      <Gesto x={970} y={760} animo={-0.6 * ac(t, M('ceno'), M('ceno') + 0.5) * (1 - rie) + 0.9 * rie} />
                      <Etiqueta x={970} y={820} texto="cadena deportiva" op={1} c={c} id={ID} />
                      {Array.from({ length: 5 }, (_, k) => {
                        const u = ((t - M('rap')) * 0.4 + k / 5) % 1;
                        return <Nota key={k} x={300 + 600 * u} y={520 - 80 * Math.sin(Math.PI * u)} color={NARANJA} op={rap * Math.sin(Math.PI * u)} />;
                      })}
                      {Array.from({ length: 4 }, (_, k) => {
                        const u = ((t - M('rio')) * 0.4 + k / 4) % 1;
                        return <Nota key={k} x={900 - 600 * u} y={420 - 60 * Math.sin(Math.PI * u)} color={ROSA} op={rie * Math.sin(Math.PI * u)} />;
                      })}
                      <g opacity={e1(t, M('cientos'))}>
                        <rect x={410} y={250} width={380} height={100} rx={20} fill={c.panel} style={sombra(c.sombra)} />
                        <Txt x={600} y={318} textAnchor="middle" fontSize={44} fill={`url(#${ID}-marcaH)`}>US$ 100 000+</Txt>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · el artista y las cajas de cereal */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const vacia = ac(t, M('cereal'), M('cereal') + 1.2);
                  const fuerte = ac(t, M('fuerte'), M('fuerte') + 2);
                  const torre = ac(t, M('torre'), M('torre') + 3);
                  return (
                    <g>
                      <Persona id={ID} x={180} y={760} cuerpo={ROSA} pelo="#5b3a26" />
                      <Gesto x={180} y={760} animo={0.1} />
                      <Etiqueta x={180} y={820} texto="artista" op={1} c={c} id={ID} marca />
                      {[760, 980].map((x, k) => (
                        <g key={x} opacity={e1(t, M('torre'))}>
                          <Persona id={ID} x={x} y={640} s={0.85} cuerpo={k ? '#475569' : '#1f2937'} corbata />
                          <Gesto x={x} y={640} s={0.85} animo={0.2 + 0.6 * torre} />
                        </g>
                      ))}
                      <rect x={340} y={620} width={800} height={24} rx={10} fill={c.apagado} />
                      <rect x={380} y={644} width={20} height={130} fill={c.apagado} /><rect x={1080} y={644} width={20} height={130} fill={c.apagado} />
                      <g opacity={e1(t, M('cereal'))}>
                        <CajaCereal x={420} y={620} rot={-70 * vacia} color={NARANJA} />
                        <CajaCereal x={520} y={620} rot={-60 * vacia} color="#2563eb" />
                      </g>
                      {/* las piezas forman un fuerte */}
                      {Array.from({ length: 10 }, (_, k) => {
                        const u = Math.min(1, fuerte * 1.4 - k * 0.04);
                        if (u <= 0) return null;
                        const fx = 540 + (k % 5) * 30, fy = 610 - Math.floor(k / 5) * 26;
                        return <rect key={k} x={fx} y={fy - 22} width={26} height={22} rx={4} fill={['#f59e0b', '#fde68a', '#d97706'][k % 3]} opacity={u} />;
                      })}
                      {/* las torres de los ejecutivos */}
                      {[760, 980].map((x, k) => {
                        const n = Math.round((k ? 5 : 4) * torre);
                        return Array.from({ length: n }, (_, j) => <rect key={`${x}-${j}`} x={x - 60} y={610 - 22 - j * 24} width={26} height={22} rx={4} fill={['#f59e0b', '#fde68a', '#d97706'][(j + k) % 3]} />);
                      })}
                      <Chip x={600} y={300} texto="no se puede fingir" c={c} id={ID} op={e1(t, M('fingirse'))} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · el neófito y su red de mentores */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const red = ac(t, M('red'), M('red') + 2.5);
                  const hermanas = e1(t, M('hermanas'));
                  const nodos = [[760, 330], [960, 360], [1060, 520], [860, 520], [700, 470]];
                  return (
                    <g>
                      <g opacity={1 - hermanas}>
                        <Persona id={ID} x={260} y={760} cuerpo="#7c3aed" />
                        <Gesto x={260} y={760} animo={0.5} />
                        <rect x={290} y={650} width={50} height={64} rx={6} fill="#2563eb" />
                        <Etiqueta x={260} y={820} texto="neófito" op={1} c={c} id={ID} marca />
                        <g opacity={e1(t, M('mentor'))}>
                          <Persona id={ID} x={920} y={760} s={1.1} cuerpo="#1f2937" pelo="#9ca3af" corbata />
                          <Gesto x={920} y={760} s={1.1} animo={0.6} />
                          <Etiqueta x={920} y={820} texto="mentor" op={1} c={c} id={ID} />
                          <Burbuja x={300} y={560} w={380} texto="¿Me ayudas a entender?" u={ac(t, M('mentor'), M('mentor') + 1.4)} c={c} id={ID} />
                        </g>
                      </g>
                      <g opacity={hermanas}>
                        {[230, 370].map((x, k) => (
                          <g key={x}>
                            <Persona id={ID} x={x} y={760} cuerpo={k ? '#7c3aed' : '#a855f7'} pelo={k ? '#c49a6c' : '#7c3f1d'} />
                            <Gesto x={x} y={760} animo={0.6 + 0.3 * red} />
                          </g>
                        ))}
                        <Etiqueta x={300} y={820} texto="dos hermanas" op={1} c={c} id={ID} marca />
                        {nodos.map(([x, y], k) => (
                          <g key={k} opacity={ac(t, M('hermanas') + 1 + k * 0.6, M('hermanas') + 1.5 + k * 0.6)}>
                            <path d={`M 340 560 Q ${(340 + x) / 2} ${y - 60} ${x} ${y}`} stroke={NARANJA} strokeWidth={4} fill="none" strokeDasharray={600} strokeDashoffset={600 * (1 - red)} opacity={0.8} />
                            <circle cx={x} cy={y} r={34} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                            <circle cx={x} cy={y - 6} r={12} fill="#e2a37c" />
                            <path d={`M ${x - 18} ${y + 22} Q ${x} ${y + 2} ${x + 18} ${y + 22} Z`} fill={c.tenue} />
                          </g>
                        ))}
                        <Etiqueta x={880} y={640} texto="red de mentores" op={red} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · desconfiar del brillo */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const cae = ac(t, M('desastre'), M('desastre') + 0.8);
                  return (
                    <g>
                      <g opacity={e1(t, M('coca'))}>
                        <Lata x={600} y={600 + 60 * cae} rot={80 * cae} c={c} />
                        {[0, 1, 2].map((k) => <Estrella key={k} x={500 + k * 100} y={330 + (k % 2) * 40} r={22 + 6 * Math.sin(t * 5 + k)} fill="#fbbf24" op={1 - cae} />)}
                        <Txt x={600} y={260} textAnchor="middle" fontSize={44} fill={c.texto}>1985</Txt>
                      </g>
                      <Chip x={600} y={420} texto="presentaciones brillantes" c={c} id={ID} op={ventana(t, M('brillo') + 0.3, M('coca'))} />
                      <g opacity={cae}>
                        <Cruz x={800} y={480} s={1.3} />
                        <Etiqueta x={800} y={560} texto="desastre" op={1} c={c} id={ID} />
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
