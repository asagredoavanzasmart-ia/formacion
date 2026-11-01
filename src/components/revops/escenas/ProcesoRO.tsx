import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Bloque, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Monitor, Engranaje, Burbuja, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Primero el proceso, después la herramienta», en seis tomas.
 * 1 · Las herramientas aceleran el proceso que existe: sin rumbo, un motor potente acelera hacia el lado equivocado.
 * 2 · La pirámide de abajo hacia arriba: definir procesos, gobierno de datos y stack; cada piso se apoya en el anterior.
 * 3 · Los tres pisos de cerca: pasos que todos describen igual; reglas de campos y sincronización; el stack al servicio.
 * 4 · Remedios: la herramienta multiplica; un proceso confuso multiplicado es más confusión, más rápido.
 * 5 · Corbett: dos reportes correctos se contradicen porque cada área define distinto un SQL.
 * 6 · Extender el mapa antes y después del pipeline, y proteger el modelo de datos (si uno lo cambia, se rompen los reportes).
 */

const ID = 'ro32';
const nombres = ['orden', 'aceleran', 'equivocada', 'piramide', 'p1', 'p2', 'p3', 'apoya', 'area1', 'enrutamiento', 'abm', 'intencion', 'acuerdo', 'describen', 'area2', 'reglas', 'campos', 'sincronizan', 'area3', 'servir', 'remedios', 'multiplicador', 'confusion', 'corbett', 'reportes', 'definiciones', 'extender', 'antes', 'despues', 'traspasos', 'modelo', 'acuerdan', 'rompen', 'cliente', 'pregunta'] as const;
type N = typeof nombres[number];

