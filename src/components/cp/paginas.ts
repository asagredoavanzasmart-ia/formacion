import type { Pagina, Tarjeta } from '../influencia/tipos';

/* «CRM en pymes: los seis errores que lo hacen fracasar». Fuentes: Pedro Reinares, «Los cien errores del CRM», y
   Frederick Newell, «Why CRM Doesn't Work». Cada página declara sus anclas como { nombre: frase del guion } en el
   orden en que suenan (datos puros, sin React: el generador de tiempos los lee con esbuild). Las páginas sin
   pregunta hablada llevan `pregunta.frase` vacía: la escena no muestra el panel final. */

export type PaginaCP = Pagina & { anclas: Record<string, string> };

export const pag = (p: Omit<PaginaCP, 'frases' | 'els' | 'tarjetas'> & { tarjetas: Tarjeta[] }): PaginaCP => ({ ...p, frases: Object.values(p.anclas), els: [] });
const sinPregunta = { frase: '', texto: '' };

export const portada = pag({
  id: 'cp-portada', titulo: 'CRM en pymes:', destaque: 'los seis errores',
  bajada: 'Un CRM no vende nada por sí solo.',
  inicio: 'un crm no vende nada por sí solo',
  anclas: {
    novende: 'no vende nada por sí solo', dinero: 'años de frustración', sigla: 'customer relationship management', registra: 'registra ordena y aprovecha',
    seis: 'los mismos seis errores', autores: 'dos autores los han estudiado', reinares: 'pedro reinares', newell: 'frederick newell',
    evidencia: 'con su evidencia', ejemplo: 'con un ejemplo', tactica: 'con una táctica',
  },
  tarjetas: [
    { rotulo: 'Qué es un CRM', texto: 'Customer Relationship Management: la estrategia y el software con que una empresa registra, ordena y aprovecha cada contacto con sus clientes.', frase: 'customer relationship management' },
    { rotulo: 'Seis errores', texto: 'Los mismos seis errores se repiten en las empresas pequeñas y medianas.', frase: 'los mismos seis errores', destacada: true },
    { rotulo: 'Dos autores', texto: 'Pedro Reinares («Los cien errores del CRM») y Frederick Newell («Why CRM Doesn\'t Work»).', frase: 'dos autores los han estudiado' },
  ],
  pregunta: sinPregunta,
});

export const tecnologia = pag({
  id: 'cp-tecnologia', titulo: 'Error 1:', destaque: 'tecnología antes que estrategia',
  bajada: 'La tecnología, por sí sola, no centra a la empresa en el cliente.',
  inicio: 'el error más frecuente de todos',
  anclas: {
    comprar: 'comprar la tecnología antes', esperanza: 'con la esperanza de que', sinrodeos: 'reinares lo dice sin rodeos', funciones: 'compra más funciones',
    vistosas: 'presentaciones vistosas', necesita: 'qué necesita para mejorar', cinco: 'cinco motivos', recursos: 'recursos ilimitados', moda: 'una herramienta de moda',
    competidor: 'lo tiene mi competidor', huida: 'la huida hacia delante', salvacion: 'como la salvación', ahorro: 'el ahorro de costes', consultor: 'el consultor prestigioso',
    detras: 'hay una estrategia detrás', fracaso: 'el fracaso está asegurado',
  },
  tarjetas: [
    { rotulo: 'El error', texto: 'Comprar la tecnología antes de tener una estrategia: más funciones de las que nunca se van a utilizar.', frase: 'comprar la tecnología antes', destacada: true },
    { rotulo: 'Cinco motivos (Reinares)', texto: 'Recursos ilimitados, «lo tiene mi competidor», huida hacia delante, ahorro de costes y el consultor prestigioso.', frase: 'cinco motivos' },
    { rotulo: 'La conclusión', texto: 'Sin una estrategia detrás, el fracaso está asegurado.', frase: 'el fracaso está asegurado' },
  ],
  pregunta: sinPregunta,
});

