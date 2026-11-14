import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Burbuja, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Retener vale más.
 * Toma 1: un balde con agujeros: el embudo vierte clientes arriba y se escapan por abajo; al tapar parte de la fuga
 * (5 % menos de deserción) la barra de utilidades sube entre 25 y 85 %.
 * Toma 2: Oliver: dos columnas, lo prometido y lo percibido; la brecha («10 minutos» frente a un resultado ordinario)
 * se pinta en rojo. Anderson: un cliente muy insatisfecho habla con un círculo grande; uno satisfecho, con uno chico.
 * Al final, la frase atribuida a Bill Bernbach.
 */

const ID = 'br27', P = 'br-retencion';

export const RetencionBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('poco'), 'Casi solo adquisición'], [m('reichheld'), 'Reichheld y Sasser (1990)'], [m('oliver'), 'Expectativas (Oliver, 1980)'],
    [m('anderson'), 'Boca a boca (Anderson, 1998)'], [m('bernbach'), 'Un gran anuncio, un mal producto'],
  ];
  const tapa = sm(t, m('cinco'), m('cinco') + 1);
  const brecha = sm(t, m('diez'), m('diez') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Retener vale más">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El balde */}
      <Toma t={t} a={0} b={m('oliver')} cy={470}>
        <g opacity={e1(t, m('poco') - 0.3)}>
          <path d="M 200 200 H 440 L 350 290 V 330 H 290 V 290 Z" fill="url(#br27-marca)" />
          {Array.from({ length: 4 }, (_, k) => { const ph = ((t * 0.6) + k / 4) % 1; return <circle key={k} cx={320} cy={lerp(340, 470, ph)} r={12} fill={NARANJA} opacity={Math.sin(Math.PI * ph)} />; })}
          <path d="M 180 380 H 460 L 430 660 H 210 Z" fill={GRIS} />
          <path d="M 196 400 H 444 L 420 620 H 220 Z" fill={AZUL_M} opacity={0.45} />
          {[0, 1, 2, 3].map((k) => {
            const tapado = k < 2 && tapa > 0;
            const x = 250 + k * 46, y = 640;
            return (
              <g key={k}>
                <circle cx={x} cy={y} r={9} fill={tapado ? VERDE : '#0f172a'} />
                {!tapado && Array.from({ length: 2 }, (_, j) => { const ph = ((t * 0.9) + j / 2 + k * 0.2) % 1; return <circle key={j} cx={x + 6 * ph} cy={lerp(y + 10, 730, ph)} r={8} fill={AZUL_M} opacity={1 - ph} />; })}
              </g>
            );
          })}
          <Letrero x={320} y={170} texto="Adquisición" fondo={NARANJA} id={ID} tam={24} />
          {t >= m('poco') && <Letrero x={540} y={720} texto="Retención: poco espacio" fondo={GRIS} id={ID} tam={24} op={ventana(t, m('poco'), m('reichheld'))} />}
        </g>
        {t >= m('reichheld') && (
          <g opacity={e1(t, m('reichheld'))}>
            <rect x={620} y={200} width={500} height={560} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            {t >= m('cinco') && <Cifra x={870} y={290} valor={5} u={tapa} pre="−" suf=" % deserción" tam={40} color={VERDE} />}
            <rect x={670} y={660} width={400} height={6} rx={3} fill={c.apagado} />
            {t >= m('utilidades') && (() => {
              const u = sm(t, m('utilidades'), m('utilidades') + 1.4);
              return (
                <g>
                  <rect x={720} y={660 - 300 * u} width={300} height={300 * u} rx={14} fill={VERDE} opacity={0.35} />
                  <rect x={720} y={660 - 90 * u} width={300} height={90 * u} rx={14} fill={VERDE} />
                  <Txt x={870} y={640 - 300 * u} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>+25 a +85 %</Txt>
                  <Txt x={870} y={710} textAnchor="middle" fontSize={26} fill={c.tenue}>utilidades, según sector</Txt>
                </g>
              );
            })()}
          </g>
        )}
        {t >= m('retenido') && <Sello x={320} y={795} texto={movil ? 'Ya adquirido' : 'No paga otra adquisición'} u={sm(t, m('retenido'), m('retenido') + 0.6)} color={VERDE} tam={24} />}
      </Toma>

      {/* 2 · Expectativas y boca a boca */}
      <Toma t={t} a={m('oliver')} b={fin + 1} cy={470}>
        <g opacity={ventana(t, m('oliver'), m('anderson')) * 0.85 + 0.15}>
          <rect x={130} y={600} width={480} height={6} rx={3} fill={c.apagado} />
          <rect x={170} y={600 - 340 * sm(t, m('oliver'), m('oliver') + 1)} width={140} height={340 * sm(t, m('oliver'), m('oliver') + 1)} rx={12} fill={VIOLETA} />
          <rect x={430} y={600 - lerp(340, 140, brecha) * sm(t, m('satisfaccion'), m('satisfaccion') + 1)} width={140} height={lerp(340, 140, brecha) * sm(t, m('satisfaccion'), m('satisfaccion') + 1)} rx={12} fill={AZUL_M} />
          {t >= m('diez') && <rect x={430} y={260} width={140} height={200 * brecha} rx={12} fill={ROJO_M} opacity={0.3} />}
          <Txt x={240} y={650} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>Prometido</Txt>
          <Txt x={500} y={650} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>Percibido</Txt>
          {t >= m('diez') && <Letrero x={240} y={230} texto="«En 10 minutos»" fondo={VIOLETA} id={ID} tam={24} op={e1(t, m('diez'))} />}
          {t >= m('diez') + 0.6 && <Letrero x={360} y={720} texto="Desconfirmación negativa" fondo={ROJO_M} id={ID} tam={24} op={e1(t, m('diez') + 0.6)} />}
        </g>
        {t >= m('anderson') && (
          <g opacity={e1(t, m('anderson'))}>
            {[0, 1].map((k) => {
              const x = 720 + k * 270, n = k === 0 ? 8 : 3, r = k === 0 ? 120 : 70;
              const u = sm(t, m('insatisfechos') + k * 0.5, m('insatisfechos') + k * 0.5 + 1.2);
              return (
                <g key={k}>
                  {Array.from({ length: n }, (_, j) => { const a = (j / n) * Math.PI * 2; return <circle key={j} cx={x + Math.cos(a) * r * u} cy={430 + Math.sin(a) * r * u * 0.8} r={18} fill={GRIS} opacity={u} />; })}
                  <circle cx={x} cy={430} r={42} fill={k === 0 ? ROJO_M : VERDE} />
                  <path d={k === 0 ? `M ${x - 16} 448 q 16 -16 32 0` : `M ${x - 16} 436 q 16 16 32 0`} stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" />
                  <Txt x={x} y={600} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>{k === 0 ? (movil ? 'Insatisfecho' : 'Muy insatisfecho') : 'Satisfecho'}</Txt>
                </g>
              );
            })}
          </g>
        )}
        {t >= m('bernbach') && <Letrero x={600} y={780} texto="Gran anuncio + mal producto = fracaso rápido" fondo={NARANJA} id={ID} tam={26} op={e1(t, m('bernbach'))} />}
      </Toma>
    </Lienzo>
  );
};
