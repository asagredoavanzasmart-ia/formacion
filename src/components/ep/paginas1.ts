import type { Pagina, Tarjeta } from '../influencia/tipos';

/* «Enamórate del problema, no de la solución» (Uri Levine), secciones 1 a 15 del guion.
   Cada página declara sus anclas como { nombre: frase del audio } en el orden en que suenan: la escena
   usa los nombres y el generador busca las frases (datos puros, sin React). */

export type PaginaEP = Pagina & { anclas: Record<string, string> };

export const pag = (p: Omit<PaginaEP, 'frases' | 'els' | 'tarjetas'> & { tarjetas: Tarjeta[] }): PaginaEP => ({ ...p, frases: Object.values(p.anclas), els: [] });

export const portada = pag({
  id: 'ep-portada',
  titulo: 'Enamórate del problema,', destaque: 'no de la solución',
  bajada: 'Uri Levine y el método detrás de Waze y Moovit.',
  inicio: 'un emprendedor vendió dos empresas',
  anclas: {
    frase: 'enamórate del problema', google: 'google compró waze', hoja: 'una sola hoja', intel: 'intel compró moovit',
    levine: 'detrás de ambas', recetario: 'su libro es su recetario', frustracion: 'una frustración que comparte',
    antes: 'antes de pensar en el producto', saltan: 'casi todos se saltan', area: 'un área comercial',
    solucion: 'quien parte de la solución', problema: 'quien parte del problema', suerte: 'define la suerte', preparacion: 'todo lo que sigue es preparación',
  },
  tarjetas: [
    { rotulo: 'Dos unicornios', texto: 'Waze, vendida a Google en 1150 millones de dólares, y Moovit, vendida a Intel en mil millones.', frase: 'google compró waze', destacada: true },
    { rotulo: 'El punto de partida', texto: 'Una frustración que comparte mucha gente, antes que el producto o el dinero.', frase: 'una frustración que comparte' },
    { rotulo: 'La suerte', texto: 'El momento en que la oportunidad se encuentra con la preparación.', frase: 'define la suerte' },
  ],
  pregunta: { frase: 'cuál es la frustración de tus clientes', texto: '¿Cuál es la frustración de tus clientes que todavía nadie ha resuelto?' },
});

export const origen = pag({
  id: 'ep-origen',
  titulo: 'El origen de', destaque: 'Waze',
  bajada: 'Una frustración en la carretera que mucha gente compartía.',
  inicio: 'enamorarse del problema empieza con una historia',
  anclas: {
    metula: 'desde metula', autos: 'diez autos', rutas: 'dos rutas posibles', ultimo: 'salió último', adelante: 'si solo hubiera alguien adelante',
    familia: 'el resto de la familia', llamo: 'los llamó uno por uno', eureka: 'momento eureka', informan: 'quienes van adelante informan',
    casi: 'casi todas sus empresas', waze: 'creó waze porque', fairfly: 'fairfly', pontera: 'pontera', engie: 'y engie',
    gran: 'si es un gran problema', amor: 'solo el amor por ese problema',
  },
  tarjetas: [
    { rotulo: 'Dos mil seis', texto: 'De Metula a Tel Aviv: diez autos, dos rutas y nadie sabía cuál estaba atascada.', frase: 'desde metula' },
    { rotulo: 'El momento eureka', texto: 'Quienes van adelante informan a quienes vienen atrás: la esencia de Waze.', frase: 'momento eureka', destacada: true },
    { rotulo: 'Siempre igual', texto: 'Waze, FairFly, Pontera y Engie nacieron de una frustración propia que resultó compartida.', frase: 'casi todas sus empresas' },
  ],
  pregunta: { frase: 'qué frustración repites', texto: '¿Qué frustración repites cada semana sin preguntarte si otras personas también la sienten?' },
});

