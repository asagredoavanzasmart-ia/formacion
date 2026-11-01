import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, Flecha, PanelPregunta, Rotulo, Telefono, W, H, borde, e1, lerp, marcador, ventana, AZUL_M, ROJO_M, ROJO_O, VERDE, VIOLETA } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «La técnica de los cinco porqués», escena propia. Acto A: una planta cuyas raíces bajan nivel a nivel
 * (cada porqué cava más) con barras de inversión proporcional. Acto B: el ejemplo del cliente que cancela,
 * como cadena de seis eslabones con una interrogación en cada unión: el servicio sin uso, quien no supo
 * empezar, el manual larguísimo, el que nadie revisó y la silla sin responsable. Acto C: el equipo
 * reunido, sin chivo expiatorio, con confianza, indulgencia y la verdad incómoda que sale a la luz.
 */

const ID = 'ls9';
const nombres = ['causa', 'raiz', 'prop', 'lotes', 'cancela', 'nousaba', 'nosupo', 'manual', 'revis', 'resp', 'chivo', 'confianza', 'indulg', 'verdades', 'pregunta'] as const;

export const PorquesLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('verdades') + 3 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Cinco porqués'], [M('causa'), 'La causa profunda'], [M('raiz'), 'Hasta la raíz'], [M('prop'), 'Inversión proporcional'], [M('lotes'), 'Con lotes pequeños'], [M('cancela'), 'Un cliente cancela'],
    [M('nousaba'), 'No usaba el servicio'], [M('nosupo'), 'No supo empezar'], [M('manual'), 'Un manual larguísimo'], [M('revis'), 'Nadie lo revisó'], [M('resp'), 'Nadie responsable'],
    [M('chivo'), 'Sin chivo expiatorio'], [M('confianza'), 'Confianza mutua'], [M('indulg'), 'Con indulgencia'], [M('verdades'), 'Verdades incómodas'],
  ];
  const aA = ventana(t, -1, M('cancela'));
  const aB = ventana(t, M('cancela'), M('chivo'));
  const aC = ac(t, M('chivo'), M('chivo') + 0.4);
  const raiz = ac(t, M('raiz') - 2, M('raiz') + 1);
  const ev = [M('cancela'), M('nousaba'), M('nosupo'), M('manual'), M('revis'), M('resp')];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los cinco porqués: de la apariencia a la raíz del problema">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · la planta y sus raíces */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <rect x={60} y={330} width={600} height={470} rx={18} fill="#a16207" opacity={0.18} />
                <rect x={60} y={326} width={600} height={10} rx={5} fill="#65a30d" />
                <g opacity={e1(t, 0.3)} transform="translate(360 330)"><path d="M 0 0 V -100" stroke="#16a34a" strokeWidth={10} strokeLinecap="round" /><path d="M 0 -60 Q -60 -90 -70 -150 Q -10 -130 0 -60 Z" fill="#22c55e" /><path d="M 0 -80 Q 60 -110 76 -170 Q 6 -150 0 -80 Z" fill="#16a34a" /></g>
                {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M 360 336 Q ${330 + (k % 2) * 60} ${400 + k * 60} ${360 + (k - 2) * 40} ${430 + k * 70}`} stroke="#92400e" strokeWidth={10 - k} fill="none" strokeLinecap="round" strokeDasharray="1 1" pathLength={1} strokeDashoffset={1 - raiz * (1 - 0.08 * k)} />)}
                {t >= M('prop') && [0, 1, 2, 3, 4].map((k) => <rect key={k} x={720} y={360 + k * 74} width={340 * (1 - 0.18 * k) * e1(t, M('prop') + k * 0.3)} height={46} rx={14} fill={[ROJO_M, NARANJA, '#f59e0b', '#84cc16', VERDE][k]} />)}
                {t >= M('lotes') && <g opacity={e1(t, M('lotes'))}>{[0, 1, 2].map((k) => <rect key={k} x={720 + k * 70} y={730} width={50} height={50} rx={8} fill={AZUL_M} />)}<path d="M 780 710 V 690" stroke={c.apagado} strokeWidth={0} /></g>}
              </g>
            )}

            {/* B · la cadena del cliente que cancela */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <path d="M 120 470 H 1080" stroke={c.apagado} strokeWidth={8} strokeDasharray="4 14" strokeLinecap="round" opacity={0.7} />
                {ev.map((te, k) => (
                  <g key={k} opacity={e1(t, te)} transform={`translate(${130 + k * 188} 470)`}>
                    <circle r={78} fill={c.panel} style={sombra(c.sombra, 6, 14)} /><circle r={78} fill="none" stroke={k === 5 ? ROJO_O : `url(#${ID}-marca)`} strokeWidth={8} />
                    {k === 0 && <g><Persona id={ID} x={0} y={36} s={0.36} cuerpo={VIOLETA} /><path d="M -34 -52 L 34 8 M 34 -52 L -34 8" stroke={ROJO_O} strokeWidth={9} strokeLinecap="round" /></g>}
                    {k === 1 && <g opacity={0.9}><Telefono x={0} y={0} s={0.42} widgets={4} /><rect x={-26} y={-44} width={52} height={88} rx={10} fill="#000" opacity={0.45} /></g>}
                    {k === 2 && <g><Persona id={ID} x={0} y={36} s={0.36} cuerpo="#0f766e" /><Txt x={30} y={-26} fontSize={56} fill={ROSA}>?</Txt></g>}
                    {k === 3 && <g>{Array.from({ length: 5 }, (_, q) => <rect key={q} x={-30 + q * 3} y={-44 + q * 3} width={56} height={74} rx={5} fill="#fff" stroke="#94a3b8" strokeWidth={2.5} />)}<path d="M -14 -22 H 24 M -14 -6 H 24 M -14 10 H 8" stroke="#94a3b8" strokeWidth={4} /></g>}
                    {k === 4 && <g><path d="M -40 0 Q 0 -44 40 0 Q 0 44 -40 0" fill="#fff" stroke="#64748b" strokeWidth={6} /><circle r={14} fill="#334155" /><path d="M -46 -40 L 46 40" stroke={ROJO_O} strokeWidth={9} strokeLinecap="round" /></g>}
                    {k === 5 && <g><rect x={-26} y={-6} width={52} height={14} rx={5} fill="none" stroke={ROJO_O} strokeWidth={5} strokeDasharray="8 8" /><rect x={-22} y={-44} width={44} height={42} rx={8} fill="none" stroke={ROJO_O} strokeWidth={5} strokeDasharray="8 8" /><rect x={-22} y={8} width={6} height={36} fill="none" stroke={ROJO_O} strokeWidth={5} /><rect x={16} y={8} width={6} height={36} fill="none" stroke={ROJO_O} strokeWidth={5} /></g>}
                    {k < 5 && <g opacity={e1(t, ev[k + 1] - 0.3)} transform="translate(94 -92)"><Txt x={0} y={0} textAnchor="middle" fontSize={44} fill={NARANJA}>?</Txt></g>}
                  </g>
                ))}
                {t >= M('resp') + 1.5 && <g opacity={e1(t, M('resp') + 1.5)}><Bombilla x={1000} y={260} s={0.8} id={ID} /><Flecha x1={1000} y1={340} x2={1000} y2={380} color={NARANJA} grosor={10} /></g>}
              </g>
            )}

            {/* C · el equipo, la confianza y la verdad incómoda */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <ellipse cx={420} cy={560} rx={290} ry={96} fill="#a16207" opacity={0.35} />
                {[0, 1, 2, 3, 4].map((k) => { const a = Math.PI + (k * Math.PI) / 4 + 0.2; return <g key={k} opacity={e1(t, M('chivo') + k * 0.15)}><Persona id={ID} x={420 + 300 * Math.cos(a)} y={560 + 120 * Math.sin(a) + 30} s={0.36} cuerpo={['#334155', VIOLETA, '#0f766e', '#ec4899', '#f59e0b'][k]} /></g>; })}
                {t >= M('chivo') && <g opacity={e1(t, M('chivo') + 0.3)} transform="translate(420 700)"><Persona id={ID} x={0} y={30} s={0.36} cuerpo="#94a3b8" /><path d="M -30 -50 L 30 10 M 30 -50 L -30 10" stroke={ROJO_O} strokeWidth={0} /></g>}
                {t >= M('confianza') && <g opacity={e1(t, M('confianza'))} transform="translate(860 330)"><path d="M 0 60 C -90 -10 -40 -90 0 -40 C 40 -90 90 -10 0 60 Z" fill={ROSA} /><path d="M -34 8 H -6 L 6 -8 L 18 24 L 30 8 H 40" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}
                {t >= M('indulg') && <g opacity={e1(t, M('indulg'))} transform="translate(860 540)"><circle r={54} fill={VERDE} /><path d="M -26 2 l 18 20 l 36 -42" stroke="#fff" strokeWidth={13} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}
                {t >= M('verdades') && <g opacity={e1(t, M('verdades'))} transform="translate(860 740)"><rect x={-90} y={-40} width={180} height={80} rx={12} fill="#78350f" /><path d="M -90 -40 L -20 -40 L -50 40 L -90 40 Z" fill="#fde047" opacity={0.85} /><path d="M -70 -40 L -34 40" stroke="#fde047" strokeWidth={6} /></g>}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
