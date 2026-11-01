import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Bombilla, PanelPregunta, Rotulo, W, H, borde, e1, lerp, marcador, AZUL_M, ROJO_M, VERDE, VIOLETA } from './comunLS';
import { Toma, Letrero, Apoyo, Furgon, Corazon, Visto, sm, cl } from './kitLS';
import type { PropsCE } from './comunLS';

/**
 * «Medir: la contabilidad de la innovación», escena propia en cinco tomas.
 * 1 · El laboratorio: la fundadora en su consola de perillas, el PMV en un pedestal que envía datos a una gran
 *     pantalla; el medidor de progreso real, la cuadrícula cuantitativa, la curva que sube de la base al ideal
 *     a fuerza de microajustes, el rediseño del producto, el embudo de activación y el sello «Validado».
 * 2 · La decisión final: la furgoneta ante dos letreros, cambiar de rumbo o persistir.
 * 3 · Lo ilusorio: un trofeo que resulta ser de cartón, alguien que no quiere mirar, el globo hueco del total
 *     de clientes y el balde de la fidelización que entra por la adquisición y se escapa por la anulación.
 * 4 · Las tres A en una sala de tres monitores: dominó de causa y efecto, un informe claro que todos leen y una
 *     lupa que revisa cada dato; detrás de las cifras, personas.
 * 5 · La tienda de diez mil visitas y, de cada cien, quiénes compran y quiénes regresan.
 */

const ID = 'ls5';
const nombres = ['real', 'cuant', 'pmv', 'regimen', 'micro', 'pequenos', 'diseno', 'activ', 'valid', 'decision', 'rumbo', 'persistir', 'ilus', 'simular', 'total', 'fidel', 'anul',
  'tresA', 'accion', 'acces', 'audit', 'humano', 'visitas', 'cien', 'regresan', 'pregunta'] as const;
type N = typeof nombres[number];

