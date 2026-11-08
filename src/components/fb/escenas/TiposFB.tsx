import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Corazon, Brujula, Calendario, Hoja, Cruz, Visto, Cifra, Suelo, Paso, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Tres tipos de feedback. Toma 1: tres columnas con su objeto: corazón (agradecimiento), brújula (coaching) y regla con
 * una marca de estándar (evaluación). Toma 2: los cruces: el vendedor pide la brújula y recibe la regla; la operaria
 * del turno de noche esperaba el corazón y recibe una lista. La regla crece y tapa a los otros dos; el bono se come al
 * informe. Toma 3: Gallup, 80.000 personas, doce preguntas y la de los siete días. Toma 4: tres tácticas.
 */

const ID = 'fb02', P = 'fb-tipos';

const Regla: React.FC<{ x: number; y: number; s?: number; marca?: number; op?: number }> = ({ x, y, s = 1, marca = 0.62, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <rect x={-80} y={-22} width={160} height={44} rx={8} fill="#f59e0b" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.2))' }} />
    {Array.from({ length: 15 }, (_, k) => <rect key={k} x={-72 + k * 10} y={-22} width={3} height={k % 5 === 0 ? 22 : 12} fill="#78350f" />)}
    <path d={`M ${-80 + 160 * marca} -46 L ${-70 + 160 * marca} -30 L ${-90 + 160 * marca} -30 Z`} fill={ROJO_M} />
  </g>
);

