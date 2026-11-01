import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, Chip, Edificio, Engranaje, Etiqueta, Flecha, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana, AZUL_M, ROJO_M, ROJO_O, VERDE, VIOLETA, Mar, Barco } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «De Toyota a las empresas emergentes», escena propia. Acto A: una línea de montaje de 1972 donde el
 * despilfarro (muda) cae a un contenedor, el producto engordado se vuelve «magro» y aparecen las siete
 * fuentes del desperdicio entre bolsas de un consumo en auge. Acto B: el método cruza el Pacífico en un
 * barco hasta los libros y las gestiones lean. Acto C: Ries lo aplica a la innovación y se pregunta cómo
 * asegurarse de que habrá clientes; Steve Blank le indica que salga a hablar con ellos.
 */

const ID = 'ls2';
const nombres = ['y1972', 'signif', 'disminuir', 'siete', 'auge', 'pacifico', 'thinking', 'gestion', 'software', 'aplicar', 'blog', 'comoase', 'blank', 'clientela', 'pregunta'] as const;

export const ToyotaLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('clientela') + 3 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Toyota, 1972'], [M('signif'), 'Lean: magro'], [M('disminuir'), 'Menos pérdidas'], [M('siete'), 'Siete fuentes de despilfarro'], [M('auge'), 'Auge del consumo'], [M('pacifico'), 'Cruza el Pacífico'],
    [M('thinking'), 'Lean Thinking'], [M('gestion'), 'Gestión lean'], [M('software'), 'Lean software'], [M('aplicar'), 'A la innovación'], [M('blog'), 'Un blog, 2008'], [M('comoase'), 'La pregunta de Ries'],
    [M('blank'), 'Steve Blank'], [M('clientela'), 'Conocer al cliente'],
  ];
  const aA = ventana(t, -1, M('pacifico'));
  const aB = ventana(t, M('pacifico'), M('aplicar'));
  const aC = ac(t, M('aplicar'), M('aplicar') + 0.4);
  const mag = ac(t, M('signif'), M('signif') + 2);
  const cin = ((t * 120) % 80);
  const sieteN = Math.min(7, Math.max(0, Math.floor((t - M('siete')) / 0.5) + 1));
  const bolsas = ac(t, M('auge'), M('auge') + 2.5);
  const nav = ac(t, M('pacifico'), M('pacifico') + 8);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="De la fábrica de Toyota a las empresas emergentes">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · la línea de montaje y el despilfarro */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <rect x={80} y={480} width={720} height={22} rx={11} fill="#475569" />
                {Array.from({ length: 10 }, (_, k) => <rect key={k} x={80 + ((k * 80 + cin) % 720)} y={486} width={30} height={10} rx={5} fill="#94a3b8" />)}
                {[0, 1, 2].map((k) => {
                  const x = 120 + k * 240 + ((t * 30) % 60);
                  const f = 1 + 0.5 * (1 - mag);
                  return <g key={k} opacity={e1(t, 0.3 + k * 0.3)} transform={`translate(${x} 480) scale(${f} ${1 + 0.35 * (1 - mag)})`}><path d="M -50 0 L -50 -26 Q -50 -34 -40 -36 L -24 -54 H 24 L 42 -36 Q 52 -34 52 -24 V 0 Z" fill={k === 1 ? ROJO_M : '#2f7bf6'} /><circle cx={-28} cy={2} r={12} fill="#1f2937" /><circle cx={28} cy={2} r={12} fill="#1f2937" /></g>;
                })}
                <Chip x={400} y={290} texto="1972" c={c} id={ID} op={e1(t, M('y1972'))} marca />
                {/* el despilfarro cae al contenedor */}
                <g opacity={e1(t, M('disminuir'))}>
                  {[0, 1, 2, 3].map((k) => {
                    const ph = (t * 0.7 + k / 4) % 1;
                    return <rect key={k} x={870 + (k % 2) * 30 - 20 * (1 - mag)} y={300 + 230 * ph} width={26} height={26} rx={6} fill={ROJO_M} opacity={1 - ph} />;
                  })}
                  <path d="M 850 540 H 980 L 970 640 H 860 Z" fill="#64748b" /><rect x={840} y={526} width={150} height={16} rx={8} fill="#94a3b8" />
                </g>
                {/* las siete fuentes */}
                {Array.from({ length: sieteN }, (_, k) => <g key={k} opacity={e1(t, M('siete') + k * 0.5)}><circle cx={150 + k * 100} cy={640} r={26} fill={ROJO_M} /><path d="M -10 -8 L 10 12 M 10 -8 L -10 12" stroke="#fff" strokeWidth={6} strokeLinecap="round" transform={`translate(${150 + k * 100} 640)`} /></g>)}
                {/* el auge del consumo: bolsas que se apilan */}
                {t >= M('auge') && [0, 1, 2, 3, 4].map((k) => <g key={k} opacity={ac(t, M('auge') + k * 0.4, M('auge') + 0.8 + k * 0.4)} transform={`translate(${900 + (k % 3) * 60} ${430 - Math.floor(k / 3) * 70 - 40 * (1 - bolsas)})`}><path d="M -26 -30 H 26 L 32 40 H -32 Z" fill={['#f59e0b', ROSA, AZUL_M, VERDE, VIOLETA][k]} /><path d="M -12 -30 Q 0 -54 12 -30" stroke="#475569" strokeWidth={5} fill="none" /></g>)}
              </g>
            )}

            {/* B · el método cruza el Pacífico */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Mar x={60} y={560} w={1080} h={260} t={t} color={AZUL_M} oscuro="#1d4fbf" />
                <Edificio x={150} y={560} w={110} h={130} color="#475569" />
                <rect x={118} y={400} width={22} height={40} fill="#64748b" />
                <Barco x={lerp(250, 950, nav)} y={640 + 5 * Math.sin(t * 2)} s={0.9} casco="#7c2d12" vela="#ffffff" rot={Math.sin(t * 1.4) * 3} />
                {t >= M('thinking') && <g opacity={e1(t, M('thinking'))} transform="translate(1030 480)"><rect x={-44} y={-60} width={88} height={120} rx={10} fill={`url(#${ID}-marca)`} /><rect x={-44} y={-60} width={16} height={120} rx={8} fill="#000" opacity={0.2} /><path d="M -14 -26 H 28 M -14 -8 H 28 M -14 10 H 18" stroke="#fff" strokeWidth={6} strokeLinecap="round" /></g>}
                {t >= M('gestion') && <g opacity={e1(t, M('gestion'))}><Edificio x={700} y={410} w={110} h={170} color="#334155" />{[0, 1].map((k) => <Persona key={k} id={ID} x={640 + k * 110} y={440} s={0.28} cuerpo={[VIOLETA, '#0f766e'][k]} />)}</g>}
                {t >= M('software') && <g opacity={e1(t, M('software'))} transform="translate(420 300)"><rect x={-120} y={-70} width={240} height={150} rx={16} fill="#1f2937" /><rect x={-120} y={-70} width={240} height={26} rx={16} fill="#334155" />{[-30, -6, 18, 42].map((yy, k) => <rect key={yy} x={-100 + (k % 2) * 24} y={yy} width={90 + 20 * k} height={10} rx={5} fill={['#fde047', '#86efac', '#93c5fd', '#fda4af'][k]} />)}</g>}
              </g>
            )}

            {/* C · Ries, la pregunta y los clientes */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <Persona id={ID} x={260} y={700} s={0.8} cuerpo="#334155" corbata />
                <g opacity={e1(t, M('aplicar'))}><Engranaje x={160} y={330} r={46} t={t} hueco={isDark ? '#242424' : '#fff'} /><Flecha x1={230} y1={330} x2={360} y2={330} color={NARANJA} grosor={12} /><Bombilla x={470} y={330} s={0.9} id={ID} /></g>
                <g opacity={e1(t, M('blog'))} transform="translate(260 480)"><rect x={-80} y={-50} width={160} height={100} rx={12} fill="#1f2937" /><rect x={-70} y={-40} width={140} height={80} rx={6} fill={AZUL_M} /><rect x={-50} y={-24} width={90} height={10} rx={5} fill="#fff" /><rect x={-50} y={-4} width={60} height={8} rx={4} fill="#bfdbfe" /></g>
                <g opacity={e1(t, M('comoase'))}><rect x={560} y={250} width={150} height={110} rx={14} fill="#e5e7eb" /><Txt x={635} y={335} textAnchor="middle" fontSize={96} fill={ROSA}>?</Txt></g>
                <g opacity={e1(t, M('blank'))}><Persona id={ID} x={880} y={700} s={0.8} cuerpo="#0f766e" /><rect x={940} y={560} width={70} height={90} rx={8} fill="#fff" transform="rotate(8 975 605)" /><path d="M 952 585 H 998 M 952 605 H 998 M 952 625 H 980" stroke="#94a3b8" strokeWidth={5} /></g>
                {t >= M('clientela') && [0, 1, 2, 3].map((k) => <g key={k} opacity={e1(t, M('clientela') + k * 0.35)}><Persona id={ID} x={600 + k * 70} y={560 + (k % 2) * 30} s={0.34} cuerpo={['#ec4899', '#f59e0b', '#2563eb', '#10b981'][k]} /></g>)}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
