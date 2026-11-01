import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Chip, Curva, Flecha, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana, AZUL_M, ROJO_M, ROJO_O, VERDE, VIOLETA } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «Medir: la contabilidad de la innovación», escena propia. Acto A: un tablero donde el producto mínimo
 * entrega datos; la curva pasa del «funcionamiento de base» al «régimen ideal» a fuerza de microajustes,
 * y un cambio que sube la activación se estampa como conocimiento validado; al final, la decisión
 * (cambiar o seguir). Acto B: las cifras ilusorias (un número grande y hueco) frente a las tres A. Acto C:
 * la tienda en línea con diez mil visitas, de las que solo unas pocas compran y regresan.
 */

const ID = 'ls5';
const nombres = ['real', 'cuant', 'regimen', 'micro', 'activ', 'valid', 'decision', 'ilus', 'total', 'tresA', 'accion', 'acces', 'audit', 'visitas', 'pregunta'] as const;

export const MedirLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('visitas') + 5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Medir el progreso'], [M('cuant'), 'Mirada cuantitativa'], [M('regimen'), 'Hacia el régimen ideal'], [M('micro'), 'Microajustes'], [M('activ'), 'Tasa de activación'], [M('valid'), 'Conocimiento validado'],
    [M('decision'), 'La decisión final'], [M('ilus'), 'Indicadores ilusorios'], [M('tresA'), 'Las tres A'], [M('accion'), 'Accionable'], [M('acces'), 'Accesible'], [M('audit'), 'Auditable'], [M('visitas'), 'Diez mil visitas'],
  ];
  const aA = ventana(t, -1, M('ilus'));
  const aB = ventana(t, M('ilus'), M('visitas'));
  const aC = ac(t, M('visitas'), M('visitas') + 0.4);
  const base = [0.15, 0.2, 0.3, 0.28, 0.4, 0.5, 0.62, 0.72, 0.8];
  const pts: [number, number][] = base.map((l, k) => [210 + k * 90, 560 - l * 340]);
  const u = ac(t, M('cuant'), M('regimen') + 5);
  const esc = (k: number) => e1(t, [M('accion'), M('acces'), M('audit')][k]);
  const barras = [100, 6, 3];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La contabilidad de la innovación: medir con indicadores accionables, accesibles y auditables">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · del funcionamiento de base al régimen ideal */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <rect x={110} y={170} width={880} height={480} rx={26} fill={c.panel} style={sombra(c.sombra, 8, 20)} />
                <rect x={170} y={600} width={780} height={6} rx={3} fill={c.apagado} />
                <rect x={170} y={220} width={6} height={384} rx={3} fill={c.apagado} />
                <rect x={170} y={330} width={780} height={110} rx={10} fill={VERDE} opacity={0.13 * e1(t, M('regimen'))} />
                <Curva pts={pts} u={u} color={`#2f7bf6`} grosor={11} />
                {t >= M('micro') && pts.slice(1, 8).map(([px, py], k) => <g key={k} opacity={e1(t, M('micro') + k * 0.3)}><circle cx={px} cy={py - 30} r={9} fill={NARANJA} /></g>)}
                {t >= M('activ') && <g opacity={e1(t, M('activ'))}><Persona id={ID} x={1040} y={620} s={0.55} cuerpo={VIOLETA} /><Flecha x1={1040} y1={480} x2={1040} y2={300} color={VERDE} grosor={14} u={ac(t, M('activ'), M('activ') + 1.5)} /></g>}
                {t >= M('valid') && <g opacity={e1(t, M('valid'))} transform={`translate(780 280) rotate(-8)`}><rect x={-120} y={-34} width={240} height={68} rx={14} fill="none" stroke={VERDE} strokeWidth={8} /><path d="M -90 0 l 18 20 l 36 -40" stroke={VERDE} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /><rect x={-24} y={-8} width={110} height={12} rx={6} fill={VERDE} /><rect x={-24} y={12} width={80} height={10} rx={5} fill={VERDE} opacity={0.6} /></g>}
                {t >= M('decision') && <g opacity={e1(t, M('decision'))} transform="translate(320 220)"><path d="M 0 0 V 30 M 0 30 Q -20 60 -60 70 M 0 30 Q 20 60 60 70" stroke={NARANJA} strokeWidth={10} fill="none" strokeLinecap="round" /><path d="M -74 56 L -50 84 L -86 84 Z" fill={NARANJA} /><path d="M 60 70 L 36 52 L 36 90 Z" fill={NARANJA} transform="translate(8 0)" /></g>}
              </g>
            )}

            {/* B · cifras ilusorias y las tres A */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <g opacity={e1(t, M('ilus'))} transform="translate(300 300)">
                  <circle r={130} fill={ROJO_M} opacity={0.15} /><circle r={130} fill="none" stroke={ROJO_O} strokeWidth={8} strokeDasharray="12 14" />
                  <Txt x={0} y={26} textAnchor="middle" fontSize={96} fill={ROJO_O} opacity={0.7}>?</Txt>
                  <g opacity={e1(t, M('total'))}><Persona id={ID} x={-50} y={120} s={0.3} cuerpo="#94a3b8" /><Persona id={ID} x={0} y={120} s={0.3} cuerpo="#a8b3c4" /><Persona id={ID} x={50} y={120} s={0.3} cuerpo="#8d99ac" /></g>
                </g>
                {t >= M('tresA') && (
                  <g opacity={e1(t, M('tresA'))}>
                    <g transform="translate(760 270)" opacity={esc(0)}><circle r={70} fill={AZUL_M} /><path d="M -34 0 H 22 M 4 -22 L 28 0 L 4 22" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
                    <g transform="translate(930 470)" opacity={esc(1)}><circle r={70} fill={VERDE} /><circle r={26} fill="#fff" /><circle r={11} fill={VERDE} /><path d="M -50 0 Q 0 -44 50 0 Q 0 44 -50 0" fill="none" stroke="#fff" strokeWidth={9} /></g>
                    <g transform="translate(700 600)" opacity={esc(2)}><circle r={70} fill={VIOLETA} /><path d="M -34 4 L -8 30 L 36 -22" stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
                  </g>
                )}
              </g>
            )}

            {/* C · las diez mil visitas */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <rect x={160} y={190} width={420} height={420} rx={26} fill={c.panel} style={sombra(c.sombra, 8, 20)} />
                {barras.map((b, k) => <rect key={k} x={210 + k * 120} y={560 - (k === 0 ? 300 : k === 1 ? 70 : 36) * ac(t, M('visitas') + 0.5 + k * 0.6, M('visitas') + 1.8 + k * 0.6)} width={80} height={(k === 0 ? 300 : k === 1 ? 70 : 36) * ac(t, M('visitas') + 0.5 + k * 0.6, M('visitas') + 1.8 + k * 0.6)} rx={10} fill={[ROJO_M, VERDE, AZUL_M][k]} />)}
                {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={e1(t, M('visitas') + 0.3 + k * 0.12)}><Persona id={ID} x={700 + (k % 4) * 90} y={300 + Math.floor(k / 4) * 140} s={0.32} cuerpo={k === 3 || k === 8 ? VERDE : c.apagado} /></g>)}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
