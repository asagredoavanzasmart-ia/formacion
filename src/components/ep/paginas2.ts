import { pag } from './paginas1';

/* «Enamórate del problema, no de la solución», secciones 16 a 30 del guion. */

export const crisis = pag({
  id: 'ep-crisis',
  titulo: 'Crisis, rondas a la baja y', destaque: 'acciones secundarias',
  bajada: 'En el peor momento se ve quién apoya de verdad.',
  inicio: 'en la montaña rusa habrá momentos',
  anclas: {
    morir: 'a punto de morir', mes: 'a un mes de cerrar', vara: 'una vara de tres metros', google: 'google anunció', salvando: 'terminó salvando a waze',
    microsoft: 'microsoft que temía', veinte: 'veinte millones de dólares', pontera: 'pontera vivió otra crisis', cinco: 'de cincuenta millones a cinco',
    tres: 'cerca de tres millones', veces: 'veinte veces más', tercio: 'un tercio de las startups', limpian: 'limpian la tabla', recargar: 'recargar de acciones',
    secundarias: 'vender acciones secundarias', reconocimiento: 'un reconocimiento por el trabajo',
  },
  tarjetas: [
    { rotulo: 'Waze en 2010', texto: 'A un mes de cerrar, Microsoft lideró una ronda de 20 millones con Qualcomm.', frase: 'a un mes de cerrar', destacada: true },
    { rotulo: 'Ronda a la baja', texto: 'Pontera cayó de 50 a 5 millones de valoración y años después valía veinte veces más.', frase: 'pontera vivió otra crisis' },
    { rotulo: 'Acciones secundarias', texto: 'Fundadores y empleados venden parte de las suyas: reconocimiento y menos presión por vender.', frase: 'vender acciones secundarias' },
  ],
  pregunta: { frase: 'qué socios o aliados', texto: '¿Qué socios o aliados te apoyaron de verdad en tu peor trimestre?' },
});

export const decision = pag({
  id: 'ep-decision',
  titulo: 'La decisión', destaque: 'difícil',
  bajada: 'Despedir y contratar, en ese orden.',
  inicio: 'despedir y contratar y el orden',
  anclas: {
    orden: 'el orden no es un error', mitad: 'cerca de la mitad', cuando: 'cuándo lo supieron', primer: 'durante el primer mes', dificil: 'no tomó la decisión difícil',
    todos: 'todos saben quién no encaja', lecturas: 'dos lecturas', nolosabe: 'no lo sabe', peor: 'que es peor', sevan: 'se van porque pueden',
    treinta: 'a los treinta días', sabiendo: 'sabiendo lo que sé hoy', no: 'si la respuesta es no', si: 'si es sí', nose: 'no lo sé',
    bratislava: 'en bratislava', hora: 'ya era hora',
  },
  tarjetas: [
    { rotulo: 'El primer mes', texto: 'Los equipos que fracasaron sabían desde el primer mes que alguien no encajaba.', frase: 'durante el primer mes' },
    { rotulo: 'La pregunta', texto: 'A los treinta días: sabiendo lo que sé hoy, ¿contrataría a esta persona?', frase: 'a los treinta días', destacada: true },
    { rotulo: 'Bratislava', texto: 'Un director despidió a su cofundador y el equipo le dijo: «gracias, ya era hora».', frase: 'en bratislava' },
  ],
  pregunta: { frase: 'a quién de tu equipo no volverías', texto: '¿A quién de tu equipo no volverías a contratar sabiendo lo que sabes hoy?' },
});

