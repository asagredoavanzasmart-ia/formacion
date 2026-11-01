import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Burbuja, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Trece objeciones», en cuatro tomas.
 * 1 · No basta con que nadie se oponga: los que deciden son los del medio, cómodos en lo conocido. Trece objeciones
 *     se preparan porque la resistencia es predecible.
 * 2 · Objeciones con un patrón de respuesta: cada una aparece como burbuja y su respuesta se le pone al lado.
 * 3 · Objeciones que piden datos: casos reales, un piloto con un vendedor dispuesto, y «vuelvo con la respuesta».
 * 4 · Las cuatro reglas de Kotter y Whitehead: invitar a los escépticos, respeto, respuestas cortas y preparación.
 */

const ID = 'ro42';
const nombres = ['entusiasta', 'medio', 'comodidad', 'trece', 'predecible', 'patron', 'o1', 'o2', 'o3', 'o4', 'o5', 'sheridan', 'confianza', 'datos', 'o6', 'o7', 'vendedor', 'sorpresa', 'kotter', 'invitar', 'respeto', 'cortas', 'preparase', 'bmas', 'pregunta'] as const;
type N = typeof nombres[number];

const PATRON: { n: N; obj: string; resp: string }[] = [
  { n: 'o1', obj: '«Nos ha ido bien, ¿por qué cambiar?»', resp: 'Lineal frente a escala' },
  { n: 'o2', obj: '«¿Insinúas que lo hacemos mal?»', resp: 'Valorar lo que funciona' },
  { n: 'o3', obj: '«¿Y qué pasa con esto, y esto?»', resp: 'Invitar a resolverlo' },
  { n: 'o4', obj: '«No es el momento»', resp: 'Nunca será el ideal' },
  { n: 'o5', obj: '«Aquí somos distintos»', resp: 'Todo se basa en la confianza' },
];

