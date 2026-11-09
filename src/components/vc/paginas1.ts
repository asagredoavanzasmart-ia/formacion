import type { Pagina, Tarjeta } from '../influencia/tipos';

/* «Ventas complejas» (copia guiada de «Ventas B2B»), secciones 1 a 13 del guion. Cada página declara sus
   anclas como { nombre: frase del audio } en el orden en que suenan (datos puros, sin React). */

export type PaginaVC = Pagina & { anclas: Record<string, string> };

export const pag = (p: Omit<PaginaVC, 'frases' | 'els' | 'tarjetas'> & { tarjetas: Tarjeta[] }): PaginaVC => ({ ...p, frases: Object.values(p.anclas), els: [] });

export const portada = pag({
  id: 'vc-portada', titulo: 'Formación estratégica:', destaque: 'Ventas complejas',
  bajada: 'En una venta compleja le vendes a un grupo que decide.',
  inicio: 'en una venta compleja no le vendes',
  anclas: {
    grupo: 'un grupo que decide', cuenta: 'gana la cuenta', influyen: 'quiénes influyen en la compra', empresas: 'a qué empresas dedicar', oferta: 'con qué oferta llegar',
    peligro: 'las señales de peligro', cambio: 'disposición de cada persona al cambio', proceso: 'ordenar tu proceso comercial', viaje: 'un viaje con muchas paradas',
    parada: 'en cada parada hay alguien', gana: 'qué gana esa persona', momento: 'en qué momento hablarle', metodo: 'ganar por método',
  },
  tarjetas: [
    { rotulo: 'Un grupo que decide', texto: 'Quien entiende al grupo que decide gana la cuenta.', frase: 'un grupo que decide', destacada: true },
    { rotulo: 'El recorrido', texto: 'Roles, ICP y oferta, banderas rojas, modos de respuesta y proceso comercial.', frase: 'quiénes influyen en la compra' },
    { rotulo: 'Un viaje con paradas', texto: 'En cada parada hay alguien que puede decir que no.', frase: 'un viaje con muchas paradas' },
  ],
  pregunta: { frase: 'cuántas personas crees', texto: '¿Cuántas personas crees que participaron en la última compra importante que te hicieron?' },
});

