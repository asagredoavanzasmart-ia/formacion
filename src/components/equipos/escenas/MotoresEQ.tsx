import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Rol, Cuenta, Edificio, Flujo, Hoja, Corazon, Rotulo, Persona, Txt, NARANJA, ROSA, AZUL_M, ROJO_M, VERDE, VIOLETA, PIZARRA, AMBAR, ac, sm, e1, lerp, tono, sombra } from './kitEQ';
import type { PropsCE } from './kitEQ';

/**
 * «Los dos motores de adquisición», en cuatro tomas.
 * 1 · Un cliente frente a dos caminos: cómo llega decide roles, herramientas y ritmo.
 * 2 · Inbound: un imán sobre la empresa atrae clientes que llegan solos; brillan los casos de éxito; a un costado
 *     se encienden los canales (buscador, contenido, redes, descargables). El cliente llega muy informado y exige.
 * 3 · Outbound: el equipo sale a un mapa del mercado; marca cuentas objetivo, investiga con la lupa, llama y
 *     envía secuencias; ticket alto, perfil de cliente ideal; la cuenta está fría y hay que encender el interés.
 * 4 · Los dos motores alimentan el plano del equipo: la atracción define la arquitectura.
 */

const ID = 'eq03';
const nombres = ['llega', 'roles', 'inbound', 'solo', 'casos', 'seo', 'contenido', 'redes', 'descargables', 'educados', 'informado', 'sepamenos', 'outbound', 'abierto', 'targeted', 'investigacion', 'telefono', 'ticket', 'icp', 'frio', 'cero', 'ambos', 'arquitectura', 'pregunta'] as const;
type N = typeof nombres[number];

const Iman: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -50 -40 V 10 A 50 50 0 0 0 50 10 V -40 H 22 V 10 A 22 22 0 0 1 -22 10 V -40 Z" fill={ROJO_M} />
    <path d="M 0 60 A 50 50 0 0 0 50 10 V -40 H 22 V 10 A 22 22 0 0 1 0 32 Z" fill="#000" opacity={0.12} />
    <rect x={-50} y={-58} width={28} height={20} fill="#e5e7eb" /><rect x={22} y={-58} width={28} height={20} fill="#e5e7eb" />
  </g>
);

