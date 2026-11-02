import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Monitor, Pin, Contrato, Burbuja, Reloj, Suelo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Al inversionista le tienen que gustar el CEO y la historia.
 * 1 · La puerta: el CEO entra y el inversionista decide antes de que se siente (un cronómetro corto).
 * 2 · Vertex: en la pantalla el mapa; aparecen calles, Yoram Oron pregunta por su casa, el pin cae y sus ojos se iluminan;
 *     llega el contrato de dos millones.
 * 3 · El microondas de Zeek: el horno no cabe en el marco por un octavo de pulgada; la tienda ofrece crédito; al final, dos microondas.
 */

const ID = 'ep12', P = 'ep-historia';

const Microondas: React.FC<{ x: number; y: number; s?: number; color?: string; op?: number }> = ({ x, y, s = 1, color = '#e2e8f0', op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <rect x={-110} y={-70} width={220} height={140} rx={14} fill={color} />
    <rect x={-96} y={-56} width={140} height={112} rx={10} fill="#1f2937" /><rect x={-86} y={-46} width={50} height={92} rx={6} fill="#334155" opacity={0.7} />
    {[0, 1, 2].map((k) => <circle key={k} cx={78} cy={-36 + k * 28} r={8} fill="#64748b" />)}
  </g>
);

export const HistoriaEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('regla'), 'El CEO y la historia'], [m('fuerte'), 'Lo más fuerte, primero'], [m('vertex'), 'Vertex'], [m('aparecio'), 'La casa en el mapa'],
    [m('hechos'), 'Hechos e historias'], [m('zeek'), 'El microondas de Zeek'], [m('imagen'), 'La primera y la última imagen'],
  ];
  const entra = sm(t, m('regla'), m('siente'));
  const calles = sm(t, m('direcciones'), m('direcciones') + 2);
  const cae = sm(t, m('aparecio'), m('aparecio') + 0.6);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Les tienen que gustar el CEO y la historia">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · antes de que se siente */}
      <Toma t={t} a={0} b={m('vertex')} cy={480}>
        <Suelo y={700} isDark={isDark} x0={100} x1={1100} />
        <rect x={140} y={360} width={180} height={340} rx={12} fill="#a16207" /><circle cx={290} cy={540} r={9} fill="#fde68a" />
        <Persona id={ID} x={lerp(230, 480, entra)} y={700} s={0.8} cuerpo={NARANJA} corbata />
        <rect x={600} y={560} width={300} height={24} rx={10} fill="#64748b" /><rect x={740} y={580} width={20} height={120} fill="#475569" />
        <Persona id={ID} x={960} y={700} s={0.8} cuerpo={AZUL_M} />
        <Reloj x={960} y={330} r={70} t={t} vel={6} aro={ROSA} />
        {t >= m('siente') && <Letrero x={960} y={450} texto="Decide en segundos" fondo={ROSA} id={ID} op={e1(t, m('siente'))} tam={26} />}
        {t >= m('fuerte') && <Letrero x={480} y={300} texto="Tu punto más fuerte, primero" id={ID} op={e1(t, m('fuerte'))} tam={26} />}
      </Toma>

      {/* 2 · Vertex y la casa en el mapa */}
      <Toma t={t} a={m('vertex')} b={m('hechos')} cy={480}>
        <Monitor x={470} y={760} w={560} h={400} s={1}>
          <rect width={560} height={400} fill={isDark ? '#1e293b' : '#e0f2fe'} />
          {[[40, 80, 520, 80], [40, 200, 520, 200], [40, 320, 520, 320], [120, 20, 120, 380], [300, 20, 300, 380], [440, 20, 440, 380]].map(([x1, y1, x2, y2], k) => (
            <line key={k} x1={x1} y1={y1} x2={x1 + (x2 - x1) * Math.min(1, calles * 1.5 - k * 0.1)} y2={y1 + (y2 - y1) * Math.min(1, calles * 1.5 - k * 0.1)} stroke="#94a3b8" strokeWidth={14} strokeLinecap="round" opacity={calles > k * 0.07 ? 1 : 0} />
          ))}
          {calles > 0.4 && [[160, 130], [250, 250], [380, 140], [480, 260]].map(([x, y], k) => <rect key={k} x={x} y={y} width={44} height={44} rx={6} fill="#cbd5e1" opacity={sm(calles, 0.4 + 0.1 * k, 0.6 + 0.1 * k)} />)}
          {t >= m('aparecio') && <g transform={`translate(300 ${lerp(-60, 200, cae)})`}><Pin x={0} y={0} s={1.3} color={ROSA} /></g>}
        </Monitor>
        <Persona id={ID} x={960} y={760} s={0.85} cuerpo={AZUL_M} />
        {t >= m('yoram') && <Letrero x={960} y={820} texto="Yoram Oron" fondo={AZUL_M} id={ID} op={e1(t, m('yoram'))} tam={26} />}
        {t >= m('casa') && t < m('contrato') && !movil && <Burbuja x={720} y={180} w={360} texto="¿Está mi casa?" u={sm(t, m('casa'), m('casa') + 1)} c={c} lado="der" id={ID} />}
        {t >= m('aparecio') && <g opacity={e1(t, m('aparecio') + 0.6)}>{[-1, 1].map((s) => <circle key={s} cx={960 + s * 11} cy={760 - 0.85 * 131} r={7} fill="#fbbf24" />)}</g>}
        {t >= m('contrato') && <g><Contrato x={960} y={lerp(160, 360, e1(t, m('contrato')))} s={0.75} firma={sm(t, m('contrato') + 0.4, m('contrato') + 1.6)} op={e1(t, m('contrato'))} /><Letrero x={960} y={470} texto="2 millones" fondo={VERDE} id={ID} op={e1(t, m('contrato') + 0.8)} /></g>}
      </Toma>

      {/* 3 · el microondas de Zeek */}
      <Toma t={t} a={m('hechos')} b={fin + 1} cy={470}>
        {t < m('zeek') ? <g>
          <g opacity={e1(t, m('hechos'))}><rect x={200} y={300} width={300} height={200} rx={20} fill={c.panel2} />{[0, 1, 2].map((k) => <rect key={k} x={230} y={340 + k * 46} width={220 - k * 40} height={20} rx={10} fill={GRIS} />)}</g>
          <Letrero x={350} y={570} texto="Los hechos hacen pensar" fondo={GRIS} id={ID} op={e1(t, m('hechos'))} tam={26} />
          <g opacity={e1(t, m('hechos') + 1)}><circle cx={850} cy={400} r={110} fill={`url(#${ID}-halo)`} /><Persona id={ID} x={850} y={500} s={0.7} cuerpo={ROSA} /></g>
          <Letrero x={850} y={570} texto="Las historias hacen sentir" id={ID} op={e1(t, m('hechos') + 1)} tam={26} />
        </g> : <g>
          <rect x={300} y={300} width={360} height={260} rx={10} fill="#a16207" />
          <rect x={340} y={340} width={280} height={180} rx={8} fill="#451a03" />
          {t >= m('microondas') && <Microondas x={480} y={430} s={1.12 + 0.02 * sm(t, m('ancho'), m('ancho') + 0.6)} op={e1(t, m('microondas'))} />}
          {t >= m('ancho') && <g opacity={e1(t, m('ancho'))}><path d="M 600 290 L 640 290" stroke={ROSA} strokeWidth={6} /><Letrero x={480} y={620} texto="⅛ de pulgada más ancho" fondo={ROSA} id={ID} tam={26} /></g>}
          {t >= m('credito') && <g opacity={e1(t, m('credito'))} transform="translate(900 430)">
            <rect x={-130} y={-80} width={260} height={160} rx={20} fill={AMBAR} /><Txt x={0} y={-20} textAnchor="middle" fontSize={28} fill="#fff">Crédito</Txt><Txt x={0} y={20} textAnchor="middle" fontSize={28} fill="#fff">de la tienda</Txt>
          </g>}
          {t >= m('dos') && <g opacity={e1(t, m('dos'))}><Microondas x={900} y={700} s={0.6} /><Microondas x={480} y={700} s={0.6} /><Letrero x={690} y={790} texto="Dos microondas" fondo={GRIS} id={ID} tam={26} /></g>}
          {t >= m('gestos') && !movil && <Txt f="a" x={690} y={240} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={e1(t, m('gestos'))}>Con los mismos gestos de manos</Txt>}
        </g>}
      </Toma>
    </Lienzo>
  );
};
