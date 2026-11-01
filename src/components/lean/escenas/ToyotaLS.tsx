import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, Engranaje, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, AZUL_O, VERDE, VIOLETA, Mar, Barco, Edificio } from './comunLS';
import { Toma, Letrero, Apoyo, Portatil, Hoja, Corazon, Flujo, sm, cl } from './kitLS';
import { FabricaToyota, LogoToyota } from './FabricaLS';
import type { PropsCE } from './comunLS';

/**
 * «De Toyota a las empresas emergentes», escena propia en cuatro tomas.
 * 1 · La fábrica de Toyota (FabricaLS): logo, línea de montaje, muda, andon y el auge del consumo.
 * 2 · El Pacífico: un barco lleva el método de Japón a Estados Unidos; Womack y Jones escriben Lean Thinking
 *     (1996) y desde el libro el método se propaga a las industrias, primero la automovilística.
 * 3 · Hoy: la gestión lean barre el despilfarro de una oficina y el lean software el de un programa.
 * 4 · Ries lleva la filosofía a la innovación: el engranaje entra en la ampolleta, el blog de 2008, la pregunta
 *     de meses de trabajo sin clientes y la respuesta, acercarse a los usuarios; Steve Blank, inversor de IMVU,
 *     y el camino de desarrollo de la clientela que se vuelve la base del movimiento.
 */

const ID = 'ls2';
const nombres = ['y1972', 'signif', 'disminuir', 'muda', 'siete', 'auge', 'producir', 'pacifico', 'womack', 'thinking', 'propaga', 'auto', 'gestion', 'software', 'aplicar', 'y2008', 'blog', 'comoase',
  'meses', 'acercarse', 'blank', 'inversor', 'deseos', 'clientela', 'base', 'pregunta'] as const;
type N = typeof nombres[number];

