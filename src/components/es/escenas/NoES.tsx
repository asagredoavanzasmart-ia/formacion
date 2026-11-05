import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Tranvia, Burbuja, Basurero, Hoja, Cruz, Visto, Suelo, Colinas, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * El no elegante.
 * Toma 1 (Covey): padre e hija en una calle de San Francisco con el tranvía; el plan de la noche (tranvía, comida china,
 * helado); llega el amigo con la invitación a mariscos; «esta noche no»; se alejan de la mano y aparece el corazón.
 * Toma 2: las invitaciones que caen al bote de basura de Drucker; Paul Rand con una sola propuesta de logo frente a la pila
 * de opciones tachadas.
 * Toma 3: cuatro letreros de principios que se encienden uno a uno.
 */

const ID = 'es12', P = 'es-no';

const Corazon: React.FC<{ x: number; y: number; s?: number; op?: number }> = ({ x, y, s = 1, op = 1 }) => op < 0.01 ? null : (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M 0 30 C -50 -10 -30 -50 0 -26 C 30 -50 50 -10 0 30 Z" fill={ROSA} opacity={op} />
);

export const NoES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('dificil'), 'Decir que no a quien respetas'], [m('covey'), 'Stephen Covey'], [m('amigo'), 'Una invitación'], [m('noche'), '«Esta noche no»'],
    [m('recordo'), 'Lo que más le importaba'], [m('drucker'), 'Peter Drucker'], [m('rand'), 'Paul Rand'], [m('separar'), 'Cuatro principios'],
  ];
  const sale = sm(t, m('noche') + 0.8, m('recordo') + 0.5);
  const PLAN = ['Tranvía', 'Comida china', 'Helado'];
  const PRIN = ['Separar decisión y relación', 'Todos venden algo', 'Popularidad por respeto', 'Un no claro es más amable'];
  const PRIN_M = ['separar', 'vende', 'respeto', 'claro'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El no elegante">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Covey y su hija */}
      <Toma t={t} a={0} b={m('drucker')} cy={500}>
        <Colinas y={520} isDark={isDark} t={t} op={0.6} />
        <Tranvia x={lerp(1300, 860, sm(t, m('tranvia'), m('tranvia') + 2))} y={760} s={0.85} op={e1(t, m('tranvia'))} />
        <Suelo y={760} isDark={isDark} x0={40} x1={1160} />
        <g transform={`translate(${-sale * 260} 0)`}>
          <Persona id={ID} x={360} y={760} s={1.05} cuerpo="#1e3a8a" pelo="#4b3621" />
          <Persona id={ID} x={460} y={760} s={0.68} cuerpo={ROSA} pelo="#6b4423" />
          <rect x={395} y={690} width={40} height={10} rx={5} fill="#f7c4a0" opacity={e1(t, m('cynthia'))} />
          {t >= m('recordo') && <Corazon x={410} y={480 - 10 * Math.sin(t * 3)} s={1.2} op={e1(t, m('recordo'))} />}
        </g>
        {t >= m('tranvia') && t < m('amigo') && PLAN.map((p, k) => <Letrero key={p} x={240 + k * 230} y={300} texto={p} fondo={[NARANJA, ROSA, VIOLETA][k]} id={ID} tam={28} op={e1(t, m('tranvia') + 0.5 * k)} />)}
        {t >= m('amigo') && (
          <g opacity={e1(t, m('amigo')) * (1 - sm(t, m('recordo'), m('recordo') + 0.6))}>
            <Persona id={ID} x={700} y={760} s={1.05} cuerpo={VERDE} />
            {t >= m('mariscos') && <Burbuja x={760} y={530} w={330} texto="¡Cena de mariscos!" u={sm(t, m('mariscos'), m('mariscos') + 0.8)} c={c} id={ID} tam={30} lado="der" />}
          </g>
        )}
        {t >= m('noche') && <g opacity={1 - sm(t, m('recordo'), m('recordo') + 0.6)}><Burbuja x={360} y={530} w={340} texto="Esta noche no" u={sm(t, m('noche'), m('noche') + 0.7)} c={c} id={ID} tam={32} marca /></g>}
      </Toma>

      {/* 2 · Drucker y Rand */}
      <Toma t={t} a={m('drucker')} b={m('separar')} cy={480}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        {ventana(t, m('drucker') - 0.1, m('rand')) > 0.01 && (
          <g opacity={ventana(t, m('drucker') - 0.1, m('rand'))}>
            <Persona id={ID} x={300} y={720} s={1.05} cuerpo="#334155" pelo="#e5e7eb" corbata />
            <Basurero x={760} y={720} s={1.5} tapa={t >= m('basura') ? 1 : 0} />
            {t >= m('drucker') && [0, 1, 2, 3].map((k) => {
              const u = ((t - m('drucker')) * 0.5 + k / 4) % 1;
              return <g key={k} transform={`translate(${lerp(380, 760, u)} ${lerp(520, 520, u) - 160 * Math.sin(Math.PI * u) + u * 50}) rotate(${u * 180})`} opacity={Math.min(1, (1 - u) * 6)}><rect x={-34} y={-22} width={68} height={44} rx={6} fill="#fff" /><path d="M -34 -22 L 0 6 L 34 -22" stroke="#cbd5e1" strokeWidth={4} fill="none" /></g>;
            })}
            {t >= m('basura') && <Letrero x={760} y={300} texto="Un bote de basura MUY GRANDE" fondo={GRIS} id={ID} tam={28} op={e1(t, m('basura'))} />}
          </g>
        )}
        {t >= m('rand') && (
          <g opacity={e1(t, m('rand'))}>
            <Persona id={ID} x={220} y={720} s={1.05} cuerpo="#111827" pelo="#9ca3af" />
            {[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={t >= m('logo') ? 0.5 : 1}><Hoja x={620 + (k % 3) * 90} y={470 + Math.floor(k / 3) * 120} w={80} h={100} lineas={3} />{t >= m('logo') && <Cruz x={650 + (k % 3) * 90} y={440 + Math.floor(k / 3) * 120} r={14} />}</g>)}
            {t >= m('logo') && (
              <g opacity={e1(t, m('logo') + 0.8)} transform="translate(980 470)">
                <rect x={-90} y={-90} width={180} height={180} rx={20} fill="#111827" />
                <path d="M -50 40 L -50 -40 L 50 40 L 50 -40" stroke="#fde68a" strokeWidth={14} fill="none" strokeLinejoin="round" />
                <Visto x={90} y={-90} r={26} />
              </g>
            )}
            <Txt x={760} y={690} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('logo'))}>Una sola solución</Txt>
            {t >= m('serios') && <Letrero x={600} y={790} texto="«De los profesionales más serios» (Jobs)" id={ID} tam={26} op={e1(t, m('serios'))} />}
          </g>
        )}
      </Toma>

      {/* 3 · cuatro principios */}
      <Toma t={t} a={m('separar')} b={fin + 1} cy={480}>
        {PRIN.map((p, k) => {
          const on = t >= m(PRIN_M[k]);
          return (
            <g key={p} opacity={on ? e1(t, m(PRIN_M[k])) : 0.0} transform={`translate(${k % 2 ? 870 : 330} ${k < 2 ? 330 : 590})`}>
              <rect x={-12} y={-20} width={24} height={210} rx={8} fill="#64748b" />
              <rect x={-240} y={-110} width={480} height={110} rx={20} fill={[NARANJA, ROSA, AZUL_M, VERDE][k]} />
              <Txt x={0} y={-44} textAnchor="middle" fontSize={30} fill="#fff">{p}</Txt>
            </g>
          );
        })}
        {!movil && <Txt f="a" x={600} y={830} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('claro'))}>Se cambia popularidad por respeto</Txt>}
      </Toma>
    </Lienzo>
  );
};

