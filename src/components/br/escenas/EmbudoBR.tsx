import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Regalo, Cubo, EtiquetaPrecio, Visto, Tarjeta, Conector, Pastilla, pop, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Regalar para calificar.
 * Toma 1: el experimento de los cien visitantes, venta directa: una cuadrícula de cien personas unida por un conector a
 * la tienda del producto de 197 dólares; solo un punto viaja y se vuelve cliente.
 * Toma 2: la misma cuadrícula, ahora con un regalo que solo cobra el envío: ocho puntos viajan al regalo y dos de ellos
 * siguen hasta el producto. Resultado: ocho clientes y 394 dólares; abajo, los dos multiplicadores.
 * Toma 3: el precio cero (Shampanier, Mazar y Ariely, 2007): un deslizador baja el precio y la demanda apenas se mueve
 * hasta que llega a cero y se dispara; al final, la etiqueta del envío a la vista.
 */

const ID = 'br04', P = 'br-embudo';

export const EmbudoBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('recorrido'), 'Escalera y embudo'], [m('experimento'), 'Cien visitantes'], [m('regalo'), 'Regalar con envío'],
    [m('resultado'), 'Ocho clientes, el doble'], [m('ariely'), 'El precio cero'], [m('avisar'), 'El envío, a la vista'],
  ];
  const punto = (k: number) => [110 + (k % 10) * 32, 300 + Math.floor(k / 10) * 30] as const;
  const viajeA = sm(t, m('uno'), m('uno') + 1.6);
  const viajeB = sm(t, m('ocho'), m('ocho') + 1.8);
  const viajeB2 = sm(t, m('cuarta'), m('cuarta') + 1.6);
  const OCHO = [7, 18, 33, 41, 56, 64, 79, 92];

  // Toma 3: deslizador de precio.
  const desliza = sm(t, m('cero') - 1.5, m('cero') + 0.6);
  const PRE: [string, number][] = [['$3', 0.14], ['$2', 0.18], ['$1', 0.24], ['Gratis', 0.92]];

  const Grilla: React.FC<{ marcadas?: number[]; color?: string }> = ({ marcadas = [], color = NARANJA }) => (
    <g>{Array.from({ length: 100 }, (_, k) => { const [x, y] = punto(k); return <circle key={k} cx={x} cy={y} r={10} fill={marcadas.includes(k) ? color : c.apagado} />; })}</g>
  );

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Regalar para calificar">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Venta directa */}
      <Toma t={t} a={0} b={m('regalo')} cy={470}>
        <Tarjeta x={70} y={200} w={420} h={450} titulo="100 visitantes" c={c} id={ID} op={E('experimento', 0.6, -0.3)} />
        <g opacity={E('enviaba')}><Grilla marcadas={viajeA > 0 ? [] : []} /></g>
        <Conector x1={480} y1={420} x2={760} y2={420} u={sm(t, m('enviaba') + 0.4, m('enviaba') + 1)} t={t} color={GRIS} puntos={5} />
        <Tarjeta x={760} y={240} w={340} h={330} titulo="Producto" c={c} id={ID} op={E('enviaba', 0.6, 0.4)} acento={AZUL_M}>
          <Cubo x={120} y={265} l={80} color={AZUL_M} />
          <EtiquetaPrecio x={250} y={215} texto="$197" color={AZUL_M} s={0.85} />
        </Tarjeta>
        {viajeA > 0 && viajeA < 1 && (() => { const [x0, y0] = punto(44); return <circle cx={lerp(x0, 930, viajeA)} cy={lerp(y0, 470, viajeA) - 80 * Math.sin(Math.PI * viajeA)} r={13} fill={VERDE} />; })()}
        <Pastilla x={930} y={640} texto="1 cliente · $197" fondo={VERDE} tam={28} op={E('uno', 0.5, 1.6)} />
        <Pastilla x={280} y={700} texto="≈ 1 %" fondo={GRIS} tam={26} op={E('uno')} />
      </Toma>

      {/* 2 · Regalar con envío */}
      <Toma t={t} a={m('regalo')} b={m('ariely')} cy={470}>
        <Tarjeta x={70} y={200} w={420} h={450} titulo="100 visitantes" c={c} id={ID} op={1} />
        <Grilla marcadas={viajeB >= 1 ? OCHO : []} color={NARANJA} />
        <g opacity={E('regalo')}>
          <Regalo x={600} y={460} s={1.4} color={ROSA} />
          <Pastilla x={600} y={300} texto={movil ? 'Paga envío' : 'Solo paga el envío'} fondo={AMBAR} tam={24} op={E('envio')} />
        </g>
        {viajeB > 0 && viajeB < 1 && OCHO.map((k, j) => { const [x0, y0] = punto(k); const p = sm(viajeB, j * 0.06, 0.6 + j * 0.05); return <circle key={k} cx={lerp(x0, 600, p)} cy={lerp(y0, 430, p) - 60 * Math.sin(Math.PI * p)} r={10} fill={NARANJA} opacity={p < 1 ? 1 : 0} />; })}
        <Conector x1={680} y1={440} x2={830} y2={440} u={sm(t, m('cuarta') - 0.4, m('cuarta'))} t={t} color={VERDE} puntos={2} />
        <Tarjeta x={830} y={280} w={280} h={300} titulo="Producto $197" c={c} id={ID} op={E('cuarta', 0.6, -0.3)} acento={AZUL_M} tam={24}>
          <Cubo x={140} y={240} l={72} color={AZUL_M} />
        </Tarjeta>
        {[0, 1].map((j) => viajeB2 > 0 && viajeB2 < 1 ? <circle key={j} cx={lerp(640, 960 + j * 40, viajeB2)} cy={430 - 70 * Math.sin(Math.PI * viajeB2)} r={12} fill={VERDE} /> : null)}
        <Pastilla x={600} y={600} texto="8 de 100" fondo={NARANJA} tam={26} op={E('ocho', 0.5, 1.6)} />
        <Pastilla x={970} y={640} texto={movil ? '8 clientes · $394' : '8 clientes · $394'} fondo={VERDE} tam={26} op={E('resultado')} />
        <Pastilla x={430} y={760} texto="Ingresos ×2" fondo={VIOLETA} tam={30} op={E('doble')} />
        <Pastilla x={770} y={760} texto="Clientes ×8" fondo={VIOLETA} tam={30} op={E('doble', 0.5, 0.4)} />
      </Toma>

      {/* 3 · El precio cero */}
      <Toma t={t} a={m('ariely')} b={fin + 1} cy={470}>
        <Tarjeta x={150} y={190} w={900} h={470} titulo={movil ? 'Demanda' : 'Demanda según el precio'} c={c} id={ID} op={E('ariely', 0.6, -0.3)}>
          <rect x={80} y={380} width={740} height={5} rx={2} fill={c.apagado} />
          {PRE.map(([txt, v], k) => {
            const h = 290 * v * sm(desliza, k * 0.28, k * 0.28 + 0.14);
            const x = 160 + k * 190;
            return (
              <g key={txt}>
                <rect x={x - 55} y={380 - h} width={110} height={h} rx={12} fill={k === 3 ? VERDE : GRIS} />
                <Txt x={x} y={430} textAnchor="middle" fontSize={28} fill={k === 3 ? VERDE : c.texto} peso={800}>{txt}</Txt>
              </g>
            );
          })}
        </Tarjeta>
        <rect x={310} y={720} width={580} height={12} rx={6} fill={c.apagado} opacity={E('ariely')} />
        <circle cx={310 + 580 * desliza} cy={726} r={22} fill={`url(#${ID}-marca)`} opacity={E('ariely')} />
        <Pastilla x={520} y={790} texto={movil ? "Ariely y otros, 2007" : "Shampanier, Mazar y Ariely, 2007"} fondo={AZUL_M} tam={24} op={E('ariely', 0.5, 0.6)} />
        {t >= m('avisar') && (
          <g opacity={E('avisar')}>
            <Pastilla x={1010} y={788} texto={movil ? 'Envío visible' : 'Envío a la vista'} fondo={VERDE} tam={24} />
            
            
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
