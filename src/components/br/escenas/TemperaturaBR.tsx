import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Termometro, Sobre, Hoja, Flecha, Sello, Embudo, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La temperatura del tráfico.
 * Toma 1: tres termómetros (frío, cálido, caliente) con una persona delante de cada uno y lo que sabe; entre el anuncio y
 * la oferta se tiende un puente que se alarga cuanto más frío es el tráfico.
 * Toma 2: el error de Brunson: 2,3 millones de correos van directo al embudo y rebotan (−30.000); luego el puente de los
 * otros anunciantes: artículo → boletín → oferta, con el reloj de una semana a tres meses.
 * Toma 3: Kelley (1950): la misma clase, dos descripciones previas («cálido» / «frío») y dos caras que la juzgan distinto.
 */

const ID = 'br06', P = 'br-temperatura';

export const TemperaturaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('schwartz'), 'Tres temperaturas'], [m('puente'), 'Un puente antes de la oferta'], [m('error'), 'El error de Brunson'],
    [m('otros'), 'El puente que funcionó'], [m('kelley'), 'Kelley, 1950'],
  ];
  const T3: [string, string, string, number, string][] = [['frio', 'Frío', AZUL_M, 0.22, 'El problema'], ['calido', 'Cálido', AMBAR, 0.55, 'La solución'], ['caliente', 'Caliente', ROJO_M, 0.92, 'A ti']];
  const largo = sm(t, m('largo'), m('largo') + 1.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La temperatura del tráfico">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Tres temperaturas y el puente */}
      <Toma t={t} a={0} b={m('error')} cy={470}>
        {T3.map(([n, txt, col, v, sabe], k) => {
          const on = t >= m(n) - 0.1 ? e1(t, m(n)) : t >= m('schwartz') ? 0.18 : 0;
          const x = 220 + k * 380;
          return (
            <g key={n} opacity={ventana(t, 0, m('puente')) * on + (t >= m('puente') ? 0 : 0)}>
              <Termometro x={x - 70} y={560} h={300} v={t >= m(n) ? v * sm(t, m(n), m(n) + 1) : 0} color={col} c={c} />
              <Persona id={ID} x={x + 60} y={600} s={0.6} cuerpo={col} />
              <Letrero x={x} y={680} texto={txt} fondo={col} id={ID} tam={30} />
              <Txt x={x} y={740} textAnchor="middle" fontSize={26} fill={c.tenue}>Conoce: {sabe.toLowerCase()}</Txt>
            </g>
          );
        })}
        {t >= m('puente') && (
          <g opacity={e1(t, m('puente'))}>
            {[0, 1, 2].map((k) => {
              const y = 300 + k * 170, col = [AZUL_M, AMBAR, ROJO_M][k];
              const w = [560, 330, 120][k] * (k === 0 ? lerp(0.45, 1, largo) : 1);
              return (
                <g key={k}>
                  <Letrero x={180} y={y} texto="Anuncio" fondo={GRIS} id={ID} tam={26} />
                  <rect x={270} y={y - 14} width={w} height={28} rx={14} fill={col} opacity={0.85} />
                  <Letrero x={290 + w + 90} y={y} texto="Oferta" fondo={col} id={ID} tam={26} />
                </g>
              );
            })}
            {t >= m('largo') && <Letrero x={1000} y={300} texto="Más frío, más largo" fondo={AZUL_M} id={ID} tam={26} op={e1(t, m('largo'))} />}
          </g>
        )}
      </Toma>

      {/* 2 · El error y el puente que funcionó */}
      <Toma t={t} a={m('error')} b={m('kelley')} cy={470}>
        <g opacity={ventana(t, m('error'), m('otros'))}>
          {Array.from({ length: 10 }, (_, k) => {
            const ph = ((t - m('error')) * 0.7 + k / 10) % 1;
            const rebota = ph > 0.55;
            const x = rebota ? lerp(760, 300, (ph - 0.55) / 0.45) : lerp(160, 760, ph / 0.55);
            const y = 380 + (k % 3) * 60 + (rebota ? -120 * Math.sin(((ph - 0.55) / 0.45) * Math.PI) : 0);
            return <Sobre key={k} x={x} y={y} s={0.45} color={rebota ? ROJO_M : AZUL_M} rot={rebota ? 20 : 0} />;
          })}
          <Embudo x={880} y={330} w={300} alto={60} tam={20} franjas={[{ n: 'Oferta', color: NARANJA }, { n: 'Pago', color: ROSA }]} />
          {t >= m('lista') && <Cifra x={300} y={270} valor={2300000} u={sm(t, m('lista'), m('lista') + 1)} tam={48} color={AZUL_M} miles />}
          {t >= m('perdio') && <Sello x={880} y={620} texto="−30.000" u={sm(t, m('perdio'), m('perdio') + 0.6)} tam={44} />}
          {t >= m('perdio') && <Letrero x={880} y={730} texto="Una docena de ventas" fondo={GRIS} id={ID} tam={26} op={e1(t, m('perdio') + 0.5)} />}
        </g>
        {t >= m('otros') && (
          <g opacity={e1(t, m('otros'))}>
            {([['articulo', 'Artículo', VIOLETA], ['boletin', 'Boletín', AZUL_M], ['otros', 'Oferta', NARANJA]] as const).map(([n, txt, col], k) => {
              const ok = k < 2 ? t >= m(n) - 0.1 : t >= m('boletin') + 0.8;
              return (
                <g key={txt} opacity={ok ? e1(t, k < 2 ? m(n) : m('boletin') + 0.8) : 0.15}>
                  <rect x={120 + k * 360} y={320} width={260} height={260} rx={28} fill={col} style={sombra(c.sombra, 4, 10)} />
                  {k === 0 && <Hoja x={250} y={450} s={1.1} />}
                  {k === 1 && <Sobre x={610} y={450} s={1.3} abre={1} color="#fff" />}
                  {k === 2 && <Txt x={970} y={470} textAnchor="middle" fontSize={64} fill="#fff" peso={800}>$</Txt>}
                  <Txt x={250 + k * 360} y={630} textAnchor="middle" fontSize={32} fill={c.texto} peso={800}>{txt}</Txt>
                  {k < 2 && <Flecha x1={390 + k * 360} y1={450} x2={470 + k * 360} y2={450} color={c.tenue} grosor={10} />}
                </g>
              );
            })}
            {t >= m('tardo') && <Letrero x={600} y={740} texto="Recupera en 1 semana a 3 meses" fondo={AMBAR} id={ID} tam={28} op={e1(t, m('tardo'))} />}
          </g>
        )}
      </Toma>

      {/* 3 · Kelley */}
      <Toma t={t} a={m('kelley')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('kelley'))}>
          <Persona id={ID} x={600} y={470} s={0.75} cuerpo={GRIS} corbata />
          <Txt x={600} y={530} textAnchor="middle" fontSize={26} fill={c.tenue}>La misma clase</Txt>
          {[0, 1].map((k) => {
            const calido = k === 0;
            const x = calido ? 260 : 940;
            const u = sm(t, m('calidofrio') + k * 0.4, m('calidofrio') + k * 0.4 + 0.8);
            return (
              <g key={k} opacity={t >= m('calidofrio') ? e1(t, m('calidofrio') + k * 0.4) : 0}>
                <Letrero x={x} y={260} texto={calido ? '«Es cálido»' : '«Es frío»'} fondo={calido ? AMBAR : AZUL_M} id={ID} tam={30} />
                <circle cx={x} cy={470} r={90} fill="#f7c4a0" />
                <circle cx={x - 30} cy={450} r={9} fill="#3b2a20" /><circle cx={x + 30} cy={450} r={9} fill="#3b2a20" />
                <path d={calido ? `M ${x - 40} ${500} Q ${x} ${500 + 34 * u} ${x + 40} 500` : `M ${x - 40} ${520} Q ${x} ${520 - 30 * u} ${x + 40} 520`} stroke="#3b2a20" strokeWidth={8} fill="none" strokeLinecap="round" />
                <Letrero x={x} y={640} texto={calido ? 'Lo evalúa mejor' : 'Lo evalúa peor'} fondo={calido ? VERDE : ROJO_M} id={ID} tam={26} op={u} />
              </g>
            );
          })}
        </g>
      </Toma>
    </Lienzo>
  );
};
