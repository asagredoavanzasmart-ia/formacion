import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Engranaje, Portatil, Reloj, Cruz, Visto, Hilo, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Error 3: automatizar un proceso malo.
 * Toma 1: una cinta transportadora con cajas abolladas; al automatizarla acelera y salen más cajas igual de malas
 * (la frase de Marion Howard-Healy, en Newell).
 * Toma 2 (Newell): primero se arregla el proceso con la llave, después entra la tecnología; el portátil se tacha y
 * queda el apretón de manos: es la calidad de cada interacción, no un proyecto de informática.
 * Toma 3 (Reinares): el proceso «perfecto» con tres firmas en fila y el cliente esperando con su reloj; la decisión
 * baja a quien atiende y el cliente sale atendido.
 */

const ID = 'cp10', P = 'cp-automatizar';

const Caja: React.FC<{ x: number; y: number; mala?: boolean; s?: number }> = ({ x, y, mala = true, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={mala ? 'M -40 0 L -36 -66 L 4 -60 L 40 -70 L 40 0 Z' : 'M -40 0 V -70 H 40 V 0 Z'} fill={mala ? '#b45309' : '#d97706'} />
    <path d={mala ? 'M -36 -66 L 4 -60 L 40 -70 L 30 -80 L -30 -78 Z' : 'M -40 -70 L -30 -82 H 50 L 40 -70 Z'} fill="#f59e0b" />
    {mala && <path d="M -10 -40 L 4 -20 L -6 -6" stroke="#7c2d12" strokeWidth={4} fill="none" />}
  </g>
);

export const AutomatizarCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('trampa'), 'Una trampa silenciosa'], [m('howard'), 'Marion Howard-Healy'], [m('corrige'), 'No corrige nada'], [m('repetir'), 'Repite más rápido'],
    [m('dos'), 'Newell insiste en dos cosas'], [m('informatica'), 'No es informática'], [m('vecino'), 'Un error vecino'], [m('descentralizar'), 'Descentralizar las decisiones'],
  ];
  const vel = t < m('repetir') ? 0.25 : 0.25 + 0.75 * sm(t, m('repetir'), m('repetir') + 1.2);
  const fase = (t - m('trampa')) * vel;
  const arreglo = sm(t, m('resuelto'), m('resuelto') + 1.2);
  const baja = sm(t, m('descentralizar'), m('descentralizar') + 1.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Automatizar un proceso malo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la cinta que repite el error más rápido */}
      <Toma t={t} a={0} b={m('dos')} cy={480}>
        <g opacity={e1(t, m('trampa'))}>
          <rect x={100} y={560} width={1000} height={34} rx={17} fill={isDark ? '#475569' : '#64748b'} />
          {Array.from({ length: 9 }, (_, k) => <circle key={k} cx={130 + k * 118} cy={577} r={12} fill={isDark ? '#1e293b' : '#334155'} />)}
          {Array.from({ length: 7 }, (_, k) => { const u = (fase * 0.8 + k / 7) % 1; return <Caja key={k} x={140 + u * 920} y={558} />; })}
          <rect x={80} y={380} width={160} height={180} rx={16} fill={GRIS} />
          <Engranaje x={160} y={470} r={50} t={t * vel * 4} color={AMBAR} hueco={GRIS} />
        </g>
        {ventana(t, m('howard'), m('repetir')) > 0.01 && <g opacity={ventana(t, m('howard'), m('repetir'))}><Burbuja x={300} y={430} w={movil ? 820 : 760} texto="«Un proceso deficiente automatizado sigue siendo deficiente»" u={sm(t, m('howard') + 0.3, m('deficiente') + 1.2)} c={c} id={ID} tam={30} /></g>}
        {t >= m('repetir') && <Letrero x={600} y={300} texto="Los mismos errores, más rápido" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('repetir'))} />}
        {t >= m('corrige') && <Letrero x={600} y={700} texto="La automatización no corrige nada" fondo={GRIS} id={ID} tam={28} op={e1(t, m('corrige'))} />}
      </Toma>

      {/* 2 · primero el proceso, después la tecnología */}
      <Toma t={t} a={m('dos')} b={m('vecino')} cy={480}>
        <g opacity={e1(t, m('dos'))}>
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${260 + k * 220} 420)`}>
              <rect x={-80} y={-50} width={160} height={100} rx={18} fill={arreglo > 0.5 ? VERDE : ROJO_M} opacity={0.9} />
              {k < 2 && <path d="M 90 0 H 130" stroke={c.apagado} strokeWidth={8} strokeLinecap="round" />}
              {arreglo < 0.5 && k === 1 && <path d="M -30 -20 L 0 10 L -10 30" stroke="#fff" strokeWidth={6} fill="none" />}
            </g>
          ))}
          <g transform={`translate(${lerp(260, 700, arreglo)} ${330 - 30 * Math.abs(Math.sin(t * 5))}) rotate(-30)`} opacity={sm(t, m('resuelto'), m('resuelto') + 0.3)}>
            <rect x={-8} y={-10} width={16} height={90} rx={8} fill={GRIS} /><path d="M -26 -30 Q 0 -60 26 -30 L 14 -14 H -14 Z" fill={GRIS} />
          </g>
          <Txt f="a" x={480} y={540} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('resuelto'))}>Primero, el proceso</Txt>
        </g>
        {t >= m('informatica') && (
          <g opacity={e1(t, m('informatica'))}>
            <Portatil x={960} y={430} s={0.9} />
            <Cruz x={960} y={380} r={40} op={sm(t, m('informatica') + 0.4, m('informatica') + 0.8)} />
          </g>
        )}
        {t >= m('calidad') && (
          <g opacity={e1(t, m('calidad'))}>
            <Persona id={ID} x={260} y={800} s={0.6} cuerpo={NARANJA} /><Persona id={ID} x={420} y={800} s={0.6} corbata cuerpo={VIOLETA} />
            <Letrero x={840} y={790} texto="Calidad de cada interacción" id={ID} tam={28} />
          </g>
        )}
      </Toma>

      {/* 3 · procesos perfectos pero inoperantes */}
      <Toma t={t} a={m('vecino')} b={fin + 1} cy={480}>
        <Persona id={ID} x={150} y={760} s={0.85} cuerpo={NARANJA} />
        {t >= m('papel') && <Reloj x={150} y={330} r={56} t={t} vel={3} />}
        {[0, 1, 2].map((k) => {
          const x = 450 + k * 230;
          return (
            <g key={k} opacity={e1(t, m('inoperantes') + 0.3 * k) * (1 - 0.7 * baja)}>
              <rect x={x - 80} y={300} width={160} height={200} rx={16} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
              <circle cx={x} cy={360} r={26} fill="#f7c4a0" /><path d={`M ${x - 40} 450 Q ${x} 400 ${x + 40} 450 Z`} fill={GRIS} />
              {t >= m('aprobacion') && <g transform={`translate(${x} 480) rotate(-10)`} opacity={sm(t, m('aprobacion') + 0.4 * k, m('aprobacion') + 0.4 * k + 0.4)}><rect x={-46} y={-14} width={92} height={28} rx={6} fill="none" stroke={ROJO_M} strokeWidth={4} /><Txt f="a" x={0} y={7} textAnchor="middle" fontSize={18} fill={ROJO_M}>FIRMA</Txt></g>}
              {k < 2 && <path d={`M ${x + 90} 400 H ${x + 140}`} stroke={c.apagado} strokeWidth={6} strokeDasharray="8 8" />}
            </g>
          );
        })}
        {t >= m('descentralizar') && (
          <g opacity={e1(t, m('descentralizar'))}>
            <Persona id={ID} x={lerp(680, 360, baja)} y={760} s={0.8} cuerpo={VERDE} />
            <Hilo x1={220} y1={560} x2={lerp(620, 330, baja)} y2={560} u={sm(t, m('descentralizar') + 0.8, m('descentralizar') + 1.6)} id={ID} grosor={6} />
            <Visto x={150} y={460} r={30} op={sm(t, m('descentralizar') + 1.4, m('descentralizar') + 1.8)} />
            <Letrero x={760} y={812} texto="Decide quien atiende" fondo={VERDE} id={ID} tam={28} />
          </g>
        )}
        {t >= m('inoperantes') && t < m('descentralizar') && <Letrero x={760} y={600} texto="Perfecto en el papel" fondo={GRIS} id={ID} tam={28} op={e1(t, m('inoperantes'))} />}
      </Toma>
    </Lienzo>
  );
};
