import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Fajo, Nube, Hoja, Edificio, Burbuja, Brujula, Visto, Cruz, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Identificar al comprador económico: una pirámide de niveles y una insignia dorada que flota.
 * 1 · La insignia sube y baja; cuatro fuerzas la empujan hacia arriba: presupuesto, condiciones, experiencia, impacto.
 * 2 · Tu empresa frente al cliente: el nivel equivalente, el riesgo, la regla de oro (un nivel por encima), las preguntas
 *     indirectas, el técnico que dice tener la última palabra y la confirmación con el coach.
 */

const ID = 'vc08', P = 'vc-economico';
const NIV = [230, 370, 510, 650];

const Piramide: React.FC<{ x: number; s?: number; c: ReturnType<typeof import('./kitVC').tono>; luz?: number; op?: number }> = ({ x, s = 1, c, luz = -1, op = 1 }) => (
  <g opacity={op} transform={`translate(${x} 0) scale(${s} 1)`}>
    {NIV.map((y, k) => {
      const w = 120 + k * 90;
      return <rect key={k} x={-w} y={y - 55} width={2 * w} height={110} rx={14} fill={luz === k ? NARANJA : c.panel2} opacity={luz === k ? 0.9 : 1} />;
    })}
  </g>
);

const Insignia: React.FC<{ x: number; y: number; t: number; op?: number }> = ({ x, y, t, op = 1 }) => (
  <g opacity={op} transform={`translate(${x} ${y + 4 * Math.sin(t * 3)})`}>
    <circle r={40} fill={AMBAR} style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} /><circle r={30} fill="#fde68a" />
    <path d="M -18 6 L -18 -12 L -8 -2 L 0 -16 L 8 -2 L 18 -12 L 18 6 Z" fill={AMBAR} />
  </g>
);

export const EconomicoVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('autoridad'), 'Libera fondos y veta'], [m('estatico'), 'No es estático'], [m('flotar'), 'Factor de flotación'],
    [m('preguntas'), 'Dos preguntas'], [m('oro'), 'La regla de oro'], [m('indirectas'), 'Confírmalo'],
  ];
  const VARS: [string, string][] = [['presupuesto', 'Presupuesto'], ['condiciones', 'Condiciones'], ['experiencia', 'Experiencia'], ['impacto', 'Impacto']];
  // Nivel de la insignia (0 = arriba, 3 = base).
  let nivel = 2;
  if (t >= m('sube') && t < m('flotar')) nivel = 2 - 1.2 * Math.sin((t - m('sube')) * 1.4);
  if (t >= m('flotar')) {
    nivel = 3;
    VARS.forEach(([a], k) => { nivel -= (k < 3 ? 1 : 0) * sm(t, m(a), m(a) + 1); });
  }
  const yIns = lerp(NIV[0], NIV[3], nivel / 3);
  const ins2 = t >= m('encima') ? lerp(NIV[2], NIV[1], sm(t, m('encima'), m('encima') + 1)) : NIV[2];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Identificando al comprador económico">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la insignia flota */}
      <Toma t={t} a={0} b={m('preguntas')} cy={470}>
        <Piramide x={360} c={c} op={e1(t, 0.3)} />
        <Insignia x={360} y={yIns} t={t} op={e1(t, m('autoridad'))} />
        {t >= m('autoridad') && t < m('flotar') && <g opacity={e1(t, m('autoridad'))}><Fajo x={860} y={420} n={3} w={110} /><Cruz x={1010} y={380} r={30} /></g>}
        {t >= m('estatico') && t < m('flotar') && <Letrero x={880} y={600} texto={t >= m('sube') ? 'Sube o baja según el riesgo' : 'Cambia según la venta'} fondo={GRIS} id={ID} op={e1(t, t >= m('sube') ? m('sube') : m('estatico'))} tam={26} />}
        {VARS.map(([a, n], k) => t >= m(a) && (
          <g key={a} opacity={e1(t, m(a))}>
            <g transform={`translate(760 ${NIV[k]})`}>
              {k === 0 && <Fajo x={0} y={22} n={2} w={70} />}
              {k === 1 && <Nube x={0} y={0} s={0.45} t={t} />}
              {k === 2 && <Hoja x={-30} y={-40} w={60} h={78} lineas={3} color={VIOLETA} />}
              {k === 3 && <Edificio x={0} y={44} w={60} h={88} color={AZUL_M} />}
            </g>
            <Txt x={830} y={NIV[k] + 10} fontSize={30} fill={c.texto}>{n}</Txt>
            <path d={`M 700 ${NIV[k]} L 560 ${NIV[k]}`} stroke={NARANJA} strokeWidth={4} strokeDasharray="8 8" opacity={0.6} />
          </g>
        ))}
      </Toma>

      {/* 2 · dónde buscar y cómo confirmarlo */}
      <Toma t={t} a={m('preguntas')} b={fin + 1} cy={470}>
        <Piramide x={280} s={0.62} c={c} luz={t >= m('nivel') ? 2 : -1} op={1 - sm(t, m('indirectas'), m('indirectas') + 0.6)} />
        {t < m('indirectas') && <Txt x={280} y={760} textAnchor="middle" fontSize={28} fill={c.texto}>Tu empresa</Txt>}
        <Piramide x={830} s={0.8} c={c} luz={t >= m('nivel') ? 2 : -1} />
        <Txt x={830} y={760} textAnchor="middle" fontSize={28} fill={c.texto}>Cliente</Txt>
        {t >= m('nivel') && t < m('indirectas') && <line x1={420} y1={NIV[2]} x2={640} y2={NIV[2]} stroke={NARANJA} strokeWidth={5} strokeDasharray="10 10" opacity={e1(t, m('nivel'))} />}
        {t >= m('riesgo') && t < m('oro') && <g opacity={e1(t, m('riesgo'))}>{[-1, 1].map((d) => <path key={d} d={`M 1080 ${NIV[2] + d * 40} l -22 ${d * -26} h 44 Z`} transform={`translate(0 ${d * 70})`} fill={ROSA} />)}</g>}
        {t >= m('oro') && <Insignia x={830} y={ins2} t={t} />}
        {t >= m('oro') && t < m('indirectas') && <Letrero x={830} y={830} texto="Un nivel por encima" id={ID} op={e1(t, m('encima'))} tam={26} />}
        {t >= m('indirectas') && <Burbuja x={40} y={320} w={movil ? 560 : 520} texto="¿De qué presupuesto saldrán los fondos?" u={sm(t, m('indirectas'), m('indirectas') + 1.6)} c={c} id={ID} tam={26} />}
        {t >= m('mienten') && <g opacity={e1(t, m('mienten'))}>
          <Persona id={ID} x={230} y={720} s={0.6} cuerpo={VIOLETA} />
          <path d="M 205 590 L 205 570 L 218 582 L 230 564 L 242 582 L 255 570 L 255 590 Z" fill={AMBAR} />
          <Cruz x={340} y={560} r={26} op={e1(t, m('mienten') + 0.6)} />
        </g>}
        {t >= m('coach') && <g opacity={e1(t, m('coach'))}><Brujula x={470} y={600} r={50} ang={15 * Math.sin(t * 2)} id={ID} /><Visto x={530} y={530} r={22} /></g>}
      </Toma>
    </Lienzo>
  );
};
