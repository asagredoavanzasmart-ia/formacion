import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana } from './comunOA';
import { AZUL_M, Curva, Flecha, ROJO_M, ROJO_O } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * «Cuatro etapas visuales», escena propia. Una escalera de cuatro peldaños que un personaje sube. Despertar
 * visual: un ojo y una curva de fortalezas y debilidades que reúne al equipo. Exploración visual: la lupa
 * sale al terreno y encuentra a los no clientes. Trabajo de campo: gente de dentro y de fuera frente al muro
 * de la resistencia al cambio. Comunicación visual: un pizarrón y un equipo en distintos niveles. Al final,
 * cómo empezar: la curva actual, cinco personas que hoy no compran y la curva nueva.
 */

const ID = 'oa7';
const nombres = ['recorrido', 'despertar', 'fortalezas', 'consenso', 'explor', 'sinConocer', 'noClientes', 'campo', 'fuera', 'resistencia', 'comunic', 'jerarquico', 'concreta', 'cinco', 'pregunta'] as const;
const CX = (i: number) => 235 + i * 250;
const TOP = (i: number) => 600 - i * 110;

export const EtapasOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('cinco') + 6 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Cuatro etapas'], [M('despertar'), 'Despertar visual'], [M('explor'), 'Exploración visual'], [M('campo'), 'Trabajo de campo'], [M('comunic'), 'Comunicación visual'],
    [M('concreta'), 'Cómo empezar'], [M('cinco'), 'Cinco no clientes'],
  ];

  const esc = 1 - ac(t, M("concreta") - 0.3, M("concreta") + 0.3);
  const aB = ac(t, M('concreta'), M('concreta') + 0.5);
  const paso = (i: number) => [M('despertar'), M('explor'), M('campo'), M('comunic')][i];
  // el personaje sube: x, y interpolados entre peldaños
  const k = t < paso(1) ? 0 : t < paso(2) ? 1 : t < paso(3) ? 2 : 3;
  const u = k === 0 ? 0 : ac(t, paso(k) - 0.3, paso(k) + 0.9);
  const px = lerp(CX(Math.max(0, k - 1)), CX(k), k === 0 ? 1 : u), py = lerp(TOP(Math.max(0, k - 1)), TOP(k), k === 0 ? 1 : u) - 30 * Math.sin(Math.PI * (k === 0 ? 0 : u));

  const lineas = (v: number[], x0: number, x1: number, y0: number, y1: number): [number, number][] => v.map((l, j) => [x0 + ((x1 - x0) * j) / (v.length - 1), y1 - l * (y1 - y0)]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Las cuatro etapas del método, una escalera visual">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* la escalera */}
            <g opacity={esc}>
              {[0, 1, 2, 3].map((i) => (
                <g key={i} opacity={e1(t, M('recorrido') + i * 0.5)}>
                  <rect x={CX(i) - 125} y={TOP(i)} width={250} height={800 - TOP(i)} rx={14} fill={i % 2 ? c.panel2 : c.panel} style={sombra(c.sombra, 4, 10)} />
                  <rect x={CX(i) - 125} y={TOP(i)} width={250} height={14} rx={7} fill={`url(#${ID}-marcaH)`} opacity={t >= paso(i) ? 1 : 0.35} />
                </g>
              ))}

              {/* 1 · el ojo y la curva que reúne al equipo */}
              <g opacity={e1(t, M('despertar'))} transform={`translate(${CX(0)} ${TOP(0) + 62})`}>
                <ellipse rx={64} ry={38} fill="#fff" /><circle r={26} fill={`url(#${ID}-marca)`} /><circle r={10} fill="#1f2937" /><circle cx={9} cy={-9} r={5} fill="#fff" />
                <path d="M -70 0 Q 0 -60 70 0 Q 0 60 -70 0" fill="none" stroke="#475569" strokeWidth={6} />
              </g>
              {t >= M('fortalezas') && (
                <g opacity={e1(t, M('fortalezas'))}>
                  <Curva pts={lineas([0.2, 0.8, 0.4, 0.9], CX(0) - 90, CX(0) + 90, TOP(0) + 120, TOP(0) + 168)} u={ac(t, M('fortalezas'), M('fortalezas') + 1.8)} color={ROJO_M} grosor={6} />
                </g>
              )}
              {t >= M('consenso') && [0, 1, 2].map((j) => <g key={j} opacity={e1(t, M('consenso') + j * 0.3)}><Persona id={ID} x={CX(0) - 70 + j * 70} y={TOP(0) + 180 - 4 * Math.abs(Math.sin(t * 3 + j))} s={0.3} cuerpo={['#334155', '#7c3aed', '#0f766e'][j]} /></g>)}

              {/* 2 · la lupa sale al terreno y encuentra a los no clientes */}
              <g opacity={e1(t, M('explor'))} transform={`translate(${CX(1) - 30} ${TOP(1) + 78})`}>
                <circle r={40} fill="#bae6fd" opacity={0.6} /><circle r={40} fill="none" stroke={NARANJA} strokeWidth={10} /><rect x={32} y={30} width={14} height={50} rx={7} fill={NARANJA} transform="rotate(-40 39 55)" />
              </g>
              {t >= M('sinConocer') && <g opacity={e1(t, M('sinConocer'))}><Persona id={ID} x={CX(1) + 62} y={TOP(1) + 150} s={0.36} cuerpo="#0f766e" /><Txt x={CX(1) + 62} y={TOP(1) + 76} textAnchor="middle" fontSize={44} fill={ROSA}>?</Txt></g>}
              {t >= M('noClientes') && <g opacity={e1(t, M('noClientes'))}><Persona id={ID} x={CX(1) - 62} y={TOP(1) + 200} s={0.36} cuerpo="#94a3b8" /><Persona id={ID} x={CX(1) + 8} y={TOP(1) + 220} s={0.36} cuerpo="#cbd5e1" /></g>}

              {/* 3 · gente de dentro y de fuera frente al muro de la resistencia */}
              {t >= M('campo') && [0, 1, 2].map((j) => <g key={j} opacity={e1(t, M('campo') + j * 0.3)}><Persona id={ID} x={CX(2) - 80 + j * 40} y={TOP(2) + 120} s={0.32} cuerpo={['#334155', '#0f766e', '#7c3aed'][j]} /></g>)}
              {t >= M('fuera') && [0, 1].map((j) => <g key={j} opacity={e1(t, M('fuera') + j * 0.3)}><Persona id={ID} x={CX(2) + 40 + j * 50} y={TOP(2) + 120} s={0.32} cuerpo={['#ec4899', '#f59e0b'][j]} /></g>)}
              {t >= M('resistencia') && (
                <g opacity={e1(t, M('resistencia'))} transform={`translate(${CX(2)} ${TOP(2) + 180})`}>
                  {[0, 1, 2, 3, 4].map((j) => <rect key={j} x={-100 + j * 40 + (j % 2) * 8} y={-(j % 2) * 30} width={38} height={28} rx={4} fill={ROJO_M} />)}
                  {[0, 1, 2, 3, 4].map((j) => <rect key={`b${j}`} x={-92 + j * 40 - (j % 2) * 8} y={-30 + (j % 2) * 30} width={38} height={28} rx={4} fill={ROJO_O} />)}
                </g>
              )}

              {/* 4 · el pizarrón y los niveles */}
              <g opacity={e1(t, M('comunic'))} transform={`translate(${CX(3)} ${TOP(3) + 100})`}>
                <rect x={-96} y={-52} width={192} height={110} rx={12} fill="#14532d" /><rect x={-96} y={-52} width={192} height={110} rx={12} fill="none" stroke="#a16207" strokeWidth={8} />
                <Curva pts={lineas([0.3, 0.8, 0.4, 0.95], -70, 70, -34, 40)} u={ac(t, M('comunic'), M('comunic') + 2)} color="#fff" grosor={5} />
              </g>
              {t >= M('jerarquico') && [0, 1, 2].map((j) => <g key={j} opacity={e1(t, M('jerarquico') + j * 0.4)}><Persona id={ID} x={CX(3) - 70 + j * 70} y={TOP(3) + 250 + (j - 1) * (j % 2 ? 0 : 14)} s={0.34 + 0.04 * (1 - j % 2)} cuerpo={['#334155', '#0f766e', '#7c3aed'][j]} /></g>)}

              {/* quien sube */}
              <Persona id={ID} x={px} y={py} s={0.62} cuerpo="#334155" corbata />
            </g>

            {/* cómo empezar */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <rect x={170} y={150} width={860} height={400} rx={30} fill={c.panel} style={sombra(c.sombra, 10, 24)} />
                <Curva pts={lineas([0.4, 0.55, 0.5, 0.6, 0.5], 250, 950, 210, 500)} u={ac(t, M('concreta') + 0.5, M('concreta') + 2.5)} color={ROJO_M} grosor={11} />
                <Curva pts={lineas([0.1, 0.3, 0.85, 0.9, 0.7], 250, 950, 210, 500)} u={ac(t, M('cinco') + 5, M('cinco') + 8)} color={AZUL_M} grosor={11} />
                {t >= M('cinco') && [0, 1, 2, 3, 4].map((j) => (
                  <g key={j} opacity={e1(t, M('cinco') + j * 0.4)}>
                    <Persona id={ID} x={250 + j * 175} y={780} s={0.5} cuerpo="#94a3b8" />
                    <Txt x={250 + j * 175} y={684} textAnchor="middle" fontSize={44} fill={ROSA}>?</Txt>
                  </g>
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
