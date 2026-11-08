import type { Pagina, Tarjeta } from '../influencia/tipos';

/* «Feedback en equipos: dar y recibir». Cada página declara sus anclas como { nombre: frase del guion } en el
   orden en que suenan (datos puros, sin React: el generador de tiempos los lee con esbuild). */

export type PaginaFB = Pagina & { anclas: Record<string, string> };

export const pag = (p: Omit<PaginaFB, 'frases' | 'els' | 'tarjetas'> & { tarjetas: Tarjeta[] }): PaginaFB => ({ ...p, frases: Object.values(p.anclas), els: [] });

export const portada = pag({
  id: 'fb-portada', titulo: 'Feedback en equipos:', destaque: 'dar y recibir',
  bajada: 'Dos habilidades distintas que un equipo necesita por igual.',
  inicio: 'un equipo mejora a la misma velocidad',
  anclas: {
    equipo: 'un equipo mejora', verdad: 'se dicen la verdad', informacion: 'es la información que recibes', comentario: 'un comentario después de una reunión', dos: 'tiene dos lados',
    dar: 'darlo bien es lograr', recibir: 'recibirlo bien es sacar algo útil', empuja: 'quien habla empuja', defiende: 'quien escucha se defiende', tacticas: 'con tácticas concretas',
    cuando: 'cuándo hablar y cuándo esperar', abrir: 'cómo abrir una conversación difícil', plan: 'cómo convertirla en un plan', reconocer: 'cómo reconocer un buen trabajo',
    critica: 'cómo recibir una crítica', habito: 'un hábito de equipo', semana: 'cada semana cómo le está yendo',
  },
  tarjetas: [
    { rotulo: 'Dar bien', texto: 'Que la otra persona entienda qué cambiar y quiera hacerlo.', frase: 'darlo bien es lograr' },
    { rotulo: 'Recibir bien', texto: 'Sacar algo útil incluso de un comentario injusto, mal dicho o en mal momento.', frase: 'recibirlo bien es sacar algo útil' },
    { rotulo: 'El hábito', texto: 'Que cada persona sepa, cada semana, cómo le está yendo.', frase: 'un hábito de equipo', destacada: true },
  ],
  pregunta: { frase: 'cuándo fue la última vez que alguien', texto: '¿Cuándo fue la última vez que alguien de tu equipo te dijo algo que te hizo mejorar?' },
});

export const callar = pag({
  id: 'fb-callar', titulo: 'El costo', destaque: 'de callar',
  bajada: 'El feedback no es un evento anual: es parte del trabajo de cada semana.',
  inicio: 'callar parece la opción segura',
  anclas: {
    segura: 'callar parece la opción segura', bill: 'piensa en bill', cuello: 'un cuello de botella', acumula: 'el material se acumula', noche: 'cada noche hasta tarde',
    anual: 'esperar a la evaluación anual', datos: 'reúne los datos', pregunta: 'le pregunta qué está pasando', origen: 'aparece el origen', formato: 'solo había cambiado el formato',
    tachan: 'tachan lo que sobra', ritmo: 'vuelve a su ritmo de siempre', evito: 'evitó un plazo incumplido', injusta: 'injusta o imprecisa', cuatro: 'una de cada cuatro',
    coraje: 'el coraje ni la habilidad', formularios: 'llenar formularios', semanal: 'parte del trabajo de cada semana',
  },
  tarjetas: [
    { rotulo: 'Una conversación a tiempo', texto: 'Bill creía que el proceso nuevo pedía más registros; solo había cambiado el formato. En días volvió a su ritmo.', frase: 'aparece el origen' },
    { rotulo: 'Lo que se posterga', texto: '51 % ve injusta su evaluación; 63 % de los ejecutivos dice que a los jefes les falta coraje; solo 28 % de RR. HH. cree que hacen algo más que llenar formularios.', frase: 'injusta o imprecisa' },
    { rotulo: 'La táctica', texto: 'El feedback es parte del trabajo de cada semana, no un evento anual.', frase: 'parte del trabajo de cada semana', destacada: true },
  ],
  pregunta: { frase: 'qué conversación estás postergando', texto: '¿Qué conversación estás postergando hoy en tu equipo?' },
});

