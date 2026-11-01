import React from 'react';
import { NARANJA, ROSA, Txt, ac, sombra } from '../../remotion/comun';
import type { Tono } from '../escenas/comunCE';

/* Piezas compartidas por las escenas de la parte 2 de «Comunicación efectiva». */

/* Las cinco palancas de Hamm (estructura, resultados, el propio trabajo, el tiempo y la cultura): cinco
   palancas de locomotora con su número, arriba de la escena. Cada una entra con `entra[k]`; la activa se
   inclina hacia adelante y se tiñe con la marca. */
export const Palancas: React.FC<{ t: number; entra: number[]; activo: number; c: Tono; id: string; y?: number; x0?: number; paso?: number }> = ({ t, entra, activo, c, id, y = 175, x0 = 300, paso = 150 }) => (
  <g>
    {Array.from({ length: 5 }, (_, k) => {
      const t0 = entra[k] ?? 1e6;
      const op = ac(t, t0, t0 + 0.4);
      if (op < 0.01) return null;
      const on = k === activo;
      const x = x0 + k * paso;
      const giro = on ? 28 : -18;
      return (
        <g key={k} opacity={op * (on || activo < 0 ? 1 : 0.55)} transform={`translate(${x} ${y})`}>
          <rect x={-46} y={18} width={92} height={22} rx={8} fill={c.apagado} />
          <g transform={`rotate(${giro} 0 30)`}>
            <rect x={-6} y={-40} width={12} height={70} rx={6} fill={on ? NARANJA : c.tenue} />
            <circle cx={0} cy={-44} r={16} fill={on ? `url(#${id}-marca)` : c.panel2} style={sombra(c.sombra, 2, 6)} />
          </g>
          <Txt x={-34} y={-18} textAnchor="middle" fontSize={26} fill={on ? ROSA : c.tenue}>{k + 1}</Txt>
        </g>
      );
    })}
  </g>
);

/* Organigrama: una caja arriba y n abajo unidas por líneas. `mezcla` (0 a 1) baraja la fila de abajo,
   `temblor` la hace vibrar (incertidumbre). */
export const Organigrama: React.FC<{ x: number; y: number; n?: number; c: Tono; id: string; mezcla?: number; temblor?: number; t?: number; s?: number }> = ({ x, y, n = 4, c, id, mezcla = 0, temblor = 0, t = 0, s = 1 }) => {
  const ancho = 110;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-55} y={-130} width={110} height={56} rx={12} fill={`url(#${id}-marca)`} style={sombra(c.sombra, 3, 8)} />
      <path d={`M 0 -74 V -40 M ${-((n - 1) * ancho) / 2} -40 H ${((n - 1) * ancho) / 2}`} stroke={c.tenue} strokeWidth={4} fill="none" />
      {Array.from({ length: n }, (_, k) => {
        const x0 = -((n - 1) * ancho) / 2 + k * ancho;
        const x1 = -((n - 1) * ancho) / 2 + ((k + 2) % n) * ancho;
        const xx = x0 + (x1 - x0) * mezcla + temblor * 6 * Math.sin(t * 13 + k * 2);
        return (
          <g key={k}>
            <path d={`M ${x0} -40 V -20`} stroke={c.tenue} strokeWidth={4} />
            <rect x={xx - 42} y={-20} width={84} height={50} rx={10} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            <circle cx={xx} cy={-2} r={9} fill={[NARANJA, ROSA, c.tenue, '#0f766e'][k % 4]} />
            <rect x={xx - 22} y={12} width={44} height={7} rx={3} fill={c.apagado} />
          </g>
        );
      })}
    </g>
  );
};