export const problema = pag({
  id: 'ep-problema',
  titulo: 'Un problema que', destaque: 'vale la pena',
  bajada: 'Primero quién lo tiene y cómo lo percibe; la solución, al final.',
  inicio: 'un problema que vale la pena se reconoce',
  anclas: {
    tambien: 'a mí también me pasa', orden: 'levine propone un orden', primero: 'primero piensa en un gran problema', segundo: 'segundo pregunta quién lo tiene',
    solotu: 'si la respuesta es solo tú', psiquiatra: 'ir al psiquiatra', tercero: 'tercero si mucha gente lo tiene', construye: 'solo entonces construye',
    muere: 'la mayoría de las startups muere', ventaja: 'una segunda ventaja', sistema: 'nuestro sistema hace', resolvemos: 'resolvemos este problema',
    porti: 'lo que hacemos por ti', comercial: 'para un equipo comercial', cadadia: 'se preguntan cada día',
  },
  tarjetas: [
    { rotulo: 'La señal', texto: 'Al contarlo, la otra persona dice «a mí también me pasa» y da su propia versión.', frase: 'a mí también me pasa' },
    { rotulo: 'El orden', texto: 'Un gran problema, quién lo tiene, hablar con esas personas y, solo entonces, la solución.', frase: 'levine propone un orden', destacada: true },
    { rotulo: 'La historia', texto: 'Empieza por el problema o por el usuario, nunca por «nuestro sistema hace…».', frase: 'una segunda ventaja' },
  ],
  pregunta: { frase: 'tu propuesta de valor empieza hoy', texto: '¿Tu propuesta de valor empieza hoy por el problema del cliente o por tu producto?' },
});

export const matriz = pag({
  id: 'ep-matriz',
  titulo: 'La matriz de', destaque: 'mercado y dolor',
  bajada: 'Cuánta gente tiene el problema y cuánto le duele.',
  inicio: 'para saber si un problema vale la pena',
  anclas: {
    ejes: 'una matriz de dos ejes', mercado: 'el tamaño del mercado posible', dolor: 'y el dolor', cuatro: 'cuatro cuadrantes',
    ganadores: 'los ganadores', boca: 'boca a boca', nicho: 'el nicho', perdedores: 'los perdedores', suenos: 'sueños y pesadillas',
    licencia: 'renovar la licencia', pesadilla: 'pero es una pesadilla', page: 'larry page', cepillo: 'cepillo de dientes', trabajo: 'ir al trabajo y volver',
  },
  tarjetas: [
    { rotulo: 'Dos ejes', texto: 'El tamaño del mercado posible y el dolor, medido por intensidad o frecuencia.', frase: 'una matriz de dos ejes' },
    { rotulo: 'Ganadores', texto: 'Muchos usuarios y uso muy frecuente: crecen por el boca a boca.', frase: 'los ganadores', destacada: true },
    { rotulo: 'Sueños y pesadillas', texto: 'Todo el mundo tiene el problema, pero aparece muy de vez en cuando.', frase: 'sueños y pesadillas' },
  ],
  pregunta: { frase: 'en qué cuadrante cae', texto: '¿En qué cuadrante cae el problema que resuelve tu oferta principal?' },
});

export const pasion = pag({
  id: 'ep-pasion',
  titulo: 'Pasión, sacrificio y', destaque: 'la muestra de uno',
  bajada: 'Emprender cuesta, y solo muchas voces confirman que el problema es real.',
  inicio: 'enamorarse tiene un precio',
  anclas: {
    costo: 'costo alternativo', ecuacion: 'su ecuación es simple', pasion: 'su pasión es mayor', miedo: 'miedo al fracaso',
    sacrificar: 'disposición a sacrificar', sigo: 'sigo en mi trabajo', riesgo: 'también tiene un riesgo', muestra: 'la muestra de uno',
    angulos: 'distintos ángulos', engie: 'en engie', roba: 'el mecánico le roba', honestos: 'son honestos', desaparecer: 'puede desaparecer',
    mego: 'mego recogía paquetes', casilleros: 'abrió casilleros', cerro: 'la empresa cerró',
  },
  tarjetas: [
    { rotulo: 'La ecuación', texto: 'Se emprende cuando la pasión supera el miedo al fracaso más el costo alternativo.', frase: 'su ecuación es simple', destacada: true },
    { rotulo: 'Muestra de uno', texto: 'Solo cuando muchas personas cuentan el mismo problema sabes que es real.', frase: 'la muestra de uno' },
    { rotulo: 'Mego', texto: 'Cuando el correo abrió casilleros y horarios tarde, el problema se esfumó y la empresa cerró.', frase: 'mego recogía paquetes' },
  ],
  pregunta: { frase: 'con cuántas personas distintas', texto: '¿Con cuántas personas distintas validaste el problema antes de enamorarte de él?' },
});

