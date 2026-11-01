import type { PaginaRO } from './tipos';

/* «RevOps», lecciones 1 a 3: bienvenida, introducción y flywheel. Las `frases` son anclas literales de la
   narración (guiones/revops_narracion.txt), en orden; cada escena las nombra en el mismo orden. */

export const portada: PaginaRO = {
  id: 'ro-1-portada', pagina: 2, audio: 'x01',
  titulo: 'RevOps:', destaque: 'operaciones de ingresos',
  bajada: 'Las personas, procesos, sistemas y datos que controlan cómo una empresa genera ingresos.',
  inicio: '',
  frases: ['marketing ventas y servicio', 'ventas y servicio', 'servicio al cliente', 'viaja una partícula', 'mismo núcleo de información', 'la definición que guía', 'las personas', 'los procesos', 'los sistemas', 'y los datos', 'genera ingresos', 'tener más herramientas', 'crezca más rápido', 'lo que crece su costo', 'se puso de moda', 'tres cosas a la vez', 'los clientes esperan', 'conectados entre sí', 'más datos que nunca', 'repartidos entre muchos sistemas'],
  els: [],
  tarjetas: [
    { rotulo: 'Qué es RevOps', texto: 'Las personas, los procesos, los sistemas y los datos que controlan cómo una empresa genera ingresos.', frase: 'la definición que guía', destacada: true },
    { rotulo: 'El objetivo', texto: 'No más herramientas ni más reportes: que el negocio crezca más rápido de lo que crece su costo.', frase: 'tener más herramientas' },
    { rotulo: 'Por qué ahora', texto: 'Clientes que esperan más y están conectados, y datos repartidos entre muchos sistemas y equipos.', frase: 'tres cosas a la vez' },
  ],
  pregunta: { frase: 'si hoy alguien te preguntara', texto: 'Si hoy alguien te preguntara quién es responsable del recorrido completo del cliente en tu empresa, ¿qué nombre darías?' },
};

export const definicion: PaginaRO = {
  id: 'ro-1-definicion', pagina: 3, audio: 'p03', cortes: [[2.05, 1e9]],
  titulo: 'Qué es', destaque: 'Revenue Operations',
  bajada: 'Cuatro componentes: personas, procesos, sistemas y datos. Toda empresa que vende ya tiene RevOps.',
  inicio: '',
  frases: ['cuatro bloques en fila', 'personas procesos sistemas y datos', 'se eleva', 'en personas', 'ingresos recurrentes', 'debería asumirlo igual', 'trabajar aislado', 'en procesos', 'cotizar no es', 'y enviarla', 'dos maneras distintas', 'en sistemas', 'aplicación favorita', 'su planilla', 'en datos', 'genera datos', 'toda empresa ya', 'bien o mal', 'áreas tradicionales', 'un solo pedazo', 'forma uniforme'],
  els: [],
  tarjetas: [
    { rotulo: 'Personas y procesos', texto: 'Nadie aislado del ciclo completo; un mismo trabajo se hace de la misma forma, sea venta nueva o upsell.', frase: 'en personas' },
    { rotulo: 'Sistemas y datos', texto: 'Al crecer, cada uno compra su aplicación; todo lo que hacen los equipos genera datos.', frase: 'en sistemas' },
    { rotulo: 'La diferencia', texto: 'Sales ops, marketing ops y CS ops miran un pedazo; RevOps planifica de forma uniforme y holística.', frase: 'áreas tradicionales', destacada: true },
  ],
  pregunta: { frase: 'de los cuatro componentes', texto: 'De los cuatro componentes, ¿cuál está más desordenado hoy en tu organización?' },
};

