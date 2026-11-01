import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Edificio, Engranaje, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, VERDE, VIOLETA } from './comunLS';
import { Toma, Letrero, Apoyo, Portatil, Visto, Cruz, Moneda3D, sm, cl } from './kitLS';
import type { PropsCE } from './comunLS';

/**
 * «Los diez tipos de pivote», escena propia: un mismo producto que se transforma en cada pivote, con un dial
 * de diez segmentos que cuenta en cuál vamos.
 * Acercamiento: una función crece hasta ser el producto. Alejamiento: el producto se vuelve una ventana de un
 * portátil. Segmento: el producto llega a otros clientes. Necesidad: los mismos clientes, otro problema.
 * Plataforma: la aplicación se vuelve una base donde se acoplan otras. Arquitectura: un balancín entre una
 * joya (margen alto) y muchas monedas (volumen alto). Captura del valor: de «por unidad» a «por mes», y el
 * producto y el marketing se reacomodan. Motor, canal y tecnología. Ejemplo: el programa de reservas que
 * usan más los hoteles pequeños que los restaurantes.
 */

const ID = 'ls7';
const nombres = ['acerc', 'alej', 'segm', 'nece', 'plata', 'arq', 'captura', 'quedan', 'motor', 'canal', 'tec', 'ejemplo', 'hoteles', 'pregunta'] as const;
type N = typeof nombres[number];
const WIDG = ['#f59e0b', '#ec4899', '#22c55e', '#6366f1'];

