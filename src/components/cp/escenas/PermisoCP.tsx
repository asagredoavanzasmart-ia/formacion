import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Ficha, Gente, Cifra, Burbuja, Reloj, Visto, Cruz, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Preguntar mejor, no más (Newell).
 * Toma 1: el intercambio — el cliente abre el candado de su ficha y la entrega; a cambio recibe un regalo; muchas
 * preguntas en fila se reducen a una buena.
 * Toma 2 (Teradata, 2001): de cada diez, ocho comparten sus datos a cambio de un servicio más personal; si nunca ven
 * el beneficio, la cara se apaga.
 * Toma 3 (Brann Worldwide): de cada diez, hasta cinco se van; tres causas: ofertas irrelevantes, vendedores mal
 * informados y demoras o silencio.
 */

const ID = 'cp17', P = 'cp-permiso';

export const PermisoCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('permiso'), 'Cuando da su permiso'], [m('cambio'), 'Y obtiene algo a cambio'], [m('subtitulo'), 'Que el cliente gestione'], [m('mejor'), 'Preguntar mejor'],
    [m('teradata'), 'Teradata, 2001'], [m('decepciona'), 'Si no ve el beneficio'], [m('brann'), 'Brann Worldwide'], [m('irrelevantes'), 'Las causas'],
  ];
  const abre = sm(t, m('permiso'), m('permiso') + 0.8);
  const entrega = sm(t, m('permiso') + 0.8, m('permiso') + 2);
  const regalo = sm(t, m('cambio'), m('cambio') + 1.2);
  const reduce = sm(t, m('mejor'), m('mejor') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Preguntar mejor, no más">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el intercambio */}
      <Toma t={t} a={0} b={m('teradata')} cy={500}>
        <Persona id={ID} x={220} y={760} s={0.95} cuerpo={NARANJA} />
        <Persona id={ID} x={980} y={760} s={0.95} corbata cuerpo={VIOLETA} />
        <g opacity={e1(t, m('permiso'))} transform={`translate(${lerp(320, 860, entrega)} ${520 - 80 * Math.sin(Math.PI * entrega)})`}>
          <Ficha x={0} y={0} s={1.2} />
          <g transform="translate(46 -36)" opacity={1 - entrega}><rect x={-18} y={-4} width={36} height={30} rx={6} fill={AMBAR} /><path d={`M -10 -4 V -16 A 10 10 0 0 1 10 -16 V ${lerp(-4, -24, abre)}`} stroke={AMBAR} strokeWidth={6} fill="none" /></g>
        </g>
        {t >= m('cambio') && <g opacity={e1(t, m('cambio'))} transform={`translate(${lerp(860, 330, regalo)} ${400 - 60 * Math.sin(Math.PI * regalo)})`}><rect x={-40} y={-34} width={80} height={68} rx={8} fill={ROSA} /><rect x={-8} y={-34} width={16} height={68} fill={AMBAR} /><rect x={-48} y={-46} width={96} height={20} rx={6} fill={ROSA} /></g>}
        {t >= m('mejor') - 1.5 && (
          <g opacity={e1(t, m('mejor') - 1.5)}>
            {[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={k === 2 ? 1 : 1 - reduce} transform={`translate(${600} ${lerp(200 + k * 70, 330, k === 2 ? reduce : 0)})`}><rect x={-120} y={-26} width={240} height={52} rx={26} fill={k === 2 ? `url(#${ID}-marca)` : c.panel2} /><Txt x={0} y={10} textAnchor="middle" fontSize={28} fill={k === 2 ? '#fff' : c.tenue}>?</Txt></g>)}
          </g>
        )}
        {t >= m('subtitulo') && <Letrero x={600} y={812} texto={t >= m('mejor') ? 'No preguntar más: preguntar mejor' : 'El cliente gestiona la relación'} id={ID} tam={28} op={e1(t, m('subtitulo'))} />}
      </Toma>

      {/* 2 · Teradata: ocho de cada diez */}
      <Toma t={t} a={m('teradata')} b={m('brann')} cy={480}>
        <Gente x={175} y={560} n={10} activos={t >= m('ochenta') ? 8 : 0} color={VERDE} paso={95} s={1.1} op={e1(t, m('teradata'))} />
        <Cifra x={600} y={300} valor={80} u={sm(t, m('ochenta'), m('ochenta') + 1)} suf=" %" tam={110} color={VERDE} />
        {t >= m('ochenta') && <Letrero x={600} y={660} texto="Comparte a cambio de un servicio más personal" fondo={VERDE} id={ID} tam={26} op={e1(t, m('ochenta') + 0.6) * (1 - sm(t, m('decepciona'), m('decepciona') + 0.4))} />}
        {t >= m('decepciona') && (
          <g opacity={e1(t, m('decepciona'))}>
            <Letrero x={600} y={660} texto="Sin beneficio, se decepciona" fondo={ROSA} id={ID} tam={26} />
            {t >= m('costo') && <Letrero x={600} y={790} texto="La decepción tiene un costo" fondo={ROJO_M} id={ID} tam={26} op={e1(t, m('costo'))} />}
          </g>
        )}
      </Toma>

      {/* 3 · Brann Worldwide: hasta la mitad se va */}
      <Toma t={t} a={m('brann')} b={fin + 1} cy={480}>
        <Gente x={175} y={480} n={10} activos={t >= m('cincuenta') ? 5 : 0} color={ROSA} paso={95} s={1} op={e1(t, m('brann'))} />
        <Cifra x={600} y={250} valor={50} u={sm(t, m('cincuenta'), m('cincuenta') + 1)} pre="Hasta " suf=" %" tam={90} color={ROSA} />
        {t >= m('cincuenta') && <Txt f="a" x={600} y={580} textAnchor="middle" fontSize={26} fill={c.texto} opacity={e1(t, m('cincuenta') + 0.8)}>dispuesto a dejar de comprar</Txt>}
        {([['irrelevantes', 'Ofertas irrelevantes', NARANJA], ['informados', 'Vendedores mal informados', VIOLETA], ['silencio', 'Demoras o silencio', GRIS]] as const).map(([n, s, col], k) => (
          <Letrero key={n} x={600} y={(movil ? 640 : 650) + k * (movil ? 76 : 62)} texto={s} fondo={col} id={ID} tam={26} op={e1(t, m(n))} />
        ))}
        {t >= m('silencio') && <Reloj x={1060} y={720} r={44} t={t} vel={2} />}
      </Toma>
    </Lienzo>
  );
};
