import React from 'react';
import { useMovil, Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Engranaje, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «El informe A3», en tres tomas sobre la misma hoja.
 * 1 · Una hoja de 11 × 17 pulgadas: Toyota obligaba a que el problema cupiera en una página; la gerencia lee imágenes
 *     y viñetas. El error: usarla para documentar una decisión ya tomada.
 * 2 · La hoja se llena por secciones al nombrarse: a la izquierda antecedentes, condición actual (1.000 leads, 15
 *     contactados), metas y análisis con la espina de pescado; a la derecha contramedidas, plan (DARCI) y seguimiento.
 *     Arriba se suman las iniciales de quienes la revisaron.
 * 3 · Lo que revela el análisis: no es desconfianza, quizá los leads no eran calificados o ventas ni sabía que llegaban.
 */

const ID = 'ro39';
const nombres = ['hoja', 'toyota', 'cabe', 'butler', 'vinetas', 'error', 'tomada', 'lados', 'izquierda', 'antecedentes', 'actual', 'mil', 'metas', 'analisis', 'porques', 'espina', 'costillas', 'raiz', 'derecha', 'contramedidas', 'plan', 'darci', 'seguimiento', 'iniciales', 'firma', 'sola', 'revela', 'confianza', 'calificados', 'nisabia', 'equivocado', 'pregunta'] as const;
type N = typeof nombres[number];

export const A3RO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);
  const movil = useMovil();

  const rotulos: [number, string][] = [
    [0.2, 'El informe A3'], [m('cabe'), 'Si no cabe, no se entiende'], [m('error'), 'El error más frecuente'],
    [m('izquierda'), 'Izquierda: por qué importa'], [m('analisis'), 'El análisis: el corazón'], [m('derecha'), 'Derecha: la solución'],
    [m('iniciales'), 'Las firmas de respaldo'], [m('revela'), 'Lo que revela el análisis'],
  ];

  /* la hoja: 860 × 560, en (170, 190) */
  const X = 170, Y = 200, WH = 860, HH = 540;
  const sec = (x: number, y: number, w: number, h: number, txt: string, n: N, col: string, hijo?: React.ReactNode) => t >= m(n) && (
    <g opacity={e1(t, m(n))}>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={c.panel2} />
      <rect x={x} y={y} width={w} height={movil ? 54 : 30} rx={10} fill={col} />
      <Txt f="a" x={x + 12} y={y + (movil ? 40 : 22)} fontSize={18} fill="#fff" peso={700}>{movil ? txt.split(' · ')[0] : txt}</Txt>
      {!movil && hijo}
    </g>
  );

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El informe A3">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · la hoja y la restricción */}
      <Toma t={t} a={-1} b={m('lados')} zi={1}>
        <g opacity={e1(t, m('hoja'))}>
          <rect x={360} y={230} width={480} height={310} rx={8} fill="#fff" style={sombra(0.25, 4, 12)} />
          <Txt f="a" x={600} y={580} textAnchor="middle" fontSize={24} fill={c.tenue}>17 pulgadas</Txt>
          <Txt f="a" x={330} y={385} textAnchor="middle" fontSize={24} fill={c.tenue} transform="rotate(-90 330 385)">11 pulgadas</Txt>
        </g>
        {t >= m('toyota') && <g opacity={e1(t, m('toyota'))}><Persona id={ID} x={960} y={620} s={0.6} cuerpo={ROJO_M} /><Engranaje x={1040} y={420} r={30} t={t} color={PIZARRA} hueco={c.panel} /><Letrero x={980} y={680} texto="Toyota" fondo={ROJO_M} id={ID} tam={22} /></g>}
        {t >= m('cabe') && <g opacity={e1(t, m('cabe')) * (1 - ac(t, m('error') - 0.3, m('error')))}>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={390} y={260 + k * 34} width={420} height={12} rx={6} fill="#cbd5e1" />)}<Letrero x={600} y={650} texto="Si no cabe en una página, no se entiende" fondo={PIZARRA} id={ID} tam={22} /></g>}
        {t >= m('vinetas') && t < m('error') && <g opacity={e1(t, m('vinetas'))}><Letrero x={600} y={160} texto="Imágenes y viñetas, no prosa" fondo={AZUL_M} id={ID} tam={22} /></g>}
        {t >= m('error') && <g opacity={e1(t, m('error'))}>
          {(() => { const g = sm(t, m('tomada'), m('tomada') + 0.4); return g > 0.01 && <g transform={`translate(600 380) rotate(-12) scale(${lerp(1.5, 1, g)})`} opacity={g}><rect x={-170} y={-50} width={340} height={100} rx={14} fill="none" stroke={ROJO_M} strokeWidth={8} /><Txt f="a" x={0} y={14} textAnchor="middle" fontSize={34} fill={ROJO_M} peso={800}>YA DECIDIDO</Txt></g>; })()}
          <Letrero x={600} y={650} texto="Úsala para desarrollar la solución" fondo={VERDE} id={ID} op={sm(t, m('tomada') + 1, m('tomada') + 1.6)} tam={22} />
        </g>}
      </Toma>

      {/* TOMA 2 · la hoja se llena */}
      <Toma t={t} a={m('lados')} b={m('revela')}>
        <rect x={X} y={Y} width={WH} height={HH} rx={12} fill={c.panel} style={sombra(c.sombra, 4, 14)} />
        <rect x={X + WH / 2 - 2} y={Y + 16} width={4} height={HH - 32} rx={2} fill={c.apagado} />
        {sec(X + 16, Y + 16, 396, 100, 'Antecedentes', 'antecedentes', AZUL_M, t >= m('antecedentes') && <g><Txt f="a" x={X + 30} y={Y + 76} fontSize={18} fill={AMBAR}>Marketing: «¡oro puro!»</Txt><Txt f="a" x={X + 30} y={Y + 102} fontSize={18} fill={ROJO_M}>Ventas: «es basura»</Txt></g>)}
        {sec(X + 16, Y + 126, 190, 120, t >= m('mil') ? 'Actual · 1.000 → 15' : 'Actual', 'actual', AZUL_M, t >= m('mil') && <g>{[1000, 15].map((v, k) => <rect key={k} x={X + 40 + k * 70} y={Y + 236 - (k ? 6 : 70)} width={44} height={k ? 6 : 70} rx={4} fill={k ? ROJO_M : AMBAR} />)}</g>)}
        {sec(X + 222, Y + 126, 190, 120, 'Metas', 'metas', AZUL_M, <g>{[0, 1].map((k) => <rect key={k} x={X + 246 + k * 70} y={Y + 236 - 70 + k * 10} width={44} height={70 - k * 10} rx={4} fill={VERDE} />)}</g>)}
        {sec(X + 16, Y + 256, 396, 268, 'Análisis', 'analisis', AZUL_M, t >= m('espina') && (
          <g>
            <path d={`M ${X + 40} ${Y + 400} H ${X + 340}`} stroke={c.texto} strokeWidth={5} />
            <path d={`M ${X + 340} ${Y + 380} l 40 20 l -40 20 Z`} fill={ROJO_M} />
            {t >= m('costillas') && [0, 1, 2, 3, 4, 5].map((k) => { const x = X + 80 + (k % 3) * 90, arriba = k < 3; return <g key={k} opacity={e1(t, m('costillas') + k * 0.25)}><path d={`M ${x} ${Y + (arriba ? 320 : 480)} L ${x + 40} ${Y + 400}`} stroke={[AMBAR, NARANJA, ROSA, VIOLETA, TEAL, AZUL_M][k]} strokeWidth={5} /><Txt f="a" x={x - 6} y={Y + (arriba ? 312 : 504)} textAnchor="middle" fontSize={14} fill={c.tenue}>{['Personas', 'Métodos', 'Materiales', 'Equipos', 'Entorno', 'Gestión'][k]}</Txt></g>; })}
            {t >= m('raiz') && [0, 1, 2].map((k) => <g key={k}><circle cx={X + 130 + k * 90} cy={Y + 360 + (k % 2) * 80} r={13} fill={ROJO_M} /><Txt x={X + 130 + k * 90} y={Y + 366 + (k % 2) * 80} textAnchor="middle" fontSize={16} fill="#fff" peso={800}>{k + 1}</Txt></g>)}
          </g>
        ))}
        {t >= m('porques') && t < m('espina') && !movil && <Txt f="a" x={X + 40} y={Y + 330} fontSize={20} fill={c.texto} opacity={e1(t, m('porques'))}>¿Por qué? ¿Por qué? ¿Por qué? ¿Por qué? ¿Por qué?</Txt>}
        {sec(X + WH / 2 + 16, Y + 16, 396, 170, 'Contramedidas', 'contramedidas', NARANJA, <g>{[0, 1, 2].map((k) => <g key={k}><circle cx={X + WH / 2 + 44} cy={Y + 74 + k * 36} r={11} fill={ROJO_M} /><rect x={X + WH / 2 + 66} y={Y + 68 + k * 36} width={k === 0 ? 120 : 280} height={12} rx={6} fill={k === 0 ? NARANJA : '#cbd5e1'} /></g>)}{<Txt f="a" x={X + WH / 2 + 196} y={Y + 80} fontSize={14} fill={c.tenue}>el SLA: una parte</Txt>}</g>)}
        {sec(X + WH / 2 + 16, Y + 196, 396, 170, 'Plan', 'plan', NARANJA, t >= m('darci') && <g>{['D', 'A', 'R', 'C', 'I'].map((l, k) => <g key={l}><rect x={X + WH / 2 + 36 + k * 74} y={Y + 250} width={60} height={60} rx={12} fill={[VIOLETA, ROJO_M, NARANJA, AZUL_M, VERDE][k]} /><Txt x={X + WH / 2 + 66 + k * 74} y={Y + 290} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>{l}</Txt></g>)}</g>)}
        {sec(X + WH / 2 + 16, Y + 376, 396, 148, 'Seguimiento', 'seguimiento', NARANJA, <polyline points={[0, 1, 2, 3, 4, 5].map((k) => `${X + WH / 2 + 40 + k * 66},${Y + 500 - k * 14 - (k % 2) * 8}`).join(' ')} fill="none" stroke={VERDE} strokeWidth={5} />)}
        {/* firmas */}
        {t >= m('iniciales') && ['AB', 'JS', 'MV', 'LP'].map((ini, k) => <g key={ini} opacity={e1(t, m('iniciales') + k * 0.4)} transform={`translate(${X + 520 + k * 90} ${Y - 30}) rotate(${-6 + k * 4})`}><circle r={30} fill={[AZUL_M, VERDE, VIOLETA, NARANJA][k]} /><Txt x={0} y={9} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>{ini}</Txt></g>)}
        {t >= m('sola') && <Letrero x={X + 260} y={Y - 30} texto="No llega sola" fondo={VERDE} id={ID} op={e1(t, m('sola'))} tam={22} />}
      </Toma>

      {/* TOMA 3 · lo que revela el análisis */}
      <Toma t={t} a={m('revela')} b={fin + 1}>
        <Suelo y={700} isDark={isDark} />
        <Equipo id={ID} k="mkt" x={240} y={700} s={0.75} t={t} nombre={false} />
        <Equipo id={ID} k="ven" x={960} y={700} s={0.75} t={t} nombre={false} flip />
        {t >= m('confianza') && <g opacity={e1(t, m('confianza'))}><Txt f="a" x={600} y={300} textAnchor="middle" fontSize={30} fill={c.tenue} textDecoration="line-through">falta de confianza</Txt></g>}
        {t >= m('calificados') && <g opacity={e1(t, m('calificados'))}>{[0, 1, 2].map((k) => <g key={k}><Hoja x={500 + k * 70} y={460} w={60} h={46} lineas={2} color="#94a3b8" /></g>)}<Letrero x={600} y={600} texto="¿Leads no calificados?" fondo={AMBAR} id={ID} tam={22} /></g>}
        {t >= m('nisabia') && <Letrero x={600} y={400} texto="¿O ventas ni sabía que llegaban?" fondo={AZUL_M} id={ID} op={e1(t, m('nisabia'))} tam={22} />}
        {t >= m('equivocado') && <Letrero x={600} y={780} texto="Sin análisis: el problema equivocado" fondo={ROJO_M} id={ID} op={e1(t, m('equivocado'))} tam={22} />}
      </Toma>
    </Lienzo>
  );
};