export const evolucion = pag({
  id: 'vc-evolucion', titulo: 'Comparativa:', destaque: 'Evolución de la venta',
  bajada: 'De una decisión en una cabeza a una propuesta que viaja, va y vuelve.',
  inicio: 'comparativa evolución de la venta',
  anclas: {
    simple: 'en una venta simple', cabeza: 'una sola cabeza', escucha: 'un comprador escucha', decide: 'evalúa y decide', dos: 'dos compradores',
    pareja: 'una pareja que compra una casa', conversan: 'conversan se ponen de acuerdo', firman: 'firman juntos', mesa: 'en la misma mesa',
    viaja: 'la propuesta viaja', ejecutivo: 'un ejecutivo presenta', analista: 'el analista de compras', ti: 'la deriva a ti', ge: 'y a gerencia',
    legal: 'legal revisa', finanzas: 'finanzas revisa', decision: 'la decisión de compra',
    aliados: 'decisores que están a favor', ganan: 'ellos ganan', ayudarte: 'dispuestos a ayudarte',
    riesgo: 'el mayor riesgo', cualquiera: 'cualquiera que recibe la propuesta', detractor: 'transformarse en un detractor', contra: 'en contra de que tú ganes',
    conocer: 'ni siquiera llegues a conocer',
    condominio: 'piensa en un condominio', mayordomo: 'hablas con el mayordomo', administrador: 'a veces con el administrador', vecino: 'el primer contacto es un vecino',
    varia: 'va variando caso a caso', poder: 'más poder de decisión', mano: 'pasa de mano en mano', alMayordomo: 'del vecino al mayordomo',
    alAdmin: 'del mayordomo al administrador', preguntas: 'vuelve al mayordomo con preguntas', comite: 'llega al comité', sinConocer: 'sin haber conocido al vendedor',
    detC: 'el detractor es el mayordomo', presupuesto: 'se sale de presupuesto', unmes: 'toma un mes',
    socios: 'una empresa con dos socios', gerencia: 'una sola persona de gerencia', rrhh: 'viaja a recursos humanos', consulta: 'la consulta con el área contable',
    devuelve: 'el área contable la devuelve a gerencia', costo: 'dudas sobre el costo', reenvia: 'la reenvía a la gerencia general', junta: 'llega a la junta de socios',
    todos: 'todos conversan con todos', vuelve: 'va y vuelve', detJ: 'el detractor es uno de los socios', proveedor: 'confianza en otro proveedor',
    tresJ: 'el viaje toma tres meses',
    otra: 'en otra empresa', asistente: 'habla con un asistente', contable: 'el asesor contable', legales: 'los asesores legales',
    devuelven: 'se la devuelven al asistente', seguridad: 'el área de seguridad', antecedentes: 'pide más antecedentes', dos2: 'dos decisores',
    comercial: 'el área comercial', operaciones: 'el área de operaciones', detG: 'el detractor es seguridad', nadie: 'nadie fue a ver', tresG: 'tarda tres meses',
    todosCasos: 'en todos los casos', conversacion: 'en una conversación', recorrido: 'cada parada del recorrido',
  },
  tarjetas: [
    { rotulo: 'Venta simple', texto: 'Uno o dos compradores en la misma mesa, como una pareja que compra una casa.', frase: 'en una venta simple' },
    { rotulo: 'Venta compleja', texto: 'La propuesta viaja por compras, TI, gerencia, legal y finanzas, y muchas veces va y vuelve antes de la decisión.', frase: 'la propuesta viaja', destacada: true },
    { rotulo: 'Aliados y detractores', texto: 'Hay decisores que ganan si tú ganas; y cualquiera puede estar en contra: el mayordomo (1 mes), uno de los socios (3 meses) o seguridad (3 meses).', frase: 'decisores que están a favor' },
  ],
  pregunta: { frase: 'cómo podrías entonces abordar', texto: '¿Cómo podrías entonces abordar ahora las ventas B2B con esta nueva perspectiva?' },
});

export const intro = pag({
  id: 'vc-intro', titulo: 'Introducción a la', destaque: 'venta compleja',
  bajada: 'Varias aprobaciones, una estructura que cambia y roles en vez de títulos.',
  inicio: 'introducción a la venta compleja',
  anclas: {
    varias: 'varias personas deben dar', firmas: 'cuántas firmas', cambia: 'cambia constantemente', ascensos: 'hay ascensos', relacion: 'una sola persona ya no es suficiente',
    titulos: 'dejar de buscar títulos', roles: 'los roles de compra clave', titulo: 'un título dice', rol: 'un rol dice', libera: 'si libera el dinero',
    bloquearla: 'si puede bloquearla', guiarte: 'guiarte desde adentro', gerente: 'el mismo gerente',
  },
  tarjetas: [
    { rotulo: 'Definición', texto: 'Una venta compleja es aquella donde varias personas deben aprobar antes de que la compra se concrete.', frase: 'varias personas deben dar' },
    { rotulo: 'El desafío', texto: 'La estructura cambia constantemente: una buena relación con una sola persona ya no basta.', frase: 'cambia constantemente' },
    { rotulo: 'La solución', texto: 'Dejar de buscar títulos en el organigrama e identificar los roles de compra clave.', frase: 'dejar de buscar títulos', destacada: true },
  ],
  pregunta: { frase: 'conoces el rol de cada persona', texto: '¿Conoces el rol de cada persona con la que hablas, o solo su cargo?' },
});

