import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Reloj, Puerta, Lista, Hoja, Visto, Cruz, Suelo, Caja, Telefono, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * ¿Qué es lo importante ahora?
 * Toma 1 (Larry Gelwix): la cancha de rugby con el jugador y el balón; a su izquierda el fantasma de la jugada anterior y a
 * su derecha el del próximo partido, que se desvanecen; ser vencido frente a perder.
 * Toma 2: cronos, el reloj que corre, y kairós, el foco sobre un momento; lavar platos y escuchar la radio sí; dos
 * pensamientos a la vez, no.
 * Toma 3: el escritorio del hotel con dos listas (ahora / algún día); la pausa de Jeffrey Rodgers ante la puerta; la reunión
 * con una sola conversación y los teléfonos en la caja.
 */

const ID = 'es23', P = 'es-ahora';

const Balon: React.FC<{ x: number; y: number; rot?: number }> = ({ x, y, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}><ellipse rx={30} ry={19} fill="#92400e" /><path d="M -12 0 H 12 M -6 -5 V 5 M 0 -5 V 5 M 6 -5 V 5" stroke="#fff" strokeWidth={2.5} /></g>
);

export const AhoraES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('presente'), 'El presente'], [m('gelwix'), 'Larry Gelwix'], [m('ahora'), '¿Qué es lo importante ahora?'], [m('vencido'), 'Ser vencido'], [m('perder'), 'Perder'],
    [m('griegos'), 'Dos palabras para el tiempo'], [m('platos'), 'Hacer dos cosas, sí'], [m('dos'), 'Concentrarse en dos, no'], [m('hotel'), 'Tres pasos'],
    [m('rodgers'), 'La pausa que refresca'], [m('conversacion'), 'Una conversación a la vez'],
  ];
  const fantasmas = 1 - sm(t, m('anterior') + 1, m('anterior') + 2.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="¿Qué es lo importante ahora?">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la cancha */}
      <Toma t={t} a={0} b={m('griegos')} cy={480}>
        <rect x={60} y={420} width={1080} height={380} rx={20} fill={isDark ? '#14532d' : '#4ade80'} opacity={e1(t, m('presente'))} />
        {[200, 400, 600, 800, 1000].map((x) => <rect key={x} x={x - 3} y={420} width={6} height={380} fill="#fff" opacity={0.5 * e1(t, m('presente'))} />)}
        {ventana(t, m('gelwix'), m('vencido')) > 0.01 && (
          <g opacity={ventana(t, m('gelwix'), m('vencido'))}>
            <g opacity={0.35 * fantasmas * e1(t, m('anterior'))}><Persona id={ID} x={250} y={720} s={0.95} cuerpo={GRIS} /><Txt x={250} y={780} textAnchor="middle" fontSize={24} fill="#fff">Jugada anterior</Txt></g>
            <g opacity={0.35 * fantasmas * e1(t, m('anterior') + 0.4)}><Persona id={ID} x={950} y={720} s={0.95} cuerpo={GRIS} /><Txt x={950} y={780} textAnchor="middle" fontSize={24} fill="#fff">Próximo partido</Txt></g>
            <Persona id={ID} x={600} y={720} s={1.1} cuerpo={NARANJA} />
            <Balon x={650} y={600} rot={10 * Math.sin(t * 3)} />
            <circle cx={600} cy={620} r={170 + 6 * Math.sin(t * 3)} fill="none" stroke="#fde68a" strokeWidth={6} opacity={0.7 * e1(t, m('ahora'))} />
            {t >= m('ahora') && <Letrero x={600} y={300} texto="¿Qué es lo importante ahora?" id={ID} tam={34} />}
          </g>
        )}
        {t >= m('vencido') && (
          <g>
            <g opacity={e1(t, m('vencido'))}>
              <Persona id={ID} x={260} y={720} s={0.9} cuerpo={NARANJA} />
              <Persona id={ID} x={420} y={720} s={1.25} cuerpo={AZUL_M} />
              <Txt x={340} y={360} textAnchor="middle" fontSize={30} fill={c.texto}>Ser vencido</Txt>
              <Txt f="a" x={340} y={400} textAnchor="middle" fontSize={24} fill={c.texto}>el rival es mejor</Txt>
            </g>
            <g opacity={e1(t, m('perder'))}>
              <Persona id={ID} x={860} y={720} s={0.9} cuerpo={NARANJA} ojos={0.4} />
              <Balon x={760} y={760} rot={40} />
              <Txt x={860} y={360} textAnchor="middle" fontSize={30} fill={c.texto}>Perder</Txt>
              <Txt f="a" x={860} y={400} textAnchor="middle" fontSize={24} fill={c.texto}>perder la concentración</Txt>
            </g>
          </g>
        )}
      </Toma>

      {/* 2 · cronos y kairós; multitarea frente a multiconcentración */}
      <Toma t={t} a={m('griegos')} b={m('hotel')} cy={480}>
        {ventana(t, m('griegos') - 0.1, m('platos')) > 0.01 && (
          <g opacity={ventana(t, m('griegos') - 0.1, m('platos'))}>
            <g opacity={e1(t, m('cronos'))}><Reloj x={330} y={460} r={150} t={t * 3} /><Txt x={330} y={680} textAnchor="middle" fontSize={34} fill={c.texto}>Cronos</Txt><Txt f="a" x={330} y={720} textAnchor="middle" fontSize={24} fill={c.texto}>el tiempo del reloj</Txt></g>
            <g opacity={e1(t, m('kairos'))}>
              <path d="M 800 160 L 700 620 H 1000 Z" fill="#fde68a" opacity={0.4} />
              <Persona id={ID} x={850} y={620} s={1} cuerpo={NARANJA} />
              <Txt x={850} y={680} textAnchor="middle" fontSize={34} fill={c.texto}>Kairós</Txt>
              <Txt f="a" x={850} y={720} textAnchor="middle" fontSize={24} fill={c.texto}>el momento oportuno</Txt>
            </g>
          </g>
        )}
        {t >= m('platos') && (
          <g>
            <g opacity={e1(t, m('platos'))}>
              <Persona id={ID} x={330} y={720} s={1} cuerpo={AZUL_M} />
              <rect x={200} y={600} width={260} height={30} rx={8} fill="#94a3b8" />
              {[0, 1, 2].map((k) => <ellipse key={k} cx={250 + k * 70} cy={598 - 6 * Math.abs(Math.sin(t * 4 + k))} rx={28} ry={8} fill="#f8fafc" />)}
              <rect x={420} y={420} width={90} height={60} rx={10} fill="#7c2d12" /><circle cx={445} cy={450} r={14} fill="#1f2937" />
              {[0, 1].map((k) => <path key={k} d={`M ${520 + k * 16} 430 q 10 20 0 40`} stroke={NARANJA} strokeWidth={4} fill="none" opacity={0.5 + 0.5 * Math.sin(t * 6 + k)} />)}
              <Visto x={330} y={320} r={36} />
            </g>
            {t >= m('dos') && (
              <g opacity={e1(t, m('dos'))}>
                <Persona id={ID} x={870} y={720} s={1} cuerpo={GRIS} ojos={0.4} />
                {[-1, 1].map((l) => <g key={l}><circle cx={870 + l * 90} cy={420} r={58} fill={c.panel} /><circle cx={870 + l * 40} cy={500} r={12} fill={c.panel} /></g>)}
                <Txt x={780} y={432} textAnchor="middle" fontSize={34} fill={AZUL_M}>A</Txt><Txt x={960} y={432} textAnchor="middle" fontSize={34} fill={ROSA}>B</Txt>
                <Cruz x={870} y={300} r={36} />
              </g>
            )}
            {t >= m('multi') && <Letrero x={600} y={790} texto="El enemigo: la multiconcentración" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('multi'))} />}
          </g>
        )}
      </Toma>

      {/* 3 · hotel, pausa y una conversación */}
      <Toma t={t} a={m('hotel')} b={fin + 1} cy={480}>
        {ventana(t, m('hotel') - 0.1, m('rodgers')) > 0.01 && (
          <g opacity={ventana(t, m('hotel') - 0.1, m('rodgers'))}>
            <Lista x={330} y={470} s={1.1} n={4} hechos={Math.min(4, Math.floor(Math.max(0, t - m('futuro') - 1.5)))} c={c} titulo="Ahora" />
            <g opacity={e1(t, m('futuro'))}><Lista x={870} y={470} s={1.1} n={5} hechos={0} c={c} titulo="Algún día" /></g>
            {t >= m('futuro') && [0, 1, 2].map((k) => { const u = sm(t, m('futuro') + 0.3 * k, m('futuro') + 0.3 * k + 1); return <Hoja key={k} x={lerp(420, 800, u)} y={lerp(380 + k * 60, 420 + k * 50, u)} w={60} h={40} lineas={2} op={1 - u} />; })}
          </g>
        )}
        {ventana(t, m('rodgers') - 0.1, m('conversacion')) > 0.01 && (
          <g opacity={ventana(t, m('rodgers') - 0.1, m('conversacion'))}>
            <Suelo y={740} isDark={isDark} x0={180} x1={1020} />
            <path d="M 600 300 L 780 410 V 740 H 420 V 410 Z" fill="#fcd34d" opacity={0.3} />
            <g transform="translate(680 740)"><Puerta x={0} y={0} c={c} abre={sm(t, m('respira') + 1.5, m('respira') + 2.5)} /></g>
            <Persona id={ID} x={480} y={740} s={1} cuerpo="#1e3a8a" />
            {t >= m('respira') && <circle cx={480} cy={600} r={40 + 50 * Math.abs(Math.sin((t - m('respira')) * 1.2))} fill="none" stroke={VERDE} strokeWidth={6} opacity={0.7} />}
            <Txt f="a" x={480} y={800} textAnchor="middle" fontSize={24} fill={c.texto}>Jeffrey Rodgers</Txt>
          </g>
        )}
        {t >= m('conversacion') && (
          <g opacity={e1(t, m('conversacion'))}>
            <ellipse cx={600} cy={560} rx={300} ry={90} fill="#a16b3f" />
            {[300, 480, 720, 900].map((x, k) => <Persona key={x} id={ID} x={x} y={k === 0 || k === 3 ? 760 : 700} s={0.8} cuerpo={[AZUL_M, ROSA, VIOLETA, VERDE][k]} />)}
            <Caja x={600} y={560} w={120} h={50} texto="Teléfonos" tam={18} />
            <Letrero x={600} y={300} texto="Una sola conversación a la vez" id={ID} tam={30} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
