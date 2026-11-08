import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Ondas, Mesa, Reloj, Hoja, Cruz, Visto, Embudo, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Abrir el encuadre. Toma 1: el director entra con una etiqueta ya puesta sobre Jeremy («controlador»); tres vueltas de
 * la misma discusión (burbujas que se relevan), las ondas rojas crecen y la mesa se agrieta. Toma 2: el marco del
 * director: estrecho (una rendija con una sola explicación), binario (gano / pierdo) y congelado (se escarcha).
 * Toma 3: los dos sesgos: carácter en vez de situación, y creer que el otro ve lo mismo. Toma 4: el marco se abre y
 * aparecen tres explicaciones; la pregunta abierta sobre Frank y Joan; el embudo de las preguntas diseñadas se tacha;
 * la táctica: tres explicaciones escritas.
 */

const ID = 'fb06', P = 'fb-encuadre';

export const EncuadreFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('forma'), 'Cómo piensas el problema'], [m('jeremy'), 'Jeremy no delega'], [m('delegue'), 'Primera vuelta'], [m('estrategia'), 'Segunda vuelta'],
    [m('tercera'), 'Tercera vuelta'], [m('nadie'), 'Nadie aprendió nada'], [m('estrecho'), 'Estrecho'], [m('binario'), 'Binario'], [m('congelado'), 'Congelado'],
    [m('sesgos'), 'Dos sesgos'], [m('quizas'), 'Otras explicaciones'], [m('abrir'), 'Abrir el encuadre'], [m('disenadas'), 'Sin preguntas trampa'], [m('tres'), 'Tres explicaciones'],
  ];
  const tension = sm(t, m('delegue'), m('nadie'));
  const grieta = sm(t, m('nadie'), m('nadie') + 1);
  const VUELTAS: [string, string, string, string][] = [
    ['delegue', 'estrategia', 'Delega más', 'Delego cuando corresponde'],
    ['estrategia', 'tercera', 'No piensas en estrategia', 'Siempre pienso en el futuro'],
    ['tercera', 'nadie', 'No sé de qué eres capaz', ''],
  ];
  const apertura = sm(t, m('quizas'), m('quizas') + 1.2);
  const hielo = sm(t, m('congelado'), m('congelado') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Abrir el encuadre">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · tres vueltas */}
      <TomaFB t={t} a={0} b={m('estrecho')} cy={500}>
        <Suelo y={720} isDark={isDark} x0={100} x1={1100} />
        <Persona id={ID} x={300} y={720} s={1.05} cuerpo={VIOLETA} corbata ojos={1 - 0.3 * tension} />
        <Persona id={ID} x={900} y={720} s={1.05} cuerpo={AZUL_M} ojos={1 - 0.4 * tension} />
        <Mesa x={600} y={660} w={260} c={c} />
        {grieta > 0.01 && <path d={`M 600 620 l -14 ${22 * grieta} l 18 ${18 * grieta} l -10 ${24 * grieta}`} stroke={ROJO_M} strokeWidth={5} fill="none" />}
        <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Director</Txt>
        {t >= m('jeremy') && <Txt x={900} y={790} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('jeremy'))}>Jeremy</Txt>}
        {vent(t, m('controlador'), m('delegue')) > 0.01 && <Letrero x={900} y={480} texto="Controlador" fondo={GRIS} id={ID} tam={30} op={vent(t, m('controlador'), m('delegue'))} />}
        {VUELTAS.map(([a, b, dir, jer], k) => {
          const o = vent(t, m(a), m(b));
          return o > 0.01 ? (
            <g key={k} opacity={o}>
              <g opacity={jer ? 1 - sm(t, m(a) + 1.4, m(a) + 1.8) : 1}><Burbuja x={320} y={500} w={420} texto={dir} u={sm(t, m(a), m(a) + 1)} c={c} id={ID} tam={28} /></g>
              {jer && <g opacity={sm(t, m(a) + 1.8, m(a) + 2.2)}><Burbuja x={880} y={500} w={420} texto={jer} u={sm(t, m(a) + 1.8, m(a) + 2.8)} c={c} id={ID} tam={28} lado="der" /></g>}
            </g>
          ) : null;
        })}
        {tension > 0.2 && <Ondas x1={380} y1={590} x2={820} y2={590} t={t} color={ROJO_M} op={tension} n={3 + Math.round(tension * 2)} />}
        {t >= m('nadie') && <Letrero x={600} y={300} texto="Relación dañada" fondo={ROJO_M} id={ID} tam={30} op={e1(t, m('nadie'))} />}
      </TomaFB>

      {/* 2 · estrecho, binario y congelado */}
      <TomaFB t={t} a={m('estrecho')} b={m('sesgos')} cy={460}>
        {[['estrecho', 'Una sola explicación', 230], ['binario', 'Gano o pierdo', 600], ['congelado', 'No cambia', 970]].map(([n, txt, x], k) => {
          const o = e1(t, m(n as string));
          return o > 0.01 ? (
            <g key={k} opacity={o}>
              <rect x={(x as number) - 150} y={200} width={300} height={300} rx={20} fill="#a16b3f" />
              <rect x={(x as number) - 128} y={222} width={256} height={256} rx={10} fill={k === 2 ? lerp(0, 1, hielo) > 0.5 ? '#dbeafe' : c.panel2 : c.panel2} />
              {k === 0 && <><rect x={(x as number) - 128} y={222} width={256} height={256} fill="#1f2937" opacity={0.85} /><rect x={(x as number) - 18} y={222} width={36} height={256} fill={c.panel2} /><circle cx={x as number} cy={350} r={14} fill={NARANJA} /></>}
              {k === 1 && <><circle cx={(x as number) - 60} cy={350} r={46} fill={VERDE} /><circle cx={(x as number) + 60} cy={350} r={46} fill={ROJO_M} /><Txt x={x as number} y={364} textAnchor="middle" fontSize={34} fill={c.texto}>/</Txt></>}
              {k === 2 && <g opacity={hielo}>{Array.from({ length: 6 }, (_, j) => <path key={j} d={`M ${(x as number) - 100 + j * 40} 240 l 10 30 l -10 30`} stroke="#93c5fd" strokeWidth={4} fill="none" />)}<rect x={(x as number) - 128} y={222} width={256} height={256} rx={10} fill="#bfdbfe" opacity={0.45} /></g>}
              <Txt x={x as number} y={570} textAnchor="middle" fontSize={32} fill={c.texto}>{txt as string}</Txt>
            </g>
          ) : null;
        })}
      </TomaFB>

      {/* 3 · los dos sesgos */}
      <TomaFB t={t} a={m('sesgos')} b={m('quizas')} cy={470}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        {vent(t, m('sesgos'), m('caracter')) > 0.01 && <Txt x={600} y={420} textAnchor="middle" fontSize={34} fill={c.texto} opacity={vent(t, m('sesgos'), m('caracter'))}>Detrás hay dos sesgos</Txt>}
        <g opacity={e1(t, m('caracter'))}>
          <Persona id={ID} x={170} y={720} s={0.95} cuerpo={VIOLETA} />
          <Reloj x={170} y={420} r={44} t={t * 6} />
          <Persona id={ID} x={420} y={720} s={0.95} cuerpo={AZUL_M} />
          <rect x={330} y={460} width={180} height={66} rx={14} fill={c.panel} opacity={0.4} />
          <Txt x={420} y={504} textAnchor="middle" fontSize={28} fill={c.tenue} opacity={0.6}>Situación</Txt>
          <Letrero x={420} y={400} texto="Carácter" fondo={ROJO_M} id={ID} tam={30} />
          <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Culpar al carácter</Txt>
        </g>
        {t >= m('creemos') && (
          <g opacity={e1(t, m('creemos'))}>
            <Persona id={ID} x={760} y={720} s={0.95} cuerpo={VIOLETA} />
            <Persona id={ID} x={1020} y={720} s={0.95} cuerpo={AZUL_M} />
            <circle cx={760} cy={430} r={50} fill={NARANJA} opacity={0.85} />
            <rect x={975} y={385} width={90} height={90} rx={12} fill={AZUL_M} opacity={0.85} />
            <Txt x={890} y={450} textAnchor="middle" fontSize={40} fill={c.texto}>≠</Txt>
            <Txt x={890} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Creer que ve lo mismo</Txt>
          </g>
        )}
      </TomaFB>

      {/* 4 · abrir el encuadre */}
      <TomaFB t={t} a={m('quizas')} b={fin + 1} cy={470}>
        {vent(t, m('quizas'), m('disenadas')) > 0.01 && (
          <g opacity={vent(t, m('quizas'), m('disenadas'))}>
            <g opacity={movil ? 1 - sm(t, m('abrir') - 0.4, m('abrir')) : 1}><rect x={600 - lerp(150, 480, apertura)} y={140} width={2 * lerp(150, 480, apertura)} height={280} rx={20} fill="#a16b3f" />
            <rect x={600 - lerp(128, 458, apertura)} y={162} width={2 * lerp(128, 458, apertura)} height={236} rx={10} fill={c.panel2} />
            {['No sabe cómo', 'Equipo no listo', 'No puede fallar'].map((txt, k) => (
              <g key={k} opacity={sm(t, m('quizas') + 0.8 + k * 0.7, m('quizas') + 1.3 + k * 0.7)}>
                <circle cx={300 + k * 300} cy={250} r={16} fill={[NARANJA, AZUL_M, VIOLETA][k]} />
                <Txt x={300 + k * 300} y={330} textAnchor="middle" fontSize={30} fill={c.texto}>{txt}</Txt>
              </g>
            ))}</g>
            {t >= m('abrir') && (
              <g opacity={e1(t, m('abrir'))}>
                <Persona id={ID} x={180} y={780} s={0.85} cuerpo={VIOLETA} />
                <g opacity={sm(t, m('frank') - 0.4, m('frank'))}><Burbuja x={200} y={620} w={700} texto="Escuché que Frank y Joan quieren más responsabilidad, ¿qué piensas?" u={sm(t, m('frank'), m('frank') + 2.4)} c={c} id={ID} tam={28} /></g>
              </g>
            )}
          </g>
        )}
        {t >= m('disenadas') && (
          <g opacity={vent(t, m('disenadas'), m('tres'))}>
            <path d="M 420 260 L 780 260 L 640 460 L 640 560 L 560 560 L 560 460 Z" fill={GRIS} opacity={0.8} />
            <Txt x={600} y={330} textAnchor="middle" fontSize={30} fill="#fff">Mi respuesta</Txt>
            <Cruz x={780} y={480} r={40} op={sm(t, m('disenadas') + 1, m('disenadas') + 1.5)} />
            <Txt x={600} y={640} textAnchor="middle" fontSize={30} fill={c.texto}>Preguntas que llevan a tu respuesta</Txt>
          </g>
        )}
        {t >= m('tres') && (
          <g opacity={e1(t, m('tres'))}>
            {[0, 1, 2].map((k) => (
              <g key={k} opacity={e1(t, m('tres') + 0.4 + k * 0.6)}>
                <Hoja x={340 + k * 260} y={400} w={180} h={230} rot={(k - 1) * 4} />
                <Txt x={340 + k * 260} y={330} textAnchor="middle" fontSize={60} fill={[NARANJA, AZUL_M, VIOLETA][k]}>{k + 1}</Txt>
              </g>
            ))}
            <Letrero x={600} y={640} texto="Escríbelas antes de hablar" id={ID} tam={30} />
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
