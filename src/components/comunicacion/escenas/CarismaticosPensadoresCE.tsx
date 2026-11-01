import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Estrella, Etiqueta, Gesto, Hoja, PanelPregunta, Reloj, Rotulo, Cruz, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';
import { Emblema } from './EstilosDecisionCE';

/**
 * «Carismáticos y pensadores», escena propia. Acto A: el carismático rodeado de ideas que se encienden
 * y cuadros que entran (procesa en imágenes); la balanza entusiasmo–realidad que se nivela; el vendedor
 * que no se contagia y habla de riesgos; una lámina de resultados con lo más importante primero y las
 * palabras que funcionan. Acto B: el pensador entre libros; los cuatro informes que pide; el camino de su
 * método del punto A al B; la mala experiencia que no olvida; dudas primero, tiempo y silencios.
 * Acto C: Mary Flood reorganiza en equipos regionales y presenta en dos columnas, una para cada jefe, con
 * el orden casi inverso.
 */

const ID = 'ce1k';
const nombres = ['carismaticos', 'visual', 'branson', 'engana', 'equilibrada', 'resiste', 'riesgos', 'resultados', 'apoyos', 'importante', 'palabras', 'pensadores', 'dell', 'dificiles', 'informacion', 'metodologia', 'ab', 'olvidan', 'dudas', 'tiempo', 'silencios', 'mary', 'regionales', 'jefeCar', 'pizarra', 'noHacer', 'antePens', 'dosReu', 'tresOp', 'debiles', 'inverso', 'pregunta'] as const;

/* Triángulo de advertencia (riesgo). */
const Alerta: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -34 L 32 24 L -32 24 Z" fill="#f59e0b" strokeLinejoin="round" stroke="#f59e0b" strokeWidth={8} />
    <rect x={-4} y={-14} width={8} height={22} rx={4} fill="#fff" />
    <circle cx={0} cy={16} r={4.5} fill="#fff" />
  </g>
);

/* Balanza con dos platillos; `inc` en grados (positivo = baja la izquierda). */
const Balanza: React.FC<{ x: number; y: number; inc: number; c: Tono; izq: React.ReactNode; der: React.ReactNode }> = ({ x, y, inc, c, izq, der }) => {
  const a = (inc * Math.PI) / 180, L = 180;
  const pi = { x: -L * Math.cos(a), y: L * Math.sin(a) }, pd = { x: L * Math.cos(a), y: -L * Math.sin(a) };
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-10} y={0} width={20} height={200} rx={6} fill={c.apagado} />
      <rect x={-70} y={196} width={140} height={18} rx={9} fill={c.apagado} />
      <line x1={pi.x} y1={pi.y} x2={pd.x} y2={pd.y} stroke={c.tenue} strokeWidth={10} strokeLinecap="round" />
      <circle r={14} fill={c.texto} />
      {[pi, pd].map((p, k) => (
        <g key={k} transform={`translate(${p.x} ${p.y})`}>
          <line x1={0} y1={0} x2={-46} y2={70} stroke={c.tenue} strokeWidth={3} />
          <line x1={0} y1={0} x2={46} y2={70} stroke={c.tenue} strokeWidth={3} />
          <path d="M -64 70 Q 0 100 64 70 Z" fill={c.panel2} style={sombra(c.sombra, 3, 6)} />
          <g transform="translate(0 46)">{k === 0 ? izq : der}</g>
        </g>
      ))}
    </g>
  );
};

