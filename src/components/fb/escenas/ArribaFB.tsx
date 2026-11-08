import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Avion, Paso, Dial, Curva, TelefonoFijo, Estrella, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Hacia arriba y entre culturas. Toma 1: una escalera de siete peldaños sube hasta el jefe; quien da el feedback sube
 * un peldaño con cada paso y el paso se escribe a la derecha. Toma 2: Jens vuela de Alemania a Shanghái; aplica
 * exigencia y críticas (flechas rojas), la productividad cae y suena el teléfono de la casa matriz; un mentor local;
 * el medidor de estilo pasa de «directo» al medio y la curva se recupera. Toma 3: dentro de un mismo país, personas
 * de distintas generaciones con códigos distintos (burbujas de formas distintas) y el estilo que se ajusta.
 */

const ID = 'fb13', P = 'fb-arriba';

export const ArribaFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const PASOS = [
    ['p1', 'Confirma si otros lo viven'], ['p2', 'Decide si vale la pena'], ['p3', 'Prepara datos objetivos'], ['p4', 'Pide una reunión privada'],
    ['p5', 'Conducta e impacto'], ['p6', 'Propón, no exijas'], ['p7', 'Cierra con un compromiso'],
  ] as const;
  const rot: [number, string][] = [
    [m('jerarquia'), 'No solo hacia abajo'], [m('jefe'), 'Feedback a tu jefe'], [m('culturales'), 'Las diferencias culturales'], [m('jens'), 'Jens, de Alemania a Shanghái'],
    [m('exigencia'), 'Exigencia y críticas'], [m('bajo'), 'La productividad bajó'], [m('mentor'), 'Un mentor local'], [m('intermedio'), 'Un estilo intermedio'], [m('pais'), 'También en un mismo país'],
  ];
  let peldano = 0;
  PASOS.forEach(([n], k) => { peldano += sm(t, m(n), m(n) + 0.8) * (k >= 0 ? 1 : 0); });
  const vuelo = sm(t, m('shanghai') - 0.6, m('shanghai') + 1.4);
  const prod = t < m('bajo') ? 0.6 : t < m('intermedio') ? 0.6 - 0.4 * sm(t, m('bajo'), m('bajo') + 1.2) : 0.2 + 0.6 * sm(t, m('intermedio') + 0.5, m('intermedio') + 2.5);
  const estilo = lerp(0.95, 0.5, sm(t, m('intermedio'), m('intermedio') + 1.4));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Hacia arriba y entre culturas">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · siete peldaños */}
      <TomaFB t={t} a={0} b={m('culturales')} cy={470}>
        {Array.from({ length: 7 }, (_, k) => <rect key={k} x={60 + k * 50} y={740 - (k + 1) * 62} width={50} height={(k + 1) * 62} fill={c.apagado} opacity={0.45 + 0.07 * k} />)}
        <rect x={400} y={306} width={80} height={12} rx={6} fill={c.apagado} />
        <Persona id={ID} x={436} y={306} s={0.75} cuerpo={VIOLETA} corbata />
        <Txt x={436} y={350} textAnchor="middle" fontSize={26} fill={c.texto} opacity={e1(t, m('jefe'))}>Tu jefe</Txt>
        <g transform={`translate(${85 + (Math.min(7, peldano) - 1) * 50} ${740 - Math.min(7, peldano) * 62})`}>
          <Persona id={ID} x={0} y={0} s={0.6} cuerpo={NARANJA} />
        </g>
        {t < m('jefe') && <Txt x={800} y={430} textAnchor="middle" fontSize={34} fill={c.texto} opacity={vent(t, m('jerarquia'), m('jefe'))}>El feedback también sube</Txt>}
        {PASOS.map(([n, txt], k) => {
          const o = e1(t, m(n));
          const viejo = 1 - 0.45 * sm(t, (PASOS[k + 1] ? m(PASOS[k + 1][0]) : 1e9), (PASOS[k + 1] ? m(PASOS[k + 1][0]) : 1e9) + 0.5);
          return <Paso key={n} x={480} y={740 - (k + 1) * 80 + 20} w={680} texto={`${k + 1}. ${txt}`} color={[AZUL_M, VIOLETA, NARANJA, ROSA, VERDE, AZUL_M, ROJO_M][k]} c={c} op={o * viejo} tam={28} />;
        })}
      </TomaFB>

      {/* 2 · Jens */}
      <TomaFB t={t} a={m('culturales')} b={m('pais')} cy={470}>
        {vent(t, m('culturales'), m('exigencia')) > 0.01 && (
          <g opacity={vent(t, m('culturales'), m('exigencia'))}>
            <rect x={120} y={360} width={300} height={200} rx={24} fill={c.panel} />
            {['#111827', '#dc2626', '#facc15'].map((col, k) => <rect key={k} x={160} y={390 + k * 40} width={70} height={40} fill={col} />)}
            <Txt x={330} y={480} textAnchor="middle" fontSize={28} fill={c.texto}>Alemania</Txt>
            <rect x={780} y={360} width={300} height={200} rx={24} fill={c.panel} />
            <rect x={820} y={390} width={110} height={120} fill="#dc2626" /><Estrella x={850} y={420} r={14} fill="#facc15" />
            <Txt x={1000} y={480} textAnchor="middle" fontSize={28} fill={c.texto}>Shanghái</Txt>
            {t >= m('jens') && <Avion x={lerp(280, 930, vuelo)} y={280 - 60 * Math.sin(Math.PI * vuelo)} s={0.4} op={e1(t, m('jens'))} />}
            {t >= m('jens') && <Txt x={600} y={640} textAnchor="middle" fontSize={30} fill={c.texto} opacity={e1(t, m('jens'))}>Jens, a mejorar la eficiencia</Txt>}
          </g>
        )}
        {t >= m('exigencia') && (
          <g opacity={e1(t, m('exigencia'))}>
            <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
            <Persona id={ID} x={240} y={720} s={1.05} cuerpo={AZUL_M} corbata />
            <Txt x={240} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Jens</Txt>
            {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={520 + k * 110} y={720} s={0.85} cuerpo={[ROSA, VERDE, VIOLETA][k]} ojos={lerp(0.5, 1, sm(t, m('intermedio') + 0.5, m('intermedio') + 2))} />)}
            <g opacity={vent(t, m('exigencia'), m('mentor'))}>
              {[0, 1].map((k) => { const u = ((t - m('exigencia')) * 0.6 + k / 2) % 1; return <path key={k} d={`M ${lerp(300, 470, u)} ${520 + k * 30} l 34 0 m -12 -10 l 12 10 l -12 10`} stroke={ROJO_M} strokeWidth={7} fill="none" strokeLinecap="round" opacity={Math.min(1, (1 - u) * 5)} />; })}
            </g>
            {/* productividad */}
            <rect x={870} y={200} width={260} height={220} rx={20} fill={c.panel} />
            <Txt x={1000} y={240} textAnchor="middle" fontSize={26} fill={c.texto}>Productividad</Txt>
            <rect x={950} y={400 - 140 * prod} width={100} height={140 * prod} rx={10} fill={prod > 0.45 ? VERDE : ROJO_M} />
            {vent(t, m('bajo') + 0.6, m('mentor')) > 0.01 && <g opacity={vent(t, m('bajo') + 0.6, m('mentor'))}><TelefonoFijo x={980} y={560} s={0.8} t={t} suena={1} /></g>}
            {t >= m('mentor') && (
              <g opacity={e1(t, m('mentor'))}>
                <Persona id={ID} x={380} y={720} s={1} cuerpo={ROJO_M} pelo="#111" />
                <Burbuja x={400} y={520} w={340} texto="Más refuerzo positivo" u={sm(t, m('mentor'), m('mentor') + 1.2)} c={c} id={ID} tam={28} />
              </g>
            )}
            {t >= m('intermedio') && <Dial x={1000} y={620} v={estilo} texto="Estilo" c={c} id={ID} r={60} op={e1(t, m('intermedio'))} tam={26} />}
          </g>
        )}
      </TomaFB>

      {/* 3 · dentro de un mismo país */}
      <TomaFB t={t} a={m('pais')} b={fin + 1} cy={480}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        {[[220, '#9ca3af', 0.95, 'rect'], [600, '#2b1a12', 1.05, 'circle'], [980, '#7c2d12', 0.9, 'tri']].map(([x, pelo, s, forma], k) => (
          <g key={k} opacity={e1(t, m('pais') + k * 0.6)}>
            <Persona id={ID} x={x as number} y={720} s={s as number} cuerpo={[VIOLETA, AZUL_M, VERDE][k]} pelo={pelo as string} />
            <g transform={`translate(${x} 400)`}>
              {forma === 'rect' && <rect x={-70} y={-40} width={140} height={80} rx={8} fill={c.panel} />}
              {forma === 'circle' && <ellipse cx={0} cy={0} rx={80} ry={50} fill={c.panel} />}
              {forma === 'tri' && <path d="M -80 40 L 0 -50 L 80 40 Z" fill={c.panel} />}
              <circle cx={0} cy={4} r={10} fill={[VIOLETA, AZUL_M, VERDE][k]} />
            </g>
          </g>
        ))}
        <Txt x={600} y={790} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('pais') + 1)}>Generaciones y regiones distintas</Txt>
        <Letrero x={600} y={220} texto="Aprende su código y ajusta tu estilo" id={ID} tam={30} op={e1(t, m('pais') + 2.5)} />
      </TomaFB>
    </Lienzo>
  );
};
