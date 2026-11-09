import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Visto, Cruz, Hilo, Contrato, Propuesta, e1, sm, lerp, ventana, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS, ROJO_M } from './kitVC';
import type { PropsCE } from './kitVC';
import { Diana } from '../../es/escenas/kitES';
import { Copa } from '../../comunicacion/escenas/comunCE';

/**
 * Tradicional frente a estratégico. La empresa es un edificio en corte de tres pisos, a escala de las personas:
 * arriba el gerente general (el «pez gordo»), al medio el gerente de división y el coach, abajo los técnicos.
 * 1 · El tradicional toma el ascensor directo al último piso; los pisos de abajo se apagan. El estratégico sube por la
 *     escalera piso a piso y traza el mapa de influencias entre todos.
 * 2 · Las premisas, en primer plano: «mis contactos me aseguran la venta» frente a «¿quién aprueba realmente?».
 * 3 · La táctica: la cena brillante (velas, copas, destellos) frente a dardos dirigidos que dan en el blanco.
 * 4 · El coach: el tradicional solo, adivinando; el estratégico escucha cómo se decide adentro.
 * 5 · El punto ciego: la linterna del tradicional solo alumbra el último piso; el gerente general baja la decisión
 *     técnica a los técnicos, justo donde el estratégico ya estaba.
 * 6 · El resultado: la sorpresa negativa frente al contrato firmado.
 */

const ID = 'vc05', P = 'vc-vendedores';
type Pt = [number, number];

// Edificio: tres pisos de 150 de alto (una persona s = 0,62 mide ~106).
const X0 = 400, X1 = 800, PISO = [370, 520, 670]; // línea de piso de los pisos 3, 2 y 1
const GG: Pt = [600, 370], DIV: Pt = [500, 520], COA: Pt = [700, 520], TE1: Pt = [520, 670], TE2: Pt = [680, 670];

const Edificio3: React.FC<{ c: ReturnType<typeof tono>; isDark: boolean; apagado?: number[] }> = ({ c, isDark, apagado = [0, 0, 0] }) => (
  <g>
    <rect x={X0 - 10} y={206} width={X1 - X0 + 20} height={18} rx={6} fill={isDark ? '#475569' : '#94a3b8'} />
    <rect x={X0} y={220} width={X1 - X0} height={450} fill={isDark ? '#1f2937' : '#f1f5f9'} />
    {PISO.map((y, k) => <rect key={k} x={X0 - 6} y={y} width={X1 - X0 + 12} height={10} rx={3} fill={isDark ? '#64748b' : '#cbd5e1'} />)}
    {[0, 1, 2].map((k) => <rect key={`w${k}`} x={X0 + 14} y={240 + k * 150} width={40} height={60} rx={4} fill="#bfdbfe" opacity={0.7} />)}
    {PISO.map((y, k) => apagado[k] > 0.01 && <rect key={`a${k}`} x={X0} y={y - 150} width={X1 - X0} height={150} fill="#0f172a" opacity={0.55 * apagado[k]} />)}
    <rect x={X0 - 6} y={670} width={X1 - X0 + 12} height={12} rx={4} fill={c.apagado} />
  </g>
);

/* Pez gordo: un pez dorado que nada sobre la cabeza del gerente general. */
const Pez: React.FC<{ x: number; y: number; t: number; op: number }> = ({ x, y, t, op }) => (
  <g opacity={op} transform={`translate(${x + 10 * Math.sin(t * 1.5)} ${y + 4 * Math.sin(t * 3)}) scale(0.55)`}>
    <path d="M -60 0 Q -10 -46 50 0 Q -10 46 -60 0 Z" fill={AMBAR} />
    <path d={`M 44 0 L 84 ${-26 + 6 * Math.sin(t * 8)} L 84 ${26 - 6 * Math.sin(t * 8)} Z`} fill="#f59e0b" />
    <circle cx={-34} cy={-8} r={7} fill="#fff" /><circle cx={-34} cy={-8} r={3} fill="#1f2937" />
  </g>
);

