import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Sobre, Frasco, Moneda3D, Reloj, Balanza, Brazo, resorte, Tarjeta, Conector, Pastilla, Cruz, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La bofetada de Google.
 * Toma 1: una balanza entre lo que cuesta un clic (25 centavos) y lo que deja una visita (2 a 3 dólares); el clic
 * crece hasta 3 dólares, la balanza se da vuelta y las tres tiendas pequeñas bajan la cortina.
 * Toma 2: las tres fases de toda plataforma como una curva de precio con tres zonas; una tienda pequeña avanza sobre
 * ella y, en la fase final, una mano la empuja fuera.
 * Toma 3: tres tipos de tráfico: el pagado es una llave de agua que tú abres (cada gota cuesta), el ganado una planta que
 * crece con el tiempo y el propio un frasco con tu lista; los dos primeros desembocan en el tercero.
 */

const ID = 'br13', P = 'br-bofetada';

const Tienda: React.FC<{ x: number; y: number; s?: number; cierra?: number; color?: string }> = ({ x, y, s = 1, cierra = 0, color = TEAL }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={70} ry={8} fill="#000" opacity={0.14} />
    <rect x={-60} y={-110} width={120} height={110} fill="#f1f5f9" />
    <path d="M -70 -110 H 70 L 60 -140 H -60 Z" fill={color} />
    {[-50, -25, 0, 25, 50].map((sx, k) => <path key={k} d={`M ${sx - 12} -110 q 12 16 24 0`} fill={k % 2 ? '#fff' : color} />)}
    <rect x={-40} y={-80} width={80} height={80} fill="#bfdbfe" />
    <rect x={-40} y={-80} width={80} height={80 * cierra} fill="#64748b" />
    {Array.from({ length: Math.floor(8 * cierra) }, (_, k) => <rect key={k} x={-40} y={-80 + k * 10} width={80} height={2} fill="#475569" />)}
  </g>
);

