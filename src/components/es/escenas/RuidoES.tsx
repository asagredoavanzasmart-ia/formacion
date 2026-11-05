import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Libro, Cifra, Suelo, Visto, Cruz, Caja, Moneda3D, Calendario, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Casi todo es ruido.
 * Toma 1: un montón de piedras grises y unas pocas pepitas de oro (Pareto: 20 % de las causas, 80 % del efecto); el
 * manual de Juran (1951); una cinta de fábrica japonesa: se quitan las pocas fallas vitales y todo sale bien.
 * Toma 2 (P&G, 1996): la estantería con 31 champús y 52 pastas que se reduce a pocas variantes.
 * Toma 3 (Buffett): pocas semillas que crecen durante años; la moneda que vuelve: el tiempo invertido se paga solo.
 */

const ID = 'es04', P = 'es-ruido';

const Piedra: React.FC<{ x: number; y: number; r: number; oro: boolean; brillo?: number }> = ({ x, y, r, oro, brillo = 0 }) => (
  <g>
    <path d={`M ${x - r} ${y} Q ${x - r} ${y - r * 1.1} ${x} ${y - r * 1.2} Q ${x + r * 1.1} ${y - r} ${x + r} ${y} Z`} fill={oro ? '#f59e0b' : '#94a3b8'} />
    <path d={`M ${x} ${y - r * 1.2} Q ${x + r * 1.1} ${y - r} ${x + r} ${y} L ${x} ${y} Z`} fill="#000" opacity={0.12} />
    {oro && brillo > 0 && <circle cx={x - r * 0.3} cy={y - r * 0.7} r={r * 0.25} fill="#fde68a" opacity={brillo} />}
  </g>
);

const Botella: React.FC<{ x: number; y: number; color: string; tubo?: boolean }> = ({ x, y, color, tubo = false }) => tubo
  ? <g><rect x={x - 8} y={y - 46} width={16} height={46} rx={4} fill={color} /><rect x={x - 5} y={y - 54} width={10} height={10} rx={2} fill="#e5e7eb" /></g>
  : <g><rect x={x - 11} y={y - 52} width={22} height={52} rx={7} fill={color} /><rect x={x - 6} y={y - 62} width={12} height={12} rx={3} fill="#e5e7eb" /></g>;

