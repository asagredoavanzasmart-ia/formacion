import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Bateria, Cama, Cifra, Bombilla, Cruz, Suelo, Telefono, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Proteger el activo.
 * Toma 1 (Ericsson): la persona con su batería; la violinista, su cama y las horas de sueño (8,6 al día, 2,8 de siesta a
 * la semana); la línea de práctica en sesiones de 60 a 90 minutos con pausas.
 * Toma 2 (Czeisler): 24 horas sin dormir = una copa: 0,1 % de alcohol; la persona que trabaja tambaleándose.
 * Toma 3 (Lübeck, Nature): dos grupos ante un problema; los que durmieron encienden el doble de bombillas; el descanso
 * como parte del rendimiento: bloques protegidos y el correo de madrugada tachado.
 */

const ID = 'es09', P = 'es-activo';

const Violin: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <g transform={`translate(${x} ${y}) rotate(-35)`}>
    <path d="M -18 -40 Q -34 -26 -22 -6 Q -34 14 -20 34 Q 0 46 20 34 Q 34 14 22 -6 Q 34 -26 18 -40 Q 0 -50 -18 -40 Z" fill="#b45309" />
    <rect x={-4} y={-110} width={8} height={72} rx={3} fill="#451a03" />
    <rect x={-60} y={-10 + 6 * Math.sin(t * 6)} width={120} height={4} rx={2} fill="#e5e7eb" transform={`rotate(70)`} />
  </g>
);

