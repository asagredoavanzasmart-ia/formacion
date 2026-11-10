import type { Pagina, Tarjeta } from '../influencia/tipos';

/* «Ofertas y adquisición» (método de Alex Hormozi, «$100M Offers» y «$100M Leads»), para quienes montan ofertas B2B.
   Cada página declara sus anclas como { nombre: frase del guion } en el orden en que suenan (datos puros, sin React:
   el generador de tiempos los lee con esbuild). */

export type PaginaAD = Pagina & { anclas: Record<string, string> };

export const pag = (p: Omit<PaginaAD, 'frases' | 'els' | 'tarjetas'> & { tarjetas: Tarjeta[] }): PaginaAD => ({ ...p, frases: Object.values(p.anclas), els: [] });

export const portada = pag({
  id: 'ad-portada', titulo: 'Ofertas y', destaque: 'adquisición',
  bajada: 'Que tus clientes financien el costo de conseguir al siguiente.',
  inicio: 'una oferta bien construida puede lograr',
  anclas: {
    financien: 'tus propios clientes financien', hormozi: 'viene de alex hormozi', gimnasio: 'abrió su primer gimnasio', launch: 'luego fundó gym launch',
    negocios: 'vendiendo servicios a otros negocios', vendio: 'vendió el sesenta y seis', acquisition: 'hoy dirige acquisition', libros: 'sus libros',
    practicante: 'es conocimiento de practicante', magnitud: 'órdenes de magnitud', pares: 'investigación revisada por pares', janakiraman: 'un metaanálisis de janakiraman',
    arkes: 'arkes y blumer', schmitt: 'y schmitt skiera', convenciones: 'son convenciones de la industria',
  },
  tarjetas: [
    { rotulo: 'El autor', texto: 'Alex Hormozi: primer gimnasio en 2013, Gym Launch desde 2016 (servicios a dueños de gimnasios), venta del 66 % en 2021 y hoy Acquisition.com.', frase: 'viene de alex hormozi' },
    { rotulo: 'Cómo leer las cifras', texto: 'Los casos salen de sus propias empresas y no están auditados: son órdenes de magnitud.', frase: 'es conocimiento de practicante', destacada: true },
    { rotulo: 'Evidencia revisada por pares', texto: 'Devoluciones flexibles (Janakiraman y otros, 2016), precio y compromiso (Arkes y Blumer, 1985) y referidos +16 % (Schmitt y otros, 2011).', frase: 'investigación revisada por pares' },
  ],
  pregunta: { frase: 'con ese mapa en mano', texto: '¿Cuál de tus supuestos actuales sobre cómo vender te gustaría verificar con números?' },
});

export const tresAUno = pag({
  id: 'ad-tres-a-uno', titulo: 'La regla del', destaque: 'tres a uno',
  bajada: 'Ganancia bruta de por vida sobre costo de adquisición.',
  inicio: 'fundamentos económicos de la adquisición',
  anclas: {
    relacion: 'de una sola relación', ganancia: 'la ganancia bruta de por vida de un cliente', costo: 'el costo de adquirirlo', tres: 'superior a tres a uno',
    menos: 'menos el costo directo', ejemplo: 'si cobras mil dólares al mes', cien: 'te cuesta cien dólares mensuales', cinco: 'se queda cinco meses',
    novecientos: 'es de novecientos dólares', vida: 'de por vida es de cuatro mil quinientos', gastas: 'si gastas más de mil quinientos', pobre: 'te deja más pobre',
    sistemas: 'dos sistemas en estricto orden', oferta: 'primero una oferta', motor: 'un motor de prospección',
  },
  tarjetas: [
    { rotulo: 'La relación', texto: 'Ganancia bruta de por vida ÷ costo de adquirir al cliente > 3.', frase: 'superior a tres a uno', destacada: true },
    { rotulo: 'Ejemplo', texto: '1.000 al mes − 100 de costo directo = 900 × 5 meses = 4.500 dólares de ganancia de por vida.', frase: 'si cobras mil dólares al mes' },
    { rotulo: 'Dos sistemas, en orden', texto: 'Primero la oferta que multiplica el efectivo de los primeros 30 días; después el motor de prospección.', frase: 'dos sistemas en estricto orden' },
  ],
  pregunta: { frase: 'cuál es hoy la proporción', texto: '¿Cuál es hoy la proporción entre la ganancia bruta de por vida de tus clientes y lo que te cuesta adquirirlos?' },
});

export const commodity = pag({
  id: 'ad-commodity', titulo: 'El servicio', destaque: 'commoditizado',
  bajada: 'Cuando el mercado solo compara precio, la caja se estrangula.',
  inicio: 'del servicio commoditizado a la oferta',
  anclas: {
    precio: 'compara solo por precio', identico: 'parece idéntico', agencia: 'una agencia tradicional', cuota: 'mil dólares de cuota inicial', iguala: 'al mes de iguala',
    invierte: 'invierte diez mil dólares', cinco: 'cierra cinco clientes', pierde: 'pierde cinco mil el primer mes', segundo: 'recién en el segundo mes',
    tercero: 'recién en el tercer mes', estrangulado: 'está estrangulado', rojos: 'más tiempo pasa en números rojos',
  },
  tarjetas: [
    { rotulo: 'Modelo estándar', texto: '1.000 de entrada y 1.000 al mes de iguala: el mercado lo compara solo por precio.', frase: 'mil dólares de cuota inicial' },
    { rotulo: 'El primer mes', texto: '10.000 en publicidad, 5 clientes, 5.000 cobrados: −5.000.', frase: 'pierde cinco mil el primer mes', destacada: true },
    { rotulo: 'El costo oculto', texto: 'Empata en el mes 2 y gana recién en el mes 3: más publicidad = más tiempo en rojo.', frase: 'está estrangulado' },
  ],
  pregunta: { frase: 'cuántos meses tarda', texto: '¿Cuántos meses tarda tu empresa en recuperar lo que gasta para conseguir un cliente?' },
});

