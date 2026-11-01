import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Rol, Cuenta, Cruz, Engranaje, Edificio, Flujo, Hoja, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «Orquestación tecnológica: el tejido conectivo», en tres tomas.
 * 1 · El CRM es un núcleo (un cilindro de datos) del que salen hilos; arriba, un tablero da visibilidad. Una
 *     oportunidad que queda fuera se desvanece: no existió. A la izquierda, extracción y enrutamiento (Zapier,
 *     LeadIQ) llenan fichas solas, con engranajes y sin clics; a la derecha, la inteligencia de conversaciones
 *     (Fireflies, Gong) convierte la voz en texto que entra al núcleo.
 * 2 · Qué CRM según el tamaño: una torre (Salesforce), un edificio mediano (HubSpot), una tienda (Pipedrive) y
 *     una oficina plana (Monday).
 * 3 · Lo importante no es la marca: las planillas sueltas y lo que vive en la memoria entran al núcleo; la
 *     maraña de relaciones de Graicunas la absorbe el software y al líder se le llena su ancho de banda.
 */

const ID = 'eq15';
const nombres = ['tejido', 'visibilidad', 'fuente', 'noexistio', 'extraccion', 'zapier', 'clics', 'conversaciones', 'gong', 'elegir', 'salesforce', 'hubspot', 'pipedrive', 'monday', 'marca', 'planillas', 'graicunas', 'ancho', 'pregunta'] as const;
type N = typeof nombres[number];

const Nucleo: React.FC<{ x: number; y: number; s?: number; t: number; id: string; brillo?: number }> = ({ x, y, s = 1, t, id, brillo = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={150} fill={NARANJA} opacity={0.1 + 0.08 * brillo * (0.6 + 0.4 * Math.sin(t * 3))} />
    {[40, 0, -40].map((dy, k) => <g key={k}>
      <rect x={-80} y={dy - 20} width={160} height={40} fill={`url(#${id}-marca)`} opacity={1 - k * 0.12} />
      <ellipse cx={0} cy={dy + 20} rx={80} ry={22} fill={`url(#${id}-marca)`} opacity={1 - k * 0.12} />
    </g>)}
    <ellipse cx={0} cy={-60} rx={80} ry={22} fill="#fda4af" />
    {[0, 1, 2].map((k) => <circle key={k} cx={50} cy={-20 + k * 40} r={5} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 4 + k)} />)}
    <text x={0} y={18} textAnchor="middle" fontFamily="Ubuntu" fontWeight={800} fontSize={36} fill="#fff">CRM</text>
  </g>
);

