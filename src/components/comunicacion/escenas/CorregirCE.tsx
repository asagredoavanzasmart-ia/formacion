import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Cruz, Etiqueta, Gesto, Insignia, Mesa, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana , Chip } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Corregir la impresión», escena propia. Acto A: los tres lentes reciben su evidencia: sonrisa,
 * escucha y palabra para la confianza; una flecha a sus metas para el poder; un «nosotros» que
 * abraza a dos figuras para el ego. Acto B: la línea de plazos: uno fallido, uno cumplido que nadie
 * nota y cinco adelantados que abren el ojo del jefe. Acto C: tres vías para que quieran revisar
 * su juicio: la balanza de la justicia, dos eslabones que se enlazan y la tormenta que despierta la
 * atención. Acto D: Gordon y el profesor en un comité, cada uno con su plato.
 */

const ID = 'ce1c';
const nombres = ['evidencia', 'confianza', 'palabra', 'poder', 'ego', 'nosotros', 'mal', 'siguiente', 'cinco', 'rapida', 'justos', 'necesario', 'dependencia', 'control', 'gordon', 'comites', 'plato', 'pregunta'] as const;


/* Hoja de calendario con su estado. */
const Plazo: React.FC<{ x: number; y: number; c: Tono; id: string; estado: 'falla' | 'justo' | 'antes'; op: number; t: number }> = ({ x, y, c, id, estado, op, t }) => {
  if (op < 0.01) return null;
  const salto = estado === 'antes' ? Math.abs(Math.sin(t * 3 + x)) * 6 : 0;
  return (
    <g opacity={op} transform={`translate(${x} ${y - salto}) scale(${0.8 + 0.2 * op})`}>
      <rect x={-52} y={-60} width={104} height={120} rx={16} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
      <rect x={-52} y={-60} width={104} height={30} rx={14} fill={estado === 'falla' ? ROSA : estado === 'antes' ? VERDE : c.apagado} />
      {estado === 'falla' && <Cruz x={0} y={16} s={0.9} />}
      {estado === 'justo' && <path d="M -16 16 L -4 28 L 18 2" stroke={c.apagado} strokeWidth={7} fill="none" strokeLinecap="round" />}
      {estado === 'antes' && <Visto x={0} y={16} s={0.9} />}
    </g>
  );
};

