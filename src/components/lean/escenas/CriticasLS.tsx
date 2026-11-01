import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Edificio, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, VERDE, VIOLETA } from './comunLS';
import { Toma, Letrero, Apoyo, Furgon, Reloj, Corazon, Visto, Cruz, Moneda3D, Hoja, sm, cl, azar } from './kitLS';
import type { PropsCE } from './comunLS';

/**
 * «Críticas y límites», escena propia en cuatro tomas.
 * 1 · La fábrica: la cinta se acelera, el operario se agota (cuerpo y mente), le quitan la pausa del café y el
 *     jefe solo mira la productividad, cuando el método pide pensar en el largo plazo.
 * 2 · La startup: volantazos ante cada piedra (corto plazo); el árbol que necesitaba tiempo se tala; el
 *     inversor se aleja; la llama de la pasión se congela en un cálculo frío y el proyecto va a la basura.
 * 3 · Ensayos en cadena a ritmo frenético que agotan al equipo; el producto roto frente al cuidado en cada
 *     detalle, que el cliente prefiere.
 * 4 · Google y Facebook observan y aprenden de otros; Apple saca directamente un producto mejor; el método
 *     encaja en la empresa pequeña y no en la grande.
 */

const ID = 'ls12';
const nombres = ['unanimidad', 'intensificar', 'bienestar', 'recuperacion', 'productividad', 'corto', 'estrategia', 'camino', 'inversores', 'humano', 'pasional', 'frio', 'basura', 'ensayo', 'frenetico', 'rotos', 'detalle',
  'google', 'aprendieron', 'apple', 'pequenas', 'medianas', 'pregunta'] as const;
type N = typeof nombres[number];