export const TiposFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('tres'), 'Tres tipos'], [m('agradecimiento'), 'Agradecimiento'], [m('coaching'), 'Coaching'], [m('evaluacion'), 'Evaluación'],
    [m('cruzan'), 'Cuando se cruzan'], [m('ruidosa'), 'La evaluación tapa a las otras'], [m('pesa'), 'El agradecimiento pesa'],
    [m('decide'), 'Tres tácticas'],
  ];
  const TIPOS = [
    ['agradecimiento', 'Agradecimiento', 'Te vi', ROSA],
    ['coaching', 'Coaching', 'Así mejoras', AZUL_M],
    ['evaluacion', 'Evaluación', 'Aquí estás', NARANJA],
  ] as const;
  const crece = sm(t, m('ruidosa'), m('ruidosa') + 1.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Tres tipos de feedback">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · los tres tipos */}
      <TomaFB t={t} a={0} b={m('cruzan')} cy={470}>
        {TIPOS.map(([n, nom, dice, col], k) => {
          const x = 250 + k * 350, o = e1(t, m(n));
          return o > 0.01 ? (
            <g key={n} opacity={o} transform={`translate(0 ${(1 - o) * 20})`}>
              <rect x={x - 165} y={180} width={330} height={440} rx={30} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
              <rect x={x - 165} y={180} width={330} height={16} rx={8} fill={col} />
              {k === 0 && <Corazon x={x} y={330} s={1.6} color={col} />}
              {k === 1 && <Brujula x={x} y={330} r={80} ang={25 * Math.sin(t * 1.3)} id={ID} />}
              {k === 2 && <Regla x={x} y={330} s={1.3} />}
              <Txt x={x} y={490} textAnchor="middle" fontSize={32} fill={c.texto}>{nom}</Txt>
              <Txt x={x} y={560} textAnchor="middle" fontSize={30} fill={col}>«{dice}»</Txt>
            </g>
          ) : null;
        })}
        {t >= m('tres') && t < m('agradecimiento') && <Txt x={600} y={430} textAnchor="middle" fontSize={34} fill={c.texto} opacity={vent(t, m('tres'), m('agradecimiento'))}>Cada uno responde a una necesidad</Txt>}
        <Letrero x={600} y={720} texto="Los tres son necesarios" id={ID} tam={30} op={e1(t, m('evaluacion') + 2)} />
      </TomaFB>

      {/* 2 · cuando se cruzan */}
      <TomaFB t={t} a={m('cruzan')} b={m('pesa')} cy={480}>
        {vent(t, m('cruzan'), m('ruidosa')) > 0.01 && (
          <g opacity={vent(t, m('cruzan'), m('ruidosa'))}>
            <Suelo y={720} isDark={isDark} x0={100} x1={1100} />
            {/* vendedor */}
            <g opacity={vent(t, m('vendedor') - 0.2, m('operaria'))}>
              <Persona id={ID} x={300} y={720} s={1} cuerpo={AZUL_M} ojos={t >= m('recibio') ? 0.55 : 1} />
              <Persona id={ID} x={860} y={720} s={1} cuerpo={VIOLETA} />
              <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Vendedor</Txt>
              <Txt x={860} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Su jefa</Txt>
              <Burbuja x={320} y={510} w={400} texto="¿Me ayudas con este cliente?" u={sm(t, m('vendedor'), m('vendedor') + 1.2)} c={c} id={ID} tam={28} />
              {t >= m('recibio') && (
                <g opacity={e1(t, m('recibio'))}>
                  <Regla x={lerp(740, 580, sm(t, m('recibio'), m('recibio') + 1))} y={560} s={1} />
                  <Txt x={580} y={640} textAnchor="middle" fontSize={28} fill={c.texto}>Pidió ayuda, recibió nota</Txt>
                </g>
              )}
            </g>
            {/* operaria */}
            {t >= m('operaria') && (
              <g opacity={e1(t, m('operaria'))}>
                <circle cx={1040} cy={190} r={34} fill="#fde68a" /><circle cx={1054} cy={180} r={30} fill={isDark ? '#1f1f1f' : '#e2e8f0'} />
                <Persona id={ID} x={360} y={720} s={1} cuerpo={TEAL_OP} ojos={0.7} />
                <Txt x={360} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Turno de noche</Txt>
                <g opacity={1 - 0.5 * sm(t, m('esfuerzo'), m('esfuerzo') + 0.6)}>
                  <Hoja x={640} y={470} w={110} h={140} lineas={6} />
                  <Txt x={640} y={580} textAnchor="middle" fontSize={28} fill={c.texto}>Sugerencias</Txt>
                </g>
                {t >= m('esfuerzo') && <g opacity={e1(t, m('esfuerzo'))}><Corazon x={860} y={450} s={1.4} color={ROSA} /><Txt x={860} y={580} textAnchor="middle" fontSize={28} fill={c.texto}>Lo que necesitaba</Txt></g>}
              </g>
            )}
          </g>
        )}
        {t >= m('ruidosa') && (
          <g opacity={e1(t, m('ruidosa'))}>
            <g opacity={vent(t, m('ruidosa'), m('bono'))}>
              <Corazon x={300} y={420} s={1.2} color={ROSA} />
              <Brujula x={900} y={420} r={70} ang={25 * Math.sin(t * 1.3)} id={ID} />
              <rect x={150} y={300} width={900} height={260} rx={30} fill={c.panel} opacity={0.85 * crece} />
              <Regla x={600} y={430} s={lerp(1, 4.2, crece)} />
            </g>
            {t >= m('bono') && (
              <g opacity={e1(t, m('bono'))}>
                <g opacity={1 - 0.65 * sm(t, m('bono') + 1, m('bono') + 2)} transform={`translate(${lerp(0, -60, sm(t, m('bono') + 1, m('bono') + 2))} 0)`}>
                  <Hoja x={360} y={430} w={150} h={190} lineas={7} />
                  <Txt x={360} y={580} textAnchor="middle" fontSize={28} fill={c.texto}>Informe con errores</Txt>
                </g>
                <g transform={`translate(780 430) scale(${lerp(1, 1.35, sm(t, m('bono') + 1, m('bono') + 2))})`}>
                  <rect x={-150} y={-80} width={300} height={160} rx={24} fill={ROJO_M} />
                  <Txt x={0} y={14} textAnchor="middle" fontSize={40} fill="#fff">Sin bono</Txt>
                </g>
                <Txt x={600} y={700} textAnchor="middle" fontSize={30} fill={c.texto} opacity={e1(t, m('bono') + 1.6)}>Solo va a escuchar lo del bono</Txt>
              </g>
            )}
          </g>
        )}
      </TomaFB>

      {/* 3 · Gallup y los siete días */}
      <TomaFB t={t} a={m('pesa')} b={m('decide')} cy={470}>
        <Corazon x={600} y={300} s={lerp(1, 1.6, sm(t, m('pesa'), m('pesa') + 1))} color={ROSA} op={vent(t, m('pesa'), m('gallup') + 0.2)} />
        {t >= m('gallup') && (
          <g opacity={e1(t, m('gallup'))}>
            <Cifra x={280} y={300} valor={80000} u={sm(t, m('gallup'), m('gallup') + 1.4)} miles tam={80} color={NARANJA} />
            <Txt x={280} y={360} textAnchor="middle" fontSize={28} fill={c.texto}>trabajadores</Txt>
            {Array.from({ length: 12 }, (_, k) => {
              const clave = k === 4;
              const brillo = clave ? sm(t, m('siete'), m('siete') + 0.8) : 0;
              return <rect key={k} x={600 + (k % 6) * 80} y={230 + Math.floor(k / 6) * 90} width={64} height={70} rx={12} fill={clave && brillo > 0.5 ? ROSA : c.apagado} opacity={e1(t, m('gallup') + 0.5 + k * 0.08) * (clave ? 1 : 1 - 0.5 * brillo)} />;
            })}
            <Txt x={840} y={430} textAnchor="middle" fontSize={28} fill={c.texto}>12 preguntas</Txt>
          </g>
        )}
        {t >= m('siete') && (
          <g opacity={e1(t, m('siete'))}>
            <rect x={130} y={500} width={940} height={170} rx={30} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
            <Calendario x={240} y={585} s={0.8} marcados={7} />
            <Txt x={350} y={572} fontSize={30} fill={c.texto}>En los últimos siete días,</Txt>
            <Txt x={350} y={620} fontSize={30} fill={ROSA}>¿recibí reconocimiento?</Txt>
          </g>
        )}
      </TomaFB>

      {/* 4 · tácticas */}
      <TomaFB t={t} a={m('decide')} b={fin + 1} cy={470}>
        <Paso x={170} y={260} w={860} texto="Decide el tipo y dilo al empezar" color={NARANJA} c={c} op={e1(t, m('decide'))} hecho={sm(t, m('decide') + 1, m('decide') + 1.6)} tam={32} />
        <Paso x={170} y={400} w={860} texto="Evaluación y coaching, en días distintos" color={AZUL_M} c={c} op={e1(t, m('separa'))} hecho={sm(t, m('separa') + 1, m('separa') + 1.6)} tam={32} />
        <Paso x={170} y={540} w={860} texto="Al recibir: ¿cuál es la intención?" color={ROSA} c={c} op={e1(t, m('intencion'))} hecho={sm(t, m('intencion') + 1, m('intencion') + 1.6)} tam={32} />
        {!movil && <Txt f="a" x={600} y={680} textAnchor="middle" fontSize={22} fill={GRIS} opacity={e1(t, m('intencion') + 1)}>Agradecimiento · Coaching · Evaluación</Txt>}
      </TomaFB>
    </Lienzo>
  );
};

const TEAL_OP = '#0d9488';
