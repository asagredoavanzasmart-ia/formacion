import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Brazos, Chip, Cruz, Etiqueta, Gesto, Hoja, Ondas, PanelPregunta, Rotulo, Visto, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Terreno común» (Conger, segundo paso), escena propia. Acto A: el tren que va hacia un barranco y
 * nadie sube; el niño que acompaña al supermercado por los dulces junto a la caja. Acto B: Monica Ruffo
 * entre la casa matriz (precios bajos) y los franquiciados (sus márgenes); el novato que solo defiende
 * a la casa matriz; los datos que muestran las ganancias de los franquiciados (Tennessee, papas y
 * bebidas, 80 %, +26 %, +100 % → +10 %), la carta del fundador y la votación unánime. Acto C: ajustar la
 * posición; el amigo que le cuenta al gerente que al presidente le importa la rentabilidad, el plan
 * rediseñado sin inversión y la aprobación.
 */

const ID = 'ce23';
const nombres = ['terreno', 'creible', 'tren', 'nino', 'dulces', 'engano', 'ruffo', 'comida', 'combos', 'matriz', 'franq', 'novato', 'ganancias', 'tennessee', 'papas', 'p80', 'p26', 'p100', 'p10', 'carta', 'unanimidad', 'ajusta', 'escucha', 'motores', 'rentabilidad', 'inversion', 'aprobaron', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Tren de tres carros. */
const Tren: React.FC<{ x: number; y: number; c: C; id: string }> = ({ x, y, c, id }) => (
  <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2].map((k) => (
      <g key={k} transform={`translate(${-k * 150} 0)`}>
        <rect x={-66} y={-90} width={132} height={80} rx={14} fill={k ? c.panel : `url(#${id}-marca)`} style={sombra(c.sombra, 3, 8)} />
        <rect x={-48} y={-74} width={36} height={28} rx={5} fill={c.panel2} /><rect x={8} y={-74} width={36} height={28} rx={5} fill={c.panel2} />
        <circle cx={-36} cy={-6} r={14} fill={c.texto} /><circle cx={36} cy={-6} r={14} fill={c.texto} />
      </g>
    ))}
  </g>
);

/* Frasco de dulces. */
const Dulces: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-46} y={-90} width={92} height={90} rx={18} fill="#bfdbfe" opacity={0.5} />
    <rect x={-40} y={-104} width={80} height={16} rx={6} fill={ROSA} />
    {Array.from({ length: 9 }, (_, k) => <circle key={k} cx={-26 + (k % 3) * 26} cy={-20 - Math.floor(k / 3) * 24} r={11} fill={['#f43f5e', '#f59e0b', '#22c55e', '#3b82f6'][k % 4]} transform={`translate(0 ${2 * Math.sin(t * 3 + k)})`} />)}
  </g>
);

/* Local de comida rápida (franquicia). */
const Local: React.FC<{ x: number; y: number; s?: number; c: C }> = ({ x, y, s = 1, c }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-110} width={140} height={110} rx={8} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
    <path d="M -80 -110 H 80 L 70 -140 H -70 Z" fill={NARANJA} />
    {[-60, -30, 0, 30].map((dx) => <rect key={dx} x={dx} y={-140} width={15} height={30} fill="#fff" opacity={0.6} />)}
    <rect x={-20} y={-60} width={40} height={60} fill="#a16207" />
  </g>
);

/* Papas fritas y bebida. */
const PapasBebida: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    {[-30, -15, 0, 15, 30].map((dx, k) => <rect key={dx} x={-80 + dx - 4} y={-100 - (k % 2) * 14} width={10} height={60} rx={3} fill="#facc15" />)}
    <path d="M -126 -50 L -34 -50 L -44 30 L -116 30 Z" fill="#dc2626" />
    <path d="M 30 -80 L 110 -80 L 100 30 L 40 30 Z" fill="#ef4444" />
    <rect x={24} y={-92} width={92} height={14} rx={6} fill="#fff" />
    <rect x={76} y={-140} width={8} height={56} fill="#fff" transform="rotate(12 80 -112)" />
  </g>
);

