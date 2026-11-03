import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Nodo, Reloj, Fajo, Brujula, e1, sm, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, TEAL, AMBAR } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Los cuatro pilares de la estrategia: un templo que se levanta pilar por pilar.
 * 1 · El primer pilar, roles de influencia, y sus cuatro roles: económico, usuarios, técnicos y coach.
 * 2 · El templo completo: ICP + oferta (con el regalo de la propuesta irresistible), banderas rojas (con la alerta que
 *     parpadea) y proceso comercial (con el reloj del tiempo); el techo de la estrategia cierra la estructura.
 */

const ID = 'vc06', P = 'vc-pilares';

export const PilaresVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('roles'), 'Roles de influencia'], [m('icp'), 'ICP + oferta'], [m('banderas'), 'Banderas rojas'], [m('proceso'), 'Proceso comercial'],
  ];
  const PIL: [string, string, string, string][] = [['roles', 'Roles', 'Roles', AZUL_M], ['icp', 'ICP + oferta', 'ICP', VERDE], ['banderas', 'Banderas rojas', 'Banderas', ROSA], ['proceso', 'Proceso', 'Proceso', TEAL]];
  const sube = (k: number) => (k === 0 ? 1 : sm(t, m(PIL[k][0]), m(PIL[k][0]) + 1.1));
  const techo = sm(t, m('tiempo') + 0.6, m('tiempo') + 1.6);
  const ROLES: [string, string, string, boolean][] = [['economico', 'Económico', VERDE, false], ['usuarios', 'Usuarios', AZUL_M, true], ['tecnicos', 'Técnicos', VIOLETA, true], ['coach', 'Coach', NARANJA, false]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Los 4 pilares de la estrategia">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el primer pilar y sus cuatro roles */}
      <Toma t={t} a={0} b={m('icp')} cy={470}>
        <rect x={110} y={700} width={240} height={30} rx={8} fill={c.apagado} />
        <rect x={160} y={700 - 440 * sm(t, m('roles'), m('roles') + 1.2)} width={140} height={440 * sm(t, m('roles'), m('roles') + 1.2)} rx={10} fill={AZUL_M} />
        <Txt x={230} y={780} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('roles'))}>Roles</Txt>
        {ROLES.map(([a, n, col, varios], k) => {
          const x = 500 + (k % 2) * 330, y = 300 + Math.floor(k / 2) * 300;
          return (
            <Nodo key={a} x={x} y={y} r={66} nombre={n} figura={varios ? 'grupo' : 'uno'} color={col} op={e1(t, m(a))} isDark={isDark} id={ID}>
              {k === 0 && t >= m(a) && <g transform="translate(46 50)"><Fajo x={0} y={0} n={2} w={44} /></g>}
              {k === 3 && t >= m(a) && <g transform="translate(52 -46)"><Brujula x={0} y={0} r={22} ang={25 * Math.sin(t * 2)} id={ID} /></g>}
            </Nodo>
          );
        })}
      </Toma>

      {/* 2 · el templo */}
      <Toma t={t} a={m('icp')} b={fin + 1} cy={470}>
        <rect x={150} y={690} width={900} height={36} rx={10} fill={c.apagado} />
        <path d={`M 130 ${300 - 30 * (1 - techo)} L 600 ${170 - 30 * (1 - techo)} L 1070 ${300 - 30 * (1 - techo)} Z`} fill={`url(#${ID}-marca)`} opacity={techo} />
        {techo > 0.3 && <Txt x={600} y={278} textAnchor="middle" fontSize={30} fill="#fff" opacity={techo}>Estrategia</Txt>}
        {PIL.map(([a, n, corto, col], k) => {
          const x = 240 + k * 240, h = 370 * sube(k);
          const tieneAlerta = k === 2 && t >= m('alerta');
          return (
            <g key={a}>
              <rect x={x - 60} y={690 - h} width={120} height={h} rx={10} fill={col} opacity={tieneAlerta ? 0.75 + 0.25 * Math.sin(t * 8) : 1} />
              <rect x={x} y={690 - h} width={60} height={h} rx={10} fill="#000" opacity={0.12} />
              <Txt x={x} y={770} textAnchor="middle" fontSize={26} fill={c.texto} opacity={sube(k)}>{movil ? corto : n}</Txt>
              {k === 1 && t >= m('oferta') && (
                <g opacity={e1(t, m('oferta'))} transform={`translate(${x} 470)`}>
                  <rect x={-34} y={-20} width={68} height={50} rx={6} fill="#fff" /><rect x={-40} y={-34} width={80} height={18} rx={5} fill="#ffe4d6" /><rect x={-6} y={-34} width={12} height={64} fill={ROSA} />
                </g>
              )}
              {k === 2 && t >= m('banderas') && (
                <g opacity={e1(t, m('banderas'))} transform={`translate(${x - 24} 400)`}>
                  <rect x={0} y={0} width={6} height={90} rx={3} fill="#fff" /><path d={`M 6 2 Q ${28 + 6 * Math.sin(t * 5)} -6 50 6 Q ${30 + 6 * Math.sin(t * 5 + 1)} 18 6 30 Z`} fill="#fff" />
                </g>
              )}
              {k === 3 && t >= m('tiempo') && <g opacity={e1(t, m('tiempo'))}><Reloj x={x} y={470} r={44} t={t} aro="#fff" /></g>}
            </g>
          );
        })}
        {t >= m('alerta') && t < m('proceso') && <Letrero x={600} y={830} texto="Alerta temprana" fondo={ROSA} id={ID} op={e1(t, m('alerta'))} tam={24} />}
        {t >= m('oferta') && t < m('banderas') && <Letrero x={600} y={830} texto="Oferta irresistible" fondo={VERDE} id={ID} op={e1(t, m('oferta'))} tam={24} />}
        {t >= m('tiempo') && <Letrero x={600} y={830} texto="Tiempo y recursos en todo el ciclo" fondo={TEAL} id={ID} op={e1(t, m('tiempo'))} tam={24} />}
      </Toma>
    </Lienzo>
  );
};
