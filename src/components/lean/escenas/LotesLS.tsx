import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Calendario, Edificio, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, VERDE, VIOLETA } from './comunLS';
import { Toma, Letrero, Apoyo, Hoja, Visto, Cruz, Moneda3D, sm, cl } from './kitLS';
import type { PropsCE } from './comunLS';

/**
 * «La técnica de los lotes pequeños», escena propia en cuatro tomas.
 * 1 · Una carrera entre dos líneas: arriba la producción en serie, por tandas de seis que esperan apiladas;
 *     abajo el flujo continuo, pieza a pieza, que entrega antes y detecta el defecto en la primera máquina.
 *     Las tandas exigen estantes de existencias, que se empolvan: despilfarro.
 * 2 · Tirar: el pedido del cliente viaja hacia atrás como una tarjeta y cada etapa tira de la anterior; solo
 *     se fabrica la pieza que la siguiente necesita.
 * 3 · La posguerra: las fábricas gigantes de Estados Unidos con sus montañas de autos frente a un taller
 *     japonés en un suelo agrietado; Ohno y Shingo con sus lotes pequeños.
 * 4 · La consultora: un informe de cuarenta hojas que no se hace, y un resumen de una hoja cada semana que
 *     va y vuelve con la respuesta del cliente.
 */

const ID = 'ls8';
const nombres = ['serie', 'flujo', 'rapida', 'calidad', 'exist', 'despil', 'tirar', 'anterior', 'siguiente', 'pedido', 'posguerra', 'gigantes', 'grandes', 'destruido', 'ohno', 'consult', 'cuarenta', 'resumen', 'responde', 'pregunta'] as const;
type N = typeof nombres[number];

const MAQ = [320, 560, 800];

/* Máquina de la línea: cuerpo, luz de estado y brazo que golpea. (x, y) es la base sobre la cinta. */
const Maquina: React.FC<{ x: number; y: number; t: number; activa: number; alarma?: number; color: string }> = ({ x, y, t, activa, alarma = 0, color }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-46} y={-120} width={92} height={80} rx={12} fill={color} />
    <rect x={0} y={-120} width={46} height={80} rx={12} fill="#000" opacity={0.12} />
    <rect x={-8} y={-40 + 12 * Math.abs(Math.sin(t * 8)) * activa} width={16} height={22} rx={4} fill="#334155" />
    <circle cx={30} cy={-104} r={8} fill={alarma > 0.5 && Math.floor(t * 6) % 2 === 0 ? '#ef4444' : activa > 0.5 ? '#22c55e' : '#94a3b8'} />
    {alarma > 0.5 && <circle cx={30} cy={-104} r={18} fill="#ef4444" opacity={0.3} />}
  </g>
);

