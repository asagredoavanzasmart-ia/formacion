import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Calendario, Pieza, Diana, Bandera, Corazon, Cifra, Cruz, Visto, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Reconocer bien. Toma 1: tres errores: un calendario con un solo día marcado al azar; la bandeja de sándwiches del
 * trimestre; la misma tarjeta de 25 dólares en una balanza frente a 50.000 dólares ahorrados, que termina en chiste.
 * Toma 2: cinco rasgos, cada uno con su dibujo: frecuente (cada dos semanas), conectado (hilo hasta el blanco de la
 * empresa), proporcional (balanza pareja), personal (un regalo distinto para cada quien) y por hitos (banderas en el
 * camino). Toma 3: dos niños y sus rompecabezas: el elogio a la inteligencia lleva al fácil y el elogio al esfuerzo al
 * difícil; el elogio como colchón antes de la crítica se tacha.
 */

const ID = 'fb14', P = 'fb-reconocer';

const Tarjeta: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-70} y={-44} width={140} height={88} rx={12} fill={VIOLETA} style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.25))' }} />
    <rect x={-70} y={-24} width={140} height={14} fill="#fbbf24" />
  </g>
);

export const ReconocerFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('facil'), 'Parece fácil'], [m('errores'), 'Tres errores'], [m('acuerda'), 'Cuando se acuerda'], [m('sandwiches'), 'Sándwiches por trimestre'],
    [m('tarjeta'), 'La misma tarjeta'], [m('rasgos'), 'Cinco rasgos'], [m('esfuerzo'), 'El esfuerzo, no el talento'], [m('colchon'), 'Sin colchón'],
  ];
  const RASGOS = [['frecuente', 'Frecuente'], ['conectado', 'Conectado'], ['proporcional', 'Proporcional'], ['personal', 'Personal'], ['hito', 'Por hitos']] as const;
  const eleccion = sm(t, m('facil2'), m('dificil') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Reconocer bien">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · tres errores */}
      <TomaFB t={t} a={0} b={m('rasgos')} cy={470}>
        {t < m('errores') && <Txt x={600} y={440} textAnchor="middle" fontSize={36} fill={c.texto} opacity={vent(t, m('facil'), m('errores'))}>Se hace mal con frecuencia</Txt>}
        {[['acuerda', 'Cuando|se acuerda'], ['sandwiches', 'Una vez|por trimestre'], ['tarjeta', 'Siempre|la misma']].map(([n, txt], k) => {
          const x = 220 + k * 380, o = e1(t, m(n));
          return o > 0.01 ? (
            <g key={n} opacity={o}>
              <rect x={x - 170} y={170} width={340} height={480} rx={28} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
              {k === 0 && <><Calendario x={x} y={360} s={1.3} /><circle cx={x + 30} cy={362} r={18} fill={ROJO_M} opacity={0.8} /></>}
              {k === 1 && (
                <g>
                  <ellipse cx={x} cy={420} rx={130} ry={30} fill={c.apagado} />
                  {[-60, 0, 60].map((dx, j) => <g key={j} transform={`translate(${x + dx} ${380 - (j === 1 ? 20 : 0)})`}><path d="M -40 20 L 40 20 L 0 -30 Z" fill="#fde68a" /><path d="M -34 14 L 34 14 L 0 -18 Z" fill="#86efac" /></g>)}
                </g>
              )}
              {k === 2 && (
                <g>
                  <rect x={x - 4} y={300} width={8} height={170} fill={GRIS} />
                  <g>
                    <rect x={x - 140} y={296} width={280} height={8} rx={4} fill={GRIS} />
                    <Tarjeta x={x - 110} y={260} s={0.55} />
                    <Tarjeta x={x + 110} y={260} s={0.55} />
                  </g>
                  <Txt x={x} y={500} textAnchor="middle" fontSize={28} fill={c.texto}>Un sábado</Txt>
                  <Txt x={x} y={540} textAnchor="middle" fontSize={28} fill={c.texto} opacity={sm(t, m('tarjeta') + 1, m('tarjeta') + 1.6)}>o US$ 50.000</Txt>
                  {t >= m('chiste') && <Txt x={x} y={216} textAnchor="middle" fontSize={30} fill={ROSA} opacity={e1(t, m('chiste'))}>ja, ja</Txt>}
                </g>
              )}
              {txt.split("|").map((l, j) => <Txt key={j} x={x} y={580 + j * 40} textAnchor="middle" fontSize={28} fill={c.texto}>{l}</Txt>)}
              <Cruz x={x + 140} y={190} r={24} op={sm(t, m(n) + 1, m(n) + 1.5)} />
            </g>
          ) : null;
        })}
      </TomaFB>

      {/* 2 · cinco rasgos */}
      <TomaFB t={t} a={m('rasgos')} b={m('esfuerzo')} cy={470}>
        {RASGOS.map(([n, txt], k) => {
          const x = k < 3 ? 240 + k * 360 : 420 + (k - 3) * 360, y = k < 3 ? 300 : 590;
          const o = e1(t, m(n));
          return o > 0.01 ? (
            <g key={n} opacity={o}>
              <circle cx={x} cy={y - 20} r={92} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.15))' }} />
              {k === 0 && <Calendario x={x} y={y - 20} s={0.8} marcados={Math.min(14, Math.floor(Math.max(0, t - m(n)) * 4))} />}
              {k === 1 && <><path d={`M ${x - 60} ${y + 10} Q ${x - 20} ${y - 70} ${x + 30} ${y - 30}`} stroke={NARANJA} strokeWidth={6} fill="none" strokeDasharray="10 8" /><Diana x={x + 40} y={y - 40} r={34} /></>}
              {k === 2 && <><rect x={x - 3} y={y - 70} width={6} height={90} fill={GRIS} /><rect x={x - 70} y={y - 72} width={140} height={6} rx={3} fill={GRIS} /><circle cx={x - 56} cy={y - 40} r={20} fill={VERDE} /><circle cx={x + 56} cy={y - 40} r={20} fill={VERDE} /></>}
              {k === 3 && <><rect x={x - 70} y={y - 60} width={56} height={56} rx={8} fill={ROSA} /><rect x={x - 70} y={y - 36} width={56} height={8} fill="#fff" /><rect x={x + 14} y={y - 60} width={56} height={56} rx={8} fill={AZUL_M} /><rect x={x + 38} y={y - 60} width={8} height={56} fill="#fff" /></>}
              {k === 4 && <><path d={`M ${x - 70} ${y + 20} L ${x + 70} ${y + 20}`} stroke={c.apagado} strokeWidth={6} />{[-50, 0, 50].map((dx, j) => <Bandera key={j} x={x + dx} y={y + 20} alto={70} color={[NARANJA, AZUL_M, VERDE][j]} t={t} op={sm(t, m(n) + j * 0.4, m(n) + 0.4 + j * 0.4)} />)}</>}
              <Txt x={x} y={y + 112} textAnchor="middle" fontSize={30} fill={c.texto}>{txt}</Txt>
            </g>
          ) : null;
        })}
        {t >= m('gallup') && !movil && <Txt f="a" x={240} y={130} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={vent(t, m('gallup'), m('proporcional'))}>Gallup: el compromiso depende de la frecuencia</Txt>}
      </TomaFB>

      {/* 3 · esfuerzo, no talento */}
      <TomaFB t={t} a={m('esfuerzo')} b={fin + 1} cy={480}>
        {vent(t, m('esfuerzo'), m('colchon')) > 0.01 && (
          <g opacity={vent(t, m('esfuerzo'), m('colchon'))}>
            <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
            {vent(t, m('esfuerzo'), m('rompecabezas')) > 0.01 && <Letrero x={600} y={360} texto="Elogia el esfuerzo, no el talento" id={ID} tam={32} op={vent(t, m('esfuerzo'), m('rompecabezas'))} />}
            {[0, 1].map((k) => {
              const x0 = k ? 840 : 360;
              const destino = k ? 1040 : 160;
              const x = lerp(x0, destino, eleccion);
              return (
                <g key={k}>
                  <Persona id={ID} x={x} y={720} s={0.7} cuerpo={k ? VERDE : AZUL_M} />
                  {t >= m('rompecabezas') && t < m('facil2') && <g opacity={vent(t, m('rompecabezas'), m('facil2'))}><Burbuja x={x0 + (k ? -10 : 10)} y={k ? 360 : 560} w={330} texto={k ? '¡Cuánto te esforzaste!' : '¡Qué inteligente eres!'} u={sm(t, m('rompecabezas') + 0.8 + k * 1.2, m('rompecabezas') + 1.8 + k * 1.2)} c={c} id={ID} tam={26} lado={k ? 'der' : 'izq'} /></g>}
                </g>
              );
            })}
            {/* rompecabezas inicial */}
            {[0, 1, 2, 3].map((k) => <Pieza key={k} x={560 + (k % 2) * 80} y={600 + Math.floor(k / 2) * 80} s={0.95} color={[NARANJA, AZUL_M, VERDE, ROSA][k]} op={vent(t, m('rompecabezas'), m('facil2'))} />)}
            {t >= m('facil2') && (
              <g opacity={e1(t, m('facil2'))}>
                {[0, 1].map((k) => <Pieza key={k} x={200 + k * 80} y={440} s={0.9} color={GRIS} />)}
                <Txt x={240} y={360} textAnchor="middle" fontSize={28} fill={c.texto}>Fácil</Txt>
              </g>
            )}
            {t >= m('dificil') && (
              <g opacity={e1(t, m('dificil'))}>
                {Array.from({ length: 9 }, (_, k) => <Pieza key={k} x={880 + (k % 3) * 70} y={360 + Math.floor(k / 3) * 70} s={0.75} color={[NARANJA, AZUL_M, VERDE, ROSA, VIOLETA][k % 5]} />)}
                <Txt x={950} y={290} textAnchor="middle" fontSize={28} fill={c.texto}>Difícil</Txt>
              </g>
            )}
          </g>
        )}
        {t >= m('colchon') && (
          <g opacity={e1(t, m('colchon'))}>
            <rect x={340} y={480} width={520} height={120} rx={60} fill={ROSA} opacity={0.8} />
            <Txt x={600} y={555} textAnchor="middle" fontSize={32} fill="#fff">Elogio</Txt>
            <rect x={400} y={300} width={400} height={150} rx={20} fill={GRIS} />
            <Txt x={600} y={390} textAnchor="middle" fontSize={32} fill="#fff">Crítica</Txt>
            <Cruz x={860} y={480} r={40} op={sm(t, m('colchon') + 1, m('colchon') + 1.6)} />
            <Txt x={600} y={700} textAnchor="middle" fontSize={28} fill={c.texto} opacity={sm(t, m('colchon') + 1.4, m('colchon') + 2)}>Enseña a desconfiar de cada elogio</Txt>
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
