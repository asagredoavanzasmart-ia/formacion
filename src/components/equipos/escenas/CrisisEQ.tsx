import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Rol, Cifra, Moneda3D, Edificio, Flujo, Visto, Cruz, Hoja, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra, brillo } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «La crisis de la ejecución comercial», en seis tomas.
 * 1 · El tablero: cuatro medidores en rojo, medidos entre 2024 y 2026.
 * 2 · La rampa: un AE sube una rampa hacia la bandera de la cuota mientras pasan 6,2 meses; la empresa le
 *     paga un sueldo (monedas que salen) que todavía no vuelve.
 * 3 · La cuota: de diez ejecutivos, la barra llega al 48 %; los demás quedan en gris, sin cubrir su costo.
 * 4 · La brecha: dos barras, 89 % documenta y 36 % aplica; entre ellas, 53 puntos. Los manuales a la carpeta.
 * 5 · Las personas nuevas: una persona joven pregunta «¿cómo voy?» a una silla vacía (46 %) y sale por la puerta.
 * 6 · Una misma historia: los cuatro números sobre un plano agrietado; un líder con demasiadas personas; se
 *     cambia a todo el equipo y los números quedan iguales.
 */

const ID = 'eq02';
const nombres = ['cuatro', 'fechas', 'rampa', 'meses62', 'maximo', 'sueldo', 'p48', 'mitad', 'brecha', 'p89', 'p36', 'carpeta', 'genz', 'retro', 'rotacion', 'historia', 'sistemica', 'tramo', 'cambiaras', 'mismos', 'pregunta'] as const;
type N = typeof nombres[number];

const Medidor: React.FC<{ x: number; y: number; v: number; t: number; color: string; c: ReturnType<typeof tono> }> = ({ x, y, v, t, color, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-110} y={-100} width={220} height={170} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
    <path d="M -70 30 A 70 70 0 0 1 70 30" stroke={c.apagado} strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d="M -70 30 A 70 70 0 0 1 70 30" stroke={color} strokeWidth={16} fill="none" strokeLinecap="round" strokeDasharray={220} strokeDashoffset={220 * (1 - v)} />
    <line x1={0} y1={30} x2={0} y2={-34} stroke={c.texto} strokeWidth={6} strokeLinecap="round" transform={`rotate(${-90 + 180 * v + 3 * Math.sin(t * 9)} 0 30)`} />
    <circle cy={30} r={9} fill={c.texto} />
  </g>
);

