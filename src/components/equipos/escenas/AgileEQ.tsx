import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Rol, Cruz, Visto, Cuenta, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «Rituales de autogestión». A la izquierda, un circuito con tres estaciones (sprint, daily stand-up y
 * retrospectiva) por el que gira un punto: el ciclo de mejora continua. A la derecha, cada ritual se dibuja:
 * el sprint como un carril de tres semanas al que el equipo sube las cuentas de más valor del backlog, sin la
 * flecha del jefe; el daily como tres personas de pie, un reloj de quince minutos y las tres preguntas; la
 * retrospectiva como un tablero de empezar, dejar y seguir, los seis pasos y el equipo mirando sus números.
 */

const ID = 'eq16';
const nombres = ['cortos', 'tres', 'sprint', 'semanas', 'backlog', 'directriz', 'daily', 'quince', 'preguntas', 'retro', 'empieza', 'seis', 'autocritica', 'numeros', 'democratiza', 'pregunta'] as const;
type N = typeof nombres[number];

const CX = 300, CY = 470, RC = 150;
const EST: { n: N; txt: string; color: string; a: number }[] = [
  { n: 'sprint', txt: 'Sprint', color: NARANJA, a: -Math.PI / 2 },
  { n: 'daily', txt: 'Daily', color: AZUL_M, a: Math.PI / 6 },
  { n: 'retro', txt: 'Retro', color: VERDE, a: (5 * Math.PI) / 6 },
];