export const CarismaticosPensadoresCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('inverso') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Los carismáticos'], [M('visual'), 'Piensan en imágenes'], [M('engana'), 'El entusiasmo engaña'], [M('resiste'), 'No te contagies'],
    [M('resultados'), 'Resultados, simple y visual'], [M('palabras'), 'Palabras que funcionan'], [M('pensadores'), 'Los pensadores'],
    [M('dificiles'), 'Los más difíciles'], [M('metodologia'), 'Tu método, del A al B'], [M('olvidan'), 'No olvidan'], [M('dudas'), 'Dudas primero, y tiempo'],
    [M('mary'), 'Mary Flood'], [M('jefeCar'), 'Dos jefes, dos guiones'], [M('inverso'), 'Orden casi inverso'],
  ];

  const aA1 = ventana(t, -1, M('engana'));
  const aA2 = ventana(t, M('engana'), M('resultados'));
  const aA3 = ventana(t, M('resultados'), M('pensadores'));
  const aA = ventana(t, -1, M('pensadores'));
  const aB = ventana(t, M('pensadores'), M('mary'));
  const aB1 = ventana(t, M('pensadores'), M('metodologia'));
  const aB2 = ventana(t, M('metodologia'), M('mary'));
  const aC1 = ventana(t, M('mary'), M('jefeCar'));
  const aC2 = ac(t, M('jefeCar'), M('jefeCar') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Al carismático, riesgos, resultados y apoyos visuales; al pensador, toda la información, tu método y tiempo">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · el carismático */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <Persona id={ID} x={230} y={750} />
                <Gesto x={230} y={750} animo={0.8 - 0.5 * ac(t, M('equilibrada'), M('equilibrada') + 0.6)} />
                <Emblema k={0} x={230} y={800} c={c} id={ID} s={0.8} />
                {/* ideas que se encienden sobre su cabeza */}
                {aA1 > 0.01 && [0, 1, 2, 3].map((k) => {
                  const u = (t * 0.5 + k / 4) % 1;
                  return <Estrella key={k} x={150 + k * 55} y={520 - u * 150} r={14 + 6 * Math.sin(Math.PI * u)} fill={k % 2 ? ROSA : NARANJA} op={aA1 * Math.sin(Math.PI * u) * e1(t, M('carismaticos'))} />;
                })}
              </g>
            )}
            {aA1 > 0.01 && (
              <g opacity={aA1}>
                <Chip x={700} y={240} texto="se entusiasma rápido" c={c} id={ID} op={e1(t, M('carismaticos') + 0.4)} marca />
                {[0, 1, 2].map((k) => {
                  const op = e1(t, M('visual') + k * 0.3);
                  if (op < 0.01) return null;
                  const x = 520 + k * 190;
                  return (
                    <g key={k} opacity={op} transform={`translate(${x} ${470 + 8 * Math.sin(t * 1.5 + k)})`}>
                      <rect x={-75} y={-55} width={150} height={110} rx={14} fill={c.panel} style={sombra(c.sombra, 4, 8)} />
                      {k === 0 && <g><circle cx={-30} cy={-15} r={14} fill={NARANJA} /><path d="M -60 40 L -20 0 L 10 25 L 30 5 L 60 40 Z" fill={ROSA} opacity={0.8} /></g>}
                      {k === 1 && <g>{[0, 1, 2].map((j) => <rect key={j} x={-45 + j * 32} y={30 - (j + 1) * 22} width={22} height={(j + 1) * 22} rx={4} fill={j === 2 ? NARANJA : c.apagado} />)}</g>}
                      {k === 2 && <g><circle cx={0} cy={0} r={34} fill={c.apagado} /><path d="M 0 0 L 0 -34 A 34 34 0 0 1 32 12 Z" fill={ROSA} /></g>}
                    </g>
                  );
                })}
              </g>
            )}
            {aA2 > 0.01 && (
              <g opacity={aA2}>
                {(() => {
                  const inc = 14 * ac(t, M('engana'), M('engana') + 0.8) * (1 - ac(t, M('equilibrada'), M('equilibrada') + 1));
                  return (
                    <g>
                      <Balanza x={620} y={330} inc={inc + 1.5 * Math.sin(t * 2)} c={c}
                        izq={<Estrella x={0} y={0} r={26} fill={NARANJA} />}
                        der={<g><rect x={-26} y={-24} width={52} height={40} rx={6} fill={c.tenue} /><rect x={-26} y={-24} width={52} height={10} rx={5} fill={c.texto} opacity={0.3} /></g>} />
                      <Txt f="a" x={440} y={262} textAnchor="middle" fontSize={MIN_TXT} fill={NARANJA} opacity={e1(t, M('engana') + 0.3)}>entusiasmo</Txt>
                      <Txt f="a" x={800} y={262} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={e1(t, M('engana') + 0.6)}>realidad</Txt>
                      <g opacity={e1(t, M('resiste'))}>
                        <Persona id={ID} x={1010} y={750} cuerpo="#64748b" pelo="#5b3a26" />
                        <Gesto x={1010} y={750} animo={0} />
                      </g>
                      <g opacity={e1(t, M('riesgos'))}>
                        <Alerta x={1010} y={440} />
                        <Etiqueta x={1010} y={520} texto="riesgos" op={1} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}
            {aA3 > 0.01 && (
              <g opacity={aA3}>
                <g opacity={e1(t, M('resultados'))}>
                  <rect x={460} y={200} width={480} height={330} rx={24} fill={c.panel} style={sombra(c.sombra)} />
                  <Txt f="a" x={500} y={258} fontSize={MIN_TXT} fill={c.texto}>resultados</Txt>
                  <g opacity={e1(t, M('apoyos'))}>
                    {[0.35, 0.55, 0.85].map((v, k) => <rect key={k} x={520 + k * 100} y={490 - 190 * v * ac(t, M('apoyos'), M('apoyos') + 1)} width={64} height={Math.max(4, 190 * v * ac(t, M('apoyos'), M('apoyos') + 1))} rx={10} fill={k === 2 ? `url(#${ID}-marca)` : c.apagado} />)}
                  </g>
                  <g opacity={e1(t, M('importante'))} transform="translate(880 300)">
                    <circle r={36} fill={`url(#${ID}-marca)`} />
                    <Txt x={0} y={15} textAnchor="middle" fontSize={44} fill="#fff" peso={800}>1</Txt>
                  </g>
                </g>
                {([['resultados', 600, 640], ['probado', 900, 640], ['acciones', 520, 740], ['fácil', 780, 740], ['claro', 1000, 740]] as const).map(([txt, x, y], k) => (
                  <Chip key={txt} x={x} y={y} texto={txt} c={c} id={ID} op={e1(t, M('palabras') + 0.5 + k * 0.35)} marca={k === 0} cae />
                ))}
              </g>
            )}

            {/* ACTO B · el pensador */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Persona id={ID} x={230} y={750} cuerpo="#334155" />
                <Gesto x={230} y={750} animo={0} />
                {/* anteojos */}
                <g stroke="#3b2a20" strokeWidth={3} fill="none"><circle cx={219} cy={619} r={8} /><circle cx={241} cy={619} r={8} /><line x1={227} y1={619} x2={233} y2={619} /></g>
                <Emblema k={1} x={230} y={800} c={c} id={ID} s={0.8} />
                {[0, 1, 2].map((k) => <rect key={k} x={300 + k * 6} y={740 - (k + 1) * 26} width={90 - k * 10} height={22} rx={4} fill={[NARANJA, ROSA, c.tenue][k]} opacity={e1(t, M('pensadores') + 0.4 + k * 0.2)} />)}
              </g>
            )}
            {aB1 > 0.01 && (
              <g opacity={aB1}>
                {([['estudios', 570, 300], ['encuestas', 840, 300], ['casos', 570, 560], ['costos', 840, 560]] as const).map(([txt, x, y], k) => {
                  const op = e1(t, M('informacion') + k * 0.4);
                  return op > 0.01 ? <g key={txt} opacity={op}><Hoja x={x} y={y} w={240} h={200} c={c} cabeza={k % 2 ? ROSA : NARANJA} titulo={txt} llena={ac(t, M('informacion') + k * 0.4, M('informacion') + k * 0.4 + 1)} tituloTam={26} /></g> : null;
                })}
              </g>
            )}
            {aB2 > 0.01 && (
              <g opacity={aB2}>
                {(() => {
                  const u = ac(t, M('ab'), M('ab') + 2.2);
                  const pt = (s: number) => ({ x: lerp(500, 1000, s), y: 560 + 50 * Math.sin(s * Math.PI * 2) });
                  const pts: string[] = [];
                  for (let s = 0; s <= u + 0.001; s += 0.02) { const p = pt(Math.min(s, u)); pts.push(`${p.x},${p.y}`); }
                  const cab = pt(u);
                  return (
                    <g>
                      <path d={Array.from({ length: 51 }, (_, k) => { const p = pt(k / 50); return `${k ? 'L' : 'M'} ${p.x} ${p.y}`; }).join(' ')} fill="none" stroke={c.apagado} strokeWidth={6} strokeDasharray="4 12" strokeLinecap="round" />
                      {pts.length > 1 && <polyline points={pts.join(' ')} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={8} strokeLinecap="round" />}
                      {[0.25, 0.5, 0.75].map((s) => { const p = pt(s); return <circle key={s} cx={p.x} cy={p.y} r={10} fill={u >= s ? NARANJA : c.apagado} />; })}
                      {([['A', 500], ['B', 1000]] as const).map(([l, x]) => (
                        <g key={l} transform={`translate(${x} 560)`} opacity={e1(t, M('metodologia') + (l === 'B' ? 0.5 : 0))}>
                          <circle r={36} fill={l === 'A' ? c.tenue : `url(#${ID}-marca)`} />
                          <Txt x={0} y={15} textAnchor="middle" fontSize={44} fill="#fff" peso={800}>{l}</Txt>
                        </g>
                      ))}
                      {u > 0.01 && u < 1 && <circle cx={cab.x} cy={cab.y} r={14} fill={ROSA} />}
                      <g opacity={ventana(t, M('olvidan'), M('dudas'))}>
                        <Chip x={750} y={300} texto="mala experiencia" c={c} id={ID} op={1} />
                        <Cruz x={1030} y={300} s={0.9} />
                      </g>
                      <g opacity={ventana(t, M('dudas'), M('mary'))}><Chip x={750} y={300} texto="tus dudas, primero" c={c} id={ID} op={1} marca /></g>
                      <g opacity={e1(t, M('tiempo'))}>
                        <Reloj x={750} y={720} s={1} c={c} progreso={t * 0.08} />
                      </g>
                      <g opacity={e1(t, M('silencios'))}>
                        <Burbuja x={250} y={560} w={140} texto="…" u={1} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C1 · Mary Flood y los equipos regionales */}
            {aC1 > 0.01 && (
              <g opacity={aC1}>
                <Persona id={ID} x={230} y={750} pelo="#8a5a2b" />
                <Gesto x={230} y={750} animo={0.6} />
                <Etiqueta x={230} y={810} texto="Mary Flood" op={1} c={c} id={ID} />
                {(() => {
                  const r = ac(t, M('regionales'), M('regionales') + 1);
                  const centros = [[560, 330], [860, 330], [710, 590]];
                  return (
                    <g opacity={e1(t, M('mary') + 0.6)}>
                      {r > 0.01 && centros.map(([cx, cy], k) => <circle key={k} cx={cx} cy={cy} r={110 * r} fill={[NARANJA, ROSA, c.tenue][k]} opacity={0.15} />)}
                      {Array.from({ length: 9 }, (_, k) => {
                        const x0 = 480 + (k % 3) * 160, y0 = 300 + Math.floor(k / 3) * 140;
                        const [cx, cy] = centros[k % 3];
                        const x = lerp(x0, cx + ((Math.floor(k / 3) - 1) * 56), r), y = lerp(y0, cy + (k % 2 ? 20 : -10), r);
                        return <Persona key={k} id={ID} x={x} y={y + 60} s={0.42} cuerpo={r > 0.5 ? [NARANJA, ROSA, c.tenue][k % 3] : c.tenue} />;
                      })}
                      <Chip x={710} y={760} texto="equipos regionales" c={c} id={ID} op={e1(t, M('regionales') + 0.2)} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C2 · un guion para cada jefe */}
            {aC2 > 0.01 && (
              <g opacity={aC2}>
                {([
                  { k: 0, x: 360, titulo: 'carismático', t0: M('jefeCar'), pasos: [['pizarra', M('pizarra')], ['propuesta', M('pizarra') + 1.2], ['no actuar', M('noHacer')]] },
                  { k: 1, x: 840, titulo: 'pensador', t0: M('antePens'), pasos: [['2 reuniones', M('dosReu')], ['3 opciones', M('tresOp')], ['casos 50/50', M('tresOp') + 1.2], ['datos débiles', M('debiles')]] },
                ] as const).map((col) => {
                  const op = e1(t, col.t0);
                  if (op < 0.01) return null;
                  return (
                    <g key={col.titulo} opacity={op}>
                      <Emblema k={col.k} x={col.x - 120} y={200} c={c} id={ID} />
                      <Txt f="a" x={col.x - 75} y={210} fontSize={MIN_TXT} fill={c.texto}>{col.titulo}</Txt>
                      {col.pasos.map(([txt, tt], j) => {
                        const o = e1(t, tt as number);
                        if (o < 0.01) return null;
                        const y = 300 + j * 100;
                        return (
                          <g key={txt} opacity={o} transform={`translate(0 ${(1 - o) * 12})`}>
                            <rect x={col.x - 220} y={y - 38} width={440} height={76} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                            <circle cx={col.x - 180} cy={y} r={22} fill={col.k === 0 ? NARANJA : ROSA} />
                            <Txt x={col.x - 180} y={y + 9} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>{j + 1}</Txt>
                            <Txt f="a" x={col.x - 140} y={y + 10} fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
                {(() => {
                  const op = e1(t, M('inverso'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      <path d="M 600 330 L 600 560" stroke={c.apagado} strokeWidth={6} />
                      <path d="M 585 350 L 600 320 L 615 350 Z" fill={ROSA} />
                      <path d="M 585 540 L 600 570 L 615 540 Z" fill={NARANJA} />
                      <Chip x={600} y={760} texto="orden casi inverso" c={c} id={ID} op={1} marca />
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

