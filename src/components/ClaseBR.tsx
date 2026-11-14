import React from 'react';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PortadaBR } from './br/escenas/PortadaBR';
import { EscalarBR } from './br/escenas/EscalarBR';
import { EscaleraBR } from './br/escenas/EscaleraBR';
import { EmbudoBR } from './br/escenas/EmbudoBR';
import { CarritoBR } from './br/escenas/CarritoBR';
import { TemperaturaBR } from './br/escenas/TemperaturaBR';
import { OportunidadBR } from './br/escenas/OportunidadBR';
import { DominoBR } from './br/escenas/DominoBR';
import { DudasBR } from './br/escenas/DudasBR';
import { EpifaniaBR } from './br/escenas/EpifaniaBR';
import { PilaBR } from './br/escenas/PilaBR';
import { CierresBR } from './br/escenas/CierresBR';
import { BofetadaBR } from './br/escenas/BofetadaBR';
import { SuenoBR } from './br/escenas/SuenoBR';
import { EntradaBR } from './br/escenas/EntradaBR';
import { FiestaBR } from './br/escenas/FiestaBR';
import { GanchoBR } from './br/escenas/GanchoBR';
import { CreatividadBR } from './br/escenas/CreatividadBR';
import { RetargetingBR } from './br/escenas/RetargetingBR';
import { ListaBR } from './br/escenas/ListaBR';
import { SombraBR } from './br/escenas/SombraBR';
import { AfiliadosBR } from './br/escenas/AfiliadosBR';
import { LimitesBR } from './br/escenas/LimitesBR';
import { MarcaBR } from './br/escenas/MarcaBR';
import { ReactanciaBR } from './br/escenas/ReactanciaBR';
import { ComiteBR } from './br/escenas/ComiteBR';
import { RetencionBR } from './br/escenas/RetencionBR';
import { SesgosBR } from './br/escenas/SesgosBR';
import { SintesisBR } from './br/escenas/SintesisBR';
import { PAGINAS } from './br/paginas';
import type { PaginaBR } from './br/paginas';
import { BR_BASICO, BR_AVANZADO } from './br/tests';
import { W, H } from './oceano/escenas/comunOA';
import { guiadoBR, marcasBR, finesBR } from '../data/guiadoBR';

/**
 * Clase «Los secretos de Brunson» (embudos, persuasión y tráfico, con un anexo crítico). Cada página tiene su escena
 * propia de Remotion que avanza con el audio (datos en ./br/paginas.ts, tiempos en guiadoBR.ts, generados por scripts/generar-guiado-br.cjs).
 */

const FPS = 30;

const tramo = (id: string) => {
  const s = guiadoBR.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesBR[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'br-portada': PortadaBR,
  'br-escalar': EscalarBR,
  'br-escalera': EscaleraBR,
  'br-embudo': EmbudoBR,
  'br-carrito': CarritoBR,
  'br-temperatura': TemperaturaBR,
  'br-oportunidad': OportunidadBR,
  'br-domino': DominoBR,
  'br-dudas': DudasBR,
  'br-epifania': EpifaniaBR,
  'br-pila': PilaBR,
  'br-cierres': CierresBR,
  'br-bofetada': BofetadaBR,
  'br-sueno': SuenoBR,
  'br-entrada': EntradaBR,
  'br-fiesta': FiestaBR,
  'br-gancho': GanchoBR,
  'br-creatividad': CreatividadBR,
  'br-retargeting': RetargetingBR,
  'br-lista': ListaBR,
  'br-sombra': SombraBR,
  'br-afiliados': AfiliadosBR,
  'br-limites': LimitesBR,
  'br-marca': MarcaBR,
  'br-reactancia': ReactanciaBR,
  'br-comite': ComiteBR,
  'br-retencion': RetencionBR,
  'br-sesgos': SesgosBR,
  'br-sintesis': SintesisBR,
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaBRV({ p, isDark }: { p: PaginaBR; isDark: boolean }) {
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
  const marcas = marcasBR[p.id] ?? [];
  const componente = ESCENAS[p.id];
  const props = { isDark, marcas, pregunta: p.pregunta.texto || undefined };
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

export default function ClaseBR({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'br-test-basico') return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre la escalera de valor, la persuasión, el tráfico y los límites del método. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={BR_BASICO} />
    </Shell>
  );
  if (slideId === 'br-test-avanzado') return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez preguntas sobre cifras, evidencia y cuándo conviene o no aplicar el método.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={BR_AVANZADO} />
    </Shell>
  );
  const p = PAGINAS[slideId];
  return p ? <PaginaBRV key={slideId} p={p} isDark={isDark} /> : null;
}
