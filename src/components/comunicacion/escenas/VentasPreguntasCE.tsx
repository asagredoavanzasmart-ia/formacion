import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Etiqueta, Gesto, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Preguntar en ventas», escena propia. Acto A: el contador de 500 000 llamadas con auriculares; la
 * curva de conversión que sube con las preguntas y cae pasadas 14, con la franja óptima de 11 a 14.
 * Acto B: dos llamadas en una línea de tiempo: los mejores reparten las preguntas; los demás las
 * amontonan al comienzo, como una lista; y las barras de hablar y escuchar. Acto C: el cliente
 * pregunta; responder con franqueza gana a negarse (90 %); quien esquiva con elocuencia lleva una
 * máscara que, al notarse, se cae.
 */

const ID = 'ce1v';
const nombres = ['quinientos', 'distinto', 'conversion', 'reunion', 'cerrar', 'decrecientes', 'catorce', 'optimo', 'largo', 'mitad', 'lista', 'escuchan', 'tePregunta', 'negarte', 'noventa', 'esquiva', 'nota', 'pregunta'] as const;

const X0 = 190, Y0 = 690, PX = 33.6, ALTO = 430;
const conv = (q: number) => 0.12 + 0.78 * Math.exp(-((q - 12.5) ** 2) / (2 * (q < 12.5 ? 6 : 5) ** 2));
const px = (q: number) => X0 + q * PX;
const py = (q: number) => Y0 - ALTO * conv(q);

/* Auriculares de llamada. */
const Auricular: React.FC<{ x: number; y: number; s?: number; id: string; c: Tono }> = ({ x, y, s = 1, id, c }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 10 V -6 A 50 50 0 0 1 50 -6 V 10" fill="none" stroke={c.tenue} strokeWidth={12} strokeLinecap="round" />
    <rect x={-66} y={0} width={32} height={52} rx={14} fill={`url(#${id}-marca)`} />
    <rect x={34} y={0} width={32} height={52} rx={14} fill={`url(#${id}-marca)`} />
    <path d="M -50 50 Q -40 80 -6 80" fill="none" stroke={c.tenue} strokeWidth={6} />
    <circle cx={-2} cy={80} r={8} fill={c.tenue} />
  </g>
);

