import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Chip, Etiqueta, Gesto, PanelPregunta, Rotulo, W, H, borde, e1, marcador, ventana } from './comunOA';
import { AZUL_C, AZUL_M, AZUL_O, Barco, Mar, ROJO_M, ROJO_O } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * Apertura de «Estrategia del océano azul», escena propia. Acto A: un mar rojo atestado de barcos que se
 * empujan y, al lado, un mar azul vacío; un barco se separa de la flota y cruza. Acto B: los dos autores con
 * su año y el instituto. Acto C: el libro de 2005 con sus 43 lenguas y sus millones de ejemplares. Acto D:
 * el recorrido que sigue, de océano en océano, hasta la lupa de las críticas.
 */

const ID = 'oa1';
const nombres = ['sinPelea', 'kim', 'mauborgne', 'instituto', 'libro', 'lenguas', 'millones', 'rojo', 'criticas', 'pregunta'] as const;

export const PortadaOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('criticas') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Un mercado sin pelea'], [M('kim'), 'Los autores'], [M('libro'), 'La obra de 2005'], [M('rojo'), 'El recorrido'], [M('criticas'), 'Y sus críticas'],
  ];
  const aA = ventana(t, -1, M('kim'));
  const aB = ventana(t, M('kim'), M('libro'));
  const aC = ventana(t, M('libro'), M('rojo'));
  const aD = ac(t, M('rojo'), M('rojo') + 0.4);

  // Acto A: un barco sale de la flota roja y cruza al mar azul
  const cruza = ac(t, M('sinPelea'), M('sinPelea') + 4);
  const fl = [[130, 640], [250, 700], [370, 630], [200, 560], [440, 710], [330, 570], [510, 650]] as const;

  const est = [M('rojo'), M('rojo') + 1.2, M('rojo') + 2.4, M('rojo') + 3.6, M('criticas')];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Salir de la competencia: del océano rojo al azul">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · dos mares y un barco que cruza */}
            {aA > 0.01 && (
              <g opacity={aA} transform="translate(0 -120)">
                <Mar x={60} y={480} w={540} h={340} t={t} color={ROJO_M} oscuro={ROJO_O} />
                <Mar x={600} y={480} w={540} h={340} t={t} color={AZUL_M} oscuro={AZUL_O} />
                {fl.map(([x, y], k) => {
                  const sale = k === 0 ? cruza : 0;
                  const choque = Math.sin(t * 5 + k * 1.7) * (1 - sale);
                  return <Barco key={k} x={x + sale * 640} y={y - sale * 40 + 4 * Math.sin(t * 2 + k)} s={0.78} casco="#7c2d12" vela={k === 0 ? '#ffffff' : '#fecaca'} rot={choque * 5 - sale * 4} />;
                })}
                <Etiqueta x={330} y={850} texto="mar saturado" op={e1(t, 0.4)} c={c} id={ID} />
                <Etiqueta x={870} y={850} texto="mar abierto" op={e1(t, M('sinPelea') + 3)} c={c} id={ID} />
              </g>
            )}

            {/* B · los autores */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {([[380, 'Kim', 1952, M('kim'), '#334155'], [820, 'Mauborgne', 1963, M('mauborgne'), '#7c3aed']] as const).map(([x, nom, anio, t0, col], k) => (
                  <g key={nom}>
                    <g opacity={e1(t, t0)}>
                      <Persona id={ID} x={x} y={740} s={1.05} cuerpo={col} corbata={k === 0} />
                      <Gesto x={x} y={740} s={1.05} animo={0.5} />
                    </g>
                    <Chip x={x} y={330 + k * 100} texto={`${nom} · ${anio}`} c={c} id={ID} op={e1(t, t0)} />
                  </g>
                ))}
                <Chip x={600} y={650} texto="INSEAD" c={c} id={ID} op={e1(t, M('instituto'))} marca />
              </g>
            )}

            {/* C · el libro */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <g transform={`translate(600 ${470 + 5 * Math.sin(t * 2)})`} opacity={e1(t, M('libro'))} style={sombra(c.sombra, 14, 28)}>
                  <rect x={-170} y={-210} width={340} height={420} rx={24} fill={`url(#${ID}-marca)`} />
                  <rect x={-170} y={-210} width={34} height={420} rx={14} fill="#000" opacity={0.18} />
                  <Txt f="a" x={14} y={-60} textAnchor="middle" fontSize={44} fill="#fff">Blue Ocean</Txt>
                  <Txt f="a" x={14} y={0} textAnchor="middle" fontSize={44} fill="#fff">Strategy</Txt>
                  <path d="M -90 120 Q -45 90 0 120 T 90 120" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.8} />
                </g>
                <Chip x={600} y={226} texto="2005" c={c} id={ID} op={e1(t, M('libro'))} marca />
                <Chip x={330} y={740} texto="43 lenguas" c={c} id={ID} op={e1(t, M('lenguas'))} />
                <Chip x={870} y={740} texto="3,5 millones" c={c} id={ID} op={e1(t, M('millones'))} marca />
              </g>
            )}

            {/* D · el recorrido */}
            {aD > 0.01 && (
              <g opacity={aD}>
                <rect x={110} y={512} width={980} height={14} rx={7} fill={c.apagado} />
                <rect x={110} y={512} width={980 * ac(t, est[0], est[4] + 1)} height={14} rx={7} fill={`url(#${ID}-marcaH)`} />
                {/* 1 · dos océanos */}
                <g opacity={e1(t, est[0])} transform="translate(180 440)">
                  <rect x={-56} y={-40} width={56} height={80} rx={16} fill={ROJO_M} /><rect x={0} y={-40} width={56} height={80} rx={16} fill={AZUL_M} />
                </g>
                {/* 2 · el paso de uno a otro */}
                <g opacity={e1(t, est[1])} transform="translate(420 440)">
                  <path d="M -60 20 Q 0 -60 60 20" fill="none" stroke={NARANJA} strokeWidth={14} strokeLinecap="round" /><path d="M 36 -6 L 62 22 L 26 30 Z" fill={NARANJA} />
                </g>
                {/* 3 · herramientas */}
                <g opacity={e1(t, est[2])} transform="translate(660 440) rotate(-35)">
                  <rect x={-10} y={-50} width={20} height={100} rx={10} fill="#64748b" /><circle cx={0} cy={-50} r={26} fill="#64748b" /><rect x={-9} y={-82} width={18} height={30} fill={isDark ? '#242424' : '#fff'} />
                </g>
                {/* 4 · dos casos */}
                <g opacity={e1(t, est[3])} transform="translate(900 440)">
                  <Barco x={-34} y={20} s={0.5} casco="#7c2d12" /><Barco x={38} y={20} s={0.5} casco="#1d4fbf" vela="#bfdbfe" />
                </g>
                {/* 5 · críticas */}
                <g opacity={e1(t, est[4])} transform={`translate(1070 440) rotate(${6 * Math.sin(t * 2)})`}>
                  <circle cx={-6} cy={-6} r={34} fill={AZUL_C} opacity={0.55} /><circle cx={-6} cy={-6} r={34} fill="none" stroke={ROSA} strokeWidth={10} /><rect x={16} y={20} width={14} height={46} rx={7} transform="rotate(-40 23 43)" fill={ROSA} />
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
