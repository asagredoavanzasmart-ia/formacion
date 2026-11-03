import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Contrato, Visto, Cruz, Hilo, Fajo, Engranaje, Brujula, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Introducción a la venta compleja.
 * 1 · Un contrato con varias firmas alrededor: firmas, opiniones y vetos.
 * 2 · El organigrama que cambia: las cajas se reordenan, alguien asciende, alguien se va y el hilo con «tu» contacto se corta.
 * 3 · Título frente a rol: la misma persona con su cargo; los roles se encienden (libera el dinero, trabaja con la solución,
 *     puede bloquearla, puede guiarte) y, en la venta siguiente, el mismo gerente cambia de rol.
 */

const ID = 'vc03', P = 'vc-intro';

export const IntroVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('varias'), 'Varias aprobaciones'], [m('cambia'), 'La estructura cambia'], [m('relacion'), 'Una relación no basta'],
    [m('titulos'), 'Roles, no títulos'], [m('gerente'), 'Mismo cargo, otro rol'],
  ];
  const FIRMAS: [number, number, string][] = [[300, 380, AZUL_M], [300, 640, VIOLETA], [900, 380, AMBAR], [900, 640, TEAL]];

  // Organigrama: posiciones base y reacomodo continuo desde «cambia».
  const baile = sm(t, m('cambia'), m('cambia') + 1) * (t < m('relacion') ? 1 : 0.3);
  const caja = (k: number): [number, number] => {
    const base: [number, number][] = [[600, 220], [380, 400], [600, 400], [820, 400], [490, 580], [710, 580]];
    let [x, y] = base[k];
    x += baile * 30 * Math.sin(t * 1.6 + k * 2);
    if (k === 4) y -= 360 * sm(t, m('ascensos'), m('ascensos') + 1.2);
    if (k === 4) x += 350 * sm(t, m('ascensos'), m('ascensos') + 1.2);
    if (k === 3) x += 340 * sm(t, m('relacion') + 0.8, m('relacion') + 2.2);
    return [x, y];
  };
  const ROLES: [string, string, string][] = [['libera', 'Libera el dinero', VERDE], ['libera', 'Trabaja con la solución', AZUL_M], ['bloquearla', 'Puede bloquearla', ROSA], ['guiarte', 'Puede guiarte', NARANJA]];
  const tRol = (k: number) => (k === 1 ? m('libera') + 1.4 : m(ROLES[k][0]));
  let activo = -1;
  ROLES.forEach((_, k) => { if (t >= tRol(k)) activo = k; });
  if (t >= m('gerente')) activo = Math.floor(t * 0.8) % 2 ? 0 : 2;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Introducción a la venta compleja">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · varias firmas */}
      <Toma t={t} a={0} b={m('cambia')} cy={500}>
        <Contrato x={600} y={520} s={1.5} firma={sm(t, m('firmas'), m('firmas') + 3)} op={e1(t, 0.3)} />
        {FIRMAS.map(([x, y, col], k) => t >= m('varias') + 0.3 * k && (
          <g key={k} opacity={e1(t, m('varias') + 0.3 * k)}>
            <Persona id={ID} x={x} y={y + 90} s={0.5} cuerpo={col} />
            {t >= m('firmas') + 0.8 * k && (k === 3 ? <Cruz x={x + (x < 600 ? -70 : 70)} y={y - 30} r={24} op={e1(t, m('firmas') + 0.8 * k)} /> : <Visto x={x + (x < 600 ? -70 : 70)} y={y - 30} r={24} op={e1(t, m('firmas') + 0.8 * k)} />)}
          </g>
        ))}
        {t >= m('firmas') && <Letrero x={600} y={800} texto="Firmas, opiniones y vetos" id={ID} op={e1(t, m('firmas'))} tam={26} />}
      </Toma>

      {/* 2 · el organigrama cambia */}
      <Toma t={t} a={m('cambia')} b={m('titulos')} cy={470}>
        {[[0, 1], [0, 2], [0, 3], [2, 4], [2, 5]].map(([a, b]) => { const [x1, y1] = caja(a), [x2, y2] = caja(b); return <line key={`${a}${b}`} x1={x1} y1={y1 + 40} x2={x2} y2={y2 - 40} stroke={c.apagado} strokeWidth={5} opacity={b === 3 ? 1 - sm(t, m('relacion') + 0.8, m('relacion') + 1.6) : 1} />; })}
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const [x, y] = caja(k);
          const sale = k === 5 ? 1 - sm(t, m('ascensos') + 1.5, m('ascensos') + 2.5) : 1;
          return (
            <g key={k} transform={`translate(${x} ${y})`} opacity={sale}>
              <rect x={-80} y={-40} width={160} height={80} rx={16} fill={k === 3 && t >= m('relacion') ? NARANJA : c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
              <circle cx={-44} cy={-2} r={18} fill={[VIOLETA, AZUL_M, VERDE, AMBAR, TEAL, ROSA][k]} />
              <rect x={-16} y={-12} width={74} height={9} rx={4} fill={c.apagado} /><rect x={-16} y={6} width={50} height={9} rx={4} fill={c.apagado} />
            </g>
          );
        })}
        {t >= m('ascensos') && <Letrero x={600} y={760} texto={t >= m('ascensos') + 1.6 ? 'Ascensos, renuncias, fusiones' : 'Hay ascensos'} id={ID} op={e1(t, m('ascensos'))} tam={26} fondo={GRIS} />}
        {t >= m('relacion') && (
          <g opacity={e1(t, m('relacion'))}>
            <Persona id={ID} x={150} y={720} s={0.6} />
            <Hilo x1={190} y1={600} x2={caja(3)[0] - 80} y2={caja(3)[1]} u={1 - sm(t, m('relacion') + 0.8, m('relacion') + 1.8)} id={ID} grosor={5} />
          </g>
        )}
        {t >= m('relacion') + 1.6 && <Letrero x={600} y={800} texto="Una sola persona no basta" fondo={ROSA} id={ID} op={e1(t, m('relacion') + 1.6)} tam={26} />}
      </Toma>

      {/* 3 · título frente a rol */}
      <Toma t={t} a={m('titulos')} b={fin + 1} cy={470}>
        <Persona id={ID} x={250} y={660} s={1.05} corbata />
        <g transform="translate(250 612)" opacity={1 - 0.5 * sm(t, m('roles'), m('roles') + 0.8)}>
          <rect x={-70} y={-24} width={140} height={48} rx={10} fill="#fff" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
          <Txt x={0} y={9} textAnchor="middle" fontSize={26} fill="#374151">Gerente</Txt>
        </g>
        {t >= m('titulo') && t < m('roles') + 99 && <Letrero x={250} y={250} texto={t >= m('rol') ? 'Rol: qué hace' : 'Título: dónde está'} fondo={t >= m('rol') ? undefined : GRIS} id={ID} op={e1(t, t >= m('rol') ? m('rol') : m('titulo'))} tam={26} />}
        {ROLES.map(([, n, col], k) => {
          const y = 230 + k * 150, on = e1(t, tRol(k));
          if (t < tRol(k) && !(t >= m('roles') && k === 0)) return null;
          const vis = t >= m('roles') ? Math.max(on, e1(t, m('roles') + 0.2 * k) * 0.45) : on;
          const brilla = activo === k;
          return (
            <g key={n} opacity={vis} transform={`translate(${800} ${y})`}>
              <rect x={-300} y={-55} width={600} height={110} rx={22} fill={brilla ? col : c.panel} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
              <g transform="translate(-235 0)">
                {k === 0 && <Fajo x={0} y={20} n={3} w={64} />}
                {k === 1 && <Engranaje x={0} y={0} r={30} t={t} color={brilla ? '#fff' : AZUL_M} hueco={brilla ? col : c.panel} />}
                {k === 2 && <rect x={-34} y={-10} width={68} height={20} rx={8} fill={brilla ? '#fff' : ROSA} />}
                {k === 3 && <Brujula x={0} y={0} r={34} ang={30 * Math.sin(t * 1.5)} id={ID} />}
              </g>
              <Txt x={-170} y={10} fontSize={movil ? 26 : 30} fill={brilla ? '#fff' : c.texto}>{n}</Txt>
            </g>
          );
        })}
        {t >= m('roles') && activo >= 0 && <line x1={330} y1={470} x2={500} y2={230 + activo * 150} stroke={`url(#${ID}-marcaH)`} strokeWidth={6} strokeLinecap="round" strokeDasharray="4 12" />}
        {t >= m('gerente') && <Letrero x={600} y={820} texto="Mismo gerente, otro rol" id={ID} op={e1(t, m('gerente'))} tam={24} />}
      </Toma>
    </Lienzo>
  );
};
