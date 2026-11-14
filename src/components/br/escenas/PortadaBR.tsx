import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Libro, Embudo, Megafono, Billete, Frasco, Sello, Visto, Cruz, Flecha, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Portada: quién es Brunson y cómo leerlo.
 * Toma 1: dos empresas en la subasta de anuncios; la que gasta más en cada cliente tiene la flecha de crecimiento más alta.
 * Toma 2: el camino de Brunson: el luchador, la pistola de papas (2002), el embudo de ClickFunnels (2014), los cien mil
 * clientes y los tres libros, con el sello del prólogo de Kennedy.
 * Toma 3: cómo leerlo: a la izquierda la práctica sin auditar (con el autor que vende el software), a la derecha los
 * tres estudios con respaldo que se apilan, y una cruz sobre «el método completo».
 */

const ID = 'br01', P = 'br-portada';

const Tubo: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(-24)`}>
    <rect x={-110} y={-16} width={180} height={32} rx={16} fill="#e2e8f0" style={sombra(0.2, 2, 6)} />
    <rect x={60} y={-30} width={70} height={60} rx={20} fill="#cbd5e1" />
    <circle cx={-118} cy={0} r={18} fill="#a16207" />
  </g>
);

export const PortadaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [0.2, 'Gastar más y crecer más'], [m('autor'), 'Russell Brunson'], [m('trilogia'), 'Una trilogía'],
    [m('criterio'), 'Cómo leerlo'], [m('pares'), 'Lo que tiene respaldo'], [m('falta'), 'Lo que no se ha medido'],
  ];
  const crece = sm(t, m('crecen'), m('crecen') + 2);
  const camino = sm(t, m('luchador'), m('trilogia') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Los secretos de Brunson">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Dos empresas en la subasta */}
      <Toma t={t} a={0} b={m('autor')} cy={470}>
        {[0, 1].map((k) => {
          const x = k === 0 ? 330 : 870, gana = k === 1;
          const alto = gana ? lerp(60, 380, crece) : lerp(60, 120, crece);
          return (
            <g key={k} opacity={e1(t, 0.3 + k * 0.4)}>
              <rect x={x - 200} y={170} width={400} height={600} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
              <Frasco x={x - 90} y={700} w={110} h={170} v={gana ? 0.75 : 0.3} t={t} c={c} rojo={!gana} />
              <Megafono x={x + 50} y={640} s={0.62} habla={1} t={t} />
              <rect x={x + 110} y={560 - alto} width={60} height={alto} rx={14} fill={gana ? VERDE : GRIS} opacity={0.85} />
              <Letrero x={x} y={250} texto={gana ? 'Gasta más por cliente' : 'Gasta poco'} fondo={gana ? VERDE : GRIS} id={ID} tam={28} />
              {t >= m('crecen') && <Letrero x={x} y={740} texto={gana ? 'Crece' : 'Se estanca'} fondo={gana ? VERDE : GRIS} id={ID} tam={26} op={e1(t, m('crecen'))} />}
            </g>
          );
        })}
      </Toma>

      {/* 2 · El camino de Brunson */}
      <Toma t={t} a={m('autor')} b={m('criterio')} cy={480}>
        <rect x={110} y={640} width={980} height={14} rx={7} fill={c.apagado} />
        <rect x={110} y={640} width={980 * camino} height={14} rx={7} fill={`url(#${ID}-marcaH)`} />
        {t >= m('luchador') - 0.1 && (
          <g opacity={e1(t, m('luchador'))}>
            <Persona id={ID} x={190} y={610} s={0.62} cuerpo={NARANJA} />
            <Letrero x={190} y={700} texto="Luchador" id={ID} tam={26} />
          </g>
        )}
        {t >= m('papas') - 0.1 && (
          <g opacity={e1(t, m('papas'))}>
            <Tubo x={420} y={520} s={0.9} />
            <Letrero x={420} y={700} texto="2002" fondo={AMBAR} id={ID} tam={26} />
          </g>
        )}
        {t >= m('cofundo') - 0.1 && (
          <g opacity={e1(t, m('cofundo'))}>
            <Embudo x={680} y={380} w={240} alto={52} tam={20} franjas={[{ n: 'Visita', color: NARANJA }, { n: 'Oferta', color: ROSA }, { n: 'Cliente', color: VIOLETA }]} />
            <Letrero x={680} y={700} texto="ClickFunnels 2014" fondo={ROSA} id={ID} tam={26} />
          </g>
        )}
        {t >= m('cienmil') - 0.1 && <Cifra x={680} y={300} valor={100000} u={sm(t, m('cienmil'), m('cienmil') + 1.2)} tam={54} color={VERDE} pre="+" miles />}
        {t >= m('trilogia') - 0.1 && (
          <g opacity={e1(t, m('trilogia'))}>
            {[['Secretos punto com', '2015', NARANJA], ['Secretos de expertos', '2017', ROSA], ['Secretos del tráfico', '2020', AZUL_M]].map(([ti, an, col], k) => (
              <g key={k} opacity={e1(t, m('trilogia') + k * 0.3)}>
                <Libro x={900 + (k - 1) * 125} y={560} color={col} titulo={an} autor="" s={0.62} c={c} />
              </g>
            ))}
            <Letrero x={940} y={700} texto="La trilogía" fondo={AZUL_M} id={ID} tam={26} />
          </g>
        )}
        {t >= m('kennedy') && <Sello x={940} y={260} texto={movil ? 'Dan Kennedy' : 'Prólogo: Dan Kennedy'} u={sm(t, m('kennedy'), m('kennedy') + 0.6)} color={VIOLETA} tam={26} rot={-6} />}
      </Toma>

      {/* 3 · Cómo leerlo */}
      <Toma t={t} a={m('criterio')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('criterio'))}>
          <rect x={90} y={170} width={480} height={600} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Letrero x={330} y={230} texto="Práctica" fondo={GRIS} id={ID} tam={30} />
          {t >= m('practicante') && (
            <g opacity={e1(t, m('practicante'))}>
              <Persona id={ID} x={250} y={560} s={0.6} cuerpo={NARANJA} />
              <Billete x={420} y={420} s={1.1} rot={-10} />
              <Sello x={360} y={640} texto="Sin auditar" u={sm(t, m('practicante') + 0.4, m('practicante') + 1)} tam={30} />
            </g>
          )}
          {t >= m('vende') && <Letrero x={330} y={720} texto={movil ? 'Vende el software' : 'El autor vende el software'} fondo={ROJO_M} id={ID} tam={24} op={e1(t, m('vende'))} />}
        </g>
        {t >= m('pares') && (
          <g opacity={e1(t, m('pares'))}>
            <rect x={630} y={170} width={480} height={600} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Letrero x={870} y={230} texto="Con respaldo" fondo={VERDE} id={ID} tam={30} />
            {([['cero', 'Precio cero', '2007'], ['anclaje', 'Anclaje', '1974'], ['reactancia', 'Reactancia', '1966']] as const).map(([n, txt, an], k) => (
              <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0} transform={`translate(0 ${-24 * sm(t, m(n), m(n) + 0.6)})`}>
                <rect x={680} y={320 + k * 110} width={380} height={86} rx={18} fill={c.panel2} />
                <Visto x={724} y={363 + k * 110} r={22} />
                <Txt x={764} y={374 + k * 110} fontSize={30} fill={c.texto} peso={800}>{txt}</Txt>
                {!movil && <Txt f="a" x={1040} y={374 + k * 110} textAnchor="end" fontSize={24} fill={c.tenue}>{an}</Txt>}
              </g>
            ))}
            {t >= m('falta') && (
              <g opacity={ventana(t, m('falta'), fin + 1)}>
                <rect x={680} y={660} width={380} height={80} rx={18} fill={c.panel2} />
                <Cruz x={724} y={700} r={22} />
                <Txt x={764} y={711} fontSize={28} fill={c.texto} peso={800}>{movil ? 'El método' : 'El método completo'}</Txt>
              </g>
            )}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
