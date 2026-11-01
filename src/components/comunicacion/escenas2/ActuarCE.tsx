import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Estrella, Etiqueta, Gesto, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Persuadir y hacer seguimiento» (Detert), escena propia. Acto A: Mel Exon y la oveja negra: el rebaño de
 * la agencia y una unidad exploradora que se adelanta con prismáticos y trae sus hallazgos de vuelta; se
 * aprueba sobre el ADN de la empresa. Acto B: Erik y el negocio solar: «aquí no hacemos eso», un anzuelo
 * que no muerde, la niebla del miedo a lo desconocido y un gráfico que gira la estrategia. Acto C: el
 * seguimiento: compartir el crédito, reparar el puente y la conversación privada de Gill esa misma noche:
 * evolución, no revolución. Acto D: Fred Keller persiste: dos intentos tachados y el tercero con formación
 * y una trabajadora social; pasos pequeños y los valores a la vista.
 */

const ID = 'ce2p';
const nombres = ['enmarcan', 'datos', 'emociones', 'exon', 'unidad', 'noInnovador', 'oveja', 'orgullo', 'rompedoras', 'explorador', 'aprobaron', 'adn', 'erik', 'solar', 'noHacemos', 'anzuelo', 'miedo', 'conDatos', 'seguimiento', 'credito', 'reparar', 'l30', 'privado', 'evolucion', 'persistir', 'keller', 'asistencia', 'fracaso', 'trabajadora', 'modelo', 'pequenos', 'valores', 'pregunta'] as const;

/* Oveja: blanca o negra. */
const Oveja: React.FC<{ x: number; y: number; negra?: boolean; s?: number }> = ({ x, y, negra = false, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-26, -8, 10, 28].map((dx, k) => <circle key={k} cx={dx} cy={-26 + (k % 2) * 6} r={20} fill={negra ? '#1f2937' : '#f5f5f4'} stroke={negra ? '#111827' : '#d6d3d1'} strokeWidth={2} />)}
    <ellipse cx={44} cy={-30} rx={13} ry={11} fill="#374151" />
    <rect x={-22} y={-10} width={6} height={18} fill="#374151" /><rect x={18} y={-10} width={6} height={18} fill="#374151" />
  </g>
);