export const ActivoES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('activo'), 'El activo son las personas'], [m('ericsson'), 'Los mejores violinistas'], [m('sueno'), 'El segundo factor: dormir'], [m('sesiones'), 'Sesiones con pausas'],
    [m('czeisler'), 'Charles Czeisler'], [m('alcohol'), 'Como 0,1 % de alcohol'], [m('lubeck'), 'Universidad de Lübeck'], [m('doble'), 'El doble de soluciones'],
    [m('tactica'), 'Proteger el descanso'],
  ];
  const carga = 0.3 + 0.7 * sm(t, m('sueno'), m('siesta') + 1);
  const ebrio = sm(t, m('ebrio') - 0.5, m('ebrio') + 0.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Proteger el activo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la violinista, su cama y sus sesiones */}
      <Toma t={t} a={0} b={m('czeisler')} cy={480}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        <Persona id={ID} x={260} y={720} s={1.05} cuerpo={NARANJA} ojos={0.4 + 0.6 * carga} />
        {t >= m('violinistas') && <Violin x={340} y={640} t={t} />}
        <Bateria x={120} y={480} v={carga} alto={220} c={c} op={e1(t, m('activo'))} />
        {t >= m('sueno') && <g opacity={ventana(t, m('sueno'), m('sesiones'))}><Cama x={560} y={720} /></g>}
        {t >= m('horas') && (
          <g opacity={ventana(t, m('horas'), m('sesiones'))}>
            <Cifra x={900} y={380} valor={8.6} dec={1} u={sm(t, m('horas'), m('horas') + 1)} suf=" h" tam={86} color={VIOLETA} />
            <Txt x={900} y={430} textAnchor="middle" fontSize={28} fill={c.texto}>de sueño al día</Txt>
            {t >= m('siesta') && <><Cifra x={900} y={560} valor={2.8} dec={1} u={sm(t, m('siesta'), m('siesta') + 1)} suf=" h" tam={70} color={AZUL_M} /><Txt x={900} y={606} textAnchor="middle" fontSize={28} fill={c.texto}>de siesta a la semana</Txt></>}
          </g>
        )}
        {t >= m('sesiones') && (
          <g opacity={e1(t, m('sesiones'))}>
            <rect x={460} y={420} width={660} height={20} rx={10} fill={c.apagado} />
            {[0, 1, 2].map((k) => <g key={k}><rect x={470 + k * 220} y={380} width={lerp(0, 170, sm(t, m('sesiones') + 0.5 * k, m('sesiones') + 0.5 * k + 0.8))} height={100} rx={14} fill={[NARANJA, ROSA, VIOLETA][k]} /><Txt x={555 + k * 220} y={540} textAnchor="middle" fontSize={26} fill={c.texto}>60–90 min</Txt></g>)}
            {[0, 1].map((k) => <Txt key={k} x={665 + k * 220} y={360} textAnchor="middle" fontSize={24} fill={VERDE} opacity={e1(t, m('sesiones') + 1.2)}>pausa</Txt>)}
          </g>
        )}
      </Toma>

      {/* 2 · Czeisler: desvelo = alcohol */}
      <Toma t={t} a={m('czeisler')} b={m('lubeck')} cy={480}>
        <Suelo y={740} isDark={isDark} x0={120} x1={1080} />
        <g transform={`rotate(${8 * ebrio * Math.sin(t * 3)} 360 740)`}><Persona id={ID} x={360} y={740} s={1.05} cuerpo={GRIS} ojos={0.25} /></g>
        <g opacity={e1(t, m('czeisler'))}>
          <circle cx={360} cy={300} r={80} fill="#1f2937" /><Txt x={360} y={318} textAnchor="middle" fontSize={44} fill="#fde68a">24 h</Txt>
          <Txt x={360} y={430} textAnchor="middle" fontSize={26} fill={c.texto}>sin dormir</Txt>
        </g>
        {t >= m('alcohol') && (
          <g opacity={e1(t, m('alcohol'))}>
            <Txt x={560} y={330} textAnchor="middle" fontSize={70} fill={c.texto}>=</Txt>
            <path d="M 700 220 H 820 L 790 360 Q 760 380 730 360 Z" fill="#fca5a5" opacity={0.85} />
            <path d="M 716 280 H 804 L 790 360 Q 760 380 730 360 Z" fill="#b91c1c" />
            <rect x={754} y={370} width={12} height={110} fill="#94a3b8" /><rect x={714} y={476} width={92} height={12} rx={6} fill="#94a3b8" />
            <Cifra x={960} y={340} valor={0.1} dec={1} u={sm(t, m('alcohol'), m('alcohol') + 1)} suf=" %" tam={72} color={ROJO_M} />
            <Txt x={960} y={390} textAnchor="middle" fontSize={26} fill={c.texto}>de alcohol</Txt>
          </g>
        )}
        {t >= m('ebrio') && <Letrero x={760} y={640} texto="Nadie celebra trabajar ebrio" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('ebrio'))} />}
      </Toma>

      {/* 3 · Lübeck y la táctica */}
      <Toma t={t} a={m('lubeck')} b={fin + 1} cy={480}>
        {ventana(t, m('lubeck') - 0.1, m('tactica')) > 0.01 && (
          <g opacity={ventana(t, m('lubeck') - 0.1, m('tactica'))}>
            {[0, 1].map((k) => (
              <g key={k}>
                <rect x={150 + k * 470} y={220} width={430} height={420} rx={24} fill={c.panel} />
                <Txt x={365 + k * 470} y={280} textAnchor="middle" fontSize={30} fill={c.texto}>{k ? 'Sueño interrumpido' : 'Durmieron 8 horas'}</Txt>
                {Array.from({ length: k ? 2 : 4 }, (_, j) => <Bombilla key={j} x={230 + k * 470 + j * 90} y={440} s={0.7} id={`${ID}b${k}${j}`} t={t} luz={sm(t, m('doble') + 0.2 * j, m('doble') + 0.2 * j + 0.5)} op={e1(t, m('atajo') + 0.1 * j)} />)}
                <rect x={190 + k * 470} y={560} width={350} height={30} rx={15} fill={c.apagado} />
                <rect x={190 + k * 470} y={560} width={350 * (k ? 0.5 : 1) * sm(t, m('doble'), m('doble') + 1)} height={30} rx={15} fill={k ? GRIS : VERDE} />
              </g>
            ))}
            {t >= m('doble') && <Letrero x={600} y={720} texto="El doble encontró el atajo" fondo={VERDE} id={ID} tam={30} op={e1(t, m('doble'))} />}
            {!movil && <Txt f="a" x={600} y={190} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('lubeck'))}>Publicado en Nature</Txt>}
          </g>
        )}
        {t >= m('tactica') && (
          <g opacity={e1(t, m('tactica'))}>
            {[0, 1, 2].map((k) => <rect key={k} x={200 + k * 170} y={300} width={140} height={300} rx={18} fill={[NARANJA, ROSA, VIOLETA][k]} />)}
            <Txt x={455} y={660} textAnchor="middle" fontSize={28} fill={c.texto}>Bloques protegidos</Txt>
            <Telefono x={880} y={600} s={0.9} />
            <Txt x={880} y={330} textAnchor="middle" fontSize={34} fill={c.texto}>3:00 a. m.</Txt>
            <Cruz x={960} y={420} r={40} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
