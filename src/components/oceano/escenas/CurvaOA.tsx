import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Txt, ac, sombra, tono } from '../../remotion/comun';
import { PanelPregunta, Rotulo, W, H, borde, e1, marcador } from './comunOA';
import { AZUL_M, Curva, ROJO_M, ROJO_O } from './comunOA';
import type { PropsCE } from './comunOA';

/**
 * «La curva de valor», escena propia: el lienzo estratégico de la imagen del Cirque du Soleil, dibujado y
 * trazado en vivo y rotulado como la imagen: los doce factores bajo el eje, las franjas Eliminar, Reducir,
 * Aumentar y Crear, y el nombre de cada curva. Acto A: dos curvas genéricas que se pegan. Acto B: Ringling
 * Brothers (roja) y un circo regional (roja punteada) suben y bajan juntos. Acto C: la curva azul del Cirque
 * du Soleil, columna por columna. Acto D: el lienzo de tu empresa con dos competidores y tres curvas.
 */

const ID = 'oa5';
const nombres = ['factores', 'nivel', 'unir', 'pegadas', 'ringling', 'regional', 'mismo', 'cirque', 'elimina', 'reduce', 'aumenta', 'crea', 'precio', 'tuya', 'compet', 'tres', 'pregunta'] as const;

const FACT = ['Precio', 'Estrellas del espectáculo', 'Espectáculos con animales', 'Concesiones en los pasillos', 'Varias pistas', 'Diversión y humor', 'Emoción y peligro', 'Lugar único', 'Temática', 'Ambiente refinado', 'Varias producciones', 'Música y danza'];
const CORTO = ['Precio', 'Estrellas', 'Animales', 'Pasillos', 'Pistas', 'Humor', 'Peligro', 'Sede única', 'Temática', 'Ambiente', 'Obras', 'Música'];
const RINGLING = [0.27, 0.7, 0.8, 0.8, 0.65, 0.85, 0.85, 0.25];
const REGIONAL = [0.2, 0.5, 0.6, 0.65, 0.55, 0.72, 0.72, 0.2];
const CIRQUE = [0.55, 0.04, 0.04, 0.04, 0.04, 0.45, 0.46, 0.92, 0.62, 0.62, 0.62, 0.62];
const GEN_A = [0.55, 0.4, 0.62, 0.5, 0.7, 0.45, 0.6, 0.72, 0.5, 0.58, 0.66, 0.52];
const X = (k: number) => 190 + k * (900 / 11);
const Y = (l: number) => 500 - l * 230;
const pts = (v: number[]): [number, number][] => v.map((l, k) => [X(k), Y(l)]);
/* franjas: columnas desde, hasta, color, momento, rótulo, centro y fila del encabezado */
const BANDAS: [number, number, string, string, string, number][] = [
  [1, 4, ROJO_M, 'elimina', 'Eliminar', 188], [5, 6, NARANJA, 'reduce', 'Reducir', 236], [7, 7, '#10b981', 'aumenta', 'Aumentar', 188], [8, 11, AZUL_M, 'crea', 'Crear', 236],
];

