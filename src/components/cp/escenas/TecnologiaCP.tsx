import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Suelo, PantallaCRM, PilaMonedas, Moneda3D, Edificio, Telefono, Gente, Arco, Sello, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Error 1: tecnología antes que estrategia.
 * Toma 1: el CRM cae del cielo en un terreno vacío; el gerente espera que lo centre en el cliente; un sello dice que
 * la tecnología sola no basta; le brotan módulos y brillos (presentaciones vistosas) y al gerente, la duda.
 * Toma 2: los cinco motivos de Reinares, uno por uno, cada uno empuja la compra: recursos, competidor, huida,
 * ahorro y consultor (cinco luces que se encienden arriba).
 * Toma 3: debajo del CRM no hay estrategia (cimiento punteado vacío); se hunde y cae el sello del fracaso.
 */

const ID = 'cp02', P = 'cp-tecnologia';

export const TecnologiaCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('comprar'), 'Comprar antes de pensar'], [m('sinrodeos'), 'La tecnología sola no basta'], [m('funciones'), 'Más funciones de las que usará'],
    [m('necesita'), '¿Qué necesita de verdad?'], [m('cinco'), 'Cinco motivos'], [m('detras'), 'Sin estrategia detrás'], [m('fracaso'), 'Fracaso asegurado'],
  ];
  const caida = sm(t, m('comprar'), m('comprar') + 0.9);
  const rebote = Math.abs(Math.sin(sm(t, m('comprar') + 0.9, m('comprar') + 1.5) * Math.PI)) * 30;
  const modsA = t < m('funciones') ? 3 : 3 + Math.min(3, Math.floor((t - m('funciones')) * 2.5));
  const MOT = ['recursos', 'competidor', 'huida', 'ahorro', 'consultor'] as const;
  const fase = MOT.reduce((k, n, j) => (t >= m(n) - 0.2 ? j : k), -1);
  const hund = sm(t, m('fracaso') - 0.3, m('fracaso') + 1.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Tecnología antes que estrategia">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el CRM cae en un terreno vacío */}
      <Toma t={t} a={0} b={m('cinco')} cy={560}>
        <Suelo y={752} isDark={isDark} />
        <Persona id={ID} x={220} y={750} s={0.9} corbata cuerpo={VIOLETA} />
        <g transform={`translate(0 ${lerp(-700, 0, caida) - rebote})`} opacity={e1(t, m('comprar'))}>
          <PantallaCRM x={760} y={746} n={modsA} isDark={isDark} t={t} brillo={ventana(t, m('vistosas'), m('cinco'))} />
        </g>
        {ventana(t, m('esperanza'), m('sinrodeos')) > 0.01 && <g opacity={ventana(t, m('esperanza'), m('sinrodeos'))}><Burbuja x={60} y={420} w={movil ? 520 : 440} texto="«Esto nos centrará en el cliente»" u={sm(t, m('esperanza'), m('esperanza') + 1.4)} c={c} id={ID} tam={26} /></g>}
        {t >= m('sinrodeos') && t < m('funciones') && <Sello x={760} y={330} texto="NO BASTA" u={sm(t, m('sinrodeos'), m('sinrodeos') + 0.6)} />}
        {t >= m('necesita') && <g opacity={e1(t, m('necesita'))}><Txt x={220} y={430 + 8 * Math.sin(t * 3)} textAnchor="middle" fontSize={110} fill={NARANJA}>?</Txt></g>}
        {t >= m('funciones') && <Letrero x={760} y={812} texto={t >= m('vistosas') ? 'Presentaciones vistosas' : 'Más funciones'} fondo={GRIS} id={ID} tam={28} op={e1(t, m('funciones'))} />}
      </Toma>

      {/* 2 · los cinco motivos de Reinares */}
      <Toma t={t} a={m('cinco')} b={m('detras')} cy={500}>
        {MOT.map((n, k) => <g key={n}><circle cx={440 + k * 80} cy={150} r={22} fill={fase >= k ? `url(#${ID}-marca)` : c.panel2} opacity={e1(t, m('cinco') + 0.1 * k)} /><Txt x={440 + k * 80} y={160} textAnchor="middle" fontSize={26} fill={fase >= k ? '#fff' : c.tenue}>{k + 1}</Txt></g>)}
        <PantallaCRM x={900} y={720} s={0.7} n={6} isDark={isDark} t={t} />
        {fase >= 0 && <Arco x1={500} y1={460} x2={780} y2={520} u={sm(t, m(MOT[fase]) + 0.3, m(MOT[fase]) + 1.1)} color={NARANJA} alto={90} />}
        {ventana(t, m('recursos'), m('competidor')) > 0.01 && (
          <g opacity={ventana(t, m('recursos'), m('competidor'))}>
            <PilaMonedas x={300} y={620} n={7} w={110} />
            {[0, 1, 2].map((k) => <Moneda3D key={k} x={230 + k * 70} y={420 - ((t * 60 + k * 40) % 120)} r={22} />)}
            {t >= m('moda') && <Letrero x={900} y={300} texto="De moda" fondo={AMBAR} id={ID} tam={28} op={e1(t, m('moda'))} />}
            <Letrero x={300} y={760} texto="Recursos ilimitados" id={ID} tam={28} />
          </g>
        )}
        {ventana(t, m('competidor'), m('huida')) > 0.01 && (
          <g opacity={ventana(t, m('competidor'), m('huida'))}>
            <Edificio x={200} y={660} w={120} h={230} color={AZUL_M} />
            <Edificio x={410} y={660} w={120} h={260} color={ROSA} />
            <g transform="translate(410 380)"><rect x={-40} y={-30} width={80} height={56} rx={8} fill="#334155" /><rect x={-32} y={-22} width={64} height={40} rx={4} fill={NARANJA} /></g>
            <Letrero x={300} y={760} texto="«Lo tiene mi competidor»" id={ID} tam={28} />
          </g>
        )}
        {ventana(t, m('huida'), m('ahorro')) > 0.01 && (
          <g opacity={ventana(t, m('huida'), m('ahorro'))}>
            <Gente x={120} y={640} n={5} activos={3} color={ROSA} paso={80} fuera={sm(t, m('huida') + 0.4, m('huida') + 2.4)} />
            {t >= m('salvacion') && <g transform={`translate(900 ${300 + 10 * Math.sin(t * 2)})`} opacity={e1(t, m('salvacion'))}><circle r={60} fill="#e5484d" /><circle r={30} fill={isDark ? '#1b1b1b' : '#f5f6f8'} />{[0, 1, 2, 3].map((k) => <rect key={k} x={-10} y={-62} width={20} height={32} fill="#fff" transform={`rotate(${45 + k * 90})`} />)}</g>}
            <Letrero x={300} y={760} texto="Huida hacia delante" fondo={ROSA} id={ID} tam={28} />
          </g>
        )}
        {ventana(t, m('ahorro'), m('consultor')) > 0.01 && (
          <g opacity={ventana(t, m('ahorro'), m('consultor'))}>
            <Telefono x={300} y={520} s={1.1} />
            <g transform={`translate(420 400) rotate(${20 * Math.sin(t * 6)})`}><circle cx={-14} cy={20} r={14} fill="none" stroke={GRIS} strokeWidth={6} /><circle cx={14} cy={20} r={14} fill="none" stroke={GRIS} strokeWidth={6} /><path d="M -8 8 L 22 -40 M 8 8 L -22 -40" stroke={GRIS} strokeWidth={8} strokeLinecap="round" /></g>
            <Letrero x={300} y={760} texto="Ahorro de costes" fondo={VERDE} id={ID} tam={28} />
          </g>
        )}
        {t >= m('consultor') && (
          <g opacity={ventana(t, m('consultor'), m('detras'))}>
            <Persona id={ID} x={300} y={700} s={0.85} corbata cuerpo="#334155" />
            <Burbuja x={60} y={380} w={movil ? 460 : 400} texto="«Lo necesitan»" u={sm(t, m('consultor') + 0.3, m('consultor') + 1.2)} c={c} id={ID} tam={28} />
            <Letrero x={300} y={760} texto="El consultor prestigioso" fondo="#334155" id={ID} tam={28} />
          </g>
        )}
      </Toma>

      {/* 3 · sin estrategia detrás */}
      <Toma t={t} a={m('detras')} b={fin + 1} cy={540}>
        <rect x={420} y={620} width={360} height={120} rx={16} fill="none" stroke={c.apagado} strokeWidth={5} strokeDasharray="16 14" opacity={e1(t, m('detras'))} />
        <Txt f="a" x={600} y={700} textAnchor="middle" fontSize={30} fill={c.tenue} opacity={e1(t, m('detras') + 0.3) * (1 - hund)}>Estrategia</Txt>
        <g transform={`translate(600 ${620 + 110 * hund}) rotate(${-10 * hund})`} opacity={1 - 0.5 * hund}>
          <PantallaCRM x={0} y={0} s={0.85} n={6} isDark={isDark} t={t} />
        </g>
        <Sello x={600} y={250} texto="FRACASO ASEGURADO" u={sm(t, m('fracaso'), m('fracaso') + 0.6)} />
      </Toma>
    </Lienzo>
  );
};
