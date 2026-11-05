import type { QuizQ } from '../slideKit';

/* Tests de «Esencialismo: menos, pero mejor» (no se narran). La respuesta correcta se escribe
   siempre en la posición 1 y `repartir` la mueve con una secuencia fija. */

const ES_BASICO_BASE: QuizQ[] = [
  {
    q: '¿Qué resume la frase de Dieter Rams «weniger aber besser»?',
    options: ['Hacer más con menos personas', 'Menos, pero mejor: invertir solo donde tu contribución es más alta', 'Reducir costos a toda costa', 'Trabajar menos horas'],
    answer: 1,
    why: 'El esencialismo no es hacer menos por hacer menos, sino hacer las cosas correctas e invertir allí el tiempo y la energía.',
  },
  {
    q: '¿Qué filtro le permitió a Sam Elliot recuperar la calidad de su trabajo?',
    options: ['Delegar todo en su equipo', 'Preguntarse si cada pedido era lo más importante que debía hacer en ese momento', 'Trabajar los fines de semana', 'Aceptar solo pedidos de su jefe'],
    answer: 1,
    why: 'Si la respuesta no era un sí rotundo, decía que no; terminó con mejor evaluación y uno de los bonos más grandes de su carrera.',
  },
  {
    q: 'En la paradoja del éxito, ¿qué termina destruyendo el éxito?',
    options: ['La competencia', 'La claridad de propósito que lo produjo', 'El presupuesto', 'La motivación del jefe'],
    answer: 1,
    why: 'El éxito trae más opciones, las opciones dispersan el esfuerzo y la dispersión consume la claridad inicial.',
  },
  {
    q: '¿Qué llamó Joseph Juran «la ley de las pocas cosas vitales»?',
    options: ['Que todos los problemas pesan igual', 'Que resolver una pequeña fracción de los problemas mejora en gran medida la calidad', 'Que hay que contratar más inspectores', 'Que la calidad depende del precio'],
    answer: 1,
    why: 'Es la regla del ochenta veinte aplicada a la calidad; Japón la adoptó y cambió el significado de «hecho en Japón».',
  },
  {
    q: '¿Por qué fracasó Continental Lite frente a Southwest?',
    options: ['Porque tenía tarifas más altas', 'Porque quiso copiarla sin renunciar a su modelo anterior', 'Porque no tenía aviones', 'Porque eliminó la clase turista'],
    answer: 1,
    why: 'Porter lo llama mezclar estrategias: terminó con retrasos, cancelaciones y mil quejas al día.',
  },
  {
    q: '¿Qué hace Frank O\'Brien el primer lunes de cada mes?',
    options: ['Revisa los resultados financieros', 'Reúne a toda la empresa un día sin teléfonos, correo ni agenda, solo para pensar', 'Despide al empleado con peor desempeño', 'Visita a sus clientes principales'],
    answer: 1,
    why: 'Es espacio para explorar; y si alguien no puede ir por exceso de trabajo, es señal de ineficiencia o de falta de personal.',
  },
  {
    q: 'Según Charles Czeisler, ¿a qué equivalen veinticuatro horas sin dormir?',
    options: ['A un día de vacaciones perdido', 'A un deterioro similar a 0,1 % de alcohol en la sangre', 'A una semana de estrés', 'A nada, si se toma café'],
    answer: 1,
    why: 'Por eso proteger el sueño es proteger el activo con el que el equipo contribuye.',
  },
  {
    q: '¿Qué propone la regla del noventa por ciento?',
    options: ['Trabajar al noventa por ciento de la capacidad', 'Si una opción no llega a noventa sobre cien en el criterio clave, se rechaza', 'Aceptar el noventa por ciento de los pedidos', 'Terminar el noventa por ciento de cada tarea'],
    answer: 1,
    why: 'Convertir el sesenta o el setenta en cero evita quedarse atrapado en opciones mediocres.',
  },
  {
    q: '¿Qué principio del Manifiesto Ágil (2001) cita McKeown en Sin esfuerzo?',
    options: ['Entregar todo lo que pida el cliente', 'La simplicidad, el arte de maximizar la cantidad de trabajo no hecho', 'Documentar cada paso del proceso', 'Planificar a cinco años'],
    answer: 1,
    why: 'Lo que no se hace no consume tiempo ni genera errores: el camino fácil debe ser también el correcto.',
  },
  {
    q: 'Según Trout y Rivkin, ¿qué conviene hacer cuando alguien usa jerga que no entiendes?',
    options: ['Asentir para no quedar mal', 'Decir «no lo entiendo» y pedir que se traduzca a lenguaje llano', 'Buscarlo después en internet', 'Usar la misma jerga para estar a la altura'],
    answer: 1,
    why: 'En la reunión con la agencia de diseño nadie había entendido, pero nadie lo dijo; la complejidad suele esconder falta de claridad.',
  },
];

