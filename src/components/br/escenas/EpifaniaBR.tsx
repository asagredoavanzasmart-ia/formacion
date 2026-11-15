import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Persona, PersonaCara, Burbuja, Bombilla, Corazon, Casa, Sello, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El puente de la epifanía.
 * Toma 1: un corazón que late y un cerebro, unidos por un conector: primero decide la emoción y después la lógica
 * justifica; quien vende cuenta cómo llegó a creer.
 * Toma 2: el puente: quien cuenta está en una orilla con su ampolleta encendida; la historia tiende tablones hasta la
 * otra orilla y la luz viaja hasta encender la ampolleta del oyente.
 * Toma 3: la jerga técnica rebota contra un muro y deja al oyente confundido (Kim Klaver); el puente «es algo así
 * como» une lo nuevo (una pieza con signo de pregunta) con algo conocido (una casa) y el oyente sonríe.
 * Toma 4: la historia en ocho preguntas como un arco que recorre un personaje; Michael Hauge: un deseo frente a
 * obstáculos. Sello: solo si es verdad.
 */

const ID = 'br10', P = 'br-epifania';

const Cerebro: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 10 Q -100 -50 -50 -70 Q -30 -100 10 -86 Q 50 -100 76 -60 Q 110 -30 90 14 Q 96 56 50 62 Q 20 86 -16 66 Q -60 80 -76 46 Q -100 34 -80 10 Z" fill="#f9a8d4" />
    <path d="M 0 -84 Q -10 -30 6 0 Q 20 30 0 64 M -50 -50 Q -30 -20 -56 10 M 50 -50 Q 34 -16 60 14 M -40 40 Q -20 30 -10 50 M 30 30 Q 46 40 40 56" stroke="#db2777" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.6} />
  </g>
);

