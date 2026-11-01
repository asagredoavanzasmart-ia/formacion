import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Cara, Chip, Cruz, Etiqueta, Gesto, Hoja, PanelPregunta, Rotulo, Visto, ESCUDO, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Preparar la conversación» (Weeks), escena propia. Acto A: autoconciencia frente a un espejo cuyo
 * reflejo cambia (retirarse o escalar, enseñar los dientes, cerrarse); Nick, frío como hielo, entrega
 * el control a Karen; David y las dos reuniones, con el escudo de su aversión al conflicto. Acto B:
 * ensayar con un amigo, con una lista que se marca: contenido, sin carga, cuerpo, por escrito. Acto C:
 * los tres ingredientes: claridad (el camino recto frente al rodeo; «el ascenso fue para otra persona»
 * sí, «seguimos atentos al futuro» no), neutralidad (la línea plana de «Houston, tenemos un problema») y
 * temperancia (el termómetro que baja de «¡deja de interrumpirme!» a «¿puedes esperar un minuto?»); y
 * «no lo tomes a mal», que vuelve como un búmeran.
 */

const ID = 'ce31';
const nombres = ['autoconciencia', 'retiras', 'dientes', 'cierras', 'racional', 'controlKaren', 'dosReuniones', 'aversion', 'ensaya', 'contenido', 'noCargara', 'corporal', 'escribelo', 'cnt', 'rodeos', 'entrega', 'otra', 'atentos', 'neutral', 'houston', 'temperancia', 'interrumpir', 'minuto', 'noTomes', 'traves', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Termómetro con nivel de 0 a 1. */
const Termometro: React.FC<{ x: number; y: number; v: number; c: C }> = ({ x, y, v, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={-200} width={44} height={200} rx={22} fill={c.panel2} style={sombra(c.sombra, 3, 8)} />
    <circle cx={0} cy={20} r={40} fill={v > 0.6 ? '#dc2626' : NARANJA} />
    <rect x={-10} y={-190 + 180 * (1 - v)} width={20} height={190 * v + 10} rx={10} fill={v > 0.6 ? '#dc2626' : NARANJA} />
  </g>
);

export const PrepararTensaCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('traves') + 1 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Autoconciencia'], [M('retiras'), '¿Te retiras o escalas?'], [M('racional'), 'Nick, frío'], [M('dosReuniones'), 'Dos reuniones'],
    [M('aversion'), 'Aversión al conflicto'], [M('ensaya'), 'Ensaya con un amigo'], [M('cnt'), 'Tres ingredientes'], [M('rodeos'), 'Claridad'],
    [M('neutral'), 'Neutralidad'], [M('temperancia'), 'Temperancia'], [M('noTomes'), '«No lo tomes a mal»'], [M('traves'), 'A través de las palabras'],
  ];

  const aA1 = ventana(t, -1, M('racional'));
  const aA2 = ventana(t, M('racional'), M('ensaya'));
  const aB = ventana(t, M('ensaya'), M('cnt'));
  const aC = ac(t, M('cnt'), M('cnt') + 0.4);

  const ingr = t > M('temperancia') ? 2 : t > M('neutral') ? 1 : t > M('rodeos') ? 0 : -1;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Preparar una conversación tensa: autoconciencia, ensayo y claridad, neutralidad y temperancia">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A1 · el espejo */}
            {aA1 > 0.01 && (
              <g opacity={aA1}>
                {(() => {
                  const enoja = ventana(t, M('dientes'), M('cierras'));
                  const cierra = ac(t, M('cierras'), M('cierras') + 0.5);
                  return (
                    <g>
                      <Persona id={ID} x={300} y={760} cuerpo="#334155" />
                      <Gesto x={300} y={760} animo={0.2 - 0.6 * enoja} />
                      <g opacity={e1(t, M('autoconciencia'))}>
                        <ellipse cx={640} cy={470} rx={140} ry={190} fill="#a16207" />
                        <ellipse cx={640} cy={470} rx={122} ry={172} fill="#dbeafe" />
                        <path d="M 560 380 Q 580 330 620 320" stroke="#fff" strokeWidth={8} fill="none" opacity={0.7} strokeLinecap="round" />
                        <Cara x={640} y={480} r={70} id={ID} cejas={enoja} boca={-0.6 * enoja} abierta={0} ojos={1 - 0.9 * cierra} />
                        {enoja > 0.05 && <rect x={620} y={500} width={40} height={10} rx={3} fill="#fff" opacity={enoja} />}
                      </g>
                      <g opacity={e1(t, M('retiras'))}>
                        <Chip x={960} y={330} texto="me retiro" c={c} id={ID} op={1} />
                        <Chip x={960} y={430} texto="escalo" c={c} id={ID} op={e1(t, M('retiras') + 0.8)} marca />
                      </g>
                      <Chip x={960} y={530} texto="me cierro" c={c} id={ID} op={e1(t, M('cierras'))} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* A2 · Nick entrega el control; David y su aversión */}
            {aA2 > 0.01 && (
              <g opacity={aA2}>
                {(() => {
                  const david = ac(t, M('dosReuniones') - 0.2, M('dosReuniones') + 0.4);
                  const control = ac(t, M('controlKaren'), M('controlKaren') + 1.4);
                  return (
                    <g>
                      <g opacity={1 - david}>
                        <circle cx={300} cy={620} r={100} fill="#93c5fd" opacity={0.45} />
                        <Persona id={ID} x={300} y={760} cuerpo="#334155" corbata />
                        <Gesto x={300} y={760} animo={0} />
                        <Etiqueta x={300} y={820} texto="Nick" op={1} c={c} id={ID} />
                        <g opacity={e1(t, M('controlKaren'))}>
                          <Persona id={ID} x={900} y={760} cuerpo="#be185d" pelo="#7c3f1d" />
                          <Gesto x={900} y={760} animo={-0.6} />
                          <Etiqueta x={900} y={820} texto="Karen" op={1} c={c} id={ID} />
                          {/* el control que pasa de uno a otra */}
                          <g transform={`translate(${380 + 440 * control} ${640 - 120 * Math.sin(Math.PI * control)})`}>
                            <rect x={-40} y={-24} width={80} height={48} rx={22} fill={c.texto} />
                            <circle cx={-18} cy={0} r={8} fill={ROSA} /><circle cx={18} cy={0} r={8} fill={NARANJA} />
                          </g>
                          <Etiqueta x={600} y={440} texto="el control" op={control} c={c} id={ID} marca />
                        </g>
                      </g>
                      <g opacity={david}>
                        <Persona id={ID} x={260} y={760} cuerpo="#334155" corbata />
                        <Gesto x={260} y={760} animo={-0.2} />
                        <Etiqueta x={260} y={820} texto="David" op={1} c={c} id={ID} />
                        {[0, 1].map((k) => (
                          <g key={k} transform={`translate(${620 + k * 240} 400)`} opacity={e1(t, M('dosReuniones') + 0.4 + k * 0.6)}>
                            <rect x={-90} y={-90} width={180} height={180} rx={16} fill={c.blanco} style={sombra(c.sombra)} />
                            <rect x={-90} y={-90} width={180} height={46} rx={16} fill={k ? ROSA : NARANJA} />
                            <Txt x={0} y={50} textAnchor="middle" fontSize={64} fill={c.texto}>{k + 1}</Txt>
                          </g>
                        ))}
                        <g opacity={e1(t, M('aversion'))}>
                          <g transform="translate(400 640) scale(2.2)"><path d={ESCUDO} fill={c.tenue} opacity={0.85} /></g>
                          <Chip x={800} y={640} texto="aversión al conflicto" c={c} id={ID} op={1} />
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · ensayar con un amigo */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Persona id={ID} x={220} y={760} cuerpo="#334155" />
                <Gesto x={220} y={760} animo={0.4} />
                <Etiqueta x={220} y={820} texto="tú" op={1} c={c} id={ID} />
                <Persona id={ID} x={470} y={760} s={0.95} cuerpo="#0f766e" pelo="#3b2a20" />
                <Gesto x={470} y={760} s={0.95} animo={0.6} />
                <Etiqueta x={470} y={820} texto="amigo neutral" op={1} c={c} id={ID} />
                <rect x={640} y={250} width={400} height={440} rx={24} fill={c.panel} style={sombra(c.sombra)} />
                {([['contenido', M('contenido')], ['sin carga', M('noCargara')], ['cuerpo', M('corporal')], ['por escrito', M('escribelo')]] as const).map(([txt, t0], k) => (
                  <g key={txt} opacity={0.35 + 0.65 * ac(t, t0, t0 + 0.4)}>
                    <rect x={680} y={290 + k * 96} width={44} height={44} rx={10} fill={c.panel2} />
                    {t > t0 && <g transform={`translate(702 ${312 + k * 96}) scale(${e1(t, t0)})`}><Visto x={0} y={0} s={0.7} /></g>}
                    <Txt f="a" x={746} y={322 + k * 96} fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                  </g>
                ))}
              </g>
            )}

            {/* C · claridad, neutralidad y temperancia */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(['claridad', 'neutralidad', 'temperancia'] as const).map((txt, k) => (
                  <Chip key={txt} x={[250, 600, 955][k]} y={240} texto={txt} c={c} id={ID} op={e1(t, M('cnt') + k * 0.6) * (ingr < 0 || ingr === k ? 1 : 0.45)} marca={ingr === k} />
                ))}
                <g opacity={e1(t, M('rodeos') - 0.4)}>
                  <Persona id={ID} x={200} y={770} cuerpo="#334155" />
                  <Gesto x={200} y={770} animo={0.2 + 0.3 * ventana(t, M('minuto'), M('noTomes'))} />
                </g>
                {/* claridad: el camino recto frente al rodeo */}
                <g opacity={ventana(t, M('rodeos'), M('otra'))}>
                  <circle cx={660} cy={480} r={14} fill={c.texto} /><circle cx={1040} cy={480} r={14} fill={c.texto} />
                  <path d="M 660 480 C 700 340 780 640 840 470 S 980 330 1040 480" stroke={c.apagado} strokeWidth={8} fill="none" strokeLinecap="round" />
                  <path d={`M 660 480 H ${660 + 380 * ac(t, M('rodeos') + 0.8, M('rodeos') + 2)}`} stroke={NARANJA} strokeWidth={10} strokeLinecap="round" />
                  <Chip x={850} y={650} texto="lo brutal es la entrega" c={c} id={ID} op={e1(t, M('entrega'))} />
                </g>
                <g opacity={ventana(t, M('otra') - 0.3, M('atentos'))}>
                  <Burbuja x={240} y={590} w={560} texto="El ascenso fue para otra persona." u={ac(t, M('otra') - 0.6, M('otra') + 0.8)} c={c} id={ID} />
                  <Visto x={900} y={500} s={1.1} />
                </g>
                <g opacity={ventana(t, M('atentos'), M('neutral'))}>
                  <Burbuja x={240} y={590} w={560} texto="Seguimos atentos al futuro." u={ac(t, M('atentos'), M('atentos') + 1.2)} c={c} id={ID} />
                  <Cruz x={900} y={500} s={1.1} />
                </g>
                {/* neutralidad: la línea plana */}
                <g opacity={ventana(t, M('neutral'), M('temperancia'))}>
                  <rect x={700} y={360} width={320} height={190} rx={16} fill="#0f172a" />
                  <path d={`M 720 455 H ${720 + 280}`} stroke="#22c55e" strokeWidth={5} />
                  <circle cx={720 + ((t * 120) % 280)} cy={455} r={7} fill="#86efac" />
                  <g opacity={e1(t, M('houston') - 0.3)}>
                    <Burbuja x={240} y={590} w={460} texto="Houston, tenemos un problema." u={ac(t, M('houston') - 0.3, M('houston') + 1.3)} c={c} id={ID} />
                  </g>
                </g>
                {/* temperancia: el termómetro */}
                <g opacity={ventana(t, M('temperancia'), M('noTomes'))}>
                  <Termometro x={960} y={600} v={0.9 - 0.55 * ac(t, M('minuto'), M('minuto') + 1)} c={c} />
                  <g opacity={ventana(t, M('interrumpir') - 0.3, M('minuto'))}>
                    <Burbuja x={240} y={590} w={500} texto="¡Deja de interrumpirme!" u={ac(t, M('interrumpir') - 0.3, M('interrumpir') + 0.8)} c={c} id={ID} />
                  </g>
                  <g opacity={e1(t, M('minuto'))}>
                    <Burbuja x={240} y={590} w={560} texto="¿Puedes esperar un minuto? Quiero terminar." u={ac(t, M('minuto'), M('minuto') + 2)} c={c} id={ID} marca />
                  </g>
                </g>
                {/* «no lo tomes a mal» vuelve como un búmeran */}
                <g opacity={e1(t, M('noTomes'))}>
                  <Burbuja x={240} y={590} w={460} texto="No lo tomes a mal…" u={ac(t, M('noTomes'), M('noTomes') + 1)} c={c} id={ID} />
                  {(() => {
                    const u = ac(t, M('noTomes') + 1, M('noTomes') + 3);
                    const a = Math.PI * u;
                    return (
                      <g transform={`translate(${760 + 200 * Math.sin(a)} ${470 - 120 * Math.sin(a) * Math.cos(a)}) rotate(${u * 720})`}>
                        <path d="M -40 -6 Q 0 -40 40 -6 L 30 6 Q 0 -20 -30 6 Z" fill={`url(#${ID}-marca)`} />
                      </g>
                    );
                  })()}
                  <Chip x={820} y={680} texto="a través de las palabras" c={c} id={ID} op={e1(t, M('traves'))} marca />
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
