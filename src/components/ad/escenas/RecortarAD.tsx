import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Hoja, Visto, Reloj, Gente, Persona, Monitor, Flujo, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Recortar y apilar.
 * Toma 1: una matriz costo/valor (dos ejes). Las fichas de entregables caen en sus cuadrantes; las tijeras cortan las de
 * alto costo y bajo valor y las de bajo costo y bajo valor; queda la pila de activos de una sola creación.
 * Toma 2: la máquina de los activos: el primer cliente paga la construcción y luego salen copias para todos los demás.
 * Toma 3: la hoja de cálculo de cien horas cruza peso con cien comidas y escupe listas de supermercado en 15 minutos;
 * el equivalente B2B se apila: diagnóstico, contrato, tablero y manual.
 */

const ID = 'ad12', P = 'ad-recortar';

const Tijera: React.FC<{ x: number; y: number; a: number }> = ({ x, y, a }) => (
  <g transform={`translate(${x} ${y})`}>
    <g transform={`rotate(${-a})`}><rect x={0} y={-6} width={90} height={12} rx={6} fill="#94a3b8" /><circle cx={-20} cy={0} r={18} fill="none" stroke={ROJO_M} strokeWidth={8} /></g>
    <g transform={`rotate(${a})`}><rect x={0} y={-6} width={90} height={12} rx={6} fill="#cbd5e1" /><circle cx={-20} cy={0} r={18} fill="none" stroke={ROJO_M} strokeWidth={8} /></g>
  </g>
);

