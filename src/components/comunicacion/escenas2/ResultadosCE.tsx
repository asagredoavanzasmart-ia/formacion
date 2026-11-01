import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Estrella, Etiqueta, Gesto, Hoja, Lupa, Ondas, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { BarraV } from '../escenas/comunPersuasion';
import { Palancas } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Resultados: diagnóstico, no castigo» (Hamm, palancas 2 y 3), escena propia. Acto A: el director que
 * exige los números «como sea» en la novena semana; las cajas que se empujan a los distribuidores antes
 * de la demanda, los resultados que se recalculan, los ingresos planos en diez millones y la venta por
 * menos de lo que facturaba en un año. Acto B: John Adler: de 100 millones a más de 5 000 millones, la
 * lupa del diagnóstico sin culpables, la calidad que se vuelve envidia y el golfista que cuida su swing.
 * Acto C: la tercera palanca: Jim, que tiene todas las respuestas, ve irse a sus gerentes; Chris escucha,
 * encarga a un pequeño grupo y logra el cambio en tres trimestres.
 */

const ID = 'ce2d';
const nombres = ['financieros', 'directorCreia', 'trimestrales', 'novena', 'noImporta', 'rellenando', 'distribuidores', 'recalcular', 'diezMillones', 'facturaba', 'adler', 'm100', 'm5000', 'diagnostico', 'culpables', 'calidad', 'envidia', 'golfista', 'aire', 'tercera', 'jim', 'respuestas', 'seFueron', 'chris', 'escuchaba', 'grupo', 'tres', 'pregunta'] as const;

