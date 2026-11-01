import type { QuizQ } from '../slideKit';

/* Tests de «Estrategia del océano azul» (no se narran). */

const OA_BASICO_BASE: QuizQ[] = [
  {
    q: '¿Qué caracteriza a un océano rojo?',
    options: ['Un mercado nuevo sin competidores', 'Un mercado saturado donde muchos actores pelean por la misma cuota', 'Un mercado exclusivo de lujo', 'Un mercado regulado por el Estado'],
    answer: 1,
    why: 'Tiene fronteras que todos aceptan y oportunidades de crecimiento escasas; suele derivar en guerra de precios.',
  },
  {
    q: '¿Qué es un océano azul?',
    options: ['Un mercado con mucha competencia', 'Un campo nuevo donde una empresa avanza sola, gracias a una innovación radical', 'Un mercado en declive', 'Un mercado de productos baratos'],
    answer: 1,
    why: 'La innovación cambia la estructura del mercado al crear una infinidad de demandas nuevas.',
  },
  {
    q: '¿Qué llaman Kim y Mauborgne innovación en valor?',
    options: ['Subir el precio con tecnología', 'Un proceso de ruptura que crea más valor para el cliente y para la empresa a la vez', 'Copiar al líder del mercado', 'Reducir costes sin cambiar la oferta'],
    answer: 1,
    why: 'La tecnología sola no basta: el valor debe tener sentido para el comprador y para la empresa.',
  },
  {
    q: '¿Qué cuatro decisiones se toman sobre cada factor del mercado?',
    options: ['Comprar, vender, alquilar y ceder', 'Reforzar, mitigar, excluir y crear', 'Planificar, ejecutar, medir y cerrar', 'Subir, bajar, mantener y esperar'],
    answer: 1,
    why: 'Incluyen crear factores que ni figuraban en la lista inicial; así se desplaza el cursor.',
  },
  {
    q: '¿Qué hizo Renault con el Logan?',
    options: ['Un coche de lujo con más opciones', 'Un coche low cost, robusto y familiar, renunciando a la idea del lujo', 'Un coche pequeño de ciudad', 'Un coche solo para Francia'],
    answer: 1,
    why: 'Costaba 4 500 euros en países emergentes y 7 500 en Francia, y atrajo incluso a quienes compraban de segunda mano.',
  },
  {
    q: 'En una curva de valor, ¿qué significa que dos curvas vayan casi pegadas?',
    options: ['Que hay mucha diferenciación', 'Que no hay diferenciación entre las empresas', 'Que ambas son líderes', 'Que el mercado es nuevo'],
    answer: 1,
    why: 'Si las curvas siguen caminos distintos, sí hay diferenciación.',
  },
  {
    q: '¿Qué hace el Cirque du Soleil frente al circo tradicional?',
    options: ['Compite en lo mismo con más estrellas', 'Elimina estrellas, animales, concesiones y varias pistas, y crea temática, ambiente refinado y música y danza', 'Baja el precio', 'Copia a Ringling Brothers'],
    answer: 1,
    why: 'Además reduce la diversión y el humor y la emoción y el peligro, y aumenta el lugar único.',
  },
  {
    q: '¿Qué son los productos pioneros?',
    options: ['Los que siguen la norma del sector', 'Los que crean un valor sin precedentes y representan el océano azul', 'Los que navegan entre los dos océanos', 'Los más baratos'],
    answer: 1,
    why: 'Los colonos pertenecen al océano rojo y los emigrantes navegan entre ambos.',
  },
  {
    q: '¿Cuáles son los tres niveles de no clientes?',
    options: ['Nuevos, viejos y perdidos', 'Inminentes, anti e inexplotados', 'Locales, nacionales y extranjeros', 'Jóvenes, adultos y mayores'],
    answer: 1,
    why: 'Los inminentes compran ocasionalmente esperando algo mejor, los anti nunca usan el producto y los inexplotados nunca fueron considerados.',
  },
  {
    q: '¿Qué logró Wii Sports?',
    options: ['Más de 80 millones de ejemplares, por encima de los 40 millones de Super Mario Bros', 'Solo 10 millones de ejemplares', 'Superar a la PS3 en precio', 'Ser el juego más caro'],
    answer: 0,
    why: 'Nintendo construyó un océano azul atrayendo a anti e inexplotados, no peleando por los inminentes.',
  },
];

