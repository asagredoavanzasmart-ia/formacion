import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Estrella, Etiqueta, Gesto, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Cómo preguntar», escena propia. Acto A: el cliente dice algo y llegan cuatro respuestas, una por tipo:
 * introducción, espejo, cambio total (se va por otro lado) y seguimiento, la única que se engancha a lo
 * que dijo y lo hace sonreír. Acto B: una puerta abierta y una cerrada; las barras del 60 % frente al
 * 5 %; con gente reservada, la pregunta pesimista hace mentir menos que la optimista. Acto C: el orden
 * (lo difícil primero en lo tenso; de lo superficial a lo profundo para construir relación) y el tono:
 * un escritorio formal frente a un sillón, donde se comparte el doble.
 */

const ID = 'ce1t';
const nombres = ['tipos', 'introduccion', 'espejo', 'cambio', 'seguimiento', 'respetado', 'solas', 'abrir', 'interrogatorio', 'sesenta', 'cinco', 'tensa', 'pesimistas', 'optimista', 'orden', 'dificil', 'profundo', 'tono', 'doble', 'pregunta'] as const;

/* Puerta abierta o cerrada, en volumen. */
const Puerta: React.FC<{ x: number; y: number; abierta: number; c: Tono; id: string }> = ({ x, y, abierta, c, id }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-90} y={-250} width={180} height={250} rx={8} fill={c.apagado} />
    <rect x={-76} y={-238} width={152} height={238} fill={abierta > 0.5 ? '#fde7d1' : c.panel2} />
    {abierta > 0.5 && [0, 1, 2].map((k) => <path key={k} d={`M ${-60 + k * 40} -200 L ${-40 + k * 40} -40`} stroke={NARANJA} strokeWidth={6} opacity={0.35} strokeLinecap="round" />)}
    <path d={`M -76 -238 L ${-76 + 152 * (1 - 0.75 * abierta)} ${-238 - 24 * abierta} L ${-76 + 152 * (1 - 0.75 * abierta)} ${24 * abierta} L -76 0 Z`} fill={`url(#${id}-marca)`} />
    <circle cx={-76 + 152 * (1 - 0.75 * abierta) - 20} cy={-118} r={8} fill="#fff" />
  </g>
);

