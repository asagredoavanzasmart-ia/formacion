import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Reloj, Corazon, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Velocidad, no rapidez», en cinco tomas.
 * 1 · Rapidez: un corredor que gira en círculos con el velocímetro al máximo. Velocidad: cuánto tarda en llegar a la meta.
 * 2 · Cinco esferas corren cada una en su dirección sin acercarse a la meta; en «mismo rumbo» se alinean y llegan juntas.
 * 3 · La bicicleta de Davidoff: en primera, muchas vueltas y poco avance; en una marcha larga, pocas vueltas y más tracción.
 * 4 · La consecuencia: exigir más esfuerzo no sirve (cada uno ya corre tras su cuota); hace falta alguien con perspectiva.
 * 5 · El error clásico (el sello «NO» del departamento de prevención de ventas) frente a la empatía y la curiosidad.
 */

const ID = 'ro09';
const nombres = ['rapidez', 'velocidad', 'aumentar', 'estados', 'ritmo', 'direcciones', 'meta', 'rumbo', 'alinean', 'traccion', 'bici', 'primera', 'larga', 'consecuencia', 'esfuerzo', 'cuota', 'perspectiva', 'lento', 'error', 'prevencion', 'decia', 'actitud', 'empatia', 'clientes', 'pregunta'] as const;
type N = typeof nombres[number];

