import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Edificio, Telefono, Barra, Sello, Pin, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El sueño cien.
 * Toma 1: Chet Holmes frente a una cuadrícula de dos mil anunciantes; 167 se encienden y concentran el 95 % del gasto
 * (barra). Paquetes y llamadas cada quince días; cuatro meses de silencio y llega Xerox; el ranking sube del 15.º al 1.º.
 * Toma 2: la versión de Brunson: los clientes ya están reunidos alrededor de quien los reunió (constelaciones con un
 * referente al centro) y de búsquedas; un mapa con 185 fuentes. El pozo que se cava antes de tener sed.
 */

const ID = 'br14', P = 'br-sueno';

export const SuenoBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('holmes'), 'Chet Holmes'], [m('ciento'), '167 de 2.000'], [m('paquete'), 'Constancia'], [m('xerox'), 'Del último al primero'],
    [m('reunidos'), 'Ya están reunidos'], [m('pozo'), 'Antes de tener sed'],
  ];
  const sel = sm(t, m('ciento'), m('ciento') + 1);
  const rank = t >= m('primero') ? lerp(15, 1, sm(t, m('primero'), m('primero') + 1)) : 15;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El sueño cien">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Holmes */}
      <Toma t={t} a={0} b={m('reunidos')} cy={470}>
        <g opacity={e1(t, m('holmes') - 0.3)}>
          <Persona id={ID} x={170} y={640} s={0.75} cuerpo={NARANJA} corbata />
          <Letrero x={170} y={720} texto="Chet Holmes" fondo={NARANJA} id={ID} tam={26} />
          {t >= m('ultimo') && <Cifra x={170} y={330} valor={Math.round(rank)} u={1} pre="#" tam={72} color={rank < 2 ? VERDE : ROJO_M} />}
          {t >= m('ultimo') && <Txt x={170} y={380} textAnchor="middle" fontSize={24} fill={c.tenue}>de 15 revistas</Txt>}
        </g>
        {t >= m('dosmil') - 0.2 && (
          <g opacity={e1(t, m('dosmil') - 0.2)}>
            <rect x={320} y={190} width={520} height={480} rx={26} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            {Array.from({ length: 200 }, (_, k) => {
              const i = k % 20, j = Math.floor(k / 20);
              const top = k % 12 === 0;
              return <rect key={k} x={346 + i * 24} y={220 + j * 34} width={18} height={24} rx={4} fill={top && sel > 0.2 ? AMBAR : c.apagado} opacity={top ? 1 : lerp(1, 0.4, sel)} />;
            })}
            <Txt x={580} y={630} textAnchor="middle" fontSize={26} fill={c.tenue}>2.000 anunciantes</Txt>
          </g>
        )}
        {t >= m('noventa') - 0.2 && (
          <g opacity={e1(t, m('noventa') - 0.2)}>
            <rect x={900} y={190} width={220} height={480} rx={26} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <rect x={950} y={230} width={120} height={400} rx={14} fill={c.apagado} />
            <rect x={950} y={230 + 400 * (1 - 0.95 * sm(t, m('noventa'), m('noventa') + 1))} width={120} height={400 * 0.95 * sm(t, m('noventa'), m('noventa') + 1)} rx={14} fill={AMBAR} />
            <Txt x={1010} y={660} textAnchor="middle" fontSize={30} fill={c.texto} peso={800}>95 %</Txt>
            <Letrero x={1010} y={730} texto="167 = 95 % del gasto" fondo={AMBAR} id={ID} tam={24} />
          </g>
        )}
        {t >= m('paquete') && (
          <g opacity={ventana(t, m('paquete'), m('xerox'))}>
            <rect x={340} y={690} width={480} height={110} rx={20} fill={c.panel2} />
            {Array.from({ length: 8 }, (_, k) => <g key={k}><rect x={360 + k * 56} y={712} width={40} height={30} rx={6} fill={k % 2 ? AZUL_M : NARANJA} opacity={k <= ((t - m('paquete')) * 3) % 8 ? 1 : 0.25} /></g>)}
            <Txt x={580} y={784} textAnchor="middle" fontSize={24} fill={c.tenue}>Paquete y llamada cada 15 días</Txt>
          </g>
        )}
        {t >= m('xerox') && <Sello x={580} y={745} texto="Xerox: sí" u={sm(t, m('xerox'), m('xerox') + 0.6)} color={VERDE} tam={36} />}
      </Toma>

      {/* 2 · Ya están reunidos */}
      <Toma t={t} a={m('reunidos')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('reunidos'))}>
          {[[300, 430, ROSA, 'intereses'], [600, 330, VIOLETA, 'intereses'], [900, 450, AZUL_M, 'busqueda']].map(([x, y, col, n], k) => {
            const on = t >= m(n as string) - 0.1 || k === 0 ? 1 : 0.2;
            return (
              <g key={k} opacity={on}>
                {Array.from({ length: 8 }, (_, j) => { const a = (j / 8) * Math.PI * 2 + t * 0.3 * (k % 2 ? -1 : 1); return <circle key={j} cx={(x as number) + 130 * Math.cos(a)} cy={(y as number) + 100 * Math.sin(a)} r={16} fill="#f7c4a0" />; })}
                {k < 2 ? <Persona id={ID} x={x as number} y={(y as number) + 50} s={0.45} cuerpo={col as string} /> : (
                  <g><rect x={(x as number) - 90} y={(y as number) - 26} width={180} height={52} rx={26} fill="#fff" style={sombra(0.2, 2, 6)} /><Txt x={x as number} y={(y as number) + 9} textAnchor="middle" fontSize={24} fill={GRIS} peso={700}>buscador…</Txt></g>
                )}
              </g>
            );
          })}
          {t >= m('intereses') && <Letrero x={450} y={640} texto="Por intereses" fondo={VIOLETA} id={ID} tam={28} op={e1(t, m('intereses'))} />}
          {t >= m('busqueda') && <Letrero x={900} y={640} texto="Por búsqueda" fondo={AZUL_M} id={ID} tam={28} op={e1(t, m('busqueda'))} />}
        </g>
        {t >= m('mapeo') && <Letrero x={600} y={190} texto="185 fuentes · 30 millones" fondo={NARANJA} id={ID} tam={30} op={e1(t, m('mapeo'))} />}
        {t >= m('pozo') && (
          <g opacity={e1(t, m('pozo'))}>
            <ellipse cx={600} cy={760} rx={110} ry={26} fill="#334155" />
            <ellipse cx={600} cy={760} rx={80} ry={16} fill={AZUL_M} opacity={0.6 + 0.2 * Math.sin(t * 3)} />
            <Letrero x={600} y={820} texto="Cavar el pozo antes de tener sed" fondo={TEAL} id={ID} tam={24} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
