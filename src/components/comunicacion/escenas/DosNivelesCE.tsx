import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Estrella, Etiqueta, Gesto, Hoja, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Cada frase, dos niveles», escena propia. Acto A: entre quien habla y quien escucha corren dos carriles:
 * el de las ideas (hojas) y el de la relación (escalones de estatus y círculos de cercanía). Acto B: seis
 * casos en que la misma frase dice otra cosa: «nosotros» y la estrella del crédito que se va a otro; las
 * notas predichas en público y en privado; la médica de las preguntas; el informe con elogios; la
 * indirección y la semana sin hacer nada; el copiloto que insinúa el hielo y el avión que cae al Potomac
 * (5 de 74). Acto C: no hay una mejor manera (situación, cultura, rango, estilos) y en ventas no se lee al
 * cliente con el propio manual.
 */

const ID = 'ce1n';
const nombres = ['niveles', 'ideas', 'relacion', 'distintas', 'nosotros', 'credito', 'experimento', 'publico', 'privado', 'arrogantes', 'preguntarMucho', 'medica', 'masPreguntas', 'elogios', 'informe', 'dijiste', 'indireccion', 'sentiria', 'nada', 'copiloto', 'potomac', 'cinco74', 'mejorManera', 'ventas', 'manual', 'pregunta'] as const;

/* Avión de pasajeros visto de lado. */
const Avion: React.FC<{ x: number; y: number; rot: number; c: Tono; id: string }> = ({ x, y, rot, c, id }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -90 -6 Q -90 -20 -70 -20 L 70 -20 Q 100 -18 104 0 Q 100 14 70 14 L -70 14 Q -90 12 -90 -6 Z" fill={c.blanco} style={sombra(c.sombra, 4, 8)} />
    <path d="M -80 -18 L -98 -52 L -70 -52 L -50 -18 Z" fill={`url(#${id}-marca)`} />
    <path d="M -10 2 L -40 40 L -10 40 L 30 2 Z" fill={c.tenue} />
    {[-50, -28, -6, 16, 38].map((wx) => <circle key={wx} cx={wx} cy={-6} r={4.5} fill={c.apagado} />)}
    <path d="M 80 -14 Q 96 -12 100 -2 L 80 -2 Z" fill="#60a5fa" />
  </g>
);

