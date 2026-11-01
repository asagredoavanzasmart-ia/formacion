import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Bloque, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Burbuja, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Vender es ayudar a comprar», en cuatro tomas.
 * 1 · Selling is about buying: el proceso no parte del producto (se aparta) sino del recorrido del comprador.
 * 2 · Tres plataformas (reconocimiento, consideración, decisión) y el comprador con su brújula que avanza a la etapa
 *     activa; en cada una, las respuestas de TINYpulse caen con su etiqueta: encaje, reencuadre o no es su fortaleza.
 * 3 · De dónde salen las etapas: donde el comprador no puede avanzar sin un vendedor; primero, ubicarlo.
 * 4 · Lo contrario: vomitar la presentación, el mismo deck para todos. La venta cocodrilo: boca grande, orejas chicas.
 */

const ID = 'ro26';
const nombres = ['selling', 'recorrido', 'plataformas', 'etapas', 'brujula', 'preguntaV', 'tiny', 'etiquetas', 'r', 'cultura', 'arquitecto', 'aporta', 'cons', 'pizza', 'consultor', 'software', 'dec', 'barato', 'integra', 'deDonde', 'distinta', 'sinAyuda', 'ubicar', 'kunkle', 'vomitar', 'deck', 'cocodrilo', 'pregunta'] as const;
type N = typeof nombres[number];

const ETIQ = { si: { txt: 'Buen encaje', col: VERDE }, re: { txt: 'Reencuadre', col: AMBAR }, no: { txt: 'No es su fortaleza', col: '#94a3b8' } };

