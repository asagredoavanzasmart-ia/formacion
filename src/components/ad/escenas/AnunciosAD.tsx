import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Megafono, Pin, Burbuja, Telefono, Reloj, Gente, Flecha, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Anuncios pagados.
 * Toma 1: una tira de anuncio en un teléfono gigante, dividida en tres tramos (llamado inicial, desarrollo, llamado a la
 * acción); una barra de tiempo marca los primeros cinco segundos que pesan el 80 %. Las cuatro armas del llamado
 * aparecen: etiqueta local, pregunta de sí, condicional y el portavoz que se parece al cliente.
 * Toma 2: la matriz qué / quién / cuándo: la ecuación del valor con sus opuestos (pesadilla, riesgo, lentitud,
 * sacrificio), las personas que dan estatus (pareja, socios, competidores) y una línea pasado–presente–futuro.
 * Toma 3: la flecha del cierre lleva a un sitio de captura con las mismas palabras del anuncio.
 */

const ID = 'ad23', P = 'ad-anuncios';

export const AnunciosAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('partes'), 'Tres partes'], [m('ochenta'), 'Los primeros cinco segundos'], [m('matriz'), 'Qué, quién y cuándo'], [m('cierre'), 'Una instrucción explícita'],
  ];
  const ARMAS: [string, string, string][] = [['etiquetas', 'Etiqueta local', AZUL_M], ['si', 'Pregunta de sí', VERDE], ['condicionales', 'Si… entonces', VIOLETA], ['portavoz', 'Como el cliente', NARANJA]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Anuncios pagados">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Las tres partes y los cinco segundos */}
      <Toma t={t} a={0} b={m('matriz')} cy={470}>
        <g opacity={e1(t, m('partes'))}>
          <rect x={120} y={170} width={960} height={110} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
          {([['Llamado inicial', 120, 220, NARANJA], ['Desarrollo de valor', 340, 520, VIOLETA], ['Llamado a la acción', 860, 220, VERDE]] as const).map(([txt, x, w, col], k) => (
            <g key={txt} opacity={sm(t, m('inicial') + k * 0.4, m('inicial') + k * 0.4 + 0.5)}>
              <rect x={x + 8} y={180} width={w - 16} height={90} rx={18} fill={col} />
              <Txt f="a" x={x + w / 2} y={236} textAnchor="middle" fontSize={movil ? 22 : 24} fill="#fff">{txt}</Txt>
            </g>
          ))}
        </g>
        {t >= m('ochenta') && (
          <g opacity={e1(t, m('ochenta'))}>
            <path d="M 230 290 L 230 340" stroke={NARANJA} strokeWidth={8} />
            <Letrero x={230} y={370} texto="80 % del éxito" fondo={NARANJA} id={ID} tam={28} />
            <Reloj x={480} y={370} r={46} t={t} vel={2} />
            <Txt x={560} y={384} fontSize={34} fill={c.texto} peso={800}>5 s</Txt>
          </g>
        )}
        {ARMAS.map(([n, txt, col], k) => {
          const x = 210 + k * 260;
          return (
            <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0}>
              <rect x={x - 115} y={460} width={230} height={290} rx={26} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
              <g transform={`translate(${x} 580)`}>
                {k === 0 && <Pin x={0} y={30} s={1.3} color={col} />}
                {k === 1 && <g><circle r={50} fill={col} /><Txt x={0} y={16} textAnchor="middle" fontSize={44} fill="#fff" peso={800}>Sí</Txt></g>}
                {k === 2 && <g><rect x={-70} y={-30} width={60} height={60} rx={12} fill={col} /><path d="M -4 0 H 20" stroke={col} strokeWidth={8} /><path d="M 20 -12 L 34 0 L 20 12 Z" fill={col} /><rect x={36} y={-30} width={60} height={60} rx={12} fill={col} opacity={0.6} /></g>}
                {k === 3 && <Persona id={ID} x={0} y={70} s={0.5} cuerpo={col} />}
              </g>
              <Letrero x={x} y={710} texto={txt} fondo={col} id={ID} tam={22} />
            </g>
          );
        })}
      </Toma>

      {/* 2 · Qué, quién y cuándo */}
      <Toma t={t} a={m('matriz')} b={m('cierre')} cy={470}>
        <g opacity={e1(t, m('matriz'))}>
          {([['que', 'Qué', 200, ROSA], ['quien', 'Quién', 600, VIOLETA], ['cuando', 'Cuándo', 1000, AZUL_M]] as const).map(([n, txt, x, col], k) => (
            <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.18}>
              <rect x={x - 180} y={170} width={360} height={580} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
              <Letrero x={x} y={220} texto={txt} fondo={col} id={ID} tam={32} />
              {k === 0 && (['Pesadilla', 'Riesgo', 'Lentitud', 'Sacrificio'] as const).map((s, j) => (
                <g key={s} opacity={sm(t, m('opuestos') + j * 0.3, m('opuestos') + j * 0.3 + 0.5)}>
                  <rect x={x - 140} y={290 + j * 104} width={280} height={84} rx={18} fill={ROJO_M} opacity={0.85} />
                  <Txt f="a" x={x} y={342 + j * 104} textAnchor="middle" fontSize={28} fill="#fff">{s}</Txt>
                </g>
              ))}
              {k === 1 && <g><Persona id={ID} x={x} y={480} s={0.6} cuerpo={NARANJA} /><Gente x={x - 120} y={680} n={4} activos={4} color={col} paso={80} s={0.55} />
                {!movil && <Txt f="a" x={x} y={720} textAnchor="middle" fontSize={22} fill={c.tenue}>pareja · socios · competencia</Txt>}</g>}
              {k === 2 && <g><path d={`M ${x} 300 V 700`} stroke={c.apagado} strokeWidth={10} />{(['Pasado', 'Presente', 'Futuro'] as const).map((s, j) => <g key={s}><circle cx={x} cy={340 + j * 160} r={28} fill={col} opacity={0.4 + 0.6 * (Math.floor(t) % 3 === j ? 1 : 0)} /><Txt f="a" x={x + 50} y={350 + j * 160} fontSize={28} fill={c.texto}>{s}</Txt></g>)}</g>}
            </g>
          ))}
        </g>
      </Toma>

      {/* 3 · El cierre hacia el sitio de captura */}
      <Toma t={t} a={m('cierre')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('cierre'))}>
          <Megafono x={180} y={450} s={1.1} habla={1} t={t} />
          <Burbuja x={300} y={300} w={360} texto="Agenda tu diagnóstico" u={sm(t, m('cierre'), m('cierre') + 1)} c={c} id={ID} tam={30} marca />
          <Flecha x1={520} y1={480} x2={700} y2={480} u={sm(t, m('captura'), m('captura') + 0.7)} color={VERDE} grosor={14} />
        </g>
        {t >= m('captura') && (
          <g opacity={e1(t, m('captura'))}>
            <rect x={740} y={220} width={360} height={520} rx={30} fill="#1e293b" />
            <rect x={758} y={240} width={324} height={480} rx={18} fill={c.panel} />
            <Txt f="a" x={920} y={310} textAnchor="middle" fontSize={26} fill={c.texto}>Agenda tu diagnóstico</Txt>
            {[0, 1].map((k) => <rect key={k} x={790} y={360 + k * 80} width={260} height={56} rx={12} fill={c.panel2} />)}
            <rect x={790} y={560} width={260} height={66} rx={33} fill={VERDE} />
            <Txt x={920} y={604} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>Enviar</Txt>
            <Letrero x={920} y={790} texto="Mismo lenguaje del anuncio" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
