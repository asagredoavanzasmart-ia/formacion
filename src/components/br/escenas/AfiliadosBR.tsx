import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, PersonaCara, Moneda3D, Libro, Hoja, Sello, Navegador, Balanza, Tarjeta, Conector, Pastilla, LogoCF, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Un ejército de afiliados.
 * Toma 1: la frase leída en un foro y la red: el producto al centro y cinco afiliados alrededor, cada uno con su propio
 * público; los clientes viajan del público al afiliado y del afiliado al producto, y solo cuando hay venta una moneda
 * vuelve al afiliado.
 * Toma 2: pagar mucho: el mercado paga 20–30 % y Brunson 40 % recurrente (ClickFunnels); en las ofertas de entrada,
 * 20 dólares por cada libro regalado; en las ofertas con margen, la utilidad partida mitad y mitad.
 * Toma 3: un maletín de materiales viaja a los afiliados; una balanza pasa el riesgo de tu lado al de la venta; y el
 * afiliado que recomienda algo que no funciona ve cómo su público se va.
 */

const ID = 'br22', P = 'br-afiliados';

export const AfiliadosBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('foro'), 'Una frase en un foro'], [m('red'), 'Una red de afiliados'], [m('mucho'), 'Pagar mucho'],
    [m('entrada'), 'Ofertas de entrada'], [m('mitad'), 'Mitad y mitad'], [m('capacita'), 'Capacitar'], [m('riesgo'), 'El riesgo y la honestidad'],
  ];
  const red = sm(t, m('red'), m('red') + 1.2);
  const C = [600, 500];
  const A = [0, 1, 2, 3, 4].map((k) => { const a = -Math.PI / 2 + (k / 5) * Math.PI * 2; return [C[0] + Math.cos(a) * 300, C[1] + Math.sin(a) * 230, a] as const; });
  const riesgo = sm(t, m('riesgo'), m('riesgo') + 1.4);
  const seVan = sm(t, m('honestidad') + 0.6, m('honestidad') + 2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Un ejército de afiliados">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La red */}
      <Toma t={t} a={0} b={m('mucho')} cy={470}>
        <g opacity={E('foro') * (1 - red)}>
          <Navegador x={260} y={250} w={680} h={300} c={c} texto="foro">
            <circle cx={70} cy={130} r={30} fill={`url(#${ID}-cara)`} />
            <rect x={120} y={100} width={520} height={130} rx={16} fill={c.panel2} />
            <Txt x={380} y={160} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>{movil ? '«Mi red de afiliados»' : '«Me apoyo en mi propia red'}</Txt>
            {!movil && <Txt x={380} y={200} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>de afiliados»</Txt>}
          </Navegador>
        </g>
        {red > 0 && (
          <g opacity={red}>
            {A.map(([x, y], k) => <Conector key={k} x1={x} y1={y} x2={C[0]} y2={C[1]} u={red} t={t} color={[NARANJA, ROSA, VIOLETA, TEAL, AZUL_M][k]} puntos={t >= m('venta') ? 2 : 0} grosor={4} />)}
            <rect x={C[0] - 80} y={C[1] - 60} width={160} height={120} rx={24} fill={`url(#${ID}-marca)`} style={sombra(0.25, 4, 10)} />
            <Txt x={C[0]} y={C[1] + 10} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>Lo tuyo</Txt>
            {A.map(([x, y, a], k) => (
              <g key={k}>
                <Persona id={ID} x={x} y={y + 40} s={0.45} cuerpo={[NARANJA, ROSA, VIOLETA, TEAL, AZUL_M][k]} />
                {[0, 1, 2].map((j) => <circle key={j} cx={x + Math.cos(a + (j - 1) * 0.5) * 80} cy={y + Math.sin(a + (j - 1) * 0.5) * 60 + 10} r={10} fill={GRIS} opacity={0.6} />)}
              </g>
            ))}
            {t >= m('venta') && A.map(([x, y], k) => {
              const p = ((t - m('venta')) * 0.4 + k / 5) % 1;
              return p > 0.55 ? <Moneda3D key={k} x={lerp(C[0], x, (p - 0.55) / 0.45)} y={lerp(C[1], y, (p - 0.55) / 0.45) - 20} r={14} giro={1} op={Math.sin(Math.PI * (p - 0.55) / 0.45)} /> : null;
            })}
          </g>
        )}
        <Pastilla x={600} y={200} texto={movil ? 'No hace falta ser el mejor' : 'No hace falta ser el mejor en tráfico'} fondo={GRIS} tam={24} op={E('mejor') * (1 - E('venta'))} />
        <Pastilla x={600} y={200} texto="Cobran solo si venden" fondo={VERDE} tam={28} op={E('venta')} />
      </Toma>

      {/* 2 · Pagar mucho */}
      <Toma t={t} a={m('mucho')} b={m('capacita')} cy={470}>
        <Tarjeta x={70} y={190} w={470} h={580} titulo={movil ? 'Comisión' : 'Comisión por venta'} c={c} id={ID} op={E('mucho')} acento={VERDE}>
          <rect x={50} y={470} width={370} height={5} rx={2} fill={c.apagado} />
          <rect x={90} y={470 - 270 * sm(t, m('competencia'), m('competencia') + 1)} width={120} height={270 * sm(t, m('competencia'), m('competencia') + 1)} rx={12} fill={GRIS} />
          <Txt x={150} y={180} textAnchor="middle" fontSize={30} fill={c.texto} peso={800} opacity={E('competencia')}>20–30 %</Txt>
          <rect x={260} y={470 - 360 * sm(t, m('cuarenta'), m('cuarenta') + 1)} width={120} height={360 * sm(t, m('cuarenta'), m('cuarenta') + 1)} rx={12} fill={VERDE} />
          <Txt x={320} y={95} textAnchor="middle" fontSize={30} fill={VERDE} peso={800} opacity={E('cuarenta')}>40 %</Txt>
          <Txt x={150} y={515} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>Mercado</Txt>
          <Txt x={320} y={515} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>Brunson</Txt>
          <Txt x={320} y={550} textAnchor="middle" fontSize={22} fill={VERDE} peso={800} opacity={E('cuarenta')}>recurrente</Txt>
          <LogoCF x={415} y={70} s={0.3} isDark={isDark} />
        </Tarjeta>
        <Tarjeta x={600} y={190} w={530} h={270} titulo={movil ? 'Entrada' : 'Ofertas de entrada'} c={c} id={ID} op={E('entrada')} acento={NARANJA} tam={24}>
          <Libro x={110} y={230} color={NARANJA} titulo="Gratis" autor="" s={0.6} c={c} />
          <Conector x1={180} y1={150} x2={300} y2={150} u={E('libro')} t={t} color={VERDE} puntos={3} />
          <Cifra x={400} y={170} valor={20} u={sm(t, m('libro'), m('libro') + 0.8)} pre="$" tam={64} color={VERDE} />
          <Txt x={400} y={215} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>{movil ? 'por libro' : 'al afiliado por libro'}</Txt>
        </Tarjeta>
        <Tarjeta x={600} y={490} w={530} h={280} titulo={movil ? 'Con margen' : 'Ofertas con margen'} c={c} id={ID} op={E('mitad')} acento={VIOLETA} tam={24}>
          <g transform="translate(150 160)">
            <path d="M 0 -80 A 80 80 0 0 1 0 80 Z" fill={VERDE} transform={`translate(${10 * sm(t, m('mitad'), m('mitad') + 0.8)} 0)`} />
            <path d="M 0 -80 A 80 80 0 0 0 0 80 Z" fill={NARANJA} transform={`translate(${-10 * sm(t, m('mitad'), m('mitad') + 0.8)} 0)`} />
          </g>
          <Txt x={370} y={160} textAnchor="middle" fontSize={40} fill={c.texto} peso={800}>50 / 50</Txt>
          <Txt x={370} y={200} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>de la utilidad</Txt>
        </Tarjeta>
      </Toma>

      {/* 3 · Materiales, riesgo y honestidad */}
      <Toma t={t} a={m('capacita')} b={fin + 1} cy={470}>
        <g opacity={E('capacita')}>
          <rect x={70} y={270} width={250} height={150} rx={18} fill={AMBAR} />
          <rect x={165} y={244} width={60} height={34} rx={10} fill="none" stroke={AMBAR} strokeWidth={10} />
          <Txt x={195} y={360} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>Materiales</Txt>
          {[0, 1, 2].map((k) => { const p = ((t - m('capacita')) * 0.4 + k / 3) % 1; return <g key={k} opacity={Math.sin(Math.PI * p)}><Hoja x={lerp(340, 520, p)} y={300 + k * 30} w={50} h={64} color={c.tenue} /></g>; })}
          {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={580 + k * 80} y={430} s={0.45} cuerpo={[NARANJA, VIOLETA, TEAL][k]} />)}
          <Pastilla x={660} y={480} texto={movil ? 'Para copiar' : 'Listos para copiar y editar'} fondo={AMBAR} tam={22} />
        </g>
        {t >= m('riesgo') && (
          <g opacity={E('riesgo')}>
            <Balanza x={300} y={800} inc={lerp(-14, 14, riesgo)} c={c} brazo={150} alto={210}
              izq={<g><Txt x={0} y={62} textAnchor="middle" fontSize={22} fill={c.texto} peso={800}>Tú</Txt></g>}
              der={<g><Txt x={0} y={62} textAnchor="middle" fontSize={22} fill={c.texto} peso={800}>Venta</Txt></g>} />
            <g transform={`translate(${lerp(150, 450, riesgo)} ${lerp(640, 690, riesgo)})`}><path d="M -40 30 L -26 -24 H 26 L 40 30 Z" fill={ROJO_M} /><circle cy={-34} r={12} fill="none" stroke={ROJO_M} strokeWidth={6} /></g>
            <Pastilla x={300} y={540} texto={movil ? 'Pagas al vender' : 'Pagas cuando se vende'} fondo={VERDE} tam={24} />
          </g>
        )}
        {t >= m('honestidad') && (
          <g opacity={E('honestidad')}>
            <PersonaCara id={ID} x={900} y={720} s={0.7} cuerpo={VIOLETA} e={-seVan} enojo={seVan} />
            {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={lerp(800 + k * 50, 760 + k * 110, seVan)} cy={lerp(780, 830, seVan)} r={14} fill={GRIS} opacity={1 - 0.7 * seVan} />)}
            <Pastilla x={900} y={560} texto="Exige honestidad" fondo={ROJO_M} tam={26} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