const ES_AVANZADO_BASE: QuizQ[] = [
  {
    q: 'Tu equipo maneja cinco «prioridades número uno». ¿Qué diagnóstico haría McKeown?',
    options: ['Que el equipo es muy ambicioso', 'Que en la práctica ninguna es prioridad: la palabra nació en singular', 'Que faltan personas', 'Que hay que repartir el tiempo en partes iguales'],
    answer: 1,
    why: 'Es el caso de Pri-1 a Pri-5: muchas cosas parecen prioridad y ninguna lo es. Si no las ordenas tú, alguien más lo hará.',
  },
  {
    q: 'Tu equipo tiene un proceso de aprobación de ocho pasos. ¿Qué haría McKeown, siguiendo el caso del pago en un clic de Amazon?',
    options: ['Optimizar cada paso por separado', 'Escribir todos los pasos y preguntar qué pasaría si cada uno no existiera', 'Agregar un paso de control final', 'Comprar un software más completo'],
    answer: 1,
    why: 'Peri Hartman optimizaba cada paso del pago; Bezos lo redujo a uno solo. La pregunta es «¿y si esto pudiera ser fácil?».',
  },
  {
    q: 'Al definir un objetivo esencial, ¿qué combinación busca McKeown?',
    options: ['Inspirador y genérico', 'Inspirador y concreto, que responda cómo sabremos que terminamos', 'Concreto y trimestral', 'Breve y con valores'],
    answer: 1,
    why: 'Como «que todos en el Reino Unido estén conectados a internet a fines de 2012». La misión de Volvo, en cambio, tenía 130 palabras y «seguridad» aparecía en la 126.',
  },
  {
    q: 'Tu jefe te pide un proyecto más cuando ya estás al límite. ¿Qué respuesta del repertorio hace visible la concesión?',
    options: ['«Lo intento»', '«Sí, ¿qué dejo de priorizar para hacerlo?»', '«Déjame ver mi agenda» y no responder', 'Aceptar y trabajar de noche'],
    answer: 1,
    why: 'Obliga a decidir qué pasa a segundo plano; un no claro es más amable que un sí vago.',
  },
  {
    q: 'En el estudio de las tazas de Kahneman, quienes tenían la taza pedían 5,25 dólares y quienes no, ofrecían de 2,25 a 2,75. ¿Qué táctica corrige ese sesgo en un equipo?',
    options: ['Pedir más presupuesto', 'Preguntarse cuánto haría el equipo por entrar a un proyecto si todavía no estuviera en él', 'Terminar todo lo que se empezó', 'Votar en asamblea'],
    answer: 1,
    why: 'Es el efecto de dotación: valoramos más lo que ya es nuestro. Fingir que aún no lo tenemos lo neutraliza.',
  },
  {
    q: 'Un ejecutivo dejó de publicar un informe semanal y nadie lo echó de menos en varias semanas. ¿Qué técnica aplicó?',
    options: ['Presupuesto base cero', 'Piloto de reversa', 'Regla del noventa por ciento', 'Contrato social'],
    answer: 1,
    why: 'Se quita una actividad durante un tiempo y se observa si alguien la necesita; si no, se elimina.',
  },
  {
    q: 'Unos estudiantes estimaron su tesis en 27,4 días en el mejor caso y 48,6 en el peor; tardaron 55,5. ¿Qué colchón propone McKeown?',
    options: ['Diez por ciento', 'Cincuenta por ciento', 'Ninguno: hay que exigir más', 'El doble exacto'],
    answer: 1,
    why: 'La falacia de la planificación hace que incluso el peor escenario se quede corto; solo el treinta por ciento terminó a tiempo.',
  },
  {
    q: '¿Qué enseña el caso de Herbie en La meta?',
    options: ['Que hay que dejar atrás al más lento', 'Que mejorar el cuello de botella acelera a todo el sistema', 'Que todos deben ir a su propio ritmo', 'Que hay que mejorar todas las partes a la vez'],
    answer: 1,
    why: 'Es la teoría de las restricciones: si el obstáculo principal no se mueve, mejorar el resto no cambia el resultado.',
  },
  {
    q: 'El equipo de soporte responde cada semana la misma consulta. ¿Qué enseña el caso de Expedia?',
    options: ['Contratar más personas para atender', 'Atacar la causa una vez: con autoservicio, las llamadas bajaron de 58 a 15 de cada 100 clientes', 'Medir mejor el tiempo de respuesta', 'Cobrar por cada llamada'],
    answer: 1,
    why: 'Prevenir elimina lo que se repite; un colchón solo absorbe lo inesperado. Se pregunta qué acción de pocos minutos lo resolvería de raíz.',
  },
  {
    q: 'En PayPal, ¿cómo aplicó Peter Thiel el empoderamiento con claridad?',
    options: ['Dando libertad total sin metas', 'Asignando a cada empleado exactamente una prioridad', 'Evaluando por horas trabajadas', 'Rotando a las personas cada mes'],
    answer: 1,
    why: 'Se negaba a hablar de otra cosa y la evaluación anual pedía la contribución individual más valiosa: claridad es igual a éxito.',
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
export const ES_BASICO = repartir(ES_BASICO_BASE);
export const ES_AVANZADO = repartir(ES_AVANZADO_BASE);
