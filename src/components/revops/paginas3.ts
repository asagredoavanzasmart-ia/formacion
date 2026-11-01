import type { PaginaRO } from './tipos';

/* «RevOps», lección 5: mapear el proceso de ventas. Las `frases` son anclas literales de la narración. */

export const paradoja: PaginaRO = {
  id: 'ro-5-paradoja', pagina: 25, audio: 'p25',
  titulo: 'La paradoja', destaque: 'del proceso de ventas',
  bajada: '«Demasiado proceso mata a los equipos de ventas, pero los equipos de ventas mueren sin proceso.»',
  inicio: '',
  frases: ['demasiado proceso mata', 'mueren sin proceso', 'un vendedor avanza', 'hay tres niveles', 'sin proceso las barandas se alejan', 'el punto zigzaguea', 'con barandas', 'avanza recto', 'con guion rígido', 'se cierran', 'sin proceso cada vendedor', 'dos o tres estrellas', 'no se puede medir', 'a ojo', 'cuando vende el fundador', 'barandas etapas claras', 'use su estilo', 'dave casey', 'el punto medio', 'guion rígido todos dicen', 'como autómatas', 'la capacidad de adaptarse', 'qué es un proceso de ventas', 'claramente definidos', 'hasta que renueva', 'permite métricas', 'a quién contratar', 'es el cimiento', 'jack welch', 'elimina la variación', 'todo el valor está en la variación', 'steve bookbinder', 'aburridamente parecida', 'esta es distinta'],
  els: [],
  tarjetas: [
    { rotulo: 'Tres niveles', texto: 'Sin proceso, cada uno por su camino; con barandas, rumbo claro y estilo propio; con guion rígido, sin espacio para adaptarse.', frase: 'hay tres niveles', destacada: true },
    { rotulo: 'Qué es un proceso', texto: 'Pasos y comunicaciones definidos desde que el comprador te conoce hasta que renueva: el cimiento del equipo.', frase: 'qué es un proceso de ventas' },
    { rotulo: 'Dos miradas', texto: 'Welch: en ventas el valor está en la variación. Bookbinder: «esta es distinta» suele significar que no se cierra.', frase: 'jack welch' },
  ],
  pregunta: { frase: 'qué parte de la venta está demasiado apretada', texto: 'En tu equipo, ¿qué parte de la venta está demasiado apretada y cuál no tiene barandas?' },
};

export const comprador: PaginaRO = {
  id: 'ro-5-comprador', pagina: 26, audio: 'p26',
  titulo: 'Vender es', destaque: 'ayudar a comprar',
  bajada: 'El proceso no parte de tu producto: parte del recorrido que hace el comprador.',
  inicio: '',
  frases: ['selling is about buying', 'parte del recorrido', 'tres plataformas', 'reconocimiento consideración y decisión', 'la figura con la brújula', 'una pregunta que el vendedor', 'el ejemplo es tinypulse', 'tres etiquetas', 'reconocimiento la pregunta', 'mala cultura', 'necesito otro arquitecto', 'ahí el vendedor aporta', 'consideración la pregunta', 'una fiesta de pizza', 'contratar un consultor', 'comprar software', 'decisión la pregunta', 'el más barato', 'el que integra la cultura', 'de dónde salen las etapas', 'muy distinta', 'no puede avanzar sin ayuda', 'ubicar al comprador', 'mike kunkle', 'vomitar la presentación', 'un deck de diez láminas', 'venta cocodrilo'],
  els: [],
  tarjetas: [
    { rotulo: 'Tres etapas del comprador', texto: 'Reconocimiento, consideración y decisión: en cada una, una pregunta que el vendedor debe poder responder.', frase: 'tres plataformas' },
    { rotulo: 'De dónde salen las etapas', texto: 'De los puntos donde el comprador no puede avanzar sin ayuda de un vendedor. Primero, ubicarlo.', frase: 'de dónde salen las etapas', destacada: true },
    { rotulo: 'Lo contrario', texto: 'El mismo deck de diez láminas para todos: la venta cocodrilo, boca grande y orejas chicas.', frase: 'vomitar la presentación' },
  ],
  pregunta: { frase: 'en qué punto del recorrido', texto: '¿En qué punto del recorrido tus compradores no pueden avanzar sin hablar con un vendedor?' },
};

