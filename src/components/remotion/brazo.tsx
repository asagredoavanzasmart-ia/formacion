import React from 'react';
import { spring, interpolate, Easing } from 'remotion';

/* Brazo articulado reutilizable para cualquier clase.
   - Hombro → codo → muñeca con cinemática inversa de dos segmentos: el codo siempre se dobla hacia abajo y atrás,
     como un brazo real, y el largo de cada segmento no cambia (no se estira ni se encoge).
   - Manga del color del cuerpo, puño claro y mano de perfil en estilo plano (base, sombra y luz, sin contornos).
   - `abre` 0 → 1 dobla la muñeca: 0 = mano relajada que sigue al antebrazo; 1 = palma vertical para empujar o frenar.
   - `cierra` 0 → 1 curva los dedos hacia la palma (para agarrar).
   Las coordenadas están en unidades de la escena; `s` es la escala de la persona dueña del brazo. */

export const PIEL = { base: '#f7c4a0', sombra: '#e29b72', luz: '#ffe9d6', pliegue: '#d08a62' };

type Pt = [number, number];

/* Resorte de Remotion medido en segundos: 0 → 1 desde `desde`, con el rebote que da `amortiguacion`. */
export const resorte = (t: number, desde: number, opciones: { rigidez?: number; amortiguacion?: number; masa?: number; fps?: number } = {}) => {
  const fps = opciones.fps ?? 30;
  const f = (t - desde) * fps;
  if (f <= 0) return 0;
  return spring({ frame: f, fps, config: { stiffness: opciones.rigidez ?? 120, damping: opciones.amortiguacion ?? 14, mass: opciones.masa ?? 1 } });
};

/* Curva suave de Remotion entre dos tiempos (sin rebote), para movimientos que no deben pasarse de largo. */
export const suave = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.45, 0, 0.2, 1) });

/* Codo por cinemática inversa: con hombro, objetivo y largos fijos. `mira` = 1 si la persona mira a la derecha. */
export const resolverCodo = (h: Pt, o: Pt, l1: number, l2: number, mira: number): { codo: Pt; muneca: Pt } => {
  const dx = o[0] - h[0], dy = o[1] - h[1];
  const d0 = Math.hypot(dx, dy) || 1;
  const d = Math.min(l1 + l2 - 0.5, Math.max(Math.abs(l1 - l2) + 1, d0));
  const ux = dx / d0, uy = dy / d0;
  const muneca: Pt = [h[0] + ux * d, h[1] + uy * d];
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
  const hh = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const px = h[0] + ux * a, py = h[1] + uy * a;
  const c1: Pt = [px - uy * hh, py + ux * hh], c2: Pt = [px + uy * hh, py - ux * hh];
  // El codo queda abajo y hacia la espalda de la persona.
  const puntaje = (c: Pt) => c[1] - mira * c[0] * 0.6;
  return { codo: puntaje(c1) >= puntaje(c2) ? c1 : c2, muneca };
};

/* Mano de perfil, dibujada con la muñeca en (0, 0), el antebrazo llegando desde -x y los dedos hacia -y (palma
   mirando a +x). Grosor de referencia del antebrazo: 28. `cierra` curva los dedos. */
// Dedos en vista tres cuartos: [x izquierda, ancho, largo, giro]; de atrás (meñique) hacia delante (índice).
const DEDOS: [number, number, number, number][] = [[-8, 8.5, 22, -9], [0, 9, 31, -3], [8.5, 9, 35, 2], [17, 9, 31, 7]];

