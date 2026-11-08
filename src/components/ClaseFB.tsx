import React from 'react';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import { FB_BASICO, FB_AVANZADO } from './fb/tests';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PortadaFB } from './fb/escenas/PortadaFB';
import { CallarFB } from './fb/escenas/CallarFB';
import { TiposFB } from './fb/escenas/TiposFB';
import { AmenazaFB } from './fb/escenas/AmenazaFB';
import { NovatosFB } from './fb/escenas/NovatosFB';
import { CuandoFB } from './fb/escenas/CuandoFB';
import { EncuadreFB } from './fb/escenas/EncuadreFB';
import { RedFB } from './fb/escenas/RedFB';
import { AbrirFB } from './fb/escenas/AbrirFB';
import { PlanFB } from './fb/escenas/PlanFB';
import { EspiralFB } from './fb/escenas/EspiralFB';
import { DefensivaFB } from './fb/escenas/DefensivaFB';
import { EstrellaFB } from './fb/escenas/EstrellaFB';
import { ArribaFB } from './fb/escenas/ArribaFB';
import { ReconocerFB } from './fb/escenas/ReconocerFB';
import { RecibirFB } from './fb/escenas/RecibirFB';
import { VerdadFB } from './fb/escenas/VerdadFB';
import { RelacionFB } from './fb/escenas/RelacionFB';
import { IdentidadFB } from './fb/escenas/IdentidadFB';
import { ConversarFB } from './fb/escenas/ConversarFB';
import { EquipoFB } from './fb/escenas/EquipoFB';
import { SintesisFB } from './fb/escenas/SintesisFB';
import { PAGINAS } from './fb/paginas';
import { W, H } from './oceano/escenas/comunOA';
import type { PaginaFB } from './fb/paginas';
import { guiadoFB, marcasFB, finesFB } from '../data/guiadoFB';

/**
 * Clase «Feedback en equipos: dar y recibir». Cada página tiene su escena propia de Remotion que avanza con el audio
 * (datos en ./fb/paginas.ts, tiempos en guiadoFB.ts, generados por scripts/generar-guiado-fb.cjs). Cierra con dos tests.
 */

const FPS = 30;

const tramo = (id: string) => {
  const s = guiadoFB.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesFB[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'fb-portada': PortadaFB,
  'fb-callar': CallarFB,
  'fb-tipos': TiposFB,
  'fb-amenaza': AmenazaFB,
  'fb-novatos': NovatosFB,
  'fb-cuando': CuandoFB,
  'fb-encuadre': EncuadreFB,
  'fb-red': RedFB,
  'fb-abrir': AbrirFB,
  'fb-plan': PlanFB,
  'fb-espiral': EspiralFB,
  'fb-defensiva': DefensivaFB,
  'fb-estrella': EstrellaFB,
  'fb-arriba': ArribaFB,
  'fb-reconocer': ReconocerFB,
  'fb-recibir': RecibirFB,
  'fb-verdad': VerdadFB,
  'fb-relacion': RelacionFB,
  'fb-identidad': IdentidadFB,
  'fb-conversar': ConversarFB,
  'fb-equipo': EquipoFB,
  'fb-sintesis': SintesisFB,
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaFBV({ p, isDark }: { p: PaginaFB; isDark: boolean }) {
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
  const marcas = marcasFB[p.id] ?? [];
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

export default function ClaseFB({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'fb-test-basico') return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre las ideas centrales para dar y recibir feedback. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={FB_BASICO} />
    </Shell>
  );
  if (slideId === 'fb-test-avanzado') return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez situaciones de ventas y operaciones: cómo se aplican estas tácticas en el equipo.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={FB_AVANZADO} />
    </Shell>
  );
  const p = PAGINAS[slideId];
  return p ? <PaginaFBV key={slideId} p={p} isDark={isDark} /> : null;
}