export const tipos = pag({
  id: 'fb-tipos', titulo: 'Tres tipos', destaque: 'de feedback',
  bajada: 'Agradecimiento, coaching y evaluación responden a necesidades distintas.',
  inicio: 'antes de dar o recibir feedback conviene saber',
  anclas: {
    tres: 'cuál de los tres tipos', agradecimiento: 'el agradecimiento dice', coaching: 'el coaching dice', evaluacion: 'la evaluación dice', cruzan: 'cuando se cruzan',
    vendedor: 'un vendedor pide ayuda', recibio: 'recibió una evaluación', operaria: 'una operaria que lleva meses', esfuerzo: 'notara su esfuerzo', ruidosa: 'la más ruidosa',
    bono: 'no habrá bono', pesa: 'el agradecimiento pesa más', gallup: 'una encuesta de gallup', siete: 'en los últimos siete días', decide: 'decide qué tipo de feedback',
    separa: 'separa las conversaciones', intencion: 'cuál es la intención',
  },
  tarjetas: [
    { rotulo: 'Agradecimiento', texto: 'Te vi, lo que haces importa.', frase: 'el agradecimiento dice' },
    { rotulo: 'Coaching y evaluación', texto: 'Así podrías mejorar / aquí estás frente al estándar. La evaluación tapa a las otras dos.', frase: 'el coaching dice' },
    { rotulo: 'Tácticas', texto: 'Anuncia el tipo al empezar, separa evaluación de coaching y pregunta la intención al recibir.', frase: 'decide qué tipo de feedback', destacada: true },
  ],
  pregunta: { frase: 'qué tipo de feedback le falta', texto: '¿Qué tipo de feedback le falta hoy a tu equipo?' },
});

export const amenaza = pag({
  id: 'fb-amenaza', titulo: 'La reacción', destaque: 'de amenaza',
  bajada: 'Construir la relación antes de necesitarla.',
  inicio: 'la frase puedo darte un feedback',
  anclas: {
    frase: 'puedo darte un feedback', pulso: 'suele subir el pulso', huida: 'lucha o huida', costo: 'tiene un costo', justifican: 'unos se justifican', brazos: 'cruzan los brazos',
    relacion: 'construir la relación antes', cinco: 'cinco interacciones positivas', saldo: 'con saldo a favor', pasillo: 'cada cruce de pasillo', senales: 'notar las señales pequeñas',
    autoridad: 'quienes tienen autoridad', escenario: 'preparar el escenario', frescos: 'cuando ambos estén frescos', oficina: 'tu oficina refuerza la jerarquía', caminata: 'una caminata',
    lado: 'sentarse del mismo lado',
  },
  tarjetas: [
    { rotulo: 'Lucha o huida', texto: 'Con el cuerpo en alerta, la capacidad de procesar información compleja cae justo cuando más se necesita.', frase: 'lucha o huida' },
    { rotulo: 'Cinco a uno', texto: 'Las relaciones que funcionan tienen unas cinco interacciones positivas por cada negativa.', frase: 'cinco interacciones positivas', destacada: true },
    { rotulo: 'El escenario', texto: 'Ambos frescos, tiempo de sobra, un lugar neutro y sentados del mismo lado.', frase: 'preparar el escenario' },
  ],
  pregunta: { frase: 'cuánto saldo tiene hoy', texto: '¿Cuánto saldo tiene hoy tu cuenta de confianza con cada persona del equipo?' },
});

export const novatos = pag({
  id: 'fb-novatos', titulo: 'Novatos', destaque: 'y expertos',
  bajada: 'El elogio mueve al que empieza; la crítica, al que ya domina.',
  inicio: 'no todas las personas necesitan el mismo feedback',
  anclas: {
    mismo: 'no todas las personas necesitan', frances: 'alumnos de francés', empezaban: 'quienes recién empezaban', avanzados: 'los avanzados preferían', ambiente: 'medio ambiente',
    donar: 'podían donar', negativo: 'con feedback negativo', positivo: 'con feedback positivo se dio vuelta', animo: 'le da ánimo', domina: 'ya domina la tarea',
    ejecutivo: 'al ejecutivo comercial', cartera: 'diez años de cartera', maquina: 'la operaria que recién aprende', tacto: 'siempre va con tacto',
  },
  tarjetas: [
    { rotulo: 'Donaciones según el feedback', texto: 'Negativo: expertos 8,53 dólares, novatos 1,24. Positivo: novatos 8,31, expertos 2,92.', frase: 'con feedback negativo', destacada: true },
    { rotulo: 'Al que empieza', texto: 'Refuerza con detalle lo que hizo bien y corrige solo lo más importante.', frase: 'al ejecutivo comercial' },
    { rotulo: 'Al que domina', texto: 'No endulces la crítica: muestra con precisión qué le está costando resultados.', frase: 'diez años de cartera' },
  ],
  pregunta: { frase: 'quién de tu equipo necesita hoy', texto: '¿Quién de tu equipo necesita hoy más reconocimiento y quién más exigencia?' },
});

