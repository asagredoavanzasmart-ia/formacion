import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Regalo, EtiquetaPrecio, Sello, Persona, Burbuja, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La pila (Armand Morin).
 * Toma 1: la presentación típica pasa por una cinta y el prospecto solo retiene lo último: un bono pequeño junto a un
 * precio grande; su cara se apaga.
 * Toma 2: la pila: los bloques de la oferta se apilan con su valor; cada vez que entra uno, toda la pila se ilumina de
 * nuevo y el total sube hasta $970, diez veces el precio de $97.
 * Toma 3: el anclaje (Tversky y Kahneman, 1974): un ancla cae sobre $970 en una regla de valores y el precio queda
 * pequeño a su lado; luego las declaraciones condicionales con caras que asienten y el cierre de 5–10 % a cerca de 40 %.
 */

const ID = 'br11', P = 'br-pila';

export const PilaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('morin'), 'Armand Morin'], [m('ultimo'), 'Lo último que se escucha'], [m('cada'), 'La pila'],
    [m('diez'), 'Diez veces el precio'], [m('tversky'), 'El anclaje'], [m('condicionales'), 'Declaraciones condicionales'],
  ];
  const cinta = (t * 0.25) % 1;
  const B: [string, string, number, string][] = [['Curso principal', 'Curso', 497, NARANJA], ['Plantillas', 'Plantillas', 197, ROSA], ['Casos reales', 'Casos', 147, VIOLETA], ['Sesión en vivo', 'Sesión', 129, AZUL_M]];
  const llegada = (k: number) => sm(t, m('cada') + k * 1.6, m('cada') + k * 1.6 + 0.8);
  const flash = (k: number) => { const d = t - (m('cada') + k * 1.6 + 0.8); return d > 0 && d < 0.6 ? Math.sin((Math.PI * d) / 0.6) : 0; };
  const total = B.reduce((s, [, , v], k) => s + v * llegada(k), 0);
  const ancla = sm(t, m('ancla') - 0.3, m('ancla') + 0.9);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La pila">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Lo último que se escucha */}
      <Toma t={t} a={0} b={m('cada')} cy={470}>
        <Tarjeta x={560} y={210} w={560} h={300} titulo={movil ? 'Presentación' : 'Una presentación típica'} c={c} id={ID} op={E('morin', 0.6, -0.3)} acento={GRIS}>
          <rect x={30} y={150} width={500} height={40} rx={20} fill={c.apagado} />
          {(['Curso', 'Plantillas', 'Casos', 'Bono'] as const).map((w, k) => {
            const p = (cinta + k * 0.25) % 1;
            return <g key={w} opacity={Math.sin(Math.PI * p)}><rect x={lerp(30, 430, p)} y={100} width={100} height={46} rx={10} fill={k === 3 ? AMBAR : [NARANJA, ROSA, VIOLETA][k]} /><Txt x={lerp(80, 480, p)} y={131} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>{w}</Txt></g>;
          })}
          <Txt x={280} y={250} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>{movil ? 'Termina en un bono' : 'Termina con un bono pequeño'}</Txt>
        </Tarjeta>
        <Conector x1={560} y1={360} x2={420} y2={400} u={E('ultimo')} t={t} color={AMBAR} curva={0.2} puntos={2} />
        <g opacity={E('ultimo')}>
          <Persona id={ID} x={250} y={720} s={0.85} cuerpo={TEAL} />
          <circle cx={290} cy={400} r={120} fill={c.panel} style={sombra(0.14, 6, 12)} />
          <circle cx={262} cy={538} r={14} fill={c.panel} /><circle cx={256} cy={566} r={8} fill={c.panel} />
          <Regalo x={240} y={420} s={0.45} color={AMBAR} />
          <EtiquetaPrecio x={330} y={390} texto="$97" color={ROJO_M} s={1.1} />
          <Cara id={ID} x={250} y={606} r={27} e={-0.8} />
        </g>
        <Pastilla x={260} y={790} texto={movil ? 'Bono vs. precio' : 'Un bono pequeño frente al precio'} fondo={AMBAR} tam={24} op={E('bono')} />
      </Toma>

      {/* 2 · La pila */}
      <Toma t={t} a={m('cada')} b={m('tversky')} cy={470}>
        <rect x={110} y={730} width={480} height={12} rx={6} fill={c.apagado} />
        {B.map(([txt, corto, v, col], k) => {
          const u = llegada(k);
          const brillo = B.reduce((s, _, j) => s + (j >= k ? flash(j) : 0), 0);
          const y = 730 - 90 * (k + 1);
          return (
            <g key={txt} opacity={u > 0 ? 1 : 0} transform={`translate(0 ${(1 - u) * -260})`}>
              <rect x={130} y={y} width={440} height={80} rx={14} fill={col} style={brillo > 0 ? { filter: `drop-shadow(0 0 ${18 * Math.min(1, brillo)}px ${col})` } : sombra(0.12, 4, 8)} />
              <Txt x={160} y={y + 50} fontSize={28} fill="#fff" peso={800}>{movil ? corto : txt}</Txt>
              <Txt x={545} y={y + 50} textAnchor="end" fontSize={28} fill="#fff" peso={800}>${v}</Txt>
            </g>
          );
        })}
        <Tarjeta x={680} y={220} w={420} h={430} titulo="Valor total" c={c} id={ID} op={E('cada', 0.6, 0.4)} acento={VERDE}>
          <Cifra x={210} y={150} valor={total} u={1} pre="$" tam={72} color={VERDE} />
          <rect x={60} y={190} width={300} height={4} rx={2} fill={c.apagado} />
          <Txt x={210} y={250} textAnchor="middle" fontSize={26} fill={c.tenue} peso={800}>Precio</Txt>
          <EtiquetaPrecio x={210} y={300} texto="$97" color={NARANJA} s={1} />
          <Pastilla x={210} y={385} texto="×10 el precio" fondo={VIOLETA} tam={28} op={E('diez')} />
        </Tarjeta>
        <Pastilla x={890} y={720} texto={movil ? 'Valor real' : 'Valor real, no inventado'} fondo={AMBAR} tam={24} op={E('inventada')} />
        <Pastilla x={350} y={790} texto={movil ? 'Lo último: todo' : 'Lo último que queda: la oferta entera'} fondo={VERDE} tam={24} op={E('entera')} />
      </Toma>

      {/* 3 · El ancla y las condicionales */}
      <Toma t={t} a={m('tversky')} b={fin + 1} cy={470}>
        <g opacity={E('tversky')}>
          <rect x={120} y={420} width={960} height={10} rx={5} fill={c.apagado} />
          {[0, 250, 500, 750, 1000].map((v) => <g key={v}><rect x={120 + v * 0.96 - 2} y={410} width={4} height={30} fill={c.tenue} /><Txt x={120 + v * 0.96} y={470} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>{movil && v % 500 ? '' : `$${v}`}</Txt></g>)}
          <g transform={`translate(${120 + 970 * 0.96} ${lerp(180, 360, ancla)})`}>
            <path d={`M 0 ${-180 - lerp(180, 360, ancla) + 180} V -40`} stroke={c.texto} strokeWidth={4} />
            <circle cy={-40} r={14} fill="none" stroke={c.texto} strokeWidth={8} />
            <path d="M 0 -26 V 40 M -36 20 Q 0 70 36 20 M -46 14 L -36 20 L -30 8 M 46 14 L 36 20 L 30 8" stroke={c.texto} strokeWidth={9} fill="none" strokeLinecap="round" />
          </g>
          <Pastilla x={1050} y={520} texto="$970" fondo={VERDE} tam={28} op={ancla} />
          <EtiquetaPrecio x={120 + 97 * 0.96} y={340} texto="$97" color={NARANJA} s={0.9} op={sm(t, m('ancla') + 0.9, m('ancla') + 1.4)} />
          <Pastilla x={400} y={250} texto={movil ? 'Tversky y Kahneman' : 'Tversky y Kahneman, 1974'} fondo={AZUL_M} tam={24} />
        </g>
        {t >= m('condicionales') && (
          <g opacity={E('condicionales')}>
            <Burbuja x={150} y={620} w={movil ? 400 : 520} texto={movil ? "«¿Valdría $97?»" : "«Aunque solo hiciera esto, ¿valdría $97?»"} u={sm(t, m('condicionales'), m('condicionales') + 1.4)} c={c} id={ID} tam={24} />
            {[0, 1, 2].map((k) => <Cara key={k} id={ID} x={200 + k * 110} y={700 + 6 * Math.sin(t * 5 + k)} r={36} e={1} />)}
          </g>
        )}
        {t >= m('cuarenta') && (
          <g opacity={E('cuarenta')}>
            <rect x={780} y={780} width={300} height={4} rx={2} fill={c.apagado} />
            <rect x={810} y={780 - 40} width={100} height={40} rx={8} fill={GRIS} />
            <rect x={950} y={780 - 180 * sm(t, m('cuarenta') + 0.3, m('cuarenta') + 1.2)} width={100} height={180 * sm(t, m('cuarenta') + 0.3, m('cuarenta') + 1.2)} rx={8} fill={VERDE} />
            <Txt x={860} y={725} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>5–10 %</Txt>
            <Txt x={1000} y={585} textAnchor="middle" fontSize={26} fill={VERDE} peso={800}>≈ 40 %</Txt>
          </g>
        )}
        {t >= m('honesta') && <Sello x={500} y={795} texto={movil ? 'Ancla honesta' : 'Solo si el valor es real'} u={sm(t, m('honesta'), m('honesta') + 0.6)} color={VERDE} tam={24} rot={-4} />}
      </Toma>
    </Lienzo>
  );
};
