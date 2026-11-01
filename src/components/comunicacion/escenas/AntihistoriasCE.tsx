import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Estrella, Etiqueta, Gesto, PanelPregunta, Reloj, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Historias y antihistorias» (Snowden y Denning), escena propia. Acto A: una historia brillante que
 * proyecta detrás su antihistoria oscura; se aprende más del error; motivar y transmitir saber no se
 * contradicen; cierta y creíble, nunca medias verdades. Acto B: el anticuerpo: piezas en Y que rodean y
 * neutralizan un antígeno espinoso (la historia negativa). Acto C: la planta de IBM en el Reino Unido:
 * la cinta con portátiles, los obreros que murmuran; el director de bata blanca que llega solo, se
 * sienta en la línea y pide ayuda; la pregunta del sueldo, su respuesta, los circuitos que le cuestan y
 * el ambiente que se entibia. Acto D: la historia adecuada en el momento adecuado.
 */

const ID = 'ce29';
const nombres = ['snowden', 'anti', 'errores', 'noContradecian', 'ciertas', 'medias', 'neutralizar', 'anticuerpo', 'reino', 'portatiles', 'noTrabajaban', 'ganaban', 'nuevo', 'bata', 'sinAcomp', 'linea', 'ayuda', 'porQue', 'pierdes', 'suyo', 'circuitos', 'ambiente', 'adecuado', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Antígeno espinoso que se encoge y apaga con `n` (0 a 1). */
const Antigeno: React.FC<{ x: number; y: number; n: number; t: number; c: C }> = ({ x, y, n, t, c }) => (
  <g transform={`translate(${x} ${y}) scale(${1 - 0.35 * n}) rotate(${t * 20})`}>
    {Array.from({ length: 10 }, (_, k) => <g key={k} transform={`rotate(${k * 36})`}><rect x={-5} y={-104} width={10} height={36} fill={n > 0.5 ? c.apagado : '#7f1d1d'} /><circle cx={0} cy={-108} r={10} fill={n > 0.5 ? c.apagado : '#991b1b'} /></g>)}
    <circle r={74} fill={n > 0.5 ? c.apagado : '#b91c1c'} />
  </g>
);

/* Anticuerpo en forma de Y. */
const Anticuerpo: React.FC<{ x: number; y: number; rot: number; id: string }> = ({ x, y, rot, id }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-6} y={0} width={12} height={60} rx={6} fill={`url(#${id}-marca)`} />
    <rect x={-6} y={-40} width={12} height={48} rx={6} fill={NARANJA} transform="rotate(-35)" />
    <rect x={-6} y={-40} width={12} height={48} rx={6} fill={ROSA} transform="rotate(35)" />
  </g>
);

/* Portátil abierto. */
const Portatil: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -36 0 L -28 -50 H 28 L 36 0 Z" fill="#1f2937" />
    <rect x={-42} y={0} width={84} height={8} rx={3} fill="#4b5563" />
  </g>
);