export const TerrenoComunCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('aprobaron') + 1 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Terreno común'], [M('tren'), 'Nadie sube a ese tren'], [M('nino'), 'Los dulces junto a la caja'], [M('ruffo'), 'Monica Ruffo'],
    [M('matriz'), 'Dos intereses'], [M('novato'), 'El error del novato'], [M('ganancias'), 'Las ganancias de ellos'], [M('carta'), 'La carta del fundador'],
    [M('unanimidad'), 'Por unanimidad'], [M('ajusta'), 'Ajusta tu posición'], [M('escucha'), 'Escucha antes'], [M('aprobaron'), 'Aprobado'],
  ];

  const aA1 = ventana(t, -1, M('nino'));
  const aA2 = ventana(t, M('nino'), M('ruffo'));
  const aB1 = ventana(t, M('ruffo'), M('ganancias'));
  const aB2 = ventana(t, M('ganancias'), M('ajusta'));
  const aC = ac(t, M('ajusta'), M('ajusta') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Terreno común: muestra el beneficio que gana la otra parte">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A1 · un tren que lleva a la ruina */}
            {aA1 > 0.01 && (
              <g opacity={aA1}>
                <Chip x={600} y={210} texto="muy creíble" c={c} id={ID} op={e1(t, M('creible'))} />
                {/* tu meta y lo que le importa al otro: el terreno común en el medio */}
                <g opacity={ventana(t, M('terreno') - 0.4, M('tren'))}>
                  {(() => {
                    const u = ac(t, M('terreno') - 0.4, M('terreno') + 1);
                    return (
                      <g>
                        <circle cx={470 + 50 * u} cy={460} r={150} fill={NARANJA} opacity={0.35} />
                        <circle cx={730 - 50 * u} cy={460} r={150} fill={ROSA} opacity={0.35} />
                        <Txt f="a" x={400} y={470} textAnchor="middle" fontSize={28} fill={c.texto}>tu meta</Txt>
                        <Txt f="a" x={800} y={470} textAnchor="middle" fontSize={28} fill={c.texto}>su interés</Txt>
                        <Etiqueta x={600} y={680} texto="terreno común" op={u} c={c} id={ID} marca />
                      </g>
                    );
                  })()}
                </g>
                <g opacity={e1(t, M('tren'))}>
                  <path d="M 60 560 H 900" stroke={c.tenue} strokeWidth={8} />
                  {Array.from({ length: 14 }, (_, k) => <rect key={k} x={70 + k * 60} y={556} width={14} height={20} fill={c.tenue} />)}
                  <path d="M 900 560 L 960 560 L 1000 800 H 1140 V 560" fill="none" stroke={c.apagado} strokeWidth={6} strokeDasharray="12 10" />
                  <Txt f="a" x={1010} y={520} textAnchor="middle" fontSize={28} fill="#c2263e">ruina</Txt>
                  <Tren x={420 + 60 * ac(t, M('tren'), M('nino'))} y={560} c={c} id={ID} />
                  {[300, 470].map((x) => (
                    <g key={x}>
                      <Persona id={ID} x={x} y={790} s={0.75} cuerpo="#64748b" />
                      <Gesto x={x} y={790} s={0.75} animo={-0.4} />
                    </g>
                  ))}
                  <g opacity={e1(t, M('tren') + 1)}><Cruz x={385} y={690} s={0.8} /></g>
                </g>
              </g>
            )}

            {/* A2 · el niño y los dulces junto a la caja */}
            {aA2 > 0.01 && (
              <g opacity={aA2}>
                {(() => {
                  const va = ac(t, M('dulces'), M('dulces') + 1.4);
                  return (
                    <g>
                      <Persona id={ID} x={260} y={760} cuerpo="#334155" />
                      <Gesto x={260} y={760} animo={0.4} />
                      <Persona id={ID} x={380 + 340 * va} y={760} s={0.6} cuerpo={NARANJA} pelo="#5b3a26" />
                      <Gesto x={380 + 340 * va} y={760} s={0.6} animo={0.2 + 0.8 * va} />
                      <Etiqueta x={380 + 340 * va} y={815} texto="niño" op={1} c={c} id={ID} />
                      {/* la caja del supermercado */}
                      <rect x={800} y={560} width={320} height={200} rx={14} fill={c.panel} style={sombra(c.sombra)} />
                      <rect x={800} y={560} width={320} height={26} rx={10} fill={c.apagado} />
                      <rect x={1010} y={470} width={90} height={70} rx={8} fill="#1f2937" />
                      <Etiqueta x={1055} y={630} texto="caja" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('dulces'))}><Dulces x={890} y={560} t={t} /></g>
                      <Chip x={600} y={300} texto="no es engaño" c={c} id={ID} op={e1(t, M('engano'))} />
                      <Chip x={600} y={390} texto="beneficio compartido" c={c} id={ID} op={e1(t, M('engano') + 1.4)} marca />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B1 · Monica Ruffo entre la casa matriz y los franquiciados */}
            {aB1 > 0.01 && (
              <g opacity={aB1}>
                {(() => {
                  const ruffoVa = ac(t, M('novato') + 3, M('novato') + 4.5);
                  return (
                    <g>
                      <Persona id={ID} x={600} y={760} pelo="#7c3f1d" cuerpo="#7c3aed" />
                      <Gesto x={600} y={760} animo={0.5} />
                      <Etiqueta x={600} y={815} texto="Monica Ruffo" op={1} c={c} id={ID} />
                      <Chip x={600} y={230} texto="combos baratos" c={c} id={ID} op={e1(t, M('combos'))} />
                      <g opacity={e1(t, M('matriz'))}>
                        <rect x={110} y={420} width={220} height={260} rx={12} fill={c.panel} style={sombra(c.sombra)} />
                        {Array.from({ length: 8 }, (_, k) => <rect key={k} x={140 + (k % 2) * 100} y={450 + Math.floor(k / 2) * 55} width={60} height={36} rx={5} fill={c.panel2} />)}
                        <Etiqueta x={220} y={730} texto="casa matriz" op={1} c={c} id={ID} />
                        <Chip x={220} y={350} texto="precio bajo" c={c} id={ID} op={1} />
                      </g>
                      <g opacity={e1(t, M('franq'))}>
                        <Local x={920} y={560} s={0.75} c={c} />
                        <Local x={1060} y={680} s={0.75} c={c} />
                        <Local x={900} y={700} s={0.75} c={c} />
                        <Etiqueta x={980} y={760} texto="franquiciados" op={1} c={c} id={ID} />
                        <Chip x={980} y={350} texto="¿márgenes?" c={c} id={ID} op={1} marca />
                      </g>
                      {/* el novato defiende solo a la casa matriz */}
                      <g opacity={ventana(t, M('novato'), M('novato') + 3)}>
                        <path d="M 540 560 Q 440 500 350 540" stroke={c.apagado} strokeWidth={8} fill="none" strokeLinecap="round" />
                        <Cruz x={440} y={500} s={0.8} />
                      </g>
                      <g opacity={ruffoVa}>
                        <path d="M 660 560 Q 760 480 840 520" stroke={`url(#${ID}-marcaH)`} strokeWidth={8} fill="none" strokeLinecap="round" />
                        <Visto x={760} y={480} s={0.8} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B2 · los datos de los franquiciados y la votación */}
            {aB2 > 0.01 && (
              <g opacity={aB2}>
                <Chip x={600} y={210} texto="sus ganancias" c={c} id={ID} op={1} marca />
                <Chip x={300} y={300} texto="Tennessee" c={c} id={ID} op={e1(t, M('tennessee'))} />
                <g opacity={e1(t, M('papas'))}><PapasBebida x={300} y={480} /></g>
                <Etiqueta x={300} y={600} texto="80 % de locales" op={e1(t, M('p80'))} c={c} id={ID} />
                <Txt x={300} y={690} textAnchor="middle" fontSize={64} fill={`url(#${ID}-marcaH)`} opacity={e1(t, M('p26'))}>+26 %</Txt>
                <Chip x={600} y={380} texto="valor +100 %" c={c} id={ID} op={e1(t, M('p100'))} />
                <g opacity={e1(t, M('p10'))}>
                  <path d="M 600 420 V 470" stroke={c.tenue} strokeWidth={6} />
                  <path d="M 586 458 L 600 474 L 614 458" stroke={c.tenue} strokeWidth={6} fill="none" />
                </g>
                <Chip x={600} y={520} texto="ventas +10 %" c={c} id={ID} op={e1(t, M('p10'))} marca />
                <g opacity={e1(t, M('carta'))}>
                  <Hoja x={950} y={420} w={220} h={260} c={c} cabeza={ROSA} titulo="fundador" llena={ac(t, M('carta'), M('carta') + 1.4)} tituloTam={24} />
                </g>
                <g opacity={e1(t, M('unanimidad'))}>
                  <Visto x={1040} y={330} s={1} />
                  <Chip x={950} y={640} texto="unanimidad" c={c} id={ID} op={1} marca />
                </g>
              </g>
            )}

            {/* C · ajustar y escuchar antes de presentar */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const oye = ventana(t, M('escucha') + 0.5, M('rentabilidad') + 1.5);
                  const aprob = e1(t, M('aprobaron'));
                  return (
                    <g>
                      <Chip x={600} y={210} texto="ajusta tu posición" c={c} id={ID} op={ventana(t, M('ajusta'), M('escucha') + 0.5)} />
                      <Persona id={ID} x={200} y={760} cuerpo="#334155" corbata />
                      <Gesto x={200} y={760} animo={0.3 + 0.6 * aprob} />
                      <Etiqueta x={200} y={815} texto="gerente" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('escucha') + 0.3)}>
                        <Persona id={ID} x={460} y={760} s={0.85} cuerpo="#0f766e" pelo="#3b2a20" />
                        <Gesto x={460} y={760} s={0.85} animo={0.5} />
                        <Etiqueta x={460} y={815} texto="amigo" op={1} c={c} id={ID} />
                        <Ondas x1={410} y1={630} x2={250} y2={620} t={t} color={NARANJA} op={oye} n={3} />
                      </g>
                      <g opacity={e1(t, M('motores'))}>
                        {/* el motor del fabricante */}
                        <g transform="translate(980 300)">
                          <rect x={-90} y={-50} width={180} height={100} rx={14} fill={c.apagado} />
                          {[-60, -20, 20, 60].map((dx) => <rect key={dx} x={dx - 12} y={-80} width={24} height={34} rx={5} fill={c.tenue} />)}
                          <circle cx={0} cy={0} r={26} fill={c.panel2} />
                          <g transform={`rotate(${t * 90})`}><rect x={-4} y={-22} width={8} height={44} fill={c.tenue} /></g>
                        </g>
                        <Persona id={ID} x={980} y={760} cuerpo="#1f2937" corbata />
                        <Gesto x={980} y={760} animo={0.1 + 0.7 * aprob} />
                        <Etiqueta x={980} y={815} texto="presidente" op={1} c={c} id={ID} />
                      </g>
                      <Chip x={720} y={440} texto="rentabilidad" c={c} id={ID} op={e1(t, M('rentabilidad'))} marca />
                      <g opacity={e1(t, M('rentabilidad') + 0.8)}>
                        <Txt f="a" x={720} y={530} textAnchor="middle" fontSize={28} fill={c.tenue}>rapidez</Txt>
                        <line x1={650} y1={520} x2={790} y2={520} stroke="#c2263e" strokeWidth={5} />
                      </g>
                      <g opacity={e1(t, M('inversion'))}>
                        <Hoja x={420} y={380} w={220} h={220} c={c} cabeza={NARANJA} titulo="plan" llena={1} tituloTam={24} />
                      </g>
                      <g opacity={aprob}><Visto x={510} y={300} s={1} /></g>
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
