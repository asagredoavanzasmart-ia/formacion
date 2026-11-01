import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Chip, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana } from './comunOA';
import { AZUL_M, Edificio, Flecha, Moneda, Precio, ROJO_M, ROJO_O } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * «Eliminar, reducir, aumentar y crear», escena propia. Acto A: cuatro paneles (reforzar, mitigar, excluir,
 * crear) que se encienden uno a uno y un cursor que se desplaza. Acto B: el Logan de Renault, un coche
 * dibujado que recibe y pierde cosas: la carrera por el «más» se tacha, llega la fábrica Dacia, el
 * salpicadero de madera se descarta, las ruedas aguantan un camino roto, aparece el maletero familiar, se
 * descarta el Twingo y entran los precios. Acto C: los mismos cuatro paneles, ahora con un programa de ventas.
 */

const ID = 'oa4';
const nombres = ['refor', 'mitig', 'exclu', 'crear', 'cursor', 'logan', 'schweitzer', 'lowcost', 'mas', 'lujo', 'dacia', 'salp', 'robusto', 'familiar', 'twingo', 'p4500', 'p7500', 'segunda', 'escala', 'elim', 'red', 'aum', 'aviso', 'pregunta'] as const;

const PANELES = [
  { n: 'Reforzar', x: 330, y: 270 }, { n: 'Mitigar', x: 870, y: 270 },
  { n: 'Excluir', x: 330, y: 560 }, { n: 'Crear', x: 870, y: 560 },
] as const;

