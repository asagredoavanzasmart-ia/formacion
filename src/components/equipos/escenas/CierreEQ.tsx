import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Engranaje, Visto, Cruz, Hoja, Monitor, Rol, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «De la pirámide a un motor autogestionado», en tres tomas.
 * 1 · La pirámide del comienzo se desarma; los cuatro números de la crisis vuelven a aparecer; la persona
 *     recibe un visto: la causa estaba en el diseño.
 * 2 · Un motor de seis ranuras alrededor de un engranaje central: entran, pieza por pieza, los roles, la
 *     estructura orgánica, los escuadrones, los playbooks, la habilitación con IA y los rituales; el motor gira
 *     cada vez más rápido.
 * 3 · Ninguna pieza funciona sola: aplanar sin documentar se congela, documentar sin tecnología junta polvo y
 *     la tecnología sin rituales muestra datos que nadie mira. No es un organigrama: el motor completo vuelve
 *     a girar, predecible y escalable.
 */

const ID = 'eq18';
const nombres = ['motor', 'cuatro', 'personas', 'pieza', 'roles', 'organica', 'escuadrones', 'playbooks', 'rampa', 'rituales', 'ninguna', 'aplanar', 'documentar', 'tecnologia', 'organigrama', 'predecible', 'pregunta'] as const;
type N = typeof nombres[number];

const PIEZAS: { n: N; txt: string; color: string }[] = [
  { n: 'roles', txt: 'Roles especializados', color: VIOLETA },
  { n: 'organica', txt: 'Estructura orgánica', color: VERDE },
  { n: 'escuadrones', txt: 'Escuadrones', color: NARANJA },
  { n: 'playbooks', txt: 'Playbooks', color: AZUL_M },
  { n: 'rampa', txt: 'Habilitación con IA', color: TEAL },
  { n: 'rituales', txt: 'Rituales ágiles', color: ROSA },
];
const CX = 600, CY = 450, RR = 200;
const hex = (r: number) => Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 3) * k; return `${r * Math.cos(a)},${r * Math.sin(a)}`; }).join(' ');

