import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Txt, Persona, Nube, Burbuja, Brujula, Edificio, Visto, e1, sm, lerp, ventana, tono, sombra, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, TEAL, AMBAR, GRIS, ROJO_M } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Identificar al comprador económico: el factor de flotación, literal.
 * 1 · El organigrama es un edificio en corte de cuatro pisos. La corona (autoridad para liberar fondos y vetar) no es
 *     estática: salta entre pisos según la venta. Luego el edificio se llena de agua y la corona pasa a una boya:
 *     el nivel del agua es el riesgo percibido y la boya sube o baja con él.
 * 2 · Cuatro cañerías vierten agua, una por variable: presupuesto (relativo al tamaño), condiciones del negocio (la
 *     tormenta lleva la decisión a los directivos), experiencia previa (primera compra) e impacto (crecimiento o
 *     estabilidad). Con cada una el agua sube y la boya llega a un piso más alto.
 * 3 · Las dos preguntas: tu empresa frente a la del cliente, a escala; ¿más arriba o más abajo?; la regla de oro sube
 *     la marca un piso por encima.
 * 4 · Confirmar: dos preguntas indirectas; el técnico que dice tener la última palabra pierde su corona de papel y el
 *     coach señala a quien de verdad decide.
 */

const ID = 'vc08', P = 'vc-economico';
type Pt = [number, number];

const Corona: React.FC<{ x: number; y: number; s?: number; op?: number; rot?: number; papel?: boolean }> = ({ x, y, s = 1, op = 1, rot = 0, papel = false }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
      <path d="M -22 10 L -24 -14 L -11 -2 L 0 -18 L 11 -2 L 24 -14 L 22 10 Z" fill={papel ? '#e5e7eb' : AMBAR} style={sombra(0.25, 2, 4)} />
      <rect x={-22} y={8} width={44} height={8} rx={4} fill={papel ? '#cbd5e1' : '#d97706'} />
      {!papel && <circle cx={0} cy={-18} r={4} fill="#fde68a" />}
    </g>
  );

/* Edificio en corte con `n` pisos entre y0 (techo) e y1 (suelo); `marca` resalta un piso (puede ser fraccional). */
const Corte: React.FC<{ x0: number; x1: number; y0: number; y1: number; n: number; c: ReturnType<typeof tono>; op?: number }> = ({ x0, x1, y0, y1, n, c, op = 1 }) => {
  const hP = (y1 - y0) / n;
  return (
    <g opacity={op}>
      <rect x={x0 - 12} y={y0 - 16} width={x1 - x0 + 24} height={y1 - y0 + 26} rx={18} fill={c.panel} style={sombra(c.sombra, 5, 14)} />
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={8} fill={c.panel2} />
      {Array.from({ length: n - 1 }, (_, k) => <rect key={k} x={x0 - 4} y={y0 + hP * (k + 1) - 4} width={x1 - x0 + 8} height={8} rx={4} fill={c.apagado} />)}
      <rect x={x0 - 12} y={y1 + 2} width={x1 - x0 + 24} height={10} rx={5} fill={c.apagado} />
    </g>
  );
};

