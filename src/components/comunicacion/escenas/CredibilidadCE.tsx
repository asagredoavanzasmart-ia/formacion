import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Cruz, Etiqueta, Gesto, Medidor, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Credibilidad», escena propia. Acto A: el cliente se pregunta si puede confiar; Jay Conger y sus
 * doce años de estudio; persuadir no es empujar una roca cuesta arriba sino tender un puente entre
 * dos. Acto B: el templo de la credibilidad sobre dos columnas que crecen con la evidencia:
 * experiencia (14 años de campañas, 7 lanzamientos) y relaciones (honesto, estable, confiable).
 * Acto C: dos medidores, lo que tú calculas y lo que ven, y los colegas que dan el dato real.
 */

const ID = 'ce1k';
const nombres = ['confiar', 'conger', 'doce', 'empujar', 'negociar', 'credibilidad', 'fuentes', 'juicio', 'catorce', 'siete', 'relaciones', 'honesto', 'sobrestima', 'evaluarte', 'colegas', 'pregunta'] as const;

/* Columna que crece (alto de 0 a 1) desde la base y. */
const Columna: React.FC<{ x: number; y: number; alto: number; v: number; c: Tono; id: string }> = ({ x, y, alto, v, c, id }) => {
  const h = Math.max(0, alto * v);
  return (
    <g>
      <rect x={x - 80} y={y - h} width={160} height={h} fill={`url(#${id}-marca)`} />
      <rect x={x + 30} y={y - h} width={50} height={h} fill="#000" opacity={0.12} />
      {[0, 1, 2, 3].map((k) => h > 40 ? <line key={k} x1={x - 50 + k * 30} y1={y - h + 14} x2={x - 50 + k * 30} y2={y - 14} stroke="#fff" strokeWidth={3} opacity={0.25} /> : null)}
      <rect x={x - 100} y={y} width={200} height={26} rx={6} fill={c.apagado} />
    </g>
  );
};

