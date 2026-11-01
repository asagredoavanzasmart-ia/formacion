import React from 'react';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass } from './slideKit';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PAGINAS } from './equipos/indice';
import { W, H } from './equipos/escenas/kitEQ';
import ClaseArquitecturaEquipos from './ClaseArquitecturaEquipos';
import { IntroEQ } from './equipos/escenas/IntroEQ';
import { CrisisEQ } from './equipos/escenas/CrisisEQ';
import { MotoresEQ } from './equipos/escenas/MotoresEQ';
import { RolesEQ } from './equipos/escenas/RolesEQ';
import { TraspasosEQ } from './equipos/escenas/TraspasosEQ';
import { LineaEQ } from './equipos/escenas/LineaEQ';
import { PiramideEQ } from './equipos/escenas/PiramideEQ';
import { AplanarEQ } from './equipos/escenas/AplanarEQ';
import { GraicunasEQ } from './equipos/escenas/GraicunasEQ';
import { PodsEQ } from './equipos/escenas/PodsEQ';
import { RampaEQ } from './equipos/escenas/RampaEQ';
import { HabilitarEQ } from './equipos/escenas/HabilitarEQ';
import { SimuladorEQ } from './equipos/escenas/SimuladorEQ';
import { SilenciosoEQ } from './equipos/escenas/SilenciosoEQ';
import { StackEQ } from './equipos/escenas/StackEQ';
import { AgileEQ } from './equipos/escenas/AgileEQ';
import { MadurezEQ } from './equipos/escenas/MadurezEQ';
import { CierreEQ } from './equipos/escenas/CierreEQ';
import type { Pagina } from './influencia/tipos';
import { guiadoEquipos, marcasEquipos, finesEquipos } from '../data/guiadoEquipos';

/**
 * Clase guiada «Diseño y arquitectura de equipos de ventas». Cada página narrada tiene su escena propia de
 * Remotion que avanza con el audio (datos en ./equipos/paginas*.ts, tiempos en guiadoEquipos.ts, generados
 * desde el guion alineado con el audio). La portada y los tests siguen en ClaseArquitecturaEquipos.
 */

const FPS = 30;

const tramo = (id: string) => {
  const s = guiadoEquipos.slides.find((x) => x.id === id);
  if (!s) return { inicio: 0, fin: 60 };
  return { inicio: s.t, fin: finesEquipos[id] ?? s.t + 60 };
};

const ESCENAS: Record<string, React.FC<any>> = {
  'eq-intro': IntroEQ,
  'eq-diagnostico': CrisisEQ,
  'eq-inbound-outbound': MotoresEQ,
  'eq-roles': RolesEQ,
  'eq-traspasos': TraspasosEQ,
  'eq-pipeline': LineaEQ,
  'eq-piramide': PiramideEQ,
  'eq-delayering': AplanarEQ,
  'eq-graicunas': GraicunasEQ,
  'eq-pods': PodsEQ,
  'eq-ramp': RampaEQ,
  'eq-enablement': HabilitarEQ,
  'eq-ia-roleplay': SimuladorEQ,
  'eq-silent-manager': SilenciosoEQ,
  'eq-stack': StackEQ,
  'eq-agile': AgileEQ,
  'eq-madurez': MadurezEQ,
  'eq-cierre': CierreEQ,
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaEQ({ p, isDark }: { p: Pagina; isDark: boolean }) {
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
  const marcas = marcasEquipos[p.id] ?? [];
  const componente = ESCENAS[p.id];
  const props = { isDark, marcas, pregunta: p.pregunta.texto };
  const total = Math.max(1, Math.ceil((fin - inicio) * FPS));
  const completo = marcas.length > 1 ? Math.min(total - 1, Math.max(0, Math.round((marcas[marcas.length - 2] + 2) * FPS))) : 0;
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

export default function ClaseEquipos({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  const p = PAGINAS[slideId];
  if (p) return <PaginaEQ key={slideId} p={p} isDark={isDark} />;
  return <ClaseArquitecturaEquipos slideId={slideId} isDark={isDark} />;
}
