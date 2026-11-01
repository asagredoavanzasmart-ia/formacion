import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Etiqueta, Gesto, Ondas, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { Cierre } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «La organización que vende» (apertura de la parte 2), escena propia. Un corte de la oficina: adentro el
 * líder y el equipo, afuera el cliente, y una puerta entre ambos. Acto A: lo que nadie se atreve a decir
 * es una burbuja con cierre; las cuatro fugas (mensajes confusos, malas noticias calladas, críticas mal
 * recibidas, conflictos tardíos) aparecen en fila. Acto B: la conversación interna tiene reglas: flechas
 * que se alinean, alguien que calla, alguien que se atreve y una ampolleta del aprendizaje. Acto C:
 * escuchar y preguntar funciona afuera, con el cliente, y también puertas adentro.
 */

const ID = 'ce2a';
const nombres = ['dentro', 'seAtreve', 'equipo', 'confusos', 'malas', 'criticas', 'conflictos', 'reglas', 'alinean', 'calla', 'atreverse', 'aprendizaje', 'escuchar', 'puertas', 'pregunta'] as const;

export const Portada2CE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('puertas') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Adentro de la empresa'], [M('seAtreve'), 'Lo que nadie dice'], [M('confusos'), 'Cuatro fugas'], [M('reglas'), 'Reglas predecibles'],
    [M('calla'), 'Callar o atreverse'], [M('aprendizaje'), 'Crítica que enseña'], [M('escuchar'), 'Escuchar y preguntar'], [M('puertas'), 'También puertas adentro'],
  ];

  const aA = ventana(t, -1, M('reglas'));
  const aB = ventana(t, M('reglas'), M('escuchar'));
  const aC = ac(t, M('escuchar'), M('escuchar') + 0.4);
  const adentro = ac(t, M('puertas'), M('puertas') + 0.8);
  const fugas: [string, number][] = [['mensajes confusos', M('confusos')], ['malas noticias', M('malas')], ['críticas', M('criticas')], ['conflictos', M('conflictos')]];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Lo que el vendedor dice afuera nace de lo que se habla adentro de la empresa">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* la oficina, la puerta y el cliente afuera */}
            <g opacity={e1(t, 0.2)}>
              <rect x={110} y={220} width={660} height={590} rx={26} fill={c.panel2} opacity={0.55 + 0.25 * adentro} />
              <rect x={740} y={520} width={34} height={290} rx={6} fill="#a16207" opacity={0.85} />
              <Txt f="a" x={440} y={258} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={0.8}>la empresa</Txt>
            </g>
            {([[250, '#334155', true, 'líder'], [430, '#0f766e', false, ''], [610, '#7c3aed', false, 'vendedor']] as const).map(([x, col, corb, et], k) => (
              <g key={x} opacity={e1(t, (k ? M('equipo') : 0.4) + k * 0.25)}>
                <Persona id={ID} x={x} y={760} s={0.9} cuerpo={col} corbata={corb} />
                <Gesto x={x} y={760} s={0.9} animo={k === 1 ? 0.3 - 0.6 * ventana(t, M('calla'), M('escuchar')) : 0.4} />
                {et && <Etiqueta x={x} y={815} texto={et} op={1} c={c} id={ID} />}
              </g>
            ))}
            <Cierre x={430} y={760} s={0.9} op={ventana(t, M('calla'), M('escuchar'))} />
            <g opacity={e1(t, 0.8)}>
              <Persona id={ID} x={1010} y={760} cuerpo="#1f2937" />
              <Gesto x={1010} y={760} animo={0.3 + 0.4 * aC} />
              <Etiqueta x={1010} y={815} texto="cliente" op={1} c={c} id={ID} />
            </g>

            {/* A · lo que nadie se atreve a decir y las cuatro fugas */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <g opacity={ventana(t, M('seAtreve'), M('confusos'))}>
                  <ellipse cx={440} cy={420} rx={190} ry={110} fill={c.apagado} />
                  <path d="M 400 520 L 380 570 L 450 525 Z" fill={c.apagado} />
                  <rect x={330} y={410} width={220} height={18} rx={8} fill="#374151" />
                  {Array.from({ length: 10 }, (_, k) => <line key={k} x1={340 + k * 21} y1={410} x2={340 + k * 21} y2={428} stroke="#d1d5db" strokeWidth={3} />)}
                </g>
                {fugas.map(([txt, t0], k) => (
                  <g key={txt} opacity={e1(t, t0)}>
                    <Chip x={440} y={300 + k * 80} texto={txt} c={c} id={ID} op={1} marca={k === 3} />
                  </g>
                ))}
              </g>
            )}

            {/* B · las reglas de la conversación interna */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const alinea = ac(t, M('alinean'), M('alinean') + 1.6);
                  return (
                    <g>
                      <g opacity={e1(t, M('reglas'))}>
                        {Array.from({ length: 5 }, (_, k) => {
                          const ang = (1 - alinea) * [50, -70, 120, -30, 160][k];
                          return (
                            <g key={k} transform={`translate(${250 + k * 95} 340) rotate(${ang})`}>
                              <path d="M -30 0 H 24 M 10 -14 L 26 0 L 10 14" stroke={k % 2 ? ROSA : NARANJA} strokeWidth={8} fill="none" strokeLinecap="round" />
                            </g>
                          );
                        })}
                        <Etiqueta x={440} y={420} texto="palabras que alinean" op={e1(t, M('alinean'))} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('atreverse'))}>
                        <Burbuja x={630} y={570} w={170} texto="¡Ojo!" u={1} c={c} id={ID} marca />
                      </g>
                      <g opacity={e1(t, M('aprendizaje'))} transform={`translate(260 ${520 + 4 * Math.sin(t * 3)})`}>
                        <circle r={56} fill="#fde68a" opacity={0.35} />
                        <path d="M -30 8 Q -44 -18 -26 -40 Q 0 -64 26 -40 Q 44 -18 30 8 Q 20 20 18 32 H -18 Q -20 20 -30 8 Z" fill={`url(#${ID}-marca)`} />
                        <rect x={-16} y={34} width={32} height={10} rx={4} fill="#9ca3af" />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · escuchar y preguntar, afuera y adentro */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <Ondas x1={660} y1={600} x2={960} y2={600} t={t} color={NARANJA} n={3} op={1 - 0.6 * adentro} />
                <Ondas x1={960} y1={560} x2={660} y2={560} t={t + 0.5} color={ROSA} n={3} op={1 - 0.6 * adentro} />
                <Chip x={900} y={330} texto="escuchar" c={c} id={ID} op={1} />
                <Chip x={900} y={420} texto="preguntar" c={c} id={ID} op={e1(t, M('escuchar') + 0.8)} />
                <g opacity={adentro}>
                  <Ondas x1={290} y1={580} x2={400} y2={580} t={t} color={NARANJA} n={2} />
                  <Ondas x1={570} y1={580} x2={460} y2={580} t={t + 0.4} color={ROSA} n={2} />
                  <Chip x={440} y={350} texto="puertas adentro" c={c} id={ID} op={1} marca />
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
