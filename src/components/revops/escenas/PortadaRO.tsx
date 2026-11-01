import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Nucleo, Bloque, Flujo, Cruz, Hoja, Reloj, Monitor, Rotulo, Persona, Txt, Moneda3D, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, ac, sm, e1, lerp, tono } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «RevOps», portada, en cuatro tomas.
 * 1 · Marketing, ventas y servicio aparecen al nombrarse; de cada uno viaja una partícula al núcleo de datos compartidos.
 * 2 · La definición: cuatro bloques (personas, procesos, sistemas y datos) se levantan y del conjunto salen ingresos.
 * 3 · El objetivo: no más herramientas ni reportes (la pila se tacha) sino que el ingreso crezca más que el costo.
 * 4 · Por qué ahora: clientes que esperan más, clientes conectados y datos repartidos en muchos sistemas.
 */

const ID = 'ro02';
const nombres = ['mkt', 'ven', 'ser', 'particula', 'nucleo', 'definicion', 'personas', 'procesos', 'sistemas', 'datos', 'ingresos', 'herramientas', 'crezca', 'costo', 'moda', 'tres', 'esperan', 'conectados', 'masDatos', 'repartidos', 'pregunta'] as const;
type N = typeof nombres[number];

export const PortadaRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Los equipos que tocan al cliente'], [m('particula'), 'Todos alimentan un núcleo'], [m('nucleo'), 'Datos compartidos'],
    [m('definicion'), 'Qué es RevOps'], [m('ingresos'), 'Cómo se generan ingresos'],
    [m('herramientas'), 'No más herramientas'], [m('crezca'), 'Crecer más rápido que el costo'],
    [m('tres'), 'Tres cambios a la vez'], [m('esperan'), 'Clientes que esperan más'], [m('conectados'), 'Clientes conectados'], [m('masDatos'), 'Datos repartidos'],
  ];

  const equipos: { k: 'mkt' | 'ven' | 'ser'; n: N; x: number }[] = [
    { k: 'mkt', n: 'mkt', x: 250 }, { k: 'ven', n: 'ven', x: 600 }, { k: 'ser', n: 'ser', x: 950 },
  ];
  const pulso = ac(t, m('nucleo'), m('nucleo') + 0.8) * (1 - ac(t, m('nucleo') + 1.5, m('nucleo') + 2.5));

  const pilares: { n: N; txt: string; color: string; x: number }[] = [
    { n: 'personas', txt: 'Personas', color: NARANJA, x: 270 },
    { n: 'procesos', txt: 'Procesos', color: ROSA, x: 490 },
    { n: 'sistemas', txt: 'Sistemas', color: VIOLETA, x: 710 },
    { n: 'datos', txt: 'Datos', color: AZUL_M, x: 930 },
  ];

  /* Toma 3 · ingreso frente a costo */
  const sube = sm(t, m('crezca'), m('crezca') + 2.5);
  const X0 = 200, X1 = 1000, Y0 = 690;
  const costo = (u: number) => Y0 - 260 * u;
  const ingreso = (u: number) => Y0 - lerp(260 * u, 90 * u + 440 * u * u, sube);
  const pts = (f: (u: number) => number, hasta: number) => Array.from({ length: 31 }, (_, k) => k / 30).filter((u) => u <= hasta + 1e-6).map((u) => `${lerp(X0, X1, u)},${f(u)}`).join(' ');
  const dibuja = sm(t, m('herramientas') + 0.3, m('herramientas') + 2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="RevOps: tres equipos, un solo sistema de ingresos">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · tres equipos y el núcleo */}
      <Toma t={t} a={-1} b={m('definicion')} zi={1}>
        <Suelo y={700} isDark={isDark} />
        <g opacity={e1(t, m('particula'))}>
          <Nucleo x={600} y={300} r={70} t={t} id={ID} pulso={pulso} />
        </g>
        {t >= m('nucleo') && <Letrero x={600} y={425} texto="Datos compartidos" id={ID} op={e1(t, m('nucleo'))} />}
        {equipos.map((e, k) => (
          <g key={e.k}>
            {t >= m(e.n) && <Equipo id={ID} k={e.k} x={e.x} y={700} s={0.85} t={t} op={e1(t, m(e.n))} nombre={e.k === 'ser' ? 'Servicio' : true} />}
            {t >= m('particula') && <Flujo x1={e.x} y1={540} x2={600 + (k - 1) * 40} y2={360} t={t + k * 0.3} n={4} vel={0.5} arco={70} color={[NARANJA, ROSA, TEAL][k]} r={9} op={e1(t, m('particula') + k * 0.2)} />}
            {t >= m('nucleo') + 1 && <Flujo x1={600 + (k - 1) * 40} y1={360} x2={e.x + 30} y2={520} t={t + 0.5 + k * 0.2} n={2} vel={0.4} arco={-30} color={'#94a3b8'} r={6} op={e1(t, m('nucleo') + 1) * 0.8} />}
          </g>
        ))}
      </Toma>

      {/* TOMA 2 · personas, procesos, sistemas y datos */}
      <Toma t={t} a={m('definicion')} b={m('herramientas')}>
        <Suelo y={720} isDark={isDark} x0={140} x1={1060} />
        {pilares.map((p, k) => {
          const u = sm(t, m(p.n), m(p.n) + 0.8);
          if (u <= 0.001) return null;
          const alto = 60 + 160 * u;
          return (
            <g key={p.n} opacity={Math.min(1, u * 3)}>
              <Bloque x={p.x} y={640} w={170} h={50} color={p.color} alto={alto} />
              <Letrero x={p.x} y={770} texto={p.txt} fondo={p.color} id={ID} tam={26} />
              {k === 0 && <Persona id={ID} x={p.x} y={630 - alto} s={0.4} cuerpo="#fff7ed" />}
              {k === 1 && [0, 1, 2].map((j) => <rect key={j} x={p.x - 40 + j * 30} y={600 - alto - 10 * j} width={24} height={24} rx={6} fill="#fff" opacity={0.9} />)}
              {k === 2 && <g transform={`translate(${p.x} ${625 - alto}) scale(0.32)`}><Monitor x={0} y={0} w={200} h={120} /></g>}
              {k === 3 && [0, 1, 2].map((j) => <ellipse key={j} cx={p.x} cy={612 - alto - j * 18} rx={36} ry={12} fill="#fff" opacity={0.85 - j * 0.15} />)}
            </g>
          );
        })}
        {/* de los cuatro sale el ingreso */}
        {t >= m('ingresos') && (
          <g opacity={e1(t, m('ingresos'))}>
            {[0, 1, 2, 3, 4].map((j) => { const ph = ((t - m('ingresos')) * 0.45 + j / 5) % 1; return <g key={j} opacity={Math.min(1, ph * 5, (1 - ph) * 5)}><Moneda3D x={lerp(300, 900, j / 4)} y={lerp(340, 150, ph)} r={22} giro={Math.cos(t * 4 + j)} /></g>; })}
            <Letrero x={600} y={140} texto="Ingresos" id={ID} tam={30} />
          </g>
        )}
      </Toma>

      {/* TOMA 3 · el objetivo: crecer más rápido que el costo */}
      <Toma t={t} a={m('herramientas')} b={m('moda')}>
        {/* pila de herramientas y reportes que no es el objetivo */}
        <g opacity={e1(t, m('herramientas')) * (1 - ac(t, m('crezca') - 0.3, m('crezca') + 0.4))}>
          {[0, 1, 2, 3, 4].map((j) => <Hoja key={j} x={520 + (j % 2) * 30} y={560 - j * 70} w={160} h={60} lineas={2} rot={(j % 3 - 1) * 4} />)}
          {[0, 1].map((j) => <g key={j} transform={`translate(${760 + j * 150} 600) scale(0.45)`}><Monitor x={0} y={0} w={200} h={130} /></g>)}
          <Cruz x={760} y={260} r={46} op={sm(t, m('herramientas') + 0.9, m('herramientas') + 1.3)} />
          <Letrero x={640} y={700} texto="Más herramientas y reportes" fondo={PIZARRA} id={ID} />
        </g>
        {t >= m('crezca') - 0.2 && (
          <g opacity={e1(t, m('crezca') - 0.2)}>
            <rect x={X0} y={Y0} width={X1 - X0} height={5} rx={2.5} fill={c.apagado} />
            <rect x={X0} y={150} width={5} height={Y0 - 150} rx={2.5} fill={c.apagado} />
            <polyline points={pts(costo, Math.max(dibuja, sm(t, m('crezca'), m('crezca') + 1.5)))} fill="none" stroke="#94a3b8" strokeWidth={10} strokeLinecap="round" />
            <polyline points={pts(ingreso, sm(t, m('crezca'), m('crezca') + 2.5))} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
            <Letrero x={X1 - 20} y={ingreso(1) - 40} texto="Ingreso" id={ID} op={sm(t, m('crezca') + 2, m('crezca') + 2.5)} ancla="end" />
            {t >= m('costo') && <Letrero x={X1 - 20} y={costo(1) + 50} texto="Costo" fondo="#94a3b8" id={ID} op={e1(t, m('costo'))} ancla="end" />}
            <Txt f="a" x={X1} y={Y0 + 44} textAnchor="end" fontSize={24} fill={c.tenue}>tiempo</Txt>
          </g>
        )}
      </Toma>

      {/* TOMA 4 · tres cambios a la vez */}
      <Toma t={t} a={m('moda')} b={fin + 1}>
        <Suelo y={680} isDark={isDark} />
        {[1, 2, 3].map((n, k) => t >= m('tres') + k * 0.25 && (
          <g key={n} opacity={e1(t, m('tres') + k * 0.25)}>
            <circle cx={240 + k * 360} cy={190} r={34} fill={`url(#${ID}-marca)`} />
            <Txt x={240 + k * 360} y={203} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>{n}</Txt>
          </g>
        ))}
        {/* 1 · esperan más: un cliente mira el reloj y pide rapidez */}
        {t >= m('esperan') && (
          <g opacity={e1(t, m('esperan'))}>
            <Persona id={ID} x={220} y={680} s={0.8} cuerpo={AZUL_M} />
            <Reloj x={330} y={430} r={44} t={t} vel={3} />
            {[0, 1, 2].map((j) => <path key={j} d="M 0 -18 L 5 -6 L 18 -5 L 8 4 L 11 17 L 0 10 L -11 17 L -8 4 L -18 -5 L -5 -6 Z" fill="#fbbf24" transform={`translate(${170 + j * 40} ${330 - 6 * Math.abs(Math.sin(t * 3 + j))})`} />)}
            <Letrero x={240} y={740} texto="Esperan más" fondo={AZUL_M} id={ID} />
          </g>
        )}
        {/* 2 · conectados: tres clientes enlazados que se cuentan lo que viven */}
        {t >= m('conectados') && (
          <g opacity={e1(t, m('conectados'))}>
            {[[520, 680], [600, 560], [680, 680]].map(([x, y], j, arr) => <g key={j}>
              <path d={`M ${x} ${y - 70} L ${arr[(j + 1) % 3][0]} ${arr[(j + 1) % 3][1] - 70}`} stroke={VERDE} strokeWidth={5} strokeDasharray="10 8" strokeDashoffset={-t * 30} />
            </g>)}
            {[[520, 680], [600, 560], [680, 680]].map(([x, y], j) => <Persona key={j} id={ID} x={x} y={y} s={0.45} cuerpo={VERDE} />)}
            {(() => { const ph = (t * 0.6) % 1; return <g opacity={Math.min(1, ph * 5, (1 - ph) * 4)} transform={`translate(${lerp(520, 680, ph)} ${470 - 30 * Math.sin(Math.PI * ph)})`}><rect x={-34} y={-22} width={68} height={40} rx={14} fill="#fff" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.25))' }} /><circle cx={-14} cy={-2} r={5} fill={VERDE} /><circle cx={0} cy={-2} r={5} fill={VERDE} /><circle cx={14} cy={-2} r={5} fill={VERDE} /></g>; })()}
            <Letrero x={600} y={740} texto="Conectados" fondo={VERDE} id={ID} />
          </g>
        )}
        {/* 3 · más datos, repartidos en muchos sistemas */}
        {t >= m('masDatos') && (
          <g opacity={e1(t, m('masDatos'))}>
            {[[880, 600], [1000, 540], [930, 450], [1060, 650], [840, 470]].map(([x, y], j) => {
              const sep = sm(t, m('repartidos'), m('repartidos') + 1.5);
              const xx = lerp(960, x, sep), yy = lerp(560, y, sep);
              return <g key={j}>{[0, 1, 2].map((q) => <ellipse key={q} cx={xx} cy={yy - q * 16} rx={34} ry={11} fill={[VIOLETA, TEAL, ROSA, NARANJA, AZUL_M][j]} opacity={1 - q * 0.2} />)}</g>;
            })}
            <Letrero x={960} y={740} texto="Datos repartidos" fondo={VIOLETA} id={ID} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
