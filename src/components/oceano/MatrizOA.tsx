import React from 'react';
import { Shell, panelClass, textMuted, microLabel, featuredClass } from '../slideKit';

/**
 * «Construye tu curva de valor»: matriz interactiva antes de los tests de Océano azul.
 * Cada factor tiene el nivel que ofrece la industria y el que ofreces tú (0 a 10). La acción
 * (eliminar, reducir, mantener, aumentar, crear) se deduce de la comparación y alimenta la matriz ERIC.
 * Los puntos de ambas curvas se pueden arrastrar en el lienzo; en la tabla, los botones aplican una acción.
 */

type Factor = { id: number; nombre: string; ind: number; tu: number };
type Accion = 'E' | 'R' | 'M' | 'A' | 'C';

const ACCIONES: Record<Accion, { txt: string; color: string }> = {
  E: { txt: 'Eliminar', color: '#e5484d' },
  R: { txt: 'Reducir', color: '#ff851d' },
  M: { txt: 'Mantener', color: '#94a3b8' },
  A: { txt: 'Aumentar', color: '#10b981' },
  C: { txt: 'Crear', color: '#2f7bf6' },
};

const accionDe = (f: Factor): Accion => {
  if (f.ind === 0 && f.tu > 0) return 'C';
  if (f.tu === 0 && f.ind > 0) return 'E';
  if (f.tu < f.ind) return 'R';
  if (f.tu > f.ind) return 'A';
  return 'M';
};

const aplicar = (f: Factor, a: Accion): Factor => {
  switch (a) {
    case 'E': return { ...f, tu: 0 };
    case 'R': return { ...f, tu: Math.max(1, f.ind - 3) };
    case 'M': return { ...f, tu: f.ind };
    case 'A': return { ...f, tu: Math.min(10, Math.max(f.ind + 3, 1)) };
    case 'C': return { ...f, ind: 0, tu: Math.max(f.tu, 7) };
  }
};

const mk = (filas: [string, number, number][]): Factor[] => filas.map(([nombre, ind, tu], k) => ({ id: k + 1, nombre, ind, tu }));

const EJEMPLOS: { k: string; txt: string; industria: string; tuNombre: string; factores: Factor[] }[] = [
  {
    k: 'cirque', txt: 'Cirque du Soleil', industria: 'Circo tradicional', tuNombre: 'Cirque du Soleil',
    factores: mk([['Precio', 3, 6], ['Estrellas', 7, 0], ['Animales', 8, 0], ['Venta en pasillos', 8, 0], ['Varias pistas', 7, 0], ['Humor', 8, 5], ['Peligro', 8, 5], ['Sede única', 3, 9], ['Temática', 0, 6], ['Ambiente refinado', 0, 6], ['Varias obras', 0, 6], ['Música y danza', 0, 6]]),
  },
  {
    k: 'logan', txt: 'Logan de Renault', industria: 'Autos del segmento', tuNombre: 'Logan',
    factores: mk([['Precio', 7, 3], ['Lujo y accesorios', 7, 0], ['Tecnología a bordo', 7, 2], ['Robustez', 5, 9], ['Espacio familiar', 5, 8], ['Facilidad de reparar', 4, 8]]),
  },
  {
    k: 'blanco', txt: 'En blanco', industria: 'Mi industria', tuNombre: 'Mi propuesta',
    factores: mk([['Factor 1', 5, 5], ['Factor 2', 5, 5], ['Factor 3', 5, 5], ['Factor 4', 5, 5], ['Factor 5', 5, 5], ['Factor 6', 5, 5]]),
  },
];

const CLAVE = 'oa-matriz-v1';
type Estado = { factores: Factor[]; industria: string; tuNombre: string };

const leer = (): Estado | null => {
  try { const s = localStorage.getItem(CLAVE); return s ? (JSON.parse(s) as Estado) : null; } catch { return null; }
};

