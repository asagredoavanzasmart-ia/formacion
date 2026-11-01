import type { Pagina } from '../influencia/tipos';

/* «Diseño y arquitectura de equipos de ventas», secciones 10 a 18: Sales Pods, tiempo de rampa, habilitación,
   práctica simulada, gerente silencioso, orquestación tecnológica, rituales ágiles, mapa de ruta y síntesis. */

export const pods: Pagina = {
  id: 'eq-pods',
  titulo: 'La nueva arquitectura:', destaque: 'Sales Pods',
  bajada: 'Una célula multifuncional que funciona como una microempresa con una sola meta de ingresos.',
  inicio: 'la nueva arquitectura',
  frases: ['en inglés sales pods', 'genera fricción en cada salto', 'microempresa autónoma', 'en una misma mesa', 'meta de ingresos unificada', 'el fin de la línea de ensamblaje', 'retiene el contexto', 'las culpas cruzadas', 'la autonomía con un objetivo compartido', 'mismo indicador consolidado', 'actúe como árbitro', 'gana todo el pod', 'se pierde para todos', 'los ai pods de globant', 'agentes de inteligencia artificial', 'por valor entregado', 'el 45 por ciento', 'diez puntos porcentuales', 'más de 140 modelos', 'bóvedas privadas', 'no es copiar a globant', 'la célula completa'],
  els: [],
  tarjetas: [
    { rotulo: 'Una misma mesa', texto: 'SDR, AE, Pre-Sales y AM (gerente de cuentas) alrededor de una meta de ingresos unificada.', frase: 'en una misma mesa', destacada: true },
    { rotulo: 'Dos cambios de fondo', texto: 'Fin de la línea de ensamblaje (el Pod retiene el contexto) y autonomía con un indicador compartido.', frase: 'el fin de la línea de ensamblaje' },
    { rotulo: 'AI Pods de Globant', texto: 'Células que orquestan agentes de IA y cobran por valor: en el 45 % de sus 20 cuentas principales, +10 puntos de margen bruto.', frase: 'los ai pods de globant' },
  ],
  pregunta: { frase: 'qué cuenta de tu cartera', texto: '¿Qué cuenta de tu cartera ganaría más si un mismo grupo la acompañara desde el primer contacto hasta la renovación?' },
};

export const ramp: Pagina = {
  id: 'eq-ramp',
  titulo: 'El tiempo de rampa y', destaque: 'el valle de la muerte',
  bajada: 'Mientras un vendedor nuevo aprende, la empresa invierte sin recibir retorno.',
  inicio: 'la crisis del tiempo de rampa',
  frases: ['mientras un vendedor nuevo aprende', 'valle de la muerte', 'la curva primero baja', 'paga su salario', 'quema cuentas', 'solo después la curva sube', 'tres datos marcan', '6 2 meses', '3 0 meses', 'brecha del 53', 'un centro de costos', 'muchas capas', 'ese colchón ya no está', 'supervivencia financiera', 'empieza a devolverse'],
  els: [],
  tarjetas: [
    { rotulo: 'El valle', texto: 'La curva baja: sueldo pagado y cuentas quemadas mientras aprende; después sube hasta la cuota.', frase: 'la curva primero baja' },
    { rotulo: 'Tres datos', texto: 'AE (ejecutivo de cuentas): 6,2 meses; SDR (desarrollo de ventas): 3,0 meses; 53 % de brecha entre el proceso y lo que se ejecuta.', frase: 'tres datos marcan' },
    { rotulo: 'En una empresa plana', texto: 'Sin mandos medios que acompañen, comprimir la rampa es supervivencia financiera.', frase: 'supervivencia financiera', destacada: true },
  ],
  pregunta: { frase: 'cuánto le cuesta a tu empresa', texto: '¿Cuánto le cuesta a tu empresa cada mes que una persona nueva tarda en ser productiva?' },
};

export const enablement: Pagina = {
  id: 'eq-enablement',
  titulo: 'Habilitación no es', destaque: 'capacitación',
  bajada: 'Un evento aislado no mueve la aguja; un sistema continuo en el trabajo diario, sí.',
  inicio: 'habilitación no es capacitación',
  frases: ['un evento aislado', 'un sistema continuo', 'la capacitación tradicional es un evento', 'el onboarding', 'manuales en pdf', 'gerente con poco tiempo', 'aprender a nadar', 'se olvida', 'sales enablement', 'contenido tecnología procesos y coaching', 'flujo diario', 'seller drag', 'métrica reina', 'según el rol', 'un sdr o un bdr', 'entre las tres y las seis semanas', 'segmento mid market', 'entre las seis y las diez semanas', 'segmento enterprise', 'entre el tercer y el cuarto mes', 'más compleja es la venta'],
  els: [],
  tarjetas: [
    { rotulo: 'Capacitación', texto: 'Un evento: aislado, teórico, en el onboarding, con manuales que se olvidan.', frase: 'la capacitación tradicional es un evento' },
    { rotulo: 'Habilitación', texto: 'Un sistema continuo: contenido, tecnología, procesos y coaching en el flujo diario; quita la fricción (seller drag).', frase: 'sales enablement', destacada: true },
    { rotulo: 'Rampa por rol', texto: 'SDR o BDR: 2–3 meses; AE Mid-Market (empresas medianas): 4–6; AE Enterprise (grandes empresas): 7–12.', frase: 'según el rol' },
  ],
  pregunta: { frase: 'capacita una vez', texto: '¿Tu empresa capacita una vez o habilita todos los días?' },
};

