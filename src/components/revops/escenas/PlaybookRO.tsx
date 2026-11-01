import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Monitor, Burbuja, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «El playbook: cómo se ejecuta el proceso», en cinco tomas.
 * 1 · Proceso (qué etapas), metodología (la salsa secreta) y playbook (todo lo que el vendedor necesita, cuando lo necesita).
 * 2 · Metodología adaptativa: el comprador habla y el vendedor adapta su forma de vender (necesidades, soluciones,
 *     objetivos, insights). Kunkle: los mejores se adaptan.
 * 3 · Las cuatro áreas del playbook (saber, hacer, decir, mostrar) y su formato según Pollard.
 * 4 · La consistencia convierte clientes en fans; el contenido por etapa.
 * 5 · La matriz persona → dolor → función → contenido; la celda vacía es una conversación que el vendedor enfrenta solo.
 */

const ID = 'ro29';
const nombres = ['etapas', 'metodologia', 'reune', 'partes', 'adaptativa', 'necesidades', 'soluciones', 'objetivos', 'insights', 'kunkle', 'adaptan', 'ninguna', 'areas', 'saber', 'hacer', 'decir', 'mostrar', 'pollard', 'perenne', 'documentas', 'fans', 'contenidoEtapa', 'matriz', 'gerente', 'dolorM', 'funcionM', 'piezas', 'paraQue', 'caso', 'circuito', 'celda', 'pregunta'] as const;
type N = typeof nombres[number];

const VENTAS: { n: N; txt: string; dice: string; col: string }[] = [
  { n: 'necesidades', txt: 'Por necesidades', dice: '«Necesitamos lograr…»', col: AZUL_M },
  { n: 'soluciones', txt: 'Por soluciones', dice: '«Todo falla cuando…»', col: VIOLETA },
  { n: 'objetivos', txt: 'Por objetivos', dice: '«Este año debemos…»', col: VERDE },
  { n: 'insights', txt: 'Por insights', dice: '«No lo había visto así»', col: NARANJA },
];

