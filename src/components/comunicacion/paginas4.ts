import type { Pagina } from '../influencia/tipos';

/* Parte 1, secciones 19 a 24: confianza entre culturas y los principios de la persuasión. */

export const confianza: Pagina = {
  id: 'ce1-confianza',
  titulo: 'La confianza', destaque: 'según la cultura',
  bajada: 'Cabeza o corazón, sí que no es sí y contratos que inquietan.',
  inicio: 'la tercera regla es aprender',
  frases: [
    'tercera regla', 'confianza cognitiva', 'de la cabeza', 'la afectiva', 'del corazón', 'roy chua', 'los estadounidenses separan',
    'directivos chinos', 'mercados emergentes', 'vínculo afectivo', 'comidas o tés', 'lado humano', 'tener paciencia', 'no solo un amigo',
    'cuarta regla', 'empresa danesa', 'proveedor indonesio', 'a la cara', 'por correo', 'una grosería', 'haremos lo posible', 'cuánto tardarías',
    'un silencio extra', 'inspiración profunda', 'lo intentaré', 'quinta regla', 'por escrito', 'colega de burundi', 'directivo nigeriano',
    'una pluma', 'en china un contrato', 'seis semanas', 'paso más en el baile',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Cabeza y corazón', texto: 'En muchos mercados no confiarán en ti hasta que exista un vínculo afectivo: comidas, tés y paciencia.', frase: 'tercera regla' },
    { rotulo: 'Sin sí o no', texto: 'En vez de «¿lo harás?», pregunta «¿cuánto tardarías?» y escucha los silencios.', frase: 'cuarta regla', destacada: true },
    { rotulo: 'Por escrito', texto: 'En algunas culturas, un resumen escrito o un contrato a la firma suena a desconfianza.', frase: 'quinta regla' },
  ],
  pregunta: { frase: 'en qué ciudad', texto: '¿En qué ciudad, país o sector tienes hoy clientes cuyo «sí» podría significar otra cosa?' },
};

export const cialdini: Pagina = {
  id: 'ce1-cialdini',
  titulo: 'Persuadir', destaque: 'se puede aprender',
  bajada: 'Seis principios de Cialdini: simpatía y reciprocidad.',
  inicio: 'algunos pocos nacen persuasivos',
  frases: [
    'robert cialdini', 'no es un don', 'impulsos humanos', 'se puede enseñar', 'cinco décadas', 'seis principios', 'la simpatía', 'tupperware',
    'pesaba el doble', 'la similitud y el elogio', 'compañías de seguros', 'hábito de fumar', 'un interés común', 'el elogio sincero',
    'la reciprocidad', 'veteranos con discapacidad', 'del 18', 'pequeño regalo', 'hasta el 35', 'la forma más tosca', 'dar primero', 'si prestas',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'No es un don', texto: 'Persuadir se apoya en impulsos humanos profundos y predecibles: se puede enseñar.', frase: 'robert cialdini' },
    { rotulo: 'Simpatía', texto: 'Decimos que sí a quien nos cae bien: busca lo que tienen en común y elogia con sinceridad.', frase: 'la simpatía', destacada: true },
    { rotulo: 'Reciprocidad', texto: 'Un pequeño regalo llevó las donaciones del 18 % al 35 %. Da primero lo que quieres recibir.', frase: 'la reciprocidad' },
  ],
  pregunta: { frase: 'qué podrías dar primero', texto: '¿Qué podrías dar primero a tu cliente, sin condiciones, para que quiera corresponder?' },
};

export const respaldoConsistencia: Pagina = {
  id: 'ce1-respaldo-consistencia',
  titulo: 'Respaldo social', destaque: 'y consistencia',
  bajada: 'Seguimos a nuestros pares y cumplimos lo que prometimos.',
  inicio: 'el tercer principio es el respaldo social',
  frases: [
    'respaldo social', 'en 1982', 'puerta a puerta', 'lista de vecinos', 'más larga era la lista', 'tienen que ser pares', 'nueva york',
    'billetera perdida', 'otro neoyorquino', 'de otro país', 'testimonios', 'en horizontal', 'la consistencia', 'investigadores israelíes',
    'firmaran una petición', 'dos semanas después', 'algo más de la mitad', 'el 92', 'activos públicos y voluntarios', 'el 74',
    'los estudiantes que firmaron', 'lo forzado', 'samuel butler', 'siguiente reunión', 'arrancada con presión',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Respaldo social', texto: 'Los testimonios convencen más cuando quien los da se parece a quien compra.', frase: 'respaldo social' },
    { rotulo: 'Consistencia', texto: 'Quienes firmaron una petición donaron en un 92 %; quienes no, algo más de la mitad.', frase: 'la consistencia', destacada: true },
    { rotulo: 'Compromisos', texto: 'Funcionan si son activos, públicos y voluntarios. Lo forzado no compromete.', frase: 'activos públicos y voluntarios' },
  ],
  pregunta: { frase: 'qué compromiso pequeño', texto: '¿Qué compromiso pequeño, claro y voluntario podrías pedirle hoy a tu comprador?' },
};

