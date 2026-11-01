import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Rol, Cruz, Visto, Reloj, Moneda3D, Calendario, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «El gerente silencioso: playbooks y procedimientos». A la izquierda, la silla vacía del jefe con un playbook
 * que se abre y brilla; luego, en su lugar, se levanta una torre de cuatro pisos: perfil de cliente ideal,
 * criterios de discovery, reglas de workflow y battlecards con procedimientos. A la derecha, cada piso se
 * explica con su dibujo: la diana que descarta prospectos inviables, la cadena de preguntas (SPIN, MEDDPICC)
 * que llega al dolor, a quien decide y al presupuesto; las etapas del CRM con la oportunidad que avanza; las
 * cartas de objeciones y el plazo legal de 24 horas. Al final, las ocho letras de MEDDPICC y la duda de las tres
 * de la tarde que ya no espera al lunes.
 */

const ID = 'eq14';
const nombres = ['mando', 'silencioso', 'torre', 'icp', 'inviables', 'discovery', 'spin', 'deciden', 'workflow', 'ambiguedad', 'battlecards', 'h24', 'escalar', 'ocho', 'tarde', 'lunes', 'pregunta'] as const;
type N = typeof nombres[number];

const PISOS: { n: N; txt: string; color: string; y: number }[] = [
  { n: 'icp', txt: 'ICP', color: AZUL_M, y: 620 },
  { n: 'discovery', txt: 'Discovery', color: VIOLETA, y: 505 },
  { n: 'workflow', txt: 'Workflow', color: NARANJA, y: 390 },
  { n: 'battlecards', txt: 'Battlecards', color: VERDE, y: 275 },
];

