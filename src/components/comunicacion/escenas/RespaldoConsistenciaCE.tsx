import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, Hoja, PanelPregunta, Rotulo, Visto, W, H, borde, e1, marcador, ventana } from './comunCE';
import { BarraV, SeisPrincipios } from './comunPersuasion';
import type { PropsCE } from './comunCE';

/**
 * «Respaldo social y consistencia» (Cialdini), escena propia. Acto A: la colecta puerta a puerta de
 * 1982 con una lista de vecinos que se alarga y una vecina que se anima; la billetera perdida en Nueva
 * York, que se devuelve si lo intentó otro neoyorquino y no si fue alguien de otro país; testimonios
 * entre pares e influencia en horizontal, no en vertical. Acto B: el edificio israelí, la petición
 * firmada y, dos semanas después, la barra de donaciones de quienes firmaron (92 %) frente a la de
 * quienes no; los tres sellos del compromiso (activo, público, voluntario), la frase de Samuel Butler y
 * la siguiente reunión que propone el comprador frente a la concesión arrancada con presión.
 */

const ID = 'ce21';
const nombres = ['respaldo', 'a1982', 'puerta', 'lista', 'larga', 'pares', 'ny', 'billetera', 'neoyorquino', 'otroPais', 'testimonios', 'horizontal', 'consistencia', 'israelies', 'peticion', 'dosSemanas', 'mitad', 'p92', 'activos', 'p74', 'estudiantes', 'forzado', 'butler', 'siguiente', 'presion', 'pregunta'] as const;

/* Puerta de una casa con marco y manilla; `abre` de 0 a 1. */
const Puerta: React.FC<{ x: number; y: number; abre: number; c: ReturnType<typeof tono> }> = ({ x, y, abre, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -130 0 V -250 L 0 -330 L 130 -250 V 0 Z" fill={c.panel} style={sombra(c.sombra)} />
    <rect x={-60} y={-200} width={120} height={200} fill="#3b2a20" opacity={0.85} />
    <rect x={-60} y={-200} width={120 * (1 - 0.7 * abre)} height={200} fill="#a16207" />
    <circle cx={-60 + 120 * (1 - 0.7 * abre) - 14} cy={-100} r={6} fill="#fde68a" />
  </g>
);

/* Billetera café. */
const Billetera: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-50} y={-32} width={100} height={64} rx={10} fill="#7c4a24" />
    <rect x={10} y={-14} width={44} height={28} rx={8} fill="#5b3418" />
    <circle cx={36} cy={0} r={5} fill="#fbbf24" />
  </g>
);

/* Edificio de departamentos. */
const Edificio: React.FC<{ x: number; y: number; c: ReturnType<typeof tono>; luz: number }> = ({ x, y, c, luz }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={4} rx={140} ry={14} fill="#000" opacity={0.12} />
    <rect x={-120} y={-330} width={240} height={330} rx={10} fill={c.panel} style={sombra(c.sombra)} />
    {Array.from({ length: 12 }, (_, k) => (
      <rect key={k} x={-92 + (k % 3) * 70} y={-300 + Math.floor(k / 3) * 70} width={44} height={40} rx={6} fill={k / 12 < luz ? '#fde68a' : c.panel2} />
    ))}
  </g>
);

