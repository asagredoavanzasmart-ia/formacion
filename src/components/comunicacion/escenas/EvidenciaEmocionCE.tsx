import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Espalda, Etiqueta, Gesto, Hoja, PanelPregunta, Rotulo, Visto, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Evidencia vívida y emoción» (Conger, pasos 3 y 4), escena propia. Acto A: cifras grises que se
 * desvanecen frente a historias, metáforas y analogías. Acto B: la analogía de Microsoft: el
 * supermercado de pasillos con rótulos crípticos donde nadie encuentra la sal, frente al restaurante
 * donde te traen el menú; un personaje animado que ayuda, el visto de Bill Gates y medio millón de
 * copias. Acto C: el presidente aeronáutico que, tras el mejor año, proyecta un piloto feliz volando
 * hacia un muro y recibe resentimiento; debió agradecer primero. Acto D: Robert Marcell y las fotos de
 * su pueblo minero, «no pudimos competir», el sol de la esperanza y el Neon; persuadir es un ciclo.
 */

const ID = 'ce24';
const nombres = ['evidencia', 'abstractos', 'historias', 'fries', 'personajes', 'alSuper', 'rotulos', 'sal', 'eseSuper', 'restaurante', 'menu', 'gates', 'medioMillon', 'conectar', 'tono', 'aeronautica', 'mejorAno', 'muro', 'resentimiento', 'agradecer', 'marcell', 'pueblo', 'competir', 'esperanza', 'neon', 'ofrecer', 'proceso', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Estante de supermercado con cajas de colores y rótulos crípticos. */
const Estante: React.FC<{ x: number; y: number; c: C; cripticos: number }> = ({ x, y, c, cripticos }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-110} y={-260} width={220} height={260} rx={8} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
    {[0, 1, 2].map((f) => (
      <g key={f}>
        <rect x={-110} y={-80 - f * 85} width={220} height={8} fill={c.apagado} />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={-96 + k * 50} y={-130 - f * 85} width={38} height={50} rx={4} fill={['#3b82f6', NARANJA, '#22c55e', ROSA][(k + f) % 4]} opacity={0.8} />)}
      </g>
    ))}
    <g opacity={cripticos}>
      <rect x={-70} y={-300} width={140} height={34} rx={8} fill={c.texto} />
      <Txt x={0} y={-274} textAnchor="middle" fontSize={26} fill={c.panel}>#?%&</Txt>
    </g>
  </g>
);

/* Salero. */
const Salero: React.FC<{ x: number; y: number; c: C }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -24 0 L -30 -60 Q -30 -76 0 -76 Q 30 -76 30 -60 L 24 0 Z" fill={c.blanco} style={sombra(c.sombra, 2, 6)} />
    <path d="M -28 -64 Q 0 -90 28 -64" fill={c.apagado} />
    {[-10, 0, 10].map((dx) => <circle key={dx} cx={dx} cy={-74} r={2.5} fill={c.texto} />)}
  </g>
);

/* Personaje animado de ayuda (una carita que rebota). */
const Ayudante: React.FC<{ x: number; y: number; t: number; id: string }> = ({ x, y, t, id }) => (
  <g transform={`translate(${x} ${y - Math.abs(Math.sin(t * 3)) * 16})`}>
    <ellipse cx={0} cy={44 + Math.abs(Math.sin(t * 3)) * 16} rx={30} ry={6} fill="#000" opacity={0.12} />
    <circle r={40} fill={`url(#${id}-marca)`} />
    <circle cx={-13} cy={-6} r={8} fill="#fff" /><circle cx={13} cy={-6} r={8} fill="#fff" />
    <circle cx={-12} cy={-5} r={4} fill="#1f2937" /><circle cx={14} cy={-5} r={4} fill="#1f2937" />
    <path d="M -12 14 Q 0 24 12 14" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>
);

/* Pantalla con un avión que vuela hacia un muro. */
const PantallaMuro: React.FC<{ x: number; y: number; c: C; t: number; id: string }> = ({ x, y, c, t, id }) => {
  const u = (t * 0.25) % 1;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-260} y={-130} width={520} height={260} rx={16} fill="#bae6fd" style={sombra(c.sombra)} />
      <rect x={150} y={-110} width={70} height={220} fill="#9a3412" />
      {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={150} y1={-110 + k * 44} x2={220} y2={-110 + k * 44} stroke="#7c2d12" strokeWidth={3} />)}
      <g transform={`translate(${-200 + 300 * u} ${10 - 20 * u})`}>
        <path d="M -50 0 L 40 -6 Q 60 0 40 6 Z" fill={`url(#${id}-marca)`} />
        <path d="M -10 -4 L 10 -40 L 22 -40 L 14 -4 Z M -10 4 L 10 36 L 22 36 L 14 4 Z" fill={ROSA} />
        <circle cx={30} cy={-2} r={5} fill="#fff" />
      </g>
    </g>
  );
};