export const estrategia = pag({
  id: 'vc-estrategia', titulo: 'Estrategia frente a', destaque: 'táctica',
  bajada: 'Un buen plan táctico es tan bueno como la estrategia que lo precedió.',
  inicio: 'estrategia frente a táctica',
  anclas: {
    plan: 'un buen plan táctico', tactica: 'la táctica son las habilidades', presentaciones: 'presentaciones y demostraciones', objeciones: 'manejo de objeciones',
    visible: 'la parte visible', inmediato: 'su resultado es inmediato', estrategia: 'la estrategia es todo', antes: 'antes de llegar a esa reunión', global: 'el plan global',
    influencias: 'analizar las influencias', improvisar: 'no puedes improvisar', encanto: 'tu encanto', partido: 'piensa en un partido', cancha: 'la jugada en la cancha', decide: 'la estrategia decide',
  },
  tarjetas: [
    { rotulo: 'Táctica', texto: 'El qué: presentaciones, objeciones y cierres frente al cliente. Resultado inmediato.', frase: 'la táctica son las habilidades' },
    { rotulo: 'Estrategia', texto: 'El cómo: preparación antes del contacto y análisis de las influencias de compra.', frase: 'la estrategia es todo', destacada: true },
    { rotulo: 'Sin improvisar', texto: 'Sin tarea previa, el encanto y el cierre se gastan con la persona equivocada.', frase: 'no puedes improvisar' },
  ],
  pregunta: { frase: 'cuánto tiempo dedicas', texto: '¿Cuánto tiempo dedicas a preparar una reunión frente al que pasas dentro de ella?' },
});

export const vendedores = pag({
  id: 'vc-vendedores', titulo: 'Tradicional', destaque: 'vs estratégico',
  bajada: 'Dos maneras de abordar las grandes cuentas.',
  inicio: 'ventas complejas el vendedor tradicional',
  anclas: {
    tradicional: 'el enfoque del vendedor tradicional', pez: 'el pez gordo', mapeo: 'hace un mapeo', premisa: 'la premisa del primero', aprueba: 'quién aprueba realmente',
    glamorosa: 'es glamorosa', cena: 'una cena', dirigida: 'es dirigida', coach: 'sobre el coach', politica: 'la política interna', ciego: 'el punto ciego',
    delega: 'delega la decisión técnica', pierde: 'pierde una venta segura', gana: 'gana la cuenta',
  },
  tarjetas: [
    { rotulo: 'Vendedor tradicional', texto: 'Relaciones personales con el pez gordo y una cena brillante; pierde una venta «segura».', frase: 'el enfoque del vendedor tradicional' },
    { rotulo: 'Vendedor con estrategia', texto: 'Mapea influencias, busca un coach y gana la cuenta con un resultado planificado.', frase: 'hace un mapeo', destacada: true },
    { rotulo: 'El punto ciego', texto: 'Ignorar al gerente de división y a los técnicos: el gerente general delega la decisión técnica.', frase: 'el punto ciego' },
  ],
  pregunta: { frase: 'en cuál de los dos perfiles', texto: '¿En cuál de los dos perfiles te reconoces cuando una cuenta grande se pone difícil?' },
});

export const pilares = pag({
  id: 'vc-pilares', titulo: 'Los 4 pilares de la', destaque: 'estrategia',
  bajada: 'Roles, ICP y oferta, banderas rojas y proceso comercial.',
  inicio: 'los cuatro pilares de la estrategia',
  anclas: {
    roles: 'el primero son los roles', economico: 'el comprador económico', usuarios: 'los compradores usuarios', tecnicos: 'los compradores técnicos', coach: 'y el coach',
    icp: 'el segundo pilar', oferta: 'propuesta de valor irresistible', banderas: 'el tercer pilar', alerta: 'alerta temprana', proceso: 'el cuarto es el proceso', tiempo: 'gestionar tu tiempo',
  },
  tarjetas: [
    { rotulo: 'Roles de influencia', texto: 'Comprador económico, usuarios, técnicos y coach: todos los que aprueban o vetan.', frase: 'el primero son los roles', destacada: true },
    { rotulo: 'ICP + oferta y banderas rojas', texto: 'A qué empresas dedicar esfuerzo con qué oferta, y un sistema de alerta temprana.', frase: 'el segundo pilar' },
    { rotulo: 'Proceso comercial', texto: 'Gestionar tiempo y recursos durante todo el ciclo de la oportunidad.', frase: 'el cuarto es el proceso' },
  ],
  pregunta: { frase: 'cuál de estos cuatro pilares', texto: '¿Cuál de estos cuatro pilares está hoy más débil en tu forma de vender?' },
});

