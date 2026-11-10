import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Hoja, Visto, Cruz, Gente, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Problemas y soluciones.
 * Toma 1: cinco escalones de la creación de la oferta que se encienden en orden.
 * Toma 2: un carro de supermercado en el camino del cliente y, encima, las nubes de pensamiento de cada obstáculo
 * (confuso, tiempo, caro, viajo, familia); cada una es una piedra en el camino. Una sola sin respuesta bloquea la compra.
 * Toma 3: la clienta que almuerza en restaurantes: la mesa, la promesa de la guía, la guía escrita una vez que se
 * multiplica para miles de clientes.
 */

const ID = 'ad10', P = 'ad-problemas';

const Carro: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 -100 H -60 L -40 -20 H 60 L 76 -80 H -54" stroke="#475569" strokeWidth={10} fill="none" strokeLinejoin="round" />
    <path d="M -54 -80 H 76 L 60 -20 H -40 Z" fill={VERDE} opacity={0.35} />
    <circle cx={-30} cy={0} r={12} fill="#334155" /><circle cx={50} cy={0} r={12} fill="#334155" />
  </g>
);

export const ProblemasAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('pasos'), 'Cinco pasos'], [m('antes'), 'Antes, durante y después'], [m('comida'), 'Comprar comida saludable'], [m('razon'), 'Una sola objeción basta'],
    [m('clienta'), 'La clienta de los restaurantes'], [m('cerro'), 'Escrita una vez, para miles'],
  ];
  const PASOS: [string, string][] = [['resultado', 'Resultado'], ['listar', 'Problemas'], ['transformar', 'Soluciones'], ['definir', 'Entrega'], ['recortar', 'Recortar']];
  const OBS: [string, string, number, number][] = [['confuso', 'Confuso', 250, 250], ['tiempo', 'Toma tiempo', 470, 200], ['caro', 'Es caro', 690, 250], ['viajo', 'Si viajo', 900, 200], ['familia', 'Mi familia', 1010, 330]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Problemas y soluciones">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Cinco pasos */}
      <Toma t={t} a={0} b={m('antes')} cy={470}>
        {PASOS.map(([n, txt], k) => {
          const on = t >= m(n) - 0.1;
          const x = 140 + k * 200, h = 120 + k * 80;
          return (
            <g key={n} opacity={on ? 1 : 0.2}>
              <rect x={x} y={720 - h} width={180} height={h} rx={16} fill={on ? [NARANJA, ROSA, VIOLETA, AZUL_M, VERDE][k] : c.apagado} />
              <rect x={x + 90} y={720 - h} width={90} height={h} rx={16} fill="#000" opacity={0.1} />
              <Txt x={x + 90} y={720 - h + 60} textAnchor="middle" fontSize={50} fill="#fff" peso={800}>{k + 1}</Txt>
              <Letrero x={x + 90} y={movil && k % 2 ? 830 : 770} texto={txt} fondo={on ? undefined : GRIS} id={ID} tam={24} />
            </g>
          );
        })}
      </Toma>

      {/* 2 · Los obstáculos del camino */}
      <Toma t={t} a={m('antes')} b={m('clienta')} cy={470}>
        <g opacity={e1(t, m('antes'))}>
          <path d="M 80 700 H 1120" stroke={c.apagado} strokeWidth={30} strokeLinecap="round" />
          {(['Antes', 'Durante', 'Después'] as const).map((s, k) => <Letrero key={s} x={260 + k * 340} y={780} texto={s} fondo={GRIS} id={ID} tam={26} op={e1(t, m('antes') + k * 0.25)} />)}
          {t >= m('comida') && <g transform={`translate(${lerp(140, 200, sm(t, m('comida'), m('comida') + 1))} 690)`}><Carro x={0} y={0} s={1} /><Persona id={ID} x={-110} y={0} s={0.5} cuerpo={AZUL_M} /></g>}
        </g>
        {OBS.map(([n, txt, x, y], k) => {
          const on = t >= m(n) - 0.1;
          const resuelta = k < 4 && t >= m('razon') + 0.6 + k * 0.15;
          return (
            <g key={n} opacity={on ? e1(t, m(n)) : 0}>
              <g transform={`translate(${x} ${y + 6 * Math.sin(t * 1.5 + k)})`}>
                <ellipse rx={110} ry={56} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                <circle cx={-60} cy={74} r={12} fill={c.panel} /><circle cx={-80} cy={100} r={7} fill={c.panel} />
                <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={movil ? 30 : 28} fill={c.texto}>{txt}</Txt>
              </g>
              <g transform={`translate(${x} 680)`}>
                <path d="M -40 20 Q -46 -20 -10 -30 Q 30 -36 40 0 Q 44 20 30 20 Z" fill={resuelta ? c.apagado : '#78716c'} opacity={resuelta ? 0.3 : 1} />
              </g>
              {resuelta && <Visto x={x + 90} y={y - 40} r={24} />}
              {k === 4 && t >= m('razon') && <Cruz x={x + 90} y={y - 40} r={28} op={sm(t, m('razon'), m('razon') + 0.5)} />}
            </g>
          );
        })}
        {t >= m('razon') && <Letrero x={600} y={560} texto="Una sin respuesta: no compra" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('razon') + 0.3)} />}
      </Toma>

      {/* 3 · La guía de restaurantes */}
      <Toma t={t} a={m('clienta')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('clienta'))}>
          <Persona id={ID} x={260} y={640} s={0.8} cuerpo={VIOLETA} corbata />
          <Burbuja x={300} y={350} w={420} texto="Almuerzo fuera todos los días" u={sm(t, m('restaurantes'), m('restaurantes') + 1.5)} c={c} id={ID} tam={30} />
          {t >= m('restaurantes') && (
            <g opacity={e1(t, m('restaurantes'))} transform="translate(560 640)">
              <rect x={-120} y={-14} width={240} height={20} rx={8} fill="#92400e" />
              <rect x={-90} y={6} width={14} height={80} fill="#78350f" /><rect x={76} y={6} width={14} height={80} fill="#78350f" />
              <ellipse cx={0} cy={-22} rx={60} ry={14} fill="#fff" /><ellipse cx={0} cy={-26} rx={34} ry={8} fill={ROJO_M} />
            </g>
          )}
        </g>
        {t >= m('guia') && (
          <g opacity={e1(t, m('guia'))}>
            <Hoja x={880} y={400} w={200} h={260} lineas={8} color={NARANJA} rot={4 * Math.sin(t)} />
            <Txt x={880} y={300} textAnchor="middle" fontSize={26} fill={NARANJA} peso={800}>Qué pedir</Txt>
          </g>
        )}
        {t >= m('cerro') && <Letrero x={880} y={600} texto="Venta cerrada" fondo={VERDE} id={ID} tam={28} op={e1(t, m('cerro'))} />}
        {t >= m('miles') && (
          <g opacity={e1(t, m('miles'))}>
            {Array.from({ length: 8 }, (_, k) => <Hoja key={k} x={700 + k * 50} y={740 - (k % 2) * 20} w={70} h={90} lineas={3} color={NARANJA} rot={-10 + k * 3} op={sm(t, m('miles') + k * 0.1, m('miles') + k * 0.1 + 0.4)} />)}
            <Letrero x={880} y={820} texto="Para miles de clientes" id={ID} tam={26} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