export const RecortarAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('alto'), 'Recortar lo que no aporta'], [m('activos'), 'Activos de una sola creación'], [m('primero'), 'El primero paga, los demás reciben'], [m('horas'), 'Cien horas, una vez'],
    [m('quince'), '15 minutos por plan'], [m('diagnostico'), 'En servicios a empresas'],
  ];
  // Matriz: x = costo (izq bajo, der alto), y = valor (abajo bajo, arriba alto).
  const FICHAS: [number, number, string, string][] = [[880, 600, 'alto', ROJO_M], [940, 640, 'alto', ROJO_M], [330, 620, 'bajo', GRIS], [390, 590, 'bajo', GRIS], [340, 300, 'activos', VERDE], [400, 340, 'activos', VERDE], [460, 290, 'activos', VERDE]];
  const ACT: [string, string][] = [['calculadoras', 'Calculadoras'], ['plantillas', 'Plantillas'], ['listas', 'Listas'], ['recorridos', 'Grabaciones']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Recortar y apilar">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La matriz y las tijeras */}
      <Toma t={t} a={0} b={m('primero')} cy={470}>
        <g opacity={e1(t, m('alto') - 0.5)}>
          <rect x={200} y={170} width={860} height={560} rx={20} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
          <path d="M 630 190 V 710 M 220 450 H 1040" stroke={c.apagado} strokeWidth={6} />
          <Txt f="a" x={630} y={770} textAnchor="middle" fontSize={26} fill={c.tenue}>Costo para ti →</Txt>
          <Txt f="a" x={160} y={450} textAnchor="middle" fontSize={26} fill={c.tenue} transform="rotate(-90 160 450)">Valor →</Txt>
          {FICHAS.map(([x, y, n, col], k) => {
            const corta = n !== 'activos' ? sm(t, m(n) + 0.5, m(n) + 1.2) : 0;
            const on = t >= m(n) - 0.1;
            return <rect key={k} x={x - 40 + corta * 30} y={y - 30 + corta * 200} width={80} height={60} rx={12} fill={col} opacity={on ? (1 - corta) : 0.25} transform={`rotate(${corta * 50} ${x} ${y})`} />;
          })}
          {t >= m('alto') && <g opacity={ventana(t, m('alto'), m('activos'))}><Tijera x={820} y={520} a={10 + 14 * Math.abs(Math.sin(t * 6))} /></g>}
          {t >= m('bajo') && <g opacity={ventana(t, m('bajo'), m('activos'))}><Tijera x={270} y={520} a={10 + 14 * Math.abs(Math.sin(t * 6))} /></g>}
        </g>
        {t >= m('activos') && (
          <g opacity={e1(t, m('activos'))}>
            {ACT.map(([n, txt], k) => (
              <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0}>
                <Letrero x={830} y={260 + k * 64} texto={txt} fondo={VERDE} id={ID} tam={26} />
              </g>
            ))}
          </g>
        )}
      </Toma>

      {/* 2 · El primero paga, los siguientes reciben */}
      <Toma t={t} a={m('primero')} b={m('horas')} cy={470}>
        <g opacity={e1(t, m('primero'))}>
          <Persona id={ID} x={180} y={640} s={0.7} cuerpo={NARANJA} />
          <Letrero x={180} y={710} texto="Paga la creación" id={ID} tam={26} />
          <rect x={420} y={330} width={300} height={260} rx={30} fill={`url(#${ID}-marca)`} style={sombra(0.25, 4, 12)} />
          <Txt x={570} y={480} textAnchor="middle" fontSize={40} fill="#fff" peso={800}>Activo</Txt>
          <Flujo x1={260} y1={480} x2={420} y2={460} t={t} n={4} color={AMBAR} r={10} />
        </g>
        {t >= m('siguientes') && (
          <g opacity={e1(t, m('siguientes'))}>
            {[0, 1, 2, 3, 4].map((k) => { const ph = ((t - m('siguientes')) * 0.6 + k / 5) % 1; return <Hoja key={k} x={lerp(720, 900, ph)} y={360 + k * 50} w={60} h={76} lineas={3} color={VERDE} op={1 - ph * 0.6} />; })}
            <Gente x={940} y={700} n={4} activos={4} color={AZUL_M} paso={56} s={0.6} />
            <Letrero x={1020} y={760} texto="Casi sin costo" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
      </Toma>

      {/* 3 · La hoja de cálculo de cien horas y el equivalente B2B */}
      <Toma t={t} a={m('horas')} b={fin + 1} cy={470}>
        <g opacity={ventana(t, m('horas'), m('diagnostico'))}>
          <Monitor x={380} y={700} w={420} h={300}>
            {Array.from({ length: 36 }, (_, k) => <rect key={k} x={14 + (k % 6) * 66} y={14 + Math.floor(k / 6) * 46} width={58} height={36} rx={4} fill={k % 7 === 0 ? VERDE : '#1e293b'} opacity={sm(t, m('horas') + k * 0.03, m('horas') + k * 0.03 + 0.3)} />)}
          </Monitor>
          <Cifra x={380} y={240} valor={100} u={sm(t, m('horas'), m('horas') + 1)} suf=" horas" tam={56} color={NARANJA} />
          {t >= m('comidas') && <Letrero x={380} y={760} texto="Peso × 100 comidas" id={ID} tam={26} op={e1(t, m('comidas'))} />}
          {t >= m('supermercado') && (
            <g opacity={e1(t, m('supermercado'))}>
              {[0, 1, 2].map((k) => { const ph = ((t - m('supermercado')) * 0.5 + k / 3) % 1; return <Hoja key={k} x={lerp(640, 900, ph)} y={460 + k * 30} w={90} h={120} lineas={6} color={VERDE} rot={ph * 10} />; })}
            </g>
          )}
          {t >= m('quince') && (
            <g opacity={e1(t, m('quince'))}>
              <Reloj x={960} y={300} r={70} t={t} vel={2} aro={VERDE} />
              <Letrero x={960} y={410} texto="15 minutos por plan" fondo={VERDE} id={ID} tam={26} />
            </g>
          )}
        </g>
        {t >= m('diagnostico') && (
          <g opacity={e1(t, m('diagnostico'))}>
            {(['Diagnóstico', 'Contrato listo', 'Tablero', 'Manual'] as const).map((s, k) => {
              const u = sm(t, m('diagnostico') + k * 0.4, m('diagnostico') + k * 0.4 + 0.6);
              return (
                <g key={s} opacity={u} transform={`translate(600 ${lerp(160, 640 - k * 110, u)})`}>
                  <rect x={-230} y={-44} width={460} height={88} rx={20} fill={[NARANJA, ROSA, VIOLETA, AZUL_M][k]} style={sombra(0.22, 3, 8)} />
                  <Txt x={0} y={12} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>{s}</Txt>
                </g>
              );
            })}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
