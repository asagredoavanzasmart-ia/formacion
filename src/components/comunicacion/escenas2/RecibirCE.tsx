import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, PanelPregunta, Rotulo, Visto, ESCUDO, MIN_TXT, W, H, borde, e1, escribe, marcador, ventana } from '../escenas/comunCE';
import { SeisPasos } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Conócete, separa y escucha» (Heen y Stone, pasos 1 a 3), escena propia. Arriba, los seis pasos. Acto
 * A: tus tendencias (el escudo de quien se defiende, la tetera que hierve por dentro); Michael escribe en
 * un buscador «lo que está mal en mí», aparecen 1,2 millones de resultados con anuncios de su padre y su
 * expareja, y duerme sobre el tema. Acto B: Janet en el centro de su evaluación de 360 grados: pares y
 * jefes en verde, su equipo en rojo; dos problemas que no se excluyen y la pregunta a su equipo. Acto C:
 * evaluación («un 4») frente a coaching («así puedes mejorar»); James oye la sugerencia del directorio como
 * una pista y no como una crítica velada.
 */

const ID = 'ce2r';
const nombres = ['seis', 'tendencias', 'defiendes', 'hierves', 'michael', 'profesionalismo', 'malEnMi', 'millones', 'padre', 'duerme', 'queQuien', 'janet', 'g360', 'subordinados', 'estandares', 'excluyentes', 'queHacia', 'coaching', 'calificacion', 'mejorar', 'peor', 'james', 'analistas', 'velada', 'pregunta'] as const;