export const AntihistoriasCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('adecuado') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Dave Snowden'], [M('anti'), 'Antihistorias'], [M('errores'), 'Se aprende del error'], [M('noContradecian'), 'No se contradicen'],
    [M('ciertas'), 'Ciertas y creíbles'], [M('neutralizar'), 'Neutralizar'], [M('anticuerpo'), 'Como un anticuerpo'], [M('reino'), 'IBM, Reino Unido'],
    [M('noTrabajaban'), 'El rumor'], [M('nuevo'), 'Un nuevo director'], [M('ayuda'), 'Pide ayuda'], [M('porQue'), '¿Por qué ganas más?'],
    [M('circuitos'), 'Le costaba, pero…'], [M('ambiente'), 'El ambiente mejoró'], [M('adecuado'), 'El momento adecuado'],
  ];

  const aA = ventana(t, -1, M('neutralizar'));
  const aB = ventana(t, M('neutralizar'), M('reino'));
  const aC = ventana(t, M('reino'), M('adecuado'));
  const aD = ac(t, M('adecuado'), M('adecuado') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Una historia negativa se neutraliza con otra positiva y verdadera">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · la historia brillante y su antihistoria */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const sombraSale = ac(t, M('anti'), M('anti') + 1.4);
                  const burbujas = ventana(t, M('anti') - 0.3, M('noContradecian'));
                  return (
                    <g>
                      <g opacity={e1(t, M('snowden'))}>
                        <Persona id={ID} x={1000} y={760} cuerpo="#0e7490" pelo="#9ca3af" />
                        <Gesto x={1000} y={760} animo={0.4} />
                        <Etiqueta x={1000} y={820} texto="Snowden" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={burbujas}>
                        <g transform={`translate(${460 + 240 * sombraSale} 400)`} opacity={sombraSale}>
                          <ellipse rx={150} ry={100} fill="#374151" />
                          <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">antihistoria</Txt>
                        </g>
                        <g transform="translate(420 380)">
                          <ellipse rx={150} ry={100} fill="#fde68a" style={sombra(c.sombra)} />
                          <Estrella x={0} y={0} r={50} fill={NARANJA} rot={t * 20} />
                        </g>
                      </g>
                      <Chip x={420} y={600} texto="del error se aprende" c={c} id={ID} op={ventana(t, M('errores'), M('noContradecian'))} />
                      <g opacity={e1(t, M('noContradecian'))}>
                        <Persona id={ID} x={200} y={760} cuerpo="#334155" corbata />
                        <Gesto x={200} y={760} animo={0.5} />
                        <Etiqueta x={200} y={820} texto="Denning" op={1} c={c} id={ID} />
                        <Chip x={360} y={330} texto="motivar" c={c} id={ID} op={1} marca />
                        <Chip x={840} y={330} texto="transmitir saber" c={c} id={ID} op={e1(t, M('noContradecian') + 1)} />
                     </g>
                      <g opacity={e1(t, M('ciertas'))}>
                        <Chip x={600} y={460} texto="cierta y creíble" c={c} id={ID} op={1} />
                        <Visto x={880} y={460} s={0.8} />
                      </g>
                      <g opacity={e1(t, M('medias'))}>
                        <Chip x={600} y={570} texto="medias verdades" c={c} id={ID} op={1} />
                        <Cruz x={880} y={570} s={0.8} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · el anticuerpo neutraliza al antígeno */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const rodea = ac(t, M('anticuerpo'), M('anticuerpo') + 2);
                  const neutro = ac(t, M('anticuerpo') + 1.6, M('anticuerpo') + 3);
                  return (
                    <g>
                      <Antigeno x={600} y={460} n={neutro} t={t} c={c} />
                      {Array.from({ length: 6 }, (_, k) => {
                        const a = (k / 6) * Math.PI * 2;
                        const r = 420 - 270 * rodea;
                        return <g key={k} opacity={e1(t, M('anticuerpo') - 0.4)}><Anticuerpo x={600 + Math.cos(a) * r} y={460 + Math.sin(a) * r * 0.8} rot={(a * 180) / Math.PI - 90} id={ID} /></g>;
                      })}
                      <Etiqueta x={600} y={240} texto="historia negativa" op={e1(t, M('neutralizar'))} c={c} id={ID} />
                      <Etiqueta x={600} y={720} texto="historia positiva y cierta" op={e1(t, M('anticuerpo'))} c={c} id={ID} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · la planta de IBM y el director de bata blanca */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const entra = ac(t, M('nuevo'), M('linea') + 1);
                  const xD = 1150 - 330 * entra;
                  const sienta = ac(t, M('linea'), M('linea') + 1);
                  const mejora = ac(t, M('ambiente'), M('ambiente') + 2);
                  const molestia = ac(t, M('noTrabajaban'), M('noTrabajaban') + 0.6) * (1 - mejora);
                  return (
                    <g>
                      <rect x={100} y={250} width={1000} height={580} rx={30} fill="#fde68a" opacity={0.25 * mejora} />
                      {/* obreros detrás de la cinta */}
                      {[300, 540].map((x, k) => (
                        <g key={x}>
                          <Persona id={ID} x={x} y={640} cuerpo="#1e40af" pelo={k ? '#5b3a26' : '#2b1a12'} />
                          <Gesto x={x} y={640} animo={0.2 - 0.7 * molestia + 0.5 * mejora} />
                        </g>
                      ))}
                      {/* el director */}
                      <g opacity={e1(t, M('nuevo'))}>
                        <Persona id={ID} x={xD} y={640 + 20 * sienta} cuerpo={e1(t, M('bata')) > 0.5 ? '#e2e8f0' : '#334155'} pelo="#9ca3af" />
                        <Gesto x={xD} y={640 + 20 * sienta} animo={0.4 - 0.5 * ventana(t, M('circuitos'), M('ambiente'))} />
                      </g>
                      {/* la cinta transportadora con portátiles */}
                      <g opacity={e1(t, M('reino'))}>
                        <rect x={120} y={620} width={960} height={36} rx={18} fill={c.tenue} />
                        {Array.from({ length: 9 }, (_, k) => <circle key={k} cx={150 + k * 112} cy={638} r={10} fill={c.apagado} />)}
                        <rect x={140} y={656} width={20} height={150} fill={c.apagado} /><rect x={1040} y={656} width={20} height={150} fill={c.apagado} />
                        <g opacity={e1(t, M('portatiles'))}>
                          {Array.from({ length: 6 }, (_, k) => <Portatil key={k} x={140 + ((k * 170 + t * 40) % 940)} y={620} />)}
                        </g>
                        <Etiqueta x={600} y={720} texto="ThinkPads" op={e1(t, M('portatiles'))} c={c} id={ID} />
                      </g>
                      {/* chispas de los circuitos que le cuestan */}
                      <g opacity={ventana(t, M('circuitos'), M('ambiente') + 1)}>
                        {Array.from({ length: 6 }, (_, k) => <line key={k} x1={xD - 60} y1={560} x2={xD - 60 + 30 * Math.cos(k + t * 8)} y2={560 + 30 * Math.sin(k + t * 8)} stroke="#fbbf24" strokeWidth={4} strokeLinecap="round" />)}
                      </g>
                      <g opacity={ventana(t, M('noTrabajaban'), M('nuevo'))}>
                        <Burbuja x={320} y={440} w={420} texto="No trabajan de verdad." u={ac(t, M('noTrabajaban'), M('noTrabajaban') + 1.2)} c={c} id={ID} />
                      </g>
                      <Chip x={900} y={330} texto="ganan de más" c={c} id={ID} op={ventana(t, M('ganaban'), M('nuevo'))} />
                      <Chip x={820} y={290} texto="bata blanca, solo" c={c} id={ID} op={ventana(t, M('bata'), M('ayuda'))} marca />
                      <g opacity={ventana(t, M('ayuda'), M('porQue'))}>
                        <Burbuja x={840} y={440} w={340} texto="¿Me ayudan?" u={ac(t, M('ayuda'), M('ayuda') + 0.8)} c={c} lado="der" id={ID} />
                      </g>
                      <g opacity={ventana(t, M('porQue'), M('pierdes'))}>
                        <Burbuja x={560} y={440} w={400} texto="¿Por qué ganas más?" u={ac(t, M('porQue'), M('porQue') + 1)} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('pierdes') - 0.3, M('circuitos'))}>
                        <Burbuja x={840} y={440} w={620} texto="Si me equivoco yo, 3 000 pierden su empleo." u={ac(t, M('pierdes') - 0.3, M('suyo') + 0.6)} c={c} lado="der" id={ID} marca />
                      </g>
                      <Chip x={600} y={330} texto="algo de razón tenía" c={c} id={ID} op={ventana(t, M('circuitos') + 1.5, M('ambiente'))} />
                      <Chip x={600} y={330} texto="el ambiente mejoró" c={c} id={ID} op={e1(t, M('ambiente'))} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · la historia adecuada en el momento adecuado */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const vuela = ac(t, M('adecuado') + 0.5, M('adecuado') + 1.6);
                  return (
                    <g>
                      <Reloj x={330} y={460} s={1.6} c={c} progreso={0.25} />
                      {[110, 80, 50, 20].map((r, k) => <circle key={r} cx={880} cy={460} r={r} fill={k % 2 ? c.panel : ROSA} opacity={k % 2 ? 1 : 0.85} />)}
                      <g transform={`translate(${470 + 360 * vuela} ${460 - 60 * Math.sin(Math.PI * vuela)})`}>
                        <ellipse rx={50} ry={34} fill={`url(#${ID}-marca)`} />
                        <path d="M -20 0 h 40" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
                      </g>
                      <Chip x={600} y={680} texto="habilidad de liderazgo" c={c} id={ID} op={e1(t, M('adecuado') + 1.8)} marca />
                    </g>
                  );
                })()}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
