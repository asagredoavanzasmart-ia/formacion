import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Edificio, Busto, Cruz, e1, sm, tono, useMovil, azar, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Perfil del cliente ideal.
 * 1 · «Cualquier empresa»: un enjambre de edificios grises; la diana se cierra y solo quedan unos pocos encendidos.
 *     Las tres capas del ICP: la empresa, los disparadores y las personas.
 * 2 · Las siete preguntas sobre tus mejores clientes, que se marcan una a una; la última es el anti-ICP.
 * 3 · La matriz de dolores (urgencia × impacto): cosmético, eficiencia, reactivo y la zona de impacto estratégico.
 */

const ID = 'vc13', P = 'vc-icp';

export const IcpVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('error'), 'El error número uno'], [m('especifico'), 'Más específico, más ventas'], [m('capas'), 'Tres capas'],
    [m('siete'), 'Siete preguntas'], [m('matriz'), 'La matriz de dolores'], [m('zona'), 'Zona de impacto estratégico'],
  ];
  const EDS = Array.from({ length: 14 }, (_, k) => [110 + azar(k + 1) * 400, 260 + azar(k + 40) * 460, k % 5 === 0] as [number, number, boolean]);
  const cierra = sm(t, m('especifico'), m('especifico') + 1.5);
  const CAPAS: [string, string, string][] = [['empresa', 'Empresa', AZUL_M], ['disparadores', 'Disparadores', AMBAR], ['personas', 'Personas', VERDE]];
  const PREG = ['Tamaño y problema', 'Sin demos infinitas', 'Se queda y te refiere', 'Le duele de verdad', 'Evento que dispara', 'Quién firma', 'Anti-ICP'];
  const tP = (k: number) => (k === 1 ? m('demos') : k === 6 ? m('anti') : k === 0 ? m('siete') + 1.5 : k < 1 ? m('siete') : m('demos') + 2.4 * (k - 1));
  const CUAD: [string, number, number, string, string][] = [['cosmetico', 0, 1, 'Cosmético', GRIS], ['cosmetico', 1, 1, 'Eficiencia', AZUL_M], ['cosmetico', 0, 0, 'Reactivo', AMBAR], ['zona', 1, 0, 'Estratégico', ROSA]];
  const tQ = (k: number) => m(CUAD[k][0]) + (k === 1 ? 1.1 : k === 2 ? 2.2 : 0);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Perfil del cliente ideal">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la diana y las tres capas */}
      <Toma t={t} a={0} b={m('siete')} cy={470}>
        {cierra > 0.01 && [220, 150, 80].map((r, k) => <circle key={r} cx={310} cy={490} r={r + 120 * (1 - cierra)} fill={k % 2 ? c.panel : ROSA} opacity={0.18 + 0.1 * k} />)}
        {EDS.map(([x, y, ideal], k) => {
          const dx = ideal ? (310 - x) * 0.55 * cierra : 0, dy = ideal ? (490 - y) * 0.55 * cierra : 0;
          return t >= m('error') + 0.08 * k && <Edificio key={k} x={x + dx} y={y + dy + 40} w={46} h={70} color={ideal && cierra > 0.5 ? NARANJA : GRIS} op={(ideal ? 1 : 1 - 0.75 * cierra) * e1(t, m('error') + 0.08 * k)} />;
        })}
        {t >= m('error') && t < m('especifico') && <Letrero x={310} y={200} texto="«Cualquier empresa»" fondo={GRIS} id={ID} op={e1(t, m('error'))} tam={26} />}
        {CAPAS.map(([a, n, col], k) => {
          const y = 270 + k * 200;
          return t >= m(a) && (
            <g key={a} opacity={e1(t, m(a))} transform={`translate(${(1 - e1(t, m(a))) * 40} 0)`}>
              <rect x={620} y={y - 80} width={520} height={160} rx={26} fill={col} opacity={0.9} />
              <Txt x={650} y={y + 12} fontSize={32} fill="#fff">{n}</Txt>
              {k === 0 && [0, 1, 2].map((j) => <Edificio key={j} x={980 + j * 54} y={y + 50} w={40} h={60 + j * 16} color="#fff" />)}
              {k === 1 && <><path d="M 1010 200 L 980 280 H 1004 L 990 340 L 1040 250 H 1014 L 1032 200 Z" transform={`translate(0 ${y - 270})`} fill="#fff" /><path d={`M 1080 ${y + 40} V ${y - 40} M 1060 ${y - 20} L 1080 ${y - 44} L 1100 ${y - 20}`} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" /></>}
              {k === 2 && [0, 1, 2].map((j) => <Busto key={j} x={990 + j * 52} y={y + 10} s={0.9} color="#fff" />)}
            </g>
          );
        })}
      </Toma>

      {/* 2 · siete preguntas */}
      <Toma t={t} a={m('siete')} b={m('matriz')} cy={470}>
        {PREG.map((s, k) => {
          const y = 170 + k * 88, t0 = tP(k), anti = k === 6;
          return t >= t0 && (
            <g key={s} opacity={e1(t, t0)} transform={`translate(${(1 - e1(t, t0)) * 30} 0)`}>
              <rect x={280} y={y - 36} width={640} height={72} rx={36} fill={anti ? ROSA : c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
              <circle cx={318} cy={y} r={26} fill={anti ? '#fff' : `url(#${ID}-marca)`} />
              <Txt x={318} y={y + 9} textAnchor="middle" fontSize={26} fill={anti ? ROSA : '#fff'}>{k + 1}</Txt>
              <Txt x={366} y={y + 10} fontSize={movil ? 26 : 28} fill={anti ? '#fff' : c.texto}>{s}</Txt>
              {anti && <Cruz x={1000} y={y} r={26} />}
            </g>
          );
        })}
      </Toma>

      {/* 3 · la matriz de dolores */}
      <Toma t={t} a={m('matriz')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('matriz'))}>
          <Txt x={250} y={450} textAnchor="middle" fontSize={26} fill={c.tenue} transform="rotate(-90 250 450)">Urgencia</Txt>
          <Txt x={630} y={790} textAnchor="middle" fontSize={26} fill={c.tenue}>Impacto</Txt>
          <path d="M 290 750 V 150 M 290 750 H 990" stroke={c.apagado} strokeWidth={6} strokeLinecap="round" />
        </g>
        {CUAD.map(([, cx, cy, n, col], k) => {
          const x = 300 + cx * 340, y = 160 + cy * 290, zona = k === 3;
          const brilla = zona && t >= m('zona') ? 0.85 + 0.15 * Math.sin(t * 4) : 1;
          return t >= tQ(k) && (
            <g key={n} opacity={e1(t, tQ(k))}>
              <rect x={x} y={y} width={330} height={280} rx={24} fill={col} opacity={(zona ? 0.95 : 0.75) * brilla} />
              <Txt x={x + 165} y={y + 150} textAnchor="middle" fontSize={30} fill="#fff">{n}</Txt>
            </g>
          );
        })}
        {t >= m('riesgo') && <g opacity={e1(t, m('riesgo'))}><Edificio x={930} y={410} w={56} h={80} color="#fff" /><path d="M 930 340 l -8 22 l 12 10 l -10 22" stroke={ROSA} strokeWidth={5} fill="none" /></g>}
        {t >= m('riesgo') && <Letrero x={640} y={830} texto="Pone en riesgo crecer o sobrevivir" id={ID} op={e1(t, m('riesgo'))} tam={24} />}
      </Toma>
    </Lienzo>
  );
};
