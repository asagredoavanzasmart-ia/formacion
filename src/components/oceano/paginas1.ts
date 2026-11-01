import type { Pagina } from '../influencia/tipos';

/* «Estrategia del océano azul», secciones 1 a 6: del océano rojo al azul, la innovación en valor, las cuatro acciones y la curva de valor. */

export const portada: Pagina = {
  id: 'oa-portada',
  titulo: 'Salir de la', destaque: 'competencia',
  bajada: 'Crear un mercado propio en lugar de pelear por el que ya existe.',
  inicio: 'imagina un mercado donde',
  frases: ['pelear con nadie', 'nacido en 1952', 'nacida en 1963', 'blue ocean strategy institute', 'en 2005', '43 lenguas', 'tres millones y medio', 'océano rojo', 'las críticas'],
  els: [],
  tarjetas: [
    { rotulo: 'Los autores', texto: 'Kim y Mauborgne, profesores de estrategia y codirectores del Blue Ocean Strategy Institute, en INSEAD.', frase: 'nacido en 1952' },
    { rotulo: 'La obra', texto: 'Blue Ocean Strategy (2005): 43 lenguas y más de tres millones y medio de ejemplares.', frase: '43 lenguas', destacada: true },
    { rotulo: 'El recorrido', texto: 'Océanos, innovación en valor, herramientas, dos casos reales y las críticas al modelo.', frase: 'océano rojo' },
  ],
  pregunta: { frase: 'qué cambiaría en tu negocio', texto: '¿Qué cambiaría en tu negocio si dejaras de mirar a los competidores y miraras a los clientes que hoy no te compran?' },
};

export const rojoAzul: Pagina = {
  id: 'oa-rojo-azul',
  titulo: 'Océanos rojos y', destaque: 'océanos azules',
  bajada: 'Mercados saturados donde se pelea, frente a mercados nuevos donde se avanza solo.',
  inicio: 'océanos rojos y océanos azules',
  frases: ['dos tipos de mercado', 'mercados saturados', 'combaten ferozmente', 'ciclo de vida', 'carrera a la baja', 'fronteras que todos aceptan', 'se multiplican', 'son lo contrario', 'avanza sola', 'infinidad', 'teoría tradicional', 'ejemplo imaginario', 'dos distribuidoras', 'una tercera'],
  els: [],
  tarjetas: [
    { rotulo: 'Océano rojo', texto: 'Mercado saturado, con fronteras que todos aceptan, donde muchos actores pelean por la misma cuota.', frase: 'mercados saturados' },
    { rotulo: 'Océano azul', texto: 'Campo nuevo donde una empresa avanza sola, gracias a una innovación radical que crea demandas nuevas.', frase: 'son lo contrario', destacada: true },
    { rotulo: 'Salida', texto: 'Dejar de disputar al mismo cliente y hablarle a otro que hoy nadie atiende.', frase: 'una tercera' },
  ],
  pregunta: { frase: 'en cuál de los dos océanos', texto: '¿En cuál de los dos océanos está navegando tu empresa hoy?' },
};

export const valor: Pagina = {
  id: 'oa-valor',
  titulo: 'Innovación', destaque: 'en valor',
  bajada: 'Valor para el cliente y para la empresa a la vez; la tecnología sola no basta.',
  inicio: 'la clave para pasar de uno a otro',
  frases: ['innovación en valor', 'no basta con la tecnología', 'dos partes a la vez', 'más valor para los compradores', 'estructura de costes', 'decisión voluntaria', 'preguntas incómodas', 'sobre todo hombres', 'intermediarios profesionales', 'mundo de expertos', 'subir precios', 'más destinatarios', 'costes fijos', 'ordenadores personales', 'consultora imaginaria', 'pequeña y mediana empresa', 'formato simple'],
  els: [],
  tarjetas: [
    { rotulo: 'Dos partes a la vez', texto: 'El valor tiene sentido para el cliente al que hay que satisfacer y para la empresa que busca rendimiento.', frase: 'dos partes a la vez', destacada: true },
    { rotulo: 'Preguntas incómodas', texto: '¿Y si lo compraran mujeres? ¿Y si fuera directo al cliente final? ¿Y si se volviera accesible?', frase: 'preguntas incómodas' },
    { rotulo: 'No siempre sube el precio', texto: 'Más compradores reparten los costes fijos y prescindir de lo accesorio abarata la oferta.', frase: 'subir precios' },
  ],
  pregunta: { frase: 'qué pregunta incómoda', texto: '¿Qué pregunta incómoda sobre tu mercado nadie se ha atrevido a hacer?' },
};

