import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Nodo, Hilo, Propuesta, Contrato, Edificio, Visto, Flujo, enS, e1, sm, lerp, ventana, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, TEAL, GRIS, AMBAR } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Comparativa: evolución de la venta (la diapositiva 02 de Ventas B2B, con sus mismos nodos y curvas).
 * El vendedor se queda en escena y cambia de nombre según el caso; en cada caso la propuesta viaja por las paradas:
 * 1 · Venta simple: un comprador, luego dos (la pareja que compra una casa) y firman juntos en la misma mesa.
 * 2 · El ejecutivo: compras la deriva a TI y gerencia; legal y finanzas revisan; recién entonces, la decisión.
 * 3 · El condominio: mayordomo y administrador, pero decide el comité, que nunca conoció al vendedor.
 * 4 · El equipo de ventas: gerencia, contabilidad y RR. HH., gerencia general y la junta de socios.
 * 5 · Asistente, asesores contables y legales, y dos decisores con intereses distintos: comercial y operaciones.
 */

const ID = 'vc02', P = 'vc-evolucion';
type Pt = [number, number];

export const EvolucionVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const rot: [number, string][] = [
    [m('simple'), 'Venta simple'], [m('dos'), 'Dos compradores, una mesa'], [m('viaja'), 'La propuesta viaja'],
    [m('decision'), 'Decisión de compra'], [m('condominio'), 'Un condominio'], [m('comite'), 'Decide el comité'],
    [m('equipo'), 'Equipo de ventas a empresa'], [m('junta'), 'La junta de socios'], [m('asistente'), 'Paradas y dos decisores'],
    [m('recorrido'), 'Se gana en cada parada'],
  ];
  const D = isDark;
  const caso = (a: string, b: string | null) => [m(a), b ? m(b) : fin + 1] as const;
  const [s0, s1] = caso('simple', 'viaja');
  const [a0, a1] = caso('viaja', 'condominio');
  const [b0, b1] = caso('condominio', 'equipo');
  const [c0, c1] = caso('equipo', 'asistente');
  const [d0] = caso('asistente', null);

  // El vendedor: en la venta simple está al centro; en la compleja se corre a la izquierda.
  const vx = lerp(360, 120, sm(t, a0 - 0.2, a0 + 1));
  const vend = t >= d0 ? { n: 'Vendedor', f: 'uno' as const } : t >= c0 ? { n: 'Equipo|de ventas', c: 'Equipo', f: 'dos' as const } : t >= b0 ? { n: 'Vendedor', f: 'uno' as const } : t >= m('ejecutivo') ? { n: 'Ejecutivo', f: 'uno' as const } : { n: 'Vendedor', f: 'uno' as const };
  const V: Pt = [vx, 470];

  // Un tramo de la propuesta: de p a q por la curva en S, entre t0 y t0 + 1,1 s.
  const tramo = (p: Pt, q: Pt, t0: number) => {
    const u = sm(t, t0, t0 + 1.1);
    return { u, pos: enS(p[0], p[1], q[0], q[1], u) };
  };
  const viaje = (ruta: [Pt, Pt, number][]) => {
    let pos: Pt | null = null;
    for (const [p, q, t0] of ruta) if (t >= t0) pos = tramo(p, q, t0).pos;
    return pos;
  };

  // 2 · el ejecutivo y los departamentos (posiciones de la diapositiva original)
  const AN: Pt = [330, 470], LE: Pt = [540, 290], TI: Pt = [540, 650], FI: Pt = [840, 290], GE: Pt = [840, 650], DE: Pt = [1060, 470];
  const rA: [Pt, Pt, number][] = [[V, AN, m('analista')], [AN, TI, m('ti')], [TI, GE, m('ti') + 1.2], [GE, DE, m('decision')]];
  const rA2: [Pt, Pt, number][] = [[AN, LE, m('legal')], [LE, FI, m('finanzas')], [FI, DE, m('decision')]];
  // 3 · condominio
  const MA: Pt = [540, 330], AD: Pt = [540, 610], CO: Pt = [1000, 470];
  // 4 · equipo de ventas a empresa grande
  const G1: Pt = [400, 290], CT: Pt = [400, 650], RH: Pt = [720, 290], GG: Pt = [720, 650], JU: Pt = [1050, 470];
  // 5 · dos decisores
  const AS: Pt = [370, 470], AC: Pt = [600, 290], AL: Pt = [600, 650], OP: Pt = [980, 300], CM: Pt = [980, 640];

  const hilo = (p: Pt, q: Pt, t0: number, op = 1) => <Hilo x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} u={sm(t, t0, t0 + 0.9)} id={ID} op={op} />;
  const pA = viaje(rA), pA2 = viaje(rA2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Comparativa: evolución de la venta">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · venta simple */}
      <Toma t={t} a={s0} b={s1} cy={470}>
        {hilo(V, [840, 470], m('simple'))}
        <Nodo x={840} y={470} nombre={t >= m('dos') ? 'Compradores' : 'Comprador'} figura={t >= m('dos') ? 'dos' : 'uno'} destino op={e1(t, m('simple') + 0.4)} isDark={D} id={ID} />
        {t >= m('cabeza') && t < m('dos') && <Letrero x={600} y={790} texto="La decisión cabe en una cabeza" id={ID} op={e1(t, m('cabeza'))} tam={26} />}
        {t >= m('pareja') && (
          <g opacity={e1(t, m('pareja'))} transform={`translate(840 ${300 - 10 * (1 - e1(t, m('pareja')))})`}>
            <path d="M -70 -10 L 0 -70 L 70 -10 Z" fill={ROSA} /><rect x={-56} y={-12} width={112} height={78} rx={6} fill={isDark ? '#e2e8f0' : '#fff7ed'} />
            <rect x={-14} y={22} width={28} height={44} rx={4} fill="#7c4a1e" /><rect x={-46} y={6} width={24} height={20} rx={3} fill="#93c5fd" /><rect x={22} y={6} width={24} height={20} rx={3} fill="#93c5fd" />
          </g>
        )}
        {t >= m('firman') && <g opacity={e1(t, m('firman'))}><Contrato x={600} y={330} s={0.8} firma={sm(t, m('firman'), m('firman') + 1.4)} /><Visto x={540} y={250} r={20} op={e1(t, m('firman') + 0.6)} /><Visto x={660} y={250} r={20} op={e1(t, m('firman') + 1)} /></g>}
        {t >= m('firman') && <Letrero x={600} y={790} texto="Pocos y en la misma mesa" id={ID} op={e1(t, m('firman'))} tam={26} fondo={GRIS} />}
      </Toma>

      {/* 2 · el ejecutivo: la propuesta viaja por los departamentos */}
      <Toma t={t} a={a0} b={a1} cy={470}>
        {hilo(V, AN, m('analista'))}{hilo(AN, TI, m('ti'))}{hilo(TI, GE, m('ti') + 1.2)}
        {hilo(AN, LE, m('legal'))}{hilo(LE, FI, m('finanzas'))}{hilo(GE, DE, m('decision'))}{hilo(FI, DE, m('decision'))}
        <Nodo x={AN[0]} y={AN[1]} nombre="Analista|de compras" corto="Compras" color={AZUL_M} op={e1(t, m('analista'))} isDark={D} id={ID} />
        <Nodo x={TI[0]} y={TI[1]} nombre="TI" color={TEAL} op={e1(t, m('ti'))} isDark={D} id={ID} />
        <Nodo x={GE[0]} y={GE[1]} nombre="Gerencia" color={VIOLETA} op={e1(t, m('ti') + 0.5)} isDark={D} id={ID} />
        <Nodo x={LE[0]} y={LE[1]} nombre="Legal" color={GRIS} arriba op={e1(t, m('legal'))} isDark={D} id={ID} />
        <Nodo x={FI[0]} y={FI[1]} nombre="Finanzas" color={VERDE} arriba op={e1(t, m('finanzas'))} isDark={D} id={ID} />
        <Nodo x={DE[0]} y={DE[1]} nombre="Decisión" figura="grupo" destino op={e1(t, m('decision'))} pulso={t >= m('decision') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        {pA && <Propuesta x={pA[0] + 85} y={pA[1] - 40} s={0.7} op={1 - sm(t, m('decision') + 1, m('decision') + 1.5)} />}
        {pA2 && <Propuesta x={pA2[0] + 85} y={pA2[1] - 40} s={0.7} sello={ROSA} op={1 - sm(t, m('decision') + 1, m('decision') + 1.5)} />}
        {t >= m('legal') && t < m('decision') && <Letrero x={690} y={820} texto={t >= m('finanzas') ? 'Revisa los números' : 'Revisa el contrato'} id={ID} op={ventana(t, m('legal'), m('decision'))} tam={24} fondo={GRIS} />}
      </Toma>

      {/* 3 · el condominio */}
      <Toma t={t} a={b0} b={b1} cy={470}>
        {hilo(V, MA, m('mayordomo'))}{hilo(V, AD, m('administrador'))}
        {t >= m('comite') && <><Hilo x1={MA[0]} y1={MA[1]} x2={CO[0]} y2={CO[1]} u={sm(t, m('comite'), m('comite') + 0.9)} id={ID} /><Hilo x1={AD[0]} y1={AD[1]} x2={CO[0]} y2={CO[1]} u={sm(t, m('comite'), m('comite') + 0.9)} id={ID} /></>}
        <Edificio x={1000} y={380} w={120} h={170} color={isDark ? '#475569' : '#94a3b8'} op={e1(t, m('condominio'))} />
        <Nodo x={MA[0]} y={MA[1]} nombre="Mayordomo" color={AMBAR} arriba op={e1(t, m('mayordomo'))} isDark={D} id={ID} />
        <Nodo x={AD[0]} y={AD[1]} nombre="Administrador" corto="Admin." color={AZUL_M} op={e1(t, m('administrador'))} isDark={D} id={ID} />
        <Nodo x={CO[0]} y={CO[1]} nombre="Comité" figura="grupo" destino op={e1(t, m('comite'))} pulso={t >= m('comite') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        {t >= m('comite') && <Letrero x={600} y={800} texto="Nunca conoció al vendedor" id={ID} op={e1(t, m('comite') + 0.8)} tam={26} />}
      </Toma>

      {/* 4 · el equipo de ventas y la junta de socios */}
      <Toma t={t} a={c0} b={c1} cy={470}>
        {hilo(V, G1, m('gerenciaV'))}{hilo(V, CT, m('contabilidad'))}{hilo(G1, RH, m('contabilidad') + 0.4)}
        {hilo(CT, GG, m('general'))}{hilo(RH, JU, m('junta'))}{hilo(GG, JU, m('junta'))}
        <Nodo x={G1[0]} y={G1[1]} nombre="Gerencia" color={VIOLETA} arriba op={e1(t, m('gerenciaV'))} isDark={D} id={ID} />
        <Nodo x={CT[0]} y={CT[1]} nombre="Contabilidad" corto="Contable" color={VERDE} op={e1(t, m('contabilidad'))} isDark={D} id={ID} />
        <Nodo x={RH[0]} y={RH[1]} nombre="Recursos humanos" corto="RR. HH." color={ROSA} arriba op={e1(t, m('contabilidad') + 0.4)} isDark={D} id={ID} />
        <Nodo x={GG[0]} y={GG[1]} nombre="Gerencia general" corto="G. general" color={AZUL_M} op={e1(t, m('general'))} isDark={D} id={ID} />
        <Nodo x={JU[0]} y={JU[1]} nombre="Junta de socios" corto="Junta" figura="grupo" destino op={e1(t, m('junta'))} pulso={t >= m('junta') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        {(() => { const p = viaje([[V, G1, m('gerenciaV')], [G1, RH, m('contabilidad') + 0.4], [RH, JU, m('junta')]]); return p && <Propuesta x={p[0] + 85} y={p[1] - 40} s={0.7} />; })()}
      </Toma>

      {/* 5 · asistente, asesores y dos decisores */}
      <Toma t={t} a={d0} b={fin + 1} cy={470}>
        {hilo(V, AS, m('asistente'))}{hilo(AS, AC, m('asesores'))}{hilo(AS, AL, m('asesores') + 0.3)}
        {[AC, AL].map((p) => [OP, CM].map((q) => <React.Fragment key={`${p}${q}`}>{hilo(p, q, m('dos2'))}</React.Fragment>))}
        {t >= m('dos2') && <line x1={OP[0]} y1={OP[1] + 60} x2={CM[0]} y2={CM[1] - 60} stroke={`url(#${ID}-marca)`} strokeWidth={6} strokeLinecap="round" opacity={e1(t, m('dos2'))} />}
        {t >= m('comercial') && <Flujo x1={OP[0] - 14} y1={OP[1] + 70} x2={CM[0] - 14} y2={CM[1] - 70} t={t} n={3} vel={0.7} arco={0} color={NARANJA} />}
        {t >= m('operaciones') && <Flujo x1={CM[0] + 14} y1={CM[1] - 70} x2={OP[0] + 14} y2={OP[1] + 70} t={t} n={3} vel={0.7} arco={0} color={AZUL_M} />}
        <Nodo x={AS[0]} y={AS[1]} nombre="Asistente" color={AMBAR} op={e1(t, m('asistente'))} isDark={D} id={ID} />
        <Nodo x={AC[0]} y={AC[1]} nombre="Asesor contable" corto="Contable" color={VERDE} arriba op={e1(t, m('asesores'))} isDark={D} id={ID} />
        <Nodo x={AL[0]} y={AL[1]} nombre="Asesores legales" corto="Legales" color={GRIS} op={e1(t, m('asesores') + 0.3)} isDark={D} id={ID} />
        <Nodo x={OP[0]} y={OP[1]} nombre="Operaciones" figura="uno" destino arriba op={e1(t, m('dos2'))} pulso={t >= m('operaciones') && t < m('recorrido') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        <Nodo x={CM[0]} y={CM[1]} nombre="Comercial" figura="uno" destino op={e1(t, m('dos2'))} pulso={t >= m('comercial') && t < m('operaciones') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        {t >= m('comercial') && t < m('recorrido') && <Letrero x={600} y={800} texto={t >= m('operaciones') ? 'Operaciones: que nada se rompa' : 'Comercial: vender más'} fondo={t >= m('operaciones') ? AZUL_M : undefined} id={ID} op={e1(t, t >= m('operaciones') ? m('operaciones') : m('comercial'))} tam={26} />}
        {t >= m('recorrido') && <Letrero x={600} y={800} texto="Cada parada del recorrido" id={ID} op={e1(t, m('recorrido'))} tam={26} />}
      </Toma>

      {/* el vendedor queda en escena en todos los casos */}
      <Nodo x={V[0]} y={V[1]} nombre={vend.n} corto={'c' in vend ? vend.c : undefined} figura={vend.f} color={NARANJA} op={e1(t, m('simple'))} isDark={D} id={ID} />
    </Lienzo>
  );
};