export const ResultadosCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('tres') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '2 · Los resultados'], [M('novena'), 'La novena semana'], [M('rellenando'), 'Rellenar el canal'], [M('diezMillones'), 'Estancados'],
    [M('adler'), 'John Adler'], [M('diagnostico'), 'Diagnóstico, no castigo'], [M('golfista'), 'Cuidar el swing'], [M('tercera'), '3 · Su propio trabajo'],
    [M('jim'), 'Jim lo sabe todo'], [M('chris'), 'Chris escucha'], [M('tres'), 'En tres trimestres'],
  ];

  const activo = t > M('tercera') ? 2 : 1;
  const aA1 = ventana(t, -1, M('rellenando'));
  const aA2 = ventana(t, M('rellenando'), M('adler'));
  const aB = ventana(t, M('adler'), M('tercera'));
  const aC = ac(t, M('tercera'), M('tercera') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los resultados como castigo empujan a rellenar el canal; como diagnóstico, mejoran la empresa">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <Palancas t={t} entra={[0, 0.1, 0.2, 0.3, 0.4]} activo={activo} c={c} id={ID} />

            {/* A1 · la novena semana */}
            {aA1 > 0.01 && (
              <g opacity={aA1}>
                <g opacity={e1(t, M('directorCreia'))}>
                  <Persona id={ID} x={200} y={760} cuerpo="#334155" corbata />
                  <Gesto x={200} y={760} animo={0.3 - 0.8 * ac(t, M('novena'), M('novena') + 0.6)} />
                  <Etiqueta x={200} y={820} texto="director" op={1} c={c} id={ID} />
                </g>
                <g opacity={e1(t, M('trimestrales'))}>
                  {Array.from({ length: 13 }, (_, k) => (
                    <rect key={k} x={340 + k * 58} y={300} width={48} height={48} rx={9} fill={k === 8 && t > M('novena') ? ROSA : c.panel2} style={k === 8 && t > M('novena') ? sombra(c.sombra, 3, 8) : undefined} />
                  ))}
                  <Etiqueta x={710} y={400} texto={t > M('novena') ? 'semana 9' : 'un trimestre'} op={1} c={c} id={ID} marca={t > M('novena')} />
                </g>
                <g opacity={e1(t, M('noImporta') - 0.4)}>
                  <Burbuja x={230} y={560} w={500} texto="Necesito estos números. No me importa cómo." u={ac(t, M('noImporta') - 0.4, M('noImporta') + 1.4)} c={c} id={ID} marca />
                </g>
              </g>
            )}

            {/* A2 · rellenar el canal y quedar estancados */}
            {aA2 > 0.01 && (
              <g opacity={aA2}>
                {(() => {
                  const empuja = ac(t, M('rellenando'), M('distribuidores') + 3);
                  const n = Math.round(9 * empuja);
                  return (
                    <g>
                      <g opacity={ventana(t, M('rellenando'), M('diezMillones'))}>
                        {/* el depósito del distribuidor que se llena */}
                        <path d="M 760 760 V 480 L 900 400 L 1040 480 V 760 Z" fill={c.panel} style={sombra(c.sombra)} />
                        {Array.from({ length: n }, (_, k) => <rect key={k} x={790 + (k % 3) * 75} y={700 - Math.floor(k / 3) * 62} width={64} height={54} rx={6} fill="#d6a76c" stroke="#a16207" strokeWidth={3} />)}
                        <Etiqueta x={900} y={810} texto="distribuidor" op={e1(t, M('distribuidores'))} c={c} id={ID} />
                        {[0, 1, 2].map((k) => {
                          const u = ((t - M('rellenando')) * 0.7 + k / 3) % 1;
                          return <rect key={k} x={300 + 420 * u} y={640} width={56} height={48} rx={6} fill="#d6a76c" stroke="#a16207" strokeWidth={3} opacity={Math.sin(Math.PI * u)} />;
                        })}
                        <Persona id={ID} x={200} y={760} cuerpo="#64748b" />
                        <Gesto x={200} y={760} animo={-0.3} />
                        <Etiqueta x={200} y={820} texto="ventas" op={1} c={c} id={ID} />
                        <Chip x={500} y={330} texto="sin demanda real" c={c} id={ID} op={e1(t, M('distribuidores') + 1)} />
                        <g opacity={e1(t, M('recalcular'))}>
                          <Hoja x={500} y={480} w={170} h={150} c={c} cabeza={c.tenue} titulo="" llena={1} gris />
                          <Cruz x={570} y={420} s={0.8} />
                        </g>
                      </g>
                      {/* ingresos planos y la venta barata */}
                      <g opacity={e1(t, M('diezMillones'))}>
                        <path d="M 200 640 H 1000 M 200 640 V 300" stroke={c.apagado} strokeWidth={4} />
                        <path d={`M 210 520 C 300 470 360 450 420 455 L ${420 + 560 * ac(t, M('diezMillones'), M('diezMillones') + 1.5)} 455`} stroke={NARANJA} strokeWidth={8} fill="none" strokeLinecap="round" />
                        <Txt f="a" x={980} y={430} textAnchor="end" fontSize={MIN_TXT} fill={c.texto}>US$ 10 M por trimestre</Txt>
                      </g>
                      <g opacity={e1(t, M('facturaba'))}>
                        <rect x={360} y={690} width={300} height={40} rx={12} fill={c.apagado} />
                        <rect x={360} y={750} width={480} height={40} rx={12} fill={`url(#${ID}-marcaH)`} />
                        <Txt f="a" x={380} y={719} fontSize={26} fill={c.texto}>precio de venta</Txt>
                        <Txt f="a" x={380} y={779} fontSize={26} fill="#fff">un año de ventas</Txt>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · John Adler: diagnóstico sin culpables */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const vuelo = ac(t, M('aire'), M('aire') + 2.5);
                  return (
                    <g>
                      <Persona id={ID} x={180} y={760} cuerpo="#1e3a8a" corbata />
                      <Gesto x={180} y={760} animo={0.6} />
                      <Etiqueta x={180} y={820} texto="John Adler" op={1} c={c} id={ID} />
                      <g opacity={ventana(t, M('m100'), M('golfista'))}>
                        <BarraV x={400} base={720} alto={30} valor="100 M" etiqueta="antes" u={ac(t, M('m100'), M('m100') + 0.8)} c={c} id={ID} tamValor={36} />
                        <BarraV x={590} base={720} alto={420} valor="5 000 M" etiqueta="12 años" u={ac(t, M('m5000'), M('m5000') + 1.6)} c={c} id={ID} marca tamValor={36} />
                      </g>
                      <g opacity={ventana(t, M('diagnostico'), M('golfista'))}>
                        <Lupa x={900} y={430} r={100} c={c} id={ID} clip={`${ID}-lupa`}>
                          <path d="M -70 30 L -30 0 L 0 20 L 40 -30 L 70 -10" stroke={NARANJA} strokeWidth={8} fill="none" />
                        </Lupa>
                        <Chip x={900} y={620} texto="sin culpables" c={c} id={ID} op={e1(t, M('culpables'))} />
                        <g opacity={e1(t, M('calidad'))}><Visto x={980} y={340} s={1} /></g>
                        <g opacity={e1(t, M('envidia'))}><Estrella x={820} y={330} r={34} fill="#fbbf24" rot={t * 30} /></g>
                      </g>
                      {/* el golfista y su swing */}
                      <g opacity={e1(t, M('golfista'))}>
                        <Persona id={ID} x={600} y={760} cuerpo="#15803d" />
                        <Gesto x={600} y={760} animo={0.5} />
                        <g transform={`translate(630 640) rotate(${-120 + 160 * ac(t, M('aire') - 0.6, M('aire'))})`}>
                          <rect x={-4} y={0} width={8} height={130} rx={4} fill={c.tenue} />
                          <rect x={-14} y={124} width={28} height={12} rx={4} fill={c.texto} />
                        </g>
                        <circle cx={680 + 380 * vuelo} cy={770 - 380 * Math.sin(Math.PI * vuelo * 0.9)} r={10} fill={c.blanco} stroke={c.apagado} strokeWidth={2} />
                        <Etiqueta x={600} y={820} texto="postura y swing" op={1} c={c} id={ID} />
                        <Chip x={880} y={300} texto="fuera de control" c={c} id={ID} op={e1(t, M('aire') + 0.8)} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · Jim y Chris */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const chris = ac(t, M('chris') - 0.2, M('chris') + 0.6);
                  const vanse = ac(t, M('seFueron'), M('seFueron') + 2);
                  return (
                    <g>
                      <g opacity={1 - chris}>
                        <Persona id={ID} x={220} y={760} cuerpo="#334155" corbata />
                        <Gesto x={220} y={760} animo={0.6} />
                        <Etiqueta x={220} y={820} texto="Jim" op={e1(t, M('jim'))} c={c} id={ID} />
                        <g opacity={e1(t, M('respuestas'))}>
                          {['!', '!', '!', '!'].map((s, k) => <g key={k} transform={`translate(${300 + k * 70} ${450 - (k % 2) * 60})`}><ellipse rx={40} ry={30} fill={NARANJA} opacity={0.85} /><Txt x={0} y={14} textAnchor="middle" fontSize={40} fill="#fff">{s}</Txt></g>)}
                          <Chip x={420} y={300} texto="todas las respuestas" c={c} id={ID} op={1} />
                        </g>
                        {[760, 900, 1040].map((x, k) => (
                          <g key={x} transform={`translate(${260 * vanse} 0)`} opacity={1 - vanse}>
                            <Persona id={ID} x={x} y={760} s={0.85} cuerpo={['#475569', '#0f766e', '#64748b'][k]} />
                            <Gesto x={x} y={760} s={0.85} animo={-0.4} />
                          </g>
                        ))}
                      </g>
                      <g opacity={chris}>
                        <Persona id={ID} x={220} y={760} cuerpo="#1e3a8a" corbata />
                        <Gesto x={220} y={760} animo={0.5} />
                        <Etiqueta x={220} y={820} texto="Chris" op={1} c={c} id={ID} />
                        {[700, 860, 1020].map((x, k) => (
                          <g key={x}>
                            <Persona id={ID} x={x} y={760} s={0.85} cuerpo={['#475569', '#0f766e', '#64748b'][k]} />
                            <Gesto x={x} y={760} s={0.85} animo={0.4 + 0.3 * e1(t, M('tres'))} />
                          </g>
                        ))}
                        <Ondas x1={640} y1={600} x2={300} y2={600} t={t} color={NARANJA} n={3} op={e1(t, M('escuchaba'))} />
                        <g opacity={e1(t, M('grupo'))}>
                          <Lupa x={860} y={420} r={80} c={c} id={ID} clip={`${ID}-lupa2`}>
                            <circle r={20} fill={ROSA} />
                          </Lupa>
                          <Etiqueta x={860} y={545} texto="¿por qué no ganamos?" op={1} c={c} id={ID} />
                        </g>
                        <g opacity={e1(t, M('tres'))}>
                          <Chip x={460} y={330} texto="tres trimestres" c={c} id={ID} op={1} marca />
                          <Visto x={720} y={330} s={0.9} />
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
