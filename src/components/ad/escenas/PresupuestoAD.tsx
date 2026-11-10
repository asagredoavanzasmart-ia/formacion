import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Frasco, Megafono, Billete, Visto, Cruz, Gente, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Presupuesto de ensayo.
 * Toma 1: tres fases como tres puertas: rastrear (una lupa sobre cada prospecto y venta), perder controlado (diez
 * anuncios: nueve se apagan, el décimo brilla) e imprimir (una imprenta que saca billetes).
 * Toma 2: la regla: el frasco de 30 días de un cliente (100) duplicado (200) es el límite del ensayo; un anuncio gasta
 * hasta 100 sin prospectos y se apaga; otro que trae prospectos sigue hasta 200 y produce la venta.
 * Toma 3: la caja protegida: ningún anuncio cuesta más de lo que un cliente devuelve rápido.
 */

const ID = 'ad24', P = 'ad-presupuesto';

const Interruptor: React.FC<{ x: number; y: number; on: boolean }> = ({ x, y, on }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-36} y={-20} width={72} height={40} rx={20} fill={on ? VERDE : GRIS} />
    <circle cx={on ? 16 : -16} cy={0} r={16} fill="#fff" />
  </g>
);

export const PresupuestoAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('fases'), 'Tres fases'], [m('nueve'), 'Nueve de cada diez pierden'], [m('regla'), 'La regla del ensayo'], [m('apagas'), 'Sin prospectos: se apaga'],
    [m('tercera'), 'Imprimir dinero'], [m('protege'), 'La caja protegida'],
  ];
  const gasto1 = 100 * sm(t, m('cien'), m('apagas'));
  const gasto2 = 100 * sm(t, m('apagas'), m('doscientos')) + 100 * sm(t, m('doscientos'), m('doscientos') + 2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Presupuesto de ensayo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Tres fases */}
      <Toma t={t} a={0} b={m('regla')} cy={470}>
        {([['rastrear', 'Rastrear', AZUL_M, 230], ['perder', 'Perder controlado', AMBAR, 600], ['imprimir', 'Imprimir', VERDE, 970]] as const).map(([n, txt, col, x], k) => (
          <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.15}>
            <rect x={x - 170} y={180} width={340} height={540} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <g transform={`translate(${x} 420)`}>
              {k === 0 && <g><Gente x={-80} y={60} n={3} activos={3} color={col} paso={80} s={0.5} /><g transform={`translate(${-60 + 80 * Math.sin(t)} -40)`}><circle r={46} fill="#fff" opacity={0.4} /><circle r={46} fill="none" stroke={c.texto} strokeWidth={10} /><rect x={32} y={32} width={14} height={50} rx={6} fill={c.texto} transform="rotate(-45 32 32)" /></g></g>}
              {k === 1 && Array.from({ length: 10 }, (_, j) => {
                const apaga = j < 9 && t >= m('nueve') + j * 0.1;
                const gana = j === 9 && t >= m('decimo');
                return <rect key={j} x={-130 + (j % 5) * 54} y={-80 + Math.floor(j / 5) * 90} width={44} height={70} rx={8} fill={gana ? VERDE : apaga ? c.apagado : col} opacity={gana ? 1 - 0.05 * Math.sin(t * 6) : 1} />;
              })}
              {k === 2 && <g><rect x={-90} y={-70} width={180} height={120} rx={14} fill="#334155" /><rect x={-70} y={-90} width={140} height={30} rx={8} fill="#475569" />
                {[0, 1, 2].map((j) => { const ph = ((t - m('imprimir')) * 0.8 + j / 3) % 1; return <Billete key={j} x={0} y={50 + 120 * ph} s={0.8} op={1 - ph} />; })}</g>}
            </g>
            <Letrero x={x} y={680} texto={txt} fondo={col} id={ID} tam={26} />
          </g>
        ))}
        {t >= m('decimo') && <Letrero x={600} y={780} texto="El décimo multiplica" fondo={VERDE} id={ID} tam={28} op={e1(t, m('decimo'))} />}
      </Toma>

      {/* 2 · La regla del ensayo */}
      <Toma t={t} a={m('regla')} b={m('protege')} cy={470}>
        <g opacity={e1(t, m('regla'))}>
          <Frasco x={180} y={600} w={140} h={220} v={0.5} t={t} c={c} />
          <Txt x={180} y={340} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>30 días</Txt>
          {t >= m('dos') && <g opacity={e1(t, m('dos'))}><Txt x={290} y={500} textAnchor="middle" fontSize={56} fill={c.tenue} peso={800}>× 2</Txt></g>}
          {t >= m('cien') && <Cifra x={180} y={660} valor={100} u={sm(t, m('cien'), m('cien') + 0.6)} pre="$" tam={40} color={VERDE} />}
          {/* Anuncio A: sin prospectos, se apaga a los 100 */}
          {t >= m('cien') && (
            <g opacity={e1(t, m('cien'))}>
              <Megafono x={420} y={330} s={0.6} habla={t < m('apagas') ? 1 : 0} t={t} />
              <rect x={560} y={300} width={500} height={30} rx={15} fill={c.apagado} />
              <rect x={560} y={300} width={250 * gasto1 / 100} height={30} rx={15} fill={t >= m('apagas') ? GRIS : AMBAR} />
              <path d="M 810 286 V 344" stroke={c.texto} strokeWidth={4} strokeDasharray="6 6" />
              <Interruptor x={1100} y={250} on={t < m('apagas')} />
              {t >= m('apagas') && <Cruz x={1100} y={330} r={26} op={e1(t, m('apagas'))} />}
              {!movil && <Txt f="a" x={560} y={370} fontSize={22} fill={c.tenue}>0 prospectos</Txt>}
            </g>
          )}
          {/* Anuncio B: con prospectos, hasta 200 */}
          {t >= m('apagas') && (
            <g opacity={e1(t, m('apagas'))}>
              <Megafono x={420} y={560} s={0.6} habla={1} t={t} />
              <rect x={560} y={530} width={500} height={30} rx={15} fill={c.apagado} />
              <rect x={560} y={530} width={250 * gasto2 / 100} height={30} rx={15} fill={VIOLETA} />
              <path d="M 1060 516 V 574" stroke={c.texto} strokeWidth={4} strokeDasharray="6 6" />
              <Gente x={600} y={680} n={4} activos={Math.round(4 * sm(t, m('apagas'), m('doscientos') + 1.5))} color={VIOLETA} paso={60} s={0.45} />
              {t >= m('doscientos') + 1.5 && <Visto x={1000} y={640} r={34} op={e1(t, m('doscientos') + 1.5)} />}
              {t >= m('doscientos') && <Letrero x={810} y={480} texto="Hasta 200 para una venta" fondo={VIOLETA} id={ID} tam={26} op={e1(t, m('doscientos'))} />}
            </g>
          )}
          {t >= m('tercera') && <Letrero x={600} y={790} texto="Lo que funciona: más presupuesto" fondo={VERDE} id={ID} tam={28} op={e1(t, m('tercera'))} />}
        </g>
      </Toma>

      {/* 3 · La caja protegida */}
      <Toma t={t} a={m('protege')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('protege'))}>
          <Frasco x={600} y={700} w={240} h={360} v={0.6 + 0.03 * Math.sin(t * 2)} t={t} c={c} />
          <path d="M 420 300 Q 600 200 780 300" stroke={AZUL_M} strokeWidth={22} fill="none" strokeLinecap="round" />
          <Letrero x={600} y={780} texto="Nunca más de lo que un cliente devuelve rápido" fondo={AZUL_M} id={ID} tam={26} />
        </g>
      </Toma>
    </Lienzo>
  );
};
