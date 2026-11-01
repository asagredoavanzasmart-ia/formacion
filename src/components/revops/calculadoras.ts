import type { PaginaRO } from './tipos';

/* Páginas de «RevOps» que siguen siendo calculadoras: la narración rellena sus campos (cada marca aplica un
   estado) y, con el audio en pausa o fuera de la clase guiada, quedan libres para usarlas. */

export const diagnostico: PaginaRO = {
  id: 'ro-2-diagnostico', pagina: 7, audio: 'p07', calculadora: true,
  titulo: 'Diagnóstico:', destaque: '¿cómo está tu RevOps hoy?',
  bajada: 'Diez afirmaciones, de 0 a 4 puntos cada una.',
  inicio: '',
  frases: ['cada una de las diez afirmaciones', 'donde 4 es siempre', 'todas parten en 2', 'la primera habla del tiempo', 'las siguientes de datos', 'las últimas de gobierno', 'la columna derecha suma', 'de 0 a 16 puntos', 'de 17 a 31', 'de 32 a 40', 'se repite cada trimestre', 'la nota al pie', 'aplicaciones saas'],
  els: [],
  tarjetas: [],
  pregunta: { frase: 'cuál de las diez afirmaciones', texto: '¿Cuál de las diez afirmaciones crees que tendría el puntaje más bajo en tu organización, y por qué?' },
};

export const calculadoraSLA: PaginaRO = {
  id: 'ro-4-calculadora', pagina: 19, audio: 'p19', calculadora: true,
  titulo: 'Calcula', destaque: 'tu SLA', bajada: '', inicio: '',
  frases: ['con tres datos de un año', 'la estacionalidad es normal', 'las tasas salen de contar', 'el ticket es la suma', 'de atrás hacia adelante', 'una meta de', 'un ticket de', 'exigen 20 negocios', 'con 25 de cierre', 'exigen 80 oportunidades', 'con 20 de lead a oportunidad', 'exigen 400 leads', 'las barras muestran la cadena', 'cualquier campo que cambie', 'si la meta es anual', 'lo correcto es dividir', 'el plazo 24 horas', 'tu sla cada mes', 'referencia real'],
  els: [], tarjetas: [],
  pregunta: { frase: 'conoces las tres tasas', texto: '¿Conoces las tres tasas de tu empresa con datos de un año completo, o solo una intuición?' },
};

export const valorLead: PaginaRO = {
  id: 'ro-4-valor', pagina: 20, audio: 'p20', calculadora: true,
  titulo: 'Valor del lead,', destaque: 'no volumen de leads', bajada: '', inicio: '',
  frases: ['no todos los mql', 'descargas de ebooks', 'dónde están las solicitudes de demo', 'un sla por cantidad', 'las barras comparan', 'la descarga de ebook', 'la solicitud de demo', 'la leyenda da la regla', 'con 150 descargas y 50 demos', 'con 100 demos', 'con 300 ebooks', 'una cuota de ingresos', 'el sla avanzado', 'la fuente original dice', 'no aparezcas aquí', 'cinco intentos', 'el mismo nivel de responsabilidad'],
  els: [], tarjetas: [],
  pregunta: { frase: 'qué tipo de lead de tu empresa', texto: '¿Qué tipo de lead de tu empresa se cuenta igual que los demás aunque cierre mucho más?' },
};

export const velocidades: PaginaRO = {
  id: 'ro-4-velocidades', pagina: 23, audio: 'p23', calculadora: true,
  titulo: 'Velocidad de marketing y', destaque: 'velocidad de ventas', bajada: '', inicio: '',
  frases: ['dos cálculos', 'una pieza de contenido', 'tres campos', 'piezas al año', 'leads por pieza', 'horas por pieza', 'tres resultados', 'leads por hora', 'horas por lead', 'horas al año', 'jamie shanks', '250 blogs al año', '5 leads por blog', '3 horas cada uno', 'bajar cada blog a 1 hora', 'el ejercicio se repite', 'velocidad de ventas', 'con 40 oportunidades', 'un ticket de', '25 de cierre', '60 días de ciclo', 'el equipo procesa', 'si la meta mensual es mayor', 'si la tasa de cierre es baja'],
  els: [], tarjetas: [],
  pregunta: { frase: 'qué pieza de contenido', texto: '¿Qué pieza de contenido de tu empresa consume más horas en relación con los leads que genera?' },
};

export const copq: PaginaRO = {
  id: 'ro-7-copq', pagina: 38, audio: 'p38', calculadora: true,
  titulo: 'El costo', destaque: 'de la mala calidad', bajada: '', inicio: '',
  frases: ['eso es un gasto nuevo', 'el copq', 'cuánto cuesta no mejorar', 'estás perdiendo', 'cuatro categorías', 'las fallas internas', 'las fallas externas', 'la evaluación es', 'la prevención es', 'no es un gasto nuevo es prevención', 'la lógica que las une', 'una propuesta de mejora es una x', 'el caso de la calculadora', '10 vendedores', 'una hora diaria', '260 días al año', 'a 50 la hora', 'horas de venta perdidas', 'pagados a vendedores', 'contratar una persona de operaciones', 'ahorro neto', 'un año completo de trabajo'],
  els: [], tarjetas: [],
  pregunta: { frase: 'qué tarea repetitiva', texto: '¿Qué tarea repetitiva de tu equipo, multiplicada por un año, costaría más que contratar a alguien para resolverla?' },
};
