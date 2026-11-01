import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Etiqueta, Gesto, Hoja, Ondas, PanelPregunta, Reloj, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { BarraV } from '../escenas/comunPersuasion';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Conversar, no ordenar» (Groysberg y Slind), escena propia. Acto A: la pirámide de mando y control con
 * un megáfono que baja órdenes se agrieta; el jefe baja de la cima y queda frente a otra persona, como en
 * una conversación. Acto B: las cuatro íes en cuatro fichas y la empresa grande que se mueve como una
 * pequeña. Acto C: la intimidad: la distancia entre líder y empleado se acorta; Athenahealth abre su
 * carpeta estratégica a todos; James Rogers escucha tres horas a un auditorio y aparece la remuneración
 * desigual; la libreta de notas de la A a la F, donde menos de la mitad le pone A, y el ejercicio que se
 * repite.
 */

const ID = 'ce2g';
const nombres = ['mando', 'globalizacion', 'groysberg', 'p150', 'o100', 'dosPersonas', 'orgConv', 'intimidad', 'interactividad', 'inclusion', 'intencionalidad', 'grande', 'acortar', 'confianza', 'athena', 'estrategica', 'escuchar', 'rogers', 'tres', 'g90', 'desiguales', 'personal', 'af', 'mitad', 'interna', 'repitio', 'critica', 'pregunta'] as const;