export const cuando = pag({
  id: 'fb-cuando', titulo: 'Cuándo sí', destaque: 'y cuándo no',
  bajada: 'Elegir el momento evita la mitad de los problemas.',
  inicio: 'saber cuándo dar feedback',
  anclas: {
    mitad: 'evita la mitad de los problemas', conviene: 'conviene hacerlo cuando', esperar: 'conviene esperar cuando', preferencia: 'tu preferencia personal', traicionero: 'el más traicionero',
    sarah: 'imagina a sarah', estresaria: 'ese ritmo te estresaría', tiempo: 'siempre llega a tiempo', imponiendo: 'estás imponiendo tu estilo', cambiar: 'se puede cambiar',
    habilidades: 'las habilidades la gestión del tiempo', actitudes: 'las actitudes los hábitos', protocolo: 'un protocolo concreto', momento: 'pronto pero no a la carrera', hechos: 'primero reúne los hechos',
  },
  tarjetas: [
    { rotulo: 'Sí', texto: 'Para reconocer, si la habilidad se usará pronto, si ya lo espera o si el problema afecta al equipo.', frase: 'conviene hacerlo cuando' },
    { rotulo: 'Todavía no', texto: 'Sin toda la información, en un mal momento, sin calma, sin solución o si es solo tu preferencia.', frase: 'conviene esperar cuando', destacada: true },
    { rotulo: 'Lo que se puede cambiar', texto: 'Habilidades, tiempo y conocimiento sí; actitudes y personalidad, se piden como conductas concretas.', frase: 'se puede cambiar' },
  ],
  pregunta: { frase: 'cuál de tus próximos comentarios', texto: '¿Cuál de tus próximos comentarios es en realidad tu preferencia y no una necesidad?' },
});

export const encuadre = pag({
  id: 'fb-encuadre', titulo: 'Abrir', destaque: 'el encuadre',
  bajada: 'Cómo piensas el problema antes de hablar decide cómo termina.',
  inicio: 'la forma en que piensas un problema',
  anclas: {
    forma: 'la forma en que piensas', jeremy: 'jeremy un gerente de producto', controlador: 'jeremy es controlador', delegue: 'le dice que delegue más', estrategia: 'no piensa en estrategia',
    tercera: 'en la tercera vuelta', nadie: 'nadie aprendió nada', estrecho: 'un encuadre estrecho', binario: 'binario gano o pierdo', congelado: 'y congelado', sesgos: 'hay dos sesgos',
    caracter: 'a su carácter', creemos: 'creemos que cualquiera', quizas: 'quizás jeremy quería delegar', abrir: 'abrir el encuadre', frank: 'escuché que frank y joan',
    disenadas: 'las preguntas diseñadas', tres: 'escribe tres explicaciones',
  },
  tarjetas: [
    { rotulo: 'El encuadre que falla', texto: 'Estrecho (una explicación), binario (gano o pierdo) y congelado (no cambia en la conversación).', frase: 'un encuadre estrecho' },
    { rotulo: 'Dos sesgos', texto: 'Culpar al carácter y no a la situación; creer que el otro ve lo mismo que tú.', frase: 'hay dos sesgos' },
    { rotulo: 'La táctica', texto: 'Antes de hablar, escribe tres explicaciones distintas de lo que observaste.', frase: 'escribe tres explicaciones', destacada: true },
  ],
  pregunta: { frase: 'qué explicación alternativa no consideraste', texto: '¿Qué explicación alternativa no consideraste en tu último feedback?' },
});

export const red = pag({
  id: 'fb-red', titulo: 'Tu lado', destaque: 'de la red',
  bajada: 'Habla de lo que observaste, no de lo que imaginas que piensa el otro.',
  inicio: 'hay una frontera que conviene no cruzar',
  anclas: {
    frontera: 'hay una frontera', certeza: 'puedes describir con certeza', terreno: 'entras en su terreno', tarde: 'no valoras mi tiempo', hecho: 'es un hecho tuyo',
    estructura: 'una estructura útil tiene tres partes', ventas: 'en ventas', interrumpiste: 'interrumpiste dos veces', cerro: 'cerró la reunión antes de tiempo', operaciones: 'en operaciones',
    registrada: 'no quedó registrada la falla', hora: 'perdió una hora buscándola', adjetivos: 'sin adjetivos como', emociones: 'las emociones tienen su lugar', dosis: 'en una dosis',
    ensaya: 'ensaya las conversaciones difíciles',
  },
  tarjetas: [
    { rotulo: 'Hecho, no suposición', texto: '«No valoras mi tiempo» supone; «cuando llegas tarde, me siento poco valorado» es un hecho tuyo.', frase: 'no valoras mi tiempo' },
    { rotulo: 'Situación, comportamiento, impacto', texto: 'Una situación concreta, una conducta observable y una consecuencia verificable.', frase: 'una estructura útil tiene tres partes', destacada: true },
    { rotulo: 'Ensayar', texto: 'Practica la conversación con un colega y luego cambien de papel.', frase: 'ensaya las conversaciones difíciles' },
  ],
  pregunta: { frase: 'cómo describirías el último problema', texto: '¿Cómo describirías el último problema de tu equipo en situación, comportamiento e impacto?' },
});

