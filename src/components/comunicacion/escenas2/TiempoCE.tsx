import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, Hoja, Ondas, PanelPregunta, Plato, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { Palancas } from './comun2';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «El tiempo no es el enemigo» (Hamm, cuarta palanca), escena propia. Acto A: Alan corre delante de un
 * reloj con cara de monstruo; la propuesta para BellSouth, vigilada hora a hora, sale impecable y pierde
 * ante un competidor que conversó con el cliente: una cena de cinco platos, sin vino, sin mantel y fría.
 * Acto B: Mark King y el aniversario 25: a seis meses, la línea completa de palos se tacha y queda un solo
 * palo, que termina en manos de la mitad de los profesionales. Acto C: la cuenta: siete personas por tres
 * iniciativas por cuatro trimestres son 84 logros; el 85 se tacha.
 */

const ID = 'ce2e';
const nombres = ['tiempo', 'alan', 'atrasado', 'enemigo', 'bellsouth', 'cadaHora', 'impecable', 'perdieron', 'relaciones', 'noHablaron', 'cena', 'fria', 'king', 'aniversario', 'seisMeses', 'noLlegaria', 'cambioMeta', 'unPalo', 'mitad', 'datoFijo', 'cuenta', 'siete', 'tres', 'cuatro', 'l84', 'o85', 'pregunta'] as const;

/* Reloj con cara: `furia` de 0 (tranquilo) a 1 (monstruo). */
const RelojCara: React.FC<{ x: number; y: number; r: number; furia: number; t: number; c: ReturnType<typeof tono> }> = ({ x, y, r, furia, t, c }) => (
  <g transform={`translate(${x} ${y}) rotate(${furia * 4 * Math.sin(t * 9)})`}>
    <circle r={r} fill={furia > 0.5 ? '#fecaca' : c.panel} stroke={furia > 0.5 ? '#dc2626' : c.tenue} strokeWidth={10} style={sombra(c.sombra)} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.7} stroke={c.texto} strokeWidth={8} strokeLinecap="round" transform={`rotate(${t * 120})`} />
    <line x1={0} y1={0} x2={r * 0.45} y2={0} stroke={c.texto} strokeWidth={8} strokeLinecap="round" />
    <circle cx={-r * 0.35} cy={-r * 0.25} r={7} fill={c.texto} opacity={furia} /><circle cx={r * 0.35} cy={-r * 0.25} r={7} fill={c.texto} opacity={furia} />
    <path d={`M ${-r * 0.4} ${r * 0.45} L ${-r * 0.2} ${r * 0.3} L 0 ${r * 0.45} L ${r * 0.2} ${r * 0.3} L ${r * 0.4} ${r * 0.45}`} stroke="#dc2626" strokeWidth={5} fill="none" opacity={furia} />
  </g>
);

/* Palo de golf. */
const Palo: React.FC<{ x: number; y: number; rot: number; color: string }> = ({ x, y, rot, color }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-4} y={-150} width={8} height={150} rx={4} fill={color} />
    <path d="M -4 -150 h 30 q 8 0 8 10 v 6 h -38 Z" fill={color} />
    <rect x={-7} y={-12} width={14} height={30} rx={6} fill="#1f2937" />
  </g>
);

