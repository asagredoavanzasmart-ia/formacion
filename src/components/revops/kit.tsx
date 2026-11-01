import React, { useState } from 'react';
import { motion } from 'motion/react';
import { panelClass, textMuted, microLabel, featuredClass } from '../slideKit';
import { ORANGE, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFloor, Float, PulseDisc } from '../scene3d';
import type { Faces } from '../scene3d';

import { useMarcaClase } from '../remotion/EscenaSincronizada';
import { guiadoRevops, marcasRevops, finesRevops } from '../../data/guiadoRevops';

export type SlideProps = { isDark: boolean };

/* Índice de la última marca narrada de una calculadora (null fuera de su tramo en la clase guiada). */
const SIN_MARCAS: number[] = [];
export function usePasoNarrado(id: string) {
  const s = guiadoRevops.slides.find((x) => x.id === id);
  return useMarcaClase(s ? s.t : -10, s ? finesRevops[id] ?? s.t + 60 : -10, marcasRevops[id] ?? SIN_MARCAS);
}

/* Estado de una calculadora que la narración rellena: cada vez que cambia el paso narrado se aplica el estado
   que `plan(paso)` devuelve (los números viajan suavemente hasta su valor). Con el audio en pausa nada lo pisa
   y la persona puede editar los campos libremente. */
