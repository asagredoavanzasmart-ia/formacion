import React from 'react';
import { useEscenaVC, Lienzo, Rotulo, Letrero, Txt, e1, sm, tono, useMovil, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Banderas rojas: un campo de nueve mástiles. Cada bandera se iza y flamea cuando se nombra, y abajo aparece su acción.
 * Se agrupan por color: información (ámbar), personas (rosa) y disposición (violeta).
 */

const ID = 'vc17', P = 'vc-banderas';

export const BanderasVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [[m('falta'), 'Información'], [m('influencia'), 'Personas'], [m('equilibrio'), 'Disposición']];
  const B: [string, string, string, string][] = [
    ['falta', 'Falta de información', 'Sin info', 'Busca coaching y pregunta'],
    ['incertidumbre', 'Incertidumbre', 'Dudas', 'Verifica y triangula'],
    ['influencia', 'Influencia sin contactar', 'Sin contacto', 'Venta de rango similar'],
    ['cara', 'Cara nueva', 'Cara nueva', 'Reevalúa el mapa'],
    ['bloquea', 'Bloqueo de acceso', 'Bloqueo', 'Apalancamiento, no rodeo'],
    ['equilibrio', 'En equilibrio', 'Equilibrio', 'Crea una discrepancia'],
    ['exceso', 'Exceso de confianza', 'Exceso', 'Espera atenta'],
    ['ganancia', 'Ganancia desconocida', '¿Ganancia?', 'Infiere, pregunta y usa al coach'],
    ['dudosa', 'Coach dudoso', 'Coach dudoso', 'Contrasta y busca alternativas'],
  ];
  const color = (k: number) => (k < 2 ? AMBAR : k < 5 ? ROSA : VIOLETA);
  let actual = -1;
  B.forEach(([a], k) => { if (t >= m(a)) actual = k; });

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Banderas rojas">
      <Rotulo t={t} lista={rot} id={ID} />
      {B.map(([a, n, corto], k) => {
        const x = 250 + (k % 3) * 350, y = 270 + Math.floor(k / 3) * 205;
        const iza = sm(t, m(a), m(a) + 1);
        const on = t >= m(a), act = actual === k;
        const f = Math.sin(t * 5 + k);
        return (
          <g key={a} opacity={0.4 + 0.6 * Math.max(e1(t, m('falta') - 1.5 + 0.1 * k), 0)}>
            <ellipse cx={x} cy={y + 4} rx={40} ry={7} fill="#000" opacity={0.15} />
            <rect x={x - 4} y={y - 130} width={8} height={134} rx={4} fill={GRIS} />
            {on && <path d={`M ${x + 4} ${y - 128 + 70 * (1 - iza)} Q ${x + 40} ${y - 140 + 6 * f + 70 * (1 - iza)} ${x + 80} ${y - 124 + 70 * (1 - iza)} Q ${x + 44} ${y - 100 - 6 * f + 70 * (1 - iza)} ${x + 4} ${y - 84 + 70 * (1 - iza)} Z`} fill={color(k)} opacity={act ? 1 : 0.75} />}
            <Txt x={x} y={y + 40} textAnchor="middle" fontSize={24} fill={act ? color(k) : c.texto} opacity={on ? 1 : 0.4}>{movil ? corto : n}</Txt>
          </g>
        );
      })}
      {actual >= 0 && <Letrero key={actual} x={600} y={815} texto={B[actual][3]} fondo={color(actual)} id={ID} op={e1(t, m(B[actual][0]) + 0.4)} tam={26} />}
      {/* acompaña con color: información / personas / disposición */}
      {t >= m('falta') && !movil && [[AMBAR, 'Información'], [ROSA, 'Personas'], [VIOLETA, 'Disposición']].map(([col], k) => <rect key={k} x={60} y={170 + k * 190} width={10} height={140} rx={5} fill={col} opacity={0.5} />)}
    </Lienzo>
  );
};