export const RuidoES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('valor'), 'No todo vale lo mismo'], [m('ochenta'), 'Regla del 80/20'], [m('juran'), 'Joseph Juran, 1951'], [m('vitales'), 'Las pocas cosas vitales'],
    [m('japon'), 'Hecho en Japón'], [m('jager'), 'Procter & Gamble, 1996'], [m('retiro'), 'Menos variantes'], [m('buffett'), 'Warren Buffett'], [m('paga'), 'Se paga solo'],
  ];
  const oro = sm(t, m('pareto'), m('pareto') + 1);
  const arreglo = sm(t, m('vitales') + 0.5, m('vitales') + 1.5);
  const recorte = sm(t, m('retiro'), m('retiro') + 1.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Casi todo es ruido">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1a · el montón de piedras y la regla 80/20 */}
      <Toma t={t} a={0} b={m('juran')} cy={480}>
        <Suelo y={640} isDark={isDark} x0={100} x1={700} op={e1(t, m('valor'))} />
        {Array.from({ length: 30 }, (_, k) => {
          const vital = k % 5 === 0;
          const fila = Math.floor(k / 10);
          return <g key={k} opacity={e1(t, m('valor') + 0.03 * k)} transform={`translate(0 ${vital ? -14 * oro : 0})`}><Piedra x={150 + (k % 10) * 54 + fila * 18} y={640 - fila * 44} r={vital ? 28 : 22} oro={vital && oro > 0.2} brillo={0.5 + 0.5 * Math.sin(t * 4 + k)} /></g>;
        })}
        {t >= m('ochenta') && (
          <g opacity={e1(t, m('ochenta'))}>
            {[['20 % de las causas', 0.2, '#f59e0b'], ['80 % de los efectos', 0.8, NARANJA]].map(([n, v, col], k) => (
              <g key={k} transform={`translate(780 ${300 + k * 200})`}>
                <rect x={0} y={0} width={340} height={70} rx={14} fill={c.apagado} />
                <rect x={0} y={0} width={340 * (v as number) * sm(t, m('ochenta') + 0.3 * k, m('ochenta') + 0.3 * k + 1)} height={70} rx={14} fill={col as string} />
                <Txt x={0} y={-16} fontSize={28} fill={c.texto}>{n as string}</Txt>
              </g>
            ))}
          </g>
        )}
        {!movil && t >= m('pareto') && <Txt f="a" x={400} y={720} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={e1(t, m('pareto'))}>Vilfredo Pareto</Txt>}
      </Toma>

      {/* 1b · Juran y la fábrica japonesa */}
      <Toma t={t} a={m('juran')} b={m('jager')} cy={480}>
        <Libro x={230} y={640} color={AZUL_M} titulo="Calidad" autor="Juran, 1951" s={0.85} op={e1(t, m('juran'))} c={c} />
        {t >= m('vitales') && (
          <g opacity={e1(t, m('vitales'))}>
            <rect x={420} y={560} width={720} height={40} rx={20} fill="#475569" />
            {Array.from({ length: 9 }, (_, k) => <circle key={k} cx={440 + k * 85} cy={600} r={14} fill="#334155" />)}
            {Array.from({ length: 6 }, (_, k) => {
              const x = 470 + ((k * 120 + (t - m('vitales')) * 60) % 680);
              const malo = k % 2 === 0 && arreglo < 1;
              return <g key={k}><Caja x={x} y={560} w={84} h={70} />{t >= m('japon') && (malo ? <Cruz x={x} y={450} r={20} /> : <Visto x={x} y={450} r={20} />)}</g>;
            })}
            {[0, 1, 2].map((k) => <g key={k} opacity={1 - arreglo}><circle cx={560 + k * 200} cy={360} r={34} fill={ROJO_M} /><Txt x={560 + k * 200} y={372} textAnchor="middle" fontSize={34} fill="#fff">!</Txt></g>)}
          </g>
        )}
        {t >= m('hecho') && <Letrero x={780} y={760} texto="«Hecho en Japón» cambió de significado" fondo={VERDE} id={ID} tam={28} op={e1(t, m('hecho'))} />}
      </Toma>

      {/* 2 · la estantería de P&G */}
      <Toma t={t} a={m('jager')} b={m('buffett')} cy={470}>
        {[0, 1].map((f) => (
          <g key={f} opacity={e1(t, m(f ? 'cincuenta' : 'treinta'))}>
            <rect x={140} y={360 + f * 220} width={920} height={20} rx={6} fill="#a16b3f" />
            {Array.from({ length: f ? 52 : 31 }, (_, k) => {
              const n = f ? 52 : 31;
              const queda = k % (f ? 13 : 8) === 0;
              const op = queda ? 1 : 1 - recorte;
              return op > 0.02 && <g key={k} opacity={op} transform={`translate(${queda ? lerp(0, 0, recorte) : 0} ${(1 - op) * 30})`}><Botella x={170 + k * (860 / n)} y={360 + f * 220} color={['#2f7bf6', '#0ea5e9', '#7c3aed', '#14b8a6'][k % 4]} tubo={!!f} /></g>;
            })}
            <Cifra x={1110} y={330 + f * 220} valor={f ? 52 : 31} u={sm(t, m(f ? 'cincuenta' : 'treinta'), m(f ? 'cincuenta' : 'treinta') + 1)} tam={56} color={f ? ROSA : AZUL_M} ancla="end" />
            <Txt x={140} y={410 + f * 220} fontSize={28} fill={c.texto}>{f ? 'Pasta Crest' : 'Champú Head & Shoulders'}</Txt>
          </g>
        ))}
        <Txt f="a" x={600} y={250} textAnchor="middle" fontSize={30} fill={c.texto} opacity={e1(t, m('jager'))}>Durk Jager en Business Week</Txt>
        {t >= m('retiro') && <Letrero x={600} y={760} texto="Menos variantes, menos costos y menos confusión" fondo={VERDE} id={ID} tam={26} op={e1(t, m('retiro') + 0.6)} />}
      </Toma>

      {/* 3 · Buffett: pocas apuestas, mucho tiempo */}
      <Toma t={t} a={m('buffett')} b={fin + 1} cy={480}>
        <Suelo y={680} isDark={isDark} x0={160} x1={1040} op={e1(t, m('buffett'))} />
        {[0, 1, 2].map((k) => {
          const g = sm(t, m('letargo'), m('letargo') + 3);
          const x = 360 + k * 240;
          return (
            <g key={k} opacity={e1(t, m('buffett') + 0.2 * k)}>
              <rect x={x - 10} y={680 - 60 - 160 * g} width={20} height={60 + 160 * g} rx={8} fill="#92400e" />
              <circle cx={x} cy={680 - 70 - 170 * g} r={30 + 70 * g} fill={VERDE} />
              <circle cx={x - 30 * g} cy={680 - 40 - 150 * g} r={20 + 40 * g} fill="#16a34a" />
            </g>
          );
        })}
        {t >= m('letargo') && <g opacity={e1(t, m('letargo'))}><Calendario x={1040} y={330} s={0.9} marcados={Math.min(12, Math.floor((t - m('letargo')) * 3))} /><Txt x={1040} y={440} textAnchor="middle" fontSize={26} fill={c.texto}>Años</Txt></g>}
        {t >= m('paga') && [0, 1, 2].map((k) => <Moneda3D key={k} x={360 + k * 240} y={lerp(380, 300, sm(t, m('paga') + 0.2 * k, m('paga') + 0.2 * k + 0.8))} r={26} op={e1(t, m('paga') + 0.2 * k)} />)}
        <Letrero x={600} y={780} texto={t >= m('paga') ? 'Encontrar lo vital se paga solo' : 'Pocas apuestas, mantenidas mucho tiempo'} id={ID} tam={28} op={e1(t, m('letargo'))} />
      </Toma>
    </Lienzo>
  );
};