export const altoMargen = pag({
  id: 'ad-alto-margen', titulo: 'La oferta de', destaque: 'alto margen',
  bajada: 'El mismo trabajo, otra estructura de cobro.',
  inicio: 'ahora el mismo trabajo de fondo',
  anclas: {
    unico: 'un pago único de entrada', pauta: 'cubre su propia pauta', desempeno: 'paga por desempeño', garantiza: 'garantiza veinte prospectos', sistema: 'el sistema completo de conversión',
    efectos: 'ocurren tres efectos', responden: 'responden dos veces y media', cierran: 'se cierran dos veces y media', cobra: 'se cobra cuatro veces más',
    multiplican: 'se multiplican entre sí', ciento: 'ciento doce mil dólares', veinte: 'más de veinte veces', financiada: 'queda financiada',
  },
  tarjetas: [
    { rotulo: 'La nueva oferta', texto: 'Pago único de entrada, pago por desempeño, 20 prospectos garantizados y el sistema de conversión incluido.', frase: 'un pago único de entrada' },
    { rotulo: 'Tres efectos que se multiplican', texto: '×2,5 respuesta · ×2,5 cierre · ×4 cobro al contado.', frase: 'ocurren tres efectos', destacada: true },
    { rotulo: 'Resultado (cifras de Hormozi)', texto: '10.000 de publicidad → 112.000 cobrados en 30 días: más de veinte veces.', frase: 'ciento doce mil dólares' },
  ],
  pregunta: { frase: 'cómo podrías reestructurar el cobro', texto: '¿Cómo podrías cobrar más de entrada, atado al desempeño, en lugar de una iguala fija?' },
});

export const mercado = pag({
  id: 'ad-mercado', titulo: 'Un mercado', destaque: 'viable',
  bajada: 'Cuatro indicadores antes de construir la oferta.',
  inicio: 'selección de mercado y poder de precios',
  anclas: {
    correcto: 'al mercado correcto', cuatro: 'exige cuatro indicadores', dolor: 'dolor masivo el problema', poder: 'poder adquisitivo el cliente', localizado: 'facilidad para ser localizado',
    crecimiento: 'y crecimiento el sector', contra: 'dos contraejemplos', periodicos: 'periódicos impresos', caida: 'la caída del sector', curriculums: 'optimización de currículums',
    cero: 'cero poder adquisitivo', empresas: 'en ventas a empresas', constructoras: 'constructoras medianas', micro: 'microempresas',
  },
  tarjetas: [
    { rotulo: 'Cuatro indicadores', texto: 'Dolor masivo, poder adquisitivo, fácil de localizar y en crecimiento.', frase: 'exige cuatro indicadores', destacada: true },
    { rotulo: 'Contraejemplos', texto: 'Software para periódicos que caen 25 % al año; currículums para desempleados: dolor sin dinero.', frase: 'dos contraejemplos' },
    { rotulo: 'En B2B', texto: 'Los filtros se aplican por industria y tamaño de cliente.', frase: 'en ventas a empresas' },
  ],
  pregunta: { frase: 'cuál de los cuatro indicadores', texto: '¿Cuál de los cuatro indicadores es hoy el más débil en el mercado al que le vendes?' },
});

export const nicho = pag({
  id: 'ad-nicho', titulo: 'Especificidad', destaque: 'de nicho',
  bajada: 'El mismo contenido, cien veces el precio.',
  inicio: 'especificidad de nicho y el ciclo virtuoso',
  anclas: {
    estrechar: 'es estrechar el nicho', curso: 'un curso de gestión del tiempo', diecinueve: 'lo valora en diecinueve', ventas: 'para profesionales de ventas', noventa: 'vale noventa y nueve',
    frio: 'que prospectan en frío', comision: 'quinientos dólares de comisión', racional: 'es racional', jardineria: 'herramientas eléctricas y de jardinería', medida: 'se hizo a su medida',
    mil: 'entre mil y dos mil', cien: 'cien veces el precio', ilustrativo: 'un ejemplo ilustrativo', especialista: 'se le paga más al especialista',
  },
  tarjetas: [
    { rotulo: 'La escalera del nicho', texto: 'Genérico 19 → ventas 99 → ventas B2B en frío 499 → herramientas y jardinería 1.000 a 2.000 dólares.', frase: 'lo valora en diecinueve', destacada: true },
    { rotulo: 'Por qué funciona', texto: 'El comprador vincula el precio con lo que gana: una venta deja 500 de comisión.', frase: 'quinientos dólares de comisión' },
    { rotulo: 'Advertencia', texto: 'Ejemplo ilustrativo del autor, no un experimento controlado.', frase: 'un ejemplo ilustrativo' },
  ],
  pregunta: { frase: 'a qué subgrupo de tu mercado', texto: '¿A qué subgrupo de tu mercado podrías dirigir una versión hiperespecializada de lo que ya vendes?' },
});

export const precioAlto = pag({
  id: 'ad-precio-alto', titulo: 'El precio alto', destaque: 'cambia el resultado',
  bajada: 'Quien paga caro se compromete.',
  inicio: 'una vez fijado el nicho',
  anclas: {
    cambia: 'cambia el resultado del cliente', barato: 'cuando cobras barato', atencion: 'presta poca atención', peores: 'obtiene peores resultados', soporte: 'exige más soporte',
    caro: 'cuando paga caro', respaldo: 'esta idea tiene respaldo', teatro: 'el abono de teatro', fotografia: 'un negocio de fotografía', eliminaron: 'eliminaron el resto',
    ticket: 'subieron el ticket promedio', cinco: 'cinco veces en el precio', treinta: 'por treinta y ocho la utilidad', semana: 'treinta y ocho mil dólares semanales',
    margen: 'el margen extra',
  },
  tarjetas: [
    { rotulo: 'Barato vs. caro', texto: 'Barato: poca atención, peores resultados, más soporte. Caro: compromiso.', frase: 'cuando cobras barato' },
    { rotulo: 'Arkes y Blumer (1985)', texto: 'Quienes pagaron el abono de teatro a precio completo asistieron a más funciones.', frase: 'esta idea tiene respaldo' },
    { rotulo: 'Caso de fotografía', texto: 'Ticket de 300 a 1.500 dólares (×5): utilidad de 1.000 a 38.000 por semana (×38).', frase: 'un negocio de fotografía', destacada: true },
  ],
  pregunta: { frase: 'qué pasaría con el compromiso', texto: '¿Qué pasaría con el compromiso de tus clientes si cobraras cinco veces más por lo que más valoran?' },
});