export const EpifaniaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('emocion'), 'Emoción, después lógica'], [m('puente'), 'El puente de la epifanía'], [m('jerga'), 'La jerga técnica'],
    [m('algo'), '«Es algo así como»'], [m('ocho'), 'Ocho preguntas'], [m('hauge'), 'Michael Hauge'],
  ];
  const tablas = sm(t, m('puente'), m('puente') + 2.5);
  const luz = sm(t, m('puente') + 2.5, m('puente') + 4);
  const rebote = ((t - m('jerga')) * 0.6) % 1;
  const algo = sm(t, m('algo'), m('algo') + 1.5);
  const ARCO: [number, number][] = [[140, 690], [260, 600], [380, 650], [500, 470], [620, 520], [740, 600], [860, 380], [1010, 300]];
  const ETQ = ['Historia', 'Deseo', 'Muro', 'Epifanía', 'Plan', 'Conflicto', 'Logro', 'Cambio'];
  const avance = (() => {
    const hitos: [string, number][] = [['fondo', 0], ['muro', 2], ['epifania', 3], ['transformacion', 7]];
    let v = 0;
    for (let k = 0; k < hitos.length; k++) { const [n, i] = hitos[k]; const prev = k ? hitos[k - 1][1] : 0; v += (i - prev) * sm(t, m(n), m(n) + 1.2); }
    return v;
  })();
  const ia = Math.min(6, Math.floor(avance)), fa = avance - ia;
  const px = lerp(ARCO[ia][0], ARCO[Math.min(7, ia + 1)][0], fa), py = lerp(ARCO[ia][1], ARCO[Math.min(7, ia + 1)][1], fa);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El puente de la epifanía">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Emoción y lógica */}
      <Toma t={t} a={0} b={m('puente')} cy={470}>
        <g opacity={E('emocion')}>
          <circle cx={320} cy={380} r={130} fill={`url(#${ID}-halo)`} opacity={0.6} />
          <Corazon x={320} y={380} s={2.6 + 0.15 * Math.sin(t * 6)} color={ROSA} />
          <Pastilla x={320} y={560} texto={movil ? '1.º emoción' : 'Primero decide la emoción'} fondo={ROSA} tam={26} />
        </g>
        <Conector x1={460} y1={380} x2={740} y2={380} u={E('emocion', 0.5, 1)} t={t} color={ROSA} curva={-0.2} />
        <g opacity={E('emocion', 0.5, 1.4)}>
          <Cerebro x={880} y={380} s={1.4} />
          <Pastilla x={880} y={560} texto={movil ? '2.º lógica' : 'Después justifica la lógica'} fondo={AZUL_M} tam={26} />
        </g>
        <g opacity={E('historia')}>
          <Persona id={ID} x={600} y={790} s={0.6} cuerpo={NARANJA} />
          <Burbuja x={640} y={690} w={movil ? 360 : 440} texto="«Así llegué a creer en esto…»" u={sm(t, m('historia'), m('historia') + 1.2)} c={c} id={ID} tam={24} />
        </g>
      </Toma>

      {/* 2 · El puente */}
      <Toma t={t} a={m('puente')} b={m('jerga')} cy={470}>
        <path d="M 60 560 H 330 V 830 H 60 Z" fill="#a8a29e" /><path d="M 60 560 H 330 V 588 H 60 Z" fill="#65a30d" />
        <path d="M 870 560 H 1140 V 830 H 870 Z" fill="#a8a29e" /><path d="M 870 560 H 1140 V 588 H 870 Z" fill="#65a30d" />
        <Persona id={ID} x={200} y={560} s={0.8} cuerpo={NARANJA} />
        <Bombilla x={200} y={330} s={0.8} id={ID} t={t} luz={1} />
        <Persona id={ID} x={1010} y={560} s={0.8} cuerpo={AZUL_M} />
        <Bombilla x={1010} y={330} s={0.8} id={ID} t={t} luz={luz} />
        {Array.from({ length: 12 }, (_, k) => <rect key={k} x={334 + k * 44.5} y={552 + 22 * Math.sin((Math.PI * (k + 0.5)) / 12)} width={40} height={14} rx={4} fill={k % 2 ? '#fde68a' : '#fbbf24'} opacity={sm(tablas, k / 12, k / 12 + 0.12)} />)}
        <path d="M 334 530 Q 600 610 866 530" stroke="#78350f" strokeWidth={4} fill="none" opacity={tablas} />
        {luz > 0 && luz < 1 && <circle cx={lerp(240, 980, luz)} cy={330 - 120 * Math.sin(Math.PI * luz)} r={16} fill={AMBAR} style={{ filter: 'drop-shadow(0 0 12px #fbbf24)' }} />}
        <Pastilla x={600} y={210} texto={movil ? 'Su misma experiencia' : 'La misma experiencia que cambió su mirada'} fondo={AMBAR} tam={24} op={E('puente', 0.5, 0.8)} />
      </Toma>

      {/* 3 · Jerga y «es algo así como» */}
      <Toma t={t} a={m('jerga')} b={m('ocho')} cy={470}>
        <g opacity={1 - algo}>
          <Persona id={ID} x={160} y={620} s={0.75} cuerpo={NARANJA} />
          <rect x={640} y={230} width={46} height={420} rx={6} fill="#a8a29e" />
          {Array.from({ length: 7 }, (_, k) => <rect key={k} x={640} y={230 + k * 60} width={46} height={4} fill="#78716c" />)}
          {(['API', 'KPI', 'ROI', 'CRM'] as const).map((w, k) => {
            const p = (rebote + k * 0.25) % 1;
            const x = p < 0.6 ? lerp(260, 600, p / 0.6) : lerp(600, 480, (p - 0.6) / 0.4);
            return <g key={w} opacity={Math.sin(Math.PI * p)}><rect x={x - 40} y={300 + k * 80} width={80} height={44} rx={10} fill={GRIS} /><Txt x={x} y={330 + k * 80} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>{w}</Txt></g>;
          })}
          <PersonaCara id={ID} x={900} y={640} s={0.85} cuerpo={AZUL_M} e={-0.8} enojo={0.3} />
          <Txt x={950} y={470} fontSize={52} fill={GRIS} peso={800}>?</Txt>
          <Pastilla x={420} y={730} texto={movil ? 'Kim Klaver' : 'Kim Klaver: el asesino n.º 1 de las ventas'} fondo={ROJO_M} tam={24} op={E('klaver')} />
        </g>
        <g opacity={algo}>
          <g transform="translate(260 430)"><path d="M -80 -80 H -20 Q -20 -110 10 -110 Q 40 -110 40 -80 H 80 V -20 Q 110 -20 110 10 Q 110 40 80 40 V 100 H -80 Z" fill={VIOLETA} /><Txt x={10} y={30} textAnchor="middle" fontSize={80} fill="#fff" peso={800}>?</Txt></g>
          <Conector x1={400} y1={430} x2={760} y2={430} u={algo} t={t} color={AMBAR} />
          <Pastilla x={580} y={360} texto="«Es algo así como…»" fondo={AMBAR} tam={28} />
          <Casa x={920} y={560} s={0.9} />
          <Txt x={260} y={600} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>Lo nuevo</Txt>
          <Txt x={920} y={620} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>Lo conocido</Txt>
          <PersonaCara id={ID} x={600} y={770} s={0.6} cuerpo={AMBAR} e={1} />
        </g>
      </Toma>

      {/* 4 · Ocho preguntas */}
      <Toma t={t} a={m('ocho')} b={fin + 1} cy={470}>
        <path d={ARCO.map(([x, y], k) => `${k ? 'L' : 'M'} ${x} ${y}`).join(' ')} stroke={c.apagado} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" opacity={E('ocho')} />
        {ARCO.map(([x, y], k) => {
          const u = sm(t, m('ocho') + k * 0.25, m('ocho') + k * 0.25 + 0.4);
          const hecho = avance >= k - 0.05;
          return (
            <g key={k} opacity={u}>
              <circle cx={x} cy={y} r={18} fill={hecho ? [NARANJA, ROSA, ROJO_M, AMBAR, VIOLETA, ROJO_M, VERDE, TEAL][k] : c.apagado} />
              {(!movil || k % 2 === 0 || k === 7) && <Txt x={x} y={y + 52} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>{ETQ[k]}</Txt>}
            </g>
          );
        })}
        {t >= m('fondo') && <Persona id={ID} x={px} y={py - 14} s={0.42} cuerpo={NARANJA} />}
        <Pastilla x={260} y={250} texto={movil ? 'Hauge' : 'Michael Hauge, guionista'} fondo={VIOLETA} tam={24} op={E('hauge')} />
        <Pastilla x={260} y={310} texto={movil ? 'Deseo vs. obstáculos' : 'Un deseo frente a obstáculos'} fondo={GRIS} tam={24} op={E('deseo')} />
        {t >= m('verdad') && <Sello x={760} y={780} texto={movil ? 'Si es verdad' : 'Solo si es verdad'} u={sm(t, m('verdad'), m('verdad') + 0.6)} color={VERDE} tam={28} rot={-4} />}
      </Toma>
    </Lienzo>
  );
};
