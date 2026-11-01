import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Etiqueta, Gesto, Insignia, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Abrirse con cuidado», escena propia. Acto A: un grifo que suelta burbujas de historias sin control y
 * tres maneras de que salga mal. Luego Mitch rompe el hielo con la decana: el cubo de hielo crece, la
 * mirada se enfría y caen copos. Acto B: los cinco pasos se marcan en una lista a la derecha mientras a
 * la izquierda se ve cada uno: el espejo, la diana, Allan y su historia inventada que lo saca por la
 * puerta, culturas que comparten mucho o poco, y la historia íntima que solo hace crecer lo que ya
 * existe. Acto C: Mitch cuenta su intercambio y cierra el trato.
 */

const ID = 'ce1r';
const nombres = ['todo', 'mal', 'mitch', 'hielo', 'rechazado', 'fria', 'lastima', 'cinco', 'conocerte', 'relevante', 'genuino', 'allan', 'dejando', 'contexto', 'asia', 'intimo', 'crean', 'aprendio', 'intercambio', 'trato', 'pregunta'] as const;
type N = typeof nombres[number];

const PASOS: { n: N; txt: string }[] = [
  { n: 'conocerte', txt: 'conocerte' }, { n: 'relevante', txt: 'relevante' }, { n: 'genuino', txt: 'genuino' }, { n: 'contexto', txt: 'contexto' }, { n: 'intimo', txt: 'postergar lo íntimo' },
];

/* Cubo de hielo isométrico de semiancho s. */
const Hielo: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={s * 1.1} rx={s * 1.2} ry={s * 0.3} fill="#000" opacity={0.1} />
    <path d={`M 0 ${-s} L ${s} ${-s / 2} L 0 0 L ${-s} ${-s / 2} Z`} fill="#e0f2fe" />
    <path d={`M ${-s} ${-s / 2} L 0 0 L 0 ${s} L ${-s} ${s / 2} Z`} fill="#bae6fd" />
    <path d={`M ${s} ${-s / 2} L 0 0 L 0 ${s} L ${s} ${s / 2} Z`} fill="#7dd3fc" />
    <path d={`M ${-s * 0.6} ${-s * 0.4} L ${-s * 0.2} ${-s * 0.6}`} stroke="#fff" strokeWidth={5} strokeLinecap="round" opacity={0.8} />
  </g>
);

/* Copo de nieve. */
const Copo: React.FC<{ x: number; y: number; r: number; op: number }> = ({ x, y, r, op }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    {[0, 60, 120].map((a) => <line key={a} x1={-r} y1={0} x2={r} y2={0} stroke="#7dd3fc" strokeWidth={3} strokeLinecap="round" transform={`rotate(${a})`} />)}
  </g>
);

