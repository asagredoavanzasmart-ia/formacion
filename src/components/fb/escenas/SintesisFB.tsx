import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Paso, Flujo, Calendario, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Síntesis. Toma 1: un ciclo que gira en el centro (dar arriba, recibir abajo); a la izquierda se apilan las tácticas
 * para dar y a la derecha las de recibir, cada una en su turno. Toma 2: la líder pide feedback con la pregunta; el
 * equipo responde y los flujos vuelven hacia ella; decir la verdad se vuelve seguro. Toma 3: dos rutas: la que corrige
 * el rumbo en días (muchos ajustes cortos) y la que lo hace en trimestres (un desvío largo).
 */

const ID = 'fb21', P = 'fb-sintesis';

export const SintesisFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('caras'), 'Dos caras del mismo ciclo'], [m('darlo'), 'Para dar'], [m('recibirlo'), 'Para recibir'], [m('pide'), 'Y sobre todo, pide'],
    [m('lider'), 'Cuando la líder pide'], [m('seguro'), 'Decir la verdad es seguro'], [m('dias'), 'En días, no en trimestres'],
  ];
  const DAR = ['A tiempo', 'Tipo claro', 'Encuadre', 'Hechos', 'Un plan', 'Seguimiento'];
  const REC = ['Disparador', '«Cuéntame más»', 'Puntos ciegos', 'Qué y quién', 'Tamaño real', 'Experimento'];
  const tDar = (k: number) => lerp(m('darlo') + 0.3, m('fabricar') + 0.6, k / 5);
  const tRec = (k: number) => lerp(m('recibirlo') + 0.3, m('experimento'), k / 5);
  const verdad = sm(t, m('seguro'), m('seguro') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Dar y recibir: un mismo ciclo">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · el ciclo */}
      <TomaFB t={t} a={0} b={m('pide')} cy={470}>
        <g opacity={e1(t, m('caras'))}>
          <g transform={`rotate(${t * 40} 600 470)`}>
            <path d="M 510 470 A 90 90 0 0 1 690 470" stroke={NARANJA} strokeWidth={22} fill="none" strokeLinecap="round" />
            <path d="M 690 470 A 90 90 0 0 1 510 470" stroke={ROSA} strokeWidth={22} fill="none" strokeLinecap="round" />
            <path d="M 690 450 l 14 26 l -30 0 Z" fill={NARANJA} />
            <path d="M 510 490 l -14 -26 l 30 0 Z" fill={ROSA} />
          </g>
          <Txt x={600} y={330} textAnchor="middle" fontSize={30} fill={NARANJA}>Dar</Txt>
          <Txt x={600} y={634} textAnchor="middle" fontSize={30} fill={ROSA}>Recibir</Txt>
        </g>
        {DAR.map((d, k) => <Paso key={k} x={40} y={170 + k * 100} w={420} texto={d} color={NARANJA} c={c} op={e1(t, tDar(k))} tam={30} />)}
        {REC.map((d, k) => <Paso key={k} x={740} y={170 + k * 100} w={420} texto={d} color={ROSA} c={c} op={e1(t, tRec(k))} tam={30} />)}
      </TomaFB>

      {/* 2 · pedir */}
      <TomaFB t={t} a={m('pide')} b={m('dias')} cy={480}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        <Persona id={ID} x={300} y={720} s={1.1} cuerpo={NARANJA} />
        <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Quien lidera</Txt>
        {vent(t, m('pide'), m('seguro')) > 0.01 && <g opacity={vent(t, m('pide'), m('seguro'))}><Burbuja x={320} y={500} w={640} texto="¿Qué es una cosa que me ves hacer que me juega en contra?" u={sm(t, m('pide') + 0.4, m('pide') + 3)} c={c} id={ID} tam={30} marca /></g>}
        {t >= m('lider') && (
          <g opacity={e1(t, m('lider'))}>
            {[620, 780, 940].map((x, k) => <Persona key={k} id={ID} x={x} y={720} s={0.95} cuerpo={[AZUL_M, VIOLETA, VERDE][k]} ojos={0.7 + 0.3 * verdad} />)}
            {[620, 780, 940].map((x, k) => <Flujo key={`f${k}`} x1={x} y1={560} x2={340} y2={580} t={t + k * 0.25} n={3} arco={70 + k * 20} color={[AZUL_M, VIOLETA, VERDE][k]} op={sm(t, m('lider') + 0.6, m('lider') + 1.2)} />)}
          </g>
        )}
        {t >= m('seguro') && (
          <g opacity={e1(t, m('seguro'))}>
            <Letrero x={600} y={260} texto="Decir la verdad es seguro" fondo={VERDE} id={ID} tam={32} />
            <Letrero x={600} y={350} texto="Escucharla es fortaleza" fondo={AZUL_M} id={ID} tam={30} op={sm(t, m('seguro') + 1.2, m('seguro') + 1.8)} />
          </g>
        )}
      </TomaFB>

      {/* 3 · días y no trimestres */}
      <TomaFB t={t} a={m('dias')} b={fin + 1} cy={470}>
        <circle cx={1040} cy={470} r={40} fill="none" stroke={VERDE} strokeWidth={8} />
        <circle cx={1040} cy={470} r={14} fill={VERDE} />
        <path d={`M 160 330 ${Array.from({ length: 12 }, (_, k) => `L ${160 + (k + 1) * 73} ${470 + (k % 2 ? 1 : -1) * 18 * (1 - k / 12) - 140 * (1 - (k + 1) / 12)}`).join(' ')}`} stroke={VERDE} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={1400} strokeDashoffset={1400 * (1 - sm(t, m('dias'), m('dias') + 2.5))} />
        <path d="M 160 610 C 500 760, 800 760, 1040 470" stroke={ROJO_M} strokeWidth={8} fill="none" strokeDasharray="14 12" opacity={0.6 * e1(t, m('dias') + 0.6)} />
        <Txt x={200} y={250} fontSize={30} fill={VERDE} opacity={e1(t, m('dias') + 0.4)}>Ajustes de cada semana</Txt>
        <Txt x={420} y={780} fontSize={28} fill={ROJO_M} opacity={e1(t, m('dias') + 1)}>Una vez por trimestre</Txt>
        <Calendario x={1040} y={260} s={0.9} marcados={Math.min(14, Math.floor(Math.max(0, t - m('dias')) * 4))} op={e1(t, m('dias') + 1.5)} />
      </TomaFB>
    </Lienzo>
  );
};