export const adn = pag({
  id: 'ep-adn',
  titulo: 'El ADN del', destaque: 'mejor lugar de trabajo',
  bajada: 'La cultura se define el primer día y se protege despidiendo pronto.',
  inicio: 'cada empresa tiene un adn',
  anclas: {
    adn: 'tiene un adn', humanclick: 'humanclick', siete: 'siete años', mejor: 'el mejor lugar de trabajo', reglas: 'con tres reglas',
    apoyar: 'apoyar a los empleados', votaran: 'votaran como una sola persona', despedir: 'despedir rápido', desercion: 'una deserción muy baja',
    curva: 'una curva normal', dos: 'del dos por ciento', quince: 'el quince por ciento', buena: 'el treinta y tres buena', menos: 'menos que buena',
    eleva: 'eleva más el desempeño', pregunta: 'pregunta al propio equipo', escala: 'escala de uno a diez', credibilidad: 'pierde credibilidad',
  },
  tarjetas: [
    { rotulo: 'HumanClick', texto: 'Sus fundadores se quedaron siete años porque era el mejor lugar donde habían trabajado.', frase: 'humanclick' },
    { rotulo: 'La curva', texto: '2 % asombrosa, 15 % excelente, 33 % buena y 33 % menos que buena.', frase: 'una curva normal', destacada: true },
    { rotulo: 'Preguntar al equipo', texto: '¿A quién llevarías a un equipo nuevo? ¿Cuánto lamentarías que se fuera, de 1 a 10?', frase: 'pregunta al propio equipo' },
  ],
  pregunta: { frase: 'le recomendarías a tu mejor amistad', texto: '¿Le recomendarías a tu mejor amistad trabajar en tu equipo?' },
});

export const contratar = pag({
  id: 'ep-contratar',
  titulo: 'Contratar', destaque: 'bien',
  bajada: 'Cuándo, a quién y cómo, y qué hace a un gran líder.',
  inicio: 'contratar bien empieza por el cuándo',
  anclas: {
    cuando: 'por el cuándo', noventa: 'próximos noventa días', ventas: 'alguien de ventas', aquien: 'el a quién', generalistas: 'perfiles generalistas',
    especialistas: 'especialistas', lograr: 'solo qué lograr', como: 'el cómo', segundos: 'en segundos', referencias: 'más las referencias',
    capas: 'entrevistar por capas', cebolla: 'como en una cebolla', ochenta: 'del ochenta por ciento', refundit: 'rechazó a refundit', lista: 'la lista de lo que hace',
    industria: 'venir de la industria', consolidacion: 'una consolidación de acciones larga',
  },
  tarjetas: [
    { rotulo: 'Cuándo', texto: 'Cuando sabes qué entregará esa persona en sus primeros noventa días.', frase: 'por el cuándo' },
    { rotulo: 'Cómo', texto: 'Referencias antes que entrevista, y preguntas por capas hasta llegar al «no lo sé».', frase: 'el cómo', destacada: true },
    { rotulo: 'Un gran líder', texto: 'Nunca renuncia, escucha a los clientes y decide lo difícil; venir de la industria no está en la lista.', frase: 'la lista de lo que hace' },
  ],
  pregunta: { frase: 'qué cargo estás por llenar', texto: '¿Qué cargo estás por llenar sin saber qué entregará en sus primeros noventa días?' },
});

export const muestra = pag({
  id: 'ep-muestra',
  titulo: 'Somos una', destaque: 'muestra de uno',
  bajada: 'Cada usuario es distinto y el primer uso solo se vive una vez.',
  inicio: 'entender al usuario empieza con humildad',
  anclas: {
    humildad: 'empieza con humildad', selfie: 'una selfie', wozniak: 'steve wozniak', distintos: 'simplemente son distintos', destino: 'ingresar un destino',
    veinte: 'cerca del veinte por ciento', diez: 'otro diez por ciento', chile: 'en chile', primera: 'usuario de primera vez', beso: 'el primer beso',
    nuevo: 'ya no es un usuario nuevo', doce: 'cada doce minutos', ochenta: 'unas ochenta aplicaciones', nueve: 'solo nueve', observar: 'observar a quienes',
  },
  tarjetas: [
    { rotulo: 'Usos distintos', texto: 'En Waze, el 20 % abre la aplicación sin destino y otro 10 % busca la ruta y la cierra.', frase: 'cerca del veinte por ciento' },
    { rotulo: 'El primer beso', texto: 'El primer uso no se vuelve a vivir; quien crea el producto ya no lo recuerda.', frase: 'el primer beso', destacada: true },
    { rotulo: 'Poca atención', texto: 'Unas 80 aplicaciones instaladas y solo 9 abiertas al día.', frase: 'unas ochenta aplicaciones' },
  ],
  pregunta: { frase: 'cuándo fue la última vez', texto: '¿Cuándo fue la última vez que viste a un cliente nuevo enfrentarse solo a lo que vendes?' },
});

