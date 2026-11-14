import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Escalon, Calendario, Regalo, Billete, Visto, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La escalera de valor.
 * Toma 1: el dentista: un diente gratis que se limpia, se pone amarillo al comentario, la cuenta que sube a 2.000 y el
 * calendario de la próxima consulta.
 * Toma 2: la escalera de cinco piezas, de abajo hacia arriba: cebo (regalo), oferta frontal, intermedias, servicio
 * principal en la cima, y la continuidad como una flecha que vuelve a empezar.
 * Toma 3: el quiropráctico que solo tenía un escalón (ajuste de 50) recibe el cebo y la cima; una persona sube.
 */

const ID = 'br03', P = 'br-escalera';

const Diente: React.FC<{ x: number; y: number; s?: number; color: string; brillo?: number }> = ({ x, y, s = 1, color, brillo = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 -60 Q -70 -110 -30 -110 Q 0 -96 30 -110 Q 70 -110 70 -60 Q 70 0 50 60 Q 40 96 26 60 Q 12 20 0 20 Q -12 20 -26 60 Q -40 96 -50 60 Q -70 0 -70 -60 Z" fill={color} style={sombra(0.2, 3, 8)} />
    <path d="M -46 -80 Q -40 -96 -22 -96" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.6} />
    {brillo > 0.01 && [0, 1, 2].map((k) => <path key={k} d={`M ${60 + k * 14} ${-100 + k * 26} l 12 -12`} stroke={AMBAR} strokeWidth={6} strokeLinecap="round" opacity={brillo} />)}
  </g>
);

export const EscaleraBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('dentista'), 'Una limpieza gratis'], [m('pagando'), 'Más de 2.000 dólares'], [m('escalera'), 'La escalera de valor'],
    [m('continuidad'), 'La continuidad'], [m('quiro'), 'El quiropráctico'], [m('escalon'), 'Escalón por escalón'],
  ];
  const amarillo = sm(t, m('amarillos'), m('amarillos') + 0.8);
  const PELD: [string, string, string][] = [['cebo', 'Cebo', AMBAR], ['frontal', 'Frontal', NARANJA], ['intermedias', 'Intermedias', ROSA], ['cima', 'Principal', VIOLETA]];
  const sube = sm(t, m('masaje'), m('escalon') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La escalera de valor">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El dentista */}
      <Toma t={t} a={0} b={m('escalera')} cy={470}>
        <g opacity={e1(t, 0.3)}>
          <rect x={90} y={170} width={500} height={600} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Persona id={ID} x={220} y={690} s={0.7} cuerpo={AZUL_M} corbata />
          <Diente x={430} y={440} s={1.15} color={lerp(0, 1, amarillo) > 0.5 ? '#fde68a' : '#ffffff'} brillo={t >= m('limpieza') && t < m('amarillos') ? 1 : 0} />
          {t >= m('limpieza') && <Letrero x={340} y={240} texto="Limpieza gratis" fondo={VERDE} id={ID} tam={28} op={e1(t, m('limpieza'))} />}
          {t >= m('amarillos') && <Letrero x={430} y={620} texto={movil ? 'Amarillos' : '«Dientes amarillos»'} fondo={AMBAR} id={ID} tam={26} op={e1(t, m('amarillos'))} />}
        </g>
        {t >= m('pagando') && (
          <g opacity={e1(t, m('pagando'))}>
            <rect x={640} y={170} width={480} height={600} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            {[0, 1, 2].map((k) => <Billete key={k} x={760 + k * 60} y={330 - k * 18} s={0.95} rot={-12 + k * 10} />)}
            <Cifra x={880} y={480} valor={2000} u={sm(t, m('pagando'), m('pagando') + 1.2)} tam={70} color={VERDE} pre="+$" miles />
            <Txt x={880} y={530} textAnchor="middle" fontSize={26} fill={c.tenue}>Blanqueador y retenedores</Txt>
            {t >= m('consulta') && (
              <g opacity={e1(t, m('consulta'))}>
                <Calendario x={880} y={650} s={0.9} marcados={6} />
                <Letrero x={880} y={740} texto="Vuelve en 6 meses" fondo={AZUL_M} id={ID} tam={26} />
              </g>
            )}
          </g>
        )}
      </Toma>

      {/* 2 · La escalera de cinco piezas */}
      <Toma t={t} a={m('escalera')} b={m('quiro')} cy={470}>
        {PELD.map(([n, txt, col], k) => {
          const on = t >= m(n) - 0.1 ? e1(t, m(n)) : 0.15;
          const h = 120 + k * 130;
          return (
            <g key={n} opacity={on}>
              <Escalon x={120 + k * 230} y={760} w={215} h={h} color={col} />
              <Txt x={227 + k * 230} y={760 - h + 56} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>{txt}</Txt>
              {k === 0 && <Regalo x={227} y={760 - h - 12} s={0.62} color={ROSA} />}
            </g>
          );
        })}
        {t >= m('cirugia') && <Letrero x={810} y={210} texto={movil ? 'Cirugía estética' : 'En el dentista: cirugía estética'} fondo={VIOLETA} id={ID} tam={24} op={e1(t, m('cirugia'))} />}
        {t >= m('continuidad') && (
          <g opacity={e1(t, m('continuidad'))}>
            <path d="M 1100 420 A 58 58 0 1 1 1099 421" stroke={TEAL} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={365} strokeDashoffset={365 * (1 - sm(t, m('continuidad'), m('continuidad') + 1))} />
            <path d={`M 1100 364 l 20 -11 l -3 24 Z`} fill={TEAL} />
            <Letrero x={1060} y={812} texto="Continuidad" fondo={TEAL} id={ID} tam={26} />
          </g>
        )}
      </Toma>

      {/* 3 · El quiropráctico */}
      <Toma t={t} a={m('quiro')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('quiro'))}>
          <Escalon x={470} y={760} w={260} h={250} color={NARANJA} />
          <Txt x={600} y={570} textAnchor="middle" fontSize={32} fill="#fff" peso={800}>Ajuste $50</Txt>
        </g>
        {t >= m('masaje') && (
          <g opacity={e1(t, m('masaje'))}>
            <Escalon x={190} y={760} w={260} h={120} color={AMBAR} />
            <Txt x={320} y={700} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>{movil ? 'Masaje' : 'Masaje gratis'}</Txt>
          </g>
        )}
        {t >= m('bienestar') && (
          <g opacity={e1(t, m('bienestar'))}>
            <Escalon x={750} y={760} w={260} h={420} color={VIOLETA} />
            <Txt x={880} y={400} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>Bienestar</Txt>
            <Cifra x={880} y={450} valor={5000} u={sm(t, m('bienestar'), m('bienestar') + 1)} tam={40} color="#fff" pre="$" miles />
          </g>
        )}
        {t >= m('masaje') && (() => {
          const px = lerp(320, 880, sube), py = lerp(640, 340, sube) - Math.abs(Math.sin(sube * Math.PI * 3)) * 30;
          return <Persona id={ID} x={px} y={py} s={0.5} cuerpo={TEAL} />;
        })()}
        {t >= m('escalon') && <Visto x={1060} y={260} r={36} op={e1(t, m('escalon'))} />}
      </Toma>
    </Lienzo>
  );
};
