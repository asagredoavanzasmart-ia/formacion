import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Frasco, Engranaje, Edificio, Sello, Gente, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Dónde sí funciona.
 * Toma 1: una lupa recorre el embudo; lo defendible es la caja: las primeras compras llenan el frasco que paga los
 * anuncios, sin capital externo.
 * Toma 2: Iyengar y Lepper: dos mesas de degustación en un supermercado, una con 24 frascos de mermelada y otra con 6;
 * debajo, la proporción que compró (3 % frente a cerca del 30 %).
 * Toma 3: una herramienta, no el edificio: una llave de tuercas al lado de una empresa completa; y un riel con dos
 * extremos: compra rápida, individual y barata (verde) frente a cara, de comité y de años (ámbar).
 */

const ID = 'br23', P = 'br-limites';

const Mermelada: React.FC<{ x: number; y: number; color: string; s?: number }> = ({ x, y, color, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-16} y={-44} width={32} height={10} rx={3} fill="#94a3b8" />
    <rect x={-20} y={-36} width={40} height={40} rx={8} fill={color} />
    <rect x={-14} y={-24} width={28} height={12} rx={3} fill="#fff" opacity={0.7} />
  </g>
);

export const LimitesBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('examinar'), 'Examinar el método'], [m('economica'), 'Lo defendible: la caja'], [m('iyengar'), 'Iyengar y Lepper (2000)'],
    [m('herramienta'), 'Una herramienta'], [m('rapida'), 'Dónde rinde'],
  ];
  const lupa = sm(t, m('examinar'), m('economica'));
  const COL = [NARANJA, ROSA, VIOLETA, AMBAR, ROJO_M, TEAL];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Dónde sí funciona">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La lupa y la caja */}
      <Toma t={t} a={0} b={m('lineal')} cy={470}>
        <g opacity={e1(t, m('examinar') - 0.3)}>
          <path d="M 180 260 H 520 L 400 460 V 600 H 300 V 460 Z" fill="url(#br23-marca)" opacity={0.9} />
          <g transform={`translate(${lerp(240, 430, lupa)} ${lerp(300, 480, lupa)})`}>
            <circle r={70} fill="#fff" opacity={0.25} />
            <circle r={70} fill="none" stroke={c.texto} strokeWidth={12} />
            <rect x={48} y={48} width={22} height={90} rx={10} fill={c.texto} transform="rotate(-45 48 48)" />
          </g>
        </g>
        {t >= m('economica') && (
          <g opacity={e1(t, m('economica'))}>
            <Frasco x={830} y={680} w={200} h={320} v={0.15 + 0.7 * sm(t, m('economica'), m('capital'))} t={t} c={c} color={VERDE} />
            {[0, 1, 2].map((k) => { const ph = ((t - m('economica')) * 0.5 + k / 3) % 1; return <g key={k} opacity={Math.sin(Math.PI * ph)}><circle cx={lerp(560, 830, ph)} cy={lerp(560, 420, ph) - 80 * Math.sin(Math.PI * ph)} r={18} fill={AMBAR} /></g>; })}
            <Letrero x={830} y={250} texto="Las primeras compras pagan" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
        {t >= m('capital') && <Sello x={830} y={760} texto={movil ? 'Sin capital' : 'Sin capital externo'} u={sm(t, m('capital'), m('capital') + 0.6)} color={VERDE} tam={28} />}
      </Toma>

      {/* 2 · Las mermeladas */}
      <Toma t={t} a={m('lineal')} b={m('herramienta')} cy={470}>
        <g opacity={e1(t, m('lineal'))}>
          {[0, 1].map((k) => {
            const x0 = k === 0 ? 110 : 690, n = k === 0 ? 24 : 6;
            const on = t >= m(k === 0 ? 'veinticuatro' : 'seis') - 0.1;
            return (
              <g key={k} opacity={on ? e1(t, m(k === 0 ? 'veinticuatro' : 'seis')) : 0.12}>
                <rect x={x0} y={460} width={400} height={26} rx={8} fill="#a16207" />
                <rect x={x0 + 30} y={486} width={20} height={130} fill="#a16207" /><rect x={x0 + 350} y={486} width={20} height={130} fill="#a16207" />
                {Array.from({ length: n }, (_, j) => {
                  const cols = k === 0 ? 8 : 3;
                  return <Mermelada key={j} x={x0 + (k === 0 ? 40 + (j % cols) * 46 : 110 + (j % cols) * 90)} y={456 - Math.floor(j / cols) * 50} color={COL[j % 6]} s={k === 0 ? 0.9 : 1.1} />;
                })}
                <Txt x={x0 + 200} y={680} textAnchor="middle" fontSize={30} fill={c.texto} peso={800}>{n} variedades</Txt>
              </g>
            );
          })}
          {t >= m('tres') && (
            <g opacity={e1(t, m('tres'))}>
              <Cifra x={310} y={770} valor={3} u={sm(t, m('tres'), m('tres') + 0.8)} suf=" % compró" tam={44} color={ROJO_M} />
            </g>
          )}
          {t >= m('seis') && (
            <g opacity={e1(t, m('seis') + 0.4)}>
              <Cifra x={890} y={770} valor={30} u={sm(t, m('seis') + 0.4, m('seis') + 1.2)} pre="≈ " suf=" % compró" tam={44} color={VERDE} />
            </g>
          )}
          {t >= m('paralisis') && <Letrero x={600} y={300} texto="Menos opciones, menos parálisis" fondo={VIOLETA} id={ID} tam={28} op={e1(t, m('paralisis'))} />}
        </g>
      </Toma>

      {/* 3 · Herramienta, no edificio */}
      <Toma t={t} a={m('herramienta')} b={fin + 1} cy={470}>
        <g opacity={ventana(t, m('herramienta'), m('rapida') + 0.2) * 0.85 + 0.15}>
          <g transform="translate(260 380) rotate(-30)">
            <rect x={-18} y={-10} width={36} height={190} rx={14} fill={GRIS} />
            <path d="M -50 -60 a 50 50 0 1 0 100 0 l -22 0 l 0 30 l -56 0 l 0 -30 Z" fill={GRIS} />
          </g>
          <Txt x={270} y={260} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>Adquisición</Txt>
          <Txt x={560} y={470} textAnchor="middle" fontSize={64} fill={c.tenue} peso={800}>≠</Txt>
          <Edificio x={830} y={590} w={240} h={280} color={AZUL_M} />
          <Txt x={830} y={230} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>Negocio completo</Txt>
        </g>
        {t >= m('rapida') && (
          <g opacity={e1(t, m('rapida'))}>
            <rect x={120} y={680} width={960} height={20} rx={10} fill={c.apagado} />
            <rect x={120} y={680} width={480 * sm(t, m('rapida'), m('rapida') + 1)} height={20} rx={10} fill={VERDE} />
            <Letrero x={300} y={760} texto={movil ? 'Rápida y barata' : 'Rápida · individual · barata'} fondo={VERDE} id={ID} tam={24} />
            {t >= m('comite') && <rect x={600} y={680} width={480 * sm(t, m('comite'), m('comite') + 1)} height={20} rx={10} fill={AMBAR} />}
            {t >= m('comite') && <Letrero x={900} y={760} texto={movil ? 'Cara, de comité' : 'Cara · comité · años'} fondo={AMBAR} id={ID} tam={24} op={e1(t, m('comite'))} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