export const ruta: PaginaRO = {
  id: 'ro-1-ruta', pagina: 4, audio: 'p04',
  titulo: 'La ruta:', destaque: 'diez lecciones',
  bajada: 'Cada lección deja una pieza de tu estrategia; al final tendrás un plan completo.',
  inicio: '',
  frases: ['10 lecciones', 'un plan propio', 'deja una pieza', 'un plan completo', 'en la lección 1', 'construyes un mapa', 'en la lección 2', 'un diagnóstico de 10 afirmaciones', 'en la lección 3', 'el dibujo de tu flywheel', 'en la lección 4', 'construyes tu sla', 'en la lección 5', 'un proceso de ventas depurado', 'la segunda mitad', 'en la lección 6', 'un diccionario de datos', 'en la lección 7', 'una propuesta para tus líderes', 'en la lección 8', 'tu organigrama actual', 'en la lección 9', 'una pauta de entrevista', 'en la lección 10', 'un plan de cuatro trimestres'],
  els: [],
  tarjetas: [
    { rotulo: 'Primera mitad', texto: 'Mapa de RevOps, diagnóstico de 40 puntos, tu flywheel, tu SLA y un proceso de ventas depurado.', frase: 'en la lección 1' },
    { rotulo: 'Segunda mitad', texto: 'Diccionario de datos, propuesta para tus líderes, organigrama, pauta de entrevista y plan de cuatro trimestres.', frase: 'la segunda mitad' },
    { rotulo: 'El resultado', texto: 'Un plan completo, aplicable a cualquier tamaño de empresa e industria.', frase: 'un plan completo', destacada: true },
  ],
  pregunta: { frase: 'cuál de estas piezas', texto: '¿Cuál de estas piezas te haría más falta mañana mismo en tu trabajo?' },
};

export const escala: PaginaRO = {
  id: 'ro-2-escala', pagina: 6, audio: 'p06',
  titulo: 'Crecer lineal o', destaque: 'crecer a escala',
  bajada: 'Hay escala cuando el negocio crece más rápido que la inversión.',
  inicio: '',
  frases: ['crecer en línea recta', 'crecer a escala', 'más rápido que la inversión', 'más que la plantilla', 'el margen neto', 'la relación ltv cac', 'el gráfico compara', 'la plantilla en gris', 'los ingresos en degradado', 'crecimiento lineal', 'cada cliente nuevo exige', 'en crecimiento a escala', 'se dobla hacia arriba', 'empieza a financiar', 'trato personalizado deja', 'atención uno a uno', 'más ventas exigen más vendedores', 'más soporte', 'consume los recursos', 'la cita de jen spencer', 'abrazar a cada cliente', 'pasa de un gerente a otro', 'se diluye', 'etapa temprana', 'lo que no escala', 'etapa de escala', 'uno a muchos', 'un correo con información'],
  els: [],
  tarjetas: [
    { rotulo: 'Las señales de escala', texto: 'Los ingresos crecen más que la plantilla, mejora el margen neto o mejora la relación LTV:CAC.', frase: 'más rápido que la inversión' },
    { rotulo: 'El límite del uno a uno', texto: 'Si cada cliente recibe atención personal, la única forma de crecer es sumar personas.', frase: 'trato personalizado deja', destacada: true },
    { rotulo: 'Cada etapa, su estrategia', texto: 'Temprano, hacer lo que no escala; al escalar, formas uno a muchos que igual aporten valor.', frase: 'etapa temprana' },
  ],
  pregunta: { frase: 'qué crece hoy más rápido', texto: 'En tu empresa, ¿qué crece hoy más rápido, los ingresos o la cantidad de personas necesarias para generarlos?' },
};

