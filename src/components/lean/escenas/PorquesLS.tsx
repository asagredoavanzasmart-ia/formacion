import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, PanelPregunta, Rotulo, Telefono, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, VERDE, VIOLETA, Mar } from './comunLS';
import { Toma, Letrero, Apoyo, Hoja, Corazon, Visto, Cruz, Moneda3D, sm, cl } from './kitLS';
import type { PropsCE } from './comunLS';

/**
 * «La técnica de los cinco porqués», escena propia en cuatro tomas.
 * 1 · El ciclo de feedback se agrieta: aparece un problema.
 * 2 · El iceberg: arriba asoma la apariencia; la cámara bucea con un submarino un nivel por cada «¿por qué?»
 *     hasta el núcleo rojo de la raíz. Luego se aleja y, junto a cada nivel, una batería de energía en
 *     proporción a su tamaño (el problema menor gasta menos) y los lotes pequeños.
 * 3 · El cliente que cancela, como un edificio en corte: un ascensor baja un piso por porqué (la puerta, la app
 *     empolvada, quien no sabe empezar, el manual larguísimo, el escritorio sin revisor) hasta el sótano con la
 *     silla vacía del responsable que faltaba, que se ilumina.
 * 4 · La mesa con todos los implicados: el chivo expiatorio que se va tachado, los lazos de confianza, el error
 *     que se cura y queda protegido, la caja de verdades incómodas y el tiempo y el dinero que hacen crecer.
 */

const ID = 'ls9';
const nombres = ['causa', 'apariencias', 'raiz', 'prop', 'menor', 'lotes', 'cancela', 'nousaba', 'nosupo', 'manual', 'revis', 'resp', 'faltaba', 'implicadas', 'chivo', 'confianza', 'indulg', 'repita', 'verdades', 'dinero', 'pregunta'] as const;
type N = typeof nombres[number];

