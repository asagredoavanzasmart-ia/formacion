import type { Pagina } from '../influencia/tipos';

/* Comunicación efectiva · Parte 1, páginas 13 a 18. Frases literales del guion. */

export const estiloHablar: Pagina = {
  id: 'ce1-estilo-hablar',
  titulo: 'El estilo', destaque: 'al hablar',
  bajada: 'La seguridad que otros ven en ti depende de cómo hablas, no solo de lo que sabes.',
  inicio: 'el director de una división',
  frases: [
    'reunión de evaluación', 'ninguna de las mujeres', 'dudar de sus oídos', 'deborah tannen', 'solo se puede inferir', 'en cinco minutos',
    'cinco meses', 'parece seguro', 'cómo suena una persona segura', 'el estilo lingüístico', 'directo o indirecto', 'ritmo y pausas',
    'elección de palabras', 'uso de bromas', 'señales aprendidas', 'diferencias mínimas', 'bob de detroit', 'joe de nueva york', 'joe la llena',
    'avasallador', 'no tiene mucho que aportar', 'sally', 'de texas a washington', 'nunca lo encontraba', 'como tímida',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'La confianza se infiere', texto: 'Solo se ve en cómo alguien se presenta, y buena parte de eso es su manera de hablar.', frase: 'solo se puede inferir' },
    { rotulo: 'Estilo lingüístico', texto: 'Directo o indirecto, pausas, palabras, bromas, preguntas y disculpas: señales aprendidas en la cultura.', frase: 'el estilo lingüístico', destacada: true },
    { rotulo: 'Diferencias mínimas', texto: 'Una pausa un poco más larga hizo que Bob pareciera sin ideas y que Sally pasara a verse tímida.', frase: 'diferencias mínimas' },
  ],
  pregunta: { frase: 'cómo te juzgaría', texto: '¿Cómo te juzgaría un cliente solo por tu manera de hablar?' },
};

export const dosNiveles: Pagina = {
  id: 'ce1-dos-niveles',
  titulo: 'Cada frase,', destaque: 'dos niveles',
  bajada: 'Lo que dices transmite ideas y, a la vez, negocia la relación.',
  inicio: 'cada frase funciona en dos niveles',
  frases: [
    'dos niveles', 'comunica ideas', 'negocia la relación', 'significan cosas distintas', 'quien dice nosotros', 'sin el crédito',
    'en un experimento', 'en público más mujeres', 'en privado sus predicciones', 'no parecer arrogantes', 'preguntar mucho',
    'una médica en formación', 'hacía más preguntas', 'empezando por elogios', 'reescribir un informe', 'me dijiste que estaba bien',
    'la indirección sale cara', 'cómo se sentiría', 'no había hecho nada', 'un copiloto', 'río potomac', 'menos 5 de las 74',
    'no existe una mejor manera', 'en ventas eso significa', 'tu propio manual',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Dos niveles', texto: 'Cada frase comunica ideas y negocia la relación: el estatus y la cercanía.', frase: 'dos niveles' },
    { rotulo: 'La misma frase, otro sentido', texto: 'Decir «nosotros», preguntar mucho o elogiar primero puede costarte el crédito, la nota o la claridad.', frase: 'quien dice nosotros' },
    { rotulo: 'No hay una mejor manera', texto: 'Depende de la situación, la cultura, el rango y los estilos. No leas a tu cliente con tu propio manual.', frase: 'no existe una mejor manera', destacada: true },
  ],
  pregunta: { frase: 'qué estilo de hablar', texto: '¿Qué estilo de hablar tiene tu cliente más importante, y en qué se diferencia del tuyo?' },
};

export const estilosDecision: Pagina = {
  id: 'ce1-estilos-decision',
  titulo: 'Cinco formas', destaque: 'de decidir',
  bajada: 'No basta con el contenido: importa cómo decide quien tiene la última palabra.',
  inicio: 'imagina que presentas una propuesta',
  frases: [
    'presentas una propuesta', 'argumento apasionado', 'lógica impecable', 'datos blindados', 'la archivaron', 'gary williams',
    'cómo se entrega', 'quién decide', 'su estilo de decisión', 'más de 1 600', 'cinco estilos', 'carismáticos', 'pensadores', 'escépticos',
    'seguidores', 'controladores', 'myers briggs', 'alto riesgo', 'el grupo más grande', 'el 25', 'el 19', 'el 11', 'el 9',
    'más de la mitad', 'cerca del 80', 'apenas el 28', 'ningún estilo es superior',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Quién decide', texto: 'El error es pulir el contenido y olvidar cómo decide quien tiene la última palabra.', frase: 'quién decide' },
    { rotulo: 'Cinco estilos', texto: 'Seguidores 36 %, carismáticos 25 %, escépticos 19 %, pensadores 11 % y controladores 9 %.', frase: 'cinco estilos', destacada: true },
    { rotulo: 'El error común', texto: 'Cerca del 80 % de las presentaciones apunta a escépticos y controladores, que son apenas el 28 %.', frase: 'cerca del 80' },
  ],
  pregunta: { frase: 'cuál de los cinco', texto: '¿Cuál de los cinco es el estilo de tu comprador principal?' },
};