export const usuarios = pag({
  id: 'ep-usuarios',
  titulo: 'Cuatro tipos de usuario y', destaque: 'el abismo',
  bajada: 'La sencillez es el único puente hacia la mayoría.',
  inicio: 'los usuarios se agrupan',
  anclas: {
    cuatro: 'cuatro categorías', innovadores: 'los innovadores', primeros: 'los primeros usuarios', mayoria: 'la primera mayoría', lema: 'no causar problemas',
    tardia: 'la mayoría tardía', abismo: 'hay un abismo', planetas: 'planetas distintos', cae: 'mucha gente cae', puente: 'un solo puente',
    sencillez: 'la sencillez', nada: 'no hace nada', telmap: 'de telmap', nadie: 'nadie lee nada',
  },
  tarjetas: [
    { rotulo: 'Cuatro grupos', texto: 'Innovadores, primeros usuarios, primera mayoría y mayoría tardía.', frase: 'cuatro categorías' },
    { rotulo: 'El abismo', texto: 'Entre los primeros usuarios y la mayoría: solo se cruza con sencillez.', frase: 'hay un abismo', destacada: true },
    { rotulo: 'Nadie lee nada', texto: 'Ni manuales, ni mensajes, ni guías de siete pasos.', frase: 'nadie lee nada' },
  ],
  pregunta: { frase: 'tu producto está hecho', texto: '¿Tu producto está hecho para los primeros usuarios o para la mayoría que todavía no te compra?' },
});

export const retencion = pag({
  id: 'ep-retencion',
  titulo: 'La retención es', destaque: 'la única medida',
  bajada: 'El ajuste producto-mercado no es intuición: son números.',
  inicio: 'determinar el ajuste producto-mercado es la parte más crítica',
  anclas: {
    critica: 'la parte más crítica', nocambia: 'ya no cambia', waze: 'a waze le tomó', microsoft: 'a microsoft cinco', netflix: 'a netflix diez',
    retencion: 'la retención', empresas: 'entre empresas', paguen: 'que te paguen no basta', conversion: 'la conversión', engañan: 'creen haber llegado',
    potenciales: 'usuarios potenciales', version: 'la versión que todavía', activos: 'los usuarios activos', cohortes: 'tabla de cohortes', numeros: 'son números',
  },
  tarjetas: [
    { rotulo: 'Cuánto tarda', texto: 'Waze tardó tres años y medio, Microsoft cinco y Netflix diez.', frase: 'a waze le tomó' },
    { rotulo: 'Una sola medida', texto: 'La retención: el porcentaje de usuarios que sigue volviendo. Entre empresas, que renueven.', frase: 'la retención', destacada: true },
    { rotulo: 'Tabla de cohortes', texto: 'Muestra cuántos usuarios de cada mes siguen activos después.', frase: 'tabla de cohortes' },
  ],
  pregunta: { frase: 'sabes qué porcentaje', texto: '¿Sabes qué porcentaje de los clientes que ganaste hace tres meses sigue comprando hoy?' },
});

export const embudo = pag({
  id: 'ep-embudo',
  titulo: 'El embudo y', destaque: 'sus barreras',
  bajada: 'Medir dónde se cae la gente y preguntar por qué.',
  inicio: 'para llegar a una alta retención',
  anclas: {
    embudo: 'el embudo de usuarios', entrada: 'en la entrada', barrera: 'es una barrera', medir: 'medir cuántos se caen', preguntarle: 'preguntarle a quien no la pasó',
    grave: 'por la más grave', eliminarla: 'eliminarla', simplificarla: 'simplificarla', escribir: 'escribir menos', diseno: 'guiar con el diseño',
    salto: 'el gran salto de waze', permitido: 'salvo que sepamos que no', zeek: 'con zeek', billetera: 'la billetera', quitarla: 'al quitarla',
    siete: 'siete veces al mes', treinta: 'al treinta por ciento', tres: 'tres veces suele quedarse',
  },
  tarjetas: [
    { rotulo: 'Medir y preguntar', texto: 'Cuántos caen en cada barrera, y por qué, según quien no la pasó.', frase: 'medir cuántos se caen' },
    { rotulo: 'Permitido, salvo…', texto: 'Waze cambió su algoritmo a «permitido, salvo que sepamos que no» y las rutas se volvieron razonables.', frase: 'el gran salto de waze', destacada: true },
    { rotulo: 'Cifras reales', texto: 'Uso diario: unas siete veces al mes. Retener el 30 % a tres meses es bueno.', frase: 'siete veces al mes' },
  ],
  pregunta: { frase: 'cuál es la barrera', texto: '¿Cuál es la barrera donde más clientes se te caen hoy?' },
});

