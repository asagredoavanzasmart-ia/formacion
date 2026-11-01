import type { QuizQ } from '../../slideKit';

/* Tests de la parte 2 de «Comunicación efectiva» (no se narran). */

const CE2_BASICO_BASE: QuizQ[] = [
  {
    q: 'Según John Hamm, ¿qué pasa cuando un líder repite frases como «el cliente es primero» sin definirlas?',
    options: ['Todos entienden lo mismo', 'Cada gerente asiente, no pregunta y su equipo inventa su propia interpretación', 'Mejora la motivación', 'Se acelera la ejecución'],
    answer: 1,
    why: 'Por miedo a parecer tontos, los gerentes no piden aclaración y bajan órdenes vagas; el resultado es tiempo perdido y rumores.',
  },
  {
    q: '¿Cuáles son las cinco palancas del líder según Hamm?',
    options: ['Precio, producto, plaza, promoción y personas', 'Estructura, resultados financieros, su propio trabajo, el tiempo y la cultura', 'Visión, misión, valores, metas y premios', 'Ventas, marketing, finanzas, operaciones y personas'],
    answer: 1,
    why: 'Las compara con las palancas de un maquinista: cada una se mueve con comunicación clara.',
  },
  {
    q: '¿Cómo trató John Adler, de Adaptec, una meta no alcanzada?',
    options: ['Buscó culpables', 'Como diagnóstico: analizó causas sin culpar y encontró un problema de calidad', 'Presionó más a ventas', 'Cambió la meta en silencio'],
    answer: 1,
    why: 'Tratar los resultados como diagnóstico y no como castigo llevó a Adaptec de 100 millones a más de 5 000 millones de dólares.',
  },
  {
    q: '¿Cuáles son los cuatro elementos de la conversación organizacional de Groysberg y Slind?',
    options: ['Claridad, brevedad, frecuencia y tono', 'Intimidad, interactividad, inclusión e intencionalidad', 'Escuchar, preguntar, resumir y cerrar', 'Datos, historias, emociones y acción'],
    answer: 1,
    why: 'Permiten que una empresa grande funcione como una pequeña: flexible, comprometida y alineada.',
  },
  {
    q: 'Según Perlow y Williams, ¿qué es la espiral del silencio?',
    options: ['Una técnica para negociar', 'Cada vez que callamos crecen la ansiedad y la distancia, lo que da más miedo de hablar y trae más silencio', 'Un tipo de reunión', 'El silencio estratégico ante un cliente'],
    answer: 1,
    why: 'Callar empuja las diferencias bajo la superficie, donde crecen hasta volverse caras.',
  },
  {
    q: '¿Qué permitió que Nick, el explorador, confesara que se había dormido?',
    options: ['Una amenaza de castigo', 'Que el comandante Harry reconociera primero su propia culpa', 'Una encuesta anónima', 'Una orden directa'],
    answer: 1,
    why: 'Sin la confesión inicial de Harry, Nick jamás habría hablado.',
  },
  {
    q: '¿Qué son los créditos de idiosincrasia?',
    options: ['Un bono por desempeño', 'Una reserva de buena voluntad, ganada con competencia y buena integración, que puedes gastar al desafiar una norma', 'Un tipo de evaluación 360', 'Las excepciones que da recursos humanos'],
    answer: 1,
    why: 'Preparar el terreno durante meses o años permite que te escuchen cuando planteas algo difícil.',
  },
  {
    q: 'Según Heen y Stone, ¿quién decide si una crítica produce un cambio?',
    options: ['Quien la da', 'Quien la recibe', 'Recursos humanos', 'El jefe del jefe'],
    answer: 1,
    why: 'Las empresas entrenan a quien da la retroalimentación, pero quien la recibe decide si la deja entrar.',
  },
  {
    q: '¿Cuál de estas preguntas sigue el consejo de «pedir una sola cosa»?',
    options: ['«¿Tienes algún comentario para mí?»', '«¿Qué me ves hacer, o dejar de hacer, que me frena?»', '«¿Lo hice bien?»', '«¿Cómo me evalúas del 1 al 10?»'],
    answer: 1,
    why: 'Una pregunta enorme invita a la crítica sin foco; una concreta da algo con qué trabajar.',
  },
  {
    q: 'Toegel y Barsoux proponen anticipar el conflicto con cinco conversaciones. ¿Sobre qué?',
    options: ['Metas, roles, plazos, presupuesto y riesgos', 'Cómo nos vemos, actuamos, hablamos, pensamos y sentimos', 'Clientes, productos, precios, canales y competencia', 'Pasado, presente, futuro, fortalezas y debilidades'],
    answer: 1,
    why: 'Cada persona empieza con «en mi mundo…» y pregunta «¿en tu mundo…?», sin juzgar el origen de las diferencias.',
  },
];

