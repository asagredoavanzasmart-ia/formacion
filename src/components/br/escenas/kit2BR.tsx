import React from 'react';
import { NARANJA, ROSA, tono, sombra, Txt, lerp } from '../../vc/escenas/kitVC';
import { PisoTexto, Persona } from '../../remotion/comun';

/* Dibujos de «Los secretos de Brunson», segunda versión: objetos literales bien construidos (sólidos rellenos, tres
   tonos, sombra suave, sin contornos) para armar cada escena como un escenario continuo. */

type C = ReturnType<typeof tono>;
const cl01 = (v: number) => Math.max(0, Math.min(1, v));

/* Tarjeta de contenido: panel con franja de marca arriba y título. (x, y) es la esquina superior izquierda. */
export const Tarjeta: React.FC<{ x: number; y: number; w: number; h: number; titulo?: string; c: C; id: string; op?: number; s?: number; acento?: string; children?: React.ReactNode; tam?: number }> = ({ x, y, w, h, titulo, c, id, op = 1, s = 1, acento, children, tam = 26 }) => {
  if (op <= 0.005) return null;
  return (
    <g opacity={Math.min(1, op)} transform={`translate(${x + w / 2} ${y + h / 2}) scale(${s}) translate(${-w / 2} ${-h / 2})`}>
      <rect width={w} height={h} rx={26} fill={c.panel} style={sombra(0.16, 8, 18)} />
      <rect width={w} height={10} rx={5} fill={acento ?? `url(#${id}-marcaH)`} />
      {titulo && <Txt x={w / 2} y={48} textAnchor="middle" fontSize={tam} fill={c.tenue} peso={800}>{titulo}</Txt>}
      {children}
    </g>
  );
};

/* Conector curvo que se dibuja (`u` 0 → 1) y, ya trazado, lleva partículas de un extremo al otro. */
export const Conector: React.FC<{ x1: number; y1: number; x2: number; y2: number; u: number; t: number; curva?: number; color?: string; grosor?: number; puntos?: number; vel?: number; op?: number; guiones?: boolean }> = ({ x1, y1, x2, y2, u, t, curva = 0, color = NARANJA, grosor = 5, puntos = 4, vel = 0.7, op = 1, guiones = false }) => {
  if (u <= 0.005 || op <= 0.005) return null;
  const mx = (x1 + x2) / 2 - (y2 - y1) * curva, my = (y1 + y2) / 2 + (x2 - x1) * curva;
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const en = (p: number): [number, number] => [(1 - p) ** 2 * x1 + 2 * (1 - p) * p * mx + p * p * x2, (1 - p) ** 2 * y1 + 2 * (1 - p) * p * my + p * p * y2];
  return (
    <g opacity={op}>
      <path d={d} stroke={color} strokeWidth={grosor} fill="none" strokeLinecap="round" opacity={0.35} pathLength={1} strokeDasharray={guiones ? '0.02 0.02' : `${u} 1`} />
      {u >= 0.99 && Array.from({ length: puntos }, (_, k) => {
        const p = (t * vel + k / puntos) % 1;
        const [px, py] = en(p);
        return <circle key={k} cx={px} cy={py} r={grosor + 2} fill={color} opacity={Math.sin(Math.PI * p)} />;
      })}
    </g>
  );
};

/* Auto visto de lado, mirando a la derecha. (x, y) es el punto de apoyo en el suelo. `viejo` agrega abolladura,
   parche y humo; `nuevo` agrega brillo. `rueda` es el giro acumulado de las ruedas. */