export const empezar: PaginaRO = {
  id: 'ro-2-empezar', pagina: 8, audio: 'p08',
  titulo: 'Por dónde empezar:', destaque: 'los datos que ya tienes',
  bajada: 'No empieces cambiando procesos: mira los datos que existen y cómo se generan.',
  inicio: '',
  frases: ['los datos que ya tienes', 'no empieces cambiando procesos', 'mirando los datos que existen', 'cuatro plataformas ascendentes', 'una partícula recorre', 'el primero instrumentar', 'prioridad número uno', 'capturar todo', 'greg keshian', 'medirlo todo', 'una vista consolidada del cliente', 'de dónde viene', 'el segundo entender antes de cambiar', 'stephen covey', 'la base de cuentas', 'quién ingresa datos', 'qué está duplicado', 'qué está limpio', 'sandy robinson', 'base desordenada', 'el tercero dar consistencia', 'las métricas de la venta nueva', 'las de después', 'se incorporaron bien', 'un primer uso exitoso', 'renovaron y ampliaron', 'las mismas definiciones', 'el cuarto mirar desde el cliente', 'qué intenta lograr el cliente', 'en un taller', 'malas personas', 'cada una a su manera'],
  els: [],
  tarjetas: [
    { rotulo: 'Instrumentar', texto: 'Si no hay infraestructura para recolectar datos, esa es la prioridad uno: medirlo todo, de forma consistente.', frase: 'el primero instrumentar' },
    { rotulo: 'Entender y dar consistencia', texto: 'Antes de tocar nada, entender la base de cuentas; luego, mismas definiciones antes y después de la venta.', frase: 'el segundo entender antes de cambiar' },
    { rotulo: 'Mirar desde el cliente', texto: 'Las ineficiencias no vienen de malas personas: vienen de áreas que ayudan al cliente cada una a su manera.', frase: 'el cuarto mirar desde el cliente', destacada: true },
  ],
  pregunta: { frase: 'qué dato sobre tus clientes', texto: '¿Qué dato sobre tus clientes no existe hoy en ningún sistema, y debería existir?' },
};

export const velocidad: PaginaRO = {
  id: 'ro-2-velocidad', pagina: 9, audio: 'p09',
  titulo: 'Velocidad,', destaque: 'no rapidez',
  bajada: 'Rapidez mide qué tan rápido vas; velocidad, cuánto tardas en llegar a destino.',
  inicio: '',
  frases: ['rapidez mide', 'velocidad mide', 'aumentar la velocidad', 'dos estados', 'cada equipo a su ritmo', 'direcciones distintas', 'meta de ingresos', 'mismo rumbo', 'se alinean', 'más tracción', 'la bicicleta', 'en primera marcha', 'una marcha más larga', 'la consecuencia', 'más esfuerzo', 'tras su cuota', 'alguien con perspectiva', 'más lento', 'el error clásico', 'prevención de ventas', 'decía que no', 'la actitud correcta', 'empatía y curiosidad', 'también son clientes'],
  els: [],
  tarjetas: [
    { rotulo: 'La bicicleta', texto: 'En primera das muchas vueltas y avanzas poco; en una marcha larga, menos vueltas y más tracción.', frase: 'la bicicleta' },
    { rotulo: 'La consecuencia', texto: 'No hace falta más esfuerzo: hace falta alguien con perspectiva que logre que todos tiren hacia el mismo lado.', frase: 'la consecuencia', destacada: true },
    { rotulo: 'La actitud correcta', texto: 'Ni «departamento de prevención de ventas» ni un no por defecto: empatía y curiosidad por cada escritorio.', frase: 'el error clásico' },
  ],
  pregunta: { frase: 'qué equipo de tu empresa corre', texto: '¿Qué equipo de tu empresa corre más rápido hoy, y hacia dónde?' },
};