export const CierreEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Un motor autogestionado'], [m('cuatro'), 'Cuatro números'], [m('personas'), 'La causa era el diseño'], [m('pieza'), 'Pieza por pieza'],
    [m('ninguna'), 'Ninguna funciona sola'], [m('aplanar'), 'Aplanar sin documentar'], [m('documentar'), 'Documentar sin tecnología'], [m('tecnologia'), 'Tecnología sin rituales'],
    [m('organigrama'), 'No es un organigrama'], [m('predecible'), 'Un sistema que funciona'],
  ];

  let puestas = 0; PIEZAS.forEach((p) => { if (t >= M(p.n) + 0.8) puestas++; });
  const separa = sm(t, m('ninguna'), m('ninguna') + 1) * (1 - sm(t, m('predecible'), m('predecible') + 1.2));
  const vel = (0.3 + puestas * 0.5) * (1 - 0.85 * separa);
  const giro = t * vel * 25;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Un motor autogestionado">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · de la pirámide a la causa */}
      <Toma t={t} a={-1} b={m('pieza')} zi={1}>
        {(() => { const des = sm(t, m('motor') + 0.3, m('motor') + 1.8); return (
          <g transform="translate(600 640)">
            {[0, 1, 2].map((k) => { const w = 360 - k * 110; return <rect key={k} x={-w / 2 + (k - 1) * 160 * des} y={-(k + 1) * 80 + 60 * des * k} width={w} height={70} rx={14} fill={[PIZARRA, AMBAR, PIZARRA][k]} opacity={1 - 0.6 * des} transform={`rotate(${(k - 1) * 18 * des})`} />; })}
          </g>
        ); })()}
        {t >= m('cuatro') && ['6,2 meses', '48 %', '53 pts', '46 %'].map((s, k) => <g key={s} opacity={e1(t, m('cuatro') + k * 0.25)}><Letrero x={195 + k * 270} y={190} texto={s} fondo={[NARANJA, VERDE, ROJO_M, VIOLETA][k]} id={ID} tam={30} /></g>)}
        {t >= m('personas') && <g opacity={e1(t, m('personas'))}>
          <Persona id={ID} x={980} y={560} s={0.6} cuerpo={NARANJA} /><Visto x={1040} y={420} r={24} />
          <Letrero x={980} y={620} texto="No eran las personas" fondo={VERDE} id={ID} tam={26} />
        </g>}
      </Toma>

      {/* TOMA 2 · pieza por pieza (y también en la toma 3, el motor se desarma y se vuelve a armar) */}
      <Toma t={t} a={m('pieza')} b={fin + 5} cx={600} cy={450}>
        <g opacity={1 - sm(t, m('aplanar') - 0.4, m('aplanar')) * (1 - sm(t, m('predecible') - 0.2, m('predecible') + 0.6))}>
          <polygon points={hex(RR + 90)} transform={`translate(${CX} ${CY}) rotate(30)`} fill={c.panel} style={sombra(c.sombra, 6, 16)} />
          <Engranaje x={CX} y={CY} r={70} t={giro} hueco={c.panel} color={PIZARRA} />
          {PIEZAS.map((p, k) => {
            const a = -Math.PI / 2 + (k * Math.PI) / 3;
            const entra = sm(t, M(p.n), M(p.n) + 0.8);
            const r = lerp(RR + 340, RR, entra) + 90 * separa;
            const x = CX + r * Math.cos(a), y = CY + r * Math.sin(a);
            return (
              <g key={p.n} opacity={entra}>
                {t < M(p.n) + 0.8 || separa > 0.05 ? null : <rect x={(CX + x) / 2 - 4} y={(CY + y) / 2 - 4} width={8} height={8} rx={4} fill={p.color} opacity={0.8} transform={`rotate(${giro} ${CX} ${CY})`} />}
                <polygon points={hex(56)} transform={`translate(${x} ${y}) rotate(${30 + (separa > 0 ? 10 * Math.sin(t * 2 + k) * separa : 0)})`} fill={p.color} />
                <g transform={`translate(${x} ${y})`}>
                  {k === 0 && [0, 1, 2].map((j) => <circle key={j} cx={-18 + j * 18} cy={0} r={8} fill="#fff" />)}
                  {k === 1 && [[0, -16], [-16, 10], [16, 10]].map(([px, py], j) => <circle key={j} cx={px} cy={py} r={7} fill="#fff" />)}
                  {k === 2 && <ellipse rx={24} ry={16} fill="#fff" opacity={0.85} />}
                  {k === 3 && <rect x={-16} y={-20} width={32} height={40} rx={4} fill="#fff" />}
                  {k === 4 && <><rect x={-18} y={-14} width={36} height={26} rx={9} fill="#fff" /><rect x={-12} y={-8} width={24} height={12} rx={5} fill={TEAL} /></>}
                  {k === 5 && <path d="M -18 0 A 18 18 0 1 1 0 18" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />}
                </g>
              </g>
            );
          })}
        </g>
        {/* rótulo de la pieza que entra */}
        {PIEZAS.map((p, k) => { const a = M(p.n), b = k + 1 < PIEZAS.length ? M(PIEZAS[k + 1].n) : m('ninguna'); return t >= a && t < b && <g key={p.n} opacity={e1(t, a) * (1 - ac(t, b - 0.3, b))}><Letrero x={600} y={790} texto={p.txt} fondo={p.color} id={ID} /></g>; })}

        {/* ninguna funciona sola: tres fallas */}
        {[
          { n: 'aplanar' as N, x: 230, txt: 'Parálisis', color: AZUL_M, dib: (u: number) => <g><Rol id={ID} rol="ae" x={230} y={540} s={0.6} sigla={false} herramienta={false} /><rect x={180} y={420} width={100} height={130} rx={16} fill="#bae6fd" opacity={0.5 * u} /></g> },
          { n: 'documentar' as N, x: 600, txt: 'Carpetas olvidadas', color: AMBAR, dib: (u: number) => <g><rect x={520} y={420} width={160} height={110} rx={12} fill="#b45309" /><Hoja x={600} y={420} w={80} h={70} lineas={3} />{Array.from({ length: 8 }, (_, j) => <circle key={j} cx={530 + j * 20} cy={410 + 8 * Math.sin(j * 3)} r={3} fill="#9ca3af" opacity={u} />)}</g> },
          { n: 'tecnologia' as N, x: 970, txt: 'Datos que nadie mira', color: PIZARRA, dib: (u: number) => <g><Monitor x={970} y={560} w={200} h={120}><rect width={200} height={120} fill="#0b1220" />{[0, 1, 2, 3].map((j) => <rect key={j} x={20 + j * 44} y={100 - 20 - j * 18} width={30} height={20 + j * 18} rx={4} fill={VERDE} opacity={0.6} />)}</Monitor><path d="M 940 330 Q 970 345 1000 330" stroke={c.tenue} strokeWidth={5} fill="none" opacity={u} /></g> },
        ].map((f) => { const a = M(f.n); const fuera = 1 - ac(t, m('organigrama') - 0.4, m('organigrama')); return t >= a && (
          <g key={f.n} opacity={e1(t, a) * fuera}>
            {f.dib(sm(t, a + 0.5, a + 1.5))}
            <Letrero x={f.x} y={640} texto={f.txt} fondo={f.color} id={ID} tam={26} />
          </g>
        ); })}

        {/* no es un organigrama */}
        {t >= m('organigrama') && <g opacity={e1(t, m('organigrama')) * (1 - ac(t, m('predecible') - 0.3, m('predecible')))} transform="translate(1030 230)">
          <rect x={-22} y={-60} width={44} height={26} rx={6} fill="#94a3b8" />
          {[-50, 0, 50].map((dx) => <g key={dx}><rect x={dx - 18} y={0} width={36} height={22} rx={5} fill="#94a3b8" /><rect x={dx - 1} y={-34} width={2} height={34} fill="#94a3b8" /></g>)}
          <rect x={-51} y={-14} width={102} height={2} fill="#94a3b8" />
          <Cruz x={70} y={-60} r={20} op={sm(t, m('organigrama') + 0.6, m('organigrama') + 1)} />
        </g>}
        {t >= m('predecible') && ['Predecible', 'Escalable', 'Alto rendimiento'].map((s, k) => <g key={s} opacity={e1(t, m('predecible') + k * 0.5)}><Letrero x={[230, 600, 970][k]} y={790} texto={s} fondo={[AZUL_M, VERDE, `url(#${ID}-marca)`][k]} id={ID} tam={26} /></g>)}
      </Toma>
    </Lienzo>
  );
};
