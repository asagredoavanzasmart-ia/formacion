import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Calendario, Monitor, Burbuja, Moneda3D, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Indicadores adelantados y la historia detrás del número», en cinco tomas.
 * 1 · El ingreso es el espejo retrovisor (rezagado); los adelantados son los focos que alumbran lo que viene.
 * 2 · La cadena de cuatro esferas: tickets de soporte, uso del producto y riesgo de renovación avisan; el ingreso confirma.
 *     Cada esfera cambia al nombrarse y entre la primera y la última pasan meses para actuar.
 * 3 · El dato como historia: 100.000 visitas en un día; las pistas (rebote 99 %, un país donde no se vende) llevan a los bots.
 * 4 · Bellamy: un buen reporte parte de una pregunta, no de una plantilla.
 * 5 · Para qué: ver qué palancas mueven el resultado, con las herramientas que ya tienes.
 */

const ID = 'ro34';
const nombres = ['rezagado', 'adelantados', 'mcleish', 'informa', 'cadena', 'tres', 'ultima', 'frase', 'tickets', 'uso', 'renovacion', 'ingresos', 'meses', 'historia', 'visitas', 'normal', 'noticia', 'rebote', 'pais', 'bots', 'conclusion', 'bellamy', 'reportes', 'pregunta2', 'plantilla', 'paraQue', 'palancas', 'pequena', 'analistas', 'pregunta'] as const;
type N = typeof nombres[number];

const ESFERAS = [
  { txt: 'Tickets de soporte', col: AMBAR, n: 'tickets' as N },
  { txt: 'Uso del producto', col: NARANJA, n: 'uso' as N },
  { txt: 'Riesgo de renovación', col: ROSA, n: 'renovacion' as N },
  { txt: 'Ingresos', col: '#94a3b8', n: 'ingresos' as N },
];

