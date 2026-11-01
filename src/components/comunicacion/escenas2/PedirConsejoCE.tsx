import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, Hoja, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Pedir consejo bien» (Garvin y Margolis), escena propia. Arriba, un contador de cinco tropiezos. Acto A:
 * pedir consejo con la respuesta ya decidida, buscando validación; consejeros clonados, de la misma
 * industria y formación. Acto B: Kennedy deja a Goldberg encerrado en la caja de su cargo, aunque sabía de
 * guerrillas, y Bahía de Cochinos se tacha. Acto C: el relato interminable, el consejo que va a la basura
 * (casi dos tercios entre quienes tienen poder) y el consejero seguro que no necesariamente acierta. Acto
 * D: «cuando eliges a tus consejeros, eliges tu consejo»: un directorio personal diverso que te dice lo que
 * no quieres oír, elegido según lo que te falta, y un retrato fiel de tu situación.
 */

const ID = 'ce2t';
const nombres = ['garvin', 'tropiezos', 'respuesta', 'validacion', 'elegirMal', 'peor', 'industria', 'menosCambio', 'kennedy', 'goldberg', 'bahia', 'encasillo', 'guerrilleras', 'regulares', 'definirMal', 'interminable', 'descartar', 'dosTercios', 'mitad', 'juzgar', 'seguro', 'christensen', 'eliges', 'directorio', 'noOir', 'falta', 'justo', 'retrato', 'pregunta'] as const;

/* Gráfico de torta: fracción f en color. */
const Torta: React.FC<{ x: number; y: number; r: number; f: number; color: string; c: ReturnType<typeof tono> }> = ({ x, y, r, f, color, c }) => {
  const a = 2 * Math.PI * Math.min(0.999, f);
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={c.panel2} />
      <path d={`M 0 0 L 0 ${-r} A ${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${r * Math.sin(a)} ${-r * Math.cos(a)} Z`} fill={color} />
    </g>
  );
};

