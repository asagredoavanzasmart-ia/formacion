import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Reloj, Medidor, Persona, Escudo, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * La ecuación del valor.
 * Toma 1: una fracción gigante. Arriba entran el resultado soñado (trofeo) y la probabilidad (medidor); abajo, la demora
 * (reloj) y el esfuerzo (pesa). Un termómetro de «valor» a la derecha sube cuando crece lo de arriba y baja lo de abajo.
 * Toma 2: dos vehículos al mismo destino: meditación (cuatro barras desfavorables) frente a la pastilla (favorables).
 * Toma 3: la liposucción de una tarde frente a doce meses de gimnasio.
 */

const ID = 'ad08', P = 'ad-ecuacion';

const Trofeo: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -70 H 40 V -40 Q 40 0 0 6 Q -40 0 -40 -40 Z" fill={AMBAR} />
    <path d="M -40 -60 Q -70 -60 -64 -34 Q -58 -16 -36 -18 M 40 -60 Q 70 -60 64 -34 Q 58 -16 36 -18" stroke={AMBAR} strokeWidth={9} fill="none" />
    <rect x={-8} y={4} width={16} height={24} fill="#d97706" /><rect x={-34} y={26} width={68} height={16} rx={6} fill="#92400e" />
  </g>
);
const Pesa: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 20 L -36 -34 H 36 L 50 20 Z" fill="#334155" /><path d="M -20 -34 Q -20 -60 0 -60 Q 20 -60 20 -34" stroke="#334155" strokeWidth={12} fill="none" />
    <Txt x={0} y={10} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>kg</Txt>
  </g>
);

