import type { Pagina } from '../influencia/tipos';

/* Comunicación efectiva · Parte 1, páginas 7 a 12. Frases literales del guion. */

export const autenticidad: Pagina = {
  id: 'ce1-autenticidad',
  titulo: 'Hablar con', destaque: 'autenticidad',
  bajada: 'El público lee dos conversaciones a la vez, y le cree al cuerpo.',
  inicio: 'una presentación puede tener buena historia',
  frases: [
    'sonar falsa', 'nick morgan', 'describe a carol', 'una anécdota', 'gráficos de crecimiento', 'con gestos', 'una meta exigente',
    'la sala no se enciende', 'dos conversaciones', 'lo que expresa tu cuerpo', 'le cree siempre al cuerpo', 'empieza primero',
    'piensa en un abrazo', 'improvisar sin preparación', 'ensayar gestos uno por uno', 'un instante después', 'algo no cuadra',
    'más escépticos que nunca',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'La segunda conversación', texto: 'Lo que dices y lo que expresa tu cuerpo. Si no coinciden, el público le cree al cuerpo.', frase: 'dos conversaciones', destacada: true },
    { rotulo: 'El gesto llega primero', texto: 'El impulso se ve en el cuerpo antes de convertirse en palabras, como un abrazo.', frase: 'empieza primero' },
    { rotulo: 'Ni improvisar ni ensayar gestos', texto: 'Improvisando pareces aprender sobre la marcha; el gesto ensayado llega tarde y algo no cuadra.', frase: 'improvisar sin preparación' },
  ],
  pregunta: { frase: 'alguna vez presentaste', texto: '¿Alguna vez presentaste algo perfectamente ensayado y sentiste que no conectaba?' },
};

export const intenciones: Pagina = {
  id: 'ce1-intenciones',
  titulo: 'Cuatro', destaque: 'intenciones',
  bajada: 'Se ensaya lo que sientes, no los gestos: el cuerpo llega solo.',
  inicio: 'si ensayar gestos falla',
  frases: [
    'ensayar intenciones', 'abrirte significa', 'como tu pareja', 'a la defensiva', 'conectar significa', 'no te hace caso',
    'esperaba hasta el final', 'reconociendo a quienes', 'apasionarte significa', 'qué está en juego', 'claro pero aburrido',
    'su madre bailarina', 'de 92 años', 'se volvió memorable', 'escuchar significa', 'leer sus gestos', 'compartían su urgencia', 'llega solo',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Abrirte y conectar', texto: 'Presenta como ante alguien con quien estás relajado; capta la atención como con un niño distraído.', frase: 'abrirte significa' },
    { rotulo: 'Apasionarte', texto: 'Pregúntate qué está en juego. La madre bailarina de 92 años volvió memorable una charla aburrida.', frase: 'apasionarte significa' },
    { rotulo: 'Escuchar', texto: 'Imagina qué sentirá tu público y lee sus gestos. Carol creía que todos sentían su urgencia.', frase: 'escuchar significa', destacada: true },
  ],
  pregunta: { frase: 'qué sientes tú', texto: '¿Qué sientes tú, de verdad, por lo que vendes?' },
};

export const cuidado: Pagina = {
  id: 'ce1-cuidado',
  titulo: 'Abrirse', destaque: 'con cuidado',
  bajada: 'Ser auténtico no significa contarlo todo.',
  inicio: 'ser auténtico no significa contarlo todo',
  frases: [
    'contarlo todo', 'salir mal', 'mitch', 'romper el hielo', 'lo habían rechazado', 'una mirada fría', 'pedir lástima', 'cinco pasos',
    'conocerte', 'relevante para la tarea', 'mantenerlo genuino', 'allan', 'dejando la empresa', 'entender el contexto', 'como china o japón',
    'postergar lo muy íntimo', 'no las crean', 'mitch aprendió', 'un intercambio universitario', 'cerró el trato',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Puede salir mal', texto: 'Mitch contó a la decana que lo habían rechazado en su facultad: mirada fría y reunión sin acuerdo.', frase: 'mitch' },
    { rotulo: 'Cinco pasos', texto: 'Conócete, que sea relevante, que sea genuino, entiende el contexto y posterga lo muy íntimo.', frase: 'cinco pasos', destacada: true },
    { rotulo: 'Una historia que encaja', texto: 'Su intercambio universitario respondía a la duda de su posible socia, y cerró el trato.', frase: 'mitch aprendió' },
  ],
  pregunta: { frase: 'qué historia tuya', texto: '¿Qué historia tuya ayudaría a un cliente a confiar en ti, y cuál es mejor guardar?' },
};

