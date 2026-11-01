import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Flujo, Hoja, Rotulo, Persona, Txt, Corazon, Moneda3D, PilaMonedas, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Crecer lineal o a escala», en cinco tomas.
 * 1 · Dos caminos: la recta y la curva que se dobla; tres señales de escala (plantilla, margen, LTV:CAC).
 * 2 · El gráfico: plantilla gris e ingresos naranjos. Lineal: cada cliente nuevo trae una persona más.
 *     A escala: la curva se dobla y el excedente financia contratación, desarrollo y expansión.
 * 3 · El trato uno a uno: cada cliente con su vendedor; más ventas exigen más vendedores y el costo se come la caja.
 * 4 · Jen Spencer: con pocos clientes se abraza a cada uno; al crecer la carpeta pasa de mano en mano y se destiñe.
 * 5 · Etapa temprana (hacer lo que no escala) frente a etapa de escala (uno a muchos: un correo para todos).
 */

const ID = 'ro06';
const nombres = ['linea', 'escala', 'inversion', 'plantilla', 'margen', 'ltv', 'grafico', 'gris', 'ingresosArea', 'lineal', 'cliente', 'aEscala', 'dobla', 'financiar', 'trato', 'unoauno', 'masVendedores', 'soporte', 'consume', 'spencer', 'abrazar', 'gerente', 'diluye', 'temprana', 'noEscala', 'etapaEscala', 'unoMuchos', 'correo', 'pregunta'] as const;
type N = typeof nombres[number];