export const ActuarCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('valores') + 1 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'En el momento de actuar'], [M('exon'), 'Mel Exon'], [M('oveja'), 'La oveja negra'], [M('explorador'), 'Un explorador de avanzada'],
    [M('aprobaron'), 'Aprobado'], [M('erik'), 'Erik'], [M('anzuelo'), 'No muerde el anzuelo'], [M('seguimiento'), 'El seguimiento'],
    [M('privado'), 'En privado, esa noche'], [M('persistir'), 'Persistir'], [M('pequenos'), 'Actos pequeños'],
  ];

  const aA = ventana(t, -1, M('erik'));
  const aB = ventana(t, M('erik'), M('seguimiento'));
  const aC = ventana(t, M('seguimiento'), M('persistir'));
  const aD = ac(t, M('persistir'), M('persistir') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Enmarcar la propuesta en lo que importa al otro, con datos y calma; después, seguimiento y persistencia">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · Mel Exon y la oveja negra */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const sale = ac(t, M('explorador'), M('explorador') + 1.6);
                  const vuelve = ac(t, M('explorador') + 1.8, M('aprobaron'));
                  return (
                    <g>
                      <g opacity={ventana(t, M('enmarcan'), M('exon'))}>
                        <Chip x={300} y={420} texto="enmarcar" c={c} id={ID} op={1} marca />
                        <Chip x={600} y={420} texto="datos" c={c} id={ID} op={e1(t, M('datos'))} />
                        <Chip x={900} y={420} texto="emociones" c={c} id={ID} op={e1(t, M('emociones'))} />
                      </g>
                      <g opacity={e1(t, M('exon'))}>
                        <Persona id={ID} x={170} y={760} cuerpo="#be185d" pelo="#2b1a12" />
                        <Gesto x={170} y={760} animo={0.5 - 0.4 * ventana(t, M('noInnovador'), M('orgullo'))} />
                        <Etiqueta x={170} y={820} texto="Mel Exon" op={1} c={c} id={ID} />
                        <Chip x={600} y={260} texto="unidad de innovación" c={c} id={ID} op={ventana(t, M('unidad'), M('oveja'))} />
                        <Chip x={600} y={260} texto="¿y el resto no innova?" c={c} id={ID} op={ventana(t, M('noInnovador') + 0.4, M('oveja'))} />
                      </g>
                      {/* el rebaño y la oveja negra */}
                      <g opacity={e1(t, M('oveja'))}>
                        {[[420, 720], [520, 740], [620, 715], [500, 660], [600, 670]].map(([x, y], k) => <Oveja key={k} x={x} y={y} s={0.9} />)}
                        <Oveja x={760 + 220 * sale} y={700 - 60 * Math.sin(Math.PI * Math.min(1, sale))} negra s={1.1} />
                        <g opacity={sale}>
                          <circle cx={990} cy={600} r={10} fill="#111827" /><circle cx={1012} cy={600} r={10} fill="#111827" />
                          <Etiqueta x={1000} y={545} texto="explorador" op={1} c={c} id={ID} marca />
                        </g>
                        {[0, 1, 2].map((k) => {
                          const u = ((t * 0.5) + k / 3) % 1;
                          return <circle key={k} cx={960 - 300 * u} cy={640 - 40 * Math.sin(Math.PI * u)} r={9} fill={NARANJA} opacity={vuelve * Math.sin(Math.PI * u)} />;
                        })}
                        <Chip x={600} y={330} texto="orgullo rebelde" c={c} id={ID} op={ventana(t, M('orgullo'), M('aprobaron'))} />
                        <Chip x={600} y={420} texto="ideas rompedoras" c={c} id={ID} op={ventana(t, M('rompedoras'), M('aprobaron'))} />
                      </g>
                      <g opacity={e1(t, M('aprobaron'))}>
                        <Visto x={600} y={360} s={1.2} />
                        <g transform={`translate(760 400)`}>
                          {Array.from({ length: 9 }, (_, k) => {
                            const y = -80 + k * 20;
                            const a = Math.sin(t * 2 + k * 0.7) * 40;
                            return <g key={k}><line x1={-a} y1={y} x2={a} y2={y} stroke={c.apagado} strokeWidth={3} /><circle cx={-a} cy={y} r={7} fill={NARANJA} /><circle cx={a} cy={y} r={7} fill={ROSA} /></g>;
                          })}
                        </g>
                        <Etiqueta x={760} y={290} texto="sobre su ADN" op={e1(t, M('adn'))} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · Erik: calma y datos */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const niebla = ventana(t, M('miedo'), M('conDatos') + 1);
                  const giro = ac(t, M('conDatos') + 0.5, M('conDatos') + 2.5);
                  return (
                    <g>
                      <Persona id={ID} x={200} y={760} cuerpo="#15803d" />
                      <Gesto x={200} y={760} animo={0.4} />
                      <Etiqueta x={200} y={820} texto="Erik" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('solar'))} transform="translate(380 570) skewX(-14)">
                        <rect x={-80} y={-60} width={160} height={110} rx={6} fill="#1e3a8a" />
                        {[0, 1, 2].map((k) => <line key={k} x1={-80} y1={-60 + 36 * (k + 1)} x2={80} y2={-60 + 36 * (k + 1)} stroke="#93c5fd" strokeWidth={2} />)}
                        {[0, 1, 2].map((k) => <line key={k} x1={-80 + 53 * (k + 1)} y1={-60} x2={-80 + 53 * (k + 1)} y2={50} stroke="#93c5fd" strokeWidth={2} />)}
                      </g>
                      {[780, 960].map((x, k) => (
                        <g key={x} opacity={e1(t, M('noHacemos') - 0.6)}>
                          <Persona id={ID} x={x} y={760} cuerpo={k ? '#475569' : '#1f2937'} corbata />
                          <Gesto x={x} y={760} animo={-0.4 + 0.6 * giro} />
                        </g>
                      ))}
                      <g opacity={ventana(t, M('noHacemos') - 0.3, M('miedo'))}>
                        <Burbuja x={900} y={560} w={420} texto="Aquí no hacemos eso." u={ac(t, M('noHacemos') - 0.3, M('noHacemos') + 0.8)} c={c} lado="der" id={ID} />
                      </g>
                      {/* el anzuelo que no muerde */}
                      <g opacity={ventana(t, M('anzuelo'), M('miedo') + 0.5)}>
                        <line x1={300} y1={230} x2={300} y2={430 + 10 * Math.sin(t * 3)} stroke={c.tenue} strokeWidth={3} />
                        <path d={`M 300 ${430 + 10 * Math.sin(t * 3)} q 0 30 -20 30 q -16 0 -16 -16`} stroke={c.texto} strokeWidth={5} fill="none" />
                        <Cruz x={360} y={400} s={0.7} />
                      </g>
                      <g opacity={niebla}>
                        {[0, 1, 2].map((k) => <ellipse key={k} cx={870 + 60 * Math.sin(t + k)} cy={460 + k * 50} rx={160} ry={34} fill={c.apagado} opacity={0.65} />)}
                        <Etiqueta x={870} y={360} texto="miedo a lo desconocido" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('conDatos'))}>
                        <rect x={470} y={300} width={260} height={180} rx={14} fill={c.panel} style={sombra(c.sombra)} />
                        {[0, 1, 2, 3].map((k) => <rect key={k} x={500 + k * 55} y={450 - (40 + k * 25)} width={36} height={40 + k * 25} rx={5} fill={NARANJA} />)}
                        <g opacity={giro}>
                          <path d="M 860 600 Q 960 480 1060 560" stroke={ROSA} strokeWidth={8} fill="none" strokeLinecap="round" />
                          <path d="M 1036 540 L 1064 562 L 1034 576" stroke={ROSA} strokeWidth={8} fill="none" strokeLinecap="round" />
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · el seguimiento: crédito, reparar y la conversación privada */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const gill = ac(t, M('l30') - 0.3, M('l30') + 0.4);
                  return (
                    <g>
                      <g opacity={1 - gill}>
                        <g opacity={e1(t, M('credito'))}>
                          <path d="M 300 380 H 400 V 430 Q 400 480 350 480 Q 300 480 300 430 Z" fill="#fbbf24" />
                          <rect x={338} y={480} width={24} height={30} fill="#f59e0b" /><rect x={316} y={510} width={68} height={16} rx={4} fill="#f59e0b" />
                          <Etiqueta x={350} y={590} texto="compartir el crédito" op={1} c={c} id={ID} />
                        </g>
                        <g opacity={e1(t, M('reparar'))}>
                          <path d="M 680 470 Q 800 410 920 470" stroke="#a16207" strokeWidth={14} fill="none" />
                          <rect x={770} y={420} width={60} height={26} rx={8} fill="#fde68a" transform="rotate(-8 800 433)" />
                          <Etiqueta x={800} y={590} texto="reparar relaciones" op={1} c={c} id={ID} />
                        </g>
                      </g>
                      <g opacity={gill}>
                        <Persona id={ID} x={220} y={760} cuerpo="#7c3aed" pelo="#c49a6c" />
                        <Gesto x={220} y={760} animo={0.4} />
                        <Etiqueta x={220} y={820} texto="Gill" op={1} c={c} id={ID} />
                        <g opacity={ventana(t, M('l30'), M('privado'))}>
                          {Array.from({ length: 30 }, (_, k) => <circle key={k} cx={460 + (k % 10) * 60} cy={360 + Math.floor(k / 10) * 60} r={16} fill={c.tenue} />)}
                          <Etiqueta x={730} y={590} texto="unos 30 líderes" op={1} c={c} id={ID} />
                        </g>
                        <g opacity={e1(t, M('privado'))}>
                          <circle cx={1040} cy={300} r={44} fill="#fde68a" /><circle cx={1060} cy={286} r={40} fill={isDark ? '#121212' : '#f8f9fa'} />
                          <Persona id={ID} x={900} y={760} cuerpo="#1f2937" corbata />
                          <Gesto x={900} y={760} animo={0.2 + 0.4 * e1(t, M('evolucion'))} />
                          <Burbuja x={250} y={560} w={440} texto="Evolución, no revolución." u={ac(t, M('evolucion') - 0.6, M('evolucion') + 0.8)} c={c} id={ID} marca />
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · Fred Keller persiste; pasos pequeños */}
            {aD > 0.01 && (
              <g opacity={aD}>
                <Persona id={ID} x={180} y={760} cuerpo="#1e3a8a" corbata />
                <Gesto x={180} y={760} animo={0.6} />
                <Etiqueta x={180} y={820} texto="Fred Keller" op={e1(t, M('keller'))} c={c} id={ID} />
                <Chip x={620} y={250} texto="asistencia social" c={c} id={ID} op={ventana(t, M('asistencia'), M('pequenos'))} />
                {[0, 1, 2].map((k) => (
                  <g key={k} opacity={e1(t, k < 2 ? M('fracaso') + k * 0.5 : M('trabajadora'))}>
                    <rect x={380 + k * 230} y={360} width={190} height={170} rx={16} fill={c.panel} style={sombra(c.sombra)} />
                    <Txt f="a" x={475 + k * 230} y={420} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{`intento ${k + 1}`}</Txt>
                    {k < 2 ? <Cruz x={475 + k * 230} y={480} s={0.9} /> : <Visto x={475 + k * 230} y={480} s={0.9} />}
                  </g>
                ))}
                <g opacity={e1(t, M('modelo'))}><Estrella x={935} y={320} r={34} fill="#fbbf24" rot={t * 30} /></g>
                <g opacity={e1(t, M('pequenos'))}>
                  {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={420 + k * 90} y={700 - k * 22} width={80} height={22 + k * 22} rx={6} fill={k % 2 ? ROSA : NARANJA} opacity={0.85} />)}
                  <Etiqueta x={600} y={780} texto="actos pequeños" op={1} c={c} id={ID} />
                </g>
                <g opacity={e1(t, M('valores'))} transform={`translate(1010 640) rotate(${10 * Math.sin(t * 2)})`}>
                  <circle r={56} fill={c.panel} stroke={c.tenue} strokeWidth={6} style={sombra(c.sombra)} />
                  <path d="M 0 -42 L 12 0 L 0 42 L -12 0 Z" fill={ROSA} />
                  <Txt f="a" x={0} y={96} textAnchor="middle" fontSize={26} fill={c.texto}>valores</Txt>
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
