import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, PantallaCRM, Telefono, Propuesta, Fajo, Moneda3D, Cifra, Hoja, e1, sm, ventana, lerp, brillo, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Error 5: olvidar a las personas.
 * Toma 1: el CRM rodeado de quienes lo usan cada día.
 * Toma 2 (CRM-Forum, en Newell): las causas del fracaso en barras horizontales; las tres primeras se juntan en una
 * barra de 71 %; presupuesto y software quedan como hilos de 4 % y 2 %.
 * Toma 3 (Newell): la torta de la inversión con una tajada de 5 % para el cambio; las cuatrocientas implantaciones y
 * el 25 % que explica la formación de la primera línea (teléfono, visita, correo).
 * Toma 4: Reinares — cientos de miles de euros en tecnología, nada para el empleado; Newell — el miedo a perder poder:
 * el vendedor abraza su cartera, el gerente lo vigila con la lupa, y el formulario queda casi vacío.
 */

const ID = 'cp14', P = 'cp-personas';

export const PersonasCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('personas'), 'Las personas que lo usan'], [m('forum'), 'CRM-Forum, según Newell'], [m('setenta'), 'Tres causas: 71 %'], [m('organizacion'), 'Falla la organización'],
    [m('cinco'), 'Solo 5 % para el cambio'], [m('cuatrocientas'), '400 implantaciones'], [m('euros'), 'Reinares'], [m('poder'), 'El miedo a perder poder'], [m('minimo'), 'Lo mínimo'],
  ];
  const CAUSAS: [string, string, number, string][] = [['organizacional', 'Cambio organizacional', 29, VIOLETA], ['politica', 'Política e inercia', 22, ROSA], ['comprension', 'Falta de comprensión', 20, NARANJA], ['presupuesto', 'Presupuesto', 4, GRIS], ['software', 'Software', 2, GRIS]];
  const junta = sm(t, m('setenta'), m('setenta') + 1.2);
  const torta = sm(t, m('cinco'), m('cinco') + 1);
  const tajada = (a0: number, a1: number, r: number) => `M 0 0 L ${r * Math.sin(a0)} ${-r * Math.cos(a0)} A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${r * Math.sin(a1)} ${-r * Math.cos(a1)} Z`;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Olvidar a las personas">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · quienes lo usan cada día */}
      <Toma t={t} a={0} b={m('forum')} cy={500}>
        <PantallaCRM x={600} y={650} s={0.8} n={6} isDark={isDark} />
        {[[200, 760, AZUL_M], [380, 800, VERDE], [820, 800, NARANJA], [1000, 760, VIOLETA]].map(([x, y, col], k) => <Persona key={k} id={ID} x={x as number} y={y as number} s={0.7} corbata={k === 3} cuerpo={col as string} />)}
        {t >= m('caro') && <Letrero x={600} y={250} texto="Quizá el error más caro" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('caro'))} />}
      </Toma>

      {/* 2 · las causas del fracaso */}
      <Toma t={t} a={m('forum')} b={m('cinco')} cy={480}>
        {CAUSAS.map(([n, rot2, v, col], k) => {
          const u = sm(t, m(n), m(n) + 0.9);
          const y = 220 + k * 105 - (k < 3 ? 0 : 0);
          const x0 = movil ? 560 : 480, pp = movil ? 7 : 8;
          const dx = k < 3 ? [0, 29, 51][k] * pp * junta : 0;
          const dy = k < 3 ? (220 - y) * junta : 0;
          const destaca = k < 3 && t >= m('organizacion');
          return (
            <g key={n} opacity={u > 0.01 ? 1 : 0}>
              <rect x={x0 + dx} y={y + dy - 30} width={Math.max(8, v * pp * u)} height={60} rx={12} fill={col} opacity={1 - 0.05 * brillo(t, destaca)} />
              <Txt f="a" x={x0 - 20} y={y + 10} textAnchor="end" fontSize={26} fill={c.texto} opacity={1 - junta * (k < 3 ? 0.7 : 0)}>{rot2}</Txt>
              {junta < 0.3 && <Txt x={x0 + v * pp * u + 16} y={y + 12} fontSize={30} fill={c.texto}>{Math.round(v * u)} %</Txt>}
            </g>
          );
        })}
        {junta > 0.3 && <Cifra x={(movil ? 560 + 71 * 7 : 480 + 71 * 8) + 20} y={232} valor={71} u={junta} suf=" %" tam={44} color={c.texto} ancla="start" />}
        {t >= m('organizacion') && <Letrero x={600} y={790} texto="El dinero y la tecnología casi nunca son el problema" id={ID} tam={26} op={e1(t, m('organizacion'))} />}
      </Toma>

      {/* 3 · la tajada del cambio y la primera línea */}
      <Toma t={t} a={m('cinco')} b={m('euros')} cy={480}>
        <g transform="translate(300 450)" opacity={e1(t, m('cinco'))}>
          <path d={tajada(0.05 * Math.PI * 2 * torta, Math.PI * 2 - 0.0001, 170)} fill={AZUL_M} />
          {torta > 0.02 && <path d={tajada(0, 0.05 * Math.PI * 2 * torta, 190)} fill={NARANJA} transform="translate(8 -10)" />}
          <Txt x={0} y={20} textAnchor="middle" fontSize={34} fill="#fff">Tecnología</Txt>
        </g>
        {t >= m('cinco') && <Letrero x={300} y={700} texto="5 % para el cambio" id={ID} tam={28} op={e1(t, m('cinco') + 0.6)} />}
        {t >= m('cuatrocientas') && (
          <g opacity={e1(t, m('cuatrocientas'))}>
            <Cifra x={850} y={330} valor={25} u={sm(t, m('primera'), m('primera') + 1)} suf=" %" tam={100} color={VERDE} />
            <Txt f="a" x={850} y={390} textAnchor="middle" fontSize={26} fill={c.texto}>de la diferencia: formación</Txt>
            {!movil && <Txt f="a" x={850} y={250} textAnchor="middle" fontSize={22} fill={c.tenue}>Estudio de 400 implantaciones</Txt>}
          </g>
        )}
        {t >= m('telefono') && (
          <g opacity={e1(t, m('telefono'))}>
            <Telefono x={720} y={560} s={0.55} />
            <Persona id={ID} x={860} y={660} s={0.5} cuerpo={VERDE} />
            <Propuesta x={1000} y={560} s={0.7} />
            <Letrero x={860} y={760} texto="La primera línea" fondo={VERDE} id={ID} tam={28} />
          </g>
        )}
      </Toma>

      {/* 4 · Reinares y el miedo */}
      <Toma t={t} a={m('euros')} b={fin + 1} cy={480}>
        {ventana(t, m('euros'), m('poder')) > 0.01 && (
          <g opacity={ventana(t, m('euros'), m('poder'))}>
            <PantallaCRM x={360} y={640} s={0.7} n={6} isDark={isDark} />
            <g transform="translate(360 330)"><Fajo x={0} y={0} n={8} w={160} /></g>
            <Persona id={ID} x={880} y={700} s={0.9} cuerpo={GRIS} ojos={t >= m('desmotivado') ? 0.1 : 1} />
            <Txt x={880} y={420} textAnchor="middle" fontSize={64} fill={c.tenue}>0 €</Txt>
            {t >= m('desmotivado') && <Letrero x={880} y={790} texto="Un empleado desmotivado" fondo={GRIS} id={ID} tam={28} op={e1(t, m('desmotivado'))} />}
          </g>
        )}
        {t >= m('poder') && (
          <g opacity={e1(t, m('poder'))}>
            <Persona id={ID} x={330} y={740} s={0.95} corbata cuerpo={NARANJA} />
            <g transform={`translate(430 ${660 + 4 * Math.sin(t * 4)})`}><rect x={-60} y={-46} width={120} height={92} rx={10} fill="#7c4a1e" /><rect x={-40} y={-32} width={80} height={10} rx={5} fill="#fde68a" /><Txt f="a" x={0} y={30} textAnchor="middle" fontSize={22} fill="#fff">Mi cartera</Txt></g>
            {t >= m('controle') && (
              <g opacity={e1(t, m('controle'))}>
                <Persona id={ID} x={900} y={740} s={0.95} corbata cuerpo={VIOLETA} />
                <g transform={`translate(${720 + 20 * Math.sin(t * 2)} 500)`}><circle r={52} fill="#fff" opacity={0.35} /><circle r={52} fill="none" stroke={GRIS} strokeWidth={12} /><rect x={34} y={34} width={16} height={70} rx={8} fill={GRIS} transform="rotate(-45 42 69)" /></g>
              </g>
            )}
            {t >= m('minimo') && <g opacity={e1(t, m('minimo'))} transform="translate(560 250)"><rect x={-90} y={-60} width={180} height={150} rx={12} fill={c.panel} style={sombra(c.sombra, 4, 10)} /><rect x={-66} y={-36} width={90} height={12} rx={6} fill={GRIS} />{[0, 1, 2].map((k) => <rect key={k} x={-66} y={-6 + k * 28} width={132} height={14} rx={7} fill={c.panel2} />)}</g>}
            <Letrero x={600} y={812} texto={t >= m('minimo') ? 'Lo llena con lo mínimo' : t >= m('cartera') ? '«Mis clientes son míos»' : 'Miedo a perder poder'} fondo={t >= m('minimo') ? ROSA : GRIS} id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
