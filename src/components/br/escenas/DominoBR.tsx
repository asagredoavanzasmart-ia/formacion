import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Domino, Sello, Persona, Tarjeta, Conector, Pastilla, LogoCF, Visto, Cruz, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El gran dominó.
 * Toma 1: Perry Belcher revisa diez años de ofertas (diez carpetas que se abren) y un gráfico muestra lo que encontró:
 * pedir creer más de una cosa deja la conversión a la mitad.
 * Toma 2: la frase del gran dominó arriba, con sus tres piezas (oportunidad, deseo, vehículo) que se encienden al
 * nombrarse; abajo, una ficha grande («la creencia») frente a una fila de objeciones: al caer, las tumba a todas.
 * Toma 3: el ejemplo de ClickFunnels (con su logo) y el sello «conviene al autor»; luego el criterio: si la frase es
 * verdadera la ficha cae; si no, lo que ofreces es una mejora y la ficha queda en pie.
 */

const ID = 'br08', P = 'br-domino';

export const DominoBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('diez'), 'Diez años de ofertas'], [m('domino'), 'El gran dominó'], [m('logica'), 'Una frase lógica'],
    [m('peso'), 'Caen las objeciones'], [m('clickfunnels'), 'El ejemplo de ClickFunnels'], [m('criterio'), 'El criterio'],
  ];
  const caeG = sm(t, m('peso'), m('peso') + 0.7);
  const cascada = (k: number) => sm(t, m('peso') + 0.5 + k * 0.22, m('peso') + 0.9 + k * 0.22);
  const PZ: [string, string, string][] = [['logica', 'la oportunidad', NARANJA], ['clave', 'lo que más desean', ROSA], ['vehiculo', 'mi vehículo', VIOLETA]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El gran dominó">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Diez años de ofertas */}
      <Toma t={t} a={0} b={m('domino')} cy={470}>
        <Tarjeta x={80} y={200} w={480} h={460} titulo="10 años de ofertas" c={c} id={ID} op={E('diez', 0.6, -0.3)} acento={AMBAR}>
          {Array.from({ length: 10 }, (_, k) => {
            const u = sm(t, m('diez') + k * 0.12, m('diez') + k * 0.12 + 0.4);
            const x = 40 + (k % 5) * 82, y = 110 + Math.floor(k / 5) * 140;
            return <g key={k} opacity={u} transform={`translate(${x} ${y + (1 - u) * 20})`}><path d="M 0 10 H 26 L 34 0 H 70 V 100 H 0 Z" fill={AMBAR} /><rect x={0} y={16} width={70} height={84} rx={6} fill="#fbbf24" /><Txt x={35} y={70} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>{`${k + 1}`}</Txt></g>;
          })}
          <Persona id={ID} x={240} y={440} s={0.5} cuerpo={GRIS} />
        </Tarjeta>
        <Conector x1={560} y1={430} x2={640} y2={430} u={E('mitad', 0.4, -0.4)} t={t} color={AMBAR} />
        <Tarjeta x={640} y={200} w={480} h={460} titulo="Conversión" c={c} id={ID} op={E('mitad', 0.6, -0.4)}>
          <rect x={60} y={380} width={360} height={5} rx={2} fill={c.apagado} />
          <rect x={90} y={380 - 260 * sm(t, m('mitad') - 0.2, m('mitad') + 0.8)} width={120} height={260 * sm(t, m('mitad') - 0.2, m('mitad') + 0.8)} rx={12} fill={VERDE} />
          <rect x={270} y={380 - 130 * sm(t, m('mitad') + 0.4, m('mitad') + 1.4)} width={120} height={130 * sm(t, m('mitad') + 0.4, m('mitad') + 1.4)} rx={12} fill={ROJO_M} />
          <Txt x={150} y={420} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>{movil ? '1' : '1 creencia'}</Txt>
          <Txt x={330} y={420} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>{movil ? '2+' : 'Más de una'}</Txt>
          <Txt x={330} y={230} textAnchor="middle" fontSize={34} fill={ROJO_M} peso={800} opacity={sm(t, m('mitad') + 1.2, m('mitad') + 1.6)}>÷2</Txt>
        </Tarjeta>
      </Toma>

      {/* 2 · La frase y la caída */}
      <Toma t={t} a={m('domino')} b={m('clickfunnels')} cy={470}>
        <Tarjeta x={120} y={180} w={960} h={190} titulo={movil ? undefined : 'Si creen que…'} c={c} id={ID} op={E('logica', 0.6, -0.4)}>
          {PZ.map(([n, txt, col], k) => {
            const u = E(n, 0.5);
            return (
              <g key={n}>
                <Pastilla x={170 + k * 310} y={120} texto={movil ? ['Oportunidad', 'Deseo', 'Vehículo'][k] : txt} fondo={col} tam={26} op={0.25 + 0.75 * u} s={0.9 + 0.1 * u} />
                {k < 2 && <Txt x={325 + k * 310} y={130} textAnchor="middle" fontSize={34} fill={c.tenue} peso={800}>→</Txt>}
              </g>
            );
          })}
        </Tarjeta>
        <rect x={120} y={720} width={960} height={10} rx={5} fill={c.apagado} opacity={E('domino')} />
        <g opacity={E('domino')}>
          <Domino x={210} y={720} h={260} cae={caeG} color={`url(#${ID}-marca)`} puntos={2} />
          <Pastilla x={210} y={410} texto={movil ? 'La creencia' : 'La única creencia'} fondo={NARANJA} tam={24} op={E('unica')} />
        </g>
        {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={E('domino', 0.5, 0.3 + k * 0.08)}><Domino x={450 + k * 105} y={720} h={150} cae={cascada(k)} color={GRIS} puntos={k % 3 + 1} /></g>)}
        <Pastilla x={720} y={790} texto="Las demás objeciones" fondo={GRIS} tam={24} op={E('domino', 0.5, 1)} />
      </Toma>

      {/* 3 · ClickFunnels y el criterio */}
      <Toma t={t} a={m('clickfunnels')} b={fin + 1} cy={470}>
        <Tarjeta x={110} y={190} w={980} h={200} c={c} id={ID} op={E('clickfunnels')} acento="#3f5368">
          <LogoCF x={130} y={105} s={0.62} gira={t * 2} isDark={isDark} />
          <Txt x={590} y={92} textAnchor="middle" fontSize={movil ? 28 : 28} fill={c.texto} peso={800}>{movil ? '«Embudos: la clave»' : '«Los embudos son la clave del éxito en línea'}</Txt>
          {!movil && <Txt x={590} y={138} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>y solo se obtienen con ClickFunnels»</Txt>}
        </Tarjeta>
        {t >= m('conviene') && <Sello x={movil ? 760 : 880} y={420} texto={movil ? 'Le conviene' : 'Conviene al autor'} u={sm(t, m('conviene'), m('conviene') + 0.6)} color={ROJO_M} tam={28} rot={-5} />}
        {t >= m('criterio') && (
          <g opacity={E('criterio')}>
            <rect x={120} y={730} width={960} height={10} rx={5} fill={c.apagado} />
            <Domino x={330} y={730} h={170} cae={sm(t, m('criterio') + 1, m('criterio') + 1.8)} color={VERDE} puntos={2} />
            <Pastilla x={360} y={800} texto={movil ? 'Verdadera: cae' : 'Frase verdadera: cae'} fondo={VERDE} tam={24} />
            <Visto x={250} y={520} r={30} op={sm(t, m('criterio') + 1.8, m('criterio') + 2.2)} />
          </g>
        )}
        {t >= m('mejora') && (
          <g opacity={E('mejora')}>
            <Domino x={860} y={730} h={170} cae={0.06 * Math.sin(t * 5)} color={GRIS} puntos={2} />
            <Pastilla x={860} y={800} texto={movil ? 'No cae' : 'No cae: es una mejora'} fondo={GRIS} tam={24} />
            <Cruz x={960} y={520} r={30} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
