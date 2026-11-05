import type { Pagina, Tarjeta } from '../influencia/tipos';

/* «Esencialismo: menos, pero mejor». Fuentes: Greg McKeown («Esencialismo» y «Sin esfuerzo») y Jack Trout y
   Steve Rivkin («El poder de lo simple»). Cada página declara sus anclas como { nombre: frase del guion } en el
   orden en que suenan (datos puros, sin React: el generador de tiempos los lee con esbuild). */

export type PaginaES = Pagina & { anclas: Record<string, string> };

export const pag = (p: Omit<PaginaES, 'frases' | 'els' | 'tarjetas'> & { tarjetas: Tarjeta[] }): PaginaES => ({ ...p, frases: Object.values(p.anclas), els: [] });

export const portada = pag({
  id: 'es-portada', titulo: 'Esencialismo:', destaque: 'menos, pero mejor',
  bajada: 'Tácticas para que un equipo haga solo lo esencial, de la forma más simple.',
  inicio: 'los equipos que más logran no son los que hacen más cosas',
  anclas: {
    equipos: 'los equipos que más logran', menos: 'se atreven a hacer menos', rams: 'dieter rams', palabras: 'weniger aber besser', grabadora: 'le encargaron una grabadora',
    mueble: 'dentro de un mueble de madera', quito: 'quitó todo lo innecesario', quiebra: 'llevara a la empresa a la quiebra', industria: 'copió toda la industria',
    mckeown: 'greg mckeown llama esencialismo', sinesfuerzo: 'un segundo libro sin esfuerzo', trout: 'jack trout y steve rivkin', complejidad: 'la complejidad casi nunca es inteligencia',
    ciclo: 'tres movimientos que se repiten', explorar: 'explorar para distinguir', eliminar: 'eliminar lo que sobra', ejecutar: 'ejecutar lo que queda',
  },
  tarjetas: [
    { rotulo: 'Weniger aber besser', texto: 'Menos, pero mejor: el criterio de Dieter Rams, que dejó la grabadora de Braun sin su mueble de madera.', frase: 'weniger aber besser', destacada: true },
    { rotulo: 'Tres libros', texto: 'Esencialismo y Sin esfuerzo (Greg McKeown) y El poder de lo simple (Jack Trout y Steve Rivkin).', frase: 'greg mckeown llama esencialismo' },
    { rotulo: 'Un ciclo', texto: 'Explorar para distinguir lo vital, eliminar lo que sobra y ejecutar lo que queda casi sin fricción.', frase: 'tres movimientos que se repiten' },
  ],
  pregunta: { frase: 'cuánto de lo que tu equipo hace', texto: '¿Cuánto de lo que tu equipo hace esta semana pasaría el filtro de menos, pero mejor?' },
});

export const sam = pag({
  id: 'es-sam', titulo: 'El ejecutivo', destaque: 'que dijo que no',
  bajada: 'Decir que sí a todo bajó su calidad; filtrar cada pedido la recuperó.',
  inicio: 'todo empieza con un ejecutivo de silicon valley',
  anclas: {
    sam: 'al que mckeown llama sam elliot', comprada: 'comprada por otra más grande', todo: 'dijo que sí a todo', estres: 'su estrés subía', jubilarse: 'le ofrecieron jubilarse',
    consejo: 'haz solo lo que harías como asesor', timida: 'una pregunta tímida', estricta: 'una más estricta', rotundo: 'un sí rotundo', reunion: 'dejó la reunión semanal',
    invitado: 'estar invitado no era razón', colegas: 'sus colegas se decepcionaron', evaluacion: 'su evaluación de desempeño subió', bono: 'uno de los bonos más grandes', idea: 'ahí está la idea central',
  },
  tarjetas: [
    { rotulo: 'Sí a todo', texto: 'Reuniones, llamadas y presentaciones de último minuto: el estrés subía y la calidad bajaba.', frase: 'dijo que sí a todo' },
    { rotulo: 'Dos filtros', texto: '¿Puedo cumplirlo con lo que tengo? Y después: ¿es lo más importante que debería hacer ahora?', frase: 'una pregunta tímida', destacada: true },
    { rotulo: 'El resultado', texto: 'Mejor evaluación de desempeño y uno de los bonos más grandes de su carrera.', frase: 'su evaluación de desempeño subió' },
  ],
  pregunta: { frase: 'a cuántas reuniones de tu equipo', texto: '¿A cuántas reuniones de tu equipo asiste alguien solo porque fue invitado?' },
});

export const paradoja = pag({
  id: 'es-paradoja', titulo: 'La paradoja', destaque: 'del éxito',
  bajada: 'El éxito trae opciones, y las opciones consumen la claridad que lo produjo.',
  inicio: 'que personas capaces terminen como sam',
  anclas: {
    paradoja: 'la paradoja del éxito', claridad: 'cuando tienes claro tu propósito', acuden: 'la persona a la que todos acuden', reparte: 'tu esfuerzo se reparte',
    aleja: 'la dispersión te aleja', consume: 'termina consumiendo la claridad', collins: 'jim collins encontró', wall: 'estrellas de wall street',
    indisciplinada: 'la búsqueda indisciplinada de más', extra: 'recibe un proyecto extra', fatiga: 'fatiga de decisión', millon: 'un millón de direcciones', pocas: 'concentrada en pocas cosas',
  },
  tarjetas: [
    { rotulo: 'Cuatro fases', texto: 'Claridad → éxito → más opciones → dispersión, que consume la claridad inicial.', frase: 'la paradoja del éxito', destacada: true },
    { rotulo: 'Jim Collins', texto: '«Cómo caen los poderosos»: la búsqueda indisciplinada de más.', frase: 'jim collins encontró' },
    { rotulo: 'Fatiga de decisión', texto: 'Cuantas más elecciones enfrentas, peor es la calidad de lo que decides.', frase: 'fatiga de decisión' },
  ],
  pregunta: { frase: 'en qué fase de la paradoja', texto: '¿En qué fase de la paradoja está hoy tu equipo?' },
});

