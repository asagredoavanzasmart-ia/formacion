import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Engranaje, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, VERDE, VIOLETA } from './comunLS';
import { Toma, Letrero, Apoyo, Corazon, Visto, Moneda3D, PilaMonedas, sm, cl } from './kitLS';
import type { PropsCE } from './comunLS';

/**
 * «Los motores de crecimiento», escena propia en cinco tomas.
 * 1 · El motor: un bloque con pistones que empuja la curva de crecimiento; un tablero de muchos indicadores
 *     donde solo se encienden los pocos que importan, y las hipótesis se validan antes. Tres tipos.
 * 2 · Pegajoso: un imán sobre el producto retiene a los clientes; entran más de los que salen y la retención
 *     sube.
 * 3 · Viral: cada cliente trae amigos, que traen otros; lo cuentan sin darse cuenta.
 * 4 · Remunerado: más ingreso por cliente, menos coste de adquisición y lo que gastará a lo largo de su vida.
 * 5 · Uno solo: de tres motores queda uno encendido; el producto encaja con su mercado, una clientela amplia y
 *     fiel; el motor se queda sin aliento y otro de repuesto espera listo.
 */

const ID = 'ls10';
const nombres = ['mecanismo', 'pocos', 'tres', 'pegajoso', 'superar', 'retencion', 'viral', 'amigos', 'inconsciente', 'remunerado', 'adquisicion', 'vida', 'varios', 'uno', 'idoneidad', 'fiel', 'aliento', 'anticipar', 'pregunta'] as const;
type N = typeof nombres[number];

/* Bloque de motor con dos pistones que suben y bajan con t. (x, y) es la base; `vel` regula el ritmo. */
const Motor: React.FC<{ x: number; y: number; s?: number; t: number; vel?: number; color?: string; humo?: number; icono?: React.ReactNode }> = ({ x, y, s = 1, t, vel = 1, color = '#64748b', humo = 0, icono }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Apoyo x={0} y={4} rx={120} />
    {[-40, 40].map((px, k) => { const sube = 24 * Math.sin(t * 8 * vel + k * Math.PI); return <g key={k}><rect x={px - 22} y={-200 - sube} width={44} height={60} rx={8} fill="#94a3b8" /><rect x={px - 4} y={-150 - sube} width={8} height={40 + sube} fill="#475569" /></g>; })}
    <rect x={-100} y={-150} width={200} height={150} rx={18} fill={color} />
    <rect x={0} y={-150} width={100} height={150} rx={18} fill="#000" opacity={0.12} />
    {Array.from({ length: 4 }, (_, k) => <rect key={k} x={-90} y={-130 + k * 30} width={180} height={8} rx={4} fill="#000" opacity={0.12} />)}
    <g transform="translate(-130 -70)"><Engranaje x={0} y={0} r={30} t={t * 4 * vel} hueco={color} color="#475569" /></g>
    {icono && <g transform="translate(0 -75)">{icono}</g>}
    {humo > 0.01 && [0, 1, 2].map((k) => { const ph = (t * 0.8 + k / 3) % 1; return <circle key={k} cx={90 + 30 * ph} cy={-200 - 100 * ph} r={12 + 22 * ph} fill="#6b7280" opacity={humo * 0.7 * (1 - ph)} />; })}
  </g>
);

const Iman: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}><path d="M -40 -30 V 10 A 40 40 0 0 0 40 10 V -30 H 18 V 10 A 18 18 0 0 1 -18 10 V -30 Z" fill={ROJO_M} /><rect x={-40} y={-44} width={22} height={16} fill="#e5e7eb" /><rect x={18} y={-44} width={22} height={16} fill="#e5e7eb" /></g>
);
const Red: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>{[[0, -30], [-34, 20], [34, 20]].map(([x, y], k) => <g key={k}><line x1={0} y1={0} x2={x} y2={y} stroke="#fff" strokeWidth={6} /><circle cx={x} cy={y} r={14} fill="#fff" /></g>)}<circle r={16} fill="#fde047" /></g>
);

