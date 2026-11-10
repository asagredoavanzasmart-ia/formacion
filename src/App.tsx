import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, HelpCircle, ChevronUp, ChevronDown, Menu, X, ChevronLeft, ChevronRight, Sun, Moon, Maximize, Minimize, Save, LayoutGrid, NotebookPen, Presentation, Smartphone } from 'lucide-react';

import Slide5 from './components/Slide5';
import Slide6 from './components/Slide6';
import Slide7 from './components/Slide7';
import Slide8 from './components/Slide8';
import Slide9 from './components/Slide9';
import Slide10 from './components/Slide10';
import Slide11 from './components/Slide11';
import Slide12 from './components/Slide12';
import Slide13 from './components/Slide13';
import SlideIntroduccion from './components/SlideIntroduccion';
import SlideCargosVsRoles from './components/SlideCargosVsRoles';
import SlideCRMPipeline from './components/SlideCRMPipeline';
import SlideEstrategiaTactica from './components/SlideEstrategiaTactica';
import SlideRolesCompra from './components/SlideRolesCompra';
import SlideICPContent from './components/SlideICPContent';
import SlideICPTool from './components/SlideICPTool';
import SlideIdentificarComprador from './components/SlideIdentificarComprador';
import SlidePilaresEstrategia from './components/SlidePilaresEstrategia';
import SlideWinResults from './components/SlideWinResults';
import SlideWinResultsPerfiles from './components/SlideWinResultsPerfiles';
import SlideCicloVentas from './components/SlideCicloVentas';
import SlideGestionarCompradorTecnico from './components/SlideGestionarCompradorTecnico';
import SlideListaEstrategica from './components/SlideListaEstrategica';
import SlideConstructorCRM from './components/SlideConstructorCRM';
import SlideVentaSimpleVsCompleja from './components/SlideVentaSimpleVsCompleja';
import SlideOfferTool from './components/SlideOfferTool';
import SlideOfferIntro from './components/SlideOfferIntro';
import SlideFlowConstructor from './components/SlideFlowConstructor';
import PortadaRepositorio from './components/PortadaRepositorio';
import ClaseMetodologias from './components/ClaseMetodologias';
import ClaseMeddpicc from './components/ClaseMeddpicc';
import ClaseSpin from './components/ClaseSpin';
import ClaseKahneman from './components/ClaseKahneman';
import ClaseInfluencia from './components/ClaseInfluencia';
import ClaseNegociacion from './components/ClaseNegociacion';
import ClaseProteccion from './components/ClaseProteccion';
import ClaseComunicacion1 from './components/ClaseComunicacion1';
import ClaseComunicacion2 from './components/ClaseComunicacion2';
import ClaseOceano from './components/ClaseOceano';
import ClaseLean from './components/ClaseLean';
import ClaseEP from './components/ClaseEP';
import ClaseVC from './components/ClaseVC';
import ClaseCP from './components/ClaseCP';
import ClaseAD from './components/ClaseAD';
import ClaseES from './components/ClaseES';
import ClaseFB from './components/ClaseFB';
import ClaseEquipos from './components/ClaseEquipos';
import ClaseChallenger from './components/ClaseChallenger';
import ClaseTrampas from './components/ClaseTrampas';
import ClaseCompensacion from './components/ClaseCompensacion';
import ClaseGuiada from './components/ClaseGuiada';
import { guiadoCompensacion } from './data/guiadoCompensacion';
import { guiadoKahneman } from './data/guiadoKahneman';
import { guiadoInfluencia } from './data/guiadoInfluencia';
import { guiadoNegociacion } from './data/guiadoNegociacion';
import { guiadoProteccion } from './data/guiadoProteccion';
import { guiadoComunicacion1 } from './data/guiadoComunicacion1';
import { guiadoComunicacion2 } from './data/guiadoComunicacion2';
import { guiadoOceano } from './data/guiadoOceano';
import { guiadoLean } from './data/guiadoLean';
import { guiadoEP } from './data/guiadoEP';
import { guiadoVC } from './data/guiadoVC';
import { guiadoCP } from './data/guiadoCP';
import { guiadoAD } from './data/guiadoAD';
import { guiadoES } from './data/guiadoES';
import { guiadoFB } from './data/guiadoFB';
import { guiadoEquipos } from './data/guiadoEquipos';
import { guiadoRevops } from './data/guiadoRevops';
import { guiadoMeddpicc } from './data/guiadoMeddpicc';
import { guiadoSpin } from './data/guiadoSpin';
import ClaseRevOps from './components/ClaseRevOps';
import ClaseSalesEnablement from './components/ClaseSalesEnablement';
import { AudioSrcContext } from './components/slideKit';
import { audioBySlide } from './data/audioBySlide';
import { cuesBySlide } from './data/cuesBySlide';
import { GuidedControlContext, GuidedStepContext } from './lib/guided';
import NotasDocente from './components/NotasDocente';
import { catalogoClases } from './data/catalogoClases';
import { initialSlides, slidesByClass, slideCountByClassId } from './data/slidesByClass';
import { presenterBus } from './lib/presenterBus';
import { CompleteICP } from './types';
import logoLight from './Logos/logo horizontal ligth.png';
import logoDark from './Logos/logo horizontal dark.png';



// En el marco vertical se anulan los cortes de escritorio (columnas y anchos en %) para que todo se apile igual en PC y en móvil.
const REEL_CSS = `
.reel-lienzo .lg\\:flex-row, .reel-lienzo .md\\:flex-row { flex-direction: column !important; }
.reel-lienzo [class*="lg:w-"], .reel-lienzo [class*="md:w-"] { width: 100% !important; }
.reel-lienzo [class*="lg:col-span-"], .reel-lienzo [class*="md:col-span-"] { grid-column: 1 / -1 !important; }
.reel-lienzo .h-full { height: auto !important; }
.reel-lienzo :is([class^="h-"], [class*=" h-"]):not(.h-full) > .h-full { height: 100% !important; }
.reel-lienzo .flex-1 { flex: 0 0 auto !important; }
.reel-lienzo .min-h-0 { min-height: 0 !important; }
.reel-lienzo .justify-center { justify-content: flex-start !important; }
.reel-lienzo [class*="max-h-["] { max-height: none !important; }
.reel-lienzo [data-g="titulo"] h2 { font-size: 1.35rem !important; line-height: 1.12 !important; margin-bottom: .35rem !important; }
.reel-lienzo [data-g="titulo"] p { line-height: 1.33 !important; }
.reel-lienzo [data-g="titulo"] { margin-bottom: .9rem !important; padding-right: calc(44px / var(--k, 1)); }
.reel-lienzo [data-shell] { background: transparent !important; box-shadow: none !important; border: none !important; padding: 0 !important; border-radius: 0 !important; overflow: visible !important; }
.reel-lienzo [data-adorno] { display: none !important; }
`;

