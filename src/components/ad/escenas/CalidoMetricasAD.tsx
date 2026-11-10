import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Gente, Escalon, EtiquetaPrecio, Billete, Telefono, Burbuja, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Las métricas del alcance cálido.
 * Toma 1: un colador de cuatro pisos: 100 puntos caen, 20 pasan, 4 pasan, 1 llega al fondo como cliente o referido.
 * Toma 2: la escalera de precio: gratis → −80 % → −60 % → −40 % → tarifa completa; la etiqueta sube peldaño a peldaño.
 * Toma 3: la cuenta pequeña (400 × 5 por semana = 2.000; 104.000 al año) y el teléfono que reactiva la lista con la
 * pregunta corta.
 */

const ID = 'ad20', P = 'ad-calido-metricas';

export const CalidoMetricasAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('cien'), '100 → 20 → 4 → 1'], [m('referir'), 'Validado: sube el precio'], [m('pequena'), 'Incluso con una oferta pequeña'], [m('reactivar'), 'Reactivar una lista'],
  ];
  const PISOS: [string, number, string][] = [['cien', 100, GRIS], ['veinte', 20, AZUL_M], ['cuatro', 4, VIOLETA], ['uno', 1, VERDE]];
  const ESC: [string, string][] = [['referir', 'Gratis'], ['ochenta', '−80 %'], ['sesenta', '−60 %'], ['cuarenta', '−40 %'], ['completa', '100 %']];
  const esc = ESC.reduce((a, [n], k) => (t >= m(n) - 0.1 ? k : a), -1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Las métricas del alcance cálido">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El colador */}
      <Toma t={t} a={0} b={m('referir')} cy={470}>
        {PISOS.map(([n, v, col], k) => {
          const on = t >= m(n) - 0.1;
          const y = 220 + k * 150;
          const w = 760 - k * 170;
          const pts = Math.min(v, 40);
          return (
            <g key={n} opacity={on ? e1(t, m(n)) : 0.12}>
              <rect x={600 - w / 2} y={y + 40} width={w} height={14} rx={7} fill={c.apagado} />
              {Array.from({ length: pts }, (_, j) => <circle key={j} cx={600 - w / 2 + 20 + ((j * 37) % (w - 40))} cy={y + 20 - ((j * 13) % 30) + 4 * Math.sin(t * 3 + j)} r={k === 3 ? 22 : 9} fill={col} />)}
              <Cifra x={600 + w / 2 + 70} y={y + 40} valor={v} u={sm(t, m(n), m(n) + 0.8)} tam={56} color={col} />
            </g>
          );
        })}
        {t >= m('uno') && <Letrero x={600} y={790} texto="Cliente de pago o referido" fondo={VERDE} id={ID} tam={28} op={e1(t, m('uno'))} />}
      </Toma>

      {/* 2 · La escalera de precio */}
      <Toma t={t} a={m('referir')} b={m('pequena')} cy={470}>
        <g opacity={e1(t, m('referir'))}>
          {ESC.map(([n, txt], k) => (
            <g key={n} opacity={k <= esc ? 1 : 0.25}>
              <Escalon x={140 + k * 190} y={760} w={170} h={90 + k * 90} color={k <= esc ? [GRIS, AZUL_M, VIOLETA, ROSA, VERDE][k] : c.apagado} />
              <Txt x={225 + k * 190} y={740 - (90 + k * 90) + 70} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>{txt}</Txt>
            </g>
          ))}
          {esc >= 0 && <Gente x={225 + esc * 190} y={760 - (90 + esc * 90)} n={1} activos={1} color={NARANJA} s={0.8} />}
          {!movil && <Txt f="a" x={225} y={790} textAnchor="middle" fontSize={22} fill={c.tenue}>5 casos</Txt>}
          {t >= m('referir') && <Letrero x={300} y={200} texto="Los casos refieren: validado" fondo={VERDE} id={ID} tam={28} />}
        </g>
      </Toma>

      {/* 3 · La cuenta pequeña y la pregunta corta */}
      <Toma t={t} a={m('pequena')} b={fin + 1} cy={470}>
        <g opacity={ventana(t, m('pequena'), m('reactivar') + 0.3)}>
          <EtiquetaPrecio x={140} y={250} texto="$400" t={t} bal={1} />
          <Txt x={420} y={400} textAnchor="middle" fontSize={44} fill={c.texto} peso={800}>500/semana × 1 %</Txt>
          {t >= m('cinco') && <Cifra x={420} y={500} valor={5} u={sm(t, m('cinco'), m('cinco') + 0.6)} suf=" ventas/semana" tam={46} color={AZUL_M} />}
          {t >= m('cinco') && <Cifra x={420} y={590} valor={2000} u={sm(t, m('cinco') + 0.4, m('cinco') + 1.2)} pre="$" suf="/semana" tam={46} color={VERDE} miles />}
          {t >= m('anual') && (
            <g opacity={e1(t, m('anual'))}>
              {[0, 1, 2, 3].map((k) => <Billete key={k} x={900 + (k % 2) * 60} y={420 - k * 30} s={1} rot={-10 + k * 6} />)}
              <Cifra x={930} y={600} valor={104000} u={sm(t, m('anual'), m('anual') + 1.4)} pre="$" tam={70} color={VERDE} miles />
              <Letrero x={930} y={670} texto="Al año, sin publicidad" fondo={VERDE} id={ID} tam={26} />
            </g>
          )}
        </g>
        {t >= m('reactivar') && (
          <g opacity={e1(t, m('reactivar'))}>
            <Telefono x={260} y={520} s={1.2} />
            <Burbuja x={420} y={470} w={660} texto="¿Sigues buscando conseguir más prospectos comerciales este mes?" u={sm(t, m('pregunta'), m('pregunta') + 2.4)} c={c} id={ID} tam={30} />
            {t >= m('persona') && <Letrero x={760} y={600} texto="Sin enlaces ni imágenes" fondo={AZUL_M} id={ID} tam={26} op={e1(t, m('persona'))} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
