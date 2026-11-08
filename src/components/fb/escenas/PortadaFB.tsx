import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Flujo, Escudo, Calendario, Bombilla, Moneda3D, Suelo, Dial, e1, sm, vent, lerp, tono, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Portada. Toma 1: un equipo en ronda se pasa la verdad (flujos entre personas) y el medidor de mejora sube con
 * ese flujo; el feedback como información en tres ejemplos; el escenario se parte en dos lados.
 * Toma 2: quien da y quien recibe. Dar: el mensaje llega y se enciende la idea. Recibir: de un comentario torcido se
 * rescata la moneda útil. Luego quien habla empuja más fuerte y quien escucha levanta un escudo.
 * Toma 3: el camino de la clase con sus paradas, que termina en el calendario semanal del hábito.
 */

const ID = 'fb00', P = 'fb-portada';

export const PortadaFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const rot: [number, string][] = [
    [m('equipo'), 'Un equipo que se dice la verdad'], [m('informacion'), 'Información sobre cómo te va'], [m('dos'), 'Dos lados'],
    [m('dar'), 'Dar bien'], [m('recibir'), 'Recibir bien'], [m('empuja'), 'Uno empuja, otro se defiende'],
    [m('tacticas'), 'Tácticas concretas'], [m('habito'), 'Un hábito de equipo'],
  ];
  const ronda = [[300, 640], [500, 700], [700, 700], [900, 640]] as const;
  const colores = [NARANJA, AZUL_M, VIOLETA, ROSA];
  const mejora = 0.15 + 0.7 * sm(t, m('verdad'), m('informacion'));
  const EJ = ['Tras una reunión', 'Una corrección', 'Un agradecimiento'];
  const PARADAS = [['cuando', 'Cuándo'], ['abrir', 'Abrir'], ['plan', 'Plan'], ['reconocer', 'Reconocer'], ['critica', 'Recibir']] as const;
  const empuje = sm(t, m('empuja'), m('defiende') + 0.5);
  const defensa = sm(t, m('defiende'), m('defiende') + 0.8);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Feedback en equipos: dar y recibir">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · el equipo y la verdad que circula */}
      <TomaFB t={t} a={0} b={m('dar')} cy={500}>
        <Suelo y={720} isDark={isDark} x0={160} x1={1040} />
        {ronda.map(([x, y], k) => <Persona key={k} id={ID} x={x} y={y} s={0.95} cuerpo={colores[k]} ojos={1} />)}
        {t >= m('verdad') && ronda.map(([x, y], k) => {
          const [x2, y2] = ronda[(k + 1) % 4];
          return <Flujo key={k} x1={x} y1={y - 120} x2={x2} y2={y2 - 120} t={t} n={4} arco={k === 3 ? 110 : 60} color={k % 2 ? ROSA : NARANJA} op={e1(t, m('verdad'))} />;
        })}
        <Dial x={600} y={260} v={mejora} texto="Velocidad de mejora" c={c} id={ID} r={90} op={e1(t, m('equipo'))} />
        {EJ.map((txt, k) => {
          const o = vent(t, m('comentario') + k * 0.9, m('dos'));
          return o > 0.01 ? <Letrero key={k} x={260 + k * 340} y={790} texto={txt} fondo={[AZUL_M, VIOLETA, VERDE][k]} id={ID} tam={28} op={o} /> : null;
        })}
        {t >= m('dos') && (
          <g opacity={e1(t, m('dos'))}>
            <Letrero x={300} y={790} texto="Dar" id={ID} tam={32} fondo={NARANJA} />
            <Letrero x={900} y={790} texto="Recibir" id={ID} tam={32} fondo={ROSA} />
          </g>
        )}
      </TomaFB>

      {/* 2 · quien da y quien recibe */}
      <TomaFB t={t} a={m('dar')} b={m('tacticas')} cy={480}>
        <Suelo y={720} isDark={isDark} x0={140} x1={1060} />
        <Persona id={ID} x={300} y={720} s={1.05} cuerpo={NARANJA} />
        <Persona id={ID} x={900} y={720} s={1.05} cuerpo={ROSA} ojos={1 - 0.5 * defensa} />
        <Txt x={300} y={790} textAnchor="middle" fontSize={30} fill={c.texto}>Quien da</Txt>
        <Txt x={900} y={790} textAnchor="middle" fontSize={30} fill={c.texto}>Quien recibe</Txt>
        {vent(t, m('dar'), m('recibir')) > 0.01 && (
          <g opacity={vent(t, m('dar'), m('recibir'))}>
            <Flujo x1={360} y1={600} x2={840} y2={600} t={t} n={5} arco={50} color={NARANJA} />
            <Bombilla x={900} y={420} s={0.9} id={ID} t={t} luz={sm(t, m('dar') + 0.8, m('dar') + 2)} />
            <Txt x={600} y={260} textAnchor="middle" fontSize={32} fill={c.texto}>Entiende qué cambiar</Txt>
            <Txt x={600} y={306} textAnchor="middle" fontSize={32} fill={c.texto} opacity={sm(t, m('dar') + 1.5, m('dar') + 2.2)}>y quiere hacerlo</Txt>
          </g>
        )}
        {vent(t, m('recibir'), m('empuja')) > 0.01 && (
          <g opacity={vent(t, m('recibir'), m('empuja'))}>
            <path d={`M 360 560 ${Array.from({ length: 10 }, (_, k) => `L ${380 + k * 44} ${560 + (k % 2 ? -30 : 30)}`).join(' ')}`} stroke={ROJO_M} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray={600} strokeDashoffset={600 * (1 - sm(t, m('recibir'), m('recibir') + 1.2))} />
            <g transform={`translate(${lerp(820, 900, sm(t, m('recibir') + 1.2, m('recibir') + 2.4))} ${lerp(560, 440, sm(t, m('recibir') + 1.2, m('recibir') + 2.4))})`}><Moneda3D x={0} y={0} r={34} /></g>
            <Txt x={600} y={280} textAnchor="middle" fontSize={32} fill={c.texto}>Algo útil, aunque venga mal dicho</Txt>
          </g>
        )}
        {t >= m('empuja') && (
          <g opacity={e1(t, m('empuja'))}>
            {Array.from({ length: 3 }, (_, k) => {
              const u = ((t - m('empuja')) * 0.7 + k / 3) % 1;
              const tope = defensa > 0.5 ? 0.78 : 1;
              const x = lerp(370, 830, Math.min(u, tope));
              const reb = Math.max(0, u - tope) * 4;
              return <path key={k} d={`M ${x - 40 - 30 * empuje} ${600 - reb * 60} L ${x} ${600 - reb * 60}`} stroke={NARANJA} strokeWidth={8 + 14 * empuje} strokeLinecap="round" opacity={1 - reb} />;
            })}
            <Escudo x={830} y={590} s={1.3} op={defensa} />
            <Txt x={300} y={300} textAnchor="middle" fontSize={32} fill={c.texto}>Empuja más fuerte</Txt>
            {t >= m('defiende') && <Txt x={900} y={300} textAnchor="middle" fontSize={32} fill={c.texto} opacity={e1(t, m('defiende'))}>Se defiende mejor</Txt>}
          </g>
        )}
      </TomaFB>

      {/* 3 · el camino de la clase y el hábito */}
      <TomaFB t={t} a={m('tacticas')} b={fin + 1} cy={470}>
        {vent(t, m('tacticas') - 0.1, m('habito')) > 0.01 && (
          <g opacity={vent(t, m('tacticas') - 0.1, m('habito'))}>
            <path d="M 120 620 C 300 420, 420 720, 600 520 S 900 360, 1080 470" stroke={c.apagado} strokeWidth={26} fill="none" strokeLinecap="round" />
            <path d="M 120 620 C 300 420, 420 720, 600 520 S 900 360, 1080 470" stroke={`url(#${ID}-marcaH)`} strokeWidth={26} fill="none" strokeLinecap="round" strokeDasharray={1300} strokeDashoffset={1300 * (1 - sm(t, m('cuando'), m('critica') + 1))} />
            {PARADAS.map(([n, txt], k) => {
              const x = 190 + k * 210, y = [560, 600, 520, 440, 450][k];
              const o = e1(t, m(n));
              return o > 0.01 ? (
                <g key={n} opacity={o}>
                  <circle cx={x} cy={y} r={30} fill={[NARANJA, AZUL_M, VIOLETA, VERDE, ROSA][k]} style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.2))' }} />
                  <Txt x={x} y={y + 12} textAnchor="middle" fontSize={32} fill="#fff">{k + 1}</Txt>
                  <Txt x={x} y={k % 2 ? y + 84 : y - 56} textAnchor="middle" fontSize={30} fill={c.texto}>{txt}</Txt>
                </g>
              ) : null;
            })}
          </g>
        )}
        {t >= m('habito') && (
          <g opacity={e1(t, m('habito'))}>
            <Calendario x={600} y={420} s={1.6} marcados={Math.min(4, Math.floor(Math.max(0, t - m('semana')) * 2.5))} />
            {[380, 820].map((x, k) => <Persona key={k} id={ID} x={x} y={720} s={0.95} cuerpo={k ? ROSA : NARANJA} />)}
            <Letrero x={600} y={790} texto="Cada semana: cómo te va" id={ID} tam={32} op={e1(t, m('semana'))} />
          </g>
        )}
        {t >= m('tacticas') && t < m('habito') && <Txt x={600} y={790} textAnchor="middle" fontSize={28} fill={GRIS} opacity={vent(t, m('tacticas'), m('habito'))}>Para ventas y operaciones</Txt>}
      </TomaFB>
    </Lienzo>
  );
};