export const roleplay: Pagina = {
  id: 'eq-ia-roleplay',
  titulo: 'Compresión radical:', destaque: 'práctica simulada',
  bajada: 'De la teoría a la memoria muscular, contra compradores virtuales.',
  inicio: 'compresión radical mediante práctica simulada',
  frases: ['memoria muscular', 'compradores virtuales', 'dos curvas de aprendizaje', 'sube lenta', 'habilitación activa', 'el fin del shadowing', 'entre cinco y diez llamadas', 'funcionan por voz', 'entre 50 y 100 escenarios', 'simulador de vuelo', 'los resultados acompañan', 'el 49 por ciento', 'frente al 15', 'llega al 57', 'frente al 39', 'no reemplaza al cliente real', 'cientos de conversaciones'],
  els: [],
  tarjetas: [
    { rotulo: 'Fin del shadowing', texto: 'Un gerente audita 5 a 10 llamadas al mes; con simuladores de voz, el vendedor enfrenta 50 a 100 escenarios en dos semanas.', frase: 'el fin del shadowing' },
    { rotulo: 'Simulador de vuelo', texto: 'Equivocarse cien veces en tierra para no equivocarse una sola vez en el aire.', frase: 'simulador de vuelo', destacada: true },
    { rotulo: 'Logro de cuota', texto: 'Habilitación continua: 49 % frente a 15 %. Con IA en el flujo de trabajo: 57 % frente a 39 %.', frase: 'los resultados acompañan' },
  ],
  pregunta: { frase: 'cuántas veces practica hoy', texto: '¿Cuántas veces practica hoy un vendedor nuevo de tu equipo antes de hablar con su primer cliente real?' },
};

export const silencioso: Pagina = {
  id: 'eq-silent-manager',
  titulo: 'El gerente', destaque: 'silencioso',
  bajada: 'Sin supervisión directa, el conocimiento documentado asume el mando táctico.',
  inicio: 'el gerente silencioso',
  frases: ['asume el mando táctico', 'el gerente silencioso', 'como una torre', 'la primera es el perfil de cliente ideal', 'prospectos inviables', 'la segunda son los criterios de discovery', 'spin o meddpicc', 'quienes deciden y el presupuesto', 'la tercera son las reglas de workflow', 'sin ambigüedad', 'la cuarta son las battlecards', 'plazo legal de 24 horas', 'sin escalar a un jefe', 'recorre ocho preguntas', 'las tres de la tarde', 'la reunión del lunes'],
  els: [],
  tarjetas: [
    { rotulo: 'Cuatro capas', texto: 'Perfil de cliente ideal (ICP), criterios de discovery, reglas de workflow en el CRM y battlecards con procedimientos estándar (SOP).', frase: 'como una torre' },
    { rotulo: 'Resolver sin escalar', texto: 'Con plantillas y reglas aprobadas de antemano, el vendedor resuelve sin escalar a un jefe.', frase: 'sin escalar a un jefe', destacada: true },
    { rotulo: 'Un buen playbook', texto: 'Responde a las tres de la tarde la duda que antes esperaba a la reunión del lunes.', frase: 'las tres de la tarde' },
  ],
  pregunta: { frase: 'qué pregunta repite tu equipo', texto: '¿Qué pregunta repite tu equipo una y otra vez que podría quedar resuelta por escrito?' },
};

export const stack: Pagina = {
  id: 'eq-stack',
  titulo: 'Orquestación tecnológica:', destaque: 'el tejido conectivo',
  bajada: 'El CRM obliga a cumplir el proceso y da visibilidad sin microgestión.',
  inicio: 'orquestación tecnológica',
  frases: ['el tejido conectivo', 'visibilidad total', 'la única fuente de verdad', 'no existió', 'extracción y enrutamiento', 'zapier y leadiq', 'hacer clics', 'inteligencia de conversaciones', 'fireflies y gong', 'qué crm elegir', 'salesforce', 'hubspot', 'pipedrive', 'monday', 'no es la marca', 'planillas sueltas', 'la fórmula de graicunas', 'ancho de banda estratégico'],
  els: [],
  tarjetas: [
    { rotulo: 'Única fuente de verdad', texto: 'Si algo no está registrado en el CRM (sistema de gestión de clientes), para el equipo no existió.', frase: 'la única fuente de verdad', destacada: true },
    { rotulo: 'Lo que lo alimenta', texto: 'Extracción y enrutamiento (Zapier, LeadIQ) e inteligencia de conversaciones (Fireflies, Gong).', frase: 'extracción y enrutamiento' },
    { rotulo: 'Qué CRM', texto: 'Salesforce para Enterprise, HubSpot para Mid-Market, Pipedrive para pymes y Monday para equipos planos.', frase: 'qué crm elegir' },
  ],
  pregunta: { frase: 'qué información de tus clientes', texto: '¿Qué información de tus clientes vive hoy fuera de tu CRM?' },
};

