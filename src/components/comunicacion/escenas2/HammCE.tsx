import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, PanelPregunta, Reloj, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { Cierre, Palancas } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Palabras que alinean o dispersan» (John Hamm), escena propia. Acto A: el líder repite frases hechas;
 * cada gerente asiente pero imagina una forma distinta (círculo, cuadrado, triángulo), calla su duda y
 * baja órdenes vagas que se desvían; tiempo perdido y rumores. Acto B: el equipo de urgencias, donde cada
 * palabra es exacta porque si no muere gente; en la empresa nadie muere, pero dos personas tiran de una
 * cuerda en sentidos cruzados. Acto C: el maquinista y sus cinco palancas, que se nombran una a una. Acto
 * D: la precisión se multiplica: un director, diez personas y, detrás, cuatrocientas alineadas.
 */

const ID = 'ce2b';
const nombres = ['caos', 'hamm', 'cientos', 'a1999', 'frases', 'prioridades', 'cliente', 'entienden', 'asienten', 'tontos', 'ordenes', 'interpretacion', 'perdido', 'urgencias', 'muere', 'nadieMuere', 'cruzados', 'futuro', 'herramienta', 'maquinista', 'palancas', 'estructura', 'financieros', 'propio', 'tiempo', 'cultura', 'multiplica', 'diez', 'cuarenta', 'pregunta'] as const;

/* Forma que imagina cada gerente: 0 círculo, 1 cuadrado, 2 triángulo. */
const Forma: React.FC<{ k: number; x: number; y: number; color: string }> = ({ k, x, y, color }) =>
  k === 0 ? <circle cx={x} cy={y} r={22} fill={color} /> : k === 1 ? <rect x={x - 20} y={y - 20} width={40} height={40} rx={4} fill={color} /> : <path d={`M ${x} ${y - 24} L ${x + 24} ${y + 18} L ${x - 24} ${y + 18} Z`} fill={color} />;