export const LotesLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('responde') + 1.2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);
  const cinta = isDark ? '#8294b3' : '#475569';
  const traje = isDark ? '#8da2c0' : '#334155';

  const rotulos: [number, string][] = [
    [0.2, 'Lotes pequeños'], [M('serie'), 'En serie, por tandas'], [M('flujo'), 'Flujo continuo'], [M('rapida'), 'Más rápido'], [M('calidad'), 'El error se ve antes'], [M('exist'), 'Existencias de piezas'], [M('despil'), 'Piezas guardadas: despilfarro'],
    [M('tirar'), 'La técnica de tirar'], [M('anterior'), 'Cada etapa tira de la anterior'], [M('siguiente'), 'Solo lo que se necesita'], [M('pedido'), 'El pedido manda'],
    [M('posguerra'), 'La posguerra'], [M('gigantes'), 'Fábricas gigantes'], [M('grandes'), 'Lotes enormes'], [M('destruido'), 'Un mercado destruido'], [M('ohno'), 'Ohno y Shingo'],
    [M('consult'), 'Una consultora'], [M('cuarenta'), 'Cuarenta hojas, no'], [M('resumen'), 'Una hoja por semana'], [M('responde'), 'Ajustar con el cliente'],
  ];

  /* Toma 1: simulación de las dos líneas */
  const YS = 420, YF = 720;
  const ts = M('serie'), tf = M('flujo');
  const ciclo = 13;
  const tauS = t >= ts ? (t - ts) % ciclo : -1;
  const defecto = t >= M('calidad');
  /* serie: en cada etapa s se fabrican 6 piezas entre 4s y 4s+3; se trasladan entre 4s+3 y 4s+4 */
  const pila = (s: number) => (tauS < 4 * s ? 0 : tauS < 4 * s + 3 ? Math.min(6, Math.floor((tauS - 4 * s) / 0.5) + 1) : tauS < 4 * s + 4 ? 6 : 0);
  const traslado = (s: number) => (tauS >= 4 * s + 3 && tauS < 4 * s + 4 ? tauS - (4 * s + 3) : -1);
  const terminadasS = tauS >= 12 ? 6 : 0;
  /* flujo: la pieza k entra en x = 200 en tf + 0,7k y avanza a 230 px/s */
  const piezasF = t >= tf ? Array.from({ length: 6 }, (_, j) => { const k = Math.floor((t - tf) / 0.7) - j; if (k < 0) return null; const x = 200 + (t - tf - k * 0.7) * 230; return { k, x }; }).filter(Boolean) as { k: number; x: number }[] : [];
  const terminadasF = t >= tf ? Math.max(0, Math.floor((t - tf - 3.6) / 0.7) + 1) : 0;
  const malaF = (k: number) => defecto && k % 5 === 2;

  /* Toma 2: tirar */
  const tarjeta = sm(t, M('pedido'), M('pedido') + 2.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La técnica de los lotes pequeños">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · la carrera de las dos líneas */}
            <Toma t={t} a={-1} b={M('tirar')} zi={1}>
              {/* línea en serie */}
              <g opacity={e1(t, M('serie'))}>
                <Letrero x={200} y={230} texto="En serie" fondo="#64748b" id={ID} />
                <rect x={160} y={YS} width={900} height={18} rx={9} fill={cinta} />
                {MAQ.map((x, s) => <Maquina key={s} x={x} y={YS} t={t} activa={pila(s) > 0 && pila(s) < 6 ? 1 : 0} color="#64748b" />)}
                {MAQ.map((x, s) => { const n = pila(s); const tr = traslado(s); const dx = tr >= 0 ? (s < 2 ? (MAQ[s + 1] - x) * sm(tr, 0, 1) : (1000 - x) * sm(tr, 0, 1)) : 0; return n > 0 && <g key={s} transform={`translate(${x + 70 + dx} ${YS})`}>{Array.from({ length: n }, (_, k) => <rect key={k} x={-16 + (k % 2) * 20} y={-22 - Math.floor(k / 2) * 20} width={18} height={18} rx={4} fill={defecto ? ROJO_M : '#f59e0b'} />)}</g>; })}
                {terminadasS > 0 && <g transform={`translate(1060 ${YS})`}>{Array.from({ length: 6 }, (_, k) => <rect key={k} x={-16 + (k % 2) * 20} y={-22 - Math.floor(k / 2) * 20} width={18} height={18} rx={4} fill={defecto ? ROJO_M : ROSA} />)}{defecto && <Cruz x={0} y={-90} r={22} />}</g>}
              </g>
              {/* línea de flujo continuo */}
              <g opacity={e1(t, M('flujo'))}>
                <Letrero x={230} y={530} texto="Flujo continuo" id={ID} />
                <rect x={160} y={YF} width={900} height={18} rx={9} fill={cinta} />
                {MAQ.map((x, s) => <Maquina key={s} x={x} y={YF} t={t} activa={1} alarma={s === 1 && piezasF.some((p) => malaF(p.k) && Math.abs(p.x - MAQ[1]) < 60) ? 1 : 0} color={[NARANJA, AZUL_M, ROSA][s]} />)}
                {piezasF.map(({ k, x }) => { if (x > 1040) return null; if (malaF(k) && x > MAQ[1] + 10) { const u = cl((x - MAQ[1] - 10) / 120); return <rect key={k} x={MAQ[1] + 10 + 40 * u - 10} y={YF - 22 + 90 * u * u} width={20} height={20} rx={4} fill={ROJO_M} opacity={1 - u} />; } return <rect key={k} x={x - 10} y={YF - 22} width={20} height={20} rx={4} fill={malaF(k) ? ROJO_M : x > MAQ[2] ? ROSA : x > MAQ[1] ? AZUL_M : x > MAQ[0] ? NARANJA : '#f59e0b'} />; })}
                <g transform={`translate(1060 ${YF})`}>{Array.from({ length: Math.min(8, terminadasF) }, (_, k) => <rect key={k} x={-16 + (k % 2) * 20} y={-22 - Math.floor(k / 2) * 20} width={18} height={18} rx={4} fill={ROSA} />)}</g>
                {t >= M('rapida') && <g opacity={e1(t, M('rapida'))}><Visto x={1060} y={YF - 140} r={24} /></g>}
              </g>
              {/* estantes de existencias que se empolvan */}
              {t >= M('exist') && (
                <g opacity={e1(t, M('exist'))}>
                  {[0, 1].map((r) => <rect key={r} x={560} y={170 + r * 60} width={460} height={8} rx={4} fill="#a16207" />)}
                  {Array.from({ length: 22 }, (_, k) => { const r = Math.floor(k / 11), q = k % 11; return <g key={k} opacity={sm(t, M('exist') + k * 0.05, M('exist') + 0.4 + k * 0.05)}><rect x={566 + q * 41} y={136 + r * 60} width={36} height={34} rx={4} fill={t >= M('despil') ? mixGris(ac(t, M('despil'), M('despil') + 1.5)) : '#d69e2e'} /></g>; })}
                  {t >= M('despil') && <g opacity={e1(t, M('despil'))}>{[0, 1, 2].map((k) => { const ph = (t * 0.6 + k / 3) % 1; return <Moneda3D key={k} x={1050 + 30 * ph} y={190 - 60 * ph} r={14} op={1 - ph} giro={Math.cos(t * 4 + k)} />; })}<Letrero x={420} y={185} texto="Despilfarro" fondo={ROJO_M} id={ID} /></g>}
                </g>
              )}
            </Toma>

            {/* TOMA 2 · tirar */}
            <Toma t={t} a={M('tirar')} b={M('posguerra')}>
              <rect x={100} y={600} width={820} height={18} rx={9} fill={cinta} />
              {MAQ.map((x, s) => { const pide = s === 2 ? tarjeta > 0.2 : s === 1 ? tarjeta > 0.55 : tarjeta > 0.85; return <g key={s} opacity={e1(t, M('tirar') + s * 0.2)}><Maquina x={x - 100} y={600} t={t} activa={pide ? 1 : 0} color={[NARANJA, AZUL_M, ROSA][s]} /></g>; })}
              {/* la cuerda que tira hacia atrás */}
              {t >= M('anterior') && <g opacity={e1(t, M('anterior'))}>{[0, 1].map((k) => { const x1 = MAQ[k + 1] - 140, x2 = MAQ[k] - 60; return <g key={k}><path d={`M ${x1} 440 Q ${(x1 + x2) / 2} ${470 + 8 * Math.sin(t * 4)} ${x2} 440`} stroke={NARANJA} strokeWidth={6} fill="none" strokeLinecap="round" /><path d={`M ${x2 + 4} 428 L ${x2 - 14} 440 L ${x2 + 4} 452 Z`} fill={NARANJA} /></g>; })}<Letrero x={460} y={370} texto="Tira de la anterior" id={ID} /></g>}
              {/* solo la pieza que se necesita */}
              {t >= M('siguiente') && (() => { const ph = ((t - M('siguiente')) * 0.5) % 1; return <rect x={lerp(220, 900, ph) - 12} y={576} width={24} height={24} rx={5} fill="#f59e0b" opacity={Math.min(1, ph * 8, (1 - ph) * 8)} />; })()}
              {/* el cliente y su pedido */}
              <g opacity={e1(t, M('pedido') - 0.6)}>
                <Persona id={ID} x={1020} y={700} s={0.6} cuerpo={VIOLETA} />
                <g transform={`translate(${lerp(990, 260, tarjeta)} ${520 - 40 * Math.sin(Math.PI * tarjeta)}) rotate(${-8 + 16 * tarjeta})`} opacity={t >= M('pedido') ? 1 : 0}>
                  <rect x={-40} y={-28} width={80} height={56} rx={8} fill="#fffbeb" style={{ filter: 'drop-shadow(0 3px 6px rgba(15,23,42,0.35))' }} /><rect x={-40} y={-28} width={80} height={14} rx={6} fill={NARANJA} /><rect x={-28} y={-4} width={56} height={6} rx={3} fill="#94a3b8" /><rect x={-28} y={8} width={36} height={6} rx={3} fill="#94a3b8" />
                </g>
                {t >= M('pedido') && <Letrero x={1020} y={760} texto="Pedido" fondo={VIOLETA} id={ID} />}
              </g>
            </Toma>

            {/* TOMA 3 · la posguerra */}
            <Toma t={t} a={M('posguerra')} b={M('consult')}>
              <rect x={60} y={700} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              {/* Estados Unidos: fábrica gigante y montañas de autos */}
              <g opacity={e1(t, M('gigantes'))}>
                <rect x={90} y={300} width={460} height={400} rx={12} fill={isDark ? '#8294b3' : '#475569'} />
                {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M ${90 + k * 77} 300 L ${90 + k * 77} 250 L ${167 + k * 77} 300 Z`} fill={isDark ? '#9aa8bf' : '#64748b'} />)}
                {[0, 1, 2].map((k) => <rect key={k} x={140 + k * 140} y={180} width={34} height={120} fill={isDark ? '#9aa8bf' : '#64748b'} />)}
                {[0, 1, 2].map((k) => [0, 1, 2].map((q) => { const ph = (t * 0.3 + q / 3) % 1; return <circle key={`${k}${q}`} cx={157 + k * 140 + 30 * ph} cy={170 - 80 * ph} r={14 + 20 * ph} fill={isDark ? '#6b7280' : '#cbd5e1'} opacity={0.7 * (1 - ph)} />; }))}
                {Array.from({ length: 8 }, (_, k) => <rect key={k} x={120 + (k % 4) * 105} y={380 + Math.floor(k / 4) * 90} width={70} height={50} rx={6} fill="#fde68a" opacity={0.85} />)}
                <Letrero x={320} y={760} texto="Estados Unidos" fondo={AZUL_M} id={ID} />
              </g>
              {t >= M('grandes') && <g opacity={e1(t, M('grandes'))}>{Array.from({ length: Math.round(18 * ac(t, M('grandes'), M('grandes') + 2)) }, (_, k) => { const fila = Math.floor(k / 6), col = k % 6; return <g key={k} transform={`translate(${130 + col * 72 + (fila % 2) * 36} ${690 - fila * 34})`}><path d="M -32 0 V -14 Q -32 -18 -26 -20 L -14 -22 L -6 -32 H 14 L 22 -22 L 28 -20 Q 32 -18 32 -12 V 0 Z" fill={['#ef4444', AZUL_M, '#f59e0b', '#94a3b8'][k % 4]} /><circle cx={-18} cy={1} r={6} fill="#1f2937" /><circle cx={18} cy={1} r={6} fill="#1f2937" /></g>; })}</g>}
              {/* Japón: taller pequeño en un suelo agrietado */}
              <g opacity={e1(t, M('posguerra'))}>
                <g transform="translate(870 700)">
                  <Apoyo x={0} y={4} rx={130} />
                  <rect x={-90} y={-120} width={180} height={120} rx={8} fill="#b45309" /><path d="M -110 -116 L 0 -180 L 110 -116 Z" fill="#78350f" /><rect x={-26} y={-60} width={52} height={60} rx={4} fill="#1f2937" />
                  <circle cx={0} cy={-150} r={14} fill="#fff" /><circle cx={0} cy={-150} r={8} fill="#dc2626" />
                </g>
                <Letrero x={870} y={760} texto="Japón" fondo="#dc2626" id={ID} />
              </g>
              {t >= M('destruido') && <g opacity={e1(t, M('destruido'))}>
                <path d="M 660 704 L 700 690 L 720 712 L 760 694" stroke={c.tenue} strokeWidth={5} fill="none" /><path d="M 980 704 L 1010 692 L 1040 714 L 1080 696" stroke={c.tenue} strokeWidth={5} fill="none" />
                {[[700, 680], [1050, 676], [760, 690]].map(([x, y], k) => <path key={k} d={`M ${x - 20} ${y + 20} L ${x - 6} ${y} L ${x + 12} ${y + 6} L ${x + 22} ${y + 20} Z`} fill="#78716c" />)}
              </g>}
              {t >= M('ohno') && <g opacity={e1(t, M('ohno'))}>
                <Persona id={ID} x={720} y={560} s={0.5} cuerpo="#1e3a8a" corbata />
                <Persona id={ID} x={1020} y={560} s={0.5} cuerpo="#0f766e" corbata />
                {[0, 1].map((k) => <g key={k} transform={`translate(${720 + k * 300 + (k ? -50 : 50)} ${490 - 6 * Math.abs(Math.sin(t * 3 + k))})`}><rect x={-16} y={-16} width={32} height={32} rx={5} fill="#f59e0b" /><path d="M -16 -16 L 0 -26 L 16 -16 Z" fill="#fde68a" /></g>)}
                <Letrero x={720} y={340} texto="Taiichi Ohno" fondo="#1e3a8a" id={ID} tam={24} />
                <Letrero x={1020} y={340} texto="Shigeo Shingo" fondo="#0f766e" id={ID} tam={24} />
              </g>}
            </Toma>

            {/* TOMA 4 · la consultora */}
            <Toma t={t} a={M('consult')} b={fin + 5}>
              <rect x={60} y={720} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              <Persona id={ID} x={180} y={720} s={0.62} cuerpo={traje} corbata />
              <Letrero x={180} y={780} texto="Consultora" id={ID} op={e1(t, M('consult') + 0.3)} />
              {/* el informe de cuarenta hojas, tachado */}
              {t >= M('cuarenta') && (() => { const x = ac(t, M('cuarenta') + 1, M('cuarenta') + 1.5); return (
                <g opacity={e1(t, M('cuarenta')) * (1 - 0.6 * ac(t, M('resumen'), M('resumen') + 0.6))}>
                  {Array.from({ length: 14 }, (_, k) => <rect key={k} x={300 + k * 1.5} y={600 - k * 9} width={140} height={110} rx={6} fill={k % 2 ? '#f8fafc' : '#e5e7eb'} style={k === 13 ? { filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.3))' } : undefined} />)}
                  <Txt f="a" x={372} y={540} textAnchor="middle" fontSize={34} fill="#475569">40</Txt>
                  <path d={`M 290 450 L ${290 + 170 * x} ${450 + 270 * x}`} stroke={ROJO_M} strokeWidth={12} strokeLinecap="round" opacity={x > 0 ? 1 : 0} />
                  <path d={`M 460 450 L ${460 - 170 * x} ${450 + 270 * x}`} stroke={ROJO_M} strokeWidth={12} strokeLinecap="round" opacity={x > 0 ? 1 : 0} />
                </g>
              ); })()}
              {/* una hoja por semana, ida y vuelta con el cliente */}
              {t >= M('resumen') && (
                <g opacity={e1(t, M('resumen'))}>
                  <Persona id={ID} x={1040} y={720} s={0.62} cuerpo={VIOLETA} />
                  <Letrero x={1040} y={780} texto="Cliente" fondo={VIOLETA} id={ID} />
                  {[0, 1, 2, 3].map((k) => <g key={k} transform={`translate(${540 + k * 110} 300)`}><rect x={-44} y={-40} width={88} height={80} rx={10} fill={c.panel} style={sombra(0.2, 2, 6)} /><rect x={-44} y={-40} width={88} height={20} rx={8} fill={ROSA} /><Txt f="a" x={0} y={24} textAnchor="middle" fontSize={22} fill={c.tenue}>{`S${k + 1}`}</Txt>{t > M('resumen') + 1 + k * 1.2 && <Visto x={30} y={30} r={14} />}</g>)}
                  {(() => { const ph = ((t - M('resumen')) / 1.2) % 1; const vuelta = ph > 0.5; const u = vuelta ? (ph - 0.5) * 2 : ph * 2; return (
                    <g>
                      {!vuelta && <Hoja x={lerp(260, 960, sm(u, 0, 1))} y={560 - 70 * Math.sin(Math.PI * u)} w={60} h={78} rot={-6 + 12 * u} lineas={3} />}
                      {vuelta && t >= M('responde') && <g transform={`translate(${lerp(960, 260, sm(u, 0, 1))} ${600 - 60 * Math.sin(Math.PI * u)})`}><rect x={-34} y={-22} width={68} height={44} rx={14} fill={VERDE} /><path d="M -12 0 l 8 8 l 16 -16" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" /></g>}
                    </g>
                  ); })()}
                </g>
              )}
            </Toma>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

/* Caja que pierde color al empolvarse (u de 0 a 1). */
const mixGris = (u: number) => { const a = [214, 158, 46], b = [156, 163, 175]; return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * u)).join(',')})`; };
