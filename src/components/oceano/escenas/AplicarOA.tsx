import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, ac, sombra, tono } from '../../remotion/comun';
import { PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana } from './comunOA';
import { AZUL_M, Barco, Curva, Flecha, Mar, ROJO_M, ROJO_O } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * «Cómo aplicarlo en tu empresa», escena propia. Acto A: cinco piedras en el agua, una por pregunta (el
 * punto de partida, lo que sobra, lo que falta, hacia fuera y el experimento), con un barco que salta de
 * una a otra. Acto B: la firma de contabilidad imaginaria: su curva frente a la de las demás cambia al
 * eliminar las visitas, reducir los informes, aumentar la claridad y crear un resumen mensual; luego los
 * emprendedores que nunca contrataron a un contador y el ensayo con diez de ellos.
 */

const ID = 'oa12';
const nombres = ['secuencia', 'partida', 'sobra', 'falta', 'fuera', 'experimento', 'firma', 'elimina', 'reduce', 'aumenta', 'resumen', 'emprend', 'diez', 'pregunta'] as const;
const PIEDRAS: [number, number][] = [[170, 600], [400, 460], [630, 600], [860, 460], [1050, 600]];
const XK = (k: number) => 170 + k * 160;
const YK = (l: number) => 480 - l * 250;

