import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Rueda, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Moneda3D, Hoja, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Fuerza y fricción», en seis tomas.
 * 1 · La rueda: la fuerza la empuja (monedas que entran: en qué inviertes) y la fricción la frena (manchas que se comen las monedas).
 * 2 · Dos lecturas: empujar más fuerte con manchas de roce (gira lenta) frente a quitar la fricción (gira rápido).
 * 3 · El carrusel de Devyn Bellamy: no hace falta que el niño grande empuje más; hace falta que el carrusel gire mejor.
 * 4 · Alex: feliz, lo cuenta y la red crece de forma exponencial; con mala experiencia, el boca a boca negativo se propaga.
 * 5 · Dónde poner la fuerza: si el cliente cancela antes de 8 meses, la comisión vuelve; el interés del vendedor
 *     coincide con el éxito del cliente.
 * 6 · El ejercicio: listar las fuerzas y mover recursos hacia el deleite.
 */

const ID = 'ro13';
const nombres = ['fuerza', 'friccion', 'inviertes', 'come', 'lecturas', 'empujar', 'manchas', 'lenta', 'quitar', 'rapido', 'bellamy', 'carrusel', 'nino', 'gire', 'alex', 'bien', 'cuenta', 'exponencial', 'sinAtender', 'mala', 'boca', 'cuesta', 'prioridad', 'donde', 'compensacion', 'cancela', 'devuelve', 'cobra', 'coincide', 'ejercicio', 'reasignar', 'pregunta'] as const;
type N = typeof nombres[number];

