import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Brujula, Duna, Bidon, Escalon, Corazon, Pin, Fajo, Flujo, Visto, tono, e1, sm, lerp, enRuta, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Síntesis: el problema es la brújula.
 * 1 · La brújula grande apunta al problema.
 * 2 · Un solo camino que se recorre con la persona: el desierto, los intentos rápidos, la escalera de fases, el tanque lleno,
 *     el equipo (ADN), el usuario nuevo y, al final, la meta con dinero, crecimiento y mundo como consecuencia.
 * 3 · El pedido: quien aprendió acompaña a otra persona que empieza; la próxima vez es ahora.
 */

const ID = 'ep30', P = 'ep-sintesis';

export const SintesisEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('brujula'), 'El problema es la brújula'], [m('desierto'), 'Cruzar el desierto'], [m('pronto'), 'Fracasar pronto'], [m('fases'), 'Una fase a la vez'],
    [m('tanque'), 'Llenar el tanque'], [m('adn'), 'Cuidar el ADN'], [m('primera'), 'Observar al usuario nuevo'], [m('consecuencia'), 'La consecuencia'],
    [m('pedido'), 'Un pedido'], [m('ahora'), 'La próxima vez es ahora'],
  ];
  const RUTA: [number, number][] = [[120, 640], [300, 640], [470, 560], [640, 640], [800, 520], [960, 600], [1100, 460]];
  const PARADAS = ['desierto', 'pronto', 'fases', 'tanque', 'adn', 'primera', 'consecuencia'];
  let k = -1; PARADAS.forEach((p, i) => { if (t >= m(p)) k = i; });
  const u = k < 0 ? 0 : (k + sm(t, m(PARADAS[k]), m(PARADAS[k]) + 1.2)) / PARADAS.length;
  const [px, py] = enRuta(RUTA, Math.min(1, u));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El problema es la brújula">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la brújula */}
      <Toma t={t} a={0} b={m('desierto')} cy={460}>
        <Brujula x={600} y={430} r={180} ang={30 * Math.sin(t * 2) * Math.exp(-t * 0.5)} id={ID} />
        <Letrero x={600} y={720} texto="Problema" id={ID} op={e1(t, m('brujula'))} />
      </Toma>

      {/* 2 · el viaje completo */}
      <Toma t={t} a={m('desierto')} b={m('pedido')} cy={470}>
        <polyline points={RUTA.map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke={c.apagado} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 26" />
        {/* hitos */}
        {t >= m('desierto') && <g opacity={e1(t, m('desierto'))}><Duna x0={160} x1={420} y={620} h={50} /><circle cx={260} cy={440} r={30} fill="#fbbf24" /></g>}
        {t >= m('pronto') && <g opacity={e1(t, m('pronto'))}>{[0, 1, 2, 3, 4].map((j) => <circle key={j} cx={400 + j * 32} cy={460} r={11} fill={NARANJA} />)}</g>}
        {t >= m('fases') && <g opacity={e1(t, m('fases'))}>{[0, 1, 2].map((j) => <Escalon key={j} x={560 + j * 50} y={600} w={46} h={40 + j * 40} color={[NARANJA, ROSA, VIOLETA][j]} />)}</g>}
        {t >= m('tanque') && <Bidon x={800} y={470} s={0.6} nivel={sm(t, m('tanque'), m('tanque') + 1)} op={e1(t, m('tanque'))} />}
        {t >= m('adn') && <g opacity={e1(t, m('adn'))}>{[0, 1, 2].map((j) => <Persona key={j} id={ID} x={880 + j * 40} y={460} s={0.22} cuerpo={[NARANJA, ROSA, AZUL_M][j]} />)}</g>}
        {t >= m('primera') && <Corazon x={980} y={340} s={0.7} op={e1(t, m('primera'))} />}
        {t >= m('consecuencia') && <g opacity={e1(t, m('consecuencia'))}>
          <Pin x={1100} y={450} s={1.4} color={VERDE} />
          <Fajo x={1060} y={300} n={4} w={80} />
          <Letrero x={1000} y={200} texto="Dinero, crecimiento, mundo" fondo={VERDE} id={ID} tam={22} />
        </g>}
        <Persona id={ID} x={px} y={py - 4 * Math.abs(Math.sin(t * 6))} s={0.45} cuerpo={NARANJA} />
        <Brujula x={140} y={250} r={60} ang={20} id={ID} />
      </Toma>

      {/* 3 · el pedido */}
      <Toma t={t} a={m('pedido')} b={fin + 1} cy={470}>
        <Persona id={ID} x={420} y={640} s={1} cuerpo={NARANJA} />
        <Persona id={ID} x={lerp(900, 760, sm(t, m('mentor'), m('mentor') + 1.4))} y={640} s={0.8} cuerpo={AZUL_M} />
        {t >= m('mentor') && <g>
          <Brujula x={lerp(500, 690, sm(t, m('mentor') + 0.6, m('mentor') + 2))} y={430} r={50} ang={0} id={ID} />
          <Letrero x={590} y={720} texto="Enséñalo y acompaña" id={ID} op={e1(t, m('mentor') + 0.6)} />
        </g>}
        {t >= m('ahora') && <g opacity={e1(t, m('ahora'))}><Visto x={600} y={230} r={40} /><Letrero x={600} y={320} texto="La próxima vez es ahora" fondo={VERDE} id={ID} /></g>}
      </Toma>
    </Lienzo>
  );
};
