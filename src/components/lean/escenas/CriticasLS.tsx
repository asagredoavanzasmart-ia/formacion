import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Celda, Edificio, Flecha, Moneda, PanelPregunta, Rotulo, Telefono, Tienda, W, H, borde, e1, marcador, AZUL_M, ROJO_M, ROJO_O, VERDE, VIOLETA } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «Críticas y límites», escena propia. Seis celdas, una por crítica: el trabajo que se intensifica y agota,
 * el corto plazo que ahuyenta a los inversores, el corazón que se enfría, la rueda de ensayos que no avanza,
 * el producto roto frente a uno cuidado (Google, Facebook, Apple) y la pequeña empresa que cabe frente a la
 * grande que no.
 */

const ID = 'ls12';
const nombres = ['unanim', 'intens', 'bienestar', 'corto', 'cambio', 'inversores', 'humano', 'frio', 'ensayo', 'rotos', 'google', 'apple', 'pequenas', 'pregunta'] as const;
const POS: [number, number][] = [[220, 310], [600, 310], [980, 310], [220, 640], [600, 640], [980, 640]];

export const CriticasLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('pequenas') + 4 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'No hay unanimidad'], [M('intens'), 'Trabajo intensificado'], [M('bienestar'), 'Bienestar de las personas'], [M('corto'), 'Corto plazo'], [M('cambio'), 'Cambiar al primer tropiezo'], [M('inversores'), 'Sin inversores'],
    [M('humano'), 'El aspecto humano'], [M('frio'), 'Razonamiento frío'], [M('ensayo'), 'Un ensayo tras otro'], [M('rotos'), 'Productos incompletos'], [M('google'), 'Google y Facebook'], [M('apple'), 'Apple'], [M('pequenas'), 'Solo pequeñas empresas'],
  ];
  const lim = [M('intens'), M('corto'), M('humano'), M('ensayo'), M('rotos'), M('pequenas'), M('pregunta')];
  const activa = lim.findIndex((_, k) => k < 6 && t >= lim[k] && t < lim[k + 1]);
  const osc = Math.sin(t * 3);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Las críticas al método Lean Startup">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {POS.map(([x, y], k) => {
              const a = activa === k;
              const t0 = lim[k];
              return (
                <Celda key={k} x={x} y={y} w={350} h={290} c={c} activa={a} op={e1(t, M('unanim') + k * 0.25) * (activa < 0 || a ? 1 : 0.55)}>
                  {/* 0 · el trabajo intensificado */}
                  {k === 0 && t >= t0 && (
                    <g transform="translate(0 30)" opacity={e1(t, t0)}>
                      <Persona id={ID} x={-60} y={56} s={0.56} cuerpo="#334155" />
                      <path d={`M -80 -86 q 6 14 0 22 M -42 -92 q 6 14 0 22`} stroke="#60a5fa" strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.4 + 0.6 * Math.abs(osc)} />
                      <g transform="translate(70 -10)"><circle r={44} fill="#fff" stroke={ROJO_O} strokeWidth={9} /><path d="M 0 -26 V 0 L 20 12" stroke="#334155" strokeWidth={7} strokeLinecap="round" fill="none" /></g>
                      {t >= M('bienestar') && <g opacity={e1(t, M('bienestar'))} transform="translate(60 70)"><path d="M 0 30 C -50 -4 -24 -50 0 -22 C 24 -50 50 -4 0 30 Z" fill={ROSA} opacity={0.5} /><path d="M -50 -8 L 50 48" stroke={ROJO_O} strokeWidth={6} strokeLinecap="round" /></g>}
                    </g>
                  )}
                  {/* 1 · el corto plazo y los inversores que se van */}
                  {k === 1 && t >= t0 && (
                    <g transform="translate(0 30)" opacity={e1(t, t0)}>
                      <path d="M -110 60 H 40" stroke={c.apagado} strokeWidth={9} strokeLinecap="round" /><path d="M 40 40 L 70 60 L 40 80" stroke={c.apagado} strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.0} />
                      {t >= M('cambio') && <g opacity={e1(t, M('cambio'))}><path d="M -110 -20 L -50 -20 L -50 40 L 0 40 L 0 -30 L 60 -30" fill="none" stroke={NARANJA} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" /></g>}
                      {t >= M('inversores') && [0, 1].map((q) => <g key={q} opacity={e1(t, M('inversores') + q * 0.3)} transform={`translate(${60 + 40 * ac(t, M('inversores') + 0.6, M('inversores') + 3) + q * 18} ${40 + q * 26})`}><Persona id={ID} x={0} y={30} s={0.3} cuerpo="#1f2937" corbata /><Moneda x={20} y={-40} r={14} /></g>)}
                    </g>
                  )}
                  {/* 2 · el corazón que se enfría */}
                  {k === 2 && t >= t0 && (
                    <g transform="translate(0 20)" opacity={e1(t, t0)}>
                      <path d="M 0 70 C -90 0 -50 -90 0 -40 C 50 -90 90 0 0 70 Z" fill={t >= M('frio') ? '#7dd3fc' : ROSA} />
                      {t >= M('frio') && [[-40, -30], [20, -50], [40, 10], [-10, 20]].map(([px, py], q) => <path key={q} d={`M ${px - 10} ${py} h 20 M ${px} ${py - 10} v 20 M ${px - 7} ${py - 7} l 14 14 M ${px + 7} ${py - 7} l -14 14`} stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={e1(t, M('frio') + q * 0.2)} />)}
                    </g>
                  )}
                  {/* 3 · la rueda de ensayos */}
                  {k === 3 && t >= t0 && (
                    <g transform="translate(0 20)" opacity={e1(t, t0)}>
                      <circle r={70} fill="none" stroke={c.apagado} strokeWidth={10} />
                      {[0, 1, 2, 3].map((q) => { const a = (q * Math.PI) / 2 + t * 1.6; return <g key={q} transform={`translate(${70 * Math.cos(a)} ${70 * Math.sin(a)})`}><path d="M -9 -22 H 9 V -8 L 22 14 Q 25 22 14 22 H -14 Q -25 22 -22 14 L -9 -8 Z" fill={[AZUL_M, VERDE, NARANJA, VIOLETA][q]} /></g>; })}
                      <Persona id={ID} x={0} y={36} s={0.3} cuerpo="#94a3b8" />
                    </g>
                  )}
                  {/* 4 · el producto roto y los productos cuidados */}
                  {k === 4 && t >= t0 && (
                    <g transform="translate(0 20)" opacity={e1(t, t0)}>
                      <Telefono x={-70} y={0} s={0.55} widgets={1} grieta />
                      {t >= M('google') && <g opacity={e1(t, M('google'))}><Telefono x={30} y={0} s={0.55} widgets={6} /></g>}
                      {t >= M('apple') && <g opacity={e1(t, M('apple'))}><Telefono x={110} y={0} s={0.55} widgets={4} /></g>}
                    </g>
                  )}
                  {/* 5 · la pequeña empresa frente a la grande */}
                  {k === 5 && t >= t0 && (
                    <g transform="translate(0 40)" opacity={e1(t, t0)}>
                      <Tienda x={-70} y={40} w={110} color="#0f766e" />
                      <Edificio x={80} y={40} w={96} h={190} color="#334155" />
                      <path d="M 28 -150 L 132 40 M 132 -150 L 28 40" stroke={ROJO_O} strokeWidth={9} strokeLinecap="round" opacity={0.7} />
                    </g>
                  )}
                </Celda>
              );
            })}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