export const BofetadaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('bofetada'), 'La bofetada de Google'], [m('tres'), 'De 25 centavos a 3 dólares'], [m('fases'), 'Tres fases'],
    [m('expuesto'), 'Tres tipos de tráfico'], [m('tercero'), 'Todo hacia tu lista'],
  ];
  const sube = sm(t, m('tres'), m('tres') + 1.2);
  const inc = lerp(12, -14, sube);
  const quiebra = sm(t, m('quebro'), m('quebro') + 1.2);

  // Toma 2: curva de precio.
  const fase = sm(t, m('adopcion') - 0.3, m('expulsa') + 0.5);
  const curvaY = (x: number) => 620 - 330 * Math.pow((x - 130) / 940, 2.2);
  const xT = lerp(170, 1000, fase);
  const empuje = sm(t, m('expulsa') + 0.3, m('expulsa') + 1.2);

  // Toma 3.
  const valvula = sm(t, m('controlas'), m('controlas') + 0.8);
  const crece = sm(t, m('ganas'), m('ganas') + 3);
  const lista = sm(t, m('posees'), m('posees') + 1.5) * 0.5 + sm(t, m('tercero'), m('tercero') + 2) * 0.4;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La bofetada de Google">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El clic se encarece */}
      <Toma t={t} a={0} b={m('fases')} cy={470}>
        <Balanza x={460} y={760} inc={inc} c={c} brazo={210} alto={300} op={E('centavos', 0.6, -0.5)}
          izq={<g><Moneda3D x={0} y={-28 - 20 * sube} r={22 + 34 * sube} /></g>}
          der={<g>{[0, 1, 2].map((k) => <Moneda3D key={k} x={-30 + k * 30} y={-26 - (k % 2) * 16} r={22} />)}</g>} />
        <Pastilla x={230} y={300} texto={sube > 0.5 ? 'Clic: $3' : 'Clic: 25¢'} fondo={sube > 0.5 ? ROJO_M : VERDE} tam={28} op={E('centavos')} />
        <Pastilla x={690} y={300} texto={movil ? 'Visita: $2–3' : 'Cada visita deja $2–3'} fondo={AZUL_M} tam={28} op={E('dejaba')} />
        {[0, 1, 2].map((k) => (
          <g key={k} opacity={E('quebro', 0.5, -0.8)}>
            <Tienda x={890 + (k % 2) * 140} y={k < 2 ? 520 : 760} s={0.8} cierra={sm(t, m('quebro') + k * 0.3, m('quebro') + k * 0.3 + 0.8)} color={[TEAL, ROSA, AMBAR][k]} />
          </g>
        ))}
        {[0, 1, 2].map((k) => <Cruz key={k} x={890 + (k % 2) * 140 + 50} y={(k < 2 ? 520 : 760) - 130} r={18} op={sm(t, m('quebro') + k * 0.3 + 0.8, m('quebro') + k * 0.3 + 1.1)} />)}
        <Pastilla x={1030} y={820} texto={movil ? 'Quebraron' : 'Muchos pequeños quebraron'} fondo={ROJO_M} tam={22} op={quiebra} />
      </Toma>

      {/* 2 · Tres fases */}
      <Toma t={t} a={m('fases')} b={m('expuesto')} cy={470}>
        <g opacity={E('fases')}>
          {([['adopcion', 'Adopción', VERDE, 130, 440], ['subida', 'Subida', AMBAR, 440, 760], ['expulsa', 'Bofetada', ROJO_M, 760, 1070]] as const).map(([n, txt, col, x0, x1]) => (
            <g key={n} opacity={0.25 + 0.75 * E(n)}>
              <rect x={x0} y={240} width={x1 - x0 - 8} height={400} rx={18} fill={col} opacity={0.12} />
              <Txt x={(x0 + x1) / 2} y={movil ? (n === 'expulsa' ? 610 : 318) : 286} textAnchor="middle" fontSize={28} fill={col} peso={800}>{txt}</Txt>
            </g>
          ))}
          <path d={Array.from({ length: 40 }, (_, k) => { const x = 130 + (k * 940) / 39; return `${k ? 'L' : 'M'} ${x} ${curvaY(x)}`; }).join(' ')} stroke={`url(#${ID}-marcaH)`} strokeWidth={8} fill="none" />
          <Txt x={140} y={680} fontSize={24} fill={c.tenue} peso={800}>Precio del clic →</Txt>
        </g>
        <g transform={`translate(${xT + 260 * empuje} ${curvaY(xT) + 300 * empuje * empuje}) rotate(${50 * empuje})`} opacity={1 - empuje * 0.6}>
          <Tienda x={0} y={0} s={0.55} cierra={empuje} />
        </g>
        {/* La mano de Google baja desde arriba, toma impulso y golpea la tienda fuera de la curva (resortes de Remotion) */}
        {t >= m('expulsa') - 0.4 && (() => {
          // Baja desde arriba casi recta, toma impulso, golpea el techo de la tienda y vuelve a subir.
          const baja = resorte(t, m('expulsa') - 0.4, { rigidez: 70, amortiguacion: 16 });
          const golpe = resorte(t, m('expulsa') + 0.25, { rigidez: 300, amortiguacion: 18 });
          const sube = resorte(t, m('expulsa') + 1.5, { rigidez: 90, amortiguacion: 16 });
          const yC = curvaY(1000);
          const yW = lerp(-120, yC - 150, baja) + 62 * golpe - (yC + 40) * sube;
          const xW = 990 + 24 * golpe;
          // El hombro queda fuera de cuadro: el largo acompaña a la distancia para que el brazo entre casi recto.
          return <Brazo hombro={[xW + 14, -200]} objetivo={[xW, yW]} s={1} mira={1} largo={Math.max(60, yW + 200) / 0.985} grosor={36} manga="#475569" abre={1} mano={0.95} op={1 - sube} />;
        })()}
      </Toma>

      {/* 3 · Tres tipos de tráfico */}
      <Toma t={t} a={m('expuesto')} b={fin + 1} cy={470}>
        <Pastilla x={600} y={200} texto={movil ? 'Una sola fuente: riesgo' : '100 % de una sola fuente: expuesto'} fondo={ROJO_M} tam={26} op={E('expuesto') * (1 - sm(t, m('controlas'), m('controlas') + 0.5))} />
        <Tarjeta x={70} y={240} w={320} h={330} titulo={movil ? 'Pagado' : 'Pagado: lo controlas'} c={c} id={ID} op={E('controlas')} acento={NARANJA} tam={24}>
          {/* Llave de agua en la pared: tú abres la manilla y cada gota es una moneda que pagas */}
          <rect x={20} y={96} width={22} height={90} rx={6} fill="#cbd5e1" />
          <rect x={40} y={124} width={50} height={34} fill="#94a3b8" />
          <rect x={86} y={110} width={92} height={62} rx={18} fill="#94a3b8" />
          <rect x={86} y={110} width={92} height={18} rx={9} fill="#fff" opacity={0.3} />
          <path d="M 170 130 H 214 Q 246 130 246 162 V 196" stroke="#94a3b8" strokeWidth={28} fill="none" />
          <path d="M 170 144 H 212 Q 232 144 232 164 V 196" stroke="#000" strokeWidth={6} fill="none" opacity={0.1} />
          <rect x={228} y={192} width={36} height={14} rx={5} fill="#64748b" />
          <rect x={124} y={88} width={16} height={24} rx={4} fill="#64748b" />
          <g transform={`rotate(${lerp(-8, -72, valvula)} 132 96)`}>
            <rect x={125} y={30} width={14} height={66} rx={7} fill={ROJO_M} />
            <circle cx={132} cy={30} r={13} fill={ROJO_M} />
          </g>
          <circle cx={132} cy={96} r={11} fill="#475569" />
          {valvula > 0.5 && [0, 1, 2].map((k) => { const p = (t * 1.1 + k / 3) % 1; return <Moneda3D key={k} x={246} y={222 + p * 66} r={12} giro={Math.cos(t * 6 + k)} op={Math.min(1, (1 - p) * 2)} />; })}
          <ellipse cx={246} cy={304} rx={46} ry={10} fill={AMBAR} opacity={0.35 * valvula} />
          <Txt x={92} y={260} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800} opacity={movil ? 0 : valvula}>Cada visita</Txt>
          <Txt x={92} y={288} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800} opacity={movil ? 0 : valvula}>cuesta</Txt>
        </Tarjeta>
        <Tarjeta x={440} y={240} w={320} h={330} titulo={movil ? 'Ganado' : 'Ganado: lo ganas'} c={c} id={ID} op={E('ganas')} acento={VERDE} tam={24}>
          <path d="M 110 270 H 210 L 196 320 H 124 Z" fill="#b45309" />
          <rect x={156} y={270 - 160 * crece} width={8} height={160 * crece} fill="#16a34a" />
          {[0.35, 0.6, 0.85].map((h, k) => crece > h - 0.2 ? <ellipse key={k} cx={160 + (k % 2 ? 26 : -26)} cy={270 - 160 * h} rx={26 * sm(crece, h - 0.2, h)} ry={12 * sm(crece, h - 0.2, h)} fill="#22c55e" transform={`rotate(${k % 2 ? -25 : 25} ${160 + (k % 2 ? 26 : -26)} ${270 - 160 * h})`} /> : null)}
          <Reloj x={260} y={110} r={30} t={t} vel={1} aro={VERDE} />
        </Tarjeta>
        <Tarjeta x={810} y={240} w={320} h={330} titulo={movil ? 'Propio' : 'Propio: lo posees'} c={c} id={ID} op={E('posees')} acento={VIOLETA} tam={24}>
          <Frasco x={160} y={300} w={150} h={200} v={0.1 + lista} t={t} c={c} color={VIOLETA} />
          <Sobre x={160} y={200} s={0.5} color={VIOLETA} op={lista > 0.2 ? 1 : 0} />
        </Tarjeta>
        <Conector x1={230} y1={570} x2={900} y2={600} u={E('tercero')} t={t} color={NARANJA} curva={0.22} puntos={5} />
        <Conector x1={600} y1={570} x2={930} y2={590} u={E('tercero')} t={t} color={VERDE} curva={0.25} puntos={4} />
        <Pastilla x={600} y={815} texto={movil ? 'Todo hacia tu lista' : 'Los dos primeros, convertidos en el tercero'} fondo={VIOLETA} tam={26} op={E('tercero', 0.5, 0.8)} />
      </Toma>
    </Lienzo>
  );
};