export const abrir = pag({
  id: 'fb-abrir', titulo: 'Abrir', destaque: 'y conversar',
  bajada: 'Los primeros segundos marcan el tono de todo lo que sigue.',
  inicio: 'los primeros segundos de una conversación',
  anclas: {
    segundos: 'los primeros segundos', judy: 'judy atiende la mesa de ayuda', reclamo: 'un cliente reclamó', mal: 'su jefe puede abrir así', defender: 'judy se va a defender',
    bien: 'o puede abrir así', escuchada: 'entiende que será escuchada', grabacion: 'escuchó la grabación', escuchar: 'escuchar de verdad', noverbal: 'notar lo no verbal',
    cuerpo: 'cuidar tu propio cuerpo', parafrasear: 'parafrasear lo que oyes', causa: 'busca la causa de fondo', tarde: 'llega tarde todos los días', distinta: 'cada causa pide una solución distinta',
  },
  tarjetas: [
    { rotulo: 'La apertura', texto: '«Te cuento lo que sé, quiero escuchar tu versión y luego vemos juntos qué hacer.»', frase: 'o puede abrir así', destacada: true },
    { rotulo: 'Durante la conversación', texto: 'Escuchar de verdad, notar lo no verbal, cuidar tu cuerpo y parafrasear.', frase: 'escuchar de verdad' },
    { rotulo: 'La causa de fondo', texto: 'Llegar tarde puede venir de la casa, el trayecto o la desmotivación: cada causa pide otra solución.', frase: 'busca la causa de fondo' },
  ],
  pregunta: { frase: 'cómo abrirías la próxima conversación', texto: '¿Cómo abrirías la próxima conversación difícil que tienes pendiente?' },
});

export const plan = pag({
  id: 'fb-plan', titulo: 'Plan', destaque: 'y seguimiento',
  bajada: 'Una buena conversación sin plan se evapora en una semana.',
  inicio: 'una buena conversación sin plan',
  anclas: {
    evapora: 'se evapora en una semana', hora: 'hora y media de la oficina', caminos: 'tienes tres caminos', incentivo: 'un incentivo', consecuencia: 'una consecuencia',
    alternativa: 'o una alternativa', resuelve: 'la alternativa resuelve', cinco: 'cierra la conversación con cinco pasos', resume: 'resume el plan', explique: 'que lo explique con sus palabras',
    siente: 'cómo se siente con lo acordado', fija: 'fija cuándo y cómo', plazo: 'y pon un plazo', seguimiento: 'el seguimiento es donde', revisa: 'primero revisa tu parte',
    rrhh: 'involucra a recursos humanos', justo: 'con un proceso justo',
  },
  tarjetas: [
    { rotulo: 'Tres caminos', texto: 'Un incentivo, una consecuencia o una alternativa que resuelva la causa.', frase: 'tienes tres caminos' },
    { rotulo: 'Cinco pasos de cierre', texto: 'Resumir, que lo explique con sus palabras, preguntar cómo se siente, fijar la revisión y poner plazo.', frase: 'cierra la conversación con cinco pasos', destacada: true },
    { rotulo: 'Seguimiento', texto: 'Revisar en las fechas acordadas, reconocer cada mejora y decir con franqueza si el avance es lento.', frase: 'el seguimiento es donde' },
  ],
  pregunta: { frase: 'qué acuerdo reciente de tu equipo', texto: '¿Qué acuerdo reciente de tu equipo quedó sin fecha de revisión?' },
});

export const espiral = pag({
  id: 'fb-espiral', titulo: 'La espiral', destaque: 'del fracaso',
  bajada: 'A veces el jefe fabrica el bajo rendimiento que después lamenta.',
  inicio: 'a veces el jefe es quien fabrica',
  anclas: {
    fabrica: 'el jefe es quien fabrica', steve: 'steve era un supervisor', linea: 'una línea nueva clave', jeff: 'su nuevo jefe jeff', informes: 'informes escritos', noexplico: 'pero no las explicó',
    desconfianza: 'lo vivió como desconfianza', proactivo: 'no era proactivo', controlarlo: 'empezó a controlarlo más', cerro: 'se cerró aún más', renunciar: 'pensaba en renunciar',
    espiral: 'una espiral que se alimenta sola', parejas: '50 parejas de jefe', noventa: 'hasta el 90', cinco: 'los primeros cinco días', revertir: 'para revertirla hay cinco pasos',
    pregunta: 'qué hago yo que te lo hace más difícil', prevenir: 'para prevenirla',
  },
  tarjetas: [
    { rotulo: 'Cómo se forma', texto: 'Más control → menos propuestas → peor imagen → más control. Se alimenta sola.', frase: 'una espiral que se alimenta sola', destacada: true },
    { rotulo: 'La evidencia', texto: 'Hasta el 90 % de los jefes separa a «los de confianza» de «la mano de obra», a menudo en los primeros cinco días.', frase: 'hasta el 90' },
    { rotulo: 'Para revertirla', texto: 'Lugar neutro, síntomas con hechos, causas (incluida tu conducta), supervisión que baja y aviso mutuo.', frase: 'para revertirla hay cinco pasos' },
  ],
  pregunta: { frase: 'a quién de tu equipo clasificaste', texto: '¿A quién de tu equipo clasificaste demasiado rápido?' },
});

