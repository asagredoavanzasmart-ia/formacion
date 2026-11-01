import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Cruz, Visto, Rotulo, Persona, Txt, Calendario, Flujo, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Del organigrama actual al ideal», en tres tomas sobre el mismo organigrama.
 * 1 · Dos maneras sin reorganizar toda la empresa: formal (las tres operaciones reportan a un líder) o informal
 *     (cada una con su jefe, pero se reúnen periódicamente). La meta: que alguien mire el ciclo completo.
 * 2 · Los tres modos: silos (bloques aislados con chispas de fricción entre ellos), estructura formal (líneas a un
 *     líder de RevOps) y cadencia informal (una mesa que los junta cada semana).
 * 3 · Tres preguntas: el organigrama actual, el ideal y la ruta entre ambos, con apoyos.
 */

const ID = 'ro45';
const nombres = ['dos', 'formal', 'mismoLider', 'informal', 'reunen', 'resultado', 'ciclo', 'tres', 'silos', 'friccion', 'estructura', 'reorganizacion', 'cadencia', 'entrada', 'preguntas', 'actual', 'ideal', 'ruta', 'apoyo', 'pregunta'] as const;
type N = typeof nombres[number];

const OPS = [{ txt: 'Marketing Ops', col: AMBAR, k: 'mkt' as const }, { txt: 'Sales Ops', col: NARANJA, k: 'ven' as const }, { txt: 'CS Ops', col: TEAL, k: 'ser' as const }];

