import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Etiqueta, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana } from './comunOA';
import { AZUL_M, Edificio, Flecha, Precio, ROJO_M, ROJO_O, Tienda } from './comunOA';
import { Espalda } from '../../comunicacion/escenas/comunCE';
import type { PropsCE } from './comunOA';

/**
 * «La conquista de los no clientes», escena propia. Acto A: dos tiendas y un puñado de clientes que se pasan
 * de una a otra dentro de un mismo anillo de mercado (igual tamaño); el anillo se abre y entran personas
 * nuevas. Acto B: tres anillos concéntricos alrededor de la tienda: los inminentes dudan en el primero, los
 * «anti» se cruzan de brazos en el segundo (el todoterreno que contamina) y los inexplotados miran para otro
 * lado en el tercero. Acto C: un restaurante imaginario con sus tres anillos.
 */

const ID = 'oa9';
const nombres = ['cuota', 'mismo', 'amplia', 'tres', 'inminentes', 'pret', 'anti', 'todo', 'inexpl', 'potenciales', 'restaurante', 'caro', 'zona', 'pregunta'] as const;
const CY = 540;
const ANILLOS = [[270, 105], [385, 160], [500, 215]] as const;
const sobre = (r: number, ry: number, deg: number): [number, number] => [600 + r * Math.cos((deg * Math.PI) / 180), CY + ry * Math.sin((deg * Math.PI) / 180)];

