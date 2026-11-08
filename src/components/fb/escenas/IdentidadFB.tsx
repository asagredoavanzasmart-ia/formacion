import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Hoja, Lupa, Sello, Cruz, Visto, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * La crítica a tamaño real. Toma 1: dos curvas de ánimo frente a la misma crítica: una cae poco y se recupera en una
 * hora; la otra cae hondo y tarda semanas; tres marcas: ánimo de base, cuánto cae, cuánto tarda. Toma 2: la crítica
 * como un globo que se infla con tres frases («siempre», «todos», «nunca»); al escribir qué se dijo y qué no, el globo
 * se desinfla a su tamaño real. Toma 3: una planta que crece (identidad de crecimiento); el estudio de Columbia: dos
 * cerebros, uno atiende la respuesta y corrige más; la evaluación «cumple expectativas» bajo la lupa revela el
 * siguiente nivel; el sello «dato» reemplaza a «sentencia».
 */

const ID = 'fb18', P = 'fb-identidad';

const Cerebro: React.FC<{ x: number; y: number; s?: number; luz: number; color: string }> = ({ x, y, s = 1, luz, color }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-10} r={60 + 50 * luz} fill={color} opacity={0.3 * luz} />
    <path d="M -70 10 Q -86 -40 -40 -60 Q -20 -88 14 -72 Q 50 -86 72 -50 Q 96 -14 70 22 Q 56 50 20 44 Q -10 60 -36 44 Q -74 46 -70 10 Z" fill="#f9a8d4" />
    <path d="M -40 -30 Q -10 -10 -30 20 M 10 -60 Q 0 -20 30 0 M 40 -40 Q 60 0 40 30" stroke="#db2777" strokeWidth={4} fill="none" opacity={0.6} />
  </g>
);

