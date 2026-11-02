import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Contrato, Fajo, Cruz, Visto, Reloj, Burbuja, Flujo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * El acuerdo por dentro.
 * 1 · Las piezas se arman como un rompecabezas: acciones secundarias (menos riesgo), el futuro compartido (dos caminos que
 *     se unen o no), el precio (efectivo frente a acciones de otra privada).
 * 2 · Retención (de 75 a 120 millones para el equipo), el earn out con un signo de pregunta que no llega y el holdback en una caja.
 * 3 · El banquero y la oferta competidora; saber decir que no y la historia del amigo: 40 millones rechazados que terminan en cero.
 */

const ID = 'ep29', P = 'ep-acuerdo';

export const AcuerdoEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('piezas'), 'Varias piezas'], [m('futuro'), 'El futuro compartido'], [m('precio'), 'No todos los millones son iguales'], [m('retencion'), 'Retención'],
    [m('earn'), 'Earn out y holdback'], [m('banquero'), 'Una oferta competidora'], [m('decirno'), 'Saber decir que no'],
  ];
  const ret = lerp(75, 120, sm(t, m('ciento'), m('ciento') + 1.4));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El acuerdo por dentro">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · secundarias, futuro, precio */}
      <Toma t={t} a={0} b={m('retencion')} cy={470}>
        {t < m('futuro') ? <g>
          <g opacity={e1(t, m('secundarias'))}>
            <rect x={240} y={260} width={300} height={400} rx={24} fill={c.panel2} />
            <rect x={240} y={260 + 400 * (1 - lerp(0.95, 0.8, sm(t, m('riesgo'), m('riesgo') + 1)))} width={300} height={400 * lerp(0.95, 0.8, sm(t, m('riesgo'), m('riesgo') + 1))} rx={24} fill={NARANJA} />
            <Txt f="a" x={390} y={700} textAnchor="middle" fontSize={26} fill={c.texto}>Tu riqueza en la empresa</Txt>
          </g>
          {t >= m('riesgo') && <g opacity={e1(t, m('riesgo'))}><Fajo x={820} y={600} n={5} w={140} /><Letrero x={820} y={680} texto="Vender secundarias: menos riesgo" fondo={VERDE} id={ID} tam={22} /></g>}
        </g> : t < m('precio') ? <g>
          <path d="M 200 360 Q 450 360 600 460" stroke={NARANJA} strokeWidth={22} fill="none" strokeLinecap="round" />
          <path d="M 200 560 Q 450 560 600 460" stroke={AZUL_M} strokeWidth={22} fill="none" strokeLinecap="round" />
          <path d={`M 600 460 H ${lerp(600, 1000, sm(t, m('futuro'), m('futuro') + 1.4))}`} stroke={VIOLETA} strokeWidth={30} fill="none" strokeLinecap="round" />
          <Letrero x={200} y={300} texto="Tu empresa" fondo={NARANJA} id={ID} tam={24} />
          <Letrero x={200} y={620} texto="Quien compra" fondo={AZUL_M} id={ID} tam={24} />
          <Txt f="a" x={800} y={400} textAnchor="middle" fontSize={26} fill={c.texto}>A cinco días y a cinco años</Txt>
          {t >= m('novale') && <Letrero x={800} y={560} texto="Sin futuro, no vale" fondo={GRIS} id={ID} op={e1(t, m('novale'))} tam={24} />}
        </g> : <g>
          <g transform="translate(340 0)"><Fajo x={0} y={620} n={8} w={150} /><Txt x={0} y={680} textAnchor="middle" fontSize={34} fill={VERDE}>100 en efectivo</Txt></g>
          <Txt x={600} y={520} textAnchor="middle" fontSize={64} fill={c.tenue}>≠</Txt>
          <g transform="translate(860 0)" opacity={e1(t, m('iguales'))}>
            {[0, 1, 2].map((k) => <rect key={k} x={-80 + k * 10} y={420 - k * 30} width={150} height={190} rx={12} fill={[VIOLETA, ROSA, AZUL_M][k]} opacity={0.75} />)}
            <Txt x={0} y={680} textAnchor="middle" fontSize={30} fill={VIOLETA}>100 en acciones</Txt>
            <Txt f="a" x={0} y={716} textAnchor="middle" fontSize={22} fill={c.tenue}>de otra empresa privada</Txt>
          </g>
        </g>}
      </Toma>

      {/* 2 · retención, earn out, holdback */}
      <Toma t={t} a={m('retencion')} b={m('banquero')} cy={470}>
        <g opacity={e1(t, m('retencion'))}>
          {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={180 + k * 90} y={640} s={0.5} cuerpo={[NARANJA, ROSA, AZUL_M][k]} />)}
          <rect x={150} y={420 - 1.6 * (ret - 75)} width={240} height={90 + 1.6 * (ret - 75)} rx={16} fill={VERDE} />
          <Txt x={270} y={480} textAnchor="middle" fontSize={44} fill="#fff">{Math.round(ret)}</Txt>
          <Txt f="a" x={270} y={720} textAnchor="middle" fontSize={22} fill={c.tenue}>millones para retener al equipo</Txt>
        </g>
        {t >= m('earn') && <g opacity={e1(t, m('earn'))} transform="translate(620 440)">
          <rect x={-120} y={-120} width={240} height={240} rx={26} fill={c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
          <Txt x={0} y={30} textAnchor="middle" fontSize={110} fill={AMBAR}>?</Txt>
          <Txt f="a" x={0} y={170} textAnchor="middle" fontSize={26} fill={c.texto}>Earn out</Txt>
          <Txt f="a" x={0} y={204} textAnchor="middle" fontSize={22} fill={c.tenue}>muchas veces no se paga</Txt>
        </g>}
        {t >= m('holdback') && <g opacity={e1(t, m('holdback'))} transform="translate(960 440)">
          <rect x={-110} y={-110} width={220} height={220} rx={20} fill="#475569" /><circle r={46} fill="#94a3b8" /><rect x={-6} y={-40} width={12} height={40} rx={6} fill="#334155" transform={`rotate(${t * 40})`} />
          <Txt f="a" x={0} y={160} textAnchor="middle" fontSize={26} fill={c.texto}>Holdback</Txt>
          <Txt f="a" x={0} y={194} textAnchor="middle" fontSize={22} fill={c.tenue}>quizás no vuelva entero</Txt>
        </g>}
      </Toma>

      {/* 3 · banquero, oferta competidora y decir que no */}
      <Toma t={t} a={m('banquero')} b={fin + 1} cy={470}>
        {t < m('decirno') ? <g>
          <Persona id={ID} x={300} y={620} s={0.8} cuerpo="#334155" corbata />
          <Letrero x={300} y={690} texto="Banquero de inversión" fondo="#334155" id={ID} tam={22} />
          {t >= m('competidora') && <g opacity={e1(t, m('competidora'))}>
            <Contrato x={720} y={420} s={0.7} rot={-8} /><Contrato x={900} y={430} s={0.7} rot={8} />
            <Letrero x={810} y={640} texto="Solo otra oferta cambia los términos" fondo={VERDE} id={ID} tam={22} />
          </g>}
        </g> : <g>
          {t < m('amigo') ? <g><Burbuja x={360} y={280} w={480} texto="No, gracias." u={sm(t, m('decirno'), m('decirno') + 1)} c={c} id={ID} marca /><Persona id={ID} x={600} y={680} s={0.9} cuerpo={NARANJA} /></g> : <g>
            <rect x={160} y={720} width={880} height={8} rx={4} fill={c.apagado} />
            <g opacity={e1(t, m('amigo'))}>
              <Txt x={260} y={300} textAnchor="middle" fontSize={34} fill={c.texto}>1999</Txt>
              <Fajo x={260} y={620} n={10} w={130} />
              <Txt x={260} y={680} textAnchor="middle" fontSize={34} fill={VERDE}>~40</Txt>
              {t >= m('cuarenta') + 0.6 && <Cruz x={340} y={420} r={30} />}
            </g>
            {t >= m('efectivo') && <g opacity={e1(t, m('efectivo'))}>
              <path d="M 360 500 Q 650 380 900 640" stroke={GRIS} strokeWidth={8} fill="none" strokeDasharray="16 14" />
              <Txt x={940} y={300} textAnchor="middle" fontSize={34} fill={c.texto}>Años después</Txt>
              <Txt x={940} y={680} textAnchor="middle" fontSize={60} fill="#e5484d">0</Txt>
              <Txt f="a" x={940} y={720 - 120} textAnchor="middle" fontSize={22} fill={c.tenue}>en efectivo</Txt>
            </g>}
          </g>}
        </g>}
      </Toma>
    </Lienzo>
  );
};
