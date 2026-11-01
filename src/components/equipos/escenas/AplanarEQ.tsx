import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Rol, Engranaje, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «El aplanamiento (delayering)», en tres tomas.
 * 1 · Un edificio de cuatro pisos: salen los dos pisos del medio y la información baja más rápido, pero queda
 *     un hueco: ¿quién coordina?
 * 2 · Dos modelos lado a lado. Mecánico: una columna de personas por la que el mensaje baja nivel a nivel,
 *     con sellos de aprobación, una insignia de título y una cadena de engranajes que gira de a uno. Orgánico:
 *     una red alrededor del cliente; las señales vuelven al instante y los nodos del borde se agrandan.
 * 3 · El peligro: se arranca la losa del medio de un día para otro; la base se congela (parálisis), la dirección
 *     se agota, quienes quedan miran salir a sus compañeros y la madeja de coordinación queda tirada en el piso.
 */

const ID = 'eq08';
const nombres = ['quitar', 'coordinacion', 'dos', 'mecanico', 'arriba', 'aprobacion', 'titulo', 'engranaje', 'organico', 'inmediata', 'margenes', 'empoderamiento', 'red', 'dia', 'peligro', 'paralisis', 'agotamiento', 'superviviente', 'nodesaparece', 'dejahacerse', 'pregunta'] as const;
type N = typeof nombres[number];

const NODOS: [number, number][] = [[860, 460], [700, 380], [780, 270], [940, 270], [1020, 380], [1000, 560], [720, 560]];
const ARISTAS: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1]];

