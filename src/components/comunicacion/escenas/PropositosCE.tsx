import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Cara, Chip, Cruz, Etiqueta, Gesto, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Cada propósito, su historia» (Denning), escena propia. Arriba, siete fichas numeradas, una por
 * propósito, que se encienden en orden. Acto A: el trampolín: alguien salta sobre una historia real y
 * reciente, con final feliz, y un control que se fija en el detalle justo. Acto B: quién eres: Jack Welch
 * con su palo de hockey y la frase de su madre. Acto C: la parábola de los valores y la historia que
 * provoca otras. Acto D: el rumor que se desinfla con humor y los técnicos de Xerox que intercambian
 * códigos de error. Acto E: hacia el futuro: un camino que se pierde en la niebla, los atriles de
 * Churchill y King, «número uno o número dos» y la predicción precisa, tachada.
 */

const ID = 'ce28';
const nombres = ['proposito', 'accion', 'trampolin', 'real', 'feliz', 'detalle', 'quien', 'welch', 'hockey', 'perder', 'valores', 'parabola', 'colaboracion', 'rumor', 'humor', 'conocimiento', 'xerox', 'codigos', 'futuro', 'vago', 'churchill', 'mlk', 'numeroUno', 'precisas', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Fila de siete propósitos con pictogramas. */
const Fila: React.FC<{ t: number; entra: number[]; activo: number; c: C; id: string }> = ({ t, entra, activo, c, id }) => (
  <g>
    {entra.map((t0, k) => {
      const op = ac(t, t0, t0 + 0.4);
      if (op < 0.01) return null;
      const x = 180 + k * 140, on = k === activo;
      const tinta = on ? '#fff' : c.tenue;
      return (
        <g key={k} opacity={op * (on ? 1 : 0.6)} transform={`translate(${x} 170) scale(${on ? 1.1 : 1})`}>
          <rect x={-52} y={-40} width={104} height={80} rx={18} fill={on ? `url(#${id}-marca)` : c.panel2} style={sombra(c.sombra, 3, 8)} />
          <Txt x={-30} y={-10} textAnchor="middle" fontSize={26} fill={tinta}>{k + 1}</Txt>
          <g transform="translate(14 8)" fill={tinta} stroke={tinta} strokeWidth={4} strokeLinecap="round">
            {k === 0 && <path d="M -18 14 H 18 M -12 14 Q 0 22 12 14 M 0 6 V -18 M -8 -10 L 0 -18 L 8 -10" fill="none" />}
            {k === 1 && <g stroke="none"><circle cx={0} cy={-8} r={9} /><path d="M -16 18 Q 0 -4 16 18 Z" /></g>}
            {k === 2 && <path d="M -14 -18 H 10 Q 16 -18 16 -12 V 18 H -8 Q -14 18 -14 12 Z" fill="none" />}
            {k === 3 && <g fill="none"><circle cx={-8} cy={-4} r={9} /><circle cx={9} cy={4} r={9} /></g>}
            {k === 4 && <g fill="none"><circle cx={0} cy={0} r={16} /><path d="M -8 4 Q 0 12 8 4" /></g>}
            {k === 5 && <g stroke="none"><circle cx={0} cy={0} r={8} /><path d="M -2 -18 h 4 v 8 h -4 Z M -2 10 h 4 v 8 h -4 Z M -18 -2 v 4 h 8 v -4 Z M 10 -2 v 4 h 8 v -4 Z" /></g>}
            {k === 6 && <path d="M -18 16 L 0 -16 L 18 16" fill="none" />}
          </g>
        </g>
      );
    })}
  </g>
);

/* Trampolín con resortes. */
const Trampolin: React.FC<{ x: number; y: number; hunde: number; c: C; id: string }> = ({ x, y, hunde, c, id }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={90} rx={200} ry={16} fill="#000" opacity={0.12} />
    <path d={`M -180 0 Q 0 ${40 * hunde} 180 0`} stroke={`url(#${id}-marca)`} strokeWidth={14} fill="none" strokeLinecap="round" />
    {[-180, 180].map((dx) => <rect key={dx} x={dx - 8} y={0} width={16} height={86} rx={6} fill={c.tenue} />)}
    <rect x={-190} y={-6} width={380} height={10} rx={5} fill={c.apagado} opacity={0.5} />
  </g>
);

/* Fotocopiadora. */
const Copiadora: React.FC<{ x: number; y: number; t: number; c: C }> = ({ x, y, t, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-110} y={-140} width={220} height={140} rx={12} fill={c.panel} style={sombra(c.sombra)} />
    <rect x={-120} y={-160} width={240} height={30} rx={8} fill={c.apagado} />
    <rect x={30} y={-120} width={60} height={30} rx={4} fill="#1f2937" />
    <Txt x={60} y={-98} textAnchor="middle" fontSize={18} fill="#f87171" opacity={0.6 + 0.4 * Math.sin(t * 6)}>E53</Txt>
    <rect x={-90} y={-70} width={120} height={14} rx={4} fill={c.panel2} />
  </g>
);

export const PropositosCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('precisas') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Según el propósito'], [M('accion'), 'Mover a la acción'], [M('real'), 'Real y reciente'], [M('feliz'), 'Final feliz'],
    [M('detalle'), 'El detalle justo'], [M('quien'), 'Quién eres'], [M('welch'), 'Jack Welch'], [M('valores'), 'Valores'],
    [M('colaboracion'), 'Colaboración'], [M('rumor'), 'Frenar un rumor'], [M('conocimiento'), 'Compartir conocimiento'], [M('futuro'), 'Hacia el futuro'],
    [M('churchill'), 'Churchill y King'], [M('numeroUno'), 'Número uno o dos'], [M('precisas'), 'Sin predicciones precisas'],
  ];

  const entra = [M('accion'), M('quien'), M('valores'), M('colaboracion'), M('rumor'), M('conocimiento'), M('futuro')];
  const activo = [...entra].reverse().findIndex((x) => t >= x);
  const act = activo < 0 ? -1 : 6 - activo;

  const aA = ventana(t, -1, M('quien'));
  const aB = ventana(t, M('quien'), M('valores'));
  const aC = ventana(t, M('valores'), M('rumor'));
  const aD = ventana(t, M('rumor'), M('futuro'));
  const aE = ac(t, M('futuro'), M('futuro') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cada propósito pide su historia: acción, quién eres, valores, colaboración, rumores, conocimiento y futuro">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <Fila t={t} entra={entra} activo={act} c={c} id={ID} />

            {/* A · la historia trampolín */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const salto = e1(t, M('trampolin'));
                  const ciclo = (t * 0.9) % 1;
                  const alto = salto * 220 * Math.sin(Math.PI * ciclo);
                  const hunde = salto * Math.max(0, Math.cos(Math.PI * ciclo) ** 8);
                  const perilla = M('detalle') < t ? 0.5 + 0.35 * Math.sin(t * 4) * (1 - ac(t, M('detalle') + 0.5, M('detalle') + 2.5)) : 0.85;
                  return (
                    <g>
                      <g opacity={salto}>
                        <Trampolin x={600} y={690} hunde={hunde} c={c} id={ID} />
                        <Persona id={ID} x={600} y={680 - alto + 30 * hunde} s={0.8} cuerpo="#334155" />
                        <Gesto x={600} y={680 - alto + 30 * hunde} s={0.8} animo={0.8} />
                      </g>
                      <Chip x={280} y={320} texto="real y reciente" c={c} id={ID} op={e1(t, M('real'))} />
                      <Chip x={280} y={410} texto="final feliz" c={c} id={ID} op={e1(t, M('feliz'))} marca />
                      <g opacity={e1(t, M('detalle'))}>
                        <rect x={820} y={400} width={240} height={14} rx={7} fill={c.apagado} />
                        <circle cx={820 + 240 * perilla} cy={407} r={20} fill={`url(#${ID}-marca)`} />
                        <Txt f="a" x={830} y={380} fontSize={22} fill={c.tenue}>menos</Txt>
                        <Txt f="a" x={1060} y={380} textAnchor="end" fontSize={22} fill={c.tenue}>más</Txt>
                        <Etiqueta x={940} y={470} texto="detalle justo" op={1} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · quién eres: Welch y el hockey */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const golpe = (t * 0.7) % 1;
                  return (
                    <g>
                      <g opacity={ventana(t, M('quien') + 0.3, M('welch'))}>
                        <Chip x={600} y={330} texto="fortaleza" c={c} id={ID} op={1} />
                        <Chip x={600} y={420} texto="vulnerabilidad" c={c} id={ID} op={e1(t, M('quien') + 1.4)} />
                      </g>
                      <g opacity={e1(t, M('welch'))}>
                        <Persona id={ID} x={300} y={760} cuerpo="#1e3a8a" />
                        <Gesto x={300} y={760} animo={-0.4 * ac(t, M('hockey'), M('hockey') + 0.6) + 0.5 * ac(t, M('perder') + 1.5, M('perder') + 2.5)} />
                        <Etiqueta x={300} y={820} texto="Jack Welch" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('hockey'))}>
                        <g transform={`translate(350 680) rotate(${-20 + 15 * Math.sin(t * 3)})`}>
                          <rect x={-5} y={-10} width={10} height={110} rx={4} fill="#a16207" />
                          <path d="M -5 96 H 50 Q 56 96 56 104 H -5 Z" fill="#a16207" />
                        </g>
                        <ellipse cx={420 + 120 * golpe} cy={780} rx={16} ry={6} fill="#1f2937" />
                      </g>
                      <g opacity={e1(t, M('hockey') + 0.6)}>
                        <Persona id={ID} x={860} y={760} cuerpo="#7c3aed" pelo="#9ca3af" />
                        <Gesto x={860} y={760} animo={-0.2} />
                        <Etiqueta x={860} y={820} texto="su madre" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('perder') - 0.3)}>
                        <Burbuja x={840} y={560} w={520} texto="Si no sabes perder, nunca sabrás ganar." u={ac(t, M('perder') - 0.3, M('perder') + 2)} c={c} lado="der" id={ID} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · la parábola y la historia que provoca otras */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <g opacity={e1(t, M('parabola'))}>
                  <g transform="translate(330 470)">
                    <path d="M -170 -110 Q -85 -140 0 -110 V 120 Q -85 90 -170 120 Z" fill={c.blanco} style={sombra(c.sombra)} />
                    <path d="M 170 -110 Q 85 -140 0 -110 V 120 Q 85 90 170 120 Z" fill={c.blanco} style={sombra(c.sombra)} />
                    <path d="M 0 -110 V 120" stroke={NARANJA} strokeWidth={6} />
                    {/* la tortuga y la liebre, una fábula sencilla */}
                    <ellipse cx={-90} cy={10} rx={44} ry={26} fill="#15803d" /><circle cx={-40} cy={10} r={12} fill="#16a34a" />
                    <ellipse cx={90} cy={0} rx={30} ry={18} fill="#a8a29e" /><ellipse cx={104} cy={-26} rx={6} ry={20} fill="#a8a29e" />
                  </g>
                  <Etiqueta x={330} y={650} texto="parábola" op={1} c={c} id={ID} marca />
                </g>
                <g opacity={e1(t, M('colaboracion'))}>
                  {(() => {
                    const brotan = ac(t, M('colaboracion') + 0.8, M('colaboracion') + 3);
                    const hijos = [[760, 300], [1000, 330], [880, 590], [1040, 520], [720, 540]];
                    return (
                      <g>
                        <ellipse cx={880} cy={440} rx={90} ry={60} fill={`url(#${ID}-marca)`} />
                        <path d="M 850 495 L 830 530 L 880 498 Z" fill={ROSA} />
                        <path d="M 845 440 h 70" stroke="#fff" strokeWidth={8} strokeLinecap="round" />
                        {hijos.map(([x, y], k) => {
                          const u = ac(brotan, k / 6, k / 6 + 0.3);
                          return <g key={k} opacity={u} transform={`translate(${880 + (x - 880) * u} ${440 + (y - 440) * u})`}><ellipse rx={44} ry={30} fill={c.panel2} style={sombra(c.sombra, 2, 6)} /><path d="M -18 0 h 36" stroke={c.tenue} strokeWidth={5} strokeLinecap="round" /></g>;
                        })}
                        <Etiqueta x={880} y={680} texto="colaboración" op={1} c={c} id={ID} />
                      </g>
                    );
                  })()}
                </g>
              </g>
            )}

            {/* D · el rumor que se desinfla y los técnicos de Xerox */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const desinfla = ac(t, M('humor') + 0.6, M('humor') + 2.5);
                  const tecnicos = e1(t, M('conocimiento'));
                  return (
                    <g>
                      <g opacity={1 - ac(t, M('conocimiento') - 0.3, M('conocimiento'))}>
                        <g transform={`translate(330 420) scale(${1.2 - 0.6 * desinfla})`}>
                          <ellipse rx={170} ry={110} fill={c.apagado} />
                          <path d="M -40 100 L -70 150 L 0 104 Z" fill={c.apagado} />
                          <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>Dicen que…</Txt>
                        </g>
                        <g opacity={e1(t, M('humor'))}><Cara x={760} y={440} r={70} id={ID} boca={1} cejas={-0.3} /></g>
                        <Etiqueta x={760} y={560} texto="humor suave" op={e1(t, M('humor'))} c={c} id={ID} />
                      </g>
                      <g opacity={tecnicos}>
                        <Copiadora x={600} y={720} t={t} c={c} />
                        {[300, 900].map((x, k) => (
                          <g key={x}>
                            <Persona id={ID} x={x} y={760} cuerpo="#0e7490" pelo={k ? '#5b3a26' : '#2b1a12'} />
                            <Gesto x={x} y={760} animo={0.5} />
                          </g>
                        ))}
                        <Etiqueta x={600} y={800} texto="Xerox" op={e1(t, M('xerox'))} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('codigos'))}>
                        <Burbuja x={320} y={560} w={300} texto="¿El E53?" u={1} c={c} id={ID} />
                        <Burbuja x={900} y={560} w={340} texto="Es el sensor." u={ac(t, M('codigos') + 1.2, M('codigos') + 2.2)} c={c} lado="der" id={ID} marca />
                        <Chip x={600} y={330} texto="causa y efecto" c={c} id={ID} op={e1(t, M('codigos') + 2.6)} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* E · hacia el futuro: vago, no preciso */}
            {aE > 0.01 && (
              <g opacity={aE}>
                {(() => {
                  const niebla = ac(t, M('vago'), M('vago') + 1.5);
                  return (
                    <g>
                      <path d="M 420 820 L 580 300 L 620 300 L 780 820 Z" fill={c.apagado} opacity={0.6} />
                      <path d="M 600 800 L 600 320" stroke="#fff" strokeWidth={6} strokeDasharray="30 30" strokeDashoffset={-t * 60} opacity={0.8} />
                      <ellipse cx={600} cy={300} rx={260} ry={60} fill={c.panel2} opacity={0.9 * niebla} />
                      <ellipse cx={600} cy={330} rx={200} ry={40} fill={c.panel2} opacity={0.7 * niebla} />
                      {([['Churchill', 200, M('churchill')], ['M. L. King', 1000, M('mlk')]] as const).map(([txt, x, t0]) => (
                        <g key={txt} opacity={e1(t, t0)}>
                          <Persona id={ID} x={x} y={700} s={0.8} cuerpo="#1f2937" />
                          <Gesto x={x} y={700} s={0.8} animo={0.4} />
                          <path d={`M ${x - 50} 690 H ${x + 50} L ${x + 40} 780 H ${x - 40} Z`} fill={c.tenue} />
                          <Etiqueta x={x} y={825} texto={txt} op={1} c={c} id={ID} />
                        </g>
                      ))}
                      <Chip x={600} y={420} texto="Nº 1 o Nº 2" c={c} id={ID} op={ventana(t, M('numeroUno'), M('precisas'))} marca />
                      <g opacity={e1(t, M('precisas'))}>
                        <rect x={520} y={360} width={160} height={150} rx={14} fill={c.blanco} style={sombra(c.sombra)} />
                        <rect x={520} y={360} width={160} height={40} rx={14} fill={ROSA} />
                        <Txt x={600} y={470} textAnchor="middle" fontSize={44} fill={c.texto}>12/03</Txt>
                        <g opacity={e1(t, M('precisas') + 0.6)}><Cruz x={680} y={370} s={0.9} /></g>
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
