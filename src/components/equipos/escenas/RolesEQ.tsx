import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Rol, ROLES, Monitor, Cuenta, Visto, Cruz, Calendario, Engranaje, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, TEAL, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE, RolK } from './kitEQ';

/**
 * «El equipo completo: quién es quién». Un solo escenario con dos zonas.
 * Izquierda · el embudo: arriba tres puestos de creadores de oportunidades, abajo tres de orquestadores de
 *   ingresos y encima el líder. Cada puesto se enciende cuando se nombra su rol.
 * Derecha · la ficha del rol nombrado: la persona con su herramienta, su sigla y su función, el dibujo de lo
 *   que hace (el mapa filtrado por PIB, la landing page, la reunión agendada y el Champion, la demostración,
 *   la prueba de concepto, la planta que crece, el tablero) y su métrica. El Manager no apaga incendios.
 */

const ID = 'eq04';
const nombres = ['funcion', 'creadores', 'orquestadores', 'lider', 'bdr', 'pib', 'mapeadas', 'lg', 'landing', 'publico', 'sdr', 'first', 'champion', 'ae', 'demos', 'cierre', 'ps', 'poc', 'am', 'retencion', 'manager', 'incendios', 'pregunta'] as const;
type N = typeof nombres[number];

const FICHAS: { rol: RolK; n: N; funcion: string; metrica: N; texto: string }[] = [
  { rol: 'bdr', n: 'bdr', funcion: 'Mapea la región', metrica: 'mapeadas', texto: 'Cuentas priorizadas' },
  { rol: 'lg', n: 'lg', funcion: 'Genera demanda', metrica: 'publico', texto: 'Público alcanzado' },
  { rol: 'sdr', n: 'sdr', funcion: 'Primeras reuniones', metrica: 'champion', texto: 'Oportunidades' },
  { rol: 'ae', n: 'ae', funcion: 'Cierra negocios', metrica: 'cierre', texto: 'Tasa de cierre' },
  { rol: 'ps', n: 'ps', funcion: 'Puente técnico', metrica: 'poc', texto: 'Viabilidad' },
  { rol: 'am', n: 'am', funcion: 'Retiene y expande', metrica: 'retencion', texto: 'Retención' },
  { rol: 'mg', n: 'manager', funcion: 'Orquesta y habilita', metrica: 'incendios', texto: 'Habilita' },
];

/* Puestos en el embudo (x, y de los pies). */
const PUESTO: Record<RolK, [number, number]> = {
  mg: [320, 175], bdr: [215, 380], lg: [320, 380], sdr: [425, 380], ae: [265, 640], ps: [320, 640], am: [375, 640],
};

