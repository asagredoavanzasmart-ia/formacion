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
    <path d="M -128 -20 Q -130 -56 -100 -62 L -62 -66 L -34 -102 Q -26 -110 -8 -110 L 52 -110 Q 70 -110 82 -98 L 108 -66 Q 132 -62 134 -40 L 134 -22 Q 134 -12 124 -12 L -120 -12 Q -128 -12 -128 -20 Z" fill={color} />
    <path d="M -128 -40 L 134 -40 L 134 -22 Q 134 -12 124 -12 L -120 -12 Q -128 -12 -128 -20 Z" fill="#000" opacity={0.14} />
    <path d="M -54 -66 L -30 -98 Q -26 -102 -18 -102 L 14 -102 L 14 -66 Z" fill="#dbeafe" opacity={0.92} />
    <path d="M 24 -102 L 50 -102 Q 62 -102 70 -92 L 92 -66 L 24 -66 Z" fill="#dbeafe" opacity={0.92} />
    <path d="M 19 -102 V -16" stroke="#000" strokeOpacity={0.12} strokeWidth={3} />
    <rect x={30} y={-56} width={18} height={5} rx={2} fill="#000" opacity={0.25} />
    <rect x={124} y={-56} width={10} height={12} rx={3} fill="#fde68a" />
    <rect x={-128} y={-56} width={8} height={12} rx={3} fill="#ef4444" />
    {nuevo && <path d="M -20 -98 L 6 -98 L -24 -70 L -44 -70 Z" fill="#fff" opacity={0.55} />}
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

/* Mano abierta que empuja hacia la derecha, con antebrazo. (x, y) es el centro de la palma. */
export const Mano: React.FC<{ x: number; y: number; s?: number; manga?: string; op?: number; empuja?: number; t?: number }> = ({ x, y, s = 1, manga = '#334155', op = 1, empuja = 0, t = 0 }) => {
  const piel = '#f5c09a', sombraP = '#e3a47a';
  // Dedos hacia arriba (gesto de «alto» que empuja): índice, medio, anular y meñique, de izquierda a derecha.
  const DEDOS: [number, number][] = [[-22, 58], [-4, 68], [14, 63], [31, 48]];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      {/* Manga y puño de la camisa */}
      <rect x={-250} y={-30} width={200} height={60} rx={26} fill={manga} />
      <rect x={-250} y={6} width={200} height={24} rx={12} fill="#000" opacity={0.18} />
      <rect x={-64} y={-36} width={24} height={72} rx={9} fill="#e2e8f0" />
      <rect x={-64} y={8} width={24} height={28} rx={9} fill="#000" opacity={0.08} />
      {/* Muñeca y palma */}
      <rect x={-44} y={-22} width={28} height={50} fill={piel} />
      <path d="M -28 -40 Q -28 -54 -12 -54 H 30 Q 44 -54 44 -40 V 30 Q 44 54 16 56 H -4 Q -28 54 -28 30 Z" fill={piel} />
      {/* Dedos con uñas */}
      {DEDOS.map(([fx, h], k) => (
        <g key={k}>
          <rect x={fx - 7.5} y={-48 - h} width={15} height={h + 12} rx={7.5} fill={piel} />
          <rect x={fx - 5} y={-46 - h} width={10} height={11} rx={5} fill="#fde4d2" />
          <path d={`M ${fx - 6} ${-48 - h * 0.45} h 12`} stroke={sombraP} strokeWidth={2} strokeLinecap="round" opacity={0.7} />
        </g>
      ))}
      {/* Pulgar abierto hacia la izquierda */}
      <path d="M -24 34 Q -42 32 -50 12 L -62 -14 Q -66 -27 -55 -31 Q -45 -34 -40 -23 L -26 2 Z" fill={piel} />
      <rect x={-62} y={-28} width={10} height={10} rx={5} fill="#fde4d2" transform="rotate(-25 -57 -23)" />
      {/* Sombra lateral de la palma */}
      <path d="M 18 -54 H 30 Q 44 -54 44 -40 V 30 Q 44 54 16 56 Z" fill={sombraP} opacity={0.45} />
      {/* Líneas de empuje */}
      {empuja > 0.01 && [0, 1, 2].map((k) => (
        <path key={k} d={`M ${62 + k * 14 + 4 * Math.sin(t * 8 + k)} ${-44 + k * 4} q 12 44 0 88`} stroke={sombraP} strokeWidth={5} fill="none" strokeLinecap="round" opacity={empuja * (0.8 - k * 0.22)} />
      ))}
    </g>
  );
};

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
  const rot = t * 18;
  return (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <ellipse cx={0} cy={r + 14} rx={r * 0.8} ry={14} fill="#000" opacity={0.14} />
      <circle r={r} fill="#3b82f6" opacity={0.9} />
      <circle r={r} fill="#fff" opacity={0.08} />
      {[-60, -30, 0, 30, 60].map((lat) => { const yy = -r * Math.sin((lat * Math.PI) / 180), rr = r * Math.cos((lat * Math.PI) / 180); return <ellipse key={lat} cx={0} cy={yy} rx={rr} ry={rr * 0.12} fill="none" stroke="#fff" strokeOpacity={0.25} strokeWidth={2} />; })}
      {Array.from({ length: 6 }, (_, k) => { const a = (((k * 30 + rot) % 180) * Math.PI) / 180; return <ellipse key={k} cx={0} cy={0} rx={Math.abs(r * Math.cos(a))} ry={r} fill="none" stroke="#fff" strokeOpacity={0.22} strokeWidth={2} />; })}
      {/* Manchas de tierra que giran con el globo */}
      {[[-40, 20, 70, 50], [60, -10, 60, 70], [150, 30, 80, 46], [230, -30, 50, 40], [300, 40, 40, 30]].map(([lon, lat, w, h], k) => {
        const a = ((lon + rot) * Math.PI) / 180;
        if (Math.cos(a) < 0.05) return null;
        const px = r * Math.sin(a) * Math.cos((lat * Math.PI) / 180), py = -r * Math.sin((lat * Math.PI) / 180);
        return <ellipse key={k} cx={px} cy={py} rx={(w / 2) * Math.cos(a)} ry={h / 2} fill="#10b981" opacity={0.85} />;
      })}
      {pins.slice(0, n).map(([lon, lat], k) => {
        const a = ((lon + rot) * Math.PI) / 180;
        if (Math.cos(a) < 0.05) return null;
        const px = r * Math.sin(a) * Math.cos((lat * Math.PI) / 180), py = -r * Math.sin((lat * Math.PI) / 180);
        return <g key={k} transform={`translate(${px} ${py})`}><path d="M 0 0 L -9 -20 A 11 11 0 1 1 9 -20 Z" fill={color} /><circle cy={-24} r={4.5} fill={c.panel} /></g>;
      })}
    </g>
  );
};

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
