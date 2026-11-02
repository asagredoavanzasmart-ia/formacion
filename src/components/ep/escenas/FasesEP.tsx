import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Corazon, Cruz, Visto, Curva, Moneda3D, Hoja, Suelo, Flujo, Cifra, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * El orden de las fases.
 * 1 · La puerta del ajuste producto-mercado: quien la cruza vive (corazón); crecer antes es una puerta giratoria: entran y salen.
 * 2 · El dial de la frecuencia de uso: alta → la curva del crecimiento; baja → la moneda del modelo de negocio. Entre empresas,
 *     la segunda compra.
 * 3 · Las proporciones: del valor creado (un millón) se cobra del 10 al 25 %; cada fase dura de dos a tres años y solo el 4 % del
 *     valor de los gigantes se creó en su primera década. El peligro: un equipo de ventas que triplica el gasto sin nada que vender.
 */

const ID = 'ep11', P = 'ep-fases';

export const FasesEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('ajuste'), 'Primero el ajuste producto-mercado'], [m('crecer'), 'No crecer antes'], [m('frecuencia'), 'La frecuencia decide'],
    [m('segunda'), 'Entre empresas: la segunda compra'], [m('regla'), 'Del 10 al 25 % del valor'], [m('anios'), 'Fases largas'], [m('peligro'), 'El mayor peligro'],
  ];
  const alta = t >= m('crecimiento') && t < m('modelo');
  const ang = t < m('frecuencia') ? -60 : t < m('crecimiento') ? -60 + 120 * sm(t, m('frecuencia'), m('frecuencia') + 1) : alta ? 60 : -60;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El orden de las fases">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la puerta */}
      <Toma t={t} a={0} b={m('frecuencia')} cy={480}>
        <Suelo y={700} isDark={isDark} x0={100} x1={1100} />
        <g transform="translate(600 700)" opacity={e1(t, m('ajuste'))}>
          <rect x={-130} y={-360} width={260} height={360} rx={20} fill={`url(#${ID}-marca)`} />
          <rect x={-100} y={-330} width={200} height={330} rx={12} fill={isDark ? '#111827' : '#fff7ed'} />
          <Txt x={0} y={-390} textAnchor="middle" fontSize={30} fill={NARANJA}>Ajuste producto-mercado</Txt>
        </g>
        {t >= m('vives') && <g>
          <Persona id={ID} x={lerp(280, 600, sm(t, m('vives'), m('vives') + 1.4))} y={700} s={0.6} cuerpo={AZUL_M} />
          <Corazon x={880} y={420} s={1.3} op={e1(t, m('vives') + 1)} />
        </g>}
        {t >= m('crecer') && <g opacity={e1(t, m('crecer'))}>
          <Flujo x1={140} y1={560} x2={360} y2={560} t={t} n={6} vel={0.9} arco={0} color={GRIS} />
          <Flujo x1={360} y1={600} x2={140} y2={600} t={t + 0.3} n={6} vel={0.9} arco={0} color={GRIS} />
          <Letrero x={250} y={460} texto="Llegan y se van" fondo={GRIS} id={ID} tam={24} />
        </g>}
      </Toma>

      {/* 2 · el dial de la frecuencia */}
      <Toma t={t} a={m('frecuencia')} b={m('regla')} cy={470}>
        <g transform="translate(600 520)" opacity={e1(t, m('frecuencia'))}>
          <path d="M -200 0 A 200 200 0 0 1 200 0" stroke={c.apagado} strokeWidth={40} fill="none" />
          <path d="M -200 0 A 200 200 0 0 1 0 -200" stroke={GRIS} strokeWidth={40} fill="none" opacity={0.6} />
          <path d="M 0 -200 A 200 200 0 0 1 200 0" stroke={NARANJA} strokeWidth={40} fill="none" opacity={0.8} />
          <g transform={`rotate(${ang})`}><path d="M -10 0 L 0 -170 L 10 0 Z" fill="#334155" /></g><circle r={20} fill="#334155" />
          <Txt f="a" x={-200} y={50} textAnchor="middle" fontSize={26} fill={c.tenue}>Poca</Txt><Txt f="a" x={200} y={50} textAnchor="middle" fontSize={26} fill={c.tenue}>Mucha</Txt>
        </g>
        {t >= m('crecimiento') && <g opacity={e1(t, m('crecimiento')) * (alta ? 1 : 0.3)}>
          <Curva pts={[[880, 640], [940, 620], [1000, 560], [1060, 430], [1100, 280]]} u={sm(t, m('crecimiento'), m('crecimiento') + 1.4)} color={NARANJA} />
          <Letrero x={990} y={720} texto="Crecimiento" id={ID} tam={26} />
        </g>}
        {t >= m('modelo') && <g opacity={e1(t, m('modelo'))}>
          <Moneda3D x={200} y={380} r={60} giro={Math.cos(t * 3)} />
          <Letrero x={200} y={720} texto="Modelo de negocio" fondo={GRIS} id={ID} tam={26} />
        </g>}
        {t >= m('segunda') && <g opacity={e1(t, m('segunda'))}>
          <Hoja x={540} y={190} w={70} h={90} rot={-8} /><Hoja x={660} y={190} w={70} h={90} rot={8} />
          <Txt f="a" x={600} y={290} textAnchor="middle" fontSize={24} fill={c.texto}>Compra por segunda vez</Txt>
        </g>}
      </Toma>

      {/* 3 · proporciones y peligro */}
      <Toma t={t} a={m('regla')} b={fin + 1} cy={470}>
        {t < m('anios') ? <g>
          <rect x={200} y={300} width={800} height={160} rx={24} fill={VERDE} opacity={0.3} />
          <rect x={200} y={300} width={800 * 0.25 * sm(t, m('regla') + 0.5, m('regla') + 1.5)} height={160} rx={24} fill={VERDE} />
          <rect x={200} y={300} width={800 * 0.1 * sm(t, m('regla') + 0.5, m('regla') + 1.5)} height={160} rx={24} fill="#065f46" />
          <Txt x={600} y={260} textAnchor="middle" fontSize={34} fill={c.texto}>Valor que creas para el cliente</Txt>
          <Letrero x={300} y={520} texto="Cobras del 10 al 25 %" fondo={VERDE} id={ID} op={e1(t, m('regla') + 1)} />
          {t >= m('millon') && <g opacity={e1(t, m('millon'))}>
            <Txt x={600} y={640} textAnchor="middle" fontSize={34} fill={c.texto}>Ahorras 1 millón al año →</Txt>
            <Txt x={600} y={700} textAnchor="middle" fontSize={44} fill={VERDE}>100 mil a 250 mil</Txt>
          </g>}
        </g> : t < m('peligro') ? <g>
          {[0, 1, 2].map((k) => <rect key={k} x={180 + k * 290} y={300} width={260} height={80} rx={20} fill={[NARANJA, ROSA, VIOLETA][k]} opacity={e1(t, m('anios') + 0.4 * k)} />)}
          {['Ajuste', 'Crecimiento', 'Modelo'].map((n, k) => <Txt key={n} x={310 + k * 290} y={352} textAnchor="middle" fontSize={30} fill="#fff" opacity={e1(t, m('anios') + 0.4 * k)}>{n}</Txt>)}
          <Letrero x={600} y={440} texto="De 2 a 3 años cada una" fondo={GRIS} id={ID} op={e1(t, m('anios') + 1)} />
          {t >= m('cuatro') && <g opacity={e1(t, m('cuatro'))}>
            <rect x={200} y={560} width={800} height={70} rx={20} fill={c.apagado} />
            <rect x={200} y={560} width={32} height={70} rx={12} fill={NARANJA} />
            <Txt x={250} y={680} fontSize={34} fill={NARANJA}>4 %</Txt>
            <Txt f="a" x={330} y={680} fontSize={26} fill={c.tenue}>del valor, en la primera década</Txt>
          </g>}
        </g> : <g>
          {Array.from({ length: Math.round(9 * sm(t, m('peligro'), m('triplica'))) }, (_, k) => <Persona key={k} id={ID} x={200 + (k % 5) * 130} y={560 + Math.floor(k / 5) * 150} s={0.42} cuerpo={NARANJA} />)}
          {t >= m('triplica') && <g opacity={e1(t, m('triplica'))}>
            {[0, 1, 2].map((k) => <Moneda3D key={k} x={940} y={600 - k * 60 - 160 * ((t * 0.6 + k / 3) % 1)} r={26} op={1 - ((t * 0.6 + k / 3) % 1)} />)}
            <Letrero x={940} y={680} texto="Gasto ×3" fondo={ROSA} id={ID} />
            <Cruz x={940} y={260} r={34} />
          </g>}
          {t >= m('primeros') && <Letrero x={500} y={260} texto="Los primeros 5 o 6 negocios: el CEO" fondo={AZUL_M} id={ID} op={e1(t, m('primeros'))} tam={26} />}
        </g>}
      </Toma>
    </Lienzo>
  );
};
