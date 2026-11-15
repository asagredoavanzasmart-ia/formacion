import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, PersonaCara, Termometro, Hoja, Sobre, Gente, Calendario, Megafono, Regalo, Corazon, Bombilla, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La temperatura del tráfico (Eugene Schwartz).
 * Toma 1: tres personas, cada una con su termómetro y lo que sabe sobre su cabeza: la fría solo tiene una duda, la
 * cálida conoce la solución, la caliente ya quiere a la marca.
 * Toma 2: el puente entre el anuncio (un acantilado con megáfono) y la oferta (otro con un regalo): cuanto más frío el
 * tráfico, más se separan las orillas y más tablones necesita el puente; un visitante lo cruza.
 * Toma 3: el error de Brunson arriba (2,3 millones directo al embudo → −30.000 dólares y 12 ventas) y abajo el camino
 * de los otros anunciantes: artículo → boletín → oferta, con el calendario de una semana a tres meses.
 * Toma 4: Harold Kelley (1950): el mismo profesor, dos estudiantes que leyeron una ficha distinta (cálido o frío)
 * y lo evalúan con caras y estrellas opuestas.
 */

const ID = 'br06', P = 'br-temperatura';

const Estrellas: React.FC<{ x: number; y: number; n: number; u: number }> = ({ x, y, n, u }) => (
  <g>{[0, 1, 2, 3, 4].map((k) => <path key={k} transform={`translate(${x + (k - 2) * 40} ${y}) scale(0.9)`} d="M 0 -18 L 5 -6 L 18 -6 L 8 3 L 12 16 L 0 8 L -12 16 L -8 3 L -18 -6 L -5 -6 Z" fill={k < n && u > k / 5 ? AMBAR : '#cbd5e1'} />)}</g>
);

