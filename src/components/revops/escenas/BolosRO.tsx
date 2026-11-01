import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Cruz, Visto, Rotulo, Persona, Txt, Calendario, Flujo, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, azar, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Evitar el retroceso», en tres tomas.
 * 1 · Aprobar es la mitad: después todo tiende a volver atrás (un resorte que tira), sobre todo la gerencia, que siente
 *     primero los costos. La clave son los pinos clave.
 * 2 · Los bolos: derribarlos uno por uno agota; si cae el pino clave, los demás caen solos.
 * 3 · Bratton en Nueva York: 76 comandantes al foco, reuniones dos veces por semana con dos días de aviso;
 *     resultados visibles, reconocimiento público y el formato replicado hacia abajo.
 */

const ID = 'ro43';
const nombres = ['mitad', 'volver', 'gerencia', 'costos', 'pinos', 'arrastra', 'bolos', 'cae', 'uno', 'energia', 'bratton', 'comandantes', 'oficiales', 'foco', 'reuniones', 'aviso', 'inmediato', 'visibles', 'vecino', 'reconocimiento', 'replicaron', 'fuente', 'pregunta'] as const;
type N = typeof nombres[number];

const Pino: React.FC<{ x: number; y: number; s?: number; rot?: number; col?: string; op?: number }> = ({ x, y, s = 1, rot = 0, col = '#fff', op = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
    <path d="M -10 0 C -22 -30 -18 -50 -8 -62 C -14 -74 -10 -90 0 -92 C 10 -90 14 -74 8 -62 C 18 -50 22 -30 10 0 Z" fill={col} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.25))' }} />
    <rect x={-9} y={-70} width={18} height={6} rx={3} fill={ROJO_M} />
  </g>
);