export const casos: PaginaRO = {
  id: 'ro-2-casos', pagina: 10, audio: 'p10',
  titulo: 'Crecer sin gastar', destaque: 'un peso más',
  bajada: 'Mejorar una tasa de conversión, con todo lo demás constante, se compone a lo largo del embudo.',
  inicio: '',
  frases: ['se compone a lo largo', 'de cada cien leads', 'en cada etapa que viene', 'ningún presupuesto', 'tres siglas', 'un mql es', 'un sql es', 'un sdr es', 'la junta más frágil', 'cuatro casos reales', 'primer caso toast', 'ross nibur midió', 'solo el orden', 'antes del cambio una vez', 'la tasa de cierre de las oportunidades', 'segundo caso decaimiento', 'por cohortes', 'después del día cuatro', 'insistían hasta', 'la regla nueva fue', 'antes 45', 'la aritmética', 'más ingresos', 'no se trabajó más', 'tercer caso puntos de contacto', 'en cuál salta la tasa', 'el gráfico hace justamente', 'se abandona en el quinto', 'cuarto caso comisiones', 'ventas duplicadas', 'nunca implementaban', 'los datos mostraron el umbral', 'la barra alta son', 'la solución pagar', 'se arregló un incentivo', 'tienen la misma forma', 'alguien midió una junta', 'encontró un umbral', 'cambió una regla', 'ninguno pidió más presupuesto'],
  els: [],
  tarjetas: [
    { rotulo: 'Toast y decaimiento', texto: 'Reordenar los leads duplicó la conversión inbound; soltar los MQL de más de cinco días subió de 33 % a 45 %.', frase: 'primer caso toast' },
    { rotulo: 'Contactos y comisiones', texto: 'Las secuencias se abandonan antes del salto (contacto 15–16); pagar la comisión con el cliente activo.', frase: 'tercer caso puntos de contacto' },
    { rotulo: 'La misma forma', texto: 'Alguien midió una junta que nadie miraba, encontró un umbral y cambió una regla. Sin más presupuesto.', frase: 'tienen la misma forma', destacada: true },
  ],
  pregunta: { frase: 'qué tasa de conversión de tu empresa', texto: '¿Qué tasa de conversión de tu empresa nadie ha medido por cohortes todavía?' },
};

export const flywheel: PaginaRO = {
  id: 'ro-3-flywheel', pagina: 12, audio: 'p12', cortes: [[0, 302.9]],
  titulo: 'Del embudo', destaque: 'al flywheel',
  bajada: 'El embudo tiene un final; el flywheel es un ciclo donde los clientes deleitados atraen a los siguientes.',
  inicio: '',
  frases: ['el embudo tiene un final', 'los clientes salen abajo', 'el flywheel es un ciclo', 'atraen a los siguientes', 'mirar una sola función', 'varios equipos', 'enfoque en silos', 'cada área optimiza', 'nadie mira el recorrido completo', 'dos formas de verlo', 'cinco etapas', 'más angosta que la anterior', 'un prospecto que baja', 'ahí termina', 'cómo razona el embudo', 'el fondo del embudo', 'lo que queda fuera', 'renovaciones recomendaciones y referidos', 'la energía de un cliente feliz', 'se pierde la lealtad', 'enfoque inbound', 'se piensa en un círculo', 'hubspot adaptó', 'con contenido útil', 'los convierten en clientes', 'se lo cuentan a sus colegas', 'boca a boca positivo', 'nunca termina', 'tres flechas', 'el anillo exterior', 'desconocidos que se vuelven prospectos', 'clientes que se vuelven promotores', 'la rueda gana impulso', 'el punto naranja', 'tres preguntas una por fase', 'atraer es traer', 'el sitio web', 'páginas pilares', 'locales físicos', 'interactuar es presentar', 'qué tan fácil es obtener', 'hablar con una persona', 'cuánto tardas en responder', 'deleitar es dar ayuda', 'encuestas de nps', 'los reclamos que recibes', 'emmanuelle skala', 'es un círculo', 'en saas no hay final', 'hay renovaciones', 'quién mira el ciclo completo'],
  els: [],
  tarjetas: [
    { rotulo: 'El embudo', texto: 'Atraer, interactuar, capturar, nutrir y convertir. Lo que pasa después de la compra queda fuera.', frase: 'cinco etapas' },
    { rotulo: 'El flywheel', texto: 'Atraer, interactuar y deleitar giran alrededor del crecimiento; los promotores atraen a nuevos desconocidos.', frase: 'tres flechas', destacada: true },
    { rotulo: 'Las preguntas', texto: 'Qué canales atraen, qué tan fácil es comprar y cuánto tardas en responder, y qué dice el NPS.', frase: 'tres preguntas una por fase' },
  ],
  pregunta: { frase: 'quién en tu empresa es responsable', texto: '¿Quién en tu empresa es responsable de mirar el ciclo completo, de la atracción a la recomendación?' },
};

