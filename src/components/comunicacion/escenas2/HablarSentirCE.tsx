import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Etiqueta, Gesto, Hoja, Lupa, Ondas, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { CincoConversaciones } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Hablar, pensar y sentir» (Toegel y Barsoux), escena propia. Arriba siguen las cinco conversaciones.
 * Acto A: una promesa que para uno es un contrato sellado y para otro una nube; «promesas rotas»; el
 * director que piensa «no va a funcionar» y dice «¡sí, buenísimo!». Acto B: reglas de franqueza: cuatro
 * frases por intervención en el banco alemán y los caballitos de Heineken que se voltean. Acto C: los que
 * disparan primero y los analíticos se pasan el liderazgo como un testimonio. Acto D: la directora
 * entusiasta y el director introvertido que desarma su propuesta; la retirada y el sarcasmo; y lo que se
 * gana: más participación, creatividad y mejores decisiones, con menos rencor.
 */

const ID = 'ce2w';
const nombres = ['garantia', 'aspiracion', 'software', 'rotas', 'firme', 'intencion', 'positividad', 'noFuncionar', 'buenisimo', 'franqueza', 'aleman', 'cuatro', 'heineken', 'caballitos', 'agotado', 'pensamos', 'disparan', 'analiticos', 'rotar', 'sentimos', 'extrovertida', 'introvertido', 'desarmar', 'retirada', 'sarcasmo', 'participacion', 'rencor', 'pregunta'] as const;

/* Caballito de juguete que se voltea con `voltea` de 0 a 1. */
const Caballito: React.FC<{ x: number; y: number; voltea: number; color: string }> = ({ x, y, voltea, color }) => (
  <g transform={`translate(${x} ${y}) rotate(${-90 * voltea})`}>
    <rect x={-22} y={-10} width={44} height={10} rx={4} fill={color} />
    <path d="M -16 -10 V -50 Q -16 -70 4 -70 Q 22 -70 20 -52 L 12 -40 V -10 Z" fill={color} />
    <circle cx={6} cy={-58} r={3} fill="#fff" />
  </g>
);

