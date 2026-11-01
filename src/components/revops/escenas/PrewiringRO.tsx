import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Cruz, Visto, Rotulo, Persona, Txt, Corazon, Calendario, Burbuja, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Honestidad, aliados y pre-wiring», en tres tomas.
 * 1 · Presentar en frío ante la directiva: el cambio pide renunciar a algo concreto a cambio de una promesa
 *     (la balanza se inclina hacia la pérdida) y una sola duda se contagia por la mesa.
 * 2 · Cuatro pasos antes de la reunión grupal: ser honesto (culpar te vuelve blanco), nombrar la pérdida, buscar
 *     aliados y el pre-wiring: reuniones a solas, aliados primero, opositores después.
 * 3 · Rasiel: nada de sorpresas el día de la presentación; un ejecutivo convencido te abre agendas.
 */

const ID = 'ro40';
const nombres = ['frio', 'heifetz', 'renunciar', 'posibilidad', 'perdida', 'resistencia', 'duda', 'contagien', 'cuatro', 'honesto', 'culpar', 'nombra', 'sacrificar', 'costo', 'aliados', 'solo', 'prewiring', 'separado', 'opositores', 'planificar', 'rasiel', 'sorpresas', 'ventaja', 'agenda', 'pregunta'] as const;
type N = typeof nombres[number];