export const SilosRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Dos maneras'], [m('formal'), 'Estructura formal'], [m('informal'), 'Cadencia informal'], [m('resultado'), 'Alguien mira el ciclo'],
    [m('silos'), 'Silos'], [m('estructura'), 'Estructura formal'], [m('cadencia'), 'Cadencia informal'], [m('preguntas'), 'Tres preguntas'],
  ];

  /* modo: 0 silos, 1 formal, 2 informal */
  const modo = (t >= m('cadencia') ? 2 : t >= m('estructura') ? 1 : t >= m('silos') ? 0 : t >= m('informal') ? 2 : t >= m('formal') ? 1 : -1);
  const OX = [260, 600, 940];

  const Org = ({ y0 = 520 }: { y0?: number }) => (
    <g>
      {OPS.map((o, k) => (
        <g key={o.txt}>
          {modo === 0 && <rect x={OX[k] - 140} y={y0 - 150} width={280} height={260} rx={20} fill="#93c5fd" opacity={0.18} />}
          <rect x={OX[k] - 120} y={y0} width={240} height={90} rx={18} fill={o.col} />
          <Txt f="a" x={OX[k]} y={y0 + 54} textAnchor="middle" fontSize={24} fill="#fff" peso={700}>{o.txt}</Txt>
          <Equipo id={ID} k={o.k} x={OX[k]} y={y0 - 10} s={0.42} t={t} nombre={false} />
          {/* jefe propio (informal) */}
          {modo === 2 && <g><rect x={OX[k] - 70} y={y0 + 170} width={140} height={60} rx={14} fill={PIZARRA} /><Txt f="a" x={OX[k]} y={y0 + 208} textAnchor="middle" fontSize={20} fill="#fff">Su jefe</Txt><rect x={OX[k] - 3} y={y0 + 90} width={6} height={80} fill={c.apagado} /></g>}
        </g>
      ))}
      {modo === 0 && [0, 1].map((k) => [0, 1, 2].map((j) => { const ph = (t * 1.5 + j / 3 + k * 0.4) % 1; return <path key={`${k}-${j}`} d="M 0 -10 l 6 8 l -4 2 l 6 10 l -12 -10 l 4 -2 Z" fill={ROJO_M} opacity={1 - ph} transform={`translate(${(OX[k] + OX[k + 1]) / 2 + (j - 1) * 12} ${y0 + 20 - ph * 40}) scale(1.4)`} />; }))}
      {modo === 1 && <g>
        <rect x={480} y={y0 - 300} width={240} height={90} rx={18} fill={VIOLETA} /><Txt f="a" x={600} y={y0 - 246} textAnchor="middle" fontSize={24} fill="#fff" peso={700}>Líder de RevOps</Txt>
        {OX.map((x) => <path key={x} d={`M 600 ${y0 - 210} V ${y0 - 180} H ${x} V ${y0 - 130}`} stroke={VIOLETA} strokeWidth={6} fill="none" />)}
      </g>}
      {modo === 2 && <g>
        <ellipse cx={600} cy={y0 - 230} rx={200} ry={40} fill={isDark ? '#6b4f3a' : '#d6a35c'} />
        {OX.map((x, k) => <path key={x} d={`M ${x} ${y0 - 130} Q ${(x + 600) / 2} ${y0 - 200} ${600 + (k - 1) * 120} ${y0 - 236}`} stroke={c.apagado} strokeWidth={5} fill="none" strokeDasharray="10 8" />)}
        <Calendario x={880} y={y0 - 260} s={0.5} marcados={Math.floor(t) % 15} />
      </g>}
    </g>
  );

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Del organigrama actual al ideal">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 y 2 · el organigrama en sus modos */}
      <Toma t={t} a={-1} b={m('preguntas')} zi={1}>
        <g opacity={e1(t, m('dos'))}><Org /></g>
        {modo === 1 && t < m('silos') && t >= m('mismoLider') && <Letrero x={600} y={790} texto="Las tres reportan a un mismo líder" fondo={VIOLETA} id={ID} tam={22} />}
        {modo === 2 && t < m('silos') && t >= m('reunen') && <Letrero x={600} y={790} texto="Cada una con su jefe, pero deciden juntas" fondo={PIZARRA} id={ID} tam={22} />}
        {t >= m('ciclo') && t < m('silos') && <Letrero x={600} y={160} texto="Que alguien mire el ciclo completo" id={ID} op={e1(t, m('ciclo'))} tam={22} />}
        {modo === 0 && t >= m('friccion') && <Letrero x={600} y={790} texto="Nadie ve la fricción entre ellas" fondo={ROJO_M} id={ID} op={e1(t, m('friccion'))} tam={22} />}
        {modo === 1 && t >= m('reorganizacion') && <Letrero x={600} y={790} texto="Requiere reorganizar y autoridad real" fondo={VIOLETA} id={ID} op={e1(t, m('reorganizacion'))} tam={22} />}
        {modo === 2 && t >= m('entrada') && <Letrero x={600} y={790} texto="El punto de entrada más frecuente" fondo={VERDE} id={ID} op={e1(t, m('entrada'))} tam={22} />}
      </Toma>

      {/* TOMA 3 · tres preguntas */}
      <Toma t={t} a={m('preguntas')} b={fin + 1}>
        {([['actual', 'Hoy', '#94a3b8'], ['ideal', 'Ideal', VIOLETA]] as [N, string, string][]).map(([n, txt, col], k) => t >= m(n) && (
          <g key={n} opacity={e1(t, m(n))}>
            <rect x={110 + k * 640} y={260} width={340} height={360} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Txt f="a" x={280 + k * 640} y={310} textAnchor="middle" fontSize={26} fill={col} peso={700}>{txt}</Txt>
            {k === 0 ? [0, 1, 2].map((j) => <rect key={j} x={140 + j * 100} y={440} width={80} height={60} rx={10} fill={OPS[j].col} opacity={0.7} />) : <g><rect x={870} y={360} width={140} height={54} rx={10} fill={VIOLETA} />{[0, 1, 2].map((j) => <g key={j}><rect x={780 + j * 100} y={480} width={80} height={60} rx={10} fill={OPS[j].col} /><path d={`M 940 414 V 450 H ${820 + j * 100} V 480`} stroke={VIOLETA} strokeWidth={4} fill="none" /></g>)}</g>}
            {k === 0 && [0, 1].map((j) => <path key={j} d={`M ${225 + j * 100} 450 l 6 8 l -4 2 l 6 10`} stroke={ROJO_M} strokeWidth={4} fill="none" />)}
            <Letrero x={280 + k * 640} y={660} texto={k ? '2 · El ideal' : '1 · El actual'} fondo={col} id={ID} tam={22} />
          </g>
        ))}
        {t >= m('ruta') && (() => { const u = sm(t, m('ruta'), m('ruta') + 2); return <g opacity={e1(t, m('ruta'))}>
          <path d="M 460 440 C 540 360 660 520 740 440" stroke={NARANJA} strokeWidth={8} fill="none" strokeDasharray="14 10" />
          <circle cx={lerp(460, 740, u)} cy={440 + 60 * Math.sin(Math.PI * u * 2) * (u < 0.5 ? -1 : 1) * 0.5} r={14} fill={NARANJA} />
          <Letrero x={600} y={560} texto="3 · La ruta" id={ID} tam={22} />
        </g>; })()}
        {t >= m('apoyo') && <g opacity={e1(t, m('apoyo'))}>{[0, 1, 2].map((k) => <Persona key={k} id={ID} x={520 + k * 80} y={790} s={0.35} cuerpo={[VERDE, AZUL_M, ROSA][k]} />)}<Letrero x={600} y={700} texto="¿Qué orden? ¿Con el apoyo de quién?" fondo={PIZARRA} id={ID} tam={20} /></g>}
      </Toma>
    </Lienzo>
  );
};