export const prioridad = pag({
  id: 'es-prioridad', titulo: 'Prioridad,', destaque: 'en singular',
  bajada: 'Si no estableces tus prioridades, alguien más lo hará por ti.',
  inicio: 'la palabra prioridad nació en singular',
  anclas: {
    singular: 'nació en singular', plural: 'el plural llegó mucho después', pri: 'pri 1 pri 2', ninguna: 'ninguna lo era', seligman: 'martin seligman', palanca: 'con una palanca',
    caja: 'en una caja donde bastaba saltar', intentaron: 'ni siquiera lo intentaron', reacciones: 'dos reacciones', rinden: 'algunas personas se rinden', aceptan: 'aceptan todo',
    regla: 'alguien más lo hará por ti', capacidad: 'la capacidad de elegir',
  },
  tarjetas: [
    { rotulo: 'Pri-1 a Pri-5', texto: 'Cuando muchas cosas parecen prioridad, en realidad ninguna lo es.', frase: 'pri 1 pri 2' },
    { rotulo: 'Indefensión aprendida', texto: 'Seligman y Maier: quien aprendió que nada de lo que hace importa, deja de intentar.', frase: 'martin seligman' },
    { rotulo: 'La regla', texto: 'Las opciones te las pueden quitar; la capacidad de elegir entre ellas, no.', frase: 'alguien más lo hará por ti', destacada: true },
  ],
  pregunta: { frase: 'cuántas prioridades número uno', texto: '¿Cuántas prioridades número uno tiene tu equipo en este momento?' },
});

export const ruido = pag({
  id: 'es-ruido', titulo: 'Casi todo', destaque: 'es ruido',
  bajada: 'Pocas cosas vitales explican la mayor parte de los resultados.',
  inicio: 'elegir supone otra idea',
  anclas: {
    valor: 'no todo vale lo mismo', pareto: 'vilfredo pareto', ochenta: 'regla del ochenta veinte', juran: 'joseph juran', vitales: 'la ley de las pocas cosas vitales',
    japon: 'japón entonces conocido', hecho: 'hecho en japón', jager: 'durk jager', treinta: 'treinta y una variedades', cincuenta: 'cincuenta y dos versiones',
    retiro: 'retiró marcas marginales', buffett: 'warren buffett', letargo: 'raya en el letargo', paga: 'se paga solo',
  },
  tarjetas: [
    { rotulo: 'Juran, 1951', texto: 'La ley de las pocas cosas vitales: resolver unos pocos problemas mejora mucho la calidad.', frase: 'joseph juran', destacada: true },
    { rotulo: 'Procter & Gamble, 1996', texto: '¿31 variedades de Head & Shoulders y 52 versiones de Crest? Estandarizó fórmulas y retiró marcas marginales.', frase: 'durk jager' },
    { rotulo: 'Warren Buffett', texto: 'Pocas apuestas muy convencidas, mantenidas durante mucho tiempo.', frase: 'warren buffett' },
  ],
  pregunta: { frase: 'cuáles son las pocas actividades vitales', texto: '¿Cuáles son las pocas actividades vitales que explican la mayor parte de los resultados de tu equipo?' },
});

export const concesiones = pag({
  id: 'es-concesiones', titulo: 'Elegir qué', destaque: 'problema tener',
  bajada: 'Cada sí es también un no: las concesiones se hacen a propósito.',
  inicio: 'si casi todo es ruido cada sí es también un no',
  anclas: {
    si: 'cada sí es también un no', money: 'la revista money', southwest: 'sino southwest airlines', kelleher: 'herb kelleher', punto: 'solo vuelos de punto a punto',
    bajo: 'una aerolínea de bajo costo', continental: 'creó continental lite', quejas: 'mil quejas al día', despedido: 'fue despedido', mezclar: 'mezclar estrategias',
    crisis: 'protegen en una crisis', tylenol: 'frascos de tylenol', credo: 'un credo escrito en 1943', orden: 'los clientes al inicio', retiro: 'retiró todo el producto',
    cien: 'cien millones de dólares', problema: 'cuál es el problema que prefiere tener',
  },
  tarjetas: [
    { rotulo: 'Southwest (Money, 1972–2002)', texto: 'La acción que más rindió del S&P 500: punto a punto, sin comidas, sin asientos asignados, sin primera clase.', frase: 'sino southwest airlines' },
    { rotulo: 'Continental Lite (Porter)', texto: 'Copiar sin renunciar a nada: retrasos, cancelaciones y mil quejas al día.', frase: 'creó continental lite' },
    { rotulo: 'El credo de J&J', texto: 'Clientes primero, accionistas al final: retiró todo el Tylenol a un costo de cerca de 100 millones.', frase: 'un credo escrito en 1943', destacada: true },
  ],
  pregunta: { frase: 'qué renuncia explícita', texto: '¿Qué renuncia explícita podría hacer tu equipo para ser excelente en una sola cosa?' },
});

