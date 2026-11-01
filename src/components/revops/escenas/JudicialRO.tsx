import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Lead, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Embudo, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Cuatro problemas del SLA y la rama judicial», en seis tomas.
 * 1 · El diagrama: un lead en disputa llega a la mesa de líderes y sale hacia el equipo que corresponde; preside un COO o el CEO.
 * 2 · Pide más leads de los posibles: un número imposible se replantea; si no, tres palancas de velocidad de marketing.
 * 3 · Llegan más leads de los que ventas atiende: la meta de 500.000 frente a una capacidad de 300.000.
 * 4 · Ventas rechaza leads: el rechazado vuelve a nutrición o se contacta; la rama judicial revisa y tapa el embudo.
 * 5 · Los leads no sirven: el mensaje es el filtro; buen contenido, buenos leads.
 * 6 · Cómo funciona: miembros imparciales, la lista se achica y basta un turno rotativo; revisar uno por uno.
 */

const ID = 'ro22';
const nombres = ['problemas', 'diagrama', 'disputa', 'mesa', 'sale', 'coo', 'noEncabezan', 'p1', 'imposible', 'velMkt', 'palancas', 'p2', 'formula', 'meta500', 'problema', 'mueve', 'p3', 'nutricion', 'contacta', 'rama', 'grupo', 'tapa', 'p4', 'mensaje', 'sheridan', 'contenido', 'como', 'imparciales', 'presidir', 'achica', 'turno', 'pequena', 'spencer', 'pregunta'] as const;
type N = typeof nombres[number];

