import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Registradora, Cruz, Visto, Suelo, Flecha, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * ¿Y si esto fuera fácil?
 * Toma 1: la tarjeta con la pregunta que gira: de «¿por qué es tan difícil?» a «¿y si fuera fácil?»; Southwest: el armario
 * de servidores de 2 millones tachado frente a la caja registradora que imprime «esto es un boleto».
 * Toma 2 (Amazon): una escalera de pasos de pago que alguien sube durante meses; Bezos la reduce a un solo botón.
 * Toma 3: el Manifiesto Ágil; la lista de pasos de un proceso que se revisa uno por uno: los que nadie extraña se van y
 * queda un camino recto.
 */

const ID = 'es19', P = 'es-facil';

export const FacilES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('invertir'), 'Invertir la pregunta'], [m('facil'), '¿Y si fuera fácil?'], [m('dos'), 'Southwest'], [m('boleto'), '«Esto es un boleto»'],
    [m('minimos'), 'Los pasos mínimos'], [m('amazon'), 'Amazon'], [m('clic'), 'Un solo clic'], [m('agil'), 'Manifiesto Ágil, 2001'],
    [m('pasos'), 'Revisar cada paso'], [m('camino'), 'El camino fácil y correcto'],
  ];
  const giro = sm(t, m('facil') - 0.2, m('facil') + 0.6);
  const unClic = sm(t, m('bezos'), m('clic'));
  const PASOS = ['Pedido', 'Revisión', 'Firma', 'Copia', 'Aprobación', 'Registro', 'Aviso', 'Archivo'];
  const sobra = [1, 3, 5, 7];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="¿Y si esto fuera fácil?">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la pregunta y el boleto */}
      <Toma t={t} a={0} b={m('minimos')} cy={480}>
        {ventana(t, 0, m('dos')) > 0.01 && (
          <g opacity={ventana(t, 0, m('dos'))} transform={`translate(600 440) scale(${Math.abs(Math.cos(Math.PI * giro)) || 0.02} 1)`}>
            <rect x={-360} y={-140} width={720} height={280} rx={30} fill={giro < 0.5 ? GRIS : NARANJA} />
            <Txt x={0} y={16} textAnchor="middle" fontSize={50} fill="#fff">{giro < 0.5 ? '¿Por qué es tan difícil?' : '¿Y si fuera fácil?'}</Txt>
          </g>
        )}
        {t >= m('dos') && (
          <g opacity={e1(t, m('dos'))}>
            <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
            <g transform="translate(300 720)">
              <rect x={-110} y={-380} width={220} height={380} rx={14} fill="#1f2937" />
              {Array.from({ length: 8 }, (_, k) => <g key={k}><rect x={-90} y={-360 + k * 44} width={180} height={34} rx={6} fill="#334155" /><circle cx={70} cy={-343 + k * 44} r={5} fill={k % 2 ? '#22c55e' : '#38bdf8'} opacity={0.5 + 0.5 * Math.sin(t * 6 + k)} /></g>)}
            </g>
            <Letrero x={300} y={280} texto="≈ US$ 2 millones" fondo={GRIS} id={ID} tam={30} />
            {t >= m('boleto') && <Cruz x={300} y={520} r={70} op={e1(t, m('boleto') + 0.4)} />}
            <Registradora x={850} y={720} s={1.1} boleto={sm(t, m('boleto'), m('boleto') + 1.2)} op={e1(t, m('dos') + 0.8)} />
            {t >= m('funciono') && <Visto x={1060} y={330} r={40} op={e1(t, m('funciono'))} />}
            {!movil && <Txt f="a" x={600} y={800} textAnchor="middle" fontSize={22} fill={c.tenue}>Herb Kelleher, según el historiador Maury Klein</Txt>}
          </g>
        )}
      </Toma>

      {/* 2 · Amazon: de la escalera al botón */}
      <Toma t={t} a={m('minimos')} b={m('agil')} cy={480}>
        <Suelo y={740} isDark={isDark} x0={80} x1={1120} />
        {Array.from({ length: 7 }, (_, k) => {
          const h = (k + 1) * 66 * (1 - unClic);
          return <rect key={k} x={200 + k * 110} y={740 - h} width={110} height={h} rx={6} fill={[AZUL_M, VIOLETA, ROSA, '#0ea5e9', '#14b8a6', '#f59e0b', GRIS][k]} opacity={e1(t, m('amazon') + 0.1 * k)} />;
        })}
        {unClic < 0.9 && t >= m('meses') && <Persona id={ID} x={255 + 110 * Math.min(6, Math.floor((t - m('meses')) * 1.2))} y={740 - 66 * (Math.min(6, Math.floor((t - m('meses')) * 1.2)) + 1) * (1 - unClic)} s={0.7} cuerpo={NARANJA} />}
        {t >= m('meses') && t < m('bezos') && <Letrero x={420} y={260} texto="Meses optimizando cada paso" fondo={GRIS} id={ID} tam={28} />}
        {unClic > 0.1 && (
          <g opacity={unClic} transform={`translate(600 540) scale(${1 - 0.06 * Math.max(0, Math.sin(t * 6))})`}>
            <rect x={-200} y={-80} width={400} height={160} rx={80} fill={NARANJA} />
            <Txt x={0} y={20} textAnchor="middle" fontSize={56} fill="#fff">Comprar · 1 clic</Txt>
          </g>
        )}
        {t >= m('bezos') && <Letrero x={600} y={300} texto="Jeff Bezos: un solo paso" id={ID} tam={28} op={e1(t, m('bezos'))} />}
        {!movil && <Txt f="a" x={600} y={800} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('amazon'))}>Peri Hartman y el pago de Amazon</Txt>}
      </Toma>

      {/* 3 · el manifiesto y los pasos */}
      <Toma t={t} a={m('agil')} b={fin + 1} cy={470}>
        {ventana(t, m('agil') - 0.1, m('pasos')) > 0.01 && (
          <g opacity={ventana(t, m('agil') - 0.1, m('pasos'))}>
            <rect x={200} y={230} width={800} height={420} rx={20} fill="#fef3c7" />
            <rect x={180} y={210} width={840} height={40} rx={20} fill="#d97706" /><rect x={180} y={630} width={840} height={40} rx={20} fill="#d97706" />
            <Txt x={600} y={340} textAnchor="middle" fontSize={34} fill="#78350f">La simplicidad,</Txt>
            <Txt x={600} y={410} textAnchor="middle" fontSize={34} fill="#78350f">el arte de maximizar la cantidad</Txt>
            <Txt x={600} y={480} textAnchor="middle" fontSize={34} fill="#78350f" opacity={e1(t, m('simplicidad'))}>de trabajo no hecho, es esencial</Txt>
            <Txt f="a" x={600} y={580} textAnchor="middle" fontSize={24} fill="#92400e">Manifiesto Ágil, 2001</Txt>
          </g>
        )}
        {t >= m('pasos') && PASOS.map((p, k) => {
          const quita = sobra.includes(k) && t >= m('existiera') + 0.4 * sobra.indexOf(k);
          const orden = PASOS.filter((_, j) => !sobra.includes(j)).indexOf(p);
          const recto = sm(t, m('camino'), m('camino') + 1.2);
          const x = lerp(170 + (k % 4) * 290, orden >= 0 ? 240 + orden * 240 : 170 + (k % 4) * 290, recto);
          const y = lerp(300 + Math.floor(k / 4) * 220, 470, orden >= 0 ? recto : 0);
          return (
            <g key={p} opacity={e1(t, m('pasos') + 0.12 * k) * (quita ? 1 - sm(t, m('existiera') + 0.4 * sobra.indexOf(k) + 0.4, m('existiera') + 0.4 * sobra.indexOf(k) + 1) : 1)}>
              <rect x={x - 110} y={y - 50} width={220} height={100} rx={20} fill={quita ? GRIS : [AZUL_M, VIOLETA, ROSA, VERDE][k % 4]} />
              <Txt x={x} y={y + 12} textAnchor="middle" fontSize={30} fill="#fff">{p}</Txt>
              {quita && <Cruz x={x + 110} y={y - 50} r={20} />}
            </g>
          );
        })}
        {t >= m('camino') && <Flecha x1={140} y1={600} x2={1060} y2={600} u={sm(t, m('camino'), m('camino') + 1.2)} color={NARANJA} grosor={12} />}
        {t >= m('existiera') && t < m('camino') && <Letrero x={600} y={760} texto="¿Qué pasaría si este paso no existiera?" id={ID} tam={28} />}
      </Toma>
    </Lienzo>
  );
};
