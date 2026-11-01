import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, Hoja, Ondas, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Abrir y cerrar con rumbo» (Groysberg y Slind: intencionalidad), escena propia. Acto A: un embudo: las
 * ideas entran abiertas y salen cerradas en una flecha hacia la estrategia; el líder explica su lógica y
 * gana consentimiento, no obediencia. Acto B: Infosys: ideas que suben desde todos los niveles, 17
 * tendencias y foros en línea. Acto C: el mercado de Kingfisher en Barcelona: puestos con proveedores de
 * delantal, compradores con cinco cheques y ejecutivos que circulan; una conversación ruidosa que alinea.
 * Acto D: el megáfono unidireccional y el folleto pulido se tachan; quedan las cuatro íes.
 */

const ID = 'ce2i';
const nombres = ['orden', 'rumbo', 'flujo', 'cierra', 'logica', 'consentimiento', 'crearla', 'infosys', 'tendencias', 't17', 'foros', 'kingfisher', 'unEquipo', 'barcelona', 'mercado', 'p22', 'delantal', 'compradores', 'cheques', 'comite', 'desordenada', 'alinear', 'reconozcas', 'unidireccionales', 'pulidos', 'intima', 'pregunta'] as const;

export const IntencionalidadCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('intima') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Intencionalidad'], [M('flujo'), 'Abrir el flujo'], [M('cierra'), 'Cerrarlo en acciones'], [M('logica'), 'Explicar la lógica'],
    [M('crearla'), 'Participar en crearla'], [M('infosys'), 'Infosys'], [M('kingfisher'), 'Kingfisher'], [M('mercado'), 'Un mercado en Barcelona'],
    [M('desordenada'), 'Ruidosa, pero con rumbo'], [M('reconozcas'), 'La conversación ocurre'], [M('intima'), 'Las cuatro íes'],
  ];

  const aA1 = ventana(t, -1, M('logica'));
  const aA2 = ventana(t, M('logica'), M('crearla'));
  const aB = ventana(t, M('crearla'), M('kingfisher'));
  const aC = ventana(t, M('kingfisher'), M('reconozcas'));
  const aD = ac(t, M('reconozcas'), M('reconozcas') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La intencionalidad cierra la conversación en acciones alineadas con la estrategia">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A1 · el embudo: abrir y cerrar */}
            {aA1 > 0.01 && (
              <g opacity={aA1}>
                {(() => {
                  const abre = e1(t, M('flujo'));
                  const cierra = ac(t, M('cierra'), M('cierra') + 1.2);
                  return (
                    <g>
                      <path d="M 260 260 L 700 420 V 500 L 260 660 Z" fill={c.panel2} opacity={e1(t, M('orden'))} />
                      {Array.from({ length: 14 }, (_, k) => {
                        const u = ((t * 0.35) + k / 14) % 1;
                        const y0 = 280 + (k * 53) % 360;
                        const x = 200 + 500 * u;
                        const y = y0 + (460 - y0) * Math.min(1, u * 1.1) * cierra + 0 * abre;
                        return <circle key={k} cx={x} cy={y} r={10} fill={[NARANJA, ROSA, '#7c3aed', '#0f766e'][k % 4]} opacity={abre * Math.sin(Math.PI * Math.min(1, u * 1.15))} />;
                      })}
                      <g opacity={cierra}>
                        <path d="M 720 460 H 940" stroke={NARANJA} strokeWidth={14} strokeLinecap="round" />
                        <path d="M 920 434 L 956 460 L 920 486" stroke={NARANJA} strokeWidth={14} fill="none" strokeLinecap="round" />
                        {[60, 40, 20].map((r, k) => <circle key={r} cx={1040} cy={460} r={r} fill={k % 2 ? c.panel : ROSA} />)}
                        <Etiqueta x={1040} y={570} texto="estrategia" op={1} c={c} id={ID} />
                      </g>
                      <Etiqueta x={330} y={720} texto="abrir" op={abre} c={c} id={ID} />
                      <Etiqueta x={760} y={720} texto="cerrar" op={cierra} c={c} id={ID} marca />
                      <Chip x={480} y={210} texto="con rumbo" c={c} id={ID} op={ventana(t, M('rumbo'), M('flujo'))} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* A2 · la lógica: consentimiento, no obediencia */}
            {aA2 > 0.01 && (
              <g opacity={aA2}>
                <Persona id={ID} x={220} y={760} cuerpo="#334155" corbata />
                <Gesto x={220} y={760} animo={0.5} />
                <g transform={`translate(560 380) rotate(${t * 40})`}>
                  {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-10} y={-70} width={20} height={26} rx={4} fill={`url(#${ID}-marca)`} transform={`rotate(${k * 45})`} />)}
                  <circle r={52} fill={`url(#${ID}-marca)`} /><circle r={18} fill={c.panel} />
                </g>
                <Etiqueta x={560} y={500} texto="la lógica" op={1} c={c} id={ID} />
                <g opacity={e1(t, M('consentimiento'))}>
                  <Chip x={920} y={350} texto="consentimiento" c={c} id={ID} op={1} marca />
                  <Visto x={920} y={430} s={0.9} />
                  <Txt f="a" x={920} y={560} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>obediencia</Txt>
                  <line x1={830} y1={550} x2={1010} y2={550} stroke="#c2263e" strokeWidth={5} />
                </g>
              </g>
            )}

            {/* B · Infosys: ideas desde todos los niveles */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const sube = ac(t, M('tendencias'), M('t17'));
                  return (
                    <g>
                      <g opacity={e1(t, M('infosys'))}>
                        {Array.from({ length: 4 }, (_, f) => Array.from({ length: f + 2 }, (_, k) => <circle key={`${f}-${k}`} cx={300 - ((f + 1) * 60) / 2 + k * 60} cy={360 + f * 90} r={18} fill={['#334155', '#475569', '#64748b', c.tenue][f]} />))}
                        <Etiqueta x={300} y={760} texto="todos los niveles" op={1} c={c} id={ID} />
                      </g>
                      {Array.from({ length: 6 }, (_, k) => {
                        const u = ((t - M('tendencias')) * 0.5 + k / 6) % 1;
                        return <circle key={k} cx={360 + 260 * u} cy={600 - 260 * u} r={9} fill={NARANJA} opacity={sube > 0 && t < M('t17') + 1 ? Math.sin(Math.PI * u) : 0} />;
                      })}
                      <g opacity={e1(t, M('t17'))}>
                        {Array.from({ length: 17 }, (_, k) => <rect key={k} x={620 + (k % 6) * 72} y={280 + Math.floor(k / 6) * 80} width={58} height={64} rx={8} fill={k % 2 ? ROSA : NARANJA} opacity={ac(t, M('t17') + k * 0.06, M('t17') + k * 0.06 + 0.3)} />)}
                        <Etiqueta x={800} y={560} texto="17 tendencias" op={1} c={c} id={ID} marca />
                      </g>
                      <g opacity={e1(t, M('foros'))}>
                        {[0, 1, 2].map((k) => <g key={k} transform={`translate(${700 + k * 120} ${660 + 10 * Math.sin(t * 2 + k)})`}><rect x={-46} y={-30} width={92} height={56} rx={16} fill={c.panel} style={sombra(c.sombra, 2, 6)} /><path d="M -20 26 L -30 42 L -4 26 Z" fill={c.panel} /><rect x={-28} y={-8} width={56} height={8} rx={4} fill={c.apagado} /></g>)}
                        <Etiqueta x={820} y={760} texto="foros en línea" op={1} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · el mercado de Kingfisher en Barcelona */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const camina = (t * 40) % 600;
                  return (
                    <g>
                      {/* las unidades separadas de Kingfisher que se juntan */}
                      <g opacity={ventana(t, M('kingfisher'), M('mercado'))}>
                        {[0, 1, 2].map((k) => {
                          const j = ac(t, M('unEquipo'), M('unEquipo') + 1.5);
                          const x = 300 + k * 300 + (1 - k) * 180 * j;
                          return (
                            <g key={k}>
                              <rect x={x - 90} y={440} width={180} height={150} rx={14} fill={[NARANJA, ROSA, '#7c3aed'][k]} opacity={0.85} />
                              <path d={`M ${x - 100} 440 L ${x} 380 L ${x + 100} 440 Z`} fill={c.tenue} />
                            </g>
                          );
                        })}
                        <Etiqueta x={600} y={660} texto="tercer minorista del hogar" op={e1(t, M('kingfisher') + 1)} c={c} id={ID} />
                      </g>
                      <Chip x={600} y={230} texto="un solo equipo" c={c} id={ID} op={ventana(t, M('unEquipo'), M('barcelona'))} />
                      <Chip x={600} y={230} texto="Barcelona" c={c} id={ID} op={ventana(t, M('barcelona'), M('cheques'))} />
                      <g opacity={e1(t, M('mercado'))}>
                        {Array.from({ length: 8 }, (_, k) => {
                          const x = 190 + (k % 4) * 270, y = 440 + Math.floor(k / 4) * 220;
                          return (
                            <g key={k} opacity={ac(t, M('p22') + k * 0.1, M('p22') + k * 0.1 + 0.3) * 0.7 + 0.3}>
                              <path d={`M ${x - 90} ${y - 110} H ${x + 90} L ${x + 80} ${y - 80} H ${x - 80} Z`} fill={k % 2 ? NARANJA : ROSA} />
                              {Array.from({ length: 6 }, (_, j) => <rect key={j} x={x - 90 + j * 30} y={y - 110} width={15} height={30} fill="#fff" opacity={0.5} />)}
                              <rect x={x - 80} y={y - 20} width={160} height={30} rx={6} fill={c.apagado} />
                              <Persona id={ID} x={x} y={y - 20} s={0.45} cuerpo="#334155" />
                              <rect x={x - 14} y={y - 62} width={28} height={30} rx={4} fill="#a16207" opacity={e1(t, M('delantal'))} />
                            </g>
                          );
                        })}
                        <Etiqueta x={600} y={820} texto="22 puestos" op={e1(t, M('p22'))} c={c} id={ID} />
                      </g>
                      {/* compradores con cheques que recorren los pasillos */}
                      <g opacity={e1(t, M('compradores'))}>
                        {[0, 1].map((k) => {
                          const x = 150 + ((camina + k * 300) % 900);
                          return (
                            <g key={k}>
                              <Persona id={ID} x={x} y={545} s={0.5} cuerpo="#0f766e" />
                              <rect x={x + 16} y={485} width={40} height={20} rx={3} fill="#bbf7d0" stroke="#15803d" strokeWidth={2} opacity={e1(t, M('cheques'))} />
                            </g>
                          );
                        })}
                      </g>
                      <Chip x={600} y={230} texto="5 cheques por comprador" c={c} id={ID} op={ventana(t, M('cheques'), M('comite'))} />
                      <Chip x={600} y={230} texto="comité que anima" c={c} id={ID} op={ventana(t, M('comite'), M('desordenada'))} />
                      <g opacity={e1(t, M('desordenada'))}>
                        <Ondas x1={260} y1={230} x2={400} y2={230} t={t * 1.5} color={c.tenue} n={4} />
                        <Ondas x1={940} y1={230} x2={800} y2={230} t={t * 1.5 + 0.5} color={c.tenue} n={4} />
                        <Chip x={600} y={230} texto="alinear" c={c} id={ID} op={e1(t, M('alinear'))} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · sin mensajes unidireccionales: las cuatro íes */}
            {aD > 0.01 && (
              <g opacity={aD}>
                <g opacity={ventana(t, M('reconozcas'), M('intima'))}>
                  <Chip x={600} y={260} texto="ocurre igual" c={c} id={ID} op={1} />
                  <g opacity={e1(t, M('unidireccionales'))}>
                    <path d="M 220 420 L 360 370 V 530 L 220 480 Z" fill={c.tenue} />
                    <rect x={190} y={420} width={36} height={60} rx={6} fill={c.tenue} />
                    <Cruz x={300} y={360} s={0.9} />
                  </g>
                  <g opacity={e1(t, M('pulidos'))}>
                    <rect x={800} y={360} width={200} height={260} rx={10} fill={c.blanco} style={sombra(c.sombra)} />
                    <rect x={820} y={380} width={160} height={110} rx={6} fill={`url(#${ID}-marca)`} opacity={0.6} />
                    <Cruz x={990} y={370} s={0.9} />
                    <Etiqueta x={900} y={670} texto="folletos pulidos" op={1} c={c} id={ID} />
                  </g>
                </g>
                {['íntima', 'interactiva', 'inclusiva', 'intencional'].map((txt, k) => (
                  <Chip key={txt} x={k % 2 ? 840 : 360} y={400 + Math.floor(k / 2) * 120} texto={txt} c={c} id={ID} op={e1(t, M('intima') + k * 0.3)} marca={k === 3} />
                ))}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
