import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Escalon, Nube, Visto, Cruz, Flecha, Suelo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, GRIS, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Un problema que vale la pena.
 * 1 · La señal: alguien cuenta el problema y otra persona responde «a mí también me pasa».
 * 2 · El orden como escalera: gran problema → quién lo tiene (si solo tú, al psiquiatra) → hablar con ellos → la solución arriba.
 * 3 · Tres historias que empiezan distinto: «nuestro sistema hace…», «resolvemos este problema», «lo que hacemos por ti».
 */

const ID = 'ep03', P = 'ep-problema';

export const ProblemaEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [0.2, 'Cómo se reconoce'], [m('orden'), 'Un orden de cuatro pasos'], [m('muere'), 'Empezar por la solución'], [m('ventaja'), 'La historia'],
    [m('comercial'), 'Dolor antes que características'],
  ];
  const PASOS = [
    { k: 'primero', t: 'Un gran problema', color: NARANJA },
    { k: 'segundo', t: '¿Quién lo tiene?', color: ROSA },
    { k: 'tercero', t: 'Hablar con ellos', color: AZUL_M },
    { k: 'construye', t: 'La solución', color: VERDE },
  ];
  let paso = -1; PASOS.forEach((p, i) => { if (t >= m(p.k)) paso = i; });
  const sube = paso < 0 ? 0 : sm(t, m(PASOS[paso].k), m(PASOS[paso].k) + 1);
  const pos = (i: number): [number, number] => [230 + i * 240, 700 - (i + 1) * 110];
  const [px, py] = paso < 0 ? [140, 700] : (() => { const a = paso > 0 ? pos(paso - 1) : [140, 700] as [number, number]; const b = pos(paso); return [lerp(a[0], b[0], sube), lerp(a[1], b[1], sube) - 50 * Math.sin(Math.PI * sube)]; })();

  const HISTORIAS = [
    { k: 'sistema', t: '«Nuestro sistema hace…»', color: GRIS, ok: false },
    { k: 'resolvemos', t: '«Resolvemos este problema»', color: NARANJA, ok: true },
    { k: 'porti', t: '«Lo que hacemos por ti es…»', color: ROSA, ok: true },
  ];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Un problema que vale la pena">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la señal */}
      <Toma t={t} a={0} b={m('orden')} cy={520}>
        <Suelo y={700} isDark={isDark} x0={160} x1={1040} />
        <Persona id={ID} x={330} y={690} s={1} cuerpo={NARANJA} />
        <Persona id={ID} x={870} y={690} s={1} cuerpo={AZUL_M} />
        <Nube x={330} y={300} s={0.7} t={t} op={e1(t, 0.3)} />
        {t >= m('tambien') - 0.4 && <Burbuja x={580} y={240} w={420} texto="¡A mí también me pasa!" u={sm(t, m('tambien') - 0.4, m('tambien') + 1)} c={c} lado="der" id={ID} marca />}
        {t >= m('tambien') + 1.2 && <Nube x={870} y={300} s={0.7} t={t + 1} op={e1(t, m('tambien') + 1.2)} />}
      </Toma>

      {/* 2 · la escalera del orden */}
      <Toma t={t} a={m('orden')} b={m('ventaja')} cy={500}>
        <Suelo y={700} isDark={isDark} x0={80} x1={1120} />
        {PASOS.map((p, i) => {
          const [x, y] = pos(i);
          return t >= m(p.k) - 0.3 ? <g key={p.k} opacity={e1(t, m(p.k) - 0.3)}>
            <Escalon x={x - 110} y={700} w={220} h={700 - y} color={p.color} />
            <Letrero x={x} y={y + 60} texto={p.t} fondo="#00000055" id={ID} tam={26} />
          </g> : null;
        })}
        <Persona id={ID} x={px} y={py} s={0.55} cuerpo={VERDE} />
        {t >= m('solotu') && t < m('tercero') && <g opacity={e1(t, m('solotu'))}>
          <Cruz x={780} y={290} r={34} />
          <Letrero x={780} y={360} texto="Si solo tú: al psiquiatra" fondo={GRIS} id={ID} tam={26} />
        </g>}
        {t >= m('tercero') && !movil && [0, 1, 2].map((k) => <Persona key={k} id={ID} x={620 + k * 60} y={360} s={0.35} cuerpo={['#94a3b8', '#64748b', '#94a3b8'][k]} />)}
        {t >= m('muere') && <g opacity={e1(t, m('muere'))}>
          <Flecha x1={1060} y1={230} x2={260} y2={230} u={sm(t, m('muere'), m('muere') + 1)} color={GRIS} grosor={10} punteada />
          <Letrero x={660} y={180} texto="Empezar al revés: nadie la quiere" fondo={GRIS} id={ID} tam={26} />
        </g>}
      </Toma>

      {/* 3 · tres historias */}
      <Toma t={t} a={m('ventaja')} b={fin + 1} cy={460}>
        {HISTORIAS.map((h, i) => t >= m(h.k) - 0.3 && (
          <g key={h.k} opacity={e1(t, m(h.k) - 0.3)} transform={`translate(600 ${230 + i * 160})`}>
            <rect x={-420} y={-56} width={840} height={112} rx={28} fill={c.panel} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
            <rect x={-420} y={-56} width={18} height={112} rx={9} fill={h.color} />
            <Txt f="a" x={-370} y={12} fontSize={36} fill={c.texto}>{h.t}</Txt>
            {h.ok ? <Visto x={350} y={0} r={30} /> : <Cruz x={350} y={0} r={30} />}
          </g>
        ))}
        {t >= m('comercial') && <Letrero x={600} y={760} texto="Presenta el dolor del cliente" id={ID} op={e1(t, m('comercial'))} />}
        {t >= m('cadadia') && !movil && <Txt f="a" x={600} y={820} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={e1(t, m('cadadia'))}>¿Avanzamos hoy hacia eliminarlo?</Txt>}
      </Toma>
    </Lienzo>
  );
};