export const ProcesoRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Primero el proceso'], [m('orden'), 'Tres áreas, en orden'], [m('equivocada'), 'Sin proceso: rumbo equivocado'],
    [m('piramide'), 'La pirámide'], [m('area1'), '1 · Definir procesos'], [m('area2'), '2 · Gobierno de datos'], [m('area3'), '3 · Stack tecnológico'],
    [m('remedios'), 'Un multiplicador de fuerza'], [m('corbett'), 'Dos reportes, dos verdades'], [m('extender'), 'Extender el mapa'], [m('modelo'), 'Proteger el modelo de datos'],
  ];

  const PISOS = [
    { n: 'p1' as N, txt: '1 · Definir procesos', col: NARANJA, y: 640, w: 640 },
    { n: 'p2' as N, txt: '2 · Gobierno de datos', col: VIOLETA, y: 500, w: 470 },
    { n: 'p3' as N, txt: '3 · Stack tecnológico', col: AZUL_M, y: 360, w: 300 },
  ];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Primero el proceso, después la herramienta">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · la herramienta acelera lo que hay */}
      <Toma t={t} a={-1} b={m('piramide')} zi={1}>
        <Suelo y={640} isDark={isDark} />
        {['Procesos', 'Datos', 'Stack'].map((txt, k) => <g key={txt} opacity={e1(t, m('orden') + k * 0.3)}><Letrero x={300 + k * 300} y={200} texto={`${k + 1} · ${txt}`} fondo={[NARANJA, VIOLETA, AZUL_M][k]} id={ID} /></g>)}
        {t >= m('aceleran') && (() => { const mal = t >= m('equivocada'); const ph = ((t - m('aceleran')) * (mal ? 0.5 : 0.25)) % 1; const x = mal ? lerp(700, 120, ph) : lerp(300, 900, ph); return (
          <g opacity={e1(t, m('aceleran'))}>
            <g transform={`translate(${x} 600) scale(${mal ? -1 : 1} 1)`}>
              <rect x={-70} y={-50} width={140} height={46} rx={14} fill={mal ? ROJO_M : VERDE} /><rect x={-40} y={-80} width={80} height={36} rx={10} fill={mal ? ROJO_M : VERDE} opacity={0.8} />
              <circle cx={-40} cy={-4} r={18} fill="#1f2937" /><circle cx={40} cy={-4} r={18} fill="#1f2937" />
              {[0, 1, 2].map((k) => <rect key={k} x={-120 - k * 26} y={-40 + k * 10} width={30 - k * 6} height={5} rx={2} fill={c.apagado} />)}
            </g>
            {mal && <><path d="M 1000 420 l 60 0 l -14 -14 M 1060 420 l -14 14" stroke={VERDE} strokeWidth={6} fill="none" strokeLinecap="round" /><Txt f="a" x={1030} y={400} textAnchor="middle" fontSize={22} fill={VERDE}>meta</Txt><Letrero x={400} y={720} texto="Más rápido, hacia el lado equivocado" fondo={ROJO_M} id={ID} tam={22} /></>}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 2 · la pirámide */}
      <Toma t={t} a={m('piramide')} b={m('area1')}>
        {PISOS.map((p) => t >= m(p.n) && (
          <g key={p.n} opacity={e1(t, m(p.n))} transform={`translate(0 ${(1 - sm(t, m(p.n), m(p.n) + 0.6)) * -80})`}>
            <path d={`M ${600 - p.w / 2} ${p.y} L ${600 + p.w / 2} ${p.y} L ${600 + p.w / 2 - 70} ${p.y - 120} L ${600 - p.w / 2 + 70} ${p.y - 120} Z`} fill={p.col} />
            <Txt f="a" x={600} y={p.y - 50} textAnchor="middle" fontSize={26} fill="#fff" peso={700}>{p.txt}</Txt>
          </g>
        ))}
        {t >= m('apoya') && <Letrero x={600} y={720} texto="Cada piso se apoya en el anterior" fondo={PIZARRA} id={ID} op={e1(t, m('apoya'))} />}
      </Toma>

      {/* TOMA 3 · los tres pisos de cerca */}
      <Toma t={t} a={m('area1')} b={m('remedios')}>
        {(() => { const piso = t >= m('area3') ? 2 : t >= m('area2') ? 1 : 0; return (
          <g>
            {PISOS.map((p, k) => <g key={p.n} opacity={k === piso ? 1 : 0.3}><rect x={70} y={180 + (2 - k) * 120} width={240} height={96} rx={16} fill={p.col} /><Txt f="a" x={190} y={235 + (2 - k) * 120} textAnchor="middle" fontSize={20} fill="#fff" peso={700}>{p.txt.slice(4)}</Txt></g>)}
            {piso === 0 && (
              <g>
                {t >= m('enrutamiento') && ['Enrutar', 'Puntuar', 'Segmentar', t >= m('abm') ? 'ABM' : '', t >= m('intencion') ? 'Intención' : ''].filter(Boolean).map((txt, k) => <g key={txt} opacity={e1(t, m('enrutamiento') + k * 0.3)}><circle cx={420 + k * 150} cy={300} r={42} fill={NARANJA} /><Txt x={420 + k * 150} y={312} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>{k + 1}</Txt><Txt f="a" x={420 + k * 150} y={380} textAnchor="middle" fontSize={22} fill={c.texto}>{txt}</Txt></g>)}
                {t >= m('acuerdo') && [0, 1, 2].map((k) => <g key={k} opacity={e1(t, m('acuerdo') + k * 0.3)}><Persona id={ID} x={480 + k * 220} y={720} s={0.5} cuerpo={[AMBAR, NARANJA, TEAL][k]} /><Burbuja x={420 + k * 220} y={480} w={140} texto="1 → 2 → 3" u={sm(t, m('describen'), m('describen') + 1)} c={c} id={ID} tam={22} /></g>)}
                {t >= m('describen') && <Letrero x={700} y={790} texto="Existe cuando todos lo describen igual" id={ID} op={e1(t, m('describen'))} tam={22} />}
              </g>
            )}
            {piso === 1 && (
              <g opacity={e1(t, m('area2'))}>
                <rect x={420} y={230} width={640} height={340} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
                {[['campos', 'Qué campos existen'], ['reglas', 'Quién crea y quién borra'], ['sincronizan', 'Hacia dónde se sincronizan']].map(([n, txt], k) => t >= m(n as N) && <g key={n} opacity={e1(t, m(n as N))}><Visto x={470} y={300 + k * 100} r={22} /><Txt f="a" x={510} y={308 + k * 100} fontSize={26} fill={c.texto}>{txt}</Txt></g>)}
              </g>
            )}
            {piso === 2 && (
              <g opacity={e1(t, m('area3'))}>
                <Engranaje x={560} y={420} r={70} t={t} color={NARANJA} hueco={c.panel} />
                {[0, 1, 2].map((k) => <g key={k} transform={`translate(${790 + k * 110} 520) scale(0.35)`}><Monitor x={0} y={0} w={200} h={130} /></g>)}
                {t >= m('servir') && <Letrero x={760} y={680} texto="El stack sirve al proceso, no lo define" fondo={AZUL_M} id={ID} op={e1(t, m('servir'))} tam={22} />}
              </g>
            )}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 4 · el multiplicador */}
      <Toma t={t} a={m('remedios')} b={m('corbett')}>
        {(() => { const multi = sm(t, m('confusion'), m('confusion') + 2); return (
          <g>
            {t >= m('multiplicador') && <g opacity={e1(t, m('multiplicador'))}><circle cx={600} cy={420} r={70} fill={`url(#${ID}-marca)`} /><Txt x={600} y={448} textAnchor="middle" fontSize={80} fill="#fff" peso={800}>×</Txt><Letrero x={600} y={540} texto="Multiplicador de fuerza" id={ID} tam={24} /></g>}
            {/* entra un proceso enredado y sale más enredo */}
            <path d="M 150 420 c 30 -60 60 60 90 0 s 60 60 90 0 s 60 -60 100 0" stroke="#94a3b8" strokeWidth={8} fill="none" strokeLinecap="round" />
            {multi > 0.01 && Array.from({ length: 4 }, (_, k) => <path key={k} d={`M 690 ${420 + (k - 1.5) * 40} c 30 -${40 + k * 10} 60 ${40 + k * 10} 90 0 s 60 ${40 + k * 10} 90 0 s 60 -${40 + k * 10} 120 0`} stroke={ROJO_M} strokeWidth={6} fill="none" opacity={multi} strokeDasharray="400" strokeDashoffset={400 * (1 - multi)} strokeLinecap="round" />)}
            {t >= m('confusion') && <Letrero x={880} y={640} texto="Más confusión, más rápido" fondo={ROJO_M} id={ID} op={e1(t, m('confusion'))} />}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 5 · dos reportes */}
      <Toma t={t} a={m('corbett')} b={m('extender')}>
        {t >= m('reportes') && [['Finanzas', '128 SQL', AZUL_M], ['Marketing', '214 SQL', AMBAR]].map(([who, num, col], k) => (
          <g key={who} opacity={e1(t, m('reportes') + k * 0.4)}>
            <g transform={`translate(${330 + k * 540} 560)`}><Monitor x={0} y={0} w={300} h={180}><rect width={300} height={180} fill="#0b1220" /><text x={150} y={110} textAnchor="middle" fontSize={44} fontWeight={800} fill="#fff" fontFamily="Ubuntu">{num}</text></Monitor></g>
            <Letrero x={330 + k * 540} y={620} texto={who} fondo={col} id={ID} tam={24} />
            {t >= m('definiciones') && <Visto x={330 + k * 540} y={270} r={24} op={e1(t, m('definiciones'))} />}
          </g>
        ))}
        {t >= m('reportes') && t < m('definiciones') && <Letrero x={600} y={720} texto="«¡Uno está mal!»" fondo={ROJO_M} id={ID} op={e1(t, m('reportes') + 0.8)} />}
        {t >= m('definiciones') && <Letrero x={600} y={720} texto="Ninguno mal: dos definiciones de SQL" fondo={PIZARRA} id={ID} op={e1(t, m('definiciones'))} />}
      </Toma>

      {/* TOMA 6 · extender el mapa y proteger el modelo */}
      <Toma t={t} a={m('extender')} b={fin + 1}>
        {(() => { const rompe = t >= m('rompen') && t < m('cliente') + 3; return (
          <g>
            {t < m('modelo') && <g opacity={1 - ac(t, m('modelo') - 0.4, m('modelo'))}>
              <rect x={420} y={380} width={360} height={90} rx={18} fill={NARANJA} /><Txt f="a" x={600} y={435} textAnchor="middle" fontSize={26} fill="#fff" peso={700}>Pipeline</Txt>
              {t >= m('antes') && <g opacity={e1(t, m('antes'))}><rect x={100} y={380} width={280} height={90} rx={18} fill={AMBAR} opacity={0.8} /><Txt f="a" x={240} y={435} textAnchor="middle" fontSize={24} fill="#fff" peso={700}>De dónde vienen</Txt></g>}
              {t >= m('despues') && <g opacity={e1(t, m('despues'))}><rect x={820} y={380} width={280} height={90} rx={18} fill={VERDE} opacity={0.8} /><Txt f="a" x={960} y={435} textAnchor="middle" fontSize={24} fill="#fff" peso={700}>Después del cierre</Txt></g>}
              {t >= m('traspasos') && [400, 800].map((x) => <g key={x}><circle cx={x} cy={425} r={22} fill="#fff" stroke={ROSA} strokeWidth={6} /><Letrero x={x} y={540} texto="Misma definición" fondo={ROSA} id={ID} tam={20} /></g>)}
            </g>}
            {t >= m('modelo') && (
              <g opacity={e1(t, m('modelo'))}>
                {['mkt', 'ven', 'ser'].map((k, j) => <Equipo key={k} id={ID} k={k as 'mkt'} x={220 + j * 380} y={760} s={0.5} t={t} nombre={false} />)}
                {/* el modelo: cuenta con contactos y negocios */}
                <g transform="translate(600 380)">
                  <rect x={-90} y={-60} width={180} height={80} rx={16} fill={PIZARRA} /><Txt f="a" x={0} y={-12} textAnchor="middle" fontSize={22} fill="#fff" peso={700}>Cuenta</Txt>
                  {[-1, 1].map((s) => <g key={s} transform={`translate(${s * 220} ${rompe ? 140 + 30 * (s > 0 ? 1 : 0) : 140}) rotate(${rompe ? s * 12 : 0})`}><rect x={-90} y={-36} width={180} height={72} rx={14} fill={s < 0 ? AZUL_M : VERDE} /><Txt f="a" x={0} y={8} textAnchor="middle" fontSize={22} fill="#fff" peso={700}>{s < 0 ? 'Cliente' : 'Prospecto'}</Txt></g>)}
                  {!rompe && [-1, 1].map((s) => <line key={s} x1={s * 60} y1={20} x2={s * 200} y2={104} stroke={c.apagado} strokeWidth={6} />)}
                  {rompe && <Cruz x={0} y={110} r={26} />}
                </g>
                {t >= m('acuerdan') && <Letrero x={600} y={190} texto="Un modelo acordado entre los tres" id={ID} op={e1(t, m('acuerdan')) * (rompe ? 0.3 : 1)} tam={24} />}
                {rompe && <Letrero x={600} y={640} texto="Un cambio aislado rompe los reportes" fondo={ROJO_M} id={ID} tam={22} />}
              </g>
            )}
          </g>
        ); })()}
      </Toma>
    </Lienzo>
  );
};
