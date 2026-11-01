import React from 'react';
import { useMovil, Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Tabla, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Calendario, Hoja, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Gobierno de datos», en cuatro tomas.
 * 1 · Un marco que cuida los datos: disponibilidad, usabilidad, integridad y seguridad, con normas de acceso; RevOps lo encabeza.
 * 2 · La torre: sin reglas, las piezas se desalinean y al sacar una se cae (el CRM de 10 años de Corbett); con gobierno, simple y estable.
 * 3 · El diccionario de datos: columnas por sistema; un mismo dato con nombres distintos; la fila elegida muestra hacia dónde se sincroniza.
 * 4 · Controles mínimos, quitar complejidad y el método de Semple: quien pide un campo lo reporta cada semana; si se abandona, se borra.
 */

const ID = 'ro33';
const nombres = ['marco', 'disponibilidad', 'normas', 'encabezar', 'torre', 'sinReglas', 'tambalean', 'cae', 'conGob', 'simple', 'corbett', 'crm10', 'arriesgaba', 'diccionario', 'columnas', 'registro', 'filas', 'zip', 'region', 'nombre', 'monto', 'seleccionada', 'direccion', 'causa', 'controles', 'borrar', 'obligatorios', 'responsable', 'regla', 'quitar', 'mantenimiento', 'semple', 'reportarlo', 'abandonarse', 'elimina', 'pregunta'] as const;
type N = typeof nombres[number];

export const GobiernoRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);
  const movil = useMovil();

  const rotulos: [number, string][] = [
    [0.2, 'Gobierno de datos'], [m('encabezar'), 'RevOps lo encabeza'], [m('torre'), 'La torre'], [m('conGob'), 'Con gobierno'], [m('corbett'), 'Un CRM de 10 años'],
    [m('diccionario'), 'El diccionario de datos'], [m('filas'), 'Un dato, muchos nombres'], [m('causa'), 'La causa de las inconsistencias'],
    [m('controles'), 'Controles mínimos'], [m('regla'), 'Quitar complejidad'], [m('semple'), 'El método de Semple'],
  ];

  /* torre de 8 pisos de 3 bloques */
  const orden = sm(t, m('conGob'), m('conGob') + 1.5) * (1 - sm(t, m('corbett'), m('corbett') + 1)) + (t >= m('arriesgaba') ? 0 : 0);
  const sacar = t >= m('cae') && t < m('conGob') ? sm(t, m('cae'), m('cae') + 1) : t >= m('arriesgaba') ? sm(t, m('arriesgaba'), m('arriesgaba') + 1) : 0;
  const desorden = (1 - orden) * (t >= m('sinReglas') ? 1 : 0.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Gobierno de datos">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · el marco */}
      <Toma t={t} a={-1} b={m('torre')} zi={1}>
        <g opacity={e1(t, m('marco'))}>
          {[0, 1, 2].map((q) => <ellipse key={q} cx={600} cy={470 - q * 40} rx={140} ry={42} fill={AZUL_M} opacity={1 - q * 0.15} />)}
          <path d="M 600 220 L 800 290 V 470 Q 800 640 600 720 Q 400 640 400 470 V 290 Z" fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={12} />
        </g>
        {t >= m('disponibilidad') && ['Disponibilidad', 'Usabilidad', 'Integridad', 'Seguridad'].map((txt, k) => <g key={txt} opacity={e1(t, m('disponibilidad') + k * 0.5)}><Letrero x={k < 2 ? 230 : 970} y={330 + (k % 2) * 160} texto={txt} fondo={[VERDE, AMBAR, VIOLETA, ROJO_M][k]} id={ID} tam={24} /></g>)}
        {t >= m('normas') && <g opacity={e1(t, m('normas'))}><rect x={572} y={560} width={56} height={46} rx={8} fill={PIZARRA} /><path d="M 584 560 v -18 a 16 16 0 0 1 32 0 v 18" stroke={PIZARRA} strokeWidth={8} fill="none" /><Letrero x={600} y={780} texto="Normas y políticas de acceso" fondo={PIZARRA} id={ID} tam={22} /></g>}
        {t >= m('encabezar') && <g opacity={e1(t, m('encabezar'))}><Equipo id={ID} k="ops" x={1000} y={760} s={0.5} t={t} nombre={false} /></g>}
      </Toma>

      {/* TOMA 2 · la torre */}
      <Toma t={t} a={m('torre')} b={m('diccionario')}>
        <Suelo y={720} isDark={isDark} x0={300} x1={900} />
        {Array.from({ length: 8 }, (_, piso) => {
          const caePiso = sacar > 0 && piso >= 4 ? sacar : 0;
          const tamb = desorden * 6 * Math.sin(t * 3 + piso);
          return Array.from({ length: 3 }, (_, b) => {
            const falta = piso === 3 && b === 1 && sacar > 0;
            if (falta && sacar > 0.5) return null;
            const dx = (b - 1) * 72 + desorden * ((piso * 37 + b * 13) % 30 - 15) + tamb + caePiso * (b - 1 + (piso - 4)) * 60;
            const dy = caePiso * caePiso * 260 * (1 + (piso - 4) * 0.2);
            const rot = desorden * ((piso * 11 + b * 7) % 10 - 5) + caePiso * (b - 1) * 50;
            return <rect key={`${piso}-${b}`} x={600 + dx - 34 + (falta ? sacar * 200 : 0)} y={690 - piso * 46 + Math.min(dy, 260)} width={68} height={42} rx={6} fill={[AMBAR, NARANJA, '#f59e0b'][(piso + b) % 3]} transform={`rotate(${rot} ${600 + dx} ${711 - piso * 46})`} opacity={1 - caePiso * 0.4} />;
          });
        })}
        {t >= m('sinReglas') && t < m('conGob') && <Letrero x={600} y={200} texto="Sin reglas: sacas una pieza y se cae" fondo={ROJO_M} id={ID} op={e1(t, m('sinReglas'))} tam={22} />}
        {t >= m('conGob') && t < m('corbett') && <Letrero x={600} y={200} texto="Con gobierno: simple y estable" fondo={VERDE} id={ID} op={e1(t, m('conGob'))} tam={22} />}
        {t >= m('crm10') && <Letrero x={600} y={200} texto="10 años de personalizaciones apiladas" fondo={PIZARRA} id={ID} op={e1(t, m('crm10'))} tam={22} />}
      </Toma>

      {/* TOMA 3 · el diccionario */}
      <Toma t={t} a={m('diccionario')} b={m('controles')}>
        {(() => {
          const filas = [
            ['Dato', 'CRM', 'Marketing', 'Facturación', 'Registro'],
            ['Código postal', 'Código postal', 'ZIP', 'C. postal', 'CRM'],
            ['Región', 'Región', 'Estado', 'Región', 'CRM'],
            ['Nombre', 'Nombre + apellido', 'Nombre completo', 'Nombre', 'CRM'],
            ['Monto', 'Monto', '—', 'Total facturado', 'Facturación'],
          ];
          const n = 1 + [m('zip'), m('region'), m('nombre'), m('monto')].filter((x) => t >= x).length;
          const sel = t >= m('seleccionada') ? 4 : -1;
          return (
            <g>
              <Tabla x={110} y={210} cols={[200, 220, 200, 200, 160]} filas={filas.slice(0, t >= m('columnas') ? n : 1)} alto={70} c={c} resaltar={sel} tam={20} op={e1(t, m('diccionario'))} soloMovil={[0, 2]} />
              {t >= m('registro') && !movil && <g opacity={e1(t, m('registro'))}><rect x={928} y={204} width={164} height={82} rx={14} fill="none" stroke={VIOLETA} strokeWidth={5} /></g>}
              {t >= m('direccion') && (() => { const u = ((t - m('direccion')) * 0.4) % 1; return <g opacity={e1(t, m('direccion'))}><path d="M 820 620 Q 600 720 380 620" stroke={VIOLETA} strokeWidth={6} fill="none" strokeDasharray="10 10" /><circle cx={lerp(820, 380, u)} cy={620 + 75 * Math.sin(Math.PI * u)} r={12} fill={VIOLETA} /><Letrero x={600} y={760} texto="Facturación → CRM" fondo={VIOLETA} id={ID} tam={22} /></g>; })()}
              {t >= m('causa') && <Letrero x={600} y={160} texto="Un dato, muchos nombres: inconsistencias" fondo={ROJO_M} id={ID} op={e1(t, m('causa'))} tam={20} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 4 · controles, simpleza y el método de Semple */}
      <Toma t={t} a={m('controles')} b={fin + 1}>
        {t < m('semple') && (
          <g opacity={1 - ac(t, m('semple') - 0.4, m('semple'))}>
            {([['borrar', 'No todos borran ni crean', ROJO_M], ['obligatorios', 'Campos obligatorios', AMBAR], ['responsable', 'Cada sincronización: dirección y dueño', VIOLETA]] as [N, string, string][]).map(([n, txt, col], k) => t >= m(n) && (
              <g key={n} opacity={e1(t, m(n))}>
                <rect x={140} y={200 + k * 130} width={520} height={100} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                <circle cx={200} cy={250 + k * 130} r={30} fill={col} />
                <Txt f="a" x={250} y={258 + k * 130} fontSize={k === 2 ? 20 : 24} fill={c.texto}>{txt}</Txt>
              </g>
            ))}
            {t >= m('quitar') && (() => { const q = sm(t, m('quitar'), m('quitar') + 2); return (
              <g opacity={e1(t, m('quitar'))}>
                {Array.from({ length: 9 }, (_, k) => { const sale = k % 3 !== 0; return <rect key={k} x={760 + (k % 3) * 100 + (sale ? q * 160 : 0)} y={260 + Math.floor(k / 3) * 100 - (sale ? q * 60 : 0)} width={80} height={80} rx={12} fill={sale ? '#94a3b8' : NARANJA} opacity={sale ? 1 - q : 1} />; })}
                <Letrero x={880} y={600} texto="La simplicidad se consigue quitando" id={ID} tam={22} />
              </g>
            ); })()}
            {t >= m('mantenimiento') && <Letrero x={880} y={680} texto="Cada personalización: más mantenimiento" fondo={PIZARRA} id={ID} op={e1(t, m('mantenimiento'))} tam={20} />}
          </g>
        )}
        {t >= m('semple') && (
          <g opacity={e1(t, m('semple'))}>
            <Persona id={ID} x={220} y={680} s={0.7} cuerpo={AMBAR} />
            <rect x={320} y={350} width={240} height={90} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            <Txt f="a" x={440} y={402} textAnchor="middle" fontSize={22} fill={c.texto}>«Quiero un campo nuevo»</Txt>
            {t >= m('reportarlo') && (() => { const semanas = Math.min(12, Math.floor((t - m('reportarlo')) * 2)); const deja = t >= m('abandonarse'); return (
              <g>
                {Array.from({ length: semanas }, (_, k) => <Hoja key={k} x={640 + (k % 6) * 66} y={300 + Math.floor(k / 6) * 100} w={54} h={70} lineas={3} color={deja && k >= 6 ? '#cbd5e1' : AMBAR} op={deja && k >= 6 ? 0.4 : 1} />)}
                <Letrero x={820} y={540} texto={deja ? 'A los 5 o 6 meses, nadie lo mira' : 'Lo reporta cada semana'} fondo={deja ? PIZARRA : AMBAR} id={ID} tam={22} />
              </g>
            ); })()}
            {t >= m('elimina') && <g opacity={e1(t, m('elimina'))}><rect x={700} y={620} width={240} height={70} rx={16} fill={ROJO_M} /><Txt f="a" x={820} y={664} textAnchor="middle" fontSize={24} fill="#fff" peso={700} textDecoration="line-through">Campo nuevo</Txt><Letrero x={820} y={740} texto="Entonces se borra" fondo={ROJO_M} id={ID} tam={22} /></g>}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
