import React from 'react';
import { Lienzo, useEscena, Letrero, Suelo, Rol, Cuenta, Arco, enArco, Cruz, Rotulo, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, AMBAR, ac, sm, e1, lerp, tono } from './kitEQ';
import type { PropsCE, RolK } from './kitEQ';

/**
 * «Los traspasos entre roles». Un escenario fijo: cinco puestos en fila (BDR y Lead Gen, SDR, AE, Pre-Sales,
 * AM). Una carpeta de cuenta salta de puesto en puesto por un arco; arriba, lo que debe viajar en ese salto
 * aparece como etiquetas. Cuando el relator cuenta qué pasa si falta, la carpeta se rompe, se congela o se
 * pierde. El tercer salto va y vuelve; el quinto vuelve del AM al AE con señales de expansión.
 */

const ID = 'eq05';
const nombres = ['fragil', 'concreto', 'primero', 'priorizada', 'ciegas', 'segundo', 'aterrizada', 'enfria', 'tercer', 'poc', 'vuelve', 'genericas', 'cuarto', 'contrato', 'prometio', 'quinto', 'expansion', 'nuncallega', 'pregunta'] as const;
type N = typeof nombres[number];

const X: Record<string, number> = { bdr: 90, lg: 185, sdr: 370, ae: 590, ps: 820, am: 1060 };
const PIE = 640, SALTO_Y = 520;

type Salto = { a: N; de: number; a2: number; alto: number; color: string; chips: [N, string][]; falla?: [N, string]; rota?: boolean; fria?: boolean; pierde?: boolean; vuelta?: N };
const SALTOS: Salto[] = [
  { a: 'primero', de: 137, a2: X.sdr, alto: 110, color: VIOLETA, chips: [['priorizada', 'Priorizada'], ['priorizada', 'Contactable']], falla: ['ciegas', 'Llama a ciegas'], rota: true },
  { a: 'segundo', de: X.sdr, a2: X.ae, alto: 110, color: AZUL_M, chips: [['aterrizada', 'Reunión agendada'], ['aterrizada', 'Champion'], ['aterrizada', 'Próximos pasos']], falla: ['enfria', 'Se enfría'], fria: true },
  { a: 'tercer', de: X.ae, a2: X.ps, alto: 110, color: TEAL, chips: [['tercer', 'La necesidad'], ['poc', 'Demo o POC'], ['vuelve', 'Vuelve: propuesta']], falla: ['genericas', 'Demo genérica'], vuelta: 'vuelve' },
  { a: 'cuarto', de: X.ae, a2: X.am, alto: 230, color: NARANJA, chips: [['contrato', 'Contrato firmado'], ['contrato', 'Lo prometido'], ['contrato', 'Qué espera']], falla: ['prometio', '¿Qué se prometió?'], rota: true },
  { a: 'quinto', de: X.am, a2: X.ae, alto: 230, color: VERDE, chips: [['expansion', 'Señales de expansión'], ['expansion', 'Momento y personas']], falla: ['nuncallega', 'Nunca llega'], pierde: true },
];

