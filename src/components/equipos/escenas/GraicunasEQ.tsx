import React from 'react';
import { Lienzo, useEscena, Letrero, Rol, Persona, Cifra, Rotulo, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «La matemática del caos: Graicunas». Un líder en el centro y sus reportes directos en círculo. Las
 * relaciones se dibujan por tipo: simples (líder con cada persona), grupales (arcos que abrazan combinaciones)
 * y cruzadas (todos con todos). El círculo pasa de 3 a 5 y a 10 personas mientras el contador da 18, 100 y
 * 5.210 relaciones; una regla marca el límite humano entre seis y ocho. La trampa: el líder recibe 15 o 20
 * reportes, las líneas se vuelven una maraña y el contador se dispara.
 */

const ID = 'eq09';
const nombres = ['multiplica', 'graicunas', 'reportes', 'tipos', 'simples', 'grupales', 'cruzadas', 'caos', 'tres', 'cinco', 'diez', 'cincuenta', 'seisocho', 'trampa', 'quince', 'imposible', 'pregunta'] as const;
type N = typeof nombres[number];

const R = (n: number) => n * (Math.pow(2, n - 1) + n - 1);
const CX = 560, CY = 470, RAD = 215;

export const GraicunasEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'La matemática del caos'], [m('multiplica'), 'Multiplica relaciones'], [m('graicunas'), 'La fórmula de Graicunas'], [m('tipos'), 'Tres tipos de relaciones'],
    [m('simples'), 'Simples: uno a uno'], [m('grupales'), 'Grupales: combinaciones'], [m('cruzadas'), 'Cruzadas: todos con todos'], [m('caos'), 'Caos estructural'],
    [m('tres'), '3 reportes'], [m('cinco'), '5 reportes'], [m('diez'), '10 reportes'], [m('cincuenta'), 'Más de 50 veces'], [m('seisocho'), 'Límite humano: 6 a 8'],
    [m('trampa'), 'La trampa del aplanamiento'], [m('quince'), '15 o 20 reportes'], [m('imposible'), 'Imposible de sostener'],
  ];

  /* número de reportes en cada momento y transición entre valores */
  const pasos: [number, number][] = [[-1, 3], [m('cinco'), 5], [m('diez'), 10], [m('quince'), 15], [m('quince') + 2.2, 20]];
  let i = 0; pasos.forEach(([tt], k) => { if (t >= tt) i = k; });
  const nAct = pasos[i][1], nAnt = i > 0 ? pasos[i - 1][1] : 3;
  const tr = i > 0 ? sm(t, pasos[i][0], pasos[i][0] + 1) : 1;
  const ang = (k: number, n: number) => -Math.PI / 2 + (k * 2 * Math.PI) / n;
  const pos = (k: number): [number, number] => {
    const a = lerp(ang(k, nAnt), ang(k, nAct), tr);
    const r = nAct > 10 ? lerp(RAD, RAD + 20, tr) : RAD;
    return [CX + r * Math.cos(a), CY + r * Math.sin(a) * 0.92];
  };
  const visibles = Array.from({ length: 20 }, (_, k) => (k < nAnt ? 1 : k < nAct ? tr : 0));
  const caos = sm(t, m('caos'), m('caos') + 1) * (1 - 0.5 * sm(t, m('tres'), m('tres') + 1)) + sm(t, m('trampa'), m('trampa') + 1);
  const temblor = (k: number) => (caos > 0.2 ? 3 * caos * Math.sin(t * 17 + k * 2.3) : 0);

  const simples = e1(t, m('simples'));
  const grupales = e1(t, m('grupales'));
  const cruzadas = e1(t, m('cruzadas'));
  const contador = t >= m('tres');
  const valorAnt = R(nAnt), valorAct = R(nAct);
  const valor = Math.round(lerp(valorAnt, valorAct, ac(t, pasos[i][0], pasos[i][0] + 1.4)));
  const roto = sm(t, m('imposible'), m('imposible') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La matemática del caos">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* fórmula */}
      {t >= m('graicunas') && <g opacity={e1(t, m('graicunas'))}>
        <rect x={60} y={118} width={420} height={78} rx={22} fill={c.panel} style={sombra(c.sombra, 3, 10)} />
        <Txt x={82} y={170} fontSize={38} fill={c.texto} peso={800}>R = n (2<tspan dy={-14} fontSize={24}>n−1</tspan><tspan dy={14}> + n − 1)</tspan></Txt>
      </g>}
      {t >= m('reportes') && t < m('tres') && <g opacity={e1(t, m('reportes')) * (1 - ac(t, m('tipos') - 0.4, m('tipos')))}><Letrero x={270} y={240} texto="n = reportes directos" fondo={PIZARRA} id={ID} tam={24} /></g>}

      {/* contador */}
      {contador && <g opacity={e1(t, m('tres'))}>
        <Cifra x={1130} y={180} valor={valor} u={1} tam={valor > 99999 ? 56 : 76} color={caos > 1 ? ROJO_M : c.texto} ancla="end" miles />
        <Txt f="a" x={1130} y={220} textAnchor="end" fontSize={26} fill={c.tenue}>relaciones</Txt>
      </g>}
      {t >= m('cincuenta') && t < m('trampa') && <g opacity={e1(t, m('cincuenta')) * (1 - ac(t, m('trampa') - 0.4, m('trampa')))}><Letrero x={1010} y={290} texto="× 52" fondo={ROJO_M} id={ID} tam={34} /></g>}

      {/* relaciones */}
      <g opacity={e1(t, m('multiplica'))}>
        {cruzadas > 0 && Array.from({ length: 20 }, (_, a) => Array.from({ length: 20 }, (_, b) => {
          if (b <= a || visibles[a] <= 0 || visibles[b] <= 0) return null;
          const [x1, y1] = pos(a), [x2, y2] = pos(b);
          return <line key={`${a}-${b}`} x1={x1 + temblor(a)} y1={y1 - 30} x2={x2 + temblor(b)} y2={y2 - 30} stroke={caos > 1 ? ROJO_M : AZUL_M} strokeWidth={nAct > 10 ? 1.4 : 2.5} opacity={cruzadas * Math.min(visibles[a], visibles[b]) * (nAct > 10 ? 0.35 : 0.5)} />;
        }))}
        {grupales > 0 && Array.from({ length: 20 }, (_, k) => {
          if (visibles[k] <= 0 || visibles[(k + 1) % Math.max(nAct, 1)] <= 0 || k >= nAct) return null;
          const [x1, y1] = pos(k), [x2, y2] = pos((k + 1) % nAct);
          const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
          const ox = (mx - CX) * 0.32, oy = (my - CY) * 0.32;
          return <path key={k} d={`M ${x1} ${y1 - 30} Q ${mx + ox} ${my - 30 + oy} ${x2} ${y2 - 30}`} stroke={VIOLETA} strokeWidth={7} fill="none" strokeLinecap="round" opacity={grupales * 0.7 * visibles[k]} />;
        })}
        {simples > 0 && Array.from({ length: 20 }, (_, k) => visibles[k] > 0 && (() => { const [x, y] = pos(k); return <line key={k} x1={CX} y1={CY - 40} x2={x + temblor(k)} y2={y - 30} stroke={NARANJA} strokeWidth={5} opacity={simples * visibles[k] * 0.9} />; })())}
      </g>

      {/* personas */}
      {t >= m('multiplica') && Array.from({ length: 20 }, (_, k) => visibles[k] > 0 && (() => { const [x, y] = pos(k); return <g key={k} opacity={visibles[k] * e1(t, m('multiplica') + k * 0.1)}><Persona id={ID} x={x + temblor(k)} y={y + 6} s={nAct > 10 ? 0.22 : 0.3} cuerpo={[AZUL_M, VERDE, VIOLETA, ROSA, AMBAR][k % 5]} /></g>; })())}
      <g opacity={e1(t, m('multiplica'))} transform={`translate(${3 * roto * Math.sin(t * 20)} ${10 * roto})`}>
        <Rol id={ID} rol="mg" x={CX} y={CY + 20} s={0.5} t={t} sigla={false} herramienta={false} />
        {roto > 0.1 && [0, 1, 2].map((k) => { const ph = (t * 1.1 + k / 3) % 1; return <path key={k} d={`M ${CX - 30 + k * 30} ${CY - 70 + ph * 30} q -6 10 0 14 q 6 -4 0 -14 Z`} fill="#7dd3fc" opacity={1 - ph} />; })}
      </g>

      {/* tipos de relación */}
      {t >= m('simples') && t < m('tres') && [['simples', 'Simples', NARANJA], ['grupales', 'Grupales', VIOLETA], ['cruzadas', 'Cruzadas', AZUL_M]].map(([n, txt, col], k) => t >= M(n as N) && (
        <g key={txt} opacity={e1(t, M(n as N)) * (1 - ac(t, m('tres') - 0.4, m('tres')))}><Letrero x={1000} y={330 + k * 90} texto={txt} fondo={col} id={ID} /></g>
      ))}

      {/* regla del límite humano */}
      {t >= m('seisocho') && (() => { const x = (n: number) => 120 + (n - 1) * 50; return (
        <g opacity={e1(t, m('seisocho'))}>
          <rect x={x(1)} y={780} width={x(20) - x(1)} height={14} rx={7} fill={c.apagado} />
          <rect x={x(6) - 12} y={772} width={x(8) - x(6) + 24} height={30} rx={15} fill={VERDE} />
          {[1, 5, 10, 15, 20].map((n) => <Txt key={n} f="a" x={x(n)} y={830} textAnchor="middle" fontSize={22} fill={c.tenue}>{n}</Txt>)}
          <circle cx={x(Math.min(20, nAct))} cy={787} r={14} fill={nAct > 8 ? ROJO_M : NARANJA} />
          <Txt f="a" x={x(7)} y={758} textAnchor="middle" fontSize={24} fill={VERDE}>límite</Txt>
        </g>
      ); })()}
      {t >= m('imposible') && <g opacity={roto}><Letrero x={1000} y={680} texto="Imposible" fondo={ROJO_M} id={ID} /></g>}
    </Lienzo>
  );
};
