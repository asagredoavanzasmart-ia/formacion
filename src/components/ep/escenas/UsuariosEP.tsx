import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Telefono, Hoja, Cruz, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Cuatro tipos de usuario y el abismo.
 * 1 · Cuatro mesetas de izquierda a derecha: innovadores (saltan a lo nuevo), primeros usuarios, primera mayoría (miran
 *     con recelo) y mayoría tardía. Entre la segunda y la tercera se abre un abismo y muchas personas caen.
 * 2 · El puente de la sencillez se tiende sobre el abismo; quien está del otro lado descarga y no hace nada.
 * 3 · Nadie lee nada: el manual, los mensajes y la guía de siete pasos se apilan sin abrir.
 */

const ID = 'ep21', P = 'ep-usuarios';
const GRUPOS = [{ k: 'innovadores', n: 'Innovadores', col: VIOLETA }, { k: 'primeros', n: 'Primeros usuarios', col: AZUL_M }, { k: 'mayoria', n: 'Primera mayoría', col: NARANJA }, { k: 'tardia', n: 'Mayoría tardía', col: GRIS }];

export const UsuariosEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('cuatro'), 'Cuatro categorías'], [m('abismo'), 'El abismo'], [m('puente'), 'Un solo puente'], [m('sencillez'), 'La sencillez'],
    [m('nada'), 'La mayoría no hace nada'], [m('nadie'), 'Nadie lee nada'],
  ];
  const abre = sm(t, m('abismo'), m('abismo') + 1.2);
  const puente = sm(t, m('sencillez'), m('sencillez') + 1.4);
  const X = [170, 410, 790, 1030];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Cuatro tipos de usuario y el abismo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 y 2 · las mesetas, el abismo y el puente */}
      <Toma t={t} a={0} b={m('nadie')} cy={470}>
        {/* terreno izquierdo y derecho; el abismo se abre entre ambos */}
        <rect x={40} y={600} width={lerp(560, 480, abre)} height={240} rx={20} fill={isDark ? '#3f3f46' : '#d6d3d1'} />
        <rect x={lerp(600, 680, abre)} y={600} width={lerp(560, 480, abre)} height={240} rx={20} fill={isDark ? '#3f3f46' : '#d6d3d1'} />
        {abre > 0.05 && <rect x={lerp(600, 520, abre)} y={600} width={160 * abre} height={260} fill={isDark ? '#0b0b0b' : '#1f2937'} opacity={0.6} />}
        {GRUPOS.map((g, k) => t >= m(g.k) && (
          <g key={g.k} opacity={e1(t, m(g.k))}>
            {[0, 1, 2].map((j) => <Persona key={j} id={ID} x={X[k] - 50 + j * 50} y={600 - (k === 0 ? 30 * Math.abs(Math.sin(t * 3 + j)) : 0)} s={0.38} cuerpo={g.col} ojos={k === 2 && t < m('sencillez') ? 0.5 : 1} />)}
            <Txt f="a" x={X[k]} y={660} textAnchor="middle" fontSize={24} fill={c.texto}>{g.n}</Txt>
          </g>
        ))}
        {t >= m('lema') && t < m('tardia') && <Letrero x={790} y={400} texto="«No causar problemas»" fondo={NARANJA} id={ID} op={e1(t, m('lema'))} tam={24} />}
        {t >= m('cae') && t < m('puente') && [0, 1, 2].map((k) => { const ph = ((t - m('cae')) * 0.6 + k / 3) % 1; return <circle key={k} cx={600 + (k - 1) * 30} cy={590 + 260 * ph} r={14} fill={AZUL_M} opacity={1 - ph} />; })}
        {t >= m('planetas') && t < m('puente') && <Letrero x={600} y={300} texto="Como de planetas distintos" fondo={GRIS} id={ID} op={e1(t, m('planetas'))} tam={26} />}
        {puente > 0.01 && <g>
          <rect x={480} y={584} width={240 * puente} height={20} rx={8} fill={`url(#${ID}-marcaH)`} />
          {Array.from({ length: 6 }, (_, k) => k / 6 < puente && <rect key={k} x={490 + k * 40} y={604} width={10} height={30} fill={NARANJA} />)}
          <Letrero x={600} y={520} texto="Sencillez" id={ID} op={e1(t, m('sencillez') + 0.6)} />
          {[0, 1].map((k) => { const ph = ((t - m('sencillez')) * 0.4 + k / 2) % 1; return <Persona key={k} id={ID} x={lerp(470, 740, ph)} y={584} s={0.3} cuerpo={AZUL_M} />; })}
        </g>}
        {t >= m('nada') && <g opacity={e1(t, m('nada'))}><Telefono x={1060} y={300} s={0.45} widgets={1} /><Txt f="a" x={1060} y={420} textAnchor="middle" fontSize={24} fill={c.tenue}>…y nada</Txt></g>}
        {t >= m('telmap') && <Letrero x={300} y={300} texto="Telmap: 3 días sin abrirla" fondo={GRIS} id={ID} op={e1(t, m('telmap'))} tam={24} />}
      </Toma>

      {/* 3 · nadie lee nada */}
      <Toma t={t} a={m('nadie')} b={fin + 1} cy={470}>
        {['Manual', 'Mensajes', 'Guía de 7 pasos'].map((n, k) => (
          <g key={n} opacity={e1(t, m('nadie') + 0.4 * k)} transform={`translate(${300 + k * 300} 420)`}>
            <Hoja x={0} y={0} w={180} h={230} rot={-6 + 6 * k} lineas={6} />
            <Cruz x={70} y={-110} r={26} />
            <Txt f="a" x={0} y={170} textAnchor="middle" fontSize={28} fill={c.texto}>{n}</Txt>
          </g>
        ))}
        <Letrero x={600} y={760} texto="Nadie lee nada" id={ID} op={e1(t, m('nadie') + 1.2)} />
      </Toma>
    </Lienzo>
  );
};
