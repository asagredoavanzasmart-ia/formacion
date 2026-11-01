import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass } from '../slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFloor, Cylinder, Orb, Float, Lift, Traveler, PulseDisc, hop, Persona,
} from '../scene3d';
import { SlideProps, heading, Piso, Bola, Cifra, Cita, Nota, Fuente, Opcion, BarrasIso, Campo, Paso, Verificado, fmt, useNarrado } from './kit';

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 4 · Responsabilidad con SLA
══════════════════════════════════════════════════════════════════ */

export function PorQueSLA({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  return (
    <Shell isDark={isDark} title="Por qué marketing y ventas necesitan" highlight="un SLA" subtitle="Un SLA (acuerdo de nivel de servicio) garantiza un resultado entre quien presta un servicio y su cliente. Entre marketing y ventas es un acuerdo de ida y vuelta.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center">
          <svg viewBox="0 0 440 244" className="w-full max-h-[290px] overflow-visible" role="img" aria-label="Marketing entrega leads y ventas los contacta a tiempo">
            <SceneDefs id="ros" isDark={isDark} />
            <Piso cx={220} cy={164} s={206} fill={t.floor} />
            <Float amp={4} dur={2.6}><Persona id="ros" cx={84} cy={168} s={1} body={PEACH} accessory="megaphone" /></Float>
            <Float amp={4} dur={2.9} delay={0.5}><Persona id="ros" cx={356} cy={168} s={1} body={BRAND} accessory="tie" /></Float>
            <PulseDisc cx={220} cy={166} rx={48} ry={15} dur={2.4} peak={0.3} />
            <Float amp={3} dur={2.2}><g filter="url(#ros-sh)"><IsoBox cx={220} cy={140} s={30} h={8} f={NEUTRAL(isDark)} /></g></Float>
            <Traveler id="ros" path={hop([104, 110], [336, 110], 46)} dur={1.8} repeatDelay={0.6} r={5} />
            <Traveler id="ros" path={[[336, 150], [220, 186], [104, 150]]} dur={1.8} delay={1.2} repeatDelay={0.6} r={5} color={PINK} />
            <text x={220} y={52} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>Marketing promete leads calificados</text>
            <text x={84} y={198} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>Marketing</text>
            <text x={356} y={198} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>Ventas</text>
            <text x={220} y={210} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>El acuerdo</text>
            <text x={220} y={234} textAnchor="middle" fontSize={12} fontWeight={900} fill={PINK}>Ventas promete contactarlos a tiempo</text>
          </svg>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <div className="grid grid-cols-2 gap-2.5">
            <Cifra isDark={isDark} n={69} sufijo="%" titulo="Empresas de alto desempeño" lineas={['dicen que comunicar las metas a toda la empresa es lo más efectivo para formar un equipo de alto rendimiento']} />
            <Cifra isDark={isDark} n={7} sufijo="%" titulo="Empleados de una empresa típica" lineas={['saben qué deben hacer para contribuir a las metas de la empresa']} destacada />
          </div>
          <Nota isDark={isDark} label="La brecha que cierra el SLA">Una meta de ingresos clara sirve de poco si los equipos no saben qué les toca. Sin acuerdo, marketing y ventas persiguen metas distintas y hasta opuestas. El SLA traduce la meta en un compromiso para cada lado y los vuelve <strong>responsables en conjunto</strong> de los ingresos.</Nota>
          <Nota isDark={isDark} label="Ni más ni menos leads">La meta es entregarle a ventas el número exacto que necesita. Y no basta un monto: hace falta una mezcla de ventas, por ejemplo una grande al trimestre, tres pequeñas y una mediana (Steve Bookbinder, DM Training).</Nota>
          <Cita isDark={isDark} autor="Janet Comenos">Para que no haya fricción entre ventas y marketing, sus metas deben ser complementarias, de modo que estén obligados a trabajar juntos, en vez de una estructura de incentivos que los haga competir.</Cita>
          <Fuente isDark={isDark}>Las dos cifras circulan sin un estudio de origen identificado: úsalas como referencia, no como dato verificado.</Fuente>
        </div>
      </div>
    </Shell>
  );
}

/* Pasos narrados de la calculadora (orden de las frases en calculadoras.ts). */
const SLA_PLAN = (p: number) => ({ [-1]: { meta: 0, ticket: 0, cierre: 0, aOport: 0, horas: 0 }, 5: { meta: 100000 }, 6: { ticket: 5000 }, 8: { cierre: 25 }, 10: { aOport: 20 }, 13: { meta: 150000 }, 14: { meta: 100000 }, 16: { horas: 24 } } as Record<number, Record<string, number>>)[p] ?? null;

export function CalculadoraSLA({ isDark }: SlideProps) {
  const [v, setV, paso] = useNarrado('ro-4-calculadora', { meta: 100000, ticket: 5000, cierre: 25, aOport: 20, horas: 24 }, SLA_PLAN);
  const { meta, ticket, cierre, aOport, horas } = v;
  const set = (k: keyof typeof v) => (x: number) => setV((o) => ({ ...o, [k]: x }));
  const negocios = ticket > 0 ? Math.ceil(meta / ticket) : 0;
  const oport = cierre > 0 ? Math.ceil(negocios / (cierre / 100)) : 0;
  const leads = aOport > 0 ? Math.ceil(oport / (aOport / 100)) : 0;
  const ve = (desde: number) => (paso === null || paso >= desde ? 'opacity-100' : 'opacity-0 pointer-events-none');
  const foco = (a: number, b = a) => paso !== null && paso >= a && paso <= b;
  const anillo = (on: boolean) => (on ? 'shadow-[0_18px_38px_-10px_rgba(17,24,39,.3),0_0_24px_rgba(255,133,29,.2)] -translate-y-0.5' : '');
  return (
    <Shell isDark={isDark} title="Calcula" highlight="tu SLA" subtitle="Con tres datos de un año de ventas (tasa lead→oportunidad, tasa oportunidad→cierre y ticket promedio) sabes cuántos leads necesita ventas para llegar a la meta. Compara trimestres: la estacionalidad es normal.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[38%] flex flex-col gap-2 justify-center">
          <div className="grid grid-cols-2 gap-2">
            <Campo isDark={isDark} label="Meta de ingresos al mes" prefijo="$" value={meta} step={10000} onChange={set('meta')} activo={foco(5) || foco(13, 14)} />
            <Campo isDark={isDark} label="Ticket promedio" prefijo="$" value={ticket} step={500} onChange={set('ticket')} activo={foco(6, 7)} />
            <Campo isDark={isDark} label="Oportunidad → cierre" sufijo="%" value={cierre} max={100} onChange={set('cierre')} activo={foco(8, 9)} />
            <Campo isDark={isDark} label="Lead → oportunidad" sufijo="%" value={aOport} max={100} onChange={set('aOport')} activo={foco(10, 11)} />
          </div>
          <Campo isDark={isDark} label="Plazo de contacto de ventas" sufijo="horas" value={horas} onChange={set('horas')} activo={foco(16)} />
          <div className={`transition-all duration-500 rounded-2xl ${ve(15)} ${anillo(foco(15))}`}><Verificado isDark={isDark} tipo="corregido">Algunas guías indican <em>multiplicar</em> por las tasas de conversión; lo correcto es <strong>dividir</strong>. Con 25% de cierre, 20 negocios exigen 20 ÷ 0,25 = 80 oportunidades, no 5.</Verificado></div>
          <div className={`transition-all duration-500 rounded-2xl ${ve(16)}`}><Nota isDark={isDark} label="El plazo: 24 horas para empezar">Si aún no hay un plazo definido, 24 horas es un buen punto de partida. Reducirlo es un tema permanente de las reuniones entre marketing y ventas.</Nota></div>
        </div>
        <div className="lg:w-[62%] flex flex-col gap-2.5 justify-center">
          <div className={`h-[230px] transition-opacity duration-500 ${ve(7)}`}>
            <BarrasIso id="rocal" isDark={isDark} max={Math.max(leads, oport, negocios, 1)} W={540} hMax={130} items={[
              { name: 'Leads calificados', value: leads, label: fmt(leads), hl: true },
              { name: 'Oportunidades', value: oport, label: fmt(oport), tone: 'peach' },
              { name: 'Negocios cerrados', value: negocios, label: fmt(negocios), tone: 'brand' },
            ]} />
          </div>
          <div className={`p-4 rounded-3xl transition-all duration-500 ${featuredClass(isDark)} ${ve(17)} ${anillo(foco(17))}`}>
            <p className={microLabel(isDark)}>Tu SLA</p>
            <p className={`text-base md:text-lg font-bold leading-snug ${heading(isDark)}`}>
              Cada mes, marketing entregará <span className="text-[#ff851d]">{fmt(leads)} leads calificados</span> a ventas, y ventas contactará cada uno dentro de <span className="text-[#ef375c]">{horas} horas</span> desde que lo recibe.
            </p>
          </div>
          <div className={`transition-all duration-500 rounded-2xl ${ve(18)} ${anillo(foco(18))}`}><Nota isDark={isDark} label="Referencia real (Mark Roberge, Harvard Business School)">Con 100 leads al mes, un vendedor del segmento medio conectaba con 50, hacía 30 llamadas de descubrimiento, 15 demostraciones y cerraba 5 clientes. Con 10 vendedores, marketing debía entregar 1.000 leads al mes. Un SLA así ya deja a la empresa en el 5% superior.</Nota></div>
        </div>
      </div>
    </Shell>
  );
}

const VALOR_PLAN = (p: number) => ({ [-1]: { ebooks: 0, demos: 0 }, 8: { ebooks: 150, demos: 50 }, 9: { ebooks: 0, demos: 100 }, 10: { ebooks: 300, demos: 0 }, 11: { ebooks: 150, demos: 50 } } as Record<number, Record<string, number>>)[p] ?? null;

export function ValorLead({ isDark }: SlideProps) {
  const [v, setV, paso] = useNarrado('ro-4-valor', { ebooks: 150, demos: 50 }, VALOR_PLAN);
  const { ebooks, demos } = v;
  const valor = ebooks * 1000 + demos * 3000;
  const metaValor = 300000;
  const pct = Math.min(1, valor / metaValor);
  const ve = (desde: number) => (paso === null || paso >= desde ? 'opacity-100' : 'opacity-0 pointer-events-none');
  const foco = (a: number, b = a) => paso !== null && paso >= a && paso <= b;
  const anillo = (on: boolean) => (on ? 'shadow-[0_18px_38px_-10px_rgba(17,24,39,.3),0_0_24px_rgba(255,133,29,.2)] -translate-y-0.5' : '');
  return (
    <Shell isDark={isDark} title="Valor del lead," highlight="no volumen de leads" subtitle="No todos los MQL valen lo mismo. Cuando marketing se atrasaba, cambiaba sus llamados a la acción por descargas de ebooks, más fáciles de conseguir, y ventas preguntaba: «¿dónde están las solicitudes de demo?».">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className={`lg:w-[44%] flex flex-col items-center justify-center gap-1 transition-opacity duration-500 ${ve(4)}`}>
          <div className="w-full max-w-[400px] h-[240px]">
            <BarrasIso id="roval" isDark={isDark} max={3000} W={400} hMax={130} items={[
              { name: 'Descarga de ebook', value: paso === null || paso >= 5 ? 1000 : 0, label: '$1.000', tone: 'peach' },
              { name: 'Solicitud de demo', value: paso === null || paso >= 6 ? 3000 : 0, label: '$3.000', hl: true },
            ]} caption="Valor de un lead = tasa de cierre × valor de la venta" />
          </div>
          <p className={`text-xs text-center max-w-sm ${textMuted(isDark)}`}>Mismo perfil (gerente de marketing de una empresa mediana), misma venta de $100.000: el ebook cierra 1% de las veces y la demo, 3%.</p>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
          <div className={`grid grid-cols-2 gap-2 transition-opacity duration-500 ${ve(8)}`}>
            <Campo isDark={isDark} label="Descargas de ebook" value={ebooks} step={10} onChange={(x) => setV((o) => ({ ...o, ebooks: x }))} activo={foco(8) || foco(10)} />
            <Campo isDark={isDark} label="Solicitudes de demo" value={demos} step={5} onChange={(x) => setV((o) => ({ ...o, demos: x }))} activo={foco(8, 9)} />
          </div>
          <div className={`p-3.5 rounded-3xl transition-all duration-500 ${featuredClass(isDark)} ${ve(8)} ${anillo(foco(12))}`}>
            <div className="flex items-baseline justify-between">
              <p className={microLabel(isDark)}>Valor de leads entregado este mes</p>
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">${fmt(valor)}</p>
            </div>
            <div className={`h-3 mt-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
              <motion.div className="h-full rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c]" initial={false} animate={{ width: `${pct * 100}%` }} />
            </div>
            <p className={`text-xs mt-1.5 ${textMuted(isDark)}`}>Meta: ${fmt(metaValor)} de valor de leads. A marketing ya no le importa la mezcla: puede llegar con 100 demos, con 300 ebooks o combinando. Así marketing queda con una cuota de ingresos, igual que ventas.</p>
            <p className={`text-sm font-bold leading-snug mt-2 ${heading(isDark)}`}>SLA avanzado: cada mes, marketing entregará <span className="text-[#ff851d]">${fmt(metaValor)} en valor de leads</span>, y ventas contactará cada MQL dentro de <span className="text-[#ef375c]">24 horas</span>.</p>
          </div>
          <div className={`rounded-2xl transition-all duration-500 ${ve(13)} ${anillo(foco(13))}`}><Verificado isDark={isDark} tipo="corregido">La fuente dice que $300.000 se logran con «1.000 demos o 3.000 ebooks»; eso suma $3.000.000. Con sus propios valores, son <strong>100 demos o 300 ebooks</strong>.</Verificado></div>
          <div className={`rounded-2xl transition-all duration-500 ${ve(14)} ${anillo(foco(14, 16))}`}><Nota isDark={isDark} label="Y ventas tampoco se libra: el tablero «no aparezcas aquí»">Si un lead no recibía llamada en 24 horas, el nombre del vendedor aparecía en pantalla. Si un lead llevaba dos semanas sin cinco intentos de contacto, también.</Nota></div>
        </div>
      </div>
    </Shell>
  );
}

export function Contacto({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="La parte más delicada:" highlight="qué tan rápido contactar" subtitle="La meta de marketing se calcula con matemática. El plazo de ventas es otra cosa: la respuesta correcta es «lo antes posible», y el SLA fija el más rápido que el equipo puede cumplir de verdad.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[44%] flex flex-col items-center justify-center gap-1">
          <div className="w-full max-w-[420px] h-[250px]">
            <BarrasIso id="rocon" isDark={isDark} max={60} W={420} hMax={140} items={[
              { name: 'Contacto en menos de 1 hora', value: 60, label: '60×', hl: true },
              { name: 'Una hora después', value: 60 / 7, label: '≈ 9×', tone: 'peach' },
              { name: '24 horas o más', value: 1, label: '1×', tone: 'neutral' },
            ]} caption="Probabilidad relativa de calificar el lead" />
          </div>
          <p className={`text-[11px] text-center max-w-sm ${textMuted(isDark)}`}>Oldroyd, McElheran y Elkington, <em>Harvard Business Review</em>, 2011: auditoría de 2.241 empresas de Estados Unidos. Tiempo promedio de primera respuesta: <strong>42 horas</strong>.</p>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
          <Nota isDark={isDark} label="Caso · Huify (7 personas)" destacada>Regla: todo lead se llama dentro de cinco minutos, aunque el equipo de ventas completo esté en una conferencia; si hace falta, llama alguien de éxito del cliente. Su fundador, Josh Harcus, cuenta que multiplicaron sus ingresos por seis en un año.</Nota>
          <Verificado isDark={isDark} tipo="dudoso">Harcus afirma además que llamar en 5 minutos en vez de 24 horas multiplica por 1.000 la probabilidad de cerrar. El estudio publicado no muestra esa cifra: habla de unas 60 veces para <em>calificar</em> el lead.</Verificado>
          <div className="grid grid-cols-2 gap-2.5">
            <Nota isDark={isDark} label="Caso · PeopleDoc">Movieron al equipo de ventas internas y desarrollo de negocio dentro de marketing para cuidar el primer contacto humano. Las reuniones calificadas subieron 60%.</Nota>
            <Nota isDark={isDark} label="El ritmo importa (Mark Roberge)">Si la meta es $100.000 de valor al mes, traza una línea recta de 0 a 100.000 en 30 días: ni una súper campaña la primera semana, ni dormir tres semanas y correr al final. Si hay meses de alta carga predecibles, la línea cambia de forma.</Nota>
          </div>
          <Nota isDark={isDark} label="¿Cuántas veces insistir?">El patrón óptimo cambia entre empresas grandes, medianas y pequeñas. Si aún no tienes volumen para analizarlo, parte de la investigación de mercado y de supuestos razonables, instala la medición y corrige con tus datos en 3 a 6 meses.</Nota>
        </div>
      </div>
    </Shell>
  );
}

const PREOCUPACIONES = [
  {
    k: 'Pide más leads de los posibles',
    txt: 'Si la meta exige un número imposible, no es realista y hay que replantearla. Pero si solo pide más de lo que marketing ha hecho antes, quizá falte velocidad de marketing: medir cuánto tiempo cuesta cada pieza y cuántos leads genera, y mover horas hacia lo que mejor rinde.',
    autor: 'Jamie Shanks: controlas el volumen, la velocidad de producción y la conversión de cada pieza.',
    extra: 'Se mide cada formato como lo haría una agencia: blogs, ebooks, infografías, casos, podcasts.',
  },
  {
    k: 'Llegan más leads de los que ventas atiende',
    txt: 'Calcula la velocidad de ventas: cuánto ingreso puede producir el equipo en un periodo. Si la meta es $500.000 al mes y la velocidad actual es $300.000, hay un problema antes de empezar.',
    autor: 'Fórmula del libro Aligned to Achieve (Andrea Austin y Tracy Eiler).',
    extra: 'Marketing también mueve esos números: trae más oportunidades, sube la tasa de cierre calificando mejor y acorta el ciclo con contenido.',
  },
  {
    k: 'Ventas rechaza leads',
    txt: 'Un lead rechazado nunca debe perderse: si no estaba listo, vuelve a nutrición; si estaba listo, ventas lo contacta. Para las disputas existe la rama judicial, un grupo pequeño de líderes que revisa cada lead rechazado o no contactado a tiempo y decide qué equipo debe actuar.',
    autor: 'Dan McDade (PointClear) acuñó la idea de la rama judicial.',
    extra: 'Sin revisión no se sabe si el lead no estaba calificado o si ventas dejó de insistir antes de tiempo.',
  },
  {
    k: 'Los leads de marketing no sirven',
    txt: 'Es un problema que se arregla. Los leads son tan buenos o tan malos como el mensaje que los atrajo: si el mensaje es claro sobre lo que eres y lo que no eres, los leads mejoran.',
    autor: 'Marcus Sheridan: «arregla tu mensaje y arreglarás tu problema de leads».',
    extra: 'Por eso el contenido es central: buen contenido genera buenos leads; mal contenido, malos leads.',
  },
];

export function RamaJudicial({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(2);
  return (
    <Shell isDark={isDark} title="Cuatro problemas del SLA y" highlight="la rama judicial" subtitle="Al implementar un SLA aparecen cuatro preocupaciones típicas. Todas tienen solución si existen los sistemas correctos.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[44%] flex flex-col items-center justify-center">
          <svg viewBox="0 0 440 250" className="w-full max-h-[280px] overflow-visible" role="img" aria-label="Un grupo imparcial revisa los leads en disputa">
            <SceneDefs id="roj" isDark={isDark} />
            <Piso cx={220} cy={176} s={200} fill={t.floor} />
            {[[168, PEACH], [220, BRAND], [272, SLATE(isDark)]].map(([x, b], k) => (
              <Float key={k} amp={2.5} dur={2.6 + k * 0.3} delay={k * 0.3}>
                <Persona id="roj" cx={x as number} cy={142} s={0.82} body={b as typeof BRAND} accessory={k === 1 ? 'tie' : undefined} />
              </Float>
            ))}
            <g filter="url(#roj-sh)"><IsoBox cx={220} cy={132} s={64} h={26} f={NEUTRAL(isDark)} /></g>
            <PulseDisc cx={392} cy={180} rx={30} ry={10} color={PINK} dur={1.8} peak={0.35} />
            <Float amp={3}><Bola id="roj" cx={392} cy={164} r={11} /></Float>
            <Traveler id="roj" path={hop([392, 160], [250, 104], 40)} dur={1.6} repeatDelay={0.8} r={4} color={PINK} />
            <Traveler id="roj" path={hop([190, 104], [52, 160], 40)} dur={1.6} delay={1.2} repeatDelay={0.8} r={4} />
            <text x={392} y={206} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Lead en disputa</text>
            <text x={52} y={186} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Al equipo</text>
            <text x={52} y={200} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>que corresponde</text>
            <text x={220} y={226} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>Decide un COO o el CEO</text>
            <text x={220} y={242} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>No lo encabezan marketing ni ventas</text>
          </svg>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
          <div className="grid grid-cols-2 gap-1.5">
            {PREOCUPACIONES.map((x, k) => <Opcion key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{k + 1}. {x.k}</Opcion>)}
          </div>
          <div className="grid">
            {PREOCUPACIONES.map((x, k) => (
              <motion.div key={x.k} className="col-start-1 row-start-1 flex flex-col gap-2" initial={false} animate={{ opacity: k === i ? 1 : 0, y: k === i ? 0 : 6 }} transition={{ duration: 0.3 }} style={{ pointerEvents: k === i ? 'auto' : 'none' }}>
                <Nota isDark={isDark} label={`Preocupación ${k + 1}`} destacada>{x.txt} <span className="opacity-80">{x.extra}</span></Nota>
                <p className={`text-xs italic ${textMuted(isDark)}`}>{x.autor}</p>
              </motion.div>
            ))}
          </div>
          <Nota isDark={isDark} label="Cómo funciona la rama judicial">Sus miembros deben ser imparciales: el CMO o el VP de ventas pueden participar, pero no presidirla. Al comienzo se reúne en persona; con el tiempo marketing califica mejor, ventas confía más, la lista se achica y basta un turno rotativo que revise un tablero. En una empresa pequeña alcanza con un solo líder imparcial.</Nota>
        </div>
      </div>
    </Shell>
  );
}

const VEL_PLAN = (p: number) => ({ [-1]: { vol: 0, lpp: 0, hpp: 0, op: 0, ticket: 0, win: 0, ciclo: 0 }, 11: { vol: 250 }, 12: { lpp: 5 }, 13: { hpp: 3 }, 14: { hpp: 1 }, 15: { hpp: 3 }, 17: { op: 40 }, 18: { ticket: 5000 }, 19: { win: 25 }, 20: { ciclo: 60 } } as Record<number, Record<string, number>>)[p] ?? null;

export function Velocidades({ isDark }: SlideProps) {
  const [v, setV, paso] = useNarrado('ro-4-velocidades', { vol: 250, lpp: 5, hpp: 3, op: 40, ticket: 5000, win: 25, ciclo: 60 }, VEL_PLAN);
  const { vol, lpp, hpp, op, ticket, win, ciclo } = v;
  const set = (k: keyof typeof v) => (x: number) => setV((o) => ({ ...o, [k]: x }));
  const lph = hpp > 0 ? lpp / hpp : 0;
  const vVentas = ciclo > 0 ? (op * ticket * (win / 100)) / ciclo : 0;
  const ve = (desde: number) => (paso === null || paso >= desde ? 'opacity-100' : 'opacity-0 pointer-events-none');
  const foco = (a: number, b = a) => paso !== null && paso >= a && paso <= b;
  return (
    <Shell isDark={isDark} title="Velocidad de marketing y" highlight="velocidad de ventas" subtitle="Dos cálculos para saber si el SLA es posible: cuántos leads produce cada hora de marketing y cuánto ingreso puede procesar ventas por día.">
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-0 content-center">
        <div className={`p-4 rounded-3xl flex flex-col gap-2 transition-opacity duration-500 ${panelClass(isDark)} ${ve(1)}`}>
          <p className={microLabel(isDark)}>Velocidad de marketing · una pieza de contenido</p>
          <div className="grid grid-cols-3 gap-2">
            <Campo isDark={isDark} label="Piezas al año" value={vol} step={10} onChange={set('vol')} activo={foco(3) || foco(11)} />
            <Campo isDark={isDark} label="Leads por pieza" value={lpp} step={1} onChange={set('lpp')} activo={foco(4) || foco(12)} />
            <Campo isDark={isDark} label="Horas por pieza" value={hpp} step={0.5} onChange={set('hpp')} activo={foco(5) || foco(13, 14)} />
          </div>
          <div className={`grid grid-cols-3 gap-2 transition-opacity duration-500 ${ve(6)}`}>
            <Cifra isDark={isDark} n={lph} dec={2} titulo="Leads por hora" destacada={foco(7)} />
            <Cifra isDark={isDark} n={lph > 0 ? 1 / lph : 0} dec={2} titulo="Horas por lead" destacada={foco(8)} />
            <Cifra isDark={isDark} n={vol * hpp} titulo="Horas al año" destacada />
          </div>
          <p className={`text-xs leading-snug transition-opacity duration-500 ${textMuted(isDark)} ${ve(10)}`}>Ejemplo de Jamie Shanks (Sales for Life): 250 blogs al año, 5 leads por blog y 3 horas cada uno dan 1,7 leads por hora y 750 horas al año. Bajar cada blog a 1 hora libera 500 horas para otra pieza que rinda más.</p>
        </div>
        <div className={`p-4 rounded-3xl flex flex-col gap-2 transition-opacity duration-500 ${featuredClass(isDark)} ${ve(16)}`}>
          <p className={microLabel(isDark)}>Velocidad de ventas = oportunidades × ticket × tasa de cierre ÷ días de ciclo</p>
          <div className="grid grid-cols-4 gap-2">
            <Campo isDark={isDark} label="Oportunidades" value={op} onChange={set('op')} activo={foco(17)} />
            <Campo isDark={isDark} label="Ticket" prefijo="$" value={ticket} step={500} onChange={set('ticket')} activo={foco(18)} />
            <Campo isDark={isDark} label="Cierre" sufijo="%" value={win} max={100} onChange={set('win')} activo={foco(19)} />
            <Campo isDark={isDark} label="Ciclo" sufijo="días" value={ciclo} onChange={set('ciclo')} activo={foco(20)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Cifra isDark={isDark} n={vVentas} prefijo="$" titulo="Ingreso por día" destacada={foco(21)} />
            <Cifra isDark={isDark} n={vVentas * 30} prefijo="$" titulo="Ingreso en 30 días" destacada />
          </div>
          <p className={`text-xs leading-snug transition-opacity duration-500 ${textMuted(isDark)} ${ve(23)}`}>Si la tasa de cierre es baja, quizá marketing atrae a la gente equivocada: revisa el perfil de cliente ideal y busca rasgos comunes en los negocios perdidos. Marketing también puede acortar el ciclo con contenido que responda dudas antes de la reunión.</p>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 5 · Mapear el proceso de ventas
══════════════════════════════════════════════════════════════════ */

const NIVELES = [
  { k: 'Sin proceso', txt: 'Cada vendedor vende a su manera. Funciona con dos o tres estrellas, pero no se puede medir, enseñar ni escalar: es volar «a ojo».', gap: 70 },
  { k: 'Barandas', txt: 'Etapas claras con criterios de salida, y libertad dentro de ellas para que cada vendedor use su estilo y se adapte al comprador. El estilo propio se cultiva, pero no al punto de romper el proceso (Dave Casey).', gap: 38 },
  { k: 'Guion rígido', txt: 'Todos dicen lo mismo, como autómatas. Se pierde lo que más vale en ventas: la capacidad de adaptarse a cada persona.', gap: 14 },
];

export function Paradoja({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(1);
  const n = NIVELES[i];
  const cy = 128;
  return (
    <Shell isDark={isDark} title="La paradoja" highlight="del proceso de ventas" subtitle="«Demasiado proceso mata a los equipos de ventas, pero los equipos de ventas mueren sin proceso.» (Cory Bray y Hilmon Sorey, The Sales Enablement Playbook)">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-2">
          <div className="grid w-full mb-4">
            {NIVELES.map((x, k) => (
              <motion.div key={x.k} className="col-start-1 row-start-1" initial={false} animate={{ opacity: k === i ? 1 : 0, y: k === i ? 0 : 6 }} transition={{ duration: 0.3 }} style={{ pointerEvents: k === i ? 'auto' : 'none' }}>
                <Nota isDark={isDark} label={x.k} destacada>{x.txt}</Nota>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">{NIVELES.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill>)}</div>
          <svg viewBox="0 0 440 240" className="w-full max-h-[260px] overflow-visible" role="img" aria-label="Un vendedor avanza entre barandas más o menos separadas">
            <SceneDefs id="ropa" isDark={isDark} />
            <Piso cx={220} cy={cy + 4} s={210} fill={t.floor} />
            {[36, 96, 156, 284, 344, 404].map((x, k) => (
              <React.Fragment key={x}>
                <motion.g initial={false} animate={{ y: -n.gap }} transition={{ type: 'spring', stiffness: 80, damping: 14, delay: k * 0.03 }}>
                  <IsoBox cx={x} cy={cy - 10} s={12} h={14} f={i === 1 ? BRAND : NEUTRAL(isDark)} />
                </motion.g>
                <motion.g initial={false} animate={{ y: n.gap }} transition={{ type: 'spring', stiffness: 80, damping: 14, delay: k * 0.03 }}>
                  <IsoBox cx={x} cy={cy - 10} s={12} h={14} f={i === 1 ? BRAND : NEUTRAL(isDark)} />
                </motion.g>
              </React.Fragment>
            ))}
            <motion.g initial={false} animate={{ x: i === 2 ? 0 : 0 }}>
              <Float amp={i === 0 ? 7 : 3} dur={i === 0 ? 1.2 : 2.4}><Persona id="ropa" cx={220} cy={cy + 14} s={i === 2 ? 0.7 : 0.85} body={PEACH} accessory="tie" /></Float>
            </motion.g>
            <Traveler key={i} id="ropa" path={i === 0 ? [[60, 160], [140, 60], [200, 190], [300, 70], [380, 170]] : [[60, cy], [380, cy]]} dur={2.4} repeatDelay={0.4} r={5} />
            <text x={220} y={232} textAnchor="middle" fontSize={12} fontWeight={900} fill={i === 1 ? ORANGE : t.muted}>{i === 0 ? 'Cada uno por su camino' : i === 1 ? 'Rumbo claro, estilo propio' : 'Sin espacio para adaptarse'}</text>
          </svg>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <Nota isDark={isDark} label="Qué es un proceso de ventas">Un conjunto de pasos claramente definidos y formas de comunicación entre la empresa y sus prospectos, desde que el comprador sabe que existes hasta que renueva. Permite <strong>métricas, repetición, escala y responsabilidad</strong>, y guía a quién contratar, cómo capacitar y cómo hacer coaching.</Nota>
          <Cita isDark={isDark} autor="Doug Davidoff, sobre Jack Welch">Welch, el gran promotor de Six Sigma, decía que había dos disciplinas que no podía estandarizar: el derecho y las ventas. Six Sigma elimina la variación, y en ventas todo el valor está en la variación.</Cita>
          <Cita isDark={isDark} autor="Steve Bookbinder">Quiero que cada venta en la que trabajo sea aburridamente parecida a las historias de las ventas que se cierran. «Esta es distinta» casi siempre significa «esta probablemente no se cierra».</Cita>
        </div>
      </div>
    </Shell>
  );
}

const ETAPAS_C = [
  {
    k: 'Reconocimiento',
    pregunta: '¿Qué problemas y oportunidades prioriza el comprador para los próximos meses, y cómo los nombra?',
    opciones: [
      { t: 'Mala cultura', fit: 'si' }, { t: 'Rotación alta', fit: 'si' }, { t: 'Contratar rápido', fit: 'si' }, { t: '«Mi oficina es aburrida, necesito otro arquitecto»', fit: 'reencuadre' },
    ],
  },
  {
    k: 'Consideración',
    pregunta: '¿Qué categorías de solución está evaluando: contratar a alguien, un consultor, comprar un producto?',
    opciones: [
      { t: 'Hacer una fiesta de pizza', fit: 'no' }, { t: 'Contratar un consultor', fit: 'reencuadre' }, { t: 'Comprar software que mida el clima', fit: 'si' },
    ],
  },
  {
    k: 'Decisión',
    pregunta: 'Ya eligió la categoría: ¿con qué criterio decide entre proveedores?',
    opciones: [
      { t: 'El más barato', fit: 'no' }, { t: 'El líder del mercado', fit: 'no' }, { t: 'El que integra la cultura y orienta cómo actuar', fit: 'si' },
    ],
  },
];

const FIT = {
  si: { t: 'Buen encaje', c: 'bg-emerald-500/15 text-emerald-600' },
  reencuadre: { t: 'Oportunidad de reencuadre', c: 'bg-amber-500/15 text-amber-600' },
  no: { t: 'No es su fortaleza', c: 'bg-gray-500/15 text-gray-500' },
};

export function Comprador({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const e = ETAPAS_C[i];
  const pos: [number, number][] = [[90, 176], [220, 140], [350, 104]];
  return (
    <Shell isDark={isDark} title="Vender es" highlight="ayudar a comprar" subtitle="«Selling is about buying» (Mark Roberge, Harvard Business School). El proceso no parte de tu producto: parte del recorrido que hace el comprador.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[44%] flex flex-col items-center justify-center gap-2">
          <svg viewBox="0 0 440 244" className="w-full max-h-[270px] overflow-visible" role="img" aria-label="Recorrido del comprador en tres etapas">
            <SceneDefs id="roco" isDark={isDark} />
            {pos.map(([x, y], k) => (
              <g key={k} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }}>
                {k === i && <PulseDisc cx={x} cy={y + 8} rx={56} ry={18} dur={2.2} peak={0.3} />}
                <g filter="url(#roco-sh)"><Cylinder cx={x} cy={y} rx={46} ry={15} h={14} top={k === i ? ORANGE : k < i ? '#ffd2a8' : isDark ? '#4b5563' : '#e5e7eb'} side={k === i ? '#c45c00' : k < i ? '#f0875a' : isDark ? '#374151' : '#9ca3af'} /></g>
                <text x={x} y={y + 50} textAnchor="middle" fontSize={12} fontWeight={900} fill={k === i ? ORANGE : t.muted}>{ETAPAS_C[k].k}</text>
              </g>
            ))}
            <motion.g initial={false} animate={{ x: pos[i][0] - pos[0][0], y: pos[i][1] - pos[0][1] }} transition={{ type: 'spring', stiffness: 70, damping: 13 }}>
              <Float amp={3}><Persona id="roco" cx={pos[0][0]} cy={pos[0][1] + 2} s={0.78} body={SLATE(isDark)} accessory="compass" /></Float>
            </motion.g>
          </svg>
          <div className="flex gap-2">{ETAPAS_C.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill>)}</div>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
          <Nota isDark={isDark} label={`${e.k} · la pregunta del vendedor`}>{e.pregunta}</Nota>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-3.5 rounded-2xl min-h-[172px] ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Ejemplo: TINYpulse mide el clima de una organización con una pregunta semanal</p>
              <div className="flex flex-col gap-1.5 mt-1.5">
                {e.opciones.map((o) => (
                  <div key={o.t} className="flex items-center justify-between gap-3">
                    <span className={`text-sm ${heading(isDark)}`}>{o.t}</span>
                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${FIT[o.fit as keyof typeof FIT].c}`}>{FIT[o.fit as keyof typeof FIT].t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <Nota isDark={isDark} label="De dónde salen las etapas del proceso">Los tres compradores son prospectos calificados, pero la conversación ideal con cada uno es muy distinta. Las etapas del proceso son los puntos del recorrido donde el comprador no puede avanzar sin ayuda de un vendedor.</Nota>
          <Nota isDark={isDark} label="Lo contrario: «llegar y vomitar la presentación»">Armar un deck de diez láminas con funciones, precios y casos, y dárselo igual a todos. También se le llama «venta cocodrilo»: boca grande, orejas chicas.</Nota>
        </div>
      </div>
    </Shell>
  );
}

const FILTROS = [
  { k: 'Requerido', q: '¿Ocurre en todas las ventas?', d: 'Si la venta puede cerrarse sin ese paso, no es una etapa.' },
  { k: 'Factual', q: '¿Se responde con sí o no?', d: 'Es un hecho concreto, no una sensación ni una opinión del vendedor.' },
  { k: 'Inspeccionable', q: '¿Queda un registro que otro pueda revisar?', d: 'Debe verse en el CRM. Si no está registrado, no cuenta.' },
  { k: 'Centrado en el comprador', q: '¿Describe lo que logró el comprador?', d: 'La etapa se nombra por el avance del comprador, no por la tarea del vendedor.' },
];

const PASOS = [
  { t: 'El prospecto asiste a la consultoría', falla: -1, por: '' },
  { t: 'Hacer seguimiento si el prospecto no responde', falla: 0, por: 'Solo ocurre cuando el prospecto no contesta: es un plan de contingencia, no una etapa.' },
  { t: 'Tercera reunión para «revisar» lo mismo', falla: 0, por: 'Repite una reunión anterior. La venta avanza igual sin ella.' },
  { t: 'El prospecto disfruta la consultoría', falla: 1, por: 'Es una sensación: nadie puede comprobarla. «Asistió» sí se responde con sí o no.' },
  { t: 'El prospecto lo conversa con su directorio', falla: 2, por: 'Ocurre puertas adentro del comprador: el vendedor no lo ve ni puede registrarlo.' },
  { t: 'Le dimos la demo', falla: 3, por: 'Describe al vendedor, no al comprador. Se reescribe como «Producto evaluado».' },
  { t: 'El prospecto agenda la segunda reunión', falla: -1, por: '' },
  { t: 'El prospecto confirma los próximos pasos por correo', falla: -1, por: '' },
];

const CONTEXTO = [
  { k: 'Por qué se hace', txt: 'Cada vendedor suele llamar «etapa» a cosas distintas: para uno, «propuesta» es haberla enviado; para otro, que el cliente la aceptó. Así nadie sabe en qué punto está cada negocio.' },
  { k: 'Para qué sirve', txt: 'Para dejar solo los pasos que ocurren en toda venta, se pueden comprobar y muestran un avance del comprador. Esos pasos pasan a ser las etapas del pipeline.' },
  { k: 'Cómo impacta', txt: 'El pronóstico se vuelve confiable, la jefatura revisa cada negocio con evidencia y una persona nueva aprende el proceso más rápido.' },
];

export function Filtros({ isDark }: SlideProps) {
  const [activos, setActivos] = useState<number>(0);
  const [c, setC] = useState(0);
  const sigue = (p: (typeof PASOS)[number]) => p.falla === -1 || p.falla >= activos;
  const quedan = PASOS.filter(sigue).length;
  return (
    <Shell isDark={isDark} title="Los cuatro filtros" highlight="de cada etapa" subtitle="Se escriben todos los pasos de una venta típica, del vendedor y del prospecto, cada uno con su responsable. Luego la lista pasa por cuatro filtros: lo que no los supera se tacha o se reescribe.">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
        <div className="-mt-6 mb-7 flex flex-col items-center gap-3">
          <div className="flex gap-3 justify-center">
            {CONTEXTO.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === c} onClick={() => setC(k)}>{x.k}</Pill>)}
          </div>
          <div className="grid w-full max-w-[900px]">
            {CONTEXTO.map((x, k) => (
              <motion.p key={x.k} className={`col-start-1 row-start-1 self-center text-center text-[15px] leading-snug ${heading(isDark)}`} initial={false} animate={{ opacity: k === c ? 1 : 0, x: k === c ? 0 : 10 }} transition={{ duration: 0.3 }} style={{ pointerEvents: k === c ? 'auto' : 'none' }}>{x.txt}</motion.p>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 min-h-0">
          <div className="lg:w-[38%] flex flex-col gap-2">
            <p className={microLabel(isDark)}>Los filtros se activan en orden, del 1 al 4</p>
            {FILTROS.map((f, k) => (
              <button key={f.k} onClick={() => setActivos(k + 1 === activos ? k : k + 1)} className="text-left">
                <Paso isDark={isDark} n={k + 1} titulo={f.k} on={k < activos}><strong>{f.q}</strong> {f.d}</Paso>
              </button>
            ))}
          </div>
          <div className="lg:w-[62%] flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <p className={microLabel(isDark)}>Ocho pasos candidatos de una venta (ejemplo ilustrativo)</p>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex gap-1">
                  {PASOS.map((p, k) => <motion.span key={k} className="w-3 h-3 rounded-[3px]" initial={false} animate={{ backgroundColor: sigue(p) ? ORANGE : isDark ? '#4b5563' : '#d1d5db', scale: sigue(p) ? 1 : 0.7 }} />)}
                </div>
                <p className={`text-sm ${textMuted(isDark)}`}>Quedan <strong className="text-[#ff851d] text-lg">{quedan}</strong> de {PASOS.length}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {PASOS.map((p, k) => {
                const fuera = !sigue(p);
                const pasa = p.falla === -1 && activos === FILTROS.length;
                return (
                  <motion.div key={p.t} initial={false} animate={{ scale: fuera ? 0.98 : 1 }} className={`flex gap-2.5 px-3 py-2 rounded-xl min-h-[78px] ${fuera ? (isDark ? 'bg-white/5' : 'bg-black/[0.03]') : panelClass(isDark)}`}>
                    <span className={`shrink-0 w-6 h-6 rounded-full grid place-items-center text-[11px] font-black ${fuera ? 'bg-gray-400/30 text-gray-500' : pasa ? 'bg-emerald-500 text-white' : 'bg-[#ff851d] text-white'}`}>{k + 1}</span>
                    <div className="min-w-0">
                      <p className={`text-[13.5px] font-semibold leading-snug ${fuera ? 'line-through opacity-55' : ''} ${heading(isDark)}`}>{p.t}</p>
                      {fuera && <p className={`text-[11.5px] leading-snug mt-0.5 ${textMuted(isDark)}`}><span className="font-black uppercase text-[10px] text-[#ef375c]">No es {FILTROS[p.falla].k.toLowerCase()}. </span>{p.por}</p>}
                      {pasa && <p className="text-[10px] font-black uppercase text-emerald-600 mt-0.5">Pasa los cuatro: es una etapa</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function CriteriosSalida({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [posventa, setPosventa] = useState(true);
  const total = posventa ? 11 : 8;
  const B = 150;
  return (
    <Shell isDark={isDark} title="Criterios de salida y" highlight="etapas después del cierre" subtitle="Cada etapa combina una acción del vendedor con un resultado del comprador. Los criterios de salida son las condiciones que deben cumplirse para pasar a la siguiente.">
      <div className="h-full flex flex-col gap-3 min-h-0 justify-center">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Nota isDark={isDark} label="Acción del vendedor">Hacer la demostración del producto.</Nota>
              <Nota isDark={isDark} label="Etapa centrada en el comprador" destacada>Producto evaluado.</Nota>
            </div>
            <div className={`p-3.5 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Criterios de salida de «Producto evaluado»</p>
              <ul className={`text-sm leading-snug mt-1 space-y-1 ${textMuted(isDark)}`}>
                <li>• El comprador asistió a la demo y resolvió sus preguntas.</li>
                <li>• Antes de cortar, agendó otra reunión para avanzar.</li>
                <li>• Respondió el correo de resumen confirmando los próximos pasos.</li>
              </ul>
            </div>
            <Nota isDark={isDark} label="Por qué importa">La jefatura puede preguntar «¿me muestras el correo donde el comprador confirmó?». Con etapas así de rigurosas, el pronóstico se vuelve confiable: si el 21% de lo que sale de evaluación cierra este mes, se mantiene mes a mes.</Nota>
          </div>
          <div className="lg:w-[48%] flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <Pill isDark={isDark} on={!posventa} onClick={() => setPosventa(false)}>Termina al cerrar</Pill>
              <Pill isDark={isDark} on={posventa} onClick={() => setPosventa(true)}>Con etapas posventa</Pill>
            </div>
            <svg viewBox="0 0 460 210" className="w-full max-h-[230px] overflow-visible" role="img" aria-label={`Proceso de ${total} etapas`}>
              <SceneDefs id="rocs" isDark={isDark} />
              <Piso cx={230} cy={B + 6} s={222} fill={t.floor} />
              {Array.from({ length: 11 }, (_, k) => {
                const x = 30 + k * 40;
                const visible = k < total;
                const post = k >= 8;
                return (
                  <motion.g key={k} initial={false} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }} transition={{ delay: visible ? (k - 8) * 0.1 : 0 }}>
                    <g filter="url(#rocs-sh)"><IsoBox cx={x} cy={B - 30 - 7} s={14} h={30} f={post ? BRAND : k === 7 ? PEACH : NEUTRAL(isDark)} /></g>
                    <text x={x} y={B - 30 - 7 - 14} textAnchor="middle" fontSize={11} fontWeight={900} fill={post ? PINK : t.muted}>{k + 1}</text>
                  </motion.g>
                );
              })}
              <text x={150} y={B + 34} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>1 a 8 · hasta cerrado-ganado</text>
              {posventa && <>
                <text x={455} y={B + 34} textAnchor="end" fontSize={11.5} fontWeight={900} fill={PINK}>9 traspaso · 10 implementación</text>
                <text x={455} y={B + 50} textAnchor="end" fontSize={11.5} fontWeight={900} fill={PINK}>11 cliente en marcha</text>
              </>}
            </svg>
            <p className={`text-xs text-center ${textMuted(isDark)}`}>Caso de Mike Venman: con las etapas 9 a 11 mide cuánto tarda éxito del cliente en reaccionar y si el negocio realmente quedó en marcha.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Nota isDark={isDark} label="¿Cuántas etapas?">Las necesarias para mantener el avance y confirmar o descartar al prospecto. Muy pocas dejan pipelines llenos que nunca dan negocios; demasiadas le complican la venta al vendedor (Bray y Sorey).</Nota>
          <Nota isDark={isDark} label="La prueba de Mark Roberge">A los 6, 9 o 12 meses, ¿cumpliste la promesa de valor que vendiste? Debe ser cierto en más del 80 u 85% de los clientes. Y esos clientes, ¿son rentables?</Nota>
          <Cita isDark={isDark} autor="Bertrand Hazard (TrustRadius)">No tienes dos vendedores: tienes 1.002. Tus mil clientes que hablan maravillas de tu producto son tus mejores vendedores.</Cita>
        </div>
      </div>
    </Shell>
  );
}

const METODOS = [
  { k: 'Por necesidades', cuando: 'El comprador ya habla en lenguaje de necesidades: «necesitamos lograr…, nos importa…».', como: 'Pregunta qué, por qué y cómo; prioriza y muestra cómo tu producto calza.' },
  { k: 'Por soluciones', cuando: 'El comprador casi se queja: describe problemas, no necesidades.', como: 'Profundiza en los problemas y co-crea la solución con pensamiento crítico.' },
  { k: 'Por objetivos', cuando: 'Tiene objetivos e iniciativas claras, propias o encargadas.', como: 'Muestra que eres la mejor ayuda para cumplir esos objetivos.' },
  { k: 'Por insights', cuando: 'Ves una oportunidad que aún no capta del todo.', como: 'Aporta una perspectiva nueva que le ayude a aprovecharla.' },
];

const AREAS = [
  { k: 'Qué saber', d: 'Producto o servicio, metodología de venta y personas compradoras.' },
  { k: 'Qué hacer', d: 'Pasos, estrategias y tácticas antes, durante y después de cada conversación.' },
  { k: 'Qué decir', d: 'Mensaje central, historias, preguntas y guiones de conversación.' },
  { k: 'Qué mostrar', d: 'Menos decks y más pizarra, video y contenido visual que genere emoción.' },
];

type Pieza = { tipo: 'Caso' | 'Pregunta' | 'Frase' | 'Correo' | 'Guion'; t: string };
type Fila = { persona: string; contexto: string; dolores: { d: string; funciones: { f: string; contenido: Pieza[] }[] }[] };

const MATRIZ: Fila[] = [
  {
    persona: 'Gerente de personas', contexto: 'Empresa mediana, 300 trabajadores',
    dolores: [
      { d: 'La rotación subió y no sabe por qué', funciones: [
        { f: 'Encuesta semanal de clima', contenido: [{ tipo: 'Caso', t: 'Cliente del mismo rubro que bajó su rotación en un año' }, { tipo: 'Pregunta', t: '¿Cómo te enteras hoy de que alguien está pensando en irse?' }] },
        { f: 'Alertas de riesgo de fuga', contenido: [{ tipo: 'Frase', t: '«Te avisamos antes de la carta de renuncia.»' }, { tipo: 'Correo', t: 'Seguimiento tras la demo con el costo de reemplazar a una persona' }] },
      ] },
      { d: 'No logra mostrar resultados a la gerencia', funciones: [
        { f: 'Reporte de clima por área', contenido: [{ tipo: 'Guion', t: 'Cómo presentar el clima en el comité ejecutivo' }, { tipo: 'Caso', t: 'Informe trimestral real de un cliente' }] },
      ] },
    ],
  },
  {
    persona: 'Gerente de operaciones', contexto: 'Equipos en terreno y turnos',
    dolores: [
      { d: 'Ausentismo alto en ciertos turnos', funciones: [
        { f: 'Pulso por turno y equipo', contenido: [{ tipo: 'Pregunta', t: '¿Qué turno te preocupa más y por qué?' }, { tipo: 'Caso', t: 'Planta que redujo licencias al detectar un jefe conflictivo' }] },
      ] },
      { d: 'Los supervisores no saben dar feedback', funciones: [
        { f: 'Guías de conversación para jefaturas', contenido: [{ tipo: 'Frase', t: '«Cada respuesta llega con una sugerencia de qué hacer.»' }, { tipo: 'Correo', t: 'Plantilla con tres ejemplos de guías' }] },
      ] },
    ],
  },
  {
    persona: 'CEO de empresa en crecimiento', contexto: 'Pasó de 50 a 200 personas',
    dolores: [
      { d: 'Siente que la cultura se está perdiendo', funciones: [
        { f: 'Tablero de cultura para la dirección', contenido: [{ tipo: 'Caso', t: 'Startup que mantuvo su cultura al triplicar el equipo' }, { tipo: 'Pregunta', t: '¿Qué valor de los inicios sientes que se está diluyendo?' }] },
        { f: 'Preguntas anónimas al CEO', contenido: [{ tipo: 'Guion', t: 'Cómo responder preguntas difíciles en la reunión mensual' }] },
      ] },
    ],
  },
];

function OpcionOscura({ isDark, on, onClick, children }: { isDark: boolean; on: boolean; onClick: () => void; children: React.ReactNode; key?: React.Key }) {
  return (
    <button onClick={onClick} className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold leading-snug transition-colors ${on ? (isDark ? 'bg-gray-200 text-gray-900 shadow-lg' : 'bg-gray-900 text-white shadow-lg') : (isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}>{children}</button>
  );
}

function MatrizPPFC({ isDark }: { isDark: boolean }) {
  const [p, setP] = useState(0);
  const [d, setD] = useState(0);
  const [f, setF] = useState(0);
  const fila = MATRIZ[p];
  const dolor = fila.dolores[Math.min(d, fila.dolores.length - 1)];
  const func = dolor.funciones[Math.min(f, dolor.funciones.length - 1)];
  const colorTipo: Record<Pieza['tipo'], string> = { Caso: '#10b981', Pregunta: ORANGE, Frase: PINK, Correo: '#6366f1', Guion: '#0ea5e9' };
  const columna = (n: number, titulo: string, hijos: React.ReactNode) => (
    <div className="flex flex-col gap-1.5 min-w-0">
      <span className={microLabel(isDark)}>{n}. {titulo}</span>
      {hijos}
    </div>
  );
  const flecha = <span className="self-center text-xl font-black text-[#ff851d] opacity-70">→</span>;
  return (
    <div className="flex flex-col gap-3">
      <div className={`rounded-3xl p-3.5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1.25fr)] items-start gap-2.5 min-h-[272px] ${panelClass(isDark)}`}>
        {columna(1, 'Persona', MATRIZ.map((x, k) => (
          <OpcionOscura key={x.persona} isDark={isDark} on={k === p} onClick={() => { setP(k); setD(0); setF(0); }}>
            {x.persona}<span className={`block text-[10.5px] font-semibold ${k === p ? 'opacity-75' : textMuted(isDark)}`}>{x.contexto}</span>
          </OpcionOscura>
        )))}
        {flecha}
        <AnimatePresence mode="wait">
          <motion.div key={`d${p}`} className="min-w-0" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {columna(2, 'Dolor', fila.dolores.map((x, k) => <OpcionOscura key={x.d} isDark={isDark} on={k === d} onClick={() => { setD(k); setF(0); }}>{x.d}</OpcionOscura>))}
          </motion.div>
        </AnimatePresence>
        {flecha}
        <AnimatePresence mode="wait">
          <motion.div key={`f${p}${d}`} className="min-w-0" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {columna(3, 'Función', dolor.funciones.map((x, k) => <OpcionOscura key={x.f} isDark={isDark} on={k === f} onClick={() => setF(k)}>{x.f}</OpcionOscura>))}
          </motion.div>
        </AnimatePresence>
        {flecha}
        <AnimatePresence mode="wait">
          <motion.div key={`c${p}${d}${f}`} className="min-w-0" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {columna(4, 'Contenido', func.contenido.map((c) => (
              <div key={c.t} className={`p-2.5 rounded-xl ${featuredClass(isDark)}`}>
                <span className="inline-block px-2 py-0.5 rounded-full text-[9.5px] font-black uppercase text-white mb-1" style={{ background: colorTipo[c.tipo] }}>{c.tipo}</span>
                <p className={`text-[12.5px] font-semibold leading-snug ${heading(isDark)}`}>{c.t}</p>
              </div>
            )))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Nota isDark={isDark} label="Para qué sirve">Por cada persona, sus dolores; por cada dolor, las funciones que lo resuelven; por cada función, el contenido que lo explica: casos, preguntas, frases, plantillas de correo y guiones.</Nota>
        <Cita isDark={isDark} autor="Cory Bray y Hilmon Sorey">Una empresa decía que le faltaban casos de clientes. El problema real: no había un circuito cerrado entre éxito del cliente y ventas, y las historias nunca llegaban a los vendedores.</Cita>
      </div>
      <p className={`text-[11px] ${textMuted(isDark)}`}>Matriz de ejemplo ilustrativa, basada en el caso TINYpulse (medición de clima organizacional).</p>
    </div>
  );
}

export function Playbook({ isDark }: SlideProps) {
  const [tab, setTab] = useState(0);
  const [m, setM] = useState(0);
  return (
    <Shell isDark={isDark} title="El playbook:" highlight="cómo se ejecuta el proceso" subtitle="El proceso dice qué etapas existen. La metodología, tu «salsa secreta», dice qué hacer en cada una. El playbook reúne todo lo que el vendedor necesita en el momento en que lo necesita.">
      <div className="h-full flex flex-col gap-3 min-h-0 justify-center">
        <div className="flex gap-2 justify-center">
          {['Metodología adaptativa', 'Las cuatro áreas', 'Matriz dolor · persona · función · contenido'].map((x, k) => <Pill key={x} isDark={isDark} on={k === tab} onClick={() => setTab(k)}>{x}</Pill>)}
        </div>
        <div className="grid">
            <motion.div className="col-start-1 row-start-1 flex flex-col" initial={false} animate={{ opacity: tab === 0 ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ pointerEvents: tab === 0 ? 'auto' : 'none' }}>
              <div className="flex-1 flex flex-col lg:flex-row gap-4">
                <div className="lg:w-[34%] flex flex-col gap-2">
                  {METODOS.map((x, k) => (
                    <button key={x.k} onClick={() => setM(k)} className={`flex-1 flex items-center text-left px-4 py-2.5 rounded-xl text-[15px] font-bold transition-colors ${k === m ? (isDark ? 'bg-gray-200 text-gray-900 shadow-lg' : 'bg-gray-800 text-white shadow-lg') : (isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}>Venta {x.k.toLowerCase()}</button>
                  ))}
                </div>
                <div className="lg:w-[66%] flex flex-col gap-3 [&>*]:flex-1">
                  <div className="grid grid-cols-2 gap-3">
                    <Nota isDark={isDark} label="Cuándo se usa">{METODOS[m].cuando}</Nota>
                    <Nota isDark={isDark} label="Cómo se ve" destacada>{METODOS[m].como}</Nota>
                  </div>
                  <Cita isDark={isDark} autor="Mike Kunkle">En dieciséis años analizando a los mejores vendedores vi una tendencia: no usan una sola metodología. Se adaptan según de dónde viene el comprador, no según lo que ellos intentan hacer.</Cita>
                  <Nota isDark={isDark} label="Ninguna metodología calza perfecto">Por eso conviene combinar las que sirven al proceso y a la persona compradora. La metodología enseña a ejecutar cada etapa.</Nota>
                </div>
              </div>
            </motion.div>
            <motion.div className="col-start-1 row-start-1 flex flex-col" initial={false} animate={{ opacity: tab === 1 ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ pointerEvents: tab === 1 ? 'auto' : 'none' }}>
              <div className="flex-1 flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/2 grid grid-cols-2 grid-rows-2 gap-3 [&>*]:h-full">{AREAS.map((a, k) => <Paso key={a.k} isDark={isDark} n={k + 1} titulo={a.k} on={k === 3}>{a.d}</Paso>)}</div>
                <div className="lg:w-1/2 flex flex-col gap-4 [&>*]:flex-1">
                  <Cita isDark={isDark} autor="Walter Pollard">Un playbook debe ser web, a pedido e interactivo; tener video; y ser perenne, es decir, actualizarse constantemente, porque para el vendedor siempre está cambiando.</Cita>
                  <Nota isDark={isDark} label="Más importante que la metodología elegida">Es cómo la documentas: la consistencia entre vendedores es lo que convierte a los clientes en fans. El playbook incluye también el contenido que el vendedor comparte con el prospecto en cada etapa.</Nota>
                </div>
              </div>
            </motion.div>
            <motion.div className="col-start-1 row-start-1" initial={false} animate={{ opacity: tab === 2 ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ pointerEvents: tab === 2 ? 'auto' : 'none' }}>
              <MatrizPPFC isDark={isDark} />
            </motion.div>
        </div>
      </div>
    </Shell>
  );
}

const ESTADOS = [
  { k: 'Funciona en armonía', d: 'Más del 80% de los vendedores cumple su cuota de forma consistente, las personas nuevas alcanzan rápido el rendimiento esperado y nadie se queja de las «mejoras de proceso».', accion: 'No relajarse: el mercado cambia. Hacer más de lo que rinde y menos del ruido (Dave Casey).' },
  { k: 'Experimenta', d: 'Si el proceso aún no está en armonía, la vía es hacer experimentos rápidos y mejorar de forma continua, en un entorno controlado.', accion: 'Escuchar a la primera línea; preguntar a clientes ganados y perdidos por qué; copiar lo que hace el mejor vendedor y probarlo A/B (Mike Venman). El «uno-dos»: un líder escribe de par a par al decisor para pedir feedback franco.' },
  { k: 'Se agita sin control', d: 'Saltar de una «solución» a otra cada vez que algo sale mal. Cory Bray y Hilmon Sorey lo describen como corrosivo: nunca debería pasar.', accion: 'Volver a experimentos acotados. Bob Britton: la mayoría de los equipos de ventas vive en el cuadrante de crisis; hay que mudarse al proactivo.' },
];

export function Estados({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const cx = 220, cy = 118;
  const orbita: [number, number][] = Array.from({ length: 13 }, (_, k) => [cx + 100 * Math.cos((k * 30 * Math.PI) / 180), cy + 32 * Math.sin((k * 30 * Math.PI) / 180)]);
  const caos: [number, number][] = [[120, 110], [300, 140], [180, 90], [330, 100], [140, 150], [260, 96], [120, 110]];
  return (
    <Shell isDark={isDark} title="¿Tu proceso funciona, experimenta" highlight="o se agita?" subtitle="Todo proceso de ventas está en uno de tres estados. Conviene revisarlo al menos cada tres meses: medir qué pasa en cada etapa y preguntarse qué se aprendió (Doug Davidoff).">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
        <div className="mx-auto w-full max-w-[860px]"><Cita isDark={isDark} autor="Mathias Thulin y Dailius Wilson">Lo que más ha hecho prosperar a mis equipos es preguntar a los clientes ganados y también a los que perdimos por qué siguieron o no. Ese aprendizaje casi nunca vuelve al inicio del proceso.</Cita></div>
      <div className="flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[44%] flex flex-col items-center justify-center gap-2">
          <svg viewBox="0 0 440 226" className="w-full max-h-[260px] overflow-visible" role="img" aria-label="Estado del proceso de ventas">
            <SceneDefs id="roes" isDark={isDark} />
            <ellipse cx={cx} cy={cy + 34} rx={170} ry={54} fill={t.floor} />
            <g filter="url(#roes-sh)"><Cylinder cx={cx} cy={cy} rx={128} ry={40} h={18} top={i === 2 ? (isDark ? '#4b5563' : '#e5e7eb') : '#ffd2a8'} side={i === 2 ? (isDark ? '#374151' : '#9ca3af') : '#f0875a'} /></g>
            <g key={i}>
              {i === 0 && <><Traveler id="roes" path={orbita} dur={3} r={6} /><Traveler id="roes" path={orbita.map(([x, y]) => [2 * cx - x, 2 * cy - y] as [number, number])} dur={3} r={6} color={PINK} /></>}
              {i === 1 && <>
                <Traveler id="roes" path={orbita} dur={4} r={6} />
                {[[150, 104], [290, 130]].map(([x, y], k) => <PulseDisc key={k} cx={x} cy={y} rx={30} ry={10} dur={2} delay={k} peak={0.4} />)}
              </>}
              {i === 2 && <>
                <Traveler id="roes" path={caos} dur={1.4} r={6} color={PINK} />
                <Traveler id="roes" path={[...caos].reverse()} dur={1.1} r={5} />
                {[[160, 112], [280, 124], [220, 98]].map(([x, y], k) => <PulseDisc key={k} cx={x} cy={y} rx={24} ry={8} color={PINK} dur={0.9} delay={k * 0.3} peak={0.45} />)}
              </>}
            </g>
            <text x={cx} y={214} textAnchor="middle" fontSize={12} fontWeight={900} fill={i === 2 ? PINK : ORANGE}>{['Ritmo estable y predecible', 'Pruebas controladas, una a la vez', 'Cambios sin control: todo se desordena'][i]}</text>
          </svg>
          <div className="flex gap-1.5 flex-wrap justify-center">{ESTADOS.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill>)}</div>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
          <div className="grid">
            {ESTADOS.map((x, k) => (
              <motion.div key={x.k} className="col-start-1 row-start-1 flex flex-col gap-2.5" initial={false} animate={{ opacity: k === i ? 1 : 0, y: k === i ? 0 : 6 }} transition={{ duration: 0.3 }} style={{ pointerEvents: k === i ? 'auto' : 'none' }}>
                <Nota isDark={isDark} label={`Estado · ${x.k}`} destacada>{x.d}</Nota>
                <Nota isDark={isDark} label="Qué hacer">{x.accion}</Nota>
              </motion.div>
            ))}
          </div>
          <Nota isDark={isDark} label="Cuando perdiste un negocio con el mismo proceso que antes ganó">Preguntar qué cambió: ¿el cliente, el mercado, la oferta? Analizar los negocios perdidos y pedir feedback a clientes ganados y perdidos, en vez de cambiar todo el proceso de golpe.</Nota>
        </div>
      </div>
      </div>
    </Shell>
  );
}