export const fuerza: PaginaRO = {
  id: 'ro-3-fuerza', pagina: 13, audio: 'p13',
  titulo: 'Fuerza y', destaque: 'fricción',
  bajada: 'La fuerza es en qué inviertes; la fricción es lo que se come esa inversión.',
  inicio: '',
  frases: ['cualquier programa o estrategia', 'todo lo que lo frena', 'en qué inviertes', 'se come esa inversión', 'dos lecturas', 'empujar más fuerte', 'las manchas oscuras', 'gira lenta', 'quitar la fricción no hay roce', 'gira mucho más rápido', 'devyn bellamy', 'un carrusel', 'el niño grande', 'gire mejor', 'un cliente alex', 'fuerza bien aplicada', 'lo cuenta a colegas', 'exponencial', 'fricción sin atender', 'mala experiencia', 'boca a boca negativo', 'cada vez cuesta más', 'la experiencia del cliente es prioridad', 'dónde poner la fuerza', 'la compensación de ventas', 'dentro de los 8 meses', 'devuelve la comisión', 'cobra al cerrar', 'su interés coincide', 'tu ejercicio', 'reasignar recursos'],
  els: [],
  tarjetas: [
    { rotulo: 'Quitar roce rinde más', texto: 'Más fuerza sobre un sistema con fricción rinde poco; menos fricción rinde más que cualquier esfuerzo extra.', frase: 'dos lecturas', destacada: true },
    { rotulo: 'El boca a boca', texto: 'Un cliente feliz acelera el crecimiento; uno con mala experiencia hace que cada venta cueste más.', frase: 'un cliente alex' },
    { rotulo: 'Fuerza en el deleite', texto: 'Si el cliente cancela antes de 8 meses, la comisión vuelve: el interés del vendedor se alinea con el cliente.', frase: 'dónde poner la fuerza' },
  ],
  pregunta: { frase: 'qué incentivo de tu empresa', texto: '¿Qué incentivo de tu empresa empuja hoy a vender a clientes que no van a tener éxito?' },
};

export const friccion: PaginaRO = {
  id: 'ro-3-friccion', pagina: 14, audio: 'p14',
  titulo: 'Dónde está', destaque: 'la fricción',
  bajada: 'Busca los bordes filosos, haz la lista, ordénala y ataca las primeras de inmediato.',
  inicio: '',
  frases: ['los bordes filosos', 'demasiados traspasos', 'haz la lista', 'ordénala', 'ataca las primeras', 'dos frentes', 'cada plataforma es una etapa', 'el pulso rosa', 'el punto naranja', 'yamini rangan', 'en la vive el cliente', 'los formularios web sin respuesta', 'la información difícil de hallar', 'obligar a hablar con alguien', 'los precios altos', 'los cobros sorpresa', 'rompe la confianza', 'los retrasos en la entrega', 'las fallas del producto', 'las esperas largas', 'en la viven tus equipos', 'una fuente de verdad distinta', 'se le pregunta de nuevo', 'los procesos duplicados', 'experiencias distintas', 'la alta rotación', 'regla de prioridad', 'qué tan fácil', 'cuánto impacto', 'lo interno importa igual', 'termina como fricción'],
  els: [],
  tarjetas: [
    { rotulo: 'La vive el cliente', texto: 'Formularios sin respuesta, obligar a hablar, cobros sorpresa, retrasos y esperas largas.', frase: 'en la vive el cliente' },
    { rotulo: 'La viven tus equipos', texto: 'Una verdad distinta por equipo, preguntar de nuevo, procesos duplicados y alta rotación.', frase: 'en la viven tus equipos' },
    { rotulo: 'Regla de prioridad', texto: 'Elige facilidad o impacto y empieza por arriba; lo interno termina como fricción para el cliente.', frase: 'regla de prioridad', destacada: true },
  ],
  pregunta: { frase: 'si tuvieras que elegir una sola fricción', texto: 'Si tuvieras que elegir una sola fricción para eliminar este mes, ¿cuál tendría más impacto en tus clientes?' },
};

