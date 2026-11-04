import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Suelo, PantallaCRM, Moneda3D, Reloj, Cifra, Gente, Cruz, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Error 2: esperar resultados mágicos.
 * Toma 1: la promesa — el CRM con galera de mago escupe monedas solo y un reloj promete el retorno rápido; la magia
 * se desinfla: no aumenta las ventas; son los procesos los que mejoran y el CRM solo facilita.
 * Toma 2 (Reinares): el auto con ABS en una curva; el sistema no maneja por ti; el mal conductor confiado derrapa.
 * Luego el vendedor con todo registrado que no sabe preguntar (burbuja vacía).
 * Toma 3 (Newell): de cada diez empresas, solo dos o tres sienten el retorno esperado (25–30 %); el cohete del
 * «implantado rápido» frente a la montaña de la tarea.
 */

const ID = 'cp06', P = 'cp-magia';

const Auto: React.FC<{ x: number; y: number; rot?: number; color?: string }> = ({ x, y, rot = 0, color = AZUL_M }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse cx={0} cy={8} rx={130} ry={14} fill="#000" opacity={0.18} />
    <path d="M -120 -10 Q -118 -50 -70 -56 L -40 -96 Q -30 -106 -10 -106 H 50 Q 70 -106 84 -90 L 112 -56 Q 132 -50 130 -10 Z" fill={color} />
    <path d="M -30 -90 H 40 L 66 -58 H -50 Z" fill="#bfe3ff" />
    {[-70, 76].map((wx) => <g key={wx}><circle cx={wx} cy={-6} r={28} fill="#1f2937" /><circle cx={wx} cy={-6} r={12} fill="#9ca3af" /></g>)}
  </g>
);