export const StackEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Orquestación tecnológica'], [m('tejido'), 'El tejido conectivo'], [m('visibilidad'), 'Visibilidad sin microgestión'], [m('fuente'), 'La única fuente de verdad'], [m('noexistio'), 'Si no está, no existió'],
    [m('extraccion'), 'Extracción y enrutamiento'], [m('clics'), 'Sin que nadie haga clics'], [m('conversaciones'), 'Inteligencia de conversaciones'],
    [m('elegir'), '¿Qué CRM elegir?'], [m('salesforce'), 'Enterprise: Salesforce'], [m('hubspot'), 'Mid-Market: HubSpot'], [m('pipedrive'), 'Pymes: Pipedrive'], [m('monday'), 'Equipos planos: Monday'],
    [m('marca'), 'No importa la marca'], [m('planillas'), 'Nada en planillas sueltas'], [m('graicunas'), 'Se cierra el círculo: Graicunas'], [m('ancho'), 'Ancho de banda estratégico'],
  ];

  const hilos: [number, number][] = [[320, 330], [300, 600], [880, 330], [900, 600], [600, 240], [600, 720]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Orquestación tecnológica">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · el núcleo y lo que lo alimenta */}
      <Toma t={t} a={-1} b={m('elegir')} zi={1}>
        {t >= m('tejido') && hilos.map(([x, y], k) => <path key={k} d={`M 600 480 Q ${(600 + x) / 2 + 30 * Math.sin(k)} ${(480 + y) / 2 - 30} ${x} ${y}`} stroke={NARANJA} strokeWidth={3} fill="none" opacity={0.35 * e1(t, m('tejido') + k * 0.1)} strokeDasharray="6 8" strokeDashoffset={-t * 20} />)}
        <g opacity={e1(t, 0.3)}><Nucleo x={600} y={480} t={t} id={ID} brillo={t >= m('fuente') ? 1 : 0} /></g>
        {t >= m('visibilidad') && <g opacity={e1(t, m('visibilidad')) * (1 - ac(t, m('extraccion') - 0.4, m('extraccion')))}>
          <rect x={500} y={180} width={200} height={110} rx={14} fill="#1f2937" />
          {[0, 1, 2, 3, 4].map((k) => { const h = 20 + 50 * (0.5 + 0.5 * Math.sin(t * 1.2 + k)); return <rect key={k} x={518 + k * 36} y={274 - h} width={26} height={h} rx={5} fill={[NARANJA, AZUL_M, VERDE, VIOLETA, ROSA][k]} />; })}
        </g>}
        {t >= m('fuente') && <g opacity={e1(t, m('fuente'))}><Letrero x={600} y={690} texto="Única fuente de verdad" fondo={`url(#${ID}-marca)`} id={ID} /></g>}
        {t >= m('noexistio') && t < m('extraccion') + 0.5 && (() => { const u = sm(t, m('noexistio') + 0.4, m('noexistio') + 2); return (
          <g opacity={(1 - u) * (1 - ac(t, m('extraccion'), m('extraccion') + 0.5))}>
            <Cuenta x={960} y={300} s={0.8} color="#94a3b8" />
            <Txt f="a" x={960} y={380} textAnchor="middle" fontSize={26} fill={c.tenue}>fuera del CRM</Txt>
          </g>
        ); })()}
        {/* izquierda: extracción y enrutamiento */}
        {t >= m('extraccion') && <g opacity={e1(t, m('extraccion'))}>
          <Engranaje x={220} y={460} r={44} t={t * 2} hueco={c.panel} color={AZUL_M} />
          <Engranaje x={290} y={400} r={28} t={-t * 3.2} hueco={c.panel} color="#60a5fa" />
          {[0, 1, 2].map((k) => { const ph = ((t - m('extraccion')) * 0.4 + k / 3) % 1; return <g key={k} opacity={Math.min(1, ph * 6, (1 - ph) * 6)}><Hoja x={lerp(260, 500, ph)} y={lerp(470, 480, ph) - 40 * Math.sin(Math.PI * ph)} w={40} h={52} lineas={3} /></g>; })}
        </g>}
        {t >= m('zapier') && <g opacity={e1(t, m('zapier'))}><Letrero x={200} y={260} texto="Zapier" fondo={AZUL_M} id={ID} /><Letrero x={200} y={600} texto="LeadIQ" fondo={AZUL_M} id={ID} /></g>}
        {t >= m('clics') && <g opacity={e1(t, m('clics'))} transform="translate(80 330)">
          <path d="M 0 0 L 0 36 L 10 26 L 18 42 L 24 39 L 16 23 L 30 23 Z" fill={c.texto} /><Cruz x={30} y={-6} r={14} op={sm(t, m('clics') + 0.5, m('clics') + 0.9)} />
        </g>}
        {/* derecha: inteligencia de conversaciones */}
        {t >= m('conversaciones') && <g opacity={e1(t, m('conversaciones'))}>
          {Array.from({ length: 8 }, (_, k) => { const h = 10 + 40 * Math.abs(Math.sin(t * 6 + k * 0.9)); return <rect key={k} x={880 + k * 22} y={460 - h / 2} width={12} height={h} rx={6} fill={VIOLETA} />; })}
          {[0, 1, 2].map((k) => { const ph = ((t - m('conversaciones')) * 0.45 + k / 3) % 1; return <rect key={k} x={lerp(860, 700, ph)} y={500 + k * 4} width={50} height={8} rx={4} fill={VIOLETA} opacity={Math.min(1, ph * 6, (1 - ph) * 6)} />; })}
        </g>}
        {t >= m('gong') && <g opacity={e1(t, m('gong'))}><Letrero x={1000} y={300} texto="Fireflies" fondo={VIOLETA} id={ID} /><Letrero x={1000} y={600} texto="Gong" fondo={VIOLETA} id={ID} /></g>}
      </Toma>

      {/* TOMA 2 · qué CRM según el tamaño */}
      <Toma t={t} a={m('elegir')} b={m('marca')}>
        <Suelo y={640} isDark={isDark} />
        {[
          { n: 'salesforce' as N, txt: 'Salesforce', sub: 'Enterprise', x: 200, dib: <Edificio x={200} y={640} w={130} h={330} color={AZUL_M} /> },
          { n: 'hubspot' as N, txt: 'HubSpot', sub: 'Mid-Market', x: 460, dib: <Edificio x={460} y={640} w={130} h={210} color={NARANJA} /> },
          { n: 'pipedrive' as N, txt: 'Pipedrive', sub: 'Pymes', x: 720, dib: <g><rect x={650} y={540} width={140} height={100} rx={10} fill={VERDE} /><path d="M 640 540 L 660 505 H 780 L 800 540 Z" fill="#f43f5e" /><rect x={700} y={580} width={40} height={60} rx={6} fill="#064e3b" /></g> },
          { n: 'monday' as N, txt: 'Monday', sub: 'Equipos planos', x: 990, dib: <g><rect x={880} y={570} width={220} height={70} rx={12} fill={VIOLETA} />{[0, 1, 2, 3].map((k) => <rect key={k} x={898 + k * 52} y={588} width={36} height={24} rx={5} fill="#fde68a" opacity={0.9} />)}</g> },
        ].map((o) => t >= M(o.n) && (
          <g key={o.n} opacity={e1(t, M(o.n))}>
            {o.dib}
            <Letrero x={o.x} y={700} texto={o.txt} fondo={PIZARRA} id={ID} tam={26} />
            <Txt f="a" x={o.x} y={770} textAnchor="middle" fontSize={24} fill={c.tenue}>{o.sub}</Txt>
          </g>
        ))}
        {t >= m('elegir') && t < m('salesforce') && <g opacity={e1(t, m('elegir'))}><Nucleo x={600} y={420} t={t} id={ID} s={0.8} /></g>}
      </Toma>

      {/* TOMA 3 · todo alimenta un mismo núcleo */}
      <Toma t={t} a={m('marca')} b={fin + 5}>
        <Nucleo x={600} y={460} t={t} id={ID} brillo={1} />
        {['Salesforce', 'HubSpot', 'Pipedrive', 'Monday'].map((s, k) => { const u = sm(t, m('marca') + 0.3 + k * 0.2, m('marca') + 1.6 + k * 0.2); const [x0, y0] = [[200, 230], [1000, 230], [200, 700], [1000, 700]][k]; return <g key={s} opacity={1 - sm(u, 0.7, 1)}><Letrero x={lerp(x0, 600, u)} y={lerp(y0, 460, u)} texto={s} fondo={PIZARRA} id={ID} tam={24} /></g>; })}
        {t >= m('planillas') && [0, 1, 2].map((k) => { const u = sm(t, m('planillas') + 0.6 + k * 0.3, m('planillas') + 2.2 + k * 0.3); return (
          <g key={k} opacity={e1(t, m('planillas')) * (1 - sm(u, 0.75, 1))} transform={`translate(${lerp(170 + k * 70, 600, u)} ${lerp(330 + k * 80, 460, u)}) scale(${1 - 0.6 * u})`}>
            <rect x={-40} y={-30} width={80} height={60} rx={6} fill="#fff" style={sombra(0.25, 2, 4)} />
            {[0, 1, 2].map((r) => [0, 1, 2].map((cc) => <rect key={`${r}${cc}`} x={-34 + cc * 24} y={-24 + r * 18} width={20} height={14} rx={2} fill={r === 0 ? '#16a34a' : '#dcfce7'} />))}
          </g>
        ); })}
        {t >= m('planillas') && (() => { const u = sm(t, m('planillas') + 1.5, m('planillas') + 3.2); return <g opacity={e1(t, m('planillas')) * (1 - sm(u, 0.75, 1))} transform={`translate(${lerp(1000, 600, u)} ${lerp(420, 460, u)}) scale(${1 - 0.6 * u})`}><circle r={44} fill="#fbcfe8" /><path d="M -20 -10 q 10 -16 20 0 q 10 16 20 0" stroke={ROSA} strokeWidth={5} fill="none" /><path d="M -20 10 q 10 -16 20 0 q 10 16 20 0" stroke={ROSA} strokeWidth={5} fill="none" /></g>; })()}
        {t >= m('graicunas') && (() => { const absorbe = sm(t, m('graicunas') + 1, m('graicunas') + 3); const P: [number, number][] = [[880, 260], [1000, 330], [1060, 460], [1000, 590], [880, 650]]; return (
          <g opacity={e1(t, m('graicunas'))}>
            {P.map((a, i) => P.map((b, j) => j > i && <line key={`${i}${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={AZUL_M} strokeWidth={3} opacity={0.5 * (1 - absorbe)} />))}
            {P.map(([x, y], k) => <g key={k}><line x1={x} y1={y} x2={690} y2={460} stroke={NARANJA} strokeWidth={3} opacity={0.6 * absorbe} /><circle cx={x} cy={y} r={16} fill={[AZUL_M, VERDE, VIOLETA, ROSA, AMBAR][k]} /></g>)}
          </g>
        ); })()}
        {t >= m('ancho') && <g opacity={e1(t, m('ancho'))}>
          <Rol id={ID} rol="mg" x={240} y={700} s={0.6} t={t} sigla={false} herramienta={false} />
          <rect x={140} y={330} width={200} height={34} rx={17} fill={c.apagado} opacity={0.5} />
          <rect x={140} y={330} width={200 * lerp(0.2, 0.9, sm(t, m('ancho') + 0.3, m('ancho') + 2))} height={34} rx={17} fill={VERDE} />
          <Txt f="a" x={240} y={310} textAnchor="middle" fontSize={24} fill={c.tenue}>tiempo para pensar</Txt>
        </g>}
      </Toma>
    </Lienzo>
  );
};
