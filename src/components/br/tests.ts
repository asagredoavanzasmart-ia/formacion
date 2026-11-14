import type { QuizQ } from '../slideKit';

/* Tests de «Los secretos de Brunson» (no se narran). La respuesta correcta se escribe en la posición 1 y `repartir` la
   mueve con una secuencia fija. Las opciones tienen largos parecidos, la correcta nunca es la más larga y los
   distractores cambian una palabra clave (la trampa). */

const BR_BASICO_BASE: QuizQ[] = [
  {
    q: 'Según Brunson, ¿quién gana la competencia por los clientes?',
    options: [
      'Quien cobra menos por adquirir a cada cliente',
      'Quien puede pagar más por adquirir a un cliente',
      'Quien puede pagar menos por adquirir a un cliente',
      'Quien gasta más en anuncios durante el primer mes',
    ],
    answer: 1,
    why: 'Quien gana más por cliente a lo largo de la escalera puede pagar más por conseguirlo y se queda con el tráfico.',
  },
  {
    q: '¿Qué función cumple la oferta de entrada en el embudo?',
    options: [
      'Generar la mayor utilidad de toda la escalera',
      'Financiar la adquisición del cliente',
      'Reemplazar al servicio principal',
      'Financiar la retención del cliente',
    ],
    answer: 1,
    why: 'La primera compra busca cubrir el costo de los anuncios; la utilidad llega después, en el seguimiento.',
  },
  {
    q: '¿Qué es el «gran dominó»?',
    options: [
      'La lista de todas las objeciones del cliente',
      'La única creencia que, si se cae, hace caer las demás',
      'La oferta más cara de la escalera de valor',
      'La única creencia que el cliente ya traía antes de comprar',
    ],
    answer: 1,
    why: 'Si el cliente acepta esa creencia central, las demás objeciones pierden fuerza.',
  },
  {
    q: '¿Cuáles son las tres piezas de un mensaje que funciona?',
    options: [
      'Gancho, precio y oferta',
      'Gancho, historia y oferta',
      'Gancho, historia y garantía',
      'Historia, precio y cierre',
    ],
    answer: 1,
    why: 'El gancho detiene, la historia crea el deseo y la oferta es lo que se recibe al actuar.',
  },
  {
    q: 'En el retargeting, ¿qué se busca vender a los «comprometidos»?',
    options: [
      'La compra directa del producto',
      'El clic hacia el embudo',
      'El registro con sus datos',
      'El siguiente escalón',
    ],
    answer: 1,
    why: 'Reaccionaron al anuncio pero no entraron; durante cinco días se les vende el clic.',
  },
  {
    q: '¿Qué aprendió Brunson del disco con un millón de correos?',
    options: [
      'Que una lista debe construirse con anuncios',
      'Que una lista debe construirse con permiso',
      'Que una lista grande vende sola desde el inicio',
      'Que una lista debe comprarse con permiso',
    ],
    answer: 1,
    why: 'Le cortaron el servicio por quejas y solo vendió 70 dólares: la lista vale cuando la gente aceptó recibir.',
  },
  {
    q: '¿Qué es el «embudo en la sombra»?',
    options: [
      'La gente que compra apenas ve el anuncio',
      'La gente que no compra y después busca tu nombre',
      'La gente que no compra y nunca vuelve a buscarte',
      'Los anuncios que un competidor pone con tu nombre',
    ],
    answer: 1,
    why: 'Brunson midió más de 250.000 búsquedas de su nombre en doce meses: hay que ordenar lo que esa gente encuentra.',
  },
  {
    q: '¿Cómo se paga a un afiliado en el método?',
    options: [
      'Un sueldo fijo por cada mes de promoción',
      'Solo por cada venta realizada',
      'Solo por cada visita que envía',
      'Un monto fijo al firmar el acuerdo',
    ],
    answer: 1,
    why: 'Pagar por venta traslada el riesgo: pagas cuando se vende.',
  },
  {
    q: 'En el estudio de Iyengar y Lepper, ¿qué pasó con 24 variedades de mermelada?',
    options: [
      'Compró cerca del 30 % de quienes pasaron',
      'Compró solo el 3 % de quienes pasaron',
      'Compró cerca del 13 % de quienes pasaron',
      'Nadie se detuvo a probar la mermelada',
    ],
    answer: 1,
    why: 'Con 24 compró el 3 %; con 6, cerca del 30 %: menos opciones, menos parálisis.',
  },
  {
    q: '¿Dónde rinde mejor el método de Brunson?',
    options: [
      'En compras lentas, colectivas y de alto precio unitario',
      'En compras rápidas, individuales y de bajo precio',
      'En compras rápidas, de comité y de bajo precio',
      'En contratos largos con clientes corporativos',
    ],
    answer: 1,
    why: 'Es una herramienta de adquisición; con productos caros, comités o clientes de años, su lógica rinde menos.',
  },
];

