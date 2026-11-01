import React from 'react';
import { motion } from 'framer-motion';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import { CE1_BASICO, CE1_AVANZADO } from './comunicacion/tests1';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PAGINAS } from './comunicacion/indice';
import { W, H } from './comunicacion/escenas/comunCE';
import { PortadaCE } from './comunicacion/escenas/PortadaCE';
import { PrimeraImpresionCE } from './comunicacion/escenas/PrimeraImpresionCE';
import { LentesCE } from './comunicacion/escenas/LentesCE';
import { CorregirCE } from './comunicacion/escenas/CorregirCE';
import { CredibilidadCE } from './comunicacion/escenas/CredibilidadCE';
import { ConstruirCE } from './comunicacion/escenas/ConstruirCE';
import { AutenticidadCE } from './comunicacion/escenas/AutenticidadCE';
import { IntencionesCE } from './comunicacion/escenas/IntencionesCE';
import { CuidadoCE } from './comunicacion/escenas/CuidadoCE';
import { PreguntarCE } from './comunicacion/escenas/PreguntarCE';
import { TiposPreguntaCE } from './comunicacion/escenas/TiposPreguntaCE';
import { VentasPreguntasCE } from './comunicacion/escenas/VentasPreguntasCE';
import { EstiloHablarCE } from './comunicacion/escenas/EstiloHablarCE';
import { DosNivelesCE } from './comunicacion/escenas/DosNivelesCE';
import { EstilosDecisionCE } from './comunicacion/escenas/EstilosDecisionCE';
import { CarismaticosPensadoresCE } from './comunicacion/escenas/CarismaticosPensadoresCE';
import { OtrosEstilosCE } from './comunicacion/escenas/OtrosEstilosCE';
import { CulturaCE } from './comunicacion/escenas/CulturaCE';
import { ConfianzaCE } from './comunicacion/escenas/ConfianzaCE';
import { CialdiniCE } from './comunicacion/escenas/CialdiniCE';
import { RespaldoConsistenciaCE } from './comunicacion/escenas/RespaldoConsistenciaCE';
import { AutoridadEscasezCE } from './comunicacion/escenas/AutoridadEscasezCE';
import { TerrenoComunCE } from './comunicacion/escenas/TerrenoComunCE';
import { EvidenciaEmocionCE } from './comunicacion/escenas/EvidenciaEmocionCE';
import { PresentarIdeasCE } from './comunicacion/escenas/PresentarIdeasCE';
import { TresTiposCE } from './comunicacion/escenas/TresTiposCE';
import { DenningCE } from './comunicacion/escenas/DenningCE';
import { PropositosCE } from './comunicacion/escenas/PropositosCE';
import { AntihistoriasCE } from './comunicacion/escenas/AntihistoriasCE';
import { TensasCE } from './comunicacion/escenas/TensasCE';
import { PrepararTensaCE } from './comunicacion/escenas/PrepararTensaCE';
import { JugadasCE } from './comunicacion/escenas/JugadasCE';
import { AconsejarCE } from './comunicacion/escenas/AconsejarCE';
import { SintesisCE } from './comunicacion/escenas/SintesisCE';
import type { Pagina } from './influencia/tipos';
import { guiadoComunicacion1, marcasComunicacion1, finesComunicacion1 } from '../data/guiadoComunicacion1';

/**
 * Formación «Comunicación efectiva», parte 1: «Vender: la conversación con el cliente». Cada página tiene
 * su escena propia de Remotion que avanza con el audio (datos en ./comunicacion/paginas*.ts, tiempos
 * en guiadoComunicacion1.ts, generados desde el guion alineado con el audio).
 */

const FPS = 30;