export const ObjecionesRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Apoyo entusiasta'], [m('medio'), 'Deciden los del medio'], [m('trece'), 'Trece objeciones'],
    [m('patron'), 'Un patrón de respuesta'], [m('datos'), 'Las que piden datos'], [m('kotter'), 'Cuatro reglas'],
  ];

  const act = PATRON.reduce((a, p, k) => (t >= m(p.n) ? k : a), -1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Trece objeciones y cómo responderlas">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · los del medio y la pila de objeciones */}
      <Toma t={t} a={-1} b={m('patron')} zi={1}>
        <Suelo y={660} isDark={isDark} />
        {t < m('trece') && <g opacity={1 - ac(t, m('trece') - 0.4, m('trece'))}>
          {Array.from({ length: 9 }, (_, k) => { const lado = k < 2 ? 0 : k > 6 ? 2 : 1; const on = lado === 1 && t >= m('medio'); return <Persona key={k} id={ID} x={170 + k * 108} y={660} s={0.5} cuerpo={lado === 0 ? VERDE : lado === 2 ? ROJO_M : on ? AMBAR : '#94a3b8'} />; })}
          <Letrero x={225} y={720} texto="A favor" fondo={VERDE} id={ID} tam={20} />
          <Letrero x={980} y={720} texto="En contra" fondo={ROJO_M} id={ID} tam={20} />
          {t >= m('medio') && <Letrero x={600} y={720} texto="Los del medio deciden" fondo={AMBAR} id={ID} op={e1(t, m('medio'))} tam={22} />}
          {t >= m('entusiasta') && <Letrero x={600} y={220} texto="No basta con que nadie se oponga" fondo={PIZARRA} id={ID} op={e1(t, m('entusiasta'))} tam={22} />}
          {t >= m('comodidad') && <g opacity={e1(t, m('comodidad'))}><rect x={430} y={420} width={340} height={70} rx={24} fill={ROSA} opacity={0.75} /><rect x={410} y={380} width={50} height={110} rx={20} fill={ROSA} /><rect x={740} y={380} width={50} height={110} rx={20} fill={ROSA} /><Txt f="a" x={600} y={360} textAnchor="middle" fontSize={22} fill={c.tenue}>la comodidad de lo conocido</Txt></g>}
        </g>}
        {t >= m('trece') && <g opacity={e1(t, m('trece'))}>
          {Array.from({ length: 13 }, (_, k) => { const u = sm(t, m('trece') + k * 0.1, m('trece') + 0.6 + k * 0.1); return <g key={k} transform={`translate(${lerp(600, 260 + (k % 5) * 170, u)} ${lerp(200, 280 + Math.floor(k / 5) * 130, u)}) rotate(${(k % 3 - 1) * 4})`}><rect x={-70} y={-44} width={140} height={88} rx={14} fill={c.panel} style={sombra(c.sombra, 3, 8)} /><Txt x={0} y={14} textAnchor="middle" fontSize={34} fill={NARANJA} peso={800}>{k + 1}</Txt></g>; })}
          {t >= m('predecible') && <Letrero x={600} y={720} texto="Resistencia predecible, respuesta también" id={ID} op={e1(t, m('predecible'))} tam={22} />}
        </g>}
      </Toma>

      {/* TOMA 2 · el patrón */}
      <Toma t={t} a={m('patron')} b={m('datos')}>
        {PATRON.map((p, k) => t >= m(p.n) && (
          <g key={p.n} opacity={e1(t, m(p.n)) * (k === act ? 1 : 0.4)}>
            <rect x={90} y={190 + k * 112} width={560} height={86} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            <Txt f="a" x={120} y={243 + k * 112} fontSize={k === 2 ? 22 : 24} fill={c.texto}>{p.obj}</Txt>
            <path d={`M 660 ${233 + k * 112} h 50`} stroke={c.tenue} strokeWidth={5} />
            <path d={`M 712 ${233 + k * 112} l -14 -10 v 20 Z`} fill={c.tenue} />
            <g opacity={sm(t, m(p.n) + 1.2, m(p.n) + 1.8)}><rect x={730} y={196 + k * 112} width={390} height={74} rx={18} fill={VERDE} /><Txt f="a" x={925} y={242 + k * 112} textAnchor="middle" fontSize={22} fill="#fff" peso={700}>{p.resp}</Txt></g>
          </g>
        ))}
        {t >= m('sheridan') && <Letrero x={925} y={790} texto="Sheridan: el 100 % cree ser distinto" fondo={PIZARRA} id={ID} op={e1(t, m('sheridan'))} tam={20} />}
      </Toma>

      {/* TOMA 3 · las que piden datos */}
      <Toma t={t} a={m('datos')} b={m('kotter')}>
        <Suelo y={700} isDark={isDark} />
        {t >= m('o6') && <g opacity={e1(t, m('o6'))}>
          <Burbuja x={90} y={190} w={340} texto="«Ya probamos y no funcionó»" u={sm(t, m('o6'), m('o6') + 1)} c={c} id={ID} tam={22} />
          {[0, 1, 2].map((k) => <Hoja key={k} x={150 + k * 70} y={430} w={80} h={104} lineas={4} color={AZUL_M} />)}
          <Letrero x={260} y={620} texto="Casos reales y recursos" fondo={AZUL_M} id={ID} tam={20} />
        </g>}
        {t >= m('o7') && <g opacity={e1(t, m('o7'))}>
          <Burbuja x={480} y={190} w={300} texto="«El cambio es enorme»" u={sm(t, m('o7'), m('o7') + 1)} c={c} id={ID} tam={22} />
          {t >= m('vendedor') && <g><Equipo id={ID} k="ven" x={560} y={700} s={0.6} t={t} nombre={false} /><polyline points="640,560 680,540 720,500 760,450" fill="none" stroke={VERDE} strokeWidth={6} strokeLinecap="round" /><Letrero x={630} y={760} texto="Un piloto con un vendedor" fondo={VERDE} id={ID} tam={20} /></g>}
        </g>}
        {t >= m('sorpresa') && <g opacity={e1(t, m('sorpresa'))}>
          <Persona id={ID} x={1000} y={700} s={0.6} cuerpo={VIOLETA} />
          <Burbuja x={830} y={330} w={320} texto="«Lo averiguo y vuelvo»" u={sm(t, m('sorpresa'), m('sorpresa') + 1)} c={c} id={ID} lado="der" tam={22} />
        </g>}
      </Toma>

      {/* TOMA 4 · cuatro reglas */}
      <Toma t={t} a={m('kotter')} b={fin + 1}>
        {([['invitar', 'Invitar a los escépticos', AZUL_M], ['respeto', 'Responder con respeto', VERDE], ['cortas', 'Respuestas cortas y de sentido común', AMBAR], ['preparase', 'Prepararse', NARANJA]] as [N, string, string][]).map(([n, txt, col], k) => t >= m(n) && (
          <g key={n} opacity={e1(t, m(n))}>
            <rect x={150 + (k % 2) * 460} y={220 + Math.floor(k / 2) * 220} width={440} height={180} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <circle cx={220 + (k % 2) * 460} cy={310 + Math.floor(k / 2) * 220} r={40} fill={col} />
            <Txt x={220 + (k % 2) * 460} y={324 + Math.floor(k / 2) * 220} textAnchor="middle" fontSize={36} fill="#fff" peso={800}>{k + 1}</Txt>
            <Txt f="a" x={280 + (k % 2) * 460} y={318 + Math.floor(k / 2) * 220} fontSize={k === 2 ? 18 : 24} fill={c.texto} peso={700}>{txt}</Txt>
          </g>
        ))}
        {t >= m('bmas') && <Letrero x={600} y={720} texto="Con preparación, respuestas inspiradas" id={ID} op={e1(t, m('bmas'))} tam={22} />}
      </Toma>
    </Lienzo>
  );
};
