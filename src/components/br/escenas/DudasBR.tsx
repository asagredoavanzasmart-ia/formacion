import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Persona, Burbuja, Visto, Reloj, Nube, Tarjeta, Conector, Pastilla, LogoCF, Cara, Navegador, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Las tres dudas.
 * Toma 1: un camino hacia la puerta de la compra con tres barreras; el comprador se detiene frente a cada una: la del
 * vehículo (un mapa con signo de pregunta), la interna (una cara insegura, autoeficacia de Bandura) y la externa (un
 * reloj y una nube).
 * Toma 2: los tres secretos de ClickFunnels: cada duda es un candado; desde la oferta sale la llave que lo abre
 * (demostración, plantillas, curso de tráfico) cuando se cuenta la historia.
 * Toma 3: la técnica de Jason Fladlien: la presentación de tres horas como una barra; en la segunda mitad aparecen
 * las objeciones nombradas y debajo las ventas, tres veces mayores.
 */

const ID = 'br09', P = 'br-dudas';

const Candado: React.FC<{ x: number; y: number; color: string; abre: number; s?: number }> = ({ x, y, color, abre, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -28 -10 V -38 Q -28 -66 0 -66 Q 28 -66 28 -38 V ${-10 - 34 * abre}`} stroke="#94a3b8" strokeWidth={12} fill="none" transform={`translate(0 ${-24 * abre})`} />
    <rect x={-44} y={-14} width={88} height={72} rx={14} fill={color} />
    <circle cy={16} r={9} fill="#fff" opacity={0.85} /><rect x={-3} y={18} width={6} height={18} fill="#fff" opacity={0.85} />
  </g>
);

const Llave: React.FC<{ x: number; y: number; color: string; rot?: number }> = ({ x, y, color, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <circle cx={-34} r={18} fill={color} /><circle cx={-34} r={7} fill="#fff" />
    <rect x={-18} y={-5} width={52} height={10} rx={4} fill={color} />
    <rect x={20} y={2} width={7} height={14} fill={color} /><rect x={30} y={2} width={6} height={10} fill={color} />
  </g>
);

export const DudasBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('tres'), 'Tres tipos de duda'], [m('secretos'), 'Los tres secretos'], [m('historia'), 'Una historia y una pieza'],
    [m('fladlien'), 'Jason Fladlien'], [m('triple'), 'Tres veces más'],
  ];
  const D: [string, string, string, string][] = [['vehiculo', 'Del vehículo', '¿Funcionará para mí?', AZUL_M], ['internas', 'Interna', '¿Podré yo?', ROSA], ['externas', 'Externa', '¿Tengo tiempo?', AMBAR]];
  const xs = [330, 600, 870];
  // El comprador avanza hasta la barrera que se está nombrando.
  const caminante = 110 + D.reduce((acc, [n], k) => acc + (xs[k] - 110 - (k ? xs[k - 1] - 110 : 110)) * sm(t, m(n), m(n) + 1.4), 0) - 0;
  const S: [string, string, string, string, string][] = [['secretos', '«No entiendo cómo funcionaría para mí»', 'No lo entiendo', AZUL_M, 'Demostración'], ['tecnico', '«No soy técnico»', 'No soy técnico', ROSA, 'Plantillas'], ['trafico', '«No sé conseguir tráfico»', 'Sin tráfico', AMBAR, 'Curso de tráfico']];
  const mitad2 = sm(t, m('pensando'), m('pensando') + 3);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Las tres dudas">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Tres barreras en el camino */}
      <Toma t={t} a={0} b={m('secretos')} cy={470}>
        <rect x={80} y={700} width={1000} height={16} rx={8} fill={c.apagado} />
        <g opacity={E('tres')}>
          <rect x={1040} y={500} width={110} height={200} rx={10} fill="#7c2d12" />
          <circle cx={1060} cy={600} r={6} fill={AMBAR} />
          <Txt x={1095} y={480} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>Compra</Txt>
        </g>
        {D.map(([n, txt, duda, col], k) => {
          const u = E(n, 0.6);
          const x = xs[k];
          return (
            <g key={n}>
              <Tarjeta x={x - 120} y={200} w={240} h={290} titulo={txt} c={c} id={ID} op={u} acento={col} tam={24}>
                {k === 0 && <g transform="translate(120 150)"><path d="M -70 -40 L -24 -56 L 24 -40 L 70 -56 V 40 L 24 56 L -24 40 L -70 56 Z" fill="#bfdbfe" /><path d="M -24 -56 V 40 M 24 -40 V 56" stroke="#93c5fd" strokeWidth={4} /><Txt x={0} y={22} textAnchor="middle" fontSize={64} fill={AZUL_M} peso={800}>?</Txt></g>}
                {k === 1 && <g transform="translate(120 150)"><Cara id={ID} x={0} y={0} r={56} e={-0.6} /><circle cx={60} cy={-50} r={10} fill="#93c5fd" opacity={0.8 * Math.abs(Math.sin(t * 2))} /></g>}
                {k === 2 && <g transform="translate(120 150)"><Reloj x={-30} y={10} r={46} t={t} vel={3} aro={AMBAR} /><Nube x={50} y={-20} s={0.6} t={t} /></g>}
                <Txt x={120} y={262} textAnchor="middle" fontSize={24} fill={col} peso={800}>{movil ? '' : duda}</Txt>
              </Tarjeta>
              <g opacity={Math.min(1, u)}>
                {[-30, 0, 30].map((dx) => <rect key={dx} x={x + dx - 6} y={600} width={12} height={100} rx={4} fill={col} />)}
                <rect x={x - 50} y={620} width={100} height={14} rx={6} fill={col} />
                <Conector x1={x} y1={490} x2={x} y2={596} u={u} t={t} color={col} puntos={2} grosor={4} />
              </g>
            </g>
          );
        })}
        <Pastilla x={600} y={780} texto="Autoeficacia · Bandura, 1977" fondo={ROSA} tam={24} op={E('bandura')} />
        <Persona id={ID} x={caminante} y={700} s={0.6} cuerpo={TEAL} />
      </Toma>

      {/* 2 · Candados y llaves */}
      <Toma t={t} a={m('secretos')} b={m('fladlien')} cy={470}>
        <LogoCF x={1030} y={178} s={0.42} op={E('secretos')} gira={t * 2} isDark={isDark} />
        {S.map(([n, frase, corto, col, pieza], k) => {
          const y = 330 + k * 175;
          const u = E(n, 0.6);
          const abre = sm(t, m('historia') + k * 0.9, m('historia') + k * 0.9 + 0.9);
          const vuela = sm(t, m('historia') + k * 0.9 - 0.6, m('historia') + k * 0.9);
          return (
            <g key={n} opacity={Math.min(1, u)}>
              <Burbuja x={110} y={y + 10} w={movil ? 380 : 470} texto={movil ? corto : frase} u={sm(t, m(n), m(n) + 1)} c={c} id={ID} tam={24} />
              <Candado x={680} y={y - 40} color={col} abre={abre} s={0.9} />
              <rect x={850} y={y - 92} width={230} height={90} rx={18} fill={c.panel} style={sombra(0.14, 4, 10)} />
              <rect x={850} y={y - 92} width={10} height={90} rx={4} fill={col} />
              <Txt x={970} y={y - 38} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>{movil ? pieza.split(' ')[0] : pieza}</Txt>
              {vuela > 0 && abre < 1 && <Llave x={lerp(850, 690, vuela)} y={lerp(y - 90, y - 22, vuela)} color={col} rot={-20 + 20 * vuela} />}
              {abre > 0.95 && <Visto x={760} y={y - 66} r={20} />}
            </g>
          );
        })}
      </Toma>

      {/* 3 · Fladlien */}
      <Toma t={t} a={m('fladlien')} b={fin + 1} cy={470}>
        <Persona id={ID} x={150} y={460} s={0.8} cuerpo={VIOLETA} />
        <Pastilla x={150} y={520} texto="Fladlien" fondo={VIOLETA} tam={24} op={E('fladlien')} />
        <g opacity={E('fladlien')}>
          <Txt x={680} y={210} textAnchor="middle" fontSize={26} fill={c.tenue} peso={800}>{movil ? '3 horas' : 'Una presentación de tres horas'}</Txt>
          <rect x={300} y={240} width={760} height={60} rx={18} fill={c.panel2} />
          <rect x={300} y={240} width={380} height={60} rx={18} fill={GRIS} opacity={0.6} />
          <rect x={680} y={240} width={380 * mitad2} height={60} rx={18} fill={`url(#${ID}-marcaH)`} />
          <Txt x={490} y={280} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>90 min</Txt>
          <Txt x={870} y={280} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>{movil ? 'Final' : 'Últimos 90 min'}</Txt>
        </g>
        {[0, 1, 2].map((k) => <Pastilla key={k} x={760 + k * 110} y={350 + k * 40} texto="«Probablemente…»" fondo={c.apagado} color={c.texto} tam={20} op={movil ? 0 : sm(t, m('pensando') + k * 0.6, m('pensando') + k * 0.6 + 0.4)} />)}
        <rect x={360} y={720} width={620} height={6} rx={3} fill={c.apagado} opacity={E('triple')} />
        <rect x={430} y={720 - 80 * E('triple')} width={150} height={80 * E('triple')} rx={12} fill={GRIS} />
        <rect x={760} y={720 - 240 * sm(t, m('triple') + 0.3, m('triple') + 1.3)} width={150} height={240 * sm(t, m('triple') + 0.3, m('triple') + 1.3)} rx={12} fill={VERDE} />
        <Txt x={505} y={770} textAnchor="middle" fontSize={26} fill={c.texto} peso={800} opacity={E('triple')}>Ventas 1.ª mitad</Txt>
        <Txt x={835} y={770} textAnchor="middle" fontSize={26} fill={VERDE} peso={800} opacity={E('triple')}>×3 al final</Txt>
        <Pastilla x={180} y={720} texto={movil ? 'Su experiencia' : 'Su experiencia, no un estudio'} fondo={GRIS} tam={22} op={E('triple', 0.5, 1)} />
      </Toma>
    </Lienzo>
  );
};
