import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Telefono, Barra, Libro, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Más ganchos, más alcance.
 * Toma 1: Graziosi frente a Brunson: dos pilas de libros por semana (5.000 contra 1.200) y, al abrir las cuentas, la
 * diferencia: cuatro veces más anuncios (tarjetitas que salen del teléfono).
 * Toma 2: el océano de personas con motivos distintos: un solo anzuelo atrae a pocos; muchos anzuelos atraen a muchos.
 * Toma 3: la regla 80/20 como dos barras y el ensayo de 100 dólares: la suma de lo que vuelve (7 × 7 + 2 × 37 + 100).
 */

const ID = 'br18', P = 'br-creatividad';

export const CreatividadBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('graziosi'), 'Graziosi y Brunson'], [m('cuatro'), 'Cuatro veces más anuncios'], [m('oceano'), 'Un océano de motivos'],
    [m('ochenta'), 'La regla 80/20'], [m('ensayo'), 'Un ensayo de 100 dólares'],
  ];
  const sale = sm(t, m('cuatro'), m('cuatro') + 2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Más ganchos, más alcance">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Graziosi y Brunson */}
      <Toma t={t} a={0} b={m('oceano')} cy={470}>
        {[0, 1].map((k) => {
          const x = k === 0 ? 300 : 900, alto = k === 0 ? 1 : 0.24;
          return (
            <g key={k} opacity={e1(t, k === 0 ? m('graziosi') : m('mil'))}>
              <Persona id={ID} x={x - 120} y={640} s={0.65} cuerpo={k === 0 ? VIOLETA : NARANJA} corbata={k === 0} />
              {Array.from({ length: Math.round(10 * alto) }, (_, j) => <rect key={j} x={x - 20} y={600 - j * 34} width={140} height={28} rx={6} fill={k === 0 ? VIOLETA : NARANJA} opacity={0.85 - (j % 2) * 0.15} />)}
              <Cifra x={x + 50} y={k === 0 ? 220 : 520} valor={k === 0 ? 5000 : 1200} u={1} tam={48} color={k === 0 ? VIOLETA : NARANJA} miles />
              <Letrero x={x} y={720} texto={k === 0 ? 'Dean Graziosi' : 'Brunson'} fondo={k === 0 ? VIOLETA : NARANJA} id={ID} tam={26} />
            </g>
          );
        })}
        {t >= m('cuatro') - 0.1 && (
          <g opacity={e1(t, m('cuatro'))}>
            <Telefono x={600} y={460} s={0.9} widgets={2} />
            {Array.from({ length: 12 }, (_, k) => {
              const u = Math.max(0, Math.min(1, sale * 12 - k));
              const a = (k / 12) * Math.PI * 2;
              return u > 0.01 ? <rect key={k} x={600 + Math.cos(a) * 125 * u - 24} y={460 + Math.sin(a) * 150 * u - 18} width={48} height={36} rx={8} fill={[NARANJA, ROSA, AZUL_M, VERDE][k % 4]} opacity={u} /> : null;
            })}
            <Letrero x={600} y={190} texto="×4 creatividades" fondo={VERDE} id={ID} tam={30} />
          </g>
        )}
      </Toma>

      {/* 2 · Muchos anzuelos */}
      <Toma t={t} a={m('oceano')} b={m('ochenta')} cy={470}>
        <g opacity={e1(t, m('oceano'))}>
          <rect x={90} y={360} width={1020} height={400} rx={30} fill={AZUL_M} opacity={0.18} />
          {Array.from({ length: 24 }, (_, k) => {
            const x = 140 + (k % 8) * 128, y = 430 + Math.floor(k / 8) * 110 + 10 * Math.sin(t * 2 + k);
            const atrapado = t >= m('agota') ? k % 2 === 0 : k === 3;
            return <g key={k}><ellipse cx={x} cy={y} rx={34} ry={18} fill={atrapado ? NARANJA : GRIS} opacity={atrapado ? 1 : 0.6} /><path d={`M ${x + 30} ${y} l 22 -14 v 28 Z`} fill={atrapado ? NARANJA : GRIS} opacity={atrapado ? 1 : 0.6} /></g>;
          })}
          {(t >= m('agota') ? [0, 1, 2, 3, 4, 5, 6, 7] : [3]).map((k) => <path key={k} d={`M ${140 + k * 128} 200 V ${400}`} stroke={c.texto} strokeWidth={3} opacity={0.6} />)}
          <Letrero x={600} y={805} texto={t >= m('agota') ? 'Muchos ganchos' : 'Un solo gancho se agota'} fondo={t >= m('agota') ? VERDE : GRIS} id={ID} tam={28} />
        </g>
      </Toma>

      {/* 3 · 80/20 y el ensayo */}
      <Toma t={t} a={m('ochenta')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('ochenta'))}>
          <rect x={100} y={200} width={480} height={540} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <rect x={140} y={640} width={400} height={6} rx={3} fill={c.apagado} />
          <Barra x={240} y={640} w={120} hMax={340} valor={80} u={sm(t, m('ochenta'), m('ochenta') + 1)} color={AZUL_M} rotulo={movil ? 'Presup.' : 'Presupuesto'} c={c} />
          <Barra x={440} y={640} w={120} hMax={340} valor={20} u={sm(t, m('ochenta'), m('ochenta') + 1.4)} color={VERDE} rotulo={movil ? 'Result.' : 'Resultados'} c={c} />
          {t >= m('llenan') && <Letrero x={340} y={780} texto="Llena el retargeting" fondo={AZUL_M} id={ID} tam={24} op={e1(t, m('llenan'))} />}
        </g>
        {t >= m('ensayo') && (
          <g opacity={e1(t, m('ensayo'))}>
            <rect x={640} y={200} width={480} height={540} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Cifra x={880} y={290} valor={100} u={1} pre="−$" tam={52} color={ROJO_M} />
            {t >= m('cien') && ([['7 × $7', 49], ['2 × $37', 74], ['1 × $100', 100]] as const).map(([txt, v], k) => (
              <g key={txt} opacity={e1(t, m('cien') + k * 0.5)}>
                <Txt x={700} y={380 + k * 70} fontSize={30} fill={c.texto} peso={800}>{txt}</Txt>
                <Txt x={1080} y={380 + k * 70} textAnchor="end" fontSize={30} fill={VERDE} peso={800}>+${v}</Txt>
              </g>
            ))}
            <rect x={690} y={580} width={390} height={4} rx={2} fill={c.apagado} />
            {t >= m('total') && <Cifra x={880} y={660} valor={223} u={sm(t, m('total'), m('total') + 0.8)} pre="$" tam={64} color={VERDE} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
