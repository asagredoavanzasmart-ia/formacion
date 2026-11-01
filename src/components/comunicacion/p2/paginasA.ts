import type { Pagina } from '../../influencia/tipos';

/* Parte 2, secciones 1 a 8: lo que se habla adentro, las cinco palancas de Hamm y la conversación organizacional. */

export const portada2: Pagina = {
  id: 'ce2-portada',
  titulo: 'La organización', destaque: 'que vende',
  bajada: 'Lo que el vendedor dice afuera nace de lo que se habla adentro.',
  inicio: 'lo que un vendedor le dice',
  frases: [
    'dentro de su empresa', 'nadie se atreve a decir', 'equipo comercial', 'mensajes confusos', 'malas noticias', 'críticas', 'conflictos',
    'reglas predecibles', 'alinean a todos', 'por qué la gente calla', 'atreverse a hablar', 'en aprendizaje', 'escuchar preguntar', 'puertas adentro',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Lo que no se dice', texto: 'Lo que más daño hace casi nunca es lo que se dice, sino lo que nadie se atreve a decir.', frase: 'nadie se atreve a decir', destacada: true },
    { rotulo: 'Cuatro fugas', texto: 'Mensajes confusos del líder, malas noticias calladas, críticas mal recibidas y conflictos tardíos.', frase: 'mensajes confusos' },
    { rotulo: 'Puertas adentro', texto: 'Escuchar, preguntar, ser claro y honesto funciona también dentro de la empresa.', frase: 'escuchar preguntar' },
  ],
  pregunta: { frase: 'qué es lo que más se calla', texto: '¿Qué es lo que más se calla hoy en tu equipo comercial?' },
};

export const hamm: Pagina = {
  id: 'ce2-hamm',
  titulo: 'Palabras que', destaque: 'alinean o dispersan',
  bajada: 'Las frases hechas del líder se convierten en órdenes vagas.',
  inicio: 'si quieres saber por qué tantas',
  frases: [
    'caen en el caos', 'john hamm', 'cientos de directores', 'en 1999', 'frases hechas', 'prioridades clave', 'el cliente es primero', 'entienden lo mismo',
    'gerentes asienten', 'parecer tontos', 'órdenes vagas', 'su propia interpretación', 'tiempo perdido', 'urgencias', 'muere gente', 'nadie muere',
    'propósitos cruzados', 'futuro mejor', 'herramienta más importante', 'maquinista', 'cinco palancas', 'la estructura', 'resultados financieros',
    'su propio trabajo', 'del tiempo', 'la cultura', 'se multiplica', 'diez personas', 'otras cuarenta',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Frases hechas', texto: '«El cliente es primero» significa algo distinto para cada uno, y nadie pide aclaración.', frase: 'frases hechas' },
    { rotulo: 'Cinco palancas', texto: 'Estructura, resultados financieros, el propio trabajo del líder, el tiempo y la cultura.', frase: 'cinco palancas', destacada: true },
    { rotulo: 'Se multiplica', texto: 'Un director claro con diez personas, y cada una con otras cuarenta, alinea a toda la organización.', frase: 'se multiplica' },
  ],
  pregunta: { frase: 'qué palabra repite', texto: '¿Qué palabra repite tu líder comercial que cada vendedor entiende de una manera distinta?' },
};

export const estructura: Pagina = {
  id: 'ce2-estructura',
  titulo: 'La estructura,', destaque: 'sin miedo',
  bajada: 'Un organigrama nuevo se anuncia con claridad, no con cautela.',
  inicio: 'la primera palanca es la estructura',
  frases: [
    'la estructura', 'organigrama', 'cargado de emoción', 'paralizar', 'carly fiorina', 'algo temible', 'dos meses', 'luchas de poder',
    'motivación se desplomó', 'contratistas', 'doce semanas', 'un trimestre completo', '150 personas', 'lunes por la mañana', 'guerra por cuota',
    'cambio la estructura', 'otro supervisor', 'nuevo organigrama', 'son las 10 45', 'para molestarse', 'habrá pizza', 'a la una', 'bomberos',
    'cinco con baldes', 'tres con baldes', 'no era política', 'mapa flexible',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Hewlett-Packard', texto: 'La cautela de Fiorina hizo temible la reorganización: se perdieron doce semanas.', frase: 'carly fiorina' },
    { rotulo: 'Lunes, 10:45', texto: 'Explicó por qué, mostró el organigrama, dio hasta el mediodía para molestarse y a la una, a trabajar.', frase: 'lunes por la mañana', destacada: true },
    { rotulo: 'Un mapa flexible', texto: 'La estructura es un mapa de responsabilidades para ganar, no una forma de desvalorizar a nadie.', frase: 'mapa flexible' },
  ],
  pregunta: { frase: 'cómo se anunció', texto: '¿Cómo se anunció el último cambio de territorios o de cartera en tu equipo, y qué rumores dejó?' },
};

