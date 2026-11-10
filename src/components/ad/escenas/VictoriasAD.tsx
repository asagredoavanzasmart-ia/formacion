import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Calendario, Megafono, Billete, Medidor, Reloj, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Victorias rápidas.
 * Toma 1: el andén del metro de Londres: un tren que no llega y pasajeros impacientes; aparece el panel con los minutos
 * que faltan y las caras se relajan (más rápido no fue el tren, fue la certeza).
 * Toma 2: Seattle (Watkins y otros, 2011): dos relojes de espera, sin y con información en tiempo real; la espera
 * percibida se acorta y la real baja casi dos minutos.
 * Toma 3: el gimnasio que entra al programa: un calendario de siete días con el megáfono encendido y la primera venta
 * de 2.000; la retención se triplica.
 */

const ID = 'ad09', P = 'ad-victorias';

const Tren: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={0} y={-120} width={420} height={110} rx={30} fill={ROJO_M} />
    <rect x={0} y={-120} width={420} height={30} rx={15} fill="#fff" opacity={0.15} />
    {[0, 1, 2, 3].map((k) => <rect key={k} x={30 + k * 95} y={-96} width={70} height={46} rx={10} fill="#cfe8ff" />)}
    {[60, 360].map((wx) => <circle key={wx} cx={wx} cy={-6} r={18} fill="#1f2937" />)}
  </g>
);

