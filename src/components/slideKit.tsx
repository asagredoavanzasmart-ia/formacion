import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';

/** Contexto que provee la URL de audio para la diapositiva activa.
 *  App.tsx lo provee; Shell lo consume si hay URL disponible. */
export const AudioSrcContext = React.createContext<string | undefined>(undefined);

/**
 * Kit visual compartido por las clases (diapositivas de contenido).
 * Mantiene el mismo lenguaje de marca en todas: degradado naranja→rosa,
 * tarjetas redondeadas, soporte de modo oscuro y micro-etiquetas de contexto.
 */

// Superficie de tarjeta: sin contorno visible, separada por sombra (estilo B2B: formas limpias).
export const panelClass = (isDark: boolean) =>
  isDark ? 'bg-[#2a2a2a] border-transparent shadow-lg shadow-black/40' : 'bg-white border-transparent shadow-lg shadow-gray-200/80';
export const textMuted = (isDark: boolean) => (isDark ? 'text-gray-300' : 'text-gray-700');

// Micro-etiqueta de contexto: da marco a un dato suelto sin recargar la diapositiva.
export const microLabel = (isDark: boolean) =>
  `text-[10px] font-black uppercase tracking-[0.15em] ${isDark ? 'text-gray-500' : 'text-gray-400'}`;