export const Coche: React.FC<{ x: number; y: number; s?: number; color: string; rueda?: number; viejo?: boolean; nuevo?: boolean; t?: number; op?: number }> = ({ x, y, s = 1, color, rueda = 0, viejo = false, nuevo = false, t = 0, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <ellipse cx={0} cy={4} rx={138} ry={10} fill="#000" opacity={0.16} />
    {viejo && [0, 1, 2].map((k) => { const p = (t * 0.6 + k / 3) % 1; return <circle key={k} cx={-140 - p * 70} cy={-34 - p * 40} r={10 + p * 18} fill="#94a3b8" opacity={0.5 * (1 - p)} />; })}
    {/* Sedán mirando a +x: maleta corta atrás (luz roja), cabina retrasada y capó largo adelante (faro amarillo) */}
    <path d="M -130 -22 Q -131 -54 -112 -60 L -96 -64 L -72 -100 Q -66 -107 -54 -107 L 22 -107 Q 34 -107 42 -99 L 72 -66 L 118 -61 Q 134 -57 134 -40 L 134 -22 Q 134 -12 124 -12 L -120 -12 Q -130 -12 -130 -22 Z" fill={color} />
    <path d="M -130 -40 L 134 -40 L 134 -22 Q 134 -12 124 -12 L -120 -12 Q -130 -12 -130 -22 Z" fill="#000" opacity={0.14} />
    {/* Línea del capó y de la maleta */}
    <path d="M 74 -64 Q 100 -60 126 -56" stroke="#000" strokeOpacity={0.1} strokeWidth={3} fill="none" />
    {/* Ventana trasera (inclinada hacia atrás) y ventana delantera con el parabrisas */}
    <path d="M -86 -66 L -66 -96 Q -62 -100 -56 -100 L -24 -100 L -24 -66 Z" fill="#dbeafe" opacity={0.92} />
    <path d="M -14 -100 L 18 -100 Q 28 -100 34 -93 L 58 -66 L -14 -66 Z" fill="#dbeafe" opacity={0.92} />
    <path d="M -19 -100 V -16" stroke="#000" strokeOpacity={0.12} strokeWidth={3} />
    <path d="M 62 -66 V -16" stroke="#000" strokeOpacity={0.08} strokeWidth={2} />
    <rect x={-6} y={-56} width={18} height={5} rx={2} fill="#000" opacity={0.25} />
    <rect x={-60} y={-56} width={18} height={5} rx={2} fill="#000" opacity={0.25} />
    {/* Faro delantero amarillo con su haz, y luz trasera roja */}
    <path d="M 122 -58 Q 134 -55 134 -46 L 124 -46 Z" fill="#fde68a" />
    <rect x={-130} y={-54} width={9} height={13} rx={3} fill="#ef4444" />
    <rect x={128} y={-30} width={6} height={10} rx={2} fill="#f59e0b" opacity={0.8} />
    {nuevo && <path d="M 4 -97 L 18 -97 L -2 -69 L -12 -69 Z" fill="#fff" opacity={0.55} />}
    {viejo && <><path d="M -96 -40 q 12 -10 24 0 q -12 8 -24 0 Z" fill="#000" opacity={0.18} /><rect x={-4} y={-58} width={42} height={26} rx={5} fill="#fbbf24" transform="rotate(-10 17 -45)" /><path d="M 2 -50 L 32 -40 M 2 -40 L 32 -50" stroke="#b45309" strokeWidth={3} transform="rotate(-10 17 -45)" /></>}
    {[-74, 80].map((wx) => (
      <g key={wx} transform={`translate(${wx} -10)`}>
        <circle r={27} fill="#111827" />
        <circle r={13} fill="#cbd5e1" />
        <g transform={`rotate(${rueda})`}>{[0, 60, 120].map((a) => <rect key={a} x={-2.5} y={-12} width={5} height={24} rx={2} fill="#64748b" transform={`rotate(${a})`} />)}</g>
        <circle r={4} fill="#475569" />
      </g>
    ))}
  </g>
);

/* Casa: muros, techo con alero, chimenea, puerta y ventanas con luz. (x, y) es el centro del suelo. */
export const Casa: React.FC<{ x: number; y: number; s?: number; muro?: string; techo?: string; luz?: number; puerta?: number; op?: number }> = ({ x, y, s = 1, muro = '#fde7d2', techo = ROSA, luz = 1, puerta = 0, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <ellipse cx={0} cy={4} rx={150} ry={12} fill="#000" opacity={0.15} />
    <rect x={70} y={-240} width={30} height={60} fill="#7c2d12" />
    <rect x={-120} y={-170} width={240} height={170} fill={muro} />
    <rect x={30} y={-170} width={90} height={170} fill="#000" opacity={0.06} />
    <path d="M -146 -160 L 0 -262 L 146 -160 Z" fill={techo} />
    <path d="M 0 -262 L 146 -160 L 0 -160 Z" fill="#000" opacity={0.12} />
    <rect x={-30} y={-96} width={60} height={96} rx={6} fill="#7c2d12" />
    <rect x={-30} y={-96} width={60 * (1 - 0.7 * puerta)} height={96} rx={6} fill="#9a3412" />
    <circle cx={-30 + 60 * (1 - 0.7 * puerta) - 10} cy={-46} r={4} fill="#fbbf24" />
    {[-82, 82].map((wx) => <g key={wx}><rect x={wx - 26} y={-130} width={52} height={46} rx={6} fill="#fde68a" opacity={0.35 + 0.65 * luz} /><path d={`M ${wx} -130 V -84 M ${wx - 26} -107 H ${wx + 26}`} stroke={muro} strokeWidth={5} /></g>)}
  </g>
);

/* Balanza de dos platos: `inc` en grados (positivo baja el plato derecho). `izq` y `der` se dibujan sobre cada plato. */
export const Balanza: React.FC<{ x: number; y: number; inc: number; c: C; brazo?: number; alto?: number; izq?: React.ReactNode; der?: React.ReactNode; color?: string; op?: number }> = ({ x, y, inc, c, brazo = 220, alto = 260, izq, der, color, op = 1 }) => {
  const r = (inc * Math.PI) / 180;
  const ex = Math.cos(r) * brazo, ey = Math.sin(r) * brazo;
  const col = color ?? c.texto;
  // Platos proporcionales al brazo: en balanzas chicas no se salen de su lugar.
  const pw = Math.min(90, brazo * 0.42), ph = Math.min(90, brazo * 0.45), hondo = pw * 0.55;
  const plato = (px: number, py: number, cont: React.ReactNode, k: number) => (
    <g key={k}>
      <path d={`M ${px} ${py} L ${px - pw * 0.78} ${py + ph} M ${px} ${py} L ${px + pw * 0.78} ${py + ph}`} stroke={col} strokeWidth={Math.max(2, pw / 30)} opacity={0.6} />
      <circle cx={px} cy={py} r={Math.max(4, pw / 12)} fill={col} />
      <g transform={`translate(${px} ${py + ph})`}>{cont}</g>
      <path d={`M ${px - pw} ${py + ph} Q ${px} ${py + ph + hondo} ${px + pw} ${py + ph} Z`} fill={col} opacity={0.85} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <ellipse cx={0} cy={4} rx={110} ry={12} fill="#000" opacity={0.14} />
      <path d="M -90 0 Q -90 -24 -60 -24 H 60 Q 90 -24 90 0 Z" fill={col} />
      <rect x={-12} y={-alto} width={24} height={alto - 20} rx={10} fill={col} />
      <g transform={`translate(0 ${-alto})`}>
        <rect x={-brazo} y={-8} width={brazo * 2} height={16} rx={8} fill={col} transform={`rotate(${inc})`} />
        <circle r={20} fill={NARANJA} />
        {plato(-ex, -ey, izq, 0)}
        {plato(ex, ey, der, 1)}
      </g>
    </g>
  );
};

/* Pescador sentado en una orilla con caña: la punta sigue a (hx, hy) con la línea y el anzuelo. */
export const Pescador: React.FC<{ id: string; x: number; y: number; hx: number; hy: number; c: C; s?: number; cuerpo?: string; tira?: number; op?: number }> = ({ id, x, y, hx, hy, c, s = 1, cuerpo = NARANJA, tira = 0, op = 1 }) => {
  const mano = [x + 30 * s, y - 80 * s];
  const punta = [lerp(mano[0] + 40, hx, 0.75), Math.min(hy - 160, mano[1] - 120 - 20 * tira)];
  return (
    <g opacity={op}>
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx={0} cy={2} rx={52} ry={13} fill="#000" opacity={0.22} />
        <path d="M -40 0 L -40 -72 Q -40 -108 0 -108 Q 40 -108 40 -72 L 40 0 Z" fill={cuerpo} />
        <path d="M 0 -108 Q 40 -108 40 -72 L 40 0 L 0 0 Z" fill="#000" opacity={0.14} />
        <circle cx={0} cy={-134} r={31} fill={`url(#${id}-cara)`} />
        <path d="M -36 -146 Q 0 -190 36 -146 Z" fill="#78350f" />
        <rect x={-44} y={-150} width={88} height={10} rx={5} fill="#92400e" />
        <circle cx={10} cy={-131} r={3.6} fill="#3b2a20" />
      </g>
      <path d={`M ${mano[0]} ${mano[1]} Q ${(mano[0] + punta[0]) / 2} ${punta[1] + 30 + 20 * tira} ${punta[0]} ${punta[1]}`} stroke="#78350f" strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d={`M ${punta[0]} ${punta[1]} Q ${(punta[0] + hx) / 2 + 10} ${(punta[1] + hy) / 2} ${hx} ${hy - 22}`} stroke={c.texto} strokeWidth={2.5} fill="none" opacity={0.75} />
      <path d={`M ${hx} ${hy - 22} V ${hy} q 0 16 -14 16 q -10 0 -10 -10`} stroke={c.texto} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
};

/* Brazo articulado con mano (compartido por todas las clases en remotion/brazo). */
export { Brazo, ManoPerfil, resorte, suave, hombroDe, resolverCodo, PIEL } from '../../remotion/brazo';

/* Avión visto desde arriba, nariz hacia arriba. `agujeros` son puntos [x, y] relativos con impactos. */
export const Avion: React.FC<{ x: number; y: number; s?: number; color?: string; agujeros?: [number, number][]; agU?: number; op?: number }> = ({ x, y, s = 1, color = '#94a3b8', agujeros = [], agU = 1, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <path d="M -300 40 L -34 -30 L 34 -30 L 300 40 L 300 66 L 34 34 L -34 34 L -300 66 Z" fill={color} />
    <path d="M -300 52 L 300 52 L 300 66 L 34 34 L -34 34 L -300 66 Z" fill="#000" opacity={0.1} />
    <path d="M -120 210 L -24 170 L 24 170 L 120 210 L 120 230 L -120 230 Z" fill={color} />
    <path d="M -34 -170 Q 0 -250 34 -170 L 34 200 Q 0 250 -34 200 Z" fill={color} />
    <path d="M 0 -240 Q 34 -210 34 -170 L 34 200 Q 20 236 0 240 Z" fill="#000" opacity={0.1} />
    <path d="M -18 -190 Q 0 -220 18 -190 L 18 -170 L -18 -170 Z" fill="#1e293b" opacity={0.7} />
    {[-200, -130, 130, 200].map((ex) => <rect key={ex} x={ex - 16} y={6} width={32} height={50} rx={12} fill="#64748b" />)}
    {agujeros.map(([ax, ay], k) => <g key={k} opacity={cl01(agU * agujeros.length - k)}><circle cx={ax} cy={ay} r={11} fill="#1f2937" /><circle cx={ax} cy={ay} r={18} fill="none" stroke="#1f2937" strokeWidth={3} opacity={0.35} /></g>)}
  </g>
);

/* Balde con agua: `nivel` 0 a 1, `fugas` agujeros abiertos en la base (de izquierda a derecha), con gotas que caen. */
export const Balde: React.FC<{ x: number; y: number; t: number; nivel: number; fugas: number; s?: number; tapados?: number; op?: number }> = ({ x, y, t, nivel, fugas, s = 1, tapados = 0, op = 1 }) => {
  const H = 260, top = -H, wTop = 150, wBot = 110;
  const yAgua = lerp(-20, top + 30, nivel);
  const wA = lerp(wBot, wTop, (yAgua - 0) / top);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <ellipse cx={0} cy={6} rx={130} ry={12} fill="#000" opacity={0.15} />
      <path d={`M ${-wTop} ${top} Q 0 ${top - 120} ${wTop} ${top}`} stroke="#64748b" strokeWidth={8} fill="none" />
      <path d={`M ${-wTop} ${top} L ${wTop} ${top} L ${wBot} 0 L ${-wBot} 0 Z`} fill="#94a3b8" />
      <path d={`M ${-wA + 12} ${yAgua} L ${wA - 12} ${yAgua} L ${wBot - 12} -12 L ${-wBot + 12} -12 Z`} fill="#3b82f6" opacity={0.85} />
      <path d={`M ${-wA + 12} ${yAgua} Q ${-wA / 2} ${yAgua - 8 * Math.sin(t * 3)} 0 ${yAgua} Q ${wA / 2} ${yAgua + 8 * Math.sin(t * 3)} ${wA - 12} ${yAgua}`} stroke="#93c5fd" strokeWidth={6} fill="none" />
      <path d={`M ${wTop - 40} ${top} L ${wTop} ${top} L ${wBot} 0 L ${wBot - 34} 0 Z`} fill="#000" opacity={0.12} />
      <rect x={-wTop - 8} y={top - 10} width={wTop * 2 + 16} height={20} rx={10} fill="#64748b" />
      {[-60, -20, 20, 60].map((hx, k) => {
        const abierto = k < fugas && k >= tapados;
        return (
          <g key={hx}>
            <circle cx={hx} cy={-6} r={9} fill={k < tapados ? '#10b981' : k < fugas ? '#0f172a' : 'none'} />
            {abierto && [0, 1, 2].map((j) => { const p = (t * 1.1 + j / 3 + k * 0.17) % 1; return <ellipse key={j} cx={hx + 4 * p} cy={10 + p * 110} rx={6} ry={9} fill="#3b82f6" opacity={(1 - p) * nivel} />; })}
          </g>
        );
      })}
    </g>
  );
};

/* Ventana de navegador con barra de dirección. (x, y) es la esquina superior izquierda. */
export const Navegador: React.FC<{ x: number; y: number; w: number; h: number; c: C; texto?: string; children?: React.ReactNode; op?: number }> = ({ x, y, w, h, c, texto = '', children, op = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <rect width={w} height={h} rx={20} fill={c.panel} style={sombra(0.18, 8, 18)} />
    <path d={`M 0 20 Q 0 0 20 0 H ${w - 20} Q ${w} 0 ${w} 20 V 50 H 0 Z`} fill={c.panel2} />
    {['#ef4444', '#f59e0b', '#10b981'].map((col, k) => <circle key={col} cx={26 + k * 22} cy={25} r={7} fill={col} />)}
    <rect x={100} y={12} width={w - 120} height={28} rx={14} fill={c.panel} />
    <circle cx={118} cy={26} r={7} fill="none" stroke={c.tenue} strokeWidth={3} /><path d="M 123 31 l 6 6" stroke={c.tenue} strokeWidth={3} strokeLinecap="round" />
    <Txt x={136} y={34} fontSize={22} fill={c.texto} peso={800}>{texto}</Txt>
    {children}
  </g>
);

/* Globo terráqueo que gira: meridianos y alfileres en longitud/latitud (grados) que aparecen según `pins`. */
export const Globo: React.FC<{ x: number; y: number; r: number; t: number; pins?: [number, number][]; n?: number; color?: string; c: C; op?: number }> = ({ x, y, r, t, pins = [], n = 0, color = NARANJA, c, op = 1 }) => {
  const uid = React.useId().replace(/:/g, '');
  // Proyección ortográfica real: el globo gira sobre su eje y está inclinado 20° hacia quien mira.
  // Gira lento y en el sentido real (de oeste a este): parte en Europa y África y llega al Atlántico con América.
  const lon0 = 15 - t * 4, lat0 = 20, R = Math.PI / 180;
  const sf0 = Math.sin(lat0 * R), cf0 = Math.cos(lat0 * R);
  const proy = (lon: number, lat: number) => {
    const f = lat * R, dl = (lon - lon0) * R;
    const px = Math.cos(f) * Math.sin(dl), py = cf0 * Math.sin(f) - sf0 * Math.cos(f) * Math.cos(dl);
    const vis = sf0 * Math.sin(f) + cf0 * Math.cos(f) * Math.cos(dl);
    return { px, py, vis };
  };
  // Continentes: el lado oculto se pega al borde del disco, así la silueta nunca se da vuelta.
  const ruta = (pts: number[][]) => {
    const p = pts.map(([lo, la]) => proy(lo, la));
    if (p.every((q) => q.vis < 0)) return null;
    return p.map((q, k) => { let { px, py } = q; if (q.vis < 0) { const l = Math.hypot(px, py) || 1; px /= l; py /= l; } return `${k ? 'L' : 'M'} ${(px * r).toFixed(1)} ${(-py * r).toFixed(1)}`; }).join(' ') + ' Z';
  };
  const tierra = CONTINENTES.map((pts, k) => { const d = ruta(pts); return d ? <path key={k} d={d} fill="#22a06b" stroke="#178a5a" strokeWidth={1.5} strokeLinejoin="round" /> : null; });
  const linea = (pts: [number, number][], k: string) => {
    let d = '', abierto = false;
    pts.forEach(([lo, la]) => { const q = proy(lo, la); if (q.vis > 0) { d += `${abierto ? 'L' : 'M'} ${(q.px * r).toFixed(1)} ${(-q.py * r).toFixed(1)} `; abierto = true; } else abierto = false; });
    return d ? <path key={k} d={d} fill="none" stroke="#fff" strokeOpacity={0.22} strokeWidth={1.5} /> : null;
  };
  const paralelos = [-60, -30, 0, 30, 60].map((la) => linea(Array.from({ length: 73 }, (_, i) => [i * 5 - 180, la]), `p${la}`));
  const meridianos = Array.from({ length: 12 }, (_, k) => linea(Array.from({ length: 37 }, (_, i) => [k * 30, i * 5 - 90]), `m${k}`));
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <defs>
        <clipPath id={`${uid}-disco`}><circle r={r} /></clipPath>
        <radialGradient id={`${uid}-mar`} cx="38%" cy="32%" r="75%"><stop offset="0" stopColor="#60a5fa" /><stop offset="0.65" stopColor="#2563eb" /><stop offset="1" stopColor="#1e3a8a" /></radialGradient>
        <radialGradient id={`${uid}-luz`} cx="35%" cy="30%" r="70%"><stop offset="0" stopColor="#fff" stopOpacity={0.28} /><stop offset="0.5" stopColor="#fff" stopOpacity={0} /><stop offset="1" stopColor="#000" stopOpacity={0.22} /></radialGradient>
      </defs>
      <ellipse cx={0} cy={r + 14} rx={r * 0.8} ry={14} fill="#000" opacity={0.14} />
      <circle r={r} fill={`url(#${uid}-mar)`} />
      <g clipPath={`url(#${uid}-disco)`}>
        {paralelos}{meridianos}
        {tierra}
      </g>
      <circle r={r} fill={`url(#${uid}-luz)`} />
      {pins.slice(0, n).map(([lon, lat], k) => {
        const q = proy(lon, lat);
        if (q.vis < 0.08) return null;
        return <g key={k} transform={`translate(${q.px * r} ${-q.py * r})`}><path d="M 0 0 L -9 -20 A 11 11 0 1 1 9 -20 Z" fill={color} /><circle cy={-24} r={4.5} fill={c.panel} /></g>;
      })}
    </g>
  );
};

/* Siluetas simplificadas de los continentes en [longitud, latitud]. */
const CONTINENTES: number[][][] = [
  // América del Norte
  [[-168, 66], [-162, 70], [-140, 70], [-120, 72], [-95, 72], [-80, 73], [-75, 64], [-65, 60], [-60, 52], [-66, 45], [-70, 42], [-76, 35], [-80, 31], [-81, 25], [-83, 29], [-90, 30], [-97, 27], [-97, 21], [-90, 21], [-87, 16], [-83, 10], [-79, 8], [-86, 13], [-92, 15], [-105, 20], [-110, 24], [-112, 30], [-118, 34], [-124, 40], [-124, 48], [-133, 56], [-148, 60], [-158, 57], [-165, 60]],
  // Groenlandia
  [[-50, 60], [-42, 60], [-22, 70], [-20, 80], [-40, 83], [-60, 80], [-70, 76], [-55, 68]],
  // América del Sur
  [[-79, 8], [-72, 12], [-62, 10], [-52, 5], [-50, 0], [-35, -6], [-39, -14], [-41, -22], [-48, -26], [-53, -34], [-58, -38], [-65, -42], [-67, -50], [-70, -54], [-75, -50], [-73, -40], [-71, -30], [-71, -18], [-76, -14], [-81, -5], [-80, 0], [-78, 6]],
  // Europa y Asia
  [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [0, 50], [5, 53], [8, 57], [5, 62], [15, 68], [25, 71], [40, 68], [60, 70], [80, 73], [100, 77], [120, 73], [140, 72], [160, 70], [180, 68], [178, 62], [160, 60], [155, 50], [142, 46], [135, 43], [130, 35], [122, 40], [120, 32], [122, 25], [110, 20], [108, 12], [105, 9], [100, 13], [101, 7], [104, 1.5], [100, 5], [98, 9], [98, 16], [93, 20], [90, 22], [80, 15], [77, 8], [73, 20], [67, 25], [58, 25], [56, 27], [50, 30], [48, 29], [52, 24], [56, 22], [57, 18], [52, 15], [45, 13], [43, 15], [38, 22], [34, 28], [32, 31], [35, 36], [27, 37], [26, 41], [23, 38], [20, 40], [16, 38], [18, 40], [13, 45], [12, 44], [16, 41], [8, 44], [3, 43], [-1, 37], [-6, 36]],
  // África
  [[-17, 21], [-16, 14], [-12, 8], [-8, 4], [0, 5], [8, 4], [9, 1], [12, -6], [13, -12], [12, -18], [15, -27], [18, -34], [25, -34], [32, -28], [35, -24], [35, -18], [40, -15], [40, -8], [39, -4], [43, 0], [51, 12], [44, 11], [43, 13], [39, 16], [37, 22], [34, 28], [32, 31], [25, 32], [20, 32], [11, 33], [10, 37], [0, 36], [-6, 36], [-10, 30], [-13, 27]],
  // Madagascar
  [[44, -25], [47, -25], [50, -15], [49, -12], [44, -17]],
  // Gran Bretaña
  [[-5, 50], [1, 51], [0, 53], [-3, 56], [-5, 58], [-6, 56], [-3, 54], [-5, 52]],
  // Japón
  [[130, 31], [135, 34], [140, 35], [142, 40], [141, 43], [145, 44], [140, 41], [136, 37], [131, 34]],
  // Borneo y Sumatra
  [[109, 1], [111, 2], [117, 7], [119, 5], [116, -4], [110, -3]],
  [[95, 5], [98, 4], [104, -2], [106, -6], [102, -4]],
  // Australia
  [[114, -22], [114, -34], [118, -35], [124, -34], [131, -31], [138, -35], [141, -38], [147, -38], [150, -37], [153, -29], [153, -25], [146, -19], [142, -11], [141, -15], [136, -12], [130, -12], [126, -14], [122, -17]],
];

/* Cara con emoción: `e` de −1 (triste) a 1 (feliz); `enojo` 0 a 1 frunce las cejas. */
export const Cara: React.FC<{ id: string; x: number; y: number; r?: number; e?: number; enojo?: number; op?: number }> = ({ id, x, y, r = 40, e = 0, enojo = 0, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${r / 40})`} opacity={op}>
    <circle r={40} fill={`url(#${id}-cara)`} />
    <circle cx={-14} cy={-6} r={4.5} fill="#3b2a20" /><circle cx={14} cy={-6} r={4.5} fill="#3b2a20" />
    <path d={`M -24 ${-20 - 4 * e} L -6 ${-18 + 8 * enojo} M 24 ${-20 - 4 * e} L 6 ${-18 + 8 * enojo}`} stroke="#3b2a20" strokeWidth={4} strokeLinecap="round" />
    <path d={`M -16 18 Q 0 ${18 + 16 * e} 16 18`} stroke="#3b2a20" strokeWidth={4.5} fill="none" strokeLinecap="round" />
  </g>
);

/* Persona con cara expresiva: la emoción se dibuja sobre su propia cabeza (nunca una cara suelta flotando). */
export const PersonaCara: React.FC<{ id: string; x: number; y: number; s?: number; cuerpo?: string; pelo?: string; corbata?: boolean; e?: number; enojo?: number }> = ({ id, x, y, s = 1, cuerpo, pelo = '#2b1a12', corbata = false, e = 0, enojo = 0 }) => (
  <g>
    <Persona id={id} x={x} y={y} s={s} cuerpo={cuerpo} pelo={pelo} corbata={corbata} />
    <Cara id={id} x={x} y={y - 134 * s} r={31 * s} e={e} enojo={enojo} />
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -32 -138 Q -31 -173 0 -171 Q 31 -173 32 -138 Q 18 -158 0 -157 Q -18 -158 -32 -138 Z" fill={pelo} />
    </g>
  </g>
);

/* Pala de la fiebre del oro. (x, y) es el centro del mango. */
export const Pala: React.FC<{ x: number; y: number; s?: number; rot?: number; op?: number }> = ({ x, y, s = 1, rot = 0, op = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
    <rect x={-8} y={-170} width={16} height={240} rx={7} fill="#a16207" />
    <rect x={-30} y={-190} width={60} height={22} rx={10} fill="#78350f" />
    <path d="M -46 66 H 46 V 130 Q 0 200 -46 130 Z" fill="#94a3b8" />
    <path d="M 0 66 H 46 V 130 Q 24 168 0 176 Z" fill="#000" opacity={0.12} />
  </g>
);

/* Trofeo. (x, y) es la base. */
export const Trofeo: React.FC<{ x: number; y: number; s?: number; op?: number; texto?: string }> = ({ x, y, s = 1, op = 1, texto }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <rect x={-70} y={-40} width={140} height={40} rx={8} fill="#78350f" />
    <rect x={-14} y={-90} width={28} height={50} fill="#eab308" />
    <path d="M -70 -230 Q -120 -230 -110 -180 Q -100 -140 -60 -140" stroke="#eab308" strokeWidth={14} fill="none" />
    <path d="M 70 -230 Q 120 -230 110 -180 Q 100 -140 60 -140" stroke="#eab308" strokeWidth={14} fill="none" />
    <path d="M -76 -240 H 76 V -170 Q 76 -90 0 -90 Q -76 -90 -76 -170 Z" fill="#facc15" />
    <path d="M 0 -240 H 76 V -170 Q 76 -90 0 -90 Z" fill="#000" opacity={0.1} />
    {texto && <Txt x={0} y={-12} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>{texto}</Txt>}
  </g>
);

/* Pizarra con un gráfico que se traza en tiza. (x, y) esquina superior izquierda. */
export const Pizarra: React.FC<{ x: number; y: number; w: number; h: number; u: number; isDark: boolean; titulo?: string; op?: number }> = ({ x, y, w, h, u, isDark, titulo, op = 1 }) => {
  const pts = Array.from({ length: 7 }, (_, k) => [40 + (k * (w - 80)) / 6, h - 40 - (h - 110) * ((k / 6) ** 1.4) - 14 * Math.sin(k * 1.7)]);
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <rect x={-12} y={-12} width={w + 24} height={h + 24} rx={14} fill="#92400e" />
      <rect width={w} height={h} rx={8} fill={isDark ? '#0f3d2e' : '#14532d'} />
      {titulo && <Txt x={w / 2} y={44} textAnchor="middle" fontSize={26} fill="#fff" peso={800} opacity={0.9}>{titulo}</Txt>}
      <path d={pts.map(([px, py], k) => `${k ? 'L' : 'M'} ${px} ${py}`).join(' ')} stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${u} 1`} opacity={0.9} />
      <path d={`M 40 ${h - 30} H ${w - 30}`} stroke="#fff" strokeWidth={3} opacity={0.5} />
    </g>
  );
};

/* Píldora con texto, para rótulos dentro de una escena. Ancho estimado según el largo. */
export const Pastilla: React.FC<{ x: number; y: number; texto: string; fondo: string; tam?: number; op?: number; s?: number; color?: string }> = ({ x, y, texto, fondo, tam = 24, op = 1, s = 1, color = '#fff' }) => {
  const piso = React.useContext(PisoTexto);
  if (op <= 0.005) return null;
  const tf = Math.max(tam, piso);
  const w = texto.length * tf * 0.56 + tf * 1.3, h = tf * 1.7;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={Math.min(1, op)}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fondo} style={sombra(0.15, 4, 8)} />
      <Txt x={0} y={tf * 0.36} textAnchor="middle" fontSize={tam} fill={color} peso={800}>{texto}</Txt>
    </g>
  );
};

/* Logo de ClickFunnels redibujado: ventana oscura con tres puntos y dos piezas enfrentadas (azul y roja) con dientes
   de engranaje. (x, y) es el centro; mide 200 × 150 con s = 1. `texto` agrega el nombre a la derecha. */
export const LogoCF: React.FC<{ x: number; y: number; s?: number; op?: number; texto?: boolean; gira?: number; isDark?: boolean }> = ({ x, y, s = 1, op = 1, texto = false, gira = 0, isDark = false }) => {
  const oscuro = isDark ? '#cbd5e1' : '#3f5368';
  const dientes = (cx: number, lado: 1 | -1, color: string) => [0, 1, 2, 3, 4].map((k) => {
    const yy = 44 + k * 23;
    const bulge = 12 * Math.sin((Math.PI * (yy - 26)) / 124);
    return <circle key={k} cx={cx + lado * (bulge + 4) + lado * 2 * Math.sin(gira + k)} cy={yy} r={8.5} fill={color} />;
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) translate(-100 -75)`} opacity={op}>
      <rect x={0} y={0} width={200} height={150} rx={16} fill={oscuro} />
      <rect x={10} y={30} width={180} height={110} rx={6} fill="#fff" />
      {[0, 1, 2].map((k) => <circle key={k} cx={146 + k * 17} cy={16} r={6} fill="#fff" />)}
      <path d="M 10 30 Q 44 85 10 140 L 56 140 Q 80 85 56 30 Z" fill="#4aa8d8" />
      {dientes(56, 1, '#4aa8d8')}
      <path d="M 144 30 Q 120 85 144 140 L 190 140 Q 156 85 190 30 Z" fill="#e2493b" />
      {dientes(144, -1, '#e2493b')}
      {texto && <Txt x={230} y={98} fontSize={64} fill={oscuro} peso={700}>click funnels</Txt>}
    </g>
  );
};
