import { pag } from './paginas1';

/* «Ventas complejas», secciones 14 a 25 del guion. Oferta (video de captación B2B), modos de respuesta
   (Miller y Heiman) y proceso comercial (capítulo B2B de Michael Pearce). */

export const icpTool = pag({
  id: 'vc-icp-tool', titulo: 'Herramienta', destaque: 'ICP',
  bajada: 'Segmentos, dolor, buyer personas y priorización ICE.',
  inicio: 'con esos criterios se construye',
  anclas: {
    constructor: 'un constructor estratégico', cuenta: 'el perfil de la cuenta', dolor: 'el análisis de dolor', nicho: 'el nicho crítico', diez: 'diez veces más efectiva',
    personas: 'los buyer personas', miedos: 'sus miedos o barreras', ice: 'el modelo ice', impacto: 'impacto el valor total', confianza: 'confianza la seguridad',
    facilidad: 'y facilidad', puntos: 'el segmento con más puntos', priorizar: 'obliga a priorizar',
  },
  tarjetas: [
    { rotulo: 'Perfil y dolor', texto: 'Segmento, industria, tamaño, geografía, problema central y nicho crítico.', frase: 'el perfil de la cuenta' },
    { rotulo: 'Buyer personas', texto: 'Para cada rol: cargo, objetivos y miedos o barreras.', frase: 'los buyer personas' },
    { rotulo: 'Modelo ICE', texto: 'Impacto, confianza y facilidad: el segmento con más puntos va primero.', frase: 'el modelo ice', destacada: true },
  ],
  pregunta: { frase: 'qué segmento ganaría', texto: '¿Qué segmento ganaría hoy en tu propio ranking de impacto, confianza y facilidad?' },
});

export const oferta = pag({
  id: 'vc-oferta', titulo: 'La oferta', destaque: 'irresistible',
  bajada: 'El precio casi nunca es la objeción: el problema es el valor percibido.',
  inicio: 'con el cliente claro llega el turno',
  anclas: {
    socio: 'hablar con mi socio', pensar: 'me lo tengo que pensar', posicionamiento: 'oferta y de posicionamiento', precio: 'no te compre por precio',
    ramas: 'las objeciones son las ramas', tronco: 'el tronco es el valor percibido', ti: 'no confío en ti', mi: 'no confío en mí', sistema: 'no confío en el sistema',
    caen: 'se caen solas', antes: 'incluso antes de la reunión', ferrari: 'el caso del ferrari', millon: 'un millón de euros', cien: 'por cien mil',
    horas: 'veinticuatro horas', error: 'parezca un error',
  },
  tarjetas: [
    { rotulo: 'Ramas y tronco', texto: 'Las objeciones son ramas; el tronco es el valor percibido.', frase: 'las objeciones son las ramas', destacada: true },
    { rotulo: 'Tres desconfianzas', texto: 'No confío en ti, no confío en mí y no confío en el sistema.', frase: 'no confío en ti' },
    { rotulo: 'El caso del Ferrari', texto: 'Un auto de un millón de euros por cien mil, con 24 horas: nadie lo piensa.', frase: 'el caso del ferrari' },
  ],
  pregunta: { frase: 'qué objeción escuchas', texto: '¿Qué objeción escuchas más seguido, y de cuál de las tres desconfianzas nace?' },
});

export const constructorOferta = pag({
  id: 'vc-constructor-oferta', titulo: 'Construir la oferta:', destaque: 'tres palancas',
  bajada: 'Un resultado inevitable, rápido y fácil.',
  inicio: 'para construir una oferta así',
  anclas: {
    palancas: 'tres palancas', inevitable: 'hacer el resultado inevitable', resultado: 'compra un resultado', fallar: 'podría fallar', tiempo: 'no tengo tiempo',
    formato: 'el formato que corresponda', porti: 'lo hacemos por ti', contigo: 'lo hacemos contigo', tu: 'lo haces tú', rapido: 'hacer el resultado rápido',
    difuso: 'un horizonte difuso', semana: 'la primera semana', treinta: 'a los treinta días', cuarto: 'al cuarto mes', facil: 'hacer el proceso fácil',
    ensenio: 'yo te enseño', monto: 'yo te lo monto', desarma: 'desarma una objeción', alto: 'un precio alto',
  },
  tarjetas: [
    { rotulo: '1. Inevitable', texto: 'Una solución para cada punto de fallo: lo hacemos por ti, contigo o lo haces tú.', frase: 'hacer el resultado inevitable', destacada: true },
    { rotulo: '2. Rápido', texto: 'Logros la primera semana y un plan semana a semana hasta el cuarto mes.', frase: 'hacer el resultado rápido' },
    { rotulo: '3. Fácil', texto: 'Dos ofertas: «yo te enseño» y «yo te lo monto».', frase: 'hacer el proceso fácil' },
  ],
  pregunta: { frase: 'cuál de las tres palancas', texto: '¿Cuál de las tres palancas le falta hoy a tu oferta?' },
});