export const desierto = pag({
  id: 'ep-desierto',
  titulo: 'Fracasar rápido y', destaque: 'cruzar el desierto',
  bajada: 'La parte más larga del viaje es cuando nada funciona.',
  inicio: 'construir una startup es una travesía de fracasos',
  anclas: {
    travesia: 'travesía de fracasos', horowitz: 'ben horowitz', bebe: 'dormía como un bebé', nadie: 'algo que nadie hizo antes',
    temes: 'si temes fracasar', pronto: 'hay que fracasar pronto', desierto: 'el desierto de la no tracción', construyes: 'construyes y no funciona',
    noLlegan: 'no llegan usuarios', noQuedan: 'llegan y no se quedan', direccion: 'cambiar de dirección', combustible: 'quedarte sin combustible',
    waze: 'waze lo vivió', desastre: 'fue un desastre', noventa: 'más del noventa por ciento', version: 'una versión nueva', angeles: 'primero en los ángeles',
  },
  tarjetas: [
    { rotulo: 'Fracasar pronto', texto: 'Si temes fracasar ya fracasaste; fallar pronto deja tiempo para ensayar más.', frase: 'si temes fracasar' },
    { rotulo: 'El desierto', texto: 'No cambies de dirección ni te quedes sin combustible: el financiamiento sale carísimo.', frase: 'el desierto de la no tracción', destacada: true },
    { rotulo: 'Waze en el mundo', texto: 'Más del 90 % la abandonaba; una versión cada dos o tres semanas hasta ser suficientemente buena.', frase: 'waze lo vivió' },
  ],
  pregunta: { frase: 'qué experimento podrías hacer', texto: '¿Qué experimento podrías hacer esta semana para fallar más rápido?' },
});

export const lanzar = pag({
  id: 'ep-lanzar',
  titulo: 'Lanzar antes', destaque: 'de estar listo',
  bajada: 'Simular antes de construir y tratar el fracaso como un evento.',
  inicio: 'si el viaje es de fracasos',
  anclas: {
    lanzar: 'conviene lanzar', avergüenza: 'te avergüenza la calidad', clientes: 'qué clientes', simular: 'simular antes de construir',
    whatsapp: 'grupo de whatsapp', mano: 'todo se hacía a mano', feex: 'feex hoy pontera', dell: 'michael dell', orden: 'cambió el orden',
    adhesivos: 'puso adhesivos', siguiente: 'siguiente experimento', evento: 'el fracaso es un evento', quien: 'preguntar quién es responsable',
    aprendimos: 'qué aprendimos', celebrar: 'conviene celebrar todo',
  },
  tarjetas: [
    { rotulo: 'Lanzar con vergüenza', texto: 'El mejor momento es cuando te avergüenza la calidad: solo se aprende con usuarios reales.', frase: 'te avergüenza la calidad' },
    { rotulo: 'Simular', texto: 'Mego fue un grupo de WhatsApp y FeeX leía documentos a mano antes del software.', frase: 'simular antes de construir', destacada: true },
    { rotulo: 'Un evento, no una persona', texto: 'Preguntar qué pasó y qué aprendimos invita a seguir ensayando.', frase: 'el fracaso es un evento' },
  ],
  pregunta: { frase: 'tu equipo pregunta quién falló', texto: '¿Tu equipo pregunta quién falló o qué aprendió?' },
});

