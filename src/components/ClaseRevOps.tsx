import React from 'react';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass } from './slideKit';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { W, H } from './revops/escenas/kitRO';
import { PAGINAS } from './revops/indice';
import type { PaginaRO } from './revops/tipos';
import { guiadoRevops, marcasRevops, finesRevops } from '../data/guiadoRevops';
import { PortadaRO } from './revops/escenas/PortadaRO';
import { PilaresRO } from './revops/escenas/PilaresRO';
import { RutaRO } from './revops/escenas/RutaRO';
import { EscalaRO } from './revops/escenas/EscalaRO';
import { EmpezarRO } from './revops/escenas/EmpezarRO';
import { VelocidadRO } from './revops/escenas/VelocidadRO';
import { CasosRO } from './revops/escenas/CasosRO';
import { FlywheelRO } from './revops/escenas/FlywheelRO';
import { FuerzaRO } from './revops/escenas/FuerzaRO';
import { FriccionRO } from './revops/escenas/FriccionRO';
import { FriccionUtilRO } from './revops/escenas/FriccionUtilRO';
import { MapaRO } from './revops/escenas/MapaRO';
import { SlaRO } from './revops/escenas/SlaRO';
import { ContactoRO } from './revops/escenas/ContactoRO';
import { JudicialRO } from './revops/escenas/JudicialRO';
import { BarandasRO } from './revops/escenas/BarandasRO';
import { CompradorRO } from './revops/escenas/CompradorRO';
import { FiltrosRO } from './revops/escenas/FiltrosRO';
import { SalidaRO } from './revops/escenas/SalidaRO';
import { PlaybookRO } from './revops/escenas/PlaybookRO';
import { EstadosRO } from './revops/escenas/EstadosRO';
import { ProcesoRO } from './revops/escenas/ProcesoRO';
import { GobiernoRO } from './revops/escenas/GobiernoRO';
import { IndicadoresRO } from './revops/escenas/IndicadoresRO';
import { StackRO } from './revops/escenas/StackRO';
import { LenguajeRO } from './revops/escenas/LenguajeRO';
import { A3RO } from './revops/escenas/A3RO';
import { PrewiringRO } from './revops/escenas/PrewiringRO';
import { MonroeRO } from './revops/escenas/MonroeRO';
import { ObjecionesRO } from './revops/escenas/ObjecionesRO';
import { BolosRO } from './revops/escenas/BolosRO';
import { SilosRO } from './revops/escenas/SilosRO';
import { CapasRO } from './revops/escenas/CapasRO';
import { NecesidadRO } from './revops/escenas/NecesidadRO';
import { CuadranteRO } from './revops/escenas/CuadranteRO';
import { EntrevistaRO } from './revops/escenas/EntrevistaRO';
import { CicloRO } from './revops/escenas/CicloRO';
import { MetasRO } from './revops/escenas/MetasRO';
import type { SlideProps } from './revops/kit';
import { Diagnostico } from './revops/Fundamentos';
import { PorQueSLA, CalculadoraSLA, ValorLead, Contacto, RamaJudicial, Velocidades, Paradoja, Comprador, Filtros, CriteriosSalida, Playbook, Estados } from './revops/Alineacion';
import { ProcesoPrimero, Gobierno, Indicadores, Stack, Lenguaje, CostoMalaCalidad, InformeA3, PreWiring, Monroe, Objeciones, Retroceso } from './revops/Sistemas';
import { Silos, Capas, Necesidad, Cuadrante, Entrevista, Ciclo, Metas, Diario } from './revops/Equipo';

/**
 * Clase guiada «RevOps» (prefijo ro-): diez lecciones. Cada página narrada tiene su escena propia de Remotion que
 * avanza con el audio (datos en ./revops/paginas*.ts, tiempos en guiadoRevops.ts, generados desde la narración de
 * cada página alineada con su audio). Las calculadoras siguen siendo interactivas y la narración rellena sus campos.
 */

const FPS = 30;

