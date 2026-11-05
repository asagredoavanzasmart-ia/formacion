import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Termometro, Caja, Telefono, Hoja, Visto, Cruz, Suelo, Burbuja, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Criterios extremos.
 * Toma 1: Derek Sivers: ¡claro que sí! o no; el termómetro de 0 a 100 con el corte en 90: las opciones de 95 pasan,
 * las de 60 y 70 caen a cero.
 * Toma 2 (Vitsoe): el camino del candidato por cuatro estaciones (teléfono, entrevistas, un día de trabajo, encuesta) y
 * las herramientas arrojadas a la caja: no evidente.
 * Toma 3: dos coladores en serie (tres mínimos, tres extremos) por donde caen las oportunidades; la persona más nueva
 * pregunta si un proyecto los cumple.
 */

const ID = 'es10', P = 'es-criterios';

const Colador: React.FC<{ y: number; w: number; agujero: number; color: string; texto: string; c: ReturnType<typeof tono> }> = ({ y, w, agujero, color, texto, c }) => (
  <g>
    <path d={`M ${600 - w / 2} ${y} H ${600 + w / 2} L ${600 + w / 2 - 40} ${y + 60} H ${600 - w / 2 + 40} Z`} fill={color} />
    {Array.from({ length: 6 }, (_, k) => <circle key={k} cx={600 - w / 2 + 70 + k * ((w - 140) / 5)} cy={y + 30} r={agujero} fill={c.panel2} />)}
    <Txt x={600 + w / 2 + 30} y={y + 42} fontSize={28} fill={c.texto}>{texto}</Txt>
  </g>
);