export function useNarrado<S extends Record<string, number>>(id: string, inicial: S, plan: (paso: number) => Partial<S> | null): [S, React.Dispatch<React.SetStateAction<S>>, number | null] {
  const paso = usePasoNarrado(id);
  const [v, setV] = useState<S>(inicial);
  const raf = React.useRef(0);
  React.useEffect(() => {
    if (paso === null) return;
    let objetivo: Partial<S> = {};
    for (let k = -1; k <= paso; k++) { const p = plan(k); if (p) objetivo = { ...objetivo, ...p }; }
    const desde = { ...v };
    const t0 = performance.now();
    cancelAnimationFrame(raf.current);
    const tick = (now: number) => {
      const u = Math.min(1, (now - t0) / 700), e = 1 - Math.pow(1 - u, 3);
      const nuevo = { ...desde } as S;
      for (const key of Object.keys(objetivo) as (keyof S)[]) { const a = desde[key] as number, b = objetivo[key] as number; (nuevo as Record<keyof S, number>)[key] = Number.isInteger(b) && Number.isInteger(a) ? Math.round(a + (b - a) * e) : a + (b - a) * e; }
      setV(nuevo);
      if (u < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paso]);
  return [v, setV, paso];
}

export const heading = (isDark: boolean) => (isDark ? 'text-white' : 'text-gray-900');

export function useCountUp(target: number, dur = 900) {
  const [v, setV] = useState(0);
  const from = React.useRef(0);
  React.useEffect(() => {
    from.current = v;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(from.current + (target - from.current) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return v;
}

export const fmt = (n: number, dec = 0) => n.toLocaleString('es-CL', { minimumFractionDigits: dec, maximumFractionDigits: dec });

/* Tarjeta de cifra con número animado. */
export function Cifra({ isDark, n, dec = 0, sufijo = '', prefijo = '', titulo, lineas = [], destacada = false }: {
  isDark: boolean; n: number; dec?: number; sufijo?: string; prefijo?: string; titulo: string; lineas?: string[]; destacada?: boolean;
}) {
  const v = useCountUp(n);
  return (
    <div className={`p-3.5 rounded-3xl flex flex-col gap-1 ${destacada ? featuredClass(isDark) : panelClass(isDark)}`}>
      <p className={microLabel(isDark)}>{titulo}</p>
      <p className="text-2xl md:text-3xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{prefijo}{fmt(v, dec)}{sufijo}</p>
      {lineas.map((l) => <p key={l} className={`text-xs leading-snug ${textMuted(isDark)}`}>{l}</p>)}
    </div>
  );
}

/* Cita de un experto con su rol. */
export function Cita({ isDark, autor, rol, children }: { isDark: boolean; autor: string; rol?: string; children: React.ReactNode }) {
  return (
    <div className={`p-3.5 my-1 rounded-2xl ${isDark ? "bg-white/10" : "bg-gray-200/80"}`}>
      <p className={`text-sm leading-snug italic ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>«{children}»</p>
      <p className="mt-1.5 text-[11px] font-black text-[#ff851d]">{autor}{rol && <span className={`font-semibold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}> · {rol}</span>}</p>
    </div>
  );
}

/* Bloque con micro-etiqueta y texto. */
export function Nota({ isDark, label, children, destacada = false }: { isDark: boolean; label: string; children: React.ReactNode; destacada?: boolean }) {
  return (
    <div className={`p-3.5 rounded-2xl ${destacada ? featuredClass(isDark) : panelClass(isDark)}`}>
      <p className={microLabel(isDark)}>{label}</p>
      <div className={`text-sm leading-snug mt-0.5 ${textMuted(isDark)}`}>{children}</div>
    </div>
  );
}

/* Línea de fuente al pie. */
export function Fuente({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return <p data-aux="fuente" className={`shrink-0 mt-2 text-[10.5px] leading-tight ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{children}</p>;
}

/* Botón de opción pequeño (para listas largas). */
export function Opcion({ isDark, on, onClick, children }: { isDark: boolean; on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-3 py-2 rounded-xl text-[12.5px] font-bold leading-tight transition-all ${
        on ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/25' : isDark ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

/* Parte un texto en líneas de un máximo de caracteres (para etiquetas de escenas). */
export function envolver(texto: string, max: number): string[] {
  const palabras = texto.split(' ');
  const lineas: string[] = [];
  let actual = '';
  for (const p of palabras) {
    if ((actual + ' ' + p).trim().length > max && actual) { lineas.push(actual); actual = p; }
    else actual = (actual + ' ' + p).trim();
  }
  if (actual) lineas.push(actual);
  return lineas;
}

/* Barras 3D con geometría de etiquetas calculada. */
export type BarraIso = { name: string; value: number; label?: string; tone?: 'brand' | 'peach' | 'neutral' | 'slate'; hl?: boolean };

export function BarrasIso({ id, isDark, items, max, W = 520, hMax = 150, unit = '', decimals = 0, caption, piso = 'iso' }: {
  id: string; isDark: boolean; items: BarraIso[]; max: number; W?: number; hMax?: number; unit?: string; decimals?: number; caption?: string; piso?: 'iso' | 'plano';
}) {
  const t = sceneTone(isDark);
  const n = items.length;
  const slot = W / n;
  const S = Math.min(34, slot / 3.2);
  const B = hMax + S / 2 + 36;
  const maxChars = Math.max(8, Math.floor(slot / 6.4));
  const f = (v: number) => fmt(v, decimals) + unit;
  const maxLen = Math.max(...items.map((i) => (i.label ?? f(i.value)).length));
  const fsValor = Math.min(20, S * 0.62, (slot * 0.92) / (maxLen * 0.6));
  const lineasMax = Math.max(...items.map((i) => envolver(i.name, maxChars).length));
  const H = B + S / 2 + 20 + lineasMax * 13 + (caption ? 26 : 8);
  const cara = (b: BarraIso): Faces => (b.tone === 'brand' || b.hl ? BRAND : b.tone === 'slate' ? SLATE(isDark) : b.tone === 'neutral' ? NEUTRAL(isDark) : PEACH);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible" role="img" aria-label={items.map((i) => `${i.name}: ${i.label ?? f(i.value)}`).join('; ')}>
      <SceneDefs id={id} isDark={isDark} />
      {piso === 'plano' ? <ellipse cx={W / 2} cy={B + 2} rx={W / 2 - 20} ry={S * 0.55} fill={t.floor} /> : <IsoFloor cx={W / 2} cy={B + 4} s={W / 2 - 6} fill={t.floor} />}
      {items.map((b, i) => {
        const x = slot * (i + 0.5);
        const h = Math.max(6, (b.value / max) * hMax);
        const cy = B - h;
        return (
          <g key={b.name + i}>
            <motion.g initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 70, damping: 15 }} style={{ transformOrigin: `${x}px ${B}px` }}>
              {b.hl && piso !== 'plano' && <PulseDisc cx={x} cy={B + 2} rx={Math.min(slot * 0.42, 56)} ry={13} dur={2.2} peak={0.32} />}
              {piso === 'plano' ? (
                <g filter={`url(#${id}-sh)`}><g data-barra={i + 1}><IsoBox cx={x} cy={cy} s={S} h={h} f={cara(b)} /></g></g>
              ) : (
                <Float amp={b.hl ? 5 : 1.5} dur={b.hl ? 2.3 : 4} delay={i * 0.2}>
                  <g filter={`url(#${id}-sh)`}><IsoBox cx={x} cy={cy} s={S} h={h} f={cara(b)} /></g>
                </Float>
              )}
            </motion.g>
            <text x={x} y={cy - S / 2 - 10} textAnchor="middle" fontSize={fsValor} fontWeight={900} fill={b.hl ? ORANGE : t.text}>{b.label ?? f(b.value)}</text>
            {envolver(b.name, maxChars).map((l, k) => (
              <text key={k} x={x} y={B + S / 2 + 18 + k * 13} textAnchor="middle" fontSize={11} fontWeight={800} fill={b.hl ? ORANGE : t.muted}>{l}</text>
            ))}
          </g>
        );
      })}
      {caption && <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{caption}</text>}
    </svg>
  );
}

