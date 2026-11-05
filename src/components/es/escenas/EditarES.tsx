import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Pelicula, Estatuilla, Valla, Contrato, Suelo, Cruz, Burbuja, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Editar y poner límites.
 * Toma 1: una tira de película y la tijera que corta fotogramas; dos estatuillas: mejor película y mejor edición, unidas;
 * dos tercios; Jack Dorsey como editor: de muchas ideas quedan una o dos.
 * Toma 2: la semana de Clayton Christensen con sábado y domingo cerrados; el jardín del vecino regado con tu agua, tu pasto
 * que se seca y la valla que se levanta.
 * Toma 3: el contrato social que firman dos personas al inicio del proyecto.
 */

const ID = 'es15', P = 'es-editar';

const Pasto: React.FC<{ x: number; w: number; y: number; seco: number }> = ({ x, w, y, seco }) => (
  <g>
    <rect x={x} y={y} width={w} height={60} rx={10} fill={seco > 0.5 ? '#a3a35a' : '#4ade80'} />
    {Array.from({ length: Math.floor(w / 26) }, (_, k) => <path key={k} d={`M ${x + 12 + k * 26} ${y} l -6 ${-22 * (1 - 0.6 * seco)} M ${x + 12 + k * 26} ${y} l 6 ${-18 * (1 - 0.6 * seco)}`} stroke={seco > 0.5 ? '#84794a' : '#16a34a'} strokeWidth={5} strokeLinecap="round" />)}
  </g>
);

