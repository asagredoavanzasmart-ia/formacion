import type { Pagina } from '../influencia/tipos';

/* Parte 1, secciones 30 a 34: conversaciones tensas, aconsejar y la síntesis. */

export const tensas: Pagina = {
  id: 'ce1-tensas',
  titulo: 'Conversaciones', destaque: 'tensas',
  bajada: 'Evitarlas casi siempre empeora el problema. Hay tres tipos básicos.',
  inicio: 'todos tenemos conversaciones tensas',
  frases: [
    'conversaciones tensas', 'carga emocional', 'despedir a alguien', 'recibir un elogio', 'holly weeks', 'evitarlas', 'tres conversaciones',
    'tengo malas noticias', 'jeremy', 'artificialmente altas', 'red sox', 'siguió engreído', 'se quitó los guantes', 'silencio helado',
    'renunció', 'qué está pasando aquí', 'elizabeth y rafael', 'eso es todo', 'si tú lo dices', 'quién te puso a cargo', 'pidió perdón',
    'pidió traslado', 'me estás atacando', 'gritó a nick', 'tranquilízate', 'siguió acusándolo', 'fueron ignorados',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Malas noticias', texto: 'David rodeó el tema con los Red Sox y terminó hablando solo. Jeremy renunció.', frase: 'tengo malas noticias' },
    { rotulo: '¿Qué está pasando?', texto: 'Elizabeth pidió perdón y cedió: fijó un estatus desigual y pidió traslado.', frase: 'qué está pasando aquí' },
    { rotulo: '¡Me atacas!', texto: 'Ante los gritos de Karen, la frialdad de Nick lo empeoró. Ninguno ascendió.', frase: 'me estás atacando', destacada: true },
  ],
  pregunta: { frase: 'cuál de esos tres', texto: '¿Cuál de esos tres tipos de conversación te cuesta más con un cliente?' },
};

export const prepararTensa: Pagina = {
  id: 'ce1-preparar-tensa',
  titulo: 'Preparar', destaque: 'la conversación',
  bajada: 'Conócete, ensaya y habla con claridad, neutralidad y temperancia.',
  inicio: 'para prepararte weeks',
  frases: [
    'autoconciencia', 'te retiras o escalas', 'enseñas los dientes', 'te cierras', 'obstinadamente racional', 'el control a karen',
    'dos reuniones', 'aversión al conflicto', 'ensaya con un amigo', 'el contenido', 'no te cargara', 'lenguaje corporal', 'escríbelo',
    'claridad neutralidad y temperancia', 'sin rodeos', 'la entrega', 'otra persona', 'seguimos atentos', 'neutralidad es el tono', 'houston',
    'temperancia es la frase', 'deja de interrumpirme', 'esperar un minuto', 'no lo tomes a mal', 'a través de ellas',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Autoconciencia', texto: '¿Te retiras o escalas? Saber cómo reaccionas es el primer paso.', frase: 'autoconciencia' },
    { rotulo: 'Ensaya', texto: 'Con un amigo neutral: primero el contenido, luego el tono, el cuerpo y las frases por escrito.', frase: 'ensaya con un amigo' },
    { rotulo: 'Tres ingredientes', texto: 'Claridad sin eufemismos, tono neutral y frases moderadas.', frase: 'claridad neutralidad y temperancia', destacada: true },
  ],
  pregunta: { frase: 'qué frase hoy', texto: '¿Qué frase, hoy cargada de enojo, podrías reescribir con tono neutral y temperado?' },
};