export const MagiaCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('promesa'), 'La promesa'], [m('magicos'), 'Resultados mágicos'], [m('noaumenta'), 'El CRM no aumenta las ventas'], [m('facilitador'), 'Solo facilita'],
    [m('automovil'), 'El ABS, según Reinares'], [m('accidentes'), 'Confianza engañosa'], [m('comerciales'), 'Con los vendedores, igual'],
    [m('newell'), 'Newell, con cifras'], [m('rapido'), 'Rápido y en toda la empresa'], [m('magnitud'), 'Subestiman la tarea'],
  ];
  const desinfla = sm(t, m('noaumenta'), m('noaumenta') + 1);
  const derrape = sm(t, m('accidentes'), m('accidentes') + 1.4);
  const xAuto = lerp(-150, 520, sm(t, m('automovil'), m('automovil') + 2.2)) + 260 * derrape;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Esperar resultados mágicos">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la promesa mágica */}
      <Toma t={t} a={0} b={m('automovil')} cy={540}>
        <Suelo y={752} isDark={isDark} />
        <PantallaCRM x={600} y={746} n={3} isDark={isDark} t={t} brillo={ventana(t, m('magicos'), m('noaumenta'))} />
        <g opacity={e1(t, m('promesa')) * (1 - desinfla)} transform={`translate(600 ${430 - 10 * Math.sin(t * 2)})`}>
          <rect x={-70} y={-110} width={140} height={110} rx={10} fill="#111827" /><rect x={-100} y={-12} width={200} height={22} rx={10} fill="#111827" /><rect x={-70} y={-40} width={140} height={20} fill={ROSA} />
        </g>
        {t >= m('vendera') && t < m('noaumenta') + 1 && [0, 1, 2, 3, 4].map((k) => { const u = ((t - m('vendera')) * 0.6 + k / 5) % 1; return <Moneda3D key={k} x={600 + (k - 2) * 90 * u} y={330 - 160 * u + 220 * u * u} r={24} op={(1 - u) * (1 - desinfla)} />; })}
        {ventana(t, m('recuperara'), m('noaumenta')) > 0.01 && <g opacity={ventana(t, m('recuperara'), m('noaumenta'))}><Reloj x={1000} y={380} r={70} t={t} vel={6} /><Letrero x={1000} y={500} texto="¡Pronto!" id={ID} tam={28} /></g>}
        {t >= m('noaumenta') && <Cruz x={860} y={360} r={34} op={e1(t, m('noaumenta')) * (1 - sm(t, m('mejora') - 0.3, m('mejora')))} />}
        {t >= m('mejora') && (
          <g opacity={e1(t, m('mejora'))}>
            {['Proceso', 'Proceso', 'Proceso'].map((s, k) => <g key={k}><rect x={120} y={300 + k * 120} width={230} height={80} rx={16} fill={[NARANJA, ROSA, VIOLETA][k]} opacity={e1(t, m('mejora') + 0.4 * k)} /><Txt x={235} y={350 + k * 120} textAnchor="middle" fontSize={30} fill="#fff" opacity={e1(t, m('mejora') + 0.4 * k)}>{`Mejora ${k + 1}`}</Txt></g>)}
            {[0, 1, 2].map((k) => <path key={k} d={`M 360 ${340 + k * 120} L 420 ${340 + k * 120}`} stroke={GRIS} strokeWidth={8} strokeLinecap="round" opacity={e1(t, m('mejora') + 0.4 * k + 0.3)} />)}
          </g>
        )}
        {t >= m('facilitador') && <Letrero x={600} y={812} texto="El CRM solo facilita lo que ya sabes hacer" id={ID} tam={28} op={e1(t, m('facilitador'))} />}
      </Toma>

      {/* 2 · el ABS no maneja por ti */}
      <Toma t={t} a={m('automovil')} b={m('newell')} cy={500}>
        {ventana(t, m('automovil'), m('comerciales')) > 0.01 && (
          <g opacity={ventana(t, m('automovil'), m('comerciales'))}>
            <path d="M 0 600 Q 600 520 1200 600 L 1200 700 Q 600 620 0 700 Z" fill={isDark ? '#3a3f47' : '#cbd2da'} />
            {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={60 + k * 200} y={640 - 30 * Math.sin((k / 5) * Math.PI)} width={90} height={8} rx={4} fill="#fff" opacity={0.7} />)}
            <Auto x={xAuto} y={640 - 40 * Math.sin(Math.min(1, xAuto / 1200) * Math.PI)} rot={-25 * derrape} />
            {t >= m('abs') && <Letrero x={300} y={300} texto="Frenos antibloqueo" fondo={AZUL_M} id={ID} tam={28} op={e1(t, m('abs')) * (1 - sm(t, m('conducir'), m('conducir') + 0.4))} />}
            {t >= m('conducir') && <Letrero x={300} y={300} texto="Igual hay que saber conducir" id={ID} tam={28} op={e1(t, m('conducir'))} />}
            {t >= m('accidentes') && <g opacity={e1(t, m('accidentes'))}>{[0, 1, 2].map((k) => <path key={k} d={`M ${820 + k * 40} 560 l 20 -40 l 10 30 l 20 -36`} stroke={ROJO_M} strokeWidth={6} fill="none" />)}<Letrero x={900} y={300} texto="Más accidentes" fondo={ROJO_M} id={ID} tam={28} /></g>}
          </g>
        )}
        {t >= m('comerciales') && (
          <g opacity={e1(t, m('comerciales'))}>
            <PantallaCRM x={600} y={746} s={0.6} n={6} isDark={isDark} />
            <Persona id={ID} x={300} y={760} s={0.9} corbata cuerpo={VIOLETA} />
            <Persona id={ID} x={900} y={760} s={0.9} cuerpo={VERDE} />
            {t >= m('preguntar') && <Burbuja x={110} y={420} w={300} texto="«…»" u={1} c={c} id={ID} tam={40} />}
            {t >= m('preguntar') && <Letrero x={600} y={300} texto="No sabe preguntar" fondo={ROSA} id={ID} tam={28} op={e1(t, m('preguntar'))} />}
          </g>
        )}
      </Toma>

      {/* 3 · Newell: solo 25–30 % siente el retorno */}
      <Toma t={t} a={m('newell')} b={fin + 1} cy={500}>
        {ventana(t, m('newell'), m('rapido')) > 0.01 && (
          <g opacity={ventana(t, m('newell'), m('rapido'))}>
            {Array.from({ length: 2 }, (_, f) => <Gente key={f} x={180 + f * 35} y={470 + f * 210} n={10} activos={0} color={VERDE} paso={86} s={0.85} />)}
            {[0, 1, 2, 3, 4, 5].map((k) => { const f = Math.floor(k / 3), j = k % 3; const on = k < 5 ? t >= m('veinticinco') + 0.25 * k : t >= m('veinticinco') + 1.6; return <g key={k} transform={`translate(${180 + f * 35 + j * 86} ${470 + f * 210})`} opacity={on ? 1 : 0}><g transform="scale(0.85)"><circle cx={0} cy={-58} r={15} fill="#f7c4a0" /><path d="M -22 0 Q -22 -40 0 -40 Q 22 -40 22 0 Z" fill={k === 5 ? NARANJA : VERDE} /></g></g>; })}
            <Cifra x={1080} y={430} valor={25} u={sm(t, m('veinticinco'), m('veinticinco') + 1)} suf="–30 %" tam={70} color={VERDE} ancla="end" />
            <Letrero x={600} y={790} texto="Sienten el retorno que esperaban" fondo={VERDE} id={ID} tam={28} op={e1(t, m('veinticinco') + 1)} />
          </g>
        )}
        {t >= m('rapido') && (
          <g opacity={e1(t, m('rapido'))}>
            <path d="M 560 760 L 860 260 L 1160 760 Z" fill={isDark ? '#475569' : '#94a3b8'} />
            <path d="M 800 360 L 860 260 L 920 360 L 880 340 L 860 370 L 840 340 Z" fill="#fff" />
            <g transform={`translate(${lerp(160, 360, sm(t, m('rapido'), m('rapido') + 1.4))} ${lerp(720, 420, sm(t, m('rapido'), m('rapido') + 1.4)) + (t >= m('magnitud') ? 260 * sm(t, m('magnitud'), m('magnitud') + 1.2) : 0)}) rotate(${t >= m('magnitud') ? 40 + 120 * sm(t, m('magnitud'), m('magnitud') + 1.2) : 40})`}>
              <path d="M 0 -60 Q 22 -30 22 20 H -22 Q -22 -30 0 -60 Z" fill={ROSA} /><circle cy={-12} r={9} fill="#bfe3ff" /><path d="M -12 20 L 0 46 L 12 20 Z" fill={NARANJA} opacity={0.6 + 0.4 * Math.sin(t * 20)} />
            </g>
            <Letrero x={860} y={812} texto={t >= m('quiere') ? 'Y no entienden qué quiere el cliente' : t >= m('magnitud') ? 'La magnitud de la tarea' : 'Rápido y en toda la empresa'} fondo={t >= m('magnitud') ? GRIS : undefined} id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
