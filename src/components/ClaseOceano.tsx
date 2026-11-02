import React from 'react';
import { motion } from 'framer-motion';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import { OA_BASICO, OA_AVANZADO } from './oceano/tests';
import MatrizOA from './oceano/MatrizOA';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PAGINAS } from './oceano/indice';
import { W, H } from './oceano/escenas/comunOA';
import { PortadaOA } from './oceano/escenas/PortadaOA';
import { RojoAzulOA } from './oceano/escenas/RojoAzulOA';
import { ValorOA } from './oceano/escenas/ValorOA';
import { AccionesOA } from './oceano/escenas/AccionesOA';
import { CurvaOA } from './oceano/escenas/CurvaOA';
import { SeisOA } from './oceano/escenas/SeisOA';
import { EtapasOA } from './oceano/escenas/EtapasOA';
import { ProductosOA } from './oceano/escenas/ProductosOA';
import { NoClientesOA } from './oceano/escenas/NoClientesOA';
import { WiiOA } from './oceano/escenas/WiiOA';
import { LimitesOA } from './oceano/escenas/LimitesOA';
import { AplicarOA } from './oceano/escenas/AplicarOA';
import { SintesisOA } from './oceano/escenas/SintesisOA';
import type { Pagina } from './influencia/tipos';
import { guiadoOceano, marcasOceano, finesOceano } from '../data/guiadoOceano';

/**
 * Clase «Estrategia del océano azul» (Kim y Mauborgne). Cada página tiene su escena propia de Remotion que
 * avanza con el audio (datos en ./oceano/paginas*.ts, tiempos en guiadoOceano.ts, generados desde el guion
 * alineado con el audio).
 */

const FPS = 30;

/* Tramo del audio que cubre una página: de su inicio al de la sección siguiente del guion. */
const tramo = (id: string) => {
  const s = guiadoOceano.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesOceano[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'oa-sintesis': SintesisOA,
  'oa-aplicar': AplicarOA,
  'oa-limites': LimitesOA,
  'oa-wii': WiiOA,
  'oa-no-clientes': NoClientesOA,
  'oa-productos': ProductosOA,
  'oa-etapas': EtapasOA,
  'oa-seis': SeisOA,
  'oa-curva': CurvaOA,
  'oa-acciones': AccionesOA,
  'oa-portada': PortadaOA,
  'oa-rojo-azul': RojoAzulOA,
  'oa-valor': ValorOA,
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaOA({ p, isDark }: { p: Pagina; isDark: boolean }) {
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
  const marcas = marcasOceano[p.id] ?? [];
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
      <motion.svg initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewBox="0 0 260 150" className="w-52 md:w-72 mb-4 z-10" aria-hidden="true">
        <defs>
          <linearGradient id="oacov-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff851d" /><stop offset="100%" stopColor="#ef375c" /></linearGradient>
        </defs>
        {/* mar rojo atestado a la izquierda, mar azul abierto a la derecha y un barco que cruza */}
        <rect x="10" y="96" width="115" height="44" rx="14" fill="#e5484d" />
        <rect x="135" y="96" width="115" height="44" rx="14" fill="#2f7bf6" />
        {[28, 58, 88].map((x) => <path key={x} d={`M ${x} 92 L ${x + 26} 92 L ${x + 20} 104 L ${x + 6} 104 Z`} fill="#7c2d12" />)}
        <path d="M 186 92 L 220 92 L 212 108 L 194 108 Z" fill="url(#oacov-g)" />
        <rect x="202" y="48" width="3" height="44" rx="1.5" fill="#4b5563" />
        <path d="M 207 50 L 207 90 L 232 90 Z" fill="#fff" />
        <path d="M 200 58 L 200 90 L 180 90 Z" fill="#fff" opacity={0.85} />
      </motion.svg>
      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">
        Kim y Mauborgne · INSEAD
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Estrategia del <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">océano azul</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Crear un mercado propio en lugar de <strong>pelear por el que ya existe</strong>.
      </motion.p>
    </div>
  );
}

export default function ClaseOceano({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'oa-cover') return <Caratula isDark={isDark} />;
  if (slideId === 'oa-matriz') return <MatrizOA isDark={isDark} />;
  if (slideId === 'oa-test-basico') return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre los conceptos centrales de la estrategia del océano azul. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={OA_BASICO} />
    </Shell>
  );
  if (slideId === 'oa-test-avanzado') return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez preguntas de aplicación: cómo se usan estas ideas en situaciones reales de tu empresa.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={OA_AVANZADO} />
    </Shell>
  );
  const p = PAGINAS[slideId];
  return p ? <PaginaOA key={slideId} p={p} isDark={isDark} /> : null;
}