export const evidencia = pag({
  id: 'cp-evidencia', titulo: 'Lo que dicen', destaque: 'los datos',
  bajada: 'Procesos, personas y tecnología: la tecnología va al final.',
  inicio: 'newell recoge una advertencia de la consultora gartner',
  anclas: {
    gartner: 'la consultora gartner', sesenta: 'el sesenta y cinco por ciento', direccion: 'a la alta dirección', jefaturas: 'a las jefaturas', cliente: 'a los resultados con el cliente',
    nadie: 'nadie se puso de acuerdo', forrester: 'según forrester', cincuenta: 'alrededor del cincuenta por ciento', orden: 'un orden que conviene memorizar',
    procesos: 'combina procesos personas y tecnología', alfinal: 'la tecnología va al final', unisys: 'una encuesta de unisys', positivo: 'cuarenta y cuatro por ciento',
    neutro: 'cuarenta y dos por ciento', negativo: 'catorce por ciento', neal: 'don neal', planificar: 'gastar antes de planificar',
  },
  tarjetas: [
    { rotulo: 'Gartner (citado por Newell)', texto: 'El 65 % no logrará alinear a la dirección, tecnología, las jefaturas y los resultados con el cliente.', frase: 'la consultora gartner' },
    { rotulo: 'Forrester 2016 (citado por Reinares)', texto: 'Cerca del 50 % de los proyectos de CRM no logró los objetivos que prometía el sistema.', frase: 'según forrester' },
    { rotulo: 'El orden (Newell)', texto: 'Procesos, personas y tecnología. Unisys: 44 % retorno positivo, 42 % neutro, 14 % negativo.', frase: 'un orden que conviene memorizar', destacada: true },
  ],
  pregunta: sinPregunta,
});

export const poder = pag({
  id: 'cp-poder', titulo: 'El poder', destaque: 'cambió de lado',
  bajada: 'De un CRM que gestiona al cliente a una relación que gestiona el cliente.',
  inicio: 'newell añade una razón de fondo',
  anclas: {
    equilibrio: 'el equilibrio de poder', antes: 'tenía el control', ahora: 'ahora lo tiene el cliente', decide: 'qué quiere recibir', sigla: 'dar vuelta la sigla',
    gestiona: 'la empresa gestiona al cliente', cmr: 'gestionada por el cliente', oidos: 'dos oídos y una sola boca', empujar: 'empujar ofertas', escuchar: 'escuchar y responder mejor',
  },
  tarjetas: [
    { rotulo: 'El poder se desplazó', texto: 'El cliente decide qué quiere recibir, de quién y cuándo.', frase: 'el equilibrio de poder' },
    { rotulo: 'De CRM a CMR', texto: 'Newell propone una relación gestionada por el cliente.', frase: 'dar vuelta la sigla', destacada: true },
    { rotulo: 'Dos oídos, una boca', texto: 'Un CRM para escuchar y responder mejor, no para empujar ofertas.', frase: 'dos oídos y una sola boca' },
  ],
  pregunta: sinPregunta,
});

export const problema = pag({
  id: 'cp-problema', titulo: 'Táctica:', destaque: 'el problema en una frase',
  bajada: 'Antes del proveedor, el problema de negocio, sin nombrar ningún software.',
  inicio: 'imagina una empresa de mantenimiento',
  anclas: {
    empresa: 'una empresa de mantenimiento', feria: 'escucha en una feria', grande: 'contrata un sistema grande', seis: 'seis meses después', cuadernos: 'anotando en cuadernos',
    irse: 'a punto de irse', funciona: 'el software funciona perfectamente', falto: 'lo que faltó', frase: 'en una sola frase', perdemos: 'perdemos clientes de mantenimiento',
    dice: 'qué cliente qué momento', listo: 'no estás listo', proveedor: 'pide a cada proveedor', cinco: 'cinco preguntas básicas', decision: 'qué decisión de negocio',
    proceso: 'qué proceso va a cambiar', quien: 'quién lo va a utilizar', gana: 'qué gana el cliente', sabremos: 'cómo sabremos', vaga: 'alguna respuesta es vaga',
  },
  tarjetas: [
    { rotulo: 'Ejemplo ilustrativo', texto: 'Un sistema grande que funciona perfecto, y nadie sabe qué registrar.', frase: 'una empresa de mantenimiento' },
    { rotulo: 'Una sola frase', texto: '«Perdemos clientes de mantenimiento porque nadie les hace seguimiento después de cada servicio».', frase: 'en una sola frase', destacada: true },
    { rotulo: 'Cinco preguntas', texto: 'Qué decisión mejora, qué proceso cambia, quién lo utiliza, qué gana el cliente y cómo sabremos que funciona.', frase: 'cinco preguntas básicas' },
  ],
  pregunta: { frase: 'cuál es el problema de negocio que hoy', texto: '¿Cuál es el problema de negocio que hoy quieres resolver, y cuánto depende de un software?' },
});