export const AplanarEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'El aplanamiento'], [m('quitar'), 'Quitar capas acelera…'], [m('coordinacion'), '…si algo coordina'], [m('dos'), 'Dos modelos'],
    [m('mecanico'), 'Ayer: mecánico'], [m('arriba'), 'De arriba hacia abajo'], [m('aprobacion'), 'Niveles de aprobación'], [m('titulo'), 'Autoridad del título'], [m('engranaje'), 'Como un engranaje'],
    [m('organico'), 'Hoy: orgánico'], [m('inmediata'), 'Retroalimentación inmediata'], [m('margenes'), 'Autoridad en los márgenes'], [m('empoderamiento'), 'Empoderamiento'], [m('red'), 'Como una red'],
    [m('dia'), '¿De un día para otro?'], [m('peligro'), 'El peligro estructural'], [m('paralisis'), 'Parálisis operativa'], [m('agotamiento'), 'Agotamiento en la dirección'], [m('superviviente'), 'Síndrome del superviviente'],
    [m('nodesaparece'), 'La coordinación no desaparece'], [m('dejahacerse'), 'Deja de hacerse'],
  ];

  /* Toma 1 */
  const sale = sm(t, m('quitar') + 0.3, m('quitar') + 1.8);
  /* Toma 3 */
  const arranca = sm(t, m('dia') + 0.3, m('dia') + 1.2);
  const hielo = sm(t, m('paralisis'), m('paralisis') + 1);
  const ovillo = sm(t, m('nodesaparece'), m('nodesaparece') + 1);
  const polvo = sm(t, m('dejahacerse') + 0.3, m('dejahacerse') + 1.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El aplanamiento">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · quitar capas */}
      <Toma t={t} a={-1} b={m('dos')} zi={1}>
        <Suelo y={720} isDark={isDark} x0={300} x1={900} />
        {[0, 1, 2, 3].map((k) => {
          const medio = k === 1 || k === 2;
          const y0 = 620 - k * 120;
          const y = medio ? y0 : k === 3 ? lerp(y0, 620 - 120, sale) : y0;
          const dx = medio ? (k === 1 ? -1 : 1) * 700 * sale : 0;
          return (
            <g key={k} opacity={medio ? 1 - sale : 1} transform={`translate(${dx} 0)`}>
              <rect x={420} y={y} width={360} height={100} rx={16} fill={[PIZARRA, AMBAR, AMBAR, VIOLETA][k]} style={sombra(c.sombra, 4, 8)} />
              {[0, 1, 2].map((j) => <rect key={j} x={450 + j * 110} y={y + 26} width={80} height={44} rx={8} fill="#fde68a" opacity={0.85} />)}
            </g>
          );
        })}
        {t >= m('quitar') && (() => { const ph = ((t - m('quitar')) * (sale > 0.9 ? 0.9 : 0.35)) % 1; const y = lerp(260 + 240 * sale, 680, ph); return <circle cx={600} cy={y} r={14} fill={NARANJA} opacity={Math.min(1, ph * 6, (1 - ph) * 6)} />; })()}
        {t >= m('coordinacion') && <g opacity={e1(t, m('coordinacion'))}>
          <rect x={410} y={601} width={380} height={18} rx={9} fill={ROJO_M} opacity={0.35 + 0.25 * Math.sin(t * 4)} />
          <Letrero x={600} y={790} texto="¿Quién coordina?" fondo={ROJO_M} id={ID} />
        </g>}
      </Toma>

      {/* TOMA 2 · mecánico frente a orgánico */}
      <Toma t={t} a={m('dos')} b={m('dia')}>
        <rect x={598} y={140} width={4} height={660} rx={2} fill={c.apagado} opacity={0.6} />
        {/* mecánico */}
        {t >= m('mecanico') && <g opacity={e1(t, m('mecanico'))}>
          <Letrero x={300} y={160} texto="Mecánico" fondo={PIZARRA} id={ID} />
          {[0, 1, 2, 3].map((k) => <g key={k}><rect x={110} y={312 + k * 130} width={120} height={8} rx={4} fill={c.apagado} /><Persona id={ID} x={170} y={312 + k * 130} s={0.34} cuerpo={k === 0 ? PIZARRA : k === 3 ? NARANJA : AMBAR} corbata={k < 3} /></g>)}
          {t >= m('arriba') && (() => { const ph = ((t - m('arriba')) * 0.16) % 1; const nivel = Math.floor(ph * 4); const dentro = (ph * 4) % 1; const y = 250 + nivel * 130 + (dentro < 0.7 ? 0 : (dentro - 0.7) / 0.3 * 130); return <circle cx={240} cy={y} r={11} fill={NARANJA} />; })()}
          {t >= m('aprobacion') && [0, 1, 2].map((k) => <g key={k} opacity={sm(t, m('aprobacion') + k * 0.5, m('aprobacion') + 0.4 + k * 0.5)} transform={`translate(80 ${290 + k * 130}) rotate(-12)`}><rect x={-30} y={-16} width={60} height={32} rx={8} fill={ROJO_M} opacity={0.85} /><Txt x={0} y={8} textAnchor="middle" fontSize={20} fill="#fff" peso={800}>OK</Txt></g>)}
          {t >= m('titulo') && <g opacity={e1(t, m('titulo'))} transform="translate(170 228)"><path d="M -22 0 L -22 -22 L -10 -10 L 0 -28 L 10 -10 L 22 -22 L 22 0 Z" fill={AMBAR} /></g>}
          {t >= m('engranaje') && [0, 1, 2, 3].map((k) => {
            const turno = Math.floor(((t - m('engranaje')) * 0.8) % 4);
            const gira = turno === k ? ((t - m('engranaje')) * 0.8 % 1) : 0;
            return <g key={k} opacity={e1(t, m('engranaje') + k * 0.2)}><Engranaje x={360 + (k % 2) * 90} y={300 + k * 120} r={44} t={(k % 2 ? -1 : 1) * (Math.floor(((t - m('engranaje')) * 0.8 - k) / 4) + gira) * 12} hueco={c.panel} color={turno === k ? NARANJA : '#94a3b8'} /></g>;
          })}
        </g>}
        {/* orgánico */}
        {t >= m('organico') && (() => { const brillo = sm(t, m('empoderamiento'), m('empoderamiento') + 1); const borde = sm(t, m('margenes'), m('margenes') + 1); return (
          <g opacity={e1(t, m('organico'))}>
            <Letrero x={880} y={160} texto="Orgánico" fondo={VERDE} id={ID} />
            {ARISTAS.map(([a, b], k) => <line key={k} x1={NODOS[a][0]} y1={NODOS[a][1]} x2={NODOS[b][0]} y2={NODOS[b][1]} stroke={VERDE} strokeWidth={4} opacity={0.35} />)}
            {t >= m('red') && ARISTAS.map(([a, b], k) => { const ph = ((t - m('red')) * 1.2 + k * 0.13) % 1; return <circle key={k} cx={lerp(NODOS[a][0], NODOS[b][0], ph)} cy={lerp(NODOS[a][1], NODOS[b][1], ph)} r={6} fill={VERDE} />; })}
            {NODOS.map(([x, y], k) => <circle key={k} cx={x} cy={y} r={(k === 0 ? 30 : 22) * (k > 0 ? 1 + 0.35 * borde : 1 - 0.2 * borde)} fill={brillo > 0 && k > 0 ? VERDE : k === 0 ? PIZARRA : '#94a3b8'} opacity={0.95} />)}
            {t >= m('inmediata') && <g opacity={e1(t, m('inmediata'))}>
              <Persona id={ID} x={1100} y={700} s={0.42} cuerpo={AZUL_M} />
              {[0, 1, 2].map((k) => { const ph = (t * 1.4 + k / 3) % 1; return <circle key={k} cx={lerp(1080, 1000, ph)} cy={lerp(640, 560, ph)} r={7} fill={AZUL_M} opacity={1 - ph} />; })}
            </g>}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 3 · el peligro de quitar la capa media de golpe */}
      <Toma t={t} a={m('dia')} b={fin + 5}>
        <Suelo y={700} isDark={isDark} x0={160} x1={840} />
        <rect x={250} y={290} width={400} height={24} rx={10} fill={isDark ? '#4b5563' : '#cbd5e1'} />
        <rect x={190} y={690} width={520} height={20} rx={10} fill={isDark ? '#4b5563' : '#cbd5e1'} />
        <g opacity={1 - arranca} transform={`translate(${900 * arranca} ${-40 * Math.sin(Math.PI * arranca)})`}>
          <rect x={220} y={490} width={460} height={24} rx={10} fill={AMBAR} />
          {[300, 450, 600].map((x) => <Persona key={x} id={ID} x={x} y={490} s={0.36} cuerpo={AMBAR} />)}
        </g>
        {/* director agotado */}
        <Rol id={ID} rol="mg" x={450} y={290} s={0.44} t={t} sigla={false} herramienta={false} />
        {t >= m('agotamiento') && <g opacity={e1(t, m('agotamiento'))}>
          <g transform="translate(560 210)"><rect x={-30} y={-16} width={60} height={32} rx={6} fill={c.panel} style={sombra(0.2, 2, 4)} /><rect x={30} y={-6} width={6} height={12} rx={2} fill={c.tenue} /><rect x={-26} y={-12} width={12} height={24} rx={3} fill={ROJO_M} opacity={0.6 + 0.4 * Math.sin(t * 6)} /></g>
          {[0, 1].map((k) => { const ph = (t * 0.9 + k / 2) % 1; return <path key={k} d={`M ${420 + k * 56} ${200 + ph * 30} q -6 10 0 14 q 6 -4 0 -14 Z`} fill="#7dd3fc" opacity={1 - ph} />; })}
        </g>}
        {/* base: congelada */}
        {[250, 360, 470, 580].map((x, k) => {
          const vaSe = k === 3 && t >= m('superviviente');
          const ida = sm(t, m('superviviente') + 0.4, m('superviviente') + 2.4);
          return (
            <g key={x} opacity={vaSe ? 1 - sm(ida, 0.7, 1) : 1}>
              <Rol id={ID} rol={k % 2 ? 'ae' : 'sdr'} x={vaSe ? lerp(x, 1080, ida) : x} y={690} s={0.42} t={t} sigla={false} herramienta={false} />
              {hielo > 0 && !vaSe && <rect x={x - 34} y={590} width={68} height={100} rx={14} fill="#bae6fd" opacity={0.45 * hielo} />}
            </g>
          );
        })}
        {t >= m('peligro') && <g opacity={e1(t, m('peligro'))} transform="translate(930 280)">
          <path d="M 0 -70 L 70 50 H -70 Z" fill={AMBAR} /><rect x={-6} y={-30} width={12} height={46} rx={6} fill="#1f2937" /><circle cy={32} r={7} fill="#1f2937" />
        </g>}
        {t >= m('paralisis') && <Letrero x={450} y={770} texto="Parálisis" fondo={AZUL_M} id={ID} op={hielo * (1 - ac(t, m('superviviente') - 0.4, m('superviviente')))} />}
        {t >= m('superviviente') && <Letrero x={450} y={770} texto="Miedo y desconfianza" fondo={PIZARRA} id={ID} op={e1(t, m('superviviente')) * (1 - ac(t, m('nodesaparece') - 0.4, m('nodesaparece')))} />}
        {/* la madeja de coordinación que queda en el piso */}
        {t >= m('nodesaparece') && <g opacity={ovillo} transform={`translate(930 ${lerp(420, 640, ovillo)})`}>
          {Array.from({ length: 6 }, (_, k) => <ellipse key={k} rx={46} ry={20 + k * 4} fill="none" stroke={polvo > 0.5 ? '#94a3b8' : NARANJA} strokeWidth={5} transform={`rotate(${k * 30 + t * (20 - 18 * polvo)})`} opacity={0.85} />)}
          <Letrero x={0} y={110} texto={polvo > 0.5 ? 'Deja de hacerse' : 'Coordinación'} fondo={polvo > 0.5 ? '#94a3b8' : NARANJA} id={ID} />
        </g>}
      </Toma>
    </Lienzo>
  );
};
