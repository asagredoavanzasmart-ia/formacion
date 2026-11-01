import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Bloque, Engranaje, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «La paradoja del proceso de ventas», en cuatro tomas.
 * 1 · La paradoja: demasiado proceso mata al equipo; sin proceso, el equipo muere.
 * 2 · Un vendedor avanza entre dos barandas que cambian de ancho: sin proceso (lejos, zigzag, a ojo, el fundador que
 *     no sabe explicar), barandas (recto, con estilo propio) y guion rígido (todos iguales, como autómatas).
 * 3 · Qué es un proceso: pasos definidos desde que el comprador te conoce hasta que renueva; métricas, repetición,
 *     escala y responsabilidad; el cimiento del equipo.
 * 4 · Welch y Six Sigma (en ventas el valor está en la variación) frente a Bookbinder (ventas aburridamente parecidas).
 */

const ID = 'ro25';
const nombres = ['paradoja', 'mueren', 'vendedor', 'niveles', 'sinP', 'zigzag', 'conB', 'recto', 'rigido', 'cierran', 'sin2', 'estrellas', 'medir', 'ojo', 'fundador', 'barandas2', 'estilo', 'casey', 'medio', 'rigido2', 'automatas', 'adaptarse', 'que', 'pasos', 'renueva', 'permite', 'guia', 'cimiento', 'welch', 'variacion', 'valor', 'bookbinder', 'aburrida', 'distinta', 'pregunta'] as const;
type N = typeof nombres[number];

