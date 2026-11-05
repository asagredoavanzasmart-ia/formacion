import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Diana, Flecha, Barra, Barco, Mar, Bandera, Suelo, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Un objetivo esencial.
 * Toma 1: dos patrones: la escalera hacia el jefe (política) y cada persona con su flecha hacia otro lado (todo es bueno);
 * llega la diana y las flechas se alinean.
 * Toma 2: la misión de Volvo como una franja de 130 palabras donde «seguridad» se enciende en la 126; las palabras que
 * más se repiten en 301 misiones; la misión de una línea.
 * Toma 3: casas que se conectan a internet una por una (Martha Lane Fox, 2012); la bandera de llegada; el Vasa que zarpa,
 * se inclina y se hunde.
 */

const ID = 'es11', P = 'es-objetivo';

const Casa: React.FC<{ x: number; y: number; on: number; t: number; color: string }> = ({ x, y, on, t, color }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-50} y={-70} width={100} height={70} rx={6} fill={color} />
    <path d="M -62 -66 L 0 -118 L 62 -66 Z" fill="#7c2d12" />
    <rect x={-14} y={-38} width={28} height={38} rx={4} fill="#fde68a" opacity={0.5 + 0.5 * on} />
    {on > 0.01 && [0, 1, 2].map((k) => <path key={k} d={`M ${-16 - k * 12} ${-136 - k * 12} Q 0 ${-150 - k * 16} ${16 + k * 12} ${-136 - k * 12}`} stroke={VERDE} strokeWidth={6} fill="none" strokeLinecap="round" opacity={on * (0.5 + 0.5 * Math.sin(t * 4 - k))} />)}
  </g>
);