export const CompradorRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Vender es ayudar a comprar'], [m('recorrido'), 'Parte del comprador'], [m('plataformas'), 'Tres etapas del recorrido'], [m('tiny'), 'El ejemplo: TINYpulse'],
    [m('r'), 'Reconocimiento'], [m('cons'), 'Consideración'], [m('dec'), 'Decisión'],
    [m('deDonde'), 'De dónde salen las etapas'], [m('vomitar'), 'Lo contrario'], [m('cocodrilo'), 'La venta cocodrilo'],
  ];

  const etapa = t >= m('dec') ? 2 : t >= m('cons') ? 1 : t >= m('r') ? 0 : -1;
  const RESP: { n: N; txt: string; e: keyof typeof ETIQ }[][] = [
    [{ n: 'cultura', txt: 'Mala cultura, alta rotación', e: 'si' }, { n: 'arquitecto', txt: '«Necesito otro arquitecto»', e: 're' }],
    [{ n: 'pizza', txt: 'Una fiesta de pizza', e: 'no' }, { n: 'consultor', txt: 'Contratar un consultor', e: 're' }, { n: 'software', txt: 'Software que mida el clima', e: 'si' }],
    [{ n: 'barato', txt: 'El más barato o el líder', e: 'no' }, { n: 'integra', txt: 'El que integra la cultura', e: 'si' }],
  ];
  const PX = [260, 600, 940];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Vender es ayudar a comprar">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · selling is about buying */}
      <Toma t={t} a={-1} b={m('plataformas')} zi={1}>
        <Suelo y={680} isDark={isDark} />
        {(() => { const aparta = sm(t, m('recorrido'), m('recorrido') + 1.5); return (
          <g>
            <g transform={`translate(${lerp(0, -260, aparta)} 0)`} opacity={1 - 0.7 * aparta}>
              <rect x={420} y={420} width={170} height={170} rx={20} fill={NARANJA} /><rect x={420} y={420} width={170} height={40} rx={18} fill="#fff" opacity={0.25} />
              <Txt f="a" x={505} y={630} textAnchor="middle" fontSize={24} fill={c.tenue}>Tu producto</Txt>
            </g>
            <Persona id={ID} x={lerp(800, 700, aparta)} y={680} s={0.9} cuerpo={AZUL_M} />
            <Letrero x={lerp(800, 700, aparta)} y={740} texto="Comprador" fondo={AZUL_M} id={ID} tam={24} />
            <Letrero x={600} y={200} texto="«Selling is about buying»" id={ID} op={e1(t, m('selling'))} />
            {aparta > 0.5 && <path d={`M 760 520 C 900 420 1000 520 1080 400`} stroke={AZUL_M} strokeWidth={6} fill="none" strokeDasharray="12 10" opacity={sm(aparta, 0.5, 1)} />}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 2 · tres plataformas y las etiquetas */}
      <Toma t={t} a={m('plataformas')} b={m('deDonde')}>
        {['Reconocimiento', 'Consideración', 'Decisión'].map((txt, k) => (
          <g key={txt} opacity={e1(t, m('etapas') + k * 0.3)}>
            <Bloque x={PX[k]} y={650} w={240} h={70} color={etapa === k ? NARANJA : '#94a3b8'} alto={24} />
            <Letrero x={PX[k]} y={770} texto={txt} fondo={etapa === k ? NARANJA : PIZARRA} id={ID} tam={24} />
          </g>
        ))}
        {/* comprador con brújula */}
        {t >= m('brujula') && (() => { const k = Math.max(0, etapa); const t0 = etapa <= 0 ? m('brujula') : etapa === 1 ? m('cons') : m('dec'); const desde = Math.max(0, etapa - 1); const x = lerp(PX[desde], PX[k], sm(t, t0, t0 + 1.2)); return (
          <g opacity={e1(t, m('brujula'))}>
            <Persona id={ID} x={x} y={620} s={0.55} cuerpo={AZUL_M} />
            <g transform={`translate(${x + 50} 540)`}><circle r={22} fill="#fff" stroke={PIZARRA} strokeWidth={5} /><path d="M 0 -16 L 6 0 L 0 16 L -6 0 Z" fill={ROJO_M} transform={`rotate(${20 * Math.sin(t * 2)})`} /></g>
          </g>
        ); })()}
        {t >= m('preguntaV') && etapa < 0 && <Letrero x={600} y={200} texto="Cada etapa, una pregunta del vendedor" fondo={PIZARRA} id={ID} op={e1(t, m('preguntaV'))} tam={24} />}
        {t >= m('etiquetas') && etapa < 0 && (Object.values(ETIQ)).map((et, k) => <g key={et.txt} opacity={e1(t, m('etiquetas') + k * 0.3)}><Letrero x={300 + k * 300} y={300} texto={et.txt} fondo={et.col} id={ID} tam={24} /></g>)}
        {/* respuestas de la etapa activa */}
        {etapa >= 0 && RESP[etapa].map((r, k) => t >= m(r.n) && (
          <g key={r.txt} opacity={e1(t, m(r.n))} transform={`translate(0 ${(1 - sm(t, m(r.n), m(r.n) + 0.5)) * -30})`}>
            <rect x={250} y={150 + k * 110} width={700} height={88} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            <rect x={250} y={150 + k * 110} width={12} height={88} rx={6} fill={ETIQ[r.e].col} />
            <Txt f="a" x={290} y={203 + k * 110} fontSize={26} fill={c.texto}>{r.txt}</Txt>
            <Letrero x={940} y={194 + k * 110} texto={ETIQ[r.e].txt} fondo={ETIQ[r.e].col} id={ID} tam={20} ancla="end" />
          </g>
        ))}
        {etapa === 0 && t >= m('aporta') && <Letrero x={600} y={480} texto="Ahí el vendedor aporta" id={ID} op={e1(t, m('aporta'))} tam={24} />}
      </Toma>

      {/* TOMA 3 · de dónde salen las etapas */}
      <Toma t={t} a={m('deDonde')} b={m('vomitar')}>
        {[0, 1, 2].map((k) => <g key={k} opacity={e1(t, m('deDonde') + k * 0.2)}><Persona id={ID} x={PX[k]} y={420} s={0.6} cuerpo={AZUL_M} />{t >= m('distinta') && <Burbuja x={PX[k] - 110} y={180} w={220} texto={['¿Qué me pasa?', '¿Qué opciones hay?', '¿A quién elijo?'][k]} u={sm(t, m('distinta') + k * 0.4, m('distinta') + 1 + k * 0.4)} c={c} id={ID} tam={24} />}</g>)}
        {t >= m('sinAyuda') && <g opacity={e1(t, m('sinAyuda'))}>
          <rect x={120} y={500} width={960} height={14} rx={7} fill={c.apagado} />
          {[430, 770].map((x) => <g key={x}><rect x={x - 6} y={470} width={12} height={74} rx={6} fill={ROJO_M} /><Equipo id={ID} k="ven" x={x} y={680} s={0.45} t={t} nombre={false} /></g>)}
          <Letrero x={600} y={760} texto="Etapa: donde necesita a un vendedor" id={ID} tam={24} />
        </g>}
        {t >= m('ubicar') && <Letrero x={600} y={130} texto="Primero, ubicar al comprador" fondo={AZUL_M} id={ID} op={e1(t, m('ubicar'))} tam={24} />}
      </Toma>

      {/* TOMA 4 · vomitar la presentación; venta cocodrilo */}
      <Toma t={t} a={m('vomitar')} b={fin + 1}>
        <Suelo y={680} isDark={isDark} />
        <Equipo id={ID} k="ven" x={260} y={680} s={0.8} t={t} nombre={false} />
        {t >= m('deck') && Array.from({ length: 10 }, (_, k) => { const ph = ((t - m('deck')) * 0.5 + k / 10) % 1; return <g key={k} opacity={Math.min(1, ph * 5, (1 - ph) * 3)}><Hoja x={lerp(340, 900, ph)} y={lerp(500, 560, ph) - 80 * Math.sin(Math.PI * ph)} w={70} h={50} lineas={2} rot={ph * 60} /></g>; })}
        {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={860 + k * 100} y={680} s={0.55} cuerpo={[AZUL_M, TEAL, VIOLETA][k]} ojos={t >= m('deck') ? 0.15 : 1} />)}
        {t >= m('deck') && <Letrero x={600} y={200} texto="El mismo deck para todos" fondo={PIZARRA} id={ID} op={e1(t, m('deck'))} />}
        {t >= m('cocodrilo') && (() => { const boca = 0.5 + 0.5 * Math.sin(t * 6); return (
          <g opacity={e1(t, m('cocodrilo'))} transform="translate(300 330)">
            <path d={`M -120 0 Q 0 -40 120 -${10 + 40 * boca} L 120 -4 Z`} fill={VERDE} />
            <path d={`M -120 10 Q 0 50 120 ${10 + 40 * boca} L 120 6 Z`} fill="#15803d" />
            <circle cx={-60} cy={-34} r={10} fill="#fff" /><circle cx={-58} cy={-34} r={5} fill="#111" />
            <circle cx={-100} cy={-24} r={4} fill="#15803d" />
            <Letrero x={0} y={120} texto="Boca grande, orejas chicas" fondo={VERDE} id={ID} tam={24} />
          </g>
        ); })()}
      </Toma>
    </Lienzo>
  );
};
