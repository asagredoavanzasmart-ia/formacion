import type { Pagina } from '../influencia/tipos';

/* «Diseño y arquitectura de equipos de ventas», secciones 1 a 9: el edificio del equipo, la crisis, los dos
   motores, los roles, los traspasos, la línea de ensamblaje, la pirámide, el aplanamiento y Graicunas.
   Las `frases` son anclas literales del guion, en orden; cada escena las nombra en el mismo orden. */

export const intro: Pagina = {
  id: 'eq-intro',
  titulo: 'Un equipo se diseña', destaque: 'como un edificio',
  bajada: 'Estructurar, habilitar y escalar sin cuellos de botella jerárquicos.',
  inicio: 'si tu equipo de ventas trabaja cada vez más',
  frases: ['trabaja cada vez más', 'vende cada vez menos', 'cómo está armado el equipo', 'sin cuellos de botella', 'se diseña como se diseña un edificio', 'buenos vendedores', 'cómo entra el cliente', 'quién hace qué', 'cómo viaja la información', 'nadie está mirando', 'un módulo de adquisición', 'un motor de habilitación', 'un flujo de valor', 'una interfaz de crecimiento', 'tres palabras', 'aplanamiento que significa', 'habilitación que significa', 'agilidad que significa', 'primero miraremos', 'la cadena de roles', 'cómo aplanar', 'la tecnología y los rituales'],
  els: [],
  tarjetas: [
    { rotulo: 'La idea central', texto: 'No basta con contratar buenos vendedores: hay que diseñar cómo entra el cliente, quién hace qué y cómo viaja la información.', frase: 'se diseña como se diseña un edificio', destacada: true },
    { rotulo: 'Cuatro piezas', texto: 'Módulo de adquisición, motor de habilitación, flujo de valor e interfaz de crecimiento.', frase: 'un módulo de adquisición' },
    { rotulo: 'Tres palabras', texto: 'Aplanamiento (quitar capas que solo retransmiten), habilitación (rendir rápido) y agilidad (ciclos cortos con datos).', frase: 'tres palabras' },
  ],
  pregunta: { frase: 'cuántas personas tiene que atravesar', texto: '¿Cuántas personas tiene que atravesar hoy una decisión comercial en tu empresa antes de llegar al cliente?' },
};

export const diagnostico: Pagina = {
  id: 'eq-diagnostico',
  titulo: 'La crisis de la', destaque: 'ejecución comercial',
  bajada: 'Cuatro indicadores B2B (2024–2026) que muestran que el modelo tradicional dejó de funcionar.',
  inicio: 'la crisis de la ejecución comercial',
  frases: ['cuatro indicadores', 'entre 2024 y 2026', 'el tiempo de rampa', '6 2 meses', 'un máximo histórico', 'paga un sueldo', 'solo el 48 por ciento', 'más de la mitad', 'la brecha de ejecución', 'el 89 por ciento', 'solo el 36 por ciento', 'en una carpeta', 'generación z', 'no recibe retroalimentación', 'rotación temprana', 'una misma historia', 'falla sistémica', 'tramo de control', 'si cambiaras a todo el equipo', 'volverían a ser los mismos'],
  els: [],
  tarjetas: [
    { rotulo: 'Rampa y cuota', texto: 'Un AE (Account Executive, ejecutivo de cuentas) tarda 6,2 meses en llegar a su cuota; solo el 48 % la logra.', frase: 'el tiempo de rampa' },
    { rotulo: 'Brecha de ejecución', texto: 'El 89 % documenta sus procesos; solo el 36 % los aplica frente al cliente: 53 puntos de brecha.', frase: 'la brecha de ejecución' },
    { rotulo: 'No es esfuerzo', texto: 'Es una falla de diseño: tramo de control y soporte en tiempo real. El 46 % de la generación Z no recibe retroalimentación.', frase: 'falla sistémica', destacada: true },
  ],
  pregunta: { frase: 'cuál de estos cuatro indicadores', texto: '¿Cuál de estos cuatro indicadores se parece más a lo que vives en tu equipo?' },
};

