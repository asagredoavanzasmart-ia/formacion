import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Lead, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Moneda3D, Calendario, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Crecer sin gastar un peso más», en siete tomas.
 * 1 · Una tasa mejora en una junta del embudo (30 → 35 de cada 100) y la ganancia se propaga a cada etapa siguiente;
 *     el presupuesto no cambia.
 * 2 · Tres siglas (MQL, SQL, SDR) y la junta más frágil: el paso de MQL a SQL, una cañería que gotea.
 * 3 · Toast: los mismos leads, reordenados por el sistema frente al vendedor; la conversión inbound pasa de 1× a 2×
 *     y la tasa de cierre no cae.
 * 4 · Decaimiento: cohortes por día de entrada que se enfrían después del quinto día; soltar lo viejo: 33 % → 45 %.
 * 5 · Puntos de contacto: una secuencia de ocho pasos se abandona antes del salto del contacto quince o dieciséis.
 * 6 · Comisiones: ventas pagadas dos veces y clientes que nunca se activan; el umbral de seis días sin contacto;
 *     la comisión se paga con el cliente activo.
 * 7 · La misma forma: medir una junta, encontrar un umbral, cambiar una regla. Sin más presupuesto.
 */

const ID = 'ro10';
const nombres = ['compone', 'cien', 'etapa', 'presupuesto', 'siglas', 'mql', 'sql', 'sdr', 'junta', 'casos', 'toast', 'midio', 'orden', 'barras1', 'cierre', 'decae', 'cohortes', 'dia4', 'insistian', 'regla', 'barras2', 'aritmetica', 'ingresos33', 'noMas', 'contacto', 'salta', 'comparacion', 'abandona', 'comisiones', 'duplicadas', 'nunca', 'umbral', 'barras4', 'solucion', 'incentivo', 'forma', 'midio2', 'umbral2', 'reglaC', 'presupuesto2', 'pregunta'] as const;
type N = typeof nombres[number];

