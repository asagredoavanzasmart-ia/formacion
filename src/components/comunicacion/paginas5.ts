import type { Pagina } from '../influencia/tipos';

/* Parte 1, secciones 25 a 29: presentar ideas e historias que mueven. */

export const presentarIdeas: Pagina = {
  id: 'ce1-presentar-ideas',
  titulo: 'Te juzgan', destaque: 'antes que a tu idea',
  bajada: 'Cuatro estereotipos que hunden una propuesta y lo que hacen quienes triunfan.',
  inicio: 'tener ideas creativas es fácil',
  frases: [
    'ideas creativas', 'kimberly elsbach', 'seis años', 'hollywood', 'treinta minutos', 'capital de riesgo', 'el receptor', 'eclipsar',
    '150 milisegundos', 'juicios duraderos', 'sombrero seleccionador', 'docenas de ideas', 'solo el 1', 'cuatro estereotipos', 'el pusilánime',
    'en rojo', 'el robot', 'respuestas enlatadas', 'autos usados', 'una y otra vez', 'caso de caridad', 'solo el 25', 'muestran pasión',
    'colaborador simpático',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'El receptor', texto: 'Juzga a quien presenta tanto como a la idea; categoriza en menos de 150 milisegundos.', frase: 'el receptor' },
    { rotulo: 'Cuatro estereotipos', texto: 'El pusilánime, el robot, el vendedor de autos usados y el caso de caridad.', frase: 'cuatro estereotipos', destacada: true },
    { rotulo: 'Quienes triunfan', texto: 'Solo el 25 %: muestran pasión y hacen participar al receptor en la creación.', frase: 'solo el 25' },
  ],
  pregunta: { frase: 'cuál de esos cuatro', texto: '¿Cuál de esos cuatro estereotipos corres el riesgo de proyectar ante tus clientes?' },
};

export const tresTipos: Pagina = {
  id: 'ce1-tres-tipos',
  titulo: 'Showrunner, artista', destaque: 'o neófito',
  bajada: 'Tres maneras de lograr que quien escucha se sume a tu idea.',
  inicio: 'elsbach identificó tres tipos',
  frases: [
    'tres tipos', 'el showrunner', 'conocimiento práctico', 'dueto de conocimiento', 'robin hood', 'ciencia ficción', 'me encanta',
    'improvisar', 'fruncir el ceño', 'inventó un rap', 'se rio', 'cientos de miles', 'el 20', 'el artista', 'cerca del 40', 'cajas de cereal',
    'un fuerte', 'la torre más alta', 'no puede fingirse', 'el neófito', 'otro 40', 'un mentor', 'hermanas australianas', 'red de mentores',
    'desconfiar del brillo', 'nueva coca cola', 'un desastre',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Showrunner · 20 %', texto: 'Pasión y oficio: guía al otro por recuerdos compartidos e improvisa si algo no gusta.', frase: 'el showrunner' },
    { rotulo: 'Artista · 40 %', texto: 'Apasionado y poco pulido: atrapa la imaginación. No se puede fingir.', frase: 'el artista' },
    { rotulo: 'Neófito · 40 %', texto: 'Confiesa su inexperiencia y pide ayuda como un buen alumno ante un mentor.', frase: 'el neófito', destacada: true },
  ],
  pregunta: { frase: 'en qué parte', texto: '¿En qué parte de tu próxima propuesta puedes invitar al cliente a colaborar?' },
};