export const magia = pag({
  id: 'cp-magia', titulo: 'Error 2:', destaque: 'esperar resultados mágicos',
  bajada: 'El CRM facilita un saber hacer que tiene que existir antes.',
  inicio: 'cuando la tecnología llega primero',
  anclas: {
    promesa: 'llega con una promesa', vendera: 'venderá solo', recuperara: 'se recuperará pronto', magicos: 'resultados mágicos', noaumenta: 'no aumenta las ventas',
    mejora: 'por la mejora de los procesos', facilitador: 'solo el facilitador', automovil: 'de un automóvil', abs: 'el sistema antibloqueo de frenos', conducir: 'saber conducir',
    accidentes: 'más accidentes', comerciales: 'con los equipos comerciales', preguntar: 'no sabe preguntar', newell: 'una conclusión parecida con cifras',
    veinticinco: 'entre el veinticinco y el treinta', rapido: 'implantado rápido', magnitud: 'la magnitud de la tarea', quiere: 'realmente quiere de la relación',
  },
  tarjetas: [
    { rotulo: 'La promesa', texto: 'Que el sistema venderá solo y que la inversión se recuperará pronto.', frase: 'llega con una promesa' },
    { rotulo: 'El ABS (Reinares)', texto: 'Los frenos antibloqueo no evitan que tengas que saber conducir.', frase: 'de un automóvil', destacada: true },
    { rotulo: 'Newell', texto: 'Solo entre el 25 % y el 30 % siente que obtiene el retorno que esperaba.', frase: 'una conclusión parecida con cifras' },
  ],
  pregunta: sinPregunta,
});

export const retorno = pag({
  id: 'cp-retorno', titulo: 'El retorno', destaque: 'que nadie mide',
  bajada: 'El tamaño de la inversión no decide el resultado.',
  inicio: 'sobre el retorno reinares es todavía más directo',
  anclas: {
    directo: 'todavía más directo', tendenciosos: 'los considera tendenciosos', sesenta: 'en el sesenta por ciento', advertencia: 'como una advertencia',
    argumento: 'un buen argumento de venta', comprometer: 'pueden comprometer gravemente', nadiedefine: 'casi nadie define', cincuenta: 'de cincuenta empresas',
    noventa: 'el noventa por ciento', pyme: 'para una pyme', trece: 'el trece por ciento', cuarenta: 'el cuarenta por ciento', dieciseis: 'un dieciséis por ciento',
    tamano: 'el tamaño de la inversión',
  },
  tarjetas: [
    { rotulo: 'Reinares', texto: 'Informes que no identifica: en el 60 % de los casos la inversión nunca se recupera. Es una advertencia, no un dato firme.', frase: 'en el sesenta por ciento' },
    { rotulo: 'Sin modelo de retorno', texto: 'El 90 % de 50 responsables de CRM no tenía cómo medir el retorno (Newell).', frase: 'casi nadie define', destacada: true },
    { rotulo: 'The Data Warehouse Institute', texto: '13 % gastó más de 10 millones de dólares; 16 % logra beneficios medibles con menos de 100.000.', frase: 'el trece por ciento' },
  ],
  pregunta: sinPregunta,
});