export const preguntar: Pagina = {
  id: 'ce1-preguntar',
  titulo: 'Preguntar', destaque: 'rinde más',
  bajada: 'Quien pregunta aprende más y cae mejor, aunque casi nadie lo intuye.',
  inicio: 'muchos vendedores creen que su trabajo es hablar bien',
  frases: [
    'hablar bien', 'alison wood brooks', 'preguntar rinde más', 'no pregunta lo suficiente', 'ojalá me hubiera preguntado más', 'aprender y caer bien',
    'miles de conversaciones', 'al menos nueve', 'no más de cuatro', 'cayeron mejor', 'adivinaban mejor', 'una persona más de veinte',
    'recuerda cuántas preguntas', 'no intuye', 'se sienta escuchado', 'el mejor argumento',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Aprender y caer bien', texto: 'Brooks y John, de Harvard: preguntar logra las dos cosas a la vez.', frase: 'aprender y caer bien' },
    { rotulo: '9 frente a 4', texto: 'Quienes hicieron al menos nueve preguntas en quince minutos cayeron mejor y aprendieron más.', frase: 'al menos nueve', destacada: true },
    { rotulo: 'Una más, una cita más', texto: 'Una pregunta más por cita convenció a una persona más, de veinte, de volver a salir.', frase: 'una persona más de veinte' },
  ],
  pregunta: { frase: 'si hoy contaras', texto: 'Si hoy contaras tus preguntas en una reunión con un cliente, ¿cuántas serían?' },
};

export const tiposPregunta: Pagina = {
  id: 'ce1-tipos-pregunta',
  titulo: 'Cómo', destaque: 'preguntar',
  bajada: 'El tipo, la apertura, el orden y el tono cambian lo que el otro responde.',
  inicio: 'no todas las preguntas valen lo mismo',
  frases: [
    'cuatro tipos', 'las de introducción', 'las espejo', 'las de cambio total', 'las de seguimiento', 'se siente respetado', 'salen solas',
    'abrir y cuándo cerrar', 'efecto interrogatorio', 'cerca del 60', 'cerca del 5', 'negociación tensa', 'supuestos pesimistas',
    'el equipo está en buen estado', 'el orden', 'empezar por lo difícil', 'de lo superficial a lo profundo', 'el tono', 'casi el doble',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'La de seguimiento', texto: 'Pide más sobre lo que el otro acaba de decir: muestra que escuchas y no exige preparación.', frase: 'las de seguimiento', destacada: true },
    { rotulo: 'Abrir o cerrar', texto: 'Las abiertas descubren lo inesperado; con gente reservada, cerradas y con supuestos pesimistas.', frase: 'abrir y cuándo cerrar' },
    { rotulo: 'Orden y tono', texto: 'Lo difícil primero si es tenso; de lo superficial a lo profundo para crear relación. Informal: casi el doble.', frase: 'el orden' },
  ],
  pregunta: { frase: 'qué pregunta de seguimiento', texto: '¿Qué pregunta de seguimiento le harías al próximo comentario de tu cliente?' },
};

export const ventasPreguntas: Pagina = {
  id: 'ce1-ventas-preguntas',
  titulo: 'Preguntar', destaque: 'en ventas',
  bajada: 'Lo que muestran más de 500 000 conversaciones comerciales.',
  inicio: 'pocos lugares exigen preguntar tanto',
  frases: [
    '500 000 conversaciones', 'preguntan distinto', 'tasa de conversión', 'la siguiente reunión', 'cerrar la venta', 'rendimientos decrecientes',
    'pasadas unas 14 preguntas', 'de 11 a 14', 'a lo largo de la llamada', 'en la primera mitad', 'una lista de pendientes',
    'escuchan más y hablan menos', 'también te preguntará', 'negarte a contestar', 'cerca del 90', 'esquiva con elocuencia', 'no se nota que esquivó',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'De 11 a 14', texto: 'Más preguntas, más conversión, hasta unas 14: ahí empieza a caer.', frase: 'de 11 a 14', destacada: true },
    { rotulo: 'Repartidas, no amontonadas', texto: 'Los mejores preguntan a lo largo de la llamada y escuchan más de lo que hablan.', frase: 'a lo largo de la llamada' },
    { rotulo: 'Cuando el cliente pregunta', texto: 'Cerca del 90 % prefirió a quien respondió con franqueza; esquivar funciona solo si no se nota.', frase: 'negarte a contestar' },
  ],
  pregunta: { frase: 'cómo repartirías', texto: '¿Cómo repartirías tus preguntas para que la llamada se sienta como una conversación y no como una lista?' },
};