export const espacio = pag({
  id: 'es-espacio', titulo: 'Espacio', destaque: 'para pensar',
  bajada: 'Sin tiempo protegido, un equipo reacciona en vez de elegir.',
  inicio: 'antes de eliminar hay que explorar',
  anclas: {
    espacio: 'se necesita espacio', obrien: 'frank o brien', cincuenta: 'unas cincuenta personas', sin: 'sin teléfonos sin correo', lunes: 'el primer lunes del mes',
    alarma: 'le sirve de alarma', weiner: 'jeff weiner', dos: 'dos horas sin nada agendado', lujo: 'le pareció un lujo', gates: 'bill gates', semana: 'su semana para pensar',
    comite: 'el comité de claridad', preguntas: 'preguntas honestas', ocupado: 'cuanto más ocupado está un equipo',
  },
  tarjetas: [
    { rotulo: 'Lunes sin llamadas', texto: 'Frank O\'Brien reúne a toda su empresa un día al mes, sin teléfonos, correo ni agenda.', frase: 'frank o brien' },
    { rotulo: 'Dos horas en blanco', texto: 'Jeff Weiner (LinkedIn) protege dos horas diarias; Bill Gates, una semana para pensar.', frase: 'jeff weiner', destacada: true },
    { rotulo: 'Comité de claridad', texto: 'Ante un dilema, solo preguntas honestas y reflejar lo escuchado: sin consejos ni juicios.', frase: 'el comité de claridad' },
  ],
  pregunta: { frase: 'dónde está en la agenda de tu equipo', texto: '¿Dónde está, en la agenda de tu equipo, el espacio para pensar?' },
});

export const encabezado = pag({
  id: 'es-encabezado', titulo: 'Encontrar', destaque: 'el encabezado',
  bajada: 'Lo importante es lo que la información significa para quien la recibe.',
  inicio: 'explorar también es distinguir lo que importa',
  anclas: {
    distinguir: 'distinguir lo que importa', ephron: 'nora ephron', simms: 'charlie simms', sacramento: 'a sacramento', encabezado: 'pidió el encabezado',
    jueves: 'el jueves no habrá clases', punto: 'encontrar el punto', vuelo: 'el vuelo 401', perfecto: 'en perfecto estado', luz: 'no se había encendido la luz',
    altura: 'el avión perdía altura', pregunta: 'aclarar la pregunta', cohen: 'elay cohen', gano: 'ganaron por un margen enorme', diario: 'llevar un diario breve',
  },
  tarjetas: [
    { rotulo: 'El jueves no habrá clases', texto: 'El encabezado no repite quién, qué y dónde: dice qué significa para quien lo lee.', frase: 'el jueves no habrá clases', destacada: true },
    { rotulo: 'Vuelo 401 (1972)', texto: 'Un avión en perfecto estado: la tripulación miró una luz y nadie vio que perdía altura.', frase: 'el vuelo 401' },
    { rotulo: 'Aclarar la pregunta', texto: '¿Qué pregunta estamos tratando de responder? Con eso, el equipo de Elay Cohen ganó.', frase: 'aclarar la pregunta' },
  ],
  pregunta: { frase: 'cuál es el encabezado de lo que tu equipo', texto: '¿Cuál es el encabezado de lo que tu equipo hizo este mes?' },
});

export const simple = pag({
  id: 'es-simple', titulo: 'Hablar', destaque: 'simple',
  bajada: 'La complejidad casi nunca es inteligencia: suele ser falta de claridad.',
  inicio: 'el encabezado solo sirve si se dice en palabras simples',
  anclas: {
    simples: 'en palabras simples', agencia: 'una agencia de diseño', paradigmas: 'intencionalidad y paradigmas', joven: 'el más joven del grupo', nadie: 'nadie había entendido',
    entiendo: 'decir no lo entiendo', jerga: 'cazar la jerga', fortune: 'la revista fortune', dimensionar: 'dimensionar esta iniciativa', plan: 'hagamos un plan',
    claro: 'escribir claro', cortas: 'frases cortas', welch: 'jack welch', inseguros: 'los directivos inseguros', norma: 'una norma explícita', vuelve: 'vuelve a quien lo escribió',
  },
  tarjetas: [
    { rotulo: 'No lo entiendo', texto: 'Tras dos horas de «intencionalidad» y «paradigmas», nadie había entendido. Pedir la traducción es una táctica.', frase: 'decir no lo entiendo', destacada: true },
    { rotulo: 'Cazar la jerga', texto: '«Dimensionar esta iniciativa» quiere decir «hagamos un plan» (memos del infierno, Fortune).', frase: 'cazar la jerga' },
    { rotulo: 'Escribir claro', texto: 'Gunning y Flesch: frases cortas, palabras familiares, verbos activos, escribir como se habla.', frase: 'escribir claro' },
  ],
  pregunta: { frase: 'qué palabra de moda', texto: '¿Qué palabra de moda de tu equipo podría reemplazarse hoy por una frase simple?' },
});

export const activo = pag({
  id: 'es-activo', titulo: 'Proteger', destaque: 'el activo',
  bajada: 'Dormir y trabajar en bloques con pausas también es rendimiento.',
  inicio: 'el activo más valioso para contribuir son las personas',
  anclas: {
    activo: 'el activo más valioso', ericsson: 'k anders ericsson', violinistas: 'estudio de violinistas', sueno: 'el segundo factor', horas: '8 6 horas al día', siesta: '2 8 horas de siesta',
    sesiones: 'sesiones de entre sesenta y noventa', czeisler: 'charles czeisler', alcohol: 'de alcohol en la sangre', ebrio: 'trabajar ebrio', lubeck: 'universidad de lübeck',
    atajo: 'un atajo escondido', doble: 'el doble de veces', reorganiza: 'el cerebro reorganiza', tactica: 'proteger los bloques de concentración',
  },
  tarjetas: [
    { rotulo: 'Los mejores violinistas (Ericsson)', texto: '8,6 horas de sueño al día y 2,8 horas de siesta a la semana; práctica en sesiones de 60 a 90 minutos.', frase: 'k anders ericsson', destacada: true },
    { rotulo: 'Czeisler (Harvard)', texto: '24 horas sin dormir equivalen a 0,1 % de alcohol en la sangre.', frase: 'charles czeisler' },
    { rotulo: 'Lübeck (Nature)', texto: 'Quienes durmieron ocho horas hallaron el atajo escondido el doble de veces.', frase: 'universidad de lübeck' },
  ],
  pregunta: { frase: 'qué costumbre de tu equipo premia', texto: '¿Qué costumbre de tu equipo premia, sin querer, a quien duerme menos?' },
});