export const banderas = pag({
  id: 'vc-banderas', titulo: 'Banderas', destaque: 'rojas',
  bajada: 'Un sistema de alerta temprana con una acción para cada señal.',
  inicio: 'las banderas rojas son tu sistema',
  anclas: {
    falta: 'la falta de información', incertidumbre: 'la incertidumbre de información', influencia: 'una influencia no contactada', cara: 'una cara nueva',
    bloquea: 'te bloquea el acceso', equilibrio: 'está en equilibrio', exceso: 'hay exceso de confianza', ganancia: 'la ganancia personal', dudosa: 'información dudosa',
  },
  tarjetas: [
    { rotulo: 'Información', texto: 'Falta o incertidumbre: preguntar, buscar coaching, verificar y triangular.', frase: 'la falta de información' },
    { rotulo: 'Personas', texto: 'Influencias sin contactar, caras nuevas y bloqueos al comprador económico.', frase: 'una influencia no contactada', destacada: true },
    { rotulo: 'Disposición', texto: 'Equilibrio, exceso de confianza, ganancia desconocida o coach dudoso.', frase: 'está en equilibrio' },
  ],
  pregunta: { frase: 'cuántas de estas banderas', texto: '¿Cuántas de estas banderas están flameando hoy en tu oportunidad más grande?' },
});

export const superar = pag({
  id: 'vc-superar', titulo: 'Superar los', destaque: 'problemas principales',
  bajada: 'Identificación, bloqueo y abordaje.',
  inicio: 'superar los problemas principales',
  anclas: {
    frentes: 'tres frentes', identificacion: 'la identificación', investigar: 'investigar con tus contactos', coach: 'apoyarte en el coach', bloqueo: 'el bloqueo cuando',
    ayudale: 'primero ayúdale', paralelo: 'la venta en paralelo', rodear: 'rodear el bloqueo', venganza: 'la venganza del comprador', abordaje: 'el abordaje',
    demostraciones: 'no quiere demostraciones', razon: 'una razón de negocio', exito: 'casos de éxito',
  },
  tarjetas: [
    { rotulo: 'Identificación', texto: 'A más monto e impacto, más arriba; investigar y apoyarse en el coach.', frase: 'la identificación' },
    { rotulo: 'Bloqueo', texto: 'Ayudar al bloqueador, vender en paralelo o, en último caso, rodearlo.', frase: 'el bloqueo cuando', destacada: true },
    { rotulo: 'Abordaje', texto: 'Una razón de negocio: visión, datos de futuro y casos de éxito.', frase: 'el abordaje' },
  ],
  pregunta: { frase: 'cuál es tu razón de negocio', texto: '¿Cuál es tu razón de negocio para pedirle una reunión al comprador económico?' },
});

export const receptividad = pag({
  id: 'vc-receptividad', titulo: 'Nivel de', destaque: 'receptividad',
  bajada: 'Antes de vender, diagnostica cómo vive cada comprador el cambio.',
  inicio: 'los modos de respuesta parten',
  anclas: {
    diagnostica: 'diagnostica cómo se siente', miller: 'robert miller', oculto: 'el factor oculto', cambie: 'le pides que cambie', ayuda: 'como una ayuda',
    amenaza: 'como una amenaza', trampas: 'tres trampas fatales', propia: 'tu propia percepción', comparte: 'comparte tu percepción', equivocada: 'está equivocada',
    realidad: 'la realidad es que', momentos: 'sino momentos', cuatro: 'los cuatro modos',
  },
  tarjetas: [
    { rotulo: 'Factor oculto: el cambio', texto: 'Tú ves una ayuda; el comprador puede ver una amenaza.', frase: 'el factor oculto', destacada: true },
    { rotulo: 'Las trampas fatales', texto: 'Creer que tu percepción manda, que la comparte o que la suya está equivocada.', frase: 'tres trampas fatales' },
    { rotulo: 'La realidad', texto: 'Cómo percibe su situación inmediata define el modo: crecimiento, problemas, equilibrio o exceso de confianza.', frase: 'la realidad es que' },
  ],
  pregunta: { frase: 'cómo crees que se siente', texto: '¿Cómo crees que se siente frente al cambio la persona que más pesa en tu próxima decisión?' },
});

