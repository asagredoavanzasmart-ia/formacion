import type { PaginaRO } from './tipos';

/* «RevOps», lección 6: gestión de sistemas. Las `frases` son anclas literales de la narración. */

export const proceso: PaginaRO = {
  id: 'ro-6-proceso', pagina: 32, audio: 'p32',
  titulo: 'Primero el proceso,', destaque: 'después la herramienta',
  bajada: 'Las herramientas aceleran el proceso que ya existe: si no está definido, se acelera en la dirección equivocada.',
  inicio: '',
  frases: ['van en este orden', 'las herramientas aceleran', 'en la dirección equivocada', 'la pirámide se lee', '1 definir procesos', '2 gobierno de datos', '3 stack tecnológico', 'se apoya en el anterior', 'área 1 definir procesos', 'enrutamiento y puntaje', 'abm', 'datos de intención', 'estamos todos de acuerdo', 'todos lo describen igual', 'área 2 gobierno de datos', 'las reglas que mantienen', 'qué campos existen', 'hacia dónde se sincronizan', 'área 3 stack tecnológico', 'servir al proceso', 'daniel remedios', 'multiplicador de fuerza', 'más confusión y más rápido', 'asia corbett', 'dos reportes daban distinto', 'definiciones distintas', 'extender el mapa', 'antes del pipeline', 'después del cierre', 'los traspasos entre equipos', 'el modelo de datos se protege', 'acuerdan el modelo', 'se rompen', 'quién es cliente'],
  els: [],
  tarjetas: [
    { rotulo: 'Tres áreas en orden', texto: 'Definir procesos, gobierno de datos y stack tecnológico: cada piso se apoya en el anterior.', frase: 'la pirámide se lee', destacada: true },
    { rotulo: 'Un multiplicador', texto: 'La herramienta multiplica lo que hay: un proceso confuso, multiplicado, es más confusión y más rápido.', frase: 'daniel remedios' },
    { rotulo: 'Una sola definición', texto: 'Dos reportes correctos se contradicen si cada área llama SQL a algo distinto. El modelo de datos se protege.', frase: 'asia corbett' },
  ],
  pregunta: { frase: 'qué definición como sql', texto: '¿Qué definición, como SQL o cliente activo, significa cosas distintas para dos áreas de tu empresa?' },
};

export const gobierno: PaginaRO = {
  id: 'ro-6-gobierno', pagina: 33, audio: 'p33',
  titulo: 'Gobierno', destaque: 'de datos',
  bajada: 'Las reglas que permiten creer en un dato, porque con esos datos se decide.',
  inicio: '',
  frases: ['un marco interno', 'la disponibilidad', 'las normas y políticas', 'debe encabezarlo', 'la torre de bloques', 'en sin reglas', 'se tambalean', 'todo se cae', 'en con gobierno', 'simple documentada y estable', 'asia corbett', 'un crm de 10 años', 'arriesgaba que todo se cayera', 'un diccionario de datos', 'sus columnas son', 'el sistema de registro', 'las filas muestran', 'código postal y zip', 'región y estado', 'nombre con apellido', 'monto y total facturado', 'la fila seleccionada', 'la dirección de sincronización', 'la causa más común', 'controles mínimos', 'no todos pueden borrar', 'son obligatorios', 'dirección y responsable', 'regla de la casa', 'hay que quitar complejidad', 'suma mantenimiento futuro', 'bryan semple', 'debe reportarlo cada semana', 'suele abandonarse', 'se elimina'],
  els: [],
  tarjetas: [
    { rotulo: 'Sin reglas o con gobierno', texto: 'Una torre que se cae al sacar una pieza, o una estructura simple, documentada y estable.', frase: 'la torre de bloques' },
    { rotulo: 'El diccionario de datos', texto: 'Cada dato con su nombre en cada sistema, su sincronización y el sistema que manda.', frase: 'un diccionario de datos', destacada: true },
    { rotulo: 'Controles mínimos', texto: 'No todos borran ni crean, hay campos obligatorios y quien pide un campo lo reporta cada semana.', frase: 'controles mínimos' },
  ],
  pregunta: { frase: 'cuántos campos de tu crm', texto: '¿Cuántos campos de tu CRM existen hoy sin que nadie sepa para qué se crearon?' },
};

