import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Rol, Monitor, Hoja, Visto, Cruz, Flujo, Bombilla, Engranaje, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «Un equipo se diseña como un edificio», en cinco tomas.
 * 1 · Un vendedor trabaja cada vez más (la pila de tareas crece) y vende cada vez menos (la curva cae);
 *     no es la persona: es cómo está armado el equipo, con un cuello de botella donde se atascan los clientes.
 * 2 · El plano: no basta con buenos vendedores bajo un jefe; el plano responde cómo entra el cliente,
 *     quién hace qué, cómo viaja la información y qué lo sostiene (los cimientos se iluminan).
 * 3 · Las cuatro piezas se apilan como pisos: adquisición, habilitación, flujo de valor y crecimiento.
 * 4 · Tres palabras: la pirámide que se aplana, la ampolleta que se enciende y el ciclo que gira.
 * 5 · El recorrido: un camino con cuatro paradas que una persona recorre.
 */

const ID = 'eq01';
const nombres = ['trabaja', 'vende', 'armado', 'cuellos', 'edificio', 'vendedores', 'entra', 'quien', 'viaja', 'mirando', 'adquisicion', 'habilitacion', 'flujo', 'crecimiento', 'tres', 'aplanar', 'habilitar', 'agilidad', 'primero', 'cadena', 'aplanarRuta', 'tecnologia', 'pregunta'] as const;
type N = typeof nombres[number];

