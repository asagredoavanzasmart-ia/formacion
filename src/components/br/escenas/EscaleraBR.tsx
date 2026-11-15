import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, Escalon, Calendario, Regalo, EtiquetaPrecio, Cubo, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La escalera de valor.
 * Toma 1: el consultorio: Brunson en el sillón del dentista, la burbuja con su diente (blanco y luego amarillo y
 * chueco) y, a la derecha, la cuenta que se imprime renglón a renglón hasta más de 2.000 dólares y la próxima cita.
 * Toma 2: la escalera de cuatro peldaños (cebo, frontal, intermedias, principal), cada uno con su objeto; un cliente
 * sube peldaño a peldaño y la continuidad la rodea como un anillo por el que circula una moneda.
 * Toma 3: el quiropráctico: al ajuste de 50 dólares se le agregan un masaje gratis abajo y un programa de bienestar
 * de 5.000 dólares arriba, y el cliente sube.
 */

const ID = 'br03', P = 'br-escalera';

const Diente: React.FC<{ x: number; y: number; s?: number; color: string; inc?: number }> = ({ x, y, s = 1, color, inc = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${inc}) scale(${s})`}>
    <path d="M -40 -50 Q -50 -72 -20 -68 Q 0 -60 20 -68 Q 50 -72 40 -50 Q 44 0 30 40 Q 22 72 12 40 Q 0 20 -12 40 Q -22 72 -30 40 Q -44 0 -40 -50 Z" fill={color} />
    <path d="M 0 -60 Q 20 -68 40 -50 Q 44 0 30 40 Q 22 72 12 40 Q 4 24 0 26 Z" fill="#000" opacity={0.08} />
    <ellipse cx={-18} cy={-40} rx={7} ry={14} fill="#fff" opacity={0.7} />
  </g>
);

export const EscaleraBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('dentista'), 'Una limpieza gratis'], [m('pagando'), 'Salió pagando 2.000'], [m('escalera'), 'La escalera de valor'],
    [m('continuidad'), 'La continuidad'], [m('quiro'), 'El quiropráctico'], [m('escalon'), 'Escalón por escalón'],
  ];
  const amarillo = sm(t, m('amarillos'), m('amarillos') + 1);
  const colDiente = `rgb(${Math.round(lerp(255, 250, amarillo))}, ${Math.round(lerp(255, 214, amarillo))}, ${Math.round(lerp(255, 120, amarillo))})`;
  const R: [string, string, number][] = [['pagando', 'Bandejas blanqueadoras', 0], ['pagando', 'Retenedores', 0.8], ['consulta', 'Control en 6 meses', 0]];

  // Toma 2: la escalera.
  const PEL: [string, string, string][] = [['cebo', 'Cebo', AMBAR], ['frontal', 'Frontal', NARANJA], ['intermedias', 'Intermedias', ROSA], ['cima', 'Principal', VIOLETA]];
  const nivel = PEL.reduce((a, [n], k) => (t >= m(n) ? k + sm(t, m(n), m(n) + 0.9) - 1 : a), -1);
  const kN = Math.max(0, Math.floor(nivel)), fr = nivel - kN;
  const xPel = (k: number) => 245 + k * 220, yPel = (k: number) => 720 - 110 * (k + 1);
  const climbX = nivel < 0 ? 120 : lerp(xPel(kN), xPel(Math.min(3, kN + 1)), kN < 3 ? fr : 0);
  const climbY = nivel < 0 ? 720 : lerp(yPel(kN), yPel(Math.min(3, kN + 1)), kN < 3 ? sm(fr, 0, 0.5) : 0);
  const anillo = sm(t, m('continuidad'), m('continuidad') + 1.2);

  // Toma 3: el quiropráctico.
  const q = sm(t, m('escalon'), m('escalon') + 2.5);
  const qx = q < 0.5 ? lerp(330, 600, q * 2) : lerp(600, 880, q * 2 - 1), qy = q < 0.5 ? lerp(620, 520, sm(q * 2, 0, 0.5)) : lerp(520, 330, sm(q * 2 - 1, 0, 0.5));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La escalera de valor">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El consultorio */}
      <Toma t={t} a={0} b={m('escalera')} cy={470}>
        <g opacity={E('dentista', 0.6, -0.3)}>
          <rect x={150} y={700} width={360} height={14} rx={7} fill={c.apagado} />
          <rect x={300} y={600} width={40} height={100} rx={10} fill="#94a3b8" />
          <path d="M 180 600 H 420 Q 440 600 440 580 V 570 H 180 Z" fill={AZUL_M} />
          <path d="M 180 575 L 130 470 Q 124 452 140 448 L 160 446 L 214 570 Z" fill={AZUL_M} />
          <rect x={112} y={418} width={56} height={36} rx={14} fill="#1d4ed8" />
          <Persona id={ID} x={270} y={572} s={0.58} cuerpo={NARANJA} />
          <path d="M 470 380 Q 420 320 360 330" stroke="#94a3b8" strokeWidth={10} fill="none" strokeLinecap="round" />
          <ellipse cx={350} cy={338} rx={34} ry={18} fill="#fde68a" />
          <Persona id={ID} x={500} y={700} s={0.78} cuerpo="#e2e8f0" />
        </g>
        <g opacity={E('limpieza')}>
          <circle cx={250} cy={260} r={96} fill={c.panel} style={sombra(0.15, 6, 12)} />
          <circle cx={290} cy={370} r={14} fill={c.panel} /><circle cx={300} cy={400} r={8} fill={c.panel} />
          <Diente x={250} y={265} s={1.05} color={colDiente} inc={-9 * amarillo} />
        </g>
        <Pastilla x={250} y={130 + 0} texto="Limpieza gratis" fondo={VERDE} tam={24} op={0} />
        <Pastilla x={410} y={190} texto="Gratis" fondo={VERDE} tam={24} op={E('limpieza', 0.5, 0.4)} />
        <Tarjeta x={700} y={210} w={420} h={400} titulo="La cuenta" c={c} id={ID} op={E('pagando', 0.6, -0.3)} acento={ROJO_M}>
          {R.map(([n, txt, d], k) => {
            const u = sm(t, m(n) + d, m(n) + d + 0.6);
            return (
              <g key={txt} opacity={u} transform={`translate(${(1 - u) * 30} 0)`}>
                <rect x={30} y={78 + k * 70} width={360} height={52} rx={12} fill={c.panel2} />
                <Txt x={50} y={113 + k * 70} fontSize={movil ? 26 : 24} fill={c.texto} peso={800}>{movil ? txt.split(' ')[0] : txt}</Txt>
              </g>
            );
          })}
          <rect x={30} y={300} width={360} height={4} rx={2} fill={c.apagado} />
          <Cifra x={210} y={365} valor={2000} u={sm(t, m('pagando') + 1, m('pagando') + 2.2)} pre="+$" tam={52} color={ROJO_M} miles />
        </Tarjeta>
        <g opacity={E('consulta')}><Calendario x={910} y={720} s={0.9} marcados={6} /></g>
      </Toma>

      {/* 2 · La escalera */}
      <Toma t={t} a={m('escalera')} b={m('quiro')} cy={470}>
        <rect x={100} y={720} width={1000} height={12} rx={6} fill={c.apagado} />
        {PEL.map(([n, txt, col], k) => {
          const u = E(n, 0.6);
          const x = xPel(k), y = yPel(k);
          return (
            <g key={n} opacity={t >= m('escalera') ? 0.25 + 0.75 * Math.min(1, u) : 0}>
              <Escalon x={x - 105} y={720} w={210} h={110 * (k + 1)} color={col} />
              <Txt x={x} y={y + 52} textAnchor="middle" fontSize={movil ? 26 : 28} fill="#fff" peso={800}>{txt}</Txt>
              <g transform={`translate(${x + 50} ${y - 4}) scale(${0.5 * (0.6 + 0.4 * u)})`} opacity={Math.min(1, u)}>
                {k === 0 && <Regalo x={0} y={-30} s={0.7} color={ROSA} />}
                {k === 1 && <EtiquetaPrecio x={0} y={-36} texto="$" color={NARANJA} s={0.7} />}
                {k === 2 && <Cubo x={0} y={-10} l={56} color={ROSA} />}
                {k === 3 && <path d="M -36 -44 L 36 -44 L 50 -24 L 0 30 L -50 -24 Z" fill="#a5f3fc" />}
              </g>
            </g>
          );
        })}
        <Persona id={ID} x={climbX - 40} y={climbY} s={0.5} cuerpo={TEAL} />
        <Pastilla x={905} y={190} texto={movil ? 'Cirugía estética' : 'Dentista: cirugía estética'} fondo={VIOLETA} tam={24} op={E('cirugia')} />
        {anillo > 0 && (
          <g>
            <ellipse cx={575} cy={560} rx={520 * anillo} ry={70} fill="none" stroke={TEAL} strokeWidth={8} strokeDasharray="20 14" opacity={0.7} strokeDashoffset={-t * 40} />
            {anillo > 0.9 && (() => { const a = t * 1.4; return <g transform={`translate(${575 + 520 * Math.cos(a)} ${560 + 70 * Math.sin(a)})`}><circle r={18} fill={AMBAR} /><Txt x={0} y={7} textAnchor="middle" fontSize={20} fill="#fff" peso={800}>$</Txt></g>; })()}
            <Pastilla x={600} y={790} texto={movil ? 'Pago recurrente' : 'Continuidad: un pago recurrente'} fondo={TEAL} tam={26} op={anillo} />
          </g>
        )}
      </Toma>

      {/* 3 · El quiropráctico */}
      <Toma t={t} a={m('quiro')} b={fin + 1} cy={470}>
        <rect x={140} y={720} width={920} height={12} rx={6} fill={c.apagado} />
        <g opacity={E('masaje')}><Escalon x={230} y={720} w={200} h={100} color={AMBAR} /><Txt x={330} y={680} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>{movil ? 'Masaje' : 'Masaje gratis'}</Txt></g>
        <g opacity={E('quiro')}><Escalon x={500} y={720} w={200} h={200} color={NARANJA} /><Txt x={600} y={580} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>Ajuste</Txt><Txt x={600} y={620} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>$50</Txt></g>
        <g opacity={E('bienestar')}><Escalon x={770} y={720} w={220} h={390} color={VIOLETA} /><Txt x={880} y={400} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>Bienestar</Txt><Txt x={880} y={444} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>$5.000</Txt></g>
        <Persona id={ID} x={qx} y={q > 0 ? qy : 620} s={0.55} cuerpo={TEAL} />
        {q > 0.97 && <Cara id={ID} x={1040} y={290} r={30} e={1} />}
        <Pastilla x={330} y={430} texto={movil ? 'Cebo' : 'Nuevo cebo'} fondo={AMBAR} tam={24} op={E('masaje', 0.5, 0.5)} />
        <Conector x1={330} y1={460} x2={330} y2={600} u={E('masaje', 0.5, 0.6)} t={t} color={AMBAR} puntos={2} grosor={4} />
      </Toma>
    </Lienzo>
  );
};
