import React from 'react';
import { Lienzo, useEscena, Letrero, Rol, Persona, Moneda3D, Hoja, Reloj, Rotulo, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra, mezcla } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «El cuello de botella estructural: la pirámide rota». Un corte de edificio en tres losas escalonadas.
 * Arriba los directores, abajo SDR y AE junto al cliente, y en el medio los mandos medios, donde la losa se
 * agrieta: apagan incendios, traducen cuotas y cargan monedas de overhead. Un cable une los pisos como un
 * teléfono descompuesto: la estrella que baja llega deformada; lo que sube del cliente llega tarde y filtrado.
 * El ciclo se frena; al final la pirámide crece y la distancia entre quien decide y quien escucha se alarga.
 */

const ID = 'eq07';
const nombres = ['tres', 'estrategico', 'distorsionan', 'operativo', 'nopreguntan', 'tactico', 'incendios', 'cuotas', 'overhead', 'telefono', 'deformado', 'filtrado', 'frena', 'cliente', 'alta', 'pregunta'] as const;
type N = typeof nombres[number];

/* Losas: centro x, y de la superficie, ancho. */
const L = { top: { y: 300, w: 200 }, mid: { y: 480, w: 400 }, base: { y: 680, w: 600 } };
const CX = 400;
/* Puntos del cable por el borde derecho, de arriba abajo. */
const CABLE: [number, number][] = [[510, 250], [610, 430], [710, 630]];

const Estrella: React.FC<{ x: number; y: number; r: number; deforma: number; color: string }> = ({ x, y, r, deforma, color }) => {
  const pts = Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + (k * Math.PI) / 5; const rr = (k % 2 ? r * 0.45 : r) * (1 + deforma * 0.5 * Math.sin(k * 2.7 + 1)); return `${x + Math.cos(a) * rr},${y + Math.sin(a) * rr * (1 - 0.35 * deforma)}`; });
  return <polygon points={pts.join(' ')} fill={color} />;
};

