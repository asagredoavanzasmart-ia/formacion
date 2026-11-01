import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Chip, Etiqueta, Gesto, Hoja, PanelPregunta, Reloj, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { Cierre } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «La espiral del silencio» (Perlow y Williams), escena propia. Acto A: las diferencias se hunden bajo la
 * superficie del agua; una espiral se cierra pasando por ansiedad, distancia, miedo y desconfianza. Acto
 * B: Maria y Max: tres silencios que se cuentan, el cliente tibio y la grieta entre ambos que se vuelve un
 * abismo. Acto C: Shoney y su colega: el puente entre ellos se corta y aparecen dos informes duplicados.
 * Acto D: la trampa de la velocidad: el granjero que va despacio llega en una hora; el que corre pierde
 * las manzanas en un bache.
 */

const ID = 'ce2l';
const nombres = ['superficie', 'ansiedad', 'distanciamos', 'miedo', 'desconfianza', 'espiral', 'maria', 'max', 'presentacion', 'volvio', 'tibieza', 'perdioValor', 'destruidas', 'ironia', 'insalvable', 'shoney', 'asistente', 'dejo', 'duplicado', 'velocidad', 'granjero', 'despacio', 'rapido', 'manzanas', 'pregunta'] as const;

/* Carreta del granjero con manzanas. `caen` de 0 a 1 las desparrama. */
const Carreta: React.FC<{ x: number; y: number; caen: number; c: ReturnType<typeof tono>; t: number }> = ({ x, y, caen, c, t }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-80} y={-60} width={160} height={50} rx={8} fill="#a16207" />
    {Array.from({ length: 7 }, (_, k) => {
      const dx = -60 + (k % 4) * 36 + (Math.floor(k / 4) * 18);
      const dy = -70 - Math.floor(k / 4) * 22;
      const sale = caen * (k % 2 ? 1 : 0.8);
      return <circle key={k} cx={dx + sale * (60 + k * 30)} cy={dy + sale * (90 - (k % 3) * 6)} r={14} fill="#dc2626" />;
    })}
    <circle cx={-50} cy={0} r={22} fill="#1f2937" /><circle cx={50} cy={0} r={22} fill="#1f2937" />
    <line x1={-50} y1={0} x2={-50 + 18 * Math.cos(t * 6)} y2={18 * Math.sin(t * 6)} stroke="#9ca3af" strokeWidth={4} />
    <path d="M -80 -40 L -130 -30" stroke={c.tenue} strokeWidth={6} />
  </g>
);