export const HablarSentirCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('rencor') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Cómo hablamos'], [M('rotas'), '«Promesas rotas»'], [M('positividad'), 'La positividad calla'], [M('franqueza'), 'Acordar la franqueza'],
    [M('heineken'), 'Los caballitos de Heineken'], [M('pensamos'), 'Cómo pensamos'], [M('rotar'), 'Rotar el liderazgo'], [M('sentimos'), 'Cómo sentimos'],
    [M('retirada'), 'Lo contrario también daña'], [M('participacion'), 'Lo que se gana'],
  ];

  const activo = t > M('sentimos') ? 4 : t > M('pensamos') ? 3 : 2;
  const aA = ventana(t, -1, M('franqueza'));
  const aB = ventana(t, M('franqueza'), M('pensamos'));
  const aC = ventana(t, M('pensamos'), M('sentimos'));
  const aD = ac(t, M('sentimos'), M('sentimos') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Acordar de antemano cuánta franqueza se espera, cómo se piensa y cómo se expresa la emoción">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <CincoConversaciones t={t} entra={[0, 0.1, 0.2, 0.3, 0.4]} activo={activo} c={c} id={ID} />

            {/* A · una promesa, dos lecturas; la positividad */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const pos = ac(t, M('positividad') - 0.2, M('positividad') + 0.5);
                  return (
                    <g>
                      <g opacity={1 - pos}>
                        <g opacity={e1(t, M('garantia'))}>
                          <Hoja x={330} y={430} w={220} h={250} c={c} cabeza={NARANJA} titulo="garantía" llena={1} tituloTam={22} />
                          <circle cx={400} cy={510} r={28} fill="#dc2626" opacity={0.85} />
                        </g>
                        <g opacity={e1(t, M('aspiracion'))} transform={`translate(0 ${6 * Math.sin(t * 2)})`}>
                          <path d="M 760 470 Q 740 400 810 395 Q 830 340 900 355 Q 960 330 990 390 Q 1060 400 1040 470 Z" fill={c.panel2} />
                          <Txt f="a" x={895} y={445} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>aspiración</Txt>
                        </g>
                        <g opacity={e1(t, M('rotas'))}>
                          <Persona id={ID} x={330} y={780} s={0.8} cuerpo="#334155" corbata />
                          <Gesto x={330} y={780} s={0.8} animo={-0.5} />
                          <Persona id={ID} x={900} y={780} s={0.8} cuerpo="#475569" corbata />
                          <Gesto x={900} y={780} s={0.8} animo={-0.5} />
                          <Chip x={615} y={600} texto="«promesas rotas»" c={c} id={ID} op={ventana(t, M('rotas'), M('firme'))} />
                          <Chip x={615} y={600} texto="compromiso firme ≠ intención" c={c} id={ID} op={e1(t, M('firme'))} marca />
                        </g>
                      </g>
                      <g opacity={pos}>
                        <Persona id={ID} x={420} y={760} cuerpo="#be185d" pelo="#2b1a12" />
                        <Gesto x={420} y={760} animo={0.8} />
                        <Etiqueta x={420} y={820} texto="director de marketing" op={1} c={c} id={ID} />
                        <g opacity={e1(t, M('noFuncionar'))}>
                          <circle cx={480} cy={560} r={8} fill={c.panel2} /><circle cx={520} cy={530} r={13} fill={c.panel2} />
                          <ellipse cx={740} cy={460} rx={200} ry={60} fill={c.panel2} />
                          <Txt f="a" x={740} y={470} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>no va a funcionar</Txt>
                        </g>
                        <g opacity={e1(t, M('buenisimo') - 0.3)}>
                          <Burbuja x={440} y={580} w={400} texto="¡Sí, buenísimo!" u={1} c={c} lado="der" id={ID} marca />
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · cuatro frases y los caballitos */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const frases = Math.min(4, Math.floor((t - M('cuatro')) * 1.2) + 1);
                  const vuelta = ac(t, M('agotado') - 0.6, M('agotado'));
                  return (
                    <g>
                      <Chip x={600} y={270} texto="¿cuánta franqueza?" c={c} id={ID} op={ventana(t, M('franqueza'), M('aleman'))} />
                      <g opacity={ventana(t, M('aleman'), M('heineken'))}>
                        <Persona id={ID} x={250} y={760} cuerpo="#1f2937" corbata />
                        <Gesto x={250} y={760} animo={0.4} />
                        <Etiqueta x={250} y={820} texto="banco alemán" op={1} c={c} id={ID} />
                        <rect x={420} y={330} width={420} height={250} rx={24} fill={c.panel} style={sombra(c.sombra)} />
                        {Array.from({ length: 4 }, (_, k) => <rect key={k} x={460} y={370 + k * 50} width={340} height={22} rx={10} fill={t > M('cuatro') && k < frases ? `url(#${ID}-marcaH)` : c.panel2} />)}
                        <Etiqueta x={630} y={640} texto="cuatro frases" op={e1(t, M('cuatro'))} c={c} id={ID} marca />
                      </g>
                      <g opacity={e1(t, M('heineken'))}>
                        <rect x={280} y={560} width={640} height={30} rx={12} fill={c.apagado} />
                        {[380, 500, 620, 740, 860].map((x, k) => <Caballito key={x} x={x} y={560} voltea={k === 2 ? vuelta : 0} color={['#16a34a', '#dc2626', '#f59e0b', '#2563eb', '#7c3aed'][k]} />)}
                        <Etiqueta x={600} y={650} texto="Heineken" op={1} c={c} id={ID} />
                        <Chip x={600} y={330} texto="tema agotado" c={c} id={ID} op={e1(t, M('agotado'))} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · disparar primero o analizar; rotar el liderazgo */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const pasa = ac(t, M('rotar') + 1, M('rotar') + 3);
                  return (
                    <g>
                      <g opacity={e1(t, M('disparan'))}>
                        <Persona id={ID} x={260} y={760} cuerpo="#f59e0b" />
                        <Gesto x={260} y={760} animo={0.7} />
                        <Etiqueta x={260} y={820} texto="creativos" op={1} c={c} id={ID} />
                        {[0, 1, 2].map((k) => { const u = ((t * 0.9) + k / 3) % 1; return <path key={k} d={`M ${330 + 200 * u} ${560 - 40 * k} l 40 0 m -12 -10 l 12 10 l -12 10`} stroke={NARANJA} strokeWidth={6} fill="none" opacity={Math.sin(Math.PI * u)} />; })}
                      </g>
                      <g opacity={e1(t, M('analiticos'))}>
                        <Persona id={ID} x={940} y={760} cuerpo="#1e3a8a" />
                        <Gesto x={940} y={760} animo={0.2} />
                        <Etiqueta x={940} y={820} texto="analíticos" op={1} c={c} id={ID} />
                        <Lupa x={880} y={420} r={70} c={c} id={ID} clip={`${ID}-lupa`}>
                          {[0, 1, 2, 3].map((k) => <rect key={k} x={-45 + k * 24} y={30 - (12 + k * 12)} width={16} height={12 + k * 12} fill={NARANJA} />)}
                        </Lupa>
                      </g>
                      <g opacity={e1(t, M('rotar'))}>
                        <rect x={400} y={300} width={180} height={60} rx={14} fill={c.panel2} />
                        <Txt f="a" x={490} y={340} textAnchor="middle" fontSize={26} fill={c.texto}>concepto</Txt>
                        <rect x={620} y={300} width={180} height={60} rx={14} fill={c.panel2} />
                        <Txt f="a" x={710} y={340} textAnchor="middle" fontSize={26} fill={c.texto}>ejecución</Txt>
                        <g transform={`translate(${490 + 220 * pasa} 420) rotate(${-30 + 60 * pasa})`}>
                          <rect x={-10} y={-40} width={20} height={80} rx={8} fill={`url(#${ID}-marca)`} />
                        </g>
                        <Etiqueta x={600} y={630} texto="rotar el liderazgo" op={1} c={c} id={ID} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · entusiasmo, introversión, retirada y lo que se gana */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const desarma = ac(t, M('desarmar'), M('desarmar') + 2);
                  const contrario = ventana(t, M('retirada'), M('participacion'));
                  return (
                    <g>
                      <g opacity={1 - contrario - ac(t, M('participacion'), M('participacion') + 0.5) * 0}>
                        <g opacity={ventana(t, M('extrovertida'), M('retirada'))}>
                          <Persona id={ID} x={260} y={760} cuerpo={ROSA} pelo="#c49a6c" />
                          <Gesto x={260} y={760} animo={0.9} />
                          <Etiqueta x={260} y={820} texto="extrovertida" op={1} c={c} id={ID} />
                          <Ondas x1={320} y1={600} x2={620} y2={600} t={t * 2} color={ROSA} n={5} />
                          <g opacity={e1(t, M('introvertido'))}>
                            <Persona id={ID} x={940} y={760} cuerpo="#334155" corbata />
                            <Gesto x={940} y={760} animo={-0.2} />
                            <Etiqueta x={940} y={820} texto="introvertido" op={1} c={c} id={ID} />
                            {Array.from({ length: 6 }, (_, k) => <rect key={k} x={640 + (k % 3) * 60 + 40 * desarma * (k - 2.5)} y={380 + Math.floor(k / 3) * 60 + 120 * desarma * (k % 2)} width={52} height={52} rx={8} fill={NARANJA} opacity={1 - 0.5 * desarma} transform={`rotate(${desarma * (k * 25 - 60)} ${666 + (k % 3) * 60} ${406 + Math.floor(k / 3) * 60})`} />)}
                            <Etiqueta x={720} y={330} texto="su propuesta" op={1} c={c} id={ID} />
                          </g>
                        </g>
                      </g>
                      <g opacity={contrario}>
                        <Persona id={ID} x={300} y={760} cuerpo="#64748b" />
                        <Gesto x={300} y={760} animo={-0.4} />
                        <Etiqueta x={300} y={820} texto="la retirada" op={1} c={c} id={ID} />
                        <g opacity={e1(t, M('sarcasmo'))}>
                          <Persona id={ID} x={760} y={760} cuerpo="#64748b" />
                          <Gesto x={760} y={760} animo={-0.2} />
                          <Burbuja x={790} y={560} w={300} texto="Claro, genial…" u={1} c={c} id={ID} />
                          <Etiqueta x={760} y={820} texto="el sarcasmo" op={1} c={c} id={ID} />
                        </g>
                      </g>
                      <g opacity={e1(t, M('participacion'))}>
                        {['más participación', 'más creatividad', 'mejores decisiones'].map((txt, k) => <Chip key={txt} x={600} y={300 + k * 90} texto={txt} c={c} id={ID} op={e1(t, M('participacion') + k * 0.6)} />)}
                        <g opacity={e1(t, M('rencor') - 1)}>
                          <Burbuja x={260} y={760} w={640} texto="Seguimos discrepando, pero hay menos rencor." u={ac(t, M('rencor') - 1, M('rencor') + 1.2)} c={c} id={ID} marca />
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
