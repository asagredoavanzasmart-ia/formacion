import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana } from './comunOA';
import { AZUL_C, AZUL_M, Barco, Edificio, Flecha, Mar, ROJO_M, ROJO_O } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * «Límites y críticas», escena propia. El modelo es un barco azul bajo una lupa; cada crítica abre una grieta
 * en su casco y se explica con un dibujo en una de las cuatro esquinas: éxitos que buscan un concepto a
 * posteriori, una regla sin marcas, una definición borrosa, el escalón pequeño frente al salto, quince años
 * de calendario, un producto que se come a su gemelo, el edificio viejo que cae y el nuevo que sube, y el
 * lazo del océano rojo frente al salto al azul.
 */

const ID = 'oa11';
const nombres = ['frentes', 'posteriori', 'sectores', 'ford', 'extremos', 'actores', 'cuantif', 'difusa', 'increm', 'quince', 'canib', 'marlboro', 'schum', 'chris', 'pregunta'] as const;
const GRIETAS: [number, string][] = [
  [0, 'M 520 532 l 10 14 l -12 10 l 12 14'], [1, 'M 560 530 l -8 12 l 12 8 l -10 16'], [2, 'M 600 530 l 8 14 l -10 8 l 10 16'], [3, 'M 640 532 l -10 12 l 12 10 l -12 14'],
  [4, 'M 680 530 l 8 12 l -10 10 l 10 14'], [5, 'M 700 536 l -8 10 l 10 10'],
];

