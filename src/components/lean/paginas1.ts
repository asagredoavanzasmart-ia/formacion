import type { Pagina } from '../influencia/tipos';

/* «El método Lean Startup», secciones 1 a 7: Ries, de Toyota a las startups, el ciclo de feedback, crear, medir, aprender y los tipos de pivote. */

export const portada: Pagina = {
  id: 'ls-portada',
  titulo: 'Aprender rápido,', destaque: 'gastar lo mínimo',
  bajada: 'Eric Ries y el método para saber en semanas si tu idea tiene clientes.',
  inicio: 'imagina descubrir en semanas',
  frases: ['en semanas', 'nace en 1978', 'universidad de yale', 'silicon valley', 'catalyst recruiting', 'en 2004', 'imvu', 'en 2007', 'techfellow', 'harvard', 'en 2011', 'recorreremos'],
  els: [],
  tarjetas: [
    { rotulo: 'Eric Ries', texto: 'Nace en 1978, estudia en Yale y empieza su carrera como empresario en Silicon Valley.', frase: 'nace en 1978' },
    { rotulo: 'De fracaso a IMVU', texto: 'Catalyst Recruiting fracasa; en 2004 cofunda IMVU, donde aplica el método que luego escribe.', frase: 'catalyst recruiting', destacada: true },
    { rotulo: 'El libro', texto: 'En 2011 publica El método Lean Startup, que se vuelve un superventas.', frase: 'en 2011' },
  ],
  pregunta: { frase: 'cuántos meses de trabajo', texto: '¿Cuántos meses de trabajo lleva tu empresa sin que ningún cliente real haya visto el producto?' },
};

export const toyota: Pagina = {
  id: 'ls-toyota',
  titulo: 'De Toyota a las', destaque: 'empresas emergentes',
  bajada: 'La filosofía lean nació en una fábrica y Ries la trasladó a la innovación.',
  inicio: 'de toyota a las empresas emergentes',
  frases: ['en 1972', 'significa en inglés', 'disminuir las pérdidas', 'siete fuentes', 'auge del consumo', 'cruza el pacífico', 'lean thinking', 'gestión lean', 'lean software', 'aplicar la filosofía lean', 'startup lessons learned', 'cómo me aseguro', 'steve blank', 'desarrollo de la clientela'],
  els: [],
  tarjetas: [
    { rotulo: 'Lean manufacturing', texto: 'Desde 1972, Toyota reduce pérdidas y despilfarro (muda) para bajar costes.', frase: 'en 1972' },
    { rotulo: 'Cruza el Pacífico', texto: 'Womack y Jones la teorizan en 1996 y se extiende a otras industrias y al software.', frase: 'lean thinking' },
    { rotulo: 'La pregunta de Ries', texto: '¿Cómo me aseguro de que el producto encontrará su clientela? Acercándose a los usuarios.', frase: 'cómo me aseguro', destacada: true },
  ],
  pregunta: { frase: 'cuál es el mayor despilfarro', texto: '¿Cuál es el mayor despilfarro de tu empresa: producir más de lo necesario, o producir algo que nadie pidió?' },
};

export const ciclo: Pagina = {
  id: 'ls-ciclo',
  titulo: 'La incertidumbre y', destaque: 'el ciclo de feedback',
  bajada: 'Crear, medir y aprender, cada vez más rápido.',
  inicio: 'una empresa emergente vive en la incertidumbre',
  frases: ['joven empresa innovadora', 'cuestionarse constantemente', 'innovaciones de forma permanente', 'tres rasgos', 'ciclo de feedback', 'crear medir y aprender', 'reducir la duración total', 'proceder a empujones', 'grupo reducido de personas', 'ejemplo imaginario', 'menús saludables', 'cinco menús', 'dos semanas'],
  els: [],
  tarjetas: [
    { rotulo: 'Tres rasgos', texto: 'Ciclo rápido, deseos de los clientes tenidos en cuenta y decisiones de base científica.', frase: 'tres rasgos' },
    { rotulo: 'Crear, medir, aprender', texto: 'Se crea un producto, se mide la reacción de los clientes y se aprende qué hacer.', frase: 'crear medir y aprender', destacada: true },
    { rotulo: 'Ciclo más corto', texto: 'Reducir su duración reduce las pérdidas de tiempo, de dinero y de energía.', frase: 'reducir la duración total' },
  ],
  pregunta: { frase: 'cuál es el ciclo más corto', texto: '¿Cuál es el ciclo más corto que podrías recorrer esta semana con un cliente real?' },
};

