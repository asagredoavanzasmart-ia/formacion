import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass } from '../slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFloor, Cylinder, Orb, Float, Lift, Traveler, PulseDisc, hop, Persona,
} from '../scene3d';
import { SlideProps, heading, Piso, Bola, Cifra, Cita, Nota, Fuente, Opcion, BarrasIso, Campo, Paso, Verificado, fmt, useNarrado } from './kit';

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 6 · Gestión de sistemas
══════════════════════════════════════════════════════════════════ */

const CAPAS = [
  { k: 'Definir procesos', d: 'Qué hacemos, paso 1, 2, 3, 4: enrutamiento y puntaje de leads, segmentación, puntaje de cuentas, ABM, datos de intención. ¿Estamos todos de acuerdo?', s: 84, h: 26 },
  { k: 'Gobierno de datos', d: 'Las reglas que mantienen los datos limpios y confiables: qué campos existen, quién puede crearlos o borrarlos y hacia dónde se sincronizan.', s: 62, h: 24 },
  { k: 'Stack tecnológico', d: 'Recién ahora: qué sistemas tenemos y cómo pueden apoyar ese proceso.', s: 40, h: 22 },
];

export function ProcesoPrimero({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const cx = 170;
  const cys = [150, 126, 104];
  return (
    <Shell isDark={isDark} title="Primero el proceso," highlight="después la herramienta" subtitle="Hay tres áreas en las que invertir para tener buenos datos, y van en este orden. Las herramientas aceleran el proceso que ya existe: si no está definido, se acelera en la dirección equivocada.">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
      <div className="flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[48%] flex flex-col items-center justify-center gap-4">
          <div className="grid w-full">
            {CAPAS.map((c, k) => (
              <motion.div key={c.k} className="col-start-1 row-start-1" initial={false} animate={{ opacity: k === i ? 1 : 0, y: k === i ? 0 : 6 }} transition={{ duration: 0.3 }} style={{ pointerEvents: k === i ? 'auto' : 'none' }}>
                <Nota isDark={isDark} label={`Área ${k + 1} · ${c.k}`} destacada>{c.d}</Nota>
              </motion.div>
            ))}
          </div>
          <svg viewBox="0 0 440 262" className="w-full max-h-[290px] overflow-visible" role="img" aria-label="Pirámide: procesos, datos y herramientas">
            <SceneDefs id="rpp" isDark={isDark} />
            <Piso cx={cx} cy={196} s={124} fill={t.floor} />
            {CAPAS.map((c, k) => {
              const on = k === i;
              return (
                <g key={c.k} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }}>
                  <motion.g initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.25, type: 'spring', stiffness: 80, damping: 13 }}>
                    <g filter="url(#rpp-sh)"><IsoBox cx={cx} cy={cys[k]} s={c.s} h={c.h} f={on ? BRAND : k === 0 ? PEACH : NEUTRAL(isDark)} /></g>
                  </motion.g>
                  <text x={290} y={cys[k] + c.h / 2 + 18} fontSize={12.5} fontWeight={900} fill={on ? ORANGE : t.muted}>{k + 1}. {c.k}</text>
                </g>
              );
            })}
            {i === 0 && <PulseDisc cx={cx} cy={206} rx={96} ry={30} dur={2.2} peak={0.25} />}
            <Traveler id="rpp" path={[[cx, 150], [cx, 104], [cx, 62]]} dur={1.8} repeatDelay={0.6} r={4.5} />
          </svg>
        </div>
        <div className="lg:w-[52%] flex flex-col gap-4 justify-center">
          <Cita isDark={isDark} autor="Daniel Remedios">Hay herramientas maravillosas y brillantes, pero son un multiplicador de fuerza. Si las traes demasiado pronto, te frenas casi hasta detenerte, porque no tienes claro qué herramienta necesitas ni para qué.</Cita>
          <Cita isDark={isDark} autor="Asia Corbett">Finanzas y marketing me preguntaron por qué dos reportes daban distinto: «¡uno está mal!». Ninguno estaba mal. Usaban definiciones distintas de lo que es un SQL.</Cita>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 [&>*]:h-full">
        <Nota isDark={isDark} label="Extender el mapa en ambas direcciones">¿De dónde vienen los leads antes del pipeline y qué pasa con los clientes después del cierre? Lo que más importa son los traspasos entre equipos y cada tasa de conversión: ahí todos deben usar la misma definición.</Nota>
        <Nota isDark={isDark} label="El modelo de datos se protege">Ventas, marketing y servicio acuerdan el modelo de datos y un proceso para cambiarlo. Si un equipo lo modifica por su cuenta, los reportes de punta a punta se rompen (Bryan Semple).</Nota>
      </div>
      </div>
    </Shell>
  );
}

const DICCIONARIO = [
  { dato: 'Código postal', crm: 'Código postal', mkt: 'ZIP', fact: 'Cód. postal', flujo: 'CRM → los demás', registro: 'CRM' },
  { dato: 'Región', crm: 'Región', mkt: 'Estado', fact: 'Región', flujo: 'CRM → los demás', registro: 'CRM' },
  { dato: 'Nombre', crm: 'Nombre + Apellido', mkt: 'Nombre completo', fact: 'Razón social', flujo: 'Marketing → CRM', registro: 'Automatización de marketing' },
  { dato: 'Monto del contrato', crm: 'Monto', mkt: '—', fact: 'Total facturado', flujo: 'Facturación → CRM', registro: 'Facturación' },
];