export const criterios = pag({
  id: 'es-criterios', titulo: 'Criterios', destaque: 'extremos',
  bajada: 'Si no es un sí evidente, es un no evidente.',
  inicio: 'explorar mucho sirve para decidir con criterios exigentes',
  anclas: {
    exigentes: 'criterios exigentes', sivers: 'derek sivers', claro: 'es un claro que sí', noventa: 'la regla del noventa por ciento', cero: 'de cero a cien',
    conviertes: 'la conviertes en cero', sesenta: 'un sesenta o un setenta', vitsoe: 'vitsoe la empresa', telefonica: 'una entrevista telefónica', dia: 'un día completo de trabajo',
    encuesta: 'una encuesta a todo el equipo', herramientas: 'arrojó sus herramientas', evidente: 'es un no evidente', minimos: 'tres criterios mínimos', extremos: 'tres criterios extremos',
    nuevo: 'la persona más nueva',
  },
  tarjetas: [
    { rotulo: 'Regla del 90 %', texto: 'Califica de 0 a 100 en el criterio clave; lo que no llega a 90 pasa a ser 0.', frase: 'la regla del noventa por ciento', destacada: true },
    { rotulo: 'Vitsoe contrata así', texto: 'Teléfono, varias entrevistas, un día de trabajo con el equipo y una encuesta a todos.', frase: 'vitsoe la empresa' },
    { rotulo: '3 mínimos + 3 extremos', texto: 'Si no pasa los mínimos o no cumple dos de los tres extremos, la respuesta es no.', frase: 'tres criterios mínimos' },
  ],
  pregunta: { frase: 'qué tres criterios extremos', texto: '¿Qué tres criterios extremos debería cumplir un proyecto para que tu equipo lo acepte?' },
});

export const objetivo = pag({
  id: 'es-objetivo', titulo: 'Un objetivo', destaque: 'esencial',
  bajada: 'Inspirador y concreto: que responda cómo sabremos que terminamos.',
  inicio: 'eliminar lo que sobra exige saber con precisión',
  anclas: {
    precision: 'con precisión para qué existe', politica: 'jugar a la política', bueno: 'el de todo es bueno', antidoto: 'el antídoto es un objetivo esencial', volvo: 'la de volvo',
    seguridad: 'la palabra ciento veintiséis', bullmore: 'jeremy bullmore', servicio: 'servicio aparecía doscientas treinta', linea: 'una misión de una línea', lane: 'martha lane fox',
    conectados: 'conectados a internet', terminado: 'cómo luce terminado', vasa: 'el vasa', hundio: 'se hundió en su viaje inaugural',
  },
  tarjetas: [
    { rotulo: 'Misiones que no orientan', texto: 'Volvo: 130 palabras y «seguridad» en la 126. En 301 misiones: servicio 230 veces, clientes 211, calidad 194.', frase: 'la de volvo' },
    { rotulo: 'Una línea', texto: '«Que todos en el Reino Unido estén conectados a internet a fines de 2012» (Martha Lane Fox).', frase: 'una misión de una línea', destacada: true },
    { rotulo: 'Cómo luce terminado', texto: 'El Vasa (1628) se hundió porque nadie fijó cuándo estaba listo.', frase: 'cómo luce terminado' },
  ],
  pregunta: { frase: 'cómo sabría tu equipo que cumplió', texto: '¿Cómo sabría tu equipo que cumplió su objetivo esencial?' },
});

export const noElegante = pag({
  id: 'es-no', titulo: 'El no', destaque: 'elegante',
  bajada: 'Se cambia popularidad por respeto.',
  inicio: 'con el objetivo claro llega lo más difícil',
  anclas: {
    dificil: 'decir que no a personas que respetas', covey: 'stephen covey', cynthia: 'su hija cynthia', tranvia: 'tranvía comida china', amigo: 'un viejo amigo', mariscos: 'cena de mariscos',
    noche: 'esa noche no', recordo: 'ella lo recordó', drucker: 'peter drucker', basura: 'un bote de basura muy grande', rand: 'paul rand', logo: 'opciones de logo', serios: 'más serios',
    separar: 'separar la decisión de la relación', vende: 'todo el mundo vende algo', respeto: 'popularidad por respeto', claro: 'un no claro es más amable',
  },
  tarjetas: [
    { rotulo: 'Covey y su hija', texto: '«Suena genial, pero esta noche no»: la cita con Cynthia valía más que la cena en el muelle.', frase: 'stephen covey' },
    { rotulo: 'Drucker y Rand', texto: 'Un bote de basura muy grande para invitaciones; una sola solución de logo para Steve Jobs.', frase: 'peter drucker' },
    { rotulo: 'Cuatro principios', texto: 'Separar decisión y relación; todos venden algo; popularidad por respeto; un no claro es más amable.', frase: 'separar la decisión de la relación', destacada: true },
  ],
  pregunta: { frase: 'a qué pedido le está dando tu equipo', texto: '¿A qué pedido le está dando tu equipo un sí vago que en realidad es un no?' },
});

