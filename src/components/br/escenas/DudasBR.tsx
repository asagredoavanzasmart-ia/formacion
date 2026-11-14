import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Visto, Barra, Reloj, Nube, Monitor, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Las tres dudas.
 * Toma 1: tres candados sobre la compra: el del vehículo (un mapa con signo de pregunta), el interno (la persona que se
 * mira las manos) y el externo (el reloj y la nube). Cada uno con su frase.
 * Toma 2: el ejemplo de ClickFunnels: tres burbujas del cliente y, frente a cada una, una historia que la desarma.
 * Toma 3: la técnica de Fladlien: una lista de «probablemente estás pensando…» que se responde línea a línea, y las
 * barras de ventas de las dos mitades de una presentación (×3 en el final), marcadas como experiencia del autor.
 */

const ID = 'br09', P = 'br-dudas';

const Candado: React.FC<{ x: number; y: number; color: string; abre: number }> = ({ x, y, color, abre }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d={`M -40 -10 V -50 Q -40 -92 0 -92 Q 40 -92 40 -50 V ${-10 - 40 * abre}`} stroke="#94a3b8" strokeWidth={16} fill="none" strokeLinecap="round" transform={`translate(0 ${-24 * abre})`} />
    <rect x={-62} y={-14} width={124} height={100} rx={18} fill={color} style={sombra(0.22, 3, 8)} />
    <circle cx={0} cy={28} r={12} fill="#fff" opacity={0.7} />
  </g>
);

export const DudasBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('tres'), 'Tres tipos de duda'], [m('secretos'), 'El ejemplo de ClickFunnels'], [m('historia'), 'Una historia por duda'], [m('fladlien'), 'Nombrar las objeciones'],
  ];
  const D: [string, string, string, string][] = [['vehiculo', 'El vehículo', AZUL_M, '¿Funcionará para mí?'], ['internas', 'Interna', ROSA, '¿Podré yo?'], ['externas', 'Externa', AMBAR, '¿Tengo tiempo?']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Las tres dudas">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Tres candados */}
      <Toma t={t} a={0} b={m('secretos')} cy={470}>
        {D.map(([n, txt, col, frase], k) => {
          const x = 230 + k * 370;
          const on = t >= m(n) - 0.1 ? e1(t, m(n)) : t >= m('tres') ? 0.18 : 0;
          return (
            <g key={n} opacity={on}>
              <rect x={x - 160} y={190} width={320} height={560} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
              <Candado x={x} y={360} color={col} abre={0} />
              {k === 0 && <path d={`M ${x - 70} 560 l 40 -30 l 40 30 l 40 -30 v 80 l -40 30 l -40 -30 l -40 30 Z`} fill={AZUL_M} opacity={0.5} />}
              {k === 1 && <Persona id={ID} x={x} y={640} s={0.5} cuerpo={ROSA} ojos={0.4} />}
              {k === 2 && <g><Reloj x={x - 45} y={560} r={38} t={t} vel={2} aro={AMBAR} /><Nube x={x + 50} y={550} s={0.5} t={t} rayos={false} /></g>}
              <Letrero x={x} y={250} texto={txt} fondo={col} id={ID} tam={28} />
              <Txt x={x} y={710} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>{frase}</Txt>
            </g>
          );
        })}
        {t >= m('bandura') && <Letrero x={600} y={800} texto="Autoeficacia · Bandura, 1977" fondo={ROSA} id={ID} tam={24} op={e1(t, m('bandura'))} />}
      </Toma>

      {/* 2 · El ejemplo y las historias */}
      <Toma t={t} a={m('secretos')} b={m('fladlien')} cy={470}>
        {([['secretos', '«No entiendo cómo funcionaría para mí»', AZUL_M, 'Demostración'], ['tecnico', '«No soy técnico»', ROSA, 'Plantillas'], ['trafico', '«No sé conseguir tráfico»', AMBAR, 'Curso de tráfico']] as const).map(([n, frase, col, arma], k) => {
          const y = 230 + k * 190;
          const on = t >= m(n) - 0.1;
          const abre = sm(t, m('historia') + k * 0.5, m('historia') + k * 0.5 + 0.8);
          return (
            <g key={n} opacity={on ? e1(t, m(n)) : 0}>
              <Burbuja x={110} y={y + 40} w={movil ? 420 : 560} texto={movil ? frase.replace('«', '').replace('»', '').split(' ').slice(0, 3).join(' ') : frase} u={sm(t, m(n), m(n) + 1)} c={c} id={ID} tam={26} />
              <Candado x={790} y={y + 40} color={col} abre={abre} />
              {abre > 0.3 && <Letrero x={990} y={y + 20} texto={arma} fondo={VERDE} id={ID} tam={24} op={abre} />}
            </g>
          );
        })}
      </Toma>

      {/* 3 · Fladlien: nombrar y responder */}
      <Toma t={t} a={m('fladlien')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('fladlien'))}>
          <rect x={100} y={190} width={560} height={560} rx={28} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Txt x={380} y={250} textAnchor="middle" fontSize={26} fill={c.tenue}>«Probablemente estás pensando…»</Txt>
          {[0, 1, 2, 3, 4].map((k) => {
            const u = sm(t, m('pensando') + k * 0.45, m('pensando') + k * 0.45 + 0.6);
            return (
              <g key={k} opacity={0.25 + 0.75 * u}>
                <rect x={150} y={300 + k * 86} width={360} height={22} rx={11} fill={c.apagado} />
                <rect x={150} y={330 + k * 86} width={260} height={14} rx={7} fill={c.apagado} opacity={0.6} />
                <Visto x={570} y={320 + k * 86} r={24} op={u} />
              </g>
            );
          })}
        </g>
        {t >= m('triple') && (
          <g opacity={e1(t, m('triple') - 0.4)}>
            <rect x={720} y={690} width={400} height={6} rx={3} fill={c.apagado} />
            <Barra x={830} y={690} w={130} hMax={420} valor={1} max={3} u={1} color={GRIS} rotulo="1.ª mitad" c={c} suf="×" />
            <Barra x={1010} y={690} w={130} hMax={420} valor={3} max={3} u={sm(t, m('triple'), m('triple') + 1)} color={VERDE} rotulo="Final" c={c} suf="×" />
            <Letrero x={920} y={790} texto="Experiencia del autor" fondo={GRIS} id={ID} tam={24} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