export const denning: Pagina = {
  id: 'ce1-denning',
  titulo: 'Una historia', destaque: 'mínima',
  bajada: 'El análisis convence a la mente; la historia mueve a actuar.',
  inicio: 'stephen denning',
  frases: [
    'stephen denning', 'banco mundial', 'aturdido', 'en 1996', 'junio de 1995', 'zambia', '600 kilómetros', 'control de enfermedades',
    'la malaria', 'no aparece', 'millones de personas', 'imagina si llegara', 'narradora profesional', 'sin trama', 'se equivocaba',
    'versión épica', 'su propia organización', 'por qué no el banco', 'espacio mental', 'el análisis', 'la niebla', 'no llega al corazón',
    'con números', 'por una historia',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Zambia, 1995', texto: 'Una trabajadora de salud halló en internet cómo tratar la malaria. El Banco Mundial no estaba ahí.', frase: 'junio de 1995' },
    { rotulo: 'Relato mínimo', texto: 'Sin trama épica, deja espacio para que el público piense en su propia organización.', frase: 'espacio mental', destacada: true },
    { rotulo: 'Mente y corazón', texto: 'Los argumentos se elaboran con números, pero suelen aprobarse por una historia.', frase: 'el análisis' },
  ],
  pregunta: { frase: 'qué historia mínima', texto: '¿Qué historia mínima podrías contarle a tu cliente para que se imagine a sí mismo cambiando?' },
};

export const propositos: Pagina = {
  id: 'ce1-propositos',
  titulo: 'Cada propósito,', destaque: 'su historia',
  bajada: 'Mover a la acción, mostrar quién eres, compartir saber o llevar al futuro.',
  inicio: 'denning descubrió que la forma',
  frases: [
    'su propósito', 'provocar la acción', 'historia trampolín', 'real y reciente', 'final feliz', 'el detalle justo', 'quién eres', 'jack welch',
    'hockey', 'si no sabes perder', 'transmitir valores', 'una parábola', 'la colaboración', 'frenar un rumor', 'humor suave',
    'compartir conocimiento', 'xerox', 'códigos de error', 'al futuro', 'deliberadamente vago', 'churchill', 'martin luther king',
    'número uno o número dos', 'predicciones precisas',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Trampolín', texto: 'Hecho real y reciente, protagonista cercano, final feliz y el detalle justo para mover a la acción.', frase: 'historia trampolín', destacada: true },
    { rotulo: 'Quién eres', texto: 'Un hecho de tu vida que muestre una fortaleza o una vulnerabilidad, como el hockey de Welch.', frase: 'quién eres' },
    { rotulo: 'Hacia el futuro', texto: 'Un relato deliberadamente vago: las predicciones precisas fallan y restan confianza.', frase: 'al futuro' },
  ],
  pregunta: { frase: 'qué quieres lograr', texto: '¿Qué quieres lograr con tu próxima historia: mover a la acción, generar confianza o transmitir conocimiento?' },
};

export const antihistorias: Pagina = {
  id: 'ce1-antihistorias',
  titulo: 'Historias', destaque: 'y antihistorias',
  bajada: 'Una historia negativa se neutraliza con otra verdadera.',
  inicio: 'un colega de denning en ibm',
  frases: [
    'dave snowden', 'antihistorias', 'de sus errores', 'no se contradecían', 'ciertas y creíbles', 'medias verdades', 'neutralizar',
    'un anticuerpo', 'reino unido', 'portátiles', 'no trabajaban de verdad', 'ganaban de más', 'nuevo director', 'bata blanca',
    'sin acompañantes', 'línea de montaje', 'pidió ayuda', 'por qué ganaba', 'pierdes tu empleo', 'pierden el suyo', 'armar los circuitos',
    'el ambiente mejoró', 'momento adecuado',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Antihistorias', texto: 'Las historias demasiado positivas despiertan relatos negativos sobre lo que de verdad pasó.', frase: 'antihistorias' },
    { rotulo: 'El anticuerpo', texto: 'Una historia negativa se neutraliza con otra positiva y verdadera.', frase: 'un anticuerpo', destacada: true },
    { rotulo: 'La bata blanca', texto: '«Si me equivoco yo, 3 000 personas pierden su empleo.» En semanas, el ambiente mejoró.', frase: 'bata blanca' },
  ],
  pregunta: { frase: 'qué rumor', texto: '¿Qué rumor, qué miedo o qué historia negativa circula entre tus clientes, y qué historia verdadera podría contrarrestarla?' },
};
