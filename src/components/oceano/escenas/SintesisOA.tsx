import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, ac, sombra, tono } from '../../remotion/comun';
import { PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, ventana } from './comunOA';
import { AZUL_M, AZUL_O, Barco, Flecha, Mar, Moneda, ROJO_M, ROJO_O } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * «Del rojo al azul» (síntesis), escena propia. Un mar rojo atestado donde varios barcos se hunden (las
 * quiebras) y uno sale hacia un mar azul donde avanza solo. Su vela se carga de ideas: valor de uso, modelo
 * económico, fronteras que se desplazan, valores, clientes ajenos y modo de posicionarse y distribuir. Luego
 * llegan la tormenta de los riesgos y la niebla de lo incierto; la flota roja muestra lo pocas que son las
 * empresas que cruzan, y al final se abren dos caminos: dar vueltas en el rojo o salir al azul.
 */

const ID = 'oa13';
const nombres = ['desgastan', 'quiebras', 'salida', 'sola', 'valor', 'uso', 'modelo', 'fronteras', 'valores', 'clientes', 'posic', 'riesgos', 'aleatorio', 'pocas', 'caminos', 'pregunta'] as const;
const FLOTA: [number, number][] = [[130, 620], [250, 700], [370, 610], [470, 700], [200, 540], [330, 560], [450, 600], [110, 730]];

