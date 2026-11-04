import React from 'react';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass } from './slideKit';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PortadaCP } from './cp/escenas/PortadaCP';
import { TecnologiaCP } from './cp/escenas/TecnologiaCP';
import { EvidenciaCP } from './cp/escenas/EvidenciaCP';
import { PoderCP } from './cp/escenas/PoderCP';
import { ProblemaCP } from './cp/escenas/ProblemaCP';
import { MagiaCP } from './cp/escenas/MagiaCP';
import { RetornoCP } from './cp/escenas/RetornoCP';
import { CaptacionCP } from './cp/escenas/CaptacionCP';
import { PilotoCP } from './cp/escenas/PilotoCP';
import { AutomatizarCP } from './cp/escenas/AutomatizarCP';
import { MapaCP } from './cp/escenas/MapaCP';
import { SegmentarCP } from './cp/escenas/SegmentarCP';
import { PersonalizarCP } from './cp/escenas/PersonalizarCP';
import { PersonasCP } from './cp/escenas/PersonasCP';
import { AdopcionCP } from './cp/escenas/AdopcionCP';
import { DatosCP } from './cp/escenas/DatosCP';
import { PermisoCP } from './cp/escenas/PermisoCP';
import { CanalesCP } from './cp/escenas/CanalesCP';
import { SintesisCP } from './cp/escenas/SintesisCP';
import { PAGINAS } from './cp/paginas';
import { W, H } from './oceano/escenas/comunOA';
import type { PaginaCP } from './cp/paginas';
import { guiadoCP, marcasCP, finesCP } from '../data/guiadoCP';

/**
 * Clase «CRM en pymes: los seis errores». Cada página tiene su escena propia de Remotion que avanza con el audio
 * (datos en ./cp/paginas.ts, tiempos en guiadoCP.ts, generados por scripts/generar-guiado-cp.cjs).
 */

const FPS = 30;

const tramo = (id: string) => {
  const s = guiadoCP.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesCP[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'cp-portada': PortadaCP,
  'cp-tecnologia': TecnologiaCP,
  'cp-evidencia': EvidenciaCP,
  'cp-poder': PoderCP,
  'cp-problema': ProblemaCP,
  'cp-magia': MagiaCP,
  'cp-retorno': RetornoCP,
  'cp-captacion': CaptacionCP,
  'cp-piloto': PilotoCP,
  'cp-automatizar': AutomatizarCP,
  'cp-mapa': MapaCP,
  'cp-segmentar': SegmentarCP,
  'cp-personalizar': PersonalizarCP,
  'cp-personas': PersonasCP,
  'cp-adopcion': AdopcionCP,
  'cp-datos': DatosCP,
  'cp-permiso': PermisoCP,
  'cp-canales': CanalesCP,
  'cp-sintesis': SintesisCP,
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaCPV({ p, isDark }: { p: PaginaCP; isDark: boolean }) {
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
  const marcas = marcasCP[p.id] ?? [];
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

export default function ClaseCP({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  const p = PAGINAS[slideId];
  return p ? <PaginaCPV key={slideId} p={p} isDark={isDark} /> : null;
}
