import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Auto, Bus, Burbuja, Curva, Cifra, Flujo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * El crecimiento que se repite.
 * 1 · El día Tim Cook: un pico que se duplica y en una semana se desinfla.
 * 2 · La escalera ×10, ×5, ×4, ×3, ×2 y los usuarios de Waze: 2,3, 10,6, 33 y unos 50 millones.
 * 3 · Viral frente a boca a boca: en el auto alguien pregunta «¿qué es eso?»; en el paradero, «¿cómo sabes que llega en tres
 *     minutos?»; la curva en palo de hockey de Moovit: 436 días el primer millón, 19 horas el último.
 */

const ID = 'ep25', P = 'ep-crecer';

export const CrecerEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('dificil'), 'El viaje más difícil'], [m('cook'), 'El día Tim Cook'], [m('repite'), 'Un resultado que se repite'], [m('dos3'), 'Usuarios de Waze'],
    [m('viral'), 'Viral y boca a boca'], [m('hockey'), 'Palo de hockey'],
  ];
  /* pico: línea base, sube al doble y vuelve */
  const pico = (x: number) => { const p = sm(t, m('duplicaron'), m('duplicaron') + 0.8) * (1 - 0.9 * sm(t, m('esfumado'), m('esfumado') + 1.5)); return x > 560 && x < 680 ? 1 + p * Math.exp(-((x - 600) ** 2) / 900) : 1; };
  const ESC = ['×10', '×5', '×4', '×3', '×2'];
  const USU = [{ k: 'dos3', v: '2,3' }, { k: 'diez6', v: '10,6' }, { k: 'treinta', v: '33' }, { k: 'cincuenta', v: '~50' }];
  const hockey = Array.from({ length: 30 }, (_, k): [number, number] => [200 + k * 28, 700 - 520 * Math.pow(k / 29, 4)]);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El crecimiento que se repite">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el día Tim Cook */}
      <Toma t={t} a={0} b={m('repite')} cy={470}>
        <rect x={160} y={700} width={880} height={8} rx={4} fill={c.apagado} />
        <path d={`M 160 700 ${Array.from({ length: 89 }, (_, k) => { const x = 160 + k * 10; return `L ${x} ${700 - 200 * pico(x)}`; }).join(' ')} L 1040 700 Z`} fill={NARANJA} opacity={0.75 * e1(t, m('dificil'))} />
        {t >= m('cook') && <Letrero x={600} y={220} texto="Tim Cook recomienda Waze" fondo={AZUL_M} id={ID} op={e1(t, m('cook'))} tam={26} />}
        {t >= m('duplicaron') && t < m('esfumado') && <Letrero x={860} y={320} texto="Descargas ×2" id={ID} op={e1(t, m('duplicaron'))} tam={26} />}
        {t >= m('esfumado') && <Letrero x={860} y={420} texto="Una semana después: nada" fondo={GRIS} id={ID} op={e1(t, m('esfumado'))} tam={24} />}
      </Toma>

      {/* 2 · la escalera y los usuarios */}
      <Toma t={t} a={m('repite')} b={m('viral')} cy={470}>
        {t < m('dos3') ? ESC.map((x, k) => {
          const t0 = (k === 0 ? m('diez') : m('cinco') + 0.5 * (k - 1));
          return t >= t0 && <g key={x} opacity={e1(t, t0)}>
            <rect x={160 + k * 180} y={700 - (k + 1) * 90} width={160} height={(k + 1) * 90} rx={16} fill={[NARANJA, ROSA, VIOLETA, AZUL_M, VERDE][k]} />
            <Txt x={240 + k * 180} y={680 - (k + 1) * 90} textAnchor="middle" fontSize={44} fill={c.texto}>{x}</Txt>
            <Txt f="a" x={240 + k * 180} y={740} textAnchor="middle" fontSize={24} fill={c.tenue}>Año {k + 1}</Txt>
          </g>;
        }) : <g>
          {USU.map((u, k) => t >= m(u.k) && (
            <g key={u.k} opacity={e1(t, m(u.k))}>
              <circle cx={250 + k * 240} cy={460} r={40 + [0.23, 1.06, 3.3, 5][k] * 18} fill={AZUL_M} opacity={0.85} />
              <Txt x={250 + k * 240} y={474} textAnchor="middle" fontSize={40} fill="#fff">{u.v}</Txt>
              <Txt f="a" x={250 + k * 240} y={700} textAnchor="middle" fontSize={24} fill={c.tenue}>{['fin de 2010', '2011', '2012', 'al venderla'][k]}</Txt>
            </g>
          ))}
          <Txt f="a" x={600} y={760} textAnchor="middle" fontSize={26} fill={c.tenue}>millones de usuarios de Waze</Txt>
        </g>}
      </Toma>

      {/* 3 · boca a boca y palo de hockey */}
      <Toma t={t} a={m('viral')} b={fin + 1} cy={470}>
        {t < m('hockey') ? <g>
          {t < m('boca') ? <g opacity={e1(t, m('viral'))}>
            {[0, 1].map((k) => <Persona key={k} id={ID} x={460 + k * 280} y={620} s={0.7} cuerpo={[VERDE, ROSA][k]} />)}
            <path d="M 520 470 Q 600 400 680 470" stroke={VERDE} strokeWidth={8} fill="none" />
            <Letrero x={600} y={700} texto="Viral: no funciona si el otro no la tiene" fondo={VERDE} id={ID} tam={22} />
          </g> : <g>
            <Auto x={330} y={460} s={1.1} color={NARANJA} />
            {t >= m('auto') && <Burbuja x={150} y={170} w={340} texto="¿Qué es eso?" u={sm(t, m('auto'), m('auto') + 1)} c={c} id={ID} />}
            {t >= m('paradero') && <g opacity={e1(t, m('paradero'))}>
              <rect x={760} y={330} width={14} height={260} fill="#64748b" /><rect x={720} y={300} width={100} height={60} rx={10} fill={VIOLETA} />
              {[0, 1].map((k) => <Persona key={k} id={ID} x={860 + k * 110} y={600} s={0.55} cuerpo={[AZUL_M, AMBAR][k]} />)}
              {!movil && <Burbuja x={640} y={130} w={500} texto="¿Cómo sabes que llega en 3 min?" u={sm(t, m('paradero'), m('paradero') + 1.2)} c={c} id={ID} lado="der" />}
            </g>}
            <Letrero x={600} y={760} texto="Boca a boca: depende de la frecuencia" id={ID} op={e1(t, m('boca'))} tam={24} />
          </g>}
        </g> : <g>
          <Curva pts={hockey} u={sm(t, m('hockey'), m('hockey') + 2)} color={NARANJA} />
          <rect x={200} y={700} width={820} height={6} rx={3} fill={c.apagado} />
          {t >= m('dias') && <Letrero x={360} y={600} texto="Primer millón: 436 días" fondo={GRIS} id={ID} op={e1(t, m('dias'))} tam={24} />}
          {t >= m('horas') && <Letrero x={880} y={200} texto="Último millón: 19 horas" id={ID} op={e1(t, m('horas'))} tam={24} />}
        </g>}
      </Toma>
    </Lienzo>
  );
};