export const PlaybookRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'El playbook'], [m('adaptativa'), 'Metodología adaptativa'], [m('kunkle'), 'Los mejores se adaptan'],
    [m('areas'), 'Las cuatro áreas'], [m('pollard'), 'Web, a pedido y perenne'], [m('documentas'), 'Consistencia'], [m('matriz'), 'La matriz'], [m('caso'), 'La celda vacía'],
  ];

  const venta = VENTAS.reduce((a, v, k) => (t >= m(v.n) ? k : a), -1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El playbook: cómo se ejecuta el proceso">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · proceso, metodología, playbook */}
      <Toma t={t} a={-1} b={m('adaptativa')} zi={1}>
        {([['etapas', 'Proceso', 'Qué etapas existen', PIZARRA], ['metodologia', 'Metodología', 'Qué hacer en cada una', VIOLETA], ['reune', 'Playbook', 'Todo, en el momento justo', NARANJA]] as [N, string, string, string][]).map(([n, tit, sub, col], k) => t >= m(n) && (
          <g key={n} opacity={e1(t, m(n))}>
            <rect x={130 + k * 330} y={260} width={280} height={300} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <rect x={130 + k * 330} y={260} width={280} height={70} rx={24} fill={col} /><rect x={130 + k * 330} y={300} width={280} height={30} fill={col} />
            <Txt f="a" x={270 + k * 330} y={306} textAnchor="middle" fontSize={28} fill="#fff" peso={700}>{tit}</Txt>
            {k === 0 && [0, 1, 2].map((j) => <rect key={j} x={170 + j * 70} y={380} width={56} height={56} rx={10} fill={['#94a3b8', '#94a3b8', '#94a3b8'][j]} />)}
            {k === 1 && <g transform="translate(600 410)"><path d="M -40 30 Q -40 -30 0 -30 Q 40 -30 40 30 Z" fill={ROJO_M} /><rect x={-48} y={28} width={96} height={16} rx={8} fill="#b91c1c" /><circle cx={-14} cy={-6} r={6} fill="#fff" opacity={0.6} /></g>}
            {k === 2 && <g><rect x={850} y={360} width={100} height={130} rx={10} fill={NARANJA} /><rect x={862} y={372} width={76} height={106} rx={6} fill="#fff" opacity={0.85} />{[0, 1, 2, 3].map((j) => <rect key={j} x={872} y={386 + j * 22} width={56} height={8} rx={4} fill="#cbd5e1" />)}</g>}
            <Txt f="a" x={270 + k * 330} y={530} textAnchor="middle" fontSize={22} fill={c.tenue}>{sub}</Txt>
          </g>
        ))}
        {t >= m('partes') && <Letrero x={600} y={680} texto="Tres partes: metodología, áreas y matriz" fondo={PIZARRA} id={ID} op={e1(t, m('partes'))} tam={24} />}
      </Toma>

      {/* TOMA 2 · metodología adaptativa */}
      <Toma t={t} a={m('adaptativa')} b={m('areas')}>
        <Suelo y={700} isDark={isDark} />
        <Persona id={ID} x={850} y={700} s={0.85} cuerpo={AZUL_M} />
        <Equipo id={ID} k="ven" x={330} y={700} s={0.85} t={t} nombre={false} />
        {venta >= 0 && <Burbuja key={venta} x={720} y={220} w={360} texto={VENTAS[venta].dice} u={sm(t, m(VENTAS[venta].n), m(VENTAS[venta].n) + 1.2)} c={c} id={ID} lado="der" tam={26} />}
        {VENTAS.map((v, k) => t >= m(v.n) && (
          <g key={v.n} opacity={e1(t, m(v.n)) * (k === venta ? 1 : 0.4)}>
            <Letrero x={160} y={180 + k * 70} texto={v.txt} fondo={v.col} id={ID} tam={24} ancla="start" />
          </g>
        ))}
        {t >= m('adaptan') && <Letrero x={600} y={780} texto="Se adaptan al comprador, no a su guion" id={ID} op={e1(t, m('adaptan')) * (1 - ac(t, m('ninguna') - 0.3, m('ninguna')))} tam={24} />}
        {t >= m('ninguna') && <Letrero x={600} y={780} texto="Ninguna calza perfecto: se combinan" fondo={PIZARRA} id={ID} op={e1(t, m('ninguna'))} tam={24} />}
      </Toma>

      {/* TOMA 3 · las cuatro áreas */}
      <Toma t={t} a={m('areas')} b={m('documentas')}>
        {([['saber', 'Qué saber', 'Producto, metodología, personas', AZUL_M], ['hacer', 'Qué hacer', 'Pasos antes, durante y después', VIOLETA], ['decir', 'Qué decir', 'Mensaje, historias, preguntas', NARANJA], ['mostrar', 'Qué mostrar', 'Menos decks, más pizarra y video', ROSA]] as [N, string, string, string][]).map(([n, tit, sub, col], k) => t >= m(n) && (
          <g key={n} opacity={e1(t, m(n))}>
            <rect x={150 + (k % 2) * 460} y={190 + Math.floor(k / 2) * 200} width={440} height={170} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <rect x={150 + (k % 2) * 460} y={190 + Math.floor(k / 2) * 200} width={14} height={170} rx={7} fill={col} />
            <Txt f="a" x={190 + (k % 2) * 460} y={250 + Math.floor(k / 2) * 200} fontSize={30} fill={col} peso={700}>{tit}</Txt>
            <Txt f="a" x={190 + (k % 2) * 460} y={300 + Math.floor(k / 2) * 200} fontSize={22} fill={c.tenue}>{sub}</Txt>
          </g>
        ))}
        {t >= m('pollard') && <g opacity={e1(t, m('pollard'))}>{['Web', 'A pedido', 'Video', t >= m('perenne') ? 'Perenne' : ''].filter(Boolean).map((txt, k) => <Letrero key={txt} x={260 + k * 230} y={650} texto={txt} fondo={PIZARRA} id={ID} tam={24} />)}</g>}
      </Toma>

      {/* TOMA 4 · consistencia */}
      <Toma t={t} a={m('documentas')} b={m('matriz')}>
        <Suelo y={660} isDark={isDark} />
        {[0, 1, 2].map((k) => <Equipo key={k} id={ID} k="ven" x={220 + k * 140} y={660} s={0.55} t={t} nombre={false} />)}
        {t >= m('fans') && <g opacity={e1(t, m('fans'))}>{[0, 1, 2, 3].map((k) => <g key={k}><Persona id={ID} x={760 + k * 90} y={660 - 8 * Math.abs(Math.sin(t * 5 + k))} s={0.5} cuerpo={AZUL_M} /><path d={`M ${760 + k * 90} 560 l -22 -40 M ${760 + k * 90} 560 l 22 -40`} stroke="#f7c4a0" strokeWidth={8} strokeLinecap="round" /></g>)}<Letrero x={890} y={720} texto="Clientes que se vuelven fans" id={ID} tam={22} /></g>}
        <Letrero x={360} y={720} texto="Todos venden igual de bien" fondo={PIZARRA} id={ID} op={e1(t, m('documentas'))} tam={22} />
        {t >= m('contenidoEtapa') && <g opacity={e1(t, m('contenidoEtapa'))}>{[0, 1, 2].map((k) => <Hoja key={k} x={300 + k * 230} y={260} w={110} h={140} lineas={4} color={[AMBAR, NARANJA, ROSA][k]} />)}<Letrero x={530} y={460} texto="Contenido para cada etapa" fondo={AMBAR} id={ID} tam={22} /></g>}
      </Toma>

      {/* TOMA 5 · la matriz */}
      <Toma t={t} a={m('matriz')} b={fin + 1}>
        {(() => {
          const cols = [{ n: 'gerente' as N, tit: 'Persona', txt: 'Gerente de personas · 300', col: AZUL_M }, { n: 'dolorM' as N, tit: 'Dolor', txt: 'La rotación subió', col: ROJO_M }, { n: 'funcionM' as N, tit: 'Función', txt: 'Encuesta semanal', col: VIOLETA }, { n: 'piezas' as N, tit: 'Contenido', txt: 'Caso + pregunta', col: NARANJA }];
          const vacia = t >= m('celda');
          return (
            <g>
              {cols.map((cl, k) => (
                <g key={cl.tit} opacity={e1(t, m('matriz') + k * 0.2)}>
                  <rect x={90 + k * 260} y={200} width={240} height={60} rx={14} fill={cl.col} />
                  <Txt f="a" x={210 + k * 260} y={240} textAnchor="middle" fontSize={24} fill="#fff" peso={700}>{cl.tit}</Txt>
                  {[0, 1].map((r) => <rect key={r} x={90 + k * 260} y={280 + r * 120} width={240} height={100} rx={14} fill={vacia && r === 1 && k === 3 ? 'none' : c.panel} stroke={vacia && r === 1 && k === 3 ? ROJO_M : 'none'} strokeWidth={4} strokeDasharray="12 8" style={vacia && r === 1 && k === 3 ? undefined : sombra(c.sombra, 3, 8)} />)}
                  {t >= m(cl.n) && <Txt f="a" x={210 + k * 260} y={338} textAnchor="middle" fontSize={k === 0 ? 18 : 20} fill={c.texto} opacity={e1(t, m(cl.n))}>{cl.txt}</Txt>}
                  {k < 3 && t >= m(cols[k + 1].n) && <path d={`M ${330 + k * 260} 330 h 20`} stroke={c.tenue} strokeWidth={4} />}
                </g>
              ))}
              {t >= m('caso') && <g opacity={e1(t, m('caso'))}><Equipo id={ID} k="ser" x={330} y={720} s={0.5} t={t} nombre={false} /><Equipo id={ID} k="ven" x={870} y={720} s={0.5} t={t} nombre={false} />
                {t >= m('circuito') && <path d="M 380 640 C 500 580 700 580 820 640" stroke={ROJO_M} strokeWidth={6} fill="none" strokeDasharray="14 12" />}
                {t >= m('circuito') && <Cruz x={600} y={598} r={22} />}
                <Letrero x={600} y={790} texto="Las historias no llegan a ventas" fondo={ROJO_M} id={ID} tam={22} /></g>}
              {vacia && <Letrero x={990} y={540} texto="Celda vacía: el vendedor va solo" fondo={ROJO_M} id={ID} op={e1(t, m('celda'))} tam={20} ancla="end" />}
            </g>
          );
        })()}
      </Toma>
    </Lienzo>
  );
};
