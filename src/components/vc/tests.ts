import type { QuizQ } from '../slideKit';

/* Tests de «Ventas complejas» (no se narran). La respuesta correcta se escribe siempre en la posición 1 y
   `repartir` la mueve con una secuencia fija. Las opciones tienen largos parecidos y la correcta nunca es la más
   larga: los distractores dicen casi lo mismo y cambian una palabra clave (la trampa). */

const VC_BASICO_BASE: QuizQ[] = [
  {
    q: '¿Qué distingue a una venta compleja de una venta simple?',
    options: [
      'La propuesta la aprueba una sola persona con mucho poder',
      'La propuesta pasa por varias personas que pueden vetarla',
      'La propuesta pasa por varias personas que solo opinan',
      'La propuesta tiene un precio alto y un plazo de decisión largo',
    ],
    answer: 1,
    why: 'En la compleja la propuesta viaja, va y vuelve por varias paradas, y en cada una alguien puede frenarla. El precio alto no la define.',
  },
  {
    q: '¿Qué es un detractor dentro del recorrido de la propuesta?',
    options: [
      'Alguien de tu equipo que no apoya la venta',
      'Alguien del cliente que no quiere que ganes',
      'Alguien del cliente que siempre pide un descuento',
      'Un competidor que ofrece lo mismo más barato',
    ],
    answer: 1,
    why: 'El detractor está dentro del recorrido del cliente; puede ser cualquiera que recibe la propuesta y quizás nunca lo conozcas.',
  },
  {
    q: '¿Quién es el comprador económico?',
    options: [
      'Quien libera los fondos y puede vetar por sí solo',
      'Quien libera los fondos, pero necesita al comité para vetar',
      'Quien filtra las opciones y puede vetar por sí solo',
      'Quien usa la solución y decide si se renueva',
    ],
    answer: 0,
    why: 'Libera los fondos, asegura el retorno y tiene poder de veto propio; hay uno por cada objetivo de venta.',
  },
  {
    q: 'Según el factor de flotación, ¿cuándo sube el nivel de quien decide?',
    options: [
      'Cuando el negocio va bien y el monto es pequeño',
      'Cuando el monto es alto y los tiempos son malos',
      'Cuando el cliente ya te compró antes lo mismo',
      'Cuando el monto es alto y el cliente ya te conoce bien',
    ],
    answer: 1,
    why: 'Más presupuesto relativo, tiempos difíciles, una primera compra o más impacto suben la decisión; la experiencia previa contigo la baja.',
  },
  {
    q: '¿Cuál es la regla de oro para ubicar al comprador económico?',
    options: [
      'Cubrir un nivel por debajo de donde crees que está',
      'Cubrir un nivel por encima de donde crees que está',
      'Cubrir dos niveles por encima de la persona que te contactó',
      'Cubrir solo el nivel donde está quien te contactó',
    ],
    answer: 1,
    why: 'Estimas el nivel según tu empresa y el riesgo, cubres un nivel más arriba y luego lo confirmas.',
  },
  {
    q: '¿Qué poder tiene el comprador técnico?',
    options: [
      'Puede dar el sí final por sí solo, pero no puede decir que no',
      'Puede decir que no, pero no puede dar el sí final',
      'Puede decir que no y también dar el sí final',
      'No puede decir que no ni dar el sí final',
    ],
    answer: 1,
    why: 'Es el portero: filtra y puede vetar, pero el sí final lo da el comprador económico.',
  },
  {
    q: '¿Qué se le pide a un coach dentro del cliente?',
    options: [
      'Que te recomiende ante su jefe como el mejor proveedor',
      'Que te oriente sobre cómo priorizar tu solución',
      'Que negocie el precio en tu nombre',
      'Que te oriente sobre cómo bajar tu precio para ganar',
    ],
    answer: 1,
    why: 'Tú corres las jugadas; el coach te explica la cancha. No se le pide que te venda ni que negocie por ti.',
  },
  {
    q: 'En el árbol de las objeciones, ¿qué es el tronco?',
    options: [
      'El precio de la oferta',
      'El valor percibido',
      'El valor del contrato',
      'La urgencia del cliente',
    ],
    answer: 1,
    why: 'Las objeciones son las ramas; si el valor percibido es muy alto, las ramas se caen solas.',
  },
  {
    q: '¿Cómo se calcula el ciclo normal de ventas?',
    options: [
      'Tiempo total dividido por las ventas reales',
      'Tiempo total dividido por las oportunidades abiertas',
      'Tiempo de la venta más rápida y la más lenta, promediado',
      'Tiempo total dividido por las reuniones realizadas',
    ],
    answer: 0,
    why: 'Se divide por las ventas que de verdad se cerraron, no por oportunidades ni reuniones, y antes se depuran las anomalías.',
  },
  {
    q: '¿De qué depende el modo de respuesta de un comprador?',
    options: [
      'De su personalidad y de cuánto confía en ti como vendedor',
      'De cómo percibe su situación y lo que pasará si cambia',
      'De cómo percibe tu precio frente al de la competencia',
      'De su cargo y de cuánto presupuesto controla en la empresa',
    ],
    answer: 1,
    why: 'Los modos (crecimiento, problemas, equilibrio y exceso de confianza) describen un momento, no una persona.',
  },
];

