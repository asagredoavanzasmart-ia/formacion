import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Mochila, Caja, Engranaje, Hoja, Burbuja, Colinas, Suelo, Flecha, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Restar obstáculos (La meta, de Goldratt).
 * Toma 1: el sendero con la fila de scouts y Herbie, el más lento, con una mochila enorme; Alex lo pone adelante, ordena la
 * fila y reparte su carga: el grupo avanza junto y más rápido.
 * Toma 2: la planta con cuatro máquinas en línea; delante de una se acumula el trabajo: el cuello de botella.
 * Toma 3: tres pasos: la meta (borrador el jueves a las 14:00), la lista de obstáculos donde una roca —la perfección— bloquea
 * a las demás, y quitarla; si el obstáculo es otra persona, preguntarle qué la frena.
 */

const ID = 'es20', P = 'es-restar';

export const RestarES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('meta'), 'La meta, de Goldratt'], [m('scouts'), 'Una excursión'], [m('herbie'), 'Herbie, el más lento'], [m('adelante'), 'Herbie adelante'],
    [m('mochila'), 'Repartir su carga'], [m('acelera'), 'Todo el grupo acelera'], [m('maquina'), 'El cuello de botella'], [m('pasos'), 'Tres pasos'],
    [m('perfecto'), 'Terminado > perfecto'], [m('persona'), '¿Qué te frena?'],
  ];
  const ordena = sm(t, m('adelante'), m('adelante') + 1.6);
  const reparte = sm(t, m('mochila'), m('mochila') + 1.5);
  const marcha = t >= m('acelera') ? (t - m('acelera')) * 60 : 0;
  const quita = sm(t, m('perfecto') - 0.3, m('perfecto') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Restar obstáculos">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Herbie y la fila de scouts */}
      <Toma t={t} a={0} b={m('maquina')} cy={480}>
        <Colinas y={560} isDark={isDark} t={t} />
        <rect x={0} y={700} width={1200} height={50} fill={isDark ? '#57534e' : '#d6b48a'} />
        {Array.from({ length: 12 }, (_, k) => <rect key={k} x={((k * 110 - marcha) % 1320 + 1320) % 1320 - 60} y={720} width={50} height={8} rx={4} fill={isDark ? '#78716c' : '#b08968'} />)}
        {t >= m('planta') && t < m('scouts') && <Txt f="a" x={600} y={300} textAnchor="middle" fontSize={30} fill={c.texto}>Tres meses para salvar una planta</Txt>}
        {[0, 1, 2, 3, 4].map((k) => {
          const herbie = k === 4;
          const xIni = herbie ? 120 : 360 + k * 180;
          const xFin = herbie ? 1000 : 900 - (k + 1) * 150;
          const x = lerp(xIni, xFin, ordena) + Math.sin(t * 5 + k) * 3;
          const carga = herbie ? lerp(1.4, 0.5, reparte) : lerp(0.5, 0.75, reparte);
          return (
            <g key={k} opacity={e1(t, m('scouts') + 0.15 * k)}>
              <Mochila x={x - 34} y={680} carga={carga} color={herbie ? '#b45309' : '#16a34a'} />
              <Persona id={ID} x={x} y={720} s={0.62} cuerpo={herbie ? ROSA : AZUL_M} ojos={herbie && reparte < 0.5 ? 0.4 : 1} />
              {herbie && t >= m('herbie') && <Txt x={x} y={560} textAnchor="middle" fontSize={28} fill={c.texto}>Herbie</Txt>}
            </g>
          );
        })}
        <g opacity={e1(t, m('scouts'))}><Persona id={ID} x={lerp(220, 1100, ordena)} y={720} s={1} cuerpo="#15803d" /><Txt x={lerp(220, 1100, ordena)} y={500} textAnchor="middle" fontSize={26} fill={c.texto}>Alex</Txt></g>
        {t >= m('mochila') && reparte < 1 && [0, 1, 2].map((k) => { const u = sm(t, m('mochila') + 0.4 * k, m('mochila') + 0.4 * k + 0.8); return <Caja key={k} x={lerp(966, 750 - k * 150, u)} y={lerp(600, 600, u) - 70 * Math.sin(Math.PI * u)} w={34} h={26} op={1 - u} />; })}
        {t >= m('acelera') && <Letrero x={600} y={300} texto="Mejora Herbie y acelera todo el grupo" fondo={VERDE} id={ID} tam={28} op={e1(t, m('acelera'))} />}
      </Toma>

      {/* 2 · el cuello de botella en la planta */}
      <Toma t={t} a={m('maquina')} b={m('pasos')} cy={480}>
        <Suelo y={660} isDark={isDark} x0={80} x1={1120} />
        <rect x={100} y={600} width={1000} height={24} rx={12} fill="#475569" opacity={e1(t, m('maquina'))} />
        {[0, 1, 2, 3].map((k) => {
          const cuello = k === 2;
          const x = 220 + k * 260;
          return (
            <g key={k} opacity={e1(t, m('maquina') + 0.15 * k)}>
              <rect x={x - 70} y={420} width={140} height={180} rx={16} fill={cuello ? ROJO_M : '#64748b'} />
              <Engranaje x={x} y={500} r={38} t={t * (cuello ? 0.6 : 2.4)} color="#cbd5e1" hueco={cuello ? ROJO_M : '#64748b'} />
              {Array.from({ length: cuello ? 7 : 1 }, (_, j) => <Caja key={j} x={x - 110} y={600 - j * 34} w={44} h={30} />)}
            </g>
          );
        })}
        {t >= m('restricciones') && <Letrero x={740} y={300} texto="Teoría de las restricciones" id={ID} tam={28} op={e1(t, m('restricciones'))} />}
        {!movil && t >= m('restricciones') && <Txt f="a" x={600} y={720} textAnchor="middle" fontSize={24} fill={c.tenue}>Mejorar otra máquina no cambia nada</Txt>}
      </Toma>

      {/* 3 · tres pasos */}
      <Toma t={t} a={m('pasos')} b={fin + 1} cy={480}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        <g opacity={e1(t, m('jueves'))}>
          <Hoja x={1010} y={440} w={150} h={190} lineas={6} />
          <Letrero x={1010} y={290} texto="Jueves, 14:00" fondo={VERDE} id={ID} tam={26} />
        </g>
        <Persona id={ID} x={lerp(180, 860, sm(t, m('perfecto') + 0.5, m('perfecto') + 3))} y={720} s={1} cuerpo={NARANJA} />
        {t >= m('obstaculos') && [0, 1, 2, 3].map((k) => {
          const roca = k === 0;
          const fuera = roca ? quita : sm(t, m('perfecto') + 0.4 + 0.2 * k, m('perfecto') + 0.9 + 0.2 * k);
          const x = 420 + k * 120;
          return (
            <g key={k} opacity={e1(t, m('obstaculos') + 0.2 * k) * (1 - fuera)} transform={`translate(${roca ? -fuera * 200 : 0} ${roca ? 0 : -fuera * 60})`}>
              <path d={`M ${x - (roca ? 90 : 40)} 720 Q ${x - (roca ? 80 : 36)} ${720 - (roca ? 170 : 70)} ${x} ${720 - (roca ? 190 : 80)} Q ${x + (roca ? 90 : 40)} ${720 - (roca ? 150 : 60)} ${x + (roca ? 90 : 40)} 720 Z`} fill={roca ? '#78716c' : '#a8a29e'} />
              {roca && <Txt x={x} y={640} textAnchor="middle" fontSize={26} fill="#fff">Perfección</Txt>}
            </g>
          );
        })}
        {t >= m('perfecto') && <Letrero x={600} y={300} texto="Terminado es mejor que perfecto" id={ID} tam={30} op={e1(t, m('perfecto'))} />}
        {t >= m('persona') && <Burbuja x={860} y={540} w={320} lado="der" texto="¿Qué te está frenando?" u={sm(t, m('persona'), m('persona') + 1)} c={c} id={ID} tam={28} marca />}
        {t >= m('estorba') && <Flecha x1={200} y1={780} x2={1000} y2={780} u={sm(t, m('estorba'), m('estorba') + 1)} color={VERDE} grosor={10} />}
      </Toma>
    </Lienzo>
  );
};
