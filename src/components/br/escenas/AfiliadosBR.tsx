import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Burbuja, Hilo, Moneda3D, Libro, Hoja, Barra, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Un ejército de afiliados.
 * Toma 1: la frase leída en un foro y la red: el producto al centro y cinco promotores alrededor unidos por hilos; los
 * clientes viajan de cada promotor al producto y, solo cuando hay venta, una moneda vuelve al promotor.
 * Toma 2: pagar mucho: barras de comisión (mercado 20–30 % frente a 40 % recurrente); en las ofertas de entrada, el libro
 * regalado con 20 dólares por cada uno; en las ofertas con margen, un círculo partido mitad y mitad.
 * Toma 3: el kit de materiales que se reparte, el riesgo que se traslada (pagas al vender) y la honestidad.
 */

const ID = 'br22', P = 'br-afiliados';

export const AfiliadosBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('foro'), 'Una frase en un foro'], [m('red'), 'Una red de afiliados'], [m('mucho'), 'Pagar mucho'],
    [m('entrada'), 'Ofertas de entrada'], [m('mitad'), 'Mitad y mitad'], [m('capacita'), 'Capacitar'], [m('riesgo'), 'Pagas al vender'],
  ];
  const red = sm(t, m('red'), m('red') + 1.2);
  const A = [0, 1, 2, 3, 4].map((k) => { const a = -Math.PI / 2 + (k / 5) * Math.PI * 2; return [600 + Math.cos(a) * 280, 480 + Math.sin(a) * 230] as const; });

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Un ejército de afiliados">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La red */}
      <Toma t={t} a={0} b={m('mucho')} cy={470}>
        <g opacity={ventana(t, m('foro') - 0.3, m('red') + 0.3)}>
          <Persona id={ID} x={300} y={600} s={0.8} cuerpo={GRIS} />
          <Burbuja x={420} y={330} w={560} texto="«Me apoyo en mi propia red de afiliados»" u={sm(t, m('foro'), m('foro') + 1.5)} c={c} id={ID} tam={28} />
        </g>
        {t >= m('red') && (
          <g opacity={red}>
            {A.map(([x, y], k) => <Hilo key={k} x1={600} y1={480} x2={x} y2={y} u={red} id={`${ID}h${k}`} grosor={5} color={c.apagado} />)}
            <rect x={530} y={420} width={140} height={120} rx={22} fill="url(#br22-marca)" style={sombra(0.25, 4, 10)} />
            <Txt x={600} y={492} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>Lo tuyo</Txt>
            {A.map(([x, y], k) => <Persona key={k} id={ID} x={x} y={y + 50} s={0.45} cuerpo={[NARANJA, ROSA, VIOLETA, TEAL, AZUL_M][k]} />)}
            {t >= m('venta') && A.map(([x, y], k) => {
              const ph = ((t - m('venta')) * 0.5 + k / 5) % 1;
              return <g key={k} opacity={Math.sin(Math.PI * ph)}><Moneda3D x={lerp(600, x, ph)} y={lerp(480, y, ph)} r={16} giro={Math.cos(t * 5)} /></g>;
            })}
            {t >= m('mejor') && <Letrero x={600} y={790} texto="No hace falta ser el mejor en tráfico" fondo={GRIS} id={ID} tam={26} op={ventana(t, m('mejor'), m('venta'))} />}
            {t >= m('venta') && <Letrero x={600} y={790} texto="Cobran solo si venden" fondo={VERDE} id={ID} tam={28} op={e1(t, m('venta'))} />}
          </g>
        )}
      </Toma>

      {/* 2 · Pagar mucho */}
      <Toma t={t} a={m('mucho')} b={m('capacita')} cy={470}>
        <g opacity={e1(t, m('mucho'))}>
          <rect x={90} y={200} width={460} height={560} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <rect x={130} y={660} width={380} height={6} rx={3} fill={c.apagado} />
          {t >= m('competencia') && (() => {
            const h = 216 * sm(t, m('competencia'), m('competencia') + 1);
            return (
              <g opacity={e1(t, m('competencia'))}>
                <rect x={170} y={660 - h} width={120} height={h} rx={12} fill={GRIS} />
                <Txt x={230} y={640 - h} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>20–30 %</Txt>
                <Txt x={230} y={710} textAnchor="middle" fontSize={26} fill={c.tenue}>Mercado</Txt>
              </g>
            );
          })()}
          {t >= m('cuarenta') && (() => {
            const h = 288 * sm(t, m('cuarenta'), m('cuarenta') + 1);
            return (
              <g opacity={e1(t, m('cuarenta'))}>
                <rect x={370} y={660 - h} width={120} height={h} rx={12} fill={VERDE} />
                <Txt x={430} y={640 - h} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>40 %</Txt>
                <Txt x={430} y={710} textAnchor="middle" fontSize={26} fill={c.tenue}>Brunson</Txt>
              </g>
            );
          })()}
        </g>
        {t >= m('entrada') && (
          <g opacity={e1(t, m('entrada'))}>
            <rect x={620} y={200} width={500} height={270} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Txt x={870} y={250} textAnchor="middle" fontSize={26} fill={c.tenue}>Oferta de entrada</Txt>
            <Libro x={720} y={440} color={NARANJA} titulo="Gratis" autor="" s={0.55} c={c} />
            {t >= m('libro') && <Cifra x={940} y={360} valor={20} u={sm(t, m('libro'), m('libro') + 0.8)} pre="$" tam={64} color={VERDE} />}
            {t >= m('libro') && <Txt x={940} y={410} textAnchor="middle" fontSize={24} fill={c.tenue}>por cada libro</Txt>}
          </g>
        )}
        {t >= m('mitad') && (
          <g opacity={e1(t, m('mitad'))}>
            <rect x={620} y={490} width={500} height={270} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Txt x={870} y={540} textAnchor="middle" fontSize={26} fill={c.tenue}>Oferta con margen</Txt>
            <g transform="translate(760 650)">
              <path d="M 0 -80 A 80 80 0 0 1 0 80 Z" fill={VERDE} transform={`translate(${8 * sm(t, m('mitad'), m('mitad') + 0.8)} 0)`} />
              <path d="M 0 -80 A 80 80 0 0 0 0 80 Z" fill={NARANJA} transform={`translate(${-8 * sm(t, m('mitad'), m('mitad') + 0.8)} 0)`} />
            </g>
            <Txt x={990} y={640} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>50 / 50</Txt>
            <Txt x={990} y={680} textAnchor="middle" fontSize={24} fill={c.tenue}>de la utilidad</Txt>
          </g>
        )}
      </Toma>

      {/* 3 · Materiales, riesgo y honestidad */}
      <Toma t={t} a={m('capacita')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('capacita'))}>
          <rect x={120} y={360} width={240} height={180} rx={20} fill={AMBAR} />
          <rect x={200} y={330} width={80} height={40} rx={12} fill="none" stroke={AMBAR} strokeWidth={12} />
          <Txt x={240} y={470} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>Materiales</Txt>
          {[0, 1, 2].map((k) => {
            const ph = ((t - m('capacita')) * 0.4 + k / 3) % 1;
            return <g key={k} opacity={Math.sin(Math.PI * ph)}><Hoja x={lerp(380, 640, ph)} y={380 + k * 40} w={60} h={78} color={c.tenue} /></g>;
          })}
          {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={720 + k * 90} y={560} s={0.45} cuerpo={[NARANJA, VIOLETA, TEAL][k]} />)}
          <Letrero x={810} y={640} texto="Listos para copiar y editar" fondo={AMBAR} id={ID} tam={24} />
        </g>
        {t >= m('riesgo') && <Sello x={300} y={740} texto={movil ? 'Pago por venta' : 'Pagas cuando se vende'} u={sm(t, m('riesgo'), m('riesgo') + 0.6)} color={VERDE} tam={28} rot={-4} />}
        {t >= m('honestidad') && <Letrero x={860} y={760} texto="Exige honestidad" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('honestidad'))} />}
      </Toma>
    </Lienzo>
  );
};