export const BolosRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Evitar el retroceso'], [m('volver'), 'Todo tiende a volver atrás'], [m('pinos'), 'Los pinos clave'],
    [m('bolos'), 'La metáfora de los bolos'], [m('bratton'), 'Bratton en Nueva York'], [m('inmediato'), 'El efecto fue inmediato'],
  ];

  /* triángulo de 10 pinos; el 0 es el pino clave */
  const PINOS: [number, number][] = [];
  for (let fila = 0; fila < 4; fila++) for (let j = 0; j <= fila; j++) PINOS.push([700 + fila * 70, 560 + (j - fila / 2) * 64]);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Evitar el retroceso">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · el resorte que tira hacia atrás */}
      <Toma t={t} a={-1} b={m('bolos')} zi={1}>
        <Suelo y={660} isDark={isDark} />
        {(() => { const atras = sm(t, m('volver'), m('volver') + 2) * (1 - sm(t, m('pinos'), m('pinos') + 1.5) * 0.8); const x = lerp(840, 520, atras); return (
          <g>
            <Visto x={900} y={250} r={36} op={e1(t, m('mitad'))} />
            {t >= m('mitad') && <Letrero x={900} y={340} texto="Aprobado: la mitad" fondo={VERDE} id={ID} tam={22} />}
            <rect x={160} y={420} width={20} height={240} rx={8} fill={PIZARRA} />
            <path d={`M 180 560 ${Array.from({ length: 12 }, (_, k) => `L ${180 + ((x - 220) * (k + 0.5)) / 12} ${k % 2 ? 530 : 590}`).join(' ')} L ${x - 40} 560`} stroke="#94a3b8" strokeWidth={6} fill="none" />
            <Equipo id={ID} k="ops" x={x} y={660} s={0.75} t={t} nombre={false} />
            {t >= m('gerencia') && <g opacity={e1(t, m('gerencia'))}><Persona id={ID} x={1030} y={660} s={0.7} cuerpo={PIZARRA} corbata ojos={0.4} />{t >= m('costos') && <g><Txt x={1060} y={430} fontSize={40} fill={ROJO_M} peso={800}>$</Txt><Letrero x={1030} y={720} texto="Siente primero los costos" fondo={PIZARRA} id={ID} tam={20} /></g>}</g>}
            {t >= m('pinos') && <g opacity={e1(t, m('pinos'))}><Pino x={600} y={330} s={1.2} col={NARANJA} /><Letrero x={600} y={190} texto="Pocas personas arrastran al resto" id={ID} tam={22} /></g>}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 2 · los bolos */}
      <Toma t={t} a={m('bolos')} b={m('bratton')}>
        <rect x={80} y={520} width={1060} height={90} rx={20} fill={isDark ? '#6b4f3a' : '#f1d9a8'} opacity={0.6} />
        {(() => {
          const fase = t >= m('cae') ? 'clave' : 'inicio';
          const uno = t >= m('uno') && t < m('energia');
          const caida = sm(t, m('cae') + 0.6, m('cae') + 1.8) * (uno ? 0 : 1);
          const bx = fase === 'clave' && !uno ? lerp(160, 690, sm(t, m('cae'), m('cae') + 0.6)) : 160;
          return (
            <g>
              {PINOS.map(([x, y], k) => { const cae = k === 0 ? caida : caida > 0 ? sm(caida, 0.2 + azar(k) * 0.4, 0.6 + azar(k) * 0.4) : 0; return <Pino key={k} x={x + cae * 60 * (k % 2 ? 1 : -0.5)} y={y + 30} rot={cae * (k % 2 ? 80 : -70)} col={k === 0 ? NARANJA : '#fff'} op={1 - cae * 0.5} />; })}
              <circle cx={bx} cy={575} r={34} fill="#1f2937" /><circle cx={bx - 8} cy={565} r={4} fill="#94a3b8" /><circle cx={bx + 6} cy={562} r={4} fill="#94a3b8" />
              {uno && <g>{[0, 1, 2].map((k) => { const ph = ((t - m('uno')) * 0.6 + k / 3) % 1; return <circle key={k} cx={lerp(160, 900, ph)} cy={575 - 20 * k} r={16} fill="#94a3b8" opacity={1 - ph} />; })}<Letrero x={600} y={760} texto="Uno por uno: agotador" fondo={PIZARRA} id={ID} tam={22} /></g>}
              {caida > 0.4 && <Letrero x={600} y={760} texto={t >= m('energia') ? 'La misma energía, en el pino correcto' : 'Cae el clave y los demás caen solos'} fondo={NARANJA} id={ID} tam={22} />}
              {t >= m('bolos') && <Letrero x={700} y={340} texto="Pino clave: el influenciador" fondo={NARANJA} id={ID} op={e1(t, m('bolos')) * (1 - caida)} tam={22} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 3 · Bratton */}
      <Toma t={t} a={m('bratton')} b={fin + 1}>
        {(() => { const rep = sm(t, m('replicaron'), m('replicaron') + 2); return (
          <g>
            {/* la sala: Bratton y comandantes */}
            {t >= m('comandantes') && <g opacity={e1(t, m('comandantes'))}>
              {Array.from({ length: 8 }, (_, k) => <Persona key={k} id={ID} x={190 + k * 115} y={430} s={0.4} cuerpo={AZUL_M} corbata />)}
              <Letrero x={600} y={480} texto="76 comandantes de distrito" fondo={AZUL_M} id={ID} tam={22} />
            </g>}
            {t >= m('oficiales') && <g opacity={e1(t, m('oficiales'))}>{Array.from({ length: 8 }, (_, k) => Array.from({ length: 4 }, (_, j) => <circle key={`${k}-${j}`} cx={160 + k * 115 + (j % 2) * 30} cy={560 + Math.floor(j / 2) * 30 + 10 * rep * azar(k * 4 + j)} r={10} fill={rep > 0.5 ? AZUL_M : '#94a3b8'} />))}<Txt f="a" x={600} y={660} textAnchor="middle" fontSize={20} fill={c.tenue}>200 a 400 oficiales cada uno</Txt></g>}
            {t >= m('foco') && <ellipse cx={600} cy={360} rx={520} ry={110} fill="#fde68a" opacity={0.18 * e1(t, m('foco'))} />}
            {t >= m('reuniones') && <g opacity={e1(t, m('reuniones'))}><Calendario x={240} y={230} s={0.6} marcados={Math.min(14, Math.floor((t - m('reuniones')) * 2) * 2)} /><Letrero x={420} y={230} texto="2 veces por semana" fondo={PIZARRA} id={ID} tam={20} ancla="start" /></g>}
            {t >= m('aviso') && <Letrero x={940} y={230} texto="2 días de aviso" fondo={ROJO_M} id={ID} op={e1(t, m('aviso'))} tam={20} />}
            {t >= m('visibles') && <g opacity={e1(t, m('visibles')) * (1 - ac(t, m('reconocimiento') - 0.3, m('reconocimiento')))}><Letrero x={600} y={740} texto={t >= m('vecino') ? 'El vecino está en la misma sala' : 'Resultados visibles para todos'} id={ID} tam={22} /></g>}
            {t >= m('reconocimiento') && <g opacity={e1(t, m('reconocimiento')) * (1 - ac(t, m('replicaron') - 0.3, m('replicaron')))}><path d="M 0 -22 L 6 -7 L 22 -6 L 10 5 L 14 21 L 0 12 L -14 21 L -10 5 L -22 -6 L -6 -7 Z" fill="#fbbf24" transform="translate(305 305) scale(1.2)" /><Letrero x={600} y={740} texto="Reconocimiento público" fondo={AMBAR} id={ID} tam={22} /></g>}
            {t >= m('replicaron') && <Letrero x={600} y={740} texto="Lo replicaron con sus equipos" fondo={VERDE} id={ID} op={e1(t, m('replicaron'))} tam={22} />}
            {t >= m('fuente') && <Txt f="a" x={600} y={810} textAnchor="middle" fontSize={20} fill={c.tenue} opacity={e1(t, m('fuente'))}>«Tipping Point Leadership», HBR 2003</Txt>}
          </g>
        ); })()}
      </Toma>
    </Lienzo>
  );
};