export const agile: Pagina = {
  id: 'eq-agile',
  titulo: 'Rituales de', destaque: 'autogestión',
  bajada: 'Ciclos cortos y una revisión honesta reemplazan a la microgestión.',
  inicio: 'rituales de autogestión',
  frases: ['ciclos cortos', 'tres rituales', 'el sprint de ventas', 'de una a tres semanas', 'el backlog', 'sin esperar una directriz', 'el daily stand up', 'quince minutos de pie', 'qué hice qué haré', 'la retrospectiva', 'qué empieza a hacer', 'seis fases', 'la autocrítica', 'sus propios números', 'democratiza'],
  els: [],
  tarjetas: [
    { rotulo: 'Sprint de ventas', texto: 'Ciclos de una a tres semanas: el equipo elige del backlog las cuentas de mayor valor.', frase: 'el sprint de ventas' },
    { rotulo: 'Daily stand-up', texto: 'Quince minutos de pie: qué hice, qué haré y qué me bloquea.', frase: 'el daily stand up' },
    { rotulo: 'Retrospectiva', texto: 'Qué empezar, qué dejar y qué continuar: la autocrítica del equipo reemplaza la corrección del gerente.', frase: 'la retrospectiva', destacada: true },
  ],
  pregunta: { frase: 'qué dejaría de hacer tu equipo', texto: '¿Qué dejaría de hacer tu equipo si cada dos semanas se preguntara con honestidad qué no está funcionando?' },
};

export const madurez: Pagina = {
  id: 'eq-madurez',
  titulo: 'Mapa de ruta:', destaque: 'la evolución por tamaño',
  bajada: 'La arquitectura se construye por etapas; cada fase gana el derecho a la siguiente.',
  inicio: 'mapa de ruta estructural',
  frases: ['se construye por etapas', 'gana el derecho', 'la fase uno es el mvp', 'una o dos personas', 'validar el modelo', 'los primeros playbooks', 'la fase dos es la tracción', 'entre sesenta y ochenta', 'separación estricta', 'crm centralizado', 'la fase tres es la enterprise', 'células cerradas y autónomas', 'aplanamiento intencional', 'conversacional integrada', 'el orden importa', 'caos con otro nombre', 'acumula pirámide', 'no apila más personas', 'diseña ecosistemas'],
  els: [],
  tarjetas: [
    { rotulo: 'Fase 1 · MVP', texto: 'Una o dos personas en todos los roles; validar el modelo y escribir los primeros playbooks.', frase: 'la fase uno es el mvp' },
    { rotulo: 'Fase 2 · Tracción', texto: 'Más de 60 a 80 cuentas cerradas al año: SDR y AE separados, CRM centralizado.', frase: 'la fase dos es la tracción' },
    { rotulo: 'Fase 3 · Enterprise', texto: 'Sales Pods, aplanamiento intencional e IA conversacional para la habilitación continua.', frase: 'la fase tres es la enterprise', destacada: true },
  ],
  pregunta: { frase: 'en qué fase está hoy', texto: '¿En qué fase está hoy tu equipo, y qué le falta para ganar el derecho a la siguiente?' },
};

export const cierre: Pagina = {
  id: 'eq-cierre',
  titulo: 'De la pirámide a un', destaque: 'motor autogestionado',
  bajada: 'Un sistema predecible, escalable y de alto rendimiento, sostenido por método, datos y tecnología.',
  inicio: 'de la pirámide jerárquica',
  frases: ['un motor autogestionado', 'cuatro números', 'no estaba en las personas', 'pieza por pieza', 'roles especializados', 'una estructura orgánica', 'escuadrones que retienen', 'playbooks y procedimientos', 'comprime la rampa', 'rituales ágiles', 'ninguna de esas piezas', 'aplanar sin documentar', 'documentar sin tecnología', 'tecnología sin rituales', 'no es dibujar un organigrama', 'predecible escalable'],
  els: [],
  tarjetas: [
    { rotulo: 'Pieza por pieza', texto: 'Roles especializados, estructura orgánica, escuadrones, playbooks, habilitación con IA y rituales ágiles.', frase: 'pieza por pieza' },
    { rotulo: 'Ninguna funciona sola', texto: 'Aplanar sin documentar paraliza; documentar sin tecnología olvida; tecnología sin rituales produce datos que nadie mira.', frase: 'ninguna de esas piezas', destacada: true },
    { rotulo: 'La idea de conjunto', texto: 'Diseñar un equipo no es dibujar un organigrama: es construir un sistema.', frase: 'no es dibujar un organigrama' },
  ],
  pregunta: { frase: 'qué pieza de este sistema', texto: '¿Qué pieza de este sistema podrías instalar en tu equipo este mismo mes?' },
};
