import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Interruptor, Hoja, Visto, Suelo, Flujo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Recibir: tres disparadores. Toma 1: un comentario llega a quien recibe y pasa por su propia llave de paso (la
 * habilidad que controlas): entender primero, decidir después; luego cinco beneficios que suben como barras.
 * Toma 2: tres interruptores (verdad, relación, identidad) que se encienden con su frase. Toma 3: el ejecutivo y sus
 * propuestas largas: «no es cierto», la jefa de las cuarenta láminas, la noche dándole vueltas, y los tres encendidos
 * a la vez. Toma 4: nombrarlos: una pausa separa la reacción de la respuesta.
 */

const ID = 'fb15', P = 'fb-recibir';

const SW = [['verdad', 'Verdad', ROJO_M, '«Eso no es así»'], ['relacion', 'Relación', VIOLETA, '«¿Y quién eres tú?»'], ['identidad', 'Identidad', AZUL_M, '«Entonces no sirvo»']] as const;

export const RecibirFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('lado'), 'Ahora, recibir'], [m('controlas'), 'La que más controlas'], [m('aceptar'), 'Entender antes de decidir'], [m('vale'), 'Vale la pena'],
    [m('disparadores'), 'Tres disparadores'], [m('ejecutivo'), 'Propuestas demasiado largas'], [m('vez'), 'Los tres a la vez'], [m('nombrarlos'), 'Nombrarlos'], [m('separa'), 'Reacción ≠ respuesta'],
  ];
  const BEN = ['Se adapta', 'Creatividad', 'Satisfacción', 'Rota menos', 'Mejor nota'];
  const llave = sm(t, m('controlas'), m('controlas') + 1);
  const on3 = (k: number) => {
    const n = SW[k][0];
    const enT2 = sm(t, m(n), m(n) + 0.5);
    const caso = [m('nocierto'), m('laminas'), m('noche')][k];
    return t < m('ejecutivo') ? enT2 : sm(t, caso, caso + 0.5);
  };

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Recibir: tres disparadores">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · la habilidad que controlas */}
      <TomaFB t={t} a={0} b={m('disparadores')} cy={480}>
        {vent(t, -1, m('vale')) > 0.01 && (
          <g opacity={vent(t, -1, m('vale'))}>
            <Suelo y={720} isDark={isDark} x0={120} x1={1080} />
            <Persona id={ID} x={900} y={720} s={1.05} cuerpo={ROSA} />
            <Txt x={900} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Quien recibe</Txt>
            <Flujo x1={160} y1={460} x2={560} y2={460} t={t} n={4} arco={30} color={NARANJA} />
            {t >= m('controlas') && (
              <g opacity={e1(t, m('controlas'))}>
                <rect x={560} y={430} width={120} height={60} rx={14} fill={GRIS} />
                <g transform={`rotate(${90 * llave} 620 400)`}><rect x={570} y={392} width={100} height={16} rx={8} fill={NARANJA} /></g>
                <circle cx={620} cy={400} r={14} fill={c.texto} />
                <Txt x={620} y={540} textAnchor="middle" fontSize={28} fill={c.texto}>Tú decides</Txt>
              </g>
            )}
            {t >= m('aceptar') && (
              <g opacity={e1(t, m('aceptar'))}>
                <Letrero x={360} y={300} texto="1. Entender" fondo={AZUL_M} id={ID} tam={30} />
                <Letrero x={360} y={380} texto="2. Decidir" fondo={VERDE} id={ID} tam={30} op={sm(t, m('aceptar') + 1, m('aceptar') + 1.5)} />
              </g>
            )}
          </g>
        )}
        {t >= m('vale') && BEN.map((b, k) => {
          const t0 = k < 4 ? m('vale') + 0.6 + k * 0.7 : m('criticas');
          const h = [180, 220, 260, 300, 380][k] * sm(t, t0, t0 + 0.8);
          const x = 160 + k * 220;
          return (
            <g key={k} opacity={e1(t, t0)}>
              <rect x={x - 60} y={640 - h} width={120} height={h} rx={14} fill={[AZUL_M, VIOLETA, ROSA, VERDE, NARANJA][k]} />
              <Txt x={x} y={690 + (k % 2) * 48} textAnchor="middle" fontSize={28} fill={c.texto}>{b}</Txt>
            </g>
          );
        })}
        {t >= m('criticas') && !movil && <Txt f="a" x={1000} y={220} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('criticas') + 0.5)}>quienes piden críticas</Txt>}
      </TomaFB>

      {/* 2 · tres interruptores */}
      <TomaFB t={t} a={m('disparadores')} b={m('ejecutivo')} cy={470}>
        {SW.map(([n, nom, col, frase], k) => {
          const x = 260 + k * 340, o = e1(t, k === 0 ? Math.min(m('disparadores') + 0.4, m(n)) : m(n));
          return o > 0.01 ? (
            <g key={n} opacity={o}>
              <Interruptor x={x} y={380} on={on3(k)} color={col} texto={nom} c={c} tam={32} />
              <Txt x={x} y={k === 1 ? 650 : 600} textAnchor="middle" fontSize={28} fill={col} opacity={sm(t, m(n) + 0.4, m(n) + 1)}>{frase}</Txt>
            </g>
          ) : null;
        })}
        {!movil && <Txt f="a" x={600} y={740} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('disparadores'))}>Reacciones automáticas que nos cierran</Txt>}
      </TomaFB>

      {/* 3 · el ejecutivo */}
      <TomaFB t={t} a={m('ejecutivo')} b={m('nombrarlos')} cy={480}>
        <Suelo y={720} isDark={isDark} x0={80} x1={900} />
        <Persona id={ID} x={260} y={720} s={1.05} cuerpo={NARANJA} ojos={1 - 0.5 * sm(t, m('noche'), m('noche') + 1)} />
        <Persona id={ID} x={640} y={720} s={1.05} cuerpo={VIOLETA} />
        <Txt x={260} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Ejecutivo</Txt>
        <Txt x={640} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Su jefa</Txt>
        {vent(t, m('ejecutivo'), m('nocierto')) > 0.01 && <g opacity={vent(t, m('ejecutivo'), m('nocierto'))}><Burbuja x={620} y={510} w={420} texto="Tus propuestas son demasiado largas" u={sm(t, m('ejecutivo'), m('ejecutivo') + 1.6)} c={c} id={ID} tam={28} lado="der" /></g>}
        {vent(t, m('nocierto'), m('laminas')) > 0.01 && <g opacity={vent(t, m('nocierto'), m('laminas'))}><Burbuja x={280} y={510} w={360} texto="Mis clientes las leen" u={sm(t, m('nocierto'), m('nocierto') + 1)} c={c} id={ID} tam={28} /></g>}
        {vent(t, m('laminas'), m('noche')) > 0.01 && (
          <g opacity={vent(t, m('laminas'), m('noche'))}>
            {Array.from({ length: 8 }, (_, k) => <rect key={k} x={560 + k * 4} y={430 - k * 8} width={150} height={96} rx={8} fill={k % 2 ? '#e2e8f0' : '#f8fafc'} stroke="#94a3b8" strokeWidth={1} />)}
            <Txt x={640} y={340} textAnchor="middle" fontSize={30} fill={c.texto}>40 láminas</Txt>
          </g>
        )}
        {t >= m('noche') && (
          <g opacity={vent(t, m('noche'), m('nombrarlos'))}>
            <circle cx={180} cy={250} r={40} fill="#fde68a" /><circle cx={198} cy={238} r={36} fill={isDark ? '#1f1f1f' : '#e2e8f0'} />
            {[0, 1, 2].map((k) => <circle key={k} cx={300 + k * 28} cy={500 - k * 34} r={8 + k * 4} fill={c.panel} />)}
            <ellipse cx={420} cy={340} rx={130} ry={60} fill={c.panel} />
            <Txt x={420} y={352} textAnchor="middle" fontSize={28} fill={c.texto}>¿Sirvo para esto?</Txt>
          </g>
        )}
        {SW.map(([n, nom, col], k) => (
          <g key={n} opacity={e1(t, m('ejecutivo') + 0.5)}>
            <g transform={`translate(1080 ${200 + k * 200}) scale(0.62)`}><Interruptor x={0} y={60} on={Math.max(on3(k), sm(t, m('vez'), m('vez') + 0.6))} color={col} texto="" c={c} /></g>
            <Txt x={1030} y={236 + k * 200} textAnchor="end" fontSize={30} fill={col}>{nom}</Txt>
          </g>
        ))}
      </TomaFB>

      {/* 4 · nombrarlos */}
      <TomaFB t={t} a={m('nombrarlos')} b={fin + 1} cy={470}>
        {SW.map(([n, nom, col], k) => (
          <g key={n} opacity={e1(t, m('nombrarlos') + k * 0.5)}>
            <Interruptor x={260 + k * 340} y={330} on={1 - sm(t, m('separa') + 1, m('separa') + 2)} color={col} texto={nom} c={c} tam={32} />
          </g>
        ))}
        {t >= m('separa') && (
          <g opacity={e1(t, m('separa'))}>
            <Letrero x={300} y={640} texto="Reacción" fondo={ROJO_M} id={ID} tam={30} />
            <Letrero x={900} y={640} texto="Respuesta" fondo={VERDE} id={ID} tam={30} op={sm(t, m('separa') + 1.4, m('separa') + 2)} />
            <path d="M 440 640 L 760 640" stroke={c.apagado} strokeWidth={6} strokeDasharray="12 12" />
            <Txt x={600} y={590} textAnchor="middle" fontSize={28} fill={c.texto}>¿Cuál se encendió?</Txt>
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
