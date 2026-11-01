import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Cara, Copa, Estrella, Etiqueta, Gesto, Insignia, MesaRestaurante, Plato, PanelPregunta, Reloj, Rotulo, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «La primera impresión», escena propia. Acto A: el almuerzo de Gordon con el profesor que decide;
 * la burbuja «deberías probarlo», el tenedor que va al plato ajeno, los logros, el sello de no
 * contratado y lo que el profesor quiso decir. Acto B: la cabeza de vidrio con la intención adentro y
 * el vidrio esmerilado que ve el otro; luego la nube de puntos de la correlación débil. Acto C: cuatro
 * emociones fuertes que se leen y dos caras sutiles casi iguales. Acto D: mirar al vacío mientras un
 * colega habla: tres explicaciones posibles, el colega escoge una; los errores son predecibles.
 */

const ID = 'ce1i';
const nombres = ['minutos', 'gordon', 'ultima', 'probarlo', 'bocado', 'logros', 'contrataron', 'algunaVez', 'respeto', 'ilusion', 'debiles', 'fuertes', 'sutiles', 'dolio', 'importo', 'vacio', 'cafetera', 'escogera', 'predecibles', 'pregunta'] as const;

/* Tenedor en (x, y) apuntando hacia `ang` grados. */
const Tenedor: React.FC<{ x: number; y: number; ang: number; c: Tono }> = ({ x, y, ang, c }) => (
  <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <rect x={-60} y={-5} width={70} height={10} rx={5} fill={c.tenue} />
    {[-9, -3, 3, 9].map((d) => <rect key={d} x={10} y={d - 1.5} width={26} height={3} rx={1.5} fill={c.tenue} />)}
    <rect x={8} y={-11} width={8} height={22} rx={3} fill={c.tenue} />
  </g>
);

/* Nube de pensamiento. */
const Nube: React.FC<{ x: number; y: number; s?: number; c: Tono; marca?: boolean; id: string; children?: React.ReactNode }> = ({ x, y, s = 1, c, marca, id, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} style={sombra(c.sombra, 4, 10)}>
    <path d="M -80 30 Q -110 30 -104 0 Q -110 -40 -66 -44 Q -50 -84 -4 -74 Q 30 -100 66 -66 Q 112 -60 104 -14 Q 120 30 76 38 Q 50 62 0 52 Q -50 62 -80 30 Z" fill={marca ? `url(#${id}-marca)` : c.panel} />
    <circle cx={-60} cy={78} r={12} fill={marca ? NARANJA : c.panel} />
    <circle cx={-78} cy={104} r={7} fill={marca ? NARANJA : c.panel} />
    {children}
  </g>
);

