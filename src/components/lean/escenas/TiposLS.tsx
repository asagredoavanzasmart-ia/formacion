import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Celda, Edificio, Engranaje, Flecha, Moneda, PanelPregunta, Precio, Rotulo, Telefono, Tienda, W, H, borde, e1, marcador, ventana, AZUL_M, ROJO_M, VERDE, VIOLETA } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «Los diez tipos de pivote», escena propia. Diez celdas en dos filas, una por pivote, cada una con su
 * dibujo: la pieza que se vuelve producto o el producto que se vuelve pieza, otro cliente, otro problema, la
 * aplicación que se vuelve plataforma, el margen contra el volumen, el valor que se mide distinto, el
 * motor, el canal y la tecnología. Al final, el ejemplo imaginario: un programa de reservas para
 * restaurantes que descubre a los hoteles pequeños.
 */

const ID = 'ls7';
const nombres = ['acerc', 'alej', 'segm', 'nece', 'plata', 'arq', 'captura', 'quedan', 'motor', 'canal', 'tec', 'ejemplo', 'hoteles', 'pregunta'] as const;
const POS: [number, number][] = [0, 1, 2, 3, 4].map((k) => [150 + k * 225, 300] as [number, number]).concat([0, 1, 2, 3, 4].map((k) => [150 + k * 225, 580] as [number, number]));