export const repertorio = pag({
  id: 'es-repertorio', titulo: 'El repertorio', destaque: 'del no',
  bajada: 'Ocho maneras de decir que no sin romper la relación.',
  inicio: 'decir que no bien es una habilidad que se practica',
  anclas: {
    repertorio: 'tener un repertorio', pausa: 'la pausa incómoda', suave: 'el no suave', agenda: 'déjame revisar mi agenda', automatica: 'la respuesta automática', jefe: 'ante un jefe',
    humor: 'el humor', auto: 'puedes llevarte mi auto', otra: 'tal vez a otra persona', krill: 'kay krill', friel: 'tom friel', lento: 'el sí lento',
  },
  tarjetas: [
    { rotulo: 'Ganar tiempo', texto: 'La pausa incómoda, el «no, pero», «déjame revisar mi agenda» y la respuesta automática.', frase: 'la pausa incómoda' },
    { rotulo: 'Hacer visible la concesión', texto: 'Ante un jefe: «sí, ¿qué dejo de priorizar?». También el humor, «tú puedes X, yo hago Y» y derivar a otra persona.', frase: 'ante un jefe' },
    { rotulo: 'Tom Friel', texto: 'El sí lento y el no rápido.', frase: 'tom friel', destacada: true },
  ],
  pregunta: { frase: 'qué frase del repertorio', texto: '¿Qué frase del repertorio le serviría más a tu equipo frente a los pedidos urgentes?' },
});

export const compromisos = pag({
  id: 'es-compromisos', titulo: 'Salir de', destaque: 'un compromiso',
  bajada: 'Seguir invirtiendo porque ya se invirtió es la trampa del costo hundido.',
  inicio: 'tan difícil como no comprometerse es salir de un compromiso',
  anclas: {
    salir: 'salir de un compromiso', concorde: 'el concorde volaba', perdio: 'perdió dinero durante décadas', ministros: 'los ministros sabían', hundido: 'la trampa del costo hundido',
    dotacion: 'el efecto de dotación', taza: 'recibieron una taza', vendian: 'por menos de 5 25 dólares', ofrecian: 'entre 2 25 y 2 75', nuestro: 'lo que es nuestro',
    entrar: 'por entrar a un proyecto', basecero: 'un presupuesto base cero', ranking: 'el presupuesto en ranking', tres: 'aunque solo alcance para tres', opinion: 'una segunda opinión',
    reversa: 'un piloto de reversa', menos: 'nadie lo había echado de menos',
  },
  tarjetas: [
    { rotulo: 'Costo hundido y dotación', texto: 'El Concorde perdió dinero por décadas. La taza: el dueño pide 5,25 dólares; el comprador ofrece 2,25–2,75.', frase: 'la trampa del costo hundido' },
    { rotulo: 'Presupuestos', texto: 'Base cero: cada compromiso se justifica desde cero. En ranking: se financia de arriba abajo hasta que se acaba el dinero.', frase: 'un presupuesto base cero', destacada: true },
    { rotulo: 'Piloto de reversa', texto: 'Dejar de hacer algo y esperar: si nadie lo echa de menos, se elimina.', frase: 'un piloto de reversa' },
  ],
  pregunta: { frase: 'qué informe reunión o proceso', texto: '¿Qué informe, reunión o proceso de tu equipo resistiría un piloto de reversa?' },
});

export const editar = pag({
  id: 'es-editar', titulo: 'Editar y', destaque: 'poner límites',
  bajada: 'Cortar, condensar, corregir y saber no intervenir.',
  inicio: 'eliminar se parece al trabajo de un editor de cine',
  anclas: {
    editor: 'un editor de cine', oscar: 'el óscar a mejor película', tercios: 'dos tercios de los casos', dorsey: 'jack dorsey', mil: 'entre mil cosas posibles', cortar: 'cortar opciones',
    intervenir: 'saber no intervenir', limites: 'la otra mitad son los límites', christensen: 'clayton christensen', sabado: 'trabajar un sábado', domingo: 'luego un domingo',
    excepcion: 'si hubiera hecho una excepción', cloud: 'henry cloud', pasto: 'se riega con tu agua', seca: 'el tuyo se seca', contrato: 'un contrato social',
  },
  tarjetas: [
    { rotulo: 'La edición gana', texto: 'Desde 1981, ninguna mejor película ganó sin estar nominada a mejor edición.', frase: 'el óscar a mejor película' },
    { rotulo: 'Christensen', texto: 'Ni sábado ni domingo: «si hubiera hecho una excepción, habría tenido que hacer muchas».', frase: 'clayton christensen', destacada: true },
    { rotulo: 'Contrato social', texto: 'Al inicio de cada proyecto: qué queremos lograr y qué le importa a cada persona.', frase: 'un contrato social' },
  ],
  pregunta: { frase: 'qué límite de tu equipo', texto: '¿Qué límite de tu equipo nadie ha dicho en voz alta?' },
});

export const informacion = pag({
  id: 'es-informacion', titulo: 'Menos', destaque: 'información',
  bajada: 'Informes y reuniones que caben en una sola hoja.',
  inicio: 'hay un terreno donde editar rinde más',
  anclas: {
    informacion: 'la información que circula', reglas: 'reglas que se pueden adoptar', resumen: 'un resumen de un párrafo', devuelve: 'se devuelve', viernes: 'cada viernes',
    correo: 'el correo se revisa a horas fijas', reunion: 'no se convoca una reunión', gerstner: 'lou gerstner', proyector: 'apagó el proyector', negocio: 'hablemos solo de tu negocio',
    costumbre: 'cambió la costumbre', diez: 'no te obliga a entregar diez',
  },
  tarjetas: [
    { rotulo: 'Reglas de Trout y Rivkin', texto: 'Resumen de un párrafo o se devuelve; una hoja los viernes; correo a horas fijas; reunión solo para resolver.', frase: 'reglas que se pueden adoptar', destacada: true },
    { rotulo: 'Lou Gerstner, IBM', texto: 'Apagó el proyector: «hablemos solo de tu negocio».', frase: 'lou gerstner' },
    { rotulo: 'Sin esfuerzo', texto: 'Que te pidan una cosa no te obliga a entregar diez.', frase: 'no te obliga a entregar diez' },
  ],
  pregunta: { frase: 'qué informe o reunión de tu equipo', texto: '¿Qué informe o reunión de tu equipo podría reducirse a una sola página?' },
});

