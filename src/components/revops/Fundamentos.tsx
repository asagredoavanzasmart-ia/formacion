import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Footer, Pill, featuredClass, AudioSrcContext } from '../slideKit';
import { AudioPlayer } from '../AudioPlayer';
import { useGuidedStep } from '../../lib/guided';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFloor, Cylinder, Orb, Float, Lift, Traveler, PulseDisc, hop, Persona,
} from '../scene3d';
import type { Faces } from '../scene3d';
import { SlideProps, heading, Piso, Bola, Cifra, Cita, Nota, Fuente, Opcion, BarrasIso, Paso, Verificado, useNarrado } from './kit';

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 1 · Bienvenida
══════════════════════════════════════════════════════════════════ */

const CAMBIOS = [
  { n: 1, t: 'Clientes que esperan más', d: 'Experiencias mejores, más rápidas y más personalizadas.' },
  { n: 2, t: 'Clientes conectados', d: 'Se hablan entre sí y cuentan lo que viven con cada empresa.' },
  { n: 3, t: 'Más datos, más dispersos', d: 'Más información que nunca, repartida entre muchos sistemas y equipos.' },
];

export function Portada({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const step = useGuidedStep();
  const audioSrc = React.useContext(AudioSrcContext);
  const equipos: { key: string; x: number; body: Faces; acc: 'megaphone' | 'tie' | 'heart'; nombre: string }[] = [
    { key: 'marketing', x: 130, body: PEACH, acc: 'megaphone', nombre: 'Marketing' },
    { key: 'ventas', x: 300, body: BRAND, acc: 'tie', nombre: 'Ventas' },
    { key: 'servicio', x: 470, body: SLATE(isDark), acc: 'heart', nombre: 'Servicio al cliente' },
  ];
  const enEquipos = step === 'marketing' || step === 'ventas' || step === 'servicio';
  const enDatos = step === 'datos';
  const enEscena = enEquipos || enDatos;
  const resaltar = step === 'definicion' ? 'rounded px-1 bg-[#ff851d]/25 transition-colors duration-500' : 'rounded px-1 transition-colors duration-500';
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 600 236" className="w-full max-w-2xl mb-1 z-10 overflow-visible" role="img" aria-label="Marketing, ventas y servicio comparten un mismo núcleo de datos">
        <SceneDefs id="rop" isDark={isDark} />
        <Piso cx={300} cy={176} s={290} fill={t.floor} />
        <PulseDisc cx={300} cy={58} rx={enDatos ? 64 : 40} ry={enDatos ? 22 : 14} dur={enDatos ? 1.4 : 2.4} peak={enDatos ? 0.5 : 0.3} />
        <motion.g animate={{ scale: enDatos ? 1.5 : 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <Float amp={6} dur={2.6}><Bola id="rop" cx={300} cy={52} r={17} /></Float>
        </motion.g>
        <text x={326} y={50} fontSize={11.5} fontWeight={900} fill={ORANGE}>Datos compartidos</text>
        {equipos.map((e, i) => {
          const on = step === e.key;
          const dim = enEquipos && !on;
          return (
            <motion.g key={e.nombre} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 90, damping: 13 }}>
              {on && <PulseDisc cx={e.x} cy={174} rx={50} ry={14} dur={1.6} peak={0.4} />}
              <Lift on={on} dimmed={dim} lift={14}>
                <Float amp={4} dur={2.4 + i * 0.3} delay={i * 0.4}>
                  <Persona id="rop" cx={e.x} cy={170} s={on ? 1.2 : 1.05} body={e.body} accessory={e.acc} hair={i === 1 ? '#2b1a12' : '#3b2a20'} />
                </Float>
              </Lift>
              <text x={e.x} y={204} textAnchor="middle" fontSize={on ? 14 : 12} fontWeight={on ? 900 : 800} fill={on ? ORANGE : t.muted}>{e.nombre}</text>
              <Traveler id="rop" path={hop([e.x, 104], [300, 66], 26)} dur={enDatos ? 1.2 : 2} delay={i * (enDatos ? 0.2 : 0.6)} repeatDelay={enDatos ? 0.1 : 0.8} r={enDatos ? 5.5 : 4} color={i === 1 ? PINK : ORANGE} />
            </motion.g>
          );
        })}
        <text x={300} y={232} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Tres equipos, un solo sistema de ingresos</text>
      </svg>
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">Revenue Operations · operaciones de ingresos</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-5xl md:text-7xl font-black mb-4 leading-tight tracking-tighter z-10 ${heading(isDark)}`}>
        Rev<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Ops</span>
      </motion.h1>
      <div className="z-10 w-full max-w-3xl min-h-[104px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 'porque' ? (
            <motion.div key="porque" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-3 gap-3 w-full">
              {CAMBIOS.map((c, k) => (
                <motion.div key={c.n} initial={{ opacity: 0, y: 18, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.15 + k * 0.35, type: 'spring', stiffness: 110, damping: 14 }} className={`p-3 rounded-2xl text-left ${isDark ? 'bg-[#2a2a2a] shadow-lg shadow-black/40' : 'bg-white shadow-lg shadow-gray-200/80'}`}>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#ff851d]">Cambio {c.n}</p>
                  <p className={`text-sm font-black leading-tight ${heading(isDark)}`}>{c.t}</p>
                  <p className={`text-xs leading-snug mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{c.d}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : step === 'pregunta' ? (
            <motion.p key="pregunta" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xl md:text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
              ¿Quién es responsable del recorrido completo del cliente en tu empresa?
            </motion.p>
          ) : (
            <motion.p key="base" initial={{ opacity: 0 }} animate={{ opacity: enEscena ? 0.3 : 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className={`text-base md:text-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Las <strong><span className={resaltar}>personas</span>, <span className={resaltar}>procesos</span>, <span className={resaltar}>sistemas</span> y <span className={resaltar}>datos</span></strong> que controlan cómo tu empresa genera ingresos, alineados para que el negocio crezca más rápido de lo que crece su costo.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }} className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 mt-6 z-10" />
      {audioSrc && <AudioPlayer src={audioSrc} isDark={isDark} />}
    </div>
  );
}

const PILARES = [
  {
    nombre: 'Personas',
    resumen: 'Marketing, ventas y servicio tienen necesidades operativas. RevOps las consolida y pone a alguien imparcial a mirar la operación completa.',
    cita: 'Si no tienes un cargo de RevOps pero trabajas en una empresa con ingresos recurrentes, llámate RevOps: trabajar aislado del ciclo completo hoy es un pecado capital.',
    autor: 'Daniel Remedios',
  },
  {
    nombre: 'Procesos',
    resumen: 'Cómo se hace el trabajo en el escritorio: enrutar un lead, cotizar, traspasar un cliente. Un mismo trabajo debería hacerse de la misma forma en todos los equipos.',
    cita: 'Cotizar no es un proceso abstracto: te sientas, armas la cotización y se la envías a una persona. ¿Deberíamos tener procesos distintos para la venta nueva y el upsell? Probablemente no.',
    autor: 'Ross Nibur',
    leyenda: 'Cada barra es la conversión inbound: antes del cambio (1×) y después (2×). Es una escala relativa, no un porcentaje.',
  },
  {
    nombre: 'Sistemas',
    resumen: 'Al crecer, cada persona compra su aplicación favorita y cada jefe mantiene su planilla. La desconexión trae desconfianza y la eficiencia se desploma.',
    cita: 'Una empresa moderna usa muchísima tecnología para sus procesos con clientes e internos, y esa tecnología produce una enorme cantidad de datos.',
    autor: 'Ross Nibur',
  },
  {
    nombre: 'Datos',
    resumen: 'Todo lo que hace un vendedor, un marketero o un agente de servicio genera datos. RevOps los recolecta bien, los sintetiza y los muestra para decidir.',
    cita: 'O lo haces bien o lo haces mal, pero estás haciendo revenue operations. Hoy no puedes existir sin hacerlo.',
    autor: 'Matt Bolian',
  },
];

export function Definicion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const p = PILARES[i];
  const B = 214;
  return (
    <Shell isDark={isDark} title="Qué es" highlight="Revenue Operations" subtitle="RevOps son las personas, los procesos, los sistemas y los datos que controlan cómo tu empresa genera ingresos. Toda empresa que vende ya tiene RevOps, aunque no lo haya definido.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[44%] flex flex-col items-center justify-center">
          <svg viewBox="0 0 440 262" className="w-full max-h-[300px] overflow-visible" role="img" aria-label="Los cuatro componentes de RevOps">
            <SceneDefs id="rod" isDark={isDark} />
            <Piso cx={220} cy={B + 6} s={210} fill={t.floor} />
            {PILARES.map((pl, k) => {
              const x = 70 + k * 100;
              const h = 46 + k * 10;
              const on = k === i;
              return (
                <g key={pl.nombre} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }}>
                  {on && <PulseDisc cx={x} cy={B + 4} rx={44} ry={13} dur={2.2} peak={0.32} />}
                  <Lift on={on} dimmed={!on} lift={12}>
                    <g filter="url(#rod-sh)"><IsoBox cx={x} cy={B - h - 17} s={34} h={h} f={on ? BRAND : PEACH} /></g>
                  </Lift>
                  <text x={x} y={B + 32} textAnchor="middle" fontSize={12.5} fontWeight={900} fill={on ? ORANGE : t.muted}>{pl.nombre}</text>
                </g>
              );
            })}
            <Traveler id="rod" path={hop([70, 140], [170, 130], 30)} dur={1.6} repeatDelay={1.2} r={4} />
            <Traveler id="rod" path={hop([170, 130], [270, 120], 30)} dur={1.6} delay={0.8} repeatDelay={1.2} r={4} color={PINK} />
            <Traveler id="rod" path={hop([270, 120], [370, 110], 30)} dur={1.6} delay={1.6} repeatDelay={1.2} r={4} />
          </svg>
          <div className="flex gap-1.5 mt-1">
            {PILARES.map((pl, k) => <Pill key={pl.nombre} isDark={isDark} on={k === i} onClick={() => setI(k)}>{pl.nombre}</Pill>)}
          </div>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2.5">
              <Nota isDark={isDark} label={`Componente · ${p.nombre}`} destacada>{p.resumen}</Nota>
              <Cita isDark={isDark} autor={p.autor}>{p.cita}</Cita>
            </motion.div>
          </AnimatePresence>
          <Nota isDark={isDark} label="En qué se diferencia de sales ops o marketing ops">
            Las operaciones por área diseñan procesos mirando <strong>un solo pedazo</strong> del negocio. RevOps planifica de forma <strong>uniforme y holística</strong> los tres frentes que tocan al cliente: marketing, ventas y servicio.
          </Nota>
        </div>
      </div>
    </Shell>
  );
}

