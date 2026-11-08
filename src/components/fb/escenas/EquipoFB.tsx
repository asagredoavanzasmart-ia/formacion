import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Bandera, Reloj, Calendario, Hoja, Lupa, Bombilla, TelefonoFijo, Paso, Cruz, Visto, Suelo, Flujo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * El equipo que se da feedback. Toma 1: el feedback deja de bajar solo desde el jefe y circula entre todos; al inicio
 * del proyecto, la bandera y los acuerdos; el aviso con 24 horas; revisiones agendadas; la escala del uno al cinco.
 * Toma 2: rondas: cinco personas en círculo y, por turno, un flujo a cada compañero con «una cosa que valoro» y «una
 * que haría distinto»; cuando varios coinciden, el mensaje llega más fuerte. Toma 3: la aseguradora: la directora con
 * transcripciones y correos, tres preguntas, sin lupa de culpables y con ideas que se encienden. Toma 4: la consultora
 * cambia el calendario anual por cuatro preguntas al final de cada proyecto; dos normas más.
 */

const ID = 'fb20', P = 'fb-equipo';

export const EquipoFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('compartida'), 'Responsabilidad compartida'], [m('inicio'), 'Acuerdos al inicio'], [m('horas'), 'Avisar con 24 horas'], [m('revisiones'), 'Revisiones agendadas'],
    [m('cinco'), 'Del uno al cinco'], [m('rondas'), 'Rondas estructuradas'], [m('coinciden'), 'Cuando varios coinciden'], [m('aseguradora'), 'Una aseguradora'],
    [m('culpables'), 'Sin buscar culpables'], [m('consultora'), 'Una gran consultora'], [m('normas'), 'Dos normas más'],
  ];
  const ronda = Array.from({ length: 5 }, (_, k) => { const a = -Math.PI / 2 + (k * 2 * Math.PI) / 5; return [600 + 300 * Math.cos(a), 470 + 210 * Math.sin(a)] as [number, number]; });
  const COLS = [NARANJA, AZUL_M, VIOLETA, ROSA, VERDE];
  const turno = Math.floor(Math.max(0, t - m('rondas') - 0.5) / 1.6) % 5;
  const coinc = sm(t, m('coinciden'), m('coinciden') + 1);
  const PREG = ['¿Qué funcionó?', '¿Dónde hubo vacíos?', '¿Qué haríamos distinto?'];
  const CUATRO = ['¿Le daría el mayor aumento?', '¿Siempre en mi equipo?', '¿Riesgo de bajo desempeño?', '¿Lista para un ascenso?'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El equipo que se da feedback">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · acuerdos */}
      <TomaFB t={t} a={0} b={m('rondas')} cy={480}>
        {vent(t, -1, m('inicio')) > 0.01 && (
          <g opacity={vent(t, -1, m('inicio'))}>
            <Suelo y={720} isDark={isDark} x0={100} x1={1100} />
            {[250, 425, 600, 775, 950].map((x, k) => <Persona key={k} id={ID} x={x} y={720} s={0.95} cuerpo={COLS[k]} corbata={k === 2} />)}
            {[0, 1, 2, 3].map((k) => <Flujo key={k} x1={250 + k * 175} y1={560} x2={425 + k * 175} y2={560} t={t + k * 0.3} n={3} arco={50} color={COLS[k]} op={sm(t, m('compartida') + 0.4, m('compartida') + 1)} />)}
            <Txt x={600} y={340} textAnchor="middle" fontSize={32} fill={c.texto} opacity={e1(t, m('compartida'))}>No solo tarea del jefe</Txt>
          </g>
        )}
        {t >= m('inicio') && (
          <g opacity={e1(t, m('inicio'))}>
            <Bandera x={200} y={620} alto={260} color={VERDE} t={t} />
            <Txt x={200} y={670} textAnchor="middle" fontSize={28} fill={c.texto}>Inicio</Txt>
            <Hoja x={400} y={480} w={150} h={190} lineas={6} />
            <Txt x={400} y={620} textAnchor="middle" fontSize={28} fill={c.texto}>Acuerdos</Txt>
            {t >= m('horas') && <g opacity={e1(t, m('horas'))}><Reloj x={640} y={470} r={80} t={t * 2} aro={ROJO_M} /><Txt x={640} y={620} textAnchor="middle" fontSize={30} fill={c.texto}>Aviso 24 h</Txt></g>}
            {t >= m('revisiones') && <g opacity={e1(t, m('revisiones'))}><Calendario x={900} y={470} s={1.1} marcados={Math.min(14, Math.floor(Math.max(0, t - m('revisiones')) * 3))} /><Txt x={900} y={620} textAnchor="middle" fontSize={28} fill={c.texto}>Revisiones</Txt></g>}
            {t >= m('cinco') && (
              <g opacity={e1(t, m('cinco'))}>
                {[1, 2, 3, 4, 5].map((v, k) => <g key={v}><circle cx={400 + k * 100} cy={730} r={32} fill={v === 4 && t > m('cinco') + 1 ? NARANJA : c.panel} style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,.15))' }} /><Txt x={400 + k * 100} y={742} textAnchor="middle" fontSize={30} fill={v === 4 && t > m('cinco') + 1 ? '#fff' : c.texto}>{v}</Txt></g>)}
              </g>
            )}
          </g>
        )}
      </TomaFB>

      {/* 2 · rondas */}
      <TomaFB t={t} a={m('rondas')} b={m('aseguradora')} cy={470}>
        {ronda.map(([x, y], k) => <Persona key={k} id={ID} x={x} y={y + 90} s={0.75} cuerpo={COLS[k]} />)}
        {t < m('coinciden') && ronda.map(([x, y], k) => {
          if (k === turno) return null;
          const [x0, y0] = ronda[turno];
          return <Flujo key={k} x1={x0} y1={y0} x2={x} y2={y} t={t} n={2} arco={20} color={[VERDE, NARANJA]} r={8} op={1 - sm(t, m('coinciden') - 0.45, m('coinciden'))} />;
        })}
        {t < m('coinciden') && (
          <g opacity={e1(t, m('rondas') + 1) * (1 - sm(t, m('coinciden') - 0.45, m('coinciden')))}>
            <Letrero x={330} y={810} texto="+ Lo que valoro" fondo={VERDE} id={ID} tam={26} />
            <Letrero x={870} y={810} texto="↻ Lo que cambiaría" fondo={NARANJA} id={ID} tam={26} />
          </g>
        )}
        {t >= m('coinciden') && (
          <g opacity={e1(t, m('coinciden'))}>
            {[1, 2, 3, 4].map((k) => <Flujo key={k} x1={ronda[k][0]} y1={ronda[k][1]} x2={ronda[0][0]} y2={ronda[0][1] + 20} t={t + k * 0.2} n={3} arco={10} color={COLS[k]} r={9} />)}
            <circle cx={ronda[0][0]} cy={ronda[0][1] + 20} r={60 + 40 * coinc + 8 * Math.sin(t * 5)} fill={NARANJA} opacity={0.18} />
            <Letrero x={600} y={810} texto="Más fuerza que un jefe solo" id={ID} tam={28} />
          </g>
        )}
      </TomaFB>

      {/* 3 · la aseguradora */}
      <TomaFB t={t} a={m('aseguradora')} b={m('consultora')} cy={470}>
        <Suelo y={720} isDark={isDark} x0={100} x1={1100} />
        <Persona id={ID} x={200} y={720} s={1.05} cuerpo={VIOLETA} corbata />
        <Txt x={200} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Directora</Txt>
        <rect x={330} y={600} width={500} height={20} rx={8} fill="#a16b3f" /><rect x={350} y={620} width={16} height={100} fill="#8b5a2b" /><rect x={794} y={620} width={16} height={100} fill="#8b5a2b" />
        {t >= m('transcripciones') && (
          <g opacity={e1(t, m('transcripciones'))}>
            {[0, 1, 2].map((k) => <Hoja key={k} x={400 + k * 70} y={560} w={60} h={78} rot={(k - 1) * 8} />)}
            <TelefonoFijo x={680} y={590} s={0.6} />
            <rect x={740} y={550} width={70} height={46} rx={6} fill={c.panel} /><path d="M 740 550 L 775 578 L 810 550" stroke={AZUL_M} strokeWidth={4} fill="none" />
          </g>
        )}
        {PREG.map((q, k) => <Letrero key={k} x={760} y={220 + k * 80} texto={q} fondo={[VERDE, NARANJA, AZUL_M][k]} id={ID} tam={28} op={e1(t, m('transcripciones') + 1.2 + k * 0.7)} />)}
        {t >= m('culpables') && (
          <g opacity={e1(t, m('culpables'))}>
            <g opacity={1 - 0.4 * sm(t, m('culpables') + 1, m('culpables') + 1.5)}><Lupa x={1000} y={520} r={50} c={c} id={ID} clip={`${ID}-lupa`} /></g>
            <Cruz x={1000} y={520} r={30} op={sm(t, m('culpables') + 0.6, m('culpables') + 1.1)} />
            {[0, 1, 2].map((k) => <Bombilla key={k} x={420 + k * 160} y={480} s={0.6} id={`${ID}-b${k}`} t={t} luz={sm(t, m('culpables') + 1.4 + k * 0.4, m('culpables') + 2 + k * 0.4)} op={sm(t, m('culpables') + 1.4 + k * 0.4, m('culpables') + 1.8 + k * 0.4)} />)}
          </g>
        )}
      </TomaFB>

      {/* 4 · la consultora y las normas */}
      <TomaFB t={t} a={m('consultora')} b={fin + 1} cy={470}>
        {vent(t, m('consultora'), m('normas')) > 0.01 && (
          <g opacity={vent(t, m('consultora'), m('normas'))}>
            <g opacity={1 - 0.6 * sm(t, m('consultora') + 1.4, m('consultora') + 2)}>
              <Calendario x={180} y={320} s={1.1} />
              <Cruz x={260} y={250} r={26} op={sm(t, m('consultora') + 1.2, m('consultora') + 1.7)} />
              <Txt x={180} y={450} textAnchor="middle" fontSize={26} fill={c.texto}>Evaluación</Txt>
              <Txt x={180} y={490} textAnchor="middle" fontSize={26} fill={c.texto}>anual</Txt>
            </g>
            {CUATRO.map((q, k) => <Paso key={k} x={340} y={220 + k * 120} w={780} texto={q} color={[VERDE, AZUL_M, ROJO_M, VIOLETA][k]} c={c} op={e1(t, (k === 3 ? m('ascenso') : m('preguntas') + 0.6 + k * 1.2))} tam={30} />)}
            <Txt x={730} y={720} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={e1(t, m('preguntas'))}>Al final de cada proyecto</Txt>
          </g>
        )}
        {t >= m('normas') && (
          <g opacity={e1(t, m('normas'))}>
            <Paso x={160} y={330} w={880} texto="Destacar lo que sí se hace bien" color={VERDE} c={c} hecho={sm(t, m('normas') + 1, m('normas') + 1.6)} tam={32} />
            <Paso x={160} y={480} w={880} texto="Está bien decir «ahora no»" color={AZUL_M} c={c} op={e1(t, m('ahorano'))} hecho={sm(t, m('ahorano') + 0.6, m('ahorano') + 1.2)} tam={32} />
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