export const defensiva = pag({
  id: 'fb-defensiva', titulo: 'Quien se pone', destaque: 'a la defensiva',
  bajada: 'Tu trabajo no es que se vaya contento, es que la información le llegue.',
  inicio: 'hay personas que reciben cualquier crítica',
  anclas: {
    ataque: 'como un ataque', melissa: 'melissa coordinaba un proyecto', james: 'james que trabajaba desde otra ciudad', lista: 'james no estaba en su lista', gritar: 'era conocido por gritar',
    disculpas: 'podía pedir disculpas', debil: 'la hacían ver débil', endurecerse: 'endurecerse para igualarlo', tres: 'tiene tres partes', contenido: 'contenido claro', tono: 'tono neutro',
    frases: 'y frases equilibradas', dijo: 'melissa dijo', repitio: 'repitió la misma frase', acuerdos: 'pequeños acuerdos', falla: 'ves alguna falla en mi razonamiento',
    gracias: 'gracias por reunirte conmigo', llegue: 'que la información le llegue',
  },
  tarjetas: [
    { rotulo: 'Tres partes juntas', texto: 'Contenido claro, tono neutro y frases equilibradas, sin adjetivos que provoquen.', frase: 'tiene tres partes', destacada: true },
    { rotulo: 'La frase de Melissa', texto: '«En febrero, marzo y abril el equipo no recibió los resultados que te comprometiste a entregar.»', frase: 'melissa dijo' },
    { rotulo: 'Si desvía', texto: 'Repetir la misma frase, construir pequeños acuerdos sobre hechos y cerrar con calma.', frase: 'repitió la misma frase' },
  ],
  pregunta: { frase: 'qué frase clara y neutra', texto: '¿Qué frase clara y neutra le dirías a la persona más difícil de tu equipo?' },
});

export const estrella = pag({
  id: 'fb-estrella', titulo: 'El callado', destaque: 'y la estrella',
  bajada: 'Dos perfiles que suelen quedar fuera del feedback.',
  inicio: 'dos perfiles opuestos suelen quedar fuera',
  anclas: {
    perfiles: 'dos perfiles opuestos', callada: 'con la persona callada', pausas: 'haz pausas deliberadas', abiertas: 'haz preguntas abiertas', estrella: 'con la estrella pasa lo contrario',
    consultora: 'una consultora brillante', ofendio: 'la consultora se ofendió', meta: 'le preguntó cuál era su meta', gerente: 'quería ser gerente pronto', limite: 'con la agenda siempre al límite',
    sentido: 'el feedback cobró sentido', agradeciendo: 'empieza agradeciendo con detalle', costo: 'a qué costo llegaron', siguiente: 'apunta al siguiente nivel', apoyarlas: 'cómo puedes apoyarlas',
    frecuente: 'más frecuente debe ser',
  },
  tarjetas: [
    { rotulo: 'La persona callada', texto: 'Paciencia, pausas deliberadas y preguntas abiertas que no se respondan con sí o no.', frase: 'con la persona callada' },
    { rotulo: 'La estrella', texto: 'Conectar el feedback con su propia meta: así cobró sentido para la consultora que se quemaba.', frase: 'le preguntó cuál era su meta' },
    { rotulo: 'Cuatro tácticas', texto: 'Agradecer con detalle, preguntar el costo de los resultados, apuntar al siguiente nivel y ofrecer apoyo.', frase: 'empieza agradeciendo con detalle', destacada: true },
  ],
  pregunta: { frase: 'cuándo fue la última conversación de desarrollo', texto: '¿Cuándo fue la última conversación de desarrollo con tu mejor persona?' },
});

export const arriba = pag({
  id: 'fb-arriba', titulo: 'Hacia arriba', destaque: 'y entre culturas',
  bajada: 'Dar feedback al jefe y ajustar el estilo al código del otro.',
  inicio: 'el feedback no solo baja por la jerarquía',
  anclas: {
    jerarquia: 'no solo baja por la jerarquía', jefe: 'dárselo a tu jefe', p1: 'primero confirma', p2: 'segundo decide si vale la pena', p3: 'tercero prepara datos objetivos',
    p4: 'cuarto no lo sorprendas', p5: 'quinto describe el comportamiento', p6: 'sexto propón', p7: 'y séptimo cierra', culturales: 'las diferencias culturales', jens: 'jens un ejecutivo alemán',
    shanghai: 'en shanghái', exigencia: 'exigencia críticas inmediatas', bajo: 'la productividad bajó', mentor: 'un mentor local', intermedio: 'un estilo intermedio', pais: 'dentro de un mismo país',
  },
  tarjetas: [
    { rotulo: 'Siete pasos hacia arriba', texto: 'Confirmar, decidir, preparar datos, pedir reunión, describir conducta e impacto, proponer y cerrar con compromiso.', frase: 'dárselo a tu jefe', destacada: true },
    { rotulo: 'De Alemania a Shanghái', texto: 'La crítica directa bajó la productividad; un estilo intermedio, con más refuerzo positivo, funcionó.', frase: 'jens un ejecutivo alemán' },
    { rotulo: 'Ajustar el código', texto: 'Aprender cómo esperan recibir el feedback y adaptarse sin copiarlo por completo.', frase: 'dentro de un mismo país' },
  ],
  pregunta: { frase: 'qué te cuesta más decirle', texto: '¿Qué te cuesta más decirle a quien está por encima de ti?' },
});

