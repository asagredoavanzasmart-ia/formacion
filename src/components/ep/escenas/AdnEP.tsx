import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Edificio, Corazon, Visto, Suelo, Flujo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * El ADN del mejor lugar de trabajo.
 * 1 · Una doble hélice que se arma en el primer día; HumanClick: el reloj marca siete años en vez de tres; las tres reglas
 *     de Waze como tres peldaños de la hélice.
 * 2 · La curva normal: 2 % asombrosa, 15 % excelente, 33 % buena y 33 % menos que buena; ese tramo se apaga y el resto sube.
 * 3 · Preguntar al equipo: ¿a quién llevarías? y una escala de 1 a 10 que se llena.
 */

const ID = 'ep18', P = 'ep-adn';

export const AdnEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('adn'), 'Se define el primer día'], [m('humanclick'), 'HumanClick'], [m('reglas'), 'Tres reglas'], [m('curva'), 'La curva normal'],
    [m('eleva'), 'Despedir eleva más'], [m('pregunta'), 'Preguntar al equipo'],
  ];
  const arma = sm(t, m('adn'), m('adn') + 2);
  const REGLAS = [{ k: 'apoyar', t: 'Apoyar a los empleados', col: NARANJA }, { k: 'votaran', t: 'Votar como uno', col: ROSA }, { k: 'despedir', t: 'Despedir rápido', col: AZUL_M }];
  /* curva normal en barras */
  const GRUPOS = [{ k: 'menos', p: 33, n: 'Menos que buena', col: GRIS }, { k: 'buena', p: 33, n: 'Buena', col: AZUL_M }, { k: 'quince', p: 15, n: 'Excelente', col: ROSA }, { k: 'dos', p: 2, n: 'Asombrosa', col: NARANJA }];
  const apaga = sm(t, m('eleva'), m('eleva') + 1.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El ADN del mejor lugar de trabajo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la hélice, HumanClick y las reglas */}
      <Toma t={t} a={0} b={m('curva')} cy={470}>
        {Array.from({ length: 12 }, (_, k) => {
          const y = 190 + k * 46, dx = 70 * Math.sin(k * 0.7 + t * 1.6);
          return k / 12 <= arma ? <g key={k}><line x1={300 + dx} y1={y} x2={300 - dx} y2={y} stroke={c.apagado} strokeWidth={6} /><circle cx={300 + dx} cy={y} r={14} fill={NARANJA} /><circle cx={300 - dx} cy={y} r={14} fill={ROSA} /></g> : null;
        })}
        {t >= m('humanclick') && t < m('reglas') && <g opacity={e1(t, m('humanclick'))}>
          <Edificio x={820} y={640} w={240} h={260} color={AZUL_M} />
          <Letrero x={820} y={700} texto="HumanClick" fondo={AZUL_M} id={ID} tam={26} />
          <Txt x={820} y={300} textAnchor="middle" fontSize={72} fill={NARANJA}>{t >= m('siete') ? '7' : '3'}</Txt>
          <Txt f="a" x={820} y={340} textAnchor="middle" fontSize={26} fill={c.tenue}>años</Txt>
          {t >= m('mejor') && <Corazon x={960} y={300} s={0.8} />}
        </g>}
        {t >= m('reglas') && REGLAS.map((r, k) => t >= m(r.k) && (
          <g key={r.k} opacity={e1(t, m(r.k))} transform={`translate(800 ${290 + k * 150})`}>
            <rect x={-260} y={-50} width={520} height={100} rx={24} fill={c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
            <rect x={-260} y={-50} width={16} height={100} rx={8} fill={r.col} />
            <Txt f="a" x={-220} y={10} fontSize={30} fill={c.texto}>{r.t}</Txt>
          </g>
        ))}
        {t >= m('desercion') && <Letrero x={800} y={760} texto="Deserción muy baja" fondo={VERDE} id={ID} op={e1(t, m('desercion'))} />}
      </Toma>

      {/* 2 · la curva */}
      <Toma t={t} a={m('curva')} b={m('pregunta')} cy={470}>
        <path d="M 150 680 C 350 680 380 260 600 260 C 820 260 850 680 1050 680" fill={c.panel2} opacity={e1(t, m('curva'))} />
        {GRUPOS.map((g, k) => {
          const on = e1(t, m(g.k));
          const x = 230 + k * 210, h = 60 + g.p * 9;
          const off = k === 0 ? apaga : 0;
          const up = k > 0 ? 20 * apaga : 0;
          return <g key={g.k} opacity={on * (1 - 0.75 * off)}>
            <rect x={x - 80} y={680 - h - up} width={160} height={h} rx={16} fill={g.col} />
            <Txt x={x} y={660 - h - up - 10} textAnchor="middle" fontSize={44} fill={c.texto}>{g.p} %</Txt>
            <Txt f="a" x={x} y={720} textAnchor="middle" fontSize={24} fill={c.tenue}>{g.n}</Txt>
          </g>;
        })}
        {t >= m('menos') && <Letrero x={230} y={790} texto="No debería estar" fondo={GRIS} id={ID} op={e1(t, m('menos') + 0.6)} tam={24} />}
        {t >= m('eleva') && <Letrero x={760} y={790} texto="La confianza sube" fondo={VERDE} id={ID} op={e1(t, m('eleva') + 0.6)} tam={24} />}
      </Toma>

      {/* 3 · preguntar al equipo */}
      <Toma t={t} a={m('pregunta')} b={fin + 1} cy={470}>
        <Suelo y={700} isDark={isDark} x0={80} x1={1120} />
        {[0, 1, 2, 3, 4].map((k) => <Persona key={k} id={ID} x={200 + k * 120} y={700} s={0.55} cuerpo={[NARANJA, ROSA, AZUL_M, VERDE, VIOLETA][k]} />)}
        {[0, 1, 2].map((k) => <rect key={k} x={210 + k * 130} y={380 - 30 * Math.sin(t * 2 + k)} width={70} height={46} rx={14} fill="#fff" opacity={e1(t, m('pregunta') + 0.3 * k)} style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.25))' }} />)}
        {[0, 1, 2].map((k) => <Txt key={`q${k}`} x={245 + k * 130} y={414 - 30 * Math.sin(t * 2 + k)} textAnchor="middle" fontSize={30} fill={NARANJA} opacity={e1(t, m('pregunta') + 0.3 * k)}>?</Txt>)}
        {t >= m('escala') && <g opacity={e1(t, m('escala'))}>
          {Array.from({ length: 10 }, (_, k) => <rect key={k} x={820 + (k % 5) * 56} y={300 + Math.floor(k / 5) * 70} width={46} height={56} rx={10} fill={k < Math.round(10 * sm(t, m('escala'), m('escala') + 2)) ? VERDE : c.apagado} />)}
          <Txt f="a" x={950} y={470} textAnchor="middle" fontSize={26} fill={c.tenue}>¿Cuánto lo lamentarías?</Txt>
        </g>}
        {t >= m('credibilidad') && <Letrero x={600} y={790} texto="Preguntar obliga a actuar" id={ID} op={e1(t, m('credibilidad'))} />}
        {t >= m('credibilidad') && <Visto x={1060} y={620} r={30} op={e1(t, m('credibilidad') + 0.4)} />}
      </Toma>
    </Lienzo>
  );
};