export const resultados: Pagina = {
  id: 'ce2-resultados',
  titulo: 'Resultados:', destaque: 'diagnóstico, no castigo',
  bajada: 'Cómo habla el líder de los números cambia lo que hace la fuerza de ventas.',
  inicio: 'la segunda palanca son los resultados',
  frases: [
    'resultados financieros', 'un director creía', 'resultados trimestrales', 'novena semana', 'no me importa cómo', 'rellenando el canal',
    'distribuidores', 'recalcular resultados', 'diez millones', 'menos de lo que facturaba', 'john adler', '100 millones', 'más de 5000 millones',
    'diagnóstico', 'sin buscar culpables', 'control de calidad', 'la envidia', 'un golfista', 'en el aire', 'tercera palanca', 'jim',
    'todas las respuestas', 'se fueron', 'chris', 'escuchaba antes', 'pequeño grupo', 'tres trimestres',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Los números como fuera', texto: 'La presión llevó a rellenar el canal; los ingresos se estancaron y la empresa se vendió barata.', frase: 'rellenando el canal' },
    { rotulo: 'John Adler', texto: 'Trató los resultados como diagnóstico: de 100 millones a más de 5 000 millones de dólares.', frase: 'john adler', destacada: true },
    { rotulo: 'Su propio trabajo', texto: 'Jim creía tener todas las respuestas; Chris escuchaba antes de opinar y logró el cambio.', frase: 'tercera palanca' },
  ],
  pregunta: { frase: 'cómo se habla de un trimestre', texto: '¿Cómo se habla de un trimestre fallido en tu equipo: como un castigo o como un diagnóstico?' },
};

export const tiempo: Pagina = {
  id: 'ce2-tiempo',
  titulo: 'El tiempo', destaque: 'no es el enemigo',
  bajada: 'Es un dato fijo dentro del cual se elige bien.',
  inicio: 'la cuarta palanca es el tiempo',
  frases: [
    'el tiempo', 'alan', 'ir atrasado', 'el enemigo', 'bellsouth', 'supervisó cada hora', 'impecable', 'perdieron', 'relaciones cercanas',
    'no hablaron con nadie', 'cena exquisita', 'servirla fría', 'mark king', 'aniversario', 'seis meses', 'no llegaría', 'cambió la meta',
    'un solo palo', 'la mitad de los profesionales', 'un dato fijo', 'la cuenta', 'siete colaboradores', 'tres iniciativas', 'cuatro trimestres',
    '84 logros', 'el objetivo 85',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Alan y BellSouth', texto: 'Una propuesta impecable y a tiempo perdió: nadie había hablado con el cliente.', frase: 'bellsouth' },
    { rotulo: 'Mark King', texto: 'Sin poder mover la fecha, cambió la meta: un solo palo. Lo usó la mitad de los profesionales.', frase: 'mark king', destacada: true },
    { rotulo: '84 logros', texto: 'Siete personas, tres iniciativas por trimestre, cuatro trimestres. El enemigo es el objetivo 85.', frase: 'la cuenta' },
  ],
  pregunta: { frase: 'cuántas prioridades', texto: '¿Cuántas prioridades le pides hoy a cada vendedor, y cuántas de ellas importan de verdad?' },
};