/* Foto enmarcada del pueblo minero: casas grises y una chimenea apagada. */
const FotoPueblo: React.FC<{ x: number; y: number; c: C; rot: number }> = ({ x, y, c, rot }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-120} y={-90} width={240} height={180} rx={6} fill={c.blanco} style={sombra(c.sombra)} />
    <rect x={-106} y={-76} width={212} height={130} fill="#9ca3af" />
    <rect x={40} y={-60} width={20} height={80} fill="#4b5563" />
    {[-90, -40, 0].map((dx, k) => <g key={dx}><rect x={dx} y={10 - k * 6} width={40} height={44 + k * 6} fill="#6b7280" /><path d={`M ${dx - 4} ${10 - k * 6} L ${dx + 20} ${-10 - k * 6} L ${dx + 44} ${10 - k * 6} Z`} fill="#4b5563" /></g>)}
  </g>
);

/* Auto compacto. */
const Auto: React.FC<{ x: number; y: number; id: string }> = ({ x, y, id }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={6} rx={150} ry={12} fill="#000" opacity={0.14} />
    <path d="M -140 -20 Q -140 -50 -100 -54 L -60 -56 Q -30 -100 30 -100 Q 80 -100 100 -56 L 130 -50 Q 150 -46 150 -20 L 150 -6 H -140 Z" fill={`url(#${id}-marca)`} />
    <path d="M -46 -60 Q -22 -90 20 -90 L 24 -60 Z M 36 -60 L 34 -90 Q 72 -88 86 -60 Z" fill="#bfdbfe" />
    <circle cx={-80} cy={-6} r={26} fill="#1f2937" /><circle cx={-80} cy={-6} r={11} fill="#9ca3af" />
    <circle cx={90} cy={-6} r={26} fill="#1f2937" /><circle cx={90} cy={-6} r={11} fill="#9ca3af" />
  </g>
);