export const reconocer = pag({
  id: 'fb-reconocer', titulo: 'Reconocer', destaque: 'bien',
  bajada: 'Frecuente, conectado, proporcional y personal.',
  inicio: 'reconocer un buen trabajo parece fácil',
  anclas: {
    facil: 'reconocer un buen trabajo parece fácil', errores: 'tres errores típicos', acuerda: 'cuando se acuerda', sandwiches: 'pedir sándwiches', tarjeta: 'la misma tarjeta de regalo',
    chiste: 'un chiste del equipo', rasgos: 'tiene cinco rasgos', frecuente: 'es frecuente', gallup: 'gallup encontró', conectado: 'está conectado con lo que la empresa valora',
    proporcional: 'es proporcional', personal: 'es personal', hito: 'en cada hito', esfuerzo: 'elogia el esfuerzo y no el talento', rompecabezas: 'resolvieron un rompecabezas',
    facil2: 'escogió uno fácil', dificil: 'escogió uno difícil', colchon: 'como colchón',
  },
  tarjetas: [
    { rotulo: 'Cinco rasgos', texto: 'Frecuente (cada dos semanas), conectado con los valores, proporcional, personal y por hitos.', frase: 'tiene cinco rasgos', destacada: true },
    { rotulo: 'Esfuerzo, no talento', texto: 'Los niños elogiados por inteligencia eligieron el rompecabezas fácil; los elogiados por esfuerzo, el difícil.', frase: 'elogia el esfuerzo y no el talento' },
    { rotulo: 'Sin colchón', texto: 'El elogio usado antes de una crítica enseña a desconfiar de todos los elogios.', frase: 'como colchón' },
  ],
  pregunta: { frase: 'a quién de tu equipo deberías reconocer', texto: '¿A quién de tu equipo deberías reconocer esta semana, y por qué exactamente?' },
});

export const recibir = pag({
  id: 'fb-recibir', titulo: 'Recibir:', destaque: 'tres disparadores',
  bajada: 'Recibir bien no es aceptarlo todo, es entender antes de decidir.',
  inicio: 'ahora el otro lado recibir',
  anclas: {
    lado: 'ahora el otro lado recibir', controlas: 'la que más controlas', aceptar: 'no significa aceptarlo todo', vale: 'y vale la pena', criticas: 'piden específicamente críticas',
    disparadores: 'tres disparadores', verdad: 'el disparador de la verdad aparece', relacion: 'el disparador de la relación aparece', identidad: 'el disparador de la identidad aparece',
    ejecutivo: 'imagina a un ejecutivo comercial', nocierto: 'puede pensar que no es cierto', laminas: 'cuarenta láminas', noche: 'toda la noche', vez: 'pueden activarse a la vez',
    nombrarlos: 'la primera táctica es nombrarlos', separa: 'separa la reacción de la respuesta',
  },
  tarjetas: [
    { rotulo: 'Por qué pedir feedback', texto: 'Adaptación más rápida, más creatividad, más satisfacción, menos rotación y mejores evaluaciones para quien pide críticas.', frase: 'y vale la pena' },
    { rotulo: 'Tres disparadores', texto: 'Verdad («eso no es así»), relación («¿quién eres tú?») e identidad («entonces no sirvo»).', frase: 'tres disparadores', destacada: true },
    { rotulo: 'Nombrarlos', texto: 'Preguntarte cuál se encendió separa la reacción de la respuesta.', frase: 'la primera táctica es nombrarlos' },
  ],
  pregunta: { frase: 'cuál de los tres disparadores se te enciende', texto: '¿Cuál de los tres disparadores se te enciende con más frecuencia?' },
});