export const CurvaOA: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('tres') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  // agenda de factores nombrados: [segundo, índice del factor]
  const rep = (a: number, b: number, ks: number[]) => ks.map((k, i): [number, number] => [a + ((b - a) * i) / ks.length, k]);
  const agenda: [number, number][] = [
    ...rep(M('mismo') + 0.4, M('cirque') - 0.6, [1, 2, 3, 4, 5, 6]),
    ...rep(M('elimina'), M('reduce') - 0.2, [1, 2, 3, 4]), ...rep(M('reduce'), M('aumenta') - 0.2, [5, 6]), [M('aumenta'), 7],
    ...rep(M('crea'), M('precio') - 0.4, [8, 9, 10, 11]), [M('precio'), 0],
  ];
  const sig = agenda.filter(([ti]) => ti <= t).pop();
  const activo = sig && t < sig[0] + 2.6 && !(t >= M('tuya')) ? sig : undefined;

  const rotulos: [number, string][] = [
    [0.2, 'Lienzo estratégico'], [M('factores'), 'Factores del sector'], [M('nivel'), 'Nivel de oferta'], [M('unir'), 'Unir los puntos'], [M('pegadas'), 'Curvas casi pegadas'],
    [M('ringling'), 'Ringling Brothers'], [M('regional'), 'Un circo regional'], [M('mismo'), 'Compiten en lo mismo'], [M('cirque'), 'Cirque du Soleil'],
    ...agenda.map(([ti, k]): [number, string] => [ti, FACT[k]]),
    [M('tuya'), 'Dibuja la tuya'], [M('compet'), 'Con dos competidores'], [M('tres'), '¿Se parecen?'],
  ];

  // llegada de cada punto azul (segundo)
  const llega = (k: number) => (k === 0 ? M('cirque') : (agenda.filter(([, kk], i) => kk === k && i >= 6).pop()?.[0] ?? 1e6) + 0.7);
  const uAz = Array.from({ length: 11 }, (_, i) => ac(t, llega(i + 1) - 0.7, llega(i + 1))).reduce((a, b) => a + b, 0) / 11;

  const aA = 1 - ac(t, M('ringling') - 0.4, M('ringling'));
  const aD = ac(t, M('tuya'), M('tuya') + 0.6);
  const aBC = (1 - aD) * ac(t, M('ringling') - 0.4, M('ringling'));

  // D · tu lienzo
  const NOM = ['Precio', 'Plazo', 'Soporte', 'Catálogo'];
  const XD = (k: number) => 260 + k * 260;
  const mine = [0.7, 0.5, 0.6, 0.8], c1 = [0.68, 0.52, 0.58, 0.78], c2 = [0.72, 0.48, 0.62, 0.82];
  const ptsD = (v: number[]): [number, number][] => v.map((l, k) => [XD(k), Y(l)]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Lienzo estratégico: Cirque du Soleil frente a Ringling Brothers y un circo regional">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* el lienzo: panel, ejes y niveles */}
            <g opacity={e1(t, 0.3)}>
              <rect x={60} y={120} width={1080} height={730} rx={22} fill={c.panel} style={sombra(c.sombra, 6, 16)} />
              <rect x={130} y={256} width={6} height={270} rx={3} fill={c.apagado} />
              <rect x={130} y={520} width={980} height={6} rx={3} fill={c.apagado} />
              <Txt f="a" x={118} y={290} textAnchor="end" fontSize={28} fill={c.tenue} opacity={e1(t, M('nivel'))}>alto</Txt>
              <Txt f="a" x={118} y={522} textAnchor="end" fontSize={28} fill={c.tenue} opacity={e1(t, M('nivel'))}>bajo</Txt>
            </g>

            {/* A y B y C · doce factores */}
            {(1 - aD) > 0.01 && (
              <g opacity={1 - aD}>
                {/* franjas Eliminar, Reducir, Aumentar y Crear */}
                {BANDAS.map(([a, b, col, mom, nom, fy]) => {
                  const t0 = M(mom as typeof nombres[number]);
                  return (
                    <g key={nom} opacity={e1(t, t0)}>
                      <rect x={X(a) - 41} y={246} width={X(b) - X(a) + 82} height={274} rx={20} fill={col} opacity={0.14} />
                      <Txt f="a" x={(X(a) + X(b)) / 2} y={fy} textAnchor="middle" fontSize={28} fill={col}>{nom}</Txt>
                    </g>
                  );
                })}
                {/* los doce factores, rotulados bajo el eje */}
                {FACT.map((_, k) => (
                  <g key={k} opacity={e1(t, M('factores') + k * 0.12)}>
                    <circle cx={X(k)} cy={523} r={8} fill={activo && activo[1] === k ? ROSA : c.apagado} />
                    <Txt f="a" x={0} y={0} fontSize={26} fill={activo && activo[1] === k ? ROSA : c.texto} transform={`translate(${X(k) + 9} 548) rotate(90)`}>{CORTO[k]}</Txt>
                  </g>
                ))}
                {/* A · dos curvas genéricas que se pegan */}
                {aA > 0.01 && (
                  <g opacity={aA}>
                    {pts(GEN_A).map(([px, py], k) => <circle key={k} cx={px} cy={py} r={12 + 5 * Math.sin(t * 4 + k)} fill={NARANJA} opacity={e1(t, M('unir') - 0.1) * 0.35} />)}
                    <Curva pts={pts(GEN_A)} u={ac(t, M('unir'), M('unir') + 2.5)} color={NARANJA} />
                    <Curva pts={pts(GEN_A.map((v, k) => v + 0.035 * Math.sin(k * 1.7)))} u={ac(t, M('unir') + 1.5, M('unir') + 4)} color="#7c3aed" op={0.9} />
                    <Txt f="a" x={600} y={186} textAnchor="middle" fontSize={28} fill={ROSA} opacity={e1(t, M('pegadas'))}>sin diferenciación</Txt>
                  </g>
                )}
                {/* B · Ringling y el circo regional */}
                {aBC > 0.01 && (
                  <g opacity={aBC}>
                    <Curva pts={pts(REGIONAL)} u={ac(t, M('regional'), M('mismo') + 7)} color={ROJO_M} grosor={8} punteada op={0.9} />
                    <Curva pts={pts(RINGLING)} u={ac(t, M('ringling'), M('mismo') + 7)} color={ROJO_M} grosor={10} />
                    <Txt f="a" x={X(2.5)} y={Y(0.8) - 24} textAnchor="middle" fontSize={26} fill={ROJO_O} opacity={e1(t, M('ringling') + 1)}>Ringling</Txt>
                    <Txt f="a" x={X(2.5)} y={Y(0.6) + 70} textAnchor="middle" fontSize={26} fill={ROJO_O} opacity={e1(t, M('regional') + 1)}>Regional</Txt>
                    {/* C · Cirque du Soleil */}
                    {t >= M('cirque') && (
                      <g>
                        <circle cx={X(0)} cy={Y(CIRQUE[0])} r={12 + 4 * Math.sin(t * 4)} fill={AZUL_M} opacity={e1(t, M('cirque'))} />
                        <Curva pts={pts(CIRQUE)} u={uAz} color={AZUL_M} grosor={12} />
                        <g opacity={e1(t, M('cirque') + 0.6)}>
                          <Txt f="a" x={985} y={422} textAnchor="middle" fontSize={26} fill={AZUL_M}>Cirque</Txt>
                          <Txt f="a" x={985} y={466} textAnchor="middle" fontSize={26} fill={AZUL_M}>du Soleil</Txt>
                        </g>
                      </g>
                    )}
                  </g>
                )}
              </g>
            )}

            {/* D · el lienzo de tu empresa */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {NOM.map((n, k) => (
                  <g key={n} opacity={e1(t, M('tuya') + 0.3 + k * 0.2)}>
                    <circle cx={XD(k)} cy={523} r={9} fill={c.apagado} />
                    <Txt f="a" x={XD(k)} y={580} textAnchor="middle" fontSize={28} fill={c.texto}>{n}</Txt>
                  </g>
                ))}
                <Curva pts={ptsD(mine)} u={ac(t, M('tuya') + 0.6, M('tuya') + 3)} color={NARANJA} grosor={11} />
                <Curva pts={ptsD(c1)} u={ac(t, M('compet'), M('compet') + 2.2)} color="#7c3aed" grosor={9} />
                <Curva pts={ptsD(c2)} u={ac(t, M('compet') + 1, M('compet') + 3.2)} color="#0f766e" grosor={9} />
                <Txt f="a" x={600} y={200} textAnchor="middle" fontSize={28} fill={ROSA} opacity={e1(t, M('tres'))}>curvas parecidas</Txt>
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
