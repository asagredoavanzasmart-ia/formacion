/**
 * Catálogo del repositorio de clases.
 * Capa de DATOS pura: no sabe cómo se dibuja (la UI decide el ícono según `iconKey`).
 * Para sumar una nueva temática, solo se agrega un objeto a `catalogoClases`.
 */

export type ClaseIconKey = 'ventas' | 'marketing' | 'liderazgo' | 'general';

export interface ClaseCatalogo {
  /** Identificador único. Debe coincidir con la clase que App.tsx sabe abrir. */
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Etiqueta de temática (ej: "Ventas", "Marketing"). No es obligatoriamente B2B. */
  category: string;
  iconKey: ClaseIconKey;
  /** Si la clase es parte de una formación de varias partes, el id de esa formación (ver `formaciones`). */
  formacion?: string;
}

/** Formación: agrupa varias clases (sus partes) en una sola tarjeta de la portada. */
export interface Formacion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  iconKey: ClaseIconKey;
}

export const formaciones: readonly Formacion[] = [
  {
    id: 'comunicacion-efectiva',
    title: 'Comunicación efectiva',
    subtitle: 'Formación en dos partes',
    description:
      'Cómo se conversa con el cliente y cómo se conversa dentro de la organización que vende: credibilidad, preguntas, persuasión, historias, silencio, coraje, retroalimentación y conflicto.',
    category: 'Formación',
    iconKey: 'ventas',
  },
];

