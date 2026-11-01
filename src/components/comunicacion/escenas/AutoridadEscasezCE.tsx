import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Copa, Cruz, Etiqueta, Gesto, Hoja, MesaRestaurante, PanelPregunta, Plato, Rotulo, Visto, W, H, borde, e1, marcador, ventana } from './comunCE';
import { BarraV, SeisPrincipios } from './comunPersuasion';
import type { PropsCE } from './comunCE';

/**
 * «Autoridad y escasez» (Cialdini), escena propia. Acto A: el diario con la opinión de un experto
 * (2 %) y la televisión nacional (4 %); la terapeuta cuyo saber nadie conoce hasta que cuelga sus
 * diplomas en la pared y el cumplimiento sube un 34 %; la cena donde se cuenta, sin presumir, un
 * problema parecido ya resuelto. Acto B: las dos casas de California, una que ahorra y otra que pierde
 * dinero cada día; los compradores de carne que duplican y multiplican sus pedidos con la información
 * exclusiva, siempre que sea genuina. Acto C: los seis principios se combinan; la vicepresidenta que
 * arranca compromisos a la fuerza y no consigue que ninguno se cumpla.
 */

const ID = 'ce22';
const nombres = ['autoridad', 'nyt', 'p2', 'tv', 'p4', 'noSupongas', 'ictus', 'terapeutas', 'diplomas', 'p34', 'informal', 'escasez', 'perdida', 'a1988', 'ahorrarian', 'perderian', 'lenguaje', 'exclusiva', 'carne', 'duplicaron', 'p600', 'genuina', 'combinan', 'vicepresidenta', 'voluntarios', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Diario doblado con titular, foto del experto y columnas. */
const Diario: React.FC<{ x: number; y: number; c: C; id: string }> = ({ x, y, c, id }) => (
  <g transform={`translate(${x} ${y}) rotate(-4)`}>
    <rect x={-130} y={-150} width={260} height={300} rx={8} fill={c.blanco} style={sombra(c.sombra)} />
    <rect x={-110} y={-130} width={220} height={22} rx={4} fill={c.texto} />
    <circle cx={-60} cy={-50} r={34} fill={`url(#${id}-marca)`} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={-10} y={-80 + k * 20} width={120} height={9} rx={4} fill={c.apagado} />)}
    {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-110} y={10 + k * 22} width={220} height={9} rx={4} fill={c.apagado} />)}
  </g>
);

/* Televisor con un experto en pantalla. */
const Tele: React.FC<{ x: number; y: number; c: C; id: string; t: number }> = ({ x, y, c, id, t }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-110} width={300} height={210} rx={18} fill="#1f2937" style={sombra(c.sombra)} />
    <rect x={-132} y={-92} width={264} height={174} rx={10} fill="#334155" />
    <circle cx={0} cy={-20} r={30} fill="#e2a37c" />
    <path d="M -50 82 Q -50 22 0 22 Q 50 22 50 82 Z" fill={`url(#${id}-marca)`} />
    <rect x={-132} y={60} width={264} height={22} fill={ROSA} opacity={0.85} />
    <rect x={-120 + ((t * 60) % 120)} y={66} width={80} height={10} rx={5} fill="#fff" opacity={0.8} />
    <path d="M -50 100 L -70 140 M 50 100 L 70 140" stroke="#1f2937" strokeWidth={10} strokeLinecap="round" />
  </g>
);

/* Diploma enmarcado. */
const Diploma: React.FC<{ x: number; y: number; c: C; op: number }> = ({ x, y, c, op }) => (
  <g transform={`translate(${x} ${y - (1 - op) * 30})`} opacity={op}>
    <rect x={-50} y={-38} width={100} height={76} rx={4} fill="#a16207" />
    <rect x={-42} y={-30} width={84} height={60} fill={c.blanco} />
    <rect x={-28} y={-16} width={56} height={6} rx={3} fill={c.apagado} />
    <rect x={-28} y={-2} width={40} height={6} rx={3} fill={c.apagado} />
    <circle cx={22} cy={16} r={9} fill={NARANJA} />
  </g>
);

/* Casa con muros que se engruesan (aislación) y monedas que entran o salen. */
const Casa: React.FC<{ x: number; y: number; c: C; aisla: number; signo: 1 | -1; t: number; op: number }> = ({ x, y, c, aisla, signo, t, op }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <ellipse cx={0} cy={4} rx={140} ry={14} fill="#000" opacity={0.12} />
    <rect x={-110 - 14 * aisla} y={-180 - 6 * aisla} width={220 + 28 * aisla} height={180 + 6 * aisla} rx={6} fill="#fde68a" opacity={aisla} />
    <rect x={-110} y={-180} width={220} height={180} rx={6} fill={c.panel} style={sombra(c.sombra)} />
    <path d="M -140 -170 L 0 -270 L 140 -170 Z" fill={signo > 0 ? '#15803d' : '#c2263e'} opacity={0.85} />
    <rect x={-30} y={-90} width={60} height={90} fill="#a16207" />
    <rect x={-90} y={-150} width={50} height={44} rx={4} fill={c.panel2} /><rect x={40} y={-150} width={50} height={44} rx={4} fill={c.panel2} />
    {[0, 1, 2].map((k) => {
      const u = (t * 0.6 + k / 3) % 1;
      const yy = signo > 0 ? -330 + 140 * u : -230 - 140 * u;
      return <circle key={k} cx={(k - 1) * 40} cy={yy} r={14} fill="#fbbf24" opacity={Math.sin(Math.PI * u)} />;
    })}
  </g>
);