const RUTA = [
  { n: 1, t: 'Bienvenida', aprendes: 'Qué es RevOps y de qué está hecho.', construyes: 'Un mapa de las personas, procesos, sistemas y datos que generan ingresos en tu empresa.' },
  { n: 2, t: 'Introducción a RevOps', aprendes: 'Por qué crecer a escala exige otra forma de operar, y por dónde empezar.', construyes: 'Un diagnóstico de 10 afirmaciones (40 puntos) para decidir si tu empresa necesita invertir en RevOps.' },
  { n: 3, t: 'El flywheel', aprendes: 'Atraer, involucrar y deleitar como un ciclo, con fuerzas que lo aceleran y fricciones que lo frenan.', construyes: 'El dibujo de tu flywheel con sus fuerzas, fricciones y acciones priorizadas.' },
  { n: 4, t: 'Responsabilidad con SLA', aprendes: 'El acuerdo de servicio entre marketing y ventas, y quién lo hace cumplir.', construyes: 'Tu SLA con la cantidad de leads por mes y el plazo máximo de contacto.' },
  { n: 5, t: 'Mapear el proceso de ventas', aprendes: 'Etapas centradas en el comprador, criterios de salida y playbook.', construyes: 'Un proceso de ventas depurado: acción del vendedor y acción del comprador por etapa.' },
  { n: 6, t: 'Gestión de sistemas', aprendes: 'Proceso primero, gobierno de datos y control del stack tecnológico.', construyes: 'Un diccionario de datos y una evaluación de tus herramientas.' },
  { n: 7, t: 'Comunicar el valor', aprendes: 'Hablar en el idioma de las finanzas, el costo de la mala calidad, el A3 y la persuasión.', construyes: 'Una propuesta para tus líderes con pre-wiring y respuestas a objeciones.' },
  { n: 8, t: 'Estructurar el equipo', aprendes: 'Silos, estructura formal e informal y cómo crece un equipo de operaciones.', construyes: 'Tu organigrama actual, el ideal y el camino entre ambos.' },
  { n: 9, t: 'Contratar al equipo', aprendes: 'Cuándo contratar, qué tipo de candidato buscar y cómo evaluarlo.', construyes: 'Roles, perfiles y una pauta de entrevista con respuestas buenas, regulares y malas.' },
  { n: 10, t: 'Evaluar e iterar', aprendes: 'El ciclo continuo de datos, comunicación y alineación.', construyes: 'Un plan de cuatro trimestres con métricas y prioridades diarias.' },
];

