import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Moneda3D, Hoja, Burbuja, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Habla el idioma del negocio», en cuatro tomas.
 * 1 · Operaciones aparece como un gasto; el trabajo es traducirlo en un activo que genera ingresos. El error: llegar al
 *     CEO con «reducir fricción y romper silos» (lo hace hace 20 años) sin un número.
 * 2 · El estado de resultados en cinco barras; tres iniciativas, cada una mueve su línea (resultado, ingresos, gastos).
 * 3 · Los tres estados financieros: balance (una foto), estado de resultados (un periodo) y flujo de caja (el dinero que entra y sale).
 * 4 · «Más eficiente» son palabras vacías hasta que se atan a un número: cursos para aprender finanzas.
 */

const ID = 'ro37';
const nombres = ['gasto', 'activo', 'butler', 'bolian', 'silos', 'veinte', 'articular', 'estado', 'ingresos', 'costo', 'margen', 'gastos', 'resultado', 'iniciativas', 'cac', 'base', 'equipo', 'tres', 'balance', 'foto', 'activos', 'resultados2', 'periodo', 'utilidad', 'flujo', 'dinero', 'depreciacion', 'bolian2', 'genial', 'cursos', 'vacias', 'pregunta'] as const;
type N = typeof nombres[number];

export const LenguajeRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'El idioma del negocio'], [m('activo'), 'De gasto a activo'], [m('bolian'), 'El error más común'],
    [m('estado'), 'El estado de resultados'], [m('iniciativas'), 'Qué línea mueve cada iniciativa'],
    [m('tres'), 'Tres estados financieros'], [m('bolian2'), '«¿Qué tiene de distinto?»'], [m('cursos'), 'Atarlo a un número'],
  ];

  /* barras del estado de resultados */
  const ini = t >= m('equipo') ? 2 : t >= m('base') ? 1 : t >= m('cac') ? 0 : -1;
  const L = [
    { n: 'ingresos' as N, txt: 'Ingresos', v: 100 + (ini === 1 ? 15 * sm(t, m('base'), m('base') + 1) : 0), col: VERDE },
    { n: 'costo' as N, txt: 'Costo de ventas', v: 40 - (ini === 0 ? 8 * sm(t, m('cac'), m('cac') + 1) : 0), col: ROJO_M },
    { n: 'margen' as N, txt: 'Margen bruto', v: 0, col: AZUL_M },
    { n: 'gastos' as N, txt: 'Gastos operativos', v: 35 - (ini === 2 ? 8 * sm(t, m('equipo'), m('equipo') + 1) : 0), col: AMBAR },
    { n: 'resultado' as N, txt: 'Resultado operacional', v: 0, col: VIOLETA },
  ];
  L[2].v = L[0].v - L[1].v; L[4].v = L[2].v - L[3].v;
  const foco = ini === 0 ? [1, 4] : ini === 1 ? [0] : ini === 2 ? [3] : [];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Habla el idioma del negocio">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · de gasto a activo; el error con el CEO */}
      <Toma t={t} a={-1} b={m('estado')} zi={1}>
        {t < m('bolian') && (() => { const tr = sm(t, m('activo'), m('activo') + 1.5); return (
          <g opacity={1 - ac(t, m('bolian') - 0.4, m('bolian'))}>
            <rect x={200} y={220} width={380} height={420} rx={20} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            {Array.from({ length: 6 }, (_, k) => <rect key={k} x={230} y={270 + k * 56} width={k === 3 ? 320 : 220 + (k * 23) % 100} height={14} rx={7} fill={k === 3 ? (tr > 0.5 ? VERDE : ROJO_M) : '#cbd5e1'} />)}
            <Letrero x={390} y={680} texto={tr > 0.5 ? 'Un activo' : 'Operaciones = gasto'} fondo={tr > 0.5 ? VERDE : ROJO_M} id={ID} />
            {tr > 0.01 && [0, 1, 2].map((k) => { const ph = ((t - m('activo')) * 0.5 + k / 3) % 1; return <g key={k} opacity={Math.min(1, ph * 5, (1 - ph) * 5) * tr}><Moneda3D x={lerp(560, 860, ph)} y={lerp(440, 380, ph)} r={22} giro={Math.cos(t * 4 + k)} /></g>; })}
            {t >= m('butler') && <g opacity={e1(t, m('butler'))}><Persona id={ID} x={940} y={640} s={0.7} cuerpo={VIOLETA} /><Letrero x={940} y={700} texto="Dos décadas en operaciones" fondo={VIOLETA} id={ID} tam={20} /></g>}
          </g>
        ); })()}
        {t >= m('bolian') && (
          <g opacity={e1(t, m('bolian'))}>
            <Suelo y={700} isDark={isDark} />
            <Equipo id={ID} k="ops" x={300} y={700} s={0.8} t={t} nombre={false} />
            <Persona id={ID} x={900} y={700} s={0.85} cuerpo={PIZARRA} corbata ojos={t >= m('veinte') ? 0.3 : 1} />
            <Letrero x={900} y={760} texto="CEO" fondo={PIZARRA} id={ID} tam={22} />
            {t >= m('silos') && <Burbuja x={150} y={220} w={420} texto="«Vamos a reducir la fricción y romper silos»" u={sm(t, m('silos'), m('silos') + 1.4)} c={c} id={ID} tam={24} />}
            {t >= m('veinte') && <Burbuja x={640} y={330} w={400} texto="«Eso hago hace 20 años»" u={sm(t, m('veinte'), m('veinte') + 1)} c={c} id={ID} lado="der" tam={24} />}
            {t >= m('articular') && <Letrero x={600} y={160} texto="Sin términos financieros, termina ahí" fondo={ROJO_M} id={ID} op={e1(t, m('articular'))} tam={22} />}
          </g>
        )}
      </Toma>

      {/* TOMA 2 · el estado de resultados */}
      <Toma t={t} a={m('estado')} b={m('tres')}>
        {L.map((l, k) => t >= m(l.n) && (
          <g key={l.txt} opacity={e1(t, m(l.n)) * (foco.length && !foco.includes(k) ? 0.4 : 1)}>
            <Txt f="a" x={440} y={238 + k * 90} textAnchor="end" fontSize={24} fill={c.texto} peso={700}>{l.txt}</Txt>
            <rect x={460} y={210 + k * 90} width={5 * l.v * sm(t, m(l.n), m(l.n) + 0.8)} height={44} rx={10} fill={l.col} />
            <Txt x={470 + 5 * l.v} y={243 + k * 90} fontSize={26} fill={c.texto} peso={800}>{Math.round(l.v)}</Txt>
          </g>
        ))}
        {t >= m('ingresos') && <Txt f="a" x={380} y={190} fontSize={20} fill={c.tenue} opacity={e1(t, m('ingresos'))}>arriba: «top line revenue»</Txt>}
        {ini >= 0 && <Letrero x={600} y={720} texto={['Bajar el costo de adquirir: sube el resultado', 'Vender a la base actual: suben los ingresos', 'Vender más sin agrandar el equipo: bajan los gastos'][ini]} fondo={[VIOLETA, VERDE, AMBAR][ini]} id={ID} tam={22} />}
      </Toma>

      {/* TOMA 3 · los tres estados financieros */}
      <Toma t={t} a={m('tres')} b={m('bolian2')}>
        {(() => { const est = t >= m('flujo') ? 2 : t >= m('resultados2') ? 1 : t >= m('balance') ? 0 : -1; return (
          <g>
            {['Balance general', 'Estado de resultados', 'Flujo de caja'].map((txt, k) => <g key={txt} opacity={e1(t, m('tres') + k * 0.3) * (est >= 0 && est !== k ? 0.4 : 1)}><Letrero x={240 + k * 360} y={190} texto={`${k + 1} · ${txt}`} fondo={[AZUL_M, VERDE, NARANJA][k]} id={ID} tam={24} /></g>)}
            {est === 0 && <g opacity={e1(t, m('balance'))}>
              {t >= m('foto') && <g transform="translate(240 420)"><rect x={-70} y={-46} width={140} height={92} rx={16} fill={PIZARRA} /><circle r={30} fill="#1f2937" /><circle r={18} fill="#60a5fa" /><rect x={30} y={-62} width={30} height={18} rx={6} fill={PIZARRA} /></g>}
              {t >= m('activos') && (() => { const inc = 3 * Math.sin(t * 1.5); return <g opacity={e1(t, m('activos'))} transform={`rotate(${inc} 760 420)`}>
                <rect x={500} y={414} width={520} height={12} rx={6} fill={c.texto} />
                <rect x={520} y={340} width={170} height={74} rx={12} fill={AZUL_M} /><Txt f="a" x={605} y={385} textAnchor="middle" fontSize={22} fill="#fff" peso={700}>Activos</Txt>
                <rect x={810} y={340} width={90} height={74} rx={12} fill={ROJO_M} /><Txt f="a" x={855} y={385} textAnchor="middle" fontSize={18} fill="#fff" peso={700}>Pasivos</Txt>
                <rect x={905} y={340} width={100} height={74} rx={12} fill={VERDE} /><Txt f="a" x={955} y={385} textAnchor="middle" fontSize={16} fill="#fff" peso={700}>Patrimonio</Txt>
              </g>; })()}
              <path d="M 760 426 l -40 120 h 80 Z" fill={PIZARRA} opacity={e1(t, m('activos'))} />
            </g>}
            {est === 1 && <g opacity={e1(t, m('resultados2'))}>
              {t >= m('periodo') && <g>{Array.from({ length: 12 }, (_, k) => <rect key={k} x={220 + k * 66} y={330} width={54} height={54} rx={10} fill={k < 3 ? VERDE : c.panel2} />)}<Txt f="a" x={330} y={420} textAnchor="middle" fontSize={22} fill={c.tenue}>un periodo</Txt></g>}
              <Txt f="a" x={600} y={520} textAnchor="middle" fontSize={26} fill={c.texto}>Ingresos − costo = margen − gastos = resultado</Txt>
              {t >= m('utilidad') && <Letrero x={600} y={600} texto="− impuestos = utilidad neta" fondo={VERDE} id={ID} op={e1(t, m('utilidad'))} tam={24} />}
            </g>}
            {est === 2 && <g opacity={e1(t, m('flujo'))}>
              <rect x={460} y={320} width={280} height={200} rx={24} fill={AMBAR} /><rect x={480} y={340} width={240} height={30} rx={8} fill="#fff" opacity={0.4} />
              {[0, 1, 2].map((k) => { const ph = ((t - m('flujo')) * 0.5 + k / 3) % 1; return <g key={k}><g opacity={Math.min(1, ph * 5, (1 - ph) * 5)}><Moneda3D x={lerp(200, 460, ph)} y={420} r={18} giro={Math.cos(t * 4 + k)} /></g><g opacity={Math.min(1, ph * 5, (1 - ph) * 5) * (t >= m('dinero') ? 1 : 0)}><Moneda3D x={lerp(740, 1000, ph)} y={420} r={18} giro={Math.cos(t * 4 + k)} /></g></g>; })}
              {t >= m('depreciacion') && <Letrero x={600} y={620} texto="Utilidad + D&A − capital de trabajo" fondo={NARANJA} id={ID} op={e1(t, m('depreciacion'))} tam={22} />}
            </g>}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 4 · atarlo a un número */}
      <Toma t={t} a={m('bolian2')} b={fin + 1}>
        <Suelo y={700} isDark={isDark} />
        {t < m('cursos') && <g opacity={1 - ac(t, m('cursos') - 0.4, m('cursos'))}>
          <Equipo id={ID} k="ops" x={300} y={700} s={0.8} t={t} nombre={false} />
          <Persona id={ID} x={900} y={700} s={0.85} cuerpo={PIZARRA} corbata />
          {t >= m('genial') && <Burbuja x={600} y={260} w={440} texto="«Genial. ¿Qué tiene de distinto?»" u={sm(t, m('genial'), m('genial') + 1.2)} c={c} id={ID} lado="der" tam={24} />}
          {t >= m('genial') + 2 && <Txt x={300} y={420} textAnchor="middle" fontSize={80} fill={c.tenue} peso={800}>…</Txt>}
        </g>}
        {t >= m('cursos') && <g opacity={e1(t, m('cursos'))}>
          {[0, 1, 2].map((k) => <rect key={k} x={230 + k * 30} y={560 - k * 50} width={260} height={46} rx={8} fill={[AZUL_M, VERDE, NARANJA][k]} />)}
          <path d="M 330 360 l 90 -40 l 90 40 l -90 40 Z" fill="#1f2937" /><rect x={410} y={380} width={20} height={40} fill="#1f2937" />
          {t >= m('vacias') && (() => { const u = sm(t, m('vacias'), m('vacias') + 1.5); return <g>
            <Txt f="a" x={830} y={360} textAnchor="middle" fontSize={34} fill={c.tenue} opacity={1 - u} textDecoration="line-through">«más eficiente»</Txt>
            <Txt x={830} y={460} textAnchor="middle" fontSize={64} fill={VERDE} peso={800} opacity={u}>+$30.000</Txt>
            <Letrero x={830} y={560} texto="Atado a un número concreto" fondo={VERDE} id={ID} op={u} tam={22} />
          </g>; })()}
        </g>}
      </Toma>
    </Lienzo>
  );
};
