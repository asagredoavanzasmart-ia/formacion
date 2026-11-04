import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Edificio, Fajo, Moneda3D, Cifra, Curva, Sello, e1, sm, ventana, lerp, brillo, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * El retorno que nadie mide.
 * Toma 1 (Reinares): estudios con curvas que suben brillando y el sello «tendenciosos»; la alcancía que traga monedas
 * y no devuelve: 60 % (con el triángulo de advertencia, porque no se sabe quién hizo esos informes); el consultor
 * que la usa como argumento de venta; la empresa que se agrieta.
 * Toma 2 (Newell): cincuenta empresas, cuarenta y cinco sin regla para medir: el 90 % sin modelo de retorno.
 * Toma 3 (The Data Warehouse Institute): tres fajos —más de diez millones, menos de quinientos mil, menos de cien mil—
 * y el visto en el más chico: el tamaño no decide el resultado.
 */

const ID = 'cp07', P = 'cp-retorno';

export const RetornoCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('directo'), 'Reinares, más directo'], [m('sesenta'), 'Nunca se recupera'], [m('advertencia'), 'Una advertencia'], [m('argumento'), 'Argumento de venta'],
    [m('nadiedefine'), 'Nadie define el retorno'], [m('pyme'), 'Una buena noticia para la pyme'], [m('tamano'), 'El tamaño no decide'],
  ];
  const cae = (k: number) => ((t - m('sesenta')) * 0.8 + k / 3) % 1;
  const grieta = sm(t, m('comprometer'), m('comprometer') + 1);
  const FAJOS: [string, string, number, string, string][] = [['trece', 'Más de 10 millones', 13, ROJO_M, 'US$'], ['cuarenta', 'Menos de 500.000', 40, AMBAR, 'US$'], ['dieciseis', 'Menos de 100.000', 16, VERDE, 'US$']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El retorno que nadie mide">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Reinares: estudios tendenciosos y la alcancía que no devuelve */}
      <Toma t={t} a={0} b={m('nadiedefine')} cy={500}>
        {ventana(t, m('directo'), m('sesenta')) > 0.01 && (
          <g opacity={ventana(t, m('directo'), m('sesenta'))}>
            {[0, 1, 2].map((k) => (
              <g key={k} transform={`translate(${200 + k * 300} 250)`}>
                <rect x={0} y={0} width={240} height={300} rx={14} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                <Curva pts={[[30, 250], [90, 210], [150, 140], [210, 50]]} u={sm(t, m('directo') + 0.3 * k, m('directo') + 0.3 * k + 1.2)} color={VERDE} grosor={8} />
              </g>
            ))}
            <Sello x={600} y={680} texto="TENDENCIOSOS" u={sm(t, m('tendenciosos'), m('tendenciosos') + 0.6)} color={GRIS} />
          </g>
        )}
        {t >= m('sesenta') && (
          <g opacity={e1(t, m('sesenta'))}>
            <g transform={`translate(330 ${560 + 90 * grieta})`}>
              <ellipse cx={0} cy={0} rx={150} ry={110} fill={ROSA} />
              <circle cx={130} cy={-20} r={30} fill={ROSA} /><circle cx={140} cy={-26} r={6} fill="#7f1d1d" />
              <rect x={-30} y={-112} width={70} height={14} rx={7} fill="#7f1d1d" />
              {[-90, 60].map((lx) => <rect key={lx} x={lx} y={90} width={30} height={50} rx={10} fill={ROSA} />)}
              {grieta > 0 && <path d={`M -40 -100 L -10 -40 L -40 0 L 0 60`} stroke="#7f1d1d" strokeWidth={6} fill="none" opacity={grieta} />}
            </g>
            {[0, 1, 2].map((k) => <Moneda3D key={k} x={335} y={300 + 140 * cae(k)} r={24} op={1 - cae(k)} />)}
            <Cifra x={830} y={480} valor={60} u={sm(t, m('sesenta'), m('sesenta') + 1.2)} suf=" %" tam={120} color={ROJO_M} />
            <Letrero x={830} y={560} texto="Nunca se recupera" fondo={ROJO_M} id={ID} tam={28} />
          </g>
        )}
        {t >= m('advertencia') && (
          <g opacity={e1(t, m('advertencia'))} transform="translate(830 680)">
            <path d="M 0 -60 L 60 46 H -60 Z" fill={AMBAR} /><rect x={-5} y={-24} width={10} height={40} rx={5} fill="#fff" /><circle cy={30} r={6} fill="#fff" />
          </g>
        )}
        {t >= m('advertencia') && !movil && <Txt f="a" x={830} y={780} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('advertencia') + 0.3)}>Informes que Reinares no identifica</Txt>}
        {ventana(t, m('argumento'), m('nadiedefine')) > 0.01 && <g opacity={ventana(t, m('argumento'), m('nadiedefine'))}><Persona id={ID} x={540} y={790} s={0.5} corbata cuerpo="#334155" /></g>}
      </Toma>

      {/* 2 · Newell: el 90 % sin modelo de retorno */}
      <Toma t={t} a={m('nadiedefine')} b={m('pyme')} cy={480}>
        {Array.from({ length: 50 }, (_, k) => {
          const f = Math.floor(k / 10), j = k % 10;
          const con = k % 10 === 4;
          const on = t >= m('noventa') - 0.1;
          return (
            <g key={k} opacity={e1(t, m('cincuenta') + 0.02 * k)} transform={`translate(${170 + j * 96} ${250 + f * 100})`}>
              <rect x={-26} y={-60} width={52} height={60} rx={6} fill={on && !con ? c.apagado : AZUL_M} />
              <rect x={-16} y={-48} width={12} height={10} rx={2} fill="#fde68a" opacity={0.8} /><rect x={4} y={-48} width={12} height={10} rx={2} fill="#fde68a" opacity={0.8} />
              {on && con && <rect x={-30} y={4} width={60} height={10} rx={3} fill={AMBAR} />}
            </g>
          );
        })}
        <Cifra x={600} y={790} valor={90} u={sm(t, m('noventa'), m('noventa') + 1)} suf=" % sin modelo de retorno" tam={52} color={ROJO_M} />
      </Toma>

      {/* 3 · The Data Warehouse Institute */}
      <Toma t={t} a={m('pyme')} b={fin + 1} cy={500}>
        {FAJOS.map(([n, rot2, pct, col], k) => {
          const x = 240 + k * 360;
          const on = t >= m(n);
          const destaca = k === 2 && t >= m('tamano');
          return (
            <g key={n} opacity={on ? e1(t, m(n)) : 0}>
              <g transform={`translate(${x} 620)`} opacity={1 - 0.05 * brillo(t, destaca)}><Fajo x={0} y={0} n={[9, 4, 2][k]} w={[200, 150, 110][k]} /></g>
              <Cifra x={x} y={380} valor={pct} u={sm(t, m(n), m(n) + 1)} suf=" %" tam={84} color={col} />
              <Txt f="a" x={x} y={440} textAnchor="middle" fontSize={26} fill={c.texto}>{movil ? ['> 10 M', '< 500 mil', '< 100 mil'][k] : rot2}</Txt>
            </g>
          );
        })}
        {t >= m('dieciseis') && <Letrero x={960} y={720} texto="Beneficios medibles" fondo={VERDE} id={ID} tam={26} op={e1(t, m('dieciseis') + 0.5)} />}
        {!movil && <Txt f="a" x={600} y={200} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('pyme'))}>Gasto en CRM · The Data Warehouse Institute, citado por Newell</Txt>}
        {t >= m('tamano') && <Letrero x={600} y={812} texto="El tamaño de la inversión no decide" id={ID} tam={28} op={e1(t, m('tamano'))} />}
      </Toma>
    </Lienzo>
  );
};
