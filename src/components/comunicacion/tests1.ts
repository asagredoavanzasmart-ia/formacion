import type { QuizQ } from '../slideKit';

/* Tests de la parte 1 de «Comunicación efectiva» (no se narran). */

const CE1_BASICO_BASE: QuizQ[] = [
  {
    q: 'Según Cialdini, ¿por qué persuadir se puede aprender?',
    options: ['Porque es un don que se descubre con práctica', 'Porque se apoya en impulsos humanos profundos que funcionan de maneras predecibles', 'Porque basta con hablar bien', 'Porque depende solo del precio'],
    answer: 1,
    why: 'Cinco décadas de estudios muestran seis principios que llevan a la gente a ceder, aceptar o cambiar.',
  },
  {
    q: 'Una organización de veteranos incluyó etiquetas personalizadas en su carta de donación. ¿Qué principio usó y qué pasó?',
    options: ['Escasez: bajaron las donaciones', 'Reciprocidad: la respuesta pasó del 18 % al 35 %', 'Autoridad: no hubo cambio', 'Simpatía: subió al 20 %'],
    answer: 1,
    why: 'La gente devuelve lo que recibe. Lo sofisticado es dar primero confianza, cooperación o buen trato.',
  },
  {
    q: '¿Qué tres condiciones hacen que un compromiso funcione, según Cialdini?',
    options: ['Que sea secreto, rápido y firmado', 'Que sea activo, público y voluntario', 'Que sea grande, caro y escrito', 'Que lo proponga el vendedor'],
    answer: 1,
    why: 'Lo forzado no compromete: quien cede contra su voluntad sigue pensando lo mismo.',
  },
  {
    q: '¿Qué hizo subir un 34 % el cumplimiento de los pacientes que hacían ejercicios en casa?',
    options: ['Un descuento', 'Exhibir los diplomas del equipo de terapeutas', 'Llamarlos cada semana', 'Reducir los ejercicios'],
    answer: 1,
    why: 'Autoridad: no se engañó a nadie, solo se hizo visible una experiencia real que los pacientes no conocían.',
  },
  {
    q: '¿Qué analogía usaron Karen Fries y Barry Linnett para convencer a Bill Gates?',
    options: ['Un auto y su motor', 'El supermercado de rótulos crípticos frente al restaurante donde te traen el menú', 'Un mapa y una brújula', 'Un iceberg'],
    answer: 1,
    why: 'La evidencia vívida se recuerda: las interfaces eran el supermercado; su producto sería el restaurante.',
  },
  {
    q: 'Según Kimberly Elsbach, ¿cuál de estos es uno de los cuatro estereotipos negativos al presentar una idea?',
    options: ['El showrunner', 'El robot que recita su presentación como un guion memorizado', 'El neófito', 'El artista'],
    answer: 1,
    why: 'Los otros son el pusilánime, el vendedor de autos usados y el caso de caridad. El showrunner, el artista y el neófito son los que triunfan.',
  },
  {
    q: '¿Por qué funcionó la historia mínima de Stephen Denning sobre Zambia?',
    options: ['Por su trama épica', 'Porque dejaba espacio mental para que el público pensara en su propia organización', 'Porque tenía muchos datos', 'Porque era muy larga'],
    answer: 1,
    why: 'Una versión épica habría distraído; él quería que se interesaran por el Banco, no por Zambia.',
  },
  {
    q: '¿Qué tres tipos de conversaciones tensas identifica Holly Weeks?',
    options: ['Venta, cobranza y despido', '«Tengo malas noticias», «¿qué está pasando aquí?» y «¡me estás atacando!»', 'Formal, informal y por escrito', 'Con el jefe, con el par y con el cliente'],
    answer: 1,
    why: 'Evitarlas es tentador, pero casi siempre empeora el problema o la relación.',
  },
  {
    q: '¿Cuáles son los tres ingredientes que propone Weeks para una conversación tensa?',
    options: ['Rapidez, firmeza y humor', 'Claridad, neutralidad y temperancia', 'Datos, historias y emociones', 'Escuchar, ceder y cerrar'],
    answer: 1,
    why: 'Claridad sin eufemismos, un tono neutral y frases moderadas.',
  },
  {
    q: 'Según Garvin y Margolis, ¿qué error comete quien dice «yo en tu lugar haría esto»?',
    options: ['Sobrepasar los límites', 'Aconsejar desde sí mismo, sin considerar cómo siente la situación y qué puede hacer el otro', 'Diagnosticar mal', 'Ninguno: es un buen consejo'],
    answer: 1,
    why: 'En ventas: diagnosticar con preguntas antes de recomendar, y recomendar según lo que el cliente puede hacer.',
  },
];

