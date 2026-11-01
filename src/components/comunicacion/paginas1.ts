import type { Pagina } from '../influencia/tipos';

/* Comunicación efectiva · Parte 1 «Vender: la conversación con el cliente».
   Las frases son literales del guion (guiones/comunicacion_parte1_relator.txt): el generador las busca
   en el texto de la sección y toma el tiempo del audio alineado. El orden de `frases` es el de los
   nombres de las marcas de cada escena. */

export const portada: Pagina = {
  id: 'ce1-portada',
  titulo: 'Vender:', destaque: 'la conversación con el cliente',
  bajada: 'Quien vende bien entiende cómo lo está escuchando la persona que tiene delante.',
  inicio: 'quien vende bien no es quien habla más',
  frases: [
    'quien habla más', 'el argumento más brillante', 'cómo lo está escuchando', 'eso se puede aprender',
    'cada reunión comercial es una conversación', 'interpreta', 'juzga', 'y decide', 'mucho más que tus palabras',
    'de harvard y de otras universidades', 'esos mecanismos son predecibles', 'en los primeros minutos', 'qué te hace creíble',
    'qué preguntas abren a un comprador', 'convenza o se hunda', 'no es manipular', 'depender de la suerte',
    'un hecho incómodo', 'lo que el cliente recibe', 'casi nunca coinciden',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Escuchar antes que hablar', texto: 'No gana quien habla más ni quien trae el mejor argumento, sino quien entiende cómo lo escucha el cliente.', frase: 'cómo lo está escuchando' },
    { rotulo: 'Mecanismos predecibles', texto: 'Cómo te evalúan, qué te hace creíble, qué preguntas abren a un comprador y qué mensaje convence.', frase: 'esos mecanismos son predecibles' },
    { rotulo: 'El hecho incómodo', texto: 'Lo que crees transmitir y lo que el cliente recibe casi nunca coinciden.', frase: 'un hecho incómodo', destacada: true },
  ],
  pregunta: { frase: 'qué decide una venta', texto: '¿Qué decide una venta antes de que presentes tu primer argumento?' },
};

export const primeraImpresion: Pagina = {
  id: 'ce1-primera-impresion',
  titulo: 'La', destaque: 'primera impresión',
  bajada: 'Se juega en minutos y casi nunca sale como la planeas: nadie ve tu intención.',
  inicio: 'una primera impresión se juega en minutos',
  frases: [
    'se juega en minutos', 'el caso de gordon', 'tenía la última palabra', 'deberías probarlo', 'tomó un bocado', 'repasó sus logros',
    'no lo contrataron', 'deberías probarlo alguna vez', 'una falta de respeto', 'ilusión de transparencia', 'correlaciones débiles',
    'las emociones fuertes', 'las sutiles no', 'me dolió lo que dijiste', 'no me importó', 'miras al vacío', 'apagar la cafetera',
    'escogerá una explicación', 'son predecibles',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'El almuerzo de Gordon', texto: 'Probó del plato del profesor que decidía su contratación: él lo leyó como una falta de respeto.', frase: 'el caso de gordon' },
    { rotulo: 'Ilusión de transparencia', texto: 'Creemos que nuestra intención se ve y se entiende. Lo fuerte se lee; lo sutil, no.', frase: 'ilusión de transparencia', destacada: true },
    { rotulo: 'Todo gesto se interpreta', texto: 'El otro no sabe por qué haces lo que haces, pero escogerá una explicación.', frase: 'miras al vacío' },
  ],
  pregunta: { frase: 'cuántas veces creíste', texto: '¿Cuántas veces creíste haber dejado clara tu intención ante un cliente, y no era así?' },
};

export const lentes: Pagina = {
  id: 'ce1-lentes',
  titulo: 'Los', destaque: 'tres lentes',
  bajada: 'Quien te conoce te evalúa en dos fases y a través de tres preguntas que intenta responder sobre ti.',
  inicio: 'quien te conoce por primera vez te evalúa',
  frases: [
    'en dos fases', 'rápida y sin pensarlo', 'atajos y estereotipos', 'la segunda fase', 'motivada y no distraída', 'a través de lentes',
    'el lente de la confianza', 'amigo o enemigo', 'tu calidez', 'y tu competencia', 'el lente del poder', 'demuéstrame que me sirves',
    'el lente del ego', 'quién está arriba', 'gordon mostró competencia', 'competencia sin calidez', 'un posible rival poderoso',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Dos fases', texto: 'Una rápida, hecha de atajos y estereotipos; otra lenta, que solo llega si el otro está motivado.', frase: 'en dos fases' },
    { rotulo: 'Confianza, poder y ego', texto: '¿Eres amigo o enemigo? ¿Me sirves? ¿Quién está arriba? Calidez y competencia responden la primera.', frase: 'el lente de la confianza' },
    { rotulo: 'Competencia sin calidez', texto: 'Mostrar solo logros, sin calidez, te hace ver como un posible rival.', frase: 'competencia sin calidez', destacada: true },
  ],
  pregunta: { frase: 'qué vería en ti un comprador', texto: '¿Qué vería en ti un comprador a través de cada uno de esos tres lentes?' },
};

