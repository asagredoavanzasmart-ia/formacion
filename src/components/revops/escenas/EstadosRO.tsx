import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Calendario, Bloque, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, azar, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «¿Tu proceso funciona, experimenta o se agita?», en cuatro tomas.
 * 1 · Tres estados y una revisión cada trimestre; el otro lado también decide (el plan choca con el comprador).
 * 2 · Thulin y Wilson: preguntar a ganados y perdidos; ese aprendizaje casi nunca vuelve al inicio del proceso.
 * 3 · La plataforma del proceso: en armonía dos puntos orbitan; al experimentar, dos zonas pulsan; al agitarse,
 *     se apaga y los puntos cruzan sin control. A la derecha, qué hacer en cada estado.
 * 4 · Cuando un negocio se pierde con el mismo proceso: ¿qué cambió? cliente, mercado u oferta.
 */

const ID = 'ro30';
const nombres = ['estados', 'tresMeses', 'davidoff', 'otroLado', 'thulin', 'ganados', 'vuelve', 'plataforma', 'armonia', 'experimentar', 'agitarse', 'funciona', 'ochenta', 'relajarse', 'casey', 'experimenta', 'escuchar', 'ab', 'unoDos', 'agita', 'saltar', 'corrosivo', 'britton', 'perdiste', 'cambio', 'analizar', 'pregunta'] as const;
type N = typeof nombres[number];

