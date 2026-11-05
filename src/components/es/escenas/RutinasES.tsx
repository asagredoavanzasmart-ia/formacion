import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Lista, Avion, Libro, Cifra, Mar, Suelo, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Rutinas que piensan por ti.
 * Toma 1 (Phelps): la piscina y el partidor; la secuencia de su rutina que se va marcando; la burbuja con la carrera
 * perfecta («ver el video»); ocho medallas de oro.
 * Toma 2: el 40 % del día en piloto automático (Duke) y el ciclo de Duhigg: señal, rutina, recompensa, con una esfera que
 * lo recorre.
 * Toma 3 (Gawande): el bombardero Modelo 299 que cae por un paso olvidado; la lista de verificación; el B-17 que vuela; la
 * semana temática de Jack Dorsey y una rutina a la vez.
 */

const ID = 'es22', P = 'es-rutinas';

const Medalla: React.FC<{ x: number; y: number; op?: number }> = ({ x, y, op = 1 }) => op < 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <path d="M -14 -60 L 0 -20 L 14 -60" stroke={AZUL_M} strokeWidth={10} fill="none" />
    <circle r={26} fill="#f59e0b" /><circle r={16} fill="#fbbf24" />
  </g>
);

export const RutinasES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('decidirlo'), 'Sin decidirlo cada vez'], [m('phelps'), 'Michael Phelps'], [m('video'), 'Ver el video'], [m('ocho'), 'Ocho medallas de oro'],
    [m('duke'), 'El 40 % por hábito'], [m('duhigg'), 'Señal, rutina, recompensa'], [m('lista'), 'Una lista de verificación'], [m('olvido'), 'Un paso olvidado'],
    [m('b17'), 'El B-17'], [m('dorsey'), 'Un tema por día'], [m('una'), 'Una rutina a la vez'],
  ];
  const RUT: [string, string][] = [['phelps', 'Llega 2 h antes'], ['calentamiento', 'Calentamiento preciso'], ['calentamiento', 'Audífonos'], ['izquierdo', 'Sube por la izquierda']];
  const NOD: [string, number, string][] = [['Señal', -90, AZUL_M], ['Rutina', 30, NARANJA], ['Recompensa', 150, VERDE]];
  const p = (a: number): [number, number] => [800 + 190 * Math.cos((a * Math.PI) / 180), 480 + 190 * Math.sin((a * Math.PI) / 180)];
  const cae = sm(t, m('olvido'), m('olvido') + 1.8);
  const vuela = sm(t, m('b17'), m('b17') + 2);
  const DIAS: [string, string][] = [['Lunes', 'Gestión'], ['Martes', 'Producto'], ['Miércoles', 'Marketing'], ['Jueves', 'Socios'], ['Viernes', 'Cultura']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Rutinas que piensan por ti">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Phelps */}
      <Toma t={t} a={0} b={m('duke')} cy={480}>
        <Mar x={0} y={640} w={1200} h={220} t={t} color={isDark ? '#0e7490' : '#67e8f9'} oscuro={isDark ? '#155e75' : '#22d3ee'} op={e1(t, m('phelps'))} />
        {[0, 1, 2].map((k) => <rect key={k} x={0} y={690 + k * 50} width={1200} height={6} fill="#fef08a" opacity={0.7 * e1(t, m('phelps'))} />)}
        <g opacity={e1(t, m('phelps'))}>
          <path d="M 180 640 L 200 560 H 330 L 350 640 Z" fill="#e2e8f0" />
          <Txt x={265} y={612} textAnchor="middle" fontSize={30} fill="#334155">4</Txt>
          <Persona id={ID} x={265} y={560} s={1} cuerpo="#1e3a8a" pelo="#1f2937" />
          <path d="M 228 412 Q 265 372 302 412" stroke="#111827" strokeWidth={8} fill="none" /><circle cx={230} cy={420} r={11} fill="#111827" /><circle cx={300} cy={420} r={11} fill="#111827" />
        </g>
        {ventana(t, m('phelps'), m('ocho')) > 0.01 && RUT.map(([n, r], k) => <g key={r} opacity={ventana(t, m('phelps'), m('ocho')) * e1(t, m(n) + (k === 2 ? 1.2 : 0))}><Letrero x={820} y={200 + k * 80} texto={r} fondo={[AZUL_M, VIOLETA, ROSA, VERDE][k]} id={ID} tam={26} /></g>)}
        {t >= m('video') && t < m('ocho') + 0.5 && (
          <g opacity={ventana(t, m('video'), m('ocho') + 0.5)}>
            <circle cx={300} cy={360} r={10} fill={c.panel} /><circle cx={330} cy={330} r={16} fill={c.panel} />
            <ellipse cx={470} cy={270} rx={170} ry={80} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.15))' }} />
            <rect x={350} y={240} width={240} height={60} rx={8} fill="#22d3ee" />
            <circle cx={lerp(370, 570, (t * 0.4) % 1)} cy={270} r={12} fill="#1e3a8a" />
          </g>
        )}
        {t >= m('ocho') && Array.from({ length: 8 }, (_, k) => <Medalla key={k} x={620 + (k % 4) * 120} y={290 + Math.floor(k / 4) * 150} op={e1(t, m('ocho') + 0.12 * k)} />)}
        {!movil && t >= m('video') && <Txt f="a" x={460} y={200} textAnchor="middle" fontSize={22} fill={c.tenue}>Su entrenador, Bob Bowman</Txt>}
      </Toma>

      {/* 2 · Duke y Duhigg */}
      <Toma t={t} a={m('duke')} b={m('lista')} cy={480}>
        <g opacity={e1(t, m('duke'))} transform="translate(300 480)">
          <circle r={170} fill={c.apagado} />
          <path d={`M 0 0 L 0 -170 A 170 170 0 0 1 ${170 * Math.sin(2 * Math.PI * 0.4 * sm(t, m('cuarenta'), m('cuarenta') + 1))} ${-170 * Math.cos(2 * Math.PI * 0.4 * sm(t, m('cuarenta'), m('cuarenta') + 1))} Z`} fill={VIOLETA} />
          <Cifra x={0} y={250} valor={40} u={sm(t, m('cuarenta'), m('cuarenta') + 1)} pre="≈ " suf=" %" tam={60} color={VIOLETA} />
          <Txt x={0} y={300} textAnchor="middle" fontSize={24} fill={c.texto}>de lo que hacemos, por hábito</Txt>
        </g>
        {t >= m('duhigg') && (
          <g opacity={e1(t, m('duhigg'))}>
            <circle cx={800} cy={480} r={190} fill="none" stroke={c.apagado} strokeWidth={14} />
            <circle cx={p((t - m('duhigg')) * 70 - 90)[0]} cy={p((t - m('duhigg')) * 70 - 90)[1]} r={14} fill={NARANJA} />
            {NOD.map(([n, a, col], k) => { const [x, y] = p(a); return <g key={n} opacity={e1(t, m('senal') + 0.5 * k)}><circle cx={x} cy={y} r={64} fill={col} /><Txt x={x} y={y + 10} textAnchor="middle" fontSize={k === 2 ? 22 : 26} fill="#fff">{n}</Txt></g>; })}
          </g>
        )}
      </Toma>

      {/* 3 · la lista de verificación y Dorsey */}
      <Toma t={t} a={m('lista')} b={fin + 1} cy={480}>
        {ventana(t, m('lista') - 0.1, m('dorsey')) > 0.01 && (
          <g opacity={ventana(t, m('lista') - 0.1, m('dorsey'))}>
            <Suelo y={760} isDark={isDark} x0={80} x1={1120} />
            {t < m('b17') && <g opacity={1 - 0.5 * cae}><Avion x={lerp(420, 640, cae)} y={lerp(320, 600, cae)} s={0.9} rot={cae * 24} cola={GRIS} /></g>}
            {t >= m('olvido') && t < m('b17') && <Letrero x={420} y={200} texto="Un paso olvidado" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('olvido'))} />}
            <Lista x={980} y={460} s={1} n={5} hechos={Math.min(5, Math.floor(Math.max(0, t - m('olvido') - 1) * 2))} c={c} titulo="Antes de despegar" op={e1(t, m('olvido') + 1)} />
            {t >= m('b17') && <Avion x={lerp(200, 640, vuela)} y={lerp(560, 300, vuela)} s={0.9} rot={-10 * (1 - vuela)} cola={VERDE} />}
            {t >= m('b17') && <Letrero x={420} y={200} texto="B-17: millones de kilómetros" fondo={VERDE} id={ID} tam={28} op={e1(t, m('b17') + 0.6)} />}
            {t >= m('gawande') && <g opacity={e1(t, m('gawande'))}><Libro x={420} y={760} color={AZUL_M} titulo="Checklist" autor="Atul Gawande" s={0.5} c={c} /></g>}
            {!movil && <Txt f="a" x={420} y={150} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('boeing'))}>Modelo 299 de Boeing, 1935</Txt>}
          </g>
        )}
        {t >= m('dorsey') && (
          <g opacity={e1(t, m('dorsey'))}>
            {DIAS.map(([d, tema], k) => {
              const una = t >= m('una') && k === 0;
              return (
                <g key={d} opacity={t >= m('una') && !una ? 0.45 : 1}>
                  <rect x={110 + k * 200} y={300} width={180} height={300} rx={22} fill={[AZUL_M, NARANJA, ROSA, VIOLETA, VERDE][k]} transform={una ? `translate(0 ${-10 * Math.abs(Math.sin(t * 3))})` : undefined} />
                  <Txt x={200 + k * 200} y={360} textAnchor="middle" fontSize={k === 2 ? 24 : 28} fill="#fff">{d}</Txt>
                  <Txt x={200 + k * 200} y={470} textAnchor="middle" fontSize={24} fill="#fff">{tema}</Txt>
                </g>
              );
            })}
            <Letrero x={600} y={700} texto={t >= m('una') ? 'Una rutina a la vez' : 'Jack Dorsey: un tema por día'} id={ID} tam={30} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
