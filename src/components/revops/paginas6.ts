import type { PaginaRO } from './tipos';

/* «RevOps», lecciones 8 a 10: estructurar, contratar y evaluar. Las `frases` son anclas literales de la narración.
   La página 54 (prioridades diarias) aún no tiene audio y sigue como hoja de trabajo interactiva. */

export const silos: PaginaRO = {
  id: 'ro-8-silos', pagina: 45, audio: 'p45',
  titulo: 'Del organigrama actual', destaque: 'al ideal',
  bajada: 'RevOps puede funcionar con una estructura formal o con una cadencia informal, sin reorganizar toda la empresa.',
  inicio: '',
  frases: ['de dos maneras', 'con una estructura formal', 'a un mismo líder', 'con una cadencia informal', 'se reúnen periódicamente', 'el resultado buscado', 'mire el ciclo completo', 'tres modos', 'silos cada operación', 'nadie ve la fricción', 'estructura formal un líder', 'requiere reorganización', 'cadencia informal sin cambiar', 'el punto de entrada más frecuente', 'tres preguntas', 'dibujar el organigrama actual', 'dibujar el organigrama ideal', 'trazar la ruta', 'de quién se necesita apoyo'],
  els: [],
  tarjetas: [
    { rotulo: 'Silos', texto: 'Cada operación optimiza lo suyo y nadie ve la fricción que se genera entre ellas.', frase: 'silos cada operación' },
    { rotulo: 'Formal o informal', texto: 'Un líder de RevOps con autoridad real, o una reunión periódica entre los líderes de cada operación.', frase: 'estructura formal un líder', destacada: true },
    { rotulo: 'Tres preguntas', texto: 'El organigrama actual, el ideal y la ruta entre ambos, con quién apoya cada cambio.', frase: 'tres preguntas' },
  ],
  pregunta: { frase: 'qué modo describe mejor', texto: '¿Qué modo describe mejor a tu empresa hoy, y cuál sería realista alcanzar en un año?' },
};

export const capas: PaginaRO = {
  id: 'ro-8-capas', pagina: 46, audio: 'p46',
  titulo: 'Cómo crece', destaque: 'el equipo',
  bajada: 'Tres tipos de personas bajo operaciones, sumadas en equilibrio.',
  inicio: '',
  frases: ['tres tipos de personas', 'quienes ejecutan la misión', 'quienes administran sistemas', 'quienes hacen análisis', 'en equilibrio', 'genera desequilibrios', 'cuatro momentos de crecimiento', 'una persona', 'el punto de quiebre', 'tan estirado', 'se suma alguien que administre', 'ross nibur', 'cada botón', 'llega una persona de análisis', 'al crecer el alcance', 'seis a doce meses', 'bryan semple', 'configuraciones personalizadas', 'sumarlos despacio', 'los líderes de operaciones construyen', 'en el vacío', 'doug davidoff', 'prevención de ventas'],
  els: [],
  tarjetas: [
    { rotulo: 'Tres tipos', texto: 'Quienes ejecutan la misión, quienes administran sistemas y quienes hacen análisis, sumados en equilibrio.', frase: 'tres tipos de personas' },
    { rotulo: 'Cuatro momentos', texto: 'Una persona hasta el punto de quiebre; luego sistemas; luego análisis; y a escala, más de cada uno.', frase: 'cuatro momentos de crecimiento', destacada: true },
    { rotulo: 'Puentes', texto: 'Los líderes construyen relaciones con cada equipo; sin ese puente, «departamento de prevención de ventas».', frase: 'los líderes de operaciones construyen' },
  ],
  pregunta: { frase: 'si pudieras sumar una sola persona', texto: 'Si pudieras sumar una sola persona a tu equipo de operaciones, ¿sería de sistemas o de análisis?' },
};