export const captacion = pag({
  id: 'cp-captacion', titulo: 'Cuánto cuesta', destaque: 'un cliente nuevo',
  bajada: 'El caso real que calculó Reinares.',
  inicio: 'para saber qué retorno buscar',
  anclas: {
    calculo: 'un cálculo que muchas empresas', cuanto: 'cuánto cuesta conseguir', manual: 'frases de manual', real: 'calcular el caso real', aluminio: 'ingeniería del aluminio',
    arquitectura: 'estudios de arquitectura', proyectos: 'presentar tres proyectos', personas: 'tres personas trabajando', aprobara: 'se aprobara uno', viajes: 'viajes materiales',
    doce: 'doce mil euros', mesa: 'sobre la mesa', retener: 'invertir en retener',
  },
  tarjetas: [
    { rotulo: 'El cálculo', texto: 'Cuánto cuesta conseguir un cliente nuevo, con el caso real y no con frases de manual.', frase: 'un cálculo que muchas empresas' },
    { rotulo: 'INCONAL', texto: 'Tres proyectos, tres personas, tres semanas, más viajes, materiales y gastos comerciales.', frase: 'ingeniería del aluminio' },
    { rotulo: 'El resultado', texto: 'Unos 12.000 euros por cliente nuevo: por eso convenía retener.', frase: 'doce mil euros', destacada: true },
  ],
  pregunta: sinPregunta,
});

export const piloto = pag({
  id: 'cp-piloto', titulo: 'Táctica:', destaque: 'dosificar y pilotear',
  bajada: 'Compra lo que de verdad necesitas, no lo que te quieren vender.',
  inicio: 'la táctica que propone reinares es la dosificación',
  anclas: {
    dosificacion: 'es la dosificación', plataforma: 'no toda la plataforma', existen: 'los procesos que ya existen', coche: 'comprarse un coche', vender: 'necesitan vender',
    piloto: 'se traduce en un piloto', grupo: 'un grupo pequeño de clientes', define: 'define antes qué resultado', renuevan: 'cuántos renuevan', amplia: 'si el resultado llega amplía',
    barato: 'aprendiste barato', limpieza: 'limpieza industrial', tresanos: 'un plan a tres años', alano: 'al año el sistema', nosirve: 'el crm no sirve', solo: 'un solo tipo de servicio',
    incomodas: 'tres preguntas incómodas', abandonaron: 'cuántas lo abandonaron', resultado: 'qué resultado concreto', datos: 'qué pasa con tus datos', serio: 'un proveedor serio',
    vendiendo: 'está vendiendo no acompañando',
  },
  tarjetas: [
    { rotulo: 'Dosificación (Reinares)', texto: 'No toda la plataforma desde el principio: es como comprarse un coche antes de saber conducir.', frase: 'es la dosificación' },
    { rotulo: 'El piloto', texto: 'Un grupo pequeño de clientes, un resultado definido antes. Si llega, amplía; si no, aprendiste barato.', frase: 'se traduce en un piloto', destacada: true },
    { rotulo: 'Tres preguntas al proveedor', texto: 'Cuántas empresas lo abandonaron, qué resultado lograron y qué pasa con tus datos.', frase: 'tres preguntas incómodas' },
  ],
  pregunta: { frase: 'si tu empresa tuviera que demostrar', texto: 'Si tuvieras que demostrar en tres meses que el CRM mejora algo medible, ¿qué indicador escogerías?' },
});

export const automatizar = pag({
  id: 'cp-automatizar', titulo: 'Error 3:', destaque: 'automatizar un proceso malo',
  bajada: 'La automatización no corrige nada: repite los errores más rápido.',
  inicio: 'aunque las expectativas sean realistas',
  anclas: {
    trampa: 'una trampa más silenciosa', automatizar: 'automatizar un proceso que ya funcionaba mal', howard: 'marion howard', deficiente: 'sigue siendo eso',
    corrige: 'no corrige nada', repetir: 'repetir los errores', dos: 'insiste en dos cosas', resuelto: 'dejar bien resuelto', informatica: 'un proyecto de informática',
    calidad: 'la calidad de cada interacción', vecino: 'un error vecino', inoperantes: 'absolutamente inoperantes', descentralizar: 'descentralizar las decisiones',
    papel: 'en el papel es impecable', aprobacion: 'la aprobación de tres personas',
  },
  tarjetas: [
    { rotulo: 'Marion Howard-Healy (en Newell)', texto: 'Un proceso deficiente que se automatiza sigue siendo un proceso deficiente.', frase: 'marion howard', destacada: true },
    { rotulo: 'Newell', texto: 'Primero el proceso, después la tecnología. No es un proyecto de informática.', frase: 'insiste en dos cosas' },
    { rotulo: 'Reinares', texto: 'Procesos perfectos pero inoperantes: el CRM debe descentralizar las decisiones.', frase: 'un error vecino' },
  ],
  pregunta: sinPregunta,
});

