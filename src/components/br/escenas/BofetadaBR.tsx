import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Curva, Edificio, Sello, Megafono, Sobre, Persona, Frasco, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La bofetada de Google.
 * Toma 1: el precio del clic como una curva: 0,25 dólares en 2003, cada clic deja 2 a 3 dólares; de golpe salta a 3 o más
 * y los pequeños anunciantes (casitas) caen.
 * Toma 2: el ciclo de toda plataforma en tres tramos sobre la misma curva: adopción barata, subida, bofetada.
 * Toma 3: tres tipos de tráfico como tres casas: la arrendada (megáfono pagado), la prestada (micrófono de otro, el tiempo)
 * y la propia (la lista); las dos primeras desaguan en la tercera.
 */

const ID = 'br13', P = 'br-bofetada';

export const BofetadaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('bofetada'), 'La bofetada de Google'], [m('fases'), 'Tres fases de toda plataforma'], [m('controlas'), 'Tres tipos de tráfico'], [m('tercero'), 'Todo hacia la lista'],
  ];
  const salto = sm(t, m('tres'), m('tres') + 0.5);
  const precio = lerp(0.25, 3, salto);
  const caen = sm(t, m('quebro'), m('quebro') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La bofetada de Google">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El precio del clic */}
      <Toma t={t} a={0} b={m('fases')} cy={470}>
        <g opacity={e1(t, 0.3)}>
          <rect x={110} y={180} width={560} height={560} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Txt x={390} y={240} textAnchor="middle" fontSize={28} fill={c.tenue}>Costo por clic</Txt>
          <Cifra x={390} y={360} valor={precio} u={1} dec={2} pre="$" tam={90} color={salto > 0.5 ? ROJO_M : VERDE} />
          {t >= m('dejaba') && <Letrero x={390} y={470} texto="Cada clic deja $2–3" fondo={VERDE} id={ID} tam={28} op={ventana(t, m('dejaba'), m('tres') + 0.2)} />}
          {t >= m('tres') && (
            <g opacity={e1(t, m('tres'))}>
              <path d={`M 250 ${560} l 60 -40 l -20 50 l 70 -30`} stroke={ROJO_M} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <Sello x={390} y={620} texto="×12" u={salto} tam={50} />
            </g>
          )}
        </g>
        <g opacity={e1(t, m('centavos'))}>
          {[0, 1, 2, 3, 4].map((k) => {
            const cae = k > 0 ? caen : 0;
            return (
              <g key={k} transform={`translate(${780 + (k % 3) * 120} ${k < 3 ? 450 : 700}) rotate(${cae * (40 + k * 10)} 0 0)`} opacity={1 - 0.7 * cae}>
                <Edificio x={0} y={0} w={90} h={k === 0 ? 230 : 120} color={k === 0 ? VIOLETA : NARANJA} />
              </g>
            );
          })}
          {t >= m('quebro') && <Letrero x={900} y={780} texto="Los pequeños caen" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('quebro'))} />}
        </g>
      </Toma>

      {/* 2 · Las tres fases */}
      <Toma t={t} a={m('fases')} b={m('controlas')} cy={470}>
        <g opacity={e1(t, m('fases'))}>
          <rect x={120} y={680} width={960} height={6} rx={3} fill={c.apagado} />
          <Curva pts={[[140, 640], [360, 620], [560, 520], [760, 380], [840, 330], [880, 220], [1060, 200]]} u={sm(t, m('adopcion'), m('expulsa') + 1)} color={ROJO_M} grosor={10} />
          {([['adopcion', 'Adopción', VERDE, 250], ['subida', 'Subida', AMBAR, 600], ['expulsa', 'Bofetada', ROJO_M, 960]] as const).map(([n, txt, col, x]) => (
            t >= m(n) - 0.1 ? <Letrero key={n} x={x} y={760} texto={txt} fondo={col} id={ID} tam={30} op={e1(t, m(n))} /> : null
          ))}
          {t >= m('expuesto') && <Letrero x={420} y={260} texto="Una sola fuente: expuesto" fondo={GRIS} id={ID} tam={28} op={e1(t, m('expuesto'))} />}
        </g>
      </Toma>

      {/* 3 · Tres tipos de tráfico */}
      <Toma t={t} a={m('controlas')} b={fin + 1} cy={470}>
        {([['controlas', 'Controlado', AMBAR, 220], ['ganas', 'Ganado', VIOLETA, 600], ['posees', 'Propio', VERDE, 980]] as const).map(([n, txt, col, x], k) => {
          const on = t >= m(n) - 0.1 ? e1(t, m(n)) : 0.15;
          return (
            <g key={n} opacity={on}>
              <rect x={x - 150} y={250} width={300} height={360} rx={28} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
              {k === 0 && <Megafono x={x - 30} y={460} s={0.9} habla={1} t={t} />}
              {k === 1 && <Persona id={ID} x={x} y={530} s={0.62} cuerpo={VIOLETA} />}
              {k === 2 && <Frasco x={x} y={540} w={130} h={200} v={0.4 + 0.4 * sm(t, m('tercero'), m('tercero') + 1.5)} t={t} c={c} />}
              <Letrero x={x} y={660} texto={txt} fondo={col} id={ID} tam={30} />
              <Txt x={x} y={730} textAnchor="middle" fontSize={26} fill={c.tenue}>{['Pagas cada visita', 'Cuesta tiempo', 'Tu lista'][k]}</Txt>
            </g>
          );
        })}
        {t >= m('tercero') && [0, 1].map((k) => {
          const x0 = k === 0 ? 370 : 750;
          return [0, 1, 2].map((j) => {
            const ph = ((t - m('tercero')) * 0.6 + j / 3) % 1;
            const x = lerp(k === 0 ? 300 : 680, 950, ph), y = 330 - 90 * Math.sin(Math.PI * ph);
            return <Sobre key={`${k}${j}`} x={x} y={y} s={0.35} color={k === 0 ? AMBAR : VIOLETA} op={e1(t, m('tercero')) * Math.sin(Math.PI * ph)} />;
          });
        })}
      </Toma>
    </Lienzo>
  );
};