/* El Logan visto de lado: carrocería, vidrios y ruedas. (x, y) es el suelo bajo el centro. */
const Logan: React.FC<{ x: number; y: number; s?: number; t: number; color?: string; rebote?: number; maletero?: number }> = ({ x, y, s = 1, t, color = '#2563eb', rebote = 0, maletero = 0 }) => (
  <g transform={`translate(${x} ${y + rebote * 6 * Math.sin(t * 14)}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={230} ry={14} fill="#000" opacity={0.2} />
    <path d="M -200 -10 L -200 -50 Q -200 -66 -176 -70 L -100 -78 L -62 -128 Q -52 -138 -36 -138 L 96 -138 Q 112 -138 122 -126 L 158 -80 L 188 -72 Q 208 -66 208 -48 L 208 -10 Z" fill={color} />
    <path d="M -200 -10 L -200 -50 Q -200 -66 -176 -70 L -100 -78 L 208 -48 L 208 -10 Z" fill="#000" opacity={0.12} />
    <path d="M -84 -82 L -52 -122 Q -46 -128 -36 -128 L 28 -128 L 28 -82 Z" fill="#bfdbfe" /><path d="M 40 -128 L 94 -128 Q 104 -128 110 -120 L 138 -84 L 40 -84 Z" fill="#bfdbfe" />
    {maletero > 0.01 && (
      <g opacity={maletero}>
        <rect x={150} y={-84} width={90} height={74} rx={8} fill="#1e3a8a" /><rect x={160} y={-74} width={70} height={54} rx={6} fill="#0f172a" />
        <rect x={168} y={-66} width={26} height={28} rx={4} fill="#f59e0b" /><rect x={198} y={-60} width={22} height={34} rx={4} fill="#ec4899" />
      </g>
    )}
    {[-120, 120].map((wx) => <g key={wx}><circle cx={wx} cy={-4} r={42} fill="#1f2937" /><circle cx={wx} cy={-4} r={18} fill="#9ca3af" /></g>)}
  </g>
);

export const AccionesOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('aviso') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Cuatro acciones'], [M('refor'), 'Reforzar'], [M('mitig'), 'Mitigar'], [M('exclu'), 'Excluir'], [M('crear'), 'Crear'], [M('cursor'), 'Desplazar el cursor'],
    [M('logan'), 'El Logan, de Renault'], [M('lowcost'), 'Un coche low cost'], [M('mas'), 'La carrera por el «más»'], [M('lujo'), 'Sin lujo'], [M('dacia'), 'Sinergias con Dacia'],
    [M('robusto'), 'Pero robusto'], [M('familiar'), 'Y familiar'], [M('p4500'), 'Dos precios'], [M('segunda'), 'Atrae a quien compraba usado'],
    [M('escala'), 'A escala pequeña'], [M('elim'), 'Eliminar módulos'], [M('red'), 'Implementar en días'], [M('aum'), 'Más facilidad de uso'], [M('aviso'), 'Crear: un aviso diario'],
  ];

  const aA = ventana(t, -1, M('logan'));
  const aB = ventana(t, M('logan'), M('escala'));
  const aC = ac(t, M('escala'), M('escala') + 0.5);
  const marcasPanel = [M('refor'), M('mitig'), M('exclu'), M('crear')];
  const act = (k: number) => (t >= marcasPanel[k] && t < (k < 3 ? marcasPanel[k + 1] : M('cursor')) ? 1 : 0);
  const desp = ac(t, M('cursor'), M('cursor') + 3);

  // B · el Logan
  const entra = ac(t, M('logan'), M('logan') + 1.6);
  const bache = ac(t, M('robusto'), M('robusto') + 0.5) * (1 - ac(t, M('familiar'), M('familiar') + 0.5));
  const zona = (a: number, b: number) => ventana(t, a, b, 0.4);

  // C · contenido del programa de ventas dentro de los paneles
  const contenido: [number, number, number][] = [[0, M('aum'), 0], [1, M('red'), 1], [2, M('elim'), 2], [3, M('aviso'), 3]];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Eliminar, reducir, aumentar y crear: el Logan de Renault">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A y C · los cuatro paneles */}
            {(aA > 0.01 || aC > 0.01) && (
              <g opacity={Math.max(aA, aC)}>
                {PANELES.map((p, k) => {
                  const a = act(k) * (1 - aC);
                  const cx = contenido.find(([kk]) => kk === k)!;
                  return (
                    <g key={p.n} transform={`translate(${p.x} ${p.y - 4 * a})`} opacity={e1(t, 0.3 + k * 0.2)}>
                      <rect x={-240} y={-125} width={480} height={250} rx={30} fill={c.panel} style={sombra(c.sombra, a ? 14 : 6, a ? 28 : 14)} />
                      {a > 0 && <rect x={-240} y={-125} width={14} height={250} rx={7} fill={`url(#${ID}-marca)`} />}
                      <Txt f="a" x={-200} y={-72} fontSize={34} fill={a ? NARANJA : c.tenue}>{p.n}</Txt>
                      {/* A · símbolos de cada acción */}
                      {aC < 0.5 && (
                        <g transform="translate(40 24)" opacity={1 - aC * 2}>
                          {k === 0 && <path d="M -50 40 L 0 -40 L 50 40 Z" fill={`url(#${ID}-marca)`} />}
                          {k === 1 && <path d="M -50 -40 L 0 40 L 50 -40 Z" fill={`url(#${ID}-marca)`} opacity={0.8} />}
                          {k === 2 && <path d="M -44 -44 L 44 44 M 44 -44 L -44 44" stroke={ROJO_O} strokeWidth={18} strokeLinecap="round" />}
                          {k === 3 && <path d="M 0 -50 L 12 -12 L 50 0 L 12 12 L 0 50 L -12 12 L -50 0 L -12 -12 Z" fill={`url(#${ID}-marca)`} />}
                        </g>
                      )}
                      {/* C · lo que hace el programa de ventas */}
                      {aC > 0.5 && t >= cx[1] && (
                        <g opacity={e1(t, cx[1]) * aC} transform="translate(40 24)">
                          {k === 2 && (<>
                            {[0, 1, 2, 3, 4].map((j) => <rect key={j} x={-100 + j * 42} y={-24} width={34} height={34} rx={7} fill={j > 1 ? c.apagado : '#7c3aed'} opacity={j > 1 ? 1 - 0.7 * ac(t, cx[1] + 0.3 + j * 0.2, cx[1] + 0.9 + j * 0.2) : 1} />)}
                            <path d="M -16 -34 L 108 52 M 108 -34 L -16 52" stroke={ROJO_O} strokeWidth={10} strokeLinecap="round" opacity={ac(t, cx[1] + 1.4, cx[1] + 1.9)} />
                          </>)}
                          {k === 1 && (<>
                            <rect x={-110} y={-6} width={lerp(230, 50, ac(t, cx[1] + 0.4, cx[1] + 2))} height={30} rx={15} fill={`url(#${ID}-marcaH)`} />
                          </>)}
                          {k === 0 && (<>
                            <Persona id={ID} x={-20} y={60} s={0.5} cuerpo="#0f766e" />
                            <rect x={50} y={-40} width={44} height={74} rx={9} fill="#1f2937" /><rect x={55} y={-32} width={34} height={54} rx={5} fill={AZUL_M} />
                            <Flecha x1={130} y1={40} x2={130} y2={-30} color={NARANJA} grosor={10} />
                          </>)}
                          {k === 3 && (<g transform={`rotate(${8 * Math.sin(t * 8) * (1 - ac(t, cx[1] + 1.5, cx[1] + 2.5))})`}>
                            <path d="M -40 30 Q -50 -40 0 -50 Q 50 -40 40 30 Z" fill={`url(#${ID}-marca)`} /><circle cx={0} cy={44} r={11} fill={ROSA} />
                            <path d="M 60 -40 L 66 -22 L 84 -16 L 66 -10 L 60 8 L 54 -10 L 36 -16 L 54 -22 Z" fill="#fde047" />
                          </g>)}
                        </g>
                      )}
                    </g>
                  );
                })}
                {aA > 0.01 && (
                  <g opacity={e1(t, M('cursor'))}>
                    <rect x={200} y={770} width={800} height={14} rx={7} fill={c.apagado} />
                    <rect x={200} y={770} width={800 * desp} height={14} rx={7} fill={`url(#${ID}-marcaH)`} />
                    <circle cx={200 + 800 * desp} cy={777} r={26} fill="#fff" style={sombra(c.sombra, 4, 10)} />
                    <circle cx={200 + 800 * desp} cy={777} r={12} fill={`url(#${ID}-marca)`} />
                  </g>
                )}
              </g>
            )}

            {/* B · el Logan y lo que gana y pierde */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <path d="M 60 592 Q 160 584 260 592 T 460 592 T 660 592 T 860 592 T 1140 592" fill="none" stroke={c.apagado} strokeWidth={14} strokeLinecap="round" opacity={bache} transform={`translate(${-80 * bache} 0)`} />
                <Logan x={lerp(-200, 560, entra)} y={590} s={0.95} t={t} rebote={bache} maletero={e1(t, M('familiar') + 0.5)} />

                {/* arriba a la izquierda: el «más», el lujo tachado y la robustez */}
                <g opacity={zona(M('mas'), M('lujo'))}>
                  {[0, 1, 2, 3].map((k) => <g key={k} opacity={e1(t, M('mas') + k * 0.4)}><circle cx={150 + k * 76} cy={250 - 16 * k - 6 * Math.sin(t * 3 + k)} r={30} fill={`url(#${ID}-marca)`} /><path d={`M ${150 + k * 76 - 14} ${250 - 16 * k - 6 * Math.sin(t * 3 + k)} h 28 M ${150 + k * 76} ${244 - 16 * k - 6 * Math.sin(t * 3 + k) - 14} v 28`} stroke="#fff" strokeWidth={7} strokeLinecap="round" /></g>)}
                </g>
                <g opacity={zona(M('lujo'), M('robusto'))} transform="translate(260 230)">
                  <path d="M -70 40 L -80 -30 L -40 0 L 0 -50 L 40 0 L 80 -30 L 70 40 Z" fill="#f59e0b" />
                  <path d="M -92 -50 L 92 66 M 92 -50 L -92 66" stroke={ROJO_O} strokeWidth={14} strokeLinecap="round" opacity={ac(t, M('lujo') + 0.5, M('lujo') + 1)} />
                </g>
                <g opacity={zona(M('robusto'), M('familiar'))} transform="translate(260 240)">
                  <path d="M 0 -64 L 56 -40 Q 56 30 0 66 Q -56 30 -56 -40 Z" fill={`url(#${ID}-marca)`} /><path d="M -20 4 L -4 22 L 26 -18" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* arriba a la derecha: 1998, low cost, la fábrica Dacia y los dos precios */}
                <g opacity={zona(M('schweitzer'), M('dacia'))}>
                  <g opacity={e1(t, M('schweitzer'))}><Persona id={ID} x={890} y={340} s={0.7} cuerpo={isDark ? '#8da2c0' : '#334155'} corbata /></g>
                  <Chip x={1010} y={200} texto="1998" c={c} id={ID} op={e1(t, M('schweitzer') + 0.3)} />
                  <g opacity={e1(t, M('lowcost'))}><Precio x={1010} y={290} s={0.9} color="#10b981" /></g>
                </g>
                <g opacity={zona(M('dacia'), M('familiar'))}>
                  <Edificio x={960} y={350} w={130} h={110} color={isDark ? "#8294b3" : "#475569"} />
                  <rect x={900} y={210} width={26} height={30} fill="#64748b" /><rect x={940} y={190} width={26} height={50} fill="#64748b" />
                  <Flecha x1={900} y1={380} x2={800} y2={470} u={ac(t, M('dacia') + 0.4, M('dacia') + 1.4)} color={NARANJA} grosor={10} />
                </g>
                <g opacity={zona(M('p4500'), M('segunda'))}>
                  <Chip x={960} y={230} texto="4 500 €" c={c} id={ID} op={e1(t, M('p4500'))} />
                  <Chip x={960} y={320} texto="7 500 €" c={c} id={ID} op={e1(t, M('p7500'))} marca />
                </g>

                {/* abajo: el salpicadero de madera y el Twingo descartados, y quien compraba usado */}
                <g opacity={zona(M('salp'), M('familiar'))} transform="translate(250 770)">
                  <rect x={-90} y={-30} width={180} height={50} rx={10} fill="#a16207" /><path d="M -80 -14 H 80 M -80 4 H 80" stroke="#78350f" strokeWidth={5} />
                  <path d="M -100 -44 L 100 34 M 100 -44 L -100 34" stroke={ROJO_O} strokeWidth={12} strokeLinecap="round" />
                </g>
                <g opacity={zona(M('twingo'), M('segunda'))} transform="translate(250 780)">
                  <path d="M -80 0 V -34 Q -80 -50 -60 -52 L -30 -76 H 30 L 62 -48 Q 82 -46 82 -28 V 0 Z" fill="#94a3b8" /><circle cx={-40} cy={0} r={22} fill="#1f2937" /><circle cx={44} cy={0} r={22} fill="#1f2937" />
                  <path d="M -92 -84 L 94 14 M 94 -84 L -92 14" stroke={ROJO_O} strokeWidth={12} strokeLinecap="round" />
                </g>
                <g opacity={zona(M('segunda'), M('escala'))}>
                  <Persona id={ID} x={170} y={790} s={0.55} cuerpo="#0f766e" />
                  <Flecha x1={250} y1={730} x2={400} y2={640} color={NARANJA} grosor={10} />
                  <Moneda x={300} y={790} r={22} />
                </g>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
