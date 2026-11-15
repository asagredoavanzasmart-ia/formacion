import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, Sello, Pescador, Tarjeta, Conector, Pastilla, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Activación y marca.
 * Toma 1: Binet y Field: un archivo de cerca de mil casos; de él sale un gráfico de ventas en el tiempo donde la marca
 * es una base que sube despacio y la activación son picos encima de esa base; al lado, dos donas con el reparto
 * (consumo masivo 60/40, empresas 46/54).
 * Toma 2: John Dawes (2021): de veinte compradores solo uno está comprando hoy; un pescador en la orilla lo engancha con
 * su caña (el embudo pesca en ese 5 %). Los otros diecinueve guardan la marca en una burbuja de recuerdo: la
 * disponibilidad mental de Byron Sharp.
 */

const ID = 'br24', P = 'br-marca';

const Dona: React.FC<{ x: number; y: number; marca: number; u: number; c: ReturnType<typeof tono> }> = ({ x, y, marca, u, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={80} fill="none" stroke={NARANJA} strokeWidth={40} opacity={u > 0 ? 1 : 0.2} />
    <circle r={80} fill="none" stroke={VIOLETA} strokeWidth={40} pathLength={1} strokeDasharray={`${(marca / 100) * u} 1`} transform="rotate(-90)" />
    <Txt x={0} y={10} textAnchor="middle" fontSize={30} fill={c.texto} peso={800}>{`${marca}/${100 - marca}`}</Txt>
  </g>
);

export const MarcaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('binet'), 'Binet y Field'], [m('dos'), 'Dos mecánicas'], [m('sesenta'), 'Cómo repartir'],
    [m('dawes'), 'John Dawes (2021)'], [m('pesca'), 'El 5 % y el 95 %'], [m('justos'), 'Para ser justos'],
  ];
  const act = sm(t, m('activacion'), m('activacion') + 2.5);
  const mar = sm(t, m('marca'), m('marca') + 2.5);
  const base = (x: number) => 40 + 170 * x * x * mar;
  const pico = (x: number) => act * 150 * Math.pow(Math.max(0, Math.sin(x * Math.PI * 7)), 8);
  const W = 520, H0 = 330;
  const traza = (fn: (x: number) => number) => Array.from({ length: 81 }, (_, k) => { const x = k / 80; return `${k ? 'L' : 'M'} ${40 + x * W} ${H0 - fn(x)}`; }).join(' ');
  const pesca = sm(t, m('pesca'), m('pesca') + 1.2);
  const BUY = 2;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Activación y marca">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Dos mecánicas y el reparto */}
      <Toma t={t} a={0} b={m('dawes')} cy={470}>
        <g opacity={E('binet') * (1 - E('dos'))}>
          {Array.from({ length: 4 }, (_, k) => <g key={k} transform={`translate(${380 + k * 120} 330)`}><rect x={-50} y={0} width={100} height={260} rx={10} fill="#94a3b8" /><rect x={-40} y={20 + (k % 2) * 10} width={80} height={60} rx={6} fill="#cbd5e1" /><rect x={-40} y={100} width={80} height={60} rx={6} fill="#cbd5e1" /><rect x={-40} y={180} width={80} height={60} rx={6} fill="#cbd5e1" /></g>)}
          <Cifra x={560} y={280} valor={1000} u={sm(t, m('mil'), m('mil') + 1.2)} pre="≈ " suf=" casos" tam={46} color={AZUL_M} miles />
        </g>
        <Tarjeta x={60} y={210} w={600} h={470} titulo={movil ? 'Ventas en el tiempo' : 'Ventas a lo largo del tiempo'} c={c} id={ID} op={E('dos')}>
          <path d={`M 40 ${H0} H ${40 + W}`} stroke={c.apagado} strokeWidth={4} transform="translate(0 30)" />
          <g transform="translate(0 30)">
            <path d={`${traza(base)} L ${40 + W} ${H0} L 40 ${H0} Z`} fill={VIOLETA} opacity={0.25 + 0.25 * mar} />
            <path d={traza((x) => base(x) + pico(x))} stroke={NARANJA} strokeWidth={6} fill="none" strokeLinejoin="round" opacity={act > 0 ? 1 : 0} />
          </g>
          <Pastilla x={180} y={420} texto={movil ? 'Picos' : 'Activación: picos'} fondo={NARANJA} tam={22} op={E('picos')} />
          <Pastilla x={430} y={420} texto={movil ? 'Marca' : 'Marca: base que sube'} fondo={VIOLETA} tam={22} op={E('marca')} />
        </Tarjeta>
        <g opacity={E('sesenta')}>
          <Dona x={890} y={330} marca={60} u={sm(t, m('sesenta'), m('sesenta') + 1)} c={c} />
          <Txt x={890} y={455} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>{movil ? 'Consumo' : 'Consumo masivo'}</Txt>
        </g>
        <g opacity={E('b2b')}>
          <Dona x={890} y={600} marca={46} u={sm(t, m('b2b'), m('b2b') + 1)} c={c} />
          <Txt x={890} y={725} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>{movil ? 'Empresas' : 'Entre empresas'}</Txt>
        </g>
        <Txt x={890} y={790} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800} opacity={E('sesenta')}>marca / activación</Txt>
      </Toma>

      {/* 2 · El 5 % y el 95 % */}
      <Toma t={t} a={m('dawes')} b={fin + 1} cy={470}>
        <path d="M 60 820 Q 140 760 260 800 L 260 860 H 60 Z" fill="#65a30d" opacity={E('pesca')} />
        {t >= m('pesca') - 0.2 && <Pescador id={ID} x={150} y={800} hx={lerp(520, 470, pesca)} hy={lerp(380, 440, pesca)} c={c} s={0.75} tira={pesca} op={E('pesca', 0.5, -0.2)} />}
        {Array.from({ length: 20 }, (_, k) => {
          const x = 380 + (k % 10) * 78, y = 560 + Math.floor(k / 10) * 210;
          const compra = k === BUY;
          const enCinco = t >= m('cinco');
          const dx = compra ? -70 * pesca : 0, dy = compra ? -50 * pesca : 0;
          return (
            <g key={k} opacity={E('dawes', 0.5, (k % 10) * 0.04)}>
              <Persona id={ID} x={x + dx} y={y + dy} s={0.5} cuerpo={compra && enCinco ? NARANJA : GRIS} />
              {!compra && t >= m('sharp') && <g opacity={sm(t, m('sharp') + (k % 7) * 0.12, m('sharp') + (k % 7) * 0.12 + 0.4)}><circle cx={x + 28} cy={y - 118 + 4 * Math.sin(t * 2 + k)} r={20} fill={c.panel} stroke={VIOLETA} strokeWidth={3} /><circle cx={x + 28} cy={y - 118 + 4 * Math.sin(t * 2 + k)} r={10} fill={`url(#${ID}-marca)`} /><circle cx={x + 12} cy={y - 92} r={5} fill={VIOLETA} /></g>}
            </g>
          );
        })}
        <Pastilla x={movil ? 400 : 500} y={240} texto="≈ 5 % compra hoy" fondo={NARANJA} tam={26} op={E('cinco')} />
        <Pastilla x={movil ? 920 : 880} y={240} texto={movil ? '95 %: recordarte' : '95 %: que te recuerden'} fondo={VIOLETA} tam={26} op={E('pesca', 0.5, 0.6)} />
        <Pastilla x={880} y={300} texto={movil ? 'Disponibilidad mental' : 'Disponibilidad mental · Byron Sharp'} fondo={c.panel} color={VIOLETA} tam={22} op={E('sharp')} />
        {t >= m('justos') && <Sello x={960} y={370} texto={movil ? 'Algo de marca' : 'La lista ya hace algo de marca'} u={sm(t, m('justos'), m('justos') + 0.6)} color={GRIS} tam={22} rot={-3} />}
      </Toma>
    </Lienzo>
  );
};