export const SintesisOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('caminos') + 3 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Un mundo competitivo'], [M('quiebras'), 'Las quiebras aumentan'], [M('salida'), 'Otra salida'], [M('sola'), 'Avanzar solo'], [M('valor'), 'Innovación en valor'], [M('uso'), 'Valor de uso'],
    [M('modelo'), 'Modelo económico'], [M('fronteras'), 'Desplazar fronteras'], [M('valores'), 'Replantear valores'], [M('clientes'), 'Clientes ajenos'], [M('posic'), 'Posicionar y distribuir'],
    [M('riesgos'), 'Riesgos financieros'], [M('aleatorio'), 'Reacción incierta'], [M('pocas'), 'Tan pocas empresas'], [M('caminos'), 'Dos caminos'],
  ];

  const hunde = (k: number) => ac(t, M('quiebras') + k * 0.7, M('quiebras') + 2.2 + k * 0.7);
  const sale = ac(t, M('salida'), M('salida') + 5);
  const bx = lerp(430, 880, sale);
  const grande = ac(t, M('valor'), M('valor') + 1);
  const tor = ventana(t, M('riesgos'), M('pocas'), 0.5);
  const niebla = ac(t, M('aleatorio'), M('aleatorio') + 1.5) * (1 - ac(t, M('pocas') - 0.5, M('pocas') + 0.5));
  const fl = ac(t, M('pocas'), M('pocas') + 0.6);
  const cam = ac(t, M('caminos'), M('caminos') + 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Del océano rojo al océano azul: la síntesis de la estrategia">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            <g opacity={e1(t, 0.3)}>
              <Mar x={60} y={500} w={500} h={320} t={t} color={ROJO_M} oscuro={ROJO_O} />
              <Mar x={580} y={500} w={560} h={320} t={t} color={AZUL_M} oscuro={AZUL_O} />
            </g>

            {/* la flota roja: unos barcos se hunden, la mayoría se queda */}
            {FLOTA.map(([x, y], k) => {
              const hund = k < 3 ? hunde(k) : 0;
              const visible = k >= 5 ? e1(t, M('desgastan') + 0.2 + k * 0.1) : e1(t, 0.5 + k * 0.15);
              const fuera = k === 4 ? 0 : 1;
              const pocas = k >= 4 && t >= M('pocas') ? 1 : 1;
              return <Barco key={k} x={x + (k === 0 ? 0 : 0)} y={y + 130 * hund + 5 * Math.sin(t * 2 + k)} s={t >= M('pocas') ? 0.62 : 0.78} casco="#7c2d12" vela="#fecaca" rot={-30 * hund + Math.sin(t * 4 + k) * 3 * (1 - hund)} op={visible * (1 - 0.95 * hund) * fuera * pocas} />;
            })}
            {t >= M('quiebras') && [0, 1, 2].map((k) => hunde(k) > 0.1 && hunde(k) < 1 && <g key={k}>{[0, 1, 2].map((q) => <circle key={q} cx={FLOTA[k][0] + 20 * q - 20} cy={FLOTA[k][1] - 20 * ((t * 2 + q) % 1) * 3} r={6 + 3 * q} fill="#fff" opacity={0.6 * (1 - ((t * 2 + q) % 1))} />)}</g>)}

            {/* el barco que sale hacia el azul y se carga de ideas */}
            <g opacity={e1(t, M('salida') - 0.3)}>
              <g transform={`translate(${bx} ${620 + 4 * Math.sin(t * 2)}) scale(${1 + 0.45 * grande}) translate(${-bx} -620)`}>
                <Barco x={bx} y={620} s={0.95} casco="#1d4fbf" vela="#ffffff" rot={Math.sin(t * 1.4) * 3} />
                {t >= M('valores') && <g opacity={e1(t, M('valores'))} transform={`translate(${bx + 26} 576)`}><path d="M 0 8 C -22 -10 -10 -26 0 -14 C 10 -26 22 -10 0 8 Z" fill={ROSA} transform="scale(1.2)" /></g>}
              </g>
            </g>

            {/* valor de uso y modelo económico */}
            {t >= M('valor') && t < M('riesgos') && (
              <g opacity={e1(t, M('valor')) * (1 - ac(t, M('riesgos') - 0.4, M('riesgos')))}>
                <g transform={`translate(${bx} 330)`}><circle r={70} fill="#fde047" opacity={0.28} /><path d="M -30 12 Q -46 -22 -26 -46 Q 0 -72 26 -46 Q 46 -22 30 12 Q 20 24 18 36 H -18 Q -20 24 -30 12 Z" fill={`url(#${ID}-marca)`} /><rect x={-16} y={38} width={32} height={10} rx={5} fill="#9ca3af" /></g>
                {t >= M('uso') && <g opacity={e1(t, M('uso'))}><Persona id={ID} x={660} y={460} s={0.5} cuerpo="#0f766e" /><Flecha x1={730} y1={440} x2={730} y2={340} color="#10b981" grosor={12} /></g>}
                {t >= M('modelo') && <g opacity={e1(t, M('modelo'))}>{[0, 1, 2].map((q) => <Moneda key={q} x={1060} y={450 - q * 22} r={30} op={ac(t, M('modelo') + q * 0.3, M('modelo') + 0.6 + q * 0.3)} />)}</g>}
              </g>
            )}

            {/* fronteras, clientes ajenos y distribución */}
            {t >= M('fronteras') && t < M('riesgos') && (
              <g opacity={(1 - ac(t, M('riesgos') - 0.4, M('riesgos')))}>
                <rect x={lerp(50, 40, ac(t, M('fronteras'), M('fronteras') + 1.5))} y={484} width={lerp(520, 1110, ac(t, M('fronteras'), M('fronteras') + 1.8))} height={344} rx={26} fill="none" stroke={NARANJA} strokeWidth={8} strokeDasharray="22 16" opacity={e1(t, M('fronteras'))} />
                {t >= M('clientes') && [0, 1, 2].map((q) => <g key={q} opacity={e1(t, M('clientes') + q * 0.4)}><Persona id={ID} x={lerp(110 + q * 70, 640 + q * 80, ac(t, M('clientes') + q * 0.4, M('clientes') + 2.5 + q * 0.4))} y={790} s={0.34} cuerpo="#94a3b8" /></g>)}
                {t >= M('posic') && <g opacity={e1(t, M('posic'))}><path d="M 130 460 Q 400 400 700 450 T 1060 440" fill="none" stroke="#fff" strokeWidth={8} strokeDasharray="4 16" strokeLinecap="round" /><circle cx={130} cy={460} r={16} fill={ROJO_M} /><circle cx={1060} cy={440} r={16} fill={AZUL_M} /></g>}
              </g>
            )}

            {/* tormenta de riesgos y niebla de lo incierto */}
            {tor > 0.01 && (
              <g opacity={tor}>
                <g transform={`translate(${860} 270)`}>
                  <path d="M -120 40 Q -140 -10 -90 -20 Q -80 -70 -20 -60 Q 20 -90 70 -50 Q 130 -50 130 0 Q 150 40 100 50 Z" fill={isDark ? '#4b5563' : '#64748b'} />
                  <path d="M 10 50 L -16 100 L 6 100 L -10 150 L 34 86 L 12 86 L 30 50 Z" fill="#fde047" opacity={0.5 + 0.5 * Math.abs(Math.sin(t * 7))} />
                </g>
                <g transform="translate(560 380)"><circle r={40} fill="#f59e0b" /><circle r={28} fill="#fde047" /><path d="M -4 -40 L 6 -10 L -6 10 L 4 40" stroke="#0f172a" strokeWidth={5} fill="none" strokeLinecap="round" /></g>
                <g transform="translate(1060 400)">{[0, 1, 2, 3, 4, 5, 6, 7].map((q) => <rect key={q} x={-5} y={-48} width={10} height={20} rx={3} fill="#94a3b8" transform={`rotate(${q * 45 + t * 20})`} />)}<circle r={32} fill="#94a3b8" /><circle r={13} fill={isDark ? '#242424' : '#fff'} /></g>
              </g>
            )}
            {niebla > 0.01 && (
              <g opacity={niebla}>
                {[0, 1, 2].map((q) => <ellipse key={q} cx={500 + q * 240 + 30 * Math.sin(t * 0.7 + q)} cy={430 + q * 50} rx={260} ry={52} fill="#e5e7eb" opacity={0.85} />)}
                <g transform="translate(860 300) rotate(12)"><rect x={-44} y={-44} width={88} height={88} rx={16} fill="#fff" style={sombra(c.sombra, 4, 10)} />{[[-18, -18], [18, 18], [0, 0], [-18, 18], [18, -18]].map(([dx, dy], q) => <circle key={q} cx={dx} cy={dy} r={7} fill="#1f2937" />)}</g>
              </g>
            )}

            {/* dos caminos */}
            {cam > 0.01 && (
              <g opacity={cam}>
                <path d="M 330 440 a 90 70 0 1 1 -6 -20" fill="none" stroke={ROJO_M} strokeWidth={14} strokeLinecap="round" /><path d="M 310 400 l 30 -4 l -14 24 Z" fill={ROJO_M} transform="translate(0 6)" />
                <Flecha x1={620} y1={400} x2={1060} y2={400} u={ac(t, M('caminos') + 0.8, M('caminos') + 2.4)} color={AZUL_M} grosor={16} />
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
