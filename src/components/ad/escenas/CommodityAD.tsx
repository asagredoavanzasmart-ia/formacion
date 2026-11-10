import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Edificio, EtiquetaPrecio, Frasco, Megafono, Billete, Calendario, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * El servicio commoditizado.
 * Toma 1: una góndola de agencias idénticas con la misma etiqueta de precio: el cliente solo compara precio.
 * Toma 2: la agencia: 10.000 salen del frasco hacia el megáfono; vuelven cinco clientes con 1.000 cada uno; el frasco
 * queda en −5.000. Un calendario de tres meses: el mes 2 empata y el mes 3 da el primer dólar.
 * Toma 3: el frasco con una soga que lo estrangula: más publicidad, más tiempo en rojo.
 */

const ID = 'ad03', P = 'ad-commodity';

export const CommodityAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('precio'), 'Comparado solo por precio'], [m('agencia'), 'La agencia tradicional'], [m('invierte'), '10.000 en publicidad'], [m('pierde'), 'Pierde 5.000 el primer mes'],
    [m('segundo'), 'Tres meses para ganar'], [m('estrangulado'), 'Estrangulada por su caja'],
  ];
  // Saldo de caja (en miles): -10 tras invertir, +5 con los clientes, +5 mes 2, +5 mes 3.
  const saldo = -10 * sm(t, m('invierte'), m('invierte') + 1) + 5 * sm(t, m('cinco'), m('cinco') + 1.2) + 5 * sm(t, m('segundo'), m('segundo') + 1.2) + 5 * sm(t, m('tercero'), m('tercero') + 1.2);
  const mes = t >= m('tercero') ? 3 : t >= m('segundo') ? 2 : 1;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El servicio commoditizado">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Todos iguales en la góndola */}
      <Toma t={t} a={0} b={m('agencia')} cy={470}>
        <rect x={120} y={640} width={960} height={24} rx={10} fill={c.apagado} />
        {[0, 1, 2, 3, 4].map((k) => {
          const x = 210 + k * 195;
          return (
            <g key={k} opacity={e1(t, 0.3 + k * 0.15)}>
              <Edificio x={x} y={640} w={110} h={200} color={GRIS} />
              <EtiquetaPrecio x={x - 50} y={380} texto="$1.000" t={t + k} bal={1} color={k === 2 && t >= m('identico') ? NARANJA : '#64748b'} tam={26} />
            </g>
          );
        })}
        {t >= m('identico') && <Letrero x={600} y={760} texto="Idénticos: gana el más barato" id={ID} tam={30} op={e1(t, m('identico'))} />}
      </Toma>

      {/* 2 · La cuenta de la agencia */}
      <Toma t={t} a={m('agencia')} b={m('estrangulado')} cy={480}>
        <g opacity={e1(t, m('agencia'))}>
          <Edificio x={190} y={700} w={150} h={260} color={NARANJA} />
          {!movil && <Txt f="a" x={190} y={360} textAnchor="middle" fontSize={26} fill={c.texto}>Agencia</Txt>}
          {t >= m('cuota') && <Letrero x={190} y={770} texto="1.000 + 1.000/mes" id={ID} tam={26} op={e1(t, m('cuota'))} />}
          <Frasco x={470} y={700} w={170} h={300} v={lerp(0.85, 0, sm(t, m('invierte'), m('invierte') + 1)) + 0.4 * sm(t, m('cinco'), m('cinco') + 1.2)} t={t} c={c} rojo={saldo < -0.1} />
          <Cifra x={470} y={340} valor={saldo} u={1} pre={saldo >= 0 ? '+' : ''} suf=" mil" tam={54} color={saldo < 0 ? ROJO_M : VERDE} />
          {t >= m('invierte') && (
            <g opacity={ventana(t, m('invierte'), m('estrangulado'))}>
              <Megafono x={790} y={470} s={1} habla={1} t={t} />
              {[0, 1, 2, 3].map((k) => { const ph = ((t - m('invierte')) * 0.8 + k / 4) % 1; return <Billete key={k} x={lerp(520, 760, ph)} y={460 - 80 * Math.sin(Math.PI * ph)} s={0.7} rot={ph * 90} op={t < m('cinco') ? 1 - ph * 0.3 : 0} />; })}
            </g>
          )}
          {t >= m('cinco') && [0, 1, 2, 3, 4].map((k) => {
            const u = sm(t, m('cinco') + k * 0.15, m('cinco') + k * 0.15 + 0.9);
            return (
              <g key={k} transform={`translate(${lerp(1020, 640 + k * 26, u)} ${lerp(700, 260 + (k % 2) * 30, u)})`} opacity={u > 0.02 ? 1 : 0}>
                <Billete x={0} y={0} s={0.6} rot={-10 + k * 5} />
              </g>
            );
          })}
          {t >= m('pierde') && <Letrero x={470} y={250} texto="−5.000 el mes 1" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('pierde'))} />}
          {t >= m('segundo') && (
            <g opacity={e1(t, m('segundo'))} transform="translate(930 330)">
              <Calendario x={0} y={0} s={1.1} marcados={mes} />
              <Letrero x={0} y={170} texto={mes >= 3 ? 'Mes 3: primer dólar' : 'Mes 2: empata'} fondo={mes >= 3 ? VERDE : AZUL_M} id={ID} tam={26} />
            </g>
          )}
        </g>
      </Toma>

      {/* 3 · Estrangulada por su propio flujo de caja */}
      <Toma t={t} a={m('estrangulado')} b={fin + 1} cy={480}>
        <g opacity={e1(t, m('estrangulado'))}>
          <Frasco x={600} y={720} w={240} h={380} v={0.22 + 0.04 * Math.sin(t * 2)} t={t} c={c} rojo />
          {[0, 1, 2].map((k) => {
            const ap = sm(t, m('estrangulado') + k * 0.3, m('estrangulado') + k * 0.3 + 0.8);
            const y = 420 + k * 70;
            return <path key={k} d={`M ${430 + 40 * ap} ${y} Q 600 ${y + 26} ${770 - 40 * ap} ${y}`} stroke="#92400e" strokeWidth={16} fill="none" strokeLinecap="round" opacity={ap} />;
          })}
          {t >= m('rojos') && (
            <g opacity={e1(t, m('rojos'))}>
              <Megafono x={180} y={450} s={1.2} habla={1} t={t} />
              <Letrero x={230} y={640} texto="Más publicidad" id={ID} tam={28} />
              <Letrero x={960} y={640} texto="Más tiempo en rojo" fondo={ROJO_M} id={ID} tam={28} />
              <rect x={900} y={300} width={120} height={260} rx={14} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
              <rect x={916} y={560 - 240 * sm(t, m('rojos'), m('rojos') + 2)} width={88} height={240 * sm(t, m('rojos'), m('rojos') + 2)} rx={10} fill={ROJO_M} />
            </g>
          )}
        </g>
      </Toma>
    </Lienzo>
  );
};
