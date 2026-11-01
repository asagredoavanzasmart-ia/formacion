import type { Pagina } from '../influencia/tipos';

/* «Estrategia del océano azul», secciones 7 a 13: las cuatro etapas, los productos, los no clientes, la Wii, las críticas y la aplicación. */

export const etapas: Pagina = {
  id: 'oa-etapas',
  titulo: 'Cuatro etapas', destaque: 'visuales',
  bajada: 'Despertar, explorar, validar en el campo y comunicar, siempre con un dibujo.',
  inicio: 'cuatro etapas para llevarlo',
  frases: ['recorrido de cuatro etapas', 'el despertar visual', 'fortalezas y debilidades', 'consenso entre los equipos', 'la exploración visual', 'sin conocer a sus usuarios', 'no clientes', 'el trabajo de campo', 'personas de fuera', 'resistencia al cambio', 'la comunicación visual', 'nivel jerárquico', 'una forma concreta de empezar', 'cinco personas'],
  els: [],
  tarjetas: [
    { rotulo: 'Despertar visual', texto: 'Dibujar la curva de valor para crear consenso y ver cuánta diferenciación hay.', frase: 'el despertar visual', destacada: true },
    { rotulo: 'Exploración y campo', texto: 'Ir al terreno, preguntar también a los no clientes y validar con gente de dentro y de fuera.', frase: 'la exploración visual' },
    { rotulo: 'Comunicación visual', texto: 'Un dibujo nuevo para que todos, sin importar su nivel, se apropien de la estrategia.', frase: 'la comunicación visual' },
  ],
  pregunta: { frase: 'qué dibujo necesita', texto: '¿Qué dibujo necesita hoy tu equipo para entender hacia dónde va?' },
};

export const productos: Pagina = {
  id: 'oa-productos',
  titulo: 'Colonos, emigrantes', destaque: 'y pioneros',
  bajada: 'Tres familias de productos según cuánto se separan de la norma del sector.',
  inicio: 'productos colonos, emigrantes',
  frases: ['tres familias', 'dentro de la norma', 'curva de valor más habitual', 'forman parte del océano rojo', 'productos pioneros', 'valor sin precedentes', 'representan el océano azul', 'productos emigrantes', 'navegan entre los dos', 'no alcanza', 'foto honesta', 'haz el ejercicio'],
  els: [],
  tarjetas: [
    { rotulo: 'Colonos', texto: 'Dentro de la norma del sector y con un futuro muy limitado: pertenecen al océano rojo.', frase: 'dentro de la norma' },
    { rotulo: 'Emigrantes', texto: 'Mejoran el valor, pero no alcanzan para instalarse en el azul por mucho tiempo.', frase: 'productos emigrantes' },
    { rotulo: 'Pioneros', texto: 'Crean un valor sin precedentes y encuentran una gran masa de clientes: el océano azul.', frase: 'productos pioneros', destacada: true },
  ],
  pregunta: { frase: 'en cuál de las tres familias', texto: '¿En cuál de las tres familias caería hoy tu producto estrella?' },
};

export const noClientes: Pagina = {
  id: 'oa-no-clientes',
  titulo: 'La conquista de', destaque: 'los no clientes',
  bajada: 'Cambiar de proveedor no agranda el mercado; sumar a quien no compra, sí.',
  inicio: 'la conquista de los no clientes',
  frases: ['cuota de la competencia', 'mismo tamaño', 'amplía el mercado', 'tres niveles', 'no clientes inminentes', 'pret a manger', 'los anti', 'todoterreno', 'los inexplotados', 'clientes potenciales', 'un restaurante imaginario', 'demasiado caro', 'los trabajadores de la zona'],
  els: [],
  tarjetas: [
    { rotulo: 'Inminentes', texto: 'Compran ocasionalmente, esperando algo mejor. Cuantos más hay, más frágil es el mercado.', frase: 'no clientes inminentes' },
    { rotulo: 'Los anti', texto: 'No usan nunca el producto: se oponen o no pueden permitírselo.', frase: 'los anti' },
    { rotulo: 'Inexplotados', texto: 'Nadie los consideró como objetivo, pero son clientes potenciales.', frase: 'los inexplotados', destacada: true },
  ],
  pregunta: { frase: 'a qué personas nunca has considerado', texto: '¿A qué personas nunca has considerado como clientes?' },
};