export const ObjetivoES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('precision'), 'Para qué existe el equipo'], [m('politica'), 'Jugar a la política'], [m('bueno'), 'Todo es bueno'], [m('antidoto'), 'Un objetivo esencial'],
    [m('volvo'), 'La misión de Volvo'], [m('bullmore'), '301 misiones'], [m('linea'), 'Una misión de una línea'], [m('lane'), 'Martha Lane Fox'],
    [m('terminado'), 'Cómo luce terminado'], [m('vasa'), 'El Vasa, 1628'],
  ];
  const alinea = sm(t, m('antidoto'), m('antidoto') + 1.4);
  const hunde = sm(t, m('hundio'), m('hundio') + 3);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Un objetivo esencial">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · política, todo es bueno, la diana */}
      <Toma t={t} a={0} b={m('volvo')} cy={480}>
        <Suelo y={740} isDark={isDark} x0={80} x1={1120} />
        {ventana(t, m('politica') - 0.1, m('bueno')) > 0.01 && (
          <g opacity={ventana(t, m('politica') - 0.1, m('bueno'))}>
            {[0, 1, 2, 3].map((k) => <rect key={k} x={300 + k * 120} y={740 - (k + 1) * 80} width={120} height={(k + 1) * 80} rx={6} fill={c.apagado} />)}
            <Persona id={ID} x={780} y={420} s={0.9} cuerpo="#111827" corbata />
            {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={360 + k * 120 + 8 * Math.sin(t * 5 + k)} y={740 - (k + 1) * 80} s={0.6} cuerpo={[AZUL_M, ROSA, VIOLETA][k]} />)}
            <Letrero x={780} y={240} texto="La atención del jefe" fondo={GRIS} id={ID} tam={26} />
          </g>
        )}
        {t >= m('bueno') && [0, 1, 2, 3, 4].map((k) => {
          const x = 180 + k * 200;
          const caos = (azar(k + 4) - 0.5) * 2.6 - Math.PI / 2;
          const meta = Math.atan2(300 - 560, 1000 - x);
          const a = lerp(caos, meta, alinea);
          return (
            <g key={k} opacity={e1(t, m('bueno') + 0.15 * k)}>
              <Persona id={ID} x={x} y={740} s={0.7} cuerpo={[NARANJA, ROSA, AZUL_M, VIOLETA, VERDE][k]} />
              <Flecha x1={x} y1={560} x2={x + 120 * Math.cos(a)} y2={560 + 120 * Math.sin(a)} color={alinea > 0.5 ? NARANJA : GRIS} grosor={9} />
            </g>
          );
        })}
        {t >= m('antidoto') && <Diana x={1020} y={280} r={90} u={alinea} op={e1(t, m('antidoto'))} />}
      </Toma>

      {/* 2 · las misiones */}
      <Toma t={t} a={m('volvo')} b={m('lane')} cy={470}>
        {ventana(t, m('volvo') - 0.1, m('bullmore')) > 0.01 && (
          <g opacity={ventana(t, m('volvo') - 0.1, m('bullmore'))}>
            <rect x={120} y={200} width={960} height={420} rx={24} fill={c.panel} />
            {Array.from({ length: 130 }, (_, k) => {
              const on = k === 125 && t >= m('seguridad');
              return <rect key={k} x={150 + (k % 13) * 70} y={230 + Math.floor(k / 13) * 38} width={on ? 64 : 40 + (k * 7) % 22} height={18} rx={9} fill={on ? NARANJA : c.apagado} opacity={e1(t, m('volvo') + k * 0.008)} />;
            })}
            {t >= m('seguridad') && <Letrero x={600} y={700} texto="«Seguridad»: la palabra 126 de 130" id={ID} tam={30} op={e1(t, m('seguridad'))} />}
          </g>
        )}
        {ventana(t, m('bullmore') - 0.1, m('linea')) > 0.01 && (
          <g opacity={ventana(t, m('bullmore') - 0.1, m('linea'))}>
            {[['Servicio', 230], ['Clientes', 211], ['Calidad', 194]].map(([n, v], k) => (
              <Barra key={n as string} x={360 + k * 240} y={660} w={140} hMax={360} valor={v as number} max={301} u={sm(t, m('servicio') + 0.4 * k, m('servicio') + 0.4 * k + 1)} color={[GRIS, '#94a3b8', '#64748b'][k]} rotulo={n as string} c={c} />
            ))}
            <Txt f="a" x={600} y={220} textAnchor="middle" fontSize={28} fill={c.texto}>Veces que aparecen en 301 misiones (Jeremy Bullmore)</Txt>
          </g>
        )}
        {t >= m('linea') && (
          <g opacity={e1(t, m('linea'))}>
            <rect x={160} y={400} width={880 * sm(t, m('linea'), m('linea') + 1)} height={90} rx={45} fill={NARANJA} />
            <Txt x={600} y={458} textAnchor="middle" fontSize={34} fill="#fff" opacity={e1(t, m('linea') + 0.8)}>En qué es diferente este equipo</Txt>
            <Txt f="a" x={600} y={580} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('linea') + 1)}>Una línea, escrita en una mañana</Txt>
          </g>
        )}
      </Toma>

      {/* 3 · Lane Fox, terminado y el Vasa */}
      <Toma t={t} a={m('lane')} b={fin + 1} cy={480}>
        {ventana(t, m('lane') - 0.1, m('terminado')) > 0.01 && (
          <g opacity={ventana(t, m('lane') - 0.1, m('terminado'))}>
            <Suelo y={640} isDark={isDark} x0={80} x1={1120} />
            {Array.from({ length: 6 }, (_, k) => <Casa key={k} x={160 + k * 176} y={640} t={t} on={sm(t, m('conectados') + 0.35 * k, m('conectados') + 0.35 * k + 0.5)} color={[AZUL_M, ROSA, VIOLETA, VERDE, NARANJA, '#0ea5e9'][k]} />)}
            <Letrero x={600} y={300} texto="Todos conectados a internet a fines de 2012" id={ID} tam={28} op={e1(t, m('conectados'))} />
            <Txt f="a" x={600} y={720} textAnchor="middle" fontSize={28} fill={c.texto}>Martha Lane Fox, campeona digital del Reino Unido</Txt>
          </g>
        )}
        {t >= m('terminado') && (
          <g opacity={e1(t, m('terminado'))}>
            <Mar x={0} y={600} w={1200} h={260} t={t} color={isDark ? '#1e3a5f' : '#7dd3fc'} oscuro={isDark ? '#0f2742' : '#38bdf8'} />
            {t < m('vasa') && <Bandera x={600} y={600} alto={220} color={VERDE} t={t} />}
            {t >= m('vasa') && (
              <g transform={`translate(${lerp(300, 620, sm(t, m('vasa'), m('hundio')))} ${600 + hunde * 260}) rotate(${hunde * 38})`} opacity={1 - hunde * 0.6}>
                <Barco x={0} y={0} s={2.2} casco="#7c2d12" vela="#f8fafc" />
              </g>
            )}
            {t >= m('vasa') && <Letrero x={600} y={230} texto={t >= m('hundio') ? 'Se hundió en su viaje inaugural' : 'El diseño cambió una y otra vez'} fondo={t >= m('hundio') ? ROJO_M : GRIS} id={ID} tam={28} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