export const AgileEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Rituales de autogestión'], [m('cortos'), 'Ciclos cortos y revisión honesta'], [m('tres'), 'Tres rituales'],
    [m('sprint'), 'Sprint de ventas'], [m('semanas'), 'De una a tres semanas'], [m('backlog'), 'El equipo elige del backlog'], [m('directriz'), 'Sin esperar directrices'],
    [m('daily'), 'Daily stand-up'], [m('quince'), 'Quince minutos, de pie'], [m('preguntas'), 'Tres preguntas'],
    [m('retro'), 'Retrospectiva'], [m('empieza'), 'Empezar, dejar, continuar'], [m('seis'), 'Seis fases'], [m('autocritica'), 'La autocrítica del equipo'], [m('numeros'), 'Mirando sus propios números'], [m('democratiza'), 'La mejora se democratiza'],
  ];

  let activa = -1; EST.forEach((e, k) => { if (t >= M(e.n)) activa = k; });
  const vueltas = t >= m('cortos') ? (t - m('cortos')) * 0.35 : 0;
  const pa = -Math.PI / 2 + vueltas * 2 * Math.PI;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Rituales de autogestión">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* el circuito de tres estaciones */}
      <g opacity={e1(t, m('cortos'))}>
        <circle cx={CX} cy={CY} r={RC} fill="none" stroke={c.apagado} strokeWidth={22} opacity={0.6} />
        <circle cx={CX} cy={CY} r={RC} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={8} strokeDasharray="20 18" strokeDashoffset={-t * 40} />
        {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={CX - 44 + k * 44} y={CY + 50} s={0.32} cuerpo={[NARANJA, AZUL_M, VERDE][k]} />)}
        {t >= m('cortos') && <circle cx={CX + RC * Math.cos(pa)} cy={CY + RC * Math.sin(pa)} r={14} fill="#fff" stroke={ROSA} strokeWidth={6} />}
        {t >= m('tres') && EST.map((e, k) => { const x = CX + RC * Math.cos(e.a), y = CY + RC * Math.sin(e.a); return (
          <g key={e.n} opacity={e1(t, m('tres') + k * 0.3)}>
            <circle cx={x} cy={y} r={activa === k ? 40 : 30} fill={e.color} />
            <Letrero x={x} y={k === 0 ? y - 66 : y + 66} texto={e.txt} fondo={e.color} id={ID} tam={26} />
          </g>
        ); })}
      </g>

      {/* SPRINT */}
      <Toma t={t} a={m('sprint')} b={m('daily')} cx={860} cy={460}>
        {t >= m('semanas') && <g opacity={e1(t, m('semanas'))}>
          {[0, 1, 2].map((k) => <g key={k}><rect x={640 + k * 160} y={200} width={150} height={150} rx={16} fill={NARANJA} opacity={0.12 + 0.1 * k} /><Txt f="a" x={715 + k * 160} y={236} textAnchor="middle" fontSize={24} fill={c.tenue}>{`Semana ${k + 1}`}</Txt></g>)}
        </g>}
        {t >= m('backlog') && (() => { const elige = sm(t, m('backlog') + 0.8, m('backlog') + 2.6); return (
          <g opacity={e1(t, m('backlog'))}>
            {[0, 1, 2, 3, 4].map((k) => { const top = k < 3; const x = top ? lerp(700 + k * 30, 670 + k * 160, elige) : 700 + k * 30; const y = top ? lerp(440 + k * 64, 290, elige) : 440 + k * 64; return <g key={k}><Cuenta x={x} y={y} s={0.6} color={top ? [NARANJA, ROSA, AMBAR][k] : '#94a3b8'} />{top && <Txt x={x + 30} y={y - 30} fontSize={22} fill={AMBAR} peso={800} opacity={1 - elige}>$$$</Txt>}</g>; })}
            <Letrero x={1010} y={560} texto="Backlog" fondo={PIZARRA} id={ID} />
          </g>
        ); })()}
        {t >= m('directriz') && <g opacity={e1(t, m('directriz'))}>
          <path d="M 590 170 V 260" stroke="#94a3b8" strokeWidth={8} strokeDasharray="12 10" /><path d="M 576 252 L 590 276 L 604 252 Z" fill="#94a3b8" />
          <Cruz x={590} y={210} r={22} />
        </g>}
      </Toma>

      {/* DAILY */}
      <Toma t={t} a={m('daily')} b={m('retro')} cx={860} cy={460}>
        <Suelo y={720} isDark={isDark} x0={600} x1={1140} />
        {[0, 1, 2].map((k) => <Rol key={k} id={ID} rol={(['sdr', 'ae', 'am'] as const)[k]} x={660 + k * 90} y={720} s={0.5} t={t} sigla={false} herramienta={false} />)}
        {t >= m('quince') && (() => { const u = ((t - m('quince')) / 12) % 1; const a = u * 2 * Math.PI; return (
          <g opacity={e1(t, m('quince'))} transform="translate(690 330)">
            <circle r={62} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            <path d={`M 0 0 L 0 -50 A 50 50 0 ${a > Math.PI ? 1 : 0} 1 ${50 * Math.sin(a)} ${-50 * Math.cos(a)} Z`} fill={AZUL_M} opacity={0.75} />
            <Txt x={0} y={100} textAnchor="middle" fontSize={30} fill={c.texto} peso={800}>15 min</Txt>
          </g>
        ); })()}
        {t >= m('preguntas') && ['¿Qué hice?', '¿Qué haré?', '¿Qué me bloquea?'].map((s, k) => <g key={s} opacity={e1(t, m('preguntas') + k * 0.6)}><Letrero x={970} y={280 + k * 90} texto={s} fondo={[AZUL_M, VIOLETA, ROJO_M][k]} id={ID} tam={26} /></g>)}
      </Toma>

      {/* RETROSPECTIVA */}
      <Toma t={t} a={m('retro')} b={fin + 5} cx={860} cy={460}>
        <rect x={620} y={170} width={500} height={300} rx={20} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
        {['Empezar', 'Dejar', 'Seguir'].map((s, k) => (
          <g key={s} opacity={e1(t, m('empieza') + k * 0.4)}>
            <Txt f="a" x={705 + k * 165} y={212} textAnchor="middle" fontSize={26} fill={[VERDE, ROJO_M, AZUL_M][k]}>{s}</Txt>
            {[0, 1].map((j) => <rect key={j} x={665 + k * 165} y={240 + j * 92} width={80} height={76} rx={8} fill={['#bbf7d0', '#fecdd3', '#bfdbfe'][k]} transform={`rotate(${(j ? 3 : -3)} ${705 + k * 165} ${278 + j * 92})`} />)}
          </g>
        ))}
        {t >= m('seis') && [1, 2, 3, 4, 5, 6].map((n, k) => { const on = t >= m('seis') + 0.3 + k * 0.4; return (
          <g key={n} opacity={e1(t, m('seis') + k * 0.1)}>
            <circle cx={650 + k * 88} cy={530} r={24} fill={on ? VERDE : c.apagado} />
            <Txt x={650 + k * 88} y={540} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>{n}</Txt>
            {k < 5 && <rect x={676 + k * 88} y={527} width={36} height={6} rx={3} fill={c.apagado} />}
          </g>
        ); })}
        {t >= m('autocritica') && <g opacity={e1(t, m('autocritica'))}>
          {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={680 + k * 70} y={760} s={0.4} cuerpo={[NARANJA, AZUL_M, VERDE][k]} />)}
        </g>}
        {t >= m('numeros') && <g opacity={e1(t, m('numeros'))}>
          <rect x={920} y={600} width={200} height={130} rx={14} fill="#1f2937" />
          <polyline points={Array.from({ length: 6 }, (_, k) => `${940 + k * 32},${700 - k * 12 - 8 * Math.sin(k + t)}`).join(' ')} fill="none" stroke={VERDE} strokeWidth={6} strokeLinecap="round" />
        </g>}
        {t >= m('democratiza') && <g opacity={e1(t, m('democratiza'))}>{[0, 1, 2].map((k) => { const a = t * 1.5 + (k * 2 * Math.PI) / 3; return <circle key={k} cx={750 + 120 * Math.cos(a)} cy={680 + 30 * Math.sin(a)} r={7} fill={ROSA} />; })}</g>}
      </Toma>
    </Lienzo>
  );
};
