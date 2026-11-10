import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Iman, Persona, Gente, Telefono, Megafono, Regalo, Barra, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * El imán de prospectos.
 * Toma 1: el imán atrae figuras grises que, al acercarse, se colorean: prospectos comprometidos (interés activo).
 * Toma 2: dos carriles de la cuenta. Arriba, la oferta en frío: megáfono → 1.000 por llamada → 1 de 3 → 3.000 por
 * cliente. Abajo, con imán: el regalo de 25 → 75 de publicidad → 100 por llamada → 1 de 10 → 1.000 por cliente. Dos
 * barras finales comparan 3.000 y 1.000: a un tercio.
 */

const ID = 'ad17', P = 'ad-iman';

export const ImanAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('comprometidos'), 'Prospectos comprometidos'], [m('iman'), 'Un imán de prospectos'], [m('deja'), 'La cuenta en frío'], [m('ahora'), 'La cuenta con imán'], [m('tercio'), 'A un tercio'],
  ];
  const fila = (y: number, items: [string, string, number, string][], color: string) => items.map(([n, txt, x, col], k) => (
    <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0}>
      {k > 0 && <path d={`M ${x - 150} ${y} H ${x - 92}`} stroke={c.apagado} strokeWidth={8} strokeLinecap="round" />}
      <rect x={x - 90} y={y - 50} width={180} height={100} rx={20} fill={col || color} style={sombra(0.2, 3, 8)} />
      <Txt x={x} y={y + 12} textAnchor="middle" fontSize={movil ? 30 : 30} fill="#fff" peso={800}>{txt}</Txt>
    </g>
  ));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El imán de prospectos">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El imán atrae interés activo */}
      <Toma t={t} a={0} b={m('deja')} cy={470}>
        <Iman x={300} y={470} s={1.6} rot={90} atrae={sm(t, m('iman'), m('iman') + 1)} t={t} op={e1(t, m('comprometidos') - 0.5)} />
        {Array.from({ length: 8 }, (_, k) => {
          const u = sm(t, m('interes') + k * 0.2, m('interes') + k * 0.2 + 2);
          const x = lerp(1060 - (k % 4) * 60, 560 + (k % 4) * 60, u), y = 320 + Math.floor(k / 4) * 260;
          return (
            <g key={k} opacity={e1(t, m('comprometidos'))}>
              <circle cx={x} cy={y - 58} r={16} fill="#f7c4a0" />
              <path d={`M ${x - 24} ${y} Q ${x - 24} ${y - 40} ${x} ${y - 40} Q ${x + 24} ${y - 40} ${x + 24} ${y} Z`} fill={u > 0.6 ? NARANJA : GRIS} />
            </g>
          );
        })}
        {t >= m('iman') && <Letrero x={300} y={720} texto="Gratis y valioso" id={ID} tam={28} op={e1(t, m('iman'))} />}
        {t >= m('estrecho') && <Letrero x={820} y={760} texto="Un problema estrecho y real" fondo={AZUL_M} id={ID} tam={26} op={e1(t, m('estrecho'))} />}
      </Toma>

      {/* 2 · Las dos cuentas */}
      <Toma t={t} a={m('deja')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('deja'))}>
          <Txt f="a" x={70} y={190} fontSize={28} fill={c.texto}>Oferta de 10.000 de ganancia</Txt>
          <Megafono x={110} y={330} s={0.6} habla={1} t={t} />
          {fila(320, [['frio', 'En frío', 330, GRIS], ['llamada', '1.000', 560, ROJO_M], ['tres', '1 de 3', 790, VIOLETA], ['tresmil', '3.000', 1020, ROJO_M]], GRIS)}
          {!movil && t >= m('llamada') && <Txt f="a" x={560} y={400} textAnchor="middle" fontSize={22} fill={c.tenue}>por llamada</Txt>}
          {!movil && t >= m('tresmil') && <Txt f="a" x={1020} y={400} textAnchor="middle" fontSize={22} fill={c.tenue}>por cliente</Txt>}
        </g>
        {t >= m('ahora') && (
          <g opacity={e1(t, m('ahora'))}>
            <Regalo x={110} y={600} s={0.7} color={VERDE} />
            {fila(560, [['veinticinco', '25 + ', 330, AMBAR], ['setenta', '75', 560, AZUL_M], ['cien', '100', 790, VERDE], ['diez', '1 de 10', 1020, VIOLETA]], VERDE)}
            {!movil && t >= m('cien') && <Txt f="a" x={790} y={640} textAnchor="middle" fontSize={22} fill={c.tenue}>por llamada: 10 veces menos</Txt>}
          </g>
        )}
        {t >= m('mil') && (
          <g opacity={e1(t, m('mil'))}>
            <rect x={140} y={660} width={920} height={180} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
            <rect x={200} y={700} width={720 * sm(t, m('mil'), m('mil') + 0.8)} height={40} rx={20} fill={ROJO_M} />
            <rect x={200} y={760} width={240 * sm(t, m('mil') + 0.4, m('mil') + 1.2)} height={40} rx={20} fill={VERDE} />
            <Txt x={940} y={732} fontSize={30} fill={c.texto} peso={800}>3.000</Txt>
            <Txt x={460} y={792} fontSize={30} fill={c.texto} peso={800}>1.000</Txt>
            {t >= m('tercio') && <Letrero x={800} y={800} texto="Costo a un tercio" fondo={VERDE} id={ID} tam={26} op={e1(t, m('tercio'))} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
