import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, EtiquetaPrecio, Persona, Billete, Reloj, Gente, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Especificidad de nicho.
 * Toma única: un embudo de lentes que se estrecha. El mismo libro de «gestión del tiempo» baja por cuatro anillos,
 * cada uno más angosto (todos → ventas → B2B en frío → herramientas y jardinería), y en cada uno su etiqueta de
 * precio salta: 19 → 99 → 499 → 1.000–2.000. Un medidor lateral marca «×100». Al final, el sello «ilustrativo» y la
 * comparación especialista frente a generalista.
 */

const ID = 'ad06', P = 'ad-nicho';

export const NichoAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('estrechar'), 'Estrechar el nicho'], [m('diecinueve'), 'Genérico'], [m('ventas'), 'Para profesionales de ventas'], [m('frio'), 'Ventas B2B en frío'],
    [m('jardineria'), 'Herramientas y jardinería'], [m('cien'), 'Cien veces el precio'], [m('ilustrativo'), 'Un ejemplo ilustrativo'],
  ];
  const NIV: [string, string, string, string][] = [['diecinueve', 'Todos', '$19', GRIS], ['noventa', 'Ventas', '$99', AZUL_M], ['racional', 'B2B en frío', '$499', VIOLETA], ['mil', 'Herramientas', '$1.000–2.000', NARANJA]];
  const nivel = NIV.reduce((a, [n], k) => (t >= m(n) - 0.1 ? k : a), -1);
  const yLibro = lerp(180, 230 + 140 * Math.max(0, nivel), sm(t, m('curso'), m('curso') + 0.8));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Especificidad de nicho">
      <Rotulo t={t} lista={rot} id={ID} />

      <Toma t={t} a={0} b={m('ilustrativo')} cy={470}>
        {NIV.map(([n, txt, precio, col], k) => {
          const w = 620 - k * 130;
          const y = 260 + k * 140;
          const on = t >= m(n) - 0.1;
          return (
            <g key={n} opacity={k === 0 ? e1(t, m('estrechar')) : on ? e1(t, m(n)) : 0.18}>
              <ellipse cx={420} cy={y} rx={w / 2} ry={36} fill="none" stroke={on ? col : c.apagado} strokeWidth={16} />
              {!movil && <Txt f="a" x={420 - w / 2 - 24} y={y + 9} textAnchor="end" fontSize={26} fill={c.texto}>{txt}</Txt>}
              {on && <EtiquetaPrecio x={860} y={y} texto={precio} color={col} t={t + k} bal={1} tam={k === 3 ? 28 : 34} op={e1(t, m(n) + 0.2)} s={1 + 0.06 * k} />}
            </g>
          );
        })}
        {t >= m('curso') && (
          <g transform={`translate(420 ${yLibro})`} opacity={e1(t, m('curso'))}>
            <rect x={-56} y={-40} width={112} height={80} rx={10} fill={ROSA} style={sombra(0.22, 3, 8)} />
            <rect x={-56} y={-40} width={16} height={80} rx={6} fill="#000" opacity={0.15} />
            <Reloj x={14} y={0} r={26} t={t} />
          </g>
        )}
        {t >= m('comision') && (
          <g opacity={ventana(t, m('comision'), m('jardineria'))}>
            <Persona id={ID} x={150} y={820} s={0.45} cuerpo={VIOLETA} />
            <Billete x={230} y={700} s={0.9} rot={-10} />
            <Letrero x={180} y={620} texto="+500 de comisión" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
        {t >= m('medida') && (
          <g opacity={e1(t, m('medida'))} transform="translate(420 700)">
            {[0, 1, 2].map((k) => <circle key={k} r={50 + 26 * k} fill="none" stroke={NARANJA} strokeWidth={4} opacity={(1 - (((t * 0.7) + k / 3) % 1)) * 0.6} />)}
          </g>
        )}
      </Toma>

      {/* El salto ×100, el aviso y el especialista */}
      {t >= m('cien') && (
        <Toma t={t} a={m('cien')} b={fin + 1} cy={470}>
          <g opacity={e1(t, m('cien'))}>
            <Cifra x={600} y={330} valor={100} u={sm(t, m('cien'), m('cien') + 1)} pre="×" tam={150} color={NARANJA} />
            <Txt f="a" x={600} y={390} textAnchor="middle" fontSize={30} fill={c.texto}>el mismo contenido</Txt>
          </g>
          {t >= m('ilustrativo') && (
            <g opacity={e1(t, m('ilustrativo'))}>
              <Letrero x={600} y={470} texto="Ejemplo ilustrativo, no experimento" fondo={AMBAR} id={ID} tam={28} />
            </g>
          )}
          {t >= m('especialista') && (
            <g opacity={e1(t, m('especialista'))}>
              <Persona id={ID} x={380} y={780} s={0.62} cuerpo={NARANJA} corbata />
              <Gente x={720} y={780} n={4} activos={4} color={GRIS} paso={60} s={0.62} />
              <Letrero x={380} y={590} texto="Especialista" id={ID} tam={28} />
              <Letrero x={810} y={590} texto="Generalistas" fondo={GRIS} id={ID} tam={28} />
              {[0, 1, 2].map((k) => { const ph = ((t - m('especialista')) * 0.8 + k / 3) % 1; return <Billete key={k} x={lerp(760, 420, ph)} y={680 - 70 * Math.sin(Math.PI * ph)} s={0.55} rot={ph * 90} />; })}
            </g>
          )}
        </Toma>
      )}
    </Lienzo>
  );
};
