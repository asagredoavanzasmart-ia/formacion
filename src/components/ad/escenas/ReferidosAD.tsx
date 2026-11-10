import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Gente, Corazon, Contrato, Regalo, Calendario, Escudo, Flujo, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Clientes que refieren.
 * Toma 1: un reloj de arena de horas propias que se agota y cuatro aliados que se suman alrededor; el primero, el
 * cliente que refiere, con su dato: +16 % (Schmitt, Skiera y Van den Bulte).
 * Toma 2: una tina de clientes: entra agua por los referidos y sale por las cancelaciones; la buena voluntad (promesa
 * menor, siguiente reunión agendada, garantía amarrada a los primeros 7 días) sube el caudal de entrada.
 * Toma 3: cuatro formas de pedirlo: incentivo de dos lados (dos regalos), presentación al firmar (contrato con tres
 * firmas), descuento por referidos y la tarjeta de regalo a nombre de un amigo.
 */

const ID = 'ad28', P = 'ad-referidos';

export const ReferidosAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('horas'), 'Más allá de tus horas'], [m('aliados'), 'Cuatro aliados'], [m('empirico'), 'Respaldo empírico'], [m('cancelan'), 'Más referidos que bajas'],
    [m('pides'), 'Pedirlo activamente'],
  ];
  const ALI: [string, number, number, string][] = [['Referidos', 300, 280, ROSA], ['Empleados', 900, 280, AZUL_M], ['Agencias', 300, 640, VIOLETA], ['Afiliados', 900, 640, TEAL]];
  const entra = 0.4 + 0.15 * (sm(t, m('prometes'), m('prometes') + 1) + sm(t, m('agendas'), m('agendas') + 1) + sm(t, m('amarras'), m('amarras') + 1));
  const nivel = cl01(0.35 + (entra - 0.45) * 0.8 * sm(t, m('cancelan'), m('pides')));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Clientes que refieren">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Los cuatro aliados */}
      <Toma t={t} a={0} b={m('cancelan')} cy={470}>
        <g opacity={e1(t, m('horas'))}>
          <Persona id={ID} x={600} y={560} s={0.8} cuerpo={NARANJA} />
          {!movil && <Txt f="a" x={600} y={610} textAnchor="middle" fontSize={24} fill={c.tenue}>Tus horas tienen límite</Txt>}
        </g>
        {ALI.map(([txt, x, y, col], k) => (
          <g key={txt} opacity={sm(t, m('refieren') + k * 0.35, m('refieren') + k * 0.35 + 0.5)}>
            <Gente x={x - 40} y={y + 30} n={2} activos={2} color={col} paso={80} s={0.55} />
            <Letrero x={x} y={y + 80} texto={txt} fondo={col} id={ID} tam={26} />
            <Flujo x1={x} y1={y} x2={600} y2={400} t={t + k} n={3} color={col} r={7} op={0.7} />
          </g>
        ))}
        {t >= m('empirico') && (
          <g opacity={e1(t, m('empirico'))}>
            <rect x={380} y={150} width={440} height={170} rx={28} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Cifra x={600} y={250} valor={16} u={sm(t, m('dieciseis'), m('dieciseis') + 1)} pre="+" suf=" %" tam={74} color={ROSA} />
            <Txt f="a" x={600} y={298} textAnchor="middle" fontSize={24} fill={c.tenue}>valor del cliente referido</Txt>
          </g>
        )}
      </Toma>

      {/* 2 · La tina: entran referidos, salen bajas */}
      <Toma t={t} a={m('cancelan')} b={m('pides')} cy={470}>
        <g opacity={e1(t, m('cancelan'))}>
          <path d="M 380 300 V 640 Q 380 700 440 700 H 760 Q 820 700 820 640 V 300" fill={c.panel2} />
          <path d={`M 386 ${700 - 380 * nivel} H 814 V 640 Q 814 694 760 694 H 440 Q 386 694 386 640 Z`} fill={AZUL_M} opacity={0.75} />
          {Array.from({ length: Math.round(8 * entra) }, (_, k) => { const ph = ((t * 0.8) + k / 8) % 1; return <circle key={k} cx={lerp(200, 520, ph)} cy={200 + 160 * ph * ph} r={10} fill={ROSA} />; })}
          {Array.from({ length: 4 }, (_, k) => { const ph = ((t * 0.7) + k / 4) % 1; return <circle key={k} cx={830 + 200 * ph} cy={660 + 60 * ph} r={9} fill={GRIS} opacity={1 - ph} />; })}
          <Letrero x={200} y={160} texto="Referidos" fondo={ROSA} id={ID} tam={26} />
          <Letrero x={1020} y={760} texto="Cancelaciones" fondo={GRIS} id={ID} tam={26} />
          {([['prometes', 'Prometer menos, cumplir más'], ['agendas', 'Siguiente reunión agendada'], ['amarras', 'Garantía: primeros 7 días']] as const).map(([n, txt], k) => (
            <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0}>
              <Corazon x={180} y={420 + k * 110} s={0.7} />
              {!movil && <Txt f="a" x={220} y={430 + k * 110} fontSize={22} fill={c.texto}>{txt}</Txt>}
            </g>
          ))}
          {t >= m('voluntad') && <Letrero x={600} y={790} texto="Buena voluntad: sube la entrada" fondo={VERDE} id={ID} tam={26} op={e1(t, m('voluntad'))} />}
        </g>
      </Toma>

      {/* 3 · Cuatro formas de pedirlo */}
      <Toma t={t} a={m('pides')} b={fin + 1} cy={470}>
        {([['paypal', 'Dos lados', ROSA], ['firma', 'Al firmar', VIOLETA], ['descuento', 'Descuento', AMBAR], ['tarjetas', 'Tarjeta regalo', VERDE]] as const).map(([n, txt, col], k) => {
          const x = 180 + k * 280;
          return (
            <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.15}>
              <rect x={x - 125} y={220} width={250} height={420} rx={28} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
              <g transform={`translate(${x} 420)`}>
                {k === 0 && <g><Regalo x={-50} y={40} s={0.6} color={col} /><Regalo x={50} y={40} s={0.6} color={col} /></g>}
                {k === 1 && <Contrato x={0} y={0} s={0.8} firma={sm(t, m(n), m(n) + 1.5)} />}
                {k === 2 && <g><circle r={60} fill={col} /><Txt x={0} y={16} textAnchor="middle" fontSize={44} fill="#fff" peso={800}>%</Txt></g>}
                {k === 3 && <g transform="rotate(-8)"><rect x={-80} y={-50} width={160} height={100} rx={14} fill={col} /><rect x={-80} y={-50} width={160} height={24} rx={10} fill="#000" opacity={0.15} /><Txt x={0} y={26} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>⅓ · 14 días</Txt></g>}
              </g>
              <Letrero x={x} y={590} texto={txt} fondo={col} id={ID} tam={24} />
            </g>
          );
        })}
        {t >= m('paypal') && !movil && <Txt f="a" x={180} y={690} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('paypal'))}>PayPal, Dropbox</Txt>}
      </Toma>
    </Lienzo>
  );
};

function cl01(v: number) { return Math.min(1, Math.max(0, v)); }