export const wii: Pagina = {
  id: 'oa-wii',
  titulo: 'El caso de la Wii,', destaque: 'océano azul de Nintendo',
  bajada: 'Una consola para quienes nunca habían jugado, medida con las seis preguntas.',
  inicio: 'el caso de la wii',
  frases: ['en 2006', 'ochenta millones', 'las seis preguntas', 'pasatiempos', 'joystick', 'por debajo de la ps3', 'canal tienda wii', 'wiimote', 'báscula', 'tecnocultura', 'envejecimiento', 'la clave fueron', 'no peleó por los inminentes', 'sedujo a los anti', 'cuarenta millones', 'atrajo a los inexplotados', 'en 2012', 'wii u'],
  els: [],
  tarjetas: [
    { rotulo: 'Un mercado propio', texto: 'Deporte, baile y estar en forma con detección de movimiento, a un precio menor que la PS3 y la Xbox.', frase: 'las seis preguntas' },
    { rotulo: 'Wii Sports', texto: 'Más de 80 millones de ejemplares, por encima de los 40 millones de Super Mario Bros.', frase: 'cuarenta millones', destacada: true },
    { rotulo: 'Y después', texto: 'La Wii U de 2012 no repitió el éxito: tabletas y teléfonos generalizaron el juego.', frase: 'wii u' },
  ],
  pregunta: { frase: 'cuánto tiempo dura', texto: '¿Cuánto tiempo dura un océano azul?' },
};

export const limites: Pagina = {
  id: 'oa-limites',
  titulo: 'Límites', destaque: 'y críticas',
  bajada: 'El modelo se discute en varios frentes: rigor, definiciones y riesgo.',
  inicio: 'límites y críticas',
  frases: ['varios frentes', 'lectura a posteriori', 'todos los sectores', 'henry ford', 'extremos del modelo', 'cuántos actores', 'poco cuantificable', 'definición difusa', 'innovaciones incrementales', 'quince años', 'canibalización', 'marlboro', 'schumpeter', 'christensen y raynor'],
  els: [],
  tarjetas: [
    { rotulo: 'A posteriori', texto: 'Parte de éxitos espectaculares y busca después el concepto que los reúna.', frase: 'lectura a posteriori' },
    { rotulo: 'Definiciones difusas', texto: 'No se fija cuántos actores hacen un océano rojo ni cómo se mide el azul.', frase: 'cuántos actores', destacada: true },
    { rotulo: 'Sin receta', texto: 'Nespresso tardó quince años; además existe el riesgo de canibalizar lo propio.', frase: 'quince años' },
  ],
  pregunta: { frase: 'qué evidencia necesitarías', texto: '¿Qué evidencia necesitarías antes de apostar tu empresa a un océano azul?' },
};

export const aplicar: Pagina = {
  id: 'oa-aplicar',
  titulo: 'Cómo aplicarlo', destaque: 'en tu empresa',
  bajada: 'Una secuencia de preguntas para responder con tu equipo.',
  inicio: 'cómo aplicarlo en tu empresa',
  frases: ['secuencia de preguntas', 'el punto de partida', 'lo que sobra', 'lo que falta', 'hacia fuera', 'experimento pequeño', 'firma de contabilidad', 'elimina las visitas', 'reduce los informes', 'aumenta la claridad', 'resumen mensual', 'emprendedores', 'diez de ellos'],
  els: [],
  tarjetas: [
    { rotulo: 'Hacia dentro', texto: 'Factores de tu sector; qué eliminar o reducir; qué subir o crear.', frase: 'el punto de partida', destacada: true },
    { rotulo: 'Hacia fuera', texto: 'Tus no clientes inminentes, anti e inexplotados, y qué los separa de ti.', frase: 'hacia fuera' },
    { rotulo: 'Un experimento', texto: 'Probar con pocos antes de apostar toda la empresa a la nueva oferta.', frase: 'experimento pequeño' },
  ],
  pregunta: { frase: 'cuál de estos movimientos', texto: '¿Cuál de estos movimientos harías primero en tu empresa?' },
};

export const sintesis: Pagina = {
  id: 'oa-sintesis',
  titulo: 'Del rojo', destaque: 'al azul',
  bajada: 'Competir mejor y crear algo distinto son dos caminos diferentes.',
  inicio: 'en un mundo cada vez más competitivo',
  frases: ['se desgastan', 'las quiebras aumentan', 'otra salida', 'evoluciona sola', 'innovación en valor', 'valor de uso', 'modelo económico', 'desplazar las fronteras', 'replantear los valores', 'conquistar a los clientes', 'posicionamiento y de distribución', 'riesgos financieros', 'muy aleatorio', 'tan pocas empresas', 'dos caminos diferentes'],
  els: [],
  tarjetas: [
    { rotulo: 'La salida', texto: 'Moverse hacia espacios donde, en una etapa inicial, la empresa evoluciona sola.', frase: 'otra salida' },
    { rotulo: 'Cuatro movimientos', texto: 'Fronteras del mercado, valores y creencias, clientes ajenos y modo de posicionarse y distribuir.', frase: 'desplazar las fronteras', destacada: true },
    { rotulo: 'Con cautela', texto: 'Hay riesgos financieros y técnicos, y es incierto cómo reaccionarán los consumidores.', frase: 'riesgos financieros' },
  ],
  pregunta: { frase: 'qué tendrías que dejar', texto: '¿Qué tendrías que dejar de optimizar para empezar a inventar?' },
};
