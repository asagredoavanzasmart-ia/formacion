import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Bandera, Caja, Termometro, Embudo, Cifra, Nube, Visto, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Amortiguar lo inesperado.
 * Toma 1 (falacia de la planificación): tres barras de días: 27,4 (si todo sale bien), 48,6 (si todo sale mal) y 55,5
 * (lo que tardaron), que sobrepasa al peor caso; solo el 30 % cumplió; la reunión de una hora con su colchón de media hora.
 * Toma 2 (Polo Sur): la planicie nevada con dos trineos: Amundsen con 4 termómetros, 3 toneladas y 20 banderas a lo
 * largo de la ruta, frente a Scott con 1, 1 y 1; el ritmo fijo de 24 km diarios; Amundsen vuelve.
 * Toma 3: el embudo de Collins y Hansen (20.400 → 7); el paraguas: prepararse mejor; el rango de ritmo, con mínimo y máximo.
 */

const ID = 'es17', P = 'es-amortiguar';

const Trineo: React.FC<{ x: number; y: number; cajas: number; termo: number; color: string }> = ({ x, y, cajas, termo, color }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -110 0 H 100 Q 130 0 130 -20" stroke="#64748b" strokeWidth={8} fill="none" strokeLinecap="round" />
    <rect x={-100} y={-24} width={190} height={16} rx={6} fill="#a16b3f" />
    {Array.from({ length: cajas }, (_, k) => <rect key={k} x={-90 + k * 58} y={-80} width={52} height={56} rx={6} fill={color} />)}
    {Array.from({ length: termo }, (_, k) => <g key={k} transform={`translate(${-80 + k * 22} -110)`}><rect x={-4} y={-30} width={8} height={30} rx={4} fill="#e5e7eb" /><circle r={7} fill={ROJO_M} /></g>)}
  </g>
);

