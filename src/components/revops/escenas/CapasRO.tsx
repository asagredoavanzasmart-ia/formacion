import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Cruz, Visto, Rotulo, Persona, Txt, Engranaje, Calendario, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Cómo crece el equipo», en cuatro tomas.
 * 1 · Tres tipos de personas bajo operaciones (ejecutan la misión, administran sistemas, hacen análisis) que se suman
 *     en equilibrio: una balanza que se inclina si llega demasiado de un tipo.
 * 2 · Cuatro momentos: una persona que hace malabares con todo hasta el punto de quiebre; + sistemas; + análisis; escala.
 * 3 · Semple: muchos administradores tejen configuraciones a medida que traban los cambios; sumarlos despacio.
 * 4 · Los líderes tienden puentes con marketing, ventas y servicio; sin ese puente, «prevención de ventas».
 */

const ID = 'ro46';
const nombres = ['tipos', 'ejecutan', 'administran', 'analisis', 'equilibrio', 'desequilibrios', 'cuatro', 'una', 'quiebre', 'estirado', 'sistemas', 'nibur', 'boton', 'analisis2', 'escala', 'meses', 'semple', 'personalizadas', 'despacio', 'lideres', 'vacio', 'davidoff', 'prevencion', 'pregunta'] as const;
type N = typeof nombres[number];

