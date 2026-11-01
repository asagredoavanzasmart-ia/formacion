import React from 'react';
import { Lienzo, useEscena, Letrero, Persona, Moneda3D, Cuenta, Rol, Rotulo, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, PIZARRA, AMBAR, ac, sm, e1, lerp, tono } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «El tiempo de rampa y el valle de la muerte». Un paisaje que es también un gráfico: el retorno de un vendedor
 * nuevo mes a mes. La curva baja bajo la línea del cero (el valle), donde caen monedas de sueldo y se queman
 * cuentas, y después sube hasta la bandera de la cuota. Una persona camina por la curva. Se marcan 6,2 meses
 * (AE) y 3,0 meses (SDR) y la brecha del 53 %. Un mando medio sostiene un colchón en el valle; en la empresa
 * plana el colchón desaparece. Comprimir la rampa achica el valle y el sueldo empieza a volver antes.
 */

const ID = 'eq11';
const nombres = ['aprende', 'valle', 'baja', 'salario', 'quema', 'sube', 'tres', 'm62', 'm30', 'b53', 'costos', 'capas', 'colchon', 'supervivencia', 'devolverse', 'pregunta'] as const;
type N = typeof nombres[number];

const X = (mes: number) => 140 + mes * 75;
const CERO = 420;

export const RampaEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'El tiempo de rampa'], [m('aprende'), 'Mientras aprende'], [m('valle'), 'El valle de la muerte'], [m('baja'), 'Primero la curva baja'], [m('salario'), 'Se paga su salario'], [m('quema'), 'Quema cuentas'],
    [m('sube'), 'Después sube a la cuota'], [m('tres'), 'Tres datos'], [m('m62'), 'AE: 6,2 meses'], [m('m30'), 'SDR: 3,0 meses'], [m('b53'), 'Brecha del 53 %'],
    [m('costos'), 'Un centro de costos'], [m('capas'), 'Antes, un mando medio amortiguaba'], [m('colchon'), 'Ese colchón ya no está'], [m('supervivencia'), 'Comprimir la curva'], [m('devolverse'), 'El sueldo vuelve antes'],
  ];

  const comprime = sm(t, m('supervivencia') + 0.3, m('supervivencia') + 2.2);
  const rampa = lerp(6.2, 3.6, comprime);
  const hondo = lerp(160, 120, comprime) * (1 + 0.18 * sm(t, m('colchon'), m('colchon') + 1) * (1 - comprime));
  const f = (mes: number) => (mes < rampa ? CERO + hondo * Math.sin((Math.PI * mes) / rampa) : CERO - 220 * (1 - Math.exp(-(mes - rampa) / 2)));
  const dibuja = Math.max(sm(t, m('baja') - 0.5, m('sube') + 3), estatico ? 1 : 0);
  const n = 60;
  const pts = Array.from({ length: n + 1 }, (_, k) => (k / n) * 12).filter((mes) => mes <= 12 * dibuja + 0.001).map((mes) => [X(mes), f(mes)] as [number, number]);
  const valle = Array.from({ length: 41 }, (_, k) => (k / 40) * rampa).map((mes) => `${X(mes)},${f(mes)}`).join(' ');
  const caminaMes = 12 * sm(t, m('aprende'), m('sube') + 4);
  const enValle = caminaMes < rampa;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El valle de la muerte">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* ejes */}
      <g opacity={e1(t, m('aprende'))}>
        <rect x={X(0)} y={CERO - 2} width={X(12) - X(0)} height={4} rx={2} fill={c.apagado} />
        {[0, 3, 6, 9, 12].map((mes) => <Txt key={mes} f="a" x={X(mes)} y={CERO + 34} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={0.8}>{mes}</Txt>)}
        <Txt f="a" x={X(12)} y={CERO + 64} textAnchor="middle" fontSize={22} fill={c.tenue}>meses</Txt>
      </g>

      {/* el valle */}
      {t >= m('valle') && <g opacity={e1(t, m('valle'))}>
        <polygon points={`${X(0)},${CERO} ${valle} ${X(rampa)},${CERO}`} fill={ROJO_M} opacity={0.16} />
        <Letrero x={X(rampa / 2)} y={790} texto={t >= m('costos') ? 'Centro de costos' : 'Valle de la muerte'} fondo={ROJO_M} id={ID} />
      </g>}
      {pts.length > 1 && <polyline points={pts.map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />}

      {/* sueldo que cae y cuentas quemadas */}
      {t >= m('salario') && Array.from({ length: 4 }, (_, k) => { const ph = ((t - m('salario')) * 0.5 + k / 4) % 1; const mes = rampa * (0.2 + 0.2 * k); const dev = sm(t, m('devolverse'), m('devolverse') + 1); return <g key={k} opacity={Math.min(1, ph * 6, (1 - ph) * 6) * e1(t, m('salario')) * (1 - dev)}><Moneda3D x={X(mes)} y={lerp(CERO - 40, f(mes) - 10, ph)} r={14} giro={Math.cos(t * 5 + k)} /></g>; })}
      {t >= m('devolverse') && Array.from({ length: 4 }, (_, k) => { const ph = ((t - m('devolverse')) * 0.5 + k / 4) % 1; const mes = rampa + 1 + k * 1.6; return <g key={k} opacity={Math.min(1, ph * 6, (1 - ph) * 6)}><Moneda3D x={X(mes)} y={lerp(f(mes) - 10, f(mes) - 50, ph)} r={14} giro={Math.cos(t * 5 + k)} /></g>; })}
      {t >= m('quema') && [0.35, 0.6].map((u, k) => { const mes = rampa * u; return (
        <g key={k} opacity={e1(t, m('quema') + k * 0.3) * (1 - ac(t, m('tres'), m('tres') + 0.5))}>
          <Cuenta x={X(mes) + 50} y={f(mes) + 60} s={0.45} color="#94a3b8" />
          {[0, 1].map((j) => <path key={j} d={`M ${X(mes) + 40 + j * 16} ${f(mes) + 46} q -10 -16 4 -${30 + 6 * Math.sin(t * 9 + j)} q 10 18 4 30 Z`} fill={j ? AMBAR : ROJO_M} />)}
        </g>
      ); })}

      {/* la bandera de la cuota */}
      {t >= m('sube') && <g opacity={e1(t, m('sube'))}>
        <rect x={X(12) - 4} y={f(12) - 76} width={8} height={68} fill="#64748b" />
        <path d={`M ${X(12) + 4} ${f(12) - 76} h 56 l -12 16 l 12 16 h -56 Z`} fill={VERDE} />
      </g>}

      {/* quien camina por la curva */}
      {t >= m('aprende') && <g opacity={e1(t, m('aprende'))}><Persona id={ID} x={X(caminaMes)} y={f(caminaMes) - 6 - 4 * Math.abs(Math.sin(t * 7))} s={0.3} cuerpo={enValle ? '#94a3b8' : NARANJA} /></g>}

      {/* tres datos */}
      {t >= m('m62') && <g opacity={e1(t, m('m62'))}>
        <path d={`M ${X(6.2)} ${CERO} V 150`} stroke={NARANJA} strokeWidth={4} strokeDasharray="8 8" />
        <Letrero x={X(6.2)} y={125} texto="AE · 6,2 meses" fondo={NARANJA} id={ID} tam={24} />
      </g>}
      {t >= m('m30') && <g opacity={e1(t, m('m30'))}>
        <path d={`M ${X(3)} ${CERO} V 230`} stroke={AZUL_M} strokeWidth={4} strokeDasharray="8 8" />
        <Letrero x={X(3)} y={205} texto="SDR · 3,0 meses" fondo={AZUL_M} id={ID} tam={24} />
      </g>}
      {t >= m('b53') && <g opacity={e1(t, m('b53'))}><Letrero x={980} y={790} texto="Brecha 53 %" fondo={ROJO_M} id={ID} tam={24} /></g>}

      {/* el colchón del mando medio */}
      {t >= m('capas') && (() => { const va = sm(t, m('colchon'), m('colchon') + 1.2); return (
        <g opacity={e1(t, m('capas')) * (1 - va)}>
          <rect x={X(3.1) - 90} y={f(3.1) + 14 + 40 * va} width={180} height={30} rx={15} fill={ROSA} opacity={0.85} />
          <Rol id={ID} rol="mg" x={X(3.1) + 160} y={730} s={0.4} t={t} sigla={false} herramienta={false} />
        </g>
      ); })()}
    </Lienzo>
  );
};
