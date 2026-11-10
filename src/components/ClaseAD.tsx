import React from 'react';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PortadaAD } from './ad/escenas/PortadaAD';
import { TresAUnoAD } from './ad/escenas/TresAUnoAD';
import { CommodityAD } from './ad/escenas/CommodityAD';
import { AltoMargenAD } from './ad/escenas/AltoMargenAD';
import { MercadoAD } from './ad/escenas/MercadoAD';
import { NichoAD } from './ad/escenas/NichoAD';
import { PrecioAltoAD } from './ad/escenas/PrecioAltoAD';
import { EcuacionAD } from './ad/escenas/EcuacionAD';
import { VictoriasAD } from './ad/escenas/VictoriasAD';
import { ProblemasAD } from './ad/escenas/ProblemasAD';
import { CuboAD } from './ad/escenas/CuboAD';
import { RecortarAD } from './ad/escenas/RecortarAD';
import { BonosAD } from './ad/escenas/BonosAD';
import { EscasezAD } from './ad/escenas/EscasezAD';
import { GarantiasAD } from './ad/escenas/GarantiasAD';
import { NombreAD } from './ad/escenas/NombreAD';
import { ImanAD } from './ad/escenas/ImanAD';
import { TiposImanAD } from './ad/escenas/TiposImanAD';
import { CalidoAD } from './ad/escenas/CalidoAD';
import { CalidoMetricasAD } from './ad/escenas/CalidoMetricasAD';
import { ContenidoAD } from './ad/escenas/ContenidoAD';
import { FrioAD } from './ad/escenas/FrioAD';
import { AnunciosAD } from './ad/escenas/AnunciosAD';
import { PresupuestoAD } from './ad/escenas/PresupuestoAD';
import { FinanciadaAD } from './ad/escenas/FinanciadaAD';
import { MasAD } from './ad/escenas/MasAD';
import { MejorAD } from './ad/escenas/MejorAD';
import { ReferidosAD } from './ad/escenas/ReferidosAD';
import { AliadosAD } from './ad/escenas/AliadosAD';
import { SintesisAD } from './ad/escenas/SintesisAD';
import { PAGINAS } from './ad/paginas';
import type { PaginaAD } from './ad/paginas';
import { AD_BASICO, AD_AVANZADO } from './ad/tests';
import { W, H } from './oceano/escenas/comunOA';
import { guiadoAD, marcasAD, finesAD } from '../data/guiadoAD';

/**
 * Clase «Ofertas y adquisición» (método de Alex Hormozi). Cada página tiene su escena propia de Remotion que avanza con
 * el audio (datos en ./ad/paginas.ts, tiempos en guiadoAD.ts, generados por scripts/generar-guiado-ad.cjs).
 */

const FPS = 30;

const tramo = (id: string) => {
  const s = guiadoAD.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesAD[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'ad-portada': PortadaAD, 'ad-tres-a-uno': TresAUnoAD, 'ad-commodity': CommodityAD, 'ad-alto-margen': AltoMargenAD, 'ad-mercado': MercadoAD,
  'ad-nicho': NichoAD, 'ad-precio-alto': PrecioAltoAD, 'ad-ecuacion': EcuacionAD, 'ad-victorias': VictoriasAD, 'ad-problemas': ProblemasAD,
  'ad-cubo': CuboAD, 'ad-recortar': RecortarAD, 'ad-bonos': BonosAD, 'ad-escasez': EscasezAD, 'ad-garantias': GarantiasAD, 'ad-nombre': NombreAD,
  'ad-iman': ImanAD, 'ad-tipos-iman': TiposImanAD, 'ad-calido': CalidoAD, 'ad-calido-metricas': CalidoMetricasAD, 'ad-contenido': ContenidoAD,
  'ad-frio': FrioAD, 'ad-anuncios': AnunciosAD, 'ad-presupuesto': PresupuestoAD, 'ad-financiada': FinanciadaAD, 'ad-mas': MasAD, 'ad-mejor': MejorAD,
  'ad-referidos': ReferidosAD, 'ad-aliados': AliadosAD, 'ad-sintesis': SintesisAD,
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaADV({ p, isDark }: { p: PaginaAD; isDark: boolean }) {
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
  const marcas = marcasAD[p.id] ?? [];
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

export default function ClaseAD({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'ad-test-basico') return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre la economía de la adquisición, la oferta y los canales. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={AD_BASICO} />
    </Shell>
  );
  if (slideId === 'ad-test-avanzado') return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez situaciones con números: flujo de caja, precio, garantías, presupuesto y cuellos de botella.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={AD_AVANZADO} />
    </Shell>
  );
  const p = PAGINAS[slideId];
  return p ? <PaginaADV key={slideId} p={p} isDark={isDark} /> : null;
}
