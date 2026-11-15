import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, Embudo, Telefono, Medidor, Burbuja, Balanza, Billete, Regalo, Bombilla, Megafono, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Gana quien puede pagar más.
 * Toma 1: los dos sospechosos de siempre: dos medidores, tráfico y conversión, con la aguja baja.
 * Toma 2: el caso de Drew Canole: su teléfono con 1.200.000 seguidores manda visitas por un conector a su embudo; el
 * cambio de la plataforma deja el flujo en un hilo (−90 %) y una balanza muestra el anuncio ($116) pesando más que el
 * producto ($97). Drew pregunta por más tráfico o más conversión.
 * Toma 3: el diagnóstico: el problema estaba en el embudo (anuncio, oferta y ventas extra).
 * Toma 4: la subasta de Kennedy: un cliente sobre un podio y dos postores; la paleta verde sube hasta $3 y el postor de
 * $1 sale de la subasta mientras el cliente se va con quien pagó más.
 * Toma 5: la ruta de la clase: un camino con tres estaciones (oferta, creencia, atención) que recorre un viajero.
 */

const ID = 'br02', P = 'br-escalar';

const Paleta: React.FC<{ x: number; y: number; alto: number; color: string; monto: string }> = ({ x, y, alto, color, monto }) => (
  <g>
    <rect x={x - 5} y={y - alto} width={10} height={alto} rx={5} fill="#a16207" />
    <circle cx={x} cy={y - alto} r={44} fill={color} style={sombra(0.2, 4, 8)} />
    <Txt x={x} y={y - alto + 12} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>{monto}</Txt>
  </g>
);