export const necesidad: PaginaRO = {
  id: 'ro-9-necesidad', pagina: 48, audio: 'p48',
  titulo: '¿Hay que', destaque: 'contratar?',
  bajada: 'Antes de publicar un cargo, la pregunta es si la solución real es contratar.',
  inicio: '',
  frases: ['antes de publicar un cargo', 'matt volm describe', 'el punto de quiebre', 'tan estirada', 'contratar sin saber qué está fallando', 'resuelva el síntoma', 'la tabla mapea', 'si el desempeño es satisfactorio', 'si es insatisfactorio', 'si es nulo', 'la diferencia importa', 'tres causas explican', 'demasiadas tareas para pocas', 'faltan habilidades', 'también puede servir capacitar', 'no invierte lo suficiente', 'contratar no lo resuelve', 'agrupar en un mismo rol', 'un administrador de sistemas', 'qué tipo de perfil buscar'],
  els: [],
  tarjetas: [
    { rotulo: 'Síntoma o causa', texto: 'Contratar sin saber qué falla trae a alguien que resuelve el síntoma sin tocar la causa.', frase: 'contratar sin saber qué está fallando' },
    { rotulo: 'Tres causas', texto: 'Demasiadas tareas (contratar sirve), faltan habilidades (contratar o capacitar) o falta inversión (contratar no basta).', frase: 'tres causas explican', destacada: true },
    { rotulo: 'Un rol', texto: 'Agrupar en un rol las responsabilidades que comparten habilidades, y luego elegir el perfil.', frase: 'agrupar en un mismo rol' },
  ],
  pregunta: { frase: 'cuál de las tres causas', texto: '¿Cuál de las tres causas explica mejor lo que hoy no funciona en tu equipo?' },
};

export const cuadrante: PaginaRO = {
  id: 'ro-9-cuadrante', pagina: 49, audio: 'p49',
  titulo: 'Qué candidato', destaque: 'buscar',
  bajada: 'El perfil correcto depende de lo que el equipo necesita hoy, no del título más impresionante.',
  inicio: '',
  frases: ['tres perfiles distintos', 'el cuadrante ayuda', 'los dos ejes son', 'específicas o amplias', 'directa o transferible', 'las necesidades del equipo hoy', 'el especialista acreditado', 'credenciales estándar', 'aporta valor rápido', 'ross nibur', 'el líder de operaciones con experiencia', 'en la misma etapa', 'un motor de distribución de leads', 'el generalista en transición', 'empezó así', 'chloe barritault', 'al ingeniero de ventas', 'yuri dekiba', 'el contexto importa', 'el cuarto cuadrante', 'no se recomienda', 'sin dirección clara'],
  els: [],
  tarjetas: [
    { rotulo: 'Dos ejes', texto: 'Responsabilidades específicas o amplias; experiencia directa o transferible.', frase: 'los dos ejes son' },
    { rotulo: 'Tres perfiles', texto: 'Especialista acreditado, líder con experiencia en la misma etapa y generalista en transición.', frase: 'el especialista acreditado', destacada: true },
    { rotulo: 'El contexto', texto: 'Lo que funcionó en la empresa anterior no garantiza nada en la nueva.', frase: 'yuri dekiba' },
  ],
  pregunta: { frase: 'para el próximo rol', texto: 'Para el próximo rol que necesita tu equipo, ¿pesa más la experiencia directa o la capacidad de aprender rápido?' },
};

export const entrevista: PaginaRO = {
  id: 'ro-9-entrevista', pagina: 50, audio: 'p52',
  titulo: 'Evaluar', destaque: 'candidatos',
  bajada: 'El proceso de selección debe emular lo que la persona hará en terreno.',
  inicio: '',
  frases: ['hilmon sorey', 'debe emular', 'hará en terreno', 'bajo presión', 'estandarizarlo garantiza', 'favoritismos por afinidad', 'tres fases en secuencia', 'verificar la base técnica', 'señales de que la persona', 'evaluación de habilidades', 'para llevar a casa', 'chloe barritault', 'el proceso de razonamiento', 'entrevista cara a cara', 'preguntas estandarizadas', 'tres tipos de evaluación', 'personalidad que revela', 'conductual que muestra', 'habilidades que muestra', 'la pauta de ejemplo', 'la pregunta cuéntame', 'una respuesta sólida', 'una respuesta débil', 'comprensión básica de apis', 'una llamada de prueba', 'sandy robinson', 'más inteligentes que yo', 'medir los resultados'],
  els: [],
  tarjetas: [
    { rotulo: 'Emular el trabajo', texto: 'Si el cargo exige resolver con datos y sistemas bajo presión, la selección también; estandarizada para todos.', frase: 'debe emular', destacada: true },
    { rotulo: 'Tres fases', texto: 'Base técnica, evaluación de habilidades (importa el razonamiento) y entrevista cara a cara con preguntas iguales.', frase: 'tres fases en secuencia' },
    { rotulo: 'La pauta', texto: 'Una respuesta sólida trae números concretos; una débil habla de gustos.', frase: 'la pauta de ejemplo' },
  ],
  pregunta: { frase: 'qué tarea real de tu equipo', texto: '¿Qué tarea real de tu equipo podría convertirse en una prueba de habilidad para candidatos?' },
};

