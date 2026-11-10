import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Frasco, Engranaje, Megafono, EtiquetaPrecio, PilaMonedas, Flecha, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * La regla del tres a uno.
 * Toma 1: una balanza con la ganancia bruta de por vida a la izquierda y el costo de adquirir a la derecha; la marca
 * del tres a uno cuelga del fiel.
 * Toma 2: el ejemplo: una barra de 1.000 a la que se le corta el costo directo (100) → 900; cinco meses de 900 se apilan
 * hasta 4.500. Si se gastan más de 1.500 en conseguirlo, la balanza cae y el frasco de caja se vacía.
 * Toma 3: dos sistemas en orden: el engranaje de la oferta mueve al engranaje de la prospección.
 */

const ID = 'ad02', P = 'ad-tres-a-uno';

export const TresAUnoAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('relacion'), 'Una sola relación'], [m('tres'), 'Más de tres a uno'], [m('menos'), 'Ganancia bruta, no ingreso'], [m('ejemplo'), 'Un ejemplo'],
    [m('vida'), '4.500 de por vida'], [m('gastas'), 'Bajo el umbral'], [m('sistemas'), 'Dos sistemas, en orden'],
  ];
  // Balanza: peso izquierdo (ganancia) y derecho (costo). Inclinación positiva = gana la izquierda.
  const izq = sm(t, m('ganancia'), m('ganancia') + 1) * 3;
  const der = sm(t, m('costo'), m('costo') + 1) * 1;
  const ang = lerp(0, -10, Math.min(1, (izq - der) / 3)) + 1.5 * Math.sin(t * 2) * (izq > 0 ? 1 : 0);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La regla del tres a uno">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La balanza */}
      <Toma t={t} a={0} b={m('ejemplo')} cy={480}>
        <g opacity={e1(t, m('relacion'))}>
          <path d="M 560 760 H 640 L 620 470 H 580 Z" fill={isDark ? '#64748b' : '#94a3b8'} />
          <ellipse cx={600} cy={768} rx={140} ry={16} fill="#000" opacity={0.12} />
          <g transform={`rotate(${ang} 600 460)`}>
            <rect x={250} y={450} width={700} height={20} rx={10} fill={c.texto} />
            <circle cx={600} cy={460} r={20} fill={NARANJA} />
            {[[300, izq, VERDE, 'ganancia'], [900, der, ROJO_M, 'costo']].map(([x, w, col, n]) => (
              <g key={n as string} transform={`translate(${x as number} 470) rotate(${-ang})`}>
                <path d="M -110 140 L 0 0 L 110 140" stroke={c.tenue} strokeWidth={4} fill="none" />
                <path d="M -130 140 H 130 Q 120 180 0 184 Q -120 180 -130 140 Z" fill={c.apagado} />
                <PilaMonedas x={0} y={140} n={Math.round((w as number) * 4)} w={90} />
              </g>
            ))}
          </g>
          {t >= m('ganancia') && <Letrero x={300} y={760} texto="Ganancia de por vida" fondo={VERDE} id={ID} tam={26} op={e1(t, m('ganancia'))} />}
          {t >= m('costo') && <Letrero x={900} y={760} texto="Costo de adquirir" fondo={ROJO_M} id={ID} tam={26} op={e1(t, m('costo'))} />}
          {t >= m('tres') && (
            <g opacity={e1(t, m('tres'))} transform={`translate(600 ${300 + 10 * Math.sin(t * 2)})`}>
              <rect x={-120} y={-60} width={240} height={120} rx={30} fill={`url(#${ID}-marca)`} style={sombra(0.25, 4, 12)} />
              <Txt x={0} y={22} textAnchor="middle" fontSize={64} fill="#fff" peso={800}>&gt; 3 : 1</Txt>
            </g>
          )}
          {t >= m('menos') && (
            <g opacity={ventana(t, m('menos'), m('ejemplo'))}>
              <Letrero x={600} y={180} texto="Ingreso − costo de entregar" fondo={AZUL_M} id={ID} tam={30} />
            </g>
          )}
        </g>
      </Toma>

      {/* 2 · El ejemplo: 1.000 − 100 = 900, × 5 meses = 4.500; y el umbral de 1.500 */}
      <Toma t={t} a={m('ejemplo')} b={m('sistemas')} cy={470}>
        <g opacity={e1(t, m('ejemplo'))}>
          <EtiquetaPrecio x={110} y={220} texto="1.000 / mes" t={t} bal={1} />
          {[0, 1, 2, 3, 4].map((k) => {
            const on = k === 0 ? 1 : sm(t, m('cinco') + k * 0.25, m('cinco') + k * 0.25 + 0.5);
            const corte = sm(t, m('cien'), m('cien') + 0.8);
            const x = 160 + k * 120;
            const hT = 360, hC = 36 * corte;
            return (
              <g key={k} opacity={on}>
                <rect x={x} y={720 - hT} width={90} height={hT - (k === 0 ? 0 : hC)} rx={10} fill={VERDE} />
                {k === 0 && corte > 0.01 && <rect x={x + 30 * corte} y={720 - hT - 40 * corte} width={90} height={36} rx={8} fill={ROJO_M} opacity={1 - 0.4 * corte} transform={`rotate(${18 * corte} ${x + 45} ${720 - hT})`} />}
                {!movil && <Txt f="a" x={x + 45} y={760} textAnchor="middle" fontSize={22} fill={c.tenue}>Mes {k + 1}</Txt>}
              </g>
            );
          })}
          {t >= m('cien') && <Letrero x={205} y={300} texto="−100" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('cien') + 0.3)} />}
          {t >= m('novecientos') && <Cifra x={205} y={420} valor={900} u={sm(t, m('novecientos'), m('novecientos') + 0.8)} tam={44} color="#fff" />}
          {t >= m('vida') && (
            <g opacity={e1(t, m('vida'))}>
              <Flecha x1={780} y1={540} x2={860} y2={540} u={sm(t, m('vida'), m('vida') + 0.5)} color={c.texto} grosor={10} />
              <Cifra x={1000} y={560} valor={4500} u={sm(t, m('vida'), m('vida') + 1.2)} tam={78} color={VERDE} miles />
              <Letrero x={1000} y={620} texto="De por vida" fondo={VERDE} id={ID} tam={26} />
            </g>
          )}
        </g>
        {t >= m('gastas') && (
          <g opacity={e1(t, m('gastas'))}>
            <rect x={0} y={130} width={1200} height={730} fill={c.panel} opacity={0.97} />
            <Txt x={320} y={300} textAnchor="middle" fontSize={44} fill={c.texto} peso={800}>4.500 ÷ 3</Txt>
            <Cifra x={320} y={400} valor={1500} u={sm(t, m('gastas'), m('gastas') + 1)} tam={84} color={AMBAR} miles pre="= " />
            <Letrero x={320} y={480} texto="Máximo para adquirirlo" fondo={AMBAR} id={ID} tam={26} />
            <Frasco x={850} y={740} w={200} h={340} v={lerp(0.8, 0.12, sm(t, m('pobre'), m('pobre') + 2))} t={t} c={c} rojo={t >= m('pobre') + 1} />
            {[0, 1, 2].map((k) => { const ph = ((t - m('pobre')) * 0.7 + k / 3) % 1; return t >= m('pobre') ? <circle key={k} cx={850 + 90} cy={720 + 60 * ph} r={9} fill={ROJO_M} opacity={1 - ph} /> : null; })}
            {t >= m('pobre') && <Letrero x={850} y={340} texto="Cada cliente te empobrece" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('pobre') + 0.3)} />}
          </g>
        )}
      </Toma>

      {/* 3 · Dos sistemas en orden */}
      <Toma t={t} a={m('sistemas')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('oferta'))}>
          <Engranaje x={380} y={470} r={150} t={t * 0.6} color={NARANJA} hueco={c.panel} />
          <Txt x={380} y={488} textAnchor="middle" fontSize={56} fill="#fff" peso={800}>1</Txt>
          <Letrero x={380} y={690} texto="La oferta" id={ID} tam={32} />
          {!movil && <Txt f="a" x={380} y={250} textAnchor="middle" fontSize={26} fill={c.texto}>Efectivo en 30 días</Txt>}
        </g>
        {t >= m('motor') && (
          <g opacity={e1(t, m('motor'))}>
            <Engranaje x={690} y={470} r={130} t={-t * 0.6 * (150 / 130) * sm(t, m('motor'), m('motor') + 1)} color={AZUL_M} hueco={c.panel} />
            <Txt x={690} y={488} textAnchor="middle" fontSize={56} fill="#fff" peso={800}>2</Txt>
            <Letrero x={690} y={690} texto="La prospección" fondo={AZUL_M} id={ID} tam={32} />
            <Megafono x={930} y={470} s={0.9} habla={1} t={t} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