export const SilenciosoEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'El gerente silencioso'], [m('mando'), 'El conocimiento asume el mando'], [m('silencioso'), 'El gerente silencioso'], [m('torre'), 'Cuatro capas, como una torre'],
    [m('icp'), '1 · Perfil de cliente ideal'], [m('inviables'), 'Sin prospectos inviables'], [m('discovery'), '2 · Criterios de discovery'], [m('spin'), 'SPIN o MEDDPICC'], [m('deciden'), 'Dolor, decisores, presupuesto'],
    [m('workflow'), '3 · Reglas de workflow'], [m('ambiguedad'), 'Sin ambigüedad'], [m('battlecards'), '4 · Battlecards y SOP'], [m('h24'), 'Revisión legal en 24 h'], [m('escalar'), 'Resolver sin escalar'],
    [m('ocho'), 'Las ocho preguntas de MEDDPICC'], [m('tarde'), 'La duda de las tres de la tarde'], [m('lunes'), 'Ya no espera al lunes'],
  ];

  const silla = 1 - ac(t, m('torre') - 0.3, m('torre') + 0.5);
  const abre = sm(t, m('silencioso'), m('silencioso') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El gerente silencioso">
      <Rotulo t={t} lista={rotulos} id={ID} />
      <Suelo y={730} isDark={isDark} x0={120} x1={560} />

      {/* la silla vacía con el playbook */}
      {silla > 0.01 && <g opacity={silla * e1(t, m('mando'))}>
        <rect x={250} y={420} width={150} height={150} rx={20} fill={PIZARRA} />
        <rect x={230} y={560} width={190} height={34} rx={12} fill="#475569" />
        <rect x={250} y={594} width={14} height={136} fill="#475569" /><rect x={386} y={594} width={14} height={136} fill="#475569" />
        <g transform="translate(325 540)">
          {abre > 0.05 && <circle r={70} fill={AMBAR} opacity={0.22 * abre * (0.8 + 0.2 * Math.sin(t * 3))} />}
          <path d={`M 0 0 L ${-60 * abre - 6} ${-8 * abre} V ${-50 - 6 * abre} L 0 -46 Z`} fill={NARANJA} />
          <path d={`M 0 0 L ${60 * abre + 6} ${-8 * abre} V ${-50 - 6 * abre} L 0 -46 Z`} fill={ROSA} />
          {abre > 0.5 && [0, 1, 2].map((k) => <rect key={k} x={12} y={-38 + k * 10} width={36} height={4} rx={2} fill="#fff" opacity={0.8} />)}
        </g>
        {t >= m('silencioso') && <Letrero x={325} y={790} texto="Playbook" fondo={`url(#${ID}-marca)`} id={ID} />}
      </g>}

      {/* la torre de cuatro pisos */}
      {PISOS.map((p, k) => {
        const t0 = M(p.n); if (t < t0) return null;
        const u = sm(t, t0, t0 + 0.7);
        return (
          <g key={p.n} opacity={u} transform={`translate(0 ${-140 * (1 - u)})`}>
            <rect x={150} y={p.y} width={380} height={105} rx={18} fill={p.color} style={sombra(c.sombra, 5, 10)} />
            <rect x={340} y={p.y} width={190} height={105} rx={18} fill="#000" opacity={0.1} />
            <g transform={`translate(205 ${p.y + 52})`}>
              {k === 0 && [30, 20, 10].map((r, j) => <circle key={r} r={r} fill={j % 2 ? '#fff' : AZUL_M} stroke="#fff" strokeWidth={j === 0 ? 4 : 0} />)}
              {k === 1 && <Txt x={0} y={14} textAnchor="middle" fontSize={44} fill="#fff" peso={800}>?</Txt>}
              {k === 2 && [0, 1, 2].map((j) => <rect key={j} x={-30 + j * 22} y={-8} width={18} height={16} rx={4} fill="#fff" opacity={0.5 + 0.25 * j} />)}
              {k === 3 && [0, 1].map((j) => <rect key={j} x={-22 + j * 14} y={-22 + j * 6} width={30} height={40} rx={6} fill="#fff" opacity={0.7 + 0.3 * j} transform={`rotate(${-10 + j * 16})`} />)}
            </g>
            <Txt f="a" x={260} y={p.y + 64} fontSize={32} fill="#fff">{p.txt}</Txt>
          </g>
        );
      })}

      {/* DERECHA · cada piso en detalle */}
      <Toma t={t} a={m('icp')} b={m('discovery')} cx={870} cy={460}>
        {[60, 44, 28, 12].map((r, j) => <circle key={r} cx={870} cy={430} r={r * 2.2} fill={j % 2 ? c.panel : AZUL_M} opacity={j % 2 ? 1 : 0.85} />)}
        {[[760, 330], [990, 320], [700, 520], [1040, 540], [880, 410], [850, 460], [905, 445]].map(([x, y], j) => { const dentro = j >= 4; const fuera = !dentro && t >= m('inviables'); return <g key={j}><circle cx={x} cy={y} r={12} fill={dentro ? '#fff' : fuera ? '#94a3b8' : AMBAR} opacity={fuera ? 0.6 : 1} />{fuera && <Cruz x={x + 18} y={y - 18} r={11} op={sm(t, m('inviables') + j * 0.15, m('inviables') + 0.4 + j * 0.15)} />}</g>; })}
        <Letrero x={870} y={640} texto="Tamaño y facturación" fondo={AZUL_M} id={ID} tam={24} />
      </Toma>
      <Toma t={t} a={m('discovery')} b={m('workflow')} cx={870} cy={460}>
        {[0, 1, 2].map((k) => <g key={k} opacity={e1(t, m('discovery') + k * 0.4)}>
          <rect x={660 + k * 150} y={230 + k * 60} width={120} height={70} rx={24} fill={VIOLETA} opacity={0.85 - k * 0.15} />
          <Txt x={720 + k * 150} y={278 + k * 60} textAnchor="middle" fontSize={38} fill="#fff" peso={800}>¿?</Txt>
          {k < 2 && <path d={`M ${780 + k * 150} ${265 + k * 60} L ${810 + k * 150} ${290 + k * 60}`} stroke={VIOLETA} strokeWidth={6} strokeLinecap="round" />}
        </g>)}
        {t >= m('spin') && <g opacity={e1(t, m('spin'))}><Letrero x={760} y={470} texto="SPIN" fondo={VIOLETA} id={ID} /><Letrero x={960} y={470} texto="MEDDPICC" fondo={VIOLETA} id={ID} /></g>}
        {t >= m('deciden') && <g opacity={e1(t, m('deciden'))}>
          <g transform="translate(720 600)"><path d="M 6 -34 L -14 4 H 2 L -6 34 L 16 -6 H 0 Z" fill={ROJO_M} /></g>
          <g><Persona id={ID} x={870} y={640} s={0.36} cuerpo={PIZARRA} /><path d="M 852 566 l 0 -14 l 9 8 l 9 -12 l 9 12 l 9 -8 l 0 14 Z" fill={AMBAR} /></g>
          <Moneda3D x={1020} y={605} r={26} giro={Math.cos(t * 2)} />
          {['Dolor', 'Decide', 'Presupuesto'].map((s, j) => <Txt key={s} f="a" x={720 + j * 150} y={690} textAnchor="middle" fontSize={24} fill={c.tenue}>{s}</Txt>)}
        </g>}
      </Toma>
      <Toma t={t} a={m('workflow')} b={m('battlecards')} cx={870} cy={460}>
        {(() => { const avance = 4 * sm(t, m('workflow') + 0.8, m('battlecards') - 1); return (
          <g>
            {[0, 1, 2, 3, 4].map((k) => <g key={k}>
              <rect x={630 + k * 100} y={360} width={84} height={120} rx={14} fill={k <= avance ? NARANJA : c.apagado} opacity={k <= avance ? 0.9 : 0.5} />
              {t >= m('ambiguedad') && k <= avance && <Visto x={672 + k * 100} y={520} r={16} op={sm(t, m('ambiguedad') + k * 0.2, m('ambiguedad') + 0.4 + k * 0.2)} />}
            </g>)}
            <circle cx={672 + avance * 100} cy={420} r={18} fill="#fff" style={sombra(0.3, 2, 4)} />
            <Letrero x={870} y={290} texto="Etapas del CRM" fondo={NARANJA} id={ID} />
          </g>
        ); })()}
      </Toma>
      <Toma t={t} a={m('battlecards')} b={m('ocho')} cx={870} cy={460}>
        {[0, 1, 2].map((k) => <g key={k} transform={`translate(${780 + k * 70} 360) rotate(${-14 + k * 14})`} opacity={e1(t, m('battlecards') + k * 0.2)}>
          <rect x={-55} y={-80} width={110} height={160} rx={14} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
          <rect x={-55} y={-80} width={110} height={34} rx={14} fill={VERDE} /><rect x={-55} y={-60} width={110} height={14} fill={VERDE} />
          {[0, 1, 2].map((j) => <rect key={j} x={-40} y={-30 + j * 24} width={j === 2 ? 50 : 80} height={9} rx={4} fill={c.apagado} />)}
        </g>)}
        {t >= m('h24') && <g opacity={e1(t, m('h24'))}><Reloj x={700} y={590} r={46} t={t} vel={2} aro={VERDE} /><Letrero x={850} y={590} texto="Legal: 24 h" fondo={VERDE} id={ID} ancla="start" /></g>}
        {t >= m('escalar') && <g opacity={e1(t, m('escalar'))}>
          <path d="M 1080 480 V 300" stroke="#94a3b8" strokeWidth={8} strokeDasharray="12 10" /><path d="M 1066 312 L 1080 290 L 1094 312 Z" fill="#94a3b8" />
          <Cruz x={1080} y={390} r={22} />
        </g>}
      </Toma>
      <Toma t={t} a={m('ocho')} b={fin + 5} cx={870} cy={460}>
        {'MEDDPICC'.split('').map((l, k) => { const on = t >= m('ocho') + 0.3 + k * 0.45; return (
          <g key={k} opacity={on ? 1 : 0.35}>
            <rect x={620 + (k % 4) * 128} y={230 + Math.floor(k / 4) * 110} width={104} height={90} rx={18} fill={on ? VIOLETA : c.apagado} />
            <Txt x={672 + (k % 4) * 128} y={292 + Math.floor(k / 4) * 110} textAnchor="middle" fontSize={50} fill="#fff" peso={800}>{l}</Txt>
          </g>
        ); })}
        {t >= m('tarde') && <g opacity={e1(t, m('tarde'))}>
          <Reloj x={700} y={560} r={50} t={3} vel={1} aro={AMBAR} />
          <Txt f="a" x={700} y={650} textAnchor="middle" fontSize={26} fill={c.texto}>15:00</Txt>
          <Rol id={ID} rol="ae" x={850} y={680} s={0.5} t={t} sigla={false} herramienta={false} />
          <Visto x={850} y={560} r={18} op={sm(t, m('tarde') + 0.8, m('tarde') + 1.2)} />
        </g>}
        {t >= m('lunes') && <g opacity={e1(t, m('lunes'))}>
          <Calendario x={1030} y={570} s={0.6} />
          <Txt f="a" x={1030} y={650} textAnchor="middle" fontSize={26} fill={c.tenue}>lunes</Txt>
          <Cruz x={1085} y={515} r={20} op={sm(t, m('lunes') + 0.6, m('lunes') + 1)} />
        </g>}
      </Toma>
    </Lienzo>
  );
};
