import type { Pagina } from '../influencia/tipos';

/* «El método Lean Startup», secciones 8 a 13: lotes pequeños, cinco porqués, motores de crecimiento, aplicación, críticas y síntesis. */

export const lotes: Pagina = {
  id: 'ls-lotes',
  titulo: 'La técnica de', destaque: 'los lotes pequeños',
  bajada: 'Producir lo que se pide, cuando se pide, en tandas cortas.',
  inicio: 'la técnica de los lotes pequeños',
  frases: ['producción en serie', 'flujo continuo', 'existencias de piezas', 'una forma de despilfarro', 'técnica de tirar', 'etapa anterior', 'el pedido desencadena', 'posguerra', 'taiichi ohno', 'una consultora', 'cuarenta hojas', 'resumen de una hoja'],
  els: [],
  tarjetas: [
    { rotulo: 'Producción en serie', texto: 'Exige existencias de piezas sueltas: una forma de despilfarro.', frase: 'existencias de piezas' },
    { rotulo: 'Tirar', texto: 'Cada paso tira de la etapa anterior solo lo que necesita; el pedido desencadena la fabricación.', frase: 'técnica de tirar', destacada: true },
    { rotulo: 'Origen', texto: 'Los productores japoneses de posguerra, como Toyota, recurrieron a lotes pequeños con Ohno y Shingo.', frase: 'posguerra' },
  ],
  pregunta: { frase: 'qué gran lote', texto: '¿Qué gran lote de trabajo podrías dividir en entregas semanales a tu cliente?' },
};

export const porques: Pagina = {
  id: 'ls-porques',
  titulo: 'La técnica de', destaque: 'los cinco porqués',
  bajada: 'Preguntar «¿por qué?» hasta llegar a la raíz del problema.',
  inicio: 'la técnica de los cinco porqués',
  frases: ['causa profunda', 'hasta llegar a la raíz', 'de forma proporcional', 'lotes pequeños', 'un cliente cancela', 'no usaba el servicio', 'no supo cómo empezar', 'manual larguísimo', 'nadie lo revisó', 'nadie es responsable', 'chivo expiatorio', 'confianza mutua', 'con indulgencia', 'verdades incómodas'],
  els: [],
  tarjetas: [
    { rotulo: 'Cinco veces por qué', texto: 'Cada porqué cuestiona la causa del anterior hasta llegar a la raíz.', frase: 'hasta llegar a la raíz', destacada: true },
    { rotulo: 'Inversión proporcional', texto: 'Se invierte en cada nivel según su tamaño; así no se malgasta energía.', frase: 'de forma proporcional' },
    { rotulo: 'Con confianza', texto: 'Con todos los implicados, sin chivos expiatorios y tratando el primer error con indulgencia.', frase: 'chivo expiatorio' },
  ],
  pregunta: { frase: 'qué problema de tu empresa', texto: '¿Qué problema de tu empresa sigue volviendo y qué pasaría si le preguntaras cinco veces por qué?' },
};

export const motores: Pagina = {
  id: 'ls-motores',
  titulo: 'Los motores', destaque: 'de crecimiento',
  bajada: 'Pegajoso, viral o remunerado: un mecanismo para crecer de forma duradera.',
  inicio: 'los motores de crecimiento',
  frases: ['mecanismo', 'tres tipos', 'motor pegajoso', 'tasa de retención', 'motor viral', 'de forma inconsciente', 'motor remunerado', 'a lo largo de su vida', 'preferir uno solo', 'idoneidad', 'sin aliento'],
  els: [],
  tarjetas: [
    { rotulo: 'Pegajoso', texto: 'Atrae y retiene: los clientes nuevos superan a los que se van.', frase: 'motor pegajoso' },
    { rotulo: 'Viral', texto: 'Los clientes hacen el marketing: importa cuántos amigos trae cada uno.', frase: 'motor viral', destacada: true },
    { rotulo: 'Remunerado', texto: 'Aumenta el ingreso por cliente o reduce su coste de adquisición.', frase: 'motor remunerado' },
  ],
  pregunta: { frase: 'cuál de los tres motores', texto: '¿Cuál de los tres motores explica hoy el crecimiento de tu empresa?' },
};