export const amortiguar = pag({
  id: 'es-amortiguar', titulo: 'Amortiguar', destaque: 'lo inesperado',
  bajada: 'Colchones de tiempo y un ritmo sostenible.',
  inicio: 'ejecutar sin fricción empieza por aceptar',
  anclas: {
    inesperado: 'lo inesperado va a ocurrir', falacia: 'falacia de la planificación', estudiantes: 'treinta y siete estudiantes', bien: '27 4 días', mal: '48 6 días', tardaron: 'tardaron 55 5 días',
    treinta: 'el treinta por ciento terminó', colchon: 'un colchón del cincuenta por ciento', polo: 'la carrera al polo sur', amundsen: 'roald amundsen llevó', scott: 'robert falcon scott',
    ritmo: 'unos veinticuatro kilómetros diarios', volvio: 'amundsen volvió', collins: 'jim collins y morten hansen', siete: 'hasta quedarse con siete', preparaban: 'se preparaban mejor',
    rango: 'un rango de ritmo',
  },
  tarjetas: [
    { rotulo: 'Falacia de la planificación', texto: 'Estimaron 27,4 días (mejor caso) y 48,6 (peor); tardaron 55,5. Solo el 30 % cumplió.', frase: 'falacia de la planificación' },
    { rotulo: 'Colchón del 50 %', texto: 'Si una reunión toma una hora, se reserva una hora y media.', frase: 'un colchón del cincuenta por ciento', destacada: true },
    { rotulo: 'Amundsen frente a Scott', texto: '4 termómetros, 3 toneladas, 20 banderas y 24 km diarios, frente a 1, 1 y 1.', frase: 'la carrera al polo sur' },
  ],
  pregunta: { frase: 'dónde necesita tu equipo un colchón', texto: '¿Dónde necesita tu equipo un colchón del cincuenta por ciento?' },
});

export const prevenir = pag({
  id: 'es-prevenir', titulo: 'Prevenir', destaque: 'de raíz',
  bajada: 'Un colchón absorbe lo inesperado; prevenir elimina lo que se repite.',
  inicio: 'un colchón absorbe lo inesperado',
  anclas: {
    prevenir: 'prevenir elimina lo que se repite', irrita: 'qué problema nos irrita', cuesta: 'cuánto nos cuesta convivir', minutos: 'qué acción de pocos minutos', expedia: 'el caso de expedia',
    cincuenta: 'cincuenta y ocho de cada cien', veinte: 'veinte millones de llamadas', itinerario: 'una copia del itinerario', autoservicio: 'opciones de autoservicio', quince: 'a quince de cada cien',
    roberto: 'michael roberto', umbrales: 'umbrales escritos', cualquiera: 'autorizan a cualquiera', setenta: 'setenta y uno por ciento', muertes: 'las muertes dieciocho por ciento',
    raiz: 'atacar su causa una sola vez', incendio: 'el mismo incendio cada lunes',
  },
  tarjetas: [
    { rotulo: 'Tres preguntas', texto: '¿Qué problema se repite? ¿Cuánto cuesta convivir con él? ¿Qué acción de pocos minutos lo resuelve de raíz?', frase: 'qué problema nos irrita', destacada: true },
    { rotulo: 'Expedia (Dan Heath)', texto: 'Llamaban 58 de cada 100 clientes, sobre todo por el itinerario; con autoservicio, 15 de cada 100.', frase: 'el caso de expedia' },
    { rotulo: 'Respuesta rápida (Roberto)', texto: 'Umbrales escritos que autorizan a cualquiera: códigos azules −71 % y muertes −18 %.', frase: 'michael roberto' },
  ],
  pregunta: { frase: 'qué problema de tu equipo se resuelve', texto: '¿Qué problema de tu equipo se resuelve cada semana y nunca de raíz?' },
});

export const facil = pag({
  id: 'es-facil', titulo: '¿Y si esto', destaque: 'fuera fácil?',
  bajada: 'Buscar los pasos mínimos antes de esforzarse.',
  inicio: 'en sin esfuerzo mckeown propone invertir la pregunta',
  anclas: {
    invertir: 'invertir la pregunta habitual', dificil: 'por qué esto es tan difícil', facil: 'y si esto pudiera ser fácil', dos: 'dos millones de dólares', boleto: 'esto es un boleto',
    funciono: 'y funcionó', minimos: 'buscar los pasos mínimos', amazon: 'en amazon', meses: 'pasó meses optimizando', bezos: 'jeff bezos', clic: 'la compra con un clic',
    agil: 'el manifiesto ágil', simplicidad: 'maximizar la cantidad de trabajo no hecho', pasos: 'escribir todos sus pasos', existiera: 'si ese paso no existiera', camino: 'el camino fácil sea también el correcto',
  },
  tarjetas: [
    { rotulo: 'Southwest', texto: 'Frente a un sistema de unos 2 millones de dólares: un papel que decía «esto es un boleto».', frase: 'dos millones de dólares' },
    { rotulo: 'Amazon', texto: 'De meses optimizando cada paso del pago a la compra con un clic.', frase: 'en amazon' },
    { rotulo: 'Manifiesto Ágil (2001)', texto: 'La simplicidad, el arte de maximizar la cantidad de trabajo no hecho, es esencial.', frase: 'el manifiesto ágil', destacada: true },
  ],
  pregunta: { frase: 'qué proceso de tu equipo se podría reducir', texto: '¿Qué proceso de tu equipo se podría reducir a la mitad de sus pasos?' },
});

