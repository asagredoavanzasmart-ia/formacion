import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Calendario, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, VERDE, VIOLETA, Bombilla } from './comunLS';
import { Toma, Letrero, Apoyo, Reloj, Visto, Cruz, Hoja, sm, cl, azar } from './kitLS';
import type { PropsCE } from './comunLS';

/**
 * «Crear: el producto mínimo viable», escena propia en cuatro tomas.
 * 1 · El taller: el plano de un auto completo (fantasma) frente a una patineta que se arma en segundos; le
 *     faltan las funciones del plano, pero sale a la calle hacia los clientes por el camino más corto, el que
 *     pone a prueba la hipótesis.
 * 2 · La patineta tosca igual entrega datos; nadie sabe aún quién será el cliente ni qué valorará; llegan las
 *     malas noticias (lluvia), la caída, y de la grieta crece una planta: flexibilidad y esperanza.
 * 3 · IMVU ante los inversores: fundadores avergonzados, un gráfico en unidades y no en miles; luego crece.
 * 4 · Las canchas de pádel: sin pagos ni mapas, un formulario, un grupo con diez clubes, reservas a mano; la
 *     respuesta llega en días y no en meses.
 */

const ID = 'ls4';
const nombres = ['pmv', 'prototipo', 'esfuerzo', 'funcionalidades', 'primera', 'corto', 'hipotesis', 'baja', 'valioso', 'malas', 'fracaso', 'esperanza', 'imvu', 'capital', 'avergonzados', 'unidades', 'crecer',
  'padel', 'pagos', 'formulario', 'clubes', 'mano', 'dias', 'pregunta'] as const;
type N = typeof nombres[number];

/* Patineta: tabla y cuatro ruedas. (x, y) es la base; `arma` (0 a 1) junta las piezas. */
const Patineta: React.FC<{ x: number; y: number; s?: number; arma?: number; giro?: number; tosca?: boolean; id: string }> = ({ x, y, s = 1, arma = 1, giro = 0, tosca = false, id }) => {
  const sep = (1 - arma) * 70;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Apoyo x={0} y={2} rx={110} />
      {[-62, 62].map((wx, k) => <g key={wx} transform={`translate(${wx + (k ? sep : -sep)} ${-14 + sep * 0.5}) rotate(${giro})`} opacity={cl(arma * 1.5)}><circle r={14} fill="#1f2937" /><circle r={6} fill="#cbd5e1" /><rect x={-1.5} y={-6} width={3} height={12} fill="#475569" /></g>)}
      <g transform={`translate(0 ${-34 - sep})`} opacity={cl(arma * 1.5)}>
        <path d="M -100 0 Q -112 -14 -96 -16 H 96 Q 112 -14 100 0 Z" fill={`url(#${id}-marca)`} />
        <rect x={-70} y={-2} width={14} height={14} rx={3} fill="#64748b" /><rect x={56} y={-2} width={14} height={14} rx={3} fill="#64748b" />
        {tosca && <g><rect x={-30} y={-18} width={40} height={10} fill="#d6d3d1" opacity={0.9} transform="rotate(-8)" /><rect x={20} y={-18} width={36} height={10} fill="#d6d3d1" opacity={0.9} transform="rotate(6)" /></g>}
      </g>
    </g>
  );
};

/* Auto completo del plano, en línea discontinua (no se fabrica). */
const AutoPlano: React.FC<{ x: number; y: number; s?: number; color: string }> = ({ x, y, s = 1, color }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={color} strokeWidth={5} strokeDasharray="12 10" strokeLinecap="round">
    <path d="M -150 -20 V -60 Q -150 -80 -126 -84 L -70 -92 L -36 -140 Q -30 -148 -18 -148 H 60 Q 74 -148 84 -136 L 112 -94 L 134 -88 Q 152 -82 152 -62 V -20 Z" />
    <circle cx={-90} cy={-16} r={30} /><circle cx={90} cy={-16} r={30} />
    <path d="M -50 -92 L -26 -128 H 30 V -92 Z" /><path d="M 44 -128 H 64 L 92 -92 H 44 Z" />
  </g>
);

