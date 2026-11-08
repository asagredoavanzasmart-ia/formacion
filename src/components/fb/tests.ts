import type { QuizQ } from '../slideKit';

/* Tests de «Feedback en equipos: dar y recibir» (no se narran). La respuesta correcta se escribe
   siempre en la posición 1 y `repartir` la mueve con una secuencia fija. */

const FB_BASICO_BASE: QuizQ[] = [
  {
    q: '¿Cuáles son los tres tipos de feedback?',
    options: ['Positivo, negativo y neutro', 'Agradecimiento, coaching y evaluación', 'Formal, informal y anónimo', 'Oral, escrito y digital'],
    answer: 1,
    why: 'Cada uno responde a una necesidad distinta; cuando se mezclan, la evaluación tapa a los otros dos.',
  },
  {
    q: 'Según el estudio con personas expertas y novatas, ¿qué feedback motiva más a un experto?',
    options: ['El elogio', 'La crítica sobre lo que hace mal', 'Ningún feedback', 'Un premio en dinero'],
    answer: 1,
    why: 'Con feedback negativo, los expertos donaron 8,53 dólares frente a 1,24 de los novatos; con positivo se dio vuelta.',
  },
  {
    q: '¿Qué proporción de interacciones positivas por cada negativa se observa en las relaciones que funcionan?',
    options: ['Una a una', 'Cinco a una', 'Diez a una', 'Dos a una'],
    answer: 1,
    why: 'No significa cinco elogios antes de cada crítica: la cuenta de confianza debe tener saldo a favor cuando llega lo difícil.',
  },
  {
    q: '¿Cuándo conviene esperar antes de dar feedback?',
    options: ['Cuando la persona va a usar pronto esa habilidad', 'Cuando el tema es solo tu preferencia personal', 'Cuando un buen trabajo merece reconocimiento', 'Cuando el problema afecta al equipo'],
    answer: 1,
    why: 'Como con Sarah: si el resultado es bueno y solo te molesta el estilo, el feedback impone tu preferencia y resta credibilidad.',
  },
  {
    q: '¿Qué estructura ayuda a describir un problema sin suponer intenciones?',
    options: ['Elogio, crítica, elogio', 'Situación, comportamiento e impacto', 'Causa, culpa y castigo', 'Objetivo, plazo y bono'],
    answer: 1,
    why: 'Describe lo observable y su consecuencia, sin adjetivos como «flojo» o «poco proactivo».',
  },
  {
    q: 'Al cerrar una conversación de feedback, ¿qué confirma que la persona entendió el plan?',
    options: ['Que diga que está de acuerdo', 'Que lo explique con sus propias palabras', 'Que firme un documento', 'Que no haga preguntas'],
    answer: 1,
    why: 'Si puede repetirlo, entendió; si no, se corrige en el momento y se evita una segunda conversación.',
  },
  {
    q: '¿Cómo se debe elogiar para que la persona acepte desafíos?',
    options: ['Elogiando su talento', 'Elogiando su esfuerzo', 'Elogiando solo en público', 'Elogiando antes de cada crítica'],
    answer: 1,
    why: 'Los niños elogiados por su esfuerzo eligieron el rompecabezas difícil; los elogiados por su inteligencia, el fácil.',
  },
  {
    q: '¿Cuáles son los tres disparadores que bloquean la recepción del feedback?',
    options: ['Miedo, enojo y tristeza', 'Verdad, relación e identidad', 'Tiempo, lugar y tono', 'Jefe, pares y clientes'],
    answer: 1,
    why: 'Verdad: «eso no es así». Relación: «¿quién eres tú para decirme eso?». Identidad: «entonces no sirvo».',
  },
  {
    q: '¿Qué frase reemplaza a «eso está mal» al recibir feedback?',
    options: ['«Lo tendré en cuenta»', '«Cuéntame más»', '«No estoy de acuerdo»', '«Gracias, lo pienso»'],
    answer: 1,
    why: 'Primero se entiende de dónde viene el comentario y qué propone; después se decide.',
  },
  {
    q: '¿Qué pregunta ayuda a recibir feedback útil y específico?',
    options: ['«¿Tienes algún feedback para mí?»', '«¿Qué es una cosa que me ves hacer que me juega en contra?»', '«¿Lo hice bien?»', '«¿Qué opinas de mí?»'],
    answer: 1,
    why: 'Es concreta, da permiso para ser honesto y obliga a priorizar.',
  },
];

