import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Escudo, Barra, Edificio, Persona, Contrato, Billete, Visto, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Garantías condicionales.
 * Toma 1: la fórmula como contrato con tres casilleros (X resultado, Y tiempo, Z lo que haremos) y el escudo que se
 * levanta sobre el riesgo.
 * Toma 2: la cuenta: dos columnas de cajas (ventas) con las devoluciones que se van por un tobogán; 100 − 5 = 95 frente
 * a 130 − 13 = 117, +23 %. Debajo, el metaanálisis de Janakiraman y colegas.
 * Toma 3: Fladlien: la tienda que se compra por 25.000; 3 millones extra y 10 reclamos. Y la garantía de servicio
 * extendido: el reloj que sigue mientras el cliente cumple.
 */

const ID = 'ad15', P = 'ad-garantias';

export const GarantiasAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('condicion'), 'Si no consigues X en Y, haremos Z'], [m('temer'), 'Hacer la cuenta'], [m('con'), 'Con garantía potente'], [m('veintitres'), '+23 % neto'],
    [m('academica'), 'Lo confirma la evidencia'], [m('fladlien'), 'Jason Fladlien'], [m('extendido'), 'Servicio extendido'],
  ];
  const col = (x: number, ventas: number, dev: number, a: number, color: string, txt: string) => {
    const u = sm(t, a, a + 1.2);
    const cajas = Math.round((ventas / 10) * u);
    const sale = Math.round((dev / 10 + (dev % 10 ? 1 : 0)) * sm(t, a + 1, a + 2));
    return (
      <g>
        {Array.from({ length: cajas }, (_, k) => {
          const fuera = k >= cajas - sale;
          return <rect key={k} x={x - 60 + (fuera ? 120 + 30 * k % 60 : 0)} y={700 - (k + 1) * 34 + (fuera ? 40 : 0)} width={120} height={28} rx={6} fill={fuera ? ROJO_M : color} opacity={fuera ? 0.5 : 1} />;
        })}
        <Txt f="a" x={x} y={750} textAnchor="middle" fontSize={26} fill={c.texto}>{txt}</Txt>
      </g>
    );
  };

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Garantías condicionales">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La fórmula */}
      <Toma t={t} a={0} b={m('sin')} cy={470}>
        <g opacity={e1(t, m('condicion'))}>
          {(['X resultado', 'Y tiempo', 'Z haremos'] as const).map((s, k) => (
            <g key={s} opacity={sm(t, m('equis') + k * 0.5, m('equis') + k * 0.5 + 0.5)} transform={`translate(${260 + k * 340} 320)`}>
              <rect x={-140} y={-70} width={280} height={140} rx={24} fill={[AZUL_M, VIOLETA, VERDE][k]} style={sombra(0.22, 4, 10)} />
              <Txt x={0} y={14} textAnchor="middle" fontSize={38} fill="#fff" peso={800}>{s}</Txt>
            </g>
          ))}
          <Escudo x={600} y={600} s={1.1} u={sm(t, m('condicion'), m('condicion') + 1)} />
        </g>
        {t >= m('temer') && <Letrero x={600} y={780} texto="No temas a los reembolsos: haz la cuenta" fondo={AMBAR} id={ID} tam={28} op={e1(t, m('temer'))} />}
      </Toma>

      {/* 2 · La cuenta y la evidencia */}
      <Toma t={t} a={m('sin')} b={m('fladlien')} cy={470}>
        <g opacity={ventana(t, m('sin'), m('academica') + 0.3)}>
          {col(300, 100, 5, m('sin'), GRIS, 'Sin garantía')}
          {t >= m('con') && col(760, 130, 13, m('con'), VERDE, 'Con garantía')}
          <Cifra x={300} y={210} valor={95} u={sm(t, m('noventa'), m('noventa') + 1)} tam={70} color={c.texto} />
          {t >= m('ciento') && <Cifra x={760} y={210} valor={117} u={sm(t, m('ciento'), m('ciento') + 1)} tam={70} color={VERDE} />}
          {t >= m('veintitres') && <Letrero x={1040} y={300} texto="+23 %" fondo={VERDE} id={ID} tam={40} op={e1(t, m('veintitres'))} />}
        </g>
        {t >= m('academica') && (
          <g opacity={e1(t, m('academica'))}>
            <rect x={160} y={260} width={880} height={360} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Txt f="a" x={600} y={330} textAnchor="middle" fontSize={30} fill={c.texto}>Janakiraman, Syrdal y Freling (2016)</Txt>
            <rect x={300} y={560 - 200} width={200} height={200} rx={14} fill={VERDE} />
            <rect x={700} y={560 - 110} width={200} height={110} rx={14} fill={ROJO_M} />
            <Txt f="a" x={400} y={600} textAnchor="middle" fontSize={26} fill={c.texto}>Compras ↑</Txt>
            <Txt f="a" x={800} y={600} textAnchor="middle" fontSize={26} fill={c.texto}>Devoluciones ↑</Txt>
            <Letrero x={600} y={680} texto="Metaanálisis de 21 estudios" id={ID} tam={26} />
          </g>
        )}
      </Toma>

      {/* 3 · Fladlien y el servicio extendido */}
      <Toma t={t} a={m('fladlien')} b={fin + 1} cy={470}>
        <g opacity={ventana(t, m('fladlien'), m('extendido'))}>
          <Persona id={ID} x={200} y={640} s={0.75} cuerpo={VIOLETA} corbata />
          <Contrato x={420} y={420} s={1} firma={sm(t, m('fladlien'), m('fladlien') + 2)} titulo="Curso 2.997" />
          {t >= m('tienda') && (
            <g opacity={e1(t, m('tienda'))}>
              <Edificio x={720} y={640} w={150} h={170} color={NARANJA} />
              {[0, 1, 2].map((k) => { const ph = ((t - m('tienda')) * 0.7 + k / 3) % 1; return <Billete key={k} x={lerp(860, 760, ph)} y={lerp(300, 520, ph)} s={0.7} rot={ph * 90} />; })}
              <Letrero x={720} y={700} texto="Le compran la tienda: 25.000" id={ID} tam={26} />
            </g>
          )}
          {t >= m('tres') && (
            <g opacity={e1(t, m('tres'))}>
              <Cifra x={1000} y={330} valor={3} u={sm(t, m('tres'), m('tres') + 1)} pre="+" suf=" M" tam={80} color={VERDE} />
              {t >= m('diez') && <Letrero x={1000} y={400} texto="Solo 10 reclamos" fondo={AZUL_M} id={ID} tam={26} op={e1(t, m('diez'))} />}
            </g>
          )}
        </g>
        {t >= m('extendido') && (
          <g opacity={e1(t, m('extendido'))}>
            <Escudo x={360} y={440} s={1.3} u={sm(t, m('extendido'), m('extendido') + 1)} color={AZUL_M} />
            <g transform="translate(800 430)">
              {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-200 + k * 70} y={-30} width={56} height={60} rx={10} fill={k < 1 + ((t * 1.2) % 6) ? AZUL_M : c.apagado} />)}
              <Txt f="a" x={0} y={-60} textAnchor="middle" fontSize={26} fill={c.texto}>Trabajas gratis hasta lograrlo</Txt>
            </g>
            <Visto x={800} y={560} r={36} op={sm(t, m('extendido') + 1, m('extendido') + 1.6)} />
            <Letrero x={600} y={720} texto="Si el cliente cumple lo pactado" fondo={VERDE} id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
