import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Etiqueta, Gesto, Hoja, Institucion, Insignia, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Construir credibilidad», escena propia. Acto A: las dos columnas de la credibilidad tienen huecos y
 * se rellenan con bloques que caen: un experto, un informe y un piloto para la experiencia; reuniones
 * uno a uno y aliados para las relaciones. Acto B: Tom Smith, el forastero frente al banco: el
 * consultor con su gráfico de costos, el mapa de Ontario con 135 sucursales que se encienden, la casa
 * con 90 días sin pago y Tom que entra al banco como un banquero hábil. Acto C: el arco que solo se
 * sostiene cuando cae la piedra angular.
 */

const ID = 'ce1b';
const nombres = ['comprar', 'flaqueas', 'experto', 'informes', 'piloto', 'flaqRel', 'unoAuno', 'aliados', 'tom', 'forastero', 'consultor', 'sucursales', 'ontario', 'visible', 'noventa', 'habil', 'angular', 'pregunta'] as const;

/* Bloque que cae y se apila en (x, y) con un ícono dibujado. */
const Bloque: React.FC<{ x: number; y: number; u: number; c: Tono; id: string; icono: 'experto' | 'informe' | 'piloto' | 'uno' | 'aliados'; t: number }> = ({ x, y, u, c, id, icono, t }) => {
  if (u <= 0.001) return null;
  const yy = lerp(y - 420, y, Math.min(1, u)) + (u > 0.9 ? Math.sin((u - 0.9) * 30) * 4 * (1 - u) : 0);
  return (
    <g transform={`translate(${x} ${yy})`} opacity={Math.min(1, u * 3)}>
      <rect x={-80} y={-44} width={160} height={88} rx={10} fill={`url(#${id}-marca)`} style={sombra(c.sombra, 4, 8)} />
      <g fill="#fff" stroke="#fff">
        {icono === 'experto' && <g><circle cy={6} r={16} stroke="none" /><path d="M -30 -12 L 0 -26 L 30 -12 L 0 2 Z" stroke="none" /><line x1={26} y1={-12} x2={26} y2={10} strokeWidth={3} /></g>}
        {icono === 'informe' && <g stroke="none"><rect x={-20} y={-28} width={40} height={54} rx={5} /><rect x={-12} y={-16} width={24} height={4} rx={2} fill={NARANJA} /><rect x={-12} y={-6} width={24} height={4} rx={2} fill={NARANJA} /><rect x={-12} y={4} width={16} height={4} rx={2} fill={NARANJA} /></g>}
        {icono === 'piloto' && <g stroke="none"><rect x={-22} y={8} width={44} height={20} rx={4} /><path d={`M 0 8 V -10 Q -22 ${-20 + Math.sin(t * 3) * 2} -24 -30 Q 0 -30 0 -10 Q 0 -32 24 -30 Q 22 -14 0 -10`} /></g>}
        {icono === 'uno' && <g stroke="none"><circle cx={-18} cy={-10} r={11} /><rect x={-30} y={4} width={24} height={20} rx={8} /><circle cx={18} cy={-10} r={11} /><rect x={6} y={4} width={24} height={20} rx={8} /></g>}
        {icono === 'aliados' && <g stroke="none"><path d="M -36 10 Q -10 -16 0 -4 Q 10 -16 36 10 L 30 18 Q 10 0 0 10 Q -10 0 -30 18 Z" /></g>}
      </g>
    </g>
  );
};

/* Columna con base y con huecos: los bloques la completan. */
const Base: React.FC<{ x: number; c: Tono }> = ({ x, c }) => (
  <g>
    <rect x={x - 100} y={740} width={200} height={26} rx={6} fill={c.apagado} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={x - 80} y={740 - 90 * (k + 1) - 2} width={160} height={88} rx={10} fill="none" stroke={c.apagado} strokeWidth={4} strokeDasharray="12 10" />)}
  </g>
);