export const LimitesOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('chris') + 3 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'El modelo bajo la lupa'], [M('posteriori'), 'Lectura a posteriori'], [M('extremos'), 'Extremos sin definir'], [M('difusa'), 'Innovación en valor difusa'], [M('increm'), 'Mejoras incrementales'],
    [M('quince'), 'Quince años'], [M('canib'), 'Canibalización'], [M('schum'), 'Destrucción creadora'], [M('chris'), 'Apoyo y ruptura'],
  ];
  const marcasG = [M('posteriori'), M('extremos'), M('difusa'), M('increm'), M('quince'), M('canib')];
  const z = (a: number, b: number) => ventana(t, a, b, 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Las críticas al modelo del océano azul">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* el barco azul del modelo, con sus grietas, y la lupa */}
            <g opacity={e1(t, 0.4)} transform="translate(600 600) scale(1.35) translate(-600 -560)">
              <Mar x={430} y={560} w={340} h={140} t={t} color={AZUL_M} oscuro="#1d4fbf" />
              <Barco x={600} y={560} s={1.5} casco="#1d4fbf" vela="#ffffff" rot={Math.sin(t * 1.4) * 2} />
              {GRIETAS.map(([k, d]) => <path key={k} d={d} stroke="#0f172a" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={e1(t, marcasG[k])} />)}
            </g>
            <g opacity={e1(t, M('frentes'))} transform={`translate(${600 + 110 * Math.sin(t * 0.7)} ${590 + 6 * Math.sin(t * 1.3)}) scale(0.8)`}>
              <circle r={78} fill={AZUL_C} opacity={0.25} /><circle r={78} fill="none" stroke={NARANJA} strokeWidth={14} /><rect x={54} y={58} width={22} height={86} rx={11} fill={NARANJA} transform="rotate(-40 65 100)" />
            </g>

            {/* arriba a la izquierda: éxitos que buscan un concepto, y los quince años */}
            <g opacity={z(M('posteriori'), M('extremos'))} transform="translate(270 280) scale(1.3) translate(-270 -280)">
              {[0, 1, 2].map((k) => <g key={k} opacity={e1(t, M('posteriori') + k * 0.3)}><path d={`M ${130 + k * 80} 270 l 12 -34 l 14 34 l -34 -20 l 40 0 Z`} fill="#f59e0b" /></g>)}
              <Flecha x1={380} y1={252} x2={310} y2={252} u={ac(t, M('sectores'), M('sectores') + 1)} color={NARANJA} grosor={9} />
              <g opacity={e1(t, M('sectores'))} transform="translate(420 240)"><circle r={36} fill="#fde047" opacity={0.4} /><path d="M -20 8 Q -30 -14 -16 -26 Q 0 -42 16 -26 Q 30 -14 20 8 Q 12 18 10 26 H -10 Q -12 18 -20 8 Z" fill={`url(#${ID}-marca)`} /></g>
              <g opacity={e1(t, M('ford'))}><Persona id={ID} x={170} y={330} s={0.36} cuerpo="#334155" corbata /><Persona id={ID} x={260} y={330} s={0.36} cuerpo="#7c3aed" /></g>
            </g>
            <g opacity={z(M('quince'), M('canib'))} transform="translate(250 260) scale(1.3)">
              <rect x={-90} y={-80} width={180} height={160} rx={20} fill={c.panel} style={sombra(c.sombra, 6, 14)} /><rect x={-90} y={-80} width={180} height={44} rx={20} fill={ROJO_M} />
              <Txt x={0} y={52} textAnchor="middle" fontSize={96} fill={c.texto}>15</Txt>
            </g>

            {/* arriba a la derecha: la regla sin marcas y la canibalización */}
            <g opacity={z(M('extremos'), M('difusa'))} transform="translate(940 270) scale(1.2)">
              <rect x={-170} y={-24} width={340} height={48} rx={10} fill="#e5e7eb" />
              {Array.from({ length: 15 }, (_, k) => <rect key={k} x={-160 + k * 22.8} y={-24} width={4} height={k % 5 === 0 ? 24 : 14} fill={k < 5 ? '#64748b' : c.apagado} opacity={k < 5 ? 1 : 0.2} />)}
              <Txt x={0} y={-52} textAnchor="middle" fontSize={44} fill={ROSA} opacity={e1(t, M('actores'))}>?</Txt>
              <circle cx={60} cy={96} r={46} fill={AZUL_M} opacity={0.12 + 0.18 * e1(t, M('cuantif'))} /><circle cx={60} cy={96} r={30} fill={AZUL_M} opacity={0.2 * e1(t, M('cuantif'))} />
            </g>
            <g opacity={z(M('canib'), M('schum'))} transform="translate(950 280) scale(1.2)">
              <circle cx={-60} cy={0} r={52} fill={`url(#${ID}-marca)`} />
              <path d={`M 60 0 L ${60 + 40 * Math.cos(0.6 + 0.4 * Math.sin(t * 5))} ${-40 * Math.sin(0.6 + 0.4 * Math.sin(t * 5))} A 52 52 0 1 0 ${60 + 40 * Math.cos(0.6 + 0.4 * Math.sin(t * 5))} ${40 * Math.sin(0.6 + 0.4 * Math.sin(t * 5))} Z`} fill="#f59e0b" transform="translate(-30 0)" />
              <circle cx={-45} cy={-18} r={6} fill="#fff" />
              <Flecha x1={-10} y1={96} x2={70} y2={96} color={ROJO_O} grosor={9} op={e1(t, M('marlboro'))} />
              <g opacity={e1(t, M('marlboro'))} transform="translate(120 96)"><path d="M 0 -26 L 8 -8 L 28 -6 L 12 6 L 18 26 L 0 14 L -18 26 L -12 6 L -28 -6 L -8 -8 Z" fill="#fde047" /></g>
            </g>

            {/* abajo a la izquierda: una definición borrosa; abajo a la derecha: el escalón y el salto */}
            <g opacity={z(M('difusa'), M('schum'))} transform="translate(250 750) scale(1.2)">
              {[0, 1, 2, 3, 4].map((k) => { const a = (k / 5) * Math.PI * 2 + t * 0.6; return <circle key={k} cx={Math.cos(a) * 70} cy={Math.sin(a) * 30} r={20} fill={['#ef4444', '#f59e0b', '#10b981', '#2563eb', '#7c3aed'][k]} opacity={0.85 * e1(t, M('difusa') + k * 0.4)} />; })}
              <circle r={30} fill={c.panel} opacity={0.9} /><Txt x={0} y={14} textAnchor="middle" fontSize={44} fill={ROSA}>?</Txt>
            </g>
            <g opacity={z(M('increm'), M('chris'))} transform="translate(950 750) scale(1.2)">
              {[0, 1, 2, 3].map((k) => <rect key={k} x={-150 + k * 36} y={-10 - k * 14} width={36} height={14 + k * 14 + 10} rx={4} fill={k === 3 ? NARANJA : c.apagado} opacity={e1(t, M('increm') + k * 0.3)} />)}
              <path d="M 10 -50 Q 80 -150 150 -50" fill="none" stroke={ROSA} strokeWidth={8} strokeDasharray="4 14" strokeLinecap="round" opacity={e1(t, M('increm') + 1.5)} />
            </g>
            <g opacity={z(M('schum'), M('chris'))} transform="translate(250 750) scale(1.2)">
              <g opacity={1 - ac(t, M('schum') + 1, M('schum') + 2.6)}><Edificio x={-60} y={30} w={70} h={90} color="#64748b" /></g>
              {[0, 1, 2, 3].map((k) => <rect key={k} x={-96 + k * 16} y={-10 + 70 * ac(t, M('schum') + 1, M('schum') + 2.6)} width={14} height={14} rx={3} fill="#64748b" opacity={ac(t, M('schum') + 1, M('schum') + 1.2) * (1 - ac(t, M('schum') + 2.4, M('schum') + 2.8))} transform={`rotate(${40 * k * ac(t, M('schum') + 1, M('schum') + 2.6)} ${-90 + k * 16} 0)`} />)}
              <g opacity={ac(t, M('schum') + 1.8, M('schum') + 3)}><Edificio x={80} y={30} w={80} h={110} color={AZUL_M} /></g>
            </g>
            <g opacity={z(M('chris'), M('pregunta') + 5)} transform="translate(250 750) scale(1.3)">
              <path d="M -90 10 a 40 40 0 1 1 20 34" fill="none" stroke={ROJO_M} strokeWidth={10} strokeLinecap="round" /><path d="M -62 52 l 14 -6 l -8 -14 Z" fill={ROJO_M} />
              <Flecha x1={20} y1={30} x2={130} y2={-10} color={AZUL_M} grosor={11} u={e1(t, M('chris') + 1.5)} />
            </g>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
