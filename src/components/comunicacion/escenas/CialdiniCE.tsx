import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Estrella, Etiqueta, Gesto, Ondas, PanelPregunta, Reloj, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import { BarraV, SeisPrincipios } from './comunPersuasion';
import type { PropsCE } from './comunCE';

/**
 * «Persuadir se puede aprender» (Cialdini: simpatía y reciprocidad), escena propia. Acto A: Cialdini
 * tacha la idea del don; un tablero de palancas, los impulsos humanos, se mueve de forma predecible;
 * cincuenta años de estudios y la fila de los seis principios, que queda arriba. Acto B: la reunión de
 * Tupperware, con corazones que van a la anfitriona y la barra del afecto que dobla a la del producto;
 * vendedor y cliente que se parecen en edad, religión, política y hasta en fumar; la pelota de
 * baloncesto en común y el elogio que vuelve. Acto C: la carta de la organización de veteranos, del
 * 18 % al 35 % con unas etiquetas de regalo; dar primero confianza y cooperación, y el colega al que le
 * prestas a alguien de tu equipo con el plazo encima, que luego te devuelve la ayuda.
 */

const ID = 'ce20';
const nombres = ['cialdini', 'don', 'impulsos', 'ensenar', 'decadas', 'seis', 'simpatia', 'tupperware', 'doble', 'similitud', 'seguros', 'fumar', 'interes', 'elogio', 'reciprocidad', 'veteranos', 'p18', 'regalo', 'p35', 'tosca', 'primero', 'prestas', 'pregunta'] as const;

/* Recipiente plástico con tapa de color. */
const Tupper: React.FC<{ x: number; y: number; color: string; s?: number }> = ({ x, y, color, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 -30 L 30 -30 L 26 0 L -26 0 Z" fill="#fff" opacity={0.85} />
    <rect x={-34} y={-38} width={68} height={12} rx={5} fill={color} />
  </g>
);

/* Pelota de baloncesto. */
const Pelota: React.FC<{ x: number; y: number; r?: number; giro: number }> = ({ x, y, r = 46, giro }) => (
  <g transform={`translate(${x} ${y}) rotate(${giro})`}>
    <circle r={r} fill="#ea7a1d" />
    <g stroke="#7c2d12" strokeWidth={4} fill="none">
      <line x1={-r} y1={0} x2={r} y2={0} /><line x1={0} y1={-r} x2={0} y2={r} />
      <path d={`M ${-r * 0.7} ${-r * 0.7} Q 0 0 ${-r * 0.7} ${r * 0.7}`} /><path d={`M ${r * 0.7} ${-r * 0.7} Q 0 0 ${r * 0.7} ${r * 0.7}`} />
    </g>
  </g>
);

/* Caja de regalo con moño. */
const Regalo: React.FC<{ x: number; y: number; s?: number; id: string }> = ({ x, y, s = 1, id }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-50} y={-40} width={100} height={80} rx={8} fill={`url(#${id}-marca)`} />
    <rect x={-58} y={-56} width={116} height={24} rx={6} fill={ROSA} />
    <rect x={-8} y={-56} width={16} height={96} fill="#fff" opacity={0.8} />
    <path d="M 0 -56 Q -30 -90 -36 -62 Z M 0 -56 Q 30 -90 36 -62 Z" fill="#fff" opacity={0.85} />
  </g>
);

