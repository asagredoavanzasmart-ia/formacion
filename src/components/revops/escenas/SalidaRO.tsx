import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Monitor, Calendario, Moneda3D, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Criterios de salida y etapas después del cierre», en cinco tomas.
 * 1 · La acción del vendedor (la demo) frente a la etapa del comprador (producto evaluado); sus acciones son los criterios.
 * 2 · Los tres criterios se marcan uno a uno; nadie pide el cierre en una llamada en frío.
 * 3 · Por qué importa: la jefatura pide el correo y el pronóstico se vuelve estable (21 % mes a mes).
 * 4 · Termina al cerrar (8 etapas) o sigue con etapas posventa (9 traspaso, 10 implementación, 11 en marcha).
 * 5 · Cuántas etapas (menos es más), la prueba de Roberge a los 6, 9 o 12 meses y los 1.002 vendedores de Hazard.
 */

const ID = 'ro28';
const nombres = ['combina', 'criterios', 'accion', 'etapaC', 'corresponden', 'criterios2', 'asistio', 'agendo', 'respondio', 'bray', 'frio', 'importa', 'correo', 'pronostico', 'p21', 'mes', 'grafico', 'termina', 'posventa', 'traspaso', 'marcha', 'venman', 'cuantas', 'pocas', 'demasiadas', 'menos', 'roberge', 'meses', 'ochenta', 'rentables', 'hazard', 'mil', 'pregunta'] as const;
type N = typeof nombres[number];

