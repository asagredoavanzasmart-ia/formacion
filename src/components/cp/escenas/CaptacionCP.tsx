import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Edificio, Hoja, Ficha, Calendario, Cifra, Cruz, Visto, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Cuánto cuesta un cliente nuevo (el caso real de Reinares).
 * Toma 1: un cliente con etiqueta de precio en blanco; el manual con la frase de siempre se cierra y queda a un lado.
 * Toma 2: INCONAL (aluminio) y el estudio de arquitectura: tres proyectos, tres personas, tres semanas, uno aprobado;
 * se suman viajes, materiales y gastos comerciales y el contador llega a doce mil euros.
 * Toma 3: la cifra sobre la mesa de la dirección y el imán que retiene a los clientes que ya tenía.
 */

const ID = 'cp08', P = 'cp-captacion';

const Etiqueta: React.FC<{ x: number; y: number; texto: string; op?: number; c: ReturnType<typeof tono> }> = ({ x, y, texto, op = 1, c }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <path d="M -140 -40 H 90 L 130 0 L 90 40 H -140 Q -150 40 -150 30 V -30 Q -150 -40 -140 -40 Z" fill={AMBAR} style={sombra(c.sombra, 3, 8)} />
      <circle cx={-126} cy={0} r={9} fill="#fff" />
      <Txt x={-4} y={14} textAnchor="middle" fontSize={40} fill="#fff">{texto}</Txt>
    </g>
  );

export const CaptacionCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('calculo'), 'Un cálculo que nadie hace'], [m('manual'), 'No la frase de manual'], [m('real'), 'El caso real'], [m('aluminio'), 'INCONAL'],
    [m('proyectos'), 'Tres proyectos'], [m('viajes'), 'Más viajes y materiales'], [m('doce'), 'Unos 12.000 euros'], [m('retener'), 'Mejor retener'],
  ];
  const cierra = sm(t, m('real') - 0.4, m('real') + 0.6);
  const suma = sm(t, m('viajes') + 0.6, m('doce') + 0.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Cuánto cuesta un cliente nuevo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el precio en blanco y el manual */}
      <Toma t={t} a={0} b={m('aluminio')} cy={520}>
        <Persona id={ID} x={330} y={760} s={1} cuerpo={NARANJA} />
        <Etiqueta x={520} y={400} texto={t >= m('cuanto') ? '¿ ? €' : '…'} op={e1(t, m('calculo'))} c={c} />
        {t >= m('manual') && (
          <g opacity={e1(t, m('manual')) * (1 - 0.6 * cierra)} transform={`translate(${lerp(860, 1000, cierra)} ${lerp(470, 640, cierra)}) rotate(${-18 * cierra}) scale(${lerp(1, 0.6, cierra)})`}>
            <rect x={-170} y={-130} width={340} height={260} rx={14} fill={GRIS} />
            <rect x={-160} y={-120} width={150} height={240} rx={8} fill="#fff" /><rect x={10} y={-120} width={150} height={240} rx={8} fill="#fff" />
            <Txt x={-85} y={-10} textAnchor="middle" fontSize={34} fill={c.tenue === '#aaaaaa' ? '#374151' : '#374151'}>«80 %</Txt>
            <Txt x={85} y={-10} textAnchor="middle" fontSize={34} fill="#374151">menos»</Txt>
          </g>
        )}
        {t >= m('real') && <Letrero x={600} y={812} texto="Calcular el caso real" id={ID} tam={28} op={e1(t, m('real'))} />}
      </Toma>

      {/* 2 · INCONAL y los estudios de arquitectura */}
      <Toma t={t} a={m('aluminio')} b={m('mesa')} cy={500}>
        <g opacity={e1(t, m('aluminio'))}>
          <rect x={80} y={430} width={280} height={180} rx={10} fill="#64748b" />
          <path d="M 80 430 L 150 370 V 430 L 220 370 V 430 L 290 370 V 430 L 360 370 V 430 Z" fill="#475569" />
          {[0, 1, 2].map((k) => <rect key={k} x={110 + k * 80} y={500} width={50} height={110} rx={4} fill="#cbd5e1" />)}
          <Txt x={220} y={660} textAnchor="middle" fontSize={30} fill={c.texto}>INCONAL</Txt>
        </g>
        {t >= m('arquitectura') && <g opacity={e1(t, m('arquitectura'))}><Edificio x={1030} y={610} w={150} h={240} color={VIOLETA} /><Txt f="a" x={1030} y={660} textAnchor="middle" fontSize={26} fill={c.texto}>Estudio</Txt></g>}
        {t >= m('proyectos') && [0, 1, 2].map((k) => {
          const u = sm(t, m('proyectos') + 0.4 * k, m('proyectos') + 0.4 * k + 1);
          const ok = k === 1 && t >= m('aprobara');
          const x = lerp(380, 560 + k * 130, u), y = lerp(500, 340, u);
          return <g key={k}><Hoja x={x} y={y} w={90} h={116} rot={(k - 1) * 6} lineas={4} />{t >= m('aprobara') && (ok ? <Visto x={x} y={y + 80} r={24} /> : <Cruz x={x} y={y + 80} r={20} />)}</g>;
        })}
        {t >= m('personas') && [0, 1, 2].map((k) => <Persona key={k} id={ID} x={560 + k * 130} y={600} s={0.45} cuerpo={[AZUL_M, ROSA, VERDE][k]} />)}
        {t >= m('personas') && <Calendario x={1030} y={250} s={0.6} marcados={Math.min(3, Math.floor((t - m('personas')) * 2) + 1)} op={e1(t, m('personas'))} />}
        {t >= m('viajes') && (['Viajes', 'Materiales', 'Gastos comerciales'] as const).map((s, k) => <Letrero key={s} x={260 + k * 340} y={720} texto={s} fondo={GRIS} id={ID} tam={26} op={e1(t, m('viajes') + 0.4 * k)} />)}
        {t >= m('viajes') && <Cifra x={600} y={810} valor={12000} u={suma} suf=" €" tam={64} color={NARANJA} miles />}
      </Toma>

      {/* 3 · la cifra sobre la mesa */}
      <Toma t={t} a={m('mesa')} b={fin + 1} cy={500}>
        <rect x={250} y={560} width={700} height={36} rx={12} fill="#7c4a1e" opacity={e1(t, m('mesa'))} />
        {[310, 890].map((x) => <rect key={x} x={x - 12} y={596} width={24} height={140} fill="#5b3716" opacity={e1(t, m('mesa'))} />)}
        {[380, 600, 820].map((x, k) => <Persona key={x} id={ID} x={x} y={540} s={0.55} corbata cuerpo={[VIOLETA, '#334155', AZUL_M][k]} />)}
        <g transform={`translate(0 ${lerp(-300, 0, sm(t, m('mesa'), m('mesa') + 0.8))})`}><Etiqueta x={600} y={300} texto="12.000 €" c={c} /></g>
        {t >= m('retener') && (
          <g opacity={e1(t, m('retener'))}>
            <path d="M 1030 380 v 120 a 60 60 0 0 1 -120 0 v -120 h 40 v 120 a 20 20 0 0 0 40 0 v -120 Z" fill={ROSA} />
            <rect x={910} y={360} width={40} height={30} fill="#e5e7eb" /><rect x={990} y={360} width={40} height={30} fill="#e5e7eb" />
            {[0, 1, 2].map((k) => <Ficha key={k} x={1110 + 8 * Math.sin(t * 3 + k)} y={400 + k * 80} s={0.6} />)}
            <Letrero x={600} y={812} texto="Invertir en retener a los que ya tiene" id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
