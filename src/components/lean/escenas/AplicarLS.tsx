import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Edificio, Engranaje, Flecha, Moneda, PanelPregunta, Rotulo, Telefono, W, H, borde, e1, lerp, marcador, ventana, AZUL_M, ROJO_M, ROJO_O, VERDE, VIOLETA, Mar, Barco } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «Cómo aplicarlo en tu empresa», escena propia. Acto A: cuatro piedras en el agua, una por pregunta
 * (hipótesis, producto mínimo, medida, decisión), y un barco que salta de una a otra. Acto B: la empresa de
 * capacitación en ventas: cree que quieren cursos largos (un libro enorme), ofrece una sesión de una hora a
 * tres empresas y cuenta cuántas piden una segunda; descubre las sesiones cortas y se ahorra grabar el
 * video. Cierra con la regla: no gastar más de lo necesario y un solo motor a la vez.
 */

const ID = 'ls11';
const nombres = ['secuencia', 'hipo', 'minimo', 'medida', 'decision', 'capac', 'cursos', 'sesion', 'segunda', 'cortas', 'video', 'gastar', 'motor', 'pregunta'] as const;
const PIEDRAS: [number, number][] = [[200, 610], [470, 470], [740, 610], [1000, 470]];

export const AplicarLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('motor') + 4 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Preguntas para tu equipo'], [M('hipo'), 'La hipótesis'], [M('minimo'), 'El producto mínimo'], [M('medida'), 'La medida'], [M('decision'), 'La decisión'], [M('capac'), 'Una empresa de capacitación'],
    [M('cursos'), 'Cree en cursos largos'], [M('sesion'), 'Una sesión de una hora'], [M('segunda'), 'Cuántos piden otra'], [M('cortas'), 'Sesiones cortas'], [M('video'), 'Sin grabar videos'], [M('gastar'), 'No gastar de más'],
    [M('motor'), 'Un motor a la vez'],
  ];
  const llegada = [M('hipo'), M('minimo'), M('medida'), M('decision')];
  const k = llegada.filter((tt) => t >= tt).length - 1;
  const ant = Math.max(0, k - 1);
  const u = k <= 0 ? 1 : ac(t, llegada[k] - 0.2, llegada[k] + 0.9);
  const bx = k < 0 ? 100 : lerp(PIEDRAS[ant][0], PIEDRAS[k][0], u);
  const by = (k < 0 ? 590 : lerp(PIEDRAS[ant][1], PIEDRAS[k][1], u)) - 60 - 50 * Math.sin(Math.PI * (k <= 0 ? 0 : u));
  const aA = ventana(t, -1, M('capac'));
  const aB = ac(t, M('capac'), M('capac') + 0.5) * (1 - ac(t, M('gastar') - 0.3, M('gastar')));
  const aC = ac(t, M('gastar'), M('gastar') + 0.5);
  const pidieron = Math.min(2, Math.max(0, Math.floor((t - M('segunda')) / 0.9) + 1));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cómo aplicar el método Lean Startup en tu empresa">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · cuatro piedras, cuatro preguntas */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <Mar x={60} y={500} w={1080} h={320} t={t} color={AZUL_M} oscuro="#1d4fbf" op={e1(t, 0.3)} />
                {PIEDRAS.slice(0, 3).map(([x, y], j) => <path key={j} d={`M ${x} ${y} L ${PIEDRAS[j + 1][0]} ${PIEDRAS[j + 1][1]}`} stroke="#fff" strokeWidth={6} strokeDasharray="4 16" strokeLinecap="round" opacity={0.7 * e1(t, llegada[j + 1] - 0.6)} />)}
                {PIEDRAS.map(([x, y], j) => (
                  <g key={j} opacity={e1(t, llegada[j] - 0.4)} transform={`translate(${x} ${y})`}>
                    <ellipse cx={0} cy={26} rx={104} ry={28} fill="#000" opacity={0.18} />
                    <ellipse cx={0} cy={10} rx={100} ry={32} fill="#94a3b8" /><ellipse cx={0} cy={0} rx={100} ry={32} fill="#cbd5e1" />
                    {j === 0 && <g transform="translate(0 -14) scale(0.7)"><rect x={-4} y={-40} width={8} height={90} rx={4} fill="#64748b" /><path d="M 4 -40 H 70 L 50 -18 L 70 4 H 4 Z" fill={ROSA} /></g>}
                    {j === 1 && <g transform="translate(0 -12) scale(0.45)"><rect x={-58} y={-110} width={116} height={220} rx={22} fill="#1f2937" /><rect x={-48} y={-94} width={96} height={188} rx={12} fill="#2f7bf6" /><rect x={-38} y={-82} width={34} height={32} rx={8} fill="#fff" /></g>}
                    {j === 2 && <g transform="translate(0 -10) scale(0.7)"><path d="M -60 20 A 60 60 0 0 1 60 20" fill="none" stroke={c.apagado} strokeWidth={18} strokeLinecap="round" /><path d="M -60 20 A 60 60 0 0 1 20 -36" fill="none" stroke={VERDE} strokeWidth={18} strokeLinecap="round" /><line x1={0} y1={20} x2={30} y2={-20} stroke={ROSA} strokeWidth={9} strokeLinecap="round" /></g>}
                    {j === 3 && <g transform="translate(0 -10) scale(0.7)"><path d="M 0 40 V 0 M 0 0 Q -24 -14 -50 -50 M 0 0 Q 24 -14 50 -50" stroke={NARANJA} strokeWidth={13} fill="none" strokeLinecap="round" /></g>}
                  </g>
                ))}
                <Barco x={bx} y={by + 70 + 3 * Math.sin(t * 2)} s={0.55} casco="#7c2d12" vela="#ffffff" rot={Math.sin(t * 1.6) * 3} op={e1(t, M('secuencia'))} />
              </g>
            )}

            {/* B · la empresa de capacitación en ventas */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Persona id={ID} x={170} y={720} s={0.7} cuerpo="#334155" corbata />
                <g opacity={e1(t, M('cursos'))} transform="translate(240 380)"><rect x={-90} y={-110} width={180} height={220} rx={16} fill={`url(#${ID}-marca)`} /><rect x={-90} y={-110} width={26} height={220} rx={13} fill="#000" opacity={0.2} /><path d="M -34 -50 H 64 M -34 -20 H 64 M -34 10 H 40" stroke="#fff" strokeWidth={9} strokeLinecap="round" /></g>
                {t >= M('sesion') && (
                  <g opacity={e1(t, M('sesion'))}>
                    <g transform="translate(560 330)"><circle r={78} fill="#fff" /><circle r={78} fill="none" stroke={NARANJA} strokeWidth={12} /><path d="M 0 -50 V 0 L 30 20" stroke="#334155" strokeWidth={10} strokeLinecap="round" fill="none" /></g>
                    {[0, 1, 2].map((q) => <g key={q} opacity={e1(t, M('sesion') + 0.5 + q * 0.4)}><Edificio x={420 + q * 150} y={700} w={90} h={130} color="#475569" /></g>)}
                  </g>
                )}
                {t >= M('segunda') && <g opacity={e1(t, M('segunda'))}>{[0, 1, 2].map((q) => <g key={q} opacity={q < pidieron ? 1 : 0.2}><circle cx={420 + q * 150} cy={560} r={30} fill={q < pidieron ? VERDE : c.apagado} /><path d={`M ${420 + q * 150 - 14} 560 l 10 12 l 20 -24`} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>)}</g>}
                {t >= M('cortas') && <g opacity={e1(t, M('cortas'))} transform="translate(960 380)">{[0, 1, 2].map((q) => <g key={q} transform={`translate(${(q - 1) * 80} ${(q % 2) * 50})`}><circle r={30} fill="#fff" stroke={NARANJA} strokeWidth={7} /><path d="M 0 -18 V 0 L 12 8" stroke="#334155" strokeWidth={5} fill="none" strokeLinecap="round" /></g>)}</g>}
                {t >= M('video') && <g opacity={e1(t, M('video'))} transform="translate(960 640)"><rect x={-66} y={-40} width={90} height={80} rx={14} fill="#334155" /><path d="M 30 -22 L 70 -42 V 42 L 30 22 Z" fill="#334155" /><path d="M -80 -54 L 84 54 M 84 -54 L -80 54" stroke={ROJO_O} strokeWidth={12} strokeLinecap="round" /></g>}
              </g>
            )}

            {/* C · la regla y un solo motor */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <g transform="translate(300 440)">
                  <Moneda x={-70} y={40} r={30} /><Moneda x={-20} y={40} r={30} />
                  <path d="M 30 40 H 120" stroke={c.texto} strokeWidth={10} strokeLinecap="round" />
                  <g transform="translate(220 10)"><path d="M 0 -60 Q 40 -60 40 -20 Q 40 20 0 20 Q -40 20 -40 -20 Q -40 -60 0 -60 Z" fill={VIOLETA} opacity={0.0} /><path d="M -34 40 L -34 -10 L 0 -60 L 34 -10 L 34 40 Z" fill="#fde047" /><Txt x={0} y={26} textAnchor="middle" fontSize={64} fill="#a16207">1</Txt></g>
                </g>
                <g opacity={e1(t, M('motor'))} transform="translate(840 440)"><Engranaje x={0} y={0} r={74} t={t} hueco={c.panel} color={VIOLETA} /></g>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
