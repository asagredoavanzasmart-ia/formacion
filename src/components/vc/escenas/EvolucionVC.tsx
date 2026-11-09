import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Nodo, Hilo, Busto, Propuesta, Contrato, Edificio, Visto, Cruz, Flujo, Reloj, enS, curvaS, e1, sm, cl, lerp, ventana, tono, sombra, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, TEAL, GRIS, AMBAR, ROJO_M } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Comparativa: evolución de la venta (diapositiva 02, con los nodos y curvas de la original).
 * 1 · Venta simple: el comprador escucha (ondas), evalúa (?) y decide (✓) en una sola cabeza; luego la pareja que
 *     compra una casa conversa y firma. Una mesa común los envuelve: pocos y en la misma mesa.
 * 2 · El ejecutivo: la propuesta se divide en dos sobres (compras → TI → legal y compras → gerencia → finanzas) que
 *     llegan a la decisión. Aliados: gerencia y compras se encienden en verde, ganan cuando la propuesta gana y empujan
 *     hacia el vendedor. Riesgo: un anillo rojo recorre a todos y se queda en TI, que empuja en contra; nunca lo conociste.
 * 3 · El condominio: el vendedor entra a veces por el mayordomo, el administrador o un vecino; la corona del decisor
 *     salta entre ellos y se queda en el mayordomo. La propuesta va de mano en mano, vuelve con preguntas y llega al
 *     comité. Detractor: el mayordomo, fuera de presupuesto. Un mes.
 * 4 · Empresa con dos socios: gerencia, RR. HH., el área contable la devuelve por el costo, gerencia general y junta;
 *     todos conversan y la propuesta va y vuelve. Detractor: uno de los socios, que confía en otro proveedor. Tres meses.
 * 5 · Otra empresa: asistente, asesores que la devuelven, seguridad y dos decisores. Detractor: seguridad, a quien
 *     nadie fue a ver. Tres meses.
 * 6 · En todos los casos: los tres recorridos lado a lado; no se gana en una conversación sino en cada parada.
 */

const ID = 'vc02', P = 'vc-evolucion';
type Pt = [number, number];
type Hop = [Pt, Pt, number, boolean?];
const DUR = 1.1;