const Lupa: React.FC<{ x: number; y: number; s?: number; c?: string }> = ({ x, y, s = 1, c = '#334155' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={14} y={14} width={14} height={40} rx={7} fill={c} transform="rotate(-45 14 14)" />
    <circle r={26} fill={c} /><circle r={18} fill="#e0f2fe" /><ellipse cx={-6} cy={-7} rx={5} ry={8} fill="#fff" opacity={0.8} transform="rotate(30 -6 -7)" />
  </g>
);

export const MotoresEQ: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Los dos motores de adquisición'], [m('llega'), '¿Cómo llega el cliente?'], [m('roles'), 'Decide roles, herramientas y ritmo'],
    [m('inbound'), 'Motor inbound: atracción'], [m('solo'), 'El cliente llega solo'], [m('casos'), 'Marca, reputación y casos'], [m('seo'), 'Las tácticas'],
    [m('educados'), 'Mercados educados'], [m('informado'), 'Llega muy informado'], [m('sepamenos'), 'Exige respuestas técnicas'],
    [m('outbound'), 'Motor outbound: prospección'], [m('abierto'), 'Salir al mercado'], [m('targeted'), 'Cuentas objetivo'], [m('investigacion'), 'Investigación profunda'], [m('telefono'), 'Teléfono y secuencias'],
    [m('ticket'), 'Ticket alto, venta compleja'], [m('icp'), 'Perfil de cliente ideal (ICP)'], [m('frio'), 'Interés en frío'], [m('cero'), 'Necesidad desde cero'],
    [m('ambos'), 'La mayoría combina ambos'], [m('arquitectura'), 'La atracción define el equipo'],
  ];

  const canales: { n: N; txt: string; y: number }[] = [
    { n: 'seo', txt: 'Buscadores (SEO)', y: 240 }, { n: 'contenido', txt: 'Contenido', y: 340 }, { n: 'redes', txt: 'Redes y pauta', y: 440 }, { n: 'descargables', txt: 'Descargables', y: 540 },
  ];
  const cuentas: [number, number][] = [[230, 300], [380, 250], [520, 330], [300, 440], [470, 470]];
  const objetivo = [1, 2, 4];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Los dos motores de adquisición">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · dos caminos */}
      <Toma t={t} a={-1} b={m('inbound')} zi={1}>
        <path d="M 600 720 C 600 560 420 480 230 420" stroke={isDark ? '#3a3f47' : '#dfe3e8'} strokeWidth={60} fill="none" strokeLinecap="round" />
        <path d="M 600 720 C 600 560 780 480 970 420" stroke={isDark ? '#3a3f47' : '#dfe3e8'} strokeWidth={60} fill="none" strokeLinecap="round" />
        <Iman x={230} y={330} s={0.8} rot={180} />
        <g transform="translate(970 330)"><circle r={46} fill={AZUL_M} /><circle r={30} fill="#fff" /><circle r={14} fill={AZUL_M} /></g>
        {t >= m('llega') && <g opacity={e1(t, m('llega'))}><Persona id={ID} x={600} y={720 + 0 * Math.sin(t)} s={0.6} cuerpo={AZUL_M} /></g>}
        {t >= m('roles') && ['Roles', 'Herramientas', 'Ritmo'].map((s, k) => <g key={s} opacity={e1(t, m('roles') + k * 0.3)}><Letrero x={600} y={190 + k * 80} texto={s} fondo={[VIOLETA, NARANJA, VERDE][k]} id={ID} /></g>)}
      </Toma>

      {/* TOMA 2 · inbound */}
      <Toma t={t} a={m('inbound')} b={m('outbound')}>
        <Suelo y={700} isDark={isDark} />
        <Edificio x={300} y={700} w={200} h={260} color={NARANJA} />
        <Iman x={300} y={330 + 6 * Math.sin(t * 2.5)} s={1.1} rot={180} />
        {[0, 1, 2].map((k) => <path key={k} d={`M ${230 - k * 30} ${400 + k * 26} Q 300 ${440 + k * 40} ${370 + k * 30} ${400 + k * 26}`} stroke={ROJO_M} strokeWidth={3} fill="none" opacity={(0.45 - k * 0.1) * (0.6 + 0.4 * Math.sin(t * 4 - k))} />)}
        {t >= m('solo') && Array.from({ length: 4 }, (_, k) => { const ph = ((t - m('solo')) * 0.18 + k / 4) % 1; return <g key={k} opacity={Math.min(1, ph * 6, (1 - ph) * 6) * (1 - ac(t, m('informado') - 0.4, m('informado')))}><Persona id={ID} x={lerp(1120, 430, ph)} y={700} s={0.34} cuerpo={[AZUL_M, VERDE, VIOLETA, ROSA][k]} /></g>; })}
        {t >= m('casos') && [0, 1, 2].map((k) => <g key={k} opacity={e1(t, m('casos') + k * 0.2)} transform={`translate(${230 + k * 70} ${210 - (k === 1 ? 20 : 0)})`}><path d="M 0 -22 L 6 -7 L 22 -7 L 9 3 L 14 19 L 0 9 L -14 19 L -9 3 L -22 -7 L -6 -7 Z" fill={AMBAR} /></g>)}
        {/* canales de atracción */}
        {canales.map((k, i) => t >= M(k.n) && (
          <g key={k.n} opacity={e1(t, M(k.n))}>
            <g transform={`translate(720 ${k.y})`}>
              {i === 0 && <Lupa x={0} y={0} s={0.9} />}
              {i === 1 && <Hoja x={0} y={0} w={46} h={60} lineas={3} />}
              {i === 2 && <Corazon x={0} y={0} s={0.55} />}
              {i === 3 && <g><Hoja x={0} y={0} w={46} h={60} lineas={2} /><path d="M -10 6 L 0 20 L 10 6 M 0 20 V -10" stroke={AZUL_M} strokeWidth={5} fill="none" strokeLinecap="round" /></g>}
            </g>
            <Letrero x={770} y={k.y} texto={k.txt} fondo={[AZUL_M, NARANJA, ROSA, VIOLETA][i]} id={ID} ancla="start" />
          </g>
        ))}
        {t >= m('educados') && <Letrero x={300} y={760} texto="Mercado educado" fondo={PIZARRA} id={ID} op={e1(t, m('educados'))} />}
        {t >= m('informado') && <g opacity={e1(t, m('informado'))}>
          <Persona id={ID} x={560} y={700} s={0.5} cuerpo={AZUL_M} />
          {[0, 1, 2, 3].map((k) => <rect key={k} x={590} y={620 - k * 12} width={60} height={11} rx={3} fill={['#fde68a', '#bfdbfe', '#fecdd3', '#bbf7d0'][k]} />)}
        </g>}
        {t >= m('sepamenos') && <g opacity={e1(t, m('sepamenos'))}>
          <rect x={430} y={470} width={260} height={74} rx={28} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
          <path d="M 540 544 L 556 570 L 570 544 Z" fill={c.panel} />
          <Txt f="a" x={560} y={518} textAnchor="middle" fontSize={28} fill={c.texto}>¿Y la integración?</Txt>
        </g>}
      </Toma>

      {/* TOMA 3 · outbound */}
      <Toma t={t} a={m('outbound')} b={m('ambos')}>
        <Suelo y={720} isDark={isDark} />
        {/* mapa del mercado */}
        <g opacity={e1(t, m('outbound'))}>
          <rect x={120} y={160} width={500} height={400} rx={24} fill={isDark ? '#1e3a2f' : '#dcfce7'} style={sombra(c.sombra, 4, 10)} />
          <path d="M 150 360 C 230 300 280 420 360 360 S 520 300 590 380" stroke={isDark ? '#2f6b4f' : '#86efac'} strokeWidth={30} fill="none" />
          <path d="M 300 180 C 280 260 340 320 320 540" stroke={isDark ? '#1d4ed8' : '#93c5fd'} strokeWidth={14} fill="none" opacity={0.7} />
          {cuentas.map(([x, y], k) => <g key={k} transform={`translate(${x} ${y})`}><rect x={-16} y={-30} width={32} height={30} rx={4} fill={PIZARRA} />{[0, 1].map((j) => <rect key={j} x={-10 + j * 12} y={-24} width={8} height={8} rx={1} fill="#fde68a" />)}</g>)}
          {objetivo.map((k, j) => t >= m('targeted') && <g key={k} opacity={sm(t, m('targeted') + j * 0.4, m('targeted') + 0.4 + j * 0.4)} transform={`translate(${cuentas[k][0]} ${cuentas[k][1] - 14})`}>
            {[34, 24, 12].map((r, i) => <circle key={r} r={r} fill={i % 2 ? '#fff' : ROJO_M} opacity={0.85} />)}
          </g>)}
          {t >= m('investigacion') && (() => { const u = sm(t, m('investigacion'), m('investigacion') + 1.2); const [x, y] = cuentas[2]; return <g opacity={e1(t, m('investigacion'))}><Lupa x={lerp(700, x + 30, u)} y={lerp(220, y - 50, u)} s={1.4} /></g>; })()}
        </g>
        {t >= m('abierto') && (() => { const u = sm(t, m('abierto'), m('abierto') + 1.6); return <Rol id={ID} rol="sdr" x={lerp(1100, 760, u)} y={720} s={0.6} t={t} sigla={false} herramienta={t >= m('telefono')} />; })()}
        {t >= m('telefono') && Array.from({ length: 3 }, (_, k) => { const ph = ((t - m('telefono')) * 0.5 + k / 3) % 1; const [x, y] = cuentas[objetivo[k]]; return <g key={k} opacity={Math.min(1, ph * 6, (1 - ph) * 6)} transform={`translate(${lerp(740, x, ph)} ${lerp(600, y - 40, ph) - 60 * Math.sin(Math.PI * ph)})`}><rect x={-18} y={-12} width={36} height={24} rx={4} fill="#fff" style={sombra(0.25, 2, 3)} /><path d="M -18 -12 L 0 2 L 18 -12" stroke={AZUL_M} strokeWidth={3} fill="none" /></g>; })}
        {t >= m('ticket') && <g opacity={e1(t, m('ticket'))} transform="translate(980 230)">
          <path d="M -80 -40 H 30 L 70 0 L 30 40 H -80 Q -92 40 -92 28 V -28 Q -92 -40 -80 -40 Z" fill={AMBAR} />
          <circle cx={-62} cy={0} r={9} fill="#fff" /><Txt x={-10} y={14} textAnchor="middle" fontSize={40} fill="#fff" peso={800}>$$$</Txt>
          <Letrero x={0} y={80} texto="Ticket alto" fondo={AMBAR} id={ID} />
        </g>}
        {t >= m('icp') && <g opacity={e1(t, m('icp'))} transform="translate(980 440)">
          <rect x={-90} y={-60} width={180} height={110} rx={16} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
          <circle cx={-48} cy={-12} r={22} fill={VIOLETA} /><rect x={-80} y={14} width={64} height={24} rx={12} fill={VIOLETA} />
          {[0, 1, 2].map((k) => <rect key={k} x={0} y={-34 + k * 24} width={k === 2 ? 50 : 70} height={10} rx={5} fill={c.apagado} />)}
          <Letrero x={0} y={90} texto="ICP" fondo={VIOLETA} id={ID} />
        </g>}
        {t >= m('frio') && (() => { const fria = 1 - sm(t, m('cero') + 0.4, m('cero') + 2); return (
          <g opacity={e1(t, m('frio'))}>
            <Cuenta x={1010} y={650} s={0.9} color={AZUL_M} fria={fria} />
            {t >= m('cero') && [0, 1, 2].map((k) => { const ph = (t * 1.2 + k / 3) % 1; return <path key={k} d={`M ${990 + k * 20} ${600 - 30 * ph} q -8 -12 0 -24 q 8 12 0 24 Z`} fill={NARANJA} opacity={(1 - ph) * (1 - fria)} />; })}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 4 · los dos motores alimentan el plano del equipo */}
      <Toma t={t} a={m('ambos')} b={fin + 5}>
        <Iman x={180} y={360} s={1} rot={90} />
        <g transform="translate(1020 360)"><rect x={-80} y={-70} width={160} height={140} rx={18} fill={isDark ? '#1e3a2f' : '#dcfce7'} /><circle r={30} fill={ROJO_M} /><circle r={18} fill="#fff" /><circle r={8} fill={ROJO_M} /></g>
        <Letrero x={180} y={470} texto="Inbound" fondo={ROJO_M} id={ID} />
        <Letrero x={1020} y={470} texto="Outbound" fondo={VERDE} id={ID} />
        <Flujo x1={260} y1={360} x2={470} y2={400} t={t} n={5} vel={0.5} arco={30} color={[AZUL_M, VIOLETA]} />
        <Flujo x1={930} y1={360} x2={730} y2={400} t={t} n={5} vel={0.5} arco={30} color={[NARANJA, VERDE]} />
        <rect x={460} y={200} width={280} height={420} rx={24} fill={isDark ? '#0f2a4a' : '#1e3a8a'} />
        <path d="M 510 580 V 300 L 600 250 L 690 300 V 580 Z" stroke="#e0f2fe" strokeWidth={5} fill="none" />
        {t >= m('arquitectura') && (['bdr', 'sdr', 'ae', 'am'] as const).map((r, k) => <g key={r} opacity={e1(t, m('arquitectura') + k * 0.3)}><Rol id={ID} rol={r} x={545 + (k % 2) * 110} y={420 + Math.floor(k / 2) * 140} s={0.3} sigla={false} herramienta={false} /></g>)}
        {t >= m('arquitectura') && <Letrero x={600} y={690} texto="Define la arquitectura" fondo={`url(#${ID}-marca)`} id={ID} op={e1(t, m('arquitectura'))} />}
      </Toma>
    </Lienzo>
  );
};
