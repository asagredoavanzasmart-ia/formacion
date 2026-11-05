import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Perro, Caja, Lista, Suelo, Destello, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Prioridad, en singular.
 * Toma 1: un solo podio «1» con la bandera de la prioridad; se divide en cinco podios Pri-1 a Pri-5 y todos se hunden.
 * Toma 2 (Seligman y Maier): el perro que detiene la descarga con una palanca; la caja con la barrera baja: un perro salta,
 * el otro ni lo intenta.
 * Toma 3: dos reacciones (rendirse, aceptar todo), otra persona que escribe la lista por ti, y la elección que vuelve.
 */

const ID = 'es03', P = 'es-prioridad';

const Podio: React.FC<{ x: number; y: number; w: number; h: number; color: string; texto: string; tam?: number }> = ({ x, y, w, h, color, texto, tam = 34 }) => (
  <g>
    <rect x={x - w / 2} y={y - h} width={w} height={h} rx={10} fill={color} />
    <rect x={x - w / 2} y={y - h} width={w} height={16} rx={8} fill="#fff" opacity={0.25} />
    {h > 50 && <Txt x={x} y={y - h + 60} textAnchor="middle" fontSize={tam} fill="#fff">{texto}</Txt>}
  </g>
);

const Rayos: React.FC<{ x: number; y: number; w: number; t: number; op: number }> = ({ x, y, w, t, op }) => op < 0.01 ? null : (
  <g opacity={op}>{Array.from({ length: 5 }, (_, k) => <path key={k} d={`M ${x + k * (w / 5) + 10} ${y} l 10 -18 l -8 0 l 10 -18`} stroke="#facc15" strokeWidth={4} fill="none" opacity={0.4 + 0.6 * Math.abs(Math.sin(t * 9 + k))} />)}</g>
);