export const ToyotaLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('base') + 1.2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);
  const tierra = isDark ? '#3f6212' : '#bbf7d0', tierraO = isDark ? '#365314' : '#86efac';

  const rotulos: [number, string][] = [
    [0.2, 'Toyota, 1972'], [M('signif'), 'Lean: magro'], [M('disminuir'), 'Menos pérdidas'], [M('muda'), 'Muda: despilfarro'], [M('siete'), 'Siete fuentes de despilfarro'], [M('auge'), 'Auge del consumo'],
    [M('pacifico'), 'Cruza el Pacífico'], [M('womack'), 'Womack y Jones'], [M('thinking'), 'Lean Thinking, 1996'], [M('propaga'), 'Se propaga'], [M('auto'), 'Primero, los autos'],
    [M('gestion'), 'Gestión lean'], [M('software'), 'Lean software'], [M('aplicar'), 'A la innovación'], [M('y2008'), 'Un blog, 2008'], [M('comoase'), 'La pregunta de Ries'], [M('meses'), 'Meses sin clientes'], [M('acercarse'), 'Acercarse a los usuarios'],
    [M('blank'), 'Steve Blank'], [M('inversor'), 'Inversor de IMVU'], [M('deseos'), 'Lo que desea el cliente'], [M('clientela'), 'Desarrollo de la clientela'], [M('base'), 'La base del movimiento'],
  ];

  /* Toma 2: el barco y la propagación */
  const nav = sm(t, M('pacifico') + 0.3, M('womack') - 0.2);
  const industrias: [number, number, string][] = [[1010, 450, '#ef4444'], [1110, 400, '#f59e0b'], [1090, 590, VIOLETA], [990, 640, '#0ea5e9']];
  /* Toma 4: Ries se acerca a los usuarios */
  const acerca = sm(t, M('acercarse'), M('acercarse') + 2.5);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="De la fábrica de Toyota a las empresas emergentes">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · la fábrica de Toyota */}
            <Toma t={t} a={-1} b={M('pacifico')} zi={1} zo={0.9}>
              <FabricaToyota t={t} isDark={isDark} M={M as never} id={ID} />
            </Toma>

            {/* TOMA 2 · el método cruza el Pacífico y se propaga */}
            <Toma t={t} a={M('pacifico')} b={M('gestion')} zi={1.15}>
              <Mar x={40} y={330} w={1120} h={420} t={t} color={isDark ? '#1d4ed8' : '#93c5fd'} oscuro={isDark ? '#1e3a8a' : '#60a5fa'} amp={6} />
              {/* Japón a la izquierda */}
              <g>
                <path d="M 60 420 Q 130 380 170 440 Q 210 520 160 600 Q 120 660 60 640 Z" fill={tierra} />
                <path d="M 150 300 Q 220 290 230 340 Q 220 380 170 370 Z" fill={tierraO} />
                <circle cx={110} cy={500} r={22} fill="#fff" /><circle cx={110} cy={500} r={14} fill="#dc2626" />
                <Letrero x={130} y={790} texto="Japón" id={ID} fondo={c.panel} color={c.texto} op={e1(t, M('pacifico') + 0.2)} />
              </g>
              {/* Estados Unidos a la derecha */}
              <path d="M 1160 300 L 820 330 Q 760 420 790 520 Q 820 620 760 700 L 1160 720 Z" fill={tierra} />
              <Letrero x={980} y={790} texto="Estados Unidos" id={ID} fondo={c.panel} color={c.texto} op={e1(t, M('pacifico') + 0.4)} />
              {/* ruta y barco con el método */}
              <path d="M 200 540 Q 480 420 760 540" stroke="#fff" strokeWidth={5} strokeDasharray="12 14" fill="none" opacity={0.7} />
              {(() => { const x = lerp(210, 740, nav), y = 540 - 4 * 120 * nav * (1 - nav) + 5 * Math.sin(t * 2); return (
                <g>
                  <Barco x={x} y={y} s={1} casco="#7c2d12" vela="#ffffff" rot={Math.sin(t * 1.6) * 3} />
                  <g transform={`translate(${x - 20} ${y - 18})`}><rect x={-26} y={-26} width={52} height={30} rx={5} fill="#b7791f" /><circle cx={0} cy={-11} r={10} fill="#fff" /><LogoToyota x={0} y={-11} s={0.08} id={`${ID}-b`} /></g>
                </g>
              ); })()}
              {/* Womack y Jones con Lean Thinking */}
              {t >= M('womack') && (
                <g opacity={e1(t, M('womack'))}>
                  <Persona id={ID} x={835} y={600} s={0.5} cuerpo={AZUL_O} corbata />
                  <Persona id={ID} x={905} y={610} s={0.5} cuerpo="#0f766e" />
                  {t >= M('thinking') && (() => { const q = e1(t, M('thinking')); return (
                    <g transform={`translate(870 ${410 - 6 * Math.sin(t * 2)}) scale(${q})`}>
                      <rect x={-56} y={-72} width={112} height={144} rx={8} fill={`url(#${ID}-marca)`} style={sombra(0.3, 4, 10)} /><rect x={-56} y={-72} width={14} height={144} rx={6} fill="#000" opacity={0.18} />
                      <Txt x={6} y={-22} textAnchor="middle" fontSize={22} fill="#fff">LEAN</Txt><Txt x={6} y={6} textAnchor="middle" fontSize={20} fill="#fff">THINKING</Txt><Txt x={6} y={52} textAnchor="middle" fontSize={20} fill="#fff" opacity={0.9}>1996</Txt>
                    </g>
                  ); })()}
                </g>
              )}
              {/* se propaga por las industrias */}
              {t >= M('propaga') && industrias.map(([x, y, col], k) => {
                const e = e1(t, M('propaga') + 0.3 + k * 0.5);
                return (
                  <g key={k} opacity={e}>
                    <path d={`M 930 380 Q ${(930 + x) / 2} ${Math.min(y, 380) - 60} ${x} ${y - 70}`} stroke={col} strokeWidth={4} strokeDasharray="6 8" fill="none" strokeDashoffset={-t * 30} />
                    <g transform={`translate(${x} ${y}) scale(${0.55 * e})`}><rect x={-60} y={-80} width={120} height={80} rx={6} fill={col} /><path d="M -60 -80 L -30 -110 L -30 -80 L 0 -110 L 0 -80 L 30 -110 L 30 -80 Z" fill={col} opacity={0.8} /><rect x={36} y={-140} width={16} height={60} fill={col} />{[0, 1, 2].map((q) => <rect key={q} x={-44 + q * 34} y={-56} width={22} height={22} rx={3} fill="#fde68a" />)}</g>
                  </g>
                );
              })}
              {t >= M('auto') && (() => { const ph = ((t - M('auto')) * 0.35) % 1; return <g opacity={e1(t, M('auto'))} transform={`translate(${lerp(800, 1140, ph)} 705)`}><path d="M -40 0 V -16 Q -40 -22 -32 -24 L -18 -26 L -8 -40 H 18 L 28 -26 L 36 -24 Q 42 -22 42 -14 V 0 Z" fill="#eb0a1e" /><circle cx={-22} cy={2} r={8} fill="#1f2937" /><circle cx={24} cy={2} r={8} fill="#1f2937" /></g>; })()}
            </Toma>

            {/* TOMA 3 · hoy: gestión lean y lean software */}
            <Toma t={t} a={M('gestion')} b={M('aplicar')}>
              {/* gestión lean: oficina que se ordena */}
              <g opacity={e1(t, M('gestion'))}>
                <rect x={90} y={200} width={480} height={520} rx={26} fill={c.panel} style={sombra(c.sombra, 8, 20)} />
                <Letrero x={330} y={250} texto="Gestión lean" id={ID} />
                {(() => { const limpia = sm(t, M('gestion') + 0.8, M('gestion') + 3); return (
                  <g>
                    <rect x={150} y={540} width={360} height={18} rx={6} fill="#a16207" /><rect x={170} y={558} width={14} height={110} fill="#a16207" /><rect x={476} y={558} width={14} height={110} fill="#a16207" />
                    <Persona id={ID} x={330} y={650} s={0.5} cuerpo={VIOLETA} />
                    {Array.from({ length: 6 }, (_, k) => { const vuela = sm(t, M('gestion') + 0.8 + k * 0.35, M('gestion') + 1.6 + k * 0.35); return <g key={k} opacity={1 - vuela}><Hoja x={lerp(190 + (k % 3) * 60, 520, vuela)} y={lerp(520 - Math.floor(k / 3) * 26, 640, vuela) - 80 * Math.sin(Math.PI * vuela)} w={56} h={40} rot={(k - 3) * 9 + vuela * 90} lineas={2} /></g>; })}
                    <g transform="translate(520 660)"><path d="M -30 -40 H 30 L 24 30 H -24 Z" fill="#64748b" /><rect x={-34} y={-48} width={68} height={12} rx={5} fill="#94a3b8" /></g>
                    <g opacity={limpia}><rect x={300} y={500} width={60} height={40} rx={6} fill="#bfdbfe" /><path d="M 310 520 l 10 10 l 22 -20" stroke={VERDE} strokeWidth={5} fill="none" strokeLinecap="round" /></g>
                    <g opacity={0.9}><rect x={150} y={330} width={360} height={130} rx={14} fill={c.panel2} />{[0, 1, 2, 3].map((q) => <rect key={q} x={180 + q * 80} y={440 - [80, 60, 40, 24][q] * (0.3 + 0.7 * limpia)} width={50} height={[80, 60, 40, 24][q] * (0.3 + 0.7 * limpia)} rx={6} fill={q === 3 ? VERDE : AZUL_M} opacity={q === 3 ? 1 : 0.7} />)}</g>
                  </g>
                ); })()}
              </g>
              {/* lean software: código sin errores */}
              {t >= M('software') && (
                <g opacity={e1(t, M('software'))}>
                  <rect x={630} y={200} width={480} height={520} rx={26} fill={c.panel} style={sombra(c.sombra, 8, 20)} />
                  <Letrero x={870} y={250} texto="Lean software" id={ID} />
                  <Portatil x={870} y={560} s={1.5}>
                    {Array.from({ length: 7 }, (_, q) => <rect key={q} x={14 + (q % 3) * 14} y={12 + q * 15} width={[110, 80, 140, 60, 120, 90, 70][q]} height={7} rx={3} fill={['#fde047', '#86efac', '#93c5fd', '#fda4af', '#c4b5fd', '#86efac', '#fde047'][q]} />)}
                    {[0, 1, 2].map((q) => { const sale = sm(t, M('software') + 0.8 + q * 0.6, M('software') + 1.5 + q * 0.6); return <g key={q} transform={`translate(${150 - q * 40 + 120 * sale} ${30 + q * 30 - 60 * sale})`} opacity={1 - sale}><ellipse rx={9} ry={6} fill="#ef4444" />{[-1, 1].map((sx) => <line key={sx} x1={sx * 6} y1={0} x2={sx * 13} y2={-5} stroke="#ef4444" strokeWidth={2} />)}</g>; })}
                  </Portatil>
                  {Array.from({ length: 3 }, (_, q) => { const ok = sm(t, M('software') + 1.5 + q * 0.6, M('software') + 1.9 + q * 0.6); return <g key={q} opacity={ok} transform={`translate(${720 + q * 75} 650)`}><circle r={18} fill={VERDE} /><path d="M -8 0 l 6 6 l 11 -12" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>; })}
                </g>
              )}
            </Toma>

            {/* TOMA 4 · Ries, la innovación y Steve Blank */}
            <Toma t={t} a={M('aplicar')} b={M('blank')}>
              {/* el engranaje de la fábrica entra en la ampolleta de la innovación */}
              {(() => { const u = sm(t, M('aplicar') + 0.4, M('aplicar') + 2); const fuera = 1 - ac(t, M('comoase') - 0.4, M('comoase')); return (
                <g opacity={fuera}>
                  <Engranaje x={lerp(260, 600, u)} y={lerp(380, 330, u)} r={lerp(46, 22, u)} t={t * 2} hueco={c.panel} color="#64748b" op={1 - ac(t, M('aplicar') + 1.8, M('aplicar') + 2.1)} />
                  <Bombilla x={600} y={350} s={1.4} t={t} luz={sm(t, M('aplicar') + 1.8, M('aplicar') + 2.4)} id={ID} />
                  {u > 0.95 && <g transform={`translate(600 312)`}><Engranaje x={-14} y={0} r={14} t={t * 3} hueco="#fde047" color="#92400e" /><Engranaje x={14} y={10} r={10} t={-t * 4} hueco="#fde047" color="#b45309" /></g>}
                  <Letrero x={600} y={510} texto="Innovación" id={ID} op={sm(t, M('aplicar') + 2, M('aplicar') + 2.6)} />
                </g>
              ); })()}
              {/* el blog de 2008 */}
              {t >= M('y2008') && (
                <g opacity={e1(t, M('y2008')) * (1 - ac(t, M('comoase') - 0.4, M('comoase')))} transform="translate(0 0)">
                  <Persona id={ID} x={190} y={700} s={0.62} cuerpo={isDark ? '#8da2c0' : '#334155'} corbata />
                  <Portatil x={330} y={700} s={0.9}>
                    <rect x={0} y={0} width={200} height={26} fill={NARANJA} />
                    {t >= M('blog') && <Txt f="a" x={8} y={18} fontSize={13} fill="#fff">{'Startup Lessons Learned'.slice(0, Math.floor(23 * ac(t, M('blog'), M('blog') + 1.5)))}</Txt>}
                    {[0, 1, 2, 3].map((q) => <rect key={q} x={12} y={40 + q * 20} width={(140 - q * 22) * ac(t, M('blog') + 0.5 + q * 0.4, M('blog') + 1.2 + q * 0.4)} height={8} rx={4} fill="#cbd5e1" />)}
                  </Portatil>
                  <Letrero x={330} y={530} texto="2008" id={ID} op={e1(t, M('y2008') + 0.2)} />
                </g>
              )}
              <rect x={60} y={704} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} opacity={e1(t, M('y2008'))} />
              {/* la pregunta: meses de trabajo, ¿habrá clientes? */}
              {t >= M('comoase') && (
                <g opacity={e1(t, M('comoase'))}>
                  {(() => { const rx = lerp(260, 640, acerca); return (
                    <g>
                      <Persona id={ID} x={rx} y={700} s={0.62} cuerpo={isDark ? '#8da2c0' : '#334155'} corbata />
                      <g transform={`translate(${rx + 60} 630)`}><rect x={-26} y={-30} width={52} height={44} rx={8} fill="#f59e0b" /><path d="M -26 -30 L 0 -46 L 26 -30 Z" fill="#fde68a" /></g>
                    </g>
                  ); })()}
                  <g opacity={1 - acerca}>
                    <g transform="translate(360 360)"><circle r={110} fill={c.panel} style={sombra(c.sombra, 6, 14)} /><circle cx={-60} cy={110} r={16} fill={c.panel} /><circle cx={-80} cy={150} r={9} fill={c.panel} />
                      <Txt x={0} y={30} textAnchor="middle" fontSize={96} fill={ROSA}>?</Txt></g>
                    {t >= M('meses') && Array.from({ length: 6 }, (_, k) => { const ph = ((t - M('meses')) * 0.8 + k / 6) % 1; return <g key={k} transform={`translate(${520 + 40 * k + 60 * ph} ${260 - 60 * ph}) rotate(${ph * 200})`} opacity={(1 - ph) * e1(t, M('meses'))}><rect x={-22} y={-26} width={44} height={52} rx={5} fill="#fff" style={{ filter: 'drop-shadow(0 0 2px rgba(30,41,59,0.45))' }} /><rect x={-22} y={-26} width={44} height={12} rx={4} fill={ROSA} /></g>; })}
                  </g>
                  {/* los futuros usuarios, a los que se acerca */}
                  {[0, 1, 2, 3].map((k) => <Persona key={k} id={ID} x={850 + k * 80} y={700 - (k % 2) * 24} s={0.5} cuerpo={['#ec4899', '#f59e0b', AZUL_M, VERDE][k]} />)}
                  {acerca > 0.5 && [0, 1].map((k) => <Corazon key={k} x={880 + k * 120} y={500 + 8 * Math.sin(t * 3 + k)} s={0.6} op={sm(acerca, 0.5, 1)} />)}
                </g>
              )}
            </Toma>

            <Toma t={t} a={M('blank')} b={fin + 5}>
              {/* Silicon Valley al fondo */}
              <g opacity={0.35}>{[[160, 200], [250, 280], [340, 230], [700, 260], [790, 320], [880, 240], [980, 290], [1060, 210]].map(([x, h], k) => <rect key={k} x={x - 36} y={644 - h} width={72} height={h} rx={8} fill={isDark ? '#3b82f6' : '#93c5fd'} />)}</g>
              <rect x={60} y={644} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              {/* Ries y Steve Blank */}
              <Persona id={ID} x={240} y={640} s={0.7} cuerpo={isDark ? '#8da2c0' : '#334155'} corbata />
              <g opacity={e1(t, M('blank'))}>
                <Persona id={ID} x={420} y={640} s={0.7} cuerpo="#0f766e" />
                <rect x={396} y={518} width={48} height={12} rx={6} fill="#1f2937" opacity={0.85} />
                <Letrero x={420} y={455} texto="Steve Blank" fondo="#0f766e" id={ID} />
                <g transform={`translate(330 ${560 + 3 * Math.sin(t * 6)})`}><circle r={14} fill="#f7c4a0" /><circle cx={10} r={12} fill="#f7c4a0" /></g>
              </g>
              {/* inversor de IMVU */}
              {t >= M('inversor') && (
                <g opacity={e1(t, M('inversor')) * (1 - ac(t, M('clientela') - 0.3, M('clientela') + 0.3))}>
                  <Portatil x={330} y={800} s={0.7}><rect x={0} y={0} width={200} height={124} fill="#1e1b4b" /><Txt x={100} y={72} textAnchor="middle" fontSize={36} fill="#fff">IMVU</Txt></Portatil>
                  <Flujo x1={430} y1={520} x2={380} y2={700} t={t} n={4} color="#f59e0b" r={10} arco={-40} />
                </g>
              )}
              {/* los deseos de los clientes potenciales */}
              {t >= M('deseos') && [0, 1, 2].map((k) => (
                <g key={k} opacity={e1(t, M('deseos') + k * 0.3)}>
                  <Persona id={ID} x={820 + k * 110} y={640 - (k % 2) * 20} s={0.5} cuerpo={['#ec4899', '#f59e0b', AZUL_M][k]} />
                  <g transform={`translate(${820 + k * 110} ${470 - (k % 2) * 20 + 5 * Math.sin(t * 2 + k)})`}><circle r={34} fill={c.panel} style={sombra(0.2, 2, 6)} />
                    {k === 0 && <Corazon x={0} y={2} s={0.55} />}
                    {k === 1 && <path d="M 0 -20 L 6 -6 L 21 -6 L 9 3 L 13 18 L 0 9 L -13 18 L -9 3 L -21 -6 L -6 -6 Z" fill="#fbbf24" />}
                    {k === 2 && <g><rect x={-16} y={-14} width={32} height={26} rx={5} fill="#f59e0b" /><path d="M -16 -14 L 0 -24 L 16 -14 Z" fill="#fde68a" /></g>}
                  </g>
                </g>
              ))}
              {/* desarrollo de la clientela: un camino hacia los clientes que se vuelve la base */}
              {t >= M('clientela') && (() => { const u = ac(t, M('clientela'), M('clientela') + 1.6); return (
                <g>
                  {Array.from({ length: 7 }, (_, k) => k / 7 < u && <g key={k} transform={`translate(${490 + k * 46} ${650 - (k % 2) * 14}) rotate(80)`}><ellipse rx={10} ry={6} fill={NARANJA} opacity={0.8} /></g>)}
                  <Letrero x={620} y={720} texto="Desarrollo de la clientela" id={ID} op={sm(t, M('clientela') + 0.8, M('clientela') + 1.3)} />
                </g>
              ); })()}
              {t >= M('base') && (() => { const q = e1(t, M('base')); return (
                <g opacity={q} transform={`translate(600 ${800 + 30 * (1 - q)})`}>
                  <rect x={-500} y={-28} width={1000} height={56} rx={14} fill={`url(#${ID}-marca)`} style={sombra(0.25, 4, 10)} />
                  <Txt x={0} y={12} textAnchor="middle" fontSize={32} fill="#fff">LEAN STARTUP</Txt>
                </g>
              ); })()}
            </Toma>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