export const ecuacion = pag({
  id: 'ad-ecuacion', titulo: 'La ecuación', destaque: 'del valor',
  bajada: 'Dos variables arriba que crecen, dos abajo que tienden a cero.',
  inicio: 'arquitectura e ingeniería de la oferta',
  anclas: {
    buen: 'hizo un buen negocio', cuatro: 'las cuatro variables', numerador: 'en el numerador', sonado: 'el resultado soñado', probabilidad: 'la probabilidad percibida de alcanzarlo',
    denominador: 'en el denominador', demora: 'la demora hasta ver', esfuerzo: 'el esfuerzo y sacrificio', vehiculos: 'dos vehículos que prometen', meditacion: 'con la meditación',
    farmaco: 'con el fármaco', pastilla: 'tragar una pastilla', millones: 'uno mueve miles de millones', lipo: 'una liposucción de una tarde', gimnasio: 'cien dólares al mes de gimnasio',
  },
  tarjetas: [
    { rotulo: 'Arriba (maximizar)', texto: 'Resultado soñado × probabilidad percibida de lograrlo.', frase: 'en el numerador', destacada: true },
    { rotulo: 'Abajo (llevar a cero)', texto: 'Demora hasta ver el resultado × esfuerzo y sacrificio.', frase: 'en el denominador' },
    { rotulo: 'Mismo resultado, distinto valor', texto: 'Meditación frente a ansiolítico; gimnasio de 12 meses frente a liposucción de una tarde.', frase: 'dos vehículos que prometen' },
  ],
  pregunta: { frase: 'en tu oferta a empresas', texto: 'En tu oferta a empresas, ¿cuál de las cuatro variables estás descuidando?' },
});

export const victorias = pag({
  id: 'ad-victorias', titulo: 'Victorias', destaque: 'rápidas',
  bajada: 'Bajar la espera percibida cuesta menos que acelerar el tren.',
  inicio: 'para reducir la demora y el sacrificio',
  anclas: {
    psicologicas: 'las soluciones psicológicas', londres: 'el metro de londres', trenes: 'trenes más rápidos', paneles: 'sino de paneles', medido: 'esto también está medido',
    seattle: 'pasajeros de autobús en seattle', corta: 'una espera más corta', dos: 'casi dos minutos menos', incertidumbre: 'reducir la incertidumbre', cuarenta: 'cuarenta y ocho horas',
    programa: 'al programa anual', facturacion: 'doscientos treinta y nueve mil', anuncios: 'encender sus anuncios', venta: 'su primera venta', triplica: 'triplica la retención',
  },
  tarjetas: [
    { rotulo: 'Metro de Londres', texto: 'La satisfacción subió con paneles de minutos de espera, no con trenes más rápidos.', frase: 'el metro de londres' },
    { rotulo: 'Watkins y otros (2011)', texto: 'Con información en tiempo real, la espera se percibe más corta y es casi 2 minutos menor.', frase: 'esto también está medido', destacada: true },
    { rotulo: 'La primera semana', texto: 'Programa de 42.000: la primera venta de 2.000 en 7 días; según Hormozi, triplica la retención.', frase: 'al programa anual' },
  ],
  pregunta: { frase: 'qué victoria tangible', texto: '¿Qué victoria tangible podría vivir tu cliente en sus primeros siete días contigo?' },
});

export const problemas = pag({
  id: 'ad-problemas', titulo: 'Problemas', destaque: 'y soluciones',
  bajada: 'Cada obstáculo sin respuesta es una razón para no comprar.',
  inicio: 'matriz de problemas y soluciones',
  anclas: {
    pasos: 'en cinco pasos', resultado: 'identificar el resultado', listar: 'listar cada problema', transformar: 'transformar cada problema', definir: 'definir cómo se entrega',
    recortar: 'recortar y apilar', antes: 'antes durante y después', comida: 'comprar comida saludable', confuso: 'es confuso saber', tiempo: 'toma mucho tiempo', caro: 'es caro',
    viajo: 'no funciona si viajo', familia: 'mi familia no comerá', razon: 'la razón por la que no compra', clienta: 'una clienta le dijo', restaurantes: 'almorzaba en restaurantes',
    guia: 'una guía de qué pedir', cerro: 'cerró la venta', miles: 'para miles de clientes',
  },
  tarjetas: [
    { rotulo: 'Cinco pasos', texto: 'Resultado → problemas → soluciones → forma de entrega → recortar y apilar.', frase: 'en cinco pasos' },
    { rotulo: 'Antes, durante y después', texto: 'Cada obstáculo que el cliente piensa es una objeción en espera.', frase: 'antes durante y después', destacada: true },
    { rotulo: 'La guía de restaurantes', texto: 'Una sola objeción resuelta por escrito, una vez, para miles de clientes.', frase: 'una guía de qué pedir' },
  ],
  pregunta: { frase: 'en tu venta a empresas qué obstáculo', texto: '¿Qué obstáculo de tus clientes todavía no tiene una respuesta escrita?' },
});

export const cubo = pag({
  id: 'ad-cubo', titulo: 'El cubo', destaque: 'de entrega',
  bajada: 'Seis códigos para entregar sin destruir el margen.',
  inicio: 'el cubo de entrega',
  anclas: {
    seis: 'propone seis códigos', atencion: 'el nivel de atención', esfuerzo: 'el esfuerzo del cliente', vivo: 'si es en vivo', grabado: 'si es grabado', velocidad: 'la velocidad de respuesta',
    diez: 'el ejercicio de diez veces', decimo: 'una décima parte', premium: 'un servicio premium', escalables: 'formas escalables', combinando: 'combinando los seis códigos',
    consultoria: 'una consultoría individual cara', plantilla: 'una plantilla grabada',
  },
  tarjetas: [
    { rotulo: 'Seis códigos', texto: 'Atención, esfuerzo del cliente, medio en vivo, formato grabado, velocidad de respuesta y el ejercicio 10× / 1/10.', frase: 'propone seis códigos', destacada: true },
    { rotulo: 'Diez veces', texto: 'Qué entregarías si te pagaran diez veces más: cómo se ve el premium.', frase: 'el ejercicio de diez veces' },
    { rotulo: 'Un décimo', texto: 'El mismo resultado por un décimo y sin tu tiempo: cómo escala.', frase: 'una décima parte' },
  ],
  pregunta: { frase: 'qué entregarías a tus clientes', texto: '¿Qué entregarías si te pagaran diez veces más, y cómo lo harías con un décimo del precio?' },
});

