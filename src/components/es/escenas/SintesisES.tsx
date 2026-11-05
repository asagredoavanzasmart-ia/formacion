import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Flecha, Suelo, Destello, Estrella, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Síntesis: ¿qué es lo esencial?
 * Toma 1: los cimientos de la mentalidad (elegir, casi todo es ruido, renunciar) y sobre ellos el ciclo de tres
 * estaciones, cada una con sus tácticas que aparecen como chispas; una línea enredada que se vuelve recta.
 * Toma 2: el costo inmediato (alguien decepcionado, una oportunidad que se va) frente a algo más valioso: el equipo que
 * avanza lejos en pocas direcciones.
 * Toma 3: la pregunta como una lente: de muchos puntos solo pasa uno, que brilla; el resto se apaga.
 */

const ID = 'es25', P = 'es-sintesis';

export const SintesisES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('manera'), 'Una manera de trabajar'], [m('mentalidad'), 'La mentalidad'], [m('ciclo'), 'El ciclo'], [m('simple'), 'Lo simple'],
    [m('costo'), 'Un costo inmediato'], [m('valioso'), 'Algo más valioso'], [m('oliver'), 'Mary Oliver'], [m('pregunta'), '¿Qué es lo esencial?'],
  ];
  const BASE = ['Elegir', 'Casi todo es ruido', 'Renunciar'];
  const EST: [string, string, string, string[]][] = [
    ['explorar', 'Explorar', AZUL_M, ['Espacio', 'Encabezado', 'Palabras simples', 'Descanso', 'Criterios']],
    ['eliminar', 'Eliminar', ROSA, ['Objetivo', 'No elegante', 'Salir', 'Límites', 'Menos información']],
    ['ejecutar', 'Ejecutar', VERDE, ['Colchones', 'Raíz', 'Menos pasos', 'Victorias', 'Rutinas', 'Presente']],
  ];
  const recta = sm(t, m('simple') + 0.5, m('simple') + 2);
  const lente = sm(t, m('elimina'), m('elimina') + 1.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="¿Qué es lo esencial?">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · cimientos y ciclo */}
      <Toma t={t} a={0} b={m('costo')} cy={470}>
        {ventana(t, 0, m('simple')) > 0.01 && (
          <g opacity={ventana(t, 0, m('simple'))}>
            {BASE.map((b, k) => (
              <g key={b} opacity={e1(t, m('mentalidad') + 0.5 * k)}>
                <rect x={150 + k * 310} y={680} width={290} height={100} rx={14} fill={isDark ? '#57534e' : '#d6d3d1'} />
                <Txt x={295 + k * 310} y={742} textAnchor="middle" fontSize={k === 1 ? 26 : 30} fill="#292524">{movil && k === 1 ? 'Ruido' : b}</Txt>
              </g>
            ))}
            {EST.map(([n, nom, col, tac], k) => {
              const x = 270 + k * 330, y = 430;
              const on = t >= m(n);
              return (
                <g key={n} opacity={on ? e1(t, m(n)) : t >= m('ciclo') ? 0.25 : 0}>
                  <circle cx={x} cy={y} r={100} fill={col} />
                  <Txt x={x} y={y + 12} textAnchor="middle" fontSize={36} fill="#fff">{nom}</Txt>
                  {on && tac.map((tx, j) => { const a = -Math.PI / 2 + (j / tac.length) * Math.PI * 2 + t * 0.2; return <circle key={tx} cx={x + 124 * Math.cos(a)} cy={y + 124 * Math.sin(a)} r={12} fill={col} opacity={e1(t, m(n) + 0.3 + 0.25 * j)} />; })}
                </g>
              );
            })}
            {t >= m('ciclo') && [0, 1].map((k) => <Flecha key={k} x1={400 + k * 330} y1={430} x2={470 + k * 330} y2={430} u={e1(t, m('ciclo') + 0.5 * k)} color={c.apagado} grosor={10} />)}
          </g>
        )}
        {t >= m('simple') && (
          <g opacity={e1(t, m('simple'))}>
            <path d={Array.from({ length: 44 }, (_, k) => { const x = 160 + k * 20; const y = 460 + (1 - recta) * (80 * Math.sin(k * 1.3) + 50 * Math.cos(k * 0.7)); return `${k ? 'L' : 'M'} ${x} ${y}`; }).join(' ')} stroke={recta > 0.9 ? NARANJA : GRIS} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <Letrero x={600} y={300} texto="Lo fácil de hacer, después de pensar bien" id={ID} tam={28} op={recta} />
          </g>
        )}
      </Toma>

      {/* 2 · costo inmediato y algo más valioso */}
      <Toma t={t} a={m('costo')} b={m('oliver')} cy={480}>
        <Suelo y={760} isDark={isDark} x0={80} x1={1120} />
        <g opacity={e1(t, m('costo'))}>
          <Persona id={ID} x={240} y={760} s={1} cuerpo={GRIS} ojos={0.3} />
          <g transform={`translate(${lerp(400, 560, sm(t, m('costo') + 0.8, m('costo') + 2.2))} 640)`} opacity={1 - sm(t, m('costo') + 1, m('costo') + 2.2)}><rect x={-60} y={-40} width={120} height={80} rx={14} fill={AZUL_M} /><Txt x={0} y={10} textAnchor="middle" fontSize={22} fill="#fff">Oportunidad</Txt></g>
          <Txt x={240} y={460} textAnchor="middle" fontSize={28} fill={c.texto}>Un costo hoy</Txt>
        </g>
        {t >= m('valioso') && (
          <g opacity={e1(t, m('valioso'))}>
            {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={lerp(700, 860, sm(t, m('valioso'), m('valioso') + 3)) + k * 90} y={760} s={0.9} cuerpo={[NARANJA, ROSA, VIOLETA][k]} />)}
            <Flecha x1={680} y1={480} x2={1120} y2={480} u={sm(t, m('valioso') + 0.4, m('valioso') + 1.6)} color={NARANJA} grosor={16} />
            <Txt x={900} y={420} textAnchor="middle" fontSize={28} fill={c.texto}>Avanzar en pocas direcciones</Txt>
          </g>
        )}
      </Toma>

      {/* 3 · la lente de la pregunta */}
      <Toma t={t} a={m('oliver')} b={fin + 1} cy={470}>
        {Array.from({ length: 24 }, (_, k) => <Estrella key={k} x={80 + azar(k) * 1040} y={120 + azar(k + 9) * 220} r={4 + azar(k + 3) * 6} fill={isDark ? '#fde68a' : '#94a3b8'} op={0.4 + 0.4 * Math.sin(t * 2 + k)} />)}
        {ventana(t, m('oliver') - 0.1, m('pregunta')) > 0.01 && (
          <g opacity={ventana(t, m('oliver') - 0.1, m('pregunta'))}>
            <Txt x={600} y={440} textAnchor="middle" fontSize={40} fill={c.texto}>«Tu única, libre</Txt>
            <Txt x={600} y={500} textAnchor="middle" fontSize={40} fill={c.texto} opacity={e1(t, m('preciosa'))}>y preciosa vida»</Txt>
            <Txt f="a" x={600} y={580} textAnchor="middle" fontSize={26} fill={NARANJA}>Mary Oliver</Txt>
          </g>
        )}
        {t >= m('pregunta') && (
          <g opacity={e1(t, m('pregunta'))}>
            {Array.from({ length: 18 }, (_, k) => {
              const elegido = k === 7;
              const x0 = 160 + (k % 6) * 170, y0 = 420 + Math.floor(k / 6) * 110;
              const x = elegido ? lerp(x0, 600, lente) : x0, y = elegido ? lerp(y0, 560, lente) : y0;
              return <circle key={k} cx={x} cy={y} r={elegido ? lerp(18, 46, lente) : 18} fill={elegido ? NARANJA : GRIS} opacity={elegido ? 1 : 1 - 0.85 * lente} />;
            })}
            <circle cx={600} cy={560} r={150} fill="none" stroke={`url(#${ID}-marca)`} strokeWidth={16} opacity={lente} />
            {lente > 0.6 && [0, 1, 2, 3].map((k) => <Destello key={k} x={600 + 90 * Math.cos(t + k * 1.57)} y={560 + 90 * Math.sin(t + k * 1.57)} r={14} />)}
            <Letrero x={600} y={300} texto="¿Qué es lo esencial?" id={ID} tam={38} />
            {!movil && t >= m('elimina') && <Txt f="a" x={600} y={790} textAnchor="middle" fontSize={24} fill={c.tenue}>Lo que no responde a ella, se elimina</Txt>}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