export const PorquesLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('dinero') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);
  const traje = isDark ? '#8da2c0' : '#334155';
  const agua = isDark ? '#1e3a8a' : '#bfdbfe', aguaP = isDark ? '#172554' : '#93c5fd';
  const hielo = isDark ? '#cbd5e1' : '#f1f5f9', hieloS = isDark ? '#94a3b8' : '#dbeafe';

  const rotulos: [number, string][] = [
    [0.2, 'Aparece un problema'], [M('causa'), 'La causa profunda'], [M('apariencias'), 'Más allá de lo que se ve'], [M('raiz'), 'Hasta la raíz'], [M('prop'), 'Inversión proporcional'], [M('menor'), 'Problema menor, menos energía'], [M('lotes'), 'Con lotes pequeños'],
    [M('cancela'), 'Un cliente cancela'], [M('nousaba'), 'No usaba el servicio'], [M('nosupo'), 'No supo empezar'], [M('manual'), 'Un manual larguísimo'], [M('revis'), 'Nadie lo revisó'], [M('resp'), 'Nadie responsable'], [M('faltaba'), 'Faltaba un responsable'],
    [M('implicadas'), 'Todos los implicados'], [M('chivo'), 'Sin chivo expiatorio'], [M('confianza'), 'Confianza mutua'], [M('indulg'), 'Con indulgencia'], [M('repita'), 'Que no se repita'], [M('verdades'), 'Verdades incómodas'], [M('dinero'), 'Tiempo y dinero'],
  ];

  /* ---------- Toma 2: iceberg con cámara que bucea ---------- */
  const NIV = [440, 610, 780, 950, 1120];
  const tBaja = (k: number) => lerp(M('apariencias') + 0.9, M('raiz') - 0.5, k / 4);
  let camY = 0;
  NIV.forEach((y, k) => { camY = lerp(camY, y - 470, sm(t, tBaja(k) - 0.5, tBaja(k) + 0.4)); });
  const zo = sm(t, M('prop') - 0.6, M('prop') + 0.8);
  const z = lerp(1, 0.58, zo), cx = 600, cyW = lerp(camY, 150, zo), sx = lerp(600, 320, zo), sy = lerp(0, 140, zo);
  const pantY = (w: number) => (w - cyW) * z + sy;
  const sub = NIV.reduce((acc, y, k) => (t >= tBaja(k) - 0.5 ? lerp(acc, y, sm(t, tBaja(k) - 0.5, tBaja(k) + 0.4)) : acc), 330);
  const energia = [0.8, 0.5, 0.65, 0.25, 1];

  /* ---------- Toma 3: edificio en corte ---------- */
  const pisos: N[] = ['cancela', 'nousaba', 'nosupo', 'manual', 'revis', 'resp'];
  const ALTO = 330;
  let camB: number;
  camB = -260;
  pisos.forEach((n, k) => { camB = lerp(camB, k * ALTO - 260, sm(t, M(n) - 0.7, M(n) + 0.1)); });
  const piso = pisos.reduce((a, n, k) => (t >= M(n) - 0.7 ? k : a), 0);
  const cabY = lerp(Math.max(0, piso - 1) * ALTO, piso * ALTO, piso ? sm(t, M(pisos[piso]) - 0.7, M(pisos[piso]) + 0.1) : 1);

  /* ---------- Toma 4 ---------- */
  const llega = (k: number) => sm(t, M('implicadas') + k * 0.25, M('implicadas') + 0.9 + k * 0.25);
  const asientos: [number, number][] = [[190, 520], [330, 470], [490, 470], [630, 520]];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los cinco porqués: de la apariencia a la raíz del problema">
        <Gradientes id={ID} />
        <defs><clipPath id={`${ID}-marco`}><rect x={40} y={110} width={1120} height={720} rx={28} /></clipPath></defs>
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · el ciclo de feedback se agrieta */}
            <Toma t={t} a={-1} b={M('causa')} zi={1}>
              {(() => { const grieta = sm(t, 1.5, 3); return (
                <g transform="translate(600 470)">
                  {[0, 1, 2].map((k) => { const a0 = -Math.PI / 2 + (k * 2 * Math.PI) / 3 + 0.3, a1 = a0 + (2 * Math.PI) / 3 - 0.6; return <path key={k} d={`M ${190 * Math.cos(a0)} ${190 * Math.sin(a0)} A 190 190 0 0 1 ${190 * Math.cos(a1)} ${190 * Math.sin(a1)}`} stroke={[NARANJA, AZUL_M, ROSA][k]} strokeWidth={26} fill="none" strokeLinecap="round" />; })}
                  {['Crear', 'Medir', 'Aprender'].map((n, k) => { const a = -Math.PI / 2 + (k * 2 * Math.PI) / 3; return <Letrero key={n} x={250 * Math.cos(a)} y={250 * Math.sin(a) + (k === 0 ? -10 : 20)} texto={n} fondo={[NARANJA, AZUL_M, ROSA][k]} id={ID} tam={26} />; })}
                  {(() => { const a = -Math.PI / 2 + t * 1.2 * (1 - grieta * 0.9); return <circle cx={190 * Math.cos(a)} cy={190 * Math.sin(a)} r={20} fill="#fff" stroke={NARANJA} strokeWidth={7} />; })()}
                  <g transform="translate(164 96)" opacity={grieta}><path d="M -20 -30 L 4 -8 L -10 6 L 16 30" stroke="#1f2937" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
                  <g opacity={grieta} transform={`scale(${0.9 + 0.1 * Math.sin(t * 6)})`}><path d="M 0 -56 L 52 36 H -52 Z" fill={ROJO_M} /><rect x={-5} y={-26} width={10} height={36} rx={5} fill="#fff" /><circle cy={22} r={6} fill="#fff" /></g>
                </g>
              ); })()}
            </Toma>

            {/* TOMA 2 · el iceberg */}
            <Toma t={t} a={M('causa')} b={M('cancela')} zi={1.04}>
              <g clipPath={`url(#${ID}-marco)`}>
                <g transform={`translate(${sx} ${sy}) scale(${z}) translate(${-cx} ${-cyW})`}>
                  <rect x={-800} y={300} width={2800} height={1100} fill={agua} />
                  <rect x={-800} y={700} width={2800} height={700} fill={aguaP} opacity={0.6} />
                  {/* iceberg */}
                  <path d="M 520 300 L 560 190 L 610 150 L 650 210 L 700 300 Z" fill={hielo} style={{ filter: 'drop-shadow(0 0 3px rgba(30,41,59,0.45))' }} />
                  <path d="M 610 150 L 650 210 L 700 300 H 610 Z" fill={hieloS} />
                  <path d="M 520 300 L 380 520 L 330 800 L 400 1060 L 540 1220 L 700 1210 L 840 1040 L 900 760 L 850 500 L 700 300 Z" fill={hielo} opacity={0.92} />
                  <path d="M 610 300 L 700 300 L 850 500 L 900 760 L 840 1040 L 700 1210 L 610 1215 Z" fill={hieloS} opacity={0.9} />
                  {NIV.map((y, k) => <path key={k} d={`M ${400 - k * 12 + (k > 2 ? (k - 2) * 40 : 0)} ${y + 85} H ${860 - (k > 2 ? (k - 2) * 30 : 0)}`} stroke={isDark ? '#64748b' : '#bfdbfe'} strokeWidth={4} strokeDasharray="14 10" opacity={t >= tBaja(k) ? 1 : 0} />)}
                  {/* núcleo de la raíz */}
                  {t >= M('raiz') - 0.3 && <g transform="translate(615 1120)" opacity={e1(t, M('raiz') - 0.3)}><circle r={70 + 8 * Math.sin(t * 4)} fill={ROJO_M} opacity={0.25} /><circle r={46} fill={ROJO_M} /><circle cx={-14} cy={-14} r={10} fill="#fff" opacity={0.4} /></g>}
                  {/* el submarino que baja */}
                  {zo < 0.99 && t >= M('causa') && <g transform={`translate(1000 ${sub + 6 * Math.sin(t * 2)})`} opacity={1 - zo}>
                    <path d="M -10 -20 L -150 -60 V 60 L -10 20 Z" fill="#fde047" opacity={0.25} />
                    <ellipse cx={40} cy={0} rx={70} ry={34} fill="#f59e0b" /><rect x={20} y={-56} width={40} height={30} rx={8} fill="#f59e0b" /><circle cx={20} cy={0} r={14} fill="#bfdbfe" /><circle cx={60} cy={0} r={14} fill="#bfdbfe" /><path d={`M 110 -14 L 130 ${-20 + 8 * Math.sin(t * 20)} V ${20 - 8 * Math.sin(t * 20)} L 110 14 Z`} fill="#64748b" />
                    {[0, 1, 2].map((k) => { const ph = (t * 0.8 + k / 3) % 1; return <circle key={k} cx={40 + 20 * Math.sin(k)} cy={-60 - 90 * ph} r={5 + 4 * ph} fill="#fff" opacity={0.6 * (1 - ph)} />; })}
                  </g>}
                </g>
              </g>
              {/* apariencia y porqués (en pantalla, junto a cada nivel) */}
              {t >= M('apariencias') && zo < 0.99 && pantY(230) > 170 && <Letrero x={880} y={pantY(230)} texto="Lo que se ve" fondo={c.panel} color={c.texto} id={ID} op={e1(t, M('apariencias')) * (1 - zo)} />}
              {NIV.map((y, k) => t >= tBaja(k) && pantY(y) > 120 && pantY(y) < 840 && (
                <g key={k} opacity={e1(t, tBaja(k))}>
                  <Letrero x={zo > 0.5 ? 120 : 260} y={pantY(y) + 20} texto={zo > 0.5 ? `${k + 1}` : `${k + 1}. ¿Por qué?`} fondo={k === 4 ? ROJO_M : NARANJA} id={ID} tam={zo > 0.5 ? 24 : 30} />
                </g>
              ))}
              {/* energía proporcional a cada nivel */}
              {t >= M('prop') && NIV.map((y, k) => { const e = e1(t, M('prop') + 0.6 + k * 0.2); const chico = t >= M('menor') && k === 3; const yy = pantY(y) + 20; return (
                <g key={k} opacity={e}>
                  <path d={`M 560 ${yy} H 640`} stroke={c.apagado} strokeWidth={3} strokeDasharray="6 6" />
                  <rect x={660} y={yy - 22} width={360} height={44} rx={12} fill={c.apagado} opacity={0.4} />
                  <rect x={1020} y={yy - 10} width={10} height={20} rx={3} fill={c.apagado} />
                  <rect x={664} y={yy - 18} width={352 * energia[k] * ac(t, M('prop') + 0.6 + k * 0.2, M('prop') + 1.6 + k * 0.2)} height={36} rx={9} fill={chico ? VERDE : '#f59e0b'} style={chico ? { filter: `drop-shadow(0 0 ${8 + 4 * Math.sin(t * 5)}px ${VERDE})` } : undefined} />
                  <path d={`M 690 ${yy - 12} l -8 14 h 9 l -5 12 l 14 -16 h -9 l 5 -10 Z`} fill="#fff" />
                </g>
              ); })}
              {t >= M('lotes') && <g opacity={e1(t, M('lotes'))}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${720 + k * 70} ${160 - 8 * Math.abs(Math.sin(t * 4 + k))})`}><rect x={-24} y={-24} width={48} height={48} rx={8} fill={AZUL_M} /><path d="M -24 -24 L 0 -36 L 24 -24 Z" fill="#93c5fd" /></g>)}<Letrero x={1000} y={160} texto="Lotes pequeños" fondo={AZUL_M} id={ID} tam={24} /></g>}
            </Toma>

            {/* TOMA 3 · el edificio en corte: un piso por porqué */}
            <Toma t={t} a={M('cancela')} b={M('implicadas')}>
              <g clipPath={`url(#${ID}-marco)`}>
                <g transform={`translate(0 ${-camB})`}>
                  {/* techo y tierra */}
                  <path d={`M 70 0 L 680 -110 L 1140 0 Z`} fill={isDark ? '#475569' : '#94a3b8'} /><rect x={240} y={-30} width={60} height={30} fill="#7c4a1e" />
                  <rect x={40} y={pisos.length * ALTO + 40} width={1120} height={500} fill={isDark ? '#3b2a1a' : '#a97d55'} />
                  {/* hueco del ascensor */}
                  <rect x={90} y={-200} width={150} height={pisos.length * ALTO + 400} fill={isDark ? '#1f2937' : '#cbd5e1'} />
                  <rect x={160} y={-200} width={10} height={pisos.length * ALTO + 400} fill="#64748b" />
                  {pisos.map((n, k) => {
                    const y0 = k * ALTO, base = y0 + 290; const e = e1(t, M(n)); const sotano = k === 5;
                    return (
                      <g key={n}>
                        <rect x={240} y={y0} width={880} height={ALTO} fill={sotano ? (isDark ? '#111827' : '#334155') : k % 2 ? (isDark ? '#262b33' : '#f1f5f9') : (isDark ? '#2b313a' : '#e8edf3')} />
                        <rect x={90} y={base} width={1030} height={40} fill={isDark ? '#475569' : '#94a3b8'} />
                        <g opacity={e}>
                          {k > 0 && <Letrero x={420} y={y0 + 60} texto={`${k}. ¿Por qué?`} fondo={NARANJA} id={ID} tam={26} />}
                          {k === 0 && (() => { const sale = sm(t, M('cancela') + 0.5, M('cancela') + 2.2); return <g>
                            <rect x={880} y={base - 200} width={110} height={200} rx={6} fill={isDark ? '#8294b3' : '#64748b'} /><rect x={880 + 110 * (1 - sale * 0.8)} y={base - 200} width={110 * sale * 0.8} height={200} fill="#fde68a" opacity={0.6} />
                            <g transform={`translate(${lerp(640, 940, sale)} 0)`} opacity={1 - sm(t, M('cancela') + 1.8, M('cancela') + 2.4)}><Persona id={ID} x={0} y={base} s={0.7} cuerpo={VIOLETA} /></g>
                            <g transform={`translate(560 ${base - 140}) rotate(-8)`}><rect x={-90} y={-40} width={180} height={80} rx={12} fill={ROJO_M} /><Txt x={0} y={14} textAnchor="middle" fontSize={34} fill="#fff">CANCELA</Txt></g>
                          </g>; })()}
                          {k === 1 && <g>
                            <Telefono x={700} y={base - 130} s={1.05} widgets={4} />
                            <rect x={639} y={base - 245} width={122} height={230} rx={22} fill="#64748b" opacity={0.55} />
                            <path d="M 640 60 L 690 60 M 640 60 L 640 110 M 640 60 L 680 100" transform={`translate(0 ${base - 300})`} stroke="#cbd5e1" strokeWidth={3} />
                            {[0, 1, 2].map((q) => { const ph = (t * 0.4 + q / 3) % 1; return <circle key={q} cx={680 + q * 30} cy={base - 260 + 200 * ph} r={3} fill="#cbd5e1" opacity={1 - ph} />; })}
                            <Txt f="a" x={800} y={base - 210} fontSize={40} fill={c.tenue} opacity={0.5 + 0.5 * Math.sin(t * 2)}>z z</Txt>
                          </g>}
                          {k === 2 && <g>
                            <Persona id={ID} x={560} y={base} s={0.75} cuerpo="#0f766e" />
                            <g transform={`translate(600 ${base - 190}) rotate(${15 * Math.sin(t * 3)})`}><Txt x={0} y={0} textAnchor="middle" fontSize={64} fill={ROSA}>?</Txt></g>
                            {[[760, -80, 0], [860, -160, 90], [960, -60, 200], [880, -40, 300]].map(([x, dy, r], q) => <g key={q} transform={`translate(${x} ${base + (dy as number)}) rotate(${(r as number) + 20 * Math.sin(t + q)})`}><path d="M -30 0 H 20 M 8 -12 L 22 0 L 8 12" stroke={c.tenue} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>)}
                          </g>}
                          {k === 3 && (() => { const largo = 40 + 200 * ac(t, M('manual'), M('manual') + 2); return <g>
                            <rect x={640} y={base - 260} width={180} height={30} rx={15} fill="#e5e7eb" />
                            <rect x={652} y={base - 240} width={156} height={largo} fill="#fff" style={{ filter: 'drop-shadow(0 3px 6px rgba(15,23,42,0.35))' }} />
                            {Array.from({ length: Math.floor(largo / 18) }, (_, q) => <rect key={q} x={668} y={base - 226 + q * 18} width={124 - (q % 3) * 30} height={6} rx={3} fill="#94a3b8" />)}
                            <Persona id={ID} x={940} y={base} s={0.7} cuerpo={VIOLETA} />
                            <Txt x={970} y={base - 160} textAnchor="middle" fontSize={44} fill={c.tenue}>…</Txt>
                          </g>; })()}
                          {k === 4 && <g>
                            <rect x={560} y={base - 110} width={300} height={16} rx={6} fill="#a16207" /><rect x={580} y={base - 94} width={14} height={94} fill="#a16207" /><rect x={826} y={base - 94} width={14} height={94} fill="#a16207" />
                            <Hoja x={700} y={base - 150} w={90} h={70} lineas={3} rot={-6} />
                            <g transform={`translate(940 ${base - 70})`} opacity={0.5}><rect x={-30} y={-70} width={60} height={60} rx={10} fill="#94a3b8" /><rect x={-34} y={-12} width={68} height={14} rx={5} fill="#94a3b8" /><rect x={-28} y={2} width={8} height={68} fill="#94a3b8" /><rect x={20} y={2} width={8} height={68} fill="#94a3b8" /></g>
                            <g transform={`translate(700 ${base - 220})`}><path d="M -36 0 Q 0 -26 36 0 Q 0 26 -36 0" fill={c.panel} stroke="#64748b" strokeWidth={5} /><circle r={9} fill="#334155" /><path d="M -40 -26 L 40 26" stroke={ROJO_M} strokeWidth={8} strokeLinecap="round" /></g>
                          </g>}
                          {k === 5 && (() => { const luz = sm(t, M('faltaba'), M('faltaba') + 0.8); return <g>
                            <path d={`M 690 ${y0 + 20} L 600 ${base} H 820 L 730 ${y0 + 20} Z`} fill="#fde68a" opacity={0.12 + 0.35 * luz} />
                            <g transform={`translate(710 ${base})`}><Apoyo x={0} y={2} rx={80} /><rect x={-40} y={-150} width={80} height={80} rx={14} fill="#94a3b8" /><rect x={-46} y={-74} width={92} height={18} rx={6} fill="#94a3b8" /><rect x={-38} y={-56} width={10} height={56} fill="#94a3b8" /><rect x={28} y={-56} width={10} height={56} fill="#94a3b8" /></g>
                            <Bombilla x={710} y={y0 + 70} s={0.6} t={t} luz={luz} id={ID} />
                            <Letrero x={940} y={base - 120} texto="Falta un responsable" fondo="#be123c" id={ID} op={luz} />
                          </g>; })()}
                        </g>
                      </g>
                    );
                  })}
                  {/* la cabina del ascensor con la detective */}
                  <g transform={`translate(165 ${cabY + 290})`}>
                    <rect x={-60} y={-200} width={120} height={200} rx={10} fill={isDark ? '#475569' : '#f8fafc'} style={{ filter: 'drop-shadow(0 4px 8px rgba(15,23,42,0.35))' }} />
                    <rect x={-60} y={-200} width={120} height={20} rx={8} fill={NARANJA} />
                    <Persona id={ID} x={-6} y={-6} s={0.6} cuerpo={VIOLETA} />
                    <g transform="translate(30 -96)"><rect x={-4} y={-16} width={8} height={20} rx={3} fill="#334155" /><circle cy={8} r={10} fill="#fde047" /><circle cy={8} r={20} fill="#fde047" opacity={0.3 + 0.1 * Math.sin(t * 6)} /></g>
                  </g>
                </g>
              </g>
            </Toma>

            {/* TOMA 4 · la mesa del equipo */}
            <Toma t={t} a={M('implicadas')} b={fin + 5}>
              {asientos.map(([x, y], k) => <g key={k} opacity={llega(k)} transform={`translate(0 ${-40 * (1 - llega(k))})`}><Persona id={ID} x={x} y={y} s={0.46} cuerpo={[traje, VIOLETA, '#0f766e', '#ec4899'][k]} /></g>)}
              <ellipse cx={410} cy={584} rx={310} ry={92} fill="#a16207" /><ellipse cx={410} cy={572} rx={310} ry={86} fill="#ca8a04" />
              {[0, 1, 2].map((k) => <g key={k} transform={`translate(${300 + k * 110} 560)`}><rect x={-22} y={-14} width={44} height={28} rx={4} fill="#fff" opacity={0.85} /></g>)}
              {[[250, 710], [570, 710]].map(([x, y], k) => <g key={k} opacity={llega(k + 4)}><Persona id={ID} x={x} y={y} s={0.46} cuerpo={['#f59e0b', AZUL_M][k]} /></g>)}
              {t >= M('confianza') && (
                <g opacity={e1(t, M('confianza'))}>
                  {asientos.map(([x, y], k) => k < 3 && <path key={k} d={`M ${x} ${y - 70} Q ${(x + asientos[k + 1][0]) / 2} ${Math.min(y, asientos[k + 1][1]) - 120} ${asientos[k + 1][0]} ${asientos[k + 1][1] - 70}`} stroke={ROSA} strokeWidth={5} fill="none" strokeDasharray="10 8" strokeDashoffset={-t * 30} />)}
                  <Corazon x={410} y={330 + 4 * Math.sin(t * 3)} s={0.9 + 0.06 * Math.sin(t * 4)} />
                </g>
              )}
              {/* el chivo que se va, tachado */}
              {t >= M('chivo') && (() => { const va = sm(t, M('chivo') + 1.4, M('chivo') + 3); return (
                <g opacity={e1(t, M('chivo')) * (1 - va)} transform={`translate(${410 + 260 * va} 800)`}>
                  <ellipse cx={0} cy={-18} rx={44} ry={24} fill="#e5e7eb" style={{ filter: 'drop-shadow(0 0 2px rgba(30,41,59,0.5))' }} />
                  {[-28, -10, 14, 30].map((lx, q) => <rect key={lx} x={lx - 4} y={-4 + (q % 2 ? 3 * Math.sin(t * 12) : 0)} width={8} height={26} rx={3} fill="#9ca3af" />)}
                  <ellipse cx={46} cy={-40} rx={18} ry={14} fill="#e5e7eb" style={{ filter: 'drop-shadow(0 0 2px rgba(30,41,59,0.5))' }} />
                  <path d="M 40 -52 Q 34 -72 48 -76 M 52 -52 Q 52 -72 64 -72" stroke="#78716c" strokeWidth={5} fill="none" strokeLinecap="round" /><circle cx={52} cy={-42} r={3} fill="#334155" />
                  <g opacity={ac(t, M('chivo') + 0.6, M('chivo') + 1)}><circle cx={10} cy={-30} r={70} fill="none" stroke={ROJO_M} strokeWidth={9} /><path d="M -40 -80 L 60 20" stroke={ROJO_M} strokeWidth={9} strokeLinecap="round" /></g>
                </g>
              ); })()}
              {/* columna derecha: indulgencia, que no se repita, verdades, tiempo y dinero */}
              {t >= M('indulg') && (() => { const cura = ac(t, M('indulg') + 0.4, M('indulg') + 1.6); return (
                <g opacity={e1(t, M('indulg'))} transform="translate(880 250)">
                  <rect x={-70} y={-56} width={140} height={112} rx={18} fill={cura > 0.5 ? VERDE : ROJO_M} style={sombra(0.25, 4, 10)} />
                  {cura < 0.5 ? <path d="M -24 -24 L 24 24 M 24 -24 L -24 24" stroke="#fff" strokeWidth={11} strokeLinecap="round" /> : <path d="M -28 2 l 18 20 l 36 -40" stroke="#fff" strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                  <g transform={`translate(${lerp(140, 0, cura)} 0) rotate(-35)`} opacity={cura > 0 && cura < 1 ? 1 : 0}><rect x={-60} y={-14} width={120} height={28} rx={14} fill="#fcd34d" /><rect x={-18} y={-14} width={36} height={28} fill="#fde68a" /></g>
                </g>
              ); })()}
              {t >= M('repita') && <g opacity={e1(t, M('repita'))} transform={`translate(1050 250) scale(${0.9 + 0.1 * e1(t, M('repita'))})`}><path d="M 0 -60 L 50 -40 V 2 Q 50 42 0 64 Q -50 42 -50 2 V -40 Z" fill={AZUL_M} /><path d="M -15 -2 h 30 v 26 h -30 Z M -10 -2 v -10 a 10 10 0 0 1 20 0 v 10" fill="none" stroke="#fff" strokeWidth={5} /></g>}
              {t >= M('verdades') && (() => { const abre = ac(t, M('verdades') + 0.3, M('verdades') + 1.2); return (
                <g opacity={e1(t, M('verdades'))} transform="translate(960 500)">
                  {abre > 0.05 && Array.from({ length: 5 }, (_, k) => <path key={k} d={`M 0 -30 L ${-70 + k * 35} -140 L ${-54 + k * 35} -140 Z`} fill="#fde047" opacity={0.55 * abre} />)}
                  <rect x={-90} y={-30} width={180} height={86} rx={10} fill="#92400e" /><rect x={-90} y={-30} width={180} height={14} fill="#78350f" />
                  <g transform={`translate(-90 -30) rotate(${-110 * abre}) translate(90 30)`}><rect x={-94} y={-44} width={188} height={18} rx={6} fill="#b45309" /></g>
                </g>
              ); })()}
              {t >= M('dinero') && (() => { const g = ac(t, M('dinero') + 0.5, M('dinero') + 3); return (
                <g opacity={e1(t, M('dinero'))} transform="translate(960 730)">
                  <g transform="translate(-130 0)"><rect x={-30} y={-54} width={60} height={10} rx={4} fill="#7c4a1e" /><rect x={-30} y={44} width={60} height={10} rx={4} fill="#7c4a1e" /><path d="M -24 -44 H 24 L 4 0 L 24 44 H -24 L -4 0 Z" fill="#e0f2fe" /><path d={`M -20 44 H 20 L ${20 - 14 * (1 - g)} ${44 - 34 * g} H ${-20 + 14 * (1 - g)} Z`} fill="#f59e0b" /></g>
                  {[0, 1, 2].map((k) => <Moneda3D key={k} x={-30 + k * 32} y={36 - k * 12} r={17} />)}
                  <g transform={`translate(110 50) scale(${0.3 + 0.7 * g})`}><rect x={-6} y={-70} width={12} height={70} rx={4} fill="#7c4a1e" /><circle cx={0} cy={-92} r={38} fill="#22c55e" /><circle cx={-24} cy={-70} r={22} fill="#16a34a" /></g>
                </g>
              ); })()}
            </Toma>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