export const roles = pag({
  id: 'vc-roles', titulo: 'Los 4 roles de la', destaque: 'venta compleja',
  bajada: 'Identifica a cada actor clave.',
  inicio: 'los roles de influencia empiezan',
  anclas: {
    economico: 'el comprador económico es', presupuesto: 'guardián del presupuesto', roi: 'el roi', uno: 'solo hay uno', veto: 'veto unilateral', demostrar: 'le debes demostrar',
    precio: 'solo busca precio', usuario: 'el comprador usuario es', vive: 'vive con la solución', operatividad: 'la operatividad', sabotaje: 'el sabotaje más letal',
    tecnico: 'el comprador técnico es', puerta: 'guardián de la puerta', abogados: 'abogados contadores', descartar: 'su objetivo es descartar', poder: 'la diferencia de poder',
    coach: 'y el coach es', brujula: 'tu brújula', orientacion: 'se le pide orientación', jugadas: 'tú corres las jugadas',
  },
  tarjetas: [
    { rotulo: 'Comprador económico', texto: 'Guardián del presupuesto: uno por objetivo de venta, con veto unilateral.', frase: 'el comprador económico es', destacada: true },
    { rotulo: 'Usuario y técnico', texto: 'El usuario vive con la solución; el técnico filtra: veto sin poder de decir que sí.', frase: 'el comprador usuario es' },
    { rotulo: 'El coach', texto: 'Tu brújula interna: se le pide orientación, no que haga tu trabajo.', frase: 'y el coach es' },
  ],
  pregunta: { frase: 'quién cumple hoy el rol de coach', texto: '¿Quién cumple hoy el rol de coach en tu cuenta más importante?' },
});

export const economico = pag({
  id: 'vc-economico', titulo: 'Identificando al', destaque: 'comprador económico',
  bajada: 'Tiene la autoridad final para liberar fondos y vetar.',
  inicio: 'identificar al comprador económico',
  anclas: {
    autoridad: 'la autoridad final', estatico: 'no es estático', cambia: 'cambia según el objetivo de venta', sube: 'sube o baja', flotar: 'lo hacen flotar',
    presupuesto: 'el presupuesto a más dinero', tamano: 'el tamaño de la empresa', condiciones: 'las condiciones del negocio', dificiles: 'en tiempos difíciles',
    directivos: 'pasa a los directivos', experiencia: 'la experiencia previa', primera: 'la primera vez que te compran', impacto: 'el impacto organizacional',
    crecimiento: 'su crecimiento o su estabilidad', preguntas: 'hazte dos preguntas', nivel: 'en qué nivel de tu propia empresa', ajustando: 'la diferencia de tamaño',
    riesgo: 'considerando el riesgo', arriba: 'más arriba o más abajo', oro: 'la regla de oro', encima: 'un nivel por encima', indirectas: 'preguntas indirectas',
    saldran: 'de qué presupuesto saldrán', final: 'cómo funciona la decisión final', mienten: 'afirman tener la última palabra', coach: 'mejor aún con tu coach',
  },
  tarjetas: [
    { rotulo: 'Factor de flotación', texto: 'Presupuesto, condiciones, experiencia previa e impacto suben o bajan el nivel de quien decide.', frase: 'lo hacen flotar', destacada: true },
    { rotulo: 'Preguntas de ubicación', texto: '¿En qué nivel de tu empresa se decidiría esto? ¿Más arriba o más abajo según el riesgo?', frase: 'hazte dos preguntas' },
    { rotulo: 'Confirmación', texto: 'Preguntas indirectas sobre el presupuesto y la decisión final, o tu coach.', frase: 'preguntas indirectas' },
  ],
  pregunta: { frase: 'qué pasaría con tu venta', texto: '¿Qué pasaría con tu venta si la persona que crees que decide no fuera quien libera el dinero?' },
});