export const catalogoClases: readonly ClaseCatalogo[
] = [
  {
    id: 'esencialismo',
    title: 'Esencialismo',
    subtitle: 'Menos, pero mejor: tácticas para equipos',
    description:
      'Cómo un equipo distingue lo vital de lo trivial, elimina lo que sobra y ejecuta lo esencial casi sin fricción. Con Greg McKeown («Esencialismo» y «Sin esfuerzo») y Jack Trout y Steve Rivkin («El poder de lo simple»).',
    category: 'Liderazgo',
    iconKey: 'liderazgo',
  },
  {
    id: 'ventas-b2b',
    title: 'Ventas B2B',
    subtitle: 'Formación estratégica',
    description:
      'Roles de compra, ICP + oferta, banderas rojas, modos de respuesta y proceso comercial completo.',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'ventas-complejas',
    title: 'Ventas complejas',
    subtitle: 'Formación estratégica · el grupo que decide',
    description:
      'La propuesta que viaja por cada parada: roles de influencia, ICP y oferta irresistible, banderas rojas, modos de respuesta de Miller y Heiman y el proceso comercial B2B de Michael Pearce.',
    category: 'Ventas',
    iconKey: 'ventas',
  },

  {
    id: 'crm-pymes',
    title: 'CRM en pymes',
    subtitle: 'Los seis errores que lo hacen fracasar',
    description:
      'Por qué tantos CRM fracasan en empresas pequeñas y medianas: tecnología antes que estrategia, expectativas mágicas, procesos malos automatizados, segmentar en vez de personalizar, olvidar a las personas y datos sin propósito. Con Pedro Reinares y Frederick Newell.',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'metodologias-venta',
    title: 'La Ciencia de Vender',
    subtitle: 'Ventas avanzado',
    description:
      'Metodologías, autores y evidencia empírica: la venta como disciplina académica, rigurosa, replicable y revisada por pares (de Dubinsky a Kahneman).',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'arquitectura-equipos',
    title: 'Diseño y Arquitectura de Equipos de Ventas',
    subtitle: 'Aplanamiento, habilitación y agilidad',
    description:
      'Roles comerciales (BDR→AM), aplanamiento y tramo de control (Graicunas), Sales Pods y AI Pods, habilitación con IA, playbooks, stack y agilidad (Scrum).',
    category: 'Liderazgo',
    iconKey: 'liderazgo',
  },
  {
    id: 'meddpicc',
    title: 'MEDDPICC: calificar con rigor',
    subtitle: 'Calificación de oportunidades',
    description:
      'Las ocho letras de MEDDPICC en la práctica: métricas, comprador económico, criterios, procesos, dolor, Champion y competencia; calificar en cada etapa, decir «no» y pronosticar con evidencia.',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'spin-selling',
    title: 'SPIN Selling: preguntar para vender',
    subtitle: 'Neil Rackham · venta consultiva',
    description:
      'La investigación de Huthwaite (35.000 llamadas): avances, necesidades implícitas y explícitas, las preguntas S-P-I-N y cómo planificarlas, apertura, beneficios vs ventajas, prevención de objeciones, la evidencia contra el cierre y cómo evaluar si un método funciona (Motorola, efecto Hawthorne).',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'kahneman',
    title: 'Pensar rápido, pensar despacio',
    subtitle: 'Daniel Kahneman · sesgos y decisiones',
    description:
      'Sistema 1 y Sistema 2, el controlador perezoso, priming, facilidad cognitiva, heurísticas de representatividad, disponibilidad y afecto, efecto halo y WYSIATI; más qué resistió y qué no a la crisis de replicación.',
    category: 'General',
    iconKey: 'general',
  },
  {
    id: 'influencia-persuasion',
    title: 'Influencia y persuasión',
    subtitle: 'Harvard Business Review · ocho autores',
    description:
      'Los cuatro frentes de la influencia, los seis principios de Cialdini, confianza, equipo y red, el carisma que se aprende, empatía, historias que emocionan, el poder de un pósit y cuándo vender con datos o con emociones. Clase guiada con audio y dos tests.',
    category: 'Liderazgo',
    iconKey: 'liderazgo',
  },
  {
    id: 'negociacion',
    title: 'Negociación: el método Harvard',
    subtitle: 'Fisher, Ury & Patton · Getting to Yes',
    description:
      'Los cuatro principios de la negociación según intereses: separar personas del problema, enfocarse en intereses no en posiciones, generar opciones de ganancia mutua y usar criterios objetivos. BATNA, ZOPA, anclas, presión y las trampas más comunes.',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'proteccion-datos',
    title: 'Protección de datos personales',
    subtitle: 'Ley 21.719 · Chile',
    description:
      'Lo que toda empresa de marketing y ventas necesita saber: qué datos requieren consentimiento, cómo pedirlo bien, derechos de los titulares, obligaciones del responsable, brechas de seguridad, la Agencia de Protección de Datos y el régimen de infracciones y multas.',
    category: 'General',
    iconKey: 'general',
  },
  {
    id: 'comunicacion-1',
    title: 'Comunicación efectiva · Parte 1',
    subtitle: 'Vender: la conversación con el cliente',
    description:
      'Primera impresión, credibilidad, preguntas, estilos de decisión del comprador, culturas, principios de influencia, el pitch, historias y conversaciones difíciles con el cliente.',
    category: 'Ventas',
    iconKey: 'ventas',
    formacion: 'comunicacion-efectiva',
  },
  {
    id: 'comunicacion-2',
    title: 'Comunicación efectiva · Parte 2',
    subtitle: 'La organización que vende',
    description:
      'Las palabras del líder y sus cinco palancas, la conversación organizacional, el costo del silencio, el coraje competente, recibir retroalimentación, pedir y dar consejo y anticipar el conflicto en el equipo comercial.',
    category: 'Ventas',
    iconKey: 'ventas',
    formacion: 'comunicacion-efectiva',
  },
  {
    id: 'oceano-azul',
    title: 'Estrategia del océano azul',
    subtitle: 'Kim y Mauborgne · crear mercado sin competencia',
    description:
      'Océanos rojos y azules, innovación en valor, las cuatro acciones, la curva de valor del Cirque du Soleil, las seis preguntas, las cuatro etapas, los no clientes, el caso de la Wii, las críticas al modelo y cómo aplicarlo en tu empresa.',
    category: 'Estrategia',
    iconKey: 'general',
  },
  {
    id: 'lean-startup',
    title: 'El método Lean Startup',
    subtitle: 'Eric Ries · innovar sin despilfarro',
    description:
      'De Toyota a las empresas emergentes: el ciclo crear, medir y aprender, el producto mínimo viable, la contabilidad de la innovación, los diez pivotes, los lotes pequeños, los cinco porqués, los motores de crecimiento y las críticas al método.',
    category: 'Estrategia',
    iconKey: 'general',
  },
  {
    id: 'enamorate-problema',
    title: 'Enamórate del problema, no de la solución',
    subtitle: 'Uri Levine · el método detrás de Waze y Moovit',
    description:
      'El problema como punto de partida, la matriz de mercado y dolor, la travesía de fracasos, la disrupción, trabajar por fases, conseguir y manejar inversionistas, despedir y contratar, el usuario de primera vez, la retención, el precio, el crecimiento, salir al mundo y la salida.',
    category: 'Estrategia',
    iconKey: 'general',
  },
  {
    id: 'challenger',
    title: 'El Vendedor Desafiante (Challenger)',
    subtitle: 'Dixon y Adamson · venta compleja B2B',
    description:
      'Los cinco perfiles de vendedor y por qué el Creador de Relaciones colapsa en la venta compleja; los tres pilares, la enseñanza comercial, la coreografía de seis pasos, SAFE-BOLD y cómo tomar el control del precio. Incluye la crítica académica al estudio.',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'trampas-deseo',
    title: 'Las Trampas del Deseo',
    subtitle: 'Dan Ariely · economía conductual',
    description:
      'Señuelos, anclas, precio cero, normas sociales y de mercado, estados fríos y calientes, autocontrol, propiedad y honestidad. Cada experimento con su estado actual de evidencia, incluida la retractación de 2026 del estudio de fechas límite del MIT.',
    category: 'Ventas',
    iconKey: 'marketing',
  },
  {
    id: 'revops',
    title: 'RevOps',
    subtitle: 'Revenue Operations · operaciones de ingresos',
    description:
      'Diez lecciones para alinear marketing, ventas y servicio: crecer a escala, flywheel con fuerza y fricción, SLA y rama judicial, proceso de ventas, gobierno de datos, cómo convencer a la gerencia, y cómo estructurar, contratar e iterar el equipo.',
    category: 'Liderazgo',
    iconKey: 'liderazgo',
  },
  {
    id: 'compensacion-comercial',
    title: 'Pagar para vender mejor',
    subtitle: 'La evidencia sobre compensación comercial',
    description:
      'Qué dice la investigación sobre comisiones y bonos: cantidad frente a calidad, topes y aceleradores, umbrales, cuotas por territorio, encuadre de pérdida, torneos, refuerzo, metas, rol y entrenamiento. Cada hallazgo con su sello de evidencia y su fuente.',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'sales-enablement',
    title: 'Sales Enablement: el ecosistema de ventas',
    subtitle: 'Cory Bray & Hilmon Sorey',
    description:
      'El ecosistema que conecta a todos los departamentos en torno al prospecto: proceso y metodología, personas de comprador, herramientas y contenido, ICP, negociación, éxito del cliente, talento y gerencia. 25 lecciones + 2 tests.',
    category: 'Ventas',
    iconKey: 'ventas',
  },
];