export const disrupcion = pag({
  id: 'ep-disrupcion',
  titulo: 'La disrupción cambia', destaque: 'el comportamiento',
  bajada: 'No es tecnología: es un nuevo equilibrio del mercado.',
  inicio: 'abrazar la disrupción empieza',
  anclas: {
    mito: 'desmontar un mito', comportamiento: 'cambiar el comportamiento', netflix: 'netflix que iba a perder', blockbuster: 'venderse a blockbuster',
    nicho: 'un nicho muy pequeño', quebro: 'en dos mil diez quebró', valia: 'netflix valía', kodak: 'un ingeniero de kodak', nocontara: 'que no le contara',
    tres: 'tres formas de disrupción', gratuidad: 'la gratuidad', mercado: 'el mercado como uber', ecosistema: 'el ecosistema',
    rien: 'primero se ríen', diez: 'creció diez veces', taxis: 'tres veces más viajes', oportunidad: 'la oportunidad es mayor',
  },
  tarjetas: [
    { rotulo: 'Netflix y Blockbuster', texto: 'Netflix se ofreció por 50 millones; Blockbuster quebró en 2010 y Netflix llegó a valer unos 250 mil millones.', frase: 'netflix que iba a perder' },
    { rotulo: 'Tres formas', texto: 'La gratuidad (Gmail), el mercado (Uber, Airbnb) y el ecosistema (el iPhone).', frase: 'tres formas de disrupción', destacada: true },
    { rotulo: 'Un mercado más grande', texto: 'Tras Uber los traslados crecieron diez veces y los taxis hacen el triple de viajes.', frase: 'creció diez veces' },
  ],
  pregunta: { frase: 'qué parte de tu industria funciona', texto: '¿Qué parte de tu industria funciona solo porque el cliente no tiene información?' },
});

export const incumbentes = pag({
  id: 'ep-incumbentes',
  titulo: 'Por qué las empresas', destaque: 'establecidas no cambian',
  bajada: 'Tres frenos y dos preguntas para prepararse.',
  inicio: 'si la oportunidad es tan grande',
  anclas: {
    frenos: 'tres frenos', adn: 'el adn', obvia: 'la opción obvia', emprendedores: 'la falta de emprendedores', revoltosos: 'los revoltosos',
    despidieron: 'lo despidieron de todos', ego: 'y el ego', cinco: 'cinco líderes', tomtom: 'tomtom lo ilustró', mataran: 'quienes lo mataran',
    preguntas: 'dos preguntas', irrelevante: 'qué hará irrelevante', activos: 'qué activos tuyos', cafeteria: 'una cafetería', escritorios: 'se les ofrecen escritorios', fuera: 'fuera del negocio central',
  },
  tarjetas: [
    { rotulo: 'Tres frenos', texto: 'El ADN de la opción obvia, la falta de emprendedores y el ego de los líderes.', frase: 'tres frenos', destacada: true },
    { rotulo: 'Dos preguntas', texto: '¿Qué te hará irrelevante en cinco años? ¿Qué activos valdrían más organizados de otra manera?', frase: 'dos preguntas' },
    { rotulo: 'La cafetería', texto: 'Quienes trabajan horas con un café se vuelven clientes de una oficina temporal.', frase: 'una cafetería' },
  ],
  pregunta: { frase: 'qué cliente incómodo', texto: '¿Qué cliente incómodo de tu empresa es en realidad un modelo de negocio nuevo?' },
});

export const foco = pag({
  id: 'ep-foco',
  titulo: 'Lo principal es mantener', destaque: 'lo principal',
  bajada: 'Una cosa más importante por fase, y decir que no a todo lo demás.',
  inicio: 'trabajar por fases parte',
  anclas: {
    covey: 'stephen covey', importante: 'la cosa más importante', banco: 'llega al banco', rueditas: 'las rueditas', nohacer: 'qué no hacer',
    logistica: 'una empresa de logística', diezd: 'diez dólares por camión', fallo: 'el piloto falló', porDiez: 'multiplicar el precio por diez',
    millon: 'un millón de dólares al año', dijoNo: 'waze dijo que no', mision: 'su misión era', camiones: 'no a los camiones', enfoque: 'una palabra enfoque',
  },
  tarjetas: [
    { rotulo: 'La cosa más importante', texto: 'Cada etapa tiene la suya; cuando se logra, deja de serlo.', frase: 'la cosa más importante' },
    { rotulo: 'El millón rechazado', texto: 'Un contrato de logística por un millón al año, más de lo que Waze facturó en tres años.', frase: 'un millón de dólares al año', destacada: true },
    { rotulo: 'Enfoque', texto: 'No a los camiones, a los ciclistas, a los peatones y al transporte público.', frase: 'no a los camiones' },
  ],
  pregunta: { frase: 'a qué oportunidad atractiva', texto: '¿A qué oportunidad atractiva deberías decirle que no este trimestre?' },
});