export const filtros: PaginaRO = {
  id: 'ro-5-filtros', pagina: 27, audio: 'p27',
  titulo: 'Los cuatro filtros', destaque: 'de cada etapa',
  bajada: 'Se escriben todos los pasos de una venta y se pasan por cuatro filtros: lo que no los supera se tacha o se reescribe.',
  inicio: '',
  frases: ['cuatro filtros', 'se tacha o se reescribe', 'primero el contexto', 'como casilleros', 'merecen existir', 'veinte o treinta cosas', 'por qué se hace', 'para uno propuesta', 'voy llegando', 'está en la puerta', 'para qué sirve', 'las etapas del pipeline', 'cómo impacta', 'el pronóstico se vuelve confiable', 'con evidencia', 'una persona nueva', 'está en evaluación', 'ahora el ejercicio', 'ocho pasos candidatos', 'los cuatro filtros', 'el contador de arriba', 'requerido', 'caen dos', 'el paso 2', 'el paso 3', 'quedan seis', 'factual', 'cae el paso 4', 'quedan cinco', 'inspeccionable', 'debe verse en el crm', 'cae el paso 5', 'quedan cuatro', 'centrado en el comprador', 'cae el paso 6', 'se reescribe como', 'quedan tres', 'pasa los cuatro', 'de ocho pasos salieron tres'],
  els: [],
  tarjetas: [
    { rotulo: 'Por qué', texto: 'Cada vendedor llama «etapa» a cosas distintas. Con etapas filtradas, el pronóstico se vuelve confiable.', frase: 'por qué se hace' },
    { rotulo: 'Los cuatro filtros', texto: 'Requerido (ocurre siempre), factual (sí o no), inspeccionable (queda en el CRM) y centrado en el comprador.', frase: 'ahora el ejercicio', destacada: true },
    { rotulo: 'El resultado', texto: 'De ocho pasos candidatos salen tres etapas: menos, pero cada una significa algo.', frase: 'de ocho pasos salieron tres' },
  ],
  pregunta: { frase: 'de las etapas de tu pipeline', texto: 'De las etapas de tu pipeline, ¿cuál no pasaría alguno de estos cuatro filtros, y por qué?' },
};

export const salida: PaginaRO = {
  id: 'ro-5-salida', pagina: 28, audio: 'p28',
  titulo: 'Criterios de salida y', destaque: 'etapas después del cierre',
  bajada: 'Cada etapa combina una acción del vendedor con un resultado del comprador.',
  inicio: '',
  frases: ['combina una acción del vendedor', 'los criterios de salida son', 'hacer la demostración', 'producto evaluado', 'le corresponden una o más', 'criterios de salida de', 'asistió a la demo', 'agendó otra reunión', 'respondió el correo', 'bray y sorey', 'una llamada en frío', 'por qué importa', 'me muestras el correo', 'el pronóstico se vuelve confiable', 'el 21', 'mes a mes', 'el gráfico compara', 'termina al cerrar', 'con etapas posventa', '9 traspaso', '11 cliente en marcha', 'mike venman', 'cuántas etapas', 'muy pocas', 'demasiadas le complican', 'menos es más', 'la prueba de mark roberge', '6 9 o 12 meses', 'más del 80', 'son rentables', 'bertrand hazard', 'tienes 1002'],
  els: [],
  tarjetas: [
    { rotulo: 'Criterios de salida', texto: 'Las acciones del comprador que permiten pasar de etapa: asistió y resolvió dudas, agendó y confirmó por correo.', frase: 'criterios de salida de', destacada: true },
    { rotulo: 'Después del cierre', texto: 'Traspaso, implementación y cliente en marcha: medir si el negocio de verdad quedó funcionando.', frase: 'el gráfico compara' },
    { rotulo: 'La prueba', texto: 'A los 6, 9 o 12 meses, ¿cumpliste la promesa en más del 80 % de los clientes, y son rentables?', frase: 'la prueba de mark roberge' },
  ],
  pregunta: { frase: 'dónde termina hoy tu proceso', texto: '¿Dónde termina hoy tu proceso de ventas: en la firma o cuando el cliente ya está en marcha?' },
};

