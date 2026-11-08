import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Red, Escudo, Corazon, Reloj, Calendario, Cruz, Visto, Dial, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Tu lado de la red. Toma 1: una red de tenis separa tu lado (lo que viste y sentiste) del lado del otro (sus
 * intenciones, una nube con «?»). Cuando una frase cruza la red, el otro levanta el escudo; el ejemplo de quien llega
 * tarde: la frase que supone queda en su lado y la frase propia vuelve al tuyo. Toma 2: tres bloques encadenados,
 * situación → comportamiento → impacto, llenados primero con el caso de ventas y luego con el de operaciones.
 * Toma 3: los adjetivos se tachan y caen; las emociones en dosis (medidor al medio); ensayar y cambiar de papel.
 */

const ID = 'fb07', P = 'fb-red';

export const RedFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('frontera'), 'Una frontera'], [m('certeza'), 'Tu lado: lo que viste'], [m('terreno'), 'Su lado: sus intenciones'], [m('tarde'), 'Suposición o hecho tuyo'],
    [m('estructura'), 'Situación, comportamiento, impacto'], [m('ventas'), 'En ventas'], [m('operaciones'), 'En operaciones'],
    [m('adjetivos'), 'Sin adjetivos'], [m('emociones'), 'Emociones en dosis'], [m('ensaya'), 'Ensaya antes'],
  ];
  const cruza = sm(t, m('terreno'), m('terreno') + 1.2);
  const escudo = sm(t, m('terreno') + 1, m('terreno') + 1.6) * (1 - sm(t, m('hecho'), m('hecho') + 0.8));
  const BLOQUES = ['Situación', 'Comportamiento', 'Impacto'];
  const VENTAS = ['Martes,|con el cliente', 'Interrumpió|dos veces', 'Cerró antes|de tiempo'];
  const OPER = ['Cambio|de turno', 'Falla|sin registrar', 'Una hora|perdida'];
  const ops = sm(t, m('operaciones'), m('operaciones') + 0.6);
  const cambio = sm(t, m('ensaya') + 2, m('ensaya') + 3.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Tu lado de la red">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · la red */}
      <TomaFB t={t} a={0} b={m('estructura')} cy={480}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        <Red x={600} y={720} alto={360} />
        <Persona id={ID} x={260} y={720} s={1.05} cuerpo={NARANJA} />
        <Persona id={ID} x={940} y={720} s={1.05} cuerpo={AZUL_M} ojos={1 - 0.4 * escudo} />
        <Txt x={260} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Tú</Txt>
        <Txt x={940} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>El otro</Txt>
        {t >= m('certeza') && (
          <g opacity={vent(t, m('certeza'), m('tarde'))}>
            <g transform="translate(200 300)"><ellipse rx={44} ry={26} fill={c.panel2} stroke={c.tenue} strokeWidth={4} /><circle r={14} fill={AZUL_M} /><circle r={6} fill="#0f172a" /></g>
            <Corazon x={340} y={300} s={1.1} color={ROSA} />
            <Txt x={270} y={380} textAnchor="middle" fontSize={28} fill={c.texto}>Lo que viste y sentiste</Txt>
          </g>
        )}
        {t >= m('terreno') && (
          <g opacity={vent(t, m('terreno'), m('tarde'))}>
            <g opacity={0.9}>{[[-40, 0, 40], [0, -20, 50], [40, 0, 40]].map(([dx, dy, r], k) => <circle key={k} cx={940 + dx} cy={330 + dy} r={r} fill={c.panel} />)}</g>
            <Txt x={940} y={350} textAnchor="middle" fontSize={50} fill={c.tenue}>?</Txt>
            <Txt x={940} y={430} textAnchor="middle" fontSize={28} fill={c.texto}>Sus intenciones</Txt>
            <circle cx={lerp(320, 860, cruza)} cy={560 - 160 * Math.sin(Math.PI * cruza)} r={16} fill="#d9f99d" stroke="#65a30d" strokeWidth={3} />
          </g>
        )}
        <Escudo x={830} y={590} s={1.15} op={escudo} />
        {t >= m('tarde') && (
          <g opacity={e1(t, m('tarde') + 0.4)}>
            <g opacity={1 - 0.55 * sm(t, m('hecho'), m('hecho') + 0.6)}>
              <Letrero x={920} y={270} texto="«No valoras mi tiempo»" fondo={ROJO_M} id={ID} tam={30} />
              <Cruz x={1150} y={230} r={26} op={sm(t, m('hecho'), m('hecho') + 0.5)} />
            </g>
            {t >= m('hecho') && (
              <g opacity={e1(t, m('hecho'))}>
                <Letrero x={300} y={420} texto="«Me siento poco valorado»" fondo={VERDE} id={ID} tam={30} />
                <Visto x={550} y={380} r={26} />
              </g>
            )}
          </g>
        )}
      </TomaFB>

      {/* 2 · situación, comportamiento e impacto */}
      <TomaFB t={t} a={m('estructura')} b={m('adjetivos')} cy={470}>
        {BLOQUES.map((b, k) => {
          const x = 220 + k * 380, o = e1(t, m('estructura') + k * 0.6);
          const tv = VENTAS[k], to = OPER[k];
          const tVentas = [m('ventas'), m('interrumpiste'), m('cerro')][k];
          const tOper = [m('operaciones'), m('registrada'), m('hora')][k];
          return o > 0.01 ? (
            <g key={k} opacity={o}>
              <rect x={x - 180} y={200} width={360} height={380} rx={28} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
              <rect x={x - 180} y={200} width={360} height={70} rx={28} fill={[AZUL_M, NARANJA, ROSA][k]} />
              <Txt x={x} y={248} textAnchor="middle" fontSize={30} fill="#fff">{b}</Txt>
              {k < 2 && <path d={`M ${x + 183} 390 l 14 0 m -8 -10 l 8 10 l -8 10`} stroke={c.tenue} strokeWidth={6} fill="none" strokeLinecap="round" />}
              <g opacity={sm(t, tVentas, tVentas + 0.5) * (1 - ops)}>
                {k === 0 && <Calendario x={x} y={360} s={0.7} marcados={2} />}
                {k === 1 && <g>{[0, 1].map((j) => <Burbuja key={j} x={x - 60 + j * 90} y={380 - j * 20} w={110} texto="…" u={1} c={c} id={ID} tam={30} />)}<Txt x={x} y={420} textAnchor="middle" fontSize={40} fill={ROJO_M}>×2</Txt></g>}
                {k === 2 && <g><rect x={x - 40} y={300} width={80} height={120} rx={6} fill="#a16b3f" /><rect x={x - 40} y={300} width={80 * (1 - 0.8 * sm(t, tVentas, tVentas + 1))} height={120} rx={6} fill="#8b5a2b" /></g>}
                {tv.split("|").map((l, j) => <Txt key={j} x={x} y={490 + j * 44} textAnchor="middle" fontSize={28} fill={c.texto}>{l}</Txt>)}
              </g>
              <g opacity={sm(t, tOper, tOper + 0.5) * ops}>
                {k === 0 && <Reloj x={x} y={370} r={56} t={t} aro={AZUL_M} />}
                {k === 1 && <g><rect x={x - 60} y={310} width={120} height={120} rx={12} fill={c.panel2} /><Txt x={x} y={385} textAnchor="middle" fontSize={50} fill={ROJO_M}>!</Txt></g>}
                {k === 2 && <Reloj x={x} y={370} r={56} t={t * 8} aro={ROJO_M} />}
                {to.split("|").map((l, j) => <Txt key={j} x={x} y={490 + j * 44} textAnchor="middle" fontSize={28} fill={c.texto}>{l}</Txt>)}
              </g>
            </g>
          ) : null;
        })}
        {t >= m('cerro') + 1 && !movil && <Txt f="a" x={600} y={640} textAnchor="middle" fontSize={22} fill={GRIS} opacity={vent(t, m('cerro') + 1, m('operaciones'))}>Concreta · observable · verificable</Txt>}
        {t >= m('hora') && <Letrero x={600} y={660} texto="Concreta, observable, verificable" id={ID} tam={28} op={e1(t, m('hora') + 1)} />}
      </TomaFB>

      {/* 3 · adjetivos, emociones y ensayo */}
      <TomaFB t={t} a={m('adjetivos')} b={fin + 1} cy={470}>
        {vent(t, m('adjetivos'), m('ensaya')) > 0.01 && (
          <g opacity={vent(t, m('adjetivos'), m('ensaya'))}>
            {['Descuidado', 'Flojo', 'Poco proactivo'].map((a, k) => {
              const u = sm(t, m('adjetivos') + 1 + k * 0.4, m('adjetivos') + 1.6 + k * 0.4);
              const cae = sm(t, m('adjetivos') + 2.6, m('adjetivos') + 3.6);
              return (
                <g key={k} transform={`translate(0 ${cae * 260})`} opacity={1 - cae}>
                  <Letrero x={230 + k * 330} y={250} texto={a} fondo={GRIS} id={ID} tam={30} />
                  <rect x={230 + k * 330 - (a.length * (movil ? 43 : 30) * 0.56 + (movil ? 43 : 30) * 1.2) / 2} y={246} width={(a.length * (movil ? 43 : 30) * 0.56 + (movil ? 43 : 30) * 1.2) * u} height={6} rx={3} fill={ROJO_M} />
                </g>
              );
            })}
            {t >= m('emociones') && (
              <g opacity={e1(t, m('emociones'))}>
                <Corazon x={420} y={500} s={1.8} color={ROSA} />
                <Dial x={780} y={540} v={lerp(0.9, 0.5, sm(t, m('dosis'), m('dosis') + 1))} texto="Dosis" c={c} id={ID} r={90} color={ROSA} />
                <Txt x={600} y={700} textAnchor="middle" fontSize={28} fill={c.texto}>Que la pueda recibir sin sentirse atacada</Txt>
              </g>
            )}
          </g>
        )}
        {t >= m('ensaya') && (
          <g opacity={e1(t, m('ensaya'))}>
            <Suelo y={720} isDark={isDark} x0={200} x1={1000} />
            <Persona id={ID} x={lerp(420, 780, cambio)} y={720} s={1.05} cuerpo={NARANJA} />
            <Persona id={ID} x={lerp(780, 420, cambio)} y={720} s={1.05} cuerpo={VIOLETA} />
            <Txt x={600} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>{cambio > 0.5 ? 'Cambien de papel' : 'Un colega hace del otro'}</Txt>
            {cambio > 0.05 && cambio < 0.95 && <path d="M 470 420 Q 600 340 730 420" stroke={c.tenue} strokeWidth={5} fill="none" strokeDasharray="10 10" />}
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
