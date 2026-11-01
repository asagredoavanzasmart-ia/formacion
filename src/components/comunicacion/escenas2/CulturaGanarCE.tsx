import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Chip, Cruz, Etiqueta, Gesto, Hoja, PanelPregunta, Rotulo, Visto, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { Marcador, Palancas } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Una cultura de ganar» (Hamm, quinta palanca), escena propia. Acto A: el decreto tachado; la oficina de
 * la burbuja con jarras de cerveza, taca-taca y un jefe de cultura con gorro de fiesta que sonríe aunque
 * se pierda un cliente; el medidor de métricas tapado por el confeti y la etiqueta de precio por los
 * activos. Acto B: Jeff y su marcador de estadio: equipos de seis y, con números, qué significa ganar; la
 * meta de 20 millones dividida en partes; el compromiso con el éxito y no el paseo. Acto C: las cuatro
 * preguntas de cada mañana.
 */

const ID = 'ce2f';
const nombres = ['cultura', 'decreto', 'ganar', 'burbuja', 'cervezas', 'tacataca', 'jefeCultura', 'perdian', 'metricas', 'activos', 'jeff', 'deportivo', 'marcador', 'seis', 'significa', 'pe15', 'p20', 'p30', 'm20', 'partes', 'exito', 'paseo', 'manana', 'hoy', 'confusion', 'vaga', 'noComunicado', 'pregunta'] as const;

/* Jarra de cerveza. */
const Jarra: React.FC<{ x: number; y: number; c: ReturnType<typeof tono> }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={-60} width={44} height={60} rx={6} fill="#f59e0b" opacity={0.9} />
    <rect x={-24} y={-70} width={48} height={16} rx={8} fill={c.blanco} />
    <path d="M 22 -48 h 12 q 8 0 8 8 v 18 q 0 8 -8 8 h -12" stroke="#f59e0b" strokeWidth={6} fill="none" />
  </g>
);

