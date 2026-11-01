import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Rol, Monitor, Cifra, Calendario, Barra, brillo, Cruz, Visto, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «Compresión radical mediante práctica simulada», en cinco tomas.
 * 1 · Un vendedor con audífonos practica frente a un comprador virtual en pantalla; el contador de repeticiones
 *     sube: de la teoría a la memoria muscular.
 * 2 · Dos curvas de aprendizaje: la tradicional sube lenta, la activa con IA sube rápido.
 * 3 · El fin del shadowing: un gerente alcanza a escuchar 5 a 10 llamadas al mes; el simulador por voz da 50 a
 *     100 escenarios en dos semanas (las fichas se voltean).
 * 4 · El simulador de vuelo: cien caídas en la cabina de práctica, un vuelo limpio en el cielo.
 * 5 · Los resultados: 49 % frente a 15 % y 57 % frente a 39 % de logro de cuota. La práctica no reemplaza al
 *     cliente real: llega con cientos de conversaciones ensayadas.
 */

const ID = 'eq13';
const nombres = ['muscular', 'virtuales', 'curvas', 'lenta', 'activa', 'shadowing', 'cincodiez', 'voz', 'cincuenta', 'vuelo', 'resultados', 'p49', 'p15', 'p57', 'p39', 'noreemplaza', 'cientos', 'pregunta'] as const;
type N = typeof nombres[number];

const Avion: React.FC<{ x: number; y: number; s?: number; rot?: number; color?: string }> = ({ x, y, s = 1, rot = 0, color = '#e2e8f0' }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -60 0 Q -50 -12 40 -10 Q 66 -8 70 0 Q 66 8 40 10 Q -50 12 -60 0 Z" fill={color} />
    <path d="M -10 -8 L -30 -50 L -14 -50 L 16 -8 Z" fill={NARANJA} /><path d="M -10 8 L -30 50 L -14 50 L 16 8 Z" fill={ROSA} />
    <path d="M -56 -2 L -66 -28 L -52 -28 L -42 -4 Z" fill={NARANJA} />
    {[10, 24, 38].map((wx) => <circle key={wx} cx={wx} cy={-2} r={3} fill="#38bdf8" />)}
  </g>
);

