import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Maleza, TelefonoFijo, Telefono, Cama, Cifra, Calendario, Suelo, Barra, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Prevenir de raíz.
 * Toma 1: la maleza que vuelve cada semana aunque se corte; tres preguntas; la acción de pocos minutos: arrancarla de raíz.
 * Toma 2 (Expedia, Dan Heath): la mesa de teléfonos que suenan (58 de cada 100 clientes, 20 millones de llamadas) por pedir
 * el itinerario; el autoservicio en el teléfono del cliente y los teléfonos que se callan: 15 de cada 100.
 * Toma 3 (Michael Roberto): la cama de hospital con su monitor y los umbrales 40 y 130; cualquiera llama al equipo antes de
 * que el paciente empeore; −71 % códigos azules y −18 % muertes; el incendio de cada lunes.
 */

const ID = 'es18', P = 'es-prevenir';

const Llama: React.FC<{ x: number; y: number; s?: number; t: number; op?: number }> = ({ x, y, s = 1, t, op = 1 }) => op < 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s} ${s * (1 + 0.08 * Math.sin(t * 9))})`} opacity={op}>
    <path d="M 0 0 Q -46 -30 -20 -90 Q -10 -60 0 -70 Q 4 -110 30 -130 Q 24 -80 44 -50 Q 52 -20 0 0 Z" fill="#f97316" />
    <path d="M 0 0 Q -20 -20 -6 -56 Q 4 -40 10 -50 Q 24 -30 0 0 Z" fill="#fde68a" />
  </g>
);

export const PrevenirES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('prevenir'), 'Prevenir lo que se repite'], [m('irrita'), '¿Qué se repite?'], [m('cuesta'), '¿Cuánto cuesta?'], [m('minutos'), '¿Qué lo resuelve de raíz?'],
    [m('expedia'), 'Expedia'], [m('itinerario'), 'Pedían el itinerario'], [m('autoservicio'), 'Autoservicio'], [m('roberto'), 'Respuesta rápida'],
    [m('setenta'), 'Menos emergencias'], [m('raiz'), 'Atacar la causa una vez'],
  ];
  const corta = ((t - m('prevenir')) * 0.7) % 1;
  const arranca = sm(t, m('minutos') + 0.8, m('minutos') + 2);
  const calla = sm(t, m('autoservicio') + 0.6, m('autoservicio') + 2);
  const PREG: [string, string][] = [['irrita', '¿Qué problema se repite?'], ['cuesta', '¿Cuánto cuesta convivir con él?'], ['minutos', '¿Qué acción de minutos lo resuelve?']];
  const pulso = (x: number) => { const ph = (x * 0.03 + t * 2) % 6.28; const sube = sm(t, m('cualquiera') - 2, m('cualquiera')); return 420 - 30 * Math.exp(-((ph - 3) ** 2) * 8) * 3 - sube * 60 * Math.sin(x * 0.02); };

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Prevenir de raíz">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la maleza */}
      <Toma t={t} a={0} b={m('expedia')} cy={480}>
        <rect x={80} y={640} width={560} height={160} rx={16} fill={isDark ? '#3f2d1d' : '#d6b48a'} opacity={e1(t, m('prevenir'))} />
        <Maleza x={360} y={640} s={1.5} corte={arranca > 0 ? 0 : corta < 0.5 ? corta * 2 * 0.8 : (1 - corta) * 0.8 * 2 * 0.5} arranque={arranca} t={t} op={e1(t, m('prevenir'))} />
        <Persona id={ID} x={180} y={640} s={1} cuerpo={NARANJA} />
        {arranca < 0.1 && <Calendario x={520} y={250} s={0.8} marcados={Math.floor((t - m('prevenir')) * 0.7) % 8} op={e1(t, m('prevenir'))} />}
        {PREG.map(([n, q], k) => <Letrero key={n} x={880} y={300 + k * 120} texto={q} fondo={[AZUL_M, VIOLETA, VERDE][k]} id={ID} tam={26} op={e1(t, m(n))} />)}
        {arranca > 0.6 && <Letrero x={360} y={300} texto="De raíz, una sola vez" fondo={VERDE} id={ID} tam={28} op={arranca} />}
      </Toma>

      {/* 2 · Expedia */}
      <Toma t={t} a={m('expedia')} b={m('roberto')} cy={480}>
        {Array.from({ length: 6 }, (_, k) => <TelefonoFijo key={k} x={180 + (k % 3) * 170} y={400 + Math.floor(k / 3) * 190} s={0.9} t={t + k} suena={(1 - calla) * (k < 5 || calla < 0.5 ? 1 : 0)} op={e1(t, m('expedia') + 0.1 * k)} />)}
        <g opacity={e1(t, m('cincuenta'))}>
          <Cifra x={900} y={330} valor={t >= m('quince') ? 15 : 58} u={1} tam={110} color={t >= m('quince') ? VERDE : ROJO_M} />
          <Txt x={900} y={380} textAnchor="middle" fontSize={26} fill={c.texto}>de cada 100 clientes llamaban</Txt>
        </g>
        {t >= m('veinte') && t < m('autoservicio') && <Txt x={900} y={460} textAnchor="middle" fontSize={30} fill={c.texto} opacity={e1(t, m('veinte'))}>20 millones de llamadas al año</Txt>}
        {t >= m('itinerario') && t < m('autoservicio') && <Letrero x={900} y={560} texto="«Mándame el itinerario»" fondo={GRIS} id={ID} tam={28} op={e1(t, m('itinerario'))} />}
        {t >= m('autoservicio') && (
          <g opacity={e1(t, m('autoservicio'))}>
            <Telefono x={900} y={720} s={1} widgets={2} />
            <rect x={850} y={560} width={100} height={36} rx={10} fill={VERDE} />
            <Txt x={900} y={586} textAnchor="middle" fontSize={20} fill="#fff">Itinerario</Txt>
          </g>
        )}
        {!movil && <Txt f="a" x={600} y={190} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('expedia'))}>Caso contado por Dan Heath</Txt>}
      </Toma>

      {/* 3 · hospital y el incendio de los lunes */}
      <Toma t={t} a={m('roberto')} b={fin + 1} cy={480}>
        {ventana(t, m('roberto') - 0.1, m('raiz')) > 0.01 && (
          <g opacity={ventana(t, m('roberto') - 0.1, m('raiz'))}>
            <Suelo y={760} isDark={isDark} x0={80} x1={1120} />
            <Cama x={300} y={760} color="#38bdf8" />
            <g transform="translate(0 0)">
              <rect x={120} y={260} width={420} height={260} rx={18} fill="#0b1220" />
              <path d={Array.from({ length: 40 }, (_, k) => `${k ? 'L' : 'M'} ${140 + k * 10} ${pulso(k * 10) - 30}`).join(' ')} stroke="#22c55e" strokeWidth={4} fill="none" />
              {t >= m('umbrales') && [[300, '130'], [470, '40']].map(([y, v]) => <g key={v as string}><rect x={140} y={(y as number) - 2} width={380} height={4} fill={ROJO_M} opacity={0.8} /><Txt x={526} y={(y as number) + 8} fontSize={20} fill={ROJO_M}>{v as string}</Txt></g>)}
            </g>
            {t >= m('cualquiera') && <g opacity={e1(t, m('cualquiera'))}>{[0, 1, 2].map((k) => <Persona key={k} id={ID} x={lerp(1200, 620 + k * 110, sm(t, m('cualquiera') + 0.3 * k, m('cualquiera') + 0.3 * k + 1.2))} y={760} s={0.95} cuerpo={['#0ea5e9', '#14b8a6', '#0ea5e9'][k]} />)}</g>}
            {t >= m('setenta') && (
              <g opacity={e1(t, m('setenta'))}>
                {[['setenta', 71, 'códigos azules', VERDE], ['muertes', 18, 'muertes', AZUL_M]].map(([n, v, r, col], k) => (
                  <g key={n as string} opacity={e1(t, m(n as string))} transform={`translate(${780 + k * 220} 330)`}>
                    <path d={`M -18 ${-40} V ${40 + 60 * sm(t, m(n as string), m(n as string) + 1)} M -44 ${20 + 60 * sm(t, m(n as string), m(n as string) + 1)} L -18 ${50 + 60 * sm(t, m(n as string), m(n as string) + 1)} L 8 ${20 + 60 * sm(t, m(n as string), m(n as string) + 1)}`} stroke={col as string} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <Cifra x={0} y={180} valor={v as number} u={sm(t, m(n as string), m(n as string) + 1)} pre="−" suf=" %" tam={56} color={col as string} />
                    <Txt x={0} y={220} textAnchor="middle" fontSize={24} fill={c.texto}>{r as string}</Txt>
                  </g>
                ))}
              </g>
            )}
            {!movil && <Txt f="a" x={330} y={230} textAnchor="middle" fontSize={22} fill={c.tenue}>Equipos de respuesta rápida · Michael Roberto</Txt>}
          </g>
        )}
        {t >= m('raiz') && (
          <g opacity={e1(t, m('raiz'))}>
            {['L', 'L', 'L', 'L'].map((d, k) => (
              <g key={k} transform={`translate(${220 + k * 250} 600)`}>
                <rect x={-80} y={-20} width={160} height={40} rx={10} fill={c.panel} />
                <Txt x={0} y={10} textAnchor="middle" fontSize={22} fill={c.texto}>Lunes</Txt>
                <Llama x={0} y={-30} s={0.9} t={t + k} op={t >= m('incendio') ? 1 - sm(t, m('incendio') + 0.6 * k, m('incendio') + 0.6 * k + 0.5) : 1} />
              </g>
            ))}
            <Letrero x={600} y={300} texto="Atacar la causa una sola vez" id={ID} tam={30} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
