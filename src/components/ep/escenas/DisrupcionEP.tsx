import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Edificio, Persona, Auto, Telefono, Cifra, Cruz, Suelo, Flujo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * La disrupción cambia el comportamiento.
 * 1 · Netflix (un pequeño sobre rojo) se ofrece a Blockbuster (la gran tienda) por 50 millones; «un nicho muy pequeño»;
 *     la tienda se apaga en 2010 y el sobre crece hasta 250 mil millones. Kodak: la cámara digital guardada bajo llave.
 * 2 · Tres llaves de la disrupción: la gratuidad (un precio que cae a cero), el mercado (oferta y demanda que se encuentran)
 *     y el ecosistema (un teléfono rodeado de aplicaciones). Se ríen, ignoran, ganas.
 * 3 · Un mercado más grande: los traslados crecen diez veces y los taxis hacen el triple de viajes.
 */

const ID = 'ep08', P = 'ep-disrupcion';

export const DisrupcionEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('mito'), 'No es tecnología'], [m('netflix'), 'Netflix y Blockbuster'], [m('kodak'), 'Kodak'], [m('tres'), 'Tres formas de disrupción'],
    [m('rien'), 'Se ríen, te ignoran, ganas'], [m('diez'), 'Un mercado más grande'],
  ];
  const quiebra = sm(t, m('quebro'), m('quebro') + 1.2);
  const crece = sm(t, m('valia'), m('valia') + 2);
  const LLAVES = [{ k: 'gratuidad', t: 'Gratuidad', sub: 'Gmail', color: NARANJA }, { k: 'mercado', t: 'Mercado', sub: 'Uber y Airbnb', color: ROSA }, { k: 'ecosistema', t: 'Ecosistema', sub: 'iPhone', color: AZUL_M }];
  const RISA = ['Se ríen', 'Te ignoran', 'Ganas'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La disrupción cambia el comportamiento">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Netflix y Blockbuster, Kodak */}
      <Toma t={t} a={0} b={m('tres')} cy={480}>
        <Suelo y={700} isDark={isDark} x0={100} x1={1100} />
        {t < m('kodak') ? <g>
          <g opacity={1 - 0.75 * quiebra}>
            <Edificio x={380} y={700} w={300} h={300} color={quiebra > 0.5 ? '#64748b' : '#1d4ed8'} />
            <rect x={240} y={420} width={280} height={56} rx={10} fill={quiebra > 0.5 ? '#94a3b8' : '#fbbf24'} />
            <Txt x={380} y={458} textAnchor="middle" fontSize={30} fill="#1e3a8a">Blockbuster</Txt>
          </g>
          {quiebra > 0.05 && <Cruz x={380} y={330} r={40} op={quiebra} />}
          <g transform={`translate(${lerp(820, 820, crece)} ${600 - 80 * crece}) scale(${1 + 0.9 * crece})`} opacity={e1(t, m('netflix'))}>
            <rect x={-70} y={-46} width={140} height={92} rx={10} fill="#e50914" /><path d="M -70 -46 L 0 8 L 70 -46" fill="#b20710" />
            <Txt x={0} y={30} textAnchor="middle" fontSize={22} fill="#fff">Netflix</Txt>
          </g>
          {t >= m('blockbuster') && t < m('valia') && <g opacity={e1(t, m('blockbuster'))}>
            <Flujo x1={760} y1={540} x2={460} y2={480} t={t} n={4} vel={0.8} arco={50} color="#e50914" />
            <Letrero x={620} y={300} texto="Se ofrece por 50 millones" fondo="#e50914" id={ID} tam={26} />
          </g>}
          {t >= m('nicho') && t < m('quebro') && <Letrero x={380} y={190} texto="«Un nicho muy pequeño»" fondo="#1d4ed8" id={ID} op={e1(t, m('nicho'))} tam={26} />}
          {t >= m('quebro') && <Letrero x={380} y={780} texto="Quiebra en 2010" fondo={GRIS} id={ID} op={e1(t, m('quebro'))} tam={26} />}
          {t >= m('valia') && <g opacity={e1(t, m('valia'))}><Cifra x={820} y={280} valor={250} u={crece} color="#e50914" tam={72} /><Txt f="a" x={820} y={320} textAnchor="middle" fontSize={24} fill={c.tenue}>mil millones de dólares</Txt></g>}
        </g> : <g opacity={e1(t, m('kodak'))}>
          <g transform="translate(470 520)">
            <rect x={-120} y={-80} width={240} height={160} rx={22} fill="#fbbf24" /><rect x={-120} y={-80} width={240} height={36} rx={18} fill="#d97706" />
            <circle cx={0} cy={14} r={56} fill="#1f2937" /><circle cx={0} cy={14} r={34} fill="#475569" /><circle cx={-10} cy={4} r={10} fill="#fff" opacity={0.5} />
          </g>
          <Letrero x={470} y={680} texto="Kodak: la cámara digital, 1973" fondo={AMBAR} id={ID} />
          {t >= m('nocontara') && <g opacity={e1(t, m('nocontara'))} transform={`translate(${lerp(820, 470, sm(t, m('nocontara'), m('nocontara') + 1))} 520)`}>
            <rect x={-150} y={-110} width={300} height={220} rx={20} fill="#475569" opacity={0.85} />
            <rect x={-26} y={-30} width={52} height={50} rx={8} fill="#fbbf24" /><path d="M -16 -30 v -18 a 16 16 0 0 1 32 0 v 18" stroke="#fbbf24" strokeWidth={8} fill="none" />
          </g>}
          {t >= m('nocontara') + 1 && <Letrero x={470} y={320} texto="«No le cuentes a nadie»" fondo={GRIS} id={ID} op={e1(t, m('nocontara') + 1)} tam={26} />}
        </g>}
      </Toma>

      {/* 2 · tres llaves */}
      <Toma t={t} a={m('tres')} b={m('diez')} cy={460}>
        {LLAVES.map((l, k) => t >= m(l.k) && (
          <g key={l.k} opacity={e1(t, m(l.k))} transform={`translate(${240 + k * 360} 420)`}>
            <rect x={-150} y={-200} width={300} height={360} rx={30} fill={c.panel} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
            <rect x={-150} y={-200} width={300} height={18} rx={9} fill={l.color} />
            <g transform="translate(0 -50)">
              {k === 0 && <g><Txt x={0} y={20} textAnchor="middle" fontSize={64} fill={l.color}>{sm(t, m(l.k) + 0.5, m(l.k) + 1.5) > 0.5 ? 'Gratis' : 'Pagar'}</Txt></g>}
              {k === 1 && <g><Persona id={ID} x={-60} y={60} s={0.45} cuerpo={l.color} /><Auto x={60} y={60} s={0.45} color={GRIS} /><Flujo x1={-40} y1={-20} x2={40} y2={-20} t={t} n={3} vel={1} arco={30} color={l.color} /></g>}
              {k === 2 && <g><Telefono x={0} y={20} s={0.55} widgets={4} />{[0, 1, 2, 3, 4, 5].map((j) => { const a = t * 0.8 + j * Math.PI / 3; return <rect key={j} x={Math.cos(a) * 95 - 12} y={20 + Math.sin(a) * 70 - 12} width={24} height={24} rx={6} fill={[NARANJA, ROSA, VERDE, VIOLETA, AMBAR, '#0ea5e9'][j]} />; })}</g>}
            </g>
            <Txt x={0} y={90} textAnchor="middle" fontSize={36} fill={l.color}>{l.t}</Txt>
            {!movil && <Txt f="a" x={0} y={130} textAnchor="middle" fontSize={24} fill={c.tenue}>{l.sub}</Txt>}
          </g>
        ))}
        {t >= m('rien') && RISA.map((r, k) => <Letrero key={r} x={280 + k * 320} y={720} texto={r} fondo={k === 2 ? undefined : GRIS} id={ID} op={e1(t, m('rien') + 0.7 * k)} />)}
      </Toma>

      {/* 3 · el mercado diez veces más grande */}
      <Toma t={t} a={m('diez')} b={fin + 1} cy={470}>
        {[{ x: 300, h: 42, n: 'Antes', f: GRIS, u: 1 }, { x: 620, h: 420, n: 'Después de Uber', f: `url(#${ID}-marca)`, u: sm(t, m('diez'), m('diez') + 1.6) }].map((b) => (
          <g key={b.x}><rect x={b.x - 90} y={680 - b.h * b.u} width={180} height={b.h * b.u} rx={14} fill={b.f} /><Txt f="a" x={b.x} y={720} textAnchor="middle" fontSize={26} fill={c.tenue}>{b.n}</Txt></g>
        ))}
        {t >= m('diez') + 1.6 && <Letrero x={600} y={190} texto="×10" id={ID} op={e1(t, m('diez') + 1.6)} />}
        {t >= m('taxis') && <g opacity={e1(t, m('taxis'))}>
          {[0, 1, 2].map((k) => <Auto key={k} x={900} y={340 + k * 120} s={0.6} color="#fbbf24" />)}
          {!movil && <Letrero x={940} y={650} texto="Taxis: el triple de viajes" fondo={AMBAR} id={ID} tam={26} />}
        </g>}
        {t >= m('oportunidad') && <Letrero x={600} y={800} texto="La oportunidad es mayor que la amenaza" fondo={VERDE} id={ID} op={e1(t, m('oportunidad'))} tam={26} />}
      </Toma>
    </Lienzo>
  );
};
