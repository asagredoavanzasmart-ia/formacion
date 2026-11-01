import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Chip, Estrella, Etiqueta, Gesto, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Cinco formas de decidir» (Williams y Miller), escena propia. Acto A: la propuesta se arma con pasión,
 * lógica y datos, y termina en el archivador. Acto B: lo decisivo es quién decide y cómo: un grupo, una
 * mira sobre quien decide y el contador de 1 600 ejecutivos. Acto C: los cinco estilos, cada uno con su
 * emblema, y sus porcentajes como barras. Acto D: la diana donde más de la mitad de los dardos no da; el
 * 80 % de las presentaciones apunta a un 28 %; y los cinco a la misma altura: ninguno es superior.
 */

const ID = 'ce1d';
const nombres = ['propuesta', 'apasionado', 'logica', 'datos', 'archivaron', 'williams', 'entrega', 'quien', 'estilo', 'mil600', 'cinco', 'carismaticos', 'pensadores', 'escepticos', 'seguidores', 'controladores', 'myers', 'riesgo', 's36', 's25', 's19', 's11', 's9', 'mitad', 'ochenta', 'veintiocho', 'superior', 'pregunta'] as const;

/* Emblema de cada estilo de decisión, dibujado en un círculo de radio ~28. */
export const Emblema: React.FC<{ k: number; x: number; y: number; c: Tono; id: string; s?: number }> = ({ k, x, y, c, id, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={32} fill={c.panel2} />
    {k === 0 && <Estrella x={0} y={2} r={20} fill={NARANJA} />}
    {k === 1 && <g><rect x={-20} y={-16} width={19} height={32} rx={3} fill={NARANJA} /><rect x={1} y={-16} width={19} height={32} rx={3} fill={ROSA} /><rect x={-15} y={-8} width={10} height={3} fill="#fff" /><rect x={6} y={-8} width={10} height={3} fill="#fff" /></g>}
    {k === 2 && <g><circle cx={-4} cy={-4} r={13} fill="none" stroke={NARANJA} strokeWidth={6} /><path d="M 5 5 L 18 18" stroke={ROSA} strokeWidth={7} strokeLinecap="round" /></g>}
    {k === 3 && <g>{[-16, 0, 16].map((dx, j) => <circle key={dx} cx={dx} cy={0} r={7} fill={j === 0 ? ROSA : NARANJA} opacity={j === 0 ? 1 : 0.6} />)}</g>}
    {k === 4 && <g><rect x={-15} y={-20} width={30} height={40} rx={5} fill={`url(#${id}-marca)`} />{[-8, 2, 12].map((dy) => <rect key={dy} x={-9} y={dy - 2} width={18} height={4} rx={2} fill="#fff" />)}</g>}
  </g>
);

export const ESTILOS = ['carismáticos', 'pensadores', 'escépticos', 'seguidores', 'controladores'];

export const EstilosDecisionCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('superior') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Cinco formas de decidir'], [M('propuesta'), 'Tu mejor propuesta'], [M('archivaron'), 'Archivada'], [M('williams'), 'Williams y Miller'],
    [M('quien'), 'Quién decide'], [M('mil600'), 'Más de 1 600 ejecutivos'], [M('cinco'), 'Cinco estilos'], [M('myers'), 'No es personalidad'],
    [M('s36'), 'Cuántos hay de cada uno'], [M('mitad'), 'El error común'], [M('ochenta'), 'Apuntan al 28 %'], [M('superior'), 'Ninguno es superior'],
  ];

  const aA = ventana(t, -1, M('williams') + 1.2);
  const aB = ventana(t, M('williams') + 1.2, M('cinco'));
  const aC = ventana(t, M('cinco'), M('mitad'));
  const aD1 = ventana(t, M('mitad'), M('ochenta'));
  const aD2 = ventana(t, M('ochenta'), M('superior'));
  const aD3 = ac(t, M('superior'), M('superior') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cinco estilos de decisión: seguidores, carismáticos, escépticos, pensadores y controladores; casi todas las presentaciones apuntan al 28 %">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · la propuesta perfecta que termina archivada */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const arch = ac(t, M('archivaron'), M('archivaron') + 1.4);
                  const fx = lerp(620, 960, arch), fy = lerp(470, 520, arch), fs = lerp(1, 0.45, arch);
                  const items: [string, number, number][] = [['pasión', M('apasionado'), 0], ['lógica', M('logica'), 1], ['datos', M('datos'), 2]];
                  return (
                    <g>
                      <Persona id={ID} x={250} y={740} />
                      <Gesto x={250} y={740} animo={0.6 - 1.2 * arch} />
                      {/* archivador */}
                      <g opacity={e1(t, M('archivaron') - 0.2)}>
                        <rect x={860} y={380} width={200} height={380} rx={16} fill={c.apagado} style={sombra(c.sombra)} />
                        {[0, 1, 2].map((k) => <g key={k}><rect x={876} y={396 + k * 122} width={168} height={108} rx={10} fill={c.panel2} /><rect x={936} y={440 + k * 122} width={48} height={12} rx={6} fill={c.tenue} /></g>)}
                      </g>
                      {/* la carpeta */}
                      <g opacity={e1(t, M('propuesta')) * (1 - ac(t, M('archivaron') + 1.1, M('archivaron') + 1.5))} transform={`translate(${fx} ${fy}) scale(${fs})`}>
                        <path d="M -140 -170 L -60 -170 L -40 -150 L 140 -150 L 140 170 L -140 170 Z" fill={`url(#${ID}-marca)`} style={sombra(c.sombra)} />
                        <rect x={-126} y={-130} width={252} height={286} rx={12} fill={c.panel} />
                        {items.map(([txt, t0, k]) => {
                          const op = e1(t, t0 + 0.6);
                          const y = -70 + k * 80;
                          return op > 0.01 ? (
                            <g key={txt} opacity={op}>
                              <circle cx={-80} cy={y} r={20} fill={[ROSA, NARANJA, c.tenue][k]} />
                              <Txt f="a" x={-46} y={y + 10} fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                            </g>
                          ) : null;
                        })}
                      </g>
                      {/* cada ingrediente cae en la carpeta */}
                      {items.map(([txt, t0, k]) => {
                        const u = ac(t, t0, t0 + 0.7);
                        if (u <= 0 || u >= 1) return null;
                        return <circle key={txt} cx={540} cy={lerp(160, 400 + k * 80, u)} r={20} fill={[ROSA, NARANJA, c.tenue][k]} opacity={1 - u * 0.3} />;
                      })}
                      <Chip x={960} y={310} texto="archivada" c={c} id={ID} op={e1(t, M('archivaron') + 1.2)} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B · quién decide y cómo */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Persona id={ID} x={170} y={760} s={0.85} cuerpo="#334155" corbata />
                <Persona id={ID} x={290} y={760} s={0.85} cuerpo="#475569" pelo="#5b3a26" />
                <Etiqueta x={230} y={815} texto="Williams y Miller" op={e1(t, M('williams') + 0.3)} c={c} id={ID} />
                <g opacity={ventana(t, M('entrega'), M('mil600') + 0.2)}>
                  <Chip x={470} y={380} texto="contenido" c={c} id={ID} op={1 - 0.5 * ac(t, M('entrega') + 0.8, M('entrega') + 1.4)} />
                  <Chip x={860} y={380} texto="cómo se entrega" c={c} id={ID} op={e1(t, M('entrega') + 0.8)} marca />
                </g>
                {(() => {
                  const op = e1(t, M('quien'));
                  if (op < 0.01) return null;
                  const mira = ac(t, M('quien') + 0.6, M('quien') + 1.4);
                  return (
                    <g opacity={op}>
                      {[480, 600, 720, 840, 960].map((x, k) => (
                        <g key={x} opacity={k === 2 ? 1 : 1 - 0.5 * mira}>
                          <Persona id={ID} x={x} y={640} s={0.8} cuerpo={k === 2 ? undefined : ['#64748b', '#475569', '', '#94a3b8', '#334155'][k]} corbata={k === 2} />
                        </g>
                      ))}
                      <g opacity={mira} transform={`translate(720 533) scale(${1.4 - 0.4 * mira})`}>
                        <circle r={64} fill="none" stroke={ROSA} strokeWidth={5} />
                        <circle r={40} fill="none" stroke={ROSA} strokeWidth={3} opacity={0.6} />
                        {[0, 90, 180, 270].map((a) => <line key={a} x1={0} y1={-78} x2={0} y2={-58} stroke={ROSA} strokeWidth={5} transform={`rotate(${a})`} strokeLinecap="round" />)}
                      </g>
                      <Chip x={720} y={725} texto="su estilo de decisión" c={c} id={ID} op={e1(t, M('estilo'))} marca />
                    </g>
                  );
                })()}
                {(() => {
                  const op = e1(t, M('mil600'));
                  if (op < 0.01) return null;
                  const n = Math.round(1600 * ac(t, M('mil600'), M('mil600') + 1.4));
                  return (
                    <g opacity={op}>
                      <Txt x={720} y={250} textAnchor="middle" fontSize={78} fill={NARANJA} peso={800}>{n.toLocaleString('es-CL')}</Txt>
                      <Txt f="a" x={720} y={300} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>ejecutivos · 2 años</Txt>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · los cinco estilos y cuántos hay de cada uno */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const marcasE = [M('carismaticos'), M('pensadores'), M('escepticos'), M('seguidores'), M('controladores')];
                  const pct = [25, 11, 19, 36, 9];
                  const tPct = [M('s25'), M('s11'), M('s19'), M('s36'), M('s9')];
                  return (
                    <g>
                      {ESTILOS.map((txt, k) => {
                        const op = e1(t, marcasE[k]);
                        if (op < 0.01) return null;
                        const y = 175 + k * 100;
                        const g = ac(t, tPct[k], tPct[k] + 1);
                        const foco = t >= tPct[k] && t < tPct[k] + 3 ? 1 : 0;
                        return (
                          <g key={txt} opacity={op}>
                            <Emblema k={k} x={200} y={y} c={c} id={ID} />
                            <Txt f="a" x={250} y={y + 10} fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                            <rect x={610} y={y - 18} width={400} height={36} rx={18} fill={c.apagado} opacity={0.35} />
                            <rect x={610} y={y - 18} width={Math.max(0, 10 * pct[k] * g)} height={36} rx={18} fill={k === 3 ? `url(#${ID}-marcaH)` : NARANJA} opacity={0.75 + 0.25 * foco} />
                            {g > 0.05 && <Txt x={620 + 10 * pct[k] * g + 14} y={y + 12} fontSize={MIN_TXT} fill={k === 3 ? ROSA : c.texto} peso={800} opacity={g}>{pct[k]} %</Txt>}
                          </g>
                        );
                      })}
                      <g opacity={ventana(t, M('myers'), M('riesgo'))}><Chip x={600} y={720} texto="no es un perfil de personalidad" c={c} id={ID} op={1} /></g>
                      <g opacity={ventana(t, M('riesgo'), M('mitad'))}><Chip x={600} y={720} texto="decisiones complejas y de alto riesgo" c={c} id={ID} op={1} marca /></g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D1 · más de la mitad no da en el blanco */}
            {aD1 > 0.01 && (
              <g opacity={aD1}>
                <g transform="translate(600 440)">
                  {[170, 128, 86, 44].map((r, k) => <circle key={r} r={r} fill={k % 2 ? c.panel : (k === 3 ? ROSA : c.panel2)} style={k === 0 ? sombra(c.sombra) : undefined} />)}
                  {[[-150, -40], [120, -110], [140, 90], [-90, 130], [-20, -150], [20, 8], [-30, 14], [8, -24]].map(([dx, dy], k) => {
                    const u = ac(t, M('mitad') + 0.3 + k * 0.25, M('mitad') + 0.55 + k * 0.25);
                    if (u <= 0) return null;
                    const fuera = k < 5;
                    return (
                      <g key={k} transform={`translate(${dx + (1 - u) * 300} ${dy - (1 - u) * 120})`}>
                        <line x1={0} y1={0} x2={44} y2={-22} stroke={fuera ? c.tenue : NARANJA} strokeWidth={6} strokeLinecap="round" />
                        <circle r={7} fill={fuera ? c.tenue : NARANJA} />
                      </g>
                    );
                  })}
                </g>
                <Chip x={600} y={720} texto="más de la mitad no coincide" c={c} id={ID} op={e1(t, M('mitad') + 2.3)} marca />
              </g>
            )}

            {/* D2 · el 80 % apunta al 28 % */}
            {aD2 > 0.01 && (
              <g opacity={aD2}>
                {([['a quién apuntan las presentaciones', 80, 300, M('ochenta')], ['cuántos son de verdad', 28, 520, M('veintiocho')]] as const).map(([txt, v, y, t0]) => {
                  const op = e1(t, t0);
                  if (op < 0.01) return null;
                  const g = ac(t, t0, t0 + 1.2);
                  return (
                    <g key={txt} opacity={op}>
                      <Txt f="a" x={180} y={y - 40} fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                      <rect x={180} y={y - 22} width={840} height={60} rx={30} fill={c.apagado} opacity={0.35} />
                      <rect x={180} y={y - 22} width={Math.max(60, 8.4 * v * g)} height={60} rx={30} fill={v > 50 ? `url(#${ID}-marcaH)` : NARANJA} />
                      <Txt x={160 + 8.4 * v * g} y={y + 22} fontSize={44} fill="#fff" peso={800} textAnchor="end" opacity={g}>{v} %</Txt>
                    </g>
                  );
                })}
                <g opacity={e1(t, M('ochenta') + 0.6)}>
                  <Emblema k={2} x={220} y={700} c={c} id={ID} />
                  <Emblema k={4} x={300} y={700} c={c} id={ID} />
                  <Txt f="a" x={350} y={710} fontSize={MIN_TXT} fill={c.texto}>escépticos y controladores</Txt>
                </g>
              </g>
            )}

            {/* D3 · ninguno es superior */}
            {aD3 > 0.01 && (
              <g opacity={aD3}>
                <rect x={160} y={652} width={880} height={10} rx={5} fill={c.apagado} />
                {[240, 420, 600, 780, 960].map((x, k) => (
                  <g key={x} opacity={e1(t, M('superior') + 0.2 + k * 0.2)}>
                    <Persona id={ID} x={x} y={650} s={0.9} cuerpo={['', '#64748b', '#475569', '#94a3b8', '#334155'][k] || undefined} />
                    <Emblema k={k} x={x} y={420} c={c} id={ID} s={0.9} />
                  </g>
                ))}
                <Chip x={600} y={260} texto="cada uno rinde en su entorno" c={c} id={ID} op={e1(t, M('superior') + 1.4)} marca />
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
