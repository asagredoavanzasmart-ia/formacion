import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Fajo, Curva, Engranaje, Portatil, Brujula, Burbuja, Visto, Cruz, Propuesta, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Los cuatro roles de la venta compleja, una toma por rol:
 * 1 · El comprador económico junto al presupuesto: el ROI que sube, solo uno, el sello del veto y lo que hay que demostrarle.
 * 2 · El comprador usuario que vive con la solución: el engranaje del día a día y lo que le preocupa; si se lo ignora, se traba.
 * 3 · El comprador técnico en la puerta: los filtros, las propuestas que rebotan y la diferencia de poder (solo dice que no).
 * 4 · El coach como brújula: credibilidad contigo y adentro, orientación y la cancha que te explica.
 */

const ID = 'vc07', P = 'vc-roles';

export const RolesVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('economico'), 'Comprador económico'], [m('usuario'), 'Comprador usuario'], [m('tecnico'), 'Comprador técnico'], [m('poder'), 'La diferencia de poder'], [m('coach'), 'El coach'],
  ];
  const chip = (x: number, y: number, txt: string, op: number, col = c.panel, color = c.texto) => op > 0.01 && (
    <g opacity={op} transform={`translate(${x} ${y})`}>
      <rect x={-150} y={-34} width={300} height={68} rx={34} fill={col} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
      <Txt x={0} y={9} textAnchor="middle" fontSize={26} fill={color}>{txt}</Txt>
    </g>
  );
  const gira = t >= m('sabotaje') ? Math.max(0, 1 - (t - m('sabotaje')) / 1.5) : 1;
  const OPS = ['Operatividad', 'Confiabilidad', 'Mantenimiento', 'Moral del equipo'];
  const rebote = (k: number) => {
    const t0 = m('descartar') + 1.6 * k, u = sm(t, t0, t0 + 1.2);
    return { x: lerp(160, 470, u < 0.8 ? u / 0.8 : 1) - (u >= 0.8 && k !== 2 ? 160 * (u - 0.8) / 0.2 : 0), op: t >= t0 ? 1 : 0, cae: k !== 2 && u >= 0.8 };
  };

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Los 4 roles de la venta compleja">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · comprador económico */}
      <Toma t={t} a={m('economico')} b={m('usuario')} cy={470}>
        <Persona id={ID} x={260} y={720} s={1} corbata cuerpo={VERDE} />
        {t >= m('presupuesto') && <Fajo x={460} y={720} n={Math.min(5, 1 + Math.floor((t - m('presupuesto')) * 2))} w={110} op={e1(t, m('presupuesto'))} />}
        {t >= m('roi') && (
          <g opacity={e1(t, m('roi'))}>
            <rect x={640} y={190} width={460} height={380} rx={24} fill={c.panel} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />
            {t < m('demostrar') ? <>
              <Curva pts={[[680, 520], [780, 500], [880, 430], [980, 330], [1060, 240]]} u={sm(t, m('roi'), m('roi') + 1.5)} color={VERDE} />
              <Txt x={680} y={250} fontSize={30} fill={VERDE}>ROI</Txt>
            </> : ['Impacto financiero', 'Experiencia previa', 'Cabe en el presupuesto'].map((s, k) => (
              <g key={s} opacity={e1(t, m('demostrar') + 1.2 * k)}><Visto x={690} y={270 + k * 110} r={22} /><Txt x={730} y={280 + k * 110} fontSize={movil ? 24 : 28} fill={c.texto}>{movil ? s.split(' ')[0] : s}</Txt></g>
            ))}
          </g>
        )}
        {t >= m('veto') && (
          <g opacity={e1(t, m('veto'))} transform={`translate(260 400) rotate(-12) scale(${1 + 0.4 * (1 - e1(t, m('veto')))})`}>
            <rect x={-90} y={-40} width={180} height={80} rx={10} fill="none" stroke={ROSA} strokeWidth={8} />
            <Txt x={0} y={14} textAnchor="middle" fontSize={40} fill={ROSA}>VETO</Txt>
          </g>
        )}
        {t >= m('uno') && t < m('precio') && <Letrero x={600} y={800} texto={t >= m('veto') ? 'Veto unilateral' : 'Solo uno por objetivo'} fondo={VERDE} id={ID} op={e1(t, t >= m('veto') ? m('veto') : m('uno'))} tam={26} />}
        {t >= m('precio') && <Letrero x={600} y={800} texto="¿Solo busca precio? Ajusta tu trabajo" fondo={GRIS} id={ID} op={e1(t, m('precio'))} tam={26} />}
      </Toma>

      {/* 2 · comprador usuario */}
      <Toma t={t} a={m('usuario')} b={m('tecnico')} cy={470}>
        <Persona id={ID} x={260} y={720} s={1} cuerpo={AZUL_M} />
        <Portatil x={430} y={720} s={0.8} />
        {t >= m('vive') && <g opacity={e1(t, m('vive'))}>
          <Engranaje x={300} y={330} r={70} t={t * gira + (t >= m('sabotaje') ? 0 : 0)} color={t >= m('sabotaje') ? ROSA : AZUL_M} hueco={c.panel} />
          <Engranaje x={420} y={400} r={46} t={-t * gira * 1.5} color={t >= m('sabotaje') ? ROSA : TEAL} hueco={c.panel} />
          {t >= m('sabotaje') && <Cruz x={360} y={250} r={30} op={e1(t, m('sabotaje'))} />}
        </g>}
        {OPS.map((s, k) => chip(860, 260 + k * 120, movil ? s.split(' ')[0] : s, e1(t, m('operatividad') + 1 * k)))}
        {t >= m('sabotaje') && <Letrero x={600} y={820} texto="Ignorarlo: el sabotaje más letal" fondo={ROSA} id={ID} op={e1(t, m('sabotaje'))} tam={26} />}
      </Toma>

      {/* 3 · comprador técnico */}
      <Toma t={t} a={m('tecnico')} b={m('coach')} cy={470}>
        <g opacity={e1(t, m('puerta'))}>
          <rect x={470} y={380} width={40} height={360} rx={8} fill={GRIS} /><rect x={690} y={380} width={40} height={360} rx={8} fill={GRIS} />
          <rect x={470} y={360} width={260} height={30} rx={8} fill={isDark ? '#64748b' : '#475569'} />
          <rect x={510} y={560} width={180} height={18} rx={9} fill={ROSA} transform={`rotate(${t >= m('descartar') + 3.2 && t < m('descartar') + 4.6 ? -50 : 0} 510 569)`} />
        </g>
        <Persona id={ID} x={850} y={740} s={0.85} cuerpo={VIOLETA} />
        {t >= m('abogados') && t < m('poder') && ['Abogados', 'Contadores', 'Reguladores', 'RR. HH.'].map((s, k) => (
          <g key={s} opacity={e1(t, m('abogados') + 0.5 * k)}>
            <Persona id={ID} x={180 + k * 120} y={300} s={0.35} cuerpo={[GRIS, AMBAR, TEAL, ROSA][k]} />
            {!movil && <Txt x={180 + k * 120} y={340} textAnchor="middle" fontSize={20} fill={c.tenue}>{s}</Txt>}
          </g>
        ))}
        {t >= m('descartar') && t < m('poder') && [0, 1, 2].map((k) => { const r = rebote(k); return r.op > 0 && <g key={k}><Propuesta x={r.x} y={600} s={0.7} op={r.cae ? 0.5 : 1} />{r.cae && <Cruz x={r.x} y={510} r={20} />}</g>; })}
        {t >= m('descartar') && t < m('poder') && <Letrero x={600} y={820} texto="Su objetivo es descartar" fondo={VIOLETA} id={ID} op={e1(t, m('descartar'))} tam={26} />}
        {t >= m('poder') && (
          <g opacity={e1(t, m('poder'))}>
            {chip(300, 250, 'Técnico: solo NO', 1, ROSA, '#fff')}
            {chip(900, 250, 'Económico: SÍ', e1(t, m('poder') + 1.5), VERDE, '#fff')}
            <Persona id={ID} x={150} y={740} s={0.7} cuerpo={VERDE} corbata />
          </g>
        )}
      </Toma>

      {/* 4 · el coach */}
      <Toma t={t} a={m('coach')} b={fin + 1} cy={470}>
        <Brujula x={300} y={420} r={130} ang={20 * Math.sin(t * 1.2)} id={ID} op={e1(t, m('brujula'))} />
        {['Credibilidad contigo', 'Credibilidad interna', 'Quiere que ganes'].map((s, k) => {
          const t0 = m('brujula') + 2 + 2.2 * k;
          return t >= t0 && t < m('orientacion') && <g key={s} opacity={e1(t, t0)}><Visto x={620} y={300 + k * 120} r={26} /><Txt x={670} y={312 + k * 120} fontSize={30} fill={c.texto}>{movil ? ['Contigo', 'Adentro', 'Que ganes'][k] : s}</Txt></g>;
        })}
        {t >= m('orientacion') && <Burbuja x={560} y={330} w={movil ? 600 : 560} texto="«¿Cómo hacemos que esta solución sea una prioridad?»" u={sm(t, m('orientacion'), m('orientacion') + 2)} c={c} id={ID} marca tam={26} />}
        {t >= m('jugadas') && <Letrero x={600} y={790} texto="Tú corres; el coach explica la cancha" id={ID} op={e1(t, m('jugadas'))} tam={26} />}
      </Toma>
    </Lienzo>
  );
};
