import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Corazon, Reloj, Persona, Sello, Balanza, Burbuja, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Emoción, lógica y miedo.
 * Toma 1: tres arcos en orden (emoción con un corazón, lógica con una balanza, miedo con un reloj). Del público de
 * diez personas, cinco cruzan el primer arco, tres el segundo y dos el tercero cuando se nombra cada proporción.
 * Toma 2: Ted Thomas en un escenario repite «¿cierto?» y el público responde con pequeños «sí»; a la derecha, el
 * ingreso por registrado sube de 9,45 a 16,50 dólares.
 */

const ID = 'br12', P = 'br-cierres';

export const CierresBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('tres'), 'Tres ángulos, en orden'], [m('estudio'), 'Su experiencia'], [m('tanteo'), 'Los cierres de tanteo'], [m('subio'), 'De 9,45 a 16,50'],
  ];
  const G: [string, string, string, string, number, number][] = [['emocion', 'Emoción', 'mitad', '≈ 50 %', 0, 5], ['logica', 'Lógica', 'treinta', '≈ 30 %', 5, 3], ['miedo', 'Miedo', 'veinte', '≈ 20 %', 8, 2]];
  const xs = [270, 600, 930];
  const destino = (k: number) => { const g = k < 5 ? 0 : k < 8 ? 1 : 2; const j = k - G[g][4]; return { g, x: xs[g] - (G[g][5] - 1) * 22 + j * 44 }; };
  const preguntaCiclo = ((t - m('tanteo')) % 2.2) / 2.2;
  const sube = sm(t, m('subio'), m('subio') + 1.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Emoción, lógica y miedo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Tres arcos */}
      <Toma t={t} a={0} b={m('tanteo')} cy={470}>
        {G.map(([n, txt, nP, pct], k) => {
          const u = E(n, 0.6);
          const x = xs[k], col = [ROSA, AZUL_M, AMBAR][k];
          return (
            <g key={n} opacity={Math.min(1, u)}>
              <path d={`M ${x - 130} 620 V 330 Q ${x - 130} 200 ${x} 200 Q ${x + 130} 200 ${x + 130} 330 V 620 H ${x + 96} V 330 Q ${x + 96} 236 ${x} 236 Q ${x - 96} 236 ${x - 96} 330 V 620 Z`} fill={col} />
              <Txt x={x} y={290} textAnchor="middle" fontSize={28} fill={col} peso={800}>{`${k + 1}. ${txt}`}</Txt>
              <g transform={`translate(${x} 400)`}>
                {k === 0 && <Corazon x={0} y={0} s={1.5 + 0.08 * Math.sin(t * 6)} color={ROSA} />}
                {k === 1 && <Balanza x={0} y={70} inc={6 * Math.sin(t * 1.5)} c={c} brazo={60} alto={110} color={AZUL_M} />}
                {k === 2 && <Reloj x={0} y={0} r={52} t={t} vel={4} aro={AMBAR} />}
              </g>
              <Pastilla x={x} y={680} texto={pct} fondo={col} tam={26} op={E(nP)} />
            </g>
          );
        })}
        {Array.from({ length: 10 }, (_, k) => {
          const d = destino(k);
          const u = sm(t, m(G[d.g][2]) + (k - G[d.g][4]) * 0.15, m(G[d.g][2]) + (k - G[d.g][4]) * 0.15 + 1.2);
          return <Persona key={k} id={ID} x={lerp(160 + k * 98, d.x, u)} y={lerp(790, 610, u)} s={0.38} cuerpo={u > 0.5 ? [ROSA, AZUL_M, AMBAR][d.g] : GRIS} />;
        })}
        {t >= m('estudio') && <Sello x={600} y={160} texto={movil ? 'Sin estudio' : 'Según Brunson, no un estudio'} u={sm(t, m('estudio'), m('estudio') + 0.6)} color={GRIS} tam={24} rot={-2} />}
      </Toma>

      {/* 2 · Ted Thomas */}
      <Toma t={t} a={m('tanteo')} b={fin + 1} cy={470}>
        <g opacity={E('tanteo')}>
          <rect x={80} y={520} width={420} height={40} rx={10} fill="#78350f" />
          <rect x={80} y={560} width={420} height={20} fill="#000" opacity={0.15} />
          <Persona id={ID} x={290} y={520} s={0.85} cuerpo={NARANJA} corbata />
          <Burbuja x={330} y={330} w={230} texto="«¿Cierto?»" u={sm(preguntaCiclo, 0, 0.3)} c={c} id={ID} tam={30} />
          {Array.from({ length: 6 }, (_, k) => {
            const x = 120 + (k % 3) * 140, y = 700 + Math.floor(k / 3) * 90;
            const si = sm(preguntaCiclo, 0.35 + k * 0.04, 0.5 + k * 0.04) * (1 - sm(preguntaCiclo, 0.85, 0.98));
            return <g key={k}><Cara id={ID} x={x} y={y + 4 * si} r={30} e={0.6} /><g opacity={si} transform={`translate(${x + 34} ${y - 34})`}><rect x={-26} y={-18} width={52} height={34} rx={12} fill={VERDE} /><Txt x={0} y={7} textAnchor="middle" fontSize={20} fill="#fff" peso={800}>Sí</Txt></g></g>;
          })}
        </g>
        <Pastilla x={290} y={612} texto="Ted Thomas" fondo={NARANJA} tam={24} op={E('thomas')} />
        <Tarjeta x={640} y={210} w={470} h={470} titulo={movil ? 'Por registrado' : 'Ingreso por registrado'} c={c} id={ID} op={E('subio', 0.6, -0.4)} acento={VERDE}>
          <rect x={60} y={390} width={350} height={5} rx={2} fill={c.apagado} />
          <rect x={90} y={390 - 160} width={120} height={160} rx={12} fill={GRIS} />
          <rect x={260} y={390 - 280 * sube} width={120} height={280 * sube} rx={12} fill={VERDE} />
          <Cifra x={150} y={215} valor={9.45} u={1} dec={2} pre="$" tam={34} color={c.texto} />
          <Cifra x={320} y={95 + 280 * (1 - sube)} valor={16.5} u={sube} dec={2} pre="$" tam={34} color={VERDE} />
          <Txt x={150} y={430} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>Antes</Txt>
          <Txt x={320} y={430} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>Después</Txt>
        </Tarjeta>
        <Pastilla x={875} y={760} texto={movil ? 'Con empresas: después' : 'Con empresas: lo veremos más adelante'} fondo={VIOLETA} tam={24} op={E('adelante')} />
      </Toma>
    </Lienzo>
  );
};