export const jugadas: Pagina = {
  id: 'ce1-jugadas',
  titulo: 'Jugadas', destaque: 'a mano',
  bajada: 'Honra al otro, replantea tu intención y nombra la táctica.',
  inicio: 'preparar no basta',
  frases: [
    'jugadas a mano', 'honrar a tu interlocutor', 'comparto la responsabilidad', 'aprecio y respeto', 'sin provocar', 'desarmar',
    'entiendo cómo tomaste', 'repasemos esta lista', 'concedes su percepción', 'sin pelear ni apaciguar', 'pierde la cara',
    'las tácticas no a las personas', 'nombrándolas', 'hemos trabajado bien', 'tan distinta', 'nombrar una táctica', 'más agresión',
    'jacqueline', 'chiste sexista', 'flotara', 'volvió al tema', 'richard', 'relegada', 'él retrocedió',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Honrar', texto: 'Reconoce tu parte: centra la atención en lo difícil sin provocar.', frase: 'honrar a tu interlocutor' },
    { rotulo: 'Replantear', texto: 'Concede su percepción, aclara tu intención y retoma sin pelear ni apaciguar.', frase: 'desarmar' },
    { rotulo: 'Nombrar la táctica', texto: 'Nombrarla la desarma: seguir usándola exigiría más agresión.', frase: 'nombrar una táctica', destacada: true },
  ],
  pregunta: { frase: 'qué táctica', texto: '¿Qué táctica de un cliente difícil podrías nombrar, con calma, en tu próxima conversación tensa?' },
};

export const aconsejar: Pagina = {
  id: 'ce1-aconsejar',
  titulo: 'Los errores', destaque: 'de quien aconseja',
  bajada: 'Sobrepasar los límites, diagnosticar mal y aconsejar desde ti.',
  inicio: 'cuando asesoras a un cliente',
  frases: [
    'garvin', 'margolis', 'dar y recibir consejo', 'sobrepasar los límites', 'nadie pidió', 'intromisión', 'sin ser competente',
    'pierde credibilidad', 'un solo mal consejo', 'diagnosticar mal', 'demasiado pronto', 'ya viste', 'parte interesada', 'relato parcial',
    'preguntas básicas', 'aconsejar desde ti', 'yo en tu lugar', 'desagradable e ineficaz', 'historias personales', 'restricciones',
    'en ventas', 'diagnosticar con preguntas', 'lo que harías tú',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Sobrepasar límites', texto: 'El consejo no pedido se vive como intromisión; uno solo malo hunde tu prestigio.', frase: 'sobrepasar los límites' },
    { rotulo: 'Diagnosticar mal', texto: 'Definir el problema demasiado pronto, creer un relato parcial y no hacer preguntas básicas.', frase: 'diagnosticar mal' },
    { rotulo: 'Aconsejar desde ti', texto: 'Recomienda según lo que tu cliente puede hacer, no según lo que harías tú.', frase: 'aconsejar desde ti', destacada: true },
  ],
  pregunta: { frase: 'tu última recomendación', texto: '¿Tu última recomendación a un cliente partió de lo que él puede hacer o de lo que tú harías en su lugar?' },
};

export const sintesis: Pagina = {
  id: 'ce1-sintesis',
  titulo: 'Vender es', destaque: 'una conversación',
  bajada: 'El otro nunca ve tu intención: solo lo que haces con ella.',
  inicio: 'todo lo anterior converge',
  frases: [
    'una idea', 'tu intención', 'solo lo que haces', 'en segundos', 'confianza poder y ego', 'un estilo propio', 'tu silencio',
    'las reglas de su cultura', 'lo que sintió', 'no empuja', 'prepara', 'credibilidad antes', 'con preguntas', 'quien decide',
    'beneficios compartidos', 'historias vívidas', 'la conversación tensa', 'manipulación', 'porque es verdadero', 'hasta aquí el cliente',
    'un vendedor solo', 'un equipo', 'un líder', 'con franqueza',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Cómo te ve', texto: 'En segundos, con lentes de confianza, poder y ego, con su estilo y las reglas de su cultura.', frase: 'en segundos' },
    { rotulo: 'Quien persuade, prepara', texto: 'Credibilidad, preguntas, el estilo de quien decide, beneficios compartidos e historias.', frase: 'no empuja', destacada: true },
    { rotulo: 'Lo que sigue', texto: 'Una venta la sostienen un equipo, un líder y una organización que habla con franqueza.', frase: 'un vendedor solo' },
  ],
  pregunta: { frase: 'qué ocurre cuando', texto: '¿Qué ocurre cuando lo que no se dice sucede dentro de tu propia empresa?' },
};