export const EspiralCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('manzanas') + 1.2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Callar no resuelve'], [M('superficie'), 'Bajo la superficie'], [M('espiral'), 'La espiral del silencio'], [M('maria'), 'Maria y Max'],
    [M('tibieza'), 'Un cliente tibio'], [M('ironia'), 'La ironía'], [M('shoney'), 'Shoney'], [M('duplicado'), 'Trabajo duplicado'],
    [M('velocidad'), 'La trampa de la velocidad'], [M('granjero'), 'El granjero'],
  ];

  const aA = ventana(t, -1, M('maria'));
  const aB = ventana(t, M('maria'), M('shoney'));
  const aC = ventana(t, M('shoney'), M('velocidad'));
  const aD = ac(t, M('velocidad'), M('velocidad') + 0.4);

  /* Puntos de la espiral: de afuera hacia adentro. */
  const espiralPath = (u: number) => {
    const pts: string[] = [];
    const n = Math.max(2, Math.round(160 * u));
    for (let i = 0; i <= n; i++) { const a = i * 0.12; const r = 210 - i * 1.15; pts.push(`${i ? 'L' : 'M'} ${600 + r * Math.cos(a)} ${510 + r * 0.8 * Math.sin(a)}`); }
    return pts.join(' ');
  };

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cada silencio trae más miedo y más silencio: la espiral del silencio">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · bajo la superficie y la espiral */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const hunde = ac(t, M('superficie'), M('superficie') + 2);
                  const espiral = ac(t, M('ansiedad'), M('espiral'));
                  return (
                    <g>
                      <g opacity={ventana(t, -1, M('ansiedad') + 0.6)}>
                        <rect x={140} y={430} width={920} height={360} rx={20} fill="#93c5fd" opacity={0.4} />
                        <path d={`M 140 430 ${Array.from({ length: 24 }, (_, k) => `Q ${160 + k * 40} ${420 + 8 * Math.sin(t * 2 + k)} ${180 + k * 40} 430`).join(' ')}`} stroke="#60a5fa" strokeWidth={4} fill="none" />
                        <circle cx={500} cy={380 + 260 * hunde} r={50} fill={NARANJA} />
                        <rect x={650} y={330 + 260 * hunde} width={100} height={100} rx={10} fill={ROSA} />
                      </g>
                      <g opacity={e1(t, M('ansiedad'))}>
                        <path d={espiralPath(espiral)} stroke={`url(#${ID}-marca)`} strokeWidth={8} fill="none" strokeLinecap="round" />
                        {([['ansiedad', 380, 330, M('ansiedad')], ['distancia', 860, 360, M('distanciamos')], ['más miedo', 880, 680, M('miedo')], ['desconfianza', 340, 700, M('desconfianza')]] as const).map(([txt, x, y, t0]) => <Chip key={txt} x={x} y={y} texto={txt} c={c} id={ID} op={e1(t, t0)} />)}
                        <Etiqueta x={600} y={520} texto="silencio" op={e1(t, M('espiral'))} c={c} id={ID} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · Maria y Max */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const silencios = [M('presentacion'), M('volvio'), M('perdioValor')].filter((x) => t > x).length;
                  const grieta = ac(t, M('ironia'), M('insalvable') + 1);
                  return (
                    <g>
                      <g transform={`translate(${-60 * grieta} 0)`}>
                        <Persona id={ID} x={280} y={760} cuerpo="#be185d" pelo="#5b3a26" />
                        <Gesto x={280} y={760} animo={0.3 - 0.3 * silencios - 0.2 * ac(t, M('destruidas'), M('destruidas') + 0.6)} />
                        <Cierre x={280} y={760} op={silencios > 0 ? 1 : 0} />
                        <Etiqueta x={280} y={820} texto="Maria" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('max'))} transform={`translate(${60 * grieta} 0)`}>
                        <Persona id={ID} x={920} y={760} cuerpo="#1f2937" corbata />
                        <Gesto x={920} y={760} animo={-0.2} />
                        <Etiqueta x={920} y={820} texto="Max, socio" op={1} c={c} id={ID} />
                      </g>
                      {/* tres silencios */}
                      <g opacity={ventana(t, M('presentacion'), M('ironia'))}>
                        {['presentación', 'datos', 'crítica'].map((txt, k) => (
                          <g key={txt} opacity={silencios > k ? 1 : 0.25}>
                            <circle cx={460 + k * 140} cy={320} r={36} fill={silencios > k ? '#374151' : c.panel2} />
                            <rect x={444 + k * 140} y={315} width={32} height={10} rx={4} fill="#d1d5db" opacity={silencios > k ? 1 : 0} />
                            <Txt f="a" x={460 + k * 140} y={390} textAnchor="middle" fontSize={24} fill={c.texto}>{txt}</Txt>
                          </g>
                        ))}
                      </g>
                      <g opacity={ventana(t, M('tibieza'), M('ironia'))}>
                        <rect x={580} y={460} width={40} height={160} rx={20} fill={c.panel2} />
                        <circle cx={600} cy={640} r={34} fill="#fbbf24" />
                        <rect x={588} y={540} width={24} height={100} rx={12} fill="#fbbf24" />
                        <Etiqueta x={600} y={710} texto="cliente tibio" op={1} c={c} id={ID} />
                      </g>
                      {/* la grieta que se vuelve abismo */}
                      <g opacity={e1(t, M('ironia'))}>
                        <path d={`M ${600 - 20 - 120 * grieta} 790 L ${600 - 10 - 60 * grieta} 640 L ${600 - 30 * grieta} 560 L ${600 + 30 * grieta} 560 L ${600 + 10 + 60 * grieta} 640 L ${600 + 20 + 120 * grieta} 790 Z`} fill="#1f2937" opacity={0.8} />
                        <Chip x={600} y={380} texto="distancia insalvable" c={c} id={ID} op={e1(t, M('insalvable'))} marca />
                        <Etiqueta x={600} y={290} texto="calló para proteger la relación" op={e1(t, M('ironia') + 0.4)} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · Shoney deja de colaborar */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const corta = ac(t, M('dejo'), M('dejo') + 1.2);
                  return (
                    <g>
                      <Persona id={ID} x={260} y={760} cuerpo="#0e7490" />
                      <Gesto x={260} y={760} animo={-0.4} />
                      <Cierre x={260} y={760} op={e1(t, M('dejo'))} />
                      <Etiqueta x={260} y={820} texto="Shoney" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('asistente') - 1)}>
                        <Persona id={ID} x={940} y={760} s={1.1} cuerpo="#1f2937" pelo="#9ca3af" corbata />
                        <Gesto x={940} y={760} s={1.1} animo={0.2} />
                        <Etiqueta x={940} y={820} texto="su colega" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('asistente'), M('dejo'))}>
                        <rect x={560} y={560} width={110} height={80} rx={6} fill={c.blanco} stroke={c.apagado} strokeWidth={3} transform={`translate(${-120 * ac(t, M('asistente'), M('asistente') + 1.2)} 0)`} />
                        <Chip x={600} y={330} texto="como a un asistente" c={c} id={ID} op={1} />
                      </g>
                      {/* el puente que se corta */}
                      <g opacity={e1(t, M('dejo') - 0.5)}>
                        <path d={`M 320 600 Q ${450} ${620 + 60 * corta} ${590 - 40 * corta} ${600 + 120 * corta}`} stroke={NARANJA} strokeWidth={10} fill="none" strokeLinecap="round" />
                        <path d={`M 880 600 Q ${750} ${620 + 60 * corta} ${610 + 40 * corta} ${600 + 120 * corta}`} stroke={NARANJA} strokeWidth={10} fill="none" strokeLinecap="round" />
                      </g>
                      <g opacity={e1(t, M('duplicado'))}>
                        <Hoja x={470} y={380} w={170} h={190} c={c} cabeza={NARANJA} titulo="" llena={1} />
                        <Hoja x={730} y={380} w={170} h={190} c={c} cabeza={NARANJA} titulo="" llena={1} />
                        <Txt x={600} y={400} textAnchor="middle" fontSize={56} fill={ROSA}>=</Txt>
                        <Etiqueta x={600} y={520} texto="trabajo duplicado" op={1} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · el granjero y las manzanas */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const lento = ac(t, M('despacio'), M('despacio') + 3);
                  const rapido = ac(t, M('rapido'), M('rapido') + 1.2);
                  const caen = ac(t, M('manzanas'), M('manzanas') + 0.8);
                  return (
                    <g>
                      <Chip x={600} y={250} texto="la prisa hace callar" c={c} id={ID} op={ventana(t, M('velocidad'), M('granjero'))} />
                      <g opacity={e1(t, M('granjero'))}>
                        {/* camino de arriba: despacio */}
                        <path d="M 150 460 H 1050" stroke={c.apagado} strokeWidth={6} />
                        <Carreta x={250 + 580 * lento} y={455} caen={0} c={c} t={t * (0.5 + lento)} />
                        <rect x={1000} y={330} width={70} height={130} rx={6} fill={c.panel2} />
                        <Etiqueta x={1035} y={510} texto="mercado" op={1} c={c} id={ID} />
                        <Etiqueta x={500} y={310} texto="despacio: una hora" op={e1(t, M('despacio'))} c={c} id={ID} marca />
                        {/* camino de abajo: rápido, con bache */}
                        <path d="M 150 720 H 560 Q 600 690 640 720 H 1050" stroke={c.apagado} strokeWidth={6} fill="none" />
                        <g opacity={e1(t, M('rapido'))}><Carreta x={250 + 350 * rapido} y={715 - 30 * caen} caen={caen} c={c} t={t * 3} /></g>
                        <Etiqueta x={860} y={800} texto="rápido: todo el día" op={e1(t, M('manzanas'))} c={c} id={ID} />
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