export const EditarES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('editor'), 'Un editor de cine'], [m('oscar'), 'Película y edición'], [m('tercios'), 'Dos de cada tres'], [m('dorsey'), 'El líder como editor'],
    [m('cortar'), 'Cortar, condensar, corregir'], [m('intervenir'), 'Saber no intervenir'], [m('limites'), 'Los límites'], [m('christensen'), 'Clayton Christensen'],
    [m('cloud'), 'El pasto del vecino'], [m('seca'), 'Levantar una valla'], [m('contrato'), 'Un contrato social'],
  ];
  const corte = sm(t, m('editor') + 1.2, m('editor') + 2.4);
  const seca = sm(t, m('seca') - 0.5, m('seca') + 0.8);
  const valla = sm(t, m('seca') + 1.2, m('seca') + 2.6);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Editar y poner límites">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la edición */}
      <Toma t={t} a={0} b={m('limites')} cy={470}>
        {ventana(t, 0, m('dorsey')) > 0.01 && (
          <g opacity={ventana(t, 0, m('dorsey'))}>
            <Pelicula x={120} y={180} n={8} w={120} cortados={[1, 3, 6]} corte={corte} op={e1(t, m('editor'))} />
            {t >= m('editor') && corte < 1 && (
              <g transform={`translate(${lerp(240, 900, corte)} 230)`}>
                <path d="M -40 -50 L 30 10 M -40 50 L 30 -10" stroke="#475569" strokeWidth={10} strokeLinecap="round" />
                <circle cx={-48} cy={-56} r={16} fill="none" stroke={NARANJA} strokeWidth={8} /><circle cx={-48} cy={56} r={16} fill="none" stroke={NARANJA} strokeWidth={8} />
              </g>
            )}
            {t >= m('oscar') && (
              <g opacity={e1(t, m('oscar'))}>
                <Estatuilla x={420} y={720} s={1.5} /><Estatuilla x={780} y={720} s={1.5} />
                <Txt x={420} y={770} textAnchor="middle" fontSize={26} fill={c.texto}>Mejor película</Txt>
                <Txt x={780} y={770} textAnchor="middle" fontSize={26} fill={c.texto}>Mejor edición</Txt>
                <path d="M 470 600 Q 600 540 730 600" stroke={NARANJA} strokeWidth={6} fill="none" strokeDasharray="12 10" />
                <Txt f="a" x={600} y={500} textAnchor="middle" fontSize={26} fill={c.texto}>Desde 1981</Txt>
              </g>
            )}
            {t >= m('tercios') && (
              <g opacity={e1(t, m('tercios'))} transform="translate(1040 560)">
                <circle r={70} fill={c.apagado} />
                <path d={`M 0 0 L 0 -70 A 70 70 0 1 1 ${70 * Math.sin((2 * Math.PI * 2) / 3)} ${-70 * Math.cos((2 * Math.PI * 2) / 3)} Z`} fill={NARANJA} />
                <Txt x={0} y={110} textAnchor="middle" fontSize={26} fill={c.texto}>2 de 3</Txt>
              </g>
            )}
          </g>
        )}
        {t >= m('dorsey') && (
          <g opacity={e1(t, m('dorsey'))}>
            <Persona id={ID} x={600} y={790} s={0.9} cuerpo="#111827" />
            <rect x={420} y={690} width={360} height={26} rx={8} fill="#a16b3f" /><rect x={440} y={716} width={18} height={80} fill="#8b5a2b" /><rect x={742} y={716} width={18} height={80} fill="#8b5a2b" />
            {Array.from({ length: 12 }, (_, k) => {
              const queda = k === 3 || k === 8;
              const u = ((t - m('dorsey')) * 0.3 + k / 12) % 1;
              const x0 = 140 + (k % 6) * 184, y0 = 230 + Math.floor(k / 6) * 110;
              const sel = sm(t, m('mil') + 0.5, m('mil') + 1.8);
              const x = queda ? lerp(x0, 540 + (k === 8 ? 120 : 0), sel) : x0;
              const y = queda ? lerp(y0, 540, sel) : y0 + sel * u * 40;
              return <g key={k} opacity={queda ? 1 : 1 - 0.75 * sel}><rect x={x - 60} y={y - 36} width={120} height={72} rx={14} fill={queda ? NARANJA : [AZUL_M, ROSA, VIOLETA, GRIS][k % 4]} /></g>;
            })}
            {t >= m('cortar') && <Letrero x={600} y={430} texto={t >= m('intervenir') ? 'Y saber no intervenir' : 'Cortar · condensar · corregir'} id={ID} tam={28} />}
          </g>
        )}
      </Toma>

      {/* 2 · Christensen y el pasto del vecino */}
      <Toma t={t} a={m('limites')} b={m('contrato')} cy={480}>
        {ventana(t, m('limites') - 0.1, m('cloud')) > 0.01 && (
          <g opacity={ventana(t, m('limites') - 0.1, m('cloud'))}>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, k) => {
              const cerrado = (k === 5 && t >= m('sabado')) || (k === 6 && t >= m('domingo'));
              return (
                <g key={k}>
                  <rect x={140 + k * 136} y={260} width={116} height={180} rx={16} fill={cerrado ? NARANJA : c.panel} />
                  <Txt x={198 + k * 136} y={320} textAnchor="middle" fontSize={34} fill={cerrado ? '#fff' : c.texto}>{d}</Txt>
                  {cerrado && <Txt x={198 + k * 136} y={400} textAnchor="middle" fontSize={22} fill="#fff">{k === 5 ? 'Familia' : 'Fe'}</Txt>}
                </g>
              );
            })}
            <Persona id={ID} x={300} y={760} s={1} cuerpo={AZUL_M} pelo="#4b3621" />
            {t >= m('sabado') && <Burbuja x={330} y={560} w={300} texto="Lo siento, no" u={sm(t, m('sabado') + 0.8, m('sabado') + 1.4)} c={c} id={ID} tam={30} marca />}
            {t >= m('excepcion') && <Letrero x={820} y={620} texto="Una excepción lleva a muchas" fondo={GRIS} id={ID} tam={26} op={e1(t, m('excepcion'))} />}
          </g>
        )}
        {t >= m('cloud') && (
          <g opacity={e1(t, m('cloud'))}>
            <Pasto x={100} w={460} y={640} seco={seca} />
            <Pasto x={640} w={460} y={640} seco={0} />
            <Persona id={ID} x={330} y={640} s={0.9} cuerpo={NARANJA} />
            <Persona id={ID} x={870} y={640} s={0.9} cuerpo={GRIS} />
            <g transform="translate(480 640)"><rect x={-10} y={-50} width={20} height={50} fill="#64748b" /><circle cx={0} cy={-56} r={12} fill="#64748b" /></g>
            {valla < 0.95 && Array.from({ length: 10 }, (_, k) => { const u = ((t - m('cloud')) * 0.9 + k / 10) % 1; const x = lerp(480, 480 + 380 * (1 - valla), u); return <circle key={k} cx={x} cy={584 - 140 * Math.sin(Math.PI * u)} r={7} fill="#38bdf8" opacity={1 - u * 0.5} />; })}
            <Valla x={600} y={640} n={1} u={valla} alto={170} />
            {valla > 0.01 && <rect x={588} y={640 - 170 * valla} width={24} height={170 * valla} rx={6} fill="#a16b3f" />}
            {t >= m('seca') && <Letrero x={330} y={300} texto="Tu pasto se seca" fondo={GRIS} id={ID} tam={28} op={e1(t, m('seca'))} />}
            {valla > 0.5 && <Letrero x={870} y={300} texto="Cada uno riega su pasto" fondo={VERDE} id={ID} tam={28} op={valla} />}
            {!movil && <Txt f="a" x={600} y={800} textAnchor="middle" fontSize={22} fill={c.tenue}>Metáfora de Henry Cloud</Txt>}
          </g>
        )}
      </Toma>

      {/* 3 · el contrato social */}
      <Toma t={t} a={m('contrato')} b={fin + 1} cy={480}>
        <Suelo y={760} isDark={isDark} x0={120} x1={1080} />
        <Persona id={ID} x={250} y={760} s={1} cuerpo={NARANJA} />
        <Persona id={ID} x={950} y={760} s={1} cuerpo={AZUL_M} />
        <Contrato x={600} y={460} s={1.6} firma={sm(t, m('contrato') + 0.8, m('contrato') + 2.4)} titulo="Contrato social" op={e1(t, m('contrato'))} />
        <Letrero x={600} y={760} texto="Qué queremos lograr · qué nos importa" id={ID} tam={28} op={e1(t, m('contrato') + 1)} />
      </Toma>
    </Lienzo>
  );
};