export const fases = pag({
  id: 'ep-fases',
  titulo: 'El orden', destaque: 'de las fases',
  bajada: 'Primero el ajuste producto-mercado; la frecuencia de uso decide lo demás.',
  inicio: 'en qué orden van las fases',
  anclas: {
    ajuste: 'siempre empieza el ajuste', vives: 'si lo logras vives', crecer: 'no sirve crecer antes', frecuencia: 'la frecuencia de uso',
    crecimiento: 'sigue el crecimiento', modelo: 'sigue el modelo de negocio', segunda: 'compre por segunda vez', regla: 'como regla de precio',
    millon: 'un millón al año', anios: 'de dos a tres años', cuatro: 'solo el cuatro por ciento', peligro: 'el mayor peligro', triplica: 'el gasto se triplica', primeros: 'los primeros cinco o seis',
  },
  tarjetas: [
    { rotulo: 'Primero el ajuste', texto: 'Crear valor para que los usuarios vuelvan: si lo logras vives, si no mueres.', frase: 'siempre empieza el ajuste', destacada: true },
    { rotulo: 'La frecuencia decide', texto: 'Uso frecuente: crecimiento. Uso escaso: primero el modelo de negocio.', frase: 'la frecuencia de uso' },
    { rotulo: 'Del 10 al 25 %', texto: 'Se cobra entre el 10 y el 25 % del valor que se crea para el cliente.', frase: 'como regla de precio' },
  ],
  pregunta: { frase: 'en qué fase está realmente', texto: '¿En qué fase está realmente tu producto, según los números y no según la intuición?' },
});

export const historia = pag({
  id: 'ep-historia',
  titulo: 'Les tienen que gustar', destaque: 'el CEO y la historia',
  bajada: 'Los hechos hacen pensar; las historias hacen sentir.',
  inicio: 'la montaña rusa de la financiación tiene una regla',
  anclas: {
    regla: 'tiene una regla', siente: 'antes de que se siente', fuerte: 'el punto más fuerte', vertex: 'el fondo vertex', yoram: 'yoram oron',
    direcciones: 'las direcciones de los socios', casa: 'si su casa podía estar', aparecio: 'y apareció', contrato: 'un contrato por dos millones',
    hechos: 'los hechos hacen pensar', zeek: 'para zeek', microondas: 'un microondas empotrado', ancho: 'más ancho que el marco', credito: 'solo ofrece crédito',
    dos: 'dos microondas', gestos: 'los mismos gestos', imagen: 'la primera y la última imagen',
  },
  tarjetas: [
    { rotulo: 'En segundos', texto: 'El inversionista decide si le gusta el emprendedor antes de que se siente.', frase: 'antes de que se siente' },
    { rotulo: 'La casa en el mapa', texto: 'La dirección de Yoram Oron apareció en el mapa; una semana después, un contrato por 2 millones.', frase: 'yoram oron', destacada: true },
    { rotulo: 'El microondas', texto: 'Una historia llena de detalles hace imaginar y sentir el problema de Zeek.', frase: 'un microondas empotrado' },
  ],
  pregunta: { frase: 'con qué historia concreta', texto: '¿Con qué historia concreta harías que un cliente sintiera el problema que resuelves?' },
});

export const noes = pag({
  id: 'ep-noes',
  titulo: 'La danza de', destaque: 'los cien noes',
  bajada: 'Rechazos, señales de interés y fondos que corren cuando temen perder.',
  inicio: 'conseguir dinero es la danza',
  anclas: {
    danza: 'la danza de los cien noes', cien: 'cien a doscientas empresas', unaodos: 'invierte en una o dos', generador: 'un generador de fondos',
    veces: 'cien veces la inversión', clientes: 'si veinte clientes', inversionistas: 'si veinte inversionistas', basura: 'la basura del inversionista',
    google: 'google puede hacer eso', agradece: 'se agradece', senales: 'señales de interés real', presentacion: 'cambios en la presentación',
    lentos: 'los fondos son lentos', magma: 'cuando magma supo', jueves: 'y el jueves envió', seis: 'seis millones de dólares', doce: 'fue de doce millones',
  },
  tarjetas: [
    { rotulo: 'Uno de cien', texto: 'Un socio ve de cien a doscientas empresas al año e invierte en una o dos.', frase: 'cien a doscientas empresas' },
    { rotulo: 'Basura y señales', texto: '«Siempre», «nunca» y «Google puede hacerlo» son basura; hablar de términos es interés real.', frase: 'la basura del inversionista' },
    { rotulo: 'Magma en cuatro días', texto: 'Temió perder el trato y ofreció 6 millones en lugar de 2; la ronda cerró en 12.', frase: 'cuando magma supo', destacada: true },
  ],
  pregunta: { frase: 'qué señales de interés real ves', texto: '¿Qué señales de interés real ves en tus prospectos y cuáles son solo cortesía?' },
});

