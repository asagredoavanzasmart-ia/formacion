import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, Sello, Trofeo, Avion, Pala, Moneda3D, LogoCF, Tarjeta, Conector, Pastilla, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La evidencia que falta.
 * Toma 1: el club de las dos comas como la punta de un iceberg: sobre el agua, el trofeo y los 71 ganadores de 2016;
 * bajo el agua aparece la parte que no se ve: muchas figuras con signo de pregunta, el denominador que falta.
 * Toma 2: Abraham Wald (1943): un avión que volvió con agujeros en las alas; las zonas sin agujeros (motores y cabina)
 * se encienden, porque los aviones heridos ahí no volvieron. La falacia de la tasa base como sello.
 * Toma 3: facturar no es ganar (ventas y anuncios casi iguales dejan una utilidad delgada) y la fiebre del oro: los
 * mineros cavan y las monedas van a quien vende las palas; el negocio principal de Brunson es vender software y
 * formación, y lo que corresponde pedir son resultados en industrias reales.
 */

const ID = 'br28', P = 'br-sesgos';

export const SesgosBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('club'), 'El club de las dos comas'], [m('denominador'), 'Falta el denominador'], [m('wald'), 'Abraham Wald (1943)'],
    [m('tasa'), 'La tasa base'], [m('facturar'), 'Facturar no es ganar'], [m('palas'), 'Vender palas'], [m('industrias'), 'Industrias reales'],
  ];
  const bajo = sm(t, m('denominador'), m('denominador') + 1.6);
  const AGU: [number, number][] = [[-230, 40], [-190, 52], [-150, 34], [-110, 48], [110, 46], [150, 36], [190, 50], [230, 42], [-70, 210], [70, 212]];
  const zonas = sm(t, m('aviones') + 1.6, m('aviones') + 2.4);
  const fiebre = (t - m('palas')) * 0.6;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La evidencia que falta">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El iceberg */}
      <Toma t={t} a={0} b={m('wald')} cy={470}>
        <rect x={60} y={430} width={1080} height={420} fill={AZUL_M} opacity={0.18} />
        <path d={`M 60 430 ${Array.from({ length: 12 }, (_, k) => `Q ${105 + k * 90} ${422 + 8 * Math.sin(t * 2 + k)} ${150 + k * 90} 430`).join(' ')}`} stroke={AZUL_M} strokeWidth={4} fill="none" opacity={0.6} />
        <g opacity={E('club', 0.6, -0.4)}>
          {/* Punta del iceberg con una meseta donde se apoya el trofeo */}
          <path d="M 450 432 L 510 350 L 540 312 L 660 312 L 700 360 L 750 432 Z" fill="#e0f2fe" />
          <path d="M 600 312 L 660 312 L 700 360 L 750 432 L 600 432 Z" fill="#bae6fd" />
          <path d="M 540 312 L 660 312 L 650 322 L 548 322 Z" fill="#fff" opacity={0.8} />
          <Trofeo x={600} y={318} s={0.5} />
          {[0, 1, 2, 3].map((k) => <Persona key={k} id={ID} x={[506, 548, 664, 706][k]} y={[396, 360, 360, 396][k]} s={0.3} cuerpo={AMBAR} />)}
          <g opacity={E('setenta')}>
            <Cifra x={890} y={330} valor={71} u={sm(t, m('setenta'), m('setenta') + 1)} tam={70} color={AMBAR} />
            <Txt x={890} y={372} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>{movil ? 'en 2016' : 'ganadores en 2016'}</Txt>
          </g>
          <Pastilla x={260} y={330} texto={movil ? '+$1 millón' : 'Más de $1 millón con un embudo'} fondo={AMBAR} tam={22} />
        </g>
        <g opacity={bajo}>
          <path d="M 450 432 L 300 560 L 200 760 L 520 840 L 900 820 L 1000 640 L 750 432 Z" fill="#bae6fd" opacity={0.65} />
          {Array.from({ length: 18 }, (_, k) => {
            const x = 300 + (k % 6) * 110 + (Math.floor(k / 6) % 2) * 40, y = 560 + Math.floor(k / 6) * 90;
            return <g key={k} opacity={sm(bajo, k / 18, k / 18 + 0.2)}><Persona id={ID} x={x} y={y + 30} s={0.32} cuerpo="#64748b" /><Txt x={x + 22} y={y - 36} fontSize={22} fill={c.texto} peso={800}>?</Txt></g>;
          })}
          <Pastilla x={600} y={810} texto={movil ? '¿Cuántos perdieron?' : '¿Cuántos aplicaron la plantilla y perdieron?'} fondo={ROJO_M} tam={24} />
        </g>
      </Toma>

      {/* 2 · Los aviones de Wald */}
      <Toma t={t} a={m('wald')} b={m('facturar')} cy={470}>
        <Avion x={560} y={480} s={0.95} agujeros={AGU} agU={sm(t, m('aviones'), m('aviones') + 1.4)} op={E('wald')} />
        {zonas > 0 && [[560, 260], [370, 530], [750, 530], [560, 700]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={36 + 6 * Math.sin(t * 4)} fill={ROJO_M} opacity={0.35 * zonas} />)}
        <Pastilla x={950} y={240} texto={movil ? 'Solo vemos a los que volvieron' : 'Solo vemos a los que volvieron'} fondo={GRIS} tam={22} op={E('aviones')} />
        <Pastilla x={950} y={300} texto={movil ? 'Sin agujeros: no volvieron' : 'Donde no hay agujeros: no volvieron'} fondo={ROJO_M} tam={22} op={zonas} />
        {t >= m('tasa') && <Sello x={950} y={760} texto={movil ? 'Tasa base' : 'Falacia de la tasa base'} u={sm(t, m('tasa'), m('tasa') + 0.6)} color={VIOLETA} tam={24} rot={-3} />}
      </Toma>

      {/* 3 · Facturar y vender palas */}
      <Toma t={t} a={m('facturar')} b={fin + 1} cy={470}>
        <Tarjeta x={60} y={200} w={360} h={470} titulo={movil ? 'Facturar' : 'Facturar no es ganar'} c={c} id={ID} op={E('facturar')} acento={ROJO_M} tam={24}>
          <rect x={40} y={390} width={280} height={5} rx={2} fill={c.apagado} />
          <rect x={60} y={390 - 280 * sm(t, m('facturar'), m('facturar') + 1)} width={100} height={280 * sm(t, m('facturar'), m('facturar') + 1)} rx={10} fill={VERDE} />
          <rect x={200} y={390 - 264 * sm(t, m('facturar') + 0.5, m('facturar') + 1.5)} width={100} height={264 * sm(t, m('facturar') + 0.5, m('facturar') + 1.5)} rx={10} fill={ROJO_M} />
          <Txt x={110} y={430} textAnchor="middle" fontSize={22} fill={c.texto} peso={800}>{movil ? 'Venta' : 'Ventas'}</Txt>
          <Txt x={250} y={430} textAnchor="middle" fontSize={22} fill={c.texto} peso={800}>{movil ? 'Gasto' : 'Anuncios'}</Txt>
          {!movil && <Txt x={180} y={96} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>≈ $1 millón cada una</Txt>}
        </Tarjeta>
        {t >= m('palas') && (
          <g opacity={E('palas')}>
            {/* Terreno de la fiebre del oro: tierra con montículos y pepitas */}
            <path d="M 450 700 Q 560 676 680 696 Q 780 712 880 694 L 880 730 L 450 730 Z" fill="#a16207" opacity={0.45} />
            {[[520, 712], [640, 716], [760, 710]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={5} fill="#facc15" opacity={0.6 + 0.4 * Math.sin(t * 4 + k)} />)}
            {[0, 1, 2].map((k) => {
              const x = 500 + k * 130, golpe = Math.sin(t * 4 + k * 1.3);
              return (
                <g key={k}>
                  <Persona id={ID} x={x} y={700} s={0.5} cuerpo={GRIS} />
                  <Pala x={x + 44} y={656 - 6 * golpe} s={0.3} rot={-28 + 10 * golpe} />
                  {golpe > 0.6 && <circle cx={x + 70} cy={690 - 20 * golpe} r={5} fill="#92400e" opacity={golpe} />}
                </g>
              );
            })}
            {/* La tienda que vende las palas */}
            <rect x={918} y={470} width={200} height={230} fill="#fde7d2" />
            <rect x={1050} y={470} width={68} height={230} fill="#000" opacity={0.06} />
            <path d="M 904 470 H 1132 L 1116 432 H 920 Z" fill={AMBAR} />
            {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M ${918 + k * 40} 470 q 20 22 40 0`} fill={k % 2 ? '#fff' : AMBAR} />)}
            <rect x={950} y={402} width={136} height={34} rx={8} fill="#78350f" />
            <Txt x={1018} y={427} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>Palas</Txt>
            <rect x={940} y={540} width={90} height={70} rx={6} fill="#bfdbfe" />
            <Pala x={985} y={575} s={0.2} rot={0} />
            <rect x={1050} y={600} width={46} height={100} rx={4} fill="#7c2d12" />
            <Pala x={1126} y={640} s={0.3} rot={8} />
            <ellipse cx={1018} cy={704} rx={120} ry={9} fill="#000" opacity={0.14} />
            {/* El oro viaja desde los mineros hasta la caja de la tienda */}
            {Array.from({ length: 3 }, (_, k) => { const p = (fiebre + k / 3) % 1; return <Moneda3D key={k} x={lerp(560 + k * 120, 990, p)} y={lerp(620, 520, p) - 90 * Math.sin(Math.PI * p)} r={14} giro={Math.cos(t * 5 + k)} op={Math.sin(Math.PI * p)} />; })}
            <Pastilla x={1010} y={790} texto={movil ? 'Vende palas' : 'Gana quien vende las palas'} fondo={AMBAR} tam={22} />
          </g>
        )}
        <Pastilla x={680} y={225} texto={movil ? '«Él sí aplica»' : '«Yo sí aplico lo que enseño»'} fondo={c.panel} color={c.texto} tam={22} op={E('aplica')} />
        {t >= m('vender') && <g opacity={E('vender')}><LogoCF x={560} y={310} s={0.45} isDark={isDark} /><Txt x={640} y={320} fontSize={24} fill={c.texto} peso={800}>{movil ? 'Software y cursos' : 'Vende software y formación'}</Txt></g>}
        {t >= m('industrias') && <Sello x={540} y={800} texto={movil ? 'Pide resultados' : 'Pide resultados en industrias reales'} u={sm(t, m('industrias'), m('industrias') + 0.6)} color={VERDE} tam={24} rot={-3} />}
      </Toma>
    </Lienzo>
  );
};