export default function MatrizOA({ isDark }: { isDark: boolean }) {
  const inicial = React.useMemo<Estado>(() => leer() ?? { factores: EJEMPLOS[0].factores, industria: EJEMPLOS[0].industria, tuNombre: EJEMPLOS[0].tuNombre }, []);
  const [factores, setFactores] = React.useState<Factor[]>(inicial.factores);
  const [industria, setIndustria] = React.useState(inicial.industria);
  const [tuNombre, setTuNombre] = React.useState(inicial.tuNombre);
  React.useEffect(() => { try { localStorage.setItem(CLAVE, JSON.stringify({ factores, industria, tuNombre })); } catch { /* sin almacenamiento */ } }, [factores, industria, tuNombre]);

  const cambiar = (id: number, f: (x: Factor) => Factor) => setFactores((fs) => fs.map((x) => (x.id === id ? f(x) : x)));
  const cargar = (k: string) => { const e = EJEMPLOS.find((x) => x.k === k)!; setFactores(e.factores.map((f) => ({ ...f }))); setIndustria(e.industria); setTuNombre(e.tuNombre); };
  const agregar = () => setFactores((fs) => (fs.length >= 12 ? fs : [...fs, { id: Math.max(0, ...fs.map((f) => f.id)) + 1, nombre: `Factor ${fs.length + 1}`, ind: 0, tu: 6 }]));
  const quitar = (id: number) => setFactores((fs) => (fs.length <= 3 ? fs : fs.filter((f) => f.id !== id)));

  /* lienzo estratégico */
  const VW = 640, VH = 370, X0 = 46, X1 = 580, Y0 = 280, Y1 = 24;
  const n = factores.length;
  const X = (k: number) => (n === 1 ? (X0 + X1) / 2 : X0 + 14 + (k * (X1 - X0 - 28)) / (n - 1));
  const Y = (v: number) => Y0 - ((Y0 - Y1) * v) / 10;
  const svg = React.useRef<SVGSVGElement>(null);
  const [arrastre, setArrastre] = React.useState<{ id: number; campo: 'ind' | 'tu' } | null>(null);
  const valorDesde = (e: React.PointerEvent) => {
    const r = svg.current!.getBoundingClientRect();
    const y = ((e.clientY - r.top) / r.height) * VH;
    return Math.max(0, Math.min(10, Math.round(((Y0 - y) / (Y0 - Y1)) * 10)));
  };
  const mover = (e: React.PointerEvent) => { if (arrastre) cambiar(arrastre.id, (f) => ({ ...f, [arrastre.campo]: valorDesde(e) })); };

  const grupos: Record<Accion, Factor[]> = { E: [], R: [], M: [], A: [], C: [] };
  factores.forEach((f) => grupos[accionDe(f)].push(f));
  const igualdad = factores.filter((f) => Math.abs(f.tu - f.ind) <= 1).length / Math.max(1, n);

  const texto = isDark ? 'text-white' : 'text-gray-900';
  const gris = isDark ? '#3a3a3a' : '#e5e7eb';
  const campo = `bg-transparent outline-none font-bold min-w-0 ${texto}`;

  return (
    <Shell isDark={isDark} title="Construye tu" highlight="curva de valor" subtitle="Anota los factores en que compite tu industria, marca cuánto ofrece cada uno y decide qué eliminar, reducir, aumentar y crear. Arrastra los puntos del gráfico o usa los botones.">
      <div className="h-full flex flex-col lg:flex-row gap-4 min-h-0">
        {/* tabla de factores */}
        <div className={`lg:w-[46%] min-w-0 flex flex-col gap-2 p-3 rounded-3xl ${panelClass(isDark)}`}>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={microLabel(isDark)}>Ejemplos</span>
            {EJEMPLOS.map((e) => (
              <button key={e.k} onClick={() => cargar(e.k)} className={`px-2.5 py-1 rounded-full text-[12px] font-bold ${isDark ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{e.txt}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 text-[13px]">
            <label className="flex items-center gap-1.5 min-w-0"><span className="w-3 h-3 rounded-full bg-[#94a3b8] shrink-0" /><input value={industria} onChange={(e) => setIndustria(e.target.value)} className={campo} aria-label="Nombre de la curva de la industria" /></label>
            <label className="flex items-center gap-1.5 min-w-0"><span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] shrink-0" /><input value={tuNombre} onChange={(e) => setTuNombre(e.target.value)} className={campo} aria-label="Nombre de tu curva" /></label>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-1.5">
            {factores.map((f) => {
              const a = accionDe(f);
              return (
                <div key={f.id} className={`p-2 rounded-2xl ${isDark ? 'bg-white/[0.04]' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2">
                    <input value={f.nombre} onChange={(e) => cambiar(f.id, (x) => ({ ...x, nombre: e.target.value }))} className={`${campo} flex-1 text-[13px]`} aria-label="Nombre del factor" />
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full text-white shrink-0" style={{ background: ACCIONES[a].color }}>{ACCIONES[a].txt}</span>
                    <button onClick={() => quitar(f.id)} title="Quitar factor" className={`w-6 h-6 rounded-full text-[13px] font-black shrink-0 ${isDark ? 'text-gray-500 hover:bg-white/10' : 'text-gray-400 hover:bg-gray-200'}`}>×</button>
                  </div>
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-0.5 mt-1 text-[11px]">
                    <span className={textMuted(isDark)}>Industria</span>
                    <input type="range" min={0} max={10} value={f.ind} onChange={(e) => cambiar(f.id, (x) => ({ ...x, ind: +e.target.value }))} className="accent-[#94a3b8]" aria-label={`Industria: ${f.nombre}`} />
                    <span className={`w-5 text-right font-black ${textMuted(isDark)}`}>{f.ind}</span>
                    <span className={textMuted(isDark)}>{tuNombre.length > 14 ? 'Tú' : tuNombre}</span>
                    <input type="range" min={0} max={10} value={f.tu} onChange={(e) => cambiar(f.id, (x) => ({ ...x, tu: +e.target.value }))} className="accent-[#ff851d]" aria-label={`Tu oferta: ${f.nombre}`} />
                    <span className="w-5 text-right font-black text-[#ff851d]">{f.tu}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(Object.keys(ACCIONES) as Accion[]).filter((k) => k !== 'M').map((k) => (
                      <button key={k} onClick={() => cambiar(f.id, (x) => aplicar(x, k))} className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-colors ${a === k ? 'text-white' : isDark ? 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333]' : 'bg-white text-gray-600 hover:bg-gray-200'}`} style={a === k ? { background: ACCIONES[k].color } : undefined}>{ACCIONES[k].txt}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={agregar} disabled={factores.length >= 12} className="self-start px-3 py-1.5 rounded-full text-[12px] font-black text-white bg-gradient-to-r from-[#ff851d] to-[#ef375c] disabled:opacity-40">+ Agregar factor</button>
        </div>

        {/* lienzo y matriz ERIC */}
        <div className="lg:w-[54%] min-w-0 flex flex-col gap-3">
          <div className={`p-3 rounded-3xl ${panelClass(isDark)}`}>
            <p className={microLabel(isDark)}>Lienzo estratégico</p>
            <svg ref={svg} viewBox={`0 0 ${VW} ${VH}`} className="w-full max-h-[300px] touch-none select-none" role="img" aria-label="Lienzo estratégico con la curva de la industria y tu curva de valor"
              onPointerMove={mover} onPointerUp={() => setArrastre(null)} onPointerLeave={() => setArrastre(null)}>
              <defs><linearGradient id="oam-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ff851d" /><stop offset="1" stopColor="#ef375c" /></linearGradient></defs>
              {[0, 5, 10].map((v) => <g key={v}><line x1={X0} x2={X1} y1={Y(v)} y2={Y(v)} stroke={gris} strokeWidth={v === 0 ? 2 : 1} strokeDasharray={v === 0 ? undefined : '4 6'} /><text x={X0 - 10} y={Y(v) + 4} textAnchor="end" fontSize={12} fill={isDark ? '#9ca3af' : '#6b7280'} fontWeight={700}>{v === 10 ? 'Alto' : v === 0 ? 'Bajo' : ''}</text></g>)}
              {factores.map((f, k) => <rect key={f.id} x={X(k) - 12} y={Y1 - 8} width={24} height={Y0 - Y1 + 8} rx={8} fill={ACCIONES[accionDe(f)].color} opacity={accionDe(f) === 'M' ? 0 : 0.1} />)}
              <polyline points={factores.map((f, k) => `${X(k)},${Y(f.ind)}`).join(' ')} fill="none" stroke="#94a3b8" strokeWidth={4} strokeLinejoin="round" />
              <polyline points={factores.map((f, k) => `${X(k)},${Y(f.tu)}`).join(' ')} fill="none" stroke="url(#oam-g)" strokeWidth={5} strokeLinejoin="round" />
              {factores.map((f, k) => (
                <g key={f.id}>
                  <circle cx={X(k)} cy={Y(f.ind)} r={8} fill="#94a3b8" stroke={isDark ? '#1f1f1f' : '#fff'} strokeWidth={2} style={{ cursor: 'ns-resize' }} onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); setArrastre({ id: f.id, campo: 'ind' }); }} />
                  <circle cx={X(k)} cy={Y(f.tu)} r={10} fill="#ff851d" stroke={isDark ? '#1f1f1f' : '#fff'} strokeWidth={2} style={{ cursor: 'ns-resize' }} onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); setArrastre({ id: f.id, campo: 'tu' }); }} />
                  <text transform={`translate(${X(k) + 4} ${Y0 + 14}) rotate(35)`} fontSize={12} fontWeight={700} fill={isDark ? '#d1d5db' : '#374151'}>{f.nombre.length > 16 ? f.nombre.slice(0, 15) + '…' : f.nombre}</text>
                </g>
              ))}
            </svg>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-bold">
              <span className="flex items-center gap-1.5"><span className="w-4 h-1 rounded bg-[#94a3b8]" /><span className={textMuted(isDark)}>{industria}</span></span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-1 rounded bg-gradient-to-r from-[#ff851d] to-[#ef375c]" /><span className={textMuted(isDark)}>{tuNombre}</span></span>
              <span className={`ml-auto ${igualdad >= 0.7 ? 'text-[#e5484d]' : 'text-[#10b981]'}`}>{igualdad >= 0.7 ? 'Curvas casi pegadas: océano rojo' : 'Tu curva se separa: rumbo al océano azul'}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {(['E', 'A', 'R', 'C'] as Accion[]).map((k) => (
              <div key={k} className={`p-2.5 rounded-2xl ${k === 'C' ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: ACCIONES[k].color }}>{ACCIONES[k].txt}</p>
                <p className={`text-[12px] leading-snug mt-0.5 [overflow-wrap:anywhere] ${grupos[k].length ? texto : textMuted(isDark)}`}>{grupos[k].length ? grupos[k].map((f) => f.nombre).join(' · ') : '—'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
