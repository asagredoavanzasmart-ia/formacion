import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, ac, sombra, tono } from '../../remotion/comun';
import { PanelPregunta, Rotulo, W, H, borde, e1, marcador, ventana } from './comunOA';
import { AZUL_M, Barco, Celda, Edificio, Flecha, Moneda, Precio, ROJO_M, ROJO_O, Tienda } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * «Seis preguntas para navegar hacia el océano azul», escena propia. Seis celdas en dos filas, una por
 * pregunta, cada una con su dibujo: una moneda que duda entre unas vacaciones y una reforma; dos grupos con
 * precio y rendimiento; la cadena fábrica, intermediario, cliente con el atajo de Nespresso; un reproductor
 * de música y sus notas; una cápsula que se corona de lujo; y una hoja y una persona que crece. Un barco
 * marca la celda activa. Al final, el gimnasio frente a la casa y el reloj.
 */

const ID = 'oa6';
const nombres = ['centrales', 'alternativas', 'vacaciones', 'grupos', 'precioRend', 'cadena', 'nespresso', 'compl', 'apple', 'funcional', 'lujo', 'tendencias', 'ambiente', 'gimnasio', 'pregunta'] as const;
const POS: [number, number][] = [[220, 300], [600, 300], [980, 300], [220, 630], [600, 630], [980, 630]];

