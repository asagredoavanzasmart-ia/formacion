import type { Pagina } from '../../influencia/tipos';

/* Parte 2, secciones 9 a 16: intencionalidad, el costo del silencio y el coraje competente. */

export const intencionalidad: Pagina = {
  id: 'ce2-intencionalidad',
  titulo: 'Abrir y', destaque: 'cerrar con rumbo',
  bajada: 'La intencionalidad convierte la conversación en acciones alineadas.',
  inicio: 'la intencionalidad pone orden',
  frases: [
    'pone orden', 'no carece de rumbo', 'abren el flujo', 'lo cierra', 'la lógica', 'consentimiento', 'participar en crearla', 'infosys',
    'grandes tendencias', '17 tendencias', 'foros en línea', 'kingfisher', 'un solo equipo', 'barcelona', 'un mercado', '22 puestos', 'delantal',
    'compradores', 'cinco cheques', 'comité ejecutivo', 'desordenada y ruidosa', 'alinear', 'la reconozcas o no', 'unidireccionales',
    'materiales pulidos', 'íntima interactiva',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Consentimiento', texto: 'Explicar la lógica de las decisiones genera consentimiento en lugar de obediencia.', frase: 'la lógica' },
    { rotulo: 'El mercado de Kingfisher', texto: '22 puestos, proveedores con delantal y compradores con cinco cheques: una conversación ruidosa para alinear.', frase: 'kingfisher', destacada: true },
    { rotulo: 'Sin reliquias', texto: 'Los mensajes unidireccionales y pulidos ya no mueven a nadie, adentro ni afuera.', frase: 'unidireccionales' },
  ],
  pregunta: { frase: 'en qué decisión comercial', texto: '¿En qué decisión comercial de este año podrías hacer participar a tu equipo antes de anunciarla?' },
};

export const silencio: Pagina = {
  id: 'ce2-silencio',
  titulo: 'El silencio', destaque: 'es carísimo',
  bajada: 'Tiene buena fama, pero contamina cada interacción.',
  inicio: 'el silencio tiene buena fama',
  frases: [
    'buena fama', 'modestia', 'parecer tonto', 'conservar el empleo', 'enron', 'revista time', 'castigados o marginados', 'leslie perlow',
    'carísimo', 'humillación', 'la creatividad', 'productividad', 'jeff', 'de miércoles a domingo', 'informe semanal', 'los martes', 'se quejaba',
    'nunca se lo dijo', 'resentimiento', 'se atrasaba', 'le preguntaron a matt', 'dolorosamente inútil',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Buena fama', texto: 'Callar se asocia con modestia y prudencia, y alinearse parece la forma segura de conservar el empleo.', frase: 'buena fama' },
    { rotulo: 'Carísimo', texto: 'La humillación y la rabia no dichas apagan la creatividad y bajan la productividad.', frase: 'carísimo' },
    { rotulo: 'El informe de Jeff', texto: 'Cinco días a la semana en un informe que su jefe consideraba una reunión inútil. Nadie lo dijo.', frase: 'jeff', destacada: true },
  ],
  pregunta: { frase: 'qué informe', texto: '¿Qué informe, qué reunión o qué rutina comercial nadie se atreve a cuestionar en tu equipo?' },
};

export const diferencias: Pagina = {
  id: 'ce2-diferencias',
  titulo: 'Por qué', destaque: 'callamos',
  bajada: 'El grupo, el rango, la estrategia y la cortesía tapan las diferencias.',
  inicio: 'el silencio empieza cuando',
  frases: [
    'una diferencia', 'inevitables y valiosas', 'perder estatus', 'educación en línea', 'repetía lo que había dicho', 'desechaba su idea', 'consenso',
    'pérdida de tiempo', 'el rango', 'linda', 'robert', 'así se hace aquí', 'no dijo nada más', 'por estrategia', 'don', 'buen bono', 'en el pie',
    'los jefes también callan', 'cortesía', 'olvidó la conversación', 'la gerencia no escucha', 'la rotación', 'mayor error',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Falso consenso', texto: 'Cada directivo repetía al anterior; celebraron un acuerdo que en privado nadie sentía.', frase: 'consenso' },
    { rotulo: 'El rango', texto: '«Así se hace aquí.» Linda calló, la historia corrió y la rotación se disparó.', frase: 'el rango', destacada: true },
    { rotulo: 'Estrategia y cortesía', texto: 'Callar para el bono, o callar una crítica por amabilidad: también los jefes callan.', frase: 'por estrategia' },
  ],
  pregunta: { frase: 'qué le respondes', texto: '¿Qué le respondes tú a alguien de tu equipo que trae un problema que te parece menor?' },
};