const OA_AVANZADO_BASE: QuizQ[] = [
  {
    q: 'Dos distribuidoras de equipos de oficina compiten con descuentos. ¿Qué hace la tercera, según el ejemplo?',
    options: ['Baja aún más el precio', 'Atiende a los profesionales independientes, a quienes nadie atendía, y deja de disputar al mismo cliente', 'Se fusiona con una de ellas', 'Sube el precio'],
    answer: 1,
    why: 'Deja de navegar en el océano rojo para hablarle a otro cliente.',
  },
  {
    q: 'Una consultora solo vende a grandes empresas y a través de intermediarios. ¿Qué pregunta incómoda le conviene hacerse?',
    options: ['¿Cómo subir sus honorarios?', '¿Puede vender directo a la pyme y hacer accesible su método en un formato simple?', '¿Cómo copiar a la competencia?', '¿Cómo reducir su plantilla?'],
    answer: 1,
    why: 'Llegar a más compradores reparte los costes fijos y permite bajar el precio sin perder margen.',
  },
  {
    q: 'En el programa de gestión para equipos de ventas del ejemplo, ¿qué sería «crear»?',
    options: ['Eliminar los módulos que nadie abre', 'Un aviso diario que le dice al vendedor a quién llamar primero', 'Reducir la implementación de meses a días', 'Aumentar la facilidad de uso'],
    answer: 1,
    why: 'Crear es ofrecer algo que ningún competidor ofrece; las otras tres son eliminar, reducir y aumentar.',
  },
  {
    q: 'Dibujas tu curva y la de dos competidores y las tres se parecen. ¿Qué indica?',
    options: ['Que estás en un océano rojo', 'Que tienes la mejor oferta', 'Que el mercado es nuevo', 'Que debes subir precios'],
    answer: 0,
    why: 'Si una curva se separa, hay una diferencia que el cliente puede ver.',
  },
  {
    q: '¿Cómo rompió Nespresso la cadena de compradores y usuarios?',
    options: ['Vendiendo en grandes superficies', 'Vendiendo sus cápsulas en su propia red de tiendas de alta gama', 'Regalando las máquinas', 'Usando intermediarios exclusivos'],
    answer: 1,
    why: 'Además supo darle una imagen de lujo a unas cápsulas de café.',
  },
  {
    q: 'El equipo discrepa sobre si tu producto estrella es colono, emigrante o pionero. ¿Qué suelen mostrar esas diferencias?',
    options: ['Que el producto es excelente', 'Dónde falta una conversación', 'Que hay que despedir a alguien', 'Que el mercado es azul'],
    answer: 1,
    why: 'El ejercicio sirve para dar una foto honesta de la cartera.',
  },
  {
    q: 'En el restaurante imaginario, ¿quiénes serían los inexplotados?',
    options: ['Los ejecutivos con prisa que ya compran', 'Los trabajadores de la zona a quienes nunca se les ofreció nada', 'Quienes lo creen demasiado caro', 'Quienes comen ahí a falta de algo mejor'],
    answer: 1,
    why: 'Los inminentes comen ahí a falta de algo mejor y los anti lo creen demasiado caro.',
  },
  {
    q: '¿Por qué Nintendo no peleó por los no clientes inminentes?',
    options: ['Porque eran pocos', 'Porque una ventaja de precio o de tecnología habría sido provisional', 'Porque no tenían dinero', 'Porque ya eran clientes'],
    answer: 1,
    why: 'Los competidores habrían respondido rápido; Nintendo amplió el mercado con anti e inexplotados.',
  },
  {
    q: 'Según el consultor Benoît Sarazin, ¿qué demuestra que el método no es una receta de éxito sistemático?',
    options: ['Que Apple lo ignoró', 'Que a Nestlé le hicieron falta quince años para imponer Nespresso y Laliberté no triunfó de inmediato', 'Que todos los océanos azules fracasan', 'Que cuesta demasiado'],
    answer: 1,
    why: 'Además se le critica una definición difusa de la innovación en valor y que lleve a mejoras incrementales.',
  },
  {
    q: '¿En qué consiste el riesgo de canibalización?',
    options: ['En que los clientes se quejen', 'En que el producto nuevo reste ventas a los existentes y la empresa se haga competencia a sí misma', 'En que el producto sea copiado', 'En que suban los costes'],
    answer: 1,
    why: 'Hay que estimar si el beneficio superará las pérdidas posibles; a veces es buena estrategia, como al extender una marca.',
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
export const OA_BASICO = repartir(OA_BASICO_BASE);
export const OA_AVANZADO = repartir(OA_AVANZADO_BASE);
