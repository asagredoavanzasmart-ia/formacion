import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, Edificio, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, ROJO_O, VERDE, VIOLETA } from './comunLS';
import { Toma, Letrero, Apoyo, Furgon, Corazon, Reloj, sm, cl } from './kitLS';
import type { PropsCE } from './comunLS';
import { useTam } from '../../comunicacion/escenas/comunCE';

/**
 * «Aprender: perseverar o pivotar», escena propia en cuatro tomas.
 * 1 · El camino: la furgoneta de la startup llega a un cruce (el pivote), sigue de largo y se estanca (ruedas
 *     que patinan, telarañas, la idea que se apaga), un muro cierra el callejón; retrocede y gira hacia un
 *     camino nuevo con sol y árboles: la actividad sostenible.
 * 2 · Lo que vale una startup: su etiqueta de precio crece con las fichas de pivote que le quedan; gasta una
 *     en una nueva ocasión y hasta la empresa grande, en expansión, gira.
 * 3 · Por qué se tarda: cuatro pesas encadenadas (cifras ilusorias, resultados ambiguos, objetivos poco claros,
 *     miedo al fracaso), el creador que abraza su producto, el reloj de arena que pide más tiempo y la tijera
 *     que corta las cadenas sin temor.
 * 4 · Dos señales: experimentos que rinden cada vez menos y engranajes que giran sin avanzar; ¿aún crea valor?
 */

const ID = 'ls6';
const nombres = ['pivote', 'estancada', 'creatividad', 'callejon', 'direccion', 'sostenible', 'numero', 'ocasion', 'expansion', 'tardan', 'ilus', 'ambiguos', 'objetivos', 'miedo', 'duro', 'tiempo', 'temerle',
  'factores', 'decrec', 'productivo', 'valor', 'pregunta'] as const;
type N = typeof nombres[number];

/* Ficha de pivote: moneda con una flecha que gira. */
const Ficha: React.FC<{ x: number; y: number; r?: number; op?: number; gris?: boolean }> = ({ x, y, r = 30, op = 1, gris = false }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <circle cx={2} cy={3} r={r} fill={gris ? '#94a3b8' : '#c2410c'} /><circle r={r} fill={gris ? '#cbd5e1' : NARANJA} />
    <path d={`M 0 ${-r * 0.5} A ${r * 0.5} ${r * 0.5} 0 1 1 ${-r * 0.48} ${r * 0.15}`} fill="none" stroke="#fff" strokeWidth={r * 0.17} strokeLinecap="round" />
    <path d={`M ${-r * 0.7} 0 L ${-r * 0.48} ${r * 0.36} L ${-r * 0.26} 0 Z`} fill="#fff" />
  </g>
);

