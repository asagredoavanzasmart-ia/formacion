import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Gente, Persona, Monitor, Burbuja, Visto, Regalo, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Contenido gratuito.
 * Toma 1: el dato de las encuestas: de cada cien clientes que agendaron desde un anuncio, 78 habían visto al menos dos
 * piezas largas (una cuadrícula de 100 figuras que se colorea).
 * Toma 2: una cadena de tres eslabones: un anzuelo (enganchar), una cuerda con nudos numerados (retener) y un regalo
 * abierto (recompensar); «cómo lo hice yo».
 * Toma 3: una balanza de valor y pedido: 3,5 a 1 de la televisión, y más allá, hasta que llega el mensaje privado
 * «¿cómo te contrato?».
 */

const ID = 'ad21', P = 'ad-contenido';

export const ContenidoAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('audiencia'), 'Uno a muchos'], [m('setenta'), 'El 78 % ya había visto contenido'], [m('mejor'), 'Hace convertir mejor'], [m('eslabones'), 'Tres eslabones'],
    [m('monetizar'), 'Valor antes que pedidos'], [m('privado'), 'Te preguntan en privado'],
  ];
  const vistos = Math.round(78 * sm(t, m('setenta'), m('setenta') + 1.5));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Contenido gratuito">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El 78 % */}
      <Toma t={t} a={0} b={m('eslabones')} cy={470}>
        <g opacity={e1(t, m('audiencia'))}>
          <Monitor x={260} y={720} w={300} h={200}>
            <path d="M 130 70 L 180 100 L 130 130 Z" fill={ROSA} />
          </Monitor>
          {Array.from({ length: 6 }, (_, k) => <circle key={k} cx={130 + k * 50} cy={760 + 6 * Math.sin(t * 2 + k)} r={14} fill={GRIS} />)}
        </g>
        {t >= m('encuestas') && (
          <g opacity={e1(t, m('encuestas'))}>
            {Array.from({ length: 100 }, (_, k) => <circle key={k} cx={560 + (k % 10) * 52} cy={220 + Math.floor(k / 10) * 46} r={17} fill={k < vistos ? VIOLETA : c.apagado} />)}
            {t >= m('setenta') && <Cifra x={820} y={730} valor={78} u={sm(t, m('setenta'), m('setenta') + 1.5)} suf=" %" tam={84} color={VIOLETA} />}
            {t >= m('dos') && <Letrero x={820} y={790} texto="Vieron 2 piezas largas antes" fondo={VIOLETA} id={ID} tam={24} op={e1(t, m('dos'))} />}
          </g>
        )}
        {t >= m('mejor') && <Letrero x={260} y={300} texto="Hace convertir mejor" fondo={VERDE} id={ID} tam={26} op={e1(t, m('mejor'))} />}
      </Toma>

      {/* 2 · Enganchar, retener, recompensar */}
      <Toma t={t} a={m('eslabones')} b={m('monetizar')} cy={470}>
        <g opacity={e1(t, m('eslabones'))}>
          <path d="M 120 470 H 1080" stroke={c.apagado} strokeWidth={10} strokeDasharray="20 18" />
          {([['enganchas', 'Enganchar', 240, AMBAR], ['retienes', 'Retener', 600, AZUL_M], ['recompensas', 'Recompensar', 960, VERDE]] as const).map(([n, txt, x, col], k) => (
            <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.2}>
              <ellipse cx={x} cy={470} rx={150} ry={100} fill="none" stroke={col} strokeWidth={30} />
              <g transform={`translate(${x} 470)`}>
                {k === 0 && <path d={`M 0 -60 V 20 Q 0 50 -26 50 Q -50 50 -50 26`} stroke={c.texto} strokeWidth={10} fill="none" strokeLinecap="round" transform={`rotate(${8 * Math.sin(t * 2)})`} />}
                {k === 1 && [0, 1, 2].map((j) => <g key={j}><circle cx={-60 + j * 60} cy={0} r={22} fill={col} /><Txt x={-60 + j * 60} y={10} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>{j + 1}</Txt></g>)}
                {k === 2 && <Regalo x={0} y={40} s={0.8} color={col} />}
              </g>
              <Letrero x={x} y={640} texto={txt} fondo={col} id={ID} tam={28} />
            </g>
          ))}
          {t >= m('enganchas') && !movil && <Txt f="a" x={240} y={300} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={ventana(t, m('enganchas'), m('retienes'))}>actualidad · nicho · conflicto…</Txt>}
          {t >= m('hiciste') && (
            <g opacity={e1(t, m('hiciste'))}>
              <Persona id={ID} x={960} y={300} s={0.45} cuerpo={NARANJA} />
              <Letrero x={600} y={760} texto="«Cómo lo hice yo», no «deberías»" fondo={NARANJA} id={ID} tam={26} />
            </g>
          )}
        </g>
      </Toma>

      {/* 3 · Valor antes que pedidos */}
      <Toma t={t} a={m('monetizar')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('monetizar'))}>
          {Array.from({ length: 10 }, (_, k) => {
            const on = k < lerp(3.5, 9, sm(t, m('television') + 0.5, m('privado')));
            return <rect key={k} x={170 + k * 80} y={360} width={66} height={120} rx={14} fill={on ? VERDE : c.apagado} opacity={on ? 1 : 0.5} />;
          })}
          <rect x={970} y={360} width={66} height={120} rx={14} fill={ROSA} />
          <Txt f="a" x={560} y={540} textAnchor="middle" fontSize={26} fill={c.texto}>Valor</Txt>
          <Txt f="a" x={1003} y={540} textAnchor="middle" fontSize={26} fill={c.texto}>Oferta</Txt>
          {t >= m('television') && <Letrero x={460} y={280} texto="TV: 3,5 a 1" fondo={GRIS} id={ID} tam={28} op={ventana(t, m('television'), m('privado'))} />}
        </g>
        {t >= m('privado') && (
          <g opacity={e1(t, m('privado'))}>
            <Persona id={ID} x={300} y={790} s={0.5} cuerpo={AZUL_M} />
            <Burbuja x={360} y={690} w={420} texto="¿Cómo te contrato?" u={sm(t, m('privado'), m('privado') + 1)} c={c} id={ID} tam={32} marca />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