export const ManoPerfil: React.FC<{ cierra?: number; piel?: typeof PIEL }> = ({ cierra = 0, piel = PIEL }) => (
  <g>
    {/* Dedos: cápsulas que nacen dentro de la palma; al cerrar la mano se acortan y se doblan hacia ella */}
    {DEDOS.map(([fx, w, h, g], k) => {
      const largo = h * (1 - 0.62 * cierra), cx = fx + w / 2, base = -36;
      const top = base - 6 - largo;
      return (
        <g key={k} transform={`rotate(${g * (1 - cierra) + 14 * cierra} ${cx} ${base})`}>
          <rect x={fx} y={top} width={w} height={largo + 10} rx={w / 2} fill={piel.base} />
          {<rect x={fx} y={top + 2} width={w * 0.34} height={largo + 4} rx={w * 0.17} fill={piel.sombra} opacity={0.32} />}
          {/* Pliegue de la articulación del medio */}
          {largo > 16 && <path d={`M ${fx + 2} ${top + largo * 0.5} q ${w / 2 - 2} 1.6 ${w - 4} 0`} stroke={piel.pliegue} strokeWidth={1.3} fill="none" strokeLinecap="round" opacity={0.55} />}
        </g>
      );
    })}
    {/* Palma: una sola forma lisa, más ancha arriba, con el talón sobre la muñeca */}
    <path d="M -11 12 C -13.5 -6 -12.5 -26 -8.5 -42 C 2 -45 16 -45 26.5 -42 C 29.5 -26 29.5 -8 24 7 C 18 18 -1 20 -11 12 Z" fill={piel.base} />
    {/* Sombra del canto del meñique y luz del monte del pulgar */}
    <path d="M -8.5 -42 C -12.5 -26 -13.5 -6 -11 12 C -6 15 -3 16 0 16.5 C -6 4 -6 -22 -2.5 -43.5 Z" fill={piel.sombra} opacity={0.45} />
    <path d="M 16 -30 C 23 -30 26 -20 25 -10 C 24 -5 21 -4 18 -6 C 14 -12 13 -24 16 -30 Z" fill={piel.luz} opacity={0.5} />
    {/* Líneas de la palma, cortas y suaves */}
    <path d="M -6 -27 C 4 -30 14 -29 24 -25" stroke={piel.pliegue} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.5} />
    <path d="M 3 12 C 2 0 4 -12 10 -22" stroke={piel.pliegue} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={0.45} />
    {/* Pulgar: sale de la base del lado del índice, hacia delante y arriba, separado de los dedos */}
    <g transform={`rotate(${-34 * cierra} 18 8)`}>
      <path d="M 14 12 C 22 4 29 -5 34 -15 C 37 -21 45 -19 43.5 -12 C 41 -2 33 9 23 16 C 19 19 14 17 14 12 Z" fill={piel.base} />
      <path d="M 35 -15 C 38 -20 44 -19 43.6 -13.5 C 41 -15.5 38 -15 35.5 -12.5 Z" fill={piel.luz} opacity={0.75} />
      <path d="M 18 12 C 24 6 29 -1 33 -9" stroke={piel.pliegue} strokeWidth={1.4} fill="none" strokeLinecap="round" opacity={0.5} />
    </g>
  </g>
);

/* Brazo completo: del hombro al objetivo de la muñeca. */
export const Brazo: React.FC<{
  hombro: Pt; objetivo: Pt; s?: number; mira?: 1 | -1; manga: string; puno?: string; abre?: number; cierra?: number;
  largo?: number; grosor?: number; op?: number; piel?: typeof PIEL; mano?: number;
}> = ({ hombro, objetivo, s = 1, mira = 1, manga, puno = '#f8fafc', abre = 1, cierra = 0, largo = 84, grosor = 24, op = 1, piel = PIEL, mano = 0.72 }) => {
  const l1 = (largo / 2) * s, l2 = (largo / 2) * s, g = grosor * s;
  const { codo, muneca } = resolverCodo(hombro, objetivo, l1, l2, mira as 1 | -1);
  const ang = Math.atan2(muneca[1] - codo[1], muneca[0] - codo[0]);
  const angDeg = (ang * 180) / Math.PI;
  const voltea = Math.cos(ang) < 0 ? -1 : 1;
  const ux = Math.cos(ang), uy = Math.sin(ang);
  const k = g / 28, km = k * mano;
  // El puño ocupa el último tramo del antebrazo.
  const p0: Pt = [muneca[0] - ux * 9 * k, muneca[1] - uy * 9 * k];
  const recorrido = `M ${hombro[0]} ${hombro[1]} L ${codo[0]} ${codo[1]} L ${p0[0]} ${p0[1]}`;
  const giroMuneca = 90 * (1 - abre);
  return (
    <g opacity={op}>
      {/* Sombra propia bajo el brazo: lo separa del torso */}
      <path d={recorrido} transform={`translate(0 ${g * 0.16})`} stroke="#000" strokeOpacity={0.16} strokeWidth={g} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={recorrido} stroke={manga} strokeWidth={g} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Mano: se dibuja antes que el puño para que el puño tape la unión */}
      <g transform={`translate(${muneca[0]} ${muneca[1]}) rotate(${angDeg}) scale(${km} ${km * voltea}) rotate(${giroMuneca} -4 0)`}>
        <ManoPerfil cierra={cierra} piel={piel} />
      </g>
      {/* Puño de la camisa */}
      <path d={`M ${p0[0]} ${p0[1]} L ${muneca[0] - ux * 1.5 * k} ${muneca[1] - uy * 1.5 * k}`} stroke={puno} strokeWidth={g * 1.04} strokeLinecap="butt" />
      <path d={`M ${p0[0]} ${p0[1]} L ${muneca[0] - ux * 1.5 * k} ${muneca[1] - uy * 1.5 * k}`} transform={`translate(${-uy * g * 0.3 * voltea * -1} ${ux * g * 0.3})`} stroke="#000" strokeOpacity={0.08} strokeWidth={g * 0.44} strokeLinecap="butt" />
    </g>
  );
};

/* Hombro de una `Persona` (remotion/comun) que mira hacia `mira`, en coordenadas de la escena. */
export const hombroDe = (x: number, y: number, s: number, mira: 1 | -1 = 1): Pt => [x + mira * 22 * s, y - 88 * s];
