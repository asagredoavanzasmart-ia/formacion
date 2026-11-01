import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Chip, Edificio, Flecha, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana, AZUL_M, ROJO_M, ROJO_O, VERDE, VIOLETA } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «La técnica de los lotes pequeños», escena propia. Acto A: la producción en serie (una montaña de piezas
 * en almacén, tachada como despilfarro) frente al flujo continuo de lotes pequeños. Acto B: «tirar»: un
 * pedido llega desde el cliente y jala de cada etapa solo lo que se necesita. Acto C: Japón de posguerra
 * (lotes pequeños) frente a las grandes fábricas (lotes enormes), con Ohno. Acto D: la consultora que
 * entrega una hoja por semana en vez de un informe de cuarenta.
 */

const ID = 'ls8';
const nombres = ['serie', 'flujo', 'exist', 'despil', 'tirar', 'anterior', 'pedido', 'posguerra', 'ohno', 'consult', 'cuarenta', 'resumen', 'pregunta'] as const;

const Caja: React.FC<{ x: number; y: number; w?: number; color?: string; op?: number }> = ({ x, y, w = 40, color = '#f59e0b', op = 1 }) => (
  <g opacity={op}><rect x={x - w / 2} y={y - w} width={w} height={w} rx={5} fill={color} /><rect x={x - w / 2} y={y - w} width={w} height={w * 0.28} rx={4} fill="#fff" opacity={0.28} /></g>
);