export const IdentidadFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('profundo'), 'Afecta a quién creemos ser'], [m('difieren'), 'Tres diferencias'], [m('hora'), 'Una hora o semanas'], [m('patron'), 'Conoce tu patrón'],
    [m('tamano'), 'A su tamaño real'], [m('siempre'), 'Siempre, todos, nunca'], [m('escribe'), 'Escribe qué se dijo'], [m('menor'), 'Mucho menor'],
    [m('crecimiento'), 'Identidad de crecimiento'], [m('columbia'), 'Un laboratorio en Columbia'], [m('coaching'), 'Busca el coaching'], [m('dato'), 'Dato, no sentencia'],
  ];
  const curvaA = sm(t, m('hora') - 0.5, m('hora') + 2);
  const curvaB = sm(t, m('semanas') - 0.3, m('semanas') + 2);
  const infla = sm(t, m('crecer'), m('siempre') + 3) * (1 - 0.75 * sm(t, m('menor'), m('menor') + 1.2));
  const FRASES = ['Siempre hago todo mal', 'Todos piensan lo mismo', 'Nunca voy a mejorar'];
  const planta = sm(t, m('crecimiento'), m('crecimiento') + 2.5);

  const linea = (base: number, caida: number, rec: number, u: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const x = 160 + i * 9;
      let v = base;
      if (i > 25) v = base - caida * Math.exp(-((i - 25) / rec));
      if (i / 100 > u) break;
      pts.push(`${i ? 'L' : 'M'} ${x} ${620 - v * 360}`);
    }
    return pts.join(' ');
  };

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La crítica a tamaño real">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · dos patrones */}
      <TomaFB t={t} a={0} b={m('tamano')} cy={470}>
        <g opacity={e1(t, m('difieren'))}>
          <path d="M 160 620 L 1060 620 M 160 620 L 160 200" stroke={c.apagado} strokeWidth={6} />
          <Txt x={160} y={180} fontSize={28} fill={c.texto}>Ánimo</Txt>
          <rect x={382} y={200} width={6} height={420} fill={ROJO_M} opacity={0.5} />
          <Txt x={385} y={660} textAnchor="middle" fontSize={26} fill={ROJO_M}>Crítica</Txt>
        </g>
        {t >= m('hora') - 0.5 && <path d={linea(0.75, 0.25, 4, curvaA)} stroke={VERDE} strokeWidth={9} fill="none" strokeLinecap="round" />}
        {t >= m('semanas') - 0.3 && <path d={linea(0.6, 0.5, 40, curvaB)} stroke={VIOLETA} strokeWidth={9} fill="none" strokeLinecap="round" />}
        {t >= m('hora') && <Txt x={1060} y={330} textAnchor="end" fontSize={28} fill={VERDE} opacity={sm(t, m('hora') + 1.6, m('hora') + 2.1)}>A la hora lo olvidó</Txt>}
        {t >= m('semanas') && <Txt x={1060} y={500} textAnchor="end" fontSize={28} fill={VIOLETA} opacity={sm(t, m('semanas') + 1.6, m('semanas') + 2.1)}>Semanas tocado</Txt>}
        {t >= m('patron') && <Letrero x={700} y={740} texto="Conoce tu propio patrón" id={ID} tam={30} op={e1(t, m('patron'))} />}
      </TomaFB>

      {/* 2 · el globo */}
      <TomaFB t={t} a={m('tamano')} b={m('crecimiento')} cy={470}>
        <Suelo y={760} isDark={isDark} x0={100} x1={1100} />
        <Persona id={ID} x={220} y={760} s={1} cuerpo={NARANJA} ojos={1 - 0.4 * infla} />
        <path d={`M 260 640 Q 320 ${600 - 100 * infla} ${lerp(420, 480, infla)} ${lerp(560, 480, infla)}`} stroke={c.tenue} strokeWidth={3} fill="none" />
        <g transform={`translate(${lerp(440, 520, infla)} ${lerp(520, 380, infla)}) scale(${0.45 + 1.2 * infla})`}>
          <ellipse cx={0} cy={0} rx={100} ry={86} fill={ROJO_M} opacity={0.85} />
          <ellipse cx={-30} cy={-34} rx={20} ry={12} fill="#fff" opacity={0.4} />
        </g>
        <Txt x={lerp(440, 520, infla)} y={lerp(520, 380, infla) + 86 * (0.45 + 1.2 * infla) + 40} textAnchor="middle" fontSize={28} fill={c.texto}>Un informe</Txt>
        {FRASES.map((f, k) => {
          const o = vent(t, m('siempre') + k * 0.9, m('escribe') + 0.3);
          return o > 0.01 ? <Letrero key={k} x={960} y={240 + k * 130} texto={f} fondo={ROJO_M} id={ID} tam={28} op={o} /> : null;
        })}
        {t >= m('escribe') && (
          <g opacity={e1(t, m('escribe') + 0.3)}>
            <rect x={800} y={200} width={340} height={430} rx={18} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
            <Txt x={890} y={250} textAnchor="middle" fontSize={26} fill={VERDE}>Se dijo</Txt>
            <Txt x={1050} y={250} textAnchor="middle" fontSize={26} fill={ROJO_M}>No</Txt>
            <line x1={970} y1={220} x2={970} y2={600} stroke={c.apagado} strokeWidth={3} />
            {[0, 1, 2, 3].map((k) => <g key={k} opacity={sm(t, m('escribe') + 0.8 + k * 0.5, m('escribe') + 1.2 + k * 0.5)}><rect x={830} y={300 + k * 70} width={110} height={12} rx={6} fill={VERDE} opacity={0.7} /><rect x={995} y={300 + k * 70} width={110} height={12} rx={6} fill={ROJO_M} opacity={0.5} /></g>)}
          </g>
        )}
        {t >= m('menor') && <Letrero x={500} y={160} texto="Mucho menor" fondo={VERDE} id={ID} tam={30} op={e1(t, m('menor') + 0.8)} />}
      </TomaFB>

      {/* 3 · crecimiento */}
      <TomaFB t={t} a={m('crecimiento')} b={fin + 1} cy={470}>
        {vent(t, m('crecimiento'), m('coaching')) > 0.01 && (
          <g opacity={vent(t, m('crecimiento'), m('coaching'))}>
            <g opacity={1 - sm(t, m('columbia') - 0.4, m('columbia'))}>
              <path d="M 560 640 L 640 640 L 620 720 L 580 720 Z" fill="#a16b3f" />
              <path d={`M 600 640 L 600 ${640 - 280 * planta}`} stroke="#16a34a" strokeWidth={10} strokeLinecap="round" />
              {[0, 1, 2].map((k) => planta > 0.25 + k * 0.25 && <ellipse key={k} cx={600 + (k % 2 ? 50 : -50)} cy={600 - k * 80} rx={46} ry={20} fill="#22c55e" transform={`rotate(${k % 2 ? -25 : 25} ${600 + (k % 2 ? 50 : -50)} ${600 - k * 80})`} />)}
              <Txt x={600} y={780} textAnchor="middle" fontSize={30} fill={c.texto}>Alguien que aprende</Txt>
            </g>
            {t >= m('columbia') && (
              <g opacity={e1(t, m('columbia'))}>
                <Cerebro x={330} y={380} s={1.4} luz={sm(t, m('fija'), m('fija') + 1) * 0.15} color={GRIS} />
                <Cerebro x={870} y={380} s={1.4} luz={0.3 + 0.6 * sm(t, m('fija') + 1, m('fija') + 2)} color={VERDE} />
                <Txt x={330} y={520} textAnchor="middle" fontSize={28} fill={c.texto}>Inteligencia fija</Txt>
                <Txt x={870} y={520} textAnchor="middle" fontSize={28} fill={c.texto}>Se desarrolla</Txt>
                {t >= m('fija') && [[330, 0.3, GRIS], [870, 0.75, VERDE]].map(([x, v, col], k) => (
                  <g key={k} opacity={e1(t, m('fija') + 1 + k * 0.5)}>
                    <rect x={(x as number) - 160} y={580} width={320} height={26} rx={13} fill={c.apagado} />
                    <rect x={(x as number) - 160} y={580} width={320 * (v as number) * sm(t, m('fija') + 1 + k * 0.5, m('fija') + 2 + k * 0.5)} height={26} rx={13} fill={col as string} />
                  </g>
                ))}
                {t >= m('fija') && <Txt x={600} y={680} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('fija') + 1.5)}>Errores corregidos al repetir</Txt>}
              </g>
            )}
          </g>
        )}
        {t >= m('coaching') && (
          <g opacity={e1(t, m('coaching'))}>
            <rect x={200} y={200} width={420} height={460} rx={20} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
            <Txt x={410} y={260} textAnchor="middle" fontSize={28} fill={c.texto}>Evaluación</Txt>
            {[0, 1, 2, 3].map((k) => <rect key={k} x={240} y={300 + k * 50} width={340 - (k % 2) * 80} height={14} rx={7} fill={c.apagado} />)}
            <rect x={240} y={520} width={340} height={60} rx={14} fill={AZUL_M} opacity={sm(t, m('cumple'), m('cumple') + 0.5)} />
            <Txt x={410} y={560} textAnchor="middle" fontSize={26} fill="#fff" opacity={sm(t, m('cumple'), m('cumple') + 0.5)}>Cumple expectativas</Txt>
            <g opacity={sm(t, m('cumple') + 1, m('cumple') + 1.6)}>
              <Lupa x={820} y={420} r={110} c={c} id={ID} clip={`${ID}-lupa`}>
                <path d="M -60 50 L -20 10 L 20 30 L 70 -40" stroke={VERDE} strokeWidth={10} fill="none" strokeLinecap="round" />
              </Lupa>
              <Txt x={820} y={590} textAnchor="middle" fontSize={28} fill={c.texto}>Qué falta para</Txt>
              <Txt x={820} y={630} textAnchor="middle" fontSize={28} fill={c.texto}>el siguiente nivel</Txt>
            </g>
            {t >= m('dato') && <g opacity={e1(t, m('dato'))}><Sello x={600} y={740} texto="DATO, NO SENTENCIA" u={sm(t, m('dato'), m('dato') + 0.6)} color={VERDE} tam={34} rot={-4} /></g>}
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
