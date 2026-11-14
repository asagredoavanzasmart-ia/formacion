import type { Pagina, Tarjeta } from '../influencia/tipos';

/* «Los secretos de Brunson»: la trilogía DotCom Secrets, Expert Secrets y Traffic Secrets de Russell Brunson, leída con
   evidencia. Cada página declara sus anclas como { nombre: frase del guion } en el orden en que suenan (datos puros, sin
   React: el generador de tiempos los lee con esbuild). */

export type PaginaBR = Pagina & { anclas: Record<string, string> };

const pag = (p: Omit<PaginaBR, 'frases' | 'els' | 'tarjetas'> & { tarjetas: Tarjeta[] }): PaginaBR => ({ ...p, frases: Object.values(p.anclas), els: [] });

export const ORDEN: PaginaBR[] = [
  pag({
    id: 'br-portada', titulo: 'Los secretos', destaque: 'de Brunson', bajada: 'Embudos, persuasión y tráfico, leídos con evidencia.',
    inicio: 'hay empresas que gastan en publicidad',
    anclas: {
      empresas: 'hay empresas que gastan', crecen: 'crecen más rápido', autor: 'esa lógica tiene autor', luchador: 'fue luchador en la universidad', papas: 'una pistola de papas',
      cofundo: 'cofundó junto a todd dickerson', embudos: 'un software para armar embudos', cienmil: 'más de cien mil clientes', trilogia: 'su trilogía', kennedy: 'el prólogo del primero',
      criterio: 'conviene leerla con criterio', practicante: 'es conocimiento de practicante', vende: 'el autor vende el software', garantia: 'no hay garantía', pares: 'investigación revisada por pares',
      cero: 'el efecto del precio cero', anclaje: 'el anclaje descrito por', reactancia: 'la reactancia ante la presión', falta: 'no existe en cambio',
    },
    tarjetas: [
      { rotulo: 'El autor', texto: 'Russell Brunson: luchador en Boise State, primer producto en 2002, cofundador de ClickFunnels en 2014 y autor de la trilogía (2015, 2017, 2020).', frase: 'esa lógica tiene autor' },
      { rotulo: 'Cómo leer las cifras', texto: 'Salen de sus empresas y alumnos, no están auditadas y el autor vende el software del método.', frase: 'es conocimiento de practicante', destacada: true },
      { rotulo: 'Lo que sí tiene respaldo', texto: 'Precio cero (Shampanier, Mazar y Ariely, 2007), anclaje (Tversky y Kahneman, 1974) y reactancia (Brehm, 1966).', frase: 'investigación revisada por pares' },
    ],
    pregunta: { frase: 'qué parte de cómo consigues', texto: '¿Qué parte de cómo consigues clientes hoy se apoya en datos tuyos y cuál en simple costumbre?' },
  }),
  pag({
    id: 'br-escalar', titulo: 'Gana quien puede', destaque: 'pagar más', bajada: 'El problema rara vez es el tráfico: es el embudo.',
    inicio: 'cuando un negocio no escala',
    anclas: {
      culpa: 'se culpa al tráfico', caso: 'lo cuenta con un caso', drew: 'drew canole', seguidores: 'un millón doscientos mil seguidores', noventa: 'en un noventa por ciento',
      ciento: 'gastaba ciento dieciséis dólares', pedia: 'pedía ayuda', diagnostico: 'el diagnóstico fue otro', kennedy: 'una máxima de dan kennedy', gana: 'gana la empresa que puede gastar más',
      pujar: 'puedes pujar más alto', subasta: 'sacarlo de la subasta', partes: 'en tres partes', oferta: 'cómo se estructura la oferta', creencia: 'cómo se construye la creencia', atencion: 'cómo se consigue la atención',
    },
    tarjetas: [
      { rotulo: 'El caso', texto: 'FitLife.tv: el tráfico cayó 90 % y gastaba 116 dólares en anuncios para vender un producto de 97.', frase: 'drew canole' },
      { rotulo: 'La máxima de Kennedy', texto: 'Gana la empresa que puede gastar más para adquirir un cliente.', frase: 'una máxima de dan kennedy', destacada: true },
      { rotulo: 'La ruta de la clase', texto: 'La oferta que se paga sola, la creencia que lleva a comprar, la atención y lo que el modelo deja fuera.', frase: 'en tres partes' },
    ],
    pregunta: { frase: 'cuánto puedes gastar hoy', texto: '¿Cuánto puedes gastar hoy por conseguir un cliente sin perder dinero durante el primer mes?' },
  }),
  pag({
    id: 'br-escalera', titulo: 'La escalera', destaque: 'de valor', bajada: 'A un desconocido no le vendes lo más caro: se lo ganas escalón por escalón.',
    inicio: 'un dentista le ofreció',
    anclas: {
      dentista: 'un dentista le ofreció', limpieza: 'limpieza dental gratis', amarillos: 'dientes amarillos', pagando: 'salió pagando más de dos mil', consulta: 'otra consulta agendada',
      escalera: 'llama la escalera de valor', cebo: 'abajo va el cebo', frontal: 'sigue la oferta frontal', intermedias: 'están las ofertas intermedias', cima: 'en la cima',
      cirugia: 'la cirugía estética', continuidad: 'la continuidad', quiro: 'un quiropráctico', masaje: 'un masaje gratis', bienestar: 'un programa de bienestar', escalon: 'escalón por escalón',
    },
    tarjetas: [
      { rotulo: 'Cinco piezas', texto: 'Cebo, oferta frontal, ofertas intermedias, servicio principal y continuidad.', frase: 'llama la escalera de valor', destacada: true },
      { rotulo: 'El dentista', texto: 'Limpieza gratis → blanqueamiento y retenedores por más de 2.000 dólares → otra consulta en seis meses.', frase: 'un dentista le ofreció' },
      { rotulo: 'El quiropráctico', texto: 'Ajustes de 50 dólares → masaje gratis como cebo → programa de bienestar de 5.000.', frase: 'un quiropráctico' },
    ],
    pregunta: { frase: 'qué escalones tiene hoy', texto: '¿Qué escalones tiene hoy tu negocio y cuáles están vacíos?' },
  }),
  pag({
    id: 'br-embudo', titulo: 'Regalar para', destaque: 'calificar', bajada: 'El primer pago, aunque sea pequeño, revela quién compra.',
    inicio: 'una escalera ordena productos',
    anclas: {
      recorrido: 'el embudo es el recorrido', experimento: 'el experimento de los cien visitantes', enviaba: 'enviaba cien personas', uno: 'cerca del uno por ciento', regalo: 'después regaló una parte',
      envio: 'solo el costo de envío', ocho: 'ocho de cada cien', cuarta: 'una cuarta parte compró', resultado: 'el resultado fue de trescientos', doble: 'el doble de ingresos',
      ariely: 'shampanier mazar y ariely', cero: 'pasar de un precio bajo a cero', avisar: 'avisar claramente del costo',
    },
    tarjetas: [
      { rotulo: 'Vendiendo directo', texto: '100 visitas → 1 % compra → 197 dólares y 1 cliente.', frase: 'enviaba cien personas' },
      { rotulo: 'Regalando con envío', texto: '8 de cada 100 piden el regalo → 1 de cada 4 compra el producto → 394 dólares y 8 clientes.', frase: 'ocho de cada cien', destacada: true },
      { rotulo: 'El precio cero', texto: 'Shampanier, Mazar y Ariely (2007): llegar a cero dispara la demanda más de lo que explica el ahorro.', frase: 'shampanier mazar y ariely' },
    ],
    pregunta: { frase: 'qué podrías regalar', texto: '¿Qué podrías regalar que resuelva un problema real y que deje ver quién está dispuesto a pagar?' },
  }),
  pag({
    id: 'br-carrito', titulo: 'El carrito que', destaque: 'se paga solo', bajada: 'Complemento, ofertas únicas y una cuenta que pasa a positivo.',
    inicio: 'el primer complemento aparece',
    anclas: {
      casilla: 'una casilla para sumar', tres: 'una de cada tres personas', unica: 'viene la oferta única', espera: 'espera tu pedido aún no está completo', reglas: 'sus reglas para esa segunda oferta',
      mismo: 'no vender más de lo mismo', relacion: 'no vender algo sin relación', siguiente: 'el siguiente paso lógico', costaba: 'le costaba veintitrés dólares', perdida: 'una pérdida de quince',
      complemento: 'el complemento de treinta y siete', oto1: 'la primera oferta única', oto2: 'la segunda de doscientos', promedio: 'el valor promedio del carrito', ganancia: 'una ganancia de catorce',
      cuadra: 'la aritmética cuadra',
    },
    tarjetas: [
      { rotulo: 'Tres reglas', texto: 'Ni más de lo mismo ni algo sin relación: el siguiente paso, hacerlo más rápido o ayuda personal.', frase: 'sus reglas para esa segunda oferta' },
      { rotulo: 'La cuenta (cifras de Brunson)', texto: 'Costo 23 · libro 7,95 · complemento +7,70 · oferta de 97 +9,62 · oferta de 297 +12,44 = 37,71 por cliente.', frase: 'le costaba veintitrés dólares', destacada: true },
      { rotulo: 'Resultado', texto: 'De −15,05 a +14,71 dólares por cliente desde el primer día.', frase: 'una ganancia de catorce' },
    ],
    pregunta: { frase: 'qué compra complementaria', texto: '¿Qué compra complementaria y qué segunda oferta tendría sentido justo después de tu primera venta?' },
  }),
  pag({
    id: 'br-temperatura', titulo: 'La temperatura', destaque: 'del tráfico', bajada: 'Cuanto más frío el tráfico, más largo el puente.',
    inicio: 'no todo el tráfico llega',
    anclas: {
      schwartz: 'una idea de eugene schwartz', frio: 'el tráfico frío solo sabe', calido: 'el tráfico cálido ya conoce', caliente: 'el tráfico caliente ya te conoce', puente: 'se construye un puente',
      largo: 'más largo debe ser', error: 'su propio error', lista: 'dos coma tres millones', perdio: 'perdió más de treinta mil', otros: 'luego vio que otros anunciantes',
      articulo: 'llevaban a un artículo', boletin: 'después a un boletín', tardo: 'tardó entre una semana', kelley: 'harold kelley mostró', calidofrio: 'como cálido o como frío',
    },
    tarjetas: [
      { rotulo: 'Tres temperaturas', texto: 'Frío: solo conoce el problema · Cálido: conoce la solución o viene recomendado · Caliente: ya te conoce.', frase: 'el tráfico frío solo sabe', destacada: true },
      { rotulo: 'El error de Brunson', texto: '2,3 millones de contactos enviados directo al embudo: más de 30.000 dólares perdidos y una docena de ventas.', frase: 'su propio error' },
      { rotulo: 'El puente', texto: 'Artículo en el lenguaje del lector → boletín → oferta. Kelley (1950): lo que se dice antes cambia el juicio.', frase: 'llevaban a un artículo' },
    ],
    pregunta: { frase: 'en qué estado de ánimo', texto: '¿Con qué conocimiento llega a tu oferta alguien que nunca te ha oído nombrar?' },
  }),
  pag({
    id: 'br-oportunidad', titulo: 'Mejora o', destaque: 'nueva oportunidad', bajada: 'El cliente no quiere admitir que eligió mal: dale otro vehículo.',
    inicio: 'brunson distingue entre una oferta de mejora',
    anclas: {
      mejora: 'la mejora promete', nueva: 'la nueva oportunidad lo invita', dificil: 'mejorar es difícil', admitir: 'obliga a admitir', rojo: 'un océano rojo', estatus: 'es el estatus',
      imagen: 'la propia imagen de sí', justifica: 'justifica los fracasos pasados', vehiculo: 'estaba en el vehículo', ipod: 'su ejemplo es el ipod', biblioteca: 'toda la biblioteca musical',
      real: 'la condición es que el cambio sea real',
    },
    tarjetas: [
      { rotulo: 'Oferta de mejora', texto: 'Lo mismo, un poco mejor: dolor conocido, admitir el error y competir por precio.', frase: 'la mejora promete' },
      { rotulo: 'Nueva oportunidad', texto: 'Otro vehículo: la culpa era del vehículo anterior y el estatus queda a salvo.', frase: 'la nueva oportunidad lo invita', destacada: true },
      { rotulo: 'La condición', texto: 'Cambiar el nombre no crea una oportunidad: el cambio tiene que ser real.', frase: 'la condición es que el cambio sea real' },
    ],
    pregunta: { frase: 'lo que vendes cambia de vehículo', texto: '¿Lo que vendes cambia de vehículo o solo mejora el que tu cliente ya conoce?' },
  }),
  pag({
    id: 'br-domino', titulo: 'El gran', destaque: 'dominó', bajada: 'Una sola creencia que, si cae, arrastra a las demás objeciones.',
    inicio: 'perry belcher revisó las ofertas',
    anclas: {
      diez: 'durante diez años', mitad: 'la conversión se reducía a la mitad', domino: 'el gran dominó', unica: 'la única creencia', logica: 'como un razonamiento lógico',
      clave: 'es la clave para lo que más desean', vehiculo: 'solo se alcanza por mi vehículo', peso: 'pierden peso', clickfunnels: 'para clickfunnels el suyo', conviene: 'conviene al autor',
      criterio: 'su criterio de calidad', mejora: 'estás ofreciendo una mejora',
    },
    tarjetas: [
      { rotulo: 'Lo que vio Belcher', texto: 'Pedir que el cliente crea más de una cosa reducía la conversión a la mitad.', frase: 'la conversión se reducía a la mitad' },
      { rotulo: 'La frase', texto: 'Si creen que esta oportunidad es la clave de lo que más desean, y que solo se logra con mi vehículo, lo demás pierde peso.', frase: 'como un razonamiento lógico', destacada: true },
      { rotulo: 'El criterio', texto: 'Si no puedes escribirla de forma verdadera, probablemente ofreces una mejora.', frase: 'su criterio de calidad' },
    ],
    pregunta: { frase: 'cuál es la única cosa', texto: '¿Cuál es la única cosa que tu cliente debería creer para que lo demás deje de importar?' },
  }),
  pag({
    id: 'br-dudas', titulo: 'Las tres', destaque: 'dudas', bajada: 'Sobre el método, sobre uno mismo y sobre las circunstancias.',
    inicio: 'aunque el cliente acepte la gran creencia',
    anclas: {
      tres: 'tres tipos de duda', vehiculo: 'las del vehículo', internas: 'las internas', bandura: 'estudiada por bandura', externas: 'y las externas', secretos: 'las llama los tres secretos',
      tecnico: 'no soy técnico', trafico: 'cómo conseguir tráfico', historia: 'se desarma con una historia', fladlien: 'una técnica de jason fladlien', pensando: 'probablemente estás pensando tal cosa',
      triple: 'tres veces más',
    },
    tarjetas: [
      { rotulo: 'El vehículo', texto: '«No sé si esto funcionaría para mí».', frase: 'las del vehículo' },
      { rotulo: 'Internas', texto: '«No creo que yo pueda». Es la autoeficacia (Bandura, 1977).', frase: 'las internas', destacada: true },
      { rotulo: 'Externas', texto: '«No tengo tiempo», «el mercado está mal».', frase: 'y las externas' },
    ],
    pregunta: { frase: 'cuáles son las tres dudas', texto: '¿Cuáles son las tres dudas que de verdad frenan a tus clientes?' },
  }),
  pag({
    id: 'br-epifania', titulo: 'El puente de', destaque: 'la epifanía', bajada: 'Contar cómo llegaste a creer, en lugar de explicar el método.',
    inicio: 'brunson sostiene que la gente decide por emoción',
    anclas: {
      emocion: 'decide por emoción', historia: 'contando la historia', puente: 'el puente de la epifanía', jerga: 'la jerga técnica', klaver: 'kim klaver', algo: 'es algo así como',
      ocho: 'ocho preguntas', fondo: 'tu historia de fondo', muro: 'el muro que encontraste', epifania: 'la epifanía el plan', transformacion: 'y la transformación', hauge: 'michael hauge',
      deseo: 'persigue un deseo', verdad: 'siempre que lo contado sea verdad',
    },
    tarjetas: [
      { rotulo: 'Emoción primero', texto: 'Según Brunson, se decide por emoción y se justifica con lógica; la jerga técnica llega demasiado pronto.', frase: 'decide por emoción' },
      { rotulo: 'Ocho preguntas', texto: 'Historia de fondo · deseo · muro · epifanía · plan · conflicto · logro · transformación.', frase: 'ocho preguntas', destacada: true },
      { rotulo: 'La condición', texto: 'Una historia persuade de verdad solo si lo contado es verdad.', frase: 'siempre que lo contado sea verdad' },
    ],
    pregunta: { frase: 'cuál fue el momento exacto', texto: '¿Cuál fue el momento exacto en que tú te convenciste de lo que hoy ofreces?' },
  }),
  pag({
    id: 'br-pila', titulo: 'La', destaque: 'pila', bajada: 'Que lo último a la vista sea la oferta completa, no un detalle.',
    inicio: 'armand morin le enseñó',
    anclas: {
      morin: 'armand morin', ultimo: 'recuerda lo último que escuchó', bono: 'un bono pequeño', cada: 'cada elemento de la oferta', acumulada: 'la lista completa acumulada',
      entera: 'la oferta entera', diez: 'diez veces el precio', mil: 'sumen cerca de mil', inventada: 'no una cifra inventada', tversky: 'tversky y kahneman', ancla: 'ancla el juicio',
      condicionales: 'declaraciones condicionales', cuarenta: 'cerca del cuarenta', honesta: 'solo es honesta',
    },
    tarjetas: [
      { rotulo: 'Cómo funciona', texto: 'Cada elemento con su valor; con cada uno nuevo se muestra otra vez la lista acumulada.', frase: 'cada elemento de la oferta' },
      { rotulo: 'La proporción', texto: 'Valor total cercano a diez veces el precio: 97 dólares frente a cerca de 1.000.', frase: 'diez veces el precio', destacada: true },
      { rotulo: 'El mecanismo', texto: 'Anclaje (Tversky y Kahneman, 1974): honesto solo si el valor es real.', frase: 'tversky y kahneman' },
    ],
    pregunta: { frase: 'qué elementos de tu oferta', texto: '¿Qué elementos de tu oferta desactivan cada duda y cuánto valen para el cliente?' },
  }),
  pag({
    id: 'br-cierres', titulo: 'Emoción, lógica', destaque: 'y miedo', bajada: 'Tres ángulos para cerrar, y una técnica que conviene mirar con distancia.',
    inicio: 'brunson propone que cada mensaje de cierre',
    anclas: {
      tres: 'tres ángulos', emocion: 'primero la emoción', mitad: 'cerca de la mitad', logica: 'después la lógica', treinta: 'sería el treinta por ciento', miedo: 'el miedo a perder la oportunidad',
      veinte: 'el veinte por ciento restante', estudio: 'no de un estudio', tanteo: 'los cierres de tanteo', thomas: 'ted thomas', subio: 'subió de nueve', adelante: 'más adelante veremos',
    },
    tarjetas: [
      { rotulo: 'Tres ángulos', texto: '50 % decide por emoción · 30 % por lógica · 20 % por miedo a perderla (según Brunson).', frase: 'tres ángulos', destacada: true },
      { rotulo: 'Cierres de tanteo', texto: 'Pequeños síes cada minuto: en su seminario, de 9,45 a 16,50 dólares por registrado.', frase: 'los cierres de tanteo' },
      { rotulo: 'Ojo crítico', texto: 'Funcionó en ventas baratas; con empresas se revisa en la última parte.', frase: 'más adelante veremos' },
    ],
    pregunta: { frase: 'qué argumento de tu cierre', texto: '¿Qué argumento de tu cierre es hoy el más débil: el emocional, el lógico o el de urgencia?' },
  }),
  pag({
    id: 'br-bofetada', titulo: 'La bofetada', destaque: 'de Google', bajada: 'Toda plataforma sube los precios: el tráfico propio es el único seguro.',
    inicio: 'brunson conoció en carne propia',
    anclas: {
      bofetada: 'la bofetada de google', centavos: 'veinticinco centavos por clic', dejaba: 'entre dos y tres dólares', tres: 'pasó a tres dólares', quebro: 'los pequeños anunciantes quebró',
      fases: 'tres fases', adopcion: 'primero la adopción', subida: 'luego la subida de precios', expulsa: 'al final la bofetada', expuesto: 'estás expuesto', controlas: 'el que controlas es el pagado',
      ganas: 'el que ganas es el orgánico', posees: 'el que posees es tu lista', tercero: 'convertirse en el tercero',
    },
    tarjetas: [
      { rotulo: 'Tres fases', texto: 'Adopción barata → subida de precios → bofetada que expulsa a los pequeños.', frase: 'tres fases' },
      { rotulo: 'Tres tipos de tráfico', texto: 'Controlado (pagado) · ganado (orgánico) · propio (tu lista).', frase: 'el que controlas es el pagado', destacada: true },
      { rotulo: 'La regla', texto: 'El pagado y el ganado deben terminar convertidos en tráfico propio.', frase: 'convertirse en el tercero' },
    ],
    pregunta: { frase: 'qué porcentaje de tus ventas', texto: '¿Qué porcentaje de tus ventas depende de una sola plataforma que no controlas?' },
  }),
  pag({
    id: 'br-sueno', titulo: 'El sueño', destaque: 'cien', bajada: 'Tus clientes ya están reunidos: encuentra quién los reunió.',
    inicio: 'del marketing de respuesta directa brunson toma',
    anclas: {
      holmes: 'chet holmes', revista: 'una revista jurídica', ultimo: 'en el último lugar', dosmil: 'de dos mil anunciantes', ciento: 'ciento sesenta y siete', noventa: 'el noventa y cinco por ciento',
      paquete: 'un paquete y una llamada', cuatro: 'sin respuesta durante cuatro meses', xerox: 'luego llegó xerox', treinta: 'casi treinta', primero: 'al primer lugar', reunidos: 'ya están reunidos',
      intereses: 'por intereses', busqueda: 'por búsqueda', mapeo: 'ciento ochenta y cinco fuentes', pozo: 'cavar el pozo',
    },
    tarjetas: [
      { rotulo: 'Chet Holmes', texto: '167 de 2.000 anunciantes concentraban el 95 % del gasto: del último al primer lugar.', frase: 'chet holmes' },
      { rotulo: 'La versión de Brunson', texto: 'Tus clientes ya están reunidos, por intereses o por búsqueda: identifica quién los reunió.', frase: 'ya están reunidos', destacada: true },
      { rotulo: 'Antes de necesitarla', texto: 'Cavar el pozo antes de tener sed.', frase: 'cavar el pozo' },
    ],
    pregunta: { frase: 'quiénes son los diez referentes', texto: '¿Quiénes son los diez referentes, medios o comunidades que ya reúnen a tu cliente ideal?' },
  }),
  pag({
    id: 'br-entrada', titulo: 'Trabajar o', destaque: 'comprar la entrada', bajada: 'Ganarte el acceso a una audiencia, o pagarlo.',
    inicio: 'para llegar a esa audiencia hay dos caminos',
    anclas: {
      dos: 'hay dos caminos', trabajas: 'trabajas tu entrada', compras: 'la compras', lanzamiento: 'para el lanzamiento de secretos de expertos', robbins: 'tony robbins', pago: 'después pagó anuncios',
      veinte: 'veinte dólares por cada libro', video: 'el video superó', vendio: 'el libro vendió setenta', regla: 'ninguna de las dos vías', apagas: 'cuando apagas los anuncios', acumula: 'se acumula',
    },
    tarjetas: [
      { rotulo: 'Trabajar la entrada', texto: 'Dar valor, construir la relación y ganarte el acceso a su público.', frase: 'trabajas tu entrada' },
      { rotulo: 'Comprar la entrada', texto: 'Anuncios dirigidos a los seguidores de esos referentes.', frase: 'la compras' },
      { rotulo: 'El lanzamiento (cifras del autor)', texto: 'Entrevista con Tony Robbins más anuncios a sus seguidores: más de 2,5 millones de vistas y 71.248 libros en una semana.', frase: 'el libro vendió setenta', destacada: true },
    ],
    pregunta: { frase: 'cuál de las dos vías', texto: '¿Cuál de las dos vías estás descuidando hoy en tu negocio?' },
  }),
  pag({
    id: 'br-fiesta', titulo: 'Las redes son', destaque: 'una fiesta', bajada: 'No se va a vender: se va a hacer amigos.',
    inicio: 'perry belcher le explicó a brunson',
    anclas: {
      amigos: 'sino para hacer amigos', fiesta: 'como una fiesta', evitan: 'todos te evitan', acercan: 'otros se acercan', casa: 'es tu casa', paso: 'dar un paso hacia tu embudo',
      productor: 'de consumidor a productor', limpio: 'limpió sus redes', diez: 'unos diez minutos', grupos: 'los grupos más grandes', treinta: 'treinta minutos diarios', constancia: 'de la constancia',
    },
    tarjetas: [
      { rotulo: 'La fiesta', texto: 'Quien ofrece sus productos espanta; quien ayuda y presenta gente atrae.', frase: 'como una fiesta' },
      { rotulo: 'Tu casa', texto: 'El perfil personal: ahí, y no en la fiesta, invitas a dar el paso al embudo.', frase: 'es tu casa', destacada: true },
      { rotulo: 'Productor, no consumidor', texto: '10 minutos para ver a los referentes y 30 para responder con valor en los grupos.', frase: 'de consumidor a productor' },
    ],
    pregunta: { frase: 'cuántos minutos al día', texto: '¿Cuántos minutos al día dedicas a producir valor, y cuántos a consumir lo que otros publican?' },
  }),
  pag({
    id: 'br-gancho', titulo: 'Gancho, historia', destaque: 'y oferta', bajada: 'Las tres piezas de todo anuncio, correo o publicación.',
    inicio: 'todo anuncio correo o publicación',
    anclas: {
      tres: 'en tres piezas', gancho: 'el gancho que detiene', historia: 'la historia que genera', oferta: 'y la oferta que es', natalie: 'natalie hodson', madres: 'muchas madres se reconocían',
      libro: 'un libro digital', ventas: 'ciento veinte mil mujeres', diagnostico: 'su regla de diagnóstico', mejora: 'se mejora la oferta', hipotesis: 'una hipótesis de práctica',
    },
    tarjetas: [
      { rotulo: 'Tres piezas', texto: 'Gancho: detiene el desplazamiento · Historia: genera deseo · Oferta: lo que se recibe al actuar.', frase: 'en tres piezas', destacada: true },
      { rotulo: 'Natalie Hodson', texto: 'Una experiencia incómoda contada con franqueza y un libro digital: más de 120.000 compradoras.', frase: 'natalie hodson' },
      { rotulo: 'Diagnóstico', texto: 'Si un anuncio falla, revisa el gancho, la historia o la oferta. Es una regla de práctica, no un estudio.', frase: 'su regla de diagnóstico' },
    ],
    pregunta: { frase: 'cuál de las tres piezas', texto: '¿Cuál de las tres piezas está hoy más floja en tu último anuncio?' },
  }),
  pag({
    id: 'br-creatividad', titulo: 'Más ganchos,', destaque: 'más alcance', bajada: 'El tráfico frío pide muchas versiones del mensaje.',
    inicio: 'dean graziosi vendía',
    anclas: {
      graziosi: 'dean graziosi vendía', mil: 'unos mil doscientos', cuentas: 'comparó las cuentas', cuatro: 'cuatro veces más creatividades', telefono: 'con su teléfono', oceano: 'un océano de personas',
      agota: 'se agota pronto', ochenta: 'la del ochenta veinte', llenan: 'esos anuncios llenan', ensayo: 'un presupuesto pequeño de ensayo', cien: 'cien dólares generaron', total: 'un total de doscientos',
    },
    tarjetas: [
      { rotulo: 'Graziosi frente a Brunson', texto: '5.000 frente a 1.200 libros por semana: cuatro veces más anuncios distintos.', frase: 'dean graziosi vendía', destacada: true },
      { rotulo: 'La regla 80/20', texto: 'Al empezar, 80 % del presupuesto en frío para 20 % de los resultados: llena los grupos de retargeting.', frase: 'la del ochenta veinte' },
      { rotulo: 'Ensayo de 100 dólares', texto: '7 × 7 + 2 × 37 + 1 × 100 = 223 dólares de vuelta.', frase: 'cien dólares generaron' },
    ],
    pregunta: { frase: 'cuántas versiones distintas', texto: '¿Cuántas versiones distintas de tu mensaje pusiste delante de tu audiencia fría este mes?' },
  }),
  pag({
    id: 'br-retargeting', titulo: 'Volver a', destaque: 'hablarles', bajada: 'Tres grupos según lo que ya hicieron.',
    inicio: 'el retargeting es la forma',
    anclas: {
      forma: 'volver a hablarle', dosmil: 'con dos mil dólares', cienmil: 'cien mil personas ven', cuatro: 'el cuatro por ciento interactúa', dos: 'el dos por ciento hace clic',
      treinta: 'el treinta por ciento de esos', diez: 'el diez por ciento compra', quedan: 'quedan tres mil novecientas', comprometidos: 'los comprometidos', cinco: 'durante cinco días',
      aterrizados: 'los aterrizados', siete: 'durante siete días', propios: 'y los propios', orden: 'el mismo orden', unavez: 'se crean una vez',
    },
    tarjetas: [
      { rotulo: 'El caso', texto: '100.000 ven → 2.000 clics → 600 dejan datos → 60 compran: 3.940 interesados quedan sin actuar.', frase: 'con dos mil dólares' },
      { rotulo: 'Tres grupos', texto: 'Comprometidos (5 días): el clic · Aterrizados (7 días): el registro · Propios: el siguiente escalón.', frase: 'los comprometidos', destacada: true },
      { rotulo: 'Se hacen una vez', texto: 'En cada grupo: emoción, lógica y miedo. Luego no se tocan.', frase: 'se crean una vez' },
    ],
    pregunta: { frase: 'en cuál de los tres grupos', texto: '¿En cuál de los tres grupos pierdes hoy más personas por no volver a hablarles?' },
  }),
  pag({
    id: 'br-lista', titulo: 'La lista', destaque: 'es el activo', bajada: 'La ganancia grande está en el seguimiento, no en el primer clic.',
    inicio: 'brunson insiste en que la lista',
    anclas: {
      activo: 'el activo central', estudiante: 'siendo estudiante', disco: 'un millón de direcciones', corto: 'le cortó el servicio', setenta: 'fueron de setenta dólares', permiso: 'construirse con permiso',
      dolar: 'un dólar al mes', cuatro: 'cuatro embudos de entrada', gastaron: 'gastaron ciento veintiocho mil', contactos: 'catorce mil doscientos cinco', siguientes: 'en los siguientes treinta días',
      dieciseis: 'dieciséis con cuarenta y nueve', seguimiento: 'está en el seguimiento',
    },
    tarjetas: [
      { rotulo: 'El error', texto: 'Un millón de correos comprados: servicio cortado y 70 dólares en ventas. Una lista se construye con permiso.', frase: 'un millón de direcciones' },
      { rotulo: 'Regla orientativa', texto: 'Cada nombre de la lista vale cerca de un dólar al mes.', frase: 'un dólar al mes' },
      { rotulo: '30 días después', texto: '14.205 contactos nuevos gastaron 234.000 dólares: 16,49 por cada dólar inicial.', frase: 'dieciséis con cuarenta y nueve', destacada: true },
    ],
    pregunta: { frase: 'qué haces hoy con las personas', texto: '¿Qué haces hoy con las personas que te dejaron sus datos y todavía no compraron?' },
  }),
  pag({
    id: 'br-sombra', titulo: 'El embudo', destaque: 'en la sombra', bajada: 'Quien no compra al ver el anuncio, te busca después.',
    inicio: 'una conversación con dos socios',
    anclas: {
      medido: 'nunca había medido', gasto: 'cuatrocientos ochenta y cinco mil', nocompraba: 'no compraba en el momento', buscaba: 'buscaba su nombre', sombra: 'el embudo en la sombra',
      doce: 'en doce meses', azar: 'un sitio al azar', competidor: 'un competidor que se cuelga', centro: 'un centro de embudo', reune: 'reúne en un solo lugar', ordena: 'ordena el recorrido',
    },
    tarjetas: [
      { rotulo: 'Lo no medido', texto: '485.927 dólares en un mes: mucha gente no compraba y buscaba su nombre.', frase: 'cuatrocientos ochenta y cinco mil' },
      { rotulo: 'El dato', texto: '251.680 búsquedas de su nombre en un año.', frase: 'en doce meses' },
      { rotulo: 'La solución', texto: 'Un centro de embudo: quién eres, qué defiendes, tus contenidos y cada oferta en un solo lugar.', frase: 'un centro de embudo', destacada: true },
    ],
    pregunta: { frase: 'qué encuentra hoy una persona', texto: '¿Qué encuentra hoy una persona que escribe el nombre de tu empresa en un buscador?' },
  }),
  pag({
    id: 'br-afiliados', titulo: 'Un ejército', destaque: 'de afiliados', bajada: 'Que otros vendan lo tuyo y cobren solo si venden.',
    inicio: 'brunson cuenta que cuando leyó',
    anclas: {
      foro: 'en un foro', red: 'mi propia red de afiliados', mejor: 'el mejor en tráfico', venta: 'solo por venta realizada', mucho: 'pagar mucho', competencia: 'la competencia pagaba',
      cuarenta: 'él ofreció cuarenta', entrada: 'para las ofertas de entrada', libro: 'veinte dólares por cada libro regalado', mitad: 'mitad y mitad', capacita: 'capacita a los afiliados',
      riesgo: 'traslada el riesgo', honestidad: 'exige honestidad',
    },
    tarjetas: [
      { rotulo: 'La idea', texto: 'No hace falta ser el mejor en tráfico: basta con que otros ganen promocionando lo tuyo.', frase: 'mi propia red de afiliados' },
      { rotulo: 'Pagar mucho', texto: 'Mercado: 20–30 %. Brunson: 40 % recurrente; en ofertas de entrada, hasta el 100 % de la utilidad inicial.', frase: 'la competencia pagaba', destacada: true },
      { rotulo: 'La condición', texto: 'Un afiliado que recomienda algo que no funciona pierde su propia audiencia.', frase: 'exige honestidad' },
    ],
    pregunta: { frase: 'quiénes podrían vender lo tuyo', texto: '¿Quiénes podrían vender lo tuyo por una comisión justa y qué materiales les darías?' },
  }),
  pag({
    id: 'br-limites', titulo: 'Dónde sí', destaque: 'funciona', bajada: 'Una herramienta de adquisición, no un modelo de negocio completo.',
    inicio: 'hasta aquí el método',
    anclas: {
      examinar: 'conviene examinarlo', economica: 'es la económica', capital: 'no necesitas capital externo', lineal: 'embudo lineal tiene respaldo', iyengar: 'iyengar y lepper',
      veinticuatro: 'veinticuatro variedades', tres: 'el tres por ciento compró', seis: 'cuando se ofrecieron seis', paralisis: 'menos parálisis', herramienta: 'una herramienta de adquisición',
      rapida: 'rápida individual y de bajo precio', comite: 'lo compra un comité',
    },
    tarjetas: [
      { rotulo: 'Lo defendible', texto: 'Si las primeras compras pagan la adquisición, no necesitas capital externo para crecer.', frase: 'es la económica' },
      { rotulo: 'Iyengar y Lepper (2000)', texto: '24 variedades de mermelada → 3 % compra; 6 variedades → cerca del 30 %.', frase: 'iyengar y lepper', destacada: true },
      { rotulo: 'El límite', texto: 'Rinde con compras rápidas, individuales y baratas; no con productos caros, comités o clientes de años.', frase: 'una herramienta de adquisición' },
    ],
    pregunta: { frase: 'tu negocio vende con compra rápida', texto: '¿Tu negocio vende con compra rápida y barata o con decisión larga y de varias personas?' },
  }),
  pag({
    id: 'br-marca', titulo: 'Activación', destaque: 'y marca', bajada: 'El embudo pesca en el 5 % que está comprando hoy.',
    inicio: 'les binet y peter field',
    anclas: {
      binet: 'les binet y peter field', mil: 'cerca de mil casos', dos: 'dos mecánicas distintas', activacion: 'la activación a corto plazo', picos: 'produce picos de ventas',
      marca: 'la construcción de marca crea', sesenta: 'sesenta por ciento a marca', b2b: 'cuarenta y seis y cincuenta', dawes: 'john dawes', cinco: 'cerca del cinco por ciento',
      pesca: 'el embudo pesca', sharp: 'byron sharp', justos: 'para ser justos',
    },
    tarjetas: [
      { rotulo: 'Dos mecánicas', texto: 'Activación: picos de venta con la demanda existente · Marca: memoria y menor sensibilidad al precio.', frase: 'dos mecánicas distintas' },
      { rotulo: 'Proporciones', texto: 'Consumo masivo 60/40 · empresas 46/54 (marca/activación).', frase: 'sesenta por ciento a marca', destacada: true },
      { rotulo: 'La regla 95-5', texto: 'John Dawes (2021): solo cerca del 5 % de los compradores B2B está en el mercado hoy.', frase: 'john dawes' },
    ],
    pregunta: { frase: 'qué haces hoy para que te recuerden', texto: '¿Qué haces hoy para que te recuerden quienes no van a comprar este trimestre?' },
  }),
  pag({
    id: 'br-reactancia', titulo: 'Presión y', destaque: 'reactancia', bajada: 'Lo que cierra ventas baratas espanta a un comprador profesional.',
    inicio: 'neil rackham dirigió',
    anclas: {
      rackham: 'neil rackham dirigió', llamadas: 'treinta y cinco mil llamadas', paises: 'veintitrés países', pequenas: 'ayudaban en ventas pequeñas', grandes: 'perjudicaban en ventas grandes',
      brehm: 'jack brehm', reacciona: 'reacciona en contra', reloj: 'un reloj de cuenta regresiva', quince: 'casi quince mil dólares', guion: 'su guion de llamadas', credito: 'crédito bancario',
      ensenanza: 'enseñanza y diagnóstico',
    },
    tarjetas: [
      { rotulo: 'Rackham (SPIN, 1988)', texto: '35.000 llamadas en 23 países: los cierres ayudan en ventas pequeñas y perjudican en las grandes.', frase: 'neil rackham dirigió', destacada: true },
      { rotulo: 'Reactancia (Brehm, 1966)', texto: 'Si alguien siente que lo presionan, reacciona en contra: reloj falso, valor inflado, síes forzados.', frase: 'jack brehm' },
      { rotulo: 'En venta a empresas', texto: 'Cambiar la presión por enseñanza y diagnóstico.', frase: 'enseñanza y diagnóstico' },
    ],
    pregunta: { frase: 'cuál de las técnicas de presión', texto: '¿Qué técnica de esta clase usarías con un cliente corporativo y cuál evitarías?' },
  }),
  pag({
    id: 'br-comite', titulo: 'El comité y', destaque: 'la indecisión', bajada: 'En ventas a empresas el rival suele ser no hacer nada.',
    inicio: 'brunson imagina a un comprador individual',
    anclas: {
      individual: 'un comprador individual', gartner: 'según gartner', seis: 'entre seis y diez personas', dixon: 'matthew dixon y ted mckenna', millones: 'dos coma cinco millones',
      indecision: 'se pierden por indecisión', nada: 'prefiere no hacer nada', escasez: 'escasez de última hora', reducir: 'reducir el riesgo percibido', acotar: 'acotar el alcance',
      challenger: 'the challenger sale', ensenanza: 'la enseñanza comercial',
    },
    tarjetas: [
      { rotulo: 'Quién decide', texto: 'Según Gartner, entre seis y diez personas en una compra de empresa.', frase: 'entre seis y diez personas' },
      { rotulo: 'The Jolt Effect (2022)', texto: '2,5 millones de conversaciones: entre 40 y 60 % de las oportunidades se pierden por no decidir.', frase: 'se pierden por indecisión', destacada: true },
      { rotulo: 'Lo que cierra', texto: 'Reducir el riesgo percibido: alcance inicial acotado, casos parecidos y garantías operativas.', frase: 'reducir el riesgo percibido' },
    ],
    pregunta: { frase: 'qué miedo concreto', texto: '¿Qué miedo concreto tiene el comité que decide sobre tu oferta y cómo lo reduces?' },
  }),
  pag({
    id: 'br-retencion', titulo: 'Retener', destaque: 'vale más', bajada: 'Un buen embudo con un mal servicio solo acelera la caída.',
    inicio: 'brunson trata casi solo de adquisición',
    anclas: {
      poco: 'dedica poco espacio', reichheld: 'frederick reichheld', cinco: 'en cinco por ciento', utilidades: 'entre veinticinco y ochenta y cinco', retenido: 'un cliente retenido',
      oliver: 'richard oliver', satisfaccion: 'la satisfacción es la diferencia', diez: 'en diez minutos', anderson: 'eugene anderson', insatisfechos: 'muy insatisfechos', bernbach: 'bill bernbach',
    },
    tarjetas: [
      { rotulo: 'Reichheld y Sasser (1990)', texto: '5 % menos de deserción → entre 25 y 85 % más de utilidades, según el sector.', frase: 'frederick reichheld', destacada: true },
      { rotulo: 'Expectativas (Oliver, 1980)', texto: 'Satisfacción = lo percibido frente a lo prometido.', frase: 'richard oliver' },
      { rotulo: 'Boca a boca (Anderson, 1998)', texto: 'Los muy insatisfechos le cuentan a más gente que los satisfechos.', frase: 'eugene anderson' },
    ],
    pregunta: { frase: 'qué parte de tu servicio', texto: '¿Qué parte de tu servicio sostiene hoy lo que prometen tus anuncios?' },
  }),
  pag({
    id: 'br-sesgos', titulo: 'La evidencia', destaque: 'que falta', bajada: 'Casos de éxito sin denominador no prueban un método.',
    inicio: 'queda una advertencia',
    anclas: {
      club: 'club de las dos comas', setenta: 'setenta y una personas', denominador: 'falta el denominador', wald: 'abraham wald', aviones: 'qué aviones volvían', tasa: 'la falacia de la tasa base',
      facturar: 'facturar no es ganar', palas: 'los vendedores de palas', aplica: 'él sí aplica lo que enseña', vender: 'vender software y formación', industrias: 'industrias reales',
    },
    tarjetas: [
      { rotulo: 'El club de las dos comas', texto: '71 personas con más de un millón en un embudo en 2016 (según Brunson); falta cuántos fracasaron.', frase: 'club de las dos comas' },
      { rotulo: 'Sesgo de supervivencia', texto: 'Wald (1943): mirar solo a los que volvieron engaña. Y la tasa base (Kahneman y Tversky, 1973).', frase: 'abraham wald', destacada: true },
      { rotulo: 'Facturar no es ganar', texto: 'Un millón vendido puede costar casi un millón en anuncios.', frase: 'facturar no es ganar' },
    ],
    pregunta: { frase: 'qué evidencia exigirías', texto: '¿Qué evidencia exigirías antes de aplicar una táctica que solo conoces por sus casos de éxito?' },
  }),
  pag({
    id: 'br-sintesis', titulo: 'Qué', destaque: 'conservar', bajada: 'Un sistema para captar demanda, conectado a un producto que la sostenga.',
    inicio: 'la trilogía de brunson no enseña',
    anclas: {
      sistema: 'un sistema para captar', quedarse: 'merece quedarse', escalera: 'una escalera de valor completa', entrada: 'una oferta de entrada', frase: 'una promesa que se pueda decir',
      propio: 'tráfico propio', descartarse: 'debe descartarse', conectas: 'cuando conectas esa arquitectura', copias: 'si copias solo', revisa: 'revisa tu escalera', domino: 'escribe tu gran dominó',
      lista: 'arma una lista de cincuenta',
    },
    tarjetas: [
      { rotulo: 'Conservar', texto: 'Escalera completa, oferta de entrada que financia, una sola promesa, dudas desactivadas y tráfico propio.', frase: 'merece quedarse' },
      { rotulo: 'Descartar', texto: 'La teatralidad y la presión con compradores profesionales, y creer que el primer día es todo el negocio.', frase: 'debe descartarse' },
      { rotulo: 'Primer paso', texto: 'Revisa tu escalera · escribe tu gran dominó y tus tres dudas · lista 50 lugares y 50 frases.', frase: 'revisa tu escalera', destacada: true },
    ],
    pregunta: { frase: 'cuál será tu primer paso', texto: '¿Cuál será tu primer paso esta semana?' },
  }),
];

export const PAGINAS: Record<string, PaginaBR> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