export const espiral: Pagina = {
  id: 'ce2-espiral',
  titulo: 'La espiral', destaque: 'del silencio',
  bajada: 'Cada silencio trae más miedo y más silencio.',
  inicio: 'callar no resuelve nada',
  frases: [
    'bajo la superficie', 'la ansiedad', 'nos distanciamos', 'más miedo de hablar', 'más desconfianza', 'espiral del silencio', 'maria', 'max',
    'primera presentación', 'volvió a callar', 'con tibieza', 'perdió el valor', 'quedaron destruidas', 'la ironía', 'distancia insalvable', 'shoney',
    'como a un asistente', 'dejó de colaborar', 'trabajo duplicado', 'la velocidad', 'el granjero', 'si va despacio', 'si va rápido', 'las manzanas',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'La espiral', texto: 'Callar trae ansiedad y distancia, y eso da más miedo de hablar: más silencio, más desconfianza.', frase: 'espiral del silencio', destacada: true },
    { rotulo: 'Maria y Max', texto: 'Calló para proteger la relación, y el silencio creó una distancia insalvable.', frase: 'maria' },
    { rotulo: 'La velocidad', texto: 'La prisa nos hace callar, y lo callado exige aún más prisa: como el granjero y sus manzanas.', frase: 'la velocidad' },
  ],
  pregunta: { frase: 'qué diferencia con un colega', texto: '¿Qué diferencia con un colega o con tu jefe llevas tiempo guardando para proteger la relación?' },
};

export const romper: Pagina = {
  id: 'ce2-romper',
  titulo: 'Romper', destaque: 'la espiral',
  bajada: 'Valor individual y un contexto que valore las diferencias.',
  inicio: 'romper la espiral exige',
  frases: [
    'valor individual', 'harry', 'más de 500 soldados', 'dos tercios', 'la culpa fue mía', 'les fallé', 'nick', 'me quedé dormido',
    'en lugar de castigarlo', 'agotamiento', 'buen soldado', 'tres prácticas', 'reconoce tu poder', 'también te necesita', 'linda',
    'actúa de forma distinta', 'preguntas difíciles', 'forma una coalición', 'nancy hopkins', 'una carta', '14 de las 15', 'un comité',
    'momentos para callar', 'conviene callar',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'El comandante Harry', texto: '«La culpa fue mía.» Su confesión permitió que Nick admitiera que se había dormido.', frase: 'harry', destacada: true },
    { rotulo: 'Tres prácticas', texto: 'Reconoce tu poder, actúa distinto a lo habitual y forma una coalición.', frase: 'tres prácticas' },
    { rotulo: 'La pregunta cambia', texto: 'No es si conviene hablar, sino si esta es una de las raras veces en que conviene callar.', frase: 'momentos para callar' },
  ],
  pregunta: { frase: 'qué error propio', texto: '¿Qué error propio podrías reconocer primero para que tu equipo se atreva a contar los suyos?' },
};