export const MedirLS: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas) as (n: N) => number;
  const t = estatico ? M('regresan') + 1.2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);
  const traje = isDark ? '#8da2c0' : '#334155';

  const rotulos: [number, string][] = [
    [0.2, 'Medir el progreso'], [M('real'), '¿Hay progreso real?'], [M('cuant'), 'Mirada cuantitativa'], [M('pmv'), 'El PMV da datos'], [M('regimen'), 'De la base al ideal'], [M('micro'), 'Microajustes'],
    [M('diseno'), 'Mejorar el diseño'], [M('activ'), 'Tasa de activación'], [M('valid'), 'Conocimiento validado'], [M('decision'), 'La decisión final'],
    [M('ilus'), 'Indicadores ilusorios'], [M('total'), 'Cifras engañosas'], [M('fidel'), 'Si el motor es fidelizar'], [M('tresA'), 'Las tres A'], [M('accion'), 'Accionable'], [M('acces'), 'Accesible'], [M('audit'), 'Auditable'], [M('humano'), 'Un factor humano'],
    [M('visitas'), 'Diez mil visitas'], [M('cien'), 'De cada cien'], [M('regresan'), 'Quién compra y regresa'],
  ];

  /* Toma 1: curva por microajustes */
  const nAj = 6, pasoAj = (M('activ') - M('micro')) / nAj;
  const prog = Array.from({ length: nAj }, (_, k) => ac(t, M('micro') + k * pasoAj, M('micro') + k * pasoAj + 0.8)).reduce((a, b) => a + b, 0) / nAj;
  const progT = cl(prog * 0.75 + 0.25 * ac(t, M('activ'), M('activ') + 2));
  const SX0 = 520, SX1 = 1050, SYB = 460, SYI = 250;
  const curva = Array.from({ length: 25 }, (_, k) => { const f = k / 24; const sube = cl((progT - f * 0.2) * 1.15); return [SX0 + f * (SX1 - SX0), SYB - (SYB - SYI) * sube * f ** 0.8 + 5 * Math.sin(k * 1.7)] as [number, number]; });
  const largo = ac(t, M('regimen') + 0.3, M('regimen') + 1.6);
  const aguja = -80 + 26 * Math.sin(t * 2.3) * (1 - progT) + 150 * progT;
  const perilla = (k: number) => (prog * 260 + k * 40 + 10 * Math.sin(t * 2 + k));
  /* Toma 3 */
  const nivel = 0.5 + 0.12 * Math.sin((t - M('fidel')) * 1.2);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La contabilidad de la innovación: medir con indicadores accionables, accesibles y auditables">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* TOMA 1 · el laboratorio */}
            <Toma t={t} a={-1} b={M('decision')} zi={1.04}>
              <rect x={60} y={760} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              {/* gran pantalla */}
              <g opacity={e1(t, 0.3)}>
                <rect x={470} y={150} width={640} height={370} rx={24} fill="#1f2937" style={sombra(c.sombra, 8, 20)} />
                <rect x={486} y={166} width={608} height={338} rx={14} fill="#0b1220" />
                <rect x={770} y={520} width={60} height={40} fill="#334155" /><rect x={720} y={556} width={160} height={14} rx={6} fill="#334155" />
              </g>
              {t >= M('cuant') && <g opacity={e1(t, M('cuant'))}>
                {[0, 1, 2, 3].map((k) => <rect key={k} x={SX0} y={SYB - k * 60} width={(SX1 - SX0 + 20) * ac(t, M('cuant') + k * 0.12, M('cuant') + 0.8 + k * 0.12)} height={2} fill="#334155" />)}
                <rect x={SX0 - 4} y={200} width={5} height={SYB - 196} rx={2} fill="#64748b" /><rect x={SX0 - 4} y={SYB} width={SX1 - SX0 + 30} height={5} rx={2} fill="#64748b" />
              </g>}
              {t >= M('regimen') && <g opacity={e1(t, M('regimen'))}>
                <rect x={SX0} y={SYI - 24} width={SX1 - SX0 + 30} height={48} rx={10} fill={VERDE} opacity={0.2} />
                <Txt f="a" x={SX0 + 14} y={SYI + 9} fontSize={26} fill="#86efac">Ideal</Txt>
                <Txt f="a" x={SX0 + 14} y={SYB - 14} fontSize={26} fill="#93c5fd">Base</Txt>
                <polyline points={curva.slice(0, Math.max(2, Math.round(25 * largo))).map((p) => p.join(',')).join(' ')} fill="none" stroke="#60a5fa" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
                {t >= M('micro') && Array.from({ length: nAj }, (_, k) => { const tk = M('micro') + k * pasoAj; if (t < tk) return null; const [px, py] = curva[4 + k * 3]; return <circle key={k} cx={px} cy={py} r={8 + 6 * (1 - ac(t, tk, tk + 0.6))} fill={NARANJA} />; })}
              </g>}
              {/* medidor de progreso real, en la esquina de la pantalla */}
              {t >= M('real') && (
                <g opacity={e1(t, M('real'))} transform="translate(1010 440)">
                  <path d="M -54 0 A 54 54 0 0 1 54 0" fill="none" stroke="#334155" strokeWidth={14} strokeLinecap="round" />
                  <path d="M -54 0 A 54 54 0 0 1 54 0" fill="none" stroke={VERDE} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - (aguja + 90) / 180} />
                  <line x1={0} y1={0} x2={0} y2={-44} stroke="#e5e7eb" strokeWidth={6} strokeLinecap="round" transform={`rotate(${aguja})`} /><circle r={8} fill="#e5e7eb" />
                </g>
              )}
              {/* sello validado */}
              {t >= M('valid') && (() => { const q = ac(t, M('valid'), M('valid') + 0.3); return <g opacity={q} transform={`translate(860 210) rotate(-6) scale(${lerp(1.9, 1, q)})`}><rect x={-120} y={-34} width={240} height={68} rx={14} fill={VERDE} style={sombra(0.35, 4, 10)} /><path d="M -98 -2 l 14 15 l 26 -30" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" /><Txt x={20} y={12} textAnchor="middle" fontSize={34} fill="#fff">Validado</Txt></g>; })()}
              {/* consola con perillas y la fundadora */}
              <g opacity={e1(t, M('micro') - 2)}>
                <Persona id={ID} x={150} y={760} s={0.66} cuerpo={traje} corbata />
                <path d="M 210 760 L 230 600 H 420 L 440 760 Z" fill="#475569" /><rect x={226} y={590} width={198} height={20} rx={6} fill="#64748b" />
                {[0, 1, 2].map((k) => <g key={k} transform={`translate(${270 + k * 56} 650)`}><circle r={20} fill="#1f2937" /><line x1={0} y1={0} x2={0} y2={-16} stroke={[NARANJA, AZUL_M, ROSA][k]} strokeWidth={6} strokeLinecap="round" transform={`rotate(${perilla(k)})`} /></g>)}
                {[0, 1, 2].map((k) => <circle key={k} cx={270 + k * 56} cy={706} r={6} fill={['#22c55e', '#fbbf24', '#ef4444'][k]} opacity={0.5 + 0.5 * Math.abs(Math.sin(t * 3 + k))} />)}
              </g>
              {/* el PMV en su pedestal */}
              {t >= M('pmv') && (
                <g opacity={e1(t, M('pmv'))}>
                  <rect x={560} y={680} width={120} height={80} rx={6} fill="#94a3b8" /><rect x={548} y={670} width={144} height={16} rx={6} fill="#cbd5e1" />
                  <g transform="translate(620 620)">
                    <rect x={-50} y={-44} width={100} height={88} rx={10} fill={t >= M('diseno') ? `url(#${ID}-marca)` : '#b7791f'} />
                    {t < M('diseno') + 1 && <rect x={-50} y={-44} width={100} height={88} rx={10} fill="#b7791f" opacity={1 - ac(t, M('diseno'), M('diseno') + 1)} />}
                    <Txt x={0} y={12} textAnchor="middle" fontSize={30} fill="#fff">PMV</Txt>
                    {t >= M('diseno') && t < M('diseno') + 1.8 && <g transform={`translate(${lerp(-60, 60, ac(t, M('diseno'), M('diseno') + 1.2))} -66) rotate(30)`}><rect x={-6} y={-50} width={12} height={46} rx={5} fill="#7c4a1e" /><rect x={-10} y={-8} width={20} height={20} rx={4} fill={ROSA} /></g>}
                  </g>
                  {[0, 1, 2, 3, 4].map((k) => { const ph = (t * 0.6 + k / 5) % 1; return <circle key={k} cx={lerp(640, 700, ph)} cy={lerp(570, 470, ph) - 40 * Math.sin(Math.PI * ph)} r={7} fill="#60a5fa" opacity={Math.sin(Math.PI * ph)} />; })}
                </g>
              )}
              {/* embudo de activación */}
              {t >= M('activ') && (
                <g opacity={e1(t, M('activ'))}>
                  <path d="M 820 600 H 1020 L 950 680 V 740 H 890 V 680 Z" fill={AZUL_M} opacity={0.9} />
                  {[0, 1, 2, 3, 4, 5].map((k) => { const ph = ((t - M('activ')) * 0.9 + k / 6) % 1; return <circle key={k} cx={lerp(840 + k * 32, 920, cl(ph * 1.4))} cy={570 + 190 * ph} r={9} fill={['#ec4899', '#f59e0b', VERDE, VIOLETA, '#fff', NARANJA][k]} opacity={Math.sin(Math.PI * ph)} />; })}
                  <Letrero x={920} y={800} texto="Activación" id={ID} fondo={AZUL_M} />
                </g>
              )}
            </Toma>

            {/* TOMA 2 · la decisión final */}
            <Toma t={t} a={M('decision')} b={M('ilus')}>
              <path d="M 80 680 H 560 Q 700 680 780 560 L 900 380" stroke={isDark ? '#4b5563' : '#cbd5e1'} strokeWidth={90} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 560 680 H 1120" stroke={isDark ? '#4b5563' : '#cbd5e1'} strokeWidth={90} fill="none" strokeLinecap="round" />
              {Array.from({ length: 6 }, (_, k) => <rect key={k} x={110 + k * 80} y={676} width={40} height={8} rx={4} fill="#fff" opacity={0.7} />)}
              <Furgon x={lerp(180, 430, sm(t, M('decision'), M('decision') + 1.5))} y={710} s={0.9} id={ID} t={t} giro={t * 200} luz={1} />
              <rect x={600} y={440} width={14} height={200} rx={5} fill="#7c4a1e" />
              <g opacity={e1(t, M('rumbo'))} transform={`rotate(${-20 + 2 * Math.sin(t * 2)} 607 470)`}><path d="M 614 440 H 820 L 850 470 L 820 500 H 614 Z" fill={NARANJA} /><Txt f="a" x={730} y={480} textAnchor="middle" fontSize={28} fill="#fff">Cambiar</Txt></g>
              <g opacity={e1(t, M('persistir'))} transform={`rotate(${2 * Math.sin(t * 2)} 607 540)`}><path d="M 614 520 H 820 L 850 550 L 820 580 H 614 Z" fill={AZUL_M} /><Txt f="a" x={730} y={560} textAnchor="middle" fontSize={28} fill="#fff">Persistir</Txt></g>
              <Txt x={440} y={540} textAnchor="middle" fontSize={72} fill={ROSA} opacity={0.6 + 0.4 * Math.sin(t * 3)}>?</Txt>
            </Toma>

            {/* TOMA 3 · lo ilusorio y el balde de la fidelización */}
            <Toma t={t} a={M('ilus')} b={M('tresA')}>
              <rect x={60} y={720} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
              {/* escenario con trofeo de cartón */}
              {(() => { const gira = ac(t, M('simular'), M('simular') + 1.2); const sx = Math.cos(gira * Math.PI * 0.36); return (
                <g opacity={e1(t, M('ilus'))}>
                  <path d="M 230 160 L 120 700 H 340 Z" fill="#fde68a" opacity={isDark ? 0.15 : 0.4} />
                  <rect x={120} y={700} width={220} height={22} rx={6} fill="#7c2d12" />
                  <g transform="translate(230 560)">
                    <g transform={`scale(${sx} 1)`}>
                      <path d="M -60 -120 H 60 V -60 Q 60 0 0 10 Q -60 0 -60 -60 Z" fill="#fbbf24" /><path d="M 0 -120 H 60 V -60 Q 60 0 0 10 Z" fill="#d97706" opacity={0.5} />
                      <path d="M -60 -100 Q -100 -100 -96 -64 Q -92 -36 -56 -34" fill="none" stroke="#fbbf24" strokeWidth={12} /><path d="M 60 -100 Q 100 -100 96 -64 Q 92 -36 56 -34" fill="none" stroke="#fbbf24" strokeWidth={12} />
                      <rect x={-14} y={8} width={28} height={60} fill="#fbbf24" /><rect x={-56} y={66} width={112} height={74} rx={8} fill="#92400e" />
                    </g>
                    {gira > 0.6 && <g opacity={ac(t, M('simular') + 0.7, M('simular') + 1.2)}><rect x={-3} y={-124} width={6} height={264} fill="#a16207" /><path d="M 2 -40 L 70 140" stroke="#a16207" strokeWidth={8} strokeLinecap="round" /><Letrero x={0} y={-170} texto="Cartón" fondo={ROJO_M} id={ID} tam={26} /></g>}
                  </g>
                  {t >= M('simular') && <g opacity={e1(t, M('simular') + 1.6)}><Persona id={ID} x={410} y={722} s={0.55} cuerpo={traje} ojos={0} corbata /><rect x={376} y={632} width={68} height={14} rx={7} fill={ROJO_M} /></g>}
                </g>
              ); })()}
              {/* globo hueco del total de clientes */}
              {t >= M('total') && (() => { const inf = ac(t, M('total'), M('total') + 1.6); const des = ac(t, M('total') + 4.5, M('total') + 6.5); const r = 40 + 64 * inf - 30 * des; return (
                <g opacity={e1(t, M('total'))}>
                  <path d={`M 620 ${330 + r * 1.1} Q 630 ${450 + r / 2} 616 600`} stroke={c.tenue} strokeWidth={3} fill="none" />
                  <ellipse cx={620 + 6 * Math.sin(t * 1.5)} cy={330} rx={r} ry={r * 1.12} fill={ROJO_M} opacity={0.88} />
                  <ellipse cx={620 - r * 0.35} cy={330 - r * 0.4} rx={r * 0.18} ry={r * 0.3} fill="#fff" opacity={0.5} />
                  <ellipse cx={620} cy={330} rx={r * 0.6} ry={r * 0.68} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="8 10" opacity={0.6} />
                  <Letrero x={620} y={640} texto="Total de clientes" fondo={c.panel} color={c.texto} id={ID} />
                </g>
              ); })()}
              {/* balde de la fidelización */}
              {t >= M('fidel') && (
                <g opacity={e1(t, M('fidel'))}>
                  <rect x={880} y={250} width={140} height={22} rx={8} fill="#64748b" /><rect x={1000} y={250} width={22} height={70} rx={8} fill="#64748b" /><rect x={990} y={316} width={42} height={16} rx={5} fill="#475569" />
                  {[0, 1, 2, 3].map((k) => { const ph = (t * 1.1 + k / 4) % 1; return <circle key={k} cx={1011} cy={340 + 150 * ph} r={9} fill={['#ec4899', '#f59e0b', VERDE, VIOLETA][k]} opacity={ph < 0.9 ? 1 : 0} />; })}
                  <defs><clipPath id={`${ID}-balde`}><path d="M 880 470 H 1110 L 1086 690 H 904 Z" /></clipPath></defs>
                  <path d="M 880 470 H 1110 L 1086 690 H 904 Z" fill={c.apagado} opacity={0.55} />
                  <rect x={870} y={690 - 220 * nivel} width={250} height={230} fill={AZUL_M} opacity={0.8} clipPath={`url(#${ID}-balde)`} />
                  <rect x={872} y={462} width={246} height={14} rx={7} fill="#64748b" />
                  <circle cx={1084} cy={650} r={8} fill="#1f2937" />
                  {[0, 1, 2].map((k) => { const ph = (t * 0.9 + k / 3) % 1; return <circle key={k} cx={1090 + 50 * ph} cy={652 + 60 * ph * ph} r={8} fill={['#ec4899', VERDE, '#f59e0b'][k]} opacity={1 - ph} />; })}
                  <Letrero x={950} y={210} texto="Adquisición" fondo={VERDE} id={ID} op={e1(t, M('anul'))} />
                  <Letrero x={1000} y={780} texto="Anulación" fondo={ROJO_M} id={ID} op={e1(t, M('anul') + 0.8)} />
                </g>
              )}
            </Toma>

            {/* TOMA 4 · las tres A en tres monitores */}
            <Toma t={t} a={M('tresA')} b={M('visitas')}>
              <rect x={60} y={690} width={1080} height={20} rx={8} fill={isDark ? '#3a3f47' : '#cbd5e1'} />
              {(['accion', 'acces', 'audit'] as N[]).map((m, k) => {
                const e = e1(t, M(m)); const x = 230 + k * 370; const col = [AZUL_M, VERDE, VIOLETA][k];
                return (
                  <g key={m} opacity={Math.max(0.25 * e1(t, M('tresA')), e)}>
                    <rect x={x - 22} y={600} width={44} height={90} fill="#334155" />
                    <rect x={x - 165} y={250} width={330} height={360} rx={22} fill="#1f2937" style={sombra(c.sombra, 8, 18)} />
                    <rect x={x - 151} y={264} width={302} height={332} rx={12} fill={isDark ? '#111827' : '#f8fafc'} />
                    <Letrero x={x} y={310} texto={['Accionable', 'Accesible', 'Auditable'][k]} fondo={col} id={ID} />
                    {k === 0 && e > 0.01 && (() => { const ph = ((t - M('accion')) / 3) % 1; return <g>
                      {Array.from({ length: 5 }, (_, q) => { const c2 = cl((ph - q * 0.1) * 8); return <rect key={q} x={x - 120 + q * 44} y={430} width={16} height={100} rx={4} fill={col} transform={`rotate(${c2 * 62} ${x - 104 + q * 44} 530)`} />; })}
                      <rect x={x - 140} y={530} width={280} height={8} rx={4} fill={c.apagado} />
                      <Bombilla x={x + 110} y={400} s={0.42} t={t} luz={cl((ph - 0.5) * 6)} id={ID} />
                    </g>; })()}
                    {k === 1 && e > 0.01 && <g>
                      {[0.45, 0.7, 0.95].map((v, q) => { const h = 150 * v * ac(t, M('acces') + q * 0.2, M('acces') + 1 + q * 0.2); return <rect key={q} x={x - 110 + q * 80} y={500 - h} width={56} height={h} rx={8} fill={col} />; })}
                      <rect x={x - 130} y={500} width={260} height={5} rx={2} fill={c.apagado} />
                      {[0, 1].map((q) => <Persona key={q} id={ID} x={x - 50 + q * 100} y={588} s={0.3} cuerpo={[ROSA, NARANJA][q]} />)}
                    </g>}
                    {k === 2 && e > 0.01 && (() => { const yl = 380 + ((t - M('audit')) * 50) % 180; return <g>
                      {Array.from({ length: 5 }, (_, q) => <g key={q}><rect x={x - 120} y={370 + q * 40} width={200} height={24} rx={6} fill={q === 3 ? '#fde68a' : c.panel2} />{yl > 382 + q * 40 && <path d={`M ${x + 96} ${382 + q * 40} l 8 9 l 16 -18`} stroke={q === 3 ? '#d97706' : VERDE} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />}</g>)}
                      <g transform={`translate(${x - 30} ${yl})`}><circle r={28} fill="#bfdbfe" opacity={0.3} /><circle r={28} fill="none" stroke="#334155" strokeWidth={7} /><rect x={18} y={18} width={12} height={38} rx={6} fill="#334155" transform="rotate(-45 24 24)" /></g>
                    </g>; })()}
                  </g>
                );
              })}
              {t >= M('humano') && [0, 1, 2].map((k) => <g key={k} opacity={e1(t, M('humano') + k * 0.25)}><Persona id={ID} x={230 + k * 370} y={820} s={0.4} cuerpo={['#ec4899', '#0f766e', '#f59e0b'][k]} /><Corazon x={230 + k * 370 + 46} y={730} s={0.4} /></g>)}
            </Toma>

            {/* TOMA 5 · la tienda de diez mil visitas */}
            <Toma t={t} a={M('visitas')} b={fin + 5}>
              <g opacity={e1(t, M('visitas'))}>
                <rect x={110} y={420} width={380} height={300} rx={14} fill={isDark ? '#8294b3' : '#475569'} />
                <path d="M 96 420 L 120 350 H 480 L 504 420 Z" fill={ROSA} />{[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={128 + k * 60} y={352} width={30} height={66} fill="#fff" opacity={0.7} />)}
                <rect x={260} y={560} width={80} height={160} rx={6} fill="#1f2937" /><rect x={140} y={460} width={96} height={70} rx={6} fill="#bfdbfe" /><rect x={364} y={460} width={96} height={70} rx={6} fill="#bfdbfe" />
                <Txt x={300} y={270} textAnchor="middle" fontSize={64} fill={NARANJA}>{Math.round(10000 * ac(t, M('visitas') + 0.2, M('visitas') + 2.5, 0, 1)).toLocaleString('es-CL')}</Txt>
                <Txt f="a" x={300} y={312} textAnchor="middle" fontSize={30} fill={c.tenue}>visitas</Txt>
                <rect x={60} y={720} width={1080} height={10} rx={5} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
                {Array.from({ length: 8 }, (_, k) => { const ph = (t * 0.6 + k / 8) % 1; return <circle key={k} cx={lerp(40, 290, ph)} cy={760 - 12 * Math.abs(Math.sin(ph * 14))} r={9} fill={c.apagado} opacity={Math.min(1, ph * 6, (1 - ph) * 6)} />; })}
              </g>
              {t >= M('cien') && (
                <g opacity={e1(t, M('cien'))}>
                  {Array.from({ length: 100 }, (_, k) => {
                    const compra = [12, 37, 58, 83].includes(k), vuelve = [37, 83].includes(k);
                    const col = vuelve && t >= M('regresan') ? AZUL_M : compra && t >= M('cien') + 1 ? VERDE : c.apagado;
                    const big = (vuelve && t >= M('regresan')) || (compra && t >= M('cien') + 1);
                    return <circle key={k} cx={640 + (k % 10) * 46} cy={220 + Math.floor(k / 10) * 46} r={big ? 16 : 12} fill={col} opacity={e1(t, M('cien') + (k % 10) * 0.03)} />;
                  })}
                  <g opacity={e1(t, M('cien') + 1)}><Letrero x={730} y={720} texto="Compran" fondo={VERDE} id={ID} /></g>
                  <g opacity={e1(t, M('regresan'))}><Letrero x={950} y={720} texto="Regresan" fondo={AZUL_M} id={ID} /></g>
                </g>
              )}
            </Toma>
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
