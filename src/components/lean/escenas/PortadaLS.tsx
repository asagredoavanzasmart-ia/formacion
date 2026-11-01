import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bucle, Calendario, Chip, Edificio, Engranaje, Etiqueta, Flecha, PanelPregunta, Rotulo, W, H, borde, e1, marcador, ventana, Bombilla, AZUL_M, ROJO_O, VERDE, VIOLETA } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * Apertura de «El método Lean Startup», escena propia. Acto A: una barra de «años» frente a una de
 * «semanas» que llega al cliente. Acto B: la línea de vida de Eric Ries, con un hito dibujado por cada
 * momento nombrado: nacimiento, Yale, Silicon Valley, el fracaso de Catalyst, IMVU, el premio de BusinessWeek,
 * el TechFellow, Harvard y el libro. Acto C: el recorrido que sigue, de estación en estación.
 */

const ID = 'ls1';
const nombres = ['semanas', 'nace', 'yale', 'valley', 'catalyst', 'e2004', 'imvu', 'e2007', 'tech', 'harvard', 'e2011', 'recorr', 'pregunta'] as const;
const NX = (k: number) => 110 + k * 122;

export const PortadaLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('recorr') + 6 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Semanas, no años'], [M('nace'), 'Eric Ries'], [M('yale'), 'Yale'], [M('valley'), 'Silicon Valley'], [M('catalyst'), 'Un primer fracaso'], [M('e2004'), 'IMVU, 2004'],
    [M('e2007'), 'Mejor joven emprendedor'], [M('tech'), 'TechFellow'], [M('harvard'), 'Harvard'], [M('e2011'), 'El libro'], [M('recorr'), 'El recorrido'],
  ];
  const aA = ventana(t, -1, M('nace'));
  const aB = ventana(t, M('nace'), M('recorr'));
  const aC = ac(t, M('recorr'), M('recorr') + 0.4);
  const hitos = [M('nace'), M('yale'), M('valley'), M('catalyst'), M('e2004'), M('e2007'), M('tech'), M('harvard'), M('e2011')];
  const anios = ['1978', '2001', '', '', '2004', '2007', '2009', '2010', '2011'];
  const prog = Math.min(1, Math.max(0, (t - hitos[0]) / (hitos[8] - hitos[0])));
  const est = [M('recorr'), M('recorr') + 1.2, M('recorr') + 2.4, M('recorr') + 3.6, M('recorr') + 4.8];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Eric Ries y el método Lean Startup: aprender en semanas, no en años">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · años frente a semanas */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <Etiqueta x={600} y={300} texto="años" op={e1(t, 0.4)} c={c} id={ID} />
                <rect x={150} y={330} width={900} height={50} rx={25} fill={c.apagado} opacity={0.5} />
                <rect x={150} y={330} width={900 * ac(t, 0.5, 2.5)} height={50} rx={25} fill={c.apagado} />
                <Etiqueta x={600} y={470} texto="semanas" op={e1(t, M('semanas'))} c={c} id={ID} marca />
                <rect x={150} y={500} width={900} height={50} rx={25} fill={c.apagado} opacity={0.2} />
                <rect x={150} y={500} width={190 * ac(t, M('semanas'), M('semanas') + 1.5)} height={50} rx={25} fill={`url(#${ID}-marcaH)`} />
                <g opacity={ac(t, M('semanas') + 1.2, M('semanas') + 2)}><Persona id={ID} x={470} y={570} s={0.5} cuerpo={VIOLETA} /><Flecha x1={350} y1={525} x2={420} y2={525} color={NARANJA} grosor={10} /></g>
              </g>
            )}

            {/* B · la línea de vida */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <rect x={80} y={514} width={1040} height={10} rx={5} fill={c.apagado} opacity={0.5} />
                <rect x={80} y={514} width={1040 * prog} height={10} rx={5} fill={`url(#${ID}-marcaH)`} />
                {hitos.map((th, k) => (
                  <g key={k} opacity={e1(t, th)} transform={`translate(${NX(k)} 440)`}>
                    <circle cy={79} r={14} fill={k === 3 ? ROJO_O : `url(#${ID}-marca)`} />
                    {k === 0 && <Persona id={ID} x={0} y={30} s={0.34} cuerpo="#334155" />}
                    {k === 1 && <Edificio x={0} y={30} w={64} h={70} color="#334155" />}
                    {k === 2 && <g><rect x={-32} y={-34} width={64} height={64} rx={12} fill="#475569" /><rect x={-16} y={-18} width={32} height={32} rx={6} fill="#94a3b8" />{[-22, 0, 22].map((p) => <g key={p}><rect x={p - 3} y={-48} width={6} height={14} fill="#94a3b8" /><rect x={p - 3} y={30} width={6} height={14} fill="#94a3b8" /></g>)}</g>}
                    {k === 3 && <g><rect x={-32} y={-26} width={64} height={56} rx={10} fill="#9ca3af" /><path d="M -36 -36 L 36 40 M 36 -36 L -36 40" stroke={ROJO_O} strokeWidth={12} strokeLinecap="round" /></g>}
                    {k === 4 && <g><rect x={-28} y={-12} width={20} height={20} rx={4} fill="#2f7bf6" /><rect x={-4} y={-30} width={20} height={20} rx={4} fill={ROSA} /><rect x={8} y={-4} width={22} height={22} rx={4} fill={NARANJA} /><Persona id={ID} x={0} y={36} s={0.22} cuerpo={VIOLETA} /></g>}
                    {k === 5 && <g><path d="M -26 -40 H 26 V -6 Q 26 22 0 26 Q -26 22 -26 -6 Z" fill="#f59e0b" /><rect x={-8} y={26} width={16} height={14} fill="#a16207" /><rect x={-24} y={38} width={48} height={10} rx={4} fill="#a16207" /></g>}
                    {k === 6 && <g><circle cy={-4} r={28} fill="#f59e0b" /><circle cy={-4} r={18} fill="#fde047" /><path d="M -14 24 L -20 48 L 0 38 L 20 48 L 14 24 Z" fill={ROSA} /></g>}
                    {k === 7 && <g><path d="M 0 -42 L 34 -30 V 4 Q 34 28 0 40 Q -34 28 -34 4 V -30 Z" fill="#a51c30" /><path d="M -12 -6 H 12 M 0 -16 V 16" stroke="#fff" strokeWidth={7} strokeLinecap="round" /></g>}
                    {k === 8 && <g><rect x={-26} y={-40} width={52} height={76} rx={8} fill={`url(#${ID}-marca)`} /><rect x={-26} y={-40} width={12} height={76} rx={6} fill="#000" opacity={0.2} /><path d="M -2 -20 H 18 M -2 -8 H 18" stroke="#fff" strokeWidth={5} strokeLinecap="round" /></g>}
                    {anios[k] && <Txt f="a" x={0} y={132} textAnchor="middle" fontSize={26} fill={c.texto}>{anios[k]}</Txt>}
                  </g>
                ))}
              </g>
            )}

            {/* C · el recorrido que sigue */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <rect x={110} y={472} width={980} height={14} rx={7} fill={c.apagado} opacity={0.5} />
                <rect x={110} y={472} width={980 * ac(t, est[0], est[4] + 1)} height={14} rx={7} fill={`url(#${ID}-marcaH)`} />
                <g opacity={e1(t, est[0])} transform="translate(180 390)"><Bucle cx={0} cy={0} r={34} u={(t * 0.5) % 1} id={ID} /></g>
                <g opacity={e1(t, est[1])} transform="translate(390 390)"><rect x={-34} y={-34} width={68} height={68} rx={12} fill={`url(#${ID}-marca)`} /><rect x={-14} y={-14} width={28} height={28} rx={6} fill="#fff" opacity={0.85} /></g>
                <g opacity={e1(t, est[2])} transform="translate(600 390)"><path d="M -40 30 L -40 -10 L 0 -40 L 40 -10 L 40 30" fill="none" stroke={NARANJA} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" /><path d="M 20 -30 L 46 -6 L 14 -2 Z" fill={NARANJA} /></g>
                <g opacity={e1(t, est[3])} transform="translate(810 390)"><Engranaje x={0} y={0} r={36} t={t} hueco={isDark ? '#242424' : '#fff'} /></g>
                <g opacity={e1(t, est[4])} transform={`translate(1010 390) rotate(${6 * Math.sin(t * 2)})`}><circle cx={-4} cy={-4} r={32} fill="#bae6fd" opacity={0.6} /><circle cx={-4} cy={-4} r={32} fill="none" stroke={ROSA} strokeWidth={10} /><rect x={16} y={20} width={14} height={44} rx={7} fill={ROSA} transform="rotate(-40 23 42)" /></g>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