export const EscalarBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('culpa'), 'Se culpa al tráfico'], [m('drew'), 'Drew Canole · FitLife'], [m('ciento'), 'Pagar 116 para vender 97'],
    [m('diagnostico'), 'Era el embudo'], [m('kennedy'), 'La subasta'], [m('partes'), 'La ruta de la clase'],
  ];
  const cae = sm(t, m('noventa'), m('noventa') + 1.2);
  const incB = lerp(0, -12, sm(t, m('ciento') + 0.4, m('ciento') + 1.4));
  const puja = sm(t, m('pujar'), m('pujar') + 1.5);
  const sale = sm(t, m('subasta'), m('subasta') + 1.6);
  const ruta = sm(t, m('oferta') - 0.5, m('atencion') + 1.2);
  const viajero = 120 + 960 * ruta;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Gana quien puede pagar más">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Los sospechosos */}
      <Toma t={t} a={0} b={m('drew')} cy={470}>
        {(['Tráfico', 'Conversión'] as const).map((txt, k) => (
          <Tarjeta key={txt} x={150 + k * 500} y={200} w={400} h={350} titulo={txt} c={c} id={ID} op={E('culpa', 0.6, k * 0.4)} acento={k ? ROSA : AZUL_M}>
            <Medidor x={200} y={250} r={130} v={0.18 + 0.04 * Math.sin(t * 3 + k)} color={k ? ROSA : AZUL_M} c={c} />
          </Tarjeta>
        ))}
        <Persona id={ID} x={600} y={700} s={0.7} cuerpo={GRIS} />
        <Pastilla x={600} y={770} texto={movil ? '¿Culpables?' : '¿De verdad son los culpables?'} fondo={VIOLETA} tam={24} op={E('caso')} />
      </Toma>

      {/* 2 · Drew Canole */}
      <Toma t={t} a={m('drew')} b={m('diagnostico')} cy={470}>
        <Persona id={ID} x={150} y={720} s={0.8} cuerpo={VERDE} />
        <Pastilla x={150} y={780} texto="Drew Canole" fondo={VERDE} tam={24} op={E('drew')} />
        <g opacity={E('seguidores')}>
          <Telefono x={330} y={590} s={0.75} widgets={6} />
          <Cifra x={330} y={470} valor={1200000} u={sm(t, m('seguidores'), m('seguidores') + 1.4)} tam={40} color={AZUL_M} miles />
        </g>
        <Conector x1={380} y1={570} x2={570} y2={540} u={sm(t, m('seguidores') + 0.6, m('seguidores') + 1.2)} t={t} color={AZUL_M} puntos={Math.round(lerp(9, 1, cae))} grosor={lerp(7, 3, cae)} curva={-0.15} />
        <g opacity={E('seguidores', 0.5, 0.8)}>
          <path d="M 560 470 H 700 L 652 545 V 610 H 608 V 545 Z" fill={`url(#${ID}-marca)`} />
          <Txt x={630} y={650} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>Su embudo</Txt>
        </g>
        <Pastilla x={470} y={680} texto="−90 % de tráfico" fondo={ROJO_M} tam={24} op={E('noventa')} />
        {t >= m('ciento') - 0.1 && (
          <g opacity={E('ciento')}>
            <Balanza x={950} y={780} inc={incB} c={c} brazo={150} alto={250}
              izq={<g>{[0, 1, 2].map((k) => <Billete key={k} x={-16 + k * 14} y={-24 - k * 10} s={0.55} color={ROJO_M} rot={-6 + k * 5} />)}</g>}
              der={<g>{[0, 1].map((k) => <Billete key={k} x={-8 + k * 14} y={-24 - k * 10} s={0.55} color={VERDE} rot={4 - k * 6} />)}</g>} />
            <Pastilla x={800} y={420} texto="Anuncio $116" fondo={ROJO_M} tam={24} />
            <Pastilla x={1100} y={420} texto="Precio $97" fondo={VERDE} tam={24} />
          </g>
        )}
        {t >= m('pedia') && <Burbuja x={150} y={330} w={movil ? 380 : 470} texto="¿Me falta tráfico o conversión?" u={sm(t, m('pedia'), m('pedia') + 1.2)} c={c} id={ID} tam={26} />}
      </Toma>

      {/* 3 · El diagnóstico */}
      <Toma t={t} a={m('diagnostico')} b={m('kennedy')} cy={470}>
        <g opacity={E('diagnostico')}>
          <Embudo x={600} y={230} w={560} alto={90} tam={28} franjas={[{ n: 'Anuncio', color: NARANJA }, { n: 'Oferta', color: ROSA }, { n: 'Ventas extra', color: VIOLETA }]} />
          <circle cx={600} cy={390} r={170 + 10 * Math.sin(t * 4)} fill={`url(#${ID}-halo)`} opacity={0.6} />
          <Pastilla x={600} y={660} texto="Problema de embudo" fondo={VIOLETA} tam={32} op={E('diagnostico', 0.6, 0.6)} />
        </g>
      </Toma>

      {/* 4 · La subasta */}
      <Toma t={t} a={m('kennedy')} b={m('partes')} cy={470}>
        <g opacity={E('kennedy')}>
          <rect x={500} y={560} width={200} height={150} rx={14} fill={c.panel2} style={sombra(0.15, 6, 12)} />
          <rect x={500} y={560} width={200} height={14} rx={7} fill={`url(#${ID}-marcaH)`} />
          <Txt x={600} y={650} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>Cliente</Txt>
          <Persona id={ID} x={600 + 120 * sale} y={556} s={0.75} cuerpo={AZUL_M} />
          <rect x={80} y={708} width={1040} height={10} rx={5} fill={c.apagado} />
          <g transform={`translate(${-200 * sale} 0)`} opacity={1 - 0.75 * sale}>
            <Persona id={ID} x={250} y={708} s={0.8} cuerpo={GRIS} />
            <Paleta x={300} y={600} alto={lerp(120, 140, puja)} color={GRIS} monto="$1" />
            {sale > 0.1 && <Cara id={ID} x={250} y={600} r={20} e={-1} />}
          </g>
          <Persona id={ID} x={950} y={708} s={0.8} cuerpo={VERDE} corbata />
          <Paleta x={900} y={600} alto={lerp(120, 300, puja)} color={VERDE} monto={puja > 0.5 ? '$3' : '$1'} />
        </g>
        <Pastilla x={600} y={210} texto={movil ? 'Gana quien paga más' : 'Gana quien puede gastar más por cliente'} fondo={VERDE} tam={30} op={E('gana')} />
        <Pastilla x={260} y={420} texto="Fuera" fondo={ROJO_M} tam={28} op={E('subasta', 0.5, 0.6)} />
      </Toma>

      {/* 5 · La ruta */}
      <Toma t={t} a={m('partes')} b={fin + 1} cy={470}>
        <path d="M 120 640 C 300 560 420 720 600 640 S 900 560 1080 640" stroke={c.apagado} strokeWidth={22} fill="none" strokeLinecap="round" opacity={E('partes')} />
        <path d="M 120 640 C 300 560 420 720 600 640 S 900 560 1080 640" stroke={`url(#${ID}-marcaH)`} strokeWidth={10} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${ruta} 1`} />
        {([['oferta', 'La oferta', NARANJA, 300], ['creencia', 'La creencia', AMBAR, 600], ['atencion', 'La atención', AZUL_M, 900]] as const).map(([n, txt, col, x], k) => (
          <g key={n}>
            <Tarjeta x={x - 120} y={230} w={240} h={250} titulo={txt} c={c} id={ID} op={E(n)} s={0.85 + 0.15 * E(n)} acento={col}>
              {k === 0 && <Regalo x={120} y={170} s={1} color={NARANJA} />}
              {k === 1 && <Bombilla x={120} y={160} s={0.9} id={ID} t={t} luz={E(n)} />}
              {k === 2 && <Megafono x={110} y={160} s={0.9} habla={E(n)} t={t} />}
            </Tarjeta>
            <Conector x1={x} y1={480} x2={x} y2={k === 1 ? 630 : 610} u={E(n)} t={t} color={col} puntos={2} grosor={4} />
          </g>
        ))}
        <Persona id={ID} x={viajero} y={640 - 40 * Math.sin((viajero - 120) / 160)} s={0.55} cuerpo={NARANJA} />
      </Toma>
    </Lienzo>
  );
};
