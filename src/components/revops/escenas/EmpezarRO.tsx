import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Bloque, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Reloj, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Por dónde empezar: los datos que ya tienes», en cinco tomas.
 * 1 · No se empieza cambiando procesos (la llave se guarda) sino mirando los datos; cuatro plataformas
 *     ascendentes y una partícula que las recorre.
 * 2 · Instrumentar: sensores en cada etapa del recorrido; la ficha del cliente se arma con de dónde viene y qué quiere.
 * 3 · Entender antes de cambiar: la lupa recorre la base de cuentas y marca duplicados y registros limpios.
 * 4 · Dar consistencia: después de la venta (incorporación, primer uso, renovación) las preguntas se vuelven números.
 * 5 · Mirar desde el cliente: un taller con marketing, ventas, éxito y producto alrededor del cliente; todos
 *     quieren ayudarlo, cada uno a su manera, hasta que tiran hacia el mismo lado.
 */

const ID = 'ro08';
const nombres = ['datos', 'noCambies', 'mirando', 'plataformas', 'particula', 'instrumentar', 'prioridad', 'capturar', 'keshian', 'medir', 'vista', 'viene', 'entender', 'covey', 'base', 'ingresa', 'duplicado', 'limpio', 'robinson', 'desordenada', 'consistencia', 'ventaNueva', 'despues', 'incorporaron', 'primerUso', 'renovaron', 'mismas', 'cliente', 'lograr', 'taller', 'malas', 'manera', 'pregunta'] as const;
type N = typeof nombres[number];

const PASOS = [
  { txt: 'Instrumentar', color: NARANJA },
  { txt: 'Entender', color: ROSA },
  { txt: 'Consistencia', color: VIOLETA },
  { txt: 'Desde el cliente', color: AZUL_M },
];