/* Copo de nieve (hielo). */
const Copo: React.FC<{ x: number; y: number; r?: number; op?: number }> = ({ x, y, r = 14, op = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={op} stroke="#93c5fd" strokeWidth={3.5} strokeLinecap="round">
    {[0, 60, 120].map((a) => <line key={a} x1={-r} y1={0} x2={r} y2={0} transform={`rotate(${a})`} />)}
  </g>
);

export const DosNivelesCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('manual') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Cada frase, dos niveles'], [M('ideas'), 'Ideas'], [M('relacion'), 'Ideas y relación'], [M('distintas'), 'Mismas palabras, otro sentido'],
    [M('nosotros'), '«Nosotros» en vez de «yo»'], [M('experimento'), 'Predecir la nota'], [M('arrogantes'), 'No era falta de confianza'],
    [M('preguntarMucho'), 'Preguntar mucho'], [M('elogios'), 'Elogiar primero'], [M('indireccion'), 'La indirección sale cara'],
    [M('copiloto'), 'Una insinuación'], [M('mejorManera'), 'No hay una mejor manera'], [M('ventas'), 'En ventas'],
  ];

  const aA = ventana(t, -1, M('nosotros'));
  const ex = [
    ventana(t, M('nosotros'), M('experimento') + 2), ventana(t, M('experimento') + 2, M('preguntarMucho')), ventana(t, M('preguntarMucho'), M('elogios')),
    ventana(t, M('elogios'), M('indireccion')), ventana(t, M('indireccion'), M('copiloto') + 0.3), ventana(t, M('copiloto') + 0.3, M('mejorManera')),
  ];
  const aC1 = ventana(t, M('mejorManera'), M('ventas'));
  const aC2 = ac(t, M('ventas'), M('ventas') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cada frase comunica ideas y negocia la relación; por eso la misma frase puede costar crédito, notas o un avión">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · dos carriles: ideas y relación */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <Persona id={ID} x={190} y={740} />
                <Persona id={ID} x={1010} y={740} cuerpo="#64748b" pelo="#5b3a26" />
                {(() => {
                  const carril = (y: number, txt: string, t0: number, dibujo: (k: number) => React.ReactNode) => {
                    const op = e1(t, t0);
                    if (op < 0.01) return null;
                    return (
                      <g opacity={op}>
                        <Etiqueta x={600} y={y - 56} texto={txt} op={1} c={c} id={ID} />
                        <rect x={290} y={y - 34} width={620} height={68} rx={34} fill={c.panel2} />
                        {[0, 1, 2].map((k) => {
                          const u = (t * 0.22 + k / 3) % 1;
                          return <g key={k} transform={`translate(${320 + u * 560} ${y})`} opacity={Math.sin(Math.PI * u)}>{dibujo(k)}</g>;
                        })}
                      </g>
                    );
                  };
                  return (
                    <g>
                      {carril(320, 'ideas', M('ideas'), () => <g><rect x={-18} y={-22} width={36} height={44} rx={6} fill={c.blanco} style={sombra(c.sombra, 2, 4)} /><rect x={-10} y={-10} width={20} height={4} rx={2} fill={c.apagado} /><rect x={-10} y={0} width={14} height={4} rx={2} fill={c.apagado} /></g>)}
                      {carril(540, 'relación', M('relacion'), (k) => k % 2 === 0
                        ? <g fill={NARANJA}><rect x={-24} y={6} width={16} height={14} rx={3} /><rect x={-8} y={-6} width={16} height={26} rx={3} /><rect x={8} y={-18} width={16} height={38} rx={3} /></g>
                        : <g><circle cx={-9} cy={0} r={14} fill={ROSA} /><circle cx={9} cy={0} r={14} fill={NARANJA} opacity={0.85} /></g>)}
                      <g opacity={e1(t, M('relacion') + 0.8)}>
                        <Txt f="a" x={450} y={630} textAnchor="middle" fontSize={MIN_TXT} fill={NARANJA}>estatus</Txt>
                        <Txt f="a" x={750} y={630} textAnchor="middle" fontSize={MIN_TXT} fill={ROSA}>cercanía</Txt>
                      </g>
                      <Chip x={600} y={170} texto="mismas palabras, otro sentido" c={c} id={ID} op={e1(t, M('distintas'))} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B1 · «nosotros»: el crédito se va a otro */}
            {ex[0] > 0.01 && (
              <g opacity={ex[0]}>
                {(() => {
                  const va = ac(t, M('credito'), M('credito') + 1.2);
                  return (
                    <g>
                      <Persona id={ID} x={330} y={700} />
                      <Gesto x={330} y={700} animo={0.6 - 0.9 * va} />
                      <Persona id={ID} x={870} y={700} cuerpo="#64748b" pelo="#5b3a26" corbata />
                      <Gesto x={870} y={700} animo={0.2 + 0.6 * va} />
                      <Burbuja x={360} y={520} w={380} texto="Lo logramos nosotros" u={ac(t, M('nosotros'), M('nosotros') + 1.2)} c={c} id={ID} />
                      <Estrella x={lerp(200, 870, va)} y={lerp(300, 440, va) - 120 * Math.sin(Math.PI * va)} r={40} fill={NARANJA} rot={t * 30} op={e1(t, M('nosotros') + 0.6)} />
                      <Chip x={600} y={790} texto="sin el crédito" c={c} id={ID} op={e1(t, M('credito'))} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B2 · notas predichas en público y en privado */}
            {ex[1] > 0.01 && (
              <g opacity={ex[1]}>
                {([['en público', 380, M('publico'), 0.5], ['en privado', 820, M('privado'), 0.8]] as const).map(([txt, x, t0, ellas]) => {
                  const op = e1(t, t0 - 0.3);
                  if (op < 0.01) return null;
                  const g = ac(t, t0, t0 + 1.2);
                  return (
                    <g key={txt} opacity={op}>
                      <rect x={x - 190} y={150} width={380} height={500} rx={28} fill={c.panel} style={sombra(c.sombra)} />
                      <Txt f="a" x={x} y={205} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                      {([['ellas', ellas, ROSA, -70], ['ellos', 0.8, c.tenue, 70]] as const).map(([et, v, col, dx]) => (
                        <g key={et}>
                          <rect x={x + dx - 40} y={580 - 300 * v * g} width={80} height={Math.max(8, 300 * v * g)} rx={14} fill={col} />
                          <Txt f="a" x={x + dx} y={626} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{et}</Txt>
                        </g>
                      ))}
                      {txt === 'en privado' && (
                        <g opacity={ac(t, t0 + 1.2, t0 + 1.8)}>
                          <line x1={x - 150} y1={580 - 240} x2={x + 150} y2={580 - 240} stroke={NARANJA} strokeWidth={4} strokeDasharray="10 8" />
                          <Txt f="a" x={x} y={580 - 256} textAnchor="middle" fontSize={MIN_TXT} fill={NARANJA}>nota real</Txt>
                        </g>
                      )}
                    </g>
                  );
                })}
                <Chip x={600} y={735} texto="no parecer arrogantes" c={c} id={ID} op={e1(t, M('arrogantes'))} marca />
              </g>
            )}

            {/* B3 · la médica que preguntaba más */}
            {ex[2] > 0.01 && (
              <g opacity={ex[2]}>
                {(() => {
                  const mala = ac(t, M('medica') + 1.2, M('medica') + 1.8);
                  return (
                    <g>
                      <Persona id={ID} x={330} y={720} cuerpo={c.blanco} pelo="#3b2a20" />
                      <Gesto x={330} y={720} animo={0.5 - 1 * mala} />
                      {Array.from({ length: 6 }, (_, k) => {
                        const op = e1(t, M('preguntarMucho') + 0.3 + k * 0.45);
                        const yy = 470 - k * 34 - 6 * Math.sin(t * 2 + k);
                        return op > 0.01 ? <g key={k} opacity={op} transform={`translate(${260 + (k % 3) * 70} ${yy})`}><circle r={22} fill={k % 2 ? ROSA : NARANJA} /><Txt x={0} y={10} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>?</Txt></g> : null;
                      })}
                      <g opacity={e1(t, M('medica') + 0.6)}>
                        <Persona id={ID} x={870} y={720} cuerpo="#334155" corbata />
                        <Hoja x={600} y={265} w={290} h={200} c={c} cabeza={ROSA} titulo="evaluación" llena={1} tituloTam={26} />
                        <g opacity={mala}><Cruz x={660} y={330} s={1.2} /></g>
                      </g>
                      <g opacity={e1(t, M('masPreguntas') - 0.6)}>
                        <Burbuja x={850} y={520} w={360} texto="Hacías más preguntas" u={ac(t, M('masPreguntas') - 0.6, M('masPreguntas') + 0.8)} c={c} lado="der" id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B4 · el informe que empezaba por elogios */}
            {ex[3] > 0.01 && (
              <g opacity={ex[3]}>
                <Persona id={ID} x={250} y={720} pelo="#5b3a26" />
                <Persona id={ID} x={950} y={720} cuerpo="#64748b" corbata />
                <Gesto x={950} y={720} animo={0.6 * ac(t, M('elogios'), M('elogios') + 1) - 0.8 * ac(t, M('dijiste'), M('dijiste') + 0.6)} />
                <Hoja x={560} y={500} w={200} h={260} c={c} cabeza={NARANJA} titulo="informe" llena={ac(t, M('elogios'), M('elogios') + 1.2)} tituloTam={26} />
                {[480, 560, 640].map((x, k) => <Estrella key={x} x={x} y={315 - 8 * Math.sin(t * 2 + k)} r={30} fill={NARANJA} op={e1(t, M('elogios') + 0.4 + k * 0.3) * (1 - ac(t, M('dijiste') - 0.3, M('dijiste') + 0.3))} />)}
                <Chip x={560} y={690} texto="reescríbelo" c={c} id={ID} op={e1(t, M('informe') + 0.3) * (1 - 0.6 * ac(t, M('informe') + 1.5, M('informe') + 2.2))} />
                <g opacity={e1(t, M('dijiste') - 0.4)}>
                  <Burbuja x={940} y={520} w={300} texto="Me dijiste que estaba bien" u={ac(t, M('dijiste') - 0.4, M('dijiste') + 1.2)} c={c} lado="der" id={ID} />
                </g>
              </g>
            )}

            {/* B5 · la indirección: una semana sin hacer nada */}
            {ex[4] > 0.01 && (
              <g opacity={ex[4]}>
                <Persona id={ID} x={250} y={720} pelo="#8a5a2b" />
                <Gesto x={250} y={720} animo={0.4 - 1.1 * ac(t, M('nada') + 1.4, M('nada') + 2)} />
                <Persona id={ID} x={950} y={720} cuerpo="#64748b" />
                <g opacity={ventana(t, M('sentiria') - 0.5, M('nada') + 0.2)}>
                  <Burbuja x={270} y={520} w={400} texto="¿Cómo te sentirías ayudando?" u={ac(t, M('sentiria') - 0.5, M('sentiria') + 1)} c={c} id={ID} />
                </g>
                <g opacity={ventana(t, M('sentiria') + 1.6, M('nada') + 0.2)}>
                  <Burbuja x={930} y={520} w={170} texto="Bien" u={1} c={c} lado="der" id={ID} />
                </g>
                {(() => {
                  const op = e1(t, M('nada') - 0.3);
                  if (op < 0.01) return null;
                  const dias = Math.floor(7 * ac(t, M('nada') - 0.3, M('nada') + 1.3, 0, 1));
                  return (
                    <g opacity={op}>
                      <rect x={400} y={560} width={400} height={170} rx={22} fill={c.panel} style={sombra(c.sombra)} />
                      <rect x={400} y={560} width={400} height={40} rx={20} fill={`url(#${ID}-marca)`} />
                      {Array.from({ length: 7 }, (_, k) => <rect key={k} x={420 + k * 53} y={625} width={42} height={42} rx={8} fill={k < dias ? c.tenue : c.panel2} />)}
                      <Txt f="a" x={600} y={712} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>una semana</Txt>
                      <g opacity={ac(t, M('nada') + 1.4, M('nada') + 2)}><Cruz x={600} y={420} s={1.4} /></g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B6 · el copiloto, el hielo y el Potomac */}
            {ex[5] > 0.01 && (
              <g opacity={ex[5]}>
                {(() => {
                  const vuelo = ac(t, M('potomac') - 1, M('potomac') + 1.4);
                  const bx = (1 - vuelo) ** 2 * 560 + 2 * vuelo * (1 - vuelo) * 760 + vuelo ** 2 * 930;
                  const by = (1 - vuelo) ** 2 * 600 + 2 * vuelo * (1 - vuelo) * 420 + vuelo ** 2 * 740;
                  const rot = lerp(-12, 40, vuelo);
                  const cifra = e1(t, M('cinco74'));
                  return (
                    <g>
                      <path d="M 620 740 Q 760 715 900 740 T 1180 740 L 1180 800 Q 1040 780 900 800 T 620 800 Z" fill="#60a5fa" opacity={0.5 * e1(t, M('potomac') - 1)} />
                      <rect x={430} y={608} width={260} height={14} rx={7} fill={c.apagado} />
                      <Persona id={ID} x={200} y={480} s={0.8} cuerpo="#334155" corbata />
                      <Persona id={ID} x={350} y={480} s={0.8} cuerpo="#475569" pelo="#5b3a26" />
                      <Burbuja x={370} y={320} w={320} texto="¿Viste el hielo?" u={ac(t, M('copiloto'), M('copiloto') + 1)} c={c} id={ID} />
                      {[0, 1, 2].map((k) => <Copo key={k} x={140 + k * 40} y={230 + 12 * Math.sin(t * 2 + k)} op={e1(t, M('copiloto') + 0.8 + k * 0.2) * 0.9} />)}
                      <Avion x={bx} y={by} rot={rot} c={c} id={ID} />
                      {vuelo > 0.95 && [0, 1, 2].map((k) => <circle key={k} cx={930 + (k - 1) * 40} cy={760} r={10 + 14 * ac(t, M('potomac') + 1.4, M('potomac') + 2.4)} fill="none" stroke="#fff" strokeWidth={3} opacity={1 - ac(t, M('potomac') + 1.4, M('potomac') + 2.6)} />)}
                      {cifra > 0.01 && (
                        <g opacity={cifra}>
                          {Array.from({ length: 74 }, (_, k) => <circle key={k} cx={730 + (k % 10) * 36} cy={170 + Math.floor(k / 10) * 30} r={11} fill={k < 5 ? NARANJA : c.apagado} />)}
                          <Txt x={880} y={440} textAnchor="middle" fontSize={44} fill={NARANJA} peso={800}>5 de 74</Txt>
                        </g>
                      )}
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C1 · no hay una mejor manera */}
            {aC1 > 0.01 && (
              <g opacity={aC1}>
                {(() => {
                  const pos: [string, number, number][] = [['situación', 600, 210], ['cultura', 280, 430], ['rango', 920, 430], ['estilos', 600, 650]];
                  const ang = t * 50;
                  return (
                    <g>
                      <circle cx={600} cy={430} r={120} fill={c.panel} style={sombra(c.sombra)} />
                      <circle cx={600} cy={430} r={96} fill="none" stroke={c.apagado} strokeWidth={6} strokeDasharray="6 12" />
                      <g transform={`translate(600 430) rotate(${ang})`}>
                        <path d="M 0 -84 L 14 0 L 0 14 L -14 0 Z" fill={ROSA} />
                        <path d="M 0 84 L 14 0 L 0 -14 L -14 0 Z" fill={c.tenue} />
                      </g>
                      <circle cx={600} cy={430} r={12} fill={c.texto} />
                      {pos.map(([txt, x, y], k) => <Chip key={txt} x={x} y={y} texto={txt} c={c} id={ID} op={e1(t, M('mejorManera') + 0.8 + k * 0.6)} />)}
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C2 · en ventas: no leas al cliente con tu manual */}
            {aC2 > 0.01 && (
              <g opacity={aC2}>
                <Persona id={ID} x={260} y={740} />
                <Persona id={ID} x={940} y={740} cuerpo="#64748b" pelo="#5b3a26" corbata />
                {['silencio', 'cortesía', 'insistencia'].map((txt, k) => (
                  <g key={txt}>
                    <Chip x={600} y={250 + k * 100} texto={txt} c={c} id={ID} op={e1(t, M('ventas') + 0.6 + k * 0.5)} />
                  </g>
                ))}
                {(() => {
                  const op = e1(t, M('manual') - 0.4);
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      <g transform="translate(430 640)">
                        <rect x={-62} y={-80} width={124} height={160} rx={12} fill={`url(#${ID}-marca)`} style={sombra(c.sombra, 4, 8)} />
                        <rect x={-50} y={-80} width={10} height={160} fill="#000" opacity={0.15} />
                        <rect x={-24} y={-40} width={60} height={8} rx={4} fill="#fff" opacity={0.8} />
                        <rect x={-24} y={-22} width={44} height={8} rx={4} fill="#fff" opacity={0.6} />
                      </g>
                      <Etiqueta x={430} y={775} texto="tu manual" op={1} c={c} id={ID} />
                      <g opacity={ac(t, M('manual') + 0.4, M('manual') + 0.9)}><Cruz x={480} y={580} s={1.2} /></g>
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