export const PivotarLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('valor') + 1.2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);
  const tl = useTam(28);
  const asfalto = isDark ? '#4b5563' : '#cbd5e1';
  const traje = isDark ? '#8da2c0' : '#334155';

  const rotulos: [number, string][] = [
    [0.2, '¿Perseverar o pivotar?'], [M('pivote'), 'El pivote'], [M('estancada'), 'Empresa estancada'], [M('creatividad'), 'Se apaga la creatividad'], [M('callejon'), 'Callejón sin salida'], [M('direccion'), 'Cambio de dirección'], [M('sostenible'), 'Actividad sostenible'],
    [M('numero'), 'Vale por sus pivotes'], [M('ocasion'), 'Una nueva ocasión'], [M('expansion'), 'Aunque esté creciendo'],
    [M('tardan'), 'Por qué se tarda'], [M('duro'), 'Duro para quien creó'], [M('tiempo'), 'Un poco más de tiempo'], [M('temerle'), 'Sin temerle'],
    [M('factores'), 'Dos señales'], [M('decrec'), 'Experimentos que rinden menos'], [M('productivo'), 'Desarrollo poco productivo'], [M('valor'), '¿Aún crea valor?'],
  ];

  /* Toma 1: recorrido de la furgoneta */
  const tD = M('direccion');
  const atras = sm(t, tD, tD + 1.2);
  const curvaU = sm(t, tD + 1.3, M('sostenible') + 1.4);
  const bz = (u: number): [number, number] => [(1 - u) ** 2 * 560 + 2 * u * (1 - u) * 760 + u * u * 1000, (1 - u) ** 2 * 668 + 2 * u * (1 - u) * 668 + u * u * 408];
  let vx: number, vy = 668, vrot = 0;
  if (t < tD) vx = t < M('estancada') - 1 ? lerp(140, 470, sm(t, 0.3, M('pivote'))) : lerp(470, 730, sm(t, M('estancada') - 1, M('estancada') + 0.4));
  else if (curvaU <= 0) vx = lerp(730, 560, atras);
  else { [vx, vy] = bz(curvaU); const [x2, y2] = bz(Math.min(1, curvaU + 0.02)); vrot = curvaU < 0.98 ? (Math.atan2(y2 - vy, x2 - vx) * 180) / Math.PI : -46; }
  const atascada = t >= M('estancada') + 0.4 && t < tD;
  const luzIdea = t < M('creatividad') ? 1 : t < M('sostenible') ? lerp(1, 0.08, ac(t, M('creatividad'), M('creatividad') + 1.5)) : ac(t, M('sostenible'), M('sostenible') + 1);
  const ladrillos = ac(t, M('callejon'), M('callejon') + 1.4) * 10;

  /* Toma 2: fichas y precio */
  const usada = sm(t, M('ocasion'), M('ocasion') + 1.2);
  const fichas = 4 - (t >= M('ocasion') + 1.2 ? 1 : 0);
  const precio = lerp(1, 0.78, sm(t, M('ocasion') + 1, M('ocasion') + 1.8));
  const giroOcasion = sm(t, M('ocasion') + 1, M('ocasion') + 2.4);

  /* Toma 3: pesas */
  const corte = ac(t, M('temerle'), M('temerle') + 0.6);
  const pesas: [string, string, N, number, number][] = [['Cifras', 'ilusorias', 'ilus', 200, 640], ['Resultados', 'ambiguos', 'ambiguos', 450, 770], ['Objetivos', 'poco claros', 'objetivos', 750, 770], ['Miedo al', 'fracaso', 'miedo', 1000, 640]];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Perseverar o pivotar: un camino que se bifurca">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · el camino, el muro y el giro */}
            <Toma t={t} a={-1} b={M('numero')} zi={1}>
              <g transform="translate(560 640) scale(1.2) translate(-560 -640)">
              {t >= M('sostenible') && <g opacity={e1(t, M('sostenible'))} transform={`translate(760 ${lerp(330, 250, ac(t, M('sostenible'), M('sostenible') + 2))})`}>{Array.from({ length: 10 }, (_, k) => <rect key={k} x={-4} y={-76} width={8} height={18} rx={4} fill="#fbbf24" transform={`rotate(${k * 36 + t * 10})`} />)}<circle r={48} fill="#fbbf24" /></g>}
              <rect x={40} y={604} width={900} height={80} rx={40} fill={asfalto} opacity={e1(t, 0.2)} />
              {Array.from({ length: 11 }, (_, k) => <rect key={k} x={70 + k * 80} y={640} width={40} height={8} rx={4} fill="#fff" opacity={0.75 * e1(t, 0.2)} />)}
              <path d="M 560 644 Q 760 644 1000 384" stroke={VERDE} strokeWidth={80} fill="none" strokeLinecap="round" opacity={0.85} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ac(t, tD, tD + 1.4)} />
              <path d="M 560 644 Q 760 644 1000 384" stroke="#fff" strokeWidth={6} fill="none" strokeDasharray="0.03 0.03" pathLength={1} opacity={0.7 * ac(t, tD + 1, tD + 1.4)} />
              {t >= M('pivote') && <g opacity={e1(t, M('pivote'))} transform="translate(560 644)"><circle r={52} fill={NARANJA} opacity={0.25} /><g transform={`rotate(${t * 60})`}><path d="M 0 -36 A 36 36 0 1 1 -34 12" fill="none" stroke={NARANJA} strokeWidth={9} strokeLinecap="round" /><path d="M -46 4 L -34 22 L -22 6 Z" fill={NARANJA} /></g></g>}
              {t >= M('pivote') && <Letrero x={560} y={760} texto="Pivote" id={ID} op={e1(t, M('pivote') + 0.3)} />}
              {t >= M('callejon') && Array.from({ length: Math.floor(ladrillos) }, (_, k) => { const fila = Math.floor(k / 2), col = k % 2; return <rect key={k} x={846 + col * 42 + (fila % 2) * 12} y={680 - (fila + 1) * 22} width={40} height={20} rx={3} fill={fila % 2 ? ROJO_O : ROJO_M} />; })}
              {t >= M('sostenible') && [[700, 520, 30], [830, 450, 26], [1100, 520, 34]].map(([x, y, r], k) => { const g = e1(t, M('sostenible') + 0.5 + k * 0.35); return <g key={k} transform={`translate(${x} ${y}) scale(${g})`}><rect x={-5} y={0} width={10} height={40} rx={4} fill="#7c4a1e" /><circle cy={-r * 0.3} r={r} fill={k % 2 ? '#16a34a' : '#22c55e'} /></g>; })}
              <g opacity={e1(t, 0.3)}>
                <Furgon x={vx} y={vy} s={0.85} rot={vrot} giro={atascada ? t * 900 : vx * 2.2} id={ID} humo={atascada ? 1 : 0} t={t} luz={luzIdea} />
                <Bombilla x={vx + (curvaU > 0 ? -30 : 0)} y={vy - 150} s={0.42} t={t} luz={luzIdea} id={ID} />
                {atascada && t >= M('estancada') + 0.8 && <g opacity={ac(t, M('estancada') + 0.8, M('estancada') + 1.6)} transform={`translate(${vx - 64} ${vy - 96})`}><path d="M 0 0 L 40 0 M 0 0 L 0 40 M 0 0 L 32 32 M 14 0 Q 10 10 0 14 M 28 0 Q 22 22 0 28" stroke="#9ca3af" strokeWidth={2} fill="none" /></g>}
                {atascada && [0, 1, 2].map((k) => { const ph = (t * 2 + k / 3) % 1; return <circle key={k} cx={vx - 48 + k * 50 - 20 * ph} cy={vy - 6 - 26 * ph} r={6} fill="#a16207" opacity={1 - ph} />; })}
              </g>
              </g>
            </Toma>

            {/* TOMA 2 · lo que vale: las fichas de pivote */}
            <Toma t={t} a={M('numero')} b={M('tardan')}>
              <rect x={60} y={690} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              <Furgon x={360} y={690} s={1.1} id={ID} t={t} rot={0} giro={giroOcasion * 300} luz={1} />
              {/* etiqueta de precio colgada de la furgoneta */}
              <g transform={`translate(380 430) rotate(${-8 + 3 * Math.sin(t * 2)})`}>
                <line x1={0} y1={-60} x2={0} y2={0} stroke={c.tenue} strokeWidth={3} />
                <g transform={`scale(${precio})`}><path d="M -90 0 H 70 L 100 40 L 70 80 H -90 Z" fill={`url(#${ID}-marca)`} style={sombra(0.25, 3, 8)} /><circle cx={70} cy={40} r={9} fill={c.panel} /><Txt f="a" x={-10} y={52} textAnchor="middle" fontSize={34} fill="#fff">Valor</Txt></g>
              </g>
              {/* fichas de pivote que quedan */}
              <rect x={640} y={200} width={420} height={170} rx={24} fill={c.panel} style={sombra(c.sombra, 6, 14)} />
              <Txt f="a" x={850} y={250} textAnchor="middle" fontSize={30} fill={c.texto}>Pivotes que quedan</Txt>
              {[0, 1, 2, 3].map((k) => {
                const se = k === 3; const x0 = 715 + k * 90, y0 = 315;
                const x = se ? lerp(x0, 380, usada) : x0, y = se ? lerp(y0, 560, usada) - 160 * Math.sin(Math.PI * usada) : y0;
                return <g key={k} transform={`scale(1)`} opacity={e1(t, M('numero') + k * 0.25)}><Ficha x={x} y={y} r={30} op={se ? 1 - ac(t, M('ocasion') + 1.1, M('ocasion') + 1.3) : 1} /></g>;
              })}
              {fichas < 4 && <circle cx={985} cy={315} r={30} fill="none" stroke={c.apagado} strokeWidth={4} strokeDasharray="6 6" />}
              {/* nueva ocasión: chispas al girar */}
              {t >= M('ocasion') + 1.1 && Array.from({ length: 10 }, (_, k) => { const a = (k * Math.PI) / 5, u = sm(t, M('ocasion') + 1.1, M('ocasion') + 2.4); return <circle key={k} cx={360 + (60 + 110 * u) * Math.cos(a)} cy={620 + (40 + 70 * u) * Math.sin(a)} r={7} fill={k % 2 ? '#fbbf24' : NARANJA} opacity={1 - u} />; })}
              {/* la empresa en expansión también gira */}
              {t >= M('expansion') && (() => { const h = lerp(140, 250, ac(t, M('expansion'), M('expansion') + 2)); return (
                <g opacity={e1(t, M('expansion'))}>
                  <Edificio x={900} y={690} w={140} h={h} color={isDark ? '#8294b3' : '#334155'} />
                  <g transform={`translate(900 ${690 - h - 40}) rotate(${t * 80})`}><path d="M 0 -26 A 26 26 0 1 1 -25 7" fill="none" stroke={NARANJA} strokeWidth={8} strokeLinecap="round" /><path d="M -35 0 L -25 16 L -15 0 Z" fill={NARANJA} /></g>
                </g>
              ); })()}
            </Toma>

            {/* TOMA 3 · las pesas que atan el giro */}
            <Toma t={t} a={M('tardan')} b={M('factores')}>
              <rect x={300} y={420} width={600} height={70} rx={35} fill={asfalto} opacity={e1(t, M('tardan'))} />
              <g opacity={e1(t, M('tardan'))}>
                <Furgon x={600 + 60 * corte} y={470 - 50 * corte} s={1} id={ID} t={t} luz={1} giro={t * 60 * corte} rot={-10 * corte} />
                {Math.floor(t * 2.5) % 2 === 0 && <g transform={`translate(${688 + 60 * corte} ${434 - 50 * corte})`}><circle r={11} fill="#f59e0b" /><circle r={20} fill="#f59e0b" opacity={0.3} /></g>}
                <path d="M 720 310 Q 800 300 830 370" stroke={NARANJA} strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.85} /><path d="M 814 362 L 840 394 L 850 354 Z" fill={NARANJA} opacity={0.85} />
              </g>
              {pesas.map(([l1, l2, m, x, yp], k) => {
                const e = e1(t, M(m)); const cae = corte;
                return (
                  <g key={k} opacity={e * (1 - ac(t, M('temerle') + 0.5, M('temerle') + 1.4))}>
                    {cae < 0.5
                      ? <line x1={600} y1={480} x2={x} y2={yp - 48} stroke="#64748b" strokeWidth={6} strokeDasharray="12 6" />
                      : <><line x1={600} y1={480} x2={lerp(600, x, 0.35)} y2={lerp(480, yp - 48, 0.35)} stroke="#64748b" strokeWidth={6} strokeDasharray="12 6" /><line x1={lerp(600, x, 0.6)} y1={lerp(480, yp - 48, 0.6) + 40 * cae} x2={x} y2={yp - 48 + 60 * cae} stroke="#64748b" strokeWidth={6} strokeDasharray="12 6" /></>}
                    <g transform={`translate(${x} ${yp + 80 * cae})`}>
                      <circle cy={-48} r={16} fill="none" stroke="#475569" strokeWidth={8} />
                      <rect x={-145} y={-40} width={290} height={36 + tl * 2.2} rx={22} fill={isDark ? '#4b5563' : '#334155'} />
                      <Txt f="a" x={0} y={-22 + tl * 1.05} textAnchor="middle" fontSize={28} fill="#fff">{l1}</Txt>
                      <Txt f="a" x={0} y={-22 + tl * 2.15} textAnchor="middle" fontSize={28} fill="#fff">{l2}</Txt>
                    </g>
                  </g>
                );
              })}
              {t >= M('duro') && (
                <g opacity={e1(t, M('duro')) * (1 - 0.5 * ac(t, M('temerle'), M('temerle') + 0.6))}>
                  <Persona id={ID} x={170} y={420} s={0.55} cuerpo={VIOLETA} />
                  <rect x={196} y={338} width={60} height={50} rx={8} fill="#f59e0b" />
                  <g transform={`translate(226 270) scale(${1 + 0.08 * Math.sin(t * 5)})`}><Corazon x={0} y={0} s={0.8} /><path d="M -4 -14 L 4 -2 L -4 6 L 4 18" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" opacity={ac(t, M('duro') + 0.8, M('duro') + 1.4)} /></g>
                </g>
              )}
              {t >= M('tiempo') && (() => { const g = 0; const arena = Math.min(1, ((t - M('tiempo')) % 4) / 3.4); return (
                <g opacity={e1(t, M('tiempo'))} transform={`translate(1030 300) rotate(${g})`}>
                  <rect x={-46} y={-80} width={92} height={12} rx={5} fill="#7c4a1e" /><rect x={-46} y={68} width={92} height={12} rx={5} fill="#7c4a1e" />
                  <path d="M -36 -68 H 36 L 6 0 L 36 68 H -36 L -6 0 Z" fill="#e0f2fe" opacity={0.9} />
                  {(() => { const yT = -60 + 54 * arena, wT = 6 + 30 * (-yT / 68), yB = 66 - 50 * arena, wB = 6 + 30 * (yB / 68); return <g>
                    {arena < 1 && <path d={`M ${-wT} ${yT} H ${wT} L 5 -2 H -5 Z`} fill="#f59e0b" />}
                    {arena < 1 && <rect x={-2} y={-2} width={4} height={yB + 2} fill="#f59e0b" />}
                    <path d={`M -34 66 H 34 L ${wB} ${yB} H ${-wB} Z`} fill="#f59e0b" />
                  </g>; })()}
                </g>
              ); })()}
              {t >= M('temerle') && <g opacity={e1(t, M('temerle')) * (1 - ac(t, M('temerle') + 1.2, M('temerle') + 1.8))} transform={`translate(600 560) rotate(${-20 + 40 * ac(t, M('temerle'), M('temerle') + 0.6)})`}><circle cx={-18} cy={20} r={14} fill="none" stroke={ROJO_M} strokeWidth={7} /><circle cx={18} cy={20} r={14} fill="none" stroke={ROJO_M} strokeWidth={7} /><path d="M -10 8 L 22 -40 M 10 8 L -22 -40" stroke="#64748b" strokeWidth={8} strokeLinecap="round" /></g>}
            </Toma>

            {/* TOMA 4 · dos señales */}
            <Toma t={t} a={M('factores')} b={fin + 5}>
              <rect x={60} y={660} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              {/* laboratorio de experimentos */}
              <g opacity={e1(t, M('decrec'))}>
                <rect x={100} y={540} width={480} height={20} rx={6} fill="#a16207" /><rect x={120} y={560} width={14} height={100} fill="#a16207" /><rect x={546} y={560} width={14} height={100} fill="#a16207" />
                {[1, 0.78, 0.56, 0.36, 0.2].map((v, k) => { const e = ac(t, M('decrec') + k * 0.55, M('decrec') + 0.9 + k * 0.55); const h = 260 * v * e; const x = 150 + k * 92; return (
                  <g key={k}>
                    <path d={`M ${x - 9} 478 H ${x + 9} V 500 L ${x + 30} 534 Q ${x + 32} 540 ${x + 25} 540 H ${x - 25} Q ${x - 32} 540 ${x - 30} 534 L ${x - 9} 500 Z`} fill="#e0f2fe" />
                    <path d={`M ${x - 18} 516 H ${x + 18} L ${x + 30} 534 Q ${x + 32} 540 ${x + 25} 540 H ${x - 25} Q ${x - 32} 540 ${x - 30} 534 Z`} fill={k < 2 ? VERDE : k < 4 ? '#f59e0b' : ROJO_M} opacity={0.9} /><rect x={x - 12} y={472} width={24} height={8} rx={3} fill="#94a3b8" />
                    <rect x={x - 26} y={460 - h} width={52} height={h} rx={10} fill={k < 2 ? VERDE : k < 4 ? '#f59e0b' : ROJO_M} opacity={0.9} />
                  </g>
                ); })}
                <Letrero x={340} y={720} texto="Experimentos" id={ID} />
              </g>
              {/* desarrollo que gira sin avanzar */}
              <g opacity={e1(t, M('productivo'))}>
                {[[760, 420, 70, 1], [880, 490, 46, -1.5], [960, 380, 36, 2]].map(([x, y, r, d], k) => <g key={k} transform={`translate(${x} ${y}) rotate(${t * 40 * d})`}>{Array.from({ length: 8 }, (_, q) => <rect key={q} x={-r * 0.16} y={-r * 1.3} width={r * 0.32} height={r * 0.42} rx={r * 0.06} fill={['#64748b', '#94a3b8', '#475569'][k]} transform={`rotate(${q * 45})`} />)}<circle r={r} fill={['#64748b', '#94a3b8', '#475569'][k]} /><circle r={r * 0.4} fill={c.panel} /></g>)}
                <rect x={680} y={590} width={380} height={28} rx={14} fill={c.apagado} opacity={0.6} />
                <rect x={680} y={590} width={380 * (0.12 + 0.06 * ac(t, M('productivo'), M('productivo') + 5))} height={28} rx={14} fill={AZUL_M} />
                {[0, 1].map((k) => { const ph = (t * 0.9 + k / 2) % 1; return <path key={k} d={`M ${1040 + k * 26} ${300 + 40 * ph} q -8 12 0 16 q 8 -4 0 -16`} fill="#60a5fa" opacity={1 - ph} />; })}
                <Letrero x={870} y={720} texto="Desarrollo" id={ID} fondo={AZUL_M} />
              </g>
              {t >= M('valor') && <g opacity={e1(t, M('valor'))}><Bombilla x={600} y={250} s={0.75} t={t} luz={0.55 + 0.45 * Math.abs(Math.sin(t * 3.1)) * (Math.sin(t * 13) > -0.3 ? 1 : 0.2)} id={ID} /></g>}
            </Toma>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