// Titular solo texto (sin ícono), por convención de diseño del proyecto.
export function Shell({
  isDark,
  title,
  highlight,
  subtitle,
  children,
}: {
  isDark: boolean;
  title: string;
  highlight?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const audioSrc = React.useContext(AudioSrcContext);

  return (
    <div
      data-shell
      className={`w-full h-full flex flex-col p-6 md:p-10 relative overflow-hidden rounded-3xl shadow-2xl ${
        isDark ? 'bg-[#1e1e1e] border border-[#2a2a2a] shadow-black/60' : 'bg-white border border-gray-100 shadow-gray-300/60'
      }`}
    >
      <div data-adorno className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div data-adorno className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="shrink-0 mb-6 z-10" data-g="titulo">
        <h2 className={`text-2xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title} {highlight && <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{highlight}</span>}
        </h2>
        {subtitle && <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>}
      </div>

      <div className="flex-1 min-h-0 z-10 flex flex-col justify-center">{children}</div>

      {audioSrc && <AudioPlayer src={audioSrc} isDark={isDark} />}
    </div>
  );
}

/* Franja de cierre / insight al pie de una diapositiva (sin contorno). */
export function Footer({ isDark, children, g }: { isDark: boolean; children: React.ReactNode; g?: string }) {
  return (
    <div data-g={g} className={`shrink-0 mt-4 p-3.5 rounded-2xl text-center text-sm md:text-base font-medium ${isDark ? 'bg-white/5 text-gray-300' : 'bg-gradient-to-r from-orange-50 to-rose-50 text-gray-700'}`}>
      {children}
    </div>
  );
}

/* Botón-pastilla de selección (activo con degradado de marca). */
export function Pill({ isDark, on, onClick, children }: { isDark: boolean; on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${on ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30 scale-105' : isDark ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
      {children}
    </button>
  );
}

/* Tarjeta destacada (selección activa o idea principal): degradado suave + sombra. */
export const featuredClass = (isDark: boolean) =>
  isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#3a2418] shadow-lg shadow-black/40' : 'bg-gradient-to-br from-white to-orange-50 shadow-lg shadow-orange-200/60';

/* ------------------------------------------------------------------ */
/* Siglas de roles comerciales                                         */
/* Regla del proyecto: cada vez que una diapositiva muestre una sigla  */
/* (BDR, LGR, SDR, AE, AM, Pre-Sales), debe explicarse en pantalla.    */
/* ------------------------------------------------------------------ */

export type SiglaKey = 'BDR' | 'LGR' | 'SDR' | 'AE' | 'AM' | 'PS';

export const SIGLAS: Record<SiglaKey, { code: string; en: string; es: string }> = {
  BDR: { code: 'BDR', en: 'Business Development Representative', es: 'Representante de desarrollo de negocio' },
  LGR: { code: 'LGR / Lead Gen', en: 'Lead Generation Representative', es: 'Representante de generación de demanda' },
  SDR: { code: 'SDR', en: 'Sales Development Representative', es: 'Representante de desarrollo de ventas' },
  AE: { code: 'AE', en: 'Account Executive', es: 'Ejecutivo de cuentas' },
  AM: { code: 'AM', en: 'Account Manager', es: 'Gerente de cuentas' },
  PS: { code: 'Pre-Sales / PS', en: 'Pre-Sales (Sales) Engineer', es: 'Ingeniero de preventa o de soluciones' },
};

/* Franja al pie que traduce las siglas visibles en la diapositiva. */
export function SiglasBar({ isDark, keys }: { isDark: boolean; keys: SiglaKey[] }) {
  return (
    <div className={`shrink-0 mt-3 px-3 py-2 rounded-2xl flex flex-wrap items-center gap-x-4 gap-y-1 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
      <span className={`${microLabel(isDark)} shrink-0`}>Qué significa cada sigla</span>
      {keys.map((k) => {
        const s = SIGLAS[k];
        return (
          <span key={k} className="text-[11px] leading-tight">
            <span className="font-black text-[#ff851d]">{s.code}</span>
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}> · {s.en} <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>({s.es})</span></span>
          </span>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Test de autoevaluación (reutilizable por cualquier clase)           */
/* ------------------------------------------------------------------ */

export type QuizQ = { q: string; options: string[]; answer: number; why: string };

export function Quiz({ isDark, nivel, questions }: { isDark: boolean; nivel: string; questions: QuizQ[] }) {
  const [i, setI] = React.useState(0);
  const [picked, setPicked] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const q = questions[i];
  const last = i === questions.length - 1;

  // En móvil el test se recorre con scroll: al responder se trae la explicación a la vista y al avanzar se vuelve a la pregunta.
  const raiz = React.useRef<HTMLDivElement>(null);
  const explicacion = React.useRef<HTMLDivElement>(null);
  // Solo en el modo reel: en PC los contenedores tienen overflow oculto y un scroll programático los desplazaría.
  const enReel = () => !!raiz.current?.closest('.reel-lienzo');
  React.useEffect(() => { if (enReel()) raiz.current?.scrollIntoView({ block: 'nearest' }); }, [i]);
  React.useEffect(() => { if (picked !== null && enReel()) explicacion.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [picked]);

  const pick = (k: number) => {
    if (picked !== null) return;
    setPicked(k);
    if (k === q.answer) setScore((s) => s + 1);
  };
  const next = () => { if (last) setDone(true); else { setI(i + 1); setPicked(null); } };
  const reset = () => { setI(0); setPicked(null); setScore(0); setDone(false); };

  const pct = Math.round((score / questions.length) * 100);
  const veredicto = pct >= 80 ? 'Dominas el tema: puedes explicárselo a alguien más.' : pct >= 50 ? 'Buena base. Vuelve a las diapositivas de los puntos que fallaste.' : 'Conviene repasar la clase completa antes de seguir.';

  if (done) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-4">
        <p className={microLabel(isDark)}>{nivel} · resultado</p>
        <div className="relative">
          <svg viewBox="0 0 120 120" className="w-40 h-40" aria-label={`Puntaje ${score} de ${questions.length}`}>
            <circle cx="60" cy="60" r="52" fill="none" strokeWidth="14" className={isDark ? 'stroke-white/10' : 'stroke-gray-200'} />
            <motion.circle
              cx="60" cy="60" r="52" fill="none" strokeWidth="14" strokeLinecap="round" stroke="url(#quizgrad)"
              transform="rotate(-90 60 60)" strokeDasharray={2 * Math.PI * 52}
              initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / questions.length) }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="quizgrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff851d" />
                <stop offset="100%" stopColor="#ef375c" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{score}<span className={`text-xl ${textMuted(isDark)}`}>/{questions.length}</span></span>
            <span className="text-sm font-bold text-[#ff851d]">{pct}%</span>
          </div>
        </div>
        <p className={`text-base md:text-lg max-w-xl font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{veredicto}</p>
        <button onClick={reset} className="px-6 py-2.5 rounded-full text-sm font-black bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30">Repetir el test</button>
      </div>
    );
  }

  return (
    <div ref={raiz} className="h-full flex flex-col justify-center gap-3 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3">
        <span className={microLabel(isDark)}>{nivel}</span>
        <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c]" animate={{ width: `${((i + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
        <span className={`text-xs font-bold shrink-0 ${textMuted(isDark)}`}>{i + 1} / {questions.length} · {score} correctas</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="flex flex-col gap-2.5">
          <h3 className={`text-lg md:text-2xl font-black leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>{q.q}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, k) => {
              const isAnswer = k === q.answer;
              const chosen = picked === k;
              const state = picked === null ? 'idle' : isAnswer ? 'ok' : chosen ? 'bad' : 'off';
              return (
                <button
                  key={opt}
                  onClick={() => pick(k)}
                  className={`text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all flex items-start gap-2.5 ${
                    state === 'ok' ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30'
                    : state === 'bad' ? (isDark ? 'bg-[#3a2024] text-gray-300' : 'bg-rose-100 text-gray-700')
                    : state === 'off' ? (isDark ? 'bg-[#232323] text-gray-500' : 'bg-gray-50 text-gray-400')
                    : (isDark ? 'bg-[#2a2a2a] text-gray-200 hover:bg-[#333]' : 'bg-white shadow-md shadow-gray-200/70 text-gray-700 hover:shadow-lg')
                  }`}
                >
                  <span className={`shrink-0 w-5 h-5 rounded-lg text-[11px] font-black flex items-center justify-center mt-0.5 ${state === 'ok' ? 'bg-white/25 text-white' : isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>{'ABCD'[k]}</span>
                  <span className="leading-snug">{opt}</span>
                  {state === 'ok' && <CheckCircle2 size={16} className="shrink-0 ml-auto mt-0.5" />}
                  {state === 'bad' && <XCircle size={16} className="shrink-0 ml-auto mt-0.5 text-[#ef375c]" />}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <motion.div ref={explicacion} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`scroll-mb-24 p-3 rounded-2xl flex items-start justify-between gap-4 ${picked === q.answer ? (isDark ? 'bg-[#2a2418]' : 'bg-orange-50') : (isDark ? 'bg-[#2a1a1e]' : 'bg-rose-50')}`}>
              <span>
                <span className={`${microLabel(isDark)} block`}>{picked === q.answer ? 'Correcto' : 'Repasa esto'}</span>
                <span className={`text-sm leading-snug ${textMuted(isDark)}`}>{q.why}</span>
              </span>
              <button onClick={next} className="shrink-0 self-center px-4 py-2 rounded-full text-sm font-black bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/30">
                {last ? 'Ver resultado' : 'Siguiente'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
