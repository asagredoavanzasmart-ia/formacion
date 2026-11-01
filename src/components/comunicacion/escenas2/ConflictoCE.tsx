import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Brazos, Burbuja, Chip, Etiqueta, Gesto, PanelPregunta, Reloj, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { CincoConversaciones } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Anticipar el conflicto» (Toegel y Barsoux), escena propia. Acto A: el camino se bifurca: el conflicto
 * bueno lleva a una ampolleta y el malo se agrieta; las opiniones distintas no son el problema, sino
 * engranajes que no calzan en la forma de trabajar, y una barra de frustración que se llena. Acto B: las
 * cinco conversaciones aparecen arriba; un reloj de 20 a 30 minutos y la fórmula de Schein: «en mi
 * mundo…», «¿en tu mundo…?». Acto C: cómo nos vemos (el banquero de traje entre publicistas) y cómo
 * actuamos (el gesto de Thierry Henry, la puntualidad nórdica y la ayuda que se cobra en resentimiento).
 */

const ID = 'ce2v';
const nombres = ['valor', 'respetuosos', 'malo', 'toegel', 'veinticinco', 'distintas', 'forma', 'frustracion', 'cinco', 'm2030', 'vemos', 'actuamos', 'hablamos', 'pensamos', 'sentimos', 'miMundo', 'tuMundo', 'schein', 'fracciones', 'banca', 'traje', 'distancia', 'henry', 'lejos', 'puntualidad', 'nordica', 'urgencia', 'autopromocion', 'resentidos', 'pregunta'] as const;

/* Engranaje simple. */
const Engranaje: React.FC<{ x: number; y: number; r: number; giro: number; color: string; dientes?: number }> = ({ x, y, r, giro, color, dientes = 8 }) => (
  <g transform={`translate(${x} ${y}) rotate(${giro})`}>
    {Array.from({ length: dientes }, (_, k) => <rect key={k} x={-r * 0.18} y={-r - r * 0.28} width={r * 0.36} height={r * 0.4} rx={3} fill={color} transform={`rotate(${(k * 360) / dientes})`} />)}
    <circle r={r} fill={color} /><circle r={r * 0.35} fill="#fff" opacity={0.6} />
  </g>
);

