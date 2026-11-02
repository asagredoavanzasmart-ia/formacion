import type { QuizQ } from '../slideKit';

/* Tests de «Enamórate del problema, no de la solución» (no se narran). La respuesta correcta se escribe
   siempre en la posición 1 y `repartir` la mueve con una secuencia fija. */

const EP_BASICO_BASE: QuizQ[] = [
  {
    q: '¿Dónde empieza, según Levine, una empresa que vale la pena?',
    options: ['En una tecnología novedosa', 'En una frustración que comparte mucha gente', 'En una ronda de inversión', 'En un plan de negocios a cinco años'],
    answer: 1,
    why: 'Waze, FairFly, Pontera y Engie nacieron de una frustración propia que resultó compartida: primero el problema y para quién.',
  },
  {
    q: '¿Cuál es el orden que propone para un problema?',
    options: ['Solución, clientes, problema', 'Un gran problema, quién lo tiene, hablar con esas personas y, al final, la solución', 'Inversionistas, producto, mercado', 'Producto, precio, promoción'],
    answer: 1,
    why: 'Si solo tú lo tienes, no sigas; si mucha gente lo tiene, habla con ella para entender cómo lo percibe y solo entonces construye.',
  },
  {
    q: 'En la matriz de mercado y dolor, ¿qué son los «ganadores»?',
    options: ['Pocos usuarios con mucho valor', 'Muchos usuarios y un uso muy frecuente', 'Todo el mundo, pero muy de vez en cuando', 'Pocos usuarios y poco valor'],
    answer: 1,
    why: 'Como Google, WhatsApp o Waze: crecen por el boca a boca porque cada uso es una ocasión de contárselo a alguien.',
  },
  {
    q: '¿Qué dos cosas no se hacen al cruzar el desierto de la no tracción?',
    options: ['Hablar con clientes y medir', 'Cambiar de dirección y quedarse sin combustible', 'Lanzar y fracasar', 'Contratar y despedir'],
    answer: 1,
    why: 'Cambiar de dirección te hace caminar en círculos y en mitad del desierto el financiamiento sale carísimo.',
  },
  {
    q: 'Según el libro, ¿cuándo conviene lanzar un producto?',
    options: ['Cuando está perfecto', 'Cuando te avergüenza su calidad', 'Cuando la competencia ya lanzó', 'Cuando hay presupuesto de marketing'],
    answer: 1,
    why: 'Solo se aprende con usuarios reales; si todavía no tienes clientes, no hay a quién decepcionar.',
  },
  {
    q: '¿Cuál es la única medida del ajuste producto-mercado?',
    options: ['El número de descargas', 'La retención: el porcentaje de usuarios que sigue volviendo', 'Los ingresos del primer mes', 'Las menciones en prensa'],
    answer: 1,
    why: 'Entre empresas equivale a que el cliente renueve o compre más; que te paguen no basta si no vuelven.',
  },
  {
    q: '¿Qué pregunta propone hacer a los treinta días de cada contratación?',
    options: ['¿Cumplió sus metas?', 'Sabiendo lo que sé hoy, ¿contrataría a esta persona?', '¿Le cae bien al equipo?', '¿Pidió aumento?'],
    answer: 1,
    why: 'Si es no, se despide al día siguiente; si es sí, se le da un reconocimiento; «no lo sé» suele ser una excusa.',
  },
  {
    q: '¿Qué porción del valor creado se suele cobrar?',
    options: ['Todo el valor', 'Entre el 10 y el 25 %', 'Exactamente el 50 %', 'El costo multiplicado por dos'],
    answer: 1,
    why: 'Si le ahorras un millón al año a un cliente, el contrato ronda entre cien mil y doscientos cincuenta mil dólares.',
  },
  {
    q: '¿Qué es el boca a boca, a diferencia de lo viral?',
    options: ['Un producto que no funciona si otros no lo tienen', 'Que alguien te lo contó, y depende de la frecuencia de uso', 'Publicidad pagada en redes', 'Un descuento por referidos'],
    answer: 1,
    why: 'Así se enteró de Waze más del 90 % de la gente: alguien en el auto preguntó «¿qué es eso?».',
  },
  {
    q: 'En una salida, ¿cuál es el orden de prioridades de Levine?',
    options: ['Inversionistas, empleados, familia, tú', 'Tú, tu familia, tus empleados y, al final, los inversionistas', 'Clientes, inversionistas, tú', 'La junta, el comprador, el equipo'],
    answer: 1,
    why: 'La decisión es noventa y nueve por ciento personal; en Waze cerca del 75 % del personal se volvió millonario.',
  },
];

