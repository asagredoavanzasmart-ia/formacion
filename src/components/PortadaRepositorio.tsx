import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Plus } from 'lucide-react';
import { formaciones } from '../data/catalogoClases';
import type { ClaseCatalogo, Formacion } from '../data/catalogoClases';
import TarjetaClase from './TarjetaClase';
import TarjetaFormacion from './TarjetaFormacion';
import './PortadaRepositorio.css';

interface PortadaRepositorioProps {
  isDark: boolean;
  logoSrc: string;
  catalog: readonly ClaseCatalogo[];
  /** Diapositivas por clase (clave = id de clase). Opcional. */
  slideCountByClassId?: Record<string, number>;
  onToggleTheme: () => void;
  onOpenClass: (classId: string) => void;
}

/** Portada del repositorio: punto de entrada previo a cualquier clase. */
export default function PortadaRepositorio({
  isDark,
  logoSrc,
  catalog,
  slideCountByClassId,
  onToggleTheme,
  onOpenClass,
}: PortadaRepositorioProps) {
  const hasClasses = catalog.length > 0;

  // Las clases que pertenecen a una formación se reúnen en una sola tarjeta, en el lugar de su primera parte.
  type Item = { tipo: 'clase'; clase: ClaseCatalogo } | { tipo: 'formacion'; formacion: Formacion; partes: ClaseCatalogo[] };
  const tarjetas: Item[] = [];
  for (const clase of catalog) {
    const f = clase.formacion ? formaciones.find((x) => x.id === clase.formacion) : undefined;
    if (!f) { tarjetas.push({ tipo: 'clase', clase }); continue; }
    if (tarjetas.some((t) => t.tipo === 'formacion' && t.formacion.id === f.id)) continue;
    tarjetas.push({ tipo: 'formacion', formacion: f, partes: catalog.filter((c) => c.formacion === f.id) });
  }

  return (
    <div className="portada-root relative h-screen w-screen overflow-y-auto overflow-x-hidden">
      <div className="portada-blob portada-gradient w-96 h-96 -top-32 -left-24" aria-hidden="true" />
      <div className="portada-blob portada-gradient w-80 h-80 top-1/2 -right-24" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-10 py-6 md:py-10 flex flex-col min-h-full">
        <header className="flex items-center justify-between gap-4">
          <img src={logoSrc} alt="Logo Avanza Smart" className="h-7 md:h-9 object-contain" />
          <button
            type="button"
            id="btn-cambiar-tema"
            onClick={onToggleTheme}
            className="portada-icon-button p-2.5 rounded-full shadow-md"
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <motion.section
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-10 md:py-16"
        >
          <p className="portada-text-muted text-xs md:text-sm uppercase tracking-[0.25em] mb-4">
            Repositorio de diapositivas
          </p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter mb-5">
            Biblioteca de <span className="portada-gradient-text">clases</span>
          </h1>
          <p className="portada-text-muted text-base md:text-xl max-w-2xl mx-auto">
            Elige una temática para abrir su presentación.
          </p>
          <div className="portada-gradient h-1.5 w-40 mx-auto rounded-full mt-8" />
        </motion.section>

        <main className="pb-10">
          <h2 className="text-xs uppercase tracking-[0.2em] portada-text-muted mb-5">Temáticas disponibles</h2>

          {!hasClasses && (
            <div className="portada-card portada-card-empty rounded-3xl p-10 text-center portada-text-muted">
              Aún no hay clases en el repositorio.
            </div>
          )}

          {hasClasses && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {tarjetas.map((t, index) =>
                t.tipo === 'formacion' ? (
                  <TarjetaFormacion
                    key={t.formacion.id}
                    formacion={t.formacion}
                    partes={t.partes}
                    slideCountByClassId={slideCountByClassId}
                    animationDelay={0.15 + index * 0.1}
                    onOpen={onOpenClass}
                  />
                ) : (
                  <TarjetaClase
                    key={t.clase.id}
                    clase={t.clase}
                    slideCount={slideCountByClassId?.[t.clase.id]}
                    animationDelay={0.15 + index * 0.1}
                    onOpen={onOpenClass}
                  />
                ),
              )}

              <div
                className="portada-card-empty rounded-3xl p-6 md:p-7 flex flex-col items-center justify-center gap-3 text-center portada-text-muted min-h-[14rem]"
                aria-label="Espacio para futuras temáticas"
              >
                <Plus size={28} />
                <p className="text-sm">Próximamente más temáticas</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
