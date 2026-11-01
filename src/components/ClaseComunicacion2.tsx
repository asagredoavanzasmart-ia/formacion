import React from 'react';
import { motion } from 'framer-motion';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import { CE2_BASICO, CE2_AVANZADO } from './comunicacion/p2/tests';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PAGINAS } from './comunicacion/indice2';
import { W, H } from './comunicacion/escenas/comunCE';
import { Portada2CE } from './comunicacion/escenas2/Portada2CE';
import { HammCE } from './comunicacion/escenas2/HammCE';
import { EstructuraCE } from './comunicacion/escenas2/EstructuraCE';
import { ResultadosCE } from './comunicacion/escenas2/ResultadosCE';
import { TiempoCE } from './comunicacion/escenas2/TiempoCE';
import { CulturaGanarCE } from './comunicacion/escenas2/CulturaGanarCE';
import { ConversacionCE } from './comunicacion/escenas2/ConversacionCE';
import { InteractividadCE } from './comunicacion/escenas2/InteractividadCE';
import { IntencionalidadCE } from './comunicacion/escenas2/IntencionalidadCE';
import { SilencioCE } from './comunicacion/escenas2/SilencioCE';
import { DiferenciasCE } from './comunicacion/escenas2/DiferenciasCE';
import { EspiralCE } from './comunicacion/escenas2/EspiralCE';
import { RomperCE } from './comunicacion/escenas2/RomperCE';
import { CorajeCE } from './comunicacion/escenas2/CorajeCE';
import { TerrenoCE } from './comunicacion/escenas2/TerrenoCE';
import { ActuarCE } from './comunicacion/escenas2/ActuarCE';
import { RetroCE } from './comunicacion/escenas2/RetroCE';
import { RecibirCE } from './comunicacion/escenas2/RecibirCE';
import { DesarmarCE } from './comunicacion/escenas2/DesarmarCE';
import { PedirConsejoCE } from './comunicacion/escenas2/PedirConsejoCE';
import { DarConsejoCE } from './comunicacion/escenas2/DarConsejoCE';
import { ConflictoCE } from './comunicacion/escenas2/ConflictoCE';
import { HablarSentirCE } from './comunicacion/escenas2/HablarSentirCE';
import { Sintesis2CE } from './comunicacion/escenas2/Sintesis2CE';
import type { Pagina } from './influencia/tipos';
import { guiadoComunicacion2, marcasComunicacion2, finesComunicacion2 } from '../data/guiadoComunicacion2';

/**
 * Formación «Comunicación efectiva», parte 2: «La organización que vende». Cada página tiene su escena
 * propia de Remotion que avanza con el audio (datos en ./comunicacion/p2/paginas*.ts, tiempos en
 * guiadoComunicacion2.ts, generados desde el guion alineado con el audio).
 */

const FPS = 30;

/* Tramo del audio que cubre una página: de su inicio al de la sección siguiente del guion. */
const tramo = (id: string) => {
  const s = guiadoComunicacion2.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesComunicacion2[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'ce2-portada': Portada2CE,
  'ce2-hamm': HammCE,
  'ce2-estructura': EstructuraCE,
  'ce2-resultados': ResultadosCE,
  'ce2-tiempo': TiempoCE,
  'ce2-cultura': CulturaGanarCE,
  'ce2-conversacion': ConversacionCE,
  'ce2-interactividad': InteractividadCE,
  'ce2-intencionalidad': IntencionalidadCE,
  'ce2-silencio': SilencioCE,
  'ce2-diferencias': DiferenciasCE,
  'ce2-espiral': EspiralCE,
  'ce2-romper': RomperCE,
  'ce2-coraje': CorajeCE,
  'ce2-terreno': TerrenoCE,
  'ce2-actuar': ActuarCE,
  'ce2-retroalimentacion': RetroCE,
  'ce2-recibir': RecibirCE,
  'ce2-desarmar': DesarmarCE,
  'ce2-pedir-consejo': PedirConsejoCE,
  'ce2-dar-consejo': DarConsejoCE,
  'ce2-conflicto': ConflictoCE,
  'ce2-hablar-sentir': HablarSentirCE,
  'ce2-sintesis': Sintesis2CE,
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
  const marcas = marcasComunicacion2[p.id] ?? [];
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

/* Carátula estática de la parte 2. Al dar play, la clase guiada salta a la primera página narrada. */
function Caratula({ isDark }: { isDark: boolean }) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <motion.svg initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewBox="0 0 220 160" className="w-48 md:w-64 mb-4 z-10" aria-hidden="true">
        <defs>
          <linearGradient id="ce2cov-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff851d" />
            <stop offset="100%" stopColor="#ef375c" />
          </linearGradient>
        </defs>
        {/* un edificio con burbujas de conversación adentro */}
        <rect x="50" y="30" width="120" height="120" rx="10" fill="url(#ce2cov-g)" opacity={0.18} />
        <rect x="50" y="30" width="120" height="120" rx="10" fill="none" stroke="url(#ce2cov-g)" strokeWidth="4" />
        <path d="M 66 52 H 120 Q 128 52 128 60 V 80 Q 128 88 120 88 H 92 L 80 100 L 82 88 H 74 Q 66 88 66 80 V 60 Q 66 52 74 52 Z" fill="url(#ce2cov-g)" />
        <circle cx="84" cy="70" r="4.5" fill="#fff" /><circle cx="97" cy="70" r="4.5" fill="#fff" /><circle cx="110" cy="70" r="4.5" fill="#fff" />
        <path d="M 154 98 H 104 Q 96 98 96 106 V 122 Q 96 130 104 130 H 132 L 144 140 L 142 130 H 146 Q 154 130 154 122 V 106 Q 154 98 146 98 Z" fill="none" stroke="url(#ce2cov-g)" strokeWidth="4" />
      </motion.svg>
      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">
        Comunicación efectiva · Parte 2
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        La organización <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">que vende</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Lo que se dice afuera <strong>nace de lo que se habla adentro</strong>.
      </motion.p>
    </div>
  );
}

export default function ClaseComunicacion2({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'ce2-cover') return <Caratula isDark={isDark} />;
  if (slideId === 'ce2-test-basico') return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre los conceptos centrales de la parte 2. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={CE2_BASICO} />
    </Shell>
  );
  if (slideId === 'ce2-test-avanzado') return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez preguntas de aplicación: cómo se usan estas ideas en situaciones reales del equipo comercial.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={CE2_AVANZADO} />
    </Shell>
  );
  const p = PAGINAS[slideId];
  return p ? <PaginaCE key={slideId} p={p} isDark={isDark} /> : null;
}
