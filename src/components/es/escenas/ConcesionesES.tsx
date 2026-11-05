import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Avion, Nube, Caja, Frasco, Cifra, Burbuja, Cruz, Suelo, Flecha, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Elegir qué problema tener.
 * Toma 1: el ranking de Money (GE, IBM, Southwest); el avión de Southwest que suelta lo que no hace (comidas, asientos
 * asignados, primera clase) y vuela de punto a punto; Continental Lite, gris y entre nubes, con la pila de quejas, y su
 * director que sale con una caja.
 * Toma 2 (J&J, 1982): el credo grabado en piedra con su orden; los frascos de Tylenol que vuelven a la caja; 100 millones.
 * Toma 3: dos preguntas: cómo hacer las dos cosas frente a qué problema prefiero tener.
 */

const ID = 'es05', P = 'es-concesiones';

export const ConcesionesES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('si'), 'Cada sí es también un no'], [m('money'), 'La acción que más rindió'], [m('kelleher'), 'Lo que Southwest no hace'], [m('continental'), 'Continental Lite'],
    [m('quejas'), 'Mil quejas al día'], [m('mezclar'), 'Mezclar estrategias'], [m('crisis'), 'Una crisis'], [m('credo'), 'El credo de 1943'],
    [m('retiro'), 'Retirar todo'], [m('problema'), '¿Qué problema prefiero?'],
  ];
  const sw = sm(t, m('southwest'), m('southwest') + 1.4);
  const NO = ['Comidas', 'Asientos asignados', 'Primera clase'];
  const cartas = Math.min(14, Math.floor(Math.max(0, t - m('quejas')) * 5));
  const CREDO = ['Clientes', 'Empleados', 'Comunidad', 'Accionistas'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Elegir qué problema tener">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1a · el ranking de Money */}
      <Toma t={t} a={0} b={m('kelleher')} cy={480}>
        <g opacity={e1(t, m('money'))}>
          {[['General Electric', 0.42, GRIS], ['IBM', 0.36, GRIS], ['Southwest', 0.95, NARANJA]].map(([n, v, col], k) => (
            <g key={n as string} transform={`translate(${300 + k * 300} 680)`}>
              <rect x={-70} y={-420 * (v as number) * sm(t, m('money') + 0.3 * k + (k === 2 ? 1 : 0), m('money') + 0.3 * k + (k === 2 ? 2.2 : 1))} width={140} height={420 * (v as number) * sm(t, m('money') + 0.3 * k + (k === 2 ? 1 : 0), m('money') + 0.3 * k + (k === 2 ? 2.2 : 1))} rx={14} fill={col as string} />
              <Txt x={0} y={50} textAnchor="middle" fontSize={30} fill={c.texto}>{n as string}</Txt>
            </g>
          ))}
          <Txt f="a" x={600} y={190} textAnchor="middle" fontSize={28} fill={c.texto}>Revista Money, datos de Ned Davis · 1972–2002</Txt>
        </g>
        {t < m('money') && <Letrero x={600} y={450} texto="Sí  =  no a otras cosas" id={ID} tam={40} op={e1(t, m('si'))} />}
      </Toma>

      {/* 1b · dos aviones */}
      <Toma t={t} a={m('kelleher')} b={m('crisis')} cy={470}>
        <g opacity={ventana(t, m('kelleher') - 0.1, m('continental'))}>
          <circle cx={170} cy={430} r={22} fill={AZUL_M} /><circle cx={1030} cy={430} r={22} fill={AZUL_M} />
          <Txt x={170} y={490} textAnchor="middle" fontSize={28} fill={c.texto}>A</Txt><Txt x={1030} y={490} textAnchor="middle" fontSize={28} fill={c.texto}>B</Txt>
          {t >= m('punto') && <Flecha x1={200} y1={430} x2={1000} y2={430} u={sm(t, m('punto'), m('punto') + 1)} color={NARANJA} grosor={8} punteada />}
          <Avion x={lerp(300, 820, ((t - m('kelleher')) * 0.06) % 1)} y={300} s={0.75} cola={NARANJA} />
          {NO.map((n, k) => {
            const u = sm(t, m('kelleher') + 0.5 + 0.4 * k, m('kelleher') + 1.6 + 0.4 * k);
            return u > 0.01 && <g key={n} opacity={1 - sm(t, m('bajo'), m('bajo') + 0.6)}><Letrero x={260 + k * 340} y={560 + 120 * u} texto={n} fondo={GRIS} id={ID} tam={26} /><Cruz x={260 + k * 340 + 120} y={540 + 120 * u} r={18} /></g>;
          })}
          {t >= m('bajo') && <Letrero x={600} y={600} texto="Una aerolínea de bajo costo" id={ID} tam={30} op={e1(t, m('bajo'))} />}
        </g>
        {t >= m('continental') && (
          <g opacity={e1(t, m('continental'))}>
            <Avion x={560} y={300 + 10 * Math.sin(t * 3)} s={0.75} color="#e5e7eb" cola={GRIS} rot={4 * Math.sin(t * 2)} />
            <Nube x={300} y={260} s={1} t={t} /><Nube x={840} y={320} s={0.9} t={t + 1} />
            <Txt x={560} y={440} textAnchor="middle" fontSize={30} fill={c.texto}>Continental Lite</Txt>
            {Array.from({ length: cartas }, (_, k) => <g key={k} transform={`translate(${860 + (azar(k) - 0.5) * 60} ${700 - k * 14}) rotate(${(azar(k + 2) - 0.5) * 30})`}><rect x={-46} y={-30} width={92} height={60} rx={6} fill="#ffffff" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.2))' }} /><path d="M -46 -30 L 0 6 L 46 -30" stroke="#cbd5e1" strokeWidth={4} fill="none" /></g>)}
            {t >= m('quejas') && <Txt x={860} y={780} textAnchor="middle" fontSize={30} fill={ROJO_M}>1.000 quejas al día</Txt>}
            {t >= m('despedido') && <g opacity={e1(t, m('despedido'))}><Persona id={ID} x={lerp(380, 120, sm(t, m('despedido') + 0.6, m('despedido') + 3))} y={760} s={0.95} cuerpo="#334155" corbata ojos={0.3} /><Caja x={lerp(430, 170, sm(t, m('despedido') + 0.6, m('despedido') + 3))} y={700} w={70} h={44} /></g>}
            {t >= m('mezclar') && <Letrero x={420} y={560} texto="Mezclar estrategias" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('mezclar'))} />}
          </g>
        )}
        {!movil && t >= m('quejas') && <Txt f="a" x={600} y={170} textAnchor="middle" fontSize={22} fill={c.tenue}>Según Michael Porter</Txt>}
      </Toma>

      {/* 2 · el credo de J&J */}
      <Toma t={t} a={m('crisis')} b={m('problema')} cy={480}>
        {t >= m('tylenol') && (
          <g opacity={e1(t, m('tylenol'))}>
            <rect x={640} y={420} width={480} height={18} rx={6} fill="#a16b3f" />
            {Array.from({ length: 6 }, (_, k) => {
              const u = sm(t, m('retiro') + 0.15 * k, m('retiro') + 0.15 * k + 0.9);
              return <Frasco key={k} x={lerp(690 + k * 76, 880, u)} y={lerp(420, 700, u) - 120 * Math.sin(Math.PI * u)} s={0.7} op={1 - 0.6 * u} rot={u * 60} />;
            })}
            {t >= m('retiro') && <Caja x={880} y={760} w={220} h={90} texto="Retiro" tam={30} />}
          </g>
        )}
        {t >= m('credo') && (
          <g opacity={e1(t, m('credo'))} transform={`translate(${t >= m('tylenol') ? 330 : 600} 470)`}>
            <path d="M -200 260 V -170 Q -200 -260 0 -260 Q 200 -260 200 -170 V 260 Z" fill={isDark ? '#6b7280' : '#cbd5e1'} />
            <Txt x={0} y={-190} textAnchor="middle" fontSize={32} fill="#334155">Credo · 1943</Txt>
            {CREDO.map((n, k) => (
              <g key={n} opacity={e1(t, m('orden') + 0.3 * k)}>
                <Txt x={-150} y={-100 + k * 90} fontSize={38} fill={k === 0 ? '#b45309' : '#334155'}>{`${k + 1}. ${n}`}</Txt>
              </g>
            ))}
          </g>
        )}
        {t >= m('cien') && <g opacity={e1(t, m('cien'))}><Cifra x={880} y={300} valor={100} u={sm(t, m('cien'), m('cien') + 1)} pre="≈ US$ " suf=" M" tam={64} color={ROJO_M} /></g>}
        {!movil && t >= m('crisis') && t < m('credo') && <Txt f="a" x={600} y={460} textAnchor="middle" fontSize={34} fill={c.texto} opacity={e1(t, m('crisis'))}>Johnson & Johnson, 1982</Txt>}
      </Toma>

      {/* 3 · dos preguntas */}
      <Toma t={t} a={m('problema')} b={fin + 1} cy={480}>
        <Suelo y={760} isDark={isDark} x0={120} x1={1080} />
        <Persona id={ID} x={240} y={760} s={1} cuerpo={GRIS} ojos={0.5} />
        <Burbuja x={260} y={560} w={360} texto="¿Cómo hago las dos cosas?" u={sm(t, m('problema') - 1.5, m('problema') - 0.2)} c={c} id={ID} tam={32} />
        <Persona id={ID} x={960} y={760} s={1} cuerpo={NARANJA} />
        <Burbuja x={940} y={560} w={380} texto="¿Qué problema prefiero tener?" u={sm(t, m('problema'), m('problema') + 1.2)} c={c} id={ID} tam={32} marca lado="der" />
      </Toma>
    </Lienzo>
  );
};

