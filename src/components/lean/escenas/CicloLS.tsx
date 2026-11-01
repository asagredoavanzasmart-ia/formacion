import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, Bucle, Calendario, Chip, Edificio, Etiqueta, Flecha, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana, AZUL_M, ROJO_M, VERDE, VIOLETA } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «La incertidumbre y el ciclo de feedback», escena propia. Acto A: un cohete entre la niebla de lo
 * incierto, quien duda y las ideas que se renuevan. Acto B: los tres rasgos del método (reloj, clientes,
 * ciencia) y el bucle crear, medir, aprender que se acorta; avanzar a empujones es subir una escalera por
 * peldaños pequeños con un grupo reducido. Acto C: el ejemplo de los menús saludables en dos oficinas.
 */

const ID = 'ls3';
const nombres = ['joven', 'cuestion', 'innov', 'rasgos', 'ciclo', 'cma', 'reducir', 'empujones', 'grupo', 'ejemplo', 'menus', 'cinco', 'dossem', 'pregunta'] as const;

export const CicloLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('dossem') + 3 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Una empresa emergente'], [M('cuestion'), 'Cuestionarse siempre'], [M('innov'), 'Innovar sin parar'], [M('rasgos'), 'Tres rasgos'], [M('ciclo'), 'Ciclo de feedback'], [M('reducir'), 'Un ciclo más corto'],
    [M('empujones'), 'A empujones'], [M('grupo'), 'Un grupo reducido'], [M('ejemplo'), 'Ejemplo imaginario'], [M('menus'), 'Menús saludables'], [M('dossem'), 'Dos semanas'],
  ];
  const aA = ventana(t, -1, M('rasgos'));
  const aB = ventana(t, M('rasgos'), M('ejemplo'));
  const aC = ac(t, M('ejemplo'), M('ejemplo') + 0.4);
  const radio = lerp(230, 130, ac(t, M('reducir'), M('reducir') + 2));
  const vel = lerp(0.18, 0.5, ac(t, M('reducir'), M('reducir') + 2));
  const act = t < M('cma') ? -1 : Math.floor(((t - M('cma')) * 0.7) % 3);
  const bu = t > M('cma') ? (t - M('cma')) * vel : t * 0.12;
  const peldanos = Math.min(5, Math.max(0, Math.floor((t - M('empujones')) / 0.8) + 1));
  const nSel = Math.min(5, Math.max(0, Math.floor((t - M('grupo')) / 0.35) + 1));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="El ciclo de feedback: crear, medir y aprender">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · el cohete en la niebla */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {[0, 1, 2].map((k) => <ellipse key={k} cx={300 + k * 300 + 40 * Math.sin(t * 0.6 + k)} cy={560 + k * 30} rx={250} ry={60} fill="#e5e7eb" opacity={0.8} />)}
                <g transform={`translate(600 ${380 - 14 * Math.sin(t * 2)}) rotate(14)`} opacity={e1(t, 0.3)}>
                  <path d="M 0 -110 Q 50 -50 40 40 H -40 Q -50 -50 0 -110 Z" fill="#f8fafc" /><circle cy={-30} r={20} fill={AZUL_M} /><path d="M -40 40 L -76 76 L -40 70 Z" fill={ROSA} /><path d="M 40 40 L 76 76 L 40 70 Z" fill={ROSA} />
                  <path d="M -22 44 Q 0 120 22 44 Z" fill="#fde047" opacity={0.85 + 0.15 * Math.sin(t * 20)} />
                </g>
                {[0, 1, 2].map((k) => <Txt key={k} x={260 + k * 340} y={300 + (k % 2) * 90} textAnchor="middle" fontSize={64} fill={ROSA} opacity={e1(t, M('joven') + k * 0.4) * 0.8}>?</Txt>)}
                <g opacity={e1(t, M('cuestion'))}><Persona id={ID} x={180} y={760} s={0.6} cuerpo="#334155" corbata /><Txt x={180} y={620} textAnchor="middle" fontSize={56} fill={ROSA}>?</Txt></g>
                {[0, 1, 2].map((k) => <Bombilla key={k} x={720 + k * 150} y={720 - (k % 2) * 40} s={0.6} op={e1(t, M('innov') + k * 0.5)} id={ID} />)}
              </g>
            )}

            {/* B · tres rasgos, el bucle y los empujones */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {t < M('ciclo') && (
                  <g opacity={e1(t, M('rasgos'))}>
                    <g transform="translate(260 450)"><circle r={80} fill="#fff" /><circle r={80} fill="none" stroke={NARANJA} strokeWidth={12} /><path d="M 0 -52 V 0 L 32 22" stroke="#334155" strokeWidth={10} strokeLinecap="round" fill="none" /></g>
                    <g transform="translate(600 450)"><Persona id={ID} x={-34} y={50} s={0.5} cuerpo={VIOLETA} /><path d="M 34 -6 C 6 -44 40 -66 52 -40 C 64 -66 98 -44 70 -6 L 52 16 Z" fill={ROSA} /></g>
                    <g transform="translate(940 450)"><path d="M -22 -70 H 22 V -22 L 56 50 Q 62 70 40 70 H -40 Q -62 70 -56 50 L -22 -22 Z" fill="#bae6fd" /><path d="M -46 24 H 46 L 56 50 Q 62 70 40 70 H -40 Q -62 70 -56 50 Z" fill={NARANJA} /></g>
                  </g>
                )}
                {t >= M('ciclo') && t < M('empujones') && (
                  <g opacity={e1(t, M('ciclo'))}>
                    <Bucle cx={600} cy={470} r={radio} u={bu % 1} activo={act} id={ID} rotulos />
                    {t >= M('reducir') && [0, 1, 2].map((k) => { const ph = (t * 0.8 + k / 3) % 1; return <g key={k} opacity={Math.sin(Math.PI * ph) * 0.9} transform={`translate(${920 + 60 * ph} ${300 + 300 * ph})`}><circle r={16} fill="#f59e0b" /><rect x={-4} y={-8} width={8} height={16} rx={3} fill="#fde047" /></g>; })}
                  </g>
                )}
                {t >= M('empujones') && (
                  <g opacity={e1(t, M('empujones'))}>
                    {Array.from({ length: peldanos }, (_, k) => <rect key={k} x={140 + k * 120} y={640 - k * 62} width={120} height={160 + k * 62} rx={10} fill={`url(#${ID}-marca)`} opacity={0.35 + 0.13 * k} />)}
                    <Persona id={ID} x={200 + (Math.max(1, peldanos) - 1) * 120} y={640 - (Math.max(1, peldanos) - 1) * 62} s={0.5} cuerpo="#334155" corbata />
                    {t >= M('grupo') && Array.from({ length: 10 }, (_, k) => <g key={k} opacity={e1(t, M('grupo'))}><Persona id={ID} x={760 + (k % 5) * 70} y={400 + Math.floor(k / 5) * 130} s={0.32} cuerpo={k < nSel ? NARANJA : c.apagado} /></g>)}
                  </g>
                )}
              </g>
            )}

            {/* C · los menús saludables en dos oficinas */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {[0, 1].map((k) => <g key={k} opacity={e1(t, M('menus') - 0.5 + k * 0.4)}><Edificio x={260 + k * 380} y={520} w={160} h={220} color="#334155" /></g>)}
                {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={e1(t, M('menus') + k * 0.25)} transform={`translate(${190 + k * 120} 700)`}><ellipse rx={50} ry={16} fill="#e5e7eb" /><ellipse rx={32} ry={10} fill="#fff" /><circle cx={-10} cy={-4} r={9} fill={VERDE} /><circle cx={10} cy={-2} r={8} fill={NARANJA} /></g>)}
                <g opacity={e1(t, M('dossem'))} transform="translate(980 470)"><Calendario x={0} y={0} s={1.15} marcados={Math.round(14 * ac(t, M('dossem'), M('dossem') + 3))} /></g>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
