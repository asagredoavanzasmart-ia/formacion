import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Pin, Cruz, Visto, Flujo, Edificio, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Salir al mundo.
 * 1 · Tres puntos de partida: un país pequeño lanza flechas al mundo desde el primer día; Estados Unidos o China se quedan en
 *     casa; un país grande intermedio llega tarde.
 * 2 · Un tablero de mercados: se encienden los grandes y fáciles (Brasil, México, Italia, España, Turquía, Indonesia) y se
 *     marcan los difíciles (Estados Unidos, Japón, Reino Unido). Japón: casas numeradas por antigüedad.
 * 3 · Gente en terreno: un socio local unido por un puente que se puede soltar; la empresa conjunta, un nudo sin salida.
 *     Uber global frente a Lyft nacional.
 */

const ID = 'ep27', P = 'ep-global';
const FACILES = ['Brasil', 'México', 'Italia', 'España', 'Turquía', 'Indonesia'];
const DIFICILES = ['Estados Unidos', 'Japón', 'Reino Unido'];

export const GlobalEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('pequeno'), 'Desde dónde partes'], [m('obvios'), 'Los mejores mercados'], [m('faciles'), 'Grandes y fáciles'], [m('dificiles'), 'Los más difíciles'],
    [m('japon'), 'Japón'], [m('terreno'), 'Gente en terreno'], [m('uber'), 'Uber y Lyft'],
  ];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Salir al mundo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · desde dónde partes */}
      <Toma t={t} a={0} b={m('obvios')} cy={470}>
        <circle cx={600} cy={440} r={300} fill={isDark ? '#1e3a5f' : '#dbeafe'} opacity={e1(t, m('pequeno'))} />
        {t >= m('pequeno') && <g opacity={e1(t, m('pequeno'))}>
          <circle cx={420} cy={340} r={30} fill={NARANJA} />
          {[[700, 220], [820, 420], [640, 640], [380, 620]].map(([x, y], k) => <Flujo key={k} x1={420} y1={340} x2={x} y2={y} t={t + k * 0.3} n={4} vel={0.7} arco={40} color={NARANJA} op={sm(t, m('mundo'), m('mundo') + 0.6)} />)}
          <Letrero x={420} y={260} texto="País pequeño" fondo={NARANJA} id={ID} tam={24} />
        </g>}
        {t >= m('eeuu') && <g opacity={e1(t, m('eeuu'))}><circle cx={800} cy={480} r={110} fill={AZUL_M} opacity={0.7} /><circle cx={800} cy={480} r={14} fill="#fff" /><Letrero x={800} y={620} texto="EE. UU. o China: en casa" fondo={AZUL_M} id={ID} tam={24} /></g>}
        {t >= m('intermedios') && <g opacity={e1(t, m('intermedios'))}><circle cx={430} cy={560} r={70} fill={GRIS} /><Letrero x={430} y={680} texto="Grande intermedio: tarde" fondo={GRIS} id={ID} tam={24} /></g>}
      </Toma>

      {/* 2 · el tablero de mercados */}
      <Toma t={t} a={m('obvios')} b={m('terreno')} cy={470}>
        {t < m('japon') ? <g>
          {FACILES.map((n, k) => {
            const t0 = (k === 0 && t < m('mexico') ? m('brasil') : m('mexico') + 0.25 * k);
            const on = e1(t, Math.min(t0, m('faciles') + 0.25 * k));
            return <g key={n} opacity={0.3 + 0.7 * on} transform={`translate(${250 + (k % 3) * 250} ${280 + Math.floor(k / 3) * 150})`}>
              <rect x={-110} y={-50} width={220} height={100} rx={24} fill={on > 0.5 ? VERDE : c.apagado} />
              <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={28} fill="#fff">{n}</Txt>
            </g>;
          })}
          {DIFICILES.map((n, k) => t >= m('dificiles') && (
            <g key={n} opacity={e1(t, m('dificiles') + 0.3 * k)} transform={`translate(${250 + k * 250} 620)`}>
              <rect x={-110} y={-50} width={220} height={100} rx={24} fill="#e5484d" opacity={0.85} />
              <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={k === 0 ? 24 : 28} fill="#fff">{n}</Txt>
            </g>
          ))}
          {t >= m('faciles') && <Letrero x={1020} y={360} texto="Fáciles de ganar" fondo={VERDE} id={ID} op={e1(t, m('faciles'))} tam={24} />}
          {t >= m('dificiles') && <Letrero x={1020} y={620} texto="Difíciles y caros" fondo="#e5484d" id={ID} op={e1(t, m('dificiles'))} tam={24} />}
          {t >= m('reino') && <g opacity={e1(t, m('reino'))}><Cruz x={750} y={560} r={22} />{t >= m('exito') && <Visto x={250} y={225} r={22} />}{t >= m('exito') && <Visto x={500} y={225} r={22} />}</g>}
        </g> : <g>
          {[0, 1, 2, 3, 4, 5].map((k) => { const pos = [[420, 300], [760, 320], [300, 560], [620, 600], [880, 520], [520, 450]][k]; return <g key={k} transform={`translate(${pos[0]} ${pos[1]})`} opacity={e1(t, m('japon') + 0.2 * k)}>
            <path d="M -50 0 V -60 L 0 -96 L 50 -60 V 0 Z" fill="#94a3b8" /><rect x={-14} y={-36} width={28} height={36} fill="#64748b" />
            <circle cx={0} cy={-120} r={22} fill={NARANJA} /><Txt x={0} y={-112} textAnchor="middle" fontSize={22} fill="#fff">{[3, 1, 6, 2, 5, 4][k]}</Txt>
          </g>; })}
          {t >= m('antiguedad') && <Letrero x={600} y={760} texto="Numeradas por antigüedad, no por ubicación" fondo={GRIS} id={ID} op={e1(t, m('antiguedad'))} tam={24} />}
        </g>}
      </Toma>

      {/* 3 · gente en terreno; Uber y Lyft */}
      <Toma t={t} a={m('terreno')} b={fin + 1} cy={470}>
        {t < m('uber') ? <g>
          <Edificio x={260} y={600} w={160} h={220} color={NARANJA} />
          <Persona id={ID} x={940} y={600} s={0.7} cuerpo={VERDE} />
          <path d="M 360 470 Q 600 360 860 470" stroke={VERDE} strokeWidth={14} fill="none" strokeDasharray={600} strokeDashoffset={600 * (1 - sm(t, m('terreno'), m('terreno') + 1.4))} />
          <Letrero x={940} y={670} texto="Gerente de país o socio local" fondo={VERDE} id={ID} op={e1(t, m('terreno') + 0.8)} tam={22} />
          {t >= m('conjunta') && <g opacity={e1(t, m('conjunta'))}>
            <circle cx={560} cy={660} r={50} fill="none" stroke="#e5484d" strokeWidth={14} /><circle cx={630} cy={660} r={50} fill="none" stroke="#e5484d" strokeWidth={14} />
            <Cruz x={720} y={600} r={24} />
            <Letrero x={600} y={760} texto="Empresa conjunta: sin salida" fondo="#e5484d" id={ID} tam={22} />
          </g>}
        </g> : <g>
          <circle cx={360} cy={420} r={200} fill={isDark ? '#1e3a5f' : '#dbeafe'} />
          {[[280, 330], [440, 360], [330, 500], [470, 480], [250, 430]].map(([x, y], k) => <Pin key={k} x={x} y={y} s={0.8} color="#111827" op={e1(t, m('uber') + 0.2 * k)} />)}
          <Txt x={360} y={700} textAnchor="middle" fontSize={34} fill={c.texto}>Uber: global</Txt>
          <circle cx={860} cy={420} r={200} fill={isDark ? '#1e3a5f' : '#dbeafe'} />
          <Pin x={860} y={440} s={0.9} color="#ec4899" op={e1(t, m('uber') + 0.6)} />
          <Txt x={860} y={700} textAnchor="middle" fontSize={34} fill={c.texto}>Lyft: nacional</Txt>
          {t >= m('cinco') && <Letrero x={600} y={790} texto="Uber vale casi 5 veces más" id={ID} op={e1(t, m('cinco'))} />}
        </g>}
      </Toma>
    </Lienzo>
  );
};
