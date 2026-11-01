import React from 'react';
import { Txt, ac, sombra } from '../../remotion/comun';
import type { Tono } from './comunCE';

/* Fila de los seis principios de Cialdini (simpatía, reciprocidad, respaldo social, consistencia,
   autoridad y escasez): seis fichas numeradas arriba de la escena. Cada ficha entra con `entra[k]` y
   se tiñe con la marca mientras su principio está `activo`. Cada una lleva un pictograma propio. */
export const SeisPrincipios: React.FC<{ t: number; entra: number[]; activo: number; c: Tono; id: string; y?: number }> = ({ t, entra, activo, c, id, y = 170 }) => (
  <g>
    {Array.from({ length: 6 }, (_, k) => {
      const op = ac(t, entra[k] ?? 1e6, (entra[k] ?? 1e6) + 0.4);
      if (op < 0.01) return null;
      const x = 225 + k * 150;
      const on = k === activo;
      const tinta = on ? '#fff' : c.tenue;
      return (
        <g key={k} opacity={op * (on || activo < 0 ? 1 : 0.6)} transform={`translate(${x} ${y + (1 - op) * 12}) scale(${on ? 1.08 : 1})`}>
          <rect x={-56} y={-44} width={112} height={88} rx={20} fill={on ? `url(#${id}-marca)` : c.panel2} style={sombra(c.sombra, 3, 8)} />
          <Txt x={-34} y={-12} textAnchor="middle" fontSize={26} fill={tinta}>{k + 1}</Txt>
          <g transform="translate(14 8)" fill={tinta} stroke={tinta}>
            {k === 0 && <path d="M 0 18 C -26 2 -26 -18 -12 -20 C -6 -21 -1 -16 0 -12 C 1 -16 6 -21 12 -20 C 26 -18 26 2 0 18 Z" stroke="none" />}
            {k === 1 && <g fill="none" strokeWidth={5} strokeLinecap="round"><path d="M -20 -8 H 16 M 8 -16 L 16 -8 L 8 0" /><path d="M 20 10 H -16 M -8 2 L -16 10 L -8 18" /></g>}
            {k === 2 && <g stroke="none"><circle cx={-14} cy={-10} r={7} /><circle cx={0} cy={-12} r={8} /><circle cx={14} cy={-10} r={7} /><path d="M -26 16 Q -14 -2 0 0 Q 14 -2 26 16 Z" /></g>}
            {k === 3 && <g fill="none" strokeWidth={5} strokeLinecap="round"><path d="M -18 14 Q -6 -20 6 4 Q 12 16 20 -14" /></g>}
            {k === 4 && <g stroke="none"><path d="M -20 -4 L 0 -16 L 20 -4 L 0 8 Z" /><rect x={-12} y={2} width={24} height={12} rx={3} /></g>}
            {k === 5 && <g stroke="none"><path d="M -14 -20 H 14 L 2 0 L 14 20 H -14 L -2 0 Z" opacity={0.85} /></g>}
          </g>
        </g>
      );
    })}
  </g>
);

/* Barra vertical con su valor en % encima y su etiqueta debajo; `u` de 0 a 1 la hace crecer. */
export const BarraV: React.FC<{ x: number; base: number; alto: number; valor: string; etiqueta: string; u: number; c: Tono; id: string; marca?: boolean; ancho?: number; tamValor?: number }> = ({ x, base, alto, valor, etiqueta, u, c, id, marca = false, ancho = 110, tamValor = 44 }) => (
  <g opacity={Math.min(1, u * 3)}>
    <rect x={x - ancho / 2} y={base - alto * u} width={ancho} height={Math.max(0.1, alto * u)} rx={14} fill={marca ? `url(#${id}-marca)` : c.apagado} style={sombra(c.sombra, 3, 8)} />
    <Txt x={x} y={base - alto * u - 18} textAnchor="middle" fontSize={tamValor} fill={marca ? `url(#${id}-marcaH)` : c.texto} opacity={ac(u, 0.6, 1)}>{valor}</Txt>
    <Txt f="a" x={x} y={base + 44} textAnchor="middle" fontSize={28} fill={c.texto}>{etiqueta}</Txt>
  </g>
);