/**
 * Modo vertical: escala el contenido para que la diapositiva entera quepa en el alto disponible,
 * sin scroll. El ancho de maquetación crece en la misma proporción, así el contenido escalado
 * sigue ocupando todo el ancho. Se recalcula cuando aparece o desaparece un elemento.
 */
function AjustarAlto({ activo, children }: { activo: boolean; children: React.ReactNode }) {
  const caja = useRef<HTMLDivElement>(null);
  const dentro = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useLayoutEffect(() => {
    if (!activo) { setK(1); return; }
    const c = caja.current, d = dentro.current;
    if (!c || !d) return;
    let actual = 1;
    const medir = () => {
      const disponible = c.clientHeight, alto = d.offsetHeight;
      if (!disponible || !alto) return;
      let nuevo = actual;
      // Se desborda: se reduce hasta caber (al ensanchar el contenido, solo puede bajar de alto).
      if (alto * actual > disponible) nuevo = (disponible * 0.99) / alto;
      // Sobra bastante espacio: se agranda con margen, sin pasar del tamaño real.
      else if (actual < 1 && alto * actual < disponible * 0.85) nuevo = Math.min(1, (disponible * 0.95) / alto);
      if (Math.abs(nuevo - actual) > 0.005) { actual = nuevo; setK(nuevo); }
    };
    const ro = new ResizeObserver(medir);
    ro.observe(c); ro.observe(d);
    medir();
    return () => ro.disconnect();
  }, [activo]);
  if (!activo) return <>{children}</>;
  return (
    <div ref={caja} data-ajuste-caja="" style={{ height: '100%', overflow: 'clip', position: 'relative' }}>
      <div ref={dentro} data-ajuste-dentro="" style={{ width: `${100 / k}%`, transform: `scale(${k})`, transformOrigin: 'top left', ['--k' as string]: k }}>{children}</div>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  // null = se muestra la portada del repositorio; con id = se muestra esa clase
  const [activeClassId, setActiveClassId] = useState<string | null>(null);
  const [slidesOrder, setSlidesOrder] = useState(initialSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [guidedStep, setGuidedStep] = useState<string | null>(null);
  useEffect(() => { setGuidedStep(null); }, [currentSlideIndex, activeClassId]);
  const [createdIcps, setCreatedIcps] = useState<CompleteICP[]>([]);
  // En pantallas angostas el menú parte cerrado para no tapar la diapositiva.
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => typeof window === 'undefined' || Math.min(window.innerWidth, window.innerHeight) >= 768);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  // Módulos expandidos para clases con estructura modular (e.g. RevOps)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['ro-header-1', 'se-header-1', 'ep-header-1', 'es-header-1', 'fb-header-1']));
  // Índice fijado por la ventana de presentador: evita reenviar el cambio en bucle.
  const lastRemoteIndex = useRef<number | null>(null);
  
  const [editedTexts, setEditedTexts] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('B2B_EDITED_TEXTS');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 720
  });

  // Manejador de redimensión para el escalado dinámico
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Móvil: pantalla táctil con lado corto menor a 768px (vale en vertical y en horizontal).
  const isMobile = typeof window !== 'undefined'
    && window.matchMedia('(pointer: coarse)').matches
    && Math.min(windowSize.width, windowSize.height) < 768;
  // Disposición compacta: sin pie de navegación y con el menú superpuesto.
  const isCompact = isMobile || windowSize.width < 768;

  const toggleFullscreen = async () => {
    const root = document.documentElement;
    const orientation = screen.orientation as any;
    // iPhone no tiene la API de pantalla completa: se alterna solo la disposición.
    if (!root.requestFullscreen) {
      setIsFullscreen(prev => !prev);
      if (isCompact) setIsSidebarOpen(false);
      return;
    }
    if (!document.fullscreenElement) {
      try {
        await root.requestFullscreen();
        if (isCompact) setIsSidebarOpen(false);
        // En móvil la pantalla completa queda siempre en vertical.
        if (isMobile && orientation?.lock) await orientation.lock('portrait');
      } catch (e) {
        console.log('Pantalla completa u orientación no disponible');
      }
    } else {
      try { orientation?.unlock?.(); } catch (e) { /* sin soporte */ }
      document.exitFullscreen();
    }
  };

  // Deslizar con el dedo para cambiar de diapositiva (solo móvil).
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const blocked = e.touches.length !== 1 || !!target.closest('input, textarea, select, [contenteditable="true"], .react-flow');
    touchStart.current = blocked ? null : { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    setCurrentSlideIndex(prev => Math.min(slidesOrder.length - 1, Math.max(0, prev + (dx < 0 ? 1 : -1))));
  };

  useEffect(() => {
    if (!document.documentElement.requestFullscreen) return;
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // --- Sincronización con la ventana de "Modo presentador" ---
  // Responde al estado que pide la ventana presentador y acepta su navegación.
  useEffect(() => {
    const unsub = presenterBus.subscribe((msg) => {
      if (msg.type === 'request-state') {
        presenterBus.post({ type: 'state', activeClassId, slideIndex: currentSlideIndex, isDark });
      } else if (msg.type === 'navigate') {
        setCurrentSlideIndex((prev) => {
          if (prev === msg.slideIndex) return prev;
          lastRemoteIndex.current = msg.slideIndex;
          return msg.slideIndex;
        });
      }
    });
    return unsub;
  }, [activeClassId, currentSlideIndex, isDark]);

  // Difunde el cambio de diapositiva a la ventana presentador (salvo que el cambio
  // haya venido de ella, para no reenviarlo en bucle).
  useEffect(() => {
    if (lastRemoteIndex.current === currentSlideIndex) {
      lastRemoteIndex.current = null;
      return;
    }
    presenterBus.post({ type: 'navigate', slideIndex: currentSlideIndex });
  }, [currentSlideIndex]);

  // Difunde la clase activa y el tema cuando cambian.
  useEffect(() => {
    presenterBus.post({ type: 'state', activeClassId, slideIndex: currentSlideIndex, isDark });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClassId, isDark]);

  // Auto-expande el módulo padre cuando se navega a una lección en clases modulares
  useEffect(() => {
    if (activeClassId !== 'revops' && activeClassId !== 'sales-enablement') return;
    let parentId: string | null = null;
    for (let i = 0; i < slidesOrder.length; i++) {
      if (slidesOrder[i].level === 1) { parentId = slidesOrder[i].id; }
      else if (i === currentSlideIndex && parentId) {
        setExpandedModules(prev => {
          if (prev.has(parentId!)) return prev;
          const next = new Set(prev);
          next.add(parentId!);
          return next;
        });
        break;
      }
    }
  }, [currentSlideIndex, activeClassId, slidesOrder]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Habilitar la edición por doble clic en todos los elementos de texto de forma global
  useEffect(() => {
    const handleDblClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Lista de etiquetas de texto elegibles
      const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI', 'STRONG', 'EM', 'B', 'I', 'TD', 'TH'];
      
      // Verificar si el elemento es elegible para ser editado
      if (
        !target ||
        !textTags.includes(target.tagName) ||
        target.contentEditable === 'true' ||
        target.closest('[pointer-events="none"]') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.react-flow') ||
        target.closest('.notas-docente-modal')
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const originalHTML = target.innerHTML;
      
      // Intentar obtener el texto de fábrica
      let originalText = target.getAttribute('data-original-text');
      if (!originalText) {
        originalText = target.innerText.trim();
        target.setAttribute('data-original-text', originalText);
      }

      // Hacer editable
      target.contentEditable = 'true';
      target.setAttribute('spellcheck', 'false');

      // Poner el foco en el elemento
      target.focus();
      
      // Seleccionar todo el texto para edición rápida
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      const finishEditing = (save: boolean) => {
        target.contentEditable = 'false';

        if (!save) {
          target.innerHTML = originalHTML; // revertir
        } else {
          const newText = target.innerText.trim();
          if (newText === '') {
            target.innerHTML = originalHTML;
          } else if (newText !== originalText) {
            // Guardar en cambios pendientes
            setPendingChanges(prev => ({
              ...prev,
              [originalText!]: newText
            }));
          }
        }

        // Remover event listeners temporales
        target.removeEventListener('blur', handleBlur);
        target.removeEventListener('keydown', handleKeyDown);
      };

      const handleBlur = () => {
        finishEditing(true);
      };

      const handleKeyDown = (keyEvent: KeyboardEvent) => {
        if (keyEvent.key === 'Enter') {
          // Si es un párrafo largo o descripción (H1-H2 o P), no cancelar el enter a menos que sea una sola línea o se presione Shift
          const singleLineTags = ['SPAN', 'LI', 'STRONG', 'B', 'I', 'TD', 'TH', 'H3', 'H4', 'H5', 'H6'];
          if (singleLineTags.includes(target.tagName) || !keyEvent.shiftKey) {
            keyEvent.preventDefault();
            finishEditing(true);
          }
        } else if (keyEvent.key === 'Escape') {
          keyEvent.preventDefault();
          finishEditing(false);
        }
      };

      target.addEventListener('blur', handleBlur);
      target.addEventListener('keydown', handleKeyDown);
    };

    window.addEventListener('dblclick', handleDblClick);
    return () => {
      window.removeEventListener('dblclick', handleDblClick);
    };
  }, [isDark]);

  // Aplicar las ediciones de texto guardadas en todo el DOM
  useEffect(() => {
    const applySavedTexts = (root: Node) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Text | null;
      while ((node = walker.nextNode() as Text | null)) {
        const textVal = node.nodeValue?.trim();
        if (textVal && editedTexts[textVal]) {
          node.nodeValue = node.nodeValue.replace(textVal, editedTexts[textVal]);
        }
      }
    };

    applySavedTexts(document.body);

    // Observer para elementos dinámicos
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          applySavedTexts(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [editedTexts, currentSlideIndex]);

  const saveChangesToDisk = () => {
    const merged = { ...editedTexts, ...pendingChanges };
    setEditedTexts(merged);
    setPendingChanges({});
    localStorage.setItem('B2B_EDITED_TEXTS', JSON.stringify(merged));
    
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2000);
  };

  const nextSlide = () => {
    if (currentSlideIndex < slidesOrder.length - 1) setCurrentSlideIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(prev => prev - 1);
  };

  // --- Modo reel: contenido en vertical, pantalla completa y navegación hacia abajo con el dedo ---
  const [reel, setReel] = useState(false);
  // Marco vertical 9:16: se diseña en 480×854 y equivale a 1080×1920 al exportar (×2,25); se escala para caber en cualquier pantalla.
  // En móvil el marco llena la pantalla real; en PC se limita a una columna 9:16 (alto completo) centrada.
  const reelAncho = Math.min(windowSize.width, Math.round(windowSize.height * 9 / 16));
  const marco = { ancho: reelAncho, izq: Math.round((windowSize.width - reelAncho) / 2) };
  const reelDir = useRef(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const reelTouch = useRef<{ x: number; y: number } | null>(null);
  const reelBorde = useRef({ arriba: true, abajo: true });
  const reelIr = (delta: number) => {
    const i = currentSlideIndex + delta;
    if (i < 0 || i >= slidesOrder.length) return;
    reelDir.current = delta;
    setCurrentSlideIndex(i);
  };
  const reelAlFinal = (dir: number) => {
    const el = stageRef.current;
    if (!el) return true;
    return dir > 0 ? el.scrollTop + el.clientHeight >= el.scrollHeight - 4 : el.scrollTop <= 2;
  };
  // Pantalla angosta en vertical (teléfono o iframe incrustado): la clase se abre sola en modo reel,
  // para que el contenido se reemplace en vez de desbordarse. Si la persona sale del reel, se respeta hasta girar la pantalla.
  const vertical = windowSize.width < 768 && windowSize.height > windowSize.width;
  const reelRechazado = useRef(false);
  useEffect(() => {
    if (!vertical) { reelRechazado.current = false; return; }
    if (activeClassId && !reel && !reelRechazado.current) { setReel(true); setIsSidebarOpen(false); setIsNotesOpen(false); }
  }, [vertical, activeClassId]);
  const toggleReel = async () => {
    const orientation = screen.orientation as any;
    if (reel) {
      if (vertical) reelRechazado.current = true;
      setReel(false);
      try { orientation?.unlock?.(); } catch (e) { /* sin soporte */ }
      if (document.fullscreenElement) { try { await document.exitFullscreen(); } catch (e) { /* ya salió */ } }
      return;
    }
    setReel(true);
    setIsSidebarOpen(false);
    setIsNotesOpen(false);
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      if (orientation?.lock) await orientation.lock('portrait');
    } catch (e) {
      console.log('Pantalla completa u orientación no disponible');
    }
  };
  const reelTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const bloqueado = e.touches.length !== 1 || !!target.closest('input, textarea, select, [contenteditable="true"], .react-flow, [data-reel-bloqueo]');
    reelTouch.current = bloqueado ? null : { x: e.touches[0].clientX, y: e.touches[0].clientY };
    // Se anota si el gesto empezó en un borde: un deslizamiento que solo hace scroll no debe además cambiar de página.
    reelBorde.current = { arriba: reelAlFinal(-1), abajo: reelAlFinal(1) };
  };
  const reelTouchEnd = (e: React.TouchEvent) => {
    const inicio = reelTouch.current;
    reelTouch.current = null;
    if (!inicio) return;
    const dx = e.changedTouches[0].clientX - inicio.x;
    const dy = e.changedTouches[0].clientY - inicio.y;
    if (Math.abs(dy) < 60 || Math.abs(dy) < Math.abs(dx) * 1.2) return;
    const dir = dy < 0 ? 1 : -1; // deslizar hacia arriba avanza, como en un reel
    if (dir > 0 ? reelBorde.current.abajo : reelBorde.current.arriba) reelIr(dir);
  };
  useEffect(() => { if (reel && stageRef.current) stageRef.current.scrollTop = 0; }, [currentSlideIndex, reel]);
  useEffect(() => {
    if (!reel) return;
    let ultimo = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30 || Date.now() - ultimo < 700) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      if (!reelAlFinal(dir)) return;
      ultimo = Date.now();
      reelIr(dir);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); reelIr(1); }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); reelIr(-1); }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey); };
  });

  // Abre una clase: carga su guion de diapositivas y empieza desde el inicio.
  const openClass = (classId: string) => {
    const slides = slidesByClass[classId] ?? initialSlides;
    setSlidesOrder(slides);
    // Si la clase es modular (empieza con un header de nivel 1), salta al primer slide de nivel 2.
    const firstContentIndex = slides.findIndex((s) => s.level === 2);
    setCurrentSlideIndex(firstContentIndex >= 0 ? firstContentIndex : 0);
    setActiveClassId(classId);
  };

  // Enlace directo a una clase (?clase=<id>): sirve para incrustarla en otra página.
  // Modo fullscreen (?fullscreen=1): oculta el botón de retorno a la portada.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('clase');
    const fullscreen = params.get('fullscreen') === '1';
    if (id && slidesByClass[id]) openClass(id);
    if (fullscreen) setIsFullscreen(true);
  }, []);
  // Abre la ventana de "Modo presentador" en una segunda pantalla.
  const openPresenter = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('present', '1');
    const win = window.open(
      url.toString(),
      'clase-presenter',
      'width=1180,height=800,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes',
    );
    if (win) {
      win.focus();
      // Reenvía el estado por si la ventana aún no se había suscrito al pedirlo.
      window.setTimeout(() => {
        presenterBus.post({ type: 'state', activeClassId, slideIndex: currentSlideIndex, isDark });
      }, 600);
    }
  };

  const moveSlide = (index: number, direction: number) => {
    if (index + direction < 0 || index + direction >= slidesOrder.length) return;
    const newOrder = [...slidesOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + direction];
    newOrder[index + direction] = temp;
    setSlidesOrder(newOrder);
    
    if (currentSlideIndex === index) {
      setCurrentSlideIndex(index + direction);
    } else if (currentSlideIndex === index + direction) {
      setCurrentSlideIndex(index);
    }
  };

  if (!slidesOrder || slidesOrder.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (activeClassId === null) {
    return (
      <PortadaRepositorio
        isDark={isDark}
        logoSrc={isDark ? logoDark : logoLight}
        catalog={catalogoClases}
        slideCountByClassId={slideCountByClassId}
        onToggleTheme={() => setIsDark(prev => !prev)}
        onOpenClass={openClass}
      />
    );
  }

  const currentSlide = slidesOrder[currentSlideIndex] || slidesOrder[0];
  const currentSlideId = currentSlide.id;
  const esTest = /-test-(basico|avanzado)$/.test(currentSlideId);

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-hidden flex ${isDark ? 'bg-[#000000] text-[#f8f9fa]' : 'bg-[#f0f2f5] text-[#111827]'}`}>
      {/* Sidebar - Ocupa altura completa y empuja el contenido */}
      <aside 
        className={`transition-all duration-300 flex flex-col h-dvh border-r shadow-xl overflow-hidden ${isCompact ? 'fixed inset-y-0 left-0 z-[120]' : 'z-50'} ${isDark ? 'bg-[#111111] border-[#2a2a2a]' : 'bg-white border-gray-100'} ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
      >
        <div className="p-5 flex items-center justify-between shrink-0 border-b border-gray-100 dark:border-[#2a2a2a]">
          <div className="px-1">
            <img 
              src={isDark ? logoDark : logoLight} 
              alt="Logo Avanza Smart" 
              className="h-7 object-contain"
            />
          </div>
          <div className="flex items-center gap-1">
            {!isFullscreen && (
              <button
                id="btn-volver-portada"
                onClick={() => setActiveClassId(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
                title="Volver a la portada"
                aria-label="Volver a la portada"
              >
                <LayoutGrid size={16} />
              </button>
            )}
            <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
        
        {/* Lista de diapositivas — con módulos colapsables para clases modulares (ro-*) */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <div className="flex flex-col">
            {(() => {
              const isModular = activeClassId === 'revops' || activeClassId === 'sales-enablement' || activeClassId === 'enamorate-problema' || activeClassId === 'esencialismo' || activeClassId === 'feedback-equipos';
              if (!isModular) {
                // Renderizado plano normal
                return slidesOrder.map((slide, index) => {
                  const isH1 = slide.level === 1;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(index)}
                      className={`flex items-center gap-3 px-5 py-2 text-left transition-all relative ${isH1 ? 'mt-6 mb-1' : 'ml-4'}`}
                      style={{ backgroundColor: currentSlideIndex === index ? (isDark ? 'rgba(255,133,29,0.1)' : '#fff7ed') : 'transparent', borderRadius: '12px', marginRight: '12px' }}
                    >
                      {!isH1 && (
                        <span className="text-[11px] w-5 shrink-0 tabular-nums font-bold" style={{ color: currentSlideIndex === index ? '#ff851d' : (isDark ? 'rgba(255,255,255,0.3)' : '#000000') }}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      )}
                      <span className={`${isH1 ? 'text-[11px] uppercase tracking-[0.1em]' : 'text-[14px]'} font-bold truncate`} style={{ color: currentSlideIndex === index ? '#ef375c' : (isH1 ? (isDark ? '#ffffff' : '#000000') : (isDark ? 'rgba(255,255,255,0.7)' : '#000000')), letterSpacing: isH1 ? '0.05em' : 'normal' }}>
                        {slide.title}
                      </span>
                      {currentSlideIndex === index && (
                        <motion.div layoutId="activePointer" className="absolute left-0 w-1 h-4 bg-gradient-to-b from-[#ff851d] to-[#ef375c] rounded-full" />
                      )}
                    </button>
                  );
                });
              }
              // Renderizado modular con toggles colapsables
              // Pre-calcular qué módulo contiene la lección activa
              let activeModuleId: string | null = null;
              let tmpModId: string | null = null;
              slidesOrder.forEach((s, si) => {
                if (s.level === 1) { tmpModId = s.id; }
                else if (si === currentSlideIndex) { activeModuleId = tmpModId; }
              });

              const items: React.ReactNode[] = [];
              let currentModuleId: string | null = null;
              let lecCountInModule = 0;
              slidesOrder.forEach((slide, index) => {
                if (slide.level === 1) {
                  currentModuleId = slide.id;
                  lecCountInModule = 0;
                  const isExpanded = expandedModules.has(slide.id);
                  const hasActive = activeModuleId === slide.id;
                  items.push(
                    <button key={slide.id} onClick={() => {
                      setExpandedModules(prev => {
                        const next = new Set(prev);
                        if (next.has(slide.id)) next.delete(slide.id); else next.add(slide.id);
                        return next;
                      });
                    }}
                    className="flex items-center justify-between gap-2 px-4 py-2.5 mx-2 mt-4 mb-0.5 rounded-xl text-left transition-all"
                    style={{ backgroundColor: hasActive ? (isDark ? 'rgba(255,133,29,0.08)' : '#fff7ed') : 'transparent' }}
                    >
                      <span className="text-[10.5px] uppercase tracking-[0.08em] font-black" style={{ color: hasActive ? '#ff851d' : (isDark ? 'rgba(255,255,255,0.5)' : '#6b7280') }}>
                        {slide.title}
                      </span>
                      <ChevronRight size={13} className="shrink-0 transition-transform duration-200" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : '#9ca3af', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                    </button>
                  );
                } else {
                  lecCountInModule += 1;
                  const parentModuleExpanded = currentModuleId ? expandedModules.has(currentModuleId) : true;
                  if (!parentModuleExpanded) return;
                  const isActive = currentSlideIndex === index;
                  const lecNum = lecCountInModule;
                  items.push(
                    <button key={slide.id} onClick={() => setCurrentSlideIndex(index)}
                      className="flex items-center gap-3 pl-7 pr-4 py-2 text-left transition-all relative"
                      style={{ backgroundColor: isActive ? (isDark ? 'rgba(255,133,29,0.1)' : '#fff7ed') : 'transparent', borderRadius: '12px', marginLeft: '8px', marginRight: '12px' }}
                    >
                      <span className="text-[11px] w-5 shrink-0 tabular-nums font-bold" style={{ color: isActive ? '#ff851d' : (isDark ? 'rgba(255,255,255,0.25)' : '#d1d5db') }}>
                        {String(lecNum).padStart(2, '0')}
                      </span>
                      <span className="text-[13px] font-semibold truncate leading-tight" style={{ color: isActive ? '#ef375c' : (isDark ? 'rgba(255,255,255,0.65)' : '#374151') }}>
                        {slide.title.replace(/^Lección \d+[-\d]*:\s*/, '')}
                      </span>
                      {isActive && <motion.div layoutId="activePointer" className="absolute left-0 w-1 h-4 bg-gradient-to-b from-[#ff851d] to-[#ef375c] rounded-full" />}
                    </button>
                  );
                }
              });
              return items;
            })()}
          </div>
        </div>

        {/* Acceso al guion del docente (apuntes por diapositiva) */}
        <div className={`shrink-0 p-4 border-t flex flex-col gap-2 ${isDark ? 'border-[#2a2a2a]' : 'border-gray-100'}`}>
          <button
            id="btn-modo-presentador"
            onClick={openPresenter}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-lg shadow-red-500/20 hover:shadow-xl hover:scale-[1.02] transition-all"
            title="Abrir el guion en una segunda pantalla (modo presentador)"
          >
            <Presentation size={16} />
            Modo presentador
          </button>
          <button
            id="btn-guion-docente"
            onClick={() => setIsNotesOpen(true)}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold border transition-all ${
              isDark ? 'border-[#3a3a3a] text-gray-300 hover:bg-[#2a2a2a]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
            title="Ver el guión en esta misma pantalla"
          >
            <NotebookPen size={16} />
            Ver guión aquí
          </button>
        </div>
      </aside>


      {/* Main Content */}
      <div className="flex-1 relative flex flex-col h-dvh overflow-hidden">
        
        {/* 
          Escenario de la Diapositiva:
          Mantiene un ratio FIJO de 16:9.
          Utilizamos un sistema de escalado (transform: scale) para que el contenido
          interno se diseñe sobre una base de 1280x720 y se adapte al espacio disponible.
        */}
        <div
          className="flex-1 flex items-center justify-center p-0 md:p-8 min-h-0 relative"
          onTouchStart={reel ? reelTouchStart : isMobile ? handleTouchStart : undefined}
          onTouchEnd={reel ? reelTouchEnd : isMobile ? handleTouchEnd : undefined}
        >
          
          <div 
            className="relative transition-all duration-500 ease-out w-full h-full flex items-center justify-center p-0"
          >
            {/* 
              Contenedor de Escalado (Capa de Contenido):
              Diseñamos sobre 1280x720 (16:9) y escalamos para llenar el contenedor.
            */}
            <div 
              ref={stageRef}
              className={reel ? 'reel-lienzo' : undefined}
              style={reel ? {
                position: 'fixed',
                left: marco.izq,
                top: 0,
                zIndex: 60,
                width: marco.ancho,
                height: '100dvh',
                // Los tests no se achican para caber: se leen con su letra real y se recorren con scroll.
                overflowY: esTest ? 'auto' : 'hidden',
                overflowX: 'hidden',
                overscrollBehavior: 'contain',
                padding: activeClassId === 'compensacion-comercial' || activeClassId === 'kahneman' || activeClassId === 'influencia-persuasion' || activeClassId === 'negociacion' || activeClassId === 'proteccion-datos' || activeClassId === 'comunicacion-1' || activeClassId === 'comunicacion-2' || activeClassId === 'oceano-azul' || activeClassId === 'lean-startup' || activeClassId === 'enamorate-problema' || activeClassId === 'ventas-complejas' || activeClassId === 'crm-pymes' || activeClassId === 'adquisicion' || activeClassId === 'esencialismo' || activeClassId === 'feedback-equipos' || activeClassId === 'arquitectura-equipos' || activeClassId === 'revops' || activeClassId === 'meddpicc' || activeClassId === 'spin-selling' ? '20px 14px 92px' : '20px 14px 24px',
                boxSizing: 'border-box',
                background: isDark ? '#000' : '#f0f2f5',
                pointerEvents: 'auto'
              } : currentSlideId === 'slide-flow-constructor' ? {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'auto'
              } : {
                width: '1280px',
                height: '720px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${Math.min(
                  (windowSize.width - (isCompact ? 16 : (isSidebarOpen ? 320 : 80))) / 1280,
                  (windowSize.height - (isCompact ? 16 : 120)) / 720
                )})`,
                transformOrigin: 'center center',
                pointerEvents: 'auto'
              }}
            >
              <AjustarAlto activo={reel && !esTest}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideId}
                  initial={reel ? { opacity: 0, y: reelDir.current * 60 } : { opacity: 0 }}
                  animate={reel ? { opacity: 1, y: 0 } : { opacity: 1 }}
                  exit={reel ? { opacity: 0, y: -reelDir.current * 60 } : { opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={reel ? 'w-full' : 'w-full h-full'}
                >
                {/* Renderizado de Slides de Nivel 1 (Encabezados) */}
                {slidesOrder[currentSlideIndex].level === 1 && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-16 rounded-[4rem] border-4 ${isDark ? 'bg-[#111111] border-[#2a2a2a] shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}
                    >
                      <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter flex flex-wrap justify-center gap-x-4">
                        <span className={isDark ? 'text-white/50' : 'text-gray-900'}>
                          {slidesOrder[currentSlideIndex].title.split(' ').slice(0, Math.ceil(slidesOrder[currentSlideIndex].title.split(' ').length / 2)).join(' ')}
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
                          {slidesOrder[currentSlideIndex].title.split(' ').slice(Math.ceil(slidesOrder[currentSlideIndex].title.split(' ').length / 2)).join(' ')}
                        </span>
                      </h1>
                      <div className="h-2 w-48 mx-auto bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full"></div>
                    </motion.div>
                  </div>
                )}

                {currentSlideId === 'slide-0' && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center">
                    <motion.img 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      src={isDark ? logoDark : logoLight} 
                      alt="Logo Avanza Smart" 
                      className="h-20 md:h-24 object-contain mb-8"
                    />
                    <h1 className={`text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      FORMACIÓN ESTRATÉGICA
                    </h1>
                    <h2 className={`text-2xl md:text-4xl font-bold mb-12 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                      Ventas B2B
                    </h2>
                    <div className="h-1.5 w-48 mx-auto bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20"></div>
                  </div>
                )}
                {currentSlideId === 'slide-simple-vs-compleja' && <SlideVentaSimpleVsCompleja isDark={isDark} />}
                {currentSlideId === 'slide-intro' && <SlideIntroduccion isDark={isDark} />}
                {currentSlideId === 'slide-estrategia' && <SlideEstrategiaTactica isDark={isDark} />}
                {currentSlideId === 'slide-comp-vendedores' && <Slide9 isDark={isDark} />}
                {currentSlideId === 'slide-pilares' && <SlidePilaresEstrategia isDark={isDark} />}
                {currentSlideId === 'slide-icp' && <SlideICPContent isDark={isDark} />}
                {currentSlideId === 'slide-icp-tool' && (
                  <SlideICPTool 
                    isDark={isDark} 
                    onIcpCreated={(icp) => setCreatedIcps(prev => [...prev, icp])}
                    savedIcps={createdIcps}
                  />
                )}
                {currentSlideId === 'slide-offer-intro' && <SlideOfferIntro isDark={isDark} />}
                {currentSlideId === 'slide-offer-tool' && <SlideOfferTool isDark={isDark} icps={createdIcps} />}
                {currentSlideId === 'slide-roles' && <SlideRolesCompra isDark={isDark} />}
                {currentSlideId === 'slide-ident-comprador' && <SlideIdentificarComprador isDark={isDark} />}
                {currentSlideId === 'slide-gest-tecnico' && <SlideGestionarCompradorTecnico isDark={isDark} />}
                {currentSlideId === 'slide-win-perfiles' && <SlideWinResultsPerfiles isDark={isDark} />}
                {currentSlideId === 'slide-win-preguntas' && <SlideWinResults isDark={isDark} />}
                {currentSlideId === 'slide-superar' && <Slide5 isDark={isDark} />}
                {currentSlideId === 'slide-receptibilidad' && <Slide7 isDark={isDark} />}
                {currentSlideId === 'slide-modos' && <Slide6 isDark={isDark} />}
                {currentSlideId === 'slide-banderas' && <Slide8 isDark={isDark} />}
                {currentSlideId === 'slide-crm' && <SlideCRMPipeline isDark={isDark} />}
                {currentSlideId === 'slide-constructor-crm' && <SlideConstructorCRM isDark={isDark} />}
                {currentSlideId === 'slide-flow-constructor' && <SlideFlowConstructor isDark={isDark} />}
                {currentSlideId === 'slide-ciclo' && <SlideCicloVentas isDark={isDark} />}
                {currentSlideId === 'slide-lista-estrategica' && <SlideListaEstrategica isDark={isDark} />}
                {currentSlideId === 'slide-aterrizaje' && <Slide10 isDark={isDark} />}

                {/* Clase "La Ciencia de Vender": todas las diapositivas de contenido (mv-*) */}
                {currentSlideId.startsWith('mv-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseMetodologias slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Arquitectura de Equipos de Ventas": diapositivas de contenido (eq-*) */}
                {currentSlideId.startsWith('eq-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseEquipos slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "MEDDPICC: calificar con rigor": diapositivas de contenido (md-*) */}
                {currentSlideId.startsWith('md-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseMeddpicc slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "SPIN Selling": diapositivas de contenido (sp-*) */}
                {currentSlideId.startsWith('sp-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseSpin slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Pensar rápido, pensar despacio": diapositivas de contenido (kn-*) */}
                {currentSlideId.startsWith('kn-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseKahneman slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Influencia y persuasión": diapositivas de contenido (ip-*) */}
                {currentSlideId.startsWith('ip-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseInfluencia slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Negociación: lo esencial de HBR": diapositivas de contenido (ng-*) */}
                {currentSlideId.startsWith('ng-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseNegociacion slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Protección de datos: Ley 21.719": diapositivas de contenido (pd-*) */}
                {currentSlideId.startsWith('pd-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseProteccion slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Formación "Comunicación efectiva", parte 1: diapositivas de contenido (ce1-*) */}
                {currentSlideId.startsWith('ce1-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseComunicacion1 slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Formación "Comunicación efectiva", parte 2: diapositivas de contenido (ce2-*) */}
                {currentSlideId.startsWith('ce2-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseComunicacion2 slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Estrategia del océano azul": diapositivas de contenido (oa-*) */}
                {currentSlideId.startsWith('oa-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseOceano slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "El método Lean Startup": diapositivas de contenido (ls-*) */}
                {currentSlideId.startsWith('ls-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseLean slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Ofertas y adquisición": diapositivas de contenido (ad-*) */}
                {currentSlideId.startsWith('ad-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseAD slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "CRM en pymes": diapositivas de contenido (cp-*) */}
                {currentSlideId.startsWith('cp-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseCP slideId={currentSlideId} isDark={isDark} />
                )}
                {currentSlideId.startsWith('es-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseES slideId={currentSlideId} isDark={isDark} />
                )}
                {currentSlideId.startsWith('fb-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseFB slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Ventas complejas": diapositivas de contenido (vc-*) */}
                {currentSlideId.startsWith('vc-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseVC slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Enamórate del problema": diapositivas de contenido (ep-*) */}
                {currentSlideId.startsWith('ep-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseEP slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "El Vendedor Desafiante": diapositivas de contenido (ch-*) */}
                {currentSlideId.startsWith('ch-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseChallenger slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Las Trampas del Deseo": diapositivas de contenido (td-*) */}
                {currentSlideId.startsWith('td-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseTrampas slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "RevOps": diapositivas de contenido (ro-*) */}
                {currentSlideId.startsWith('ro-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseRevOps slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Pagar para vender mejor": diapositivas de contenido (cc-*) */}
                {currentSlideId.startsWith('cc-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseCompensacion slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Sales Enablement": diapositivas de contenido (se-*) */}
                {currentSlideId.startsWith('se-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <AudioSrcContext.Provider value={audioBySlide[currentSlideId]}>
                    <ClaseSalesEnablement slideId={currentSlideId} isDark={isDark} />
                  </AudioSrcContext.Provider>
                )}

                </motion.div>
              </AnimatePresence>
              </AjustarAlto>
            </div>
          </div>
        </div>

        {reel && (
          <>
            <style>{REEL_CSS}</style>
            {/* Franja superior mínima: solo la barra de avance de la clase. */}
            <div className="fixed z-[130] pointer-events-none" style={{ left: marco.izq, top: 0, width: marco.ancho }}>
              <div className={`h-[3px] ${isDark ? 'bg-white/15' : 'bg-black/10'}`}>
                <div className="h-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] transition-all duration-300" style={{ width: `${((currentSlideIndex + 1) / slidesOrder.length) * 100}%` }} />
              </div>
            </div>
            {/* Salir del modo reel: botón pequeño en la esquina. */}
            <button
              onClick={toggleReel}
              className={`fixed z-[131] p-1.5 rounded-full shadow-md backdrop-blur-md border ${isDark ? 'bg-[#111111]/70 text-white border-[#3a3a3a]' : 'bg-white/80 text-gray-500 border-gray-200'}`}
              style={{ left: marco.izq + marco.ancho - 40, top: 10 }}
              title="Salir del modo reel"
              aria-label="Salir del modo reel"
            >
              <X size={15} />
            </button>
          </>
        )}

        <div className={`fixed top-6 left-6 right-6 z-[100] flex justify-between items-start pointer-events-none ${reel ? 'hidden' : ''}`}>
          <div className="flex items-center gap-4 pointer-events-auto">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border ${isDark ? 'bg-[#111111]/80 backdrop-blur-md text-white border-[#3a3a3a]' : 'bg-white/80 backdrop-blur-md text-[#111827] border-gray-200'} ${isSidebarOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'}`}
            >
              <Menu size={20} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-3 pointer-events-auto">
            <button 
              onClick={toggleFullscreen}
              className="p-2.5 rounded-full shadow-md bg-white hover:bg-gray-50 border border-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110"
              title="Pantalla Completa"
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
            {/* Modo oscuro: alterna el tema de la clase sin salir de la presentación */}
            <button
              onClick={() => setIsDark(prev => !prev)}
              className={`p-2.5 rounded-full shadow-md border transition-all duration-300 hover:scale-110 ${isDark ? 'bg-[#111111] hover:bg-[#1c1c1c] border-[#3a3a3a] text-amber-300' : 'bg-white hover:bg-gray-50 border-gray-100 text-gray-500 hover:text-gray-700'}`}
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
              aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
              id="btn-modo-oscuro"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {/* Modo reel: contenido en vertical, pantalla completa y deslizar hacia arriba para avanzar */}
            <button
              onClick={toggleReel}
              className="p-2.5 rounded-full shadow-md bg-white hover:bg-gray-50 border border-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110"
              title="Modo reel (vertical para móvil)"
              aria-label="Modo reel (vertical para móvil)"
            >
              <Smartphone size={18} />
            </button>
          </div>
        </div>

        {/* Reproducción global de la clase con audio (flecha, resaltado y aparición de elementos) */}
        {(activeClassId === 'compensacion-comercial' || activeClassId === 'kahneman' || activeClassId === 'influencia-persuasion' || activeClassId === 'negociacion' || activeClassId === 'proteccion-datos' || activeClassId === 'comunicacion-1' || activeClassId === 'comunicacion-2' || activeClassId === 'oceano-azul' || activeClassId === 'lean-startup' || activeClassId === 'enamorate-problema' || activeClassId === 'ventas-complejas' || activeClassId === 'crm-pymes' || activeClassId === 'adquisicion' || activeClassId === 'esencialismo' || activeClassId === 'feedback-equipos' || activeClassId === 'arquitectura-equipos' || activeClassId === 'revops' || activeClassId === 'meddpicc' || activeClassId === 'spin-selling') && (
          <ClaseGuiada
            key={activeClassId}
            datos={activeClassId === 'kahneman' ? guiadoKahneman : activeClassId === 'influencia-persuasion' ? guiadoInfluencia : activeClassId === 'negociacion' ? guiadoNegociacion : activeClassId === 'proteccion-datos' ? guiadoProteccion : activeClassId === 'comunicacion-1' ? guiadoComunicacion1 : activeClassId === 'comunicacion-2' ? guiadoComunicacion2 : activeClassId === 'oceano-azul' ? guiadoOceano : activeClassId === 'lean-startup' ? guiadoLean : activeClassId === 'enamorate-problema' ? guiadoEP : activeClassId === 'ventas-complejas' ? guiadoVC : activeClassId === 'crm-pymes' ? guiadoCP : activeClassId === 'adquisicion' ? guiadoAD : activeClassId === 'esencialismo' ? guiadoES : activeClassId === 'feedback-equipos' ? guiadoFB : activeClassId === 'arquitectura-equipos' ? guiadoEquipos : activeClassId === 'revops' ? guiadoRevops : activeClassId === 'meddpicc' ? guiadoMeddpicc : activeClassId === 'spin-selling' ? guiadoSpin : guiadoCompensacion}
            slideActualId={currentSlideId}
            irA={(id) => { const i = slidesOrder.findIndex((s) => s.id === id); if (i >= 0) setCurrentSlideIndex(i); }}
            isDark={isDark}
            compacto={reel ? { izq: marco.izq + 10, ancho: marco.ancho - 20, abajo: 14 } : undefined}
            reel={reel}
            indice={reel ? { actual: currentSlideIndex + 1, total: slidesOrder.length } : undefined}
          />
        )}

        {/* Botones de Navegación Flotantes (Solo en Móvil/Responsive) */}
        <div className={isCompact && !reel ? 'contents' : 'hidden'}>
          <button 
            onClick={prevSlide} 
            disabled={currentSlideIndex === 0}
            className={`fixed left-4 ${windowSize.height > windowSize.width ? 'bottom-5' : 'top-1/2 -translate-y-1/2'} z-[110] p-3 rounded-full shadow-2xl transition-all border ${
              currentSlideIndex === 0 
                ? 'opacity-0 pointer-events-none' 
                : isDark 
                  ? 'bg-[#111111]/90 backdrop-blur-md text-white border-[#3a3a3a]' 
                  : 'bg-white/90 backdrop-blur-md text-[#111827] border-gray-200'
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={nextSlide} 
            disabled={currentSlideIndex === slidesOrder.length - 1}
            className={`fixed right-4 ${windowSize.height > windowSize.width ? 'bottom-5' : 'top-1/2 -translate-y-1/2'} z-[110] p-3 rounded-full shadow-2xl transition-all border ${
              currentSlideIndex === slidesOrder.length - 1
                ? 'opacity-0 pointer-events-none' 
                : 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white border-transparent'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Footer Navigation (sin puntos de avance ni pie en móvil, visible en Desktop) */}
        <div className={`${isCompact || reel ? 'hidden' : 'flex'} h-16 shrink-0 z-40 px-6 items-center justify-between`}>
          <button 
            onClick={prevSlide} 
            disabled={currentSlideIndex === 0}
            className={`group px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-all font-bold text-sm ${
              currentSlideIndex === 0 
                ? 'opacity-0 pointer-events-none' 
                : isDark 
                  ? 'bg-[#181818] text-white border border-[#4a4a4a] hover:bg-[#3a3a3a] shadow-lg' 
                  : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-md font-bold'
            }`}
          >
            <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Anterior
          </button>

          <div className="flex items-center gap-2">
            {slidesOrder.map((slide, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlideIndex(i)}
                className={`transition-all duration-300 ${
                  slide.level === 1 
                    ? currentSlideIndex === i 
                      ? 'w-4 h-4 rounded-md bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-lg' 
                      : `w-3 h-3 rounded-md border-2 ${isDark ? 'border-gray-700 bg-transparent' : 'border-gray-300 bg-transparent'}`
                    : currentSlideIndex === i 
                      ? 'w-8 h-2 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-lg' 
                      : `w-2 h-2 rounded-full ${isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-300 hover:bg-gray-400'}`
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide} 
            disabled={currentSlideIndex === slidesOrder.length - 1}
            className={`group px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-all font-bold text-sm ${
              currentSlideIndex === slidesOrder.length - 1
                ? 'opacity-0 pointer-events-none'
                : 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40'
            }`}
          >
            Siguiente
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Modal flotante con el guion del docente para la diapositiva actual */}
      <NotasDocente
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        slideId={currentSlideId}
        slideTitle={currentSlide.title}
        isDark={isDark}
      />

    </div>
  );
}
