import React from 'react';
import { useEscenaVC, Lienzo, Rotulo, Letrero, Txt, Persona, Burbuja, Visto, Cruz, Hilo, e1, sm, ventana, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Tradicional frente a estratégico: el escenario partido en dos, el mismo recorrido a cada lado.
 * Izquierda: el pez gordo, «mis contactos me aseguran la venta», la cena brillante, sin coach, el punto ciego y la venta perdida.
 * Derecha: el mapa de influencias, «¿quién aprueba realmente?», la acción dirigida, el coach que explica la política interna,
 * el gerente general que delega en el técnico y la cuenta ganada.
 */

const ID = 'vc05', P = 'vc-vendedores';

export const VendedoresVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('tradicional'), 'Relaciones o mapa'], [m('premisa'), 'La premisa'], [m('glamorosa'), 'La táctica'], [m('coach'), 'El coach'],
    [m('ciego'), 'El punto ciego'], [m('pierde'), 'El resultado'],
  ];
  const L = 300, R = 900;
  const v = (a: string, b: string | null) => ventana(t, m(a), b ? m(b) : fin + 1, 0.4);
  const MAPA: [number, number, string][] = [[R, 300, VIOLETA], [R - 170, 430, AZUL_M], [R + 170, 430, AMBAR], [R - 90, 590, TEAL], [R + 90, 590, VERDE]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Tradicional frente a estratégico">
      <Rotulo t={t} lista={rot} id={ID} />
      <line x1={600} y1={130} x2={600} y2={760} stroke={c.apagado} strokeWidth={4} strokeDasharray="10 14" opacity={e1(t, m('tradicional'))} />
      <Txt x={L} y={150} textAnchor="middle" fontSize={28} fill={GRIS} opacity={e1(t, m('tradicional'))}>Tradicional</Txt>
      <Txt x={R} y={150} textAnchor="middle" fontSize={28} fill={NARANJA} opacity={e1(t, m('mapeo'))}>Con estrategia</Txt>

      {/* lado tradicional */}
      <Persona id={ID} x={L - 150} y={760} s={0.55} cuerpo={GRIS} />
      {v('tradicional', 'glamorosa') > 0.01 && (
        <g opacity={v('tradicional', 'glamorosa')}>
          <Persona id={ID} x={L + 40} y={600} s={0.8} corbata cuerpo={VIOLETA} />
          {t >= m('pez') && (
            <g opacity={e1(t, m('pez'))} transform={`translate(${L + 40} ${400 + 6 * Math.sin(t * 3)})`}>
              <path d="M -70 0 Q -20 -50 50 0 Q -20 50 -70 0 Z" fill={AMBAR} /><path d="M 44 0 L 90 -30 L 90 30 Z" fill={AMBAR} /><circle cx={-40} cy={-8} r={7} fill="#fff" />
            </g>
          )}
        </g>
      )}
      {t >= m('premisa') && v('premisa', 'glamorosa') > 0.01 && <g opacity={v('premisa', 'glamorosa')}><Burbuja x={40} y={330} w={movil ? 520 : 500} texto="«Mis contactos me aseguran la venta»" u={sm(t, m('premisa'), m('premisa') + 1.5)} c={c} id={ID} tam={26} /></g>}
      {v('glamorosa', 'coach') > 0.01 && (
        <g opacity={v('glamorosa', 'coach')}>
          <Persona id={ID} x={L + 120} y={600} s={0.6} corbata cuerpo={VIOLETA} />
          <rect x={L - 140} y={540} width={300} height={22} rx={8} fill="#7c4a1e" />
          {[L - 60, L + 40].map((x) => <g key={x}><path d={`M ${x - 14} 490 H ${x + 14} L ${x + 6} 520 H ${x - 6} Z`} fill={ROSA} opacity={0.8} /><rect x={x - 2} y={520} width={4} height={20} fill={GRIS} /></g>)}
          {t >= m('cena') && [0, 1, 2].map((k) => <circle key={k} cx={L - 40 + k * 40} cy={420 - ((t * 40 + k * 30) % 80)} r={5} fill={AMBAR} opacity={0.8} />)}
          <Letrero x={L} y={300} texto="Glamorosa" fondo={GRIS} id={ID} op={e1(t, m('glamorosa'))} tam={26} />
        </g>
      )}
      {v('coach', 'ciego') > 0.01 && <g opacity={v('coach', 'ciego')}><Persona id={ID} x={L + 60} y={600} s={0.6} cuerpo={GRIS} /><Cruz x={L + 60} y={380} r={34} /><Letrero x={L} y={300} texto="Sin coach" fondo={GRIS} id={ID} tam={26} /></g>}
      {v('ciego', 'pierde') > 0.01 && (
        <g opacity={v('ciego', 'pierde')}>
          <Persona id={ID} x={L} y={600} s={0.7} corbata cuerpo={VIOLETA} />
          {[L - 170, L + 170].map((x, k) => <g key={x} opacity={0.35 + 0.15 * Math.sin(t * 3 + k)}><Persona id={ID} x={x} y={560} s={0.5} cuerpo={GRIS} /></g>)}
          <Letrero x={L} y={300} texto="Ignora división y técnicos" fondo={GRIS} id={ID} tam={movil ? 22 : 24} />
        </g>
      )}
      {t >= m('pierde') && <g opacity={e1(t, m('pierde'))}><Cruz x={L} y={430} r={70} /><Letrero x={L} y={620} texto="Pierde la venta «segura»" fondo={ROSA} id={ID} tam={26} /></g>}

      {/* lado estratégico */}
      <Persona id={ID} x={R + 150} y={760} s={0.55} />
      {v('mapeo', 'dirigida') > 0.01 && (
        <g opacity={v('mapeo', 'dirigida')}>
          {MAPA.slice(1).map(([x, y], k) => <Hilo key={k} x1={MAPA[0][0]} y1={MAPA[0][1]} x2={x} y2={y} u={sm(t, m('mapeo') + 0.3 * k, m('mapeo') + 0.3 * k + 0.8)} id={ID} grosor={5} />)}
          {MAPA.map(([x, y, col], k) => <circle key={k} cx={x} cy={y} r={k ? 30 : 40} fill={col} opacity={e1(t, m('mapeo') + 0.25 * k)} />)}
        </g>
      )}
      {t >= m('aprueba') && v('aprueba', 'dirigida') > 0.01 && <g opacity={v('aprueba', 'dirigida')}><Burbuja x={640} y={250} w={movil ? 520 : 480} texto="«¿Quién aprueba realmente?»" u={sm(t, m('aprueba'), m('aprueba') + 1.5)} c={c} id={ID} marca tam={26} /></g>}
      {v('dirigida', 'coach') > 0.01 && (
        <g opacity={v('dirigida', 'coach')}>
          {[90, 64, 38, 14].map((r, k) => <circle key={r} cx={R} cy={460} r={r} fill={k % 2 ? '#fff' : ROSA} />)}
          <g transform={`translate(${R + 200 - 200 * sm(t, m('dirigida'), m('dirigida') + 0.8)} ${460 - 120 + 120 * sm(t, m('dirigida'), m('dirigida') + 0.8)}) rotate(40)`}>
            <rect x={-6} y={-130} width={12} height={130} rx={6} fill={AMBAR} /><path d="M 0 0 L -14 -30 H 14 Z" fill={GRIS} />
          </g>
          <Letrero x={R} y={300} texto="Dirigida" id={ID} op={e1(t, m('dirigida'))} tam={26} />
        </g>
      )}
      {v('coach', 'ciego') > 0.01 && (
        <g opacity={v('coach', 'ciego')}>
          <Persona id={ID} x={R - 60} y={620} s={0.6} cuerpo={NARANJA} />
          <Persona id={ID} x={R + 90} y={620} s={0.6} cuerpo={TEAL} />
          <Letrero x={R} y={300} texto="Coach fundamental" id={ID} tam={26} />
          {t >= m('politica') && <Burbuja x={R - 60} y={380} w={movil ? 300 : 280} texto="Así se decide" u={sm(t, m('politica'), m('politica') + 1)} c={c} id={ID} lado="der" tam={24} />}
        </g>
      )}
      {v('ciego', 'gana') > 0.01 && (
        <g opacity={v('ciego', 'gana')}>
          <Persona id={ID} x={R - 120} y={620} s={0.7} corbata cuerpo={VIOLETA} />
          <Persona id={ID} x={R + 130} y={620} s={0.6} cuerpo={TEAL} />
          {t >= m('delega') && <Hilo x1={R - 70} y1={470} x2={R + 90} y2={470} u={sm(t, m('delega'), m('delega') + 0.9)} id={ID} />}
          <Letrero x={R} y={300} texto={t >= m('delega') ? 'Delega en el técnico' : 'Ve a todos los actores'} id={ID} op={e1(t, m('ciego'))} tam={24} />
        </g>
      )}
      {t >= m('gana') && <g opacity={e1(t, m('gana'))}><Visto x={R} y={430} r={70} /><Letrero x={R} y={620} texto="Gana la cuenta" fondo={VERDE} id={ID} tam={26} /></g>}
    </Lienzo>
  );
};