export const RespaldoConsistenciaCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('presion') + 1.4 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '3 · Respaldo social'], [M('puerta'), 'Puerta a puerta, 1982'], [M('larga'), 'Más vecinos, más donaciones'], [M('pares'), 'Tienen que ser pares'],
    [M('testimonios'), 'Testimonios entre pares'], [M('horizontal'), 'Influencia en horizontal'], [M('consistencia'), '4 · Consistencia'],
    [M('dosSemanas'), 'Dos semanas después'], [M('activos'), 'Activo, público y voluntario'], [M('butler'), 'Samuel Butler'], [M('siguiente'), 'En una venta'],
  ];

  const entra = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
  const activo = t > M('consistencia') ? 3 : 2;

  const aA1 = ventana(t, -1, M('pares'));
  const aA2 = ventana(t, M('pares'), M('testimonios'));
  const aA3 = ventana(t, M('testimonios'), M('consistencia'));
  const aB1 = ventana(t, M('consistencia'), M('activos'));
  const aB2 = ventana(t, M('activos'), M('siguiente'));
  const aB3 = ac(t, M('siguiente'), M('siguiente') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Respaldo social: seguimos a nuestros pares; consistencia: cumplimos lo que prometimos">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <SeisPrincipios t={t} entra={entra} activo={activo} c={c} id={ID} />

            {/* A1 · puerta a puerta con la lista de vecinos */}
            {aA1 > 0.01 && (
              <g opacity={aA1}>
                {(() => {
                  const largo = ac(t, M('lista'), M('larga') + 2);
                  const filas = Math.round(2 + 7 * largo);
                  return (
                    <g>
                      <g opacity={e1(t, M('puerta'))}>
                        <Puerta x={880} y={760} abre={ac(t, M('puerta') + 0.5, M('puerta') + 1.3)} c={c} />
                        <Persona id={ID} x={880} y={760} s={0.85} cuerpo="#0f766e" pelo="#7c3f1d" />
                        <Gesto x={880} y={760} s={0.85} animo={-0.1 + 0.9 * largo} />
                      </g>
                      <Persona id={ID} x={300} y={760} cuerpo="#334155" corbata />
                      <Gesto x={300} y={760} animo={0.5} />
                      <Txt x={300} y={300} textAnchor="middle" fontSize={44} fill={`url(#${ID}-marcaH)`} opacity={e1(t, M('a1982'))}>1982</Txt>
                      {/* la lista que se alarga */}
                      <g opacity={e1(t, M('lista'))}>
                        <rect x={420} y={680 - 34 * filas - 40} width={190} height={34 * filas + 40} rx={14} fill={c.blanco} style={sombra(c.sombra, 3, 8)} />
                        {Array.from({ length: filas }, (_, k) => (
                          <g key={k}>
                            <circle cx={446} cy={680 - 34 * (filas - k) + 4} r={8} fill={k % 2 ? NARANJA : ROSA} />
                            <rect x={464} y={680 - 34 * (filas - k)} width={120} height={10} rx={5} fill={c.apagado} />
                          </g>
                        ))}
                        <Etiqueta x={515} y={730} texto="vecinos" op={1} c={c} id={ID} />
                      </g>
                      {/* la donación que cae */}
                      <g opacity={ac(t, M('larga'), M('larga') + 0.6)}>
                        {[0, 1, 2].map((k) => {
                          const u = ((t - M('larga')) * 0.7 + k / 3) % 1;
                          return <circle key={k} cx={800 - 120 * u} cy={560 + 30 * Math.sin(Math.PI * u)} r={12} fill="#fbbf24" opacity={Math.sin(Math.PI * u)} />;
                        })}
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* A2 · la billetera de Nueva York */}
            {aA2 > 0.01 && (
              <g opacity={aA2}>
                <Txt f="a" x={600} y={290} textAnchor="middle" fontSize={44} fill={c.texto} opacity={e1(t, M('ny'))}>Nueva York</Txt>
                <g opacity={e1(t, M('billetera'))} transform={`translate(0 ${4 * Math.sin(t * 2)})`}><Billetera x={600} y={400} /></g>
                <BarraV x={430} base={720} alto={220} valor="" etiqueta="neoyorquino" u={ac(t, M('neoyorquino'), M('neoyorquino') + 1)} c={c} id={ID} marca />
                <BarraV x={770} base={720} alto={70} valor="" etiqueta="otro país" u={ac(t, M('otroPais'), M('otroPais') + 1)} c={c} id={ID} />
                <g opacity={e1(t, M('neoyorquino') + 1)}><Visto x={430} y={450} /></g>
              </g>
            )}

            {/* A3 · testimonios entre pares, influencia en horizontal */}
            {aA3 > 0.01 && (
              <g opacity={aA3}>
                {(() => {
                  const hz = e1(t, M('horizontal'));
                  return (
                    <g>
                      <Persona id={ID} x={300} y={750} cuerpo="#0f766e" pelo="#3b2a20" />
                      <Gesto x={300} y={750} animo={0.8} />
                      <Etiqueta x={300} y={815} texto="cliente feliz" op={1} c={c} id={ID} />
                      <Persona id={ID} x={900} y={750} cuerpo="#0f766e" pelo="#3b2a20" />
                      <Gesto x={900} y={750} animo={0.4} />
                      <Etiqueta x={900} y={815} texto="comprador" op={1} c={c} id={ID} />
                      <g opacity={ventana(t, M('testimonios') + 0.3, M('horizontal'))}>
                        <Burbuja x={330} y={560} w={380} texto="A nosotros nos funcionó." u={ac(t, M('testimonios') + 0.3, M('testimonios') + 1.6)} c={c} id={ID} marca />
                        <Chip x={830} y={360} texto="se parecen" c={c} id={ID} op={e1(t, M('testimonios') + 3)} />
                      </g>
                      <g opacity={hz}>
                        <path d="M 380 560 H 820" stroke={NARANJA} strokeWidth={10} strokeLinecap="round" />
                        <path d="M 800 536 L 830 560 L 800 584" stroke={ROSA} strokeWidth={10} fill="none" strokeLinecap="round" />
                        <Chip x={600} y={480} texto="horizontal" c={c} id={ID} op={1} marca />
                        <path d="M 600 260 V 400" stroke={c.apagado} strokeWidth={10} strokeLinecap="round" />
                        <path d="M 578 380 L 600 404 L 622 380" stroke={c.apagado} strokeWidth={10} fill="none" strokeLinecap="round" />
                        <Txt f="a" x={640} y={340} fontSize={28} fill={c.tenue}>vertical</Txt>
                        <g opacity={e1(t, M('horizontal') + 0.8)}><Cruz x={600} y={300} s={0.8} /></g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B1 · el edificio, la petición y las donaciones */}
            {aB1 > 0.01 && (
              <g opacity={aB1}>
                <g opacity={e1(t, M('israelies'))}>
                  <Edificio x={280} y={740} c={c} luz={ac(t, M('peticion'), M('peticion') + 2)} />
                </g>
                <g opacity={ventana(t, M('peticion'), M('mitad'))}>
                  <Hoja x={650} y={440} w={260} h={300} c={c} cabeza={NARANJA} titulo="petición" llena={ac(t, M('peticion'), M('peticion') + 2)} tituloTam={26} />
                </g>
                <Chip x={950} y={300} texto="2 semanas" c={c} id={ID} op={ventana(t, M('dosSemanas'), M('mitad'))} />
                <BarraV x={720} base={700} alto={300 * 0.55} valor="½ +" etiqueta="no firmaron" u={ac(t, M('mitad'), M('mitad') + 1)} c={c} id={ID} />
                <BarraV x={980} base={700} alto={300 * 0.92} valor="92 %" etiqueta="firmaron" u={ac(t, M('p92'), M('p92') + 1.2)} c={c} id={ID} marca />
              </g>
            )}

            {/* B2 · activo, público y voluntario */}
            {aB2 > 0.01 && (
              <g opacity={aB2}>
                {/* activo: un formulario lleno, 74 % */}
                <g opacity={e1(t, M('activos'))}>
                  <g opacity={1 - ac(t, M('p74') - 0.3, M('p74'))}><Hoja x={250} y={340} w={170} h={170} c={c} cabeza={NARANJA} titulo="" llena={ac(t, M('activos'), M('activos') + 1)} /></g>
                  <Chip x={250} y={480} texto="activo" c={c} id={ID} op={1} marca={t < M('estudiantes')} />
                  <Txt x={250} y={370} textAnchor="middle" fontSize={64} fill={`url(#${ID}-marcaH)`} opacity={e1(t, M('p74'))}>74 %</Txt>
                </g>
                {/* público: la estimación firmada */}
                <g opacity={e1(t, M('activos') + 0.8)}>
                  <rect x={520} y={260} width={160} height={150} rx={14} fill={c.blanco} style={sombra(c.sombra, 3, 8)} />
                  <path d={`M 545 370 q 20 -30 40 0 t 40 0 t 30 -10`} stroke={c.texto} strokeWidth={4} fill="none" strokeDasharray={200} strokeDashoffset={200 * (1 - ac(t, M('estudiantes'), M('estudiantes') + 1))} />
                  <Txt x={600} y={320} textAnchor="middle" fontSize={40} fill={c.tenue}>?</Txt>
                  <Chip x={600} y={480} texto="público" c={c} id={ID} op={1} marca={t > M('estudiantes') && t < M('forzado')} />
                </g>
                {/* voluntario: la cadena del que cede forzado */}
                <g opacity={e1(t, M('activos') + 1.6)}>
                  <g transform="translate(950 335)">
                    {[0, 1, 2].map((k) => <ellipse key={k} cx={-50 + k * 50} cy={0} rx={30} ry={18} fill="none" stroke={c.tenue} strokeWidth={9} />)}
                  </g>
                  <g opacity={e1(t, M('forzado'))}><Cruz x={950} y={335} s={1} /></g>
                  <Chip x={950} y={480} texto="voluntario" c={c} id={ID} op={1} marca={t > M('forzado')} />
                </g>
                <g opacity={e1(t, M('butler'))}>
                  <Burbuja x={260} y={800} w={760} texto="Quien cede contra su voluntad sigue pensando lo mismo." u={ac(t, M('butler'), M('butler') + 2.4)} c={c} id={ID} />
                </g>
              </g>
            )}

            {/* B3 · en una venta: la reunión que propone el comprador */}
            {aB3 > 0.01 && (
              <g opacity={aB3}>
                <g opacity={e1(t, M('siguiente'))}>
                  <Persona id={ID} x={200} y={760} cuerpo="#0f766e" />
                  <Gesto x={200} y={760} animo={0.7} />
                  <Etiqueta x={200} y={820} texto="comprador" op={1} c={c} id={ID} />
                  <Burbuja x={240} y={570} w={360} texto="¿Nos vemos el jueves?" u={ac(t, M('siguiente') + 0.4, M('siguiente') + 1.6)} c={c} id={ID} />
                  <rect x={460} y={560} width={150} height={100} rx={12} fill={c.blanco} style={sombra(c.sombra, 3, 8)} />
                  <path d="M 460 560 L 535 615 L 610 560" fill="none" stroke={c.apagado} strokeWidth={4} />
                  <g opacity={e1(t, M('siguiente') + 2.2)}><Visto x={600} y={560} s={0.9} /></g>
                </g>
                <g opacity={e1(t, M('presion'))}>
                  <Persona id={ID} x={1000} y={760} cuerpo="#64748b" />
                  <Gesto x={1000} y={760} animo={-0.5} />
                  <Etiqueta x={1000} y={820} texto="con presión" op={1} c={c} id={ID} />
                  {[0, 1, 2].map((k) => <path key={k} d={`M ${790 + k * 30} ${520 + k * 30} l 60 0`} stroke={ROSA} strokeWidth={8} strokeLinecap="round" transform={`translate(${8 * Math.sin(t * 8 + k)} 0)`} />)}
                  <g opacity={e1(t, M('presion') + 0.6)}><Cruz x={1000} y={330} s={1.1} /></g>
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