export const EstadosRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Tres estados'], [m('tresMeses'), 'Revisar cada tres meses'], [m('thulin'), 'Preguntar a ganados y perdidos'],
    [m('plataforma'), 'La plataforma del proceso'], [m('funciona'), 'Funciona en armonía'], [m('experimenta'), 'Experimenta'], [m('agita'), 'Se agita sin control'],
    [m('perdiste'), 'Si se pierde con el mismo proceso'],
  ];

  /* estado de la plataforma: 0 armonía, 1 experimenta, 2 agita */
  const est = t >= m('agita') ? 2 : t >= m('experimenta') ? 1 : t >= m('funciona') ? 0 : t >= m('agitarse') ? 2 : t >= m('experimentar') ? 1 : 0;
  const Plataforma = ({ cx, cy }: { cx: number; cy: number }) => (
    <g>
      <ellipse cx={cx} cy={cy + 20} rx={230} ry={70} fill="#000" opacity={0.1} />
      <ellipse cx={cx} cy={cy} rx={230} ry={70} fill={est === 2 ? '#94a3b8' : `url(#${ID}-marca)`} opacity={est === 2 ? 0.5 : 0.9} />
      <ellipse cx={cx} cy={cy - 8} rx={200} ry={56} fill="#fff" opacity={0.2} />
      {est === 1 && [[-110, 0], [100, -10]].map(([dx, dy], k) => <circle key={k} cx={cx + dx} cy={cy + dy} r={30 + 12 * Math.sin(t * 5 + k)} fill={AMBAR} opacity={0.45} />)}
      {[0, 1, 2].map((k) => {
        if (est === 0 && k === 2) return null;
        if (est === 1 && k > 0) return null;
        let x, y;
        if (est === 2) { const ph = (t * (0.7 + 0.2 * k) + azar(k)) % 1; x = cx - 260 + 520 * ph; y = cy - 60 + 120 * azar(k + Math.floor(t * 0.7 + azar(k))); }
        else { const a = t * 1.6 + k * Math.PI; x = cx + 170 * Math.cos(a); y = cy + 46 * Math.sin(a); }
        return <circle key={k} cx={x} cy={y - 12} r={14} fill={est === 2 ? ROJO_M : '#fff'} stroke={NARANJA} strokeWidth={est === 2 ? 0 : 5} />;
      })}
    </g>
  );

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="¿Tu proceso funciona, experimenta o se agita?">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · tres estados, cada trimestre */}
      <Toma t={t} a={-1} b={m('thulin')} zi={1}>
        {['Funciona', 'Experimenta', 'Se agita'].map((txt, k) => <g key={txt} opacity={e1(t, m('estados') + k * 0.3)}><Letrero x={260 + k * 340} y={200} texto={txt} fondo={[VERDE, AMBAR, ROJO_M][k]} id={ID} /></g>)}
        {t >= m('tresMeses') && <g opacity={e1(t, m('tresMeses'))}><Calendario x={300} y={450} s={1.1} marcados={Math.min(14, Math.floor((t - m('tresMeses')) * 4))} /><Letrero x={300} y={600} texto="Cada trimestre: medir y aprender" fondo={PIZARRA} id={ID} tam={22} /></g>}
        {t >= m('otroLado') && (() => { const choca = sm(t, m('otroLado') + 0.5, m('otroLado') + 1.5); return (
          <g opacity={e1(t, m('otroLado'))}>
            <g transform={`translate(${lerp(640, 760, choca)} 520) rotate(${choca * 25})`}><rect x={-60} y={-80} width={120} height={160} rx={10} fill="#fff" style={sombra(0.25, 3, 8)} />{[0, 1, 2, 3].map((j) => <rect key={j} x={-40} y={-50 + j * 30} width={80} height={10} rx={5} fill="#cbd5e1" />)}<Txt f="a" x={0} y={-58} textAnchor="middle" fontSize={18} fill={NARANJA} peso={700}>Plan</Txt></g>
            <Persona id={ID} x={960} y={700} s={0.8} cuerpo={AZUL_M} />
            <Letrero x={900} y={770} texto="El otro lado también decide" fondo={AZUL_M} id={ID} tam={22} />
          </g>
        ); })()}
      </Toma>

      {/* TOMA 2 · ganados y perdidos */}
      <Toma t={t} a={m('thulin')} b={m('plataforma')}>
        <Suelo y={700} isDark={isDark} />
        {t >= m('ganados') && <g opacity={e1(t, m('ganados'))}>
          <Persona id={ID} x={760} y={700} s={0.6} cuerpo={VERDE} /><Visto x={760} y={500} r={24} />
          <Persona id={ID} x={940} y={700} s={0.6} cuerpo="#94a3b8" /><Cruz x={940} y={500} r={24} />
          <Equipo id={ID} k="ven" x={330} y={700} s={0.7} t={t} nombre={false} />
          <Txt x={560} y={560} fontSize={80} fill={NARANJA} peso={800}>?</Txt>
        </g>}
        {t >= m('vuelve') && <g opacity={e1(t, m('vuelve'))}>
          <path d="M 860 400 C 760 220 400 220 300 400" stroke={c.apagado} strokeWidth={8} fill="none" strokeDasharray="16 12" />
          <rect x={560} y={230} width={14} height={60} rx={6} fill={ROJO_M} transform="rotate(30 567 260)" />
          <Letrero x={580} y={180} texto="El aprendizaje no vuelve al inicio" fondo={ROJO_M} id={ID} tam={22} />
        </g>}
      </Toma>

      {/* TOMA 3 · la plataforma y qué hacer */}
      <Toma t={t} a={m('plataforma')} b={m('perdiste')}>
        <Plataforma cx={320} cy={460} />
        <Letrero x={320} y={620} texto={['Ritmo estable y predecible', 'Pruebas controladas, una a la vez', 'Cambios sin control'][est]} fondo={[VERDE, AMBAR, ROJO_M][est]} id={ID} tam={22} />
        {t >= m('funciona') && (() => {
          const items: [N, string][][] = [
            [['ochenta', 'Más del 80 % cumple su cuota'], ['relajarse', 'No relajarse: el mercado cambia'], ['casey', 'Más de lo que rinde, menos ruido']],
            [['escuchar', 'Escuchar a la primera línea'], ['ab', 'Copiar al mejor y probar A/B'], ['unoDos', 'El «uno-dos» entre líderes']],
            [['saltar', 'Saltar de solución en solución'], ['corrosivo', 'Corrosivo: nunca debería pasar'], ['britton', 'Del cuadrante de crisis al proactivo']],
          ];
          return items[est].map(([n, txt], k) => t >= m(n) && (
            <g key={n} opacity={e1(t, m(n))}>
              <rect x={600} y={240 + k * 140} width={500} height={110} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
              <rect x={600} y={240 + k * 140} width={12} height={110} rx={6} fill={[VERDE, AMBAR, ROJO_M][est]} />
              <Txt f="a" x={640} y={303 + k * 140} fontSize={24} fill={c.texto}>{txt}</Txt>
            </g>
          ));
        })()}
      </Toma>

      {/* TOMA 4 · ¿qué cambió? */}
      <Toma t={t} a={m('perdiste')} b={fin + 1}>
        <Persona id={ID} x={600} y={560} s={0.8} cuerpo="#94a3b8" />
        <Cruz x={600} y={330} r={30} op={e1(t, m('perdiste'))} />
        {t >= m('cambio') && ['¿El cliente?', '¿El mercado?', '¿La oferta?'].map((txt, k) => <g key={txt} opacity={e1(t, m('cambio') + k * 0.4)}><Letrero x={260 + k * 340} y={680} texto={txt} fondo={[AZUL_M, VIOLETA, NARANJA][k]} id={ID} /></g>)}
        {t >= m('analizar') && <Letrero x={600} y={790} texto="Analizar antes de cambiar todo el proceso" fondo={PIZARRA} id={ID} op={e1(t, m('analizar'))} tam={24} />}
      </Toma>
    </Lienzo>
  );
};
