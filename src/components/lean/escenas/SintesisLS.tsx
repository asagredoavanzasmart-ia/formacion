import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, Bucle, Edificio, Engranaje, Flecha, Moneda, PanelPregunta, Rotulo, Telefono, W, H, borde, e1, lerp, marcador, ventana, AZUL_M, ROJO_M, ROJO_O, VERDE, VIOLETA } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «Aprender más rápido de lo que se gasta» (síntesis), escena propia. Un camino con cinco estaciones: la
 * fábrica de Toyota, la innovación, el terreno con sus clientes, los ajustes progresivos, las herramientas
 * (lotes pequeños y porqués) y los motores de crecimiento. Luego el ciclo de feedback rinde más, el tiempo
 * y el dinero se ahorran, el movimiento crece y una balanza muestra que el aprendizaje pesa más que el gasto.
 */

const ID = 'ls13';
const nombres = ['otra', 'toyota', 'proceso', 'terreno', 'ajustes', 'lotes', 'motores', 'rend', 'ahorrando', 'crecer', 'aprender', 'pregunta'] as const;
const EX = (k: number) => 130 + k * 188;

export const SintesisLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('aprender') + 5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Otra forma de avanzar'], [M('toyota'), 'Nació en Toyota'], [M('proceso'), 'Hacia la innovación'], [M('terreno'), 'Acudir al terreno'], [M('ajustes'), 'Ajustes progresivos'], [M('lotes'), 'Lotes y porqués'],
    [M('motores'), 'Motores de crecimiento'], [M('rend'), 'Un ciclo que rinde más'], [M('ahorrando'), 'Tiempo y dinero'], [M('crecer'), 'Un movimiento que crece'], [M('aprender'), 'Aprender más que gastar'],
  ];
  const est = [M('toyota'), M('proceso'), M('terreno'), M('ajustes'), M('lotes'), M('motores')];
  const aA = 1 - ac(t, M('rend') - 0.3, M('rend'));
  const aB = ventana(t, M('rend'), M('aprender'));
  const aC = ac(t, M('aprender'), M('aprender') + 0.5);
  const prog = ac(t, est[0] - 0.5, est[5] + 0.5);
  const ahorro = ac(t, M('ahorrando'), M('ahorrando') + 2);
  const bal = ac(t, M('aprender'), M('aprender') + 2);
  const inc = Math.sin(t * 1.2) * 1.5;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Síntesis del método Lean Startup: aprender más rápido de lo que se gasta">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · el camino de seis estaciones */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <rect x={90} y={510} width={1020} height={14} rx={7} fill={c.apagado} opacity={0.45} />
                <rect x={90} y={510} width={1020 * prog} height={14} rx={7} fill={`url(#${ID}-marcaH)`} />
                {est.map((te, k) => (
                  <g key={k} opacity={e1(t, te)} transform={`translate(${EX(k)} 420)`}>
                    <circle cy={97} r={16} fill={`url(#${ID}-marca)`} />
                    {k === 0 && <g><rect x={-50} y={-6} width={100} height={42} rx={8} fill="#475569" /><rect x={-34} y={-44} width={20} height={40} fill="#64748b" /><rect x={-4} y={-30} width={20} height={26} fill="#64748b" /><circle cx={-24} cy={44} r={10} fill="#1f2937" /><circle cx={24} cy={44} r={10} fill="#1f2937" /></g>}
                    {k === 1 && <Bombilla x={0} y={0} s={0.8} id={ID} />}
                    {k === 2 && <g><Persona id={ID} x={-22} y={36} s={0.3} cuerpo={VIOLETA} /><Persona id={ID} x={26} y={40} s={0.3} cuerpo="#0f766e" /><path d="M -50 -40 A 24 24 0 1 1 -10 -50" fill="none" stroke={NARANJA} strokeWidth={0} /></g>}
                    {k === 3 && <g><Telefono x={0} y={-4} s={0.34} widgets={2} /><path d="M 40 -30 l 14 -14 M 40 -10 l 20 -4 M 40 10 l 14 14" stroke={NARANJA} strokeWidth={6} strokeLinecap="round" /></g>}
                    {k === 4 && <g>{[0, 1, 2].map((q) => <rect key={q} x={-48 + q * 34} y={-8 - q * 12 + 14} width={28} height={28} rx={5} fill={[AZUL_M, VERDE, NARANJA][q]} />)}<Txt x={0} y={-30} textAnchor="middle" fontSize={44} fill={ROSA}>?</Txt></g>}
                    {k === 5 && <Engranaje x={0} y={0} r={38} t={t} hueco={isDark ? '#242424' : '#fff'} color={VIOLETA} />}
                  </g>
                ))}
              </g>
            )}

            {/* B · el ciclo rinde más y se ahorra */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Bucle cx={360} cy={470} r={150} u={(t * 0.45) % 1} id={ID} rotulos />
                <g opacity={e1(t, M('ahorrando'))}>
                  <g transform="translate(790 340)"><circle r={74} fill="#fff" /><circle r={74} fill="none" stroke={NARANJA} strokeWidth={12} /><path d="M 0 -46 V 0 L 28 18" stroke="#334155" strokeWidth={9} strokeLinecap="round" fill="none" /></g>
                  {[0, 1, 2, 3].map((q) => <Moneda key={q} x={730 + q * 46} y={560 - 10 * q * (1 - ahorro) - 30 * (1 - ahorro) * (q % 2)} r={24} op={1 - 0.0} />)}
                  <path d="M 700 480 H 960" stroke={c.apagado} strokeWidth={0} />
                </g>
                {t >= M('crecer') && (
                  <g opacity={e1(t, M('crecer'))} transform="translate(980 700)">
                    {[0, 1, 2, 3, 4].map((q) => <rect key={q} x={-130 + q * 54} y={-30 - q * 30 * ac(t, M('crecer') + q * 0.3, M('crecer') + 1 + q * 0.3)} width={42} height={30 + q * 30 * ac(t, M('crecer') + q * 0.3, M('crecer') + 1 + q * 0.3)} rx={8} fill={`url(#${ID}-marca)`} />)}
                  </g>
                )}
              </g>
            )}

            {/* C · aprender pesa más que gastar */}
            {aC > 0.01 && (() => {
              const ang = lerp(0, -9, bal) + inc;
              const r = (ang * Math.PI) / 180;
              const L: [number, number] = [600 - 330 * Math.cos(r), 560 - 330 * Math.sin(r)];
              const R: [number, number] = [600 + 330 * Math.cos(r), 560 + 330 * Math.sin(r)];
              return (
                <g opacity={aC}>
                  <path d="M 600 560 L 560 790 H 640 Z" fill={c.apagado} />
                  <g transform={`translate(600 560) rotate(${ang})`}><rect x={-330} y={-9} width={660} height={18} rx={9} fill={isDark ? '#7a7a7a' : '#6b7280'} /></g>
                  <circle cx={600} cy={560} r={20} fill={`url(#${ID}-marca)`} />
                  {[L, R].map(([px, py], q) => (
                    <g key={q}>
                      <path d={`M ${px} ${py} L ${px - 100} ${py + 170} M ${px} ${py} L ${px + 100} ${py + 170}`} stroke={c.apagado} strokeWidth={5} />
                      <rect x={px - 120} y={py + 170} width={240} height={18} rx={9} fill={isDark ? '#7a7a7a' : '#6b7280'} />
                      {q === 0 ? <Bombilla x={px} y={py + 100} s={1.1} id={ID} /> : <Moneda x={px} y={py + 146} r={22} />}
                    </g>
                  ))}
                </g>
              );
            })()}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