export const recortar = pag({
  id: 'ad-recortar', titulo: 'Recortar', destaque: 'y apilar',
  bajada: 'Activos que se crean una vez y sirven a muchos.',
  inicio: 'con la lista completa viene recortar',
  anclas: {
    alto: 'de alto costo para ti', bajo: 'de bajo costo y bajo valor', activos: 'activos que se crean una sola vez', calculadoras: 'calculadoras en hojas de cálculo', plantillas: 'plantillas preconfiguradas',
    listas: 'listas de verificación', recorridos: 'recorridos grabados', primero: 'el primer cliente paga', siguientes: 'todos los siguientes', horas: 'dedicó cien horas',
    comidas: 'más de cien comidas', supermercado: 'lista exacta de supermercado', quince: 'quince minutos de trabajo', diagnostico: 'el diagnóstico estandarizado', manual: 'el manual de implementación',
  },
  tarjetas: [
    { rotulo: 'Qué se elimina', texto: 'Lo caro para ti y de bajo valor para el cliente, y lo barato que tampoco aporta.', frase: 'de alto costo para ti' },
    { rotulo: 'Activos de una sola creación', texto: 'Calculadoras, plantillas, listas de verificación y recorridos grabados.', frase: 'activos que se crean una sola vez', destacada: true },
    { rotulo: 'En B2B', texto: 'Diagnóstico estandarizado, contrato listo, tablero preconfigurado, manual de implementación.', frase: 'el diagnóstico estandarizado' },
  ],
  pregunta: { frase: 'qué tarea repetida', texto: '¿Qué tarea repetida de tu entrega podrías convertir en un activo que se crea una vez y sirve siempre?' },
});

export const bonos = pag({
  id: 'ad-bonos', titulo: 'Apilamiento', destaque: 'de bonos',
  bajada: 'El valor de los bonos supera el precio de la oferta.',
  inicio: 'apilamiento de bonos',
  anclas: {
    bloque: 'no los vendes como un bloque', individuales: 'como bonos individuales', supere: 'supere el precio', primero: 'presentar primero la oferta principal', si: 'si el cliente dice que sí',
    no: 'si dice que no', exacto: 'el bono exacto', complementarios: 'negocios complementarios', clinica: 'una clínica de dolor', masajista: 'un masajista', quiro: 'un quiropráctico',
    plantillas: 'plantillas ortopédicas', gimnasio: 'un gimnasio cercano', comision: 'negocia una comisión', extra: 'trescientos cincuenta dólares extra',
  },
  tarjetas: [
    { rotulo: 'Bonos, no bloque', texto: 'Cada activo se presenta por separado; su valor sumado supera el precio.', frase: 'como bonos individuales' },
    { rotulo: 'El bono como respuesta', texto: 'Si dice que no por un obstáculo, entra el bono exacto que lo neutraliza.', frase: 'si dice que no', destacada: true },
    { rotulo: 'Socios complementarios', texto: 'Clínica de dolor de 400: sesiones gratis de cuatro socios y 350 dólares extra por venta en comisiones.', frase: 'una clínica de dolor' },
  ],
  pregunta: { frase: 'qué empresa complementaria', texto: '¿Qué empresa complementaria a la tuya podría aportar un bono a tu oferta?' },
});

export const escasez = pag({
  id: 'ad-escasez', titulo: 'Escasez', destaque: 'y urgencia',
  bajada: 'Topes reales de cantidad y de tiempo.',
  inicio: 'escasez y urgencia',
  anclas: {
    cantidad: 'limita la cantidad disponible', tiempo: 'la urgencia limita el tiempo', escaso: 'lo que es escaso se valora más', topes: 'tres topes reales', total: 'un tope total',
    espera: 'con lista de espera', crecimiento: 'un tope de crecimiento', grupo: 'un tope por grupo', formas: 'de otras tres formas', rodantes: 'con grupos rodantes',
    temporada: 'promociones de temporada', subir: 'vas a subir el precio', reales: 'los topes sean reales', inventada: 'una escasez inventada', conversan: 'conversan entre sí',
  },
  tarjetas: [
    { rotulo: 'Escasez: tres topes', texto: 'Clientes simultáneos con lista de espera, nuevos por semana, cupos por grupo.', frase: 'tres topes reales' },
    { rotulo: 'Urgencia: tres formas', texto: 'Grupos rodantes, promociones de temporada y aviso antes de subir el precio.', frase: 'de otras tres formas' },
    { rotulo: 'La condición', texto: 'Topes reales: en B2B los clientes conversan entre sí.', frase: 'los topes sean reales', destacada: true },
  ],
  pregunta: { frase: 'qué límite real de capacidad', texto: '¿Qué límite real de capacidad tiene hoy tu empresa que podrías comunicar como escasez honesta?' },
});

export const garantias = pag({
  id: 'ad-garantias', titulo: 'Garantías', destaque: 'condicionales',
  bajada: 'Si no consigues X en el tiempo Y, nosotros haremos Z.',
  inicio: 'garantías para eliminar la fricción',
  anclas: {
    condicion: 'se formula como condición', equis: 'el resultado equis', temer: 'no temerle a los reembolsos', sin: 'sin garantía vendes cien', noventa: 'noventa y cinco ventas netas',
    con: 'con una garantía potente', trece: 'trece quedan', ciento: 'ciento diecisiete ventas netas', veintitres: 'un veintitrés por ciento más', academica: 'la evidencia académica',
    fladlien: 'jason fladlien', tienda: 'le compraba su tienda', tres: 'tres millones de dólares', diez: 'solo diez personas', extendido: 'garantía de servicio extendido',
  },
  tarjetas: [
    { rotulo: 'La cuenta', texto: 'Sin garantía: 100 − 5 = 95. Con garantía: 130 − 13 = 117 ventas netas (+23 %).', frase: 'sin garantía vendes cien', destacada: true },
    { rotulo: 'Janakiraman y otros (2016)', texto: 'Metaanálisis: la flexibilidad en devoluciones sube más las compras que las devoluciones.', frase: 'la evidencia académica' },
    { rotulo: 'Servicio extendido', texto: 'Trabajas gratis hasta lograr el objetivo si el cliente cumple lo pactado.', frase: 'garantía de servicio extendido' },
  ],
  pregunta: { frase: 'qué garantía condicional', texto: '¿Qué garantía condicional podría disolver el mayor temor de tus clientes?' },
});