export const TiempoCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('o85') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '4 · El tiempo'], [M('alan'), 'Alan, siempre atrasado'], [M('bellsouth'), 'La propuesta a BellSouth'], [M('perdieron'), 'Perdieron'],
    [M('cena'), 'Una cena fría'], [M('king'), 'Mark King'], [M('seisMeses'), 'A seis meses'], [M('cambioMeta'), 'Cambiar la meta'],
    [M('datoFijo'), 'Un dato fijo'], [M('cuenta'), 'La cuenta de Hamm'], [M('o85'), 'El objetivo 85'],
  ];

  const aA1 = ventana(t, -1, M('perdieron'));
  const aA2 = ventana(t, M('perdieron'), M('king'));
  const aB = ventana(t, M('king'), M('cuenta'));
  const aC = ac(t, M('cuenta'), M('cuenta') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="El tiempo no es un monstruo sino un dato fijo dentro del cual se elige bien">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <Palancas t={t} entra={[0, 0.1, 0.2, 0.3, 0.4]} activo={3} c={c} id={ID} />

            {/* A1 · Alan y el reloj enemigo; la propuesta vigilada */}
            {aA1 > 0.01 && (
              <g opacity={aA1}>
                {(() => {
                  const furia = ac(t, M('enemigo'), M('enemigo') + 0.8);
                  const corre = 10 * Math.sin(t * 10) * ac(t, M('atrasado'), M('atrasado') + 0.5);
                  return (
                    <g>
                      <g opacity={e1(t, M('alan'))} transform={`translate(${corre} 0)`}>
                        <Persona id={ID} x={300} y={760} cuerpo="#334155" corbata />
                        <Gesto x={300} y={760} animo={-0.3} />
                        <Etiqueta x={300} y={820} texto="Alan" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('tiempo'), M('bellsouth'))}><RelojCara x={720} y={460} r={130} furia={furia} t={t} c={c} /></g>
                      <Etiqueta x={720} y={650} texto="el enemigo" op={ventana(t, M('enemigo'), M('bellsouth'))} c={c} id={ID} marca />
                      <g opacity={e1(t, M('bellsouth'))}>
                        <Hoja x={640} y={440} w={240} h={280} c={c} cabeza="#1e3a8a" titulo="BellSouth" llena={ac(t, M('bellsouth'), M('impecable'))} tituloTam={24} />
                        {/* la grilla de horas vigiladas */}
                        <g opacity={e1(t, M('cadaHora'))}>
                          {Array.from({ length: 12 }, (_, k) => <rect key={k} x={830 + (k % 4) * 54} y={320 + Math.floor(k / 4) * 54} width={44} height={44} rx={8} fill={k < Math.round(12 * ac(t, M('cadaHora'), M('impecable'))) ? NARANJA : c.panel2} />)}
                          <Etiqueta x={935} y={510} texto="cada hora" op={1} c={c} id={ID} />
                        </g>
                        <g opacity={e1(t, M('impecable'))}><Visto x={740} y={320} s={1} /></g>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* A2 · el competidor conversó; la cena fría */}
            {aA2 > 0.01 && (
              <g opacity={aA2}>
                <g opacity={ventana(t, M('perdieron'), M('cena'))}>
                  <Persona id={ID} x={200} y={760} cuerpo="#334155" corbata />
                  <Gesto x={200} y={760} animo={-0.6} />
                  <Etiqueta x={200} y={820} texto="Alan" op={1} c={c} id={ID} />
                  <Persona id={ID} x={700} y={760} cuerpo="#a16207" />
                  <Gesto x={700} y={760} animo={0.7} />
                  <Etiqueta x={700} y={820} texto="competidor" op={1} c={c} id={ID} />
                  <Persona id={ID} x={1000} y={760} cuerpo="#1e3a8a" />
                  <Gesto x={1000} y={760} animo={0.6} />
                  <Etiqueta x={1000} y={820} texto="BellSouth" op={1} c={c} id={ID} />
                  <Ondas x1={750} y1={600} x2={950} y2={600} t={t} color={NARANJA} n={3} op={e1(t, M('relaciones'))} />
                  <Ondas x1={950} y1={560} x2={750} y2={560} t={t + 0.5} color={ROSA} n={3} op={e1(t, M('relaciones'))} />
                  <Chip x={850} y={400} texto="relaciones cercanas" c={c} id={ID} op={e1(t, M('relaciones'))} marca />
                  <g opacity={e1(t, M('noHablaron'))}>
                    <path d="M 260 600 H 640" stroke={c.apagado} strokeWidth={6} strokeDasharray="10 12" />
                    <Cruz x={450} y={600} s={0.9} />
                  </g>
                </g>
                <g opacity={e1(t, M('cena'))}>
                  <rect x={250} y={560} width={700} height={30} rx={12} fill={c.apagado} />
                  <rect x={290} y={590} width={20} height={170} fill={c.apagado} /><rect x={890} y={590} width={20} height={170} fill={c.apagado} />
                  {[340, 470, 600, 730, 860].map((x, k) => (
                    <g key={x}>
                      <Plato x={x} y={550} c={c} comida={k % 2 ? 'pasta' : 'carne'} s={0.75} />
                      {[0, 1].map((j) => <path key={j} d={`M ${x - 10 + j * 18} 520 q 8 -14 0 -28`} stroke="#93c5fd" strokeWidth={4} fill="none" opacity={ac(t, M('fria'), M('fria') + 0.6) * (0.5 + 0.5 * Math.sin(t * 3 + j + k))} />)}
                    </g>
                  ))}
                  <Chip x={430} y={350} texto="sin vino" c={c} id={ID} op={e1(t, M('cena') + 1.6)} />
                  <Chip x={770} y={350} texto="sin mantel" c={c} id={ID} op={e1(t, M('cena') + 2.2)} />
                  <Chip x={600} y={440} texto="y fría" c={c} id={ID} op={e1(t, M('fria'))} marca />
                </g>
              </g>
            )}

            {/* B · Mark King: un solo palo */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const uno = ac(t, M('unPalo'), M('unPalo') + 1);
                  return (
                    <g>
                      <Persona id={ID} x={180} y={760} cuerpo="#15803d" corbata />
                      <Gesto x={180} y={760} animo={0.5} />
                      <Etiqueta x={180} y={820} texto="Mark King" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('aniversario'))}>
                        <circle cx={420} cy={340} r={70} fill={`url(#${ID}-marca)`} />
                        <Txt x={420} y={360} textAnchor="middle" fontSize={56} fill="#fff">25</Txt>
                        <Txt f="a" x={420} y={450} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>2004</Txt>
                      </g>
                      {/* la línea de tiempo con fecha fija */}
                      <g opacity={e1(t, M('seisMeses'))}>
                        <path d="M 560 330 H 1060" stroke={c.apagado} strokeWidth={8} strokeLinecap="round" />
                        <rect x={1050} y={290} width={16} height={80} rx={6} fill={ROSA} />
                        <circle cx={560 + 260 * ac(t, M('seisMeses'), M('noLlegaria'))} cy={330} r={16} fill={NARANJA} />
                        <Txt f="a" x={810} y={300} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>6 meses</Txt>
                      </g>
                      {/* la línea completa se tacha; queda un palo */}
                      <g opacity={e1(t, M('noLlegaria'))}>
                        {Array.from({ length: 7 }, (_, k) => <g key={k} opacity={k === 3 ? 1 : 1 - 0.85 * uno}><Palo x={560 + k * 60} y={720} rot={-6 + k * 2} color={k === 3 && uno > 0.5 ? NARANJA : c.tenue} /></g>)}
                        <g opacity={ventana(t, M('noLlegaria') + 0.6, M('unPalo'))}><Cruz x={740} y={480} s={1.1} /></g>
                        <Chip x={750} y={780} texto="un solo palo" c={c} id={ID} op={uno} marca />
                      </g>
                      <g opacity={e1(t, M('mitad'))}>
                        <circle cx={1050} cy={560} r={80} fill={c.panel2} />
                        <path d={`M 1050 560 L 1050 480 A 80 80 0 ${ac(t, M('mitad'), M('mitad') + 1) > 0.99 ? 1 : 0} 1 ${1050 + 80 * Math.sin(Math.PI * ac(t, M('mitad'), M('mitad') + 1))} ${560 - 80 * Math.cos(Math.PI * ac(t, M('mitad'), M('mitad') + 1))} Z`} fill={NARANJA} />
                        <Etiqueta x={1050} y={680} texto="la mitad" op={1} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · 7 × 3 × 4 = 84; el 85, no */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const fila = ac(t, M('siete'), M('siete') + 1);
                  const ini = ac(t, M('tres'), M('tres') + 1);
                  const trim = ac(t, M('cuatro'), M('cuatro') + 1.5);
                  return (
                    <g>
                      {Array.from({ length: 7 }, (_, k) => (
                        <g key={k} opacity={ac(fila, k / 8, k / 8 + 0.2)}>
                          <Persona id={ID} x={180 + k * 120} y={460} s={0.5} cuerpo={k % 2 ? '#475569' : '#334155'} />
                        </g>
                      ))}
                      {Array.from({ length: 84 }, (_, k) => {
                        const q = Math.floor(k / 21), r = k % 21, persona = Math.floor(r / 3), j = r % 3;
                        const vis = q === 0 ? ac(ini, persona / 8, persona / 8 + 0.2) : ac(trim, (q - 1) / 3, (q - 1) / 3 + 0.3);
                        return <circle key={k} cx={150 + persona * 120 + j * 30} cy={510 + q * 40} r={11} fill={q % 2 ? ROSA : NARANJA} opacity={vis} />;
                      })}
                      <Txt x={1070} y={600} textAnchor="middle" fontSize={64} fill={`url(#${ID}-marcaH)`} opacity={e1(t, M('l84'))}>84</Txt>
                      <g opacity={e1(t, M('o85'))}>
                        <circle cx={1070} cy={720} r={22} fill="#dc2626" opacity={0.6} />
                        <Txt x={1070} y={730} textAnchor="middle" fontSize={26} fill="#fff">85</Txt>
                        <Cruz x={1110} y={690} s={0.7} />
                      </g>
                      <Etiqueta x={560} y={720} texto="7 × 3 × 4" op={e1(t, M('cuatro') + 1.5)} c={c} id={ID} />
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
