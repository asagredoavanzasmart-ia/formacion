import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Auto, Engranaje, Reloj, Hoja, Calendario, Visto, Cruz, Suelo, Flecha, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Dos carriles y un sistema. Toma 1: una carretera de dos carriles vista desde arriba; el tema de operaciones avanza
 * por su carril, el vendedor responde y su tema se cruza al mismo carril: los dos quedan trabados. Separar los
 * carriles: primero uno y después el otro. Toma 2: el mensaje y quien lo envía se separan: el contenido va a «evaluar»
 * y la relación a «conversar aparte». Toma 3: el sistema: tres engranajes (estilo, roles, incentivos) que giran en
 * contra; ventas y operaciones tiran hacia lados opuestos; luego tres ajustes que destraban.
 */

const ID = 'fb17', P = 'fb-relacion';

export const RelacionFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('carril'), 'Cambiar de carril'], [m('pedidos'), 'Pedidos incompletos'], [m('responde'), '«Y ustedes nunca cumplen»'], [m('temas'), 'Dos temas, ninguno se resuelve'],
    [m('separar'), 'Separar los carriles'], [m('quien'), 'Quién te lo dice'], [m('que'), 'El qué y el quién'], [m('sistema'), 'Mirar el sistema'],
    [m('estilo'), 'Estilos'], [m('roles'), 'Roles e incentivos'], [m('completo'), 'El sistema completo'], [m('ajustes'), 'Ajustes, no culpables'],
  ];
  // carriles: y = 300 (carril A) y 400 (carril B)
  const avA = sm(t, m('pedidos'), m('responde') + 1.5);
  const cruce = sm(t, m('responde') + 0.6, m('responde') + 1.6) * (1 - sm(t, m('separar'), m('separar') + 1));
  const sep = sm(t, m('separar'), m('separar') + 2.5);
  const xA = t < m('separar') ? lerp(100, 520, avA) : lerp(520, 1080, sep);
  const xB = t < m('separar') ? lerp(100, 470, sm(t, m('responde'), m('responde') + 1.6)) : lerp(470, 760, sm(t, m('separar') + 1.4, m('separar') + 3));
  const yB = lerp(290, 200, cruce);
  const separa = sm(t, m('que'), m('que') + 1.2);
  const giro = t < m('ajustes') ? 1 : 1;
  const tira = sm(t, m('roles'), m('roles') + 1) * (1 - sm(t, m('ajustes'), m('ajustes') + 0.8));
  const AJ = ['Reunión semanal', 'Pedido completo', 'Fecha de corte'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Dos carriles y un sistema">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · los carriles */}
      <TomaFB t={t} a={0} b={m('quien')} cy={470}>
        <rect x={60} y={140} width={1080} height={180} rx={20} fill="#475569" />
        {Array.from({ length: 14 }, (_, k) => <rect key={k} x={80 + k * 78} y={226} width={44} height={8} rx={4} fill="#f8fafc" opacity={0.8} />)}
        {t >= m('pedidos') && <g opacity={e1(t, m('pedidos'))}><Auto x={xA} y={200} s={0.5} color={AZUL_M} /></g>}
        {t >= m('responde') && <g opacity={e1(t, m('responde'))}><Auto x={xB} y={yB} s={0.5} color={NARANJA} /></g>}
        {cruce > 0.6 && <Cruz x={(xA + xB) / 2} y={120} r={24} op={cruce} />}
        <Suelo y={760} isDark={isDark} x0={100} x1={1100} />
        <Persona id={ID} x={250} y={760} s={0.8} cuerpo={AZUL_M} />
        <Persona id={ID} x={950} y={760} s={0.8} cuerpo={NARANJA} />
        <Txt x={250} y={820} textAnchor="middle" fontSize={26} fill={c.texto}>Operaciones</Txt>
        <Txt x={950} y={820} textAnchor="middle" fontSize={26} fill={c.texto}>Vendedor</Txt>
        {vent(t, m('pedidos'), m('responde')) > 0.01 && <g opacity={vent(t, m('pedidos'), m('responde'))}><Burbuja x={270} y={600} w={420} texto="Tus pedidos llegan incompletos" u={sm(t, m('pedidos'), m('pedidos') + 1.4)} c={c} id={ID} tam={26} /></g>}
        {vent(t, m('responde'), m('temas')) > 0.01 && <g opacity={vent(t, m('responde'), m('temas'))}><Burbuja x={930} y={600} w={420} texto="Y ustedes nunca cumplen las fechas" u={sm(t, m('responde'), m('responde') + 1.4)} c={c} id={ID} tam={26} lado="der" /></g>}
        {t >= m('separar') && <Letrero x={600} y={560} texto="Primero el tuyo, después el mío" id={ID} tam={30} op={e1(t, m('separar'))} />}
      </TomaFB>

      {/* 2 · el qué y el quién */}
      <TomaFB t={t} a={m('quien')} b={m('sistema')} cy={470}>
        <Suelo y={720} isDark={isDark} x0={100} x1={500} />
        <Persona id={ID} x={260} y={720} s={1} cuerpo={VIOLETA} ojos={0.8} />
        <Reloj x={150} y={470} r={30} t={t * 4} aro={ROJO_M} />
        <Txt x={260} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Quien lo dice</Txt>
        {/* el mensaje */}
        <g transform={`translate(${lerp(420, 860, separa)} ${lerp(420, 300, separa)})`} opacity={e1(t, m('quien') + 0.4)}>
          <rect x={-80} y={-50} width={160} height={100} rx={12} fill={c.panel} style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,.2))' }} />
          <path d="M -80 -50 L 0 10 L 80 -50" stroke={NARANJA} strokeWidth={5} fill="none" />
        </g>
        {t >= m('razon') && <Visto x={lerp(470, 910, separa)} y={lerp(370, 250, separa)} r={22} op={e1(t, m('razon'))} />}
        {t >= m('que') && (
          <g opacity={e1(t, m('que'))}>
            <rect x={700} y={170} width={320} height={260} rx={24} fill="none" stroke={VERDE} strokeWidth={5} strokeDasharray="14 10" />
            <Txt x={860} y={410} textAnchor="middle" fontSize={28} fill={VERDE}>Evalúa el qué</Txt>
            <rect x={700} y={480} width={320} height={200} rx={24} fill="none" stroke={VIOLETA} strokeWidth={5} strokeDasharray="14 10" />
            <Txt x={860} y={570} textAnchor="middle" fontSize={28} fill={VIOLETA}>El quién,</Txt>
            <Txt x={860} y={612} textAnchor="middle" fontSize={28} fill={VIOLETA}>después</Txt>
          </g>
        )}
      </TomaFB>

      {/* 3 · el sistema */}
      <TomaFB t={t} a={m('sistema')} b={fin + 1} cy={470}>
        {vent(t, m('sistema'), m('ajustes')) > 0.01 && (
          <g opacity={vent(t, m('sistema'), m('ajustes'))}>
            {vent(t, m('sistema'), m('piezas')) > 0.01 && <Txt x={600} y={420} textAnchor="middle" fontSize={34} fill={c.texto} opacity={vent(t, m('sistema'), m('piezas'))}>Retrocede y mira el sistema</Txt>}
            {t >= m('piezas') && (
              <g opacity={e1(t, m('piezas'))}>
                {[['estilo', 'Estilos', 360, 330, 90, AZUL_M], ['roles', 'Roles', 540, 450, 70, NARANJA], ['incentivos', 'Incentivos', 700, 320, 90, VIOLETA]].map(([n, txt, x, y, r, col], k) => (
                  <g key={k} opacity={e1(t, m(n as string))}>
                    <Engranaje x={x as number} y={y as number} r={r as number} t={(k % 2 ? -1 : 1) * t * giro * (1 - 0.8 * tira)} color={col as string} hueco={c.panel} />
                    <Txt x={x as number} y={(y as number) + (r as number) + 46} textAnchor="middle" fontSize={28} fill={c.texto}>{txt as string}</Txt>
                  </g>
                ))}
              </g>
            )}
            {t >= m('completo') && <rect x={240} y={200} width={600} height={420} rx={30} fill="none" stroke={c.tenue} strokeWidth={5} strokeDasharray="16 12" opacity={e1(t, m('completo'))} />}
            {tira > 0.01 && (
              <g opacity={tira}>
                <Persona id={ID} x={150} y={760} s={0.8} cuerpo={NARANJA} />
                <Persona id={ID} x={1040} y={760} s={0.8} cuerpo={AZUL_M} />
                <Flecha x1={250} y1={590} x2={90} y2={590} color={NARANJA} grosor={10} />
                <Flecha x1={940} y1={590} x2={1110} y2={590} color={AZUL_M} grosor={10} />
                <Txt x={1000} y={300} textAnchor="middle" fontSize={26} fill={c.texto}>Cumplir</Txt>
                <Txt x={1000} y={260} textAnchor="middle" fontSize={26} fill={c.texto}>Operaciones:</Txt>
                <Txt x={150} y={500} textAnchor="middle" fontSize={26} fill={c.texto}>Ventas:</Txt>
                <Txt x={150} y={540} textAnchor="middle" fontSize={26} fill={c.texto}>Cerrar</Txt>
              </g>
            )}
          </g>
        )}
        {t >= m('ajustes') && (
          <g opacity={e1(t, m('ajustes'))}>
            {AJ.map((a, k) => (
              <g key={k} opacity={e1(t, (k === 2 ? m('corte') : m('ajustes') + 1 + k * 1.2))}>
                {k === 0 && <Calendario x={260} y={380} s={1.1} marcados={2} />}
                {k === 1 && <Hoja x={600} y={380} w={130} h={170} lineas={6} color={VERDE} />}
                {k === 2 && <g><Calendario x={940} y={380} s={1.1} /><rect x={900} y={370} width={80} height={10} rx={5} fill={ROJO_M} /></g>}
                <Txt x={260 + k * 340} y={560} textAnchor="middle" fontSize={28} fill={c.texto}>{a}</Txt>
              </g>
            ))}
            <Letrero x={600} y={680} texto="Ajustes, no culpables" fondo={VERDE} id={ID} tam={30} />
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