export const playbook: PaginaRO = {
  id: 'ro-5-playbook', pagina: 29, audio: 'p29',
  titulo: 'El playbook:', destaque: 'cómo se ejecuta el proceso',
  bajada: 'Todo lo que el vendedor necesita, en el momento en que lo necesita.',
  inicio: '',
  frases: ['qué etapas existen', 'la metodología tu salsa secreta', 'el playbook reúne todo', 'tiene tres partes', 'metodología adaptativa', 'venta por necesidades', 'venta por soluciones', 'venta por objetivos', 'venta por insights', 'mike kunkle', 'se adaptan según', 'ninguna metodología calza', 'las cuatro áreas', 'qué saber', 'qué hacer', 'qué decir', 'qué mostrar', 'walter pollard', 'ser perenne', 'cómo la documentas', 'clientes en fans', 'en cada etapa', 'la matriz se lee', 'con el gerente de personas', 'la rotación subió', 'encuesta semanal de clima', 'dos piezas', 'para qué sirve', 'cory bray y hilmon sorey', 'un circuito cerrado', 'una celda sin contenido'],
  els: [],
  tarjetas: [
    { rotulo: 'Metodología adaptativa', texto: 'Por necesidades, soluciones, objetivos o insights: los mejores se adaptan a de dónde viene el comprador.', frase: 'metodología adaptativa' },
    { rotulo: 'Las cuatro áreas', texto: 'Qué saber, qué hacer, qué decir y qué mostrar; web, a pedido, con video y siempre actualizado.', frase: 'las cuatro áreas' },
    { rotulo: 'La matriz', texto: 'Persona, dolor, función y contenido. Una celda vacía es una conversación que el vendedor enfrenta solo.', frase: 'la matriz se lee', destacada: true },
  ],
  pregunta: { frase: 'si un vendedor nuevo entrara mañana', texto: 'Si un vendedor nuevo entrara mañana, ¿dónde encontraría qué decirle a cada tipo de comprador?' },
};

export const estados: PaginaRO = {
  id: 'ro-5-estados', pagina: 30, audio: 'p30',
  titulo: '¿Tu proceso funciona,', destaque: 'experimenta o se agita?',
  bajada: 'Todo proceso de ventas está en uno de tres estados. Revísalo al menos cada tres meses.',
  inicio: '',
  frases: ['uno de tres estados', 'cada tres meses', 'como propone doug davidoff', 'el otro lado también decide', 'mathias thulin', 'a los clientes ganados', 'casi nunca vuelve', 'la plataforma representa', 'en armonía dos puntos', 'al experimentar', 'al agitarse', 'funciona en armonía', 'más del 80', 'no relajarse', 'dave casey', 'estado experimenta', 'escuchar a la primera línea', 'probarlo a b', 'el uno dos', 'se agita sin control', 'saltar de una', 'como corrosivo', 'bob britton', 'cuando perdiste un negocio', 'qué cambió', 'analizar los negocios perdidos'],
  els: [],
  tarjetas: [
    { rotulo: 'Funciona en armonía', texto: 'Más del 80 % cumple su cuota y los nuevos rinden rápido. No relajarse: el mercado cambia.', frase: 'funciona en armonía' },
    { rotulo: 'Experimenta', texto: 'Pruebas controladas, una a la vez: escuchar a la primera línea, preguntar a ganados y perdidos, probar A/B.', frase: 'estado experimenta', destacada: true },
    { rotulo: 'Se agita', texto: 'Saltar de una «solución» a otra es corrosivo: volver a experimentos acotados.', frase: 'se agita sin control' },
  ],
  pregunta: { frase: 'en cuál de los tres estados', texto: '¿En cuál de los tres estados está hoy tu proceso de ventas, y qué evidencia tienes para afirmarlo?' },
};
