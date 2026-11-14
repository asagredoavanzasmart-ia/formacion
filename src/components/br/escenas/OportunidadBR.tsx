import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Flecha, Sello, Visto, Cruz, Curva, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Mejora o nueva oportunidad.
 * Toma 1: dos caminos al mismo destino. Por la izquierda, el mismo auto viejo con un parche («mejora»): el cliente carga
 * con el dolor, admite su error y compite en un océano rojo de autos iguales. Por la derecha, un vehículo nuevo.
 * Toma 2: la balanza del estatus: la imagen de sí mismo sube o baja; la nueva oportunidad culpa al vehículo, no a la
 * persona. El iPod: toda la biblioteca en el bolsillo frente a «unas canciones más».
 * Toma 3: el sello de la condición: si solo cambias el nombre, no hay oportunidad nueva.
 */

const ID = 'br07', P = 'br-oportunidad';

const Auto: React.FC<{ x: number; y: number; s?: number; color: string; parche?: boolean; nuevo?: boolean; t?: number }> = ({ x, y, s = 1, color, parche = false, nuevo = false, t = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={nuevo ? 'M -110 -10 Q -100 -70 -30 -80 L 50 -80 Q 100 -60 120 -10 Z' : 'M -110 -10 V -50 Q -100 -70 -60 -72 L -30 -110 H 50 L 80 -72 Q 110 -66 115 -40 V -10 Z'} fill={color} style={sombra(0.22, 3, 8)} />
    <rect x={-120} y={-14} width={244} height={20} rx={10} fill={color} />
    <circle cx={-70} cy={8} r={22} fill="#1f2937" /><circle cx={70} cy={8} r={22} fill="#1f2937" />
    <circle cx={-70} cy={8} r={8} fill="#94a3b8" transform={`rotate(${t * 200} -70 8)`} />
    {parche && <rect x={-10} y={-62} width={44} height={30} rx={4} fill="#fbbf24" transform="rotate(-12)" />}
    {nuevo && <path d="M -40 -70 L 40 -70 L 60 -30 L -50 -30 Z" fill="#fff" opacity={0.35} />}
  </g>
);

export const OportunidadBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('mejora'), 'Oferta de mejora'], [m('nueva'), 'Nueva oportunidad'], [m('dificil'), 'Por qué la mejora cuesta'],
    [m('estatus'), 'El estatus'], [m('ipod'), 'El iPod'], [m('real'), 'Un cambio real'],
  ];
  const avanzaN = sm(t, m('nueva'), m('nueva') + 2.5);
  const incl = t >= m('justifica') ? lerp(10, -12, sm(t, m('justifica'), m('justifica') + 1)) : t >= m('estatus') ? lerp(0, 10, sm(t, m('estatus'), m('estatus') + 1)) : 0;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Mejora o nueva oportunidad">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Dos caminos */}
      <Toma t={t} a={0} b={m('estatus')} cy={470}>
        <g opacity={e1(t, 0.3)}>
          <rect x={980} y={180} width={140} height={110} rx={20} fill={VERDE} />
          <Txt x={1050} y={248} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>Meta</Txt>
          <rect x={120} y={420} width={860} height={18} rx={9} fill={c.apagado} />
          <rect x={120} y={660} width={860} height={18} rx={9} fill={c.apagado} />
        </g>
        {t >= m('mejora') - 0.1 && (
          <g opacity={e1(t, m('mejora'))}>
            <Auto x={lerp(240, 330, sm(t, m('mejora'), m('mejora') + 3))} y={410} color={GRIS} parche t={t} />
            <Letrero x={240} y={300} texto="Mejora" fondo={GRIS} id={ID} tam={28} />
          </g>
        )}
        {t >= m('nueva') - 0.1 && (
          <g opacity={e1(t, m('nueva'))}>
            <Auto x={lerp(240, 820, avanzaN)} y={650} color={NARANJA} nuevo t={t} />
            <Letrero x={240} y={560} texto="Nueva oportunidad" fondo={NARANJA} id={ID} tam={28} />
            <Flecha x1={880} y1={620} x2={1010} y2={320} u={sm(t, m('nueva') + 1.5, m('nueva') + 2.5)} color={NARANJA} grosor={10} />
          </g>
        )}
        {([['dificil', 'Dolor conocido'], ['admitir', 'Admitir el error'], ['rojo', 'Océano rojo']] as const).map(([n, txt], k) => (
          t >= m(n) - 0.1 ? <Letrero key={n} x={[600, 750, 885][k]} y={300 + (k % 2) * 60} texto={movil ? txt.split(' ')[0] : txt} fondo={ROJO_M} id={ID} tam={24} op={e1(t, m(n))} /> : null
        ))}
      </Toma>

      {/* 2 · El estatus y el iPod */}
      <Toma t={t} a={m('estatus')} b={m('real')} cy={470}>
        <g opacity={ventana(t, m('estatus'), m('ipod'))}>
          <rect x={590} y={300} width={20} height={380} rx={10} fill={c.texto} opacity={0.6} />
          <path d="M 540 700 H 660 L 620 640 H 580 Z" fill={c.texto} opacity={0.6} />
          <g transform={`rotate(${incl} 600 300)`}>
            <rect x={300} y={290} width={600} height={20} rx={10} fill={c.texto} />
            <rect x={240} y={330} width={180} height={110} rx={20} fill={ROJO_M} />
            <Txt x={330} y={395} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>{movil ? 'Error' : 'Me equivoqué'}</Txt>
            <rect x={780} y={330} width={180} height={110} rx={20} fill={VERDE} />
            <Txt x={870} y={395} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>{movil ? 'Mejor' : 'Elijo mejor'}</Txt>
          </g>
          {t >= m('imagen') && <Letrero x={600} y={220} texto="¿Mi imagen sube o baja?" fondo={VIOLETA} id={ID} tam={28} op={e1(t, m('imagen'))} />}
          {t >= m('vehiculo') && <Letrero x={600} y={760} texto="La culpa era del vehículo" fondo={NARANJA} id={ID} tam={28} op={e1(t, m('vehiculo'))} />}
        </g>
        {t >= m('ipod') && (
          <g opacity={e1(t, m('ipod'))}>
            <rect x={150} y={250} width={380} height={420} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            {[0, 1, 2].map((k) => <circle key={k} cx={260 + k * 80} cy={420} r={50} fill="#94a3b8" opacity={0.8 - k * 0.15} />)}
            <Txt x={340} y={580} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>«Unas canciones más»</Txt>
            <rect x={670} y={250} width={380} height={420} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <rect x={790} y={300} width={140} height={230} rx={22} fill="#e2e8f0" />
            <rect x={808} y={318} width={104} height={88} rx={8} fill={AZUL_M} />
            <circle cx={860} cy={470} r={38} fill="#94a3b8" /><circle cx={860} cy={470} r={14} fill="#e2e8f0" />
            {t >= m('biblioteca') && <Txt x={860} y={600} textAnchor="middle" fontSize={28} fill={VERDE} peso={800} opacity={e1(t, m('biblioteca'))}>Toda la biblioteca</Txt>}
            <Letrero x={860} y={720} texto="iPod, 2001" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
      </Toma>

      {/* 3 · La condición */}
      <Toma t={t} a={m('real')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('real'))}>
          <Auto x={360} y={560} s={1.1} color={GRIS} parche t={0} />
          <Letrero x={360} y={400} texto="Nombre nuevo" fondo={GRIS} id={ID} tam={28} />
          <Cruz x={360} y={680} r={34} />
          <Auto x={860} y={560} s={1.1} color={NARANJA} nuevo t={t} />
          <Letrero x={860} y={400} texto="Vehículo nuevo" fondo={NARANJA} id={ID} tam={28} />
          <Visto x={860} y={680} r={34} />
          <Sello x={600} y={250} texto="Cambio real" u={sm(t, m('real') + 0.5, m('real') + 1.1)} color={VERDE} tam={38} />
        </g>
      </Toma>
    </Lienzo>
  );
};