/* Cajón de carne. */
const Cajon: React.FC<{ x: number; y: number; c: C }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-90} y={-60} width={180} height={60} rx={8} fill="#a16207" />
    <path d="M -90 -40 H 90 M -90 -20 H 90" stroke="#7c4a12" strokeWidth={3} />
    <ellipse cx={-40} cy={-66} rx={40} ry={16} fill="#b91c1c" /><ellipse cx={-40} cy={-70} rx={30} ry={10} fill="#ef4444" />
    <ellipse cx={34} cy={-64} rx={42} ry={16} fill="#991b1b" /><ellipse cx={34} cy={-68} rx={30} ry={10} fill="#dc2626" />
    <circle cx={30} cy={-70} r={6} fill={c.blanco} opacity={0.8} />
  </g>
);

export const AutoridadEscasezCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('voluntarios') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '5 · Autoridad'], [M('nyt'), 'La opinión de un experto'], [M('noSupongas'), 'Tu experiencia no es evidente'], [M('diplomas'), 'Hazla visible'],
    [M('informal'), 'En la conversación informal'], [M('escasez'), '6 · Escasez'], [M('a1988'), 'California, 1988'], [M('lenguaje'), 'Pesa más perder'],
    [M('exclusiva'), 'Información exclusiva'], [M('genuina'), 'Solo si es genuina'], [M('combinan'), 'Se combinan'], [M('vicepresidenta'), 'Con ética'],
  ];

  const entra = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
  const activo = t > M('combinan') ? -1 : t > M('escasez') ? 5 : 4;

  const aA1 = ventana(t, -1, M('noSupongas'));
  const aA2 = ventana(t, M('noSupongas'), M('informal'));
  const aA3 = ventana(t, M('informal'), M('escasez'));
  const aB1 = ventana(t, M('escasez'), M('exclusiva'));
  const aB2 = ventana(t, M('exclusiva'), M('combinan'));
  const aC = ac(t, M('combinan'), M('combinan') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Autoridad: haz visible tu experiencia; escasez: lo que se pierde pesa más">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <SeisPrincipios t={t} entra={entra} activo={activo} c={c} id={ID} />

            {/* A1 · el diario y la televisión */}
            {aA1 > 0.01 && (
              <g opacity={aA1}>
                <g opacity={e1(t, M('nyt'))}>
                  <Diario x={340} y={480} c={c} id={ID} />
                  <Txt x={340} y={720} textAnchor="middle" fontSize={64} fill={`url(#${ID}-marcaH)`} opacity={e1(t, M('p2'))}>2 %</Txt>
                </g>
                <g opacity={e1(t, M('tv'))}>
                  <Tele x={860} y={460} c={c} id={ID} t={t} />
                  <Txt x={860} y={720} textAnchor="middle" fontSize={64} fill={`url(#${ID}-marcaH)`} opacity={e1(t, M('p4'))}>4 %</Txt>
                </g>
              </g>
            )}

            {/* A2 · la terapeuta y sus diplomas */}
            {aA2 > 0.01 && (
              <g opacity={aA2}>
                {(() => {
                  const sube = ac(t, M('p34'), M('p34') + 1.4);
                  return (
                    <g>
                      <rect x={140} y={250} width={520} height={510} rx={20} fill={c.panel2} opacity={0.7} />
                      {[230, 400, 570].map((x, k) => <Diploma key={x} x={x} y={330} c={c} op={e1(t, M('diplomas') + k * 0.4)} />)}
                      <Persona id={ID} x={400} y={760} cuerpo="#0e7490" pelo="#3b2a20" />
                      <Gesto x={400} y={760} animo={0.5} />
                      <Etiqueta x={400} y={815} texto="terapeuta" op={e1(t, M('terapeutas'))} c={c} id={ID} />
                      <g opacity={e1(t, M('ictus'))}>
                        <Persona id={ID} x={900} y={760} cuerpo="#64748b" pelo="#9ca3af" />
                        <Gesto x={900} y={760} animo={-0.2 + 0.8 * sube} />
                        <Etiqueta x={900} y={815} texto="paciente" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('terapeutas') + 0.4, M('diplomas') + 1.2)}>
                        <Txt x={900} y={540} textAnchor="middle" fontSize={64} fill={c.tenue}>?</Txt>
                      </g>
                      {/* el cumplimiento que sube */}
                      <g opacity={e1(t, M('p34'))}>
                        <rect x={760} y={300} width={280} height={30} rx={15} fill={c.apagado} />
                        <rect x={760} y={300} width={280 * (0.45 + 0.34 * sube)} height={30} rx={15} fill={`url(#${ID}-marcaH)`} />
                        <Txt x={900} y={410} textAnchor="middle" fontSize={64} fill={`url(#${ID}-marcaH)`}>+34 %</Txt>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* A3 · contarlo en la cena */}
            {aA3 > 0.01 && (
              <g opacity={aA3}>
                {[400, 820].map((x, k) => (
                  <g key={x}>
                    <Persona id={ID} x={x} y={660} cuerpo={k ? '#0f766e' : '#334155'} corbata={!k} />
                    <Gesto x={x} y={660} animo={0.6} />
                  </g>
                ))}
                <MesaRestaurante x0={260} x1={920} y={640} c={c} />
                <Plato x={420} y={620} c={c} comida="carne" s={0.8} />
                <Plato x={800} y={620} c={c} comida="pasta" s={0.8} />
                <Copa x={610} y={612} c={c} />
                <Burbuja x={420} y={440} w={620} texto="Un cliente tenía este mismo problema…" u={ac(t, M('informal') + 0.6, M('informal') + 2.6)} c={c} id={ID} />
              </g>
            )}

            {/* B1 · las casas de California: ahorrar o perder */}
            {aB1 > 0.01 && (
              <g opacity={aB1}>
                <Txt x={600} y={300} textAnchor="middle" fontSize={44} fill={`url(#${ID}-marcaH)`} opacity={e1(t, M('a1988'))}>1988</Txt>
                <Casa x={330} y={680} c={c} aisla={0.4 * ac(t, M('lenguaje'), M('lenguaje') + 1)} signo={1} t={t} op={e1(t, M('ahorrarian'))} />
                <Casa x={870} y={680} c={c} aisla={ac(t, M('lenguaje'), M('lenguaje') + 1)} signo={-1} t={t} op={e1(t, M('perderian'))} />
                <Chip x={330} y={760} texto="ahorrarías" c={c} id={ID} op={e1(t, M('ahorrarian'))} />
                <Chip x={870} y={760} texto="perderías" c={c} id={ID} op={e1(t, M('perderian'))} marca />
                <g opacity={e1(t, M('lenguaje') + 0.6)}><Visto x={1070} y={380} s={1.1} /></g>
              </g>
            )}

            {/* B2 · la carne importada y la información exclusiva */}
            {aB2 > 0.01 && (
              <g opacity={aB2}>
                <g opacity={e1(t, M('exclusiva'))}><Cajon x={190} y={700} c={c} /></g>
                <Chip x={600} y={300} texto="información exclusiva" c={c} id={ID} op={ventana(t, M('exclusiva'), M('genuina'))} marca />
                <BarraV x={440} base={700} alto={60} valor="1×" etiqueta="antes" u={ac(t, M('carne'), M('carne') + 0.8)} c={c} id={ID} />
                <BarraV x={690} base={700} alto={140} valor="×2" etiqueta="escasez" u={ac(t, M('duplicaron') + 0.6, M('duplicaron') + 1.6)} c={c} id={ID} />
                <BarraV x={960} base={700} alto={400} valor="+600 %" etiqueta="exclusiva" u={ac(t, M('p600'), M('p600') + 1.4)} c={c} id={ID} marca />
                <g opacity={e1(t, M('genuina'))}>
                  <Chip x={330} y={330} texto="solo si es genuina" c={c} id={ID} op={1} />
                </g>
              </g>
            )}

            {/* C · combinarlos, con ética: la vicepresidenta */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const presiona = ac(t, M('vicepresidenta') + 0.6, M('vicepresidenta') + 1.6);
                  return (
                    <g>
                      <Chip x={600} y={300} texto="se multiplican" c={c} id={ID} op={ventana(t, M('combinan') + 0.4, M('vicepresidenta'))} marca />
                      <g opacity={e1(t, M('vicepresidenta'))}>
                        <Persona id={ID} x={230} y={740} cuerpo="#7c3aed" pelo="#3b2a20" />
                        <Gesto x={230} y={740} animo={-0.3} />
                        <Etiqueta x={230} y={805} texto="vicepresidenta" op={1} c={c} id={ID} />
                        {[0, 1, 2].map((k) => <path key={k} d={`M ${320 + k * 26} ${480 + k * 20} l 70 0`} stroke={ROSA} strokeWidth={8} strokeLinecap="round" opacity={presiona} transform={`translate(${10 * Math.sin(t * 7 + k)} 0)`} />)}
                        {[600, 800, 1000].map((x, k) => (
                          <g key={x}>
                            <Persona id={ID} x={x} y={740} s={0.85} cuerpo={['#334155', '#475569', '#64748b'][k]} />
                            <Gesto x={x} y={740} s={0.85} animo={-0.6 * presiona} />
                            <g opacity={e1(t, M('vicepresidenta') + 1.4 + k * 0.3)}>
                              <Hoja x={x} y={390} w={130} h={150} c={c} cabeza={NARANJA} titulo="" llena={1} />
                            </g>
                            <g opacity={e1(t, M('voluntarios') + k * 0.3)}><Cruz x={x + 40} y={440} s={0.8} /></g>
                          </g>
                        ))}
                        <Etiqueta x={800} y={805} texto="jefes de área" op={1} c={c} id={ID} />
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
