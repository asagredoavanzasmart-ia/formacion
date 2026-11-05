import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Libro, Suelo, Lupa, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Portada: menos, pero mejor.
 * Toma 1: Dieter Rams; plano cercano de la grabadora dentro de un mueble de madera; las tablas se van y queda la tapa
 * transparente; la industria la copia (tres grabadoras iguales al fondo).
 * Toma 2: los tres libros; una maraña (la complejidad) que se endereza en una línea.
 * Toma 3: el ciclo de tres estaciones (explorar, eliminar, ejecutar) con una esfera que lo recorre.
 */

const ID = 'es00', P = 'es-portada';

const Grabadora: React.FC<{ x: number; y: number; s?: number; mueble: number; t: number; op?: number }> = ({ x, y, s = 1, mueble, t, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <ellipse cx={0} cy={6} rx={260} ry={18} fill="#000" opacity={0.16} />
    <rect x={-230} y={-120} width={460} height={120} rx={14} fill="#e5e7eb" />
    <rect x={-230} y={-120} width={460} height={18} rx={9} fill="#cbd5e1" />
    <circle cx={-60} cy={-62} r={70} fill="#1f2937" />
    <circle cx={-60} cy={-62} r={70} fill="none" stroke="#374151" strokeWidth={6} strokeDasharray="4 10" transform={`rotate(${t * 120} -60 -62)`} />
    <circle cx={-60} cy={-62} r={16} fill={NARANJA} />
    <g transform={`rotate(${-18 + 4 * Math.sin(t)} 120 -96)`}><rect x={40} y={-100} width={84} height={8} rx={4} fill="#94a3b8" /><circle cx={124} cy={-96} r={12} fill="#64748b" /></g>
    {[150, 182].map((bx) => <circle key={bx} cx={bx} cy={-30} r={10} fill="#64748b" />)}
    <path d="M -236 -124 L -216 -190 H 216 L 236 -124 Z" fill="#bfdbfe" opacity={0.35} />
    {mueble > 0.01 && (
      <g opacity={mueble}>
        <rect x={-250 - (1 - mueble) * 300} y={-140} width={250} height={220} rx={10} fill="#8b5a2b" />
        <rect x={0 + (1 - mueble) * 300} y={-140} width={250} height={220} rx={10} fill="#a16b3f" />
        <rect x={-250} y={-176 - (1 - mueble) * 200} width={500} height={40} rx={10} fill="#7a4a22" />
        {[-190, -110, 60, 140].map((kx) => <rect key={kx} x={kx} y={-100} width={50} height={130} rx={6} fill="#000" opacity={0.12} />)}
      </g>
    )}
  </g>
);

export const PortadaES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('equipos'), 'Hacer menos, y mejor'], [m('grabadora'), 'La grabadora de Braun'], [m('quito'), 'Quitar lo innecesario'], [m('industria'), 'La copió toda la industria'],
    [m('mckeown'), 'Tres libros, una idea'], [m('complejidad'), 'Lo complejo no es inteligente'], [m('ciclo'), 'Un ciclo de tres movimientos'],
  ];
  const mueble = 1 - sm(t, m('quito'), m('quito') + 1.4);
  const recta = sm(t, m('complejidad'), m('complejidad') + 1.6);
  const EST: [string, string, number, string][] = [['explorar', 'Explorar', -90, AZUL_M], ['eliminar', 'Eliminar', 30, ROSA], ['ejecutar', 'Ejecutar', 150, VERDE]];
  const pos = (a: number, r = 230): [number, number] => [600 + r * Math.cos((a * Math.PI) / 180), 470 + r * Math.sin((a * Math.PI) / 180)];
  const libros: [string, string, string, string][] = [['mckeown', 'Esencialismo', 'McKeown', NARANJA], ['sinesfuerzo', 'Sin esfuerzo', 'McKeown', VIOLETA], ['trout', 'Lo simple', 'Trout y Rivkin', AZUL_M]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Esencialismo: menos, pero mejor">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1a · Dieter Rams y su frase */}
      <Toma t={t} a={0} b={m('grabadora')} cy={520}>
        <Suelo y={700} isDark={isDark} x0={200} x1={1000} />
        <Persona id={ID} x={420} y={700} s={1.3} cuerpo="#334155" pelo="#9ca3af" />
        <g opacity={e1(t, m('rams'))}><Letrero x={420} y={760} texto="Dieter Rams · Braun" fondo={GRIS} id={ID} tam={28} /></g>
        {t >= m('palabras') && (
          <g opacity={e1(t, m('palabras'))}>
            <Txt x={800} y={380} textAnchor="middle" fontSize={64} fill={NARANJA}>Weniger</Txt>
            <Txt x={800} y={460} textAnchor="middle" fontSize={64} fill={ROSA}>aber besser</Txt>
            <Txt f="a" x={800} y={530} textAnchor="middle" fontSize={34} fill={c.texto}>Menos, pero mejor</Txt>
          </g>
        )}
        {t < m('palabras') && <Txt f="a" x={800} y={430} textAnchor="middle" fontSize={40} fill={c.texto} opacity={e1(t, m('menos'))}>Hacer menos, y mejor</Txt>}
      </Toma>

      {/* 1b · plano cercano: la grabadora sale de su mueble */}
      <Toma t={t} a={m('grabadora')} b={m('mckeown')} cy={520} zi={1.15}>
        <Grabadora x={600} y={620} s={1.25} mueble={mueble} t={t} op={ventana(t, m('grabadora'), m('industria') + 0.4)} />
        {t >= m('industria') && [-1, 0, 1].map((k) => <Grabadora key={k} x={600 + k * 360} y={520 + Math.abs(k) * -10} s={0.6} mueble={0} t={t + k} op={e1(t, m('industria') + 0.3 * (k + 1))} />)}
        <Letrero x={600} y={790} texto={t >= m('industria') ? 'Copiada por toda la industria' : t >= m('quiebra') ? 'Temieron la quiebra' : t >= m('quito') ? 'Solo una tapa transparente' : 'Escondida en un mueble'} fondo={t >= m('quito') && t < m('quiebra') ? undefined : GRIS} id={ID} tam={30} />
      </Toma>

      {/* 2 · tres libros y la maraña que se endereza */}
      <Toma t={t} a={m('mckeown')} b={m('ciclo')} cy={480}>
        {libros.map(([n, ti, au, col], k) => <Libro key={n} x={300 + k * 300} y={t >= m('complejidad') ? 520 : 640} color={col} titulo={ti} autor={au} op={e1(t, m(n))} s={t >= m('complejidad') ? 0.75 : 1} c={c} />)}
        {t >= m('complejidad') && (
          <g opacity={e1(t, m('complejidad'))}>
            <path d={Array.from({ length: 40 }, (_, k) => { const x = 200 + k * 20; const y = 680 + (1 - recta) * (60 * Math.sin(k * 1.7) + 40 * Math.cos(k * 0.9 + t)); return `${k ? 'L' : 'M'} ${x} ${y}`; }).join(' ')} stroke={recta > 0.9 ? VERDE : '#94a3b8'} strokeWidth={8} fill="none" strokeLinejoin="round" strokeLinecap="round" />
            <Letrero x={600} y={790} texto={recta > 0.5 ? 'Claridad' : 'Complejidad'} fondo={recta > 0.5 ? VERDE : GRIS} id={ID} tam={30} />
          </g>
        )}
      </Toma>

      {/* 3 · el ciclo */}
      <Toma t={t} a={m('ciclo')} b={fin + 1} cy={470}>
        <circle cx={600} cy={470} r={230} fill="none" stroke={c.apagado} strokeWidth={18} opacity={e1(t, m('ciclo'))} />
        {t >= m('ciclo') && <circle cx={pos(t * 50)[0]} cy={pos(t * 50)[1]} r={16} fill={NARANJA} />}
        {EST.map(([n, nom, a, col]) => {
          const [x, y] = pos(a);
          const on = t >= m(n);
          return (
            <g key={n} opacity={on ? e1(t, m(n)) : 0}>
              <circle cx={x} cy={y} r={78} fill={col} />
              {n === 'explorar' && <Lupa x={x} y={y} r={30} c={c} id={ID} clip={`${ID}-lupa`} rot={30} />}
              {n === 'eliminar' && <g transform={`translate(${x} ${y})`}><path d="M -30 -30 L 30 30 M 30 -30 L -30 30" stroke="#fff" strokeWidth={12} strokeLinecap="round" /></g>}
              {n === 'ejecutar' && <g transform={`translate(${x} ${y})`}><path d="M -26 -30 L 30 0 L -26 30 Z" fill="#fff" /></g>}
              <Txt x={x} y={y + 128} textAnchor="middle" fontSize={36} fill={c.texto}>{nom}</Txt>
            </g>
          );
        })}
        {!movil && <Txt f="a" x={600} y={482} textAnchor="middle" fontSize={30} fill={c.tenue} opacity={e1(t, m('ciclo'))}>se repite</Txt>}
      </Toma>
    </Lienzo>
  );
};

