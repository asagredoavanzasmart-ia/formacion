import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, ac, sombra, tono } from '../../remotion/comun';
import { Chip, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador } from './comunOA';
import { AZUL_M, AZUL_O, Barco, Flecha, Mar, ROJO_M, ROJO_O } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * «Colonos, emigrantes y pioneros», escena propia. Un mar en tres tramos: rojo, un estrecho y azul. El colono
 * está anclado en el rojo, dentro de la norma del sector; el pionero zarpa al azul frente a una isla con una
 * gran masa de clientes; el emigrante va y viene por el estrecho sin cruzar. Luego una foto de la cartera
 * (barras por familia) y cinco productos que caen en su familia.
 */

const ID = 'oa8';
const nombres = ['familias', 'norma', 'habitual', 'rojo', 'pioneros', 'sinPrec', 'azul', 'emigrantes', 'entre', 'noAlcanza', 'foto', 'ejercicio', 'pregunta'] as const;

export const ProductosOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('ejercicio') + 5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Tres familias'], [M('norma'), 'Colonos: dentro de la norma'], [M('rojo'), 'Océano rojo'], [M('pioneros'), 'Pioneros'], [M('azul'), 'Océano azul'],
    [M('emigrantes'), 'Emigrantes'], [M('foto'), 'Una foto de tu cartera'], [M('ejercicio'), 'Haz el ejercicio'],
  ];

  // el emigrante va y viene por el estrecho y no cruza
  const ida = ac(t, M('entre'), M('entre') + 3);
  const ex = 600 + 90 * Math.sin(Math.max(0, t - M('entre')) * 1.1) * ida;
  const piox = lerp(880, 1010, ac(t, M('sinPrec'), M('sinPrec') + 12));
  const gente = [0, 1, 2, 3, 4, 5];
  const fot = ac(t, M('foto'), M('foto') + 0.5) * (1 - ac(t, M('ejercicio') - 0.3, M('ejercicio')));
  const ej = ac(t, M('ejercicio'), M('ejercicio') + 0.5);
  const caen = [0, 1, 2, 3, 4].map((j) => ac(t, M('ejercicio') + 1 + j * 0.9, M('ejercicio') + 2 + j * 0.9));
  const dest = [0, 1, 0, 2, 0];
  const dec = 1 - ej; // 0 colono, 1 emigrante, 2 pionero

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Productos colonos, emigrantes y pioneros en un mar rojo, un estrecho y un mar azul">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* el mar en tres tramos */}
            <g opacity={e1(t, 0.3)}>
              <Mar x={60} y={500} w={410} h={320} t={t} color={ROJO_M} oscuro={ROJO_O} />
              <Mar x={470} y={500} w={260} h={320} t={t} color="#8b5cf6" oscuro="#5b21b6" />
              <Mar x={730} y={500} w={410} h={320} t={t} color={AZUL_M} oscuro={AZUL_O} />
              {t >= M('noAlcanza') && <line x1={730} y1={500} x2={730} y2={810} stroke="#fff" strokeWidth={6} strokeDasharray="14 12" opacity={0.7 * e1(t, M('noAlcanza'))} />}
            </g>

            {/* colono: anclado dentro de la norma */}
            {t >= M('norma') && (
              <g opacity={e1(t, M('norma'))}>
                <Barco x={260} y={650 + 3 * Math.sin(t * 1.6)} s={0.95} casco="#7c2d12" vela="#fecaca" rot={Math.sin(t * 1.2) * 2} />
                <path d="M 330 654 L 340 700 M 322 690 H 358 M 340 700 Q 322 724 308 704 M 340 700 Q 358 724 372 704" stroke="#475569" strokeWidth={8} fill="none" strokeLinecap="round" />
                {[0, 1, 2].map((j) => <rect key={j} x={110 + j * 110} y={310} width={90} height={26} rx={13} fill={ROJO_M} opacity={0.9 * dec} />)}
              </g>
            )}
            {t >= M('habitual') && <path d="M 110 390 L 220 390 L 330 390 L 400 390" stroke={ROJO_O} strokeWidth={8} strokeLinecap="round" strokeDasharray="1 16" opacity={e1(t, M('habitual')) * dec} />}

            {/* pionero: valor sin precedentes y una gran masa de clientes */}
            {t >= M('pioneros') && (
              <g opacity={e1(t, M('pioneros'))}>
                <Barco x={piox} y={650 + 4 * Math.sin(t * 2)} s={0.95} casco="#1d4fbf" vela="#ffffff" rot={Math.sin(t * 1.4) * 3} />
                <g opacity={e1(t, M('sinPrec')) * dec} transform={`translate(930 300) scale(${1 + 0.06 * Math.sin(t * 3)})`}>
                  <circle r={92} fill="#fde047" opacity={0.25} />
                  <path d="M 0 -64 L 56 -12 L 0 64 L -56 -12 Z" fill={`url(#${ID}-marca)`} /><path d="M 0 -64 L 56 -12 L 0 -12 Z" fill="#fff" opacity={0.28} />
                </g>
              </g>
            )}
            {t >= M('azul') && (
              <g opacity={e1(t, M('azul'))}>
                <ellipse cx={940} cy={500} rx={190} ry={28} fill="#fde68a" />
                {gente.map((j) => <g key={j} opacity={e1(t, M('azul') + j * 0.25)}><Persona id={ID} x={820 + j * 38} y={498 + (j % 2) * 6} s={0.28} cuerpo={['#334155', '#7c3aed', '#0f766e', '#ec4899', '#f59e0b', '#2563eb'][j]} /></g>)}
              </g>
            )}

            {/* emigrante: entre los dos, sin alcanzar */}
            {t >= M('emigrantes') && (
              <g opacity={e1(t, M('emigrantes'))}>
                <Barco x={ex} y={660 + 4 * Math.sin(t * 2.2)} s={0.95} casco="#6d28d9" vela="#ede9fe" rot={Math.sin(t * 1.1) * 4} flip={Math.cos(Math.max(0, t - M('entre')) * 1.1) < 0 && ida > 0.5} />
                {t >= M('entre') && <Flecha x1={540} y1={470} x2={660} y2={470} color={NARANJA} grosor={8} op={e1(t, M('entre')) * dec} />}
                {t >= M('entre') && <Flecha x1={660} y1={440} x2={540} y2={440} color={ROSA} grosor={8} op={e1(t, M('entre')) * dec} />}
              </g>
            )}

            {/* la foto de la cartera y el ejercicio */}
            {fot > 0.01 && (
              <g opacity={fot}>
                <rect x={410} y={150} width={380} height={230} rx={26} fill={c.panel} style={sombra(c.sombra, 8, 20)} />
                {[[5, ROJO_M], [3, '#8b5cf6'], [1, AZUL_M]].map(([n, col], j) => (
                  <rect key={j} x={470 + j * 100} y={350 - (n as number) * 36 * ac(t, M('foto') + 0.4 + j * 0.3, M('foto') + 1.4 + j * 0.3)} width={70} height={(n as number) * 36 * ac(t, M('foto') + 0.4 + j * 0.3, M('foto') + 1.4 + j * 0.3)} rx={10} fill={col as string} />
                ))}
              </g>
            )}
            {ej > 0.01 && (
              <g opacity={ej}>
                {[0, 1, 2, 3, 4].map((j) => {
                  const dx = [260, 600, 940][dest[j]];
                  const x = lerp(300 + j * 150, dx + (j - 2) * 12, caen[j]);
                  const y = lerp(210, 430, caen[j]);
                  return <circle key={j} cx={x} cy={y} r={30} fill={`url(#${ID}-marca)`} opacity={e1(t, M('ejercicio') + j * 0.2)} style={sombra(c.sombra, 3, 8)} />;
                })}
                <Chip x={600} y={150} texto="mi cartera" c={c} id={ID} op={e1(t, M('ejercicio'))} />
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