export const IndicadoresRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Indicadores adelantados'], [m('rezagado'), 'El ingreso llega tarde'], [m('adelantados'), 'Lo que avisa antes'],
    [m('cadena'), 'Una cadena de señales'], [m('meses'), 'Meses para actuar'],
    [m('historia'), 'La historia detrás del número'], [m('conclusion'), 'No es un triunfo'], [m('bellamy'), 'Reportes que responden preguntas'], [m('paraQue'), 'Para qué sirve'],
  ];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Indicadores adelantados y la historia detrás del número">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · retrovisor y focos */}
      <Toma t={t} a={-1} b={m('cadena')} zi={1}>
        <rect x={60} y={560} width={1080} height={120} rx={20} fill={isDark ? '#374151' : '#cbd5e1'} />
        {Array.from({ length: 8 }, (_, k) => <rect key={k} x={((k * 160 - t * 200) % 1280 + 1280) % 1280 - 60} y={614} width={80} height={10} rx={5} fill="#fff" opacity={0.7} />)}
        {/* auto */}
        <g transform="translate(560 600)">
          <rect x={-130} y={-70} width={260} height={70} rx={20} fill={VIOLETA} /><rect x={-80} y={-120} width={150} height={60} rx={16} fill={VIOLETA} />
          <rect x={-66} y={-110} width={56} height={40} rx={8} fill="#c7d2fe" /><rect x={0} y={-110} width={56} height={40} rx={8} fill="#c7d2fe" />
          <circle cx={-80} cy={0} r={26} fill="#1f2937" /><circle cx={80} cy={0} r={26} fill="#1f2937" />
          {t >= m('adelantados') && <path d="M 130 -50 L 520 -130 L 520 40 Z" fill="#fde68a" opacity={0.45 * e1(t, m('adelantados'))} />}
        </g>
        {t >= m('rezagado') && <g opacity={e1(t, m('rezagado'))}><rect x={160} y={250} width={260} height={110} rx={50} fill={c.panel} stroke={PIZARRA} strokeWidth={8} /><Txt f="a" x={290} y={315} textAnchor="middle" fontSize={24} fill={c.texto}>Ingresos</Txt><Letrero x={290} y={420} texto="Rezagado: informa tarde" fondo={PIZARRA} id={ID} tam={22} /></g>}
        {t >= m('adelantados') && <g opacity={e1(t, m('adelantados'))}><Letrero x={900} y={300} texto="Adelantados: avisan antes" fondo={AMBAR} id={ID} tam={24} /></g>}
        {t >= m('mcleish') && <Letrero x={600} y={190} texto="Encontrarlos y vigilarlos de cerca" id={ID} op={e1(t, m('mcleish'))} tam={24} />}
      </Toma>

      {/* TOMA 2 · la cadena de cuatro esferas */}
      <Toma t={t} a={m('cadena')} b={m('historia')}>
        {ESFERAS.map((e, k) => {
          const x = 190 + k * 275, on = t >= m(e.n);
          return (
            <g key={e.txt} opacity={e1(t, m('cadena') + k * 0.25)}>
              {k < 3 && <rect x={x + 60} y={386} width={155} height={8} rx={4} fill={c.apagado} />}
              <circle cx={x} cy={390} r={on ? 66 + 4 * Math.sin(t * 4) : 60} fill={e.col} />
              <ellipse cx={x - 20} cy={366} rx={18} ry={11} fill="#fff" opacity={0.4} />
              <Txt f="a" x={x} y={500} textAnchor="middle" fontSize={22} fill={c.texto} peso={700}>{e.txt}</Txt>
              {t >= m(k < 3 ? 'tres' : 'ultima') && <Letrero x={x} y={250} texto={k < 3 ? 'adelantado' : 'rezagado'} fondo={k < 3 ? VERDE : PIZARRA} id={ID} tam={20} op={e1(t, m(k < 3 ? 'tres' : 'ultima'))} />}
              {/* lo que pasa en cada esfera */}
              {on && k === 0 && [0, 1, 2, 3].map((j) => <rect key={j} x={x - 40 + j * 22} y={620 - (20 + j * 18) * sm(t, m(e.n), m(e.n) + 1)} width={16} height={(20 + j * 18) * sm(t, m(e.n), m(e.n) + 1)} rx={4} fill={AMBAR} />)}
              {on && k === 1 && <polyline points={[0, 1, 2, 3, 4].map((j) => `${x - 50 + j * 25},${560 + j * j * 3 * sm(t, m(e.n), m(e.n) + 1)}`).join(' ')} fill="none" stroke={NARANJA} strokeWidth={6} strokeLinecap="round" />}
              {on && k === 2 && <Calendario x={x} y={600} s={0.5} marcados={12} />}
              {on && k === 3 && <g><Moneda3D x={x} y={590 + 30 * sm(t, m(e.n), m(e.n) + 1.5)} r={24} giro={Math.cos(t * 3)} /><path d={`M ${x + 40} 560 v 50 l -10 -12 m 10 12 l 10 -12`} stroke={ROJO_M} strokeWidth={5} fill="none" /></g>}
            </g>
          );
        })}
        {t >= m('cadena') && (() => { const u = ((t - m('cadena')) * 0.3) % 1; return <circle cx={lerp(190, 1015, u)} cy={390} r={12} fill="#fff" stroke={`url(#${ID}-marca)`} strokeWidth={5} />; })()}
        {t >= m('frase') && <Letrero x={600} y={160} texto="Más tickets anticipan pérdida de clientes" fondo={PIZARRA} id={ID} op={e1(t, m('frase')) * (1 - ac(t, m('meses') - 0.3, m('meses')))} tam={22} />}
        {t >= m('meses') && <g opacity={e1(t, m('meses'))}><path d="M 190 720 H 1015" stroke={VERDE} strokeWidth={8} strokeLinecap="round" /><path d="M 1015 720 l -18 -12 v 24 Z" fill={VERDE} /><Letrero x={600} y={770} texto="Meses para actuar" fondo={VERDE} id={ID} tam={24} /></g>}
      </Toma>

      {/* TOMA 3 · la historia detrás del número */}
      <Toma t={t} a={m('historia')} b={m('bellamy')}>
        {(() => { const bots = t >= m('bots'); return (
          <g>
            <rect x={120} y={640} width={560} height={5} rx={2} fill={c.apagado} />
            {Array.from({ length: 7 }, (_, k) => { const pico = k === 5 && t >= m('visitas'); const h = pico ? 360 * sm(t, m('visitas'), m('visitas') + 1) : 30 + (k % 3) * 8; return <rect key={k} x={150 + k * 75} y={640 - h} width={50} height={h} rx={8} fill={pico ? (bots ? '#94a3b8' : VERDE) : c.apagado} />; })}
            {t >= m('visitas') && <Letrero x={530} y={220} texto="100.000 visitas en un día" fondo={bots ? PIZARRA : VERDE} id={ID} tam={22} />}
            {t >= m('normal') && <Txt f="a" x={150} y={590} fontSize={20} fill={c.tenue} opacity={e1(t, m('normal'))}>lo normal: 1.000</Txt>}
            {t >= m('noticia') && !bots && <Letrero x={530} y={160} texto="¿Gran noticia?" id={ID} op={e1(t, m('noticia'))} tam={22} />}
            {([['rebote', 'Rebote: 99 %'], ['pais', 'Desde un país donde no se vende'], ['bots', 'País conocido por los bots']] as [N, string][]).map(([n, txt], k) => t >= m(n) && (
              <g key={n} opacity={e1(t, m(n))}>
                <rect x={740} y={240 + k * 120} width={380} height={90} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                <circle cx={782} cy={285 + k * 120} r={22} fill={AMBAR} /><Txt x={782} y={294 + k * 120} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>{k + 1}</Txt>
                <Txt f="a" x={815} y={293 + k * 120} fontSize={k === 1 ? 18 : 22} fill={c.texto}>{txt}</Txt>
              </g>
            ))}
            {bots && <g opacity={e1(t, m('bots'))} transform="translate(560 330)"><rect x={-34} y={-30} width={68} height={56} rx={12} fill={PIZARRA} /><circle cx={-13} cy={-4} r={7} fill="#7dd3fc" /><circle cx={13} cy={-4} r={7} fill="#7dd3fc" /><rect x={-3} y={-46} width={6} height={16} fill={PIZARRA} /><circle cy={-48} r={6} fill={ROJO_M} /></g>}
            {t >= m('conclusion') && <Letrero x={600} y={760} texto="No es un triunfo: probablemente bots" fondo={ROJO_M} id={ID} op={e1(t, m('conclusion'))} />}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 4 · Bellamy */}
      <Toma t={t} a={m('bellamy')} b={m('paraQue')}>
        <Suelo y={700} isDark={isDark} />
        <Persona id={ID} x={260} y={700} s={0.8} cuerpo={PIZARRA} corbata />
        <Equipo id={ID} k="ops" x={940} y={700} s={0.8} t={t} nombre={false} />
        {t >= m('reportes') && <g opacity={e1(t, m('reportes')) * (1 - ac(t, m('pregunta2') - 0.3, m('pregunta2')))}><Burbuja x={150} y={250} w={340} texto="«¿Qué reporte quieres?»" u={sm(t, m('reportes'), m('reportes') + 1)} c={c} id={ID} tam={24} /></g>}
        {t >= m('pregunta2') && <Burbuja x={600} y={250} w={420} texto="«¿Qué quieres saber?»" u={sm(t, m('pregunta2'), m('pregunta2') + 1)} c={c} id={ID} lado="der" tam={26} />}
        {t >= m('pregunta2') && <g opacity={e1(t, m('pregunta2') + 1)}><g transform="translate(600 640) scale(0.6)"><Monitor x={0} y={0} w={240} h={150}><rect x={20} y={20} width={200} height={20} rx={10} fill={NARANJA} />{[0, 1, 2].map((j) => <rect key={j} x={30 + j * 60} y={130 - 30 - j * 20} width={40} height={30 + j * 20} rx={6} fill={[AMBAR, ROSA, VIOLETA][j]} />)}</Monitor></g></g>}
        {t >= m('plantilla') && <Letrero x={600} y={770} texto="Una pregunta, no una plantilla" id={ID} op={e1(t, m('plantilla'))} />}
      </Toma>

      {/* TOMA 5 · para qué sirve */}
      <Toma t={t} a={m('paraQue')} b={fin + 1}>
        {t >= m('palancas') && ['Tickets', 'Pérdida de clientes'].map((txt, k) => <g key={txt} opacity={e1(t, m('palancas') + k * 0.3)}>
          <rect x={300 + k * 400 - 14} y={260} width={28} height={260} rx={14} fill={c.apagado} />
          <g transform={`rotate(${(k ? -1 : 1) * 25 * Math.sin(t * 1.3)} ${300 + k * 400} 520)`}><rect x={300 + k * 400 - 10} y={290} width={20} height={230} rx={10} fill={[AMBAR, ROSA][k]} /><circle cx={300 + k * 400} cy={290} r={34} fill={[AMBAR, ROSA][k]} /></g>
          <Letrero x={300 + k * 400} y={580} texto={txt} fondo={[AMBAR, ROSA][k]} id={ID} tam={22} />
        </g>)}
        {t >= m('palancas') && <path d="M 340 400 C 420 340 580 340 660 400" stroke={c.tenue} strokeWidth={5} fill="none" strokeDasharray="10 8" opacity={e1(t, m('palancas') + 0.8)} />}
        {t >= m('pequena') && <Letrero x={500} y={690} texto="Con las herramientas que ya tienes" fondo={VERDE} id={ID} op={e1(t, m('pequena'))} />}
        {t >= m('analistas') && <g opacity={e1(t, m('analistas'))}>{[0, 1, 2].map((k) => <Persona key={k} id={ID} x={930 + k * 70} y={640} s={0.38} cuerpo="#94a3b8" />)}<Cruz x={1000} y={480} r={26} /><Letrero x={1000} y={700} texto="Sin equipo de analistas" fondo={PIZARRA} id={ID} tam={20} /></g>}
      </Toma>
    </Lienzo>
  );
};