/* Tramo del audio que cubre una página: de su inicio al de la sección siguiente del guion. */
const tramo = (id: string) => {
  const s = guiadoComunicacion1.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesComunicacion1[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'ce1-portada': PortadaCE,
  'ce1-primera-impresion': PrimeraImpresionCE,
  'ce1-lentes': LentesCE,
  'ce1-corregir': CorregirCE,
  'ce1-credibilidad': CredibilidadCE,
  'ce1-construir': ConstruirCE,
  'ce1-autenticidad': AutenticidadCE,
  'ce1-intenciones': IntencionesCE,
  'ce1-cuidado': CuidadoCE,
  'ce1-preguntar': PreguntarCE,
  'ce1-tipos-pregunta': TiposPreguntaCE,
  'ce1-ventas-preguntas': VentasPreguntasCE,
  'ce1-estilo-hablar': EstiloHablarCE,
  'ce1-dos-niveles': DosNivelesCE,
  'ce1-estilos-decision': EstilosDecisionCE,
  'ce1-carismaticos-pensadores': CarismaticosPensadoresCE,
  'ce1-otros-estilos': OtrosEstilosCE,
  'ce1-cultura': CulturaCE,
  'ce1-confianza': ConfianzaCE,
  'ce1-cialdini': CialdiniCE,
  'ce1-respaldo-consistencia': RespaldoConsistenciaCE,
  'ce1-autoridad-escasez': AutoridadEscasezCE,
  'ce1-terreno-comun': TerrenoComunCE,
  'ce1-evidencia-emocion': EvidenciaEmocionCE,
  'ce1-presentar-ideas': PresentarIdeasCE,
  'ce1-tres-tipos': TresTiposCE,
  'ce1-denning': DenningCE,
  'ce1-propositos': PropositosCE,
  'ce1-antihistorias': AntihistoriasCE,
  'ce1-tensas': TensasCE,
  'ce1-preparar-tensa': PrepararTensaCE,
  'ce1-jugadas': JugadasCE,
  'ce1-aconsejar': AconsejarCE,
  'ce1-sintesis': SintesisCE,
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaCE({ p, isDark }: { p: Pagina; isDark: boolean }) {
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
  const marcas = marcasComunicacion1[p.id] ?? [];
  const componente = ESCENAS[p.id];
  const props = { isDark, marcas, pregunta: p.pregunta.texto };
  // Fuera de la clase guiada se muestra el cuadro justo antes de la pregunta.
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

/* Carátula estática de la parte 1. No tiene audio: al dar play, la clase guiada salta a la portada
   animada y la narración arranca desde el segundo 0. */
function Caratula({ isDark }: { isDark: boolean }) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <motion.svg initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewBox="0 0 220 160" className="w-48 md:w-64 mb-4 z-10" aria-hidden="true">
        <defs>
          <linearGradient id="ce1cov-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff851d" />
            <stop offset="100%" stopColor="#ef375c" />
          </linearGradient>
        </defs>
        <path d="M 20 30 Q 20 14 36 14 H 120 Q 136 14 136 30 V 76 Q 136 92 120 92 H 66 L 42 114 L 46 92 H 36 Q 20 92 20 76 Z" fill="url(#ce1cov-g)" />
        <circle cx="54" cy="53" r="7" fill="#fff" /><circle cx="78" cy="53" r="7" fill="#fff" /><circle cx="102" cy="53" r="7" fill="#fff" />
        <path d="M 200 70 Q 200 56 186 56 H 112 Q 98 56 98 70 V 112 Q 98 126 112 126 H 162 L 184 146 L 180 126 H 186 Q 200 126 200 112 Z" fill="url(#ce1cov-g)" opacity={0.25} />
        <path d="M 200 70 Q 200 56 186 56 H 112 Q 98 56 98 70 V 112 Q 98 126 112 126 H 162 L 184 146 L 180 126 H 186 Q 200 126 200 112 Z" fill="none" stroke="url(#ce1cov-g)" strokeWidth="4" />
      </motion.svg>
      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">
        Comunicación efectiva · Parte 1
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Vender: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">la conversación con el cliente</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Lo que crees transmitir y lo que el cliente recibe <strong>casi nunca coinciden</strong>. Eso se puede aprender.
      </motion.p>
    </div>
  );
}

export default function ClaseComunicacion1({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'ce1-cover') return <Caratula isDark={isDark} />;
  if (slideId === 'ce1-test-basico') return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre los conceptos centrales de la parte 1. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={CE1_BASICO} />
    </Shell>
  );
  if (slideId === 'ce1-test-avanzado') return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez preguntas de aplicación: cómo se usan estas ideas en conversaciones reales con clientes.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={CE1_AVANZADO} />
    </Shell>
  );
  const p = PAGINAS[slideId];
  return p ? <PaginaCE key={slideId} p={p} isDark={isDark} /> : null;
}
