import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Gente, Calendario, Flecha, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Mejor y nuevo.
 * Toma 1: una cadena con un eslabón delgado (Goldratt): la tensión la rompe ahí.
 * Toma 2: tres cañerías en serie (30 % datos → 5 % solicitud → 50 % agenda) con su caudal de puntos; la del 5 % es el
 * cuello. Tres pruebas de +5 puntos: en la primera el resultado sube +17 %, en la última +10 %, en la restricción ×2.
 * Un calendario de cuatro semanas con un experimento por semana.
 * Toma 3: nuevo, en orden: tres escalones (formatos en tu plataforma → nueva plataforma → nuevo canal).
 */

const ID = 'ad27', P = 'ad-mejor';

export const MejorAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('cuello'), 'El cuello de botella'], [m('goldratt'), 'Teoría de restricciones'], [m('embudo'), 'Un embudo de tres etapas'], [m('primero'), '+5 al primer paso'],
    [m('ultimo'), '+5 al último'], [m('restriccion'), '+5 a la restricción'], [m('experimento'), 'Un experimento por semana'], [m('nuevo'), 'Nuevo, en orden'],
  ];
  const ETA: [string, string, number, string][] = [['datos', 'Datos', 30, AZUL_M], ['solicitud', 'Solicitud', 5, ROJO_M], ['agenda', 'Agenda', 50, VIOLETA]];
  // Mejora vigente: 0 ninguna, 1 primer paso, 2 último, 3 restricción.
  const caso = t >= m('restriccion') ? 3 : t >= m('ultimo') ? 2 : t >= m('primero') ? 1 : 0;
  const pct = (k: number) => ETA[k][2] + ((caso === 1 && k === 0) || (caso === 2 && k === 2) || (caso === 3 && k === 1) ? 5 : 0);
  const res = caso === 1 ? '+17 %' : caso === 2 ? '+10 %' : caso === 3 ? '×2' : '';

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Mejor y nuevo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La cadena */}
      <Toma t={t} a={0} b={m('embudo')} cy={470}>
        <g opacity={e1(t, m('cuello') - 0.3)}>
          {Array.from({ length: 6 }, (_, k) => {
            const debil = k === 3;
            const tira = t >= m('eslabon') ? sm(t, m('eslabon'), m('eslabon') + 1) : 0;
            const dx = (k > 3 ? 40 : k < 3 ? -40 : 0) * tira;
            return <ellipse key={k} cx={200 + k * 160 + dx} cy={460} rx={90} ry={debil ? 26 : 50} fill="none" stroke={debil ? ROJO_M : c.texto} strokeWidth={debil ? 8 : 22} opacity={debil ? 1 - 0.7 * tira : 1} />;
          })}
          {t >= m('goldratt') && <Letrero x={600} y={640} texto="El eslabón más débil fija la capacidad" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('goldratt'))} />}
          {t >= m('goldratt') && !movil && <Txt f="a" x={600} y={720} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={e1(t, m('goldratt'))}>Eliyahu Goldratt · teoría de restricciones</Txt>}
        </g>
      </Toma>

      {/* 2 · Las tres cañerías y las tres pruebas */}
      <Toma t={t} a={m('embudo')} b={m('nuevo')} cy={470}>
        <g opacity={e1(t, m('embudo'))}>
          {ETA.map(([n, txt, , col], k) => {
            const x = 250 + k * 330;
            const ancho = 20 + pct(k) * 2.4;
            const foco = (caso === 1 && k === 0) || (caso === 2 && k === 2) || (caso === 3 && k === 1);
            return (
              <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.15}>
                <rect x={x - 140} y={330 - ancho / 2} width={280} height={ancho} rx={ancho / 2} fill={col} opacity={foco ? 1 - 0.05 * Math.sin(t * 6) : 0.85} />
                {Array.from({ length: 4 }, (_, j) => { const ph = ((t * 0.6) + j / 4) % 1; return <circle key={j} cx={x - 140 + 280 * ph} cy={330} r={Math.min(10, ancho / 3)} fill="#fff" opacity={0.7} />; })}
                <Txt x={x} y={240} textAnchor="middle" fontSize={44} fill={col} peso={800}>{pct(k)} %</Txt>
                <Txt f="a" x={x} y={440} textAnchor="middle" fontSize={28} fill={c.texto}>{txt}</Txt>
                {k < 2 && <path d={`M ${x + 145} 330 H ${x + 185}`} stroke={c.apagado} strokeWidth={12} strokeLinecap="round" />}
              </g>
            );
          })}
          {t >= m('solicitud') && caso === 0 && <Letrero x={580} y={520} texto="Aquí se cae más gente" fondo={ROJO_M} id={ID} tam={26} op={e1(t, m('solicitud') + 0.5)} />}
          {caso > 0 && (
            <g>
              <rect x={380} y={520} width={440} height={140} rx={28} fill={caso === 3 ? VERDE : c.panel} style={sombra(c.sombra, 4, 10)} />
              <Txt x={600} y={612} textAnchor="middle" fontSize={64} fill={caso === 3 ? '#fff' : c.texto} peso={800}>{res}</Txt>
            </g>
          )}
          {t >= m('experimento') && (
            <g opacity={e1(t, m('experimento'))}>
              {[0, 1, 2, 3].map((k) => <g key={k}><rect x={330 + k * 140} y={700} width={120} height={90} rx={16} fill={k < 1 + ((t - m('experimento')) * 1.5) % 4 ? ROJO_M : c.panel} style={sombra(c.sombra, 2, 6)} /><Txt x={390 + k * 140} y={758} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>S{k + 1}</Txt></g>)}
            </g>
          )}
        </g>
      </Toma>

      {/* 3 · Nuevo, en orden */}
      <Toma t={t} a={m('nuevo')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('nuevo'))}>
          {([['ubicaciones', 'Nuevos formatos', AZUL_M], ['plataforma', 'Nueva plataforma', VIOLETA], ['canal', 'Nuevo canal', NARANJA]] as const).map(([n, txt, col], k) => (
            <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.2}>
              <rect x={170 + k * 300} y={700 - (150 + k * 130)} width={260} height={150 + k * 130} rx={20} fill={col} />
              <rect x={300 + k * 300} y={700 - (150 + k * 130)} width={130} height={150 + k * 130} rx={20} fill="#000" opacity={0.1} />
              <Txt x={300 + k * 300} y={700 - (150 + k * 130) + 70} textAnchor="middle" fontSize={56} fill="#fff" peso={800}>{k + 1}</Txt>
              <Letrero x={300 + k * 300} y={760} texto={txt} fondo={col} id={ID} tam={26} />
            </g>
          ))}
        </g>
      </Toma>
    </Lienzo>
  );
};
