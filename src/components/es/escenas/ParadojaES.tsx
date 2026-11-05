import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Propuesta, Diana, Curva, Edificio, Caja, Suelo, Flecha, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * La paradoja del éxito.
 * Toma 1: una linterna (la claridad) con un haz concentrado sobre un blanco; llegan personas con pedidos, el haz se
 * reparte en muchos haces débiles, el blanco se apaga: el éxito consume la claridad.
 * Toma 2 (Collins): la acción que sube y cae; el área que recibe una caja de proyecto tras otra hasta tambalear.
 * Toma 3: la misma energía repartida en un millón de direcciones frente a concentrada en pocas cosas.
 */

const ID = 'es02', P = 'es-paradoja';

const Linterna: React.FC<{ x: number; y: number; luz: number }> = ({ x, y, luz }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-120} y={-26} width={110} height={52} rx={14} fill="#334155" />
    <path d="M -12 -40 L 40 -56 V 56 L -12 40 Z" fill="#475569" />
    <ellipse cx={40} cy={0} rx={10} ry={56} fill={luz > 0.4 ? '#fde68a' : '#94a3b8'} />
    <rect x={-96} y={-34} width={20} height={10} rx={4} fill={NARANJA} />
  </g>
);

export const ParadojaES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('paradoja'), 'La paradoja del éxito'], [m('claridad'), '1 · Claridad, éxito'], [m('acuden'), '2 · Todos acuden'], [m('reparte'), '3 · El esfuerzo se reparte'],
    [m('aleja'), '4 · La dispersión aleja'], [m('collins'), 'Jim Collins'], [m('extra'), 'Un proyecto extra, y otro'], [m('fatiga'), 'Fatiga de decisión'],
    [m('millon'), 'Un milímetro en cada dirección'], [m('pocas'), 'Concentrada, avanza'],
  ];
  const reparte = sm(t, m('reparte'), m('reparte') + 1.4);
  const apaga = sm(t, m('consume'), m('consume') + 1.2);
  const n = 1 + Math.round(reparte * 7);
  const haz = (k: number) => { const a = n === 1 ? 0 : lerp(-34, 34, k / (n - 1)); return a; };
  const cajas = Math.min(6, Math.floor(Math.max(0, t - m('extra')) * 1.6));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La paradoja del éxito">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la linterna */}
      <Toma t={t} a={0} b={m('collins')} cy={470}>
        <g opacity={e1(t, m('paradoja'))}>
          {Array.from({ length: n }, (_, k) => {
            const a = (haz(k) * Math.PI) / 180;
            const largo = n === 1 ? 760 : 520;
            const ancho = n === 1 ? 70 : 70 / Math.sqrt(n);
            return <path key={k} d={`M 290 470 L ${290 + largo * Math.cos(a)} ${470 + largo * Math.sin(a) - ancho} L ${290 + largo * Math.cos(a)} ${470 + largo * Math.sin(a) + ancho} Z`} fill="#fde68a" opacity={(n === 1 ? 0.55 : 0.55 / Math.sqrt(n)) * (1 - apaga * 0.85) * e1(t, m('claridad'))} />;
          })}
          <Linterna x={260} y={470} luz={1 - apaga} />
          <Diana x={1040} y={470} r={110 - 50 * reparte} u={sm(t, m('claridad') + 0.3, m('claridad') + 1.2)} op={(1 - 0.75 * sm(t, m('aleja'), m('aleja') + 1)) * e1(t, m('claridad'))} />
          {n > 1 && Array.from({ length: n }, (_, k) => { const a = (haz(k) * Math.PI) / 180; return Math.abs(haz(k)) > 3 && <circle key={k} cx={290 + 520 * Math.cos(a)} cy={470 + 520 * Math.sin(a)} r={18} fill={c.apagado} />; })}
        </g>
        {t >= m('acuden') && [0, 1, 2, 3].map((k) => {
          const u = sm(t, m('acuden') + 0.3 * k, m('acuden') + 0.3 * k + 1);
          const x = lerp(1200, 520 + k * 120, u);
          return <g key={k} opacity={u * (1 - apaga * 0.4)}><Persona id={ID} x={x} y={780} s={0.62} cuerpo={[AZUL_M, VIOLETA, ROSA, GRIS][k]} /><Propuesta x={x + 34} y={680} s={0.32} /></g>;
        })}
        <Letrero x={260} y={360} texto={t >= m('consume') ? 'La claridad se apaga' : 'Claridad de propósito'} fondo={t >= m('consume') ? GRIS : undefined} id={ID} tam={28} op={e1(t, m('claridad'))} />
      </Toma>

      {/* 2 · Collins y las cajas de proyectos */}
      <Toma t={t} a={m('collins')} b={m('fatiga')} cy={480}>
        <rect x={110} y={200} width={560} height={440} rx={24} fill={c.panel} opacity={e1(t, m('collins'))} />
        <Curva pts={[[150, 580], [260, 520], [370, 400], [460, 280], [540, 320], [620, 560]]} u={sm(t, m('wall'), m('wall') + 2.2)} color={t >= m('indisciplinada') ? ROJO_M : VERDE} grosor={11} />
        <Txt x={390} y={680} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('collins'))}>Cómo caen los poderosos</Txt>
        {t >= m('indisciplinada') && <Letrero x={390} y={250} texto="Búsqueda indisciplinada de más" fondo={ROJO_M} id={ID} tam={26} op={e1(t, m('indisciplinada'))} />}
        <Suelo y={760} isDark={isDark} x0={720} x1={1120} op={e1(t, m('extra'))} />
        {t >= m('extra') && (
          <g opacity={e1(t, m('extra'))}>
            <g transform={`rotate(${cajas >= 5 ? 4 * Math.sin(t * 5) : 0} 920 760)`}>
              <Persona id={ID} x={920} y={760} s={0.95} cuerpo={NARANJA} ojos={cajas >= 5 ? 0.4 : 1} />
              {Array.from({ length: cajas }, (_, k) => <Caja key={k} x={920 + (azar(k) - 0.5) * 20} y={588 - k * 62} w={110} h={56} texto={k === 0 ? 'Proyecto' : undefined} tam={20} />)}
            </g>
          </g>
        )}
      </Toma>

      {/* 3 · un millón de direcciones frente a pocas */}
      <Toma t={t} a={m('fatiga')} b={fin + 1} cy={470}>
        {ventana(t, m('fatiga'), m('millon')) > 0.01 && (
          <g opacity={ventana(t, m('fatiga'), m('millon'))}>
            <Persona id={ID} x={600} y={720} s={1} cuerpo={NARANJA} ojos={0.5} />
            {Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI * 2; return <g key={k} opacity={e1(t, m('fatiga') + 0.08 * k)}><Letrero x={600 + 330 * Math.cos(a)} y={430 + 220 * Math.sin(a)} texto="?" fondo={k % 2 ? GRIS : AZUL_M} id={ID} tam={34} /></g>; })}
          </g>
        )}
        {t >= m('millon') && (
          <g opacity={e1(t, m('millon'))}>
            <rect x={90} y={180} width={480} height={500} rx={24} fill={c.panel} />
            {Array.from({ length: 14 }, (_, k) => { const a = lerp(-1.2, 1.2, k / 13); return <Flecha key={k} x1={150} y1={430} x2={150 + 90 * Math.cos(a)} y2={430 + 90 * Math.sin(a) * 1.6} u={sm(t, m('millon'), m('millon') + 1)} color={GRIS} grosor={6} />; })}
            <Txt x={330} y={730} textAnchor="middle" fontSize={30} fill={c.texto}>Repartida</Txt>
          </g>
        )}
        {t >= m('pocas') && (
          <g opacity={e1(t, m('pocas'))}>
            <rect x={630} y={180} width={480} height={500} rx={24} fill={c.panel} />
            {[-0.18, 0.18].map((a) => <Flecha key={a} x1={680} y1={430} x2={680 + 400 * Math.cos(a)} y2={430 + 400 * Math.sin(a)} u={sm(t, m('pocas'), m('pocas') + 1.2)} color={NARANJA} grosor={14} />)}
            <Txt x={870} y={730} textAnchor="middle" fontSize={30} fill={c.texto}>Concentrada</Txt>
          </g>
        )}
        {!movil && t >= m('millon') && <Txt f="a" x={600} y={800} textAnchor="middle" fontSize={22} fill={c.tenue}>La misma energía en ambos casos</Txt>}
      </Toma>
    </Lienzo>
  );
};
