import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Telefono, Hoja, Bus, Burbuja, Visto, Cruz, Suelo, Flujo, Corazon, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Lanzar antes de estar listo.
 * 1 · Una caja de producto a medio terminar que se sonroja; «¿qué clientes?»: la sala vacía.
 * 2 · Simular antes de construir: el teléfono con un grupo de WhatsApp y una persona que lo hace todo a mano; FeeX lee
 *     documentos a mano; la pizarra de Michael Dell: «fabricar, vender» se da vuelta.
 * 3 · Los adhesivos en el bus de Moovit: la curva de usuarios no se mueve y se pasa al siguiente experimento.
 *     Luego la pregunta cambia de «¿quién falló?» a «¿qué aprendimos?», y se celebra.
 */

const ID = 'ep07', P = 'ep-lanzar';

export const LanzarEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('lanzar'), 'Lanzar antes de estar listo'], [m('simular'), 'Simular antes de construir'], [m('dell'), 'Vender antes de fabricar'],
    [m('adhesivos'), 'Si no se nota hoy…'], [m('evento'), 'Un evento, no una persona'], [m('celebrar'), 'Celebrar'],
  ];
  const giro = sm(t, m('orden'), m('orden') + 1.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Lanzar antes de estar listo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el producto a medio hacer */}
      <Toma t={t} a={0} b={m('simular')} cy={480}>
        <Suelo y={680} isDark={isDark} x0={160} x1={1040} />
        <g transform={`translate(420 ${680 - 6 * Math.abs(Math.sin(t * 3))})`}>
          <rect x={-130} y={-220} width={260} height={220} rx={18} fill={`url(#${ID}-marca)`} />
          <path d="M -130 -220 L -60 -270 H 200 L 130 -220 Z" fill="#fdba74" />
          <rect x={-60} y={-150} width={50} height={60} rx={8} fill="#fff" opacity={0.4} /><path d="M 20 -150 l 40 0 l -20 40 Z" fill="#fff" opacity={0.3} />
          {t >= m('avergüenza') && <g opacity={e1(t, m('avergüenza'))}><circle cx={-40} cy={-60} r={14} fill="#f472b6" opacity={0.7} /><circle cx={40} cy={-60} r={14} fill="#f472b6" opacity={0.7} /><path d="M -20 -40 q 20 -12 40 0" stroke="#7c2d12" strokeWidth={5} fill="none" /></g>}
        </g>
        {t >= m('avergüenza') && <Letrero x={420} y={740} texto="Te avergüenza: es el momento" id={ID} op={e1(t, m('avergüenza'))} />}
        {t >= m('clientes') && <g opacity={e1(t, m('clientes'))}>
          {[0, 1, 2].map((k) => <rect key={k} x={760 + k * 90} y={560} width={70} height={110} rx={14} fill={c.apagado} />)}
          {!movil && <Burbuja x={720} y={300} w={330} texto="¿Qué clientes?" u={sm(t, m('clientes'), m('clientes') + 1)} c={c} id={ID} />}
          <Letrero x={850} y={740} texto="Todavía no hay ninguno" fondo={GRIS} id={ID} tam={26} />
        </g>}
      </Toma>

      {/* 2 · simular: WhatsApp a mano, FeeX a mano, la pizarra de Dell */}
      <Toma t={t} a={m('simular')} b={m('adhesivos')} cy={470}>
        {t < m('dell') ? <g>
          <Telefono x={330} y={430} s={1.3} widgets={0} op={e1(t, m('whatsapp'))} />
          {t >= m('whatsapp') && [0, 1, 2, 3].map((k) => <rect key={k} x={k % 2 ? 290 : 262} y={330 + k * 46} width={100} height={34} rx={12} fill={k % 2 ? '#dcfce7' : '#fff'} opacity={e1(t, m('whatsapp') + 0.3 * k)} />)}
          {t >= m('whatsapp') && <Letrero x={330} y={620} texto="Grupo de WhatsApp" fondo={VERDE} id={ID} op={e1(t, m('whatsapp'))} tam={26} />}
          {t >= m('mano') && <Persona id={ID} x={600} y={620} s={0.8} cuerpo={NARANJA} />}
          {t >= m('mano') && <Flujo x1={400} y1={420} x2={560} y2={500} t={t} n={4} vel={1} arco={40} color={VERDE} />}
          {t >= m('mano') && <Letrero x={600} y={690} texto="Todo a mano" id={ID} op={e1(t, m('mano'))} tam={26} />}
          {t >= m('feex') && <g opacity={e1(t, m('feex'))}>
            {[0, 1, 2].map((k) => <Hoja key={k} x={880 + k * 28} y={420 - k * 22} rot={-8 + k * 8} />)}
            <Letrero x={920} y={620} texto="FeeX: leer a mano" fondo={VIOLETA} id={ID} tam={26} />
          </g>}
        </g> : <g opacity={e1(t, m('dell'))}>
          <rect x={250} y={210} width={700} height={420} rx={22} fill={isDark ? '#1f2937' : '#f8fafc'} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
          <rect x={250} y={630} width={700} height={18} rx={9} fill="#94a3b8" />
          {[{ n: '1. Fabricar', y0: 340, y1: 480 }, { n: '2. Vender', y0: 480, y1: 340 }].map((r, k) => (
            <Txt key={r.n} f="a" x={600} y={lerp(r.y0, r.y1, giro)} textAnchor="middle" fontSize={54} fill={k ? NARANJA : c.texto}>{giro > 0.5 ? (k ? '1. Vender' : '2. Fabricar') : r.n}</Txt>
          ))}
          <Persona id={ID} x={1040} y={720} s={0.7} cuerpo={AZUL_M} />
          <Letrero x={1040} y={780} texto="Michael Dell" fondo={AZUL_M} id={ID} tam={26} />
        </g>}
      </Toma>

      {/* 3 · los adhesivos, y aprender */}
      <Toma t={t} a={m('adhesivos')} b={fin + 1} cy={470}>
        {t < m('evento') ? <g>
          <Bus x={380} y={600} s={1.4} />
          {[0, 1, 2].map((k) => <rect key={k} x={260 + k * 70} y={480} width={34} height={22} rx={4} fill={NARANJA} opacity={e1(t, m('adhesivos') + 0.2 * k)} />)}
          <Letrero x={380} y={680} texto="Adhesivos en los asientos" fondo={VIOLETA} id={ID} op={e1(t, m('adhesivos'))} tam={26} />
          <rect x={720} y={260} width={380} height={300} rx={20} fill={c.panel} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
          <path d={`M 750 480 H ${lerp(750, 1070, sm(t, m('adhesivos') + 0.5, m('adhesivos') + 3))}`} stroke={GRIS} strokeWidth={8} strokeLinecap="round" />
          <Txt f="a" x={910} y={320} textAnchor="middle" fontSize={28} fill={c.tenue}>Usuarios nuevos</Txt>
          {t >= m('siguiente') && <Letrero x={910} y={620} texto="Siguiente experimento" id={ID} op={e1(t, m('siguiente'))} />}
        </g> : <g>
          <g opacity={1 - 0.75 * sm(t, m('aprendimos'), m('aprendimos') + 0.8)}>
            <Burbuja x={170} y={230} w={400} texto="¿Quién es responsable?" u={sm(t, m('quien'), m('quien') + 1.2)} c={c} id={ID} />
            {t >= m('quien') && <Persona id={ID} x={300} y={640} s={0.7} cuerpo={GRIS} ojos={0.3} />}
          </g>
          {t >= m('aprendimos') && <g opacity={e1(t, m('aprendimos'))}>
            <Burbuja x={630} y={230} w={400} texto="¿Qué aprendimos?" u={sm(t, m('aprendimos'), m('aprendimos') + 1.2)} c={c} id={ID} marca lado="der" />
            {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={760 + k * 100} y={640} s={0.6} cuerpo={[NARANJA, ROSA, AZUL_M][k]} />)}
          </g>}
          {t >= m('celebrar') && [0, 1, 2, 3, 4, 5].map((k) => { const ph = (t * 0.7 + k / 6) % 1; return <rect key={k} x={700 + k * 60} y={180 + 420 * ph} width={14} height={22} rx={4} fill={[NARANJA, ROSA, VERDE, AZUL_M, '#fbbf24', VIOLETA][k]} transform={`rotate(${ph * 360} ${707 + k * 60} ${191 + 420 * ph})`} opacity={e1(t, m('celebrar'))} />; })}
          {t >= m('evento') && <Letrero x={600} y={740} texto="El fracaso es un evento" id={ID} op={e1(t, m('evento'))} />}
          {t >= m('celebrar') && <Corazon x={600} y={460} s={1.2} op={e1(t, m('celebrar'))} />}
        </g>}
      </Toma>
    </Lienzo>
  );
};
