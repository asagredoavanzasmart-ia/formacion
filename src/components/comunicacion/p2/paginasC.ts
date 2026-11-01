import type { Pagina } from '../../influencia/tipos';

/* Parte 2, secciones 17 a 24: recibir retroalimentación, pedir y dar consejo, el conflicto y la síntesis. */

export const retro: Pagina = {
  id: 'ce2-retroalimentacion',
  titulo: 'Recibir', destaque: 'retroalimentación',
  bajada: 'Quien la recibe decide si la deja entrar. Tres detonantes lo impiden.',
  inicio: 'la retroalimentación mejora',
  frases: [
    'no funciona', 'solo el 36', 'el 55', 'injusta o inexacta', 'uno de cada cuatro', 'el 63', 'conversaciones difíciles', 'sheila heen',
    'veinte años', 'al otro lado', 'quien la recibe', 'si cambia o no', 'aprender a pedirla', 'aprender y crecer', 'ser aceptado',
    'tres detonantes', 'de la verdad', 'equivocada o injusta', 'de la relación', 'y tú me lo dices', 'todo lo que hice', 'de la identidad', 'quién eres',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'No funciona', texto: 'Solo el 36 % completa las evaluaciones; el 55 % las siente injustas.', frase: 'solo el 36' },
    { rotulo: 'El otro lado', texto: 'Las empresas entrenan a quien da la crítica, pero quien la recibe decide si cambia.', frase: 'al otro lado' },
    { rotulo: 'Tres detonantes', texto: 'La verdad (el contenido), la relación (quién lo dice) y la identidad (quién crees ser).', frase: 'tres detonantes', destacada: true },
  ],
  pregunta: { frase: 'cuál de los tres detonantes', texto: '¿Cuál de los tres detonantes se activa en ti cuando tu jefe comenta una venta perdida?' },
};

export const recibir: Pagina = {
  id: 'ce2-recibir',
  titulo: 'Conócete,', destaque: 'separa y escucha',
  bajada: 'Los tres primeros pasos para recibir mejor una crítica.',
  inicio: 'heen y stone proponen seis pasos',
  frases: [
    'seis pasos', 'tus tendencias', 'te defiendes', 'hierves por dentro', 'michael', 'falta de profesionalismo', 'lo que está mal en mí',
    '1 2 millones', 'su padre', 'duerme sobre el tema', 'el qué del quién', 'janet', '360 grados', 'subordinados', 'altos estándares',
    'excluyentes', 'qué hacía ella', 'el coaching', 'tu calificación es un 4', 'así puedes mejorar', 'lo peor', 'james',
    'predicciones de los analistas', 'crítica velada',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Tus tendencias', texto: 'Michael sabe que exagera: duerme sobre el tema y al día siguiente evalúa qué aprender.', frase: 'tus tendencias' },
    { rotulo: 'El qué y el quién', texto: 'Janet entendió que el desempeño de su equipo y su liderazgo merecían solución los dos.', frase: 'el qué del quién', destacada: true },
    { rotulo: 'Escucha el coaching', texto: 'James oyó la sugerencia del directorio como una pista, no como una crítica velada.', frase: 'el coaching' },
  ],
  pregunta: { frase: 'qué crítica reciente', texto: '¿Qué crítica reciente podrías volver a escuchar como un consejo y no como una sentencia?' },
};

export const desarmar: Pagina = {
  id: 'ce2-desarmar',
  titulo: 'Desarma, pide una cosa', destaque: 'y experimenta',
  bajada: 'Los otros tres pasos: entender, enfocar y probar.',
  inicio: 'el cuarto paso es desarmar',
  frases: [
    'desarmar', 'kara', 'johann', 'más asertiva', 'qué significa', 'sonreír', 'de dónde viene', 'hacia dónde va', 'no quiere cambiar',
    'calladas humildes', 'vendedor agresivo', 'una sola cosa', 'algún comentario', 'me frena', 'roberto', 'dieciocho hojas', 'cada trimestre',
    'se repiten', 'retroalimentación crítica', 'experimentar', 'riesgo es pequeño', 'james siguió', 'una semana antes', 'nadie puede impedírtelo',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Desarmar', texto: '«Sé más asertiva»: ¿qué significa, de dónde viene y hacia dónde va? Kara decidió no cambiar.', frase: 'desarmar' },
    { rotulo: 'Una sola cosa', texto: '«¿Qué me ves hacer, o dejar de hacer, que me frena?» Roberto pregunta eso cada trimestre.', frase: 'una sola cosa', destacada: true },
    { rotulo: 'Experimentar', texto: 'Si el riesgo es pequeño y el beneficio grande, prueba el consejo.', frase: 'experimentar' },
  ],
  pregunta: { frase: 'a quién le pedirás', texto: '¿A quién le pedirás esta semana una sola cosa que te esté frenando?' },
};

