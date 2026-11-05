import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Hoja, Proyector, Puerta, Reloj, Burbuja, Suelo, Arco, Cruz, Visto, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Menos información.
 * Toma 1: cuatro reglas como cuatro estaciones: el informe grueso con su resumen de un párrafo (o devuelto), la hoja única
 * del viernes, el reloj con dos horas fijas para el correo y la puerta de la reunión que solo se abre para resolver.
 * Toma 2 (Lou Gerstner, IBM): la sala con el proyector encendido; Gerstner lo apaga: hablemos solo de tu negocio.
 * Toma 3: te piden una cosa: entregas una respuesta, no diez anexos.
 */

const ID = 'es16', P = 'es-informacion';

export const InformacionES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('informacion'), 'La información del equipo'], [m('resumen'), 'Resumen de un párrafo'], [m('viernes'), 'Una hoja los viernes'], [m('correo'), 'Correo a horas fijas'],
    [m('reunion'), 'Reunión solo para resolver'], [m('gerstner'), 'Lou Gerstner, IBM'], [m('negocio'), 'Hablemos de tu negocio'], [m('diez'), 'Una cosa, no diez'],
  ];
  const apagado = sm(t, m('proyector'), m('proyector') + 0.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Menos información">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · cuatro reglas */}
      <Toma t={t} a={0} b={m('gerstner')} cy={480}>
        {t < m('reglas') && Array.from({ length: 10 }, (_, k) => <Hoja key={k} x={600 + (azar(k) - 0.5) * 200} y={560 - k * 22} w={260} h={60} lineas={2} rot={(azar(k + 1) - 0.5) * 10} op={e1(t, m('informacion') + 0.05 * k)} />)}
        {t >= m('reglas') && (
          <g>
            <g opacity={e1(t, m('resumen'))} transform="translate(300 320)">
              <rect x={-220} y={-150} width={440} height={260} rx={22} fill={c.panel} />
              {[0, 1, 2, 3].map((k) => <rect key={k} x={-150 + k * 8} y={-60 + k * -8} width={180} height={130} rx={10} fill="#e2e8f0" />)}
              <rect x={-60} y={-110} width={190} height={70} rx={10} fill={NARANJA} />
              <Txt x={35} y={-66} textAnchor="middle" fontSize={22} fill="#fff">Resumen</Txt>
              {t >= m('devuelve') && <g opacity={e1(t, m('devuelve'))}><Arco x1={160} y1={60} x2={-180} y2={60} u={sm(t, m('devuelve'), m('devuelve') + 0.8)} color={ROJO_M} alto={60} grosor={5} punta /><Txt x={0} y={150} textAnchor="middle" fontSize={22} fill={ROJO_M}>sin resumen, vuelve</Txt></g>}
            </g>
            <g opacity={e1(t, m('viernes'))} transform="translate(900 320)">
              <rect x={-220} y={-150} width={440} height={260} rx={22} fill={c.panel} />
              <rect x={-190} y={-120} width={150} height={60} rx={10} fill={VIOLETA} /><Txt x={-115} y={-80} textAnchor="middle" fontSize={24} fill="#fff">Viernes</Txt>
              <Hoja x={80} y={-10} w={140} h={180} lineas={6} />
              <Txt x={-110} y={40} textAnchor="middle" fontSize={24} fill={c.texto}>Una hoja</Txt>
            </g>
            <g opacity={e1(t, m('correo'))} transform="translate(300 640)">
              <rect x={-220} y={-130} width={440} height={240} rx={22} fill={c.panel} />
              <Reloj x={-90} y={-10} r={70} t={t} />
              {[0, 1].map((k) => <g key={k} transform={`translate(${70 + k * 90} -20)`}><rect x={-34} y={-24} width={68} height={48} rx={6} fill="#e2e8f0" /><path d="M -34 -24 L 0 4 L 34 -24" stroke="#94a3b8" strokeWidth={4} fill="none" /></g>)}
              <Txt x={110} y={60} textAnchor="middle" fontSize={22} fill={c.texto}>Horas fijas</Txt>
            </g>
            <g opacity={e1(t, m('reunion'))} transform="translate(900 640)">
              <rect x={-220} y={-130} width={440} height={240} rx={22} fill={c.panel} />
              <g transform="translate(-110 95) scale(0.95)"><Puerta x={0} y={0} abre={0.3 + 0.3 * Math.sin(t)} c={c} /></g>
              <Txt x={70} y={-10} textAnchor="middle" fontSize={24} fill={c.texto}>Solo para</Txt>
              <Txt x={70} y={26} textAnchor="middle" fontSize={24} fill={c.texto}>resolver</Txt>
            </g>
          </g>
        )}
        {!movil && t >= m('reglas') && <Txt f="a" x={600} y={140} textAnchor="middle" fontSize={22} fill={c.tenue}>Reglas de Trout y Rivkin</Txt>}
      </Toma>

      {/* 2 · Gerstner apaga el proyector */}
      <Toma t={t} a={m('gerstner')} b={m('diez')} cy={480}>
        <Suelo y={740} isDark={isDark} x0={80} x1={1120} />
        <rect x={640} y={180} width={460} height={290} rx={10} fill={apagado > 0.5 ? c.apagado : '#e0f2fe'} opacity={e1(t, m('gerstner'))} />
        {apagado < 0.5 && [0, 1, 2].map((k) => <rect key={k} x={680} y={220 + k * 60} width={380 - k * 60} height={30} rx={8} fill={[AZUL_M, ROSA, VIOLETA][k]} opacity={e1(t, m('gerstner'))} />)}
        <rect x={300} y={600} width={340} height={22} rx={8} fill="#a16b3f" />
        <Proyector x={470} y={600} on={1 - apagado} largo={170} />
        <Persona id={ID} x={200} y={740} s={1.05} cuerpo="#1e3a8a" pelo="#9ca3af" corbata />
        <Persona id={ID} x={860} y={740} s={1} cuerpo={GRIS} />
        {t >= m('negocio') && <Burbuja x={220} y={520} w={420} texto="Hablemos solo de tu negocio" u={sm(t, m('negocio'), m('negocio') + 1)} c={c} id={ID} tam={30} marca />}
        {t >= m('costumbre') && <Letrero x={870} y={560} texto="Cambió la costumbre de IBM" fondo={VERDE} id={ID} tam={26} op={e1(t, m('costumbre'))} />}
      </Toma>

      {/* 3 · una cosa, no diez */}
      <Toma t={t} a={m('diez')} b={fin + 1} cy={470}>
        <Suelo y={740} isDark={isDark} x0={80} x1={1120} />
        <Persona id={ID} x={220} y={740} s={1} cuerpo={AZUL_M} />
        <Persona id={ID} x={980} y={740} s={1} cuerpo={NARANJA} />
        <Hoja x={420} y={420} w={130} h={160} lineas={3} />
        <Txt x={420} y={540} textAnchor="middle" fontSize={24} fill={c.texto}>Una pregunta</Txt>
        {Array.from({ length: 9 }, (_, k) => <g key={k} opacity={1 - sm(t, m('diez') + 0.8, m('diez') + 1.6)}><Hoja x={700 + (k % 3) * 70} y={340 + Math.floor(k / 3) * 70} w={60} h={74} lineas={2} rot={(azar(k) - 0.5) * 20} /></g>)}
        <g opacity={sm(t, m('diez') + 1.2, m('diez') + 1.8)}><Hoja x={780} y={420} w={130} h={160} lineas={3} color={VERDE} /><Visto x={850} y={330} r={26} /></g>
        <Letrero x={600} y={790} texto="Una respuesta, no diez anexos" id={ID} tam={28} op={e1(t, m('diez') + 1.2)} />
        {t < m('diez') + 1.6 && <Cruz x={920} y={290} r={22} op={e1(t, m('diez') + 0.6)} />}
      </Toma>
    </Lienzo>
  );
};
