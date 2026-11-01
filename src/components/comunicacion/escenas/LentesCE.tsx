import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Etiqueta, Gesto, Insignia, Lupa, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana , Chip } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Tres lentes», escena propia. Acto A: dos carriles de evaluación: la fase rápida, un rayo que estampa
 * atajos (aspecto, cargo, gesto) sobre la silueta; la fase lenta, una lupa que avanza solo si la
 * válvula de la motivación está abierta. Acto B: tres lentes que entran al nombrarse: confianza
 * (corazón y engranaje, con sus barras de calidez y competencia), poder (diana) y ego (podio).
 * Acto C: Gordon con mucha competencia y poca calidez: el otro ve un posible rival.
 */

const ID = 'ce1l';
const nombres = ['fases', 'rapida', 'atajos', 'segunda', 'motivada', 'lentes', 'confianza', 'amigo', 'calidez', 'competencia', 'poder', 'sirves', 'ego', 'arriba', 'gordon', 'sinCalidez', 'rival', 'pregunta'] as const;


/* Barra horizontal de nivel (0 a 1). */
const Nivel: React.FC<{ x: number; y: number; w: number; v: number; c: Tono; color: string }> = ({ x, y, w, v, c, color }) => (
  <g>
    <rect x={x} y={y} width={w} height={22} rx={11} fill={c.apagado} />
    <rect x={x} y={y} width={Math.max(22, w * v)} height={22} rx={11} fill={color} />
  </g>
);