export const CriteriosES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('sivers'), 'Derek Sivers'], [m('noventa'), 'La regla del 90 %'], [m('conviertes'), 'Menos de 90 = 0'], [m('vitsoe'), 'Vitsoe contrata'],
    [m('herramientas'), 'Un detalle decide'], [m('evidente'), 'Sí evidente o no'], [m('minimos'), 'Tres criterios mínimos'], [m('extremos'), 'Tres criterios extremos'],
    [m('nuevo'), 'Criterios explícitos'],
  ];
  const OPS: [number, string][] = [[95, '95'], [70, '70'], [60, '60']];
  const ETAPAS: [string, string][] = [['telefonica', 'Teléfono'], ['telefonica', 'Entrevistas'], ['dia', 'Un día de trabajo'], ['encuesta', 'Encuesta al equipo']];
  const avance = sm(t, m('telefonica'), m('encuesta') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Criterios extremos">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Sivers y el termómetro */}
      <Toma t={t} a={0} b={m('vitsoe')} cy={480}>
        {ventana(t, 0, m('noventa')) > 0.01 && (
          <g opacity={ventana(t, 0, m('noventa'))}>
            <Persona id={ID} x={300} y={720} s={1.05} cuerpo={AZUL_M} />
            <Burbuja x={330} y={520} w={360} texto="¡Claro que sí!" u={sm(t, m('claro'), m('claro') + 0.7)} c={c} id={ID} tam={36} marca />
            {t >= m('claro') && <Letrero x={900} y={560} texto="… o no" fondo={GRIS} id={ID} tam={40} op={e1(t, m('claro') + 0.8)} />}
            {!movil && <Txt f="a" x={300} y={790} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('sivers'))}>Derek Sivers</Txt>}
          </g>
        )}
        {t >= m('noventa') && (
          <g opacity={e1(t, m('noventa'))}>
            <Termometro x={300} y={720} alto={480} v={sm(t, m('cero'), m('cero') + 2) * 0.95} corte={0.9} c={c} />
            <Txt x={380} y={720 - 480 * 0.9 + 10} fontSize={30} fill={ROJO_M}>90</Txt>
            {OPS.map(([v, txt], k) => {
              const llega = sm(t, m('conviertes') + 0.4 * k - 0.5, m('conviertes') + 0.4 * k + 0.3);
              const pasa = v >= 90;
              const cae = !pasa ? sm(t, m('conviertes') + 0.4 * k + 0.4, m('conviertes') + 0.4 * k + 1.2) : 0;
              const x = 640 + k * 180, y = 300 + cae * 320;
              return (
                <g key={k} opacity={e1(t, m('noventa') + 0.3 * k) * (1 - cae * 0.5)}>
                  <rect x={x - 70} y={y - 50} width={140} height={100} rx={18} fill={pasa ? VERDE : llega > 0.5 ? GRIS : [VERDE, AZUL_M, VIOLETA][k]} />
                  <Txt x={x} y={y + 16} textAnchor="middle" fontSize={48} fill="#fff">{llega > 0.9 && !pasa ? '0' : txt}</Txt>
                  {llega > 0.9 && (pasa ? <Visto x={x + 70} y={y - 50} r={24} /> : <Cruz x={x + 70} y={y - 50} r={24} />)}
                </g>
              );
            })}
            {t >= m('sesenta') && <Letrero x={820} y={720} texto="Un 60 o un 70 te deja atrapado" fondo={GRIS} id={ID} tam={28} op={e1(t, m('sesenta'))} />}
          </g>
        )}
      </Toma>

      {/* 2 · el camino de Vitsoe */}
      <Toma t={t} a={m('vitsoe')} b={m('minimos')} cy={480}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        <Letrero x={600} y={180} texto="Vitsoe · estanterías 606 de Dieter Rams" fondo={GRIS} id={ID} tam={26} op={e1(t, m('vitsoe'))} />
        {ETAPAS.map(([n, txt], k) => {
          const x = 220 + k * 250;
          return (
            <g key={txt} opacity={e1(t, m(n) + (k === 1 ? 1 : 0))}>
              <rect x={x - 90} y={250} width={180} height={150} rx={20} fill={c.panel} />
              {k === 0 && <Telefono x={x} y={380} s={0.55} />}
              {k === 1 && [0, 1].map((j) => <Persona key={j} id={ID} x={x - 34 + j * 68} y={390} s={0.45} cuerpo={[ROSA, VIOLETA][j]} />)}
              {k === 2 && <Caja x={x} y={390} w={110} h={70} />}
              {k === 3 && <Hoja x={x} y={320} w={72} h={100} lineas={4} />}
              <Txt x={x} y={440} textAnchor="middle" fontSize={24} fill={c.texto}>{txt}</Txt>
            </g>
          );
        })}
        <Persona id={ID} x={lerp(120, 970, avance)} y={720} s={1} cuerpo={NARANJA} />
        {t >= m('herramientas') && (
          <g opacity={e1(t, m('herramientas'))}>
            <Caja x={1060} y={720} w={110} h={60} />
            {[0, 1, 2].map((k) => { const u = sm(t, m('herramientas') + 0.2 * k, m('herramientas') + 0.2 * k + 0.6); return <rect key={k} x={lerp(1000, 1050, u) - 30} y={lerp(560, 650, u)} width={60} height={12} rx={6} fill="#64748b" transform={`rotate(${u * 200 + k * 40} ${lerp(1000, 1050, u)} ${lerp(560, 650, u)})`} />; })}
            <Cruz x={1060} y={520} r={34} />
          </g>
        )}
        {t >= m('evidente') && <Letrero x={600} y={800} texto="Si no es un sí evidente, es un no evidente" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('evidente'))} />}
      </Toma>

      {/* 3 · dos coladores */}
      <Toma t={t} a={m('minimos')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('minimos'))}><Colador y={260} w={560} agujero={22} color={AZUL_M} texto="3 mínimos" c={c} /></g>
        <g opacity={e1(t, m('extremos'))}><Colador y={480} w={440} agujero={13} color={ROSA} texto="3 extremos" c={c} /></g>
        {Array.from({ length: 8 }, (_, k) => {
          const u = ((t - m('minimos')) * 0.35 + k / 8) % 1;
          const r = 10 + (k % 4) * 4;
          const tope = r > 20 ? 0.3 : t >= m('extremos') && r > 12 ? 0.55 : 1;
          const y = lerp(150, 760, Math.min(u, tope));
          const x = 420 + (azar(k) * 360);
          return <circle key={k} cx={x + (u > tope ? (k % 2 ? 1 : -1) * (u - tope) * 500 : 0)} cy={y} r={r} fill={tope === 1 ? VERDE : NARANJA} opacity={u > tope ? 1 - (u - tope) * 3 : 1} />;
        })}
        {t >= m('nuevo') && (
          <g opacity={e1(t, m('nuevo'))}>
            <Persona id={ID} x={150} y={760} s={0.85} cuerpo={VERDE} />
            <Burbuja x={170} y={580} w={250} texto="¿Cumple los criterios?" u={sm(t, m('nuevo'), m('nuevo') + 0.8)} c={c} id={ID} tam={26} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
