import type { QuizQ } from '../slideKit';

/* Tests de «El método Lean Startup» (no se narran). */

const LS_BASICO_BASE: QuizQ[] = [
  {
    q: '¿Qué es el lean manufacturing, de donde nace el método?',
    options: ['Una técnica de marketing digital', 'Un método de producción de Toyota (1972) que busca reducir pérdidas y despilfarro', 'Una forma de recaudar capital riesgo', 'Un sistema de contabilidad fiscal'],
    answer: 1,
    why: 'Toyota lo puso en marcha en 1972 para disminuir pérdidas y desperdicios y, con ello, los costes.',
  },
  {
    q: '¿Cuáles son los tres pasos del ciclo de feedback?',
    options: ['Planificar, producir y vender', 'Crear, medir y aprender', 'Investigar, diseñar y lanzar', 'Contratar, formar y evaluar'],
    answer: 1,
    why: 'Se crea un producto, se mide cómo reaccionan los clientes y se aprende qué hacer; cuanto más corto el ciclo, menos se pierde.',
  },
  {
    q: '¿Qué es un producto mínimo viable (PMV)?',
    options: ['El producto final con todas sus funciones', 'Un prototipo que requiere el mínimo esfuerzo y tiempo y se enfrenta ya a clientes reales', 'Un producto barato para competir por precio', 'Un folleto de ventas'],
    answer: 1,
    why: 'No tiene por qué ser perfecto: incluso uno de baja calidad aporta datos útiles para validar la hipótesis.',
  },
  {
    q: '¿Qué ocurrió con los gráficos de IMVU ante los inversores?',
    options: ['Eran espectaculares y cerraron la ronda en un día', 'Sus cifras eran tan bajas que preguntaban si estaban en miles; eran unidades', 'Los inversores pidieron cerrar la empresa', 'No los presentaron nunca'],
    answer: 1,
    why: 'Aun así, esos PMV coherentes les permitieron ajustar y crecer con rapidez.',
  },
  {
    q: '¿Qué tres condiciones debe cumplir un indicador decisional?',
    options: ['Alto, bajo y medio', 'Accionable, accesible y auditable', 'Anual, mensual y semanal', 'Visible, viral y vendible'],
    answer: 1,
    why: 'Accionable muestra causa y efecto, accesible es claro para todos y auditable es creíble con sus imperfecciones.',
  },
  {
    q: '¿Qué es un pivote?',
    options: ['Un cambio de dirección en la estrategia de la empresa', 'Un tipo de contrato con inversores', 'Un informe de ventas', 'Una técnica de motivación'],
    answer: 1,
    why: 'Según Ries, nada es más peligroso que una empresa estancada: un cambio de dirección puede devolverla a una actividad sostenible.',
  },
  {
    q: '¿En qué consiste la técnica de los lotes pequeños?',
    options: ['En producir lo máximo posible para abaratar cada pieza', 'En fabricar en tandas cortas y flujo continuo, tirando de cada etapa solo lo que se necesita', 'En contratar menos personal', 'En vender solo a pocos clientes'],
    answer: 1,
    why: 'Es más rápida, detecta antes los problemas de calidad y evita almacenar piezas, una forma de despilfarro.',
  },
  {
    q: '¿Para qué sirven los cinco porqués?',
    options: ['Para elegir el nombre de la empresa', 'Para llegar a la causa profunda de un problema preguntando «¿por qué?» varias veces', 'Para calcular el precio', 'Para elaborar un presupuesto'],
    answer: 1,
    why: 'Cada porqué cuestiona la causa del anterior, hasta llegar a la raíz.',
  },
  {
    q: '¿Cuáles son los tres motores de crecimiento?',
    options: ['Pegajoso, viral y remunerado', 'Rápido, barato y confiable', 'Local, nacional e internacional', 'Online, físico e híbrido'],
    answer: 0,
    why: 'Retienen clientes, hacen que los clientes traigan a otros o aumentan el ingreso por cliente; conviene privilegiar solo uno.',
  },
  {
    q: '¿Cuál es una crítica frecuente al Lean Startup?',
    options: ['Que es demasiado lento', 'Que se centra en el corto plazo y cambia de estrategia ante cualquier contratiempo', 'Que exige grandes presupuestos', 'Que solo sirve para grandes empresas'],
    answer: 1,
    why: 'Se le reprocha también que encaje mejor en pequeñas empresas y que descuide el aspecto humano.',
  },
];