const VC_AVANZADO_BASE: QuizQ[] = [
  {
    q: 'En un condominio te recibe el mayordomo, pero decide el comité sin conocerte. ¿Qué corresponde hacer?',
    options: [
      'Convencer bien al mayordomo para que él te venda',
      'Mapear cada parada con una estrategia para cada una',
      'Mapear cada parada y enviar la misma propuesta a todas',
      'Saltar al mayordomo y presentarte directo ante el comité',
    ],
    answer: 1,
    why: 'La venta se gana en cada parada del recorrido, con un plan para cada una, incluido quien puede ser detractor.',
  },
  {
    q: 'Un analista de compras te asegura que él tiene la última palabra. ¿Qué haces?',
    options: [
      'Le crees, porque nadie conoce mejor su empresa',
      'Lo confirmas preguntando de dónde salen los fondos',
      'Lo confirmas preguntándole directamente si él decide',
      'Lo saltas y vas directo a su gerente',
    ],
    answer: 1,
    why: 'Muchos técnicos dicen tener la última palabra; una pregunta indirecta o tu coach revelan quién libera el dinero.',
  },
  {
    q: 'Es la primera vez que ese cliente te compra y la solución es nueva para él. ¿Qué pasa con el nivel de decisión?',
    options: [
      'Baja, porque el monto de una primera compra suele ser menor',
      'Sube, porque no hay experiencia previa contigo',
      'Baja, porque no hay experiencia previa contigo',
      'Se mantiene, porque el monto no cambió',
    ],
    answer: 1,
    why: 'Sin historia contigo hay más riesgo percibido, y la decisión flota hacia arriba.',
  },
  {
    q: 'El comprador económico delega la decisión en un ingeniero especialista. ¿Qué te funciona mejor con él?',
    options: [
      'Ventajas medibles que superen sus exigencias',
      'Ventajas emocionales que superen sus exigencias',
      'Un buen descuento que supere al de la competencia',
      'Hablar con su jefe para que lo convenza',
    ],
    answer: 0,
    why: 'Su aprobación es el filtro real; gana si lo ven como el experto que eligió la mejor solución.',
  },
  {
    q: 'Un técnico ve tu solución como una amenaza a su rol. ¿Qué haces?',
    options: [
      'Lo rodeas para que no frene la venta',
      'Descubres qué teme y le muestras cómo gana',
      'Descubres qué teme y le pides a su jefe que lo convenza',
      'Le ofreces un beneficio personal a cambio de su apoyo',
    ],
    answer: 1,
    why: 'Si lo saltas, sabotea la implementación. Le muestras el control que mantiene y te apoyas en un usuario entusiasta.',
  },
  {
    q: 'Un usuario te cierra el paso al comprador económico. ¿Cuál es el primer paso?',
    options: [
      'Rodearlo y pedir la reunión directo al económico',
      'Ayudarlo a ganar prestigio con tu solución',
      'Vender en paralelo a otro usuario del área',
      'Ayudarlo a ganar tiempo con tu solución',
    ],
    answer: 1,
    why: 'Primero se ayuda al bloqueador; luego viene la venta en paralelo y, como último recurso, rodearlo.',
  },
  {
    q: 'Vas a pedir una reunión al comprador económico. ¿Qué llevas?',
    options: [
      'Una demostración completa de tu solución',
      'Una razón de negocio sobre su futuro',
      'Una razón técnica sobre tu solución',
      'Una propuesta con un descuento especial por cierre',
    ],
    answer: 1,
    why: 'El económico no quiere demostraciones: quiere visión, rentabilidad, estabilidad o crecimiento, con casos de éxito.',
  },
  {
    q: 'En cada reunión te dicen «me lo tengo que pensar». ¿Qué diagnóstico corresponde?',
    options: [
      'El precio es demasiado alto para lo que ofreces',
      'El valor percibido no alcanza para decidir',
      'El cliente necesita más tiempo para comparar',
      'El valor percibido es alto, pero el precio no',
    ],
    answer: 1,
    why: 'Es un problema de oferta y posicionamiento: con un valor percibido muy alto no hay nada que pensar.',
  },
  {
    q: 'Una persona muy positiva ve hoy tu propuesta como un problema. ¿Cómo lo interpretas?',
    options: [
      'Su personalidad cambió y ahora es negativa',
      'Quizás falló tu momento, no la persona',
      'Quizás falló tu precio, no la persona',
      'Es una persona negativa que lo disimula bien',
    ],
    answer: 1,
    why: 'Los modos describen momentos, no personas: manda cómo percibe hoy su situación.',
  },
  {
    q: 'Al calcular tu ciclo normal aparecen una venta de dos días y varias renovaciones automáticas. ¿Qué haces?',
    options: [
      'Las incluyes, porque también son ventas reales',
      'Las eliminas antes de promediar',
      'Las eliminas después de promediar',
      'Las incluyes, pero con la mitad de peso',
    ],
    answer: 1,
    why: 'Son anomalías: la depuración las saca antes de calcular, porque deforman el promedio.',
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