export const TemperaturaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('schwartz'), 'Tres temperaturas'], [m('puente'), 'Un puente'], [m('error'), 'El error de Brunson'],
    [m('otros'), 'El puente que funcionó'], [m('kelley'), 'Harold Kelley, 1950'],
  ];
  const T3: [string, string, string, number][] = [['frio', 'Frío', AZUL_M, 0.2], ['calido', 'Cálido', AMBAR, 0.55], ['caliente', 'Caliente', ROJO_M, 0.92]];

  // Toma 2: el ancho del abismo crece cuando el tráfico es más frío.
  const frio = sm(t, m('largo'), m('largo') + 2);
  const orillaD = lerp(760, 960, frio);
  const tablones = Math.floor((orillaD - 380) / 38);
  const cruza = ((t - m('puente')) * 0.18) % 1;

  // Toma 3.
  const quema = sm(t, m('perdio'), m('perdio') + 1.4);
  const camino = sm(t, m('articulo'), m('boletin') + 1.6);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La temperatura del tráfico">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Tres temperaturas */}
      <Toma t={t} a={0} b={m('puente')} cy={470}>
        <rect x={120} y={700} width={960} height={18} rx={9} fill={`url(#${ID}-marcaH)`} opacity={0.25 * E('frio')} />
        {T3.map(([n, txt, col, v], k) => {
          const u = E(n, 0.6);
          const x = 260 + k * 340;
          return (
            <g key={n} opacity={Math.min(1, u)}>
              <Persona id={ID} x={x} y={690} s={0.85} cuerpo={col} />
              <Termometro x={x + 100} y={700} h={220} v={v * Math.min(1, u)} color={col} c={c} />
              <circle cx={x} cy={360} r={78} fill={c.panel} style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.12))' }} />
              <circle cx={x - 10} cy={448} r={12} fill={c.panel} /><circle cx={x - 4} cy={475} r={7} fill={c.panel} />
              {k === 0 && <Txt x={x} y={392} textAnchor="middle" fontSize={92} fill={AZUL_M} peso={800}>?</Txt>}
              {k === 1 && <Bombilla x={x} y={360} s={0.7} id={ID} t={t} luz={u} />}
              {k === 2 && <Corazon x={x} y={360} s={1.3 + 0.08 * Math.sin(t * 6)} color={ROJO_M} />}
              <Pastilla x={x} y={760} texto={txt} fondo={col} tam={26} />
              <Txt x={x} y={250} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>{movil ? '' : ['Solo sabe que tiene un problema', 'Conoce la solución', 'Ya te conoce'][k]}</Txt>
            </g>
          );
        })}
      </Toma>

      {/* 2 · El puente */}
      <Toma t={t} a={m('puente')} b={m('error')} cy={470}>
        <g opacity={E('puente')}>
          <path d="M 80 560 H 380 V 820 H 80 Z" fill="#a8a29e" /><path d="M 80 560 H 380 V 590 H 80 Z" fill="#65a30d" />
          <path d={`M ${orillaD} 560 H 1120 V 820 H ${orillaD} Z`} fill="#a8a29e" /><path d={`M ${orillaD} 560 H 1120 V 590 H ${orillaD} Z`} fill="#65a30d" />
          <Megafono x={230} y={490} s={0.9} habla={1} t={t} />
          <Txt x={230} y={650} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>Anuncio</Txt>
          <Regalo x={orillaD + 130} y={500} s={1} color={ROSA} />
          <Txt x={orillaD + 130} y={650} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>Oferta</Txt>
          {Array.from({ length: tablones + 1 }, (_, k) => <rect key={k} x={380 + k * ((orillaD - 380) / (tablones + 1)) + 2} y={556 + 18 * Math.sin((Math.PI * (k + 0.5)) / (tablones + 1))} width={(orillaD - 380) / (tablones + 1) - 4} height={16} rx={4} fill="#a16207" opacity={sm(t, m('puente') + k * 0.08, m('puente') + k * 0.08 + 0.3)} />)}
          <path d={`M 380 540 Q ${(380 + orillaD) / 2} 600 ${orillaD} 540`} stroke="#78350f" strokeWidth={4} fill="none" />
          <Persona id={ID} x={lerp(300, orillaD + 60, cruza)} y={562 + 16 * Math.sin(Math.PI * Math.min(1, Math.max(0, (lerp(300, orillaD + 60, cruza) - 380) / (orillaD - 380))))} s={0.45} cuerpo={AZUL_M} />
          <Termometro x={600} y={430} h={160} v={lerp(0.85, 0.15, frio)} color={frio > 0.5 ? AZUL_M : ROJO_M} c={c} />
          <Pastilla x={600} y={200} texto={frio > 0.5 ? (movil ? 'Frío: más largo' : 'Más frío: puente más largo') : (movil ? 'Caliente: corto' : 'Tráfico caliente: puente corto')} fondo={frio > 0.5 ? AZUL_M : ROJO_M} tam={26} />
        </g>
      </Toma>

      {/* 3 · El error y el camino de los otros */}
      <Toma t={t} a={m('error')} b={m('kelley')} cy={470}>
        <g opacity={E('error')}>
          <Gente x={110} y={360} n={5} activos={5} color={GRIS} paso={40} s={0.42} />
          <Cifra x={190} y={260} valor={2.3} u={sm(t, m('lista'), m('lista') + 1)} dec={1} suf=" millones" tam={32} color={AZUL_M} />
          <Conector x1={320} y1={320} x2={560} y2={320} u={sm(t, m('lista') + 0.5, m('lista') + 1.1)} t={t} color={GRIS} />
          <path d="M 560 260 H 680 L 640 320 V 370 H 600 V 320 Z" fill={`url(#${ID}-marca)`} />
          <Conector x1={690} y1={320} x2={860} y2={320} u={quema} t={t} color={ROJO_M} puntos={2} />
          {[0, 1, 2].map((k) => { const p = (t * 0.7 + k / 3) % 1; return quema > 0 ? <path key={k} d={`M ${930 + k * 30} ${330 - p * 50} q 12 -18 0 -36 q -12 18 0 36 Z`} fill={k % 2 ? ROJO_M : AMBAR} opacity={(1 - p) * quema} transform={`scale(${1 + p * 0.5})`} style={{ transformOrigin: `${930 + k * 30}px ${330 - p * 50}px` }} /> : null; })}
          <Cifra x={980} y={400} valor={30000} u={quema} pre="−$" tam={40} color={ROJO_M} miles />
          <Txt x={980} y={440} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800} opacity={quema}>12 ventas</Txt>
        </g>
        <line x1={110} y1={480} x2={1090} y2={480} stroke={c.apagado} strokeWidth={3} strokeDasharray="10 10" opacity={E('otros')} />
        {([['articulo', 'Artículo', VIOLETA, 260], ['boletin', 'Boletín', AZUL_M, 600], ['boletin', 'Oferta', VERDE, 940]] as const).map(([n, txt, col, x], k) => {
          const u = E(n, 0.6, k === 2 ? 1.2 : 0);
          return (
            <Tarjeta key={txt} x={x - 120} y={520} w={240} h={190} titulo={txt} c={c} id={ID} op={u} acento={col} tam={24}>
              {k === 0 && <Hoja x={120} y={120} w={70} h={86} color={VIOLETA} />}
              {k === 1 && <Sobre x={120} y={125} s={0.9} color={AZUL_M} />}
              {k === 2 && <Regalo x={120} y={130} s={0.8} color={VERDE} />}
            </Tarjeta>
          );
        })}
        <Conector x1={380} y1={615} x2={480} y2={615} u={E('boletin')} t={t} color={VIOLETA} puntos={2} />
        <Conector x1={720} y1={615} x2={820} y2={615} u={sm(t, m('boletin') + 1, m('boletin') + 1.5)} t={t} color={AZUL_M} puntos={2} />
        {camino > 0 && camino < 1 && <circle cx={lerp(260, 940, camino)} cy={510} r={12} fill={NARANJA} />}
        <g opacity={E('tardo')}><Calendario x={600} y={780} s={0.55} marcados={7} /><Txt x={680} y={790} fontSize={26} fill={c.texto} peso={800}>{movil ? '1 sem. a 3 meses' : 'De una semana a tres meses'}</Txt></g>
      </Toma>

      {/* 4 · Kelley */}
      <Toma t={t} a={m('kelley')} b={fin + 1} cy={470}>
        <g opacity={E('kelley')}>
          <rect x={420} y={190} width={360} height={170} rx={10} fill={isDark ? '#0f3d2e' : '#14532d'} />
          <Persona id={ID} x={600} y={500} s={0.8} cuerpo={GRIS} corbata />
          <Txt x={600} y={290} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>La misma clase</Txt>
        </g>
        {[0, 1].map((k) => {
          const u = Math.max(t >= m('kelley') ? 0.35 * E('kelley') : 0, E('calidofrio', 0.6, k * 0.5));
          const x = k === 0 ? 220 : 980, col = k === 0 ? AMBAR : AZUL_M;
          const juicio = sm(t, m('calidofrio') + 1.6, m('calidofrio') + 2.6);
          return (
            <g key={k} opacity={Math.min(1, u)}>
              <PersonaCara id={ID} x={x} y={720} s={0.75} cuerpo={col} e={juicio * (k === 0 ? 1 : -1)} enojo={k === 1 ? juicio : 0} />
              <rect x={x - 90} y={300} width={180} height={110} rx={14} fill={col} />
              <Txt x={x} y={345} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>«Es</Txt>
              <Txt x={x} y={385} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>{k === 0 ? 'cálido»' : 'frío»'}</Txt>
              <Conector x1={x + (k === 0 ? 70 : -70)} y1={560} x2={600 + (k === 0 ? -80 : 80)} y2={440} u={u} t={t} color={col} puntos={2} curva={k === 0 ? 0.15 : -0.15} />
              <Estrellas x={x} y={790} n={k === 0 ? 5 : 2} u={juicio} />
            </g>
          );
        })}
      </Toma>
    </Lienzo>
  );
};