export const ciclo: PaginaRO = {
  id: 'ro-10-ciclo', pagina: 52, audio: 'p52b',
  titulo: 'Los tres', destaque: 'elementos',
  bajada: 'Recolectar datos, comunicarlos a los líderes con un plan y alinear a los equipos: un ciclo que no termina.',
  inicio: '',
  frases: ['un ciclo de tres elementos', 'recolectar datos', 'comunicarlos a los líderes', 'alinear a los equipos', 'también retroalimentan', 'el motor operativo permanente', 'tres elementos en rotación', 'recolectar datos implementar', 'todo lo demás es especulación', 'comunicar a líderes y comprometer', 'muestre la brecha', 'alinear equipos traducir', 'la fricción entre ellos crece', 'lyndon brathwaite', 'cómo van las conversiones', 'hay una brecha', 'hablar directamente con el equipo', 'grupo focal', 'jasmine powers', 'la señal aparece', 'mira la cadena completa', 'dónde cae la tasa', 'cuando todo marcha', 'poner refrigerante al motor', 'la próxima oportunidad', 'un mercado nuevo'],
  els: [],
  tarjetas: [
    { rotulo: 'El ciclo', texto: 'Recolectar datos, comunicar a los líderes con un plan y alinear a los equipos con métricas compartidas.', frase: 'un ciclo de tres elementos', destacada: true },
    { rotulo: 'Encontrar la brecha', texto: 'Seguir las conversiones hasta el ingreso y preguntar al equipo o a un grupo focal.', frase: 'lyndon brathwaite' },
    { rotulo: 'Cuando todo marcha', texto: 'Refrigerante al motor y a buscar la próxima oportunidad: un mercado o un segmento nuevo.', frase: 'cuando todo marcha' },
  ],
  pregunta: { frase: 'de los tres elementos', texto: 'De los tres elementos, ¿cuál está más débil hoy en tu empresa?' },
};

export const metas: PaginaRO = {
  id: 'ro-10-metas', pagina: 53, audio: 'p53', cortes: [[0, 139.9]],
  titulo: 'De la visión a las', destaque: 'metas trimestrales',
  bajada: 'RevOps es una inversión de uno a tres años.',
  inicio: '',
  frases: ['una inversión de 1 a 3 años', 'doug davidoff', 'te será más fácil', 'jasmine powers advierte', 'parece igual de alto', 'el costo por lead baja', 'la manera de leer', 'tres prioridades', 'por dónde empezar', 'los problemas cuantificables', 'clics de un formulario', 'si puedes medir la fricción', 'lo que nunca se suelta', 'el flujo de ingresos', 'paciencia con los resultados', 'el pago real llega', 'el plan de 12 meses', 'tres filas', 'en el primer trimestre', 'en el segundo', 'en el tercero', 'en el cuarto', 'jen spencer explica', 'rocas trimestrales', 'en el año 3', 'sarah doughty', 'al menos cada 12 meses'],
  els: [],
  tarjetas: [
    { rotulo: 'Paciencia', texto: 'A los 18 meses todo se vuelve más fácil; el costo por lead baja con el tiempo.', frase: 'una inversión de 1 a 3 años' },
    { rotulo: 'Tres prioridades', texto: 'Empezar por lo cuantificable, no soltar nunca el proceso de ventas y tener paciencia con los resultados.', frase: 'tres prioridades', destacada: true },
    { rotulo: 'El plan', texto: 'Metas, métricas y éxito por trimestre, bajando las metas a tres años a rocas trimestrales.', frase: 'el plan de 12 meses' },
  ],
  pregunta: { frase: 'qué meta de este trimestre', texto: '¿Qué meta de este trimestre te acercaría más a la visión de largo plazo de tu empresa?' },
};
