import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Regalo, EtiquetaPrecio, Sello, Visto, Persona, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La pila.
 * Toma 1: la presentación típica: oferta grande, luego un bono pequeño justo antes del precio; el oyente solo recuerda
 * el bono (su burbuja de memoria muestra la caja chica).
 * Toma 2: la pila: cada elemento entra con su valor y la lista completa se vuelve a mostrar sumando; al final aparece el
 * precio, una décima parte del total. La balanza del ancla: el primer número pesa sobre el siguiente.
 * Toma 3: la condición: el ancla solo es honesta si el valor es real (sello); el «cerca del cuarenta por ciento» como cifra
 * del autor.
 */

const ID = 'br11', P = 'br-pila';

export const PilaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('morin'), 'Armand Morin'], [m('ultimo'), 'Se recuerda lo último'], [m('cada'), 'La pila'], [m('diez'), 'Diez veces el precio'],
    [m('tversky'), 'El anclaje'], [m('honesta'), 'Solo si el valor es real'],
  ];
  const ELEM: [string, number, string][] = [['Curso principal', 497, NARANJA], ['Plantillas', 197, ROSA], ['Casos reales', 147, VIOLETA], ['Sesión en vivo', 129, AZUL_M]];
  const nVis = t >= m('cada') ? Math.min(4, 1 + Math.floor((t - m('cada')) / 1.2)) : 0;
  const total = ELEM.slice(0, nVis).reduce((s, e) => s + e[1], 0);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La pila">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Lo último que se escucha */}
      <Toma t={t} a={0} b={m('cada')} cy={470}>
        <g opacity={e1(t, 0.3)}>
          <Regalo x={250} y={640} s={1.6} color={NARANJA} />
          <Txt x={250} y={700} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>Oferta</Txt>
          {t >= m('bono') - 0.2 && <Regalo x={520} y={640} s={0.6} color={GRIS} />}
          {t >= m('bono') - 0.2 && <Txt x={520} y={700} textAnchor="middle" fontSize={26} fill={c.tenue}>Bono</Txt>}
          {t >= m('bono') && <EtiquetaPrecio x={600} y={520} texto="$97" color={ROJO_M} t={t} bal={1} op={e1(t, m('bono') + 0.4)} />}
        </g>
        {t >= m('ultimo') && (
          <g opacity={e1(t, m('ultimo'))}>
            <Persona id={ID} x={960} y={720} s={0.75} cuerpo={AZUL_M} />
            <circle cx={900} cy={370} r={16} fill={c.panel2} /><circle cx={870} cy={320} r={24} fill={c.panel2} />
            <ellipse cx={940} cy={240} rx={150} ry={80} fill={c.panel2} />
            <Regalo x={910} y={270} s={0.42} color={GRIS} />
            <Txt x={1010} y={258} textAnchor="middle" fontSize={34} fill={ROJO_M} peso={800}>$97</Txt>
            <Letrero x={940} y={800} texto="Solo recuerda lo último" fondo={GRIS} id={ID} tam={26} />
          </g>
        )}
      </Toma>

      {/* 2 · La pila */}
      <Toma t={t} a={m('cada')} b={m('honesta')} cy={470}>
        <g opacity={e1(t, m('cada'))}>
          <rect x={110} y={180} width={600} height={560} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          {ELEM.slice(0, nVis).map(([txt, v, col], k) => (
            <g key={txt} opacity={e1(t, m('cada') + k * 1.2)}>
              <rect x={150} y={220 + k * 92} width={520} height={74} rx={16} fill={col} opacity={0.18} />
              <rect x={150} y={220 + k * 92} width={14} height={74} rx={7} fill={col} />
              <Txt x={190} y={268 + k * 92} fontSize={30} fill={c.texto} peso={800}>{txt}</Txt>
              <Txt x={650} y={268 + k * 92} textAnchor="end" fontSize={30} fill={c.texto} peso={800}>${v}</Txt>
            </g>
          ))}
          <rect x={150} y={600} width={520} height={4} rx={2} fill={c.apagado} />
          <Txt x={190} y={660} fontSize={30} fill={c.tenue} peso={800}>Valor total</Txt>
          <Txt x={650} y={660} textAnchor="end" fontSize={40} fill={VERDE} peso={800}>${total}</Txt>
          {t >= m('entera') && <Letrero x={410} y={790} texto="Lo último: la oferta entera" fondo={VERDE} id={ID} tam={26} op={e1(t, m('entera'))} />}
        </g>
        {t >= m('diez') && (
          <g opacity={e1(t, m('diez'))}>
            <EtiquetaPrecio x={790} y={300} texto="$97" color={NARANJA} t={t} bal={1} tam={40} />
            <Cifra x={960} y={460} valor={970} u={sm(t, m('mil'), m('mil') + 1)} pre="≈ $" tam={56} color={VERDE} />
            <Txt x={960} y={510} textAnchor="middle" fontSize={26} fill={c.tenue}>diez veces el precio</Txt>
          </g>
        )}
        {t >= m('inventada') && <Letrero x={960} y={590} texto={movil ? 'Valor real' : 'Valor real, no inventado'} fondo={AMBAR} id={ID} tam={26} op={e1(t, m('inventada'))} />}
        {t >= m('tversky') && (
          <g opacity={e1(t, m('tversky'))}>
            <Letrero x={960} y={680} texto="Anclaje · 1974" fondo={VIOLETA} id={ID} tam={26} />
            {t >= m('cuarenta') && <Letrero x={960} y={770} texto="De 5–10 % a ~40 % (autor)" fondo={GRIS} id={ID} tam={24} op={e1(t, m('cuarenta'))} />}
          </g>
        )}
      </Toma>

      {/* 3 · La condición */}
      <Toma t={t} a={m('honesta')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('honesta'))}>
          <rect x={300} y={240} width={600} height={420} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Visto x={600} y={400} r={80} />
          <Txt x={600} y={560} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>Cada valor, comprobable</Txt>
          <Sello x={600} y={740} texto="Ancla honesta" u={sm(t, m('honesta') + 0.3, m('honesta') + 0.9)} color={VERDE} tam={36} />
        </g>
      </Toma>
    </Lienzo>
  );
};
