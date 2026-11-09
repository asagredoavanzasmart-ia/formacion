import React from 'react';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import { VC_BASICO, VC_AVANZADO } from './vc/tests';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PAGINAS } from './vc/indice';
import { W, H } from './oceano/escenas/comunOA';
import { PortadaVC } from './vc/escenas/PortadaVC';
import { EvolucionVC } from './vc/escenas/EvolucionVC';
import { IntroVC } from './vc/escenas/IntroVC';
import { EstrategiaVC } from './vc/escenas/EstrategiaVC';
import { VendedoresVC } from './vc/escenas/VendedoresVC';
import { PilaresVC } from './vc/escenas/PilaresVC';
import { RolesVC } from './vc/escenas/RolesVC';
import { EconomicoVC } from './vc/escenas/EconomicoVC';
import { TecnicoVC } from './vc/escenas/TecnicoVC';
import { PerfilesVC } from './vc/escenas/PerfilesVC';
import { PreguntasVC } from './vc/escenas/PreguntasVC';
import { AterrizajeVC } from './vc/escenas/AterrizajeVC';
import { IcpVC } from './vc/escenas/IcpVC';
import { IcpToolVC } from './vc/escenas/IcpToolVC';
import { OfertaVC } from './vc/escenas/OfertaVC';
import { ConstructorOfertaVC } from './vc/escenas/ConstructorOfertaVC';
import { BanderasVC } from './vc/escenas/BanderasVC';
import { SuperarVC } from './vc/escenas/SuperarVC';
import { ReceptividadVC } from './vc/escenas/ReceptividadVC';
import { ModosVC } from './vc/escenas/ModosVC';
import { CicloVC } from './vc/escenas/CicloVC';
import { FlujosVC } from './vc/escenas/FlujosVC';
import { CrmVC } from './vc/escenas/CrmVC';
import { ProcesosVC } from './vc/escenas/ProcesosVC';
import { ListaVC } from './vc/escenas/ListaVC';
import type { PaginaVC } from './vc/paginas1';
import { guiadoVC, marcasVC, finesVC } from '../data/guiadoVC';

/**
 * Clase «Ventas complejas» (copia guiada de Ventas B2B). Cada página tiene su escena propia de Remotion que avanza con
 * el audio (datos en ./vc/paginas*.ts, tiempos en guiadoVC.ts, generados por scripts/generar-guiado-vc.cjs).
 */

const FPS = 30;

const tramo = (id: string) => {
  const s = guiadoVC.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesVC[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'vc-portada': PortadaVC,
  'vc-evolucion': EvolucionVC,
  'vc-intro': IntroVC,
  'vc-estrategia': EstrategiaVC,
  'vc-vendedores': VendedoresVC,
  'vc-pilares': PilaresVC,
  'vc-roles': RolesVC,
  'vc-economico': EconomicoVC,
  'vc-tecnico': TecnicoVC,
  'vc-perfiles': PerfilesVC,
  'vc-preguntas': PreguntasVC,
  'vc-aterrizaje': AterrizajeVC,
  'vc-icp': IcpVC,
  'vc-icp-tool': IcpToolVC,
  'vc-oferta': OfertaVC,
  'vc-constructor-oferta': ConstructorOfertaVC,
  'vc-banderas': BanderasVC,
  'vc-superar': SuperarVC,
  'vc-receptividad': ReceptividadVC,
  'vc-modos': ModosVC,
  'vc-ciclo': CicloVC,
  'vc-flujos': FlujosVC,
  'vc-crm': CrmVC,
  'vc-procesos': ProcesosVC,
  'vc-lista': ListaVC,
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaVCV({ p, isDark }: { p: PaginaVC; isDark: boolean }) {
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
  const marcas = marcasVC[p.id] ?? [];
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

export default function ClaseVC({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'vc-test-basico') return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre las ideas centrales de la venta compleja. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={VC_BASICO} />
    </Shell>
  );
  if (slideId === 'vc-test-avanzado') return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez situaciones reales: qué hacer con cada comprador, cada bloqueo y cada parada del recorrido.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={VC_AVANZADO} />
    </Shell>
  );
  const p = PAGINAS[slideId];
  return p ? <PaginaVCV key={slideId} p={p} isDark={isDark} /> : null;
}
