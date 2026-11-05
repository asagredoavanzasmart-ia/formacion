import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Engranaje, Hoja, Suelo, Flecha, Arco, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Hablar simple (Trout y Rivkin).
 * Toma 1: la agencia presenta frente a una pizarra; palabras de moda flotan sobre la mesa; signos de pregunta sobre
 * cada cabeza; la persona más joven levanta la mano: no lo entiendo.
 * Toma 2: la máquina traductora: entra «dimensionar esta iniciativa» y sale «hagamos un plan».
 * Toma 3: una frase larga que la tijera corta en frases cortas; la cita de Welch; el documento que vuelve a su autor.
 */

const ID = 'es08', P = 'es-simple';

export const SimpleES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('simples'), 'En palabras simples'], [m('agencia'), 'Dos horas de jerga'], [m('joven'), 'Nadie había entendido'], [m('entiendo'), 'Decir «no lo entiendo»'],
    [m('jerga'), 'Cazar la jerga'], [m('plan'), 'Hagamos un plan'], [m('claro'), 'Escribir claro'], [m('welch'), 'Jack Welch'], [m('norma'), 'Una norma explícita'],
  ];
  const JERGA = ['intencionalidad', 'paradigmas', 'intencionalidad', 'paradigmas'];
  const tr = ((t - m('dimensionar')) * 0.3) % 1;
  const corte = sm(t, m('cortas'), m('cortas') + 1.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Hablar simple">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la reunión con la agencia */}
      <Toma t={t} a={0} b={m('jerga')} cy={480}>
        <Suelo y={760} isDark={isDark} x0={80} x1={1120} />
        <rect x={120} y={210} width={360} height={240} rx={12} fill={c.panel} opacity={e1(t, m('agencia'))} />
        <Persona id={ID} x={300} y={760} s={1} cuerpo="#111827" corbata />
        {t >= m('paradigmas') && JERGA.map((w, k) => {
          const x = 560 + (k % 2) * 260 + 20 * Math.sin(t * 1.3 + k), y = 260 + Math.floor(k / 2) * 90 + 12 * Math.cos(t + k);
          return <Letrero key={k} x={x} y={y} texto={w} fondo={k % 2 ? VIOLETA : GRIS} id={ID} tam={26} op={e1(t, m('paradigmas') + 0.3 * k) * (1 - 0.6 * sm(t, m('entiendo'), m('entiendo') + 1))} />;
        })}
        {[0, 1, 2].map((k) => {
          const x = 640 + k * 170;
          const joven = k === 2;
          return (
            <g key={k} opacity={e1(t, m('agencia') + 0.2 * k)}>
              <Persona id={ID} x={x} y={760} s={joven ? 0.85 : 0.95} cuerpo={[AZUL_M, ROSA, NARANJA][k]} />
              {joven && t >= m('joven') && <rect x={x + 30} y={760 - 250} width={18} height={110} rx={9} fill="#f7c4a0" />}
              {t >= m('nadie') && <Txt x={x} y={540} textAnchor="middle" fontSize={56} fill={ROJO_M} opacity={e1(t, m('nadie') + 0.15 * k)}>?</Txt>}
            </g>
          );
        })}
        {t >= m('joven') && <Burbuja x={960} y={480} w={340} texto="No lo entendí" u={sm(t, m('joven'), m('joven') + 0.8)} c={c} id={ID} tam={30} lado="der" />}
        {t >= m('entiendo') && <Letrero x={600} y={180} texto="Pedir que se traduzca a lenguaje llano" id={ID} tam={28} op={e1(t, m('entiendo'))} />}
      </Toma>

      {/* 2 · la máquina traductora */}
      <Toma t={t} a={m('jerga')} b={m('claro')} cy={470}>
        <g opacity={e1(t, m('jerga'))}>
          <rect x={460} y={340} width={280} height={260} rx={30} fill="#475569" />
          <Engranaje x={540} y={420} r={40} t={t * 2} color="#94a3b8" hueco="#475569" />
          <Engranaje x={650} y={500} r={52} t={-t * 1.6} color="#cbd5e1" hueco="#475569" />
          <path d="M 460 420 L 380 380 V 560 L 460 520 Z" fill="#334155" /><path d="M 740 420 L 820 380 V 560 L 740 520 Z" fill="#334155" />
        </g>
        {t >= m('fortune') && <Txt f="a" x={600} y={250} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('fortune'))}>«Memos del infierno» · revista Fortune</Txt>}
        {t >= m('dimensionar') && (
          <g>
            <g opacity={tr < 0.45 ? 1 : 0} transform={`translate(${lerp(40, 380, Math.min(1, tr / 0.45))} 0)`}><Letrero x={0} y={470} texto="Dimensionar esta iniciativa" fondo={GRIS} id={ID} tam={26} ancla="end" /></g>
            {t >= m('plan') && <g opacity={tr > 0.55 ? 1 : 0} transform={`translate(${lerp(820, 1080, Math.min(1, (tr - 0.55) / 0.3))} 0)`}><Letrero x={0} y={470} texto="Hagamos un plan" fondo={VERDE} id={ID} tam={30} ancla="middle" /></g>}
          </g>
        )}
        {t >= m('plan') && <Letrero x={600} y={720} texto="Jerga que entra, frase simple que sale" id={ID} tam={28} op={e1(t, m('plan') + 0.6)} />}
      </Toma>

      {/* 3 · escribir claro, Welch y la norma */}
      <Toma t={t} a={m('claro')} b={fin + 1} cy={480}>
        {ventana(t, m('claro') - 0.1, m('welch')) > 0.01 && (
          <g opacity={ventana(t, m('claro') - 0.1, m('welch'))}>
            {corte < 0.5
              ? <rect x={140} y={300} width={920} height={60} rx={14} fill={GRIS} />
              : [0, 1, 2, 3].map((k) => <rect key={k} x={140 + k * 240} y={300 + 30 * Math.sin(corte * 3 + k) * (1 - corte)} width={200} height={60} rx={14} fill={[NARANJA, ROSA, AZUL_M, VERDE][k]} />)}
            {t >= m('cortas') && corte < 1 && (
              <g transform={`translate(${lerp(140, 1060, corte)} 330)`}>
                <path d="M -40 -50 L 30 10 M -40 50 L 30 -10" stroke="#475569" strokeWidth={10} strokeLinecap="round" />
                <circle cx={-48} cy={-56} r={16} fill="none" stroke={NARANJA} strokeWidth={8} /><circle cx={-48} cy={56} r={16} fill="none" stroke={NARANJA} strokeWidth={8} />
              </g>
            )}
            {['Frases cortas', 'Palabras familiares', 'Verbos activos', 'Como se habla'].map((r, k) => <g key={r} opacity={e1(t, m('cortas') + 0.6 + 0.6 * k)}><Letrero x={290 + (k % 2) * 620} y={480 + Math.floor(k / 2) * 110} texto={r} fondo={[NARANJA, ROSA, AZUL_M, VERDE][k]} id={ID} tam={30} /></g>)}
            {!movil && <Txt f="a" x={600} y={250} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('claro'))}>Robert Gunning y Rudolph Flesch</Txt>}
          </g>
        )}
        {ventana(t, m('welch') - 0.1, m('norma')) > 0.01 && (
          <g opacity={ventana(t, m('welch') - 0.1, m('norma'))}>
            <rect x={160} y={260} width={880} height={300} rx={30} fill={c.panel} />
            <Txt x={220} y={360} fontSize={40} fill={c.texto}>«Los directivos inseguros</Txt>
            <Txt x={220} y={420} fontSize={40} fill={c.texto}>crean complejidad»</Txt>
            <Txt f="a" x={980} y={520} textAnchor="end" fontSize={28} fill={NARANJA}>Jack Welch, Harvard Business Review</Txt>
          </g>
        )}
        {t >= m('norma') && (
          <g opacity={e1(t, m('norma'))}>
            <Persona id={ID} x={260} y={740} s={1} cuerpo={NARANJA} />
            <Persona id={ID} x={940} y={740} s={1} cuerpo={AZUL_M} />
            {(() => { const u = sm(t, m('vuelve'), m('vuelve') + 1.6); const x = lerp(860, 340, u); return <g transform={`translate(${x} ${560 - 120 * Math.sin(Math.PI * u)}) rotate(${u * 360})`}><Hoja x={0} y={0} w={80} h={100} lineas={4} /></g>; })()}
            <Arco x1={860} y1={520} x2={340} y2={520} u={sm(t, m('vuelve'), m('vuelve') + 1)} color={NARANJA} alto={180} grosor={6} punta />
            <Letrero x={600} y={320} texto="Si no se entiende a la primera, vuelve" id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};