export const corregir: Pagina = {
  id: 'ce1-corregir',
  titulo: 'Corregir', destaque: 'la impresión',
  bajada: 'Evidencia para cada lente y razones para que el otro quiera revisar su juicio.',
  inicio: 'para dejar la impresión correcta',
  frases: [
    'la evidencia adecuada para cada lente', 'ante el lente de la confianza', 'ser alguien de palabra', 'ante el lente del poder',
    'ante el lente del ego', 'crea un nosotros', 'si empezaste mal', 'cumplir el siguiente quizá no baste', 'adelantar cinco plazos',
    'una vía más rápida', 'su deseo de ser justos', 'hacerte necesario', 'dependencia de resultados', 'pierde el control',
    'gordon lo logró', 'comités clave', 'sin probar del plato',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Evidencia por lente', texto: 'Calidez y palabra para la confianza, ayuda con sus metas para el poder, un «nosotros» para el ego.', frase: 'la evidencia adecuada para cada lente' },
    { rotulo: 'Si empezaste mal', texto: 'Un plazo cumplido no basta; cinco adelantados por una semana cada uno sí se notan.', frase: 'si empezaste mal' },
    { rotulo: 'Hazte necesario', texto: 'Quien necesita tu cooperación para lograr lo que quiere se ve obligado a entenderte.', frase: 'hacerte necesario', destacada: true },
  ],
  pregunta: { frase: 'qué podrías darle a un cliente escéptico', texto: '¿Qué podrías darle a un cliente escéptico que no consiga sin ti?' },
};

export const credibilidad: Pagina = {
  id: 'ce1-credibilidad',
  titulo: 'La', destaque: 'credibilidad',
  bajada: 'Antes de que tu argumento pese, el cliente se pregunta si puede confiar en ti.',
  inicio: 'antes de que tu argumento pese',
  frases: [
    'si puede confiar en ti', 'jay conger', 'durante doce años', 'no es empujar una idea', 'aprender de los demás y negociar', 'la credibilidad',
    'la experiencia y las relaciones', 'historial de buen juicio', 'catorce años de campañas', 'siete lanzamientos', 'las relaciones pesan',
    'honesto estable y confiable', 'sobrestima su credibilidad', 'evaluarte con honestidad', 'colegas de confianza',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Persuadir es negociar', texto: 'Para Jay Conger no es empujar una idea, sino aprender de los demás y llegar a una solución compartida.', frase: 'no es empujar una idea' },
    { rotulo: 'Dos fuentes', texto: 'Experiencia: buen juicio y conocimiento. Relaciones: escuchar y actuar en el interés del otro.', frase: 'la experiencia y las relaciones' },
    { rotulo: 'Un dato incómodo', texto: 'La mayoría de los gerentes sobrestima su credibilidad. Contrástala con colegas que te digan la verdad.', frase: 'sobrestima su credibilidad', destacada: true },
  ],
  pregunta: { frase: 'qué nota te pondría hoy un cliente', texto: '¿Qué nota te pondría hoy un cliente en experiencia, y cuál en relación?' },
};

export const construir: Pagina = {
  id: 'ce1-construir',
  titulo: 'Construir', destaque: 'credibilidad',
  bajada: 'La credibilidad que falta se construye, e incluso se compra.',
  inicio: 'cuando falta credibilidad',
  frases: [
    'se puede construir e incluso comprar', 'si flaqueas en experiencia', 'un experto externo o interno', 'informes independientes', 'un proyecto piloto',
    'si flaqueas en relaciones', 'uno a uno', 'suma aliados', 'tom smith', 'lo veían como un forastero', 'contrató a un consultor',
    'las 135 sucursales', 'en ontario', 'iniciativa visible', 'primeros 90 días', 'mucho más hábil', 'la piedra angular',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Si falta experiencia', texto: 'Aprende más, suma un experto, apóyate en informes independientes o lanza un piloto.', frase: 'si flaqueas en experiencia' },
    { rotulo: 'Si faltan relaciones', texto: 'Reuniones uno a uno para escuchar, no para exponer, y aliados que ya tengan buena relación.', frase: 'si flaqueas en relaciones' },
    { rotulo: 'El caso de Tom Smith', texto: 'Un consultor, 135 sucursales visitadas en tres meses y 90 días sin pago: de forastero a banquero hábil.', frase: 'tom smith', destacada: true },
  ],
  pregunta: { frase: 'qué experto qué aliado', texto: '¿Qué experto, qué aliado o qué proyecto piloto podrías sumar para reforzar tu credibilidad en tu próxima venta?' },
};
