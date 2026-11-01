import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Cruz, Visto, Rotulo, Persona, Txt, Bloque, Reloj, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, escribe, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «La secuencia de Monroe», en tres tomas.
 * 1 · Cinco pasos que sirven para 15 minutos o para un correo de cinco frases; un marco de los años 30 que sigue cómo
 *     decide la gente: atención, urgencia, solución, verla funcionando y recién entonces actuar.
 * 2 · La escalera de cinco peldaños: quien escucha sube uno por paso; sin el último (la acción) no llega a ninguna parte.
 * 3 · El correo de ejemplo se escribe frase por frase, una por paso.
 */

const ID = 'ro41';
const nombres = ['cinco', 'quince', 'correo', 'anos30', 'presta', 'urgencia', 'evalua', 'visualiza', 'actua', 'p1', 'p2', 'p3', 'p4', 'p5', 'importante', 'nada', 'ejemplo', 'ea', 'en', 'es', 'ev', 'eac', 'pregunta'] as const;
type N = typeof nombres[number];

const PASOS = [
  { txt: 'Atención', col: AZUL_M }, { txt: 'Necesidad', col: ROJO_M }, { txt: 'Satisfacción', col: VERDE },
  { txt: 'Visualización', col: VIOLETA }, { txt: 'Acción', col: NARANJA },
];

export const MonroeRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'La secuencia de Monroe'], [m('anos30'), 'Cómo decide la gente'], [m('p1'), 'Los cinco pasos'], [m('importante'), 'Sin acción, nada'], [m('ejemplo'), 'El correo de ejemplo'],
  ];

  const PP: N[] = ['p1', 'p2', 'p3', 'p4', 'p5'];
  const peldano = PP.reduce((a, n, k) => (t >= m(n) ? k : a), -1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La secuencia motivada de Monroe">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · cinco pasos, quince minutos o cinco frases */}
      <Toma t={t} a={-1} b={m('p1')} zi={1}>
        {t < m('presta') && <g opacity={1 - ac(t, m('presta') - 0.4, m('presta'))}>
          {t >= m('quince') && <g opacity={e1(t, m('quince'))}><Reloj x={340} y={420} r={110} t={t} vel={0.5} /><Letrero x={340} y={590} texto="15 minutos" fondo={AZUL_M} id={ID} /></g>}
          {t >= m('correo') && <g opacity={e1(t, m('correo'))}><rect x={720} y={300} width={260} height={220} rx={18} fill="#fff" style={sombra(0.25, 4, 12)} />{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={750} y={340 + k * 34} width={k === 4 ? 120 : 200} height={14} rx={7} fill={PASOS[k].col} opacity={0.8} />)}<Letrero x={850} y={590} texto="Un correo de 5 frases" fondo={NARANJA} id={ID} /></g>}
          {t >= m('anos30') && <Letrero x={600} y={720} texto="Un marco de los años 30, todavía válido" fondo={PIZARRA} id={ID} op={e1(t, m('anos30'))} tam={22} />}
        </g>}
        {t >= m('presta') && ([['presta', '◎'], ['urgencia', '!'], ['evalua', '?'], ['visualiza', '✓'], ['actua', '→']] as [N, string][]).map(([n, s], k) => t >= m(n) && (
          <g key={n} opacity={e1(t, m(n))}>
            <circle cx={170 + k * 215} cy={450} r={70} fill={PASOS[k].col} />
            <Txt x={170 + k * 215} y={475} textAnchor="middle" fontSize={k === 0 ? 50 : 66} fill="#fff" peso={800}>{s}</Txt>
            <Txt f="a" x={170 + k * 215} y={570} textAnchor="middle" fontSize={22} fill={c.texto} peso={700}>{['Presta atención', 'Siente urgencia', 'Evalúa', 'Lo visualiza', 'Actúa'][k]}</Txt>
            {k < 4 && <path d={`M ${245 + k * 215} 450 h 60`} stroke={c.apagado} strokeWidth={6} strokeLinecap="round" />}
          </g>
        ))}
      </Toma>

      {/* TOMA 2 · la escalera */}
      <Toma t={t} a={m('p1')} b={m('ejemplo')}>
        {PASOS.map((p, k) => <g key={p.txt} opacity={t >= m(PP[k]) ? e1(t, m(PP[k])) : 0.25}>
          <Bloque x={220 + k * 190} y={640 - k * 90} w={190} h={56} color={t >= m(PP[k]) ? p.col : '#94a3b8'} alto={k * 10} />
          <Letrero x={220 + k * 190} y={720 - k * 90} texto={`${k + 1} · ${p.txt}`} fondo={t >= m(PP[k]) ? p.col : PIZARRA} id={ID} tam={k === 2 || k === 3 ? 18 : 20} />
        </g>)}
        {peldano >= 0 && (() => { const t0 = m(PP[peldano]); const u = sm(t, t0, t0 + 1); const k0 = Math.max(0, peldano - 1); const x = lerp(220 + k0 * 190, 220 + peldano * 190, peldano === 0 ? 1 : u); const y = lerp(620 - k0 * 90 - k0 * 10, 620 - peldano * 90 - peldano * 10, peldano === 0 ? 1 : u) - 40 * Math.sin(Math.PI * u); return <Persona id={ID} x={x} y={y} s={0.42} cuerpo={AZUL_M} />; })()}
        {peldano >= 0 && <Txt f="a" x={600} y={170} textAnchor="middle" fontSize={24} fill={c.texto}>{['Una frase que interrumpe el piloto automático', 'El problema, con los datos del A3', 'La solución, en una frase inevitable', 'Los beneficios en detalle, con datos', 'Un nombre, una fecha, un teléfono'][peldano]}</Txt>}
        {t >= m('nada') && <Letrero x={600} y={800} texto="Sin el paso 5, los otros no sirven" fondo={ROJO_M} id={ID} op={e1(t, m('nada'))} tam={22} />}
      </Toma>

      {/* TOMA 3 · el correo de ejemplo */}
      <Toma t={t} a={m('ejemplo')} b={fin + 1}>
        <rect x={180} y={170} width={840} height={600} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 14)} />
        <rect x={180} y={170} width={840} height={70} rx={22} fill={PIZARRA} /><rect x={180} y={210} width={840} height={30} fill={PIZARRA} />
        <Txt f="a" x={220} y={214} fontSize={22} fill="#fff">Para: líder de implementación</Txt>
        {([['ea', '¿Viste el último reporte del pipeline?'], ['en', 'Perdemos clientes en el traspaso a implementación.'], ['es', 'Presentemos al especialista antes del cierre.'], ['ev', 'Cada cliente sabrá quién lo acompaña desde el día 1.'], ['eac', '¿Agendamos 30 minutos esta semana?']] as [N, string][]).map(([n, txt], k) => t >= m(n) && (
          <g key={n}>
            <rect x={220} y={280 + k * 96} width={16} height={60} rx={8} fill={PASOS[k].col} />
            <Txt f="a" x={252} y={302 + k * 96} fontSize={18} fill={PASOS[k].col} peso={700}>{PASOS[k].txt}</Txt>
            <Txt f="a" x={252} y={334 + k * 96} fontSize={24} fill={c.texto}>{escribe(txt, sm(t, m(n), m(n) + 2))}</Txt>
          </g>
        ))}
      </Toma>
    </Lienzo>
  );
};