export const CialdiniCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('prestas') + 5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Robert Cialdini'], [M('don'), 'No es un don'], [M('impulsos'), 'Impulsos predecibles'], [M('decadas'), 'Cinco décadas de estudios'],
    [M('seis'), 'Seis principios'], [M('simpatia'), '1 · Simpatía'], [M('doble'), 'El afecto pesa el doble'], [M('similitud'), 'Similitud y elogio'],
    [M('interes'), 'Un interés común'], [M('elogio'), 'Elogio sincero'], [M('reciprocidad'), '2 · Reciprocidad'], [M('tosca'), 'Da primero'],
    [M('prestas'), 'Hoy por ti, mañana por mí'],
  ];

  const sEntra = M('seis');
  const entra = [sEntra, sEntra + 0.2, sEntra + 0.4, sEntra + 0.6, sEntra + 0.8, sEntra + 1];
  const activo = t > M('reciprocidad') ? 1 : t > M('simpatia') ? 0 : -1;

  const aA = ventana(t, -1, M('simpatia'));
  const aB1 = ventana(t, M('simpatia'), M('similitud'));
  const aB2 = ventana(t, M('similitud'), M('reciprocidad'));
  const aC1 = ventana(t, M('reciprocidad'), M('tosca'));
  const aC2 = ac(t, M('tosca'), M('tosca') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cialdini: persuadir se aprende; simpatía y reciprocidad">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <SeisPrincipios t={t} entra={entra} activo={activo} c={c} id={ID} />

            {/* A · no es un don: impulsos predecibles */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <Persona id={ID} x={190} y={750} cuerpo="#334155" corbata />
                <Gesto x={190} y={750} animo={0.4} />
                <Etiqueta x={190} y={815} texto="Cialdini" op={1} c={c} id={ID} />
                {/* el don, tachado */}
                <g opacity={ventana(t, M('don'), M('decadas'))}>
                  <Estrella x={470} y={420} r={70} fill={`url(#${ID}-marca)`} rot={t * 20} />
                  <Etiqueta x={470} y={540} texto="un don" op={1} c={c} id={ID} />
                  <g opacity={e1(t, M('don') + 0.6)}><Cruz x={540} y={360} s={1.1} /></g>
                </g>
                {/* cinco décadas */}
                <g opacity={e1(t, M('decadas'))}>
                  <Txt x={470} y={450} textAnchor="middle" fontSize={96} fill={`url(#${ID}-marcaH)`}>{Math.round(50 * ac(t, M('decadas'), M('decadas') + 1.5))}</Txt>
                  <Etiqueta x={470} y={520} texto="años de estudios" op={1} c={c} id={ID} />
                </g>
                {/* tablero de palancas: los impulsos humanos */}
                <g opacity={e1(t, M('impulsos'))}>
                  <rect x={680} y={320} width={380} height={230} rx={24} fill={c.panel} style={sombra(c.sombra)} />
                  {Array.from({ length: 5 }, (_, k) => {
                    const x = 730 + k * 70;
                    const v = 0.5 + 0.4 * Math.sin(t * 1.6 + k * 1.3);
                    return (
                      <g key={k}>
                        <rect x={x - 6} y={360} width={12} height={150} rx={6} fill={c.apagado} />
                        <rect x={x - 22} y={360 + 130 * (1 - v) - 4} width={44} height={28} rx={10} fill={k % 2 ? NARANJA : ROSA} />
                      </g>
                    );
                  })}
                  <Etiqueta x={870} y={600} texto="impulsos humanos" op={1} c={c} id={ID} />
                </g>
                <Chip x={870} y={690} texto="se puede enseñar" c={c} id={ID} op={e1(t, M('ensenar'))} marca />
              </g>
            )}

            {/* B1 · Tupperware: el afecto pesa el doble */}
            {aB1 > 0.01 && (
              <g opacity={aB1}>
                {(() => {
                  const fiesta = e1(t, M('tupperware'));
                  return (
                    <g>
                      {/* decimos que sí a quien nos cae bien */}
                      <g opacity={ventana(t, M('simpatia') + 0.3, M('tupperware'))}>
                        <path d="M 600 560 C 480 470 480 360 548 352 C 578 349 594 372 600 390 C 606 372 622 349 652 352 C 720 360 720 470 600 560 Z" fill={ROSA} transform={`translate(600 456) scale(${1 + 0.05 * Math.max(0, Math.sin(t * 6))}) translate(-600 -456)`} />
                        <Etiqueta x={600} y={640} texto="nos cae bien = sí" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={fiesta}>
                        <Persona id={ID} x={600} y={760} pelo="#7c3f1d" />
                        <Gesto x={600} y={760} animo={0.8} />
                        <Etiqueta x={600} y={820} texto="anfitriona" op={1} c={c} id={ID} />
                        {[220, 980].map((x, k) => (
                          <g key={x}>
                            <Persona id={ID} x={x} y={760} cuerpo={k ? '#0f766e' : '#7c3aed'} pelo={k ? '#2b1a12' : '#c49a6c'} />
                            <Gesto x={x} y={760} animo={0.6} />
                          </g>
                        ))}
                        <rect x={340} y={700} width={140} height={20} rx={8} fill={c.apagado} />
                        <rect x={720} y={700} width={140} height={20} rx={8} fill={c.apagado} />
                        <Tupper x={380} y={700} color="#22c55e" s={0.8} /><Tupper x={440} y={700} color={NARANJA} s={0.8} />
                        <Tupper x={760} y={700} color="#3b82f6" s={0.8} /><Tupper x={820} y={700} color={ROSA} s={0.8} />
                        {/* el afecto que va hacia la anfitriona */}
                        {[0, 1].map((k) => <Ondas key={k} x1={k ? 930 : 270} y1={570} x2={k ? 660 : 540} y2={600} t={t + k * 0.4} color={ROSA} n={3} op={ac(t, M('tupperware') + 1, M('tupperware') + 2)} />)}
                      </g>
                      <g opacity={e1(t, M('doble'))}>
                        {([['afecto', 480, true], ['productos', 240, false]] as const).map(([txt, largo, m], k) => {
                          const u = ac(t, M('doble') + k * 0.4, M('doble') + 1.2 + k * 0.4);
                          return (
                            <g key={txt}>
                              <Txt f="a" x={400} y={300 + k * 90} textAnchor="end" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                              <rect x={420} y={276 + k * 90} width={Math.max(0.1, largo * u)} height={36} rx={12} fill={m ? `url(#${ID}-marcaH)` : c.apagado} />
                            </g>
                          );
                        })}
                        <Txt x={930} y={308} fontSize={44} fill={`url(#${ID}-marcaH)`} opacity={ac(t, M('doble') + 1.2, M('doble') + 1.6)}>×2</Txt>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B2 · similitud y elogio */}
            {aB2 > 0.01 && (
              <g opacity={aB2}>
                {(() => {
                  const igual = ac(t, M('seguros'), M('seguros') + 1.4);
                  const fuma = ac(t, M('fumar'), M('fumar') + 0.6);
                  return (
                    <g>
                      <Persona id={ID} x={250} y={750} cuerpo="#334155" pelo="#5b3a26" corbata />
                      <Gesto x={250} y={750} animo={0.3 + 0.5 * igual} />
                      <Etiqueta x={250} y={815} texto="vendedor" op={1} c={c} id={ID} />
                      <Persona id={ID} x={950} y={750} cuerpo={igual > 0.5 ? '#334155' : '#0f766e'} pelo="#5b3a26" />
                      <Gesto x={950} y={750} animo={0.1 + 0.6 * igual} />
                      <Etiqueta x={950} y={815} texto="cliente" op={1} c={c} id={ID} />
                      {/* el cigarrillo de ambos */}
                      {[250, 950].map((x, k) => (
                        <g key={x} opacity={fuma * ventana(t, M('fumar'), M('interes'))}>
                          <rect x={x + (k ? -40 : 14)} y={630} width={26} height={7} rx={3} fill="#f5f5f4" />
                          <circle cx={x + (k ? -40 : 40)} cy={633} r={4} fill={NARANJA} />
                        </g>
                      ))}
                      {['edad', 'religión', 'política', 'fumar'].map((txt, k) => (
                        <Chip key={txt} x={600} y={260 + k * 85} texto={txt} c={c} id={ID} op={ventana(t, M('seguros') + 0.5 + k * 0.6 + (k === 3 ? M('fumar') - M('seguros') - 2.3 : 0), M('interes'))} marca={k === 3} />
                      ))}
                      {/* un interés común: la pelota que va y viene */}
                      <g opacity={ventana(t, M('interes'), M('elogio'))}>
                        {(() => {
                          const u = (Math.sin(t * 2.2) + 1) / 2;
                          return <Pelota x={330 + 540 * u} y={520 - 140 * Math.sin(Math.PI * u)} giro={t * 200} />;
                        })()}
                        <Chip x={600} y={260} texto="interés común" c={c} id={ID} op={1} />
                      </g>
                      {/* el elogio sincero que vuelve como simpatía */}
                      <g opacity={e1(t, M('elogio'))}>
                        <Ondas x1={300} y1={560} x2={880} y2={560} t={t} color={NARANJA} n={4} />
                        <Ondas x1={900} y1={470} x2={320} y2={470} t={t + 0.5} color={ROSA} n={4} op={ac(t, M('elogio') + 1.2, M('elogio') + 2)} />
                        <Chip x={600} y={300} texto="elogio sincero" c={c} id={ID} op={1} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C1 · la carta con regalo: del 18 % al 35 % */}
            {aC1 > 0.01 && (
              <g opacity={aC1}>
                <g opacity={e1(t, M('veteranos'))}>
                  <rect x={170} y={330} width={300} height={200} rx={16} fill={c.blanco} style={sombra(c.sombra)} />
                  <path d="M 170 330 L 320 440 L 470 330" fill="none" stroke={c.apagado} strokeWidth={5} />
                  <Etiqueta x={320} y={590} texto="carta de donación" op={1} c={c} id={ID} />
                </g>
                {/* las etiquetas personalizadas */}
                <g opacity={e1(t, M('regalo'))} transform={`translate(0 ${-20 * Math.sin(t * 2)})`}>
                  {[0, 1, 2].map((k) => (
                    <g key={k} transform={`translate(${250 + k * 70} ${300 - k * 8}) rotate(${-8 + k * 8})`}>
                      <rect x={-34} y={-20} width={68} height={40} rx={8} fill={k === 1 ? NARANJA : ROSA} />
                      <rect x={-22} y={-6} width={44} height={6} rx={3} fill="#fff" opacity={0.85} />
                    </g>
                  ))}
                </g>
                <BarraV x={720} base={650} alto={18 * 10} valor="18 %" etiqueta="sin regalo" u={ac(t, M('p18'), M('p18') + 1)} c={c} id={ID} />
                <BarraV x={1000} base={650} alto={35 * 10} valor="35 %" etiqueta="con regalo" u={ac(t, M('p35'), M('p35') + 1.2)} c={c} id={ID} marca />
              </g>
            )}

            {/* C2 · dar primero; prestar a alguien de tu equipo */}
            {aC2 > 0.01 && (
              <g opacity={aC2}>
                {(() => {
                  const camina = ac(t, M('prestas') + 0.8, M('prestas') + 3);
                  const vuelve = ac(t, M('prestas') + 4, M('prestas') + 5);
                  return (
                    <g>
                      <Persona id={ID} x={180} y={750} cuerpo="#334155" corbata />
                      <Gesto x={180} y={750} animo={0.6} />
                      <Etiqueta x={180} y={815} texto="tú" op={1} c={c} id={ID} />
                      <g opacity={ventana(t, M('tosca'), M('primero'))}>
                        <Regalo x={600} y={420} id={ID} />
                        <Etiqueta x={600} y={520} texto="lo más tosco" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('primero'), M('prestas'))}>
                        <path d="M 260 600 H 900" stroke={NARANJA} strokeWidth={8} strokeLinecap="round" />
                        <path d="M 880 580 L 910 600 L 880 620" stroke={ROSA} strokeWidth={8} fill="none" strokeLinecap="round" />
                        {['confianza', 'cooperación', 'buen trato'].map((txt, k) => <Chip key={txt} x={580} y={290 + k * 95} texto={txt} c={c} id={ID} op={e1(t, M('primero') + 0.6 + k * 0.8)} />)}
                      </g>
                      <g opacity={e1(t, M('primero'))}>
                        <Persona id={ID} x={1020} y={750} cuerpo="#0f766e" pelo="#3b2a20" />
                        <Gesto x={1020} y={750} animo={0.2 + 0.5 * camina} />
                        <Etiqueta x={1020} y={815} texto="colega" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('prestas'))}>
                        <Reloj x={1020} y={310} c={c} progreso={0.3 + 0.6 * ac(t, M('prestas'), M('prestas') + 3)} />
                        <Persona id={ID} x={330 + 520 * camina} y={760} s={0.75} cuerpo="#7c3aed" pelo="#c49a6c" />
                        <Etiqueta x={330 + 520 * camina} y={815} texto="tu equipo" op={1 - camina} c={c} id={ID} />
                      </g>
                      <g opacity={vuelve}>
                        <path d="M 900 400 Q 600 300 300 400" stroke={c.tenue} strokeWidth={6} fill="none" strokeDasharray="14 12" strokeDashoffset={-t * 40} />
                        <Chip x={600} y={300} texto="ayuda de vuelta" c={c} id={ID} op={1} marca />
                      </g>
                      <g opacity={ventana(t, M('prestas'), M('prestas') + 4)}>
                        <Burbuja x={1000} y={560} w={300} texto="¡El plazo!" u={1} c={c} lado="der" id={ID} />
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
