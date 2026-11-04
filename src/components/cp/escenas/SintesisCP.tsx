import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Edificio, PantallaCRM, Libro, Sello, Visto, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Síntesis: la relación antes que el software.
 * Toma 1: un árbol al revés — el software arriba como copa, sin raíz —; cada «cuando…» enciende una de sus seis ramas
 * con el nombre corto del error.
 * Toma 2: la evidencia en una sola barra (organización, política y comprensión frente a presupuesto y software) y el
 * puente entre la empresa y el cliente: la empresa lo construye, el CRM lo sostiene.
 * Toma 3: cuatro puertas que se abren antes de preguntar el precio; el software caro esperando sin ellas; y el CRM
 * como la memoria —un libro— de una relación que ya existe.
 */

const ID = 'cp19', P = 'cp-sintesis';

const TX = 360;
const RAMAS: [string, string, number, number, string][] = [
  ['estrategia', 'Sin estrategia', TX - 220, 360, NARANJA], ['magia', 'Esperar magia', TX - 140, 230, ROSA], ['automatiza', 'Automatizar sin revisar', TX, 180, AZUL_M],
  ['segmenta', 'Segmentar sin personalizar', TX + 140, 230, VIOLETA], ['olvida', 'Olvidar a las personas', TX + 220, 360, VERDE], ['acumulan', 'Datos sin propósito', TX, 320, AMBAR],
];

