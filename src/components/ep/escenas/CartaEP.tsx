import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Contrato, Anillos, Cifra, Suelo, Flujo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * La carta de intención y el matrimonio católico.
 * 1 · La carta sube como un grial; una pelea desigual (balanza entre quien cerró decenas y quien negocia la primera vez)
 *     que se equilibra al sumar a alguien que ya lo vivió.
 * 2 · La cascada de liquidación: una venta de 100 millones cae primero al balde de los inversionistas (75) y lo que sobra
 *     se reparte; a las acciones comunes llegan unos 10 en lugar de 40.
 * 3 · La consolidación (acciones que vuelven al fondo), los anillos del matrimonio católico y la lupa de la debida diligencia.
 */

const ID = 'ep14', P = 'ep-carta';

export const CartaEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('grial'), 'Solo un hito'], [m('desigual'), 'Una pelea desigual'], [m('valoracion'), 'Valoración y preferencia'],
    [m('cien'), 'La cascada de una venta'], [m('consolidacion'), 'Consolidación'], [m('matrimonio'), 'Un matrimonio católico'],
  ];
  const ayuda = sm(t, m('ayuda'), m('ayuda') + 1.2);
  const ang = 14 * e1(t, m('desigual')) * (1 - ayuda);
  /* cascada */
  const u = sm(t, m('cien'), m('setenta') + 0.8);
  const inv = 75 * sm(t, m('setenta'), m('setenta') + 1.2);
  const com = 10 * sm(t, m('diez'), m('diez') + 1.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La carta de intención y el matrimonio católico">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la carta y la pelea desigual */}
      <Toma t={t} a={0} b={m('valoracion')} cy={470}>
        {t < m('desigual') ? <g>
          <circle cx={600} cy={420} r={170} fill={`url(#${ID}-halo)`} />
          <Contrato x={600} y={430 - 20 * Math.sin(t * 2)} s={1.3} titulo="Carta de intención" />
          {t >= m('grial') && <Letrero x={600} y={720} texto="Parece el santo grial: es un hito" fondo={GRIS} id={ID} op={e1(t, m('grial'))} tam={26} />}
        </g> : <g>
          <g transform="translate(600 300)">
            <path d="M -24 380 L 0 0 L 24 380 Z" fill="#64748b" />
            <g transform={`rotate(${-ang})`}>
              <rect x={-320} y={-10} width={640} height={20} rx={10} fill="#334155" />
              {[-280, 280].map((x) => <g key={x}><line x1={x} y1={0} x2={x} y2={110} stroke="#94a3b8" strokeWidth={4} /><path d={`M ${x - 110} 110 H ${x + 110} Q ${x + 100} 150 ${x} 150 Q ${x - 100} 150 ${x - 110} 110 Z`} fill="#94a3b8" /></g>)}
              <g transform={`translate(-280 0) rotate(${ang})`}>{[0, 1, 2, 3].map((k) => <Contrato key={k} x={-50 + k * 32} y={60 - k * 6} s={0.3} />)}</g>
              <g transform={`translate(280 0) rotate(${ang})`}><Contrato x={0} y={60} s={0.3} />{ayuda > 0.05 && <Persona id={ID} x={60} y={108} s={0.38} cuerpo={VERDE} />}</g>
            </g>
          </g>
          <Letrero x={320} y={580} texto="Cerró decenas" fondo={AZUL_M} id={ID} tam={26} />
          <Letrero x={880} y={580} texto="Tu primera vez" fondo={NARANJA} id={ID} tam={26} />
          {t >= m('ayuda') && <Letrero x={880} y={660} texto="+ alguien que ya lo vivió" fondo={VERDE} id={ID} op={e1(t, m('ayuda'))} tam={24} />}
        </g>}
      </Toma>

      {/* 2 · la cascada */}
      <Toma t={t} a={m('valoracion')} b={m('consolidacion')} cy={470}>
        {t < m('cien') ? <g>
          <Letrero x={360} y={360} texto="Valoración: cuánto vale lo hecho" fondo={AZUL_M} id={ID} op={e1(t, m('valoracion'))} tam={26} />
          {t >= m('preferencia') && <Letrero x={820} y={480} texto="Preferencia: quién cobra primero" fondo={ROSA} id={ID} op={e1(t, m('preferencia'))} tam={26} />}
          {t >= m('rondas') && ['5', '20', '50'].map((r, k) => <g key={r} opacity={e1(t, m('rondas') + 0.4 * k)}><rect x={340 + k * 190} y={600} width={150} height={80} rx={16} fill={VIOLETA} /><Txt x={415 + k * 190} y={652} textAnchor="middle" fontSize={34} fill="#fff">{r}</Txt></g>)}
          {t >= m('rondas') && <Txt f="a" x={600} y={720} textAnchor="middle" fontSize={24} fill={c.tenue}>tres rondas, millones de dólares</Txt>}
        </g> : <g>
          <g transform="translate(600 210)"><rect x={-160} y={-50} width={320} height={100} rx={20} fill={VERDE} /><Txt x={0} y={14} textAnchor="middle" fontSize={40} fill="#fff">Venta: 100</Txt></g>
          <Flujo x1={560} y1={270} x2={330} y2={450} t={t} n={6} vel={0.9} arco={-30} color={VERDE} op={sm(t, m('setenta'), m('setenta') + 0.4)} />
          <Flujo x1={640} y1={270} x2={870} y2={450} t={t + 0.4} n={3} vel={0.9} arco={-30} color={VERDE} op={sm(t, m('diez'), m('diez') + 0.4)} />
          {[{ x: 330, v: inv, max: 75, n: 'Inversionistas', col: VIOLETA }, { x: 870, v: com, max: 75, n: 'Acciones comunes', col: NARANJA }].map((b) => (
            <g key={b.x}>
              <path d={`M ${b.x - 130} 460 H ${b.x + 130} L ${b.x + 110} 720 H ${b.x - 110} Z`} fill={c.apagado} />
              <path d={`M ${b.x - 110 - 20 * (b.v / b.max)} ${720 - 260 * (b.v / b.max)} H ${b.x + 110 + 20 * (b.v / b.max)} L ${b.x + 110} 720 H ${b.x - 110} Z`} fill={b.col} />
              <Cifra x={b.x} y={620} valor={b.v} u={1} color="#fff" tam={60} />
              <Txt f="a" x={b.x} y={770} textAnchor="middle" fontSize={26} fill={c.texto}>{b.n}</Txt>
            </g>
          ))}
          {t >= m('cuarenta') && t < m('diez') + 1.5 && <Letrero x={870} y={400} texto="Esperabas 40" fondo={GRIS} id={ID} op={e1(t, m('cuarenta'))} tam={24} />}
          {u > 0 && !movil && <Txt f="a" x={600} y={830} textAnchor="middle" fontSize={22} fill={c.tenue}>millones de dólares</Txt>}
        </g>}
      </Toma>

      {/* 3 · consolidación, anillos y diligencia */}
      <Toma t={t} a={m('consolidacion')} b={fin + 1} cy={470}>
        {t < m('matrimonio') ? <g>
          {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={300 + k * 150} y={600} s={0.6} cuerpo={[NARANJA, ROSA, AZUL_M][k]} />)}
          {t >= m('mitad') && <g opacity={sm(t, m('mitad'), m('mitad') + 1.4)}>
            {[0, 1, 2, 3].map((k) => { const v = sm(t, m('mitad') + 0.3 * k, m('mitad') + 0.3 * k + 1.5); return <rect key={k} x={lerp(580, 860, v)} y={lerp(440, 520 - k * 30, v)} width={40} height={24} rx={6} fill={AZUL_M} />; })}
            <path d="M 820 600 L 860 500 H 1000 L 1040 600 Z" fill="#64748b" />
            <Letrero x={930} y={660} texto="Vuelven al fondo" fondo={AZUL_M} id={ID} tam={24} />
          </g>}
          <Letrero x={450} y={700} texto="Equipo fundador" fondo={GRIS} id={ID} op={e1(t, m('consolidacion'))} tam={24} />
          {t >= m('mitad') && <Persona id={ID} x={lerp(600, 760, sm(t, m('mitad'), m('mitad') + 1.4))} y={600} s={0.6} cuerpo={VIOLETA} />}
        </g> : <g>
          <Anillos x={460} y={400} s={2.4} op={e1(t, m('matrimonio'))} />
          <Letrero x={460} y={600} texto="Sin divorcio" id={ID} op={e1(t, m('matrimonio') + 0.4)} />
          {t >= m('diligencia') && <g opacity={e1(t, m('diligencia'))} transform={`translate(${880 + 20 * Math.sin(t * 2)} 400)`}>
            <circle r={90} fill="none" stroke="#475569" strokeWidth={20} /><circle r={80} fill="#cfe8ff" opacity={0.5} />
            <rect x={60} y={60} width={36} height={130} rx={14} fill="#475569" transform="rotate(-45 60 60)" />
            <Persona id={ID} x={0} y={50} s={0.35} cuerpo={AZUL_M} />
          </g>}
          {t >= m('diligencia') && <Letrero x={880} y={700} texto="Revisa al inversionista" fondo={AZUL_M} id={ID} op={e1(t, m('diligencia') + 0.4)} tam={26} />}
        </g>}
      </Toma>
    </Lienzo>
  );
};
