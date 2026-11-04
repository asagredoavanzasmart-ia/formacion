import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Fajo, Calendario, Nube, Edificio, Suelo, Ficha, PantallaCRM, Libro, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Portada. Toma 1: el CRM como una pantalla cara que, sola, no vende: el gerente lo mira, se le van años y dinero;
 * aparece la sigla y las fichas de los clientes entran a la pantalla (registra, ordena, aprovecha).
 * Toma 2: el camino de las pymes con seis baches, uno por error, y el CRM que los va saltando.
 * Toma 3: los dos libros de los autores y lo que trae cada error: evidencia, ejemplo y táctica.
 */

const ID = 'cp01', P = 'cp-portada';

export const PortadaCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('novende'), 'No vende por sí solo'], [m('sigla'), 'Customer Relationship Management'], [m('registra'), 'Registra, ordena, aprovecha'],
    [m('seis'), 'Seis errores que se repiten'], [m('autores'), 'Dos autores'], [m('evidencia'), 'Evidencia, ejemplo y táctica'],
  ];
  const fichas = [0, 1, 2].map((k) => sm(t, m('registra') + 0.5 * k, m('registra') + 0.5 * k + 1.1));
  const mods = fichas.filter((u) => u >= 1).length;
  const avance = sm(t, m('seis') + 0.4, m('autores') - 0.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="CRM en pymes">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la pantalla que sola no vende */}
      <Toma t={t} a={0} b={m('seis')} cy={560}>
        <Suelo y={752} isDark={isDark} />
        <Persona id={ID} x={230} y={750} s={0.9} corbata cuerpo={VIOLETA} />
        <PantallaCRM x={720} y={746} n={mods} isDark={isDark} t={t} />
        {t < m('dinero') && <g opacity={e1(t, 0.3)}>{[0, 1, 2].map((k) => <Txt key={k} x={890 + k * 34} y={380 - k * 34 - 8 * Math.sin(t * 2 + k)} fontSize={34 + k * 8} fill={c.tenue}>z</Txt>)}</g>}
        {ventana(t, m('dinero'), m('registra')) > 0.01 && (
          <g opacity={ventana(t, m('dinero'), m('registra'))}>
            <Nube x={230} y={300} s={0.5} t={t} />
            <g transform={`translate(${lerp(1060, 760, sm(t, m('dinero') + 0.3, m('dinero') + 1.6))} ${lerp(600, 560, sm(t, m('dinero') + 0.3, m('dinero') + 1.6))})`} opacity={1 - sm(t, m('dinero') + 1.4, m('dinero') + 1.8)}><Fajo x={0} y={0} n={4} w={110} /></g>
            <Calendario x={1060} y={330} s={0.9} marcados={Math.min(12, Math.floor((t - m('dinero')) * 3))} />
          </g>
        )}
        {ventana(t, m('sigla'), m('registra')) > 0.01 && (
          <g opacity={ventana(t, m('sigla'), m('registra'))}>
            {['C', 'R', 'M'].map((l, k) => <Txt key={l} x={640 + k * 80} y={600} textAnchor="middle" fontSize={96} fill={k === 0 ? NARANJA : k === 1 ? ROSA : '#ffffff'} opacity={e1(t, m('sigla') + 0.25 * k)}>{l}</Txt>)}
          </g>
        )}
        {t >= m('registra') && fichas.map((u, k) => u < 1 && <Ficha key={k} x={lerp(300, 640 + (k % 3) * 98, u)} y={lerp(600, 520, u) - 120 * Math.sin(Math.PI * u)} s={lerp(1, 0.6, u)} rot={lerp(-12, 0, u)} color={[NARANJA, ROSA, AZUL_M][k]} />)}
        {t >= m('registra') && <Letrero x={720} y={812} texto={t >= m('registra') + 2.2 ? 'Registra, ordena y aprovecha' : t >= m('registra') + 1.1 ? 'Registra y ordena' : 'Registra'} id={ID} tam={28} op={e1(t, m('registra'))} />}
      </Toma>

      {/* 2 · el camino de las pymes con seis baches */}
      <Toma t={t} a={m('seis')} b={m('autores')} cy={520}>
        {[200, 380, 560, 760, 960].map((x, k) => <Edificio key={x} x={x} y={330} w={90} h={110 + (k % 3) * 30} color={[AZUL_M, VIOLETA, '#475569', VERDE, ROSA][k]} op={e1(t, m('seis') - 0.6 + 0.12 * k)} />)}
        <path d="M 80 560 C 300 520 500 600 700 560 S 1000 520 1120 560" stroke={isDark ? '#3a3f47' : '#dfe3e8'} strokeWidth={70} fill="none" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const x = 170 + k * 170, y = 560 + 18 * Math.sin(k * 1.3);
          return (
            <g key={k} opacity={e1(t, m('seis') + 0.25 * k)}>
              <ellipse cx={x} cy={y} rx={42} ry={14} fill={isDark ? '#111' : '#9aa3ad'} />
              <circle cx={x} cy={y + 80} r={26} fill={`url(#${ID}-marca)`} />
              <Txt x={x} y={y + 91} textAnchor="middle" fontSize={30} fill="#fff">{k + 1}</Txt>
            </g>
          );
        })}
        {(() => {
          const x = lerp(90, 1100, avance);
          const salto = Math.abs(Math.sin(avance * Math.PI * 6)) * 40;
          return <g transform={`translate(${x} ${520 - salto})`}><PantallaCRM x={0} y={0} s={0.28} n={3} isDark={isDark} /></g>;
        })()}
        <Letrero x={600} y={790} texto="Empresas pequeñas y medianas" id={ID} tam={28} op={e1(t, m('seis') + 0.6)} />
      </Toma>

      {/* 3 · los dos autores y lo que trae cada error */}
      <Toma t={t} a={m('autores')} b={fin + 1} cy={500}>
        <Libro x={330} y={600} color="#b4232a" titulo="CRM" autor="Pedro Reinares" c={c} op={e1(t, m('reinares'))} />
        <Libro x={870} y={600} color="#1d4fbf" titulo="CRM" autor="Frederick Newell" c={c} op={e1(t, m('newell'))} />
        {!movil && <Txt f="a" x={330} y={690} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('reinares') + 0.4)}>Los cien errores del CRM</Txt>}
        {!movil && <Txt f="a" x={870} y={690} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('newell') + 0.4)}>Why CRM Doesn't Work</Txt>}
        {(['evidencia', 'ejemplo', 'tactica'] as const).map((n, k) => (
          <Letrero key={n} x={260 + k * 340} y={792} texto={['Evidencia', 'Ejemplo', 'Táctica'][k]} fondo={[AZUL_M, VERDE, undefined][k]} id={ID} tam={28} op={e1(t, m(n))} />
        ))}
        {!movil && <Txt f="a" x={600} y={250} textAnchor="middle" fontSize={22} fill={GRIS} opacity={e1(t, m('autores'))}>Dos autores que estudiaron el fracaso del CRM</Txt>}
      </Toma>
    </Lienzo>
  );
};