const CE1_AVANZADO_BASE: QuizQ[] = [
  {
    q: 'Un cliente de Indonesia responde «haremos lo posible» a tu fecha de entrega. ¿Qué recomienda Erin Meyer?',
    options: ['Darlo por confirmado', 'Leerlo como un probable no y preguntar «¿cuánto tardarías en hacerlo?»', 'Exigir un sí o un no', 'Enviar el contrato de inmediato'],
    answer: 1,
    why: 'En culturas donde decir no a quien respetas es una grosería, el no llega por el tono, un silencio extra o un «lo intentaré».',
  },
  {
    q: 'Monica Ruffo convenció a franquiciados que temían por sus márgenes. ¿Cómo?',
    options: ['Defendiendo la postura de la casa matriz', 'Mostrándoles con datos cómo la campaña mejoraría sus propias ganancias', 'Ofreciéndoles un descuento', 'Pidiéndoles confianza'],
    answer: 1,
    why: 'Terreno común: el piloto de Tennessee y el 26 % más de papas y bebidas hablaban del beneficio de ellos.',
  },
  {
    q: 'Tras el mejor año de la empresa, un presidente mostró un piloto feliz volando hacia un muro. ¿Qué falló?',
    options: ['La imagen era poco clara', 'No ajustó su tono al ánimo de la audiencia: esperaban reconocimiento y recibieron un sermón', 'Habló demasiado poco', 'Usó demasiados datos'],
    answer: 1,
    why: 'Debió agradecer primero y exponer sus temores en otra reunión. La esperanza persuade más que el desastre.',
  },
  {
    q: 'Compradores mayoristas de carne subieron sus pedidos un 600 %. ¿Qué los movió?',
    options: ['Un precio más bajo', 'Saber que faltaría carne importada y que nadie más tenía esa información', 'Un testimonio de un par', 'Una garantía extendida'],
    answer: 1,
    why: 'La escasez enmarcada como información exclusiva multiplica el efecto, pero solo funciona si es genuina.',
  },
  {
    q: 'Una vicepresidenta arrancaba compromisos a jefes de área en su peor momento. ¿Por qué no se cumplió ninguno?',
    options: ['Porque los plazos eran cortos', 'Porque los compromisos nunca fueron voluntarios', 'Porque no los puso por escrito', 'Porque eran demasiados'],
    answer: 1,
    why: 'Cialdini insiste en aplicar los principios con ética: la presión no genera compromiso real.',
  },
  {
    q: 'Un pensador analítico es tu comprador. ¿Cómo conviene presentarle?',
    options: ['Con entusiasmo y una sola lámina de resultados', 'Con toda la información, tu metodología del punto A al B, tus dudas y tiempo para decidir', 'Con testimonios de pares', 'Presionando para cerrar hoy'],
    answer: 1,
    why: 'Los pensadores son difíciles de persuadir y nunca olvidan una mala experiencia: necesitan datos, método y espacio.',
  },
  {
    q: 'Un rumor dice que los gerentes «no trabajan de verdad». ¿Qué hizo el nuevo director de la planta de IBM?',
    options: ['Envió un comunicado oficial', 'Se sentó en la línea de montaje con bata blanca, pidió ayuda y respondió con franqueza sobre su sueldo', 'Ignoró el rumor', 'Despidió a quien lo difundía'],
    answer: 1,
    why: 'Una historia negativa se neutraliza con otra positiva y verdadera, como un anticuerpo.',
  },
  {
    q: 'Karen te grita tras una mala presentación. Según Weeks, ¿qué jugada sirve?',
    options: ['Responder «Karen, tranquilízate» con frialdad', 'Nombrar su táctica con calma, sin atacar a la persona', 'Ceder para calmarla', 'Gritar más fuerte'],
    answer: 1,
    why: 'Nombrar una táctica la desarma: seguir usándola exigiría más agresión de la que la persona suele mostrar.',
  },
  {
    q: 'Elizabeth preguntó sin intención «¿eso es todo, entonces?» y Rafael se ofendió. ¿Qué podía decir?',
    options: ['«Perdón, tienes razón, decide tú»', '«Entiendo cómo lo tomaste; no era lo que quise decir. Repasemos la lista»', '«No es mi problema»', 'Nada; mejor callar'],
    answer: 1,
    why: 'Replantear la intención: concede su percepción, alinea palabras e intención y retoma, sin pelear ni apaciguar.',
  },
  {
    q: 'Un cliente te consulta por un problema que se parece mucho a uno que ya resolviste. ¿Qué error advierten Garvin y Margolis?',
    options: ['Cobrar por la consulta', 'Diagnosticar demasiado pronto: las analogías suelen no resistir cuando aparece el problema completo', 'Hacer demasiadas preguntas', 'Pedir una segunda opinión'],
    answer: 1,
    why: 'También advierten que quien consulta puede dar un relato parcial y que callar las preguntas básicas por estatus es un error.',
  },
];

/* Reparte la respuesta correcta entre A, B, C y D con una secuencia fija, para que no se adivine por posición. */
const POS = [2, 0, 3, 1, 1, 3, 0, 2, 3, 0];
const repartir = (qs: QuizQ[]): QuizQ[] => qs.map((q, k) => {
  const destino = POS[k % POS.length] % q.options.length;
  const correcta = q.options[q.answer];
  const resto = q.options.filter((_, j) => j !== q.answer);
  const options = [...resto.slice(0, destino), correcta, ...resto.slice(destino)];
  return { ...q, options, answer: destino };
});
export const CE1_BASICO = repartir(CE1_BASICO_BASE);
export const CE1_AVANZADO = repartir(CE1_AVANZADO_BASE);