export const CorregirCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('plato') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Evidencia para cada lente'], [M('confianza'), 'Confianza: calidez y palabra'], [M('poder'), 'Poder: ayúdalo a lograr sus metas'],
    [M('ego'), 'Ego: crea un «nosotros»'], [M('mal'), 'Si empezaste mal…'], [M('cinco'), 'Evidencia abundante y llamativa'],
    [M('rapida'), 'Que quieran revisarte'], [M('justos'), 'Su deseo de ser justos'], [M('necesario'), 'Hazte necesario'],
    [M('control'), 'Cuando pierde el control'], [M('gordon'), 'Gordon lo logró'],
  ];

  const aA = ventana(t, -1, M('mal'));
  const aB = ventana(t, M('mal'), M('rapida'));
  const aC = ventana(t, M('rapida'), M('gordon'));
  const aD = ac(t, M('gordon'), M('gordon') + 0.4);

  const columna = (n: 'confianza' | 'poder' | 'ego') => (n === 'confianza' ? ventana(t, M('confianza'), M('poder')) : n === 'poder' ? ventana(t, M('poder'), M('ego')) : ac(t, M('ego'), M('ego') + 0.4));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Para corregir una impresión se da evidencia para cada lente, abundante y llamativa, y se crean razones para que el otro quiera revisar su juicio">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · evidencia por lente */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {([['confianza', 280], ['poder', 600], ['ego', 920]] as const).map(([n, x], j) => {
                  const op = e1(t, M('evidencia') + j * 0.35);
                  if (op < 0.01) return null;
                  const act = columna(n);
                  return (
                    <g key={n} opacity={op * (0.4 + 0.6 * Math.max(act, t < M('confianza') ? 1 : 0))}>
                      <circle cx={x} cy={240} r={86} fill={c.panel} stroke={`url(#${ID}-marca)`} strokeWidth={12} style={sombra(c.sombra, 4, 10)} />
                      <path d={`M ${x - 46} ${200} Q ${x - 30} ${178} ${x - 6} ${182}`} stroke="#fff" strokeWidth={6} fill="none" opacity={0.5} strokeLinecap="round" />
                      <Txt f="a" x={x} y={380} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{n}</Txt>
                    </g>
                  );
                })}
                {/* Confianza: sonrisa, escucha y palabra */}
                {(['sonrisa', 'escucha'] as const).map((tx, k) => <Chip cae key={tx} x={280} y={470 + k * 85} texto={tx} c={c} id={ID} op={e1(t, M('confianza') + 0.4 + k * 0.6) * (0.4 + 0.6 * columna('confianza'))} />)}
                <Chip cae x={280} y={640} texto="de palabra" c={c} id={ID} op={e1(t, M('palabra')) * (0.4 + 0.6 * columna('confianza'))} marca />
                {/* Poder: una flecha que va a sus metas */}
                {(() => {
                  const op = e1(t, M('poder'));
                  if (op < 0.01) return null;
                  const u = ac(t, M('poder') + 0.3, M('poder') + 1.2);
                  return (
                    <g opacity={op * (0.4 + 0.6 * columna('poder'))}>
                      {[56, 38, 20].map((r, q) => <circle key={r} cx={600} cy={540} r={r} fill={q % 2 ? c.panel : NARANJA} />)}
                      <g transform={`translate(${lerp(505, 590, u)} ${lerp(487, 532, u)}) rotate(28)`}><rect x={-80} y={-5} width={80} height={10} rx={5} fill={c.texto} /><path d="M 0 -14 L 20 0 L 0 14 Z" fill={c.texto} /></g>
                      <Txt f="a" x={600} y={650} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>sus metas</Txt>
                    </g>
                  );
                })()}
                {/* Ego: un «nosotros» */}
                {(() => {
                  const op = e1(t, M('ego'));
                  if (op < 0.01) return null;
                  const n = ac(t, M('nosotros'), M('nosotros') + 0.8);
                  return (
                    <g opacity={op}>
                      <g transform={`translate(${920 - 50 + 14 * n} 600)`}><Persona id={ID} x={0} y={0} s={0.5} /></g>
                      <g transform={`translate(${920 + 50 - 14 * n} 600)`}><Persona id={ID} x={0} y={0} s={0.5} cuerpo="#64748b" /></g>
                      <ellipse cx={920} cy={545} rx={120} ry={95} fill="none" stroke={`url(#${ID}-marca)`} strokeWidth={8} strokeDasharray={`${n * 700} 700`} />
                      <Etiqueta x={920} y={690} texto="nosotros" op={n} c={c} id={ID} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B · plazos: uno fallido, uno justo, cinco adelantados */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <line x1={120} y1={560} x2={1080} y2={560} stroke={c.apagado} strokeWidth={8} strokeLinecap="round" />
                <Plazo x={190} y={560} c={c} id={ID} estado="falla" op={e1(t, M('mal'))} t={t} />
                <Plazo x={330} y={560} c={c} id={ID} estado="justo" op={e1(t, M('siguiente'))} t={t} />
                {[0, 1, 2, 3, 4].map((k) => <Plazo key={k} x={470 + k * 140} y={560} c={c} id={ID} estado="antes" op={e1(t, M('cinco') + 0.3 + k * 0.3)} t={t} />)}
                <Etiqueta x={190} y={680} texto="falla" op={e1(t, M('mal') + 0.3)} c={c} id={ID} />
                <Etiqueta x={750} y={680} texto="cinco antes" op={e1(t, M('cinco') + 1.8)} c={c} id={ID} marca />
                {/* El ojo del jefe: sigue cerrado con un plazo justo, se abre con cinco adelantados */}
                {(() => {
                  const op = e1(t, M('mal') + 0.4);
                  if (op < 0.01) return null;
                  const abre = 0.12 + 0.88 * ac(t, M('cinco') + 1.2, M('cinco') + 2.2);
                  return (
                    <g opacity={op} transform="translate(600 270)">
                      <path d={`M -120 0 Q 0 ${-110 * abre} 120 0 Q 0 ${110 * abre} -120 0 Z`} fill={c.panel} stroke={c.texto} strokeWidth={8} />
                      <circle r={44 * abre} fill={NARANJA} />
                      <circle r={18 * abre} fill={c.texto} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · tres vías para que quieran revisar su juicio */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {([['justos', 280, 'justicia'], ['necesario', 600, 'necesario'], ['control', 920, 'sin control']] as const).map(([n, x, txt]) => {
                  const op = e1(t, M(n));
                  if (op < 0.01) return null;
                  return (
                    <g key={n} opacity={op} transform={`translate(${x} ${430 + (1 - op) * 30})`}>
                      <rect x={-140} y={-190} width={280} height={380} rx={30} fill={c.panel} style={sombra(c.sombra)} />
                      {n === 'justos' && <g stroke={NARANJA} strokeWidth={8} fill="none" strokeLinecap="round"><path d="M 0 -90 V 50 M -60 50 H 60" /><path d={`M -80 ${-60 + 10 * Math.sin(t * 1.6)} L 80 ${-60 - 10 * Math.sin(t * 1.6)}`} /><path d={`M -80 ${-60 + 10 * Math.sin(t * 1.6)} l -22 44 h 44 z M 80 ${-60 - 10 * Math.sin(t * 1.6)} l -22 44 h 44 z`} fill={c.panel2} /></g>}
                      {n === 'necesario' && (() => {
                        const u = ac(t, M('dependencia'), M('dependencia') + 1);
                        return <g strokeWidth={14} fill="none"><ellipse cx={lerp(-60, -26, u)} cy={-20} rx={50} ry={32} stroke={NARANJA} /><ellipse cx={lerp(60, 26, u)} cy={-20} rx={50} ry={32} stroke={ROSA} /></g>;
                      })()}
                      {n === 'control' && <g>
                        <path d="M -70 -40 Q -90 -40 -84 -66 Q -84 -96 -50 -96 Q -36 -124 0 -116 Q 30 -134 56 -104 Q 92 -102 88 -70 Q 96 -40 70 -40 Z" fill={c.tenue} />
                        <path d="M -6 -40 L -24 0 L -4 0 L -16 34 L 22 -14 L 2 -14 L 14 -40 Z" fill={NARANJA} opacity={0.5 + 0.5 * Math.abs(Math.sin(t * 5))} />
                        <path d={`M -50 70 Q 0 ${70 - 40 * ac(t, M('control') + 0.6, M('control') + 1.4)} 50 70 Q 0 ${70 + 40 * ac(t, M('control') + 0.6, M('control') + 1.4)} -50 70 Z`} fill={c.panel2} stroke={c.texto} strokeWidth={5} />
                        <circle cy={70} r={14 * ac(t, M('control') + 0.6, M('control') + 1.4)} fill={NARANJA} />
                      </g>}
                      <Txt f="a" x={0} y={150} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                    </g>
                  );
                })}
              </g>
            )}

            {/* ACTO D · Gordon y el profesor, cada uno con su plato */}
            {aD > 0.01 && (
              <g opacity={aD}>
                <Mesa x={600} y={680} w={440} c={c} />
                <Persona id={ID} x={250} y={760} s={0.9} />
                <Gesto x={250} y={760} s={0.9} animo={0.7} />
                <Persona id={ID} x={950} y={760} s={0.9} cuerpo="#64748b" pelo="#9ca3af" corbata />
                <Gesto x={950} y={760} s={0.9} animo={ac(t, M('gordon'), M('comites')) * 0.8} />
                <g opacity={e1(t, M('comites'))}><Insignia x={600} y={300} texto="comités clave" c={c} id={ID} /></g>
                <g opacity={e1(t, M('plato'))}>
                  <ellipse cx={500} cy={655} rx={58} ry={16} fill={c.blanco} stroke={c.apagado} strokeWidth={4} />
                  <ellipse cx={500} cy={650} rx={30} ry={8} fill={NARANJA} opacity={0.7} />
                  <ellipse cx={720} cy={655} rx={58} ry={16} fill={c.blanco} stroke={c.apagado} strokeWidth={4} />
                  <ellipse cx={720} cy={650} rx={30} ry={8} fill={NARANJA} opacity={0.7} />
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
