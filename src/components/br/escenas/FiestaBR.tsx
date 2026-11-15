import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Persona, Burbuja, Visto, Cruz, Corazon, Casa, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Las redes son una fiesta.
 * Toma 1: una fiesta con guirnaldas de luces y pista de baile. A la izquierda alguien ofrece su curso y los invitados
 * se alejan con cara seria; a la derecha alguien cuenta historias y presenta gente y los invitados se acercan.
 * Toma 2: tu perfil es tu casa: junto a la fiesta, una casa con la puerta que se abre; dos invitados caminan hasta
 * ella y por detrás sale el camino hacia el embudo.
 * Toma 3: de consumidor a productor: un teléfono donde la lista de cuentas seguidas se limpia hasta dejar a los
 * referentes; un reloj con 10 minutos para mirarlos y 30 para responder en los grupos; y la racha de días.
 */

const ID = 'br16', P = 'br-fiesta';

export const FiestaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('amigos'), 'Para hacer amigos'], [m('fiesta'), 'Una fiesta'], [m('casa'), 'Tu perfil es tu casa'], [m('productor'), 'Productor, no consumidor'], [m('constancia'), 'Constancia'],
  ];
  const aleja = sm(t, m('evitan'), m('evitan') + 1.4);
  const acerca = sm(t, m('acercan'), m('acercan') + 1.4);
  const camina = sm(t, m('casa') + 0.6, m('paso') + 0.5);
  const puerta = sm(t, m('casa') + 0.3, m('casa') + 1);
  const limpia = sm(t, m('limpio'), m('limpio') + 1.6);
  const diez = sm(t, m('diez'), m('diez') + 1), treinta = sm(t, m('treinta') - 0.8, m('treinta') + 0.6);

  const Guirnalda = () => (
    <g>
      <path d="M 60 200 Q 330 270 600 200 Q 870 270 1140 200" stroke={c.apagado} strokeWidth={4} fill="none" />
      {Array.from({ length: 16 }, (_, k) => { const x = 80 + k * 68; const y = 200 + 50 * Math.sin(((x - 60) / 540) * Math.PI) * 0.7 * (x < 600 ? 1 : 1); const on = (Math.floor(t * 3) + k) % 3 === 0; return <circle key={k} cx={x} cy={y + 10} r={10} fill={[NARANJA, ROSA, AMBAR, VIOLETA][k % 4]} opacity={on ? 1 : 0.45} style={on ? { filter: `drop-shadow(0 0 8px ${[NARANJA, ROSA, AMBAR, VIOLETA][k % 4]})` } : undefined} />; })}
    </g>
  );

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Las redes son una fiesta">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La fiesta */}
      <Toma t={t} a={0} b={m('casa')} cy={470}>
        <g opacity={E('amigos', 0.6, -0.4)}>
          <Guirnalda />
          <ellipse cx={600} cy={720} rx={540} ry={70} fill={`url(#${ID}-marcaH)`} opacity={0.12} />
          {Array.from({ length: 4 }, (_, k) => { const p = (t * 0.35 + k / 4) % 1; return <Txt key={k} x={560 + k * 30} y={460 - p * 140} fontSize={30} fill={[VIOLETA, ROSA][k % 2]} opacity={Math.sin(Math.PI * p) * 0.6} peso={800}>♪</Txt>; })}
        </g>
        <Pastilla x={600} y={300} texto={movil ? 'Para hacer amigos' : 'Las redes sirven para hacer amigos'} fondo={VIOLETA} tam={26} op={E('amigos') * (1 - E('evitan'))} />
        {t >= m('evitan') - 0.3 && (
          <g opacity={E('evitan', 0.5, -0.3)}>
            <Persona id={ID} x={300} y={690} s={0.75} cuerpo={GRIS} corbata />
            <rect x={335} y={600} width={60} height={44} rx={6} fill="#78350f" />
            <Burbuja x={200} y={460} w={movil ? 330 : 360} texto="«¡Compra mi curso!»" u={sm(t, m('evitan') - 0.3, m('evitan') + 0.8)} c={c} id={ID} tam={26} />
            {[0, 1, 2].map((k) => {
              const x = 300 + (k - 1) * lerp(110, 230, aleja), y = lerp(720, 770, aleja) + (k === 1 ? 30 : 0);
              return <g key={k}><Persona id={ID} x={x} y={y} s={0.45} cuerpo={[ROSA, AZUL_M, AMBAR][k]} /><Cara id={ID} x={x} y={y - 60} r={14} e={-aleja} /></g>;
            })}
          </g>
        )}
        {t >= m('acercan') - 0.3 && (
          <g opacity={E('acercan', 0.5, -0.3)}>
            <Persona id={ID} x={880} y={690} s={0.75} cuerpo={NARANJA} />
            <Burbuja x={780} y={460} w={movil ? 330 : 340} texto="«Te presento a…»" u={sm(t, m('acercan') - 0.3, m('acercan') + 0.8)} c={c} id={ID} tam={26} />
            {[0, 1, 2, 3].map((k) => {
              const x = 880 + (k - 1.5) * lerp(250, 110, acerca), y = lerp(790, 740, acerca);
              return <g key={k}><Persona id={ID} x={x} y={y} s={0.45} cuerpo={[ROSA, AZUL_M, AMBAR, VIOLETA][k]} /><Cara id={ID} x={x} y={y - 60} r={14} e={acerca} /></g>;
            })}
            {acerca > 0.8 && [0, 1].map((k) => { const p = (t * 0.6 + k / 2) % 1; return <Corazon key={k} x={830 + k * 100} y={600 - p * 80} s={0.5} color={ROSA} op={Math.sin(Math.PI * p)} />; })}
          </g>
        )}
      </Toma>

      {/* 2 · Tu casa */}
      <Toma t={t} a={m('casa')} b={m('productor')} cy={470}>
        <g opacity={E('casa', 0.6, -0.3)}>
          <rect x={60} y={420} width={470} height={360} rx={30} fill={`url(#${ID}-marcaH)`} opacity={0.1} />
          <Txt x={295} y={470} textAnchor="middle" fontSize={26} fill={c.tenue} peso={800}>La fiesta</Txt>
          {[0, 1, 2, 3, 4].map((k) => {
            const va = k < 2 ? sm(camina, k * 0.15, 0.85 + k * 0.15) : 0;
            return <Persona key={k} id={ID} x={lerp(120 + k * 90, 720 + k * 30, va)} y={lerp(720, 760, va)} s={0.45} cuerpo={[ROSA, AZUL_M, AMBAR, VIOLETA, TEAL][k]} />;
          })}
          <Casa x={800} y={760} s={1.05} puerta={puerta} />
          <Pastilla x={800} y={800} texto={movil ? 'Tu perfil' : 'Tu perfil: tu casa'} fondo={NARANJA} tam={26} />
        </g>
        {t >= m('paso') && (
          <g opacity={E('paso')}>
            <Conector x1={960} y1={600} x2={1070} y2={360} u={sm(t, m('paso'), m('paso') + 1)} t={t} color={VERDE} curva={-0.3} />
            <path d="M 1000 250 H 1140 L 1094 310 V 350 H 1046 V 310 Z" fill={`url(#${ID}-marca)`} />
            <Txt x={1070} y={230} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>Embudo</Txt>
          </g>
        )}
      </Toma>

      {/* 3 · Productor, no consumidor */}
      <Toma t={t} a={m('productor')} b={fin + 1} cy={470}>
        <g opacity={E('productor')}>
          <rect x={90} y={200} width={260} height={470} rx={36} fill="#1f2937" />
          <rect x={106} y={226} width={228} height={420} rx={20} fill={c.panel} />
          <Txt x={220} y={262} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>Siguiendo</Txt>
          {Array.from({ length: 8 }, (_, k) => {
            const queda = k === 1 || k === 4 || k === 6;
            const op = queda ? 1 : 1 - limpia;
            return <g key={k} opacity={op}><circle cx={140} cy={300 + k * 42} r={14} fill={queda ? AMBAR : GRIS} /><rect x={164} y={292 + k * 42} width={queda ? 120 : 140} height={14} rx={7} fill={queda ? AMBAR : c.apagado} />{queda && limpia > 0.9 && <Txt x={300} y={306 + k * 42} fontSize={20} fill={AMBAR} peso={800}>★</Txt>}</g>;
          })}
          <Pastilla x={220} y={720} texto={movil ? 'Solo referentes' : 'Solo los referentes'} fondo={AMBAR} tam={22} op={limpia} />
        </g>
        <g opacity={E('diez', 0.6, -0.4)} transform="translate(560 420)">
          <circle r={150} fill={c.panel} style={sombra(0.15, 6, 14)} />
          <path d={`M 0 0 L 0 -130 A 130 130 0 0 1 ${130 * Math.sin(Math.PI * 2 * (10 / 60) * diez)} ${-130 * Math.cos(Math.PI * 2 * (10 / 60) * diez)} Z`} fill={AZUL_M} />
          {treinta > 0 && <path d={`M 0 0 L ${130 * Math.sin(Math.PI * 2 * (10 / 60))} ${-130 * Math.cos(Math.PI * 2 * (10 / 60))} A 130 130 0 0 1 ${130 * Math.sin(Math.PI * 2 * ((10 + 30 * treinta) / 60))} ${-130 * Math.cos(Math.PI * 2 * ((10 + 30 * treinta) / 60))} Z`} fill={VERDE} />}
          <circle r={14} fill={c.texto} />
          <Pastilla x={0} y={200} texto="10 min mirar" fondo={AZUL_M} tam={22} op={diez} />
          <Pastilla x={0} y={250} texto={movil ? '30 min responder' : '30 min responder en grupos'} fondo={VERDE} tam={22} op={treinta} />
        </g>
        <Tarjeta x={770} y={200} w={350} h={380} titulo={movil ? 'Grupo' : 'Grupo del sector'} c={c} id={ID} op={E('grupos')} acento={VERDE} tam={24}>
          {[0, 1, 2].map((k) => {
            const tuyo = k % 2 === 1;
            const u = sm(t, m('grupos') + 0.6 + k * 0.7, m('grupos') + 1 + k * 0.7);
            return <g key={k} opacity={u}><rect x={tuyo ? 110 : 30} y={80 + k * 92} width={210} height={70} rx={18} fill={tuyo ? VERDE : c.panel2} /><rect x={(tuyo ? 130 : 50)} y={102 + k * 92} width={150} height={10} rx={5} fill={tuyo ? '#fff' : c.apagado} /><rect x={(tuyo ? 130 : 50)} y={122 + k * 92} width={100} height={10} rx={5} fill={tuyo ? '#fff' : c.apagado} /></g>;
          })}
        </Tarjeta>
        {t >= m('constancia') && (
          <g opacity={E('constancia')}>
            {Array.from({ length: 14 }, (_, k) => <g key={k}><rect x={420 + k * 50} y={740} width={40} height={40} rx={10} fill={c.panel2} />{k <= (t - m('constancia')) * 6 && <Visto x={440 + k * 50} y={760} r={14} />}</g>)}
            <Txt x={400} y={770} textAnchor="end" fontSize={24} fill={c.texto} peso={800}>{movil ? '' : 'Cada día'}</Txt>
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