export const culturaGanar: Pagina = {
  id: 'ce2-cultura',
  titulo: 'Una cultura', destaque: 'de ganar',
  bajada: 'No nace de cervezas ni taca-taca, sino de saber con números qué es ganar.',
  inicio: 'la quinta palanca es la cultura',
  frases: [
    'la cultura', 'por decreto', 'centradas en ganar', 'burbuja tecnológica', 'cervezas', 'taca taca', 'jefe de cultura', 'perdían un cliente',
    'las métricas', 'valor de sus activos', 'jeff', 'equipo deportivo', 'gran marcador', 'equipos de seis', 'qué significa ganar',
    'precio beneficio de 15', 'del 20', 'del 30', '20 millones', 'partes estratégicas', 'compromiso con el éxito', 'paseo de fin de año',
    'cada mañana', 'qué debe pasar hoy', 'confusión', 'creencia vaga', 'no he comunicado',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Por decreto, no', texto: 'Cervezas, taca-taca y un jefe de cultura no evitaron que la empresa se vendiera por sus activos.', frase: 'por decreto' },
    { rotulo: 'El marcador', texto: 'Jeff muestra ventas, gastos e ingresos a todos, y cada equipo sabe con números qué es ganar.', frase: 'gran marcador', destacada: true },
    { rotulo: 'Cada mañana', texto: '¿Qué debe pasar hoy? ¿Dónde hay confusión? ¿Qué no he comunicado con claridad?', frase: 'cada mañana' },
  ],
  pregunta: { frase: 'sabe cada persona', texto: '¿Sabe cada persona de tu equipo comercial, con números, qué significa ganar este año?' },
};

export const conversacionOrg: Pagina = {
  id: 'ce2-conversacion',
  titulo: 'Conversar,', destaque: 'no ordenar',
  bajada: 'La conversación organizacional y su primer elemento: la intimidad.',
  inicio: 'el modelo de mando y control',
  frases: [
    'mando y control', 'globalización', 'boris groysberg', 'casi 150 personas', 'más de 100 organizaciones', 'entre dos personas',
    'conversación organizacional', 'intimidad', 'interactividad', 'inclusión', 'intencionalidad', 'empresa grande', 'acortar distancias',
    'la confianza', 'athenahealth', 'información estratégica', 'escuchar', 'james rogers', 'tres horas', 'de 90 a 100', 'remuneraciones desiguales',
    'personal', 'de la a a la f', 'menos de la mitad', 'comunicación interna', 'repitió el ejercicio', 'crítica directa',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Cuatro elementos', texto: 'Intimidad, interactividad, inclusión e intencionalidad: una empresa grande que funciona como una pequeña.', frase: 'conversación organizacional', destacada: true },
    { rotulo: 'Escuchar', texto: 'Las sesiones de tres horas de James Rogers sacaron a la luz un problema que no habría llegado a él.', frase: 'james rogers' },
    { rotulo: 'De la A a la F', texto: 'Pidió que lo calificaran: menos de la mitad le puso A. En vez de molestarse, lo repitió.', frase: 'de la a a la f' },
  ],
  pregunta: { frase: 'cuándo fue la última vez', texto: '¿Cuándo fue la última vez que pediste a tu equipo que evaluara cómo te comunicas tú?' },
};

export const interactividad: Pagina = {
  id: 'ce2-interactividad',
  titulo: 'Hablar con,', destaque: 'no hablar a',
  bajada: 'Interactividad e inclusión: los empleados también crean el mensaje.',
  inicio: 'la interactividad significa',
  frases: [
    'no solo a la gente', 'cisco', 'del 80', 'tamaño real', 'randy pond', 'la cabeza con las manos', 'te estoy viendo', 'dímelo',
    'historia completa', 'john chambers', 'cumplían años', 'sin gerentes', 'la inclusión', 'crean el mensaje', 'embajadores de marca',
    'coca cola', 'nueve conductas', 'líderes de opinión', 'juniper networks', 'narradores', 'emc', 'madre o padre', 'ceder control',
    'ya se perdió', 'desde su escritorio', 'infosys', 'sin ser desagradable',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Te estoy viendo', texto: 'Randy Pond notó un gesto en la videoconferencia, pidió el desacuerdo y obtuvo la historia completa.', frase: 'randy pond' },
    { rotulo: 'Inclusión', texto: 'Embajadores de marca, líderes de opinión y narradores: los empleados crean el mensaje.', frase: 'la inclusión', destacada: true },
    { rotulo: 'Ceder control', texto: 'Ese control ya se perdió: cualquiera puede dañar o pulir la reputación desde su escritorio.', frase: 'ceder control' },
  ],
  pregunta: { frase: 'qué podrían contarle', texto: '¿Qué podrían contarle tus vendedores a un cliente sobre tu empresa que ningún folleto logra transmitir?' },
};
