import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Corazon, Reloj, Gente, Barra, Burbuja, Persona, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Emoción, lógica y miedo.
 * Toma 1: tres puertas por las que entran los compradores: la del corazón (la mitad), la de la balanza (treinta por
 * ciento) y la del reloj (veinte por ciento); una fila de diez figuras se reparte entre ellas. Etiqueta: «según
 * Brunson».
 * Toma 2: los cierres de tanteo: un orador suelta un «¿cierto?» cada pocos segundos y la audiencia asiente; las barras de
 * ingreso por registrado suben de 9,45 a 16,50. Una lupa amarilla anuncia «más adelante».
 */

const ID = 'br12', P = 'br-cierres';

const Balanza: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-5} y={-80} width={10} height={80} rx={5} fill="#fff" />
    <rect x={-60} y={-84} width={120} height={8} rx={4} fill="#fff" />
    <path d="M -60 -76 l -24 40 h 48 Z M 60 -76 l -24 40 h 48 Z" fill="#fff" opacity={0.85} />
  </g>
);

export const CierresBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('tres'), 'Tres ángulos, en orden'], [m('estudio'), 'Según su experiencia'], [m('tanteo'), 'Los cierres de tanteo'], [m('adelante'), 'Con distancia'],
  ];
  const A: [string, string, string, number][] = [['emocion', 'Emoción', ROSA, 5], ['logica', 'Lógica', AZUL_M, 3], ['miedo', 'Miedo', AMBAR, 2]];
  const asiente = Math.sin(t * 7) * 6 * sm(t, m('tanteo'), m('tanteo') + 0.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Emoción, lógica y miedo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Tres puertas */}
      <Toma t={t} a={0} b={m('tanteo')} cy={470}>
        {A.map(([n, txt, col, cuantos], k) => {
          const x = 230 + k * 370;
          const on = t >= m(n) - 0.1 ? e1(t, m(n)) : t >= m('tres') ? 0.18 : 0;
          return (
            <g key={n} opacity={on}>
              <rect x={x - 150} y={200} width={300} height={400} rx={150} fill={col} style={sombra(c.sombra, 4, 12)} />
              <rect x={x - 110} y={240} width={220} height={360} rx={110} fill="#000" opacity={0.12} />
              {k === 0 && <Corazon x={x} y={380} s={1.6} color="#fff" />}
              {k === 1 && <Balanza x={x} y={430} s={1.3} />}
              {k === 2 && <Reloj x={x} y={380} r={64} t={t} vel={3} aro="#fff" />}
              <Txt x={x} y={540} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>{txt}</Txt>
              <Gente x={x - (cuantos - 1) * 22} y={720} n={cuantos} activos={cuantos} color={col} paso={44} s={0.62} />
              <Cifra x={x} y={790} valor={cuantos * 10} u={sm(t, m(n), m(n) + 1)} suf=" %" tam={40} color={col} />
            </g>
          );
        })}
        {t >= m('estudio') && <Sello x={600} y={150} texto={movil ? 'Sin estudio' : 'Según Brunson, no un estudio'} u={sm(t, m('estudio'), m('estudio') + 0.6)} color={GRIS} tam={26} rot={-3} />}
      </Toma>

      {/* 2 · Cierres de tanteo */}
      <Toma t={t} a={m('tanteo')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('tanteo'))}>
          <Persona id={ID} x={200} y={620} s={0.8} cuerpo={NARANJA} corbata />
          <Burbuja x={260} y={290} w={300} texto="«¿Cierto?»" u={(t * 0.4) % 1} c={c} id={ID} tam={34} />
          {[0, 1, 2, 3].map((k) => (
            <g key={k} transform={`translate(${470 + k * 90} ${650}) rotate(${asiente * (k % 2 ? 1 : -1)} 0 -80)`}>
              <Persona id={ID} x={0} y={0} s={0.42} cuerpo={GRIS} />
            </g>
          ))}
          {t >= m('thomas') && <Letrero x={200} y={720} texto="Ted Thomas" fondo={NARANJA} id={ID} tam={26} op={e1(t, m('thomas'))} />}
        </g>
        {t >= m('subio') - 0.3 && (
          <g opacity={e1(t, m('subio') - 0.3)}>
            <rect x={840} y={680} width={300} height={6} rx={3} fill={c.apagado} />
            {([[870, 9.45, GRIS, 'Antes', 1], [1070, 16.5, VERDE, 'Después', sm(t, m('subio'), m('subio') + 1)]] as const).map(([x, v, col, rot, u]) => { const h = (360 * v * u) / 16.5; return (<g key={rot}><rect x={x - 50} y={680 - h} width={100} height={h} rx={12} fill={col} /><Cifra x={x} y={666 - h} valor={v} u={u} dec={2} tam={34} color={c.texto} /><Txt f="a" x={x} y={718} textAnchor="middle" fontSize={26} fill={c.tenue}>{rot}</Txt></g>); })}
            {!movil && <Txt f="a" x={985} y={770} textAnchor="middle" fontSize={22} fill={c.tenue}>Dólares por registrado</Txt>}
          </g>
        )}
        {t >= m('adelante') && <Letrero x={600} y={800} texto="Con empresas: más adelante" fondo={AMBAR} id={ID} tam={26} op={e1(t, m('adelante'))} />}
      </Toma>
    </Lienzo>
  );
};