export const SeisOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('gimnasio') + 4 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Seis preguntas'], [M('alternativas'), 'Alternativas'], [M('grupos'), 'Grupos estratégicos'], [M('cadena'), 'Cadena de compradores'], [M('compl'), 'Complementarios'],
    [M('funcional'), 'Valor funcional o emocional'], [M('tendencias'), 'Grandes tendencias'], [M('gimnasio'), 'El gimnasio y sus alternativas'],
  ];

  const lim = [M('alternativas'), M('grupos'), M('cadena'), M('compl'), M('funcional'), M('tendencias'), M('gimnasio')];
  const activa = lim.findIndex((_, k) => k < 6 && t >= lim[k] && t < lim[k + 1]);
  const gim = ac(t, M('gimnasio'), M('gimnasio') + 0.5);
  const osc = Math.sin(t * 2.6);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Las seis preguntas para navegar hacia el océano azul">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            <g opacity={1 - 0.96 * gim}>
              {POS.map(([x, y], k) => {
                const a = activa === k;
                const t0 = lim[k];
                return (
                  <Celda key={k} x={x} y={y} w={350} h={290} c={c} activa={a} op={e1(t, M('centrales') + k * 0.25) * (activa < 0 || a ? 1 : 0.55)}>
                    {a && <Barco x={x - 110 + 0} y={-86} s={0.34} casco="#7c2d12" vela={isDark ? '#e5e7eb' : '#ffffff'} rot={3 * Math.sin(t * 2)} />}
                    {/* 0 · alternativas: una moneda entre el viaje y la reforma */}
                    {k === 0 && t >= t0 && (
                      <g transform="translate(0 20)" opacity={e1(t, t0)}>
                        <g transform="translate(-80 30)"><rect x={-44} y={-34} width={88} height={64} rx={12} fill="#7c3aed" /><rect x={-16} y={-50} width={32} height={18} rx={8} fill="none" stroke="#7c3aed" strokeWidth={8} /><rect x={-44} y={-6} width={88} height={8} fill="#000" opacity={0.15} /></g>
                        <g transform="translate(80 30) rotate(-30)"><rect x={-7} y={-44} width={14} height={86} rx={7} fill="#a16207" /><rect x={-30} y={-58} width={60} height={26} rx={7} fill="#64748b" /></g>
                        <Moneda x={osc * (t > M('vacaciones') ? 60 : 0)} y={-40 - 8 * Math.abs(osc)} r={26} />
                      </g>
                    )}
                    {/* 1 · grupos: precio y rendimiento */}
                    {k === 1 && t >= t0 && (
                      <g transform="translate(0 30)" opacity={e1(t, t0)}>
                        <Persona id={ID} x={-90} y={50} s={0.5} cuerpo="#334155" corbata /><Persona id={ID} x={90} y={50} s={0.5} cuerpo="#0f766e" />
                        <g opacity={e1(t, M('precioRend'))}>
                          <Precio x={-90} y={-72} s={0.55} />
                          <path d="M 50 -50 A 40 40 0 0 1 130 -50" fill="none" stroke={c.apagado} strokeWidth={12} strokeLinecap="round" /><path d="M 50 -50 A 40 40 0 0 1 100 -86" fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={12} strokeLinecap="round" />
                          <line x1={90} y1={-50} x2={90 + 30 * Math.cos(-0.9 + 0.2 * Math.sin(t * 3))} y2={-50 + 30 * Math.sin(-0.9 + 0.2 * Math.sin(t * 3))} stroke={ROSA} strokeWidth={6} strokeLinecap="round" />
                        </g>
                      </g>
                    )}
                    {/* 2 · cadena de compradores y el atajo de Nespresso */}
                    {k === 2 && t >= t0 && (
                      <g transform="translate(0 30)" opacity={e1(t, t0)}>
                        <Edificio x={-120} y={40} w={56} h={70} />
                        <circle cx={0} cy={0} r={26} fill={c.apagado} opacity={1 - 0.6 * ac(t, M('nespresso'), M('nespresso') + 0.8)} />
                        <Persona id={ID} x={125} y={50} s={0.42} cuerpo="#0f766e" />
                        <Flecha x1={-90} y1={0} x2={-34} y2={0} color={c.apagado} grosor={7} />
                        <Flecha x1={34} y1={0} x2={86} y2={0} color={c.apagado} grosor={7} />
                        <Flecha x1={-95} y1={60} x2={90} y2={60} u={ac(t, M('nespresso'), M('nespresso') + 1.2)} color={NARANJA} grosor={8} punteada />
                      </g>
                    )}
                    {/* 3 · complementarios: el reproductor y su música */}
                    {k === 3 && t >= t0 && (
                      <g transform="translate(0 30)" opacity={e1(t, t0)}>
                        <rect x={-110} y={-60} width={70} height={110} rx={14} fill="#e5e7eb" /><circle cx={-75} cy={0} r={22} fill="#94a3b8" /><circle cx={-75} cy={0} r={8} fill="#e5e7eb" /><rect x={-96} y={-48} width={42} height={18} rx={5} fill={AZUL_M} />
                        {t >= M('apple') && [0, 1, 2].map((j) => {
                          const ph = (t * 0.7 + j / 3) % 1;
                          return <g key={j} opacity={Math.sin(Math.PI * ph)} transform={`translate(${110 - 150 * ph} ${-30 + 24 * Math.sin(ph * 6 + j)})`}><circle cx={0} cy={10} r={10} fill={ROSA} /><rect x={7} y={-22} width={4} height={32} fill={ROSA} /><path d="M 11 -22 q 12 6 14 18" stroke={ROSA} strokeWidth={4} fill="none" /></g>;
                        })}
                      </g>
                    )}
                    {/* 4 · valor emocional: la cápsula que se corona */}
                    {k === 4 && t >= t0 && (
                      <g transform="translate(0 40)" opacity={e1(t, t0)}>
                        <path d="M -44 -20 Q 0 -44 44 -20 L 30 50 Q 0 60 -30 50 Z" fill="#475569" /><path d="M -44 -20 Q 0 -44 44 -20 Q 0 -6 -44 -20 Z" fill="#94a3b8" />
                        <g opacity={e1(t, M('lujo'))} transform={`translate(0 ${-70 - 6 * Math.sin(t * 3)})`}><path d="M -40 30 L -48 -20 L -20 6 L 0 -34 L 20 6 L 48 -20 L 40 30 Z" fill="#f59e0b" /><circle cx={0} cy={-34} r={7} fill="#fde047" /></g>
                      </g>
                    )}
                    {/* 5 · tendencias: el medio ambiente y la realización personal */}
                    {k === 5 && t >= t0 && (
                      <g transform="translate(0 40)" opacity={e1(t, t0)}>
                        <g transform={`translate(-80 0) scale(${0.6 + 0.4 * ac(t, t0, t0 + 2)})`}><path d="M 0 40 Q -50 0 -10 -50 Q 40 -40 50 10 Q 20 50 0 40 Z" fill="#10b981" /><path d="M 0 40 Q 6 0 -4 -34" stroke="#065f46" strokeWidth={5} fill="none" /></g>
                        <g opacity={e1(t, M('ambiente'))}><Persona id={ID} x={90} y={48} s={0.5} cuerpo="#7c3aed" /><path d="M 90 -78 L 98 -58 L 120 -56 L 103 -42 L 109 -20 L 90 -32 L 71 -20 L 77 -42 L 60 -56 L 82 -58 Z" fill="#fde047" /></g>
                      </g>
                    )}
                  </Celda>
                );
              })}
            </g>

            {/* el gimnasio y lo que le compite */}
            {gim > 0.01 && (
              <g opacity={gim}>
                <rect x={110} y={200} width={980} height={470} rx={34} fill={c.panel} style={sombra(c.sombra, 10, 24)} />
                <g transform="translate(250 440)" opacity={e1(t, M('gimnasio'))}>
                  <rect x={-100} y={-12} width={200} height={24} rx={8} fill="#64748b" />
                  {[-90, 90].map((dx) => <g key={dx}><rect x={dx - 18} y={-62} width={36} height={124} rx={10} fill={`url(#${ID}-marca)`} /></g>)}
                </g>
                <Flecha x1={380} y1={440} x2={460} y2={440} u={e1(t, M('gimnasio') + 1)} color={c.apagado} grosor={9} />
                <g transform="translate(620 440)" opacity={e1(t, M('gimnasio') + 1.5)}>
                  <path d="M -80 0 L 0 -70 L 80 0 Z" fill="#ef4444" /><rect x={-60} y={0} width={120} height={80} rx={8} fill="#fde68a" /><rect x={-14} y={22} width={28} height={58} rx={5} fill="#a16207" />
                </g>
                <g transform="translate(880 440)" opacity={e1(t, M('gimnasio') + 3)}>
                  <circle r={74} fill="#e5e7eb" /><circle r={74} fill="none" stroke="#64748b" strokeWidth={10} />
                  <line x1={0} y1={0} x2={0} y2={-48} stroke="#334155" strokeWidth={9} strokeLinecap="round" /><line x1={0} y1={0} x2={36 * Math.cos(t * 2)} y2={36 * Math.sin(t * 2)} stroke={ROJO_O} strokeWidth={8} strokeLinecap="round" />
                </g>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