export const tecnico = pag({
  id: 'vc-tecnico', titulo: 'Comprador', destaque: 'técnico',
  bajada: 'El portero evalúa lo medible y puede bloquear.',
  inicio: 'el comprador técnico es el portero',
  anclas: {
    portero: 'es el portero', medible: 'evalúa lo medible', bloqueo: 'capacidad de bloqueo técnico', tres: 'tres perfiles', ingeniero: 'el ingeniero especialista',
    influencia: 'influencia alta', indiscutible: 'opinión es indiscutible', delega: 'delega toda la decisión', filtro: 'el filtro real',
    especificaciones: 'preséntale especificaciones', supera: 'supera sus exigencias', experto: 'ser visto como el experto', asesor: 'el asesor o consultor',
    reputacion: 'proteger su reputación', solucionador: 'solucionador estratégico', menor: 'la opción de menor riesgo', transformalo: 'transfórmalo en un coach',
    recelo: 'el técnico con recelo', control: 'teme perder el control', amenaza: 'una amenaza a su rol', saltes: 'no lo saltes', sabotea: 'saboteará la implementación',
    teme: 'descubre por qué teme', gana: 'cómo gana con el cambio', enfatiza: 'enfatiza el control', usuario: 'un comprador usuario entusiasta', valida: 'valida con tu coach',
  },
  tarjetas: [
    { rotulo: 'El ingeniero especialista', texto: 'Influencia alta: el económico delega en él. Especificaciones y ventajas medibles.', frase: 'el ingeniero especialista' },
    { rotulo: 'El asesor o consultor', texto: 'Busca reducir el riesgo y proteger su reputación: puede volverse tu coach.', frase: 'el asesor o consultor', destacada: true },
    { rotulo: 'El técnico con recelo', texto: 'Teme perder el control: no lo saltes, muéstrale cómo gana con el cambio.', frase: 'el técnico con recelo' },
  ],
  pregunta: { frase: 'cuál de estos tres porteros', texto: '¿Cuál de estos tres porteros te ha cerrado una puerta alguna vez?' },
});

export const perfiles = pag({
  id: 'vc-perfiles', titulo: 'Resultados y ganancias', destaque: 'por perfil',
  bajada: 'Las empresas obtienen resultados; solo las personas obtienen ganancias.',
  inicio: 'resultados y ganancias por perfil',
  anclas: {
    resultados: 'las empresas obtienen resultados', ganancias: 'obtienen ganancias', economico: 'el comprador económico evalúa', costo: 'bajo costo de propiedad',
    visionario: 'un líder visionario', usuario: 'el comprador usuario evalúa', productividad: 'eficiencia y productividad', familia: 'estar con su familia',
    tecnico: 'el comprador técnico evalúa', puntuales: 'entregas puntuales', reputacion: 'mejorar su reputación', coach: 'el coach es un caso especial',
    reconocimiento: 'el reconocimiento por traer', unicas: 'únicas para cada persona',
  },
  tarjetas: [
    { rotulo: 'Resultados', texto: 'Tangibles y corporativos: costo de propiedad, ROI, productividad, especificaciones.', frase: 'las empresas obtienen resultados' },
    { rotulo: 'Ganancias', texto: 'Subjetivas y personales: verse visionario, menos estrés, mejor reputación.', frase: 'obtienen ganancias', destacada: true },
    { rotulo: 'El coach', texto: 'Su resultado es que tú cierres; su ganancia, el reconocimiento por traer una buena solución.', frase: 'el coach es un caso especial' },
  ],
  pregunta: { frase: 'qué gana personalmente quien decide', texto: '¿Qué gana personalmente quien decide tu próxima venta?' },
});

