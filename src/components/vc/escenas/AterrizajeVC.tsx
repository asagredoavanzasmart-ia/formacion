import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Edificio, Moneda3D, Visto, Cruz, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, AMBAR, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Aterrizaje y expansión, literal: un avión que aterriza junto al edificio del cliente.
 * 1 · Entra ágil, aterriza, hace caja (monedas) y entrega un primer pedido pequeño; con la expansión los pisos se encienden
 *     uno a uno y el coach saluda desde adentro.
 * 2 · Las dos etapas comparadas en barras (presupuesto, proceso, ciclo): la expansión abre la cuenta completa.
 * 3 · El error: aterrizar un avión de carga gigante el primer día, cuando nadie te conoce.
 */

const ID = 'vc12', P = 'vc-aterrizaje';

const Avion: React.FC<{ x: number; y: number; s?: number; rot?: number; color?: string; op?: number }> = ({ x, y, s = 1, rot = 0, color = '#e2e8f0', op = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
    <path d="M -110 -6 Q -110 -22 -80 -22 H 80 Q 118 -22 124 0 Q 118 16 80 16 H -80 Q -110 16 -110 -6 Z" fill={color} />
    <path d="M -96 -20 L -122 -62 H -98 L -66 -20 Z" fill={NARANJA} />
    <path d="M -20 0 L -60 52 H -30 L 30 0 Z" fill={GRIS} />
    {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={-40 + k * 26} cy={-6} r={6} fill="#93c5fd" />)}
    <path d="M 96 -12 Q 112 -10 116 -2 H 96 Z" fill="#93c5fd" />
  </g>
);