export function Ruta({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const r = RUTA[i];
  return (
    <Shell isDark={isDark} title="La ruta:" highlight="diez lecciones, un plan propio" subtitle="Cada lección deja una pieza de tu estrategia de RevOps. Al final tendrás un plan completo, aplicable a cualquier tamaño de empresa e industria.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[52%] grid grid-cols-2 gap-2 content-center">
          {RUTA.map((l, k) => <Opcion key={l.n} isDark={isDark} on={k === i} onClick={() => setI(k)}>{l.n}. {l.t}</Opcion>)}
        </div>
        <div className="lg:w-[48%] flex flex-col gap-2.5 justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2.5">
              <div className={`p-4 rounded-3xl flex items-center gap-4 ${panelClass(isDark)}`}>
                <span className="text-5xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{r.n}</span>
                <span className={`text-xl font-black leading-tight ${heading(isDark)}`}>{r.t}</span>
              </div>
              <Nota isDark={isDark} label="Qué aprendes">{r.aprendes}</Nota>
              <Nota isDark={isDark} label="Qué construyes" destacada>{r.construyes}</Nota>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 2 · Introducción a RevOps
══════════════════════════════════════════════════════════════════ */

function curva(fn: (t: number) => number): string {
  const N = 24;
  const pts = Array.from({ length: N + 1 }, (_, k) => {
    const tt = k / N;
    return `${(50 + tt * 380).toFixed(1)},${fn(tt).toFixed(1)}`;
  });
  return `M 50,230 L ${pts.join(' L ')} L 430,230 Z`;
}

export function Escala({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [escala, setEscala] = useState(false);
  const plantilla = (x: number) => 230 - x * 130;
  const ingresos = (x: number) => (escala ? 230 - (0.25 * x + 0.95 * x * x * x) * 150 : 230 - x * 105);
  const finIng = ingresos(1);
  return (
    <Shell isDark={isDark} title="Crecer en línea recta o" highlight="crecer a escala" subtitle="Escala es cuando el negocio crece más rápido que la inversión: los ingresos aumentan más que la plantilla, mejora el margen neto o mejora la relación LTV:CAC.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[48%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={!escala} onClick={() => setEscala(false)}>Crecimiento lineal</Pill>
            <Pill isDark={isDark} on={escala} onClick={() => setEscala(true)}>Crecimiento a escala</Pill>
          </div>
          <svg viewBox="0 0 500 262" className="w-full max-h-[290px] overflow-visible" role="img" aria-label="Ingresos frente a plantilla a lo largo del tiempo (esquema ilustrativo)">
            <defs>
              <linearGradient id="roe-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ORANGE} stopOpacity={0.75} />
                <stop offset="100%" stopColor={PINK} stopOpacity={0.25} />
              </linearGradient>
            </defs>
            <rect x={50} y={230} width={380} height={2} fill={t.muted} opacity={0.3} />
            <path d={curva(plantilla)} fill={isDark ? '#64748b' : '#94a3b8'} opacity={0.45} />
            <motion.path initial={false} animate={{ d: curva(ingresos) }} transition={{ duration: 0.9, ease: 'easeInOut' }} fill="url(#roe-g)" />
            <circle cx={430} cy={plantilla(1)} r={5} fill={isDark ? '#94a3b8' : '#64748b'} />
            <motion.circle initial={false} animate={{ cy: finIng }} transition={{ duration: 0.9 }} cx={430} r={6} fill={PINK} />
            <text x={440} y={plantilla(1) + 4} fontSize={12} fontWeight={800} fill={t.muted}>Plantilla</text>
            <motion.text initial={false} animate={{ y: finIng + 4 }} transition={{ duration: 0.9 }} x={440} fontSize={12} fontWeight={900} fill={PINK}>Ingresos</motion.text>
            <text x={240} y={252} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Tiempo →  (esquema ilustrativo)</text>
          </svg>
          <p className={`text-xs text-center max-w-md ${textMuted(isDark)}`}>{escala ? 'La curva se dobla hacia arriba: el crecimiento ya no depende de contratar, y financia contratación, desarrollo y expansión.' : 'Cada cliente nuevo exige una persona más: más ventas, más vendedores; más clientes, más soporte.'}</p>
        </div>
        <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
          <Nota isDark={isDark} label="Por qué el trato personalizado deja de alcanzar" destacada>
            Si cada prospecto y cada cliente recibe atención uno a uno, la única forma de crecer es sumar personas. Es caro y no se sostiene: el costo de contratar y formar a ese equipo consume los recursos para invertir en todo lo demás.
          </Nota>
          <Cita isDark={isDark} autor="Jen Spencer">Con un equipo chico puedes abrazar a cada cliente. Al crecer, toda esa historia sobre clientes y cuentas pasa de un gerente a otro y se diluye cada vez más.</Cita>
          <div className="grid grid-cols-2 gap-2.5">
            <Nota isDark={isDark} label="Etapa temprana">Haz lo que no escala: la mejor experiencia a cada cliente y aprende de él (Daniel Remedios).</Nota>
            <Nota isDark={isDark} label="Etapa de escala">No dejas de cuidar al cliente: buscas otra forma, también uno a muchos, de darle valor (Sarah Doughty).</Nota>
          </div>
          <p className={`text-[11px] ${textMuted(isDark)}`}><strong>LTV:CAC</strong> · valor de vida del cliente dividido por el costo de adquirirlo.</p>
        </div>
      </div>
    </Shell>
  );
}

const AFIRMACIONES = [
  'Mi equipo dedica más del 50% de su tiempo a proyectos estratégicos y de impacto.',
  'Usamos herramientas que alimentan con datos del cliente a marketing, ventas y servicio.',
  'Avisamos a los demás departamentos cuando los datos han sido auditados.',
  'Rastreamos las ineficiencias de proceso en toda la organización.',
  'Buscamos constantemente formas de mejorar las operaciones del negocio.',
  'Creamos reportes de los que marketing, ventas y servicio sacan conclusiones.',
  'Nuestros procedimientos y tecnología están diseñados para un servicio de calidad.',
  'Administramos una única fuente de verdad de datos del cliente para toda la empresa.',
  'Somos dueños de los reportes de todas las funciones de ingresos.',
  'Conectamos las aplicaciones de la empresa en un solo lugar, sin importar ni exportar a mano.',
];

const DIAG_ARR = (a: number[]) => Object.fromEntries(a.map((x, k) => ['a' + k, x])) as Record<string, number>;
const DIAG_PLAN = (p: number) => ({ [-1]: DIAG_ARR([2, 2, 2, 2, 2, 2, 2, 2, 2, 2]), 7: DIAG_ARR([1, 1, 2, 1, 1, 2, 1, 1, 0, 1]), 8: DIAG_ARR([3, 2, 3, 2, 3, 2, 2, 3, 2, 2]), 9: DIAG_ARR([4, 4, 3, 4, 4, 3, 4, 4, 3, 4]), 10: DIAG_ARR([2, 2, 2, 2, 2, 2, 2, 2, 2, 2]) } as Record<number, Record<string, number>>)[p] ?? null;

export function Diagnostico({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [obj, setObj, paso] = useNarrado('ro-2-diagnostico', DIAG_ARR([2, 2, 2, 2, 2, 2, 2, 2, 2, 2]), DIAG_PLAN);
  const v = Array.from({ length: 10 }, (_, k) => Math.round(obj['a' + k]));
  const setV = (f: (p: number[]) => number[]) => setObj(DIAG_ARR(f(v)));
  const total = v.reduce((a, b) => a + b, 0);
  const filaFoco = (k: number) => paso !== null && ((paso === 3 && k === 0) || (paso === 4 && k >= 1 && k <= 5) || (paso === 5 && k >= 6));
  const ve = (desde: number) => (paso === null || paso >= desde ? 'opacity-100' : 'opacity-0');
  const tramo = total <= 16
    ? { r: '0 a 16 puntos', txt: 'RevOps no está en buen estado, y eso es una gran oportunidad: hay muchísimo valor por agregar. Usa este curso para armar un plan.' }
    : total <= 31
      ? { r: '17 a 31 puntos', txt: 'Vas en la dirección correcta, por delante de la mayoría de las organizaciones, con espacio para mejorar. Identifica dónde puedes aportar más.' }
      : { r: '32 a 40 puntos', txt: 'Nivel de clase mundial. Pero RevOps no se configura y se olvida: repite este diagnóstico cada trimestre.' };
  const B = 226;
  const hMax = 168;
  const h = Math.max(4, (total / 40) * hMax);
  return (
    <Shell isDark={isDark} title="Diagnóstico:" highlight="¿cómo está tu RevOps hoy?" subtitle="Diez afirmaciones, de 0 a 4 puntos cada una: 4 si siempre es cierta, 3 casi siempre, 2 a veces, 1 de vez en cuando y 0 nunca.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[64%] flex flex-col gap-1 justify-center">
          {AFIRMACIONES.map((a, k) => (
            <div key={k} className={`flex items-center gap-2 px-2.5 py-1 rounded-xl transition-all duration-500 ${filaFoco(k) ? (isDark ? 'bg-[#ff851d]/15' : 'bg-orange-50 shadow-sm') : k % 2 ? '' : isDark ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
              <span className={`text-[12px] leading-tight flex-1 ${textMuted(isDark)}`}><strong className="text-[#ff851d] mr-1">{k + 1}.</strong>{a}</span>
              <span className="flex gap-1 shrink-0">
                {[0, 1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setV((prev) => prev.map((x, j) => (j === k ? n : x)))}
                    title={['Nunca', 'De vez en cuando', 'A veces', 'Casi siempre', 'Siempre'][n]}
                    className={`w-6 h-6 rounded-lg text-[11px] font-black transition-all ${v[k] === n ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow' : isDark ? 'bg-[#2a2a2a] text-gray-400' : 'bg-white text-gray-500 shadow-sm'}`}
                  >
                    {n}
                  </button>
                ))}
              </span>
            </div>
          ))}
        </div>
        <div className="lg:w-[36%] flex flex-col gap-2.5 justify-center items-center">
          <svg viewBox="0 0 240 262" className="w-full max-h-[230px] overflow-visible" role="img" aria-label={`Puntaje ${total} de 40`}>
            <SceneDefs id="rog" isDark={isDark} />
            <Piso cx={120} cy={B + 8} s={96} fill={t.floor} />
            <PulseDisc cx={120} cy={B + 6} rx={50} ry={15} dur={2.4} peak={0.28} />
            <g filter="url(#rog-sh)"><IsoBox cx={120} cy={B - hMax - 10} s={34} h={hMax} f={NEUTRAL(isDark)} /></g>
            <motion.g initial={false} animate={{ scaleY: h / hMax }} transition={{ type: 'spring', stiffness: 80, damping: 15 }} style={{ transformOrigin: `120px ${B + 7}px` }}>
              <IsoBox cx={120} cy={B - hMax - 10} s={34} h={hMax} f={BRAND} />
            </motion.g>
            <text x={170} y={B - hMax - 10} fontSize={11} fontWeight={800} fill={t.muted}>40</text>
            <text x={170} y={B + 4} fontSize={11} fontWeight={800} fill={t.muted}>0</text>
          </svg>
          <div className={`w-full p-3.5 rounded-3xl text-center transition-opacity duration-500 ${featuredClass(isDark)} ${ve(6)}`}>
            <p className={microLabel(isDark)}>Tu puntaje · {tramo.r}</p>
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c] leading-none my-1">{total}<span className={`text-lg ${textMuted(isDark)}`}> / 40</span></p>
            <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{tramo.txt}</p>
          </div>
          <p className={`text-[11px] text-center leading-snug transition-opacity duration-500 ${textMuted(isDark)} ${ve(11)}`}>Contexto: una empresa mediana usa en promedio <strong>137 aplicaciones SaaS</strong> y una grande <strong>288</strong> (Blissfully, 2020). Mantener esos datos sincronizados es un trabajo de tiempo completo.</p>
        </div>
      </div>
    </Shell>
  );
}

const INICIO = [
  {
    t: 'Instrumentar',
    corto: 'Captura los datos',
    txt: 'Si la empresa no tiene infraestructura para recolectar datos, esa es la prioridad número uno: implementar sistemas y procesos para capturar todo de forma consistente.',
    cita: 'Lo que es crítico desde el comienzo es una vista consolidada de tu cliente. No podemos permitirnos que alguien llegue sin que sepamos de dónde viene ni qué quiere.',
    autor: 'Daniel Remedios',
  },
  {
    t: 'Entender antes de cambiar',
    corto: 'Busca entender',
    txt: '"Primero busca entender" (Stephen Covey). Antes de tocar nada, comprende qué pasa en la organización, empezando por la base de cuentas: quién ingresa datos, qué está duplicado, qué está limpio.',
    cita: 'Siempre habrá una base de datos desordenada. Y si no tienes datos limpios, marketing no está feliz, los BDR no están felices: nadie está feliz.',
    autor: 'Sandy Robinson',
    leyenda: 'Barra alta: clientes contactados dentro de 5 días, que implementan. Barra baja: clientes que pasan 6 días o más sin contacto, que casi no implementan. Muestra el patrón descrito, no porcentajes exactos.',
  },
  {
    t: 'Dar consistencia',
    corto: 'Simplifica',
    txt: 'Las métricas de la venta nueva suelen estar claras; las de después de la venta no. Usa las mismas definiciones antes y después de la venta, y el mismo proceso cuando el trabajo es el mismo (cotizar una venta nueva o un upsell).',
    cita: '¿Qué porcentaje de clientes se incorporó bien? ¿Cuántos tuvieron un primer uso exitoso a tiempo? ¿Cuántos renovaron y ampliaron? Esas métricas no están tan limpias después de la venta.',
    autor: 'Sarah Doughty',
  },
  {
    t: 'Mirar desde el cliente',
    corto: 'Ponte en su lugar',
    txt: 'Pregunta qué intenta lograr el cliente en cada etapa, quién participa de su lado y del tuyo, y qué siente. Hazlo en un taller con líderes de marketing, ventas, éxito del cliente y producto.',
    cita: 'La mayoría de las ineficiencias no vienen de malos actores ni de mala ejecución: vienen de departamentos que intentan lo mismo, ayudar al cliente, cada uno a su manera.',
    autor: 'Material del curso',
  },
];

export function Empezar({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const pos: [number, number][] = [[70, 186], [170, 158], [270, 130], [370, 102]];
  return (
    <Shell isDark={isDark} title="Por dónde empezar:" highlight="los datos que ya tienes" subtitle="Si te encargaron unificar las operaciones de ingresos, el primer paso no es cambiar procesos: es mirar los datos que existen y entender cómo se generan.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[44%] flex flex-col items-center justify-center">
          <svg viewBox="0 0 440 262" className="w-full max-h-[300px] overflow-visible" role="img" aria-label="Cuatro pasos para empezar">
            <SceneDefs id="roi" isDark={isDark} />
            {pos.map(([x, y], k) => {
              const on = k === i;
              return (
                <g key={k} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }}>
                  {on && <PulseDisc cx={x} cy={y + 8} rx={52} ry={17} dur={2.2} peak={0.3} />}
                  <Lift on={on} dimmed={false} lift={8}>
                    <g filter="url(#roi-sh)"><Cylinder cx={x} cy={y} rx={38} ry={13} h={16} top={on ? ORANGE : k < i ? '#ffd2a8' : isDark ? '#4b5563' : '#e5e7eb'} side={on ? '#c45c00' : k < i ? '#f0875a' : isDark ? '#374151' : '#9ca3af'} /></g>
                  </Lift>
                  <text x={x} y={y + 50} textAnchor="middle" fontSize={12} fontWeight={900} fill={on ? ORANGE : t.muted}>{k + 1}. {INICIO[k].corto}</text>
                </g>
              );
            })}
            <Traveler id="roi" path={[[70, 180], hop([70, 180], [170, 152], 24)[1], [170, 152], hop([170, 152], [270, 124], 24)[1], [270, 124], hop([270, 124], [370, 96], 24)[1], [370, 96]]} dur={3.2} repeatDelay={0.6} r={5} />
          </svg>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2 justify-center">
          {INICIO.map((p, k) => (
            <button key={p.t} onClick={() => setI(k)} className="text-left">
              <Paso isDark={isDark} n={k + 1} titulo={p.t} on={k === i}>{k === i ? p.txt : null}</Paso>
            </button>
          ))}
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Cita isDark={isDark} autor={INICIO[i].autor}>{INICIO[i].cita}</Cita>
            </motion.div>
          </AnimatePresence>
          <p className={`text-[11px] ${textMuted(isDark)}`}><strong>BDR</strong> · Business Development Representative (representante de desarrollo de negocio).</p>
        </div>
      </div>
    </Shell>
  );
}

export function Velocidad({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [alineado, setAlineado] = useState(false);
  const meta: [number, number] = [376, 112];
  const alin: [number, number][] = [[64, 142], [112, 142], [160, 142], [208, 142], [256, 142]];
  const disp: [number, number][] = [[80, 92], [150, 196], [118, 140], [212, 84], [58, 204]];
  const dir: [number, number][] = [[-30, -24], [26, 22], [-34, 10], [30, -20], [-22, 26]];
  return (
    <Shell isDark={isDark} title="Velocidad," highlight="no rapidez" subtitle="Rapidez mide qué tan rápido vas. Velocidad mide cuánto tardas en llegar a destino. El trabajo de RevOps es aumentar la velocidad, no la rapidez (Doug Davidoff).">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={!alineado} onClick={() => setAlineado(false)}>Cada equipo a su ritmo</Pill>
            <Pill isDark={isDark} on={alineado} onClick={() => setAlineado(true)}>Mismo rumbo</Pill>
          </div>
          <svg viewBox="0 0 440 252" className="w-full max-h-[280px] overflow-visible" role="img" aria-label="Esfuerzos dispersos frente a esfuerzos alineados hacia la meta">
            <SceneDefs id="rov" isDark={isDark} />
            <Piso cx={220} cy={150} s={210} fill={t.floor} />
            <PulseDisc cx={meta[0]} cy={meta[1] + 70} rx={46} ry={14} dur={2.2} peak={0.3} />
            <Float amp={3}><g filter="url(#rov-sh)"><IsoBox cx={meta[0]} cy={meta[1]} s={28} h={56} f={BRAND} /></g></Float>
            <text x={meta[0]} y={meta[1] + 14 + 56 + 26} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>Meta de ingresos</text>
            {alin.map((a, k) => {
              const d = disp[k];
              return (
                <motion.g key={k} initial={false} animate={{ x: alineado ? 0 : d[0] - a[0], y: alineado ? 0 : d[1] - a[1] }} transition={{ type: 'spring', stiffness: 70, damping: 14, delay: k * 0.05 }}>
                  <Float amp={3} dur={1.6 + k * 0.2} delay={k * 0.1}><Bola id="rov" cx={a[0]} cy={a[1]} r={12} neutral={!alineado} /></Float>
                </motion.g>
              );
            })}
            <g key={alineado ? 'a' : 'd'}>
              {alin.map((a, k) => {
                const d = disp[k];
                return alineado
                  ? <Traveler key={k} id="rov" path={[[a[0] + 14, a[1]], [meta[0] - 34, meta[1] + 30]]} dur={1.4} delay={0.5 + k * 0.25} repeatDelay={0.4} r={4} />
                  : <Traveler key={k} id="rov" path={[[d[0], d[1]], [d[0] + dir[k][0], d[1] + dir[k][1]]]} dur={0.6} delay={k * 0.15} repeatDelay={0.2} r={3.5} color={PINK} />;
              })}
            </g>
            <text x={220} y={244} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{alineado ? 'Menos vueltas, más tracción: todos avanzan a la meta' : 'Todos corren al máximo, cada uno en otra dirección'}</text>
          </svg>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <Cita isDark={isDark} autor="Doug Davidoff">En primera marcha de una bicicleta vas muy rápido, pero avanzas poco: más vueltas, menos progreso. En una marcha más larga das menos vueltas, pero cada una tiene más tracción. Esa es la diferencia entre rapidez y velocidad.</Cita>
          <Nota isDark={isDark} label="La consecuencia" destacada>
            Si tu empresa no crece, la respuesta no es exprimir más esfuerzo a la gente: todos ya corren tras su cuota. La respuesta es que alguien con perspectiva logre que todos los equipos tiren en la misma dirección, aunque a veces haya que ir más lento.
          </Nota>
          <div className="grid grid-cols-2 gap-2.5">
            <Nota isDark={isDark} label="El error clásico de operaciones">Llegar con reglas propias. Doug Davidoff recuerda que a su área de sales ops le decían «el departamento de prevención de ventas».</Nota>
            <Nota isDark={isDark} label="La actitud correcta">Empatía y curiosidad sinceras por lo que cada persona hace en su escritorio. Los equipos internos también son tus clientes.</Nota>
          </div>
        </div>
      </div>
    </Shell>
  );
}

const CASOS = [
  {
    k: 'Toast',
    titulo: 'Duplicar la conversión inbound sin tocar los leads',
    txt: 'El equipo midió de dónde venían los MQL, qué tan rápido y con cuánta profundidad se trabajaban y cuándo convertían. Con eso definió cuántos contactos hacer y en cuántos días. No cambiaron los leads ni las personas ni la cantidad de llamadas: solo cómo se priorizaban los datos en el sistema.',
    resultado: 'Se duplicó la conversión inbound y la tasa de cierre de las oportunidades no cayó.',
    autor: 'Ross Nibur',
    barras: [{ name: 'Antes', value: 1, label: '1×', tone: 'neutral' as const }, { name: 'Después', value: 2, label: '2×', hl: true }],
    max: 2,
  },
  {
    k: 'Decaimiento',
    titulo: 'Dejar de trabajar leads que ya se enfriaron',
    txt: 'El análisis por cohortes mostró que los MQL casi no convertían después del día 4 o 5, pero los SDR los seguían trabajando hasta el día 9 o 10. La regla nueva: soltar todo MQL de más de cinco días y concentrarse en los que acaban de entrar.',
    resultado: 'La conversión MQL→SQL subió de 33% a 45% en un trimestre, sin gastar un peso más.',
    autor: 'Matt Volm',
    leyenda: 'Cada barra es el porcentaje de MQL que se convierten en SQL: 33% antes de soltar los leads de más de cinco días y 45% después.',
    barras: [{ name: 'MQL→SQL antes', value: 33, label: '33%', tone: 'neutral' as const }, { name: 'MQL→SQL después', value: 45, label: '45%', hl: true }],
    max: 50,
  },
  {
    k: 'Puntos de contacto',
    titulo: 'Diseñar las secuencias con datos',
    txt: 'Mira tus cuentas objetivo por número de contacto: el primero, el segundo, el tercero… y busca dónde salta la tasa de reuniones agendadas. Puede tomar 15 o 16 contactos. Luego compara con tus secuencias de prospección: casi siempre tienen demasiados pasos o, más a menudo, muy pocos.',
    resultado: 'Mejorar 5 puntos la conversión MQL→SQL en un trimestre se compone en todo el embudo sin gastar más.',
    autor: 'Matt Volm',
    leyenda: 'Compara los pasos de una secuencia corta típica (8 es un ejemplo, la fuente no da una cifra media) con el contacto donde los datos muestran el salto en reuniones agendadas (15 o 16).',
    barras: [{ name: 'Secuencia actual', value: 8, label: '8 pasos', tone: 'neutral' as const }, { name: 'Lo que dicen los datos', value: 16, label: '15-16', hl: true }],
    max: 16,
  },
  {
    k: 'Comisiones',
    titulo: 'La venta que se pagó y nunca se activó',
    txt: 'Revisando reportes de comisiones tras una adquisición, apareció un mismo negocio varias veces: ventas duplicadas, pagadas más de una vez, y muchas ventas que nunca se activaban. Los datos mostraron que si pasaban seis días sin contacto con éxito del cliente, el cliente nunca implementaba.',
    resultado: 'Comisión pagada recién con el cliente activo, traspaso cálido a implementación y alertas para los negocios de 5 o 6 días.',
    autor: 'Sandy Robinson',
    barras: [{ name: 'Contacto en ≤ 5 días', value: 1, label: 'Implementa', hl: true }, { name: 'Contacto en 6+ días', value: 0.12, label: 'No implementa', tone: 'neutral' as const }],
    max: 1,
  },
];

export function Casos({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const c = CASOS[i];
  return (
    <Shell isDark={isDark} title="Crecer" highlight="sin gastar un peso más" subtitle="Mejorar una tasa de conversión, con todo lo demás constante, se compone a lo largo del embudo. Ese es el tipo de mejora que RevOps sabe encontrar.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex gap-1.5 flex-wrap justify-center mb-2">
          {CASOS.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
            <div className="lg:w-[42%] flex flex-col items-center justify-center">
              <div className="w-full max-w-[380px] h-[250px]"><BarrasIso id={`roc${i}`} isDark={isDark} items={c.barras} max={c.max} W={380} hMax={130} /></div>
              <p className={`mt-2 max-w-[380px] text-center text-[11.5px] leading-snug ${textMuted(isDark)}`}>{c.leyenda}</p>
            </div>
            <div className="lg:w-[58%] flex flex-col gap-2.5 justify-center">
              <Nota isDark={isDark} label={`Caso · ${c.autor}`}><strong className={heading(isDark)}>{c.titulo}.</strong> {c.txt}</Nota>
              <Nota isDark={isDark} label="Resultado" destacada>{c.resultado}</Nota>
              {i === 1 && <Verificado isDark={isDark} tipo="corregido">Pasar de 33% a 45% son 12 puntos, es decir, 36% más SQL. La fuente atribuye a este cambio 33% más ingresos en el trimestre.</Verificado>}
            </div>
          </motion.div>
        </AnimatePresence>
        <Fuente isDark={isDark}>MQL · Marketing Qualified Lead, lead calificado por marketing. SQL · Sales Qualified Lead, lead calificado por ventas. SDR · Sales Development Representative, representante de desarrollo de ventas.</Fuente>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 3 · El flywheel
══════════════════════════════════════════════════════════════════ */

const FASES = [
  {
    k: 'Atraer', a0: -150, a1: -33,
    quien: 'Un prospecto atraído es alguien que se interesó en tu forma de resolver su problema y te dejó sus datos a cambio de algo útil.',
    def: 'Traer a las personas correctas con contenido y conversaciones valiosas que te posicionan como asesor de confianza.',
    preguntas: 'Qué propiedades usas para atraer (sitio web, redes sociales, directorios, tácticas en tienda) y qué métricas dicen si funcionan.',
  },
  {
    k: 'Interactuar', a0: -30, a1: 87,
    quien: 'Un prospecto interactuado ya considera tu solución y quiere conectar con alguien de tu empresa.',
    def: 'Presentar ideas y soluciones alineadas con los dolores y metas de la persona, para que sea más probable que te compre.',
    preguntas: 'Qué tan fácil es encontrar respuestas, si se puede comprar sin hablar con alguien y cuánto tardas en responder.',
  },
  {
    k: 'Deleitar', a0: 90, a1: 207,
    quien: 'Un cliente deleitado recurre a soporte para resolver problemas y a éxito del cliente para sacar más provecho.',
    def: 'Dar ayuda y soporte para que el cliente tenga éxito con lo que compró, y quiera recomendarte.',
    preguntas: 'Qué tan felices están (encuestas NPS), por qué algunos vuelven a comprar y qué reclamos hay.',
  },
];

const EMBUDO = [
  { k: 'Atraer', c: '#0d2a4a', w0: 340, w1: 290 },
  { k: 'Interactuar', c: '#13808c', w0: 280, w1: 230 },
  { k: 'Capturar', c: '#5ccfd8', w0: 220, w1: 170 },
  { k: 'Nutrir', c: '#fbae3c', w0: 150, w1: 150 },
  { k: 'Convertir', c: '#f4834f', w0: 130, w1: 130 },
];

const rad = (g: number) => (g * Math.PI) / 180;

function Embudo({ isDark }: { isDark: boolean }) {
  const t = sceneTone(isDark);
  return (
    <svg viewBox="0 -34 400 354" className="w-full max-h-[330px] overflow-visible" role="img" aria-label="Embudo: atraer, interactuar, capturar, nutrir y convertir; el cliente es el fondo del embudo">
      {[-120, -70, -20, 30, 80, 125].map((x0, k) => (
        <motion.circle key={k} r={5} fill={isDark ? "#9ca3af" : "#8b93a1"} initial={{ cx: 200 + x0, cy: -30, opacity: 0 }} animate={{ cx: [200 + x0, 200 + x0 * 0.5, 200, 200], cy: [-30, 120, 250, 262], opacity: [0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: k * 0.55, ease: "linear", times: [0, 0.45, 0.93, 1] }} />
      ))}
      <motion.circle r={6} fill={ORANGE} initial={{ cx: 200, cy: -30, opacity: 0 }} animate={{ cx: 200, cy: [-30, 300], opacity: [0, 1, 1] }} transition={{ duration: 4, repeat: Infinity, delay: 3.3, ease: "linear" }} />
      {EMBUDO.map((e, k) => {
        const y = 14 + k * 50;
        const pts = `${200 - e.w0 / 2},${y} ${200 + e.w0 / 2},${y} ${200 + e.w1 / 2},${y + 44} ${200 - e.w1 / 2},${y + 44}`;
        return (
          <motion.g key={e.k} initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.12, type: 'spring', stiffness: 90, damping: 14 }}>
            <polygon points={pts} fill={e.c} />
            <text x={200} y={y + 28} textAnchor="middle" fontSize={16} fontWeight={800} fill="#fff">{e.k}</text>
          </motion.g>
        );
      })}
      <text x={200} y={306} textAnchor="middle" fontSize={15} fontWeight={900} fill={t.text}>Cliente = fondo del embudo</text>
    </svg>
  );
}

function RuedaFlywheel({ isDark, i, setI }: { isDark: boolean; i: number; setI: (k: number) => void }) {
  const c = 200, R = 146, r = 84, M = (R + r) / 2;
  const P = (rr: number, g: number) => `${(c + rr * Math.cos(rad(g))).toFixed(1)} ${(c + rr * Math.sin(rad(g))).toFixed(1)}`;
  const flecha = (a0: number, a1: number) => {
    const big = a1 - a0 > 180 ? 1 : 0;
    return `M ${P(R, a0)} A ${R} ${R} 0 ${big} 1 ${P(R, a1)} L ${P(M, a1 + 9)} L ${P(r, a1)} A ${r} ${r} 0 ${big} 0 ${P(r, a0)} L ${P(M, a0 + 9)} Z`;
  };
  const arcoTexto = (a0: number, a1: number, invertir: boolean) =>
    invertir ? `M ${P(M, a1 - 4)} A ${M} ${M} 0 0 0 ${P(M, a0 + 12)}` : `M ${P(M, a0 + 12)} A ${M} ${M} 0 0 1 ${P(M, a1 - 4)}`;
  const suave = isDark ? '#4a3426' : '#ffe3cc';
  const fondo = isDark ? '#2a1d16' : '#fff3ea';
  const orbita: [number, number][] = Array.from({ length: 13 }, (_, k) => [c + 156 * Math.cos(rad(-90 + k * 30)), c + 156 * Math.sin(rad(-90 + k * 30))]);
  const exteriores = [
    { t: 'Desconocidos', x: c, y: c - 177, rot: 0 },
    { t: 'Prospectos', x: c + 177, y: c, rot: 90 },
    { t: 'Clientes', x: c, y: c + 177, rot: 0 },
    { t: 'Promotores', x: c - 177, y: c, rot: -90 },
  ];
  return (
    <svg viewBox="0 0 400 400" className="w-full max-h-[330px] overflow-visible" role="img" aria-label="Flywheel: atraer, interactuar y deleitar alrededor del crecimiento">
      <defs>
        <linearGradient id="rofw-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ORANGE} />
          <stop offset="100%" stopColor={PINK} />
        </linearGradient>
        {FASES.map((f, k) => <path key={k} id={`rofw-t${k}`} d={arcoTexto(f.a0, f.a1, false)} />)}
      </defs>
      <path d={`M ${c - 194} ${c} a 194 194 0 1 0 388 0 a 194 194 0 1 0 -388 0 Z M ${c - 160} ${c} a 160 160 0 1 1 320 0 a 160 160 0 1 1 -320 0 Z`} fill={ORANGE} fillRule="evenodd" />
      <circle cx={c} cy={c} r={160} fill={fondo} />
      {exteriores.map((e) => (
        <text key={e.t} x={e.x} y={e.y + 5} textAnchor="middle" fontSize={14} fontWeight={800} fill="#fff" transform={`rotate(${e.rot} ${e.x} ${e.y})`}>{e.t}</text>
      ))}
      <Traveler id="rofw" path={orbita} dur={6} r={4} color={ORANGE} />
      <g>
      <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="24s" repeatCount="indefinite" />
      {FASES.map((f, k) => {
        const on = k === i;
        return (
          <g key={f.k} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }}>
            <motion.path d={flecha(f.a0, f.a1)} initial={false} animate={{ fill: on ? PINK : suave }} transition={{ duration: 0.35 }} />
            <text fontSize={24} fontWeight={900} fill={on ? '#fff' : isDark ? '#f3e2d4' : '#3b2a20'}>
              <textPath href={`#rofw-t${k}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">{f.k}</textPath>
            </text>
          </g>
        );
      })}
      </g>
      <motion.circle cx={c} cy={c} fill={ORANGE} initial={{ r: 70, opacity: 0.35 }} animate={{ r: [70, 82], opacity: [0.35, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />
      <circle cx={c} cy={c} r={70} fill="url(#rofw-g)" />
      <text x={c} y={c + 7} textAnchor="middle" fontSize={20} fontWeight={900} fill="#fff">Crecimiento</text>
    </svg>
  );
}

export function Flywheel({ isDark }: SlideProps) {
  const [modo, setModo] = useState<'embudo' | 'flywheel'>('embudo');
  const [i, setI] = useState(0);
  const f = FASES[i];
  return (
    <Shell isDark={isDark} title="Del embudo" highlight="al flywheel" subtitle="El embudo tiene un final: los leads entran arriba y los clientes salen abajo. El flywheel es un ciclo: los clientes deleitados atraen a los siguientes.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={modo === 'embudo'} onClick={() => setModo('embudo')}>El embudo</Pill>
            <Pill isDark={isDark} on={modo === 'flywheel'} onClick={() => setModo('flywheel')}>El flywheel</Pill>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={modo} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="w-full flex justify-center">
              {modo === 'embudo' ? <Embudo isDark={isDark} /> : <RuedaFlywheel isDark={isDark} i={i} setI={setI} />}
            </motion.div>
          </AnimatePresence>
          <p className={`max-w-[400px] text-center text-[11.5px] leading-snug ${textMuted(isDark)}`}>
            {modo === 'embudo'
              ? 'Cada franja es una etapa y se angosta porque en cada una quedan menos prospectos. El punto naranja es un prospecto que baja y sale como cliente: ahí termina el recorrido.'
              : 'Las tres flechas son las fases que giran alrededor del crecimiento. El anillo exterior nombra a la persona en cada tramo. El punto naranja que lo recorre es la energía que vuelve a entrar al ciclo.'}
          </p>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <Cita isDark={isDark} autor="Emmanuelle Skala">Creo que ya no es un embudo; es un círculo. Los embudos, por definición, tienen un final. En SaaS no hay final: hay renovaciones, recomendaciones y referidos. Si separas ventas de éxito del cliente, ¿quién mira el ciclo completo?</Cita>
          <AnimatePresence mode="wait">
            {modo === 'embudo' ? (
              <motion.div key="e" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2.5">
                <Nota isDark={isDark} label="Cómo razona el embudo" destacada>Los prospectos entran arriba y, etapa por etapa, se filtran hasta convertirse en clientes. El cliente es el <strong>fondo del embudo</strong>: el resultado final del proceso.</Nota>
                <Nota isDark={isDark} label="Lo que queda fuera">Todo lo que pasa después de la compra: renovaciones, recomendaciones y referidos. En el embudo, la energía de un cliente feliz no vuelve a entrar al sistema.</Nota>
                <Nota isDark={isDark} label="El problema de los silos">Cada equipo optimiza su tramo del embudo y nadie mira el recorrido completo. El flywheel obliga a mirarlo entero.</Nota>
              </motion.div>
            ) : (
              <motion.div key={`f${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2.5">
                <div className="flex gap-2">{FASES.map((fa, k) => <Pill key={fa.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{fa.k}</Pill>)}</div>
                <Nota isDark={isDark} label={`${f.k} · qué significa`} destacada>{f.def} <span className="opacity-80">{f.quien}</span></Nota>
                <Nota isDark={isDark} label="Preguntas para mapear tu empresa">{f.preguntas}</Nota>
                <Nota isDark={isDark} label="El anillo exterior">Desconocidos que se vuelven prospectos, prospectos que se vuelven clientes y clientes que se vuelven promotores. Los promotores atraen a nuevos desconocidos y la rueda gana impulso.</Nota>
              </motion.div>
            )}
          </AnimatePresence>
          {modo === 'flywheel' && <p className={`text-[11px] ${textMuted(isDark)}`}><strong>NPS</strong> · Net Promoter Score: mide qué tan probable es que un cliente te recomiende a un amigo. <strong>SaaS</strong> · software como servicio: suscripción recurrente, la relación no termina con la compra.</p>}
        </div>
      </div>
    </Shell>
  );
}

export function Fuerza({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [friccion, setFriccion] = useState(true);
  const cx = 220, cy = 128, rx = 132, ry = 42;
  const orbita: [number, number][] = Array.from({ length: 13 }, (_, k) => [cx + 104 * Math.cos(rad(k * 30)), cy + 33 * Math.sin(rad(k * 30))]);
  return (
    <Shell isDark={isDark} title="Fuerza y" highlight="fricción" subtitle="Fuerza es cualquier programa o estrategia que acelera tu flywheel. Fricción es todo lo que lo frena. RevOps trabaja sobre las dos.">
      <div className="h-full flex flex-col gap-3 min-h-0 justify-center">
        <div className="max-w-[820px] w-full mx-auto text-center">
          <Cita isDark={isDark} autor="Devyn Bellamy">Piensa en un carrusel con niños empujando. No necesitas que Kyle, el niño grande, empuje más fuerte: necesitas que el carrusel gire mejor. Ver dónde está la fricción es enorme, y ahí entra RevOps.</Cita>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={friccion} onClick={() => setFriccion(true)}>Empujar más fuerte</Pill>
            <Pill isDark={isDark} on={!friccion} onClick={() => setFriccion(false)}>Quitar la fricción</Pill>
          </div>
          <svg viewBox="0 0 440 252" className="w-full max-h-[215px] overflow-visible" role="img" aria-label="Flywheel con y sin fricción">
            <SceneDefs id="rofu" isDark={isDark} />
            <ellipse cx={cx} cy={cy + 52} rx={92} ry={14} fill={t.floor} />
            <motion.g key={friccion ? 'f' : 'l'} animate={friccion ? { x: [0, 0, 1, -1, 0.8, -0.6, 0, 0], y: [0, 0, -0.6, 0.6, -0.4, 0.3, 0, 0] } : { x: 0, y: 0 }} transition={{ duration: 7, repeat: Infinity, ease: 'linear', times: [0, 0.94, 0.953, 0.966, 0.979, 0.99, 0.996, 1] }}>
              <g>
                <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur={friccion ? '14s' : '2.4s'} repeatCount="indefinite" />
                {[0, 120, 240].map((g0, k) => {
                  const Pt = (rr: number, g: number) => `${(cx + rr * Math.cos(rad(g))).toFixed(1)} ${(cy + rr * Math.sin(rad(g))).toFixed(1)}`;
                  return <path key={k} d={`M ${Pt(64, g0)} A 64 64 0 0 1 ${Pt(64, g0 + 104)} L ${Pt(53, g0 + 116)} L ${Pt(42, g0 + 104)} A 42 42 0 0 0 ${Pt(42, g0)} Z`} fill={['#ff851d', '#ef375c', '#ffb27a'][k]} />;
                })}
              </g>
              <circle cx={cx} cy={cy} r={22} fill={isDark ? '#3a3a3a' : '#e5e7eb'} />
              <circle cx={cx} cy={cy} r={8} fill={friccion ? (isDark ? '#111' : '#6b7280') : ORANGE} />
            </motion.g>
            {friccion && [[-66, -8], [48, 34], [14, -64], [60, -30]].map(([dx, dy], k) => (
              <PulseDisc key={k} cx={cx + dx} cy={cy + dy} rx={16} ry={16} color={isDark ? '#111' : '#6b7280'} dur={1.6} delay={k * 0.4} peak={0.55} />
            ))}
                      </svg>
          <p className={`max-w-[400px] text-center text-[11.5px] leading-snug ${textMuted(isDark)}`}>
            {friccion
              ? 'La maqueta es el flywheel. Las manchas oscuras son la fricción: aunque se empuje al máximo, la rueda gira lento.'
              : 'La maqueta es el flywheel. Sin manchas de roce, gira mucho más rápido con un empuje normal.'}
          </p>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <div className="grid grid-cols-2 gap-2.5">
            <Nota isDark={isDark} label="Fuerza bien aplicada">Alex queda feliz, lo cuenta a colegas y amigos, y cada ciclo trae más alcance: el crecimiento se acelera de forma exponencial y rompe la línea recta.</Nota>
            <Nota isDark={isDark} label="Fricción sin atender">Alex tiene una mala experiencia y el boca a boca negativo viaja de persona en persona: cada vez cuesta más encontrar a alguien dispuesto a comprarte.</Nota>
          </div>
          <Nota isDark={isDark} label="Dónde poner la fuerza: en deleitar" destacada>
            Un ejemplo no obvio es la compensación de ventas. En el caso documentado en el curso, si el cliente cancela dentro de los <strong>8 meses</strong>, el vendedor devuelve la comisión, y quienes retienen más y tienen clientes más felices ganan más. Incentivos alineados con el éxito del cliente producen más deleite.
          </Nota>
          <Nota isDark={isDark} label="Tu ejercicio">Lista todas las fuerzas que tu empresa despliega para atraer, interactuar y deleitar, y en qué lugares se pueden reasignar recursos para aumentar el deleite del cliente.</Nota>
        </div>
        </div>
      </div>
    </Shell>
  );
}

const FRICCIONES = {
  externa: {
    etapas: ['Descubre', 'Compra', 'Recibe', 'Pide ayuda'],
    items: [
      { t: 'Esperas largas en teléfono o chat', e: 3 },
      { t: 'Formularios web sin respuesta', e: 0 },
      { t: 'Información difícil de hallar en el sitio', e: 0 },
      { t: 'Obligar a hablar con alguien para algo de autoservicio', e: 1 },
      { t: 'Retrasos en la entrega', e: 2 },
      { t: 'Fallas del producto o servicio', e: 2 },
      { t: 'Precios altos', e: 1 },
      { t: 'Cobros sorpresa', e: 1 },
    ],
  },
  interna: {
    etapas: ['Marketing', 'Ventas', 'Servicio', 'Operaciones'],
    items: [
      { t: 'Una fuente de verdad distinta por equipo', e: 3 },
      { t: 'Difícil encontrar la información del cliente', e: 2 },
      { t: 'Procesos duplicados o en conflicto entre equipos', e: 1 },
      { t: 'Equipos sin procesos consistentes', e: 0 },
      { t: 'Alta rotación de personas', e: 1 },
      { t: 'Incorporación y capacitación insuficientes', e: 2 },
    ],
  },
};

export function Friccion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [tipo, setTipo] = useState<'externa' | 'interna'>('externa');
  const [i, setI] = useState(0);
  const data = FRICCIONES[tipo];
  const it = data.items[Math.min(i, data.items.length - 1)];
  const pos: [number, number][] = [[70, 176], [170, 148], [270, 120], [370, 92]];
  return (
    <Shell isDark={isDark} title="Dónde está" highlight="la fricción" subtitle="Busca los bordes filosos: lugares con demasiados traspasos o donde algo no funciona. Haz la lista, ordénala por facilidad de arreglo o por impacto, y ataca las primeras de inmediato.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[44%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={tipo === 'externa'} onClick={() => { setTipo('externa'); setI(0); }}>La vive el cliente</Pill>
            <Pill isDark={isDark} on={tipo === 'interna'} onClick={() => { setTipo('interna'); setI(0); }}>La viven tus equipos</Pill>
          </div>
          <svg viewBox="0 0 440 236" className="w-full max-h-[270px] overflow-visible" role="img" aria-label="Recorrido con un punto de fricción marcado">
            <SceneDefs id="rofr" isDark={isDark} />
            {pos.map(([x, y], k) => {
              const on = k === it.e;
              return (
                <g key={k}>
                  {on && <PulseDisc cx={x} cy={y + 12} rx={56} ry={18} color={PINK} dur={1.4} peak={0.45} />}
                  <g filter="url(#rofr-sh)"><IsoBox cx={x} cy={y} s={34} h={10} f={on ? BRAND : NEUTRAL(isDark)} /></g>
                  <text x={x} y={y + 17 + 10 + 20} textAnchor="middle" fontSize={12} fontWeight={900} fill={on ? PINK : t.muted}>{data.etapas[k]}</text>
                </g>
              );
            })}
            <Traveler id="rofr" path={[[70, 168], hop([70, 168], [170, 140], 22)[1], [170, 140], hop([170, 140], [270, 112], 22)[1], [270, 112], hop([270, 112], [370, 84], 22)[1], [370, 84]]} dur={3.4} repeatDelay={0.5} r={5} />
          </svg>
          <p className={`text-xs text-center max-w-sm ${textMuted(isDark)}`}>Cada plataforma es una etapa del recorrido. El pulso rosa marca en cuál se siente la fricción seleccionada, y el punto naranja es el cliente avanzando.</p>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
          <p className={microLabel(isDark)}>{tipo === 'externa' ? 'Ejemplos de fricción que enfrenta el cliente' : 'Ejemplos de fricción interna'}</p>
          <div className="grid grid-cols-2 gap-1.5 content-start min-h-[212px]">
            {data.items.map((x, k) => <Opcion key={x.t} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.t}</Opcion>)}
          </div>
          <p className={`text-xs ${textMuted(isDark)}`}>Esta fricción se siente en la etapa <strong className="text-[#ef375c]">{data.etapas[it.e]}</strong>.</p>
          <Cita isDark={isDark} autor="Yamini Rangan">Quitar la fricción es examinar la experiencia del cliente a lo largo del recorrido e identificar los bordes filosos: demasiados traspasos, lugares que no funcionan.</Cita>
          <Nota isDark={isDark} label="Regla de prioridad" destacada>Prioridad es qué tan fácil es arreglar un proceso o cuánto impacto tendrá en clientes y compañeros: se elige un criterio y se empieza por lo de arriba. Cualquier mejora a la experiencia del cliente tiene efecto positivo en el negocio. Lo interno importa igual: todo lo que dificulta a tus equipos servir bien termina como fricción para el cliente.</Nota>
        </div>
      </div>
    </Shell>
  );
}

const FRIC_CASOS = [
  {
    k: 'Fechas de inicio',
    cuadrante: 1,
    txt: 'Una agencia arranca clientes nuevos solo los días 1 y 15 de cada mes. Para quien quiere empezar el 5 es fricción, pero ventas la convierte en fuerza: «para partir el 15, el contrato debe llegar antes de fin de mes». Alinea expectativas y acelera la firma.',
    extra: 'Es como pedirle a tu estilista de confianza una cita para hoy: te dirá que puede atenderte en tres semanas. Si hoy es 30 de marzo y el próximo cupo es el 15 de abril, el contrato debe llegar antes de fin de mes.',
    autor: 'Jen Spencer',
  },
  {
    k: 'Formulario de pasaporte',
    cuadrante: 1,
    txt: 'A mitad de un formulario aparecían 17 documentos requeridos. Al pedir que la persona confirmara al inicio que los tenía (más fricción), subieron los formularios completados, la satisfacción y el NPS.',
    extra: 'Quien no estaba listo decidía volver más tarde, en lugar de abandonar a mitad de camino. Davidoff vivió lo contrario con una cuenta gratuita que, ya empezada, pedía datos bancarios.',
    autor: 'Doug Davidoff',
  },
  {
    k: 'Fricción que se traslada',
    cuadrante: 0,
    txt: 'Cuando reduces la fricción en un lugar, casi siempre se crea en otro. Quitarla exige un análisis de costo y beneficio, no un reflejo automático.',
    extra: 'No basta con quitar lo que claramente no funciona: hay que considerar el matiz y el impacto de cada punto, por pequeño que parezca.',
    autor: 'Doug Davidoff',
  },
];

export function FriccionUtil({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const c = FRIC_CASOS[i];
  const celdas = [
    { t: 'Fricción en lugar de poco valor', d: 'Elimínala: es la que daña la experiencia.', fila: 0, col: 1 },
    { t: 'Fricción intencional en un momento de alto valor', d: 'Úsala: hace que la persona se detenga y piense.', fila: 0, col: 0 },
    { t: 'Sin fricción en lo rutinario', d: 'Lo ideal: lo de poco valor debe ser fluido.', fila: 1, col: 1 },
    { t: 'Sin fricción en lo decisivo', d: 'Cuidado: la persona avanza sin darse cuenta de lo que implica.', fila: 1, col: 0 },
  ];
  return (
    <Shell isDark={isDark} title="Cuando la fricción" highlight="suma valor" subtitle="Al principio conviene asumir que toda fricción es mala. Con más madurez, aprendes a usarla a propósito: la cantidad de fricción debe calzar con el valor que agrega.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col justify-center gap-2">
          <div className="grid grid-cols-[auto_1fr_1fr] gap-1.5 items-stretch">
            <span />
            <span className={`${microLabel(isDark)} text-center`}>Momento de alto valor</span>
            <span className={`${microLabel(isDark)} text-center`}>Momento de bajo valor</span>
            {[0, 1].map((fila) => (
              <React.Fragment key={fila}>
                <span className={`${microLabel(isDark)} [writing-mode:vertical-rl] rotate-180 text-center`}>{fila === 0 ? 'Con fricción' : 'Sin fricción'}</span>
                {[0, 1].map((col) => {
                  const cel = celdas.find((x) => x.fila === fila && x.col === col)!;
                  const activa = (fila === 0 && col === 0 && c.cuadrante === 1) || (fila === 0 && col === 1 && c.cuadrante === 0);
                  return (
                    <motion.div key={col} animate={{ scale: activa ? 1.03 : 1 }} className={`p-3 rounded-2xl min-h-[96px] ${activa ? featuredClass(isDark) : panelClass(isDark)}`}>
                      <p className={`text-[13px] font-black leading-tight ${activa ? 'text-[#ff851d]' : heading(isDark)}`}>{cel.t}</p>
                      <p className={`text-xs leading-snug mt-1 ${textMuted(isDark)}`}>{cel.d}</p>
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <Cita isDark={isDark} autor="Doug Davidoff">Toda experiencia de alto valor tiene fricción; si no la tuviera, ni la notaría. El problema es la fricción en un lugar de poco valor. No usar la fricción es no usar una herramienta.</Cita>
          <div className="flex gap-1.5 flex-wrap">{FRIC_CASOS.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill>)}</div>
          <div className="grid">
            {FRIC_CASOS.map((x, k) => (
              <motion.div key={x.k} className="col-start-1 row-start-1" initial={false} animate={{ opacity: k === i ? 1 : 0, y: k === i ? 0 : 6 }} style={{ pointerEvents: k === i ? 'auto' : 'none' }} aria-hidden={k !== i}>
                <Nota isDark={isDark} label={`Caso · ${x.autor}`} destacada>{x.txt} <span className="opacity-80">{x.extra}</span></Nota>
              </motion.div>
            ))}
          </div>
          <Nota isDark={isDark} label="Cómo empezar">Dibuja tu flywheel, lista todos sus puntos de fuerza y fricción, y elimina primero las fricciones más negativas. Después distingue cuáles dañan y cuáles mejoran la experiencia. La fuerza también puede restar: el objetivo es reducir la fricción y la fuerza negativas, y aumentar las positivas.</Nota>
        </div>
      </div>
    </Shell>
  );
}

const EJEMPLO = [
  { fase: 'Atraer', color: ORANGE, lado: 'izq', herramienta: 'Blog, SEO y anuncios', equipo: 'Marketing', metrica: 'MQL y costo por lead', valor: '400 MQL al mes', detalle: 'de 20.000 visitas: 2% deja sus datos' },
  { fase: 'Interactuar', color: PINK, lado: 'der', herramienta: 'Prospección y demos', equipo: 'Ventas', metrica: 'Tasa de cierre', valor: '25 negocios ganados', detalle: '400 MQL → 100 SQL → 25 cierres' },
  { fase: 'Deleitar', color: '#f4834f', lado: 'izq', herramienta: 'Onboarding, chat y soporte', equipo: 'Servicio y éxito del cliente', metrica: 'NPS y retención', valor: 'NPS 45', detalle: '90% de los clientes renueva al año' },
  { fase: 'Promotores', color: '#fbae3c', lado: 'der', herramienta: 'Referidos y reseñas', equipo: 'Éxito del cliente y marketing', metrica: 'Clientes que llegan referidos', valor: '1 de cada 5', detalle: 'clientes nuevos llega recomendado' },
];

function TarjetaEjemplo({ isDark, e, on, onClick, k }: { isDark: boolean; e: (typeof EJEMPLO)[number]; on: boolean; onClick: () => void; k: number }) {
  const izq = e.lado === 'izq';
  return (
    <motion.div
      initial={{ opacity: 0, x: izq ? -24 : 24 }}
      animate={{ opacity: 1, x: 0, scale: on ? 1.03 : 1 }}
      transition={{ delay: 0.2 + k * 0.15, type: 'spring', stiffness: 110, damping: 16 }}
      onClick={onClick}
      className={`relative cursor-pointer p-3 rounded-2xl ${on ? featuredClass(isDark) : panelClass(isDark)}`}
    >
      <div className={`absolute top-1/2 -translate-y-1/2 ${izq ? '-right-9' : '-left-9'} w-9 h-2 overflow-hidden`}>
        {on && (
          <motion.span
            className="absolute top-0 w-2 h-2 rounded-full"
            style={{ background: e.color }}
            initial={{ left: izq ? '100%' : '-10%' }}
            animate={{ left: izq ? ['100%', '-10%'] : ['-10%', '100%'] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeIn' }}
          />
        )}
      </div>
      <p className="text-sm font-black" style={{ color: e.color }}>{e.fase}</p>
      <p className={`text-[11.5px] leading-snug mt-0.5 ${textMuted(isDark)}`}><strong>Herramienta:</strong> {e.herramienta}</p>
      <p className={`text-[11.5px] leading-snug ${textMuted(isDark)}`}><strong>Equipo:</strong> {e.equipo}</p>
      <p className={`text-[11.5px] leading-snug ${textMuted(isDark)}`}><strong>Métrica:</strong> {e.metrica}</p>
      <div className="mt-1.5 flex items-baseline gap-2 flex-wrap">
        <span className={`text-lg font-black ${heading(isDark)}`}>{e.valor}</span>
        <span className={`text-[11px] ${textMuted(isDark)}`}>{e.detalle}</span>
      </div>
    </motion.div>
  );
}

export function MapaFlywheel({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  React.useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setI((x) => (x + 1) % EJEMPLO.length), 3500);
    return () => clearInterval(id);
  }, [auto]);
  const elegir = (k: number) => { setAuto(false); setI(k); };
  const col = (lado: string) => EJEMPLO.map((e, k) => ({ e, k })).filter((x) => x.e.lado === lado);
  return (
    <Shell isDark={isDark} title="Un flywheel" highlight="de ejemplo" subtitle="Así se ve el flywheel de una empresa B2B típica una vez mapeado: cada fase con su herramienta, el equipo que la maneja, la métrica que la mide y el indicador que alimenta.">
      <div className="h-full flex flex-col gap-2 min-h-0 justify-center">
        <div className="grid grid-cols-[1fr_330px_1fr] gap-9 items-center">
          <div className="flex flex-col gap-3">
            {col('izq').map(({ e, k }) => <TarjetaEjemplo key={e.fase} isDark={isDark} e={e} k={k} on={k === i} onClick={() => elegir(k)} />)}
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 80, damping: 14 }} className="flex justify-center">
            <RuedaFlywheel isDark={isDark} i={i < 3 ? i : -1} setI={elegir} />
          </motion.div>
          <div className="flex flex-col gap-3">
            {col('der').map(({ e, k }) => <TarjetaEjemplo key={e.fase} isDark={isDark} e={e} k={k} on={k === i} onClick={() => elegir(k)} />)}
          </div>
        </div>
        <p className={`max-w-[760px] mx-auto text-center text-[11.5px] leading-snug ${textMuted(isDark)}`}>
          La rueda gira como el flywheel de la lección. La fase resaltada corresponde a la tarjeta activa, y el punto que sale hacia ella es el indicador que esa fase alimenta. Las cifras son ilustrativas de una empresa B2B típica, no un estándar publicado.
        </p>
      </div>
    </Shell>
  );
}
