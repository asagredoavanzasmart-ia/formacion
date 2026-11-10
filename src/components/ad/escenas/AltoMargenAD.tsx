import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Frasco, Megafono, Billete, Escudo, Regalo, Gente, Flecha, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * La oferta de alto margen.
 * Toma 1: la oferta se arma como un paquete sobre una mesa: pago único, pauta del cliente, pago por desempeño, escudo de
 * garantía de veinte prospectos y la caja del sistema de conversión.
 * Toma 2: tres palancas que se multiplican: gente que responde (×2,5), reuniones que cierran (×2,5) y efectivo al contado
 * (×4); un contador grande sube hasta 112.000 frente a los 10.000 de publicidad.
 * Toma 3: el frasco se llena con el dinero de los clientes y alimenta el megáfono: la adquisición se financia sola.
 */

const ID = 'ad04', P = 'ad-alto-margen';

export const AltoMargenAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('unico'), 'Otra estructura de cobro'], [m('garantiza'), 'Garantía y sistema incluidos'], [m('efectos'), 'Tres efectos a la vez'],
    [m('multiplican'), 'Se multiplican'], [m('financiada'), 'Se financia sola'],
  ];
  const piezas: [string, string, string][] = [['unico', 'Pago único', NARANJA], ['pauta', 'Pauta del cliente', AZUL_M], ['desempeno', 'Por desempeño', VIOLETA]];
  const palancas: [string, string, string, string][] = [['responden', 'Responden', '×2,5', AZUL_M], ['cierran', 'Cierran', '×2,5', VIOLETA], ['cobra', 'Cobro al contado', '×4', VERDE]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La oferta de alto margen">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El paquete de la nueva oferta */}
      <Toma t={t} a={0} b={m('efectos')} cy={480}>
        <rect x={100} y={700} width={1000} height={22} rx={10} fill={c.apagado} />
        {piezas.map(([n, txt, col], k) => {
          const u = sm(t, m(n), m(n) + 0.7);
          return (
            <g key={n} opacity={u} transform={`translate(${220 + k * 250} ${lerp(200, 300, u)})`}>
              <rect x={-105} y={-60} width={210} height={120} rx={22} fill={col} style={sombra(0.22, 4, 10)} />
              <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={movil ? 30 : 26} fill="#fff">{txt}</Txt>
            </g>
          );
        })}
        {t >= m('unico') && <Txt x={220} y={460} textAnchor="middle" fontSize={44} fill={c.texto} peso={800} opacity={e1(t, m('unico') + 0.4)}>Sin iguala</Txt>}
        {t >= m('garantiza') && (
          <g opacity={e1(t, m('garantiza'))}>
            <Escudo x={330} y={560} s={0.9} u={sm(t, m('garantiza'), m('garantiza') + 0.8)} />
            <Letrero x={330} y={672} texto="20 prospectos o gratis" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
        {t >= m('sistema') && (
          <g opacity={e1(t, m('sistema'))}>
            <Regalo x={800} y={660} s={1.4} color={ROSA} />
            <Letrero x={800} y={470} texto="Sistema de conversión" fondo={ROSA} id={ID} tam={26} />
          </g>
        )}
      </Toma>

      {/* 2 · Tres palancas que se multiplican */}
      <Toma t={t} a={m('efectos')} b={m('financiada')} cy={470}>
        <g opacity={e1(t, m('efectos'))}>
          <Megafono x={110} y={300} s={0.7} habla={1} t={t} />
          <Letrero x={150} y={420} texto="10.000" id={ID} tam={30} />
        </g>
        {palancas.map(([n, txt, x, col], k) => {
          const on = t >= m(n) - 0.1;
          const cx = 380 + k * 260;
          const u = sm(t, m(n), m(n) + 1);
          return (
            <g key={n} opacity={on ? e1(t, m(n)) : 0}>
              <rect x={cx - 100} y={180} width={200} height={300} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
              {k === 0 && <Gente x={cx - 60} y={300} n={3} activos={Math.round(1 + 2 * u)} color={col} paso={60} s={0.62} />}
              {k === 1 && [0, 1, 2].map((j) => <rect key={j} x={cx - 70 + j * 50} y={300 - 30 * (j < 1 + 2 * u ? 1 : 0.4)} width={36} height={30 * (j < 1 + 2 * u ? 1 : 0.4) + 20} rx={6} fill={j < 1 + 2 * u ? col : c.apagado} />)}
              {k === 2 && [0, 1, 2, 3].map((j) => <Billete key={j} x={cx} y={310 - j * 18 * u} s={0.7} op={j < 1 + 3 * u ? 1 : 0.2} />)}
              <Txt x={cx} y={400} textAnchor="middle" fontSize={60} fill={col} peso={800}>{x}</Txt>
              <Txt f="a" x={cx} y={450} textAnchor="middle" fontSize={26} fill={c.texto}>{txt}</Txt>
              {k < 2 && t >= m('multiplican') && <Txt x={cx + 130} y={350} textAnchor="middle" fontSize={56} fill={c.tenue} peso={800} opacity={e1(t, m('multiplican'))}>×</Txt>}
            </g>
          );
        })}
        {t >= m('ciento') && (
          <g opacity={e1(t, m('ciento'))}>
            <Flecha x1={240} y1={600} x2={420} y2={600} u={sm(t, m('ciento'), m('ciento') + 0.6)} color={c.texto} grosor={10} />
            <Cifra x={700} y={640} valor={112000} u={sm(t, m('ciento'), m('ciento') + 1.6)} tam={110} color={VERDE} miles />
            <Txt f="a" x={700} y={700} textAnchor="middle" fontSize={26} fill={c.tenue}>en 30 días · cifras de Hormozi</Txt>
          </g>
        )}
        {t >= m('veinte') && <Letrero x={700} y={780} texto="Más de 20 veces" fondo={AMBAR} id={ID} tam={32} op={e1(t, m('veinte'))} />}
      </Toma>

      {/* 3 · La adquisición se financia sola */}
      <Toma t={t} a={m('financiada')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('financiada'))}>
          <Gente x={130} y={680} n={5} activos={5} color={AZUL_M} paso={62} s={0.7} />
          {[0, 1, 2, 3].map((k) => { const ph = ((t - m('financiada')) * 0.7 + k / 4) % 1; return <Billete key={k} x={lerp(300, 540, ph)} y={560 - 120 * Math.sin(Math.PI * ph)} s={0.7} rot={ph * 60} />; })}
          <Frasco x={620} y={720} w={180} h={320} v={0.3 + 0.55 * sm(t, m('financiada'), m('financiada') + 2.5)} t={t} c={c} />
          {[0, 1, 2].map((k) => { const ph = ((t - m('financiada')) * 0.7 + k / 3) % 1; return <Billete key={k} x={lerp(720, 880, ph)} y={460 - 80 * Math.sin(Math.PI * ph)} s={0.6} rot={-ph * 60} />; })}
          <Megafono x={930} y={470} s={1.1} habla={1} t={t} />
          <Letrero x={620} y={790} texto="Los clientes pagan la publicidad" fondo={VERDE} id={ID} tam={28} />
        </g>
      </Toma>
    </Lienzo>
  );
};