export const carta = pag({
  id: 'ep-carta',
  titulo: 'La carta de intención y', destaque: 'el matrimonio católico',
  bajada: 'Cada término decide quién cobra y cuánto cuando la empresa se vende.',
  inicio: 'la carta de intención resume',
  anclas: {
    grial: 'el santo grial', desigual: 'una pelea desigual', ayuda: 'pedir ayuda', valoracion: 'la valoración', preferencia: 'la preferencia de liquidación',
    rondas: 'tres rondas de cinco', cien: 'por cien millones', cuarenta: 'les tocan cuarenta', setenta: 'setenta y cinco millones', diez: 'unos diez millones',
    consolidacion: 'la consolidación de las acciones', mitad: 'la mitad de los equipos fundadores', matrimonio: 'un matrimonio católico', diligencia: 'la debida diligencia',
  },
  tarjetas: [
    { rotulo: 'Pedir ayuda', texto: 'La primera negociación es desigual: casi todo es negociable con quien ya lo vivió.', frase: 'una pelea desigual' },
    { rotulo: 'La cascada', texto: 'Venta en 100 millones: 75 vuelven primero a los inversionistas y quedan unos 10 para las comunes.', frase: 'por cien millones', destacada: true },
    { rotulo: 'Matrimonio católico', texto: 'No hay divorcio: antes de firmar se hace la debida diligencia al inversionista.', frase: 'un matrimonio católico' },
  ],
  pregunta: { frase: 'qué cláusula de tus contratos', texto: '¿Qué cláusula de tus contratos podría sorprenderte el día que cambien las cosas?' },
});

export const junta = pag({
  id: 'ep-junta',
  titulo: 'Actualizaciones y', destaque: 'junta directiva',
  bajada: 'Constancia hacia afuera y ninguna sorpresa hacia adentro.',
  inicio: 'controlar a los inversionistas',
  anclas: {
    continuo: 'un trabajo continuo', mensual: 'actualización mensual', hoja: 'una sola hoja', parrafo: 'un párrafo fijo', novedad: 'la novedad del mes',
    peticion: 'una petición concreta', graficos: 'dos o tres gráficos', rectas: 'líneas rectas', busquen: 'que ellos te busquen', reglas: 'tres reglas',
    sorpresas: 'sin sorpresas', ricitos: 'ricitos de oro', medio: 'en el medio', sugieren: 'qué sugieren', precision: 'informar con precisión',
  },
  tarjetas: [
    { rotulo: 'Una hoja al mes', texto: 'Presentación fija, novedad del mes, una petición y los mismos gráficos que suben.', frase: 'actualización mensual', destacada: true },
    { rotulo: 'Sin sorpresas', texto: 'Se prepara a cada miembro antes de la reunión y se envía el material con días de anticipación.', frase: 'sin sorpresas' },
    { rotulo: 'Ricitos de Oro', texto: 'Tres opciones con la deseada en el medio y, ante el desacuerdo, «¿qué sugieren?».', frase: 'ricitos de oro' },
  ],
  pregunta: { frase: 'qué decisión llevarías', texto: '¿Qué decisión llevarías a tu próxima reunión de gerencia sin haber preparado a nadie?' },
});

export const ORDEN1 = [portada, origen, problema, matriz, pasion, desierto, lanzar, disrupcion, incumbentes, foco, fases, historia, noes, carta, junta];
