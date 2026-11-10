import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Gente, Calendario, EtiquetaPrecio, Reloj, Cruz, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Escasez y urgencia.
 * Toma 1: un reloj de arena (tiempo) junto a un frasco de cupos (cantidad); lo escaso brilla más.
 * Toma 2: tres topes como puertas: una sala llena con fila de espera, un torniquete que deja pasar cinco por semana y un
 * calendario de grupos con cupos fijos.
 * Toma 3: tres formas de urgencia: la cinta rodante de grupos (si entra hoy, empieza el lunes), el envoltorio que cambia
 * por temporada y la etiqueta de precio que sube. Al final, el cartel «escasez inventada» se resquebraja: los clientes
 * conversan entre sí.
 */

const ID = 'ad14', P = 'ad-escasez';

const Arena: React.FC<{ x: number; y: number; u: number; c: ReturnType<typeof tono> }> = ({ x, y, u, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-80} y={-150} width={160} height={16} rx={8} fill="#92400e" /><rect x={-80} y={134} width={160} height={16} rx={8} fill="#92400e" />
    <path d="M -64 -134 H 64 Q 64 -40 8 0 Q 64 40 64 134 H -64 Q -64 40 -8 0 Q -64 -40 -64 -134 Z" fill={c.panel2} />
    <path d={`M ${-56 * (1 - u)} ${-120 + 110 * u} H ${56 * (1 - u)} L 0 -4 Z`} fill={AMBAR} />
    <path d={`M -56 126 H 56 L ${56 - 40 * u} ${126 - 100 * u} H ${-56 + 40 * u} Z`} fill={AMBAR} />
    <rect x={-2} y={-4} width={4} height={130} fill={AMBAR} opacity={u < 1 ? 0.8 : 0} />
  </g>
);