export const mapa = pag({
  id: 'cp-mapa', titulo: 'Táctica:', destaque: 'mapear y medir',
  bajada: 'Cuando el proceso funciona a mano, recién tiene sentido automatizarlo.',
  inicio: 'la táctica es mapear el proceso',
  anclas: {
    mapear: 'mapear el proceso', dibuja: 'dibuja en papel', camino: 'el camino del cliente', demora: 'dónde se demora', pierde: 'se pierde información', queja: 'el cliente se queja',
    elimina: 'elimina lo que no aporta', mano: 'funciona a mano', mide: 'mide antes y después', tarda: 'cuánto tarda hoy un presupuesto', base: 'tu línea de base',
    tarde: 'la forma de llegar tarde', electricas: 'instalaciones eléctricas', cinco: 'cinco días', sale: 'sale solo', clinica: 'una clínica dental', agenda: 'revisa su agenda',
    confirmo: 'nadie confirmó la hora', llamada: 'una llamada de confirmación', recordatorio: 'automatiza el recordatorio', apoyo: 'la tecnología apoyó',
  },
  tarjetas: [
    { rotulo: 'Mapear', texto: 'El camino del cliente en papel: dónde se demora, dónde se pierde información y dónde se queja.', frase: 'mapear el proceso', destacada: true },
    { rotulo: 'Medir', texto: 'La línea de base antes de automatizar: sin ella no sabrás si mejoraste.', frase: 'mide antes y después' },
    { rotulo: 'Ejemplos ilustrativos', texto: 'El presupuesto que sale solo pero tarde; la clínica que primero confirma a mano y después automatiza.', frase: 'instalaciones eléctricas' },
  ],
  pregunta: { frase: 'hay algún proceso en tu empresa', texto: '¿Hay algún proceso en tu empresa que hoy funciona mal y que piensas arreglar con tecnología?' },
});

export const segmentar = pag({
  id: 'cp-segmentar', titulo: 'Error 4:', destaque: 'segmentar en lugar de personalizar',
  bajada: 'El CRM debería gestionar lo individual, no crear más grupos.',
  inicio: 'un proceso puede estar bien diseñado',
  anclas: {
    iguales: 'como si fueran iguales', segmentar: 'segmentar en lugar de personalizar', paradoja: 'una paradoja', individual: 'gestionar lo individual', contrario: 'justo lo contrario',
    grupos: 'grupos de clientes parecidos', afinidad: 'perfiles de afinidad', agrupados: 'clientes agrupados', aseguradora: 'una aseguradora de salud', cincoperf: 'cinco perfiles',
    llama: 'cada vez que uno llama', trato: 'un trato menos que conveniente', usan: 'usan mucho sus servicios', busca: 'es justamente lo que busca', director: 'un director de marketing',
    veinte: 'veinte perfiles', nadie: 'nadie en la reunión', carta: 'la misma carta',
  },
  tarjetas: [
    { rotulo: 'La paradoja (Reinares)', texto: 'Donde antes había segmentos, ahora hay «perfiles de afinidad»: siguen siendo grupos.', frase: 'una paradoja', destacada: true },
    { rotulo: 'La aseguradora', texto: 'Cinco perfiles por rentabilidad y un trato menos que conveniente para quien más usa el servicio.', frase: 'una aseguradora de salud' },
    { rotulo: 'Los veinte perfiles', texto: 'Nadie los entendía; un año después, la misma carta a toda la base.', frase: 'un director de marketing' },
  ],
  pregunta: sinPregunta,
});

