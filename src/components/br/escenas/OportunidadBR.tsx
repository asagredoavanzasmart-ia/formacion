import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Persona, Sello, Coche, Balanza, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Mejora o nueva oportunidad.
 * Toma 1: dos caminos hacia la misma meta. Arriba, el auto viejo y parchado de la mejora avanza a tirones y se
 * detiene; en su camino se plantan los tres letreros que la frenan (dolor ya vivido, admitir el error, océano rojo).
 * Abajo, el vehículo nuevo de la nueva oportunidad avanza hasta la meta.
 * Toma 2: el estatus: una balanza con la imagen propia. Con la mejora pesa «me equivoqué» (cara triste); la nueva
 * oportunidad la inclina hacia «era el vehículo» (cara tranquila).
 * Toma 3: el iPod (2001): un reproductor de discos con «unas canciones más» frente al iPod que se llena con toda la
 * biblioteca; al final, el sello: el cambio debe ser real.
 */

const ID = 'br07', P = 'br-oportunidad';

export const OportunidadBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('mejora'), 'Oferta de mejora'], [m('nueva'), 'Nueva oportunidad'], [m('dificil'), 'Por qué la mejora cuesta'],
    [m('estatus'), 'El estatus'], [m('ipod'), 'El iPod'], [m('real'), 'Un cambio real'],
  ];
  // Auto viejo: avanza a tirones y se detiene.
  const av = sm(t, m('mejora'), m('mejora') + 4);
  const xViejo = lerp(170, 430, av) + (av < 1 ? 6 * Math.sin(t * 9) : 0);
  const xNuevo = lerp(170, 960, sm(t, m('nueva'), m('nueva') + 3.5));
  const SEN: [string, string, string, number, number][] = [['dificil', 'Dolor ya vivido', 'Dolor', 660, 300], ['admitir', 'Admitir el error', 'Error', 820, 230], ['rojo', 'Océano rojo', 'Rojo', 960, 300]];
  const incl = t >= m('justifica') ? lerp(-12, 12, sm(t, m('justifica'), m('justifica') + 1.4)) : lerp(0, -12, sm(t, m('estatus') + 0.6, m('estatus') + 1.6));
  const llena = sm(t, m('biblioteca'), m('biblioteca') + 2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Mejora o nueva oportunidad">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Dos caminos */}
      <Toma t={t} a={0} b={m('estatus')} cy={470}>
        <rect x={60} y={400} width={1060} height={20} rx={10} fill={c.apagado} />
        <rect x={60} y={672} width={1060} height={20} rx={10} fill={c.apagado} />
        <g>
          <rect x={1096} y={340} width={14} height={360} fill={c.texto} opacity={0.7} />
          {Array.from({ length: 9 }, (_, k) => <rect key={k} x={1110} y={340 + k * 40} width={18} height={20} fill={k % 2 ? c.texto : c.panel} opacity={0.8} />)}
          <path d="M 1110 200 V 340 M 1110 200 L 1170 222 L 1110 244 Z" stroke={c.texto} strokeWidth={6} fill={VERDE} />
          <Txt x={1103} y={190} textAnchor="end" fontSize={26} fill={VERDE} peso={800}>Meta</Txt>
        </g>
        {t >= m('mejora') - 0.1 && (
          <g opacity={E('mejora')}>
            <Coche x={xViejo} y={400} s={0.85} color={GRIS} viejo t={t} rueda={xViejo * 2} />
            <Pastilla x={170} y={230} texto="Mejora" fondo={GRIS} tam={26} />
          </g>
        )}
        {t >= m('nueva') - 0.1 && (
          <g opacity={E('nueva')}>
            <Coche x={xNuevo} y={672} s={0.85} color={NARANJA} nuevo rueda={xNuevo * 2} />
            <Pastilla x={180} y={520} texto="Nueva oportunidad" fondo={NARANJA} tam={26} />
            {[0, 1, 2].map((k) => <rect key={k} x={xNuevo - 160 - k * 30} y={612 + k * 14} width={50 - k * 10} height={5} rx={2} fill={NARANJA} opacity={(1 - sm(t, m('nueva') + 3.5, m('nueva') + 4)) * 0.6} />)}
          </g>
        )}
        {SEN.map(([n, txt, corto, x, y], k) => {
          const u = E(n, 0.6);
          return (
            <g key={n} opacity={Math.min(1, u)} transform={`translate(0 ${(1 - Math.min(1, u)) * -40})`}>
              <rect x={x - 5} y={y} width={10} height={400 - y} fill="#78350f" />
              <Pastilla x={x} y={y} texto={movil ? corto : txt} fondo={ROJO_M} tam={24} />
            </g>
          );
        })}
        {t >= m('rojo') && Array.from({ length: 5 }, (_, k) => <path key={k} d={`M ${560 + k * 110} 460 q 27 -18 55 0 q 27 18 55 0`} stroke={ROJO_M} strokeWidth={6} fill="none" opacity={0.5 * sm(t, m('rojo'), m('rojo') + 1)} transform={`translate(${12 * Math.sin(t * 2 + k)} 0)`} />)}
      </Toma>

      {/* 2 · El estatus */}
      <Toma t={t} a={m('estatus')} b={m('ipod')} cy={470}>
        <Balanza x={600} y={800} inc={incl} c={c} brazo={220} alto={300} op={E('estatus')}
          izq={<Cara id={ID} x={0} y={-30} r={38} e={-1} />}
          der={<g><Cara id={ID} x={-30} y={-30} r={38} e={1} /><Coche x={50} y={0} s={0.25} color={GRIS} viejo /></g>} />
        <Pastilla x={600} y={200} texto="¿Mi imagen sube o baja?" fondo={VIOLETA} tam={28} op={E('imagen')} />
        <Pastilla x={300} y={330} texto="«Me equivoqué»" fondo={ROJO_M} tam={26} op={E('estatus', 0.5, 0.6)} />
        <Pastilla x={900} y={330} texto={movil ? '«Era el vehículo»' : '«El problema era el vehículo»'} fondo={VERDE} tam={26} op={E('vehiculo')} />
      </Toma>

      {/* 3 · El iPod */}
      <Toma t={t} a={m('ipod')} b={fin + 1} cy={470}>
        <Tarjeta x={90} y={210} w={430} h={430} titulo={movil ? 'Más canciones' : 'Unas canciones más'} c={c} id={ID} op={E('ipod')} acento={GRIS}>
          <rect x={95} y={120} width={240} height={150} rx={20} fill="#475569" />
          <circle cx={215} cy={195} r={56} fill="#cbd5e1" /><circle cx={215} cy={195} r={14} fill="#475569" />
          <path d={`M 215 195 L ${215 + 50 * Math.cos(t * 4)} ${195 + 50 * Math.sin(t * 4)}`} stroke="#94a3b8" strokeWidth={4} />
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${130 + k * 85} 340)`}><circle r={34} fill={[ROSA, AMBAR, AZUL_M][k]} opacity={0.8} /><circle r={8} fill={c.panel} /></g>)}
        </Tarjeta>
        <Tarjeta x={680} y={210} w={430} h={430} titulo={movil ? 'Toda la biblioteca' : 'Toda la biblioteca, en el bolsillo'} c={c} id={ID} op={E('biblioteca', 0.6, -0.6)} acento={VERDE} tam={24}>
          <rect x={150} y={95} width={130} height={220} rx={24} fill="#e2e8f0" style={sombra(0.18, 6, 12)} />
          <rect x={165} y={112} width={100} height={80} rx={8} fill="#1f2937" />
          <rect x={165} y={112 + 80 * (1 - llena)} width={100} height={80 * llena} rx={8} fill={`url(#${ID}-marca)`} />
          <circle cx={215} cy={250} r={38} fill="#cbd5e1" /><circle cx={215} cy={250} r={14} fill="#e2e8f0" />
          {llena > 0 && llena < 1 && Array.from({ length: 10 }, (_, k) => { const p = (t * 0.9 + k / 10) % 1; const x0 = 40 + (k % 5) * 90; return <Txt key={k} x={lerp(x0, 215, p)} y={lerp(400, 160, p)} textAnchor="middle" fontSize={30} fill={[NARANJA, ROSA, VIOLETA, AZUL_M][k % 4]} opacity={Math.sin(Math.PI * p)} peso={800}>♪</Txt>; })}
          <Txt x={215} y={400} textAnchor="middle" fontSize={26} fill={c.tenue} peso={800}>iPod · 2001</Txt>
        </Tarjeta>
        <Txt x={600} y={440} textAnchor="middle" fontSize={64} fill={c.tenue} peso={800} opacity={E('biblioteca')}>≠</Txt>
        {t >= m('real') && <Sello x={600} y={740} texto={movil ? 'Cambio real' : 'Un cambio real, no otro nombre'} u={sm(t, m('real'), m('real') + 0.6)} color={VERDE} tam={26} rot={-3} />}
      </Toma>
    </Lienzo>
  );
};
