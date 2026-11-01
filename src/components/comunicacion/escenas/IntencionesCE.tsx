import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Brazos, Burbuja, Espalda, Estrella, Etiqueta, Gesto, PanelPregunta, Rotulo, ESCUDO, MIN_TXT, W, H, borde, e1, lerp, marcador, ventana } from './comunCE';
import type { PropsCE, Tono } from './comunCE';

/**
 * «Cuatro intenciones», escena propia. A la derecha, cuatro lámparas (abrirte, conectar, apasionarte,
 * escuchar) que se encienden cuando se nombran; abajo a la izquierda el orador, cuyo cuerpo se abre
 * más con cada lámpara encendida. En el centro, la viñeta de la intención en curso: los cercanos con
 * quienes se está relajado y el escudo de quien parece cerrado; el niño que no hace caso y se da vuelta,
 * y Carol que adelanta el contacto; la charla aburrida que cambia con la madre bailarina de 92 años;
 * el público que manda señales y la urgencia que solo sentía Carol. Al final, las cuatro encendidas.
 */

const ID = 'ce1n';
const nombres = ['intenciones', 'abrirte', 'pareja', 'defensiva', 'conectar', 'caso', 'final', 'reconociendo', 'apasionarte', 'juego', 'aburrido', 'bailarina', 'noventa', 'memorable', 'escuchar', 'gestos', 'urgencia', 'solo', 'pregunta'] as const;
type N = typeof nombres[number];

const LAMPARAS: { n: N; txt: string }[] = [
  { n: 'abrirte', txt: 'abrirte' }, { n: 'conectar', txt: 'conectar' }, { n: 'apasionarte', txt: 'apasionarte' }, { n: 'escuchar', txt: 'escuchar' },
];

/* Bailarina: figura con falda que gira. */
const Bailarina: React.FC<{ x: number; y: number; t: number; id: string }> = ({ x, y, t, id }) => {
  const g = Math.sin(t * 2.4);
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={4} rx={60} ry={10} fill="#000" opacity={0.12} />
      <path d={`M ${-70 - 12 * g} -40 Q 0 ${-70 + 8 * g} ${70 + 12 * g} -40 L 18 -110 L -18 -110 Z`} fill={`url(#${id}-marca)`} />
      <rect x={-6} y={-40} width={6} height={40} rx={3} fill="#e2a37c" /><rect x={6} y={-40} width={6} height={40} rx={3} fill="#e2a37c" />
      <rect x={-16} y={-160} width={32} height={56} rx={14} fill={ROSA} />
      <path d={`M -14 -150 Q -60 ${-200 - 10 * g} -40 -230`} stroke="#e2a37c" strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d={`M 14 -150 Q 60 ${-200 + 10 * g} 40 -230`} stroke="#e2a37c" strokeWidth={9} fill="none" strokeLinecap="round" />
      <circle cx={0} cy={-182} r={22} fill={`url(#${id}-cara)`} />
      <path d="M -20 -186 Q -18 -210 0 -208 Q 18 -210 20 -186 Q 10 -198 0 -196 Q -10 -198 -20 -186 Z" fill="#d1d5db" />
      <circle cx={0} cy={-212} r={10} fill="#d1d5db" />
    </g>
  );
};