const FB_AVANZADO_BASE: QuizQ[] = [
  {
    q: 'Un vendedor nuevo cerró su primera reunión con errores menores. ¿Cuál es el mejor enfoque?',
    options: ['Señalar todos los errores para que aprenda rápido', 'Reforzar con detalle lo que hizo bien y corregir solo lo más importante', 'No decir nada hasta la evaluación', 'Comparar su resultado con el de la estrella del equipo'],
    answer: 1,
    why: 'Al novato el elogio le confirma el camino; la crítica le sirve más al experto.',
  },
  {
    q: 'Antes de hablar con un gerente que «no delega», ¿qué evita un encuadre estrecho?',
    options: ['Llevar la conclusión decidida', 'Escribir tres explicaciones posibles de lo que observaste', 'Hacer preguntas que lo lleven a tu respuesta', 'Hablar con su equipo en su contra'],
    answer: 1,
    why: 'Quizás no sabe delegar, su equipo no está listo o recibe señales de que no puede equivocarse. Abrir el encuadre evita la pelea.',
  },
  {
    q: 'Un integrante llega tarde todos los días. ¿Qué haces primero?',
    options: ['Aplicar una sanción', 'Buscar la causa de fondo antes de elegir entre incentivo, consecuencia o alternativa', 'Ignorarlo si cumple', 'Comentarlo en la reunión de equipo'],
    answer: 1,
    why: 'Un trayecto largo pide una alternativa de horario; la desmotivación, otra conversación. Cada causa pide una solución distinta.',
  },
  {
    q: 'Supervisas cada vez más a alguien y cada vez propone menos. ¿Qué está pasando probablemente?',
    options: ['Le falta talento', 'La síndrome del fracaso inevitable: tu control confirma la imagen que tienes de él', 'Quiere renunciar por el sueldo', 'Necesita más reglas'],
    answer: 1,
    why: 'Se revierte en una conversación sobre la relación, preguntando qué haces tú que le hace las cosas más difíciles.',
  },
  {
    q: 'Debes decirle a alguien conocido por gritar que no lo recomendarás. ¿Qué funciona?',
    options: ['Mandar un correo para evitar el mal rato', 'Contenido claro, tono neutro y frases equilibradas, repitiendo la idea si la desvía', 'Igualar su dureza', 'Pedir disculpas y decir que eres solo la mensajera'],
    answer: 1,
    why: 'Tu trabajo no es que se vaya contento, sino que la información le llegue.',
  },
  {
    q: 'Tu mejor vendedora trabaja a un ritmo insostenible y se ofende cuando se lo dices. ¿Qué cambia la conversación?',
    options: ['Exigirle que reduzca horas', 'Conectar el feedback con su propia meta de carrera', 'Dejar de darle feedback', 'Bajarle la evaluación'],
    answer: 1,
    why: 'Si quiere ser gerente, una agenda siempre al límite le impide atender urgencias y dar el ejemplo que su equipo necesita.',
  },
  {
    q: 'Operaciones critica los pedidos incompletos de un vendedor y él responde que operaciones nunca cumple fechas. ¿Qué haces?',
    options: ['Resolver primero quién tiene razón', 'Separar los dos carriles: ver un tema primero y el otro después', 'Cerrar la reunión', 'Escalar al gerente'],
    answer: 1,
    why: 'Cambiar de carril deja dos temas en la mesa y ninguno se resuelve.',
  },
  {
    q: 'Ventas promete fechas y operaciones protege la capacidad, y chocan cada semana. ¿Dónde está el problema?',
    options: ['En las personas', 'En el sistema: roles e incentivos que empujan en direcciones opuestas', 'En el cliente', 'En la falta de reuniones'],
    answer: 1,
    why: 'Al ver el sistema se buscan ajustes, como una fecha de corte acordada o un formato de pedido completo, en lugar de culpables.',
  },
  {
    q: 'Recibiste un «cumple expectativas» que te decepcionó. ¿Qué hace una identidad de crecimiento?',
    options: ['Pensar que no sirves para el puesto', 'Buscar dentro de la evaluación el coaching: qué falta para el siguiente nivel', 'Ignorar la evaluación', 'Reclamar a recursos humanos'],
    answer: 1,
    why: 'Convierte la crítica en dato, no en sentencia, y devuelve el comentario a su tamaño real.',
  },
  {
    q: '¿Qué ritual instala el feedback como responsabilidad del equipo y no solo del jefe?',
    options: ['Una evaluación anual más larga', 'Rondas en que cada persona dice a cada compañero una cosa que valora y una que le serviría hacer distinto', 'Un buzón anónimo de quejas', 'Reuniones solo cuando hay problemas'],
    answer: 1,
    why: 'Cuando varios coinciden, el mensaje llega con una fuerza que ningún jefe logra solo.',
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
export const FB_BASICO = repartir(FB_BASICO_BASE);
export const FB_AVANZADO = repartir(FB_AVANZADO_BASE);
