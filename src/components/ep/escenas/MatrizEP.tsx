import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Cuadrantes, Persona, Flujo, Nube, Auto, Carretera, Flecha, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, GRIS, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * La matriz de mercado y dolor.
 * 1 · Dos ejes que se dibujan; los cuadrantes se encienden al nombrarse con su escena dentro: ganadores (multitud que se
 *     lo cuenta), nicho (pocos con mucho valor), perdedores (vacío) y sueños y pesadillas (la licencia cada cinco o diez años).
 * 2 · El modelo de cepillo de dientes: dos veces al día, como ir al trabajo y volver.
 */

const ID = 'ep04', P = 'ep-matriz';

export const MatrizEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('ejes'), 'Dos ejes'], [m('cuatro'), 'Cuatro cuadrantes'], [m('ganadores'), 'Ganadores'], [m('nicho'), 'Nicho'], [m('perdedores'), 'Perdedores'],
    [m('suenos'), 'Sueños y pesadillas'], [m('page'), 'Modelo de cepillo de dientes'],
  ];
  const X0 = 300, Y0 = 760, S = 300;           // esquina inferior izquierda y lado de celda
  const cel = (i: number, j: number): [number, number] => [X0 + i * (S + 10) + S / 2, Y0 - j * (S + 10) - S / 2];
  const on = [e1(t, m('suenos')), e1(t, m('ganadores')), e1(t, m('perdedores')), e1(t, m('nicho'))];
  const pesadilla = sm(t, m('pesadilla'), m('pesadilla') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La matriz de mercado y dolor">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la matriz */}
      <Toma t={t} a={0} b={m('page')} cy={460}>
        <g opacity={e1(t, m('ejes'))}>
          <Cuadrantes x={X0} y={Y0} s={S} colores={['#64748b', NARANJA, '#94a3b8', ROSA]} op={on} c={c} />
          <Flecha x1={X0 - 30} y1={Y0 + 20} x2={X0 - 30} y2={Y0 - 2 * S - 40} u={sm(t, m('mercado'), m('mercado') + 1)} color={c.tenue} grosor={8} />
          <Flecha x1={X0 - 20} y1={Y0 + 30} x2={X0 + 2 * S + 50} y2={Y0 + 30} u={sm(t, m('dolor'), m('dolor') + 1)} color={c.tenue} grosor={8} />
          {t >= m('mercado') && <Txt x={X0 - 56} y={Y0 - S} textAnchor="middle" fontSize={30} fill={c.texto} transform={`rotate(-90 ${X0 - 56} ${Y0 - S})`}>Mercado</Txt>}
          {t >= m('dolor') && <Txt x={X0 + S} y={Y0 + 80} textAnchor="middle" fontSize={30} fill={c.texto}>Dolor</Txt>}
        </g>

        {/* ganadores: multitud que se lo cuenta */}
        {t >= m('ganadores') && (() => { const [cx, cy] = cel(1, 1); return <g opacity={on[1]}>
          {[-90, -30, 30, 90].map((dx, k) => <Persona key={dx} id={ID} x={cx + dx} y={cy + 60 + (k % 2) * 30} s={0.32} cuerpo="#fff" />)}
          {t >= m('boca') && [[-90, -30], [-30, 30], [30, 90]].map(([a, b], k) => <Flujo key={k} x1={cx + a} y1={cy - 20} x2={cx + b} y2={cy - 20 + (k % 2 ? -30 : 0)} t={t + k} n={3} vel={1} arco={30} color="#fff" r={5} />)}
          <Txt x={cx} y={cy - 100} textAnchor="middle" fontSize={32} fill="#fff">Ganadores</Txt>
        </g>; })()}
        {/* nicho: pocos, mucho valor */}
        {t >= m('nicho') && (() => { const [cx, cy] = cel(1, 0); return <g opacity={on[3]}>
          <Persona id={ID} x={cx} y={cy + 70} s={0.4} cuerpo="#fff" />
          <path d={`M ${cx - 70} ${cy - 30} l 140 -10 l -20 22 l 40 4 l -20 14 l -120 0 Z`} fill="#fff" opacity={0.9} transform={`translate(0 ${-6 * Math.sin(t * 2)})`} />
          <Txt x={cx} y={cy - 92} textAnchor="middle" fontSize={32} fill="#fff">Nicho</Txt>
        </g>; })()}
        {/* perdedores */}
        {t >= m('perdedores') && (() => { const [cx, cy] = cel(0, 0); return <g opacity={on[2]}>
          <Persona id={ID} x={cx} y={cy + 70} s={0.35} cuerpo="#e2e8f0" ojos={0.1} />
          <Txt x={cx} y={cy - 92} textAnchor="middle" fontSize={32} fill="#fff">Perdedores</Txt>
        </g>; })()}
        {/* sueños y pesadillas: la licencia */}
        {t >= m('suenos') && (() => { const [cx, cy] = cel(0, 1); return <g opacity={on[0]}>
          <Nube x={cx} y={cy - 30} s={0.75} t={t} color={pesadilla > 0.5 ? '#334155' : '#e2e8f0'} rayos={pesadilla > 0.5} />
          {t >= m('licencia') && <g opacity={e1(t, m('licencia'))} transform={`translate(${cx} ${cy + 70})`}>
            <rect x={-70} y={-40} width={140} height={86} rx={10} fill="#fff" /><rect x={-58} y={-26} width={38} height={46} rx={6} fill={AZUL_M} />
            <rect x={-10} y={-20} width={66} height={8} rx={4} fill="#cbd5e1" /><rect x={-10} y={-2} width={50} height={8} rx={4} fill="#cbd5e1" />
            {!movil && <Txt f="a" x={0} y={70} textAnchor="middle" fontSize={22} fill="#fff">cada 5 o 10 años</Txt>}
          </g>}
          <Txt x={cx} y={cy - 108} textAnchor="middle" fontSize={28} fill="#fff">{pesadilla > 0.5 ? 'Pesadilla' : 'Sueño'}</Txt>
        </g>; })()}
      </Toma>

      {/* 2 · el cepillo de dientes */}
      <Toma t={t} a={m('page')} b={fin + 1} cy={460}>
        <g transform={`translate(600 ${330}) rotate(${-12 + 6 * Math.sin(t * 6)})`} opacity={e1(t, m('cepillo'))}>
          <rect x={-200} y={-16} width={300} height={32} rx={16} fill={`url(#${ID}-marcaH)`} />
          <rect x={100} y={-22} width={110} height={44} rx={12} fill="#e2e8f0" />
          {Array.from({ length: 9 }, (_, k) => <rect key={k} x={106 + k * 11} y={-58} width={7} height={38} rx={3} fill={k % 2 ? '#7dd3fc' : '#fff'} />)}
        </g>
        {t >= m('cepillo') && <Letrero x={600} y={460} texto="Dos veces al día" id={ID} op={e1(t, m('cepillo') + 0.4)} />}
        {t >= m('trabajo') && <>
          <Carretera y={680} x0={140} x1={1060} avance={t * 90} op={e1(t, m('trabajo'))} />
          {(() => { const u = (t - m('trabajo')) / 3 % 2; const ida = u < 1; const x = ida ? lerp(260, 940, sm(u, 0, 1)) : lerp(940, 260, sm(u - 1, 0, 1)); return <Auto x={x} y={700} s={0.7} color={NARANJA} flip={!ida} giro={t * 300} op={e1(t, m('trabajo'))} />; })()}
          <Letrero x={200} y={770} texto="Casa" fondo={AZUL_M} id={ID} op={e1(t, m('trabajo'))} tam={26} />
          <Letrero x={1000} y={770} texto="Trabajo" fondo={VERDE} id={ID} op={e1(t, m('trabajo'))} tam={26} />
        </>}
        {t >= m('page') && <Txt f="a" x={600} y={200} textAnchor="middle" fontSize={30} fill={c.tenue} opacity={e1(t, m('page'))}>Larry Page, Google</Txt>}
      </Toma>
    </Lienzo>
  );
};