export const motores: Pagina = {
  id: 'eq-inbound-outbound',
  titulo: 'Los dos motores de', destaque: 'adquisición',
  bajada: 'Cómo llega el cliente decide qué roles, herramientas y ritmo necesita el equipo.',
  inicio: 'los dos motores de adquisición',
  frases: ['cómo llega el cliente', 'qué roles qué herramientas', 'el motor inbound', 'el cliente llega solo', 'casos de éxito', 'posicionamiento en buscadores', 'el contenido de valor', 'las redes sociales', 'recursos descargables', 'mercados educados', 'muy informado', 'sepa menos que él', 'el motor outbound', 'sale al mercado abierto', 'targeted accounts', 'investigación profunda', 'por teléfono', 'ticket alto', 'perfil de cliente ideal', 'interés en frío', 'desde cero', 'combina ambos', 'define la arquitectura'],
  els: [],
  tarjetas: [
    { rotulo: 'Inbound · atracción', texto: 'El cliente llega solo por la marca: buscadores (SEO), contenido, redes, pauta y descargables. Llega muy informado.', frase: 'el motor inbound' },
    { rotulo: 'Outbound · prospección', texto: 'El equipo sale a buscar: cuentas clave, investigación y contacto directo. Despierta interés en frío.', frase: 'el motor outbound' },
    { rotulo: 'La consecuencia', texto: 'La mayoría combina ambos, y la estrategia de atracción define la arquitectura del equipo.', frase: 'combina ambos', destacada: true },
  ],
  pregunta: { frase: 'tus clientes llegan buscándote', texto: '¿Tus clientes llegan buscándote o tienes que salir a buscarlos, y tu equipo está armado para eso?' },
};

export const roles: Pagina = {
  id: 'eq-roles',
  titulo: 'El equipo completo:', destaque: 'quién es quién',
  bajada: 'Un rol no es un título: es una función del ciclo de venta.',
  inicio: 'el equipo de ventas completo',
  frases: ['función del ciclo de venta', 'tres creadores de oportunidades', 'tres orquestadores de ingresos', 'y un líder', 'el primero es el bdr', 'pib de la región', 'mapeadas y priorizadas', 'el segundo es el lead gen', 'landing pages', 'público alcanzado', 'el tercero es el sdr', 'first meetings', 'detecta al champion', 'luego viene el ae', 'da las demostraciones', 'tasa de cierre', 'está el pre sales', 'pruebas de concepto', 'aparece el am', 'retención y expansión', 'el manager monitorea', 'no apaga incendios'],
  els: [],
  tarjetas: [
    { rotulo: 'Arriba del embudo', texto: 'BDR (desarrollo de negocio) mapea cuentas; Lead Gen (generación de demanda) crea tráfico; SDR (desarrollo de ventas) consigue la primera reunión.', frase: 'el primero es el bdr' },
    { rotulo: 'Abajo del embudo', texto: 'AE (ejecutivo de cuentas) cierra; Pre-Sales (ingeniero de soluciones) valida lo técnico; AM (gerente de cuentas) retiene y expande.', frase: 'luego viene el ae' },
    { rotulo: 'El Manager', texto: 'Monitorea el pipeline, orquesta y habilita: no apaga incendios.', frase: 'el manager monitorea', destacada: true },
  ],
  pregunta: { frase: 'qué roles de esta lista', texto: '¿Qué roles de esta lista hace hoy una sola persona en tu equipo?' },
};