export const TraspasosEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Los traspasos entre roles'], [m('fragil'), 'Lo frágil son los saltos'], [m('concreto'), 'En cada salto viaja algo'],
    [m('primero'), '1 · BDR y Lead Gen → SDR'], [m('ciegas'), 'Si falta: llamar a ciegas'], [m('segundo'), '2 · SDR → AE'], [m('enfria'), 'Si falta: se enfría'],
    [m('tercer'), '3 · AE ↔ Pre-Sales'], [m('genericas'), 'El riesgo: demos genéricas'], [m('cuarto'), '4 · AE → AM'], [m('prometio'), 'Nadie sabe qué se prometió'],
    [m('quinto'), '5 · AM → AE'], [m('nuncallega'), 'Si no llega, se pierde'],
  ];

  const puestos: { r: RolK; x: number; y: number }[] = [
    { r: 'bdr', x: X.bdr, y: 690 }, { r: 'lg', x: X.lg, y: 760 }, { r: 'sdr', x: X.sdr, y: 690 }, { r: 'ae', x: X.ae, y: 690 }, { r: 'ps', x: X.ps, y: 690 }, { r: 'am', x: X.am, y: 690 },
  ];
  let k = -1; SALTOS.forEach((s, j) => { if (t >= M(s.a)) k = j; });
  const fragil = e1(t, m('fragil'));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Los traspasos entre roles">
      <Rotulo t={t} lista={rotulos} id={ID} />
      <Suelo y={PIE} isDark={isDark} />

      {/* los puestos */}
      {puestos.map((p) => (
        <g key={p.r}>
          <Rol id={ID} rol={p.r} x={p.x} y={PIE} s={0.5} t={t} sigla={false} herramienta={false} />
          <Letrero x={p.x} y={p.y} texto={p.r === 'lg' ? 'Lead Gen' : p.r === 'ps' ? 'Pre-Sales' : p.r.toUpperCase()} fondo={p.r === 'bdr' ? VIOLETA : p.r === 'lg' ? '#ec4899' : p.r === 'sdr' ? AZUL_M : p.r === 'ae' ? NARANJA : p.r === 'ps' ? TEAL : VERDE} id={ID} tam={24} />
        </g>
      ))}

      {/* antes del primer salto: los huecos entre roles laten */}
      {k < 0 && fragil > 0.01 && [[137, X.sdr], [X.sdr, X.ae], [X.ae, X.ps], [X.ps, X.am]].map(([a, b], j) => (
        <g key={j} opacity={fragil * (0.55 + 0.45 * Math.sin(t * 4 + j))}>
          <path d={`M ${(a + b) / 2 - 16} 560 l 10 16 l -8 12 l 12 18`} stroke={ROJO_M} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      {k < 0 && t >= m('concreto') && <g opacity={e1(t, m('concreto'))}><Cuenta x={600} y={300} s={1.4} /></g>}

      {/* el salto en curso */}
      {SALTOS.map((s, j) => {
        if (j !== k) return null;
        const a = M(s.a);
        const fin2 = j + 1 < SALTOS.length ? M(SALTOS[j + 1].a) : 1e6;
        const op = e1(t, a) * (1 - ac(t, fin2 - 0.4, fin2));
        const ida = sm(t, a + 0.3, a + 1.8);
        const vuelta = s.vuelta ? sm(t, M(s.vuelta) + 0.2, M(s.vuelta) + 1.7) : 0;
        const falla = s.falla ? sm(t, M(s.falla[0]), M(s.falla[0]) + 0.6) : 0;
        const x1 = s.de, x2 = s.a2;
        // En el quinto salto, al contar la falla sale otra carpeta del AM que se pierde a mitad de camino.
        const tF = s.falla ? M(s.falla[0]) : 1e6;
        const reintento = !!s.pierde && t >= tF;
        const u = reintento ? 0.5 * sm(t, tF, tF + 1) : ida;
        const opC = reintento ? 1 - sm(t, tF + 1.1, tF + 1.7) : 1;
        const [px, py] = vuelta > 0 ? enArco(x2, SALTO_Y, x1, SALTO_Y, s.alto, vuelta) : enArco(x1, SALTO_Y, x2, SALTO_Y, s.alto, u);
        return (
          <g key={j} opacity={op}>
            <Arco x1={x1} y1={SALTO_Y} x2={x2} y2={SALTO_Y} u={ida} color={s.color} alto={s.alto} op={0.6} />
            {s.vuelta && vuelta > 0 && <Arco x1={x2} y1={SALTO_Y + 10} x2={x1} y2={SALTO_Y + 10} u={vuelta} color={s.color} alto={-50} op={0.6} />}
            <Cuenta x={px} y={py - 20} s={0.62} color={s.color} rota={!!s.rota && falla > 0.5} fria={s.fria ? falla : 0} op={opC} />
            {reintento && <Cruz x={px} y={py - 70} r={24} op={sm(t, tF + 0.9, tF + 1.3)} />}
            {s.chips.map(([n, txt], i) => t >= M(n) + i * 0.35 && (
              <g key={txt} opacity={e1(t, M(n) + i * 0.35)}><Letrero x={600} y={170 + i * 78} texto={txt} fondo={s.color} id={ID} /></g>
            ))}
            {s.falla && t >= M(s.falla[0]) && <g opacity={e1(t, M(s.falla[0]))}><Letrero x={480} y={412} texto={s.falla[1]} fondo={ROJO_M} id={ID} /></g>}
          </g>
        );
      })}
      {k >= 0 && <Txt f="a" x={1130} y={130} textAnchor="end" fontSize={28} fill={c.tenue} opacity={0.9}>{`Salto ${k + 1} de 5`}</Txt>}
    </Lienzo>
  );
};