export const SalidaRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Criterios de salida'], [m('accion'), 'Acción del vendedor, avance del comprador'], [m('criterios2'), 'Los criterios de «Producto evaluado»'],
    [m('importa'), 'Por qué importa'], [m('grafico'), 'Etapas después del cierre'], [m('cuantas'), '¿Cuántas etapas?'], [m('roberge'), 'La prueba de Roberge'], [m('hazard'), 'Tus mejores vendedores'],
  ];

  const CRIT: { n: N; txt: string }[] = [
    { n: 'asistio', txt: 'Asistió a la demo y resolvió dudas' },
    { n: 'agendo', txt: 'Agendó otra reunión' },
    { n: 'respondio', txt: 'Confirmó los pasos por correo' },
  ];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Criterios de salida y etapas después del cierre">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 y 2 · acción, etapa y criterios */}
      <Toma t={t} a={-1} b={m('importa')} zi={1}>
        <Suelo y={720} isDark={isDark} x0={80} x1={600} />
        <Equipo id={ID} k="ven" x={180} y={720} s={0.7} t={t} nombre={false} />
        {t >= m('accion') && <g opacity={e1(t, m('accion'))}><g transform="translate(380 600) scale(0.6)"><Monitor x={0} y={0} w={220} h={140}><rect x={20} y={20} width={180} height={18} rx={9} fill={NARANJA} /><rect x={20} y={56} width={120} height={50} rx={8} fill={AZUL_M} /></Monitor></g><Letrero x={330} y={780} texto="Hace la demo" fondo={NARANJA} id={ID} tam={22} /></g>}
        {t >= m('etapaC') && <g opacity={e1(t, m('etapaC'))}><rect x={700} y={170} width={400} height={90} rx={20} fill={`url(#${ID}-marca)`} /><Txt f="a" x={900} y={225} textAnchor="middle" fontSize={28} fill="#fff" peso={700}>Producto evaluado</Txt></g>}
        {t >= m('corresponden') && <path d="M 500 520 C 600 420 640 300 690 240" stroke={c.apagado} strokeWidth={6} fill="none" strokeDasharray="10 10" opacity={e1(t, m('corresponden'))} />}
        {CRIT.map((cr, k) => t >= m('criterios2') && (
          <g key={cr.n} opacity={e1(t, m('criterios2') + k * 0.2)}>
            <rect x={700} y={300 + k * 100} width={400} height={80} rx={16} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            {t >= m(cr.n) ? <Visto x={740} y={340 + k * 100} r={20} op={e1(t, m(cr.n))} /> : <circle cx={740} cy={340 + k * 100} r={20} fill={c.panel2} />}
            <Txt f="a" x={775} y={348 + k * 100} fontSize={k === 0 ? 20 : 22} fill={c.texto}>{cr.txt}</Txt>
          </g>
        ))}
        {t >= m('frio') && <Letrero x={900} y={640} texto="Nadie pide el cierre en frío" fondo={PIZARRA} id={ID} op={e1(t, m('frio'))} tam={22} />}
      </Toma>

      {/* TOMA 3 · por qué importa */}
      <Toma t={t} a={m('importa')} b={m('grafico')}>
        {t >= m('correo') && <g opacity={e1(t, m('correo'))}>
          <Persona id={ID} x={250} y={620} s={0.7} cuerpo={PIZARRA} corbata />
          <rect x={320} y={300} width={300} height={90} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
          <Txt f="a" x={470} y={352} textAnchor="middle" fontSize={22} fill={c.texto}>«¿Me muestras el correo?»</Txt>
          <g transform="translate(420 520)"><rect x={-60} y={-40} width={120} height={80} rx={10} fill={AMBAR} /><path d="M -60 -36 L 0 8 L 60 -36" stroke="#fff" strokeWidth={4} fill="none" /></g>
        </g>}
        {t >= m('pronostico') && <g opacity={e1(t, m('pronostico'))}>
          {['Ene', 'Feb', 'Mar', 'Abr', 'May'].map((mm, k) => { const h = 21 * 9 * sm(t, m('p21') + k * 0.25, m('p21') + 0.8 + k * 0.25); return <g key={mm}>
            <rect x={730 + k * 80} y={640 - h} width={56} height={h} rx={10} fill={`url(#${ID}-marca)`} />
            <Txt f="a" x={758 + k * 80} y={680} textAnchor="middle" fontSize={20} fill={c.tenue}>{mm}</Txt>
            {h > 10 && <Txt x={758 + k * 80} y={625 - h} textAnchor="middle" fontSize={22} fill={c.texto} peso={800}>21%</Txt>}
          </g>; })}
          <Letrero x={890} y={300} texto="Pronóstico confiable" fondo={VERDE} id={ID} tam={24} />
          {t >= m('mes') && <Letrero x={890} y={740} texto="Se mantiene mes a mes" id={ID} op={e1(t, m('mes'))} tam={22} />}
        </g>}
      </Toma>

      {/* TOMA 4 · etapas posventa */}
      <Toma t={t} a={m('grafico')} b={m('cuantas')}>
        {(() => { const extra = sm(t, m('posventa'), m('posventa') + 1.5); return (
          <g>
            {Array.from({ length: 11 }, (_, k) => {
              const es = k < 8;
              const vis = es ? e1(t, m('termina') + k * 0.1) : sm(extra, (k - 8) / 3, (k - 7) / 3);
              const x = 110 + k * 92;
              return <g key={k} opacity={vis}>
                <circle cx={x} cy={430} r={36} fill={es ? '#94a3b8' : [VIOLETA, AZUL_M, VERDE][k - 8]} />
                <Txt x={x} y={442} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>{k + 1}</Txt>
                {k < 10 && <rect x={x + 36} y={427} width={20} height={6} rx={3} fill={c.apagado} />}
              </g>;
            })}
            {t >= m('termina') && <g opacity={e1(t, m('termina'))}><rect x={830} y={370} width={10} height={120} rx={5} fill={ROJO_M} opacity={1 - extra} /><Letrero x={430} y={300} texto="1 a 8 · hasta cerrado-ganado" fondo={PIZARRA} id={ID} tam={24} /></g>}
            {t >= m('traspaso') && <Letrero x={940} y={560} texto="9 traspaso · 10 implementación" fondo={AZUL_M} id={ID} op={e1(t, m('traspaso'))} tam={22} />}
            {t >= m('marcha') && <Letrero x={980} y={630} texto="11 cliente en marcha" fondo={VERDE} id={ID} op={e1(t, m('marcha'))} tam={22} />}
            {t >= m('venman') && <g opacity={e1(t, m('venman'))}><Equipo id={ID} k="ser" x={300} y={720} s={0.5} t={t} nombre={false} /><Letrero x={430} y={760} texto="¿Cuánto tarda éxito en reaccionar?" fondo={TEAL} id={ID} tam={20} ancla="start" /></g>}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 5 · cuántas etapas, Roberge y Hazard */}
      <Toma t={t} a={m('cuantas')} b={fin + 1}>
        {t < m('roberge') && (
          <g opacity={1 - ac(t, m('roberge') - 0.4, m('roberge'))}>
            {t >= m('pocas') && <g opacity={e1(t, m('pocas'))}>{[0, 1].map((k) => <circle key={k} cx={220 + k * 140} cy={400} r={46} fill="#94a3b8" />)}{Array.from({ length: 6 }, (_, k) => <Hoja key={k} x={190 + (k % 3) * 60} y={520 + Math.floor(k / 3) * 20} w={60} h={40} lineas={1} />)}<Letrero x={290} y={640} texto="Muy pocas: pipeline lleno, sin negocios" fondo={PIZARRA} id={ID} tam={20} /></g>}
            {t >= m('demasiadas') && <g opacity={e1(t, m('demasiadas'))}>{Array.from({ length: 12 }, (_, k) => <circle key={k} cx={700 + (k % 6) * 66} cy={360 + Math.floor(k / 6) * 80} r={26} fill={ROJO_M} opacity={0.7} />)}<Letrero x={865} y={640} texto="Demasiadas: complican la venta" fondo={ROJO_M} id={ID} tam={20} /></g>}
            {t >= m('menos') && <Letrero x={600} y={760} texto="Ante la duda, menos es más" id={ID} op={e1(t, m('menos'))} />}
          </g>
        )}
        {t >= m('roberge') && (
          <g opacity={e1(t, m('roberge'))}>
            <Calendario x={250} y={330} s={0.9} marcados={Math.min(14, Math.floor((t - m('roberge')) * 3))} />
            {t >= m('meses') && <Letrero x={250} y={470} texto="6, 9 o 12 meses después" fondo={PIZARRA} id={ID} tam={22} />}
            {t >= m('ochenta') && <g opacity={e1(t, m('ochenta'))}>{Array.from({ length: 10 }, (_, k) => <Persona key={k} id={ID} x={520 + (k % 5) * 80} y={k < 5 ? 320 : 470} s={0.32} cuerpo={k < 8 ? VERDE : '#94a3b8'} />)}<Letrero x={680} y={530} texto="Promesa cumplida: más del 80 %" fondo={VERDE} id={ID} tam={22} /></g>}
            {t >= m('rentables') && <g opacity={e1(t, m('rentables'))}><Moneda3D x={1020} y={360} r={34} giro={Math.cos(t * 3)} /><Letrero x={1020} y={440} texto="¿Rentables?" fondo={AMBAR} id={ID} tam={22} /></g>}
            {t >= m('hazard') && <g opacity={e1(t, m('hazard'))}>
              {[0, 1].map((k) => <Persona key={k} id={ID} x={320 + k * 80} y={760} s={0.4} cuerpo={NARANJA} corbata />)}
              <Txt x={510} y={740} fontSize={44} fill={c.tenue} peso={800}>+</Txt>
              {Array.from({ length: 14 }, (_, k) => <Persona key={k} id={ID} x={590 + k * 34} y={760} s={0.22} cuerpo={AZUL_M} />)}
              {t >= m('mil') && <Letrero x={760} y={660} texto="1.002 vendedores" id={ID} op={e1(t, m('mil'))} tam={24} />}
            </g>}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