export const AmortiguarES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('inesperado'), 'Lo inesperado va a ocurrir'], [m('falacia'), 'La falacia de la planificación'], [m('tardaron'), 'Más que el peor caso'], [m('treinta'), 'Solo el 30 % cumplió'],
    [m('colchon'), 'Un colchón del 50 %'], [m('polo'), 'La carrera al Polo Sur'], [m('ritmo'), '24 km cada día'], [m('volvio'), 'Amundsen volvió'],
    [m('collins'), 'Collins y Hansen'], [m('preparaban'), 'Prepararse mejor'], [m('rango'), 'Un rango de ritmo'],
  ];
  const DIAS: [string, number, string, string][] = [['bien', 27.4, 'Si todo sale bien', VERDE], ['mal', 48.6, 'Si todo sale mal', '#f59e0b'], ['tardaron', 55.5, 'Lo que tardaron', ROJO_M]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Amortiguar lo inesperado">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la falacia y el colchón */}
      <Toma t={t} a={0} b={m('polo')} cy={470}>
        {ventana(t, 0, m('colchon')) > 0.01 && (
          <g opacity={ventana(t, 0, m('colchon'))}>
            <Txt f="a" x={600} y={190} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('estudiantes'))}>Días para terminar la tesis · 37 estudiantes</Txt>
            {DIAS.map(([n, v, r, col], k) => (
              <g key={n} opacity={e1(t, m(n))}>
                <Txt x={150} y={290 + k * 150} fontSize={28} fill={c.texto}>{r}</Txt>
                <rect x={150} y={310 + k * 150} width={900 * (v / 60) * sm(t, m(n), m(n) + 1.2)} height={60} rx={14} fill={col} />
                <Cifra x={170 + 900 * (v / 60) * sm(t, m(n), m(n) + 1.2)} y={358 + k * 150} valor={v} dec={1} u={sm(t, m(n), m(n) + 1.2)} tam={40} color={c.texto} ancla="start" />
              </g>
            ))}
            {t >= m('mal') && <rect x={150 + 900 * (48.6 / 60)} y={280} width={6} height={460} fill="#f59e0b" opacity={0.7} />}
            {t >= m('treinta') && <Letrero x={600} y={770} texto="Solo el 30 % terminó en su plazo" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('treinta'))} />}
          </g>
        )}
        {t >= m('colchon') && (
          <g opacity={e1(t, m('colchon'))}>
            <rect x={200} y={360} width={800} height={50} rx={10} fill={c.apagado} />
            <rect x={200} y={300} width={500} height={170} rx={20} fill={AZUL_M} />
            <Txt x={450} y={400} textAnchor="middle" fontSize={34} fill="#fff">Reunión · 1 hora</Txt>
            <rect x={710} y={300} width={250 * sm(t, m('colchon') + 0.6, m('colchon') + 1.4)} height={170} rx={20} fill={VERDE} opacity={0.85} />
            <Txt x={835} y={400} textAnchor="middle" fontSize={30} fill="#fff" opacity={e1(t, m('colchon') + 1.2)}>+ 30 min</Txt>
            <Letrero x={600} y={600} texto="Colchón del 50 % en cada estimación" id={ID} tam={30} />
          </g>
        )}
      </Toma>

      {/* 2 · Amundsen y Scott */}
      <Toma t={t} a={m('polo')} b={m('collins')} cy={480}>
        <rect x={0} y={520} width={1200} height={340} fill={isDark ? '#cbd5e1' : '#f1f5f9'} opacity={e1(t, m('polo'))} />
        <path d="M 0 520 L 200 380 L 360 520 L 560 330 L 760 520 L 980 400 L 1200 520 Z" fill={isDark ? '#94a3b8' : '#e2e8f0'} opacity={e1(t, m('polo'))} />
        <Bandera x={1110} y={560} alto={150} color={ROJO_M} t={t} op={e1(t, m('polo'))} />
        <Txt x={1110} y={600} textAnchor="middle" fontSize={24} fill="#334155" opacity={e1(t, m('polo'))}>Polo Sur</Txt>
        {/* Amundsen, carril de arriba */}
        <g opacity={e1(t, m('amundsen'))}>
          {Array.from({ length: 20 }, (_, k) => <Bandera key={k} x={120 + k * 48} y={640} alto={50} color={NARANJA} t={t + k} op={e1(t, m('amundsen') + 1 + 0.06 * k)} />)}
          <Trineo x={220 + 680 * sm(t, m('ritmo'), m('volvio') - 0.3) - 680 * sm(t, m('volvio'), m('volvio') + 2.4)} y={660} cajas={3} termo={4} color={NARANJA} />
          <Txt x={160} y={560} fontSize={28} fill="#334155">Amundsen</Txt>
          {t >= m('volvio') && <Visto x={330} y={560} r={26} />}
        </g>
        {/* Scott, carril de abajo */}
        <g opacity={e1(t, m('scott')) * (t >= m('volvio') ? 1 - 0.6 * sm(t, m('volvio'), m('volvio') + 1) : 1)}>
          <Bandera x={760} y={790} alto={50} color={GRIS} t={t} />
          <Trineo x={lerp(220, 640, sm(t, m('scott'), m('volvio')))} y={800} cajas={1} termo={1} color={GRIS} />
          <Txt x={160} y={740} fontSize={28} fill="#334155">Scott</Txt>
        </g>
        {t >= m('ritmo') && <Letrero x={600} y={260} texto="24 km diarios: ni menos con mal tiempo, ni más con bueno" id={ID} tam={24} op={e1(t, m('ritmo'))} />}
        {!movil && t >= m('amundsen') && <Txt f="a" x={600} y={190} textAnchor="middle" fontSize={22} fill={c.tenue}>4 termómetros · 3 toneladas · 20 banderas, frente a 1 · 1 · 1</Txt>}
      </Toma>

      {/* 3 · Collins y Hansen, prepararse, rango de ritmo */}
      <Toma t={t} a={m('collins')} b={fin + 1} cy={470}>
        {ventana(t, m('collins') - 0.1, m('rango')) > 0.01 && (
          <g opacity={ventana(t, m('collins') - 0.1, m('rango'))}>
            <Embudo x={340} y={240} w={420} franjas={[{ n: '20.400 empresas', color: GRIS }, { n: '', color: '#94a3b8' }, { n: '7', color: NARANJA }]} alto={110} tam={30} op={e1(t, m('collins'))} />
            {t >= m('preparaban') && (
              <g opacity={e1(t, m('preparaban'))}>
                <Nube x={880} y={260} s={1} t={t} />
                {Array.from({ length: 8 }, (_, k) => { const u = ((t * 1.4) + k / 8) % 1; return <rect key={k} x={800 + (k % 4) * 50} y={lerp(300, 400, u)} width={4} height={20} rx={2} fill="#38bdf8" opacity={u < 0.85 ? 1 : 0} />; })}
                <path d="M 760 530 Q 880 410 1000 530 Z" fill={NARANJA} />
                <rect x={877} y={530} width={6} height={110} fill="#475569" />
                <Persona id={ID} x={880} y={760} s={0.9} cuerpo={AZUL_M} />
                <Txt x={880} y={800} textAnchor="middle" fontSize={26} fill={c.texto}>Se preparaban mejor</Txt>
              </g>
            )}
          </g>
        )}
        {t >= m('rango') && (
          <g opacity={e1(t, m('rango'))}>
            <rect x={160} y={420} width={880} height={60} rx={30} fill={c.apagado} />
            <rect x={400} y={420} width={400} height={60} rx={30} fill={VERDE} />
            <circle cx={600 + 160 * Math.sin(t * 1.5)} cy={450} r={34} fill={NARANJA} />
            <Txt x={400} y={540} textAnchor="middle" fontSize={30} fill={c.texto}>Mínimo</Txt>
            <Txt x={800} y={540} textAnchor="middle" fontSize={30} fill={c.texto}>Máximo</Txt>
            <Letrero x={600} y={680} texto="Un esfuerzo sostenible" id={ID} tam={30} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};