export const HammCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('cuarenta') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Escucha a los líderes'], [M('hamm'), 'John Hamm'], [M('frases'), 'Frases hechas'], [M('entienden'), 'Cada uno entiende algo'],
    [M('tontos'), 'Nadie pregunta'], [M('ordenes'), 'Órdenes vagas'], [M('perdido'), 'Tiempo perdido'], [M('urgencias'), 'Precisión de urgencias'],
    [M('nadieMuere'), 'Propósitos cruzados'], [M('futuro'), 'El trabajo del líder'], [M('maquinista'), 'El maquinista'], [M('palancas'), 'Cinco palancas'],
    [M('multiplica'), 'La claridad se multiplica'],
  ];

  const aA = ventana(t, -1, M('urgencias'));
  const aB = ventana(t, M('urgencias'), M('futuro'));
  const aC = ventana(t, M('futuro'), M('multiplica'));
  const aD = ac(t, M('multiplica'), M('multiplica') + 0.4);
  const gerentes = [580, 780, 980];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Las frases vagas del líder dispersan a la organización; las palabras precisas la alinean">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · frases hechas, gerentes que asienten y órdenes vagas */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const asiente = (k: number) => (t > M('asienten') && t < M('tontos') + 2 ? 6 * Math.sin(t * 6 + k) : 0);
                  const baja = ac(t, M('ordenes'), M('ordenes') + 1.2);
                  const desvia = ac(t, M('interpretacion'), M('interpretacion') + 1.2);
                  return (
                    <g>
                      <g opacity={e1(t, M('hamm'))}>
                        <Persona id={ID} x={200} y={760} cuerpo="#334155" corbata />
                        <Gesto x={200} y={760} animo={0.4} />
                        <Etiqueta x={200} y={820} texto="el líder" op={1} c={c} id={ID} />
                      </g>
                      <Chip x={600} y={260} texto="cientos de directores" c={c} id={ID} op={ventana(t, M('cientos'), M('frases'))} />
                      <Chip x={600} y={350} texto="IBM, 1999" c={c} id={ID} op={ventana(t, M('a1999'), M('frases'))} />
                      <g opacity={ventana(t, M('prioridades') - 0.3, M('cliente'))}>
                        <Burbuja x={230} y={560} w={460} texto="Enfoquémonos en las prioridades clave." u={ac(t, M('prioridades') - 0.3, M('prioridades') + 1.4)} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('cliente'), M('entienden') + 0.4)}>
                        <Burbuja x={230} y={560} w={420} texto="El cliente es primero." u={ac(t, M('cliente'), M('cliente') + 1)} c={c} id={ID} marca />
                      </g>
                      {gerentes.map((x, k) => (
                        <g key={x} opacity={e1(t, M('frases') + k * 0.3)}>
                          <g transform={`translate(0 ${asiente(k)})`}>
                            <Persona id={ID} x={x} y={760} s={0.85} cuerpo={['#475569', '#0f766e', '#64748b'][k]} />
                            <Gesto x={x} y={760} s={0.85} animo={0.3} />
                          </g>
                          <Cierre x={x} y={760} s={0.85} op={ventana(t, M('tontos'), M('ordenes'))} />
                          {/* lo que imagina cada uno */}
                          <g opacity={ventana(t, M('entienden'), M('ordenes'))}>
                            <circle cx={x - 20} cy={600} r={7} fill={c.panel2} /><circle cx={x - 8} cy={570} r={11} fill={c.panel2} />
                            <ellipse cx={x} cy={500} rx={70} ry={52} fill={c.panel2} />
                            <Forma k={k} x={x} y={500} color={[NARANJA, ROSA, '#7c3aed'][k]} />
                          </g>
                          {/* las órdenes vagas que bajan y se desvían */}
                          <g opacity={ventana(t, M('ordenes'), M('urgencias'))}>
                            <path d={`M ${x} 420 Q ${x + (k - 1) * 120 * desvia} ${420 + 120 * baja} ${x + (k - 1) * 220 * desvia} ${420 + 150 * baja}`} stroke={[NARANJA, ROSA, '#7c3aed'][k]} strokeWidth={6} fill="none" strokeDasharray="12 10" strokeLinecap="round" opacity={baja} />
                          </g>
                        </g>
                      ))}
                      <Etiqueta x={780} y={820} texto="gerentes" op={e1(t, M('frases') + 0.6)} c={c} id={ID} />
                      <g opacity={e1(t, M('perdido'))}>
                        <Reloj x={420} y={320} s={1.1} c={c} progreso={(t * 0.4) % 1} />
                        <Chip x={420} y={420} texto="rumores" c={c} id={ID} op={e1(t, M('perdido') + 0.8)} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · urgencias frente a la oficina */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const oficina = ac(t, M('nadieMuere') - 0.2, M('nadieMuere') + 0.6);
                  const tira = Math.sin(t * 3) * 14;
                  return (
                    <g>
                      <g opacity={1 - oficina}>
                        <rect x={360} y={560} width={480} height={34} rx={14} fill={c.apagado} />
                        <rect x={380} y={594} width={18} height={150} fill={c.apagado} /><rect x={802} y={594} width={18} height={150} fill={c.apagado} />
                        {[320, 600, 880].map((x, k) => (
                          <g key={x}>
                            <Persona id={ID} x={x} y={760} s={0.95} cuerpo="#0f766e" pelo={['#2b1a12', '#5b3a26', '#9ca3af'][k]} />
                            <Gesto x={x} y={760} s={0.95} animo={0.2} />
                          </g>
                        ))}
                        {/* monitor cardiaco */}
                        <rect x={460} y={260} width={280} height={160} rx={14} fill="#0f172a" />
                        <path d={Array.from({ length: 28 }, (_, k) => { const x = 475 + k * 9.5; const fase = ((k + Math.floor(t * 12)) % 14); const y = fase === 6 ? 300 : fase === 7 ? 390 : 345; return `${k ? 'L' : 'M'} ${x} ${y}`; }).join(' ')} stroke="#22c55e" strokeWidth={4} fill="none" />
                        <Chip x={600} y={480} texto="cada palabra, exacta" c={c} id={ID} op={e1(t, M('urgencias') + 1.2)} marca />
                        <Etiqueta x={950} y={330} texto="si no, muere gente" op={e1(t, M('muere'))} c={c} id={ID} />
                      </g>
                      <g opacity={oficina}>
                        <Persona id={ID} x={300} y={760} cuerpo="#334155" />
                        <Gesto x={300} y={760} animo={-0.4} />
                        <Persona id={ID} x={900} y={760} cuerpo="#0f766e" />
                        <Gesto x={900} y={760} animo={-0.4} />
                        <path d={`M 350 650 Q 600 ${640 + tira} 850 650`} stroke="#a16207" strokeWidth={10} fill="none" strokeLinecap="round" />
                        <path d="M 520 520 L 380 520 M 400 500 L 380 520 L 400 540" stroke={NARANJA} strokeWidth={8} fill="none" strokeLinecap="round" />
                        <path d="M 680 520 L 820 520 M 800 500 L 820 520 L 800 540" stroke={ROSA} strokeWidth={8} fill="none" strokeLinecap="round" />
                        <Chip x={600} y={380} texto="propósitos cruzados" c={c} id={ID} op={e1(t, M('cruzados'))} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · el maquinista y sus cinco palancas */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <Chip x={600} y={250} texto="un futuro mejor" c={c} id={ID} op={ventana(t, M('futuro'), M('maquinista'))} />
                <Chip x={600} y={340} texto="comunicación clara" c={c} id={ID} op={ventana(t, M('herramienta'), M('maquinista'))} marca />
                <g opacity={e1(t, M('maquinista'))}>
                  {/* la locomotora */}
                  <rect x={90} y={460} width={640} height={250} rx={24} fill="#1f2937" />
                  <rect x={110} y={480} width={180} height={120} rx={12} fill="#93c5fd" opacity={0.5} />
                  <rect x={720} y={560} width={90} height={150} rx={12} fill="#374151" />
                  {[200, 400, 600].map((x) => <circle key={x} cx={x} cy={730} r={42} fill="#111827" stroke="#6b7280" strokeWidth={8} />)}
                  <Persona id={ID} x={200} y={600} s={0.7} cuerpo="#1e3a8a" />
                  <Gesto x={200} y={600} s={0.7} animo={0.5} />
                </g>
                <Palancas t={t} entra={[M('estructura'), M('financieros'), M('propio'), M('tiempo'), M('cultura')]} activo={-1} c={c} id={ID} y={560} x0={360} paso={80} />
                {['estructura', 'resultados', 'su trabajo', 'el tiempo', 'la cultura'].map((txt, k) => (
                  <Chip key={txt} x={980} y={280 + k * 88} texto={txt} c={c} id={ID} op={e1(t, [M('estructura'), M('financieros'), M('propio'), M('tiempo'), M('cultura')][k])} />
                ))}
              </g>
            )}

            {/* D · la claridad se multiplica */}
            {aD > 0.01 && (
              <g opacity={aD}>
                <rect x={550} y={230} width={100} height={60} rx={12} fill={`url(#${ID}-marca)`} />
                <Txt f="a" x={600} y={270} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">1</Txt>
                {Array.from({ length: 10 }, (_, k) => {
                  const x = 195 + k * 90;
                  const u = ac(t, M('diez') + k * 0.08, M('diez') + k * 0.08 + 0.4);
                  return (
                    <g key={k} opacity={u}>
                      <path d={`M 600 290 L ${x} 380`} stroke={NARANJA} strokeWidth={3} opacity={0.6} />
                      <circle cx={x} cy={400} r={22} fill={NARANJA} />
                      {Array.from({ length: 40 }, (_, j) => {
                        const v = ac(t, M('cuarenta') + j * 0.02, M('cuarenta') + j * 0.02 + 0.3);
                        return <circle key={j} cx={x - 30 + (j % 5) * 15} cy={470 + Math.floor(j / 5) * 30} r={5} fill={ROSA} opacity={v} />;
                      })}
                    </g>
                  );
                })}
                <Etiqueta x={1080} y={410} texto="10" op={e1(t, M('diez'))} c={c} id={ID} />
                <Etiqueta x={600} y={750} texto="10 × 40 = 400 alineados" op={e1(t, M('cuarenta') + 1)} c={c} id={ID} marca />
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
