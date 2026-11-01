import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Edificio, Flecha, PanelPregunta, Rotulo, Telefono, W, H, borde, e1, lerp, marcador, ventana, AZUL_M, ROJO_M, ROJO_O, VERDE, VIOLETA, Bombilla } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «Crear: el producto mínimo viable», escena propia. Acto A: el teléfono completo, lleno de funciones, se
 * reduce a uno mínimo que enfrenta a un cliente con la hipótesis; aunque esté roto, entrega datos; las malas
 * noticias son un escalón para aprender. Acto B: los gráficos de IMVU ante los inversores: barras tan bajas
 * que preguntan si son miles; son unidades, y luego crecen. Acto C: la aplicación de canchas de pádel que
 * empieza con un formulario y diez clubes.
 */

const ID = 'ls4';
const nombres = ['pmv', 'menor', 'enfrentar', 'hipo', 'baja', 'malas', 'fracaso', 'imvu', 'capital', 'unidades', 'crecer', 'padel', 'form', 'pregunta'] as const;

export const PmvLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('form') + 4 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Producto mínimo viable'], [M('menor'), 'Menor esfuerzo'], [M('enfrentar'), 'Frente al cliente'], [M('hipo'), 'Una hipótesis'], [M('baja'), 'Aunque sea imperfecto'], [M('malas'), 'Malas noticias'],
    [M('fracaso'), 'Aprender del fracaso'], [M('imvu'), 'IMVU'], [M('capital'), 'Ante los inversores'], [M('unidades'), 'Son unidades'], [M('crecer'), 'Ajustar y crecer'], [M('padel'), 'Canchas de pádel'],
    [M('form'), 'Empezar a mano'],
  ];
  const aA = ventana(t, -1, M('imvu'));
  const aB = ventana(t, M('imvu'), M('padel'));
  const aC = ac(t, M('padel'), M('padel') + 0.4);
  const reduce = ac(t, M('menor'), M('menor') + 1.4);
  const crece = ac(t, M('crecer'), M('crecer') + 2.5);
  const barra = (k: number) => lerp([8, 12, 10, 14][k], [30, 70, 130, 200][k], crece);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="El producto mínimo viable">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · del producto completo al mínimo */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <Telefono x={230} y={460} s={1.5} widgets={6} op={e1(t, 0.3) * (1 - 0.7 * reduce)} />
                <Flecha x1={340} y1={460} x2={440} y2={460} u={reduce} color={NARANJA} grosor={12} />
                <g opacity={reduce}><Telefono x={600} y={460} s={1.5} widgets={1} grieta={t >= M('baja')} /></g>
                {t >= M('menor') && <g opacity={e1(t, M('menor') + 0.5)} transform="translate(600 250)"><circle r={42} fill="#fff" /><circle r={42} fill="none" stroke={NARANJA} strokeWidth={10} /><path d="M 0 -26 V 0 L 20 12" stroke="#334155" strokeWidth={7} strokeLinecap="round" fill="none" /><path d="M -14 -52 H 14" stroke={NARANJA} strokeWidth={10} strokeLinecap="round" /></g>}
                <g opacity={e1(t, M('enfrentar'))}>
                  <Persona id={ID} x={980} y={660} s={0.8} cuerpo={VIOLETA} />
                  <Flecha x1={900} y1={560} x2={750} y2={480} color={NARANJA} grosor={10} u={ac(t, M('enfrentar'), M('enfrentar') + 1)} />
                </g>
                {t >= M('hipo') && <g opacity={e1(t, M('hipo'))} transform="translate(960 300)"><rect x={-5} y={-60} width={10} height={130} rx={5} fill="#64748b" /><path d="M 5 -60 H 90 L 66 -32 L 90 -4 H 5 Z" fill={ROSA} /><Txt x={50} y={-30} textAnchor="middle" fontSize={40} fill="#fff">?</Txt></g>}
                {t >= M('malas') && <g opacity={e1(t, M('malas'))} transform="translate(860 520)"><Burbuja x={0} y={0} w={170} texto="No sirve" u={ac(t, M('malas'), M('malas') + 1)} c={c} id={ID} lado="der" /></g>}
                {t >= M('fracaso') && (
                  <g opacity={e1(t, M('fracaso'))}>
                    {[0, 1, 2].map((k) => <rect key={k} x={120 + k * 100} y={700 - k * 40} width={100} height={110 + k * 40} rx={10} fill={`url(#${ID}-marca)`} opacity={0.4 + 0.2 * k} />)}
                    <Bombilla x={420} y={620} s={0.7} id={ID} />
                  </g>
                )}
              </g>
            )}

            {/* B · los gráficos de IMVU */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <rect x={120} y={200} width={620} height={440} rx={26} fill={c.panel} style={sombra(c.sombra, 8, 20)} />
                <rect x={190} y={590} width={500} height={6} rx={3} fill={c.apagado} />
                {[0, 1, 2, 3].map((k) => <rect key={k} x={230 + k * 115} y={590 - barra(k)} width={70} height={barra(k)} rx={10} fill={k === 3 ? `url(#${ID}-marca)` : '#2f7bf6'} />)}
                {t >= M('capital') && [0, 1].map((k) => <g key={k} opacity={e1(t, M('capital') + k * 0.4)}><Persona id={ID} x={860 + k * 110} y={660} s={0.62} cuerpo="#1f2937" corbata /><rect x={840 + k * 110} y={500} width={46} height={46} rx={8} fill="#fde047" opacity={0.0} /></g>)}
                {t >= M('capital') && <g opacity={e1(t, M('capital') + 0.6)}><Burbuja x={880} y={470} w={250} texto="¿Miles?" u={ac(t, M('capital') + 0.6, M('capital') + 1.6)} c={c} id={ID} lado="izq" /></g>}
                {t >= M('unidades') && <g opacity={e1(t, M('unidades'))}><Chip x={430} y={250} texto="unidades" c={c} id={ID} op={1} marca /></g>}
              </g>
            )}

            {/* C · canchas de pádel */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <g opacity={e1(t, M('padel'))} transform="translate(200 330)">
                  <circle r={60} fill="#fde047" /><circle r={60} fill="none" stroke="#a16207" strokeWidth={10} /><path d="M -26 -26 L 26 26 M 26 -26 L -26 26 M 0 -42 V 42 M -42 0 H 42" stroke="#a16207" strokeWidth={4} /><rect x={-9} y={56} width={18} height={70} rx={9} fill="#a16207" />
                  <circle cx={100} cy={-30} r={22} fill={VERDE} />
                </g>
                <g opacity={e1(t, M('form'))}>
                  <rect x={380} y={230} width={240} height={300} rx={22} fill="#fff" style={sombra(c.sombra, 6, 14)} />
                  {[0, 1, 2].map((k) => <rect key={k} x={410} y={270 + k * 70} width={180} height={40} rx={10} fill="#e5e7eb" />)}
                  <rect x={410} y={470} width={180} height={40} rx={20} fill={`url(#${ID}-marcaH)`} />
                </g>
                {Array.from({ length: 10 }, (_, k) => <g key={k} opacity={e1(t, M('form') + 0.6 + k * 0.15)}><Edificio x={720 + (k % 5) * 80} y={380 + Math.floor(k / 5) * 140} w={52} h={64} color="#475569" /></g>)}
                <g opacity={e1(t, M('form') + 1.5)}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${760 + k * 110} 660)`}><rect x={-44} y={-30} width={88} height={52} rx={16} fill={['#bbf7d0', '#bfdbfe', '#fbcfe8'][k]} /><path d="M -10 22 L -20 40 L 6 22 Z" fill={['#bbf7d0', '#bfdbfe', '#fbcfe8'][k]} /></g>)}</g>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
