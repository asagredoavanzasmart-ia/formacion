import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, PersonaCara, Telefono, Reloj, Sello, Cruz, Visto, Globo, Balanza, Mano, Pizarra, Cubo, Edificio, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Presión y reactancia.
 * Toma 1: Neil Rackham (SPIN, 1988): un globo que gira y se llena de alfileres hasta 23 países, junto a un teléfono y
 * el contador de 35.000 llamadas observadas.
 * Toma 2: dos balanzas con la misma pesa «cierre»: en la venta pequeña (una caja) inclina a favor; en la grande (un
 * edificio) inclina en contra.
 * Toma 3: reactancia (Brehm, 1966): una mano empuja a un comprador profesional y él se inclina hacia atrás, enojado;
 * a su alrededor, lo que la activa: el reloj falso, la pila de casi 15.000 dólares y el guion que pide crédito.
 * Toma 4: el cambio: una pizarra de enseñanza y diagnóstico donde vendedor y comprador miran el mismo gráfico.
 */

const ID = 'br25', P = 'br-reactancia';
const PINES: [number, number][] = [[-100, 40], [-75, 45], [-60, -15], [-45, -20], [-3, 52], [2, 48], [10, 50], [12, 42], [15, 45], [-8, 40], [25, 55], [30, 35], [37, 55], [45, 30], [77, 20], [100, 15], [116, 40], [139, 36], [151, -33], [174, -41], [-70, 18], [28, -26], [-58, -34]];

