import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Propuesta, Reloj, Cruz, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, AMBAR, GRIS } from './kitVC';
import { Auto } from '../../ep/escenas/kitEP';
import type { PropsCE } from './kitVC';

/**
 * La oferta irresistible (video de captación B2B).
 * 1 · El cliente posterga («lo hablo con mi socio», «me lo tengo que pensar»): problema de oferta, no de precio.
 *     Un árbol: las objeciones son las ramas (no confío en ti, en mí, en el sistema) y el tronco es el valor percibido;
 *     cuando el tronco engorda, las ramas caen solas. Los videos y casos viajan antes de la reunión.
 * 2 · El caso del Ferrari: un millón de euros por cien mil, con veinticuatro horas: rechazarla parece un error.
 */

const ID = 'vc15', P = 'vc-oferta';

export const OfertaVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('socio'), 'Objeciones que postergan'], [m('posicionamiento'), 'Problema de oferta'], [m('ramas'), 'Ramas y tronco'],
    [m('caen'), 'Se caen solas'], [m('ferrari'), 'El caso del Ferrari'], [m('error'), 'Rechazarla, un error'],
  ];
  const dichos: [number, string][] = [[m('socio'), '«Lo hablo con mi socio»'], [m('pensar'), '«Me lo tengo que pensar»'], [m('pensar') + 1.8, '«No es el momento»']];
  let dicho: [number, string] | null = null;
  for (const d of dichos) if (t >= d[0] && t < m('ramas')) dicho = d;
  const grosor = lerp(46, 120, sm(t, m('caen'), m('caen') + 1.5));
  const caida = (k: number) => sm(t, m('caen') + 0.4 + 0.3 * k, m('caen') + 1.6 + 0.3 * k);
  const RAMAS: [string, string, string, number, number][] = [['ti', 'No confío en ti', 'En ti', 560, 420], ['mi', 'No confío en mí', 'En mí', 760, 290], ['sistema', 'No confío en el sistema', 'En el sistema', 960, 420]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La oferta irresistible">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el árbol de las objeciones */}
      <Toma t={t} a={0} b={m('ferrari')} cy={470}>
        <Persona id={ID} x={170} y={760} s={0.85} cuerpo={AZUL_M} />
        {dicho && <Burbuja key={dicho[1]} x={40} y={170} w={movil ? 520 : 460} texto={dicho[1]} u={sm(t, dicho[0], dicho[0] + 1)} c={c} id={ID} tam={26} />}
        {t >= m('posicionamiento') && t < m('ramas') && <Letrero x={760} y={420} texto="Problema de oferta y posicionamiento" fondo={GRIS} id={ID} op={e1(t, m('posicionamiento'))} tam={24} />}
        {t >= m('precio') && t < m('ramas') && (
          <g opacity={e1(t, m('precio'))} transform="translate(760 600)">
            <path d="M -60 -50 H 20 L 64 0 L 20 50 H -60 Q -74 50 -74 36 V -36 Q -74 -50 -60 -50 Z" fill={AMBAR} /><circle cx={-40} cy={0} r={11} fill="#fff" />
            <Txt x={0} y={12} textAnchor="middle" fontSize={34} fill="#fff">$</Txt>
            <Cruz x={70} y={-60} r={28} />
          </g>
        )}
        {t >= m('ramas') && (
          <g opacity={e1(t, m('ramas'))}>
            <rect x={760 - grosor / 2} y={430} width={grosor} height={330} rx={16} fill="#8b5a2b" />
            {RAMAS.map(([a, , , x, y], k) => (
              <g key={a} opacity={1 - caida(k)} transform={`translate(0 ${300 * caida(k)}) rotate(${(k - 1) * 30 * caida(k)} ${x} ${y})`}>
                <path d={`M 760 ${k === 1 ? 440 : 520} Q ${(760 + x) / 2} ${y + 40} ${x} ${y}`} stroke="#8b5a2b" strokeWidth={22} fill="none" strokeLinecap="round" />
                <circle cx={x} cy={y} r={70} fill={VERDE} opacity={0.85} />
              </g>
            ))}
          </g>
        )}
        {RAMAS.map(([a, n, corto, x, y], k) => t >= m(a) && <Letrero key={a} x={x} y={y + (k === 1 ? -100 : 110)} texto={movil ? corto : n} fondo={ROSA} id={ID} op={e1(t, m(a)) * (1 - caida(k))} tam={22} />)}
        {t >= m('tronco') && <Letrero x={760} y={820} texto="El tronco: valor percibido" id={ID} op={e1(t, m('tronco'))} tam={26} />}
        {t >= m('antes') && [0, 1, 2].map((k) => { const u = sm(t, m('antes') + 0.6 * k, m('antes') + 1.6 + 0.6 * k); return <Propuesta key={k} x={lerp(1150, 280 + 40 * k, u)} y={lerp(250, 520 - 50 * k, u)} s={0.6} op={u > 0 ? 1 : 0} sello={[ROSA, NARANJA, VERDE][k]} />; })}
        {t >= m('antes') && <Letrero x={420} y={200} texto="Dudas resueltas antes de la reunión" fondo={VERDE} id={ID} op={e1(t, m('antes'))} tam={24} />}
      </Toma>

      {/* 2 · el Ferrari */}
      <Toma t={t} a={m('ferrari')} b={fin + 1} cy={470}>
        <Auto x={lerp(-200, 560, sm(t, m('ferrari'), m('ferrari') + 1.5))} y={720} s={2.3} color="#dc2626" giro={t * 300} />
        {t >= m('millon') && (
          <g opacity={e1(t, m('millon'))}>
            <Txt x={780} y={260} textAnchor="middle" fontSize={56} fill={c.tenue}>1.000.000 €</Txt>
            {t >= m('cien') && <line x1={600} y1={244} x2={960} y2={244} stroke={ROSA} strokeWidth={8} opacity={e1(t, m('cien'))} />}
          </g>
        )}
        {t >= m('cien') && <Txt x={780} y={370} textAnchor="middle" fontSize={72} fill={VERDE} opacity={e1(t, m('cien'))}>100.000 €</Txt>}
        {t >= m('horas') && <g opacity={e1(t, m('horas'))}><Reloj x={250} y={300} r={70} t={t * 3} aro={ROSA} /><Txt x={250} y={420} textAnchor="middle" fontSize={36} fill={ROSA}>24 h</Txt></g>}
        {t >= m('horas') + 2 && t < m('error') && <Letrero x={600} y={820} texto="No hay nada que pensar" fondo={VERDE} id={ID} op={e1(t, m('horas') + 2)} tam={26} />}
        {t >= m('error') && <Letrero x={600} y={820} texto="Tan buena que rechazarla parezca un error" id={ID} op={e1(t, m('error'))} tam={24} />}
      </Toma>
    </Lienzo>
  );
};