export const RolesEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Quién es quién'], [m('funcion'), 'Un rol es una función'], [m('creadores'), 'Tres crean oportunidades'], [m('orquestadores'), 'Tres orquestan ingresos'], [m('lider'), 'Y un líder'],
    [m('bdr'), 'BDR · desarrollo de negocio'], [m('lg'), 'Lead Gen · generación de demanda'], [m('sdr'), 'SDR · desarrollo de ventas'], [m('champion'), 'Detecta al Champion'],
    [m('ae'), 'AE · ejecutivo de cuentas'], [m('ps'), 'Pre-Sales · ingeniero de soluciones'], [m('am'), 'AM · gerente de cuentas'], [m('manager'), 'Manager · orquesta'], [m('incendios'), 'No apaga incendios'],
  ];

  let actual = -1; FICHAS.forEach((f, k) => { if (t >= M(f.n)) actual = k; });
  const banda = 1 - ac(t, m('bdr') - 0.5, m('bdr'));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El equipo de ventas completo">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* EMBUDO · los siete puestos */}
      <g opacity={e1(t, m('funcion'))}>
        <path d="M 110 200 H 530 L 360 720 H 280 Z" fill={isDark ? '#2e2e2e' : '#eef0f3'} />
        <path d="M 110 200 H 530 L 465 400 H 175 Z" fill={AZUL_M} opacity={0.12 * e1(t, m('creadores'))} />
        <path d="M 175 400 H 465 L 360 720 H 280 Z" fill={NARANJA} opacity={0.12 * e1(t, m('orquestadores'))} />
        {(Object.keys(PUESTO) as RolK[]).map((r) => {
          const f = FICHAS.find((x) => x.rol === r)!;
          const visible = r === 'mg' ? m('lider') : ['bdr', 'lg', 'sdr'].includes(r) ? m('creadores') : m('orquestadores');
          if (t < visible) return null;
          const on = t >= M(f.n);
          const [x, y] = PUESTO[r];
          return <g key={r} opacity={e1(t, visible)} transform={`translate(0 ${actual >= 0 && FICHAS[actual].rol === r ? -6 * Math.abs(Math.sin(t * 3)) : 0})`}><Rol id={ID} rol={r} x={x} y={y} s={0.32} sigla={false} herramienta={false} gris={!on} /></g>;
        })}
      </g>

      {/* DERECHA · antes de los roles: la estructura en tres líneas */}
      {banda > 0.01 && (
        <g opacity={banda}>
          {t >= m('creadores') && <g opacity={e1(t, m('creadores'))}><Letrero x={870} y={300} texto="3 crean oportunidades" fondo={AZUL_M} id={ID} /></g>}
          {t >= m('orquestadores') && <g opacity={e1(t, m('orquestadores'))}><Letrero x={870} y={420} texto="3 orquestan ingresos" fondo={NARANJA} id={ID} /></g>}
          {t >= m('lider') && <g opacity={e1(t, m('lider'))}><Letrero x={870} y={540} texto="1 líder" fondo={PIZARRA} id={ID} /></g>}
        </g>
      )}

      {/* DERECHA · la ficha del rol nombrado */}
      {FICHAS.map((f, k) => {
        const a = M(f.n), b = k + 1 < FICHAS.length ? M(FICHAS[k + 1].n) : fin + 5;
        return (
          <Toma key={f.rol} t={t} a={a} b={b} cx={880} cy={480}>
            <Suelo y={700} isDark={isDark} x0={620} x1={1140} />
            <Txt x={880} y={200} textAnchor="middle" fontSize={64} fill={ROLES[f.rol].color} peso={800}>{ROLES[f.rol].sigla}</Txt>
            <Txt f="a" x={880} y={248} textAnchor="middle" fontSize={28} fill={c.tenue}>{f.funcion}</Txt>
            <Rol id={ID} rol={f.rol} x={720} y={700} s={0.92} t={t} sigla={false} u={sm(t, a + 0.5, a + 2)} />

            {/* lo que hace cada rol */}
            {f.rol === 'bdr' && t >= m('pib') && <g opacity={e1(t, m('pib'))}>
              <rect x={850} y={300} width={270} height={170} rx={18} fill={isDark ? '#1e3a2f' : '#dcfce7'} />
              {[[900, 360], [970, 330], [1050, 360], [930, 430], [1030, 440]].map(([x, y], j) => <g key={j}><rect x={x - 14} y={y - 26} width={28} height={26} rx={4} fill={PIZARRA} opacity={j % 2 && t >= m('pib') + 1.4 ? 0.3 : 1} />{j % 2 === 0 && <Visto x={x + 16} y={y - 30} r={11} op={sm(t, m('pib') + 1 + j * 0.2, m('pib') + 1.4 + j * 0.2)} />}</g>)}
              <Txt f="a" x={985} y={505} textAnchor="middle" fontSize={24} fill={c.tenue}>PIB · industria · tamaño</Txt>
            </g>}
            {f.rol === 'lg' && t >= m('landing') && <g opacity={e1(t, m('landing'))}>
              <rect x={850} y={300} width={270} height={180} rx={14} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
              <rect x={850} y={300} width={270} height={28} rx={14} fill={ROSA} /><rect x={850} y={314} width={270} height={14} fill={ROSA} />
              <rect x={870} y={348} width={150} height={16} rx={8} fill={c.apagado} /><rect x={870} y={374} width={110} height={12} rx={6} fill={c.apagado} />
              <rect x={870} y={420} width={110} height={36} rx={18} fill={NARANJA} />
              <g transform={`translate(1070 ${430 + 4 * Math.sin(t * 3)})`}><circle r={24} fill="#22c55e" /><path d="M -12 16 L -16 24 L -6 20 Z" fill="#22c55e" /><path d="M -8 -4 q 8 14 18 6" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" /></g>
            </g>}
            {f.rol === 'sdr' && t >= m('first') && <g opacity={e1(t, m('first'))}>
              <Calendario x={940} y={390} s={0.8} marcados={Math.round(lerp(0, 5, sm(t, m('first') + 0.3, m('first') + 2)))} />
            </g>}
            {f.rol === 'sdr' && t >= m('champion') && <g opacity={e1(t, m('champion'))}>
              <Persona id={ID} x={1080} y={520} s={0.4} cuerpo={AMBAR} />
              <path d="M 1080 395 L 1086 410 L 1102 410 L 1089 419 L 1094 434 L 1080 425 L 1066 434 L 1071 419 L 1058 410 L 1074 410 Z" fill={AMBAR} />
              <Txt f="a" x={1080} y={560} textAnchor="middle" fontSize={24} fill={c.tenue}>Champion</Txt>
            </g>}
            {f.rol === 'ae' && t >= m('demos') && <g opacity={e1(t, m('demos'))}>
              <Monitor x={960} y={520} w={240} h={140}>
                <rect width={240} height={140} fill="#0b1220" />
                {[0, 1, 2, 3].map((j) => <rect key={j} x={30 + j * 50} y={110 - (30 + 18 * j) * sm(t, m('demos') + 0.4, m('demos') + 1.6)} width={34} height={(30 + 18 * j) * sm(t, m('demos') + 0.4, m('demos') + 1.6)} rx={6} fill={[AZUL_M, VIOLETA, NARANJA, VERDE][j]} />)}
              </Monitor>
            </g>}
            {f.rol === 'ps' && t >= m('poc') && <g opacity={e1(t, m('poc'))}>
              <Engranaje x={910} y={380} r={44} t={t * 2} hueco={c.panel} color={TEAL} />
              <Engranaje x={1000} y={330} r={28} t={-t * 3.1} hueco={c.panel} color="#14b8a6" />
              <rect x={960} y={380} width={150} height={110} rx={14} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
              <Txt x={1035} y={420} textAnchor="middle" fontSize={30} fill={TEAL} peso={800}>POC</Txt>
              <Visto x={1035} y={455} r={18} op={sm(t, m('poc') + 1, m('poc') + 1.5)} />
            </g>}
            {f.rol === 'am' && <g opacity={e1(t, m('am') + 0.6)}>
              {(() => { const u = sm(t, m('am') + 0.6, m('retencion') + 1); return (
                <g transform="translate(980 470)">
                  <path d="M -50 0 H 50 L 38 60 H -38 Z" fill="#b45309" />
                  <rect x={-4} y={-170 * u} width={8} height={170 * u} fill="#15803d" />
                  {[0, 1, 2, 3].map((j) => u > j * 0.22 && <ellipse key={j} cx={j % 2 ? 26 : -26} cy={-40 - j * 38} rx={30} ry={14} fill={VERDE} transform={`rotate(${j % 2 ? 30 : -30} ${j % 2 ? 26 : -26} ${-40 - j * 38})`} opacity={sm(u, j * 0.22, j * 0.22 + 0.2)} />)}
                </g>
              ); })()}
            </g>}
            {f.rol === 'mg' && <g opacity={e1(t, m('manager') + 0.4)}>
              <rect x={850} y={290} width={270} height={170} rx={16} fill="#1f2937" />
              {[0, 1, 2, 3, 4].map((j) => <rect key={j} x={870 + j * 48} y={300 + j * 26} width={40} height={150 - j * 26} rx={6} fill={[VIOLETA, ROSA, AZUL_M, NARANJA, VERDE][j]} opacity={0.9} />)}
            </g>}
            {f.rol === 'mg' && t >= m('incendios') && <g opacity={e1(t, m('incendios'))} transform="translate(1060 600)">
              {[0, 1].map((j) => <path key={j} d={`M ${-22 + j * 30} 20 Q ${-36 + j * 30} ${-12 - 6 * Math.sin(t * 9 + j)} ${-14 + j * 30} -40 Q ${-4 + j * 30} -10 ${8 + j * 30} 20 Z`} fill={j ? AMBAR : ROJO_M} opacity={0.85} />)}
              <Cruz x={0} y={-10} r={38} op={0.92} />
            </g>}

            {t >= M(f.metrica) && <Letrero x={880} y={770} texto={f.texto} fondo={ROLES[f.rol].color} id={ID} op={e1(t, M(f.metrica))} />}
          </Toma>
        );
      })}
    </Lienzo>
  );
};