export const VelocidadRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Velocidad, no rapidez'], [m('rapidez'), 'Rapidez: qué tan rápido vas'], [m('velocidad'), 'Velocidad: cuánto tardas en llegar'],
    [m('ritmo'), 'Cada equipo a su ritmo'], [m('rumbo'), 'Mismo rumbo'],
    [m('bici'), 'La bicicleta'], [m('larga'), 'Menos vueltas, más tracción'],
    [m('consecuencia'), 'La consecuencia'], [m('perspectiva'), 'Alguien con perspectiva'],
    [m('error'), 'El error clásico'], [m('actitud'), 'La actitud correcta'],
  ];

  /* Toma 2 · cinco esferas */
  const alinea = sm(t, m('alinean'), m('alinean') + 2);
  const META: [number, number] = [1000, 450];
  const esfera = (k: number): [number, number] => {
    const a = k * 1.256 + t * (0.9 + k * 0.12);
    const caos: [number, number] = [430 + 150 * Math.cos(a) + 40 * Math.sin(t * 2 + k), 450 + 140 * Math.sin(a * 1.3)];
    const fila: [number, number] = [lerp(200, 880, ((t * 0.3 + k * 0.08) % 1)), 450 + (k - 2) * 28];
    return [lerp(caos[0], fila[0], alinea), lerp(caos[1], fila[1], alinea)];
  };

  /* Toma 3 · la bicicleta */
  const larga = sm(t, m('larga'), m('larga') + 1.2);
  const pedal = t * lerp(9, 3, larga);
  const avance = (t - m('bici')) * lerp(30, 90, larga);
  const bx = 300 + (((avance % 700) + 700) % 700);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Velocidad, no rapidez">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · rapidez frente a velocidad */}
      <Toma t={t} a={-1} b={m('ritmo')} zi={1}>
        <rect x={598} y={150} width={4} height={620} rx={2} fill={c.apagado} />
        {t >= m('rapidez') && (
          <g opacity={e1(t, m('rapidez'))}>
            <ellipse cx={300} cy={600} rx={170} ry={50} fill="none" stroke={c.apagado} strokeWidth={10} />
            {(() => { const a = t * 4; return <Persona id={ID} x={300 + 170 * Math.cos(a)} y={600 + 50 * Math.sin(a)} s={0.45} cuerpo={PIZARRA} />; })()}
            {/* velocímetro al máximo */}
            <g transform="translate(300 330)">
              <path d="M -90 0 A 90 90 0 0 1 90 0" fill="none" stroke={c.apagado} strokeWidth={18} strokeLinecap="round" />
              <path d="M -90 0 A 90 90 0 0 1 90 0" fill="none" stroke={ROJO_M} strokeWidth={18} strokeLinecap="round" strokeDasharray={283} strokeDashoffset={283 * 0.05} />
              <line x1={0} y1={0} x2={80 * Math.cos(-0.25 + 0.05 * Math.sin(t * 20))} y2={-80 * Math.sin(Math.PI - 0.25)} stroke={c.texto} strokeWidth={6} strokeLinecap="round" />
              <circle r={10} fill={c.texto} />
            </g>
            <Letrero x={300} y={740} texto="Rapidez" fondo={ROJO_M} id={ID} />
          </g>
        )}
        {t >= m('velocidad') && (
          <g opacity={e1(t, m('velocidad'))}>
            <rect x={680} y={600} width={400} height={8} rx={4} fill={c.apagado} />
            {(() => { const u = ((t - m('velocidad')) * 0.18) % 1; return <Persona id={ID} x={lerp(700, 1020, u)} y={600} s={0.45} cuerpo={VIOLETA} />; })()}
            <rect x={1050} y={440} width={8} height={160} fill={PIZARRA} /><path d="M 1058 440 h 60 l -14 18 l 14 18 h -60 Z" fill={VERDE} />
            <Reloj x={880} y={340} r={60} t={t} vel={0.4} aro={VIOLETA} />
            <Letrero x={880} y={740} texto="Velocidad" fondo={VIOLETA} id={ID} />
          </g>
        )}
        {t >= m('aumentar') && <Letrero x={600} y={170} texto="RevOps sube la velocidad" id={ID} op={e1(t, m('aumentar'))} />}
      </Toma>

      {/* TOMA 2 · cinco esferas y la meta */}
      <Toma t={t} a={m('ritmo')} b={m('bici')}>
        {t >= m('meta') - 0.1 || alinea > 0 ? (
          <g opacity={Math.max(e1(t, m('meta')), alinea)}>
            <circle cx={META[0]} cy={META[1]} r={90} fill={`url(#${ID}-marca)`} opacity={0.18 + 0.1 * Math.sin(t * 3)} />
            <circle cx={META[0]} cy={META[1]} r={56} fill={`url(#${ID}-marca)`} />
            <Txt x={META[0]} y={META[1] + 10} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>$</Txt>
            <Letrero x={META[0]} y={META[1] + 130} texto="Meta de ingresos" id={ID} />
          </g>
        ) : null}
        {[0, 1, 2, 3, 4].map((k) => {
          const [x, y] = esfera(k);
          return <g key={k} opacity={e1(t, m('ritmo') + k * 0.15)}>
            {alinea < 0.5 && t >= m('direcciones') && <line x1={x} y1={y} x2={x - 40 * Math.cos(k * 1.256 + t * (0.9 + k * 0.12) + 1.57)} y2={y - 40 * Math.sin(k * 1.256 + t)} stroke="#94a3b8" strokeWidth={4} opacity={0.6 * (1 - alinea * 2)} strokeLinecap="round" />}
            <circle cx={x} cy={y} r={26} fill={alinea > 0.5 ? [AMBAR, NARANJA, ROSA, TEAL, VIOLETA][k] : '#94a3b8'} />
          </g>;
        })}
        {alinea > 0.3 && <Flujo x1={880} y1={450} x2={950} y2={450} t={t} n={4} vel={1} arco={0} color={NARANJA} r={8} op={alinea} />}
        {t >= m('direcciones') && <Letrero x={430} y={720} texto={alinea > 0.5 ? 'Todos hacia la meta' : 'Todos al máximo, cada uno a otro lado'} fondo={alinea > 0.5 ? undefined : PIZARRA} id={ID} op={e1(t, m('direcciones'))} />}
        {t >= m('traccion') && <Letrero x={430} y={790} texto="Menos vueltas, más tracción" fondo={VERDE} id={ID} op={e1(t, m('traccion'))} tam={24} />}
      </Toma>

      {/* TOMA 3 · la bicicleta */}
      <Toma t={t} a={m('bici')} b={m('consecuencia')}>
        <Suelo y={660} isDark={isDark} x0={100} x1={1100} />
        <g transform={`translate(${bx} 0)`}>
          {[-110, 110].map((dx) => <g key={dx} transform={`translate(${dx} 590) rotate(${pedal * 20})`}>
            <circle r={70} fill="none" stroke={c.texto} strokeWidth={9} />
            {[0, 60, 120].map((a) => <line key={a} x1={-70} y1={0} x2={70} y2={0} stroke={c.tenue} strokeWidth={3} transform={`rotate(${a})`} />)}
          </g>)}
          <path d="M -110 590 L -20 490 L 80 490 L 110 590 M -20 490 L 0 590 L 80 490" stroke={NARANJA} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          {/* plato y pedal: el tamaño del plato cambia con la marcha */}
          <circle cx={0} cy={590} r={lerp(18, 34, larga)} fill={ROSA} />
          <line x1={0} y1={590} x2={34 * Math.cos(pedal)} y2={590 + 34 * Math.sin(pedal)} stroke={c.texto} strokeWidth={8} strokeLinecap="round" />
          <Persona id={ID} x={0} y={500} s={0.5} cuerpo={VIOLETA} />
        </g>
        {t >= m('primera') && <Letrero x={360} y={240} texto="Primera marcha: muchas vueltas" fondo={PIZARRA} id={ID} op={e1(t, m('primera')) * (1 - larga)} />}
        {t >= m('larga') && <Letrero x={600} y={240} texto="Marcha larga: más tracción" id={ID} op={larga} />}
        <g transform="translate(980 220)">
          <rect x={-120} y={-50} width={240} height={100} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
          <Txt f="a" x={-100} y={-8} fontSize={22} fill={c.tenue}>vueltas por minuto</Txt>
          <Txt x={-100} y={34} fontSize={36} fill={c.texto} peso={800}>{Math.round(lerp(90, 30, larga))}</Txt>
        </g>
      </Toma>

      {/* TOMA 4 · no más esfuerzo: perspectiva */}
      <Toma t={t} a={m('consecuencia')} b={m('error')}>
        <Suelo y={690} isDark={isDark} />
        {[0, 1, 2, 3].map((k) => {
          const dir = [-1, 1, -1, 1][k];
          const gira = sm(t, m('perspectiva') + 0.5, m('perspectiva') + 2);
          return (
            <g key={k} transform={`translate(${220 + k * 250} 0)`}>
              <g transform={`scale(${lerp(dir, 1, gira)} 1)`}>
                <Persona id={ID} x={0} y={690 - 8 * Math.abs(Math.sin(t * 8 + k))} s={0.55} cuerpo={[AMBAR, NARANJA, TEAL, ROSA][k]} />
                <path d="M 50 600 l 60 0 l -14 -12 M 110 600 l -14 12" stroke={[AMBAR, NARANJA, TEAL, ROSA][k]} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.8} />
              </g>
              {t >= m('cuota') && <g opacity={e1(t, m('cuota'))}><rect x={-34} y={420} width={68} height={40} rx={10} fill={PIZARRA} /><Txt f="a" x={0} y={448} textAnchor="middle" fontSize={20} fill="#fff">cuota</Txt></g>}
              {t >= m('esfuerzo') && [0, 1].map((j) => { const ph = (t * 1.3 + j / 2 + k * 0.2) % 1; return <path key={j} d={`M ${-30 + j * 50} ${520 + ph * 30} q -6 10 0 14 q 6 -4 0 -14 Z`} fill="#7dd3fc" opacity={(1 - ph) * (1 - gira)} />; })}
            </g>
          );
        })}
        {t >= m('esfuerzo') && <Letrero x={600} y={200} texto="Exigir más esfuerzo no sirve" fondo={ROJO_M} id={ID} op={e1(t, m('esfuerzo')) * (1 - ac(t, m('perspectiva') - 0.4, m('perspectiva')))} />}
        {t >= m('perspectiva') && (
          <g opacity={e1(t, m('perspectiva'))}>
            <Equipo id={ID} k="ops" x={600} y={360} s={0.55} t={t} nombre={false} />
            <path d="M 600 160 l 20 40 h -40 Z" fill={NARANJA} transform={`rotate(${90 * (1 - sm(t, m('perspectiva') + 0.5, m('perspectiva') + 2))} 600 190)`} />
            <Letrero x={600} y={770} texto={t >= m('lento') ? 'Aunque a veces sea más lento' : 'Todos en la misma dirección'} id={ID} />
          </g>
        )}
      </Toma>

      {/* TOMA 5 · el error clásico frente a la actitud correcta */}
      <Toma t={t} a={m('error')} b={fin + 1}>
        <rect x={598} y={150} width={4} height={620} rx={2} fill={c.apagado} />
        <g opacity={e1(t, m('error'))}>
          <Equipo id={ID} k="ops" x={300} y={660} s={0.7} t={t} nombre={false} distintivo={false} />
          <Equipo id={ID} k="ven" x={140} y={660} s={0.55} t={t} nombre={false} />
          {t >= m('prevencion') && (() => { const g = sm(t, m('decia'), m('decia') + 0.4); return (
            <g transform={`translate(330 ${lerp(220, 320, g)}) rotate(-12) scale(${lerp(1.4, 1, g)})`} opacity={e1(t, m('prevencion'))}>
              <rect x={-90} y={-46} width={180} height={92} rx={14} fill="none" stroke={ROJO_M} strokeWidth={10} />
              <Txt x={0} y={22} textAnchor="middle" fontSize={64} fill={ROJO_M} peso={800}>NO</Txt>
            </g>
          ); })()}
          {t >= m('prevencion') && <Letrero x={300} y={740} texto="«Prevención de ventas»" fondo={ROJO_M} id={ID} op={e1(t, m('prevencion'))} />}
        </g>
        {t >= m('actitud') && (
          <g opacity={e1(t, m('actitud'))}>
            <rect x={760} y={540} width={300} height={20} rx={8} fill={isDark ? '#6b4f3a' : '#a16207'} />
            <Equipo id={ID} k="ven" x={980} y={660} s={0.55} t={t} nombre={false} />
            <Equipo id={ID} k="ops" x={790} y={660} s={0.6} t={t} nombre={false} distintivo={false} />
            {t >= m('empatia') && <g opacity={e1(t, m('empatia'))}><Corazon x={820} y={330 - 6 * Math.sin(t * 4)} s={0.8} /><Txt x={890} y={350} fontSize={70} fill={NARANJA} peso={800}>?</Txt></g>}
            <Letrero x={900} y={740} texto={t >= m('clientes') ? 'Los equipos también son clientes' : 'Empatía y curiosidad'} id={ID} tam={24} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