export const PedirConsejoCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('retrato') + 0.8 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Pedir consejo'], [M('respuesta'), 'Ya tienes la respuesta'], [M('elegirMal'), 'Elegir mal'], [M('kennedy'), 'Kennedy y Goldberg'],
    [M('definirMal'), 'Definir mal el problema'], [M('descartar'), 'Descartar el consejo'], [M('juzgar'), 'Juzgar mal su calidad'], [M('christensen'), 'C. Roland Christensen'],
    [M('directorio'), 'Tu directorio personal'], [M('justo'), 'Cuenta lo justo'],
  ];

  const tropiezos = [M('respuesta'), M('elegirMal'), M('definirMal'), M('descartar'), M('juzgar')];
  const cuenta = tropiezos.filter((x) => t > x).length;
  const aA = ventana(t, -1, M('kennedy'));
  const aB = ventana(t, M('kennedy'), M('definirMal'));
  const aC = ventana(t, M('definirMal'), M('christensen'));
  const aD = ac(t, M('christensen'), M('christensen') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cinco tropiezos al pedir consejo; cuando eliges a tus consejeros, eliges tu consejo">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            {/* contador de tropiezos */}
            <g opacity={e1(t, M('tropiezos')) * (1 - aD)}>
              {Array.from({ length: 5 }, (_, k) => (
                <g key={k} transform={`translate(${420 + k * 90} 170)`}>
                  <circle r={30} fill={k < cuenta ? `url(#${ID}-marca)` : c.panel2} />
                  <Txt x={0} y={13} textAnchor="middle" fontSize={34} fill={k < cuenta ? '#fff' : c.tenue}>{k + 1}</Txt>
                </g>
              ))}
            </g>

            {/* A · la respuesta decidida y los consejeros clonados */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const clones = e1(t, M('industria'));
                  return (
                    <g>
                      <Persona id={ID} x={220} y={760} cuerpo="#334155" corbata />
                      <Gesto x={220} y={760} animo={0.6} />
                      <Etiqueta x={220} y={820} texto={t > M('peor') ? 'director' : 'quien pide'} op={e1(t, M('garvin'))} c={c} id={ID} />
                      <g opacity={ventana(t, M('respuesta'), M('elegirMal'))}>
                        <Burbuja x={250} y={560} w={380} texto="¿Verdad que tengo razón?" u={ac(t, M('validacion') - 0.6, M('validacion') + 0.8)} c={c} id={ID} />
                        <Persona id={ID} x={940} y={760} cuerpo="#0f766e" />
                        <Gesto x={940} y={760} animo={-0.3 * ac(t, M('validacion') + 1, M('validacion') + 2)} />
                        <Etiqueta x={940} y={820} texto="consejero" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('elegirMal'))}>
                        {[620, 760, 900, 1040].map((x) => (
                          <g key={x} opacity={clones}>
                            <Persona id={ID} x={x} y={760} s={0.8} cuerpo="#334155" corbata />
                            <Gesto x={x} y={760} s={0.8} animo={0.4} />
                          </g>
                        ))}
                        <Chip x={830} y={420} texto="misma industria" c={c} id={ID} op={clones} />
                        <Chip x={500} y={330} texto="peor desempeño" c={c} id={ID} op={e1(t, M('peor'))} />
                        <Chip x={830} y={510} texto="menos cambio" c={c} id={ID} op={e1(t, M('menosCambio'))} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · Kennedy y Goldberg */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const caja = ac(t, M('encasillo'), M('encasillo') + 1);
                  return (
                    <g>
                      <Persona id={ID} x={220} y={760} cuerpo="#1e3a8a" corbata />
                      <Gesto x={220} y={760} animo={0.3} />
                      <Etiqueta x={220} y={820} texto="Kennedy" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('goldberg'))}>
                        <Persona id={ID} x={900} y={760} cuerpo="#475569" corbata />
                        <Gesto x={900} y={760} animo={-0.2 * caja} />
                        <Etiqueta x={900} y={820} texto="Goldberg" op={1} c={c} id={ID} />
                        <rect x={800} y={560} width={200} height={220} rx={10} fill="none" stroke={c.tenue} strokeWidth={8} opacity={caja} />
                        <Txt f="a" x={900} y={548} textAnchor="middle" fontSize={26} fill={c.texto} opacity={caja}>Trabajo</Txt>
                        <g opacity={e1(t, M('guerrilleras'))}>
                          <circle cx={1060} cy={420} r={34} fill="#4d7c0f" />
                          <Estrella5 x={1060} y={420} />
                          <Etiqueta x={1060} y={490} texto="guerrillas" op={1} c={c} id={ID} />
                        </g>
                      </g>
                      <g opacity={e1(t, M('bahia'))}>
                        <path d="M 400 300 Q 460 260 540 300 Q 600 330 640 300 Q 700 280 720 340 Q 700 420 620 420 Q 560 440 480 420 Q 400 400 400 300 Z" fill="#86efac" opacity={0.7} />
                        <path d="M 520 360 Q 560 380 600 360" stroke="#60a5fa" strokeWidth={14} fill="none" />
                        <Etiqueta x={560} y={480} texto="Bahía de Cochinos" op={1} c={c} id={ID} />
                        <g opacity={e1(t, M('regulares'))}><Cruz x={700} y={300} s={1} /></g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · definir mal, descartar, juzgar mal */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const largo = ac(t, M('interminable'), M('interminable') + 2.5);
                  return (
                    <g>
                      <g opacity={ventana(t, M('definirMal'), M('descartar'))}>
                        <rect x={380} y={260} width={240} height={140 + 380 * largo} rx={10} fill={c.blanco} stroke={c.apagado} strokeWidth={3} />
                        {Array.from({ length: Math.round(4 + 12 * largo) }, (_, k) => <rect key={k} x={400} y={290 + k * 30} width={200} height={8} rx={4} fill={c.apagado} />)}
                        <rect x={680} y={420} width={320} height={120} rx={10} fill="#1f2937" opacity={0.85} />
                        <Txt f="a" x={840} y={490} textAnchor="middle" fontSize={26} fill="#fff">lo incómodo</Txt>
                      </g>
                      <g opacity={ventana(t, M('descartar'), M('juzgar'))}>
                        <path d="M 440 560 H 600 L 585 760 H 455 Z" fill={c.tenue} />
                        <rect x={430} y={540} width={180} height={24} rx={8} fill={c.apagado} />
                        {[0, 1, 2].map((k) => { const u = ((t * 0.6) + k / 3) % 1; return <rect key={k} x={500 + 20 * Math.sin(k)} y={300 + 240 * u} width={44} height={34} rx={4} fill="#fde68a" opacity={Math.sin(Math.PI * u)} transform={`rotate(${u * 180} 522 ${317 + 240 * u})`} />; })}
                        <g opacity={e1(t, M('dosTercios'))}>
                          <Torta x={820} y={420} r={80} f={0.66 * ac(t, M('dosTercios'), M('dosTercios') + 1)} color={ROSA} c={c} />
                          <Etiqueta x={820} y={540} texto="con poder" op={1} c={c} id={ID} />
                        </g>
                        <g opacity={e1(t, M('mitad'))}>
                          <Torta x={820} y={680} r={56} f={0.33 * ac(t, M('mitad'), M('mitad') + 1)} color={c.tenue} c={c} />
                          <Etiqueta x={980} y={690} texto="los demás" op={1} c={c} id={ID} />
                        </g>
                      </g>
                      <g opacity={e1(t, M('juzgar'))}>
                        <Persona id={ID} x={400} y={760} s={1.15} cuerpo="#dc2626" corbata />
                        <Gesto x={400} y={760} s={1.15} animo={0.8} />
                        <Etiqueta x={400} y={820} texto="muy seguro" op={e1(t, M('seguro'))} c={c} id={ID} />
                        <Persona id={ID} x={820} y={760} s={0.85} cuerpo="#0f766e" />
                        <Gesto x={820} y={760} s={0.85} animo={0.2} />
                        <Visto x={860} y={560} s={0.8} />
                        <Chip x={600} y={330} texto="seguridad ≠ razón" c={c} id={ID} op={e1(t, M('seguro') + 1)} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · tu directorio personal */}
            {aD > 0.01 && (
              <g opacity={aD}>
                <Chip x={600} y={210} texto="eliges tu consejo" c={c} id={ID} op={e1(t, M('eliges'))} marca />
                <g opacity={e1(t, M('directorio'))}>
                  {[[380, '#0f766e'], [520, '#7c3aed'], [680, '#a16207'], [820, '#be185d']].map(([x, col], k) => (
                    <g key={k}>
                      <Persona id={ID} x={x as number} y={600} s={0.75} cuerpo={col as string} pelo={['#2b1a12', '#c49a6c', '#9ca3af', '#5b3a26'][k]} />
                      <Gesto x={x as number} y={600} s={0.75} animo={0.3} />
                    </g>
                  ))}
                  <rect x={300} y={590} width={600} height={24} rx={10} fill={c.apagado} />
                  <Persona id={ID} x={1010} y={760} cuerpo="#334155" corbata />
                  <Gesto x={1010} y={760} animo={0.2 - 0.4 * ventana(t, M('noOir'), M('falta'))} />
                  <Etiqueta x={1010} y={820} texto="tú" op={1} c={c} id={ID} />
                </g>
                <Chip x={600} y={330} texto="lo que no quieres oír" c={c} id={ID} op={ventana(t, M('noOir'), M('justo'))} />
                <g opacity={ventana(t, M('falta'), M('justo'))}>
                  <Chip x={600} y={720} texto="según lo que te falta" c={c} id={ID} op={1} />
                </g>
                <g opacity={e1(t, M('justo'))}>
                  <rect x={460} y={660} width={280} height={150} rx={8} fill="#a16207" />
                  <rect x={476} y={676} width={248} height={118} fill={c.panel2} />
                  <circle cx={600} cy={722} r={22} fill="#e2a37c" /><path d="M 560 794 Q 600 742 640 794 Z" fill="#334155" />
                  <Chip x={600} y={330} texto="un retrato fiel" c={c} id={ID} op={e1(t, M('retrato'))} marca />
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

/* Estrella pequeña de insignia militar. */
const Estrella5: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const pts = Array.from({ length: 10 }, (_, k) => { const a = (Math.PI / 5) * k - Math.PI / 2; const r = k % 2 ? 8 : 18; return `${x + Math.cos(a) * r},${y + Math.sin(a) * r}`; }).join(' ');
  return <polygon points={pts} fill="#fde68a" />;
};
