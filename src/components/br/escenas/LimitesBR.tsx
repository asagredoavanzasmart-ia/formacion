import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, Frasco, Edificio, Sello, Megafono, Moneda3D, Calendario, Cubo, Tarjeta, Conector, Pastilla, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Dónde sí funciona.
 * Toma 1: una lupa recorre el método. Lo defendible es un circuito de caja: los anuncios traen compras, las compras
 * llenan el frasco y el frasco paga los anuncios siguientes, sin capital externo.
 * Toma 2: Iyengar y Lepper (2000): dos mesas de degustación con compradores; frente a 24 variedades casi nadie se lleva
 * un frasco (3 %), frente a 6 se lo llevan muchos más (cerca del 30 %).
 * Toma 3: una herramienta de adquisición no es el edificio completo; y un riel con dos extremos: compra rápida,
 * individual y barata (una caja pequeña, una persona) frente a cara, de comité y de años (una caja grande, cinco
 * personas y un calendario).
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
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('examinar'), 'Examinar el método'], [m('economica'), 'Lo defendible: la caja'], [m('iyengar'), 'Iyengar y Lepper (2000)'],
    [m('herramienta'), 'Una herramienta'], [m('rapida'), 'Dónde rinde'],
  ];
  const lupa = sm(t, m('examinar'), m('economica'));
  const caja = sm(t, m('economica'), m('capital') + 1);
  const COL = [NARANJA, ROSA, VIOLETA, AMBAR, ROJO_M, TEAL];
  const rail = sm(t, m('rapida'), m('rapida') + 1), rail2 = sm(t, m('comite'), m('comite') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Dónde sí funciona">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El circuito de caja */}
      <Toma t={t} a={0} b={m('lineal')} cy={470}>
        <g opacity={E('examinar', 0.6, -0.3)}>
          <g transform={`translate(${lerp(160, 1040, lupa)} ${380 + 60 * Math.sin(lupa * Math.PI * 2)})`} opacity={1 - caja * 0.7}>
            <circle r={70} fill="#fff" opacity={0.3} />
            <circle r={70} fill="none" stroke={c.texto} strokeWidth={12} />
            <rect x={44} y={44} width={22} height={90} rx={10} fill={c.texto} transform="rotate(-45 44 44)" />
          </g>
        </g>
        {t >= m('economica') && (
          <g opacity={E('economica')}>
            <g transform="translate(250 330)"><Megafono x={0} y={0} s={0.9} habla={1} t={t} /></g>
            <Txt x={250} y={440} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>Anuncios</Txt>
            <g><Persona id={ID} x={600} y={720} s={0.6} cuerpo={AZUL_M} /><Persona id={ID} x={660} y={720} s={0.6} cuerpo={ROSA} /></g>
            <Txt x={630} y={780} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>Primeras compras</Txt>
            <Frasco x={950} y={520} w={170} h={240} v={0.15 + 0.65 * caja} t={t} c={c} color={VERDE} />
            <Txt x={950} y={560} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>Caja</Txt>
            <Conector x1={330} y1={420} x2={560} y2={630} u={sm(t, m('economica'), m('economica') + 0.8)} t={t} color={NARANJA} curva={0.2} puntos={4} />
            <Conector x1={700} y1={630} x2={880} y2={430} u={sm(t, m('economica') + 0.6, m('economica') + 1.4)} t={t} color={VERDE} curva={0.2} puntos={4} />
            <Conector x1={880} y1={270} x2={340} y2={290} u={sm(t, m('capital') - 0.4, m('capital') + 0.6)} t={t} color={AMBAR} curva={0.12} puntos={4} />
          </g>
        )}
        <Pastilla x={600} y={200} texto="Sin capital externo" fondo={VERDE} tam={28} op={E('capital')} />
      </Toma>

      {/* 2 · Las mermeladas */}
      <Toma t={t} a={m('lineal')} b={m('herramienta')} cy={470}>
        {[0, 1].map((k) => {
          const x0 = k === 0 ? 90 : 690, n = k === 0 ? 24 : 6, nombre = k === 0 ? 'veinticuatro' : 'seis';
          const u = t >= m(nombre) - 0.1 ? Math.min(1, E(nombre)) : 0.15;
          const compran = k === 0 ? 1 : 3;
          const lleva = sm(t, m(k === 0 ? 'tres' : 'seis') + 0.6, m(k === 0 ? 'tres' : 'seis') + 1.6);
          return (
            <g key={k} opacity={u}>
              <rect x={x0} y={430} width={420} height={26} rx={8} fill="#a16207" />
              <rect x={x0 + 30} y={456} width={20} height={110} fill="#a16207" /><rect x={x0 + 370} y={456} width={20} height={110} fill="#a16207" />
              {Array.from({ length: n }, (_, j) => { const cols = k === 0 ? 8 : 3; return <Mermelada key={j} x={x0 + (k === 0 ? 50 + (j % cols) * 46 : 120 + (j % cols) * 90)} y={426 - Math.floor(j / cols) * 50} color={COL[j % 6]} s={k === 0 ? 0.9 : 1.1} />; })}
              <Txt x={x0 + 210} y={255} textAnchor="middle" fontSize={30} fill={c.texto} peso={800}>{`${n} variedades`}</Txt>
              {[0, 1, 2, 3, 4].map((j) => {
                const compra = j < compran;
                return <g key={j}><Persona id={ID} x={x0 + 50 + j * 80} y={680} s={0.45} cuerpo={compra && lleva > 0.5 ? VERDE : GRIS} />{compra && lleva > 0.3 && <Mermelada x={x0 + 78 + j * 80} y={650} color={COL[j]} s={0.6} />}</g>;
              })}
            </g>
          );
        })}
        {t >= m('tres') && <Cifra x={300} y={780} valor={3} u={sm(t, m('tres'), m('tres') + 0.8)} suf=" % compró" tam={40} color={ROJO_M} />}
        {t >= m('seis') && <Cifra x={900} y={780} valor={30} u={sm(t, m('seis') + 0.4, m('seis') + 1.2)} pre="≈ " suf=" % compró" tam={40} color={VERDE} />}
        <Pastilla x={600} y={200} texto={movil ? 'Menos opciones' : 'Menos opciones, menos parálisis'} fondo={VIOLETA} tam={28} op={E('paralisis')} />
      </Toma>

      {/* 3 · Herramienta y riel */}
      <Toma t={t} a={m('herramienta')} b={fin + 1} cy={470}>
        <g opacity={E('herramienta')}>
          {/* Llave de herramientas con un embudo grabado: la herramienta de adquisición */}
          <g transform="translate(300 420) rotate(-35)">
            <rect x={-20} y={-30} width={40} height={230} rx={18} fill="#64748b" />
            <rect x={-20} y={-30} width={14} height={230} rx={7} fill="#fff" opacity={0.18} />
            <path d="M -62 -64 A 66 66 0 1 0 62 -64 L 30 -64 L 30 -20 L -30 -20 L -30 -64 Z" fill="#64748b" />
            <path d="M -62 -64 A 66 66 0 0 0 -40 -14 L -30 -20 L -30 -64 Z" fill="#fff" opacity={0.15} />
            <path d="M -18 70 H 18 L 6 100 V 130 H -6 V 100 Z" fill={NARANJA} />
          </g>
          <Txt x={300} y={240} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>{movil ? 'Adquisición' : 'Herramienta de adquisición'}</Txt>
          <Txt x={600} y={440} textAnchor="middle" fontSize={70} fill={c.tenue} peso={800}>≠</Txt>
          <Edificio x={880} y={560} w={190} h={230} color={AZUL_M} />
          <Txt x={880} y={240} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>{movil ? 'Negocio' : 'Negocio completo'}</Txt>
        </g>
        {rail > 0 && (
          <g>
            <rect x={120} y={720} width={960} height={20} rx={10} fill={c.apagado} />
            <rect x={120} y={720} width={480 * rail} height={20} rx={10} fill={VERDE} />
            <rect x={600} y={720} width={480 * rail2} height={20} rx={10} fill={AMBAR} />
            <g opacity={rail}><Cubo x={220} y={690} l={36} color={VERDE} /><Persona id={ID} x={300} y={712} s={0.4} cuerpo={VERDE} /></g>
            <g opacity={rail2}><Cubo x={740} y={696} l={50} color={AMBAR} />{[0, 1, 2, 3, 4].map((j) => <Persona key={j} id={ID} x={850 + j * 34} y={712} s={0.34} cuerpo={AMBAR} />)}<Calendario x={1060} y={668} s={0.3} marcados={12} /></g>
            <Pastilla x={360} y={800} texto={movil ? 'Rápida y barata' : 'Rápida · individual · barata'} fondo={VERDE} tam={24} op={rail} />
            <Pastilla x={880} y={800} texto={movil ? 'Cara, de comité' : 'Cara · comité · años'} fondo={AMBAR} tam={24} op={rail2} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
