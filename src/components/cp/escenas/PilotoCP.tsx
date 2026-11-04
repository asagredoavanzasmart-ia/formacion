import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Ficha, Moneda3D, Visto, Cruz, Arco, Curva, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Táctica: dosificar y pilotear.
 * Toma 1 (Reinares): la plataforma completa como seis bloques; solo uno se toma. Los procesos que ya existen
 * (marketing directo, web, fuerza de ventas) se mejoran primero. El coche con la «L» de aprendiz.
 * Toma 2: el piloto — un círculo pequeño de clientes, la diana del resultado definido antes, las flechas de los que
 * renuevan; si llega, el círculo se amplía; si no, una moneda chica: aprendiste barato.
 * Toma 3 (ejemplo ilustrativo): la línea de tres años; al año, la carpeta de contratos vencidos sigue vacía; un solo
 * servicio y un solo responsable lo habrían mostrado antes.
 * Toma 4: tres preguntas incómodas al proveedor y la diferencia entre acompañar y vender.
 */

const ID = 'cp09', P = 'cp-piloto';

export const PilotoCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('dosificacion'), 'La dosificación'], [m('existen'), 'Primero, lo que ya existe'], [m('coche'), 'Un coche sin saber conducir'],
    [m('piloto'), 'Un piloto'], [m('define'), 'Define antes el resultado'], [m('amplia'), 'Si llega, amplía'], [m('barato'), 'Si no, aprendiste barato'],
    [m('limpieza'), 'Caso ilustrativo'], [m('alano'), 'Al año, vacío'], [m('solo'), 'Un servicio, un responsable'], [m('incomodas'), 'Tres preguntas incómodas'], [m('serio'), 'Acompañar o vender'],
  ];
  const COL = [NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR];
  const toma1 = sm(t, m('plataforma'), m('plataforma') + 1);
  const amplia = sm(t, m('amplia'), m('amplia') + 1.2);
  const PREG = ['¿Cuántas lo abandonaron?', '¿Qué resultado lograron?', '¿Qué pasa con mis datos?'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Dosificar y pilotear">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la plataforma por partes */}
      <Toma t={t} a={0} b={m('piloto')} cy={500}>
        {ventana(t, 0, m('coche')) > 0.01 && (
          <g opacity={ventana(t, 0, m('coche'))}>
            {COL.map((col, k) => {
              const sel = k === 0;
              const x = 300 + (k % 3) * 160 + (sel ? -120 * toma1 : 0), y = 300 + Math.floor(k / 3) * 160 + (sel ? 280 * toma1 : 0);
              return <g key={k} opacity={e1(t, m('dosificacion') + 0.1 * k) * (sel ? 1 : 1 - 0.6 * toma1)}><rect x={x - 65} y={y - 65} width={130} height={130} rx={20} fill={col} /><rect x={x - 65} y={y - 65} width={130} height={40} rx={20} fill="#fff" opacity={0.18} /></g>;
            })}
            {t >= m('existen') && (['Marketing directo', 'Web', 'Fuerza de ventas'] as const).map((s, k) => (
              <g key={s} opacity={e1(t, m('existen') + 0.4 * k)}>
                <Letrero x={930} y={300 + k * 130} texto={s} fondo={GRIS} id={ID} tam={28} />
                {!movil && <path d={`M 1110 ${300 + k * 130} l 14 -18 l 14 18`} stroke={VERDE} strokeWidth={8} fill="none" strokeLinecap="round" opacity={sm(t, m('existen') + 0.4 * k + 0.6, m('existen') + 0.4 * k + 1)} />}
              </g>
            ))}
          </g>
        )}
        {t >= m('coche') && (
          <g opacity={e1(t, m('coche'))}>
            <g transform="translate(600 600)">
              <ellipse cx={0} cy={8} rx={150} ry={16} fill="#000" opacity={0.18} />
              <path d="M -140 -10 Q -138 -56 -80 -64 L -46 -110 Q -34 -122 -12 -122 H 58 Q 80 -122 96 -104 L 130 -64 Q 152 -56 150 -10 Z" fill={AZUL_M} />
              <path d="M -34 -104 H 46 L 76 -68 H -58 Z" fill="#bfe3ff" />
              {[-80, 88].map((wx) => <g key={wx}><circle cx={wx} cy={-6} r={32} fill="#1f2937" /><circle cx={wx} cy={-6} r={13} fill="#9ca3af" /></g>)}
              <rect x={-24} y={-180} width={48} height={48} rx={8} fill="#fff" stroke={ROSA} strokeWidth={6} /><Txt x={0} y={-142} textAnchor="middle" fontSize={34} fill={ROSA}>L</Txt>
            </g>
            <Letrero x={600} y={760} texto={t >= m('vender') ? 'Compra lo que de verdad necesitas' : 'Antes de saber conducir'} id={ID} tam={28} />
          </g>
        )}
      </Toma>

      {/* 2 · el piloto */}
      <Toma t={t} a={m('piloto')} b={m('limpieza')} cy={480}>
        <circle cx={420} cy={470} r={lerp(150, 230, amplia)} fill={c.panel2} opacity={e1(t, m('piloto'))} />
        {Array.from({ length: 5 + Math.round(5 * amplia) }, (_, k) => { const a = (k / (5 + Math.round(5 * amplia))) * Math.PI * 2 + t * 0.2; const r = lerp(95, 170, amplia); return <Ficha key={k} x={420 + Math.cos(a) * r} y={470 + Math.sin(a) * r} s={0.6} color={COL[k % 6]} op={e1(t, m('grupo') + 0.15 * (k % 5))} />; })}
        {t >= m('define') && (
          <g opacity={e1(t, m('define'))}>
            {[90, 64, 38, 14].map((r, k) => <circle key={r} cx={920} cy={360} r={r} fill={k % 2 ? c.panel : ROSA} />)}
            {t >= m('renuevan') && <Arco x1={560} y1={420} x2={850} y2={360} u={sm(t, m('renuevan'), m('renuevan') + 0.8)} color={VERDE} alto={80} />}
          </g>
        )}
        {t >= m('amplia') && <Letrero x={420} y={790} texto="Si llega, amplía" fondo={VERDE} id={ID} tam={28} op={e1(t, m('amplia'))} />}
        {t >= m('barato') && <g opacity={e1(t, m('barato'))}><Moneda3D x={920} y={600} r={30} /><Letrero x={920} y={700} texto="Aprendiste barato" fondo={GRIS} id={ID} tam={28} /></g>}
      </Toma>

      {/* 3 · caso ilustrativo: el gran plan */}
      <Toma t={t} a={m('limpieza')} b={m('incomodas')} cy={480}>
        <rect x={120} y={330} width={960} height={14} rx={7} fill={c.apagado} opacity={e1(t, m('tresanos'))} />
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={e1(t, m('tresanos') + 0.2 * k)}><circle cx={120 + k * 320} cy={337} r={18} fill={k <= 1 && t >= m('alano') ? NARANJA : GRIS} /><Txt f="a" x={120 + k * 320} y={300} textAnchor="middle" fontSize={26} fill={c.texto}>{k === 0 ? 'Inicio' : `Año ${k}`}</Txt></g>)}
        {t >= m('alano') && (
          <g opacity={e1(t, m('alano'))}>
            <path d="M 330 440 H 420 L 440 470 H 560 V 640 H 330 Z" fill={AMBAR} />
            <rect x={330} y={480} width={230} height={160} rx={8} fill="#fbbf24" />
            <Txt f="a" x={445} y={690} textAnchor="middle" fontSize={26} fill={c.texto}>Contratos vencidos</Txt>
            <Txt x={445} y={576} textAnchor="middle" fontSize={40} fill="#fff">Vacía</Txt>
          </g>
        )}
        {t >= m('nosirve') && <g opacity={e1(t, m('nosirve'))}><Persona id={ID} x={820} y={760} s={0.85} corbata cuerpo={VIOLETA} /><Cruz x={820} y={420} r={30} /></g>}
        {t >= m('solo') && <Letrero x={600} y={812} texto="Un solo servicio, un solo responsable" id={ID} tam={28} op={e1(t, m('solo'))} />}
      </Toma>

      {/* 4 · tres preguntas al proveedor */}
      <Toma t={t} a={m('incomodas')} b={fin + 1} cy={480}>
        <Persona id={ID} x={180} y={770} s={0.8} cuerpo={NARANJA} />
        <Persona id={ID} x={1020} y={770} s={0.8} corbata cuerpo="#334155" />
        {PREG.map((q, k) => {
          const an = ['abandonaron', 'resultado', 'datos'][k];
          return (
            <g key={q} opacity={e1(t, m(an))} transform={`translate(600 ${250 + k * 120})`}>
              <rect x={-330} y={-44} width={660} height={88} rx={20} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
              <rect x={-330} y={-44} width={12} height={88} rx={6} fill={[ROSA, AZUL_M, VIOLETA][k]} />
              <Txt f="a" x={-290} y={12} fontSize={32} fill={c.texto}>{q}</Txt>
            </g>
          );
        })}
        {t >= m('serio') && <Letrero x={600} y={580} texto={t >= m('vendiendo') ? 'Solo funcionalidades: está vendiendo' : 'Un proveedor serio da ejemplos'} fondo={t >= m('vendiendo') ? ROSA : VERDE} id={ID} tam={28} op={e1(t, m('serio'))} />}
      </Toma>
    </Lienzo>
  );
};
