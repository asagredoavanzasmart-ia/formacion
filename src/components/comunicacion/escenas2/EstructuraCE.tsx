import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, tono } from '../../remotion/comun';
import { Burbuja, Chip, Espalda, Etiqueta, Gesto, Medidor, PanelPregunta, Reloj, Rotulo, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { Organigrama, Palancas } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «La estructura, sin miedo» (Hamm, primera palanca), escena propia. Arriba, las cinco palancas con la
 * primera activa. Acto A: el organigrama cargado de emoción tiembla; las ideas de Fiorina salen de a
 * gotas, los gerentes se disputan las cajas, la motivación cae, el contratista no sabe a quién llamar y se
 * llenan doce casillas: un trimestre perdido. Acto B: el lunes del director de software: tres frases
 * claras, el nuevo organigrama, el reloj de las 10:45, la pizza del mediodía y a la una, a trabajar.
 * Acto C: dos equipos de bomberos (cinco baldes y dos mangueras frente a tres y cuatro) y la estructura
 * como mapa flexible.
 */

const ID = 'ce2c';
const nombres = ['estructura', 'organigrama', 'emocion', 'paralizar', 'fiorina', 'temible', 'dosMeses', 'luchas', 'motivacion', 'contratistas', 'doce', 'trimestre', 'p150', 'lunes', 'guerra', 'cambio', 'supervisor', 'nuevoOrg', 'hora1045', 'molestarse', 'pizza', 'laUna', 'bomberos', 'cincoBaldes', 'tresBaldes', 'politica', 'mapa', 'pregunta'] as const;

/* Bombero pequeño con balde o manguera. */
const Bombero: React.FC<{ x: number; y: number; manguera: boolean; c: ReturnType<typeof tono>; id: string; t: number }> = ({ x, y, manguera, c, id, t }) => (
  <g>
    <Persona id={id} x={x} y={y} s={0.45} cuerpo="#b91c1c" pelo="#2b1a12" />
    <path d={`M ${x - 18} ${y - 82} Q ${x} ${y - 100} ${x + 18} ${y - 82} Z`} fill="#fbbf24" />
    {manguera
      ? <path d={`M ${x + 16} ${y - 40} q 30 -10 50 ${-20 + 4 * Math.sin(t * 8)}`} stroke="#dc2626" strokeWidth={7} fill="none" strokeLinecap="round" />
      : <path d={`M ${x + 14} ${y - 36} h 22 l -4 22 h -14 Z`} fill={c.tenue} />}
  </g>
);

export const EstructuraCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('mapa') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '1 · La estructura'], [M('organigrama'), 'Cargada de emoción'], [M('fiorina'), 'Hewlett-Packard'], [M('dosMeses'), 'Dos meses de freno'],
    [M('doce'), 'Un trimestre perdido'], [M('p150'), 'Otro director, un lunes'], [M('nuevoOrg'), 'El nuevo organigrama'], [M('hora1045'), 'Son las 10:45'],
    [M('pizza'), 'Pizza y a trabajar'], [M('bomberos'), 'Dos equipos de bomberos'], [M('politica'), 'Organizarse para ganar'],
  ];

  const aA = ventana(t, -1, M('p150'));
  const aB = ventana(t, M('p150'), M('bomberos'));
  const aC = ac(t, M('bomberos'), M('bomberos') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Una reorganización anunciada con cautela paraliza; anunciada con claridad, ordena">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <Palancas t={t} entra={[0, 0.1, 0.2, 0.3, 0.4]} activo={0} c={c} id={ID} />

            {/* A · Hewlett-Packard: el organigrama que paraliza */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const temblor = ac(t, M('emocion'), M('emocion') + 1) * (0.4 + 0.6 * ventana(t, M('luchas'), M('doce')));
                  const mezcla = ventana(t, M('luchas'), M('motivacion') + 1) * 0.5;
                  const semanas = Math.round(12 * ac(t, M('dosMeses'), M('doce') + 1));
                  return (
                    <g>
                      <g opacity={e1(t, M('organigrama'))}><Organigrama x={600} y={440} c={c} id={ID} temblor={temblor} mezcla={mezcla} t={t} /></g>
                      <g opacity={e1(t, M('fiorina'))}>
                        <Persona id={ID} x={180} y={760} cuerpo="#7c3aed" pelo="#c49a6c" />
                        <Gesto x={180} y={760} animo={0.1} />
                        <Etiqueta x={180} y={820} texto="Fiorina" op={1} c={c} id={ID} />
                        {[0, 1, 2].map((k) => {
                          const u = ((t - M('temible')) * 0.25 + k / 3) % 1;
                          return <circle key={k} cx={220 + 120 * u} cy={600 - 60 * u} r={9} fill={c.apagado} opacity={t > M('temible') ? Math.sin(Math.PI * u) : 0} />;
                        })}
                      </g>
                      {/* las semanas que se pierden */}
                      <g opacity={e1(t, M('dosMeses'))}>
                        {Array.from({ length: 12 }, (_, k) => (
                          <rect key={k} x={330 + k * 46} y={590} width={38} height={38} rx={8} fill={k < semanas ? ROSA : c.panel2} opacity={k < semanas ? 0.85 : 1} />
                        ))}
                        <Etiqueta x={600} y={680} texto={t > M('trimestre') ? 'un trimestre completo' : `${semanas} semanas`} op={1} c={c} id={ID} marca={t > M('doce')} />
                      </g>
                      <g opacity={e1(t, M('motivacion'))}>
                        <Medidor x={1010} y={420} r={80} v={0.85 - 0.7 * ac(t, M('motivacion'), M('motivacion') + 1.4)} c={c} id={ID} etiqueta="motivación" />
                      </g>
                      <g opacity={e1(t, M('contratistas'))}>
                        <Persona id={ID} x={1010} y={760} s={0.85} cuerpo="#a16207" />
                        <Gesto x={1010} y={760} s={0.85} animo={-0.3} />
                        <Txt x={1060} y={600} fontSize={44} fill={c.tenue}>?</Txt>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · el lunes del director de software */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Persona id={ID} x={200} y={760} cuerpo="#334155" corbata />
                <Gesto x={200} y={760} animo={0.5} />
                <Etiqueta x={200} y={820} texto="director" op={1} c={c} id={ID} />
                {[520, 680, 840, 1000].map((x, k) => <Espalda key={x} x={x} y={790} s={1} c={c} pelo={['#2b1a12', '#5b3a26', '#9ca3af', '#7c3f1d'][k]} />)}
                <Etiqueta x={760} y={700} texto="150 personas" op={e1(t, M('p150'))} c={c} id={ID} />
                <Chip x={760} y={300} texto="lunes, en la mañana" c={c} id={ID} op={ventana(t, M('lunes'), M('guerra'))} />
                <g opacity={ventana(t, M('guerra') - 0.3, M('cambio'))}>
                  <Burbuja x={230} y={560} w={500} texto="Estamos en una guerra por cuota de mercado." u={ac(t, M('guerra') - 0.3, M('guerra') + 1.6)} c={c} id={ID} />
                </g>
                <g opacity={ventana(t, M('cambio'), M('supervisor'))}>
                  <Burbuja x={230} y={560} w={500} texto="Cambio la estructura para ejecutar mejor." u={ac(t, M('cambio'), M('cambio') + 1.6)} c={c} id={ID} marca />
                </g>
                <g opacity={ventana(t, M('supervisor'), M('nuevoOrg'))}>
                  <Burbuja x={230} y={560} w={500} texto="La mayoría sigue en su trabajo." u={ac(t, M('supervisor') - 0.5, M('supervisor') + 1)} c={c} id={ID} />
                </g>
                <g opacity={e1(t, M('nuevoOrg'))}><Organigrama x={560} y={460} s={0.85} c={c} id={ID} /></g>
                <g opacity={ventana(t, M('hora1045'), M('pizza'))}>
                  <Reloj x={980} y={360} s={1.2} c={c} progreso={0.875} />
                  <Txt x={980} y={470} textAnchor="middle" fontSize={44} fill={`url(#${ID}-marcaH)`}>10:45</Txt>
                  <Etiqueta x={980} y={520} texto="hasta el mediodía" op={e1(t, M('molestarse'))} c={c} id={ID} />
                </g>
                <g opacity={ventana(t, M('pizza'), M('laUna'))} transform={`translate(980 400) rotate(${t * 20})`}>
                  <circle r={70} fill="#f59e0b" /><circle r={58} fill="#fbbf24" />
                  {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={34 * Math.cos(k * 1.3)} cy={34 * Math.sin(k * 1.3)} r={9} fill="#dc2626" />)}
                </g>
                <g opacity={e1(t, M('laUna'))}>
                  <Txt x={980} y={420} textAnchor="middle" fontSize={64} fill={`url(#${ID}-marcaH)`}>13:00</Txt>
                  <Etiqueta x={980} y={480} texto="nuevos puestos" op={1} c={c} id={ID} />
                </g>
              </g>
            )}

            {/* C · dos equipos de bomberos y un mapa flexible */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const fila = (y: number, mangueras: number, t0: number, txt: string, marca: boolean) => (
                    <g opacity={e1(t, t0)}>
                      {Array.from({ length: 7 }, (_, k) => <Bombero key={k} x={280 + k * 100} y={y} manguera={k >= 7 - mangueras} c={c} id={ID} t={t} />)}
                      <Etiqueta x={1040} y={y - 30} texto={txt} op={1} c={c} id={ID} marca={marca} />
                    </g>
                  );
                  return (
                    <g>
                      {fila(430, 2, M('cincoBaldes'), 'el suyo', false)}
                      {fila(620, 4, M('tresBaldes'), 'el rival', true)}
                      <Chip x={600} y={710} texto="no es política" c={c} id={ID} op={ventana(t, M('politica'), M('mapa'))} />
                      <Chip x={600} y={710} texto="mapa de responsabilidades" c={c} id={ID} op={e1(t, M('mapa'))} marca />
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