export const pedirConsejo: Pagina = {
  id: 'ce2-pedir-consejo',
  titulo: 'Pedir consejo', destaque: 'bien',
  bajada: 'Cuando eliges a tus consejeros, eliges tu consejo.',
  inicio: 'pedir consejo bien',
  frases: [
    'david garvin', 'tropiezos', 'ya tienes la respuesta', 'validación', 'elegir mal', 'peor desempeño', 'misma industria', 'menos cambio estratégico',
    'kennedy', 'arthur goldberg', 'bahía de cochinos', 'lo encasilló', 'operaciones guerrilleras', 'unidades regulares', 'definir mal',
    'relato interminable', 'descartar el consejo', 'casi dos tercios', 'la mitad de frecuencia', 'juzgar mal', 'seguro de sí mismo', 'christensen',
    'eliges tu consejo', 'directorio personal', 'lo que no quieres oír', 'lo que te falta', 'contar lo justo', 'el retrato',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Elegir mal', texto: 'Kennedy no consultó a Goldberg, que sabía de guerrillas, antes de Bahía de Cochinos.', frase: 'elegir mal' },
    { rotulo: 'Descartarlo', texto: 'El error más común: quienes tienen poder ignoraron casi dos tercios de los consejos.', frase: 'descartar el consejo' },
    { rotulo: 'Tu directorio', texto: 'Consejeros diversos que te digan lo que no quieres oír, y cuéntales lo justo.', frase: 'directorio personal', destacada: true },
  ],
  pregunta: { frase: 'a quién consultas', texto: '¿A quién consultas cuando tienes una decisión comercial difícil, y te dice lo que no quieres oír?' },
};

export const darConsejo: Pagina = {
  id: 'ce2-dar-consejo',
  titulo: 'Aconsejar', destaque: 'como instructor',
  bajada: 'Guiar para que el otro conduzca solo.',
  inicio: 'quien aconseja en cambio',
  frases: [
    'espacio privado', 'sin juzgar', 'preguntas amplias', 'cómo te sientes', 'instructor de manejo', 'conduzca solo', 'varias alternativas',
    'gerente de división', 'junto a ingeniería', 'director de operaciones', 'reuniones pequeñas', 'grandes clientes', 'abogado del diablo',
    'segunda opinión', 'dos opiniones', 'combinar consejos', 'debates eternos', 'tres consejos', 'william lee', 'no llegaría a socio',
    'otro entorno', 'la mejor conversación', 'una conversación continua',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Instructor de manejo', texto: 'Espacio privado, escuchar sin juzgar y preguntas amplias: la meta es que el otro conduzca solo.', frase: 'instructor de manejo', destacada: true },
    { rotulo: 'Alternativas', texto: 'Construir opciones juntos, un abogado del diablo y una segunda opinión: dos bastan.', frase: 'varias alternativas' },
    { rotulo: 'William Lee', texto: '«No llegarás a socio, pero triunfarás en otro lado»: años después, la mejor conversación de su vida.', frase: 'william lee' },
  ],
  pregunta: { frase: 'qué conversación honesta', texto: '¿Qué conversación honesta sobre el futuro de alguien de tu equipo estás postergando?' },
};

