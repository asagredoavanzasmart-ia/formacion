import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Chip, Etiqueta, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana } from './comunOA';
import { AZUL_C, AZUL_M, AZUL_O, Barco, Mar, ROJO_M, ROJO_O } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * «Océanos rojos y océanos azules», escena propia. Un mar rojo que se llena de barcos que se empujan, con el
 * ciclo de vida del producto y la carrera a la baja de los precios arriba, y la frontera que todos aceptan.
 * Luego el mar azul se abre a un lado: un barco avanza solo, lo ilumina una idea y las demandas nuevas se
 * expanden como ondas. Al final, el ejemplo: dos distribuidoras bajan precios en el rojo y una tercera cruza
 * hacia un cliente que nadie atendía.
 */

const ID = 'oa2';
const nombres = ['dosTipos', 'saturados', 'combaten', 'ciclo', 'carrera', 'fronteras', 'multiplican', 'contrario', 'sola', 'infinidad', 'teoria', 'ejemplo', 'distri', 'tercera', 'pregunta'] as const;
const BARCOS: [number, number][] = [[150, 600], [290, 680], [420, 590], [550, 690], [680, 610], [810, 680], [940, 590], [220, 520], [1000, 690]];

export const RojoAzulOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('tercera') + 3.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Dos tipos de mercado'], [M('saturados'), 'Océano rojo: saturado'], [M('ciclo'), 'Ciclo de vida del producto'], [M('carrera'), 'Carrera a la baja'], [M('fronteras'), 'Fronteras aceptadas'],
    [M('contrario'), 'Océano azul: avanzar solo'], [M('infinidad'), 'Demandas nuevas'], [M('teoria'), 'La teoría tradicional'], [M('ejemplo'), 'Ejemplo imaginario'], [M('distri'), 'Dos distribuidoras'], [M('tercera'), 'Una tercera, otro cliente'],
  ];

  const u = ac(t, M('contrario'), M('contrario') + 1.2);       // el mar rojo se encoge y se abre el azul
  const wRojo = lerp(1080, 340, u);
  const nBarcos = t < M('multiplican') ? 5 : 9;
  const ej = ac(t, M('ejemplo'), M('ejemplo') + 0.8);
  const sale = ac(t, M('tercera'), M('tercera') + 4);
  const choque = 1 + 1.6 * ac(t, M('combaten'), M('combaten') + 0.6);

  // Ciclo de vida: campana con un punto que la recorre
  const pt = (k: number): [number, number] => [190 + 560 * k, 390 - 210 * Math.pow(Math.sin(Math.PI * k), 1.15)];
  const campana = Array.from({ length: 41 }, (_, i) => pt(i / 40)).map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ');
  const rec = ac(t, M('ciclo'), M('ciclo') + 3.2);
  const [px, py] = pt(rec);
  const aCh = ventana(t, M('ciclo'), M('contrario'));
  const baja = ac(t, M('carrera'), M('carrera') + 1.8);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Océano rojo saturado y océano azul abierto">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* los dos mares */}
            <g opacity={e1(t, 0.3)}>
              <Mar x={60} y={470} w={wRojo} h={350} t={t} color={ROJO_M} oscuro={ROJO_O} />
              {u > 0.01 && <g opacity={u}><Mar x={60 + wRojo + 20} y={470} w={1080 - wRojo - 20} h={350} t={t} color={AZUL_M} oscuro={AZUL_O} /></g>}
            </g>

            {/* frontera que todos aceptan */}
            {t >= M('fronteras') && t < M('contrario') + 1 && (
              <rect x={44} y={452} width={1112} height={384} rx={28} fill="none" stroke={NARANJA} strokeWidth={8} strokeDasharray="22 16" opacity={e1(t, M('fronteras')) * (1 - u)} />
            )}

            {/* barcos del mar rojo */}
            {BARCOS.slice(0, nBarcos).map(([x0, y0], k) => {
              const ent = k < 5 ? e1(t, M('saturados') + k * 0.25) : e1(t, M('multiplican') + (k - 5) * 0.25);
              if (ent < 0.01) return null;
              const esAB = k === 1 || k === 4;
              const visible = ej > 0.01 && !esAB ? 1 - ej : 1;
              const x = lerp(x0, 70 + (x0 - 60) * 0.3, u);
              const y = lerp(y0, 560 + (y0 - 520) * 0.5, u);
              return <Barco key={k} x={x} y={y + 5 * Math.sin(t * 2 + k)} s={lerp(0.78, 0.55, u)} casco="#7c2d12" vela="#fecaca" rot={Math.sin(t * 5 * choque + k * 1.9) * 4 * choque} op={ent * visible} />;
            })}

            {/* chispas de la pelea */}
            {t > M('combaten') && t < M('contrario') && [0, 1, 2].map((k) => {
              const ph = (t * 1.4 + k / 3) % 1;
              return <path key={k} d="M 0 -14 L 5 -4 L 16 0 L 5 4 L 0 14 L -5 4 L -16 0 L -5 -4 Z" fill="#fde047" opacity={Math.sin(Math.PI * ph) * (1 - u)} transform={`translate(${300 + k * 280} ${560 + 40 * ((k * 5) % 3)}) scale(${0.7 + ph})`} />;
            })}

            {/* ciclo de vida y carrera a la baja */}
            {aCh > 0.01 && (
              <g opacity={aCh}>
                <rect x={120} y={130} width={960} height={300} rx={26} fill={c.panel} style={sombra(c.sombra, 8, 20)} />
                <rect x={170} y={400} width={620} height={6} rx={3} fill={c.apagado} />
                <path d={campana} fill="none" stroke={c.apagado} strokeWidth={10} strokeLinecap="round" />
                <path d={campana} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - rec} />
                {[0.05, 0.33, 0.62, 0.95].map((k) => <circle key={k} cx={pt(k)[0]} cy={pt(k)[1]} r={9} fill={rec >= k ? ROSA : c.panel} stroke={c.apagado} strokeWidth={4} />)}
                <circle cx={px} cy={py} r={16} fill={`url(#${ID}-marca)`} />
                {baja > 0.01 && (
                  <g opacity={baja} transform="translate(930 280)">
                    <g transform={`scale(${1 - 0.3 * baja})`}>
                      <path d="M -50 -46 H 18 L 56 0 L 18 46 H -50 Q -62 46 -62 34 V -34 Q -62 -46 -50 -46 Z" fill={`url(#${ID}-marca)`} />
                      <circle cx={-30} cy={0} r={10} fill={c.panel} />
                    </g>
                    <path d={`M 0 ${-70 + 20 * baja} V ${70 - 10 * (1 - baja)} M -26 ${44 - 10 * (1 - baja)} L 0 ${72 - 10 * (1 - baja)} L 26 ${44 - 10 * (1 - baja)}`} stroke={ROJO_O} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(-4 20)" />
                  </g>
                )}
              </g>
            )}

            {/* mar azul: un barco solo, la idea que lo ilumina y las demandas nuevas */}
            {u > 0.5 && t < M('teoria') && (
              <g opacity={e1(t, M('contrario') + 0.6) * (1 - ac(t, M('teoria') - 0.3, M('teoria')))}>
                <Barco x={lerp(560, 920, ac(t, M('sola'), M('sola') + 5))} y={640 + 5 * Math.sin(t * 2)} s={0.95} casco="#7c2d12" vela="#ffffff" rot={Math.sin(t * 1.5) * 3} />
                {t > M('infinidad') && [0, 1, 2, 3].map((k) => {
                  const ph = (t * 0.5 + k / 4) % 1;
                  return <circle key={k} cx={lerp(560, 920, ac(t, M('sola'), M('sola') + 5))} cy={690} r={20 + 190 * ph} fill="none" stroke={AZUL_C} strokeWidth={6} opacity={(1 - ph) * ac(t, M('infinidad'), M('infinidad') + 0.5)} />;
                })}
                {t > M('sola') && (
                  <g opacity={e1(t, M('sola'))} transform={`translate(760 ${300 + 6 * Math.sin(t * 2)})`}>
                    <circle r={86} fill="#fde047" opacity={0.28} />
                    <path d="M -34 14 Q -52 -22 -30 -48 Q 0 -78 30 -48 Q 52 -22 34 14 Q 22 28 20 40 H -20 Q -22 28 -34 14 Z" fill={`url(#${ID}-marca)`} />
                    <rect x={-18} y={42} width={36} height={12} rx={5} fill="#9ca3af" />
                  </g>
                )}
              </g>
            )}

            {/* la teoría tradicional */}
            {t >= M('teoria') && t < M('ejemplo') && (
              <g opacity={ventana(t, M('teoria'), M('ejemplo'))}>
                <Chip x={290} y={250} texto="enfocarse" c={c} id={ID} op={e1(t, M('teoria'))} />
                <Chip x={290} y={340} texto="deslocalizar" c={c} id={ID} op={e1(t, M('teoria') + 1.2)} />
              </g>
            )}

            {/* el ejemplo: A y B bajan precios, una tercera cruza */}
            {ej > 0.01 && (
              <g opacity={ej}>
                {[[139, 'A'], [256, 'B']].map(([x, l], k) => (
                  <g key={l as string} opacity={e1(t, M('distri') + k * 0.8)}>
                    <path d={`M ${x} 380 V ${430 + 10 * Math.sin(t * 3 + k)} M ${(x as number) - 22} ${410 + 10 * Math.sin(t * 3 + k)} L ${x} ${436 + 10 * Math.sin(t * 3 + k)} L ${(x as number) + 22} ${410 + 10 * Math.sin(t * 3 + k)}`} stroke={ROJO_O} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <Etiqueta x={x as number} y={350} texto={l as string} op={1} c={c} id={ID} />
                  </g>
                ))}
                <g opacity={e1(t, M('tercera'))}>
                  <Barco x={lerp(340, 900, sale)} y={620 - 40 * Math.sin(Math.PI * sale) + 5 * Math.sin(t * 2)} s={0.9} casco={NARANJA} vela="#ffffff" rot={-3 + 6 * sale} />
                  <ellipse cx={1030} cy={775} rx={90} ry={24} fill="#fde68a" />
                  <Persona id={ID} x={1030} y={775} s={0.6} cuerpo="#7c3aed" />
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
