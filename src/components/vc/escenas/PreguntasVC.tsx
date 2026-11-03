import React from 'react';
import { useEscenaVC, Lienzo, Rotulo, Letrero, Txt, Persona, Edificio, Corazon, Burbuja, Arco, e1, sm, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, AMBAR, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Descubriendo resultados y ganancias: la empresa a la izquierda, la persona al centro y el vendedor a la derecha.
 * Objetivas: la lupa sobre la empresa y sus indicadores. De actitud: la pregunta al cliente y su corazón que late.
 * Internas: lo que piensa el vendedor y el puente de la empresa al corazón. Para el coach: el susurro y la estrella del triunfo.
 * Al final, el cargo se cae y queda la persona.
 */

const ID = 'vc11', P = 'vc-preguntas';

export const PreguntasVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('cuatro'), 'Cuatro tipos de preguntas'], [m('objetivas'), 'Objetivas: resultados'], [m('actitud'), 'De actitud: ganancias'],
    [m('internas'), 'Internas: el puente'], [m('coach'), 'Para tu coach'], [m('cargo'), 'Una persona, no un cargo'],
  ];
  const lupa = sm(t, m('objetivas'), m('objetivas') + 1.2) * (1 - sm(t, m('actitud'), m('actitud') + 0.6));
  const late = t >= m('actitud') ? 1 + 0.08 * Math.sin(t * 6) : 1;
  const cae = sm(t, m('cargo'), m('cargo') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Descubriendo resultados y ganancias">
      <Rotulo t={t} lista={rot} id={ID} />
      <g opacity={e1(t, m('cuatro'))}>
        <Edificio x={220} y={740} w={170} h={330} color={AZUL_M} />
        <Persona id={ID} x={600} y={740} s={1} corbata cuerpo={VERDE} />
        <Persona id={ID} x={1010} y={740} s={0.8} />
      </g>
      {/* el cargo, que al final se cae */}
      <g opacity={e1(t, m('cuatro')) * (1 - cae)} transform={`translate(710 ${560 + 200 * cae}) rotate(${25 * cae})`}>
        <rect x={-56} y={-20} width={112} height={40} rx={8} fill="#fff" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
        <Txt x={0} y={9} textAnchor="middle" fontSize={24} fill="#374151">Cargo</Txt>
      </g>
      <g transform={`translate(600 ${t >= m('cargo') ? 680 : 690}) scale(${late * (t >= m('cargo') ? 1.4 : 1)})`} opacity={e1(t, m('actitud'))}><Corazon x={0} y={0} s={0.55} /></g>

      {/* objetivas: lupa e indicadores */}
      {lupa > 0.01 && <g opacity={lupa} transform={`translate(${220 + 40 * Math.sin(t * 1.5)} 520)`}><circle r={60} fill="#fff" opacity={0.35} /><circle r={60} fill="none" stroke={GRIS} strokeWidth={12} /><rect x={38} y={38} width={18} height={70} rx={9} fill={GRIS} transform="rotate(-45 47 73)" /></g>}
      {t >= m('kpi') && t < m('internas') && (
        <g opacity={e1(t, m('kpi'))} transform="translate(220 250)">
          <rect x={-120} y={-90} width={240} height={150} rx={18} fill={c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
          {[0, 1, 2].map((k) => { const h = (30 + 25 * k) * sm(t, m('kpi') + 0.3 * k, m('kpi') + 0.3 * k + 0.8); return <rect key={k} x={-80 + k * 60} y={40 - h} width={40} height={h} rx={6} fill={[AMBAR, NARANJA, VERDE][k]} />; })}
          <Txt x={0} y={-52} textAnchor="middle" fontSize={26} fill={c.texto}>KPI</Txt>
          {t >= m('impacto') && <path d="M 100 30 L 100 -40 M 84 -22 L 100 -42 L 116 -22" stroke={VERDE} strokeWidth={8} fill="none" strokeLinecap="round" opacity={e1(t, m('impacto'))} />}
        </g>
      )}

      {/* de actitud: la pregunta al cliente */}
      {t >= m('comoda') && t < m('internas') && <Burbuja x={640} y={330} w={movil ? 520 : 480} texto="¿Te sientes cómodo con el cambio?" u={sm(t, m('comoda'), m('comoda') + 1.5)} c={c} id={ID} lado="der" tam={26} />}

      {/* internas: lo que piensa el vendedor y el puente */}
      {t >= m('internas') && t < m('coach') && <Burbuja x={680} y={330} w={movil ? 460 : 420} texto="¿Qué gana esta persona?" u={sm(t, m('internas'), m('internas') + 1.2)} c={c} id={ID} lado="der" marca tam={26} />}
      {t >= m('puente') && <Arco x1={260} y1={400} x2={560} y2={540} u={sm(t, m('puente'), m('puente') + 1.2)} color={NARANJA} alto={140} grosor={9} op={1 - 0.5 * sm(t, m('cargo'), m('cargo') + 1)} />}
      {t >= m('puente') && t < m('coach') && <Letrero x={400} y={820} texto="Ganancia-resultado" id={ID} op={e1(t, m('puente') + 0.8)} tam={26} />}

      {/* para tu coach */}
      {t >= m('coach') && <g opacity={e1(t, m('coach'))}>
        <Persona id={ID} x={800} y={740} s={0.6} cuerpo={NARANJA} />
        {[0, 1, 2].map((k) => <circle key={k} cx={870 + 26 * k} cy={560 - ((t * 30 + k * 20) % 50)} r={6} fill={NARANJA} opacity={0.7} />)}
      </g>}
      {t >= m('triunfo') && <g opacity={e1(t, m('triunfo'))} transform={`translate(600 ${380 + 6 * Math.sin(t * 3)}) scale(1.6)`}><path d="M 0 -26 L 8 -8 L 28 -8 L 12 4 L 18 24 L 0 12 L -18 24 L -12 4 L -28 -8 L -8 -8 Z" fill={AMBAR} /></g>}
      {t >= m('triunfo') && t < m('cargo') && <Letrero x={600} y={820} texto="Un triunfo personal" fondo={AMBAR} id={ID} op={e1(t, m('triunfo'))} tam={26} />}
      {t >= m('cargo') && <Letrero x={600} y={820} texto="Venderle a una persona" fondo={ROSA} id={ID} op={e1(t, m('cargo'))} tam={26} />}
    </Lienzo>
  );
};