export const VendedoresVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('tradicional'), 'Relaciones personales'], [m('pez'), 'Directo al pez gordo'], [m('mapeo'), 'Un mapa de influencias'],
    [m('premisa'), 'La premisa'], [m('glamorosa'), 'Glamorosa o dirigida'], [m('coach'), 'El coach'], [m('politica'), 'La política interna'],
    [m('ciego'), 'El punto ciego'], [m('delega'), 'La decisión baja'], [m('pierde'), 'El resultado'],
  ];

  // 1 · ascensor y escalera
  const sube = sm(t, m('pez') - 0.6, m('pez') + 1.2);
  const cabina: Pt = [355, lerp(670, 370, sube)];
  const esc = sm(t, m('mapeo') + 0.2, m('mapeo') + 3.4);
  const pisoE = esc < 1 / 3 ? 0 : esc < 2 / 3 ? 1 : 2;
  const estr: Pt = [860, lerp(670, 370, esc)];
  const apag = 0.9 * sm(t, m('pez') + 0.4, m('pez') + 1.4);
  const MAPA: [Pt, Pt][] = [[TE1, TE2], [TE1, DIV], [TE2, COA], [DIV, COA], [DIV, GG], [COA, GG]];
  const ojo = (p: Pt): Pt => [p[0], p[1] - 70];

  // 5 · la decisión baja
  const baja = sm(t, m('delega') + 0.3, m('delega') + 2.6);
  const doc: Pt = baja < 0.5 ? [lerp(GG[0], COA[0], baja * 2), lerp(GG[1] - 60, COA[1] - 60, baja * 2)] : [lerp(COA[0], TE2[0], baja * 2 - 1), lerp(COA[1] - 60, TE2[1] - 60, baja * 2 - 1)];

  const edificio = (apagado: number[], dim = 1) => (
    <g opacity={dim}>
      <Edificio3 c={c} isDark={isDark} apagado={apagado} />
      <Persona id={ID} x={GG[0]} y={GG[1]} s={0.62} cuerpo={VIOLETA} corbata />
      <Persona id={ID} x={DIV[0]} y={DIV[1]} s={0.62} cuerpo={AZUL_M} corbata />
      <Persona id={ID} x={COA[0]} y={COA[1]} s={0.62} cuerpo={TEAL} />
      <Persona id={ID} x={TE1[0]} y={TE1[1]} s={0.62} cuerpo={VERDE} />
      <Persona id={ID} x={TE2[0]} y={TE2[1]} s={0.62} cuerpo={AMBAR} />
    </g>
  );
  const rotulosPisos = (op: number) => op > 0.01 && !movil && (
    <g opacity={op}>
      {[['Gerente general', 290], ['División y coach', 440], ['Técnicos', 590]].map(([n, y]) => <Txt key={n as string} f="a" x={X1 + 120} y={y as number} fontSize={22} fill={c.tenue}>{n as string}</Txt>)}
    </g>
  );

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Tradicional frente a estratégico">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · ascensor al pez gordo / escalera piso a piso */}
      <Toma t={t} a={0} b={m('premisa')} cy={460}>
        {edificio([0, apag * (1 - sm(esc, 0.33, 0.6)), apag * (1 - sm(esc, 0, 0.27))])}
        {/* ascensor */}
        <rect x={325} y={215} width={60} height={460} rx={6} fill="none" stroke={c.apagado} strokeWidth={4} />
        <line x1={355} y1={215} x2={355} y2={cabina[1] - 110} stroke={c.tenue} strokeWidth={3} />
        <rect x={328} y={cabina[1] - 112} width={54} height={114} rx={6} fill={c.panel} stroke={GRIS} strokeWidth={3} />
        <Persona id={ID} x={cabina[0]} y={cabina[1]} s={0.55} cuerpo={GRIS} corbata />
        <Txt x={250} y={710} textAnchor="middle" fontSize={26} fill={GRIS} opacity={e1(t, m('tradicional'))}>Tradicional</Txt>
        {t >= m('pez') && <Pez x={GG[0]} y={GG[1] - 140} t={t} op={e1(t, m('pez'))} />}
        {/* escalera y vendedor con estrategia */}
        {t >= m('mapeo') && (
          <g opacity={e1(t, m('mapeo'))}>
            {[0, 1, 2].map((k) => <path key={k} d={`M ${X1 + 20} ${PISO[2 - k]} ${Array.from({ length: 5 }, (_, j) => `L ${X1 + 20 + (j + 1) * 16} ${PISO[2 - k] - j * 30} L ${X1 + 20 + (j + 1) * 16} ${PISO[2 - k] - (j + 1) * 30}`).join(' ')}`} stroke={c.apagado} strokeWidth={5} fill="none" />)}
            <Persona id={ID} x={estr[0]} y={estr[1]} s={0.55} cuerpo={NARANJA} />
            <Txt x={960} y={710} textAnchor="middle" fontSize={26} fill={NARANJA}>Con estrategia</Txt>
            {MAPA.map(([p, q], k) => {
              const t0 = m('mapeo') + 0.4 + k * 0.5;
              return <Hilo key={k} x1={ojo(p)[0]} y1={ojo(p)[1]} x2={ojo(q)[0]} y2={ojo(q)[1]} u={sm(t, t0, t0 + 0.7)} id={ID} grosor={4} />;
            })}
            {[TE1, TE2, DIV, COA, GG].map((p, k) => <circle key={k} cx={ojo(p)[0]} cy={ojo(p)[1]} r={9} fill={NARANJA} opacity={sm(t, m('mapeo') + 0.4 + k * 0.5, m('mapeo') + 0.8 + k * 0.5)} />)}
          </g>
        )}
        {rotulosPisos(e1(t, m('tradicional')))}
        {t < m('mapeo') && t >= m('pez') && <Letrero x={600} y={780} texto="Solo el pez gordo" fondo={GRIS} id={ID} op={ventana(t, m('pez') + 0.6, m('mapeo'))} tam={26} />}
        {t >= m('mapeo') && <Letrero x={600} y={780} texto={pisoE < 2 ? 'Piso a piso' : 'Quién influye en quién'} id={ID} op={e1(t, m('mapeo') + 0.5)} tam={26} />}
      </Toma>

      {/* 2 · las premisas */}
      <Toma t={t} a={m('premisa')} b={m('glamorosa')} cy={480}>
        <Persona id={ID} x={300} y={720} s={1.05} cuerpo={GRIS} corbata />
        <Persona id={ID} x={900} y={720} s={1.05} cuerpo={NARANJA} ojos={t >= m('aprueba') ? 1 : 0.7} />
        <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Tradicional</Txt>
        <Txt x={900} y={790} textAnchor="middle" fontSize={28} fill={NARANJA}>Con estrategia</Txt>
        {/* tarjetero de contactos del tradicional */}
        <g opacity={ventana(t, m('premisa'), m('aprueba'))} transform="translate(140 600)">
          {[0, 1, 2].map((k) => <rect key={k} x={-40 + k * 8} y={-30 - k * 10} width={70} height={46} rx={6} fill={c.panel} stroke={GRIS} strokeWidth={2} />)}
          <circle cx={6} cy={-38} r={8} fill={VIOLETA} />
        </g>
        {ventana(t, m('premisa'), m('aprueba')) > 0.01 && <g opacity={ventana(t, m('premisa'), m('aprueba'))}><Burbuja x={320} y={510} w={560} texto="«Mis contactos de alto nivel me aseguran la venta»" u={sm(t, m('premisa'), m('premisa') + 2)} c={c} id={ID} tam={28} /></g>}
        {t >= m('aprueba') && <g opacity={e1(t, m('aprueba'))}><Burbuja x={880} y={510} w={560} texto="«¿Quién aprueba realmente y quién puede guiarme?»" u={sm(t, m('aprueba'), m('aprueba') + 2)} c={c} id={ID} tam={28} lado="der" marca /></g>}
      </Toma>

      {/* 3 · glamorosa frente a dirigida */}
      <Toma t={t} a={m('glamorosa')} b={m('coach')} cy={470}>
        <line x1={600} y1={150} x2={600} y2={780} stroke={c.apagado} strokeWidth={4} strokeDasharray="10 14" />
        {/* la cena */}
        <Letrero x={300} y={170} texto="Glamorosa" fondo={GRIS} id={ID} tam={28} op={e1(t, m('glamorosa'))} />
        <g opacity={e1(t, m('glamorosa'))}>
          <Persona id={ID} x={170} y={640} s={0.85} cuerpo={GRIS} corbata />
          <Persona id={ID} x={430} y={640} s={0.85} cuerpo={VIOLETA} corbata />
          <rect x={150} y={600} width={300} height={20} rx={8} fill="#7c4a1e" />
          <rect x={180} y={620} width={14} height={110} fill="#5b3714" /><rect x={406} y={620} width={14} height={110} fill="#5b3714" />
          <ellipse cx={300} cy={602} rx={140} ry={8} fill="#fff" opacity={0.9} />
          <Copa x={250} y={598} c={c} /><Copa x={350} y={598} c={c} />
          <rect x={295} y={560} width={10} height={38} rx={3} fill="#fef3c7" />
          <path d={`M 300 ${548 - 4 * Math.sin(t * 9)} Q 292 558 300 562 Q 308 558 300 ${548 - 4 * Math.sin(t * 9)} Z`} fill="#f59e0b" />
          {t >= m('cena') && [0, 1, 2, 3].map((k) => { const u = ((t - m('cena')) * 0.6 + k / 4) % 1; return <path key={k} d="M 0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z" fill={AMBAR} transform={`translate(${220 + k * 55} ${470 - u * 120}) scale(${1 - u})`} opacity={1 - u} />; })}
        </g>
        {/* los dardos dirigidos */}
        {t >= m('dirigida') && (
          <g opacity={e1(t, m('dirigida'))}>
            <Letrero x={900} y={170} texto="Dirigida" id={ID} tam={28} />
            <Diana x={900} y={450} r={140} u={sm(t, m('dirigida') + 0.3, m('dirigida') + 1)} />
            {[[-40, -50], [36, 30]].map(([dx, dy], k) => {
              const u = sm(t, m('dirigida') + 1.2 + k * 0.7, m('dirigida') + 1.8 + k * 0.7);
              return u > 0.01 && (
                <g key={k} transform={`translate(${lerp(1160, 900 + dx, u)} ${lerp(260, 450 + dy, u)}) rotate(-30)`}>
                  <rect x={0} y={-3} width={90} height={6} rx={3} fill={GRIS} /><path d="M 0 0 L 14 -8 L 14 8 Z" fill={ROJO_M} /><path d="M 80 0 L 96 -12 L 96 12 Z" fill={NARANJA} />
                </g>
              );
            })}
            <Txt x={900} y={680} textAnchor="middle" fontSize={28} fill={c.texto}>Menos brillo, más efecto</Txt>
          </g>
        )}
      </Toma>

      {/* 4 · el coach */}
      <Toma t={t} a={m('coach')} b={m('ciego')} cy={470}>
        <line x1={600} y1={150} x2={600} y2={780} stroke={c.apagado} strokeWidth={4} strokeDasharray="10 14" />
        <Persona id={ID} x={220} y={720} s={1} cuerpo={GRIS} corbata ojos={0.7} />
        <Burbuja x={240} y={520} w={340} texto="«Creo que le caí bien»" u={sm(t, m('coach') + 0.5, m('coach') + 1.6)} c={c} id={ID} tam={26} />
        <g opacity={0.35}><Persona id={ID} x={460} y={720} s={0.9} cuerpo={c.apagado} /></g>
        <Cruz x={460} y={520} r={30} op={sm(t, m('coach') + 1, m('coach') + 1.5)} />
        <Letrero x={300} y={170} texto="Sin coach" fondo={GRIS} id={ID} tam={28} />
        <Persona id={ID} x={980} y={720} s={1} cuerpo={NARANJA} />
        <Persona id={ID} x={770} y={720} s={1} cuerpo={TEAL} />
        <Letrero x={900} y={170} texto="Un coach adentro" id={ID} tam={28} />
        {t >= m('politica') && <g opacity={e1(t, m('politica'))}><Burbuja x={790} y={520} w={360} texto="«Así se decide aquí»" u={sm(t, m('politica'), m('politica') + 1.2)} c={c} id={ID} tam={26} marca /></g>}
        {t >= m('politica') && (
          <g opacity={e1(t, m('politica') + 0.6)}>
            {([[820, 260], [900, 230], [980, 270], [900, 320]] as Pt[]).map((p, k, a) => <React.Fragment key={k}>{k > 0 && <line x1={a[0][0]} y1={a[0][1]} x2={p[0]} y2={p[1]} stroke={GRIS} strokeWidth={3} />}<circle cx={p[0]} cy={p[1]} r={12} fill={[VIOLETA, AZUL_M, VERDE, AMBAR][k]} /></React.Fragment>)}
          </g>
        )}
      </Toma>

      {/* 5 · el punto ciego y la decisión que baja */}
      <Toma t={t} a={m('ciego')} b={m('pierde')} cy={460}>
        {edificio([0, 0.85 * (1 - 0.3 * baja), 0.85 * (1 - baja)])}
        <rect x={325} y={215} width={60} height={460} rx={6} fill="none" stroke={c.apagado} strokeWidth={4} />
        <rect x={328} y={258} width={54} height={114} rx={6} fill={c.panel} stroke={GRIS} strokeWidth={3} />
        <Persona id={ID} x={355} y={370} s={0.55} cuerpo={GRIS} corbata />
        {/* linterna: solo alumbra el último piso */}
        <path d={`M 380 320 L ${X1} 240 L ${X1} 360 Z`} fill="#fde68a" opacity={0.28 + 0.06 * Math.sin(t * 4)} />
        <Txt x={250} y={460} textAnchor="middle" fontSize={26} fill={GRIS}>Tradicional</Txt>
        {[0, 1, 2].map((k) => <path key={k} d={`M ${X1 + 20} ${PISO[2 - k]} ${Array.from({ length: 5 }, (_, j) => `L ${X1 + 20 + (j + 1) * 16} ${PISO[2 - k] - j * 30} L ${X1 + 20 + (j + 1) * 16} ${PISO[2 - k] - (j + 1) * 30}`).join(' ')}`} stroke={c.apagado} strokeWidth={5} fill="none" />)}
        <Persona id={ID} x={860} y={670} s={0.55} cuerpo={NARANJA} />
        <Txt x={960} y={710} textAnchor="middle" fontSize={26} fill={NARANJA}>Con estrategia</Txt>
        <Letrero x={250} y={600} texto="Punto ciego" fondo={ROJO_M} id={ID} tam={26} op={e1(t, m('ciego') + 0.5)} />
        {t >= m('delega') && <Propuesta x={doc[0]} y={doc[1]} s={0.55} op={e1(t, m('delega'))} />}
        {t >= m('delega') && <Letrero x={600} y={780} texto="Delega la decisión técnica" id={ID} op={e1(t, m('delega') + 0.4)} tam={26} />}
        {rotulosPisos(1)}
      </Toma>

      {/* 6 · el resultado */}
      <Toma t={t} a={m('pierde')} b={fin + 1} cy={470}>
        <line x1={600} y1={150} x2={600} y2={780} stroke={c.apagado} strokeWidth={4} strokeDasharray="10 14" />
        <Persona id={ID} x={300} y={720} s={1.05} cuerpo={GRIS} corbata ojos={0.4} />
        <g opacity={e1(t, m('pierde'))}>
          <g transform={`translate(300 ${380 - 20 * sm(t, m('pierde'), m('pierde') + 0.6)})`}>
            <rect x={-80} y={-55} width={160} height={110} rx={10} fill={c.panel} stroke={GRIS} strokeWidth={3} />
            <path d="M -80 -55 L 0 10 L 80 -55" stroke={GRIS} strokeWidth={3} fill="none" />
          </g>
          <Cruz x={300} y={360} r={46} op={sm(t, m('pierde') + 0.6, m('pierde') + 1)} />
          <Txt x={420} y={300} fontSize={70} fill={ROJO_M} opacity={sm(t, m('pierde') + 0.8, m('pierde') + 1.2)}>!</Txt>
          <Letrero x={300} y={180} texto="Sorpresa negativa" fondo={ROJO_M} id={ID} tam={26} />
        </g>
        <Persona id={ID} x={900} y={720} s={1.05} cuerpo={NARANJA} />
        {t >= m('gana') && (
          <g opacity={e1(t, m('gana'))}>
            <Contrato x={900} y={380} s={0.9} firma={sm(t, m('gana') + 0.3, m('gana') + 1.6)} />
            <Visto x={1000} y={290} r={30} op={sm(t, m('gana') + 1.4, m('gana') + 1.8)} />
            <Letrero x={900} y={180} texto="Gana la cuenta" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
        <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Tradicional</Txt>
        <Txt x={900} y={790} textAnchor="middle" fontSize={28} fill={NARANJA}>Con estrategia</Txt>
      </Toma>
    </Lienzo>
  );
};
