import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Reloj, Sello, Burbuja, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El comité y la indecisión.
 * Toma 1: el comprador solo frente al escenario del seminario se convierte en una mesa de comité que se llena de seis a
 * diez personas (Gartner).
 * Toma 2: The Jolt Effect: el contador de 2,5 millones de conversaciones y una barra de oportunidades perdidas donde el
 * tramo «no decide» ocupa entre 40 y 60 %; la puerta queda cerrada; el reloj de escasez hace retroceder a la mesa.
 * Toma 3: lo que cierra: una pesa de riesgo que se achica con tres apoyos (alcance acotado, casos parecidos, garantías)
 * y la pizarra de la enseñanza comercial.
 */

const ID = 'br26', P = 'br-comite';

export const ComiteBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('individual'), 'Un comprador individual'], [m('gartner'), 'Un comité'], [m('dixon'), 'The Jolt Effect (2022)'],
    [m('escasez'), 'La escasez empeora'], [m('reducir'), 'Reducir el riesgo'], [m('challenger'), 'Enseñanza comercial'],
  ];
  const sillas = Math.round(lerp(1, 8, sm(t, m('seis'), m('seis') + 1.4)));
  const riesgo = 1 - 0.45 * sm(t, m('reducir'), m('acotar') + 2.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El comité y la indecisión">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · De uno a un comité */}
      <Toma t={t} a={0} b={m('dixon')} cy={470}>
        <g opacity={ventana(t, m('individual') - 0.3, m('gartner') + 0.3)}>
          <rect x={150} y={240} width={420} height={220} rx={20} fill={VIOLETA} opacity={0.85} />
          <Txt x={360} y={360} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>Seminario · 90 min</Txt>
          <Persona id={ID} x={360} y={680} s={0.85} cuerpo={NARANJA} />
        </g>
        {t >= m('gartner') && (
          <g opacity={e1(t, m('gartner'))}>
            <ellipse cx={780} cy={540} rx={260} ry={90} fill="#a16207" />
            <ellipse cx={780} cy={530} rx={260} ry={90} fill="#ca8a04" />
            {Array.from({ length: 8 }, (_, k) => {
              const a = Math.PI + (k / 7) * Math.PI;
              const x = 780 + Math.cos(a) * 300, y = 520 + Math.sin(a) * 120;
              return k < sillas ? <Persona key={k} id={ID} x={x} y={y + (k === 0 || k === 7 ? 40 : 0)} s={0.48} cuerpo={[AZUL_M, ROSA, VERDE, TEAL, VIOLETA, AMBAR, GRIS, NARANJA][k]} corbata={k % 2 === 0} /> : null;
            })}
            {t >= m('seis') && <Letrero x={780} y={720} texto="Entre 6 y 10 personas" fondo={AZUL_M} id={ID} tam={28} op={e1(t, m('seis'))} />}
          </g>
        )}
      </Toma>

      {/* 2 · No hacer nada */}
      <Toma t={t} a={m('dixon')} b={m('reducir')} cy={470}>
        <g opacity={e1(t, m('dixon'))}>
          {Array.from({ length: 10 }, (_, k) => <rect key={k} x={120 + (k % 5) * 70} y={240 + Math.floor(k / 5) * 60} width={56} height={40} rx={14} fill={[AZUL_M, ROSA, VIOLETA][k % 3]} opacity={0.4 + 0.5 * Math.abs(Math.sin(t * 1.5 + k))} />)}
          {t >= m('millones') && <Cifra x={290} y={420} valor={2.5} u={sm(t, m('millones'), m('millones') + 1)} dec={1} suf=" millones" tam={44} color={AZUL_M} />}
          {t >= m('millones') && <Txt x={290} y={460} textAnchor="middle" fontSize={24} fill={c.tenue}>de conversaciones</Txt>}
        </g>
        {t >= m('indecision') && (() => {
          const u = sm(t, m('indecision'), m('indecision') + 1.2);
          return (
            <g opacity={e1(t, m('indecision'))}>
              <Txt x={600} y={540} textAnchor="middle" fontSize={26} fill={c.tenue}>Oportunidades calificadas que se pierden</Txt>
              <rect x={120} y={570} width={960} height={70} rx={16} fill={c.apagado} />
              <rect x={120} y={570} width={960 * 0.4 * u} height={70} rx={16} fill={AMBAR} />
              <rect x={120 + 960 * 0.4} y={570} width={960 * 0.2 * u} height={70} fill={AMBAR} opacity={0.55} />
              {u > 0.95 && <Txt x={120 + 960 * 0.2} y={616} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>No deciden: 40–60 %</Txt>}
              <Txt x={120 + 960 * 0.8} y={616} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>Eligen a otro</Txt>
            </g>
          );
        })()}
        {t >= m('nada') && (
          <g opacity={e1(t, m('nada'))}>
            <rect x={860} y={230} width={160} height={250} rx={10} fill="#78350f" />
            <circle cx={1000} cy={360} r={9} fill={AMBAR} />
            <Letrero x={690} y={300} texto="Miedo a equivocarse" fondo={GRIS} id={ID} tam={24} />
          </g>
        )}
        {t >= m('escasez') && (
          <g opacity={e1(t, m('escasez'))}>
            <Reloj x={640} y={420} r={40} t={t} vel={5} aro={ROJO_M} />
            <Txt x={700} y={430} fontSize={26} fill={ROJO_M} peso={800}>Empeora</Txt>
          </g>
        )}
      </Toma>

      {/* 3 · Reducir el riesgo y enseñar */}
      <Toma t={t} a={m('reducir')} b={fin + 1} cy={470}>
        <g opacity={ventana(t, m('reducir'), m('challenger') + 0.3) * 0.85 + 0.15}>
          <g transform={`translate(330 470) scale(${riesgo})`}>
            <path d="M -90 120 L -60 -40 H 60 L 90 120 Z" fill={c.texto} />
            <circle cy={-60} r={30} fill="none" stroke={c.texto} strokeWidth={12} />
          </g>
          <Txt x={330} y={650} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>Riesgo percibido</Txt>
          {(['Alcance acotado', 'Casos parecidos', 'Garantías reales'] as const).map((txt, k) => t >= m('acotar') + k * 1.2 && (
            <g key={txt} opacity={e1(t, m('acotar') + k * 1.2)}>
              <rect x={560} y={260 + k * 110} width={380} height={84} rx={18} fill={[VERDE, TEAL, AZUL_M][k]} />
              <Txt x={750} y={312 + k * 110} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>{txt}</Txt>
            </g>
          ))}
        </g>
        {t >= m('challenger') && (
          <g opacity={e1(t, m('challenger'))}>
            <rect x={540} y={600} width={420} height={170} rx={18} fill={isDark ? '#0f3d2e' : '#14532d'} />
            <path d={`M 570 740 ${Array.from({ length: 6 }, (_, k) => `L ${600 + k * 60} ${740 - 18 * k - 12 * Math.sin(k * 2)}`).join(' ')}`} stroke="#fff" strokeWidth={5} fill="none" strokeDasharray={`${500 * sm(t, m('challenger'), m('ensenanza') + 1)} 700`} />
            {!movil && <Txt x={750} y={640} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>Reencuadrar con datos</Txt>}
            {t >= m('ensenanza') && <Letrero x={330} y={760} texto="The Challenger Sale" fondo={VIOLETA} id={ID} tam={26} op={e1(t, m('ensenanza'))} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