export const restar = pag({
  id: 'es-restar', titulo: 'Restar', destaque: 'obstáculos',
  bajada: 'Mejorar el cuello de botella acelera a todo el sistema.',
  inicio: 'además de simplificar se puede restar',
  anclas: {
    restar: 'se puede restar', meta: 'la meta de eliyahu goldratt', planta: 'salvar una planta', scouts: 'niños scouts', herbie: 'herbie el más lento', adelante: 'lo puso adelante',
    mochila: 'peso a la mochila', acelera: 'aceleraba a todo el grupo', maquina: 'la máquina que tenía más trabajo', restricciones: 'la teoría de las restricciones', pasos: 'el método tiene tres pasos',
    jueves: 'el jueves a las dos', obstaculos: 'listar los obstáculos', perfecto: 'terminado es mejor que perfecto', persona: 'si el obstáculo es otra persona', estorba: 'quita lo que estorba',
  },
  tarjetas: [
    { rotulo: 'Herbie (La meta)', texto: 'Al frente de la fila y con la mochila más liviana: cualquier mejora en él acelera a todo el grupo.', frase: 'herbie el más lento', destacada: true },
    { rotulo: 'Tres pasos', texto: 'Meta clara; el obstáculo que, al quitarlo, hace desaparecer a la mayoría; quitarlo.', frase: 'el método tiene tres pasos' },
    { rotulo: 'Terminado > perfecto', texto: 'A veces el obstáculo es el deseo de perfección.', frase: 'terminado es mejor que perfecto' },
  ],
  pregunta: { frase: 'quién o qué es el herbie', texto: '¿Quién o qué es el Herbie de tu equipo hoy?' },
});

export const victorias = pag({
  id: 'es-victorias', titulo: 'Pequeñas', destaque: 'victorias',
  bajada: 'El progreso visible es el motivador más fuerte.',
  inicio: 'el impulso nace de avances pequeños y visibles',
  anclas: {
    impulso: 'avances pequeños y visibles', herzberg: 'frederick herzberg', logro: 'el logro y el reconocimiento', amabile: 'teresa amabile', victoria: 'aunque sea una pequeña victoria',
    tacticas: 'hay tres tácticas', primera: 'la primera acción obvia', netflix: 'los fundadores de netflix', disco: 'un solo disco por correo', fea: 'una primera versión fea',
    maccready: 'paul maccready', fallar: 'volar y fallar cientos de veces', hoffman: 'reid hoffman', error: 'una tasa de error', visible: 'el progreso visible', richmond: 'la policía de richmond',
    multas: 'multas positivas', pared: 'pegó su multa en la pared',
  },
  tarjetas: [
    { rotulo: 'Evidencia', texto: 'Herzberg (HBR, 1968): logro y reconocimiento. Amabile y Kramer: progresar en algo significativo.', frase: 'frederick herzberg' },
    { rotulo: 'Primera acción obvia', texto: 'Netflix empezó enviándose un solo disco por correo.', frase: 'la primera acción obvia', destacada: true },
    { rotulo: 'Versión fea y progreso visible', texto: 'MacCready voló y falló cientos de veces; Hoffman aceptaba 10–20 % de error; Richmond premia lo bien hecho.', frase: 'una primera versión fea' },
  ],
  pregunta: { frase: 'cuál es la primera acción obvia del proyecto', texto: '¿Cuál es la primera acción obvia del proyecto que tu equipo viene postergando?' },
});

export const rutinas = pag({
  id: 'es-rutinas', titulo: 'Rutinas que', destaque: 'piensan por ti',
  bajada: 'Lo esencial se vuelve fácil cuando no hay que decidirlo cada vez.',
  inicio: 'lo esencial se vuelve fácil cuando no depende de decidirlo',
  anclas: {
    decidirlo: 'decidirlo cada vez', phelps: 'michael phelps', calentamiento: 'un calentamiento preciso', izquierdo: 'por el lado izquierdo', video: 'lo que llamaban ver el video',
    ocho: 'ocho medallas de oro', duke: 'universidad de duke', cuarenta: 'cuarenta por ciento', duhigg: 'charles duhigg', senal: 'una señal una rutina y una recompensa',
    lista: 'una lista de verificación', boeing: 'modelo 299 de boeing', olvido: 'el piloto olvidó un paso', b17: 'rebautizado b 17', gawande: 'atul gawande', dorsey: 'un tema a cada día',
    una: 'una rutina a la vez',
  },
  tarjetas: [
    { rotulo: 'Hábitos', texto: 'Duke: cerca del 40 % de lo que hacemos ocurre por hábito. Duhigg: señal, rutina y recompensa.', frase: 'universidad de duke' },
    { rotulo: 'Lista de verificación', texto: 'Boeing 299 (1935): de un accidente por un paso olvidado al B-17 que voló millones de kilómetros (Gawande).', frase: 'una lista de verificación', destacada: true },
    { rotulo: 'Una a la vez', texto: 'Phelps repetía su rutina; Dorsey da un tema a cada día. Se instala una rutina a la vez.', frase: 'una rutina a la vez' },
  ],
  pregunta: { frase: 'qué tarea de tu equipo merece una lista', texto: '¿Qué tarea de tu equipo merece una lista de verificación de cinco pasos?' },
});

