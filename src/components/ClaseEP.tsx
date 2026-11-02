import React from 'react';
import { motion } from 'framer-motion';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import { EP_BASICO, EP_AVANZADO } from './ep/tests';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PAGINAS } from './ep/indice';
import { W, H } from './oceano/escenas/comunOA';
import { PortadaEP } from './ep/escenas/PortadaEP';
import { OrigenEP } from './ep/escenas/OrigenEP';
import { ProblemaEP } from './ep/escenas/ProblemaEP';
import { MatrizEP } from './ep/escenas/MatrizEP';
import { PasionEP } from './ep/escenas/PasionEP';
import { DesiertoEP } from './ep/escenas/DesiertoEP';
import { LanzarEP } from './ep/escenas/LanzarEP';
import { DisrupcionEP } from './ep/escenas/DisrupcionEP';
import { IncumbentesEP } from './ep/escenas/IncumbentesEP';
import { FocoEP } from './ep/escenas/FocoEP';
import { FasesEP } from './ep/escenas/FasesEP';
import { HistoriaEP } from './ep/escenas/HistoriaEP';
import { NoesEP } from './ep/escenas/NoesEP';
import { CartaEP } from './ep/escenas/CartaEP';
import { JuntaEP } from './ep/escenas/JuntaEP';
import { CrisisEP } from './ep/escenas/CrisisEP';
import { DecisionEP } from './ep/escenas/DecisionEP';
import { AdnEP } from './ep/escenas/AdnEP';
import { ContratarEP } from './ep/escenas/ContratarEP';
import { MuestraEP } from './ep/escenas/MuestraEP';
import { UsuariosEP } from './ep/escenas/UsuariosEP';
import { RetencionEP } from './ep/escenas/RetencionEP';
import { EmbudoEP } from './ep/escenas/EmbudoEP';
import { DineroEP } from './ep/escenas/DineroEP';
import { CrecerEP } from './ep/escenas/CrecerEP';
import { CincuentaEP } from './ep/escenas/CincuentaEP';
import { GlobalEP } from './ep/escenas/GlobalEP';
import { SalidaEP } from './ep/escenas/SalidaEP';
import { AcuerdoEP } from './ep/escenas/AcuerdoEP';
import { SintesisEP } from './ep/escenas/SintesisEP';
import type { PaginaEP } from './ep/paginas1';
import { guiadoEP, marcasEP, finesEP } from '../data/guiadoEP';

/**
 * Clase «Enamórate del problema, no de la solución» (Uri Levine). Cada página tiene su escena propia de Remotion
 * que avanza con el audio (datos en ./ep/paginas*.ts, tiempos en guiadoEP.ts, generados desde el guion alineado
 * con el audio por scripts/generar-guiado-ep.cjs).
 */

const FPS = 30;

