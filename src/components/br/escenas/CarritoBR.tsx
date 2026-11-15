import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Carrito, Persona, Libro, Visto, Cruz, Sello, Navegador, Tarjeta, Conector, Pastilla, pop, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El carrito que se paga solo.
 * Toma 1: la página de pago en un navegador: el libro, la casilla del complemento que se marca y, al lado, tres
 * compradores de los que uno la acepta. Tras el pago, la misma ventana cambia: «tu pedido está completo» se tacha y
 * aparece «espera, tu pedido aún no está completo» con la oferta única.
 * Toma 2: las tres reglas como tres tarjetas: más de lo mismo (dos libros iguales, tachado), sin relación (un libro y
 * un neumático, tachado) y el siguiente paso lógico (libro → curso, con visto).
 * Toma 3: la cuenta del embudo como cascada: el anuncio hunde la cuenta a −23, cada compra la levanta y el total
 * termina en +14,71; a la izquierda el carrito se llena con cada producto.
 */

const ID = 'br05', P = 'br-carrito';

export const CarritoBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('casilla'), 'Una casilla en el pago'], [m('unica'), 'La oferta única'], [m('reglas'), 'Tres reglas'],
    [m('costaba'), 'La cuenta de Brunson'], [m('promedio'), 'El carrito crece'], [m('cuadra'), 'Cifras del autor'],
  ];
  const marca = sm(t, m('casilla') + 0.8, m('casilla') + 1.2);
  const pagina2 = sm(t, m('unica') - 0.2, m('unica') + 0.4);
  const tacha = sm(t, m('espera'), m('espera') + 0.6);

  // Toma 3: la cascada.
  const K = 8, CERO = 420;
  const PASOS: [string, number, string, string][] = [['costaba', -23, 'Anuncio', ROJO_M], ['perdida', 7.95, 'Libro', NARANJA], ['complemento', 7.7, '+$37', ROSA], ['oto1', 9.62, '+$97', VIOLETA], ['oto2', 12.44, '+$297', AZUL_M]];
  let acum = 0;
  const barras = PASOS.map(([n, v, txt, col], k) => { const u = sm(t, m(n) + (k === 1 ? -1.5 : 0), m(n) + (k === 1 ? -0.7 : 0.8)); const de = acum; acum += v * u; return { n, v, txt, col, u, de, a: acum, k }; });
  const lleno = barras.slice(1).reduce((s, b) => s + b.u, 0) / 4;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El carrito que se paga solo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La página de pago y la oferta única */}
      <Toma t={t} a={0} b={m('reglas')} cy={470}>
        <Navegador x={90} y={190} w={620} h={500} c={c} texto={pagina2 > 0.5 ? 'gracias' : 'pago'} op={E('casilla', 0.6, -0.4)}>
          <g opacity={1 - pagina2}>
            <rect x={40} y={80} width={540} height={90} rx={14} fill={c.panel2} />
            <Libro x={90} y={160} color={NARANJA} titulo="" autor="" s={0.28} c={c} />
            <Txt x={140} y={135} fontSize={28} fill={c.texto} peso={800}>Libro</Txt>
            <Txt x={560} y={135} textAnchor="end" fontSize={28} fill={c.texto} peso={800}>$7,95</Txt>
            <rect x={40} y={200} width={540} height={110} rx={14} fill={AMBAR} opacity={0.18 + 0.2 * marca} />
            <rect x={64} y={228} width={54} height={54} rx={10} fill={c.panel} stroke={AMBAR} strokeWidth={5} />
            {marca > 0 && <path d="M 76 256 L 88 270 L 110 238" stroke={VERDE} strokeWidth={8} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${marca} 1`} />}
            <Txt x={140} y={266} fontSize={28} fill={c.texto} peso={800}>{movil ? 'Complemento' : 'Sumar el complemento'}</Txt>
            <rect x={160} y={360} width={300} height={70} rx={35} fill={VERDE} />
            <Txt x={310} y={404} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>Pagar</Txt>
          </g>
          <g opacity={pagina2}>
            <Txt x={310} y={130} textAnchor="middle" fontSize={30} fill={c.tenue} peso={800}>Tu pedido está completo</Txt>
            <rect x={110} y={118} width={400 * tacha} height={6} rx={3} fill={ROJO_M} />
            <g opacity={tacha} transform={`translate(0 ${(1 - tacha) * 20})`}>
              <Txt x={310} y={200} textAnchor="middle" fontSize={32} fill={ROJO_M} peso={800}>¡Espera!</Txt>
              <Txt x={310} y={244} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>{movil ? 'Aún no está completo' : 'Tu pedido aún no está completo'}</Txt>
              <rect x={130} y={280} width={360} height={150} rx={18} fill={`url(#${ID}-marca)`} />
              <Txt x={310} y={345} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>Oferta única</Txt>
              <Txt x={310} y={390} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>Se muestra una vez</Txt>
            </g>
          </g>
        </Navegador>
        {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={830 + k * 110} y={560} s={0.6} cuerpo={k === 1 && t >= m('tres') ? NARANJA : GRIS} />)}
        <Conector x1={900} y1={470} x2={700} y2={430} u={E('tres')} t={t} color={NARANJA} curva={0.2} puntos={2} />
        <Pastilla x={940} y={640} texto="1 de cada 3" fondo={NARANJA} tam={28} op={E('tres')} />
      </Toma>

      {/* 2 · Las tres reglas */}
      <Toma t={t} a={m('reglas')} b={m('costaba')} cy={470}>
        {([['mismo', 'Más de lo mismo', false], ['relacion', 'Sin relación', false], ['siguiente', 'Siguiente paso', true]] as const).map(([n, txt, ok], k) => {
          const u = E(n, 0.6);
          return (
            <Tarjeta key={n} x={90 + k * 350} y={230} w={320} h={420} titulo={txt} c={c} id={ID} op={t >= m('reglas') ? 0.3 + 0.7 * u : 0} s={0.9 + 0.1 * u} acento={ok ? VERDE : ROJO_M}>
              {k === 0 && <><Libro x={110} y={290} color={NARANJA} titulo="" autor="" s={0.6} c={c} /><Libro x={210} y={290} color={NARANJA} titulo="" autor="" s={0.6} c={c} /></>}
              {k === 1 && <><Libro x={100} y={290} color={NARANJA} titulo="" autor="" s={0.6} c={c} /><g transform="translate(225 215)"><circle r={62} fill="#1f2937" /><circle r={30} fill="#94a3b8" /></g></>}
              {k === 2 && <><Libro x={80} y={290} color={NARANJA} titulo="" autor="" s={0.5} c={c} /><path d="M 130 220 H 180 M 166 204 L 184 220 L 166 236" stroke={VERDE} strokeWidth={8} fill="none" strokeLinecap="round" /><rect x={200} y={160} width={90} height={120} rx={12} fill={VIOLETA} /><path d="M 230 200 L 266 220 L 230 240 Z" fill="#fff" /></>}
              <g transform="translate(160 360)">{ok ? <Visto x={0} y={0} r={34} op={sm(t, m(n) + 0.5, m(n) + 1)} /> : <Cruz x={0} y={0} r={34} op={sm(t, m(n) + 0.5, m(n) + 1)} />}</g>
            </Tarjeta>
          );
        })}
      </Toma>

      {/* 3 · La cascada */}
      <Toma t={t} a={m('costaba')} b={fin + 1} cy={470}>
        <Carrito x={220} y={640} s={1.2} lleno={lleno} color={c.texto} />
        <Pastilla x={220} y={330} texto={`Carrito: $${(7.95 + 29.76 * Math.min(1, lleno)).toFixed(2).replace('.', ',')}`} fondo={VIOLETA} tam={26} op={E('perdida', 0.5, -1.5)} />
        <rect x={430} y={CERO - 2} width={720} height={4} rx={2} fill={c.apagado} />
        <Txt x={1150} y={CERO - 12} textAnchor="end" fontSize={24} fill={c.tenue}>0</Txt>
        {barras.map((b) => {
          const x = 480 + b.k * 120;
          const y1 = CERO - b.de * K, y2 = CERO - b.a * K;
          const top = Math.min(y1, y2), h = Math.abs(y2 - y1);
          return (
            <g key={b.n} opacity={b.u > 0 ? 1 : 0}>
              {b.k > 0 && <path d={`M ${x - 120 + 40} ${y1} H ${x - 40}`} stroke={c.apagado} strokeWidth={3} strokeDasharray="6 6" />}
              <rect x={x - 40} y={top} width={80} height={Math.max(2, h)} rx={8} fill={b.col} />
              <Txt x={x} y={b.v < 0 ? top + h + 34 : top - 14} textAnchor="middle" fontSize={24} fill={b.col} peso={800} opacity={b.u}>{b.v < 0 ? '−23' : `+${b.v.toFixed(2).replace('.', ',')}`}</Txt>
              <Txt x={x} y={705} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>{movil ? ['Aviso', 'Libro', '37', '97', '297'][b.k] : b.txt}</Txt>
            </g>
          );
        })}
        {t >= m('ganancia') && (
          <g opacity={E('ganancia')}>
            <rect x={1040} y={CERO - 14.71 * K} width={80} height={14.71 * K} rx={8} fill={VERDE} />
            <Txt x={1080} y={CERO - 14.71 * K - 14} textAnchor="middle" fontSize={26} fill={VERDE} peso={800}>+14,71</Txt>
            <Txt x={1080} y={705} textAnchor="middle" fontSize={24} fill={VERDE} peso={800}>Total</Txt>
          </g>
        )}
        {t >= m('cuadra') && <Sello x={760} y={770} texto={movil ? 'Sin auditar' : 'Cifras del autor, sin auditar'} u={sm(t, m('cuadra'), m('cuadra') + 0.6)} color={GRIS} tam={24} rot={-3} />}
      </Toma>
    </Lienzo>
  );
};
