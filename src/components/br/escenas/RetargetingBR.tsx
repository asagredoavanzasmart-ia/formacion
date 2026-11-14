import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Embudo, Calendario, Persona, Gente, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Volver a hablarles.
 * Toma 1: el embudo del caso: cinco franjas que se estrechan (100.000 → 4.000 → 2.000 → 600 → 60) y, al costado, el
 * charco de 3.940 interesados que quedaron fuera.
 * Toma 2: tres cintas transportadoras (comprometidos 5 días, aterrizados 7 días, propios): cada cinta lleva sus figuras y
 * termina en lo que se les vende; al final, el ciclo emoción → lógica → miedo y el sello «se crean una vez».
 */

const ID = 'br19', P = 'br-retargeting';

export const RetargetingBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('forma'), 'Volver a hablarles'], [m('dosmil'), 'Un caso de 2.000 dólares'], [m('quedan'), 'Los que no actuaron'],
    [m('comprometidos'), 'Tres grupos'], [m('orden'), 'Emoción, lógica, miedo'],
  ];
  const F: [string, number, string, string][] = [['cienmil', 100000, 'Ven', GRIS], ['cuatro', 4000, 'Interactúan', AZUL_M], ['dos', 2000, 'Clic', VIOLETA], ['treinta', 600, 'Datos', ROSA], ['diez', 60, 'Compran', VERDE]];
  const G: [string, string, string, string, string][] = [['comprometidos', 'Comprometidos', 'cinco', '5 días', 'Vender el clic'], ['aterrizados', 'Aterrizados', 'siete', '7 días', 'Vender el registro'], ['propios', 'Propios', 'propios', 'Siempre', 'Siguiente escalón']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Volver a hablarles">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El embudo del caso */}
      <Toma t={t} a={0} b={m('comprometidos')} cy={470}>
        <g opacity={e1(t, m('dosmil') - 0.4)}>
          <Cifra x={1060} y={250} valor={2000} u={1} pre="$" tam={56} color={NARANJA} miles />
          <Txt x={1060} y={290} textAnchor="middle" fontSize={24} fill={c.tenue}>en anuncios</Txt>
          {F.map(([n, v, txt, col], k) => {
            const w0 = 620 - k * 110, y = 200 + k * 108;
            const on = t >= m(n) - 0.1;
            return (
              <g key={n} opacity={on ? e1(t, m(n)) : 0.1}>
                <path d={`M ${640 - w0 / 2} ${y} H ${640 + w0 / 2} L ${640 + (w0 - 110) / 2} ${y + 96} H ${640 - (w0 - 110) / 2} Z`} fill={col} />
                <Txt x={640} y={y + 60} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>{v.toLocaleString('es-CL')}</Txt>
                <Txt x={640 - w0 / 2 - 16} y={y + 58} textAnchor="end" fontSize={26} fill={c.texto} peso={800}>{txt}</Txt>
              </g>
            );
          })}
        </g>
        {t >= m('quedan') && (
          <g opacity={e1(t, m('quedan'))}>
            <ellipse cx={1000} cy={640} rx={150} ry={50} fill={AMBAR} opacity={0.3} />
            <Gente x={900} y={650} n={4} activos={4} color={AMBAR} paso={66} s={0.55} />
            <Cifra x={1000} y={520} valor={3940} u={sm(t, m('quedan'), m('quedan') + 1)} tam={52} color={AMBAR} miles />
            <Letrero x={1000} y={750} texto="Interesados sin actuar" fondo={AMBAR} id={ID} tam={24} />
          </g>
        )}
      </Toma>

      {/* 2 · Tres cintas */}
      <Toma t={t} a={m('comprometidos')} b={fin + 1} cy={470}>
        {G.map(([n, txt, nDias, dias, vende], k) => {
          const y = 270 + k * 180;
          const on = t >= m(n) - 0.1 ? e1(t, m(n)) : 0.15;
          return (
            <g key={n} opacity={on}>
              <rect x={260} y={y} width={620} height={40} rx={20} fill={c.apagado} />
              {Array.from({ length: 8 }, (_, j) => <rect key={j} x={280 + ((j * 80 + t * 60) % 600)} y={y + 14} width={30} height={12} rx={6} fill={c.panel2} />)}
              {[0, 1, 2].map((j) => { const ph = ((t * 0.25 + j / 3) % 1); return <g key={j} opacity={Math.sin(Math.PI * ph)}><Persona id={ID} x={300 + ph * 540} y={y} s={0.34} cuerpo={[AZUL_M, ROSA, VERDE][k]} /></g>; })}
              <Letrero x={150} y={y + 20} texto={movil ? txt.slice(0, 7) + '.' : txt} fondo={[AZUL_M, ROSA, VERDE][k]} id={ID} tam={24} />
              {t >= m(nDias) && <g opacity={e1(t, m(nDias))}><Calendario x={940} y={y + 20} s={0.5} marcados={k === 0 ? 5 : k === 1 ? 7 : 0} /><Txt x={1040} y={y + 30} fontSize={24} fill={c.tenue}>{dias}</Txt></g>}
              {t >= m(nDias) + 0.4 && <Txt x={570} y={y - 72} textAnchor="middle" fontSize={26} fill={c.texto} peso={800} opacity={e1(t, m(nDias) + 0.4)}>{vende}</Txt>}
            </g>
          );
        })}
        {t >= m('orden') && <Letrero x={600} y={790} texto="Emoción → lógica → miedo" fondo={VIOLETA} id={ID} tam={28} op={e1(t, m('orden'))} />}
        {t >= m('unavez') && <Sello x={1060} y={790} texto="Una vez" u={sm(t, m('unavez'), m('unavez') + 0.6)} color={GRIS} tam={30} rot={-6} />}
      </Toma>
    </Lienzo>
  );
};