const BR_AVANZADO_BASE: QuizQ[] = [
  {
    q: 'En el caso del carrito, ¿por qué se agregan ofertas después de la primera compra?',
    options: [
      'Para bajar el precio del producto inicial',
      'Para subir el valor promedio de cada compra',
      'Para subir el número de visitas que llegan al embudo',
      'Para bajar el valor promedio de cada compra',
    ],
    answer: 1,
    why: 'Las ofertas adicionales elevan el ingreso por comprador, que es lo que permite pagar más por cada cliente.',
  },
  {
    q: 'Brunson regala libros pagando 20 dólares por cada uno a sus afiliados. ¿Por qué le conviene?',
    options: [
      'Porque el libro deja utilidad en la primera venta',
      'Porque el cliente se recupera después en el seguimiento',
      'Porque el afiliado devuelve toda la comisión si no hay venta',
      'Porque el cliente se recupera antes de la primera venta',
    ],
    answer: 1,
    why: 'En las ofertas de entrada da hasta el 100 % de la utilidad inicial: la ganancia está en lo que se vende después.',
  },
  {
    q: 'En la ventana de 30 días, ¿cuánto gastaron los contactos nuevos por cada dólar de ingreso inicial?',
    options: ['6,49 dólares', '16,49 dólares', '14,20 dólares', '164,90 dólares'],
    answer: 1,
    why: 'Gastaron 234 mil dólares en los 30 días siguientes: 16,49 por cada dólar inicial (cifras del autor, sin auditoría).',
  },
  {
    q: '¿Qué encontraron Binet y Field sobre la activación a corto plazo?',
    options: [
      'Que construye preferencia duradera con los años',
      'Que produce picos de ventas sin preferencia duradera',
      'Que reduce la sensibilidad del cliente al precio con los años',
      'Que produce picos de ventas con preferencia duradera',
    ],
    answer: 1,
    why: 'La activación aprovecha la demanda existente; la marca crea memoria y baja la sensibilidad al precio.',
  },
  {
    q: 'Según John Dawes, ¿qué parte de los compradores B2B está en el mercado en un momento dado?',
    options: ['Cerca del 50 %', 'Cerca del 5 %', 'Cerca del 15 %', 'Cerca del 95 %'],
    answer: 1,
    why: 'El embudo pesca en ese 5 %; el 95 % restante necesita recordarte cuando surja la necesidad.',
  },
  {
    q: '¿Qué encontró Neil Rackham sobre las técnicas de cierre?',
    options: [
      'Ayudan en ventas grandes y perjudican en pequeñas',
      'Ayudan en ventas pequeñas y perjudican en grandes',
      'Ayudan por igual en ventas pequeñas y grandes',
      'Perjudican en ventas pequeñas y también en grandes',
    ],
    answer: 1,
    why: 'Con más de 35.000 llamadas en 23 países, vio que el cierre presionado resta en las ventas complejas.',
  },
  {
    q: 'Según The Jolt Effect, ¿por qué se pierde la mayor parte de las oportunidades calificadas?',
    options: [
      'Porque el cliente elige a un competidor',
      'Porque el cliente no logra decidirse',
      'Porque el precio supera el presupuesto',
      'Porque el cliente elige a otro proveedor',
    ],
    answer: 1,
    why: 'Entre 40 y 60 % se pierden por indecisión: el cliente prefiere no hacer nada por miedo a equivocarse.',
  },
  {
    q: 'Ante un comité que teme equivocarse, ¿qué ayuda a cerrar?',
    options: [
      'Escasez de última hora y un bono por decidir hoy',
      'Acotar el alcance inicial y mostrar casos parecidos',
      'Ampliar el alcance inicial y mostrar casos parecidos',
      'Una pila de valor más grande con más bonos',
    ],
    answer: 1,
    why: 'Lo que cierra es reducir el riesgo percibido; la presión empeora el problema.',
  },
  {
    q: 'Según Reichheld y Sasser, reducir la deserción en 5 % puede subir las utilidades…',
    options: [
      'entre 5 y 25 %, según el sector',
      'entre 25 y 85 %, según el sector',
      'entre 25 y 85 %, en cualquier sector',
      'entre 50 y 95 %, según el sector',
    ],
    answer: 1,
    why: 'Publicado en la Harvard Business Review de 1990: el rango depende del sector.',
  },
  {
    q: '¿Qué falta para que el club de las dos comas pruebe que el método funciona?',
    options: [
      'El número de personas que ganaron el premio',
      'Cuántos aplicaron la plantilla y perdieron',
      'Cuántos aplicaron la plantilla y ganaron',
      'El año en que se entregó cada premio',
    ],
    answer: 1,
    why: 'Sin el denominador solo se ven los que sobrevivieron: el sesgo de supervivencia que describió Wald.',
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
export const BR_BASICO = repartir(BR_BASICO_BASE);
export const BR_AVANZADO = repartir(BR_AVANZADO_BASE);
