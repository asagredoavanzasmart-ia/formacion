import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Flujo, Visto, Cruz, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * La retención es la única medida.
 * 1 · Tres líneas de tiempo: Waze tres años y medio, Microsoft cinco y Netflix diez.
 * 2 · El balde: entran usuarios por arriba; si tiene agujeros, se van por abajo. La retención es lo que queda; la conversión es
 *     la boca del balde (quienes llegan a obtener valor). Entre empresas, la renovación.
 * 3 · Tres espejos que engañan y la tabla de cohortes que se llena mes a mes: son números.
 */

const ID = 'ep22', P = 'ep-retencion';

export const RetencionEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('critica'), 'La parte más crítica'], [m('waze'), 'Cuánto tarda'], [m('retencion'), 'La retención'], [m('conversion'), 'Antes, la conversión'],
    [m('engañan'), 'Por qué nos engañamos'], [m('cohortes'), 'La tabla de cohortes'],
  ];
  const TIEMPOS = [{ k: 'waze', n: 'Waze', a: 3.5, col: AZUL_M }, { k: 'microsoft', n: 'Microsoft', a: 5, col: VERDE }, { k: 'netflix', n: 'Netflix', a: 10, col: '#e5484d' }];
  const sellado = t >= m('retencion');
  const ESPEJOS = [{ k: 'potenciales', n: 'Usuarios potenciales' }, { k: 'version', n: 'La versión que no sale' }, { k: 'activos', n: 'Solo los activos' }];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La retención es la única medida">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · cuánto tarda */}
      <Toma t={t} a={0} b={m('retencion')} cy={470}>
        {t < m('waze') ? <g opacity={e1(t, m('critica'))}>
          <circle cx={600} cy={420} r={150} fill={`url(#${ID}-halo)`} />
          <Txt x={600} y={440} textAnchor="middle" fontSize={50} fill={NARANJA}>Ajuste</Txt>
          <Txt x={600} y={500} textAnchor="middle" fontSize={36} fill={c.texto}>producto-mercado</Txt>
          {t >= m('nocambia') && <Letrero x={600} y={680} texto="Una vez logrado, no cambia" id={ID} op={e1(t, m('nocambia'))} tam={26} />}
        </g> : <g>
          {TIEMPOS.map((x, k) => t >= m(x.k) && (
            <g key={x.k} opacity={e1(t, m(x.k))} transform={`translate(260 ${300 + k * 150})`}>
              <Txt f="a" x={0} y={-16} fontSize={30} fill={c.texto}>{x.n}</Txt>
              <rect x={0} y={0} width={700 * (x.a / 10) * sm(t, m(x.k), m(x.k) + 1.2)} height={46} rx={14} fill={x.col} />
              <Txt x={20 + 700 * (x.a / 10) * sm(t, m(x.k), m(x.k) + 1.2)} y={36} fontSize={32} fill={x.col}>{String(x.a).replace('.', ',')} años</Txt>
            </g>
          ))}
        </g>}
      </Toma>

      {/* 2 · el balde */}
      <Toma t={t} a={m('retencion')} b={m('engañan')} cy={470}>
        <g transform="translate(600 300)">
          <path d="M -200 0 H 200 L 160 360 H -160 Z" fill={c.panel2} />
          <path d={`M ${-200 + 40 * (1 - 0.55)} ${360 - 360 * 0.55} H ${200 - 40 * (1 - 0.55)} L 160 360 H -160 Z`} fill={NARANJA} opacity={0.75 * sm(t, m('retencion'), m('retencion') + 2)} />
          <rect x={-220} y={-14} width={440} height={20} rx={10} fill="#64748b" />
        </g>
        <Flujo x1={400} y1={150} x2={600} y2={320} t={t} n={6} vel={0.8} arco={30} color={AZUL_M} />
        {!sellado && <Flujo x1={600} y1={670} x2={800} y2={800} t={t} n={6} vel={0.8} arco={-20} color={GRIS} />}
        <Letrero x={600} y={760} texto="Los que vuelven" id={ID} op={e1(t, m('retencion'))} />
        {t >= m('empresas') && <Letrero x={950} y={420} texto="Entre empresas: renuevan" fondo={VERDE} id={ID} op={e1(t, m('empresas'))} tam={24} />}
        {t >= m('paguen') && <Letrero x={250} y={560} texto="Que paguen no basta" fondo={GRIS} id={ID} op={e1(t, m('paguen'))} tam={24} />}
        {t >= m('conversion') && <g opacity={e1(t, m('conversion'))}><rect x={380} y={276} width={440} height={30} rx={12} fill={ROSA} opacity={0.5 + 0.3 * Math.sin(t * 5)} /><Letrero x={600} y={230} texto="Conversión: llegan al valor" fondo={ROSA} id={ID} tam={24} /></g>}
      </Toma>

      {/* 3 · espejos y cohortes */}
      <Toma t={t} a={m('engañan')} b={fin + 1} cy={470}>
        {t < m('cohortes') ? <g>
          {ESPEJOS.map((e, k) => t >= m(e.k) && (
            <g key={e.k} opacity={e1(t, m(e.k))} transform={`translate(${240 + k * 360} 430)`}>
              <ellipse cx={0} cy={0} rx={110} ry={160} fill="#94a3b8" /><ellipse cx={0} cy={0} rx={94} ry={142} fill="#cfe8ff" />
              <path d="M -50 -80 L 40 60" stroke="#fff" strokeWidth={10} opacity={0.6} />
              <Persona id={ID} x={0} y={90} s={0.35} cuerpo={k === 2 ? VERDE : AZUL_M} />
              <Txt f="a" x={0} y={210} textAnchor="middle" fontSize={26} fill={c.texto}>{e.n}</Txt>
            </g>
          ))}
          {t >= m('engañan') && <Letrero x={600} y={190} texto="Creer que llegaste sin haber llegado" fondo={GRIS} id={ID} op={e1(t, m('engañan'))} tam={24} />}
        </g> : <g>
          {Array.from({ length: 5 }, (_, f) => (
            <g key={f}>
              <Txt f="a" x={250} y={300 + f * 80} fontSize={24} fill={c.tenue} textAnchor="end">Mes {f + 1}</Txt>
              {Array.from({ length: 5 - f }, (_, col) => {
                const on = sm(t, m('cohortes') + 0.15 * (f * 5 + col), m('cohortes') + 0.15 * (f * 5 + col) + 0.4);
                return <rect key={col} x={280 + col * 150} y={268 + f * 80} width={136} height={60} rx={10} fill={VIOLETA} opacity={on * (1 - col * 0.17)} />;
              })}
            </g>
          ))}
          {t >= m('numeros') && <Letrero x={600} y={760} texto="No es intuición: son números" id={ID} op={e1(t, m('numeros'))} />}
        </g>}
      </Toma>
    </Lienzo>
  );
};