export const modos = pag({
  id: 'vc-modos', titulo: 'Modos de', destaque: 'respuesta',
  bajada: 'Se compra cuando se percibe una brecha entre la realidad y los resultados deseados.',
  inicio: 'los modos de respuesta descansan',
  anclas: {
    regla: 'una regla', brecha: 'una brecha entre', barco: 'con un barco', crecimiento: 'en crecimiento', rapido: 'quiere ir más rápido', alta: 'la probabilidad de cierre es alta',
    problemas: 'en problemas', rocas: 'encalló en las rocas', sacame: 'sácame de aquí', precedencia: 'pasa antes que el crecimiento', granero: 'un granero',
    equilibrio: 'en equilibrio', quieto: 'el barco está quieto', bote: 'no muevas el bote', salidas: 'tres salidas', exceso: 'en exceso de confianza',
    regata: 'gana la regata', espera: 'la espera atenta',
  },
  tarjetas: [
    { rotulo: 'Crecimiento y problemas', texto: 'Hay brecha: quiere más y mejor, o salir de una crisis. Alta probabilidad de cierre.', frase: 'en crecimiento', destacada: true },
    { rotulo: 'Equilibrio', texto: 'Sin brecha: «no muevas el bote». Salida: crecimiento o problema a la vista, presión de otro rol o una brecha que no ve.', frase: 'en equilibrio' },
    { rotulo: 'Exceso de confianza', texto: 'Cree que gana la regata: probabilidad casi cero. Espera atenta.', frase: 'en exceso de confianza' },
  ],
  pregunta: { frase: 'en qué modo está hoy', texto: '¿En qué modo está hoy cada persona de tu próxima venta?' },
});

export const ciclo = pag({
  id: 'vc-ciclo', titulo: 'Ciclo', destaque: 'normal',
  bajada: 'El tiempo real que toma transformar a un desconocido en cliente recurrente.',
  inicio: 'el proceso comercial empieza por medir',
  anclas: {
    ciclo: 'el ciclo normal de ventas', formula: 'la fórmula clave', meses: 'entre tres y nueve meses', seis: 'los seis meses', semanas: 'entre diez y veinte semanas',
    fases: 'cinco fases', recopilacion: 'recopilación', medicion: 'medición', depuracion: 'depuración', resultado: 'resultado sumar', aplicacion: 'y aplicación',
    pearce: 'michael pearce', informacion: 'qué información es relevante', contactar: 'cuántas veces hay que contactar',
  },
  tarjetas: [
    { rotulo: 'Fórmula clave', texto: 'Tiempo total dividido por el número de ventas reales.', frase: 'la fórmula clave', destacada: true },
    { rotulo: 'Auditoría en cinco fases', texto: 'Recopilar, medir, depurar anomalías, promediar y aplicar.', frase: 'cinco fases' },
    { rotulo: 'Dos preguntas de Pearce', texto: 'Qué información importa en cada etapa y cuántos contactos toma convertir a un prospecto.', frase: 'michael pearce' },
  ],
  pregunta: { frase: 'cuánto dura de verdad', texto: '¿Cuánto dura de verdad tu ciclo normal, según los datos y no según tu memoria?' },
});

export const flujos = pag({
  id: 'vc-flujos', titulo: 'Creador de', destaque: 'flujos',
  bajada: 'Cada lead, según su fuente, con su recorrido y su responsable.',
  inicio: 'con el ciclo medido corresponde',
  anclas: {
    lead: 'empieza con un lead', calificarlo: 'identificarlo calificarlo', canales: 'muchos canales', web: 'el sitio web', frio: 'la llamada en frío',
    social: 'la venta social', boca: 'el boca a boca', feria: 'una feria', lista: 'una lista comprada', anuncios: 'los anuncios en buscadores', whatsapp: 'por whatsapp',
    politica: 'una política clara', recorrido: 'qué recorrido sigue', responsable: 'responsable de registrarlo', pierden: 'se pierden o se olvidan',
    camino: 'el camino completo', crm: 'destino final en el crm',
  },
  tarjetas: [
    { rotulo: 'Todo empieza con un lead', texto: 'Identificarlo, calificarlo y solo entonces convertirlo (Pearce).', frase: 'empieza con un lead' },
    { rotulo: 'Muchas fuentes', texto: 'Web, llamada en frío, venta social, contactos, recomendación, ferias, listas, anuncios y WhatsApp.', frase: 'muchos canales' },
    { rotulo: 'Una política clara', texto: 'Recorrido según la fuente y un responsable de registrarlo, o los leads se pierden.', frase: 'una política clara', destacada: true },
  ],
  pregunta: { frase: 'sabes qué recorrido sigue hoy', texto: '¿Sabes qué recorrido sigue hoy un lead que llega por tu sitio web, y quién responde por él?' },
});

