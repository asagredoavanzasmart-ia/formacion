import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bold, Underline, Highlighter, Eraser, Save, RotateCcw } from 'lucide-react';
import { notasPorDiapositiva } from '../data/notasDocente';
import { presenterBus } from '../lib/presenterBus';

/**
 * Editor del guión del presentador para UNA diapositiva. Reutilizable: lo usa tanto
 * el modal "Guión del presentador" como la ventana de "Modo presentador".
 *
 * - Texto editable (contentEditable) con negrita, subrayado y resaltado en 4 colores.
 * - Guardar persiste TODOS los apuntes en localStorage (se comparten entre ventanas
 *   del mismo origen) y avisa por el canal del presentador para recargar en la otra.
 * - La superficie de escritura es siempre tipo "papel" (fondo claro) para que los
 *   resaltados sean legibles en modo claro y oscuro.
 */

const STORAGE_KEY = 'CLASE_NOTAS_DOCENTE_V1';
const ENDPOINT_GUIONES = `${import.meta.env.BASE_URL}__guiones`;

const HIGHLIGHTS: { name: string; color: string }[] = [
  { name: 'Amarillo', color: '#fde68a' },
  { name: 'Verde', color: '#bbf7d0' },
  { name: 'Azul', color: '#bfdbfe' },
  { name: 'Rosa', color: '#fbcfe8' },
];

function loadNotes(): Record<string, string> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function defaultPlaceholderHTML(slideTitle: string): string {
  return `<p><strong>${slideTitle}</strong></p><p>Aún no hay guión del presentador para esta diapositiva. Escribe aquí tus apuntes y pulsa <strong>Guardar</strong>.</p>`;
}

interface NotasEditorProps {
  slideId: string;
  slideTitle: string;
  isDark: boolean;
  /** Tamaño de letra del área editable. */
  big?: boolean;
}