const LS_AVANZADO_BASE: QuizQ[] = [
  {
    q: 'Quieres vender menús saludables a oficinas. ¿Qué haría el método en vez de montar una cocina industrial?',
    options: ['Esperar a tener el presupuesto completo', 'Ofrecer cinco menús a dos oficinas durante dos semanas y anotar qué piden, qué dejan y qué repiten', 'Contratar a un chef famoso', 'Hacer una campaña masiva de publicidad'],
    answer: 1,
    why: 'Un ciclo corto con clientes reales enseña más que un año de planos.',
  },
  {
    q: 'Una tienda en línea presume de diez mil visitas. ¿Qué cifra permite decidir?',
    options: ['El total de visitas acumuladas', 'Cuántos de cada cien visitantes compran y cuántos regresan', 'El número de seguidores', 'El gasto en publicidad'],
    answer: 1,
    why: 'Las visitas totales son un indicador ilusorio; las tasas de compra y de regreso son accionables.',
  },
  {
    q: 'Un programa de reservas para restaurantes descubre que quienes más lo usan son hoteles pequeños. ¿Qué tipo de pivote es?',
    options: ['De plataforma', 'De segmento de consumidor', 'De tecnología', 'De canal de distribución'],
    answer: 1,
    why: 'El producto resuelve el problema de unos clientes distintos de los previstos.',
  },
  {
    q: 'Un cliente cancela. Tras cinco porqués, ¿cuál resulta ser la raíz en el ejemplo?',
    options: ['El cliente era difícil', 'Nadie es responsable de la bienvenida', 'El precio era alto', 'La competencia era mejor'],
    answer: 1,
    why: 'La cadena fue: no usaba el servicio, no supo empezar, el manual era larguísimo, nadie lo revisó y nadie era responsable.',
  },
  {
    q: 'Si el motor de crecimiento se basa en la fidelización, ¿qué tasas conviene mirar primero?',
    options: ['Las de adquisición y de anulación', 'El número total de clientes', 'Las visitas al sitio web', 'El gasto en marketing'],
    answer: 0,
    why: 'Las cifras genéricas pueden ser engañosas y no siempre se adaptan al motor de crecimiento elegido.',
  },
  {
    q: 'Una consultora prepara un informe de cuarenta hojas. ¿Qué haría con lotes pequeños?',
    options: ['Entregarlo al final para que sea perfecto', 'Entregar cada semana un resumen de una hoja y ajustar con la respuesta del cliente', 'Doblar el número de hojas', 'Dejar de entregarlo'],
    answer: 1,
    why: 'Entregas cortas detectan antes el desajuste y evitan acumular trabajo que el cliente quizá no valora.',
  },
  {
    q: 'Una empresa de capacitación ofrece una sesión de una hora a tres empresas y piden más sesiones cortas. ¿Qué descubre?',
    options: ['Que su motor es la repetición y no el curso largo', 'Que debe subir el precio', 'Que el producto es perfecto', 'Que debe cerrar'],
    answer: 0,
    why: 'Midió cuántas piden una segunda sesión: la señal contradice su hipótesis de cursos largos.',
  },
  {
    q: '¿Qué dos señales indican que es momento de pivotar, según Ries?',
    options: ['La efectividad decreciente de los experimentos y la sensación de que el desarrollo debería ser más productivo', 'Más ventas y más empleados', 'Más reuniones y menos informes', 'Una subida de precios y una bajada de costes'],
    answer: 0,
    why: 'Dicho de otra forma: ¿el producto aún crea el valor suficiente?',
  },
  {
    q: '¿Por qué muchos emprendedores tardan demasiado en pivotar?',
    options: ['Por exceso de datos fiables', 'Por indicadores ilusorios, resultados iniciales ambiguos, objetivos poco claros y miedo al fracaso', 'Porque pivotar es ilegal', 'Porque los inversores lo prohíben'],
    answer: 1,
    why: 'Un pivote es emocionalmente duro para quien creó el producto, pero hay que ser lúcido y objetivo.',
  },
  {
    q: 'Los críticos recuerdan que Google y Facebook no lanzaron productos de baja calidad. ¿Qué sostienen?',
    options: ['Que lanzar algo incompleto siempre funciona', 'Que observaron lo que se hacía antes y aprendieron de los demás, en lugar de lanzar productos incompletos', 'Que no tuvieron competencia', 'Que usaron lotes pequeños'],
    answer: 1,
    why: 'Algunos añaden que a una empresa le basta mirar los errores de las lean startup para lanzar un producto mejor, como hizo Apple.',
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
export const LS_BASICO = repartir(LS_BASICO_BASE);
export const LS_AVANZADO = repartir(LS_AVANZADO_BASE);
