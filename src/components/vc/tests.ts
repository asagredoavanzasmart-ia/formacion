import type { QuizQ } from '../slideKit';

/* Tests de «Ventas complejas» (no se narran). La respuesta correcta se escribe siempre en la posición 1 y
   `repartir` la mueve con una secuencia fija. */

const VC_BASICO_BASE: QuizQ[] = [
  {
    q: '¿Qué distingue a una venta compleja de una venta simple?',
    options: ['El precio siempre es más alto', 'La propuesta pasa por varias personas que pueden aprobarla o vetarla antes de la decisión', 'Hay un solo comprador, pero muy exigente', 'Solo ocurre con clientes particulares'],
    answer: 1,
    why: 'En la venta simple la decisión cabe en una cabeza; en la compleja la propuesta viaja, va y vuelve por varias paradas.',
  },
  {
    q: '¿Qué es un detractor dentro del recorrido de la propuesta?',
    options: ['Un competidor externo', 'Alguien del recorrido que está en contra de que tú ganes, aunque quizás nunca lo conozcas', 'Un cliente que pide descuento', 'Un compañero de tu equipo que no ayuda'],
    answer: 1,
    why: 'Cualquiera que recibe la propuesta puede transformarse en detractor; sin estrategia, ni siquiera llegas a conocerlo.',
  },
  {
    q: '¿Quién es el comprador económico?',
    options: ['Quien usa el producto todos los días', 'Quien libera los fondos y tiene poder de veto; hay uno por objetivo de venta', 'Quien filtra las opciones técnicas', 'Tu coach dentro del cliente'],
    answer: 1,
    why: 'Es el guardián del presupuesto: libera los fondos, asegura el retorno y puede vetar por sí solo.',
  },
  {
    q: 'Según el factor de flotación, ¿qué hace subir la decisión en el organigrama?',
    options: ['La antigüedad del vendedor', 'Más presupuesto relativo, tiempos difíciles, una primera compra o un mayor impacto organizacional', 'Tener más reuniones', 'Una propuesta con más páginas'],
    answer: 1,
    why: 'Presupuesto, condiciones del negocio, experiencia previa e impacto suben o bajan el nivel de quien decide.',
  },
  {
    q: '¿Cuál es la regla de oro para ubicar al comprador económico?',
    options: ['Hablar solo con quien te contactó', 'Cubrir un nivel por encima de donde crees que está', 'Ir siempre directo al gerente general', 'Esperar a que el coach te lo presente'],
    answer: 1,
    why: 'Primero estimas el nivel según tu propia empresa y el riesgo; luego cubres un nivel más arriba y lo confirmas.',
  },
  {
    q: '¿Qué poder tiene el comprador técnico?',
    options: ['Aprobar el cierre por sí solo', 'Puede decir que no, pero no puede dar el sí final', 'Libera los fondos', 'Firma el contrato'],
    answer: 1,
    why: 'Es el portero: filtra y puede vetar; el sí final lo da el comprador económico.',
  },
  {
    q: '¿Qué se le pide a un coach?',
    options: ['Que te presente diciendo que eres el mejor', 'Orientación: cómo hacer que tu solución sea una prioridad', 'Que firme la orden de compra', 'Que negocie el precio por ti'],
    answer: 1,
    why: 'Tú corres las jugadas; el coach te explica la cancha.',
  },
  {
    q: 'En el árbol de las objeciones, ¿qué es el tronco?',
    options: ['El precio', 'El valor percibido', 'El plazo de entrega', 'El contrato'],
    answer: 1,
    why: 'Las objeciones son las ramas; si el valor percibido es muy alto, las ramas se caen solas.',
  },
  {
    q: '¿Cómo se calcula el ciclo normal de ventas?',
    options: ['Con la duración de la venta más rápida', 'Tiempo total dividido por el número de ventas reales', 'Con el promedio de reuniones por cliente', 'Con la meta del trimestre'],
    answer: 1,
    why: 'Es el tiempo real que toma transformar a un desconocido en un cliente recurrente.',
  },
  {
    q: '¿Cuáles son los cuatro modos de respuesta?',
    options: ['Alegría, miedo, ira y sorpresa', 'Crecimiento, problemas, equilibrio y exceso de confianza', 'Prospecto, lead, cliente y socio', 'Alto, medio, bajo y nulo'],
    answer: 1,
    why: 'Salen de cómo percibe el comprador su situación inmediata y lo que cree que pasará si cambia.',
  },
];