export const SintesisCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('raiz'), 'Una raíz común'], [m('antes'), 'El software antes que la relación'], [m('evidencia'), 'La evidencia'], [m('crea'), 'La empresa crea la relación'],
    [m('cuesta'), 'Antes del precio'], [m('caro'), 'Un software caro esperando'], [m('memoria'), 'La memoria de una relación'],
  ];
  const puente = sm(t, m('crea'), m('crea') + 1.6);
  const PUERTAS: [string, string][] = [['resuelve', '¿Qué problema?'], ['mejorar', '¿Qué proceso?'], ['alimentar', '¿Quién lo alimenta?'], ['gana', '¿Qué gana el cliente?']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La relación antes que el software">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el árbol sin raíz */}
      <Toma t={t} a={0} b={m('evidencia')} cy={480}>
        <g opacity={e1(t, m('raiz'))}>
          <rect x={TX - 15} y={420} width={30} height={290} rx={12} fill="#7c4a1e" />
          <rect x={TX - 170} y={700} width={340} height={14} rx={7} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
          {t >= m('antes') && <g opacity={e1(t, m('antes'))}><rect x={TX - 60} y={714} width={120} height={60} rx={10} fill="none" stroke={c.apagado} strokeWidth={4} strokeDasharray="10 10" /><Txt f="a" x={TX} y={800} textAnchor="middle" fontSize={22} fill={c.tenue}>¿Y la relación?</Txt></g>}
        </g>
        {RAMAS.map(([n, s, x, y, col], k) => {
          const on = t >= m(n);
          return (
            <g key={n} opacity={e1(t, m('raiz') + 0.1 * k)}>
              <path d={`M ${TX} ${k === 5 ? 420 : 440} Q ${(TX + x) / 2} ${y + 60} ${x} ${y}`} stroke="#7c4a1e" strokeWidth={14} fill="none" strokeLinecap="round" />
              <circle cx={x} cy={y} r={on ? 58 : 48} fill={on ? col : c.panel2} />
              {on && !movil && <g opacity={e1(t, m(n))}><circle cx={720} cy={230 + k * 82} r={16} fill={col} /><Txt f="a" x={750} y={240 + k * 82} fontSize={30} fill={c.texto}>{s}</Txt></g>}
            </g>
          );
        })}
        {movil && (() => { const act = RAMAS.filter(([n]) => t >= m(n)).pop(); return act ? <Letrero x={600} y={800} texto={act[1]} fondo={act[4]} id={ID} tam={28} op={e1(t, m(act[0]))} /> : null; })()}
        {t >= m('antes') && <g transform={`translate(${TX} 300)`} opacity={e1(t, m('antes')) * (t >= m('estrategia') ? 0 : 1)}><PantallaCRM x={0} y={0} s={0.3} n={3} isDark={isDark} /></g>}
      </Toma>

      {/* 2 · la evidencia y el puente */}
      <Toma t={t} a={m('evidencia')} b={m('cuesta')} cy={480}>
        <g opacity={e1(t, m('evidencia'))}>
          <rect x={150} y={220} width={900 * 0.71} height={60} rx={12} fill={VIOLETA} />
          <rect x={150 + 900 * 0.71 + 10} y={220} width={900 * 0.06} height={60} rx={12} fill={GRIS} />
          <Txt f="a" x={150} y={320} fontSize={26} fill={c.texto}>Organización, política y comprensión</Txt>
          <Txt f="a" x={150 + 900 * 0.71 + 10} y={320} fontSize={22} fill={c.tenue}>Dinero y software</Txt>
        </g>
        {t >= m('crea') && (
          <g opacity={e1(t, m('crea'))}>
            <Edificio x={180} y={720} w={140} h={220} color={VIOLETA} />
            <Persona id={ID} x={1020} y={720} s={0.9} cuerpo={NARANJA} />
            <path d={`M 260 600 Q 600 ${lerp(600, 480, puente)} ${lerp(260, 940, puente)} 600`} stroke={`url(#${ID}-marca)`} strokeWidth={18} fill="none" strokeLinecap="round" />
            {t >= m('sostenerla') && [400, 600, 800].map((x, k) => <rect key={x} x={x - 10} y={540 - (k === 1 ? 0 : 20)} width={20} height={180 + (k === 1 ? 0 : 20)} rx={8} fill={GRIS} opacity={e1(t, m('sostenerla') + 0.2 * k)} />)}
            <Letrero x={600} y={790} texto={t >= m('sostenerla') ? 'El CRM ayuda a sostenerla' : 'La empresa crea la relación'} id={ID} tam={28} />
          </g>
        )}
      </Toma>

      {/* 3 · cuatro puertas y la memoria */}
      <Toma t={t} a={m('cuesta')} b={fin + 1} cy={480}>
        {ventana(t, m('cuesta'), m('memoria')) > 0.01 && (
          <g opacity={ventana(t, m('cuesta'), m('memoria'))}>
            {PUERTAS.map(([n, s], k) => {
              const x = 180 + k * 280, ab = sm(t, m(n), m(n) + 0.8);
              return (
                <g key={n}>
                  <rect x={x - 90} y={300} width={180} height={300} rx={14} fill={c.panel2} />
                  <rect x={x - 90} y={300} width={180 * (1 - 0.75 * ab)} height={300} rx={14} fill={[NARANJA, ROSA, AZUL_M, VERDE][k]} />
                  {ab > 0.9 && <Visto x={x + 40} y={450} r={24} />}
                  {!movil && <Txt f="a" x={x} y={650} textAnchor="middle" fontSize={24} fill={c.texto} opacity={e1(t, m(n))}>{s}</Txt>}
                </g>
              );
            })}
            {movil && (() => { const ab = PUERTAS.filter(([n]) => t >= m(n)).pop(); return ab ? <Letrero x={600} y={700} texto={ab[1]} id={ID} tam={28} op={e1(t, m(ab[0]))} /> : null; })()}
            {t >= m('caro') && <Sello x={600} y={230} texto="SOFTWARE CARO" u={sm(t, m('caro'), m('caro') + 0.6)} color={GRIS} />}
          </g>
        )}
        {t >= m('memoria') && (
          <g opacity={e1(t, m('memoria'))}>
            <Libro x={600} y={600} color={ROSA} titulo="CRM" autor="" c={c} />
            {[0, 1, 2].map((k) => <circle key={k} cx={420 + k * 180} cy={300 - 10 * Math.sin(t * 2 + k)} r={12} fill={[NARANJA, AZUL_M, VERDE][k]} />)}
            <Letrero x={600} y={790} texto={t >= m('sustituto') ? 'Nunca su sustituto' : 'La memoria de una relación'} id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