export const VictoriasAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('psicologicas'), 'Soluciones psicológicas'], [m('londres'), 'El metro de Londres'], [m('medido'), 'También está medido'], [m('incertidumbre'), 'Menos incertidumbre'],
    [m('cuarenta'), 'Victorias rápidas'], [m('programa'), 'La primera semana'], [m('triplica'), 'Triplica la retención'],
  ];
  const panel = sm(t, m('paneles'), m('paneles') + 0.8);
  const minutos = Math.max(1, 4 - Math.floor(((t - m('paneles')) * 0.5) % 4));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Victorias rápidas">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El andén */}
      <Toma t={t} a={0} b={m('medido')} cy={470}>
        <g opacity={e1(t, m('psicologicas') - 0.3)}>
          <rect x={60} y={640} width={1080} height={30} rx={10} fill={c.apagado} />
          <rect x={60} y={670} width={1080} height={10} fill={AMBAR} opacity={0.7} />
          {[0, 1, 2, 3].map((k) => (
            <g key={k}>
              <Persona id={ID} x={300 + k * 170} y={640} s={0.55} cuerpo={[AZUL_M, VIOLETA, NARANJA, GRIS][k]} ojos={panel > 0.5 ? 1 : 0.6} />
              {panel < 0.5 && t >= m('londres') && <Txt x={300 + k * 170} y={460} textAnchor="middle" fontSize={34} fill={ROJO_M} peso={800} opacity={0.6 + 0.4 * Math.sin(t * 5 + k)}>?</Txt>}
            </g>
          ))}
          {t >= m('trenes') && (
            <g opacity={ventana(t, m('trenes'), m('paneles') + 0.2)}>
              <Tren x={lerp(1200, 800, sm(t, m('trenes'), m('trenes') + 1))} y={630} s={0.8} />
              <Letrero x={950} y={450} texto="¿Trenes más rápidos?" fondo={GRIS} id={ID} tam={26} />
            </g>
          )}
          {t >= m('paneles') && (
            <g opacity={panel} transform="translate(600 220)">
              <rect x={-230} y={-70} width={460} height={140} rx={18} fill="#0b1220" style={sombra(0.3, 4, 10)} />
              <rect x={-20} y={70} width={40} height={60} fill="#334155" />
              {Array.from({ length: 4 }, (_, k) => <circle key={k} cx={-180 + k * 40} cy={0} r={12} fill={k < minutos ? AMBAR : '#334155'} />)}
              <Txt x={80} y={20} textAnchor="middle" fontSize={56} fill={AMBAR} peso={800}>{minutos} min</Txt>
            </g>
          )}
          {t >= m('paneles') && <Letrero x={600} y={760} texto="La certeza calma la espera" id={ID} tam={28} op={e1(t, m('paneles') + 0.6)} />}
        </g>
      </Toma>

      {/* 2 · Seattle */}
      <Toma t={t} a={m('medido')} b={m('cuarenta')} cy={470}>
        <g opacity={e1(t, m('medido'))}>
          {[0, 1].map((g) => {
            const x = g === 0 ? 330 : 870;
            const u = sm(t, m('corta'), m('corta') + 1.2);
            const arco = g === 0 ? 0.8 : lerp(0.8, 0.55, u);
            return (
              <g key={g}>
                <rect x={x - 240} y={190} width={480} height={500} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
                <circle cx={x} cy={420} r={140} fill={c.apagado} />
                <path d={`M ${x} 420 L ${x} 280 A 140 140 0 ${arco > 0.5 ? 1 : 0} 1 ${x + 140 * Math.sin(2 * Math.PI * arco)} ${420 - 140 * Math.cos(2 * Math.PI * arco)} Z`} fill={g === 0 ? ROJO_M : VERDE} />
                <circle cx={x} cy={420} r={70} fill={c.panel} />
                <Txt x={x} y={436} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>{g === 0 ? 'Sin' : 'Con'}</Txt>
                <Letrero x={x} y={640} texto={g === 0 ? 'Sin información' : 'En tiempo real'} fondo={g === 0 ? GRIS : VERDE} id={ID} tam={26} />
              </g>
            );
          })}
          {t >= m('seattle') && !movil && <Txt f="a" x={600} y={170} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={e1(t, m('seattle'))}>Watkins y otros, 2011 · autobuses de Seattle</Txt>}
          {t >= m('dos') && <Letrero x={870} y={760} texto="Casi 2 minutos menos" fondo={AZUL_M} id={ID} tam={28} op={e1(t, m('dos'))} />}
          {t >= m('incertidumbre') && <Letrero x={330} y={760} texto="Menos incertidumbre" id={ID} tam={28} op={e1(t, m('incertidumbre'))} />}
        </g>
      </Toma>

      {/* 3 · La primera semana del gimnasio */}
      <Toma t={t} a={m('cuarenta')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('cuarenta'))}>
          {Array.from({ length: 7 }, (_, k) => {
            const on = k < 7 * sm(t, m('anuncios'), m('venta') + 0.5);
            return (
              <g key={k}>
                <rect x={110 + k * 140} y={200} width={120} height={120} rx={18} fill={on ? NARANJA : c.panel} style={sombra(c.sombra, 3, 8)} />
                <Txt x={170 + k * 140} y={276} textAnchor="middle" fontSize={40} fill={on ? '#fff' : c.tenue} peso={800}>{k + 1}</Txt>
              </g>
            );
          })}
          <Letrero x={600} y={370} texto="48 horas a 7 días" id={ID} tam={28} />
        </g>
        {t >= m('programa') && (
          <g opacity={e1(t, m('programa'))}>
            <rect x={110} y={430} width={300} height={260} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
            <Cifra x={260} y={540} valor={42000} u={sm(t, m('programa'), m('programa') + 1)} pre="$" tam={50} color={VIOLETA} miles />
            <Txt f="a" x={260} y={590} textAnchor="middle" fontSize={24} fill={c.texto}>programa anual</Txt>
            {t >= m('facturacion') && <Txt f="a" x={260} y={650} textAnchor="middle" fontSize={24} fill={VERDE} opacity={e1(t, m('facturacion'))}>+239.000 al año (según él)</Txt>}
          </g>
        )}
        {t >= m('anuncios') && <Megafono x={500} y={560} s={0.9} habla={1} t={t} op={e1(t, m('anuncios'))} />}
        {t >= m('venta') && (
          <g opacity={e1(t, m('venta'))}>
            {[0, 1, 2].map((k) => { const ph = ((t - m('venta')) * 0.8 + k / 3) % 1; return <Billete key={k} x={lerp(680, 820, ph)} y={560 - 60 * Math.sin(Math.PI * ph)} s={0.8} rot={ph * 50} />; })}
            <Cifra x={920} y={570} valor={2000} u={sm(t, m('venta'), m('venta') + 1)} pre="$" tam={64} color={VERDE} miles />
            <Letrero x={920} y={640} texto="Primera venta" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
        {t >= m('triplica') && (
          <g opacity={e1(t, m('triplica'))}>
            <Letrero x={600} y={770} texto="Retención ×3 (experiencia de Hormozi)" fondo={AMBAR} id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
