import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Calendario, Reloj, Auto, Carretera, Edificio, Estrella, Hoja, Paso, Curva, Visto, Cruz, Contrato, Suelo, e1, sm, vent, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Plan y seguimiento. Toma 1: una burbuja de conversación se evapora en partículas mientras pasan los días; el caso:
 * la casa, la carretera con tráfico y la oficina a hora y media. Toma 2: el camino se abre en tres: incentivo
 * (estrella), consecuencia (registro con marca roja) y alternativa (horario corrido / casa); la alternativa se ilumina.
 * Toma 3: los cinco pasos de cierre que se marcan. Toma 4: el seguimiento: una curva de avance con revisiones en las
 * fechas acordadas; primero tu parte; luego recursos humanos y documentos; un proceso justo.
 */

const ID = 'fb09', P = 'fb-plan';

const Casa: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = '#f59e0b' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-50} y={-70} width={100} height={70} fill="#fde68a" />
    <path d="M -62 -66 L 0 -120 L 62 -66 Z" fill={color} />
    <rect x={-14} y={-38} width={28} height={38} fill="#a16b3f" />
  </g>
);

export const PlanFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('evapora'), 'Sin plan, se evapora'], [m('hora'), 'Hora y media de viaje'], [m('caminos'), 'Tres caminos'], [m('resuelve'), 'La alternativa resuelve'],
    [m('cinco'), 'Cinco pasos para cerrar'], [m('seguimiento'), 'El seguimiento'], [m('revisa'), 'Primero tu parte'], [m('rrhh'), 'Recursos humanos'], [m('justo'), 'Un proceso justo'],
  ];
  const evap = sm(t, m('evapora') + 0.5, m('evapora') + 3);
  const CAM = [['incentivo', 'Incentivo', 300, AZUL_M], ['consecuencia', 'Consecuencia', 600, ROJO_M], ['alternativa', 'Alternativa', 900, VERDE]] as const;
  const resuelve = sm(t, m('resuelve'), m('resuelve') + 0.8);
  const PASOS = [['resume', 'Resume el plan'], ['explique', 'Que lo explique con sus palabras'], ['siente', '¿Cómo te sientes con esto?'], ['fija', 'Fija cuándo revisarlo'], ['plazo', 'Pon un plazo']] as const;
  const avance = sm(t, m('seguimiento'), m('seguimiento') + 4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Plan y seguimiento">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · se evapora; el trayecto */}
      <TomaFB t={t} a={0} b={m('caminos')} cy={480}>
        {vent(t, -1, m('hora')) > 0.01 && (
          <g opacity={vent(t, -1, m('hora'))}>
            <g opacity={1 - evap}><Burbuja x={420} y={520} w={420} texto="¡Buena conversación!" u={1} c={c} id={ID} tam={30} /></g>
            {Array.from({ length: 14 }, (_, k) => { const u = cl01((evap * 1.4 - azar(k) * 0.4)); return u > 0.01 && u < 0.99 ? <circle key={k} cx={420 + (azar(k + 9) - 0.3) * 380} cy={440 - u * 220} r={6 + 6 * azar(k + 2)} fill={c.apagado} opacity={1 - u} /> : null; })}
            <Calendario x={880} y={440} s={1.4} marcados={Math.min(7, Math.floor(evap * 7))} />
            <Txt x={880} y={600} textAnchor="middle" fontSize={30} fill={c.texto}>Una semana</Txt>
          </g>
        )}
        {t >= m('hora') && (
          <g opacity={e1(t, m('hora'))}>
            <Carretera y={600} x0={140} x1={1060} ancho={70} avance={t * 40} />
            <Casa x={150} y={560} />
            <Edificio x={1060} y={565} w={110} h={260} color={GRIS} />
            {[0, 1, 2, 3, 4].map((k) => <Auto key={k} x={360 + k * 130 + 10 * Math.sin(t * 2 + k)} y={600} s={0.5} color={[ROJO_M, AZUL_M, VIOLETA, NARANJA, VERDE][k]} />)}
            <Reloj x={600} y={360} r={70} t={t * 3} />
            <Txt x={600} y={480} textAnchor="middle" fontSize={34} fill={c.texto}>1 h 30</Txt>
            <Txt x={600} y={700} textAnchor="middle" fontSize={28} fill={c.texto}>Tráfico impredecible</Txt>
          </g>
        )}
      </TomaFB>

      {/* 2 · tres caminos */}
      <TomaFB t={t} a={m('caminos')} b={m('cinco')} cy={470}>
        <Persona id={ID} x={600} y={830} s={0.8} cuerpo={AZUL_M} />
        {CAM.map(([n, txt, x, col], k) => {
          const o = e1(t, m(n));
          const dim = k === 2 ? 1 : 1 - 0.6 * resuelve;
          return (
            <g key={n} opacity={dim}>
              <path d={`M 600 640 C 600 540, ${x} 520, ${x} 420`} stroke={k === 2 && resuelve > 0.1 ? VERDE : c.apagado} strokeWidth={k === 2 ? 26 + 10 * resuelve : 26} fill="none" strokeLinecap="round" opacity={0.4 + 0.6 * o} />
              {o > 0.01 && (
                <g opacity={o}>
                  <circle cx={x} cy={320} r={86} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.15))' }} />
                  {k === 0 && <Estrella x={x} y={320} r={50} fill="#fbbf24" rot={t * 15} />}
                  {k === 1 && <><Hoja x={x} y={320} w={70} h={90} /><rect x={x - 30} y={330} width={60} height={8} rx={4} fill={ROJO_M} /></>}
                  {k === 2 && <><Casa x={x - 20} y={350} s={0.5} /><Reloj x={x + 34} y={290} r={26} t={t * 2} aro={VERDE} /></>}
                  <Txt x={x} y={200} textAnchor="middle" fontSize={30} fill={col}>{txt}</Txt>
                </g>
              )}
            </g>
          );
        })}
        {t >= m('resuelve') && <Letrero x={900} y={130} texto="Resuelve la causa" fondo={VERDE} id={ID} tam={28} op={e1(t, m('resuelve'))} />}
      </TomaFB>

      {/* 3 · cinco pasos */}
      <TomaFB t={t} a={m('cinco')} b={m('seguimiento')} cy={470}>
        {PASOS.map(([n, txt], k) => (
          <Paso key={n} x={140} y={180 + k * 120} w={920} texto={txt} color={[NARANJA, AZUL_M, ROSA, VIOLETA, VERDE][k]} c={c} op={e1(t, m(n))} hecho={sm(t, m(n) + 0.6, m(n) + 1.2)} tam={32} />
        ))}
      </TomaFB>

      {/* 4 · seguimiento */}
      <TomaFB t={t} a={m('seguimiento')} b={fin + 1} cy={470}>
        {vent(t, m('seguimiento'), m('revisa')) > 0.01 && (
          <g opacity={vent(t, m('seguimiento'), m('revisa'))}>
            <path d="M 160 620 L 1040 620" stroke={c.apagado} strokeWidth={6} />
            <Curva pts={[[160, 600], [380, 560], [600, 470], [820, 400], [1040, 300]]} u={avance} color={VERDE} grosor={10} />
            {[380, 600, 820, 1040].map((x, k) => (
              <g key={k} opacity={sm(t, m('seguimiento') + 0.8 + k * 0.8, m('seguimiento') + 1.2 + k * 0.8)}>
                <Calendario x={x} y={700} s={0.45} marcados={k + 1} />
                <Visto x={x} y={[560, 470, 400, 300][k] - 50} r={22} />
              </g>
            ))}
          </g>
        )}
        {t >= m('revisa') && (
          <g opacity={vent(t, m('revisa'), m('rrhh'))}>
            <Persona id={ID} x={600} y={680} s={1.05} cuerpo={VIOLETA} />
            <Letrero x={330} y={360} texto="¿Fui claro?" fondo={AZUL_M} id={ID} tam={30} />
            <Letrero x={870} y={360} texto="¿Di el apoyo?" fondo={NARANJA} id={ID} tam={30} />
          </g>
        )}
        {t >= m('rrhh') && (
          <g opacity={e1(t, m('rrhh'))}>
            {[0, 1, 2].map((k) => <Contrato key={k} x={420 + k * 60} y={420 - k * 10} s={0.8} rot={(k - 1) * 6} op={e1(t, m('rrhh') + k * 0.4)} />)}
            <Txt x={480} y={620} textAnchor="middle" fontSize={28} fill={c.texto}>Cada acuerdo documentado</Txt>
            {t >= m('justo') && (
              <g opacity={e1(t, m('justo'))}>
                <rect x={860} y={300} width={12} height={260} rx={6} fill={GRIS} />
                <rect x={760} y={300} width={212} height={10} rx={5} fill={GRIS} />
                <circle cx={780} cy={350} r={36} fill={AZUL_M} opacity={0.85} /><circle cx={952} cy={350} r={36} fill={AZUL_M} opacity={0.85} />
                <Letrero x={866} y={620} texto="Un proceso justo" fondo={VERDE} id={ID} tam={28} />
              </g>
            )}
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};

const cl01 = (v: number) => Math.max(0, Math.min(1, v));
