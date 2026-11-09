import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Nodo, Hilo, Propuesta, Contrato, Edificio, Visto, Cruz, Flujo, Reloj, enS, curvaS, e1, sm, cl, lerp, ventana, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, TEAL, GRIS, AMBAR, ROJO_M } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Comparativa: evolución de la venta (la diapositiva 02 de Ventas B2B, con sus nodos y curvas).
 * 1 · Venta simple: un comprador, luego dos (la pareja que compra una casa) y firman juntos en la misma mesa.
 * 2 · El ejecutivo: la propuesta viaja por compras, TI, gerencia, legal y finanzas hasta la decisión. Cualquiera puede
 *     ser detractor: un anillo rojo recorre los nodos y se queda en TI, a quien el vendedor nunca conoció.
 * 3 · El condominio: vecino, mayordomo y administrador, todos conectados; la propuesta pasa de mano en mano, vuelve al
 *     mayordomo con preguntas y llega al comité. Detractor: el mayordomo. Reloj: tres meses.
 * 4 · Empresa con dos socios: entra por gerencia, viaja a RR. HH., el área contable la devuelve, gerencia general y junta.
 *     Detractor: el socio comercial (uno de los integrantes de la junta). Reloj: un mes.
 * 5 · Empresa grande: asistente, asesores que la devuelven, seguridad y dos decisores. Detractor: seguridad. Seis meses.
 * En cada caso, una línea de tiempo arriba avanza mientras la propuesta viaja y marca cada parada.
 */

const ID = 'vc02', P = 'vc-evolucion';
type Pt = [number, number];
type Hop = [Pt, Pt, number, boolean?];