const EP_AVANZADO_BASE: QuizQ[] = [
  {
    q: 'Tu equipo presenta la nueva oferta empezando por «nuestra plataforma hace…». ¿Qué cambiarías según Levine?',
    options: ['Agregar más características', 'Empezar por el problema del cliente o por lo que hacemos por él', 'Bajar el precio', 'Mostrar el organigrama'],
    answer: 1,
    why: 'Una historia centrada en el problema o en el usuario conecta: la gente entiende la frustración y se identifica.',
  },
  {
    q: 'Un servicio resuelve algo que todo el mundo vive, pero una vez cada cinco años. ¿En qué cuadrante cae?',
    options: ['Ganadores', 'Sueños y pesadillas', 'Nicho', 'Perdedores'],
    answer: 1,
    why: 'Como renovar la licencia de conducir: parece un sueño por el tamaño del mercado, pero no hay suficiente valor al cual acceder.',
  },
  {
    q: 'Un cliente grande ofrece pagarte bien por adaptar tu producto a un segmento distinto del que atiendes. ¿Qué haría Levine en la fase de crecer?',
    options: ['Aceptar, el dinero manda', 'Decir que no para mantener el enfoque en el problema principal', 'Aceptar y contratar otro equipo', 'Pedir más dinero'],
    answer: 1,
    why: 'Waze rechazó un millón al año de una empresa de logística: enfocarse es decidir qué no hacer.',
  },
  {
    q: 'Crees haber logrado el ajuste producto-mercado y quieres contratar un equipo de ventas completo. ¿Cuál es el riesgo?',
    options: ['Ninguno, es el paso natural', 'Triplicar el gasto sin tener nada que vender si el ajuste no era real', 'Que el equipo venda demasiado', 'Perder el control de la marca'],
    answer: 1,
    why: 'El mayor peligro es creer que llegaste sin haber llegado; los primeros cinco o seis negocios los cierra la dirección.',
  },
  {
    q: 'Un inversionista te dice «Google puede hacer eso en un minuto». ¿Cómo lo lee Levine?',
    options: ['Como un consejo técnico serio', 'Como basura del inversionista: se agradece y se sigue con la lista', 'Como señal de interés', 'Como motivo para cerrar la empresa'],
    answer: 1,
    why: 'Las frases con «siempre», «nunca» o «Google puede hacerlo» suelen decir que no le gustó la idea; no se discuten.',
  },
  {
    q: 'Una venta en 100 millones con preferencia participante y 75 millones invertidos en rondas. ¿Qué pasa con las acciones comunes que tenían el 40 %?',
    options: ['Reciben 40 millones', 'Reciben unos 10, porque primero vuelven los 75 a los inversionistas', 'Reciben todo', 'No reciben nada nunca'],
    answer: 1,
    why: 'Primero vuelven los 75 millones y solo el 40 % del resto llega a las comunes: la preferencia de liquidación decide quién cobra primero.',
  },
  {
    q: 'Quieres que la junta apruebe una decisión importante. ¿Qué recomienda el libro?',
    options: ['Presentarla por sorpresa para ganar impacto', 'Preparar a cada miembro antes y mostrar tres opciones con la deseada en el medio', 'Enviarla por correo sin explicar', 'Votarla sin discusión'],
    answer: 1,
    why: 'Sin sorpresas, Ricitos de Oro y, ante el desacuerdo, una pregunta: «¿qué sugieren?».',
  },
  {
    q: 'En tu embudo, muchos abandonan en el registro. ¿Cuál es el primer paso del método?',
    options: ['Preguntar a los usuarios activos qué les gusta', 'Medir cuántos caen y preguntar a quien no pasó por qué', 'Agregar más funciones', 'Subir la publicidad'],
    answer: 1,
    why: 'Solo quien no pasó la barrera conoce la respuesta; luego se elimina, se simplifica, se escribe menos o se guía con el diseño.',
  },
  {
    q: 'Tienes una oferta para ahorrar costos y otra para aumentar ingresos del cliente. ¿Cuál conviene destacar entre empresas?',
    options: ['La de ahorro, siempre', 'La de ayudar a ganar, porque el ahorro tiene techo y la ganancia no', 'Ninguna', 'La más barata'],
    answer: 1,
    why: 'Levine prefiere ayudar a ganar dinero cuando se puede elegir: el ahorro está limitado por el gasto actual.',
  },
  {
    q: 'Tu empresa nace en un país pequeño. ¿Qué mercados recomienda abrir primero?',
    options: ['Solo el país de origen durante cinco años', 'Mercados grandes y fáciles de ganar, como Brasil o México, con gente en terreno', 'Estados Unidos, Japón y el Reino Unido a la vez', 'Una empresa conjunta en cada país'],
    answer: 1,
    why: 'Los difíciles son caros; un socio local o un gerente de país, nunca una empresa conjunta de la que no se puede salir.',
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
export const EP_BASICO = repartir(EP_BASICO_BASE);
export const EP_AVANZADO = repartir(EP_AVANZADO_BASE);
