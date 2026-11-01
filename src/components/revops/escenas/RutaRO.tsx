import React from 'react';
import { useMovil, Lienzo, useEscena, Toma, Letrero, Persona, Rotulo, Txt, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «La ruta: diez lecciones», en tres tomas sobre un mismo camino.
 * 1 · El tablero del plan propio, vacío: diez casillas que se llenan con una pieza por lección.
 * 2 · Primera mitad del camino: lecciones 1 a 5; quien recorre llega a cada parada al nombrarla y la pieza
 *     que construye sube al tablero.
 * 3 · Segunda mitad (sistemas y equipo): lecciones 6 a 10, hasta el plan completo.
 */

const ID = 'ro04';
const nombres = ['diez', 'plan', 'pieza', 'completo', 'l1', 'c1', 'l2', 'c2', 'l3', 'c3', 'l4', 'c4', 'l5', 'c5', 'mitad', 'l6', 'c6', 'l7', 'c7', 'l8', 'c8', 'l9', 'c9', 'l10', 'c10', 'pregunta'] as const;
type N = typeof nombres[number];

const LECCIONES = [
  { tema: 'Bienvenida', pieza: 'Mapa de RevOps', color: NARANJA },
  { tema: 'Introducción', pieza: 'Diagnóstico', color: ROSA },
  { tema: 'Flywheel', pieza: 'Tu flywheel', color: AMBAR },
  { tema: 'SLA', pieza: 'Tu SLA', color: VIOLETA },
  { tema: 'Proceso', pieza: 'Proceso depurado', color: AZUL_M },
  { tema: 'Sistemas', pieza: 'Diccionario', color: TEAL },
  { tema: 'Comunicar', pieza: 'Propuesta', color: NARANJA },
  { tema: 'Estructura', pieza: 'Organigrama', color: ROSA },
  { tema: 'Contratar', pieza: 'Pauta', color: VERDE },
  { tema: 'Evaluar', pieza: 'Plan anual', color: VIOLETA },
];

export const RutaRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);
  const movil = useMovil();
  const L = (k: number) => m(`l${k + 1}` as N);
  const C = (k: number) => m(`c${k + 1}` as N);

  const rotulos: [number, string][] = [
    [0.2, 'Diez lecciones'], [m('plan'), 'Un plan propio'], [m('pieza'), 'Una pieza por lección'],
    ...LECCIONES.map((l, k) => [L(k), `Lección ${k + 1} · ${l.tema}`] as [number, string]),
    [m('mitad'), 'Sistemas y equipo'],
  ];

  /* paradas del camino: cinco por mitad, en zigzag */
  const parada = (k: number): [number, number] => { const j = k % 5; return [170 + j * 215, j % 2 ? 560 : 660]; };
  let actual = -1; LECCIONES.forEach((_, k) => { if (t >= L(k)) actual = k; });
  const desde = actual <= 0 || actual === 5 ? null : parada(actual - 1);
  const hasta = actual < 0 ? parada(0) : parada(actual);
  const u = actual < 0 ? 0 : sm(t, L(actual), L(actual) + 1.2);
  const [px, py] = desde ? [lerp(desde[0], hasta[0], u), lerp(desde[1], hasta[1], u)] : [lerp(hasta[0] - 120, hasta[0], u), hasta[1]];

  /* casillas del tablero (arriba) */
  const casilla = (k: number): [number, number] => [150 + k * 100, 230];
  const camino = (de: number) => Array.from({ length: 5 }, (_, j) => parada(de + j)).map(([x, y]) => `${x},${y}`).join(' ');

  const Parada = ({ k }: { k: number }) => {
    const [x, y] = parada(k);
    const on = t >= L(k);
    const l = LECCIONES[k];
    return (
      <g>
        <ellipse cx={x} cy={y + 8} rx={56} ry={16} fill="#000" opacity={0.12} />
        <ellipse cx={x} cy={y} rx={56} ry={16} fill={on ? l.color : c.apagado} />
        <Txt x={x} y={y - 26} textAnchor="middle" fontSize={34} fill={on ? l.color : c.tenue} peso={800}>{k + 1}</Txt>
        {on && (!movil || k === actual) && <Letrero x={x} y={y + (k % 2 ? -120 : 70)} texto={l.tema} fondo={l.color} id={ID} op={e1(t, L(k))} tam={24} />}
      </g>
    );
  };

  /* pieza que vuela de la parada al tablero */
  const Pieza = ({ k }: { k: number }) => {
    if (t < C(k)) return null;
    const v = sm(t, C(k), C(k) + 1.2);
    const [x0, y0] = parada(k), [x1, y1] = casilla(k);
    const x = lerp(x0, x1, v), y = lerp(y0 - 60, y1, v) - 80 * Math.sin(Math.PI * v);
    return (
      <g transform={`translate(${x} ${y}) scale(${lerp(1.3, 1, v)})`}>
        <path d="M -34 -34 H -10 Q -10 -46 0 -46 Q 10 -46 10 -34 H 34 V -10 Q 46 -10 46 0 Q 46 10 34 10 V 34 H -34 Z" fill={LECCIONES[k].color} style={sombra(0.22, 3, 6)} />
        <Txt x={0} y={10} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>{k + 1}</Txt>
      </g>
    );
  };

  /* nombre de la pieza que se está construyendo */
  let ultima = -1; LECCIONES.forEach((_, k) => { if (t >= C(k)) ultima = k; });
  const completo = sm(t, m('completo'), m('completo') + 1) * (1 - ac(t, m('l1') - 0.3, m('l1'))) + sm(t, C(9) + 1.4, C(9) + 2.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La ruta: diez lecciones, un plan propio">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* el tablero del plan, siempre arriba */}
      {t >= m('plan') && (
        <g opacity={e1(t, m('plan'))}>
          <rect x={90} y={160} width={1020} height={140} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          {LECCIONES.map((_, k) => { const [x, y] = casilla(k); return <rect key={k} x={x - 38} y={y - 38} width={76} height={76} rx={14} fill={c.panel2} />; })}
          {completo > 0.01 && <rect x={90} y={160} width={1020} height={140} rx={24} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={8} opacity={Math.min(1, completo)} />}
        </g>
      )}
      {t >= m('pieza') && t < m('l1') && (() => {
        const v = sm(t, m('pieza'), m('pieza') + 1.2);
        return <g opacity={1 - ac(t, m('l1') - 0.4, m('l1'))} transform={`translate(${lerp(600, 150, v)} ${lerp(470, 230, v)})`}><path d="M -34 -34 H -10 Q -10 -46 0 -46 Q 10 -46 10 -34 H 34 V -10 Q 46 -10 46 0 Q 46 10 34 10 V 34 H -34 Z" fill={NARANJA} /></g>;
      })()}
      {t >= m('diez') && t < m('l1') && (
        <g opacity={e1(t, m('diez')) * (1 - ac(t, m('l1') - 0.4, m('l1')))}>
          <Txt x={600} y={560} textAnchor="middle" fontSize={140} fill={`url(#${ID}-marcaH)`} peso={800}>10</Txt>
          <Txt f="a" x={600} y={620} textAnchor="middle" fontSize={30} fill={c.tenue}>lecciones</Txt>
          {completo > 0.2 && <Letrero x={600} y={720} texto="Un plan completo" id={ID} op={completo} />}
        </g>
      )}
      {LECCIONES.map((_, k) => <Pieza key={k} k={k} />)}

      {/* TOMA 2 · lecciones 1 a 5 */}
      <Toma t={t} a={m('l1')} b={m('mitad')} cy={600}>
        <polyline points={camino(0)} fill="none" stroke={c.apagado} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 26" />
        {[0, 1, 2, 3, 4].map((k) => <Parada key={k} k={k} />)}
        {actual >= 0 && actual < 5 && <Persona id={ID} x={px} y={py - 4 - 6 * Math.abs(Math.sin(t * 6))} s={0.5} cuerpo={VIOLETA} />}
      </Toma>

      {/* TOMA 3 · lecciones 6 a 10 */}
      <Toma t={t} a={m('mitad')} b={fin + 1} cy={600}>
        <polyline points={camino(5)} fill="none" stroke={c.apagado} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 26" />
        {[5, 6, 7, 8, 9].map((k) => <Parada key={k} k={k} />)}
        {actual >= 5 && <Persona id={ID} x={px} y={py - 4 - 6 * Math.abs(Math.sin(t * 6))} s={0.5} cuerpo={VIOLETA} />}
        {t >= m('mitad') && actual < 5 && <Letrero x={600} y={440} texto="Sistemas y equipo" fondo={PIZARRA} id={ID} op={e1(t, m('mitad'))} />}
      </Toma>

      {ultima >= 0 && t >= m('l1') && (
        <Letrero x={600} y={820} texto={`Construyes: ${LECCIONES[ultima].pieza}`} fondo={LECCIONES[ultima].color} id={ID} op={e1(t, C(ultima))} />
      )}
    </Lienzo>
  );
};
