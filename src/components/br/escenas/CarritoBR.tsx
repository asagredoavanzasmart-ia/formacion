import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Carrito, Monitor, Visto, Cruz, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El carrito que se paga solo.
 * Toma 1: el formulario de compra con la casilla que se marca sola (uno de cada tres); luego el mensaje que cambia de
 * «tu pedido está completo» (tachado) a «espera, tu pedido aún no está completo», y las reglas de la segunda oferta.
 * Toma 2: la cuenta de Brunson como cascada: arranca en −15,05, cada complemento sube un tramo (+7,70, +9,62, +12,44) y
 * termina en +14,71; el carrito se va llenando con un paquete por compra.
 */

const ID = 'br05', P = 'br-carrito';

export const CarritoBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('casilla'), 'El complemento en la caja'], [m('unica'), 'La oferta única'], [m('reglas'), 'Tres reglas'],
    [m('costaba'), 'La cuenta de Brunson'], [m('promedio'), 'El carrito promedio'], [m('cuadra'), 'Cifras del autor'],
  ];
  const marca = sm(t, m('casilla') + 0.6, m('casilla') + 1.1);
  // Cascada (en dólares): de −15,05 a +14,71.
  const pasos: [string, number, number, string, string][] = [
    ['perdida', -15.05, 0, 'Libro', ROJO_M], ['complemento', 7.7, -15.05, '+ complemento', NARANJA], ['oto1', 9.62, -7.35, '+ oferta 97', ROSA], ['oto2', 12.44, 2.27, '+ oferta 297', VIOLETA],
  ];
  const Y0 = 520, ESC = 9; // píxeles por dólar
  const lleno = (t >= m('complemento') ? 0.25 : 0) + (t >= m('oto1') ? 0.25 : 0) + (t >= m('oto2') ? 0.25 : 0) + (t >= m('costaba') ? 0.25 : 0);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El carrito que se paga solo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El formulario, la oferta única y las reglas */}
      <Toma t={t} a={0} b={m('costaba')} cy={470}>
        <g opacity={ventana(t, 0.2, m('reglas'))}>
          <Monitor x={330} y={760} w={420} h={420}>
            <rect x={30} y={30} width={360} height={40} rx={8} fill="#334155" />
            <rect x={30} y={90} width={360} height={40} rx={8} fill="#334155" />
            <rect x={30} y={160} width={360} height={90} rx={12} fill={marca > 0.5 ? '#14532d' : '#1e293b'} />
            <rect x={50} y={185} width={40} height={40} rx={8} fill="#fff" />
            {marca > 0.05 && <path d="M 58 205 l 10 10 l 18 -22" stroke={VERDE} strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray={50} strokeDashoffset={50 * (1 - marca)} />}
            <Txt x={110} y={215} fontSize={26} fill="#fff" peso={700}>Agregar +$37</Txt>
            <rect x={30} y={290} width={360} height={60} rx={14} fill={NARANJA} />
            <Txt x={210} y={330} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>Comprar</Txt>
          </Monitor>
          {t >= m('tres') && <Letrero x={330} y={250} texto="1 de cada 3 lo marca" fondo={VERDE} id={ID} tam={28} op={e1(t, m('tres'))} />}
        </g>
        {t >= m('unica') && (
          <g opacity={ventana(t, m('unica'), m('reglas'))}>
            <rect x={640} y={250} width={480} height={360} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Txt x={880} y={340} textAnchor="middle" fontSize={30} fill={c.tenue}>«Tu pedido está completo»</Txt>
            {t >= m('espera') && <rect x={680} y={326} width={400} height={6} rx={3} fill={ROJO_M} opacity={e1(t, m('espera'))} />}
            {t >= m('espera') && <Txt x={880} y={450} textAnchor="middle" fontSize={34} fill={VERDE} peso={800} opacity={e1(t, m('espera') + 0.3)}>«Espera, tu pedido</Txt>}
            {t >= m('espera') && <Txt x={880} y={500} textAnchor="middle" fontSize={34} fill={VERDE} peso={800} opacity={e1(t, m('espera') + 0.3)}>aún no está completo»</Txt>}
            <Letrero x={880} y={660} texto="Oferta única" fondo={ROSA} id={ID} tam={28} />
          </g>
        )}
        {t >= m('reglas') && (
          <g opacity={e1(t, m('reglas'))}>
            {([['mismo', 'Más de lo mismo', false], ['relacion', 'Algo sin relación', false]] as const).map(([n, txt], k) => (
              <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.2}>
                <rect x={130 + k * 480} y={210} width={440} height={110} rx={22} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                <Cruz x={190 + k * 480} y={265} r={30} />
                <Txt x={240 + k * 480} y={277} fontSize={32} fill={c.texto} peso={800}>{txt}</Txt>
              </g>
            ))}
            {t >= m('siguiente') && (['Siguiente paso', 'Más rápido', 'Ayuda personal'] as const).map((txt, k) => (
              <g key={txt} opacity={e1(t, m('siguiente') + k * 0.35)}>
                <rect x={110 + k * 340} y={430} width={300} height={300} rx={28} fill={[AZUL_M, TEAL, VIOLETA][k]} style={sombra(c.sombra, 4, 10)} />
                <Visto x={260 + k * 340} y={540} r={44} color="#fff" />
                <Txt x={260 + k * 340} y={660} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>{txt}</Txt>
              </g>
            ))}
          </g>
        )}
      </Toma>

      {/* 2 · La cuenta en cascada */}
      <Toma t={t} a={m('costaba')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('costaba'))}>
          <Carrito x={220} y={700} s={1.05} lleno={lleno} />
          <Letrero x={220} y={300} texto="Anuncio: −$23" fondo={ROJO_M} id={ID} tam={28} />
          <rect x={420} y={Y0 - 1} width={720} height={4} rx={2} fill={c.texto} opacity={0.5} />
          <Txt x={1140} y={Y0 - 12} textAnchor="end" fontSize={24} fill={c.tenue}>0</Txt>
          {pasos.map(([n, v, base, txt, col], k) => {
            const u = sm(t, m(n), m(n) + 0.8);
            if (t < m(n) - 0.1) return null;
            const y1 = Y0 - base * ESC, y2 = Y0 - (base + v * u) * ESC;
            return (
              <g key={n} opacity={e1(t, m(n))}>
                <rect x={450 + k * 170} y={Math.min(y1, y2)} width={130} height={Math.abs(y2 - y1)} rx={10} fill={col} />
                <Txt x={515 + k * 170} y={v < 0 ? Math.max(y1, y2) + 40 : Math.min(y1, y2) - 14} textAnchor="middle" fontSize={30} fill={col} peso={800}>{v > 0 ? '+' : ''}{v.toFixed(2).replace('.', ',')}</Txt>
                {!movil && <Txt f="a" x={515 + k * 170} y={790} textAnchor="middle" fontSize={20} fill={c.tenue}>{txt}</Txt>}
              </g>
            );
          })}
        </g>
        {t >= m('promedio') && <Letrero x={780} y={230} texto="Carrito: $7,95 → $37,71" fondo={VIOLETA} id={ID} tam={30} op={e1(t, m('promedio'))} />}
        {t >= m('ganancia') && <Sello x={1010} y={300} texto="+14,71" u={sm(t, m('ganancia'), m('ganancia') + 0.6)} color={VERDE} tam={44} rot={-6} />}
        {t >= m('cuadra') && <Letrero x={780} y={810} texto="Cifras del autor, sin auditar" fondo={GRIS} id={ID} tam={24} op={e1(t, m('cuadra'))} />}
      </Toma>
    </Lienzo>
  );
};