export const traspasos: Pagina = {
  id: 'eq-traspasos',
  titulo: 'Los traspasos', destaque: 'entre roles',
  bajada: 'Lo frágil no son los roles, sino los saltos: en cada uno debe viajar algo concreto.',
  inicio: 'los traspasos entre roles',
  frases: ['lo frágil no son los roles', 'viajar algo concreto', 'en el primero', 'priorizada y contactable', 'llama a ciegas', 'en el segundo', 'una cuenta aterrizada', 'la oportunidad se enfría', 'el tercer traspaso', 'una prueba de concepto', 'todo vuelve al ae', 'demostraciones genéricas', 'en el cuarto', 'el contrato firmado', 'nadie sabe qué se le prometió', 'el quinto traspaso', 'las señales de expansión', 'nunca llega'],
  els: [],
  tarjetas: [
    { rotulo: 'BDR y Lead Gen → SDR', texto: 'Una cuenta priorizada y contactable. SDR: Sales Development Representative, representante de desarrollo de ventas.', frase: 'en el primero' },
    { rotulo: 'SDR → AE ↔ Pre-Sales', texto: 'Reunión agendada, Champion y próximos pasos; luego la prueba de concepto que responde a la necesidad real.', frase: 'en el segundo' },
    { rotulo: 'AE ↔ AM', texto: 'El cliente cerrado con lo prometido por escrito; de vuelta, las señales de expansión. AM: Account Manager, gerente de cuentas.', frase: 'en el cuarto', destacada: true },
  ],
  pregunta: { frase: 'en cuál de estos cinco saltos', texto: '¿En cuál de estos cinco saltos se pierde hoy más información en tu equipo?' },
};

export const pipeline: Pagina = {
  id: 'eq-pipeline',
  titulo: 'El espectro de roles:', destaque: 'la línea de ensamblaje',
  bajada: 'La cuenta avanza de plataforma en plataforma; cada una es una etapa del ciclo.',
  inicio: 'el espectro de roles',
  frases: ['línea de ensamblaje', 'de plataforma en plataforma', 'la primera es la concientización', 'mapea el territorio', 'atención masiva', 'empieza a conocerte', 'la segunda es la activación', 'conversación real', 'la tercera es la adquisición', 'orquesta la venta', 'el apoyo técnico', 'la cuarta es la retención', 'ventas cruzadas', 'sobre toda la línea', 'orquestar el flujo completo', 'dónde se acumulan', 'mover recursos', 'jefe de planta', 'de máquina en máquina', 'claridad y especialización', 'oportunidad de fricción'],
  els: [],
  tarjetas: [
    { rotulo: 'Cuatro plataformas', texto: 'Concientización (Lead Gen y BDR), activación (SDR), adquisición (AE y Pre-Sales) y retención (AM).', frase: 'la primera es la concientización' },
    { rotulo: 'El Manager', texto: 'Mira dónde se acumulan, frenan o pierden las cuentas y mueve recursos: jefe de planta, no operario.', frase: 'sobre toda la línea', destacada: true },
    { rotulo: 'El costo', texto: 'Claridad y especialización, pero cada salto entre plataformas es una oportunidad de fricción.', frase: 'claridad y especialización' },
  ],
  pregunta: { frase: 'en qué etapa de esta línea', texto: '¿En qué etapa de esta línea se acumulan hoy las cuentas de tu empresa?' },
};

export const piramide: Pagina = {
  id: 'eq-piramide',
  titulo: 'El cuello de botella:', destaque: 'la pirámide rota',
  bajada: 'Tres niveles que alejan la estrategia de donde ocurre el trabajo real.',
  inicio: 'el cuello de botella estructural',
  frases: ['pirámide de tres niveles', 'el nivel estratégico', 'se distorsionan', 'el nivel operativo', 'hacen y no preguntan', 'el nivel táctico', 'apagando incendios', 'traduciendo cuotas', 'overhead', 'teléfono descompuesto', 'llega deformado', 'tarde y filtrado', 'frena los ciclos', 'frente al cliente', 'más alta es la pirámide'],
  els: [],
  tarjetas: [
    { rotulo: 'Arriba y abajo', texto: 'Directores que piensan a largo plazo; SDR y AE que ejecutan aislados del contexto.', frase: 'el nivel estratégico' },
    { rotulo: 'El medio se rompe', texto: 'Mandos medios apagando incendios, traduciendo cuotas y con alto costo de estructura (overhead).', frase: 'el nivel táctico', destacada: true },
    { rotulo: 'Teléfono descompuesto', texto: 'Lo que baja llega deformado; lo que sube del cliente llega tarde y filtrado.', frase: 'teléfono descompuesto' },
  ],
  pregunta: { frase: 'cuántos días tarda', texto: '¿Cuántos días tarda en llegar a la dirección de tu empresa algo que un cliente le dijo hoy a un vendedor?' },
};