export const nombre = pag({
  id: 'ad-nombre', titulo: 'El nombre', destaque: 'y la fatiga',
  bajada: 'Cinco partes para nombrar; seis cambios antes de tocar el negocio.',
  inicio: 'nombre de la oferta y jerarquía',
  anclas: {
    cinco: 'en cinco partes', razon: 'una razón atractiva', anuncio: 'el anuncio exacto del cliente', meta: 'una meta cuantificable', plazo: 'un plazo claro', palabra: 'una palabra contenedora',
    ejemplo: 'un nombre ilustrativo', fatiga: 'una campaña se fatiga', jerarquia: 'una jerarquía de cambios', imagen: 'la imagen o el video', texto: 'después el texto',
    titular: 'el titular o el nombre', duracion: 'la duración del programa', gratuito: 'el componente gratuito', estructura: 'la estructura financiera',
  },
  tarjetas: [
    { rotulo: 'Cinco partes', texto: 'Razón, cliente, meta, plazo y palabra contenedora (desafío, acelerador, sistema, intensivo).', frase: 'en cinco partes', destacada: true },
    { rotulo: 'Ejemplo ilustrativo', texto: 'Acelerador de cierre de fin de año para distribuidoras industriales: 20 reuniones en 30 días.', frase: 'un nombre ilustrativo' },
    { rotulo: 'Contra la fatiga', texto: 'Imagen → texto → titular → duración → gratuito → y al final la estructura financiera.', frase: 'una jerarquía de cambios' },
  ],
  pregunta: { frase: 'cómo llamarías tu servicio', texto: '¿Cómo llamarías tu servicio si tuvieras que relanzarlo la próxima semana con esta fórmula?' },
});

export const iman = pag({
  id: 'ad-iman', titulo: 'El imán', destaque: 'de prospectos',
  bajada: 'Valor por adelantado que baja el costo de adquisición.',
  inicio: 'el sistema de generación de prospectos',
  anclas: {
    comprometidos: 'conseguir prospectos comprometidos', interes: 'interés activo', iman: 'un imán de prospectos', estrecho: 'un problema estrecho pero real', deja: 'deja diez mil dólares',
    frio: 'directo en frío', llamada: 'agende una llamada', tres: 'uno de cada tres', tresmil: 'te cuesta tres mil dólares', ahora: 'ahora anuncias un imán', veinticinco: 'veinticinco dólares entregar',
    setenta: 'setenta y cinco dólares', cien: 'cuesta cien dólares', diez: 'uno de cada diez', mil: 'mil dólares en vez de tres mil', tercio: 'a un tercio',
  },
  tarjetas: [
    { rotulo: 'Oferta en frío', texto: '1.000 por llamada, cierre 1 de 3: 3.000 por cliente.', frase: 'directo en frío' },
    { rotulo: 'Con imán', texto: '75 de publicidad + 25 de entrega = 100 por llamada; cierre 1 de 10: 1.000 por cliente.', frase: 'ahora anuncias un imán', destacada: true },
    { rotulo: 'Resultado', texto: 'El costo de adquisición baja a un tercio.', frase: 'a un tercio' },
  ],
  pregunta: { frase: 'qué problema estrecho', texto: '¿Qué problema estrecho de tus clientes podrías resolver gratis como puerta de entrada?' },
});

export const tiposIman = pag({
  id: 'ad-tipos-iman', titulo: 'Tres tipos,', destaque: 'cuatro vehículos',
  bajada: 'Doce combinaciones para atraer prospectos.',
  inicio: 'existen tres tipos de imanes',
  anclas: {
    doce: 'doce combinaciones', revela: 'revela un problema', velocidad: 'una medición de velocidad', lento: 'treinta por ciento más lento', muestra: 'una muestra gratuita',
    paso: 'el primer paso completo', sellador: 'capas de sellador', vehiculos: 'por cuatro vehículos', software: 'software como hojas', informacion: 'información como un caso',
    servicio: 'un servicio hecho por ti', fisico: 'un producto físico', formatos: 'texto audio y video', diagnostico: 'el diagnóstico suele ser',
  },
  tarjetas: [
    { rotulo: 'Tres tipos', texto: 'Revelar un problema, dar una muestra gratuita, regalar el primer paso.', frase: 'revela un problema', destacada: true },
    { rotulo: 'Cuatro vehículos', texto: 'Software, información, servicio y producto físico.', frase: 'por cuatro vehículos' },
    { rotulo: 'En B2B', texto: 'El diagnóstico le pone cifra a un dolor que el cliente sentía pero no había medido.', frase: 'el diagnóstico suele ser' },
  ],
  pregunta: { frase: 'qué tipo de imán', texto: '¿Qué tipo de imán y qué vehículo encajan mejor con tu negocio?' },
});

export const calido = pag({
  id: 'ad-calido', titulo: 'Alcance', destaque: 'cálido',
  bajada: 'Uno a uno, con quienes ya te conocen.',
  inicio: 'los cuatro canales de distribución',
  anclas: {
    cuatro: 'solo existen cuatro formas', calido: 'alcance cálido contenido', contenido: 'contenido gratuito', frio: 'alcance en frío y', pagados: 'anuncios pagados',
    conocen: 'que ya te conocen', contactos: 'reúnes los contactos', mil: 'sus primeros mil', cien: 'cien mensajes personalizados', aca: 'hormozi llama aca', reconocer: 'reconocer repitiendo',
    cumplido: 'un cumplido genuino', preguntar: 'y preguntar algo', novende: 'no le vendes', conoce: 'si conoce a alguien', casos: 'cinco casos de estudio',
  },
  tarjetas: [
    { rotulo: 'Cuatro canales', texto: 'Cálido y frío (uno a uno); contenido y anuncios (uno a muchos).', frase: 'solo existen cuatro formas' },
    { rotulo: 'El marco ACA', texto: 'Reconocer lo que dijo, hacer un cumplido genuino y preguntar hacia el problema.', frase: 'hormozi llama aca', destacada: true },
    { rotulo: 'Cinco casos gratuitos', texto: 'Pide referidos, no la venta: casos de estudio a cambio de retroalimentación y reseña.', frase: 'cinco casos de estudio' },
  ],
  pregunta: { frase: 'a qué diez personas', texto: '¿A qué diez personas de tu red podrías escribirles hoy con este marco?' },
});