export const EcuacionAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('cuatro'), 'Cuatro variables'], [m('numerador'), 'Arriba: maximizar'], [m('denominador'), 'Abajo: llevar a cero'], [m('vehiculos'), 'Mismo resultado, dos vehículos'],
    [m('millones'), 'Por eso uno se vende solo'], [m('lipo'), 'Una tarde o doce meses'],
  ];
  const valor = 0.15 + 0.2 * sm(t, m('sonado'), m('sonado') + 1) + 0.2 * sm(t, m('probabilidad'), m('probabilidad') + 1) + 0.2 * sm(t, m('demora'), m('demora') + 1) + 0.2 * sm(t, m('esfuerzo'), m('esfuerzo') + 1);
  // Comparación: [meditación, pastilla] para probabilidad, demora y esfuerzo (más alto = mejor para el valor).
  const COMP: [string, string, number, number][] = [['Probabilidad', 'meditacion', 0.25, 1], ['Rapidez', 'meditacion', 0.15, 0.95], ['Poco esfuerzo', 'meditacion', 0.2, 0.98]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La ecuación del valor">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La fracción */}
      <Toma t={t} a={0} b={m('vehiculos')} cy={470}>
        <g opacity={e1(t, m('cuatro'))}>
          <rect x={150} y={455} width={720} height={18} rx={9} fill={c.texto} />
          {([['sonado', 300, 330, 'Resultado soñado', VERDE], ['probabilidad', 720, 330, 'Probabilidad', AZUL_M], ['demora', 300, 640, 'Demora', ROJO_M], ['esfuerzo', 720, 640, 'Esfuerzo', ROJO_M]] as const).map(([n, x, y, txt, col], k) => {
            const on = t >= m(n) - 0.1;
            const baja = k >= 2 ? sm(t, m(n) + 0.6, m(n) + 1.6) : 0;
            return (
              <g key={n} opacity={on ? e1(t, m(n)) : 0.15}>
                <rect x={x - 150} y={y - 110} width={300} height={190} rx={26} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                <g transform={`translate(${x} ${y - 20}) scale(${k >= 2 ? lerp(1, 0.55, baja) : lerp(0.8, 1.1, sm(t, m(n), m(n) + 1))})`}>
                  {k === 0 && <Trofeo x={0} y={20} s={1} />}
                  {k === 1 && <Medidor x={0} y={30} r={60} v={0.2 + 0.7 * sm(t, m(n), m(n) + 1)} color={col} c={c} />}
                  {k === 2 && <Reloj x={0} y={0} r={50} t={t} vel={lerp(3, 0.3, baja)} aro={col} />}
                  {k === 3 && <Pesa x={0} y={20} s={1} />}
                </g>
                <Txt f="a" x={x} y={y + 60} textAnchor="middle" fontSize={28} fill={c.texto}>{movil && k === 0 ? 'Resultado' : txt}</Txt>
                <Txt x={x + 120} y={y - 70} textAnchor="middle" fontSize={44} fill={col} peso={800}>{k < 2 ? '↑' : '↓'}</Txt>
              </g>
            );
          })}
          {t >= m('numerador') && <Letrero x={510} y={180} texto="Maximizar" fondo={VERDE} id={ID} tam={28} op={e1(t, m('numerador'))} />}
          {t >= m('denominador') && <Letrero x={510} y={790} texto="Llevar hacia cero" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('denominador'))} />}
          <g transform="translate(1010 0)">
            <rect x={-40} y={200} width={80} height={500} rx={40} fill={c.apagado} />
            <rect x={-30} y={690 - 480 * valor} width={60} height={480 * valor} rx={30} fill={`url(#${ID}-marca)`} />
            <circle cx={0} cy={710} r={56} fill={NARANJA} />
            <Txt x={0} y={180} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>Valor</Txt>
          </g>
        </g>
      </Toma>

      {/* 2 · Meditación frente a la pastilla */}
      <Toma t={t} a={m('vehiculos')} b={m('lipo')} cy={470}>
        <g opacity={e1(t, m('vehiculos'))}>
          <Letrero x={600} y={160} texto="Destino: relajación" fondo={VIOLETA} id={ID} tam={28} />
          {[0, 1].map((g) => {
            const on = t >= m(g === 0 ? 'meditacion' : 'farmaco') - 0.1;
            const x0 = g === 0 ? 120 : 640;
            return (
              <g key={g} opacity={on ? e1(t, m(g === 0 ? 'meditacion' : 'farmaco')) : 0.12}>
                <rect x={x0} y={210} width={440} height={520} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
                {g === 0 ? (
                  <g transform={`translate(${x0 + 220} 420)`}>
                    <ellipse cx={0} cy={20} rx={80} ry={22} fill={VIOLETA} />
                    <path d="M -40 10 L -40 -50 Q -40 -80 0 -80 Q 40 -80 40 -50 L 40 10 Z" fill={VIOLETA} />
                    <circle cx={0} cy={-104} r={26} fill="#f7c4a0" />
                    <path d="M -10 -104 q 5 3 10 0" stroke="#3b2a20" strokeWidth={2.5} fill="none" />
                  </g>
                ) : (
                  <g transform={`translate(${x0 + 220} 400) rotate(${-30 + 6 * Math.sin(t * 2)})`}>
                    <rect x={-70} y={-28} width={140} height={56} rx={28} fill="#fff" style={sombra(0.2, 2, 5)} />
                    <rect x={0} y={-28} width={70} height={56} rx={28} fill={ROSA} /><rect x={0} y={-28} width={20} height={56} fill={ROSA} />
                  </g>
                )}
                {COMP.map(([txt, , a, b], k) => {
                  const v = g === 0 ? a : b;
                  const u = sm(t, m(g === 0 ? 'meditacion' : 'farmaco') + 0.3 + k * 0.3, m(g === 0 ? 'meditacion' : 'farmaco') + 1 + k * 0.3);
                  return (
                    <g key={k}>
                      <rect x={x0 + 40} y={540 + k * 58} width={360} height={26} rx={13} fill={c.apagado} />
                      <rect x={x0 + 40} y={540 + k * 58} width={360 * v * u} height={26} rx={13} fill={g === 0 ? ROJO_M : VERDE} />
                      {!movil && <Txt f="a" x={x0 + 40} y={530 + k * 58} fontSize={20} fill={c.tenue}>{txt}</Txt>}
                    </g>
                  );
                })}
                <Letrero x={x0 + 220} y={760} texto={g === 0 ? 'Meditación' : 'Pastilla: 30 min'} fondo={g === 0 ? GRIS : VERDE} id={ID} tam={28} />
              </g>
            );
          })}
          {t >= m('millones') && <Letrero x={880} y={300} texto="Miles de millones" fondo={AMBAR} id={ID} tam={28} op={e1(t, m('millones'))} />}
        </g>
      </Toma>

      {/* 3 · La liposucción y el gimnasio */}
      <Toma t={t} a={m('lipo')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('lipo'))}>
          <rect x={120} y={220} width={440} height={460} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Reloj x={340} y={400} r={90} t={t} vel={0.4} aro={VERDE} />
          <Letrero x={340} y={580} texto="Una tarde · 25.000" fondo={VERDE} id={ID} tam={28} />
        </g>
        {t >= m('gimnasio') && (
          <g opacity={e1(t, m('gimnasio'))}>
            <rect x={640} y={220} width={440} height={460} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            {Array.from({ length: 12 }, (_, k) => <rect key={k} x={690 + (k % 6) * 58} y={290 + Math.floor(k / 6) * 70} width={46} height={52} rx={8} fill={k < 12 * sm(t, m('gimnasio'), m('gimnasio') + 2) ? ROJO_M : c.apagado} />)}
            <Pesa x={860} y={490} s={1.2} />
            <Letrero x={860} y={580} texto="12 meses · regatea 100" fondo={ROJO_M} id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
