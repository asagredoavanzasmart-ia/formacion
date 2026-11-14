import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Edificio, Reloj, Telefono, Visto, Embudo, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Las redes son una fiesta.
 * Toma 1: una fiesta con guirnaldas: quien llega ofreciendo productos queda solo (la gente se aleja); quien cuenta
 * historias y presenta gente queda rodeado.
 * Toma 2: tu casa: el perfil personal como una casa a un costado de la fiesta; algunos invitados caminan hacia ella y
 * desde la puerta sale un camino al embudo.
 * Toma 3: productor, no consumidor: un reloj con dos sectores (10 minutos para mirar referentes, 30 para responder en los
 * grupos) y la constancia como una fila de días marcados.
 */

const ID = 'br16', P = 'br-fiesta';

export const FiestaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('amigos'), 'Para hacer amigos'], [m('fiesta'), 'Una fiesta'], [m('casa'), 'Tu perfil es tu casa'], [m('productor'), 'Productor, no consumidor'], [m('constancia'), 'Constancia'],
  ];
  const aleja = sm(t, m('evitan'), m('evitan') + 1.2);
  const acerca = sm(t, m('acercan'), m('acercan') + 1.2);
  const camina = sm(t, m('casa') + 0.5, m('paso') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Las redes son una fiesta">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La fiesta */}
      <Toma t={t} a={0} b={m('casa')} cy={470}>
        <g opacity={e1(t, 0.3)}>
          <path d="M 80 170 Q 340 240 600 170 Q 860 240 1120 170" stroke={c.apagado} strokeWidth={4} fill="none" />
          {Array.from({ length: 14 }, (_, k) => <path key={k} d={`M ${110 + k * 72} ${180 + 26 * Math.sin((k / 13) * Math.PI * 2) * 0.7} l 18 30 l 18 -30 Z`} fill={[NARANJA, ROSA, AMBAR, VIOLETA][k % 4]} />)}
        </g>
        {t >= m('evitan') - 0.2 && (
          <g opacity={e1(t, m('evitan') - 0.2)}>
            <Persona id={ID} x={330} y={620} s={0.7} cuerpo={GRIS} />
            <Burbuja x={170} y={300} w={330} texto="«¡Compra mi curso!»" u={sm(t, m('evitan') - 0.2, m('evitan') + 0.8)} c={c} id={ID} tam={26} />
            {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={330 + (k - 1) * lerp(110, 230, aleja) + (k === 1 ? 0 : 0)} y={lerp(700, 760, aleja) + (k === 1 ? 40 : 0)} s={0.45} cuerpo={[ROSA, AZUL_M, AMBAR][k]} />)}
          </g>
        )}
        {t >= m('acercan') - 0.2 && (
          <g opacity={e1(t, m('acercan') - 0.2)}>
            <Persona id={ID} x={870} y={620} s={0.7} cuerpo={NARANJA} />
            <Burbuja x={700} y={300} w={360} texto="«Te presento a…»" u={sm(t, m('acercan') - 0.2, m('acercan') + 0.8)} c={c} id={ID} tam={26} />
            {[0, 1, 2, 3].map((k) => <Persona key={k} id={ID} x={870 + (k - 1.5) * lerp(260, 120, acerca)} y={lerp(780, 720, acerca)} s={0.45} cuerpo={[ROSA, AZUL_M, AMBAR, VIOLETA][k]} />)}
          </g>
        )}
      </Toma>

      {/* 2 · Tu casa */}
      <Toma t={t} a={m('casa')} b={m('productor')} cy={470}>
        <g opacity={e1(t, m('casa'))}>
          <rect x={80} y={430} width={420} height={300} rx={30} fill={c.panel2} />
          <Txt x={290} y={480} textAnchor="middle" fontSize={26} fill={c.tenue}>La fiesta</Txt>
          {[0, 1, 2, 3, 4].map((k) => {
            const va = k < 2 ? camina : 0;
            return <Persona key={k} id={ID} x={lerp(140 + k * 75, 640 + k * 40, va)} y={lerp(680, 640, va)} s={0.42} cuerpo={[ROSA, AZUL_M, AMBAR, VIOLETA, TEAL][k]} />;
          })}
          <Edificio x={760} y={660} w={220} h={220} color={NARANJA} />
          <path d="M 640 460 L 760 360 L 880 460 Z" fill={ROSA} />
          <Letrero x={760} y={720} texto="Tu perfil: tu casa" fondo={NARANJA} id={ID} tam={28} />
        </g>
        {t >= m('paso') && (
          <g opacity={e1(t, m('paso'))}>
            <path d="M 880 600 Q 960 560 990 420" stroke={VERDE} strokeWidth={10} fill="none" strokeDasharray="14 12" />
            <Embudo x={1010} y={250} w={190} alto={50} tam={20} franjas={[{ n: 'Embudo', color: VERDE }, { n: ' ', color: TEAL }]} />
          </g>
        )}
      </Toma>

      {/* 3 · Productor, no consumidor */}
      <Toma t={t} a={m('productor')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('productor'))}>
          <g transform="translate(320 450)">
            <circle r={190} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <path d="M 0 0 L 0 -170 A 170 170 0 0 1 170 0 Z" fill={AZUL_M} opacity={t >= m('diez') ? e1(t, m('diez')) : 0} />
            <path d="M 0 0 L 170 0 A 170 170 0 1 1 0 -170 Z" fill={VERDE} opacity={t >= m('treinta') ? e1(t, m('treinta')) : 0} />
            <circle r={18} fill={c.texto} />
          </g>
          {t >= m('diez') && <Letrero x={800} y={330} texto="10 min: mirar referentes" fondo={AZUL_M} id={ID} tam={26} op={e1(t, m('diez'))} />}
          {t >= m('grupos') && <Letrero x={800} y={430} texto="30 min: responder con valor" fondo={VERDE} id={ID} tam={26} op={e1(t, m('grupos'))} />}
          {t >= m('limpio') && <Letrero x={800} y={230} texto="Dejó de seguir a casi todos" fondo={GRIS} id={ID} tam={24} op={e1(t, m('limpio'))} />}
        </g>
        {t >= m('constancia') && (
          <g opacity={e1(t, m('constancia'))}>
            {Array.from({ length: 14 }, (_, k) => <g key={k}><rect x={590 + (k % 7) * 76} y={560 + Math.floor(k / 7) * 76} width={62} height={62} rx={12} fill={c.panel2} />{k <= (t - m('constancia')) * 6 && <Visto x={621 + (k % 7) * 76} y={591 + Math.floor(k / 7) * 76} r={20} />}</g>)}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
