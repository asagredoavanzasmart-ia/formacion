import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Gente, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La evidencia que falta.
 * Toma 1: un podio con el premio del club de las dos comas y la cifra 71; debajo se dibuja una fracción cuyo
 * denominador queda en «?», mientras aparece la multitud gris de quienes no ganaron.
 * Toma 2: Wald: un avión de vuelta con agujeros de bala en las alas; los puntos sin agujeros (motor y cabina) se
 * encienden: ahí estaban los que no volvieron. La tasa base como sello.
 * Toma 3: facturar no es ganar (dos barras casi iguales) y la pala: quien vende las herramientas en la fiebre del oro;
 * al final, pedir resultados en industrias reales.
 */

const ID = 'br28', P = 'br-sesgos';

export const SesgosBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('club'), 'El club de las dos comas'], [m('denominador'), 'Falta el denominador'], [m('wald'), 'Abraham Wald (1943)'],
    [m('tasa'), 'La tasa base'], [m('facturar'), 'Facturar no es ganar'], [m('palas'), 'Vender palas'], [m('industrias'), 'Industrias reales'],
  ];
  const AGU: [number, number][] = [[-220, -10], [-180, 20], [-140, -30], [200, -10], [160, 25], [130, -25], [-40, 120], [40, 130], [0, 150]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La evidencia que falta">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El club y el denominador */}
      <Toma t={t} a={0} b={m('wald')} cy={470}>
        <g opacity={e1(t, m('club') - 0.3)}>
          <rect x={200} y={520} width={260} height={140} rx={10} fill={AMBAR} />
          <path d="M 270 520 V 470 H 390 V 520" fill={AMBAR} opacity={0.8} />
          <path d="M 290 330 H 370 V 380 Q 370 430 330 430 Q 290 430 290 380 Z" fill="#facc15" />
          <rect x={318} y={430} width={24} height={30} fill="#facc15" /><rect x={296} y={458} width={68} height={14} rx={4} fill="#facc15" />
          <Txt x={330} y={610} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>$1.000.000</Txt>
          {t >= m('setenta') && <Cifra x={330} y={290} valor={71} u={sm(t, m('setenta'), m('setenta') + 1)} tam={60} color={AMBAR} />}
          {t >= m('setenta') && <Txt x={330} y={720} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={e1(t, m('setenta'))}>en 2016, según Brunson</Txt>}
        </g>
        {t >= m('denominador') && (
          <g opacity={e1(t, m('denominador'))}>
            <Txt x={780} y={330} textAnchor="middle" fontSize={80} fill={AMBAR} peso={800}>71</Txt>
            <rect x={680} y={360} width={200} height={10} rx={5} fill={c.texto} />
            <Txt x={780} y={460} textAnchor="middle" fontSize={80} fill={ROJO_M} peso={800}>{Math.floor(t * 2) % 2 ? '?' : '¿?'}</Txt>
            <Gente x={620} y={640} n={8} activos={0} color={GRIS} paso={60} s={0.45} />
            <Letrero x={780} y={740} texto="¿Cuántos perdieron?" fondo={ROJO_M} id={ID} tam={26} />
          </g>
        )}
      </Toma>

      {/* 2 · Los aviones de Wald */}
      <Toma t={t} a={m('wald')} b={m('facturar')} cy={470}>
        <g opacity={e1(t, m('wald'))}>
          <g transform="translate(560 440)">
            <path d="M -30 -200 Q 0 -240 30 -200 L 34 180 L 0 210 L -34 180 Z" fill={GRIS} />
            <path d="M -30 -20 L -300 30 L -300 60 L -30 40 Z M 30 -20 L 300 30 L 300 60 L 30 40 Z" fill={GRIS} />
            <path d="M -20 150 L -120 190 L -120 210 L -20 190 Z M 20 150 L 120 190 L 120 210 L 20 190 Z" fill={GRIS} />
            {t >= m('aviones') && AGU.map(([x, y], k) => <circle key={k} cx={x} cy={y + 30 * (Math.abs(x) > 100 ? 1 : 0)} r={9} fill={c.texto} opacity={e1(t, m('aviones') + k * 0.12)} />)}
            {t >= m('aviones') + 1.5 && [[0, -150], [-200, 40], [200, 40]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={28 + 6 * Math.sin(t * 4)} fill={ROJO_M} opacity={0.45 * e1(t, m('aviones') + 1.5)} />)}
          </g>
          {t >= m('aviones') && <Letrero x={960} y={230} texto="Solo vemos los que volvieron" fondo={GRIS} id={ID} tam={24} op={e1(t, m('aviones'))} />}
          {t >= m('tasa') && <Sello x={960} y={720} texto={movil ? 'Tasa base' : 'Falacia de la tasa base'} u={sm(t, m('tasa'), m('tasa') + 0.6)} color={VIOLETA} tam={24} />}
        </g>
      </Toma>

      {/* 3 · Facturar y vender palas */}
      <Toma t={t} a={m('facturar')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('facturar'))}>
          <rect x={130} y={640} width={380} height={6} rx={3} fill={c.apagado} />
          {[0, 1].map((k) => {
            const h = (k === 0 ? 360 : 340) * sm(t, m('facturar') + k * 0.5, m('facturar') + k * 0.5 + 1);
            return (
              <g key={k}>
                <rect x={170 + k * 180} y={640 - h} width={120} height={h} rx={12} fill={k === 0 ? VERDE : ROJO_M} />
                <Txt x={230 + k * 180} y={690} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>{k === 0 ? 'Ventas' : 'Anuncios'}</Txt>
              </g>
            );
          })}
          <Txt x={320} y={240} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>≈ $1 millón cada una</Txt>
        </g>
        {t >= m('palas') && (
          <g opacity={e1(t, m('palas'))}>
            <g transform={`translate(800 440) rotate(${-20 + 6 * Math.sin(t * 2)})`}>
              <rect x={-8} y={-200} width={16} height={240} rx={6} fill="#a16207" />
              <path d="M -50 40 H 50 V 110 Q 0 170 -50 110 Z" fill={GRIS} />
            </g>
            {[0, 1, 2].map((k) => <circle key={k} cx={940 + k * 40} cy={620 - (k % 2) * 20} r={16} fill="#facc15" />)}
            <Letrero x={880} y={250} texto={movil ? 'Vende palas' : 'Gana quien vende las palas'} fondo={AMBAR} id={ID} tam={24} />
          </g>
        )}
        {t >= m('vender') && <Letrero x={880} y={690} texto="Vende software y formación" fondo={VIOLETA} id={ID} tam={24} op={e1(t, m('vender'))} />}
        {t >= m('industrias') && <Sello x={600} y={790} texto={movil ? 'Pide resultados' : 'Pide resultados en industrias reales'} u={sm(t, m('industrias'), m('industrias') + 0.6)} color={VERDE} tam={24} />}
      </Toma>
    </Lienzo>
  );
};
