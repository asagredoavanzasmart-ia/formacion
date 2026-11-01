import React from 'react';
import { useMovil, Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Edificio, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Los cuatro filtros de cada etapa», en cinco tomas.
 * 1 · Todos los pasos de una venta, en una lista larga, pasan por cuatro filtros: lo que no pasa se tacha o se reescribe.
 * 2 · El contexto: un proceso es una fila de casilleros por los que avanza cada negocio; ¿cuáles merecen existir?
 * 3 · Por qué: «voy llegando» significa cosas distintas (uno en la puerta, otro saliendo de su casa).
 * 4 · Para qué y cómo impacta: etapas del pipeline, un pronóstico confiable, revisión con evidencia, aprendizaje rápido.
 * 5 · El ejercicio: ocho pasos candidatos, cuatro filtros que se activan en orden y un contador que baja de 8 a 3.
 */

const ID = 'ro27';
const nombres = ['cuatroF', 'tacha', 'contexto', 'casilleros', 'merecen', 'veinte', 'porQue', 'propuesta', 'llegando', 'puerta', 'paraQue', 'pipeline', 'impacta', 'pronostico', 'evidencia', 'nueva', 'evaluacion', 'ejercicio', 'ocho', 'filtros4', 'contador', 'requerido', 'caen2', 'paso2', 'paso3', 'seis', 'factual', 'paso4', 'cinco', 'inspeccionable', 'crm', 'paso5', 'cuatroQ', 'centrado', 'paso6', 'reescribe', 'tres', 'marca', 'ochoTres', 'pregunta'] as const;
type N = typeof nombres[number];

const PASOS = [
  { txt: 'Asiste a la consultoría', cae: null as N | null },
  { txt: 'Insiste si no responde', cae: 'paso2' as N },
  { txt: 'Tercera reunión igual', cae: 'paso3' as N },
  { txt: 'Disfruta la consultoría', cae: 'paso4' as N },
  { txt: 'Lo ve con su directorio', cae: 'paso5' as N },
  { txt: 'Le dimos la demo', cae: 'reescribe' as N },
  { txt: 'Agenda segunda reunión', cae: null as N | null },
  { txt: 'Confirma pasos por correo', cae: null as N | null },
];
const FILTROS: { n: N; txt: string; col: string }[] = [
  { n: 'requerido', txt: 'Requerido', col: AZUL_M }, { n: 'factual', txt: 'Factual', col: VIOLETA },
  { n: 'inspeccionable', txt: 'Inspeccionable', col: TEAL }, { n: 'centrado', txt: 'Centrado en el comprador', col: NARANJA },
];

export const FiltrosRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Los cuatro filtros'], [m('contexto'), 'Primero, el contexto'], [m('porQue'), 'Por qué se hace'], [m('paraQue'), 'Para qué sirve'], [m('impacta'), 'Cómo impacta'],
    [m('ejercicio'), 'El ejercicio'], [m('requerido'), '1 · ¿Ocurre siempre?'], [m('factual'), '2 · ¿Es un hecho?'], [m('inspeccionable'), '3 · ¿Queda registro?'], [m('centrado'), '4 · ¿Lo logra el comprador?'], [m('marca'), 'Tres etapas'],
  ];

  const movil = useMovil();
  const quedan = 8 - PASOS.filter((p) => p.cae && p.cae !== 'reescribe' && t >= m(p.cae)).length - (t >= m('reescribe') ? 0 : 0) - (t >= m('paso6') ? 1 : 0);
  const filtroActivo = FILTROS.reduce((a, f, k) => (t >= m(f.n) ? k : a), -1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Los cuatro filtros de cada etapa">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · la lista larga y los filtros */}
      <Toma t={t} a={-1} b={m('contexto')} zi={1}>
        {Array.from({ length: 9 }, (_, k) => { const ph = ((t * 0.3 + k / 9) % 1); const pasa = k % 3 === 0; return (
          <g key={k} opacity={Math.min(1, ph * 6, (1 - ph) * 6)}><Hoja x={lerp(200, 980, ph)} y={pasa ? 470 : lerp(470, 720, Math.max(0, ph - 0.45) * 2)} w={80} h={56} lineas={2} color={pasa ? NARANJA : '#94a3b8'} /></g>
        ); })}
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={e1(t, m('cuatroF') + k * 0.25)}><rect x={360 + k * 130} y={360} width={40} height={230} rx={14} fill={FILTROS[k].col} opacity={0.85} />{Array.from({ length: 5 }, (_, j) => <rect key={j} x={364 + k * 130} y={380 + j * 42} width={32} height={10} rx={5} fill="#fff" opacity={0.6} />)}</g>)}
        {t >= m('tacha') && <Letrero x={600} y={220} texto="Lo que no pasa: se tacha o se reescribe" fondo={PIZARRA} id={ID} op={e1(t, m('tacha'))} tam={24} />}
      </Toma>

      {/* TOMA 2 · casilleros */}
      <Toma t={t} a={m('contexto')} b={m('porQue')}>
        {['Primera reunión', 'Propuesta', 'Cierre'].map((txt, k) => <g key={txt} opacity={e1(t, m('casilleros') + k * 0.3)}>
          <rect x={210 + k * 280} y={300} width={220} height={260} rx={18} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <rect x={230 + k * 280} y={320} width={180} height={150} rx={12} fill={c.panel2} />
          <circle cx={390 + k * 280} cy={510} r={10} fill={PIZARRA} />
          <Txt f="a" x={320 + k * 280} y={610} textAnchor="middle" fontSize={24} fill={c.texto} peso={700}>{txt}</Txt>
        </g>)}
        {t >= m('casilleros') && (() => { const u = ((t - m('casilleros')) * 0.25) % 1; const k = Math.min(2, Math.floor(u * 3)); return <g transform={`translate(${320 + k * 280} 400)`}><rect x={-50} y={-34} width={100} height={68} rx={10} fill={NARANJA} /><rect x={-36} y={-10} width={72} height={10} rx={5} fill="#fff" opacity={0.8} /></g>; })()}
        {t >= m('merecen') && <Letrero x={600} y={200} texto="¿Cuáles merecen existir?" id={ID} op={e1(t, m('merecen'))} />}
        {t >= m('veinte') && <Letrero x={600} y={700} texto="20 o 30 cosas: la mayoría no es etapa" fondo={PIZARRA} id={ID} op={e1(t, m('veinte'))} tam={24} />}
      </Toma>

      {/* TOMA 3 · voy llegando */}
      <Toma t={t} a={m('porQue')} b={m('paraQue')}>
        <Suelo y={660} isDark={isDark} />
        {t >= m('propuesta') && <g opacity={e1(t, m('propuesta')) * (1 - ac(t, m('llegando') - 0.3, m('llegando')))}>
          <Letrero x={340} y={300} texto="«Propuesta» = la envié" fondo={AMBAR} id={ID} />
          <Letrero x={860} y={300} texto="«Propuesta» = la aceptó" fondo={VIOLETA} id={ID} />
        </g>}
        {t >= m('llegando') && <g opacity={e1(t, m('llegando'))}>
          <Edificio x={250} y={660} w={160} h={220} color={PIZARRA} />
          <rect x={300} y={580} width={50} height={80} rx={6} fill="#fde68a" />
          <Persona id={ID} x={390} y={660} s={0.6} cuerpo={AZUL_M} />
          <Burbujita x={400} y={420} txt="Voy llegando" c={c} />
          <path d="M 850 660 V 520 L 950 450 L 1050 520 V 660 Z" fill={ROSA} opacity={0.85} />
          <rect x={930} y={590} width={40} height={70} rx={6} fill="#fff" opacity={0.8} />
          <Persona id={ID} x={lerp(950, 900, (t * 0.2) % 1)} y={660} s={0.6} cuerpo={VERDE} />
          <Burbujita x={800} y={420} txt="Voy llegando" c={c} />
          {t >= m('puerta') && <><Letrero x={330} y={720} texto="Está en la puerta" fondo={AZUL_M} id={ID} tam={22} /><Letrero x={950} y={720} texto="Recién sale de su casa" fondo={VERDE} id={ID} tam={22} /></>}
        </g>}
      </Toma>

      {/* TOMA 4 · para qué y cómo impacta */}
      <Toma t={t} a={m('paraQue')} b={m('ejercicio')}>
        {t >= m('pipeline') && ['Etapa 1', 'Etapa 2', 'Etapa 3'].map((txt, k) => <g key={txt} opacity={e1(t, m('pipeline') + k * 0.3)}><rect x={200 + k * 280} y={180} width={240} height={70} rx={14} fill={[AZUL_M, VIOLETA, NARANJA][k]} /><Txt f="a" x={320 + k * 280} y={225} textAnchor="middle" fontSize={24} fill="#fff" peso={700}>{txt}</Txt></g>)}
        {t >= m('pronostico') && <g opacity={e1(t, m('pronostico'))} transform="translate(300 470)"><path d="M -110 0 A 110 110 0 0 1 110 0" fill="none" stroke={c.apagado} strokeWidth={22} /><path d="M -110 0 A 110 110 0 0 1 78 -78" fill="none" stroke={VERDE} strokeWidth={22} /><Letrero x={0} y={60} texto="Pronóstico confiable" fondo={VERDE} id={ID} tam={22} /></g>}
        {t >= m('evidencia') && <g opacity={e1(t, m('evidencia'))}><Persona id={ID} x={600} y={560} s={0.6} cuerpo={PIZARRA} corbata /><Hoja x={660} y={430} w={80} h={100} lineas={4} /><Visto x={720} y={420} r={20} /><Letrero x={620} y={620} texto="Revisión con evidencia" fondo={PIZARRA} id={ID} tam={22} /></g>}
        {t >= m('nueva') && <g opacity={e1(t, m('nueva'))}><Persona id={ID} x={930} y={560} s={0.6} cuerpo={TEAL} /><Letrero x={930} y={620} texto="Aprende más rápido" fondo={TEAL} id={ID} tam={22} /></g>}
        {t >= m('evaluacion') && <Letrero x={600} y={760} texto="«En evaluación»: todos entienden igual" id={ID} op={e1(t, m('evaluacion'))} tam={24} />}
      </Toma>

      {/* TOMA 5 · el ejercicio */}
      <Toma t={t} a={m('ejercicio')} b={fin + 1}>
        {/* filtros a la izquierda */}
        {t >= m('filtros4') && FILTROS.map((f, k) => <g key={f.n} opacity={e1(t, m('filtros4') + k * 0.2) * (filtroActivo >= 0 && filtroActivo !== k ? 0.45 : 1)}>
          <rect x={90} y={200 + k * 120} width={300} height={90} rx={18} fill={f.col} />
          <Txt x={120} y={258 + k * 120} fontSize={34} fill="#fff" peso={800}>{k + 1}</Txt>
          {!movil && <Txt f="a" x={160} y={255 + k * 120} fontSize={k === 3 ? 20 : 24} fill="#fff" peso={700}>{f.txt}</Txt>}
        </g>)}
        {/* contador */}
        {t >= m('contador') && <g opacity={e1(t, m('contador'))}><rect x={880} y={110} width={200} height={70} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} /><Txt x={980} y={158} textAnchor="middle" fontSize={34} fill={NARANJA} peso={800}>{quedan} de 8</Txt></g>}
        {/* ocho pasos */}
        {t >= m('ocho') && PASOS.map((p, k) => {
          const cae = p.cae && p.cae !== 'reescribe' && t >= m(p.cae);
          const reesc = p.cae === 'reescribe' && t >= m('reescribe');
          const tachado6 = p.cae === 'reescribe' && t >= m('paso6') && !reesc;
          const queda = !p.cae && t >= m('marca');
          return (
            <g key={k} opacity={e1(t, m('ocho') + k * 0.15) * (cae ? 0.45 : 1)}>
              <rect x={450} y={200 + k * 72} width={640} height={60} rx={14} fill={queda ? VERDE : c.panel} opacity={queda ? 0.2 : 1} style={queda ? undefined : sombra(c.sombra, 2, 6)} />
              <Txt x={476} y={239 + k * 72} fontSize={24} fill={NARANJA} peso={800}>{k + 1}</Txt>
              <Txt f="a" x={510} y={239 + k * 72} fontSize={24} fill={c.texto} textDecoration={cae || tachado6 ? 'line-through' : undefined}>{reesc ? 'Producto evaluado' : p.txt}</Txt>
              {cae && <Cruz x={1060} y={230 + k * 72} r={18} />}
              {queda && <Visto x={1060} y={230 + k * 72} r={18} />}{reesc && <circle cx={1060} cy={230 + k * 72} r={18} fill={AMBAR} />}
            </g>
          );
        })}
        {t >= m('ochoTres') && <Letrero x={600} y={820} texto="De 8 pasos, 3 etapas con sentido" id={ID} op={e1(t, m('ochoTres'))} tam={22} />}
      </Toma>
    </Lienzo>
  );
};

/* Burbuja de diálogo simple. */
const Burbujita: React.FC<{ x: number; y: number; txt: string; c: ReturnType<typeof tono> }> = ({ x, y, txt, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-110} y={-40} width={220} height={70} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
    <path d="M -20 30 l 10 26 l 20 -26 Z" fill={c.panel} />
    <Txt f="a" x={0} y={8} textAnchor="middle" fontSize={24} fill={c.texto}>{txt}</Txt>
  </g>
);