export const ConstruirCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('angular') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Se construye, o se compra'], [M('flaqueas'), 'Si falta experiencia…'], [M('experto'), 'Un experto que respalde'],
    [M('informes'), 'Informes independientes'], [M('piloto'), 'Un proyecto piloto'], [M('flaqRel'), 'Si faltan relaciones…'],
    [M('unoAuno'), 'Reuniones uno a uno'], [M('aliados'), 'Aliados con buena relación'], [M('tom'), 'El caso de Tom Smith'],
    [M('forastero'), 'Nuevo y forastero'], [M('consultor'), 'Un consultor de prestigio'], [M('sucursales'), '135 sucursales en 3 meses'],
    [M('visible'), 'Una iniciativa visible'], [M('habil'), 'Más hábil de lo que creían'], [M('angular'), 'La piedra angular'],
  ];

  const aA = ventana(t, -1, M('tom'));
  const aB = ventana(t, M('tom'), M('angular'));
  const aC = ac(t, M('angular'), M('angular') + 0.4);
  const caida = (n: typeof nombres[number]) => ac(t, M(n), M(n) + 0.7);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La credibilidad que falta se construye con expertos, informes, pilotos, reuniones y aliados, como hizo Tom Smith en un banco de Ontario">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · rellenar las columnas */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <g opacity={e1(t, 0.3)}>
                  <Base x={300} c={c} />
                  <Base x={900} c={c} />
                  <Bloque x={300} y={740 - 45} u={1} c={c} id={ID} icono="experto" t={t} />
                  <Bloque x={900} y={740 - 45} u={1} c={c} id={ID} icono="uno" t={t} />
                  <Txt f="a" x={300} y={820} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>experiencia</Txt>
                  <Txt f="a" x={900} y={820} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>relaciones</Txt>
                </g>
                {/* Huecos señalados */}
                <g opacity={ventana(t, M('flaqueas'), M('experto') + 0.6)}><Txt x={300} y={480} textAnchor="middle" fontSize={90} fill={ROSA} peso={800}>?</Txt></g>
                <g opacity={ventana(t, M('flaqRel'), M('unoAuno') + 0.6)}><Txt x={900} y={480} textAnchor="middle" fontSize={90} fill={ROSA} peso={800}>?</Txt></g>
                <Bloque x={300} y={740 - 135} u={caida('experto')} c={c} id={ID} icono="experto" t={t} />
                <Bloque x={300} y={740 - 225} u={caida('informes')} c={c} id={ID} icono="informe" t={t} />
                <Bloque x={300} y={740 - 315} u={caida('piloto')} c={c} id={ID} icono="piloto" t={t} />
                <Bloque x={900} y={740 - 135} u={caida('unoAuno')} c={c} id={ID} icono="uno" t={t} />
                <Bloque x={900} y={740 - 225} u={caida('aliados')} c={c} id={ID} icono="aliados" t={t} />
                <Bloque x={900} y={740 - 315} u={caida('aliados') > 0 ? ac(t, M('aliados') + 0.5, M('aliados') + 1.2) : 0} c={c} id={ID} icono="aliados" t={t} />
                <g opacity={e1(t, M('comprar') + 0.2) * (1 - ac(t, M('flaqueas'), M('flaqueas') + 0.4))}>
                  <Insignia x={600} y={300} texto="construir o comprar" c={c} id={ID} />
                </g>
              </g>
            )}

            {/* ACTO B · Tom Smith */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const entra = ac(t, M('habil'), M('habil') + 1.4);
                  const x = lerp(170, 840, entra);
                  return (
                    <g>
                      <Institucion x={1010} y={600} s={0.95} c={c} id={ID} />
                      <Txt f="a" x={1010} y={660} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>banco</Txt>
                      <Persona id={ID} x={x} y={790} s={0.8} />
                      <Gesto x={x} y={790} s={0.8} animo={-0.1 + 0.8 * entra} />
                      <Etiqueta x={x} y={845} texto="Tom" op={1 - entra} c={c} id={ID} marca />
                      <g opacity={ventana(t, M('forastero'), M('habil'))}>
                        <rect x={60} y={500} width={220} height={60} rx={30} fill="none" stroke={c.tenue} strokeWidth={4} strokeDasharray="10 8" />
                        <Txt f="a" x={170} y={544} textAnchor="middle" fontSize={MIN_TXT * 0.8} fill={c.tenue}>forastero</Txt>
                      </g>
                      <g opacity={e1(t, M('habil') + 1)}><Insignia x={760} y={330} texto="banquero hábil" c={c} id={ID} /></g>
                    </g>
                  );
                })()}
                {/* El consultor y su gráfico de costos */}
                {(() => {
                  const op = ventana(t, M('consultor'), M('sucursales'));
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      <Persona id={ID} x={760} y={790} s={0.75} cuerpo="#475569" corbata />
                      <g transform="translate(560 420)">
                        <rect x={-210} y={-170} width={420} height={300} rx={24} fill={c.panel} style={sombra(c.sombra)} />
                        {[0.9, 0.72, 0.55, 0.4].map((v, k) => {
                          const h = 200 * v * ac(t, M('consultor') + 0.3 + k * 0.25, M('consultor') + 0.9 + k * 0.25);
                          return <rect key={k} x={-160 + k * 90} y={100 - h} width={60} height={h} rx={10} fill={k === 0 ? ROSA : c.tenue} />;
                        })}
                        <Txt f="a" x={0} y={-120} textAnchor="middle" fontSize={MIN_TXT * 0.8} fill={c.texto}>costos</Txt>
                      </g>
                    </g>
                  );
                })()}
                {/* El mapa de Ontario con 135 sucursales */}
                {(() => {
                  const op = ventana(t, M('sucursales'), M('visible'));
                  if (op < 0.01) return null;
                  const u = ac(t, M('sucursales') + 0.2, M('visible') - 0.4, 0, 1);
                  const n = Math.round(135 * u);
                  return (
                    <g opacity={op}>
                      <path d="M 330 300 Q 420 250 520 280 Q 640 230 760 290 Q 820 360 800 450 Q 830 560 740 620 Q 600 660 470 620 Q 360 600 340 500 Q 300 400 330 300 Z" fill={c.panel2} style={sombra(c.sombra, 4, 10)} />
                      {Array.from({ length: 135 }, (_, k) => {
                        const cx = 360 + ((k * 61) % 420), cy = 300 + ((k * 37) % 300);
                        return <circle key={k} cx={cx} cy={cy} r={6} fill={k < n ? NARANJA : c.apagado} opacity={k < n ? 1 : 0.6} />;
                      })}
                      <Txt x={570} y={735} textAnchor="middle" fontSize={64} fill={NARANJA} peso={800}>{n}</Txt>
                      <Etiqueta x={570} y={205} texto="Ontario" op={e1(t, M('ontario'))} c={c} id={ID} />
                    </g>
                  );
                })()}
                {/* La iniciativa visible: 90 días sin pagar la hipoteca */}
                {(() => {
                  const op = ventana(t, M('visible'), M('habil') + 0.6);
                  if (op < 0.01) return null;
                  return (
                    <g opacity={op}>
                      <g transform="translate(450 490)">
                        <path d="M -110 0 L 0 -90 L 110 0 Z" fill={`url(#${ID}-marca)`} />
                        <rect x={-90} y={0} width={180} height={140} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                        <rect x={-24} y={60} width={48} height={80} rx={6} fill={c.tenue} />
                      </g>
                      <g opacity={e1(t, M('noventa'))} transform="translate(700 490)">
                        <rect x={-90} y={-90} width={180} height={190} rx={20} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                        <rect x={-90} y={-90} width={180} height={40} rx={18} fill={VERDE} />
                        <Txt x={0} y={40} textAnchor="middle" fontSize={80} fill={c.texto} peso={800}>90</Txt>
                        <Txt f="a" x={0} y={84} textAnchor="middle" fontSize={MIN_TXT * 0.8} fill={c.tenue}>días</Txt>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO C · la piedra angular */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const piezas = 9, R = 280, cx = 600, cy = 720;
                  const cae = ac(t, M('angular') + 0.3, M('angular') + 1.1);
                  return (
                    <g>
                      {Array.from({ length: piezas }, (_, k) => {
                        if (k === 4) return null;
                        const a0 = Math.PI - (k / piezas) * Math.PI, a1 = Math.PI - ((k + 1) / piezas) * Math.PI;
                        const r1 = R, r2 = R - 90;
                        const p = (a: number, r: number) => `${cx + Math.cos(a) * r} ${cy - Math.sin(a) * r}`;
                        return <path key={k} d={`M ${p(a0, r2)} L ${p(a0, r1)} A ${r1} ${r1} 0 0 1 ${p(a1, r1)} L ${p(a1, r2)} A ${r2} ${r2} 0 0 0 ${p(a0, r2)} Z`} fill={c.panel2} stroke={c.apagado} strokeWidth={4} opacity={e1(t, M('angular') - 0.4 + k * 0.05)} />;
                      })}
                      {(() => {
                        const a0 = Math.PI - (4 / piezas) * Math.PI, a1 = Math.PI - (5 / piezas) * Math.PI;
                        const r1 = R, r2 = R - 90;
                        const p = (a: number, r: number) => `${cx + Math.cos(a) * r} ${cy - Math.sin(a) * r}`;
                        return (
                          <g transform={`translate(0 ${lerp(-300, 0, cae)})`} opacity={Math.min(1, cae * 3)}>
                            <path d={`M ${p(a0, r2)} L ${p(a0, r1)} A ${r1} ${r1} 0 0 1 ${p(a1, r1)} L ${p(a1, r2)} A ${r2} ${r2} 0 0 0 ${p(a0, r2)} Z`} fill={`url(#${ID}-marca)`} />
                          </g>
                        );
                      })()}
                      <rect x={cx - R - 20} y={cy} width={2 * R + 40} height={24} rx={6} fill={c.apagado} />
                      <Etiqueta x={600} y={300} texto="credibilidad" op={e1(t, M('angular') + 1.1)} c={c} id={ID} marca />
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
