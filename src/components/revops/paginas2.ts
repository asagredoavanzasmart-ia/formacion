import type { PaginaRO } from './tipos';

/* «RevOps», lecciones 4 a 6: SLA, proceso de ventas y sistemas. Las `frases` son anclas literales de la narración. */

export const porque: PaginaRO = {
  id: 'ro-4-porque', pagina: 18, audio: 'p18',
  titulo: 'Por qué marketing y ventas', destaque: 'necesitan un SLA',
  bajada: 'Un acuerdo de ida y vuelta: cada equipo es proveedor y cliente del otro.',
  inicio: '',
  frases: ['acuerdo de nivel de servicio', 'garantiza un resultado', 'de ida y vuelta', 'proveedor y cliente del otro', 'marketing promete leads calificados', 'ventas promete contactarlos', 'el punto naranja viaja', 'el rosado vuelve', 'la primera no sirve', 'dos cifras', 'el 69', 'solo el 7', 'sin un estudio de origen', 'la brecha que cierra el sla', 'metas distintas y hasta opuestas', 'volumen de leads', 'se queja de su calidad', 'un compromiso para cada lado', 'responsables en conjunto', 'ni más ni menos leads', 'el número exacto', 'una mezcla de ventas', 'una grande al trimestre', 'steve bookbinder', 'los leads que sobran', 'los que faltan', 'janet comenos', 'metas deben ser complementarias', 'los haga competir', 'matthew cook', 'el foco es uno solo'],
  els: [],
  tarjetas: [
    { rotulo: 'Un acuerdo de ida y vuelta', texto: 'Marketing promete leads calificados; ventas promete contactarlos a tiempo. Sin la segunda mitad, la primera no sirve.', frase: 'de ida y vuelta', destacada: true },
    { rotulo: 'La brecha', texto: 'Sin acuerdo, uno celebra el volumen y el otro se queja de la calidad. El SLA da un compromiso a cada lado.', frase: 'la brecha que cierra el sla' },
    { rotulo: 'Ni más ni menos', texto: 'El número exacto de leads y la mezcla de ventas que necesita ventas para llegar a su meta.', frase: 'ni más ni menos leads' },
  ],
  pregunta: { frase: 'qué meta de marketing', texto: '¿Qué meta de marketing y qué meta de ventas de tu empresa compiten hoy entre sí?' },
};

export const contacto: PaginaRO = {
  id: 'ro-4-contacto', pagina: 21, audio: 'p21', cortes: [[0, 150.6]],
  titulo: 'La parte más delicada:', destaque: 'qué tan rápido contactar',
  bajada: 'Lo antes posible: el SLA fija el plazo más rápido que el equipo puede cumplir, y luego lo acorta.',
  inicio: '',
  frases: ['lo antes posible', 'el sla fija', 'la probabilidad relativa', 'en menos de una hora', 'una hora después', 'a las 24 horas', 'una auditoría', '2241 empresas', '42 horas', 'le gana a casi toda', 'caso huify', 'dentro de 5 minutos', 'en una conferencia', 'alguien de éxito del cliente', 'sus ingresos por 6', 'todavía fresca', 'multiplica por 1000', 'no aparece en el estudio', 'para calificar el lead', 'caso peopledoc', 'dentro de marketing', 'las reuniones calificadas', 'el ritmo importa', 'una línea recta', 'súper campaña', 'tres semanas dormidas', 'lo primero desperdicia', 'vendedores ociosos', 'la línea cambia de forma', 'cuántas veces insistir', 'grandes medianas y pequeñas', 'investigación de mercado', 'se instala la medición', 'en 3 a 6 meses'],
  els: [],
  tarjetas: [
    { rotulo: 'La primera hora', texto: 'Contactar en menos de una hora multiplica por 60 la probabilidad de calificar el lead (HBR, 2011).', frase: 'la probabilidad relativa', destacada: true },
    { rotulo: 'Dos casos', texto: 'Huify llama todo lead en 5 minutos y sextuplicó sus ingresos; PeopleDoc subió 60 % sus reuniones calificadas.', frase: 'caso huify' },
    { rotulo: 'El ritmo', texto: 'Una línea recta hasta la meta del mes: ni súper campañas ni semanas dormidas. Medir y corregir en 3 a 6 meses.', frase: 'el ritmo importa' },
  ],
  pregunta: { frase: 'cuánto tarda hoy tu equipo', texto: '¿Cuánto tarda hoy tu equipo en responder a un lead nuevo, medido y no estimado?' },
};

export const judicial: PaginaRO = {
  id: 'ro-4-judicial', pagina: 22, audio: 'p22',
  titulo: 'Cuatro problemas del SLA y', destaque: 'la rama judicial',
  bajada: 'Todas las preocupaciones tienen solución si existen los sistemas correctos.',
  inicio: '',
  frases: ['cuatro preocupaciones típicas', 'en el diagrama', 'un lead en disputa', 'una mesa de líderes', 'sale hacia el equipo', 'decide un coo', 'no lo encabezan', 'pide más leads de los posibles', 'un número imposible', 'falte velocidad de marketing', 'tres palancas', 'llegan más leads de los que ventas atiende', 'la fórmula del libro', 'si la meta es', 'hay un problema antes de empezar', 'marketing también mueve', 'ventas rechaza leads', 'vuelve a nutrición', 'ventas lo contacta', 'existe la rama judicial', 'un grupo pequeño de líderes', 'así se tapa un embudo', 'los leads de marketing no sirven', 'tan buenos o tan malos como el mensaje', 'marcus sheridan', 'buen contenido genera buenos leads', 'cómo funciona la rama judicial', 'deben ser imparciales', 'pero no presidirla', 'la lista se achica', 'un turno rotativo', 'en una empresa pequeña', 'jen spencer'],
  els: [],
  tarjetas: [
    { rotulo: 'Más leads o menos capacidad', texto: 'Una meta imposible se replantea; si falta capacidad, se mide la velocidad de marketing y la de ventas.', frase: 'pide más leads de los posibles' },
    { rotulo: 'La rama judicial', texto: 'Un grupo pequeño e imparcial revisa cada lead rechazado o no contactado y decide qué equipo actúa.', frase: 'existe la rama judicial', destacada: true },
    { rotulo: 'El mensaje', texto: 'Los leads son tan buenos como el mensaje que los atrajo: buen contenido, buenos leads.', frase: 'los leads de marketing no sirven' },
  ],
  pregunta: { frase: 'cuando ventas descarta un lead', texto: 'Cuando ventas descarta un lead de marketing en tu empresa, ¿quién se entera y qué pasa con él?' },
};
