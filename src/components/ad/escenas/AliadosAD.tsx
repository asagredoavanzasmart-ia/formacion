import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Gente, Hoja, Edificio, Calendario, Iman, Escalon, Flujo, Visto, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Empleados, agencias y afiliados.
 * Toma 1 (empleados): entrevistas grupales y el ciclo de tres pasos: documentar (lista que se escribe), demostrar (tú
 * frente a ellos) y duplicar (ellos frente a ti); un medidor de retorno sobre la nómina pasa la línea de 3 a 1.
 * Toma 2 (agencias): un contrato de seis meses en calendario; la habilidad (una llama) pasa de la agencia a tu equipo;
 * cuando tu equipo supera a la agencia, la habilidad queda en casa.
 * Toma 3 (afiliados): negocios vecinos que ya le venden a tu cliente; un filtro de entrada (certificación) y tres
 * escalones de pago (25 / 50 / 100 %); al final entregan tu imán con cada venta propia.
 */

const ID = 'ad29', P = 'ad-aliados';

export const AliadosAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('empleados'), 'Empleados'], [m('documentas'), 'Documentar, demostrar, duplicar'], [m('nomina'), 'Retorno sobre la nómina'], [m('agencias'), 'Agencias: seis meses'],
    [m('casa'), 'La habilidad queda en casa'], [m('afiliados'), 'Afiliados'], [m('niveles'), 'Tres niveles de pago'],
  ];
  const PASOS: [string, string, string][] = [['documentas', 'Documentar', AZUL_M], ['demuestras', 'Demostrar', VIOLETA], ['dupliquen', 'Duplicar', VERDE]];
  const traspaso = sm(t, m('paralelo'), m('supera') + 0.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Empleados, agencias y afiliados">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Empleados */}
      <Toma t={t} a={0} b={m('agencias')} cy={470}>
        <g opacity={e1(t, m('empleados'))}>
          <Gente x={130} y={330} n={5} activos={Math.round(5 * sm(t, m('grupales'), m('grupales') + 1))} color={AZUL_M} paso={56} s={0.5} />
          {t >= m('grupales') && <Letrero x={240} y={390} texto="Entrevistas grupales" fondo={AZUL_M} id={ID} tam={24} op={e1(t, m('grupales'))} />}
        </g>
        {PASOS.map(([n, txt, col], k) => {
          const a = -90 + k * 120;
          const x = 760 + 180 * Math.cos((a * Math.PI) / 180), y = 450 + 180 * Math.sin((a * Math.PI) / 180);
          return (
            <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.15}>
              <circle cx={x} cy={y} r={86} fill={col} style={sombra(0.22, 3, 8)} />
              <g transform={`translate(${x} ${y})`}>
                {k === 0 && <Hoja x={0} y={0} w={70} h={90} lineas={4} color={col} />}
                {k === 1 && <Persona id={ID} x={0} y={50} s={0.4} cuerpo={NARANJA} />}
                {k === 2 && <Gente x={-20} y={50} n={2} activos={2} color="#fff" paso={40} s={0.4} />}
              </g>
              <Letrero x={x} y={y + 116} texto={txt} fondo={col} id={ID} tam={24} />
            </g>
          );
        })}
        {t >= m('documentas') && <path d="M 760 450 m -120 0 a 120 120 0 1 1 240 0 a 120 120 0 1 1 -240 0" stroke={c.apagado} strokeWidth={6} fill="none" strokeDasharray="10 12" transform={`rotate(${t * 30} 760 450)`} />}
        {t >= m('nomina') && (
          <g opacity={e1(t, m('nomina'))}>
            <rect x={140} y={480} width={260} height={30} rx={15} fill={c.apagado} />
            <rect x={140} y={480} width={260 * sm(t, m('nomina'), m('nomina') + 1.5) * 0.9} height={30} rx={15} fill={VERDE} />
            <path d="M 315 466 V 524" stroke={c.texto} strokeWidth={5} />
            <Txt f="a" x={315} y={560} textAnchor="middle" fontSize={26} fill={c.texto}>3 a 1</Txt>
            <Letrero x={270} y={630} texto="Retorno sobre la nómina" fondo={VERDE} id={ID} tam={24} />
          </g>
        )}
      </Toma>

      {/* 2 · Agencias */}
      <Toma t={t} a={m('agencias')} b={m('afiliados')} cy={470}>
        <g opacity={e1(t, m('agencias'))}>
          <Edificio x={240} y={680} w={180} h={260} color={VIOLETA} />
          <Letrero x={240} y={740} texto="Agencia" fondo={VIOLETA} id={ID} tam={26} />
          <Edificio x={960} y={680} w={180} h={200 + 80 * traspaso} color={NARANJA} />
          <Letrero x={960} y={740} texto="Tu equipo" id={ID} tam={26} />
          {t >= m('seis') && (
            <g opacity={e1(t, m('seis'))}>
              {Array.from({ length: 6 }, (_, k) => <rect key={k} x={430 + k * 58} y={200} width={48} height={48} rx={10} fill={k < 6 * sm(t, m('seis'), m('supera')) ? AMBAR : c.apagado} />)}
              <Txt f="a" x={600} y={290} textAnchor="middle" fontSize={26} fill={c.texto}>6 meses</Txt>
            </g>
          )}
          {t >= m('paralelo') && (
            <g>
              <g transform={`translate(${lerp(240, 960, traspaso)} ${380 - 120 * Math.sin(Math.PI * traspaso)})`}>
                <path d="M 0 -50 C 26 -24 30 -4 18 14 C 10 26 -10 26 -18 14 C -28 -2 -16 -18 -6 -26 C -4 -14 4 -10 6 -16 C 8 -26 4 -38 0 -50 Z" fill={AMBAR} transform={`scale(${1 + 0.08 * Math.sin(t * 8)})`} />
              </g>
              <Flujo x1={330} y1={460} x2={870} y2={460} t={t} n={4} color={AMBAR} r={8} op={1 - traspaso} />
            </g>
          )}
          {t >= m('supera') && <Visto x={1060} y={400} r={34} op={e1(t, m('supera'))} />}
          {t >= m('casa') && <Letrero x={600} y={560} texto="La habilidad queda en casa" fondo={NARANJA} id={ID} tam={28} op={e1(t, m('casa'))} />}
        </g>
      </Toma>

      {/* 3 · Afiliados */}
      <Toma t={t} a={m('afiliados')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('afiliados'))}>
          <Persona id={ID} x={600} y={420} s={0.6} cuerpo={AZUL_M} />
          {!movil && <Txt f="a" x={600} y={460} textAnchor="middle" fontSize={22} fill={c.tenue}>tu cliente ideal</Txt>}
          {[0, 1, 2].map((k) => <g key={k}><Edificio x={260 + k * 340} y={260} w={100} h={110} color={[TEAL, ROSA, AMBAR][k]} /><Flujo x1={260 + k * 340} y1={280} x2={600} y2={340} t={t + k} n={3} color={[TEAL, ROSA, AMBAR][k]} r={6} op={0.7} /></g>)}
        </g>
        {t >= m('calificas') && (
          <g opacity={ventana(t, m('calificas'), m('niveles'))}>
            <Letrero x={600} y={560} texto="Filtro: compran o se certifican (10–20 %)" fondo={VIOLETA} id={ID} tam={24} />
          </g>
        )}
        {t >= m('niveles') && (
          <g opacity={e1(t, m('niveles'))}>
            {(['25 %', '50 %', '100 %'] as const).map((s, k) => (
              <g key={s} opacity={sm(t, m('niveles') + k * 0.5, m('niveles') + k * 0.5 + 0.5)}>
                <Escalon x={300 + k * 210} y={780} w={190} h={60 + k * 60} color={[GRIS, AZUL_M, VERDE][k]} />
                <Txt x={395 + k * 210} y={780 - (60 + k * 60) + 44} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>{s}</Txt>
              </g>
            ))}
            {!movil && <Txt f="a" x={600} y={830} textAnchor="middle" fontSize={22} fill={c.tenue}>de tu costo de adquisición: entrar · activarse · mantener</Txt>}
          </g>
        )}
        {t >= m('integras') && <Iman x={1090} y={560} s={0.6} rot={90} atrae={1} t={t} op={e1(t, m('integras'))} />}
      </Toma>
    </Lienzo>
  );
};
