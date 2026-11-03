import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Fajo, Brujula, Arco, Curva, Portatil, Visto, Cruz, Nube, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Superar los problemas principales, en tres frentes (tres tomas).
 * 1 · Identificación: la lupa sube por el organigrama con el riesgo; el presupuesto y el coach señalan a quien decide.
 * 2 · Bloqueo: alguien cierra el paso; primero se le ayuda (gana prestigio), luego la venta en paralelo entre ejecutivos y,
 *     como último recurso, el rodeo, con el riesgo de la venganza del comprador.
 * 3 · Abordaje: al económico no se le hace una demostración; se le lleva una razón de negocio (el futuro) y casos de éxito.
 */

const ID = 'vc18', P = 'vc-superar';
const NIV = [250, 390, 530, 670];

export const SuperarVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('identificacion'), 'Identificación'], [m('bloqueo'), 'Bloqueo'], [m('paralelo'), 'Venta en paralelo'], [m('rodear'), 'Rodear: último recurso'],
    [m('abordaje'), 'Abordaje'], [m('razon'), 'Una razón de negocio'],
  ];
  const lupaY = lerp(NIV[3], NIV[0], sm(t, m('identificacion') + 1, m('investigar')));
  const ayuda = sm(t, m('ayudale'), m('ayudale') + 1.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Superar los problemas principales">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · identificación */}
      <Toma t={t} a={0} b={m('bloqueo')} cy={470}>
        {NIV.map((y, k) => { const w = 110 + k * 85; return <rect key={k} x={420 - w} y={y - 55} width={2 * w} height={110} rx={14} fill={k === 0 && t >= m('coach') ? NARANJA : c.panel2} opacity={e1(t, m('frentes') + 0.2 * k)} />; })}
        {t >= m('identificacion') && <g opacity={e1(t, m('identificacion'))} transform={`translate(${420 + 30 * Math.sin(t * 1.5)} ${lupaY})`}><circle r={46} fill="#fff" opacity={0.35} /><circle r={46} fill="none" stroke={GRIS} strokeWidth={10} /><rect x={30} y={30} width={14} height={60} rx={7} fill={GRIS} transform="rotate(-45 37 60)" /></g>}
        {t >= m('identificacion') && t < m('investigar') && <Letrero x={900} y={300} texto="Más monto, más arriba" fondo={GRIS} id={ID} op={e1(t, m('identificacion') + 1)} tam={26} />}
        {t >= m('investigar') && <g opacity={e1(t, m('investigar'))}><Fajo x={900} y={420} n={3} w={110} /><Txt x={900} y={500} textAnchor="middle" fontSize={26} fill={c.texto}>¿De qué presupuesto?</Txt></g>}
        {t >= m('coach') && <g opacity={e1(t, m('coach'))}><Brujula x={900} y={640} r={60} ang={-40 + 10 * Math.sin(t * 2)} id={ID} /><Visto x={420} y={NIV[0]} r={26} /></g>}
      </Toma>

      {/* 2 · bloqueo */}
      <Toma t={t} a={m('bloqueo')} b={m('abordaje')} cy={470}>
        <Persona id={ID} x={170} y={740} s={0.75} />
        <g transform={`translate(${lerp(0, 120, ayuda * (t < m('paralelo') ? 1 : 0.4))} 0)`}>
          <Persona id={ID} x={560} y={740} s={0.8} cuerpo={t >= m('venganza') ? ROSA : VIOLETA} />
          <rect x={480} y={520} width={160} height={230} rx={12} fill={GRIS} opacity={0.35 * (1 - ayuda)} />
          {t >= m('ayudale') && t < m('paralelo') && <g opacity={e1(t, m('ayudale'))} transform="translate(560 520)"><path d="M 0 -26 L 8 -8 L 28 -8 L 12 4 L 18 24 L 0 12 L -18 24 L -12 4 L -28 -8 L -8 -8 Z" fill={AMBAR} /></g>}
          {t >= m('venganza') && <Nube x={560} y={470} s={0.4} t={t} op={e1(t, m('venganza'))} />}
        </g>
        <Persona id={ID} x={1000} y={740} s={0.85} corbata cuerpo={VERDE} />
        {t >= m('bloqueo') && t < m('ayudale') && <Cruz x={360} y={560} r={30} op={e1(t, m('bloqueo'))} />}
        {t >= m('ayudale') && t < m('paralelo') && <Letrero x={600} y={820} texto="Primero ayúdale: gana prestigio" fondo={VERDE} id={ID} op={e1(t, m('ayudale'))} tam={26} />}
        {t >= m('paralelo') && t < m('rodear') && (
          <g opacity={e1(t, m('paralelo'))}>
            <Persona id={ID} x={240} y={400} s={0.6} corbata cuerpo={NARANJA} />
            <Arco x1={300} y1={300} x2={940} y2={460} u={sm(t, m('paralelo') + 0.5, m('paralelo') + 1.7)} color={NARANJA} alto={140} grosor={8} />
            <Letrero x={600} y={820} texto="Ejecutivo con ejecutivo" id={ID} tam={26} />
          </g>
        )}
        {t >= m('rodear') && (
          <g opacity={e1(t, m('rodear'))}>
            <path d="M 230 600 C 300 250 820 250 950 560" stroke={ROSA} strokeWidth={6} fill="none" strokeDasharray="14 12" />
            <Letrero x={600} y={820} texto={t >= m('venganza') ? 'La venganza del comprador' : 'Rodear: alto riesgo'} fondo={ROSA} id={ID} op={e1(t, t >= m('venganza') ? m('venganza') : m('rodear'))} tam={26} />
          </g>
        )}
      </Toma>

      {/* 3 · abordaje */}
      <Toma t={t} a={m('abordaje')} b={fin + 1} cy={470}>
        <Persona id={ID} x={260} y={740} s={1} corbata cuerpo={VERDE} />
        {t >= m('demostraciones') && t < m('razon') && <g opacity={e1(t, m('demostraciones'))}><Portatil x={600} y={600} s={1} /><Cruz x={600} y={380} r={40} /><Letrero x={700} y={820} texto="No quiere demostraciones" fondo={GRIS} id={ID} tam={26} /></g>}
        {t >= m('razon') && (
          <g opacity={e1(t, m('razon'))}>
            <rect x={520} y={200} width={560} height={380} rx={26} fill={c.panel} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
            <Curva pts={[[570, 500], [680, 470], [780, 430], [880, 340], [1030, 260]]} u={sm(t, m('razon'), m('razon') + 1.6)} color={VERDE} />
            <Curva pts={[[880, 340], [960, 360], [1030, 330]]} u={sm(t, m('razon') + 1.4, m('razon') + 2.4)} color={AZUL_M} punteada />
            {!movil && ['Rentabilidad', 'Estabilidad', 'Crecimiento'].map((s, k) => <Txt key={s} x={560 + k * 170} y={555} fontSize={22} fill={c.tenue} opacity={e1(t, m('razon') + 2 + 0.8 * k)}>{s}</Txt>)}
            <Letrero x={700} y={820} texto="Datos para predecir su futuro" id={ID} op={e1(t, m('razon'))} tam={26} />
          </g>
        )}
        {t >= m('exito') && [0, 1, 2].map((k) => <g key={k} opacity={e1(t, m('exito') + 0.4 * k)} transform={`translate(${620 + k * 120} 680)`}><circle r={34} fill={AMBAR} /><path d="M 0 -18 L 6 -6 L 19 -6 L 9 3 L 13 17 L 0 9 L -13 17 L -9 3 L -19 -6 L -6 -6 Z" fill="#fff" /></g>)}
      </Toma>
    </Lienzo>
  );
};
