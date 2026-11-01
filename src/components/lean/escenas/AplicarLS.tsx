import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, Calendario, Edificio, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, VERDE, VIOLETA, Mar } from './comunLS';
import { Toma, Letrero, Apoyo, Reloj, Visto, Cruz, Moneda3D, Corazon, sm, cl } from './kitLS';
import type { PropsCE } from './comunLS';

/**
 * «Cómo aplicarlo en tu empresa», escena propia en tres tomas.
 * 1 · Cuatro piedras para cruzar un río, una por pregunta: la hipótesis (lo que crees y no comprobaste), el
 *     producto mínimo (que se use esta semana), la medida (accionable, accesible, auditable) y la decisión
 *     (perseverar o pivotar, con señales fijadas de antemano). El equipo salta de una a otra.
 * 2 · La empresa de capacitación: cree en cursos largos, ofrece una sesión de una hora a tres empresas y cuenta
 *     cuántas piden una segunda; si piden sesiones cortas, su motor es la repetición; si no piden nada, cambia
 *     de segmento o de problema antes de grabar un solo video.
 * 3 · La regla: no gastar más de lo que se necesita para aprender lo siguiente; un motor a la vez, ensayos
 *     pequeños, cifras que obligan a decidir y el cliente al lado.
 */

const ID = 'ls11';
const nombres = ['secuencia', 'hipotesis', 'comprobado', 'producto', 'semana', 'medida', 'decision', 'senales', 'capacitacion', 'cursos', 'sesion', 'segunda', 'cortas', 'nopiden', 'video', 'gastar', 'motor', 'cliente', 'pregunta'] as const;
type N = typeof nombres[number];