export const dinero = pag({
  id: 'ep-dinero',
  titulo: 'El precio lo pone', destaque: 'el mercado',
  bajada: 'Cobrar una parte justa del valor y buscar que renueven.',
  inicio: 'hacer dinero empieza por un principio',
  anclas: {
    mercado: 'el precio lo pone el mercado', hardware: 'su hardware', duplicaba: 'lo duplicaba', reves: 'es al revés', pagar: 'dispuesta a pagar la gente',
    guia: 'la guía es cobrar', justo: 'un precio justo', competencia: 'atraen competencia', tres: 'al menos tres veces', recurrentes: 'los ingresos recurrentes',
    ahorrar: 'ahorrarle dinero', ganarlo: 'ayudarle a ganarlo', techo: 'el ahorro tiene techo', vender: 'probó vender mapas', publicidad: 'en la publicidad',
    eldan: 'cuando eldan', avis: 'avis escribió', senal: 'esa es la señal', renueven: 'es que renueven',
  },
  tarjetas: [
    { rotulo: 'Al revés', texto: 'Primero lo que el cliente está dispuesto a pagar; después, si con ese precio ganas dinero.', frase: 'es al revés' },
    { rotulo: 'Las proporciones', texto: 'Cobrar del 10 al 25 % del valor; el valor de vida del cliente, al menos 3 veces su costo de adquisición.', frase: 'la guía es cobrar', destacada: true },
    { rotulo: 'Eldan y Avis', texto: 'Cuando un cliente apareció en el mapa, otro escribió para estar: los clientes vienen a ti.', frase: 'cuando eldan' },
  ],
  pregunta: { frase: 'tu propuesta le habla al cliente', texto: '¿Tu propuesta le habla al cliente de lo que ahorra o de lo que gana?' },
});

export const crecer = pag({
  id: 'ep-crecer',
  titulo: 'El crecimiento', destaque: 'que se repite',
  bajada: 'No un pico, sino un boca a boca que depende de la frecuencia.',
  inicio: 'conseguir mil millones de usuarios',
  anclas: {
    dificil: 'el viaje más difícil', apple: 'el mapa de apple', cook: 'tim cook', duplicaron: 'las descargas se duplicaron', esfumado: 'se había esfumado',
    repite: 'un resultado que se repite', diez: 'multiplicar por diez', cinco: 'por cinco cuatro tres y dos', dos3: 'dos coma tres millones',
    diez6: 'diez coma seis millones', treinta: 'treinta y tres millones', cincuenta: 'unos cincuenta millones', viral: 'lo viral', boca: 'boca a boca es cuando',
    auto: 'alguien en el auto', paradero: 'alguien en el paradero', hockey: 'palo de hockey', dias: 'cuatrocientos treinta y seis días', horas: 'diecinueve horas',
  },
  tarjetas: [
    { rotulo: 'El día Tim Cook', texto: 'Las descargas de Waze se duplicaron un día; una semana después el efecto se había esfumado.', frase: 'tim cook' },
    { rotulo: 'La vara', texto: 'Por diez el primer año y luego por cinco, cuatro, tres y dos.', frase: 'multiplicar por diez', destacada: true },
    { rotulo: 'Boca a boca', texto: 'Más del 90 % supo de Waze porque alguien se lo contó; depende de la frecuencia de uso.', frase: 'boca a boca es cuando' },
  ],
  pregunta: { frase: 'en qué momento de uso', texto: '¿En qué momento de uso tu cliente podría contarle a otra persona sobre ti?' },
});