export default function NotasEditor({ slideId, slideTitle, isDark, big = false }: NotasEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<Record<string, string>>(() => loadNotes());
  const [saved, setSaved] = useState(false);

  const noteFor = (id: string) => notes[id] ?? notasPorDiapositiva[id] ?? '';

  // Trae los guiones guardados en guiones/guiones-editados.json (solo en desarrollo).
  useEffect(() => {
    fetch(ENDPOINT_GUIONES)
      .then((r) => (r.ok ? r.json() : null))
      .then((desdeArchivo: Record<string, string> | null) => {
        if (!desdeArchivo || typeof desdeArchivo !== 'object') return;
        setNotes((prev) => ({ ...prev, ...desdeArchivo }));
        if (editorRef.current && document.activeElement !== editorRef.current && desdeArchivo[slideId]) {
          editorRef.current.innerHTML = desdeArchivo[slideId];
        }
      })
      .catch(() => {
        /* sin servidor de desarrollo: se usa solo localStorage */
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cargar el guion al montar o al cambiar de diapositiva. El editor es "no
  // controlado": solo fijamos su HTML aquí, nunca en cada render.
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = noteFor(slideId) || defaultPlaceholderHTML(slideTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideId]);

  // Si la otra ventana guardó esta misma diapositiva, recargar (salvo que estemos
  // escribiendo en ella ahora mismo).
  useEffect(() => {
    const unsub = presenterBus.subscribe((msg) => {
      if (msg.type === 'notes-saved' && msg.slideId === slideId) {
        const fresh = loadNotes();
        setNotes(fresh);
        if (editorRef.current && document.activeElement !== editorRef.current) {
          editorRef.current.innerHTML = fresh[slideId] ?? notasPorDiapositiva[slideId] ?? defaultPlaceholderHTML(slideTitle);
        }
      }
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideId]);

  const captureCurrent = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setNotes((prev) => ({ ...prev, [slideId]: html }));
      return html;
    }
    return noteFor(slideId);
  };

  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    try {
      document.execCommand(command, false, value);
    } catch {
      /* no soportado */
    }
    captureCurrent();
  };

  const applyHighlight = (color: string) => {
    editorRef.current?.focus();
    try {
      document.execCommand('styleWithCSS', false, 'true');
      if (!document.execCommand('hiliteColor', false, color)) {
        document.execCommand('backColor', false, color);
      }
    } catch {
      /* no soportado */
    }
    captureCurrent();
  };

  const clearFormat = () => {
    editorRef.current?.focus();
    try {
      document.execCommand('styleWithCSS', false, 'true');
      document.execCommand('removeFormat');
    } catch {
      /* no soportado */
    }
    captureCurrent();
  };

  const handleSave = () => {
    const html = captureCurrent();
    const next = { ...notes, [slideId]: html };
    setNotes(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* almacenamiento no disponible */
    }
    fetch(ENDPOINT_GUIONES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slideId, html }),
    }).catch(() => {
      /* sin servidor de desarrollo (p. ej. en la versión publicada): solo queda localStorage */
    });
    presenterBus.post({ type: 'notes-saved', slideId });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRestore = () => {
    const original = notasPorDiapositiva[slideId] ?? '';
    if (editorRef.current) editorRef.current.innerHTML = original || defaultPlaceholderHTML(slideTitle);
    setNotes((prev) => ({ ...prev, [slideId]: original }));
  };

  const toolBtn =
    `w-9 h-9 flex items-center justify-center rounded-lg border transition-colors ${
      isDark ? 'bg-[#2a2a2a] border-[#3a3a3a] text-gray-200 hover:bg-[#3a3a3a]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Barra de herramientas */}
      <div className={`shrink-0 flex flex-wrap items-center gap-2 px-4 py-3 border-b ${isDark ? 'border-[#2a2a2a] bg-[#1b1b1b]' : 'border-gray-100 bg-gray-50'}`}>
        <button type="button" className={toolBtn} title="Negrita" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('bold')}>
          <Bold size={16} />
        </button>
        <button type="button" className={toolBtn} title="Subrayar" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('underline')}>
          <Underline size={16} />
        </button>

        <span className={`w-px h-6 mx-1 ${isDark ? 'bg-[#3a3a3a]' : 'bg-gray-200'}`} />

        <span className={`flex items-center gap-1 text-xs font-bold mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Highlighter size={14} /> Resaltar
        </span>
        {HIGHLIGHTS.map((h) => (
          <button
            key={h.color}
            type="button"
            title={`Resaltar en ${h.name}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyHighlight(h.color)}
            className="w-7 h-7 rounded-lg border border-black/10 shadow-sm transition-transform hover:scale-110"
            style={{ backgroundColor: h.color }}
          />
        ))}

        <span className={`w-px h-6 mx-1 ${isDark ? 'bg-[#3a3a3a]' : 'bg-gray-200'}`} />

        <button type="button" className={toolBtn} title="Quitar formato / resaltado" onMouseDown={(e) => e.preventDefault()} onClick={clearFormat}>
          <Eraser size={16} />
        </button>
      </div>

      {/* Área editable (hoja de apuntes) */}
      <div className={`flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 ${isDark ? 'bg-[#121212]' : 'bg-gray-100'}`}>
        <div
          ref={editorRef}
          className={`notas-editor outline-none rounded-2xl bg-[#fdfdfb] text-gray-800 p-6 md:p-8 min-h-full shadow-inner ${big ? 'text-lg md:text-xl' : ''}`}
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          onInput={captureCurrent}
        />
      </div>

      {/* Pie: acciones */}
      <div className={`shrink-0 flex items-center justify-between gap-3 px-4 py-3 border-t ${isDark ? 'border-[#2a2a2a] bg-[#161616]' : 'border-gray-100 bg-white'}`}>
        <button
          onClick={handleRestore}
          className={`flex items-center gap-2 text-xs md:text-sm font-semibold px-3 py-2 rounded-xl transition-colors ${isDark ? 'text-gray-400 hover:bg-[#2a2a2a]' : 'text-gray-500 hover:bg-gray-100'}`}
          title="Restaurar el guion original de esta diapositiva"
        >
          <RotateCcw size={15} /> Restaurar original
        </button>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {saved && (
              <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-sm font-bold text-emerald-500">
                ✓ Guardado
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-lg shadow-red-500/25 hover:shadow-xl transition-all"
          >
            <Save size={16} /> Guardar
          </button>
        </div>
      </div>

      {/* Estilos del contenido generado por el editor */}
      <style>{`
        .notas-editor { line-height: 1.75; }
        .notas-editor p { margin: 0 0 0.9em; }
        .notas-editor p:last-child { margin-bottom: 0; }
        .notas-editor strong, .notas-editor b { font-weight: 700; color: #111827; }
        .notas-editor u { text-decoration: underline; }
        .notas-editor em, .notas-editor i { font-style: italic; }
        .notas-editor ul { list-style: disc; padding-left: 1.3em; margin: 0 0 0.9em; }
        .notas-editor ol { list-style: decimal; padding-left: 1.3em; margin: 0 0 0.9em; }
        .notas-editor:empty:before { content: 'Escribe aquí tus apuntes…'; color: #9ca3af; }
      `}</style>
    </div>
  );
}
