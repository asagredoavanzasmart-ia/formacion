import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Escudo, Iman, Megafono, Gente, Frasco, Billete, Cruz, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Síntesis: convertirte en la casa.
 * Toma 1: una escalera de seis peldaños en orden (economía, oferta con garantía, imán, un canal, restricción, aliados)
 * que la figura sube a medida que se nombran.
 * Toma 2: el atajo prohibido: saltar a la publicidad sin oferta deja la caja en rojo (crecimiento a crédito).
 * Toma 3: la casa: una mesa de casino donde las fichas siempre vuelven al lado de la casa; el ciclo que se financia solo.
 */

const ID = 'ad30', P = 'ad-sintesis';

export const SintesisAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('secuencia'), 'Una secuencia'], [m('orden'), 'La disciplina está en el orden'], [m('manana'), 'Mañana a primera hora'], [m('casa'), 'Convertirte en la casa'],
  ];
  const PASOS: [string, string, string][] = [['economia', 'Economía', NARANJA], ['oferta', 'Oferta', ROSA], ['iman', 'Imán', VIOLETA], ['canal', 'Un canal', AZUL_M], ['optimizar', 'Restricción', TEAL], ['aliados', 'Aliados', VERDE]];
  const paso = PASOS.reduce((a, [n], k) => (t >= m(n) - 0.1 ? k : a), -1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Síntesis">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La escalera en orden */}
      <Toma t={t} a={0} b={m('orden')} cy={470}>
        {PASOS.map(([n, txt, col], k) => {
          const on = k <= paso;
          const x = 110 + k * 170, h = 90 + k * 85;
          return (
            <g key={n} opacity={on ? 1 : 0.2}>
              <rect x={x} y={760 - h} width={160} height={h} rx={14} fill={on ? col : c.apagado} />
              <rect x={x + 80} y={760 - h} width={80} height={h} rx={14} fill="#000" opacity={0.1} />
              <Txt x={x + 80} y={760 - h + 56} textAnchor="middle" fontSize={44} fill="#fff" peso={800}>{k + 1}</Txt>
              <Txt f="a" x={x + 80} y={800} textAnchor="middle" fontSize={movil ? 26 : 24} fill={on ? c.texto : c.tenue}>{txt}</Txt>
              {k === 1 && t >= m('garantia') && <Escudo x={x + 80} y={760 - h + 150} s={0.3} u={sm(t, m('garantia'), m('garantia') + 0.6)} />}
            </g>
          );
        })}
        {paso >= 0 && <g transform={`translate(${190 + paso * 170} ${760 - (90 + paso * 85)})`}><Persona id={ID} x={0} y={0} s={0.45} /></g>}
      </Toma>

      {/* 2 · El atajo: crecimiento a crédito */}
      <Toma t={t} a={m('orden')} b={m('manana')} cy={470}>
        <g opacity={e1(t, m('orden'))}>
          <Megafono x={300} y={430} s={1.1} habla={1} t={t} />
          <Frasco x={760} y={700} w={200} h={330} v={lerp(0.6, 0.08, sm(t, m('credito'), m('credito') + 2))} t={t} c={c} rojo={t >= m('credito')} />
          {[0, 1, 2].map((k) => { const ph = ((t * 0.8) + k / 3) % 1; return <Billete key={k} x={lerp(700, 420, ph)} y={430 - 80 * Math.sin(Math.PI * ph)} s={0.6} rot={ph * 60} />; })}
          {t >= m('credito') && <Letrero x={600} y={200} texto="Publicidad sin oferta: crecimiento a crédito" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('credito'))} />}
          {t >= m('credito') && <Cruz x={1000} y={360} r={40} op={e1(t, m('credito') + 0.4)} />}
        </g>
      </Toma>

      {/* 3 · La casa */}
      <Toma t={t} a={m('manana')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('manana'))}>
          <ellipse cx={600} cy={500} rx={460} ry={200} fill="#0f766e" />
          <ellipse cx={600} cy={500} rx={420} ry={170} fill="#14b8a6" opacity={0.35} />
          {Array.from({ length: 10 }, (_, k) => {
            const ph = ((t * 0.35) + k / 10) % 1;
            const x = lerp(260, 900, ph), y = 500 + 80 * Math.sin(k * 1.7);
            return <g key={k} transform={`translate(${x} ${y})`}><ellipse rx={26} ry={10} fill={[ROSA, AMBAR, AZUL_M][k % 3]} /><ellipse cy={-6} rx={26} ry={10} fill={[ROSA, AMBAR, AZUL_M][k % 3]} /><ellipse cy={-6} rx={14} ry={5} fill="#fff" opacity={0.5} /></g>;
          })}
          <Gente x={180} y={460} n={2} activos={2} color={GRIS} paso={60} s={0.5} />
          <Persona id={ID} x={1010} y={480} s={0.6} cuerpo={NARANJA} corbata />
          {([['Sin demora ni esfuerzo', 'manana'], ['Garantía condicional', 'manana'], ['Diagnóstico previo', 'manana'], ['Regla del cien', 'manana']] as const).map(([s], k) => (
            <Letrero key={s} x={300 + (k % 2) * 600} y={190 + Math.floor(k / 2) * 0 + (k >= 2 ? 560 : 0)} texto={s} fondo={[ROSA, VERDE, VIOLETA, AZUL_M][k]} id={ID} tam={24} op={sm(t, m('manana') + 0.6 + k * 0.6, m('manana') + 1.1 + k * 0.6)} />
          ))}
          {t >= m('casa') && <Letrero x={600} y={500} texto="La casa siempre gana" id={ID} tam={40} op={e1(t, m('casa'))} />}
        </g>
      </Toma>
    </Lienzo>
  );
};