export const personalizar = pag({
  id: 'cp-personalizar', titulo: 'Personalizar', destaque: 'con respeto',
  bajada: 'Que el cliente sienta que lo conoces, no que lo vigilas.',
  inicio: 'el problema no es segmentar',
  anclas: {
    recursos: 'dónde poner los recursos', reemplaza: 'reemplaza al trato personal', mandamientos: 'los diez mandamientos', privacidad: 'con la privacidad', vigila: 'no que lo vigila',
    mckean: 'john mckean', humano: 'como un ser humano', simple: 'la idea más simple', tactica: 'hacerte una pregunta antes', distinto: 'qué va a hacer distinto', sobra: 'el dato sobra',
    marzo: 'vence en marzo', distribuidora: 'una distribuidora de insumos', imprenta: 'una imprenta y una notaría', trimestre: 'al cerrar cada trimestre', ninguno: 'ningún segmento',
    respeto: 'una regla de respeto', permiso: 'pide permiso', cambio: 'ofrece algo a cambio', seva: 'se va y se lo cuenta',
  },
  tarjetas: [
    { rotulo: 'John McKean (en Newell)', texto: 'Cerca del 70 % de entregar valor es hacer sentir al cliente como un ser humano.', frase: 'john mckean' },
    { rotulo: 'La pregunta', texto: '¿Qué hará distinto mi equipo con este cliente por tener este dato? Si la respuesta es nada, el dato sobra.', frase: 'hacerte una pregunta antes', destacada: true },
    { rotulo: 'Regla de respeto', texto: 'Para un dato sensible: pide permiso, explica para qué y ofrece algo a cambio.', frase: 'una regla de respeto' },
  ],
  pregunta: { frase: 'tus clientes sienten que los conoces', texto: '¿Tus clientes sienten que los conoces, o que te encargaste de clasificarlos?' },
});

export const personas = pag({
  id: 'cp-personas', titulo: 'Error 5:', destaque: 'olvidar a las personas',
  bajada: 'El dinero y la tecnología casi nunca son el problema.',
  inicio: 'hasta aquí hemos hablado',
  anclas: {
    personas: 'las personas que usan el crm', caro: 'el error más caro', forum: 'un estudio de crm forum', organizacional: 'el cambio organizacional', politica: 'la política interna y la inercia',
    comprension: 'la falta de comprensión', setenta: 'setenta y uno por ciento', presupuesto: 'los problemas de presupuesto', software: 'los problemas de software',
    organizacion: 'lo que falla es la organización', cinco: 'alrededor del cinco por ciento', cuatrocientas: 'cuatrocientas implantaciones', primera: 'personal de primera línea',
    telefono: 'atienden el teléfono', euros: 'cientos de miles de euros', desmotivado: 'un empleado desmotivado', poder: 'pueden perder poder', proteger: 'proteger lo que conocen',
    cartera: 'su cartera de clientes es suya', controle: 'el gerente lo controle', minimo: 'lo llenará con lo mínimo',
  },
  tarjetas: [
    { rotulo: 'CRM-Forum (en Newell)', texto: 'Cambio organizacional 29 %, política e inercia 22 %, falta de comprensión 20 %. Presupuesto 4 %, software 2 %.', frase: 'un estudio de crm forum', destacada: true },
    { rotulo: 'Formación', texto: 'Solo 5 % de la inversión va al cambio; la formación en primera línea explica 25 % de la diferencia.', frase: 'alrededor del cinco por ciento' },
    { rotulo: 'El miedo', texto: 'Perder poder o el trabajo: si el sistema solo sirve para controlar, se llena con lo mínimo.', frase: 'pueden perder poder' },
  ],
  pregunta: sinPregunta,
});