export const IntroEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Diseño de equipos de ventas'], [m('trabaja'), 'Trabaja cada vez más'], [m('vende'), 'Vende cada vez menos'], [m('armado'), 'El problema es el diseño'], [m('cuellos'), 'Sin cuellos de botella'],
    [m('edificio'), 'Se diseña como un edificio'], [m('vendedores'), 'No basta con contratar'], [m('entra'), 'Cómo entra el cliente'], [m('quien'), 'Quién hace qué'], [m('viaja'), 'Cómo viaja la información'], [m('mirando'), 'Qué lo sostiene'],
    [m('adquisicion'), 'Módulo de adquisición'], [m('habilitacion'), 'Motor de habilitación'], [m('flujo'), 'Flujo de valor'], [m('crecimiento'), 'Interfaz de crecimiento'],
    [m('tres'), 'Tres palabras'], [m('aplanar'), 'Aplanamiento'], [m('habilitar'), 'Habilitación'], [m('agilidad'), 'Agilidad'],
    [m('primero'), 'El recorrido'],
  ];

  /* Toma 1 · tareas que crecen y ventas que caen */
  const pila = Math.round(lerp(2, 9, ac(t, m('trabaja'), m('trabaja') + 3)));
  const caida = ac(t, m('vende'), m('vende') + 2.5);
  const ventas = Array.from({ length: 8 }, (_, k) => [24 + k * 30, 40 + k * 4 + k * k * 1.6 * caida] as [number, number]);

  /* Toma 3 · los cuatro pisos */
  const pisos = [
    { n: 'adquisicion' as N, txt: 'Adquisición', color: AZUL_M, y: 690 },
    { n: 'habilitacion' as N, txt: 'Habilitación', color: VIOLETA, y: 560 },
    { n: 'flujo' as N, txt: 'Flujo de valor', color: NARANJA, y: 430 },
    { n: 'crecimiento' as N, txt: 'Crecimiento', color: VERDE, y: 300 },
  ];

  /* Toma 5 · paradas del camino */
  const paradas: { n: N; x: number; y: number; txt: string; arriba: boolean }[] = [
    { n: 'primero', x: 190, y: 560, txt: 'El modelo falla', arriba: false },
    { n: 'cadena', x: 450, y: 470, txt: 'Los roles', arriba: true },
    { n: 'aplanarRuta', x: 720, y: 560, txt: 'Aplanar', arriba: false },
    { n: 'tecnologia', x: 990, y: 470, txt: 'Tecnología', arriba: true },
  ];
  let paso = -1; paradas.forEach((p, k) => { if (t >= M(p.n)) paso = k; });
  const desde = paradas[Math.max(0, paso - 1)], hasta = paradas[Math.max(0, paso)];
  const uC = paso < 0 ? 0 : sm(t, M(hasta.n), M(hasta.n) + 1.4);
  const caminanteX = paso <= 0 ? lerp(80, paradas[0].x, uC) : lerp(desde.x, hasta.x, uC);
  const caminanteY = paso <= 0 ? lerp(600, paradas[0].y, uC) : lerp(desde.y, hasta.y, uC);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Un equipo se diseña como un edificio">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · trabaja más, vende menos */}
      <Toma t={t} a={-1} b={m('edificio')} zi={1}>
        <Suelo y={700} isDark={isDark} />
        {/* escritorio con la pila de tareas */}
        <rect x={150} y={560} width={300} height={22} rx={8} fill={isDark ? '#6b4f3a' : '#a16207'} />
        <rect x={170} y={582} width={16} height={118} fill={isDark ? '#57412f' : '#854d0e'} /><rect x={414} y={582} width={16} height={118} fill={isDark ? '#57412f' : '#854d0e'} />
        <Rol id={ID} rol="ae" x={300} y={700} s={0.78} t={t} sigla={false} herramienta={false} />
        {Array.from({ length: pila }, (_, k) => <Hoja key={k} x={400 + (k % 2) * 6} y={540 - k * 16} w={86} h={22} lineas={1} rot={(k % 3 - 1) * 3} />)}
        {t >= m('trabaja') && [0, 1].map((k) => { const ph = (t * 0.9 + k / 2) % 1; return <path key={k} d={`M ${262 + k * 70} ${560 + ph * 30} q -6 10 0 14 q 6 -4 0 -14 Z`} fill="#7dd3fc" opacity={(1 - ph) * e1(t, m('trabaja'))} />; })}
        {/* monitor con las ventas que caen */}
        <g opacity={1 - ac(t, m('cuellos') - 0.4, m('cuellos'))}>
          <Monitor x={830} y={700} w={300} h={190}>
            <rect width={300} height={190} fill="#0b1220" />
            {t >= m('vende') && <polyline points={ventas.map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke={ROJO_M} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
            {t < m('vende') && <polyline points="24,150 84,130 144,110 204,90 264,70" fill="none" stroke={VERDE} strokeWidth={8} strokeLinecap="round" opacity={0.6} />}
          </Monitor>
          {t >= m('vende') && <Letrero x={830} y={760} texto="Ventas ↓" fondo={ROJO_M} id={ID} op={e1(t, m('vende'))} />}
        </g>
        {t >= m('armado') && <g opacity={e1(t, m('armado'))}><Visto x={300} y={450} r={30} /><Letrero x={300} y={760} texto="La persona no falla" fondo={VERDE} id={ID} /></g>}
        {/* cuello de botella: clientes atascados */}
        {t >= m('cuellos') && (
          <g opacity={e1(t, m('cuellos'))} transform="translate(830 420)">
            <path d="M -110 -150 H 110 Q 130 -150 130 -130 V 30 Q 130 80 40 110 V 200 H -40 V 110 Q -130 80 -130 30 V -130 Q -130 -150 -110 -150 Z" fill={isDark ? '#334155' : '#cbd5e1'} />
            {Array.from({ length: 12 }, (_, k) => <circle key={k} cx={-90 + (k % 6) * 36} cy={-100 + Math.floor(k / 6) * 44 + 3 * Math.sin(t * 3 + k)} r={14} fill={[AZUL_M, NARANJA, VIOLETA, VERDE][k % 4]} />)}
            {(() => { const ph = (t * 0.25) % 1; return <circle cx={0} cy={lerp(110, 200, ph)} r={12} fill={NARANJA} opacity={1 - ph} />; })()}
            <Letrero x={0} y={260} texto="Cuello de botella" fondo={PIZARRA} id={ID} />
          </g>
        )}
      </Toma>

      {/* TOMA 2 · el plano del edificio */}
      <Toma t={t} a={m('edificio')} b={m('adquisicion')}>
        <rect x={120} y={140} width={960} height={640} rx={26} fill={isDark ? '#0f2a4a' : '#1e3a8a'} opacity={0.92} />
        {Array.from({ length: 15 }, (_, k) => <rect key={`v${k}`} x={150 + k * 64} y={150} width={2} height={620} fill="#93c5fd" opacity={0.18} />)}
        {Array.from({ length: 10 }, (_, k) => <rect key={`h${k}`} x={130} y={170 + k * 64} width={940} height={2} fill="#93c5fd" opacity={0.18} />)}
        {/* edificio trazado */}
        {(() => { const u = sm(t, m('edificio') + 0.2, m('edificio') + 2); return (
          <g stroke="#e0f2fe" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 260 700 V 260 L 440 190 L 620 260 V 700 Z" strokeDasharray={1700} strokeDashoffset={1700 * (1 - u)} />
            {[380, 490, 600].map((y, k) => <path key={k} d={`M 260 ${y} H 620`} strokeDasharray={360} strokeDashoffset={360 * (1 - sm(t, m('edificio') + 1 + k * 0.3, m('edificio') + 1.6 + k * 0.3))} opacity={0.7} />)}
          </g>
        ); })()}
        {/* no basta con vendedores bajo un jefe */}
        {t >= m('vendedores') && (
          <g opacity={e1(t, m('vendedores')) * (1 - ac(t, m('entra') - 0.4, m('entra')))}>
            <Persona id={ID} x={850} y={420} s={0.55} cuerpo={PIZARRA} corbata />
            {[750, 850, 950].map((x, k) => <Persona key={k} id={ID} x={x} y={640} s={0.5} cuerpo={NARANJA} />)}
            <Cruz x={990} y={250} r={28} op={sm(t, m('vendedores') + 1.2, m('vendedores') + 1.6)} />
          </g>
        )}
        {/* las cuatro preguntas del plano */}
        {t >= m('entra') && <g opacity={e1(t, m('entra'))}>
          <path d="M 410 700 V 640 Q 440 615 470 640 V 700 Z" fill="#fde68a" />
          {(() => { const ph = ((t - m('entra')) * 0.35) % 1; return <Persona id={ID} x={lerp(150, 440, ph)} y={700} s={0.32} cuerpo={AZUL_M} />; })()}
          <Letrero x={680} y={655} texto="¿Cómo entra?" fondo={AZUL_M} id={ID} ancla="start" />
        </g>}
        {t >= m('quien') && <g opacity={e1(t, m('quien'))}>
          {[[320, 440], [440, 440], [560, 440]].map(([x, y], k) => <Persona key={k} id={ID} x={x} y={y + 40} s={0.32} cuerpo={[VIOLETA, AZUL_M, VERDE][k]} />)}
          <Letrero x={680} y={445} texto="¿Quién hace qué?" fondo={VIOLETA} id={ID} ancla="start" />
        </g>}
        {t >= m('viaja') && <g opacity={e1(t, m('viaja'))}>
          <Flujo x1={300} y1={340} x2={580} y2={340} t={t} n={6} vel={0.5} arco={30} color={['#fde68a', '#fff']} r={8} />
          <Letrero x={680} y={325} texto="¿Cómo viaja?" fondo={NARANJA} id={ID} ancla="start" />
        </g>}
        {t >= m('mirando') && <g opacity={e1(t, m('mirando'))}>
          <rect x={240} y={706} width={400} height={28} rx={8} fill={NARANJA} opacity={0.65 + 0.3 * Math.sin(t * 3)} />
          <Letrero x={680} y={725} texto="¿Qué lo sostiene?" fondo={VERDE} id={ID} ancla="start" />
        </g>}
      </Toma>

      {/* TOMA 3 · las cuatro piezas, piso por piso */}
      <Toma t={t} a={m('adquisicion')} b={m('tres')}>
        <Suelo y={752} isDark={isDark} x0={260} x1={940} />
        {pisos.map((p, k) => {
          const t0 = M(p.n); if (t < t0) return null;
          const u = sm(t, t0, t0 + 0.7);
          const y = lerp(p.y - 200, p.y, u);
          return (
            <g key={p.n} opacity={u} transform={`translate(0 ${y - p.y})`}>
              <rect x={300} y={p.y - 52} width={600} height={112} rx={20} fill={p.color} style={sombra(c.sombra, 6, 12)} />
              <rect x={600} y={p.y - 52} width={300} height={112} rx={20} fill="#000" opacity={0.1} />
              <g transform={`translate(380 ${p.y + 4})`}>
                {k === 0 && [0, 1, 2].map((j) => { const ph = (t * 0.4 + j / 3) % 1; return <circle key={j} cx={lerp(-60, 40, ph)} cy={0} r={12} fill="#fff" opacity={Math.min(1, ph * 5, (1 - ph) * 5)} />; })}
                {k === 0 && <path d="M 30 36 V -20 Q 50 -40 70 -20 V 36 Z" fill="#fde68a" />}
                {k === 1 && <><Engranaje x={-10} y={0} r={26} t={t * 3} hueco={p.color} color="#ede9fe" /><Engranaje x={46} y={-10} r={18} t={-t * 4.3} hueco={p.color} color="#ddd6fe" /></>}
                {k === 2 && <><rect x={-60} y={14} width={140} height={12} rx={6} fill="#fff" opacity={0.6} />{[0, 1, 2].map((j) => { const ph = (t * 0.3 + j / 3) % 1; return <rect key={j} x={lerp(-60, 60, ph)} y={-14} width={26} height={26} rx={5} fill="#fff" opacity={Math.min(1, ph * 6, (1 - ph) * 6)} />; })}</>}
                {k === 3 && <g><rect x={-50} y={-40} width={8} height={76} fill="#fff" /><rect x={-50} y={-44} width={110} height={8} fill="#fff" />{(() => { const sube = 14 * Math.sin(t * 1.5); return <><rect x={44} y={-36} width={3} height={30 + sube} fill="#fff" /><rect x={30} y={-6 + sube} width={32} height={22} rx={4} fill="#fde68a" /></>; })()}</g>}
              </g>
              <Txt f="a" x={500} y={p.y + 16} fontSize={34} fill="#fff">{p.txt}</Txt>
            </g>
          );
        })}
      </Toma>

      {/* TOMA 4 · tres palabras */}
      <Toma t={t} a={m('tres')} b={m('primero')}>
        <Suelo y={600} isDark={isDark} />
        {t >= m('aplanar') && (() => { const u = sm(t, m('aplanar') + 0.6, m('aplanar') + 2.2); return (
          <g opacity={e1(t, m('aplanar'))} transform="translate(230 600)">
            {[0, 1, 2].map((k) => { const w = lerp(200 - k * 60, 240, u), h = lerp(70, 30, u); const y = -(k + 1) * h - k * 4; return <rect key={k} x={-w / 2} y={y} width={w} height={h} rx={10} fill={[PIZARRA, NARANJA, ROSA][k]} opacity={k === 1 ? 1 : 1 - 0.0 * u} />; })}
            <Letrero x={0} y={70} texto="Aplanamiento" fondo={PIZARRA} id={ID} />
          </g>
        ); })()}
        {t >= m('habilitar') && <g opacity={e1(t, m('habilitar'))}>
          <Bombilla x={600} y={470} s={1.1} id={`${ID}b`} t={t} luz={sm(t, m('habilitar') + 0.4, m('habilitar') + 1.2)} />
          <Letrero x={600} y={670} texto="Habilitación" fondo={VIOLETA} id={ID} />
        </g>}
        {t >= m('agilidad') && <g opacity={e1(t, m('agilidad'))} transform="translate(970 470)">
          <g transform={`rotate(${t * 70})`}>
            <path d="M 0 -90 A 90 90 0 0 1 78 45" stroke={VERDE} strokeWidth={22} fill="none" strokeLinecap="round" />
            <path d="M 78 45 A 90 90 0 0 1 -78 45" stroke={TEAL} strokeWidth={22} fill="none" strokeLinecap="round" />
            <path d="M -78 45 A 90 90 0 0 1 0 -90" stroke={AZUL_M} strokeWidth={22} fill="none" strokeLinecap="round" />
            <path d="M 0 -118 L 30 -90 L 0 -62 Z" fill={AZUL_M} />
          </g>
          <Letrero x={0} y={200} texto="Agilidad" fondo={VERDE} id={ID} />
        </g>}
      </Toma>

      {/* TOMA 5 · el recorrido */}
      <Toma t={t} a={m('primero')} b={fin + 5}>
        <path d="M 60 620 C 160 600 150 560 190 560 S 380 470 450 470 S 640 560 720 560 S 920 470 990 470 S 1100 440 1150 420" stroke={isDark ? '#3a3f47' : '#dfe3e8'} strokeWidth={46} fill="none" strokeLinecap="round" />
        <path d="M 60 620 C 160 600 150 560 190 560 S 380 470 450 470 S 640 560 720 560 S 920 470 990 470 S 1100 440 1150 420" stroke="#fff" strokeWidth={4} fill="none" strokeDasharray="18 18" opacity={0.6} />
        {paradas.map((p, k) => t >= M(p.n) && (
          <g key={p.n} opacity={e1(t, M(p.n))}>
            <rect x={p.x - 3} y={p.y - 110} width={6} height={100} fill="#64748b" />
            <path d={`M ${p.x + 3} ${p.y - 110} H ${p.x + 64} L ${p.x + 50} ${p.y - 90} L ${p.x + 64} ${p.y - 70} H ${p.x + 3} Z`} fill={[ROJO_M, AZUL_M, NARANJA, VERDE][k]} />
            <Letrero x={p.x} y={p.arriba ? p.y - 150 : p.y + 70} texto={p.txt} fondo={[ROJO_M, AZUL_M, NARANJA, VERDE][k]} id={ID} />
          </g>
        ))}
        {t >= m('primero') && <Persona id={ID} x={caminanteX} y={caminanteY + 6 - 4 * Math.abs(Math.sin(t * 7)) * (uC < 1 ? 1 : 0)} s={0.42} />}
      </Toma>
    </Lienzo>
  );
};