export const acciones: Pagina = {
  id: 'oa-acciones',
  titulo: 'Eliminar, reducir,', destaque: 'aumentar y crear',
  bajada: 'Cuatro decisiones sobre cada factor del mercado; el Logan de Renault las muestra.',
  inicio: 'eliminar, reducir, aumentar y crear',
  frases: ['cuáles reforzar', 'cuáles mitigar', 'cuáles excluir', 'cuáles crear', 'desplazar el cursor', 'el logan', 'louis schweitzer', 'low cost', 'carrera por el más', 'renunció a la idea del lujo', 'fábrica dacia', 'salpicadero', 'extremadamente robusto', 'coche familiar', 'twingo', 'cuatro mil quinientos', 'siete mil quinientos', 'segunda mano', 'a escala pequeña', 'eliminar los módulos', 'reducir la implementación', 'aumentar la facilidad', 'un aviso diario'],
  els: [],
  tarjetas: [
    { rotulo: 'Cuatro acciones', texto: 'Reforzar, mitigar, excluir y crear factores que ni figuraban en la lista inicial.', frase: 'cuáles reforzar', destacada: true },
    { rotulo: 'Logan, de Renault', texto: 'Un coche low cost, robusto y familiar: 4 500 euros en emergentes y 7 500 en Francia.', frase: 'el logan' },
    { rotulo: 'A escala pequeña', texto: 'Un programa de ventas: menos módulos, implementación en días, más facilidad y un aviso diario.', frase: 'a escala pequeña' },
  ],
  pregunta: { frase: 'cuál es ese más', texto: '¿Cuál es ese «más» que tu sector lleva años añadiendo y que quizá tus clientes ni valoran?' },
};

export const curva: Pagina = {
  id: 'oa-curva',
  titulo: 'La curva', destaque: 'de valor',
  bajada: 'Dibujar cómo compite una empresa: dos curvas pegadas significan que nadie se diferencia.',
  inicio: 'la curva de valor es la herramienta',
  frases: ['factores que ofrece', 'nivel que ofrece', 'unir los puntos', 'casi pegadas', 'ringling brothers', 'pequeño circo regional', 'compiten en lo mismo', 'cirque du soleil', 'elimina cuatro factores', 'reduce la diversión', 'aumenta el lugar único', 'crea cuatro factores', 'su precio queda', 'para dibujar la tuya', 'dos competidores', 'tres curvas se parecen'],
  els: [],
  tarjetas: [
    { rotulo: 'Cómo se lee', texto: 'Factores abajo, nivel de oferta a un costado; al unir los puntos aparece la curva de cada empresa.', frase: 'unir los puntos' },
    { rotulo: 'Circo contra circo', texto: 'Ringling y un circo regional compiten en lo mismo: sus curvas suben y bajan juntas.', frase: 'compiten en lo mismo' },
    { rotulo: 'Cirque du Soleil', texto: 'Elimina cuatro factores, reduce dos, aumenta uno y crea cuatro. Su curva va por otro camino.', frase: 'cirque du soleil', destacada: true },
  ],
  pregunta: { frase: 'en qué factores coincidirías', texto: '¿En qué factores coincidirías con tus competidores y en cuáles podrías separarte de ellos?' },
};

export const seis: Pagina = {
  id: 'oa-seis',
  titulo: 'Seis preguntas para', destaque: 'navegar al azul',
  bajada: 'Todas parten de ver el mercado como lo ve el cliente.',
  inicio: 'seis preguntas para navegar',
  frases: ['seis preguntas centrales', 'las alternativas', 'vacaciones', 'los grupos estratégicos', 'el precio y el rendimiento', 'la cadena de compradores', 'nespresso no vendió', 'los complementarios', 'apple', 'el contenido funcional', 'imagen de lujo', 'las grandes tendencias', 'medio ambiente', 'un gimnasio'],
  els: [],
  tarjetas: [
    { rotulo: 'Qué mirar', texto: 'Alternativas, grupos estratégicos y la cadena de compradores y usuarios.', frase: 'las alternativas' },
    { rotulo: 'Qué acompaña', texto: 'Complementarios, valor funcional o emocional y las grandes tendencias.', frase: 'los complementarios', destacada: true },
    { rotulo: 'En la práctica', texto: 'Un gimnasio compite también con entrenar en casa y con el tiempo libre de sus clientes.', frase: 'un gimnasio' },
  ],
  pregunta: { frase: 'cuál de estas seis preguntas', texto: '¿Cuál de estas seis preguntas te incomoda más al pensar en tu propio negocio?' },
};
