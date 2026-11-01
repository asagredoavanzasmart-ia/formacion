import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Bloque, Flujo, Cruz, Visto, Hoja, Monitor, Rotulo, Persona, Txt, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Qué es Revenue Operations», en seis tomas.
 * 1 · Cuatro bloques en fila: personas, procesos, sistemas y datos; el elegido se eleva.
 * 2 · Personas: alguien encerrado en su caja, aislado del ciclo completo; la caja se abre y entra al anillo.
 * 3 · Procesos: una cotización se arma y se envía; la venta nueva y el upsell pasan por el mismo camino.
 * 4 · Sistemas: cada persona compra su aplicación favorita y cada jefatura llena su planilla.
 * 5 · Datos: marketing, ventas y servicio sueltan datos al mismo pozo; toda empresa ya hace RevOps, bien o mal.
 * 6 · Las operaciones tradicionales miran un pedazo del círculo; RevOps mira el círculo completo.
 */

const ID = 'ro03';
const nombres = ['bloques', 'componentes', 'eleva', 'personas', 'recurrentes', 'asumirlo', 'aislado', 'procesos', 'cotizar', 'enviarla', 'dos', 'sistemas', 'favorita', 'planilla', 'datos', 'genera', 'todaEmpresa', 'bienMal', 'tradicionales', 'pedazo', 'holistica', 'pregunta'] as const;
type N = typeof nombres[number];

const PILARES = [
  { txt: 'Personas', color: NARANJA },
  { txt: 'Procesos', color: ROSA },
  { txt: 'Sistemas', color: VIOLETA },
  { txt: 'Datos', color: AZUL_M },
];

