import React from 'react';
import { useEscenaVC, Lienzo, Rotulo, Letrero, Txt, BarcoModos, pesosModo, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, VERDE, GRIS } from './kitVC';
import type { PropsCE, PesosModo } from './kitVC';

/**
 * Modos de respuesta (Miller y Heiman): se compra solo cuando se percibe una brecha entre la realidad y lo deseado.
 * A la izquierda, el medidor de la brecha: la línea de lo deseado y el nivel de la realidad. A la derecha, el barco de la
 * diapositiva original de Ventas B2B, con su mismo dibujo, que pasa por los cuatro modos al ritmo del audio:
 * crecimiento (puerto y grúa), problemas (agujero y humo), equilibrio (quieto) y exceso de confianza (viento y estela).
 */

const ID = 'vc20', P = 'vc-modos';
const COLOR: Record<keyof PesosModo, string> = { crec: '#3b82f6', prob: '#ef4444', equi: '#10b981', exce: '#a855f7' };
const NIVEL: Record<keyof PesosModo, number> = { crec: 0.5, prob: 0.14, equi: 0.7, exce: 0.92 };

export const ModosVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('regla'), 'Una regla'], [m('brecha'), 'Se compra si hay brecha'], [m('crecimiento'), 'Crecimiento'], [m('problemas'), 'Problemas'],
    [m('equilibrio'), 'Equilibrio'], [m('exceso'), 'Exceso de confianza'],
  ];
  const k = pesosModo(t, [[0, 'equi'], [m('crecimiento'), 'crec'], [m('problemas'), 'prob'], [m('equilibrio'), 'equi'], [m('exceso'), 'exce']]);
  const modoVis = t >= m('crecimiento');
  // Nivel de la realidad: antes del primer modo coincide con lo deseado.
  const tot = k.crec + k.prob + k.equi + k.exce || 1;
  const real = modoVis ? (k.crec * NIVEL.crec + k.prob * NIVEL.prob + k.equi * NIVEL.equi + k.exce * NIVEL.exce) / tot : lerp(0.7, 0.45, sm(t, m('brecha'), m('brecha') + 1.5));
  const colReal = !modoVis ? NARANJA : k.prob >= 0.5 ? COLOR.prob : k.crec >= 0.5 ? COLOR.crec : k.exce >= 0.5 ? COLOR.exce : COLOR.equi;
  const DES = 0.7;
  const Y = (v: number) => lerp(700, 220, v);
  const gx0 = 70, gx1 = 300;
  const opG = e1(t, m('brecha'));
  const brecha = Math.abs(DES - real);

  // Letrero de cada momento (uno a la vez, en la franja de abajo).
  const dichos: [number, string, string?][] = [
    [m('rapido'), '«Más, mejor, más rápido»', COLOR.crec], [m('alta'), 'Probabilidad de cierre alta', COLOR.crec],
    [m('sacame'), '«Sácame de aquí»', COLOR.prob], [m('precedencia'), 'El problema pasa antes', COLOR.prob], [m('granero'), 'Nadie techa un granero en llamas', COLOR.prob],
    [m('bote'), '«No muevas el bote»', COLOR.equi], [m('salidas'), 'Tres salidas', COLOR.equi],
    [m('regata'), 'Cree que gana la regata', COLOR.exce], [m('espera'), 'Espera atenta', COLOR.exce],
  ];
  let actual: [number, string, string?] | null = null;
  const inicioModo = Math.max(...[m('crecimiento'), m('problemas'), m('equilibrio'), m('exceso')].filter((x) => t >= x), -1);
  for (const d of dichos) if (t >= d[0] - 0.1 && d[0] >= inicioModo) actual = d;
  const salidas = ['Ve venir un cambio', 'Presión de otro rol', 'Una brecha que no ve'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Modos de respuesta">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* medidor de la brecha */}
      {opG > 0.01 && (
        <g opacity={opG}>
          <rect x={gx0} y={190} width={gx1 - gx0} height={540} rx={26} fill={c.panel} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
          <rect x={150} y={Y(1)} width={70} height={480} rx={10} fill={c.panel2} opacity={0.6} />
          <rect x={150} y={Y(real)} width={70} height={700 - Y(real)} rx={10} fill={colReal} opacity={0.9} />
          <line x1={gx0 + 16} y1={Y(DES)} x2={gx1 - 16} y2={Y(DES)} stroke={c.texto} strokeWidth={5} strokeDasharray="14 10" />
          <Txt x={(gx0 + gx1) / 2} y={Y(DES) - 16} textAnchor="middle" fontSize={26} fill={c.texto}>Deseado</Txt>
          <Txt x={(gx0 + gx1) / 2} y={Math.min(712, Math.max(Y(real) + 38, Y(DES) + 44))} textAnchor="middle" fontSize={26} fill={c.texto} opacity={real > 0.3 || real > DES ? 1 : 0}>Realidad</Txt>
          {brecha > 0.08 && real < DES && (
            <g opacity={sm(brecha, 0.08, 0.2)}>
              <line x1={250} y1={Y(DES) + 8} x2={250} y2={Y(real) - 8} stroke={colReal} strokeWidth={5} />
              <path d={`M 240 ${Y(DES) + 20} L 250 ${Y(DES) + 6} L 260 ${Y(DES) + 20} Z`} fill={colReal} />
            </g>
          )}
          <Txt x={(gx0 + gx1) / 2} y={760 + 6} textAnchor="middle" fontSize={26} fill={brecha > 0.08 ? colReal : GRIS}>{brecha > 0.08 ? (real < DES ? 'Hay brecha' : 'Supera lo esperado') : 'Sin brecha'}</Txt>
        </g>
      )}

      {/* el barco de la diapositiva original */}
      <BarcoModos x={745} y={460} w={790} h={540} t={t} k={k} isDark={isDark} id={ID} op={e1(t, m('barco'))} />

      {/* lo que dice cada modo */}
      {actual && !(actual[1] === 'Tres salidas' && !movil && t >= m('salidas') + 1.2) && <Letrero key={actual[1]} x={745} y={800} texto={actual[1]} fondo={actual[2]} id={ID} op={e1(t, actual[0])} tam={26} />}
      {!movil && t >= m('salidas') + 1.2 && t < m('exceso') && salidas.map((s, j) => (
        <Letrero key={s} x={455 + j * 290} y={800} texto={s} fondo={j === 1 ? VERDE : ROSA} id={ID} op={e1(t, m('salidas') + 1.2 + j * 1.6)} tam={22} />
      ))}
    </Lienzo>
  );
};
