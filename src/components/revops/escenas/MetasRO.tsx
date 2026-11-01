import React from 'react';
import { useMovil, Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Tabla, Cruz, Visto, Rotulo, Persona, Txt, Reloj, Calendario, Moneda3D, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Metas trimestrales», en cuatro tomas.
 * 1 · RevOps es una inversión de 1 a 3 años: a los 18 meses todo se vuelve más fácil; el costo por lead baja con tiempo.
 * 2 · Tres prioridades: empezar por lo cuantificable (el cronómetro sobre el formulario), no soltar nunca el proceso de
 *     ventas (el corazón del ingreso) y tener paciencia (una planta que crece).
 * 3 · El plan de 12 meses: metas, métricas y éxito por trimestre, que se llenan al nombrarse.
 * 4 · Spencer: de la meta a tres años a las rocas trimestrales; Doughty: mapear el recorrido cada 12 meses.
 */

const ID = 'ro53';
const nombres = ['inversion', 'davidoff', 'facil', 'powers', 'igual', 'baja', 'leer', 'tres', 'empezar', 'cuantificables', 'clics', 'medir', 'nunca', 'flujo', 'paciencia', 'pago', 'plan', 'filas', 't1', 't2', 't3', 't4', 'spencer', 'rocas', 'ano3', 'doughty', 'meses12', 'pregunta'] as const;
type N = typeof nombres[number];

export const MetasRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);
  const movil = useMovil();

  const rotulos: [number, string][] = [
    [0.2, 'Una inversión de 1 a 3 años'], [m('powers'), 'La señal llega con tiempo'], [m('tres'), 'Tres prioridades'],
    [m('plan'), 'El plan de 12 meses'], [m('spencer'), 'Rocas trimestrales'], [m('doughty'), 'Mapear cada 12 meses'],
  ];

  const prio = t >= m('paciencia') ? 2 : t >= m('nunca') ? 1 : t >= m('empezar') ? 0 : -1;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="De la visión a las metas trimestrales">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · una inversión de 1 a 3 años */}
      <Toma t={t} a={-1} b={m('tres')} zi={1}>
        {(() => {
          const X0 = 160, X1 = 1040, Y0 = 640;
          const u = sm(t, m('inversion'), m('inversion') + 2.5);
          const esf = (q: number) => Y0 - 300 + 220 * (q > 0.5 ? (q - 0.5) * 2 : 0);
          const cpl = (q: number) => Y0 - 260 + 200 * sm(q, 0.3, 1);
          return (
            <g>
              <rect x={X0} y={Y0} width={X1 - X0} height={5} rx={2} fill={c.apagado} />
              {['Año 1', '18 meses', 'Año 3'].map((txt, k) => <Txt key={txt} f="a" x={X0 + [0.33, 0.5, 1][k] * (X1 - X0)} y={Y0 + 40} textAnchor="middle" fontSize={22} fill={k === 1 ? NARANJA : c.tenue} peso={700} opacity={e1(t, m('inversion') + k * 0.4)}>{txt}</Txt>)}
              {t >= m('facil') && <g opacity={e1(t, m('facil'))}><polyline points={Array.from({ length: 31 }, (_, k) => k / 30).map((q) => `${lerp(X0, X1, q)},${esf(q)}`).join(' ')} fill="none" stroke={VERDE} strokeWidth={10} strokeLinecap="round" /><Letrero x={X0 + 0.75 * (X1 - X0)} y={Y0 - 160} texto="Todo se vuelve más fácil" fondo={VERDE} id={ID} tam={22} /></g>}
              {t >= m('igual') && <g opacity={e1(t, m('igual'))}><polyline points={Array.from({ length: 31 }, (_, k) => k / 30).filter((q) => q <= (t >= m('baja') ? 1 : 0.3)).map((q) => `${lerp(X0, X1, q)},${cpl(q)}`).join(' ')} fill="none" stroke={ROSA} strokeWidth={8} strokeDasharray="14 10" /><Letrero x={X0 + 120} y={Y0 - 320} texto="Costo por lead" fondo={ROSA} id={ID} tam={20} /></g>}
              {t >= m('davidoff') && t < m('facil') && <Letrero x={600} y={200} texto="«Tu inversión de 1 a 3 años»" fondo={PIZARRA} id={ID} op={e1(t, m('davidoff'))} tam={22} />}
              {t >= m('leer') && <Letrero x={600} y={190} texto="Saberlo cambia cómo lees los resultados" id={ID} op={e1(t, m('leer'))} tam={20} />}
              <circle cx={lerp(X0, X1, u)} cy={Y0} r={12} fill={NARANJA} opacity={e1(t, m('inversion'))} />
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 2 · tres prioridades */}
      <Toma t={t} a={m('tres')} b={m('plan')}>
        {['Lo cuantificable', 'Nunca soltar ventas', 'Paciencia'].map((txt, k) => <g key={txt} opacity={e1(t, m('tres') + k * 0.3) * (prio >= 0 && prio !== k ? 0.4 : 1)}><Letrero x={240 + k * 360} y={170} texto={`${k + 1} · ${txt}`} fondo={[AZUL_M, NARANJA, VERDE][k]} id={ID} tam={22} /></g>)}
        {prio === 0 && <g opacity={e1(t, m('empezar'))}>
          <rect x={200} y={280} width={400} height={360} rx={20} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={240} y={320 + k * 64} width={320} height={40} rx={10} fill={c.panel2} />)}
          {t >= m('clics') && <g opacity={e1(t, m('clics'))}>{[0, 1, 2].map((k) => { const ph = (t * 0.9 + k / 3) % 1; return <circle key={k} cx={300 + k * 100} cy={420} r={10 + 16 * ph} fill="none" stroke={AZUL_M} strokeWidth={4} opacity={1 - ph} />; })}</g>}
          {t >= m('cuantificables') && <Reloj x={820} y={440} r={110} t={t} vel={2} aro={AZUL_M} />}
          {t >= m('medir') && <Letrero x={600} y={720} texto="Si mides la fricción, puedes priorizar" fondo={AZUL_M} id={ID} op={e1(t, m('medir'))} tam={22} />}
        </g>}
        {prio === 1 && <g opacity={e1(t, m('nunca'))}>
          {(() => { const lat = 1 + 0.08 * Math.sin(t * 6); return <g transform={`translate(400 460) scale(${lat * 2.6})`}><path d="M 0 26 C -46 -6 -24 -46 0 -18 C 24 -46 46 -6 0 26 Z" fill={NARANJA} /></g>; })()}
          {t >= m('flujo') && [0, 1, 2, 3].map((k) => { const ph = ((t - m('flujo')) * 0.5 + k / 4) % 1; return <g key={k} opacity={Math.min(1, ph * 5, (1 - ph) * 5)}><Moneda3D x={lerp(500, 980, ph)} y={460 - 60 * Math.sin(Math.PI * ph)} r={20} giro={Math.cos(t * 4 + k)} /></g>; })}
          <Letrero x={600} y={720} texto="Ventas mantiene viva a la empresa" fondo={NARANJA} id={ID} tam={22} />
        </g>}
        {prio === 2 && <g opacity={e1(t, m('paciencia'))}>
          <Suelo y={640} isDark={isDark} x0={300} x1={900} />
          {(() => { const h = 60 + 220 * sm(t, m('paciencia'), m('paciencia') + 6); return <g><rect x={596} y={640 - h} width={8} height={h} fill="#15803d" />{[0.4, 0.7, 0.95].map((q, k) => h > 60 + 220 * q * 0.8 && <ellipse key={k} cx={600 + (k % 2 ? 40 : -40)} cy={640 - h * q} rx={40} ry={18} fill={VERDE} transform={`rotate(${k % 2 ? -25 : 25} ${600 + (k % 2 ? 40 : -40)} ${640 - h * q})`} />)}</g>; })()}
          <rect x={540} y={630} width={120} height={70} rx={10} fill="#b45309" />
          {t >= m('pago') && <Letrero x={600} y={760} texto="El pago real: a los 18 meses" fondo={VERDE} id={ID} op={e1(t, m('pago'))} tam={22} />}
        </g>}
      </Toma>

      {/* TOMA 3 · el plan de 12 meses */}
      <Toma t={t} a={m('plan')} b={m('spencer')}>
        {(() => {
          const Q = [
            { n: 't1' as N, meta: 'Definir MQL y SQL', exito: 'Un solo reporte' },
            { n: 't2' as N, meta: 'Implementar el SLA', exito: '90 % en 24 h' },
            { n: 't3' as N, meta: 'Etapas posventa', exito: 'Nada sin activar' },
            { n: 't4' as N, meta: 'Revisar el recorrido', exito: 'Plan aprobado' },
          ];
          const filas = [['', 'T1', 'T2', 'T3', 'T4'], ['Meta', ...Q.map((q) => (t >= m(q.n) ? q.meta : ''))], ['Métrica', ...Q.map((q) => (t >= m(q.n) + 1.5 ? '✓' : ''))], ['Éxito', ...Q.map((q) => (t >= m(q.n) + 1 ? q.exito : ''))]];
          const act = Q.reduce((a, q, k) => (t >= m(q.n) ? k + 1 : a), 0);
          return <g>
            <Tabla x={70} y={220} cols={[140, 250, 250, 220, 200]} filas={t >= m('filas') ? filas : filas.slice(0, 1)} alto={96} c={c} op={e1(t, m('plan'))} tam={18} soloMovil={[0, Math.max(1, act)]} />
            {act > 0 && !movil && <rect x={70 + 140 + [0, 250, 500, 720][act - 1]} y={224} width={[250, 250, 220, 200][act - 1]} height={380} rx={14} fill={NARANJA} opacity={0.1} />}
          </g>;
        })()}
      </Toma>

      {/* TOMA 4 · rocas trimestrales y el recorrido cada 12 meses */}
      <Toma t={t} a={m('spencer')} b={fin + 1}>
        {t >= m('rocas') && <g opacity={e1(t, m('rocas'))}>
          <path d="M 300 330 h 300 v 380 q 0 30 -30 30 h -240 q -30 0 -30 -30 Z" fill="#bfdbfe" opacity={0.4} />
          {[0, 1, 2, 3].map((k) => { const u = sm(t, m('rocas') + k * 0.4, m('rocas') + 0.9 + k * 0.4); return <ellipse key={k} cx={360 + (k % 2) * 150} cy={lerp(200, 680 - Math.floor(k / 2) * 110, u)} rx={70} ry={48} fill={[PIZARRA, '#64748b', '#475569', '#334155'][k]} />; })}
          <Letrero x={450} y={790} texto="Metas a 3 años → rocas trimestrales" fondo={PIZARRA} id={ID} tam={20} />
        </g>}
        {t >= m('ano3') && <Letrero x={450} y={240} texto="No se empieza en el año 3" fondo={ROJO_M} id={ID} op={e1(t, m('ano3'))} tam={20} />}
        {t >= m('doughty') && <g opacity={e1(t, m('doughty'))}>
          <Calendario x={880} y={360} s={1} marcados={14} />
          <path d="M 760 560 C 820 500 940 620 1000 560" stroke={AZUL_M} strokeWidth={6} fill="none" strokeDasharray="10 8" />
          {t >= m('meses12') && <Letrero x={880} y={660} texto="Recorrido del cliente: cada 12 meses" fondo={AZUL_M} id={ID} op={e1(t, m('meses12'))} tam={20} />}
        </g>}
      </Toma>
    </Lienzo>
  );
};