export const PilaresRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Cuatro componentes'], [m('eleva'), 'Uno a la vez'],
    [m('personas'), 'Personas'], [m('aislado'), 'Nadie aislado del ciclo'],
    [m('procesos'), 'Procesos'], [m('dos'), 'Un solo camino'],
    [m('sistemas'), 'Sistemas'], [m('planilla'), 'Cada uno con lo suyo'],
    [m('datos'), 'Datos'], [m('todaEmpresa'), 'Toda empresa ya hace RevOps'],
    [m('tradicionales'), 'Operaciones tradicionales'], [m('holistica'), 'RevOps mira todo'],
  ];

  /* Toma 1 · el bloque que se eleva recorre los cuatro */
  const sel = t < m('eleva') ? -1 : Math.floor(((t - m('eleva')) / 1.1) % 4);

  /* Toma 4 · aplicaciones que brotan */
  const apps = Math.round(lerp(0, 8, ac(t, m('favorita'), m('favorita') + 3)));
  const hojas = Math.round(lerp(0, 5, ac(t, m('planilla'), m('planilla') + 2)));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Los cuatro componentes de RevOps">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · cuatro bloques en fila */}
      <Toma t={t} a={-1} b={m('personas')} zi={1}>
        <Suelo y={660} isDark={isDark} x0={120} x1={1080} />
        {PILARES.map((p, k) => {
          const entra = sm(t, m('bloques') + k * 0.35, m('bloques') + 0.6 + k * 0.35);
          if (entra <= 0.001) return null;
          const lift = sel === k ? 40 * (0.5 + 0.5 * Math.sin(Math.PI * (((t - m('eleva')) / 1.1) % 1))) : 0;
          return (
            <g key={p.txt} opacity={entra} transform={`translate(0 ${(1 - entra) * 40 - lift})`}>
              <Bloque x={240 + k * 240} y={500} w={190} h={60} color={p.color} alto={70} />
              {t >= m('componentes') && <Letrero x={240 + k * 240} y={720 + lift} texto={p.txt} fondo={p.color} id={ID} op={e1(t, m('componentes') + k * 0.3)} />}
            </g>
          );
        })}
      </Toma>

      {/* TOMA 2 · personas: aislado del ciclo completo */}
      <Toma t={t} a={m('personas')} b={m('procesos')}>
        {(() => {
          const abre = sm(t, m('aislado') + 0.8, m('aislado') + 2);
          const ang = t * 0.9;
          return (
            <g>
              {t >= m('recurrentes') && (
                <g opacity={e1(t, m('recurrentes'))}>
                  <circle cx={600} cy={450} r={270} fill="none" stroke={c.apagado} strokeWidth={18} />
                  <circle cx={600} cy={450} r={270} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={18} strokeDasharray={`${1700 * abre} 2000`} transform="rotate(-90 600 450)" />
                  {[0, 1, 2].map((j) => { const a = ang + (j * 2 * Math.PI) / 3; return <circle key={j} cx={600 + 270 * Math.cos(a)} cy={450 + 270 * Math.sin(a)} r={16} fill={[NARANJA, ROSA, TEAL][j]} />; })}
                  <Letrero x={600} y={150} texto="Ingresos recurrentes" fondo={PIZARRA} id={ID} op={1 - abre} />
                </g>
              )}
              <Persona id={ID} x={600} y={560} s={0.9} cuerpo={NARANJA} />
              {t >= m('asumirlo') && <Letrero x={600} y={610} texto="Hazlo tuyo" id={ID} op={e1(t, m('asumirlo')) * (1 - abre)} />}
              {/* la caja de vidrio que lo aísla */}
              <g opacity={(1 - abre) * e1(t, m('aislado'))}>
                <rect x={500} y={360 - 120 * abre} width={200} height={220} rx={14} fill="#93c5fd" opacity={0.35} />
                <rect x={500} y={360 - 120 * abre} width={200} height={14} rx={7} fill="#60a5fa" />
                <Letrero x={600} y={330} texto="Aislado" fondo={PIZARRA} id={ID} />
              </g>
              {abre > 0.6 && <Visto x={760} y={380} r={34} op={sm(t, m('aislado') + 1.6, m('aislado') + 2)} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 3 · procesos: cotizar de una sola manera */}
      <Toma t={t} a={m('procesos')} b={m('sistemas')}>
        <Suelo y={700} isDark={isDark} />
        {/* escritorio */}
        <rect x={150} y={540} width={360} height={22} rx={8} fill={isDark ? '#6b4f3a' : '#a16207'} />
        <rect x={170} y={562} width={16} height={138} fill={isDark ? '#57412f' : '#854d0e'} /><rect x={474} y={562} width={16} height={138} fill={isDark ? '#57412f' : '#854d0e'} />
        <Equipo id={ID} k="ven" x={250} y={700} s={0.75} t={t} nombre={false} distintivo={false} />
        {t >= m('cotizar') && (() => {
          const arma = sm(t, m('cotizar'), m('cotizar') + 1.5);
          const vuela = sm(t, m('enviarla'), m('enviarla') + 1.6);
          const x = lerp(420, 960, vuela), y = lerp(500, 360, vuela) - 120 * Math.sin(Math.PI * vuela);
          return (
            <g opacity={e1(t, m('cotizar'))}>
              <g transform={`translate(${x} ${y}) rotate(${vuela * 8})`}>
                <rect x={-60} y={-76} width={120} height={152} rx={10} fill="#fff" style={sombra(0.25, 3, 8)} />
                <Txt f="a" x={0} y={-44} textAnchor="middle" fontSize={20} fill={NARANJA} peso={700}>Cotización</Txt>
                {[0, 1, 2, 3].map((j) => <rect key={j} x={-44} y={-24 + j * 22} width={88 * Math.min(1, arma * 4 - j)} height={9} rx={4} fill="#cbd5e1" />)}
                <rect x={10} y={56} width={36 * arma} height={10} rx={5} fill={NARANJA} />
              </g>
              {vuela > 0.98 && <Persona id={ID} x={1000} y={700} s={0.7} cuerpo={AZUL_M} />}
              {vuela > 0.98 && <Letrero x={1000} y={760} texto="Cliente" fondo={AZUL_M} id={ID} />}
            </g>
          );
        })()}
        {t >= m('dos') && (
          <g opacity={e1(t, m('dos'))}>
            <Letrero x={760} y={180} texto="Venta nueva" fondo={VERDE} id={ID} />
            <Letrero x={760} y={260} texto="Upsell" fondo={VIOLETA} id={ID} />
            {(() => { const u = sm(t, m('dos') + 1, m('dos') + 2.2); return <g>
              <path d={`M 860 180 Q 920 180 ${lerp(920, 950, u)} ${lerp(180, 220, u)}`} stroke={VERDE} strokeWidth={7} fill="none" strokeLinecap="round" />
              <path d={`M 840 260 Q 920 260 ${lerp(920, 950, u)} ${lerp(260, 220, u)}`} stroke={VIOLETA} strokeWidth={7} fill="none" strokeLinecap="round" />
              {u > 0.9 && <Letrero x={1040} y={220} texto="Mismo proceso" id={ID} op={sm(t, m('dos') + 2, m('dos') + 2.4)} tam={24} />}
            </g>; })()}
          </g>
        )}
      </Toma>

      {/* TOMA 4 · sistemas: cada uno con su aplicación y su planilla */}
      <Toma t={t} a={m('sistemas')} b={m('datos')}>
        <Suelo y={700} isDark={isDark} />
        {[0, 1, 2, 3].map((k) => <Persona key={k} id={ID} x={220 + k * 250} y={700} s={0.6} cuerpo={[NARANJA, ROSA, TEAL, AMBAR][k]} />)}
        {Array.from({ length: apps }, (_, j) => {
          const k = j % 4, fila = Math.floor(j / 4);
          return <g key={j} transform={`translate(${220 + k * 250 + (fila ? 44 : -44)} ${430 - fila * 70 - 4 * Math.sin(t * 3 + j)})`}>
            <rect x={-28} y={-28} width={56} height={56} rx={14} fill={[VIOLETA, VERDE, AZUL_M, ROSA, NARANJA, TEAL, AMBAR, PIZARRA][j]} style={sombra(0.2, 2, 5)} />
            <rect x={-12} y={-12} width={24} height={24} rx={6} fill="#fff" opacity={0.85} />
          </g>;
        })}
        {t >= m('favorita') && <Letrero x={600} y={190} texto="Su aplicación favorita" id={ID} op={e1(t, m('favorita'))} />}
        {Array.from({ length: hojas }, (_, j) => <Hoja key={j} x={j < 3 ? 120 + j * 30 : 980 + j * 30} y={560 - (j % 3) * 14} w={90} h={60} lineas={3} color={VERDE} rot={(j % 2 ? 4 : -4)} />)}
        {t >= m('planilla') && <Letrero x={600} y={770} texto="Cada jefatura, su planilla" fondo={PIZARRA} id={ID} op={e1(t, m('planilla'))} />}
      </Toma>

      {/* TOMA 5 · datos: todo genera datos */}
      <Toma t={t} a={m('datos')} b={m('tradicionales')}>
        <Suelo y={720} isDark={isDark} />
        {(['mkt', 'ven', 'ser'] as const).map((k, j) => <Equipo key={k} id={ID} k={k} x={230 + j * 370} y={720} s={0.7} t={t} nombre={k === 'ser' ? 'Servicio' : true} />)}
        {t >= m('genera') && [0, 1, 2].map((j) => <Flujo key={j} x1={230 + j * 370} y1={560} x2={600} y2={300} t={t + j * 0.4} n={5} vel={0.55} arco={60} color={[AMBAR, NARANJA, TEAL][j]} r={8} op={e1(t, m('genera'))} />)}
        {t >= m('genera') && (
          <g opacity={e1(t, m('genera'))}>
            {[0, 1, 2].map((q) => <ellipse key={q} cx={600} cy={300 - q * 26} rx={90} ry={26} fill={AZUL_M} opacity={1 - q * 0.18} />)}
            <Letrero x={760} y={260} texto="Datos" fondo={AZUL_M} id={ID} ancla="start" />
          </g>
        )}
        {t >= m('todaEmpresa') && <Letrero x={600} y={150} texto="Toda empresa ya hace RevOps" id={ID} op={e1(t, m('todaEmpresa'))} />}
        {t >= m('bienMal') && (
          <g opacity={e1(t, m('bienMal'))}>
            <Visto x={300} y={300} r={30} /><Txt f="a" x={340} y={310} fontSize={26} fill={c.texto}>bien</Txt>
            <Cruz x={820} y={380} r={30} /><Txt f="a" x={860} y={390} fontSize={26} fill={c.texto}>o mal</Txt>
          </g>
        )}
      </Toma>

      {/* TOMA 6 · un pedazo frente al círculo completo */}
      <Toma t={t} a={m('tradicionales')} b={fin + 1}>
        {(() => {
          const junta = sm(t, m('holistica'), m('holistica') + 1.8);
          const ops = [{ n: 'Sales Ops', color: NARANJA }, { n: 'Marketing Ops', color: AMBAR }, { n: 'CS Ops', color: TEAL }];
          return (
            <g>
              {ops.map((o, k) => {
                const a0 = -Math.PI / 2 + (k * 2 * Math.PI) / 3, a1 = a0 + (2 * Math.PI) / 3;
                const sep = (1 - junta) * 110;
                const dx = sep * Math.cos((a0 + a1) / 2), dy = sep * Math.sin((a0 + a1) / 2);
                const r = 190;
                const d = `M 0 0 L ${r * Math.cos(a0)} ${r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${r * Math.cos(a1)} ${r * Math.sin(a1)} Z`;
                const lx = 330 * Math.cos((a0 + a1) / 2), ly = 330 * Math.sin((a0 + a1) / 2);
                return t >= m('tradicionales') + k * 0.3 && (
                  <g key={o.n} opacity={e1(t, m('tradicionales') + k * 0.3)} transform={`translate(${600 + dx} ${470 + dy})`}>
                    <path d={d} fill={o.color} opacity={t >= m('pedazo') && junta < 0.5 ? 0.95 : 0.85} />
                    <g opacity={1 - junta}><Letrero x={lx} y={ly} texto={o.n} fondo={o.color} id={ID} tam={24} /></g>
                  </g>
                );
              })}
              {t >= m('pedazo') && <g opacity={e1(t, m('pedazo')) * (1 - junta)}><Letrero x={600} y={800} texto="Cada uno mira su pedazo" fondo={PIZARRA} id={ID} /></g>}
              {junta > 0.05 && (
                <g opacity={junta}>
                  <circle cx={600} cy={470} r={230} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={14} strokeDasharray="20 14" strokeDashoffset={-t * 40} />
                  <Equipo id={ID} k="ops" x={600} y={545} s={0.6} t={t} nombre={false} />
                  <Letrero x={600} y={800} texto="RevOps: el ciclo completo" id={ID} />
                </g>
              )}
            </g>
          );
        })()}
      </Toma>
    </Lienzo>
  );
};