export const ConversacionCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('critica') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Mando y control'], [M('groysberg'), 'Groysberg y Slind'], [M('dosPersonas'), 'Como entre dos personas'], [M('orgConv'), 'Cuatro íes'],
    [M('grande'), 'Grande como pequeña'], [M('acortar'), 'Intimidad'], [M('athena'), 'Athenahealth'], [M('rogers'), 'James Rogers escucha'],
    [M('personal'), 'Notas para el jefe'], [M('repitio'), 'Lo repitió'],
  ];

  const aA = ventana(t, -1, M('orgConv'));
  const aB = ventana(t, M('orgConv'), M('acortar'));
  const aC1 = ventana(t, M('acortar'), M('escuchar'));
  const aC2 = ventana(t, M('escuchar'), M('personal'));
  const aC3 = ac(t, M('personal'), M('personal') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los buenos líderes conversan con su gente en lugar de dar órdenes desde arriba">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · la pirámide que se agrieta y la conversación entre dos */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const baja = ac(t, M('dosPersonas'), M('dosPersonas') + 1.6);
                  const grieta = ac(t, M('globalizacion'), M('globalizacion') + 2);
                  return (
                    <g>
                      <g opacity={1 - 0.8 * baja}>
                        <path d="M 600 230 L 900 720 H 300 Z" fill={c.panel2} />
                        {[0, 1, 2].map((k) => <path key={k} d={`M ${600 - (k + 1) * 75} ${350 + k * 120} H ${600 + (k + 1) * 75}`} stroke={c.apagado} strokeWidth={4} />)}
                        <path d={`M 560 330 L ${590 - 30 * grieta} ${420 + 60 * grieta} L ${570 + 20 * grieta} ${500 + 120 * grieta}`} stroke={c.texto} strokeWidth={4} fill="none" opacity={grieta} />
                        <path d={`M 680 480 L ${700 + 20 * grieta} ${560 + 60 * grieta}`} stroke={c.texto} strokeWidth={4} fill="none" opacity={grieta} />
                        {[0, 1, 2].map((k) => <path key={k} d={`M 600 ${260 + k * 10} v ${120 + ((t * 120 + k * 40) % 120)}`} stroke={ROSA} strokeWidth={4} opacity={0.4 * (1 - grieta)} />)}
                      </g>
                      {/* el jefe baja de la cima */}
                      <g transform={`translate(${-180 * baja} ${520 * baja})`}>
                        <Persona id={ID} x={600} y={240} s={0.6} cuerpo="#334155" corbata />
                        <Gesto x={600} y={240} s={0.6} animo={0.2 + 0.4 * baja} />
                      </g>
                      <g opacity={baja}>
                        <Persona id={ID} x={780} y={760} s={0.6} cuerpo="#0f766e" />
                        <Gesto x={780} y={760} s={0.6} animo={0.6} />
                        <Ondas x1={450} y1={680} x2={740} y2={680} t={t} color={NARANJA} n={3} />
                        <Ondas x1={740} y1={650} x2={450} y2={650} t={t + 0.5} color={ROSA} n={3} />
                      </g>
                      <Chip x={920} y={300} texto="globalización" c={c} id={ID} op={ventana(t, M('globalizacion'), M('groysberg'))} />
                      <g opacity={ventana(t, M('groysberg'), M('dosPersonas'))}>
                        <Chip x={920} y={330} texto="150 personas" c={c} id={ID} op={e1(t, M('p150'))} />
                        <Chip x={920} y={420} texto="100 organizaciones" c={c} id={ID} op={e1(t, M('o100'))} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · las cuatro íes y la empresa grande que funciona como pequeña */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {([['intimidad', M('intimidad')], ['interactividad', M('interactividad')], ['inclusión', M('inclusion')], ['intencionalidad', M('intencionalidad')]] as const).map(([txt, t0], k) => (
                  <g key={txt} opacity={e1(t, t0)}>
                    <circle cx={180} cy={300 + k * 105} r={34} fill={`url(#${ID}-marca)`} />
                    <Txt x={180} y={316 + k * 105} textAnchor="middle" fontSize={44} fill="#fff">I</Txt>
                    <Txt f="a" x={235} y={312 + k * 105} fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                  </g>
                ))}
                <g opacity={e1(t, M('grande'))}>
                  {(() => {
                    const s = 1 - 0.55 * ac(t, M('grande') + 0.8, M('grande') + 2.4);
                    return (
                      <g>
                        <g transform={`translate(850 700) scale(${s})`}>
                          <rect x={-150} y={-380} width={300} height={380} rx={14} fill={c.panel} style={sombra(c.sombra)} />
                          {Array.from({ length: 15 }, (_, k) => <rect key={k} x={-120 + (k % 3) * 90} y={-350 + Math.floor(k / 3) * 70} width={60} height={44} rx={6} fill={c.panel2} />)}
                        </g>
                        <Etiqueta x={850} y={770} texto="flexible y alineada" op={ac(t, M('grande') + 2, M('grande') + 2.6)} c={c} id={ID} marca />
                      </g>
                    );
                  })()}
                </g>
              </g>
            )}

            {/* C1 · intimidad: acortar distancias y confiar */}
            {aC1 > 0.01 && (
              <g opacity={aC1}>
                {(() => {
                  const cerca = ac(t, M('acortar'), M('acortar') + 2);
                  const abre = ac(t, M('estrategica'), M('estrategica') + 1.2);
                  return (
                    <g>
                      <Persona id={ID} x={220 + 160 * cerca} y={760} cuerpo="#334155" corbata />
                      <Gesto x={220 + 160 * cerca} y={760} animo={0.5} />
                      <Persona id={ID} x={980 - 160 * cerca} y={760} cuerpo="#0f766e" />
                      <Gesto x={980 - 160 * cerca} y={760} animo={0.3 + 0.4 * cerca} />
                      <path d={`M ${280 + 160 * cerca} 600 H ${920 - 160 * cerca}`} stroke={c.apagado} strokeWidth={5} strokeDasharray="8 10" opacity={1 - cerca * 0.7} />
                      <Chip x={600} y={290} texto="la confianza" c={c} id={ID} op={ventana(t, M('confianza'), M('athena'))} />
                      <g opacity={e1(t, M('athena'))}>
                        <Hoja x={600} y={420} w={220} h={220} c={c} cabeza="#1e3a8a" titulo="estrategia" llena={abre} tituloTam={22} />
                        <Etiqueta x={600} y={570} texto="Athenahealth" op={1} c={c} id={ID} />
                        {[0, 1, 2].map((k) => {
                          const u = ((t - M('estrategica')) * 0.5 + k / 3) % 1;
                          return <rect key={k} x={600 + (k - 1) * 120 * u - 16} y={540 + 80 * u} width={32} height={40} rx={4} fill={NARANJA} opacity={abre * Math.sin(Math.PI * u)} />;
                        })}
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C2 · James Rogers escucha */}
            {aC2 > 0.01 && (
              <g opacity={aC2}>
                <Persona id={ID} x={200} y={760} cuerpo="#1e3a8a" corbata />
                <Gesto x={200} y={760} animo={0.5} />
                <Etiqueta x={200} y={820} texto="James Rogers" op={1} c={c} id={ID} />
                <g opacity={e1(t, M('g90'))}>
                  {Array.from({ length: 48 }, (_, k) => <circle key={k} cx={560 + (k % 12) * 46} cy={600 + Math.floor(k / 12) * 46} r={14} fill={[c.tenue, '#475569', '#64748b'][k % 3]} />)}
                  <Etiqueta x={810} y={820} texto="90 a 100 gerentes" op={1} c={c} id={ID} />
                </g>
                <Ondas x1={540} y1={640} x2={280} y2={640} t={t} color={NARANJA} n={4} op={e1(t, M('rogers') + 0.4)} />
                <g opacity={e1(t, M('tres'))}><Reloj x={420} y={360} s={1.1} c={c} progreso={ac(t, M('tres'), M('desiguales'))} /><Etiqueta x={420} y={460} texto="3 horas" op={1} c={c} id={ID} /></g>
                <g opacity={e1(t, M('desiguales'))}>
                  {[0, 1].map((k) => Array.from({ length: k ? 3 : 7 }, (_, j) => <ellipse key={`${k}-${j}`} cx={790 + k * 160} cy={500 - j * 18} rx={40} ry={11} fill="#fbbf24" stroke="#b45309" strokeWidth={2} />))}
                  <Etiqueta x={870} y={330} texto="sueldos desiguales" op={1} c={c} id={ID} />
                </g>
              </g>
            )}

            {/* C3 · las notas de la A a la F */}
            {aC3 > 0.01 && (
              <g opacity={aC3}>
                <Persona id={ID} x={200} y={760} cuerpo="#1e3a8a" corbata />
                <Gesto x={200} y={760} animo={0.3} />
                <g opacity={e1(t, M('af'))}>
                  {['A', 'B', 'C', 'D', 'F'].map((n, k) => (
                    <BarraV key={n} x={430 + k * 120} base={660} alto={[0.45, 0.3, 0.15, 0.06, 0.04][k] * 600} valor={k === 0 ? '< ½' : ''} etiqueta={n} u={ac(t, M('af') + k * 0.2, M('af') + k * 0.2 + 1)} c={c} id={ID} marca={k === 0 && t > M('mitad')} ancho={80} tamValor={36} />
                  ))}
                </g>
                <Chip x={680} y={760} texto="comunicación interna" c={c} id={ID} op={e1(t, M('interna'))} />
                <g opacity={e1(t, M('repitio'))} transform={`translate(1060 360) rotate(${t * 90})`}>
                  <path d="M 0 -40 A 40 40 0 1 1 -36 -18" stroke={NARANJA} strokeWidth={9} fill="none" strokeLinecap="round" />
                  <path d="M -48 -30 L -36 -12 L -20 -26" stroke={NARANJA} strokeWidth={9} fill="none" strokeLinecap="round" />
                </g>
                <Etiqueta x={1060} y={450} texto="otra vez" op={e1(t, M('repitio'))} c={c} id={ID} />
                <Chip x={600} y={290} texto="¡evalúenme!" c={c} id={ID} op={ventana(t, M('personal'), M('af') + 0.4)} />
                <Chip x={600} y={290} texto="crítica directa" c={c} id={ID} op={e1(t, M('critica'))} marca />
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