export const PrewiringRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Presentar en frío'], [m('renunciar'), 'Una pérdida por una promesa'], [m('duda'), 'Una duda se contagia'],
    [m('cuatro'), 'Cuatro pasos antes'], [m('honesto'), '1 · Sé honesto'], [m('nombra'), '2 · Nombra la pérdida'], [m('aliados'), '3 · Busca aliados'], [m('prewiring'), '4 · Pre-wiring'],
    [m('rasiel'), 'Sin sorpresas'],
  ];

  const MESA = [260, 420, 580, 740, 900];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Honestidad, aliados y pre-wiring">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · presentar en frío */}
      <Toma t={t} a={-1} b={m('cuatro')} zi={1}>
        {t < m('duda') && (() => { const inc = lerp(0, 12, sm(t, m('perdida'), m('perdida') + 1.2)); return (
          <g opacity={1 - ac(t, m('duda') - 0.4, m('duda'))}>
            <Equipo id={ID} k="ops" x={200} y={700} s={0.8} t={t} nombre={false} />
            {Array.from({ length: 8 }, (_, k) => { const ph = (t * 0.3 + k / 8) % 1; return <g key={k} transform={`translate(${120 + (k * 37) % 180} ${lerp(260, 640, ph)}) rotate(${t * 40 + k * 20})`} opacity={(1 - ph) * e1(t, m('frio'))}>{[0, 60, 120].map((a) => <rect key={a} x={-1.5} y={-8} width={3} height={16} rx={1.5} fill="#7dd3fc" transform={`rotate(${a})`} />)}</g>; })}
            {t >= m('frio') && <Letrero x={200} y={760} texto="En frío" fondo={AZUL_M} id={ID} tam={22} />}
            {t >= m('renunciar') && <g opacity={e1(t, m('renunciar'))} transform={`rotate(${inc} 720 330)`}>
              <rect x={460} y={322} width={520} height={14} rx={7} fill={c.texto} />
              <g transform="translate(520 336)"><path d="M -60 0 L -80 110 H 80 L 60 0 Z" fill={ROJO_M} opacity={0.85} /><Txt f="a" x={0} y={84} textAnchor="middle" fontSize={20} fill="#fff" peso={700}>Hábitos</Txt></g>
              {t >= m('posibilidad') && <g transform="translate(920 336)"><path d="M -60 0 L -80 110 H 80 L 60 0 Z" fill="#94a3b8" opacity={0.6} /><path d="M -40 80 q 0 -30 30 -24 q 10 -22 34 -6 q 26 -2 18 30 Z" fill="#fff" opacity={0.85} /><Txt f="a" x={0} y={140} textAnchor="middle" fontSize={20} fill={c.tenue}>una promesa</Txt></g>}
            </g>}
            <path d="M 720 336 l -36 300 h 72 Z" fill={PIZARRA} opacity={e1(t, m('renunciar'))} />
            {t >= m('resistencia') && <Letrero x={720} y={720} texto="La resistencia es natural" fondo={ROJO_M} id={ID} op={e1(t, m('resistencia'))} tam={22} />}
          </g>
        ); })()}
        {t >= m('duda') && (
          <g opacity={e1(t, m('duda'))}>
            <rect x={180} y={560} width={840} height={30} rx={12} fill={isDark ? '#6b4f3a' : '#a16207'} />
            {MESA.map((x, k) => { const con = k === 2 ? t >= m('duda') : t >= m('contagien') + Math.abs(k - 2) * 0.6; return <g key={k}><Persona id={ID} x={x} y={560} s={0.5} cuerpo={k === 2 ? PIZARRA : '#94a3b8'} corbata />{con && <Txt x={x + 30} y={420} fontSize={56} fill={ROJO_M} peso={800} opacity={e1(t, k === 2 ? m('duda') : m('contagien') + Math.abs(k - 2) * 0.6)}>?</Txt>}</g>; })}
            <Letrero x={600} y={700} texto="Una sola duda basta para contagiar la sala" fondo={ROJO_M} id={ID} tam={22} />
          </g>
        )}
      </Toma>

      {/* TOMA 2 · los cuatro pasos */}
      <Toma t={t} a={m('cuatro')} b={m('rasiel')}>
        {(() => {
          const paso = t >= m('prewiring') ? 3 : t >= m('aliados') ? 2 : t >= m('nombra') ? 1 : t >= m('honesto') ? 0 : -1;
          return (
            <g>
              {['Sé honesto', 'Nombra la pérdida', 'Busca aliados', 'Pre-wiring'].map((txt, k) => <g key={txt} opacity={e1(t, m('cuatro') + k * 0.25) * (paso >= 0 && paso !== k ? 0.4 : 1)}><Letrero x={190 + k * 275} y={170} texto={`${k + 1} · ${txt}`} fondo={[AZUL_M, ROSA, VERDE, NARANJA][k]} id={ID} tam={22} /></g>)}
              <Suelo y={700} isDark={isDark} />
              {paso === 0 && <g opacity={e1(t, m('honesto'))}>
                <Equipo id={ID} k="ops" x={420} y={700} s={0.8} t={t} nombre={false} />
                <rect x={620} y={380} width={160} height={260} rx={70} fill="#bfdbfe" opacity={0.5} /><Equipo id={ID} k="ops" x={700} y={620} s={0.55} t={t} nombre={false} distintivo={false} op={0.6} />
                {t >= m('culpar') && <g opacity={e1(t, m('culpar'))} transform="translate(980 440)">{[60, 40, 20].map((r, j) => <circle key={r} r={r} fill={j % 2 ? '#fff' : ROJO_M} />)}<Letrero x={0} y={110} texto="Culpar te vuelve blanco" fondo={ROJO_M} id={ID} tam={20} /></g>}
              </g>}
              {paso === 1 && <g opacity={e1(t, m('nombra'))}>
                <Equipo id={ID} k="ops" x={360} y={700} s={0.8} t={t} nombre={false} />
                {[0, 1].map((k) => <Persona key={k} id={ID} x={760 + k * 160} y={700} s={0.7} cuerpo={[AMBAR, TEAL][k]} />)}
                {t >= m('sacrificar') && <Corazon x={640} y={420 - 5 * Math.sin(t * 4)} s={0.9} />}
                {t >= m('costo') && <Burbuja x={150} y={230} w={500} texto="«Sé cuánto les costó crear estos procesos»" u={sm(t, m('costo'), m('costo') + 1.4)} c={c} id={ID} tam={22} />}
              </g>}
              {paso === 2 && <g opacity={e1(t, m('aliados'))}>
                {(() => { const u = ((t - m('aliados')) * 0.12) % 1; const x = lerp(180, 1000, u); return <g>
                  <path d="M 100 700 Q 600 640 1100 700" stroke={c.apagado} strokeWidth={10} fill="none" />
                  <Equipo id={ID} k="ops" x={x} y={694} s={0.6} t={t} nombre={false} />
                  {t >= m('solo') && [1, 2].map((k) => <Persona key={k} id={ID} x={x - k * 90} y={694} s={0.55} cuerpo={[VERDE, AZUL_M][k - 1]} />)}
                </g>; })()}
                {t >= m('solo') && <Letrero x={600} y={400} texto="Nadie camina solo por terreno político" fondo={VERDE} id={ID} op={e1(t, m('solo'))} tam={22} />}
              </g>}
              {paso === 3 && <g opacity={e1(t, m('prewiring'))}>
                <Equipo id={ID} k="ops" x={160} y={700} s={0.7} t={t} nombre={false} />
                {[0, 1, 2, 3].map((k) => { const op = k >= 2; const t0 = op ? m('opositores') : m('separado'); const vis = t >= t0 + (k % 2) * 0.6; return <g key={k} opacity={vis ? e1(t, t0 + (k % 2) * 0.6) : 0.3}>
                  <Persona id={ID} x={380 + k * 180} y={560} s={0.5} cuerpo={op ? ROJO_M : VERDE} corbata />
                  <Calendario x={380 + k * 180} y={330} s={0.45} marcados={vis ? 1 : 0} />
                  {vis && <Visto x={380 + k * 180} y={415} r={18} />}
                </g>; })}
                <Letrero x={560} y={640} texto="Aliados primero" fondo={VERDE} id={ID} op={e1(t, m('separado'))} tam={20} />
                {t >= m('opositores') && <Letrero x={920} y={640} texto="Opositores después" fondo={ROJO_M} id={ID} op={e1(t, m('opositores'))} tam={20} />}
                {t >= m('planificar') && <Letrero x={650} y={760} texto="En grupo: planificar cómo, no debatir si" id={ID} op={e1(t, m('planificar'))} tam={22} />}
              </g>}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 3 · sin sorpresas */}
      <Toma t={t} a={m('rasiel')} b={fin + 1}>
        <Suelo y={700} isDark={isDark} />
        {t >= m('sorpresas') && <g opacity={e1(t, m('sorpresas'))} transform="translate(360 470)">
          <rect x={-90} y={-60} width={180} height={140} rx={14} fill={ROSA} /><rect x={-100} y={-80} width={200} height={40} rx={10} fill="#be123c" /><rect x={-14} y={-80} width={28} height={160} fill={AMBAR} />
          <Cruz x={110} y={-90} r={30} />
          <Letrero x={0} y={140} texto="Nada de sorpresas" fondo={PIZARRA} id={ID} tam={22} />
        </g>}
        {t >= m('ventaja') && <g opacity={e1(t, m('ventaja'))}>
          <Persona id={ID} x={760} y={700} s={0.75} cuerpo={VERDE} corbata />
          <rect x={940} y={400} width={140} height={300} rx={8} fill={isDark ? '#6b4f3a' : '#a16207'} />
          <rect x={940} y={400} width={140 * (1 - 0.6 * sm(t, m('agenda'), m('agenda') + 1))} height={300} rx={8} fill={isDark ? '#8b6b52' : '#ca8a04'} />
          {t >= m('agenda') && <Letrero x={880} y={760} texto="Te abre agendas a las que no llegas" fondo={VERDE} id={ID} tam={20} />}
        </g>}
      </Toma>
    </Lienzo>
  );
};