export const EmpezarRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Los datos que ya tienes'], [m('noCambies'), 'No empieces cambiando procesos'], [m('plataformas'), 'Cuatro pasos'],
    [m('instrumentar'), '1 · Instrumentar'], [m('vista'), 'Una vista del cliente'],
    [m('entender'), '2 · Entender antes de cambiar'], [m('robinson'), 'Sin datos limpios, nadie conforme'],
    [m('consistencia'), '3 · Dar consistencia'], [m('mismas'), 'Mismas definiciones'],
    [m('cliente'), '4 · Mirar desde el cliente'], [m('malas'), 'No son malas personas'],
  ];

  /* Toma 1 · plataformas ascendentes */
  const P = (k: number): [number, number] => [240 + k * 240, 640 - k * 90];
  const recorre = sm(t, m('particula'), m('particula') + 3.5);
  const seg = Math.min(2.999, recorre * 3), kk = Math.floor(seg), ff = seg - kk;
  const [ax, ay] = P(kk), [bx, by] = P(kk + 1);
  const px = lerp(ax, bx, ff), py = lerp(ay, by, ff) - 60 - 70 * Math.sin(Math.PI * ff);

  /* Toma 3 · la base de cuentas */
  const filas = [
    { txt: 'Acme · contacto', est: 0 }, { txt: 'ACME S.A. · contacto', est: 1 }, { txt: 'Lumen · sin región', est: 2 },
    { txt: 'Orbe · completo', est: 0 }, { txt: 'Orbe · completo', est: 1 }, { txt: 'Tauro · completo', est: 0 },
  ];
  const lupa = sm(t, m('base'), m('robinson'));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Por dónde empezar: los datos que ya tienes">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · antes de tocar procesos, mirar los datos */}
      <Toma t={t} a={-1} b={m('instrumentar')} zi={1}>
        {t < m('plataformas') && (
          <g opacity={1 - ac(t, m('plataformas') - 0.5, m('plataformas'))}>
            <Suelo y={680} isDark={isDark} x0={200} x1={1000} />
            <Equipo id={ID} k="ops" x={360} y={680} s={0.85} t={t} nombre="Tú" />
            {/* llave de cambiar procesos que se guarda */}
            {t >= m('noCambies') && (
              <g opacity={e1(t, m('noCambies'))} transform={`translate(${lerp(560, 520, sm(t, m('noCambies') + 1, m('noCambies') + 2))} 420)`}>
                <path d="M -10 -70 h 20 v 90 h -20 Z" fill="#94a3b8" /><circle cx={0} cy={-80} r={30} fill="#94a3b8" /><circle cx={0} cy={-80} r={12} fill={c.panel} />
                <Cruz x={40} y={-110} r={26} op={sm(t, m('noCambies') + 0.6, m('noCambies') + 1)} />
              </g>
            )}
            {/* tablero de datos que se mira */}
            {t >= m('mirando') && (
              <g opacity={e1(t, m('mirando'))}>
                <rect x={640} y={300} width={300} height={220} rx={20} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
                {[0, 1, 2, 3].map((j) => { const h = 40 + 30 * j + 10 * Math.sin(t * 2 + j); return <rect key={j} x={680 + j * 62} y={480 - h} width={40} height={h} rx={8} fill={[AMBAR, NARANJA, ROSA, VIOLETA][j]} />; })}
                <Letrero x={790} y={570} texto="Los datos que existen" id={ID} tam={24} />
              </g>
            )}
          </g>
        )}
        {t >= m('plataformas') && (
          <g opacity={e1(t, m('plataformas'))}>
            {PASOS.map((p, k) => { const [x, y] = P(k); return <g key={p.txt} opacity={e1(t, m('plataformas') + k * 0.3)}>
              <Bloque x={x} y={y} w={200} h={60} color={p.color} alto={20 + k * 10} />
              <Txt x={x} y={y - 40 - k * 10} textAnchor="middle" fontSize={40} fill={p.color} peso={800}>{k + 1}</Txt>
              <Letrero x={x} y={y + 120} texto={p.txt} fondo={p.color} id={ID} tam={24} />
            </g>; })}
            {t >= m('particula') && <circle cx={px} cy={py} r={16} fill="#fff" stroke={`url(#${ID}-marca)`} strokeWidth={8} />}
          </g>
        )}
      </Toma>

      {/* TOMA 2 · instrumentar */}
      <Toma t={t} a={m('instrumentar')} b={m('entender')}>
        {(() => {
          const etapas = ['Visita', 'Lead', 'Oportunidad', 'Cliente'];
          const medidos = Math.round(lerp(0, 4, ac(t, m('capturar'), m('medir') + 1)));
          return (
            <g>
              <rect x={150} y={398} width={900} height={14} rx={7} fill={c.apagado} />
              {etapas.map((e, k) => (
                <g key={e}>
                  <circle cx={200 + k * 266} cy={405} r={34} fill={k < medidos ? NARANJA : c.panel2} />
                  <Txt f="a" x={200 + k * 266} y={480} textAnchor="middle" fontSize={24} fill={c.texto}>{e}</Txt>
                  {k < medidos && <g transform={`translate(${200 + k * 266} 300)`}>
                    <rect x={-34} y={-30} width={68} height={50} rx={10} fill={PIZARRA} />
                    <path d={`M -22 8 A 24 24 0 0 1 22 8`} stroke="#fff" strokeWidth={4} fill="none" />
                    <line x1={0} y1={8} x2={18 * Math.cos(-Math.PI / 2 + Math.sin(t * 2 + k))} y2={8 + 18 * Math.sin(-Math.PI / 2 + Math.sin(t * 2 + k))} stroke={NARANJA} strokeWidth={4} strokeLinecap="round" />
                    <rect x={-3} y={20} width={6} height={40} fill={PIZARRA} />
                  </g>}
                </g>
              ))}
              {t >= m('prioridad') && <Letrero x={600} y={200} texto="Prioridad número uno" id={ID} op={e1(t, m('prioridad')) * (1 - ac(t, m('vista') - 0.4, m('vista')))} />}
              {(() => { const ph = (t * 0.25) % 1; return <circle cx={lerp(150, 1050, ph)} cy={405} r={12} fill={AZUL_M} />; })()}
              {t >= m('keshian') && <g opacity={e1(t, m('keshian'))}><Letrero x={600} y={560} texto="«Lo primero: medirlo todo»" fondo={PIZARRA} id={ID} /></g>}
              {/* ficha consolidada del cliente */}
              {t >= m('vista') && (
                <g opacity={e1(t, m('vista'))} transform="translate(600 690)">
                  <rect x={-260} y={-60} width={520} height={140} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
                  <Persona id={ID} x={-190} y={60} s={0.42} cuerpo={AZUL_M} />
                  <Txt f="a" x={-120} y={-14} fontSize={24} fill={c.texto} peso={700}>Una sola vista del cliente</Txt>
                  {t >= m('viene') && <Txt f="a" x={-120} y={24} fontSize={22} fill={c.tenue} opacity={e1(t, m('viene'))}>Viene de un webinar</Txt>}
                </g>
              )}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 3 · entender: la base de cuentas */}
      <Toma t={t} a={m('entender')} b={m('consistencia')}>
        {t >= m('covey') && <Letrero x={600} y={150} texto="«Primero busca entender»" fondo={PIZARRA} id={ID} op={e1(t, m('covey'))} />}
        {t >= m('base') && (
          <g opacity={e1(t, m('base'))}>
            <rect x={250} y={220} width={700} height={430} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            {filas.map((f, k) => {
              const y = 270 + k * 64;
              const visto = lupa * 6 > k + 0.5;
              const marca = visto && ((f.est === 1 && t >= m('duplicado')) || (f.est === 0 && t >= m('limpio')) || (f.est === 2 && t >= m('ingresa')));
              return (
                <g key={k}>
                  <rect x={280} y={y - 26} width={640} height={52} rx={12} fill={marca ? (f.est === 0 ? VERDE : f.est === 1 ? ROJO_M : AMBAR) : c.panel2} opacity={marca ? 0.2 : 1} />
                  <Txt f="a" x={310} y={y + 8} fontSize={24} fill={c.texto}>{f.txt}</Txt>
                  {marca && (f.est === 0 ? <Visto x={880} y={y} r={18} /> : f.est === 1 ? <Cruz x={880} y={y} r={18} /> : <circle cx={880} cy={y} r={18} fill={AMBAR} />)}
                </g>
              );
            })}
            {/* la lupa */}
            {(() => { const y = 270 + lupa * 5 * 64; return <g transform={`translate(${740} ${y})`}><circle r={52} fill="#bfdbfe" opacity={0.35} /><circle r={52} fill="none" stroke={PIZARRA} strokeWidth={10} /><rect x={36} y={30} width={18} height={60} rx={8} fill={PIZARRA} transform="rotate(-45 36 30)" /></g>; })()}
            <g>
              {t >= m('ingresa') && <Letrero x={360} y={700} texto="¿Quién ingresa?" fondo={AMBAR} id={ID} op={e1(t, m('ingresa'))} tam={24} />}
              {t >= m('duplicado') && <Letrero x={600} y={700} texto="Duplicado" fondo={ROJO_M} id={ID} op={e1(t, m('duplicado'))} tam={24} />}
              {t >= m('limpio') && <Letrero x={810} y={700} texto="Limpio" fondo={VERDE} id={ID} op={e1(t, m('limpio'))} tam={24} />}
            </g>
          </g>
        )}
        {t >= m('robinson') && (
          <g opacity={e1(t, m('robinson'))}>
            <rect x={250} y={740} width={700} height={70} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            <Txt f="a" x={600} y={784} textAnchor="middle" fontSize={24} fill={c.texto}>Sin datos limpios, ni marketing ni los BDR conformes</Txt>
          </g>
        )}
      </Toma>

      {/* TOMA 4 · consistencia después de la venta */}
      <Toma t={t} a={m('consistencia')} b={m('cliente')}>
        {(() => {
          const hitos: { n: N; txt: string; val: string }[] = [
            { n: 'ventaNueva', txt: 'Venta', val: '120' },
            { n: 'incorporaron', txt: 'Incorporados', val: '104' },
            { n: 'primerUso', txt: 'Primer uso', val: '88' },
            { n: 'renovaron', txt: 'Renovaron', val: '79' },
          ];
          const regla = sm(t, m('mismas'), m('mismas') + 1.5);
          return (
            <g>
              <rect x={140} y={455} width={920} height={10} rx={5} fill={c.apagado} />
              {t >= m('despues') && <rect x={330} y={455} width={730} height={10} rx={5} fill={VIOLETA} opacity={e1(t, m('despues')) * 0.6} />}
              {hitos.map((h, k) => {
                const x = 200 + k * 260;
                const on = t >= m(h.n);
                const conoce = k === 0 ? on : on && regla > 0.5;
                return (
                  <g key={h.txt} opacity={on ? e1(t, m(h.n)) : 0.25}>
                    <circle cx={x} cy={460} r={30} fill={k === 0 ? NARANJA : VIOLETA} />
                    <Txt f="a" x={x} y={540} textAnchor="middle" fontSize={24} fill={c.texto}>{h.txt}</Txt>
                    <rect x={x - 70} y={290} width={140} height={100} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                    <Txt x={x} y={360} textAnchor="middle" fontSize={50} fill={conoce ? (k === 0 ? NARANJA : VIOLETA) : c.tenue} peso={800}>{conoce ? h.val : '?'}</Txt>
                  </g>
                );
              })}
              {t >= m('ventaNueva') && <Letrero x={200} y={220} texto="Claro" fondo={VERDE} id={ID} op={e1(t, m('ventaNueva'))} tam={24} />}
              {t >= m('despues') && <Letrero x={720} y={220} texto="¿Y después?" fondo={PIZARRA} id={ID} op={e1(t, m('despues')) * (1 - regla)} tam={24} />}
              {/* la misma regla antes y después */}
              {regla > 0.01 && (
                <g opacity={regla} transform={`translate(${lerp(140, 160, regla)} 620)`}>
                  <rect x={0} y={0} width={880} height={60} rx={10} fill={AMBAR} />
                  {Array.from({ length: 23 }, (_, k) => <rect key={k} x={20 + k * 38} y={0} width={4} height={k % 5 === 0 ? 34 : 20} fill="#78350f" />)}
                  <Letrero x={440} y={110} texto="Mismas definiciones antes y después" id={ID} />
                </g>
              )}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 5 · mirar desde el cliente */}
      <Toma t={t} a={m('cliente')} b={fin + 1}>
        {(() => {
          const alinea = sm(t, m('manera'), m('manera') + 2);
          const quien = [
            { k: 'mkt' as const, x: 260, y: 470, txt: 'Marketing' }, { k: 'ven' as const, x: 940, y: 470, txt: 'Ventas' },
            { k: 'ser' as const, x: 300, y: 760, txt: 'Éxito' }, { k: 'ops' as const, x: 900, y: 760, txt: 'Producto' },
          ];
          return (
            <g>
              <Persona id={ID} x={600} y={560} s={0.85} cuerpo={AZUL_M} />
              {t >= m('lograr') && <g opacity={e1(t, m('lograr'))}><Letrero x={600} y={230} texto="¿Qué intenta lograr?" fondo={AZUL_M} id={ID} /></g>}
              {t >= m('taller') && quien.map((q, k) => (
                <g key={q.k} opacity={e1(t, m('taller') + k * 0.3)}>
                  <Equipo id={ID} k={q.k} x={q.x} y={q.y} s={0.5} t={t} nombre={q.txt} tam={22} />
                  {t >= m('malas') && (() => {
                    const ang0 = Math.atan2(470 - (q.y - 50), 600 - q.x) + (k % 2 ? 0.7 : -0.7) * (1 - alinea);
                    const x2 = q.x + Math.cos(ang0) * 170, y2 = q.y - 50 + Math.sin(ang0) * 170;
                    return <line x1={q.x + Math.cos(ang0) * 60} y1={q.y - 50 + Math.sin(ang0) * 60} x2={x2} y2={y2} stroke={q.k === 'mkt' ? AMBAR : q.k === 'ven' ? NARANJA : q.k === 'ser' ? TEAL : VIOLETA} strokeWidth={8} strokeLinecap="round" opacity={e1(t, m('malas'))} />;
                  })()}
                </g>
              ))}
              {t >= m('malas') && <Letrero x={600} y={150} texto="Todos quieren ayudar" fondo={PIZARRA} id={ID} op={e1(t, m('malas')) * (1 - alinea)} />}
              {alinea > 0.5 && <Letrero x={600} y={150} texto="Mismo cliente, misma dirección" id={ID} op={sm(alinea, 0.5, 1)} />}
            </g>
          );
        })()}
      </Toma>
    </Lienzo>
  );
};