const CE2_AVANZADO_BASE: QuizQ[] = [
  {
    q: 'Debes anunciar un cambio de territorios. ¿Qué haría el director de software que describe Hamm?',
    options: ['Soltar la idea de a poco para no alarmar', 'Explicar por qué, mostrar el nuevo mapa, dar un plazo breve para reaccionar y empezar ese mismo día', 'Anunciarlo por correo un viernes', 'Esperar a que pase el trimestre'],
    answer: 1,
    why: 'La cautela de Fiorina hizo temible la reorganización y costó doce semanas; la claridad y un plazo acotado ordenan.',
  },
  {
    q: 'Un gerente comercial presiona en la novena semana con «no me importa cómo». ¿Qué riesgo describe Hamm?',
    options: ['Que el equipo se desmotive un poco', 'Que la fuerza de ventas rellene el canal, haya que recalcular resultados y los ingresos se estanquen', 'Que suban los costos de marketing', 'Ninguno, si se cumple la meta'],
    answer: 1,
    why: 'Empujar producto a los distribuidores sin demanda real infla un trimestre y daña los siguientes.',
  },
  {
    q: 'Mark King no podía mover la fecha del aniversario 25. ¿Qué hizo?',
    options: ['Pidió más presupuesto', 'Cambió la meta: un solo palo que mostrara la nueva tecnología', 'Lanzó la línea completa incompleta', 'Postergó el lanzamiento'],
    answer: 1,
    why: 'El tiempo era un dato fijo; elegir bien dentro de él llevó el palo a la mitad de los profesionales.',
  },
  {
    q: 'James Rogers pidió a sus empleados que lo calificaran de la A a la F y menos de la mitad le puso A. ¿Qué elemento de la conversación organizacional ilustra?',
    options: ['Intencionalidad', 'Intimidad: escuchar incluye aceptar la crítica directa de quienes trabajan para ti', 'Inclusión', 'Interactividad tecnológica'],
    answer: 1,
    why: 'En vez de molestarse, repitió el ejercicio con regularidad: confianza, escucha y algo personal.',
  },
  {
    q: '¿Para qué sirvió el «mercado» con 22 puestos que montó Kingfisher en Barcelona?',
    options: ['Para vender productos', 'Para que las unidades compartieran prácticas y se alinearan como un solo equipo', 'Para evaluar a los ejecutivos', 'Para recortar costos'],
    answer: 1,
    why: 'Era una conversación ruidosa, pero con un propósito claro: la intencionalidad cierra el diálogo en acciones alineadas.',
  },
  {
    q: 'Linda le dijo a Robert que su equipo era evaluado injustamente y él respondió «así se hace aquí». ¿Qué práctica le habría servido a Linda después?',
    options: ['Renunciar de inmediato', 'Reconocer su poder: volver, decir que para su equipo sí importaba y pedirle que explicara su punto de vista', 'Quejarse con sus pares', 'Esperar a que Robert cambiara'],
    answer: 1,
    why: 'Tu jefe tiene poder formal sobre ti, pero también te necesita. El silencio de Linda terminó en rotación.',
  },
  {
    q: 'Mandy encontró un proveedor deshonesto con lazos antiguos con la empresa. ¿Por qué tuvo éxito?',
    options: ['Porque lo denunció de inmediato', 'Porque eligió el momento: esperó seis meses, reunió evidencia, encontró alternativas y cuantificó mejoras', 'Porque tenía un cargo alto', 'Porque el proveedor renunció'],
    answer: 1,
    why: 'Elegir la batalla exige preguntarse si es importante y si es el momento adecuado.',
  },
  {
    q: 'Tu jefe comenta una venta perdida y piensas «¿y tú me lo dices?». ¿Qué detonante se activó?',
    options: ['El de la verdad', 'El de la relación', 'El de la identidad', 'Ninguno'],
    answer: 1,
    why: 'El detonante de la relación se dispara por quien da la crítica, no por su contenido.',
  },
  {
    q: 'Un colega le dice a Kara que sea «más asertiva». ¿Qué recomiendan Heen y Stone antes de aceptarlo o rechazarlo?',
    options: ['Aceptarlo para no generar conflicto', 'Desarmarlo: qué significa, de dónde viene y hacia dónde va', 'Pedir una segunda evaluación', 'Ignorarlo'],
    answer: 1,
    why: 'Tras entenderlo, Kara podía concluir que no quería cambiar: sus referentes eran vendedores callados y curiosos.',
  },
  {
    q: 'Según Garvin y Margolis, ¿cuál es el error más común al pedir consejo?',
    options: ['Pedir demasiados consejos', 'Descartarlo: quienes tienen poder ignoraron casi dos tercios de los consejos', 'Pagar por el consejo', 'Pedirlo por escrito'],
    answer: 1,
    why: 'Por eso conviene un directorio personal diverso que te diga lo que no quieres oír.',
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
export const CE2_BASICO = repartir(CE2_BASICO_BASE);
export const CE2_AVANZADO = repartir(CE2_AVANZADO_BASE);
