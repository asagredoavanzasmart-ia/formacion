import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Auricular, Escudo, Escritorio, Cara, Ondas, Telefono, Visto, Flecha, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Abrir y conversar. Toma 1: Judy con su auricular en la mesa de ayuda; el reclamo del cliente; el jefe abre mal y
 * Judy levanta el escudo; abre bien y el escudo baja. Toma 2: el jefe escucha la grabación (ondas): hechos, no
 * rumores; luego cuatro tácticas en una cuadrícula, cada una con su dibujo. Toma 3: el árbol de la causa: «llega
 * tarde» arriba y cuatro raíces, cada una con su llave distinta.
 */

const ID = 'fb08', P = 'fb-abrir';

export const AbrirFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('segundos'), 'Los primeros segundos'], [m('judy'), 'Judy, mesa de ayuda'], [m('reclamo'), 'Un reclamo'], [m('mal'), 'Una mala apertura'],
    [m('bien'), 'Una buena apertura'], [m('grabacion'), 'Hechos, no rumores'], [m('escuchar'), 'Escuchar de verdad'], [m('noverbal'), 'Lo no verbal'],
    [m('cuerpo'), 'Tu propio cuerpo'], [m('parafrasear'), 'Parafrasear'], [m('causa'), 'La causa de fondo'], [m('distinta'), 'Una solución por causa'],
  ];
  const escudo = sm(t, m('defender'), m('defender') + 0.6) * (1 - sm(t, m('escuchada'), m('escuchada') + 0.8));
  const TACT = [
    ['escuchar', 'Escuchar', AZUL_M], ['noverbal', 'Lo no verbal', VIOLETA], ['cuerpo', 'Tu cuerpo', NARANJA], ['parafrasear', 'Parafrasear', VERDE],
  ] as const;
  const CAUSAS = ['En casa', 'Trayecto', 'Ánimo', 'Le da igual'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Abrir y conversar">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · las dos aperturas */}
      <TomaFB t={t} a={0} b={m('grabacion')} cy={500}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        {t >= m('judy') && (
          <g opacity={e1(t, m('judy'))}>
            <Persona id={ID} x={880} y={700} s={1.05} cuerpo={ROSA} ojos={1 - 0.5 * escudo} />
            <Auricular x={880} y={700} s={1.05} />
            <Escritorio x={880} y={720} w={260} />
            <Txt x={880} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Judy</Txt>
          </g>
        )}
        {vent(t, m('reclamo'), m('mal')) > 0.01 && (
          <g opacity={vent(t, m('reclamo'), m('mal'))}>
            <Cara x={420} y={420} r={70} id={ID} cejas={1} boca={-0.8} />
            <Telefono x={560} y={420} s={0.7} />
            <Burbuja x={380} y={320} w={360} texto="¡Fue grosera!" u={sm(t, m('reclamo'), m('reclamo') + 0.8)} c={c} id={ID} tam={30} />
          </g>
        )}
        {t >= m('mal') && (
          <g opacity={e1(t, m('mal'))}>
            <Persona id={ID} x={300} y={720} s={1.05} cuerpo={VIOLETA} corbata />
            <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Su jefe</Txt>
          </g>
        )}
        {vent(t, m('mal'), m('bien')) > 0.01 && <g opacity={vent(t, m('mal'), m('bien'))}><Burbuja x={320} y={500} w={520} texto="Fuiste grosera, todos lo escucharon. ¿Qué tienes que decir?" u={sm(t, m('mal'), m('mal') + 2.5)} c={c} id={ID} tam={28} /></g>}
        <Escudo x={765} y={590} s={1.2} op={escudo} color={GRIS} />
        {vent(t, m('bien'), m('grabacion')) > 0.01 && <g opacity={vent(t, m('bien'), m('grabacion'))}><Burbuja x={320} y={500} w={560} texto="Te cuento lo que sé, escucho tu versión y vemos juntos qué hacer" u={sm(t, m('bien'), m('bien') + 3)} c={c} id={ID} tam={28} marca /></g>}
        {t >= m('escuchada') && <Visto x={960} y={450} r={30} op={vent(t, m('escuchada'), m('grabacion'))} />}
      </TomaFB>

      {/* 2 · grabación y cuatro tácticas */}
      <TomaFB t={t} a={m('grabacion')} b={m('causa')} cy={470}>
        {vent(t, m('grabacion'), m('escuchar')) > 0.01 && (
          <g opacity={vent(t, m('grabacion'), m('escuchar'))}>
            <Suelo y={720} isDark={isDark} x0={200} x1={1000} />
            <Persona id={ID} x={420} y={720} s={1.05} cuerpo={VIOLETA} corbata />
            <Auricular x={420} y={720} s={1.05} />
            <rect x={600} y={320} width={420} height={140} rx={24} fill={c.panel} />
            {Array.from({ length: 24 }, (_, k) => { const h = 20 + 50 * Math.abs(Math.sin(k * 1.3 + t * 4)); return <rect key={k} x={624 + k * 16} y={390 - h / 2} width={9} height={h} rx={4} fill={NARANJA} />; })}
            <Txt x={810} y={510} textAnchor="middle" fontSize={28} fill={c.texto}>La grabación</Txt>
          </g>
        )}
        {TACT.map(([n, txt, col], k) => {
          const x = k % 2 ? 870 : 330, y = k < 2 ? 300 : 580;
          const o = e1(t, m(n));
          return o > 0.01 ? (
            <g key={n} opacity={o}>
              <rect x={x - 250} y={y - 120} width={500} height={240} rx={28} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
              <g transform={`translate(${x - 120} ${y})`}>
                {k === 0 && <><ellipse cx={0} cy={0} rx={34} ry={50} fill="#f7c4a0" /><ellipse cx={4} cy={0} rx={16} ry={30} fill="#e2a37c" /><Ondas x1={-130} y1={0} x2={-40} y2={0} t={t} color={col} n={3} /></>}
                {k === 1 && <Cara x={0} y={0} r={56} id={ID} cejas={0.8} boca={-0.4} />}
                {k === 2 && <g transform="rotate(14)"><Persona id={ID} x={0} y={80} s={0.6} cuerpo={col} /></g>}
                {k === 3 && <><rect x={-60} y={-40} width={70} height={44} rx={14} fill={col} /><rect x={-10} y={0} width={70} height={44} rx={14} fill={col} opacity={0.6} /></>}
              </g>
              <Txt x={x + 60} y={y + 12} textAnchor="middle" fontSize={32} fill={c.texto}>{txt}</Txt>
            </g>
          ) : null;
        })}
      </TomaFB>

      {/* 3 · la causa de fondo */}
      <TomaFB t={t} a={m('causa')} b={fin + 1} cy={470}>
        <Letrero x={600} y={190} texto="Llega tarde" fondo={ROJO_M} id={ID} tam={34} op={e1(t, m('causa'))} />
        <rect x={590} y={220} width={20} height={150} rx={8} fill="#8b5a2b" opacity={e1(t, m('causa'))} />
        {CAUSAS.map((txt, k) => {
          const x = 180 + k * 280, o = e1(t, m('tarde') + 0.5 + k * 0.6);
          const llave = sm(t, m('distinta') + k * 0.4, m('distinta') + 0.6 + k * 0.4);
          return o > 0.01 ? (
            <g key={k} opacity={o}>
              <path d={`M 600 370 C 600 420, ${x} 400, ${x} 470`} stroke="#8b5a2b" strokeWidth={12} fill="none" strokeLinecap="round" />
              <rect x={x - 132} y={470} width={264} height={110} rx={24} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.15))' }} />
              <Txt x={x} y={536} textAnchor="middle" fontSize={30} fill={c.texto}>{txt}</Txt>
              {llave > 0.01 && (
                <g transform={`translate(${x} ${640 + (1 - llave) * 20})`} opacity={llave}>
                  <circle cx={-26} cy={0} r={20} fill="none" stroke={[NARANJA, AZUL_M, VIOLETA, VERDE][k]} strokeWidth={9} />
                  <rect x={-8} y={-5} width={60} height={10} rx={5} fill={[NARANJA, AZUL_M, VIOLETA, VERDE][k]} />
                  <rect x={36} y={0} width={9} height={18} rx={3} fill={[NARANJA, AZUL_M, VIOLETA, VERDE][k]} />
                </g>
              )}
            </g>
          ) : null;
        })}
        {t >= m('distinta') && <Txt x={600} y={760} textAnchor="middle" fontSize={30} fill={c.texto} opacity={e1(t, m('distinta') + 1.6)}>Cada causa pide su solución</Txt>}
      </TomaFB>
    </Lienzo>
  );
};