export const EscasezAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('cantidad'), 'Escasez: cantidad'], [m('tiempo'), 'Urgencia: tiempo'], [m('escaso'), 'Lo escaso se valora más'], [m('topes'), 'Tres topes reales'],
    [m('formas'), 'Tres formas de urgencia'], [m('reales'), 'Solo si es real'],
  ];
  const TOPES: [string, string][] = [['total', 'Clientes a la vez'], ['crecimiento', '5 nuevos por semana'], ['grupo', 'Cupos por grupo']];
  const URG: [string, string][] = [['rodantes', 'Grupos rodantes'], ['temporada', 'Temporada'], ['subir', 'Antes de subir el precio']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Escasez y urgencia">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Cantidad y tiempo */}
      <Toma t={t} a={0} b={m('topes')} cy={470}>
        <g opacity={e1(t, m('cantidad'))}>
          <rect x={200} y={260} width={300} height={400} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
          {Array.from({ length: 9 }, (_, k) => <circle key={k} cx={260 + (k % 3) * 90} cy={330 + Math.floor(k / 3) * 100} r={34} fill={k < 9 - Math.round(7 * sm(t, m('cantidad'), m('tiempo'))) ? NARANJA : c.apagado} />)}
          <Letrero x={350} y={720} texto="Cupos" id={ID} tam={30} />
        </g>
        {t >= m('tiempo') && (
          <g opacity={e1(t, m('tiempo'))}>
            <Arena x={850} y={460} u={sm(t, m('tiempo'), m('topes'))} c={c} />
            <Letrero x={850} y={720} texto="Plazo" fondo={ROSA} id={ID} tam={30} />
          </g>
        )}
        {t >= m('escaso') && (
          <g opacity={e1(t, m('escaso'))}>
            {[0, 1, 2].map((k) => <circle key={k} cx={260} cy={330} r={40 + 30 * (((t * 0.8) + k / 3) % 1)} fill="none" stroke={AMBAR} strokeWidth={5} opacity={1 - (((t * 0.8) + k / 3) % 1)} />)}
            <Letrero x={600} y={180} texto="Lo escaso se valora más" fondo={AMBAR} id={ID} tam={30} />
          </g>
        )}
      </Toma>

      {/* 2 · Tres topes */}
      <Toma t={t} a={m('topes')} b={m('formas')} cy={470}>
        {TOPES.map(([n, txt], k) => {
          const x = 220 + k * 380;
          const on = t >= m(n) - 0.1;
          return (
            <g key={n} opacity={on ? e1(t, m(n)) : 0.15}>
              <rect x={x - 160} y={210} width={320} height={460} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
              {k === 0 && <g><rect x={x - 110} y={260} width={220} height={200} rx={16} fill={NARANJA} opacity={0.2} /><Gente x={x - 80} y={420} n={4} activos={4} color={NARANJA} paso={54} s={0.45} />
                {t >= m('espera') && <Gente x={x - 80} y={600} n={4} activos={0} color={GRIS} paso={54} s={0.4} op={e1(t, m('espera'))} />}</g>}
              {k === 1 && <g><rect x={x - 12} y={300} width={24} height={240} rx={10} fill={c.texto} /><g transform={`rotate(${(t * 90) % 360} ${x} 400)`}><rect x={x - 100} y={394} width={200} height={14} rx={7} fill={VIOLETA} /></g>
                <Gente x={x - 50} y={620} n={5} activos={Math.round(5 * sm(t, m(n), m(n) + 2))} color={VIOLETA} paso={26} s={0.3} /></g>}
              {k === 2 && <Calendario x={x} y={420} s={1.2} marcados={Math.round(3 * sm(t, m(n), m(n) + 1.5))} />}
              <Letrero x={x} y={630} texto={txt} fondo={[NARANJA, VIOLETA, AZUL_M][k]} id={ID} tam={24} />
            </g>
          );
        })}
      </Toma>

      {/* 3 · Tres formas de urgencia, y la condición */}
      <Toma t={t} a={m('formas')} b={fin + 1} cy={470}>
        <g opacity={ventana(t, m('formas'), m('reales') + 0.4)}>
          {URG.map(([n, txt], k) => {
            const x = 220 + k * 380;
            const on = t >= m(n) - 0.1;
            return (
              <g key={n} opacity={on ? e1(t, m(n)) : 0.15}>
                <rect x={x - 160} y={210} width={320} height={460} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                {k === 0 && <g><rect x={x - 130} y={460} width={260} height={30} rx={15} fill={c.texto} />{[0, 1, 2].map((j) => { const ph = ((t * 0.4) + j / 3) % 1; return <rect key={j} x={x - 130 + 260 * ph - 30} y={410} width={60} height={46} rx={10} fill={ROSA} opacity={Math.sin(Math.PI * ph)} />; })}
                  <Txt f="a" x={x} y={360} textAnchor="middle" fontSize={26} fill={c.texto}>Hoy → lunes</Txt></g>}
                {k === 1 && <g transform={`translate(${x} 410)`}>{(['#f97316', '#10b981', '#2f7bf6', '#ec4899'] as const).map((col, j) => <rect key={j} x={-70} y={-70} width={140} height={140} rx={20} fill={col} opacity={Math.floor(t * 0.7) % 4 === j ? 1 : 0} />)}<Txt x={0} y={14} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>Oferta</Txt></g>}
                {k === 2 && <EtiquetaPrecio x={x - 80} y={420} texto={t >= m(n) + 1 ? '$1.500' : '$1.200'} color={t >= m(n) + 1 ? ROJO_M : NARANJA} t={t} bal={1} />}
                <Letrero x={x} y={630} texto={txt} fondo={[ROSA, VERDE, ROJO_M][k]} id={ID} tam={24} />
              </g>
            );
          })}
        </g>
        {t >= m('reales') && (
          <g opacity={e1(t, m('reales'))}>
            <rect x={300} y={300} width={600} height={180} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Txt x={600} y={410} textAnchor="middle" fontSize={44} fill={c.texto} peso={800}>Escasez inventada</Txt>
            {t >= m('inventada') && <path d={`M 360 330 L 470 400 L 430 440 L 560 470`} stroke={ROJO_M} strokeWidth={8} fill="none" opacity={sm(t, m('inventada'), m('inventada') + 0.6)} />}
            {t >= m('inventada') && <Cruz x={880} y={310} r={40} op={sm(t, m('inventada'), m('inventada') + 0.6)} />}
          </g>
        )}
        {t >= m('conversan') && (
          <g opacity={e1(t, m('conversan'))}>
            <Persona id={ID} x={400} y={760} s={0.5} cuerpo={AZUL_M} corbata /><Persona id={ID} x={800} y={760} s={0.5} cuerpo={VIOLETA} corbata />
            {[0, 1, 2].map((k) => { const ph = ((t * 0.9) + k / 3) % 1; return <circle key={k} cx={lerp(450, 750, ph)} cy={640 - 40 * Math.sin(Math.PI * ph)} r={10} fill={AMBAR} />; })}
            <Letrero x={600} y={560} texto="En B2B los clientes conversan" fondo={AZUL_M} id={ID} tam={26} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
