import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Calendario, Burbuja, Visto, Cruz, Suelo, Hoja, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Contratar bien.
 * 1 · Cuándo, a quién y cómo, como tres puertas: noventa días marcados; generalistas que se vuelven especialistas;
 *     la cebolla de la entrevista que se pela capa por capa hasta el «no lo sé».
 * 2 · La lista del gran líder: las cualidades se escriben una a una y «venir de la industria» se tacha.
 * 3 · El acuerdo de fundadores con una consolidación larga: las acciones se liberan año a año.
 */

const ID = 'ep19', P = 'ep-contratar';

export const ContratarEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('cuando'), 'Cuándo'], [m('aquien'), 'A quién'], [m('como'), 'Cómo'], [m('capas'), 'Entrevistar por capas'], [m('ochenta'), 'Acertar el 80 %'],
    [m('refundit'), 'Qué hace a un gran líder'], [m('consolidacion'), 'Una consolidación larga'],
  ];
  const capas = Math.floor(4 * sm(t, m('cebolla'), m('ochenta')));
  const LISTA = ['Nunca renuncia', 'El equipo lo sigue', 'Escucha a los clientes', 'Decide lo difícil', 'Arma equipos fuertes', 'Informa con exactitud'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Contratar bien">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · cuándo, a quién, cómo */}
      <Toma t={t} a={0} b={m('refundit')} cy={470}>
        {/* cuándo */}
        <g opacity={e1(t, m('cuando'))} transform="translate(220 380)">
          <Calendario x={0} y={0} s={1} marcados={Math.floor(14 * sm(t, m('noventa'), m('noventa') + 2))} />
          <Letrero x={0} y={130} texto="90 días" fondo={ROSA} id={ID} tam={26} />
        </g>
        {t >= m('ventas') && t < m('aquien') + 1 && <Letrero x={220} y={600} texto="Ventas antes de tiempo: clientes molestos" fondo={GRIS} id={ID} op={e1(t, m('ventas'))} tam={22} />}
        {/* a quién */}
        {t >= m('aquien') && <g opacity={e1(t, m('aquien'))}>
          <Persona id={ID} x={600} y={560} s={0.75} cuerpo={t >= m('especialistas') ? VIOLETA : AZUL_M} />
          {t < m('especialistas') ? [0, 1, 2].map((k) => <circle key={k} cx={600 + Math.cos(t * 2 + k * 2.1) * 90} cy={420 + Math.sin(t * 2 + k * 2.1) * 30} r={14} fill={[NARANJA, VERDE, AMBAR][k]} />)
            : <circle cx={600} cy={360} r={18} fill={VIOLETA} />}
          <Letrero x={600} y={620} texto={t >= m('especialistas') ? 'Después: especialistas' : 'Al inicio: generalistas'} fondo={t >= m('especialistas') ? VIOLETA : AZUL_M} id={ID} tam={24} />
          {t >= m('lograr') && <Letrero x={600} y={700} texto="Qué lograr, no qué hacer" fondo={VERDE} id={ID} op={e1(t, m('lograr'))} tam={22} />}
        </g>}
        {/* cómo: la cebolla */}
        {t >= m('como') && <g opacity={e1(t, m('como'))} transform="translate(960 400)">
          {[110, 86, 62, 38].map((r, k) => k >= capas && <ellipse key={r} cx={0} cy={0} rx={r} ry={r * 1.08} fill={['#d8b4fe', '#c084fc', '#a855f7', '#7e22ce'][k]} />)}
          <path d="M -10 -110 Q 0 -150 10 -110" stroke={VERDE} strokeWidth={8} fill="none" opacity={capas < 1 ? 1 : 0} />
          {capas >= 4 && <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={28} fill={c.texto}>«No lo sé»</Txt>}
        </g>}
        {t >= m('como') && <Letrero x={960} y={600} texto={t >= m('referencias') && t < m('capas') ? 'Referencias primero' : 'Qué hizo y por qué'} fondo={VIOLETA} id={ID} op={e1(t, m('como'))} tam={24} />}
        {t >= m('ochenta') && <Letrero x={600} y={790} texto="Aciertas un 80 %: despedir rápido corrige el resto" id={ID} op={e1(t, m('ochenta'))} tam={24} />}
      </Toma>

      {/* 2 · la lista del gran líder */}
      <Toma t={t} a={m('refundit')} b={m('consolidacion')} cy={470}>
        <rect x={300} y={160} width={600} height={620} rx={24} fill={isDark ? '#1f2937' : '#f8fafc'} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
        <Txt x={600} y={220} textAnchor="middle" fontSize={32} fill={NARANJA}>Un gran líder</Txt>
        {LISTA.map((l, k) => {
          const t0 = m('lista') + 0.6 * k;
          return t >= t0 && <g key={l} opacity={e1(t, t0)}><Visto x={360} y={280 + k * 70} r={18} /><Txt f="a" x={396} y={290 + k * 70} fontSize={28} fill={c.texto}>{l}</Txt></g>;
        })}
        {t >= m('industria') && <g opacity={e1(t, m('industria'))}>
          <Txt f="a" x={396} y={290 + 6 * 70} fontSize={28} fill={c.tenue}>Venir de la industria</Txt>
          <line x1={390} y1={280 + 6 * 70} x2={lerp(390, 720, sm(t, m('industria') + 0.4, m('industria') + 1))} y2={280 + 6 * 70} stroke="#e5484d" strokeWidth={6} />
          <Cruz x={360} y={280 + 6 * 70} r={18} />
        </g>}
      </Toma>

      {/* 3 · consolidación larga */}
      <Toma t={t} a={m('consolidacion')} b={fin + 1} cy={470}>
        <Hoja x={300} y={420} w={220} h={280} lineas={7} op={e1(t, m('consolidacion'))} />
        <Txt f="a" x={300} y={600} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={e1(t, m('consolidacion'))}>Acuerdo de fundadores</Txt>
        {[0, 1, 2, 3].map((k) => {
          const v = sm(t, m('consolidacion') + 0.5 + 0.6 * k, m('consolidacion') + 1.1 + 0.6 * k);
          return <g key={k}>
            <rect x={600 + k * 140} y={600 - 220 * v} width={110} height={220 * v} rx={14} fill={[NARANJA, ROSA, AZUL_M, VIOLETA][k]} />
            <Txt f="a" x={655 + k * 140} y={640} textAnchor="middle" fontSize={24} fill={c.tenue}>Año {k + 1}</Txt>
          </g>;
        })}
        <Letrero x={760} y={720} texto="Si un fundador se va, las acciones vuelven" fondo={GRIS} id={ID} op={e1(t, m('consolidacion') + 2.5)} tam={22} />
      </Toma>
    </Lienzo>
  );
};