export const MotoresLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('anticipar') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Motores de crecimiento'], [M('mecanismo'), 'Un mecanismo duradero'], [M('pocos'), 'Pocos indicadores'], [M('tres'), 'Tres tipos'],
    [M('pegajoso'), 'Motor pegajoso'], [M('superar'), 'Entran más de los que se van'], [M('retencion'), 'Más retención'],
    [M('viral'), 'Motor viral'], [M('amigos'), 'Cada cliente trae amigos'], [M('inconsciente'), 'Sin darse cuenta'],
    [M('remunerado'), 'Motor remunerado'], [M('adquisicion'), 'Menos coste de adquisición'], [M('vida'), 'Lo que gasta en su vida'],
    [M('varios'), '¿Varios a la vez?'], [M('uno'), 'Mejor uno solo'], [M('idoneidad'), 'Producto y mercado encajan'], [M('fiel'), 'Clientela amplia y fiel'], [M('aliento'), 'Sin aliento'], [M('anticipar'), 'Tener otro listo'],
  ];

  /* Toma 3: árbol viral */
  const nodos: [number, number, number][] = [[600, 300, -1]];
  [[440, 440], [760, 440]].forEach(([x, y]) => nodos.push([x, y, 0]));
  [[350, 580], [520, 580], [680, 580], [850, 580]].forEach(([x, y], k) => nodos.push([x, y, 1 + Math.floor(k / 2)]));
  [[300, 720], [400, 720], [470, 720], [570, 720], [630, 720], [730, 720], [800, 720], [900, 720]].forEach(([x, y], k) => nodos.push([x, y, 3 + Math.floor(k / 2)]));
  const nivel = (i: number) => (i === 0 ? 0 : i < 3 ? 1 : i < 7 ? 2 : 3);
  const tNodo = (i: number) => M('viral') + 0.4 + nivel(i) * 1.4 + (i % 2) * 0.2;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los tres motores de crecimiento">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · el motor y los pocos indicadores */}
            <Toma t={t} a={-1} b={M('pegajoso')} zi={1}>
              <rect x={60} y={720} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              <g opacity={e1(t, M('mecanismo'))}>
                <Motor x={300} y={720} t={t} color={NARANJA} />
                <path d="M 410 640 C 520 640 520 500 640 460" stroke={c.apagado} strokeWidth={10} fill="none" strokeDasharray="4 14" strokeLinecap="round" />
                <polyline points={Array.from({ length: 12 }, (_, k) => `${660 + k * 40},${640 - 20 * k - 2.2 * k * k * ac(t, M('mecanismo') + 0.5, M('mecanismo') + 3)}`).join(' ')} fill="none" stroke={VERDE} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
                <rect x={650} y={640} width={480} height={5} rx={2} fill={c.apagado} />
              </g>
              {t >= M('pocos') && (
                <g opacity={e1(t, M('pocos')) * (1 - ac(t, M('tres') - 0.3, M('tres')))} transform="translate(0 0)">
                  <rect x={620} y={150} width={500} height={250} rx={22} fill="#1f2937" style={sombra(c.sombra, 6, 16)} />
                  {Array.from({ length: 12 }, (_, k) => { const x = 680 + (k % 6) * 76, y = 220 + Math.floor(k / 6) * 110; const clave = k === 2 || k === 9; const on = clave ? 1 : 1 - 0.75 * ac(t, M('pocos') + 0.8, M('pocos') + 1.6); return <g key={k} opacity={on}><path d={`M ${x - 26} ${y + 10} A 26 26 0 0 1 ${x + 26} ${y + 10}`} fill="none" stroke={clave ? VERDE : '#64748b'} strokeWidth={8} strokeLinecap="round" /><line x1={x} y1={y + 10} x2={x} y2={y - 10} stroke="#e5e7eb" strokeWidth={4} transform={`rotate(${clave ? 40 * Math.sin(t * 2 + k) : -30} ${x} ${y + 10})`} /></g>; })}
                  {[0, 1, 2].map((k) => <Visto key={k} x={700 + k * 60} y={440} r={20} op={sm(t, M('pocos') + 2 + k * 0.6, M('pocos') + 2.4 + k * 0.6)} />)}
                </g>
              )}
              {t >= M('tres') && (
                <g opacity={e1(t, M('tres'))}>
                  {[0, 1, 2].map((k) => <g key={k} transform={`translate(${720 + k * 140} 300)`} opacity={e1(t, M('tres') + k * 0.2)}><circle r={52} fill={[ROJO_M, AZUL_M, '#f59e0b'][k]} />{k === 0 ? <Iman s={0.7} /> : k === 1 ? <Red s={0.9} /> : <Moneda3D x={0} y={0} r={28} />}</g>)}
                </g>
              )}
            </Toma>

            {/* TOMA 2 · motor pegajoso */}
            <Toma t={t} a={M('pegajoso')} b={M('viral')}>
              <rect x={60} y={700} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              {/* el producto y el imán */}
              <g transform="translate(600 700) scale(1.35)">
                <rect x={-110} y={-140} width={220} height={140} rx={16} fill={`url(#${ID}-marca)`} style={sombra(0.25, 6, 12)} />
                <path d="M -120 -140 H 120 L 100 -180 H -100 Z" fill="#f43f5e" />
                <rect x={-30} y={-80} width={60} height={80} rx={6} fill="#1f2937" />
                <g transform={`translate(0 ${-260 + 6 * Math.sin(t * 3)})`}><Iman s={1.3} />{[0, 1, 2].map((k) => <path key={k} d={`M ${-60 - k * 18} ${30 + k * 14} Q 0 ${60 + k * 26} ${60 + k * 18} ${30 + k * 14}`} stroke={ROJO_M} strokeWidth={3} fill="none" opacity={(0.5 - k * 0.12) * (0.6 + 0.4 * Math.sin(t * 4 - k))} />)}</g>
              </g>
              {/* clientes que entran (muchos) y salen (pocos) */}
              {Array.from({ length: 6 }, (_, k) => { const ph = ((t - M('pegajoso')) * 0.35 + k / 6) % 1; if (t < M('pegajoso')) return null; return <g key={k} opacity={Math.min(1, ph * 6, (1 - ph) * 6)}><Persona id={ID} x={lerp(80, 430, ph)} y={700} s={0.36} cuerpo={['#ec4899', VERDE, AZUL_M, '#f59e0b', VIOLETA, '#0f766e'][k]} /></g>; })}
              {Array.from({ length: 2 }, (_, k) => { const ph = ((t - M('pegajoso')) * 0.3 + k / 2) % 1; if (t < M('pegajoso')) return null; return <g key={k} opacity={0.6 * Math.min(1, ph * 6, (1 - ph) * 6)}><Persona id={ID} x={lerp(770, 1120, ph)} y={700} s={0.36} cuerpo="#94a3b8" /></g>; })}
              {t >= M('superar') && <g opacity={e1(t, M('superar'))}>
                <Letrero x={240} y={500} texto="Entran" fondo={VERDE} id={ID} />
                <Letrero x={960} y={500} texto="Se van" fondo="#94a3b8" id={ID} />
                <path d="M 120 420 H 340" stroke={VERDE} strokeWidth={22} strokeLinecap="round" /><path d="M 340 396 L 380 420 L 340 444 Z" fill={VERDE} /><path d="M 880 420 H 1020" stroke="#94a3b8" strokeWidth={8} strokeLinecap="round" /><path d="M 1020 408 L 1042 420 L 1020 432 Z" fill="#94a3b8" />
              </g>}
              {t >= M('retencion') && <g opacity={e1(t, M('retencion'))} transform="translate(600 210)"><rect x={-150} y={-20} width={300} height={40} rx={20} fill={c.apagado} opacity={0.5} /><rect x={-150} y={-20} width={300 * lerp(0.45, 0.85, ac(t, M('retencion'), M('retencion') + 1.2))} height={40} rx={20} fill={ROJO_M} /><Txt f="a" x={0} y={-36} textAnchor="middle" fontSize={26} fill={c.texto}>Retención</Txt></g>}
            </Toma>

            {/* TOMA 3 · motor viral */}
            <Toma t={t} a={M('viral')} b={M('remunerado')}>
              {nodos.map(([x, y, p], i) => p >= 0 && t >= tNodo(i) && <line key={`l${i}`} x1={nodos[p][0]} y1={nodos[p][1] - 30} x2={lerp(nodos[p][0], x, sm(t, tNodo(i), tNodo(i) + 0.5))} y2={lerp(nodos[p][1] - 30, y - 30, sm(t, tNodo(i), tNodo(i) + 0.5))} stroke={AZUL_M} strokeWidth={4} opacity={0.6} />)}
              {nodos.map(([x, y], i) => t >= tNodo(i) && <g key={i} opacity={sm(t, tNodo(i) + 0.3, tNodo(i) + 0.7)}><Persona id={ID} x={x} y={y + 20} s={i === 0 ? 0.48 : nivel(i) === 3 ? 0.3 : 0.38} cuerpo={['#ec4899', AZUL_M, VERDE, '#f59e0b', VIOLETA][i % 5]} /></g>)}
              {t >= M('amigos') && <g opacity={e1(t, M('amigos'))}><Letrero x={980} y={300} texto="+2 amigos" fondo={AZUL_M} id={ID} /></g>}
              {t >= M('inconsciente') && [0, 1, 2].map((k) => { const ph = ((t - M('inconsciente')) * 0.8 + k / 3) % 1; const [x1, y1] = [nodos[1 + k][0], nodos[1 + k][1] - 60]; return <g key={k} transform={`translate(${x1 + 40} ${y1 - 30 * ph})`} opacity={Math.sin(Math.PI * ph)}><rect x={-22} y={-16} width={44} height={32} rx={12} fill={c.panel} style={sombra(0.2, 2, 4)} /><Corazon x={0} y={0} s={0.3} /></g>; })}
            </Toma>

            {/* TOMA 4 · motor remunerado */}
            <Toma t={t} a={M('remunerado')} b={M('varios')}>
              <rect x={60} y={700} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              <Persona id={ID} x={220} y={700} s={0.62} cuerpo={VIOLETA} />
              {/* ingreso por cliente que sube */}
              <g transform="translate(420 700)"><rect x={-40} y={-260 * lerp(0.3, 0.8, ac(t, M('remunerado') + 0.6, M('remunerado') + 2))} width={80} height={260 * lerp(0.3, 0.8, ac(t, M('remunerado') + 0.6, M('remunerado') + 2))} rx={12} fill={VERDE} /><Letrero x={0} y={50} texto="Ingreso" fondo={VERDE} id={ID} /></g>
              {/* coste de adquisición que baja */}
              {t >= M('adquisicion') && <g opacity={e1(t, M('adquisicion'))}><PilaMonedas x={600} y={700} n={lerp(9, 3, ac(t, M('adquisicion') + 0.4, M('adquisicion') + 2))} w={80} /><Letrero x={600} y={750} texto="Coste" fondo={ROJO_M} id={ID} /></g>}
              {/* lo que gasta a lo largo de su vida */}
              {t >= M('vida') && (() => { const u = ac(t, M('vida') + 0.3, M('vida') + 3); return (
                <g opacity={e1(t, M('vida'))}>
                  <rect x={740} y={560} width={380} height={10} rx={5} fill={c.apagado} />
                  {[0, 1, 2, 3, 4, 5].map((k) => <g key={k} opacity={u * 6 > k ? 1 : 0.15}><Moneda3D x={770 + k * 64} y={520 - k * 22} r={18} /></g>)}
                  <g transform={`translate(${lerp(760, 1100, u)} 600)`}><circle r={10} fill={VIOLETA} /></g>
                  <Letrero x={930} y={640} texto="Toda su vida" fondo={VIOLETA} id={ID} />
                </g>
              ); })()}
            </Toma>

            {/* TOMA 5 · uno solo, encaje, sin aliento y repuesto */}
            <Toma t={t} a={M('varios')} b={fin + 5}>
              <rect x={60} y={700} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              {(() => { const uno = sm(t, M('uno'), M('uno') + 1); const aliento = sm(t, M('aliento'), M('aliento') + 1.5); const listo = sm(t, M('anticipar'), M('anticipar') + 1.2); return (
                <g>
                  {[0, 1, 2].map((k) => { const elegido = k === 0; const op = elegido ? 1 : 1 - uno; const x = elegido ? lerp(260, 420, uno) : [0, 600, 940][k]; return (
                    <g key={k} opacity={op * e1(t, M('varios') + k * 0.2)}>
                      <Motor x={x} y={700} s={elegido ? lerp(0.62, 0.8, uno) : 0.62} t={t} vel={elegido ? lerp(1, 0.25, aliento) : 1 - uno} color={[ROJO_M, AZUL_M, '#f59e0b'][k]} humo={elegido ? aliento : 0} icono={k === 0 ? <Iman s={0.6} /> : k === 1 ? <Red s={0.8} /> : <Moneda3D x={0} y={0} r={24} />} />
                    </g>
                  ); })}
                  {t >= M('idoneidad') && <g opacity={e1(t, M('idoneidad'))} transform="translate(780 330)">
                    <path d={`M ${-120 + 40 * sm(t, M('idoneidad') + 0.3, M('idoneidad') + 1.2)} -50 H -20 V -20 A 20 20 0 0 1 -20 20 V 50 H ${-120 + 40 * sm(t, M('idoneidad') + 0.3, M('idoneidad') + 1.2)} Z`} fill={NARANJA} />
                    <path d={`M ${100 - 40 * sm(t, M('idoneidad') + 0.3, M('idoneidad') + 1.2)} -50 H 0 V -20 A 20 20 0 0 0 0 20 V 50 H ${100 - 40 * sm(t, M('idoneidad') + 0.3, M('idoneidad') + 1.2)} Z`} fill={AZUL_M} transform="translate(-20 0)" />
                    <Letrero x={-70} y={90} texto="Producto" fondo={NARANJA} id={ID} tam={24} /><Letrero x={60} y={90} texto="Mercado" fondo={AZUL_M} id={ID} tam={24} />
                  </g>}
                  {t >= M('fiel') && Array.from({ length: 6 }, (_, k) => <g key={k} opacity={e1(t, M('fiel') + k * 0.12) * (1 - 0.4 * listo)}><Persona id={ID} x={700 + k * 70} y={700} s={0.36} cuerpo={['#ec4899', VERDE, AZUL_M, '#f59e0b', VIOLETA, '#0f766e'][k]} />{k % 2 === 0 && <Corazon x={700 + k * 70} y={600 + 4 * Math.sin(t * 3 + k)} s={0.3} />}</g>)}
                  {aliento > 0.2 && <g opacity={aliento * (1 - listo)} transform="translate(420 300)"><path d="M -40 -40 L 40 40 M 40 -40 L -40 40" stroke="#94a3b8" strokeWidth={0} /><Txt x={0} y={0} textAnchor="middle" fontSize={44} fill={c.tenue}>…</Txt></g>}
                  {t >= M('anticipar') && <g opacity={listo}><Motor x={lerp(1180, 620, listo)} y={700} s={0.55} t={t} color={VERDE} vel={0.6} icono={<Red s={0.6} />} /><Letrero x={lerp(1180, 620, listo)} y={760} texto="De repuesto" fondo={VERDE} id={ID} /></g>}
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
