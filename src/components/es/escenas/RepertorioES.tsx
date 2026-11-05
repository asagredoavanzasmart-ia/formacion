import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Auto, Calendario, Reloj, Suelo, Colinas, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * El repertorio del no.
 * Toma 1: una caja de herramientas de la que salen ocho tarjetas, cada una con su dibujo, al nombrarse.
 * Toma 2: Kay Krill; la regla de Tom Friel como carrera: la tortuga del «sí» lento y la liebre del «no» rápido.
 */

const ID = 'es13', P = 'es-repertorio';

const Tortuga: React.FC<{ x: number; y: number; s?: number; t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={2} rx={70} ry={8} fill="#000" opacity={0.15} />
    {[-40, 30].map((lx, k) => <rect key={lx} x={lx} y={-20 + 3 * Math.sin(t * 3 + k)} width={16} height={22} rx={7} fill="#65a30d" />)}
    <path d="M -60 -14 Q -50 -80 0 -82 Q 50 -80 60 -14 Z" fill="#15803d" />
    <path d="M -30 -40 L 0 -60 L 30 -40 L 0 -24 Z" fill="#166534" />
    <circle cx={72} cy={-28} r={16} fill="#65a30d" /><circle cx={78} cy={-32} r={3} fill="#1f2937" />
  </g>
);

const Liebre: React.FC<{ x: number; y: number; s?: number; t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={`translate(${x} ${y - Math.abs(Math.sin(t * 8)) * 30}) scale(${s})`}>
    <ellipse cx={0} cy={2 + Math.abs(Math.sin(t * 8)) * 30} rx={50} ry={7} fill="#000" opacity={0.12} />
    <ellipse cx={0} cy={-34} rx={46} ry={28} fill="#d6d3d1" />
    <circle cx={44} cy={-56} r={20} fill="#d6d3d1" />
    <ellipse cx={40} cy={-100} rx={8} ry={28} fill="#d6d3d1" transform="rotate(-15 40 -100)" /><ellipse cx={54} cy={-98} rx={8} ry={26} fill="#e7e5e4" transform="rotate(10 54 -98)" />
    <circle cx={52} cy={-60} r={3} fill="#1f2937" /><circle cx={-44} cy={-40} r={10} fill="#fff" />
  </g>
);

const Icono: React.FC<{ k: number; t: number }> = ({ k, t }) => {
  switch (k) {
    case 0: return <g><path d="M -22 -34 H 22 L 0 0 L 22 34 H -22 L 0 0 Z" fill="#f59e0b" /><rect x={-26} y={-40} width={52} height={8} rx={4} fill="#92400e" /><rect x={-26} y={32} width={52} height={8} rx={4} fill="#92400e" /></g>;
    case 1: return <g><rect x={-40} y={-24} width={80} height={48} rx={24} fill={ROSA} /><path d="M -14 0 H 14 M 4 -10 L 14 0 L 4 10" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" /></g>;
    case 2: return <Calendario x={0} y={-30} s={0.6} marcados={3} />;
    case 3: return <g><rect x={-40} y={-26} width={80} height={52} rx={8} fill="#e2e8f0" /><path d="M -40 -26 L 0 6 L 40 -26" stroke="#94a3b8" strokeWidth={5} fill="none" /><circle cx={30} cy={20} r={16} fill={AZUL_M} /><path d="M 24 20 a 6 6 0 1 0 6 -6" stroke="#fff" strokeWidth={4} fill="none" /></g>;
    case 4: return <g><rect x={-4} y={-40} width={8} height={70} fill="#64748b" /><rect x={-50} y={-38} width={100} height={8} rx={4} fill="#64748b" transform={`rotate(${8 * Math.sin(t * 2)})`} /><rect x={-56} y={-24} width={30} height={20} rx={4} fill={NARANJA} /><rect x={26} y={-24} width={30} height={30} rx={4} fill={VIOLETA} /></g>;
    case 5: return <g><circle r={36} fill="#fbbf24" /><circle cx={-12} cy={-8} r={5} fill="#1f2937" /><circle cx={12} cy={-8} r={5} fill="#1f2937" /><path d="M -18 10 Q 0 28 18 10" stroke="#1f2937" strokeWidth={5} fill="none" strokeLinecap="round" /></g>;
    case 6: return <g transform="translate(0 30)"><Auto x={0} y={0} s={0.45} color={AZUL_M} /></g>;
    default: return <g><circle cx={-24} cy={-14} r={14} fill="#f7c4a0" /><path d="M -42 26 Q -42 2 -24 2 Q -6 2 -6 26 Z" fill={GRIS} /><path d="M 4 0 H 30" stroke={NARANJA} strokeWidth={6} strokeLinecap="round" /><path d="M 22 -8 L 32 0 L 22 8" stroke={NARANJA} strokeWidth={6} fill="none" /><circle cx={46} cy={-14} r={12} fill="#f7c4a0" /><path d="M 32 26 Q 32 4 46 4 Q 60 4 60 26 Z" fill={VERDE} /></g>;
  }
};