export const EscalaRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, '¿Lineal o a escala?'], [m('inversion'), 'Crecer más rápido que la inversión'],
    [m('grafico'), 'Plantilla frente a ingresos'], [m('lineal'), 'Crecimiento lineal'], [m('aEscala'), 'Crecimiento a escala'],
    [m('trato'), 'El trato uno a uno'], [m('consume'), 'El costo se come los recursos'],
    [m('spencer'), 'Jen Spencer'], [m('gerente'), 'La historia se diluye'],
    [m('temprana'), 'Etapa temprana'], [m('etapaEscala'), 'Etapa de escala'],
  ];

  /* Toma 2 · áreas del gráfico */
  const X0 = 170, X1 = 1030, Y0 = 700, HM = 430;
  const curva = sm(t, m('dobla'), m('dobla') + 2.5);
  const plant = (u: number) => Y0 - HM * 0.85 * u * lerp(1, 0.55, curva);
  const ingr = (u: number) => Y0 - HM * lerp(0.9 * u + 0.04, 0.25 * u + 0.75 * u * u * u + 0.04, curva);
  const crece = Math.max(sm(t, m('gris'), m('gris') + 1.6), estatico ? 1 : 0);
  const area = (f: (u: number) => number, h: number) => {
    const pts = Array.from({ length: 41 }, (_, k) => k / 40).filter((u) => u <= h + 1e-6);
    if (pts.length < 2) return '';
    return `M ${X0} ${Y0} ` + pts.map((u) => `L ${lerp(X0, X1, u)} ${f(u)}`).join(' ') + ` L ${lerp(X0, X1, pts[pts.length - 1])} ${Y0} Z`;
  };
  const nClientes = Math.round(lerp(0, 5, ac(t, m('cliente'), m('cliente') + 4)));

  /* Toma 3 · uno a uno */
  const pares = Math.round(lerp(1, 4, ac(t, m('masVendedores'), m('masVendedores') + 2.5)));
  const caja = lerp(10, 2, ac(t, m('consume'), m('consume') + 3));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Crecer lineal o crecer a escala">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · dos caminos y tres señales */}
      <Toma t={t} a={-1} b={m('grafico')} zi={1}>
        {(() => {
          const u1 = sm(t, m('linea'), m('linea') + 1.5), u2 = sm(t, m('escala'), m('escala') + 1.8);
          const recta = Array.from({ length: 21 }, (_, k) => k / 20).filter((u) => u <= u1).map((u) => `${lerp(160, 1040, u)},${lerp(600, 380, u)}`).join(' ');
          const dob = Array.from({ length: 21 }, (_, k) => k / 20).filter((u) => u <= u2).map((u) => `${lerp(160, 1040, u)},${600 - 80 * u - 300 * u * u * u}`).join(' ');
          return (
            <g>
              {u1 > 0.01 && <polyline points={recta} fill="none" stroke="#94a3b8" strokeWidth={12} strokeLinecap="round" />}
              {u1 > 0.9 && <Letrero x={1040} y={420} texto="En línea recta" fondo="#94a3b8" id={ID} ancla="end" op={sm(t, m('linea') + 1.2, m('linea') + 1.6)} />}
              {u2 > 0.01 && <polyline points={dob} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />}
              {u2 > 0.9 && <Letrero x={1040} y={170} texto="A escala" id={ID} ancla="end" op={sm(t, m('escala') + 1.4, m('escala') + 1.8)} />}
              {t >= m('inversion') && (
                <g opacity={e1(t, m('inversion')) * (1 - ac(t, m('plantilla') - 0.3, m('plantilla')))}>
                  <Letrero x={420} y={300} texto="Ingresos > inversión" id={ID} />
                </g>
              )}
              {([['plantilla', 'Ingresos > plantilla', AZUL_M], ['margen', 'Mejor margen neto', VERDE], ['ltv', 'Mejor LTV:CAC', VIOLETA]] as [N, string, string][]).map(([n, txt, col], k) => t >= m(n) && (
                <g key={n} opacity={e1(t, m(n))}>
                  <rect x={170 + k * 300} y={680} width={270} height={92} rx={20} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
                  <circle cx={210 + k * 300} cy={726} r={22} fill={col} />
                  <path d={`M ${200 + k * 300} 730 l 8 -12 l 8 6 l 10 -16`} stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <Txt f="a" x={245 + k * 300} y={734} fontSize={22} fill={c.texto}>{txt}</Txt>
                </g>
              ))}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 2 · el gráfico: lineal y a escala */}
      <Toma t={t} a={m('grafico')} b={m('trato')}>
        <rect x={X0} y={Y0} width={X1 - X0} height={5} rx={2.5} fill={c.apagado} />
        {t >= m('gris') && <path d={area(plant, crece)} fill="#94a3b8" opacity={0.75} />}
        {t >= m('ingresosArea') && <path d={area(ingr, sm(t, m('ingresosArea'), m('ingresosArea') + 1.6))} fill={`url(#${ID}-marca)`} opacity={0.55} />}
        {t >= m('gris') && <Letrero x={X1 - 10} y={plant(1) + 44} texto="Plantilla" fondo="#94a3b8" id={ID} ancla="end" op={e1(t, m('gris'))} />}
        {t >= m('ingresosArea') && <Letrero x={X1 - 10} y={ingr(1) - 34} texto="Ingresos" id={ID} ancla="end" op={e1(t, m('ingresosArea'))} />}
        {/* cada cliente nuevo exige una persona más */}
        {t >= m('cliente') && Array.from({ length: nClientes }, (_, k) => (
          <g key={k} opacity={e1(t, m('cliente') + k * 0.8) * (1 - curva)}>
            <Persona id={ID} x={260 + k * 70} y={300} s={0.32} cuerpo={AZUL_M} />
            <Persona id={ID} x={260 + k * 70} y={400} s={0.32} cuerpo="#94a3b8" />
          </g>
        ))}
        {t >= m('cliente') && <g opacity={e1(t, m('cliente')) * (1 - curva)}><Letrero x={330} y={180} texto="Cliente nuevo = persona nueva" fondo={PIZARRA} id={ID} ancla="start" /></g>}
        {/* el excedente financia */}
        {t >= m('financiar') && (
          <g opacity={e1(t, m('financiar'))}>
            {['Contratar', 'Desarrollar', 'Expandir'].map((txt, k) => (
              <g key={txt}>
                <Flujo x1={X1 - 60} y1={ingr(0.95) + 30} x2={300 + k * 190} y2={230} t={t + k * 0.3} n={3} vel={0.5} arco={40} color={NARANJA} r={8} />
                <Letrero x={300 + k * 190} y={200} texto={txt} fondo={[VERDE, VIOLETA, AZUL_M][k]} id={ID} tam={24} />
              </g>
            ))}
          </g>
        )}
      </Toma>

      {/* TOMA 3 · uno a uno: más clientes, más personas */}
      <Toma t={t} a={m('trato')} b={m('spencer')}>
        <Suelo y={690} isDark={isDark} x0={100} x1={860} />
        {Array.from({ length: pares }, (_, k) => (
          <g key={k} opacity={k === 0 ? e1(t, m('trato')) : e1(t, m('masVendedores') + (k - 1) * 0.8)}>
            <Persona id={ID} x={150 + k * 190} y={690} s={0.5} cuerpo={AZUL_M} />
            <Persona id={ID} x={215 + k * 190} y={690} s={0.5} cuerpo={NARANJA} corbata />
            {t >= m('unoauno') && <path d={`M ${165 + k * 190} 560 q 18 -24 36 0`} stroke={ROSA} strokeWidth={5} fill="none" strokeLinecap="round" />}
          </g>
        ))}
        {t >= m('unoauno') && <Letrero x={480} y={760} texto="Uno a uno" fondo={AZUL_M} id={ID} op={e1(t, m('unoauno'))} />}
        {t >= m('soporte') && [0, 1, 2].map((k) => <g key={k} opacity={e1(t, m('soporte') + k * 0.4)}><Equipo id={ID} k="ser" x={180 + k * 230} y={410} s={0.45} t={t} nombre={false} /></g>)}
        {t >= m('soporte') && <Letrero x={420} y={200} texto="Más clientes, más soporte" fondo={TEAL} id={ID} op={e1(t, m('soporte'))} />}
        {/* la caja que se vacía */}
        {t >= m('masVendedores') && (
          <g opacity={e1(t, m('masVendedores'))}>
            <PilaMonedas x={1000} y={690} n={caja} w={110} />
            <Letrero x={1000} y={760} texto="Recursos" fondo={AMBAR} id={ID} />
            {t >= m('consume') && <Flujo x1={1000} y1={680 - caja * 13} x2={560} y2={600} t={t} n={4} vel={0.6} arco={60} color={AMBAR} r={8} />}
          </g>
        )}
      </Toma>

      {/* TOMA 4 · Jen Spencer: la historia de la cuenta se diluye */}
      <Toma t={t} a={m('spencer')} b={m('temprana')}>
        <Suelo y={690} isDark={isDark} />
        {(() => {
          const pasa = sm(t, m('gerente'), m('gerente') + 4);
          const tinta = 1 - 0.75 * sm(t, m('diluye'), m('diluye') + 2);
          const gerentes = [220, 470, 720, 970];
          const k = Math.min(3, Math.floor(pasa * 3.999));
          const f = pasa * 3.999 - k;
          const x = k < 3 ? lerp(gerentes[k], gerentes[k + 1], sm(f, 0.2, 0.8)) : gerentes[3];
          return (
            <g>
              {t >= m('abrazar') && t < m('gerente') && (
                <g opacity={e1(t, m('abrazar'))}>
                  <Persona id={ID} x={520} y={690} s={0.75} cuerpo={NARANJA} corbata />
                  <Persona id={ID} x={640} y={690} s={0.75} cuerpo={AZUL_M} />
                  <Corazon x={580} y={430 - 8 * Math.sin(t * 4)} s={1.1} />
                  <Letrero x={580} y={760} texto="Equipo chico: se abraza a cada cliente" id={ID} />
                </g>
              )}
              {t >= m('gerente') && (
                <g opacity={e1(t, m('gerente'))}>
                  {gerentes.map((gx, j) => <Persona key={j} id={ID} x={gx} y={690} s={0.6} cuerpo={j <= k ? NARANJA : '#94a3b8'} corbata />)}
                  <g transform={`translate(${x + 40} ${520 - 40 * Math.sin(Math.PI * sm(f, 0.2, 0.8))})`} opacity={tinta}>
                    <rect x={-50} y={-38} width={100} height={76} rx={10} fill={NARANJA} />
                    <rect x={-40} y={-20} width={80} height={10} rx={5} fill="#fff" opacity={0.8} />
                    <rect x={-40} y={0} width={60} height={10} rx={5} fill="#fff" opacity={0.8} />
                  </g>
                  <Letrero x={600} y={760} texto="La historia de la cuenta se diluye" fondo={PIZARRA} id={ID} />
                </g>
              )}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 5 · temprana frente a escala */}
      <Toma t={t} a={m('temprana')} b={fin + 1}>
        <rect x={598} y={160} width={4} height={600} rx={2} fill={c.apagado} />
        <g opacity={e1(t, m('temprana'))}>
          <Letrero x={320} y={190} texto="Etapa temprana" fondo={AZUL_M} id={ID} />
          <Persona id={ID} x={260} y={600} s={0.7} cuerpo={NARANJA} corbata />
          <Persona id={ID} x={380} y={600} s={0.7} cuerpo={AZUL_M} />
          {t >= m('noEscala') && <g opacity={e1(t, m('noEscala'))}><Corazon x={320} y={360 - 6 * Math.sin(t * 4)} s={0.9} /><Letrero x={320} y={680} texto="Haz lo que no escala" id={ID} tam={24} /></g>}
        </g>
        {t >= m('etapaEscala') && (
          <g opacity={e1(t, m('etapaEscala'))}>
            <Letrero x={880} y={190} texto="Etapa de escala" fondo={VIOLETA} id={ID} />
            <Persona id={ID} x={760} y={600} s={0.6} cuerpo={NARANJA} corbata />
            {t >= m('unoMuchos') && [0, 1, 2, 3, 4].map((j) => <Persona key={j} id={ID} x={900 + (j % 3) * 80} y={j < 3 ? 470 : 640} s={0.36} cuerpo={AZUL_M} />)}
            {t >= m('correo') && [0, 1, 2, 3, 4].map((j) => { const ph = ((t - m('correo')) * 0.5 + j * 0.2) % 1; return <g key={j} opacity={Math.min(1, ph * 6, (1 - ph) * 6)} transform={`translate(${lerp(800, 900 + (j % 3) * 80, ph)} ${lerp(470, j < 3 ? 380 : 550, ph)})`}><rect x={-18} y={-12} width={36} height={24} rx={4} fill={AMBAR} /><path d="M -18 -10 L 0 4 L 18 -10" stroke="#fff" strokeWidth={3} fill="none" /></g>; })}
            {t >= m('unoMuchos') && <Letrero x={880} y={680} texto="Uno a muchos" fondo={VIOLETA} id={ID} op={e1(t, m('unoMuchos'))} tam={24} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
