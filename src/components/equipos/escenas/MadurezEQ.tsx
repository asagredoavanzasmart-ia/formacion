import React from 'react';
import { Lienzo, useEscena, Letrero, Rol, Persona, Cruz, Visto, Hoja, Cifra, Rotulo, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «Mapa de ruta: la evolución por tamaño». Una escalera de tres peldaños con un candado en cada contrahuella:
 * cada fase gana el derecho a la siguiente. Peldaño 1 (MVP): una persona hace malabares con todos los roles,
 * valida y escribe el primer playbook. Peldaño 2 (tracción): el contador de 60 a 80 cuentas, el SDR y el AE
 * separados por un tabique y un CRM central. Peldaño 3 (Enterprise): dos células, una pirámide que se aplana y
 * un agente de IA. Después: quien salta del 1 al 3 cae en el caos; la empresa que se queda en el 2 acumula
 * pisos de pirámide; no se apilan personas, se diseña un ecosistema conectado.
 */

const ID = 'eq17';
const nombres = ['etapas', 'derecho', 'f1', 'unados', 'validar', 'playbooks', 'f2', 'sesenta', 'separacion', 'crm', 'f3', 'celulas', 'aplanamiento', 'ia', 'orden', 'caos', 'acumula', 'apila', 'ecosistemas', 'pregunta'] as const;
type N = typeof nombres[number];

const PEL = [
  { x0: 80, x1: 430, top: 610, color: AZUL_M, txt: '1 · MVP' },
  { x0: 430, x1: 780, top: 480, color: NARANJA, txt: '2 · Tracción' },
  { x0: 780, x1: 1130, top: 350, color: VERDE, txt: '3 · Enterprise' },
];

const Candado: React.FC<{ x: number; y: number; abre: number; c: string }> = ({ x, y, abre, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d={`M -14 -6 V -22 A 14 14 0 0 1 14 -22 V ${-6 - 14 * abre}`} stroke={c} strokeWidth={6} fill="none" transform={`translate(${abre * 8} ${-abre * 6})`} />
    <rect x={-20} y={-8} width={40} height={32} rx={8} fill={abre > 0.5 ? VERDE : c} />
  </g>
);

export const MadurezEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Mapa de ruta'], [m('etapas'), 'Se construye por etapas'], [m('derecho'), 'Cada fase gana el derecho'],
    [m('f1'), 'Fase 1 · MVP'], [m('unados'), 'Una o dos personas, todos los roles'], [m('validar'), 'Validar el modelo'], [m('playbooks'), 'Los primeros playbooks'],
    [m('f2'), 'Fase 2 · Tracción'], [m('sesenta'), '60 a 80 cuentas al año'], [m('separacion'), 'SDR y AE separados'], [m('crm'), 'CRM centralizado'],
    [m('f3'), 'Fase 3 · Enterprise'], [m('celulas'), 'Sales Pods'], [m('aplanamiento'), 'Aplanamiento intencional'], [m('ia'), 'IA conversacional'],
    [m('orden'), 'El orden importa'], [m('caos'), 'Saltar: caos con otro nombre'], [m('acumula'), 'Quedarse: acumula pirámide'], [m('apila'), 'No apilar personas'], [m('ecosistemas'), 'Diseñar ecosistemas'],
  ];

  const abre1 = sm(t, m('f2') - 0.6, m('f2'));
  const abre2 = sm(t, m('f3') - 0.6, m('f3'));
  /* quien sube la escalera */
  const paso = t >= m('f3') ? 2 : t >= m('f2') ? 1 : 0;
  const tp = [m('f1'), m('f2'), m('f3')][paso];
  const u = sm(t, tp, tp + 1.4);
  const xs = [250, 600, 950];
  const wx = paso === 0 ? lerp(140, xs[0] - 110, u) : lerp(xs[paso - 1] - 110, xs[paso] - 120, u);
  const wy = paso === 0 ? PEL[0].top : u < 0.5 ? PEL[paso - 1].top - 40 * Math.sin(Math.PI * u) : lerp(PEL[paso - 1].top, PEL[paso].top, sm(u, 0.3, 0.7));
  const fueraOrden = sm(t, m('orden'), m('orden') + 0.6);
  const atenua = 1 - 0.5 * fueraOrden - 0.5 * sm(t, m('ecosistemas') - 0.4, m('ecosistemas'));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Mapa de ruta estructural">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* la escalera */}
      {PEL.map((p, k) => (
        <g key={k} opacity={e1(t, m('etapas') + k * 0.35)}>
          <rect x={p.x0} y={p.top} width={p.x1 - p.x0} height={760 - p.top} rx={14} fill={p.color} opacity={t >= [m('f1'), m('f2'), m('f3')][k] ? 0.95 : 0.35} style={sombra(c.sombra, 4, 10)} />
          <rect x={(p.x0 + p.x1) / 2} y={p.top} width={(p.x1 - p.x0) / 2} height={760 - p.top} rx={14} fill="#000" opacity={0.08} />
          <Txt f="a" x={p.x0 + 24} y={p.top + 50} fontSize={30} fill="#fff">{p.txt}</Txt>
        </g>
      ))}
      {t >= m('derecho') && <g opacity={e1(t, m('derecho'))}>
        <Candado x={430} y={560} abre={abre1} c={PIZARRA} />
        <Candado x={780} y={430} abre={abre2} c={PIZARRA} />
      </g>}

      {/* FASE 1 · todos los roles a la vez */}
      {t >= m('unados') && <g opacity={e1(t, m('unados')) * atenua}>
        <Persona id={ID} x={250} y={PEL[0].top} s={0.5} cuerpo={AZUL_M} />
        {[VIOLETA, ROSA, NARANJA, VERDE].map((col, k) => { const a = t * 2.4 + (k * Math.PI) / 2; return <circle key={k} cx={250 + 60 * Math.cos(a)} cy={PEL[0].top - 130 + 22 * Math.sin(a)} r={12} fill={col} />; })}
      </g>}
      {t >= m('validar') && <g opacity={e1(t, m('validar')) * atenua}><Visto x={130} y={PEL[0].top - 90} r={22} /></g>}
      {t >= m('playbooks') && <g opacity={e1(t, m('playbooks')) * atenua}>
        <Hoja x={360} y={PEL[0].top - 55} w={60} h={78} lineas={Math.round(lerp(1, 5, sm(t, m('playbooks'), m('playbooks') + 2)))} color={AZUL_M} />
      </g>}

      {/* FASE 2 · tracción */}
      {t >= m('sesenta') && <g opacity={e1(t, m('sesenta')) * atenua}>
        <Cifra x={520} y={PEL[1].top - 130} valor={80} u={ac(t, m('sesenta'), m('sesenta') + 1.5)} tam={50} color={NARANJA} pre="60–" ancla="start" />
        <Txt f="a" x={520} y={PEL[1].top - 96} fontSize={22} fill={c.tenue}>cuentas al año</Txt>
      </g>}
      {t >= m('separacion') && <g opacity={e1(t, m('separacion')) * atenua}>
        <Rol id={ID} rol="sdr" x={520} y={PEL[1].top} s={0.36} sigla={false} herramienta={false} />
        <rect x={566} y={PEL[1].top - 70} width={8} height={70} rx={4} fill={PIZARRA} opacity={sm(t, m('separacion') + 0.5, m('separacion') + 1)} />
        <Rol id={ID} rol="ae" x={620} y={PEL[1].top} s={0.36} sigla={false} herramienta={false} />
      </g>}
      {t >= m('crm') && <g opacity={e1(t, m('crm')) * atenua} transform={`translate(712 ${PEL[1].top - 50})`}>
        <rect x={-30} y={-20} width={60} height={40} fill={ROSA} /><ellipse cy={20} rx={30} ry={9} fill={ROSA} /><ellipse cy={-20} rx={30} ry={9} fill="#fda4af" />
      </g>}

      {/* FASE 3 · Enterprise */}
      {t >= m('celulas') && <g opacity={e1(t, m('celulas')) * atenua}>
        {[860, 990].map((x, k) => <g key={x}><ellipse cx={x} cy={PEL[2].top - 40} rx={56} ry={40} fill={VERDE} opacity={0.2} />{[0, 1, 2].map((j) => <circle key={j} cx={x - 24 + j * 24} cy={PEL[2].top - 40 + (j % 2) * 10} r={10} fill={[NARANJA, AZUL_M, TEAL][j]} />)}</g>)}
      </g>}
      {t >= m('aplanamiento') && (() => { const a = sm(t, m('aplanamiento') + 0.3, m('aplanamiento') + 1.6); return (
        <g opacity={e1(t, m('aplanamiento')) * atenua} transform={`translate(880 ${PEL[2].top - 120})`}>
          {[0, 1, 2].map((k) => { const w = lerp(90 - k * 26, 100, a), h = lerp(20, 9, a); return <rect key={k} x={-w / 2} y={-(k + 1) * (h + 2)} width={w} height={h} rx={4} fill={[PIZARRA, AMBAR, PIZARRA][k]} />; })}
        </g>
      ); })()}
      {t >= m('ia') && <g opacity={e1(t, m('ia')) * atenua} transform={`translate(1050 ${PEL[2].top - 112})`}>
        <rect x={-22} y={-20} width={44} height={34} rx={12} fill="#f1f5f9" /><rect x={-16} y={-12} width={32} height={16} rx={7} fill="#0f172a" />
        {[-7, 7].map((dx) => <circle key={dx} cx={dx} cy={-4} r={3} fill={TEAL} opacity={0.6 + 0.4 * Math.sin(t * 4 + dx)} />)}
        <rect x={-2} y={-32} width={4} height={12} fill="#94a3b8" /><circle cy={-34} r={5} fill={TEAL} />
      </g>}

      {/* quien sube */}
      {t >= m('f1') && t < m('orden') + 0.6 && <g opacity={e1(t, m('f1')) * (1 - fueraOrden)}><Persona id={ID} x={wx} y={wy} s={0.34} cuerpo={PIZARRA} /></g>}

      {/* el orden importa */}
      {t >= m('orden') && <g opacity={e1(t, m('orden'))}>
        {[[255, PEL[0].top - 200, 600, PEL[1].top - 200], [605, PEL[1].top - 200, 950, PEL[2].top - 200]].map(([x1, y1, x2, y2], k) => <path key={k} d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - 60} ${x2} ${y2}`} stroke={VERDE} strokeWidth={6} fill="none" strokeDasharray="12 10" opacity={0.8 * (1 - ac(t, m('caos'), m('caos') + 0.5))} />)}
      </g>}
      {t >= m('caos') && (() => { const v = sm(t, m('caos') + 0.2, m('caos') + 1.8); const cae = v > 0.7; return (
        <g opacity={e1(t, m('caos')) * (1 - ac(t, m('acumula') - 0.4, m('acumula')))}>
          <path d={`M 250 ${PEL[0].top - 140} Q 600 40 950 ${PEL[2].top - 160}`} stroke={ROJO_M} strokeWidth={5} fill="none" strokeDasharray="10 8" />
          <g transform={`translate(${lerp(250, 860, Math.min(v, 0.85))} ${cae ? lerp(220, 420, (v - 0.7) / 0.3) : lerp(PEL[0].top - 140, 200, Math.sin(Math.PI * v * 0.7))}) rotate(${cae ? 60 * (v - 0.7) / 0.3 : 0})`}>
            <Persona id={ID} x={0} y={0} s={0.34} cuerpo={ROJO_M} />
          </g>
          {cae && <path d="M 820 260 q 20 -30 40 0 t 40 0 t 40 0" stroke={ROJO_M} strokeWidth={5} fill="none" opacity={(v - 0.7) / 0.3} />}
        </g>
      ); })()}
      {t >= m('acumula') && (() => { const u2 = sm(t, m('acumula') + 0.3, m('acumula') + 2.5); return (
        <g opacity={e1(t, m('acumula')) * (1 - ac(t, m('apila') - 0.4, m('apila')))} transform={`translate(600 ${PEL[1].top - 200})`}>
          {[0, 1, 2, 3, 4].map((k) => u2 * 5 > k && <rect key={k} x={-(110 - k * 20)} y={-k * 26} width={(110 - k * 20) * 2} height={22} rx={6} fill={k % 2 ? AMBAR : PIZARRA} opacity={0.9} />)}
        </g>
      ); })()}
      {t >= m('apila') && <g opacity={e1(t, m('apila')) * (1 - ac(t, m('ecosistemas') - 0.4, m('ecosistemas')))} transform="translate(600 220)">
        {[0, 1, 2, 3].map((k) => <rect key={k} x={-30} y={-60 + k * 34} width={60} height={26} rx={6} fill={PIZARRA} />)}
        <Cruz x={60} y={-50} r={22} op={sm(t, m('apila') + 0.5, m('apila') + 1)} />
      </g>}
      {t >= m('ecosistemas') && (() => { const P: [number, number][] = [[250, PEL[0].top - 120], [600, PEL[1].top - 140], [950, PEL[2].top - 110], [420, 230], [780, 170]]; return (
        <g opacity={e1(t, m('ecosistemas'))}>
          {P.map((a, i) => P.map((b, j) => j > i && <line key={`${i}${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={`url(#${ID}-marcaH)`} strokeWidth={3} opacity={0.5} />))}
          {P.map(([x, y], k) => <circle key={k} cx={x} cy={y} r={14 + 3 * Math.sin(t * 3 + k)} fill={[AZUL_M, NARANJA, VERDE, VIOLETA, ROSA][k]} />)}
        </g>
      ); })()}
    </Lienzo>
  );
};
