import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Auto, Carretera, Pin, Telefono, Burbuja, Nube, Persona, Bombilla, Suelo, Corazon, Flujo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, TEAL, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * El origen de Waze, en un solo viaje de carretera.
 * 1 · El mapa: Metula arriba, Tel Aviv abajo, dos rutas; diez autos salen y el de Levine sale último.
 * 2 · La carretera: el auto de atrás llama a los de adelante; las respuestas viajan hacia atrás: «quienes van adelante informan».
 * 3 · Cuatro frustraciones y sus empresas (Waze, FairFly, Pontera, Engie); el amor por el problema da la energía.
 */

const ID = 'ep02', P = 'ep-origen';
const COLORES = [NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, TEAL, AMBAR, '#ec4899', '#0ea5e9', '#64748b'];

export const OrigenEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('metula'), 'De Metula a Tel Aviv'], [m('rutas'), 'Dos rutas posibles'], [m('ultimo'), 'Salió último'], [m('familia'), 'Los que van adelante'],
    [m('eureka'), 'Momento eureka'], [m('casi'), 'Una frustración propia'], [m('gran'), '¿Un gran problema?'], [m('amor'), 'El amor por el problema'],
  ];

  /* mapa: dos rutas de Metula (arriba) a Tel Aviv (abajo) */
  const rutaA = 'M 600 180 C 420 280 420 520 600 700';
  const rutaB = 'M 600 180 C 780 280 780 520 600 700';
  const dibujo = sm(t, m('rutas'), m('rutas') + 1.4);

  /* carretera: el auto de atrás y los de adelante */
  const avance = (t - m('familia')) * 120;
  const AUTOS_ADELANTE = [620, 820, 1020];
  const llamada = (k: number) => m('llamo') + 0.6 * k;

  const Empresa = ({ k, x, nombre, color, icono }: { k: string; x: number; nombre: string; color: string; icono: React.ReactNode }) => (
    <g opacity={e1(t, m(k))} transform={`translate(${x} ${470 - 10 * (1 - e1(t, m(k)))})`}>
      <rect x={-110} y={-150} width={220} height={240} rx={26} fill={c.panel} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
      <rect x={-110} y={-150} width={220} height={16} rx={8} fill={color} />
      <g transform="translate(0 -40)">{icono}</g>
      <Txt x={0} y={60} textAnchor="middle" fontSize={34} fill={color}>{nombre}</Txt>
    </g>
  );

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El origen de Waze">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el mapa */}
      <Toma t={t} a={0} b={m('familia')} cy={440}>
        <rect x={250} y={130} width={700} height={640} rx={40} fill={isDark ? '#1f2a24' : '#e8f5e9'} opacity={e1(t, 0.2)} />
        <path d={rutaA} stroke="#64748b" strokeWidth={22} fill="none" strokeLinecap="round" strokeDasharray={700} strokeDashoffset={700 * (1 - dibujo)} />
        <path d={rutaB} stroke="#64748b" strokeWidth={22} fill="none" strokeLinecap="round" strokeDasharray={700} strokeDashoffset={700 * (1 - dibujo)} />
        <Pin x={600} y={190} s={1.3} color={NARANJA} op={e1(t, m('metula'))} />
        <Letrero x={600} y={120 + 20} texto="Metula" fondo={NARANJA} id={ID} op={e1(t, m('metula'))} tam={26} />
        <Pin x={600} y={710} s={1.3} color={ROSA} op={e1(t, m('metula') + 0.5)} />
        <Letrero x={600} y={760} texto="Tel Aviv" fondo={ROSA} id={ID} op={e1(t, m('metula') + 0.5)} tam={26} />
        {Array.from({ length: 10 }, (_, k) => {
          const sal = m('autos') + 0.25 * k + (k === 9 ? Math.max(0, m('ultimo') - m('autos') - 2.25) : 0);
          const u = sm(t, sal, sal + 5);
          const ruta = k % 2 ? 1 : -1;
          const x = 600 + ruta * 180 * Math.sin(Math.PI * u) * 0.95, y = lerp(200, 690, u);
          return t >= sal ? <g key={k} transform={`translate(${x} ${y})`}><rect x={-16} y={-10} width={32} height={20} rx={7} fill={COLORES[k]} /></g> : null;
        })}
        {t >= m('ultimo') && <Letrero x={420} y={230} texto="El último auto" fondo={VIOLETA} id={ID} op={e1(t, m('ultimo'))} tam={26} />}
        {t >= m('adelante') && <Nube x={860} y={230} s={0.7} t={t} op={e1(t, m('adelante'))} />}
      </Toma>

      {/* 2 · la carretera: llamar a los de adelante */}
      <Toma t={t} a={m('familia')} b={m('casi')} cy={500}>
        <Carretera y={600} avance={avance} />
        <Auto x={190} y={620} s={0.9} color={VIOLETA} giro={avance * 3} />
        {AUTOS_ADELANTE.map((x, k) => <Auto key={x} x={x} y={620} s={0.8} color={COLORES[k]} giro={avance * 3} op={e1(t, m('familia') + 0.2 * k)} />)}
        <Telefono x={190} y={420} s={0.55} op={e1(t, m('llamo'))} />
        {AUTOS_ADELANTE.map((x, k) => t >= llamada(k) && (
          <g key={`l${k}`}>
            <Flujo x1={240} y1={400} x2={x} y2={500} t={t} n={4} vel={0.9} arco={70} color={NARANJA} op={e1(t, llamada(k)) * (1 - sm(t, m('informan'), m('informan') + 1))} />
            {t >= m('informan') && <Flujo x1={x} y1={500} x2={240} y2={400} t={t} n={4} vel={0.9} arco={70} color={VERDE} op={e1(t, m('informan'))} />}
          </g>
        ))}
        {t >= m('llamo') + 1 && !movil && <Burbuja x={360} y={250} w={330} texto="¿Cómo está el tráfico?" u={sm(t, m('llamo') + 1, m('llamo') + 2.6)} c={c} id={ID} />}
        {t >= m('eureka') && <Bombilla x={600} y={280} s={1.3} id={ID} t={t} luz={sm(t, m('eureka'), m('eureka') + 0.8)} />}
        {t >= m('informan') && <Letrero x={600} y={760} texto="Los de adelante informan a los de atrás" id={ID} op={e1(t, m('informan'))} />}
      </Toma>

      {/* 3 · cuatro frustraciones, cuatro empresas */}
      <Toma t={t} a={m('casi')} b={fin + 1} cy={470}>
        {t >= m('casi') && t < m('waze') && <Nube x={600} y={420} s={1.4} t={t} op={e1(t, m('casi'))} />}
        <Empresa k="waze" x={180} nombre="Waze" color={AZUL_M} icono={<g><Auto x={0} y={30} s={0.6} color={AZUL_M} /><Nube x={0} y={-50} s={0.35} t={t} rayos={false} /></g>} />
        <Empresa k="fairfly" x={440} nombre="FairFly" color={NARANJA} icono={<g><rect x={-50} y={-20} width={100} height={56} rx={8} fill="#22a06b" /><circle cx={0} cy={8} r={16} fill="#7ee2b0" /><path d="M -60 -40 H 60" stroke="#64748b" strokeWidth={8} strokeLinecap="round" /></g>} />
        <Empresa k="pontera" x={700} nombre="Pontera" color={VIOLETA} icono={<g><rect x={-46} y={-40} width={92} height={80} rx={10} fill="#ede9fe" />{[0, 1, 2].map((j) => <rect key={j} x={-34 + j * 26} y={20 - (j + 1) * 16} width={18} height={(j + 1) * 16} rx={4} fill={VIOLETA} />)}</g>} />
        <Empresa k="engie" x={960} nombre="Engie" color={TEAL} icono={<g><path d="M -14 40 L -10 -10 L -30 -34 L -14 -48 L 0 -26 L 14 -48 L 30 -34 L 10 -10 L 14 40 Z" fill="#64748b" /><circle cy={-34} r={8} fill={c.panel} /></g>} />
        {t >= m('gran') && <Letrero x={600} y={680} texto="¿Vale la pena resolverlo?" fondo={GRIS} id={ID} op={e1(t, m('gran')) * (1 - sm(t, m('amor') - 0.3, m('amor')))} />}
        {t >= m('amor') && <>
          <Corazon x={600} y={700} s={1.6 + 0.08 * Math.sin(t * 5)} op={e1(t, m('amor'))} />
          <Letrero x={600} y={790} texto="La energía para seguir" id={ID} op={e1(t, m('amor') + 0.4)} />
        </>}
      </Toma>
    </Lienzo>
  );
};
