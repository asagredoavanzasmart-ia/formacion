import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Estrella, Etiqueta, Gesto, Lupa, Medidor, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Los errores de quien aconseja» (Garvin y Margolis), escena propia. Acto A: Garvin y Margolis y el
 * consejo que va y vuelve. Acto B: sobrepasar los límites: quien aconseja salta la cerca del otro sin que
 * se lo pidan; el globo del ego se infla, el medidor de credibilidad cae y un solo mal consejo derriba
 * las estrellas del prestigio. Acto C: diagnosticar mal: la lupa sobre un rompecabezas; la pieza de un
 * caso que ya viste no encaja; el relato parcial de una parte interesada (media hoja a oscuras) y la boca
 * cerrada que no hace preguntas básicas. Acto D: aconsejar desde ti: «yo en tu lugar…» frente a un
 * cliente con otros límites; en ventas, primero preguntas, después la llave que calza en su cerradura.
 */

const ID = 'ce33';
const nombres = ['garvin', 'margolis', 'dar', 'limites', 'nadiePidio', 'intromision', 'sinCompetente', 'pierdeCred', 'malConsejo', 'diagnosticar', 'pronto', 'yaViste', 'interesada', 'parcial', 'basicas', 'desdeTi', 'yoEnTu', 'desagradable', 'historias', 'restricciones', 'enVentas', 'conPreguntas', 'harias', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Pieza de rompecabezas con una saliente arriba y otra a la derecha. */
const Pieza: React.FC<{ x: number; y: number; s?: number; fill: string; rot?: number }> = ({ x, y, s = 1, fill, rot = 0 }) => (
  <path transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`} fill={fill}
    d="M -50 -50 H -14 Q -14 -76 0 -76 Q 14 -76 14 -50 H 50 V -14 Q 76 -14 76 0 Q 76 14 50 14 V 50 H -50 Z" />
);

export const AconsejarCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('harias') + 1 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Garvin y Margolis'], [M('dar'), 'Dar y recibir consejo'], [M('limites'), '1 · Sobrepasar los límites'], [M('sinCompetente'), 'Opinar sin saber'],
    [M('malConsejo'), 'Un solo mal consejo'], [M('diagnosticar'), '2 · Diagnosticar mal'], [M('yaViste'), 'No es el caso que viste'], [M('interesada'), 'Un relato parcial'],
    [M('basicas'), 'Las preguntas básicas'], [M('desdeTi'), '3 · Aconsejar desde ti'], [M('historias'), 'Sus límites no son los tuyos'], [M('enVentas'), 'En ventas'],
  ];

  const aA = ventana(t, -1, M('limites'));
  const aB = ventana(t, M('limites'), M('diagnosticar'));
  const aC = ventana(t, M('diagnosticar'), M('desdeTi'));
  const aD = ac(t, M('desdeTi'), M('desdeTi') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los errores de quien aconseja: sobrepasar los límites, diagnosticar mal y aconsejar desde ti">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · Garvin y Margolis */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {[['Garvin', 330, M('garvin'), '#334155'], ['Margolis', 870, M('margolis'), '#0f766e']].map(([txt, x, t0, col]) => (
                  <g key={txt as string} opacity={e1(t, t0 as number)}>
                    <Persona id={ID} x={x as number} y={760} cuerpo={col as string} corbata />
                    <Gesto x={x as number} y={760} animo={0.5} />
                    <Etiqueta x={x as number} y={820} texto={txt as string} op={1} c={c} id={ID} />
                  </g>
                ))}
                <g opacity={e1(t, M('dar'))}>
                  <path d="M 400 470 Q 600 380 800 470" stroke={NARANJA} strokeWidth={8} fill="none" strokeLinecap="round" />
                  <path d="M 780 446 L 806 474 L 772 482" stroke={NARANJA} strokeWidth={8} fill="none" strokeLinecap="round" />
                  <path d="M 800 540 Q 600 620 400 540" stroke={ROSA} strokeWidth={8} fill="none" strokeLinecap="round" />
                  <path d="M 420 516 L 394 544 L 428 552" stroke={ROSA} strokeWidth={8} fill="none" strokeLinecap="round" />
                  <Chip x={600} y={300} texto="consejo" c={c} id={ID} op={1} marca />
                </g>
              </g>
            )}

            {/* B · sobrepasar los límites */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const salta = ac(t, M('intromision'), M('intromision') + 1.2);
                  const ego = ac(t, M('sinCompetente'), M('sinCompetente') + 2);
                  const caen = ac(t, M('malConsejo') + 0.8, M('malConsejo') + 2);
                  const credito = 0.85 - 0.6 * ac(t, M('pierdeCred'), M('pierdeCred') + 1.5);
                  return (
                    <g>
                      {/* la cerca del otro */}
                      <g opacity={e1(t, M('limites'))}>
                        {Array.from({ length: 6 }, (_, k) => <rect key={k} x={560 + k * 34} y={640} width={20} height={130} rx={6} fill="#a16207" />)}
                        <rect x={550} y={670} width={210} height={14} fill="#a16207" /><rect x={550} y={730} width={210} height={14} fill="#a16207" />
                      </g>
                      <Persona id={ID} x={940} y={770} cuerpo="#0f766e" />
                      <Gesto x={940} y={770} animo={0.2 - 0.6 * salta} />
                      <Etiqueta x={940} y={830} texto="no lo pidió" op={e1(t, M('nadiePidio'))} c={c} id={ID} />
                      <g transform={`translate(${470 * salta} ${-120 * Math.sin(Math.PI * salta)})`}>
                        <Persona id={ID} x={300} y={770} cuerpo="#334155" corbata />
                        <Gesto x={300} y={770} animo={0.6} />
                        {/* el globo del ego */}
                        <g opacity={ego}>
                          <line x1={340} y1={660} x2={360} y2={520 - 60 * ego} stroke={c.tenue} strokeWidth={3} />
                          <ellipse cx={360} cy={470 - 60 * ego} rx={40 + 40 * ego} ry={50 + 46 * ego} fill={ROSA} opacity={0.8} />
                          <Txt f="a" x={360} y={480 - 60 * ego} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">ego</Txt>
                        </g>
                      </g>
                      <Chip x={600} y={300} texto="intromisión" c={c} id={ID} op={ventana(t, M('intromision'), M('sinCompetente'))} />
                      <g opacity={e1(t, M('pierdeCred'))}>
                        <Medidor x={300} y={440} r={100} v={credito} c={c} id={ID} etiqueta="credibilidad" />
                      </g>
                      {/* las estrellas del prestigio que caen */}
                      <g opacity={e1(t, M('malConsejo'))}>
                        {[0, 1, 2, 3].map((k) => <Estrella key={k} x={470 + k * 70} y={260 + caen * (380 + k * 30)} r={26} fill="#fbbf24" rot={caen * 200} op={1 - 0.8 * caen} />)}
                        <Etiqueta x={575} y={330} texto="prestigio" op={1 - caen} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · diagnosticar mal */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const encaja = ac(t, M('yaViste'), M('yaViste') + 1.6);
                  return (
                    <g>
                      <g opacity={ventana(t, M('diagnosticar'), M('interesada'))}>
                        <Lupa x={360} y={430} r={120} c={c} id={ID} clip={`${ID}-lupa`}>
                          <Pieza x={-30} y={20} s={0.9} fill={c.apagado} />
                        </Lupa>
                        <Chip x={360} y={640} texto="demasiado pronto" c={c} id={ID} op={e1(t, M('pronto'))} />
                        {/* la pieza del caso que ya viste no encaja */}
                        <g opacity={e1(t, M('yaViste'))}>
                          <Pieza x={850} y={470} s={1.1} fill={c.panel2} />
                          <Pieza x={850 + 60 * (1 - encaja)} y={470 - 20 * (1 - encaja)} s={1.1} rot={25 * encaja} fill={NARANJA} />
                          <g opacity={ac(t, M('yaViste') + 1.6, M('yaViste') + 2.2)}><Cruz x={960} y={360} s={0.9} /></g>
                          <Etiqueta x={850} y={640} texto="un caso que ya viste" op={1} c={c} id={ID} />
                        </g>
                      </g>
                      {/* el relato parcial de una parte interesada */}
                      <g opacity={e1(t, M('interesada'))}>
                        <Persona id={ID} x={900} y={770} cuerpo="#0f766e" />
                        <Gesto x={900} y={770} animo={0.3} />
                        <Etiqueta x={900} y={830} texto="parte interesada" op={1} c={c} id={ID} />
                        <g opacity={e1(t, M('parcial'))}>
                          <rect x={480} y={260} width={260} height={300} rx={14} fill={c.blanco} style={sombra(c.sombra)} />
                          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={510} y={300 + k * 40} width={200} height={12} rx={6} fill={c.apagado} />)}
                          <rect x={610} y={260} width={130} height={300} rx={14} fill="#1f2937" opacity={0.85} />
                          <Etiqueta x={610} y={610} texto="relato parcial" op={1} c={c} id={ID} />
                        </g>
                        <Persona id={ID} x={250} y={770} cuerpo="#334155" corbata />
                        <Gesto x={250} y={770} animo={-0.1} />
                        <g opacity={e1(t, M('basicas'))}>
                          <rect x={232} y={638} width={36} height={8} rx={4} fill="#1f2937" />
                          {[0, 1, 2].map((k) => <Txt key={k} x={170 + k * 60} y={500 - 10 * Math.sin(t * 3 + k)} textAnchor="middle" fontSize={44} fill={c.apagado}>?</Txt>)}
                          <Etiqueta x={250} y={830} texto="no pregunta" op={1} c={c} id={ID} />
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · aconsejar desde ti */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const ventas = ac(t, M('enVentas'), M('enVentas') + 0.6);
                  const calza = ac(t, M('harias') - 2, M('harias'));
                  return (
                    <g>
                      <Persona id={ID} x={250} y={770} cuerpo="#334155" corbata />
                      <Gesto x={250} y={770} animo={0.6 - 0.3 * ventas} />
                      <Etiqueta x={250} y={830} texto="tú" op={1} c={c} id={ID} />
                      <Persona id={ID} x={950} y={770} cuerpo="#0f766e" />
                      <Gesto x={950} y={770} animo={-0.4 * (1 - ventas) + 0.7 * calza} />
                      <Etiqueta x={950} y={830} texto="cliente" op={1} c={c} id={ID} />
                      <g opacity={ventana(t, M('yoEnTu') - 0.3, M('historias'))}>
                        <Burbuja x={280} y={570} w={460} texto="Yo en tu lugar haría esto." u={ac(t, M('yoEnTu') - 0.3, M('yoEnTu') + 1.2)} c={c} id={ID} />
                        <Chip x={880} y={320} texto="desagradable" c={c} id={ID} op={e1(t, M('desagradable'))} />
                      </g>
                      {/* los límites del cliente */}
                      <g opacity={ventana(t, M('historias'), M('enVentas'))}>
                        {['poder', 'negociación', 'astucia', 'restricciones'].map((txt, k) => <Chip key={txt} x={k % 2 ? 860 : 520} y={300 + Math.floor(k / 2) * 95} texto={txt} c={c} id={ID} op={e1(t, M('historias') + 2 + k * 1.2 + (k === 3 ? M('restricciones') - M('historias') - 5.6 : 0))} marca={k === 3} />)}
                      </g>
                      {/* en ventas: primero preguntas, luego la llave que calza */}
                      <g opacity={ventas}>
                        {[0, 1, 2].map((k) => <Txt key={k} x={480 + k * 90} y={360 - 10 * Math.sin(t * 3 + k)} textAnchor="middle" fontSize={56} fill={`url(#${ID}-marcaH)`} opacity={e1(t, M('conPreguntas') + k * 0.4)}>?</Txt>)}
                        <g opacity={e1(t, M('harias') - 2.5)}>
                          <g transform="translate(860 470)">
                            <rect x={-60} y={-40} width={120} height={110} rx={14} fill={c.tenue} />
                            <path d="M -36 -40 V -76 Q -36 -110 0 -110 Q 36 -110 36 -76 V -40" stroke={c.tenue} strokeWidth={14} fill="none" />
                            <circle cx={0} cy={6} r={12} fill="#1f2937" /><rect x={-5} y={6} width={10} height={30} fill="#1f2937" />
                          </g>
                          <g transform={`translate(${520 + 300 * calza} 476)`}>
                            <circle cx={0} cy={0} r={26} fill="none" stroke={NARANJA} strokeWidth={10} />
                            <rect x={22} y={-6} width={60} height={12} fill={NARANJA} /><rect x={66} y={6} width={10} height={14} fill={NARANJA} />
                          </g>
                          <g opacity={ac(t, M('harias'), M('harias') + 0.5)}><Visto x={960} y={380} s={0.9} /></g>
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