export const FuerzaRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Fuerza y fricción'], [m('fuerza'), 'Fuerza: lo que la acelera'], [m('friccion'), 'Fricción: lo que la frena'], [m('come'), 'La fricción se come la inversión'],
    [m('empujar'), 'Empujar más fuerte'], [m('quitar'), 'Quitar la fricción'],
    [m('bellamy'), 'El carrusel'], [m('alex'), 'El caso de Alex'], [m('sinAtender'), 'Fricción sin atender'],
    [m('donde'), 'Dónde poner la fuerza'], [m('ejercicio'), 'Tu ejercicio'],
  ];

  /* Toma 2 · lectura activa: 0 empujar con roce, 1 sin roce */
  const sinRoce = sm(t, m('quitar'), m('quitar') + 1);
  const velRueda = lerp(10, 70, sinRoce);

  /* Toma 4 · la red de Alex */
  const nodos = Array.from({ length: 15 }, (_, k) => {
    const nivel = k === 0 ? 0 : k < 3 ? 1 : k < 7 ? 2 : 3;
    const idx = k === 0 ? 0 : k < 3 ? k - 1 : k < 7 ? k - 3 : k - 7;
    const cant = [1, 2, 4, 8][nivel];
    return { nivel, x: 200 + nivel * 230, y: 470 + (idx - (cant - 1) / 2) * (nivel === 3 ? 72 : 130) };
  });
  const padre = (k: number) => (k === 0 ? -1 : k < 3 ? 0 : k < 7 ? 1 + Math.floor((k - 3) / 2) : 3 + Math.floor((k - 7) / 2));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Fuerza y fricción">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · fuerza que empuja, fricción que frena */}
      <Toma t={t} a={-1} b={m('lecturas')} zi={1}>
        <Rueda x={600} y={470} r={190} giro={t * 25} id={ID} isDark={isDark} centro="" />
        {t >= m('fuerza') && (
          <g opacity={e1(t, m('fuerza'))}>
            <path d="M 180 300 L 360 360" stroke={VERDE} strokeWidth={22} strokeLinecap="round" />
            <path d="M 360 360 l -36 -36 l -10 50 Z" fill={VERDE} />
            <Letrero x={230} y={240} texto="Fuerza" fondo={VERDE} id={ID} />
          </g>
        )}
        {t >= m('friccion') && (
          <g opacity={e1(t, m('friccion'))}>
            {[[790, 600], [700, 660], [820, 500]].map(([x, y], k) => <ellipse key={k} cx={x} cy={y} rx={34} ry={20} fill={isDark ? "#64748b" : "#334155"} opacity={0.8} />)}
            <Letrero x={960} y={680} texto="Fricción" fondo={PIZARRA} id={ID} />
          </g>
        )}
        {t >= m('inviertes') && [0, 1, 2].map((k) => { const ph = ((t - m('inviertes')) * 0.45 + k / 3) % 1; return <g key={k} opacity={Math.min(1, ph * 5, (1 - ph) * 5)}><Moneda3D x={lerp(160, 430, ph)} y={lerp(180, 360, ph)} r={18} giro={Math.cos(t * 4 + k)} /></g>; })}
        {t >= m('come') && [0, 1].map((k) => { const ph = ((t - m('come')) * 0.5 + k / 2) % 1; return <g key={k} opacity={(1 - ph) * e1(t, m('come'))}><Moneda3D x={lerp(700, 800, ph)} y={lerp(360, 600, ph)} r={18 * (1 - ph)} giro={1} /></g>; })}
        {t >= m('come') && <Letrero x={960} y={760} texto="Se come la inversión" fondo={ROJO_M} id={ID} op={e1(t, m('come'))} tam={24} />}
      </Toma>

      {/* TOMA 2 · empujar más fuerte o quitar la fricción */}
      <Toma t={t} a={m('lecturas')} b={m('bellamy')}>
        <Rueda x={600} y={460} r={200} giro={t * velRueda} id={ID} isDark={isDark} centro="" />
        {/* manchas de roce que se desvanecen */}
        {t >= m('manchas') && [[800, 560], [720, 640], [840, 440], [600, 680]].map(([x, y], k) => <ellipse key={k} cx={x} cy={y} rx={40} ry={24} fill={isDark ? "#64748b" : "#1f2937"} opacity={0.8 * e1(t, m('manchas')) * (1 - sinRoce)} />)}
        {/* la mano que empuja: grande con roce, normal sin él */}
        {t >= m('empujar') && (() => { const g = lerp(1.4, 0.9, sinRoce); const vaiven = 8 * Math.sin(t * (sinRoce > 0.5 ? 3 : 9)); return (
          <g transform={`translate(${250 + vaiven} 460) scale(${g})`} opacity={e1(t, m('empujar'))}>
            <rect x={-120} y={-26} width={130} height={52} rx={26} fill="#f7c4a0" />
            <rect x={-10} y={-40} width={60} height={80} rx={26} fill="#f7c4a0" />
            {sinRoce < 0.5 && [0, 1].map((j) => <path key={j} d={`M ${-60 + j * 40} -50 q -6 -12 0 -18 q 6 6 0 18 Z`} fill="#7dd3fc" />)}
          </g>
        ); })()}
        <g transform="translate(980 200)">
          <rect x={-120} y={-50} width={240} height={100} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
          <Txt f="a" x={-100} y={-10} fontSize={22} fill={c.tenue}>velocidad de giro</Txt>
          <Txt x={-100} y={34} fontSize={40} fill={sinRoce > 0.5 ? VERDE : ROJO_M} peso={800}>{Math.round(velRueda / 6)} rpm</Txt>
        </g>
        {t >= m('lenta') && <Letrero x={600} y={790} texto={sinRoce > 0.5 ? 'Sin roce: gira mucho más rápido' : 'Empuje al máximo, giro lento'} fondo={sinRoce > 0.5 ? VERDE : ROJO_M} id={ID} op={e1(t, m('lenta'))} />}
      </Toma>

      {/* TOMA 3 · el carrusel */}
      <Toma t={t} a={m('bellamy')} b={m('alex')}>
        {(() => {
          const mejor = sm(t, m('gire'), m('gire') + 1.2);
          const ang = t * lerp(0.6, 2.2, mejor);
          return (
            <g>
              <Suelo y={720} isDark={isDark} />
              <ellipse cx={600} cy={640} rx={300} ry={80} fill={AMBAR} />
              <ellipse cx={600} cy={620} rx={300} ry={80} fill="#fbbf24" />
              <rect x={590} y={300} width={20} height={320} fill={PIZARRA} />
              <path d="M 380 310 L 600 230 L 820 310 Z" fill={ROSA} />
              {[0, 1, 2, 3].map((k) => { const a = ang + (k * Math.PI) / 2; const x = 600 + 230 * Math.cos(a), y = 620 + 50 * Math.sin(a); return Math.sin(a) < 0 ? <Persona key={k} id={ID} x={x} y={y} s={0.38} cuerpo={[AZUL_M, VERDE, VIOLETA, TEAL][k]} /> : null; })}
              {[0, 1, 2, 3].map((k) => { const a = ang + (k * Math.PI) / 2; const x = 600 + 230 * Math.cos(a), y = 620 + 50 * Math.sin(a); return Math.sin(a) >= 0 ? <Persona key={k} id={ID} x={x} y={y} s={0.42} cuerpo={[AZUL_M, VERDE, VIOLETA, TEAL][k]} /> : null; })}
              {t >= m('nino') && (
                <g opacity={e1(t, m('nino')) * (1 - mejor)}>
                  <Persona id={ID} x={960 + 6 * Math.sin(t * 9)} y={720} s={0.8} cuerpo={NARANJA} />
                  <Letrero x={960} y={790} texto="¿Empujar más fuerte?" fondo={PIZARRA} id={ID} tam={24} />
                </g>
              )}
              {mejor > 0.01 && <Letrero x={600} y={800} texto="Que el carrusel gire mejor" id={ID} op={mejor} />}
              {mejor > 0.01 && [0, 1, 2].map((k) => { const ph = (t * 0.8 + k / 3) % 1; return <path key={k} d={`M ${600 + 40 * Math.cos(k * 2)} ${300 + ph * 300} q -6 10 0 14 q 6 -4 0 -14 Z`} fill={AMBAR} opacity={(1 - ph) * mejor} />; })}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 4 · Alex: boca a boca positivo y negativo */}
      <Toma t={t} a={m('alex')} b={m('donde')}>
        {(() => {
          const malo = t >= m('sinAtender');
          const t0 = malo ? m('mala') : m('cuenta');
          const crece = sm(t, t0, t0 + 4);
          const color = malo ? ROJO_M : VERDE;
          return (
            <g>
              {nodos.map((nd, k) => {
                const vis = nd.nivel === 0 ? 1 : Math.min(1, Math.max(0, crece * 3.2 - (nd.nivel - 1)));
                const p = padre(k);
                return (
                  <g key={k} opacity={vis}>
                    {p >= 0 && <line x1={nodos[p].x + 30} y1={nodos[p].y - 40} x2={nd.x - 30} y2={nd.y - 40} stroke={color} strokeWidth={4} strokeDasharray="8 8" strokeDashoffset={-t * 30} opacity={0.7} />}
                    <Persona id={ID} x={nd.x} y={nd.y} s={nd.nivel === 3 ? 0.26 : 0.34} cuerpo={k === 0 ? AZUL_M : malo ? '#94a3b8' : color} ojos={malo && k === 0 ? 0.1 : 1} />
                  </g>
                );
              })}
              <Letrero x={200} y={540} texto="Alex" fondo={AZUL_M} id={ID} tam={24} />
              {t >= m('bien') && !malo && <Letrero x={600} y={150} texto="Feliz: lo cuenta a todos" fondo={VERDE} id={ID} op={e1(t, m('bien'))} />}
              {t >= m('exponencial') && !malo && <Letrero x={600} y={810} texto="Crece de forma exponencial" id={ID} op={e1(t, m('exponencial'))} />}
              {malo && <Letrero x={600} y={150} texto="Mala experiencia" fondo={ROJO_M} id={ID} op={e1(t, m('sinAtender'))} />}
              {t >= m('cuesta') && malo && <Letrero x={600} y={810} texto="Cada vez cuesta más vender" fondo={ROJO_M} id={ID} op={e1(t, m('cuesta'))} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 5 · compensación alineada con el éxito del cliente */}
      <Toma t={t} a={m('donde')} b={m('ejercicio')}>
        <Suelo y={700} isDark={isDark} />
        <Rueda x={260} y={330} r={110} giro={t * 20} id={ID} activo={t >= m('donde') ? 2 : -1} centro="" isDark={isDark} />
        {t >= m('donde') && <Letrero x={260} y={480} texto="En deleitar" fondo={ROSA} id={ID} op={e1(t, m('donde'))} tam={24} />}
        {t >= m('compensacion') && (
          <g opacity={e1(t, m('compensacion'))}>
            <Equipo id={ID} k="ven" x={560} y={700} s={0.7} t={t} nombre={false} />
            <Persona id={ID} x={900} y={700} s={0.7} cuerpo={AZUL_M} ojos={t >= m('cancela') && t < m('coincide') ? 0.1 : 1} />
            <Letrero x={900} y={760} texto="Cliente" fondo={AZUL_M} id={ID} tam={24} />
          </g>
        )}
        {t >= m('cancela') && <Letrero x={900} y={400} texto="Cancela antes de 8 meses" fondo={ROJO_M} id={ID} op={e1(t, m('cancela')) * (1 - ac(t, m('cobra') - 0.3, m('cobra')))} tam={24} />}
        {t >= m('devuelve') && t < m('cobra') + 0.5 && [0, 1].map((k) => { const ph = ((t - m('devuelve')) * 0.5 + k / 2) % 1; return <g key={k} opacity={Math.min(1, ph * 5, (1 - ph) * 5)}><Moneda3D x={lerp(620, 760, ph)} y={lerp(540, 300, ph) + 60 * Math.sin(Math.PI * ph)} r={18} giro={Math.cos(t * 5 + k)} /></g>; })}
        {t >= m('devuelve') && <Letrero x={560} y={400} texto="Devuelve la comisión" fondo={PIZARRA} id={ID} op={e1(t, m('devuelve')) * (1 - ac(t, m('cobra') - 0.3, m('cobra')))} tam={24} />}
        {t >= m('coincide') && (
          <g opacity={e1(t, m('coincide'))}>
            <path d="M 620 560 Q 730 460 840 560" stroke={VERDE} strokeWidth={8} fill="none" strokeLinecap="round" />
            <Visto x={730} y={470} r={30} />
            <Letrero x={730} y={300} texto="Gana quien retiene" fondo={VERDE} id={ID} />
          </g>
        )}
      </Toma>

      {/* TOMA 6 · el ejercicio */}
      <Toma t={t} a={m('ejercicio')} b={fin + 1}>
        <rect x={180} y={170} width={430} height={560} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
        <Txt f="a" x={220} y={230} fontSize={28} fill={NARANJA} peso={700}>Mis fuerzas</Txt>
        {['Atraer', 'Interactuar', 'Deleitar'].map((txt, k) => <g key={txt} opacity={e1(t, m('ejercicio') + 0.4 + k * 0.4)}>
          <rect x={220} y={280 + k * 140} width={350} height={100} rx={16} fill={c.panel2} />
          <circle cx={262} cy={330 + k * 140} r={20} fill={['#f59e0b', NARANJA, ROSA][k]} />
          <Txt f="a" x={296} y={340 + k * 140} fontSize={26} fill={c.texto}>{txt}</Txt>
        </g>)}
        {t >= m('reasignar') && (
          <g opacity={e1(t, m('reasignar'))}>
            <Rueda x={900} y={460} r={150} giro={t * 30} id={ID} activo={2} centro="" isDark={isDark} />
            {[0, 1, 2].map((k) => { const ph = ((t - m('reasignar')) * 0.5 + k / 3) % 1; return <g key={k} opacity={Math.min(1, ph * 5, (1 - ph) * 5)}><Moneda3D x={lerp(580, 960, ph)} y={lerp(350 + k * 120, 560, ph)} r={16} giro={Math.cos(t * 4 + k)} /></g>; })}
            <Letrero x={900} y={680} texto="Más recursos al deleite" fondo={ROSA} id={ID} tam={24} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
