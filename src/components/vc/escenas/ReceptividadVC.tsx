import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Txt, Persona, Propuesta, Nube, Reloj, Visto, Cruz, e1, sm, lerp, ventana, tono, sombra, useMovil, NARANJA, ROSA, AZUL_M, VERDE, AMBAR, GRIS, ROJO_M } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Nivel de receptividad: lo que importa es cómo vive el comprador el cambio.
 * 1 · El comprador está en la plataforma «Hoy»; el vendedor, al otro lado. Un monitor diagnostica cómo se siente.
 *     Miller y Heiman: el factor oculto. La niebla se levanta y aparece el abismo del cambio: comprar es cambiar.
 *     El vendedor piensa la propuesta como un regalo; el comprador, como una amenaza. La pieza encaja, pero no basta.
 * 2 · Tres trampas de mandíbula en el camino del vendedor, que se cierran al nombrarse: creer que su visión manda,
 *     que el comprador la comparte y que, si no, está equivocado.
 * 3 · La realidad, vista por la lente del comprador: no su personalidad (se tacha), sino su situación de hoy y lo que
 *     cree que pasará si cambia (una bifurcación).
 * 4 · Momentos, no personas: la misma persona, siempre positiva, en una línea de tiempo; hoy ve un problema: falló tu
 *     momento. 5 · Los cuatro modos, con los colores del barco: crecimiento, problemas, equilibrio y exceso de confianza.
 */

const ID = 'vc19', P = 'vc-receptividad';
const MODOS: { n: string[]; col: string }[] = [
  { n: ['Crecimiento'], col: '#3b82f6' }, { n: ['Problemas'], col: '#ef4444' }, { n: ['Equilibrio'], col: '#10b981' }, { n: ['Exceso de', 'confianza'], col: '#a855f7' },
];

/* Trampa de mandíbulas; `u` 0 = abierta en el suelo, 1 = cerrada. */
const Trampa: React.FC<{ x: number; y: number; u: number; c: ReturnType<typeof tono> }> = ({ x, y, u, c }) => {
  const mand = (lado: number) => (
    <g transform={`rotate(${lado * -88 * u} ${lado * -54} 0)`}>
      <path d={`M ${lado * -54} 0 Q ${lado * -27} 22 0 0`} stroke={GRIS} strokeWidth={8} fill="none" strokeLinecap="round" />
      {[0.25, 0.5, 0.75].map((k) => <path key={k} d={`M ${lado * -54 * (1 - k)} ${22 * 2 * k * (1 - k)} l ${lado * 5} -14 l ${lado * 5} 14`} fill={GRIS} />)}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={6} rx={70} ry={12} fill="#000" opacity={0.15} />
      <rect x={-22} y={-4} width={44} height={10} rx={4} fill={c.tenue} />
      {mand(1)}{mand(-1)}
    </g>
  );
};

