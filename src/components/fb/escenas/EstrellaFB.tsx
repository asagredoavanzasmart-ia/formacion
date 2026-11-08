import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Estrella, Calendario, Bateria, TelefonoFijo, Bombilla, Bandera, Paso, Curva, Cruz, Visto, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * El callado y la estrella. Toma 1: dos perfiles en los extremos del escenario: el callado en penumbra y la estrella
 * que brilla; con el callado, la pausa (tres puntos que respiran) y la pregunta abierta frente al sí/no tachado.
 * Toma 2: la consultora brillante: agenda llena y batería que baja; se ofende; la pregunta por su meta, la escalera a
 * «gerente», el teléfono de un cliente que suena sin respuesta y la idea que se enciende. Toma 3: cuatro tácticas y
 * la curva: a mejor desempeño, feedback más frecuente.
 */

const ID = 'fb12', P = 'fb-estrella';

export const EstrellaFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('perfiles'), 'Dos perfiles olvidados'], [m('callada'), 'La persona callada'], [m('pausas'), 'Pausas deliberadas'], [m('abiertas'), 'Preguntas abiertas'],
    [m('estrella'), 'La estrella'], [m('consultora'), 'Una consultora brillante'], [m('ofendio'), 'Se ofende'], [m('meta'), '¿Cuál es tu meta?'],
    [m('limite'), 'Siempre al límite'], [m('sentido'), 'El feedback cobra sentido'], [m('agradeciendo'), 'Cuatro tácticas'], [m('frecuente'), 'Mejor desempeño, más feedback'],
  ];
  const carga = sm(t, m('consultora'), m('consultora') + 3);
  const TACT = [['agradeciendo', 'Agradece con detalle'], ['costo', '¿A qué costo lo lograste?'], ['siguiente', 'Apunta al siguiente nivel'], ['apoyarlas', '¿Cómo te apoyo mejor?']] as const;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El callado y la estrella">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · la persona callada */}
      <TomaFB t={t} a={0} b={m('estrella')} cy={500}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        {vent(t, m('perfiles'), m('callada')) > 0.01 && (
          <g opacity={vent(t, m('perfiles'), m('callada'))}>
            <Persona id={ID} x={260} y={720} s={1} cuerpo={GRIS} ojos={0.6} />
            <Persona id={ID} x={940} y={720} s={1} cuerpo={NARANJA} />
            <Estrella x={940} y={480} r={34} fill="#fbbf24" rot={t * 20} />
            <Txt x={260} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>No habla</Txt>
            <Txt x={940} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>La estrella</Txt>
          </g>
        )}
        {t >= m('callada') && (
          <g opacity={e1(t, m('callada'))}>
            <Persona id={ID} x={300} y={720} s={1.05} cuerpo={VIOLETA} />
            <Persona id={ID} x={900} y={720} s={1.05} cuerpo={GRIS} ojos={0.7} />
            <Txt x={900} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Callada</Txt>
            {vent(t, m('pausas'), m('abiertas')) > 0.01 && (
              <g opacity={vent(t, m('pausas'), m('abiertas'))}>
                {[0, 1, 2].map((k) => <circle key={k} cx={560 + k * 50} cy={460} r={14} fill={c.tenue} opacity={0.3 + 0.7 * Math.max(0, Math.sin(t * 3 - k * 0.7))} />)}
                <Txt x={610} y={400} textAnchor="middle" fontSize={28} fill={c.texto}>Tiempo para ordenar ideas</Txt>
              </g>
            )}
            {t >= m('abiertas') && (
              <g opacity={e1(t, m('abiertas'))}>
                <Burbuja x={320} y={510} w={520} texto="¿Cómo preparaste la presentación al cliente?" u={sm(t, m('abiertas'), m('abiertas') + 2)} c={c} id={ID} tam={28} />
                <Letrero x={940} y={300} texto="¿Sí o no?" fondo={GRIS} id={ID} tam={28} op={0.8} />
                <Cruz x={1040} y={270} r={24} op={sm(t, m('abiertas') + 0.6, m('abiertas') + 1)} />
              </g>
            )}
          </g>
        )}
      </TomaFB>

      {/* 2 · la consultora */}
      <TomaFB t={t} a={m('estrella')} b={m('agradeciendo')} cy={500}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        <Persona id={ID} x={760} y={720} s={1.05} cuerpo={NARANJA} ojos={1 - 0.4 * carga * (1 - sm(t, m('sentido'), m('sentido') + 1))} />
        <Estrella x={760} y={480} r={30} fill="#fbbf24" rot={t * 20} op={e1(t, m('estrella'))} />
        <Txt x={760} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>{t >= m('consultora') ? 'La consultora' : 'La estrella'}</Txt>
        {vent(t, m('estrella'), m('consultora')) > 0.01 && <Txt x={420} y={420} textAnchor="middle" fontSize={30} fill={c.texto} opacity={vent(t, m('estrella'), m('consultora'))}>Nadie le da feedback</Txt>}
        {t >= m('consultora') && (
          <g opacity={vent(t, m('consultora'), m('meta'))}>
            <Calendario x={1000} y={360} s={1.1} marcados={Math.floor(14 * carga)} />
            <Bateria x={1000} y={640} v={1 - 0.8 * carga} alto={150} c={c} />
          </g>
        )}
        {t >= m('consultora') && (
          <g opacity={e1(t, m('consultora') + 0.4)}>
            <Persona id={ID} x={300} y={720} s={1.05} cuerpo={VIOLETA} />
            <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Su jefa</Txt>
          </g>
        )}
        {vent(t, m('ofendio'), m('meta')) > 0.01 && (
          <g opacity={vent(t, m('ofendio'), m('meta'))}>
            <Burbuja x={320} y={510} w={360} texto="Esfuérzate menos" u={sm(t, m('ofendio'), m('ofendio') + 0.8)} c={c} id={ID} tam={28} />
            <g transform="translate(760 720) scale(1.05)"><rect x={-46} y={-86} width={92} height={22} rx={11} fill={NARANJA} /><rect x={-46} y={-74} width={92} height={20} rx={10} fill="#ea7a1f" /></g>
          </g>
        )}
        {vent(t, m('meta'), m('limite')) > 0.01 && (
          <g opacity={vent(t, m('meta'), m('limite'))}>
            <Burbuja x={320} y={510} w={360} texto="¿Cuál es tu meta?" u={sm(t, m('meta'), m('meta') + 0.8)} c={c} id={ID} tam={28} marca />
            {t >= m('gerente') && (
              <g opacity={e1(t, m('gerente'))}>
                {[0, 1, 2, 3].map((k) => <rect key={k} x={900 + k * 50} y={680 - k * 90} width={50} height={12} rx={6} fill={GRIS} />)}
                <rect x={896} y={360} width={10} height={340} rx={5} fill={GRIS} /><rect x={1094} y={360} width={10} height={340} rx={5} fill={GRIS} />
                <Bandera x={1050} y={360} alto={120} color={VERDE} t={t} />
                <Txt x={1000} y={210} textAnchor="middle" fontSize={30} fill={VERDE}>Gerente</Txt>
              </g>
            )}
          </g>
        )}
        {t >= m('limite') && (
          <g opacity={e1(t, m('limite'))}>
            <TelefonoFijo x={1000} y={560} s={1.1} t={t} suena={1 - sm(t, m('sentido'), m('sentido') + 0.6)} />
            <Txt x={1000} y={660} textAnchor="middle" fontSize={26} fill={c.texto}>Un cliente urgente</Txt>
            <Calendario x={1000} y={360} s={1.1} marcados={14} op={1 - sm(t, m('sentido'), m('sentido') + 0.6)} />
            {t >= m('sentido') && <Bombilla x={1000} y={360} s={1.1} id={ID} t={t} luz={sm(t, m('sentido'), m('sentido') + 1)} op={e1(t, m('sentido'))} />}
          </g>
        )}
      </TomaFB>

      {/* 3 · tácticas con estrellas y frecuencia */}
      <TomaFB t={t} a={m('agradeciendo')} b={fin + 1} cy={470}>
        {vent(t, m('agradeciendo'), m('frecuente')) > 0.01 && (
          <g opacity={vent(t, m('agradeciendo'), m('frecuente'))}>
            {TACT.map(([n, txt], k) => <Paso key={n} x={160} y={220 + k * 130} w={880} texto={txt} color={[ROSA, ROJO_M, AZUL_M, VERDE][k]} c={c} op={e1(t, m(n))} hecho={sm(t, m(n) + 0.6, m(n) + 1.2)} tam={32} />)}
          </g>
        )}
        {t >= m('frecuente') && (
          <g opacity={e1(t, m('frecuente'))}>
            <path d="M 220 640 L 1000 640 M 220 640 L 220 200" stroke={c.apagado} strokeWidth={6} />
            <Curva pts={[[220, 620], [420, 560], [620, 460], [820, 340], [1000, 230]]} u={sm(t, m('frecuente'), m('frecuente') + 1.6)} color={NARANJA} grosor={10} />
            <Txt x={610} y={700} textAnchor="middle" fontSize={28} fill={c.texto}>Desempeño</Txt>
            <Txt x={250} y={190} fontSize={28} fill={c.texto}>Frecuencia del feedback</Txt>
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