export const verdad = pag({
  id: 'fb-verdad', titulo: 'De «eso está mal»', destaque: 'a «cuéntame más»',
  bajada: 'Desarmar las etiquetas vagas y buscar tus puntos ciegos.',
  inicio: 'el disparador de la verdad se desarma',
  anclas: {
    frase: 'cambiando una frase', cuentame: 'cuéntame más', etiquetas: 'etiquetas vagas', atras: 'hacia atrás', adelante: 'hacia adelante', vendedora: 'a la vendedora a la que le dicen',
    precio: 'preguntó dos veces por el precio', ciegos: 'los puntos ciegos', cara: 'nuestra cara y nuestro tono', intenciones: 'por nuestras intenciones', humillacion: 'vivió la humillación',
    situacion: 'por la situación y los de otros', trafico: 'por el tráfico', absurdo: 'te parezca absurdo', potente: 'la táctica más potente', patrones: 'busca patrones',
  },
  tarjetas: [
    { rotulo: 'Desarmar la etiqueta', texto: 'Hacia atrás: ¿qué viste? Hacia adelante: ¿qué harías distinto en mi lugar?', frase: 'etiquetas vagas' },
    { rotulo: 'Tres puntos ciegos', texto: 'Tu cara y tu tono; intención frente a impacto; situación frente a carácter.', frase: 'los puntos ciegos' },
    { rotulo: 'La pregunta', texto: '«¿Qué es una cosa que me ves hacer, o dejar de hacer, que me juega en contra?»', frase: 'la táctica más potente', destacada: true },
  ],
  pregunta: { frase: 'qué etiqueta vaga has recibido', texto: '¿Qué etiqueta vaga has recibido que nunca pediste aclarar?' },
});

export const relacion = pag({
  id: 'fb-relacion', titulo: 'Dos carriles', destaque: 'y un sistema',
  bajada: 'Separar el qué del quién y mirar cómo encajan las piezas.',
  inicio: 'el disparador de la relación produce',
  anclas: {
    carril: 'cambiar de carril', pedidos: 'sus pedidos llegan incompletos', responde: 'y ustedes nunca cumplen', temas: 'hay dos temas en la mesa', separar: 'separar los carriles',
    quien: 'quién te da el feedback', razon: 'aun así tenga razón', que: 'separa el qué del quién', sistema: 'mirar el sistema', piezas: 'cómo encajan las piezas', estilo: 'las diferencias de estilo',
    roles: 'segundo los roles', incentivos: 'diseñado en los incentivos', completo: 'tercero el sistema completo', ajustes: 'empiezas a buscar ajustes', corte: 'una fecha de corte',
  },
  tarjetas: [
    { rotulo: 'Dos carriles', texto: '«Hay dos temas, los dos importan: veamos primero el tuyo y después el mío.»', frase: 'separar los carriles', destacada: true },
    { rotulo: 'El qué y el quién', texto: 'Se evalúa el comentario por su contenido; la relación se conversa aparte.', frase: 'separa el qué del quién' },
    { rotulo: 'El sistema', texto: 'Estilos, roles e incentivos que chocan: se buscan ajustes, no culpables.', frase: 'mirar el sistema' },
  ],
  pregunta: { frase: 'qué conflicto recurrente', texto: '¿Qué conflicto recurrente de tu equipo es en realidad un problema del sistema?' },
});

export const identidad = pag({
  id: 'fb-identidad', titulo: 'La crítica', destaque: 'a tamaño real',
  bajada: 'Conocer tu patrón y verte como alguien que aprende.',
  inicio: 'el disparador de la identidad es el más profundo',
  anclas: {
    profundo: 'es el más profundo', difieren: 'difieren mucho en tres cosas', hora: 'a la hora ya lo olvidó', semanas: 'durante semanas', patron: 'conocer tu propio patrón',
    tamano: 'a su tamaño real', crecer: 'tienden a crecer', siempre: 'siempre hago todo mal', escribe: 'detente y escribe', menor: 'mucho menor', crecimiento: 'identidad de crecimiento',
    columbia: 'universidad de columbia', fija: 'la inteligencia es fija', coaching: 'busca dentro de ella el coaching', cumple: 'cumple expectativas', dato: 'en dato no en sentencia',
  },
  tarjetas: [
    { rotulo: 'Tu patrón', texto: 'Ánimo de base, cuánto se mueve con una crítica y cuánto tardas en recuperarte.', frase: 'difieren mucho en tres cosas' },
    { rotulo: 'Tamaño real', texto: 'Escribe qué se dijo y qué no, qué consecuencias tiene y cuáles no.', frase: 'a su tamaño real', destacada: true },
    { rotulo: 'Identidad de crecimiento', texto: 'Quien cree que la inteligencia se desarrolla atiende la respuesta correcta y corrige más errores.', frase: 'identidad de crecimiento' },
  ],
  pregunta: { frase: 'qué crítica reciente se agrandó', texto: '¿Qué crítica reciente se agrandó en tu cabeza más de lo que merecía?' },
});

