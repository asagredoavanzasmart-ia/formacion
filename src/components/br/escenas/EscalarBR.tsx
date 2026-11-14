import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Curva, Embudo, Telefono, Billete, Sello, Escalon, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Gana quien puede pagar más.
 * Toma 1: el caso FitLife: el teléfono con el millón doscientos mil seguidores, la curva de tráfico que se desploma un 90 %
 * y la balanza de caja: 116 dólares que salen contra 97 que entran.
 * Toma 2: el diagnóstico es el embudo; la subasta: dos postores levantan su paleta y gana el que puede pujar más alto.
 * Toma 3: la ruta de la clase como tres escalones: oferta, creencia y atención, más el límite al final.
 */

const ID = 'br02', P = 'br-escalar';

const Paleta: React.FC<{ x: number; y: number; alto: number; color: string; monto: string }> = ({ x, y, alto, color, monto }) => (
  <g>
    <rect x={x - 5} y={y - alto} width={10} height={alto} rx={5} fill="#64748b" />
    <circle cx={x} cy={y - alto - 46} r={52} fill={color} style={sombra(0.22, 3, 8)} />
    <Txt x={x} y={y - alto - 36} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>{monto}</Txt>
  </g>
);

export const EscalarBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('culpa'), '¿Tráfico o conversión?'], [m('drew'), 'El caso FitLife'], [m('diagnostico'), 'Un problema de embudo'],
    [m('kennedy'), 'Gana quien paga más'], [m('partes'), 'La ruta de la clase'],
  ];
  const cae = sm(t, m('noventa'), m('noventa') + 1.4);
  const puja = sm(t, m('pujar'), m('pujar') + 1.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Gana quien puede pagar más">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El caso FitLife */}
      <Toma t={t} a={0} b={m('diagnostico')} cy={470}>
        {t < m('drew') && (
          <g opacity={ventana(t, 0.2, m('drew'))}>
            <Letrero x={380} y={420} texto="¿Tráfico?" fondo={GRIS} id={ID} tam={40} />
            <Letrero x={820} y={420} texto="¿Conversión?" fondo={GRIS} id={ID} tam={40} />
          </g>
        )}
        {t >= m('drew') && (
          <g opacity={e1(t, m('drew'))}>
            <Telefono x={230} y={460} s={1.25} widgets={4} />
            <Letrero x={230} y={720} texto="FitLife.tv" fondo={NARANJA} id={ID} tam={28} />
            {t >= m('seguidores') && <Cifra x={230} y={230} valor={1200000} u={sm(t, m('seguidores'), m('seguidores') + 1)} tam={46} color={AZUL_M} miles />}
            <rect x={420} y={200} width={360} height={340} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
            {t >= m('noventa') - 0.1 && (
              <g opacity={e1(t, m('noventa') - 0.1)}>
                <Curva pts={[[450, 260], [560, 270], [610, 300], [650, 470], [750, 500]]} u={cae} color={ROJO_M} grosor={10} />
                <Txt x={600} y={590} textAnchor="middle" fontSize={34} fill={ROJO_M} peso={800}>−90 % de tráfico</Txt>
              </g>
            )}
          </g>
        )}
        {t >= m('ciento') && (
          <g opacity={e1(t, m('ciento'))}>
            <rect x={830} y={200} width={300} height={420} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
            <Txt x={980} y={260} textAnchor="middle" fontSize={26} fill={c.tenue}>Por cada venta</Txt>
            <Billete x={900} y={340} s={1} rot={-8} color={ROJO_M} />
            <Cifra x={1050} y={355} valor={116} u={1} tam={44} color={ROJO_M} pre="−" />
            <Billete x={900} y={460} s={1} rot={6} />
            <Cifra x={1050} y={475} valor={97} u={1} tam={44} color={VERDE} pre="+" />
            <rect x={860} y={520} width={240} height={6} rx={3} fill={c.apagado} />
            <Cifra x={980} y={585} valor={-19} u={sm(t, m('ciento') + 0.6, m('ciento') + 1.4)} tam={48} color={ROJO_M} />
          </g>
        )}
        {t >= m('pedia') && <Letrero x={600} y={720} texto="Pide tráfico y conversión" fondo={GRIS} id={ID} tam={28} op={e1(t, m('pedia'))} />}
      </Toma>

      {/* 2 · El embudo y la subasta */}
      <Toma t={t} a={m('diagnostico')} b={m('partes')} cy={470}>
        <g opacity={ventana(t, m('diagnostico'), m('kennedy') + 0.6)}>
          <Embudo x={600} y={260} w={520} alto={74} tam={26} franjas={[{ n: 'Anuncio', color: NARANJA }, { n: 'Oferta', color: ROSA }, { n: 'Ventas extra', color: VIOLETA }]} />
          <Sello x={600} y={620} texto={movil ? 'Es el embudo' : 'Problema de embudo'} u={sm(t, m('diagnostico') + 0.3, m('diagnostico') + 0.9)} color={VIOLETA} tam={36} />
        </g>
        {t >= m('kennedy') && (
          <g opacity={e1(t, m('kennedy') + 0.3)}>
            <rect x={360} y={600} width={480} height={30} rx={10} fill={c.apagado} />
            <Txt x={600} y={680} textAnchor="middle" fontSize={30} fill={c.tenue}>{movil ? 'Subasta' : 'Subasta por el mismo cliente'}</Txt>
            <Persona id={ID} x={300} y={760} s={0.62} cuerpo={GRIS} />
            <Persona id={ID} x={900} y={760} s={0.62} cuerpo={VERDE} corbata />
            <Paleta x={360} y={640} alto={lerp(140, 160, puja)} color={GRIS} monto="$1" />
            <Paleta x={840} y={640} alto={lerp(140, 300, puja)} color={VERDE} monto="$3" />
            {t >= m('gana') && <Letrero x={600} y={195} texto="Gana quien puede gastar más" fondo={VERDE} id={ID} tam={32} op={e1(t, m('gana'))} />}
            {t >= m('subasta') && <Letrero x={340} y={330} texto="Fuera" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('subasta'))} />}
          </g>
        )}
      </Toma>

      {/* 3 · La ruta de la clase */}
      <Toma t={t} a={m('partes')} b={fin + 1} cy={470}>
        {([['oferta', 'Oferta', NARANJA], ['creencia', 'Creencia', ROSA], ['atencion', 'Atención', AZUL_M]] as const).map(([n, txt, col], k) => {
          const on = t >= m(n) - 0.1 ? e1(t, m(n)) : t >= m('partes') ? 0.18 : 0;
          return (
            <g key={n} opacity={on}>
              <Escalon x={170 + k * 300} y={720} w={280} h={130 + k * 130} color={col} />
              <Txt x={310 + k * 300} y={650 - k * 130} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>{txt}</Txt>
            </g>
          );
        })}
        {t >= m('atencion') + 0.6 && <Letrero x={1020} y={250} texto={movil ? 'Límites' : 'Y sus límites'} fondo={GRIS} id={ID} tam={28} op={e1(t, m('atencion') + 0.6)} />}
      </Toma>
    </Lienzo>
  );
};