export const adopcion = pag({
  id: 'cp-adopcion', titulo: 'Táctica:', destaque: 'que el CRM devuelva algo',
  bajada: 'Cuando el usuario recibe un beneficio, registra.',
  inicio: 'la táctica tiene tres partes',
  anclas: {
    presupuestar: 'presupuestar la formación', piloto: 'usuarios piloto', devuelva: 'devuelva algo a quien lo alimenta', agenda: 'su agenda de seguimiento', historial: 'el historial del equipo',
    beneficio: 'recibe un beneficio', deja: 'deja de hacerlo', transporte: 'una empresa de transporte', todas: 'registre todas sus llamadas', nohicieron: 'que no hicieron',
    perfectos: 'números perfectos', inmobiliaria: 'una inmobiliaria de barrio', lista: 'la lista de personas', conviene: 'porque le conviene', vigilarlo: 'no para vigilarlo',
    razon: 'cambió la razón', senales: 'tres señales', sinpedir: 'sin que se lo pidan', reunion: 'la reunión comercial', reclamos: 'cuántos reclamos se resuelven',
  },
  tarjetas: [
    { rotulo: 'Tres partes', texto: 'Presupuestar la formación, usuarios piloto respetados y un sistema que devuelva algo a quien lo alimenta.', frase: 'presupuestar la formación', destacada: true },
    { rotulo: 'Ejemplos ilustrativos', texto: 'Llamadas falsas para cumplir la cuota, frente a la lista que ayuda al agente a no perder oportunidades.', frase: 'una empresa de transporte' },
    { rotulo: 'Tres señales', texto: 'Registro sin que lo pidan, decisiones con datos del sistema y reclamos resueltos con el historial.', frase: 'tres señales' },
  ],
  pregunta: { frase: 'quién en tu empresa tendría que cambiar', texto: '¿Quién en tu empresa tendría que cambiar su rutina para que el CRM funcione, y qué ganaría?' },
});

export const datos = pag({
  id: 'cp-datos', titulo: 'Error 6:', destaque: 'datos sin propósito',
  bajada: 'Recoge solo lo que puedas utilizar.',
  inicio: 'queda un último error',
  anclas: {
    deposito: 'en un depósito', sinproposito: 'datos sin propósito', canales: 'canales que no se hablan', tentacion: 'una tentación muy común', toda: 'toda la información posible',
    consejo: 'su consejo es el contrario', fidelidad: 'la fidelidad', actual: 'el valor actual', largo: 'el valor a largo plazo', saturacion: 'un problema de saturación',
    montana: 'la montaña de datos', espiados: 'se sienten espiados', desconfianza: 'genera desconfianza', safeway: 'el de safeway', noventa: 'a principios de los noventa',
    cancelo: 'canceló su programa', habitual: 'esa situación es habitual', acciones: 'acciones individuales',
  },
  tarjetas: [
    { rotulo: 'Tres valores (Reinares)', texto: 'Fidelidad, valor actual y valor a largo plazo: si un dato no ayuda a estimarlos, sobra.', frase: 'su consejo es el contrario', destacada: true },
    { rotulo: 'Saturación', texto: 'La montaña de datos impide actuar y el cliente se siente espiado.', frase: 'un problema de saturación' },
    { rotulo: 'Safeway', texto: 'Canceló su programa de fidelización: no sabía qué hacer con tanta información.', frase: 'el de safeway' },
  ],
  pregunta: sinPregunta,
});

export const permiso = pag({
  id: 'cp-permiso', titulo: 'Preguntar', destaque: 'mejor, no más',
  bajada: 'El cliente comparte cuando da su permiso y obtiene algo a cambio.',
  inicio: 'newell aporta el principio complementario',
  anclas: {
    permiso: 'cuando da su permiso', cambio: 'obtiene algo a cambio', subtitulo: 'la idea del subtítulo', gestione: 'dejando que el cliente gestione', mejor: 'preguntar mejor',
    teradata: 'patrocinada por teradata', ochenta: 'el ochenta por ciento', decepciona: 'se decepciona', costo: 'la decepción tiene un costo', brann: 'brann worldwide',
    cincuenta: 'hasta el cincuenta por ciento', irrelevantes: 'ofertas irrelevantes', informados: 'vendedores mal informados', silencio: 'directamente silencio',
  },
  tarjetas: [
    { rotulo: 'Permiso (Newell)', texto: 'Cómo ganar dejando que el cliente gestione la relación.', frase: 'cuando da su permiso' },
    { rotulo: 'Teradata, 2001', texto: 'El 80 % compartiría información personal a cambio de un servicio más personal.', frase: 'patrocinada por teradata', destacada: true },
    { rotulo: 'Brann Worldwide', texto: 'Hasta el 50 % dejaría de comprar por ofertas irrelevantes, vendedores mal informados y demoras.', frase: 'brann worldwide' },
  ],
  pregunta: sinPregunta,
});