export const pmv: Pagina = {
  id: 'ls-pmv',
  titulo: 'Crear: el producto', destaque: 'mínimo viable',
  bajada: 'Un prototipo que enfrenta a los clientes con tu hipótesis cuanto antes.',
  inicio: 'crear: el producto mínimo viable',
  frases: ['producto mínimo viable', 'menor esfuerzo', 'enfrentarlo por primera vez', 'hipótesis', 'baja calidad', 'malas noticias', 'el fracaso permite', 'la experiencia de imvu', 'capital riesgo', 'en qué unidades', 'crecer con rapidez', 'canchas de pádel', 'formulario sencillo'],
  els: [],
  tarjetas: [
    { rotulo: 'Mínimo, no perfecto', texto: 'Requiere el menor esfuerzo y tiempo; incluso uno de baja calidad aporta datos útiles.', frase: 'menor esfuerzo', destacada: true },
    { rotulo: 'IMVU', texto: 'Con cifras tan bajas que los inversores preguntaban si eran miles: eran unidades. Aun así, ajustaron y crecieron.', frase: 'en qué unidades' },
    { rotulo: 'Malas noticias', texto: 'Un PMV suele traerlas; el fracaso permite aprender y evolucionar.', frase: 'malas noticias' },
  ],
  pregunta: { frase: 'qué versión de tu producto', texto: '¿Qué versión de tu producto cabe en una semana de trabajo y ya sería útil para un cliente real?' },
};

export const medir: Pagina = {
  id: 'ls-medir',
  titulo: 'Medir: la contabilidad', destaque: 'de la innovación',
  bajada: 'Cifras que obligan a decidir, no cifras que halagan.',
  inicio: 'medir: la contabilidad de la innovación',
  frases: ['progreso real', 'una mirada cuantitativa', 'régimen ideal', 'microajustes', 'tasa de activación', 'conocimiento validado', 'decisión final', 'indicadores ilusorios', 'número total de clientes', 'las tres a', 'accionable', 'accesible', 'auditable', 'diez mil visitas'],
  els: [],
  tarjetas: [
    { rotulo: 'Pequeños pasos', texto: 'Muchos intentos y microajustes; un cambio que mejora la activación es conocimiento validado.', frase: 'microajustes' },
    { rotulo: 'Indicadores ilusorios', texto: 'Cifras genéricas, como el total de clientes, pueden ser engañosas.', frase: 'indicadores ilusorios' },
    { rotulo: 'Las tres A', texto: 'Accionable, accesible y auditable: un indicador que lleva a decidir.', frase: 'las tres a', destacada: true },
  ],
  pregunta: { frase: 'cuál de las cifras', texto: '¿Cuál de las cifras que miras hoy te permitiría decidir algo mañana mismo?' },
};

export const pivotar: Pagina = {
  id: 'ls-pivotar',
  titulo: 'Aprender: perseverar', destaque: 'o pivotar',
  bajada: 'Nada es más peligroso que una empresa estancada.',
  inicio: 'aprender: perseverar o pivotar',
  frases: ['concepto de pivote', 'empresa estancada', 'callejón sin salida', 'número de pivotes', 'nueva ocasión', 'tardan demasiado', 'miedo al fracaso', 'emocionalmente duro', 'dos factores', 'efectividad decreciente', 'más productivo', 'valor suficiente'],
  els: [],
  tarjetas: [
    { rotulo: 'El estancamiento', texto: 'Destruye la creatividad, igual que empeñarse en un callejón sin salida.', frase: 'empresa estancada' },
    { rotulo: 'Cuántos pivotes quedan', texto: 'El valor de una startup depende del número de cambios fundamentales que aún puede permitirse.', frase: 'número de pivotes', destacada: true },
    { rotulo: 'Dos señales', texto: 'Efectividad decreciente de los experimentos y sensación de que el desarrollo debería ser más productivo.', frase: 'dos factores' },
  ],
  pregunta: { frase: 'qué señal te diría', texto: '¿Qué señal te diría que ha llegado la hora de cambiar de rumbo en tu empresa?' },
};

export const tipos: Pagina = {
  id: 'ls-tipos',
  titulo: 'Los diez tipos', destaque: 'de pivote',
  bajada: 'Producto, cliente, necesidad, plataforma, negocio, valor, motor, canal y tecnología.',
  inicio: 'los diez tipos de pivote',
  frases: ['pivote de acercamiento', 'el de alejamiento', 'segmento de consumidor', 'necesidad del consumidor', 'pivote de plataforma', 'arquitectura del negocio', 'captura del valor', 'quedan tres más', 'pivote de motor de crecimiento', 'canal de venta', 'el de tecnología', 'un ejemplo imaginario', 'hoteles pequeños'],
  els: [],
  tarjetas: [
    { rotulo: 'Acercar y alejar', texto: 'Una característica pasa a ser el producto, o el producto pasa a ser una característica.', frase: 'pivote de acercamiento' },
    { rotulo: 'Cliente y necesidad', texto: 'Otros clientes con el mismo problema, o los mismos clientes con otro problema.', frase: 'segmento de consumidor', destacada: true },
    { rotulo: 'El resto', texto: 'Plataforma, arquitectura del negocio, captura del valor, motor de crecimiento, canal y tecnología.', frase: 'quedan tres más' },
  ],
  pregunta: { frase: 'tu producto tendría que cambiar', texto: '¿Tu producto tendría que cambiar de cliente, de problema o de canal, y cuál de los tres tendría más sentido?' },
};