const VC_AVANZADO_BASE: QuizQ[] = [
  {
    q: 'En un condominio te recibe el mayordomo, pero decide el comité sin conocerte. ¿Qué corresponde hacer?',
    options: ['Insistir solo con el mayordomo', 'Mapear todo el recorrido y tener una estrategia para cada parada, incluido quien puede ser detractor', 'Bajar el precio para acelerar', 'Mandar la propuesta al comité por correo y esperar'],
    answer: 1,
    why: 'La venta no se gana en una conversación, sino en cada parada del recorrido.',
  },
  {
    q: 'Un analista de compras te asegura que él tiene la última palabra. ¿Qué haces?',
    options: ['Le crees y cierras con él', 'Lo confirmas con preguntas indirectas, como de qué presupuesto saldrán los fondos, o con tu coach', 'Lo saltas y vas directo al gerente', 'Le pides que firme hoy mismo'],
    answer: 1,
    why: 'Muchos compradores técnicos afirman tener la última palabra; conviene confirmar quién libera el dinero.',
  },
  {
    q: 'Es la primera vez que ese cliente te compra y tu solución es nueva para él. ¿Qué pasa con el nivel de decisión?',
    options: ['Baja', 'Sube', 'Se mantiene igual', 'Pasa al comprador usuario'],
    answer: 1,
    why: 'La experiencia previa es una de las cuatro variables: sin historia contigo, la decisión sube.',
  },
  {
    q: 'El comprador económico delega toda la decisión en un ingeniero especialista. ¿Qué te funciona mejor con él?',
    options: ['Ignorarlo porque es solo técnico', 'Especificaciones y ventajas medibles que superen sus exigencias, y ayudarlo a verse como el experto que eligió bien', 'Hablarle solo de precio', 'Apelar a la amistad'],
    answer: 1,
    why: 'Su aprobación es el filtro real; gana si lo ven como el experto que eligió la mejor solución.',
  },
  {
    q: 'Un técnico ve tu solución como una amenaza a su rol. ¿Qué haces?',
    options: ['Lo rodeas y vas directo al económico', 'No lo saltas: descubres por qué teme, le muestras cómo gana y el control que mantiene, y te apoyas en un usuario entusiasta', 'Lo presionas con su jefe', 'Lo ignoras hasta el cierre'],
    answer: 1,
    why: 'Si lo saltas, saboteará la implementación.',
  },
  {
    q: 'Un usuario te cierra el paso al comprador económico. ¿Cuál es el primer paso recomendado?',
    options: ['Rodear el bloqueo de inmediato', 'Ayudarle, para que gane prestigio llevando una solución valiosa', 'Pedir a tu gerente que llame al gerente del cliente', 'Abandonar la cuenta'],
    answer: 1,
    why: 'Primero se ayuda al bloqueador; luego viene la venta en paralelo y, como último recurso, rodearlo.',
  },
  {
    q: 'Vas a pedir una reunión al comprador económico. ¿Qué llevas?',
    options: ['Una demostración completa del producto', 'Una razón de negocio: datos de su futuro, rentabilidad, estabilidad o crecimiento, y casos de éxito', 'El catálogo y la lista de precios', 'Un descuento especial'],
    answer: 1,
    why: 'El económico no quiere demostraciones: quiere conocimiento y visión.',
  },
  {
    q: 'En cada reunión te dicen «me lo tengo que pensar». ¿Qué diagnóstico corresponde?',
    options: ['El precio es demasiado alto', 'Hay un problema de oferta y posicionamiento: el valor percibido no es suficiente', 'El cliente es indeciso por naturaleza', 'Falta insistir más'],
    answer: 1,
    why: 'En B2B casi nunca la objeción real es el precio; con un valor percibido muy alto no hay nada que pensar.',
  },
  {
    q: 'Una persona muy positiva ve hoy tu propuesta como un problema. ¿Cómo lo interpretas?',
    options: ['Es una persona negativa', 'Los modos describen momentos, no personas: quizás falló tu momento', 'Debes descartarla', 'Su personalidad cambió'],
    answer: 1,
    why: 'Lo que manda es cómo percibe su situación inmediata, no su filosofía ni su personalidad.',
  },
  {
    q: 'Al calcular tu ciclo normal aparecen una venta de dos días y varias renovaciones automáticas. ¿Qué haces?',
    options: ['Las incluyes tal cual', 'Las eliminas como anomalías antes de promediar', 'Calculas solo con ellas', 'Duplicas su peso'],
    answer: 1,
    why: 'Una venta de dos días no puede pesar en un promedio de seis meses: la depuración las saca.',
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
export const VC_BASICO = repartir(VC_BASICO_BASE);
export const VC_AVANZADO = repartir(VC_AVANZADO_BASE);