export const CasosRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Crecer sin gastar más'], [m('compone'), 'La mejora se compone'], [m('presupuesto'), 'No está en el presupuesto'],
    [m('siglas'), 'Tres siglas'], [m('junta'), 'La junta más frágil'],
    [m('toast'), 'Caso 1 · Toast'], [m('decae'), 'Caso 2 · Decaimiento'], [m('contacto'), 'Caso 3 · Puntos de contacto'], [m('comisiones'), 'Caso 4 · Comisiones'],
    [m('forma'), 'La misma forma'],
  ];

  /* Toma 1 · la mejora que se compone */
  const mejora = sm(t, m('cien'), m('cien') + 1.5);
  const etapas = [100, 30 + 5 * mejora, (30 + 5 * mejora) * 0.5, (30 + 5 * mejora) * 0.25];
  const prop = sm(t, m('etapa'), m('etapa') + 2.5);

  /* Toma 3 · Toast: la cola reordenada */
  const reordena = sm(t, m('orden'), m('orden') + 1.8);
  const cola = [0, 1, 2, 3, 4].map((k) => { const viejo = [3, 0, 4, 1, 2][k]; return lerp(viejo, k, reordena); });

  /* Toma 4 · cohortes que se enfrían */
  const dias = 10;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Crecer sin gastar un peso más: cuatro casos">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · la mejora que se compone */}
      <Toma t={t} a={-1} b={m('siglas')} zi={1}>
        {etapas.map((v, k) => {
          const x = 200 + k * 270, h = 380 * v / 100;
          const viejo = [100, 30, 15, 7.5][k];
          const sube = k === 0 ? 0 : k === 1 ? mejora : prop;
          const val = lerp(viejo, v, sube);
          return (
            <g key={k} opacity={e1(t, m('compone') + k * 0.25)}>
              <rect x={x - 70} y={660 - 380 * val / 100} width={140} height={380 * val / 100} rx={14} fill={k === 0 ? '#94a3b8' : `url(#${ID}-marca)`} />
              <Txt x={x} y={640 - 380 * val / 100} textAnchor="middle" fontSize={36} fill={c.texto} peso={800}>{val.toFixed(val < 10 ? 1 : 0).replace('.', ',')}</Txt>
              <Txt f="a" x={x} y={700} textAnchor="middle" fontSize={22} fill={c.tenue}>{['Leads', 'Convierten', 'Oportunidades', 'Clientes'][k]}</Txt>
              {k > 0 && sube > 0.05 && h > 0 && <Txt f="a" x={x} y={740} textAnchor="middle" fontSize={22} fill={VERDE} peso={700} opacity={sube}>+{Math.round((v / viejo - 1) * 100)} %</Txt>}
            </g>
          );
        })}
        {t >= m('cien') && <Letrero x={335} y={180} texto="30 → 35 de cada 100" id={ID} op={e1(t, m('cien'))} />}
        {t >= m('presupuesto') && (
          <g opacity={e1(t, m('presupuesto'))}>
            <rect x={840} y={150} width={240} height={150} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            <Txt f="a" x={860} y={190} fontSize={22} fill={c.tenue}>Presupuesto</Txt>
            <Txt x={860} y={240} fontSize={40} fill={c.texto} peso={800}>= igual</Txt>
            <Visto x={1040} y={260} r={22} />
          </g>
        )}
      </Toma>

      {/* TOMA 2 · tres siglas y la junta frágil */}
      <Toma t={t} a={m('siglas')} b={m('toast')}>
        <Suelo y={700} isDark={isDark} />
        {t >= m('mql') && <g opacity={e1(t, m('mql'))}><Equipo id={ID} k="mkt" x={220} y={700} s={0.6} t={t} nombre={false} /><Lead x={340} y={560} s={1.1} color={AMBAR} /><Letrero x={280} y={760} texto="MQL · lo califica marketing" fondo={AMBAR} id={ID} tam={22} /></g>}
        {t >= m('sql') && <g opacity={e1(t, m('sql'))}><Equipo id={ID} k="ven" x={880} y={700} s={0.6} t={t} nombre={false} /><Lead x={760} y={560} s={1.1} color={NARANJA} /><Visto x={790} y={510} r={18} /><Letrero x={900} y={760} texto="SQL · lo valida ventas" id={ID} tam={22} /></g>}
        {t >= m('sdr') && <g opacity={e1(t, m('sdr'))}><Persona id={ID} x={600} y={430} s={0.45} cuerpo={AZUL_M} /><path d="M 576 340 Q 566 362 576 384" stroke="#1f2937" strokeWidth={6} fill="none" /><Letrero x={600} y={200} texto="SDR · primer contacto" fondo={AZUL_M} id={ID} tam={22} /></g>}
        {t >= m('junta') && (
          <g opacity={e1(t, m('junta'))}>
            <rect x={380} y={590} width={180} height={34} rx={10} fill="#94a3b8" />
            <rect x={640} y={590} width={180} height={34} rx={10} fill="#94a3b8" />
            <rect x={556} y={580} width={88} height={54} rx={10} fill={ROJO_M} />
            {[0, 1, 2].map((j) => { const ph = (t * 0.9 + j / 3) % 1; return <path key={j} d={`M ${590 + j * 10} ${640 + ph * 50} q -7 12 0 16 q 7 -4 0 -16 Z`} fill="#38bdf8" opacity={1 - ph} />; })}
          </g>
        )}
      </Toma>

      {/* TOMA 3 · Toast */}
      <Toma t={t} a={m('toast')} b={m('decae')}>
        <Suelo y={700} isDark={isDark} x0={60} x1={640} />
        <Equipo id={ID} k="ven" x={540} y={700} s={0.6} t={t} nombre={false} />
        {/* sistema que ordena la cola */}
        <g opacity={e1(t, m('midio'))}>
          <rect x={100} y={480} width={330} height={150} rx={18} fill={PIZARRA} />
          {cola.map((pos, k) => <Lead key={k} x={150 + pos * 58} y={556} s={0.6} color={[NARANJA, NARANJA, AMBAR, '#94a3b8', '#94a3b8'][k]} />)}
          {t >= m('orden') && <Letrero x={265} y={440} texto="Solo cambia el orden" id={ID} op={e1(t, m('orden'))} tam={24} />}
        </g>
        {/* barras 1× → 2× */}
        {t >= m('barras1') && (
          <g opacity={e1(t, m('barras1'))}>
            {[1, 2].map((v, k) => { const h = 130 * v * sm(t, m('barras1') + k * 0.8, m('barras1') + 0.8 + k * 0.8); return <g key={v}>
              <rect x={750 + k * 180 - 55} y={620 - h} width={110} height={h} rx={12} fill={k ? `url(#${ID}-marca)` : '#94a3b8'} />
              <Txt x={750 + k * 180} y={600 - h} textAnchor="middle" fontSize={38} fill={c.texto} peso={800}>{v}×</Txt>
              <Txt f="a" x={750 + k * 180} y={660} textAnchor="middle" fontSize={22} fill={c.tenue}>{k ? 'Después' : 'Antes'}</Txt>
            </g>; })}
            <Letrero x={840} y={200} texto="Conversión inbound" id={ID} tam={24} />
          </g>
        )}
        {t >= m('cierre') && <g opacity={e1(t, m('cierre'))}><Letrero x={840} y={740} texto="Tasa de cierre: no cayó" fondo={VERDE} id={ID} /></g>}
      </Toma>

      {/* TOMA 4 · Decaimiento */}
      <Toma t={t} a={m('decae')} b={m('contacto')}>
        {(() => {
          const suelta = sm(t, m('regla'), m('regla') + 1.5);
          return (
            <g>
              {t >= m('cohortes') && Array.from({ length: dias }, (_, k) => {
                const frio = k >= 4 ? sm(t, m('dia4'), m('dia4') + 1.5) : 0;
                const cae = k >= 5 ? suelta : 0;
                return (
                  <g key={k} opacity={e1(t, m('cohortes') + k * 0.1) * (1 - cae)} transform={`translate(${130 + k * 82} ${300 + cae * 120})`}>
                    <rect x={-32} y={-40} width={64} height={80} rx={10} fill={frio > 0.5 ? '#bae6fd' : AMBAR} />
                    <Txt x={0} y={10} textAnchor="middle" fontSize={26} fill={frio > 0.5 ? '#0369a1' : '#fff'} peso={800}>{k + 1}</Txt>
                    {frio > 0.01 && [0, 60, 120].map((a) => <rect key={a} x={-1.5} y={-56} width={3} height={14} rx={1.5} fill="#7dd3fc" opacity={frio} transform={`rotate(${a} 0 -49)`} />)}
                  </g>
                );
              })}
              {t >= m('cohortes') && <Txt f="a" x={130} y={390} fontSize={22} fill={c.tenue} opacity={e1(t, m('cohortes'))}>día de entrada del MQL</Txt>}
              {t >= m('insistian') && <g opacity={e1(t, m('insistian')) * (1 - suelta)}><Persona id={ID} x={900 + 10 * Math.sin(t * 6)} y={250} s={0.35} cuerpo={AZUL_M} /><Letrero x={900} y={170} texto="Insistían hasta el día 10" fondo={PIZARRA} id={ID} tam={22} /></g>}
              {t >= m('regla') && <Letrero x={600} y={480} texto="Soltar todo MQL de más de 5 días" id={ID} op={e1(t, m('regla'))} />}
              {t >= m('barras2') && (
                <g opacity={e1(t, m('barras2'))}>
                  {[33, 45].map((v, k) => { const h = 4.2 * v * sm(t, m('barras2') + k * 0.8, m('barras2') + 0.8 + k * 0.8); return <g key={v}>
                    <rect x={400 + k * 200 - 60} y={760 - h} width={120} height={h} rx={12} fill={k ? `url(#${ID}-marca)` : '#94a3b8'} />
                    <Txt x={400 + k * 200} y={745 - h} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>{v} %</Txt>
                  </g>; })}
                  <Txt f="a" x={720} y={700} fontSize={22} fill={c.tenue}>MQL que pasan a SQL</Txt>
                </g>
              )}
              {t >= m('aritmetica') && <Letrero x={880} y={620} texto="+36 % de SQL" fondo={VERDE} id={ID} op={e1(t, m('aritmetica'))} tam={26} />}
              {t >= m('noMas') && <Letrero x={880} y={780} texto="Sin trabajar más" fondo={PIZARRA} id={ID} op={e1(t, m('noMas'))} tam={24} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 5 · Puntos de contacto */}
      <Toma t={t} a={m('contacto')} b={m('comisiones')}>
        {(() => {
          const n = 18;
          const tasa = (k: number) => (k < 14 ? 6 + k * 0.6 : k < 16 ? 34 + (k - 14) * 8 : 40);
          const dib = sm(t, m('salta'), m('salta') + 2.5);
          return (
            <g>
              {Array.from({ length: n }, (_, k) => {
                const x = 140 + k * 54, h = Math.max(10, 6 * tasa(k) * Math.min(1, Math.max(0, dib * n - k)));
                const corte = t >= m('abandona') && k >= 8;
                return (
                  <g key={k} opacity={e1(t, m('contacto') + k * 0.05)}>
                    <rect x={x - 20} y={640 - h} width={40} height={h} rx={8} fill={k >= 14 && k <= 15 ? `url(#${ID}-marca)` : '#94a3b8'} opacity={corte ? 0.35 : 1} />
                    <Txt f="a" x={x} y={672} textAnchor="middle" fontSize={20} fill={c.tenue}>{k + 1}</Txt>
                  </g>
                );
              })}
              {t >= m('contacto') && <Txt f="a" x={140} y={710} fontSize={22} fill={c.tenue}>número de contacto · tasa de reuniones</Txt>}
              {t >= m('comparacion') && (
                <g opacity={e1(t, m('comparacion'))}>
                  <rect x={110} y={380} width={8 * 54 - 2} height={14} rx={7} fill={AZUL_M} />
                  <Letrero x={330} y={340} texto="Secuencia típica: 8 pasos" fondo={AZUL_M} id={ID} tam={24} />
                  <Letrero x={950} y={260} texto="El salto: contacto 15–16" id={ID} tam={24} />
                </g>
              )}
              {t >= m('abandona') && <Letrero x={600} y={790} texto="Se abandona antes del salto" fondo={ROJO_M} id={ID} op={e1(t, m('abandona'))} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 6 · Comisiones */}
      <Toma t={t} a={m('comisiones')} b={m('forma')}>
        {(() => {
          const arregla = sm(t, m('solucion'), m('solucion') + 1.5);
          return (
            <g>
              {t >= m('duplicadas') && (
                <g opacity={e1(t, m('duplicadas')) * (1 - ac(t, m('umbral') - 0.4, m('umbral')))}>
                  {[0, 1].map((k) => <Hoja key={k} x={300 + k * 40} y={420 + k * 20} w={150} h={190} lineas={5} />)}
                  <Letrero x={340} y={300} texto="Pagada dos veces" fondo={ROJO_M} id={ID} />
                  {[0, 1].map((k) => { const ph = ((t - m('duplicadas')) * 0.6 + k / 2) % 1; return <g key={k} opacity={Math.min(1, ph * 5, (1 - ph) * 5)}><Moneda3D x={lerp(380, 560, ph)} y={lerp(470, 380, ph)} r={18} giro={Math.cos(t * 5 + k)} /></g>; })}
                </g>
              )}
              {t >= m('nunca') && (
                <g opacity={e1(t, m('nunca')) * (1 - ac(t, m('umbral') - 0.4, m('umbral')))}>
                  <Persona id={ID} x={860} y={640} s={0.7} cuerpo="#94a3b8" ojos={0.1} />
                  <Letrero x={860} y={700} texto="Nunca implementa" fondo={PIZARRA} id={ID} />
                </g>
              )}
              {t >= m('umbral') && (
                <g opacity={e1(t, m('umbral'))}>
                  <Calendario x={260} y={330} s={1} marcados={6} />
                  <Letrero x={260} y={460} texto="6 días sin contacto" fondo={ROJO_M} id={ID} tam={24} />
                </g>
              )}
              {t >= m('barras4') && (
                <g opacity={e1(t, m('barras4'))}>
                  {[[300, 'Contactados ≤ 5 días', VERDE], [70, '6 o más días', '#94a3b8']].map(([h, txt, col], k) => { const hh = (h as number) * sm(t, m('barras4') + k * 0.8, m('barras4') + 0.8 + k * 0.8); return <g key={k}>
                    <rect x={640 + k * 240 - 70} y={700 - hh} width={140} height={hh} rx={14} fill={col as string} />
                    <Txt f="a" x={640 + k * 240} y={740} textAnchor="middle" fontSize={22} fill={c.tenue}>{txt as string}</Txt>
                  </g>; })}
                  <Txt f="a" x={760} y={340} textAnchor="middle" fontSize={22} fill={c.tenue}>clientes que implementan</Txt>
                </g>
              )}
              {arregla > 0.01 && (
                <g opacity={arregla}>
                  <rect x={120} y={560} width={360} height={200} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
                  <Moneda3D x={190} y={630} r={30} giro={Math.cos(t * 3)} />
                  <Txt f="a" x={240} y={625} fontSize={22} fill={c.texto} peso={700}>Comisión con</Txt>
                  <Txt f="a" x={240} y={655} fontSize={22} fill={c.texto} peso={700}>el cliente activo</Txt>
                  <Visto x={200} y={715} r={20} /><Txt f="a" x={235} y={723} fontSize={22} fill={c.tenue}>alerta al día 5</Txt>
                </g>
              )}
              {t >= m('incentivo') && <Letrero x={600} y={820} texto="Se arregló un incentivo" id={ID} op={e1(t, m('incentivo'))} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 7 · la misma forma */}
      <Toma t={t} a={m('forma')} b={fin + 1}>
        {([['midio2', 'Medir una junta', AZUL_M], ['umbral2', 'Encontrar un umbral', VIOLETA], ['reglaC', 'Cambiar una regla', NARANJA]] as [N, string, string][]).map(([n, txt, col], k) => t >= m(n) && (
          <g key={n} opacity={e1(t, m(n))}>
            <circle cx={240 + k * 360} cy={400} r={90} fill={col} />
            <Txt x={240 + k * 360} y={420} textAnchor="middle" fontSize={60} fill="#fff" peso={800}>{k + 1}</Txt>
            <Letrero x={240 + k * 360} y={560} texto={txt} fondo={col} id={ID} />
            {k < 2 && <path d={`M ${340 + k * 360} 400 h 160`} stroke={c.apagado} strokeWidth={8} strokeLinecap="round" strokeDasharray="4 16" />}
          </g>
        ))}
        {t >= m('presupuesto2') && <Letrero x={600} y={720} texto="Ninguno pidió más presupuesto" fondo={VERDE} id={ID} op={e1(t, m('presupuesto2'))} />}
      </Toma>
    </Lienzo>
  );
};