export const CulturaGanarCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('noComunicado') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '5 · La cultura'], [M('decreto'), 'No por decreto'], [M('burbuja'), 'La burbuja de los noventa'], [M('perdian'), 'Felices al perder'],
    [M('activos'), 'Vendida por sus activos'], [M('jeff'), 'Jeff y su marcador'], [M('significa'), 'Qué significa ganar'], [M('m20'), 'La meta, en partes'],
    [M('exito'), 'Compromiso con el éxito'], [M('manana'), 'Cada mañana'],
  ];

  const aA = ventana(t, -1, M('jeff'));
  const aB = ventana(t, M('jeff'), M('manana'));
  const aC = ac(t, M('manana'), M('manana') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La cultura no se crea por decreto: nace de saber con números qué significa ganar">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <Palancas t={t} entra={[0, 0.1, 0.2, 0.3, 0.4]} activo={4} c={c} id={ID} />

            {/* A · la cultura por decreto y la fiesta de la burbuja */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const confeti = ac(t, M('jefeCultura'), M('jefeCultura') + 1);
                  return (
                    <g>
                      <g opacity={ventana(t, M('decreto'), M('burbuja'))}>
                        <Hoja x={600} y={460} w={260} h={300} c={c} cabeza={ROSA} titulo="decreto" llena={1} tituloTam={24} />
                        <g opacity={e1(t, M('decreto') + 0.8)}><Cruz x={700} y={340} s={1.1} /></g>
                        <Chip x={600} y={680} texto="expectativas de ganar" c={c} id={ID} op={e1(t, M('ganar'))} marca />
                      </g>
                      <g opacity={e1(t, M('burbuja'))}>
                        <rect x={140} y={600} width={420} height={24} rx={10} fill={c.apagado} />
                        <g opacity={e1(t, M('cervezas'))}>{[200, 290, 380, 470].map((x) => <Jarra key={x} x={x} y={600} c={c} />)}</g>
                        {/* el taca-taca */}
                        <g opacity={e1(t, M('tacataca'))}>
                          <rect x={620} y={560} width={340} height={150} rx={16} fill="#15803d" />
                          <rect x={630} y={570} width={320} height={130} rx={10} fill="#16a34a" />
                          {[0, 1, 2, 3].map((k) => <g key={k}><rect x={590} y={590 + k * 30} width={400} height={6} fill="#9ca3af" />{[0, 1, 2].map((j) => <rect key={j} x={680 + j * 90 + 10 * Math.sin(t * 5 + k)} y={582 + k * 30} width={12} height={22} rx={4} fill={k % 2 ? '#dc2626' : '#2563eb'} />)}</g>)}
                          <circle cx={790 + 60 * Math.sin(t * 2.4)} cy={635 + 30 * Math.sin(t * 3.1)} r={9} fill="#fff" />
                        </g>
                        <g opacity={e1(t, M('jefeCultura'))}>
                          <Persona id={ID} x={1060} y={760} cuerpo="#db2777" />
                          <Gesto x={1060} y={760} animo={0.9} />
                          <path d="M 1040 620 L 1060 560 L 1080 620 Z" fill="#fbbf24" />
                          <Etiqueta x={1060} y={820} texto="jefe de cultura" op={1} c={c} id={ID} />
                          {Array.from({ length: 16 }, (_, k) => <rect key={k} x={200 + ((k * 61) % 800)} y={260 + (((t * 60 + k * 37) % 260))} width={10} height={16} rx={3} fill={[NARANJA, ROSA, '#22c55e', '#3b82f6'][k % 4]} opacity={confeti * 0.85} transform={`rotate(${t * 200 + k * 30} ${205 + ((k * 61) % 800)} ${268 + ((t * 60 + k * 37) % 260)})`} />)}
                        </g>
                        <Chip x={360} y={420} texto="perdimos un cliente :)" c={c} id={ID} op={ventana(t, M('perdian'), M('activos'))} />
                        <g opacity={ventana(t, M('metricas'), M('activos'))}>
                          <rect x={680} y={340} width={220} height={130} rx={14} fill={c.panel} style={sombra(c.sombra)} />
                          <Txt f="a" x={790} y={420} textAnchor="middle" fontSize={28} fill={c.tenue}>métricas</Txt>
                          <rect x={680} y={340} width={220} height={130} rx={14} fill={c.panel2} opacity={0.75} />
                        </g>
                      </g>
                      <g opacity={e1(t, M('activos'))}>
                        <g transform="translate(600 400) rotate(-10)">
                          <path d="M -120 -50 H 90 L 130 0 L 90 50 H -120 Z" fill={c.blanco} stroke={c.tenue} strokeWidth={4} style={sombra(c.sombra)} />
                          <circle cx={92} cy={0} r={10} fill={c.tenue} />
                          <Txt f="a" x={-20} y={10} textAnchor="middle" fontSize={28} fill={c.texto}>sus activos</Txt>
                        </g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · el marcador de Jeff */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const m = (k: number) => ac(t, [M('pe15'), M('p20'), M('p30'), M('m20')][k], [M('pe15'), M('p20'), M('p30'), M('m20')][k] + 0.6);
                  return (
                    <g>
                      <Persona id={ID} x={170} y={760} cuerpo="#1e3a8a" corbata />
                      <Gesto x={170} y={760} animo={0.7} />
                      <Etiqueta x={170} y={820} texto="Jeff" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('marcador'))}>
                        <Marcador x={660} y={240} filas={[['precio/beneficio', '15'], ['cuota', '20 %'], ['crecimiento', '30 %'], ['meta Q3', 'US$ 20 M']]} u={[m(0), m(1), m(2), m(3)]} c={c} id={ID} w={520} />
                      </g>
                      {/* equipos de seis */}
                      <g opacity={ventana(t, M('seis'), M('partes'))}>
                        {Array.from({ length: 3 }, (_, g) => Array.from({ length: 6 }, (_, k) => <circle key={`${g}-${k}`} cx={330 + g * 110 + (k % 3) * 26} cy={690 + Math.floor(k / 3) * 26} r={10} fill={[NARANJA, ROSA, '#7c3aed'][g]} />))}
                        <Etiqueta x={460} y={790} texto="equipos de seis" op={1} c={c} id={ID} />
                      </g>
                      {/* la meta dividida en partes */}
                      <g opacity={e1(t, M('partes'))}>
                        {Array.from({ length: 5 }, (_, k) => <rect key={k} x={420 + k * 92} y={640} width={84} height={44} rx={10} fill={k < Math.round(5 * ac(t, M('partes'), M('partes') + 2)) ? `url(#${ID}-marca)` : c.panel2} />)}
                        <Etiqueta x={650} y={740} texto="partes estratégicas" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('exito'))}><Visto x={1030} y={680} s={1} /></g>
                      <g opacity={e1(t, M('paseo'))}>
                        <Txt f="a" x={1030} y={780} textAnchor="middle" fontSize={26} fill={c.tenue}>paseo</Txt>
                        <line x1={980} y1={772} x2={1080} y2={772} stroke="#c2263e" strokeWidth={4} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · las preguntas de cada mañana */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <circle cx={200} cy={560 - 120 * ac(t, M('manana'), M('manana') + 2)} r={60} fill="#fbbf24" opacity={0.9} />
                <Persona id={ID} x={220} y={760} cuerpo="#334155" corbata />
                <Gesto x={220} y={760} animo={0.5} />
                {([['¿qué debe pasar hoy?', M('hoy')], ['¿dónde hay confusión?', M('confusion')], ['¿qué creencia es vaga?', M('vaga')], ['¿qué no comuniqué?', M('noComunicado')]] as const).map(([txt, t0], k) => (
                  <g key={txt} opacity={e1(t, t0)}>
                    <Visto x={420} y={330 + k * 110} s={0.8} />
                    <Chip x={740} y={330 + k * 110} texto={txt} c={c} id={ID} op={1} marca={k === 0} />
                  </g>
                ))}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