export const VentasPreguntasCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('nota') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Preguntar en ventas'], [M('quinientos'), '500 000 llamadas'], [M('conversion'), 'Más preguntas, más conversión'],
    [M('decrecientes'), 'Hasta cierto punto'], [M('optimo'), 'Óptimo: de 11 a 14'], [M('largo'), 'Repartidas en la llamada'],
    [M('mitad'), 'No amontonadas al inicio'], [M('escuchan'), 'Escuchan más, hablan menos'], [M('tePregunta'), 'El cliente te pregunta'],
    [M('noventa'), 'Responder con franqueza'], [M('esquiva'), 'Esquivar se nota'],
  ];

  const aA = ventana(t, -1, M('largo'));
  const aB = ventana(t, M('largo'), M('tePregunta'));
  const aC = ac(t, M('tePregunta'), M('tePregunta') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="En 500 000 llamadas, la conversión sube con las preguntas hasta 14, los mejores las reparten y escuchan más; responder con franqueza gana a esquivar">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · 500 000 llamadas y la curva */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const op = ventana(t, -1, M('conversion'));
                  if (op < 0.01) return null;
                  const n = Math.round(500000 * ac(t, M('quinientos'), M('quinientos') + 1.6));
                  return (
                    <g opacity={op}>
                      <Auricular x={600} y={300} s={1.5} id={ID} c={c} />
                      <Txt x={600} y={530} textAnchor="middle" fontSize={110} fill={NARANJA} peso={800} opacity={e1(t, M('quinientos'))}>{n.toLocaleString('es-CL')}</Txt>
                      <Txt f="a" x={600} y={590} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={e1(t, M('quinientos') + 0.4)}>conversaciones de venta</Txt>
                      {[0, 1, 2, 3, 4].map((k) => {
                        const u = ((t * 0.6) + k / 5) % 1;
                        return <path key={k} d={`M ${300 + u * 600} 660 q 10 -${20 + 15 * Math.sin(k * 3)} 20 0 t 20 0 t 20 0`} stroke={ROSA} strokeWidth={5} fill="none" opacity={Math.sin(Math.PI * u) * e1(t, M('distinto'))} />;
                      })}
                    </g>
                  );
                })()}
                {(() => {
                  const op = e1(t, M('conversion') - 0.1);
                  if (op < 0.01) return null;
                  const qMax = 12.5 * ac(t, M('conversion'), M('conversion') + 1.4) + 12.5 * ac(t, M('decrecientes'), M('decrecientes') + 1.4);
                  const pts: string[] = [];
                  for (let q = 0; q <= qMax; q += 0.25) pts.push(`${px(q)},${py(q)}`);
                  const banda = e1(t, M('optimo'));
                  return (
                    <g opacity={op}>
                      <rect x={px(11)} y={Y0 - ALTO - 20} width={px(14) - px(11)} height={ALTO + 20} fill={NARANJA} opacity={0.14 * banda} />
                      <line x1={X0} y1={Y0} x2={px(25)} y2={Y0} stroke={c.apagado} strokeWidth={5} />
                      <line x1={X0} y1={Y0} x2={X0} y2={Y0 - ALTO - 20} stroke={c.apagado} strokeWidth={5} />
                      {pts.length > 1 && <polyline points={pts.join(' ')} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />}
                      {pts.length > 1 && <circle cx={px(qMax)} cy={py(qMax)} r={11} fill={ROSA} />}
                      <g opacity={e1(t, M('catorce'))}>
                        <line x1={px(14)} y1={Y0} x2={px(14)} y2={Y0 - ALTO - 20} stroke={ROSA} strokeWidth={4} strokeDasharray="10 8" />
                        <Txt x={px(14)} y={Y0 + 50} textAnchor="middle" fontSize={MIN_TXT} fill={ROSA} peso={800}>14</Txt>
                      </g>
                      <g opacity={banda}><Txt x={px(11)} y={Y0 + 50} textAnchor="middle" fontSize={MIN_TXT} fill={NARANJA} peso={800}>11</Txt></g>
                      <Txt f="a" x={px(20)} y={Y0 + 50} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>preguntas</Txt>
                      <Txt f="a" x={X0 - 40} y={Y0 - ALTO / 2} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} transform={`rotate(-90 ${X0 - 40} ${Y0 - ALTO / 2})`}>conversión</Txt>
                      <Chip x={300} y={175} texto="reunión" c={c} id={ID} op={e1(t, M('reunion'))} />
                      <Chip x={545} y={175} texto="cierre" c={c} id={ID} op={e1(t, M('cerrar'))} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B · cómo reparten las preguntas y cuánto escuchan */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const linea = (y: number, xs: number[], t0: number, txt: string, marca: boolean) => (
                    <g opacity={e1(t, t0)}>
                      <Txt f="a" x={200} y={y - 50} fontSize={MIN_TXT} fill={marca ? NARANJA : c.texto}>{txt}</Txt>
                      <rect x={200} y={y - 14} width={840} height={28} rx={14} fill={c.apagado} />
                      <rect x={200} y={y - 14} width={840 * ac(t, t0, t0 + 2)} height={28} rx={14} fill={marca ? '#fde7d1' : c.panel2} />
                      {xs.map((x, k) => {
                        const o = e1(t, t0 + 0.3 + (x - 200) / 840 * 1.7);
                        return o > 0.01 ? <g key={k} opacity={o} transform={`translate(${x} ${y})`}><circle r={24} fill={marca ? `url(#${ID}-marca)` : c.tenue} /><Txt x={0} y={11} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>?</Txt></g> : null;
                      })}
                    </g>
                  );
                  const escucha = ac(t, M('escuchan'), M('escuchan') + 0.5);
                  return (
                    <g>
                      <g opacity={1 - 0.6 * escucha}>
                        {linea(310, [260, 360, 470, 560, 670, 760, 870, 980], M('largo'), 'los mejores', true)}
                        {linea(500, [230, 280, 330, 380, 440, 500, 560, 610], M('mitad'), 'los demás', false)}
                      </g>
                      <g opacity={ventana(t, M('lista'), M('escuchan'))}>
                        <g transform="translate(870 610)">
                          <rect x={-60} y={-70} width={120} height={150} rx={14} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                          {[0, 1, 2].map((k) => <g key={k}><rect x={-40} y={-44 + k * 42} width={22} height={22} rx={5} fill={VERDE} /><rect x={-8} y={-38 + k * 42} width={48} height={10} rx={5} fill={c.apagado} /></g>)}
                        </g>
                      </g>
                      {escucha > 0.01 && (
                        <g opacity={escucha}>
                          {([['los mejores', 0.32, 640], ['los demás', 0.62, 740]] as const).map(([txt, v, y], k) => (
                            <g key={txt}>
                              <Txt f="a" x={200} y={y - 34} fontSize={MIN_TXT * 0.85} fill={c.texto}>{txt}</Txt>
                              <rect x={200} y={y - 22} width={840} height={48} rx={24} fill={c.apagado} />
                              <rect x={200} y={y - 22} width={840 * v} height={48} rx={24} fill={k === 0 ? NARANJA : c.tenue} />
                              <Txt f="a" x={220} y={y + 12} fontSize={MIN_TXT} fill="#fff">habla</Txt>
                              <Txt f="a" x={1020} y={y + 12} textAnchor="end" fontSize={MIN_TXT} fill={c.texto}>escucha</Txt>
                            </g>
                          ))}
                        </g>
                      )}
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · cuando el cliente te pregunta */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const mascara = ac(t, M('esquiva'), M('esquiva') + 0.6);
                  const cae = ac(t, M('nota'), M('nota') + 1);
                  const decep = cae;
                  return (
                    <g>
                      <Persona id={ID} x={260} y={790} s={1.05} />
                      <Gesto x={260} y={790} s={1.05} animo={0.3 - 0.5 * decep} />
                      <Persona id={ID} x={940} y={790} s={1.05} cuerpo="#64748b" corbata />
                      <Gesto x={940} y={790} s={1.05} animo={0.1 - 0.7 * decep} />
                      <g opacity={ventana(t, M('tePregunta'), M('negarte'))}>
                        <Burbuja x={920} y={580} w={420} texto="¿Y si no cumplen el plazo?" u={ac(t, M('tePregunta'), M('tePregunta') + 1.4)} c={c} lado="der" id={ID} />
                      </g>
                      {/* responder con franqueza frente a negarse */}
                      {(() => {
                        const op = ventana(t, M('negarte'), M('esquiva'));
                        if (op < 0.01) return null;
                        const b = ac(t, M('noventa'), M('noventa') + 1.2);
                        return (
                          <g opacity={op}>
                            {([['responde', 0.9, 400, NARANJA], ['se niega', 0.1, 800, c.tenue]] as const).map(([txt, v, x, col], k) => (
                              <g key={txt} opacity={e1(t, M('negarte') + k * 0.4)}>
                                <rect x={x - 170} y={170} width={340} height={400} rx={28} fill={c.panel} style={sombra(c.sombra)} />
                                <Txt f="a" x={x} y={225} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                                <rect x={x - 50} y={540 - 170 * v * b} width={100} height={Math.max(12, 170 * v * b)} rx={16} fill={col} />
                                <Txt x={x} y={522 - 170 * v * b} textAnchor="middle" fontSize={54} fill={col} peso={800} opacity={b}>{Math.round(100 * v)} %</Txt>
                              </g>
                            ))}
                          </g>
                        );
                      })()}
                      {/* la máscara de quien esquiva: cae cuando se nota */}
                      {mascara > 0.01 && (
                        <g opacity={mascara * (1 - ac(cae, 0.7, 1))} transform={`translate(${260 + 70 * cae} ${790 - 134 * 1.05 + 200 * cae * cae}) rotate(${40 * cae})`}>
                          <path d="M -44 -30 Q 0 -50 44 -30 Q 50 10 30 34 Q 0 52 -30 34 Q -50 10 -44 -30 Z" fill={`url(#${ID}-marca)`} style={sombra(c.sombra, 4, 8)} />
                          <ellipse cx={-17} cy={-8} rx={9} ry={6} fill="#fff" /><ellipse cx={17} cy={-8} rx={9} ry={6} fill="#fff" />
                          <path d="M -18 16 Q 0 30 18 16" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" />
                        </g>
                      )}
                      <Etiqueta x={600} y={420} texto="esquivar se nota" op={e1(t, M('nota') + 0.4)} c={c} id={ID} />
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
