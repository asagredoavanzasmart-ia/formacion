import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Rol, Hoja, Reloj, Cruz, Visto, Flujo, Calendario, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «Habilitación no es capacitación», en cinco tomas.
 * 1 · Una línea de tiempo: el evento es un destello que se apaga; el sistema es una onda que no se detiene.
 * 2 · La capacitación: una persona nueva en su primera semana recibe una pila de PDF y láminas que se
 *     desvanecen; el gerente mira el reloj, sin tiempo.
 * 3 · Aprender a nadar leyendo un libro: en el borde lo entiende todo; al entrar al agua, lo olvida.
 * 4 · La habilitación: cuatro tubos (contenido, tecnología, procesos, coaching) alimentan el camino diario del
 *     vendedor; se cortan las cadenas que lo frenan (seller drag) y un cronómetro mide el tiempo de rampa.
 * 5 · Rampa por rol: tres franjas sobre los meses (SDR o BDR, AE Mid-Market, AE Enterprise) con el primer hito.
 */

const ID = 'eq12';
const nombres = ['evento', 'sistema', 'capEvento', 'onboarding', 'pdf', 'gerente', 'nadar', 'olvida', 'enablement', 'cuatro', 'flujo', 'drag', 'metrica', 'rol', 'sdr', 'sdrSem', 'mid', 'midSem', 'ent', 'entSem', 'compleja', 'pregunta'] as const;
type N = typeof nombres[number];

const XM = (mes: number) => 260 + mes * 70;