export const PmvLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('dias') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);
  const traje = isDark ? '#8da2c0' : '#334155';
  const plano = isDark ? '#60a5fa' : '#3b82f6';

  const rotulos: [number, string][] = [
    [0.2, 'El producto mínimo viable'], [M('prototipo'), 'Un prototipo'], [M('esfuerzo'), 'El menor esfuerzo'], [M('funcionalidades'), 'Le faltan funciones'], [M('primera'), 'Frente a los clientes'], [M('corto'), 'El camino más corto'], [M('hipotesis'), 'Probar la hipótesis'],
    [M('baja'), 'Aun de baja calidad'], [M('valioso'), '¿Qué valorará el cliente?'], [M('malas'), 'Malas noticias'], [M('fracaso'), 'El fracaso enseña'], [M('esperanza'), 'Sin perder la esperanza'],
    [M('imvu'), 'La experiencia de IMVU'], [M('avergonzados'), 'Avergonzados'], [M('unidades'), 'Unidades, no miles'], [M('crecer'), 'Crecer con rapidez'],
    [M('padel'), 'Canchas de pádel'], [M('pagos'), 'Sin pagos ni mapas'], [M('formulario'), 'Un formulario'], [M('clubes'), 'Diez clubes'], [M('mano'), 'Reservas a mano'], [M('dias'), 'Días, no meses'],
  ];

  /* Toma 1 */
  const arma = sm(t, M('esfuerzo') + 0.2, M('esfuerzo') + 1.6);
  const sale = sm(t, M('primera'), M('primera') + 2.2);
  const patX = lerp(330, 640, sale);
  /* Toma 2 */
  const cae = sm(t, M('fracaso'), M('fracaso') + 0.6);
  const brota = sm(t, M('fracaso') + 1, M('esperanza') + 1);
  const lluvia = t >= M('malas') ? 1 - ac(t, M('esperanza'), M('esperanza') + 1) : 0;
  /* Toma 3 */
  const despega = sm(t, M('crecer'), M('crecer') + 2.5);
  const rubor = ac(t, M('avergonzados'), M('avergonzados') + 0.8) * (1 - despega);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Crear: el producto mínimo viable">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · el taller: plano completo frente a la patineta */}
            <Toma t={t} a={-1} b={M('baja')} zi={1.04}>
              <rect x={60} y={700} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              {/* el plano del auto completo */}
              {t >= M('prototipo') && (
                <g opacity={e1(t, M('prototipo')) * (1 - 0.6 * ac(t, M('primera'), M('primera') + 1))}>
                  <rect x={120} y={190} width={420} height={260} rx={14} fill={isDark ? '#1e3a8a' : '#dbeafe'} opacity={0.6} />
                  {Array.from({ length: 6 }, (_, k) => <rect key={k} x={120} y={190 + k * 52} width={420} height={1.5} fill={plano} opacity={0.25} />)}
                  <AutoPlano x={330} y={410} s={1.1} color={plano} />
                  {t >= M('funcionalidades') && [['GPS', 200, 222], ['Pagos', 460, 222], ['Radio', 460, 486], ['Mapas', 200, 486]].map(([n, x, y], k) => (
                    <g key={n as string} opacity={e1(t, M('funcionalidades') + k * 0.3)}>
                      <Letrero x={x as number} y={y as number} texto={n as string} fondo={c.panel} color={c.tenue} id={ID} tam={24} />
                      <path d={`M ${(x as number) - 40} ${(y as number) - 2} H ${(x as number) + 40}`} stroke={ROJO_M} strokeWidth={4} opacity={ac(t, M('funcionalidades') + 0.4 + k * 0.3, M('funcionalidades') + 0.8 + k * 0.3)} />
                    </g>
                  ))}
                </g>
              )}
              {/* el banco de trabajo y la patineta */}
              <g opacity={e1(t, M('pmv'))}>
                <rect x={180} y={560} width={320} height={16} rx={6} fill="#a16207" opacity={1 - sale} /><rect x={200} y={576} width={14} height={124} fill="#a16207" opacity={1 - sale} /><rect x={466} y={576} width={14} height={124} fill="#a16207" opacity={1 - sale} />
                <Patineta x={patX} y={lerp(560, 700, sale)} s={0.9} arma={t < M('esfuerzo') ? 0 : arma} giro={sale * 900} id={ID} />
                {t >= M('esfuerzo') && t < M('esfuerzo') + 2 && <g transform={`translate(400 500) rotate(${-30 + 50 * Math.abs(Math.sin(t * 9))} 0 30)`}><rect x={-6} y={-10} width={12} height={50} rx={5} fill="#7c4a1e" /><rect x={-22} y={-24} width={44} height={20} rx={5} fill="#475569" /></g>}
                {t >= M('esfuerzo') && <g opacity={e1(t, M('esfuerzo')) * (1 - ac(t, M('primera'), M('primera') + 0.6))}><Reloj x={630} y={540} r={46} t={t} vel={4} /></g>}
                <Letrero x={340} y={760} texto="PMV" id={ID} op={e1(t, M('pmv') + 0.3) * (1 - sale)} />
              </g>
              {/* los clientes y el camino más corto */}
              {t >= M('primera') && (
                <g opacity={e1(t, M('primera'))}>
                  {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={900 + k * 80} y={700 - (k % 2) * 16} s={0.5} cuerpo={['#ec4899', AZUL_M, VERDE][k]} />)}
                  {[0, 1, 2].map((k) => { const e = e1(t, M('primera') + 1.6 + k * 0.4); return <g key={k} opacity={e} transform={`translate(${900 + k * 80} ${520 - (k % 2) * 16})`}><circle r={30} fill={c.panel} style={sombra(0.2, 2, 6)} />{k === 0 ? <Visto x={0} y={0} r={18} /> : k === 1 ? <Txt x={0} y={14} textAnchor="middle" fontSize={40} fill={NARANJA}>?</Txt> : <Cruz x={0} y={0} r={18} />}</g>; })}
                </g>
              )}
              {t >= M('corto') && (
                <g opacity={e1(t, M('corto'))}>
                  <path d="M 330 230 C 160 120 1100 120 980 300 C 900 420 300 380 400 500" stroke={c.apagado} strokeWidth={6} fill="none" strokeDasharray="10 12" opacity={0.6 * (1 - ac(t, M('corto') + 1.5, M('corto') + 2.2))} />
                  <path d="M 700 650 H 850" stroke={VERDE} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ac(t, M('corto') + 0.3, M('corto') + 1)} />
                  <path d="M 840 634 L 866 650 L 840 666 Z" fill={VERDE} opacity={ac(t, M('corto') + 0.9, M('corto') + 1.1)} />
                </g>
              )}
              {t >= M('hipotesis') && (
                <g opacity={e1(t, M('hipotesis'))} transform="translate(800 330)">
                  <rect x={-150} y={-70} width={300} height={140} rx={18} fill={c.panel} style={sombra(c.sombra, 6, 14)} />
                  <Txt f="a" x={-124} y={-26} fontSize={26} fill={c.tenue}>Hipótesis</Txt>
                  <Txt f="a" x={-124} y={22} fontSize={32} fill={c.texto}>¿La usarán?</Txt>
                  {(() => { const q = ac(t, M('hipotesis') + 1.5, M('hipotesis') + 1.9); return <g opacity={q} transform={`translate(110 30) rotate(-12) scale(${lerp(1.8, 1, q)})`}><rect x={-60} y={-22} width={120} height={44} rx={8} fill="none" stroke={VERDE} strokeWidth={5} /><Txt x={0} y={10} textAnchor="middle" fontSize={24} fill={VERDE}>PROBADA</Txt></g>; })()}
                </g>
              )}
            </Toma>

            {/* TOMA 2 · baja calidad, malas noticias y esperanza */}
            <Toma t={t} a={M('baja')} b={M('imvu')}>
              <rect x={60} y={700} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              {/* patineta tosca que igual da datos */}
              <g opacity={1 - ac(t, M('malas') - 0.4, M('malas'))}>
                <Patineta x={300} y={700} s={1.1} tosca id={ID} giro={t * 200} />
                <g transform="translate(560 640)">{[0.35, 0.6, 0.85].map((v, k) => <rect key={k} x={k * 54} y={-200 * v * ac(t, M('baja') + 0.6 + k * 0.3, M('baja') + 1.3 + k * 0.3)} width={40} height={200 * v * ac(t, M('baja') + 0.6 + k * 0.3, M('baja') + 1.3 + k * 0.3)} rx={8} fill={AZUL_M} />)}<rect x={-10} y={0} width={180} height={5} rx={2} fill={c.apagado} /></g>
                <Letrero x={640} y={700 + 50} texto="Datos útiles" id={ID} op={e1(t, M('baja') + 1.5)} />
                {[0, 1, 2, 3].map((k) => { const ph = (t * 0.7 + k / 4) % 1; return <circle key={k} cx={lerp(380, 560, ph)} cy={600 - 60 * Math.sin(Math.PI * ph)} r={7} fill={AZUL_M} opacity={Math.sin(Math.PI * ph)} />; })}
                {/* ¿quién será el cliente, qué valorará? */}
                {t >= M('valioso') && [0, 1, 2].map((k) => <g key={k} opacity={e1(t, M('valioso') + k * 0.3)}><Persona id={ID} x={860 + k * 90} y={700} s={0.5} cuerpo={c.apagado} /><Txt x={860 + k * 90} y={560 + 6 * Math.sin(t * 2 + k)} textAnchor="middle" fontSize={44} fill={c.tenue}>?</Txt></g>)}
              </g>
              {/* malas noticias, caída y brote */}
              {t >= M('malas') && (
                <g opacity={e1(t, M('malas'))}>
                  <g opacity={lluvia} transform="translate(560 230)">
                    <circle cx={-60} cy={10} r={44} fill="#64748b" /><circle cx={0} cy={-12} r={58} fill="#64748b" /><circle cx={64} cy={8} r={46} fill="#64748b" /><rect x={-104} y={10} width={214} height={46} rx={23} fill="#64748b" />
                    {Array.from({ length: 12 }, (_, k) => { const ph = (t * 1.5 + azar(k)) % 1; return <rect key={k} x={-96 + k * 17} y={70 + 220 * ph} width={4} height={18} rx={2} fill={AZUL_M} opacity={0.7 * (1 - ph)} />; })}
                  </g>
                  <g transform={`translate(560 700) rotate(${-80 * cae * (1 - brota)})`}><Persona id={ID} x={0} y={0} s={0.62} cuerpo={traje} corbata /></g>
                  {cae > 0.5 && <path d="M 640 704 L 660 690 L 676 708 L 700 692" stroke={c.tenue} strokeWidth={4} fill="none" opacity={1 - brota * 0.5} />}
                  {brota > 0 && <g transform="translate(680 700)"><path d={`M 0 0 Q -6 ${-60 * brota} 4 ${-120 * brota}`} stroke="#16a34a" strokeWidth={8} fill="none" strokeLinecap="round" /><g transform={`translate(0 ${-70 * brota}) scale(${brota})`}><path d="M 0 0 Q -40 -20 -50 -60 Q -6 -44 0 0 Z" fill="#22c55e" /><path d="M 0 -20 Q 40 -40 54 -80 Q 6 -66 0 -20 Z" fill="#16a34a" /></g></g>}
                  {t >= M('esperanza') && <g opacity={e1(t, M('esperanza'))} transform="translate(960 260)">{Array.from({ length: 10 }, (_, k) => <rect key={k} x={-4} y={-76} width={8} height={20} rx={4} fill="#fbbf24" transform={`rotate(${k * 36 + t * 15})`} />)}<circle r={48} fill="#fbbf24" /></g>}
                  {t >= M('esperanza') && <Letrero x={680} y={480} texto="Aprender y seguir" id={ID} op={e1(t, M('esperanza') + 0.5)} />}
                </g>
              )}
            </Toma>

            {/* TOMA 3 · IMVU ante los inversores */}
            <Toma t={t} a={M('imvu')} b={M('padel')}>
              {/* pantalla con el gráfico */}
              <g transform="translate(600 320)">
                <rect x={-260} y={-150} width={520} height={300} rx={18} fill="#0b1220" style={sombra(c.sombra, 8, 20)} />
                <Txt f="a" x={-230} y={-106} fontSize={26} fill="#93c5fd">Usuarios de IMVU</Txt>
                <rect x={-220} y={110} width={440} height={4} fill="#475569" /><rect x={-220} y={-80} width={4} height={194} fill="#475569" />
                {(() => { const pts = Array.from({ length: 9 }, (_, k) => [-200 + k * 52, 100 - (k < 6 ? 6 + k * 4 : 6 + 20 + (k - 5) * 60 * despega) ] as [number, number]); const n = Math.max(2, Math.round(9 * ac(t, M('capital'), M('capital') + 1.5))); return <polyline points={pts.slice(0, n).map((p) => p.join(',')).join(' ')} fill="none" stroke={despega > 0.1 ? VERDE : '#f87171'} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />; })()}
                {t >= M('unidades') && <g opacity={e1(t, M('unidades'))}>{['1', '2', '3'].map((n, k) => <Txt key={n} f="a" x={-232} y={104 - k * 30} textAnchor="end" fontSize={22} fill="#fde68a">{n}</Txt>)}</g>}
                {despega > 0.2 && <Visto x={210} y={-100} r={26} op={despega} />}
              </g>
              {/* fundadores */}
              <g opacity={e1(t, M('imvu') + 0.2)}>
                <Persona id={ID} x={220} y={760} s={0.62} cuerpo={traje} corbata />
                <Persona id={ID} x={320} y={760} s={0.62} cuerpo={AZUL_M} />
                {[220, 320].map((x) => <g key={x} opacity={rubor}><ellipse cx={x - 14} cy={760 - 0.62 * 125} rx={7} ry={4} fill="#f43f5e" opacity={0.6} /><ellipse cx={x + 14} cy={760 - 0.62 * 125} rx={7} ry={4} fill="#f43f5e" opacity={0.6} /><path d={`M ${x + 22} ${760 - 0.62 * 160} q 6 10 0 14 q -6 -4 0 -14`} fill="#60a5fa" /></g>)}
                {t >= M('avergonzados') && <g opacity={e1(t, M('avergonzados')) * (1 - despega)}><ellipse cx={270} cy={812} rx={12} ry={8} fill={ROJO_M} />{[-1, 1].map((sx) => <line key={sx} x1={270 + sx * 8} y1={810} x2={270 + sx * 18} y2={804} stroke={ROJO_M} strokeWidth={3} />)}</g>}
              </g>
              {/* inversores de capital riesgo */}
              {t >= M('capital') && (
                <g opacity={e1(t, M('capital'))}>
                  <rect x={640} y={680} width={460} height={20} rx={8} fill="#a16207" />
                  {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={720 + k * 150} y={680} s={0.55} cuerpo={['#1f2937', '#475569', '#0f766e'][k]} corbata />)}
                  <Letrero x={870} y={790} texto="Capital riesgo" fondo="#1f2937" id={ID} op={e1(t, M('capital') + 0.4)} />
                  {t >= M('unidades') && (() => { const q = e1(t, M('unidades') - 1.5); return <g opacity={q * (1 - despega)} transform="translate(870 500)"><rect x={-90} y={-36} width={180} height={64} rx={20} fill={c.panel} style={sombra(0.25, 3, 8)} /><path d="M -10 28 L 0 48 L 12 28 Z" fill={c.panel} /><Txt f="a" x={0} y={8} textAnchor="middle" fontSize={30} fill={c.texto}>¿En miles?</Txt></g>; })()}
                </g>
              )}
            </Toma>

            {/* TOMA 4 · las canchas de pádel */}
            <Toma t={t} a={M('padel')} b={fin + 5}>
              {/* cancha */}
              <g transform="translate(250 470)" opacity={e1(t, M('padel')) * (1 - ac(t, M('dias') - 0.4, M('dias')))}>
                <rect x={-150} y={-200} width={300} height={400} rx={14} fill={isDark ? '#1d4ed8' : '#3b82f6'} />
                <rect x={-140} y={-190} width={280} height={380} rx={8} fill="none" stroke="#fff" strokeWidth={5} />
                <rect x={-140} y={-3} width={280} height={6} fill="#fff" /><rect x={-3} y={-190} width={6} height={380} fill="#fff" opacity={0.6} />
                {[-1, 1].map((k) => <g key={k} transform={`translate(${k * 60} ${k * 110}) rotate(${k * 30 + 10 * Math.sin(t * 3)})`}><ellipse rx={26} ry={32} fill={k > 0 ? NARANJA : '#1f2937'} /><rect x={-6} y={30} width={12} height={36} rx={5} fill="#334155" /></g>)}
                {(() => { const ph = (t * 0.8) % 1; return <circle cx={lerp(-60, 60, ph)} cy={lerp(-110, 110, ph) - 40 * Math.sin(Math.PI * ph)} r={10} fill="#d9f99d" />; })()}
              </g>
              {/* el teléfono con la app mínima */}
              <g transform="translate(640 470)">
                <rect x={-110} y={-220} width={220} height={440} rx={34} fill="#1f2937" />
                <rect x={-96} y={-200} width={192} height={400} rx={22} fill={c.panel} />
                {t >= M('pagos') && t < M('formulario') + 0.6 && <g opacity={e1(t, M('pagos')) * (1 - ac(t, M('formulario'), M('formulario') + 0.5))}>
                  {[['Pagos', -120], ['Mapas', -40]].map(([n, y], k) => <g key={k}><rect x={-76} y={(y as number) - 30} width={152} height={60} rx={12} fill={c.panel2} /><Txt f="a" x={0} y={(y as number) + 9} textAnchor="middle" fontSize={26} fill={c.tenue}>{n}</Txt><path d={`M -70 ${(y as number) - 24} L 70 ${(y as number) + 24}`} stroke={ROJO_M} strokeWidth={6} strokeLinecap="round" opacity={ac(t, M('pagos') + 0.5 + k * 0.3, M('pagos') + 0.9 + k * 0.3)} /></g>)}
                </g>}
                {t >= M('formulario') && <g opacity={e1(t, M('formulario'))}>
                  <Txt f="a" x={0} y={-150} textAnchor="middle" fontSize={26} fill={c.texto}>Reservar</Txt>
                  {[0, 1, 2].map((k) => <g key={k}><rect x={-76} y={-120 + k * 60} width={152} height={40} rx={10} fill={c.panel2} /><rect x={-64} y={-104 + k * 60} width={80 * ac(t, M('formulario') + 0.4 + k * 0.4, M('formulario') + 1 + k * 0.4)} height={8} rx={4} fill={c.tenue} /></g>)}
                  <rect x={-76} y={70} width={152} height={44} rx={22} fill={`url(#${ID}-marca)`} /><Txt f="a" x={0} y={100} textAnchor="middle" fontSize={24} fill="#fff">Enviar</Txt>
                </g>}
              </g>
              {/* diez clubes en un grupo de mensajes */}
              {t >= M('clubes') && (
                <g opacity={e1(t, M('clubes'))}>
                  {Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + (k * 2 * Math.PI) / 10; const x = 960 + 120 * Math.cos(a), y = 400 + 120 * Math.sin(a); return <g key={k} opacity={e1(t, M('clubes') + k * 0.1)}><line x1={960} y1={400} x2={x} y2={y} stroke={c.apagado} strokeWidth={3} /><circle cx={x} cy={y} r={24} fill={['#ec4899', AZUL_M, VERDE, '#f59e0b', VIOLETA][k % 5]} /><ellipse cx={x} cy={y - 2} rx={8} ry={10} fill="#fff" opacity={0.9} /></g>; })}
                  <g transform="translate(960 400)"><rect x={-40} y={-30} width={80} height={56} rx={16} fill={c.panel} style={sombra(0.25, 2, 6)} /><path d="M -10 26 L 0 40 L 10 26 Z" fill={c.panel} />{[0, 1, 2].map((q) => <circle key={q} cx={-18 + q * 18} cy={-2} r={5} fill={NARANJA} opacity={0.4 + 0.6 * Math.abs(Math.sin(t * 4 + q))} />)}</g>
                </g>
              )}
              {/* reservas a mano */}
              {t >= M('mano') && (
                <g opacity={e1(t, M('mano'))} transform="translate(960 680)">
                  <rect x={-130} y={-70} width={260} height={140} rx={12} fill="#fffbeb" style={{ filter: 'drop-shadow(0 4px 10px rgba(15,23,42,0.35))' }} />
                  {[0, 1, 2].map((k) => <rect key={k} x={-110} y={-44 + k * 34} width={200 * ac(t, M('mano') + k * 0.5, M('mano') + 0.9 + k * 0.5)} height={8} rx={4} fill="#475569" />)}
                  <g transform={`translate(${-110 + 200 * ((t - M('mano')) % 1.5) / 1.5} ${-40 + 34 * Math.floor(((t - M('mano')) / 1.5) % 3)}) rotate(30)`}><rect x={-5} y={-50} width={10} height={50} rx={3} fill="#f59e0b" /><path d="M -5 0 L 0 12 L 5 0 Z" fill="#334155" /></g>
                </g>
              )}
              {/* días, no meses */}
              {t >= M('dias') && (
                <g opacity={e1(t, M('dias'))}>
                  <Calendario x={250} y={400} s={1} marcados={Math.round(3 * ac(t, M('dias'), M('dias') + 1))} />
                  <Letrero x={250} y={530} texto="Días" id={ID} />
                  <g opacity={e1(t, M('dias') + 0.6)}><Letrero x={250} y={610} texto="Meses" fondo={c.panel2} color={c.tenue} id={ID} /><path d="M 190 610 H 310" stroke={ROJO_M} strokeWidth={5} strokeLinecap="round" /></g>
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