export const AterrizajeVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('entrada'), 'Estrategia de entrada'], [m('aterrizaje'), '1 · Aterrizaje'], [m('expansion'), '2 · Expansión'], [m('comparar'), 'Las dos etapas'], [m('fracasan'), 'El error'],
  ];
  // Vuelo: entra en «entrada», toca pista en «agilidad» + 1,5 s.
  const v = sm(t, m('entrada'), m('agilidad') + 1.5);
  const ax = lerp(80, 470, v), ay = lerp(220, 705, Math.min(1, v * 1.1));
  const pisos = Math.floor(6 * sm(t, m('expansion'), m('comparar') - 1));
  const caja = (x: number, y: number) => <rect x={x - 22} y={y - 22} width={44} height={44} rx={6} fill="#c08457" />;
  const pedido = sm(t, m('pedido'), m('pedido') + 1.6);
  const FILAS = ['Presupuesto', 'Proceso', 'Ciclo'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Aterrizaje y expansión">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · aterrizar y expandir */}
      <Toma t={t} a={0} b={m('comparar')} cy={470}>
        <rect x={60} y={730} width={700} height={40} rx={20} fill={isDark ? '#3a3f47' : '#94a3b8'} opacity={e1(t, m('entrada'))} />
        <line x1={90} y1={750} x2={730} y2={750} stroke="#fff" strokeWidth={5} strokeDasharray="34 22" opacity={0.7 * e1(t, m('entrada'))} />
        <g opacity={e1(t, m('entrada'))}>
          <path d="M 1080 740 L 1142 709 L 1142 229 L 1080 260 Z" fill={isDark ? '#475569' : '#64748b'} />
          <path d="M 1080 740 L 1142 709 L 1142 229 L 1080 260 Z" fill="#000" opacity={0.28} />
          <path d="M 820 260 L 1080 260 L 1142 229 L 882 229 Z" fill={isDark ? '#475569' : '#64748b'} />
          <path d="M 820 260 L 1080 260 L 1142 229 L 882 229 Z" fill="#fff" opacity={0.3} />
          <rect x={820} y={260} width={260} height={480} fill={isDark ? '#475569' : '#64748b'} />
          <rect x={820} y={260} width={26} height={480} fill="#fff" opacity={0.14} />
          {Array.from({ length: 6 }, (_, f) => <path key={f} d={`M 1094 ${686 - f * 72} l 34 -17 v 40 l -34 17 Z`} fill={f < pisos ? "#fde68a" : "#dbeafe"} opacity={f < pisos ? 0.8 : 0.3} />)}
          <rect x={900} y={210} width={56} height={22} rx={3} fill={isDark ? '#475569' : '#64748b'} /><rect x={900} y={210} width={56} height={22} rx={3} fill="#000" opacity={0.2} />
          {Array.from({ length: 6 }, (_, f) => [0, 1, 2].map((k) => <rect key={`${f}${k}`} x={846 + k * 76} y={680 - f * 72} width={54} height={44} rx={6} fill={f < pisos ? '#fde68a' : (isDark ? '#334155' : '#94a3b8')} />))}
          <rect x={826} y={690} width={40} height={50} rx={4} fill="#1f2937" />
        </g>
        {t >= m('entrada') && <Avion x={ax} y={ay} s={0.9} rot={lerp(14, 0, sm(v, 0.7, 1))} />}
        {t >= m('aterrizaje') && t < m('expansion') && <Letrero x={420} y={200} texto="Menor valor, ciclo corto" fondo={AZUL_M} id={ID} op={e1(t, m('aterrizaje'))} tam={26} />}
        {t >= m('caja') && t < m('expansion') && [0, 1, 2].map((k) => { const u = sm(t, m('caja') + 0.3 * k, m('caja') + 0.3 * k + 1); return <Moneda3D key={k} x={lerp(830, 640 - 60 * k, u)} y={lerp(700, 560 - 40 * k, u) - 80 * Math.sin(Math.PI * u)} r={22} op={u > 0 ? 1 : 0} />; })}
        {t >= m('caja') && t < m('pedido') && <Letrero x={420} y={820} texto="Hacer caja rápido" fondo={VERDE} id={ID} op={e1(t, m('caja'))} tam={26} />}
        {t >= m('pedido') && caja(lerp(560, 846, pedido), 708)}
        {t >= m('pedido') && t < m('expansion') && <Letrero x={420} y={820} texto="Un primer pedido pequeño" id={ID} op={e1(t, m('pedido'))} tam={26} />}
        {t >= m('coach') && <g opacity={e1(t, m('coach'))}><Persona id={ID} x={690} y={720} s={0.55} cuerpo={NARANJA} /><Visto x={690} y={540} r={22} /></g>}
        {t >= m('expansion') && <Letrero x={420} y={200} texto="Más presupuesto, más tiempo" fondo={NARANJA} id={ID} op={e1(t, m('expansion'))} tam={26} />}
      </Toma>

      {/* 2 · comparación */}
      <Toma t={t} a={m('comparar')} b={m('fracasan')} cy={470}>
        <g opacity={e1(t, m('comparar'))}>
          <rect x={360} y={150} width={36} height={36} rx={8} fill={AZUL_M} /><Txt x={410} y={178} fontSize={28} fill={c.texto}>Aterrizaje</Txt>
          <rect x={690} y={150} width={36} height={36} rx={8} fill={NARANJA} /><Txt x={740} y={178} fontSize={28} fill={c.texto}>Expansión</Txt>
        </g>
        {FILAS.map((n, k) => {
          const y = 300 + k * 160;
          const a = sm(t, m('comparar') + 0.8 + 1.4 * k, m('comparar') + 1.8 + 1.4 * k);
          const b = sm(t, m('comparar') + 6 + 1.2 * k, m('comparar') + 7 + 1.2 * k);
          return (
            <g key={n} opacity={e1(t, m('comparar') + 0.8 + 1.4 * k)}>
              <Txt x={70} y={y + 30} fontSize={30} fill={c.texto}>{n}</Txt>
              <rect x={movil ? 380 : 330} y={y - 10} width={200 * a} height={36} rx={18} fill={AZUL_M} />
              <rect x={movil ? 380 : 330} y={y + 40} width={(movil ? 560 : 640) * b} height={36} rx={18} fill={NARANJA} />
            </g>
          );
        })}
        {t >= m('abre') && <Letrero x={600} y={800} texto="La expansión abre la cuenta completa" id={ID} op={e1(t, m('abre'))} tam={26} />}
      </Toma>

      {/* 3 · el error */}
      <Toma t={t} a={m('fracasan')} b={fin + 1} cy={470}>
        <rect x={100} y={730} width={360} height={40} rx={20} fill={isDark ? '#3a3f47' : '#94a3b8'} />
        <Edificio x={950} y={740} w={260} h={380} color={isDark ? '#334155' : '#94a3b8'} />
        <Avion x={lerp(200, 420, sm(t, m('fracasan'), m('fracasan') + 2))} y={lerp(260, 540, sm(t, m('fracasan'), m('fracasan') + 2))} s={2.1} rot={18} color={isDark ? '#cbd5e1' : '#e2e8f0'} />
        {t >= m('fracasan') + 2 && <Cruz x={640} y={330} r={50} op={e1(t, m('fracasan') + 2)} />}
        <Letrero x={600} y={820} texto="La expansión el primer día" fondo={ROSA} id={ID} op={e1(t, m('fracasan') + 1)} tam={26} />
      </Toma>
    </Lienzo>
  );
};