export const aplanar: Pagina = {
  id: 'eq-delayering',
  titulo: 'El aplanamiento:', destaque: 'de engranaje a red',
  bajada: 'Quitar capas acelera, pero solo si algo asume la coordinación que hacían.',
  inicio: 'la transición estructural',
  frases: ['quitar capas intermedias', 'asume la coordinación', 'comparar dos modelos', 'el modelo mecánico', 'de arriba hacia abajo', 'niveles de aprobación', 'autoridad del título', 'como un engranaje', 'el modelo orgánico', 'inmediata frente al cliente', 'a los márgenes', 'el empoderamiento', 'como una red', 'de un día para otro', 'peligro estructural', 'parálisis operativa', 'agotamiento en la dirección', 'síndrome del superviviente', 'no desaparece', 'deja de hacerse'],
  els: [],
  tarjetas: [
    { rotulo: 'Modelo mecánico', texto: 'Información lenta de arriba hacia abajo, muchos niveles de aprobación y autoridad del título.', frase: 'el modelo mecánico' },
    { rotulo: 'Modelo orgánico', texto: 'Retroalimentación inmediata, autoridad en los márgenes y sistemas autónomos: una red.', frase: 'el modelo orgánico' },
    { rotulo: 'El peligro', texto: 'Quitar la capa media sin autogestión, agilidad ni tecnología trae parálisis, agotamiento y síndrome del superviviente.', frase: 'peligro estructural', destacada: true },
  ],
  pregunta: { frase: 'qué tendría que existir', texto: '¿Qué tendría que existir en tu empresa antes de quitar una sola capa de jefatura?' },
};

export const graicunas: Pagina = {
  id: 'eq-graicunas',
  titulo: 'La matemática del caos:', destaque: 'Graicunas',
  bajada: 'Agregar una persona no suma una tarea: multiplica las relaciones que el líder coordina.',
  inicio: 'la matemática del caos',
  frases: ['multiplica las relaciones', 'graicunas lo expresó', 'número de reportes directos', 'tres tipos de relaciones', 'las simples', 'las grupales', 'las cruzadas', 'caos estructural', 'con tres reportes directos', 'con cinco 100', 'con diez', 'más de cincuenta', 'entre seis y ocho', 'la trampa del aplanamiento', 'quince o veinte', 'imposible de sostener'],
  els: [],
  tarjetas: [
    { rotulo: 'La fórmula', texto: 'R = n × (2ⁿ⁻¹ + n − 1): relaciones totales según los reportes directos n.', frase: 'graicunas lo expresó' },
    { rotulo: 'Los números', texto: 'Con 3 reportes, 18 relaciones; con 5, 100; con 10, 5.210. El límite humano está entre seis y ocho.', frase: 'con tres reportes directos', destacada: true },
    { rotulo: 'La trampa', texto: 'Quitar mandos medios y pasar sus equipos a un líder lo lleva de 5 a 15 o 20 reportes.', frase: 'la trampa del aplanamiento' },
  ],
  pregunta: { frase: 'cuántas personas reportan hoy', texto: '¿Cuántas personas reportan hoy directamente a quien lidera tu equipo, y cuántas relaciones está intentando sostener sin saberlo?' },
};