export const coraje: Pagina = {
  id: 'ce2-coraje',
  titulo: 'Valientes,', destaque: 'pero competentes',
  bajada: 'La mayoría de los actos de valor no los hacen mártires.',
  inicio: 'las historias de coraje',
  frases: [
    'aislado o despedido', 'james detert', 'no los hacen mártires', 'personas respetadas', 'lo correcto', 'ganan prestigio', 'martha', 'doble sentido',
    'reunión del personal', 'dispuesta a renunciar', 'la incomodaba', 'una igual', 'estaba fallando', 'temía que la despidiera', 'se disculpó',
    'la felicitó', 'formalmente', 'un año después', 'vicepresidenta', 'competentemente valientes', 'preparar el terreno', 'elegir sus batallas',
    'persuadir en el momento', 'seguimiento', 'el riesgo es real',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'No son mártires', texto: 'Personas respetadas que actúan porque es lo correcto y, si lo gestionan bien, ganan prestigio.', frase: 'no los hacen mártires' },
    { rotulo: 'Martha', texto: 'Le dijo a su jefe que su conducta la incomodaba. Él se disculpó y un año después ella era vicepresidenta.', frase: 'martha', destacada: true },
    { rotulo: 'Cuatro conductas', texto: 'Preparar el terreno, elegir las batallas, persuadir en el momento y hacer seguimiento.', frase: 'competentemente valientes' },
  ],
  pregunta: { frase: 'qué situación', texto: '¿Qué situación en tu equipo comercial está pidiendo hoy que alguien se atreva a decir algo?' },
};

export const terreno: Pagina = {
  id: 'ce2-terreno',
  titulo: 'Preparar el terreno', destaque: 'y elegir la batalla',
  bajada: 'Una reserva de buena voluntad, la pregunta correcta y el momento justo.',
  inicio: 'preparar el terreno significa',
  frases: [
    'reputación de excelencia', 'créditos de idiosincrasia', 'buena voluntad', 'gastar', 'catherine gill', 'root capital', 'sesgo involuntario',
    'dos años', 'no era un tema de género', 'cambios concretos', 'reducir el costo', 'franco bernabè', 'privilegios', 'elegir las batallas',
    'realmente importante', 'momento adecuado', 'mandy', 'proveedor', 'lazos antiguos', 'seis meses', 'reunió evidencia', 'proveedores alternativos',
    'cuantificó', 'de forma positiva', 'una crisis', 'tachi yamada',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Créditos de idiosincrasia', texto: 'Buena voluntad ganada con competencia que puedes gastar al desafiar una norma.', frase: 'créditos de idiosincrasia', destacada: true },
    { rotulo: 'Catherine Gill', texto: 'Dos años rindiendo y siendo justa antes de plantear el sesgo. La escucharon.', frase: 'catherine gill' },
    { rotulo: 'Elegir la batalla', texto: '¿Es importante? ¿Es el momento? Mandy esperó seis meses y llegó con evidencia y alternativas.', frase: 'elegir las batallas' },
  ],
  pregunta: { frase: 'qué evidencia', texto: '¿Qué evidencia necesitarías reunir antes de plantear ese cambio que te parece urgente?' },
};

export const actuar: Pagina = {
  id: 'ce2-actuar',
  titulo: 'Persuadir', destaque: 'y hacer seguimiento',
  bajada: 'Enmarcar en lo que importa al otro, datos y calma; después, agradecer o reparar.',
  inicio: 'en el momento de actuar',
  frases: [
    'enmarcan su propuesta', 'los datos', 'las emociones', 'mel exon', 'unidad interna de innovación', 'no era innovador', 'oveja negra',
    'ese orgullo', 'ideas rompedoras', 'explorador de avanzada', 'lo aprobaron', 'el adn', 'erik', 'negocio solar', 'aquí no hacemos eso',
    'anzuelo emocional', 'miedo a lo desconocido', 'con datos', 'el seguimiento', 'compartir el crédito', 'reparar relaciones', 'unos 30 líderes',
    'en privado', 'evolución', 'persistir', 'fred keller', 'asistencia social', 'fracasó dos veces', 'trabajadora social', 'modelo reconocido',
    'actos pequeños', 'valores a la vista',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Mel Exon', texto: 'Conectó su unidad de innovación con el orgullo rebelde de la oveja negra. La aprobaron.', frase: 'mel exon', destacada: true },
    { rotulo: 'Erik', texto: 'Ante «aquí no hacemos eso», no mordió el anzuelo: calma y datos.', frase: 'erik' },
    { rotulo: 'Seguimiento', texto: 'Compartir el crédito, reparar relaciones y persistir, como Fred Keller tras dos fracasos.', frase: 'el seguimiento' },
  ],
  pregunta: { frase: 'qué acto pequeño', texto: '¿Qué acto pequeño de coraje podrías practicar esta semana con un colega al que respetas?' },
};