export const ReactanciaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('rackham'), 'Neil Rackham'], [m('pequenas'), 'Pequeñas frente a grandes'], [m('brehm'), 'Reactancia (Brehm, 1966)'],
    [m('reloj'), 'Lo que la activa'], [m('ensenanza'), 'Enseñar y diagnosticar'],
  ];
  const pines = Math.round(23 * sm(t, m('paises'), m('paises') + 2.5));
  const empuje = sm(t, m('brehm') + 0.3, m('brehm') + 1.3);
  const reacciona = sm(t, m('reacciona'), m('reacciona') + 0.8);
  const lean = empuje * 12 - reacciona * 20;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Presión y reactancia">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Rackham */}
      <Toma t={t} a={0} b={m('pequenas')} cy={470}>
        <Globo x={420} y={470} r={220} t={t} c={c} pins={PINES} n={pines} op={E('rackham', 0.6, -0.3)} />
        <g opacity={E('llamadas')}>
          <Telefono x={880} y={400} s={0.9} widgets={0} />
          {[0, 1, 2].map((k) => { const p = (t * 0.8 + k / 3) % 1; return <path key={k} d={`M ${950 + p * 50} ${330 - 20} q ${16} 20 0 40`} stroke={AZUL_M} strokeWidth={5} fill="none" opacity={1 - p} />; })}
          <Cifra x={880} y={600} valor={35000} u={sm(t, m('llamadas'), m('llamadas') + 1.4)} pre="+" tam={50} color={AZUL_M} miles />
          <Txt x={880} y={640} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>llamadas observadas</Txt>
        </g>
        <Pastilla x={420} y={780} texto={`${pines} países · SPIN, 1988`} fondo={NARANJA} tam={26} op={E('paises')} />
      </Toma>

      {/* 2 · Pequeñas frente a grandes */}
      <Toma t={t} a={m('pequenas')} b={m('brehm')} cy={470}>
        {[0, 1].map((k) => {
          const n = k === 0 ? 'pequenas' : 'grandes';
          const u = E(n, 0.6);
          const inc = (k === 0 ? 1 : -1) * 14 * sm(t, m(n) + 0.5, m(n) + 1.4);
          const x = k === 0 ? 300 : 900;
          return (
            <g key={k} opacity={t >= m(n) - 0.1 ? Math.min(1, u) : 0.15}>
              <Txt x={x} y={220} textAnchor="middle" fontSize={30} fill={c.texto} peso={800}>{k === 0 ? 'Venta pequeña' : 'Venta grande'}</Txt>
              <Balanza x={x} y={720} inc={inc} c={c} brazo={170} alto={270}
                izq={<g><rect x={-46} y={-44} width={92} height={44} rx={10} fill={GRIS} /><Txt x={0} y={-14} textAnchor="middle" fontSize={20} fill="#fff" peso={800}>Cierre</Txt></g>}
                der={k === 0 ? <Cubo x={0} y={-6} l={44} color={VERDE} /> : <Edificio x={0} y={0} w={60} h={90} color={AZUL_M} />} />
              <Pastilla x={x} y={790} texto={k === 0 ? 'Ayuda' : 'Perjudica'} fondo={k === 0 ? VERDE : ROJO_M} tam={28} op={sm(t, m(n) + 1.2, m(n) + 1.6)} />
            </g>
          );
        })}
      </Toma>

      {/* 3 · Reactancia */}
      <Toma t={t} a={m('brehm')} b={m('ensenanza')} cy={470}>
        <g opacity={E('brehm')}>
          <rect x={90} y={700} width={540} height={10} rx={5} fill={c.apagado} />
          <Mano x={lerp(250, 424, empuje) - 70 * reacciona} y={640} s={0.72} empuja={empuje * (1 - reacciona)} t={t} />
          <g transform={`rotate(${lean} 500 698)`}>
            <Persona id={ID} x={500} y={698} s={0.95} cuerpo={AZUL_M} corbata />
          </g>
          {(() => {
            const hx = 500 + Math.sin((lean * Math.PI) / 180) * 136, hy = 698 - 136 * Math.cos((lean * Math.PI) / 180);
            return (
              <g>
                <Cara id={ID} x={hx} y={hy} r={30} e={-reacciona} enojo={reacciona} />
                {/* Símbolo de enojo junto a la cabeza */}
                {reacciona > 0.05 && <g transform={`translate(${hx + 44} ${hy - 34}) scale(${0.8 + 0.12 * Math.sin(t * 8)})`} opacity={reacciona}>
                  {[0, 90, 180, 270].map((a) => <path key={a} d="M 5 -14 Q 5 -5 14 -5" stroke={ROJO_M} strokeWidth={5} fill="none" strokeLinecap="round" transform={`rotate(${a})`} />)}
                </g>}
              </g>
            );
          })()}
          {/* El comprador empuja de vuelta: flecha hacia la mano */}
          {reacciona > 0.05 && <g opacity={reacciona}>
            <path d="M 300 560 H 230" stroke={ROJO_M} strokeWidth={8} strokeLinecap="round" />
            <path d="M 236 544 L 214 560 L 236 576 Z" fill={ROJO_M} />
          </g>}
          <Pastilla x={450} y={790} texto="Reacciona en contra" fondo={ROJO_M} tam={26} op={reacciona} />
        </g>
        <Tarjeta x={700} y={200} w={420} h={170} titulo={movil ? undefined : 'Reloj de cuenta regresiva'} c={c} id={ID} op={E('reloj')} acento={ROJO_M} tam={22}>
          <Reloj x={90} y={105} r={40} t={t} vel={6} aro={ROJO_M} />
          <rect x={170} y={80} width={110} height={44} rx={10} fill={ROJO_M} /><Txt x={225} y={110} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>Falso</Txt>
        </Tarjeta>
        <Tarjeta x={700} y={390} w={420} h={170} titulo={movil ? undefined : 'Pila inflada'} c={c} id={ID} op={E('quince')} acento={AMBAR} tam={22}>
          {Array.from({ length: 5 }, (_, k) => <rect key={k} x={50 + (k % 2) * 8} y={130 - k * 18} width={90} height={15} rx={4} fill={AMBAR} />)}
          <Cifra x={290} y={120} valor={15000} u={sm(t, m('quince'), m('quince') + 1)} pre="≈ $" tam={36} color={AMBAR} miles />
        </Tarjeta>
        <Tarjeta x={700} y={580} w={420} h={170} titulo={movil ? undefined : 'Guion que pide crédito'} c={c} id={ID} op={E('guion')} acento={VIOLETA} tam={22}>
          <rect x={50} y={65} width={150} height={92} rx={12} fill={VIOLETA} /><rect x={50} y={88} width={150} height={16} fill="#1f2937" opacity={0.5} /><rect x={66} y={124} width={56} height={12} rx={4} fill="#fff" opacity={0.7} />
          <Txt x={300} y={120} textAnchor="middle" fontSize={26} fill={c.texto} peso={800} opacity={E('credito')}>{movil ? 'Crédito' : 'Crédito bancario'}</Txt>
        </Tarjeta>
        {['reloj', 'quince', 'guion'].map((n, k) => <Conector key={n} x1={700} y1={285 + k * 190} x2={560} y2={560} u={E(n)} t={t} color={[ROJO_M, AMBAR, VIOLETA][k]} puntos={2} grosor={4} />)}
      </Toma>

      {/* 4 · Enseñar y diagnosticar */}
      <Toma t={t} a={m('ensenanza')} b={fin + 1} cy={470}>
        <Pizarra x={300} y={220} w={600} h={340} u={sm(t, m('ensenanza'), m('ensenanza') + 1.6)} isDark={isDark} titulo={movil ? 'Diagnóstico' : 'Enseñanza y diagnóstico'} op={E('ensenanza')} />
        <g opacity={E('ensenanza', 0.5, 0.4)}>
          <Persona id={ID} x={220} y={720} s={0.85} cuerpo={NARANJA} />
          <PersonaCara id={ID} x={980} y={720} s={0.85} cuerpo={AZUL_M} corbata e={1} />
          <Conector x1={260} y1={600} x2={360} y2={500} u={1} t={t} color={NARANJA} puntos={2} grosor={4} />
          <Conector x1={940} y1={600} x2={840} y2={500} u={1} t={t} color={AZUL_M} puntos={2} grosor={4} />
        </g>
      </Toma>
    </Lienzo>
  );
};