export const CrisisEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'La crisis de la ejecución'], [m('cuatro'), 'Cuatro indicadores B2B'], [m('fechas'), 'Medidos entre 2024 y 2026'],
    [m('rampa'), 'El tiempo de rampa'], [m('maximo'), 'Un máximo histórico'], [m('sueldo'), 'Un sueldo que no se recupera'],
    [m('p48'), 'Solo el 48 % logra su cuota'], [m('mitad'), 'Más de la mitad no cubre su costo'],
    [m('brecha'), 'La brecha de ejecución'], [m('carpeta'), 'Manuales en una carpeta'],
    [m('genz'), 'Las personas nuevas'], [m('retro'), 'Sin retroalimentación'], [m('rotacion'), 'Rotación temprana'],
    [m('historia'), 'Una misma historia'], [m('sistemica'), 'Una falla de diseño'], [m('tramo'), 'Tramo de control'], [m('cambiaras'), 'Mismo diseño…'], [m('mismos'), '…mismos números'],
  ];

  const meses = 6.2 * ac(t, m('meses62') - 0.3, m('meses62') + 2.2);
  const subida = Math.min(1, meses / 6.2);
  const p48 = ac(t, m('p48'), m('p48') + 1.6);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La crisis de la ejecución comercial">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · el tablero de cuatro indicadores */}
      <Toma t={t} a={-1} b={m('rampa')} zi={1}>
        {[0, 1, 2, 3].map((k) => t >= m('cuatro') + k * 0.25 && (
          <g key={k} opacity={e1(t, m('cuatro') + k * 0.25)}><Medidor x={195 + k * 270} y={420} v={0.18 + 0.05 * k} t={t + k} color={ROJO_M} c={c} /></g>
        ))}
        {t >= m('cuatro') && ['Rampa', 'Cuota', 'Brecha', 'Personas'].map((s, k) => <Txt key={s} f="a" x={195 + k * 270} y={560} textAnchor="middle" fontSize={28} fill={c.tenue} opacity={e1(t, m('cuatro') + k * 0.25)}>{s}</Txt>)}
        {t >= m('fechas') && <Letrero x={600} y={660} texto="2024 – 2026 · B2B" fondo={PIZARRA} id={ID} op={e1(t, m('fechas'))} />}
      </Toma>

      {/* TOMA 2 · la rampa del AE */}
      <Toma t={t} a={m('rampa')} b={m('p48')}>
        <Suelo y={700} isDark={isDark} />
        <path d="M 160 700 L 760 360 L 760 700 Z" fill={isDark ? '#3f3f46' : '#e5e7eb'} />
        <rect x={756} y={250} width={8} height={110} fill="#64748b" />
        <path d="M 764 250 H 860 L 840 278 L 860 306 H 764 Z" fill={VERDE} />
        <Txt f="a" x={800} y={236} textAnchor="middle" fontSize={26} fill={c.texto}>100 % cuota</Txt>
        <Rol id={ID} rol="ae" x={lerp(220, 700, subida)} y={lerp(666, 392, subida)} s={0.55} t={t} sigla={false} />
        {/* calendario de meses */}
        {t >= m('meses62') && <g opacity={e1(t, m('meses62'))}>
          {Array.from({ length: 7 }, (_, k) => { const lleno = Math.min(1, Math.max(0, meses - k)); return <g key={k}><rect x={160 + k * 62} y={170} width={52} height={60} rx={10} fill={c.apagado} opacity={0.5} /><rect x={160 + k * 62} y={230 - 60 * lleno} width={52} height={60 * lleno} rx={10} fill={NARANJA} /></g>; })}
          <Cifra x={160} y={300} valor={6.2} u={meses / 6.2} dec={1} suf=" meses" tam={52} color={c.texto} ancla="start" />
        </g>}
        {t >= m('maximo') && <Letrero x={1010} y={150} texto="Máximo histórico" fondo={ROJO_M} id={ID} op={e1(t, m('maximo'))} />}
        {/* el sueldo que sale */}
        {t >= m('sueldo') && <g opacity={e1(t, m('sueldo'))}>
          <Edificio x={1020} y={700} w={130} h={200} color={PIZARRA} />
          {Array.from({ length: 4 }, (_, k) => { const ph = ((t - m('sueldo')) * 0.45 + k / 4) % 1; const x = lerp(960, lerp(260, 680, subida), ph), y = lerp(560, lerp(560, 300, subida), ph) - 90 * Math.sin(Math.PI * ph); return <g key={k} opacity={Math.min(1, ph * 6, (1 - ph) * 6)}><Moneda3D x={x} y={y} r={16} giro={Math.cos(t * 6 + k)} /></g>; })}
          <Letrero x={1020} y={760} texto="Sueldo sin retorno" fondo={AMBAR} id={ID} />
        </g>}
      </Toma>

      {/* TOMA 3 · solo el 48 % logra su cuota */}
      <Toma t={t} a={m('p48')} b={m('brecha')}>
        <Suelo y={560} isDark={isDark} />
        {Array.from({ length: 10 }, (_, k) => { const logra = k < 5; const gris = !logra && t >= m('mitad'); return (
          <g key={k} opacity={e1(t, m('p48') + k * 0.06)}>
            <Persona id={ID} x={150 + k * 100} y={560} s={0.44} cuerpo={gris ? '#94a3b8' : NARANJA} corbata />
            {logra && p48 > 0.5 && <path d={`M ${150 + k * 100} 400 v -50 l 30 10 l -30 10`} fill={VERDE} stroke={VERDE} strokeWidth={4} opacity={sm(t, m('p48') + 0.8 + k * 0.1, m('p48') + 1.2 + k * 0.1)} />}
            {gris && <Txt x={150 + k * 100} y={380} textAnchor="middle" fontSize={30} fill={ROJO_M} opacity={sm(t, m('mitad') + k * 0.08, m('mitad') + 0.4 + k * 0.08)}>−$</Txt>}
          </g>
        ); })}
        <rect x={100} y={640} width={1000} height={36} rx={18} fill={c.apagado} opacity={0.5} />
        <rect x={100} y={640} width={1000 * 0.48 * p48} height={36} rx={18} fill={VERDE} opacity={1 - 0.05 * brillo(t, true)} />
        <Cifra x={100 + 1000 * 0.48 * p48 + 20} y={672} valor={48} u={p48} suf=" %" tam={44} color={c.texto} ancla="start" />
        {t >= m('mitad') && <Letrero x={830} y={740} texto="No cubren su costo" fondo={ROJO_M} id={ID} op={e1(t, m('mitad'))} />}
      </Toma>

      {/* TOMA 4 · la brecha de ejecución */}
      <Toma t={t} a={m('brecha')} b={m('genz')}>
        <Suelo y={700} isDark={isDark} x0={120} x1={760} />
        {(() => { const u89 = ac(t, m('p89'), m('p89') + 1.2), u36 = ac(t, m('p36'), m('p36') + 1.2); return (
          <g>
            <g opacity={e1(t, m('brecha'))}>
              <rect x={210} y={700 - 4.2 * 89 * u89} width={150} height={4.2 * 89 * u89} rx={14} fill={AZUL_M} />
              <rect x={500} y={700 - 4.2 * 36 * u36} width={150} height={4.2 * 36 * u36} rx={14} fill={ROSA} />
              {u89 > 0.05 && <Cifra x={285} y={700 - 4.2 * 89 * u89 - 18} valor={89} u={u89} suf=" %" tam={46} color={c.texto} />}
              {u36 > 0.05 && <Cifra x={575} y={700 - 4.2 * 36 * u36 - 18} valor={36} u={u36} suf=" %" tam={46} color={c.texto} />}
              <Txt f="a" x={285} y={740} textAnchor="middle" fontSize={28} fill={c.tenue}>Documenta</Txt>
              <Txt f="a" x={575} y={740} textAnchor="middle" fontSize={28} fill={c.tenue}>Aplica</Txt>
            </g>
            {u36 > 0.9 && <g opacity={sm(t, m('p36') + 1.2, m('p36') + 1.8)}>
              <rect x={680} y={700 - 4.2 * 89} width={8} height={4.2 * 53} rx={4} fill={ROJO_M} />
              <rect x={666} y={700 - 4.2 * 89} width={36} height={8} rx={4} fill={ROJO_M} /><rect x={666} y={700 - 4.2 * 36 - 8} width={36} height={8} rx={4} fill={ROJO_M} />
              <Txt x={712} y={700 - 4.2 * 62} fontSize={44} fill={ROJO_M} peso={800}>53 pts</Txt>
            </g>}
          </g>
        ); })()}
        {t >= m('carpeta') && (() => { const u = sm(t, m('carpeta') + 0.3, m('carpeta') + 1.5); return (
          <g opacity={e1(t, m('carpeta'))} transform="translate(1000 560)">
            <rect x={-110} y={-90} width={220} height={150} rx={14} fill="#b45309" />
            {[0, 1, 2].map((k) => <Hoja key={k} x={-50 + k * 50} y={lerp(-150, -10, u)} w={70} h={92} lineas={4} />)}
            <path d={`M -110 ${-90 + 80 * u} H 110 V 60 H -110 Z`} fill="#d97706" />
            <rect x={-30} y={-10} width={60} height={14} rx={7} fill="#fde68a" opacity={u} />
            <Letrero x={0} y={120} texto="Se quedan aquí" fondo={PIZARRA} id={ID} />
          </g>
        ); })()}
      </Toma>

      {/* TOMA 5 · las personas nuevas */}
      <Toma t={t} a={m('genz')} b={m('historia')}>
        <Suelo y={700} isDark={isDark} />
        {(() => { const sale = sm(t, m('rotacion') + 0.4, m('rotacion') + 2.6); return (
          <g>
            {/* puerta */}
            <rect x={1000} y={460} width={120} height={240} rx={10} fill={isDark ? '#4b5563' : '#cbd5e1'} />
            <path d={`M 1000 460 L ${1000 + 120 * (1 - 0.7 * sm(t, m('rotacion'), m('rotacion') + 0.6))} ${460 + 20 * sm(t, m('rotacion'), m('rotacion') + 0.6)} V ${700 - 10 * sm(t, m('rotacion'), m('rotacion') + 0.6)} L 1000 700 Z`} fill="#92400e" />
            {/* silla vacía del líder */}
            <g opacity={e1(t, m('retro'))}>
              <rect x={150} y={560} width={110} height={18} rx={8} fill="#475569" /><rect x={150} y={450} width={16} height={128} rx={8} fill="#475569" /><rect x={160} y={578} width={10} height={122} fill="#475569" /><rect x={240} y={578} width={10} height={122} fill="#475569" />
              <Txt x={205} y={420} textAnchor="middle" fontSize={44} fill={c.tenue}>…</Txt>
            </g>
            <g opacity={1 - sm(t, m('rotacion') + 2.2, m('rotacion') + 2.8)}>
              <Persona id={ID} x={lerp(400, 1060, sale)} y={700 - (sale > 0 && sale < 1 ? 4 * Math.abs(Math.sin(t * 8)) : 0)} s={0.62} cuerpo={VIOLETA} pelo="#7c2d12" />
            </g>
            {t >= m('genz') && sale < 0.2 && <g opacity={e1(t, m('genz')) * (1 - sm(t, m('rotacion'), m('rotacion') + 0.4))}>
              <rect x={330} y={330} width={250} height={80} rx={30} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
              <path d="M 400 410 L 410 440 L 432 410 Z" fill={c.panel} />
              <Txt f="a" x={455} y={382} textAnchor="middle" fontSize={32} fill={c.texto}>¿Cómo voy?</Txt>
            </g>}
            {t >= m('retro') && <g opacity={e1(t, m('retro'))}>
              <Cifra x={640} y={250} valor={46} u={ac(t, m('retro'), m('retro') + 1.3)} suf=" %" tam={84} color={VIOLETA} ancla="start" />
              <Txt f="a" x={640} y={300} fontSize={28} fill={c.tenue}>sin retroalimentación</Txt>
            </g>}
            {t >= m('rotacion') && <Letrero x={1060} y={760} texto="Rotación" fondo={ROJO_M} id={ID} op={e1(t, m('rotacion'))} />}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 6 · una misma historia: falla de diseño */}
      <Toma t={t} a={m('historia')} b={fin + 5}>
        {/* los cuatro números */}
        {[['6,2 meses', NARANJA], ['48 %', VERDE], ['53 pts', ROJO_M], ['46 %', VIOLETA]].map(([s, col], k) => (
          <g key={k} opacity={e1(t, m('historia') + k * 0.2)}><Letrero x={195 + k * 270} y={170} texto={s} fondo={col} id={ID} tam={32} /></g>
        ))}
        {/* plano agrietado */}
        {t >= m('sistemica') && <g opacity={e1(t, m('sistemica'))}>
          <rect x={150} y={250} width={480} height={300} rx={20} fill={isDark ? '#0f2a4a' : '#1e3a8a'} />
          {Array.from({ length: 7 }, (_, k) => <rect key={k} x={170 + k * 66} y={260} width={2} height={280} fill="#93c5fd" opacity={0.2} />)}
          <path d="M 260 520 V 330 L 390 280 L 520 330 V 520 Z" stroke="#e0f2fe" strokeWidth={5} fill="none" />
          <path d={`M 390 280 L 370 340 L 410 390 L 380 450 L 400 520`} stroke={ROJO_M} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={300} strokeDashoffset={300 * (1 - sm(t, m('sistemica') + 0.3, m('sistemica') + 1.3))} />
          <Letrero x={390} y={600} texto="Falla de diseño" fondo={ROJO_M} id={ID} />
        </g>}
        {/* tramo de control: un líder y demasiadas personas */}
        {t >= m('tramo') && <g opacity={e1(t, m('tramo'))}>
          <Persona id={ID} x={900} y={420} s={0.5} cuerpo={PIZARRA} corbata />
          {Array.from({ length: 6 }, (_, k) => { const x = 720 + k * 72; const nuevo = sm(t, m('cambiaras') + k * 0.15, m('cambiaras') + 0.5 + k * 0.15); return (
            <g key={k}>
              <line x1={900} y1={430} x2={x} y2={630} stroke={c.apagado} strokeWidth={3} opacity={0.7} />
              <Persona id={ID} x={x} y={720} s={0.36} cuerpo={nuevo > 0.5 ? [AZUL_M, VERDE, VIOLETA, ROSA, AMBAR, NARANJA][k] : NARANJA} pelo={nuevo > 0.5 ? ['#7c2d12', '#111', '#a16207', '#111', '#7c2d12', '#a16207'][k] : '#2b1a12'} />
            </g>
          ); })}
        </g>}
        {t >= m('mismos') && <g opacity={e1(t, m('mismos'))}><Letrero x={390} y={740} texto="Mismos números" fondo={PIZARRA} id={ID} /></g>}
      </Toma>
    </Lienzo>
  );
};