export const EvolucionVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('simple'), 'Venta simple'], [m('dos'), 'Dos compradores, una mesa'], [m('viaja'), 'La propuesta viaja'],
    [m('decision'), 'Decisión de compra'], [m('riesgo'), 'Cualquiera puede ser detractor'], [m('conocer'), 'Y quizás nunca lo conoces'],
    [m('condominio'), 'Un condominio'], [m('quien'), '¿Quién decide?'], [m('mano'), 'De mano en mano'], [m('preguntas'), 'Vuelve con preguntas'],
    [m('comite'), 'Decide el comité'], [m('detC'), 'Detractor: el mayordomo'], [m('tres'), 'Tres meses'],
    [m('socios'), 'Empresa con dos socios'], [m('devuelve'), 'Va y vuelve'], [m('junta'), 'La junta de socios'], [m('detJ'), 'Detractor: socio comercial'], [m('unmes'), 'Un mes'],
    [m('grande'), 'Una empresa grande'], [m('devuelven'), 'Vuelve con observaciones'], [m('seguridad'), 'Seguridad revisa'], [m('dos2'), 'Dos decisores'],
    [m('detG'), 'Detractor: seguridad'], [m('seis'), 'Seis meses'], [m('recorrido'), 'Se gana en cada parada'],
  ];
  const D = isDark;
  const caso = (a: string, b: string | null) => [m(a), b ? m(b) : fin + 1] as const;
  const [s0, s1] = caso('simple', 'viaja');
  const [a0, a1] = caso('viaja', 'condominio');
  const [b0, b1] = caso('condominio', 'socios');
  const [c0, c1] = caso('socios', 'grande');
  const [d0] = caso('grande', null);

  // El vendedor: en la venta simple está al centro; en la compleja se corre a la izquierda.
  const vx = lerp(360, 120, sm(t, a0 - 0.2, a0 + 1));
  const vend = t >= c0 && t < d0 ? { n: 'Equipo|de ventas', c: 'Equipo', f: 'dos' as const } : t >= m('ejecutivo') && t < b0 ? { n: 'Ejecutivo', f: 'uno' as const } : { n: 'Vendedor', f: 'uno' as const };
  const V: Pt = [vx, 470];

  /* La propuesta recorre una lista de tramos [desde, hasta, inicio, ¿vuelve?]: cada tramo dura 1,1 s. */
  const DUR = 1.1;
  const posicion = (ruta: Hop[]): Pt | null => {
    let pos: Pt | null = null;
    for (const [p, q, t0] of ruta) if (t >= t0) pos = enS(p[0], p[1], q[0], q[1], sm(t, t0, t0 + DUR));
    return pos;
  };
  const enMarcha = (ruta: Hop[]) => ruta.some(([, , t0]) => t >= t0 && t < t0 + DUR);
  /* Traza de los tramos ya recorridos: los de ida en degradado, los de vuelta en rojo punteado. */
  const traza = (ruta: Hop[]) => ruta.map(([p, q, t0, vuelve], k) => t >= t0 && (vuelve
    ? <path key={k} d={curvaS(q[0] + 22, q[1] + 22, p[0] + 22, p[1] + 22)} fill="none" stroke={ROJO_M} strokeWidth={4} strokeDasharray="10 9" pathLength={1} opacity={0.85 * sm(t, t0, t0 + DUR)} />
    : <Hilo key={k} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} u={sm(t, t0, t0 + DUR)} id={ID} />));
  /* Malla tenue: todos los roles se conectan entre sí. */
  const malla = (pts: Pt[], op: number) => op > 0.01 && (
    <g opacity={op}>{pts.flatMap((p, i) => pts.slice(i + 1).map((q, j) => <path key={`${i}-${j}`} d={curvaS(p[0], p[1], q[0], q[1])} fill="none" stroke={c.apagado} strokeWidth={3} strokeDasharray="4 10" />))}</g>
  );
  /* Detractor: anillo rojo que palpita y etiqueta bajo el nombre. `nombre` se usa cuando el nodo es un grupo
     (la junta de socios) y hay que decir cuál de sus integrantes es el detractor. */
  const detractor = (p: Pt, arriba: boolean, t0: number, op = 1, nombre?: string) => t >= t0 && (
    <g opacity={e1(t, t0) * op}>
      <circle cx={p[0]} cy={p[1]} r={78 + 10 * Math.sin(t * 6)} fill={ROJO_M} opacity={0.12} />
      <circle cx={p[0]} cy={p[1]} r={66 + 4 * Math.sin(t * 6)} fill="none" stroke={ROJO_M} strokeWidth={6} />
      {arriba ? (
        <>
          {nombre && <Txt x={p[0] - 84} y={p[1] - 16} textAnchor="end" fontSize={26} fill={c.texto}>{nombre}</Txt>}
          <Txt x={p[0] - 84} y={p[1] + (nombre ? 16 : 10)} textAnchor="end" fontSize={26} fill={ROJO_M}>Detractor</Txt>
        </>
      ) : (
        <>
          {nombre && <Txt x={p[0]} y={p[1] + (movil ? 160 : 128)} textAnchor="middle" fontSize={26} fill={c.texto}>{nombre}</Txt>}
          <Txt x={p[0]} y={p[1] + (movil ? 160 : 128) + (nombre ? 34 : 0)} textAnchor="middle" fontSize={26} fill={ROJO_M}>Detractor</Txt>
        </>
      )}
    </g>
  );
  /* Línea de tiempo: avanza de a → b; cada parada deja un punto. `meses` = 1 cuenta por semanas. */
  const tiempo = (a: number, b: number, meses: number, paradas: number[], op: number) => {
    if (op < 0.01) return null;
    // La barra avanza con cada parada: cada tramo recorrido suma su parte y el cierre completa el total.
    const N = Math.max(1, paradas.length);
    const hechos = paradas.reduce((acc, tp) => acc + sm(t, tp, tp + DUR), 0);
    const u = t >= b ? 1 : 0.92 * (hechos / N) + 0.08 * sm(t, b - 0.4, b);
    const x0 = 330, x1 = 860, y = 132;
    const div = meses === 1 ? 4 : meses;
    const n = Math.max(1, Math.ceil(u * div));
    const txt = t >= b ? (meses === 1 ? '1 mes' : `${meses} meses`) : meses === 1 ? `Semana ${n}` : `Mes ${n}`;
    return (
      <g opacity={op}>
        <Reloj x={x0 - 44} y={y} r={22} t={t * (u < 1 ? 6 : 0)} aro={u < 1 ? NARANJA : VERDE} />
        <rect x={x0} y={y - 8} width={x1 - x0} height={16} rx={8} fill={c.apagado} />
        <rect x={x0} y={y - 8} width={(x1 - x0) * u} height={16} rx={8} fill={`url(#${ID}-marcaH)`} />
        {Array.from({ length: div - 1 }, (_, k) => <rect key={k} x={x0 + ((k + 1) * (x1 - x0)) / div - 1.5} y={y - 14} width={3} height={28} fill={c.tenue} opacity={0.6} />)}
        {paradas.map((tp, k) => t >= tp + DUR && <circle key={k} cx={x0 + (x1 - x0) * 0.92 * ((k + 1) / N)} cy={y} r={9} fill="#fff" stroke={ROSA} strokeWidth={4} opacity={e1(t, tp)} />)}
        <Txt x={x1 + 22} y={y + 10} fontSize={30} fill={t >= b ? VERDE : c.texto}>{txt}</Txt>
      </g>
    );
  };
  const hilo = (p: Pt, q: Pt, t0: number, op = 1) => <Hilo x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} u={sm(t, t0, t0 + 0.9)} id={ID} op={op} />;
  const sobre = (p: Pt | null, op = 1, sello?: string) => p && <Propuesta x={p[0] + 88} y={p[1] - 6} s={0.66} op={op} sello={sello} />;

  // 2 · el ejecutivo y los departamentos (posiciones de la diapositiva original)
  const AN: Pt = [330, 470], LE: Pt = [540, 290], TI: Pt = [540, 650], FI: Pt = [840, 290], GE: Pt = [840, 650], DE: Pt = [1060, 470];
  const rA: Hop[] = [[V, AN, m('analista')], [AN, TI, m('ti')], [TI, GE, m('ti') + 1.2], [GE, DE, m('decision')]];
  const rA2: Hop[] = [[AN, LE, m('legal')], [LE, FI, m('finanzas')], [FI, DE, m('decision')]];
  const DEPTOS: Pt[] = [AN, LE, TI, FI, GE];
  // 3 · condominio
  const VE: Pt = [330, 470], MA: Pt = [570, 290], AD: Pt = [570, 650], CO: Pt = [1010, 470];
  const rB: Hop[] = [[V, VE, m('vecino')], [VE, MA, m('alMayordomo')], [MA, AD, m('alAdmin')], [AD, MA, m('preguntas'), true], [MA, CO, m('comite')]];
  // 4 · empresa con dos socios
  const G1: Pt = [390, 290], RH: Pt = [720, 290], FN: Pt = [390, 650], GG: Pt = [720, 650], JU: Pt = [1040, 470];
  const rC: Hop[] = [[V, G1, m('gerencia')], [G1, RH, m('rrhh')], [RH, FN, m('consulta')], [FN, G1, m('devuelve'), true], [G1, GG, m('reenvia')], [GG, JU, m('junta')]];
  // 5 · empresa grande
  const AS: Pt = [340, 470], AC: Pt = [570, 290], AL: Pt = [570, 650], SE: Pt = [800, 470], OP: Pt = [1040, 290], CM: Pt = [1040, 650];
  const rD: Hop[] = [[V, AS, m('asistente')], [AS, AC, m('contable')], [AC, AL, m('legales')], [AL, AS, m('devuelven'), true], [AS, SE, m('seguridad')], [SE, OP, m('dos2')]];
  const rD2: Hop[] = [[SE, CM, m('dos2')]];

  const pA = posicion(rA), pA2 = posicion(rA2);
  const ringA = (k: number) => { const t0 = m('cualquiera') + 0.45 * k; return t >= t0 && t < t0 + 1.2 && k !== 2 ? 1 - sm(t, t0 + 0.6, t0 + 1.2) : 0; };

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Comparativa: evolución de la venta">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · venta simple */}
      <Toma t={t} a={s0} b={s1} cy={470}>
        {hilo(V, [840, 470], m('simple'))}
        <Nodo x={840} y={470} nombre={t >= m('dos') ? 'Compradores' : 'Comprador'} figura={t >= m('dos') ? 'dos' : 'uno'} destino op={e1(t, m('simple') + 0.4)} isDark={D} id={ID} />
        {t >= m('cabeza') && t < m('dos') && <Letrero x={600} y={790} texto="La decisión cabe en una cabeza" id={ID} op={ventana(t, m('cabeza'), m('dos'))} tam={26} />}
        {t >= m('pareja') && (
          <g opacity={e1(t, m('pareja'))} transform={`translate(840 ${300 - 10 * (1 - e1(t, m('pareja')))})`}>
            <path d="M -70 -10 L 0 -70 L 70 -10 Z" fill={ROSA} /><rect x={-56} y={-12} width={112} height={78} rx={6} fill={isDark ? '#e2e8f0' : '#fff7ed'} />
            <rect x={-14} y={22} width={28} height={44} rx={4} fill="#7c4a1e" /><rect x={-46} y={6} width={24} height={20} rx={3} fill="#93c5fd" /><rect x={22} y={6} width={24} height={20} rx={3} fill="#93c5fd" />
          </g>
        )}
        {t >= m('firman') && <g opacity={e1(t, m('firman'))}><Contrato x={600} y={330} s={0.8} firma={sm(t, m('firman'), m('firman') + 1.4)} /><Visto x={540} y={250} r={20} op={e1(t, m('firman') + 0.6)} /><Visto x={660} y={250} r={20} op={e1(t, m('firman') + 1)} /></g>}
        {t >= m('firman') && <Letrero x={600} y={790} texto="Pocos y en la misma mesa" id={ID} op={e1(t, m('firman'))} tam={26} fondo={GRIS} />}
      </Toma>

      {/* 2 · el ejecutivo: la propuesta viaja; cualquiera puede ser detractor */}
      <Toma t={t} a={a0} b={a1} cy={470}>
        {hilo(V, AN, m('analista'))}{hilo(AN, TI, m('ti'))}{hilo(TI, GE, m('ti') + 1.2)}
        {hilo(AN, LE, m('legal'))}{hilo(LE, FI, m('finanzas'))}{hilo(GE, DE, m('decision'))}{hilo(FI, DE, m('decision'))}
        {t >= m('conocer') && (
          <g opacity={e1(t, m('conocer'))}>
            <path d={curvaS(V[0], V[1], TI[0], TI[1])} fill="none" stroke={ROJO_M} strokeWidth={4} strokeDasharray="8 10" opacity={0.7} />
            <Cruz x={(V[0] + TI[0]) / 2} y={(V[1] + TI[1]) / 2 + 10} r={24} op={sm(t, m('conocer') + 0.5, m('conocer') + 1)} />
          </g>
        )}
        <Nodo x={AN[0]} y={AN[1]} nombre="Analista|de compras" corto="Compras" color={AZUL_M} op={e1(t, m('analista'))} isDark={D} id={ID} />
        <Nodo x={TI[0]} y={TI[1]} nombre="TI" color={TEAL} op={e1(t, m('ti'))} isDark={D} id={ID} />
        <Nodo x={GE[0]} y={GE[1]} nombre="Gerencia" color={VIOLETA} op={e1(t, m('ti') + 0.5)} isDark={D} id={ID} />
        <Nodo x={LE[0]} y={LE[1]} nombre="Legal" color={GRIS} arriba op={e1(t, m('legal'))} isDark={D} id={ID} />
        <Nodo x={FI[0]} y={FI[1]} nombre="Finanzas" color={VERDE} arriba op={e1(t, m('finanzas'))} isDark={D} id={ID} />
        <Nodo x={DE[0]} y={DE[1]} nombre="Decisión" figura="grupo" destino op={e1(t, m('decision'))} pulso={t >= m('decision') && t < m('riesgo') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        {DEPTOS.map((p, k) => ringA(k) > 0.01 && <circle key={k} cx={p[0]} cy={p[1]} r={68} fill="none" stroke={ROJO_M} strokeWidth={6} opacity={ringA(k)} />)}
        {detractor(TI, false, m('detractor'))}
        {sobre(pA, 1 - sm(t, m('decision') + 1, m('decision') + 1.5))}
        {sobre(pA2, 1 - sm(t, m('decision') + 1, m('decision') + 1.5), ROSA)}
        {t >= m('legal') && t < m('decision') && <Letrero x={690} y={820} texto={t >= m('finanzas') ? 'Revisa los números' : 'Revisa el contrato'} id={ID} op={ventana(t, m('legal'), m('decision'))} tam={24} fondo={GRIS} />}
        {t >= m('conocer') && <Letrero x={600} y={150} texto="Nunca lo conociste" fondo={ROJO_M} id={ID} op={e1(t, m('conocer') + 0.4)} tam={26} />}
      </Toma>

      {/* 3 · el condominio */}
      <Toma t={t} a={b0} b={b1} cy={470}>
        {malla([VE, MA, AD, CO], 0.8 * e1(t, m('mano')))}
        {traza(rB)}
        <Edificio x={1010} y={380} w={120} h={170} color={isDark ? '#475569' : '#94a3b8'} op={e1(t, m('condominio'))} />
        <Nodo x={VE[0]} y={VE[1]} nombre="Vecino" color={TEAL} op={e1(t, m('vecino'))} isDark={D} id={ID} />
        <Nodo x={MA[0]} y={MA[1]} nombre="Mayordomo" color={AMBAR} arriba op={e1(t, m('mayordomo'))} pulso={t >= m('poder') && t < m('mano') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        <Nodo x={AD[0]} y={AD[1]} nombre="Administrador" corto="Admin." color={AZUL_M} op={e1(t, m('administrador'))} isDark={D} id={ID} />
        <Nodo x={CO[0]} y={CO[1]} nombre="Comité" figura="grupo" destino op={e1(t, m('condominio') + 0.4)} pulso={t >= m('comite') && t < m('detC') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        {t >= m('quien') && t < m('mano') && [VE, MA, AD].map((p, k) => <Txt key={k} x={p[0] + 52} y={p[1] - 44} fontSize={44} fill={ROSA} opacity={ventana(t, m('quien') + 0.2 * k, m('mano'))}>?</Txt>)}
        {t >= m('poder') && t < m('mano') && <Letrero x={570} y={150} texto="A veces decide el mayordomo" id={ID} op={ventana(t, m('poder'), m('mano'))} tam={26} />}
        {t >= m('sinConocer') && (
          <g opacity={ventana(t, m('sinConocer'), m('detC'))}>
            <path d={`M ${V[0] + 60} 470 L ${CO[0] - 66} 470`} stroke={ROJO_M} strokeWidth={4} strokeDasharray="8 10" opacity={0.6} />
            <Cruz x={800} y={470} r={24} />
          </g>
        )}
        {detractor(MA, true, m('detC'))}
        {sobre(posicion(rB), 1 - sm(t, m('detC'), m('detC') + 0.5))}
        {tiempo(m('vecino'), m('tres'), 3, rB.map(([, , t0]) => t0), e1(t, m('mano')))}
      </Toma>

      {/* 4 · empresa con dos socios */}
      <Toma t={t} a={c0} b={c1} cy={470}>
        {malla([G1, RH, FN, GG, JU], (0.35 + 0.55 * sm(t, m('todos'), m('todos') + 0.8)) * e1(t, m('gerencia')))}
        {traza(rC)}
        <Nodo x={G1[0]} y={G1[1]} nombre="Gerencia" color={VIOLETA} arriba op={e1(t, m('gerencia'))} isDark={D} id={ID} />
        <Nodo x={RH[0]} y={RH[1]} nombre="Recursos humanos" corto="RR. HH." color={ROSA} arriba op={e1(t, m('rrhh'))} isDark={D} id={ID} />
        <Nodo x={FN[0]} y={FN[1]} nombre="Contable" color={VERDE} op={e1(t, m('consulta'))} isDark={D} id={ID} />
        <Nodo x={GG[0]} y={GG[1]} nombre="Gerencia general" corto="G. general" color={AZUL_M} op={e1(t, m('reenvia'))} isDark={D} id={ID} />
        <Nodo x={JU[0]} y={JU[1]} nombre="Junta de socios" corto="Junta" figura="grupo" destino op={e1(t, m('socios') + 0.4)} pulso={t >= m('junta') && t < m('detJ') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        {t >= m('devuelve') && t < m('reenvia') && <Letrero x={560} y={470} texto="¿Y el costo?" fondo={ROJO_M} id={ID} op={ventana(t, m('devuelve'), m('reenvia'))} tam={26} />}
        {detractor(JU, false, m('detJ'), 1, 'Socio comercial')}
        {sobre(posicion(rC), 1 - sm(t, m('detJ'), m('detJ') + 0.5))}
        {tiempo(m('gerencia'), m('unmes'), 1, rC.map(([, , t0]) => t0), e1(t, m('gerencia')))}
      </Toma>

      {/* 5 · empresa grande */}
      <Toma t={t} a={d0} b={fin + 1} cy={470}>
        {malla([AS, AC, AL, SE, OP, CM], 0.7 * e1(t, m('asistente')))}
        {traza(rD)}{traza(rD2)}
        {t >= m('comercial') && <Flujo x1={OP[0] - 14} y1={OP[1] + 70} x2={CM[0] - 14} y2={CM[1] - 70} t={t} n={3} vel={0.7} arco={0} color={NARANJA} />}
        {t >= m('operaciones') && <Flujo x1={CM[0] + 14} y1={CM[1] - 70} x2={OP[0] + 14} y2={OP[1] + 70} t={t} n={3} vel={0.7} arco={0} color={AZUL_M} />}
        <Nodo x={AS[0]} y={AS[1]} nombre="Asistente" color={AMBAR} op={e1(t, m('asistente'))} isDark={D} id={ID} />
        <Nodo x={AC[0]} y={AC[1]} nombre="Asesor contable" corto="Contable" color={VERDE} arriba op={e1(t, m('contable'))} isDark={D} id={ID} />
        <Nodo x={AL[0]} y={AL[1]} nombre="Asesores legales" corto="Legales" color={GRIS} op={e1(t, m('legales'))} isDark={D} id={ID} />
        <Nodo x={SE[0]} y={SE[1]} nombre="Seguridad" color={TEAL} op={e1(t, m('seguridad'))} isDark={D} id={ID} />
        <Nodo x={OP[0]} y={OP[1]} nombre="Operaciones" figura="uno" destino arriba op={e1(t, m('dos2'))} pulso={t >= m('operaciones') && t < m('detG') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        <Nodo x={CM[0]} y={CM[1]} nombre="Comercial" figura="uno" destino op={e1(t, m('dos2'))} pulso={t >= m('comercial') && t < m('operaciones') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        {t >= m('antecedentes') && t < m('dos2') && <Letrero x={800} y={360} texto="Más antecedentes" fondo={ROJO_M} id={ID} op={ventana(t, m('antecedentes'), m('dos2'))} tam={24} />}
        {t >= m('comercial') && t < m('detG') && <Letrero x={600} y={800} texto={t >= m('operaciones') ? 'Operaciones: que nada se rompa' : 'Comercial: vender más'} fondo={t >= m('operaciones') ? AZUL_M : undefined} id={ID} op={ventana(t, m('comercial'), m('detG'))} tam={26} />}
        {detractor(SE, false, m('detG'))}
        {sobre(posicion(rD), 1 - sm(t, m('detG'), m('detG') + 0.5))}
        {sobre(posicion(rD2), 1 - sm(t, m('detG'), m('detG') + 0.5), ROSA)}
        {tiempo(m('asistente'), m('seis'), 6, [...rD, ...rD2].map(([, , t0]) => t0), e1(t, m('asistente')))}
        {t >= m('recorrido') && <Letrero x={600} y={800} texto="Cada parada del recorrido" id={ID} op={e1(t, m('recorrido'))} tam={26} />}
      </Toma>

      {/* el vendedor queda en escena en todos los casos */}
      <Nodo x={V[0]} y={V[1]} nombre={vend.n} corto={'c' in vend ? vend.c : undefined} figura={vend.f} color={NARANJA} op={e1(t, m('simple'))} isDark={D} id={ID} />
    </Lienzo>
  );
};