export const ReceptividadVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [0.3, 'Nivel de receptividad'], [m('diagnostica'), 'Diagnostica cómo se siente'], [m('situacion'), 'Frente a hoy y al cambio'], [m('miller'), 'Miller y Heiman'],
    [m('oculto'), 'El factor oculto'], [m('cambie'), 'Comprar es cambiar'], [m('ayuda'), 'Tú ves una ayuda'], [m('amenaza'), 'Él puede ver una amenaza'],
    [m('encaja'), 'Encajar no basta'], [m('trampas'), 'Tres trampas fatales'], [m('propia'), 'Creer que tu visión manda'], [m('comparte'), 'Creer que la comparte'],
    [m('equivocada'), 'Creer que se equivoca'], [m('realidad'), 'La realidad'], [m('personalidad'), 'No es su personalidad'], [m('percibe'), 'Es cómo ve su situación'],
    [m('pasara'), 'Y qué cree que pasará'], [m('momentos'), 'Momentos, no personas'], [m('positivo'), 'Alguien muy positivo…'], [m('fallo'), '…y falló tu momento'],
    [m('cuatro'), 'Cuatro modos de respuesta'],
  ];

  /* 1 · plataformas y abismo */
  const niebla = 1 - sm(t, m('oculto'), m('oculto') + 1.2);
  const viajeP = sm(t, m('cambie'), m('cambie') + 1.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Nivel de receptividad">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el factor oculto */}
      <Toma t={t} a={0} b={m('trampas')} cy={470}>
        <defs>
          <linearGradient id={`${ID}-abismo`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={isDark ? '#0f172a' : '#334155'} stopOpacity={0.55} /><stop offset="1" stopColor={isDark ? '#020617' : '#0f172a'} stopOpacity={0.9} /></linearGradient>
        </defs>
        <rect x={480} y={650} width={240} height={190} fill={`url(#${ID}-abismo)`} opacity={1 - niebla} />
        {[0, 1].map((k) => <path key={k} d={k ? 'M 720 640 L 1080 640 L 1080 840 L 740 840 Q 728 760 720 640 Z' : 'M 120 640 L 480 640 Q 472 760 460 840 L 120 840 Z'} fill={isDark ? '#3f3f46' : '#e2e8f0'} />)}
        {[0, 1].map((k) => <rect key={k} x={k ? 720 : 120} y={630} width={360} height={16} rx={8} fill={isDark ? '#52525b' : '#cbd5e1'} />)}
        {niebla > 0.01 && <rect x={470} y={lerp(560, 840, 1 - niebla)} width={260} height={280 * niebla} rx={30} fill={c.panel2} opacity={0.95} />}
        <Txt x={300} y={720} textAnchor="middle" fontSize={26} fill={c.texto} opacity={e1(t, m('situacion'))}>Hoy</Txt>
        <Txt x={600} y={760} textAnchor="middle" fontSize={26} fill="#fff" opacity={sm(t, m('oculto') + 0.8, m('oculto') + 1.4)}>Cambio</Txt>
        <Persona id={ID} x={300} y={632} s={0.95} cuerpo={AZUL_M} />
        <Persona id={ID} x={900} y={632} s={0.95} cuerpo={NARANJA} />

        {t >= m('diagnostica') && t < m('oculto') + 0.5 && (
          <g opacity={ventana(t, m('diagnostica'), m('oculto') + 0.5)}>
            <rect x={180} y={230} width={240} height={140} rx={18} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <rect x={196} y={246} width={208} height={108} rx={10} fill={isDark ? '#0f172a' : '#ecfeff'} />
            <polyline points={Array.from({ length: 40 }, (_, k) => { const x = 200 + k * 5.1; const f = ((k / 40 + t * 0.6) % 1) * 40; const pico = Math.abs(f - 20) < 1.5 ? -36 : Math.abs(f - 22) < 1.5 ? 22 : 0; return `${x},${300 + pico + 3 * Math.sin(k + t * 4)}`; }).join(' ')} fill="none" stroke={t >= m('situacion') ? AMBAR : VERDE} strokeWidth={4} strokeLinejoin="round" />
            <path d="M 300 370 L 300 470" stroke={c.apagado} strokeWidth={4} strokeDasharray="6 6" />
          </g>
        )}
        {t >= m('miller') && t < m('oculto') + 0.5 && (
          <g opacity={ventana(t, m('miller'), m('oculto') + 0.5)} transform={`translate(900 262) rotate(${-6 + 2 * Math.sin(t * 1.5)})`}>
            <rect x={-62} y={-80} width={124} height={160} rx={8} fill="#1e3a8a" style={sombra(0.3, 4, 10)} />
            <rect x={-62} y={-80} width={16} height={160} rx={4} fill="#000" opacity={0.25} />
            <rect x={-36} y={-56} width={84} height={10} rx={5} fill="#fff" opacity={0.9} /><rect x={-36} y={-38} width={60} height={8} rx={4} fill="#fff" opacity={0.6} />
            <circle cx={6} cy={20} r={26} fill={AMBAR} />
            <Txt x={0} y={118} textAnchor="middle" fontSize={22} fill={c.texto} transform="rotate(6)">Miller y Heiman</Txt>
          </g>
        )}
        {t >= m('cambie') && (
          <g opacity={e1(t, m('cambie'))}>
            <path d="M 330 470 Q 600 300 870 470" stroke={NARANJA} strokeWidth={4} fill="none" strokeDasharray="10 10" strokeDashoffset={-t * 30} opacity={0.7 * (1 - sm(t, m('ayuda'), m('ayuda') + 0.6))} />
            <Propuesta x={lerp(860, 520, viajeP)} y={lerp(560, 600, viajeP) - 90 * Math.sin(Math.PI * viajeP)} s={0.75} />
          </g>
        )}
        {t >= m('ayuda') && (
          <g opacity={e1(t, m('ayuda'))} transform="translate(900 360)">
            <circle cx={-14} cy={98} r={8} fill={c.panel} style={sombra(c.sombra, 2, 4)} /><circle cx={-6} cy={76} r={12} fill={c.panel} style={sombra(c.sombra, 2, 4)} />
            <ellipse rx={90} ry={66} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <g transform={`translate(0 ${4 * Math.sin(t * 3)})`}>
              <rect x={-30} y={-24} width={60} height={48} rx={6} fill={VERDE} /><rect x={-6} y={-24} width={12} height={48} fill={AMBAR} /><rect x={-34} y={-32} width={68} height={14} rx={5} fill={VERDE} />
              <path d="M 0 -32 Q -22 -54 -14 -34 M 0 -32 Q 22 -54 14 -34" stroke={AMBAR} strokeWidth={6} fill="none" />
            </g>
          </g>
        )}
        {t >= m('amenaza') && (
          <g opacity={e1(t, m('amenaza'))} transform="translate(300 360)">
            <circle cx={14} cy={98} r={8} fill={c.panel} style={sombra(c.sombra, 2, 4)} /><circle cx={6} cy={76} r={12} fill={c.panel} style={sombra(c.sombra, 2, 4)} />
            <ellipse rx={90} ry={66} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <g transform={`scale(${1 + 0.07 * Math.sin(t * 9)})`}>
              <circle cx={0} cy={6} r={28} fill={isDark ? '#e2e8f0' : '#1e293b'} />
              <path d="M 14 -16 Q 26 -34 40 -30" stroke={isDark ? '#e2e8f0' : '#1e293b'} strokeWidth={5} fill="none" />
              <circle cx={42} cy={-31} r={6 + 2 * Math.sin(t * 14)} fill={AMBAR} />
            </g>
          </g>
        )}
        {t >= m('encaja') && (() => {
          const u = sm(t, m('encaja'), m('encaja') + 0.9);
          const dim = sm(t, m('encaja') + 1.4, m('encaja') + 2);
          return (
            <g opacity={e1(t, m('encaja')) * (1 - 0.6 * dim)} transform="translate(600 300)">
              <path d={`M ${-70 - 30 * (1 - u)} -36 h 50 q 0 -18 14 -18 q 14 0 14 18 h 6 v 72 h -84 Z`} fill={AZUL_M} />
              <path d={`M ${14 + 30 * (1 - u)} -36 h 56 v 72 h -56 v -26 q 14 0 14 -14 q 0 -14 -14 -14 Z`} fill={NARANJA} />
              {u >= 1 && <Visto x={0} y={-74} r={18} op={1 - dim} />}
              {dim > 0.3 && <Txt x={0} y={86} textAnchor="middle" fontSize={24} fill={ROJO_M} opacity={dim}>No basta</Txt>}
            </g>
          );
        })()}
      </Toma>

      {/* 2 · tres trampas */}
      <Toma t={t} a={m('trampas')} b={m('realidad')} cy={470}>
        <rect x={60} y={720} width={1080} height={10} rx={5} fill={c.apagado} />
        <Persona id={ID} x={lerp(110, 170, sm(t, m('trampas'), m('trampas') + 1))} y={720} s={0.8} cuerpo={NARANJA} />
        {(['propia', 'comparte', 'equivocada'] as const).map((a, k) => {
          const x = 360 + k * 270;
          const u = sm(t, m(a) + 0.5, m(a) + 0.75);
          const on = t >= m(a);
          const lab = movil ? ['Mi visión', 'La comparte', 'Se equivoca'][k] : ['Tu visión manda', 'Él ve lo mismo', 'Él se equivoca'][k];
          return (
            <g key={a} opacity={e1(t, m('trampas') + 0.3 * k) * (on ? 1 : 0.55)}>
              <Trampa x={x} y={716} u={u} c={c} />
              {u > 0.95 && t < m(a) + 1.1 && [0, 1, 2, 3, 4].map((j) => { const ang = -Math.PI / 2 + (j - 2) * 0.5; const r = lerp(40, 80, sm(t, m(a) + 0.75, m(a) + 1.1)); return <line key={j} x1={x + 0.6 * r * Math.cos(ang)} y1={680 + 0.6 * r * Math.sin(ang)} x2={x + r * Math.cos(ang)} y2={680 + r * Math.sin(ang)} stroke={ROJO_M} strokeWidth={4} strokeLinecap="round" />; })}
              <Txt x={x} y={790} textAnchor="middle" fontSize={24} fill={on ? ROJO_M : c.tenue}>{lab}</Txt>
              {on && (
                <g opacity={e1(t, m(a))} transform={`translate(${x} 470)`}>
                  <rect x={-118} y={-90} width={236} height={180} rx={26} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
                  {k === 0 && (
                    <g transform={`scale(${1 + 0.05 * Math.sin(t * 3)})`}>
                      <circle cx={-38} cy={0} r={32} fill={isDark ? '#1e3a5f' : '#dbeafe'} stroke={NARANJA} strokeWidth={8} />
                      <circle cx={38} cy={0} r={32} fill={isDark ? '#1e3a5f' : '#dbeafe'} stroke={NARANJA} strokeWidth={8} />
                      <path d="M -6 -4 Q 0 -12 6 -4" stroke={NARANJA} strokeWidth={8} fill="none" />
                      <circle cx={-46} cy={-10} r={7} fill="#fff" opacity={0.8} /><circle cx={30} cy={-10} r={7} fill="#fff" opacity={0.8} />
                    </g>
                  )}
                  {k === 1 && (
                    <g>
                      {[-56, 56].map((dx) => <g key={dx} transform={`translate(${dx} 0)`}><ellipse rx={42} ry={32} fill={c.panel2} /><rect x={-16} y={-12} width={32} height={26} rx={4} fill={VERDE} /><rect x={-3} y={-12} width={6} height={26} fill={AMBAR} /></g>)}
                      <Txt x={0} y={12} textAnchor="middle" fontSize={34} fill={c.texto}>=</Txt>
                    </g>
                  )}
                  {k === 2 && (
                    <g>
                      <ellipse rx={56} ry={40} fill={c.panel2} />
                      <path d="M 0 -24 L 24 18 L -24 18 Z" fill={AMBAR} />
                      <g transform={`rotate(-12) scale(${lerp(1.6, 1, sm(t, m(a) + 0.3, m(a) + 0.7))})`} opacity={sm(t, m(a) + 0.3, m(a) + 0.7)}><Cruz x={0} y={0} r={46} /></g>
                    </g>
                  )}
                </g>
              )}
            </g>
          );
        })}
      </Toma>

      {/* 3 · la realidad: la lente del comprador */}
      <Toma t={t} a={m('realidad')} b={m('momentos')} cy={470}>
        <Persona id={ID} x={300} y={790} s={1.15} cuerpo={AZUL_M} />
        {(() => {
          const ojo: [number, number] = [312, 790 - 1.15 * 131];
          return <path d={`M ${ojo[0]} ${ojo[1]} L 640 260 L 640 620 Z`} fill={AZUL_M} opacity={0.08 * e1(t, m('realidad'))} />;
        })()}
        <g opacity={e1(t, m('realidad'))} transform="translate(800 440)">
          <circle r={200} fill={c.panel} style={sombra(c.sombra, 6, 16)} />
          <circle r={184} fill={isDark ? '#0b1220' : '#f8fafc'} />
          <circle r={200} fill="none" stroke={isDark ? '#94a3b8' : '#334155'} strokeWidth={14} />
          {t >= m('personalidad') && t < m('percibe') + 0.4 && (
            <g opacity={ventana(t, m('personalidad'), m('percibe') + 0.4)}>
              <g transform="translate(-60 0)"><circle r={40} fill={AMBAR} /><circle cx={-13} cy={-8} r={5} fill="#7c2d12" /><circle cx={13} cy={-8} r={5} fill="#7c2d12" /><path d="M -16 10 Q 0 24 16 10" stroke="#7c2d12" strokeWidth={5} fill="none" /></g>
              <g transform="translate(60 0)"><path d="M 0 30 C -50 -4 -30 -42 0 -18 C 30 -42 50 -4 0 30 Z" fill={ROSA} /></g>
              <g opacity={sm(t, m('personalidad') + 0.4, m('personalidad') + 0.8)}><line x1={-130} y1={60} x2={130} y2={-60} stroke={ROJO_M} strokeWidth={10} strokeLinecap="round" /></g>
            </g>
          )}
          {t >= m('percibe') && (
            <g opacity={e1(t, m('percibe'))}>
              <rect x={-150} y={-90} width={150} height={150} rx={16} fill={c.panel2} />
              {[0.45, 0.7, 0.35].map((v, k) => <rect key={k} x={-134 + k * 44} y={44 - 110 * v * sm(t, m('percibe') + 0.2 * k, m('percibe') + 0.8 + 0.2 * k)} width={30} height={110 * v * sm(t, m('percibe') + 0.2 * k, m('percibe') + 0.8 + 0.2 * k)} rx={6} fill={[AZUL_M, AMBAR, ROJO_M][k]} />)}
              <Txt x={-75} y={100} textAnchor="middle" fontSize={24} fill={c.texto}>Hoy</Txt>
            </g>
          )}
          {t >= m('pasara') && (() => {
            const u = sm(t, m('pasara'), m('pasara') + 1.2);
            return (
              <g opacity={e1(t, m('pasara'))}>
                <path d={`M 10 -16 L ${lerp(10, 60, u)} -16`} stroke={c.texto} strokeWidth={6} strokeLinecap="round" />
                <path d={`M 60 -16 Q 90 -16 ${lerp(60, 140, u)} ${lerp(-16, -100, u)}`} stroke={VERDE} strokeWidth={6} fill="none" strokeLinecap="round" />
                <path d={`M 60 -16 Q 90 -16 ${lerp(60, 140, u)} ${lerp(-16, 70, u)}`} stroke={ROJO_M} strokeWidth={6} fill="none" strokeLinecap="round" />
                <circle cx={140} cy={-112} r={14} fill={VERDE} opacity={u} /><circle cx={140} cy={82} r={14} fill={ROJO_M} opacity={u} />
                <Txt x={118} y={-6} textAnchor="middle" fontSize={44} fill={AMBAR} opacity={sm(t, m('pasara') + 0.8, m('pasara') + 1.3)}>?</Txt>
              </g>
            );
          })()}
        </g>
      </Toma>

      {/* 4 · momentos, no personas */}
      <Toma t={t} a={m('momentos')} b={m('cuatro')} cy={470}>
        <rect x={140} y={700} width={920} height={10} rx={5} fill={c.apagado} />
        {(['Ayer', 'Hoy', 'Mañana'] as const).map((n, k) => {
          const x = 300 + k * 300;
          const halo = [VERDE, ROJO_M, AZUL_M][k];
          const hoy = k === 1;
          return (
            <g key={n} opacity={e1(t, m('momentos') + 0.3 * k)}>
              <circle cx={x} cy={600} r={90} fill={halo} opacity={0.12 + (hoy && t >= m('fallo') ? 0.08 * (1 + Math.sin(t * 6)) : 0)} />
              <Persona id={ID} x={x} y={696} s={0.72} cuerpo={AZUL_M} />
              <Txt x={x} y={760} textAnchor="middle" fontSize={26} fill={hoy ? c.texto : c.tenue}>{n}</Txt>
              {t >= m('positivo') && (
                <g opacity={e1(t, m('positivo') + 0.2 * k)} transform={`translate(${x + 54} 460) rotate(${t * 20})`}>
                  {Array.from({ length: 8 }, (_, j) => <rect key={j} x={-3} y={-30} width={6} height={12} rx={3} fill={AMBAR} transform={`rotate(${j * 45})`} />)}
                  <circle r={15} fill={AMBAR} />
                </g>
              )}
            </g>
          );
        })}
        {t >= m('positivo') + 1 && (
          <g opacity={e1(t, m('positivo') + 1)}>
            <Nube x={600} y={360} s={0.55} t={t} color={ROJO_M} />
            <Propuesta x={600} y={370} s={0.6} sello={ROJO_M} />
          </g>
        )}
        {t >= m('fallo') && (
          <g opacity={e1(t, m('fallo'))}>
            <Reloj x={600} y={230} r={44} t={t * 2} aro={ROJO_M} />
            <path d="M 660 230 Q 780 190 880 300" stroke={VERDE} strokeWidth={5} fill="none" strokeDasharray="10 9" strokeDashoffset={-t * 30} />
            <Visto x={900} y={330} r={22} op={sm(t, m('fallo') + 0.8, m('fallo') + 1.2)} />
          </g>
        )}
      </Toma>

      {/* 5 · los cuatro modos */}
      <Toma t={t} a={m('cuatro')} b={fin + 1} cy={470}>
        {MODOS.map((md, k) => {
          const col = k % 2, fila = Math.floor(k / 2);
          const x = 110 + col * 530, y = 200 + fila * 270;
          const t0 = k === 0 ? m('crecimiento') - 0.2 : k === 3 ? m('confianza') : m('crecimiento') + 0.55 * k;
          const op = e1(t, Math.min(t0, m('cuatro') + 0.3 * k));
          const on = t >= t0;
          return (
            <g key={k} opacity={op * (on ? 1 : 0.5)} transform={`translate(0 ${18 * (1 - op)})`}>
              <rect x={x} y={y} width={450} height={230} rx={28} fill={c.panel} style={sombra(c.sombra, 5, 14)} />
              <rect x={x} y={y} width={450} height={230} rx={28} fill={md.col} opacity={0.1} />
              <rect x={x} y={y} width={12} height={230} rx={6} fill={md.col} />
              <g transform={`translate(${x + 80} ${y + 115})`}>
                {k === 0 && [0, 1, 2].map((j) => { const h = (30 + 26 * j) * (0.85 + 0.15 * Math.sin(t * 2 + j)); return <rect key={j} x={-44 + j * 32} y={40 - h} width={24} height={h} rx={5} fill={md.col} />; })}
                {k === 0 && <path d="M -48 -10 L -8 -30 L 46 -64 M 30 -66 L 48 -66 L 46 -48" stroke={NARANJA} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                {k === 1 && <Nube x={0} y={-6} s={0.5} t={t} color={md.col} />}
                {k === 2 && (
                  <g transform={`rotate(${4 * Math.sin(t * 1.6)})`}>
                    <rect x={-60} y={-6} width={120} height={10} rx={5} fill={md.col} />
                    <rect x={-58} y={-30} width={30} height={24} rx={4} fill={md.col} opacity={0.7} /><rect x={28} y={-30} width={30} height={24} rx={4} fill={md.col} opacity={0.7} />
                  </g>
                )}
                {k === 2 && <path d="M -14 50 L 0 4 L 14 50 Z" fill={md.col} />}
                {k === 3 && (
                  <g>
                    <path d={`M -6 -60 L -6 30 L ${44 + 8 * Math.sin(t * 6)} 20 Q 30 -20 -6 -60 Z`} fill={md.col} />
                    <path d="M -50 36 L 50 36 L 36 54 L -38 54 Z" fill={isDark ? '#e2e8f0' : '#334155'} />
                    {[0, 1, 2].map((j) => { const u = (t * 1.2 + j / 3) % 1; return <rect key={j} x={-66 + 50 * u} y={-40 + j * 22} width={30} height={5} rx={2.5} fill={md.col} opacity={Math.sin(Math.PI * u)} />; })}
                  </g>
                )}
              </g>
              {md.n.map((ln, j) => <Txt key={j} x={x + 160} y={y + 124 + (j - (md.n.length - 1) / 2) * 38} fontSize={30} fill={c.texto}>{ln}</Txt>)}
            </g>
          );
        })}
      </Toma>
    </Lienzo>
  );
};
