import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, Libro, Tarjeta, Conector, Balanza, Pastilla, LogoCF, pop, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Portada: el autor, sus libros y cómo leerlos.
 * Toma 1: la paradoja: una tarjeta compara lo que cuesta conseguir un cliente con lo que deja el primer mes (pierde) y
 * un conector la une al gráfico de crecimiento, donde quien gasta más termina adelantando a quien gasta menos.
 * Toma 2: la vida del autor como un camino: Brunson camina por una línea de tiempo con cuatro estaciones dibujadas
 * (luchador, pistola de papas, ClickFunnels, cien mil clientes).
 * Toma 3: la trilogía cae a un estante y Dan Kennedy, a un costado, queda unido al primer libro por su prólogo.
 * Toma 4: cómo leerla: una balanza con lo práctico a la izquierda (sin auditar, vende el software, sin garantía) y
 * los estudios con respaldo a la derecha; arriba, la pieza que falta: la medición del método completo.
 */

const ID = 'br01', P = 'br-portada';

export const PortadaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('empresas'), 'Gastar más y crecer más'], [m('autor'), 'Russell Brunson'], [m('trilogia'), 'Una trilogía'],
    [m('criterio'), 'Cómo leerla'], [m('pares'), 'Lo que tiene respaldo'], [m('falta'), 'Lo que no se ha medido'],
  ];

  // Toma 1: barras y curvas.
  const gasto = sm(t, m('empresas') + 0.3, m('empresas') + 1.6), deja = sm(t, m('empresas') + 1.2, m('empresas') + 2.4);
  const pierde = sm(t, m('empresas') + 2.4, m('empresas') + 3);
  const curva = sm(t, m('crecen'), m('crecen') + 2.2);
  const ptsA = Array.from({ length: 31 }, (_, k) => { const x = k / 30; return [60 + 400 * x, 360 - 270 * Math.max(0, 1.25 * x * x - 0.25 * x)] as const; });
  const ptsB = Array.from({ length: 31 }, (_, k) => { const x = k / 30; return [60 + 400 * x, 360 - 150 * x] as const; });
  const trazo = (p: readonly (readonly [number, number])[], u: number) => p.slice(0, Math.max(2, Math.round(p.length * u))).map(([x, y], k) => `${k ? 'L' : 'M'} ${x} ${y}`).join(' ');

  // Toma 2: el camino del autor.
  const EST: [string, number, string, string][] = [['luchador', 220, 'Luchador', 'Universidad'], ['papas', 460, 'Pistola de papas', '2002'], ['cofundo', 700, 'ClickFunnels', '2014'], ['cienmil', 940, 'Clientes', '2020']];
  let walkerX = lerp(110, 220, sm(t, m('autor'), m('luchador')));
  EST.forEach(([n, x], k) => { if (k > 0 && t >= m(n) - 1) walkerX = lerp(EST[k - 1][1], x, sm(t, m(n) - 1, m(n) + 0.2)); });

  // Toma 4: la balanza.
  const pr = E('practicante') + E('vende') + E('garantia');
  const es = E('cero') + E('anclaje') + E('reactancia');
  const inc = lerp(0, -9, pr / 3) + lerp(0, 7, es / 3);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Los secretos de Brunson">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Gastar más que el primer mes y crecer más */}
      <Toma t={t} a={0} b={m('autor')} cy={470}>
        <Tarjeta x={70} y={210} w={460} h={430} titulo="Por cliente, primer mes" c={c} id={ID} op={E('empresas', 0.6, -0.4)}>
          <Txt x={40} y={130} fontSize={26} fill={c.texto} peso={800}>Cuesta conseguirlo</Txt>
          <rect x={40} y={150} width={380 * gasto} height={54} rx={14} fill={ROJO_M} />
          <Txt x={40} y={270} fontSize={26} fill={c.texto} peso={800}>Te deja</Txt>
          <rect x={40} y={290} width={250 * deja} height={54} rx={14} fill={VERDE} />
          <rect x={290} y={290} width={130 * pierde} height={54} rx={14} fill={ROJO_M} opacity={0.25} />
          <Txt x={355} y={395} textAnchor="middle" fontSize={26} fill={ROJO_M} peso={800} opacity={pierde}>Pierde</Txt>
        </Tarjeta>
        <Conector x1={530} y1={425} x2={600} y2={425} u={sm(t, m('crecen') - 0.4, m('crecen'))} t={t} color={NARANJA} />
        <Tarjeta x={600} y={210} w={530} h={430} titulo="Y aun así crece más" c={c} id={ID} op={E('crecen', 0.6, -0.4)}>
          <path d="M 60 380 H 480 M 60 380 V 90" stroke={c.apagado} strokeWidth={4} />
          <path d={trazo(ptsB, curva)} transform="translate(0 20)" stroke={GRIS} strokeWidth={8} fill="none" strokeLinecap="round" />
          <path d={trazo(ptsA, curva)} transform="translate(0 20)" stroke={`url(#${ID}-marcaH)`} strokeWidth={9} fill="none" strokeLinecap="round" />
          <Pastilla x={360} y={92} texto="Gasta más" fondo={NARANJA} tam={24} op={sm(t, m('crecen') + 2.2, m('crecen') + 2.7)} />
          <Txt x={470} y={245} textAnchor="end" fontSize={24} fill={c.tenue} peso={800} opacity={sm(t, m('crecen') + 2.2, m('crecen') + 2.7)}>Gasta menos</Txt>
        </Tarjeta>
      </Toma>

      {/* 2 · El camino del autor */}
      <Toma t={t} a={m('autor')} b={m('trilogia')} cy={470}>
        <rect x={110} y={640} width={980} height={14} rx={7} fill={c.apagado} />
        <rect x={110} y={640} width={Math.max(0, walkerX - 110)} height={14} rx={7} fill={`url(#${ID}-marcaH)`} />
        {EST.map(([n, x, titulo, anio], k) => {
          const u = E(n, 0.6);
          const col = [ROJO_M, AMBAR, ROSA, AZUL_M][k];
          return (
            <g key={n}>
              <Conector x1={x} y1={500} x2={x} y2={632} u={u} t={t} color={col} puntos={2} grosor={4} />
              <Pastilla x={x} y={705} texto={anio} fondo={col} tam={24} op={u} />
              <Tarjeta x={x - 108} y={200} w={216} h={300} titulo={movil ? undefined : titulo} c={c} id={ID} op={u} s={0.8 + 0.2 * u} tam={22} acento={col}>
                {k === 0 && <g transform="translate(108 200)"><ellipse rx={92} ry={32} fill="#fde68a" /><ellipse rx={66} ry={22} fill="none" stroke={ROJO_M} strokeWidth={5} /><Persona id={ID} x={-26} y={6} s={0.5} cuerpo={ROJO_M} /><Persona id={ID} x={30} y={12} s={0.5} cuerpo={AZUL_M} /></g>}
                {k === 1 && <g transform="translate(108 190)">
                  <circle cx={-30} cy={20} r={54} fill="#e2e8f0" /><circle cx={-30} cy={20} r={54} fill={`url(#${ID}-marca)`} opacity={0.25 + 0.15 * Math.sin(t * 3)} /><circle cx={-30} cy={20} r={12} fill={c.panel} />
                  <rect x={0} y={-40} width={90} height={24} rx={10} fill={GRIS} transform="rotate(-30 0 -28)" />
                  {(() => { const p = (t * 0.7) % 1; return <ellipse cx={74 + p * 20} cy={-80 - p * 40} rx={16} ry={11} fill="#a16207" opacity={1 - p} />; })()}
                </g>}
                {k === 2 && <g transform="translate(108 190)">
                  <rect x={-86} y={-52} width={172} height={110} rx={10} fill="#1f2937" /><rect x={-100} y={58} width={200} height={14} rx={6} fill="#475569" />
                  <LogoCF x={0} y={3} s={0.62} gira={t * 2} />
                  {[0, 1, 2].map((j) => <circle key={j} cx={-40 + j * 40} cy={-86} r={14} fill={`url(#${ID}-cara)`} opacity={sm(t, m('cofundo') + j * 0.3, m('cofundo') + j * 0.3 + 0.5)} />)}
                </g>}
                {k === 3 && <g transform="translate(108 170)">
                  <Cifra x={0} y={-20} valor={100000} u={sm(t, m('cienmil'), m('cienmil') + 1.4)} pre="+" tam={36} color={VERDE} miles />
                  <path d="M -60 10 H 60 L 18 60 V 96 H -18 V 60 Z" fill={`url(#${ID}-marca)`} />
                  {Array.from({ length: 5 }, (_, j) => { const p = (t * 0.8 + j / 5) % 1; return <circle key={j} cx={lerp(-80 + j * 40, 0, p)} cy={lerp(-60, 80, p)} r={6} fill={VERDE} opacity={Math.sin(Math.PI * p)} />; })}
                </g>}
              </Tarjeta>
            </g>
          );
        })}
        <Persona id={ID} x={walkerX} y={632} s={0.62} cuerpo={NARANJA} />
        <Pastilla x={700} y={785} texto={movil ? 'Software de embudos' : 'Software para armar embudos de venta'} fondo={VIOLETA} tam={24} op={E('embudos')} />
      </Toma>

      {/* 3 · La trilogía y el prólogo */}
      <Toma t={t} a={m('trilogia')} b={m('criterio')} cy={470}>
        <rect x={320} y={640} width={720} height={22} rx={8} fill="#a16207" />
        <rect x={350} y={662} width={22} height={90} fill="#92400e" /><rect x={988} y={662} width={22} height={90} fill="#92400e" />
        {([['2015', NARANJA, 'Punto com'], ['2017', ROSA, 'Expertos'], ['2020', AZUL_M, 'Tráfico']] as const).map(([anio, col, nom], k) => {
          const u = sm(t, m('trilogia') + k * 0.8, m('trilogia') + k * 0.8 + 0.6);
          return (
            <g key={anio} opacity={Math.min(1, u * 2)}>
              <g transform={`translate(0 ${(1 - u) * -180})`}><Libro x={480 + k * 200} y={640} color={col} titulo={anio} autor="" s={0.9} c={c} /></g>
              <Txt x={480 + k * 200} y={720} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>{nom}</Txt>
            </g>
          );
        })}
        {t >= m('kennedy') && (
          <g opacity={E('kennedy')}>
            <Persona id={ID} x={170} y={640} s={0.75} cuerpo={GRIS} corbata />
            <Pastilla x={190} y={330} texto={movil ? 'Prólogo' : 'Prólogo: Dan Kennedy'} fondo={VIOLETA} tam={26} />
            <Conector x1={215} y1={530} x2={395} y2={470} u={sm(t, m('kennedy') + 0.3, m('kennedy') + 1)} t={t} color={VIOLETA} curva={0.2} />
          </g>
        )}
      </Toma>

      {/* 4 · Cómo leerla */}
      <Toma t={t} a={m('criterio')} b={fin + 1} cy={470}>
        <Balanza x={600} y={800} inc={inc} c={c} brazo={200} alto={300} op={E('criterio')}
          izq={<g>{[0, 1, 2].map((k) => { const u = [E('practicante'), E('vende'), E('garantia')][k]; return <rect key={k} x={-60 + k * 30} y={-36 - (1 - u) * 120} width={44} height={56} rx={6} fill={[GRIS, ROJO_M, AMBAR][k]} opacity={Math.min(1, u)} transform={`rotate(${(k - 1) * 8})`} />; })}</g>}
          der={<g>{[0, 1, 2].map((k) => { const u = [E('cero'), E('anclaje'), E('reactancia')][k]; return <g key={k} opacity={Math.min(1, u)} transform={`translate(${-50 + k * 50} ${-36 - (1 - u) * 120})`}><rect x={-20} y={0} width={40} height={52} rx={5} fill={c.panel2} /><path d="M -10 16 H 10 M -10 26 H 10 M -10 36 H 4" stroke={AZUL_M} strokeWidth={4} /></g>; })}</g>} />
        <Txt x={200} y={250} textAnchor="middle" fontSize={28} fill={c.texto} peso={800} opacity={E('practicante')}>{movil ? 'Práctica' : 'Conocimiento práctico'}</Txt>
        {([['practicante', 'Sin auditar', 'Sin auditar'], ['vende', 'Vende el software', 'Vende'], ['garantia', 'Sin garantía', 'Sin garantía']] as const).map(([n, txt, corto], k) => <Pastilla key={n} x={200} y={310 + k * (movil ? 84 : 64)} texto={movil ? corto : txt} fondo={[GRIS, ROJO_M, AMBAR][k]} tam={24} op={E(n)} />)}
        <Txt x={1000} y={250} textAnchor="middle" fontSize={28} fill={c.texto} peso={800} opacity={E('pares')}>Con respaldo</Txt>
        {([['cero', 'Precio cero · 2007', '2007'], ['anclaje', 'Anclaje · 1974', '1974'], ['reactancia', 'Reactancia · 1966', '1966']] as const).map(([n, txt, corto], k) => <Pastilla key={n} x={1000} y={310 + k * (movil ? 84 : 64)} texto={movil ? corto : txt} fondo={AZUL_M} tam={24} op={E(n)} />)}
        {t >= m('falta') && (
          <g opacity={E('falta')}>
            <rect x={380} y={170} width={440} height={100} rx={20} fill={c.panel} stroke={ROJO_M} strokeWidth={4} strokeDasharray="14 10" />
            <Txt x={600} y={212} textAnchor="middle" fontSize={26} fill={ROJO_M} peso={800}>Método completo</Txt>
            <Txt x={600} y={248} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>{movil ? 'sin medir' : 'sin medición independiente'}</Txt>
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
