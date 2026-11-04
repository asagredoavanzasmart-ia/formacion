import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Telefono, Propuesta, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Error 4: segmentar en lugar de personalizar (los casos de Reinares).
 * Toma 1: clientes distintos, cada uno con su color, entran a un embudo que los mete en cajas grises iguales; a las
 * cajas les cambian la etiqueta («perfiles de afinidad»), pero siguen siendo cajas.
 * Toma 2: la aseguradora de salud — cinco escalones de rentabilidad; el asegurado que más usa el servicio queda abajo,
 * espera al teléfono, se enoja y sale por la puerta: es lo que la empresa busca.
 * Toma 3: veinte burbujas de perfiles que nadie entiende en la reunión; un año después, la misma carta para todos.
 */

const ID = 'cp12', P = 'cp-segmentar';
const COL = [NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, '#f43f5e'];

export const SegmentarCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('iguales'), 'Como si fueran iguales'], [m('paradoja'), 'Una paradoja'], [m('contrario'), 'Justo lo contrario'], [m('afinidad'), '«Perfiles de afinidad»'],
    [m('aseguradora'), 'Una aseguradora de salud'], [m('trato'), 'Un trato menos que conveniente'], [m('busca'), 'Lo que busca la empresa'],
    [m('director'), 'Veinte perfiles'], [m('carta'), 'La misma carta para todos'],
  ];
  const meter = sm(t, m('contrario'), m('grupos') + 2);
  const sale = sm(t, m('busca'), m('busca') + 2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Segmentar en lugar de personalizar">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · clientes distintos metidos en cajas iguales */}
      <Toma t={t} a={0} b={m('aseguradora')} cy={480}>
        {t >= m('contrario') && [0, 1, 2].map((k) => (
          <g key={k} opacity={e1(t, m('contrario') + 0.2 * k)}>
            <rect x={230 + k * 270} y={600} width={200} height={130} rx={14} fill={isDark ? '#4b5563' : '#9ca3af'} />
            <rect x={230 + k * 270} y={600} width={200} height={30} rx={14} fill="#000" opacity={0.15} />
            <Txt f="a" x={330 + k * 270} y={690} textAnchor="middle" fontSize={26} fill="#fff">{t >= m('afinidad') ? `Perfil ${String.fromCharCode(65 + k)}` : `Grupo ${k + 1}`}</Txt>
          </g>
        ))}
        {COL.map((col, k) => {
          const x0 = 140 + k * 125, y0 = 330;
          const caja = k % 3;
          const x = lerp(x0, 330 + caja * 270 + ((k % 2) - 0.5) * 50, meter), y = lerp(y0, 602, meter) - 120 * Math.sin(Math.PI * meter);
          return (
            <g key={k} opacity={e1(t, m('iguales') + 0.08 * k)} transform={`translate(${x} ${y}) scale(${lerp(0.9, 0.55, meter)})`}>
              <circle cx={0} cy={-62} r={18} fill="#f7c4a0" /><path d="M -26 0 Q -26 -44 0 -44 Q 26 -44 26 0 Z" fill={lerp(0, 1, meter) > 0.85 ? GRIS : col} />
              {t >= m('individual') && t < m('contrario') && <circle cx={0} cy={-100} r={8} fill={col} />}
            </g>
          );
        })}
        {t >= m('paradoja') && t < m('contrario') && <Letrero x={600} y={520} texto="Cada cliente, tratado por separado" fondo={VERDE} id={ID} tam={28} op={e1(t, m('individual'))} />}
        {t >= m('agrupados') && <Letrero x={600} y={812} texto="Siguen siendo grupos" fondo={GRIS} id={ID} tam={28} op={e1(t, m('agrupados'))} />}
      </Toma>

      {/* 2 · la aseguradora de salud */}
      <Toma t={t} a={m('aseguradora')} b={m('director')} cy={480}>
        {[0, 1, 2, 3, 4].map((k) => (
          <g key={k} opacity={e1(t, m('cincoperf') + 0.15 * k)}>
            <rect x={160 + k * 120} y={300 + k * 80} width={110} height={460 - k * 80} rx={10} fill={k === 4 ? ROJO_M : [VERDE, '#34d399', AMBAR, '#fb923c'][k]} opacity={0.85} />
            <Txt f="a" x={215 + k * 120} y={290 + k * 80} textAnchor="middle" fontSize={26} fill={c.texto}>{k + 1}</Txt>
          </g>
        ))}
        <rect x={160} y={300} width={590} height={460} fill="none" />
        <Txt f="a" x={455} y={800} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={e1(t, m('cincoperf'))}>Más rentable → menos rentable</Txt>
        {t >= m('llama') && (
          <g opacity={e1(t, m('llama'))}>
            <g transform={`translate(${lerp(695, 1000, sale)} ${lerp(620, 700, sale)})`}><Persona id={ID} x={0} y={0} s={0.5} cuerpo={t >= m('trato') ? ROSA : NARANJA} /></g>
            {t < m('busca') + 1 && <Telefono x={900} y={490} s={0.7} />}
          </g>
        )}
        {t >= m('usan') && <Letrero x={900} y={230} texto="Usa mucho el servicio" fondo={ROJO_M} id={ID} tam={26} op={e1(t, m('usan')) * (1 - sale)} />}
        {t >= m('busca') && <g opacity={e1(t, m('busca'))}><rect x={1060} y={480} width={90} height={230} rx={8} fill={isDark ? '#334155' : '#475569'} /><rect x={1060} y={480} width={90 * (1 - 0.6 * sale)} height={230} rx={8} fill="#7c4a1e" /><Letrero x={900} y={330} texto="Que se vaya" fondo={GRIS} id={ID} tam={28} /></g>}
      </Toma>

      {/* 3 · veinte perfiles y la misma carta */}
      <Toma t={t} a={m('director')} b={fin + 1} cy={480}>
        {ventana(t, m('director'), m('carta')) > 0.01 && (
          <g opacity={ventana(t, m('director'), m('carta'))}>
            <rect x={150} y={180} width={560} height={420} rx={18} fill={c.panel} style={sombra(c.sombra, 5, 12)} />
            {Array.from({ length: 20 }, (_, k) => { const x = 200 + ((k * 137) % 460), y = 230 + ((k * 89) % 320); return <circle key={k} cx={x + 10 * Math.sin(t + k)} cy={y} r={14 + (k % 4) * 6} fill={COL[k % 8]} opacity={t >= m('veinte') + 0.05 * k ? 0.75 : 0} />; })}
            {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={850 + k * 110} y={720} s={0.55} corbata={k === 0} cuerpo={[VIOLETA, '#334155', AZUL_M][k]} />)}
            {t >= m('nadie') && [0, 1, 2].map((k) => <path key={k} d={`M ${872 + k * 110} 610 q 6 14 0 22 q -6 -8 0 -22 Z`} fill="#60a5fa" opacity={e1(t, m('nadie') + 0.2 * k)} />)}
            {t >= m('nadie') && <Letrero x={430} y={680} texto="Nadie dice que no los entiende" fondo={GRIS} id={ID} tam={28} op={e1(t, m('nadie'))} />}
          </g>
        )}
        {t >= m('carta') && (
          <g opacity={e1(t, m('carta'))}>
            {COL.concat(COL).slice(0, 12).map((col, k) => {
              const u = sm(t, m('carta') + 0.12 * k, m('carta') + 0.12 * k + 1);
              const x = 150 + (k % 6) * 180, y = 400 + Math.floor(k / 6) * 220;
              return <g key={k}><circle cx={x} cy={y + 90} r={14} fill="#f7c4a0" /><path d={`M ${x - 22} ${y + 140} Q ${x - 22} ${y + 104} ${x} ${y + 104} Q ${x + 22} ${y + 104} ${x + 22} ${y + 140} Z`} fill={col} /><Propuesta x={x} y={lerp(160, y + 20, u)} s={0.55} op={u} /></g>;
            })}
            <Letrero x={600} y={812} texto="Un año después: la misma carta para todos" id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
