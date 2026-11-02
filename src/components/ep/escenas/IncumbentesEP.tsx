import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Edificio, Persona, Reloj, Suelo, Flujo, Visto, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Por qué las empresas establecidas no cambian.
 * 1 · La gran empresa con tres frenos que la sujetan: el ADN (la opción obvia), la falta de emprendedores (el revoltoso sale
 *     por la puerta) y el ego (cinco líderes, cada uno en su torre). TomTom: «al menos no lo matamos nosotros».
 * 2 · Dos preguntas: un reloj de cinco años y los activos reordenados.
 * 3 · La cafetería: personas con un solo café se quedan horas; entran escritorios, cabina, impresora e internet, y pagan por día.
 */

const ID = 'ep09', P = 'ep-incumbentes';

export const IncumbentesEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('frenos'), 'Tres frenos'], [m('adn'), 'El ADN'], [m('emprendedores'), 'Faltan emprendedores'], [m('ego'), 'El ego'],
    [m('tomtom'), 'TomTom'], [m('preguntas'), 'Dos preguntas'], [m('cafeteria'), 'La cafetería'],
  ];
  const sale = sm(t, m('revoltosos'), m('revoltosos') + 2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Por qué las empresas establecidas no cambian">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · tres frenos */}
      <Toma t={t} a={0} b={m('preguntas')} cy={480}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        <Edificio x={600} y={720} w={360} h={440} color="#475569" />
        {/* ADN: doble hélice gris al costado */}
        {t >= m('adn') && <g opacity={e1(t, m('adn'))}>
          {Array.from({ length: 10 }, (_, k) => { const y = 300 + k * 34; const dx = 34 * Math.sin(k * 0.8 + t * 2); return <g key={k}><circle cx={220 + dx} cy={y} r={9} fill={AZUL_M} /><circle cx={220 - dx} cy={y} r={9} fill={GRIS} /><line x1={220 + dx} y1={y} x2={220 - dx} y2={y} stroke={c.apagado} strokeWidth={3} /></g>; })}
          <Letrero x={220} y={680} texto="La opción obvia" fondo={AZUL_M} id={ID} tam={24} op={e1(t, m('obvia'))} />
        </g>}
        {/* el revoltoso sale */}
        {t >= m('revoltosos') && <g opacity={1 - sm(t, m('revoltosos') + 1.6, m('revoltosos') + 2.4)}>
          <Persona id={ID} x={lerp(600, 1040, sale)} y={720} s={0.55} cuerpo={NARANJA} />
        </g>}
        {t >= m('despidieron') && <Letrero x={980} y={560} texto="Lo despidieron siempre" fondo={NARANJA} id={ID} op={e1(t, m('despidieron'))} tam={24} />}
        {/* ego: cinco líderes en el techo */}
        {t >= m('ego') && [0, 1, 2, 3, 4].map((k) => <Persona key={k} id={ID} x={460 + k * 70} y={280} s={0.38} cuerpo={[ROSA, VIOLETA, AMBAR, VERDE, AZUL_M][k]} />)}
        {t >= m('cinco') && <Letrero x={600} y={150} texto="Cinco líderes, cinco unidades" fondo={ROSA} id={ID} op={e1(t, m('cinco'))} tam={24} />}
        {t >= m('tomtom') && <g opacity={e1(t, m('tomtom'))}>
          <rect x={720} y={760} width={420} height={80} rx={20} fill={c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
          <Txt f="a" x={930} y={808} textAnchor="middle" fontSize={24} fill={c.texto}>TomTom: «no lo matamos nosotros»</Txt>
        </g>}
        {t >= m('frenos') && <Txt f="a" x={600} y={790} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={e1(t, m('frenos')) * (1 - e1(t, m('tomtom')))}>La gran empresa</Txt>}
      </Toma>

      {/* 2 · dos preguntas */}
      <Toma t={t} a={m('preguntas')} b={m('cafeteria')} cy={460}>
        <g opacity={e1(t, m('irrelevante'))}>
          <Reloj x={350} y={420} r={130} t={t} vel={3} aro={ROSA} />
          <Letrero x={350} y={620} texto="¿Qué te hará irrelevante en 5 años?" fondo={ROSA} id={ID} tam={24} />
        </g>
        {t >= m('activos') && <g opacity={e1(t, m('activos'))}>
          {[0, 1, 2, 3].map((k) => { const u = sm(t, m('activos') + 0.5, m('activos') + 2); const a: [number, number] = [780 + (k % 2) * 110, 360 + Math.floor(k / 2) * 110]; const b: [number, number] = [720 + k * 80, 470]; return <rect key={k} x={lerp(a[0], b[0], u) - 40} y={lerp(a[1], b[1], u) - 40} width={80} height={80} rx={14} fill={[NARANJA, AZUL_M, VERDE, VIOLETA][k]} />; })}
          <Letrero x={850} y={620} texto="¿Qué activos valdrían más?" fondo={VERDE} id={ID} tam={24} />
        </g>}
      </Toma>

      {/* 3 · la cafetería */}
      <Toma t={t} a={m('cafeteria')} b={fin + 1} cy={480}>
        <Suelo y={700} isDark={isDark} x0={80} x1={1120} />
        <rect x={100} y={260} width={1000} height={70} rx={14} fill="#7c2d12" opacity={0.85} />
        <Txt x={600} y={308} textAnchor="middle" fontSize={34} fill="#fde68a">Café</Txt>
        {[0, 1, 2].map((k) => {
          const x = 260 + k * 340, esc = sm(t, m('escritorios') + 0.3 * k, m('escritorios') + 0.3 * k + 1);
          return <g key={k}>
            <rect x={x - 110 * (1 + 0.4 * esc)} y={560} width={220 * (1 + 0.4 * esc)} height={22} rx={8} fill={esc > 0.5 ? '#94a3b8' : '#a16207'} />
            <rect x={x - 6} y={580} width={12} height={120} fill="#64748b" />
            <Persona id={ID} x={x - 40} y={700} s={0.55} cuerpo={[AZUL_M, ROSA, VIOLETA][k]} />
            <g transform={`translate(${x + 20} 556)`}><rect x={-14} y={-28} width={28} height={28} rx={5} fill="#fff" /><rect x={14} y={-22} width={8} height={14} rx={4} fill="#fff" /></g>
            {esc > 0.4 && <g opacity={esc} transform={`translate(${x + 70} 556)`}><rect x={-34} y={-46} width={68} height={42} rx={6} fill="#334155" /><rect x={-40} y={-4} width={80} height={6} rx={3} fill="#94a3b8" /></g>}
          </g>;
        })}
        {t >= m('cafeteria') && !movil && <Reloj x={1040} y={420} r={60} t={t} vel={4} />}
        {t >= m('escritorios') && <Letrero x={600} y={790} texto="Oficina temporal: tarifa diaria o mensual" fondo={VERDE} id={ID} op={e1(t, m('escritorios') + 0.8)} tam={26} />}
        {t >= m('fuera') && <Visto x={1040} y={420} r={34} op={e1(t, m('fuera'))} />}
      </Toma>
    </Lienzo>
  );
};
