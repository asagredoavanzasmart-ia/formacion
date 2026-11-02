import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Telefono, Barra, Cifra, Lead, Flujo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Cincuenta maneras de conseguir usuarios.
 * 1 · La pizarra se llena de renglones hasta cincuenta.
 * 2 · Tres socios, tres resultados: Telefónica (esperaban 20–30 %, llegó 2–3 %), 3 Italia (250 mil y luego 50 mil),
 *     TIM Brasil (15 millones para Moovit). Los buscadores: un sitio por cada «cómo llegar» trae usuarios.
 * 3 · Dos perfiles de mercadeo: quien define mercado, producto y precio, y quien promociona.
 */

const ID = 'ep26', P = 'ep-cincuenta';

export const CincuentaEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('pizarra'), 'Cincuenta maneras'], [m('acuerdos'), 'Acuerdos de desarrollo'], [m('paciencia'), 'Paciencia'], [m('sitio'), 'Los buscadores'],
    [m('perfiles'), 'Dos perfiles de mercadeo'],
  ];
  const renglones = Math.round(50 * sm(t, m('cincuenta'), m('cincuenta') + 4));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Cincuenta maneras de conseguir usuarios">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la pizarra */}
      <Toma t={t} a={0} b={m('acuerdos')} cy={470}>
        <rect x={180} y={160} width={840} height={560} rx={24} fill={isDark ? '#1f2937' : '#f8fafc'} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
        {Array.from({ length: 50 }, (_, k) => k < renglones && <rect key={k} x={220 + Math.floor(k / 10) * 160} y={200 + (k % 10) * 48} width={110 + 30 * ((k * 7) % 3)} height={14} rx={7} fill={[NARANJA, ROSA, AZUL_M, VERDE, VIOLETA][Math.floor(k / 10)]} opacity={0.8} />)}
        <Cifra x={600} y={800} valor={renglones} u={1} color={NARANJA} tam={60} />
        {t >= m('asegurado') && <Letrero x={600} y={120} texto="Ninguna tiene el éxito asegurado" fondo={GRIS} id={ID} op={e1(t, m('asegurado'))} tam={24} />}
      </Toma>

      {/* 2 · socios y buscadores */}
      <Toma t={t} a={m('acuerdos')} b={m('perfiles')} cy={470}>
        {t < m('sitio') ? <g>
          {t >= m('telefonica') && <g opacity={e1(t, m('telefonica'))}>
            <rect x={140} y={700 - 300 * 0.25} width={120} height={300 * 0.25} rx={12} fill={c.apagado} />
            <Txt f="a" x={200} y={700 - 300 * 0.25 - 14} textAnchor="middle" fontSize={22} fill={c.tenue}>Esperado</Txt>
            <rect x={270} y={700 - 300 * 0.025 * sm(t, m('dosotres'), m('dosotres') + 1)} width={120} height={300 * 0.025 * sm(t, m('dosotres'), m('dosotres') + 1)} rx={6} fill={ROSA} />
            {t >= m('dosotres') && <Txt x={330} y={670} textAnchor="middle" fontSize={30} fill={ROSA}>2–3 %</Txt>}
            <Txt x={265} y={760} textAnchor="middle" fontSize={28} fill={c.texto}>Telefónica</Txt>
          </g>}
          {t >= m('italia') && <g opacity={e1(t, m('italia'))}>
            <rect x={490} y={700 - 260 * sm(t, m('doscientos'), m('doscientos') + 1)} width={110} height={260 * sm(t, m('doscientos'), m('doscientos') + 1)} rx={12} fill={VERDE} />
            <rect x={620} y={700 - 52 * sm(t, m('solo50'), m('solo50') + 1)} width={110} height={52 * sm(t, m('solo50'), m('solo50') + 1)} rx={8} fill={GRIS} />
            {t >= m('doscientos') && <Txt x={545} y={420} textAnchor="middle" fontSize={26} fill={VERDE}>250 mil</Txt>}
            {t >= m('solo50') && <Txt x={675} y={630} textAnchor="middle" fontSize={26} fill={GRIS}>50 mil</Txt>}
            <Txt x={610} y={760} textAnchor="middle" fontSize={28} fill={c.texto}>3 Italia</Txt>
          </g>}
          {t >= m('tim') && <g opacity={e1(t, m('tim'))}>
            {Array.from({ length: Math.round(15 * sm(t, m('quince'), m('quince') + 2)) }, (_, k) => <Persona key={k} id={ID} x={860 + (k % 5) * 50} y={680 - Math.floor(k / 5) * 110} s={0.28} cuerpo={VIOLETA} />)}
            <Txt x={960} y={760} textAnchor="middle" fontSize={28} fill={c.texto}>TIM Brasil</Txt>
            {t >= m('quince') && <Txt f="a" x={960} y={330} textAnchor="middle" fontSize={26} fill={VIOLETA}>15 millones</Txt>}
          </g>}
          {t >= m('paciencia') && <Letrero x={600} y={200} texto="Pocos aciertos grandes pagan muchos fallos" id={ID} op={e1(t, m('paciencia'))} tam={24} />}
        </g> : <g>
          <rect x={250} y={240} width={700} height={80} rx={40} fill={c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
          <Txt f="a" x={300} y={292} fontSize={28} fill={c.texto}>{'¿Cómo llegar de A a B?'.slice(0, Math.floor(22 * sm(t, m('sitio'), m('sitio') + 1.5)))}</Txt>
          {Array.from({ length: 12 }, (_, k) => <rect key={k} x={260 + (k % 6) * 115} y={380 + Math.floor(k / 6) * 120} width={100} height={96} rx={10} fill={k % 2 ? NARANJA : ROSA} opacity={sm(t, m('sitio') + 0.5 + 0.1 * k, m('sitio') + 0.9 + 0.1 * k) * 0.85} />)}
          {t >= m('buscadores') && <Flujo x1={600} y1={640} x2={600} y2={800} t={t} n={6} vel={0.9} arco={0} color={AZUL_M} />}
          {t >= m('buscadores') && <Letrero x={900} y={760} texto="Millones de usuarios" fondo={AZUL_M} id={ID} op={e1(t, m('buscadores'))} tam={24} />}
        </g>}
      </Toma>

      {/* 3 · dos perfiles */}
      <Toma t={t} a={m('perfiles')} b={fin + 1} cy={470}>
        {[{ n: 'Define mercado, producto y precio', col: VIOLETA, x: 330 }, { n: 'Promociona', col: NARANJA, x: 870 }].map((p, k) => (
          <g key={p.n} opacity={e1(t, m('perfiles') + 0.6 * k)}>
            <Persona id={ID} x={p.x} y={620} s={0.9} cuerpo={p.col} />
            <Letrero x={p.x} y={690} texto={k ? 'Al crecer' : 'Al inicio'} fondo={p.col} id={ID} tam={24} />
            {!movil && <Txt f="a" x={p.x} y={760} textAnchor="middle" fontSize={24} fill={c.texto}>{p.n}</Txt>}
          </g>
        ))}
        {t >= m('fracasa') && <Letrero x={600} y={300} texto="Cambiarlos casi siempre fracasa" fondo={GRIS} id={ID} op={e1(t, m('fracasa'))} tam={24} />}
        {t >= m('ciclos') && <Letrero x={600} y={200} texto="Entre empresas: ciclos de venta más cortos" fondo={VERDE} id={ID} op={e1(t, m('ciclos'))} tam={22} />}
      </Toma>
    </Lienzo>
  );
};