export const calidoMetricas = pag({
  id: 'ad-calido-metricas', titulo: 'Las métricas', destaque: 'del alcance cálido',
  bajada: '100 → 20 → 4 → 1, y el precio sube por escalones.',
  inicio: 'las métricas de referencia del alcance cálido',
  anclas: {
    cien: 'de cada cien contactos', veinte: 'veinte responden', cuatro: 'cuatro aceptan', uno: 'al menos uno se convierte', referir: 'empiezan a referir', escalones: 'por escalones',
    ochenta: 'ochenta por ciento de descuento', sesenta: 'sesenta por ciento para', cuarenta: 'cuarenta por ciento para', completa: 'la tarifa completa', pequena: 'una oferta pequeña',
    cinco: 'cinco ventas semanales', anual: 'ciento cuatro mil al año', reactivar: 'para reactivar una lista', pregunta: 'sigues buscando conseguir', persona: 'escrita por una persona',
  },
  tarjetas: [
    { rotulo: 'La cadena', texto: '100 contactos → 20 responden → 4 aceptan el caso → al menos 1 cliente o referido.', frase: 'de cada cien contactos', destacada: true },
    { rotulo: 'Escalera de precio', texto: 'Gratis → −80 % → −60 % → −40 % → tarifa completa.', frase: 'por escalones' },
    { rotulo: 'Reactivar', texto: '¿Sigues buscando conseguir más prospectos comerciales este mes?', frase: 'para reactivar una lista' },
  ],
  pregunta: { frase: 'qué lista de contactos antiguos', texto: '¿Qué lista de contactos antiguos tienes hoy sin trabajar?' },
});

export const contenido = pag({
  id: 'ad-contenido', titulo: 'Contenido', destaque: 'gratuito',
  bajada: 'Enganchar, retener y recompensar.',
  inicio: 'contenido gratuito el segundo canal',
  anclas: {
    audiencia: 'hacia tu propia audiencia', encuestas: 'mediante encuestas', setenta: 'setenta y ocho por ciento', dos: 'dos piezas de contenido largo', mejor: 'los hace convertir mejor',
    eslabones: 'tres eslabones', enganchas: 'enganchas con al menos', retienes: 'retienes con listas', recompensas: 'y recompensas cumpliendo', hiciste: 'cómo lo hiciste tú',
    monetizar: 'para monetizar', television: 'la proporción de la televisión', privado: 'te pregunte en privado',
  },
  tarjetas: [
    { rotulo: 'El dato', texto: 'El 78 % de quienes agendaban desde anuncios había visto al menos dos piezas largas (encuestas de Hormozi).', frase: 'setenta y ocho por ciento', destacada: true },
    { rotulo: 'Tres eslabones', texto: 'Enganchar con componentes noticiosos, retener con pasos o historias, recompensar cumpliendo la promesa.', frase: 'tres eslabones' },
    { rotulo: 'Monetizar', texto: 'Más que 3,5 de valor por 1 de oferta, hasta que te pregunten en privado.', frase: 'para monetizar' },
  ],
  pregunta: { frase: 'qué caso de éxito', texto: '¿Qué caso de éxito o qué error costoso de tu negocio podría ser tu próxima pieza de contenido?' },
});

export const frio = pag({
  id: 'ad-frio', titulo: 'Alcance', destaque: 'en frío',
  bajada: 'Lista, personalización y volumen.',
  inicio: 'alcance en frío el tercer canal',
  anclas: {
    desconocidos: 'uno a uno con desconocidos', problemas: 'tres problemas que resolver', lista: 'conseguir la lista', personalizar: 'personalizar los primeros segundos', valor: 'valor inmediato',
    volumen: 'tercero el volumen', correo: 'un correo por ejemplo', predecir: 'predecir ingresos', apertura: 'treinta por ciento de apertura', tres: 'un tres por ciento', uno: 'un uno por ciento de clientes',
    llamadas: 'en llamadas un representante', cita: 'ciento veinte por cita', cliente: 'trescientos sesenta dólares', retorno: 'diez a uno',
  },
  tarjetas: [
    { rotulo: 'Tres problemas', texto: 'Conseguir la lista, personalizar los primeros segundos y sostener el volumen.', frase: 'tres problemas que resolver' },
    { rotulo: 'Correo en frío', texto: '30 % abre → 10 % de esos responde: 3 % prospectos y 1 % clientes.', frase: 'treinta por ciento de apertura' },
    { rotulo: 'Llamadas en frío', texto: '120 por cita, 1 de 3 cierra: 360 por cliente frente a 3.600 de ganancia → 10 a 1.', frase: 'en llamadas un representante', destacada: true },
  ],
  pregunta: { frase: 'qué dato específico', texto: '¿Qué dato específico de la operación de tu cliente ideal usarías para personalizar el primer contacto?' },
});