export const RecibirCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('velada') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Seis pasos para recibir'], [M('tendencias'), '1 · Tus tendencias'], [M('michael'), 'Michael'], [M('duerme'), 'Dormir sobre el tema'],
    [M('queQuien'), '2 · El qué y el quién'], [M('janet'), 'Janet'], [M('excluyentes'), 'Dos problemas, no uno'], [M('coaching'), '3 · Escucha el coaching'],
    [M('peor'), 'Suponemos lo peor'], [M('james'), 'James'], [M('velada'), 'Una pista, no un ataque'],
  ];

  const activo = t > M('coaching') ? 2 : t > M('queQuien') ? 1 : t > M('tendencias') ? 0 : -1;
  const aA = ventana(t, -1, M('queQuien'));
  const aB = ventana(t, M('queQuien'), M('coaching'));
  const aC = ac(t, M('coaching'), M('coaching') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Conocer tus reacciones, separar el qué del quién y escuchar el consejo dentro de la crítica">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <SeisPasos t={t} t0={M('seis')} activo={activo} c={c} id={ID} />

            {/* A · tus tendencias y Michael */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const busca = ac(t, M('malEnMi') - 0.8, M('malEnMi') + 1.2);
                  return (
                    <g>
                      <g opacity={ventana(t, M('tendencias'), M('michael'))}>
                        <g opacity={e1(t, M('defiendes'))} transform="translate(420 470) scale(2.2)"><path d={ESCUDO} fill={c.tenue} /></g>
                        <Etiqueta x={420} y={630} texto="te defiendes" op={e1(t, M('defiendes'))} c={c} id={ID} />
                        <g opacity={e1(t, M('hierves'))}>
                          <path d="M 700 520 Q 700 420 800 420 Q 900 420 900 520 Z" fill={c.tenue} />
                          <rect x={690} y={516} width={220} height={20} rx={8} fill={c.apagado} />
                          {[0, 1, 2].map((k) => <path key={k} d={`M ${760 + k * 40} 400 q 10 -20 0 -40`} stroke={c.apagado} strokeWidth={5} fill="none" opacity={0.5 + 0.5 * Math.sin(t * 6 + k)} />)}
                          <path d="M 770 470 Q 800 490 830 470" stroke="#fff" strokeWidth={5} fill="none" />
                          <Etiqueta x={800} y={630} texto="hierves por dentro" op={1} c={c} id={ID} />
                        </g>
                      </g>
                      <g opacity={e1(t, M('michael'))}>
                        <Persona id={ID} x={190} y={760} cuerpo="#334155" corbata />
                        <Gesto x={190} y={760} animo={-0.6 * ac(t, M('profesionalismo'), M('profesionalismo') + 0.6) * (1 - ac(t, M('duerme') + 1, M('duerme') + 2)) + 0.2} />
                        <Etiqueta x={190} y={820} texto="Michael" op={1} c={c} id={ID} />
                      </g>
                      {/* el buscador */}
                      <g opacity={ventana(t, M('malEnMi') - 0.8, M('duerme') + 0.5)}>
                        <rect x={350} y={280} width={720} height={420} rx={18} fill={c.panel} style={sombra(c.sombra)} />
                        <rect x={380} y={310} width={660} height={56} rx={28} fill={c.panel2} />
                        <Txt f="a" x={410} y={348} fontSize={MIN_TXT} fill={c.texto}>{escribe('lo que está mal en mí', busca)}</Txt>
                        <Txt f="a" x={390} y={410} fontSize={24} fill={c.tenue} opacity={e1(t, M('millones'))}>1,2 millones de resultados</Txt>
                        <g opacity={e1(t, M('padre'))}>
                          {['anuncio: tu padre', 'anuncio: tu expareja'].map((txt, k) => (
                            <g key={txt}>
                              <rect x={390} y={440 + k * 90} width={640} height={70} rx={12} fill="#fef3c7" />
                              <Txt f="a" x={410} y={484 + k * 90} fontSize={MIN_TXT} fill="#92400e">{txt}</Txt>
                            </g>
                          ))}
                        </g>
                      </g>
                      <g opacity={e1(t, M('duerme') + 0.5)}>
                        <circle cx={420} cy={380} r={50} fill="#fde68a" /><circle cx={444} cy={366} r={46} fill={isDark ? '#121212' : '#f8f9fa'} />
                        {['Z', 'Z', 'Z'].map((z, k) => <Txt key={k} x={520 + k * 50} y={420 - k * 40 - 6 * Math.sin(t * 2 + k)} fontSize={36 + k * 8} fill={c.tenue}>{z}</Txt>)}
                        <Chip x={800} y={560} texto="al otro día, ¿qué aprendo?" c={c} id={ID} op={e1(t, M('duerme') + 2)} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · Janet: el qué y el quién */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const ambos = ac(t, M('excluyentes'), M('excluyentes') + 1);
                  const anillo = [[600, 280, 'p'], [810, 360, 'p'], [880, 540, 'j'], [810, 700, 's'], [600, 760, 's'], [390, 700, 's'], [320, 540, 'j'], [390, 360, 'p']] as const;
                  return (
                    <g>
                      <g opacity={ventana(t, M('janet'), M('excluyentes'))}>
                        <Persona id={ID} x={600} y={600} s={0.9} cuerpo="#be185d" pelo="#2b1a12" />
                        <Gesto x={600} y={600} s={0.9} animo={0.4} />
                        <Etiqueta x={600} y={655} texto="Janet" op={1} c={c} id={ID} />
                        {anillo.map(([x, y, tipo], k) => {
                          const sub = tipo === 's';
                          const op = sub ? e1(t, M('subordinados')) : e1(t, M('g360') + k * 0.1);
                          return (
                            <g key={k} opacity={op}>
                              <circle cx={x} cy={y - 10} r={20} fill={sub ? '#dc2626' : '#15803d'} />
                              <path d={`M ${x - 28} ${y + 34} Q ${x} ${y + 2} ${x + 28} ${y + 34} Z`} fill={sub ? '#fca5a5' : '#86efac'} />
                            </g>
                          );
                        })}
                        <Chip x={1010} y={260} texto="360 grados" c={c} id={ID} op={e1(t, M('g360'))} />
                        <Chip x={260} y={260} texto="es culpa de ellos" c={c} id={ID} op={e1(t, M('estandares'))} />
                      </g>
                      <g opacity={ambos}>
                        <rect x={190} y={240} width={360} height={150} rx={18} fill={c.panel} style={sombra(c.sombra)} />
                        <Txt f="a" x={370} y={310} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>su equipo</Txt>
                        <Visto x={370} y={355} s={0.7} />
                        <rect x={650} y={240} width={360} height={150} rx={18} fill={c.panel} style={sombra(c.sombra)} />
                        <Txt f="a" x={830} y={310} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>su liderazgo</Txt>
                        <Visto x={830} y={355} s={0.7} />
                        <Persona id={ID} x={600} y={780} s={0.8} cuerpo="#be185d" pelo="#2b1a12" />
                        <Gesto x={600} y={780} s={0.8} animo={0.4} />
                        <g opacity={e1(t, M('queHacia'))}>
                          <Burbuja x={620} y={630} w={560} texto="¿Qué hago yo que les complica el trabajo?" u={ac(t, M('queHacia'), M('queHacia') + 2)} c={c} id={ID} marca />
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · evaluación o coaching; James */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const james = ac(t, M('james') - 0.2, M('james') + 0.6);
                  return (
                    <g>
                      <g opacity={1 - james}>
                        <g opacity={e1(t, M('calificacion'))}>
                          <rect x={220} y={330} width={300} height={260} rx={18} fill={c.panel} style={sombra(c.sombra)} />
                          <Txt x={370} y={490} textAnchor="middle" fontSize={120} fill={c.tenue}>4</Txt>
                          <Etiqueta x={370} y={650} texto="evalúa" op={1} c={c} id={ID} />
                        </g>
                        <g opacity={e1(t, M('mejorar'))}>
                          <path d="M 700 580 L 780 500 L 850 530 L 960 380" stroke={`url(#${ID}-marcaH)`} strokeWidth={12} fill="none" strokeLinecap="round" />
                          <path d="M 930 380 L 966 372 L 958 410" stroke={ROSA} strokeWidth={12} fill="none" strokeLinecap="round" />
                          <Etiqueta x={830} y={650} texto="entrena" op={1} c={c} id={ID} marca />
                        </g>
                        <Chip x={600} y={260} texto="oímos evaluación" c={c} id={ID} op={e1(t, M('peor'))} />
                      </g>
                      <g opacity={james}>
                        <Persona id={ID} x={220} y={760} cuerpo="#1e3a8a" corbata />
                        <Gesto x={220} y={760} animo={0.5} />
                        <Etiqueta x={220} y={820} texto="James" op={1} c={c} id={ID} />
                        <Persona id={ID} x={980} y={760} cuerpo="#1f2937" pelo="#9ca3af" corbata />
                        <Gesto x={980} y={760} animo={0.3} />
                        <Etiqueta x={980} y={820} texto="directorio" op={1} c={c} id={ID} />
                        <g opacity={e1(t, M('analistas'))}>
                          <rect x={470} y={300} width={280} height={190} rx={14} fill={c.panel} style={sombra(c.sombra)} />
                          <path d="M 500 450 L 560 420 L 620 430 L 700 340" stroke={NARANJA} strokeWidth={7} fill="none" />
                          <Txt f="a" x={610} y={540} textAnchor="middle" fontSize={26} fill={c.texto}>analistas, primero</Txt>
                        </g>
                        <g opacity={e1(t, M('velada'))}>
                          <Chip x={600} y={640} texto="una pista" c={c} id={ID} op={1} marca />
                          <Txt f="a" x={600} y={750} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>crítica velada</Txt>
                          <line x1={500} y1={740} x2={700} y2={740} stroke="#c2263e" strokeWidth={5} />
                        </g>
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