export const EconomicoVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('autoridad'), 'Libera fondos y veta'], [m('estatico'), 'No es estático'], [m('cambia'), 'Cambia con cada venta'], [m('sube'), 'Sube o baja con el riesgo'],
    [m('flotar'), 'Factor de flotación'], [m('presupuesto'), 'Más dinero, más arriba'], [m('tamano'), 'Relativo al tamaño'], [m('condiciones'), 'Tiempos difíciles'],
    [m('directivos'), 'Sube a los directivos'], [m('experiencia'), 'Primera compra: sube'], [m('impacto'), 'Crecimiento o estabilidad'],
    [m('preguntas'), 'Dos preguntas'], [m('nivel'), '¿En qué nivel de tu empresa?'], [m('ajustando'), 'Ajusta por tamaño'], [m('riesgo'), '¿Más arriba o más abajo?'],
    [m('oro'), 'La regla de oro'], [m('encima'), 'Un nivel por encima'], [m('indirectas'), 'Confírmalo'], [m('mienten'), '«Yo decido»… no siempre'], [m('coach'), 'Mejor aún: tu coach'],
  ];

  /* 1 y 2 · el edificio-estanque */
  const X0 = 300, X1 = 640, Y0 = 180, Y1 = 780, HP = 150;
  const PISOS = ['Operación', 'Mando medio', 'Gerencia', 'Dirección'];
  const yPiso = (i: number) => Y1 - HP * i - HP / 2;
  const sube = (a: string, d: number, dur = 1.6) => d * sm(t, m(a) + 0.3, m(a) + 0.3 + dur);
  const oscila = t >= m('sube') && t < m('flotar') ? 0.7 * Math.sin((t - m('sube')) * 1.8) * sm(t, m('sube'), m('sube') + 0.8) * (1 - sm(t, m('flotar') - 0.6, m('flotar'))) : 0;
  const nivel = 1.5 * sm(t, m('sube'), m('sube') + 1.2) + oscila + sube('presupuesto', 0.35) + sube('tamano', 0.2) + sube('directivos', 1.0) + sube('primera', 0.35) + sube('crecimiento', 0.4);
  const yAgua = Y1 - HP * nivel;
  const hayAgua = t >= m('sube');
  /* la corona: en una persona (autoridad), saltando (no es estático) y luego en la boya */
  const SALTOS = [2, 1, 3, 0, 2];
  const coronaPersona = (): Pt => {
    if (t < m('cambia')) return [350, yPiso(2) - 36];
    const k = Math.min(SALTOS.length - 2, Math.floor((t - m('cambia')) / 0.85)), u = sm(t - m('cambia') - k * 0.85, 0, 0.6);
    const a = SALTOS[k], b = SALTOS[k + 1];
    return [350, lerp(yPiso(a), yPiso(b), u) - 36 - 40 * Math.sin(Math.PI * u)];
  };
  const xBoya = 530, yBoya = yAgua - 4 + 4 * Math.sin(t * 2.6);
  const aBoya = sm(t, m('sube') + 0.6, m('sube') + 1.4);
  const [cpx, cpy] = coronaPersona();
  const VARS: { a: string; nombre: string }[] = [
    { a: 'presupuesto', nombre: 'Presupuesto' }, { a: 'condiciones', nombre: 'Condiciones' }, { a: 'experiencia', nombre: 'Experiencia' }, { a: 'impacto', nombre: 'Impacto' },
  ];
  const yVar = (k: number) => yPiso(3 - k);

  /* 3 · las dos preguntas */
  const T0 = 160, T1 = 360, TY0 = 480, TY1 = 780;
  const C0 = 620, C1 = 900, CY0 = 220, CY1 = 780;
  const pisoC = 4 + sm(t, m('encima') + 0.2, m('encima') + 1);
  const hC = (CY1 - CY0) / 6;
  const yMarcaC = CY1 - hC * pisoC + hC / 2;
  const oroOn = t >= m('encima');

  /* 4 · confirmar */
  const caeCorona = sm(t, m('coach') + 0.4, m('coach') + 1.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Identificando al comprador económico">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 y 2 · el factor de flotación */}
      <Toma t={t} a={0} b={m('preguntas')} cy={470}>
        <Corte x0={X0} x1={X1} y0={Y0} y1={Y1} n={4} c={c} op={e1(t, 0.2)} />
        {hayAgua && (
          <g>
            <defs><clipPath id={`${ID}-tanque`}><rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} rx={8} /></clipPath></defs>
            <g clipPath={`url(#${ID}-tanque)`}>
              <path d={`M ${X0} ${Y1} V ${yAgua} ${Array.from({ length: 13 }, (_, k) => { const x = X0 + (k * (X1 - X0)) / 12; return `L ${x} ${yAgua + 5 * Math.sin(k * 1.1 + t * 3)}`; }).join(' ')} V ${Y1} Z`} fill={isDark ? '#0ea5e9' : '#38bdf8'} opacity={0.3} />
              {[0, 1, 2, 3, 4, 5].map((k) => { const u = (t * 0.35 + k / 6) % 1; const y = lerp(Y1 - 10, yAgua + 10, u); return y > yAgua + 8 && <circle key={k} cx={X0 + 40 + k * 52} cy={y} r={4 + (k % 3)} fill="#fff" opacity={0.5 * (1 - u)} />; })}
            </g>
          </g>
        )}
        {PISOS.map((p, i) => (
          <g key={p} opacity={e1(t, 0.4 + 0.15 * i)}>
            <Txt x={X0 - 22} y={yPiso(i) + 8} textAnchor="end" fontSize={22} fill={c.tenue}>{movil && i === 1 ? 'Mandos' : p}</Txt>
            <Persona id={ID} x={350} y={Y1 - HP * i - 8} s={0.5} cuerpo={[GRIS, TEAL, VIOLETA, AZUL_M][i]} />
          </g>
        ))}
        {t >= m('autoridad') && t < m('sube') + 1 && <Corona x={cpx} y={cpy} op={e1(t, m('autoridad')) * (1 - aBoya)} />}
        {t >= m('autoridad') && t < m('cambia') && (
          <g opacity={ventana(t, m('autoridad'), m('cambia'))} transform={`translate(440 ${yPiso(2) + 22})`}>
            <path d="M -30 30 Q -42 -10 -14 -26 L -10 -36 L 10 -36 L 14 -26 Q 42 -10 30 30 Z" fill="#b45309" />
            <Txt x={0} y={14} textAnchor="middle" fontSize={26} fill="#fff">$</Txt>
            <g transform="translate(0 -66)">
              <rect x={movil ? -70 : -44} y={movil ? -30 : -20} width={movil ? 140 : 88} height={movil ? 60 : 40} rx={10} fill={c.panel} stroke={ROJO_M} strokeWidth={4} transform="rotate(-8)" />
              <Txt x={0} y={movil ? 15 : 9} textAnchor="middle" fontSize={22} fill={ROJO_M} transform="rotate(-8)">VETO</Txt>
            </g>
          </g>
        )}
        {hayAgua && (
          <g opacity={aBoya} transform={`translate(${xBoya} ${yBoya})`}>
            <ellipse cx={0} cy={6} rx={46} ry={14} fill="#000" opacity={0.12} />
            <ellipse cx={0} cy={0} rx={44} ry={18} fill={ROJO_M} />
            {[-1, 1].map((s) => <path key={s} d={`M ${s * 18} -16 Q ${s * 30} 0 ${s * 18} 16 L ${s * 30} 14 Q ${s * 40} 0 ${s * 30} -14 Z`} fill="#fff" />)}
            <ellipse cx={0} cy={-2} rx={20} ry={7} fill={isDark ? '#0c4a6e' : '#bae6fd'} />
            <Corona x={0} y={-30} s={1.05} />
          </g>
        )}
        {t >= m('flotar') && VARS.map((v, k) => {
          const y = yVar(k), on = t >= m(v.a), op = e1(t, m('flotar') + 0.25 * k) * (on ? 1 : 0.4);
          const chorro = on ? ventana(t, m(v.a) + 0.2, m(v.a) + 2.6) : 0;
          return (
            <g key={v.a} opacity={op}>
              <rect x={X1 - 6} y={y - 9} width={72} height={18} rx={9} fill={GRIS} />
              <rect x={X1 - 6} y={y - 9} width={72} height={18} rx={9} fill={AZUL_M} opacity={0.5 * chorro} />
              {chorro > 0.01 && yAgua > y + 8 && <rect x={X1 - 22} y={y} width={12} height={yAgua - y} rx={6} fill={isDark ? '#0ea5e9' : '#38bdf8'} opacity={0.75 * chorro} />}
              {chorro > 0.01 && [0, 1, 2].map((j) => { const u = (t * 1.6 + j / 3) % 1; return <circle key={j} cx={lerp(X1 + 60, X1 - 4, u)} cy={y} r={5} fill="#fff" opacity={0.8 * chorro} />; })}
              <rect x={700} y={y - 58} width={440} height={116} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
              {on && <rect x={700} y={y - 58} width={8} height={116} rx={4} fill={`url(#${ID}-marca)`} />}
              <Txt x={830} y={y + 10} fontSize={28} fill={c.texto}>{v.nombre}</Txt>
              <g transform={`translate(764 ${y})`}>
                {k === 0 && (
                  <g>
                    {Array.from({ length: 3 + Math.round(3 * sm(t, m('tamano'), m('tamano') + 1)) }, (_, j) => (
                      <g key={j} transform={`translate(-8 ${26 - j * 9})`}><ellipse cx={0} cy={4} rx={22} ry={7} fill="#b45309" /><ellipse cx={0} cy={0} rx={22} ry={7} fill="#fbbf24" /></g>
                    ))}
                    {t >= m('tamano') && <Edificio x={34} y={34} w={22} h={38} color={AZUL_M} op={e1(t, m('tamano'))} />}
                  </g>
                )}
                {k === 1 && (
                  <g>
                    <Nube x={0} y={-6} s={0.34} t={t} color={t >= m('dificiles') ? '#475569' : GRIS} rayos={t >= m('dificiles')} />
                    {t >= m('dificiles') && [0, 1, 2, 3].map((j) => { const u = (t * 1.5 + j / 4) % 1; return <line key={j} x1={-20 + j * 13} y1={12 + 26 * u} x2={-24 + j * 13} y2={20 + 26 * u} stroke={AZUL_M} strokeWidth={3} opacity={1 - u} />; })}
                  </g>
                )}
                {k === 2 && (
                  <g transform={`scale(${t >= m('primera') ? 1 + 0.15 * Math.sin(Math.PI * sm(t, m('primera'), m('primera') + 0.5)) : 1})`}>
                    <path d="M 0 -32 L 9 -12 L 31 -10 L 14 5 L 19 27 L 0 16 L -19 27 L -14 5 L -31 -10 L -9 -12 Z" fill={t >= m('primera') ? AMBAR : GRIS} />
                    <Txt x={0} y={9} textAnchor="middle" fontSize={20} fill="#fff">1ª</Txt>
                  </g>
                )}
                {k === 3 && (
                  <g>
                    <path d="M -30 24 L -10 4 L 4 14 L 28 -18" stroke={VERDE} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - sm(t, m('impacto'), m('impacto') + 1)} />
                    <path d="M 16 -20 L 30 -20 L 30 -6" stroke={VERDE} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={sm(t, m('impacto') + 0.8, m('impacto') + 1.1)} />
                    {t >= m('crecimiento') && <path d="M 0 -34 L 30 -24 Q 30 10 0 30 Q -30 10 -30 -24 Z" fill={AZUL_M} opacity={0.25 * e1(t, m('crecimiento'))} />}
                  </g>
                )}
              </g>
              {on && !movil && <g opacity={e1(t, m(v.a) + 1.4)} transform={`translate(1100 ${y})`}><path d="M 0 16 V -14 M -12 -2 L 0 -14 L 12 -2" stroke={NARANJA} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}
            </g>
          );
        })}
      </Toma>

      {/* 3 · las dos preguntas */}
      <Toma t={t} a={m('preguntas')} b={m('indirectas')} cy={470}>
        <Corte x0={T0} x1={T1} y0={TY0} y1={TY1} n={3} c={c} op={e1(t, m('preguntas'))} />
        <Corte x0={C0} x1={C1} y0={CY0} y1={CY1} n={6} c={c} op={e1(t, m('preguntas') + 0.3)} />
        <Txt x={(T0 + T1) / 2} y={830} textAnchor="middle" fontSize={26} fill={c.texto} opacity={e1(t, m('preguntas'))}>Tu empresa</Txt>
        <Txt x={(C0 + C1) / 2} y={830} textAnchor="middle" fontSize={26} fill={c.texto} opacity={e1(t, m('preguntas') + 0.3)}>El cliente</Txt>
        {t >= m('nivel') && (
          <g opacity={e1(t, m('nivel'))}>
            <rect x={T0 + 6} y={TY1 - 100 * 2 + 10} width={T1 - T0 - 12} height={80} rx={10} fill={NARANJA} opacity={0.25} />
            <Persona id={ID} x={(T0 + T1) / 2} y={TY1 - 200 + 88} s={0.42} cuerpo={NARANJA} />
          </g>
        )}
        {t >= m('ajustando') && (
          <g opacity={e1(t, m('ajustando'))}>
            <line x1={T1 + 12} y1={TY0 - 16} x2={C0 - 12} y2={CY0 - 16} stroke={c.tenue} strokeWidth={3} strokeDasharray="8 8" />
            <line x1={T1 + 12} y1={TY1 + 12} x2={C0 - 12} y2={CY1 + 12} stroke={c.tenue} strokeWidth={3} strokeDasharray="8 8" />
            <line x1={T1 + 12} y1={TY1 - 160} x2={C0 - 12} y2={CY1 - hC * 4 + hC / 2} stroke={NARANJA} strokeWidth={4} strokeDasharray="10 8" strokeDashoffset={-t * 30} />
          </g>
        )}
        {t >= m('ajustando') && (
          <g opacity={e1(t, m('ajustando') + 0.5)}>
            <rect x={C0 + 6} y={yMarcaC - hC / 2 + 8} width={C1 - C0 - 12} height={hC - 16} rx={10} fill={oroOn ? AMBAR : NARANJA} opacity={0.3} />
            <Persona id={ID} x={(C0 + C1) / 2} y={yMarcaC + hC / 2 - 10} s={0.4} cuerpo={oroOn ? AMBAR : NARANJA} />
          </g>
        )}
        {t >= m('riesgo') && t < m('encima') + 1 && [-1, 1].map((d) => {
          const on = d === -1 && t >= m('arriba');
          return (
            <g key={d} opacity={ventana(t, m('riesgo'), m('encima') + 1) * (on ? 1 : 0.55)} transform={`translate(${C1 + 60} ${yMarcaC + d * 52 + (on ? -6 * Math.abs(Math.sin(t * 5)) : 0)})`}>
              <path d={d < 0 ? 'M 0 -22 L 20 6 L -20 6 Z' : 'M 0 22 L 20 -6 L -20 -6 Z'} fill={on ? NARANJA : GRIS} />
            </g>
          );
        })}
        {t >= m('oro') && (
          <g opacity={e1(t, m('oro'))} transform={`translate(1060 300) scale(${e1(t, m('oro'))})`}>
            <path d="M -24 40 L -36 92 L -8 78 L 0 100 L 10 74 M 24 40 L 36 92 L 8 78" fill={ROSA} />
            <circle r={54} fill={AMBAR} style={sombra(0.25, 4, 10)} /><circle r={42} fill="#fbbf24" />
            <Txt x={0} y={16} textAnchor="middle" fontSize={44} fill="#fff">{t >= m('encima') ? '+1' : '★'}</Txt>
          </g>
        )}
      </Toma>

      {/* 4 · confirmar con preguntas indirectas o con el coach */}
      <Toma t={t} a={m('indirectas')} b={fin + 1} cy={470}>
        <rect x={60} y={790} width={1080} height={10} rx={5} fill={c.apagado} />
        <Persona id={ID} x={170} y={790} s={0.95} cuerpo={NARANJA} />
        <g opacity={e1(t, m('indirectas') + 0.3)}>
          <Persona id={ID} x={600} y={790} s={0.95} cuerpo={VIOLETA} />
          <Txt x={600} y={834} textAnchor="middle" fontSize={24} fill={c.texto}>Técnico</Txt>
          {t >= m('mienten') && <Corona x={600 + 60 * caeCorona} y={lerp(790 - 0.95 * 171 - 20, 770, caeCorona)} s={1.1} rot={110 * caeCorona} papel op={e1(t, m('mienten'))} />}
        </g>
        <g opacity={e1(t, m('indirectas') + 0.6) * (t >= m('coach') ? 1 : 0.45)}>
          <Persona id={ID} x={1010} y={790} s={0.95} corbata cuerpo={VERDE} />
          <Txt x={1010} y={834} textAnchor="middle" fontSize={24} fill={c.texto}>Económico</Txt>
          {t >= m('coach') && <Corona x={1010} y={790 - 0.95 * 171 - 20} s={1.15} op={e1(t, m('coach') + 1)} />}
        </g>
        {t >= m('saldran') && t < m('mienten') && <Burbuja key={t >= m('final') ? 'f' : 's'} x={200} y={560} w={movil ? 600 : 520} texto={t >= m('final') ? '¿Cómo funciona la decisión final?' : '¿De qué presupuesto saldrán los fondos?'} u={sm(t, t >= m('final') ? m('final') : m('saldran'), (t >= m('final') ? m('final') : m('saldran')) + 1.4)} c={c} id={ID} tam={26} />}
        {t >= m('mienten') && t < m('coach') + 0.5 && <Burbuja x={620} y={560} w={movil ? 560 : 440} lado="izq" texto="Yo tengo la última palabra" u={sm(t, m('mienten'), m('mienten') + 1.2)} c={c} id={ID} tam={26} />}
        {t >= m('coach') && (
          <g opacity={e1(t, m('coach'))}>
            <Persona id={ID} x={380} y={790} s={0.8} cuerpo={TEAL} />
            <Txt x={380} y={834} textAnchor="middle" fontSize={24} fill={c.texto}>Coach</Txt>
            <Brujula x={380} y={500} r={46} ang={lerp(-60, 82, sm(t, m('coach') + 0.3, m('coach') + 1.3)) + 4 * Math.sin(t * 3)} id={ID} />
            <path d={`M 432 470 C 620 360 860 380 960 560`} stroke={VERDE} strokeWidth={5} fill="none" strokeDasharray="12 10" strokeDashoffset={-t * 30} opacity={sm(t, m('coach') + 0.8, m('coach') + 1.4)} />
            <Visto x={1070} y={560} r={24} op={e1(t, m('coach') + 1.4)} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
