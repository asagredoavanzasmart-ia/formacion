import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Chip, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana } from './comunOA';
import { AZUL_M, Barco, Celda, Flecha, Moneda, Precio, ROJO_M, ROJO_O, Tienda } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * «El caso de la Wii», escena propia. Acto A: la consola y su mando junto al contador de ochenta millones.
 * Acto B: las seis preguntas aplicadas a la Wii, en seis celdas con su dibujo (pasatiempos y joystick
 * tachado, precio por debajo de la PS3 y la Xbox, tienda con puntos, mando y báscula, tecnología tachada y
 * entrenamiento cerebral). Acto C: los tres no clientes (inminentes, anti, inexplotados) y la comparación de
 * ochenta contra cuarenta millones. Acto D: la Wii U de 2012 frente a las tabletas y los teléfonos.
 */

const ID = 'oa10';
const nombres = ['en2006', 'ochenta', 'seis', 'pasa', 'joystick', 'precio', 'tienda', 'wiimote', 'bascula', 'tecno', 'envej', 'clave', 'nopeleo', 'sedujo', 'cuarenta', 'atrajo', 'en2012', 'wiiu', 'pregunta'] as const;
const POS: [number, number][] = [[220, 290], [600, 290], [980, 290], [220, 620], [600, 620], [980, 620]];

const Consola: React.FC<{ x: number; y: number; s?: number; luz?: string; op?: number }> = ({ x, y, s = 1, luz = AZUL_M, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <rect x={-34} y={-100} width={68} height={200} rx={16} fill="#f8fafc" style={sombra(0.2, 6, 12)} />
    <rect x={-34} y={-100} width={30} height={200} rx={14} fill="#000" opacity={0.06} />
    <rect x={-22} y={-62} width={44} height={8} rx={4} fill="#cbd5e1" /><rect x={-5} y={-30} width={10} height={90} rx={5} fill={luz} />
  </g>
);
const Mando: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-22} y={-80} width={44} height={160} rx={16} fill="#f8fafc" style={sombra(0.2, 4, 10)} />
    <circle cx={0} cy={-46} r={11} fill="#cbd5e1" /><circle cx={0} cy={-8} r={9} fill={AZUL_M} /><circle cx={-8} cy={22} r={6} fill="#cbd5e1" /><circle cx={8} cy={22} r={6} fill="#cbd5e1" /><rect x={-9} y={44} width={18} height={14} rx={4} fill="#cbd5e1" />
  </g>
);

