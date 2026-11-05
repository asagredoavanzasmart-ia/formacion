import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Puerta, Bandera, Burbuja, Reloj, Calendario, Cifra, Suelo, Flecha, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * El líder esencialista.
 * Toma 1: la líder frente a su equipo; las tres ideas de Jeff Weiner; la puerta de contratación con integridad,
 * inteligencia e iniciativa; cada persona del equipo con una sola bandera: exactamente una prioridad (PayPal).
 * Toma 2: comunicar simple: la burbuja de Plaza Sésamo con tres formas básicas; confiar: el apretón de manos de Buffett y
 * McLane, el reloj de dos horas y el calendario de 29 días.
 * Toma 3: los «deberíamos» que se apilan y el «hagámoslo» que pone al equipo en marcha; claridad = éxito.
 */

const ID = 'es24', P = 'es-lider';

export const LiderES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('escala'), 'Quien lidera'], [m('weiner'), 'Las ideas de Jeff Weiner'], [m('contratar'), 'Contratar con criterio'], [m('prioridad'), 'Una prioridad por persona'],
    [m('simple'), 'Comunicar simple'], [m('confiar'), 'Reglas que permiten confiar'], [m('hagamoslo'), 'Hagámoslo'], [m('claridad'), 'Claridad = éxito'],
  ];
  const IDEAS = ['Menos cosas, mejor hechas', 'La información adecuada', 'Decidir rápido y bien'];
  const III = ['Integridad', 'Inteligencia', 'Iniciativa'];
  const marcha = sm(t, m('hagamoslo') + 0.6, m('hagamoslo') + 3);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El líder esencialista">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Weiner, contratar y una prioridad */}
      <Toma t={t} a={0} b={m('simple')} cy={480}>
        <Suelo y={760} isDark={isDark} x0={80} x1={1120} />
        {ventana(t, 0, m('contratar')) > 0.01 && (
          <g opacity={ventana(t, 0, m('contratar'))}>
            <Persona id={ID} x={600} y={760} s={1.15} cuerpo={NARANJA} />
            {[0, 1, 2, 3].map((k) => <Persona key={k} id={ID} x={[240, 380, 820, 960][k]} y={720} s={0.85} cuerpo={[AZUL_M, ROSA, VIOLETA, VERDE][k]} />)}
            {IDEAS.map((r, k) => <Letrero key={r} x={600} y={210 + k * 80} texto={r} fondo={[AZUL_M, VIOLETA, ROSA][k]} id={ID} tam={28} op={e1(t, m('menos') + 0.8 * k)} />)}
            {!movil && <Txt f="a" x={600} y={470} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('weiner'))}>Jeff Weiner, LinkedIn</Txt>}
          </g>
        )}
        {ventana(t, m('contratar') - 0.1, m('prioridad')) > 0.01 && (
          <g opacity={ventana(t, m('contratar') - 0.1, m('prioridad'))}>
            <g transform="translate(600 760)"><Puerta x={0} y={0} c={c} abre={0.6} /></g>
            {[0, 1, 2].map((k) => { const u = ((t - m('contratar')) * 0.25 + k / 3) % 1; const pasa = k === 0; const x = pasa ? lerp(200, 1000, u) : lerp(200, 520, Math.min(u * 1.6, 1)); return <g key={k} opacity={pasa ? 1 : 1 - Math.max(0, u - 0.6) * 2.5}><Persona id={ID} x={x} y={760} s={0.95} cuerpo={pasa ? VERDE : GRIS} /></g>; })}
            {III.map((r, k) => <Letrero key={r} x={600} y={230 + k * 70} texto={r} fondo={VERDE} id={ID} tam={26} op={e1(t, m('buffett') + 0.5 * k)} />)}
            {t >= m('kawasaki') && t < m('buffett') && <Letrero x={600} y={300} texto="Una mala contratación atrae otras" fondo={ROJO_M} id={ID} tam={26} op={e1(t, m('kawasaki'))} />}
            {!movil && t >= m('buffett') && <Txt f="a" x={960} y={300} textAnchor="middle" fontSize={22} fill={c.tenue}>Warren Buffett</Txt>}
          </g>
        )}
        {t >= m('prioridad') && (
          <g opacity={e1(t, m('prioridad'))}>
            {[0, 1, 2, 3, 4].map((k) => (
              <g key={k}>
                <Persona id={ID} x={200 + k * 200} y={760} s={0.95} cuerpo={[NARANJA, AZUL_M, ROSA, VIOLETA, VERDE][k]} />
                <Bandera x={240 + k * 200} y={600} alto={140} color={[NARANJA, AZUL_M, ROSA, VIOLETA, VERDE][k]} t={t + k} op={e1(t, m('exactamente') + 0.15 * k)} />
              </g>
            ))}
            {t >= m('exactamente') && <Letrero x={600} y={260} texto="Exactamente una prioridad cada una" id={ID} tam={28} op={e1(t, m('exactamente'))} />}
            {!movil && t >= m('thiel') && <Txt f="a" x={600} y={190} textAnchor="middle" fontSize={22} fill={c.tenue}>Peter Thiel en PayPal, según Keith Rabois</Txt>}
          </g>
        )}
      </Toma>

      {/* 2 · comunicar simple y confiar */}
      <Toma t={t} a={m('simple')} b={m('hagamoslo')} cy={480}>
        <Suelo y={760} isDark={isDark} x0={80} x1={1120} />
        {ventana(t, m('simple') - 0.1, m('confiar')) > 0.01 && (
          <g opacity={ventana(t, m('simple') - 0.1, m('confiar'))}>
            <Persona id={ID} x={280} y={760} s={1.05} cuerpo={AZUL_M} pelo="#9ca3af" corbata />
            <ellipse cx={700} cy={360} rx={360} ry={170} fill={c.panel} style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,.18))' }} />
            <path d="M 420 450 L 340 560 L 500 470 Z" fill={c.panel} />
            <circle cx={540} cy={360} r={66} fill={NARANJA} opacity={e1(t, m('sesamo'))} />
            <rect x={640} y={296} width={128} height={128} rx={14} fill={AZUL_M} opacity={e1(t, m('sesamo') + 0.3)} />
            <path d="M 870 296 L 940 424 H 800 Z" fill={VERDE} opacity={e1(t, m('sesamo') + 0.6)} />
            <Letrero x={700} y={620} texto="Fácil de entender, difícil de malinterpretar" id={ID} tam={26} op={e1(t, m('sesamo') + 1)} />
            {!movil && <Txt f="a" x={280} y={800} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('lafley'))}>A. G. Lafley, Procter & Gamble</Txt>}
          </g>
        )}
        {t >= m('confiar') && (
          <g opacity={e1(t, m('confiar'))}>
            <Persona id={ID} x={460} y={760} s={1.05} cuerpo="#334155" pelo="#e5e7eb" />
            <Persona id={ID} x={740} y={760} s={1.05} cuerpo={NARANJA} />
            <path d={`M 500 ${640 + 6 * Math.sin(t * 6)} Q 600 ${630 + 6 * Math.sin(t * 6)} 700 ${640 + 6 * Math.sin(t * 6)}`} stroke="#f7c4a0" strokeWidth={22} fill="none" strokeLinecap="round" />
            {t >= m('mclane') && <g opacity={e1(t, m('mclane'))}><Reloj x={250} y={360} r={80} t={t} /><Txt x={250} y={480} textAnchor="middle" fontSize={26} fill={c.texto}>2 horas</Txt></g>}
            {t >= m('veintinueve') && <g opacity={e1(t, m('veintinueve'))}><Calendario x={960} y={330} s={1} marcados={Math.min(29, Math.floor((t - m('veintinueve')) * 14))} /><Cifra x={960} y={470} valor={29} u={sm(t, m('veintinueve'), m('veintinueve') + 1.5)} suf=" días" tam={40} color={NARANJA} /></g>}
            {!movil && t >= m('mclane') && <Txt f="a" x={600} y={200} textAnchor="middle" fontSize={22} fill={c.tenue}>Buffett compra la distribuidora McLane</Txt>}
          </g>
        )}
      </Toma>

      {/* 3 · hagámoslo; claridad = éxito */}
      <Toma t={t} a={m('hagamoslo')} b={fin + 1} cy={480}>
        <Suelo y={760} isDark={isDark} x0={40} x1={1160} />
        <Persona id={ID} x={lerp(240, 560, marcha)} y={760} s={1.1} cuerpo={NARANJA} />
        {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={lerp(100 - k * 10, 700 + k * 140, marcha)} y={760} s={0.9} cuerpo={[AZUL_M, ROSA, VIOLETA][k]} />)}
        {['Deberíamos…', 'Deberíamos…', 'Deberíamos…'].map((d, k) => <g key={k} opacity={1 - sm(t, m('hagamoslo'), m('hagamoslo') + 0.6)}><Letrero x={300 + k * 60} y={300 + k * 60} texto={d} fondo={GRIS} id={ID} tam={26} /></g>)}
        <Burbuja x={lerp(260, 580, marcha)} y={520} w={300} texto="¡Hagámoslo!" u={sm(t, m('hagamoslo') + 0.3, m('hagamoslo') + 1)} c={c} id={ID} tam={34} marca />
        {t >= m('claridad') && (
          <g opacity={e1(t, m('claridad'))}>
            <rect x={240} y={150} width={720} height={130} rx={30} fill={c.panel} />
            <Txt x={600} y={236} textAnchor="middle" fontSize={50} fill={NARANJA}>Claridad = éxito</Txt>
          </g>
        )}
        {t >= m('hagamoslo') + 1 && <Flecha x1={700} y1={810} x2={1120} y2={810} u={marcha} color={VERDE} grosor={8} />}
      </Toma>
    </Lienzo>
  );
};
