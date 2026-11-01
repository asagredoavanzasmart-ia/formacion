import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Equipo, Rueda, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Lead, Monitor, Corazon, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Un flywheel de ejemplo», en seis tomas.
 * 1 · La rueda al centro y cuatro fichas alrededor (herramienta, equipo, métrica, indicador); un punto sale hacia cada una.
 * 2 · Atraer: 20.000 visitas, el 2 % deja sus datos: 400 MQL. La palanca: con 3 %, 600 sin una visita más.
 * 3 · Interactuar: 400 MQL → 100 SQL → 25 negocios (uno de cada cuatro). Aquí vive la junta marketing–ventas.
 * 4 · Deleitar: el medidor de NPS (de −100 a 100) marca 45 y nueve de cada diez renuevan.
 * 5 · Promotores: uno de cada cinco clientes nuevos llega recomendado; esa energía vuelve a la rueda.
 * 6 · Leído completo: cada fase con dueño y número; el número de una es la entrada de la siguiente; la ficha vacía es fricción.
 */

const ID = 'ro16';
const nombres = ['mapeado', 'herramienta', 'equipo', 'metrica', 'indicador', 'ilustrativas', 'centro', 'cuatro', 'atraer', 'mkt', 'mql400', 'palanca', 'interactuar', 'ven', 'cierre', 'ganados', 'sql', 'cuatro4', 'junta', 'deleitar', 'npsRet', 'nps45', 'renuevan', 'detractores', 'promotores', 'referidos', 'cinco', 'energia', 'leido', 'dueno', 'entrada', 'sinMetrica', 'pregunta'] as const;
type N = typeof nombres[number];

const FASES = [
  { txt: 'Atraer', col: '#f59e0b', dato: '400 MQL' },
  { txt: 'Interactuar', col: NARANJA, dato: '25 negocios' },
  { txt: 'Deleitar', col: ROSA, dato: 'NPS 45' },
  { txt: 'Promotores', col: VIOLETA, dato: '1 de cada 5' },
];