export const PiramideEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'La pirámide rota'], [m('tres'), 'Tres niveles'], [m('estrategico'), 'Nivel estratégico'], [m('distorsionan'), 'Las directrices se distorsionan'],
    [m('operativo'), 'Nivel operativo'], [m('nopreguntan'), 'Hacen y no preguntan'], [m('tactico'), 'Nivel táctico: aquí se rompe'],
    [m('incendios'), 'Apagando incendios'], [m('cuotas'), 'Traduciendo cuotas'], [m('overhead'), 'Overhead: costo de estructura'],
    [m('telefono'), 'Teléfono descompuesto'], [m('deformado'), 'Baja deformado'], [m('filtrado'), 'Sube tarde y filtrado'],
    [m('frena'), 'Frena la retroalimentación'], [m('cliente'), 'Lejos de donde ocurre el trabajo'], [m('alta'), 'Más alta, más lejos'],
  ];

  const alta = sm(t, m('alta') + 0.3, m('alta') + 2);
  const sube = (y: number) => y - (y < 600 ? (600 - y) * 0.3 * alta : 0);
  const Losa: React.FC<{ y: number; w: number; color: string; op: number; grieta?: number }> = ({ y, w, color, op, grieta = 0 }) => (
    <g opacity={op}>
      <rect x={CX - w / 2} y={y} width={w} height={26} rx={10} fill={color} style={sombra(c.sombra, 4, 8)} />
      <rect x={CX} y={y} width={w / 2} height={26} rx={10} fill="#000" opacity={0.12} />
      {grieta > 0 && <path d={`M ${CX - 30} ${y - 2} l 14 12 l -10 8 l 16 10`} stroke={isDark ? '#111' : '#fff'} strokeWidth={5} fill="none" strokeDasharray={60} strokeDashoffset={60 * (1 - grieta)} strokeLinecap="round" />}
    </g>
  );

  const yTop = sube(L.top.y), yMid = sube(L.mid.y);
  const cable: [number, number][] = [[CABLE[0][0], sube(CABLE[0][1])], [CABLE[1][0], sube(CABLE[1][1])], CABLE[2]];
  const enCable = (u: number): [number, number] => (u < 0.5 ? mezcla(cable[0], cable[1], u * 2) : mezcla(cable[1], cable[2], (u - 0.5) * 2));
  const tTel = m('telefono');

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La pirámide rota">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* las tres losas y sus personas */}
      <Losa y={L.base.y} w={L.base.w} color={isDark ? '#4b5563' : '#cbd5e1'} op={e1(t, m('tres'))} />
      <Losa y={yMid} w={L.mid.w} color={isDark ? '#4b5563' : '#cbd5e1'} op={e1(t, m('tres') + 0.2)} grieta={sm(t, m('tactico') + 0.4, m('tactico') + 1.2)} />
      <Losa y={yTop} w={L.top.w} color={isDark ? '#4b5563' : '#cbd5e1'} op={e1(t, m('tres') + 0.4)} />
      {t >= m('tres') && [yTop, yMid].map((y, k) => <rect key={k} x={CX - 6} y={y + 26} width={12} height={(k ? L.base.y : yMid) - y - 26} fill={c.apagado} opacity={0.5 * e1(t, m('tres'))} />)}

      {t >= m('estrategico') && <g opacity={e1(t, m('estrategico'))}><Rol id={ID} rol="mg" x={CX} y={yTop} s={0.45} t={t} sigla={false} herramienta={false} /></g>}
      {t >= m('tactico') && [-120, 0, 120].map((dx, k) => {
        const fuego = sm(t, m('incendios'), m('incendios') + 0.5) * (1 - 0.6 * sm(t, m('telefono'), m('telefono') + 1));
        return (
          <g key={k} opacity={e1(t, m('tactico') + k * 0.2)}>
            <Persona id={ID} x={CX + dx} y={yMid} s={0.4} cuerpo={AMBAR} />
            {fuego > 0.01 && <g transform={`translate(${CX + dx + 34} ${yMid - 4})`} opacity={fuego}>{[0, 1].map((j) => <path key={j} d={`M ${-10 + j * 12} 0 Q ${-18 + j * 12} ${-18 - 5 * Math.sin(t * 10 + j + k)} ${-4 + j * 12} -32 Q ${2 + j * 12} -12 ${6 + j * 12} 0 Z`} fill={j ? AMBAR : ROJO_M} />)}</g>}
          </g>
        );
      })}
      {t >= m('operativo') && [-240, -120, 0, 120, 240].map((dx, k) => (
        <g key={k} opacity={e1(t, m('operativo') + k * 0.12)}><Rol id={ID} rol={k % 2 ? 'ae' : 'sdr'} x={CX + dx} y={L.base.y} s={0.42} t={t} sigla={false} herramienta={false} /></g>
      ))}
      {t >= m('nopreguntan') && <g opacity={e1(t, m('nopreguntan')) * (1 - 0.7 * ac(t, m('telefono'), m('telefono') + 0.6))}>
        <rect x={CX - 300} y={L.base.y - 110} width={600} height={110} rx={18} fill="#93c5fd" opacity={0.22} />
        <Letrero x={CX} y={L.base.y + 70} texto="Hacen y no preguntan" fondo={PIZARRA} id={ID} />
      </g>}

      {/* el cliente, a la derecha de la base */}
      {t >= m('operativo') && <g opacity={e1(t, m('operativo') + 0.6)}><Persona id={ID} x={1000} y={L.base.y + 26} s={0.6} cuerpo={AZUL_M} /><Letrero x={1000} y={L.base.y + 70} texto="Cliente" fondo={AZUL_M} id={ID} /></g>}

      {/* la directriz que baja y se distorsiona (antes del teléfono) */}
      {t >= m('distorsionan') && t < m('operativo') + 0.5 && (() => { const u = sm(t, m('distorsionan') + 0.2, m('distorsionan') + 3); return (
        <g opacity={e1(t, m('distorsionan')) * (1 - ac(t, m('operativo'), m('operativo') + 0.5))}><Estrella x={lerp(CX + 150, CX + 250, u)} y={lerp(240, 620, u)} r={30} deforma={u} color={NARANJA} /></g>
      ); })()}

      {/* cuotas que se traducen y overhead */}
      {t >= m('cuotas') && t < m('telefono') && [0, 1, 2].map((k) => { const ph = ((t - m('cuotas')) * 0.6 + k / 3) % 1; return <g key={k} opacity={Math.min(1, ph * 5, (1 - ph) * 5) * (1 - ac(t, m('telefono') - 0.5, m('telefono')))}><Hoja x={CX + 190 + ph * 40} y={lerp(yTop + 10, yMid - 30, ph)} w={40} h={50} lineas={3} rot={ph * 40} /></g>; })}
      {t >= m('overhead') && <g opacity={e1(t, m('overhead')) * (1 - ac(t, m('frena') - 0.5, m('frena')))}>
        {[0, 1, 2, 3].map((k) => <Moneda3D key={k} x={140} y={yMid - 18 - k * 14} r={18} giro={1} />)}
        <Letrero x={140} y={yMid - 110} texto="Overhead" fondo={AMBAR} id={ID} />
      </g>}

      {/* el teléfono descompuesto */}
      {t >= tTel && <g opacity={e1(t, tTel)}>
        <polyline points={cable.map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke={c.tenue} strokeWidth={4} strokeDasharray="10 8" />
        {(() => { const u = sm(t, m('deformado'), m('deformado') + 2.5); const [x, y] = enCable(u); return t >= m('deformado') && <Estrella x={x} y={y} r={28} deforma={u} color={NARANJA} />; })()}
        {t >= m('filtrado') && Array.from({ length: 5 }, (_, k) => {
          const u = sm(t, m('filtrado') + k * 0.5, m('filtrado') + 3 + k * 0.5);
          const llega = k === 0;
          const [x, y] = u < 0.35 ? mezcla([960, L.base.y - 40], cable[2], u / 0.35) : enCable(1 - (u - 0.35) / 0.65 * (llega ? 1 : 0.55));
          return <circle key={k} cx={x} cy={y} r={11} fill={AZUL_M} opacity={llega ? 1 : 1 - sm(u, 0.55, 0.75)} />;
        })}
        {t >= m('filtrado') && <g opacity={e1(t, m('filtrado') + 0.6) * (1 - ac(t, m('alta') - 0.4, m('alta')))}><Reloj x={720} y={250} r={34} t={t} vel={3} aro={AZUL_M} /></g>}
      </g>}

      {/* el ciclo frenado y el trabajo real frente al cliente */}
      {t >= m('frena') && <g opacity={e1(t, m('frena')) * (1 - ac(t, m('alta') - 0.5, m('alta')))} transform="translate(980 330)">
        <path d="M -70 0 A 70 70 0 1 1 0 70" stroke={c.apagado} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d="M 0 70 L -24 56 L -6 92 Z" fill={c.apagado} />
        <rect x={-14} y={-88} width={28} height={64} rx={8} fill={ROJO_M} transform={`rotate(${20 + 4 * Math.sin(t * 6)})`} />
        <Letrero x={0} y={130} texto="Ciclo frenado" fondo={ROJO_M} id={ID} />
      </g>}
      {t >= m('cliente') && <g opacity={e1(t, m('cliente')) * (0.7 + 0.3 * Math.sin(t * 3))}><circle cx={1000} cy={L.base.y - 50} r={78} fill={VERDE} opacity={0.16} /></g>}
      {t >= m('alta') && <g opacity={alta}>
        <path d={`M 840 200 V 600`} stroke={ROSA} strokeWidth={5} strokeDasharray="10 8" />
        <path d={`M 828 212 l 12 -14 l 12 14 M 828 588 l 12 14 l 12 -14`} stroke={ROSA} strokeWidth={5} fill="none" />
        <Letrero x={840} y={150} texto="Más lejos" fondo={ROSA} id={ID} />
      </g>}
    </Lienzo>
  );
};