export const CuidadoCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('trato') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Ser auténtico no es contarlo todo'], [M('mal'), 'Abrirse puede salir mal'], [M('mitch'), 'Mitch y la decana'],
    [M('fria'), 'Una mirada fría'], [M('cinco'), 'Cinco pasos'], [M('conocerte'), 'Conócete'], [M('relevante'), '¿Es relevante?'],
    [M('genuino'), 'Que sea genuino'], [M('contexto'), 'Entiende el contexto'], [M('intimo'), 'Posterga lo muy íntimo'],
    [M('aprendio'), 'Mitch aprendió'], [M('trato'), 'Y cerró el trato'],
  ];

  const aA = ventana(t, -1, M('cinco'));
  const aB = ventana(t, M('cinco'), M('aprendio'));
  const aC = ac(t, M('aprendio'), M('aprendio') + 0.4);
  const paso = (n: N, sig: N | null) => ventana(t, M(n), sig ? M(sig) : M('aprendio'));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Abrirse en el trabajo puede salir mal; cinco pasos para contar lo personal con cuidado">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · el grifo de lo personal y la reunión helada de Mitch */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const op = ventana(t, -1, M('mitch'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      <g transform="translate(250 230)">
                        <rect x={-30} y={-60} width={60} height={70} rx={10} fill={c.tenue} />
                        <rect x={-70} y={-80} width={140} height={22} rx={11} fill={c.apagado} />
                        <path d="M 30 -20 H 120 Q 150 -20 150 10 V 40 H 110 V 20 H 30 Z" fill={c.tenue} />
                      </g>
                      {[0, 1, 2, 3, 4, 5].map((k) => {
                        const u = ((t * 0.5) + k / 6) % 1;
                        return <g key={k} transform={`translate(${380 + Math.sin(k * 2.3) * 20 * u} ${280 + u * 470})`} opacity={Math.sin(Math.PI * u)}><rect x={-30} y={-18} width={60} height={36} rx={18} fill={k % 2 ? NARANJA : ROSA} /><circle cx={-12} cy={0} r={4} fill="#fff" /><circle cx={0} cy={0} r={4} fill="#fff" /><circle cx={12} cy={0} r={4} fill="#fff" /></g>;
                      })}
                      {(['apresurado', 'a destiempo', 'otra cultura'] as const).map((tx, k) => <Chip key={tx} x={800} y={290 + k * 110} texto={tx} c={c} id={ID} op={e1(t, M('mal') + 0.3 + k * 0.45)} />)}
                    </g>
                  );
                })()}
                {(() => {
                  const op = e1(t, M('mitch') - 0.2);
                  if (op < 0.01) return null;
                  const frio = ac(t, M('fria'), M('fria') + 1);
                  const lado = (M('rechazado') < t) ? 1 : 0;
                  return (
                    <g opacity={op}>
                      <Persona id={ID} x={280} y={790} s={1.05} />
                      <Gesto x={280} y={790} s={1.05} animo={0.7 - 0.9 * frio} />
                      <Persona id={ID} x={920} y={790} s={1.05} cuerpo="#475569" pelo="#9ca3af" />
                      <Gesto x={920} y={790} s={1.05} animo={0.2 - 0.9 * frio} />
                      {frio > 0.01 && <circle cx={920} cy={790 - 134 * 1.05} r={34} fill="#7dd3fc" opacity={0.3 * frio} />}
                      <Etiqueta x={280} y={845} texto="Mitch" op={1} c={c} id={ID} marca />
                      <Etiqueta x={920} y={845} texto="decana" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('hielo'))}><Hielo x={600} y={650} s={50 + 30 * frio} /></g>
                      <g opacity={ventana(t, M('hielo') + 0.4, M('fria') + 1.2)}>
                        <Burbuja x={300} y={580} w={440} texto={lado ? '…pero me rechazaron.' : '¡Siempre quise estudiar aquí!'} u={lado ? ac(t, M('rechazado'), M('rechazado') + 1) : ac(t, M('hielo') + 0.4, M('hielo') + 1.6)} c={c} id={ID} marca />
                      </g>
                      {frio > 0.01 && Array.from({ length: 8 }, (_, k) => {
                        const u = ((t - M('fria')) * 0.3 + k / 8) % 1;
                        return <Copo key={k} x={520 + ((k * 73) % 480)} y={200 + u * 420} r={12} op={frio * Math.sin(Math.PI * u)} />;
                      })}
                      <g opacity={e1(t, M('lastima'))}><Chip x={920} y={480} texto="¿pide lástima?" c={c} id={ID} op={1} /></g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B · los cinco pasos */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {PASOS.map((p, k) => {
                  const op = e1(t, M('cinco') + k * 0.2);
                  if (op < 0.01) return null;
                  const hecho = ac(t, M(p.n), M(p.n) + 0.5);
                  const y = 200 + k * 100;
                  return (
                    <g key={p.n} opacity={op * (0.5 + 0.5 * Math.max(hecho, t < M('conocerte') ? 1 : 0))}>
                      <rect x={640} y={y - 40} width={470} height={80} rx={22} fill={hecho > 0.5 ? c.panel : c.panel2} style={sombra(c.sombra, 3, 8)} />
                      <circle cx={690} cy={y} r={26} fill={hecho > 0.5 ? `url(#${ID}-marca)` : c.apagado} />
                      <Txt f="a" x={690} y={y + 10} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">{k + 1}</Txt>
                      <Txt f="a" x={735} y={y + 10} fontSize={MIN_TXT} fill={c.texto}>{p.txt}</Txt>
                    </g>
                  );
                })}
                {/* 1 · conocerte: el espejo */}
                {(() => {
                  const op = paso('conocerte', 'relevante');
                  return op > 0.01 ? (
                    <g opacity={op}>
                      <ellipse cx={330} cy={420} rx={150} ry={200} fill={c.panel2} stroke={`url(#${ID}-marca)`} strokeWidth={12} />
                      <path d="M 230 330 L 300 260" stroke="#fff" strokeWidth={10} opacity={0.6} strokeLinecap="round" />
                      <g opacity={0.75}><Persona id={ID} x={330} y={560} s={0.9} /></g>
                      <rect x={316} y={620} width={28} height={110} fill={c.tenue} />
                      <rect x={250} y={724} width={160} height={20} rx={8} fill={c.apagado} />
                    </g>
                  ) : null;
                })()}
                {/* 2 · relevante: la diana */}
                {(() => {
                  const op = paso('relevante', 'genuino');
                  if (op < 0.01) return null;
                  const u = ac(t, M('relevante') + 0.3, M('relevante') + 1);
                  return (
                    <g opacity={op}>
                      {[130, 95, 60, 26].map((r, q) => <circle key={r} cx={330} cy={460} r={r} fill={q % 2 ? c.panel : NARANJA} opacity={q % 2 ? 1 : 0.9} />)}
                      <g transform={`translate(${lerp(140, 320, u)} ${lerp(270, 450, u)}) rotate(45)`}><rect x={-110} y={-6} width={110} height={12} rx={6} fill={c.texto} /><path d="M 0 -18 L 26 0 L 0 18 Z" fill={c.texto} /></g>
                      <Etiqueta x={330} y={660} texto="¿sirve a la tarea?" op={e1(t, M('relevante') + 0.6)} c={c} id={ID} />
                    </g>
                  );
                })()}
                {/* 3 · genuino: Allan y su historia inventada */}
                {(() => {
                  const op = paso('genuino', 'contexto');
                  if (op < 0.01) return null;
                  const sale = ac(t, M('dejando'), M('dejando') + 1.6);
                  return (
                    <g opacity={op}>
                      <g opacity={e1(t, M('allan'))}>
                        <g transform="translate(220 330)">
                          <rect x={-80} y={-70} width={160} height={150} rx={16} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                          <rect x={-80} y={-70} width={160} height={36} rx={14} fill={c.tenue} />
                          <Txt x={0} y={40} textAnchor="middle" fontSize={54} fill={c.texto} peso={800}>1985</Txt>
                        </g>
                        <g transform="translate(440 330)">
                          <circle r={64} fill={`url(#${ID}-marca)`} />
                          <path d="M 0 22 C -34 0 -34 -26 -12 -26 C 0 -26 0 -16 0 -12 C 0 -16 0 -26 12 -26 C 34 -26 34 0 0 22 Z" fill="#fff" />
                        </g>
                        <Txt x={330} y={345} textAnchor="middle" fontSize={56} fill={ROSA} peso={800}>≠</Txt>
                        <g transform={`translate(330 470) rotate(-8) scale(${lerp(1.6, 1, e1(t, M('allan') + 1))})`} opacity={e1(t, M('allan') + 1)}>
                          <rect x={-150} y={-38} width={300} height={76} rx={14} fill="none" stroke={ROSA} strokeWidth={8} />
                          <Txt f="a" x={0} y={14} textAnchor="middle" fontSize={MIN_TXT * 1.3} fill={ROSA} peso={800}>INVENTADO</Txt>
                        </g>
                      </g>
                      {t > M('dejando') - 0.2 && (
                        <g>
                          <rect x={420} y={560} width={110} height={200} rx={8} fill={c.apagado} />
                          <rect x={432} y={572} width={86} height={188} rx={6} fill={c.panel2} />
                          <g opacity={1 - ac(sale, 0.8, 1)}><Persona id={ID} x={lerp(250, 475, sale)} y={760} s={0.7} cuerpo="#94a3b8" /></g>
                        </g>
                      )}
                    </g>
                  );
                })()}
                {/* 4 · contexto: culturas que comparten mucho o poco */}
                {(() => {
                  const op = paso('contexto', 'intimo');
                  if (op < 0.01) return null;
                  const asia = e1(t, M('asia'));
                  const flujo = (x: number, y: number, n: number) => Array.from({ length: n }, (_, k) => {
                    const u = ((t * 0.6) + k / n) % 1;
                    return <rect key={k} x={x - 22 + Math.sin(k * 2) * 30} y={y - u * 140} width={44} height={24} rx={12} fill={NARANJA} opacity={Math.sin(Math.PI * u) * 0.9} />;
                  });
                  return (
                    <g opacity={op}>
                      <g>{flujo(220, 420, 6)}<Persona id={ID} x={180} y={600} s={0.6} /><Persona id={ID} x={260} y={600} s={0.6} cuerpo="#94a3b8" /></g>
                      <Chip x={220} y={670} texto="EE. UU." c={c} id={ID} op={e1(t, M('contexto') + 0.3)} />
                      <Chip x={220} y={750} texto="India" c={c} id={ID} op={e1(t, M('contexto') + 0.6)} />
                      <g opacity={asia}>{flujo(470, 420, 2)}<Persona id={ID} x={430} y={600} s={0.6} cuerpo="#64748b" /><Persona id={ID} x={510} y={600} s={0.6} cuerpo="#475569" /></g>
                      <Chip x={470} y={670} texto="China" c={c} id={ID} op={asia} />
                      <Chip x={470} y={750} texto="Japón" c={c} id={ID} op={e1(t, M('asia') + 0.3)} />
                    </g>
                  );
                })()}
                {/* 5 · lo íntimo fortalece, no crea: una planta que solo crece si ya hay raíz */}
                {(() => {
                  const op = paso('intimo', null);
                  if (op < 0.01) return null;
                  const crece = ac(t, M('crean'), M('crean') + 1.4);
                  return (
                    <g opacity={op}>
                      <path d="M 220 700 L 440 700 L 410 780 L 250 780 Z" fill="#b45309" />
                      <rect x={210} y={684} width={240} height={24} rx={8} fill="#92400e" />
                      <path d={`M 330 690 V ${690 - 60 - 140 * crece}`} stroke="#15803d" strokeWidth={10} strokeLinecap="round" />
                      <path d={`M 330 ${650 - 60 * crece} Q ${280 - 30 * crece} ${620 - 80 * crece} ${250 - 30 * crece} ${640 - 70 * crece} Q ${290} ${660 - 40 * crece} 330 ${650 - 60 * crece}`} fill="#22c55e" />
                      <path d={`M 330 ${620 - 120 * crece} Q ${380 + 30 * crece} ${590 - 140 * crece} ${410 + 30 * crece} ${610 - 130 * crece} Q ${370} ${630 - 100 * crece} 330 ${620 - 120 * crece}`} fill="#16a34a" />
                      <path transform={`translate(330 ${400 - 60 * crece}) scale(${0.6 + 0.6 * crece})`} d="M 0 28 C -40 0 -40 -34 -14 -34 C 0 -34 0 -22 0 -18 C 0 -22 0 -34 14 -34 C 40 -34 40 0 0 28 Z" fill={ROSA} opacity={crece} />
                      <Etiqueta x={330} y={250} texto="fortalece, no crea" op={e1(t, M('crean') + 0.6)} c={c} id={ID} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · Mitch cuenta su intercambio y cierra el trato */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const trato = ac(t, M('trato'), M('trato') + 0.8);
                  return (
                    <g>
                      <Persona id={ID} x={lerp(320, 450, trato)} y={790} s={1.05} />
                      <Gesto x={lerp(320, 450, trato)} y={790} s={1.05} animo={0.7} />
                      <Persona id={ID} x={lerp(880, 750, trato)} y={790} s={1.05} cuerpo="#0f766e" />
                      <Gesto x={lerp(880, 750, trato)} y={790} s={1.05} animo={0.2 + 0.6 * ac(t, M('intercambio') + 1.5, M('intercambio') + 2.5)} />
                      <g opacity={ventana(t, M('intercambio'), M('trato') + 0.2)}>
                        <Burbuja x={340} y={570} w={480} texto="En mi intercambio: otro idioma, nuevos amigos, otro plan de estudios…" u={ac(t, M('intercambio'), M('intercambio') + 2.4)} c={c} id={ID} marca />
                      </g>
                      {trato > 0.5 && <g transform="translate(600 520)"><Visto x={0} y={0} s={1.6} /></g>}
                      <g opacity={e1(t, M('trato') + 0.5)}><Insignia x={600} y={330} texto="trato cerrado" c={c} id={ID} tono="verde" /></g>
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