export const ahora = pag({
  id: 'es-ahora', titulo: '¿Qué es lo', destaque: 'importante ahora?',
  bajada: 'Hacer dos cosas a la vez se puede; concentrarse en dos, no.',
  inicio: 'la última pieza de la ejecución ocurre en un solo momento',
  anclas: {
    presente: 'en un solo momento el presente', gelwix: 'larry gelwix', ahora: 'qué es lo importante ahora', anterior: 'el error de la jugada anterior', vencido: 'ser vencido es enfrentar',
    perder: 'perder es perder la concentración', griegos: 'los griegos tenían dos palabras', cronos: 'cronos el tiempo del reloj', kairos: 'y kairós', platos: 'lavar platos y escuchar la radio',
    dos: 'concentrarnos en dos cosas a la vez', multi: 'sino la multiconcentración', hotel: 'en un hotel', futuro: 'sacar el futuro de la cabeza', rodgers: 'jeffrey rodgers',
    respira: 'respira profundo una vez', conversacion: 'una sola conversación a la vez',
  },
  tarjetas: [
    { rotulo: 'Larry Gelwix', texto: 'No la jugada anterior ni el próximo partido: la jugada actual.', frase: 'larry gelwix' },
    { rotulo: 'Cronos y kairós', texto: 'El tiempo del reloj y el momento oportuno, que solo se vive estando presente.', frase: 'los griegos tenían dos palabras' },
    { rotulo: 'Multiconcentración', texto: 'El enemigo no es la multitarea: es concentrarse en dos cosas a la vez.', frase: 'sino la multiconcentración', destacada: true },
  ],
  pregunta: { frase: 'importante ahora para tu equipo', texto: '¿Qué es lo importante ahora para tu equipo?' },
});

export const lider = pag({
  id: 'es-lider', titulo: 'El líder', destaque: 'esencialista',
  bajada: 'Claridad es igual a éxito.',
  inicio: 'todo lo anterior escala cuando lo aplica quien lidera',
  anclas: {
    escala: 'cuando lo aplica quien lidera', weiner: 'jeff weiner lo enseña', menos: 'menos cosas hechas mejor', contratar: 'muy selectivo al contratar', kawasaki: 'la explosión de incompetentes',
    buffett: 'integridad inteligencia e iniciativa', prioridad: 'una prioridad clara', thiel: 'peter thiel', exactamente: 'exactamente una prioridad', simple: 'comunicar simple',
    lafley: 'a g lafley', sesamo: 'plaza sésamo', confiar: 'reglas claras que permitan confiar', mclane: 'la distribuidora mclane', veintinueve: 'en veintinueve días',
    hagamoslo: 'por un hagámoslo', claridad: 'claridad es igual a éxito',
  },
  tarjetas: [
    { rotulo: 'Contratar y priorizar', texto: 'Integridad, inteligencia e iniciativa (Buffett). En PayPal, cada persona tenía exactamente una prioridad.', frase: 'muy selectivo al contratar' },
    { rotulo: 'Comunicar simple', texto: 'Mensajes «Plaza Sésamo» (Lafley): fáciles de entender y difíciles de malinterpretar.', frase: 'comunicar simple', destacada: true },
    { rotulo: 'Confiar y actuar', texto: 'McLane: dos horas, un apretón de manos y 29 días. Cambiar los «deberíamos» por un «hagámoslo».', frase: 'reglas claras que permitan confiar' },
  ],
  pregunta: { frase: 'cuál de estas prácticas le falta', texto: '¿Cuál de estas prácticas le falta hoy a tu forma de liderar?' },
});

export const sintesis = pag({
  id: 'es-sintesis', titulo: '¿Qué es', destaque: 'lo esencial?',
  bajada: 'Lo simple es lo fácil de hacer después de haber pensado bien.',
  inicio: 'el esencialismo no es una técnica',
  anclas: {
    manera: 'una manera de trabajar', mentalidad: 'empieza por una mentalidad', ciclo: 'un ciclo que un equipo puede repetir', explorar: 'explorar con espacio para pensar',
    eliminar: 'eliminar con un objetivo esencial', ejecutar: 'y ejecutar con colchones de tiempo', simple: 'lo simple no es lo fácil de pensar', costo: 'tiene un costo inmediato',
    valioso: 'algo más valioso', oliver: 'mary oliver', preciosa: 'única libre y preciosa vida', pregunta: 'la pregunta que lo ordena todo', elimina: 'lo que no responde a ella se elimina',
  },
  tarjetas: [
    { rotulo: 'La mentalidad', texto: 'Elegir es una acción, casi todo es ruido y toda decisión implica renunciar a algo.', frase: 'empieza por una mentalidad' },
    { rotulo: 'El ciclo', texto: 'Explorar, eliminar y ejecutar, una y otra vez.', frase: 'un ciclo que un equipo puede repetir', destacada: true },
    { rotulo: 'La pregunta', texto: '¿Qué es lo esencial? Lo que no responde a ella se elimina.', frase: 'la pregunta que lo ordena todo' },
  ],
  pregunta: { frase: 'qué es lo esencial para tu equipo', texto: '¿Qué es lo esencial para tu equipo a partir de mañana?' },
});

export const ORDEN: PaginaES[] = [
  portada, sam, paradoja, prioridad, ruido, concesiones, espacio, encabezado, simple, activo, criterios,
  objetivo, noElegante, repertorio, compromisos, editar, informacion, amortiguar, prevenir, facil, restar,
  victorias, rutinas, ahora, lider, sintesis,
];

export const PAGINAS: Record<string, PaginaES> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