export const CriticasLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('medianas') + 1 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);
  const traje = isDark ? '#8da2c0' : '#334155';
  const cinta = isDark ? '#8294b3' : '#475569';

  const rotulos: [number, string][] = [
    [0.2, 'Críticas y límites'], [M('unanimidad'), 'No convence a todos'], [M('intensificar'), 'Más trabajo, más rápido'], [M('bienestar'), 'Cuerpo y mente'], [M('recuperacion'), 'Sin pausas'], [M('productividad'), 'Solo productividad'],
    [M('corto'), 'Corto plazo'], [M('estrategia'), 'Cambiar ante todo'], [M('camino'), 'Lo que necesitaba tiempo'], [M('inversores'), 'Los inversores dudan'], [M('humano'), 'El aspecto humano'], [M('pasional'), 'Se pierde la pasión'], [M('frio'), 'Un cálculo frío'], [M('basura'), 'Proyectos a la basura'],
    [M('ensayo'), 'Un ensayo tras otro'], [M('frenetico'), 'Ritmo frenético'], [M('rotos'), 'Productos incompletos'], [M('detalle'), 'Cuidado en cada detalle'],
    [M('google'), 'Google y Facebook'], [M('aprendieron'), 'Aprender de otros'], [M('apple'), 'Apple, directo y mejor'], [M('pequenas'), 'Para pequeñas empresas'], [M('medianas'), 'No tanto en las grandes'],
  ];

  /* Toma 1: la cinta que se acelera */
  const ritmo = lerp(0.6, 2.4, sm(t, M('intensificar'), M('intensificar') + 2));
  const avance = t * 70 * ritmo;
  const estres = sm(t, M('intensificar') + 1, M('bienestar') + 3);
  /* Toma 2: volantazos */
  const volante = t >= M('estrategia') ? 22 * Math.sin((t - M('estrategia')) * 4) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Críticas y límites del método">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · la fábrica acelerada */}
            <Toma t={t} a={-1} b={M('corto')} zi={1}>
              {/* balanza de la discusión al abrir */}
              {t < M('intensificar') + 0.5 && <g opacity={e1(t, 0.3) * (1 - ac(t, M('intensificar'), M('intensificar') + 0.5))} transform="translate(600 470)">
                <path d="M -24 140 L 0 0 L 24 140 Z" fill="#64748b" />
                <g transform={`rotate(${8 * Math.sin(t * 1.5)})`}><rect x={-220} y={-8} width={440} height={16} rx={8} fill="#a16207" /><g transform="translate(-200 8)"><path d="M -50 0 L -36 40 H 36 L 50 0 Z" fill={VERDE} /><Visto x={0} y={-30} r={22} /></g><g transform="translate(200 8)"><path d="M -50 0 L -36 40 H 36 L 50 0 Z" fill={ROJO_M} /><Cruz x={0} y={-30} r={22} /></g></g>
              </g>}
              {t >= M('intensificar') && (
                <g opacity={e1(t, M('intensificar'))}>
                  <rect x={100} y={600} width={760} height={22} rx={11} fill={cinta} />
                  {Array.from({ length: 16 }, (_, k) => <rect key={k} x={110 + ((k * 50 + avance) % 740)} y={606} width={26} height={10} rx={5} fill="#94a3b8" />)}
                  {Array.from({ length: 5 }, (_, k) => { const x = 110 + ((k * 160 + avance) % 740); return <g key={k} transform={`translate(${x} 600)`}><rect x={-22} y={-36} width={44} height={36} rx={6} fill="#f59e0b" /><path d="M -22 -36 L 0 -48 L 22 -36 Z" fill="#fde68a" /></g>; })}
                  {/* el operario */}
                  <g transform={`translate(480 ${720 + 3 * Math.sin(t * 10 * ritmo)})`}><Persona id={ID} x={0} y={0} s={0.62} cuerpo={AZUL_M} /><path d="M -28 -126 Q 0 -150 28 -126 Z" fill="#fbbf24" /></g>
                  {estres > 0.2 && [0, 1, 2].map((k) => { const ph = (t * 1.5 + k / 3) % 1; return <path key={k} d={`M ${510 + k * 12} ${590 + 30 * ph} q -6 10 0 14 q 6 -4 0 -14`} fill="#60a5fa" opacity={(1 - ph) * estres} />; })}
                  <Letrero x={480} y={800} texto="Operario" fondo={AZUL_M} id={ID} tam={24} />
                </g>
              )}
              {/* cuerpo y mente bajo presión */}
              {t >= M('bienestar') && (
                <g opacity={e1(t, M('bienestar'))}>
                  <g transform="translate(960 300)"><Corazon x={0} y={0} s={1.1 + 0.08 * Math.sin(t * 10)} /><path d="M -6 -18 L 6 -4 L -6 8 L 6 22" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" opacity={estres} /></g>
                  <g transform="translate(1080 300)"><ellipse rx={40} ry={34} fill="#fda4af" /><path d="M -24 -10 q 12 -14 24 0 q 12 -14 24 0 M -30 8 q 15 -12 30 0 q 15 -12 30 0" stroke="#f43f5e" strokeWidth={4} fill="none" /><path d="M -4 -30 L 4 -14 L -4 0 L 4 16" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" opacity={estres} /></g>
                  <Letrero x={1020} y={380} texto="Desgaste" fondo={ROJO_M} id={ID} tam={24} />
                </g>
              )}
              {/* sin pausas: la taza de café que se retira */}
              {t >= M('recuperacion') && (() => { const quita = sm(t, M('recuperacion') + 0.6, M('recuperacion') + 1.6); return (
                <g opacity={e1(t, M('recuperacion'))}>
                  <Reloj x={960} y={540} r={50} t={t} vel={3} />
                  <g transform={`translate(${1080 + 80 * quita} 560)`} opacity={1 - quita}><path d="M -22 -24 H 22 L 18 16 H -18 Z" fill="#fff" style={{ filter: 'drop-shadow(0 0 2px rgba(30,41,59,0.5))' }} /><path d="M 22 -16 Q 36 -12 32 2 Q 28 10 18 8" fill="none" stroke="#e5e7eb" strokeWidth={5} /></g>
                  <Cruz x={1080} y={500} r={18} op={quita} />
                </g>
              ); })()}
              {/* el jefe que solo mira la productividad */}
              {t >= M('productividad') && (
                <g opacity={e1(t, M('productividad'))}>
                  <Persona id={ID} x={200} y={480} s={0.55} cuerpo="#1f2937" corbata />
                  <g transform="translate(260 260)"><rect x={-70} y={-60} width={140} height={110} rx={12} fill={c.panel} style={sombra(0.25, 3, 8)} /><polyline points={`-50,30 -20,10 10,-4 40,-30`} fill="none" stroke={VERDE} strokeWidth={7} strokeLinecap="round" /><Moneda3D x={44} y={-34} r={14} giro={Math.cos(t * 3)} /></g>
                  <g transform="translate(110 380)" opacity={0.55}><rect x={-4} y={-30} width={8} height={30} fill="#7c4a1e" /><circle cy={-40} r={18} fill="#22c55e" /><Letrero x={0} y={30} texto="Largo plazo" fondo={c.panel2} color={c.tenue} id={ID} tam={22} /></g>
                </g>
              )}
            </Toma>

            {/* TOMA 2 · corto plazo, inversores y pasión */}
            <Toma t={t} a={M('corto')} b={M('ensayo')}>
              <rect x={60} y={620} width={1080} height={70} rx={35} fill={isDark ? '#4b5563' : '#cbd5e1'} />
              {/* volantazos ante cada piedra */}
              <g opacity={1 - ac(t, M('humano') - 0.4, M('humano'))}>
                {[380, 640].map((x, k) => <path key={k} d={`M ${x - 20} 650 L ${x - 6} 630 L ${x + 14} 636 L ${x + 22} 652 Z`} fill="#78716c" opacity={e1(t, M('corto') + k * 0.4)} />)}
                <Furgon x={lerp(160, 520, sm(t, M('corto'), M('estrategia') + 2))} y={660 - 14 * Math.abs(Math.sin(volante / 10))} s={0.75} rot={volante} giro={t * 400} id={ID} t={t} />
                {t >= M('estrategia') && [0, 1, 2].map((k) => { const ph = ((t - M('estrategia')) * 0.8 + k / 3) % 1; return <path key={k} d={`M ${300 + k * 140} 560 q 40 ${k % 2 ? -40 : 40} 80 0`} stroke={NARANJA} strokeWidth={5} fill="none" opacity={Math.sin(Math.PI * ph)} />; })}
                {/* el árbol que necesitaba tiempo */}
                {t >= M('camino') && (() => { const crece = sm(t, M('camino'), M('camino') + 2.5); const tala = sm(t, M('camino') + 2.6, M('camino') + 3.4); return (
                  <g opacity={e1(t, M('camino'))} transform="translate(900 620)">
                    <rect x={-8} y={-140 * crece} width={16} height={140 * crece} rx={6} fill="#7c4a1e" transform={`rotate(${80 * tala} 0 0)`} />
                    <g transform={`rotate(${80 * tala} 0 0)`}><circle cx={0} cy={-140 * crece - 40 * crece} r={70 * crece} fill="#22c55e" /></g>
                    {tala > 0 && <g transform={`translate(-40 -30) rotate(${-20 + 30 * Math.sin(t * 10)})`}><rect x={-4} y={-40} width={8} height={50} fill="#7c4a1e" /><path d="M -4 -40 L -30 -30 L -26 -10 L -4 -18 Z" fill="#94a3b8" /></g>}
                  </g>
                ); })()}
                {/* el inversor que se aleja */}
                {t >= M('inversores') && <g opacity={e1(t, M('inversores'))} transform={`translate(${lerp(1040, 1120, sm(t, M('inversores') + 0.6, M('inversores') + 2))} 0)`}><Persona id={ID} x={0} y={620} s={0.5} cuerpo="#1f2937" corbata /><g transform="translate(-50 470)"><rect x={-24} y={-20} width={48} height={36} rx={6} fill="#a16207" /><Moneda3D x={0} y={-30} r={12} /></g></g>}
              </g>
              {/* el aspecto humano: la llama que se enfría */}
              {t >= M('humano') && (() => { const frio = sm(t, M('frio'), M('frio') + 1.5); return (
                <g opacity={e1(t, M('humano'))}>
                  <Persona id={ID} x={300} y={620} s={0.66} cuerpo={traje} corbata />
                  <g transform="translate(300 400)">
                    <circle r={80} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
                    <g opacity={1 - frio}><path d={`M 0 ${-50 - 6 * Math.sin(t * 9)} C 30 -20 34 10 20 30 C 10 44 -10 44 -20 30 C -34 10 -24 -10 -6 -24 C -4 -6 6 -4 0 ${-50 - 6 * Math.sin(t * 9)} Z`} fill="#f97316" /><path d="M 0 -10 C 14 4 14 20 6 30 C 0 36 -8 34 -10 26 C -14 14 -6 4 0 -10 Z" fill="#fde047" /></g>
                    <g opacity={frio}>{Array.from({ length: 6 }, (_, k) => <rect key={k} x={-4} y={-46} width={8} height={92} rx={4} fill="#7dd3fc" transform={`rotate(${k * 30})`} />)}<circle r={14} fill="#e0f2fe" /></g>
                  </g>
                  <Letrero x={300} y={520} texto={frio > 0.5 ? 'Frío' : 'Pasión'} fondo={frio > 0.5 ? '#0ea5e9' : '#f97316'} id={ID} op={e1(t, M('pasional'))} tam={24} />
                  {t >= M('frio') && <g opacity={e1(t, M('frio'))} transform="translate(560 420)"><rect x={-60} y={-80} width={120} height={160} rx={14} fill="#334155" /><rect x={-46} y={-66} width={92} height={40} rx={6} fill="#a7f3d0" />{Array.from({ length: 9 }, (_, k) => <rect key={k} x={-44 + (k % 3) * 32} y={-14 + Math.floor(k / 3) * 30} width={24} height={22} rx={5} fill="#94a3b8" />)}</g>}
                  {t >= M('basura') && (() => { const lanza = sm(t, M('basura') + 0.3, M('basura') + 1.4); return (
                    <g opacity={e1(t, M('basura'))}>
                      <g transform="translate(900 620)"><path d="M -50 -110 H 50 L 40 0 H -40 Z" fill="#64748b" /><rect x={-58} y={-124} width={116} height={16} rx={6} fill="#94a3b8" /></g>
                      {lanza < 1 && <g transform={`translate(${lerp(380, 900, lanza)} ${lerp(500, 500, lanza) - 160 * Math.sin(Math.PI * lanza)}) rotate(${lanza * 400})`}><circle r={26} fill="#f8fafc" style={{ filter: 'drop-shadow(0 0 2px rgba(30,41,59,0.5))' }} /><path d="M -14 -8 L 8 -14 L 14 6 L -6 14 Z" fill="#e2e8f0" /></g>}
                      <Letrero x={900} y={680} texto="Proyecto" fondo={c.panel} color={c.texto} id={ID} tam={24} />
                    </g>
                  ); })()}
                </g>
              ); })()}
            </Toma>

            {/* TOMA 3 · ensayos en cadena y productos rotos */}
            <Toma t={t} a={M('ensayo')} b={M('google')}>
              <rect x={60} y={700} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              <g opacity={1 - ac(t, M('rotos') - 0.4, M('rotos'))}>
                <rect x={100} y={460} width={1000} height={16} rx={8} fill={cinta} />
                {Array.from({ length: 8 }, (_, k) => { const x = 100 + ((k * 130 + (t - M('ensayo')) * 90 * lerp(1, 2.5, sm(t, M('frenetico'), M('frenetico') + 1.5))) % 1000); return <g key={k} transform={`translate(${x} 460)`}><path d="M -12 -60 H 12 V -40 L 28 -8 Q 30 0 22 0 H -22 Q -30 0 -28 -8 L -12 -40 Z" fill="#e0f2fe" /><path d="M -24 -14 H 24 L 28 -8 Q 30 0 22 0 H -22 Q -30 0 -28 -8 Z" fill={k % 3 === 0 ? VERDE : '#94a3b8'} /></g>; })}
                {t >= M('frenetico') && [0, 1, 2].map((k) => (
                  <g key={k} opacity={e1(t, M('frenetico') + k * 0.3)} transform={`translate(${380 + k * 220} ${700 + 4 * Math.sin(t * 9 + k)})`}>
                    <Persona id={ID} x={0} y={0} s={0.5} cuerpo={[VIOLETA, AZUL_M, NARANJA][k]} ojos={0.3} />
                    {[0, 1].map((q) => { const ph = (t * 1.4 + q / 2 + k * 0.3) % 1; return <path key={q} d={`M ${26 + q * 10} ${-80 + 30 * ph} q -6 10 0 14 q 6 -4 0 -14`} fill="#60a5fa" opacity={1 - ph} />; })}
                  </g>
                ))}
              </g>
              {/* el producto roto frente al cuidado */}
              {t >= M('rotos') && (
                <g opacity={e1(t, M('rotos'))}>
                  <g transform="translate(360 600)">
                    <rect x={-90} y={-110} width={180} height={110} rx={12} fill="#b7791f" /><path d="M -90 -110 L -30 -150 L 40 -130 L 90 -110 Z" fill="#d69e2e" />
                    <path d="M -20 -110 L -4 -70 L -24 -40 L 0 0" stroke="#1f2937" strokeWidth={5} fill="none" /><rect x={30} y={-80} width={36} height={30} rx={4} fill="#1f2937" opacity={0.6} />
                    <Cruz x={80} y={-160} r={24} />
                  </g>
                  <Letrero x={360} y={660} texto="Incompleto" fondo={ROJO_M} id={ID} tam={24} />
                  {t >= M('detalle') && <g opacity={e1(t, M('detalle'))}>
                    <g transform="translate(820 600)">
                      <rect x={-90} y={-110} width={180} height={110} rx={16} fill={`url(#${ID}-marca)`} style={sombra(0.3, 6, 12)} /><rect x={-90} y={-70} width={180} height={18} fill="#fff" opacity={0.6} />
                      {Array.from({ length: 4 }, (_, k) => { const a = t * 2 + k * 1.6; return <path key={k} d="M 0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z" fill="#fde047" transform={`translate(${70 * Math.cos(a)} ${-60 + 50 * Math.sin(a)}) scale(${0.8 + 0.4 * Math.sin(t * 5 + k)})`} />; })}
                    </g>
                    <Letrero x={820} y={660} texto="Cuidado" fondo={VERDE} id={ID} tam={24} />
                    <Persona id={ID} x={600} y={700} s={0.55} cuerpo="#ec4899" />
                    <path d="M 640 560 Q 700 520 740 540" stroke={VERDE} strokeWidth={6} fill="none" strokeLinecap="round" /><path d="M 728 526 L 752 546 L 724 556 Z" fill={VERDE} />
                  </g>}
                </g>
              )}
            </Toma>

            {/* TOMA 4 · Google, Facebook, Apple y el tamaño de la empresa */}
            <Toma t={t} a={M('google')} b={fin + 5}>
              <rect x={60} y={700} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              <g opacity={1 - ac(t, M('pequenas') - 0.4, M('pequenas'))}>
                {['Google', 'Facebook'].map((n, k) => (
                  <g key={n} opacity={e1(t, M('google') + k * 0.4)}>
                    <Edificio x={220 + k * 220} y={700} w={150} h={300 - k * 30} color={k ? '#1d4ed8' : '#16a34a'} />
                    <Letrero x={220 + k * 220} y={760} texto={n} fondo={k ? '#1d4ed8' : '#16a34a'} id={ID} tam={24} />
                  </g>
                ))}
                {t >= M('aprendieron') && <g opacity={e1(t, M('aprendieron'))}>
                  {[0, 1].map((k) => <g key={k} transform={`translate(${260 + k * 220} 330) rotate(-20)`}><rect x={-10} y={-12} width={70} height={24} rx={8} fill="#334155" /><circle cx={64} cy={0} r={16} fill="#93c5fd" /></g>)}
                  {[0, 1, 2].map((k) => <g key={k} opacity={0.6} transform={`translate(${650 + k * 60} ${640})`}><rect x={-24} y={-60} width={48} height={60} rx={6} fill="#94a3b8" /><Cruz x={0} y={-80} r={12} op={0.8} /></g>)}
                  <Letrero x={710} y={760} texto="Otros" fondo={c.panel} color={c.tenue} id={ID} tam={24} />
                </g>}
                {t >= M('apple') && (
                  <g opacity={e1(t, M('apple'))} transform="translate(1000 560)">
                    <path d="M 0 -40 C -50 -70 -90 -10 -60 40 C -40 80 -10 70 0 60 C 10 70 40 80 60 40 C 90 -10 50 -70 0 -40 Z" fill="#e5484d" />
                    <path d="M 0 -40 Q 4 -70 24 -84" stroke="#7c4a1e" strokeWidth={6} fill="none" strokeLinecap="round" /><path d="M 6 -66 Q 30 -90 50 -70 Q 30 -56 6 -66 Z" fill="#22c55e" />
                    <ellipse cx={-30} cy={-10} rx={10} ry={18} fill="#fff" opacity={0.35} />
                    <Letrero x={0} y={200} texto="Apple" fondo="#334155" id={ID} tam={24} />
                  </g>
                )}
              </g>
              {/* pequeña sí, grande no */}
              {t >= M('pequenas') && (
                <g opacity={e1(t, M('pequenas'))}>
                  <Edificio x={320} y={700} w={130} h={150} color={NARANJA} />
                  <g transform="translate(320 470)"><rect x={-40} y={-30} width={80} height={60} rx={10} fill={`url(#${ID}-marca)`} /><path d="M -8 -10 a 14 14 0 1 1 -10 14" stroke="#fff" strokeWidth={5} fill="none" /></g>
                  <Visto x={420} y={480} r={26} op={ac(t, M('pequenas') + 0.6, M('pequenas') + 1)} />
                  {t >= M('medianas') && <g opacity={e1(t, M('medianas'))}>
                    <Edificio x={820} y={700} w={240} h={400} color={isDark ? '#8294b3' : '#334155'} />
                    <g transform={`translate(820 ${250 + 4 * Math.sin(t * 6)}) rotate(${10 * Math.sin(t * 4)})`}><rect x={-40} y={-30} width={80} height={60} rx={10} fill={`url(#${ID}-marca)`} /></g>
                    <Cruz x={930} y={230} r={26} op={ac(t, M('medianas') + 0.5, M('medianas') + 1)} />
                  </g>}
                </g>
              )}
            </Toma>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
