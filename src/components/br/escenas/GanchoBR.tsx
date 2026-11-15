import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, PersonaCara, Libro, Regalo, Corazon, Sello, Engranaje, Burbuja, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Gancho, historia y oferta.
 * Toma 1: un teléfono con publicaciones que se desplazan; un anzuelo baja desde arriba y detiene una (el gancho).
 * Esa publicación se conecta con la historia (un corazón que late) y la historia con la oferta (un regalo con su botón).
 * Toma 2: Natalie Hodson cuenta su experiencia; las madres que se reconocen reaccionan con corazones y el libro digital
 * viaja hasta ellas mientras el contador llega a 120.000 compradoras.
 * Toma 3: el diagnóstico como tres engranajes que giran juntos; el de la oferta se atasca y tiembla, y al mejorarlo
 * vuelve a girar. Sello: una hipótesis de práctica.
 */

const ID = 'br17', P = 'br-gancho';

export const GanchoBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('tres'), 'Tres piezas'], [m('gancho'), 'El gancho detiene'], [m('historia'), 'La historia conecta'], [m('oferta'), 'La oferta'],
    [m('natalie'), 'Natalie Hodson'], [m('diagnostico'), 'Dónde falla'],
  ];
  const baja = sm(t, m('gancho') - 0.6, m('gancho') + 0.4);
  const scroll = t < m('gancho') + 0.2 ? (t * 110) % 150 : (m('gancho') * 110) % 150;
  const atasco = t >= m('mejora') - 3 && t < m('mejora') + 0.5;
  const arregla = sm(t, m('mejora') + 0.2, m('mejora') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Gancho, historia y oferta">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Las tres piezas conectadas */}
      <Toma t={t} a={0} b={m('natalie')} cy={470}>
        <g opacity={E('tres', 0.6, -0.4)}>
          <rect x={100} y={210} width={300} height={580} rx={40} fill="#1f2937" />
          <rect x={118} y={240} width={264} height={520} rx={22} fill={c.panel2} />
          <clipPath id={`${ID}-pan`}><rect x={118} y={240} width={264} height={520} rx={22} /></clipPath>
          <g clipPath={`url(#${ID}-pan)`}>
            {Array.from({ length: 6 }, (_, k) => {
              const y = 250 + k * 150 - scroll - 40;
              const elegida = k === 2 && baja > 0.9;
              return (
                <g key={k}>
                  <rect x={136} y={y} width={228} height={130} rx={16} fill={elegida ? NARANJA : [GRIS, AZUL_M, ROSA, VIOLETA, TEAL, GRIS][k]} opacity={elegida ? 1 : 0.45} />
                  <circle cx={164} cy={y + 28} r={14} fill="#fff" opacity={0.8} /><rect x={186} y={y + 20} width={120} height={12} rx={6} fill="#fff" opacity={0.7} /><rect x={150} y={y + 60} width={200} height={50} rx={8} fill="#fff" opacity={0.35} />
                </g>
              );
            })}
          </g>
        </g>
        {t >= m('gancho') - 0.6 && (
          <g>
            <path d={`M 250 120 V ${lerp(120, 330, baja)}`} stroke={c.texto} strokeWidth={4} />
            <path d={`M 250 ${lerp(120, 330, baja)} v 30 q 0 26 -22 26 q -16 0 -16 -16`} stroke={c.texto} strokeWidth={7} fill="none" strokeLinecap="round" />
            <Pastilla x={250} y={820} texto={movil ? 'Gancho' : 'Gancho: detiene'} fondo={NARANJA} tam={24} op={E('gancho')} />
          </g>
        )}
        <Conector x1={400} y1={420} x2={520} y2={420} u={E('historia', 0.4, -0.3)} t={t} color={ROSA} />
        <Tarjeta x={520} y={260} w={260} h={330} titulo="Historia" c={c} id={ID} op={E('historia')} acento={ROSA}>
          <Corazon x={130} y={170} s={1.8 + 0.12 * Math.sin(t * 6)} color={ROSA} />
          <Txt x={130} y={290} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>{movil ? 'Deseo' : 'Deseo y conexión'}</Txt>
        </Tarjeta>
        <Conector x1={780} y1={420} x2={860} y2={420} u={E('oferta', 0.4, -0.3)} t={t} color={VERDE} />
        <Tarjeta x={860} y={260} w={260} h={330} titulo="Oferta" c={c} id={ID} op={E('oferta')} acento={VERDE}>
          <Regalo x={130} y={175} s={1} color={VERDE} />
          <rect x={50} y={240} width={160} height={50} rx={25} fill={VERDE} />
          <Txt x={130} y={274} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>Recibir</Txt>
        </Tarjeta>
      </Toma>

      {/* 2 · Natalie Hodson */}
      <Toma t={t} a={m('natalie')} b={m('diagnostico')} cy={470}>
        <g opacity={E('natalie')}>
          <Persona id={ID} x={200} y={640} s={0.95} cuerpo={ROSA} pelo="#7c2d12" />
          <Pastilla x={200} y={700} texto="Natalie Hodson" fondo={ROSA} tam={24} />
          <Burbuja x={150} y={420} w={movil ? 330 : 380} texto="«Me pasó algo incómodo…»" u={sm(t, m('natalie') + 0.5, m('natalie') + 1.8)} c={c} id={ID} tam={24} />
        </g>
        {t >= m('madres') && (
          <g opacity={E('madres')}>
            {[0, 1, 2, 3, 4].map((k) => { const x = 560 + k * 110; return <g key={k}><PersonaCara id={ID} x={x} y={720} s={0.55} cuerpo={[VIOLETA, AZUL_M, AMBAR, TEAL, NARANJA][k]} pelo={k % 2 ? '#7c2d12' : '#2b1a12'} e={1} /></g>; })}
            {[0, 1, 2].map((k) => { const p = (t * 0.7 + k / 3) % 1; return <Corazon key={k} x={620 + k * 160} y={560 - p * 90} s={0.6} color={ROSA} op={Math.sin(Math.PI * p)} />; })}
            <Pastilla x={780} y={790} texto={movil ? '«Me pasó a mí»' : 'Muchas madres se reconocían'} fondo={VIOLETA} tam={24} />
          </g>
        )}
        {t >= m('libro') && <Libro x={500} y={400} color={VERDE} titulo="E-book" autor="" s={0.6} c={c} op={E('libro')} />}
        {t >= m('libro') && [0, 1, 2, 3, 4].map((k) => { const p = ((t - m('libro')) * 0.6 + k / 5) % 1; return <rect key={k} x={lerp(500, 560 + k * 110, p) - 10} y={lerp(300, 520, p)} width={20} height={26} rx={3} fill={VERDE} opacity={Math.sin(Math.PI * p)} />; })}
        {t >= m('ventas') && <g opacity={E('ventas')}><Cifra x={890} y={300} valor={120000} u={sm(t, m('ventas'), m('ventas') + 1.4)} pre="+" tam={56} color={VERDE} miles /><Txt x={890} y={342} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>compradoras</Txt></g>}
      </Toma>

      {/* 3 · El diagnóstico */}
      <Toma t={t} a={m('diagnostico')} b={fin + 1} cy={470}>
        {(['Gancho', 'Historia', 'Oferta'] as const).map((txt, k) => {
          const x = 330 + k * 270;
          const falla = k === 2 && atasco && arregla < 0.5;
          const col = k === 2 ? (arregla > 0.5 ? VERDE : falla ? AMBAR : VERDE) : [NARANJA, ROSA][k];
          const giro = falla ? 4 * Math.sin(t * 30) / 60 : t * (k % 2 ? -1 : 1) * 0.8;
          return (
            <g key={txt} opacity={E('diagnostico', 0.6, k * 0.3)}>
              <Engranaje x={x + (falla ? 3 * Math.sin(t * 40) : 0)} y={430} r={100} t={giro} color={col} hueco={c.panel} />
              <Txt x={x} y={620} textAnchor="middle" fontSize={30} fill={c.texto} peso={800}>{txt}</Txt>
            </g>
          );
        })}
        {atasco && arregla < 0.5 && <Pastilla x={870} y={250} texto={movil ? 'Se atasca' : 'Si no basta…'} fondo={AMBAR} tam={24} />}
        <Pastilla x={870} y={690} texto={movil ? 'Mejor oferta' : 'Se mejora la oferta'} fondo={VERDE} tam={26} op={E('mejora')} />
        {t >= m('hipotesis') && <Sello x={420} y={760} texto={movil ? 'Hipótesis' : 'Hipótesis de práctica'} u={sm(t, m('hipotesis'), m('hipotesis') + 0.6)} color={GRIS} tam={26} rot={-3} />}
      </Toma>
    </Lienzo>
  );
};