export const LentesCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('rival') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Te evalúan en dos fases'], [M('rapida'), 'Fase 1: rápida, sin pensar'], [M('segunda'), 'Fase 2: exige esfuerzo'],
    [M('motivada'), 'Solo si hay motivación'], [M('lentes'), 'Te miran a través de lentes'], [M('confianza'), 'Lente de la confianza'],
    [M('poder'), 'Lente del poder'], [M('ego'), 'Lente del ego'], [M('gordon'), 'El caso de Gordon'], [M('sinCalidez'), 'Competencia sin calidez'],
    [M('rival'), '= posible rival'],
  ];

  const aA = ventana(t, -1, M('lentes'));
  const aB = ventana(t, M('lentes'), M('gordon'));
  const aC = ac(t, M('gordon'), M('gordon') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Quien te conoce te evalúa en una fase rápida y otra lenta, a través de los lentes de la confianza, el poder y el ego">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · dos fases */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <g opacity={e1(t, M('fases') - 0.2)}>
                  <Persona id={ID} x={1100} y={800} s={0.8} cuerpo="#64748b" />
                  <Gesto x={1100} y={800} s={0.8} animo={0} />
                </g>
                {/* Fase 1: rayo y atajos */}
                {(() => {
                  const op = e1(t, M('rapida') - 0.2);
                  if (op < 0.01) return null;
                  const rayo = 0.6 + 0.4 * Math.abs(Math.sin(t * 6));
                  return (
                    <g opacity={op}>
                      <rect x={70} y={140} width={950} height={280} rx={30} fill={c.panel} style={sombra(c.sombra)} />
                      <Txt f="a" x={110} y={200} fontSize={MIN_TXT} fill={c.texto}>fase 1</Txt>
                      <path d="M 170 230 L 130 320 L 168 320 L 140 400 L 230 290 L 188 290 L 220 230 Z" fill={NARANJA} opacity={rayo} />
                      <g transform="translate(300 400)"><Persona id={ID} x={0} y={0} s={0.55} /></g>
                      {(['aspecto', 'cargo', 'gesto'] as const).map((tx, k) => <Chip key={tx} x={[470, 690, 900][k]} y={300} texto={tx} c={c} id={ID} op={e1(t, M('atajos') + 0.2 + k * 0.45)} marca={k === 1} />)}
                    </g>
                  );
                })()}
                {/* Fase 2: lupa lenta con la válvula de la motivación */}
                {(() => {
                  const op = e1(t, M('segunda') - 0.2);
                  if (op < 0.01) return null;
                  const abierta = ac(t, M('motivada'), M('motivada') + 0.8);
                  const avance = (t - M('segunda')) * (0.05 + 0.25 * abierta);
                  const x = lerp(300, 720, (Math.sin(avance * Math.PI) + 1) / 2);
                  return (
                    <g opacity={op}>
                      <rect x={70} y={450} width={950} height={300} rx={30} fill={c.panel} style={sombra(c.sombra)} />
                      <Txt f="a" x={110} y={510} fontSize={MIN_TXT} fill={c.texto}>fase 2</Txt>
                      {Array.from({ length: 6 }, (_, k) => <rect key={k} x={260 + k * 95} y={640} width={60} height={60} rx={12} fill={c.apagado} opacity={0.7} />)}
                      <Lupa x={x} y={620} r={62} c={c} id={ID} clip={`${ID}-lupa`}>
                        <rect x={-80} y={-80} width={160} height={160} fill={c.panel2} />
                      </Lupa>
                      <g transform="translate(160 640)">
                        <circle r={40} fill={abierta > 0.5 ? VERDE : c.apagado} />
                        <rect x={-30} y={-6} width={60} height={12} rx={6} fill="#fff" transform={`rotate(${abierta * 90})`} />
                      </g>
                      <Chip x={860} y={515} texto="motivada" c={c} id={ID} op={e1(t, M('motivada') + 0.2)} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B · los tres lentes */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {([['confianza', 280, '¿amigo?', 'amigo'], ['poder', 600, '¿me sirve?', 'sirves'], ['ego', 920, '¿quién manda?', 'arriba']] as const).map(([n, x, preg, np]) => {
                  const op = e1(t, M(n));
                  if (op < 0.01) return null;
                  const activo = n === 'confianza' ? ventana(t, M('confianza'), M('poder')) : n === 'poder' ? ventana(t, M('poder'), M('ego')) : ac(t, M('ego'), M('ego') + 0.4);
                  return (
                    <g key={n} opacity={op * (0.45 + 0.55 * activo)}>
                      <Lupa x={x} y={300} r={115} c={c} id={ID} clip={`${ID}-l-${n}`} rot={50}>
                        <rect x={-130} y={-130} width={260} height={260} fill={c.panel} />
                        {n === 'confianza' && <g>
                          <path transform={`translate(-38 0) scale(${1 + 0.05 * Math.sin(t * 4)})`} d="M 0 28 C -40 0 -40 -34 -14 -34 C 0 -34 0 -22 0 -18 C 0 -22 0 -34 14 -34 C 40 -34 40 0 0 28 Z" fill={ROSA} />
                          <g transform={`translate(44 -4) rotate(${t * 40})`}>{Array.from({ length: 8 }, (_, q) => <rect key={q} x={-6} y={-34} width={12} height={16} rx={3} fill={NARANJA} transform={`rotate(${q * 45})`} />)}<circle r={22} fill={NARANJA} /><circle r={8} fill={c.panel} /></g>
                        </g>}
                        {n === 'poder' && <g>
                          {[60, 42, 24].map((r, q) => <circle key={r} r={r} fill={q % 2 ? c.panel : NARANJA} opacity={q % 2 ? 1 : 0.85} />)}
                          <g transform={`translate(${lerp(-90, 0, e1(t, M('sirves')))} ${lerp(-60, 0, e1(t, M('sirves')))}) rotate(34)`}><rect x={-70} y={-4} width={70} height={8} rx={4} fill={c.texto} /><path d="M 0 -12 L 18 0 L 0 12 Z" fill={c.texto} /></g>
                        </g>}
                        {n === 'ego' && <g>
                          <rect x={-70} y={10} width={46} height={50} fill={c.apagado} />
                          <rect x={-24} y={-20} width={48} height={80} fill={c.tenue} />
                          <rect x={24} y={24} width={46} height={36} fill={c.apagado} />
                          <circle cx={0} cy={-46} r={16} fill="#64748b" /><rect x={-12} y={-32} width={24} height={14} rx={6} fill="#64748b" />
                          <circle cx={46} cy={0} r={12} fill={NARANJA} /><rect x={37} y={10} width={18} height={14} rx={5} fill={NARANJA} />
                        </g>}
                      </Lupa>
                      <Txt f="a" x={x} y={480} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{n}</Txt>
                      <Etiqueta x={x} y={545} texto={preg} op={e1(t, M(np))} c={c} id={ID} marca />
                    </g>
                  );
                })}
                {/* Calidez y competencia bajo el lente de la confianza */}
                {(() => {
                  const op = e1(t, M('calidez'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op * (0.45 + 0.55 * ventana(t, M('confianza'), M('poder')))}>
                      <Txt f="a" x={150} y={625} fontSize={MIN_TXT} fill={c.texto}>calidez</Txt>
                      <Nivel x={150} y={645} w={270} v={0.75 * ac(t, M('calidez'), M('calidez') + 1)} c={c} color={ROSA} />
                      <g opacity={e1(t, M('competencia'))}>
                        <Txt f="a" x={150} y={730} fontSize={MIN_TXT} fill={c.texto}>competencia</Txt>
                        <Nivel x={150} y={750} w={270} v={0.75 * ac(t, M('competencia'), M('competencia') + 1)} c={c} color={NARANJA} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · Gordon: competencia sin calidez */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <Persona id={ID} x={280} y={780} s={0.95} />
                <Gesto x={280} y={780} s={0.95} animo={0.2} />
                <Etiqueta x={280} y={840} texto="Gordon" op={1} c={c} id={ID} marca />
                {([['competencia', 640, 0.92, NARANJA, M('gordon')], ['calidez', 880, 0.18, ROSA, M('sinCalidez')]] as const).map(([txt, x, v, col, t0]) => {
                  const op = e1(t, t0);
                  const h = 330 * v * ac(t, t0 + 0.2, t0 + 1.2);
                  return op > 0.01 ? (
                    <g key={txt} opacity={op}>
                      <rect x={x - 50} y={360} width={100} height={340} rx={26} fill={c.apagado} />
                      <rect x={x - 50} y={700 - h} width={100} height={Math.max(26, h)} rx={26} fill={col} />
                      <Txt f="a" x={x} y={760} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                    </g>
                  ) : null;
                })}
                <g opacity={e1(t, M('rival'))}><Insignia x={760} y={250} texto="posible rival" c={c} id={ID} tono="alerta" /></g>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
