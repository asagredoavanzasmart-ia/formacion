import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Telefono, Libro, Regalo, Corazon, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Gancho, historia y oferta.
 * Toma 1: una caña de pescar sobre un río de publicaciones que se desplazan: el gancho detiene una; la historia la acerca
 * (corazón que late) y la oferta es la caja que se recibe al actuar.
 * Toma 2: Natalie Hodson: su historia incómoda con la que muchas madres se reconocen, el libro digital y el contador de
 * compradoras.
 * Toma 3: el diagnóstico: tres engranajes etiquetados; cuando uno falla se ilumina y la oferta es la palanca a mejorar.
 */

const ID = 'br17', P = 'br-gancho';

export const GanchoBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('tres'), 'Tres piezas'], [m('natalie'), 'Natalie Hodson'], [m('diagnostico'), 'Dónde falla'],
  ];
  const detiene = sm(t, m('gancho'), m('gancho') + 0.8);
  const scroll = (t * 120) % 180;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Gancho, historia y oferta">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Gancho, historia, oferta */}
      <Toma t={t} a={0} b={m('natalie')} cy={470}>
        <g opacity={e1(t, 0.3)}>
          <rect x={90} y={170} width={300} height={620} rx={34} fill="#1f2937" />
          <rect x={110} y={200} width={260} height={560} rx={20} fill={c.panel2} />
          <clipPath id={`${ID}-clip`}><rect x={110} y={200} width={260} height={560} rx={20} /></clipPath>
          <g clipPath={`url(#${ID}-clip)`}>
            {Array.from({ length: 5 }, (_, k) => {
              const y = 200 + k * 180 - (t < m('gancho') ? scroll : 0) - 60;
              const atrapada = k === 2 && detiene > 0;
              return <rect key={k} x={130} y={y} width={220} height={150} rx={16} fill={atrapada ? NARANJA : [GRIS, AZUL_M, ROSA, VIOLETA, TEAL][k]} opacity={atrapada ? 1 : 0.55} />;
            })}
          </g>
        </g>
        {t >= m('gancho') - 0.1 && (
          <g opacity={e1(t, m('gancho'))}>
            <path d={`M 400 380 Q 470 380 470 430 Q 470 470 430 470`} stroke={c.texto} strokeWidth={10} fill="none" strokeLinecap="round" />
            <path d="M 470 180 V 380" stroke={c.texto} strokeWidth={4} />
            <Letrero x={620} y={300} texto="Gancho: detiene" fondo={NARANJA} id={ID} tam={28} />
          </g>
        )}
        {t >= m('historia') - 0.1 && (
          <g opacity={e1(t, m('historia'))}>
            <Corazon x={640} y={470} s={1.2 + 0.08 * Math.sin(t * 6)} color={ROSA} />
            <Letrero x={830} y={470} texto="Historia: deseo" fondo={ROSA} id={ID} tam={28} />
          </g>
        )}
        {t >= m('oferta') - 0.1 && (
          <g opacity={e1(t, m('oferta'))}>
            <Regalo x={640} y={700} s={0.9} color={VERDE} />
            <Letrero x={850} y={650} texto="Oferta: lo que recibe" fondo={VERDE} id={ID} tam={28} />
          </g>
        )}
      </Toma>

      {/* 2 · Natalie Hodson */}
      <Toma t={t} a={m('natalie')} b={m('diagnostico')} cy={470}>
        <g opacity={e1(t, m('natalie'))}>
          <Persona id={ID} x={250} y={620} s={0.85} cuerpo={ROSA} pelo="#7c2d12" />
          <Letrero x={250} y={710} texto="Natalie Hodson" fondo={ROSA} id={ID} tam={26} />
        </g>
        {t >= m('madres') && (
          <g opacity={e1(t, m('madres'))}>
            {[0, 1, 2, 3, 4].map((k) => <Persona key={k} id={ID} x={470 + k * 70} y={640} s={0.42} cuerpo={[VIOLETA, AZUL_M, AMBAR, TEAL, NARANJA][k]} />)}
            <Letrero x={610} y={720} texto="«Me pasó a mí»" fondo={VIOLETA} id={ID} tam={26} />
          </g>
        )}
        {t >= m('libro') && <Libro x={930} y={560} color={VERDE} titulo="E-book" autor="" s={0.8} c={c} op={e1(t, m('libro'))} />}
        {t >= m('ventas') && <Cifra x={930} y={330} valor={120000} u={sm(t, m('ventas'), m('ventas') + 1.4)} tam={56} color={VERDE} pre="+" miles />}
        {t >= m('ventas') && <Txt x={930} y={370} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={e1(t, m('ventas'))}>compradoras</Txt>}
      </Toma>

      {/* 3 · Diagnóstico */}
      <Toma t={t} a={m('diagnostico')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('diagnostico'))}>
          {(['Gancho', 'Historia', 'Oferta'] as const).map((txt, k) => {
            const falla = k === 2 && t >= m('mejora');
            const x = 250 + k * 350;
            return (
              <g key={txt}>
                <g transform={`translate(${x} 420) rotate(${(t * 40 * (k % 2 ? -1 : 1)) % 360})`}>
                  {Array.from({ length: 8 }, (_, j) => <rect key={j} x={-18} y={-130} width={36} height={40} rx={8} fill={falla ? AMBAR : [NARANJA, ROSA, VERDE][k]} transform={`rotate(${j * 45})`} />)}
                  <circle r={100} fill={falla ? AMBAR : [NARANJA, ROSA, VERDE][k]} />
                  <circle r={34} fill={c.panel} />
                </g>
                <Txt x={x} y={610} textAnchor="middle" fontSize={32} fill={c.texto} peso={800}>{txt}</Txt>
              </g>
            );
          })}
          {t >= m('mejora') && <Letrero x={950} y={690} texto={movil ? 'Mejor oferta' : 'Si no basta: mejor oferta'} fondo={AMBAR} id={ID} tam={26} op={e1(t, m('mejora'))} />}
          {t >= m('hipotesis') && <Sello x={330} y={790} texto={movil ? 'Regla práctica' : 'Regla de práctica'} u={sm(t, m('hipotesis'), m('hipotesis') + 0.6)} color={GRIS} tam={28} />}
        </g>
      </Toma>
    </Lienzo>
  );
};