export const conflicto: Pagina = {
  id: 'ce2-conflicto',
  titulo: 'Anticipar', destaque: 'el conflicto',
  bajada: 'Cinco conversaciones antes de empezar: en mi mundo… ¿en tu mundo?',
  inicio: 'el conflicto en un equipo',
  frases: [
    'crear valor o destruirlo', 'debates respetuosos', 'el malo', 'ginka toegel', 'veinticinco años', 'opiniones distintas', 'forma de trabajar',
    'la frustración', 'cinco conversaciones', 'de 20 a 30 minutos', 'cómo nos vemos', 'cómo actuamos', 'cómo hablamos', 'cómo pensamos',
    'cómo sentimos', 'en mi mundo', 'en tu mundo', 'edgar schein', 'fracciones de segundo', 'la banca', 'traje y corbata', 'distancia',
    'thierry henry', 'demasiado lejos', 'la puntualidad', 'nórdica', 'falta de urgencia', 'la autopromoción', 'resentidos',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'La forma de trabajar', texto: 'El problema no son las opiniones distintas, sino la incompatibilidad percibida al trabajar.', frase: 'forma de trabajar' },
    { rotulo: 'Cinco conversaciones', texto: 'Cómo nos vemos, actuamos, hablamos, pensamos y sentimos: 20 a 30 minutos cada una.', frase: 'cinco conversaciones', destacada: true },
    { rotulo: 'Vernos y actuar', texto: 'El traje que crea distancia, el gesto aceptado en un país y no en otro, la urgencia y la ayuda.', frase: 'fracciones de segundo' },
  ],
  pregunta: { frase: 'qué diferencia en la forma', texto: '¿Qué diferencia en la forma de trabajar ha generado roces en tu equipo comercial sin que nadie la nombre?' },
};

export const hablarSentir: Pagina = {
  id: 'ce2-hablar-sentir',
  titulo: 'Hablar, pensar', destaque: 'y sentir',
  bajada: 'Acordar de antemano cuánta franqueza se espera y cómo se discrepa.',
  inicio: 'sobre cómo hablamos',
  frases: [
    'una garantía', 'aspiración', 'software', 'promesas rotas', 'compromiso firme', 'una intención', 'la positividad', 'no va a funcionar',
    'sí buenísimo', 'cuánta franqueza', 'alemán', 'cuatro frases', 'heineken', 'caballitos', 'tema agotado', 'cómo pensamos', 'disparan primero',
    'analíticos', 'rotar el liderazgo', 'cómo sentimos', 'extrovertida', 'introvertido', 'desarmar sus propuestas', 'la retirada', 'el sarcasmo',
    'más participación', 'menos rencor',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Cómo hablamos', texto: 'Una promesa puede ser garantía o aspiración. Acuerden cuánta franqueza se espera.', frase: 'una garantía' },
    { rotulo: 'Reglas de la sala', texto: 'Cuatro frases por intervención; un caballito volteado avisa que el tema está agotado.', frase: 'cuatro frases', destacada: true },
    { rotulo: 'Pensar y sentir', texto: 'Rotar el liderazgo entre creativos y analíticos; medir el entusiasmo ante un introvertido.', frase: 'cómo pensamos' },
  ],
  pregunta: { frase: 'qué acuerdo', texto: '¿Qué acuerdo sobre cómo hablar y discrepar podría proponer tu equipo antes del próximo trimestre?' },
};

export const sintesis2: Pagina = {
  id: 'ce2-sintesis',
  titulo: 'Se vende como', destaque: 'se conversa',
  bajada: 'Lo que se dice afuera nace de lo que se habla adentro.',
  inicio: 'todo converge en una misma idea',
  frases: [
    'una misma idea', 'vende tan bien como conversa', 'puertas adentro', 'tu intención', 'con precisión', 'frases vagas', 'las preguntas',
    'abren al equipo', 'una objeción', 'mala noticia', 'volverse caro', 'la historia', 'una reorganización', 'conversación tensa', 'dar y recibir',
    'al consejo', 'al conflicto', 'hablar con claridad', 'escuchar de verdad', 'atreverse a decir', 'habilidades blandas', 'en resultados',
    'afuera', 'adentro',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Las mismas reglas', texto: 'Precisión, preguntas y valor para decir lo que importa: afuera con el cliente y adentro con el equipo.', frase: 'puertas adentro' },
    { rotulo: 'Silencios parecidos', texto: 'La objeción escondida y la mala noticia callada del pipeline crecen hasta volverse caras.', frase: 'una objeción' },
    { rotulo: 'No son blandas', texto: 'Son la forma en que una empresa entiende a sus clientes y corrige a tiempo.', frase: 'habilidades blandas', destacada: true },
  ],
  pregunta: { frase: 'qué conversación vas a empezar', texto: '¿Qué conversación vas a empezar mañana, con un cliente o con tu equipo, que hasta hoy habías evitado?' },
};