export const cincuenta = pag({
  id: 'ep-cincuenta',
  titulo: 'Cincuenta maneras de', destaque: 'conseguir usuarios',
  bajada: 'Ninguna está asegurada; pocos aciertos grandes pagan muchos fallos.',
  inicio: 'antes de salir al mercado',
  anclas: {
    pizarra: 'en una pizarra', cincuenta: 'cincuenta maneras', asegurado: 'el éxito asegurado', acuerdos: 'acuerdos de desarrollo', telefonica: 'telefónica promovió',
    esperado: 'de alza esperado', dosotres: 'dos o tres por ciento', italia: 'de 3 italia', doscientos: 'doscientos cincuenta mil', solo50: 'solo cincuenta mil',
    tim: 'tim brasil', quince: 'quince millones', paciencia: 'exige paciencia', sitio: 'un sitio de destino', buscadores: 'los buscadores',
    perfiles: 'dos perfiles', fracasa: 'casi siempre fracasa', ciclos: 'acorta los ciclos',
  },
  tarjetas: [
    { rotulo: 'Cincuenta en la pizarra', texto: 'Si no llegas a cincuenta maneras de conseguir usuarios, todavía no es hora de salir.', frase: 'cincuenta maneras' },
    { rotulo: 'Socios muy distintos', texto: 'Telefónica: 2 a 3 %. 3 Italia: 250 mil y luego 50 mil. TIM Brasil: 15 millones para Moovit.', frase: 'telefónica promovió', destacada: true },
    { rotulo: 'Dos perfiles', texto: 'Quien define mercado, producto y precio no es quien después promociona.', frase: 'dos perfiles' },
  ],
  pregunta: { frase: 'cuáles serían tus cincuenta maneras', texto: '¿Cuáles serían tus cincuenta maneras de conseguir clientes, y cuál ensayarías primero?' },
});

export const global = pag({
  id: 'ep-global',
  titulo: 'Salir', destaque: 'al mundo',
  bajada: 'Mercados grandes y fáciles de ganar, con gente en terreno.',
  inicio: 'extenderse globalmente depende',
  anclas: {
    pequeno: 'un país pequeño', mundo: 'en el mundo desde el primer día', eeuu: 'en estados unidos o china', intermedios: 'grandes intermedios',
    obvios: 'no siempre son los obvios', brasil: 'brasil aparece', faciles: 'fáciles de ganar', mexico: 'brasil méxico italia', dificiles: 'los más difíciles',
    reino: 'escogió el reino unido', exito: 'tuvo éxito en brasil', japon: 'en japón', antiguedad: 'por antigüedad', terreno: 'gente en terreno',
    conjunta: 'una empresa conjunta', uber: 'uber es global', cinco: 'casi cinco veces',
  },
  tarjetas: [
    { rotulo: 'Desde dónde partes', texto: 'Un país pequeño piensa en el mundo desde el primer día; Estados Unidos o China, no durante años.', frase: 'un país pequeño' },
    { rotulo: 'Grandes y fáciles', texto: 'Brasil, México, Italia, España, Turquía o Indonesia antes que Estados Unidos, Japón o el Reino Unido.', frase: 'fáciles de ganar', destacada: true },
    { rotulo: 'Uber y Lyft', texto: 'Uber es global y Lyft solo nacional: Uber vale casi cinco veces más.', frase: 'uber es global' },
  ],
  pregunta: { frase: 'qué mercado grande', texto: '¿Qué mercado grande y fácil de ganar estás dejando de lado por mirar solo el más prestigioso?' },
});

