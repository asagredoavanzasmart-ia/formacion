import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, MontanaRusa, rielY, Bidon, Persona, Cifra, Flujo, Visto, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Crisis, rondas a la baja y acciones secundarias.
 * 1 · La montaña rusa: el carrito baja hasta casi tocar el suelo (Waze a un mes de cerrar, el bidón casi vacío);
 *     una vara de tres metros, el anuncio de Google y Microsoft que llena el tanque con 20 millones.
 * 2 · Pontera: la valoración cae de 50 a 5 y luego sube veinte veces.
 * 3 · La tabla de propiedad se limpia (los antiguos se diluyen, los fundadores se recargan) y las acciones secundarias pasan
 *     de manos del equipo a nuevos inversionistas.
 */

const ID = 'ep16', P = 'ep-crisis';

export const CrisisEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('morir'), 'A punto de morir'], [m('mes'), 'Waze, a un mes de cerrar'], [m('salvando'), 'Lo que la salvó'], [m('pontera'), 'Pontera'],
    [m('tercio'), 'Rondas a la baja'], [m('secundarias'), 'Acciones secundarias'],
  ];
  const u = Math.min(0.62, 0.62 * sm(t, m('morir'), m('mes') + 1)) + 0.38 * sm(t, m('veinte'), m('veinte') + 2.5);
  const nivel = t < m('veinte') ? 0.08 + 0.3 * (1 - sm(t, m('mes'), m('mes') + 2)) : 0.1 + 0.9 * sm(t, m('veinte'), m('veinte') + 1.5);
  /* Pontera: 50 → 5 → ×20 */
  const val = t < m('cinco') ? 50 : t < m('tres') ? lerp(50, 5, sm(t, m('cinco'), m('cinco') + 1.2)) : lerp(5, 100, sm(t, m('veces'), m('veces') + 1.6));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Crisis, rondas a la baja y acciones secundarias">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la montaña rusa de Waze */}
      <Toma t={t} a={0} b={m('pontera')} cy={470}>
        <MontanaRusa y={460} amp={150} u={u} id={ID} />
        <rect x={40} y={690} width={1120} height={14} rx={7} fill={isDark ? '#3a3f47' : '#dfe3e8'} />
        <Bidon x={1050} y={680} s={0.8} nivel={nivel} op={e1(t, m('mes'))} />
        {t >= m('mes') && <Letrero x={1050} y={760} texto="Un mes de caja" fondo="#e5484d" id={ID} op={e1(t, m('mes')) * (1 - sm(t, m('veinte'), m('veinte') + 1))} tam={24} />}
        {t >= m('vara') && t < m('microsoft') && <g opacity={e1(t, m('vara'))}><rect x={200} y={180} width={14} height={320} rx={7} fill="#a16207" transform={`rotate(${-20 + 10 * Math.sin(t * 2)} 207 500)`} /><Letrero x={330} y={180} texto="«Ni con una vara de tres metros»" fondo={GRIS} id={ID} tam={24} /></g>}
        {t >= m('google') && t < m('microsoft') && <Letrero x={760} y={180} texto="Google anuncia su navegación gratis" fondo={AZUL_M} id={ID} op={e1(t, m('google'))} tam={24} />}
        {t >= m('microsoft') && <g opacity={e1(t, m('microsoft'))}>
          <Flujo x1={760} y1={220} x2={1040} y2={560} t={t} n={6} vel={0.9} arco={60} color={VERDE} />
          <Letrero x={640} y={190} texto="Microsoft y Qualcomm" fondo={AZUL_M} id={ID} tam={26} />
          {t >= m('veinte') && <Cifra x={640} y={290} valor={20} u={sm(t, m('veinte'), m('veinte') + 1)} color={VERDE} tam={64} suf=" millones" />}
        </g>}
      </Toma>

      {/* 2 · Pontera */}
      <Toma t={t} a={m('pontera')} b={m('tercio')} cy={470}>
        <rect x={200} y={700} width={800} height={10} rx={5} fill={c.apagado} />
        <g>
          <rect x={460} y={700 - 4.6 * val} width={280} height={4.6 * val} rx={18} fill={val < 20 ? '#e5484d' : VIOLETA} />
          {t < m('veces') ? <Cifra x={600} y={680 - 4.6 * val} valor={Math.round(val)} u={1} color={c.texto} tam={64} /> : <Txt x={600} y={680 - 4.6 * val} textAnchor="middle" fontSize={64} fill={VERDE}>×20</Txt>}
        </g>
        <Txt f="a" x={600} y={750} textAnchor="middle" fontSize={26} fill={c.tenue}>Valoración de Pontera, millones de dólares</Txt>
        {t >= m('tres') && <g opacity={e1(t, m('tres'))}><Persona id={ID} x={930} y={700} s={0.55} cuerpo={NARANJA} /><Letrero x={930} y={520} texto="Levine pone ~3 millones" fondo={NARANJA} id={ID} tam={24} /></g>}
        {t >= m('veces') && <Letrero x={300} y={300} texto="×20 años después" fondo={VERDE} id={ID} op={e1(t, m('veces') + 1)} />}
      </Toma>

      {/* 3 · tabla y secundarias */}
      <Toma t={t} a={m('tercio')} b={fin + 1} cy={470}>
        {t < m('secundarias') ? <g>
          {[{ n: 'Inversionistas antiguos', w0: 360, w1: 120, col: GRIS }, { n: 'Nuevo inversionista', w0: 0, w1: 360, col: AZUL_M }, { n: 'Fundadores', w0: 360, w1: 360, col: NARANJA }].map((b, k) => {
            const w = lerp(b.w0, b.w1, sm(t, m('limpian'), m('recargar') + 1));
            return <g key={b.n} transform={`translate(260 ${300 + k * 130})`}>
              <rect width={Math.max(0, w) * 1.6} height={80} rx={16} fill={b.col} />
              <Txt f="a" x={0} y={-12} fontSize={26} fill={c.texto}>{b.n}</Txt>
            </g>;
          })}
          {t >= m('tercio') && <Letrero x={600} y={760} texto="Le pasa a un tercio de las startups" fondo={GRIS} id={ID} op={e1(t, m('tercio'))} tam={26} />}
        </g> : <g>
          {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={220 + k * 120} y={620} s={0.55} cuerpo={[NARANJA, ROSA, AMBAR][k]} />)}
          {[0, 1].map((k) => <Persona key={`i${k}`} id={ID} x={880 + k * 130} y={620} s={0.55} cuerpo={[AZUL_M, VIOLETA][k]} />)}
          {[0, 1, 2, 3].map((k) => { const ph = (t * 0.5 + k / 4) % 1; return <rect key={k} x={lerp(380, 860, ph) - 22} y={430 - 80 * Math.sin(Math.PI * ph)} width={44} height={30} rx={6} fill={NARANJA} opacity={e1(t, m('secundarias'))} />; })}
          {[0, 1, 2].map((k) => { const ph = (t * 0.5 + k / 3 + 0.15) % 1; return <circle key={`m${k}`} cx={lerp(860, 380, ph)} cy={500 + 60 * Math.sin(Math.PI * ph)} r={14} fill="#22a06b" opacity={e1(t, m('secundarias'))} />; })}
          <Letrero x={280} y={700} texto="Equipo" id={ID} tam={26} />
          <Letrero x={940} y={700} texto="Nuevos inversionistas" fondo={AZUL_M} id={ID} tam={26} />
          {t >= m('reconocimiento') && <g opacity={e1(t, m('reconocimiento'))}><Visto x={600} y={250} r={34} /><Letrero x={600} y={790} texto="Reconocimiento y menos presión" fondo={VERDE} id={ID} tam={26} /></g>}
        </g>}
      </Toma>
    </Lienzo>
  );
};
