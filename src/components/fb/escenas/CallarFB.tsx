import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Caja, Reloj, Calendario, Hoja, Mesa, Visto, Cruz, Gente, Cifra, Suelo, e1, sm, vent, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * El costo de callar. Toma 1: la planta; una cinta lleva cajas, la estación de Bill se vuelve cuello de botella, las
 * cajas se apilan y cae la noche con Bill llenando registros. Toma 2: la jefa no espera la evaluación anual: reúne
 * datos, se sienta con Bill y pregunta; aparece el origen (dos planillas: solo cambió el formato), tachan lo que
 * sobra y la cinta vuelve a correr. Toma 3: lo que evitó esa conversación. Toma 4: los cuatro datos.
 * Toma 5: el calendario anual frente al semanal.
 */

const ID = 'fb01', P = 'fb-callar';

export const CallarFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('segura'), 'Callar parece seguro'], [m('bill'), 'Bill, el supervisor'], [m('cuello'), 'Un cuello de botella'], [m('noche'), 'Hasta tarde cada noche'],
    [m('anual'), '¿Esperar a la evaluación?'], [m('datos'), 'Reúne los datos'], [m('pregunta'), '¿Qué está pasando?'], [m('origen'), 'Aparece el origen'],
    [m('tachan'), 'Tachan lo que sobra'], [m('evito'), 'Una conversación a tiempo'], [m('injusta'), 'Lo que se posterga'], [m('semanal'), 'Cada semana, no cada año'],
  ];
  const apila = Math.min(9, Math.floor(Math.max(0, t - m('acumula') + 0.4) * 3));
  const noche = sm(t, m('noche'), m('noche') + 1.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El costo de callar">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · la planta y el cuello de botella */}
      <TomaFB t={t} a={0} b={m('anual')} cy={500}>
        <rect x={60} y={130} width={1080} height={560} rx={30} fill="#0f172a" opacity={0.75 * noche} />
        {noche > 0.01 && <g opacity={noche}><circle cx={1040} cy={210} r={40} fill="#fde68a" /><circle cx={1058} cy={198} r={36} fill="#0f172a" opacity={0.75} /></g>}
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        {/* cinta transportadora */}
        <rect x={80} y={600} width={600} height={26} rx={13} fill="#475569" />
        {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={100 + k * 80} cy={613} r={9} fill="#94a3b8" />)}
        {/* antes del cuello de botella las cajas recorren toda la cinta; después se frenan antes de la estación (relevo con fundido) */}
        {[0, 1].map((fase) => {
          const o = fase === 0 ? 1 - sm(t, m('cuello') - 0.3, m('cuello') + 0.3) : sm(t, m('cuello') - 0.3, m('cuello') + 0.3);
          return o > 0.01 ? Array.from({ length: 4 }, (_, k) => {
            const u = ((t * (fase === 0 ? 0.18 : 0.05) + k / 4) % 1);
            const x = fase === 0 ? lerp(110, 620, u) : lerp(110, 440, u);
            return <Caja key={`${fase}-${k}`} x={x} y={600} w={60} h={46} op={o * Math.min(1, u * 8, (1 - u) * 8)} />;
          }) : null;
        })}
        {Array.from({ length: apila }, (_, k) => <Caja key={`p${k}`} x={470 + (k % 3) * 64} y={600 - Math.floor(k / 3) * 48} w={60} h={46} color={k > 5 ? '#c2410c' : '#d6a36a'} />)}
        <rect x={680} y={470} width={110} height={156} rx={12} fill={GRIS} opacity={0.85} />
        <Persona id={ID} x={850} y={720} s={1} cuerpo={NARANJA} ojos={1 - 0.6 * noche} />
        {t >= m('bill') && <Letrero x={850} y={790} texto="Bill" fondo={NARANJA} id={ID} tam={30} op={e1(t, m('bill'))} />}
        {t >= m('cuello') && <Letrero x={560} y={380} texto="Cuello de botella" fondo={ROJO_M} id={ID} tam={30} op={e1(t, m('cuello'))} />}
        {t >= m('noche') && (
          <g opacity={noche}>
            <Reloj x={1000} y={420} r={54} t={t * 6} />
            {[0, 1, 2].map((k) => <Hoja key={k} x={930 + k * 10} y={560 - k * 8} w={60} h={78} rot={-8 + k * 6} />)}
          </g>
        )}
      </TomaFB>

      {/* 2 · la conversación */}
      <TomaFB t={t} a={m('anual')} b={m('evito')} cy={470}>
        {vent(t, m('anual'), m('datos') + 0.3) > 0.01 && (
          <g opacity={vent(t, m('anual'), m('datos') + 0.3)}>
            <Calendario x={600} y={400} s={1.8} />
            <Txt x={600} y={600} textAnchor="middle" fontSize={32} fill={c.texto}>Evaluación anual</Txt>
            <Cruz x={720} y={300} r={34} op={e1(t, m('anual') + 1.2)} />
          </g>
        )}
        {t >= m('datos') && (
          <g opacity={e1(t, m('datos'))}>
            <Suelo y={720} isDark={isDark} x0={160} x1={1040} />
            <Persona id={ID} x={360} y={700} s={1} cuerpo={VIOLETA} />
            <Persona id={ID} x={840} y={700} s={1} cuerpo={NARANJA} ojos={t >= m('origen') ? 1 : 0.6} />
            <Mesa x={600} y={640} w={300} c={c} />
            <Txt x={360} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Su jefa</Txt>
            <Txt x={840} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Bill</Txt>
          </g>
        )}
        {vent(t, m('datos'), m('pregunta')) > 0.01 && <g opacity={vent(t, m('datos'), m('pregunta'))}><Hoja x={560} y={560} w={70} h={90} /><Hoja x={640} y={566} w={70} h={90} rot={8} /></g>}
        {vent(t, m('pregunta'), m('origen')) > 0.01 && (
          <g opacity={vent(t, m('pregunta'), m('origen'))}>
            <Burbuja x={380} y={490} w={420} texto="¿Qué está pasando?" u={sm(t, m('pregunta'), m('pregunta') + 1)} c={c} id={ID} tam={32} />
          </g>
        )}
        {vent(t, m('origen'), m('formato') + 0.5) > 0.01 && (
          <g opacity={vent(t, m('origen'), m('formato') + 0.5)}>
            <Burbuja x={820} y={490} w={460} texto="El proceso nuevo pide más registros" u={sm(t, m('origen'), m('origen') + 1.4)} c={c} id={ID} tam={30} lado="der" />
          </g>
        )}
        {t >= m('formato') && (
          <g opacity={e1(t, m('formato') + 0.5)}>
            {[['Antes', 460], ['Ahora', 740]].map(([n, x], k) => (
              <g key={n as string}>
                <rect x={(x as number) - 90} y={170} width={180} height={230} rx={14} fill={c.panel} style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,.18))' }} />
                {Array.from({ length: 6 }, (_, j) => {
                  const sobra = k === 1 && j % 2 === 1;
                  const tacha = sobra ? sm(t, m('tachan') + j * 0.15, m('tachan') + 0.5 + j * 0.15) : 0;
                  return (
                    <g key={j}>
                      <rect x={(x as number) - 66} y={200 + j * 30} width={132} height={12} rx={6} fill={k === 1 && !sobra ? VERDE : c.apagado} opacity={1 - 0.5 * tacha} />
                      {tacha > 0.01 && <rect x={(x as number) - 72} y={204 + j * 30} width={144 * tacha} height={5} rx={2} fill={ROJO_M} />}
                    </g>
                  );
                })}
                <Txt x={x as number} y={440} textAnchor="middle" fontSize={30} fill={c.texto}>{n as string}</Txt>
              </g>
            ))}
            <Letrero x={600} y={130} texto="Solo cambió el formato" fondo={VERDE} id={ID} tam={30} op={vent(t, m('formato') + 0.3, m('ritmo') + 0.1)} />
          </g>
        )}
        {t >= m('ritmo') && <Letrero x={600} y={130} texto="Vuelve a su ritmo" fondo={NARANJA} id={ID} tam={30} op={e1(t, m('ritmo') + 0.1)} />}
      </TomaFB>

      {/* 3 · lo que evitó */}
      <TomaFB t={t} a={m('evito')} b={m('injusta')} cy={470}>
        {[['Plazo con|el cliente', 260, AZUL_M], ['Equipo|con ánimo', 600, VIOLETA], ['Un buen|supervisor', 940, NARANJA]].map(([txt, x, col], k) => {
          const o = e1(t, m('evito') + k * 0.8);
          return o > 0.01 ? (
            <g key={k} opacity={o}>
              {k === 0 && <Calendario x={x as number} y={420} s={1.2} marcados={3} />}
              {k === 1 && [-70, 0, 70].map((dx, j) => <Persona key={j} id={ID} x={(x as number) + dx} y={520} s={0.6} cuerpo={[VIOLETA, AZUL_M, ROSA][j]} />)}
              {k === 2 && <Persona id={ID} x={x as number} y={520} s={0.95} cuerpo={col as string} />}
              <Visto x={(x as number) + 80} y={300} r={30} />
              {(txt as string).split("|").map((l, j) => <Txt key={j} x={x as number} y={610 + j * 42} textAnchor="middle" fontSize={30} fill={c.texto}>{l}</Txt>)}
            </g>
          ) : null;
        })}
        <Letrero x={600} y={760} texto="Una conversación a tiempo" id={ID} tam={32} op={e1(t, m('evito') + 2.6)} />
      </TomaFB>

      {/* 4 · los datos */}
      <TomaFB t={t} a={m('injusta')} b={m('semanal')} cy={470}>
        {[
          ['injusta', 51, ' %', 've injusta|su evaluación', AZUL_M],
          ['cuatro', 1, ' de 4', 'la teme más|que nada', VIOLETA],
          ['coraje', 63, ' %', 'ejecutivos:|falta coraje', ROSA],
          ['formularios', 28, ' %', 'RR. HH.: más|que formularios', NARANJA],
        ].map(([n, v, suf, txt, col], k) => {
          const x = k % 2 ? 870 : 330, y = k < 2 ? 280 : 560;
          const o = e1(t, m(n as string));
          return o > 0.01 ? (
            <g key={k} opacity={o}>
              <rect x={x - 250} y={y - 110} width={500} height={220} rx={26} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.15))' }} />
              <Cifra x={x} y={y - 14} valor={v as number} u={sm(t, m(n as string), m(n as string) + 1)} suf={suf as string} tam={80} color={col as string} />
              {(txt as string).split("|").map((l, j) => <Txt key={j} x={x} y={y + 40 + j * 40} textAnchor="middle" fontSize={28} fill={c.texto}>{l}</Txt>)}
            </g>
          ) : null;
        })}
      </TomaFB>

      {/* 5 · cada semana */}
      <TomaFB t={t} a={m('semanal')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('semanal'))}>
          <g opacity={1 - 0.6 * sm(t, m('semanal') + 0.8, m('semanal') + 1.6)}>
            <Calendario x={330} y={420} s={1.5} marcados={1} />
            <Txt x={330} y={600} textAnchor="middle" fontSize={30} fill={c.texto}>Una vez al año</Txt>
            <Cruz x={430} y={320} r={28} op={sm(t, m('semanal') + 0.8, m('semanal') + 1.4)} />
          </g>
          <Calendario x={870} y={420} s={1.5} marcados={Math.min(14, Math.floor(Math.max(0, t - m('semanal') - 1) * 6))} />
          <Txt x={870} y={600} textAnchor="middle" fontSize={30} fill={c.texto}>Cada semana</Txt>
          <Letrero x={600} y={720} texto="Parte del trabajo de cada semana" id={ID} tam={32} op={e1(t, m('semanal') + 1)} />
        </g>
      </TomaFB>
    </Lienzo>
  );
};
