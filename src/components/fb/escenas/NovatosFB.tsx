import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Estrella, Diana, Cifra, Moneda3D, Engranaje, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Novatos y expertos. Toma 1: una escalera de aprendizaje con el alumno que empieza abajo y el avanzado arriba; en
 * la pizarra de francés, al primero le marcan lo que hizo bien (estrellas) y al segundo sus errores (círculos rojos).
 * Toma 2: el experimento ambiental: 25 dólares en monedas, donaciones según el feedback; las barras se cruzan.
 * Toma 3: en el equipo: el ejecutivo de dos meses recibe estrellas; la vendedora de diez años, un blanco preciso; la
 * operaria que aprende la máquina y el técnico que la repara. Cierra con tacto y un consejo útil.
 */

const ID = 'fb04', P = 'fb-novatos';

export const NovatosFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('mismo'), 'No todos necesitan lo mismo'], [m('frances'), 'Alumnos de francés'], [m('ambiente'), 'Expertos y novatos'],
    [m('negativo'), 'Con feedback negativo'], [m('positivo'), 'Con feedback positivo'], [m('animo'), 'Al que empieza: ánimo'],
    [m('domina'), 'Al que domina: precisión'], [m('ejecutivo'), 'En tu equipo'], [m('tacto'), 'Con tacto y un consejo'],
  ];
  const DATOS = [
    // [grupo, valor, color, momento]
    ['negativo', 'Expertas', 8.53, NARANJA], ['negativo', 'Novatas', 1.24, AZUL_M],
    ['positivo', 'Novatas', 8.31, AZUL_M], ['positivo', 'Expertas', 2.92, NARANJA],
  ] as const;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Novatos y expertos">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · la escalera y la clase de francés */}
      <TomaFB t={t} a={0} b={m('ambiente')} cy={500}>
        {[0, 1, 2, 3].map((k) => <rect key={k} x={140 + k * 110} y={720 - (k + 1) * 60} width={110} height={(k + 1) * 60} fill={c.apagado} opacity={0.6 + k * 0.1} />)}
        <Persona id={ID} x={195} y={660} s={0.9} cuerpo={AZUL_M} ojos={t >= m('empezaban') + 1 ? 1 : 0.8} />
        <Persona id={ID} x={525} y={480} s={0.9} cuerpo={NARANJA} />
        <Txt x={195} y={760} textAnchor="middle" fontSize={28} fill={c.texto}>Empieza</Txt>
        <Txt x={525} y={300} textAnchor="middle" fontSize={28} fill={c.texto}>Avanzado</Txt>
        {t >= m('frances') && (
          <g opacity={e1(t, m('frances'))}>
            <rect x={680} y={180} width={440} height={300} rx={18} fill="#14532d" />
            <rect x={680} y={480} width={440} height={14} rx={6} fill="#a16b3f" />
            <Txt f="a" x={720} y={260} fontSize={40} fill="#f8fafc">Je suis allé…</Txt>
            <Txt f="a" x={720} y={340} fontSize={40} fill="#f8fafc">Nous avons…</Txt>
            <Txt f="a" x={720} y={420} fontSize={40} fill="#f8fafc">Ils sont…</Txt>
            {t >= m('empezaban') && [0, 1].map((k) => <Estrella key={k} x={1050} y={250 + k * 80} r={22} fill="#fde047" op={e1(t, m('empezaban') + k * 0.4)} rot={t * 20} />)}
            {t >= m('avanzados') && <ellipse cx={830} cy={406} rx={70} ry={30} fill="none" stroke={ROJO_M} strokeWidth={6} strokeDasharray={300} strokeDashoffset={300 * (1 - sm(t, m('avanzados'), m('avanzados') + 1))} />}
            <Txt x={900} y={560} textAnchor="middle" fontSize={28} fill={c.texto} opacity={vent(t, m('empezaban'), m('avanzados'))}>Lo que hace bien</Txt>
            {t >= m('avanzados') && <Txt x={900} y={560} textAnchor="middle" fontSize={28} fill={ROJO_M} opacity={e1(t, m('avanzados') + 0.4)}>Sus errores</Txt>}
          </g>
        )}
      </TomaFB>

      {/* 2 · el experimento de las donaciones */}
      <TomaFB t={t} a={m('ambiente')} b={m('animo')} cy={480}>
        {vent(t, m('ambiente'), m('negativo')) > 0.01 && (
          <g opacity={vent(t, m('ambiente'), m('negativo'))}>
            <Persona id={ID} x={420} y={680} s={1} cuerpo={NARANJA} />
            <Persona id={ID} x={560} y={680} s={0.95} cuerpo={AZUL_M} />
            <Txt x={490} y={750} textAnchor="middle" fontSize={28} fill={c.texto}>Expertas y novatas</Txt>
            {t >= m('donar') && (
              <g opacity={e1(t, m('donar'))}>
                {[0, 1, 2, 3, 4].map((k) => <Moneda3D key={k} x={820 + (k % 3) * 60} y={460 - Math.floor(k / 3) * 50} r={26} />)}
                <Cifra x={880} y={600} valor={25} u={1} pre="US$ " tam={60} color={VERDE} />
                <Txt x={880} y={650} textAnchor="middle" fontSize={28} fill={c.texto}>para donar</Txt>
              </g>
            )}
          </g>
        )}
        {t >= m('negativo') && DATOS.map(([g, nom, v, col], k) => {
          const t0 = m(g) + (k % 2) * 0.6, o = e1(t, t0);
          const x = 220 + k * 250 + (k >= 2 ? 40 : 0);
          const h = 380 * (v / 9) * sm(t, t0, t0 + 1);
          return o > 0.01 ? (
            <g key={k} opacity={o}>
              <rect x={x - 70} y={660 - h} width={140} height={h} rx={14} fill={col} />
              <Cifra x={x} y={640 - h} valor={v} u={sm(t, t0, t0 + 1)} dec={2} tam={40} color={col} />
              <Txt x={x} y={700} textAnchor="middle" fontSize={28} fill={c.texto}>{nom}</Txt>
            </g>
          ) : null;
        })}
        {t >= m('negativo') && <Txt x={345} y={760} textAnchor="middle" fontSize={30} fill={ROJO_M} opacity={e1(t, m('negativo'))}>Negativo</Txt>}
        {t >= m('positivo') && <Txt x={885} y={760} textAnchor="middle" fontSize={30} fill={VERDE} opacity={e1(t, m('positivo'))}>Positivo</Txt>}
        {t >= m('negativo') && !movil && <Txt f="a" x={600} y={190} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('negativo'))}>Dólares donados en promedio, de 25</Txt>}
      </TomaFB>

      {/* 3 · en el equipo */}
      <TomaFB t={t} a={m('animo')} b={fin + 1} cy={480}>
        <Suelo y={700} isDark={isDark} x0={80} x1={1120} />
        <line x1={600} y1={180} x2={600} y2={700} stroke={c.apagado} strokeWidth={4} strokeDasharray="10 12" />
        {/* el que empieza */}
        <Persona id={ID} x={300} y={700} s={1} cuerpo={AZUL_M} ojos={1} />
        {[0, 1, 2].map((k) => { const u = ((t - m('animo')) * 0.5 + k / 3) % 1; return t >= m('animo') ? <Estrella key={k} x={lerp(180, 300, u)} y={lerp(300, 500, u)} r={18} fill="#fde047" op={Math.min(1, (1 - u) * 4)} rot={u * 200} /> : null; })}
        <Txt x={300} y={770} textAnchor="middle" fontSize={28} fill={c.texto}>{t >= m('ejecutivo') ? 'Ejecutivo, 2 meses' : 'Empieza'}</Txt>
        {t >= m('maquina') && <g opacity={e1(t, m('maquina'))}><Engranaje x={440} y={600} r={50} t={t} color={GRIS} hueco={c.panel} /></g>}
        {/* el que domina */}
        {t >= m('domina') && (
          <g opacity={e1(t, m('domina'))}>
            <Persona id={ID} x={900} y={700} s={1} cuerpo={NARANJA} />
            <Diana x={1040} y={360} r={70} u={sm(t, m('domina') + 0.5, m('domina') + 1.3)} />
            <Txt x={900} y={770} textAnchor="middle" fontSize={28} fill={c.texto}>{t >= m('cartera') ? 'Vendedora, 10 años' : 'Domina'}</Txt>
          </g>
        )}
        {t >= m('ejecutivo') && <Txt x={300} y={240} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('ejecutivo'))}>Lo que hizo bien</Txt>}
        {t >= m('cartera') && <Txt x={850} y={240} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('cartera'))}>Qué le cuesta cierres</Txt>}
        {t >= m('tacto') && <Letrero x={600} y={130} texto="Con tacto y un consejo útil" id={ID} tam={30} op={e1(t, m('tacto'))} />}
      </TomaFB>
    </Lienzo>
  );
};