export const NoClientesOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('zona') + 3 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Mercado y cuota'], [M('cuota'), 'Cambiar de proveedor'], [M('mismo'), 'Mismo tamaño'], [M('amplia'), 'Ampliar el mercado'], [M('tres'), 'Tres niveles'],
    [M('inminentes'), 'No clientes inminentes'], [M('anti'), 'Los anti'], [M('inexpl'), 'Los inexplotados'], [M('restaurante'), 'Un restaurante imaginario'],
  ];

  const aA = ventana(t, -1, M('tres'));
  const aB = ac(t, M('tres'), M('tres') + 0.5);
  const mover = ac(t, M('cuota') + 0.5, M('cuota') + 3.5);
  const abre = ac(t, M('amplia'), M('amplia') + 1.5);
  const tipo = (k: number) => [M('inminentes'), M('anti'), M('inexpl')][k];
  const resto = ac(t, M('restaurante'), M('restaurante') + 0.5);
  const pret = ac(t, M('pret'), M('pret') + 3);
  const colores = ['#334155', '#7c3aed', '#0f766e', '#ec4899', '#f59e0b', '#2563eb'];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los no clientes: inminentes, anti e inexplotados, en anillos alrededor del mercado">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · el mismo mercado, distinto proveedor */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <ellipse cx={600} cy={500} rx={lerp(420, 520, abre)} ry={lerp(230, 290, abre)} fill={ROJO_M} opacity={0.12} />
                <ellipse cx={600} cy={500} rx={lerp(420, 520, abre)} ry={lerp(230, 290, abre)} fill="none" stroke={NARANJA} strokeWidth={8} strokeDasharray="22 16" opacity={e1(t, M('mismo') - 0.5)} />
                <Tienda x={230} y={520} w={150} color="#475569" /><Tienda x={970} y={520} w={150} color="#0f766e" />
                {colores.slice(0, 5).map((col, j) => {
                  const x0 = 320 + j * 62, x1 = 880 - j * 62;
                  return <g key={j} opacity={e1(t, 0.5 + j * 0.2)}><Persona id={ID} x={lerp(x0, x1, mover)} y={620 + (j % 2) * 40 - 30 * Math.sin(Math.PI * mover)} s={0.42} cuerpo={col} /></g>;
                })}
                <Flecha x1={430} y1={330} x2={770} y2={330} u={ac(t, M('cuota'), M('cuota') + 1.2)} color={NARANJA} />
                {t >= M('mismo') && <Txt x={600} y={400} textAnchor="middle" fontSize={64} fill={c.texto} opacity={e1(t, M('mismo'))}>=</Txt>}
                {abre > 0.05 && [0, 1, 2].map((j) => <g key={j} opacity={abre}><Persona id={ID} x={lerp(60 + j * 30, 360 + j * 240, abre)} y={760 - j * 12} s={0.42} cuerpo="#94a3b8" /></g>)}
              </g>
            )}

            {/* B y C · tres anillos alrededor del mercado */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {ANILLOS.map(([rx, ry], k) => (
                  <g key={k} opacity={e1(t, M('tres') + k * 0.4)}>
                    <ellipse cx={600} cy={CY} rx={rx} ry={ry} fill={[AZUL_M, ROSA, '#64748b'][k]} opacity={0.1} />
                    <ellipse cx={600} cy={CY} rx={rx} ry={ry} fill="none" stroke={[AZUL_M, ROSA, '#64748b'][k]} strokeWidth={6} strokeDasharray="4 14" strokeLinecap="round" opacity={0.7} />
                  </g>
                ))}
                {resto < 0.5 ? <Tienda x={600} y={CY + 30} w={130} color="#0f766e" op={e1(t, M('tres'))} /> : <g opacity={resto}><Tienda x={600} y={CY + 30} w={130} color="#a16207" /></g>}

                {/* primer anillo: inminentes que dudan */}
                {t >= tipo(0) && [30, 90, 150].map((deg, j) => {
                  const [x, y] = sobre(ANILLOS[0][0], ANILLOS[0][1], deg);
                  const entra = j === 1 ? pret : 0;
                  return <g key={j} opacity={e1(t, tipo(0) + j * 0.3)}><Persona id={ID} x={lerp(x, 600 + (j === 1 ? 0 : 0), entra * 0.0)} y={y + 28 - 10 * Math.sin(t * 2 + j) * (1 - entra)} s={0.46} cuerpo={colores[j]} /></g>;
                })}
                {t >= M('pret') && (
                  <g opacity={e1(t, M('pret'))}>
                    <g transform="translate(250 230)"><rect x={-60} y={-24} width={120} height={46} rx={22} fill="#f59e0b" /><rect x={-60} y={-24} width={120} height={20} rx={10} fill="#fde68a" /><circle cx={-24} cy={-10} r={4} fill="#a16207" /><circle cx={6} cy={-12} r={4} fill="#a16207" /></g>
                    <Flecha x1={330} y1={240} x2={500} y2={420} u={ac(t, M('pret'), M('pret') + 2)} color={NARANJA} grosor={10} />
                  </g>
                )}

                {/* segundo anillo: los anti */}
                {t >= tipo(1) && [200, 270, 340].map((deg, j) => {
                  const [x, y] = sobre(ANILLOS[1][0], ANILLOS[1][1], deg > 180 ? deg - 360 + 360 : deg);
                  return (
                    <g key={j} opacity={e1(t, tipo(1) + j * 0.3)}>
                      <Persona id={ID} x={x} y={y + 30} s={0.46} cuerpo={['#be123c', '#9f1239', '#881337'][j]} />
                      <path d={`M ${x - 22} ${y - 20} L ${x + 22} ${y - 56} M ${x + 22} ${y - 20} L ${x - 22} ${y - 56}`} stroke={ROJO_O} strokeWidth={6} strokeLinecap="round" />
                    </g>
                  );
                })}
                {t >= M('todo') && (
                  <g opacity={ventana(t, M('todo'), M('restaurante')) }>
                    <g transform="translate(600 240)">
                      <path d="M -110 30 V -10 Q -110 -26 -90 -28 L -60 -52 H 50 L 84 -26 Q 110 -24 110 -6 V 30 Z" fill="#78350f" /><path d="M -56 -26 L -40 -44 H 40 L 62 -26 Z" fill="#bae6fd" />
                      <circle cx={-62} cy={30} r={26} fill="#1f2937" /><circle cx={62} cy={30} r={26} fill="#1f2937" />
                      <circle cx={0} cy={0} r={74} fill="none" stroke={ROJO_O} strokeWidth={10} opacity={0.9} /><path d="M -52 -52 L 52 52" stroke={ROJO_O} strokeWidth={10} />
                    </g>
                    <Edificio x={410} y={290} w={56} h={80} color="#64748b" /><Edificio x={790} y={290} w={56} h={100} color="#64748b" />
                  </g>
                )}

                {/* tercer anillo: los inexplotados miran para otro lado */}
                {t >= tipo(2) && [20, 90, 160].map((deg, j) => {
                  const [x, y] = sobre(ANILLOS[2][0], ANILLOS[2][1], deg);
                  return <g key={j} opacity={e1(t, tipo(2) + j * 0.3)}><Espalda x={x} y={y + 20} s={0.62} cuerpo={['#94a3b8', '#a8b3c4', '#8d99ac'][j]} c={c} /></g>;
                })}
                {t >= M('potenciales') && <g opacity={e1(t, M('potenciales')) * (1 - resto)}>{[20, 90, 160].map((deg, j) => { const [x, y] = sobre(ANILLOS[2][0], ANILLOS[2][1], deg); return <Flecha key={j} x1={x} y1={y - 20} x2={600 + (x - 600) * 0.5} y2={CY + 60} color={NARANJA} grosor={7} u={ac(t, M('potenciales') + j * 0.4, M('potenciales') + 1.6 + j * 0.4)} />; })}</g>}

                {/* C · el restaurante imaginario */}
                {resto > 0.01 && (
                  <g opacity={resto}>
                    <g transform="translate(600 235)"><ellipse rx={80} ry={26} fill="#e5e7eb" /><ellipse rx={50} ry={15} fill="#fff" /><circle cx={0} cy={-6} r={12} fill="#ef4444" /><rect x={-110} y={-24} width={8} height={44} rx={4} fill="#94a3b8" /><rect x={102} y={-24} width={8} height={44} rx={4} fill="#94a3b8" /></g>
                    {t >= M('caro') && <g opacity={e1(t, M('caro'))}><Precio x={250} y={CY + 80} s={1} /><Flecha x1={250} y1={CY + 140} x2={250} y2={CY + 200} color={ROJO_O} grosor={9} op={0.0} /></g>}
                    {t >= M('zona') && <g opacity={e1(t, M('zona'))}><Edificio x={1010} y={CY + 130} w={80} h={110} color={isDark ? "#8294b3" : "#475569"} /><Persona id={ID} x={930} y={CY + 130} s={0.34} cuerpo="#2563eb" /><Persona id={ID} x={880} y={CY + 140} s={0.34} cuerpo="#0f766e" /></g>}
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
