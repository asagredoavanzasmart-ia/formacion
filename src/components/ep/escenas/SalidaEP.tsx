import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Contrato, Cruz, Visto, Telefono, Corazon, Cifra, Calendario, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * La salida, una decisión personal.
 * 1 · Una línea de tiempo de 2013: enero (400 millones, rechazada), abril (mil millones en acciones, exigía trasladar al equipo,
 *     se estanca) y Google vuelve: 1150 en efectivo; un calendario de diez días.
 * 2 · Cuatro círculos de prioridad: tú, tu familia, tus empleados y, al final, los inversionistas. Levine: unos 30 millones.
 * 3 · Todo el equipo: opciones para todos, hasta el conserje; un 75 % millonario. En Moovit, llamadas una por una.
 */

const ID = 'ep28', P = 'ep-salida';

export const SalidaEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('reversa'), 'En la oscuridad y en reversa'], [m('enero'), 'Enero de 2013'], [m('abril'), 'Abril'], [m('volvio'), 'Google vuelve'],
    [m('personal'), 'Una decisión personal'], [m('conserje'), 'Todo el equipo'], [m('moovit'), 'Moovit'],
  ];
  const OFERTAS = [{ k: 'cuatrocientos', x: 260, v: '400', sub: 'millones', fin: 'rechazar', col: GRIS }, { k: 'abril', x: 600, v: '1000', sub: 'en acciones', fin: 'estancar', col: VIOLETA }, { k: 'volvio', x: 940, v: '1150', sub: 'en efectivo', fin: 'ok', col: VERDE }];
  const CIRC = [{ n: 'Tú', col: NARANJA }, { n: 'Tu familia', col: ROSA }, { n: 'Tus empleados', col: AZUL_M }, { n: 'Inversionistas', col: GRIS }];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La salida, una decisión personal">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · tres ofertas */}
      <Toma t={t} a={0} b={m('personal')} cy={470}>
        <rect x={140} y={560} width={920} height={10} rx={5} fill={c.apagado} />
        {OFERTAS.map((o) => t >= m(o.k) && (
          <g key={o.k} opacity={e1(t, m(o.k))}>
            <circle cx={o.x} cy={565} r={18} fill={o.col} />
            <Contrato x={o.x} y={380} s={0.75} firma={o.fin === 'ok' ? sm(t, m('efectivo'), m('diez')) : 0} rot={o.fin === 'estancar' ? -4 * Math.sin(t * 2) : 0} />
            <Txt x={o.x} y={640} textAnchor="middle" fontSize={44} fill={o.col}>{o.v}</Txt>
            <Txt f="a" x={o.x} y={680} textAnchor="middle" fontSize={24} fill={c.tenue}>{o.sub}</Txt>
          </g>
        ))}
        {t >= m('rechazaron') && <Cruz x={330} y={300} r={28} op={e1(t, m('rechazaron'))} />}
        {t >= m('menos') && t < m('abril') && <Letrero x={600} y={220} texto="No vender por menos de mil millones" fondo={GRIS} id={ID} op={e1(t, m('menos'))} tam={24} />}
        {t >= m('trasladar') && t < m('volvio') && <Letrero x={600} y={760} texto="Exigía mudar al equipo a Estados Unidos" fondo={VIOLETA} id={ID} op={e1(t, m('trasladar'))} tam={22} />}
        {t >= m('diez') && <g opacity={e1(t, m('diez'))}><Calendario x={940} y={150} s={0.55} marcados={Math.min(10, Math.floor((t - m('diez')) * 5))} /><Letrero x={940} y={760} texto="Cerrada en 10 días" fondo={VERDE} id={ID} tam={24} /></g>}
      </Toma>

      {/* 2 · prioridades */}
      <Toma t={t} a={m('personal')} b={m('conserje')} cy={470}>
        {CIRC.map((p, k) => {
          const r = 90 + k * 75;
          return t >= m('prioridades') && <circle key={p.n} cx={460} cy={460} r={r} fill="none" stroke={p.col} strokeWidth={38} opacity={e1(t, m('tu') + 0.6 * k) * (k === 3 ? 0.5 : 0.85)} />;
        })}
        {CIRC.map((p, k) => t >= m('tu') + 0.6 * k && <Txt key={`t${p.n}`} f="a" x={460} y={460 - (90 + k * 75) + 10} textAnchor="middle" fontSize={k === 0 ? 30 : 24} fill="#fff" opacity={e1(t, m('tu') + 0.6 * k)}>{p.n}</Txt>)}
        {t < m('prioridades') && <Letrero x={460} y={460} texto="99 % personal" id={ID} op={e1(t, m('personal'))} />}
        {t >= m('treinta') && <g opacity={e1(t, m('treinta'))}>
          <Persona id={ID} x={960} y={600} s={0.8} cuerpo={NARANJA} />
          <Txt x={960} y={330} textAnchor="middle" fontSize={56} fill={NARANJA}>~30</Txt>
          <Txt f="a" x={960} y={370} textAnchor="middle" fontSize={24} fill={c.tenue}>millones, menos del 3 %</Txt>
          <Letrero x={960} y={670} texto="Reinvertidos en startups" fondo={VERDE} id={ID} tam={22} />
        </g>}
      </Toma>

      {/* 3 · todo el equipo */}
      <Toma t={t} a={m('conserje')} b={fin + 1} cy={470}>
        {t < m('moovit') ? <g>
          {Array.from({ length: 12 }, (_, k) => {
            const rico = k < 9 && t >= m('setenta');
            return <g key={k}>
              <Persona id={ID} x={180 + (k % 6) * 170} y={420 + Math.floor(k / 6) * 260} s={0.55} cuerpo={k === 11 ? AMBAR : [NARANJA, ROSA, AZUL_M, VERDE, VIOLETA][k % 5]} />
              {rico && <circle cx={180 + (k % 6) * 170} cy={420 + Math.floor(k / 6) * 260 - 130 - 10 * Math.abs(Math.sin(t * 3 + k))} r={14} fill="#fbbf24" opacity={e1(t, m('setenta') + 0.08 * k)} />}
            </g>;
          })}
          <Letrero x={1030} y={720} texto="Incluso el conserje" fondo={AMBAR} id={ID} op={e1(t, m('conserje'))} tam={22} />
          {t >= m('setenta') && <Letrero x={600} y={200} texto="Cerca del 75 % se volvió millonario" id={ID} op={e1(t, m('setenta'))} tam={26} />}
          {t >= m('viudas') && <Letrero x={430} y={790} texto="También las viudas de dos empleados" fondo={GRIS} id={ID} op={e1(t, m('viudas'))} tam={22} />}
        </g> : <g>
          <Persona id={ID} x={300} y={620} s={0.9} cuerpo={VIOLETA} corbata />
          <Telefono x={420} y={420} s={0.5} widgets={0} op={e1(t, m('moovit'))} />
          {t >= m('llamo') && Array.from({ length: 10 }, (_, k) => { const t0 = m('llamo') + 0.35 * k; return t >= t0 && <g key={k} opacity={e1(t, t0)}><Persona id={ID} x={620 + (k % 5) * 110} y={420 + Math.floor(k / 5) * 220} s={0.38} cuerpo={[NARANJA, ROSA, AZUL_M, VERDE, AMBAR][k % 5]} /><Corazon x={620 + (k % 5) * 110} y={300 + Math.floor(k / 5) * 220} s={0.45} /></g>; })}
          <Letrero x={600} y={760} texto="70 ex empleados, uno por uno" id={ID} op={e1(t, m('llamo'))} tam={24} />
        </g>}
      </Toma>
    </Lienzo>
  );
};
