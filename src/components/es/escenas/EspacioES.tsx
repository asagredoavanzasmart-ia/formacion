import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Caja, Telefono, Libro, Suelo, Cruz, Colinas, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Espacio para pensar.
 * Toma 1 (Frank O'Brien): la mesa larga con toda la empresa; los teléfonos caen en una caja; el calendario con el primer
 * lunes marcado; la silla vacía con la alarma.
 * Toma 2: la agenda de Jeff Weiner con cuatro tramos de 30 minutos en blanco; la cabaña de Bill Gates con su pila de lectura.
 * Toma 3: el comité de claridad: un círculo de personas que solo envía preguntas hacia quien tiene el dilema.
 */

const ID = 'es06', P = 'es-espacio';

export const EspacioES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('espacio'), 'Explorar necesita espacio'], [m('obrien'), 'Frank O\'Brien'], [m('sin'), 'Sin teléfonos ni correo'], [m('lunes'), 'El primer lunes del mes'],
    [m('alarma'), 'Una alarma'], [m('weiner'), 'Jeff Weiner'], [m('dos'), 'Dos horas en blanco'], [m('gates'), 'Bill Gates'], [m('semana'), 'Una semana para pensar'],
    [m('comite'), 'Comité de claridad'], [m('ocupado'), 'Más ocupado, más espacio'],
  ];
  const AG = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'];
  const libre = (k: number) => k === 2 || k === 3 || k === 6 || k === 7;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Espacio para pensar">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la reunión mensual sin teléfonos */}
      <Toma t={t} a={0} b={m('weiner')} cy={480}>
        {ventana(t, 0, m('lunes')) > 0.01 && (
          <g opacity={ventana(t, 0, m('lunes'))}>
            {[0, 1].map((f) => Array.from({ length: 6 }, (_, k) => <Persona key={`${f}${k}`} id={ID} x={260 + k * 136} y={f ? 700 : 470} s={f ? 0.62 : 0.5} cuerpo={[NARANJA, ROSA, AZUL_M, VIOLETA, VERDE, '#0ea5e9'][(k + f) % 6]} />))}
            <path d="M 180 520 H 1020 L 1060 600 H 140 Z" fill="#a16b3f" opacity={e1(t, m('obrien'))} />
            {t >= m('cincuenta') && <Letrero x={600} y={230} texto="Toda la empresa · unas 50 personas" fondo={GRIS} id={ID} tam={28} op={e1(t, m('cincuenta'))} />}
            {t >= m('sin') && (
              <g>
                <Caja x={600} y={800} w={180} h={70} texto="Teléfonos" tam={24} />
                {[0, 1, 2, 3].map((k) => { const u = sm(t, m('sin') + 0.25 * k, m('sin') + 0.25 * k + 0.9); return <g key={k} opacity={1 - sm(t, m('sin') + 0.25 * k + 0.8, m('sin') + 0.25 * k + 1)}><Telefono x={lerp(300 + k * 200, 600, u)} y={lerp(560, 760, u) - 90 * Math.sin(Math.PI * u)} s={0.45} /></g>; })}
              </g>
            )}
          </g>
        )}
        {t >= m('lunes') && (
          <g opacity={e1(t, m('lunes'))}>
            <rect x={200} y={180} width={520} height={460} rx={24} fill={c.panel} />
            <rect x={200} y={180} width={520} height={70} rx={24} fill={NARANJA} />
            <Txt x={460} y={228} textAnchor="middle" fontSize={32} fill="#fff">Mes</Txt>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, k) => <Txt key={k} x={250 + k * 70} y={290} textAnchor="middle" fontSize={26} fill={c.tenue}>{d}</Txt>)}
            {Array.from({ length: 28 }, (_, k) => {
              const primer = k === 0;
              return <rect key={k} x={222 + (k % 7) * 70} y={312 + Math.floor(k / 7) * 76} width={56} height={56} rx={10} fill={primer ? NARANJA : c.apagado} opacity={primer ? 0.7 + 0.3 * Math.sin(t * 5) : 1} />;
            })}
          </g>
        )}
        {t >= m('alarma') && (
          <g opacity={e1(t, m('alarma'))}>
            <rect x={860} y={600} width={120} height={20} rx={6} fill="#64748b" /><rect x={860} y={480} width={20} height={140} rx={6} fill="#64748b" /><rect x={870} y={620} width={14} height={90} fill="#475569" /><rect x={960} y={620} width={14} height={90} fill="#475569" />
            <g transform={`translate(920 360) rotate(${18 * Math.sin(t * 18)})`}><path d="M -50 40 Q -50 -50 0 -54 Q 50 -50 50 40 Z" fill="#f59e0b" /><circle cy={50} r={12} fill="#b45309" /></g>
            <Txt x={920} y={760} textAnchor="middle" fontSize={26} fill={c.texto}>Demasiado trabajo</Txt>
          </g>
        )}
      </Toma>

      {/* 2 · Weiner y Gates */}
      <Toma t={t} a={m('weiner')} b={m('comite')} cy={480}>
        {ventana(t, m('weiner') - 0.1, m('gates')) > 0.01 && (
          <g opacity={ventana(t, m('weiner') - 0.1, m('gates'))}>
            <rect x={300} y={150} width={600} height={640} rx={24} fill={c.panel} />
            {AG.map((h, k) => {
              const blanco = libre(k) && t >= m('dos');
              return (
                <g key={h}>
                  <Txt f="a" x={340} y={214 + k * 58} fontSize={24} fill={c.tenue}>{h}</Txt>
                  <rect x={440} y={186 + k * 58} width={420} height={46} rx={10} fill={blanco ? (isDark ? '#1f2937' : '#ffffff') : [AZUL_M, VIOLETA, ROSA][k % 3]} opacity={blanco ? 1 : 0.8} />
                  {blanco && <rect x={440} y={186 + k * 58} width={420} height={46} rx={10} fill="none" stroke={VERDE} strokeWidth={4} strokeDasharray="10 8" />}
                </g>
              );
            })}
            {t >= m('lujo') && <Letrero x={600} y={800} texto={t >= m('lujo') + 2 ? 'Su herramienta más valiosa' : '¿Un lujo?'} fondo={t >= m('lujo') + 2 ? VERDE : GRIS} id={ID} tam={28} />}
          </g>
        )}
        {t >= m('gates') && (
          <g opacity={e1(t, m('gates'))}>
            <Colinas y={620} isDark={isDark} t={t} />
            <path d="M 420 640 V 470 L 600 360 L 780 470 V 640 Z" fill="#a16b3f" />
            <path d="M 400 480 L 600 340 L 800 480" stroke="#7c2d12" strokeWidth={22} fill="none" strokeLinecap="round" />
            <rect x={640} y={500} width={90} height={80} rx={6} fill="#fde68a" />
            <rect x={470} y={530} width={70} height={110} rx={6} fill="#7c2d12" />
            {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={880} y={620 - k * 26} width={140 - (k % 2) * 20} height={22} rx={4} fill={[NARANJA, AZUL_M, VERDE, ROSA, VIOLETA][k]} />)}
            <Persona id={ID} x={860} y={720} s={0.75} cuerpo="#0ea5e9" />
            <Letrero x={600} y={790} texto={t >= m('semana') ? 'Dos veces al año: una semana para pensar' : 'Bill Gates'} id={ID} tam={28} />
          </g>
        )}
      </Toma>

      {/* 3 · el comité de claridad */}
      <Toma t={t} a={m('comite')} b={fin + 1} cy={480}>
        <Persona id={ID} x={600} y={620} s={0.95} cuerpo={NARANJA} ojos={0.6} />
        {[220, 400, 800, 980].map((x, k) => {
          const y = k === 0 || k === 3 ? 760 : 700;
          const u = ((t - m('preguntas')) * 0.4 + k / 4) % 1;
          return (
            <g key={k} opacity={e1(t, m('comite') + 0.2 * k)}>
              <Persona id={ID} x={x} y={y} s={0.8} cuerpo={[AZUL_M, VIOLETA, ROSA, VERDE][k]} />
              {t >= m('preguntas') && <Txt x={lerp(x, 600, u)} y={lerp(y - 190, 360, u)} textAnchor="middle" fontSize={44} fill={NARANJA} opacity={Math.min(1, u * 5, (1 - u) * 5)}>?</Txt>}
            </g>
          );
        })}
        {t >= m('preguntas') && <g opacity={e1(t, m('preguntas') + 1)}><Letrero x={1000} y={230} texto="Consejos" fondo={GRIS} id={ID} tam={26} /><Cruz x={1100} y={200} r={20} /></g>}
        {t >= m('ocupado') && <Letrero x={600} y={800} texto="Más ocupado, más necesita ese espacio" id={ID} tam={28} op={e1(t, m('ocupado'))} />}
        {!movil && <Txt f="a" x={300} y={230} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('comite'))}>Parker Palmer · cuáqueros</Txt>}
      </Toma>
    </Lienzo>
  );
};
