import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Nube, Propuesta, Cruz, Calendario, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Nivel de receptividad (Miller y Heiman).
 * 1 · Vendedor y comprador. El factor oculto: comprar es cambiar. El vendedor imagina una ayuda (un regalo); el comprador
 *     ve una amenaza (una tormenta).
 * 2 · Las tres trampas fatales: tres pozos en el camino del vendedor que se abren al nombrarse.
 * 3 · La realidad: no es la personalidad, es el momento (el mismo comprador en dos fechas) y de ahí salen los cuatro modos.
 */

const ID = 'vc19', P = 'vc-receptividad';
const MODOS: [string, string][] = [['Crecimiento', '#3b82f6'], ['Problemas', '#ef4444'], ['Equilibrio', '#10b981'], ['Exceso de confianza', '#a855f7']];

export const ReceptividadVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('diagnostica'), 'Diagnostica antes de vender'], [m('oculto'), 'El factor oculto: el cambio'], [m('trampas'), 'Tres trampas fatales'],
    [m('realidad'), 'Su situación inmediata'], [m('momentos'), 'Momentos, no personas'], [m('cuatro'), 'Cuatro modos'],
  ];
  const TRAMPAS: [string, string, string][] = [['propia', 'Mi percepción manda', 'Mi visión'], ['comparte', 'La comparte conmigo', 'La comparte'], ['equivocada', 'La suya está mal', 'Está mal']];
  const paso = sm(t, m('propia'), m('equivocada') + 2.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Nivel de receptividad">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · ayuda o amenaza */}
      <Toma t={t} a={0} b={m('trampas')} cy={470}>
        <Persona id={ID} x={250} y={740} s={0.9} />
        <Persona id={ID} x={950} y={740} s={0.9} corbata cuerpo={AZUL_M} />
        {t >= m('diagnostica') && t < m('oculto') && <g opacity={e1(t, m('diagnostica'))} transform="translate(1060 520)"><rect x={-12} y={-90} width={24} height={110} rx={12} fill={c.panel2} /><rect x={-6} y={-60 + 30 * Math.sin(t * 2)} width={12} height={80 - 30 * Math.sin(t * 2)} rx={6} fill={ROSA} /><circle cy={30} r={22} fill={ROSA} /></g>}
        {t >= m('miller') && t < m('oculto') && <Letrero x={600} y={300} texto="Miller y Heiman" fondo={GRIS} id={ID} op={e1(t, m('miller'))} tam={26} />}
        {t >= m('oculto') && (
          <g opacity={e1(t, m('oculto'))}>
            <Propuesta x={lerp(330, 860, sm(t, m('cambie'), m('cambie') + 1.6))} y={560} s={0.8} />
            <Letrero x={600} y={820} texto="Comprar es cambiar" id={ID} op={e1(t, m('cambie'))} tam={26} />
          </g>
        )}
        {t >= m('ayuda') && <Burbuja x={60} y={190} w={movil ? 420 : 380} texto="Le traigo una ayuda" u={sm(t, m('ayuda'), m('ayuda') + 1)} c={c} id={ID} tam={26} />}
        {t >= m('amenaza') && <g opacity={e1(t, m('amenaza'))}><Nube x={950} y={330} s={0.8} t={t} /><Letrero x={950} y={460} texto="Una amenaza" fondo={ROSA} id={ID} tam={26} /></g>}
      </Toma>

      {/* 2 · tres trampas */}
      <Toma t={t} a={m('trampas')} b={m('realidad')} cy={470}>
        <rect x={60} y={640} width={1080} height={16} rx={8} fill={c.apagado} />
        {TRAMPAS.map(([a, n, corto], k) => {
          const x = 360 + k * 280, abre = sm(t, m(a), m(a) + 0.8);
          return (
            <g key={a}>
              <ellipse cx={x} cy={648} rx={90 * abre} ry={26 * abre} fill={isDark ? '#000' : '#1f2937'} />
              {t >= m(a) && <Letrero x={x} y={480 - (k % 2) * 90} texto={movil ? corto : n} fondo={ROSA} id={ID} op={e1(t, m(a))} tam={24} />}
            </g>
          );
        })}
        <Persona id={ID} x={lerp(140, 1080, paso)} y={640} s={0.55} />
      </Toma>

      {/* 3 · la realidad: momentos y modos */}
      <Toma t={t} a={m('realidad')} b={fin + 1} cy={470}>
        {t < m('cuatro') && <g>
          <Persona id={ID} x={350} y={700} s={0.9} corbata cuerpo={AZUL_M} />
          <g opacity={e1(t, m('realidad'))} transform="translate(350 270)">
            <rect x={-150} y={-90} width={300} height={170} rx={20} fill={c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
            <path d={`M -120 40 L -60 ${20 + 10 * Math.sin(t)} L 0 0 L 60 ${-30 + 10 * Math.sin(t * 1.3)} L 120 -50`} stroke={VERDE} strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>
          {t >= m('momentos') && <g opacity={e1(t, m('momentos'))}>
            <Calendario x={650} y={420} s={0.5} marcados={3} />
            <Persona id={ID} x={900} y={700} s={0.9} corbata cuerpo={AZUL_M} />
            <Nube x={900} y={330} s={0.5} t={t} />
          </g>}
        </g>}
        {t >= m('momentos') && t < m('cuatro') && <Letrero x={600} y={820} texto="Mismo comprador, otro momento" id={ID} op={e1(t, m('momentos'))} tam={26} />}
        {t >= m('cuatro') && MODOS.map(([n, col], k) => (
          <g key={n} opacity={e1(t, m('cuatro') + 0.5 * k)} transform={`translate(${(k % 2) * 520 + 340} ${Math.floor(k / 2) * 230 + 330})`}>
            <rect x={-240} y={-80} width={480} height={160} rx={30} fill={col} />
            <Txt x={0} y={12} textAnchor="middle" fontSize={movil ? 30 : 36} fill="#fff">{movil && k === 3 ? 'Exceso' : n}</Txt>
          </g>
        ))}
      </Toma>
    </Lienzo>
  );
};
