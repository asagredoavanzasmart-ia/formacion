import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Estrella, Etiqueta, Gesto, Ondas, PanelPregunta, Reloj, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Conversaciones tensas» (Holly Weeks), escena propia. Acto A: dos personas con una nube cargada de
 * rayos entre ellas, de despedir a alguien a recibir un elogio; Holly Weeks; evitarlas hace rodar una
 * bola de nieve que crece. Acto B: los tres tipos. «Malas noticias»: David y Jeremy, las evaluaciones
 * infladas, los Red Sox, los guantes que se quitan, el silencio helado y la renuncia. «¿Qué está
 * pasando aquí?»: Elizabeth y Rafael, el reloj del proyecto atrasado, las frases que escalan y la
 * balanza de estatus que se inclina. «¡Me estás atacando!»: Karen que grita en rojo, Nick que responde
 * en hielo, y la estrella del ascenso que se va a otro lado.
 */

const ID = 'ce30';
const nombres = ['tensas', 'carga', 'despedir', 'elogio', 'weeks', 'evitarlas', 'tres', 'malas', 'jeremy', 'altas', 'redsox', 'engreido', 'guantes', 'helado', 'renuncio', 'quePasa', 'elizabeth', 'esoTodo', 'siTu', 'cargo', 'perdon', 'traslado', 'atacando', 'nick', 'tranq', 'acusandolo', 'ignorados', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Nube cargada con rayos. */
const NubeRayo: React.FC<{ x: number; y: number; t: number; c: C }> = ({ x, y, t, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -120 30 Q -140 -30 -80 -40 Q -60 -96 0 -86 Q 60 -110 90 -50 Q 150 -40 130 30 Z" fill="#4b5563" style={sombra(c.sombra)} />
    {[-50, 30].map((dx, k) => <path key={dx} d={`M ${dx} 30 l -18 44 h 22 l -14 46`} stroke="#fbbf24" strokeWidth={8} fill="none" strokeLinejoin="round" opacity={Math.sin(t * 9 + k * 2) > 0.2 ? 1 : 0.2} />)}
  </g>
);

/* Guante de box en la mano (x, y de la Persona; lado ±1). */
const Guante: React.FC<{ x: number; y: number; lado: number; op: number }> = ({ x, y, lado, op }) => (
  <g opacity={op}><circle cx={x + lado * 50} cy={y - 60} r={22} fill="#dc2626" /><rect x={x + lado * 50 - 14} y={y - 42} width={28} height={14} rx={4} fill="#fff" /></g>
);

export const TensasCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('ignorados') + 1.2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Conversaciones tensas'], [M('despedir'), 'De un despido a un elogio'], [M('weeks'), 'Holly Weeks'], [M('evitarlas'), 'Evitarlas empeora'],
    [M('tres'), 'Tres conversaciones'], [M('malas'), '1 · Tengo malas noticias'], [M('redsox'), 'Un rodeo'], [M('guantes'), 'Sin guantes'],
    [M('renuncio'), 'Renunció'], [M('quePasa'), '2 · ¿Qué está pasando aquí?'], [M('perdon'), 'Cedió el estatus'], [M('atacando'), '3 · ¡Me estás atacando!'],
    [M('tranq'), 'Frialdad racional'], [M('ignorados'), 'Sin ascenso'],
  ];

  const aA = ventana(t, -1, M('tres'));
  const aB0 = ventana(t, M('tres'), M('malas'));
  const aB1 = ventana(t, M('malas'), M('quePasa'));
  const aB2 = ventana(t, M('quePasa'), M('atacando'));
  const aB3 = ac(t, M('atacando'), M('atacando') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Conversaciones tensas: evitarlas empeora el problema; tres tipos básicos">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · la carga emocional y el costo de evitarla */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const evita = ac(t, M('evitarlas'), M('evitarlas') + 4);
                  return (
                    <g>
                      <g opacity={ventana(t, -1, M('weeks'))}>
                        <Persona id={ID} x={280} y={760} cuerpo="#334155" />
                        <Gesto x={280} y={760} animo={-0.4} />
                        <Persona id={ID} x={920} y={760} cuerpo="#0f766e" pelo="#5b3a26" />
                        <Gesto x={920} y={760} animo={-0.3} />
                        <g opacity={e1(t, M('carga'))}><NubeRayo x={600} y={470} t={t} c={c} /></g>
                        <Chip x={400} y={280} texto="despedir" c={c} id={ID} op={e1(t, M('despedir'))} />
                        <Chip x={800} y={280} texto="recibir un elogio" c={c} id={ID} op={e1(t, M('elogio'))} marca />
                      </g>
                      <g opacity={e1(t, M('weeks'))}>
                        <Persona id={ID} x={200} y={760} cuerpo="#7c3aed" pelo="#c49a6c" />
                        <Gesto x={200} y={760} animo={0.5} />
                        <Etiqueta x={200} y={820} texto="Holly Weeks" op={1} c={c} id={ID} />
                        <Chip x={200} y={330} texto="20 años" c={c} id={ID} op={ventana(t, M('weeks') + 0.6, M('evitarlas') + 1)} />
                      </g>
                      {/* la bola de nieve del problema evitado */}
                      <g opacity={e1(t, M('evitarlas'))}>
                        <path d="M 360 520 L 1100 760" stroke={c.apagado} strokeWidth={6} />
                        <g transform={`translate(${420 + 560 * evita} ${540 + 180 * evita - (30 + 60 * evita)}) rotate(${evita * 720})`}>
                          <circle r={30 + 60 * evita} fill={c.panel2} style={sombra(c.sombra, 3, 8)} />
                          <path d={`M ${-14 - 20 * evita} 0 h ${28 + 40 * evita}`} stroke={c.apagado} strokeWidth={5} />
                        </g>
                        <Etiqueta x={760} y={460} texto="el problema crece" op={ac(t, M('evitarlas') + 1, M('evitarlas') + 2)} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B0 · las tres conversaciones */}
            {aB0 > 0.01 && (
              <g opacity={aB0}>
                {['tengo malas noticias', '¿qué está pasando aquí?', '¡me estás atacando!'].map((txt, k) => (
                  <g key={txt} opacity={e1(t, M('tres') + 0.4 + k * 0.4)}>
                    <circle cx={260} cy={330 + k * 130} r={40} fill={`url(#${ID}-marca)`} />
                    <Txt x={260} y={346 + k * 130} textAnchor="middle" fontSize={44} fill="#fff">{k + 1}</Txt>
                    <Txt f="a" x={330} y={340 + k * 130} fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                  </g>
                ))}
              </g>
            )}

            {/* B1 · malas noticias: David y Jeremy */}
            {aB1 > 0.01 && (
              <g opacity={aB1}>
                {(() => {
                  const guantes = ac(t, M('guantes'), M('guantes') + 0.6);
                  const helado = ac(t, M('helado'), M('helado') + 1);
                  const sale = ac(t, M('renuncio') + 0.5, M('renuncio') + 2.5);
                  return (
                    <g>
                      <Persona id={ID} x={250} y={760} cuerpo="#334155" corbata />
                      <Gesto x={250} y={760} animo={0.3 - 0.6 * guantes} />
                      <Guante x={250} y={760} lado={1} op={guantes} /><Guante x={250} y={760} lado={-1} op={guantes} />
                      <Etiqueta x={250} y={820} texto="David" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('jeremy'))} transform={`translate(${280 * sale} 0)`}>
                        <circle cx={950} cy={620} r={90} fill="#93c5fd" opacity={0.45 * helado} />
                        <Persona id={ID} x={950} y={760} s={1 + 0.08 * ac(t, M('engreido'), M('engreido') + 0.6) * (1 - helado)} cuerpo="#0e7490" />
                        <Gesto x={950} y={760} animo={0.8 * (1 - helado) - 0.2 * helado} />
                        <Etiqueta x={950} y={820} texto="Jeremy" op={1 - sale} c={c} id={ID} />
                      </g>
                      {/* evaluaciones infladas */}
                      <g opacity={ventana(t, M('altas'), M('redsox'))}>
                        {[0, 1, 2, 3].map((k) => <rect key={k} x={480 + k * 70} y={300} width={48} height={200} rx={8} fill={c.panel2} />)}
                        {[0, 1, 2, 3].map((k) => <rect key={k} x={480 + k * 70} y={300 + 30 * (k % 2)} width={48} height={200 - 30 * (k % 2)} rx={8} fill={`url(#${ID}-marca)`} opacity={ac(t, M('altas') + k * 0.2, M('altas') + k * 0.2 + 0.5)} />)}
                        <Etiqueta x={590} y={550} texto="evaluaciones infladas" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('redsox'), M('guantes'))}>
                        <Burbuja x={280} y={560} w={420} texto="¿Qué tal los Red Sox?" u={ac(t, M('redsox'), M('redsox') + 1.2)} c={c} id={ID} />
                      </g>
                      {/* habla casi todo el tiempo */}
                      <g opacity={ventana(t, M('guantes') + 0.4, M('renuncio'))}>
                        {[0, 1, 2].map((k) => <rect key={k} x={300 + k * 40} y={330 + k * 70} width={420 - k * 60} height={50} rx={25} fill={c.panel2} opacity={0.6 + 0.4 * Math.sin(t * 5 + k)} />)}
                      </g>
                      <Etiqueta x={950} y={420} texto="silencio helado" op={ventana(t, M('helado'), M('renuncio') + 0.5)} c={c} id={ID} />
                      <g opacity={sale}>
                        <rect x={1080} y={500} width={90} height={260} rx={8} fill="#a16207" />
                        <Chip x={760} y={330} texto="se llevó el talento" c={c} id={ID} op={1} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B2 · ¿qué está pasando aquí?: Elizabeth y Rafael */}
            {aB2 > 0.01 && (
              <g opacity={aB2}>
                {(() => {
                  const cede = ac(t, M('perdon'), M('perdon') + 1.2);
                  const va = ac(t, M('traslado'), M('traslado') + 2);
                  return (
                    <g>
                      <g opacity={e1(t, M('quePasa'))} transform={`translate(${-260 * va} 0)`}>
                        <Persona id={ID} x={300} y={760} s={1 - 0.15 * cede} cuerpo="#be185d" pelo="#5b3a26" />
                        <Gesto x={300} y={760} s={1 - 0.15 * cede} animo={0.3 - 0.8 * cede} />
                        <Etiqueta x={300} y={820} texto="Elizabeth" op={(1 - va) * e1(t, M('elizabeth'))} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('quePasa') + 0.3)}>
                        <Persona id={ID} x={900} y={760} s={1 + 0.1 * cede} cuerpo="#334155" />
                        <Gesto x={900} y={760} s={1 + 0.1 * cede} animo={-0.6 * ac(t, M('siTu'), M('siTu') + 0.5) + 0.4 * cede} />
                        <Etiqueta x={900} y={820} texto="Rafael" op={e1(t, M('elizabeth') + 0.4)} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('elizabeth') + 1, M('esoTodo'))}>
                        <Reloj x={600} y={360} s={1.3} c={c} progreso={0.9} />
                        <Etiqueta x={600} y={470} texto="proyecto atrasado" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('esoTodo'), M('siTu'))}>
                        <Burbuja x={330} y={560} w={420} texto="¿Eso es todo, entonces?" u={ac(t, M('esoTodo'), M('esoTodo') + 1.2)} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('siTu'), M('cargo'))}>
                        <Burbuja x={880} y={560} w={340} texto="Si tú lo dices." u={ac(t, M('siTu'), M('siTu') + 0.8)} c={c} lado="der" id={ID} />
                      </g>
                      <g opacity={ventana(t, M('cargo'), M('perdon'))}>
                        <Burbuja x={880} y={560} w={420} texto="¿Quién te puso a cargo?" u={ac(t, M('cargo'), M('cargo') + 1)} c={c} lado="der" id={ID} marca />
                      </g>
                      {/* la balanza de estatus que se inclina */}
                      <g opacity={ventana(t, M('perdon'), M('atacando'))}>
                        <g transform={`translate(600 380) rotate(${-14 * cede})`}>
                          <rect x={-220} y={-6} width={440} height={12} rx={6} fill={c.tenue} />
                          <rect x={-250} y={6} width={60} height={20} rx={6} fill={ROSA} />
                          <rect x={190} y={6} width={60} height={20} rx={6} fill="#334155" />
                        </g>
                        <path d="M 600 380 L 570 480 H 630 Z" fill={c.tenue} />
                        <Etiqueta x={600} y={530} texto="estatus desigual" op={1} c={c} id={ID} />
                      </g>
                      <Chip x={420} y={260} texto="pidió traslado" c={c} id={ID} op={e1(t, M('traslado') + 0.8)} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B3 · ¡me estás atacando!: Karen y Nick */}
            {aB3 > 0.01 && (
              <g opacity={aB3}>
                {(() => {
                  const grito = ac(t, M('atacando'), M('atacando') + 0.6);
                  const hielo = ac(t, M('nick') + 1, M('nick') + 2);
                  const gris = ac(t, M('ignorados'), M('ignorados') + 0.8);
                  const estrella = ac(t, M('ignorados'), M('ignorados') + 1.6);
                  return (
                    <g>
                      <g opacity={1 - 0.5 * gris}>
                        <Persona id={ID} x={280} y={760} cuerpo={gris > 0.5 ? '#94a3b8' : '#be185d'} pelo="#7c3f1d" />
                        <Gesto x={280} y={760} animo={-0.9 * grito} />
                        <Etiqueta x={280} y={820} texto="Karen" op={1} c={c} id={ID} />
                        <g opacity={e1(t, M('nick'))}>
                          <circle cx={920} cy={620} r={90} fill="#93c5fd" opacity={0.4 * hielo} />
                          <Persona id={ID} x={920} y={760} cuerpo={gris > 0.5 ? '#94a3b8' : '#334155'} corbata />
                          <Gesto x={920} y={760} animo={-0.1} />
                          <Etiqueta x={920} y={820} texto="Nick" op={1} c={c} id={ID} />
                        </g>
                      </g>
                      <Ondas x1={340} y1={600} x2={850} y2={600} t={t * (1 + grito)} color="#dc2626" op={grito * (1 - gris) * (1 - 0.6 * ventana(t, M('tranq'), M('acusandolo')))} n={5} />
                      <g opacity={ventana(t, M('tranq') - 0.3, M('ignorados'))}>
                        <Burbuja x={900} y={560} w={420} texto="Karen, tranquilízate." u={ac(t, M('tranq') - 0.3, M('tranq') + 1)} c={c} lado="der" id={ID} />
                      </g>
                      <Chip x={420} y={330} texto="sigue acusando" c={c} id={ID} op={ventana(t, M('acusandolo'), M('ignorados'))} />
                      {/* la estrella del ascenso se va */}
                      <g opacity={gris}>
                        {[0, 1, 2, 3].map((k) => <rect key={k} x={480 + k * 70} y={460 - k * 50} width={70} height={60 + k * 50} fill={c.panel2} />)}
                        <Estrella x={760 + 280 * estrella} y={330 - 60 * estrella} r={40} fill="#fbbf24" />
                        <Etiqueta x={620} y={570} texto="ascenso" op={1} c={c} id={ID} />
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