export const BarandasRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'La paradoja del proceso'], [m('vendedor'), 'Entre dos barandas'],
    [m('sinP'), 'Sin proceso'], [m('conB'), 'Barandas'], [m('rigido'), 'Guion rígido'],
    [m('sin2'), 'Sin proceso: a ojo'], [m('barandas2'), 'Barandas: el punto medio'], [m('rigido2'), 'Guion rígido: autómatas'],
    [m('que'), 'Qué es un proceso de ventas'], [m('welch'), 'Welch y la variación'], [m('bookbinder'), 'Bookbinder: ventas parecidas'],
  ];

  /* estado de las barandas: 0 = sin proceso, 1 = barandas, 2 = rígido */
  const GAPS = [210, 110, 44];
  const cambios: [number, number][] = [[-1, 0], [m('conB'), 1], [m('rigido'), 2], [m('sin2'), 0], [m('barandas2'), 1], [m('rigido2'), 2]];
  let previo = 0, nivel = 0, tc = -1;
  for (const [tt, l] of cambios) if (t >= tt) { previo = nivel; nivel = l; tc = tt; }
  const gap = lerp(GAPS[previo], GAPS[nivel], sm(t, tc, tc + 1.2));
  const amp = [gap - 40, 6, 0][nivel];
  const Y = 470;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La paradoja del proceso de ventas">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · la paradoja */}
      <Toma t={t} a={-1} b={m('vendedor')} zi={1}>
        <g opacity={e1(t, m('paradoja'))}>
          <Equipo id={ID} k="ven" x={300} y={620} s={0.85} t={t} nombre={false} />
          {Array.from({ length: 6 }, (_, k) => <rect key={k} x={180 + (k % 3) * 80} y={330 - Math.floor(k / 3) * 70} width={70} height={60} rx={8} fill="#94a3b8" />)}
          <Letrero x={300} y={700} texto="Demasiado proceso: mata" fondo={ROJO_M} id={ID} tam={24} />
        </g>
        {t >= m('mueren') && (
          <g opacity={e1(t, m('mueren'))}>
            <Equipo id={ID} k="ven" x={900} y={620} s={0.85} t={t} nombre={false} gris />
            {[0, 1, 2].map((k) => <path key={k} d={`M ${820 + k * 70} ${360 + 20 * Math.sin(t * 3 + k)} q 20 -30 40 0`} stroke="#94a3b8" strokeWidth={6} fill="none" />)}
            <Letrero x={900} y={700} texto="Sin proceso: muere" fondo={PIZARRA} id={ID} tam={24} />
          </g>
        )}
      </Toma>

      {/* TOMA 2 · las barandas */}
      <Toma t={t} a={m('vendedor')} b={m('que')}>
        {/* barandas */}
        {[-1, 1].map((s) => <g key={s}>
          <rect x={120} y={Y + s * gap - 7} width={960} height={14} rx={7} fill={nivel === 1 ? VERDE : nivel === 2 ? ROJO_M : '#94a3b8'} opacity={0.9} />
          {Array.from({ length: 9 }, (_, k) => <rect key={k} x={140 + k * 115} y={Y + s * gap + (s > 0 ? 0 : -40)} width={10} height={40} rx={4} fill={nivel === 1 ? VERDE : nivel === 2 ? ROJO_M : '#94a3b8'} opacity={0.7} />)}
        </g>)}
        {/* quien avanza */}
        {(() => { const u = ((t - m('vendedor')) * 0.12) % 1; const x = lerp(160, 1040, u); const y = Y + amp * Math.sin(u * 30) * (nivel === 0 ? 1 : 0.3); return (
          <g>
            {nivel === 0 && t >= m('zigzag') && <polyline points={Array.from({ length: 30 }, (_, k) => k / 29).filter((q) => q <= u).map((q) => `${lerp(160, 1040, q)},${Y + amp * Math.sin(q * 30)}`).join(' ')} fill="none" stroke="#94a3b8" strokeWidth={4} strokeDasharray="6 8" />}
            <circle cx={x} cy={y} r={20} fill={NARANJA} />
          </g>
        ); })()}
        {/* letreros del nivel */}
        {nivel === 0 && t >= m('sinP') && <Letrero x={600} y={160} texto="Cada uno por su camino" fondo={PIZARRA} id={ID} />}
        {nivel === 1 && <Letrero x={600} y={160} texto="Rumbo claro, estilo propio" fondo={VERDE} id={ID} />}
        {nivel === 2 && <Letrero x={600} y={160} texto="Sin espacio para adaptarse" fondo={ROJO_M} id={ID} />}
        {/* detalle de cada nivel (abajo) */}
        {t >= m('estrellas') && nivel === 0 && t >= m('sin2') && <g opacity={e1(t, m('estrellas'))}>{[0, 1, 2].map((k) => <path key={k} d="M 0 -22 L 6 -7 L 22 -6 L 10 5 L 14 21 L 0 12 L -14 21 L -10 5 L -22 -6 L -6 -7 Z" fill="#fbbf24" transform={`translate(${250 + k * 60} 800)`} />)}</g>}
        {t >= m('ojo') && nivel === 0 && t >= m('sin2') && <Letrero x={600} y={800} texto={t >= m('fundador') ? 'El fundador vende, pero no sabe explicar cómo' : 'No se mide, no se enseña, no escala'} fondo={PIZARRA} id={ID} op={e1(t, m('ojo'))} tam={22} />}
        {t >= m('estilo') && nivel === 1 && t >= m('barandas2') && <Letrero x={600} y={800} texto={t >= m('medio') ? 'El punto medio' : 'Etapas claras, estilo propio'} fondo={VERDE} id={ID} op={e1(t, m('estilo'))} tam={24} />}
        {t >= m('automatas') && nivel === 2 && t >= m('rigido2') && <g opacity={e1(t, m('automatas'))}>{[0, 1, 2, 3].map((k) => <Persona key={k} id={ID} x={760 + k * 70} y={820} s={0.32} cuerpo="#94a3b8" ojos={0.2} />)}<Letrero x={420} y={790} texto={t >= m('adaptarse') ? 'Se pierde la capacidad de adaptarse' : 'Todos dicen lo mismo'} fondo={ROJO_M} id={ID} tam={22} /></g>}
      </Toma>

      {/* TOMA 3 · qué es un proceso de ventas */}
      <Toma t={t} a={m('que')} b={m('welch')}>
        {(() => { const etapas = ['Te conoce', 'Evalúa', 'Compra', 'Usa', 'Renueva']; return (
          <g>
            {etapas.map((e, k) => t >= m('pasos') + k * 0.35 && (
              <g key={e} opacity={e1(t, m('pasos') + k * 0.35)}>
                <Bloque x={180 + k * 210} y={360 - k * 30} w={170} h={50} color={[AMBAR, NARANJA, ROSA, VIOLETA, VERDE][k]} alto={20} />
                <Txt f="a" x={180 + k * 210} y={300 - k * 30} textAnchor="middle" fontSize={24} fill={c.texto} peso={700}>{e}</Txt>
              </g>
            ))}
            {t >= m('permite') && ['Métricas', 'Repetición', 'Escala', 'Responsabilidad'].map((txt, k) => <g key={txt} opacity={e1(t, m('permite') + k * 0.3)}><Letrero x={240 + k * 240} y={540} texto={txt} fondo={PIZARRA} id={ID} tam={22} /></g>)}
            {t >= m('guia') && ['Contratar', 'Capacitar', 'Coaching'].map((txt, k) => <g key={txt} opacity={e1(t, m('guia') + k * 0.3)}><Persona id={ID} x={360 + k * 240} y={690} s={0.38} cuerpo={[AZUL_M, TEAL, VIOLETA][k]} /><Txt f="a" x={400 + k * 240} y={680} fontSize={22} fill={c.tenue}>{txt}</Txt></g>)}
            {t >= m('cimiento') && <g opacity={e1(t, m('cimiento'))}><rect x={180} y={730} width={840} height={50} rx={12} fill={`url(#${ID}-marca)`} /><Txt f="a" x={600} y={764} textAnchor="middle" fontSize={26} fill="#fff" peso={700}>El cimiento del equipo</Txt></g>}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 4 · Welch frente a Bookbinder */}
      <Toma t={t} a={m('welch')} b={fin + 1}>
        <rect x={598} y={160} width={4} height={600} rx={2} fill={c.apagado} />
        <g opacity={e1(t, m('welch'))}>
          <Engranaje x={300} y={330} r={60} t={t} color="#94a3b8" hueco={c.panel} />
          {t >= m('variacion') && <g opacity={e1(t, m('variacion'))}><Txt f="a" x={300} y={470} textAnchor="middle" fontSize={26} fill={c.texto}>Six Sigma elimina la variación</Txt></g>}
          {t >= m('valor') && <g opacity={e1(t, m('valor'))}>{[0, 1, 2, 3].map((k) => <circle key={k} cx={200 + k * 66} cy={570 + 24 * Math.sin(t * 2 + k * 1.7)} r={18} fill={[NARANJA, ROSA, VIOLETA, AZUL_M][k]} />)}<Letrero x={300} y={680} texto="En ventas, el valor está en la variación" id={ID} tam={22} /></g>}
        </g>
        {t >= m('bookbinder') && (
          <g opacity={e1(t, m('bookbinder'))}>
            {[0, 1, 2].map((k) => <g key={k}><rect x={720} y={260 + k * 110} width={340} height={80} rx={14} fill={c.panel} style={sombra(c.sombra, 3, 8)} /><Visto x={760} y={300 + k * 110} r={20} /><rect x={800} y={292 + k * 110} width={220} height={14} rx={7} fill="#cbd5e1" /></g>)}
            {t >= m('aburrida') && <Letrero x={890} y={210} texto="Aburridamente parecidas" fondo={VERDE} id={ID} op={e1(t, m('aburrida'))} tam={22} />}
            {t >= m('distinta') && <Letrero x={890} y={640} texto="«Esta es distinta» = no se cierra" fondo={ROJO_M} id={ID} op={e1(t, m('distinta'))} tam={22} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