export const canales = pag({
  id: 'cp-canales', titulo: 'Canales', destaque: 'que no se hablan',
  bajada: 'Un solo registro por cliente para todos los canales.',
  inicio: 'a esto se suma el problema de los canales',
  anclas: {
    desconectados: 'los canales desconectados', confusion: 'la confusión del cliente', errores: 'se multiplican los errores', punto: 'en el punto de venta', correo: 'le llega por correo',
    distinto: 'un precio distinto', automaticos: 'canales automáticos', personal: 'la atención personal', conflicto: 'un conflicto que resolver', reglas: 'tres reglas',
    accion: 'una acción asociada', aniversario: 'fecha de aniversario', registro: 'un solo registro por cliente', limpieza: 'una limpieza anual', ruido: 'menos ruido',
    gimnasios: 'una cadena pequeña de gimnasios', formulario: 'un formulario distinto', sede: 'cambia de sede', cobra: 'le cobra igual', extrano: 'un extraño', evitado: 'habría evitado',
  },
  tarjetas: [
    { rotulo: 'Reinares', texto: 'Un precio en el punto de venta y otro distinto por correo. Y la atención personal sigue siendo imprescindible.', frase: 'en el punto de venta' },
    { rotulo: 'Tres reglas', texto: 'Cada dato con una acción, un solo registro por cliente y una limpieza anual.', frase: 'tres reglas', destacada: true },
    { rotulo: 'Ejemplo ilustrativo', texto: 'Tres formularios para el mismo socio: le cobran una membresía que pidió pausar.', frase: 'una cadena pequeña de gimnasios' },
  ],
  pregunta: { frase: 'cuántos de ellos usarían', texto: 'De los datos que guardas de cada cliente, ¿cuántos usaría tu equipo de verdad la próxima semana?' },
});

export const sintesis = pag({
  id: 'cp-sintesis', titulo: 'Síntesis:', destaque: 'la relación antes que el software',
  bajada: 'El CRM debe ser la memoria de una relación que ya existe.',
  inicio: 'los seis errores parecen distintos',
  anclas: {
    raiz: 'una raíz común', antes: 'el software antes que la relación', estrategia: 'cuando falta la estrategia', magia: 'cuando se espera magia', automatiza: 'cuando se automatiza sin revisar',
    segmenta: 'cuando se segmenta', olvida: 'cuando se olvida a las personas', acumulan: 'cuando se acumulan datos', evidencia: 'la evidencia apunta', crea: 'no crea la relación',
    sostenerla: 'ayuda a sostenerla', cuesta: 'cuánto cuesta', resuelve: 'qué problema resuelve', mejorar: 'qué proceso va a mejorar', alimentar: 'quién lo va a alimentar',
    gana: 'qué gana el cliente con él', caro: 'un software caro', memoria: 'la memoria de una relación', sustituto: 'nunca su sustituto',
  },
  tarjetas: [
    { rotulo: 'Una raíz común', texto: 'Poner el software antes que la relación.', frase: 'una raíz común', destacada: true },
    { rotulo: 'Cuatro preguntas', texto: 'Qué problema resuelve, qué proceso mejora, quién lo alimenta y qué gana el cliente.', frase: 'qué problema resuelve' },
    { rotulo: 'La idea', texto: 'El CRM es la memoria de una relación que ya existe, nunca su sustituto.', frase: 'la memoria de una relación' },
  ],
  pregunta: sinPregunta,
});

export const ORDEN: PaginaCP[] = [
  portada, tecnologia, evidencia, poder, problema, magia, retorno, captacion, piloto, automatizar, mapa,
  segmentar, personalizar, personas, adopcion, datos, permiso, canales, sintesis,
];

export const PAGINAS: Record<string, PaginaCP> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
