import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Equipo, Rueda, Embudo, Flujo, Cruz, Rotulo, Persona, Txt, Hoja, Corazon, Moneda3D, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Del embudo al flywheel», en seis tomas (en el orden del audio).
 * 1 · El embudo tiene un final; el flywheel es un ciclo. Cada equipo de ops vigila su tramo (silos) y nadie mira el recorrido.
 * 2 · El embudo: cinco franjas, un prospecto que baja y sale como cliente; ahí termina. Lo que queda fuera
 *     (renovar, recomendar, referir) y la lealtad sin dueño.
 * 3 · El flywheel inbound: el contenido atrae, la primera línea convierte y los clientes felices lo cuentan; el
 *     boca a boca trae a los siguientes y el círculo vuelve a empezar.
 * 4 · La rueda: tres fases alrededor del crecimiento y el anillo exterior (desconocidos, prospectos, clientes, promotores).
 * 5 · Tres preguntas, una por fase: canales que atraen, puntos de contacto e indicadores del deleite (NPS).
 * 6 · Emmanuelle Skala: es un círculo; en SaaS hay renovaciones, recomendaciones y referidos. ¿Quién mira el ciclo?
 */

const ID = 'ro12';
const nombres = ['final', 'salen', 'ciclo', 'atraen', 'funcion', 'equipos', 'silos', 'optimiza', 'nadie', 'dos', 'cinco', 'angosta', 'baja', 'termina', 'razona', 'fondo', 'fuera', 'rrr', 'energia', 'lealtad', 'inbound', 'circulo', 'hubspot', 'contenido', 'convierten', 'cuentan', 'boca', 'nunca', 'flechas', 'anillo', 'desconocidos', 'promotores', 'impulso', 'punto', 'preguntas', 'atraer', 'web', 'pilares', 'locales', 'interactuar', 'facil', 'persona', 'tardas', 'deleitar', 'nps', 'reclamos', 'skala', 'circulo2', 'saas', 'rrr2', 'quien', 'pregunta'] as const;
type N = typeof nombres[number];

const FRANJAS = [
  { n: 'Atraer', color: '#fbbf24' }, { n: 'Interactuar', color: '#f59e0b' }, { n: 'Capturar', color: NARANJA },
  { n: 'Nutrir', color: '#f2604a' }, { n: 'Convertir', color: ROSA },
];

