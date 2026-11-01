import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Rol, Cuenta, Cruz, Visto, Cifra, Reloj, Moneda3D, Edificio, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra, azar } from './kitEQ';
import type { PropsCE, RolK } from './kitEQ';

/**
 * «La nueva arquitectura: Sales Pods», en tres tomas.
 * 1 · La línea de ensamblaje echa chispas en cada salto; los roles se juntan dentro de una membrana: una célula
 *     que funciona como microempresa.
 * 2 · La mesa redonda del Pod: SDR, AE, Pre-Sales y AM alrededor de una sola meta. La cuenta gira dentro de la
 *     mesa y su carpeta engorda de contexto; las culpas cruzadas se tachan; un solo indicador; el árbitro sobra;
 *     si se gana, celebran todos; si se pierde, se apagan todos.
 * 3 · AI Pods de Globant: la célula con agentes de IA (robots) supervisados; cobra por valor y no por horas;
 *     20 cuentas con 9 encendidas (45 %), +10 puntos de margen, más de 140 modelos en bóvedas privadas.
 */

const ID = 'eq10';
const nombres = ['pods', 'friccion', 'microempresa', 'mesa', 'meta', 'finlinea', 'contexto', 'culpas', 'autonomia', 'indicador', 'arbitro', 'gana', 'pierde', 'globant', 'agentes', 'valor', 'p45', 'margen', 'modelos', 'bovedas', 'copiar', 'celula', 'pregunta'] as const;
type N = typeof nombres[number];

const Robot: React.FC<{ x: number; y: number; s?: number; t: number; color?: string }> = ({ x, y, s = 1, t, color = TEAL }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={30} ry={7} fill="#000" opacity={0.18} />
    <rect x={-26} y={-52} width={52} height={50} rx={14} fill="#e2e8f0" />
    <rect x={0} y={-52} width={26} height={50} rx={14} fill="#000" opacity={0.08} />
    <rect x={-30} y={-100} width={60} height={44} rx={16} fill="#f1f5f9" />
    <rect x={-22} y={-90} width={44} height={22} rx={10} fill="#0f172a" />
    {[-9, 9].map((dx) => <circle key={dx} cx={dx} cy={-79} r={4} fill={color} opacity={0.6 + 0.4 * Math.sin(t * 4 + dx)} />)}
    <rect x={-2} y={-116} width={4} height={16} fill="#94a3b8" /><circle cy={-118} r={6} fill={color} />
    <circle cx={0} cy={-28} r={8} fill={color} />
  </g>
);

const MESA = { x: 600, y: 560, rx: 250, ry: 70 };
const SITIOS: { r: RolK; x: number; y: number }[] = [
  { r: 'sdr', x: 400, y: 520 }, { r: 'ae', x: 540, y: 500 }, { r: 'ps', x: 680, y: 500 }, { r: 'am', x: 810, y: 520 },
];

