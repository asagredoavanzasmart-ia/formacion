import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { Cierre } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Por qué callamos» (Perlow y Williams), escena propia. Acto A: dos formas distintas que se esconden
 * bajo una alfombra; el retiro de los directivos donde todos repiten al anterior, la idea distinta se
 * tacha y se celebra un «consenso» que en privado era una pérdida de tiempo. Acto B: el rango: Robert,
 * un escalón más arriba, corta a Linda con «así se hace aquí» y ella calla. Acto C: Don calla por el bono
 * y el jefe esconde detrás de la espalda la crítica que no da, por cortesía. Acto D: Robert olvida, Linda
 * no; la historia corre por el personal, la gente se va por la puerta y, años después, «el mayor error de
 * mi carrera».
 */

const ID = 'ce2k';
const nombres = ['diferencia', 'valiosas', 'estatus', 'educacion', 'repetia', 'desechaba', 'consenso', 'perdida', 'rango', 'linda', 'robert', 'asiSeHace', 'nadaMas', 'estrategia', 'don', 'bono', 'pie', 'jefes', 'cortesia', 'olvido', 'gerencia', 'rotacion', 'error', 'pregunta'] as const;

export const DiferenciasCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('error') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Tapar la diferencia'], [M('estatus'), 'El grupo'], [M('repetia'), 'Todos repiten'], [M('consenso'), 'Un falso consenso'],
    [M('rango'), 'El rango'], [M('asiSeHace'), '«Así se hace aquí»'], [M('estrategia'), 'Callar por estrategia'], [M('jefes'), 'También callan los jefes'],
    [M('olvido'), 'Él olvidó, ella no'], [M('rotacion'), 'La rotación'], [M('error'), 'El mayor error'],
  ];

  const aA = ventana(t, -1, M('rango'));
  const aB = ventana(t, M('rango'), M('estrategia'));
  const aC = ventana(t, M('estrategia'), M('olvido'));
  const aD = ac(t, M('olvido'), M('olvido') + 0.4);
  const ronda = [260, 440, 620, 800, 980];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="El grupo, el rango, la estrategia y la cortesía hacen callar las diferencias">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · la alfombra y el falso consenso */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const tapa = ac(t, M('valiosas') + 2, M('valiosas') + 4);
                  return (
                    <g>
                      <g opacity={ventana(t, M('diferencia'), M('estatus'))}>
                        <circle cx={520} cy={500 + 40 * tapa} r={60} fill={NARANJA} />
                        <rect x={620} y={440 + 40 * tapa} width={120} height={120} rx={10} fill={ROSA} />
                        <path d={`M 360 ${640 - 80 * tapa} Q 600 ${560 - 120 * tapa} 840 ${640 - 80 * tapa} L 860 650 H 340 Z`} fill="#b45309" opacity={tapa} />
                        <Chip x={600} y={300} texto="inevitables y valiosas" c={c} id={ID} op={e1(t, M('valiosas'))} />
                      </g>
                      <g opacity={e1(t, M('estatus'))}>
                        {ronda.map((x, k) => (
                          <g key={x}>
                            <Persona id={ID} x={x} y={760} s={0.85} cuerpo={['#334155', '#475569', '#7c3aed', '#64748b', '#0f766e'][k]} corbata={k !== 2} />
                            <Gesto x={x} y={760} s={0.85} animo={k === 2 ? 0.3 - 0.6 * ac(t, M('desechaba'), M('desechaba') + 0.5) : 0.3 + 0.5 * ventana(t, M('consenso'), M('perdida'))} />
                          </g>
                        ))}
                        <Etiqueta x={620} y={820} texto="educación en línea" op={e1(t, M('educacion'))} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('repetia'), M('consenso'))}>
                        {[0, 1, 3, 4].map((k) => <g key={k} opacity={ac(t, M('repetia') + k * 0.3, M('repetia') + k * 0.3 + 0.3)}><rect x={ronda[k] - 60} y={520} width={120} height={46} rx={16} fill={c.panel} style={sombra(c.sombra, 2, 6)} /><Txt f="a" x={ronda[k]} y={552} textAnchor="middle" fontSize={26} fill={c.texto}>lo mismo</Txt></g>)}
                        <g opacity={e1(t, M('desechaba') - 1.5)}>
                          <rect x={560} y={440} width={120} height={46} rx={16} fill={NARANJA} />
                          <Txt f="a" x={620} y={472} textAnchor="middle" fontSize={26} fill="#fff">¿y si…?</Txt>
                          <g opacity={e1(t, M('desechaba'))}><Cruz x={690} y={440} s={0.7} /></g>
                        </g>
                      </g>
                      <g opacity={e1(t, M('consenso'))}>
                        <Chip x={600} y={320} texto="¡consenso!" c={c} id={ID} op={ventana(t, M('consenso'), M('perdida'))} marca />
                        <g opacity={e1(t, M('perdida'))}>
                          {ronda.map((x, k) => <g key={x}><circle cx={x + 30} cy={590} r={7} fill={c.panel2} /><ellipse cx={x + 40} cy={540} rx={60} ry={32} fill={c.panel2} /><Txt x={x + 40} y={552} textAnchor="middle" fontSize={28} fill={c.tenue}>…</Txt></g>)}
                          <Chip x={600} y={320} texto="pérdida de tiempo" c={c} id={ID} op={1} />
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · el rango: Linda y Robert */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <rect x={760} y={700} width={360} height={60} rx={10} fill={c.apagado} opacity={e1(t, M('robert'))} />
                <g opacity={e1(t, M('linda'))}>
                  <Persona id={ID} x={280} y={760} cuerpo="#be185d" pelo="#5b3a26" />
                  <Gesto x={280} y={760} animo={0.3 - 0.6 * ac(t, M('nadaMas'), M('nadaMas') + 0.6)} />
                  <Etiqueta x={280} y={820} texto="Linda" op={1} c={c} id={ID} />
                  <Cierre x={280} y={760} op={e1(t, M('nadaMas'))} />
                </g>
                <g opacity={e1(t, M('robert'))}>
                  <Persona id={ID} x={940} y={700} cuerpo="#1f2937" corbata />
                  <Gesto x={940} y={700} animo={-0.5 * ac(t, M('asiSeHace'), M('asiSeHace') + 0.5)} />
                  <Etiqueta x={940} y={820} texto="Robert, socio" op={1} c={c} id={ID} />
                </g>
                <g opacity={ventana(t, M('linda') + 0.6, M('asiSeHace'))}>
                  <Burbuja x={310} y={560} w={460} texto="Los abogados no evalúan con justicia a mi equipo." u={ac(t, M('linda') + 0.6, M('robert') + 1)} c={c} id={ID} />
                </g>
                <g opacity={e1(t, M('asiSeHace') - 0.3)}>
                  <Burbuja x={920} y={500} w={460} texto="Así se hace aquí, y así va a seguir." u={ac(t, M('asiSeHace') - 0.3, M('asiSeHace') + 1.2)} c={c} lado="der" id={ID} marca />
                </g>
              </g>
            )}

            {/* C · callar por el bono y por cortesía */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const jefe = ac(t, M('jefes') - 0.2, M('jefes') + 0.5);
                  return (
                    <g>
                      <g opacity={1 - jefe}>
                        <Persona id={ID} x={300} y={760} cuerpo="#0e7490" />
                        <Gesto x={300} y={760} animo={0.4} />
                        <Cierre x={300} y={760} op={e1(t, M('pie'))} />
                        <Etiqueta x={300} y={820} texto="Don, analista" op={e1(t, M('don'))} c={c} id={ID} />
                        <g opacity={e1(t, M('bono'))} transform={`translate(640 ${430 + 6 * Math.sin(t * 3)})`}>
                          <rect x={-90} y={-56} width={180} height={112} rx={12} fill="#bbf7d0" stroke="#15803d" strokeWidth={4} />
                          <Txt x={0} y={20} textAnchor="middle" fontSize={56} fill="#15803d">$</Txt>
                          <Txt f="a" x={0} y={100} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>buen bono</Txt>
                        </g>
                        <Chip x={880} y={250} texto="preguntas incómodas" c={c} id={ID} op={e1(t, M('pie') - 1.5)} />
                        <Chip x={880} y={330} texto="te disparas en el pie" c={c} id={ID} op={e1(t, M('pie'))} marca />
                      </g>
                      <g opacity={jefe}>
                        <Persona id={ID} x={420} y={760} cuerpo="#1f2937" corbata />
                        <Gesto x={420} y={760} animo={0.7} />
                        <Etiqueta x={420} y={820} texto="jefe" op={1} c={c} id={ID} />
                        <g transform="translate(330 640) rotate(-10)">
                          <rect x={-40} y={-50} width={80} height={100} rx={8} fill={c.blanco} stroke="#dc2626" strokeWidth={4} />
                          {[0, 1, 2].map((k) => <rect key={k} x={-26} y={-30 + k * 22} width={52} height={7} rx={3} fill="#fca5a5" />)}
                        </g>
                        <Persona id={ID} x={820} y={760} cuerpo="#0f766e" />
                        <Gesto x={820} y={760} animo={0.5} />
                        <Burbuja x={440} y={560} w={300} texto="¡Muy bien!" u={1} c={c} id={ID} />
                        <Chip x={820} y={380} texto="cortesía" c={c} id={ID} op={e1(t, M('cortesia'))} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · él olvidó, ella no; la rotación y el mayor error */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const corre = ac(t, M('gerencia') - 1, M('gerencia') + 2);
                  const salen = ac(t, M('rotacion'), M('rotacion') + 3);
                  return (
                    <g>
                      <Persona id={ID} x={200} y={760} cuerpo="#be185d" pelo="#5b3a26" />
                      <Gesto x={200} y={760} animo={-0.3} />
                      <Etiqueta x={200} y={820} texto="Linda" op={1} c={c} id={ID} />
                      <g opacity={ventana(t, M('olvido'), M('gerencia'))}>
                        <Persona id={ID} x={1000} y={760} cuerpo="#1f2937" corbata />
                        <Gesto x={1000} y={760} animo={0.3} />
                        <ellipse cx={1000} cy={500} rx={80} ry={50} fill={c.panel2} />
                        <Txt x={1000} y={512} textAnchor="middle" fontSize={32} fill={c.tenue}>…</Txt>
                        <ellipse cx={240} cy={500} rx={110} ry={60} fill={c.panel2} />
                        <Txt f="a" x={240} y={510} textAnchor="middle" fontSize={26} fill={c.texto}>«así se hace»</Txt>
                      </g>
                      {/* la historia corre por el personal */}
                      <g opacity={e1(t, M('gerencia') - 1)}>
                        {Array.from({ length: 12 }, (_, k) => {
                          const x = 420 + (k % 4) * 150, y = 340 + Math.floor(k / 4) * 120;
                          const roja = ac(corre, k / 14, k / 14 + 0.2);
                          const fuera = k % 3 === 0 ? salen : 0;
                          return (
                            <g key={k} transform={`translate(${fuera * (1100 - x + 60)} 0)`} opacity={1 - fuera}>
                              <circle cx={x} cy={y} r={20} fill={roja > 0.5 ? '#dc2626' : c.tenue} />
                              <path d={`M ${x - 28} ${y + 44} Q ${x} ${y + 10} ${x + 28} ${y + 44} Z`} fill={roja > 0.5 ? '#fca5a5' : c.apagado} />
                            </g>
                          );
                        })}
                        <Chip x={720} y={250} texto="«la gerencia no escucha»" c={c} id={ID} op={ventana(t, M('gerencia'), M('error'))} />
                      </g>
                      <g opacity={e1(t, M('rotacion'))}>
                        <rect x={1100} y={300} width={70} height={340} rx={8} fill="#a16207" />
                        <Etiqueta x={1000} y={690} texto="rotación" op={1} c={c} id={ID} marca />
                      </g>
                      <g opacity={e1(t, M('error') - 0.5)}>
                        <Burbuja x={720} y={316} w={600} texto="Robert: «Fue el mayor error de mi carrera»." u={ac(t, M('error') - 0.5, M('error') + 1.2)} c={c} lado="der" id={ID} marca />
                      </g>
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