const ESCENAS: Record<string, React.FC<any>> = {
  'ro-1-portada': PortadaRO,
  'ro-1-definicion': PilaresRO,
  'ro-1-ruta': RutaRO,
  'ro-2-escala': EscalaRO,
  'ro-2-empezar': EmpezarRO,
  'ro-2-velocidad': VelocidadRO,
  'ro-2-casos': CasosRO,
  'ro-3-flywheel': FlywheelRO,
  'ro-3-fuerza': FuerzaRO,
  'ro-3-friccion': FriccionRO,
  'ro-3-friccion-util': FriccionUtilRO,
  'ro-3-mapa': MapaRO,
  'ro-4-porque': SlaRO,
  'ro-4-contacto': ContactoRO,
  'ro-4-judicial': JudicialRO,
  'ro-5-paradoja': BarandasRO,
  'ro-5-comprador': CompradorRO,
  'ro-5-filtros': FiltrosRO,
  'ro-5-salida': SalidaRO,
  'ro-5-playbook': PlaybookRO,
  'ro-5-estados': EstadosRO,
  'ro-6-proceso': ProcesoRO,
  'ro-6-gobierno': GobiernoRO,
  'ro-6-indicadores': IndicadoresRO,
  'ro-6-stack': StackRO,
  'ro-7-lenguaje': LenguajeRO,
  'ro-7-a3': A3RO,
  'ro-7-prewiring': PrewiringRO,
  'ro-7-monroe': MonroeRO,
  'ro-7-objeciones': ObjecionesRO,
  'ro-7-retroceso': BolosRO,
  'ro-8-silos': SilosRO,
  'ro-8-capas': CapasRO,
  'ro-9-necesidad': NecesidadRO,
  'ro-9-cuadrante': CuadranteRO,
  'ro-9-entrevista': EntrevistaRO,
  'ro-10-ciclo': CicloRO,
  'ro-10-metas': MetasRO,
};

/* Calculadoras y diapositivas anteriores que aún no tienen escena propia. */
const SLIDES: Record<string, (p: SlideProps) => React.ReactElement> = {
  'ro-2-diagnostico': Diagnostico,
  'ro-4-porque': PorQueSLA,
  'ro-4-calculadora': CalculadoraSLA,
  'ro-4-valor': ValorLead,
  'ro-4-contacto': Contacto,
  'ro-4-judicial': RamaJudicial,
  'ro-4-velocidades': Velocidades,
  'ro-5-paradoja': Paradoja,
  'ro-5-comprador': Comprador,
  'ro-5-filtros': Filtros,
  'ro-5-salida': CriteriosSalida,
  'ro-5-playbook': Playbook,
  'ro-5-estados': Estados,
  'ro-6-proceso': ProcesoPrimero,
  'ro-6-gobierno': Gobierno,
  'ro-6-indicadores': Indicadores,
  'ro-6-stack': Stack,
  'ro-7-lenguaje': Lenguaje,
  'ro-7-copq': CostoMalaCalidad,
  'ro-7-a3': InformeA3,
  'ro-7-prewiring': PreWiring,
  'ro-7-monroe': Monroe,
  'ro-7-objeciones': Objeciones,
  'ro-7-retroceso': Retroceso,
  'ro-8-silos': Silos,
  'ro-8-capas': Capas,
  'ro-9-necesidad': Necesidad,
  'ro-9-cuadrante': Cuadrante,
  'ro-9-entrevista': Entrevista,
  'ro-10-ciclo': Ciclo,
  'ro-10-metas': Metas,
  'ro-10-diario': Diario,
};

const tramo = (id: string) => {
  const s = guiadoRevops.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 120 };
  return { inicio: s.t, fin: finesRevops[id] ?? s.t + 60 };
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaRevops({ p, isDark }: { p: PaginaRO; isDark: boolean }) {
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
  const marcas = marcasRevops[p.id] ?? [];
  const componente = ESCENAS[p.id];
  const props = { isDark, marcas, pregunta: p.pregunta.texto };
  const total = Math.max(1, Math.ceil((fin - inicio) * FPS));
  const validas = marcas.slice(0, -1).filter((m) => m < 9999);
  const completo = validas.length ? Math.min(total - 1, Math.max(0, Math.round((validas[validas.length - 1] + 2) * FPS))) : 0;
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

export default function ClaseRevOps({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  const p = PAGINAS[slideId];
  if (p && ESCENAS[slideId]) return <PaginaRevops key={slideId} p={p} isDark={isDark} />;
  const Component = SLIDES[slideId];
  if (!Component) {
    return (
      <Shell isDark={isDark} title="RevOps" highlight="Revenue Operations" subtitle="Diapositiva no encontrada.">
        <div />
      </Shell>
    );
  }
  return <Component isDark={isDark} />;
}
