import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Etiqueta, PanelPregunta, Rotulo, W, H, borde, e1, marcador, ventana } from './comunOA';
import { AZUL_M, Edificio, Flecha, Moneda, Precio, ROJO_M, ROJO_O, Tienda } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * «Innovación en valor», escena propia. Acto A: una balanza con el cliente a un lado y la empresa al otro;
 * el valor sube a ambos a la vez (más compradores a la izquierda, menos costes a la derecha) y la
 * tecnología sola, un chip tachado, no la inclina. Acto B: una decisión voluntaria (un interruptor) y tres
 * preguntas incómodas. Acto C: no siempre sube el precio: más compradores reparten los costes fijos y el
 * computador personal reemplaza al central. Acto D: una consultora que llega directo a la pyme.
 */

const ID = 'oa3';
const nombres = ['valor', 'tecno', 'dos', 'mas', 'costes', 'voluntaria', 'incomodas', 'hombres', 'interm', 'expertos', 'precios', 'destinatarios', 'fijos', 'pcs', 'consultora', 'pyme', 'simple', 'pregunta'] as const;

export const ValorOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('simple') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Valor para ambos'], [M('tecno'), 'La tecnología no basta'], [M('dos'), 'Dos partes a la vez'], [M('costes'), 'Costes que se redefinen'], [M('voluntaria'), 'Una decisión voluntaria'],
    [M('incomodas'), 'Preguntas incómodas'], [M('precios'), 'No siempre sube el precio'], [M('destinatarios'), 'Más compradores'], [M('fijos'), 'Costes fijos repartidos'], [M('pcs'), 'Del central al personal'],
    [M('consultora'), 'Una consultora imaginaria'], [M('simple'), 'Formato simple'],
  ];

  const aA = ventana(t, -1, M('voluntaria'));
  const aB = ventana(t, M('voluntaria'), M('precios'));
  const aC = ventana(t, M('precios'), M('consultora'));
  const aD = ac(t, M('consultora'), M('consultora') + 0.4);

  // A · balanza
  const ang = 2.2 * Math.sin(t * 1.2);
  const rad = (ang * Math.PI) / 180;
  const ex = 380 * Math.cos(rad), ey = 380 * Math.sin(rad);
  const izq: [number, number] = [600 - ex, 470 - ey], der: [number, number] = [600 + ex, 470 + ey];
  const panIzq = izq[1] + 190, panDer = der[1] + 190;
  const tec = ventana(t, M('tecno'), M('voluntaria'));
  const equil = ac(t, M('dos'), M('dos') + 1);
  const bloque = (k: number) => 1 - ac(t, M('costes') + k * 0.8, M('costes') + k * 0.8 + 0.6);

  // B · interruptor y preguntas
  const on = ac(t, M('voluntaria') + 0.8, M('voluntaria') + 1.6);
  const filas = [M('hombres'), M('interm'), M('expertos')];

  // C · precios, compradores y costes fijos
  const nPers = t < M('destinatarios') ? 0 : Math.min(8, 3 + Math.floor((t - M('destinatarios')) / 0.5));
  const nSeg = t < M('fijos') ? 2 : Math.max(2, nPers);
  const seg = 960 / nSeg;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Innovación en valor: valor para el cliente y para la empresa">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · la balanza */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <path d="M 600 470 L 560 770 H 640 Z" fill={c.apagado} />
                <rect x={500} y={764} width={200} height={20} rx={10} fill={c.apagado} />
                <g transform={`translate(600 470) rotate(${ang})`}><rect x={-390} y={-9} width={780} height={18} rx={9} fill={isDark ? '#7a7a7a' : '#6b7280'} /></g>
                <circle cx={600} cy={470} r={22} fill={`url(#${ID}-marca)`} />
                {([[izq, panIzq], [der, panDer]] as const).map(([p, py], k) => (
                  <g key={k}>
                    <path d={`M ${p[0]} ${p[1]} L ${p[0] - 130} ${py} M ${p[0]} ${p[1]} L ${p[0] + 130} ${py}`} stroke={c.apagado} strokeWidth={5} />
                    <rect x={p[0] - 150} y={py} width={300} height={22} rx={11} fill={isDark ? '#7a7a7a' : '#6b7280'} />
                    <ellipse cx={p[0]} cy={py + 10} rx={170 * equil} ry={26 * equil} fill={NARANJA} opacity={0.22 * equil} />
                  </g>
                ))}
                {/* el cliente: una persona, y luego más compradores con sus monedas */}
                {[0, 1, 2].map((k) => {
                  const ent = k === 0 ? e1(t, M('dos')) : e1(t, M('mas') + k * 0.6);
                  return (
                    <g key={k} opacity={ent}>
                      <Persona id={ID} x={izq[0] - 80 + k * 80} y={panIzq} s={0.5} cuerpo={['#334155', '#7c3aed', '#0f766e'][k]} />
                      {k > 0 && <Moneda x={izq[0] - 80 + k * 80} y={panIzq - 120 - 6 * Math.sin(t * 3 + k)} />}
                    </g>
                  );
                })}
                {/* la empresa: un edificio y los bloques de costes que se reducen */}
                <g opacity={e1(t, M('dos'))}>
                  <Edificio x={der[0] + 70} y={panDer} w={80} h={110} />
                  {[0, 1, 2].map((k) => <rect key={k} x={der[0] - 110} y={panDer - 38 - k * 40 + (1 - bloque(k)) * 14} width={70} height={36} rx={8} fill={ROJO_M} opacity={bloque(k)} />)}
                </g>
                <Etiqueta x={izq[0]} y={panIzq + 78} texto="cliente" op={e1(t, 0.5)} c={c} id={ID} />
                <Etiqueta x={der[0]} y={panDer + 78} texto="empresa" op={e1(t, 0.5)} c={c} id={ID} />
                {/* el valor y la tecnología sola */}
                <g opacity={e1(t, M('valor'))} transform={`translate(760 ${250 + 6 * Math.sin(t * 2)})`}>
                  <path d="M 0 -56 L 50 -10 L 0 56 L -50 -10 Z" fill={`url(#${ID}-marca)`} /><path d="M 0 -56 L 50 -10 L 0 -10 Z" fill="#fff" opacity={0.28} />
                </g>
                <g opacity={tec} transform="translate(440 250)">
                  <rect x={-50} y={-50} width={100} height={100} rx={16} fill="#64748b" /><rect x={-26} y={-26} width={52} height={52} rx={8} fill="#94a3b8" />
                  {[-32, -10, 12, 34].map((p) => <g key={p}><rect x={p - 4} y={-66} width={8} height={18} rx={3} fill="#94a3b8" /><rect x={p - 4} y={48} width={8} height={18} rx={3} fill="#94a3b8" /><rect x={-66} y={p - 4} width={18} height={8} rx={3} fill="#94a3b8" /><rect x={48} y={p - 4} width={18} height={8} rx={3} fill="#94a3b8" /></g>)}
                  <path d="M -62 -62 L 62 62 M 62 -62 L -62 62" stroke={ROJO_O} strokeWidth={14} strokeLinecap="round" />
                </g>
              </g>
            )}

            {/* B · decisión voluntaria y preguntas incómodas */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <g opacity={ventana(t, M('voluntaria'), M('incomodas') + 0.3)}>
                  <Edificio x={300} y={620} w={120} h={180} />
                  <rect x={520} y={360} width={320} height={160} rx={80} fill={on > 0.5 ? `url(#${ID}-marcaH)` : c.apagado} />
                  <circle cx={600 + 160 * on} cy={440} r={62} fill="#fff" style={sombra(c.sombra, 4, 10)} />
                  <Flecha x1={380} y1={520} x2={500} y2={470} u={e1(t, M('voluntaria') + 0.4)} color={NARANJA} />
                </g>
                {filas.map((t0, k) => {
                  const y = 240 + k * 200;
                  return (
                    <g key={k} opacity={e1(t, t0)}>
                      <rect x={120} y={y - 85} width={960} height={170} rx={26} fill={c.panel} style={sombra(c.sombra, 6, 16)} />
                      {k === 0 && (<>
                        <Persona id={ID} x={260} y={y + 62} s={0.55} cuerpo={isDark ? '#8da2c0' : '#334155'} corbata />
                        <Flecha x1={380} y1={y} x2={760} y2={y} u={ac(t, t0 + 0.3, t0 + 1.2)} color={NARANJA} />
                        <Txt f="a" x={570} y={y - 28} textAnchor="middle" fontSize={56} fill={ROSA}>?</Txt>
                        <Persona id={ID} x={900} y={y + 62} s={0.55} cuerpo="#ec4899" pelo="#8b3a3a" />
                      </>)}
                      {k === 1 && (<>
                        <Edificio x={240} y={y + 60} w={80} h={110} />
                        <circle cx={600} cy={y - 8} r={40} fill={c.apagado} opacity={0.9 - 0.55 * ac(t, t0 + 0.8, t0 + 1.6)} />
                        <Flecha x1={320} y1={y - 8} x2={540} y2={y - 8} color={c.apagado} grosor={8} op={1 - 0.6 * ac(t, t0 + 0.8, t0 + 1.6)} />
                        <Flecha x1={660} y1={y - 8} x2={860} y2={y - 8} color={c.apagado} grosor={8} op={1 - 0.6 * ac(t, t0 + 0.8, t0 + 1.6)} />
                        <Flecha x1={330} y1={y + 56} x2={850} y2={y + 56} u={ac(t, t0 + 0.8, t0 + 2)} color={NARANJA} punteada />
                        <Persona id={ID} x={960} y={y + 62} s={0.55} cuerpo="#0f766e" />
                      </>)}
                      {k === 2 && (<>
                        <circle cx={250} cy={y} r={62} fill={c.panel2} />
                        <Persona id={ID} x={250} y={y + 52} s={0.5} cuerpo="#1f2937" corbata />
                        <Flecha x1={350} y1={y} x2={620} y2={y} u={ac(t, t0 + 0.3, t0 + 1.2)} color={NARANJA} />
                        {[0, 1, 2, 3].map((j) => <g key={j} opacity={e1(t, t0 + 1 + j * 0.25)}><Persona id={ID} x={720 + j * 100} y={y + 56} s={0.42} cuerpo={['#7c3aed', '#0f766e', '#ec4899', '#334155'][j]} /></g>)}
                      </>)}
                    </g>
                  );
                })}
              </g>
            )}

            {/* C · no siempre sube el precio */}
            {aC > 0.01 && (
              <g opacity={aC}>
                <g opacity={e1(t, M('precios'))}>
                  <Precio x={190} y={250} s={1.2} />
                  <Flecha x1={320} y1={300} x2={320} y2={190} color={ROJO_O} />
                  <path d="M 80 160 L 300 340 M 300 160 L 80 340" stroke={ROJO_O} strokeWidth={12} strokeLinecap="round" opacity={0.85} />
                </g>
                {Array.from({ length: nPers }, (_, k) => (
                  <g key={k} opacity={e1(t, M('destinatarios') + k * 0.5)}>
                    <Persona id={ID} x={170 + k * 124} y={560} s={0.5} cuerpo={['#334155', '#7c3aed', '#0f766e', '#ec4899'][k % 4]} />
                  </g>
                ))}
                {t >= M('fijos') - 1 && (
                  <g opacity={e1(t, M('fijos') - 1)}>
                    {Array.from({ length: nSeg }, (_, k) => <rect key={k} x={120 + k * seg + 3} y={612} width={Math.max(8, seg - 6)} height={44} rx={10} fill={`url(#${ID}-marcaH)`} />)}
                    <Etiqueta x={600} y={718} texto="costes fijos" op={e1(t, M('fijos'))} c={c} id={ID} />
                  </g>
                )}
                {t >= M('pcs') && (
                  <g opacity={e1(t, M('pcs'))}>
                    <rect x={650} y={190} width={90} height={150} rx={10} fill={isDark ? '#8294b3' : '#475569'} /><rect x={662} y={206} width={66} height={14} rx={4} fill="#94a3b8" /><rect x={662} y={232} width={66} height={14} rx={4} fill="#94a3b8" />
                    <Flecha x1={770} y1={265} x2={850} y2={265} color={NARANJA} />
                    <g transform="translate(940 265)"><rect x={-56} y={-50} width={112} height={78} rx={10} fill="#1f2937" /><rect x={-48} y={-42} width={96} height={62} rx={6} fill={AZUL_M} /><rect x={-8} y={28} width={16} height={22} fill="#64748b" /><rect x={-34} y={48} width={68} height={10} rx={5} fill="#64748b" /></g>
                    <g opacity={e1(t, M('pcs') + 1.5)} transform="translate(1060 270)"><rect x={-24} y={-48} width={48} height={96} rx={10} fill="#1f2937" /><rect x={-19} y={-38} width={38} height={72} rx={5} fill={AZUL_M} /></g>
                  </g>
                )}
              </g>
            )}

            {/* D · la consultora imaginaria */}
            {aD > 0.01 && (
              <g opacity={aD}>
                <Edificio x={200} y={560} w={140} h={220} color={isDark ? "#8294b3" : "#334155"} />
                {[0, 1, 2].map((k) => (
                  <g key={k} opacity={e1(t, M('consultora') + 0.5 + k * 0.3)}>
                    <circle cx={450 + k * 110} cy={470} r={36} fill={c.apagado} /><circle cx={450 + k * 110} cy={470} r={16} fill={c.panel2} />
                  </g>
                ))}
                <Flecha x1={290} y1={470} x2={800} y2={470} color={c.apagado} grosor={8} op={0.7 - 0.4 * ac(t, M('pyme'), M('pyme') + 0.8)} />
                <Tienda x={960} y={560} w={160} />
                <Flecha x1={300} y1={620} x2={870} y2={620} u={ac(t, M('pyme'), M('pyme') + 1.4)} color={NARANJA} punteada />
                {t >= M('simple') && (
                  <g opacity={e1(t, M('simple'))}>
                    <g transform="translate(440 280)">
                      <rect x={-52} y={-66} width={104} height={132} rx={14} fill="#fff" style={sombra(c.sombra, 6, 14)} />
                      {[-34, -12, 10].map((yy) => <rect key={yy} x={-34} y={yy} width={68} height={10} rx={5} fill="#cbd5e1" />)}
                      <path d="M -22 40 L -8 54 L 22 24" stroke="#10b981" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <Precio x={740} y={270} s={1.1} color="#10b981" />
                    <Flecha x1={860} y1={200} x2={860} y2={350} color="#10b981" op={0.9} />
                  </g>
                )}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
