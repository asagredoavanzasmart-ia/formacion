import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Burbuja, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Activación y marca.
 * Toma 1: Binet y Field: un archivo de cerca de mil casos del que salen dos curvas: la activación (picos que suben y
 * caen) y la marca (una línea que crece despacio); al lado, dos barras apiladas con el reparto 60/40 y 46/54.
 * Toma 2: Dawes: una multitud de veinte personas; solo una está comprando hoy (5 %) y el anzuelo del embudo la pesca;
 * las otras diecinueve llevan una burbuja de recuerdo: la disponibilidad mental de Byron Sharp.
 */

const ID = 'br24', P = 'br-marca';

export const MarcaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('binet'), 'Binet y Field'], [m('dos'), 'Dos mecánicas'], [m('sesenta'), 'Cómo repartir'],
    [m('dawes'), 'John Dawes (2021)'], [m('pesca'), 'El 5 % y el 95 %'], [m('justos'), 'Para ser justos'],
  ];
  const act = sm(t, m('activacion'), m('activacion') + 2);
  const mar = sm(t, m('marca'), m('marca') + 2);
  const picos = Array.from({ length: 41 }, (_, k) => { const x = k / 40; const pico = Math.max(0, Math.sin(x * Math.PI * 8)) ** 6; return [120 + x * 560, 600 - 40 - 200 * pico] as const; });
  const curvaM = Array.from({ length: 41 }, (_, k) => { const x = k / 40; return [120 + x * 560, 600 - 20 - 230 * x * x] as const; });
  const recorte = (pts: readonly (readonly [number, number])[], u: number) => pts.slice(0, Math.max(2, Math.round(pts.length * u))).map(([x, y], k) => `${k ? 'L' : 'M'} ${x} ${y}`).join(' ');

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Activación y marca">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Dos mecánicas y el reparto */}
      <Toma t={t} a={0} b={m('dawes')} cy={470}>
        <g opacity={ventana(t, m('binet') - 0.3, m('dos') + 0.2)}>
          {Array.from({ length: 6 }, (_, k) => <rect key={k} x={300 + k * 18} y={320 - k * 14} width={300} height={200} rx={16} fill={[GRIS, AZUL_M, VIOLETA, GRIS, AZUL_M, VIOLETA][k]} opacity={0.5 + k * 0.08} />)}
          <Cifra x={540} y={640} valor={1000} u={sm(t, m('mil'), m('mil') + 1)} pre="≈ " suf=" casos" tam={48} color={AZUL_M} miles />
        </g>
        {t >= m('dos') && (
          <g opacity={e1(t, m('dos'))}>
            <rect x={100} y={240} width={600} height={400} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <rect x={120} y={580} width={560} height={4} rx={2} fill={c.apagado} />
            <Txt x={400} y={620} textAnchor="middle" fontSize={24} fill={c.tenue}>tiempo →</Txt>
            {t >= m('activacion') && <path d={recorte(picos, act)} stroke={NARANJA} strokeWidth={8} fill="none" strokeLinejoin="round" />}
            {t >= m('marca') && <path d={recorte(curvaM, mar)} stroke={VIOLETA} strokeWidth={8} fill="none" />}
            {t >= m('picos') && <Letrero x={260} y={290} texto="Activación: picos" fondo={NARANJA} id={ID} tam={24} op={e1(t, m('picos'))} />}
            {t >= m('marca') && <Letrero x={540} y={290} texto="Marca: memoria" fondo={VIOLETA} id={ID} tam={24} op={e1(t, m('marca') + 0.5)} />}
          </g>
        )}
        {t >= m('sesenta') && [0, 1].map((k) => {
          const x = k === 0 ? 820 : 1010, mk = k === 0 ? 60 : 46, n = k === 0 ? 'sesenta' : 'b2b';
          if (t < m(n)) return null;
          const u = sm(t, m(n), m(n) + 1);
          return (
            <g key={k} opacity={e1(t, m(n))}>
              <rect x={x - 60} y={240} width={120} height={400 * (mk / 100) * u} rx={10} fill={VIOLETA} />
              <rect x={x - 60} y={240 + 400 * (mk / 100) * u} width={120} height={400 * (1 - mk / 100) * u} rx={10} fill={NARANJA} />
              <Txt x={x} y={260 + 200 * (mk / 100)} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>{mk}</Txt>
              <Txt x={x} y={260 + 400 * (mk / 100) + 200 * (1 - mk / 100)} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>{100 - mk}</Txt>
              <Txt x={x} y={690} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>{k === 0 ? 'Consumo' : 'Empresas'}</Txt>
            </g>
          );
        })}
        {t >= m('b2b') && <Txt x={915} y={740} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={e1(t, m('b2b') + 0.4)}>marca / activación</Txt>}
      </Toma>

      {/* 2 · El 5 % y el 95 % */}
      <Toma t={t} a={m('dawes')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('dawes'))}>
          {Array.from({ length: 20 }, (_, k) => {
            const x = 200 + (k % 10) * 90, y = 470 + Math.floor(k / 10) * 190;
            const compra = k === 6;
            const enCinco = t >= m('cinco');
            return (
              <g key={k}>
                <Persona id={ID} x={x} y={y} s={0.42} cuerpo={compra && enCinco ? NARANJA : GRIS} />
                {!compra && t >= m('sharp') && <g opacity={e1(t, m('sharp') + (k % 5) * 0.12)}><circle cx={x + 26} cy={y - 104 + 4 * Math.sin(t * 2 + k)} r={18} fill="url(#br24-marca)" /><circle cx={x + 10} cy={y - 78} r={6} fill="url(#br24-marca)" /></g>}
              </g>
            );
          })}
          {t >= m('cinco') && <Letrero x={340} y={250} texto="≈ 5 % compra hoy" fondo={NARANJA} id={ID} tam={28} op={e1(t, m('cinco'))} />}
          {t >= m('pesca') && (
            <g opacity={e1(t, m('pesca'))}>
              <path d={`M 740 200 V ${lerp(220, 330, sm(t, m('pesca'), m('pesca') + 1))}`} stroke={c.texto} strokeWidth={4} />
              <path d={`M 740 ${lerp(220, 330, sm(t, m('pesca'), m('pesca') + 1))} q 0 24 -18 24`} stroke={c.texto} strokeWidth={6} fill="none" strokeLinecap="round" />
              <Letrero x={880} y={250} texto="95 %: recordarte" fondo={VIOLETA} id={ID} tam={28} />
            </g>
          )}
          {t >= m('sharp') && <Txt x={420} y={800} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={e1(t, m("sharp"))}>Disponibilidad mental (Sharp)</Txt>}
          {t >= m('justos') && <Sello x={960} y={760} texto={movil ? 'Algo de marca' : 'Lista: algo de marca'} u={sm(t, m("justos"), m("justos") + 0.6)} color={GRIS} tam={26} rot={-4} />}
        </g>
      </Toma>
    </Lienzo>
  );
};