export const PrimeraImpresionCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('predecibles') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Se juega en minutos'], [M('gordon'), 'El almuerzo de Gordon'], [M('probarlo'), '«Deberías probarlo»'], [M('logros'), 'Repasa sus logros'],
    [M('contrataron'), 'No lo contratan'], [M('algunaVez'), 'Lo que quiso decir'], [M('ilusion'), 'La ilusión de transparencia'],
    [M('debiles'), 'Cómo te ves ≠ cómo te ven'], [M('fuertes'), 'Lo fuerte se lee'], [M('sutiles'), 'Lo sutil, no'],
    [M('vacio'), 'Todo gesto se interpreta'], [M('escogera'), 'El otro escoge una'], [M('predecibles'), 'Errores predecibles'],
  ];

  const aA = ventana(t, -1, M('ilusion'));
  const aB = ventana(t, M('ilusion'), M('fuertes'));
  const aC = ventana(t, M('fuertes'), M('vacio'));
  const aD = ac(t, M('vacio'), M('vacio') + 0.4);

  // Ánimo del profesor: amable hasta el bocado; se ofende después.
  const ofensa = ac(t, M('bocado') + 0.8, M('bocado') + 1.6) + 0.3 * ac(t, M('respeto'), M('respeto') + 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Gordon prueba el plato del profesor que decidía su contratación; nadie ve nuestra intención; las emociones sutiles no se leen; cada gesto se interpreta">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · el almuerzo */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <g opacity={ventana(t, -1, M('probarlo'))}><Reloj x={600} y={280} s={1.6} c={c} progreso={t * 0.3} /></g>
                {/* Los dos comensales sentados y la mesa del restaurante (la mesa se dibuja encima) */}
                <g opacity={e1(t, M('gordon') - 0.3)}>
                  <Persona id={ID} x={300} y={650} s={1.15} />
                  <Gesto x={300} y={650} s={1.15} animo={0.4 - 0.9 * ac(t, M('contrataron'), M('contrataron') + 0.6)} />
                  <Persona id={ID} x={900} y={650} s={1.15} cuerpo="#64748b" pelo="#9ca3af" corbata />
                  <Gesto x={900} y={650} s={1.15} animo={0.5 - 1.5 * ofensa} />
                  <MesaRestaurante x0={250} x1={950} y={628} c={c} />
                  <Copa x={540} y={598} c={c} />
                  <Copa x={700} y={598} c={c} />
                  <Plato x={430} y={606} c={c} comida="pasta" />
                  <Plato x={790} y={606} c={c} comida="carne" />
                  <Etiqueta x={300} y={838} texto="Gordon" op={e1(t, M('gordon'))} c={c} id={ID} marca />
                  <Etiqueta x={900} y={838} texto="decide" op={e1(t, M('ultima'))} c={c} id={ID} />
                </g>
                {/* «Deberías probarlo» */}
                <g opacity={ventana(t, M('probarlo'), M('logros'))}>
                  <Burbuja x={880} y={436} w={520} texto="Esto está buenísimo, deberías probarlo" u={ac(t, M('probarlo'), M('probarlo') + 1.6)} c={c} lado="der" id={ID} />
                </g>
                {/* El tenedor de Gordon: descansa junto a su plato, va al plato del profesor y vuelve a su boca */}
                {(() => {
                  if (t < M('gordon') - 0.3 || t > M('ilusion')) return null;
                  // ida al plato ajeno, bocado, y regreso del tenedor a su lugar junto al plato de Gordon
                  const u = ac(t, M('bocado'), M('bocado') + 3);
                  const ida = ac(u, 0, 0.25), boca = ac(u, 0.35, 0.55), deja = ac(u, 0.75, 1);
                  const x = lerp(lerp(lerp(500, 770, ida), 330, boca), 500, deja);
                  const y = lerp(lerp(lerp(618, 596, ida), 520, boca), 618, deja) - Math.sin(Math.PI * ida) * 50 * (1 - boca);
                  const ang = lerp(lerp(lerp(0, 20, ida), 200, boca), 360, deja);
                  return <Tenedor x={x} y={y} ang={ang} c={c} />;
                })()}
                {/* Los logros de Gordon */}
                {(() => {
                  const op = ventana(t, M('logros'), M('contrataron'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op} transform="translate(440 290)">
                      <rect x={-180} y={-100} width={360} height={200} rx={30} fill={`url(#${ID}-marca)`} style={sombra(c.sombra, 4, 10)} />
                      <path d="M -160 98 L -150 150 L -110 98 Z" fill={NARANJA} />
                      {[0, 1, 2].map((k) => <Estrella key={k} x={-90 + k * 90} y={-20} r={36} fill="#fff" op={e1(t, M('logros') + 0.3 + k * 0.4)} rot={Math.sin(t * 2 + k) * 8} />)}
                      <Txt f="a" x={0} y={66} textAnchor="middle" fontSize={MIN_TXT} fill="#fff">logros</Txt>
                    </g>
                  );
                })()}
                {/* Sello: no contratado */}
                {(() => {
                  const op = ventana(t, M('contrataron'), M('algunaVez'));
                  if (op < 0.01) return null;
                  const g = e1(t, M('contrataron'), 0.45);
                  return (
                    <g opacity={op} transform={`translate(600 330) rotate(-9) scale(${lerp(1.8, 1, g)})`}>
                      <rect x={-250} y={-62} width={500} height={124} rx={20} fill="none" stroke={ROSA} strokeWidth={10} />
                      <Txt f="a" x={0} y={18} textAnchor="middle" fontSize={56} fill={ROSA} peso={800}>NO CONTRATADO</Txt>
                    </g>
                  );
                })()}
                {/* Lo que el profesor quiso decir y lo que sintió */}
                {(() => {
                  const op = ventana(t, M('algunaVez'), M('ilusion'));
                  if (op < 0.01) return null;
                  const u = 0.45 * ac(t, M('algunaVez'), M('algunaVez') + 1.3) + 0.55 * ac(t, M('respeto'), M('respeto') + 1.3);
                  return <g opacity={op}><Burbuja x={880} y={436} w={520} texto="«…probarlo alguna vez». ¡Qué falta de respeto!" u={u} c={c} lado="der" id={ID} /></g>;
                })()}
              </g>
            )}

            {/* ACTO B · la ilusión de transparencia y la correlación débil */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const op = ventana(t, M('ilusion'), M('debiles'));
                  if (op < 0.01) return null;
                  const luz = 0.6 + 0.4 * Math.sin(t * 3);
                  return (
                    <g opacity={op}>
                      {/* Gordon con su intención encendida dentro de una burbuja de vidrio */}
                      <Persona id={ID} x={300} y={790} s={1.5} />
                      <Gesto x={300} y={790} s={1.5} animo={0.5} />
                      <circle cx={345} cy={500} r={11} fill={c.panel2} stroke="#fff" strokeWidth={3} opacity={0.9} />
                      <circle cx={372} cy={452} r={17} fill={c.panel2} stroke="#fff" strokeWidth={3} opacity={0.9} />
                      <g transform="translate(400 330)">
                        <circle r={108} fill={NARANJA} opacity={0.1 + 0.08 * luz} />
                        <circle r={100} fill={c.panel2} opacity={0.4} />
                        <circle r={100} fill="none" stroke="#fff" strokeWidth={5} opacity={0.8} />
                        <path d="M -62 -50 Q -40 -82 -2 -86" stroke="#fff" strokeWidth={9} fill="none" opacity={0.7} strokeLinecap="round" />
                        {/* bombilla */}
                        <g transform="scale(1.5)">
                          <circle cx={0} cy={-12} r={34} fill={NARANJA} opacity={0.25 * luz} />
                          <path d="M -22 -14 Q -22 -40 0 -40 Q 22 -40 22 -14 Q 22 0 12 10 V 20 H -12 V 10 Q -22 0 -22 -14 Z" fill={`url(#${ID}-marca)`} opacity={0.75 + 0.25 * luz} />
                          <path d="M -8 -14 Q 0 -2 8 -14" stroke="#fff" strokeWidth={3} fill="none" opacity={0.8} />
                          <rect x={-12} y={22} width={24} height={7} rx={3} fill={c.tenue} />
                          <rect x={-9} y={31} width={18} height={6} rx={3} fill={c.apagado} />
                        </g>
                      </g>
                      {/* La señal sale de la burbuja y se vuelve difusa al cruzar el vidrio */}
                      {[0, 1, 2, 3].map((k) => {
                        const u = (t * 0.45 + k / 4) % 1;
                        const x = lerp(505, 840, u), y = lerp(340, 420, u);
                        const tras = x > 640;
                        return <circle key={k} cx={x} cy={y} r={tras ? 20 : 11} fill={tras ? c.tenue : NARANJA} opacity={(tras ? 0.3 : 0.9) * Math.sin(Math.PI * u)} />;
                      })}
                      {/* Vidrio esmerilado, en volumen */}
                      <g transform="translate(640 470)">
                        <path d="M 90 -190 L 112 -176 L 112 204 L 90 190 Z" fill={c.apagado} />
                        <rect x={-90} y={-190} width={180} height={380} rx={14} fill={c.panel} opacity={0.92} style={sombra(c.sombra, 6, 14)} />
                        {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-70} y={-170 + k * 36} width={140} height={12} rx={6} fill={c.apagado} opacity={0.4} />)}
                        <path d="M -70 -150 L -20 -190 M -70 -90 L 10 -160" stroke="#fff" strokeWidth={6} opacity={0.5} strokeLinecap="round" />
                        <rect x={-70} y={196} width={140} height={14} rx={7} fill={c.tenue} />
                      </g>
                      {/* El profesor solo ve un signo de pregunta */}
                      <Persona id={ID} x={930} y={790} s={1.5} cuerpo="#64748b" pelo="#9ca3af" corbata />
                      <Gesto x={930} y={790} s={1.5} animo={-0.2} />
                      <g transform="translate(930 360)" opacity={e1(t, M('ilusion') + 1)}>
                        <circle r={70} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                        <circle cx={-18} cy={86} r={11} fill={c.panel} />
                        <Txt x={0} y={28} textAnchor="middle" fontSize={84} fill={c.tenue} peso={800}>?</Txt>
                      </g>
                      <Etiqueta x={400} y={190} texto="tu intención" op={e1(t, M('ilusion') + 0.6)} c={c} id={ID} marca />
                      <Etiqueta x={930} y={250} texto="lo que ve" op={e1(t, M('ilusion') + 1.1)} c={c} id={ID} />
                    </g>
                  );
                })()}
                {(() => {
                  const op = e1(t, M('debiles'));
                  if (op < 0.01) return null;
                  const pts = Array.from({ length: 34 }, (_, k) => {
                    const x = ((k * 37) % 100) / 100;
                    const y = 0.5 + 0.18 * (x - 0.5) + 0.35 * Math.sin(k * 12.9898);
                    return [x, Math.max(0.05, Math.min(0.95, y))] as const;
                  });
                  return (
                    <g opacity={op} transform="translate(330 170)">
                      <rect x={0} y={0} width={540} height={460} rx={24} fill={c.panel} style={sombra(c.sombra)} />
                      <line x1={60} y1={400} x2={510} y2={400} stroke={c.apagado} strokeWidth={5} />
                      <line x1={60} y1={400} x2={60} y2={40} stroke={c.apagado} strokeWidth={5} />
                      {pts.map(([x, y], k) => <circle key={k} cx={70 + x * 430} cy={390 - y * 340} r={11} fill={k % 3 ? NARANJA : ROSA} opacity={0.8 * e1(t, M('debiles') + 0.2 + k * 0.03)} />)}
                      <line x1={70} y1={390 - 0.41 * 340} x2={500} y2={390 - 0.59 * 340} stroke={c.texto} strokeWidth={5} strokeDasharray="12 10" opacity={ac(t, M('debiles') + 1.4, M('debiles') + 2)} />
                      <Txt f="a" x={285} y={520} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>cómo te ves</Txt>
                      <Txt f="a" x={-30} y={220} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} transform="rotate(-90 -30 220)">cómo te ven</Txt>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · emociones fuertes y sutiles */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const tenue = 1 - 0.65 * ac(t, M('sutiles'), M('sutiles') + 0.5);
                  const caras = [
                    { k: 'sorpresa', p: { cejas: -1.2, abierta: 1 } },
                    { k: 'miedo', p: { cejas: -0.8, abierta: 0.55, ojos: 1.3 } },
                    { k: 'asco', p: { cejas: 0.6, asco: true, ojos: 0.6 } },
                    { k: 'ira', p: { cejas: 1.4, boca: -0.9 } },
                  ];
                  return caras.map((cr, j) => {
                    const op = e1(t, M('fuertes') + j * 0.45);
                    return op > 0.01 ? (
                      <g key={cr.k} opacity={op * tenue}>
                        <Cara x={240 + j * 240} y={270} r={70} id={ID} {...cr.p} />
                        <Txt f="a" x={240 + j * 240} y={400} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{cr.k}</Txt>
                      </g>
                    ) : null;
                  });
                })()}
                {(() => {
                  const op = e1(t, M('sutiles'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      <Cara x={420} y={600} r={78} id={ID} boca={-0.12} cejas={0.15} />
                      <Cara x={780} y={600} r={78} id={ID} boca={-0.05} cejas={0.1} />
                      <Txt x={600} y={622} textAnchor="middle" fontSize={80} fill={NARANJA} peso={800}>≈</Txt>
                      <Etiqueta x={420} y={740} texto="me dolió" op={e1(t, M('dolio'))} c={c} id={ID} />
                      <Etiqueta x={780} y={740} texto="no me importó" op={e1(t, M('importo'))} c={c} id={ID} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO D · mirar al vacío: tres explicaciones, el otro escoge una */}
            {aD > 0.01 && (
              <g opacity={aD}>
                <Persona id={ID} x={300} y={780} s={0.95} />
                <Gesto x={300} y={780} s={0.95} animo={0} />
                <line x1={300} y1={652} x2={120} y2={540} stroke={c.apagado} strokeWidth={4} strokeDasharray="8 10" opacity={0.7 + 0.3 * Math.sin(t * 2)} />
                <Persona id={ID} x={900} y={780} s={0.95} cuerpo="#64748b" />
                <Gesto x={900} y={780} s={0.95} animo={0.1} />
                {([['zzz', 'aburrido', 360, M('vacio') + 1.2], ['eng', 'concentrado', 600, M('vacio') + 2.2], ['caf', 'cafetera', 840, M('cafetera')]] as const).map(([k, txt, x, t0], j) => {
                  const op = e1(t, t0);
                  if (op < 0.01) return null;
                  const elegido = j === 0 ? ac(t, M('escogera'), M('escogera') + 0.5) : 0;
                  const resto = j === 0 ? 1 : 1 - 0.6 * ac(t, M('escogera'), M('escogera') + 0.5);
                  return (
                    <g key={k} opacity={op * resto}>
                      <Nube x={x} y={230} s={0.95 + 0.1 * elegido} c={c} id={ID} marca={elegido > 0.5}>
                        {k === 'zzz' && <Txt x={0} y={16} textAnchor="middle" fontSize={54} fill={elegido > 0.5 ? '#fff' : NARANJA} peso={800}>Zzz</Txt>}
                        {k === 'eng' && <g transform={`rotate(${t * 60})`}>{Array.from({ length: 8 }, (_, q) => <rect key={q} x={-8} y={-44} width={16} height={22} rx={4} fill={NARANJA} transform={`rotate(${q * 45})`} />)}<circle r={28} fill={NARANJA} /><circle r={11} fill={c.panel} /></g>}
                        {k === 'caf' && <g><path d="M -30 -30 H 26 L 20 34 H -24 Z" fill={c.tenue} /><path d="M 26 -18 Q 50 -14 46 8 Q 42 26 22 22" fill="none" stroke={c.tenue} strokeWidth={7} /><path d="M -14 -44 Q -8 -56 -14 -66 M 4 -44 Q 10 -56 4 -66" stroke={ROSA} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.6 + 0.4 * Math.sin(t * 4)} /></g>}
                      </Nube>
                      <Txt f="a" x={x} y={395} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                    </g>
                  );
                })}
                <g opacity={e1(t, M('predecibles'))}><Insignia x={600} y={470} texto="errores predecibles" c={c} id={ID} /></g>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

/* Señal que va de la cabeza al vidrio y se pierde en él. */
const Ondas3: React.FC<{ t: number }> = ({ t }) => (
  <g>
    {[0, 1, 2].map((k) => {
      const u = (t * 0.5 + k / 3) % 1;
      return <circle key={k} cx={lerp(560, 720, u)} cy={420} r={10} fill={NARANJA} opacity={Math.sin(Math.PI * u) * (1 - u)} />;
    })}
  </g>
);
