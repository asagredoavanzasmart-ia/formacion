import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Brazos, Burbuja, Chip, Cruz, Estrella, Etiqueta, Gesto, Hoja, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Hablar con, no hablar a» (Groysberg y Slind: interactividad e inclusión), escena propia. Acto A: dos
 * pantallas de videoconferencia, una a tamaño real y otra bajo el 80 %, que se apaga; en la llamada de
 * Randy Pond un colega se toma la cabeza y Pond le pide el desacuerdo. Acto B: la torta de cumpleaños de
 * John Chambers, sin gerentes. Acto C: la inclusión en tres columnas: el embajador de Coca-Cola ordena la
 * góndola, el ingeniero de Juniper habla en una conferencia y los empleados de EMC escriben juntos un
 * libro. Acto D: el control ya se perdió: un escritorio desde el que se suben o bajan las estrellas de la
 * reputación; Infosys: discrepar sin ser desagradable.
 */

const ID = 'ce2h';
const nombres = ['aLaGente', 'cisco', 'p80', 'real', 'pond', 'cabeza', 'viendo', 'dimelo', 'completa', 'chambers', 'cumplian', 'sinGerentes', 'inclusion', 'crean', 'embajadores', 'coca', 'nueve', 'opinion', 'juniper', 'narradores', 'emc', 'madre', 'ceder', 'perdio', 'escritorio', 'infosys', 'desagradable', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Pantalla de videoconferencia con una persona escalada `s`. */
const Pantalla: React.FC<{ x: number; y: number; s: number; c: C; id: string; atenua?: number; manos?: number }> = ({ x, y, s, c, id, atenua = 0, manos = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={-130} width={340} height={240} rx={16} fill="#0f172a" style={sombra(c.sombra)} />
    <defs><clipPath id={`${id}-p${x}`}><rect x={-160} y={-120} width={320} height={220} rx={10} /></clipPath></defs>
    <g clipPath={`url(#${id}-p${x})`} opacity={1 - 0.6 * atenua}>
      <rect x={-160} y={-120} width={320} height={220} fill="#1e293b" />
      <Persona id={id} x={0} y={100 + 60 * (1 - s)} s={1.1 * s} cuerpo="#0f766e" />
      {manos > 0.01 && <Brazos x={0} y={100 + 60 * (1 - s)} s={1.1 * s} izq={165 * manos} der={165 * manos} id={id} color="#0f766e" />}
      {manos > 0.01 && <Gesto x={0} y={100 + 60 * (1 - s)} s={1.1 * s} animo={-0.8 * manos} />}
    </g>
    <rect x={-60} y={112} width={120} height={14} rx={6} fill="#374151" />
  </g>
);

export const InteractividadCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('desagradable') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Interactividad'], [M('cisco'), 'Cisco: el tamaño importa'], [M('pond'), 'Randy Pond'], [M('viendo'), 'Te estoy viendo'],
    [M('chambers'), 'John Chambers'], [M('inclusion'), 'Inclusión'], [M('embajadores'), 'Embajadores'], [M('opinion'), 'Líderes de opinión'],
    [M('narradores'), 'Narradores'], [M('ceder'), 'Ceder control'], [M('infosys'), 'Discrepar con respeto'],
  ];

  const aA = ventana(t, -1, M('chambers'));
  const aB = ventana(t, M('chambers'), M('inclusion'));
  const aC = ventana(t, M('inclusion'), M('ceder'));
  const aD = ac(t, M('ceder'), M('ceder') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Hablar con la gente y no solo a la gente; los empleados también crean el mensaje">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · Cisco: tamaño real; Randy Pond */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const llamada = ac(t, M('pond') - 0.3, M('pond') + 0.4);
                  return (
                    <g>
                      <g opacity={(1 - llamada) * e1(t, M('cisco'))}>
                        <Pantalla x={350} y={430} s={1} c={c} id={ID} />
                        <Pantalla x={850} y={430} s={0.62} c={c} id={ID} atenua={ac(t, M('p80') + 1, M('p80') + 2)} />
                        <Etiqueta x={350} y={610} texto="tamaño real" op={e1(t, M('real'))} c={c} id={ID} marca />
                        <Etiqueta x={850} y={610} texto="menos del 80 %" op={e1(t, M('p80'))} c={c} id={ID} />
                      </g>
                      <g opacity={llamada}>
                        <Pantalla x={820} y={400} s={1} c={c} id={ID} manos={ac(t, M('cabeza'), M('cabeza') + 0.6) * (1 - ac(t, M('completa'), M('completa') + 0.6))} />
                        <Persona id={ID} x={220} y={760} cuerpo="#1e3a8a" corbata />
                        <Gesto x={220} y={760} animo={0.4} />
                        <Etiqueta x={220} y={820} texto="Randy Pond" op={1} c={c} id={ID} />
                        <g opacity={ventana(t, M('viendo') - 0.3, M('dimelo'))}>
                          <Burbuja x={250} y={560} w={380} texto="Te estoy viendo." u={ac(t, M('viendo') - 0.3, M('viendo') + 0.8)} c={c} id={ID} />
                        </g>
                        <g opacity={ventana(t, M('dimelo') - 0.4, M('completa') + 0.4)}>
                          <Burbuja x={250} y={560} w={420} texto="Si no estás de acuerdo, dímelo." u={ac(t, M('dimelo') - 1.2, M('dimelo') + 0.4)} c={c} id={ID} marca />
                        </g>
                        <g opacity={e1(t, M('completa'))}>
                          <Hoja x={820} y={680} w={240} h={150} c={c} cabeza={NARANJA} titulo="la historia" llena={1} tituloTam={22} />
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · Chambers y los cumpleaños, sin gerentes */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Persona id={ID} x={220} y={760} cuerpo="#334155" corbata />
                <Gesto x={220} y={760} animo={0.7} />
                <Etiqueta x={220} y={820} texto="John Chambers" op={1} c={c} id={ID} />
                <g opacity={e1(t, M('cumplian'))}>
                  <rect x={520} y={520} width={200} height={90} rx={14} fill="#f9a8d4" />
                  <rect x={520} y={500} width={200} height={30} rx={12} fill={c.blanco} />
                  {[560, 620, 680].map((x, k) => <g key={x}><rect x={x - 5} y={460} width={10} height={40} fill={NARANJA} /><ellipse cx={x} cy={452 + 2 * Math.sin(t * 9 + k)} rx={6} ry={10} fill="#fbbf24" /></g>)}
                  {[840, 960, 1080].map((x, k) => (
                    <g key={x}>
                      <Persona id={ID} x={x} y={760} s={0.85} cuerpo={['#0f766e', '#7c3aed', '#a16207'][k]} />
                      <Gesto x={x} y={760} s={0.85} animo={0.7} />
                    </g>
                  ))}
                </g>
                <g opacity={e1(t, M('sinGerentes'))}>
                  <Chip x={620} y={320} texto="sin gerentes" c={c} id={ID} op={1} />
                  <Cruz x={850} y={320} s={0.8} />
                </g>
              </g>
            )}

            {/* C · embajadores, líderes de opinión y narradores */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <Chip x={600} y={250} texto="crean el mensaje" c={c} id={ID} op={e1(t, M('crean'))} marca />
                {/* Coca-Cola: la góndola ordenada */}
                <g opacity={e1(t, M('embajadores'))}>
                  <rect x={120} y={380} width={240} height={260} rx={12} fill={c.panel} style={sombra(c.sombra)} />
                  {[0, 1, 2].map((f) => <g key={f}><rect x={120} y={460 + f * 80} width={240} height={8} fill={c.apagado} />{[0, 1, 2, 3].map((k) => <rect key={k} x={140 + k * 54} y={410 + f * 80} width={38} height={50} rx={8} fill="#dc2626" opacity={f * 4 + k < Math.round(12 * ac(t, M('nueve'), M('nueve') + 3)) ? 1 : 0.35} />)}</g>)}
                  <Etiqueta x={240} y={690} texto="embajadores" op={1} c={c} id={ID} />
                  <Etiqueta x={240} y={735} texto="Coca-Cola" op={e1(t, M('coca'))} c={c} id={ID} />
                </g>
                {/* Juniper: el ingeniero en una conferencia */}
                <g opacity={e1(t, M('opinion'))}>
                  <Persona id={ID} x={600} y={620} s={0.85} cuerpo="#0e7490" />
                  <Gesto x={600} y={620} s={0.85} animo={0.6} />
                  <path d="M 550 610 H 650 L 640 690 H 560 Z" fill={c.tenue} />
                  <Etiqueta x={600} y={740} texto="líderes de opinión" op={1} c={c} id={ID} />
                  <Etiqueta x={600} y={785} texto="Juniper" op={e1(t, M('juniper'))} c={c} id={ID} />
                </g>
                {/* EMC: el libro escrito entre todos */}
                <g opacity={e1(t, M('narradores'))}>
                  <g transform="translate(960 520)">
                    <path d="M -120 -90 Q -60 -115 0 -90 V 100 Q -60 75 -120 100 Z" fill={c.blanco} style={sombra(c.sombra)} />
                    <path d="M 120 -90 Q 60 -115 0 -90 V 100 Q 60 75 120 100 Z" fill={c.blanco} style={sombra(c.sombra)} />
                    {[0, 1, 2, 3].map((k) => <rect key={k} x={-100} y={-55 + k * 30} width={80 * ac(t, M('emc') + k * 0.4, M('emc') + k * 0.4 + 0.6)} height={8} rx={4} fill={[NARANJA, ROSA, '#7c3aed', '#0f766e'][k]} />)}
                    <g opacity={e1(t, M('madre'))}><circle cx={60} cy={-10} r={18} fill="#e2a37c" /><circle cx={60} cy={34} r={11} fill="#e2a37c" /><path d="M 36 70 Q 60 20 84 70 Z" fill={ROSA} /></g>
                  </g>
                  <Etiqueta x={960} y={690} texto="narradores" op={1} c={c} id={ID} />
                  <Etiqueta x={960} y={735} texto="EMC" op={e1(t, M('emc'))} c={c} id={ID} />
                </g>
              </g>
            )}

            {/* D · el control ya se perdió; discrepar sin ser desagradable */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const sube = (Math.sin(t * 1.5) + 1) / 2;
                  return (
                    <g>
                      <g opacity={ventana(t, M('ceder'), M('escritorio'))}>
                        <rect x={460} y={380} width={120} height={80} rx={30} fill={c.texto} />
                        <circle cx={490} cy={420} r={14} fill={ROSA} /><circle cx={550} cy={420} r={14} fill={NARANJA} />
                        <path d={`M 600 420 Q 700 ${360 + 40 * Math.sin(t * 3)} 820 420`} stroke={c.tenue} strokeWidth={5} fill="none" strokeDasharray="10 10" />
                        <Chip x={640} y={560} texto="ya se perdió" c={c} id={ID} op={e1(t, M('perdio'))} />
                      </g>
                      <g opacity={e1(t, M('escritorio'))}>
                        <rect x={180} y={640} width={420} height={24} rx={10} fill={c.apagado} />
                        <path d="M 330 640 L 342 580 H 450 L 462 640 Z" fill="#1f2937" />
                        <Persona id={ID} x={260} y={760} s={0.9} cuerpo="#64748b" />
                        <Gesto x={260} y={760} s={0.9} animo={0.2} />
                        {[0, 1, 2, 3, 4].map((k) => <Estrella key={k} x={720 + k * 80} y={400} r={30} fill={k < 1 + Math.round(4 * sube) ? '#fbbf24' : c.apagado} />)}
                        <Etiqueta x={880} y={480} texto="la reputación" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('infosys'))}>
                        <Chip x={880} y={600} texto="discrepar, sí" c={c} id={ID} op={1} />
                        <Chip x={880} y={690} texto="desagradable, no" c={c} id={ID} op={e1(t, M('desagradable'))} marca />
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
