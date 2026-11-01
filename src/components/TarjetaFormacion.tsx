import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Layers, TrendingUp, Megaphone, Users, Sparkles, GraduationCap } from 'lucide-react';
import type { ClaseCatalogo, ClaseIconKey, Formacion } from '../data/catalogoClases';
import './PortadaRepositorio.css';

const ICONOS_POR_CLAVE: Record<ClaseIconKey, React.ComponentType<{ size?: number }>> = {
  ventas: TrendingUp,
  marketing: Megaphone,
  liderazgo: Users,
  general: Sparkles,
};

interface TarjetaFormacionProps {
  formacion: Formacion;
  /** Las clases que la componen, en orden (parte 1, parte 2…). */
  partes: ClaseCatalogo[];
  slideCountByClassId?: Record<string, number>;
  animationDelay: number;
  onOpen: (classId: string) => void;
}

/** Tarjeta de una formación de varias partes: una sola tarjeta con un acceso por parte. */
export default function TarjetaFormacion({ formacion, partes, slideCountByClassId, animationDelay, onOpen }: TarjetaFormacionProps) {
  const Icono = ICONOS_POR_CLAVE[formacion.iconKey] ?? GraduationCap;

  return (
    <motion.div
      id={`tarjeta-formacion-${formacion.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay, duration: 0.5, ease: 'easeOut' }}
      className="portada-card text-left rounded-3xl p-6 md:p-7 flex flex-col gap-5 min-w-0"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="portada-gradient w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
          <Icono size={26} />
        </div>
        <span className="portada-chip text-xs uppercase tracking-widest rounded-full px-3 py-1 truncate flex items-center gap-1.5">
          <GraduationCap size={14} /> {formacion.category}
        </span>
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <p className="portada-text-muted text-xs uppercase tracking-widest truncate">{formacion.subtitle}</p>
        <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tight">{formacion.title}</h3>
        <p className="portada-text-muted text-sm leading-relaxed portada-clamp-3">{formacion.description}</p>
      </div>

      <div className="mt-auto flex flex-col gap-2.5">
        {partes.map((parte, k) => (
          <button
            key={parte.id}
            type="button"
            id={`btn-abrir-clase-${parte.id}`}
            onClick={() => onOpen(parte.id)}
            className="portada-card-empty group rounded-2xl px-4 py-3 flex items-center gap-3 text-left cursor-pointer min-w-0 transition-transform hover:-translate-y-0.5"
          >
            <span className="portada-gradient w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0">{k + 1}</span>
            <span className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-bold leading-snug [overflow-wrap:anywhere]">{parte.subtitle}</span>
              {slideCountByClassId?.[parte.id] !== undefined && (
                <span className="portada-text-muted text-xs flex items-center gap-1.5 mt-0.5">
                  <Layers size={12} /> {slideCountByClassId[parte.id]} diapositivas
                </span>
              )}
            </span>
            <ArrowRight size={16} style={{ color: 'var(--portada-brand-pink)' }} className="shrink-0 transition-transform group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
