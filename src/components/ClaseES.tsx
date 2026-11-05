import React from 'react';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import { ES_BASICO, ES_AVANZADO } from './es/tests';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PortadaES } from './es/escenas/PortadaES';
import { SamES } from './es/escenas/SamES';
import { ParadojaES } from './es/escenas/ParadojaES';
import { PrioridadES } from './es/escenas/PrioridadES';
import { RuidoES } from './es/escenas/RuidoES';
import { ConcesionesES } from './es/escenas/ConcesionesES';
import { EspacioES } from './es/escenas/EspacioES';
import { EncabezadoES } from './es/escenas/EncabezadoES';
import { SimpleES } from './es/escenas/SimpleES';
import { ActivoES } from './es/escenas/ActivoES';
import { CriteriosES } from './es/escenas/CriteriosES';
import { ObjetivoES } from './es/escenas/ObjetivoES';
import { NoES } from './es/escenas/NoES';
import { RepertorioES } from './es/escenas/RepertorioES';
import { CompromisosES } from './es/escenas/CompromisosES';
import { EditarES } from './es/escenas/EditarES';
import { InformacionES } from './es/escenas/InformacionES';
import { AmortiguarES } from './es/escenas/AmortiguarES';
import { PrevenirES } from './es/escenas/PrevenirES';
import { FacilES } from './es/escenas/FacilES';
import { RestarES } from './es/escenas/RestarES';
import { VictoriasES } from './es/escenas/VictoriasES';
import { RutinasES } from './es/escenas/RutinasES';
import { AhoraES } from './es/escenas/AhoraES';
import { LiderES } from './es/escenas/LiderES';
import { SintesisES } from './es/escenas/SintesisES';
import { PAGINAS } from './es/paginas';
import { W, H } from './oceano/escenas/comunOA';
import type { PaginaES } from './es/paginas';
import { guiadoES, marcasES, finesES } from '../data/guiadoES';

/**
 * Clase «Esencialismo: menos, pero mejor». Cada página tiene su escena propia de Remotion que avanza con el audio
 * (datos en ./es/paginas.ts, tiempos en guiadoES.ts, generados por scripts/generar-guiado-es.cjs). Cierra con dos tests.
 */

const FPS = 30;

const tramo = (id: string) => {
  const s = guiadoES.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesES[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'es-portada': PortadaES,
  'es-sam': SamES,
  'es-paradoja': ParadojaES,
  'es-prioridad': PrioridadES,
  'es-ruido': RuidoES,
  'es-concesiones': ConcesionesES,
  'es-espacio': EspacioES,
  'es-encabezado': EncabezadoES,
  'es-simple': SimpleES,
  'es-activo': ActivoES,
  'es-criterios': CriteriosES,
  'es-objetivo': ObjetivoES,
  'es-no': NoES,
  'es-repertorio': RepertorioES,
  'es-compromisos': CompromisosES,
  'es-editar': EditarES,
  'es-informacion': InformacionES,
  'es-amortiguar': AmortiguarES,
  'es-prevenir': PrevenirES,
  'es-facil': FacilES,
  'es-restar': RestarES,
  'es-victorias': VictoriasES,
  'es-rutinas': RutinasES,
  'es-ahora': AhoraES,
  'es-lider': LiderES,
  'es-sintesis': SintesisES,
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaESV({ p, isDark }: { p: PaginaES; isDark: boolean }) {
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
  const marcas = marcasES[p.id] ?? [];
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

export default function ClaseES({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'es-test-basico') return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre las ideas centrales del esencialismo. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={ES_BASICO} />
    </Shell>
  );
  if (slideId === 'es-test-avanzado') return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez situaciones de equipo: cómo se aplican estas tácticas en el trabajo.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={ES_AVANZADO} />
    </Shell>
  );
  const p = PAGINAS[slideId];
  return p ? <PaginaESV key={slideId} p={p} isDark={isDark} /> : null;
}