export const anuncios = pag({
  id: 'ad-anuncios', titulo: 'Anuncios', destaque: 'pagados',
  bajada: 'Llamado inicial, desarrollo de valor y llamado a la acción.',
  inicio: 'anuncios pagados el cuarto canal',
  anclas: {
    partes: 'tiene tres partes', inicial: 'el llamado inicial el desarrollo', ochenta: 'el ochenta por ciento del éxito', etiquetas: 'etiquetas locales', si: 'se responden con un sí',
    condicionales: 'condicionales del tipo', portavoz: 'un portavoz', matriz: 'la matriz qué quién', que: 'el qué son', opuestos: 'la pesadilla el riesgo', quien: 'el quién son',
    cuando: 'y el cuándo', cierre: 'el cierre es una instrucción', captura: 'un sitio de captura',
  },
  tarjetas: [
    { rotulo: 'Los primeros 5 segundos', texto: 'El 80 % del éxito: etiquetas, preguntas de sí, condicionales y un portavoz como el cliente.', frase: 'el ochenta por ciento del éxito', destacada: true },
    { rotulo: 'Qué, quién y cuándo', texto: 'Las cuatro variables y sus opuestos, ante quienes le dan estatus, en pasado, presente y futuro.', frase: 'la matriz qué quién' },
    { rotulo: 'El cierre', texto: 'Una instrucción explícita a un sitio de captura que repite el lenguaje del anuncio.', frase: 'el cierre es una instrucción' },
  ],
  pregunta: { frase: 'qué frase de los primeros cinco segundos', texto: '¿Qué frase de los primeros cinco segundos haría que tu cliente ideal se reconozca de inmediato?' },
});

export const presupuesto = pag({
  id: 'ad-presupuesto', titulo: 'Presupuesto', destaque: 'de ensayo',
  bajada: 'Rastrear, perder controlado e imprimir.',
  inicio: 'para gestionar el dinero en anuncios',
  anclas: {
    fases: 'tres fases', rastrear: 'rastrear el dinero', perder: 'perder dinero de forma controlada', imprimir: 'e imprimir dinero', exige: 'la primera exige', nueve: 'nueve de cada diez',
    decimo: 'el décimo multiplicará', regla: 'una regla de presupuesto', dos: 'dos veces el efectivo', cien: 'te deja cien dólares', apagas: 'lo apagas', doscientos: 'hasta doscientos dólares',
    tercera: 'la tercera fase', protege: 'la regla protege la caja',
  },
  tarjetas: [
    { rotulo: 'Tres fases', texto: 'Rastrear el dinero, perderlo de forma controlada e imprimirlo.', frase: 'tres fases' },
    { rotulo: 'La regla', texto: 'Presupuesto de ensayo = 2 × el efectivo de un cliente en 30 días.', frase: 'una regla de presupuesto', destacada: true },
    { rotulo: 'Ejemplo', texto: '100 sin prospectos: se apaga. Con prospectos: hasta 200 para lograr una venta.', frase: 'te deja cien dólares' },
  ],
  pregunta: { frase: 'cuánto efectivo te deja', texto: '¿Cuánto efectivo te deja un cliente nuevo en sus primeros treinta días?' },
});

export const financiada = pag({
  id: 'ad-financiada', titulo: 'Adquisición', destaque: 'financiada por el cliente',
  bajada: 'Que el primer mes pague la publicidad.',
  inicio: 'adquisición financiada por el cliente',
  anclas: {
    capital: 'sin capital al escalar', primer: 'el primer mes de cada cliente', quince: 'quince dólares al mes', diez: 'diez de margen', meses: 'duran diez meses', vida: 'la ganancia de por vida',
    treinta: 'gastar treinta', pierdes: 'pierdes veinte', vacia: 'más se vacía la caja', solucion: 'una venta adicional', cinco: 'uno de cada cinco clientes', veinte: 'veinte dólares promedio',
    empatas: 'y empatas al instante', limitado: 'ya no está limitado',
  },
  tarjetas: [
    { rotulo: 'El problema', texto: '15 al mes, 10 de margen, 10 meses = 100 de por vida; adquirir cuesta 30 y el primer mes deja 10: −20.', frase: 'quince dólares al mes' },
    { rotulo: 'La solución', texto: 'Venta adicional de 100 al registrarse; la compra 1 de cada 5: +20 por cliente.', frase: 'una venta adicional', destacada: true },
    { rotulo: 'El resultado', texto: '10 + 20 = 30 cobrados en 30 días: la publicidad se paga sola.', frase: 'y empatas al instante' },
  ],
  pregunta: { frase: 'qué venta adicional', texto: '¿Qué venta adicional, al momento de contratar, te permitiría recuperar la publicidad en el primer mes?' },
});

export const mas = pag({
  id: 'ad-mas', titulo: 'Más:', destaque: 'la regla del cien',
  bajada: 'Casi todo lo que no funciona opera a una fracción del volumen.',
  inicio: 'escalamiento y apalancamiento',
  anclas: {
    protocolo: 'más mejor y nuevo', cien: 'la regla del cien', contactos: 'cien contactos diarios', minutos: 'cien minutos al día', dias: 'cien días seguidos', mediodia: 'hasta el mediodía',
    trescientos: 'trescientos volantes', vecino: 'un vecino enojado', concluyo: 'no funcionaban', mentor: 'su mentor', cincomil: 'cinco mil volantes', dia: 'cinco mil por día',
    fraccion: 'una fracción ridícula', correos: 'una secuencia de correos', tasa: 'su tasa real',
  },
  tarjetas: [
    { rotulo: 'La regla del cien', texto: '100 contactos o 100 minutos al día, durante 100 días, sin reuniones hasta el mediodía.', frase: 'la regla del cien', destacada: true },
    { rotulo: 'Los volantes', texto: '300 volantes y nadie llamó; el ensayo mínimo de su mentor eran 5.000, y luego 5.000 por día.', frase: 'trescientos volantes' },
    { rotulo: 'En B2B', texto: 'Una secuencia abandonada tras 50 correos nunca mostró su tasa real.', frase: 'una secuencia de correos' },
  ],
  pregunta: { frase: 'qué táctica abandonaste', texto: '¿Qué táctica abandonaste antes de llegar al volumen que necesitaba para funcionar?' },
});