/* Suelo elíptico: no se sale del lienzo como el rombo isométrico en escenas anchas. */
export function Piso({ cx, cy, s, fill }: { cx: number; cy: number; s: number; fill: string }) {
  return <ellipse cx={cx} cy={cy} rx={s} ry={s * 0.3} fill={fill} />;
}

/* Esfera sin filtro de sombra: el filtro deja un recuadro visible en esferas pequeñas. */
export function Bola({ id, cx, cy, r, neutral = false }: { id: string; cx: number; cy: number; r: number; neutral?: boolean }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + r + 4} rx={r * 0.9} ry={r * 0.28} fill="#000" opacity={0.12} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-${neutral ? 'orbn' : 'orb'})`} />
    </g>
  );
}

/* Campo numérico con etiqueta (calculadoras). */
export function Campo({ isDark, label, value, onChange, step = 1, min = 0, max, prefijo, sufijo, activo = false }: {
  isDark: boolean; label: string; value: number; onChange: (v: number) => void; step?: number; min?: number; max?: number; prefijo?: string; sufijo?: string; activo?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-1 p-2.5 rounded-2xl transition-all duration-500 ${panelClass(isDark)} ${activo ? (isDark ? 'shadow-[0_16px_34px_-10px_rgba(0,0,0,.7),0_0_24px_rgba(255,133,29,.18)] -translate-y-0.5' : 'shadow-[0_16px_34px_-10px_rgba(17,24,39,.25),0_0_22px_rgba(255,133,29,.16)] -translate-y-0.5') : ''}`}>
      <span className={microLabel(isDark)}>{label}</span>
      <span className="flex items-center gap-1">
        {prefijo && <span className={`text-sm font-bold ${textMuted(isDark)}`}>{prefijo}</span>}
        <input
          type="number"
          value={Math.round(value * 100) / 100}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
          className={`w-full bg-transparent text-lg font-black outline-none ${heading(isDark)}`}
        />
        {sufijo && <span className={`text-sm font-bold ${textMuted(isDark)}`}>{sufijo}</span>}
      </span>
    </label>
  );
}

/* Paso numerado (secuencias). */
export function Paso({ isDark, n, titulo, children, on = false }: { isDark: boolean; n: number | string; titulo: string; children?: React.ReactNode; on?: boolean }) {
  return (
    <div className={`flex gap-3 items-start p-2.5 rounded-2xl ${on ? featuredClass(isDark) : panelClass(isDark)}`}>
      <span className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${on ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white' : isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{n}</span>
      <div className="min-w-0">
        <p className={`text-sm font-black leading-tight ${heading(isDark)}`}>{titulo}</p>
        {children && <div className={`text-xs leading-snug mt-0.5 ${textMuted(isDark)}`}>{children}</div>}
      </div>
    </div>
  );
}

/* Sello de verificación de una cifra de la fuente. */
export function Verificado({ isDark, tipo, children }: { isDark: boolean; tipo: 'ok' | 'corregido' | 'dudoso'; children: React.ReactNode }) {
  const estilos = {
    ok: isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-700',
    corregido: isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-50 text-amber-800',
    dudoso: isDark ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-50 text-rose-700',
  }[tipo];
  const rotulo = { ok: 'Cifra verificada', corregido: 'Cifra corregida', dudoso: 'Cifra sin respaldo' }[tipo];
  return (
    <div className={`px-3 py-2 rounded-2xl text-xs leading-snug ${estilos}`}>
      <span className="font-black uppercase tracking-wide text-[10px] mr-1.5">{rotulo}</span>
      {children}
    </div>
  );
}
