import React from 'react';
import { useEscenaVC, Lienzo, Rotulo, Letrero, Txt, Persona, Visto, e1, sm, ventana, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Las tres palancas de la oferta: un tablero con tres palancas que se bajan una a una.
 * Inevitable: el camino al resultado con piedras (no tengo tiempo, no sé quién es mi cliente, ya lo intenté) que se
 * resuelven por ti, contigo o tú con guía. Rápido: el horizonte difuso se reemplaza por hitos (semana 1, día 30, mes 4).
 * Fácil: «yo te enseño» y «yo te lo monto». Al final cada palanca desarma su objeción y el precio alto se sostiene.
 */

const ID = 'vc16', P = 'vc-constructor-oferta';

export const ConstructorOfertaVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('palancas'), 'Tres palancas'], [m('inevitable'), 'Resultado inevitable'], [m('rapido'), 'Resultado rápido'], [m('facil'), 'Proceso fácil'],
    [m('desarma'), 'Cada palanca desarma una objeción'], [m('alto'), 'Un precio alto, bien sostenido'],
  ];
  const PAL: [string, string, string][] = [['inevitable', 'Inevitable', AZUL_M], ['rapido', 'Rápido', VERDE], ['facil', 'Fácil', NARANJA]];
  const OBJ = [['«No creo en el método»', 'El método'], ['«No creo en ti»', 'En ti'], ['«No creo en mí»', 'En mí']];
  const vI = ventana(t, m('inevitable'), m('rapido'), 0.4), vR = ventana(t, m('rapido'), m('facil'), 0.4), vF = ventana(t, m('facil'), m('desarma'), 0.4);
  const ROCAS: [number, string][] = [[m('fallar'), 'Sin tiempo'], [m('tiempo') + 1.2, '¿Cliente ideal?'], [m('tiempo') + 2.6, 'Ya lo intenté']];
  const FORM: [string, string][] = [['porti', 'Por ti'], ['contigo', 'Contigo'], ['tu', 'Tú con guía']];
  const HITOS: [string, string, string][] = [['semana', 'Semana 1', 'Perfil y oferta'], ['treinta', 'Día 30', 'Conversaciones'], ['cuarto', 'Mes 4', 'Transformación']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Las tres palancas de la oferta">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* tablero de palancas */}
      <g opacity={e1(t, m('palancas'))}>
        <rect x={140} y={140} width={920} height={250} rx={30} fill={c.panel} style={{ filter: `drop-shadow(0 6px 16px rgba(0,0,0,${c.sombra}))` }} />
        {PAL.map(([a, n, col], k) => {
          const x = 300 + k * 300, baja = sm(t, m(a), m(a) + 0.8);
          return (
            <g key={a}>
              <rect x={x - 70} y={230} width={140} height={60} rx={14} fill={c.panel2} />
              <g transform={`rotate(${-35 + 70 * baja} ${x} 260)`}><rect x={x - 7} y={170} width={14} height={90} rx={7} fill={GRIS} /><circle cx={x} cy={166} r={20} fill={t >= m(a) ? col : c.apagado} /></g>
              <Txt x={x} y={350} textAnchor="middle" fontSize={30} fill={t >= m(a) ? col : c.tenue}>{n}</Txt>
            </g>
          );
        })}
      </g>

      {/* inevitable: piedras en el camino y sus formatos */}
      {vI > 0.01 && (
        <g opacity={vI}>
          <rect x={150} y={615} width={900} height={14} rx={7} fill={c.apagado} />
          <Persona id={ID} x={170} y={620} s={0.5} cuerpo={AZUL_M} />
          {t >= m('resultado') && [70, 46, 22].map((r, k) => <circle key={r} cx={1060} cy={560} r={r} fill={k % 2 ? '#fff' : ROSA} opacity={e1(t, m('resultado'))} />)}
          {ROCAS.map(([t0, n], k) => t >= t0 && (
            <g key={n} opacity={e1(t, t0) * (1 - sm(t, m(FORM[k][0]), m(FORM[k][0]) + 0.6))}>
              <path d={`M ${400 + k * 220} 618 q -50 0 -40 -50 q 20 -40 60 -30 q 40 10 30 80 Z`} fill={GRIS} />
              {!movil && <Txt x={410 + k * 220} y={480} textAnchor="middle" fontSize={22} fill={c.tenue}>{n}</Txt>}
            </g>
          ))}
          {FORM.map(([a, n], k) => t >= m(a) && <Letrero key={a} x={410 + k * 220} y={560} texto={n} fondo={AZUL_M} id={ID} op={e1(t, m(a))} tam={24} />)}
          {t >= m('formato') && <Letrero x={600} y={760} texto="Una solución para cada fallo" fondo={AZUL_M} id={ID} op={e1(t, m('formato'))} tam={24} />}
        </g>
      )}

      {/* rápido: del horizonte difuso a los hitos */}
      {vR > 0.01 && (
        <g opacity={vR}>
          {t >= m('difuso') && <g opacity={e1(t, m('difuso')) * (1 - sm(t, m('semana'), m('semana') + 0.8))}>
            <rect x={200} y={540} width={800} height={50} rx={25} fill={GRIS} opacity={0.35 + 0.1 * Math.sin(t * 3)} />
            <Txt x={600} y={576} textAnchor="middle" fontSize={30} fill={c.tenue}>6 a 12 meses</Txt>
          </g>}
          {t >= m('semana') && <rect x={200} y={600} width={800 * sm(t, m('semana'), m('cuarto') + 1)} height={12} rx={6} fill={VERDE} />}
          {HITOS.map(([a, n, d], k) => t >= m(a) && (
            <g key={a} opacity={e1(t, m(a))}>
              <circle cx={260 + k * 340} cy={606} r={26} fill={VERDE} />
              <Txt x={260 + k * 340} y={680} textAnchor="middle" fontSize={30} fill={c.texto}>{n}</Txt>
              {!movil && <Txt x={260 + k * 340} y={530} textAnchor="middle" fontSize={22} fill={c.tenue}>{d}</Txt>}
            </g>
          ))}
        </g>
      )}

      {/* fácil: dos ofertas */}
      {vF > 0.01 && (
        <g opacity={vF}>
          {[['ensenio', 'Yo te enseño', 'Menor costo'], ['monto', 'Yo te lo monto', 'Sin esfuerzo']].map(([a, n, d], k) => t >= m(a) && (
            <g key={a} opacity={e1(t, m(a))} transform={`translate(${380 + k * 440} 0)`}>
              <rect x={-190} y={450} width={380} height={300} rx={26} fill={k ? NARANJA : c.panel} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
              {k === 0 ? <><rect x={-80} y={480} width={160} height={100} rx={8} fill={isDark ? '#1f2937' : '#334155'} /><path d="M -50 540 L -10 510 L 30 530 L 60 500" stroke="#fff" strokeWidth={5} fill="none" /></>
                : <g transform="translate(0 530)"><rect x={-56} y={-30} width={112} height={74} rx={8} fill="#fff" /><rect x={-64} y={-48} width={128} height={24} rx={6} fill="#ffe4d6" /><rect x={-8} y={-48} width={16} height={92} fill={ROSA} /></g>}
              <Txt x={0} y={650} textAnchor="middle" fontSize={32} fill={k ? '#fff' : c.texto}>{n}</Txt>
              {!movil && <Txt x={0} y={700} textAnchor="middle" fontSize={22} fill={k ? '#fff' : c.tenue}>{d}</Txt>}
            </g>
          ))}
        </g>
      )}

      {/* cada palanca desarma una objeción */}
      {t >= m('desarma') && OBJ.map(([n, corto], k) => (
        <g key={n} opacity={e1(t, m('desarma') + 1.6 * k)}>
          <path d={`M ${300 + k * 300} 400 V 470`} stroke={PAL[k][2]} strokeWidth={6} strokeDasharray="8 8" />
          <Letrero x={300 + k * 300} y={520} texto={movil ? corto : n} fondo={PAL[k][2]} id={ID} tam={22} />
          <Visto x={300 + k * 300} y={610} r={24} />
        </g>
      ))}
      {t >= m('alto') && <g opacity={e1(t, m('alto'))} transform={`translate(600 ${740 - 20 * sm(t, m('alto'), m('alto') + 1)})`}>
        <path d="M -150 -40 H 110 L 150 0 L 110 40 H -150 Q -164 40 -164 26 V -26 Q -164 -40 -150 -40 Z" fill={AMBAR} />
        <Txt x={-10} y={10} textAnchor="middle" fontSize={28} fill="#fff">Precio alto</Txt>
      </g>}
    </Lienzo>
  );
};
