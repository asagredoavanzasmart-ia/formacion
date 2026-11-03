import React from 'react';
import { useEscenaVC, Lienzo, Rotulo, Letrero, Txt, Persona, Propuesta, Hilo, Brujula, Visto, Cruz, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Comprador técnico: el portero junto a la puerta, y tres porteros que se turnan en ella.
 * Ingeniero especialista (casco): el económico le entrega la llave, la barrera filtra, gana la medalla del experto.
 * Asesor (maletín): el escudo de su reputación, el medidor de riesgo que baja y la brújula del coach.
 * Técnico con recelo: el candado; el atajo por fuera se tacha; el candado se abre cuando ve cómo gana, con un usuario a favor.
 */

const ID = 'vc09', P = 'vc-tecnico';

export const TecnicoVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('portero'), 'El portero'], [m('ingeniero'), 'El ingeniero especialista'], [m('asesor'), 'El asesor o consultor'], [m('recelo'), 'El técnico con recelo'], [m('valida'), 'Valida con tu coach'],
  ];
  const fase = t >= m('recelo') ? 2 : t >= m('asesor') ? 1 : t >= m('ingeniero') ? 0 : -1;
  const COL = [AZUL_M, VIOLETA, ROSA];
  const cambio = (a: string) => sm(t, m(a) - 0.4, m(a) + 0.4);
  const xG = 860;
  const cuerpo = fase === 1 && t >= m('transformalo') ? NARANJA : fase >= 0 ? COL[fase] : GRIS;
  const filtroU = sm(t, m('filtro'), m('filtro') + 2.4);
  const abre = (fase === 0 && filtroU > 0.5 && filtroU < 0.95) || (fase === 2 && t >= m('gana'));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Comprador técnico">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* los tres perfiles arriba */}
      {['Ingeniero', 'Asesor', 'Con recelo'].map((n, k) => t >= m('tres') + 0.4 * k && (
        <g key={n} opacity={e1(t, m('tres') + 0.4 * k) * (fase === k ? 1 : 0.4)}>
          <circle cx={450 + k * 150} cy={170} r={34} fill={fase === k ? COL[k] : c.panel2} />
          <circle cx={450 + k * 150} cy={160} r={12} fill="#f7c4a0" /><path d={`M ${430 + k * 150} 190 Q ${450 + k * 150} 168 ${470 + k * 150} 190 Z`} fill={fase === k ? '#fff' : COL[k]} />
          {!movil && <Txt x={450 + k * 150} y={232} textAnchor="middle" fontSize={20} fill={c.tenue}>{n}</Txt>}
        </g>
      ))}

      {/* la puerta */}
      <g opacity={e1(t, m('portero'))}>
        <rect x={480} y={360} width={40} height={380} rx={8} fill={GRIS} /><rect x={700} y={360} width={40} height={380} rx={8} fill={GRIS} />
        <rect x={470} y={330} width={280} height={34} rx={8} fill={isDark ? '#64748b' : '#475569'} />
        <rect x={520} y={560} width={180} height={18} rx={9} fill={fase === 2 && !abre ? ROSA : AMBAR} transform={`rotate(${abre ? -60 : 0} 520 569)`} />
        {fase === 2 && (
          <g transform={`translate(500 640)`} opacity={e1(t, m('recelo'))}>
            <rect x={-26} y={-6} width={52} height={44} rx={8} fill={AMBAR} />
            <path d={`M -16 -6 V -22 A 16 16 0 0 1 16 -22 V ${t >= m('gana') ? -36 : -6}`} stroke={AMBAR} strokeWidth={8} fill="none" />
          </g>
        )}
      </g>

      {/* el portero de turno */}
      <g opacity={e1(t, m('portero'))}>
        <Persona id={ID} x={xG} y={740} s={0.85} cuerpo={cuerpo} />
        {fase === 0 && <path d="M 826 600 Q 860 560 894 600 Z" fill={AMBAR} opacity={cambio('ingeniero')} />}
        {fase === 1 && <g opacity={cambio('asesor')}><rect x={900} y={680} width={60} height={46} rx={8} fill="#7c4a1e" /><rect x={918} y={670} width={24} height={14} rx={4} fill="none" stroke="#7c4a1e" strokeWidth={5} /></g>}
        {fase === 0 && t >= m('experto') && <g opacity={e1(t, m('experto'))} transform="translate(860 660)"><circle r={20} fill={AMBAR} /><path d="M 0 -10 L 3 -3 L 10 -3 L 4 2 L 6 10 L 0 5 L -6 10 L -4 2 L -10 -3 L -3 -3 Z" fill="#fff" /></g>}
        {fase === 1 && t >= m('reputacion') && t < m('transformalo') && <g opacity={e1(t, m('reputacion'))} transform="translate(860 470)"><path d="M 0 -50 L 40 -34 V 4 Q 40 36 0 54 Q -40 36 -40 4 V -34 Z" fill={VIOLETA} /><path d="M -16 2 L -4 14 L 18 -12" stroke="#fff" strokeWidth={7} fill="none" /></g>}
        {fase === 1 && t >= m('transformalo') && <Brujula x={860} y={470} r={50} ang={20 * Math.sin(t * 2)} id={ID} op={e1(t, m('transformalo'))} />}
      </g>

      {/* ingeniero: el económico delega; la barrera filtra */}
      {fase === 0 && t >= m('delega') && (
        <g opacity={e1(t, m('delega'))}>
          <Persona id={ID} x={170} y={740} s={0.7} corbata cuerpo={VERDE} />
          <Hilo x1={210} y1={560} x2={820} y2={560} u={sm(t, m('delega'), m('delega') + 1.2)} id={ID} grosor={5} op={1 - sm(t, m('filtro'), m('filtro') + 0.5)} />
          {t < m('filtro') && <Letrero x={500} y={820} texto="El económico delega toda la decisión" fondo={VERDE} id={ID} tam={24} />}
        </g>
      )}
      {fase === 0 && t >= m('filtro') && [0, 1].map((k) => { const u = sm(t, m('filtro') + 1.2 * k, m('filtro') + 1.2 * k + 1.2); const pasa = k === 0; const x = pasa ? lerp(320, 980, u) : lerp(320, 470, Math.min(1, u * 1.3)) - (u > 0.77 ? 90 * (u - 0.77) : 0); return t >= m('filtro') + 1.2 * k && <g key={k}><Propuesta x={x} y={520} s={0.65} op={pasa && u >= 1 ? 0 : 1} />{!pasa && u > 0.8 && <Cruz x={x} y={440} r={18} />}</g>; })}
      {fase === 0 && t >= m('filtro') && <Letrero x={600} y={820} texto={t >= m('experto') ? 'Visto como el experto' : 'Su aprobación es el filtro real'} fondo={AZUL_M} id={ID} op={e1(t, t >= m('experto') ? m('experto') : m('filtro'))} tam={24} />}

      {/* asesor: el riesgo baja */}
      {fase === 1 && t >= m('menor') && (
        <g opacity={e1(t, m('menor'))} transform="translate(230 560)">
          <path d="M -120 0 A 120 120 0 0 1 120 0" stroke={c.apagado} strokeWidth={26} fill="none" />
          <path d="M -120 0 A 120 120 0 0 1 -60 -104" stroke={VERDE} strokeWidth={26} fill="none" />
          <g transform={`rotate(${lerp(60, -60, sm(t, m('menor'), m('menor') + 1.5))})`}><rect x={-4} y={-100} width={8} height={100} rx={4} fill={c.texto} /></g>
          <circle r={12} fill={c.texto} />
          <Txt x={0} y={60} textAnchor="middle" fontSize={26} fill={c.texto}>Menor riesgo</Txt>
        </g>
      )}
      {fase === 1 && t >= m('transformalo') && <Letrero x={600} y={820} texto="Transfórmalo en un coach" id={ID} op={e1(t, m('transformalo'))} tam={24} />}

      {/* con recelo: no lo saltes */}
      {fase === 2 && t >= m('saltes') && t < m('valida') && (
        <g opacity={e1(t, m('saltes')) * (1 - sm(t, m('gana'), m('gana') + 0.6))}>
          <path d="M 300 640 C 300 260 920 260 980 420" stroke={ROSA} strokeWidth={6} fill="none" strokeDasharray="14 12" />
          <Cruz x={610} y={300} r={30} />
        </g>
      )}
      {fase === 2 && t >= m('saltes') && t < m('gana') && <Letrero x={600} y={820} texto="No lo saltes" fondo={ROSA} id={ID} op={e1(t, m('saltes'))} tam={26} />}
      {fase === 2 && t >= m('gana') && t < m('valida') && <Letrero x={600} y={820} texto={t >= m('usuario') ? 'Un usuario entusiasta destraba' : 'Muéstrale cómo gana'} fondo={VERDE} id={ID} op={e1(t, t >= m('usuario') ? m('usuario') : m('gana'))} tam={24} />}
      {fase === 2 && t >= m('usuario') && <g opacity={e1(t, m('usuario'))}><Persona id={ID} x={200} y={740} s={0.7} cuerpo={AZUL_M} /><Visto x={200} y={560} r={24} /></g>}
      {t >= m('valida') && <g opacity={e1(t, m('valida'))}><Brujula x={250} y={460} r={70} ang={15 * Math.sin(t * 2)} id={ID} /><Visto x={320} y={380} r={26} /><Letrero x={600} y={820} texto="Antes de avanzar de etapa" id={ID} tam={24} /></g>}
    </Lienzo>
  );
};
