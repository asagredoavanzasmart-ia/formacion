import type { QuizQ } from '../slideKit';

/* Tests de «Ofertas y adquisición» (no se narran). La respuesta correcta se escribe en la posición 1 y `repartir` la
   mueve con una secuencia fija. Las opciones tienen largos parecidos, la correcta nunca es la más larga y los
   distractores cambian una palabra clave (la trampa). */

const AD_BASICO_BASE: QuizQ[] = [
  {
    q: '¿Qué relación debe cumplirse para que un negocio pueda escalar, según el método?',
    options: [
      'Ingreso total sobre costo de adquisición mayor a tres',
      'Ganancia bruta de por vida sobre costo de adquisición mayor a tres',
      'Ganancia bruta del primer mes sobre costo de adquisición mayor a tres',
      'Ganancia bruta de por vida sobre costo de adquisición mayor a uno',
    ],
    answer: 1,
    why: 'Se usa la ganancia bruta de por vida (ingreso menos costo directo de entregar), no el ingreso, y la proporción va sobre tres a uno.',
  },
  {
    q: 'Cobras 1.000 al mes, el costo directo es 100 y el cliente se queda 5 meses. ¿Cuál es su ganancia bruta de por vida?',
    options: ['5.000 dólares', '4.500 dólares', '900 dólares al mes', '4.000 dólares'],
    answer: 1,
    why: '1.000 − 100 = 900 al mes; 900 × 5 = 4.500.',
  },
  {
    q: '¿En qué orden se ejecutan los dos sistemas?',
    options: [
      'Primero la prospección, después la oferta',
      'Primero la oferta, después la prospección',
      'Los dos sistemas a la vez desde el primer día',
      'Primero la oferta, después la garantía',
    ],
    answer: 1,
    why: 'La oferta debe multiplicar el efectivo de los primeros 30 días antes de inyectarle volumen.',
  },
  {
    q: '¿Cuáles son los cuatro indicadores de un mercado viable?',
    options: [
      'Dolor masivo, poder adquisitivo, fácil de localizar y en crecimiento',
      'Dolor masivo, poco competidor, fácil de localizar y en crecimiento',
      'Dolor leve, poder adquisitivo, fácil de localizar y estable',
      'Dolor masivo, poder adquisitivo, muchos competidores y en crecimiento',
    ],
    answer: 0,
    why: 'Sin dinero, sin forma de encontrarlo o en un sector que se contrae, ninguna táctica comercial salva el negocio.',
  },
  {
    q: 'En la ecuación del valor, ¿qué va en el denominador?',
    options: [
      'El resultado soñado y la probabilidad percibida',
      'La demora y el esfuerzo del comprador',
      'El precio y el costo de entregar',
      'La demora y la probabilidad percibida',
    ],
    answer: 1,
    why: 'Arriba se maximizan resultado y probabilidad; abajo se llevan hacia cero la demora y el esfuerzo.',
  },
  {
    q: '¿Qué es un imán de prospectos?',
    options: [
      'Un descuento sobre la oferta principal',
      'Algo gratis que resuelve un problema estrecho',
      'Algo gratuito que resuelve el problema completo',
      'Un anuncio con el precio de la oferta principal',
    ],
    answer: 1,
    why: 'Resuelve un problema estrecho antes de presentar la oferta y baja el costo de cada conversación.',
  },
  {
    q: '¿Qué significa ACA en el alcance cálido?',
    options: [
      'Atraer, convencer y asegurar',
      'Reconocer, hacer un cumplido y preguntar',
      'Reconocer, hacer un cumplido y vender',
      'Agendar, cerrar la venta y agradecer el pago',
    ],
    answer: 1,
    why: 'Por sus iniciales en inglés: acknowledge, compliment, ask. Se pregunta hacia el problema, no se vende.',
  },
  {
    q: '¿Cuáles son los tres eslabones de una pieza de contenido?',
    options: [
      'Enganchar, vender y recompensar',
      'Enganchar, retener y recompensar',
      'Informar, entretener y recompensar',
      'Enganchar, retener y pedir',
    ],
    answer: 1,
    why: 'Se engancha con componentes noticiosos, se retiene con pasos o historias y se recompensa cumpliendo la promesa.',
  },
  {
    q: '¿Qué dice la regla del cien?',
    options: [
      'Cien contactos o minutos al día, durante cien días',
      'Cien contactos o minutos al día, durante diez días',
      'Cien clientes nuevos antes de subir el precio actual',
      'Cien anuncios distintos antes de elegir uno',
    ],
    answer: 0,
    why: 'Casi todo lo que «no funciona» opera a una fracción del volumen que necesita.',
  },
  {
    q: '¿Qué encontraron Schmitt, Skiera y Van den Bulte (2011) sobre los clientes referidos?',
    options: [
      'Valen al menos un 16 % menos',
      'Valen al menos un 16 % más',
      'Cuestan un 16 % más adquirirlos',
      'Cancelan un 16 % más rápido',
    ],
    answer: 1,
    why: 'Un cliente referido vale al menos un 16 % más que uno que no llegó por referencia.',
  },
];