export const autoridadEscasez: Pagina = {
  id: 'ce1-autoridad-escasez',
  titulo: 'Autoridad', destaque: 'y escasez',
  bajada: 'Haz visible tu experiencia y di lo que se pierde, siempre con la verdad.',
  inicio: 'el quinto principio es la autoridad',
  frases: [
    'la autoridad', 'new york times', 'del 2', 'televisión nacional', 'hasta el 4', 'no supongas', 'un ictus', 'los terapeutas',
    'diplomas y certificados', 'subió un 34', 'conversación informal', 'la escasez', 'enmarcado en pérdida', 'en 1988', 'ahorrarían',
    'perderían esa suma', 'lenguaje de pérdida', 'información exclusiva', 'carne', 'más que duplicaron', 'un 600', 'solo funciona si es genuina',
    'se combinan', 'una vicepresidenta', 'nunca fueron voluntarios',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Autoridad', texto: 'Con los diplomas del equipo a la vista, el cumplimiento de los pacientes subió un 34 %.', frase: 'la autoridad' },
    { rotulo: 'Escasez', texto: 'Lo que se pierde pesa más que lo que se gana, y la información exclusiva multiplica el efecto.', frase: 'la escasez', destacada: true },
    { rotulo: 'Con ética', texto: 'Los seis principios se combinan, pero solo funcionan si son genuinos y voluntarios.', frase: 'se combinan' },
  ],
  pregunta: { frase: 'cuál de los seis', texto: '¿Cuál de los seis principios usas más, y cuál has dejado de lado?' },
};

export const terrenoComun: Pagina = {
  id: 'ce1-terreno-comun',
  titulo: 'Terreno', destaque: 'común',
  bajada: 'Muestra el beneficio que la otra parte gana con tu propuesta.',
  inicio: 'con la credibilidad en pie',
  frases: [
    'terreno común', 'muy creíble', 'pocos se suben a un tren', 'un niño', 'los dulces', 'no es engaño', 'monica ruffo', 'comida rápida',
    'combos a bajo precio', 'la casa matriz', 'los franquiciados temían', 'persuasor novato', 'ganancias de los propios', 'tennessee',
    'papas y bebidas', 'en el 80', 'un 26', 'un 100', 'un 10', 'carta del fundador', 'por unanimidad', 'ajusta tu posición', 'escucha',
    'motores', 'la rentabilidad', 'sin inversión nueva', 'lo aprobaron',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Beneficio compartido', texto: 'Nadie se sube a un tren que lo lleva a la ruina: presenta lo que gana la otra parte.', frase: 'terreno común' },
    { rotulo: 'Monica Ruffo', texto: 'Mostró a los franquiciados sus propias ganancias, con datos, y votaron por unanimidad.', frase: 'monica ruffo', destacada: true },
    { rotulo: 'Escucha antes', texto: 'Si no hay beneficio compartido, ajusta tu posición. Averigua qué le importa a quien decide.', frase: 'ajusta tu posición' },
  ],
  pregunta: { frase: 'qué beneficio concreto', texto: '¿Qué beneficio concreto ve tu cliente en tu propuesta, desde su lado de la mesa?' },
};

export const evidenciaEmocion: Pagina = {
  id: 'ce1-evidencia-emocion',
  titulo: 'Evidencia vívida', destaque: 'y emoción',
  bajada: 'Una analogía se recuerda; la esperanza mueve más que el miedo.',
  inicio: 'el tercer paso es la evidencia vívida',
  frases: [
    'evidencia vívida', 'abstractos', 'historias metáforas y analogías', 'karen fries', 'personajes animados', 'al supermercado',
    'rótulos crípticos', 'la sal', 'ese supermercado', 'un restaurante', 'te traen el menú', 'bill gates', 'medio millón',
    'conectar emocionalmente', 'ajustar tu tono', 'empresa aeronáutica', 'el mejor año', 'hacia un muro', 'con resentimiento',
    'agradecerles primero', 'robert marcell', 'pueblo minero', 'no pudimos competir', 'con esperanza', 'del neon', 'ofrecer esperanza', 'un proceso',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Evidencia vívida', texto: 'El supermercado y el restaurante de Microsoft convencieron a Bill Gates mejor que una cifra.', frase: 'evidencia vívida' },
    { rotulo: 'Conectar', texto: 'Ajusta tu tono al ánimo de tu audiencia: el sermón tras el mejor año generó resentimiento.', frase: 'conectar emocionalmente' },
    { rotulo: 'Esperanza', texto: 'Robert Marcell mostró su pueblo minero y cerró con esperanza: así nació el Neon.', frase: 'robert marcell', destacada: true },
  ],
  pregunta: { frase: 'qué historia analogía', texto: '¿Qué historia, analogía o imagen haría memorable tu próxima propuesta?' },
};
