import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Reloj, Duna, Bidon, Brujula, Cruz, Pin, Cifra, Barra, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, GRIS, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Fracasar rápido y cruzar el desierto.
 * 1 · Ben Horowitz «duerme como un bebé»: el reloj gira y cada dos horas despierta y llora. Luego dos líneas de tiempo:
 *     quien teme fallar no ensaya; quien falla pronto hace muchos intentos en el mismo tiempo.
 * 2 · El desierto de la no tracción: dunas, una persona camina; tres fracasos; dos reglas: no girar (la brújula) y no
 *     quedarse sin combustible (el bidón que baja).
 * 3 · Waze en el mundo: abandono de más del 90 %, versiones cada dos o tres semanas y Los Ángeles que se enciende.
 */

const ID = 'ep06', P = 'ep-desierto';

export const DesiertoEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [0.2, 'Una travesía de fracasos'], [m('horowitz'), 'Dormir como un bebé'], [m('temes'), 'Fracasar pronto'], [m('desierto'), 'El desierto de la no tracción'],
    [m('direccion'), 'No girar'], [m('combustible'), 'No quedarse sin combustible'], [m('waze'), 'Waze en el mundo'],
  ];
  const despierta = t >= m('bebe') && Math.sin((t - m('bebe')) * 2.4) > 0.55;

  /* intentos: lento (pocos) frente a rápido (muchos) */
  const nRapido = Math.floor(10 * sm(t, m('pronto'), m('pronto') + 3));
  const nLento = Math.floor(3 * sm(t, m('pronto'), m('pronto') + 3));

  const FALLOS = [{ k: 'construyes', t: 'No funciona' }, { k: 'noLlegan', t: 'No llegan usuarios' }, { k: 'noQuedan', t: 'No se quedan' }];
  const caminata = (t - m('desierto')) * 26;
  const nivel = 1 - 0.85 * sm(t, m('combustible'), m('combustible') + 3);

  const versiones = t >= m('version') ? Math.min(30, Math.floor((t - m('version')) * 3)) : 0;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Fracasar rápido y cruzar el desierto">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el bebé y los intentos */}
      <Toma t={t} a={0} b={m('desierto')} cy={460}>
        {t < m('temes') ? <g>
          <circle cx={860} cy={240} r={70} fill="#fde68a" opacity={0.8} /><circle cx={890} cy={225} r={62} fill={c.panel} />
          <rect x={250} y={520} width={520} height={60} rx={20} fill="#64748b" /><rect x={250} y={470} width={140} height={60} rx={20} fill="#e2e8f0" />
          <Persona id={ID} x={460} y={540} s={0.9} cuerpo={AZUL_M} ojos={despierta ? 1 : 0} />
          {despierta && [0, 1].map((k) => <circle key={k} cx={444 + 32 * k} cy={430 + 30 * ((t * 2 + k * 0.5) % 1)} r={6} fill="#7dd3fc" />)}
          <Reloj x={900} y={480} r={80} t={t} vel={2} />
          {t >= m('horowitz') && <Letrero x={510} y={660} texto="Ben Horowitz" fondo={AZUL_M} id={ID} op={e1(t, m('horowitz'))} />}
          {t >= m('bebe') && <Letrero x={900} y={620} texto="Cada dos horas" fondo={GRIS} id={ID} op={e1(t, m('bebe'))} tam={26} />}
          {t >= m('nadie') && <Letrero x={600} y={760} texto="Algo que nadie hizo antes" id={ID} op={e1(t, m('nadie'))} />}
        </g> : <g opacity={e1(t, m('temes'))}>
          {[{ y: 340, n: nLento, color: GRIS, txt: 'Con miedo a fallar' }, { y: 580, n: nRapido, color: NARANJA, txt: 'Fallar pronto' }].map((f) => (
            <g key={f.y}>
              <rect x={160} y={f.y} width={880} height={14} rx={7} fill={c.apagado} />
              {Array.from({ length: f.n }, (_, k) => <circle key={k} cx={200 + k * (f.color === GRIS ? 300 : 88)} cy={f.y + 7} r={22} fill={f.color} />)}
              <Txt f="a" x={160} y={f.y - 40} fontSize={30} fill={c.texto}>{f.txt}</Txt>
            </g>
          ))}
          {t >= m('pronto') + 3 && <Letrero x={600} y={760} texto="Más intentos en el mismo tiempo" id={ID} op={e1(t, m('pronto') + 3)} />}
        </g>}
      </Toma>

      {/* 2 · el desierto */}
      <Toma t={t} a={m('desierto')} b={m('waze')} cy={480}>
        <circle cx={1000} cy={200} r={60} fill="#fbbf24" />
        {[0, 1, 2, 3].map((k) => { const x0 = ((k * 380 - caminata) % 1520 + 1520) % 1520 - 260; return <Duna key={k} x0={x0} x1={x0 + 520} y={720} h={60 + 20 * (k % 2)} color={k % 2 ? '#f6c56d' : '#eab35a'} />; })}
        <rect x={0} y={718} width={1200} height={150} fill="#eab35a" />
        <Persona id={ID} x={300} y={716 - 4 * Math.abs(Math.sin(t * 4))} s={0.7} cuerpo={NARANJA} />
        {FALLOS.map((f, k) => t >= m(f.k) && t < m('direccion') && (
          <g key={f.k} opacity={e1(t, m(f.k))}><Cruz x={560 + k * 200} y={300} r={30} /><Letrero x={560 + k * 200} y={370} texto={f.t} fondo={GRIS} id={ID} tam={24} /></g>
        ))}
        {t >= m('direccion') && <g opacity={e1(t, m('direccion'))}>
          <Brujula x={620} y={360} r={90} ang={20 * Math.sin(t * 3)} id={ID} />
          <Letrero x={620} y={500} texto="No cambiar de dirección" id={ID} />
        </g>}
        {t >= m('combustible') && <g opacity={e1(t, m('combustible'))}>
          <Bidon x={920} y={560} s={1.1} nivel={nivel} />
          <Letrero x={920} y={620} texto="Financiamiento" fondo={ROSA} id={ID} tam={26} />
        </g>}
      </Toma>

      {/* 3 · Waze en el mundo */}
      <Toma t={t} a={m('waze')} b={fin + 1} cy={460}>
        <circle cx={330} cy={430} r={190} fill={isDark ? '#1e3a5f' : '#bfdbfe'} opacity={e1(t, m('waze'))} />
        <path d="M 230 330 q 50 -40 100 0 q 30 30 80 10 q 10 60 -50 80 q -60 10 -70 60 q -50 -40 -60 -150 Z" fill={VERDE} opacity={0.7 * e1(t, m('waze'))} />
        <path d="M 360 520 q 40 -20 80 10 q -10 50 -60 60 q -30 -30 -20 -70 Z" fill={VERDE} opacity={0.7 * e1(t, m('waze'))} />
        {t >= m('angeles') && <g opacity={e1(t, m('angeles'))}><Pin x={250} y={420} s={1.2} color={NARANJA} /><circle cx={250} cy={372} r={40 + 10 * Math.sin(t * 5)} fill={NARANJA} opacity={0.2} /><Letrero x={330} y={680} texto="Los Ángeles" fondo={NARANJA} id={ID} /></g>}
        {t >= m('noventa') && <Barra x={760} y={640} w={150} hMax={360} valor={90} u={sm(t, m('noventa'), m('noventa') + 1.4)} color={ROSA} rotulo="La abandonaban" c={c} />}
        {t >= m('version') && <g opacity={e1(t, m('version'))}>
          <Txt x={1000} y={260} textAnchor="middle" fontSize={30} fill={c.tenue}>Versiones</Txt>
          {Array.from({ length: Math.min(8, versiones) }, (_, j) => <rect key={j} x={950 - j * 4} y={380 - j * 14} width={100} height={60} rx={10} fill={j % 2 ? ROSA : NARANJA} opacity={0.9} />)}
          {!movil && <Txt f="a" x={1000} y={490} textAnchor="middle" fontSize={22} fill={c.tenue}>cada 2 o 3 semanas</Txt>}
        </g>}
        {t >= m('desastre') && t < m('noventa') && <Letrero x={760} y={420} texto="Un desastre" fondo={GRIS} id={ID} op={e1(t, m('desastre'))} />}
      </Toma>
    </Lienzo>
  );
};
