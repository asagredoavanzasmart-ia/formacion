import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Edificio, Caja, Lista, Ondas, Flujo, Dial, Visto, Cruz, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Quien se pone a la defensiva. Toma 1: Melissa coordina; James trabaja en otra ciudad y sus entregas llegan tarde o
 * no llegan, y Melissa las completa. La lista de recomendados sin James; James grita (ondas rojas); las salidas que la
 * protegen la achican; endurecerse hace chocar las ondas. Toma 2: tres perillas que se ajustan juntas: contenido
 * claro, tono neutro y frases equilibradas. Toma 3: la conversación: la frase de Melissa, el desvío de James y la misma
 * frase repetida; pequeños acuerdos con visto; la pregunta sobre su razonamiento; el cierre; la información llega.
 */

const ID = 'fb11', P = 'fb-defensiva';

export const DefensivaFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('ataque'), 'Toda crítica es un ataque'], [m('melissa'), 'Melissa coordina'], [m('james'), 'James entrega tarde'], [m('lista'), 'No está en la lista'],
    [m('gritar'), 'Conocido por gritar'], [m('disculpas'), 'Salidas que debilitan'], [m('endurecerse'), 'Endurecerse escala'],
    [m('tres'), 'Tres partes juntas'], [m('dijo'), 'La frase de Melissa'], [m('repitio'), 'Repetir la misma frase'], [m('acuerdos'), 'Pequeños acuerdos'],
    [m('gracias'), 'Un cierre simple'], [m('llegue'), 'Que la información llegue'],
  ];
  const achica = sm(t, m('disculpas'), m('debil') + 0.5) * (1 - sm(t, m('endurecerse'), m('endurecerse') + 0.5));
  const SALIDAS = ['Pedir disculpas', 'Mandar un correo', 'Que hable otro'];
  const DIALES = [['contenido', 'Contenido claro'], ['tono', 'Tono neutro'], ['frases', 'Frases equilibradas']] as const;
  const FRASE = 'En febrero, marzo y abril no recibimos lo que te comprometiste a entregar';

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Quien se pone a la defensiva">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · Melissa y James */}
      <TomaFB t={t} a={0} b={m('tres')} cy={500}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        <g opacity={e1(t, m('melissa'))}>
          <g transform={`translate(300 720) scale(${1 - 0.18 * achica}) translate(-300 -720)`}><Persona id={ID} x={300} y={720} s={1.05} cuerpo={ROSA} /></g>
          <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Melissa</Txt>
        </g>
        {t >= m('james') && (
          <g opacity={e1(t, m('james'))}>
            <Edificio x={1020} y={720} w={120} h={220} color={GRIS} />
            <Persona id={ID} x={880} y={720} s={1.05} cuerpo={AZUL_M} ojos={t >= m('gritar') ? 0.5 : 1} />
            <Txt x={880} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>James</Txt>
            {vent(t, m('james'), m('lista')) > 0.01 && [0, 1, 2].map((k) => {
              const u = sm(t, m('james') + 0.6 + k * 0.9, m('james') + 1.6 + k * 0.9);
              const falta = k === 1;
              return <g key={k} opacity={vent(t, m('james'), m('lista')) * (falta ? 0.35 : 1)}><Caja x={lerp(790, 390, falta ? 0 : u)} y={640 - k * 6} w={56} h={44} color={falta ? '#e5e7eb' : '#d6a36a'} /></g>;
            })}
          </g>
        )}
        {vent(t, m('lista'), m('gritar')) > 0.01 && (
          <g opacity={vent(t, m('lista'), m('gritar'))}>
            <Lista x={600} y={400} s={0.9} n={4} hechos={4} titulo="Recomendados" c={c} />
            <Letrero x={600} y={600} texto="Sin James" fondo={GRIS} id={ID} tam={28} />
          </g>
        )}
        {t >= m('gritar') && t < m('disculpas') + 0.5 && <Ondas x1={820} y1={580} x2={420} y2={580} t={t} color={ROJO_M} op={vent(t, m('gritar'), m('disculpas') + 0.5)} n={4} />}
        {vent(t, m('disculpas'), m('endurecerse')) > 0.01 && (
          <g opacity={vent(t, m('disculpas'), m('endurecerse'))}>
            {SALIDAS.map((txt, k) => <Letrero key={k} x={600} y={260 + k * 80} texto={txt} fondo={GRIS} id={ID} tam={28} op={e1(t, m('disculpas') + k * 0.8)} />)}
            {t >= m('debil') && <Letrero x={600} y={520} texto="La hacen ver débil" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('debil'))} />}
          </g>
        )}
        {t >= m('endurecerse') && (
          <g opacity={e1(t, m('endurecerse'))}>
            <Ondas x1={360} y1={560} x2={590} y2={560} t={t * 1.6} color={ROJO_M} n={4} />
            <Ondas x1={820} y1={560} x2={610} y2={560} t={t * 1.6} color={ROJO_M} n={4} />
            <circle cx={600} cy={560} r={30 + 10 * Math.sin(t * 8)} fill={ROJO_M} opacity={0.35} />
            <Letrero x={600} y={380} texto="La conversación escala" fondo={ROJO_M} id={ID} tam={28} />
          </g>
        )}
      </TomaFB>

      {/* 2 · tres perillas */}
      <TomaFB t={t} a={m('tres')} b={m('dijo')} cy={470}>
        <rect x={130} y={230} width={940} height={380} rx={34} fill={c.panel} opacity={e1(t, m('tres'))} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
        {DIALES.map(([n, txt], k) => {
          const x = 290 + k * 310, u = sm(t, m(n), m(n) + 1);
          return <g key={n}>{k < 2 && <Txt x={x + 155} y={440} textAnchor="middle" fontSize={40} fill={c.tenue} opacity={e1(t, m(DIALES[k + 1][0]))}>+</Txt>}<Dial x={x} y={440} v={lerp(0.1, 0.5, u)} texto={txt} c={c} id={ID} r={80} op={e1(t, m(n))} tam={28} color={[AZUL_M, VERDE, VIOLETA][k]} /></g>;
        })}
        {!movil && t >= m('contenido') && <Txt f="a" x={290} y={560} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('contenido') + 0.5)}>como un noticiero</Txt>}
        {!movil && t >= m('tono') && <Txt f="a" x={600} y={560} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('tono') + 0.5)}>se ensaya antes</Txt>}
        {!movil && t >= m('frases') && <Txt f="a" x={910} y={560} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('frases') + 0.5)}>sin adjetivos</Txt>}
      </TomaFB>

      {/* 3 · la conversación */}
      <TomaFB t={t} a={m('dijo')} b={fin + 1} cy={500}>
        <Suelo y={720} isDark={isDark} x0={100} x1={1100} />
        <Persona id={ID} x={260} y={720} s={1.05} cuerpo={ROSA} />
        <Persona id={ID} x={940} y={720} s={1.05} cuerpo={AZUL_M} ojos={t >= m('llegue') ? 1 : 0.6} />
        <Txt x={260} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Melissa</Txt>
        <Txt x={940} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>James</Txt>
        {vent(t, m('dijo'), m('repitio') + 0.2) > 0.01 && <g opacity={vent(t, m('dijo'), m('repitio') + 0.2)}><Burbuja x={280} y={500} w={620} texto={FRASE} u={sm(t, m('dijo'), m('dijo') + 3.2)} c={c} id={ID} tam={28} marca /></g>}
        {vent(t, m('repitio'), m('acuerdos')) > 0.01 && (
          <g opacity={vent(t, m('repitio'), m('acuerdos'))}>
            <g opacity={vent(t, m('repitio') + 0.2, m('repitio') + 1.7)}><Burbuja x={920} y={510} w={420} texto="¡Y qué hay de los demás!" u={sm(t, m('repitio') + 0.2, m('repitio') + 1.1)} c={c} id={ID} tam={28} lado="der" /></g>
            <g opacity={sm(t, m('repitio') + 1.7, m('repitio') + 2.1)}><Burbuja x={280} y={500} w={620} texto={FRASE} u={1} c={c} id={ID} tam={28} marca /></g>
            <Letrero x={600} y={620} texto="La misma frase" fondo={VERDE} id={ID} tam={28} op={sm(t, m('repitio') + 2.1, m('repitio') + 2.5)} />
          </g>
        )}
        {vent(t, m('acuerdos'), m('gracias')) > 0.01 && (
          <g opacity={vent(t, m('acuerdos'), m('gracias'))}>
            <g opacity={vent(t, m('acuerdos') + 0.3, m('falla'))}><Letrero x={600} y={300} texto="«La corrida dura tres días»" fondo={AZUL_M} id={ID} tam={28} /><Visto x={600} y={370} r={24} op={e1(t, m('acuerdos') + 1.4)} /></g>
            {t >= m('falla') && <g opacity={e1(t, m('falla'))}><Burbuja x={280} y={520} w={480} texto="¿Ves alguna falla en mi razonamiento?" u={sm(t, m('falla'), m('falla') + 1.6)} c={c} id={ID} tam={28} /></g>}
          </g>
        )}
        {vent(t, m('gracias'), m('llegue')) > 0.01 && <g opacity={vent(t, m('gracias'), m('llegue'))}><Burbuja x={280} y={500} w={480} texto="Gracias por reunirte conmigo" u={sm(t, m('gracias'), m('gracias') + 1.4)} c={c} id={ID} tam={28} /></g>}
        {t >= m('llegue') && (
          <g opacity={e1(t, m('llegue'))}>
            <Flujo x1={320} y1={590} x2={880} y2={590} t={t} n={6} arco={60} color={[ROSA, NARANJA]} />
            <Letrero x={600} y={380} texto="Que la información le llegue" id={ID} tam={30} />
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