/* Teléfono con cuatro funciones; `foco` agranda la primera hasta llenar la pantalla. (x, y) es el centro. */
const Movil: React.FC<{ x: number; y: number; s?: number; foco?: number; op?: number }> = ({ x, y, s = 1, foco = 0, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <rect x={-80} y={-150} width={160} height={300} rx={26} fill="#1f2937" />
    <rect x={-68} y={-134} width={136} height={268} rx={16} fill="#e0f2fe" />
    {WIDG.map((col, k) => {
      const x0 = -56 + (k % 2) * 62, y0 = -118 + Math.floor(k / 2) * 66;
      if (k === 0) { const w = lerp(50, 112, foco), h = lerp(54, 236, foco); return <g key={k}><rect x={x0} y={y0} width={w} height={h} rx={12} fill={col} /><path d={`M ${x0 + w / 2} ${y0 + h / 2 - 14 - 20 * foco} l ${5 + 6 * foco} ${11 + 14 * foco} h ${12 + 14 * foco} l ${-10 - 10 * foco} ${8 + 10 * foco} l ${4 + 5 * foco} ${13 + 14 * foco} l ${-11 - 14 * foco} ${-8 - 10 * foco} l ${-11 - 14 * foco} ${8 + 10 * foco} l ${4 + 5 * foco} ${-13 - 14 * foco} l ${-10 - 10 * foco} ${-8 - 10 * foco} h ${12 + 14 * foco} Z`} fill="#fff" /></g>; }
      return <rect key={k} x={x0} y={y0} width={50} height={54} rx={12} fill={col} opacity={1 - foco} />;
    })}
    {[0, 1, 2].map((q) => <rect key={q} x={-56} y={30 + q * 30} width={112 - q * 20} height={14} rx={7} fill="#94a3b8" opacity={0.6 * (1 - foco)} />)}
  </g>
);

export const TiposLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('hoteles') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const tipos: [N, string][] = [['acerc', 'Acercamiento'], ['alej', 'Alejamiento'], ['segm', 'Segmento'], ['nece', 'Necesidad'], ['plata', 'Plataforma'], ['arq', 'Arquitectura'], ['captura', 'Captura del valor'], ['motor', 'Motor'], ['canal', 'Canal'], ['tec', 'Tecnología']];
  const actual = tipos.reduce((a, [n], k) => (t >= M(n) - 0.1 ? k : a), -1);
  const rotulos: [number, string][] = [[0.2, 'Diez tipos de pivote'], ...tipos.map(([n, r]) => [M(n), r] as [number, string]), [M('quedan'), 'Quedan tres más'], [M('ejemplo'), 'Ejemplo imaginario'], [M('hoteles'), 'Pivote de segmento']];

  /* A */
  const foco = sm(t, M('acerc') + 0.8, M('acerc') + 2.6);
  const aleja = sm(t, M('alej') + 0.4, M('alej') + 2);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los diez tipos de pivote">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* dial de los diez pivotes */}
            <g transform="translate(120 190)" opacity={e1(t, 0.3) * (1 - ac(t, M('ejemplo') - 0.4, M('ejemplo')))}>
              <circle r={66} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
              {Array.from({ length: 10 }, (_, k) => { const a0 = -Math.PI / 2 + (k * 2 * Math.PI) / 10 + 0.05, a1 = a0 + (2 * Math.PI) / 10 - 0.1; return <path key={k} d={`M ${50 * Math.cos(a0)} ${50 * Math.sin(a0)} A 50 50 0 0 1 ${50 * Math.cos(a1)} ${50 * Math.sin(a1)}`} stroke={k <= actual ? (k === actual ? NARANJA : ROSA) : c.apagado} strokeWidth={14} fill="none" />; })}
              <Txt x={0} y={14} textAnchor="middle" fontSize={40} fill={c.texto}>{Math.max(0, actual + 1)}</Txt>
            </g>

            {/* A · acercamiento y alejamiento */}
            <Toma t={t} a={-1} b={M('segm')}>
              {t >= M('alej') && <g opacity={aleja}><Portatil x={640} y={650} s={2.2} pantalla={isDark ? '#1e293b' : '#f1f5f9'}>{[[110, 10, 80, 50, '#6366f1'], [110, 66, 80, 50, '#22c55e'], [8, 66, 94, 50, '#f59e0b']].map(([x, y, w, h, col], k) => <rect key={k} x={x as number} y={y as number} width={w as number} height={h as number} rx={6} fill={col as string} opacity={sm(t, M('alej') + 1.2 + k * 0.3, M('alej') + 1.6 + k * 0.3)} />)}</Portatil></g>}
              <Movil x={lerp(600, 541, aleja)} y={lerp(470, 423, aleja)} s={lerp(1.3, 0.33, aleja)} foco={foco} op={e1(t, M('acerc'))} />
              {t >= M('acerc') && <Letrero x={600} y={760} texto="Una función es el producto" id={ID} op={e1(t, M('acerc') + 1.5) * (1 - ac(t, M('alej') - 0.3, M('alej')))} />}
              {t >= M('alej') && <Letrero x={600} y={790} texto="El producto es una función" id={ID} op={e1(t, M('alej') + 1.8)} />}
            </Toma>

            {/* B · segmento y necesidad */}
            <Toma t={t} a={M('segm')} b={M('plata')}>
              <g transform="translate(300 470)">
                <Apoyo x={0} y={80} rx={90} />
                <rect x={-70} y={-70} width={140} height={140} rx={24} fill={`url(#${ID}-marca)`} style={sombra(0.25, 6, 12)} />
                <path d="M 0 -42 L 12 -14 L 42 -14 L 18 4 L 27 34 L 0 16 L -27 34 L -18 4 L -42 -14 L -12 -14 Z" fill="#fff" />
              </g>
              {/* clientes previstos (arriba) y reales (abajo) */}
              <g opacity={e1(t, M('segm'))}>
                {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={820 + k * 80} y={340} s={0.42} cuerpo={c.apagado} corbata />)}
                <path d="M 372 440 Q 600 300 780 300" stroke={c.apagado} strokeWidth={6} fill="none" strokeDasharray="12 10" />
                <Cruz x={600} y={330} r={24} op={ac(t, M('segm') + 1, M('segm') + 1.4)} />
                {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={820 + k * 80} y={720} s={0.48} cuerpo={['#ec4899', '#f59e0b', VERDE][k]} />)}
                <path d="M 372 500 Q 600 650 780 640" stroke={NARANJA} strokeWidth={8} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ac(t, M('segm') + 1.2, M('segm') + 2.2)} />
                <Visto x={600} y={600} r={24} op={ac(t, M('segm') + 2, M('segm') + 2.4)} />
                <Letrero x={900} y={790} texto="Otros clientes" id={ID} op={ac(t, M('segm') + 2.2, M('segm') + 2.7) * (1 - ac(t, M('nece') - 0.3, M('nece')))} />
              </g>
              {/* necesidad: el mismo cliente, otro problema */}
              {t >= M('nece') && [0, 1, 2].map((k) => { const cambia = sm(t, M('nece') + 0.8 + k * 0.2, M('nece') + 1.4 + k * 0.2); return (
                <g key={k} transform={`translate(${820 + k * 80} ${560 + 5 * Math.sin(t * 2 + k)})`} opacity={e1(t, M('nece'))}>
                  <circle r={30} fill={c.panel} style={sombra(0.2, 2, 6)} />
                  <g opacity={1 - cambia}><circle r={9} fill="#94a3b8" /><path d="M -4 -14 V -8" stroke="#94a3b8" strokeWidth={3} /></g>
                  <g opacity={cambia} transform={`scale(${0.6 + 0.4 * cambia})`}><path d="M -6 -18 L -16 4 H -2 L -8 20 L 14 -6 H 0 L 6 -18 Z" fill="#f59e0b" /></g>
                </g>
              ); })}
              {t >= M('nece') && <Letrero x={900} y={460} texto="Otro problema" id={ID} op={e1(t, M('nece') + 1.6)} />}
            </Toma>

            {/* C · plataforma */}
            <Toma t={t} a={M('plata')} b={M('arq')}>
              {(() => { const u = sm(t, M('plata') + 0.4, M('plata') + 2); return (
                <g>
                  <g transform="translate(600 520)"><ellipse rx={lerp(60, 330, u)} ry={lerp(24, 110, u)} fill={isDark ? '#334155' : '#cbd5e1'} /><ellipse cy={-10} rx={lerp(60, 330, u)} ry={lerp(24, 110, u)} fill={`url(#${ID}-marca)`} opacity={0.9} /></g>
                  <g transform={`translate(600 ${480 - 10 * u})`}><rect x={-46} y={-46} width={92} height={92} rx={22} fill="#fff" style={{ filter: 'drop-shadow(0 3px 6px rgba(15,23,42,0.35))' }} /><rect x={-26} y={-26} width={52} height={52} rx={12} fill={NARANJA} /></g>
                  {Array.from({ length: 6 }, (_, k) => { const a = (k * Math.PI) / 3 + 0.3; const llega = sm(t, M('plata') + 1.2 + k * 0.25, M('plata') + 2 + k * 0.25); const tx = 600 + 230 * Math.cos(a), ty = 510 + 76 * Math.sin(a); const fx = 600 + 520 * Math.cos(a), fy = 510 + 330 * Math.sin(a); return <g key={k} transform={`translate(${lerp(fx, tx, llega)} ${lerp(fy, ty, llega) - 30})`} opacity={llega}><rect x={-30} y={-30} width={60} height={60} rx={14} fill="#fff" style={{ filter: 'drop-shadow(0 3px 6px rgba(15,23,42,0.3))' }} /><rect x={-16} y={-16} width={32} height={32} rx={8} fill={[...WIDG, AZUL_M, VIOLETA][k]} /></g>; })}
                  <Letrero x={600} y={720} texto="App y plataforma" id={ID} op={sm(t, M('plata') + 2, M('plata') + 2.5)} />
                </g>
              ); })()}
            </Toma>

            {/* D · arquitectura del negocio: margen o volumen */}
            <Toma t={t} a={M('arq')} b={M('captura')}>
              {(() => { const giro = sm(t, M('arq') + 2.5, M('arq') + 4.5); const ang = lerp(-12, 12, giro); return (
                <g>
                  <path d="M 560 700 L 600 620 L 640 700 Z" fill="#64748b" />
                  <g transform={`rotate(${ang} 600 620)`}>
                    <rect x={260} y={608} width={680} height={20} rx={10} fill="#a16207" />
                    <g transform="translate(330 608)" opacity={1 - 0.5 * giro}><path d="M -40 -30 L -20 -60 H 20 L 40 -30 L 0 10 Z" fill="#38bdf8" /><path d="M -40 -30 H 40 L 0 10 Z" fill="#0ea5e9" /><path d="M -20 -60 L -8 -30 L 0 10 M 20 -60 L 8 -30" stroke="#e0f2fe" strokeWidth={3} fill="none" /></g>
                    {Array.from({ length: 14 }, (_, k) => <Moneda3D key={k} x={760 + (k % 5) * 34 + (Math.floor(k / 5) % 2) * 17} y={588 - Math.floor(k / 5) * 26} r={16} op={sm(t, M('arq') + 1.5 + k * 0.08, M('arq') + 1.9 + k * 0.08)} />)}
                  </g>
                  <Letrero x={330} y={420} texto="Margen alto" fondo="#0ea5e9" id={ID} op={e1(t, M('arq') + 0.4)} />
                  <Letrero x={830} y={420} texto="Volumen alto" fondo="#f59e0b" id={ID} op={e1(t, M('arq') + 1.6)} />
                  <path d="M 450 360 Q 600 290 720 360" stroke={NARANJA} strokeWidth={6} fill="none" strokeLinecap="round" opacity={sm(t, M('arq') + 2.5, M('arq') + 3)} /><path d="M 712 344 L 734 366 L 704 372 Z" fill={NARANJA} opacity={sm(t, M('arq') + 2.5, M('arq') + 3)} />
                </g>
              ); })()}
            </Toma>

            {/* E · captura del valor */}
            <Toma t={t} a={M('captura')} b={M('quedan')}>
              {(() => { const cambia = sm(t, M('captura') + 2, M('captura') + 3.4); const ajusta = sm(t, M('captura') + 6, M('captura') + 8); return (
                <g>
                  <g transform="translate(600 430)">
                    <g transform={`scale(${Math.cos(cambia * Math.PI) >= 0 ? Math.cos(cambia * Math.PI) : -Math.cos(cambia * Math.PI)} 1)`}>
                      {cambia < 0.5
                        ? <g><path d="M -140 -70 H 100 L 150 0 L 100 70 H -140 Z" fill={`url(#${ID}-marca)`} style={sombra(0.25, 4, 10)} /><circle cx={100} cy={0} r={14} fill={c.panel} /><Txt f="a" x={-20} y={12} textAnchor="middle" fontSize={36} fill="#fff">Por unidad</Txt></g>
                        : <g><rect x={-150} y={-80} width={300} height={160} rx={20} fill={AZUL_M} style={sombra(0.25, 4, 10)} /><rect x={-150} y={-80} width={300} height={44} rx={20} fill="#1d4ed8" /><Txt f="a" x={0} y={34} textAnchor="middle" fontSize={36} fill="#fff">Por mes</Txt>{[0, 1, 2, 3].map((q) => <circle key={q} cx={-90 + q * 60} cy={-58} r={8} fill="#bfdbfe" />)}</g>}
                    </g>
                  </g>
                  {t >= M('captura') + 6 && (
                    <g opacity={e1(t, M('captura') + 6)}>
                      <g transform={`translate(330 680) rotate(${8 * Math.sin(t * 5) * (1 - ajusta)})`}><rect x={-60} y={-60} width={120} height={100} rx={12} fill="#f59e0b" /><path d="M -60 -60 L 0 -90 L 60 -60 Z" fill="#fde68a" /></g>
                      <Letrero x={330} y={790} texto="Producto" fondo={c.panel} color={c.texto} id={ID} />
                      <g transform={`translate(870 670) rotate(${-10 + 8 * Math.sin(t * 5) * (1 - ajusta)})`}><path d="M -60 -20 L 30 -60 V 40 L -60 0 Z" fill={ROSA} /><rect x={-80} y={-24} width={24} height={30} rx={6} fill="#be185d" />{[0, 1, 2].map((q) => <path key={q} d={`M ${48 + q * 14} ${-30 - q * 6} q 14 ${20 + q * 4} 0 ${40 + q * 12}`} stroke={ROSA} strokeWidth={4} fill="none" opacity={0.4 + 0.6 * Math.abs(Math.sin(t * 4 + q))} />)}</g>
                      <Letrero x={870} y={790} texto="Marketing" fondo={c.panel} color={c.texto} id={ID} />
                    </g>
                  )}
                </g>
              ); })()}
            </Toma>

            {/* F · motor, canal y tecnología */}
            <Toma t={t} a={M('quedan')} b={M('ejemplo')}>
              {(['motor', 'canal', 'tec'] as N[]).map((m, k) => {
                const e = e1(t, M(m)); const x = 250 + k * 350; const fase = (t - M(m)) % 3;
                return (
                  <g key={m} opacity={Math.max(0.2, e)}>
                    <rect x={x - 150} y={250} width={300} height={400} rx={28} fill={c.panel} style={sombra(c.sombra, 8, 18)} />
                    {k === 0 && <g transform={`translate(${x} 440)`}>
                      <Engranaje x={0} y={0} r={56} t={t * 2} hueco={c.panel} color="#64748b" />
                      {[0, 1, 2].map((q) => { const on = Math.floor(fase) === q; return <circle key={q} cx={-60 + q * 60} cy={130} r={on ? 20 : 14} fill={[ROSA, AZUL_M, '#f59e0b'][q]} opacity={on ? 1 : 0.35} />; })}
                    </g>}
                    {k === 1 && <g transform={`translate(${x} 450)`}>
                      {fase < 1 ? <g><rect x={-80} y={-40} width={110} height={70} rx={8} fill={AZUL_M} /><path d="M 30 -20 H 70 L 90 10 V 30 H 30 Z" fill="#1d4ed8" /><circle cx={-50} cy={36} r={14} fill="#1f2937" /><circle cx={60} cy={36} r={14} fill="#1f2937" /></g>
                        : fase < 2 ? <g><rect x={-80} y={-50} width={160} height={100} rx={8} fill="#0f766e" /><path d="M -90 -50 H 90 L 76 -80 H -76 Z" fill="#f43f5e" /><rect x={-20} y={0} width={40} height={50} fill="#1f2937" /></g>
                        : <g><path d="M -80 -40 H -50 L -30 30 H 60 L 80 -20 H -40" stroke="#f59e0b" strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" /><circle cx={-20} cy={56} r={12} fill="#f59e0b" /><circle cx={50} cy={56} r={12} fill="#f59e0b" /></g>}
                    </g>}
                    {k === 2 && <g transform={`translate(${x} 440)`}>
                      {(() => { const m2 = sm(fase, 1, 1.6) * (1 - sm(fase, 2.4, 3)); return <g>
                        <g opacity={1 - m2}><Engranaje x={0} y={0} r={50} t={t * 2} hueco={c.panel} color="#94a3b8" /></g>
                        <g opacity={m2}><rect x={-50} y={-50} width={100} height={100} rx={12} fill="#334155" /><rect x={-28} y={-28} width={56} height={56} rx={6} fill="#22c55e" />{Array.from({ length: 4 }, (_, q) => <g key={q}><rect x={-38 + q * 24} y={-66} width={8} height={16} fill="#94a3b8" /><rect x={-38 + q * 24} y={50} width={8} height={16} fill="#94a3b8" /></g>)}</g>
                      </g>; })()}
                    </g>}
                    <Letrero x={x} y={600} texto={['Motor', 'Canal', 'Tecnología'][k]} id={ID} op={e} />
                  </g>
                );
              })}
            </Toma>

            {/* G · ejemplo: el programa de reservas y los hoteles pequeños */}
            <Toma t={t} a={M('ejemplo')} b={fin + 5}>
              <Portatil x={260} y={600} s={1.3}>
                <rect x={0} y={0} width={200} height={24} fill={NARANJA} />
                {Array.from({ length: 4 }, (_, q) => <g key={q}><rect x={12} y={34 + q * 22} width={20} height={14} rx={3} fill="#93c5fd" /><rect x={40} y={36 + q * 22} width={120} height={10} rx={5} fill="#cbd5e1" /></g>)}
              </Portatil>
              <Letrero x={260} y={680} texto="Reservas" id={ID} op={e1(t, M('ejemplo') + 0.4)} />
              {/* restaurantes */}
              <g opacity={e1(t, M('ejemplo') + 0.8)}>
                {[0, 1].map((k) => <g key={k} transform={`translate(${780 + k * 170} 400)`}><rect x={-60} y={-90} width={120} height={90} rx={8} fill="#b45309" /><path d="M -70 -90 H 70 L 56 -120 H -56 Z" fill={ROJO_M} /><g transform="translate(0 -45)"><rect x={-16} y={-18} width={4} height={36} fill="#fff" /><rect x={10} y={-18} width={6} height={36} rx={3} fill="#fff" /></g></g>)}
                <Letrero x={865} y={450} texto="Restaurantes" fondo={c.panel} color={c.texto} id={ID} />
              </g>
              {/* hoteles pequeños */}
              <g opacity={e1(t, M('hoteles'))}>
                {[0, 1].map((k) => <g key={k} transform={`translate(${780 + k * 170} 690)`}><rect x={-60} y={-130} width={120} height={130} rx={8} fill={AZUL_M} />{Array.from({ length: 4 }, (_, q) => <rect key={q} x={-44 + (q % 2) * 56} y={-112 + Math.floor(q / 2) * 44} width={32} height={26} rx={4} fill="#fde68a" />)}<path d="M -20 -10 V -30 H 20 V -10 M -20 -22 H 20" stroke="#fff" strokeWidth={5} fill="none" /></g>)}
                <Letrero x={865} y={750} texto="Hoteles pequeños" fondo={AZUL_M} id={ID} />
              </g>
              {/* flujo de uso: poco hacia restaurantes, mucho hacia hoteles */}
              {[0, 1, 2].map((k) => { const ph = ((t - M('ejemplo')) * 0.5 + k / 3) % 1; return <circle key={k} cx={lerp(400, 720, ph)} cy={lerp(520, 360, ph)} r={7} fill={c.apagado} opacity={0.6 * Math.sin(Math.PI * ph) * (1 - 0.7 * ac(t, M('hoteles'), M('hoteles') + 1))} />; })}
              {t >= M('hoteles') && Array.from({ length: 8 }, (_, k) => { const ph = ((t - M('hoteles')) * 0.6 + k / 8) % 1; return <circle key={k} cx={lerp(400, 720, ph)} cy={lerp(560, 640, ph) - 30 * Math.sin(Math.PI * ph)} r={9} fill={NARANJA} opacity={Math.sin(Math.PI * ph)} />; })}
            </Toma>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
