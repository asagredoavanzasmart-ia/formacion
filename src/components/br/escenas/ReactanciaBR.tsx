import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Telefono, Reloj, Sello, Cruz, Visto, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Presión y reactancia.
 * Toma 1: Rackham: un mapa de puntos que se encienden (23 países) y el contador de 35.000 llamadas; luego dos balanzas:
 * en la venta pequeña el cierre la inclina a favor (sube la flecha verde), en la grande en contra (baja la roja).
 * Toma 2: Brehm: una mano empuja a un comprador y un resorte devuelve el empujón; alrededor, las tres presiones que lo
 * activan: el reloj falso, la pila de casi 15.000 dólares y el guion que pide crédito.
 * Toma 3: el cambio: el empujón se reemplaza por una pizarra de enseñanza y diagnóstico.
 */

const ID = 'br25', P = 'br-reactancia';

export const ReactanciaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('rackham'), 'Neil Rackham'], [m('pequenas'), 'Pequeñas frente a grandes'], [m('brehm'), 'Reactancia (Brehm, 1966)'],
    [m('reloj'), 'Lo que la activa'], [m('ensenanza'), 'Enseñar y diagnosticar'],
  ];
  const empuja = t >= m('reacciona') ? Math.sin(Math.max(0, t - m('reacciona')) * 3) * 0.5 + 0.5 : sm(t, m('brehm'), m('brehm') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Presión y reactancia">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Rackham */}
      <Toma t={t} a={0} b={m('brehm')} cy={470}>
        <g opacity={ventana(t, m('rackham') - 0.3, m('pequenas'))}>
          <ellipse cx={600} cy={460} rx={420} ry={220} fill={AZUL_M} opacity={0.12} />
          {Array.from({ length: 23 }, (_, k) => {
            const x = 260 + ((k * 137) % 680), y = 330 + ((k * 89) % 260);
            const on = t >= m('paises') + k * 0.05;
            return <circle key={k} cx={x} cy={y} r={on ? 14 : 8} fill={on ? NARANJA : GRIS} opacity={on ? 0.9 : 0.4} />;
          })}
          {t >= m('llamadas') && <Cifra x={600} y={260} valor={35000} u={sm(t, m('llamadas'), m('llamadas') + 1.2)} pre="+" suf=" llamadas" tam={46} color={AZUL_M} miles />}
          {t >= m('paises') && <Letrero x={600} y={740} texto="23 países · SPIN (1988)" fondo={AZUL_M} id={ID} tam={28} op={e1(t, m('paises'))} />}
        </g>
        {t >= m('pequenas') && [0, 1].map((k) => {
          const n = k === 0 ? 'pequenas' : 'grandes';
          if (t < m(n) - 0.1) return null;
          const x = k === 0 ? 330 : 870, inc = (k === 0 ? -1 : 1) * 14 * sm(t, m(n) + 0.3, m(n) + 1.2);
          return (
            <g key={k} opacity={e1(t, m(n))}>
              <rect x={x - 10} y={420} width={20} height={260} rx={8} fill={c.tenue} />
              <rect x={x - 80} y={670} width={160} height={24} rx={10} fill={c.tenue} />
              <g transform={`rotate(${inc} ${x} 420)`}>
                <rect x={x - 180} y={410} width={360} height={16} rx={8} fill={c.texto} />
                <rect x={x - 200} y={340} width={110} height={70} rx={14} fill={GRIS} />
                <Txt x={x - 145} y={385} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>Cierre</Txt>
              </g>
              <Txt x={x} y={300} textAnchor="middle" fontSize={30} fill={c.texto} peso={800}>{k === 0 ? 'Venta pequeña' : 'Venta grande'}</Txt>
              {k === 0 ? <Visto x={x + 130} y={540} r={36} op={e1(t, m(n) + 0.8)} /> : <Cruz x={x + 130} y={540} r={36} op={e1(t, m(n) + 0.8)} />}
              <Letrero x={x} y={760} texto={k === 0 ? 'Ayuda' : 'Perjudica'} fondo={k === 0 ? VERDE : ROJO_M} id={ID} tam={28} />
            </g>
          );
        })}
      </Toma>

      {/* 2 · Reactancia */}
      <Toma t={t} a={m('brehm')} b={m('ensenanza')} cy={470}>
        <g opacity={e1(t, m('brehm'))}>
          <rect x={160 + 40 * empuja} y={500} width={140} height={44} rx={22} fill={c.texto} />
          <circle cx={310 + 40 * empuja} cy={522} r={30} fill={c.texto} />
          {t >= m('reacciona') && Array.from({ length: 7 }, (_, k) => <rect key={k} x={370 + 40 * empuja + k * (12 - 4 * empuja)} y={490 + (k % 2) * 40} width={8} height={24} rx={4} fill={ROJO_M} opacity={e1(t, m('reacciona'))} />)}
          <Persona id={ID} x={lerp(520, 500, empuja)} y={620} s={0.85} cuerpo={AZUL_M} corbata />
          {t >= m('reacciona') && <Letrero x={360} y={700} texto="Reacciona en contra" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('reacciona'))} />}
        </g>
        {t >= m('reloj') && (
          <g opacity={e1(t, m('reloj'))}>
            <Reloj x={790} y={290} r={64} t={t} vel={4} aro={ROJO_M} />
            <Txt x={900} y={300} fontSize={26} fill={c.texto} peso={800}>Reloj falso</Txt>
          </g>
        )}
        {t >= m('quince') && (
          <g opacity={e1(t, m('quince'))}>
            {Array.from({ length: 6 }, (_, k) => <rect key={k} x={740 + (k % 2) * 10} y={500 - k * 26} width={100} height={22} rx={6} fill={AMBAR} opacity={0.75 + (k % 2) * 0.2} />)}
            <Cifra x={980} y={470} valor={15000} u={sm(t, m('quince'), m('quince') + 1)} pre="≈ $" tam={40} color={AMBAR} miles />
          </g>
        )}
        {t >= m('guion') && (
          <g opacity={e1(t, m('guion'))}>
            <rect x={740} y={600} width={160} height={100} rx={14} fill={VIOLETA} />
            <rect x={740} y={625} width={160} height={18} fill="#1f2937" opacity={0.5} />
            <rect x={760} y={665} width={60} height={14} rx={4} fill="#fff" opacity={0.7} />
            <Txt x={920} y={660} fontSize={26} fill={c.texto} peso={800}>{t >= m('credito') ? (movil ? 'Crédito' : 'Pide crédito') : (movil ? 'Guion' : 'Guion de llamadas')}</Txt>
          </g>
        )}
      </Toma>

      {/* 3 · Enseñar */}
      <Toma t={t} a={m('ensenanza')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('ensenanza'))}>
          <rect x={300} y={240} width={600} height={340} rx={22} fill={isDark ? '#0f3d2e' : '#14532d'} />
          <path d={`M 340 520 ${Array.from({ length: 8 }, (_, k) => `L ${370 + k * 64} ${520 - 30 * k - 16 * Math.sin(k)}`).join(' ')}`} stroke="#fff" strokeWidth={6} fill="none" strokeDasharray={`${700 * sm(t, m('ensenanza'), m('ensenanza') + 1.4)} 900`} />
          <Persona id={ID} x={240} y={700} s={0.8} cuerpo={NARANJA} />
          <Persona id={ID} x={960} y={700} s={0.8} cuerpo={AZUL_M} corbata />
          <Letrero x={600} y={680} texto="Enseñanza y diagnóstico" fondo={VERDE} id={ID} tam={30} />
        </g>
      </Toma>
    </Lienzo>
  );
};