export function Gobierno({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [orden, setOrden] = useState(true);
  const [fila, setFila] = useState(0);
  const offs = orden ? [0, 0, 0, 0, 0, 0] : [0, 10, -12, 14, -8, 16];
  return (
    <Shell isDark={isDark} title="Gobierno" highlight="de datos" subtitle="Un marco interno que gestiona la disponibilidad, usabilidad, integridad y seguridad de los datos, y fija las normas y políticas de acceso. Quien lidera RevOps debe encabezarlo.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[34%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={!orden} onClick={() => setOrden(false)}>Sin reglas</Pill>
            <Pill isDark={isDark} on={orden} onClick={() => setOrden(true)}>Con gobierno</Pill>
          </div>
          <svg viewBox="0 0 260 250" className="w-full max-h-[270px] overflow-visible" role="img" aria-label="Torre de personalizaciones">
            <SceneDefs id="rgo" isDark={isDark} />
            <Piso cx={130} cy={206} s={96} fill={t.floor} />
            {offs.map((o, k) => (
              <motion.g key={k} initial={false} animate={{ x: o, rotate: orden ? 0 : (k % 2 ? 3 : -3) }} transition={{ type: 'spring', stiffness: 60, damping: 8 }} style={{ transformOrigin: `130px ${202 - k * 16}px` }}>
                <Float amp={orden ? 0 : 2.5} dur={0.9 + k * 0.1}>
                  <g filter="url(#rgo-sh)"><IsoBox cx={130} cy={186 - k * 16} s={40} h={16} f={orden ? (k % 2 ? PEACH : BRAND) : NEUTRAL(isDark)} /></g>
                </Float>
              </motion.g>
            ))}
            <text x={130} y={236} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={orden ? ORANGE : PINK}>{orden ? 'Simple, documentado y estable' : 'Se saca una pieza y todo puede caerse'}</text>
            <text x={130} y={252} textAnchor="middle" fontSize={10} fontWeight={800} fill={t.muted}>{orden ? 'Cada cambio se justifica y se documenta' : 'Diez años de personalizaciones, una sobre otra'}</text>
          </svg>
        </div>
        <div className="lg:w-[66%] flex flex-col gap-2.5 justify-center">
          <div className={`rounded-3xl p-3 ${panelClass(isDark)}`}>
            <p className={microLabel(isDark)}>Diccionario de datos · ejemplo ilustrativo</p>
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1.1fr] gap-x-2 gap-y-1 mt-1.5 text-[11.5px]">
              {['Dato', 'CRM', 'Marketing', 'Facturación', 'Sistema de registro'].map((h) => <span key={h} className="font-black text-[#ff851d]">{h}</span>)}
              {DICCIONARIO.map((d, k) => (
                <React.Fragment key={d.dato}>
                  {[d.dato, d.crm, d.mkt, d.fact, d.registro].map((v, j) => (
                    <button key={j} onClick={() => setFila(k)} className={`text-left px-1.5 py-1 rounded-lg ${k === fila ? (isDark ? 'bg-white/10 text-white font-bold' : 'bg-orange-50 text-gray-900 font-bold') : textMuted(isDark)}`}>{v}</button>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <p className={`text-xs mt-1.5 ${textMuted(isDark)}`}>Dirección de la sincronización de «{DICCIONARIO[fila].dato}»: <strong className="text-[#ef375c]">{DICCIONARIO[fila].flujo}</strong>. Un buen diccionario reúne los datos más importantes, el nombre del campo en cada sistema, cómo se integran, hacia dónde fluyen y cuál es el sistema de registro.</p>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Nota isDark={isDark} label="Controles mínimos">No todos pueden borrar ni crear. Ciertos campos son obligatorios antes de entrar al sistema. Cada sincronización tiene dirección y responsable. Y no todo campo pedido hace falta: cada uno suma deuda técnica.</Nota>
            <Nota isDark={isDark} label="Más simple es mejor" destacada>La simplicidad no se añade: se consigue quitando complejidad. Antes de personalizar, dos preguntas: ¿mueve de verdad el resultado? ¿Se acepta el mantenimiento que trae después? (Bryan Semple)</Nota>
          </div>
          <Cita isDark={isDark} autor="Bryan Semple">¿Quieres un campo nuevo? Perfecto: tú lo reportas cada semana. A los cinco o seis meses nadie lo mira, y entonces se borra.</Cita>
        </div>
      </div>
    </Shell>
  );
}

const CADENA = [
  { k: 'Tickets de soporte', d: 'Suben los tickets de un cliente: primera señal de que algo no funciona.' },
  { k: 'Uso del producto', d: 'Cae el uso: el cliente deja de obtener valor.' },
  { k: 'Riesgo de renovación', d: 'Se acerca la renovación con un cliente poco comprometido.' },
  { k: 'Ingresos', d: 'Indicador rezagado: cuando se mueve, el problema ya ocurrió.' },
];

export function Indicadores({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const [pistas, setPistas] = useState(0);
  const PISTAS = ['La tasa de rebote es de 99%.', 'Casi todo el tráfico viene de un país donde no se vende.', 'Ese país es conocido por su tráfico de bots.'];
  return (
    <Shell isDark={isDark} title="Indicadores adelantados y" highlight="la historia detrás del número" subtitle="Los ingresos son un indicador rezagado. Para corregir a tiempo hay que encontrar los indicadores adelantados que terminan convirtiéndose en ingresos, y vigilarlos de cerca (Dwamian Mcleish).">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[50%] flex flex-col items-center justify-center gap-2">
          <svg viewBox="0 0 460 210" className="w-full max-h-[240px] overflow-visible" role="img" aria-label="Cadena de indicadores">
            <SceneDefs id="rin" isDark={isDark} />
            <Piso cx={230} cy={120} s={226} fill={t.floor} />
            {CADENA.map((c, k) => {
              const x = 60 + k * 113;
              const on = k === i;
              return (
                <g key={c.k} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }}>
                  {on && <PulseDisc cx={x} cy={128} rx={40} ry={13} dur={2} peak={0.35} color={k === 3 ? PINK : ORANGE} />}
                  <Float amp={on ? 5 : 2} dur={2 + k * 0.2}><Bola id="rin" cx={x} cy={104} r={on ? 20 : 15} neutral={!on && k !== 3} /></Float>
                  <text x={x} y={156} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={on ? ORANGE : t.muted}>{c.k}</text>
                  <text x={x} y={171} textAnchor="middle" fontSize={10} fontWeight={800} fill={t.muted}>{k === 3 ? 'rezagado' : 'adelantado'}</text>
                </g>
              );
            })}
            <Traveler id="rin" path={[[60, 92], [173, 92], [286, 92], [399, 92]]} dur={3} repeatDelay={0.4} r={5} />
            <text x={230} y={204} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Más tickets de soporte pueden anticipar la pérdida de clientes</text>
          </svg>
          <div className="grid w-full">
            {CADENA.map((c, k) => (
              <motion.div key={c.k} className="col-start-1 row-start-1" initial={false} animate={{ opacity: k === i ? 1 : 0, y: k === i ? 0 : 6 }} transition={{ duration: 0.3 }} style={{ pointerEvents: k === i ? 'auto' : 'none' }}>
                <Nota isDark={isDark} label={c.k}>{c.d}</Nota>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
          <div className={`p-3.5 rounded-3xl ${featuredClass(isDark)}`}>
            <p className={microLabel(isDark)}>El dato se lee como una historia</p>
            <p className={`text-lg font-black ${heading(isDark)}`}>100.000 visitas en un día, cuando lo normal son 1.000.</p>
            <div className="flex flex-col gap-1 mt-1.5">
              {PISTAS.slice(0, pistas).map((p) => <motion.p key={p} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={`text-sm ${textMuted(isDark)}`}>• {p}</motion.p>)}
            </div>
            {pistas < 3
              ? <button onClick={() => setPistas(pistas + 1)} className="mt-2 px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white">Siguiente pista</button>
              : <p className="mt-2 text-sm font-black text-[#ef375c]">No es un triunfo: probablemente es tráfico de bots. Interpretar el dato es el oficio de quien analiza.</p>}
          </div>
          <Cita isDark={isDark} autor="Devyn Bellamy">Los buenos reportes no salen de la nada; lo intenté. Lo que funciona es preguntar a la gente qué quiere saber, no qué reporte quiere ver, y buscar los datos que respondan esa pregunta.</Cita>
          <Nota isDark={isDark} label="Para qué sirve todo esto">Ver juntos varios datos (tickets y pérdida de clientes, por ejemplo) muestra qué palancas mueven el resultado y cuáles se pueden mover para cambiarlo. Una empresa pequeña o mediana puede partir por las herramientas que ya tiene.</Nota>
        </div>
      </div>
    </Shell>
  );
}

export function Stack({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [integrado, setIntegrado] = useState(false);
  const n = integrado ? 3 : 7;
  const xs = Array.from({ length: n }, (_, k) => 50 + (k * 360) / (n - 1));
  return (
    <Shell isDark={isDark} title="Administrar" highlight="el stack tecnológico" subtitle="Lo normal no es implementar desde cero: es heredar un stack desordenado, porque cada departamento compró herramientas sin pensar en el resto. RevOps debe tener voz en qué entra y por qué.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[48%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={!integrado} onClick={() => setIntegrado(false)}>Hoy: 7 sistemas</Pill>
            <Pill isDark={isDark} on={integrado} onClick={() => setIntegrado(true)}>Integrado: 3 sistemas</Pill>
          </div>
          <svg viewBox="0 0 460 220" className="w-full max-h-[215px] overflow-visible" role="img" aria-label={`El cliente pasa por ${n} sistemas`}>
            <SceneDefs id="rst" isDark={isDark} />
            <Piso cx={230} cy={130} s={226} fill={t.floor} />
            <g key={n}>
              {xs.map((x, k) => (
                <motion.g key={k} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.07, type: 'spring', stiffness: 90, damping: 13 }}>
                  <g filter="url(#rst-sh)"><IsoBox cx={x} cy={100} s={integrado ? 32 : 20} h={integrado ? 30 : 22} f={integrado ? BRAND : k % 3 === 0 ? PEACH : NEUTRAL(isDark)} /></g>
                </motion.g>
              ))}
              <Traveler id="rst" path={xs.map((x) => [x, 84] as [number, number])} dur={integrado ? 1.4 : 3.6} repeatDelay={0.3} r={5} />
            </g>
            <text x={230} y={182} textAnchor="middle" fontSize={12} fontWeight={900} fill={integrado ? ORANGE : PINK}>{integrado ? 'Recorrido corto y datos que no se pierden' : 'Siete traspasos: el dato se aleja de la verdad'}</text>
            <text x={230} y={200} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Mapa de flujo de valor: el camino del cliente por los sistemas</text>
          </svg>
          <Cita isDark={isDark} autor="Dwamian Mcleish">Una vez que muestras «movemos a un cliente por siete sistemas sin ningún beneficio», la conversación es más fácil que decir «voy a sacar cuatro sistemas».</Cita>
          <Nota isDark={isDark} label="Sacar un sistema también es un cambio">El equipo que lo ocupa está acostumbrado y puede resistirse: necesita acompañamiento. También conviene revisar qué datos se dejarían de capturar (Asia Corbett).</Nota>
        </div>
        <div className="lg:w-[52%] flex flex-col gap-2 justify-center">
          <Nota isDark={isDark} label="RevOps no es TI" destacada>TI y los administradores hacen que las cosas funcionen, incluso con eficiencia, pero rara vez entran en el porqué. RevOps se ocupa de la eficiencia de ingresos, la transparencia de los datos y el uso responsable de herramientas y datos (Devyn Bellamy).</Nota>
          <p className={microLabel(isDark)}>Antes de aprobar una herramienta nueva</p>
          <Paso isDark={isDark} n={1} titulo="¿Ya lo hace lo que hay?">Si el CRM o la herramienta principal ya lo hace, la negociación será difícil (Jen Bergren). Lo integrado tiene menos funciones, pero ahorra complejidad y costo.</Paso>
          <Paso isDark={isDark} n={2} titulo="¿Quién la aprueba?">Operaciones debe aprobar las herramientas, junto a finanzas y TI. Nadie la carga a la tarjeta de la empresa por su cuenta.</Paso>
          <Paso isDark={isDark} n={3} titulo="¿Profundidad o complejidad?">Las soluciones puntuales tienen más funciones; muchas juntas terminan en un sistema «espagueti» (Bryan Semple).</Paso>
          <Paso isDark={isDark} n={4} titulo="¿Vale la pena automatizar?">Primero se resuelve a mano. No conviene dedicar 10 horas a automatizar algo que toma 30 minutos (Matthew Volm).</Paso>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 7 · Comunicar el valor de RevOps
══════════════════════════════════════════════════════════════════ */

const INICIATIVAS = [
  { k: 'Bajar el costo de adquirir clientes', linea: 4, efecto: 'Sube el resultado operacional.' },
  { k: 'Vender a la base de clientes actual', linea: 0, efecto: 'Suben los ingresos de primera línea (top line).' },
  { k: 'Vender más sin agrandar el equipo', linea: 3, efecto: 'Bajan los gastos operativos en proporción a lo que se vende.' },
];

export function Lenguaje({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const lineas = ['Ingresos', 'Costo de ventas', 'Margen bruto', 'Gastos operativos', 'Resultado operacional'];
  const valores = [100, 40, 60, 35, 25];
  return (
    <Shell isDark={isDark} title="Habla" highlight="el idioma del negocio" subtitle="Operaciones se ve como un gasto: es una línea de los estados financieros. Tu trabajo frente a la gerencia es traducir ese gasto en un activo que genera ingresos, en pesos y centavos.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[48%] flex flex-col items-center justify-center gap-2">
          <div className="w-full h-[240px]">
            <BarrasIso id={`rle${i}`} isDark={isDark} max={100} W={500} hMax={130} items={lineas.map((l, k) => ({ name: l, value: valores[k], label: String(valores[k]), tone: k === INICIATIVAS[i].linea ? 'brand' : 'neutral', hl: k === INICIATIVAS[i].linea }))} caption="Estado de resultados simplificado (cifras ilustrativas)" />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            {INICIATIVAS.map((x, k) => <Opcion key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k} → {x.efecto}</Opcion>)}
          </div>
        </div>
        <div className="lg:w-[52%] flex flex-col gap-2 justify-center">
          <Paso isDark={isDark} n={1} titulo="Balance general">Una foto en un momento: activos = pasivos + patrimonio. Tus mejoras suelen aumentar activos sin aumentar pasivos.</Paso>
          <Paso isDark={isDark} n={2} titulo="Estado de resultados" on>Un periodo: ingresos − costo de ventas = margen bruto; menos gastos operativos = resultado operacional.</Paso>
          <Paso isDark={isDark} n={3} titulo="Flujo de caja">De dónde viene y adónde va el dinero: flujo operacional = utilidad neta + depreciación y amortización − cambios en capital de trabajo.</Paso>
          <Cita isDark={isDark} autor="Matt Bolian">Le dices al CEO: «vamos a reducir la fricción de ventas y romper los silos con estas herramientas». Y te responde: «genial, es lo que llevo haciendo veinte años, ¿qué tiene de distinto?». Y no puedes explicar por qué importa.</Cita>
          <Fuente isDark={isDark}>Alicia Butler Pierre recomienda cursos gratuitos o de bajo costo de contabilidad y finanzas: «"más eficiente" son palabras vacías si no las atas a un monto».</Fuente>
        </div>
      </div>
    </Shell>
  );
}

const CATEGORIAS_C = [
  { k: 'Fallas internas', d: 'Costos inútiles antes de que el producto llegue al cliente: un proyecto abandonado a medias, madera que se parte, desperdicio.' },
  { k: 'Fallas externas', d: 'Costos después de la compra: corregir una lección con errores, rehacer un mueble que no cabe. Además erosionan la confianza.' },
  { k: 'Evaluación', d: 'Lo que cuesta impedir que una falla interna se vuelva externa: el control de calidad de cada pieza.' },
  { k: 'Prevención', d: 'Lo que cuesta reducir las otras tres. Aquí cabe tu propuesta: no es un gasto nuevo, es prevención.' },
];

const COPQ_PLAN = (p: number) => ({ [-1]: { vend: 0, hDia: 0, dias: 0, costoH: 0, sueldo: 0, c: 0 }, 5: { c: 0 }, 6: { c: 1 }, 7: { c: 2 }, 8: { c: 3 }, 13: { vend: 10 }, 14: { hDia: 1 }, 15: { dias: 260 }, 16: { costoH: 50 }, 19: { sueldo: 100000 } } as Record<number, Record<string, number>>)[p] ?? null;

export function CostoMalaCalidad({ isDark }: SlideProps) {
  const [v, setV, paso] = useNarrado('ro-7-copq', { vend: 10, hDia: 1, dias: 260, costoH: 50, sueldo: 100000, c: 3 }, COPQ_PLAN);
  const { vend, hDia, dias, costoH, sueldo } = v;
  const c = Math.round(v.c);
  const setC = (x: number) => setV((o) => ({ ...o, c: x }));
  const setVend = (x: number) => setV((o) => ({ ...o, vend: x }));
  const setHDia = (x: number) => setV((o) => ({ ...o, hDia: x }));
  const setDias = (x: number) => setV((o) => ({ ...o, dias: x }));
  const setCostoH = (x: number) => setV((o) => ({ ...o, costoH: x }));
  const setSueldo = (x: number) => setV((o) => ({ ...o, sueldo: x }));
  void paso;
  const horas = vend * hDia * dias;
  const costo = horas * costoH;
  const ahorro = costo - sueldo;
  const anios = horas / (50 * 52);
  return (
    <Shell isDark={isDark} title="El costo" highlight="de la mala calidad" subtitle="Una herramienta de Lean Six Sigma que calcula cuánto costaría no mejorar un proceso. Te obliga a dejar de decir «será más eficiente» y a decir «ahorra un 20% del costo operativo».">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[38%] flex flex-col gap-2 justify-center">
          <p className={microLabel(isDark)}>Las cuatro categorías</p>
          <div className="grid grid-cols-2 gap-1.5">{CATEGORIAS_C.map((x, k) => <Opcion key={x.k} isDark={isDark} on={k === c} onClick={() => setC(k)}>{x.k}</Opcion>)}</div>
          <AnimatePresence mode="wait"><motion.div key={c} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Nota isDark={isDark} label={CATEGORIAS_C[c].k} destacada>{CATEGORIAS_C[c].d}</Nota></motion.div></AnimatePresence>
          <Nota isDark={isDark} label="La idea de fondo: Y = f(X)">Y es la meta financiera de la empresa; X son las causas que puedes mover. Tu propuesta es una X que mueve la Y.</Nota>
        </div>
        <div className="lg:w-[62%] flex flex-col gap-2 justify-center">
          <Nota isDark={isDark} label="Caso del material">Un vendedor quiere dejar su cuota de $120.000 y pasar a operaciones con un sueldo de $100.000. La gerencia ve $220.000 en contra. ¿Cómo se paga solo?</Nota>
          <div className="grid grid-cols-5 gap-1.5">
            <Campo isDark={isDark} label="Vendedores" value={vend} onChange={setVend} activo={paso === 13} />
            <Campo isDark={isDark} label="Horas admin/día" value={hDia} step={0.5} onChange={setHDia} activo={paso === 14} />
            <Campo isDark={isDark} label="Días al año" value={dias} onChange={setDias} activo={paso === 15} />
            <Campo isDark={isDark} label="Costo hora" prefijo="$" value={costoH} onChange={setCostoH} activo={paso === 16} />
            <Campo isDark={isDark} label="Sueldo pedido" prefijo="$" value={sueldo} step={5000} onChange={setSueldo} activo={paso === 19 || paso === 20} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Cifra isDark={isDark} n={horas} titulo="Horas de venta en tareas admin" lineas={[`= ${fmt(anios, 1)} años de trabajo de un vendedor (50 h × 52 semanas)`]} />
            <Cifra isDark={isDark} n={costo} prefijo="$" titulo="Lo que hoy cuesta" lineas={['pagar a vendedores por hacer trabajo administrativo']} />
            <Cifra isDark={isDark} n={ahorro} prefijo="$" titulo="Ahorro neto al año" lineas={['después de pagar el sueldo nuevo, sin contar ninguna mejora']} destacada />
          </div>
          <Verificado isDark={isDark} tipo="ok">Rehicimos la cuenta del material: 10 × 1 h × 260 días = 2.600 h; × $50 = $130.000; menos $100.000 de sueldo = $30.000. Y 2.600 h equivalen justo a un año de un vendedor, que cubre la cuota que deja.</Verificado>
        </div>
      </div>
    </Shell>
  );
}

const A3 = [
  { k: 'Antecedentes', lado: 'Por qué importa', d: '¿Qué problema quieres resolver? Cuéntalo como historia: marketing grita «¡oro puro!» y ventas responde «eso es basura».' },
  { k: 'Condición actual', lado: 'Por qué importa', d: 'Gráficos con datos reales: marketing genera 1.000 leads al mes y ventas contacta 15. Más viñetas con lo que eso cuesta.' },
  { k: 'Metas', lado: 'Por qué importa', d: 'Los mismos gráficos en el estado ideal, con viñetas: más tiempo vendiendo, mejor tasa de cierre, retención del equipo.' },
  { k: 'Análisis', lado: 'Por qué importa', d: 'Cinco porqués a cada equipo y un diagrama de espina de pescado: personas, métodos, materiales, equipos, entorno y gestión. Numera cada causa raíz.' },
  { k: 'Contramedidas', lado: 'La solución', d: 'Una fila por causa raíz: contramedida, descripción, beneficios y personas. El SLA será una parte de la propuesta, no toda.' },
  { k: 'Plan', lado: 'La solución', d: 'Cronograma y responsables con DARCI: quién decide, quién rinde cuentas, quién ejecuta, a quién se consulta y a quién se informa.' },
  { k: 'Seguimiento', lado: 'La solución', d: 'Qué indicadores medirás y cada cuánto. Es lo que la gerencia quiere saber: cuándo verá resultados.' },
];

export function InformeA3({ isDark }: SlideProps) {
  const [i, setI] = useState(3);
  const izq = A3.slice(0, 4), der = A3.slice(4);
  const celda = (x: typeof A3[number], k: number) => (
    <motion.button key={x.k} onClick={() => setI(k)} animate={{ scale: k === i ? 1.02 : 1 }} className={`text-left p-2.5 rounded-2xl flex-1 ${k === i ? featuredClass(isDark) : panelClass(isDark)}`}>
      <p className={`text-[13px] font-black ${k === i ? 'text-[#ff851d]' : heading(isDark)}`}>{x.k}</p>
    </motion.button>
  );
  return (
    <Shell isDark={isDark} title="El informe" highlight="A3" subtitle="Una sola hoja de 11 × 17 pulgadas, popularizada por Toyota, para reducir una gran idea a lo esencial. El error común es usarla para documentar una solución ya decidida, en vez de usarla para desarrollarla.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className={`lg:w-[50%] p-3 rounded-3xl flex flex-col gap-2 justify-center ${isDark ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
          <div className="flex gap-1 justify-end">{['Yo', 'Jefatura', 'Ventas', 'Gerencia'].map((n) => <span key={n} className={`px-2 py-0.5 rounded-md text-[10px] font-black ${isDark ? 'bg-white/10 text-gray-300' : 'bg-white text-gray-500 shadow-sm'}`}>{n} ✓</span>)}</div>
          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="flex flex-col gap-2"><span className={microLabel(isDark)}>Lado izquierdo · por qué importa</span>{izq.map((x, k) => celda(x, k))}</div>
            <div className="flex flex-col gap-2"><span className={microLabel(isDark)}>Lado derecho · la solución</span>{der.map((x, k) => celda(x, k + 4))}</div>
          </div>
        </div>
        <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
          <AnimatePresence mode="wait"><motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Nota isDark={isDark} label={`${A3[i].lado} · ${A3[i].k}`} destacada>{A3[i].d}</Nota></motion.div></AnimatePresence>
          <Nota isDark={isDark} label="Las iniciales arriba a la derecha">Cada persona que revisa el A3 y está de acuerdo deja sus iniciales y la fecha. Cuando llegas a la gerencia, muestras cuánta gente ya apoya la idea.</Nota>
          <Nota isDark={isDark} label="Lo que puede revelar el análisis">Quizá ventas no contacta los leads porque no son calificados. O quizá dice «¡no sabía que marketing nos mandaba leads!»: entonces el problema es de sistemas y de traspaso, no de confianza.</Nota>
          <Cita isDark={isDark} autor="Alicia Butler Pierre">Si no puedes expresar tu idea en una página, es que no entiendes del todo lo que intentas comunicar. Usa imágenes y viñetas: la gerencia no lee prosa larga.</Cita>
        </div>
      </div>
    </Shell>
  );
}

const EJECUTIVOS: [number, number][] = [[120, 150], [190, 112], [270, 112], [340, 150]];

export function PreWiring({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [pre, setPre] = useState(true);
  return (
    <Shell isDark={isDark} title="Antes de la reunión:" highlight="honestidad, aliados y pre-wiring" subtitle="El cambio que transforma una organización pide a las personas renunciar a hábitos, lealtades y formas de pensar, a cambio de solo la posibilidad de un futuro mejor (Heifetz y Linsky, Harvard Business Review).">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={!pre} onClick={() => setPre(false)}>Presentar en frío</Pill>
            <Pill isDark={isDark} on={pre} onClick={() => setPre(true)}>Con pre-wiring</Pill>
          </div>
          <svg viewBox="0 0 460 250" className="w-full max-h-[270px] overflow-visible" role="img" aria-label="Reunión con la gerencia con y sin conversaciones previas">
            <SceneDefs id="rpw" isDark={isDark} />
            <ellipse cx={230} cy={168} rx={196} ry={66} fill={t.floor} />
            <g filter="url(#rpw-sh)"><Cylinder cx={230} cy={150} rx={70} ry={22} h={14} top={isDark ? '#4b5563' : '#e5e7eb'} side={isDark ? '#374151' : '#9ca3af'} /></g>
            {EJECUTIVOS.map(([x, y], k) => {
              const contra = !pre && k === 2;
              return (
                <g key={k}>
                  {contra && <PulseDisc cx={x} cy={y + 2} rx={30} ry={10} color={PINK} dur={1.2} peak={0.5} />}
                  <Float amp={2} dur={2.4 + k * 0.2} delay={k * 0.2}><Persona id="rpw" cx={x} cy={y} s={0.72} body={pre || k !== 2 ? (pre ? BRAND : SLATE(isDark)) : NEUTRAL(isDark)} accessory="tie" /></Float>
                </g>
              );
            })}
            <Float amp={3}><Persona id="rpw" cx={230} cy={232} s={0.82} body={PEACH} accessory="compass" /></Float>
            <g key={pre ? 'p' : 'f'}>
              {pre && EJECUTIVOS.map(([x, y], k) => <Traveler key={k} id="rpw" path={hop([230, 186], [x, y - 40], 30)} dur={1.2} delay={k * 0.6} repeatDelay={2} r={4.5} />)}
            </g>
            <text x={230} y={22} textAnchor="middle" fontSize={12} fontWeight={900} fill={pre ? ORANGE : PINK}>{pre ? 'Sin sorpresas: cada objeción se resolvió antes, en privado' : 'Una sola duda en la sala contagia a los demás'}</text>
          </svg>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2 justify-center">
          <Paso isDark={isDark} n={1} titulo="Sé honesto contigo">Si llevas tiempo en la empresa, probablemente contribuiste al desorden. Reconócelo y pide ayuda para corregirlo: culpar a otros te convierte en blanco.</Paso>
          <Paso isDark={isDark} n={2} titulo="Nombra la pérdida">Antes de mostrar tus soluciones, valida lo que pides sacrificar: «Sé cuánto les costó crear estos procesos; por eso quiero su ayuda para cambiarlos».</Paso>
          <Paso isDark={isDark} n={3} titulo="Busca aliados">Ir solo es tentador: nadie diluye tus ideas. También es una imprudencia.</Paso>
          <Paso isDark={isDark} n={4} titulo="Pre-wiring" on>Reúnete con cada ejecutivo por separado, aliados y sobre todo opositores. Así la reunión grupal sirve para planificar cómo implementar, no para discutir si hacerlo.</Paso>
          <Cita isDark={isDark} autor="Ethan Rasiel, The McKinsey Way">No debe haber sorpresas el día de la presentación. Todos los actores clave deben conocer la solución en privado.</Cita>
        </div>
      </div>
    </Shell>
  );
}

const MONROE = [
  { k: 'Atención', d: 'Una frase corta que anticipe lo que quieres lograr.', ej: '¿Viste el último reporte del pipeline? (adjunto)' },
  { k: 'Necesidad', d: 'Describe el problema con los gráficos del A3, para que conecte emocionalmente.', ej: 'Nuestro crecimiento se está frenando porque perdemos clientes en el traspaso de ventas a implementación.' },
  { k: 'Satisfacción', d: 'La solución en una sola frase de claridad inevitable.', ej: 'Propongo presentar al especialista de implementación antes del cierre, no después.' },
  { k: 'Visualización', d: 'Los beneficios, con datos si los tienes; nunca cifras que no puedas probar.', ej: 'Así cada cliente nuevo sabe desde el inicio quién lo acompaña y llega listo al arranque.' },
  { k: 'Acción', d: 'Pide algo concreto. Es la parte más importante.', ej: '¿Agendamos 30 minutos para revisar los detalles?' },
];

export function Monroe({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  return (
    <Shell isDark={isDark} title="La secuencia motivada" highlight="de Monroe" subtitle="Cinco pasos para que tu audiencia pase a la acción. Sirve para una presentación de quince minutos y también para un correo de cinco frases.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[44%] flex flex-col gap-1.5 justify-center">
          {MONROE.map((m, k) => (
            <button key={m.k} onClick={() => setI(k)} className="text-left"><Paso isDark={isDark} n={k + 1} titulo={m.k} on={k === i}>{m.d}</Paso></button>
          ))}
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
          <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
            <p className={microLabel(isDark)}>El correo, una frase por paso</p>
            <div className="flex flex-col gap-1.5 mt-2">
              <p className={`text-sm ${textMuted(isDark)}`}>Hola, Camila:</p>
              {MONROE.map((m, k) => (
                <motion.p key={m.k} initial={false} animate={{ opacity: k <= i ? 1 : 0.25 }} className={`text-sm leading-snug px-2 py-1 rounded-lg ${k === i ? (isDark ? 'bg-white/10 text-white font-semibold' : 'bg-orange-50 text-gray-900 font-semibold') : textMuted(isDark)}`}>
                  {m.ej}
                </motion.p>
              ))}
            </div>
          </div>
          <Nota isDark={isDark} label="Para aprender a hablar en público" destacada>Alicia Butler Pierre recomienda Toastmasters y dos libros: <em>Cómo ganar amigos e influir sobre las personas</em> (Dale Carnegie) y <em>How to Get Your Point Across in 30 Seconds or Less</em> (Milo Frank). Practica antes con alguien ajeno al proyecto.</Nota>
        </div>
      </div>
    </Shell>
  );
}

const OBJECIONES = [
  { k: 'Nos ha ido bien, ¿por qué cambiar?', r: 'Reconoce el éxito y explica que buscas aumentarlo. Las empresas que no se adaptan terminan fallando. Explica la diferencia entre crecer en línea recta y crecer a escala.' },
  { k: '¿Insinúas que nuestro equipo lo hace mal?', r: 'Felicita sus esfuerzos y lo que han hecho bien, y muestra cómo tu iniciativa potencia justamente eso.' },
  { k: '¿Y qué pasa con esto, y esto, y esto…?', r: 'Agradece que se involucre e invítalo a ser parte del equipo que resolverá esas preguntas. No necesitas responderlas todas.' },
  { k: 'No va lo bastante lejos / va demasiado lejos', r: 'Que unos pidan más y otros menos prueba que hace falta un cambio. Valida eso y deja los detalles para después.' },
  { k: 'Estás abandonando nuestros valores', r: 'Escalar no significa menos atención personal: significa servir mejor a más clientes. Presenta tu estrategia así.' },
  { k: 'Si es tan buena idea, ¿por qué no la hacen más empresas?', r: 'Comparte, breve y con fuerza, historias de empresas reales que lo lograron, las más parecidas a la tuya.' },
  { k: 'Ya probamos algo nuevo y no funcionó', r: 'Comparte casos reales y explica todos los recursos que usarás para que esta vez funcione.' },
  { k: '¿Cómo vamos a capacitar a todos?', r: 'Ten listo el plan de capacitación y los cursos disponibles a pedido para cada rol.' },
  { k: 'Buen plan, pero no es el momento', r: 'Postergar hace perder impulso. Si hay otras iniciativas, acuerda que no se puede todo a la vez y propón revisar las que rinden menos.' },
  { k: 'Hay un problema, pero tu propuesta no sirve aquí', r: 'Tu propuesta debe estar hecha a medida. Si usaste el A3, puedes señalar las partes que son únicas de tu empresa.' },
  { k: 'Es demasiado complicado', r: 'Muestra con ejemplos cómo RevOps simplifica el día a día de marketing, ventas y servicio.' },
  { k: 'Funciona en otros lados, pero aquí somos distintos', r: 'Marcus Sheridan pregunta en sus charlas quién cree que su negocio es distinto: el 100% levanta la mano. Todos los negocios se basan en lo mismo: la confianza.' },
  { k: 'El cambio es enorme y será mucho trabajo', r: 'Busca un vendedor dispuesto a experimentar y muestra sus resultados al resto. Si te toman por sorpresa, admítelo y promete volver con una respuesta.' },
];

export function Objeciones({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  return (
    <Shell isDark={isDark} title="Trece objeciones y" highlight="cómo responderlas" subtitle="No basta con que nadie se oponga: necesitas apoyo entusiasta. Quienes deciden el éxito suelen ser los del medio, sin interés en tu iniciativa pero sí en la comodidad de lo conocido.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[52%] grid grid-cols-2 gap-1.5 content-center">
          {OBJECIONES.map((o, k) => <Opcion key={o.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{k + 1}. {o.k}</Opcion>)}
        </div>
        <div className="lg:w-[48%] flex flex-col gap-2.5 justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Nota isDark={isDark} label={`Objeción ${i + 1} · «${OBJECIONES[i].k}»`} destacada>{OBJECIONES[i].r}</Nota>
            </motion.div>
          </AnimatePresence>
          <div className={`p-3.5 rounded-2xl ${panelClass(isDark)}`}>
            <p className={microLabel(isDark)}>Del libro Buy-In (John Kotter y Lorne Whitehead)</p>
            <ul className={`text-[12.5px] leading-snug mt-1 space-y-1 ${textMuted(isDark)}`}>
              <li>• Invita a los escépticos: si nadie objeta, nadie se está involucrando.</li>
              <li>• Responde siempre con respeto; bajar al nivel de alguien combativo aleja a los demás.</li>
              <li>• Respuestas cortas, claras y de sentido común: el sentido común convence más que los datos.</li>
              <li>• Gana mentes con claridad y corazones con respeto.</li>
              <li>• Prepárate: con preparación de nota B+ tus acciones parecen inspiradas.</li>
            </ul>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Retroceso({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [golpe, setGolpe] = useState(false);
  const pinos: [number, number][] = [];
  [[1], [2], [3], [4]].forEach((_, fila) => {
    for (let c = 0; c <= fila; c++) pinos.push([230 + (c - fila / 2) * 34, 160 - fila * 30]);
  });
  return (
    <Shell isDark={isDark} title="Después de aprobar:" highlight="evitar el retroceso" subtitle="Implementada la estrategia, hay que impedir que la gente vuelva al estado anterior, sobre todo la gerencia, que no participa en el día a día. La clave es mantener a los influyentes clave comprometidos.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-2">
          <svg viewBox="0 0 460 236" className="w-full max-h-[260px] overflow-visible" role="img" aria-label="Pinos de bolos: al derribar el pino clave caen todos">
            <SceneDefs id="rre" isDark={isDark} />
            <Piso cx={230} cy={150} s={200} fill={t.floor} />
            {pinos.map(([x, y], k) => (
              <motion.g key={k} initial={false} animate={{ rotate: golpe ? (k % 2 ? 72 : -72) : 0, opacity: golpe ? 0.55 : 1 }} transition={{ delay: golpe ? 0.15 + (160 - y) / 140 : 0, type: 'spring', stiffness: 60, damping: 10 }} style={{ transformOrigin: `${x}px ${y + 30}px` }}>
                <Cylinder cx={x} cy={y + 8} rx={9} ry={3.5} h={22} top={k === 0 ? ORANGE : isDark ? '#e5e7eb' : '#ffffff'} side={k === 0 ? '#c45c00' : '#d1d5db'} />
                <Bola id="rre" cx={x} cy={y} r={8} neutral={k !== 0} />
              </motion.g>
            ))}
            <motion.g initial={false} animate={{ x: golpe ? 0 : 0, y: golpe ? -200 : 0, opacity: golpe ? 0 : 1 }} transition={{ duration: 0.5 }}>
              <Bola id="rre" cx={230} cy={218} r={14} />
            </motion.g>
            <text x={270} y={200} fontSize={12} fontWeight={900} fill={ORANGE}>Pino clave: los influyentes</text>
            <text x={230} y={30} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Si cae el pino clave, caen todos los demás</text>
          </svg>
          <div className="flex gap-2">
            <Pill isDark={isDark} on={golpe} onClick={() => setGolpe(true)}>Motivar a los influyentes clave</Pill>
            <Pill isDark={isDark} on={!golpe} onClick={() => setGolpe(false)}>Volver a ordenar</Pill>
          </div>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <Nota isDark={isDark} label="El caso: William Bratton y la policía de Nueva York" destacada>Bratton identificó a los influyentes clave: los <strong>76 comandantes de distrito</strong>, cada uno a cargo de <strong>200 a 400 policías</strong>. Como los bolos: si golpeas bien el pino clave, caen todos. Motivar a pocos libera de tener que motivar a todos.</Nota>
          <div className="grid grid-cols-2 gap-2.5">
            <Cifra isDark={isDark} n={76} titulo="Comandantes en el foco" lineas={['reuniones de estrategia dos veces por semana, con la cúpula presente']} />
            <Cifra isDark={isDark} n={2} titulo="Días de aviso" lineas={['al comandante que debía explicar mapas y datos de su distrito']} destacada />
          </div>
          <Nota isDark={isDark} label="Qué cambió">Resultados y responsabilidades visibles para todos: nadie podía culpar al distrito vecino, porque el vecino estaba en la sala. Quienes mejoraban recibían reconocimiento, y los comandantes copiaron el formato con sus propios equipos.</Nota>
          <Fuente isDark={isDark}>W. Chan Kim y Renée Mauborgne, «Tipping Point Leadership», Harvard Business Review (2003), citado en el material.</Fuente>
        </div>
      </div>
    </Shell>
  );
}
