import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Cara, Corazon, Auto, Espalda, Cruz, Visto, Suelo, Flecha, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';
import { useTam } from '../../comunicacion/escenas/comunCE';

/**
 * De «eso está mal» a «cuéntame más». Toma 1: la frase que cierra se tacha y aparece la que abre; tres etiquetas vagas
 * cuelgan de un hilo; una se desarma hacia atrás (¿qué viste?) y hacia adelante (¿qué harías distinto?); el caso de la
 * vendedora: el cliente pregunta dos veces por el precio y ella cambia de tema. Toma 2: tres puntos ciegos: tu cara y
 * tu tono (una persona de espaldas que no ve su propio gesto), intención frente a impacto (corazón de un lado, golpe
 * del otro) y situación frente a carácter (el tráfico para mí, «irresponsable» para él). Toma 3: la pregunta potente
 * y el patrón: tres personas que dicen lo mismo.
 */

const ID = 'fb16', P = 'fb-verdad';

const Etiqueta: React.FC<{ x: number; y: number; texto: string; c: ReturnType<typeof tono>; op?: number; rot?: number }> = ({ x, y, texto, c, op = 1, rot = 0 }) => {
  const tam = useTam(26);
  const w = texto.length * tam * 0.56 + 50;
  return op < 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={op}>
      <line x1={0} y1={-60} x2={0} y2={-tam * 0.9 - 4} stroke={c.tenue} strokeWidth={3} />
      <path d={`M ${-w / 2} ${-tam * 0.9} L ${w / 2} ${-tam * 0.9} L ${w / 2 + 28} 0 L ${w / 2} ${tam * 0.9} L ${-w / 2} ${tam * 0.9} Z`} fill="#fde68a" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.18))' }} />
      <circle cx={w / 2 + 6} cy={0} r={6} fill={c.panel} />
      <Txt x={0} y={tam * 0.35} textAnchor="middle" fontSize={26} fill="#78350f">{texto}</Txt>
    </g>
  );
};

