import React from 'react';
import { useEscenaVC, Lienzo, Rotulo, Letrero, Txt, Edificio, Corazon, e1, tono, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Resultados y ganancias por perfil: dos columnas, la empresa (edificio, resultados) y la persona (corazón, ganancias).
 * Cada rol entra en su fila al nombrarse y llena primero su resultado y después su ganancia. Al final, la columna de
 * ganancias se tiñe de un color distinto por persona: son únicas.
 */

const ID = 'vc10', P = 'vc-perfiles';

export const PerfilesVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const rot: [number, string][] = [
    [m('resultados'), 'Resultados: la empresa'], [m('ganancias'), 'Ganancias: la persona'], [m('economico'), 'Comprador económico'],
    [m('usuario'), 'Comprador usuario'], [m('tecnico'), 'Comprador técnico'], [m('coach'), 'El coach'], [m('unicas'), 'Ganancias únicas'],
  ];
  const FILAS: [string, string, string, string, string, string][] = [
    ['economico', 'Económico', VERDE, 'costo', 'ROI y costo', 'visionario'],
    ['usuario', 'Usuario', AZUL_M, 'productividad', 'Productividad', 'familia'],
    ['tecnico', 'Técnico', VIOLETA, 'puntuales', 'Specs y plazos', 'reputacion'],
    ['coach', 'Coach', NARANJA, 'coach', 'Que tú cierres', 'reconocimiento'],
  ];
  const GAN = ['Visionario', 'Menos estrés', 'Reputación', 'Reconocimiento'];
  const unicas = t >= m('unicas');
  const chip = (x: number, y: number, w: number, txt: string, op: number, fill: string, color: string) => op > 0.01 && (
    <g opacity={op} transform={`translate(${x} ${y + (1 - op) * 10})`}>
      <rect x={-w / 2} y={-38} width={w} height={76} rx={38} fill={fill} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
      <Txt x={0} y={9} textAnchor="middle" fontSize={26} fill={color}>{txt}</Txt>
    </g>
  );

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Resultados y ganancias por perfil">
      <Rotulo t={t} lista={rot} id={ID} />
      <g opacity={e1(t, m('resultados'))}><Edificio x={470} y={210} w={56} h={84} color={AZUL_M} /><Txt x={530} y={196} fontSize={30} fill={c.texto}>Resultados</Txt></g>
      <g opacity={e1(t, m('ganancias'))}><Corazon x={850} y={176} s={0.7} /><Txt x={900} y={196} fontSize={30} fill={c.texto}>Ganancias</Txt></g>
      {FILAS.map(([a, n, col, r, rt, g], k) => {
        const y = 310 + k * 130;
        const tR = a === 'coach' ? m('coach') + 2 : m(r);
        return (
          <g key={a}>
            {chip(170, y, 250, n, e1(t, m(a)), col, '#fff')}
            {chip(560, y, 330, rt, e1(t, tR), c.panel, c.texto)}
            {chip(930, y, 330, GAN[k], e1(t, m(g)), unicas ? [ROSA, NARANJA, VIOLETA, VERDE][k] : c.panel, unicas ? '#fff' : c.texto)}
          </g>
        );
      })}
      {unicas && <Letrero x={600} y={830} texto="Los resultados se repiten; las ganancias, no" id={ID} op={e1(t, m('unicas'))} tam={24} />}
    </Lienzo>
  );
};