export const preguntas = pag({
  id: 'vc-preguntas', titulo: 'Descubriendo', destaque: 'resultados y ganancias',
  bajada: 'Cuatro tipos de preguntas.',
  inicio: 'descubriendo resultados y ganancias',
  anclas: {
    cuatro: 'cuatro tipos de preguntas', objetivas: 'las preguntas objetivas', kpi: 'los kpi', impacto: 'impacto funcional', actitud: 'las preguntas de actitud',
    comoda: 'si se siente cómoda', internas: 'las preguntas internas', puente: 'el puente entre', coach: 'preguntas para tu coach', triunfo: 'un triunfo personal', cargo: 'venderle a un cargo',
  },
  tarjetas: [
    { rotulo: 'Objetivas y de actitud', texto: 'Las objetivas descubren resultados; las de actitud, cómo se siente la persona.', frase: 'las preguntas objetivas' },
    { rotulo: 'Internas', texto: 'Si entrego este resultado, ¿qué gana personalmente esta persona?', frase: 'las preguntas internas', destacada: true },
    { rotulo: 'Para tu coach', texto: 'Cuando hay motivos ocultos, el coach revela el mapa político real.', frase: 'preguntas para tu coach' },
  ],
  pregunta: { frase: 'qué pregunta de actitud', texto: '¿Qué pregunta de actitud podrías hacer en tu próxima reunión?' },
});

export const aterrizaje = pag({
  id: 'vc-aterrizaje', titulo: 'Aterrizaje y', destaque: 'expansión',
  bajada: 'Entrar con agilidad, generar confianza y expandir la influencia.',
  inicio: 'el perfil del cliente ideal y la oferta comienzan',
  anclas: {
    entrada: 'una estrategia de entrada', agilidad: 'entrar con agilidad', aterrizaje: 'el aterrizaje es', caja: 'hacer caja rápido', pedido: 'primer pedido pequeño',
    expansion: 'la expansión viene después', coach: 'desarrollas al coach', comparar: 'al comparar las dos etapas', abre: 'abre la cuenta completa', fracasan: 'muchas ventas complejas fracasan',
  },
  tarjetas: [
    { rotulo: '1. Aterrizaje', texto: 'Producto de menor valor y ciclo corto: hacer caja rápido y ganar confianza.', frase: 'el aterrizaje es', destacada: true },
    { rotulo: '2. Expansión', texto: 'Con el coach desarrollado: más presupuesto, complejidad y tiempo.', frase: 'la expansión viene después' },
    { rotulo: 'El error', texto: 'Vender la expansión el primer día, cuando nadie te conoce adentro.', frase: 'muchas ventas complejas fracasan' },
  ],
  pregunta: { frase: 'cuál sería el aterrizaje', texto: '¿Cuál sería el aterrizaje más pequeño que podrías ofrecer a tu cliente soñado?' },
});

export const icp = pag({
  id: 'vc-icp', titulo: 'Perfil del cliente', destaque: 'ideal (ICP)',
  bajada: 'Mientras más específico, más respuestas y más ventas.',
  inicio: 'el perfil del cliente ideal el icp',
  anclas: {
    error: 'el error número uno', especifico: 'mientras más específico', capas: 'tres capas', empresa: 'la empresa una industria', disparadores: 'los disparadores',
    personas: 'y las personas', siete: 'siete preguntas', demos: 'demostraciones infinitas', anti: 'tu anti icp', matriz: 'la matriz de dolores', cosmetico: 'lo cosmético',
    zona: 'la zona de impacto estratégico', riesgo: 'pone en riesgo',
  },
  tarjetas: [
    { rotulo: 'Las 3 capas', texto: 'La empresa, los disparadores de compra y las personas que sufren, pagan y deciden.', frase: 'tres capas' },
    { rotulo: 'Las 7 preguntas', texto: 'Tus mejores clientes, quién no pidió demos infinitas y tu anti-ICP.', frase: 'siete preguntas' },
    { rotulo: 'Zona de impacto estratégico', texto: 'Donde el problema pone en riesgo el crecimiento o la supervivencia.', frase: 'la zona de impacto estratégico', destacada: true },
  ],
  pregunta: { frase: 'tu cliente ideal está hoy', texto: '¿Tu cliente ideal está hoy en la zona de impacto estratégico o en la cosmética?' },
});

export const ORDEN1 = [portada, evolucion, intro, estrategia, vendedores, pilares, roles, economico, tecnico, perfiles, preguntas, aterrizaje, icp];
