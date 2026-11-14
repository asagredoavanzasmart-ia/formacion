import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Bombilla, Curva, Visto, Cruz, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El puente de la epifanía.
 * Toma 1: dos orillas, «el oyente» y «tu creencia»; un puente de tablas que se va armando con la historia, mientras la
 * jerga técnica cae al agua. El «algo así como» une una palabra nueva con algo conocido.
 * Toma 2: las ocho preguntas como un camino con ocho hitos y la bombilla de la epifanía en el centro; el personaje que
 * persigue su deseo frente a un muro (Hauge).
 * Toma 3: la condición: una historia sincera (visto) frente a una inventada (cruz).
 */

const ID = 'br10', P = 'br-epifania';

export const EpifaniaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('emocion'), 'Emoción, luego lógica'], [m('puente'), 'El puente de la epifanía'], [m('jerga'), 'Sin jerga'], [m('ocho'), 'Ocho preguntas'],
    [m('hauge'), 'Un deseo y un obstáculo'], [m('verdad'), 'Si es verdad'],
  ];
  const tablas = sm(t, m('historia'), m('puente') + 2) * 8;
  const PASOS = ['Historia', 'Deseo', 'Muro', 'Epifanía', 'Plan', 'Conflicto', 'Logro', 'Cambio'];
  const avanza = sm(t, m('fondo'), m('transformacion') + 0.8) * 8;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El puente de la epifanía">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El puente entre dos orillas */}
      <Toma t={t} a={0} b={m('ocho')} cy={470}>
        <g opacity={e1(t, 0.3)}>
          <rect x={60} y={560} width={300} height={220} rx={24} fill={c.panel2} />
          <rect x={840} y={560} width={300} height={220} rx={24} fill={c.panel2} />
          <path d={`M 360 680 Q 600 ${700 + 10 * Math.sin(t * 2)} 840 680 V 780 H 360 Z`} fill={AZUL_M} opacity={0.35} />
          <Persona id={ID} x={210} y={560} s={0.6} cuerpo={GRIS} />
          <Letrero x={210} y={820} texto="El oyente" fondo={GRIS} id={ID} tam={26} />
          <Bombilla x={990} y={470} s={1.1} id={ID} t={t} luz={sm(t, m('puente'), m('puente') + 2)} />
          <Letrero x={990} y={820} texto="Tu creencia" fondo={AMBAR} id={ID} tam={26} />
        </g>
        {t >= m('emocion') && <Letrero x={600} y={300} texto="Primero emoción, luego lógica" fondo={ROSA} id={ID} tam={28} op={ventana(t, m('emocion'), m('jerga'))} />}
        {Array.from({ length: 8 }, (_, k) => {
          const u = Math.max(0, Math.min(1, tablas - k));
          return u > 0.01 ? <rect key={k} x={370 + k * 58} y={560 - 20 * (1 - u)} width={52} height={18} rx={5} fill={NARANJA} opacity={u} /> : null;
        })}
        {t >= m('jerga') && (
          <g opacity={ventana(t, m('jerga'), m('algo'))}>
            {['ROI', 'KPI', 'API', 'SaaS'].map((w, k) => {
              const ph = sm(t, m('jerga') + k * 0.25, m('jerga') + k * 0.25 + 1.2);
              return <g key={w} transform={`translate(${430 + k * 100} ${300 + ph * 380}) rotate(${ph * 70})`} opacity={1 - ph * 0.7}><rect x={-44} y={-26} width={88} height={52} rx={12} fill={GRIS} /><Txt x={0} y={10} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>{w}</Txt></g>;
            })}
            {t >= m('klaver') && <Letrero x={600} y={250} texto="La jerga mata la venta" fondo={ROJO_M} id={ID} tam={26} op={e1(t, m('klaver'))} />}
          </g>
        )}
        {t >= m('algo') && (
          <g opacity={e1(t, m('algo'))}>
            <Burbuja x={380} y={240} w={440} texto="«Es algo así como…»" u={sm(t, m('algo'), m('algo') + 1)} c={c} id={ID} tam={30} />
          </g>
        )}
      </Toma>

      {/* 2 · Las ocho preguntas */}
      <Toma t={t} a={m('ocho')} b={m('verdad')} cy={470}>
        <g opacity={e1(t, m('ocho'))}>
          <Curva pts={[[110, 640], [300, 560], [500, 640], [700, 560], [900, 640], [1100, 560]]} u={sm(t, m('ocho'), m('ocho') + 1.5)} color={c.apagado} grosor={14} />
          {PASOS.map((txt, k) => {
            const x = 140 + k * 133, y = k % 2 ? 560 : 640;
            const on = avanza > k;
            const epi = k === 3;
            return (
              <g key={txt} opacity={on ? 1 : 0.25}>
                <circle cx={x} cy={y} r={epi ? 34 : 24} fill={epi ? AMBAR : [NARANJA, ROSA, VIOLETA, AMBAR, AZUL_M, ROJO_M, VERDE, TEAL][k]} />
                <Txt x={x} y={k % 2 ? 500 : 720} textAnchor="middle" fontSize={movil ? 26 : 24} fill={c.texto} peso={800}>{movil && ![0, 3, 7].includes(k) ? '' : txt}</Txt>
              </g>
            );
          })}
          {t >= m('epifania') && <Bombilla x={539} y={360} s={0.8} id={ID} t={t} luz={sm(t, m('epifania'), m('epifania') + 0.6)} />}
        </g>
        {t >= m('hauge') && (
          <g opacity={e1(t, m('hauge'))}>
            <Letrero x={600} y={230} texto="Personaje · deseo · obstáculo" fondo={VIOLETA} id={ID} tam={28} />
          </g>
        )}
      </Toma>

      {/* 3 · La condición */}
      <Toma t={t} a={m('verdad')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('verdad'))}>
          <rect x={150} y={250} width={400} height={420} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Persona id={ID} x={350} y={540} s={0.7} cuerpo={VERDE} />
          <Visto x={350} y={610} r={36} />
          <Letrero x={350} y={720} texto="Historia verdadera" fondo={VERDE} id={ID} tam={26} />
          <rect x={650} y={250} width={400} height={420} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Persona id={ID} x={850} y={540} s={0.7} cuerpo={GRIS} />
          <Cruz x={850} y={610} r={36} />
          <Letrero x={850} y={720} texto="Historia inventada" fondo={ROJO_M} id={ID} tam={26} />
          <Sello x={600} y={200} texto={movil ? 'Si es verdad' : 'Persuade si es verdad'} u={sm(t, m('verdad') + 0.4, m('verdad') + 1)} color={VERDE} tam={32} />
        </g>
      </Toma>
    </Lienzo>
  );
};