export const TiposLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('hoteles') + 4 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Diez pivotes'], [M('acerc'), 'Acercamiento'], [M('alej'), 'Alejamiento'], [M('segm'), 'Segmento de consumidor'], [M('nece'), 'Necesidad del consumidor'], [M('plata'), 'Plataforma'],
    [M('arq'), 'Arquitectura del negocio'], [M('captura'), 'Captura del valor'], [M('motor'), 'Motor de crecimiento'], [M('canal'), 'Canal'], [M('tec'), 'Tecnología'], [M('ejemplo'), 'Ejemplo imaginario'],
  ];
  const lim = [M('acerc'), M('alej'), M('segm'), M('nece'), M('plata'), M('arq'), M('captura'), M('motor'), M('canal'), M('tec'), M('ejemplo')];
  const activa = lim.findIndex((_, k) => k < 10 && t >= lim[k] && t < lim[k + 1]);
  const ej = ac(t, M('ejemplo'), M('ejemplo') + 0.5);
  const mov = (k: number) => ac(t, lim[k] + 0.4, lim[k] + 1.6);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los diez tipos de pivote">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            <g opacity={1 - 0.97 * ej}>
              {POS.map(([x, y], k) => {
                const a = activa === k;
                const v = t >= lim[k];
                const m = v ? mov(k) : 0;
                return (
                  <Celda key={k} x={x} y={y} w={206} h={240} c={c} activa={a} op={e1(t, 0.3 + k * 0.1) * (activa < 0 || a ? 1 : 0.55)}>
                    {v && (
                      <g opacity={e1(t, lim[k])}>
                        {k === 0 && <g><rect x={-40} y={-30} width={80} height={60} rx={10} fill={c.apagado} /><rect x={-24 - 16 * m} y={-30 + 60 * 0} width={34 + 46 * m} height={30 + 34 * m} rx={8} fill={`url(#${ID}-marca)`} transform={`translate(${14 * m} ${-4 * m})`} /></g>}
                        {k === 1 && <g><rect x={-60 + 30 * m} y={-46 + 28 * m} width={120 - 60 * m} height={96 - 56 * m} rx={10} fill={c.apagado} /><rect x={-22 + 4 * m} y={-20 + 8 * m} width={44} height={40} rx={8} fill={`url(#${ID}-marca)`} /></g>}
                        {k === 2 && <g><Persona id={ID} x={-48} y={50} s={0.42} cuerpo={VIOLETA} opacity={1 - 0.7 * m} /><Flecha x1={-20} y1={0} x2={22} y2={0} color={NARANJA} grosor={9} u={m} /><Persona id={ID} x={56} y={50} s={0.42} cuerpo="#0f766e" /></g>}
                        {k === 3 && <g><g opacity={1 - 0.6 * m}><circle cx={-44} cy={-10} r={34} fill={ROJO_M} /><Txt x={-44} y={4} textAnchor="middle" fontSize={44} fill="#fff">!</Txt></g><Flecha x1={-6} y1={-10} x2={26} y2={-10} color={NARANJA} grosor={8} u={m} /><g opacity={0.4 + 0.6 * m}><circle cx={60} cy={-10} r={34} fill={AZUL_M} /><Txt x={60} y={4} textAnchor="middle" fontSize={44} fill="#fff">?</Txt></g></g>}
                        {k === 4 && <g><Telefono x={-30} y={4} s={0.5} widgets={2} /><g opacity={m}>{[0, 1, 2].map((q) => <rect key={q} x={14 + q * 6} y={-44 + q * 22 - 10} width={60} height={22} rx={6} fill={AZUL_M} opacity={0.5 + 0.2 * q} />)}</g></g>}
                        {k === 5 && <g><g opacity={1 - 0.6 * m}>{[0].map(() => <g key="a"><rect x={-60} y={-20} width={30} height={60} rx={6} fill={VERDE} /><Moneda x={-45} y={-34} r={14} /></g>)}</g><Flecha x1={-18} y1={10} x2={16} y2={10} color={NARANJA} grosor={8} u={m} /><g opacity={0.4 + 0.6 * m}>{[0, 1, 2, 3].map((q) => <rect key={q} x={26 + q * 18} y={10 - 24 * m} width={14} height={30 * (0.5 + 0.5 * m)} rx={4} fill={VERDE} />)}</g></g>}
                        {k === 6 && <g><Precio x={-30} y={-6} s={0.6} /><Moneda x={44} y={-6} r={24} /><path d="M 4 -6 H 20" stroke={c.texto} strokeWidth={6} strokeLinecap="round" /><path d="M 12 -14 V 2" stroke={c.texto} strokeWidth={6} strokeLinecap="round" opacity={m} /></g>}
                        {k === 7 && <Engranaje x={0} y={0} r={40} t={t} hueco={c.panel} color={VIOLETA} />}
                        {k === 8 && <g><path d="M -64 20 H 40" stroke={c.apagado} strokeWidth={10} strokeLinecap="round" /><rect x={-60 + 90 * m} y={-26} width={54} height={36} rx={6} fill={NARANJA} /><rect x={-6 + 90 * m} y={-14} width={26} height={24} rx={5} fill="#f59e0b" /><circle cx={-42 + 90 * m} cy={14} r={9} fill="#1f2937" /><circle cx={8 + 90 * m} cy={14} r={9} fill="#1f2937" /></g>}
                        {k === 9 && <g><rect x={-36} y={-36} width={72} height={72} rx={12} fill="#475569" /><rect x={-18} y={-18} width={36} height={36} rx={6} fill="#94a3b8" />{[-22, 0, 22].map((p) => <g key={p}><rect x={p - 3} y={-52} width={6} height={16} fill="#94a3b8" /><rect x={p - 3} y={36} width={6} height={16} fill="#94a3b8" /></g>)}</g>}
                      </g>
                    )}
                  </Celda>
                );
              })}
            </g>

            {ej > 0.01 && (
              <g opacity={ej}>
                <Tienda x={230} y={640} w={190} color="#0f766e" />
                <Flecha x1={380} y1={560} x2={720} y2={560} u={ac(t, M('hoteles') - 0.4, M('hoteles') + 1.2)} color={NARANJA} grosor={14} />
                <g opacity={e1(t, M('hoteles'))}><Edificio x={880} y={650} w={170} h={290} color="#334155" />{[0, 1].map((k) => <Persona key={k} id={ID} x={770 + k * 70} y={700 + k * 10} s={0.3} cuerpo={[VIOLETA, '#0f766e'][k]} />)}</g>
                <g opacity={e1(t, M('ejemplo') + 0.5)}><Telefono x={600} y={320} s={1} widgets={4} /></g>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
