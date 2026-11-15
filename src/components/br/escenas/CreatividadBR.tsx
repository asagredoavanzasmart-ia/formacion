import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, Telefono, Libro, Frasco, Moneda3D, Billete, Tarjeta, Conector, Pastilla, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Más ganchos, más alcance.
 * Toma 1: Graziosi y Brunson, cada uno con su pila semanal de libros (5.000 contra 1.200); al comparar sus cuentas, el
 * panel de Graziosi tiene cuatro veces más anuncios y crece con los que graba cada día con su teléfono.
 * Toma 2: el tráfico frío es un océano de peces de colores distintos (motivos). Desde un bote, un solo anzuelo de un
 * color atrae a pocos y se agota; luego cuatro anzuelos de colores distintos pescan en todo el océano.
 * Toma 3: la regla 80/20: ocho de diez monedas van a la audiencia fría y traen poco, pero llenan el frasco de los grupos
 * a los que se volverá a hablar; el ensayo de 100 dólares devuelve 223.
 */

const ID = 'br18', P = 'br-creatividad';

const Pez: React.FC<{ x: number; y: number; color: string; s?: number; dir?: number; op?: number }> = ({ x, y, color, s = 1, dir = 1, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s * dir} ${s})`} opacity={op}>
    <path d="M -34 0 Q -10 -22 22 -8 L 38 -20 L 34 0 L 38 20 L 22 8 Q -10 22 -34 0 Z" fill={color} />
    <circle cx={-18} cy={-4} r={3.5} fill="#1f2937" />
  </g>
);

export const CreatividadBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('graziosi'), 'Graziosi y Brunson'], [m('cuatro'), 'Cuatro veces más anuncios'], [m('oceano'), 'Un océano de motivos'],
    [m('ochenta'), 'La regla 80/20'], [m('ensayo'), 'Un ensayo de 100 dólares'],
  ];
  const anuncios = (base: number, extra: number) => Math.min(20, Math.round(base + extra));
  const nuevosG = t >= m('telefono') ? Math.floor((t - m('telefono')) * 1.2) : 0;
  const COLS = [NARANJA, AZUL_M, VERDE, VIOLETA];
  const muchos = t >= m('agota');
  const pesca = (k: number) => sm(t, m(muchos ? 'agota' : 'oceano') + 1 + (k % 4) * 0.3, m(muchos ? 'agota' : 'oceano') + 2 + (k % 4) * 0.3);
  const monedas = sm(t, m('ochenta'), m('ochenta') + 2);
  const llena = sm(t, m('llenan'), m('llenan') + 2.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Más ganchos, más alcance">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Las cuentas */}
      <Toma t={t} a={0} b={m('oceano')} cy={470}>
        {[0, 1].map((k) => {
          const x = k === 0 ? 300 : 900, col = k === 0 ? VIOLETA : NARANJA;
          const n = k === 0 ? 10 : 3;
          const u = E(k === 0 ? 'graziosi' : 'mil', 0.6);
          return (
            <g key={k} opacity={Math.min(1, u)}>
              <Persona id={ID} x={x - 150} y={760} s={0.7} cuerpo={col} corbata={k === 0} />
              <Pastilla x={x - 150} y={810} texto={k === 0 ? 'Graziosi' : 'Brunson'} fondo={col} tam={22} />
              {Array.from({ length: n }, (_, j) => <rect key={j} x={x - 80} y={740 - j * 22} width={90} height={20} rx={4} fill={col} opacity={0.75 + (j % 2) * 0.2} />)}
              <Cifra x={x - 35} y={740 - n * 22 - 20} valor={k === 0 ? 5000 : 1200} u={1} tam={34} color={col} miles />
              <Tarjeta x={x + 20} y={250} w={250} h={410} titulo={movil ? 'Anuncios' : 'Cuenta de anuncios'} c={c} id={ID} op={E('cuentas', 0.6, k * 0.3)} acento={col} tam={20}>
                {Array.from({ length: k === 0 ? anuncios(16, nuevosG) : 4 }, (_, j) => <rect key={j} x={22 + (j % 4) * 54} y={70 + Math.floor(j / 4) * 64} width={46} height={54} rx={8} fill={[NARANJA, ROSA, AZUL_M, VERDE, VIOLETA][j % 5]} opacity={j >= 16 ? sm(t, m('telefono') + (j - 16) / 1.2, m('telefono') + (j - 16) / 1.2 + 0.4) : 0.9} />)}
              </Tarjeta>
            </g>
          );
        })}
        <Pastilla x={600} y={220} texto="×4 creatividades" fondo={VERDE} tam={30} op={E('cuatro')} />
        {t >= m('telefono') && <g opacity={E('telefono')}><Telefono x={110} y={520} s={0.5} widgets={2} /><circle cx={128} cy={475} r={8} fill={ROJO_M} opacity={0.5 + 0.5 * Math.sin(t * 6)} /></g>}
      </Toma>

      {/* 2 · El océano */}
      <Toma t={t} a={m('oceano')} b={m('ochenta')} cy={470}>
        <path d={`M 60 420 ${Array.from({ length: 12 }, (_, k) => `Q ${105 + k * 90} ${410 + 12 * Math.sin(t * 2 + k)} ${150 + k * 90} 420`).join(' ')} V 820 H 60 Z`} fill={AZUL_M} opacity={0.2} />
        <g transform={`translate(600 ${380 + 6 * Math.sin(t * 2)})`}>
          <path d="M -170 0 H 170 L 130 50 H -130 Z" fill="#92400e" />
          <Persona id={ID} x={0} y={4} s={0.55} cuerpo={NARANJA} />
        </g>
        {(muchos ? [0, 1, 2, 3] : [0]).map((k) => {
          const hx = muchos ? 220 + k * 250 : 600;
          const tipX = muchos ? 480 + k * 80 : 640;
          return (
            <g key={k} opacity={k === 0 ? 1 : E('agota', 0.5, k * 0.2)}>
              <path d={`M 600 360 L ${tipX} 250`} stroke="#78350f" strokeWidth={5} />
              <path d={`M ${tipX} 250 Q ${(tipX + hx) / 2} 300 ${hx} 600`} stroke={c.texto} strokeWidth={2} fill="none" opacity={0.6} />
              <circle cx={hx} cy={610} r={11} fill={COLS[k]} />
            </g>
          );
        })}
        {Array.from({ length: 24 }, (_, k) => {
          const col = COLS[k % 4];
          const objetivo = muchos ? 220 + (k % 4) * 250 : 600;
          const atraido = (muchos || k % 4 === 0) && k < (muchos ? 16 : 3);
          const p = atraido ? pesca(k) : 0;
          const x0 = 110 + ((k * 137) % 980), y0 = 520 + ((k * 61) % 260);
          const x = lerp(x0 + 20 * Math.sin(t + k), objetivo + ((k * 13) % 30) - 15, p * 0.9);
          const y = lerp(y0, 640 + ((k * 7) % 30), p * 0.9);
          return <Pez key={k} x={x} y={y} color={col} s={0.9} dir={Math.sin(t * 0.5 + k) > 0 ? 1 : -1} op={E('oceano', 0.6, (k % 6) * 0.08)} />;
        })}
        <Pastilla x={600} y={200} texto={muchos ? 'Muchos ganchos, muchos motivos' : 'Un solo gancho se agota'} fondo={muchos ? VERDE : GRIS} tam={28} op={E('oceano')} />
      </Toma>

      {/* 3 · 80/20 y el ensayo */}
      <Toma t={t} a={m('ochenta')} b={fin + 1} cy={470}>
        <g opacity={E('ochenta')}>
          {/* El presupuesto, partido en 80 y 20: cada moneda cae de su tramo a su pila */}
          <rect x={90} y={210} width={560} height={54} rx={14} fill={c.apagado} />
          <rect x={90} y={210} width={448} height={54} rx={14} fill={AZUL_M} opacity={0.85} />
          <rect x={538} y={210} width={112} height={54} rx={14} fill={VERDE} opacity={0.85} />
          <Txt x={314} y={246} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>Presupuesto · 80 %</Txt>
          <Txt x={594} y={246} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>20 %</Txt>
          {Array.from({ length: 10 }, (_, k) => {
            const fria = k < 8;
            const p = sm(monedas, k * 0.07, k * 0.07 + 0.3);
            const x0 = fria ? 130 + k * 52 : 568 + (k - 8) * 52;
            const xF = fria ? 270 : 590, yF = 470 - (fria ? k : k - 8) * 14;
            if (p <= 0) return null;
            return p < 1
              ? <Moneda3D key={k} x={lerp(x0, xF, p)} y={lerp(280, yF, p * p)} r={18} giro={Math.cos(t * 6 + k)} />
              : <g key={k}><ellipse cx={xF} cy={yF + 4} rx={34} ry={10} fill="#d97706" /><ellipse cx={xF} cy={yF} rx={34} ry={10} fill="#fbbf24" /></g>;
          })}
          <Txt x={270} y={540} textAnchor="middle" fontSize={26} fill={AZUL_M} peso={800}>{movil ? 'Fría: 80 %' : 'Audiencia fría: 80 %'}</Txt>
          <Txt x={590} y={540} textAnchor="middle" fontSize={26} fill={VERDE} peso={800}>20 %</Txt>
          <Txt x={380} y={590} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>{movil ? '…trae 20 %' : 'y trae solo el 20 % de los resultados'}</Txt>
        </g>
        {t >= m('llenan') && (
          <g opacity={E('llenan')}>
            <Conector x1={300} y1={620} x2={300} y2={680} u={1} t={t} color={AZUL_M} puntos={2} />
            <Frasco x={300} y={830} w={160} h={140} v={0.15 + 0.7 * llena} t={t} c={c} color={AZUL_M} />
            <Txt x={420} y={780} fontSize={24} fill={c.texto} peso={800}>{movil ? 'Grupos' : 'Grupos para volver a hablar'}</Txt>
          </g>
        )}
        <Tarjeta x={700} y={200} w={420} h={560} titulo={movil ? 'Ensayo' : 'Ensayo de $100'} c={c} id={ID} op={E('ensayo')} acento={VERDE}>
          <Billete x={210} y={110} s={1} color={ROJO_M} />
          {([['7 × $7', 49], ['2 × $37', 74], ['1 × $100', 100]] as const).map(([txt, v], k) => (
            <g key={txt} opacity={sm(t, m('cien') + k * 0.6, m('cien') + k * 0.6 + 0.5)}>
              <rect x={30} y={190 + k * 80} width={360} height={60} rx={14} fill={c.panel2} />
              <Txt x={56} y={230 + k * 80} fontSize={28} fill={c.texto} peso={800}>{txt}</Txt>
              <Txt x={366} y={230 + k * 80} textAnchor="end" fontSize={28} fill={VERDE} peso={800}>+${v}</Txt>
            </g>
          ))}
          <rect x={30} y={440} width={360} height={4} rx={2} fill={c.apagado} />
          <Cifra x={210} y={515} valor={223} u={sm(t, m('total'), m('total') + 1)} pre="$" tam={60} color={VERDE} />
        </Tarjeta>
      </Toma>
    </Lienzo>
  );
};