export const PodsEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Sales Pods'], [m('pods'), 'Escuadrones: Sales Pods'], [m('friccion'), 'La línea genera fricción'], [m('microempresa'), 'Una microempresa autónoma'],
    [m('mesa'), 'En una misma mesa'], [m('meta'), 'Una meta de ingresos'], [m('finlinea'), 'Fin de la línea de ensamblaje'], [m('contexto'), 'El Pod retiene el contexto'], [m('culpas'), 'Sin culpas cruzadas'],
    [m('autonomia'), 'Autonomía compartida'], [m('indicador'), 'Un mismo indicador'], [m('arbitro'), 'Sin árbitro'], [m('gana'), 'Si se gana, gana el Pod'], [m('pierde'), 'Si se pierde, pierden todos'],
    [m('globant'), 'AI Pods de Globant'], [m('agentes'), 'Agentes de IA supervisados'], [m('valor'), 'Cobran por valor, no por horas'], [m('p45'), 'En 45 % de sus 20 cuentas'], [m('margen'), '+10 puntos de margen bruto'],
    [m('modelos'), 'Más de 140 modelos'], [m('bovedas'), 'En bóvedas privadas'], [m('copiar'), 'No es copiar'], [m('celula'), 'La unidad es la célula'],
  ];

  const junta = sm(t, m('microempresa') + 0.2, m('microempresa') + 1.6);
  const contexto = sm(t, m('contexto'), m('contexto') + 2);
  const gana = sm(t, m('gana'), m('gana') + 0.6) * (1 - sm(t, m('pierde'), m('pierde') + 0.6));
  const pierde = sm(t, m('pierde'), m('pierde') + 0.6);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Sales Pods">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · de la línea a la célula */}
      <Toma t={t} a={-1} b={m('mesa')} zi={1}>
        <Suelo y={640} isDark={isDark} op={1 - junta} />
        {t >= m('microempresa') && <g opacity={junta}>
          <ellipse cx={600} cy={500} rx={lerp(60, 330, junta)} ry={lerp(40, 230, junta)} fill={NARANJA} opacity={0.12} />
          <ellipse cx={600} cy={500} rx={lerp(60, 330, junta)} ry={lerp(40, 230, junta)} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={8} strokeDasharray="22 12" strokeDashoffset={-t * 20} />
          <Edificio x={600} y={430} w={70} h={90} color={PIZARRA} />
          <Letrero x={600} y={790} texto="Microempresa autónoma" fondo={`url(#${ID}-marca)`} id={ID} />
        </g>}
        {SITIOS.map((s, k) => {
          const x0 = 180 + k * 280, x1 = 420 + k * 120;
          return <Rol key={s.r} id={ID} rol={s.r} x={lerp(x0, x1, junta)} y={lerp(640, 640, junta)} s={0.5} t={t} sigla={false} op={e1(t, m('pods') + k * 0.2)} />;
        })}
        {t >= m('friccion') && [320, 600, 880].map((x, k) => (
          <g key={k} opacity={e1(t, m('friccion') + k * 0.2) * (1 - junta)}>
            {Array.from({ length: 7 }, (_, j) => { const a = (j / 7) * Math.PI * 2 + t * 3; const r = 12 + 16 * ((t * 2 + azar(j + k * 3)) % 1); return <rect key={j} x={x + Math.cos(a) * r - 3} y={560 + Math.sin(a) * r - 3} width={7} height={7} rx={2} fill={j % 2 ? AMBAR : ROJO_M} />; })}
          </g>
        ))}
      </Toma>

      {/* TOMA 2 · la mesa del Pod */}
      <Toma t={t} a={m('mesa')} b={m('globant')}>
        <g opacity={1 - 0.55 * pierde}>
          {SITIOS.map((s, k) => <g key={s.r} transform={`translate(0 ${-14 * gana * Math.abs(Math.sin(t * 6 + k))})`}><Rol id={ID} rol={s.r} x={s.x} y={s.y} s={0.5} t={t} sigla={false} herramienta={false} /></g>)}
          <ellipse cx={MESA.x} cy={MESA.y + 14} rx={MESA.rx} ry={MESA.ry} fill="#000" opacity={0.14} />
          <ellipse cx={MESA.x} cy={MESA.y} rx={MESA.rx} ry={MESA.ry} fill={isDark ? '#6b4f3a' : '#d6a46c'} />
          <ellipse cx={MESA.x} cy={MESA.y - 6} rx={MESA.rx - 16} ry={MESA.ry - 14} fill={isDark ? '#7c5a42' : '#e2b886'} />
          <rect x={MESA.x - 20} y={MESA.y + 50} width={40} height={90} fill={isDark ? '#57412f' : '#a16207'} />
          {SITIOS.map((s, k) => <Letrero key={s.r} x={190 + k * 273} y={760} texto={s.r === 'ps' ? 'Pre-Sales' : s.r.toUpperCase()} fondo={[AZUL_M, NARANJA, TEAL, VERDE][k]} id={ID} tam={24} />)}
        </g>
        {/* la meta única */}
        {t >= m('meta') && <g opacity={e1(t, m('meta'))} transform="translate(600 230)">
          {[54, 38, 22].map((r, k) => <circle key={r} r={r} fill={k % 2 ? '#fff' : ROSA} />)}
          <path d={`M 90 -60 L 6 -4`} stroke={PIZARRA} strokeWidth={6} strokeLinecap="round" strokeDasharray={110} strokeDashoffset={110 * (1 - sm(t, m('meta') + 0.3, m('meta') + 1))} />
          <Letrero x={0} y={92} texto="Una meta" fondo={ROSA} id={ID} />
        </g>}
        {/* la cuenta gira dentro de la mesa y gana contexto */}
        {t >= m('finlinea') && (() => { const a = (t - m('finlinea')) * 0.9; return (
          <g opacity={e1(t, m('finlinea'))}>
            <Cuenta x={MESA.x + 150 * Math.cos(a)} y={MESA.y - 10 + 30 * Math.sin(a)} s={0.55 + 0.25 * contexto} color={NARANJA} />
          </g>
        ); })()}
        {t >= m('culpas') && <g opacity={e1(t, m('culpas')) * (1 - ac(t, m('autonomia') - 0.4, m('autonomia')))}>
          <Persona id={ID} x={940} y={330} s={0.34} cuerpo={ROSA} /><Persona id={ID} x={1080} y={330} s={0.34} cuerpo={AZUL_M} />
          <path d="M 965 270 L 1010 270 M 1055 290 L 1010 290" stroke={ROJO_M} strokeWidth={6} strokeLinecap="round" />
          <Cruz x={1010} y={200} r={26} op={sm(t, m('culpas') + 1, m('culpas') + 1.5)} />
        </g>}
        {t >= m('indicador') && <g opacity={e1(t, m('indicador'))} transform="translate(1000 300)">
          <rect x={-110} y={-80} width={220} height={140} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 10)} />
          <path d="M -70 30 A 70 70 0 0 1 70 30" stroke={c.apagado} strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d="M -70 30 A 70 70 0 0 1 70 30" stroke={VERDE} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={220} strokeDashoffset={220 * (1 - lerp(0.3, 0.75, sm(t, m('indicador'), m('indicador') + 2)) + 0.3 * pierde)} />
          <Txt f="a" x={0} y={-40} textAnchor="middle" fontSize={24} fill={c.tenue}>Indicador del Pod</Txt>
        </g>}
        {t >= m('arbitro') && <g opacity={e1(t, m('arbitro')) * (1 - ac(t, m('gana') - 0.3, m('gana')))}>
          <Persona id={ID} x={200} y={360} s={0.4} cuerpo="#1f2937" />
          {[0, 1, 2].map((k) => <rect key={k} x={180 + k * 16} y={312} width={8} height={30} fill="#fff" />)}
          <Cruz x={250} y={220} r={24} op={sm(t, m('arbitro') + 0.8, m('arbitro') + 1.3)} />
        </g>}
        {gana > 0.05 && Array.from({ length: 18 }, (_, k) => { const ph = ((t - m('gana')) * 0.6 + azar(k)) % 1; return <rect key={k} x={260 + azar(k + 9) * 680} y={140 + ph * 300} width={10} height={16} rx={3} fill={[NARANJA, ROSA, VERDE, AZUL_M][k % 4]} opacity={gana * (1 - ph)} transform={`rotate(${ph * 360} ${260 + azar(k + 9) * 680} ${140 + ph * 300})`} />; })}
      </Toma>

      {/* TOMA 3 · AI Pods */}
      <Toma t={t} a={m('globant')} b={fin + 5}>
        {(() => { const cel = sm(t, m('celula'), m('celula') + 1.2); return (
          <g transform={`translate(${lerp(0, 120, 1 - cel) * 0} 0)`}>
            <ellipse cx={330} cy={480} rx={240} ry={220} fill={TEAL} opacity={0.1 + 0.06 * cel} />
            <ellipse cx={330} cy={480} rx={240} ry={220} fill="none" stroke={TEAL} strokeWidth={6} strokeDasharray="20 12" strokeDashoffset={-t * 18} />
            <Persona id={ID} x={330} y={500} s={0.5} cuerpo={NARANJA} corbata />
            {t >= m('agentes') && [0, 1, 2, 3].map((k) => { const a = t * 0.5 + (k * Math.PI) / 2; return <g key={k} opacity={e1(t, m('agentes') + k * 0.2)}><Robot x={330 + 170 * Math.cos(a)} y={520 + 120 * Math.sin(a)} s={0.55} t={t} /></g>; })}
            <Letrero x={330} y={760} texto="AI Pod" fondo={TEAL} id={ID} />
          </g>
        ); })()}
        {t >= m('valor') && <g opacity={e1(t, m('valor')) * (1 - ac(t, m('p45') - 0.4, m('p45')))}>
          <Moneda3D x={760} y={330} r={46} giro={Math.cos(t * 2)} /><Letrero x={760} y={420} texto="Valor" fondo={AMBAR} id={ID} />
          <Reloj x={1000} y={330} r={46} t={t} vel={4} /><Cruz x={1040} y={290} r={20} />
          <Letrero x={1000} y={420} texto="Horas" fondo="#94a3b8" id={ID} />
        </g>}
        {t >= m('p45') && <g opacity={e1(t, m('p45'))}>
          {Array.from({ length: 20 }, (_, k) => { const on = k < 9 && t >= m('p45') + 0.4 + k * 0.12; return <rect key={k} x={660 + (k % 5) * 92} y={160 + Math.floor(k / 5) * 70} width={74} height={54} rx={12} fill={on ? TEAL : c.apagado} opacity={on ? 1 : 0.55} />; })}
          <Cifra x={1120} y={470} valor={45} u={ac(t, m('p45') + 0.4, m('p45') + 1.6)} suf=" %" tam={48} color={TEAL} ancla="end" />
          <Txt f="a" x={660} y={470} fontSize={24} fill={c.tenue}>20 cuentas</Txt>
        </g>}
        {t >= m('margen') && <g opacity={e1(t, m('margen'))}>
          <rect x={660} y={540} width={300} height={34} rx={17} fill={c.apagado} opacity={0.5} />
          <rect x={660} y={540} width={300 * lerp(0.6, 0.85, sm(t, m('margen') + 0.3, m('margen') + 1.5))} height={34} rx={17} fill={VERDE} />
          <Txt x={980} y={570} fontSize={34} fill={VERDE} peso={800}>+10 pts</Txt>
        </g>}
        {t >= m('modelos') && <g opacity={e1(t, m('modelos'))}>
          {Array.from({ length: 14 }, (_, k) => <rect key={k} x={660 + (k % 7) * 30} y={622 + Math.floor(k / 7) * 30} width={22} height={22} rx={6} fill={VIOLETA} opacity={0.4 + 0.6 * ((Math.sin(t * 3 + k) + 1) / 2)} />)}
          <Txt x={880} y={660} fontSize={34} fill={VIOLETA} peso={800}>140+ modelos</Txt>
        </g>}
        {t >= m('bovedas') && <g opacity={e1(t, m('bovedas'))} transform="translate(1080 740)">
          <rect x={-56} y={-56} width={112} height={100} rx={14} fill={PIZARRA} /><circle cy={-6} r={30} fill="#94a3b8" /><g transform={`rotate(${t * 40} 0 -6)`}>{[0, 60, 120].map((a) => <rect key={a} x={-3} y={-34} width={6} height={56} rx={3} fill={PIZARRA} transform={`rotate(${a} 0 -6)`} />)}</g>
        </g>}
        {t >= m('copiar') && <g opacity={e1(t, m('copiar')) * (1 - ac(t, m('celula') - 0.3, m('celula')))}><Letrero x={330} y={180} texto="No es copiar" fondo={ROJO_M} id={ID} /></g>}
        {t >= m('celula') && <g opacity={e1(t, m('celula'))}><Letrero x={330} y={180} texto="La célula completa" fondo={`url(#${ID}-marca)`} id={ID} /></g>}
      </Toma>
    </Lienzo>
  );
};