export const VerdadFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('frase'), 'Cambiar una frase'], [m('etiquetas'), 'Etiquetas vagas'], [m('atras'), 'Hacia atrás'], [m('adelante'), 'Hacia adelante'], [m('vendedora'), '«Poco convincente»'],
    [m('ciegos'), 'Puntos ciegos'], [m('cara'), 'Tu cara y tu tono'], [m('intenciones'), 'Intención o impacto'], [m('situacion'), 'Situación o carácter'],
    [m('absurdo'), '¿Un punto ciego?'], [m('potente'), 'La pregunta más potente'], [m('patrones'), 'Busca patrones'],
  ];
  const ETQ = ['Sé más proactivo', 'Más estratégico', 'Más prolijo'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="De «eso está mal» a «cuéntame más»">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · la frase y las etiquetas */}
      <TomaFB t={t} a={0} b={m('ciegos')} cy={470}>
        {vent(t, -1, m('etiquetas')) > 0.01 && (
          <g opacity={vent(t, -1, m('etiquetas'))}>
            <Letrero x={600} y={300} texto="«Eso está mal»" fondo={GRIS} id={ID} tam={40} op={1 - 0.5 * sm(t, m('cuentame'), m('cuentame') + 0.5)} />
            <rect x={430} y={296} width={340 * sm(t, m('cuentame') - 0.3, m('cuentame') + 0.3)} height={8} rx={4} fill={ROJO_M} />
            {t >= m('cuentame') && <Letrero x={600} y={460} texto="«Cuéntame más»" id={ID} tam={44} op={e1(t, m('cuentame'))} />}
          </g>
        )}
        {vent(t, m('etiquetas'), m('vendedora')) > 0.01 && (
          <g opacity={vent(t, m('etiquetas'), m('vendedora'))}>
            <line x1={120} y1={170} x2={1080} y2={170} stroke={c.tenue} strokeWidth={3} />
            {ETQ.map((e, k) => {
              const foco = k === 0 ? 1 : 1 - 0.6 * sm(t, m('atras') - 0.4, m('atras'));
              return <Etiqueta key={k} x={260 + k * 340} y={230} texto={e} c={c} op={e1(t, m('etiquetas') + 0.4 + k * 0.5) * foco * (movil && k > 0 ? 0 : 1)} rot={4 * Math.sin(t * 1.5 + k)} />;
            })}
            {t >= m('atras') && (
              <g opacity={e1(t, m('atras'))}>
                <Flecha x1={250} y1={300} x2={130} y2={430} u={sm(t, m('atras'), m('atras') + 0.6)} color={AZUL_M} grosor={10} />
                <Letrero x={230} y={500} texto="¿Qué viste?" fondo={AZUL_M} id={ID} tam={30} />
              </g>
            )}
            {t >= m('adelante') && (
              <g opacity={e1(t, m('adelante'))}>
                <Flecha x1={290} y1={300} x2={560} y2={430} u={sm(t, m('adelante'), m('adelante') + 0.6)} color={VERDE} grosor={10} />
                <Letrero x={680} y={500} texto="¿Qué harías distinto?" fondo={VERDE} id={ID} tam={30} />
              </g>
            )}
          </g>
        )}
        {t >= m('vendedora') && (
          <g opacity={e1(t, m('vendedora'))}>
            <Suelo y={720} isDark={isDark} x0={100} x1={1100} />
            <Persona id={ID} x={300} y={720} s={1.05} cuerpo={ROSA} />
            <Persona id={ID} x={880} y={720} s={1.05} cuerpo={AZUL_M} corbata />
            <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Vendedora</Txt>
            <Txt x={880} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Cliente</Txt>
            <Etiqueta x={300} y={250} texto="Poco convincente" c={c} op={1 - 0.6 * sm(t, m('precio'), m('precio') + 0.5)} />
            {t >= m('precio') && (
              <g opacity={e1(t, m('precio'))}>
                <Burbuja x={860} y={510} w={300} texto="¿Y el precio?" u={sm(t, m('precio'), m('precio') + 0.8)} c={c} id={ID} tam={28} lado="der" />
                <Txt x={720} y={330} textAnchor="middle" fontSize={44} fill={ROJO_M} opacity={sm(t, m('precio') + 1, m('precio') + 1.4)}>×2</Txt>
                <g opacity={sm(t, m('precio') + 1.4, m('precio') + 1.8)}><Burbuja x={320} y={510} w={300} texto="Y otro tema…" u={sm(t, m('precio') + 1.6, m('precio') + 2.4)} c={c} id={ID} tam={28} /></g>
              </g>
            )}
          </g>
        )}
      </TomaFB>

      {/* 2 · puntos ciegos */}
      <TomaFB t={t} a={m('ciegos')} b={m('potente')} cy={470}>
        {[['cara', 'Cara|y tono'], ['intenciones', 'Intención|o impacto'], ['situacion', 'Situación|o carácter']].map(([n, txt], k) => {
          const x = 220 + k * 380, o = e1(t, m(n));
          return o > 0.01 ? (
            <g key={n} opacity={o}>
              <rect x={x - 175} y={160} width={350} height={500} rx={28} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
              {k === 0 && (
                <g>
                  <Espalda x={x - 40} y={470} s={1.6} c={c} />
                  <Cara x={x + 80} y={320} r={50} id={ID} cejas={1} boca={-0.7} />
                  <path d={`M ${x + 30} 330 Q ${x - 10} 360 ${x - 30} 400`} stroke={c.tenue} strokeWidth={4} fill="none" strokeDasharray="8 8" />
                </g>
              )}
              {k === 1 && (
                <g>
                  <Corazon x={x - 70} y={330} s={1.2} color={ROSA} />
                  <Txt x={x} y={430} textAnchor="middle" fontSize={26} fill={ROSA}>Tu intención</Txt>
                  <circle cx={x + 80} cy={330} r={46} fill={ROJO_M} opacity={0.2 + 0.6 * sm(t, m('humillacion'), m('humillacion') + 0.6)} />
                  <Txt x={x} y={478} textAnchor="middle" fontSize={26} fill={ROJO_M} opacity={sm(t, m('humillacion'), m('humillacion') + 0.6)}>Su vivencia</Txt>
                </g>
              )}
              {k === 2 && (
                <g>
                  <Auto x={x - 60} y={350} s={0.45} color={AZUL_M} />
                  <Txt x={x} y={430} textAnchor="middle" fontSize={26} fill={AZUL_M} opacity={sm(t, m('trafico'), m('trafico') + 0.5)}>Yo: tráfico</Txt>
                  <rect x={x + 30} y={300} width={120} height={50} rx={12} fill={ROJO_M} opacity={sm(t, m('trafico') + 0.8, m('trafico') + 1.3)} />
                  <Txt x={x} y={478} textAnchor="middle" fontSize={26} fill={ROJO_M} opacity={sm(t, m('trafico') + 0.8, m('trafico') + 1.3)}>Él: carácter</Txt>
                </g>
              )}
              {txt.split("|").map((l, j) => <Txt key={j} x={x} y={570 + j * 40} textAnchor="middle" fontSize={28} fill={c.texto}>{l}</Txt>)}
            </g>
          ) : null;
        })}
        {t >= m('absurdo') && <Letrero x={600} y={740} texto="¿Me parece absurdo? Quizás es un punto ciego" id={ID} tam={28} op={e1(t, m('absurdo'))} />}
      </TomaFB>

      {/* 3 · la pregunta y los patrones */}
      <TomaFB t={t} a={m('potente')} b={fin + 1} cy={480}>
        <Suelo y={720} isDark={isDark} x0={100} x1={1100} />
        <Persona id={ID} x={220} y={720} s={1.05} cuerpo={NARANJA} />
        {vent(t, m('potente'), m('patrones')) > 0.01 && <g opacity={vent(t, m('potente'), m('patrones'))}><Burbuja x={240} y={510} w={740} texto="¿Qué es una cosa que me ves hacer, o dejar de hacer, que me juega en contra?" u={sm(t, m('potente'), m('potente') + 3)} c={c} id={ID} tam={30} marca /></g>}
        {t >= m('patrones') && (
          <g opacity={e1(t, m('patrones'))}>
            {[0, 1, 2].map((k) => (
              <g key={k} opacity={e1(t, m('patrones') + 0.4 + k * 0.5)}>
                <Persona id={ID} x={560 + k * 200} y={720} s={0.95} cuerpo={[AZUL_M, VIOLETA, VERDE][k]} />
                <rect x={510 + k * 200} y={430} width={100} height={60} rx={16} fill={c.panel} />
                <rect x={530 + k * 200} y={452} width={60} height={14} rx={7} fill={NARANJA} />
              </g>
            ))}
            <Letrero x={760} y={330} texto="Probablemente sea cierto" fondo={VERDE} id={ID} tam={30} op={sm(t, m('patrones') + 2, m('patrones') + 2.5)} />
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
