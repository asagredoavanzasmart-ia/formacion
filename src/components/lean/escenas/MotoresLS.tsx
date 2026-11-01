import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Celda, Engranaje, Flecha, Moneda, PanelPregunta, Precio, Rotulo, W, H, borde, e1, lerp, marcador, ventana, AZUL_M, ROJO_M, ROJO_O, VERDE, VIOLETA } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «Los motores de crecimiento», escena propia. Tres celdas con su motor: el pegajoso (un balde al que
 * entran clientes más rápido de lo que salen), el viral (clientes que contagian a otros por contacto) y el
 * remunerado (lo que gasta un cliente a lo largo de su vida frente a lo que costó conseguirlo). Luego se
 * elige uno solo, se confirma el ajuste entre producto y mercado y el motor se queda sin aliento.
 */

const ID = 'ls10';
const nombres = ['mecan', 'tres', 'pegajoso', 'retencion', 'viral', 'inconsc', 'remun', 'vida', 'preferir', 'idoneidad', 'aliento', 'pregunta'] as const;
const CX = [220, 600, 980];

export const MotoresLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('aliento') + 4 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Un mecanismo de crecimiento'], [M('tres'), 'Tres motores'], [M('pegajoso'), 'Motor pegajoso'], [M('viral'), 'Motor viral'], [M('remun'), 'Motor remunerado'], [M('preferir'), 'Un solo motor'],
    [M('idoneidad'), 'Producto y mercado'], [M('aliento'), 'Se queda sin aliento'],
  ];
  const lim = [M('pegajoso'), M('viral'), M('remun'), M('preferir')];
  const activa = lim.findIndex((_, k) => k < 3 && t >= lim[k] && t < lim[k + 1]);
  const unico = ac(t, M('preferir'), M('preferir') + 1);
  const idon = ac(t, M('idoneidad'), M('idoneidad') + 0.6);
  const agota = ac(t, M('aliento'), M('aliento') + 3);
  const nivel = 0.3 + 0.55 * ac(t, M('pegajoso'), M('retencion') + 4);
  const op = (k: number) => (unico > 0.01 ? (k === 1 ? 1 : 1 - 0.7 * unico) : activa < 0 || activa === k ? 1 : 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los tres motores de crecimiento: pegajoso, viral y remunerado">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {CX.map((x, k) => (
              <Celda key={k} x={x} y={470} w={350} h={520} c={c} activa={activa === k || (unico > 0.5 && k === 1)} op={e1(t, M('tres') + k * 0.3) * op(k)}>
                {/* pegajoso: balde que se llena */}
                {k === 0 && t >= lim[0] && (
                  <g opacity={e1(t, lim[0])} transform="translate(0 20)">
                    <path d="M -80 -120 L -60 100 H 60 L 80 -120" fill="none" stroke="#64748b" strokeWidth={10} strokeLinejoin="round" />
                    <path d={`M -${60 + 20 * (1 - nivel) } ${100 - 220 * nivel} H ${60 + 20 * (1 - nivel)} L 60 100 H -60 Z`} fill={AZUL_M} opacity={0.85} />
                    {[0, 1, 2].map((q) => { const ph = (t * 0.7 + q / 3) % 1; return <g key={q} opacity={Math.sin(Math.PI * ph)}><Persona id={ID} x={-30 + q * 30} y={-130 + 100 * ph} s={0.22} cuerpo={['#0f766e', VIOLETA, '#ec4899'][q]} /></g>; })}
                    {t >= M('retencion') && <g opacity={e1(t, M('retencion'))}><Flecha x1={110} y1={20} x2={110} y2={-60} color={VERDE} grosor={11} /></g>}
                  </g>
                )}
                {/* viral: contagio de persona a persona */}
                {k === 1 && t >= lim[1] && (
                  <g opacity={e1(t, lim[1])} transform="translate(0 20)">
                    {[[0, -70], [-80, 20], [80, 20], [-120, 110], [-40, 110], [40, 110], [120, 110]].map(([px, py], q) => {
                      const nacer = lim[1] + 0.3 + q * 0.5;
                      return <g key={q} opacity={e1(t, nacer)}>{q > 0 && <path d={`M ${[0, -80, 80, -80, -80, 80, 80][q]} ${[-70, 20, 20, 20, 20, 20, 20][q] + 12} L ${px} ${py - 30}`} stroke={NARANJA} strokeWidth={5} strokeDasharray="6 8" />}<Persona id={ID} x={px} y={py + 30} s={0.28} cuerpo={q ? ['#334155', VIOLETA, '#0f766e', '#ec4899', '#f59e0b', '#2563eb'][q % 6] : NARANJA} /></g>;
                    })}
                    {t >= M('inconsc') && <g opacity={e1(t, M('inconsc'))}>{[0, 1].map((q) => <path key={q} d={`M ${-20 + q * 40} -130 q 10 -16 0 -32`} stroke={ROSA} strokeWidth={6} fill="none" strokeLinecap="round" />)}</g>}
                  </g>
                )}
                {/* remunerado: lo que gasta contra lo que cuesta conseguirlo */}
                {k === 2 && t >= lim[2] && (
                  <g opacity={e1(t, lim[2])} transform="translate(0 20)">
                    <Precio x={-70} y={-110} s={0.8} />
                    {Array.from({ length: 5 }, (_, q) => <g key={q} opacity={t >= M('vida') ? e1(t, M('vida') + q * 0.35) : 0.0}><Moneda x={-80 + q * 40} y={40 - q * 22} r={20} /></g>)}
                    <Persona id={ID} x={-90} y={150} s={0.4} cuerpo={VIOLETA} />
                    {t >= M('vida') && <Flecha x1={-40} y1={100} x2={110} y2={60} color={VERDE} grosor={9} u={ac(t, M('vida'), M('vida') + 2)} />}
                  </g>
                )}
              </Celda>
            ))}

            {/* el ajuste entre producto y mercado, y el motor que se agota */}
            {idon > 0.01 && (
              <g opacity={idon} transform="translate(600 170)"><circle r={50} fill={VERDE} /><path d="M -24 4 l 16 18 l 34 -40" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
            )}
            {agota > 0.01 && (
              <g opacity={agota} transform="translate(600 770)">
                <Engranaje x={-60} y={0} r={36} t={t * (1 - 0.9 * agota)} hueco={c.panel} color="#64748b" />
                <Engranaje x={40} y={0} r={36} t={-t * (1 - 0.9 * agota)} hueco={c.panel} color={VIOLETA} />
                <path d="M 120 -30 q 20 -20 0 -40 q -20 -20 0 -40" stroke={c.apagado} strokeWidth={8} fill="none" strokeLinecap="round" opacity={agota} />
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