export const TiposPreguntaCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('doble') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'No todas valen lo mismo'], [M('tipos'), 'Cuatro tipos de preguntas'], [M('seguimiento'), 'La de seguimiento'],
    [M('respetado'), 'Te hace sentir escuchado'], [M('abrir'), 'Abrir o cerrar'], [M('sesenta'), 'Una lista sesga la respuesta'],
    [M('tensa'), 'Con gente reservada, cerradas'], [M('pesimistas'), 'Supuestos pesimistas: menos mentiras'], [M('orden'), 'El orden'],
    [M('tono'), 'El tono'], [M('doble'), 'Informal: casi el doble'],
  ];

  const aA = ventana(t, -1, M('abrir'));
  const aB = ventana(t, M('abrir'), M('orden'));
  const aC = ac(t, M('orden'), M('orden') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cuatro tipos de preguntas, el poder de la de seguimiento, cuándo abrir o cerrar, el orden y el tono">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · cuatro respuestas a lo que dijo el cliente */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const seg = ac(t, M('seguimiento'), M('seguimiento') + 0.6);
                  const tenue = (n: typeof nombres[number]) => (n === 'seguimiento' ? 1 : 1 - 0.55 * seg);
                  const resp: { n: typeof nombres[number]; tipo: string; txt: string; x: number; y: number }[] = [
                    { n: 'introduccion', tipo: 'introducción', txt: '¿Cómo estás?', x: 260, y: 420 },
                    { n: 'espejo', tipo: 'espejo', txt: 'Bien, ¿y tú?', x: 580, y: 420 },
                    { n: 'cambio', tipo: 'cambio total', txt: '¿Viste el partido?', x: 260, y: 610 },
                    { n: 'seguimiento', tipo: 'seguimiento', txt: '¿Y cómo te fue?', x: 580, y: 610 },
                  ];
                  return (
                    <g>
                      <Persona id={ID} x={1040} y={820} s={0.95} cuerpo="#64748b" corbata />
                      <Gesto x={1040} y={820} s={0.95} animo={-0.1 + 0.8 * ac(t, M('respetado'), M('respetado') + 0.6)} />
                      <g opacity={e1(t, 0.3)}>
                        <Burbuja x={1050} y={610} w={330} texto="Probamos otro proveedor" u={ac(t, 0.4, 1.6)} c={c} lado="der" id={ID} />
                      </g>
                      {resp.map((r) => {
                        const op = e1(t, M(r.n));
                        if (op < 0.01) return null;
                        const destaca = r.n === 'seguimiento' ? seg : 0;
                        return (
                          <g key={r.n} opacity={op * tenue(r.n)} transform={`translate(${r.x} ${r.y + (1 - op) * 20})`}>
                            <rect x={-150} y={-60} width={300} height={100} rx={26} fill={destaca > 0.5 ? `url(#${ID}-marca)` : c.panel} style={sombra(c.sombra, 4, 10)} />
                            <Txt f="a" x={0} y={8} textAnchor="middle" fontSize={MIN_TXT} fill={destaca > 0.5 ? '#fff' : c.texto}>{r.txt}</Txt>
                            <Txt f="a" x={0} y={78} textAnchor="middle" fontSize={MIN_TXT * 0.85} fill={c.tenue}>{r.tipo}</Txt>
                            {r.n === 'cambio' && <path d={`M 150 -10 Q 200 -40 ${210 + 10 * Math.sin(t * 3)} -90`} stroke={c.tenue} strokeWidth={5} fill="none" strokeDasharray="10 8" />}
                          </g>
                        );
                      })}
                      {/* el hilo: la de seguimiento se engancha a lo que dijo el cliente */}
                      {seg > 0.01 && <path d={`M 730 600 Q 760 570 ${lerp(730, 800, seg)} ${lerp(600, 560, seg)}`} stroke={NARANJA} strokeWidth={7} fill="none" strokeLinecap="round" opacity={seg} />}
                      {e1(t, M('solas')) > 0.01 && [0, 1, 2].map((k) => <Estrella key={k} x={500 + k * 80} y={505} r={12 + 3 * Math.sin(t * 4 + k)} fill={NARANJA} op={e1(t, M('solas') + k * 0.2)} rot={t * 40} />)}
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B · abiertas y cerradas */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const op = ventana(t, M('abrir'), M('sesenta'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      <Puerta x={360} y={640} abierta={ac(t, M('abrir') + 0.3, M('abrir') + 1.2)} c={c} id={ID} />
                      <Puerta x={840} y={640} abierta={0} c={c} id={ID} />
                      <Txt f="a" x={360} y={700} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>abierta</Txt>
                      <Txt f="a" x={840} y={700} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>cerrada</Txt>
                      <Chip x={360} y={780} texto="sin interrogatorio" c={c} id={ID} op={e1(t, M('interrogatorio'))} marca />
                    </g>
                  );
                })()}
                {(() => {
                  const op = ventana(t, M('sesenta'), M('tensa'));
                  if (op < 0.01) return null;
                  const barra = (x: number, v: number, t0: number, txt: string, tipo: string, col: string) => {
                    const h = 420 * v * ac(t, t0, t0 + 1);
                    return (
                      <g opacity={e1(t, t0 - 0.1)}>
                        <rect x={x - 80} y={680 - h} width={160} height={Math.max(14, h)} rx={18} fill={col} />
                        <Txt x={x} y={660 - h} textAnchor="middle" fontSize={64} fill={col} peso={800}>{txt}</Txt>
                        <Txt f="a" x={x} y={730} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{tipo}</Txt>
                      </g>
                    );
                  };
                  return (
                    <g opacity={op}>
                      <Etiqueta x={600} y={170} texto="«pensar por sí mismos»" op={e1(t, M('sesenta') - 0.2)} c={c} id={ID} />
                      {barra(400, 0.6, M('sesenta'), '60 %', 'de una lista', NARANJA)}
                      {barra(800, 0.05, M('cinco'), '5 %', 'abierta', ROSA)}
                      <line x1={260} y1={680} x2={940} y2={680} stroke={c.apagado} strokeWidth={4} />
                    </g>
                  );
                })()}
                {(() => {
                  const op = e1(t, M('tensa'));
                  if (op < 0.01) return null;
                  const pes = e1(t, M('pesimistas')), opt = e1(t, M('optimista'));
                  const medidor = (x: number, v: number, col: string, o: number) => (
                    <g opacity={o} transform={`translate(${x} 640)`}>
                      <rect x={-130} y={-16} width={260} height={32} rx={16} fill={c.apagado} />
                      <rect x={-130} y={-16} width={260 * v * ac(o, 0.5, 1)} height={32} rx={16} fill={col} />
                      <Txt f="a" x={0} y={70} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>mentiras</Txt>
                    </g>
                  );
                  return (
                    <g opacity={op}>
                      <g opacity={1 - pes}><Puerta x={600} y={420} abierta={0} c={c} id={ID} /></g>
                      <g opacity={pes}>
                        <rect x={90} y={250} width={480} height={170} rx={26} fill={c.panel} style={sombra(c.sombra)} />
                        <Txt f="a" x={120} y={310} fontSize={MIN_TXT} fill={c.texto}>«Necesitará equipo</Txt>
                        <Txt f="a" x={120} y={350} fontSize={MIN_TXT} fill={c.texto}>nuevo, ¿correcto?»</Txt>
                        <Txt f="a" x={120} y={396} fontSize={MIN_TXT * 0.85} fill={VERDE}>pesimista</Txt>
                      </g>
                      {medidor(330, 0.25, VERDE, pes)}
                      <g opacity={opt}>
                        <rect x={630} y={250} width={480} height={170} rx={26} fill={c.panel} style={sombra(c.sombra)} />
                        <Txt f="a" x={660} y={310} fontSize={MIN_TXT} fill={c.texto}>«Está en buen</Txt>
                        <Txt f="a" x={660} y={350} fontSize={MIN_TXT} fill={c.texto}>estado, ¿verdad?»</Txt>
                        <Txt f="a" x={660} y={396} fontSize={MIN_TXT * 0.85} fill={ROSA}>optimista</Txt>
                      </g>
                      {medidor(870, 0.7, ROSA, opt)}
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · el orden y el tono */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const op = ventana(t, M('orden'), M('tono'));
                  if (op < 0.01) return null;
                  const secuencia = (x: number, tam: number[], t0: number, rot: string, col: string) => (
                    <g opacity={e1(t, t0)}>
                      {tam.map((r, k) => <circle key={k} cx={x - 150 + k * 150} cy={430} r={r * e1(t, t0 + 0.3 + k * 0.35)} fill={col} opacity={0.35 + 0.22 * k} />)}
                      <path d={`M ${x - 180} 560 H ${x + 170}`} stroke={c.tenue} strokeWidth={5} />
                      <path d={`M ${x + 156} 548 L ${x + 176} 560 L ${x + 156} 572`} stroke={c.tenue} strokeWidth={5} fill="none" />
                      <Txt f="a" x={x} y={630} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{rot}</Txt>
                    </g>
                  );
                  return (
                    <g opacity={op}>
                      {secuencia(330, [70, 45, 22], M('dificil'), 'difícil primero', ROSA)}
                      {secuencia(870, [22, 45, 70], M('profundo'), 'hacia lo profundo', NARANJA)}
                    </g>
                  );
                })()}
                {(() => {
                  const op = e1(t, M('tono'));
                  if (op < 0.01) return null;
                  const dob = ac(t, M('doble'), M('doble') + 1);
                  return (
                    <g opacity={op}>
                      {/* oficial: escritorio */}
                      <Persona id={ID} x={330} y={600} s={0.9} cuerpo="#475569" corbata />
                      <rect x={170} y={560} width={320} height={26} rx={6} fill={c.tenue} />
                      <rect x={190} y={586} width={280} height={130} fill={c.apagado} />
                      <Txt f="a" x={330} y={780} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>oficial</Txt>
                      {/* informal: sillón */}
                      <path d="M 720 560 Q 720 520 760 520 H 980 Q 1020 520 1020 560 V 640 H 720 Z" fill={`url(#${ID}-marca)`} />
                      <Persona id={ID} x={870} y={630} s={0.9} cuerpo="#64748b" />
                      <Gesto x={870} y={630} s={0.9} animo={0.7} />
                      <rect x={700} y={600} width={340} height={80} rx={26} fill={NARANJA} />
                      <rect x={700} y={600} width={340} height={80} rx={26} fill="#000" opacity={0.1} />
                      <Txt f="a" x={870} y={780} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>informal</Txt>
                      {/* cuánto se comparte */}
                      <g opacity={dob}>
                        <rect x={290} y={300} width={80} height={60} rx={12} fill={c.tenue} />
                        <rect x={830} y={300 - 60 * dob} width={80} height={60 + 60 * dob} rx={12} fill={NARANJA} />
                        <Txt x={870} y={210 - 60 * dob + 60} textAnchor="middle" fontSize={56} fill={NARANJA} peso={800}>×2</Txt>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
