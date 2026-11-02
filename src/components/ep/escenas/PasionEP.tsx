import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Corazon, Nube, Burbuja, Visto, Cruz, Suelo, Fajo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, TEAL, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Pasión, sacrificio y la muestra de uno.
 * 1 · La balanza de la ecuación: a un lado la pasión (corazón), al otro el miedo al fracaso y el costo alternativo (sueldo, cargo);
 *     cuando la pasión pesa más, la persona da el paso. «Sigo en mi trabajo» la deja quieta.
 * 2 · La muestra de uno: una sola persona, luego muchas voces desde distintos ángulos; en Engie, ¾ cree que el mecánico le roba
 *     y ¾ de los mecánicos son honestos.
 * 3 · Mego: la oficina de correos con fila; abren casilleros y la nube del problema se disuelve; la empresa cierra.
 */

const ID = 'ep05', P = 'ep-pasion';

export const PasionEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('costo'), 'Costo alternativo'], [m('ecuacion'), 'La ecuación'], [m('sacrificar'), 'Disposición a sacrificar'], [m('riesgo'), 'El riesgo de enamorarse'],
    [m('muestra'), 'La muestra de uno'], [m('engie'), 'Engie: la incertidumbre'], [m('desaparecer'), 'Cuando el problema desaparece'],
  ];
  /* inclinación de la balanza: positiva = pesa más la pasión (izquierda baja) */
  const pesoP = e1(t, m('pasion')) * (1 + 0.6 * sm(t, m('sacrificar'), m('sacrificar') + 1));
  const pesoM = 0.6 * e1(t, m('miedo')) + 0.6 * e1(t, m('costo'));
  const ang = Math.max(-14, Math.min(14, (pesoP - pesoM) * 14)) * (t >= m('sigo') && t < m('riesgo') ? -0.6 : 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Pasión, sacrificio y la muestra de uno">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la balanza de la ecuación */}
      <Toma t={t} a={0} b={m('muestra')} cy={470}>
        <g transform="translate(600 300)">
          <path d="M -30 420 L 0 0 L 30 420 Z" fill="#64748b" /><rect x={-110} y={410} width={220} height={22} rx={11} fill="#475569" />
          <g transform={`rotate(${-ang})`}>
            <rect x={-330} y={-10} width={660} height={20} rx={10} fill="#334155" />
            {[-300, 300].map((x) => <g key={x}><line x1={x} y1={0} x2={x} y2={120} stroke="#94a3b8" strokeWidth={4} /><path d={`M ${x - 110} 120 H ${x + 110} Q ${x + 100} 160 ${x} 160 Q ${x - 100} 160 ${x - 110} 120 Z`} fill="#94a3b8" /></g>)}
            <g transform={`translate(-300 0) rotate(${ang})`}>
              {t >= m('pasion') && <Corazon x={0} y={60} s={1.5 + 0.06 * Math.sin(t * 5)} op={e1(t, m('pasion'))} />}
            </g>
            <g transform={`translate(300 0) rotate(${ang})`}>
              {t >= m('costo') && <g opacity={e1(t, m('costo'))}><Fajo x={-40} y={110} n={3} w={70} /></g>}
              {t >= m('miedo') && <Nube x={50} y={60} s={0.45} t={t} op={e1(t, m('miedo'))} />}
            </g>
          </g>
        </g>
        {t >= m('pasion') && <Letrero x={300} y={560} texto="Pasión" id={ID} op={e1(t, m('pasion'))} />}
        {t >= m('miedo') && <Letrero x={900} y={560} texto="Miedo + costo" fondo={GRIS} id={ID} op={e1(t, m('miedo'))} />}
        {t >= m('sigo') && t < m('riesgo') + 1 && !movil && <Burbuja x={720} y={180} w={400} texto="Sigo en mi trabajo y después…" u={sm(t, m('sigo'), m('sigo') + 1.4)} c={c} id={ID} />}
        {t >= m('sacrificar') && <Persona id={ID} x={lerp(600, 300, sm(t, m('sacrificar'), m('sacrificar') + 1.5))} y={820} s={0.45} cuerpo={NARANJA} />}
      </Toma>

      {/* 2 · la muestra de uno */}
      <Toma t={t} a={m('muestra')} b={m('desaparecer')} cy={480}>
        <Suelo y={460} isDark={isDark} x0={160} x1={1040} op={e1(t, m('muestra'))} />
        <Persona id={ID} x={600} y={450} s={0.8} cuerpo={NARANJA} />
        {t >= m('angulos') && [[260, 300], [400, 230], [800, 230], [940, 300]].map(([x, y], k) => (
          <g key={k} opacity={e1(t, m('angulos') + 0.25 * k)}><Persona id={ID} x={x} y={y + 150} s={0.5} cuerpo={[AZUL_M, VERDE, ROSA, TEAL][k]} /><Nube x={x} y={y - 30} s={0.32} t={t + k} rayos={false} /></g>
        ))}
        {t >= m('engie') && <g opacity={e1(t, m('engie'))}>
          <rect x={160} y={540} width={880} height={250} rx={28} fill={c.panel} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
          {[{ k: 'roba', x: 380, color: ROSA, t: 'Creen que les roban' }, { k: 'honestos', x: 820, color: VERDE, t: 'Mecánicos honestos' }].map((d) => t >= m(d.k) && (
            <g key={d.k} opacity={e1(t, m(d.k))}>
              {[0, 1, 2, 3].map((q) => <rect key={q} x={d.x - 100 + q * 52} y={600} width={44} height={90} rx={10} fill={q < 3 ? d.color : c.apagado} opacity={q < 3 ? sm(t, m(d.k) + 0.2 * q, m(d.k) + 0.2 * q + 0.4) : 1} />)}
              <Txt x={d.x} y={740} textAnchor="middle" fontSize={34} fill={d.color}>¾</Txt>
              <Txt f="a" x={d.x} y={772} textAnchor="middle" fontSize={22} fill={c.tenue}>{d.t}</Txt>
            </g>
          ))}
        </g>}
      </Toma>

      {/* 3 · Mego */}
      <Toma t={t} a={m('desaparecer')} b={fin + 1} cy={480}>
        <Suelo y={700} isDark={isDark} x0={80} x1={1120} />
        <g transform="translate(260 700)">
          <rect x={-140} y={-260} width={280} height={260} rx={14} fill="#f59e0b" /><rect x={-140} y={-260} width={280} height={50} rx={14} fill="#b45309" />
          <rect x={-40} y={-120} width={80} height={120} rx={8} fill="#7c2d12" />
          <Txt x={0} y={-226} textAnchor="middle" fontSize={26} fill="#fff">Correo</Txt>
        </g>
        {[0, 1, 2, 3, 4].map((k) => <Persona key={k} id={ID} x={460 + k * 80} y={700} s={0.45} cuerpo={['#64748b', '#94a3b8', '#64748b', '#94a3b8', '#64748b'][k]} />)}
        <Nube x={620} y={360} s={0.9} t={t} op={e1(t, m('desaparecer')) * (1 - sm(t, m('casilleros'), m('casilleros') + 1.5))} />
        {t >= m('mego') && <Letrero x={620} y={760} texto="Mego: unos 5 dólares" fondo={AMBAR} id={ID} op={e1(t, m('mego')) * (1 - sm(t, m('casilleros'), m('casilleros') + 0.5))} />}
        {t >= m('casilleros') && <g opacity={e1(t, m('casilleros'))} transform="translate(980 700)">
          {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-120 + (k % 3) * 82} y={-260 + Math.floor(k / 3) * 84} width={74} height={76} rx={8} fill={k === 4 ? VERDE : '#64748b'} />)}
        </g>}
        {t >= m('casilleros') && <Letrero x={980} y={770} texto="Casilleros" fondo={VERDE} id={ID} op={e1(t, m('casilleros'))} tam={26} />}
        {t >= m('cerro') && <g opacity={e1(t, m('cerro'))}><Cruz x={620} y={360} r={42} /><Letrero x={620} y={440} texto="La empresa cerró" fondo={GRIS} id={ID} /></g>}
        {t >= m('casilleros') && t < m('cerro') && <Visto x={980} y={330} r={30} op={e1(t, m('casilleros') + 0.5)} />}
      </Toma>
    </Lienzo>
  );
};
