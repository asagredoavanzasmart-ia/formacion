import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Calendario, Burbuja, Visto, Cruz, Suelo, Flujo, Corazon, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * La decisión difícil.
 * 1 · Un equipo de cinco; uno no encaja (gris, con una nube). El calendario se detiene en el primer mes: todos lo sabían.
 *     El líder no decide y las personas de mejor desempeño salen por la derecha.
 * 2 · La pregunta de los treinta días como una bifurcación: no → la puerta; sí → un ascenso; «no lo sé» → probablemente una excusa.
 * 3 · Bratislava: el cofundador sale y el equipo se acerca con un «gracias, ya era hora».
 */

const ID = 'ep17', P = 'ep-decision';
const COL = [NARANJA, ROSA, AZUL_M, VERDE];

export const DecisionEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('orden'), 'Despedir y contratar'], [m('primer'), 'Lo sabían el primer mes'], [m('lecturas'), 'Dos lecturas'], [m('sevan'), 'Los mejores se van'],
    [m('treinta'), 'La pregunta de los treinta días'], [m('bratislava'), 'Bratislava'],
  ];
  const sevan = sm(t, m('sevan'), m('sevan') + 2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La decisión difícil">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el equipo y el que no encaja */}
      <Toma t={t} a={0} b={m('treinta')} cy={480}>
        <Suelo y={700} isDark={isDark} x0={80} x1={1120} />
        {[0, 1, 2, 3, 4].map((k) => {
          const raro = k === 2;
          const mejor = k === 0 || k === 4;
          const x = 260 + k * 170 + (mejor ? lerp(0, k === 0 ? -400 : 400, sevan) : 0);
          return <Persona key={k} id={ID} x={x} y={700} s={0.75} cuerpo={raro ? GRIS : COL[k % 4]} ojos={raro ? 0.4 : 1} />;
        })}
        {t >= m('mitad') && <Letrero x={600} y={760} texto="«El equipo no era el adecuado»" fondo={GRIS} id={ID} op={e1(t, m('mitad')) * (1 - sm(t, m('primer'), m('primer') + 0.5))} tam={26} />}
        {t >= m('primer') && <g opacity={e1(t, m('primer'))}><Calendario x={940} y={260} s={0.9} marcados={Math.min(14, Math.floor((t - m('primer')) * 6))} /><Letrero x={940} y={380} texto="Primer mes" fondo={ROSA} id={ID} tam={24} /></g>}
        {t >= m('todos') && [0, 1, 3, 4].map((k) => <circle key={k} cx={260 + k * 170 + 30} cy={540} r={8} fill="#fbbf24" opacity={e1(t, m('todos') + 0.1 * k) * (1 - sevan)} />)}
        {t >= m('dificil') && t < m('sevan') && <g opacity={e1(t, m('dificil'))}>
          <Persona id={ID} x={180} y={360} s={0.55} cuerpo={VIOLETA} corbata />
          <Letrero x={400} y={420} texto={t >= m('peor') ? 'Lo sabe y no hace nada' : t >= m('nolosabe') ? 'No lo sabe' : 'No decide'} fondo={VIOLETA} id={ID} tam={24} />
        </g>}
        {t >= m('sevan') && <Letrero x={600} y={300} texto="Los mejores se van, porque pueden" fondo="#e5484d" id={ID} op={e1(t, m('sevan'))} tam={26} />}
      </Toma>

      {/* 2 · la pregunta de los treinta días */}
      <Toma t={t} a={m('treinta')} b={m('bratislava')} cy={470}>
        <Calendario x={200} y={420} s={1} marcados={14} op={e1(t, m('treinta'))} />
        <Letrero x={200} y={540} texto="Día 30" fondo={ROSA} id={ID} op={e1(t, m('treinta'))} tam={26} />
        {t >= m('sabiendo') && <g opacity={e1(t, m('sabiendo'))}>
          <rect x={360} y={250} width={480} height={110} rx={26} fill={c.panel} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
          <Txt f="a" x={600} y={296} textAnchor="middle" fontSize={26} fill={c.texto}>Sabiendo lo que sé hoy,</Txt>
          <Txt f="a" x={600} y={332} textAnchor="middle" fontSize={26} fill={c.texto}>¿la contrataría?</Txt>
        </g>}
        {[{ k: 'no', y: 480, col: '#e5484d', txt: 'No: despedir al día siguiente', ic: <Cruz x={0} y={0} r={26} /> },
          { k: 'si', y: 600, col: VERDE, txt: 'Sí: un ascenso o reconocimiento', ic: <Visto x={0} y={0} r={26} /> },
          { k: 'nose', y: 720, col: GRIS, txt: '«No lo sé»: una excusa', ic: <circle r={26} fill={GRIS} /> }].map((r) => t >= m(r.k) && (
          <g key={r.k} opacity={e1(t, m(r.k))}>
            <path d={`M 600 370 Q 600 ${r.y} 720 ${r.y}`} stroke={r.col} strokeWidth={8} fill="none" />
            <g transform={`translate(760 ${r.y})`}>{r.ic}</g>
            <Txt f="a" x={806} y={r.y + 10} fontSize={26} fill={c.texto}>{r.txt}</Txt>
          </g>
        ))}
      </Toma>

      {/* 3 · Bratislava */}
      <Toma t={t} a={m('bratislava')} b={fin + 1} cy={480}>
        <Suelo y={700} isDark={isDark} x0={80} x1={1120} />
        <Persona id={ID} x={300} y={700} s={0.8} cuerpo={VIOLETA} corbata />
        <Persona id={ID} x={lerp(500, 1120, sm(t, m('bratislava') + 1, m('bratislava') + 4))} y={700} s={0.8} cuerpo={GRIS} />
        {t >= m('hora') && <g>
          {[0, 1, 2, 3].map((k) => <Persona key={k} id={ID} x={lerp(900, 430 + k * 110, sm(t, m('hora'), m('hora') + 1.5))} y={700} s={0.6} cuerpo={COL[k]} />)}
          <Burbuja x={540} y={220} w={460} texto="¡Gracias, ya era hora!" u={sm(t, m('hora'), m('hora') + 1.2)} c={c} id={ID} marca />
          <Corazon x={300} y={440} s={0.8} op={e1(t, m('hora') + 1)} />
        </g>}
        <Letrero x={300} y={770} texto="No durmió esa noche" fondo={VIOLETA} id={ID} op={e1(t, m('bratislava') + 1.5) * (1 - sm(t, m('hora'), m('hora') + 0.5))} tam={24} />
      </Toma>
    </Lienzo>
  );
};
