import React from 'react';
import { motion } from 'framer-motion';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import { LS_BASICO, LS_AVANZADO } from './lean/tests';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PAGINAS } from './lean/indice';
import { W, H } from './oceano/escenas/comunOA';
import { PortadaLS } from './lean/escenas/PortadaLS';
import { ToyotaLS } from './lean/escenas/ToyotaLS';
import { CicloLS } from './lean/escenas/CicloLS';
import { PmvLS } from './lean/escenas/PmvLS';
import { MedirLS } from './lean/escenas/MedirLS';
import { PivotarLS } from './lean/escenas/PivotarLS';
import { TiposLS } from './lean/escenas/TiposLS';
import { LotesLS } from './lean/escenas/LotesLS';
import { PorquesLS } from './lean/escenas/PorquesLS';
import { MotoresLS } from './lean/escenas/MotoresLS';
import { AplicarLS } from './lean/escenas/AplicarLS';
import { CriticasLS } from './lean/escenas/CriticasLS';
import { SintesisLS } from './lean/escenas/SintesisLS';
import type { Pagina } from './influencia/tipos';
import { guiadoLean, marcasLean, finesLean } from '../data/guiadoLean';

/**
 * Clase «El método Lean Startup» (Eric Ries). Cada página tiene su escena propia de Remotion que
 * avanza con el audio (datos en ./lean/paginas*.ts, tiempos en guiadoLean.ts, generados desde el guion
 * alineado con el audio).
 */

const FPS = 30;

/* Tramo del audio que cubre una página: de su inicio al de la sección siguiente del guion. */
const tramo = (id: string) => {
  const s = guiadoLean.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesLean[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'ls-sintesis': SintesisLS,
  'ls-criticas': CriticasLS,
  'ls-aplicar': AplicarLS,
  'ls-motores': MotoresLS,
  'ls-porques': PorquesLS,
  'ls-lotes': LotesLS,
  'ls-tipos': TiposLS,
  'ls-pivotar': PivotarLS,
  'ls-medir': MedirLS,
  'ls-pmv': PmvLS,
  'ls-ciclo': CicloLS,
  'ls-toyota': ToyotaLS,
  'ls-portada': PortadaLS,
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaLS({ p, isDark }: { p: Pagina; isDark: boolean }) {
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
  const marcas = marcasLean[p.id] ?? [];
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
      <motion.svg initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewBox="0 0 240 150" className="w-52 md:w-72 mb-4 z-10" aria-hidden="true">
        <defs>
          <linearGradient id="lscov-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff851d" /><stop offset="100%" stopColor="#ef375c" /></linearGradient>
        </defs>
        {/* el ciclo crear, medir, aprender: tres nodos unidos por flechas en bucle */}
        <path d="M 120 24 A 56 56 0 0 1 176 90" fill="none" stroke="url(#lscov-g)" strokeWidth="10" strokeLinecap="round" />
        <path d="M 164 118 A 56 56 0 0 1 76 118" fill="none" stroke="url(#lscov-g)" strokeWidth="10" strokeLinecap="round" opacity={0.75} />
        <path d="M 64 90 A 56 56 0 0 1 120 24" fill="none" stroke="url(#lscov-g)" strokeWidth="10" strokeLinecap="round" opacity={0.5} />
        <circle cx="120" cy="24" r="15" fill="#ff851d" /><circle cx="176" cy="96" r="15" fill="#ef375c" /><circle cx="64" cy="96" r="15" fill="#2f7bf6" />
        <rect x="104" y="68" width="32" height="32" rx="8" fill="url(#lscov-g)" />
      </motion.svg>
      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">
        Eric Ries · Crear, medir, aprender
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        El método <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Lean Startup</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Aprender más rápido de lo que se <strong>gasta</strong>.
      </motion.p>
    </div>
  );
}

export default function ClaseLean({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'ls-cover') return <Caratula isDark={isDark} />;
  if (slideId === 'ls-test-basico') return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre los conceptos centrales de el método Lean Startup. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={LS_BASICO} />
    </Shell>
  );
  if (slideId === 'ls-test-avanzado') return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez preguntas de aplicación: cómo se usan estas ideas en situaciones reales de tu empresa.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={LS_AVANZADO} />
    </Shell>
  );
  const p = PAGINAS[slideId];
  return p ? <PaginaLS key={slideId} p={p} isDark={isDark} /> : null;
}