export const CredibilidadCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('colegas') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '¿Puedo confiar en ti?'], [M('conger'), 'Jay Conger, 12 años de estudio'], [M('empujar'), 'Persuadir no es empujar'],
    [M('negociar'), 'Es construir juntos'], [M('credibilidad'), 'Primer paso: credibilidad'], [M('juicio'), 'Experiencia'],
    [M('relaciones'), 'Relaciones'], [M('sobrestima'), 'Casi todos la sobrestiman'], [M('evaluarte'), 'Evalúate con honestidad'],
    [M('colegas'), 'Y contrástalo con colegas'],
  ];

  const aA = ventana(t, -1, M('credibilidad'));
  const aB = ventana(t, M('credibilidad'), M('sobrestima'));
  const aC = ac(t, M('sobrestima'), M('sobrestima') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La credibilidad se apoya en dos columnas, experiencia y relaciones, y casi todos la sobrestimamos">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · ¿confío?, Conger y persuadir como construir juntos */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const op = ventana(t, -1, M('empujar'));
                  if (op < 0.01) return null;
                  const n = Math.round(12 * ac(t, M('doce'), M('doce') + 1.2));
                  return (
                    <g opacity={op}>
                      <Persona id={ID} x={900} y={790} s={1} cuerpo="#64748b" corbata />
                      <Gesto x={900} y={790} s={1} animo={-0.1} />
                      <Burbuja x={880} y={560} w={380} texto="¿Puedo confiar en ti?" u={ac(t, 0.3, 1.6)} c={c} lado="der" id={ID} />
                      <g opacity={e1(t, M('conger'))} transform="translate(330 470)">
                        <rect x={-200} y={-180} width={400} height={360} rx={34} fill={c.panel} style={sombra(c.sombra)} />
                        <Txt x={0} y={30} textAnchor="middle" fontSize={170} fill={`url(#${ID}-marca)`} peso={800}>{n}</Txt>
                        <Txt f="a" x={0} y={110} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>años</Txt>
                        <Txt f="a" x={0} y={-120} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>Conger</Txt>
                      </g>
                    </g>
                  );
                })()}
                {/* Empujar una roca (no) frente a tender un puente (sí) */}
                {(() => {
                  const op = e1(t, M('empujar'));
                  if (op < 0.01) return null;
                  const empuje = Math.sin(t * 2.2) * 8;
                  const tacha = e1(t, M('negociar') + 0.2);
                  return (
                    <g opacity={op}>
                      <g opacity={1 - 0.55 * tacha}>
                        <path d="M 110 720 L 560 440 L 560 720 Z" fill={c.panel2} />
                        <g transform={`translate(${400 + empuje} ${510 - empuje * 0.6})`}>
                          <circle r={70} fill={c.tenue} style={sombra(c.sombra, 6, 12)} />
                          <Txt f="a" x={0} y={14} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">idea</Txt>
                        </g>
                        <g transform={`rotate(-32 ${300 + empuje} 700)`}><Persona id={ID} x={300 + empuje} y={700} s={0.6} /></g>
                      </g>
                      <g transform={`translate(335 330) scale(${2 * tacha})`}><Cruz x={0} y={0} /></g>
                    </g>
                  );
                })()}
                {(() => {
                  const op = e1(t, M('negociar'));
                  if (op < 0.01) return null;
                  const u = ac(t, M('negociar') + 0.3, M('negociar') + 2.2);
                  return (
                    <g opacity={op}>
                      <rect x={640} y={640} width={90} height={110} rx={10} fill={c.apagado} />
                      <rect x={1000} y={640} width={90} height={110} rx={10} fill={c.apagado} />
                      <rect x={730} y={624} width={135 * u} height={22} rx={6} fill={NARANJA} />
                      <rect x={1000 - 135 * u} y={624} width={135 * u} height={22} rx={6} fill={ROSA} />
                      <Persona id={ID} x={690} y={640} s={0.6} />
                      <Persona id={ID} x={1040} y={640} s={0.6} cuerpo="#64748b" />
                      {u > 0.98 && <g transform="translate(865 560)"><Visto x={0} y={0} s={1.3} /></g>}
                      <Etiqueta x={865} y={820} texto="solución compartida" op={e1(t, M('negociar') + 1.6)} c={c} id={ID} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B · el templo de la credibilidad */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const exp = 0.15 + 0.45 * ac(t, M('juicio'), M('juicio') + 1) + 0.2 * ac(t, M('catorce'), M('catorce') + 0.8) + 0.2 * ac(t, M('siete'), M('siete') + 0.8);
                  const rel = 0.15 + 0.5 * ac(t, M('relaciones'), M('relaciones') + 1) + 0.35 * ac(t, M('honesto'), M('honesto') + 1.2);
                  const techo = e1(t, M('credibilidad'));
                  const yTecho = 304;
                  return (
                    <g>
                      <g opacity={e1(t, M('fuentes'))}>
                        <Columna x={300} y={740} alto={430} v={exp} c={c} id={ID} />
                        <Columna x={900} y={740} alto={430} v={rel} c={c} id={ID} />
                        <Txt f="a" x={300} y={820} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>experiencia</Txt>
                        <Txt f="a" x={900} y={820} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>relaciones</Txt>
                      </g>
                      {/* Techo: se inclina mientras una columna está más baja que la otra */}
                      <g opacity={techo} transform={`translate(600 ${yTecho}) rotate(${(rel - exp) * -10 * e1(t, M('fuentes'))})`}>
                        <path d="M -400 0 L 0 -110 L 400 0 Z" fill={c.panel2} style={sombra(c.sombra, 6, 12)} />
                        <rect x={-410} y={0} width={820} height={30} rx={8} fill={c.apagado} />
                        <Txt f="a" x={0} y={-24} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>credibilidad</Txt>
                      </g>
                      {/* Evidencia de la experiencia */}
                      {(() => {
                        const op = ventana(t, M('catorce'), M('relaciones'));
                        if (op < 0.01) return null;
                        return (
                          <g opacity={op}>
                            <g opacity={e1(t, M('catorce'))}><Txt x={600} y={510} textAnchor="middle" fontSize={96} fill={NARANJA} peso={800}>14</Txt><Txt f="a" x={600} y={560} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>años de campañas</Txt></g>
                            <g opacity={e1(t, M('siete'))}><Txt x={600} y={660} textAnchor="middle" fontSize={96} fill={NARANJA} peso={800}>7</Txt><Txt f="a" x={600} y={710} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>lanzamientos</Txt></g>
                          </g>
                        );
                      })()}
                      {/* Evidencia de las relaciones */}
                      {(() => {
                        const op = ventana(t, M('honesto'), M('sobrestima') + 1);
                        if (op < 0.01) return null;
                        return (
                          <g opacity={op}>
                            {(['honesto', 'estable', 'confiable'] as const).map((tx, k) => (
                              <g key={tx} opacity={e1(t, M('honesto') + k * 0.4)}>
                                <Visto x={490} y={455 + k * 95} s={0.85} />
                                <Txt f="a" x={535} y={470 + k * 95} fontSize={MIN_TXT} fill={c.texto}>{tx}</Txt>
                              </g>
                            ))}
                          </g>
                        );
                      })()}
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · lo que calculas frente a lo que ven */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <Medidor x={330} y={420} r={130} v={0.88 * ac(t, M('sobrestima'), M('sobrestima') + 1)} c={c} id={ID} etiqueta="tu cálculo" />
                <Medidor x={870} y={420} r={130} v={0.42 * ac(t, M('sobrestima') + 0.6, M('sobrestima') + 1.6)} c={c} id={ID} etiqueta="lo que ven" tono={c.tenue} />
                {(() => {
                  const op = e1(t, M('evaluarte'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      <Persona id={ID} x={600} y={800} s={0.7} />
                      <Gesto x={600} y={800} s={0.7} animo={0} />
                      <path d={`M 560 ${640} Q 600 ${600} 640 640`} stroke={NARANJA} strokeWidth={6} fill="none" opacity={0.5 + 0.5 * Math.sin(t * 3)} />
                    </g>
                  );
                })()}
                {(() => {
                  const op = e1(t, M('colegas'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      <Persona id={ID} x={400} y={810} s={0.6} cuerpo="#64748b" />
                      <Persona id={ID} x={800} y={810} s={0.6} cuerpo="#94a3b8" />
                      <Burbuja x={820} y={680} w={330} texto="así te ven" u={ac(t, M('colegas') + 0.4, M('colegas') + 1.4)} c={c} lado="der" id={ID} marca />
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