const AD_AVANZADO_BASE: QuizQ[] = [
  {
    q: 'Tu agencia gasta 10.000 en publicidad y cobra 5.000 el primer mes a sus clientes nuevos. ¿Cuál es el problema principal?',
    options: [
      'La publicidad no funciona y hay que cortarla',
      'El flujo de caja estrangula el crecimiento',
      'El flujo de caja es suficiente para escalar',
      'El precio mensual es demasiado alto',
    ],
    answer: 1,
    why: 'El negocio funciona, pero mientras más publicidad compra, más tiempo pasa en rojo antes de recuperar.',
  },
  {
    q: 'La nueva oferta logra ×2,5 en respuesta, ×2,5 en cierre y ×4 en cobro al contado. ¿Cómo se combinan esos efectos?',
    options: [
      'Se suman: unas nueve veces más efectivo',
      'Se multiplican: más de veinte veces',
      'Se promedian: unas tres veces más',
      'Se multiplican: unas nueve veces más',
    ],
    answer: 1,
    why: 'Los tres efectos se multiplican entre sí: según Hormozi, 10.000 de publicidad pasan a 112.000 en 30 días.',
  },
  {
    q: 'Vendes el mismo curso a «representantes B2B de herramientas y jardinería» en vez de «a todos». ¿Qué cambia?',
    options: [
      'Baja el precio, porque el mercado es más chico',
      'Sube el precio que el comprador acepta pagar',
      'Sube el costo de entregar el mismo contenido',
      'Baja el precio, porque el comprador es experto',
    ],
    answer: 1,
    why: 'La precisión del segmento hace sentir la solución a medida: en el ejemplo, de 19 a entre 1.000 y 2.000 dólares.',
  },
  {
    q: 'Un cliente pagó muy barato tu servicio. Según el método y Arkes y Blumer (1985), ¿qué es más probable?',
    options: [
      'Que se comprometa más, porque arriesgó poco',
      'Que se comprometa menos y obtenga peores resultados',
      'Que se comprometa menos, pero obtenga iguales resultados',
      'Que pida menos soporte, porque pagó poco',
    ],
    answer: 1,
    why: 'Quien paga poco invierte poco emocionalmente: menos atención, peores resultados y más soporte.',
  },
  {
    q: 'Tu servicio tarda tres meses en mostrar resultados. ¿Qué recomienda el método?',
    options: [
      'Bajar el precio para compensar la espera',
      'Diseñar una victoria rápida en los primeros 7 días',
      'Diseñar una victoria grande al final del tercer mes',
      'Prometer resultados antes de lo que puedes cumplir',
    ],
    answer: 1,
    why: 'La victoria temprana reduce la demora percibida; según Hormozi, triplica la retención.',
  },
  {
    q: 'Sin garantía vendes 100 con 5 devoluciones. Con garantía vendes 130 y las devoluciones suben al 10 %. ¿Cuántas ventas netas quedan?',
    options: ['95 ventas netas, igual que antes', '117 ventas netas', '120 ventas netas', '113 ventas netas'],
    answer: 1,
    why: '130 − 13 = 117: un 23 % más que las 95 de antes, pese a duplicar los reembolsos.',
  },
  {
    q: 'Tu servicio tiene un alto costo operativo. ¿Qué garantía conviene?',
    options: [
      'Devolución del dinero sin condiciones',
      'Servicio extendido si el cliente cumple lo pactado',
      'Servicio extendido aunque el cliente no cumpla',
      'Ninguna garantía, para proteger el margen operativo',
    ],
    answer: 1,
    why: 'Trabajas gratis hasta lograr el objetivo, pero solo si el cliente cumple entregables y asistencia.',
  },
  {
    q: 'Tu campaña dejó de responder porque el mercado ya la vio demasiadas veces. ¿Qué cambias primero?',
    options: [
      'La estructura financiera del servicio',
      'La imagen o el video del anuncio',
      'La duración del programa',
      'El nombre completo de la empresa',
    ],
    answer: 1,
    why: 'Se respeta la jerarquía del cambio más barato al más caro; la estructura financiera es el último recurso.',
  },
  {
    q: 'Un cliente te deja 100 dólares en sus primeros 30 días. Un anuncio nuevo ya gastó 100 y no trajo prospectos. ¿Qué haces?',
    options: [
      'Lo dejas correr hasta 200',
      'Lo apagas',
      'Lo dejas correr hasta 300',
      'Duplicas su presupuesto',
    ],
    answer: 1,
    why: 'A los 100 sin prospectos se apaga; si trae prospectos, se le da hasta 200 (2 × el efectivo de 30 días) para lograr una venta.',
  },
  {
    q: 'Tu embudo: 30 % deja datos, 5 % completa la solicitud y 50 % agenda. ¿Dónde aplicas 5 puntos de mejora?',
    options: [
      'En dejar datos, porque es la primera etapa',
      'En la solicitud, porque es la restricción',
      'En agendar, porque es la última etapa',
      'En las tres, un poco en cada una',
    ],
    answer: 1,
    why: 'De 5 a 10 % en la restricción duplica los clientes; en las otras etapas el mismo esfuerzo da +17 % o +10 %.',
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
export const AD_BASICO = repartir(AD_BASICO_BASE);
export const AD_AVANZADO = repartir(AD_AVANZADO_BASE);
