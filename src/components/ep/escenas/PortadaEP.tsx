import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Brujula, Fajo, Contrato, Cifra, Persona, Nube, Hoja, Visto, Cruz, Corazon, Suelo, Bombilla, Calendario, tono, e1, sm, lerp, NARANJA, ROSA, GRIS, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Portada. 1 · La brújula duda entre solución y problema y se queda con el problema.
 * 2 · Dos fajos que crecen: Waze vendida a Google (1150 millones) e Intel compra Moovit (1000), con el contrato de una hoja.
 * 3 · Levine y su recetario: una frustración compartida por mucha gente, antes del producto, el dinero y los inversionistas.
 * 4 · Dos caminos: quien parte de la solución llega a una caja que nadie quiere; quien parte del problema, a gente que la recomienda.
 * 5 · La suerte: oportunidad más preparación.
 */

const ID = 'ep01', P = 'ep-portada';

export const PortadaEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [0.2, 'Dos ventas de mil millones'], [m('frase'), 'Enamórate del problema'], [m('google'), 'Waze y Moovit'], [m('levine'), 'Uri Levine'],
    [m('frustracion'), 'Una frustración compartida'], [m('area'), 'También en tu empresa'], [m('suerte'), 'Oportunidad + preparación'],
  ];
  const giro = t < m('frase') ? 200 * Math.sin(t * 2.2) * (1 - sm(t, m('frase') - 0.6, m('frase'))) : 90 + 6 * Math.sin(t * 3) * Math.exp(-(t - m('frase')) * 1.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Enamórate del problema, no de la solución">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la brújula */}
      <Toma t={t} a={0} b={m('google')} cy={470}>
        <Brujula x={600} y={450} r={150} ang={giro} id={ID} />
        <Letrero x={250} y={450} texto="Solución" fondo={GRIS} id={ID} op={e1(t, 0.4)} />
        <Letrero x={950} y={450} texto="Problema" id={ID} op={e1(t, 0.6)} />
        {t >= m('frase') && <circle cx={950} cy={450} r={110 + 8 * Math.sin(t * 4)} fill={ROSA} opacity={0.12 * e1(t, m('frase'))} />}
      </Toma>

      {/* 2 · dos ventas */}
      <Toma t={t} a={m('google')} b={m('levine')} cy={520}>
        <Suelo y={700} isDark={isDark} x0={120} x1={1080} />
        <Fajo x={330} y={690} n={14 * sm(t, m('google'), m('google') + 2)} w={150} />
        <Cifra x={330} y={470 - 12 * 14 * sm(t, m('google'), m('google') + 2) + 160} valor={1150} u={sm(t, m('google'), m('google') + 2)} color={NARANJA} tam={64} />
        <Letrero x={330} y={770} texto="Waze → Google" fondo={NARANJA} id={ID} op={e1(t, m('google'))} />
        {t >= m('intel') && <>
          <Fajo x={870} y={690} n={12 * sm(t, m('intel'), m('intel') + 2)} w={150} />
          <Cifra x={870} y={470 - 12 * 12 * sm(t, m('intel'), m('intel') + 2) + 160} valor={1000} u={sm(t, m('intel'), m('intel') + 2)} color={ROSA} tam={64} />
          <Letrero x={870} y={770} texto="Moovit → Intel" fondo={ROSA} id={ID} op={e1(t, m('intel'))} />
        </>}
        {t >= m('hoja') && <Contrato x={600} y={lerp(260, 420, e1(t, m('hoja')))} s={0.9} firma={sm(t, m('hoja') + 0.3, m('hoja') + 1.6)} rot={-6} op={e1(t, m('hoja')) * (1 - sm(t, m('intel') - 0.3, m('intel')))} titulo="Una sola hoja" />}
        {(t >= m('google') && !movil) && <Txt f="a" x={330} y={810} textAnchor="middle" fontSize={22} fill={c.tenue}>millones de dólares</Txt>}
      </Toma>

      {/* 3 · Levine, el recetario y la frustración compartida */}
      <Toma t={t} a={m('levine')} b={m('area')} cy={520}>
        <Suelo y={700} isDark={isDark} x0={120} x1={1080} />
        <Persona id={ID} x={600} y={690} s={1.05} />
        <g transform={`translate(${690} ${560})`} opacity={e1(t, m('recetario'))}>
          <rect x={-40} y={-56} width={84} height={108} rx={8} fill={`url(#${ID}-marca)`} /><rect x={-40} y={-56} width={12} height={108} rx={4} fill="#000" opacity={0.2} />
          <rect x={-18} y={-34} width={48} height={8} rx={4} fill="#fff" opacity={0.85} /><rect x={-18} y={-18} width={34} height={6} rx={3} fill="#fff" opacity={0.7} />
        </g>
        {t >= m('recetario') && <Letrero x={600} y={760} texto="Su recetario" id={ID} op={e1(t, m('recetario'))} />}
        {t >= m('frustracion') && <>
          <Nube x={600} y={230} s={1.2} t={t} op={e1(t, m('frustracion'))} />
          {[200, 330, 870, 1000].map((px, k) => <Persona key={px} id={ID} x={px} y={690} s={0.62} cuerpo={['#64748b', '#94a3b8', '#94a3b8', '#64748b'][k]} />)}
          {[200, 330, 870, 1000].map((px, k) => <Nube key={`n${px}`} x={px} y={470} s={0.42} t={t + k} op={e1(t, m('frustracion') + 0.3 + 0.2 * k)} rayos={false} />)}
        </>}
        {t >= m('antes') && !movil && ['Producto', 'Dinero', 'Inversionistas'].map((n, k) => (
          <g key={n} opacity={e1(t, m('antes') + 0.3 * k) * (1 - 0.6 * sm(t, m('saltan'), m('saltan') + 1))}>
            <Letrero x={300 + k * 300} y={380} texto={n} fondo={GRIS} id={ID} tam={26} />
          </g>
        ))}
      </Toma>

      {/* 4 · dos caminos */}
      <Toma t={t} a={m('area')} b={m('suerte')} cy={480}>
        <Persona id={ID} x={170} y={520} s={0.8} />
        <Letrero x={170} y={590} texto="Tu equipo" fondo="#64748b" id={ID} op={e1(t, m('area'))} tam={26} />
        <path d="M 240 470 Q 420 300 760 300" stroke={GRIS} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={640} strokeDashoffset={640 * (1 - sm(t, m('solucion'), m('solucion') + 1.4))} />
        <path d="M 240 490 Q 420 660 760 660" stroke={NARANJA} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={640} strokeDashoffset={640 * (1 - sm(t, m('problema'), m('problema') + 1.4))} />
        {t >= m('solucion') + 1 && <g opacity={e1(t, m('solucion') + 1)}>
          <rect x={790} y={230} width={130} height={110} rx={14} fill="#94a3b8" /><rect x={790} y={230} width={130} height={30} rx={14} fill="#64748b" />
          {[0, 1, 2].map((k) => <circle key={k} cx={820 + k * 34} cy={300 - 10 * Math.sin(t * 2 + k)} r={5} fill="#cbd5e1" opacity={0.6} />)}
          <Cruz x={990} y={285} r={34} />
          <Letrero x={855} y={386} texto="Nadie la pidió" fondo={GRIS} id={ID} tam={26} />
        </g>}
        {t >= m('problema') + 1 && <g opacity={e1(t, m('problema') + 1)}>
          <rect x={790} y={600} width={130} height={110} rx={14} fill={`url(#${ID}-marca)`} />
          {[0, 1].map((k) => <Persona key={k} id={ID} x={960 + k * 90} y={720} s={0.45} cuerpo={k ? ROSA : NARANJA} />)}
          {[0, 1].map((k) => <Corazon key={`c${k}`} x={960 + k * 90} y={600 - 18 * ((t * 0.8 + k * 0.5) % 1)} s={0.55} op={1 - ((t * 0.8 + k * 0.5) % 1)} />)}
          <Letrero x={855} y={770} texto="La usan y la recomiendan" id={ID} tam={26} />
        </g>}
      </Toma>

      {/* 5 · la suerte */}
      <Toma t={t} a={m('suerte')} b={fin + 1} cy={460}>
        <g opacity={e1(t, m('suerte'))}>
          <rect x={150} y={290} width={170} height={260} rx={14} fill="#94a3b8" />
          <path d={`M 160 300 L ${lerp(310, 210, sm(t, m('suerte') + 0.4, m('suerte') + 1.4))} ${lerp(300, 320, sm(t, m('suerte') + 0.4, m('suerte') + 1.4))} V ${lerp(540, 520, sm(t, m('suerte') + 0.4, m('suerte') + 1.4))} L 160 540 Z`} fill={NARANJA} />
          <Letrero x={235} y={610} texto="Oportunidad" fondo={NARANJA} id={ID} />
        </g>
        <Txt x={420} y={450} textAnchor="middle" fontSize={90} fill={c.tenue} opacity={e1(t, m('suerte') + 0.6)}>+</Txt>
        <g opacity={e1(t, m('suerte') + 0.8)}>
          <Calendario x={600} y={420} s={1.1} marcados={Math.floor(14 * sm(t, m('suerte') + 1, m('preparacion') + 1))} />
          <Letrero x={600} y={610} texto="Preparación" fondo={ROSA} id={ID} />
        </g>
        <Txt x={780} y={450} textAnchor="middle" fontSize={90} fill={c.tenue} opacity={e1(t, m('preparacion'))}>=</Txt>
        <g opacity={e1(t, m('preparacion') + 0.3)}>
          <Bombilla x={960} y={440} s={1.4} id={ID} t={t} luz={sm(t, m('preparacion') + 0.3, m('preparacion') + 1.2)} />
          <Letrero x={960} y={610} texto="Suerte" id={ID} />
        </g>
        {t >= m('preparacion') && <Visto x={600} y={740} r={30} op={e1(t, m('preparacion') + 1)} />}
      </Toma>
    </Lienzo>
  );
};
