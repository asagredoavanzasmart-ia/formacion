import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Cifra, Calendario, Portatil, Hoja, Visto, Cruz, Suelo, Paso, Flujo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Conversar y actuar. Toma 1: un arco de tres piedras (abrir, desarrollo, cerrar) que se encienden en su turno.
 * Toma 2: una línea de quince minutos con los tres primeros en rojo y el 96 %; un volante que corrige el rumbo con la
 * frase para reencauzar. Toma 3: límites: lo que cambio (visto) y lo que no (cruz), con su porqué. Toma 4: una sola
 * cosa como experimento de dos semanas (calendario que se marca) y la curva en J del vendedor que pasó al sistema de
 * gestión de clientes. Toma 5: enseñar cómo te sirve el feedback e invitar a otros a sostener el cambio.
 */

const ID = 'fb19', P = 'fb-conversar';

export const ConversarFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('conducir'), 'Conducir, no aguantar'], [m('arco'), 'Un arco de tres partes'], [m('abrir'), 'Al abrir, alinéate'], [m('comienzos'), 'Los comienzos pesan'],
    [m('reencauzar'), 'Reencauzar de inmediato'], [m('desarrollo'), 'Escuchar, explicar, proponer'], [m('cerrar'), 'Al cerrar, comprométete'],
    [m('limites'), 'Puedes poner límites'], [m('unacosa'), 'Una sola cosa'], [m('experimento'), 'Un experimento pequeño'], [m('curva'), 'La curva en J'],
    [m('ensena'), 'Enseña cómo te sirve'], [m('invita'), 'En compañía cuesta menos'],
  ];
  const jU = sm(t, m('curva'), m('rapido') + 1);
  const jx = (i: number) => 200 + i * 8;
  const jy = (i: number) => { const u = i / 100; return 520 - 160 * u + 220 * Math.sin(Math.PI * Math.min(1, u * 1.6)) * (u < 0.62 ? 1 : 0); };

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Conversar y actuar">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · el arco */}
      <TomaFB t={t} a={0} b={m('comienzos')} cy={470}>
        <ArcoTres t={t} m={m} c={c} />
        {t < m('arco') && <Txt x={600} y={700} textAnchor="middle" fontSize={32} fill={c.texto} opacity={vent(t, m('conducir'), m('arco'))}>Recibir también es conducir</Txt>}
      </TomaFB>

      {/* 2 · los comienzos pesan */}
      <TomaFB t={t} a={m('comienzos')} b={m('desarrollo')} cy={470}>
        {vent(t, m('comienzos'), m('reencauzar')) > 0.01 && (
          <g opacity={vent(t, m('comienzos'), m('reencauzar'))}>
            <rect x={150} y={360} width={900} height={40} rx={20} fill={c.apagado} />
            <rect x={150} y={360} width={180 * sm(t, m('comienzos') + 0.4, m('comienzos') + 1.2)} height={40} rx={20} fill={ROJO_M} />
            {[0, 3, 15].map((v) => <Txt key={v} x={150 + v * 60} y={450} textAnchor="middle" fontSize={26} fill={c.texto}>{v} min</Txt>)}
            <Txt x={240} y={330} textAnchor="middle" fontSize={28} fill={ROJO_M}>Duros</Txt>
            {t >= m('noventa') && (
              <g opacity={e1(t, m('noventa'))}>
                <Cifra x={600} y={620} valor={96} u={sm(t, m('noventa'), m('noventa') + 1.2)} suf=" %" tam={110} color={ROJO_M} />
                <Txt x={600} y={680} textAnchor="middle" fontSize={28} fill={c.texto}>terminaba mal</Txt>
              </g>
            )}
          </g>
        )}
        {t >= m('reencauzar') && (
          <g opacity={e1(t, m('reencauzar'))}>
            <path d={`M 160 600 C 360 600, 420 ${lerp(600, 760, 1 - sm(t, m('reencauzar') + 0.4, m('reencauzar') + 1.6))}, 600 ${lerp(600, 720, 1 - sm(t, m('reencauzar') + 0.4, m('reencauzar') + 1.6))} S 900 600, 1040 600`} stroke={VERDE} strokeWidth={10} fill="none" strokeLinecap="round" />
            <Persona id={ID} x={180} y={560} s={0.7} cuerpo={NARANJA} />
            <Burbuja x={200} y={430} w={760} texto="Espera, creo que nos estamos enredando. ¿Empezamos por lo que viste?" u={sm(t, m('reencauzar'), m('reencauzar') + 2.6)} c={c} id={ID} tam={28} marca />
          </g>
        )}
      </TomaFB>

      {/* 3 · el arco completo y los límites */}
      <TomaFB t={t} a={m('desarrollo')} b={m('unacosa')} cy={470}>
        {vent(t, m('desarrollo') - 0.1, m('limites')) > 0.01 && <g opacity={vent(t, m('desarrollo') - 0.1, m('limites'))}><ArcoTres t={t} m={m} c={c} /></g>}
        {t >= m('limites') && (
          <g opacity={e1(t, m('limites'))}>
            <rect x={160} y={200} width={400} height={360} rx={26} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
            <rect x={640} y={200} width={400} height={360} rx={26} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
            <Visto x={360} y={320} r={50} />
            <Cruz x={840} y={320} r={50} op={sm(t, m('limites') + 1, m('limites') + 1.5)} />
            <Txt x={360} y={460} textAnchor="middle" fontSize={30} fill={c.texto}>Esto lo cambio</Txt>
            <Txt x={840} y={460} textAnchor="middle" fontSize={30} fill={c.texto} opacity={sm(t, m('limites') + 1, m('limites') + 1.5)}>Esto no</Txt>
            <Letrero x={600} y={660} texto="Y te explico por qué" id={ID} tam={30} op={sm(t, m('limites') + 2, m('limites') + 2.5)} />
          </g>
        )}
      </TomaFB>

      {/* 4 · experimento y curva en J */}
      <TomaFB t={t} a={m('unacosa')} b={m('ensena')} cy={470}>
        {vent(t, m('unacosa'), m('curva')) > 0.01 && (
          <g opacity={vent(t, m('unacosa'), m('curva'))}>
            <Letrero x={600} y={190} texto="La más importante" fondo={NARANJA} id={ID} tam={30} />
            {t >= m('experimento') && (
              <g opacity={e1(t, m('experimento'))}>
                <Calendario x={330} y={450} s={1.6} marcados={Math.min(14, Math.floor(Math.max(0, t - m('experimento')) * 3))} />
                <Txt x={330} y={630} textAnchor="middle" fontSize={28} fill={c.texto}>Dos semanas</Txt>
                <rect x={600} y={330} width={480} height={240} rx={24} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
                {['¿Qué buscas?', '¿Qué te frena?', '¿Cómo decides?'].map((q, k) => <Txt key={k} x={640} y={392 + k * 56} fontSize={28} fill={c.texto} opacity={sm(t, m('experimento') + 1 + k * 0.5, m('experimento') + 1.4 + k * 0.5)}>{q}</Txt>)}
                <Txt x={840} y={620} textAnchor="middle" fontSize={26} fill={c.tenue}>Antes de cada propuesta</Txt>
              </g>
            )}
          </g>
        )}
        {t >= m('curva') && (
          <g opacity={e1(t, m('curva'))}>
            <path d="M 200 620 L 1020 620 M 200 620 L 200 220" stroke={c.apagado} strokeWidth={6} />
            <line x1={200} y1={520} x2={1000} y2={520} stroke={c.tenue} strokeWidth={3} strokeDasharray="10 10" />
            <Txt x={1010} y={510} textAnchor="end" fontSize={26} fill={c.tenue}>Antes</Txt>
            <path d={Array.from({ length: Math.max(2, Math.floor(100 * jU) + 1) }, (_, i) => `${i ? 'L' : 'M'} ${jx(i)} ${jy(i)}`).join(' ')} stroke={NARANJA} strokeWidth={10} fill="none" strokeLinecap="round" />
            <Txt x={220} y={190} fontSize={28} fill={c.texto}>Rendimiento</Txt>
            {t >= m('sistema') && <g opacity={vent(t, m('sistema'), m('ensena'))}><Portatil x={470} y={720} s={0.55} /><Hoja x={360} y={700} w={50} h={64} rot={-10} /><Txt x={600} y={760} textAnchor="middle" fontSize={26} fill={c.texto}>Del cuaderno al sistema</Txt></g>}
            {t >= m('rapido') && <Letrero x={880} y={300} texto="Más rápido que antes" fondo={VERDE} id={ID} tam={28} op={e1(t, m('rapido'))} />}
          </g>
        )}
      </TomaFB>

      {/* 5 · enseña e invita */}
      <TomaFB t={t} a={m('ensena')} b={fin + 1} cy={480}>
        <Suelo y={720} isDark={isDark} x0={100} x1={1100} />
        <Persona id={ID} x={600} y={720} s={1.05} cuerpo={NARANJA} />
        {['Por escrito', 'Al momento', 'Al día siguiente'].map((o, k) => <Letrero key={k} x={[250, 600, 950][k]} y={[300, 230, 300][k]} texto={o} fondo={[AZUL_M, VIOLETA, ROSA][k]} id={ID} tam={28} op={vent(t, m('ensena') + 0.5 + k * 0.6, m('invita'))} />)}
        {t >= m('invita') && (
          <g opacity={e1(t, m('invita'))}>
            {[200, 380, 820, 1000].map((x, k) => <Persona key={k} id={ID} x={x} y={720} s={0.9} cuerpo={[AZUL_M, VIOLETA, ROSA, VERDE][k]} />)}
            {[200, 380, 820, 1000].map((x, k) => <Flujo key={`f${k}`} x1={x} y1={560} x2={600} y2={520} t={t + k * 0.2} n={3} arco={40} color={[AZUL_M, VIOLETA, ROSA, VERDE][k]} />)}
            <Letrero x={600} y={260} texto="Sostener el cambio en compañía" id={ID} tam={30} />
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};

/* Arco de tres piedras que se encienden con su marca. */
const ArcoTres: React.FC<{ t: number; m: (n: string) => number; c: ReturnType<typeof tono> }> = ({ t, m, c }) => (
  <g opacity={e1(t, m('arco'))}>
    <path d="M 180 640 Q 600 160 1020 640" stroke={c.apagado} strokeWidth={14} fill="none" strokeLinecap="round" />
    {([['abrir', 'Abrir', '¿Qué tipo es?', AZUL_M, 264, 554], ['desarrollo', 'Desarrollo', 'Escucha y propón', VIOLETA, 600, 400], ['cerrar', 'Cerrar', 'Comprométete', VERDE, 936, 554]] as const).map(([n, nom, sub, col, x, y]) => {
      const on = sm(t, m(n), m(n) + 0.6);
      return (
        <g key={n}>
          <circle cx={x} cy={y} r={70} fill={on > 0.5 ? col : c.panel} style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.18))' }} />
          <Txt x={x} y={y + 14} textAnchor="middle" fontSize={40} fill={on > 0.5 ? '#fff' : c.texto}>{n === 'abrir' ? 1 : n === 'desarrollo' ? 2 : 3}</Txt>
          <Txt x={x} y={n === 'desarrollo' ? y - 138 : y - 96} textAnchor="middle" fontSize={30} fill={col} opacity={0.35 + 0.65 * on}>{nom}</Txt>
          <Txt x={x} y={n === 'desarrollo' ? y - 98 : y + 110} textAnchor="middle" fontSize={26} fill={c.texto} opacity={on}>{sub}</Txt>
        </g>
      );
    })}
  </g>
);