export const HabilitarEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Habilitación ≠ capacitación'], [m('evento'), 'Un evento aislado…'], [m('sistema'), '…o un sistema continuo'],
    [m('capEvento'), 'La capacitación: un evento'], [m('onboarding'), 'Las primeras semanas'], [m('pdf'), 'Manuales que se olvidan'], [m('gerente'), 'Un gerente sin tiempo'],
    [m('nadar'), 'Nadar leyendo un libro'], [m('olvida'), 'Al entrar al agua, se olvida'],
    [m('enablement'), 'Sales Enablement'], [m('cuatro'), 'Contenido, tecnología, procesos, coaching'], [m('flujo'), 'En el flujo diario'], [m('drag'), 'Sin fricción: seller drag'], [m('metrica'), 'Métrica reina: tiempo de rampa'],
    [m('rol'), 'La rampa según el rol'], [m('sdr'), 'SDR o BDR: 2 a 3 meses'], [m('mid'), 'AE Mid-Market: 4 a 6 meses'], [m('ent'), 'AE Enterprise: 7 a 12 meses'], [m('compleja'), 'Más compleja, más continua'],
  ];

  const filas: { n: N; s: N; txt: string; a: number; b: number; h0: number; h1: number; color: string; y: number; hito: string }[] = [
    { n: 'sdr', s: 'sdrSem', txt: 'SDR o BDR', a: 2, b: 3, h0: 0.7, h1: 1.4, color: AZUL_M, y: 300, hito: '1.ª reunión' },
    { n: 'mid', s: 'midSem', txt: 'AE Mid-Market', a: 4, b: 6, h0: 1.4, h1: 2.3, color: NARANJA, y: 470, hito: '1.er negocio' },
    { n: 'ent', s: 'entSem', txt: 'AE Enterprise', a: 7, b: 12, h0: 3, h1: 4, color: ROSA, y: 640, hito: '1.er negocio' },
  ];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Habilitación no es capacitación">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · evento o sistema */}
      <Toma t={t} a={-1} b={m('capEvento')} zi={1}>
        {[[330, 'Evento', ROJO_M, 'evento'], [600, 'Sistema', VERDE, 'sistema']].map(([y, txt, col, n], k) => t >= M(n as N) && (
          <g key={k} opacity={e1(t, M(n as N))}>
            <rect x={140} y={(y as number) - 3} width={920} height={6} rx={3} fill={c.apagado} />
            <Letrero x={200} y={(y as number) - 70} texto={txt as string} fondo={col as string} id={ID} />
            {k === 0 && (() => { const u = ac(t, m('evento') + 0.3, m('evento') + 0.8) * (1 - ac(t, m('evento') + 1.2, m('evento') + 2.6)); return <g transform={`translate(420 ${y})`}>{Array.from({ length: 10 }, (_, j) => <rect key={j} x={-4} y={-20 - 50 * u} width={8} height={30 * u + 4} rx={4} fill={AMBAR} transform={`rotate(${j * 36})`} opacity={0.3 + 0.7 * u} />)}<circle r={10 + 16 * u} fill={ROJO_M} opacity={0.4 + 0.6 * u} /></g>; })()}
            {k === 1 && <polyline points={Array.from({ length: 47 }, (_, j) => `${140 + j * 20},${(y as number) - 40 * Math.abs(Math.sin(j * 0.45 - t * 2)) * sm(t, m('sistema'), m('sistema') + 0.6 + j * 0.03)}`).join(' ')} fill="none" stroke={VERDE} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
          </g>
        ))}
      </Toma>

      {/* TOMA 2 · la capacitación como evento */}
      <Toma t={t} a={m('capEvento')} b={m('nadar')}>
        <Suelo y={700} isDark={isDark} />
        <Calendario x={210} y={300} s={0.9} marcados={1} />
        <Letrero x={210} y={420} texto="Un día de taller" fondo={ROJO_M} id={ID} />
        {t >= m('onboarding') && <g opacity={e1(t, m('onboarding'))}>
          <rect x={360} y={460} width={110} height={240} rx={10} fill={isDark ? '#4b5563' : '#cbd5e1'} /><rect x={366} y={466} width={98} height={234} rx={8} fill="#92400e" opacity={0.9} />
          <Persona id={ID} x={lerp(415, 560, sm(t, m('onboarding') + 0.3, m('onboarding') + 1.6))} y={700} s={0.6} cuerpo={VIOLETA} pelo="#7c2d12" />
        </g>}
        {t >= m('pdf') && Array.from({ length: 6 }, (_, k) => { const olvido = sm(t, m('pdf') + 2 + k * 0.3, m('pdf') + 3 + k * 0.3); return (
          <g key={k} opacity={e1(t, m('pdf') + k * 0.15) * (1 - 0.85 * olvido)} transform={`translate(${700 + (k % 3) * 80} ${520 - Math.floor(k / 3) * 110 - 30 * olvido})`}>
            <Hoja x={0} y={0} w={64} h={84} lineas={4} rot={(k % 3 - 1) * 6} />
            <rect x={-26} y={-36} width={30} height={16} rx={4} fill={k % 2 ? ROJO_M : AZUL_M} />
            <Txt x={-11} y={-23} textAnchor="middle" fontSize={11} fill="#fff" peso={800}>{k % 2 ? 'PDF' : 'PPT'}</Txt>
          </g>
        ); })}
        {t >= m('gerente') && <g opacity={e1(t, m('gerente'))}>
          <Rol id={ID} rol="mg" x={1050} y={700} s={0.55} t={t} sigla={false} herramienta={false} />
          <Reloj x={1050} y={460} r={40} t={t} vel={6} aro={ROJO_M} />
        </g>}
      </Toma>

      {/* TOMA 3 · aprender a nadar leyendo un libro */}
      <Toma t={t} a={m('nadar')} b={m('enablement')}>
        {(() => { const salta = sm(t, m('olvida') - 0.6, m('olvida') + 0.4); const agita = t >= m('olvida') ? Math.sin(t * 9) : 0; return (
          <g>
            <rect x={80} y={520} width={330} height={180} fill={isDark ? '#4b5563' : '#e5e7eb'} />
            <path d={`M 410 560 ${Array.from({ length: 15 }, (_, k) => `Q ${430 + k * 48} ${552 + 10 * Math.sin(t * 2 + k)} ${458 + k * 48} 560`).join(' ')} V 760 H 410 Z`} fill="#38bdf8" opacity={0.7} />
            <rect x={410} y={600} width={720} height={160} fill="#0ea5e9" opacity={0.35} />
            {salta < 0.5
              ? <g><Persona id={ID} x={300} y={520} s={0.62} cuerpo={VIOLETA} pelo="#7c2d12" /><g transform="translate(350 445) rotate(-10)"><rect x={-28} y={-20} width={56} height={40} rx={4} fill={AZUL_M} /><rect x={-2} y={-20} width={4} height={40} fill="#fff" opacity={0.6} /></g>
                {t >= m('nadar') + 1.5 && <Visto x={300} y={380} r={24} op={sm(t, m('nadar') + 1.5, m('nadar') + 2)} />}</g>
              : <g><g transform={`translate(${lerp(300, 640, salta)} ${600 + 6 * agita})`}><circle cx={0} cy={-40} r={24} fill={`url(#${ID}-cara)`} /><path d="M -24 -48 Q 0 -78 24 -48 Q 10 -60 -24 -48 Z" fill="#7c2d12" />
                  <rect x={-50} y={-20 - 20 * agita} width={14} height={40} rx={7} fill={VIOLETA} transform={`rotate(${-30 + 30 * agita} -43 0)`} /><rect x={36} y={-20 + 20 * agita} width={14} height={40} rx={7} fill={VIOLETA} transform={`rotate(${30 - 30 * agita} 43 0)`} /></g>
                <g transform={`translate(${840 + 6 * Math.sin(t * 1.5)} 575) rotate(${8 * Math.sin(t)})`}><rect x={-28} y={-12} width={56} height={24} rx={4} fill={AZUL_M} opacity={0.85} /></g>
                <Txt x={lerp(300, 640, salta)} y={470} textAnchor="middle" fontSize={44} fill={ROJO_M} peso={800}>?</Txt></g>}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 4 · la habilitación como sistema */}
      <Toma t={t} a={m('enablement')} b={m('rol')}>
        <Suelo y={700} isDark={isDark} />
        {(['Contenido', 'Tecnología', 'Procesos', 'Coaching'] as const).map((txt, k) => t >= m('cuatro') + k * 0.4 && (
          <g key={txt} opacity={e1(t, m('cuatro') + k * 0.4)}>
            <rect x={278 + k * 210} y={300} width={44} height={180} rx={14} fill={[AZUL_M, VIOLETA, NARANJA, VERDE][k]} opacity={0.85} />
            {t >= m('flujo') && <Flujo x1={300 + k * 210} y1={480} x2={300 + k * 210 + 30} y2={590} t={t + k * 0.2} n={3} vel={0.9} arco={0} color={[AZUL_M, VIOLETA, NARANJA, VERDE][k]} r={8} />}
            <Letrero x={300 + k * 210} y={k % 2 ? 250 : 180} texto={txt} fondo={[AZUL_M, VIOLETA, NARANJA, VERDE][k]} id={ID} tam={26} />
          </g>
        ))}
        {(() => { const corta = sm(t, m('drag') + 1.2, m('drag') + 2); const vel = t >= m('drag') ? lerp(0.05, 0.16, corta) : 0.12; const ph = ((t - m('enablement')) * vel) % 1; const x = lerp(160, 1060, ph); return (
          <g opacity={e1(t, m('enablement'))}>
            {t >= m('drag') && <g opacity={1 - corta}>
              <path d={`M ${x - 20} 670 Q ${x - 60} 690 ${x - 100} 680`} stroke="#64748b" strokeWidth={6} fill="none" strokeDasharray="10 6" />
              <circle cx={x - 110} cy={676} r={22} fill="#334155" />
            </g>}
            <Rol id={ID} rol="ae" x={x} y={700 - 4 * Math.abs(Math.sin(t * 7))} s={0.55} t={t} sigla={false} />
          </g>
        ); })()}
        {t >= m('drag') && <g opacity={e1(t, m('drag')) * (1 - ac(t, m('metrica') - 0.4, m('metrica')))}><Letrero x={600} y={780} texto="Seller drag" fondo={PIZARRA} id={ID} /><Cruz x={720} y={780} r={20} op={sm(t, m('drag') + 1.2, m('drag') + 1.8)} /></g>}
        {t >= m('metrica') && <g opacity={e1(t, m('metrica'))}><Letrero x={600} y={780} texto="Tiempo de rampa" fondo={`url(#${ID}-marca)`} id={ID} /></g>}
      </Toma>

      {/* TOMA 5 · rampa por rol */}
      <Toma t={t} a={m('rol')} b={fin + 5}>
        {[0, 3, 6, 9, 12].map((mes) => <g key={mes} opacity={e1(t, m('rol'))}><rect x={XM(mes) - 1} y={220} width={2} height={480} fill={c.apagado} opacity={0.5} /><Txt f="a" x={XM(mes)} y={740} textAnchor="middle" fontSize={22} fill={c.tenue}>{mes}</Txt></g>)}
        <Txt f="a" x={XM(12)} y={775} textAnchor="end" fontSize={22} fill={c.tenue} opacity={e1(t, m('rol'))}>meses</Txt>
        {filas.map((f) => t >= M(f.n) && (
          <g key={f.n} opacity={e1(t, M(f.n))}>
            <Txt f="a" x={XM(0)} y={f.y - 40} fontSize={26} fill={c.texto}>{f.txt}</Txt>
            <rect x={XM(0)} y={f.y - 4} width={XM(12) - XM(0)} height={8} rx={4} fill={c.apagado} opacity={0.6} />
            <rect x={XM(f.a)} y={f.y - 20} width={(XM(f.b) - XM(f.a)) * sm(t, M(f.n) + 0.2, M(f.n) + 1.2)} height={40} rx={20} fill={f.color} />
            {t >= M(f.s) && <g opacity={e1(t, M(f.s))}>
              <rect x={XM(f.h0)} y={f.y - 10} width={XM(f.h1) - XM(f.h0)} height={20} rx={10} fill={f.color} opacity={0.45} />
              <path d={`M ${XM((f.h0 + f.h1) / 2)} ${f.y + 16} l 10 14 h -20 Z`} fill={f.color} />
              <Txt f="a" x={XM((f.h0 + f.h1) / 2)} y={f.y + 56} textAnchor="middle" fontSize={22} fill={c.tenue}>{f.hito}</Txt>
            </g>}
          </g>
        ))}
        {t >= m('compleja') && <g opacity={e1(t, m('compleja'))}>
          <path d="M 1150 300 V 640" stroke={`url(#${ID}-marca)`} strokeWidth={8} strokeLinecap="round" /><path d="M 1138 628 L 1150 652 L 1162 628 Z" fill={ROSA} />
        </g>}
      </Toma>
    </Lienzo>
  );
};