export const carismaticosPensadores: Pagina = {
  id: 'ce1-carismaticos-pensadores',
  titulo: 'Carismáticos', destaque: 'y pensadores',
  bajada: 'A uno se le habla de resultados y riesgos; al otro, de método y datos.',
  inicio: 'los carismáticos se entusiasman',
  frases: [
    'los carismáticos se entusiasman', 'forma visual', 'richard branson', 'su entusiasmo engaña', 'información equilibrada', 'resiste la tentación',
    'habla de los riesgos', 'en resultados', 'apoyos visuales', 'lo más importante', 'palabras que funcionan', 'los pensadores son', 'michael dell',
    'más difíciles de persuadir', 'toda la información', 'tu metodología', 'del punto a al punto b', 'nunca olvidan', 'comunica tus dudas',
    'tiempo y espacio', 'silencios', 'mary flood', 'equipos regionales', 'un jefe carismático', 'una pizarra', 'riesgo de no hacer nada',
    'ante un pensador', 'dos reuniones', 'tres opciones', 'sus datos son débiles', 'casi el inverso',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Carismáticos', texto: 'No te contagies: habla de riesgos, resultados y apoyos visuales, y empieza por lo más importante.', frase: 'resiste la tentación' },
    { rotulo: 'Pensadores', texto: 'Quieren toda la información y tu método del punto A al B. Comparte tus dudas y dales tiempo.', frase: 'los pensadores son' },
    { rotulo: 'Mary Flood', texto: 'Al carismático, pizarra y directo a la propuesta; al pensador, dos reuniones y tres opciones.', frase: 'mary flood', destacada: true },
  ],
  pregunta: { frase: 'qué cambiarías', texto: '¿Qué cambiarías en tu próxima propuesta si tu comprador fuera de un tipo o del otro?' },
};

export const otrosEstilos: Pagina = {
  id: 'ce1-otros-estilos',
  titulo: 'Escépticos, seguidores', destaque: 'y controladores',
  bajada: 'Credibilidad prestada, casos probados o informes y paciencia.',
  inicio: 'los escépticos sospechan',
  frases: [
    'los escépticos sospechan', 'por intuición', 'personalidades fuertes', 'levantarse en plena presentación', 'atender una llamada', 'dónde estás',
    'deciden en días', 'gente parecida', 'credibilidad transferida', 'director de operaciones', 'seguramente ya viste', 'todo concreto',
    'los seguidores deciden', 'marcas conocidas', 'rara vez son pioneros', 'difíciles de identificar', 'más fáciles de persuadir', 'referencias',
    'innovadoras pero probadas', 'no perderán su empleo', 'ocho casos', 'tres opciones', 'los primeros de su industria',
    'los controladores aborrecen', 'hechos y análisis', 'no se les vende', 'estructurada lineal y creíble', 'convenzan solos',
    'presionarlos los aleja', 'necesitan meses', 'cuatro meses', 'pidan la reunión',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Escépticos', texto: 'Necesitan credibilidad transferida: el respaldo de alguien en quien ya confían. Deciden en días.', frase: 'credibilidad transferida' },
    { rotulo: 'Seguidores', texto: 'Muéstrales que otros ya tuvieron éxito y que no perderán su empleo.', frase: 'más fáciles de persuadir', destacada: true },
    { rotulo: 'Controladores', texto: 'No se les vende: información estructurada y paciencia. Presionarlos los aleja.', frase: 'no se les vende' },
  ],
  pregunta: { frase: 'a qué tipo de comprador', texto: '¿A qué tipo de comprador le estás presentando siempre, sin darte cuenta?' },
};

export const cultura: Pagina = {
  id: 'ce1-cultura',
  titulo: 'La misma frase,', destaque: 'otra cultura',
  bajada: 'Lo que te lleva al sí en una cultura te lleva al no en otra.',
  inicio: 'tim carr un estadounidense',
  frases: [
    'tim carr', 'cliente saudí', 'conocía los principios', 'el batna', 'intereses no en posiciones', 'la llamada fue bien', 'quién había acordado qué',
    'respondió un silencio', 'te dije que lo haría', 'no cumplo mis promesas', 'y el negocio', 'erin meyer', 'al sí en una cultura', 'al no en otra',
    'primera regla', 'discrepo totalmente', 'rompe la relación', 'experiencia en méxico', 'no entiendo bien tu punto', 'los intensificadores',
    'los atenuantes', 'rusos franceses', 'mexicanos tailandeses', 'un peruano', 'un alemán', 'debate muy disfrutable', 'segunda regla',
    'alzar la voz', 'el trato se caía', 'cenaron juntos',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Tim Carr', texto: 'Repasar quién acordó qué, natural para él, le sonó al cliente a desconfianza. Perdió el negocio.', frase: 'tim carr' },
    { rotulo: 'Cómo se discrepa', texto: 'Escucha intensificadores y atenuantes: «un poco» puede ser grave y «completamente», solo un debate.', frase: 'primera regla', destacada: true },
    { rotulo: 'Las emociones', texto: 'Voces altas y brazos agitados no siempre son crisis: puede terminar en una cena feliz.', frase: 'segunda regla' },
  ],
  pregunta: { frase: 'cómo leerías un silencio', texto: '¿Cómo leerías un silencio de tu cliente si no supieras de qué cultura viene?' },
};