export const indicadores: PaginaRO = {
  id: 'ro-6-indicadores', pagina: 34, audio: 'p34',
  titulo: 'Indicadores adelantados y', destaque: 'la historia detrás del número',
  bajada: 'Los ingresos informan tarde: para corregir a tiempo hay que vigilar lo que avisa antes.',
  inicio: '',
  frases: ['un indicador rezagado', 'los indicadores adelantados', 'dwamian mcleish', 'informa tarde', 'una cadena de cuatro esferas', 'las tres primeras', 'la última ingresos', 'más tickets de soporte pueden anticipar', 'suben los tickets', 'cae el uso', 'se acerca la renovación', 'ingresos indicador rezagado', 'pueden pasar meses', 'el dato se lee como una historia', '100000 visitas', 'lo normal son', 'una gran noticia', 'la tasa de rebote', 'de un país donde no se vende', 'tráfico de bots', 'la conclusión', 'el ejemplo es de devyn bellamy', 'los buenos reportes', 'qué quiere saber', 'no de una plantilla', 'para qué sirve todo esto', 'qué palancas mueven', 'una empresa pequeña o mediana', 'un equipo de analistas'],
  els: [],
  tarjetas: [
    { rotulo: 'La cadena', texto: 'Tickets de soporte, uso del producto y riesgo de renovación avisan meses antes de que caigan los ingresos.', frase: 'una cadena de cuatro esferas', destacada: true },
    { rotulo: 'La historia del número', texto: '100.000 visitas, 99 % de rebote y un país donde no se vende: no es un triunfo, son bots.', frase: 'el dato se lee como una historia' },
    { rotulo: 'Reportes con pregunta', texto: 'Preguntar qué quieren saber, no qué reporte quieren ver. Basta con las herramientas que ya tienes.', frase: 'los buenos reportes' },
  ],
  pregunta: { frase: 'qué indicador adelantado', texto: '¿Qué indicador adelantado anticiparía mejor la pérdida de clientes en tu empresa?' },
};

export const stack: PaginaRO = {
  id: 'ro-6-stack', pagina: 35, audio: 'p35',
  titulo: 'Administrar el', destaque: 'stack tecnológico',
  bajada: 'La meta no es un stack pequeño, sino que cada herramienta tenga una razón.',
  inicio: '',
  frases: ['heredar un stack desordenado', 'compró herramientas sin pensar', 'debe tener voz', 'tenga una razón', 'un mapa de flujo de valor', 'el camino del cliente por los sistemas', 'hoy 7 sistemas', 'siete traspasos', 'llegar tarde o cambiado', 'integrado 3 sistemas', 'recorrido corto', 'dwamian mcleish', 'sin ningún beneficio', 'voy a sacar cuatro sistemas', 'la herramienta favorita', 'sacar un sistema también es un cambio', 'puede resistirse', 'dejarían de capturar', 'revops no es ti', 'en el porqué', 'la eficiencia de ingresos', 'crece sin control', 'cuatro preguntas', 'ya lo hace lo que hay', 'quién la aprueba', 'la tarjeta de la empresa', 'su propio chat', 'profundidad o complejidad', 'espagueti', 'vale la pena automatizar', 'se resuelve a mano'],
  els: [],
  tarjetas: [
    { rotulo: 'El mapa de flujo de valor', texto: 'Hoy, siete sistemas y siete traspasos; integrado, tres y un recorrido corto donde los datos no se pierden.', frase: 'un mapa de flujo de valor', destacada: true },
    { rotulo: 'RevOps no es TI', texto: 'TI hace que funcione; RevOps pregunta para qué existe cada sistema.', frase: 'revops no es ti' },
    { rotulo: 'Cuatro preguntas', texto: '¿Ya lo hace lo que hay? ¿Quién la aprueba? ¿Profundidad o complejidad? ¿Vale la pena automatizar?', frase: 'cuatro preguntas' },
  ],
  pregunta: { frase: 'por cuántos sistemas pasa hoy', texto: '¿Por cuántos sistemas pasa hoy un cliente de tu empresa desde que es lead hasta que renueva?' },
};
