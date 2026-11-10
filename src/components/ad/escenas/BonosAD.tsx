import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Regalo, Persona, Burbuja, Visto, Edificio, Billete, Flujo, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Apilamiento de bonos.
 * Toma 1: una balanza de valor: en un plato la oferta principal con su precio; en el otro, regalos que se apilan uno
 * a uno hasta pesar más que el precio.
 * Toma 2: la conversación: el cliente dice «sí» (los bonos llegan después del pago) o «no, porque…» (entra el bono
 * exacto que tapa esa objeción, como una pieza que encaja).
 * Toma 3: la clínica de dolor en el centro y cuatro socios alrededor (masajista, quiropráctico, plantillas, gimnasio)
 * que aportan sesiones gratis; las comisiones vuelven: 350 extra por venta.
 */

const ID = 'ad13', P = 'ad-bonos';

export const BonosAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('bloque'), 'No un bloque único'], [m('supere'), 'Los bonos pesan más'], [m('primero'), 'Primero la oferta'], [m('no'), 'El bono exacto'],
    [m('complementarios'), 'Socios complementarios'], [m('comision'), 'Comisiones de vuelta'],
  ];
  const nBonos = Math.round(5 * sm(t, m('individuales'), m('supere') + 0.6));
  const ang = lerp(-8, 10, sm(t, m('individuales'), m('supere') + 0.8));
  const SOC: [string, string, number, number, string][] = [['masajista', 'Masajista', 250, 300, ROSA], ['quiro', 'Quiropráctico', 950, 300, VIOLETA], ['plantillas', 'Plantillas', 250, 640, AMBAR], ['gimnasio', 'Gimnasio', 950, 640, TEAL]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Apilamiento de bonos">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Bonos que pesan más que el precio */}
      <Toma t={t} a={0} b={m('primero')} cy={470}>
        <g opacity={e1(t, m('bloque') - 0.3)}>
          <path d="M 570 760 H 630 L 615 470 H 585 Z" fill={isDark ? '#64748b' : '#94a3b8'} />
          <g transform={`rotate(${ang} 600 460)`}>
            <rect x={220} y={450} width={760} height={18} rx={9} fill={c.texto} />
            <g transform={`translate(300 468) rotate(${-ang})`}>
              <path d="M -120 140 H 120 Q 110 176 0 180 Q -110 176 -120 140 Z" fill={c.apagado} /><path d="M -100 140 L 0 0 L 100 140" stroke={c.tenue} strokeWidth={4} fill="none" />
              <rect x={-70} y={40} width={140} height={100} rx={16} fill={NARANJA} /><Txt x={0} y={102} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>Precio</Txt>
            </g>
            <g transform={`translate(900 468) rotate(${-ang})`}>
              <path d="M -120 140 H 120 Q 110 176 0 180 Q -110 176 -120 140 Z" fill={c.apagado} /><path d="M -100 140 L 0 0 L 100 140" stroke={c.tenue} strokeWidth={4} fill="none" />
              {Array.from({ length: nBonos }, (_, k) => <Regalo key={k} x={-60 + (k % 3) * 60} y={140 - Math.floor(k / 3) * 70} s={0.55} color={[ROSA, VIOLETA, AZUL_M, TEAL, AMBAR][k]} />)}
            </g>
          </g>
          <circle cx={600} cy={460} r={18} fill={NARANJA} />
          {t >= m('bloque') && <Letrero x={600} y={200} texto={t >= m('individuales') ? 'Bonos por separado' : 'Un bloque único'} fondo={t >= m('individuales') ? ROSA : GRIS} id={ID} tam={30} />}
          {t >= m('supere') && <Letrero x={900} y={300} texto="Valor > precio" fondo={VERDE} id={ID} tam={28} op={e1(t, m('supere'))} />}
        </g>
      </Toma>

      {/* 2 · Sí o no, y el bono exacto */}
      <Toma t={t} a={m('primero')} b={m('complementarios')} cy={470}>
        <g opacity={e1(t, m('primero'))}>
          <Persona id={ID} x={240} y={680} s={0.75} cuerpo={NARANJA} corbata />
          <Persona id={ID} x={960} y={680} s={0.75} cuerpo={AZUL_M} />
          <rect x={430} y={420} width={340} height={150} rx={24} fill={NARANJA} style={sombra(0.22, 4, 10)} />
          <Txt x={600} y={510} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>Oferta principal</Txt>
        </g>
        {t >= m('si') && (
          <g opacity={ventana(t, m('si'), m('no'))}>
            <Burbuja x={960} y={340} w={200} texto="Sí" u={1} c={c} lado="der" id={ID} tam={40} />
            {[0, 1, 2].map((k) => <Regalo key={k} x={lerp(600, 830 + k * 60, sm(t, m('si') + 0.6 + k * 0.2, m('si') + 1.2 + k * 0.2))} y={760} s={0.5} color={[ROSA, VIOLETA, TEAL][k]} />)}
            <Letrero x={600} y={300} texto="Bonos después del pago" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
        {t >= m('no') && (
          <g opacity={e1(t, m('no'))}>
            <Burbuja x={960} y={340} w={360} texto="No, porque…" u={1} c={c} lado="der" id={ID} tam={36} />
            <g transform="translate(600 420)">
              <path d="M -170 0 H 170 V -20 H 40 Q 40 -60 0 -60 Q -40 -60 -40 -20 H -170 Z" fill={ROJO_M} opacity={0.25} />
              <g transform={`translate(0 ${lerp(-260, -40, sm(t, m('exacto'), m('exacto') + 0.8))})`}><Regalo x={0} y={20} s={0.75} color={VERDE} /></g>
            </g>
            {t >= m('exacto') && <Letrero x={600} y={300} texto="El bono que tapa esa objeción" fondo={VERDE} id={ID} tam={26} op={e1(t, m('exacto') + 0.6)} />}
          </g>
        )}
      </Toma>

      {/* 3 · La clínica y sus socios */}
      <Toma t={t} a={m('complementarios')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('complementarios'))}>
          <Edificio x={600} y={600} w={200} h={240} color={NARANJA} />
          {t >= m('clinica') && <Letrero x={600} y={660} texto="Clínica · 400" id={ID} tam={28} op={e1(t, m('clinica'))} />}
        </g>
        {SOC.map(([n, txt, x, y, col], k) => (
          <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0}>
            <Edificio x={x} y={y} w={120} h={130} color={col} />
            <Letrero x={x} y={y + 50} texto={txt} fondo={col} id={ID} tam={24} />
            <Flujo x1={x} y1={y - 80} x2={600} y2={420} t={t + k} n={3} color={ROSA} r={7} op={0.8} />
          </g>
        ))}
        {t >= m('comision') && [0, 1, 2, 3].map((k) => { const [, , x, y] = SOC[k]; const ph = ((t - m('comision')) * 0.6 + k / 4) % 1; return <Billete key={k} x={lerp(x, 600, ph)} y={lerp(y - 60, 480, ph)} s={0.55} rot={ph * 60} />; })}
        {t >= m('extra') && <Letrero x={600} y={180} texto="+350 por venta" fondo={VERDE} id={ID} tam={34} op={e1(t, m('extra'))} />}
      </Toma>
    </Lienzo>
  );
};