export const aplicar: Pagina = {
  id: 'ls-aplicar',
  titulo: 'Cómo aplicarlo', destaque: 'en tu empresa',
  bajada: 'Hipótesis, producto mínimo, medida y decisión.',
  inicio: 'cómo aplicarlo en tu empresa',
  frases: ['secuencia de preguntas', 'la hipótesis', 'el producto mínimo', 'la medida', 'la decisión', 'capacitación en ventas', 'cursos largos', 'una sesión de una hora', 'una segunda', 'sesiones cortas', 'grabar un solo video', 'no gastar más', 'un motor a la vez'],
  els: [],
  tarjetas: [
    { rotulo: 'Cuatro preguntas', texto: 'Hipótesis, producto mínimo, medida y decisión, con señales fijadas de antemano.', frase: 'la hipótesis', destacada: true },
    { rotulo: 'Un caso', texto: 'Una empresa de capacitación en ventas ofrece una sesión de una hora y mide cuántos piden otra.', frase: 'una sesión de una hora' },
    { rotulo: 'La regla', texto: 'No gastar más de lo que se necesita para aprender lo siguiente.', frase: 'no gastar más' },
  ],
  pregunta: { frase: 'cuál de estos pasos', texto: '¿Cuál de estos pasos harías primero en tu empresa?' },
};

export const criticas: Pagina = {
  id: 'ls-criticas',
  titulo: 'Críticas', destaque: 'y límites',
  bajada: 'El método no despierta unanimidad.',
  inicio: 'críticas y límites',
  frases: ['no despiertan unanimidad', 'intensificar el trabajo', 'bienestar físico y mental', 'corto plazo', 'cambio de estrategia', 'encontrar inversores', 'aspecto humano', 'razonamiento frío', 'un ensayo tras otro', 'incompletos o rotos', 'google y facebook', 'apple', 'pequeñas empresas'],
  els: [],
  tarjetas: [
    { rotulo: 'El lean y el trabajo', texto: 'Se le reprocha intensificar el trabajo y dañar el bienestar de los trabajadores.', frase: 'intensificar el trabajo' },
    { rotulo: 'Corto plazo', texto: 'Cambiar de estrategia al menor contratiempo frena visiones largas y espanta inversores.', frase: 'corto plazo', destacada: true },
    { rotulo: 'Producto incompleto', texto: 'Llega roto al mercado, y encaja mejor en pequeñas empresas que en grandes.', frase: 'incompletos o rotos' },
  ],
  pregunta: { frase: 'qué parte del método', texto: '¿Qué parte del método adaptarías a tu empresa y cuál dejarías de lado?' },
};

export const sintesis: Pagina = {
  id: 'ls-sintesis',
  titulo: 'Aprender más rápido', destaque: 'de lo que se gasta',
  bajada: 'Lo valioso no es acertar a la primera.',
  inicio: 'en un mundo donde lanzar un producto es caro',
  frases: ['otra forma de avanzar', 'nació en toyota', 'proceso de innovación', 'acudir al terreno', 'ajustes progresivos', 'lotes pequeños', 'motores de crecimiento muestran', 'rendimiento del ciclo de feedback', 'ahorrando tiempo y dinero', 'no ha dejado de crecer', 'aprender más rápido'],
  els: [],
  tarjetas: [
    { rotulo: 'Del taller al producto', texto: 'El lean nació en Toyota para evitar el despilfarro; Ries lo trasladó a la innovación.', frase: 'nació en toyota' },
    { rotulo: 'El método', texto: 'Conocer al cliente, ensayar, ajustar, y usar lotes pequeños y cinco porqués.', frase: 'ajustes progresivos', destacada: true },
    { rotulo: 'El resultado', texto: 'Ahorrar tiempo y dinero conservando las fuerzas donde hacen falta.', frase: 'ahorrando tiempo y dinero' },
  ],
  pregunta: { frase: 'qué hipótesis de tu negocio', texto: '¿Qué hipótesis de tu negocio vas a someter esta semana a un ensayo con clientes reales?' },
};
