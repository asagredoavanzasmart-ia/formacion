import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Propuesta, Visto, Cruz, Reloj, Burbuja, Busto, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Portada. 1 · El vendedor frente a un grupo que decide; quien lo entiende gana la cuenta.
 * 2 · El mapa del recorrido: seis paradas (roles, ICP, oferta, banderas, modos, proceso) que se encienden al nombrarse.
 * 3 · La venta como un viaje: la propuesta avanza por un camino con paradas; en una dicen que no, otra pregunta qué gana,
 *     el reloj marca el momento y el camino se ordena: ganar por método.
 */

const ID = 'vc01', P = 'vc-portada';

export const PortadaVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('grupo'), 'Un grupo que decide'], [m('influyen'), 'El recorrido de la clase'], [m('viaje'), 'Un viaje con paradas'], [m('metodo'), 'Ganar por método'],
  ];
  const GRUPO: [number, number, string][] = [[700, 470, AZUL_M], [820, 440, VIOLETA], [940, 470, AMBAR], [760, 640, VERDE], [900, 640, TEAL]];
  const PARADAS: [string, string, string][] = [['influyen', 'Roles', AZUL_M], ['empresas', 'ICP', VERDE], ['oferta', 'Oferta', NARANJA], ['peligro', 'Banderas', ROSA], ['cambio', 'Modos', VIOLETA], ['proceso', 'Proceso', TEAL]];
  const STOPS = [250, 470, 690, 910];
  const recorre = sm(t, m('viaje') + 0.5, m('metodo'));
  const px = lerp(120, 1080, recorre);
  const ordenado = sm(t, m('metodo'), m('metodo') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Ventas complejas">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el grupo que decide */}
      <Toma t={t} a={0} b={m('influyen')} cy={520}>
        <Persona id={ID} x={300} y={680} s={0.9} />
        <path d="M 640 560 H 1000 L 980 600 H 660 Z" fill="#7c4a1e" opacity={e1(t, m('grupo'))} />
        {GRUPO.map(([x, y, col], k) => t >= m('grupo') + 0.25 * k && <g key={k} opacity={e1(t, m('grupo') + 0.25 * k)}><Persona id={ID} x={x} y={y} s={0.55} cuerpo={col} /></g>)}
        {t >= m('grupo') && <Letrero x={820} y={230} texto="Un grupo que decide" id={ID} op={e1(t, m('grupo') + 0.6)} tam={26} />}
        {t >= m('cuenta') && <><Visto x={480} y={420} r={40} op={e1(t, m('cuenta'))} /><Letrero x={360} y={790} texto="Quien lo entiende gana la cuenta" fondo={VERDE} id={ID} op={e1(t, m('cuenta'))} tam={26} /></>}
      </Toma>

      {/* 2 · el mapa del recorrido */}
      <Toma t={t} a={m('influyen')} b={m('viaje')} cy={470}>
        <path d="M 150 380 C 280 380 280 580 410 580 C 540 580 540 380 670 380 C 800 380 800 580 930 580 C 1010 580 1050 480 1080 440" fill="none" stroke={c.apagado} strokeWidth={14} strokeLinecap="round" strokeDasharray="2 26" />
        {PARADAS.map(([a, n, col], k) => {
          const x = 150 + k * 186, y = k % 2 ? 580 : 380;
          const on = e1(t, m(a));
          return (
            <g key={a} opacity={0.35 + 0.65 * on} transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * on})`}>
              <circle r={62} fill={t >= m(a) ? col : c.panel2} style={{ filter: `drop-shadow(0 6px 12px rgba(0,0,0,${c.sombra}))` }} />
              {k === 0 && <><Busto x={-22} y={10} s={0.7} color="#fff" /><Busto x={22} y={10} s={0.7} color="#ffe4d6" /></>}
              {k === 1 && [36, 24, 12].map((r, j) => <circle key={r} r={r} fill={j % 2 ? col : '#fff'} />)}
              {k === 2 && <><rect x={-28} y={-14} width={56} height={40} rx={6} fill="#fff" /><rect x={-34} y={-26} width={68} height={16} rx={5} fill="#ffe4d6" /><rect x={-5} y={-26} width={10} height={52} fill={ROSA} /></>}
              {k === 3 && <><rect x={-22} y={-34} width={6} height={66} rx={3} fill="#fff" /><path d={`M -16 -32 Q ${4 + 4 * Math.sin(t * 5)} -40 26 -28 Q ${8 + 4 * Math.sin(t * 5 + 1)} -18 -16 -12 Z`} fill="#fff" /></>}
              {k === 4 && <><path d="M -30 4 L -20 18 H 20 L 30 4 Z" fill="#fff" /><rect x={-8} y={-16} width={20} height={20} rx={3} fill="#fff" /><path d={`M -40 28 Q -20 ${22 + 3 * Math.sin(t * 3)} 0 28 T 40 28`} stroke="#fff" strokeWidth={5} fill="none" /></>}
              {k === 5 && [0, 1, 2].map((j) => <rect key={j} x={-30} y={-26 + j * 20} width={60 - j * 14} height={14} rx={7} fill="#fff" transform={`translate(${j * 7} 0)`} />)}
              <Txt x={0} y={k % 2 ? 108 : -84} textAnchor="middle" fontSize={26} fill={c.texto}>{n}</Txt>
            </g>
          );
        })}
      </Toma>

      {/* 3 · el viaje con paradas */}
      <Toma t={t} a={m('viaje')} b={fin + 1} cy={520}>
        <rect x={80} y={640} width={1040} height={60} rx={30} fill={isDark ? '#3a3f47' : '#cbd5e1'} />
        {ordenado > 0.01 && <rect x={80} y={640} width={1040 * ordenado} height={60} rx={30} fill={`url(#${ID}-marcaH)`} opacity={0.85} />}
        <line x1={110} y1={670} x2={1090} y2={670} stroke="#fff" strokeWidth={5} strokeDasharray="30 22" opacity={0.7} />
        {STOPS.map((x, k) => {
          const t0 = m('viaje') + 0.4 + 0.35 * k;
          return t >= t0 && (
            <g key={x} opacity={e1(t, t0)}>
              <rect x={x - 4} y={470} width={8} height={170} rx={4} fill={GRIS} />
              <circle cx={x} cy={470} r={22} fill={ordenado > 0.5 ? VERDE : NARANJA} />
              <Persona id={ID} x={x + 60} y={630} s={0.42} cuerpo={[AZUL_M, VIOLETA, AMBAR, TEAL][k]} />
            </g>
          );
        })}
        <Propuesta x={px} y={600} s={0.75} op={e1(t, m('viaje') + 0.5)} />
        {t >= m('parada') && t < m('metodo') && <Cruz x={STOPS[1] + 60} y={420} r={30} op={e1(t, m('parada'))} />}
        {t >= m('parada') && t < m('gana') && <Letrero x={600} y={800} texto="Alguien puede decir que no" fondo={ROSA} id={ID} op={e1(t, m('parada'))} tam={26} />}
        {t >= m('gana') && t < m('metodo') && <Burbuja x={STOPS[2] - 120} y={190} w={movil ? 420 : 330} texto="¿Qué gano yo?" u={sm(t, m('gana'), m('gana') + 1)} c={c} id={ID} />}
        {t >= m('momento') && t < m('metodo') && <g opacity={e1(t, m('momento'))}><Reloj x={STOPS[3] + 60} y={400} r={46} t={t} /></g>}
        {t >= m('metodo') && STOPS.map((x, k) => <Visto key={x} x={x + 60} y={410} r={24} op={e1(t, m('metodo') + 0.3 * k)} />)}
        {t >= m('metodo') && <Letrero x={600} y={800} texto="Ganar por método, no por suerte" id={ID} op={e1(t, m('metodo'))} tam={26} />}
      </Toma>
    </Lienzo>
  );
};