export const friccionUtil: PaginaRO = {
  id: 'ro-3-friccion-util', pagina: 15, audio: 'p15',
  titulo: 'Cuando la fricción', destaque: 'suma valor',
  bajada: 'La cantidad de fricción debe calzar con el valor que agrega.',
  inicio: '',
  frases: ['al principio conviene asumir', 'usarla a propósito', 'debe calzar con el valor', 'defensor de por vida', 'efectos secundarios', 'no es un objetivo en sí mismo', 'doug davidoff lo dice', 'toda experiencia de alto valor', 'en un lugar de poco valor', 'no usar una herramienta', 'dos preguntas ordenan', 'cuatro combinaciones', 'elimínala', 'úsala', 'lo ideal', 'cuidado', 'los tres casos son', 'en fechas de inicio', 'los días 1 y 15', 'quiere empezar el 5', 'antes de fin de mes', 'acelera la firma', 'un cirujano', 'en tres semanas', 'en formulario de pasaporte', '17 documentos', 'confirmara al inicio', 'subieron los formularios completados', 'datos bancarios', 'en fricción que se traslada', 'se crea en otro', 'costo y beneficio', 'cómo empezar', 'dibuja tu flywheel', 'elimina primero', 'hay fuerza que resta', 'el objetivo final'],
  els: [],
  tarjetas: [
    { rotulo: 'La matriz', texto: 'Fricción con poco valor: elimínala. Con alto valor: úsala. Sin fricción en lo decisivo: cuidado.', frase: 'dos preguntas ordenan', destacada: true },
    { rotulo: 'Dos casos', texto: 'Arrancar solo el 1 y el 15 acelera la firma; pedir los 17 documentos al inicio sube los formularios completos.', frase: 'en fechas de inicio' },
    { rotulo: 'Cómo empezar', texto: 'Dibuja tu flywheel, lista fuerzas y fricciones y elimina primero las más negativas.', frase: 'cómo empezar' },
  ],
  pregunta: { frase: 'qué paso de tu proceso de venta', texto: '¿Qué paso de tu proceso de venta debería tener más fricción de la que tiene hoy?' },
};

export const mapa: PaginaRO = {
  id: 'ro-3-mapa', pagina: 16, audio: 'p16',
  titulo: 'Un flywheel', destaque: 'de ejemplo',
  bajada: 'Cada fase con su herramienta, su equipo, su métrica y el indicador que alimenta.',
  inicio: '',
  frases: ['una vez mapeado', 'cada fase con su herramienta', 'el equipo que la maneja', 'la métrica que la mide', 'el indicador que alimenta', 'las cifras son ilustrativas', 'al centro gira', 'son cuatro', 'atraer herramienta', 'equipo marketing', 'mql al mes', 'esa tasa es la palanca', 'interactuar herramienta', 'equipo ventas', 'métrica tasa de cierre', 'negocios ganados', 'salen 100 sql', 'uno de cada cuatro', 'la junta entre marketing y ventas', 'deleitar herramienta', 'nps y retención', 'el indicador nps', 'renuevan al año', 'resta el porcentaje de detractores', 'promotores herramienta', 'referidos y reseñas', 'uno de cada cinco', 'la energía que vuelve', 'leído completo', 'un dueño y un número', 'la entrada de la siguiente', 'no tiene métrica'],
  els: [],
  tarjetas: [
    { rotulo: 'Atraer e interactuar', texto: '20.000 visitas al 2 % dan 400 MQL; 100 SQL y uno de cada cuatro cierra: 25 negocios.', frase: 'atraer herramienta' },
    { rotulo: 'Deleitar y promotores', texto: 'NPS 45 y 90 % de renovación; uno de cada cinco clientes nuevos llega recomendado.', frase: 'deleitar herramienta' },
    { rotulo: 'Leído completo', texto: 'Cada fase tiene dueño y número, y el número de una es la entrada de la siguiente.', frase: 'leído completo', destacada: true },
  ],
  pregunta: { frase: 'si pusieras las cifras', texto: 'Si pusieras las cifras de tu empresa en estas cuatro tarjetas, ¿cuál estaría vacía?' },
};