export const JudicialRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Cuatro problemas del SLA'], [m('diagrama'), 'La rama judicial'],
    [m('p1'), '1 · Pide más leads de los posibles'], [m('p2'), '2 · Más leads de los que ventas atiende'],
    [m('p3'), '3 · Ventas rechaza leads'], [m('p4'), '4 · Los leads no sirven'], [m('como'), 'Cómo funciona la rama judicial'],
  ];

  /* la mesa de líderes, reutilizada en dos tomas */
  const Mesa = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-90, 0, 90].map((dx, k) => <Persona key={k} id={ID} x={dx} y={-10} s={0.45} cuerpo={k === 1 ? VIOLETA : PIZARRA} corbata={k === 1} />)}
      <rect x={-170} y={-20} width={340} height={26} rx={10} fill={isDark ? '#6b4f3a' : '#a16207'} />
      <rect x={-150} y={6} width={18} height={70} fill={isDark ? '#57412f' : '#854d0e'} /><rect x={132} y={6} width={18} height={70} fill={isDark ? '#57412f' : '#854d0e'} />
    </g>
  );

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Cuatro problemas del SLA y la rama judicial">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · el diagrama */}
      <Toma t={t} a={-1} b={m('p1')} zi={1}>
        {t < m('diagrama') && [1, 2, 3, 4].map((n, k) => <g key={n} opacity={e1(t, m('problemas') + k * 0.25)}><circle cx={300 + k * 200} cy={450} r={60} fill={`url(#${ID}-marca)`} /><Txt x={300 + k * 200} y={472} textAnchor="middle" fontSize={56} fill="#fff" peso={800}>{n}</Txt></g>)}
        {t >= m('diagrama') && (
          <g opacity={e1(t, m('diagrama'))}>
            <Suelo y={640} isDark={isDark} x0={300} x1={900} />
            {t >= m('mesa') && <Mesa x={600} y={570} />}
            {t >= m('disputa') && (() => { const u = sm(t, m('disputa'), m('disputa') + 1.5); const s2 = sm(t, m('sale'), m('sale') + 1.5); const x = s2 > 0 ? lerp(600, 200, s2) : lerp(1100, 600, u); const y = s2 > 0 ? lerp(420, 640, s2) : 420; return <Lead x={x} y={y} s={0.9} color={AMBAR} />; })()}
            {t >= m('sale') && <g opacity={e1(t, m('sale'))}><Equipo id={ID} k="ven" x={160} y={760} s={0.5} t={t} nombre={false} /></g>}
            {t >= m('coo') && <Letrero x={600} y={300} texto="Preside: COO o CEO" fondo={VIOLETA} id={ID} op={e1(t, m('coo'))} />}
            {t >= m('noEncabezan') && <Letrero x={600} y={740} texto="Ni marketing ni ventas" fondo={PIZARRA} id={ID} op={e1(t, m('noEncabezan'))} tam={24} />}
          </g>
        )}
      </Toma>

      {/* TOMA 2 · pide más leads de los posibles */}
      <Toma t={t} a={m('p1')} b={m('p2')}>
        {t < m('velMkt') && (
          <g opacity={1 - ac(t, m('velMkt') - 0.4, m('velMkt'))}>
            <Equipo id={ID} k="ven" x={160} y={720} s={0.55} t={t} nombre={false} />
            <Equipo id={ID} k="mkt" x={1040} y={720} s={0.55} t={t} nombre={false} flip />
            {t < m('imposible') && <g opacity={e1(t, m('p1'))}><Letrero x={600} y={300} texto="«Necesitamos 5.000 leads al mes»" fondo={PIZARRA} id={ID} /></g>}
          </g>
        )}
        {t >= m('imposible') && (() => { const v = sm(t, m('imposible'), m('imposible') + 1); return (
          <g opacity={e1(t, m('imposible')) * (1 - ac(t, m('velMkt') - 0.3, m('velMkt')))} transform="translate(600 480)">
            <path d="M -200 0 A 200 200 0 0 1 200 0" fill="none" stroke={c.apagado} strokeWidth={36} />
            <path d="M 100 -173 A 200 200 0 0 1 200 0" fill="none" stroke={ROJO_M} strokeWidth={36} />
            <line x1={0} y1={0} x2={180 * Math.cos(Math.PI * (1 - 0.97 * v))} y2={-180 * Math.sin(Math.PI * (1 - 0.97 * v))} stroke={c.texto} strokeWidth={10} strokeLinecap="round" />
            <circle r={16} fill={c.texto} />
            <Letrero x={0} y={90} texto="Imposible: replantear la meta" fondo={ROJO_M} id={ID} />
          </g>
        ); })()}
        {t >= m('velMkt') && <Letrero x={600} y={180} texto="Velocidad de marketing" id={ID} op={e1(t, m('velMkt'))} />}
        {t >= m('palancas') && ['Volumen', 'Velocidad', 'Conversión'].map((txt, k) => (
          <g key={txt} opacity={e1(t, m('palancas') + k * 0.4)}>
            <rect x={270 + k * 330 - 14} y={330} width={28} height={260} rx={14} fill={c.apagado} />
            <g transform={`rotate(${-30 + 60 * (0.5 + 0.5 * Math.sin(t * 1.2 + k))} ${270 + k * 330} 590)`}><rect x={270 + k * 330 - 10} y={360} width={20} height={230} rx={10} fill={[AMBAR, NARANJA, ROSA][k]} /><circle cx={270 + k * 330} cy={360} r={34} fill={[AMBAR, NARANJA, ROSA][k]} /></g>
            <Letrero x={270 + k * 330} y={660} texto={txt} fondo={[AMBAR, NARANJA, ROSA][k]} id={ID} tam={24} />
          </g>
        ))}
      </Toma>

      {/* TOMA 3 · más leads de los que ventas atiende */}
      <Toma t={t} a={m('p2')} b={m('p3')}>
        <Embudo x={330} y={250} w={340} alto={70} franjas={[{ n: '', color: AMBAR }, { n: '', color: NARANJA }, { n: '', color: ROSA }]} />
        {Array.from({ length: 10 }, (_, k) => { const ph = (t * 0.4 + k / 10) % 1; const rebalsa = k % 3 !== 0; return <Lead key={k} x={330 + (rebalsa ? (k % 2 ? 1 : -1) * ph * 240 : (k - 5) * 8)} y={rebalsa ? 200 + ph * 400 : lerp(180, 520, ph)} s={0.45} color={rebalsa ? '#94a3b8' : AMBAR} op={Math.min(1, ph * 5, (1 - ph) * 4)} />; })}
        {t >= m('formula') && <Letrero x={800} y={200} texto="Velocidad de ventas" fondo={PIZARRA} id={ID} op={e1(t, m('formula'))} tam={24} />}
        {t >= m('meta500') && [[500, 'Meta', `url(#${ID}-marca)`], [300, 'Capacidad', '#94a3b8']].map(([v, txt, col], k) => { const h = 0.7 * (v as number) * sm(t, m('meta500') + k * 0.8, m('meta500') + 1 + k * 0.8); return <g key={txt as string}>
          <rect x={720 + k * 180 - 60} y={660 - h} width={120} height={h} rx={14} fill={col as string} />
          <Txt x={720 + k * 180} y={645 - h} textAnchor="middle" fontSize={30} fill={c.texto} peso={800}>{v}.000</Txt>
          <Txt f="a" x={720 + k * 180} y={700} textAnchor="middle" fontSize={22} fill={c.tenue}>{txt}</Txt>
        </g>; })}
        {t >= m('problema') && <Letrero x={810} y={760} texto="Problema antes de empezar" fondo={ROJO_M} id={ID} op={e1(t, m('problema'))} tam={24} />}
        {t >= m('mueve') && <Letrero x={330} y={700} texto="Marketing también mueve los números" fondo={AMBAR} id={ID} op={e1(t, m('mueve'))} tam={22} />}
      </Toma>

      {/* TOMA 4 · ventas rechaza leads */}
      <Toma t={t} a={m('p3')} b={m('p4')}>
        <Equipo id={ID} k="ven" x={300} y={480} s={0.6} t={t} nombre={false} />
        {(() => { const ph = ((t - m('p3')) * 0.35) % 1; return <Lead x={lerp(430, 640, ph)} y={360 - 60 * Math.sin(Math.PI * ph)} s={0.7} color="#94a3b8" rot={ph * 40} />; })()}
        {t >= m('nutricion') && <g opacity={e1(t, m('nutricion'))}><path d="M 660 300 C 800 200 900 300 820 400 C 760 460 660 420 660 360" stroke={VERDE} strokeWidth={6} fill="none" strokeDasharray="10 8" strokeDashoffset={-t * 30} /><Letrero x={860} y={180} texto="Vuelve a nutrición" fondo={VERDE} id={ID} tam={22} /></g>}
        {t >= m('contacta') && <Letrero x={300} y={540} texto="O ventas lo contacta" id={ID} op={e1(t, m('contacta'))} tam={22} />}
        {t >= m('rama') && <g opacity={e1(t, m('rama'))}><Mesa x={600} y={720} s={0.8} /><Letrero x={600} y={800} texto="Rama judicial" fondo={VIOLETA} id={ID} tam={22} /></g>}
        {t >= m('tapa') && <g opacity={e1(t, m('tapa'))}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${960 + k * 50} ${560 + k * 50})`}><circle r={18} fill={VERDE} /><Visto x={0} y={0} r={18} /></g>)}<Letrero x={1010} y={500} texto="Embudo tapado" fondo={VERDE} id={ID} tam={22} /></g>}
      </Toma>

      {/* TOMA 5 · los leads no sirven: el mensaje */}
      <Toma t={t} a={m('p4')} b={m('como')}>
        {(() => { const bueno = sm(t, m('contenido'), m('contenido') + 1.5); return (
          <g>
            {t >= m('mensaje') && <g opacity={e1(t, m('mensaje'))}>
              <rect x={170} y={300} width={300} height={200} rx={20} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
              <Txt f="a" x={200} y={350} fontSize={24} fill={NARANJA} peso={700}>Mensaje</Txt>
              {[0, 1, 2].map((k) => <rect key={k} x={200} y={380 + k * 30} width={lerp(k === 1 ? 160 : 230, 230, bueno)} height={12} rx={6} fill={bueno > 0.5 ? NARANJA : '#cbd5e1'} opacity={bueno > 0.5 ? 0.7 : 1} />)}
            </g>}
            {t >= m('mensaje') && Array.from({ length: 6 }, (_, k) => { const ph = (t * 0.35 + k / 6) % 1; return <Lead key={k} x={lerp(480, 1000, ph)} y={400 + (k - 2.5) * 40 * (1 - ph)} s={0.5} color={bueno > 0.5 || k % 2 === 0 ? NARANJA : '#94a3b8'} op={Math.min(1, ph * 5, (1 - ph) * 5)} />; })}
            {t >= m('sheridan') && <Letrero x={600} y={600} texto="«Arregla tu mensaje y arreglarás tus leads»" fondo={PIZARRA} id={ID} op={e1(t, m('sheridan'))} tam={24} />}
            {t >= m('contenido') && <Letrero x={600} y={700} texto="Buen contenido, buenos leads" fondo={VERDE} id={ID} op={e1(t, m('contenido'))} />}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 6 · cómo funciona la rama judicial */}
      <Toma t={t} a={m('como')} b={fin + 1}>
        {(() => { const achica = sm(t, m('achica'), m('achica') + 2); const n = Math.round(lerp(8, 2, achica)); return (
          <g>
            <Mesa x={330} y={600} />
            {t >= m('imparciales') && <Letrero x={330} y={700} texto="Imparciales" fondo={VIOLETA} id={ID} op={e1(t, m('imparciales'))} />}
            {t >= m('presidir') && <Letrero x={330} y={330} texto="CMO o VP: participan, no presiden" fondo={PIZARRA} id={ID} op={e1(t, m('presidir'))} tam={22} />}
            <g opacity={e1(t, m('imparciales'))}>
              <rect x={680} y={220} width={360} height={440} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
              <Txt f="a" x={710} y={270} fontSize={24} fill={c.texto} peso={700}>Leads en disputa</Txt>
              {Array.from({ length: n }, (_, k) => <rect key={k} x={710} y={300 + k * 42} width={300} height={30} rx={8} fill={c.panel2} />)}
            </g>
            {t >= m('turno') && <Letrero x={860} y={720} texto="Basta un turno rotativo" id={ID} op={e1(t, m('turno'))} tam={24} />}
            {t >= m('pequena') && <Letrero x={600} y={800} texto="Empresa pequeña: un líder imparcial" fondo={AZUL_M} id={ID} op={e1(t, m('pequena')) * (1 - ac(t, m('spencer') - 0.3, m('spencer')))} tam={22} />}
            {t >= m('spencer') && <Letrero x={600} y={800} texto="Revisarlos uno por uno, con su fuente" fondo={AZUL_M} id={ID} op={e1(t, m('spencer'))} tam={22} />}
          </g>
        ); })()}
      </Toma>
    </Lienzo>
  );
};