/* Boca cerrada con cierre (el silencio), sobre la cabeza de una Persona (x, y, s iguales a los de la Persona). */
export const Cierre: React.FC<{ x: number; y: number; s?: number; op?: number }> = ({ x, y, s = 1, op = 1 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <rect x={-16} y={-124} width={32} height={10} rx={4} fill="#374151" />
      {[-10, -4, 2, 8].map((dx) => <line key={dx} x1={dx} y1={-124} x2={dx} y2={-114} stroke="#d1d5db" strokeWidth={2} />)}
    </g>
  );

/* Marcador de estadio con filas de valores que se encienden (`u` de 0 a 1). */
export const Marcador: React.FC<{ x: number; y: number; filas: [string, string][]; u: number[]; c: Tono; id: string; w?: number }> = ({ x, y, filas, u, c, id, w = 440 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={0} width={w} height={60 + filas.length * 64} rx={18} fill="#111827" style={sombra(c.sombra)} />
    <rect x={-w / 2 + 14} y={14} width={w - 28} height={10} rx={5} fill={`url(#${id}-marcaH)`} />
    {filas.map(([et, val], k) => (
      <g key={et} opacity={0.25 + 0.75 * (u[k] ?? 0)}>
        <Txt f="a" x={-w / 2 + 30} y={78 + k * 64} fontSize={28} fill="#e5e7eb">{et}</Txt>
        <Txt x={w / 2 - 30} y={80 + k * 64} textAnchor="end" fontSize={36} fill="#fbbf24">{val}</Txt>
      </g>
    ))}
  </g>
);

/* Los seis pasos de Heen y Stone para recibir retroalimentación: seis fichas numeradas arriba; las de
   `hechos` quedan marcadas y la `activa` se tiñe. */
export const SeisPasos: React.FC<{ t: number; t0: number; activo: number; c: Tono; id: string; y?: number }> = ({ t, t0, activo, c, id, y = 175 }) => (
  <g>
    {Array.from({ length: 6 }, (_, k) => {
      const op = ac(t, t0 + k * 0.12, t0 + k * 0.12 + 0.4);
      if (op < 0.01) return null;
      const on = k === activo;
      const x = 300 + k * 120;
      return (
        <g key={k} opacity={op * (on ? 1 : k < activo ? 0.8 : 0.45)} transform={`translate(${x} ${y}) scale(${on ? 1.12 : 1})`}>
          <rect x={-44} y={-34} width={88} height={68} rx={16} fill={on ? `url(#${id}-marca)` : c.panel2} style={sombra(c.sombra, 3, 8)} />
          <Txt x={0} y={14} textAnchor="middle" fontSize={36} fill={on ? '#fff' : c.tenue}>{k + 1}</Txt>
        </g>
      );
    })}
  </g>
);
/* Las cinco conversaciones de Toegel y Barsoux (cómo nos vemos, actuamos, hablamos, pensamos y sentimos):
   cinco fichas con un pictograma (ojo, mano, boca, engranaje y corazón). `entra[k]` y la `activa`. */
export const CincoConversaciones: React.FC<{ t: number; entra: number[]; activo: number; c: Tono; id: string; y?: number }> = ({ t, entra, activo, c, id, y = 175 }) => (
  <g>
    {Array.from({ length: 5 }, (_, k) => {
      const t0 = entra[k] ?? 1e6;
      const op = ac(t, t0, t0 + 0.4);
      if (op < 0.01) return null;
      const on = k === activo;
      const x = 360 + k * 120;
      const tinta = on ? '#fff' : c.tenue;
      return (
        <g key={k} opacity={op * (on || activo < 0 ? 1 : 0.55)} transform={`translate(${x} ${y}) scale(${on ? 1.12 : 1})`}>
          <rect x={-46} y={-38} width={92} height={76} rx={18} fill={on ? `url(#${id}-marca)` : c.panel2} style={sombra(c.sombra, 3, 8)} />
          <g fill={tinta} stroke={tinta}>
            {k === 0 && <g><path d="M -26 0 Q 0 -24 26 0 Q 0 24 -26 0 Z" fill="none" strokeWidth={4} /><circle r={8} stroke="none" /></g>}
            {k === 1 && <g stroke="none"><rect x={-16} y={-6} width={32} height={28} rx={8} />{[-12, -4, 4, 12].map((dx) => <rect key={dx} x={dx - 3} y={-24} width={6} height={20} rx={3} />)}</g>}
            {k === 2 && <g strokeWidth={4} fill="none"><path d="M -24 -16 H 24 Q 30 -16 30 -10 V 8 Q 30 14 24 14 H -4 L -16 24 L -14 14 H -24 Q -30 14 -30 8 V -10 Q -30 -16 -24 -16 Z" /></g>}
            {k === 3 && <g stroke="none">{Array.from({ length: 6 }, (_, j) => <rect key={j} x={-5} y={-24} width={10} height={12} rx={2} transform={`rotate(${j * 60})`} />)}<circle r={16} /><circle r={6} fill={on ? NARANJA : c.panel2} /></g>}
            {k === 4 && <path d="M 0 20 C -30 0 -30 -22 -12 -24 C -5 -25 -1 -20 0 -15 C 1 -20 5 -25 12 -24 C 30 -22 30 0 0 20 Z" stroke="none" />}
          </g>
        </g>
      );
    })}
  </g>
);