export const AplicarOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('diez') + 3 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Preguntas para tu equipo'], [M('partida'), 'El punto de partida'], [M('sobra'), 'Lo que sobra'], [M('falta'), 'Lo que falta'], [M('fuera'), 'Hacia fuera'], [M('experimento'), 'Un experimento pequeño'],
    [M('firma'), 'Una firma de contabilidad'], [M('elimina'), 'Eliminar'], [M('reduce'), 'Reducir'], [M('aumenta'), 'Aumentar'], [M('resumen'), 'Crear: un resumen'], [M('emprend'), 'Emprendedores'], [M('diez'), 'Ensayo con diez'],
  ];

  const aA = ventana(t, -1, M('firma'));
  const aB = ac(t, M('firma'), M('firma') + 0.5);
  const llegada = [M('partida'), M('sobra'), M('falta'), M('fuera'), M('experimento')];
  const k = llegada.filter((tt) => t >= tt).length - 1;
  const ant = Math.max(0, k - 1);
  const u = k <= 0 ? 1 : ac(t, llegada[k] - 0.2, llegada[k] + 0.9);
  const bx = k < 0 ? 100 : lerp(PIEDRAS[ant][0], PIEDRAS[k][0], u);
  const by = (k < 0 ? 560 : lerp(PIEDRAS[ant][1], PIEDRAS[k][1], u)) - 60 - 50 * Math.sin(Math.PI * (k <= 0 ? 0 : u));

  // B · curvas de la firma
  const compet = [0.7, 0.7, 0.3, 0.0];
  const nueva = [0.0, 0.25, 0.9, 0.95];
  const tk = [M('elimina'), M('reduce'), M('aumenta'), M('resumen')];
  const nivel = (j: number) => lerp(compet[j], nueva[j], ac(t, tk[j], tk[j] + 1.2));
  const ptsF = [0, 1, 2, 3].map((j): [number, number] => [XK(j), YK(nivel(j))]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cómo aplicar el océano azul en tu empresa: una secuencia de preguntas y un ejemplo">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · cinco piedras, cinco preguntas */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <Mar x={60} y={470} w={1080} h={350} t={t} color={AZUL_M} oscuro="#1d4fbf" op={e1(t, 0.3)} />
                {PIEDRAS.slice(0, 4).map(([x, y], j) => <path key={j} d={`M ${x} ${y} L ${PIEDRAS[j + 1][0]} ${PIEDRAS[j + 1][1]}`} stroke="#fff" strokeWidth={6} strokeDasharray="4 16" strokeLinecap="round" opacity={0.7 * e1(t, llegada[j + 1] - 0.6)} />)}
                {PIEDRAS.map(([x, y], j) => (
                  <g key={j} opacity={e1(t, llegada[j] - 0.4)} transform={`translate(${x} ${y})`}>
                    <ellipse cx={0} cy={26} rx={96} ry={26} fill="#000" opacity={0.18} />
                    <ellipse cx={0} cy={10} rx={92} ry={30} fill="#94a3b8" /><ellipse cx={0} cy={0} rx={92} ry={30} fill="#cbd5e1" />
                    {j === 0 && <g transform="translate(0 -8) scale(0.6)"><path d="M -60 20 L -20 -20 L 20 0 L 60 -40" fill="none" stroke={ROJO_M} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></g>}
                    {j === 1 && <g transform="translate(0 -8) scale(0.6)"><path d="M -50 -26 L 50 26 M 50 -26 L -50 26" stroke={ROJO_O} strokeWidth={14} strokeLinecap="round" /></g>}
                    {j === 2 && <g transform="translate(0 -6) scale(0.6)"><path d="M 0 -50 L 12 -12 L 50 0 L 12 12 L 0 50 L -12 12 L -50 0 L -12 -12 Z" fill={`url(#${ID}-marca)`} /></g>}
                    {j === 3 && <g transform="translate(0 -4) scale(0.8)"><Persona id={ID} x={-34} y={20} s={0.34} cuerpo="#94a3b8" /><Persona id={ID} x={0} y={26} s={0.34} cuerpo="#a8b3c4" /><Persona id={ID} x={34} y={20} s={0.34} cuerpo="#8d99ac" /></g>}
                    {j === 4 && <g transform="translate(0 -8) scale(0.6)"><path d="M -16 -50 H 16 V -14 L 40 34 Q 44 46 30 46 H -30 Q -44 46 -40 34 L -16 -14 Z" fill="#bae6fd" /><path d="M -30 20 H 30 L 40 34 Q 44 46 30 46 H -30 Q -44 46 -40 34 Z" fill={NARANJA} /></g>}
                  </g>
                ))}
                <Barco x={bx} y={by + 70 + 3 * Math.sin(t * 2)} s={0.55} casco="#7c2d12" vela="#ffffff" rot={Math.sin(t * 1.6) * 3} op={e1(t, M('secuencia'))} />
              </g>
            )}

            {/* B · la firma de contabilidad */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <rect x={70} y={170} width={680} height={400} rx={28} fill={c.panel} style={sombra(c.sombra, 8, 20)} />
                <rect x={110} y={510} width={600} height={6} rx={3} fill={c.apagado} />
                {/* los cuatro factores: visitas, informes, claridad, resumen */}
                {[0, 1, 2, 3].map((j) => (
                  <g key={j} opacity={e1(t, M('firma') + 0.3 + j * 0.2)} transform={`translate(${XK(j)} 540)`}>
                    {j === 0 && <g><Persona id={ID} x={0} y={22} s={0.28} cuerpo={isDark ? '#8da2c0' : '#334155'} corbata /></g>}
                    {j === 1 && <g>{[0, 1, 2].map((q) => <rect key={q} x={-18 + q * 6} y={-14 + q * 3} width={34} height={42} rx={4} fill={q === 2 ? '#fff' : '#e5e7eb'} stroke="#94a3b8" strokeWidth={2} />)}</g>}
                    {j === 2 && <g><circle r={20} fill="#fde68a" /><path d="M -10 14 Q -18 -2 -8 -12 Q 0 -20 8 -12 Q 18 -2 10 14 Z" fill={`url(#${ID}-marca)`} /></g>}
                    {j === 3 && <g><rect x={-24} y={-16} width={48} height={40} rx={8} fill="#fff" stroke="#94a3b8" strokeWidth={2} />{[-12, 0, 12].map((q) => <circle key={q} cx={q} cy={4} r={4} fill={NARANJA} />)}</g>}
                  </g>
                ))}
                <Curva pts={[0, 1, 2, 3].map((j): [number, number] => [XK(j), YK(compet[j])])} u={ac(t, M('firma') + 0.4, M('firma') + 2)} color={ROJO_M} grosor={9} op={0.75} />
                <Curva pts={ptsF} u={ac(t, M('elimina') - 0.2, M('elimina') + 0.8)} color={AZUL_M} grosor={11} />
                {t >= M('elimina') && <Flecha x1={XK(0)} y1={YK(0.7)} x2={XK(0)} y2={YK(0.05)} u={ac(t, M('elimina'), M('elimina') + 1)} color={ROJO_O} grosor={7} op={0.7} />}

                {/* los emprendedores y el ensayo con diez */}
                {t >= M('emprend') && (
                  <g opacity={e1(t, M('emprend')) * (1 - ac(t, M('diez') - 0.3, M('diez')))}>
                    {[0, 1, 2].map((q) => <g key={q}><Persona id={ID} x={810 + q * 110} y={460} s={0.5} cuerpo={['#94a3b8', '#a8b3c4', '#8d99ac'][q]} /></g>)}
                  </g>
                )}
                {t >= M('diez') && (
                  <g opacity={e1(t, M('diez'))}>
                    {Array.from({ length: 10 }, (_, q) => <g key={q} opacity={e1(t, M('diez') + q * 0.15)}><Persona id={ID} x={800 + (q % 5) * 70} y={400 + Math.floor(q / 5) * 120} s={0.3} cuerpo={['#334155', '#7c3aed', '#0f766e', '#ec4899', '#f59e0b'][q % 5]} /></g>)}
                    <path d="M 780 560 H 1140" stroke={c.apagado} strokeWidth={6} strokeDasharray="10 12" strokeLinecap="round" />
                  </g>
                )}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