export const LotesLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('resumen') + 4 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Producción en serie'], [M('flujo'), 'Flujo continuo'], [M('exist'), 'Piezas almacenadas'], [M('despil'), 'Una forma de despilfarro'], [M('tirar'), 'Tirar'], [M('pedido'), 'El pedido manda'],
    [M('posguerra'), 'Japón, posguerra'], [M('ohno'), 'Ohno y Shingo'], [M('consult'), 'Una consultora'], [M('cuarenta'), 'Un informe de cuarenta'], [M('resumen'), 'Una hoja por semana'],
  ];
  const aA = ventana(t, -1, M('tirar'));
  const aB = ventana(t, M('tirar'), M('posguerra'));
  const aC = ventana(t, M('posguerra'), M('consult'));
  const aD = ac(t, M('consult'), M('consult') + 0.4);
  const cin = (t * 90) % 100;
  const ped = ac(t, M('pedido'), M('pedido') + 1.4);
  const jala = (k: number) => ac(t, M('anterior') + k * 0.8, M('anterior') + 1.4 + k * 0.8);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Lotes pequeños y producción por pedido">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · montaña de piezas frente a flujo continuo */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <g opacity={e1(t, M('serie'))}>
                  <rect x={90} y={560} width={460} height={14} rx={7} fill="#475569" />
                  {Array.from({ length: 21 }, (_, k) => <Caja key={k} x={140 + (k % 7) * 62} y={540 - Math.floor(k / 7) * 46} w={52} color={ROJO_M} op={ac(t, M('serie') + k * 0.08, M('serie') + 0.4 + k * 0.08)} />)}
                </g>
                <g opacity={e1(t, M('flujo'))}>
                  <rect x={640} y={460} width={470} height={16} rx={8} fill="#475569" />
                  {[0, 1, 2, 3].map((k) => <Caja key={k} x={660 + ((k * 110 + cin * 1.2) % 440)} y={460} w={42} color={VERDE} />)}
                  <Flecha x1={700} y1={410} x2={1060} y2={410} color={VERDE} grosor={9} />
                </g>
                {t >= M('exist') && <g opacity={e1(t, M('exist'))} transform="translate(320 330)"><rect x={-70} y={-50} width={140} height={90} rx={12} fill={c.panel} style={sombra(c.sombra, 4, 10)} /><Txt x={0} y={22} textAnchor="middle" fontSize={64} fill={ROJO_O}>21</Txt></g>}
                {t >= M('despil') && <g opacity={e1(t, M('despil'))}><path d="M 100 300 L 540 580 M 540 300 L 100 580" stroke={ROJO_O} strokeWidth={14} strokeLinecap="round" opacity={0.75} /></g>}
              </g>
            )}

            {/* B · tirar: el pedido jala de cada etapa */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {[0, 1, 2].map((k) => (
                  <g key={k} opacity={e1(t, M('tirar') + k * 0.3)} transform={`translate(${200 + k * 260} 480)`}>
                    <rect x={-80} y={-70} width={160} height={140} rx={20} fill={c.panel} style={sombra(c.sombra, 6, 14)} />
                    <rect x={-80} y={-70} width={160} height={16} rx={8} fill={[AZUL_M, VIOLETA, NARANJA][k]} />
                    <Caja x={0} y={30} w={50} color={['#60a5fa', '#a78bfa', '#fb923c'][k]} op={jala(2 - k)} />
                  </g>
                ))}
                {[0, 1].map((k) => <Flecha key={k} x1={360 + k * 260 + 20} y1={480} x2={290 + k * 260 - 20 + 0} y2={480} color={NARANJA} grosor={10} op={ac(t, M('anterior') + k * 0.8, M('anterior') + 1 + k * 0.8)} />)}
                <g opacity={e1(t, M('pedido'))} transform={`translate(${lerp(1110, 960, ped)} 480)`}>
                  <Persona id={ID} x={0} y={70} s={0.6} cuerpo={VIOLETA} />
                  <rect x={-90} y={-30} width={70} height={90} rx={8} fill="#fff" transform="rotate(-8)" style={sombra(0.2, 3, 8)} /><path d="M -80 0 H -34 M -80 20 H -34 M -80 40 H -50" stroke="#94a3b8" strokeWidth={5} transform="rotate(-8)" />
                </g>
              </g>
            )}

            {/* C · Japón frente a las grandes fábricas */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <g opacity={e1(t, M('posguerra'))}>
                  <rect x={80} y={300} width={430} height={340} rx={26} fill={c.panel} style={sombra(c.sombra, 6, 14)} />
                  {Array.from({ length: 6 }, (_, k) => <Caja key={k} x={150 + (k % 3) * 90} y={510 - Math.floor(k / 3) * 58} w={52} color={VERDE} />)}
                  <rect x={680} y={300} width={430} height={340} rx={26} fill={c.panel} style={sombra(c.sombra, 6, 14)} />
                  {Array.from({ length: 24 }, (_, k) => <Caja key={k} x={720 + (k % 8) * 46} y={610 - Math.floor(k / 8) * 48} w={40} color={ROJO_M} />)}
                </g>
                {t >= M('ohno') && [0, 1].map((k) => <g key={k} opacity={e1(t, M('ohno') + k * 0.4)}><Persona id={ID} x={250 + k * 130} y={740} s={0.5} cuerpo={['#334155', '#0f766e'][k]} /></g>)}
              </g>
            )}

            {/* D · una hoja por semana */}
            {aD > 0.01 && (
              <g opacity={aD}>
                <g opacity={e1(t, M('cuarenta'))}>
                  {Array.from({ length: 12 }, (_, k) => <rect key={k} x={120 + k * 3} y={330 - k * 3} width={150} height={200} rx={6} fill="#fff" stroke="#cbd5e1" strokeWidth={2} />)}
                  <Txt x={195} y={460} textAnchor="middle" fontSize={64} fill={ROJO_O}>40</Txt>
                </g>
                {t >= M('resumen') && [0, 1, 2, 3].map((k) => (
                  <g key={k} opacity={e1(t, M('resumen') + k * 0.9)} transform={`translate(${420 + k * 170} 430)`}>
                    <rect x={-60} y={-90} width={120} height={160} rx={8} fill="#fff" stroke="#cbd5e1" strokeWidth={2} /><path d="M -40 -50 H 40 M -40 -28 H 40 M -40 -6 H 20" stroke="#94a3b8" strokeWidth={5} />
                    <circle cx={44} cy={52} r={22} fill={VERDE} /><path d="M 32 52 l 8 9 l 16 -18" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
