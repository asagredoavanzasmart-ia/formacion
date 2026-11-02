import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Contrato, Cifra, Visto, Suelo, Flujo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * La danza de los cien noes.
 * 1 · Una cuadrícula de cien sobres: se sellan con «No» uno tras otro y solo uno o dos quedan en verde. El generador de fondos:
 *     una flecha que multiplica la inversión por 10, 20 y 100.
 * 2 · Basura y señales: frases del inversionista («siempre», «nunca», «Google puede hacer eso») caen a un tacho; se agradece y se sigue.
 *     Las señales de interés real se encienden en verde.
 * 3 · Magma en cuatro días: lunes, martes, miércoles y el jueves la carta; la oferta pasa de 2 a 6 millones y la ronda cierra en 12.
 */

const ID = 'ep13', P = 'ep-noes';

export const NoesEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('danza'), 'La danza de los cien noes'], [m('generador'), 'Un generador de fondos'], [m('clientes'), 'Clientes no, inversionistas sí'],
    [m('basura'), 'La basura del inversionista'], [m('senales'), 'Señales de interés real'], [m('lentos'), 'Lentos hasta que temen perder'],
  ];
  const sellados = Math.floor(100 * sm(t, m('cien'), m('unaodos') + 0.5));
  const FRASES = ['«Siempre…»', '«Nunca…»', '«Google puede hacer eso»'];
  const SENALES = ['Hablan de los términos', '¿Quién más lo evalúa?', 'Cambios a la presentación'];
  const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves'];
  const dia = (k: number) => m('magma') + 0.8 + k * 0.9;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La danza de los cien noes">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · cien sobres */}
      <Toma t={t} a={0} b={m('clientes')} cy={470}>
        {t < m('generador') ? <g>
          {Array.from({ length: 100 }, (_, k) => {
            const x = 210 + (k % 20) * 40, y = 200 + Math.floor(k / 20) * 70;
            const si = k === 57 || k === 83;
            const on = k < sellados;
            return <g key={k} transform={`translate(${x} ${y})`} opacity={e1(t, 0.2 + k * 0.01)}>
              <rect x={-16} y={-12} width={32} height={24} rx={4} fill={on ? (si && t >= m('unaodos') ? VERDE : '#e5484d') : c.apagado} />
              <path d="M -16 -12 L 0 2 L 16 -12" stroke="#fff" strokeWidth={2} fill="none" opacity={0.7} />
            </g>;
          })}
          <Cifra x={600} y={620} valor={Math.max(sellados, 0)} u={1} color="#e5484d" tam={90} />
          <Txt f="a" x={600} y={665} textAnchor="middle" fontSize={26} fill={c.tenue}>empresas vistas al año</Txt>
          {t >= m('unaodos') && <Letrero x={600} y={740} texto="Invierte en una o dos" fondo={VERDE} id={ID} op={e1(t, m('unaodos'))} />}
        </g> : <g opacity={e1(t, m('generador'))}>
          <rect x={200} y={600} width={120} height={60} rx={12} fill={GRIS} /><Txt f="a" x={260} y={700} textAnchor="middle" fontSize={26} fill={c.tenue}>Inversión</Txt>
          {['×10', '×20', '×100'].map((x, k) => { const h = [120, 240, 420][k] * sm(t, m('veces') + 0.4 * k, m('veces') + 0.4 * k + 1); return <g key={x}><rect x={470 + k * 220} y={660 - h} width={150} height={h} rx={14} fill={[NARANJA, ROSA, VIOLETA][k]} /><Txt x={545 + k * 220} y={640 - h} textAnchor="middle" fontSize={38} fill={c.texto} opacity={h > 10 ? 1 : 0}>{x}</Txt></g>; })}
          <Letrero x={760} y={760} texto="Puede valer mil millones" id={ID} />
        </g>}
      </Toma>

      {/* 2 · basura y señales */}
      <Toma t={t} a={m('clientes')} b={m('lentos')} cy={470}>
        {t < m('basura') ? <g>
          {[{ k: 'clientes', x: 330, txt: '20 clientes: «no existe»', col: '#e5484d', fin: 'Revisa' }, { k: 'inversionistas', x: 870, txt: '20 inversionistas: «no»', col: GRIS, fin: 'Sigue' }].map((g) => t >= m(g.k) && (
            <g key={g.k} opacity={e1(t, m(g.k))}>
              {Array.from({ length: 20 }, (_, j) => <Persona key={j} id={ID} x={g.x - 180 + (j % 5) * 90} y={320 + Math.floor(j / 5) * 80} s={0.26} cuerpo={g.col} />)}
              <Letrero x={g.x} y={680} texto={g.txt} fondo={g.col} id={ID} tam={24} />
              <Letrero x={g.x} y={760} texto={g.fin} fondo={g.col === GRIS ? VERDE : '#e5484d'} id={ID} tam={26} />
            </g>
          ))}
        </g> : <g>
          <g transform="translate(300 680)"><path d="M -90 -150 H 90 L 74 0 H -74 Z" fill="#64748b" /><rect x={-104} y={-170} width={208} height={24} rx={8} fill="#475569" /></g>
          {FRASES.map((f, k) => { const t0 = m('basura') + 0.3 + 0.7 * k; const u = sm(t, t0 + 0.8, t0 + 1.6); return t >= t0 && <g key={f} opacity={1 - sm(t, t0 + 1.4, t0 + 1.7)}><Letrero x={lerp(300, 300, u)} y={lerp(230 + 70 * k, 560, u)} texto={f} fondo={GRIS} id={ID} tam={24} /></g>; })}
          {t >= m('agradece') && <Letrero x={300} y={770} texto="«Gracias» y a la siguiente" fondo={GRIS} id={ID} op={e1(t, m('agradece'))} tam={24} />}
          {t >= m('senales') && SENALES.map((s, k) => (
            <g key={s} opacity={e1(t, m('senales') + 0.6 * k)} transform={`translate(820 ${280 + k * 150})`}>
              <circle cx={-170} cy={0} r={24} fill={VERDE} opacity={0.6 + 0.4 * Math.sin(t * 4 + k)} />
              <Txt f="a" x={-130} y={10} fontSize={28} fill={c.texto}>{s}</Txt>
            </g>
          ))}
        </g>}
      </Toma>

      {/* 3 · Magma en cuatro días */}
      <Toma t={t} a={m('lentos')} b={fin + 1} cy={470}>
        {t < m('magma') ? <g>
          <circle cx={600} cy={440} r={120} fill="none" stroke={c.apagado} strokeWidth={16} />
          <path d={`M 600 440 L ${600 + 100 * Math.cos(t * 0.6)} ${440 + 100 * Math.sin(t * 0.6)}`} stroke={GRIS} strokeWidth={10} strokeLinecap="round" />
          <Letrero x={600} y={640} texto="Un fondo, sin apuro" fondo={GRIS} id={ID} op={e1(t, m('lentos'))} />
        </g> : <g>
          {DIAS.map((d, k) => (
            <g key={d} opacity={e1(t, dia(k))} transform={`translate(${210 + k * 190} 300)`}>
              <rect x={-80} y={-70} width={160} height={140} rx={18} fill={c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
              <rect x={-80} y={-70} width={160} height={36} rx={18} fill={k === 3 ? VERDE : AZUL_M} />
              <Txt f="a" x={0} y={-44} textAnchor="middle" fontSize={22} fill="#fff">{d}</Txt>
              {k < 3 ? <g>{[0, 1].map((p) => <Persona key={p} id={ID} x={-24 + p * 48} y={60} s={0.2} cuerpo={p ? AZUL_M : NARANJA} />)}</g> : <Contrato x={0} y={20} s={0.32} firma={sm(t, m('jueves'), m('jueves') + 1)} />}
            </g>
          ))}
          {t >= m('seis') && <g opacity={e1(t, m('seis'))}>
            <Txt x={330} y={560} textAnchor="middle" fontSize={64} fill={GRIS} textDecoration="line-through">2</Txt>
            <Txt x={480} y={560} textAnchor="middle" fontSize={64} fill={c.tenue}>→</Txt>
            <Cifra x={630} y={560} valor={6} u={sm(t, m('seis'), m('seis') + 1)} color={VERDE} tam={90} />
            <Txt f="a" x={480} y={610} textAnchor="middle" fontSize={24} fill={c.tenue}>millones de dólares</Txt>
          </g>}
          {t >= m('doce') && <g opacity={e1(t, m('doce'))}><Letrero x={600} y={720} texto="Ronda de 12 millones" fondo={VERDE} id={ID} /><Visto x={600} y={800} r={26} /></g>}
        </g>}
      </Toma>
    </Lienzo>
  );
};
