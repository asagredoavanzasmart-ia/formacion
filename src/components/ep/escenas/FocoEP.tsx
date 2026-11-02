import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Camion, Bus, Persona, Auto, Carretera, Cruz, Visto, Cifra, Fajo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Lo principal es mantener lo principal.
 * 1 · Un foco de luz que ilumina una sola cosa por vez: la financiación (un fajo) hasta que llega al banco; las rueditas
 *     de la bicicleta que se sueltan cuando ya no hacen falta.
 * 2 · El camión de logística: 10 dólares por camión; la ruta falla; el precio sube por diez; un millón al año sobre la mesa.
 * 3 · Waze dice que no: camiones, bicicletas, peatones y buses quedan fuera del foco; dentro, el auto que va al trabajo.
 */

const ID = 'ep10', P = 'ep-foco';

export const FocoEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('covey'), 'Lo principal es lo principal'], [m('importante'), 'La cosa más importante'], [m('nohacer'), 'Qué no hacer'],
    [m('logistica'), 'Una oferta de logística'], [m('millon'), 'Un millón al año'], [m('dijoNo'), 'Waze dijo que no'], [m('enfoque'), 'Enfoque'],
  ];
  const banco = sm(t, m('banco'), m('banco') + 1.5);
  const rueditas = sm(t, m('rueditas'), m('rueditas') + 1.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Lo principal es mantener lo principal">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el foco */}
      <Toma t={t} a={0} b={m('logistica')} cy={480}>
        <path d={`M ${lerp(560, 260, rueditas)} 150 L ${lerp(440, 120, rueditas)} 720 L ${lerp(760, 460, rueditas)} 720 Z`} fill="#fde68a" opacity={0.28 * e1(t, m('importante'))} />
        <circle cx={lerp(600, 300, rueditas)} cy={150} r={26} fill="#fbbf24" opacity={e1(t, m('importante'))} />
        <g opacity={1 - banco * 0.85}><Fajo x={600} y={680} n={6} w={140} op={e1(t, m('importante'))} /></g>
        {t >= m('banco') && <g opacity={e1(t, m('banco'))}>
          <path d="M 860 460 L 1000 400 L 1140 460 Z" fill="#64748b" />{[0, 1, 2, 3].map((k) => <rect key={k} x={880 + k * 66} y={470} width={26} height={160} fill="#94a3b8" />)}<rect x={860} y={630} width={280} height={24} fill="#64748b" />
          <Txt f="a" x={1000} y={700} textAnchor="middle" fontSize={26} fill={c.tenue}>Banco</Txt>
          <circle cx={lerp(600, 1000, banco)} cy={lerp(600, 560, banco) - 80 * Math.sin(Math.PI * banco)} r={22} fill="#22a06b" opacity={banco < 1 ? 1 : 0} />
        </g>}
        {t >= m('rueditas') && <g opacity={e1(t, m('rueditas'))} transform={`translate(300 640)`}>
          {[-70, 70].map((x) => <circle key={x} cx={x} cy={0} r={46} fill="none" stroke="#334155" strokeWidth={10} />)}
          <path d="M -70 0 L -10 -70 L 50 -70 L 70 0 M -10 -70 L 0 0 L 50 -70" stroke={NARANJA} strokeWidth={10} fill="none" strokeLinejoin="round" />
          {[-1, 1].map((s) => <circle key={s} cx={-70 + s * 30 + lerp(0, s * 60, rueditas)} cy={30 + 80 * rueditas} r={16} fill={GRIS} opacity={1 - rueditas} />)}
        </g>}
        {t >= m('nohacer') && <Letrero x={600} y={790} texto="Enfocarse es decidir qué no hacer" id={ID} op={e1(t, m('nohacer'))} />}
      </Toma>

      {/* 2 · la oferta de logística */}
      <Toma t={t} a={m('logistica')} b={m('dijoNo')} cy={480}>
        <Carretera y={640} x0={60} x1={1140} avance={t * 80} />
        <Camion x={380} y={650} s={1.3} color={AZUL_M} giro={t * 240} />
        {t >= m('diezd') && <Letrero x={380} y={430} texto="10 dólares por camión" fondo={AZUL_M} id={ID} op={e1(t, m('diezd')) * (1 - sm(t, m('porDiez'), m('porDiez') + 0.5))} />}
        {t >= m('fallo') && t < m('porDiez') && <g opacity={e1(t, m('fallo'))}>
          <rect x={720} y={420} width={30} height={220} fill="#e5484d" /><rect x={700} y={400} width={160} height={30} rx={8} fill="#e5484d" />
          <Txt f="a" x={780} y={380} textAnchor="middle" fontSize={24} fill={c.texto}>Camino prohibido</Txt>
          <Cruz x={900} y={500} r={30} />
        </g>}
        {t >= m('porDiez') && <Letrero x={380} y={430} texto="×10" fondo={VIOLETA} id={ID} op={e1(t, m('porDiez')) * (1 - sm(t, m('millon'), m('millon') + 0.5))} />}
        {t >= m('millon') && <g opacity={e1(t, m('millon'))}>
          <Fajo x={880} y={540} n={10 * sm(t, m('millon'), m('millon') + 1.5)} w={150} />
          <Cifra x={880} y={330} valor={1} u={1} color={VERDE} tam={72} suf=" millón" />
          <Txt f="a" x={880} y={370} textAnchor="middle" fontSize={24} fill={c.tenue}>de dólares al año</Txt>
        </g>}
      </Toma>

      {/* 3 · decir que no */}
      <Toma t={t} a={m('dijoNo')} b={fin + 1} cy={470}>
        <circle cx={600} cy={430} r={190} fill={`url(#${ID}-halo)`} opacity={e1(t, m('mision'))} />
        {t >= m('mision') && <Auto x={600} y={500} s={1.1} color={NARANJA} giro={t * 200} op={e1(t, m('mision'))} />}
        {t >= m('mision') && <Letrero x={600} y={600} texto="Quien va al trabajo" id={ID} op={e1(t, m('mision') + 0.3)} />}
        {t >= m('camiones') && [
          { x: 170, y: 250, el: <Camion x={0} y={40} s={0.55} gris /> },
          { x: 1030, y: 250, el: <g><circle cx={-30} cy={20} r={22} fill="none" stroke="#94a3b8" strokeWidth={7} /><circle cx={30} cy={20} r={22} fill="none" stroke="#94a3b8" strokeWidth={7} /><path d="M -30 20 L 0 -16 L 30 20" stroke="#94a3b8" strokeWidth={7} fill="none" /></g> },
          { x: 170, y: 660, el: <Persona id={ID} x={0} y={60} s={0.45} cuerpo="#94a3b8" /> },
          { x: 1030, y: 660, el: <Bus x={0} y={50} s={0.42} color="#94a3b8" /> },
        ].map((o, k) => (
          <g key={k} opacity={e1(t, m('camiones') + 0.4 * k)} transform={`translate(${o.x} ${o.y})`}>
            {o.el}
            <Cruz x={70} y={-40} r={24} />
          </g>
        ))}
        {t >= m('enfoque') && <Letrero x={600} y={790} texto="Enfoque" id={ID} op={e1(t, m('enfoque'))} />}
        {t >= m('enfoque') && <Visto x={760} y={430} r={30} op={e1(t, m('enfoque') + 0.3)} />}
      </Toma>
    </Lienzo>
  );
};