export const MapaRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Un flywheel de ejemplo'], [m('herramienta'), 'Herramienta, equipo, métrica'], [m('ilustrativas'), 'Cifras ilustrativas'],
    [m('atraer'), 'Atraer'], [m('palanca'), 'La tasa es la palanca'], [m('interactuar'), 'Interactuar'], [m('junta'), 'La junta marketing–ventas'],
    [m('deleitar'), 'Deleitar'], [m('promotores'), 'Promotores'], [m('leido'), 'Leído completo'],
  ];

  const pos = (k: number): [number, number] => [[300, 260], [900, 260], [900, 680], [300, 680]][k] as [number, number];
  const Ficha = ({ k, vacia = false }: { k: number; vacia?: boolean }) => {
    const [x, y] = pos(k);
    const f = FASES[k];
    return (
      <g>
        <rect x={x - 190} y={y - 70} width={380} height={140} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
        <rect x={x - 190} y={y - 70} width={14} height={140} rx={7} fill={f.col} />
        <Txt f="a" x={x - 150} y={y - 18} fontSize={26} fill={f.col} peso={700}>{f.txt}</Txt>
        <Txt x={x - 150} y={y + 36} fontSize={vacia ? 30 : 40} fill={vacia ? c.tenue : c.texto} peso={800}>{vacia ? '¿ ?' : f.dato}</Txt>
      </g>
    );
  };

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Un flywheel de ejemplo">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · la rueda y las cuatro fichas */}
      <Toma t={t} a={-1} b={m('atraer')} zi={1}>
        <Rueda x={600} y={470} r={150} giro={t * 25} id={ID} isDark={isDark} centro="" />
        {([['herramienta', 'Herramienta', AMBAR], ['equipo', 'Equipo', NARANJA], ['metrica', 'Métrica', ROSA], ['indicador', 'Indicador', VIOLETA]] as [N, string, string][]).map(([n, txt, col], k) => t >= m(n) && t < m('cuatro') && (
          <g key={n} opacity={e1(t, m(n)) * (1 - ac(t, m('cuatro') - 0.4, m('cuatro')))}><Letrero x={[300, 900, 900, 300][k]} y={[260, 260, 680, 680][k]} texto={txt} fondo={col} id={ID} /></g>
        ))}
        {t >= m('ilustrativas') && <Letrero x={600} y={820} texto="Cifras ilustrativas" fondo={PIZARRA} id={ID} op={e1(t, m('ilustrativas'))} tam={24} />}
        {t >= m('cuatro') && FASES.map((_, k) => {
          const [x, y] = pos(k);
          return <g key={k} opacity={e1(t, m('cuatro') + k * 0.3)}>
            <Ficha k={k} />
            <Flujo x1={600} y1={470} x2={x} y2={y} t={t + k * 0.25} n={2} vel={0.5} arco={0} color={FASES[k].col} r={8} />
          </g>;
        })}
      </Toma>

      {/* TOMA 2 · Atraer */}
      <Toma t={t} a={m('atraer')} b={m('interactuar')}>
        {(() => {
          const tasa = t >= m('palanca') ? lerp(2, 3, sm(t, m('palanca') + 0.5, m('palanca') + 2)) : 2;
          return (
            <g>
              <Ficha k={0} />
              <g transform="translate(300 400)">
                <Txt f="a" x={0} y={30} textAnchor="middle" fontSize={22} fill={c.tenue}>Blog · SEO · anuncios</Txt>
              </g>
              {t >= m('mkt') && <Equipo id={ID} k="mkt" x={300} y={720} s={0.5} t={t} nombre={false} />}
              {t >= m('mql400') && (
                <g opacity={e1(t, m('mql400'))}>
                  {/* visitas que llegan y unas pocas se vuelven MQL */}
                  {Array.from({ length: 30 }, (_, k) => { const ph = (t * 0.25 + k / 30) % 1; const es = k % 50 < tasa * 1.5; return <circle key={k} cx={lerp(560, 1060, ph)} cy={300 + ((k * 37) % 220)} r={es ? 12 : 7} fill={es ? NARANJA : '#94a3b8'} opacity={Math.min(1, ph * 5, (1 - ph) * 5)} />; })}
                  <rect x={620} y={560} width={420} height={210} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
                  <Txt f="a" x={650} y={606} fontSize={24} fill={c.tenue}>20.000 visitas</Txt>
                  <Txt x={650} y={660} fontSize={36} fill={NARANJA} peso={800}>× {tasa.toFixed(1).replace('.', ',')} %</Txt>
                  <Txt x={650} y={740} fontSize={44} fill={c.texto} peso={800}>= {Math.round(20000 * tasa / 100)} MQL</Txt>
                </g>
              )}
              {t >= m('palanca') && <Letrero x={830} y={230} texto="Sin una visita más" fondo={VERDE} id={ID} op={e1(t, m('palanca') + 1)} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 3 · Interactuar */}
      <Toma t={t} a={m('interactuar')} b={m('deleitar')}>
        <Ficha k={1} />
        {t >= m('ven') && <Equipo id={ID} k="ven" x={900} y={720} s={0.5} t={t} nombre={false} />}
        {([['ganados', 400, 'MQL', AMBAR], ['sql', 100, 'SQL', NARANJA], ['cuatro4', 25, 'Ganados', ROSA]] as [N, number, string, string][]).map(([n, v, txt, col], k) => {
          const u = sm(t, m(n), m(n) + 1);
          const h = 360 * Math.sqrt(v / 400) * u;
          return t >= m(n) && (
            <g key={txt} opacity={e1(t, m(n))}>
              <rect x={150 + k * 160} y={760 - h} width={120} height={h} rx={14} fill={col} />
              <Txt x={210 + k * 160} y={745 - h} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>{v}</Txt>
              <Txt f="a" x={210 + k * 160} y={800} textAnchor="middle" fontSize={22} fill={c.tenue}>{txt}</Txt>
            </g>
          );
        })}
        {t >= m('cuatro4') && <Letrero x={370} y={150} texto="Se cierra 1 de cada 4" id={ID} op={e1(t, m('cuatro4') + 0.6)} tam={24} />}
        {t >= m('junta') && <Letrero x={900} y={460} texto="La junta marketing–ventas" fondo={PIZARRA} id={ID} op={e1(t, m('junta'))} tam={24} />}
      </Toma>

      {/* TOMA 4 · Deleitar */}
      <Toma t={t} a={m('deleitar')} b={m('promotores')}>
        <Ficha k={2} />
        {t >= m('npsRet') && (() => {
          const v = t >= m('nps45') ? 45 * sm(t, m('nps45'), m('nps45') + 1.5) : 0;
          const ang = Math.PI * (1 - (v + 100) / 200);
          return (
            <g opacity={e1(t, m('npsRet'))} transform="translate(330 470)">
              <path d="M -200 0 A 200 200 0 0 1 200 0" fill="none" stroke={c.apagado} strokeWidth={34} />
              <path d="M -200 0 A 200 200 0 0 1 0 -200" fill="none" stroke={ROJO_M} strokeWidth={34} opacity={0.5} />
              <path d="M 0 -200 A 200 200 0 0 1 200 0" fill="none" stroke={VERDE} strokeWidth={34} opacity={0.6} />
              <line x1={0} y1={0} x2={170 * Math.cos(ang)} y2={-170 * Math.sin(ang)} stroke={c.texto} strokeWidth={10} strokeLinecap="round" />
              <circle r={16} fill={c.texto} />
              <Txt f="a" x={-200} y={50} textAnchor="middle" fontSize={22} fill={c.tenue}>−100</Txt>
              <Txt f="a" x={200} y={50} textAnchor="middle" fontSize={22} fill={c.tenue}>100</Txt>
              <Txt x={0} y={90} textAnchor="middle" fontSize={56} fill={c.texto} peso={800}>{Math.round(v)}</Txt>
            </g>
          );
        })()}
        {t >= m('renuevan') && <g opacity={e1(t, m('renuevan'))}>{Array.from({ length: 10 }, (_, k) => <Persona key={k} id={ID} x={660 + (k % 5) * 90} y={k < 5 ? 260 : 420} s={0.32} cuerpo={k < 9 ? VERDE : '#94a3b8'} />)}<Letrero x={840} y={480} texto="9 de 10 renuevan" fondo={VERDE} id={ID} tam={24} /></g>}
        {t >= m('detractores') && <Letrero x={330} y={620} texto="Promotores − detractores" fondo={PIZARRA} id={ID} op={e1(t, m('detractores'))} tam={24} />}
      </Toma>

      {/* TOMA 5 · Promotores */}
      <Toma t={t} a={m('promotores')} b={m('leido')}>
        <Ficha k={3} />
        <Rueda x={850} y={420} r={170} giro={t * 40} id={ID} isDark={isDark} centro="" />
        {t >= m('cinco') && (
          <g opacity={e1(t, m('cinco'))}>
            {[0, 1, 2, 3, 4].map((k) => <Persona key={k} id={ID} x={160 + k * 75} y={480} s={0.34} cuerpo={k === 0 ? VIOLETA : '#94a3b8'} />)}
            <Corazon x={160} y={370 - 5 * Math.sin(t * 4)} s={0.5} />
            <Letrero x={310} y={540} texto="Llega recomendado" fondo={VIOLETA} id={ID} tam={24} />
          </g>
        )}
        {t >= m('energia') && <g opacity={e1(t, m('energia'))}><Flujo x1={400} y1={680} x2={720} y2={560} t={t} n={4} vel={0.6} arco={60} color={VIOLETA} r={9} /><Letrero x={850} y={680} texto="Vuelve a la rueda" id={ID} tam={24} /></g>}
      </Toma>

      {/* TOMA 6 · leído completo */}
      <Toma t={t} a={m('leido')} b={fin + 1}>
        <Rueda x={600} y={470} r={120} giro={t * 25} id={ID} isDark={isDark} centro="" />
        {FASES.map((_, k) => <g key={k} opacity={e1(t, m('leido') + k * 0.2)}><Ficha k={k} vacia={k === 2 && t >= m('sinMetrica')} /></g>)}
        {t >= m('entrada') && [0, 1, 2, 3].map((k) => { const [x1, y1] = pos(k), [x2, y2] = pos((k + 1) % 4); return <Flujo key={k} x1={x1 + (x2 > x1 ? 190 : x2 < x1 ? -190 : 0)} y1={y1 + (y2 > y1 ? 70 : y2 < y1 ? -70 : 0)} x2={x2 + (x2 > x1 ? -190 : x2 < x1 ? 190 : 0)} y2={y2 + (y2 > y1 ? -70 : y2 < y1 ? 70 : 0)} t={t + k * 0.2} n={3} vel={0.5} arco={0} color={NARANJA} r={8} op={e1(t, m('entrada'))} />; })}
        {t >= m('dueno') && <Letrero x={600} y={150} texto="Cada fase: un dueño y un número" id={ID} op={e1(t, m('dueno')) * (1 - ac(t, m('sinMetrica') - 0.3, m('sinMetrica')))} tam={24} />}
        {t >= m('sinMetrica') && <Letrero x={600} y={150} texto="Sin métrica: ahí está la fricción" fondo={ROJO_M} id={ID} op={e1(t, m('sinMetrica'))} tam={24} />}
      </Toma>
    </Lienzo>
  );
};
