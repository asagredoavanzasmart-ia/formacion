import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Cruz, Visto, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El embudo en la sombra.
 * Toma 1: cuatro embudos que tragan dinero (485.927 dólares en un mes); de cada uno caen personas que no compran y
 * se van a una ventana nueva del navegador donde escriben el nombre de la marca. Detrás de los embudos aparece su
 * sombra: el flujo que nadie medía, con el contador de 251.680 búsquedas en doce meses.
 * Toma 2: quien busca llega a tres puertas: una página cualquiera de la escalera, el sitio de un competidor (ambas se
 * tachan) y el centro de embudo, una casa con cuatro cuartos que ordena el recorrido.
 */

const ID = 'br21', P = 'br-sombra';

export const SombraBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('medido'), 'Algo que no medía'], [m('nocompraba'), 'No compran: buscan'], [m('sombra'), 'El embudo en la sombra'],
    [m('azar'), 'Dónde llegan'], [m('centro'), 'Un centro de embudo'],
  ];
  const sombraU = sm(t, m('sombra'), m('sombra') + 1.2);
  const escribe = 'Brunson'.slice(0, Math.max(0, Math.floor((t - m('buscaba')) * 6)));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El embudo en la sombra">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Los embudos y su sombra */}
      <Toma t={t} a={0} b={m('azar')} cy={470}>
        {[0, 1, 2, 3].map((k) => {
          const x = 130 + k * 150;
          return (
            <g key={k} opacity={e1(t, m('medido') + k * 0.2)}>
              <path d={`M ${x - 55 + 26 * sombraU} ${330 + 20 * sombraU} H ${x + 55 + 26 * sombraU} L ${x + 14 + 26 * sombraU} ${430 + 20 * sombraU} V ${490 + 20 * sombraU} H ${x - 14 + 26 * sombraU} V ${430 + 20 * sombraU} Z`} fill="#0f172a" opacity={0.35 * sombraU} />
              <path d={`M ${x - 55} 330 H ${x + 55} L ${x + 14} 430 V 490 H ${x - 14} V 430 Z`} fill={[NARANJA, ROSA, VIOLETA, AZUL_M][k]} />
              {t >= m('nocompraba') && [0, 1].map((j) => {
                const ph = ((t - m('nocompraba')) * 0.45 + j / 2 + k * 0.13) % 1;
                return <g key={j} opacity={Math.sin(Math.PI * ph)}><Persona id={ID} x={lerp(x, 860, ph)} y={lerp(560, 600, ph)} s={0.3} cuerpo={GRIS} /></g>;
              })}
            </g>
          );
        })}
        {t >= m('gasto') && <Cifra x={355} y={260} valor={485927} u={sm(t, m('gasto'), m('gasto') + 1.4)} pre="$" tam={50} color={ROJO_M} miles />}
        {t >= m('gasto') && <Txt x={355} y={680} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={e1(t, m('gasto'))}>en anuncios, en un mes</Txt>}
        {t >= m('buscaba') - 0.1 && (
          <g opacity={e1(t, m('buscaba'))}>
            <rect x={760} y={260} width={380} height={260} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <rect x={760} y={260} width={380} height={44} rx={22} fill={c.panel2} />
            {[0, 1, 2].map((k) => <circle key={k} cx={790 + k * 24} cy={282} r={7} fill={[ROJO_M, AMBAR, VERDE][k]} />)}
            <rect x={790} y={340} width={320} height={56} rx={28} fill={c.panel2} />
            <circle cx={824} cy={366} r={11} fill="none" stroke={c.tenue} strokeWidth={4} /><path d="M 832 374 l 10 10" stroke={c.tenue} strokeWidth={4} strokeLinecap="round" />
            <Txt x={850} y={378} fontSize={28} fill={c.texto} peso={800}>{escribe}{Math.floor(t * 2) % 2 ? '|' : ''}</Txt>
          </g>
        )}
        {t >= m('sombra') && <Letrero x={355} y={760} texto="El embudo en la sombra" fondo="#334155" id={ID} tam={28} op={sombraU} />}
        {t >= m('doce') && (
          <g opacity={e1(t, m('doce'))}>
            <Cifra x={950} y={460} valor={251680} u={sm(t, m('doce'), m('doce') + 1.4)} tam={46} color={AZUL_M} miles />
            <Txt x={950} y={500} textAnchor="middle" fontSize={24} fill={c.tenue}>búsquedas en 12 meses</Txt>
          </g>
        )}
      </Toma>

      {/* 2 · Las tres puertas */}
      <Toma t={t} a={m('azar')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('azar'))}>
          <Persona id={ID} x={160} y={560} s={0.8} cuerpo={AZUL_M} />
          <Txt x={160} y={660} textAnchor="middle" fontSize={26} fill={c.tenue}>Quien te busca</Txt>
        </g>
        {([['azar', 'Página al azar', GRIS, 250], ['competidor', 'Un competidor', ROJO_M, 440]] as const).map(([n, txt, col, y]) => t >= m(n) - 0.1 && (
          <g key={n} opacity={t >= m('centro') ? 0.35 : e1(t, m(n))}>
            <path d={`M 250 ${480} Q 330 ${y + 40} 420 ${y + 40}`} stroke={col} strokeWidth={6} fill="none" strokeDasharray="12 10" />
            <rect x={430} y={y} width={240} height={90} rx={18} fill={col} />
            <Txt x={550} y={y + 56} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>{movil ? (n === 'azar' ? 'Al azar' : 'Rival') : txt}</Txt>
            <Cruz x={700} y={y + 45} r={24} op={e1(t, m(n) + 0.5)} />
          </g>
        ))}
        {t >= m('competidor') + 0.6 && <Letrero x={550} y={620} texto="Ventas ya pagadas que se pierden" fondo={ROJO_M} id={ID} tam={24} op={ventana(t, m('competidor') + 0.6, m('centro'))} />}
        {t >= m('centro') - 0.1 && (
          <g opacity={e1(t, m('centro'))}>
            <path d="M 250 520 Q 500 760 760 600" stroke={VERDE} strokeWidth={8} fill="none" strokeDasharray={`${700 * sm(t, m('centro'), m('centro') + 1)} 900`} />
            <path d="M 760 330 L 950 220 L 1140 330 Z" fill={NARANJA} />
            <rect x={780} y={330} width={340} height={340} rx={14} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            {(['Quién eres', 'Valores', 'Contenidos', 'Ofertas'] as const).map((txt, k) => {
              const on = t >= m('reune') + k * 0.4;
              return (
                <g key={txt} opacity={on ? e1(t, m('reune') + k * 0.4) : 0.15}>
                  <rect x={800 + (k % 2) * 160} y={350 + Math.floor(k / 2) * 160} width={140} height={140} rx={14} fill={[AZUL_M, VIOLETA, ROSA, VERDE][k]} />
                  <Txt x={870 + (k % 2) * 160} y={430 + Math.floor(k / 2) * 160} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>{movil ? '' : txt}</Txt>
                </g>
              );
            })}
            <Letrero x={950} y={740} texto="Centro de embudo" fondo={NARANJA} id={ID} tam={28} />
            {t >= m('ordena') && <Sello x={420} y={780} texto={movil ? 'Ordena la ruta' : 'Ordena el recorrido'} u={sm(t, m('ordena'), m('ordena') + 0.6)} color={VERDE} tam={26} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