export const crm = pag({
  id: 'vc-crm', titulo: 'Pipeline', destaque: 'CRM',
  bajada: 'Cada oportunidad por etapas, con todas las personas que deciden.',
  inicio: 'ese destino es el pipeline',
  anclas: {
    etapas: 'por etapas', prospeccion: 'la prospección', investigacion: 'la investigación', calificacion: 'la calificación', descubrimiento: 'el descubrimiento',
    mapeo: 'el mapeo de influencias', propuesta: 'la propuesta adaptada', negociacion: 'la negociación', cierre: 'y el cierre', categoria: 'su categoría de negocio',
    unico: 'no existe un cliente único', cadena: 'una cadena ordenada', vetar: 'casi cualquiera puede vetar', reunen: 'quienes reúnen información',
    recomiendan: 'quienes presentan recomendaciones', influyen: 'quienes influyen', participan: 'quienes participan', ultima: 'quien tiene la última palabra',
    andino: 'grupo andino', interaccion: 'cada interacción queda registrada', ponderar: 'ponderar cada oportunidad', semaforo: 'un semáforo',
    gano: 'por qué se ganó', pronostico: 'un pronóstico ponderado',
  },
  tarjetas: [
    { rotulo: 'Ocho etapas', texto: 'De la prospección al cierre o aplazamiento con fecha de retoma.', frase: 'por etapas' },
    { rotulo: 'No existe un cliente único', texto: 'Se registran todos según su rol: reúnen información, recomiendan, influyen, participan y deciden.', frase: 'no existe un cliente único', destacada: true },
    { rotulo: 'Pronóstico', texto: 'Valor, semáforo de probabilidad, motivos de ganado o perdido y pronóstico ponderado.', frase: 'ponderar cada oportunidad' },
  ],
  pregunta: { frase: 'tu crm guarda', texto: '¿Tu CRM guarda a todas las personas que deciden, o solo a quien te contesta los correos?' },
});

export const procesos = pag({
  id: 'vc-procesos', titulo: 'Constructor de', destaque: 'procesos',
  bajada: 'Quién hace qué y cuándo, con reglas y métricas.',
  inicio: 'el constructor de procesos define',
  anclas: {
    etapa: 'cada etapa tiene', responsable: 'un responsable', ingreso: 'el ingreso de la oportunidad', ganado: 'ganado que dispara', perdido: 'y perdido',
    quien: 'quién hace qué y cuándo', reglas: 'fijar reglas', linea: 'primera o a segunda línea', metricas: 'se ponen métricas', automatiza: 'el crm automatiza',
    gerencia: 'es la gerencia la que dirige', caras: 'dos caras', profesional: 'manda la profesional', importa: 'su negocio te importa',
  },
  tarjetas: [
    { rotulo: 'Cada etapa', texto: 'Regla de avance, acción de salida, automatización y responsable.', frase: 'cada etapa tiene' },
    { rotulo: 'Reglas y métricas', texto: 'Quién hace qué, primera o segunda línea, minutos para atender y días para seguir.', frase: 'quién hace qué y cuándo', destacada: true },
    { rotulo: 'Dos caras', texto: 'Manda la cara profesional: beneficios racionales con algo de empatía.', frase: 'dos caras' },
  ],
  pregunta: { frase: 'qué regla de tu proceso', texto: '¿Qué regla de tu proceso comercial existe hoy solo en la cabeza de alguien?' },
});

export const lista = pag({
  id: 'vc-lista', titulo: 'Lista de', destaque: 'verificación',
  bajada: 'Asegura cada pilar antes de avanzar en el ciclo de venta.',
  inicio: 'todo converge en una lista',
  anclas: {
    economico: 'identificaste al comprador económico', usuario: 'escuchaste las ganancias', tecnico: 'conoces las especificaciones', coach: 'tienes un coach confiable',
    modo: 'están tus compradores en modo', banderas: 'detectaste y mitigaste', razon: 'tienes una razón de negocio', solida: 'una estrategia sólida',
    recorrido: 'el recorrido completo', frase: 'la estrategia no consiste',
  },
  tarjetas: [
    { rotulo: 'Roles cubiertos', texto: 'Económico, usuario, técnico y un coach confiable.', frase: 'identificaste al comprador económico' },
    { rotulo: 'Disposición y riesgos', texto: 'Modo crecimiento o problemas, banderas mitigadas y razón de negocio.', frase: 'están tus compradores en modo' },
    { rotulo: 'La frase', texto: 'La estrategia no consiste en lo que vas a hacer, sino en lo que estás haciendo hoy para ganar mañana.', frase: 'la estrategia no consiste', destacada: true },
  ],
  pregunta: { frase: 'qué vas a hacer hoy', texto: '¿Qué vas a hacer hoy en tu cuenta más importante para ganarla mañana?' },
});

export const ORDEN2 = [icpTool, oferta, constructorOferta, banderas, superar, receptividad, modos, ciclo, flujos, crm, procesos, lista];
