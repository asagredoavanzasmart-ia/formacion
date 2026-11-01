import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, Chip, Flecha, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana, AZUL_M, ROJO_M, ROJO_O, VERDE, VIOLETA, Curva } from './comunLS';
import type { PropsCE } from './comunLS';

/**
 * «Aprender: perseverar o pivotar», escena propia. Un camino que llega a una bifurcación: seguir de frente
 * contra un muro (el callejón sin salida, la empresa estancada, con el reloj de los experimentos que
 * rinden menos) o girar hacia un camino abierto. Cuenta cuántos giros caben en el depósito de pivotes,
 * por qué se tarda en girar (niebla de cifras ilusorias, miedo) y las dos señales de que es la hora.
 */

const ID = 'ls6';
const nombres = ['pivote', 'estancada', 'callejon', 'numero', 'ocasion', 'tardan', 'miedo', 'duro', 'factores', 'decrec', 'productivo', 'valor', 'pregunta'] as const;

export const PivotarLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('valor') + 3 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Perseverar o pivotar'], [M('pivote'), 'El pivote'], [M('estancada'), 'Empresa estancada'], [M('callejon'), 'Callejón sin salida'], [M('numero'), 'Cuántos pivotes quedan'], [M('ocasion'), 'Una nueva ocasión'],
    [M('tardan'), 'Por qué se tarda'], [M('miedo'), 'Miedo al fracaso'], [M('duro'), 'Duro para quien creó'], [M('factores'), 'Dos señales'], [M('decrec'), 'Experimentos que rinden menos'], [M('productivo'), 'Desarrollo poco productivo'],
    [M('valor'), '¿Aún crea valor?'],
  ];
  const giro = ac(t, M('ocasion'), M('ocasion') + 2);
  const aA = ventana(t, -1, M('tardan'));
  const aB = ventana(t, M('tardan'), M('factores'));
  const aC = ac(t, M('factores'), M('factores') + 0.4);
  const fichas = Math.max(0, 4 - Math.floor(giro * 1.01 * 1));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Perseverar o pivotar: un camino que se bifurca">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · el camino, el muro y el giro */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <path d="M 90 640 H 520" stroke={c.apagado} strokeWidth={90} strokeLinecap="round" opacity={e1(t, 0.3)} />
                <path d="M 90 640 H 520" stroke="#fff" strokeWidth={6} strokeDasharray="26 24" opacity={0.7 * e1(t, 0.3)} />
                <path d="M 520 640 H 900" stroke={c.apagado} strokeWidth={90} strokeLinecap="round" opacity={0.35 + 0.65 * (1 - giro)} />
                <g opacity={e1(t, M('callejon'))}>
                  {[0, 1, 2].map((r) => Array.from({ length: 2 }, (_, k) => <rect key={`${r}${k}`} x={880 + k * 44 + (r % 2) * 20} y={560 + r * 30} width={42} height={28} rx={4} fill={r % 2 ? ROJO_O : ROJO_M} />))}
                </g>
                <path d="M 520 640 Q 640 640 700 540 T 900 400" stroke={VERDE} strokeWidth={90} strokeLinecap="round" fill="none" opacity={giro * 0.9} />
                <path d="M 520 640 Q 640 640 700 540 T 900 400" stroke="#fff" strokeWidth={6} strokeDasharray="26 24" fill="none" opacity={giro * 0.7} />
                <g transform={`translate(${lerp(240, 520, ac(t, M('pivote'), M('estancada')))} 640)`}><Persona id={ID} x={0} y={30} s={0.5} cuerpo="#334155" corbata /></g>
                {t >= M('estancada') && <g opacity={e1(t, M('estancada'))} transform="translate(300 380)"><circle r={50} fill="#fff" /><circle r={50} fill="none" stroke="#64748b" strokeWidth={10} /><path d="M 0 -30 V 0 L 20 10" stroke="#334155" strokeWidth={8} strokeLinecap="round" fill="none" /><path d="M -60 -60 L 60 60" stroke={ROJO_O} strokeWidth={8} strokeLinecap="round" opacity={0.6 * e1(t, M('callejon'))} /></g>}
                {t >= M('numero') && <g opacity={e1(t, M('numero'))}>{Array.from({ length: 4 }, (_, k) => <g key={k} transform={`translate(${260 + k * 80} 200)`}><path d="M -6 22 Q -6 -4 -24 -10 M -6 22 Q -6 -4 18 -10" stroke={k < 4 - Math.min(4, Math.floor(giro * 4)) ? NARANJA : c.apagado} strokeWidth={9} fill="none" strokeLinecap="round" /><circle r={8} cy={30} fill={k < 4 - Math.min(4, Math.floor(giro * 4)) ? NARANJA : c.apagado} /></g>)}</g>}
                {giro > 0.5 && <g opacity={e1(t, M('ocasion') + 1)} transform="translate(960 330)"><Bombilla x={0} y={0} s={0.8} id={ID} /></g>}
              </g>
            )}

            {/* B · por qué se tarda */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {[0, 1, 2].map((k) => <ellipse key={k} cx={300 + k * 300 + 30 * Math.sin(t * 0.7 + k)} cy={330 + k * 50} rx={260} ry={64} fill="#e5e7eb" opacity={0.85} />)}
                <g opacity={e1(t, M('tardan'))} transform="translate(300 540)"><rect x={-80} y={-100} width={160} height={110} rx={14} fill={c.panel} style={sombra(c.sombra, 4, 10)} /><Txt x={0} y={-24} textAnchor="middle" fontSize={78} fill={ROJO_O} opacity={0.6}>?</Txt></g>
                {t >= M('miedo') && <g opacity={e1(t, M('miedo'))} transform="translate(640 560)"><Persona id={ID} x={0} y={30} s={0.6} cuerpo={VIOLETA} /><path d="M -30 -134 q -30 -20 0 -40 M 30 -134 q 30 -20 0 -40" stroke={ROJO_O} strokeWidth={7} fill="none" strokeLinecap="round" /></g>}
                {t >= M('duro') && <g opacity={e1(t, M('duro'))} transform="translate(940 520)"><path d="M 0 40 C -70 -10 -30 -70 0 -30 C 30 -70 70 -10 0 40 Z" fill={ROSA} /><path d="M -10 -20 L 4 0 L -8 14 L 6 34" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" /></g>}
              </g>
            )}

            {/* C · dos señales */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <g opacity={e1(t, M('decrec'))}>
                  <rect x={120} y={200} width={470} height={400} rx={26} fill={c.panel} style={sombra(c.sombra, 8, 20)} />
                  <Curva pts={[[180, 270], [270, 300], [360, 380], [450, 470], [530, 540]]} u={ac(t, M('decrec'), M('decrec') + 2)} color={ROJO_M} grosor={11} />
                </g>
                <g opacity={e1(t, M('productivo'))}>
                  <rect x={640} y={200} width={440} height={400} rx={26} fill={c.panel} style={sombra(c.sombra, 8, 20)} />
                  <g transform="translate(780 400)"><circle r={80} fill="#fff" /><circle r={80} fill="none" stroke="#64748b" strokeWidth={10} /><path d="M 0 -52 V 0 L 30 20" stroke="#334155" strokeWidth={9} strokeLinecap="round" fill="none" /></g>
                  <g transform="translate(950 400)"><path d="M -34 40 L -34 0 L 0 -50 L 34 0 L 34 40 Z" fill={c.apagado} /><Txt x={0} y={30} textAnchor="middle" fontSize={64} fill={ROSA}>?</Txt></g>
                </g>
                {t >= M('valor') && <g opacity={e1(t, M('valor'))} transform="translate(600 700)"><Bombilla x={0} y={0} s={0.8} id={ID} /></g>}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