const tramo = (id: string) => {
  const s = guiadoEP.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesEP[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'ep-portada': PortadaEP, 'ep-origen': OrigenEP, 'ep-problema': ProblemaEP, 'ep-matriz': MatrizEP, 'ep-pasion': PasionEP,
  'ep-desierto': DesiertoEP, 'ep-lanzar': LanzarEP, 'ep-disrupcion': DisrupcionEP, 'ep-incumbentes': IncumbentesEP, 'ep-foco': FocoEP,
  'ep-fases': FasesEP, 'ep-historia': HistoriaEP, 'ep-noes': NoesEP, 'ep-carta': CartaEP, 'ep-junta': JuntaEP,
  'ep-crisis': CrisisEP, 'ep-decision': DecisionEP, 'ep-adn': AdnEP, 'ep-contratar': ContratarEP, 'ep-muestra': MuestraEP,
  'ep-usuarios': UsuariosEP, 'ep-retencion': RetencionEP, 'ep-embudo': EmbudoEP, 'ep-dinero': DineroEP, 'ep-crecer': CrecerEP,
  'ep-cincuenta': CincuentaEP, 'ep-global': GlobalEP, 'ep-salida': SalidaEP, 'ep-acuerdo': AcuerdoEP, 'ep-sintesis': SintesisEP,
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaEPV({ p, isDark }: { p: PaginaEP; isDark: boolean }) {
  const caja = React.useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = React.useState(0);
  React.useEffect(() => {
    const el = caja.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setAncho(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [p.id]);
  // En pantallas angostas ningún texto de la escena baja de 13 px reales; en PC se respeta el diseño.
  const piso = ancho > 0 && ancho < 520 ? (13 * W) / ancho : 0;
  const { inicio, fin } = tramo(p.id);
  const marcas = marcasEP[p.id] ?? [];
  const componente = ESCENAS[p.id];
  const props = { isDark, marcas, pregunta: p.pregunta.texto };
  const total = Math.max(1, Math.ceil((fin - inicio) * FPS));
  const completo = marcas.length ? Math.min(total - 1, Math.max(0, Math.round((marcas[marcas.length - 1] - 0.6) * FPS))) : 0;
  return (
    <Shell isDark={isDark} title={p.titulo} highlight={p.destaque} subtitle={p.bajada}>
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div ref={caja} className="lg:w-[58%] min-w-0 min-h-0 flex items-center justify-center overflow-hidden rounded-2xl">
            {componente && (
              <PisoTexto.Provider value={piso}>
                <EscenaSincronizada componente={componente} props={props} inicio={inicio} fin={fin} ancho={W} alto={H} respaldo={
                  <Thumbnail component={componente} inputProps={props} compositionWidth={W} compositionHeight={H} frameToDisplay={completo} durationInFrames={total} fps={FPS}
                    style={{ width: '100%', aspectRatio: `${W} / ${H}`, maxHeight: '100%' }} />
                } />
              </PisoTexto.Provider>
            )}
          </div>
          <div className="lg:w-[42%] min-w-0 flex flex-col gap-3 justify-center">
            {p.tarjetas.map((tj) => (
              <div key={tj.rotulo} className={`p-4 rounded-2xl ${tj.destacada ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>{tj.rotulo}</p>
                <p className={`text-sm leading-snug mt-1 [overflow-wrap:anywhere] ${textMuted(isDark)}`}>{tj.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* Carátula estática. Al dar play, la clase guiada salta a la primera página narrada. */
function Caratula({ isDark }: { isDark: boolean }) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <motion.svg initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewBox="0 0 240 160" className="w-52 md:w-72 mb-4 z-10" aria-hidden="true">
        <defs>
          <linearGradient id="epcov-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff851d" /><stop offset="100%" stopColor="#ef375c" /></linearGradient>
        </defs>
        {/* la brújula del problema */}
        <circle cx="120" cy="80" r="66" fill="url(#epcov-g)" /><circle cx="120" cy="80" r="54" fill="#fffaf5" />
        <path d="M 120 34 L 132 80 L 108 80 Z" fill="#ef375c" /><path d="M 120 126 L 132 80 L 108 80 Z" fill="#94a3b8" />
        <circle cx="120" cy="80" r="7" fill="#334155" />
      </motion.svg>
      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">
        Uri Levine · Waze y Moovit
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Enamórate del <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">problema</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        No de la <strong>solución</strong>.
      </motion.p>
    </div>
  );
}

export default function ClaseEP({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'ep-cover') return <Caratula isDark={isDark} />;
  if (slideId === 'ep-test-basico') return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre las ideas centrales del método de Uri Levine. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={EP_BASICO} />
    </Shell>
  );
  if (slideId === 'ep-test-avanzado') return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez preguntas de aplicación: cómo se usan estas ideas en situaciones reales de tu empresa.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={EP_AVANZADO} />
    </Shell>
  );
  const p = PAGINAS[slideId];
  return p ? <PaginaEPV key={slideId} p={p} isDark={isDark} /> : null;
}