export const IntencionesCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('solo') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Ensaya intenciones'], [M('abrirte'), 'Abrirte'], [M('defensiva'), 'Cerrado = a la defensiva'], [M('conectar'), 'Conectar'],
    [M('final'), 'Carol adelanta el contacto'], [M('apasionarte'), 'Apasionarte'], [M('bailarina'), 'Su madre bailarina'],
    [M('memorable'), 'Se volvió memorable'], [M('escuchar'), 'Escuchar'], [M('urgencia'), 'La urgencia era solo de Carol'],
    [M('solo'), 'El cuerpo llega solo'],
  ];

  const encendida = (n: N) => ac(t, M(n), M(n) + 0.5);
  const nivel = LAMPARAS.reduce((a, l) => a + encendida(l.n), 0) / 4;
  const vineta = (a: N, b: N | null) => ventana(t, M(a), b ? M(b) : 1e6);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cuatro intenciones que se ensayan, abrirte, conectar, apasionarte y escuchar, y un cuerpo que se abre solo cuando se sienten">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* Lámparas de las cuatro intenciones */}
            {LAMPARAS.map((l, k) => {
              const op = e1(t, M('intenciones') + k * 0.25);
              if (op < 0.01) return null;
              const on = encendida(l.n);
              const y = 220 + k * 135;
              return (
                <g key={l.n} opacity={op}>
                  {on > 0.05 && <circle cx={790} cy={y} r={56 + 4 * Math.sin(t * 3 + k)} fill={NARANJA} opacity={0.18 * on} />}
                  <circle cx={790} cy={y} r={40} fill={on > 0.5 ? `url(#${ID}-marca)` : c.apagado} style={sombra(c.sombra, 4, 8)} />
                  <path d={`M ${778} ${y + 14} H ${802} M ${780} ${y + 22} H ${800}`} stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.9} />
                  <path d={`M ${776} ${y + 6} Q ${770} ${y - 4} ${776} ${y - 16} Q ${790} ${y - 30} ${804} ${y - 16} Q ${810} ${y - 4} ${804} ${y + 6} Z`} fill="#fff" opacity={0.35 + 0.65 * on} />
                  <Txt f="a" x={845} y={y + 10} fontSize={MIN_TXT} fill={on > 0.5 ? c.texto : c.tenue}>{l.txt}</Txt>
                </g>
              );
            })}

            {/* El orador: se abre a medida que se encienden las lámparas */}
            <g opacity={e1(t, 0.3)}>
              <Brazos x={190} y={800} s={1} izq={12 + 70 * nivel + 8 * Math.sin(t * 2) * nivel} der={12 + 70 * nivel + 8 * Math.sin(t * 2 + 1) * nivel} id={ID} />
              <Persona id={ID} x={190} y={800} s={1} pelo="#7c2d12" />
              <Gesto x={190} y={800} s={1} animo={-0.2 + 1 * nivel} />
            </g>

            {/* Abrirte: los cercanos, y el escudo de quien parece cerrado */}
            {(() => {
              const op = vineta('abrirte', 'conectar');
              if (op < 0.01) return null;
              const escudo = ventana(t, M('defensiva'), M('conectar'));
              return (
                <g opacity={op}>
                  <rect x={330} y={180} width={380} height={300} rx={28} fill={c.panel} style={sombra(c.sombra)} />
                  {(['pareja', 'amigo', 'hijo'] as const).map((tx, k) => {
                    const o = e1(t, M('pareja') + k * 0.5);
                    return o > 0.01 ? (
                      <g key={tx} opacity={o}>
                        <Persona id={ID} x={410 + k * 110} y={400} s={k === 2 ? 0.42 : 0.55} cuerpo={['#94a3b8', '#64748b', '#f59e0b'][k]} />
                        <Gesto x={410 + k * 110} y={400} s={k === 2 ? 0.42 : 0.55} animo={0.8} />
                        <Txt f="a" x={410 + k * 110} y={450} textAnchor="middle" fontSize={MIN_TXT * 0.85} fill={c.texto}>{tx}</Txt>
                      </g>
                    ) : null;
                  })}
                  <g opacity={escudo} transform={`translate(330 640) scale(${1.6 * Math.min(1, e1(t, M('defensiva')))})`}>
                    <path d={ESCUDO} fill={c.tenue} />
                    <path d="M -14 0 L 14 0" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
                  </g>
                  <Etiqueta x={470} y={780} texto="a la defensiva" op={escudo} c={c} id={ID} />
                </g>
              );
            })()}

            {/* Conectar: el niño que no hace caso; Carol adelanta el contacto */}
            {(() => {
              const op = vineta('conectar', 'apasionarte');
              if (op < 0.01) return null;
              const gira = ac(t, M('caso') + 1.2, M('caso') + 1.8);
              const nino = ventana(t, M('conectar'), M('final'));
              const carol = ac(t, M('final'), M('final') + 0.4);
              const pos = lerp(0.95, 0.08, ac(t, M('reconociendo') - 0.4, M('reconociendo') + 0.6));
              return (
                <g opacity={op}>
                  {nino > 0.01 && (
                    <g opacity={nino}>
                      {gira < 0.5
                        ? <Espalda x={560} y={560} s={0.9} c={c} cuerpo="#f59e0b" />
                        : <g><Persona id={ID} x={560} y={600} s={0.5} cuerpo="#f59e0b" /><Gesto x={560} y={600} s={0.5} animo={0.8} /></g>}
                      {[0, 1, 2].map((k) => {
                        const u = ((t - M('caso')) * 0.7 + k / 3) % 1;
                        return t > M('caso') ? <circle key={k} cx={lerp(260, 520, u)} cy={lerp(640, 560, u)} r={9} fill={NARANJA} opacity={Math.sin(Math.PI * u)} /> : null;
                      })}
                    </g>
                  )}
                  {carol > 0.01 && (
                    <g opacity={carol}>
                      <rect x={330} y={230} width={380} height={56} rx={28} fill={c.apagado} />
                      <rect x={330} y={230} width={380 * (1 - pos) + 56} height={56} rx={28} fill={c.panel2} />
                      <circle cx={330 + 28 + (380 - 56) * pos} cy={258} r={34} fill={`url(#${ID}-marca)`} style={sombra(c.sombra, 3, 6)} />
                      <Txt f="a" x={520} y={340} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>contacto</Txt>
                      {[0, 1].map((k) => (
                        <g key={k} opacity={e1(t, M('reconociendo') + 0.6 + k * 0.4)}>
                          <Espalda x={450 + k * 150} y={520} s={0.9} c={c} cuerpo={k ? '#64748b' : '#94a3b8'} />
                          <Estrella x={450 + k * 150} y={430} r={22} fill={NARANJA} rot={Math.sin(t * 3 + k) * 12} />
                        </g>
                      ))}
                    </g>
                  )}
                </g>
              );
            })()}

            {/* Apasionarte: qué está en juego; la charla aburrida y la madre bailarina */}
            {(() => {
              const op = vineta('apasionarte', 'escuchar');
              if (op < 0.01) return null;
              const aburre = ventana(t, M('aburrido'), M('bailarina'));
              const baila = ac(t, M('bailarina'), M('bailarina') + 0.4);
              const memo = e1(t, M('memorable'));
              return (
                <g opacity={op}>
                  <g opacity={ventana(t, M('juego'), M('aburrido'))}>
                    <path transform={`translate(520 420) scale(${1 + 0.06 * Math.sin(t * 5)})`} d="M 0 -110 Q 60 -50 50 10 Q 44 70 0 80 Q -44 70 -50 10 Q -56 -40 -10 -70 Q -16 -30 10 -20 Q 18 -70 0 -110 Z" fill={`url(#${ID}-marca)`} />
                    <Etiqueta x={520} y={560} texto="¿qué está en juego?" op={1} c={c} id={ID} />
                  </g>
                  {aburre > 0.01 && (
                    <g opacity={aburre} transform="translate(520 400)">
                      <rect x={-110} y={-140} width={220} height={260} rx={18} fill={c.panel} style={sombra(c.sombra)} />
                      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-80} y={-100 + k * 40} width={160} height={14} rx={7} fill={c.apagado} />)}
                      <Txt x={110} y={-130} fontSize={44} fill={c.tenue} peso={800}>z z</Txt>
                    </g>
                  )}
                  {baila > 0.01 && (
                    <g opacity={baila}>
                      <Bailarina x={470} y={560} t={t} id={ID} />
                      <g opacity={e1(t, M('noventa'))}><Txt x={630} y={360} textAnchor="middle" fontSize={96} fill={NARANJA} peso={800}>92</Txt><Txt f="a" x={630} y={410} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>años</Txt></g>
                      {memo > 0.01 && [0, 1, 2, 3, 4].map((k) => <Estrella key={k} x={470 + Math.cos(k * 1.26 + t) * 120} y={420 + Math.sin(k * 1.26 + t) * 100} r={14} fill={NARANJA} op={memo * 0.9} />)}
                    </g>
                  )}
                </g>
              );
            })()}

            {/* Escuchar: señales del público; la urgencia que solo sentía Carol */}
            {(() => {
              const op = vineta('escuchar', 'solo');
              if (op < 0.01) return null;
              const urg = ac(t, M('urgencia'), M('urgencia') + 0.5);
              return (
                <g opacity={op}>
                  {[0, 1, 2].map((k) => (
                    <g key={k}>
                      <Persona id={ID} x={460 + k * 110} y={620} s={0.6} cuerpo={['#94a3b8', '#64748b', '#94a3b8'][k]} />
                      <Gesto x={460 + k * 110} y={620} s={0.6} animo={urg > 0.5 ? -0.1 : 0.2} />
                      {(() => {
                        const u = ((t - M('gestos')) * 0.6 + k / 3) % 1;
                        return t > M('gestos') ? <circle cx={lerp(460 + k * 110, 260, u)} cy={lerp(500, 600, u)} r={8} fill={ROSA} opacity={Math.sin(Math.PI * u)} /> : null;
                      })()}
                    </g>
                  ))}
                  <g opacity={urg}>
                    <Burbuja x={250} y={500} w={300} texto="¡Hay que vencer al competidor!" u={ac(t, M('urgencia'), M('urgencia') + 1.4)} c={c} id={ID} marca />
                  </g>
                </g>
              );
            })()}

            {/* Las cuatro encendidas: el cuerpo llega solo */}
            <g opacity={e1(t, M('solo') + 0.3)}>
              <circle cx={190} cy={600} r={150 + 8 * Math.sin(t * 3)} fill={NARANJA} opacity={0.1} />
              <Etiqueta x={470} y={420} texto="en el momento justo" op={1} c={c} id={ID} marca />
            </g>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