export const PrioridadES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('singular'), 'Prioridad: lo primero'], [m('plural'), 'El plural llegó después'], [m('pri'), 'Pri-1 a Pri-5'], [m('ninguna'), 'Ninguna lo era'],
    [m('seligman'), 'Indefensión aprendida'], [m('caja'), 'Saltar para escapar'], [m('intentaron'), 'Ni lo intentaron'], [m('reacciones'), 'Dos reacciones'],
    [m('regla'), 'Alguien elegirá por ti'], [m('capacidad'), 'Elegir es una acción'],
  ];
  const div = sm(t, m('plural'), m('pri') + 0.8);
  const hunde = sm(t, m('ninguna'), m('ninguna') + 1.2);
  const salto = (k: number) => { const u = ((t - m('caja') - 0.6) * 0.5 + k * 0.5) % 1; return u < 0.5 ? Math.sin(Math.PI * u * 2) * 110 : 0; };

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Prioridad, en singular">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · un podio, luego cinco */}
      <Toma t={t} a={0} b={m('seligman')} cy={480}>
        <Suelo y={700} isDark={isDark} x0={100} x1={1100} />
        {div < 0.99 && (
          <g opacity={1 - div}>
            <Podio x={600} y={700} w={260} h={300} color={NARANJA} texto="1" tam={90} />
            <Txt x={600} y={340} textAnchor="middle" fontSize={44} fill={c.texto} opacity={e1(t, m('singular'))}>Prioridad</Txt>
          </g>
        )}
        {div > 0.01 && [0, 1, 2, 3, 4].map((k) => {
          const x = lerp(600, 200 + k * 200, div);
          const h = lerp(300, 300, div) * (1 - 0.82 * hunde);
          return <g key={k} opacity={div}><Podio x={x} y={700} w={150} h={h} color={hunde > 0.5 ? GRIS : [NARANJA, ROSA, AZUL_M, VIOLETA, VERDE][k]} texto={`Pri-${k + 1}`} tam={36} /></g>;
        })}
        {t >= m('ninguna') && <Letrero x={600} y={300} texto="Ninguna es prioridad" fondo={GRIS} id={ID} tam={32} op={e1(t, m('ninguna'))} />}
      </Toma>

      {/* 2 · el experimento */}
      <Toma t={t} a={m('seligman')} b={m('reacciones')} cy={480}>
        {ventana(t, m('seligman'), m('caja')) > 0.01 && (
          <g opacity={ventana(t, m('seligman'), m('caja'))}>
            <rect x={300} y={600} width={600} height={24} rx={8} fill={c.apagado} />
            <Rayos x={330} y={600} w={540} t={t} op={1 - sm(t, m('palanca') + 0.6, m('palanca') + 1)} />
            <Perro x={560} y={600} s={2} />
            <g opacity={e1(t, m('palanca'))}>
              <rect x={760} y={480} width={16} height={120} rx={8} fill="#475569" transform={`rotate(${-30 + 50 * sm(t, m('palanca') + 0.3, m('palanca') + 0.7)} 768 600)`} />
              <circle cx={768} cy={600} r={18} fill="#334155" />
              <Txt x={768} y={680} textAnchor="middle" fontSize={30} fill={c.texto}>Palanca</Txt>
            </g>
            <Txt f="a" x={600} y={300} textAnchor="middle" fontSize={32} fill={c.texto} opacity={e1(t, m('seligman'))}>Martin Seligman y Steve Maier</Txt>
          </g>
        )}
        {t >= m('caja') && (
          <g opacity={e1(t, m('caja'))}>
            {[0, 1].map((k) => {
              const y0 = 420 + k * 280;
              const sin = k === 1 && t >= m('intentaron');
              return (
                <g key={k}>
                  <rect x={160} y={y0} width={880} height={18} rx={6} fill={c.apagado} />
                  <rect x={590} y={y0 - 70} width={20} height={70} rx={6} fill="#94a3b8" />
                  <Rayos x={180} y={y0} w={400} t={t} op={1} />
                  <Perro x={k === 0 ? lerp(380, 820, sm(t, m('caja') + 0.8, m('caja') + 1.6)) : 380} y={y0} s={1.8} salto={k === 0 ? salto(0) * (1 - sm(t, m('caja') + 1.6, m('caja') + 1.7)) : 0} animo={sin ? 0 : 1} color={k ? '#92400e' : '#b45309'} />
                  <Txt f="a" x={900} y={y0 - 30} textAnchor="middle" fontSize={26} fill={c.texto}>{k === 0 ? 'Salta' : sin ? 'Ni lo intenta' : ''}</Txt>
                </g>
              );
            })}
          </g>
        )}
      </Toma>

      {/* 3 · dos reacciones y la elección */}
      <Toma t={t} a={m('reacciones')} b={fin + 1} cy={480}>
        <Suelo y={720} isDark={isDark} x0={120} x1={1080} />
        <g opacity={e1(t, m('rinden'))}>
          <Persona id={ID} x={320} y={720} s={0.8} cuerpo={GRIS} ojos={0.1} />
          <Txt x={320} y={790} textAnchor="middle" fontSize={30} fill={c.texto}>Se rinde</Txt>
        </g>
        <g opacity={e1(t, m('aceptan'))}>
          <Persona id={ID} x={880} y={720} s={1} cuerpo={NARANJA} ojos={0.5} />
          {[0, 1, 2, 3, 4].map((k) => <Caja key={k} x={880 + (k % 2 ? 8 : -8)} y={530 - k * 54} w={100} h={50} />)}
          <Txt x={880} y={790} textAnchor="middle" fontSize={30} fill={c.texto}>Acepta todo</Txt>
        </g>
        {t >= m('regla') && (
          <g opacity={e1(t, m('regla')) * (1 - sm(t, m('capacidad'), m('capacidad') + 0.6))}>
            <Persona id={ID} x={600} y={560} s={0.9} cuerpo="#334155" corbata />
            <Lista x={600} y={280} s={0.6} n={4} hechos={0} c={c} titulo="Tus prioridades" />
          </g>
        )}
        {t >= m('capacidad') && (
          <g opacity={e1(t, m('capacidad'))}>
            <Persona id={ID} x={600} y={620} s={1.05} cuerpo={VERDE} />
            {[0, 1, 2, 3].map((k) => <Destello key={k} x={600 + 120 * Math.cos(t * 1.5 + k * 1.57)} y={460 + 60 * Math.sin(t * 1.5 + k * 1.57)} r={16} />)}
            <Letrero x={600} y={300} texto="Las opciones pueden quitarse; elegir, no" id={ID} tam={30} />
          </g>
        )}
        {!movil && t >= m('regla') && t < m('capacidad') && <Txt f="a" x={600} y={200} textAnchor="middle" fontSize={22} fill={c.tenue}>Si no eliges, alguien más lo hará</Txt>}
      </Toma>
    </Lienzo>
  );
};
