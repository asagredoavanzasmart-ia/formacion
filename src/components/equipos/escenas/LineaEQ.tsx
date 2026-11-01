import React from 'react';
import { Lienzo, useEscena, Letrero, Rol, Cuenta, Cruz, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra, azar } from './kitEQ';
import type { PropsCE, RolK } from './kitEQ';

/**
 * «El espectro de roles: la línea de ensamblaje». Una fábrica: una cinta transportadora con cuatro plataformas
 * (concientización, activación, adquisición y retención) y sus roles encima. Una cuenta avanza de plataforma
 * en plataforma a medida que se nombra cada etapa. Arriba, en una pasarela, el Manager mira el tablero:
 * ve dónde se acumulan las cuentas y mueve a una persona para destrabar; es jefe de planta, no un operario que
 * corre entre máquinas. Al final, chispas de fricción en cada salto.
 */

const ID = 'eq06';
const nombres = ['linea', 'plataforma', 'concientizacion', 'territorio', 'masiva', 'conocerte', 'activacion', 'conversacion', 'adquisicion', 'orquesta', 'tecnico', 'retencion', 'cruzadas', 'sobre', 'flujo', 'acumulan', 'recursos', 'planta', 'maquina', 'claridad', 'friccion', 'pregunta'] as const;
type N = typeof nombres[number];

const PX = [230, 480, 730, 980];
const TOP = 540;
const ETAPAS: { n: N; txt: string; color: string; fila: number; roles: RolK[] }[] = [
  { n: 'concientizacion', txt: 'Concientización', color: VIOLETA, fila: 0, roles: ['lg', 'bdr'] },
  { n: 'activacion', txt: 'Activación', color: AZUL_M, fila: 1, roles: ['sdr'] },
  { n: 'adquisicion', txt: 'Adquisición', color: NARANJA, fila: 0, roles: ['ae', 'ps'] },
  { n: 'retencion', txt: 'Retención', color: VERDE, fila: 1, roles: ['am'] },
];