export const mejor = pag({
  id: 'ad-mejor', titulo: 'Mejor', destaque: 'y nuevo',
  bajada: 'Optimiza solo la restricción.',
  inicio: 'cuando el volumen máximo rompe el sistema',
  anclas: {
    cuello: 'el cuello de botella', goldratt: 'eliyahu goldratt', eslabon: 'su eslabón más débil', embudo: 'un embudo donde', datos: 'deja sus datos', solicitud: 'completa la solicitud',
    agenda: 'el cincuenta por ciento agenda', primero: 'el primer paso', diecisiete: 'diecisiete por ciento', ultimo: 'el último', diez: 'crece un diez por ciento', restriccion: 'a la restricción',
    duplicas: 'duplicas los clientes', experimento: 'un solo experimento', nuevo: 'pasas a nuevo', ubicaciones: 'nuevas ubicaciones', plataforma: 'una nueva plataforma', canal: 'un canal nuevo',
  },
  tarjetas: [
    { rotulo: 'Teoría de restricciones (Goldratt)', texto: 'La capacidad del sistema la fija su eslabón más débil.', frase: 'eliyahu goldratt' },
    { rotulo: 'Cinco puntos, tres resultados', texto: '30→35 %: +17 %. 50→55 %: +10 %. La restricción 5→10 %: ×2.', frase: 'un embudo donde', destacada: true },
    { rotulo: 'Nuevo, en orden', texto: 'Nuevos formatos en tu plataforma → nueva plataforma → nuevo canal.', frase: 'pasas a nuevo' },
  ],
  pregunta: { frase: 'en qué etapa exacta', texto: '¿En qué etapa exacta de tu embudo se cae más gente hoy?' },
});

export const referidos = pag({
  id: 'ad-referidos', titulo: 'Clientes', destaque: 'que refieren',
  bajada: 'Más referidos que cancelaciones.',
  inicio: 'los cuatro multiplicadores de prospección',
  anclas: {
    horas: 'tus propias horas', aliados: 'cuatro tipos de aliados', refieren: 'clientes que refieren empleados', empirico: 'tienen respaldo empírico', dieciseis: 'un dieciséis por ciento más',
    cancelan: 'más de lo que cancelan', voluntad: 'su buena voluntad', prometes: 'prometes un poco menos', agendas: 'agendas siempre', amarras: 'amarras tu garantía', pides: 'pides el referido',
    paypal: 'paypal y dropbox', firma: 'momento de la firma', descuento: 'un descuento en el cierre', tarjetas: 'tarjetas de regalo',
  },
  tarjetas: [
    { rotulo: 'Schmitt, Skiera y Van den Bulte (2011)', texto: 'Un cliente referido vale al menos un 16 % más.', frase: 'tienen respaldo empírico', destacada: true },
    { rotulo: 'Buena voluntad', texto: 'Prometer menos y cumplir más, agendar la siguiente reunión y amarrar la garantía a los primeros 7 días.', frase: 'su buena voluntad' },
    { rotulo: 'Pedirlo activamente', texto: 'Incentivo de uno o dos lados, presentación al firmar, descuento por referidos, tarjeta de regalo.', frase: 'pides el referido' },
  ],
  pregunta: { frase: 'en qué momento de tu relación', texto: '¿En qué momento de tu relación con el cliente sería más natural pedir un referido?' },
});

export const aliados = pag({
  id: 'ad-aliados', titulo: 'Empleados, agencias', destaque: 'y afiliados',
  bajada: 'Multiplicar la capacidad sin perder la habilidad.',
  inicio: 'los otros tres multiplicadores',
  anclas: {
    empleados: 'con los empleados', grupales: 'entrevistas grupales', documentas: 'documentas el proceso', demuestras: 'lo demuestras', dupliquen: 'que lo dupliquen', nomina: 'el retorno sobre la nómina',
    agencias: 'con las agencias', seis: 'seis meses', paralelo: 'en paralelo', supera: 'tu equipo supera', casa: 'queda en casa', afiliados: 'con los afiliados', calificas: 'los calificas',
    niveles: 'en tres niveles', integras: 'los integras',
  },
  tarjetas: [
    { rotulo: 'Empleados: tres pasos', texto: 'Documentar, demostrar y que lo dupliquen, hasta que la nómina rinda más de tres a uno.', frase: 'con los empleados' },
    { rotulo: 'Agencias: seis meses', texto: 'Te explican cada decisión mientras entrenas a tu equipo; la habilidad queda en casa.', frase: 'con las agencias' },
    { rotulo: 'Afiliados: tres niveles', texto: '25 % del costo de adquisición al entrar, 50 % al activarse, 100 % al mantener volumen.', frase: 'en tres niveles', destacada: true },
  ],
  pregunta: { frase: 'cuál de estos multiplicadores', texto: '¿Cuál de estos multiplicadores podrías poner en marcha en los próximos noventa días?' },
});

export const sintesis = pag({
  id: 'ad-sintesis', titulo: 'Síntesis:', destaque: 'convertirte en la casa',
  bajada: 'La disciplina está en el orden.',
  inicio: 'todo el método se sostiene',
  anclas: {
    secuencia: 'en una secuencia', economia: 'primero la economía', oferta: 'después una oferta', garantia: 'protegida por una garantía', iman: 'luego un imán', canal: 'un solo canal',
    optimizar: 'optimizar la restricción', aliados: 'sumar aliados', orden: 'la disciplina está en el orden', credito: 'crecimiento a crédito', manana: 'si mañana a primera hora',
    casa: 'convertirte en la casa',
  },
  tarjetas: [
    { rotulo: 'La secuencia', texto: 'Economía → oferta → imán → un canal con volumen → restricción → aliados.', frase: 'en una secuencia', destacada: true },
    { rotulo: 'El riesgo', texto: 'Publicidad sin una oferta que se financie sola es crecimiento a crédito.', frase: 'crecimiento a crédito' },
    { rotulo: 'Mañana', texto: 'Quita demora y esfuerzo, instala una garantía, prepara un diagnóstico y aplica la regla del cien.', frase: 'si mañana a primera hora' },
  ],
  pregunta: { frase: 'cuál será tu primer paso', texto: '¿Cuál será tu primer paso mañana?' },
});

export const ORDEN: PaginaAD[] = [
  portada, tresAUno, commodity, altoMargen, mercado, nicho, precioAlto, ecuacion, victorias, problemas, cubo, recortar, bonos, escasez, garantias, nombre,
  iman, tiposIman, calido, calidoMetricas, contenido, frio, anuncios, presupuesto, financiada, mas, mejor, referidos, aliados, sintesis,
];

export const PAGINAS: Record<string, PaginaAD> = Object.fromEntries(ORDEN.map((p) => [p.id, p]));