export const CapasRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Tres tipos de personas'], [m('equilibrio'), 'En equilibrio'], [m('cuatro'), 'Cuatro momentos'],
    [m('una'), '1 · Una persona'], [m('sistemas'), '2 · + Sistemas'], [m('analisis2'), '3 · + Análisis'], [m('escala'), '4 · Escala'],
    [m('semple'), 'Sumar administradores despacio'], [m('lideres'), 'Los líderes tienden puentes'],
  ];

  const momento = t >= m('escala') ? 3 : t >= m('analisis2') ? 2 : t >= m('sistemas') ? 1 : t >= m('una') ? 0 : -1;

  const Sis = ({ x, y }: { x: number; y: number }) => <g><Persona id={ID} x={x} y={y} s={0.5} cuerpo={VIOLETA} /><Engranaje x={x + 40} y={y - 90} r={18} t={t} color={VIOLETA} hueco={c.panel} /></g>;
  const Ana = ({ x, y }: { x: number; y: number }) => <g><Persona id={ID} x={x} y={y} s={0.5} cuerpo={AZUL_M} /><g transform={`translate(${x + 30} ${y - 110})`}>{[0, 1, 2].map((j) => <rect key={j} x={j * 12} y={20 - j * 8} width={9} height={14 + j * 8} rx={2} fill={AZUL_M} />)}</g></g>;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Cómo crece el equipo de operaciones">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · tres tipos y el equilibrio */}
      <Toma t={t} a={-1} b={m('cuatro')} zi={1}>
        {t < m('equilibrio') && <g opacity={1 - ac(t, m('equilibrio') - 0.4, m('equilibrio'))}>
          <Suelo y={640} isDark={isDark} />
          {t >= m('ejecutan') && <g opacity={e1(t, m('ejecutan'))}>{(['ser', 'ven', 'mkt'] as const).map((k, j) => <Equipo key={k} id={ID} k={k} x={160 + j * 100} y={640} s={0.45} t={t} nombre={false} />)}<Letrero x={260} y={700} texto="Ejecutan la misión" fondo={NARANJA} id={ID} tam={22} /></g>}
          {t >= m('administran') && <g opacity={e1(t, m('administran'))}><Sis x={600} y={640} /><Letrero x={600} y={700} texto="Administran sistemas" fondo={VIOLETA} id={ID} tam={22} /></g>}
          {t >= m('analisis') && <g opacity={e1(t, m('analisis'))}><Ana x={940} y={640} /><Letrero x={940} y={700} texto="Hacen análisis" fondo={AZUL_M} id={ID} tam={22} /></g>}
        </g>}
        {t >= m('equilibrio') && (() => { const inc = t >= m('desequilibrios') ? 14 * sm(t, m('desequilibrios'), m('desequilibrios') + 1) : 2 * Math.sin(t * 2); return (
          <g opacity={e1(t, m('equilibrio'))}>
            <rect x={590} y={320} width={20} height={330} fill={PIZARRA} /><path d="M 540 650 h 120 l -30 -40 h -60 Z" fill={PIZARRA} />
            <g transform={`rotate(${-inc} 600 320)`}>
              <rect x={300} y={312} width={600} height={14} rx={7} fill={c.texto} />
              <g transform="translate(360 326)"><path d="M -60 0 L -80 70 H 80 L 60 0 Z" fill={VIOLETA} opacity={0.6} />{Array.from({ length: t >= m('desequilibrios') ? 4 : 1 }, (_, k) => <Persona key={k} id={ID} x={-40 + k * 26} y={60} s={0.22} cuerpo={VIOLETA} />)}</g>
              <g transform="translate(840 326)"><path d="M -60 0 L -80 70 H 80 L 60 0 Z" fill={AZUL_M} opacity={0.6} /><Persona id={ID} x={0} y={60} s={0.22} cuerpo={AZUL_M} /></g>
            </g>
            {t >= m('desequilibrios') && <Letrero x={600} y={740} texto="Demasiados de un tipo: el equipo se frena" fondo={ROJO_M} id={ID} op={e1(t, m('desequilibrios'))} tam={22} />}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 2 · cuatro momentos */}
      <Toma t={t} a={m('cuatro')} b={m('semple')}>
        {['Una persona', '+ Sistemas', '+ Análisis', 'Escala'].map((txt, k) => <g key={txt} opacity={e1(t, m('cuatro') + k * 0.25) * (momento >= 0 && momento !== k ? 0.4 : 1)}><Letrero x={190 + k * 275} y={170} texto={`${k + 1} · ${txt}`} fondo={[NARANJA, VIOLETA, AZUL_M, VERDE][k]} id={ID} tam={22} /></g>)}
        <Suelo y={680} isDark={isDark} />
        {momento === 0 && <g opacity={e1(t, m('una'))}>
          {(() => { const est = t >= m('estirado') ? 1 : 0; return <g>
            <Equipo id={ID} k="ops" x={600} y={680} s={0.85} t={t} nombre={false} distintivo={false} />
            {[0, 1, 2].map((k) => { const a = t * (3 + est * 2) + (k * 2 * Math.PI) / 3; return <circle key={k} cx={600 + 130 * Math.cos(a)} cy={360 + 60 * Math.sin(a)} r={22} fill={[VIOLETA, AZUL_M, NARANJA][k]} />; })}
            {t >= m('quiebre') && <g opacity={e1(t, m('quiebre'))}><Letrero x={600} y={760} texto="«Tan estirado que no hago nada bien»" fondo={ROJO_M} id={ID} tam={22} />{[0, 1].map((j) => <path key={j} d={`M ${560 + j * 80} ${530 + ((t * 1.3 + j / 2) % 1) * 30} q -6 10 0 14 q 6 -4 0 -14 Z`} fill="#7dd3fc" />)}</g>}
          </g>; })()}
        </g>}
        {momento === 1 && <g opacity={e1(t, m('sistemas'))}>
          <Equipo id={ID} k="ops" x={420} y={680} s={0.75} t={t} nombre={false} distintivo={false} />
          <Sis x={760} y={680} />
          {t >= m('boton') && <g opacity={e1(t, m('boton'))}>{[0, 1, 2, 3].map((k) => <rect key={k} x={880 + (k % 2) * 70} y={360 + Math.floor(k / 2) * 70} width={56} height={56} rx={12} fill={[VERDE, AMBAR, ROSA, AZUL_M][k]} />)}<Letrero x={950} y={540} texto="Cada botón, cada clic" fondo={VIOLETA} id={ID} tam={20} /></g>}
          {t >= m('nibur') && <Letrero x={420} y={760} texto="Contratación crítica temprana" fondo={VIOLETA} id={ID} op={e1(t, m('nibur'))} tam={22} />}
        </g>}
        {momento === 2 && <g opacity={e1(t, m('analisis2'))}>
          <Equipo id={ID} k="ops" x={300} y={680} s={0.7} t={t} nombre={false} distintivo={false} />
          <Sis x={580} y={680} /><Ana x={860} y={680} />
          <Letrero x={860} y={760} texto="Datos que se vuelven decisiones" fondo={AZUL_M} id={ID} tam={20} />
        </g>}
        {momento === 3 && <g opacity={e1(t, m('escala'))}>
          <Equipo id={ID} k="ops" x={200} y={680} s={0.65} t={t} nombre={false} distintivo={false} />
          <Sis x={420} y={680} /><Sis x={580} y={680} /><Ana x={760} y={680} /><Ana x={920} y={680} />
          {t >= m('meses') && <g opacity={e1(t, m('meses'))}><Calendario x={1050} y={420} s={0.6} marcados={10} /><Letrero x={700} y={760} texto="Según los problemas de 6 a 12 meses" fondo={VERDE} id={ID} tam={20} /></g>}
        </g>}
      </Toma>

      {/* TOMA 3 · Semple: administradores */}
      <Toma t={t} a={m('semple')} b={m('lideres')}>
        {(() => { const n = t >= m('personalizadas') ? 4 : 2; return (
          <g>
            <Suelo y={700} isDark={isDark} />
            {Array.from({ length: n }, (_, k) => <Sis key={k} x={180 + k * 120} y={700} />)}
            {t >= m('personalizadas') && <g opacity={e1(t, m('personalizadas'))}>
              <rect x={680} y={280} width={380} height={300} rx={20} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
              {Array.from({ length: 7 }, (_, k) => <path key={k} d={`M 700 ${310 + k * 36} C 800 ${250 + k * 50} 900 ${420 - k * 20} 1040 ${330 + ((k * 61) % 220)}`} stroke={[AMBAR, ROSA, VIOLETA, AZUL_M, VERDE, NARANJA, TEAL][k]} strokeWidth={5} fill="none" />)}
              <g transform="translate(1040 270)"><rect x={-26} y={-6} width={52} height={44} rx={8} fill={PIZARRA} /><path d="M -14 -6 v -14 a 14 14 0 0 1 28 0 v 14" stroke={PIZARRA} strokeWidth={7} fill="none" /></g>
              <Letrero x={870} y={630} texto="Configuraciones a medida: cambios trabados" fondo={ROJO_M} id={ID} tam={20} />
            </g>}
            {t >= m('despacio') && <Letrero x={600} y={190} texto="Sumarlos despacio protege la flexibilidad" fondo={VERDE} id={ID} op={e1(t, m('despacio'))} tam={22} />}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 4 · puentes */}
      <Toma t={t} a={m('lideres')} b={fin + 1}>
        {(() => { const sinPuente = t >= m('davidoff'); return (
          <g>
            <Suelo y={700} isDark={isDark} x0={60} x1={500} /><Suelo y={700} isDark={isDark} x0={700} x1={1140} />
            <Equipo id={ID} k="ops" x={220} y={700} s={0.7} t={t} nombre={false} />
            <Sis x={380} y={700} />
            {(['mkt', 'ven', 'ser'] as const).map((k, j) => <Equipo key={k} id={ID} k={k} x={800 + j * 120} y={700} s={0.55} t={t} nombre={false} />)}
            <path d="M 500 690 Q 600 600 700 690" stroke={sinPuente ? ROJO_M : NARANJA} strokeWidth={14} fill="none" strokeDasharray={sinPuente ? '20 30' : 'none'} opacity={sinPuente ? 0.5 : 1} />
            {!sinPuente && <Letrero x={600} y={560} texto="Relación con cada equipo" id={ID} tam={22} />}
            {t >= m('vacio') && !sinPuente && <Letrero x={600} y={300} texto="Así nadie optimiza en el vacío" fondo={VERDE} id={ID} op={e1(t, m('vacio'))} tam={22} />}
            {t >= m('prevencion') && (() => { const g = sm(t, m('prevencion'), m('prevencion') + 0.4); return <g transform={`translate(900 360) rotate(-10) scale(${lerp(1.4, 1, g)})`} opacity={g}><rect x={-200} y={-50} width={400} height={100} rx={14} fill="none" stroke={ROJO_M} strokeWidth={8} /><Txt f="a" x={0} y={12} textAnchor="middle" fontSize={26} fill={ROJO_M} peso={800}>PREVENCIÓN DE VENTAS</Txt></g>; })()}
            {sinPuente && <Letrero x={300} y={300} texto="«Sus procesos y sus reglas»" fondo={PIZARRA} id={ID} op={e1(t, m('davidoff'))} tam={22} />}
          </g>
        ); })()}
      </Toma>
    </Lienzo>
  );
};
