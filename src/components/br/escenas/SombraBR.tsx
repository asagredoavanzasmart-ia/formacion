import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, Cruz, Visto, Sello, Navegador, Conector, Pastilla, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El embudo en la sombra.
 * Toma 1: cuatro embudos que cuestan 485.927 dólares en un mes; de ellos salen personas que no compran y caminan por
 * un conector hasta un navegador donde escriben el nombre de la marca. Detrás de los embudos crece su sombra, el flujo
 * que nadie medía, y el buscador cuenta 251.680 búsquedas en doce meses.
 * Toma 2: quien busca llega a una bifurcación: una página cualquiera de la escalera y la de un competidor (tachadas) o
 * el centro de embudo, un sitio con cuatro secciones que ordena el recorrido.
 */

const ID = 'br21', P = 'br-sombra';

export const SombraBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('medido'), 'Algo que no medía'], [m('nocompraba'), 'No compran: buscan'], [m('sombra'), 'El embudo en la sombra'],
    [m('azar'), 'Dónde llegan'], [m('centro'), 'Un centro de embudo'],
  ];
  const sombraU = sm(t, m('sombra'), m('sombra') + 1.4);
  const escribe = 'Brunson'.slice(0, Math.max(0, Math.floor((t - m('buscaba')) * 6)));
  const ruta = sm(t, m('centro'), m('centro') + 2);
  const SEC: [string, string, string][] = [['Quién eres', 'Quién', AZUL_M], ['Qué defiendes', 'Valores', VIOLETA], ['Contenidos', 'Temas', ROSA], ['Ofertas', 'Ofertas', VERDE]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El embudo en la sombra">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Los embudos y su sombra */}
      <Toma t={t} a={0} b={m('azar')} cy={470}>
        {[0, 1, 2, 3].map((k) => {
          const x = 130 + k * 130;
          const d = 30 * sombraU;
          return (
            <g key={k} opacity={E('medido', 0.5, k * 0.2)}>
              <path d={`M ${x - 55 + d} ${300 + d} H ${x + 55 + d} L ${x + 14 + d} ${400 + d} V ${470 + d} H ${x - 14 + d} V ${400 + d} Z`} fill="#0f172a" opacity={0.3 * sombraU} />
              <path d={`M ${x - 55} 300 H ${x + 55} L ${x + 14} 400 V 470 H ${x - 14} V 400 Z`} fill={[NARANJA, ROSA, VIOLETA, AZUL_M][k]} />
            </g>
          );
        })}
        <Cifra x={325} y={225} valor={485927} u={sm(t, m('gasto'), m('gasto') + 1.4)} pre="$" tam={44} color={ROJO_M} miles />
        <Txt x={325} y={268} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800} opacity={E("gasto")}>{movil ? 'en un mes' : 'en anuncios, en un mes'}</Txt>
        {t >= m('nocompraba') && Array.from({ length: 5 }, (_, k) => {
          const p = ((t - m('nocompraba')) * 0.3 + k / 5) % 1;
          const x = lerp(160 + (k % 4) * 130, 700, p), y = lerp(500, 620, Math.sin(Math.PI * p * 0.5));
          return <g key={k} opacity={Math.sin(Math.PI * p)}><Persona id={ID} x={x} y={y + 80} s={0.34} cuerpo={GRIS} /></g>;
        })}
        <Conector x1={520} y1={700} x2={760} y2={570} u={E('nocompraba')} t={t} color={GRIS} curva={0.15} puntos={3} />
        <g opacity={E('buscaba', 0.6, -0.4)}>
          <Navegador x={720} y={230} w={420} h={340} c={c} texto={escribe + (Math.floor(t * 2) % 2 ? '|' : '')}>
            {[0, 1, 2].map((k) => <g key={k} opacity={sm(t, m('buscaba') + 1.2 + k * 0.3, m('buscaba') + 1.6 + k * 0.3)}><rect x={30} y={76 + k * 70} width={360} height={52} rx={12} fill={c.panel2} /><rect x={50} y={90 + k * 70} width={200} height={10} rx={5} fill={AZUL_M} opacity={0.6} /><rect x={50} y={108 + k * 70} width={140} height={8} rx={4} fill={c.apagado} /></g>)}
            {t >= m('doce') && <Cifra x={210} y={315} valor={251680} u={sm(t, m('doce'), m('doce') + 1.4)} tam={36} color={AZUL_M} miles />}
          </Navegador>
          <Txt x={930} y={610} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800} opacity={E('doce')}>{movil ? 'búsquedas en 12 meses' : 'búsquedas de su nombre en 12 meses'}</Txt>
        </g>
        <Pastilla x={325} y={800} texto={movil ? 'En la sombra' : 'El embudo en la sombra'} fondo="#334155" tam={26} op={sombraU} />
      </Toma>

      {/* 2 · Las tres puertas */}
      <Toma t={t} a={m('azar')} b={fin + 1} cy={470}>
        <g opacity={E('azar', 0.6, -0.4)}>
          <Persona id={ID} x={140} y={560} s={0.85} cuerpo={AZUL_M} />
          <rect x={60} y={600} width={180} height={44} rx={22} fill={c.panel} style={sombra(0.12, 3, 6)} />
          <Txt x={150} y={630} textAnchor="middle" fontSize={22} fill={c.texto} peso={800}>Brunson</Txt>
        </g>
        {([['azar', 'Página al azar', 'Al azar', GRIS, 240], ['competidor', 'Un competidor', 'Rival', ROJO_M, 430]] as const).map(([n, txt, corto, col, y]) => (
          <g key={n} opacity={t >= m('centro') ? 0.35 : E(n)}>
            <Conector x1={240} y1={520} x2={420} y2={y + 40} u={E(n)} t={t} color={col} puntos={2} curva={-0.1} />
            <rect x={420} y={y} width={240} height={90} rx={16} fill={c.panel} style={sombra(0.12, 4, 8)} />
            <rect x={420} y={y} width={240} height={22} rx={10} fill={col} />
            <Txt x={540} y={y + 66} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>{movil ? corto : txt}</Txt>
            <Cruz x={690} y={y + 45} r={24} op={sm(t, m(n) + 0.5, m(n) + 0.9)} />
          </g>
        ))}
        {t >= m('competidor') + 0.6 && <Pastilla x={540} y={600} texto={movil ? 'Ventas perdidas' : 'Ventas ya pagadas que se pierden'} fondo={ROJO_M} tam={22} op={sm(t, m('competidor') + 0.6, m('competidor') + 1) * (1 - sm(t, m('centro') - 0.4, m('centro')))} />}
        <Conector x1={240} y1={560} x2={760} y2={640} u={E('centro')} t={t} color={VERDE} curva={0.2} puntos={5} />
        {ruta > 0 && <circle cx={lerp(240, 760, ruta)} cy={lerp(560, 640, ruta) + 80 * Math.sin(Math.PI * ruta) * 0.5} r={12} fill={VERDE} />}
        <g opacity={E('centro', 0.6, -0.3)}>
          <Navegador x={760} y={230} w={380} h={460} c={c} texto={movil ? 'tu sitio' : 'tuempresa.com'}>
            {SEC.map(([txt, corto, col], k) => {
              const u = sm(t, m('reune') + k * 0.4, m('reune') + k * 0.4 + 0.5);
              return <g key={txt} opacity={0.2 + 0.8 * u}><rect x={24 + (k % 2) * 172} y={76 + Math.floor(k / 2) * 180} width={160} height={160} rx={16} fill={col} /><Txt x={104 + (k % 2) * 172} y={164 + Math.floor(k / 2) * 180} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>{movil ? corto : txt}</Txt></g>;
            })}
          </Navegador>
          <Pastilla x={950} y={740} texto="Centro de embudo" fondo={NARANJA} tam={26} />
        </g>
        {t >= m('ordena') && <Sello x={420} y={760} texto={movil ? 'Ordena la ruta' : 'Ordena el recorrido'} u={sm(t, m('ordena'), m('ordena') + 0.6)} color={VERDE} tam={26} rot={-4} />}
      </Toma>
    </Lienzo>
  );
};
