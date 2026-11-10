import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Frasco, Megafono, Billete, Gente, Regalo, Persona, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Adquisición financiada por el cliente.
 * Toma 1: la cuenta del servicio de 15 al mes: diez meses de 10 de margen se apilan hasta 100 de por vida frente a 30
 * de publicidad (3,3 a 1); pero el primer mes solo entran 10: el frasco cae −20 por cliente y se vacía al crecer.
 * Toma 2: la venta adicional en el registro: cinco clientes en fila, uno toma el regalo de 100; repartido, 20 por
 * cliente; 10 + 20 = 30 empata los 30 de publicidad. El frasco vuelve a llenarse y el megáfono deja de depender del capital.
 */

const ID = 'ad25', P = 'ad-financiada';

export const FinanciadaAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('capital'), 'Que el primer mes pague'], [m('quince'), 'Un servicio de 15 al mes'], [m('vida'), '100 de por vida, 3,3 a 1'], [m('pierdes'), 'Pero el primer mes: −20'],
    [m('solucion'), 'Una venta adicional'], [m('empatas'), '10 + 20 = 30'], [m('limitado'), 'Crece sin límite de capital'],
  ];
  const meses = Math.round(10 * sm(t, m('meses'), m('meses') + 1.5));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Adquisición financiada por el cliente">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La cuenta y el problema de caja */}
      <Toma t={t} a={0} b={m('solucion')} cy={470}>
        <g opacity={e1(t, m('quince'))}>
          {Array.from({ length: 10 }, (_, k) => (
            <g key={k} opacity={k < Math.max(1, meses) ? 1 : 0.15}>
              <rect x={110 + k * 66} y={640 - 40} width={54} height={40} rx={8} fill={VERDE} />
              <Txt x={137 + k * 66} y={628} textAnchor="middle" fontSize={20} fill="#fff" peso={800}>10</Txt>
            </g>
          ))}
          {!movil && <Txt f="a" x={440} y={690} textAnchor="middle" fontSize={22} fill={c.tenue}>10 de margen × 10 meses</Txt>}
          {t >= m('vida') && <Cifra x={440} y={540} valor={100} u={sm(t, m('vida'), m('vida') + 1)} suf=" de por vida" tam={48} color={VERDE} />}
          {t >= m('treinta') && (
            <g opacity={e1(t, m('treinta'))}>
              <Megafono x={180} y={330} s={0.7} habla={1} t={t} />
              <Letrero x={360} y={300} texto="30 de publicidad" fondo={ROJO_M} id={ID} tam={26} />
              <Letrero x={360} y={380} texto="3,3 a 1" fondo={VERDE} id={ID} tam={28} />
            </g>
          )}
        </g>
        {t >= m('pierdes') && (
          <g opacity={e1(t, m('pierdes'))}>
            <Frasco x={930} y={700} w={200} h={330} v={lerp(0.7, 0.1, sm(t, m('pierdes'), m('vacia') + 1.5))} t={t} c={c} rojo={t >= m('vacia')} />
            <Cifra x={930} y={300} valor={-20} u={sm(t, m('pierdes'), m('pierdes') + 0.8)} suf=" por cliente" tam={44} color={ROJO_M} />
            {t >= m('vacia') && <Gente x={790} y={790} n={5} activos={Math.round(5 * sm(t, m('vacia'), m('vacia') + 1.5))} color={GRIS} paso={60} s={0.4} />}
          </g>
        )}
      </Toma>

      {/* 2 · La venta adicional */}
      <Toma t={t} a={m('solucion')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('solucion'))}>
          <Regalo x={600} y={330} s={1.3} color={ROSA} />
          <Letrero x={600} y={180} texto="+100 al registrarse" fondo={ROSA} id={ID} tam={30} />
        </g>
        {t >= m('cinco') && (
          <g opacity={e1(t, m('cinco'))}>
            {[0, 1, 2, 3, 4].map((k) => (
              <g key={k}>
                <Persona id={ID} x={200 + k * 110} y={680} s={0.5} cuerpo={k === 2 ? ROSA : GRIS} />
                {k === 2 && <Regalo x={200 + k * 110 + 40} y={lerp(380, 640, sm(t, m('cinco') + 0.5, m('cinco') + 1.3))} s={0.45} color={ROSA} />}
              </g>
            ))}
            <Letrero x={420} y={760} texto="1 de cada 5" id={ID} tam={26} />
          </g>
        )}
        {t >= m('veinte') && (
          <g opacity={e1(t, m('veinte'))}>
            <Txt x={900} y={460} textAnchor="middle" fontSize={56} fill={c.texto} peso={800}>10 + 20</Txt>
            <Cifra x={900} y={560} valor={30} u={sm(t, m('veinte'), m('veinte') + 1)} pre="= " tam={84} color={VERDE} />
          </g>
        )}
        {t >= m('empatas') && <Letrero x={900} y={640} texto="Empata la publicidad" fondo={VERDE} id={ID} tam={28} op={e1(t, m('empatas'))} />}
        {t >= m('limitado') && (
          <g opacity={e1(t, m('limitado'))}>
            <rect x={0} y={130} width={1200} height={730} fill={c.panel} opacity={0.97} />
            <Frasco x={400} y={720} w={200} h={340} v={0.8 + 0.03 * Math.sin(t * 2)} t={t} c={c} />
            {[0, 1, 2].map((k) => { const ph = ((t * 0.8) + k / 3) % 1; return <Billete key={k} x={lerp(500, 720, ph)} y={460 - 70 * Math.sin(Math.PI * ph)} s={0.7} rot={ph * 60} />; })}
            <Megafono x={800} y={480} s={1.2} habla={1} t={t} />
            <Letrero x={600} y={800} texto="El límite es el volumen, no el capital" id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