export const SimuladorEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Práctica simulada'], [m('muscular'), 'De la teoría a la memoria muscular'], [m('virtuales'), 'Compradores virtuales'],
    [m('curvas'), 'Dos curvas de aprendizaje'], [m('lenta'), 'Tradicional: lenta'], [m('activa'), 'Activa con IA: rápida'],
    [m('shadowing'), 'El fin del shadowing'], [m('cincodiez'), '5 a 10 llamadas al mes'], [m('voz'), 'Simuladores por voz'], [m('cincuenta'), '50 a 100 escenarios'],
    [m('vuelo'), 'Como un simulador de vuelo'], [m('resultados'), 'Logro de cuota'], [m('p57'), 'Con IA en el flujo'], [m('noreemplaza'), 'No reemplaza al cliente'], [m('cientos'), 'Cientos de conversaciones'],
  ];

  const curva = (x0: number, k: number, n = 40) => Array.from({ length: n + 1 }, (_, j) => { const u = j / n; return `${x0 + u * 760},${700 - 400 * (1 - Math.exp(-k * u * 4)) / (1 - Math.exp(-k * 4))}`; });

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Práctica simulada">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · práctica contra un comprador virtual */}
      <Toma t={t} a={-1} b={m('curvas')} zi={1}>
        <Suelo y={700} isDark={isDark} />
        <Rol id={ID} rol="sdr" x={330} y={700} s={0.85} t={t} sigla={false} />
        <Monitor x={790} y={700} w={380} h={240}>
          <rect width={380} height={240} fill="#0b1220" />
          {t >= m('virtuales') && <g opacity={e1(t, m('virtuales')) * (0.75 + 0.25 * Math.sin(t * 5))}>
            <circle cx={190} cy={90} r={40} fill="#38bdf8" opacity={0.75} />
            <path d="M 120 240 L 120 190 Q 120 140 190 140 Q 260 140 260 190 L 260 240 Z" fill="#38bdf8" opacity={0.6} />
            {Array.from({ length: 12 }, (_, k) => <rect key={k} x={0} y={k * 20} width={380} height={2} fill="#7dd3fc" opacity={0.15} />)}
          </g>}
        </Monitor>
        {t >= m('virtuales') && <Letrero x={790} y={760} texto="Comprador virtual" fondo={AZUL_M} id={ID} op={e1(t, m('virtuales'))} />}
        {t >= m('muscular') && <g opacity={e1(t, m('muscular'))}>
          <Cifra x={330} y={260} valor={Math.floor(lerp(1, 60, ac(t, m('muscular'), m('curvas') + 0.5)))} u={1} pre="× " tam={60} color={NARANJA} />
          <Txt f="a" x={330} y={300} textAnchor="middle" fontSize={26} fill={c.tenue}>repeticiones</Txt>
        </g>}
        {[0, 1].map((k) => { const ph = (t * 1.2 + k / 2) % 1; return <path key={k} d={`M ${430 + ph * 120} ${520 - 20} q 14 20 0 40`} stroke={AZUL_M} strokeWidth={5} fill="none" opacity={(1 - ph) * e1(t, m('muscular'))} strokeLinecap="round" />; })}
      </Toma>

      {/* TOMA 2 · dos curvas de aprendizaje */}
      <Toma t={t} a={m('curvas')} b={m('shadowing')}>
        <rect x={180} y={298} width={4} height={404} fill={c.apagado} /><rect x={180} y={698} width={800} height={4} fill={c.apagado} />
        <Txt f="a" x={980} y={740} textAnchor="end" fontSize={24} fill={c.tenue}>tiempo</Txt>
        <Txt f="a" x={170} y={280} fontSize={24} fill={c.tenue}>dominio</Txt>
        {t >= m('lenta') && (() => { const pts = curva(182, 0.15); const u = sm(t, m('lenta'), m('lenta') + 2.5); return <g opacity={e1(t, m('lenta'))}><polyline points={pts.slice(0, Math.max(2, Math.round(pts.length * u))).join(' ')} fill="none" stroke="#94a3b8" strokeWidth={10} strokeLinecap="round" /><Letrero x={880} y={620} texto="Tradicional" fondo="#94a3b8" id={ID} /></g>; })()}
        {t >= m('activa') && (() => { const pts = curva(182, 1.2); const u = sm(t, m('activa'), m('activa') + 2); return <g opacity={e1(t, m('activa'))}><polyline points={pts.slice(0, Math.max(2, Math.round(pts.length * u))).join(' ')} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={10} strokeLinecap="round" /><Letrero x={600} y={240} texto="Activa con IA" fondo={`url(#${ID}-marca)`} id={ID} /></g>; })()}
      </Toma>

      {/* TOMA 3 · fin del shadowing */}
      <Toma t={t} a={m('shadowing')} b={m('vuelo')}>
        <Suelo y={700} isDark={isDark} x0={60} x1={560} />
        <Suelo y={700} isDark={isDark} x0={640} x1={1140} />
        <rect x={598} y={160} width={4} height={600} rx={2} fill={c.apagado} opacity={0.6} />
        <g opacity={e1(t, m('shadowing'))}>
          <Rol id={ID} rol="mg" x={180} y={700} s={0.6} t={t} sigla={false} herramienta={false} />
          <path d="M 152 586 Q 180 556 208 586" stroke="#1f2937" strokeWidth={6} fill="none" /><rect x={144} y={580} width={14} height={22} rx={5} fill="#1f2937" /><rect x={202} y={580} width={14} height={22} rx={5} fill="#1f2937" />
        </g>
        {t >= m('cincodiez') && <g opacity={e1(t, m('cincodiez'))}>
          <Calendario x={410} y={430} s={0.85} marcados={Math.round(lerp(0, 7, sm(t, m('cincodiez'), m('cincodiez') + 2)))} />
          <Letrero x={330} y={250} texto="5–10 llamadas al mes" fondo={PIZARRA} id={ID} />
        </g>}
        {t >= m('voz') && <g opacity={e1(t, m('voz'))}>
          <Rol id={ID} rol="sdr" x={760} y={700} s={0.6} t={t} sigla={false} />
          {Array.from({ length: 9 }, (_, k) => { const h = 12 + 34 * Math.abs(Math.sin(t * 6 + k * 0.8)); return <rect key={k} x={860 + k * 16} y={560 - h / 2} width={9} height={h} rx={4} fill={TEAL} />; })}
        </g>}
        {t >= m('cincuenta') && <g opacity={e1(t, m('cincuenta'))}>
          {Array.from({ length: 24 }, (_, k) => { const vuelta = sm(t, m('cincuenta') + k * 0.08, m('cincuenta') + 0.3 + k * 0.08); return <rect key={k} x={680 + (k % 8) * 56} y={300 + Math.floor(k / 8) * 56 + 0} width={44 * Math.max(0.1, Math.abs(1 - 2 * Math.min(vuelta, 0.5)) )} height={44} rx={8} fill={vuelta > 0.5 ? [TEAL, VERDE, AZUL_M][k % 3] : c.apagado} transform={`translate(${22 - 22 * Math.max(0.1, Math.abs(1 - 2 * Math.min(vuelta, 0.5)))} 0)`} />; })}
          <Letrero x={870} y={250} texto="50–100 en 2 semanas" fondo={TEAL} id={ID} />
        </g>}
      </Toma>

      {/* TOMA 4 · el simulador de vuelo */}
      <Toma t={t} a={m('vuelo')} b={m('resultados')}>
        {(() => { const ph = ((t - m('vuelo')) * 0.7) % 1; const cae = ph > 0.55; const errores = Math.min(100, Math.floor((t - m('vuelo')) * 14)); return (
          <g>
            <rect x={90} y={230} width={480} height={360} rx={30} fill="#1f2937" />
            <rect x={120} y={260} width={420} height={250} rx={16} fill="#0c4a6e" />
            <rect x={120} y={430} width={420} height={80} fill="#166534" opacity={0.7} />
            <Avion x={lerp(170, 470, ph)} y={cae ? lerp(330, 450, (ph - 0.55) / 0.45) : 330} s={0.7} rot={cae ? 35 * (ph - 0.55) / 0.45 : 0} />
            {cae && <circle cx={lerp(170, 470, ph)} cy={460} r={30 * ((ph - 0.55) / 0.45)} fill={AMBAR} opacity={0.7 * (1 - (ph - 0.55) / 0.45)} />}
            {[0, 1, 2].map((k) => <rect key={k} x={160 + k * 120} y={530} width={80} height={36} rx={10} fill={['#334155', '#475569', '#334155'][k]} />)}
            <Letrero x={330} y={650} texto={`En tierra · ${errores} errores`} fondo={ROJO_M} id={ID} tam={26} />
            <rect x={650} y={230} width={480} height={360} rx={30} fill="#7dd3fc" opacity={0.35} />
            {[0, 1].map((k) => <ellipse key={k} cx={760 + k * 220 + 20 * Math.sin(t * 0.5 + k)} cy={300 + k * 60} rx={60} ry={20} fill="#fff" opacity={0.8} />)}
            <Avion x={890 + 20 * Math.sin(t * 0.8)} y={430 + 6 * Math.sin(t * 1.3)} s={1} />
            <Visto x={1080} y={540} r={26} op={sm(t, m('vuelo') + 2, m('vuelo') + 2.5)} />
            <Letrero x={890} y={650} texto="En el aire · 1 vez" fondo={VERDE} id={ID} tam={26} />
          </g>
        ); })()}
      </Toma>

      {/* TOMA 5 · los resultados */}
      <Toma t={t} a={m('resultados')} b={fin + 5}>
        {(() => { const cl = sm(t, m('noreemplaza'), m('noreemplaza') + 0.8); return (
          <g opacity={1 - cl}>
            <Txt f="a" x={320} y={190} textAnchor="middle" fontSize={26} fill={c.tenue}>Habilitación continua</Txt>
            <Txt f="a" x={880} y={190} textAnchor="middle" fontSize={26} fill={c.tenue}>IA en el flujo de trabajo</Txt>
            <rect x={120} y={698} width={960} height={4} fill={c.apagado} />
            {t >= m('p49') && <Barra x={220} y={700} w={110} hMax={700} valor={49} u={ac(t, m('p49'), m('p49') + 1)} color={VERDE} rotulo="Continua" c={c} brillo={brillo(t, t < m('p15'))} />}
            {t >= m('p15') && <Barra x={420} y={700} w={110} hMax={700} valor={15} u={ac(t, m('p15'), m('p15') + 1)} color="#94a3b8" rotulo="Clásica" c={c} brillo={brillo(t, t >= m('p15') && t < m('p57'))} />}
            {t >= m('p57') && <Barra x={780} y={700} w={110} hMax={700} valor={57} u={ac(t, m('p57'), m('p57') + 1)} color={TEAL} rotulo="Con IA" c={c} brillo={brillo(t, t < m('p39'))} />}
            {t >= m('p39') && <Barra x={980} y={700} w={110} hMax={700} valor={39} u={ac(t, m('p39'), m('p39') + 1)} color="#94a3b8" rotulo="Sin IA" c={c} brillo={brillo(t, t >= m('p39') && t < m('noreemplaza'))} />}
          </g>
        ); })()}
        {t >= m('noreemplaza') && <g opacity={e1(t, m('noreemplaza'))}>
          <Rol id={ID} rol="ae" x={480} y={720} s={0.7} t={t} sigla={false} herramienta={false} />
          <Persona id={ID} x={760} y={720} s={0.7} cuerpo={AZUL_M} />
          <Letrero x={760} y={780} texto="Cliente real" fondo={AZUL_M} id={ID} />
        </g>}
        {t >= m('cientos') && Array.from({ length: 7 }, (_, k) => (
          <g key={k} opacity={sm(t, m('cientos') + k * 0.15, m('cientos') + 0.4 + k * 0.15)} transform={`translate(${250 + (k % 4) * 64 - Math.floor(k / 4) * 30} ${330 + Math.floor(k / 4) * 70})`}>
            <rect x={-28} y={-20} width={56} height={40} rx={14} fill={[TEAL, VERDE, AZUL_M, NARANJA][k % 4]} opacity={0.85} />
            {[-12, 0, 12].map((dx) => <circle key={dx} cx={dx} r={4} fill="#fff" />)}
          </g>
        ))}
      </Toma>
    </Lienzo>
  );
};