export const salida = pag({
  id: 'ep-salida',
  titulo: 'La salida, una', destaque: 'decisión personal',
  bajada: 'Tres ofertas por Waze y un orden de prioridades.',
  inicio: 'la salida vender la empresa',
  anclas: {
    reversa: 'en reversa', enero: 'en enero de dos mil trece', cuatrocientos: 'cuatrocientos millones', rechazaron: 'la rechazaron', menos: 'menos de mil millones',
    abril: 'en abril', acciones: 'sobre todo en acciones', trasladar: 'exigía trasladar', estanco: 'se estancó', volvio: 'google volvió',
    efectivo: 'en efectivo', diez: 'en diez días', personal: 'por ciento personal', prioridades: 'orden de prioridades', tu: 'tú tu familia',
    treinta: 'unos treinta millones', conserje: 'incluso el conserje', setenta: 'setenta y cinco por ciento', viudas: 'las viudas', moovit: 'en moovit', llamo: 'llamó uno por uno',
  },
  tarjetas: [
    { rotulo: 'Tres ofertas', texto: 'Google ofreció 400 millones; otra empresa, mil millones en acciones; Google volvió con 1150 en efectivo.', frase: 'cuatrocientos millones', destacada: true },
    { rotulo: 'Las prioridades', texto: 'Tú, tu familia, tus empleados y, solo al final, los inversionistas.', frase: 'orden de prioridades' },
    { rotulo: 'Todo el equipo', texto: 'Opciones de acciones para todo el personal: cerca del 75 % se volvió millonario.', frase: 'incluso el conserje' },
  ],
  pregunta: { frase: 'quién de tu equipo debería ganar', texto: '¿Quién de tu equipo debería ganar cuando a la empresa le va bien?' },
});

export const acuerdo = pag({
  id: 'ep-acuerdo',
  titulo: 'El acuerdo', destaque: 'por dentro',
  bajada: 'Futuro compartido, precio, retención y saber decir que no.',
  inicio: 'un acuerdo de venta tiene varias piezas',
  anclas: {
    piezas: 'varias piezas', secundarias: 'acciones secundarias', riesgo: 'reduce el riesgo', futuro: 'el futuro compartido', novale: 'el acuerdo no vale',
    precio: 'luego el precio', iguales: 'no todos los millones son iguales', retencion: 'un paquete de retención', ciento: 'ciento veinte millones',
    earn: 'el earn out', holdback: 'el holdback', banquero: 'un banquero de inversión', competidora: 'una oferta competidora', decirno: 'saber decir que no',
    amigo: 'un amigo de levine', cuarenta: 'unos cuarenta millones', efectivo: 'sin recibir dinero',
  },
  tarjetas: [
    { rotulo: 'Primero el futuro', texto: 'Por qué te compran, qué ganan y cómo se ve todo cinco días y cinco años después.', frase: 'el futuro compartido', destacada: true },
    { rotulo: 'Las piezas', texto: 'Efectivo o acciones, retención para el equipo, pagos condicionados y dinero retenido en garantía.', frase: 'luego el precio' },
    { rotulo: 'Saber decir que no', texto: 'Solo una oferta competidora cambia los términos; decir que no también tiene riesgo.', frase: 'una oferta competidora' },
  ],
  pregunta: { frase: 'qué tendría que ofrecerte', texto: '¿Qué tendría que ofrecerte alguien para que vendieras lo que construiste?' },
});

export const sintesis = pag({
  id: 'ep-sintesis',
  titulo: 'El problema es', destaque: 'la brújula',
  bajada: 'Todo el método de Uri Levine en un solo viaje.',
  inicio: 'todo el método de uri levine',
  anclas: {
    brujula: 'el problema es la brújula', desierto: 'cruzar el desierto', pronto: 'fracasar pronto', fases: 'trabajar por fases', tanque: 'llenar el tanque',
    adn: 'protegen el adn', primera: 'por primera vez', consecuencia: 'llegan como consecuencia', pedido: 'con un pedido', mentor: 'acompaña como mentor', ahora: 'la próxima vez es ahora',
  },
  tarjetas: [
    { rotulo: 'La brújula', texto: 'Enamorarse del problema da la energía para cruzar el desierto.', frase: 'el problema es la brújula', destacada: true },
    { rotulo: 'El viaje', texto: 'Fracasar pronto, una fase a la vez, cuidar el equipo y observar al usuario nuevo.', frase: 'fracasar pronto' },
    { rotulo: 'El pedido', texto: 'Si una idea te ayudó, enséñala y acompaña a otra persona que esté empezando.', frase: 'con un pedido' },
  ],
  pregunta: { frase: 'qué problema de tus clientes vas a convertir', texto: '¿Qué problema de tus clientes vas a convertir, desde mañana, en tu brújula?' },
});

export const ORDEN2 = [crisis, decision, adn, contratar, muestra, usuarios, retencion, embudo, dinero, crecer, cincuenta, global, salida, acuerdo, sintesis];
