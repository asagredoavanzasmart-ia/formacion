import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, PantallaCRM, Moneda3D, Calendario, Hoja, Ficha, Edificio, Curva, Medidor, Visto, Cruz, Flujo, Nube, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Táctica: que el CRM devuelva algo.
 * Toma 1: las tres partes — la moneda que va a formación, los usuarios piloto con su insignia, y el flujo que vuelve
 * del sistema al usuario (agenda de seguimiento, historial del equipo): con beneficio registra, sin él deja de hacerlo.
 * Toma 2 (ejemplos ilustrativos): en el transporte, llamadas que no se hicieron y un gráfico perfecto con niebla
 * detrás; en la inmobiliaria, la lista de quienes esperan respuesta, el agente que registra porque le conviene y el
 * gerente que revisa a su lado.
 * Toma 3: tres medidores mensuales que suben: registro sin que lo pidan, decisiones con datos, reclamos resueltos.
 */

const ID = 'cp15', P = 'cp-adopcion';

export const AdopcionCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('presupuestar'), 'Presupuestar la formación'], [m('piloto'), 'Usuarios piloto'], [m('devuelva'), 'Que el sistema devuelva algo'], [m('beneficio'), 'Con beneficio, registra'],
    [m('transporte'), 'Cómo no hacerlo'], [m('inmobiliaria'), 'La versión que funciona'], [m('razon'), 'Cambió la razón'], [m('senales'), 'Tres señales'],
  ];
  const SEN: [string, string][] = [['sinpedir', 'Registran solos'], ['reunion', 'Deciden con datos'], ['reclamos', 'Reclamos resueltos']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Que el CRM devuelva algo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · las tres partes */}
      <Toma t={t} a={0} b={m('transporte')} cy={500}>
        <PantallaCRM x={600} y={620} s={0.65} n={6} isDark={isDark} />
        {/* formación */}
        <g opacity={e1(t, m('presupuestar'))}>
          <g transform="translate(200 360)"><rect x={-80} y={-60} width={160} height={110} rx={14} fill={AZUL_M} /><path d="M -90 -60 L 0 -100 L 90 -60 Z" fill="#1d4fbf" /><rect x={-10} y={-20} width={20} height={70} fill="#fff" opacity={0.6} /></g>
          <Moneda3D x={lerp(600, 200, sm(t, m('presupuestar') + 0.3, m('presupuestar') + 1.3))} y={lerp(380, 290, sm(t, m('presupuestar') + 0.3, m('presupuestar') + 1.3))} r={26} />
          <Txt f="a" x={200} y={460} textAnchor="middle" fontSize={26} fill={c.texto}>Formación</Txt>
        </g>
        {/* piloto */}
        {t >= m('piloto') && (
          <g opacity={e1(t, m('piloto'))}>
            {[0, 1].map((k) => <g key={k}><Persona id={ID} x={950 + k * 120} y={480} s={0.55} cuerpo={[TEAL, NARANJA][k]} /><g transform={`translate(${950 + k * 120} 330)`}><path d="M 0 -18 L 5 -6 L 18 -6 L 8 2 L 12 16 L 0 8 L -12 16 L -8 2 L -18 -6 L -5 -6 Z" fill={AMBAR} /></g></g>)}
            <Txt f="a" x={1010} y={530} textAnchor="middle" fontSize={26} fill={c.texto}>Usuarios piloto</Txt>
          </g>
        )}
        {/* lo que devuelve */}
        {t >= m('devuelva') && (
          <g opacity={e1(t, m('devuelva'))}>
            <Persona id={ID} x={600} y={800} s={0.5} corbata cuerpo={VIOLETA} />
            <Flujo x1={600} y1={630} x2={600} y2={720} t={t} n={4} arco={0} color={[VERDE, NARANJA]} />
            {t >= m('agenda') && <Calendario x={380} y={700} s={0.6} marcados={4} op={e1(t, m('agenda'))} />}
            {t >= m('historial') && <Hoja x={770} y={640} w={90} h={116} lineas={5} op={e1(t, m('historial'))} />}
          </g>
        )}
        {t >= m('beneficio') && <Letrero x={600} y={175} texto={t >= m('deja') ? 'Sin beneficio, deja de registrar' : 'Con beneficio, registra'} fondo={t >= m('deja') ? ROSA : VERDE} id={ID} tam={28} op={e1(t, m('beneficio'))} />}
      </Toma>

      {/* 2 · cómo no hacerlo y la versión que funciona */}
      <Toma t={t} a={m('transporte')} b={m('senales')} cy={480}>
        {ventana(t, m('transporte'), m('inmobiliaria')) > 0.01 && (
          <g opacity={ventana(t, m('transporte'), m('inmobiliaria'))}>
            <g transform="translate(220 640)"><rect x={-130} y={-90} width={200} height={90} rx={12} fill={AMBAR} /><rect x={70} y={-60} width={70} height={60} rx={10} fill="#fbbf24" />{[-80, 90].map((wx) => <circle key={wx} cx={wx} cy={0} r={22} fill="#1f2937" />)}</g>
            {t >= m('todas') && [0, 1, 2, 3].map((k) => <g key={k} opacity={e1(t, m('todas') + 0.3 * k)}><Hoja x={420 + k * 60} y={300 + (k % 2) * 30} w={80} h={104} rot={(k - 1.5) * 6} lineas={4} />{t >= m('nohicieron') && <Cruz x={420 + k * 60} y={390} r={16} />}</g>)}
            {t >= m('perfectos') && (
              <g opacity={e1(t, m('perfectos'))}>
                <rect x={760} y={260} width={340} height={260} rx={14} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                <Curva pts={[[790, 480], [870, 430], [950, 380], [1030, 330], [1080, 290]]} u={sm(t, m('perfectos'), m('perfectos') + 1)} color={VERDE} grosor={8} />
                <Nube x={930} y={600} s={0.6} t={t} rayos={false} />
              </g>
            )}
            {t >= m('perfectos') && <Letrero x={600} y={790} texto="Números perfectos, clientes desconocidos" fondo={ROJO_M} id={ID} tam={26} op={e1(t, m('perfectos') + 0.5)} />}
          </g>
        )}
        {t >= m('inmobiliaria') && (
          <g opacity={e1(t, m('inmobiliaria'))}>
            <g transform="translate(180 640)"><path d="M -100 0 V -130 L 0 -200 L 100 -130 V 0 Z" fill={VERDE} /><rect x={-26} y={-70} width={52} height={70} rx={6} fill="#fff" opacity={0.8} /></g>
            {t >= m('lista') && (
              <g opacity={e1(t, m('lista'))} transform="translate(520 380)">
                <rect x={-130} y={-140} width={260} height={290} rx={14} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                {[0, 1, 2, 3].map((k) => <g key={k}><circle cx={-90} cy={-90 + k * 64} r={16} fill="#f7c4a0" /><rect x={-60} y={-98 + k * 64} width={150} height={14} rx={7} fill={c.panel2} /><circle cx={100} cy={-90 + k * 64} r={8} fill={AMBAR} /></g>)}
              </g>
            )}
            {t >= m('conviene') && <g opacity={e1(t, m('conviene'))}><Persona id={ID} x={800} y={760} s={0.8} cuerpo={NARANJA} /><Visto x={800} y={500} r={28} /></g>}
            {t >= m('vigilarlo') && <g opacity={e1(t, m('vigilarlo'))}><Persona id={ID} x={960} y={760} s={0.8} corbata cuerpo={VIOLETA} /></g>}
            {t >= m('razon') && <Letrero x={600} y={812} texto="El sistema no cambió: cambió la razón" id={ID} tam={28} op={e1(t, m('razon'))} />}
          </g>
        )}
      </Toma>

      {/* 3 · tres señales */}
      <Toma t={t} a={m('senales')} b={fin + 1} cy={480}>
        {SEN.map(([n, rot2], k) => {
          const x = 220 + k * 380;
          return (
            <g key={n} opacity={e1(t, m(n))}>
              <Medidor x={x} y={520} r={130} v={lerp(0.15, 0.85, sm(t, m(n) + 0.3, m(n) + 2))} color={VERDE} c={c} />
              <Letrero x={x} y={movil ? 630 + (k % 2) * 76 : 640} texto={rot2} fondo={VERDE} id={ID} tam={26} />
            </g>
          );
        })}
        {!movil && <Txt f="a" x={600} y={260} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('senales'))}>Cada mes</Txt>}
        {t >= m('reclamos') && <Letrero x={600} y={790} texto="Si no suben, revisa cómo lo introduces" fondo={GRIS} id={ID} tam={26} op={e1(t, m('reclamos') + 1.5)} />}
      </Toma>
    </Lienzo>
  );
};