/* Corona del rol que decide. */
const Corona: React.FC<{ x: number; y: number; s?: number; op?: number }> = ({ x, y, s = 1, op = 1 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <path d="M -22 10 L -24 -14 L -11 -2 L 0 -18 L 11 -2 L 24 -14 L 22 10 Z" fill={AMBAR} style={sombra(0.25, 2, 4)} />
      <rect x={-22} y={8} width={44} height={8} rx={4} fill="#d97706" />
      <circle cx={0} cy={-18} r={4} fill="#fde68a" />
    </g>
  );

export const EvolucionVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const D = isDark;
  const rot: [number, string][] = [
    [m('simple'), 'Venta simple'], [m('cabeza'), 'Una sola cabeza'], [m('dos'), 'Dos compradores'], [m('firman'), 'Firman juntos'],
    [m('mesa'), 'Pocos, en la misma mesa'], [m('viaja'), 'En la venta compleja, la propuesta viaja'], [m('decision'), 'Decisión de compra'],
    [m('aliados'), 'Aliados: si ganas, ganan'], [m('riesgo'), 'El mayor riesgo'], [m('detractor'), 'Un detractor'], [m('conocer'), 'Y quizás nunca lo conoces'],
    [m('condominio'), 'Un condominio'], [m('varia'), 'El rol decisor varía'], [m('poder'), 'Más poder que el administrador'], [m('mano'), 'De mano en mano'],
    [m('preguntas'), 'Vuelve con preguntas'], [m('comite'), 'Decide el comité'], [m('detC'), 'Detractor: el mayordomo'], [m('unmes'), 'Un mes'],
    [m('socios'), 'Empresa con dos socios'], [m('devuelve'), 'Contabilidad la devuelve'], [m('junta'), 'La junta de socios'], [m('todos'), 'Todos conversan con todos'],
    [m('detJ'), 'Detractor: uno de los socios'], [m('proveedor'), 'Confía en otro proveedor'], [m('tresJ'), 'Tres meses'],
    [m('otra'), 'Otra empresa'], [m('devuelven'), 'Vuelve con observaciones'], [m('seguridad'), 'Seguridad revisa'], [m('dos2'), 'Dos decisores'],
    [m('detG'), 'Detractor: seguridad'], [m('nadie'), 'Nadie fue a verlo'], [m('tresG'), 'Tres meses'],
    [m('todosCasos'), 'En todos los casos'], [m('recorrido'), 'Se gana en cada parada'],
  ];
  const s0 = m('simple'), a0 = m('viaja'), b0 = m('condominio'), c0 = m('socios'), d0 = m('otra'), e0 = m('todosCasos');

  /* El vendedor: al centro en la venta simple, a la izquierda en la compleja; se retira en la síntesis. */
  const vx = lerp(360, 120, sm(t, a0 - 0.2, a0 + 1));
  const V: Pt = [vx, 470];
  const vend = t >= c0 && t < d0 ? { n: 'Equipo|de ventas', c: 'Equipo', f: 'dos' as const } : t >= m('ejecutivo') && t < b0 ? { n: 'Ejecutivo', f: 'uno' as const } : { n: 'Vendedor', f: 'uno' as const };

  /* El sobre recorre tramos [desde, hasta, inicio, ¿vuelve?]: viaja sobre la curva con estela e inclinación, y en
     reposo se apoya en el hombro del nodo. Al llegar, una onda marca la parada. */
  const tramo = (ruta: Hop[]) => { let h = -1; ruta.forEach(([, , t0], k) => { if (t >= t0) h = k; }); return h; };
  const sobre = (ruta: Hop[], op = 1, sello?: string) => {
    const h = tramo(ruta);
    if (h < 0 || op < 0.01) return null;
    const [p, q, t0, vuelve] = ruta[h];
    const u = sm(t, t0, t0 + DUR);
    const en = (w: number): Pt => { const [x, y] = enS(p[0], p[1], q[0], q[1], cl(w)); const s = Math.sin(Math.PI * cl(w)); return [x + 64 * (1 - s), y - 58 * (1 - s)]; };
    const [x, y] = en(u), [x2, y2] = en(u + 0.03);
    const viajando = u > 0.001 && u < 0.999;
    const ang = viajando ? Math.max(-20, Math.min(20, (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI * 0.4)) : 0;
    const color = vuelve && viajando ? ROJO_M : sello;
    return (
      <g>
        {viajando && [3, 2, 1].map((k) => { const [gx, gy] = en(u - 0.07 * k); return <Propuesta key={k} x={gx} y={gy} s={0.6} op={op * (0.34 - 0.09 * k)} sello={color} />; })}
        <Propuesta x={x} y={y + (viajando ? 0 : 3 * Math.sin(t * 3))} s={0.66 * (1 + 0.1 * Math.sin(Math.PI * u))} rot={ang} op={op} sello={color} />
      </g>
    );
  };
  const ondas = (ruta: Hop[], color = NARANJA) => ruta.map(([, q, t0, vuelve], k) => {
    const a = t0 + DUR;
    if (t < a || t > a + 0.8) return null;
    const u = (t - a) / 0.8;
    return <circle key={k} cx={q[0]} cy={q[1]} r={60 + 46 * u} fill="none" stroke={vuelve ? ROJO_M : color} strokeWidth={6 * (1 - u)} opacity={1 - u} />;
  });
  /* Tramos ya recorridos: ida en degradado, vuelta en rojo punteado. */
  const traza = (ruta: Hop[]) => ruta.map(([p, q, t0, vuelve], k) => t >= t0 && (vuelve
    ? <path key={k} d={curvaS(q[0] + 22, q[1] + 22, p[0] + 22, p[1] + 22)} fill="none" stroke={ROJO_M} strokeWidth={4} strokeDasharray="10 9" opacity={0.85 * sm(t, t0, t0 + DUR)} />
    : <Hilo key={k} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} u={sm(t, t0, t0 + DUR)} id={ID} />));
  /* Malla tenue: todos los roles conectados entre sí; `vivo` hace correr chispas por cada lazo. */
  const malla = (pts: Pt[], op: number, vivo = 0) => op > 0.01 && (
    <g opacity={op}>
      {pts.flatMap((p, i) => pts.slice(i + 1).map((q, j) => {
        const k = i * 7 + j;
        const u = (t * 0.5 + k * 0.17) % 1;
        const [x, y] = enS(p[0], p[1], q[0], q[1], u);
        return (
          <g key={`${i}-${j}`}>
            <path d={curvaS(p[0], p[1], q[0], q[1])} fill="none" stroke={c.apagado} strokeWidth={3} strokeDasharray="4 10" />
            {vivo > 0.01 && <circle cx={x} cy={y} r={5} fill={NARANJA} opacity={vivo * Math.sin(Math.PI * u)} />}
          </g>
        );
      }))}
    </g>
  );
  /* Detractor: anillo rojo que palpita, con la razón opcional (`nombre`, que entra en `tN`). */
  const detractor = (p: Pt, arriba: boolean, t0: number, op = 1, nombre?: string, tN = t0) => t >= t0 && (
    <g opacity={e1(t, t0) * op}>
      <circle cx={p[0]} cy={p[1]} r={80 + 10 * Math.sin(t * 6)} fill={ROJO_M} opacity={0.12} />
      <circle cx={p[0]} cy={p[1]} r={66 + 4 * Math.sin(t * 6)} fill="none" stroke={ROJO_M} strokeWidth={6} />
      {arriba ? (
        <>
          {nombre && t >= tN && <Txt x={p[0] - (movil ? 130 : 86)} y={p[1] - (movil ? 60 : 46)} textAnchor="end" fontSize={26} fill={c.texto} opacity={e1(t, tN)}>{nombre}</Txt>}
          <Txt x={p[0] - (movil ? 130 : 86)} y={p[1] - 12} textAnchor="end" fontSize={26} fill={ROJO_M}>Detractor</Txt>
        </>
      ) : (
        <>
          {nombre && t >= tN && <Txt x={p[0]} y={p[1] + (movil ? 160 : 128)} textAnchor="middle" fontSize={26} fill={c.texto} opacity={e1(t, tN)}>{nombre}</Txt>}
          <Txt x={p[0]} y={p[1] + (movil ? 160 : 128) + (nombre && t >= tN ? (movil ? 46 : 34) : 0)} textAnchor="middle" fontSize={26} fill={ROJO_M}>Detractor</Txt>
        </>
      )}
    </g>
  );
  /* Línea de tiempo: avanza con cada parada y se completa en `b`. `meses` = 1 cuenta por semanas. */
  const tiempo = (a: number, b: number, meses: number, paradas: number[], op: number) => {
    if (op < 0.01 || t < a) return null;
    const N = Math.max(1, paradas.length);
    const hechos = paradas.reduce((acc, tp) => acc + sm(t, tp, tp + DUR), 0);
    const u = t >= b ? 1 : 0.92 * (hechos / N) + 0.08 * sm(t, b - 0.4, b);
    const x0 = 330, x1 = 860, y = 132;
    const div = meses === 1 ? 4 : meses;
    const n = Math.max(1, Math.ceil(u * div));
    const listo = t >= b;
    const txt = listo ? (meses === 1 ? '1 mes' : `${meses} meses`) : meses === 1 ? `Semana ${n}` : `Mes ${n}`;
    return (
      <g opacity={op}>
        <Reloj x={x0 - 44} y={y} r={22} t={t * (listo ? 0 : 6)} aro={listo ? VERDE : NARANJA} />
        <rect x={x0} y={y - 8} width={x1 - x0} height={16} rx={8} fill={c.apagado} />
        <rect x={x0} y={y - 8} width={(x1 - x0) * u} height={16} rx={8} fill={`url(#${ID}-marcaH)`} />
        {!listo && <circle cx={x0 + (x1 - x0) * u} cy={y} r={11 + 2 * Math.sin(t * 8)} fill={ROSA} opacity={0.35} />}
        {Array.from({ length: div - 1 }, (_, k) => <rect key={k} x={x0 + ((k + 1) * (x1 - x0)) / div - 1.5} y={y - 14} width={3} height={28} fill={c.tenue} opacity={0.6} />)}
        {paradas.map((tp, k) => t >= tp + DUR && <circle key={k} cx={x0 + (x1 - x0) * 0.92 * ((k + 1) / N)} cy={y} r={9} fill="#fff" stroke={ROSA} strokeWidth={4} opacity={e1(t, tp + DUR)} />)}
        <g transform={`translate(${x1 + 22} ${y + 10}) scale(${listo ? 1 + 0.25 * (1 - sm(t, b, b + 0.6)) : 1})`}>
          <Txt x={0} y={0} fontSize={30} fill={listo ? VERDE : c.texto}>{txt}</Txt>
        </g>
      </g>
    );
  };
  const hilo = (p: Pt, q: Pt, t0: number, op = 1, color?: string) => <Hilo x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} u={sm(t, t0, t0 + 0.9)} id={ID} op={op} color={color} />;
  /* Insignia junto a alguien que nunca conoció al vendedor: el vendedor en miniatura, tachado. */
  const nunca = (q: Pt, t0: number, t1: number, dx: number, dy: number) => t >= t0 && t < t1 && (() => {
    const u = e1(t, t0);
    return (
      <g opacity={ventana(t, t0, t1)} transform={`translate(${q[0] + dx} ${q[1] + dy}) scale(${u})`}>
        <circle r={30} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
        <Busto x={0} y={6} s={0.62} color={NARANJA} />
        <Cruz x={20} y={-20} r={14} op={sm(t, t0 + 0.4, t0 + 0.8)} />
      </g>
    );
  })();
  const late = (a: number, b: number) => (t >= a && t < b ? 0.5 + 0.5 * Math.sin(t * 5) : 0);

  /* 1 · venta simple */
  const C1: Pt = [840, 470];
  const nube = e1(t, m('cabeza')) * (1 - sm(t, m('dos') - 0.2, m('dos') + 0.4));

  /* 2 · el ejecutivo: dos ramas que se juntan en la decisión */
  const AN: Pt = [330, 470], TI: Pt = [540, 290], GE: Pt = [540, 650], LE: Pt = [800, 290], FI: Pt = [800, 650], DE: Pt = [1060, 470];
  const rA: Hop[] = [[V, AN, m('analista')], [AN, TI, m('ti')], [TI, LE, m('legal')], [LE, DE, m('decision')]];
  const rA2: Hop[] = [[AN, GE, m('ge')], [GE, FI, m('finanzas')], [FI, DE, m('decision') + 0.15]];
  const ALIADOS: Pt[] = [AN, GE];
  const DEPTOS: Pt[] = [AN, GE, LE, FI, TI];
  const verde = e1(t, m('aliados')) * (1 - 0.6 * sm(t, m('riesgo'), m('riesgo') + 1));
  const ringA = (k: number) => { const t0 = m('cualquiera') + 0.45 * k; return t >= t0 && t < t0 + 1.1 && k !== 4 ? 1 - sm(t, t0 + 0.5, t0 + 1.1) : 0; };

  /* 3 · condominio */
  const VE: Pt = [330, 470], MA: Pt = [570, 290], AD: Pt = [570, 650], CO: Pt = [1010, 470];
  const rB: Hop[] = [[V, VE, m('mano')], [VE, MA, m('alMayordomo')], [MA, AD, m('alAdmin')], [AD, MA, m('preguntas'), true], [MA, CO, m('comite')]];
  const ENTRADAS: [Pt, string][] = [[MA, 'mayordomo'], [AD, 'administrador'], [VE, 'vecino']];
  const corona = (() => {
    const tv = m('varia'), tp = m('poder');
    if (t < tv) return null;
    const ruta = [VE, MA, AD];
    const salto = 0.75;
    const at = (tt: number): Pt => {
      const k = Math.floor((tt - tv) / salto), u = sm(tt - tv - k * salto, 0, salto * 0.8);
      const a = ruta[k % 3], b = ruta[(k + 1) % 3];
      return [lerp(a[0], b[0], u) + 46, lerp(a[1], b[1], u) - 52 - 50 * Math.sin(Math.PI * u)];
    };
    if (t < tp) return at(t);
    const [x, y] = at(tp), u = sm(t, tp, tp + 0.7);
    return [lerp(x, MA[0] + 46, u), lerp(y, MA[1] - 52, u) - 40 * Math.sin(Math.PI * u)] as Pt;
  })();

  /* 4 · empresa con dos socios */
  const G1: Pt = [390, 290], RH: Pt = [720, 290], FN: Pt = [390, 650], GG: Pt = [720, 650], JU: Pt = [1040, 470], OPV: Pt = [1030, 262];
  const rC: Hop[] = [[V, G1, m('gerencia')], [G1, RH, m('rrhh')], [RH, FN, m('consulta')], [FN, G1, m('devuelve'), true], [G1, GG, m('reenvia')], [GG, JU, m('junta')], [JU, GG, m('vuelve'), true], [GG, JU, m('vuelve') + 1.15]];

  /* 5 · otra empresa */
  const AS: Pt = [340, 470], AC: Pt = [570, 290], AL: Pt = [570, 650], SE: Pt = [800, 470], OP: Pt = [1040, 290], CM: Pt = [1040, 650];
  const rD: Hop[] = [[V, AS, m('asistente')], [AS, AC, m('contable')], [AC, AL, m('legales')], [AL, AS, m('devuelven'), true], [AS, SE, m('seguridad')], [SE, OP, m('dos2')]];
  const rD2: Hop[] = [[SE, CM, m('dos2') + 0.15]];

  /* 6 · síntesis: los tres recorridos */
  const CASOS: { tit: string; det: string; detC: string; meses: number; pts: Pt[]; lazos: [number, number][]; d: number }[] = [
    { tit: 'Condominio', det: 'Mayordomo', detC: 'Mayordomo', meses: 1, pts: [[-110, 0], [-30, -40], [-30, 40], [100, 0]], lazos: [[0, 1], [1, 2], [2, 1], [1, 3]], d: 1 },
    { tit: 'Dos socios', det: 'Uno de los socios', detC: 'Un socio', meses: 3, pts: [[-120, -36], [-40, -36], [-120, 40], [-40, 40], [100, 0]], lazos: [[0, 1], [1, 2], [2, 0], [0, 3], [3, 4]], d: 4 },
    { tit: 'Otra empresa', det: 'Seguridad', detC: 'Seguridad', meses: 3, pts: [[-120, 0], [-50, -40], [-50, 40], [30, 0], [110, -40], [110, 40]], lazos: [[0, 1], [1, 2], [2, 0], [0, 3], [3, 4], [3, 5]], d: 3 },
  ];
  const opVend = e1(t, s0) * (1 - sm(t, e0 - 0.3, e0 + 0.3));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Comparativa: evolución de la venta">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · venta simple */}
      <Toma t={t} a={s0} b={a0} cy={470}>
        {t >= m('mesa') && <ellipse cx={600} cy={500} rx={lerp(260, 340, e1(t, m('mesa')))} ry={lerp(90, 128, e1(t, m('mesa')))} fill={c.panel2} opacity={0.75 * e1(t, m('mesa'))} />}
        {hilo(V, C1, s0)}
        {t >= m('escucha') && t < m('dos') && <Flujo x1={V[0] + 60} y1={470} x2={C1[0] - 62} y2={470} t={t} n={4} vel={0.7} arco={0} color={NARANJA} r={7} op={ventana(t, m('escucha'), m('dos'))} />}
        <Nodo x={C1[0]} y={C1[1]} nombre={t >= m('dos') ? 'Compradores' : 'Comprador'} figura={t >= m('dos') ? 'dos' : 'uno'} destino op={e1(t, s0 + 0.4)} isDark={D} id={ID} />
        {nube > 0.01 && (
          <g opacity={nube} transform={`translate(840 ${300 + 4 * Math.sin(t * 2)})`}>
            <circle cx={-26} cy={118} r={8} fill={c.panel} style={sombra(c.sombra, 2, 4)} /><circle cx={-14} cy={92} r={12} fill={c.panel} style={sombra(c.sombra, 2, 4)} />
            <ellipse cx={0} cy={20} rx={92} ry={60} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
            {t < m('decide') ? <Txt x={0} y={38} textAnchor="middle" fontSize={56} fill={t >= m('escucha') ? AMBAR : c.tenue}>?</Txt> : <Visto x={0} y={20} r={30} op={e1(t, m('decide'))} />}
          </g>
        )}
        {t >= m('pareja') && (
          <g opacity={e1(t, m('pareja'))} transform={`translate(840 ${300 - 14 * (1 - e1(t, m('pareja')))})`}>
            <path d="M -74 -10 L 0 -74 L 74 -10 Z" fill={ROSA} /><rect x={-58} y={-12} width={116} height={80} rx={6} fill={isDark ? '#e2e8f0' : '#fff7ed'} />
            <rect x={-14} y={22} width={28} height={46} rx={4} fill="#7c4a1e" /><rect x={-48} y={6} width={24} height={20} rx={3} fill="#93c5fd" /><rect x={24} y={6} width={24} height={20} rx={3} fill="#93c5fd" />
            <rect x={36} y={-56} width={14} height={30} rx={2} fill="#9a3412" />
          </g>
        )}
        {t >= m('conversan') && t < m('firman') + 0.4 && [0, 1].map((k) => {
          const on = Math.floor((t - m('conversan')) / 0.6) % 2 === k;
          return (
            <g key={k} opacity={ventana(t, m('conversan'), m('firman') + 0.4) * (on ? 1 : 0.35)} transform={`translate(${k ? 990 : 690} ${k ? 410 : 410}) scale(${on ? 1.06 : 1})`}>
              <rect x={-38} y={-26} width={76} height={50} rx={18} fill={k ? ROSA : NARANJA} />
              {[-14, 0, 14].map((dx) => <circle key={dx} cx={dx} cy={0} r={4.5} fill="#fff" />)}
            </g>
          );
        })}
        {t >= m('firman') && (
          <g opacity={e1(t, m('firman'))}>
            <Contrato x={600} y={330} s={0.8} firma={sm(t, m('firman'), m('firman') + 1.4)} />
            <Visto x={540} y={250} r={20} op={e1(t, m('firman') + 0.6)} /><Visto x={660} y={250} r={20} op={e1(t, m('firman') + 1)} />
          </g>
        )}
      </Toma>

      {/* 2 · el ejecutivo: la propuesta viaja; aliados y un detractor */}
      <Toma t={t} a={a0} b={b0} cy={470}>
        {traza(rA)}{traza(rA2)}
        {t >= m('ayudarte') && t < m('riesgo') && ALIADOS.map((p, k) => <Flujo key={k} x1={p[0] - (k ? 20 : 60)} y1={p[1] - (k ? 50 : 0)} x2={V[0] + 60} y2={V[1]} t={t} n={4} vel={0.6} arco={k ? 60 : 0} color={VERDE} r={8} op={ventana(t, m('ayudarte'), m('riesgo'))} />)}
        {t >= m('ganan') && t < m('riesgo') && ALIADOS.map((p, k) => <Flujo key={k} x1={DE[0] - 60} y1={DE[1] + (k ? 30 : -10)} x2={p[0] + 60} y2={p[1]} t={t} n={3} vel={0.55} arco={k ? -80 : 80} color={VERDE} r={7} op={ventana(t, m('ganan'), m('ayudarte') + 0.5)} />)}
        {t >= m('contra') && <Flujo x1={TI[0] - 40} y1={TI[1] + 50} x2={AN[0] + 40} y2={AN[1] - 50} t={t} n={4} vel={0.8} arco={0} color={ROJO_M} r={8} op={ventana(t, m('contra'), b0)} />}
        {ALIADOS.map((p, k) => verde > 0.01 && (
          <g key={k} opacity={verde}>
            <circle cx={p[0]} cy={p[1]} r={72 + 4 * Math.sin(t * 4 + k)} fill={VERDE} opacity={0.14} />
            <circle cx={p[0]} cy={p[1]} r={64} fill="none" stroke={VERDE} strokeWidth={5} />
          </g>
        ))}
        <Nodo x={AN[0]} y={AN[1]} nombre="Analista|de compras" corto="Compras" color={AZUL_M} op={e1(t, m('analista'))} isDark={D} id={ID} />
        <Nodo x={TI[0]} y={TI[1]} nombre="TI" color={TEAL} arriba op={e1(t, m('ti'))} isDark={D} id={ID} />
        <Nodo x={GE[0]} y={GE[1]} nombre="Gerencia" color={VIOLETA} op={e1(t, m('ge'))} isDark={D} id={ID} />
        <Nodo x={LE[0]} y={LE[1]} nombre="Legal" color={GRIS} arriba op={e1(t, m('legal'))} isDark={D} id={ID} />
        <Nodo x={FI[0]} y={FI[1]} nombre="Finanzas" color={VERDE} op={e1(t, m('finanzas'))} isDark={D} id={ID} />
        <Nodo x={DE[0]} y={DE[1]} nombre="Decisión" figura="grupo" destino op={e1(t, m('decision'))} pulso={late(m('decision'), m('aliados'))} isDark={D} id={ID} />
        {ALIADOS.map((p, k) => verde > 0.01 && <g key={k} opacity={verde}><Visto x={p[0] + 46} y={p[1] - 46} r={18} op={e1(t, m('aliados') + 0.3 * k)} /></g>)}
        {t >= m('ganan') && <Visto x={DE[0] + 50} y={DE[1] - 50} r={22} op={e1(t, m('ganan')) * (1 - sm(t, m('riesgo'), m('riesgo') + 0.6))} />}
        {t >= m('decision') + 1.3 && t < m('riesgo') + 1 && <Contrato x={DE[0]} y={300} s={0.5} firma={sm(t, m('ganan'), m('ganan') + 1)} op={ventana(t, m('decision') + 1.3, m('riesgo') + 1)} />}
        {DEPTOS.map((p, k) => ringA(k) > 0.01 && <circle key={k} cx={p[0]} cy={p[1]} r={68} fill="none" stroke={ROJO_M} strokeWidth={6} opacity={ringA(k)} />)}
        {detractor(TI, true, m('detractor'))}
        {nunca(TI, m('conocer'), b0, 86, -76)}
        {sobre(rA, 1 - sm(t, m('decision') + 1.2, m('decision') + 1.6))}
        {sobre(rA2, 1 - sm(t, m('decision') + 1.2, m('decision') + 1.6), ROSA)}
        {ondas(rA)}{ondas(rA2, ROSA)}
      </Toma>

      {/* 3 · el condominio */}
      <Toma t={t} a={b0} b={c0} cy={470}>
        {malla([VE, MA, AD, CO], 0.8 * e1(t, m('mano')))}
        {t < m('mano') + 0.5 && ENTRADAS.map(([q, a], k) => {
          if (t < m(a)) return null;
          const activo = t < m('varia') && (k === 2 || t < m(ENTRADAS[k + 1][1]));
          return <path key={a} d={curvaS(V[0] + 58, V[1], q[0] - 60, q[1])} fill="none" stroke={activo ? NARANJA : c.apagado} strokeWidth={activo ? 6 : 3} strokeDasharray="10 10" strokeDashoffset={-t * 40} opacity={e1(t, m(a)) * (1 - sm(t, m('mano'), m('mano') + 0.5))} />;
        })}
        {traza(rB)}
        <Edificio x={1010} y={380} w={120} h={170} color={isDark ? '#475569' : '#94a3b8'} op={e1(t, b0)} />
        <Nodo x={VE[0]} y={VE[1]} nombre="Vecino" color={TEAL} op={e1(t, m('vecino'))} isDark={D} id={ID} />
        <Nodo x={MA[0]} y={MA[1]} nombre="Mayordomo" color={AMBAR} arriba op={e1(t, m('mayordomo'))} pulso={late(m('poder'), m('mano'))} isDark={D} id={ID} />
        <Nodo x={AD[0]} y={AD[1]} nombre="Administrador" corto="Admin." color={AZUL_M} op={e1(t, m('administrador'))} isDark={D} id={ID} />
        <Nodo x={CO[0]} y={CO[1]} nombre="Comité" figura="grupo" destino op={e1(t, b0 + 0.4)} pulso={late(m('comite') + DUR, m('detC'))} isDark={D} id={ID} />
        {corona && <Corona x={corona[0]} y={corona[1]} s={0.9} op={e1(t, m('varia')) * (1 - sm(t, m('mano'), m('mano') + 0.5))} />}
        {t >= m('preguntas') && t < m('comite') && <Txt x={MA[0] + 120} y={MA[1] + 120} fontSize={48} fill={ROJO_M} opacity={ventana(t, m('preguntas') + 0.6, m('comite'))}>?</Txt>}
        {nunca(CO, m('sinConocer'), m('unmes'), 92, 0)}
        {detractor(MA, true, m('detC'), 1, movil ? 'Sin presupuesto' : 'Fuera de presupuesto', m('presupuesto'))}
        {sobre(rB, 1 - sm(t, m('unmes'), m('unmes') + 0.5))}
        {ondas(rB)}
        {tiempo(m('mano'), m('unmes'), 1, rB.map(([, , t0]) => t0), e1(t, m('mano')))}
      </Toma>

      {/* 4 · empresa con dos socios */}
      <Toma t={t} a={c0} b={d0} cy={470}>
        {malla([G1, RH, FN, GG, JU], (0.35 + 0.55 * sm(t, m('todos'), m('todos') + 0.8)) * e1(t, m('gerencia')), ventana(t, m('todos'), m('detJ')))}
        {traza(rC.slice(0, 6))}
        <Nodo x={G1[0]} y={G1[1]} nombre="Gerencia" color={VIOLETA} arriba op={e1(t, m('gerencia'))} isDark={D} id={ID} />
        <Nodo x={RH[0]} y={RH[1]} nombre="Recursos humanos" corto="RR. HH." color={ROSA} arriba op={e1(t, m('rrhh'))} isDark={D} id={ID} />
        <Nodo x={FN[0]} y={FN[1]} nombre="Contable" color={VERDE} op={e1(t, m('consulta'))} isDark={D} id={ID} />
        <Nodo x={GG[0]} y={GG[1]} nombre="Gerencia general" corto="G. general" color={AZUL_M} op={e1(t, m('reenvia'))} isDark={D} id={ID} />
        <Nodo x={JU[0]} y={JU[1]} nombre="Junta de socios" corto="Junta" figura="grupo" destino op={e1(t, c0 + 0.4)} pulso={late(m('junta') + DUR, m('detJ'))} isDark={D} id={ID} />
        {t >= m('proveedor') && (
          <g opacity={e1(t, m('proveedor'))}>
            <path d={`M ${OPV[0]} ${OPV[1] + 50} L ${JU[0]} ${JU[1] - 90}`} stroke={GRIS} strokeWidth={4} strokeDasharray="6 8" />
            <Nodo x={OPV[0]} y={OPV[1]} r={46} nombre="Otro proveedor" corto="Otro prov." figura="nada" color={GRIS} arriba isDark={D} id={ID}>
              <Propuesta x={0} y={4} s={0.55} sello={GRIS} />
            </Nodo>
          </g>
        )}
        {t >= m('costo') && t < m('reenvia') && <Letrero x={560} y={470} texto="¿Y el costo?" fondo={ROJO_M} id={ID} op={ventana(t, m('costo'), m('reenvia'))} tam={26} />}
        {detractor(JU, false, m('detJ'), 1, movil ? 'Un socio' : 'Uno de los socios')}
        {sobre(rC, 1 - sm(t, m('tresJ'), m('tresJ') + 0.5))}
        {ondas(rC)}
        {tiempo(m('gerencia'), m('tresJ'), 3, rC.map(([, , t0]) => t0), e1(t, m('gerencia')))}
      </Toma>

      {/* 5 · otra empresa */}
      <Toma t={t} a={d0} b={e0} cy={470}>
        {malla([AS, AC, AL, SE, OP, CM], 0.7 * e1(t, m('asistente')))}
        {traza(rD)}{traza(rD2)}
        {t >= m('comercial') && <Flujo x1={OP[0] - 14} y1={OP[1] + 70} x2={CM[0] - 14} y2={CM[1] - 70} t={t} n={3} vel={0.7} arco={0} color={NARANJA} />}
        {t >= m('operaciones') && <Flujo x1={CM[0] + 14} y1={CM[1] - 70} x2={OP[0] + 14} y2={OP[1] + 70} t={t} n={3} vel={0.7} arco={0} color={AZUL_M} />}
        <Nodo x={AS[0]} y={AS[1]} nombre="Asistente" color={AMBAR} op={e1(t, m('asistente'))} isDark={D} id={ID} />
        <Nodo x={AC[0]} y={AC[1]} nombre="Asesor contable" corto="Contable" color={VERDE} arriba op={e1(t, m('contable'))} isDark={D} id={ID} />
        <Nodo x={AL[0]} y={AL[1]} nombre="Asesores legales" corto="Legales" color={GRIS} op={e1(t, m('legales'))} isDark={D} id={ID} />
        <Nodo x={SE[0]} y={SE[1]} nombre="Seguridad" color={TEAL} op={e1(t, m('seguridad'))} isDark={D} id={ID} />
        <Nodo x={OP[0]} y={OP[1]} nombre="Operaciones" figura="uno" destino arriba op={e1(t, m('dos2'))} pulso={late(m('operaciones'), m('detG'))} isDark={D} id={ID} />
        <Nodo x={CM[0]} y={CM[1]} nombre="Comercial" figura="uno" destino op={e1(t, m('dos2'))} pulso={late(m('comercial'), m('operaciones'))} isDark={D} id={ID} />
        {t >= m('antecedentes') && t < m('dos2') && <Letrero x={800} y={360} texto={movil ? 'Antecedentes' : 'Más antecedentes'} fondo={ROJO_M} id={ID} op={ventana(t, m('antecedentes'), m('dos2'))} tam={24} />}
        {t >= m('comercial') && t < m('detG') && <Letrero x={600} y={800} texto={t >= m('operaciones') ? (movil ? 'Que nada se rompa' : 'Operaciones: que nada se rompa') : (movil ? 'Vender más' : 'Comercial: vender más')} fondo={t >= m('operaciones') ? AZUL_M : undefined} id={ID} op={ventana(t, m('comercial'), m('detG'))} tam={26} />}
        {nunca(SE, m('nadie'), e0, 0, -122)}
        {detractor(SE, false, m('detG'))}
        {sobre(rD, 1 - sm(t, m('detG'), m('detG') + 0.5))}
        {sobre(rD2, 1 - sm(t, m('detG'), m('detG') + 0.5), ROSA)}
        {ondas(rD)}{ondas(rD2, ROSA)}
        {tiempo(m('asistente'), m('tresG'), 3, [...rD, ...rD2].map(([, , t0]) => t0), e1(t, m('asistente')))}
      </Toma>

      {/* 6 · en todos los casos */}
      <Toma t={t} a={e0} b={fin + 1} cy={470}>
        {CASOS.map((k, i) => {
          const t0 = e0 + 0.35 * i;
          const cx = 220 + 380 * i;
          const op = e1(t, t0);
          return (
            <g key={k.tit} opacity={op} transform={`translate(0 ${24 * (1 - op)})`}>
              <rect x={cx - 160} y={180} width={320} height={345} rx={24} fill={c.panel} style={sombra(c.sombra, 6, 16)} />
              <Txt x={cx} y={232} textAnchor="middle" fontSize={26} fill={c.texto}>{k.tit}</Txt>
              <g transform={`translate(${cx} 320)`}>
                {k.lazos.map(([a, b], j) => <Hilo key={j} x1={k.pts[a][0]} y1={k.pts[a][1]} x2={k.pts[b][0]} y2={k.pts[b][1]} u={sm(t, t0 + 0.2 + 0.15 * j, t0 + 0.6 + 0.15 * j)} id={`${ID}-s${i}`} grosor={4} />)}
                {k.pts.map(([x, y], j) => (
                  <g key={j}>
                    {j === k.d && <circle cx={x} cy={y} r={22 + 3 * Math.sin(t * 6)} fill={ROJO_M} opacity={0.2} />}
                    <circle cx={x} cy={y} r={13} fill={j === k.d ? ROJO_M : j === k.pts.length - 1 || (i === 2 && j === 4) ? `url(#${ID}-marca)` : c.panel2} style={sombra(c.sombra, 2, 4)} />
                  </g>
                ))}
              </g>
              <Txt x={cx} y={420} textAnchor="middle" fontSize={22} fill={ROJO_M}>{movil ? k.detC : k.det}</Txt>
              <rect x={cx - 120} y={448} width={240} height={14} rx={7} fill={c.apagado} />
              <rect x={cx - 120} y={448} width={240 * (k.meses / 3) * sm(t, t0 + 0.4, t0 + 1.2)} height={14} rx={7} fill={`url(#${ID}-marcaH)`} />
              <Txt x={cx} y={500} textAnchor="middle" fontSize={26} fill={c.texto}>{k.meses === 1 ? '1 mes' : `${k.meses} meses`}</Txt>
            </g>
          );
        })}
        {t >= m('conversacion') && t < m('recorrido') + 0.6 && (
          <g opacity={ventana(t, m('conversacion'), m('recorrido') + 0.6)} transform="translate(600 680)">
            <rect x={-110} y={-40} width={220} height={80} rx={30} fill={c.panel2} />
            <path d="M -40 38 L -56 66 L -14 40 Z" fill={c.panel2} />
            {[-36, 0, 36].map((dx) => <circle key={dx} cx={dx} cy={0} r={9} fill={c.tenue} />)}
            <Cruz x={120} y={-34} r={26} op={sm(t, m('conversacion') + 0.4, m('conversacion') + 0.9)} />
          </g>
        )}
        {t >= m('recorrido') && (() => {
          const u = sm(t, m('recorrido') + 0.3, m('recorrido') + 2.2);
          const xs = [160, 320, 480, 640, 800, 960];
          const xp = lerp(160, 1060, u);
          return (
            <g opacity={e1(t, m('recorrido'))}>
              <line x1={160} y1={700} x2={1060} y2={700} stroke={c.apagado} strokeWidth={8} strokeLinecap="round" />
              <line x1={160} y1={700} x2={xp} y2={700} stroke={`url(#${ID}-marcaH)`} strokeWidth={8} strokeLinecap="round" />
              {xs.map((x) => (
                <g key={x}>
                  <circle cx={x} cy={700} r={16} fill={xp >= x ? VERDE : c.panel} stroke={xp >= x ? VERDE : c.apagado} strokeWidth={4} />
                  {xp >= x && <path d={`M ${x - 7} 700 l 5 5 l 9 -10`} stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />}
                </g>
              ))}
              <g transform={`translate(1060 700) scale(${0.6 + 0.4 * sm(t, m('recorrido') + 2, m('recorrido') + 2.5)})`}>
                <circle r={32} fill={u >= 1 ? VERDE : c.panel2} />
                <Txt x={0} y={10} textAnchor="middle" fontSize={28} fill="#fff">Sí</Txt>
              </g>
              <Propuesta x={xp} y={650} s={0.55} />
            </g>
          );
        })()}
      </Toma>

      {/* el vendedor queda en escena en todos los casos */}
      <Nodo x={V[0]} y={V[1]} nombre={vend.n} corto={'c' in vend ? vend.c : undefined} figura={vend.f} color={NARANJA} op={opVend} isDark={D} id={ID} />
    </Lienzo>
  );
};