export const conversar = pag({
  id: 'fb-conversar', titulo: 'Conversar', destaque: 'y actuar',
  bajada: 'Conducir la conversación y convertirla en un experimento.',
  inicio: 'recibir bien también es conducir',
  anclas: {
    conducir: 'conducir la conversación', arco: 'un arco de tres partes', abrir: 'al abrir alinéate', comienzos: 'los comienzos pesan', noventa: 'el 96', reencauzar: 'reencauzarla de inmediato',
    desarrollo: 'en el desarrollo', cerrar: 'al cerrar comprométete', limites: 'puedes poner límites', unacosa: 'una sola cosa', experimento: 'un experimento pequeño', curva: 'la curva en j',
    sistema: 'el sistema de gestión de clientes', rapido: 'más rápido que antes', ensena: 'enseña a quien te da feedback', invita: 'invita a otros',
  },
  tarjetas: [
    { rotulo: 'Los comienzos pesan', texto: 'En parejas, tres minutos iniciales duros y sin corrección terminaron mal el 96 % de las veces.', frase: 'los comienzos pesan' },
    { rotulo: 'Una cosa, un experimento', texto: 'Dos semanas probando un cambio concreto, como tres preguntas antes de cada propuesta.', frase: 'un experimento pequeño', destacada: true },
    { rotulo: 'La curva en J', texto: 'Todo cambio empeora antes de mejorar; entenderlo ayuda a no abandonar.', frase: 'la curva en j' },
  ],
  pregunta: { frase: 'qué experimento de dos semanas', texto: '¿Qué experimento de dos semanas podrías empezar el lunes?' },
});

export const equipo = pag({
  id: 'fb-equipo', titulo: 'El equipo que', destaque: 'se da feedback',
  bajada: 'Una responsabilidad compartida, no solo del jefe.',
  inicio: 'todo lo anterior escala cuando el equipo entero',
  anclas: {
    compartida: 'responsabilidad compartida', inicio: 'al inicio de cada proyecto', horas: '24 horas de anticipación', revisiones: 'revisiones periódicas', cinco: 'del uno al cinco',
    rondas: 'rondas estructuradas', coinciden: 'cuando varios coinciden', aseguradora: 'en una aseguradora', transcripciones: 'las transcripciones', culpables: 'no busca culpables',
    consultora: 'una gran consultora', preguntas: 'cuatro preguntas', ascenso: 'lista para un ascenso', normas: 'dos normas más', ahorano: 'ahora no',
  },
  tarjetas: [
    { rotulo: 'Acuerdos y revisiones', texto: 'Cómo trabajaremos, aviso con 24 horas si un plazo cae y revisiones agendadas desde el inicio.', frase: 'al inicio de cada proyecto' },
    { rotulo: 'Rondas', texto: 'Cada persona dice a cada compañero una cosa que valora y una que le serviría hacer distinto.', frase: 'rondas estructuradas', destacada: true },
    { rotulo: 'Cuatro preguntas', texto: '¿Mayor aumento? ¿Siempre en mi equipo? ¿Riesgo de bajo desempeño? ¿Lista para ascender?', frase: 'cuatro preguntas' },
  ],
  pregunta: { frase: 'qué ritual de feedback', texto: '¿Qué ritual de feedback podría instalar tu equipo este mes?' },
});

export const sintesis = pag({
  id: 'fb-sintesis', titulo: 'Dar y recibir:', destaque: 'un mismo ciclo',
  bajada: 'Un equipo que corrige el rumbo en días y no en trimestres.',
  inicio: 'dar y recibir feedback son dos caras',
  anclas: {
    caras: 'dos caras del mismo ciclo', darlo: 'para darlo', plan: 'un plan que la persona pueda repetir', fabricar: 'no fabricar el bajo rendimiento', recibirlo: 'para recibirlo',
    cuentame: 'por cuéntame más', experimento: 'un experimento pequeño', pide: 'y sobre todo pide', lider: 'cuando el líder pide feedback', seguro: 'decir la verdad es seguro',
    dias: 'en días y no en trimestres',
  },
  tarjetas: [
    { rotulo: 'Para dar', texto: 'A tiempo, con el tipo claro, encuadre abierto, hechos e impacto, escucha y un plan con seguimiento.', frase: 'para darlo' },
    { rotulo: 'Para recibir', texto: 'Nombrar el disparador, «cuéntame más», separar el qué del quién y un experimento pequeño.', frase: 'para recibirlo' },
    { rotulo: 'La pregunta', texto: '«¿Qué es una cosa que me ves hacer que me juega en contra?»', frase: 'y sobre todo pide', destacada: true },
  ],
  pregunta: { frase: 'qué es una cosa que vas a pedirle', texto: '¿Qué es una cosa que vas a pedirle a tu equipo que te diga esta semana?' },
});

export const ORDEN: PaginaFB[] = [
  portada, callar, tipos, amenaza, novatos, cuando, encuadre, red, abrir, plan, espiral,
  defensiva, estrella, arriba, reconocer, recibir, verdad, relacion, identidad, conversar, equipo, sintesis,
];

export const PAGINAS: Record<string, PaginaFB> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