export const AplicarLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('cliente') + 1 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);
  const traje = isDark ? '#8da2c0' : '#334155';

  const rotulos: [number, string][] = [
    [0.2, 'Cómo aplicarlo'], [M('secuencia'), 'Cuatro preguntas'], [M('hipotesis'), 'La hipótesis'], [M('producto'), 'El producto mínimo'], [M('medida'), 'La medida'], [M('decision'), 'La decisión'],
    [M('capacitacion'), 'Una empresa de capacitación'], [M('cursos'), '¿Cursos largos?'], [M('sesion'), 'Una sesión de una hora'], [M('segunda'), '¿Piden una segunda?'], [M('cortas'), 'Su motor: repetir'], [M('nopiden'), 'Si no piden nada'], [M('video'), 'Antes de grabar'],
    [M('gastar'), 'No gastar de más'], [M('motor'), 'La regla'], [M('cliente'), 'El cliente al lado'],
  ];

  /* Toma 1: piedras del río */
  const piedras: [N, string, number, number][] = [['hipotesis', 'Hipótesis', 270, 560], ['producto', 'Producto', 490, 600], ['medida', 'Medida', 710, 560], ['decision', 'Decisión', 930, 600]];
  const salto = piedras.reduce((a, [n], k) => (t >= M(n) ? k : a), -1);
  const u = salto >= 0 ? sm(t, M(piedras[salto][0]), M(piedras[salto][0]) + 0.7) : 0;
  const desde = salto <= 0 ? [100, 590] : [piedras[salto - 1][2], piedras[salto - 1][3]];
  const hasta = salto < 0 ? [100, 590] : [piedras[salto][2], piedras[salto][3]];
  const eqX = lerp(desde[0], hasta[0], u), eqY = lerp(desde[1], hasta[1], u) - 120 * Math.sin(Math.PI * u);

  /* Toma 2 */
  const empresas = [[760, 640], [900, 600], [1040, 640]];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cómo aplicar el método en tu empresa">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · cuatro piedras para cruzar el río */}
            <Toma t={t} a={-1} b={M('capacitacion')} zi={1}>
              <rect x={40} y={500} width={140} height={300} rx={20} fill={isDark ? '#3f6212' : '#bbf7d0'} />
              <rect x={1040} y={500} width={120} height={300} rx={20} fill={isDark ? '#3f6212' : '#bbf7d0'} />
              <Mar x={160} y={560} w={900} h={240} t={t} color={isDark ? '#1d4ed8' : '#93c5fd'} oscuro={isDark ? '#1e3a8a' : '#60a5fa'} amp={6} />
              {piedras.map(([n, txt, x, y], k) => { const e = e1(t, M(n)); return (
                <g key={n} opacity={Math.max(0.15 * e1(t, M('secuencia')), e)}>
                  <ellipse cx={x} cy={y + 14} rx={92} ry={26} fill="#475569" /><ellipse cx={x} cy={y} rx={92} ry={26} fill="#94a3b8" />
                  <g transform={`translate(${x} ${y - 190})`}>
                    <circle r={70} fill={c.panel} style={sombra(c.sombra, 6, 14)} />
                    {k === 0 && <g><Bombilla x={-6} y={6} s={0.5} t={t} luz={e > 0.5 ? 0.6 : 0.2} id={ID} /><Txt x={36} y={-14} textAnchor="middle" fontSize={40} fill={ROSA} opacity={1 - ac(t, M('comprobado') + 1, M('comprobado') + 1.5) * 0.3}>?</Txt></g>}
                    {k === 1 && <g><rect x={-30} y={-6} width={44} height={36} rx={6} fill="#f59e0b" /><path d="M -30 -6 L -8 -20 L 14 -6 Z" fill="#fde68a" /><g opacity={e1(t, M('semana'))}><Calendario x={30} y={-20} s={0.32} marcados={Math.round(7 * ac(t, M('semana'), M('semana') + 1.5))} /></g></g>}
                    {k === 2 && <g><path d="M -40 14 A 40 40 0 0 1 40 14" fill="none" stroke={c.apagado} strokeWidth={12} strokeLinecap="round" /><path d="M -40 14 A 40 40 0 0 1 40 14" fill="none" stroke={VERDE} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - 0.7 * ac(t, M('medida'), M('medida') + 1)} /><line x1={0} y1={14} x2={0} y2={-20} stroke={c.texto} strokeWidth={5} strokeLinecap="round" transform={`rotate(${lerp(-80, 40, ac(t, M('medida'), M('medida') + 1))} 0 14)`} /><Txt f="a" x={0} y={50} textAnchor="middle" fontSize={20} fill={c.tenue}>A A A</Txt></g>}
                    {k === 3 && <g><rect x={-5} y={-30} width={10} height={76} fill="#7c4a1e" /><path d="M 5 -30 H 48 L 60 -18 L 48 -6 H 5 Z" fill={AZUL_M} /><path d="M -5 0 H -48 L -60 12 L -48 24 H -5 Z" fill={NARANJA} />{t >= M('senales') && <g opacity={e1(t, M('senales'))}><circle cx={44} cy={-48} r={10} fill={VERDE} /><circle cx={-44} cy={-14} r={10} fill={ROJO_M} /></g>}</g>}
                  </g>
                  <Letrero x={x} y={k % 2 ? y + 70 : y - 86} texto={txt} id={ID} op={e} tam={24} />
                </g>
              ); })}
              {/* el equipo que salta */}
              <g opacity={e1(t, M('secuencia'))} transform={`translate(${eqX} ${eqY})`}><Persona id={ID} x={-18} y={-14} s={0.36} cuerpo={traje} corbata /><Persona id={ID} x={20} y={-14} s={0.36} cuerpo={VIOLETA} /></g>
            </Toma>

            {/* TOMA 2 · la empresa de capacitación */}
            <Toma t={t} a={M('capacitacion')} b={M('gastar')}>
              <rect x={60} y={720} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              <Persona id={ID} x={200} y={720} s={0.66} cuerpo={NARANJA} />
              <Letrero x={200} y={780} texto="Capacitación" id={ID} />
              {/* la creencia: cursos largos */}
              {t >= M('cursos') && (
                <g opacity={e1(t, M('cursos')) * (1 - 0.65 * ac(t, M('cortas'), M('cortas') + 0.8))} transform="translate(280 330)">
                  <circle r={110} fill={c.panel} style={sombra(c.sombra, 6, 14)} /><circle cx={-70} cy={110} r={16} fill={c.panel} /><circle cx={-90} cy={150} r={9} fill={c.panel} />
                  {Array.from({ length: 5 }, (_, k) => <rect key={k} x={-56 + k * 4} y={-40 + k * 14 - 30} width={112} height={18} rx={4} fill={['#2563eb', '#1d4ed8', '#3b82f6', '#1e40af', '#60a5fa'][k]} />)}
                  <Txt f="a" x={0} y={70} textAnchor="middle" fontSize={26} fill={c.texto}>Curso largo</Txt>
                </g>
              )}
              {/* una sesión de una hora para tres empresas */}
              {t >= M('sesion') && (
                <g opacity={e1(t, M('sesion'))}>
                  <Reloj x={520} y={520} r={58} t={t} vel={2} />
                  <Letrero x={520} y={620} texto="1 hora" fondo={AZUL_M} id={ID} />
                  {empresas.map(([x, y], k) => <g key={k} opacity={e1(t, M('sesion') + 0.4 + k * 0.3)}><Edificio x={x} y={720} w={100} h={170 + (k % 2) * 40} color={isDark ? '#8294b3' : '#475569'} /></g>)}
                  {[0, 1, 2].map((k) => { const ph = ((t - M('sesion')) * 0.5 + k / 3) % 1; return <circle key={k} cx={lerp(580, empresas[k][0], ph)} cy={lerp(520, 500, ph) - 40 * Math.sin(Math.PI * ph)} r={8} fill={AZUL_M} opacity={Math.sin(Math.PI * ph)} />; })}
                </g>
              )}
              {/* ¿piden una segunda? sesiones cortas: el motor es la repetición */}
              {t >= M('segunda') && empresas.map(([x], k) => { const pide = k !== 1 || t < M('nopiden'); return (
                <g key={k} transform={`translate(${x} ${430 - (k % 2) * 40 + 4 * Math.sin(t * 2 + k)})`} opacity={e1(t, M('segunda') + k * 0.3)}>
                  <rect x={-44} y={-34} width={88} height={62} rx={18} fill={c.panel} style={sombra(0.2, 2, 6)} /><path d="M -8 28 L 0 42 L 8 28 Z" fill={c.panel} />
                  {t < M('cortas') ? <Txt x={0} y={12} textAnchor="middle" fontSize={34} fill={NARANJA}>+1</Txt>
                    : pide ? <g>{[0, 1, 2].map((q) => <g key={q} transform={`translate(${-24 + q * 24} 0)`}><circle r={10} fill="#fff" stroke={AZUL_M} strokeWidth={3} /><line x1={0} y1={0} x2={0} y2={-6} stroke={AZUL_M} strokeWidth={2} /></g>)}</g>
                    : <Txt x={0} y={12} textAnchor="middle" fontSize={34} fill={c.tenue}>…</Txt>}
                </g>
              ); })}
              {t >= M('cortas') && <g opacity={e1(t, M('cortas'))} transform="translate(520 300)"><g transform={`rotate(${t * 90})`}><path d="M 0 -44 A 44 44 0 1 1 -42 14" fill="none" stroke={VERDE} strokeWidth={12} strokeLinecap="round" /><path d="M -58 4 L -42 28 L -26 4 Z" fill={VERDE} /></g><Letrero x={0} y={-82} texto="Repetición" fondo={VERDE} id={ID} /></g>}
              {/* si no piden nada: cambiar antes de grabar un video */}
              {t >= M('nopiden') && <g opacity={e1(t, M('nopiden'))}><path d="M 900 560 Q 1000 500 1090 370" stroke={NARANJA} strokeWidth={6} fill="none" strokeDasharray="10 8" /><Letrero x={1040} y={330} texto="Otro segmento" fondo={NARANJA} id={ID} tam={24} /></g>}
              {t >= M('video') && (() => { const x = ac(t, M('video') + 0.4, M('video') + 0.9); return (
                <g opacity={e1(t, M('video'))} transform="translate(360 600)">
                  <rect x={-60} y={-36} width={90} height={72} rx={12} fill="#1f2937" /><path d="M 30 -16 L 64 -34 V 34 L 30 16 Z" fill="#1f2937" /><circle cx={-16} cy={0} r={18} fill="#475569" /><circle cx={-16} cy={0} r={9} fill="#93c5fd" /><circle cx={-46} cy={-24} r={6} fill="#ef4444" />
                  <path d={`M -80 -60 L ${-80 + 160 * x} ${-60 + 120 * x}`} stroke={ROJO_M} strokeWidth={10} strokeLinecap="round" opacity={x > 0 ? 1 : 0} />
                </g>
              ); })()}
            </Toma>

            {/* TOMA 3 · la regla */}
            <Toma t={t} a={M('gastar')} b={fin + 5}>
              {(() => { const incl = lerp(10, 0, sm(t, M('gastar') + 0.6, M('gastar') + 2)); return (
                <g>
                  <path d="M 570 470 L 600 330 L 630 470 Z" fill="#64748b" />
                  <g transform={`rotate(${incl} 600 330)`}>
                    <rect x={380} y={322} width={440} height={16} rx={8} fill="#a16207" />
                    <g transform="translate(420 330)"><path d="M -50 0 L -36 40 H 36 L 50 0 Z" fill="#94a3b8" />{[0, 1, 2].map((k) => <Moneda3D key={k} x={-22 + k * 22} y={-10 - (k % 2) * 16} r={16} />)}</g>
                    <g transform="translate(780 330)"><path d="M -50 0 L -36 40 H 36 L 50 0 Z" fill="#94a3b8" /><Bombilla x={0} y={-36} s={0.42} t={t} id={ID} /></g>
                  </g>
                  <Letrero x={420} y={420} texto="Lo que gastas" fondo="#f59e0b" id={ID} tam={24} />
                  <Letrero x={780} y={420} texto="Lo que aprendes" fondo={VERDE} id={ID} tam={24} />
                </g>
              ); })()}
              {t >= M('motor') && [['Un motor', 0], ['Ensayos', 1], ['Cifras', 2], ['El cliente', 3]].map(([txt, k]) => {
                const tk = (k as number) < 3 ? M('motor') + (k as number) * 1.1 : M('cliente');
                const x = 180 + (k as number) * 280;
                return (
                  <g key={k as number} opacity={e1(t, tk)}>
                    <circle cx={x} cy={600} r={56} fill={[ROJO_M, NARANJA, AZUL_M, VIOLETA][k as number]} />
                    {k === 0 && <g transform={`translate(${x} 600) rotate(${t * 60})`}>{Array.from({ length: 8 }, (_, q) => <rect key={q} x={-5} y={-34} width={10} height={14} rx={3} fill="#fff" transform={`rotate(${q * 45})`} />)}<circle r={22} fill="#fff" /><circle r={9} fill={ROJO_M} /></g>}
                    {k === 1 && <g transform={`translate(${x} 600)`}>{[0, 1, 2].map((q) => <rect key={q} x={-30 + q * 22} y={-8 - q * 6} width={16} height={16 + q * 6} rx={3} fill="#fff" />)}</g>}
                    {k === 2 && <g transform={`translate(${x} 600)`}><rect x={-26} y={-26} width={52} height={52} rx={8} fill="#fff" /><path d="M -14 0 l 9 10 l 18 -20" stroke={AZUL_M} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}
                    {k === 3 && <g><Persona id={ID} x={x - 14} y={636} s={0.3} cuerpo="#fff" /><Persona id={ID} x={x + 16} y={636} s={0.3} cuerpo="#fde68a" /></g>}
                    <Letrero x={x} y={(k as number) % 2 ? 760 : 700} texto={txt as string} fondo={c.panel} color={c.texto} id={ID} tam={24} />
                  </g>
                );
              })}
            </Toma>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