export const WiiOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('wiiu') + 4 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Nintendo, 2006'], [M('ochenta'), 'Ochenta millones'], [M('seis'), 'Las seis preguntas'], [M('pasa'), 'Pasatiempos'], [M('precio'), 'Precio menor'], [M('tienda'), 'Tienda propia'],
    [M('wiimote'), 'Mando y báscula'], [M('tecno'), 'Sin tecnocultura'], [M('envej'), 'Una población que envejece'], [M('clave'), 'La clave: los no clientes'], [M('nopeleo'), 'Inminentes: no peleó'],
    [M('sedujo'), 'Anti: seducidos'], [M('cuarenta'), 'Ochenta contra cuarenta'], [M('atrajo'), 'Inexplotados: atraídos'], [M('en2012'), 'Wii U, 2012'],
  ];

  const aA = ventana(t, -1, M('seis'));
  const aB = ventana(t, M('seis'), M('clave'));
  const aC = ventana(t, M('clave'), M('en2012'));
  const aD = ac(t, M('en2012'), M('en2012') + 0.5);
  const lim = [M('seis'), M('precio'), M('tienda'), M('wiimote'), M('tecno'), M('envej'), M('clave')];
  const activa = lim.findIndex((_, k) => k < 6 && t >= lim[k] && t < lim[k + 1]);
  const cuenta = Math.round(80 * ac(t, M('ochenta'), M('ochenta') + 2.2));
  const barra = (k: number) => ac(t, M('cuarenta') + k * 0.5, M('cuarenta') + 1.5 + k * 0.5);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La Wii de Nintendo, un océano azul para quienes nunca habían jugado">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · la consola, el mando y los ochenta millones */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <g opacity={e1(t, 0.4)}><Consola x={330} y={480} s={1.5} /><Mando x={500} y={500} s={1.4} rot={14 * Math.sin(t * 2.4)} /></g>
                <Chip x={420} y={250} texto="2006" c={c} id={ID} op={e1(t, M('en2006'))} marca />
                <g opacity={e1(t, M('ochenta'))}>
                  <Txt x={880} y={500} textAnchor="middle" fontSize={190} fill={`url(#${ID}-marcaH)`}>{cuenta}</Txt>
                  <Txt f="a" x={880} y={580} textAnchor="middle" fontSize={44} fill={c.texto}>millones</Txt>
                </g>
              </g>
            )}

            {/* B · las seis preguntas aplicadas */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {POS.map(([x, y], k) => {
                  const a = activa === k;
                  const t0 = lim[k];
                  return (
                    <Celda key={k} x={x} y={y} w={350} h={290} c={c} activa={a} op={e1(t, M('seis') + k * 0.2) * (activa < 0 || a ? 1 : 0.55)}>
                      {k === 0 && t >= M('pasa') && (
                        <g transform="translate(0 20)" opacity={e1(t, M('pasa'))}>
                          <circle cx={-90} cy={10} r={32} fill={ROSA} /><path d="M -112 0 Q -90 -14 -68 0" stroke="#fff" strokeWidth={6} fill="none" />
                          <rect x={-40} y={0} width={80} height={14} rx={7} fill="#64748b" /><rect x={-52} y={-18} width={18} height={50} rx={6} fill={NARANJA} /><rect x={34} y={-18} width={18} height={50} rx={6} fill={NARANJA} />
                          <g transform="translate(100 0)"><circle cx={0} cy={18} r={11} fill="#7c3aed" /><rect x={9} y={-28} width={5} height={46} fill="#7c3aed" /></g>
                          {t >= M('joystick') && (<g opacity={e1(t, M('joystick'))} transform="translate(0 -54)"><circle r={20} fill="#1f2937" /><rect x={-5} y={14} width={10} height={20} fill="#64748b" /><path d="M -34 -30 L 34 30 M 34 -30 L -34 30" stroke={ROJO_O} strokeWidth={9} strokeLinecap="round" /></g>)}
                        </g>
                      )}
                      {k === 1 && t >= t0 && (
                        <g transform="translate(0 70)" opacity={e1(t, t0)}>
                          {[[-100, 30, NARANJA], [0, 110, '#475569'], [100, 110, '#334155']].map(([bx, h, col], j) => <rect key={j} x={(bx as number) - 32} y={-(h as number) * ac(t, t0 + 0.2 + j * 0.3, t0 + 1.2 + j * 0.3)} width={64} height={(h as number) * ac(t, t0 + 0.2 + j * 0.3, t0 + 1.2 + j * 0.3)} rx={10} fill={col as string} />)}
                        </g>
                      )}
                      {k === 2 && t >= t0 && (
                        <g transform="translate(0 50)" opacity={e1(t, t0)}>
                          <Tienda x={-20} y={30} w={140} color="#0f766e" />
                          {[0, 1, 2].map((j) => <g key={j} opacity={0.4 + 0.6 * Math.sin(t * 3 + j) ** 2}><Moneda x={86 + (j % 2) * 34} y={-34 + j * 34} r={16} /></g>)}
                        </g>
                      )}
                      {k === 3 && t >= M('wiimote') && (
                        <g transform="translate(0 30)">
                          <g opacity={e1(t, M('wiimote'))}><Mando x={-90} y={0} s={0.55} rot={-12 + 10 * Math.sin(t * 3)} /></g>
                          {t >= M('bascula') && (
                            <g opacity={e1(t, M('bascula'))} transform="translate(50 36)">
                              <rect x={-70} y={-16} width={140} height={44} rx={14} fill="#f8fafc" style={sombra(0.2, 3, 8)} /><path d="M -28 -6 q 14 -8 28 0 M 4 -6 q 14 -8 28 0" stroke="#94a3b8" strokeWidth={5} fill="none" />
                              <g transform="translate(0 -52)"><circle r={28} fill="#fecaca" /><path d="M -18 2 q 18 22 36 0" stroke={ROJO_M} strokeWidth={5} fill="none" /><path d="M 0 -12 q -14 -14 -14 2 q 0 12 14 22 q 14 -10 14 -22 q 0 -16 -14 -2 Z" fill={ROJO_M} transform="scale(0.9)" /></g>
                            </g>
                          )}
                        </g>
                      )}
                      {k === 4 && t >= t0 && (
                        <g transform="translate(0 30)" opacity={e1(t, t0)}>
                          <g transform="translate(-80 0)"><circle r={36} fill="#64748b" /><circle r={14} fill={isDark ? '#242424' : '#fff'} />{[0, 1, 2, 3, 4, 5].map((j) => <rect key={j} x={-6} y={-48} width={12} height={16} rx={3} fill="#64748b" transform={`rotate(${j * 60})`} />)}<path d="M -44 -44 L 44 44 M 44 -44 L -44 44" stroke={ROJO_O} strokeWidth={9} strokeLinecap="round" /></g>
                          <Persona id={ID} x={90} y={56} s={0.55} cuerpo="#7c3aed" />
                          <path d="M 70 -86 q 20 -20 40 0" stroke={NARANJA} strokeWidth={7} fill="none" strokeLinecap="round" />
                        </g>
                      )}
                      {k === 5 && t >= t0 && (
                        <g transform="translate(0 30)" opacity={e1(t, t0)}>
                          <g transform="translate(-70 0)"><circle cx={0} cy={-26} r={28} fill="#e5e7eb" /><path d="M -34 40 Q -34 6 0 6 Q 34 6 34 40 Z" fill="#94a3b8" /><path d="M -22 -34 Q 0 -60 22 -34" stroke="#cbd5e1" strokeWidth={8} fill="none" /></g>
                          <g transform="translate(80 -6)"><path d="M -40 8 Q -52 -28 -16 -34 Q 4 -50 28 -32 Q 54 -20 44 6 Q 52 34 18 36 Q -6 52 -30 34 Q -50 30 -40 8 Z" fill={ROSA} opacity={0.85} /><path d="M 0 -30 V 34 M -24 -6 Q 0 0 22 -10" stroke="#fff" strokeWidth={4} fill="none" /></g>
                        </g>
                      )}
                    </Celda>
                  );
                })}
              </g>
            )}

            {/* C · los tres no clientes */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <g opacity={e1(t, M('clave'))}>
                  <Persona id={ID} x={220} y={780} s={0.62} cuerpo={isDark ? '#8da2c0' : '#334155'} corbata />
                  <Txt x={220} y={640} textAnchor="middle" fontSize={44} fill={ROSA}>?</Txt>
                </g>
                {t >= M('nopeleo') && (
                  <g opacity={e1(t, M('nopeleo'))}>
                    <Consola x={150} y={500} s={0.5} /><rect x={226} y={430} width={70} height={140} rx={12} fill="#334155" />
                    <Flecha x1={190} y1={400} x2={190} y2={330} color={ROJO_O} grosor={0.1} op={0} />
                    <path d="M 120 390 H 300" stroke={ROJO_O} strokeWidth={8} strokeDasharray="12 12" strokeLinecap="round" opacity={0.8} />
                  </g>
                )}
                <g opacity={e1(t, M('clave') + 0.4)}>
                  <Persona id={ID} x={600} y={780} s={0.62} cuerpo="#be123c" />
                  {t < M('sedujo') && <path d="M 560 700 L 640 660 M 640 700 L 560 660" stroke={ROJO_O} strokeWidth={8} strokeLinecap="round" opacity={0.0} />}
                </g>
                {t >= M('sedujo') && (
                  <g opacity={e1(t, M('sedujo'))}>
                    {[0, 1, 2].map((j) => <path key={j} d={`M ${560 + j * 40} 560 q -10 -20 0 -40 q 10 20 0 40 Z`} fill="#f8fafc" stroke="#cbd5e1" strokeWidth={3} />)}
                    <circle cx={600 + 70 * Math.sin(t * 2)} cy={610} r={18} fill={AZUL_M} /><Mando x={540} y={680} s={0.5} rot={-20} />
                  </g>
                )}
                <g opacity={e1(t, M('clave') + 0.8)}>
                  <Persona id={ID} x={980} y={780} s={0.62} cuerpo="#94a3b8" />
                  <path d="M 950 640 q 30 -26 60 0" stroke="#e5e7eb" strokeWidth={12} fill="none" strokeLinecap="round" />
                </g>
                {t >= M('atrajo') && (
                  <g opacity={e1(t, M('atrajo'))}><Mando x={1070} y={700} s={0.5} rot={20 * Math.sin(t * 3)} /><Moneda x={900} y={620} r={20} /></g>
                )}
                {/* ochenta frente a cuarenta */}
                {t >= M('cuarenta') && (
                  <g opacity={e1(t, M('cuarenta'))}>
                    <rect x={440} y={170} width={320} height={260} rx={24} fill={c.panel} style={sombra(c.sombra, 8, 20)} />
                    <rect x={490} y={400 - 200 * barra(0)} width={90} height={200 * barra(0)} rx={12} fill={`url(#${ID}-marca)`} />
                    <rect x={620} y={400 - 100 * barra(1)} width={90} height={100 * barra(1)} rx={12} fill={c.apagado} />
                    <Txt f="a" x={535} y={396 - 200 * barra(0) - 10} textAnchor="middle" fontSize={34} fill={c.texto}>80</Txt>
                    <Txt f="a" x={665} y={396 - 100 * barra(1) - 10} textAnchor="middle" fontSize={34} fill={c.texto}>40</Txt>
                  </g>
                )}
              </g>
            )}

            {/* D · la Wii U frente a tabletas y teléfonos */}
            {aD > 0.01 && (
              <g opacity={aD}>
                <Chip x={600} y={200} texto="2012" c={c} id={ID} op={e1(t, M('en2012'))} marca />
                <g opacity={e1(t, M('wiiu'))}>
                  <Consola x={230} y={500} s={1.2} /><rect x={310} y={420} width={160} height={110} rx={14} fill="#1f2937" /><rect x={322} y={432} width={136} height={86} rx={8} fill={AZUL_M} />
                  <Flecha x1={300} y1={640} x2={300} y2={730} color={ROJO_O} grosor={14} />
                </g>
                <g opacity={e1(t, M('en2012') + 1.5)}>
                  <g transform="translate(700 520)"><rect x={-100} y={-80} width={200} height={150} rx={18} fill="#334155" /><rect x={-86} y={-66} width={172} height={122} rx={10} fill={AZUL_M} /></g>
                  <g transform="translate(900 530)"><rect x={-44} y={-90} width={88} height={170} rx={18} fill="#334155" /><rect x={-36} y={-76} width={72} height={142} rx={9} fill={ROSA} /></g>
                  <Flecha x1={820} y1={720} x2={820} y2={640} color="#10b981" grosor={14} />
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