export const LineaEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'La línea de ensamblaje'], [m('plataforma'), 'De plataforma en plataforma'],
    [m('concientizacion'), '1 · Concientización'], [m('conocerte'), 'El mercado te conoce'], [m('activacion'), '2 · Activación'], [m('conversacion'), 'Interés → conversación'],
    [m('adquisicion'), '3 · Adquisición'], [m('retencion'), '4 · Retención'], [m('cruzadas'), 'Ventas cruzadas y de mayor valor'],
    [m('sobre'), 'Sobre la línea, el Manager'], [m('flujo'), 'Orquesta el flujo completo'], [m('acumulan'), 'Dónde se acumulan'], [m('recursos'), 'Mueve recursos'],
    [m('planta'), 'Jefe de planta'], [m('maquina'), 'No un operario'], [m('claridad'), 'Claridad y especialización'], [m('friccion'), 'Cada salto, fricción'],
  ];

  /* posición de la cuenta principal sobre la cinta */
  const tramos = [m('conocerte'), m('activacion'), m('adquisicion'), m('retencion')];
  let px = PX[0];
  for (let k = 1; k < 4; k++) px = lerp(px, PX[k], sm(t, tramos[k] + 0.2, tramos[k] + 1.6));
  const cinta = (t * 40) % 40;
  const acumula = sm(t, m('acumulan'), m('acumulan') + 2.5);
  const mueve = sm(t, m('recursos') + 0.3, m('recursos') + 2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La línea de ensamblaje">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* la cinta transportadora */}
      <g opacity={e1(t, m('linea'))}>
        <rect x={70} y={600} width={1060} height={34} rx={17} fill={isDark ? '#3f3f46' : '#9ca3af'} />
        {Array.from({ length: 27 }, (_, k) => <rect key={k} x={84 + k * 40 + cinta} y={606} width={18} height={6} rx={3} fill="#fff" opacity={k * 40 + cinta < 1020 ? 0.35 : 0} />)}
        {Array.from({ length: 8 }, (_, k) => <g key={k} transform={`translate(${110 + k * 140} 640) rotate(${t * 140})`}><circle r={14} fill={PIZARRA} /><rect x={-2} y={-10} width={4} height={20} fill="#cbd5e1" /></g>)}
      </g>

      {/* las cuatro plataformas */}
      {ETAPAS.map((e, k) => {
        const t0 = k === 0 ? m('plataforma') : M(e.n);
        if (t < t0) return null;
        const u = e1(t, t0);
        const activa = t >= M(e.n);
        return (
          <g key={e.n} opacity={u}>
            <rect x={PX[k] - 105} y={TOP} width={210} height={60} rx={14} fill={activa ? e.color : c.apagado} style={sombra(c.sombra, 4, 8)} />
            <rect x={PX[k]} y={TOP} width={105} height={60} rx={14} fill="#000" opacity={0.1} />
            {activa && <Letrero x={PX[k]} y={e.fila ? 784 : 700} texto={e.txt} fondo={e.color} id={ID} tam={26} />}
            {activa && e.roles.map((r, j) => {
              const desplazada = k === 1 && j === 0 && mueve > 0;
              const x = PX[k] + (e.roles.length > 1 ? (j ? 42 : -42) : 0);
              return <Rol key={r} id={ID} rol={r} x={desplazada ? lerp(x, PX[2] - 92, mueve) : x} y={TOP} s={0.42} t={t} sigla={false} op={e1(t, M(e.n) + j * 0.3)} flip={j === 0 && e.roles.length > 1} />;
            })}
          </g>
        );
      })}
      {/* un segundo SDR que el Manager mueve a la plataforma trabada */}
      {mueve > 0 && <Rol id={ID} rol="sdr" x={PX[1]} y={TOP} s={0.42} t={t} sigla={false} op={sm(t, m('recursos'), m('recursos') + 0.4)} />}

      {/* acciones de cada etapa */}
      {t >= m('territorio') && t < m('activacion') && <g opacity={e1(t, m('territorio'))} transform={`translate(${PX[0] + 120} 420)`}><path d="M 0 0 C -16 -16 -12 -34 0 -34 C 12 -34 16 -16 0 0 Z" fill={ROJO_M} /><circle cy={-22} r={6} fill="#fff" /></g>}
      {t >= m('conversacion') && t < m('adquisicion') && <g opacity={e1(t, m('conversacion'))}>
        {[0, 1].map((j) => <g key={j} transform={`translate(${PX[1] + (j ? 56 : -56)} ${410 + 6 * Math.sin(t * 3 + j)})`}><rect x={-34} y={-22} width={68} height={44} rx={16} fill={j ? AZUL_M : c.panel} style={sombra(0.2, 2, 4)} /><circle cx={-12} r={4} fill={j ? '#fff' : c.tenue} /><circle r={4} fill={j ? '#fff' : c.tenue} /><circle cx={12} r={4} fill={j ? '#fff' : c.tenue} /></g>)}
      </g>}
      {t >= m('cruzadas') && <g opacity={e1(t, m('cruzadas'))}>{[0, 1].map((j) => <Cuenta key={j} x={PX[3] + 30 + j * 50} y={470 - j * 40} s={0.4} color={VERDE} />)}<path d={`M ${PX[3] - 60} 470 V 400 l -12 14 M ${PX[3] - 60} 400 l 12 14`} stroke={VERDE} strokeWidth={6} fill="none" strokeLinecap="round" /></g>}

      {/* la cuenta principal y el flujo de cuentas */}
      {t >= m('conocerte') && <Cuenta x={px} y={572} s={0.42} color={NARANJA} op={e1(t, m('conocerte')) * (1 - 0.6 * ac(t, m('flujo'), m('flujo') + 1))} />}
      {t >= m('flujo') && Array.from({ length: 6 }, (_, k) => {
        const ph = ((t - m('flujo')) * 0.07 + k / 6) % 1;
        let x = lerp(130, 1080, ph);
        const cola = PX[2] - 60 - (k % 3) * 34;
        if (acumula > 0 && x > cola && x < PX[2] + 40) x = lerp(x, cola, acumula);
        return <Cuenta key={k} x={x} y={572} s={0.36} color={[AZUL_M, VIOLETA, NARANJA, VERDE, ROSA, TEAL][k]} op={Math.min(1, ph * 8, (1 - ph) * 8) * e1(t, m('flujo'))} />;
      })}
      {acumula > 0.3 && t < m('planta') && <g opacity={acumula * (0.6 + 0.4 * Math.sin(t * 5))}><circle cx={PX[2] - 90} cy={570} r={70} fill={ROJO_M} opacity={0.18} /></g>}

      {/* el Manager en la pasarela */}
      {t >= m('sobre') && <g opacity={e1(t, m('sobre'))}>
        <rect x={380} y={300} width={440} height={14} rx={7} fill={PIZARRA} />
        {[420, 780].map((x) => <rect key={x} x={x} y={314} width={8} height={40} fill={PIZARRA} opacity={0.6} />)}
        <Rol id={ID} rol="mg" x={600} y={300} s={0.5} t={t} sigla={false} />
        {t >= m('flujo') && PX.map((x, k) => <path key={k} d={`M 600 310 L ${x} ${TOP - 90}`} stroke={AMBAR} strokeWidth={3} strokeDasharray="8 10" strokeDashoffset={-t * 30} opacity={0.6 * e1(t, m('flujo') + k * 0.15)} />)}
      </g>}
      {t >= m('planta') && <g opacity={e1(t, m('planta'))}><Letrero x={870} y={240} texto="Jefe de planta" fondo={PIZARRA} id={ID} /></g>}
      {t >= m('maquina') && t < m('claridad') + 0.5 && (() => { const ph = (t * 0.6) % 1; const x = lerp(180, 1020, 0.5 - 0.5 * Math.cos(ph * 2 * Math.PI)); return (
        <g opacity={e1(t, m('maquina')) * (1 - ac(t, m('claridad'), m('claridad') + 0.5))}>
          <Persona id={ID} x={x} y={470 - 6 * Math.abs(Math.sin(t * 9))} s={0.3} cuerpo="#94a3b8" />
          <Cruz x={x + 34} y={400} r={16} />
        </g>
      ); })()}

      {/* claridad, especialización y fricción */}
      {t >= m('claridad') && <g opacity={e1(t, m('claridad'))}><Letrero x={210} y={150} texto="Claridad" fondo={VERDE} id={ID} /><Letrero x={990} y={150} texto="Especialización" fondo={AZUL_M} id={ID} /></g>}
      {t >= m('friccion') && [355, 605, 855].map((x, k) => (
        <g key={k} opacity={e1(t, m('friccion') + k * 0.2)}>
          {Array.from({ length: 6 }, (_, j) => { const a = (j / 6) * Math.PI * 2 + t * 2; const r = 14 + 14 * ((t * 2 + azar(j + k)) % 1); return <rect key={j} x={x + Math.cos(a) * r - 3} y={520 + Math.sin(a) * r - 3} width={6} height={6} rx={2} fill={j % 2 ? AMBAR : ROJO_M} />; })}
        </g>
      ))}
    </Lienzo>
  );
};