export const ConflictoCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('resentidos') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Crear o destruir valor'], [M('toegel'), 'Toegel y Barsoux'], [M('forma'), 'La forma de trabajar'], [M('frustracion'), 'La frustración se acumula'],
    [M('cinco'), 'Cinco conversaciones'], [M('miMundo'), 'En mi mundo… ¿en tu mundo?'], [M('fracciones'), 'Cómo nos vemos'], [M('henry'), 'Cómo actuamos'],
    [M('puntualidad'), 'Puntualidad y urgencia'], [M('autopromocion'), 'Ayudar o lucirse'],
  ];

  const entra = [M('vemos'), M('actuamos'), M('hablamos'), M('pensamos'), M('sentimos')];
  const activo = t > M('henry') ? 1 : t > M('fracciones') ? 0 : -1;
  const aA = ventana(t, -1, M('cinco'));
  const aB = ventana(t, M('cinco'), M('fracciones'));
  const aC1 = ventana(t, M('fracciones'), M('henry'));
  const aC2 = ac(t, M('henry'), M('henry') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Anticipar el conflicto con cinco conversaciones antes de empezar a trabajar">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <CincoConversaciones t={t} entra={entra} activo={activo} c={c} id={ID} />

            {/* A · bueno o malo; engranajes que no calzan */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const llena = ac(t, M('frustracion'), M('frustracion') + 3);
                  const choque = ac(t, M('forma'), M('forma') + 1);
                  return (
                    <g>
                      <g opacity={ventana(t, M('valor'), M('toegel'))}>
                        <path d="M 260 640 H 520 L 800 420 M 520 640 L 800 760" stroke={c.apagado} strokeWidth={12} fill="none" strokeLinecap="round" />
                        <g opacity={e1(t, M('respetuosos'))} transform="translate(880 400)">
                          <circle r={50} fill="#fde68a" opacity={0.4} />
                          <path d="M -24 6 Q -36 -16 -20 -32 Q 0 -50 20 -32 Q 36 -16 24 6 Q 16 16 14 26 H -14 Q -16 16 -24 6 Z" fill={`url(#${ID}-marca)`} />
                        </g>
                        <g opacity={e1(t, M('malo'))}><path d="M 820 740 L 860 770 L 840 790 L 900 820" stroke="#dc2626" strokeWidth={6} fill="none" /></g>
                      </g>
                      <g opacity={e1(t, M('toegel'))}>
                        <Persona id={ID} x={180} y={760} s={0.85} cuerpo="#7c3aed" pelo="#2b1a12" />
                        <Persona id={ID} x={290} y={760} s={0.85} cuerpo="#334155" corbata />
                        <Etiqueta x={235} y={820} texto="25 años de estudio" op={e1(t, M('veinticinco'))} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('distintas'))}>
                        <circle cx={520} cy={340} r={44} fill={NARANJA} />
                        <rect x={620} y={296} width={88} height={88} rx={10} fill={ROSA} />
                        <Txt f="a" x={614} y={440} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>opiniones distintas: bien</Txt>
                      </g>
                      <g opacity={e1(t, M('forma'))}>
                        <Engranaje x={560 - 20 * choque} y={560} r={62} giro={t * 40 * (1 - choque) + 6 * choque * Math.sin(t * 20)} color={NARANJA} />
                        <Engranaje x={700 + 20 * choque} y={560} r={62} giro={-t * 40 * (1 - choque) + 18} color="#7c3aed" dientes={11} />
                        <Etiqueta x={630} y={680} texto="no calzan" op={choque} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('frustracion'))}>
                        <rect x={960} y={300} width={60} height={360} rx={18} fill={c.panel2} />
                        <rect x={960} y={300 + 360 * (1 - llena)} width={60} height={360 * llena} rx={18} fill="#dc2626" opacity={0.85} />
                        <Etiqueta x={990} y={710} texto="frustración" op={1} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · cinco conversaciones y la fórmula de Schein */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <g opacity={e1(t, M('m2030'))}>
                  <Reloj x={600} y={330} s={1} c={c} progreso={0.4} />
                  <Etiqueta x={600} y={410} texto="20 a 30 minutos" op={1} c={c} id={ID} />
                </g>
                <Persona id={ID} x={250} y={760} cuerpo="#334155" />
                <Gesto x={250} y={760} animo={0.5} />
                <Persona id={ID} x={950} y={760} cuerpo="#0f766e" />
                <Gesto x={950} y={760} animo={0.5} />
                <g opacity={e1(t, M('miMundo') - 0.3)}>
                  <Burbuja x={280} y={560} w={340} texto="En mi mundo…" u={ac(t, M('miMundo') - 0.3, M('miMundo') + 0.6)} c={c} id={ID} />
                </g>
                <g opacity={e1(t, M('tuMundo') - 0.3)}>
                  <Burbuja x={920} y={560} w={340} texto="¿En tu mundo…?" u={ac(t, M('tuMundo') - 0.3, M('tuMundo') + 0.6)} c={c} lado="der" id={ID} marca />
                </g>
                <Chip x={600} y={680} texto="Edgar Schein" c={c} id={ID} op={e1(t, M('schein'))} />
              </g>
            )}

            {/* C1 · cómo nos vemos: el traje entre publicistas */}
            {aC1 > 0.01 && (
              <g opacity={aC1}>
                {(() => {
                  const lejos = ac(t, M('distancia'), M('distancia') + 1.2);
                  return (
                    <g>
                      <g opacity={e1(t, M('banca'))} transform={`translate(${-80 * lejos} 0)`}>
                        <Persona id={ID} x={300} y={760} cuerpo="#1f2937" corbata />
                        <Gesto x={300} y={760} animo={0.3} />
                        <Etiqueta x={300} y={820} texto="viene de la banca" op={1} c={c} id={ID} />
                      </g>
                      {[700, 840, 980].map((x, k) => (
                        <g key={x}>
                          <Persona id={ID} x={x} y={760} s={0.9} cuerpo={[ROSA, '#f59e0b', '#22c55e'][k]} pelo={['#2b1a12', '#c49a6c', '#5b3a26'][k]} />
                          <Gesto x={x} y={760} s={0.9} animo={0.6} />
                        </g>
                      ))}
                      <Etiqueta x={840} y={820} texto="publicistas" op={1} c={c} id={ID} />
                      <Chip x={420} y={330} texto="traje y corbata" c={c} id={ID} op={e1(t, M('traje'))} />
                      <Chip x={760} y={430} texto="se siente especial" c={c} id={ID} op={e1(t, M('traje') + 2)} />
                      <g opacity={lejos}>
                        <path d="M 380 620 H 620" stroke={c.apagado} strokeWidth={6} strokeDasharray="10 10" />
                        <Etiqueta x={500} y={600} texto="distancia" op={1} c={c} id={ID} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C2 · cómo actuamos */}
            {aC2 > 0.01 && (
              <g opacity={aC2}>
                {(() => {
                  const henry = ventana(t, M('henry'), M('puntualidad'));
                  const punt = ventana(t, M('puntualidad'), M('autopromocion'));
                  const ayuda = e1(t, M('autopromocion'));
                  return (
                    <g>
                      <g opacity={henry}>
                        <rect x={260} y={600} width={680} height={30} rx={12} fill={c.apagado} />
                        <Persona id={ID} x={460} y={600} cuerpo="#1e3a8a" />
                        <Gesto x={460} y={600} animo={0.6} />
                        <Persona id={ID} x={740} y={600} cuerpo="#b91c1c" />
                        <Gesto x={740} y={600} animo={-0.4 * ac(t, M('lejos'), M('lejos') + 0.6)} />
                        <Brazos x={460} y={600} izq={10} der={70} id={ID} color="#1e3a8a" />
                        <Etiqueta x={460} y={680} texto="francés" op={1} c={c} id={ID} />
                        <Etiqueta x={740} y={680} texto="inglés" op={1} c={c} id={ID} />
                        <Chip x={600} y={300} texto="demasiado lejos" c={c} id={ID} op={e1(t, M('lejos'))} marca />
                      </g>
                      <g opacity={punt}>
                        <Reloj x={360} y={440} s={1.3} c={c} progreso={(t * 0.5) % 1} />
                        <Etiqueta x={360} y={560} texto="puntualidad" op={1} c={c} id={ID} />
                        <Persona id={ID} x={800} y={760} cuerpo="#0e7490" pelo="#fde68a" />
                        <Gesto x={800} y={760} animo={0.6} />
                        <Etiqueta x={800} y={820} texto="nórdicos" op={e1(t, M('nordica'))} c={c} id={ID} />
                        <Chip x={800} y={420} texto="¿falta de urgencia?" c={c} id={ID} op={e1(t, M('urgencia'))} />
                      </g>
                      <g opacity={ayuda}>
                        {[300, 470, 640].map((x, k) => (
                          <g key={x}>
                            <Persona id={ID} x={x} y={760} s={0.85} cuerpo="#0f766e" />
                            <Gesto x={x} y={760} s={0.85} animo={0.3 - 0.8 * ac(t, M('resentidos'), M('resentidos') + 0.6)} />
                          </g>
                        ))}
                        <Etiqueta x={470} y={820} texto="siempre ayudan" op={1} c={c} id={ID} />
                        {[860, 1010].map((x) => (
                          <g key={x}>
                            <Persona id={ID} x={x} y={760} s={0.85} cuerpo="#7c3aed" />
                            <Gesto x={x} y={760} s={0.85} animo={0.6} />
                          </g>
                        ))}
                        <Etiqueta x={935} y={820} texto="a veces" op={1} c={c} id={ID} />
                        <Chip x={600} y={330} texto="autopromoción y ayuda" c={c} id={ID} op={1} />
                        <Chip x={470} y={500} texto="resentidos" c={c} id={ID} op={e1(t, M('resentidos'))} marca />
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