export const EvidenciaEmocionCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('proceso') + 4 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Evidencia vívida'], [M('historias'), 'Historias y analogías'], [M('fries'), 'Microsoft'], [M('alSuper'), 'El supermercado'],
    [M('restaurante'), 'El restaurante'], [M('gates'), 'Bill Gates dijo sí'], [M('conectar'), 'Conectar emocionalmente'], [M('aeronautica'), 'El mejor año'],
    [M('muro'), 'Un piloto hacia un muro'], [M('agradecer'), 'Primero, agradecer'], [M('marcell'), 'Robert Marcell'], [M('esperanza'), 'Esperanza'],
    [M('ofrecer'), 'Esperanza, no desastre'], [M('proceso'), 'Un proceso'],
  ];

  const aA = ventana(t, -1, M('fries'));
  const aB = ventana(t, M('fries'), M('conectar'));
  const aC = ventana(t, M('conectar'), M('marcell'));
  const aD = ac(t, M('marcell'), M('marcell') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Evidencia vívida: analogías que se recuerdan; emoción: la esperanza mueve más que el miedo">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · cifras abstractas frente a historias */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {Array.from({ length: 14 }, (_, k) => {
                  const x = 160 + (k % 7) * 150, y = 290 + Math.floor(k / 7) * 130;
                  const se = ac(t, M('abstractos') + 0.6, M('historias'));
                  return <Txt key={k} x={x} y={y + 10 * se} textAnchor="middle" fontSize={44} fill={c.apagado} opacity={e1(t, M('evidencia') + k * 0.08) * (1 - 0.75 * se)}>{['37,2', '18 %', '0,4', '1.250', '62', '9 %', '4,8'][(k * 3) % 7]}</Txt>;
                })}
                <Etiqueta x={600} y={560} texto="abstractos" op={ventana(t, M('abstractos'), M('historias'))} c={c} id={ID} />
                {['historias', 'metáforas', 'analogías'].map((txt, k) => <Chip key={txt} x={270 + k * 330} y={620} texto={txt} c={c} id={ID} op={e1(t, M('historias') + k * 0.5)} marca cae />)}
              </g>
            )}

            {/* B · el supermercado y el restaurante */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const sup = e1(t, M('alSuper'));
                  const res = e1(t, M('restaurante'));
                  const mesero = ac(t, M('menu') - 0.4, M('menu') + 1);
                  return (
                    <g>
                      <g opacity={ventana(t, M('fries'), M('alSuper'))}>
                        {[420, 780].map((x, k) => (
                          <g key={x}>
                            <Persona id={ID} x={x} y={740} cuerpo={k ? '#0e7490' : '#334155'} pelo={k ? '#2b1a12' : '#c49a6c'} />
                            <Gesto x={x} y={740} animo={0.5} />
                          </g>
                        ))}
                        <Etiqueta x={420} y={805} texto="Karen Fries" op={1} c={c} id={ID} />
                        <Etiqueta x={780} y={805} texto="Barry Linnett" op={1} c={c} id={ID} />
                        <g opacity={e1(t, M('personajes'))}><Ayudante x={600} y={380} t={t} id={ID} /></g>
                        <Etiqueta x={600} y={480} texto="personajes animados" op={e1(t, M('personajes') + 0.4)} c={c} id={ID} />
                      </g>
                      {/* supermercado */}
                      <g opacity={sup}>
                        <Estante x={190} y={620} c={c} cripticos={ac(t, M('rotulos'), M('rotulos') + 0.6)} />
                        <Estante x={430} y={620} c={c} cripticos={ac(t, M('rotulos') + 0.3, M('rotulos') + 0.9)} />
                        <Persona id={ID} x={310} y={790} s={0.7} cuerpo="#64748b" />
                        <Gesto x={310} y={790} s={0.7} animo={-0.5} />
                        <g opacity={e1(t, M('sal'))}>
                          <Salero x={310} y={260} c={c} />
                          <Txt x={370} y={230} fontSize={44} fill={c.tenue}>?</Txt>
                        </g>
                        <g opacity={e1(t, M('eseSuper'))}>
                         <Etiqueta x={310} y={845} texto="las interfaces de entonces" op={1} c={c} id={ID} />
                        </g>
                      </g>
                      {/* restaurante */}
                      <g opacity={res}>
                        <rect x={630} y={260} width={500} height={540} rx={24} fill={c.panel2} opacity={0.6} />
                        <Persona id={ID} x={760} y={700} cuerpo="#0f766e" />
                        <Gesto x={760} y={700} animo={0.8} />
                        <rect x={700} y={660} width={260} height={22} rx={8} fill={c.apagado} />
                        <rect x={720} y={682} width={16} height={100} fill={c.apagado} /><rect x={924} y={682} width={16} height={100} fill={c.apagado} />
                        <Persona id={ID} x={1050 - 80 * mesero} y={760} s={0.9} cuerpo="#1f2937" />
                        <Gesto x={1050 - 80 * mesero} y={760} s={0.9} animo={0.6} />
                        <g opacity={e1(t, M('menu') - 0.4)} transform={`translate(${1000 - 80 * mesero} ${590 - 30 * mesero})`}>
                          <rect x={-40} y={-50} width={80} height={100} rx={8} fill={ROSA} />
                          <rect x={-28} y={-30} width={56} height={6} rx={3} fill="#fff" /><rect x={-28} y={-14} width={40} height={6} rx={3} fill="#fff" />
                        </g>
                        <Chip x={880} y={330} texto="otros trabajan" c={c} id={ID} op={ventana(t, M('menu') + 1.4, M('gates'))} />
                      </g>
                      <g opacity={e1(t, M('gates'))}>
                        <Visto x={1080} y={330} s={1.1} />
                        <Chip x={880} y={330} texto="Bill Gates" c={c} id={ID} op={1} marca />
                      </g>
                      <g opacity={e1(t, M('medioMillon'))}>
                        <rect x={630} y={380} width={500} height={110} rx={20} fill={c.panel} style={sombra(c.sombra)} />
                        <Txt x={880} y={445} textAnchor="middle" fontSize={48} fill={`url(#${ID}-marcaH)`}>{Math.round(500000 * ac(t, M('medioMillon'), M('medioMillon') + 1.4)).toLocaleString('es-CL')}</Txt>
                        <Txt f="a" x={880} y={478} textAnchor="middle" fontSize={24} fill={c.tenue}>copias</Txt>
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · el presidente y el muro */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const enojo = ac(t, M('resentimiento'), M('resentimiento') + 0.8) * (1 - ac(t, M('agradecer') + 0.6, M('agradecer') + 1.6));
                  const pantalla = ventana(t, M('muro'), M('agradecer'));
                  return (
                    <g>
                      <g opacity={ventana(t, M('conectar') + 0.3, M('aeronautica'))}><path d="M 600 560 C 480 470 480 360 548 352 C 578 349 594 372 600 390 C 606 372 622 349 652 352 C 720 360 720 470 600 560 Z" fill={ROSA} transform={`translate(600 456) scale(${1 + 0.05 * Math.max(0, Math.sin(t * 6))}) translate(-600 -456)`} /><Etiqueta x={600} y={630} texto="tu compromiso" op={1} c={c} id={ID} /></g>
                      <Chip x={600} y={260} texto="ajusta tu tono" c={c} id={ID} op={ventana(t, M('tono'), M('mejorAno'))} />
                      <g opacity={e1(t, M('aeronautica'))}>
                        <Persona id={ID} x={170} y={740} cuerpo="#1f2937" corbata />
                        <Gesto x={170} y={740} animo={0.3 - 0.4 * pantalla} />
                        <Etiqueta x={170} y={805} texto="presidente" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('mejorAno'), M('muro'))}>
                        <rect x={520} y={300} width={160} height={150} rx={12} fill={c.panel} style={sombra(c.sombra)} />
                        <path d="M 560 330 H 640 V 360 Q 640 400 600 400 Q 560 400 560 360 Z" fill="#fbbf24" />
                        <rect x={588} y={400} width={24} height={24} fill="#f59e0b" /><rect x={570} y={424} width={60} height={14} rx={4} fill="#f59e0b" />
                        <Etiqueta x={600} y={500} texto="el mejor año" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={pantalla}><PantallaMuro x={620} y={400} c={c} t={t} id={ID} /></g>
                      {/* los directivos, de espaldas */}
                      <g opacity={e1(t, M('aeronautica') + 0.4)}>
                        {[460, 620, 780, 940].map((x, k) => (
                          <g key={x}>
                            <circle cx={x} cy={710} r={40} fill="#c2263e" opacity={0.35 * enojo} />
                            <Espalda x={x} y={740} s={1.1} c={c} pelo={['#2b1a12', '#5b3a26', '#9ca3af', '#2b1a12'][k]} />
                          </g>
                        ))}
                        <Etiqueta x={700} y={830} texto="directivos" op={1} c={c} id={ID} />
                      </g>
                      <Chip x={600} y={600} texto="resentimiento" c={c} id={ID} op={ventana(t, M('resentimiento') + 0.4, M('agradecer'))} />
                      <g opacity={e1(t, M('agradecer'))}>
                        <Burbuja x={200} y={540} w={420} texto="Gracias por este gran año." u={ac(t, M('agradecer'), M('agradecer') + 1.4)} c={c} id={ID} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · Robert Marcell: del pueblo minero a la esperanza */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const sol = ac(t, M('esperanza'), M('esperanza') + 2);
                  const ciclo = e1(t, M('proceso'));
                  return (
                    <g>
                      <circle cx={1000} cy={560 - 260 * sol} r={70} fill="#fbbf24" opacity={sol * (1 - ciclo)} />
                      {Array.from({ length: 10 }, (_, k) => <line key={k} x1={1000} y1={560 - 260 * sol} x2={1000 + 110 * Math.cos((k / 10) * Math.PI * 2 + t * 0.4)} y2={560 - 260 * sol + 110 * Math.sin((k / 10) * Math.PI * 2 + t * 0.4)} stroke="#fbbf24" strokeWidth={6} strokeLinecap="round" opacity={0.6 * sol * (1 - ciclo)} />)}
                      <Persona id={ID} x={200} y={750} cuerpo="#334155" corbata />
                      <Gesto x={200} y={750} animo={-0.3 + 0.9 * sol} />
                      <Etiqueta x={200} y={815} texto="Robert Marcell" op={1} c={c} id={ID} />
                      <g opacity={ventana(t, M('pueblo'), M('esperanza') + 1)}>
                        <FotoPueblo x={480} y={280} c={c} rot={-4} />
                        <FotoPueblo x={770} y={300} c={c} rot={5} />
                      </g>
                      <g opacity={ventana(t, M('competir') - 0.3, M('neon'))}>
                        <Burbuja x={240} y={560} w={420} texto="No pudimos competir." u={ac(t, M('competir') - 0.3, M('competir') + 1)} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('neon'), M('proceso'))}>
                        <g transform={`translate(${80 * (1 - ac(t, M('neon'), M('neon') + 1))} 0)`}><Auto x={680} y={680} id={ID} /></g>
                        <Etiqueta x={680} y={740} texto="el Neon" op={1} c={c} id={ID} marca />
                        <g opacity={e1(t, M('neon') + 0.6)}><Visto x={860} y={560} s={0.9} /></g>
                        <Chip x={600} y={300} texto="esperanza > desastre" c={c} id={ID} op={e1(t, M('ofrecer'))} marca />
                      </g>
                      {/* persuadir es un proceso */}
                      <g opacity={ciclo} transform={`rotate(${t * 20} 680 450)`}>
                        <circle cx={680} cy={450} r={150} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={10} strokeDasharray="200 36" />
                      </g>
                      <g opacity={ciclo}>
                        <Etiqueta x={680} y={460} texto="un proceso" op={1} c={c} id={ID} marca />
                        {([['escucha', 680, 260], ['ajusta', 880, 640], ['intenta', 480, 640]] as const).map(([txt, x, y], k) => <Chip key={txt} x={x} y={y} texto={txt} c={c} id={ID} op={e1(t, M('proceso') + 0.6 + k * 0.6)} />)}
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