export const RepertorioES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const CART: [string, string][] = [['pausa', 'Pausa incómoda'], ['suave', 'No, pero…'], ['agenda', 'Reviso mi agenda'], ['automatica', 'Respuesta automática'], ['jefe', '¿Qué dejo de priorizar?'], ['humor', 'Con humor'], ['auto', 'Tú X, yo Y'], ['otra', 'Otra persona']];
  const rot: [number, string][] = [[m('repertorio'), 'Un repertorio'], ...CART.map(([n, r]) => [m(n), r] as [number, string]), [m('krill'), 'Kay Krill'], [m('friel'), 'Tom Friel'], [m('lento'), 'Sí lento, no rápido']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El repertorio del no">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la caja de herramientas */}
      <Toma t={t} a={0} b={m('krill')} cy={480}>
        <g opacity={e1(t, m('repertorio'))}>
          <path d="M 420 780 H 780 L 760 690 H 440 Z" fill="#b91c1c" />
          <rect x={430} y={660} width={340} height={40} rx={10} fill="#dc2626" />
          <path d="M 540 660 V 630 H 660 V 660" stroke="#7f1d1d" strokeWidth={12} fill="none" />
        </g>
        {CART.map(([n, r], k) => {
          const u = sm(t, m(n), m(n) + 0.8);
          const cx = 180 + (k % 4) * 280, cy = 230 + Math.floor(k / 4) * 220;
          const x = lerp(600, cx, u), y = lerp(680, cy, u);
          return u > 0.01 && (
            <g key={n} transform={`translate(${x} ${y}) scale(${0.4 + 0.6 * u})`}>
              <rect x={-120} y={-90} width={240} height={180} rx={22} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.18))' }} />
              <g transform="translate(0 -18)"><Icono k={k} t={t} /></g>
              <Txt x={0} y={70} textAnchor="middle" fontSize={24} fill={c.texto}>{r}</Txt>
            </g>
          );
        })}
      </Toma>

      {/* 2 · Krill y la carrera de Friel */}
      <Toma t={t} a={m('krill')} b={fin + 1} cy={480}>
        {ventana(t, m('krill') - 0.1, m('friel')) > 0.01 && (
          <g opacity={ventana(t, m('krill') - 0.1, m('friel'))}>
            <Suelo y={720} isDark={isDark} x0={160} x1={1040} />
            <Persona id={ID} x={420} y={720} s={1.1} cuerpo={ROSA} pelo="#4b3621" />
            <Letrero x={760} y={420} texto="Sabe qué es importante para ella" id={ID} tam={30} />
            <Txt f="a" x={760} y={500} textAnchor="middle" fontSize={26} fill={c.texto}>Kay Krill, Ann Taylor</Txt>
          </g>
        )}
        {t >= m('friel') && (
          <g opacity={e1(t, m('friel'))}>
            <Colinas y={560} isDark={isDark} t={t} op={0.7} />
            <rect x={80} y={560} width={1040} height={18} rx={9} fill={c.apagado} />
            <rect x={80} y={740} width={1040} height={18} rx={9} fill={c.apagado} />
            <Tortuga x={lerp(160, 420, sm(t, m('lento'), m('lento') + 6))} y={560} s={1.2} t={t} />
            <Liebre x={lerp(160, 1040, sm(t, m('lento') + 0.8, m('lento') + 2.4))} y={740} s={1.1} t={t} />
            <Letrero x={260} y={420} texto="El sí, lento" fondo={VERDE} id={ID} tam={30} op={e1(t, m('lento'))} />
            <Letrero x={940} y={630} texto="El no, rápido" fondo={NARANJA} id={ID} tam={30} op={e1(t, m('lento') + 0.8)} />
            {!movil && <Txt f="a" x={600} y={200} textAnchor="middle" fontSize={24} fill={c.tenue}>Tom Friel, ex director ejecutivo de Heidrick & Struggles</Txt>}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};

