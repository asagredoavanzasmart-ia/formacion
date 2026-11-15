import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, PersonaCara, Escalon, Calendario, Regalo, EtiquetaPrecio, Cubo, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
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
  // El consultorio parte centrado y se corre a la izquierda cuando llega la cuenta.
  const desliza = 230 * (1 - sm(t, m('pagando') - 1.2, m('pagando') - 0.3));
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
        <g transform={`translate(${desliza} 0)`}>
        <g opacity={E('dentista', 0.6, -0.3)}>
          {/* Piso del consultorio */}
          <rect x={70} y={718} width={560} height={12} rx={6} fill={c.apagado} />
          {/* Lámpara con brazo articulado: el haz cae sobre la boca del paciente */}
          <rect x={592} y={330} width={16} height={390} rx={7} fill="#94a3b8" />
          <ellipse cx={600} cy={720} rx={46} ry={9} fill="#000" opacity={0.15} />
          <path d="M 600 340 L 450 330 L 330 372" stroke="#94a3b8" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={450} cy={330} r={9} fill="#64748b" />
          <path d={`M 300 386 L 330 380 L 196 486 L 160 470 Z`} fill="#fde68a" opacity={0.28 + 0.06 * Math.sin(t * 3)} />
          <g transform="rotate(-30 314 378)"><ellipse cx={314} cy={378} rx={40} ry={20} fill="#64748b" /><ellipse cx={314} cy={386} rx={30} ry={10} fill="#fde68a" /></g>
          {/* Dentista detrás del sillón, con mascarilla y espejo */}
          <Persona id={ID} x={290} y={718} s={1.55} cuerpo="#e2e8f0" />
          <rect x={262} y={514} width={56} height={26} rx={10} fill="#bae6fd" />
          <path d="M 262 520 L 252 512 M 318 520 L 328 512" stroke="#7dd3fc" strokeWidth={3} />
          <path d="M 262 590 L 190 486" stroke="#64748b" strokeWidth={6} strokeLinecap="round" />
          <circle cx={186} cy={480} r={9} fill="#cbd5e1" stroke="#64748b" strokeWidth={3} />
          {/* Sillón reclinado */}
          <rect x={300} y={640} width={50} height={76} rx={10} fill="#64748b" />
          <ellipse cx={325} cy={716} rx={80} ry={10} fill="#475569" />
          <path d="M 205 628 L 140 528" stroke={AZUL_M} strokeWidth={34} strokeLinecap="round" />
          <path d="M 205 632 H 450 L 532 690" stroke={AZUL_M} strokeWidth={34} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 205 646 H 450 L 526 700" stroke="#000" strokeWidth={8} fill="none" opacity={0.12} strokeLinecap="round" />
          <path d="M 132 512 L 116 488" stroke="#1d4ed8" strokeWidth={32} strokeLinecap="round" />
          {/* Paciente (Brunson) tendido en el sillón */}
          <path d="M 162 500 L 232 608 L 452 608 L 540 668" stroke={NARANJA} strokeWidth={42} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 300 608 L 452 608 L 540 668" stroke="#1e3a8a" strokeWidth={36} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
          <ellipse cx={556} cy={680} rx={16} ry={11} fill="#1f2937" />
          <path d="M 200 560 L 270 612" stroke="#c2410c" strokeWidth={16} strokeLinecap="round" />
          <circle cx={146} cy={466} r={30} fill={`url(#${ID}-cara)`} />
          <path d="M 118 470 Q 112 436 142 434 Q 160 434 168 446 Q 140 444 128 474 Z" fill="#2b1a12" />
          <circle cx={156} cy={460} r={3.5} fill="#3b2a20" />
          <ellipse cx={168} cy={478} rx={6} ry={4.5} fill="#7f1d1d" />
        </g>
        <g opacity={E('limpieza')}>
          <circle cx={200} cy={268} r={92} fill={isDark ? '#1e3a5f' : '#e0f2fe'} style={sombra(0.15, 6, 12)} />
          <circle cx={150} cy={386} r={13} fill={isDark ? '#1e3a5f' : '#e0f2fe'} /><circle cx={140} cy={418} r={8} fill={isDark ? '#1e3a5f' : '#e0f2fe'} />
          <Diente x={200} y={274} s={1.05} color={colDiente} inc={-9 * amarillo} />
          {amarillo > 0.05 && [[-22, -10], [14, 6], [-6, 30]].map(([dx, dy], k) => <circle key={k} cx={200 + dx} cy={274 + dy} r={7} fill="#a16207" opacity={0.45 * amarillo} />)}
          {amarillo < 0.5 && [[-70, -40], [64, -56], [70, 40]].map(([dx, dy], k) => <path key={k} d="M 0 -12 L 3 -3 L 12 0 L 3 3 L 0 12 L -3 3 L -12 0 L -3 -3 Z" fill="#fbbf24" transform={`translate(${200 + dx} ${268 + dy}) scale(${(0.7 + 0.3 * Math.sin(t * 5 + k)) * (1 - amarillo * 2)})`} />)}
        </g>
        <Pastilla x={360} y={196} texto="Gratis" fondo={VERDE} tam={24} op={E('limpieza', 0.5, 0.4)} />
        </g>
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
        <PersonaCara id={ID} x={qx} y={q > 0 ? qy : 620} s={0.55} cuerpo={TEAL} e={q > 0.97 ? 1 : 0} />
        <Pastilla x={330} y={430} texto={movil ? 'Cebo' : 'Nuevo cebo'} fondo={AMBAR} tam={24} op={E('masaje', 0.5, 0.5)} />
        <Conector x1={330} y1={460} x2={330} y2={600} u={E('masaje', 0.5, 0.6)} t={t} color={AMBAR} puntos={2} grosor={4} />
      </Toma>
    </Lienzo>
  );
};