export const FlywheelRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Del embudo al flywheel'], [m('final'), 'El embudo tiene un final'], [m('ciclo'), 'El flywheel es un ciclo'],
    [m('funcion'), 'Cada ops mira su tramo'], [m('nadie'), 'Nadie mira el recorrido'],
    [m('cinco'), 'El embudo: cinco etapas'], [m('fuera'), 'Lo que queda fuera'],
    [m('inbound'), 'El flywheel: un círculo'], [m('cuentan'), 'El boca a boca'],
    [m('flechas'), 'Tres fases y el anillo'], [m('impulso'), 'La rueda gana impulso'],
    [m('preguntas'), 'Tres preguntas'], [m('atraer'), 'Atraer'], [m('interactuar'), 'Interactuar'], [m('deleitar'), 'Deleitar'],
    [m('skala'), 'Emmanuelle Skala'], [m('quien'), '¿Quién mira el ciclo?'],
  ];

  const vel = 18 + 50 * sm(t, m('impulso'), m('impulso') + 3);
  const giro = t * vel;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Del embudo al flywheel">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · final frente a ciclo; ops en silos */}
      <Toma t={t} a={-1} b={m('cinco')} zi={1}>
        <g opacity={e1(t, 0.3)}>
          <Embudo x={360} y={200} w={380} alto={80} franjas={FRANJAS.slice(0, 4).map((f) => ({ n: '', color: f.color }))} />
          {[0, 1, 2].map((k) => { const ph = (t * 0.35 + k / 3) % 1; return <circle key={k} cx={360 + 50 * (k - 1) * (1 - ph)} cy={lerp(160, 580, ph)} r={10} fill={ph > 0.85 ? NARANJA : '#94a3b8'} opacity={Math.min(1, ph * 5, (1 - ph) * 5)} />; })}
          {t >= m('salen') && <g opacity={e1(t, m('salen'))}><Persona id={ID} x={360} y={680} s={0.4} cuerpo={NARANJA} /><rect x={280} y={692} width={160} height={8} rx={4} fill={ROJO_M} /><Letrero x={360} y={745} texto="Fin" fondo={ROJO_M} id={ID} tam={24} /></g>}
        </g>
        {t >= m('ciclo') && (
          <g opacity={e1(t, m('ciclo'))}>
            <Rueda x={880} y={420} r={170} giro={giro} id={ID} rotulos={false} centro="" isDark={isDark} />
            {t >= m('atraen') && <Flujo x1={980} y1={230} x2={780} y2={230} t={t} n={4} vel={0.6} arco={50} color={NARANJA} r={9} />}
            <Letrero x={880} y={650} texto="Sin final" id={ID} />
          </g>
        )}
        {/* cada ops atento a su tramo */}
        {t >= m('funcion') && (
          <g opacity={e1(t, m('funcion'))}>
            <path d="M 70 230 L 170 200 L 170 330 Z" fill={AMBAR} opacity={0.25} />
            <Equipo id={ID} k="mkt" x={110} y={340} s={0.36} t={t} nombre={false} />
            {t >= m('equipos') && <g opacity={e1(t, m('equipos'))}><path d="M 70 400 L 170 370 L 170 520 Z" fill={NARANJA} opacity={0.25} /><Equipo id={ID} k="ven" x={110} y={520} s={0.36} t={t} nombre={false} /></g>}
            {t >= m('silos') && <g opacity={e1(t, m('silos'))}><rect x={50} y={190} width={130} height={160} rx={14} fill="#93c5fd" opacity={0.28} /><rect x={50} y={365} width={130} height={165} rx={14} fill="#93c5fd" opacity={0.28} /></g>}
          </g>
        )}
        {t >= m('optimiza') && <Letrero x={360} y={140} texto="Cada uno optimiza lo suyo" fondo={PIZARRA} id={ID} op={e1(t, m('optimiza'))} tam={24} />}
        {t >= m('nadie') && <Letrero x={600} y={820} texto="Nadie mira el recorrido completo" fondo={ROJO_M} id={ID} op={e1(t, m('nadie'))} />}
      </Toma>

      {/* TOMA 2 · el embudo en detalle */}
      <Toma t={t} a={m('cinco')} b={m('inbound')}>
        {(() => {
          const n = Math.round(lerp(0, 5, ac(t, m('cinco'), m('cinco') + 2.5)));
          const ph = sm(t, m('baja'), m('termina'));
          return (
            <g>
              <Embudo x={420} y={150} w={520} alto={82} franjas={FRANJAS.slice(0, n)} tam={26} />
              {t >= m('angosta') && Array.from({ length: 6 }, (_, k) => { const q = (t * 0.25 + k / 6) % 1; const sale = 0.2 + (k % 5) * 0.15; return q > sale ? null : <circle key={k} cx={420 + (k - 2.5) * 50 * (1 - q)} cy={lerp(130, 560, q)} r={9} fill="#94a3b8" opacity={Math.min(1, q * 6, (sale - q) * 8)} />; })}
              {t >= m('baja') && <circle cx={420} cy={lerp(130, 620, ph)} r={14} fill={NARANJA} />}
              {t >= m('termina') && <g opacity={e1(t, m('termina'))}><Persona id={ID} x={420} y={720} s={0.42} cuerpo={NARANJA} /><rect x={340} y={732} width={160} height={8} rx={4} fill={ROJO_M} /></g>}
              {t >= m('fondo') && <Letrero x={420} y={790} texto="El cliente: el fondo del embudo" fondo={PIZARRA} id={ID} op={e1(t, m('fondo'))} tam={24} />}
              {t >= m('fuera') && (
                <g opacity={e1(t, m('fuera'))}>
                  {['Renovar', 'Recomendar', 'Referir'].map((txt, k) => <g key={txt} opacity={t >= m('rrr') ? e1(t, m('rrr') + k * 0.4) : 0}>
                    <path d={`M 520 ${700 - k * 10} Q 720 ${680 - k * 90} 860 ${620 - k * 150}`} stroke="#94a3b8" strokeWidth={6} fill="none" strokeDasharray="10 10" />
                    <Letrero x={960} y={620 - k * 150} texto={txt} fondo="#94a3b8" id={ID} tam={24} />
                  </g>)}
                  <Cruz x={740} y={540} r={30} op={sm(t, m('energia'), m('energia') + 0.5)} />
                </g>
              )}
              {t >= m('lealtad') && <g opacity={e1(t, m('lealtad'))}><Corazon x={960} y={160} s={0.8} color="#94a3b8" /><Txt x={1010} y={180} fontSize={56} fill={c.tenue} peso={800}>?</Txt></g>}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 3 · el círculo inbound */}
      <Toma t={t} a={m('inbound')} b={m('flechas')}>
        {(() => {
          const P = (a: number): [number, number] => [600 + 280 * Math.cos(a), 470 + 250 * Math.sin(a)];
          const pasos = [
            { n: 'contenido' as N, a: -Math.PI / 2, txt: 'Contenido útil', col: AMBAR },
            { n: 'convierten' as N, a: Math.PI / 6, txt: 'Primera línea', col: NARANJA },
            { n: 'cuentan' as N, a: (5 * Math.PI) / 6, txt: 'Lo cuentan', col: ROSA },
          ];
          return (
            <g>
              {t >= m('circulo') && <circle cx={600} cy={470} r={265} fill="none" stroke={c.apagado} strokeWidth={14} strokeDasharray="22 16" strokeDashoffset={-t * 40} opacity={e1(t, m('circulo'))} />}
              {t >= m('inbound') && <Letrero x={600} y={470} texto="Enfoque inbound" id={ID} op={e1(t, m('inbound'))} />}
              {t >= m('hubspot') && <Letrero x={600} y={540} texto="HubSpot: el impulso" fondo={PIZARRA} id={ID} op={e1(t, m('hubspot'))} tam={22} />}
              {pasos.map((p, k) => { const [x, y] = P(p.a); return t >= m(p.n) && (
                <g key={p.txt} opacity={e1(t, m(p.n))}>
                  {k === 0 && <Hoja x={x - 30} y={y - 30} w={70} h={90} lineas={3} color={AMBAR} />}
                  {k === 1 && <Equipo id={ID} k="ven" x={x} y={y + 40} s={0.45} t={t} nombre={false} />}
                  {k === 2 && <g><Persona id={ID} x={x - 30} y={y + 40} s={0.4} cuerpo={AZUL_M} /><Persona id={ID} x={x + 40} y={y + 40} s={0.4} cuerpo={VERDE} /><Corazon x={x + 5} y={y - 60 - 5 * Math.sin(t * 4)} s={0.5} /></g>}
                  <Letrero x={x} y={y + (k === 0 ? 100 : 90)} texto={p.txt} fondo={p.col} id={ID} tam={22} />
                </g>
              ); })}
              {t >= m('boca') && <Flujo x1={P((5 * Math.PI) / 6)[0]} y1={P((5 * Math.PI) / 6)[1] - 40} x2={P(-Math.PI / 2)[0] - 60} y2={P(-Math.PI / 2)[1]} t={t} n={4} vel={0.5} arco={40} color={ROSA} r={9} />}
              {t >= m('nunca') && <Letrero x={600} y={820} texto="Nunca termina" id={ID} op={e1(t, m('nunca'))} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 4 · la rueda y el anillo exterior */}
      <Toma t={t} a={m('flechas')} b={m('preguntas')}>
        <Rueda x={600} y={470} r={200} giro={giro} id={ID} centro="Crecimiento" isDark={isDark} />
        {t >= m('anillo') && <circle cx={600} cy={470} r={270} fill="none" stroke={c.apagado} strokeWidth={4} strokeDasharray="6 12" opacity={e1(t, m('anillo'))} />}
        {t >= m('punto') && (() => { const a = t * 1.2; return <circle cx={600 + 270 * Math.cos(a)} cy={470 + 270 * Math.sin(a)} r={16} fill={NARANJA} />; })()}
        {(['Desconocidos', 'Prospectos', 'Clientes', 'Promotores'] as const).map((txt, k) => {
          const t0 = k < 2 ? m('desconocidos') + k * 0.6 : k === 2 ? m('promotores') - 0.6 : m('promotores');
          const a = -Math.PI / 2 + (k * Math.PI) / 2;
          return t >= t0 && <g key={txt} opacity={e1(t, t0)}><Letrero x={600 + 380 * Math.cos(a)} y={470 + 320 * Math.sin(a) + (k === 0 ? -20 : k === 2 ? 20 : 0)} texto={txt} fondo={[PIZARRA, AMBAR, NARANJA, ROSA][k]} id={ID} tam={24} /></g>;
        })}
        {t >= m('impulso') && <Letrero x={600} y={830} texto="Gana impulso" id={ID} op={e1(t, m('impulso'))} />}
      </Toma>

      {/* TOMA 5 · las tres preguntas */}
      <Toma t={t} a={m('preguntas')} b={m('skala')}>
        {(() => {
          const fase = t >= m('deleitar') ? 2 : t >= m('interactuar') ? 1 : t >= m('atraer') ? 0 : -1;
          return (
            <g>
              <Rueda x={290} y={470} r={170} giro={giro * 0.5} id={ID} activo={fase} centro="" isDark={isDark} />
              {fase === 0 && ([['web', 'Sitio web y redes', AMBAR], ['web', 'Directorios', TEAL], ['pilares', 'Páginas pilares', NARANJA], ['locales', 'Cupones en tienda', VIOLETA]] as [N, string, string][]).map(([n, txt, col], k) => t >= m(n) && (
                <g key={txt} opacity={e1(t, m(n) + (k === 1 ? 0.8 : 0))}>
                  <rect x={600} y={200 + k * 130} width={460} height={96} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                  <rect x={622} y={224 + k * 130} width={48} height={48} rx={12} fill={col} />
                  <Txt f="a" x={694} y={258 + k * 130} fontSize={26} fill={c.texto}>{txt}</Txt>
                </g>
              ))}
              {fase === 1 && (
                <g opacity={e1(t, m('interactuar'))}>
                  <Persona id={ID} x={770} y={720} s={0.7} cuerpo={AZUL_M} />
                  {t >= m('facil') && <Letrero x={830} y={240} texto="¿Encuentra respuestas?" fondo={PIZARRA} id={ID} op={e1(t, m('facil'))} tam={22} />}
                  {t >= m('persona') && <g opacity={e1(t, m('persona'))}><rect x={890} y={420} width={170} height={110} rx={16} fill={c.panel} style={sombra(c.sombra, 3, 8)} /><rect x={910} y={490} width={130} height={26} rx={13} fill={VERDE} /><Txt f="a" x={975} y={509} textAnchor="middle" fontSize={20} fill="#fff">Comprar</Txt><Letrero x={975} y={340} texto="¿Puede solo?" fondo={VERDE} id={ID} tam={22} /></g>}
                  {t >= m('tardas') && <g opacity={e1(t, m('tardas'))}><circle cx={640} cy={420} r={56} fill="#fff" /><circle cx={640} cy={420} r={56} fill="none" stroke={NARANJA} strokeWidth={8} /><line x1={640} y1={420} x2={640 + 38 * Math.cos(t * 3)} y2={420 + 38 * Math.sin(t * 3)} stroke="#334155" strokeWidth={6} strokeLinecap="round" /></g>}
                </g>
              )}
              {fase === 2 && (
                <g opacity={e1(t, m('deleitar'))}>
                  <Persona id={ID} x={740} y={660} s={0.7} cuerpo={AZUL_M} />
                  <Corazon x={740} y={420 - 6 * Math.sin(t * 4)} s={1} />
                  {t >= m('nps') && (() => { const v = sm(t, m('nps'), m('nps') + 2) * 0.72; return (
                    <g opacity={e1(t, m('nps'))} transform="translate(980 580)">
                      <rect x={-22} y={-330} width={44} height={330} rx={22} fill={c.panel2} />
                      <rect x={-14} y={-322 + 314 * (1 - v)} width={28} height={314 * v} rx={14} fill={`url(#${ID}-marca)`} />
                      <circle cy={10} r={36} fill={ROSA} />
                      <Letrero x={0} y={80} texto="NPS" fondo={ROSA} id={ID} tam={26} />
                    </g>
                  ); })()}
                  {t >= m('reclamos') && <Letrero x={740} y={740} texto="Recompras y reclamos" fondo={PIZARRA} id={ID} op={e1(t, m('reclamos'))} tam={22} />}
                </g>
              )}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 6 · Skala: es un círculo */}
      <Toma t={t} a={m('skala')} b={fin + 1}>
        {t >= m('circulo2') && <g opacity={e1(t, m('circulo2'))}>
          <circle cx={420} cy={450} r={200} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={22} strokeDasharray="40 18" strokeDashoffset={-t * 60} />
          <Persona id={ID} x={420} y={540} s={0.8} cuerpo={AZUL_M} />
        </g>}
        {t >= m('saas') && <Letrero x={420} y={160} texto="En SaaS no hay final" fondo={PIZARRA} id={ID} op={e1(t, m('saas'))} />}
        {t >= m('rrr2') && ['Renovaciones', 'Recomendaciones', 'Referidos'].map((txt, k) => { const a = Math.PI / 6 + k * 1.2; return <g key={txt} opacity={e1(t, m('rrr2') + k * 0.4)}><Letrero x={420 + 250 * Math.cos(a) + (k === 2 ? -30 : 0)} y={450 + 230 * Math.sin(a)} texto={txt} fondo={[VERDE, VIOLETA, AZUL_M][k]} id={ID} tam={24} /></g>; })}
        {t >= m('quien') && <g opacity={e1(t, m('quien'))}><Equipo id={ID} k="ops" x={930} y={600} s={0.75} t={t} nombre="RevOps" /><Txt x={1010} y={380} fontSize={90} fill={NARANJA} peso={800}>?</Txt></g>}
      </Toma>
    </Lienzo>
  );
};
