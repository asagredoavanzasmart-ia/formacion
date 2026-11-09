import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Busto, Engranaje, Reloj, Calendario, Visto, Cruz, Corazon, Hilo, e1, sm, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Proceso comercial.
 * 1 · El flujo: ingreso de la oportunidad → la etapa (regla, salida, automatización, responsable) → ganado (alerta de
 *     incorporación) o perdido (encuesta de salida).
 * 2 · Pearce: quién hace qué y cuándo, para clientes nuevos y actuales; la solicitud que va a primera o segunda línea, las
 *     métricas (minutos y días), los engranajes que automatizan y la gerencia que dirige el sistema.
 * 3 · Las dos caras del cliente B2B: humana y profesional; manda la profesional, con algo de empatía.
 */

const ID = 'vc24', P = 'vc-procesos';

export const ProcesosVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('etapa'), 'Cada etapa'], [m('ingreso'), 'De la entrada a las dos salidas'], [m('quien'), 'Quién hace qué y cuándo'], [m('metricas'), 'Métricas'],
    [m('gerencia'), 'La gerencia dirige'], [m('caras'), 'Dos caras'],
  ];
  const ATR = ['Regla de avance', 'Acción de salida', 'Automatización', 'Responsable'];
  const caja = (x: number, y: number, w: number, h: number, fill: string, op: number, children?: React.ReactNode) => op > 0.01 && (
    <g opacity={op}><rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={20} fill={fill} style={{ filter: `drop-shadow(0 6px 14px rgba(0,0,0,${c.sombra}))` }} />{children}</g>
  );
  const ticket = sm(t, m('linea'), m('linea') + 1.4);
  const giro = t >= m('automatiza') ? t : 0;
  const prof = sm(t, m('profesional'), m('profesional') + 1.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Proceso comercial">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el flujo */}
      <Toma t={t} a={0} b={m('quien')} cy={470}>
        {caja(600, 400, 420, 380, c.panel, e1(t, m('etapa')), <>
          <rect x={390} y={210} width={420} height={60} rx={20} fill={`url(#${ID}-marcaH)`} />
          <Txt x={600} y={250} textAnchor="middle" fontSize={30} fill="#fff">Etapa</Txt>
          {ATR.map((s, k) => <g key={s} opacity={e1(t, m('etapa') + 0.7 * k)}><circle cx={430} cy={320 + k * 70} r={12} fill={[AZUL_M, VIOLETA, TEAL, NARANJA][k]} /><Txt x={456} y={330 + k * 70} fontSize={movil ? 24 : 28} fill={c.texto}>{movil ? s.split(' ')[0] : s}</Txt></g>)}
        </>)}
        {t >= m('responsable') && ['Ejecutivo', 'Especialista', 'Supervisor'].map((s, k) => (
          <g key={s} opacity={e1(t, m('responsable') + 0.5 * k)}>
            <circle cx={460 + k * 140} cy={700} r={42} fill={[NARANJA, TEAL, VIOLETA][k]} /><Busto x={460 + k * 140} y={706} s={1} color="#fff" />
            {!movil && <Txt x={460 + k * 140} y={772} textAnchor="middle" fontSize={20} fill={c.tenue}>{s}</Txt>}
          </g>
        ))}
        {t >= m('ingreso') && <><Hilo x1={230} y1={400} x2={390} y2={400} u={sm(t, m('ingreso'), m('ingreso') + 0.8)} id={ID} />{caja(150, 400, 160, 110, AZUL_M, e1(t, m('ingreso')), <Txt x={150} y={410} textAnchor="middle" fontSize={26} fill="#fff">Ingreso</Txt>)}</>}
        {t >= m('ganado') && <><Hilo x1={810} y1={360} x2={960} y2={260} u={sm(t, m('ganado'), m('ganado') + 0.8)} id={ID} />{caja(1040, 260, 170, 110, VERDE, e1(t, m('ganado')), <><Visto x={1040} y={250} r={26} /><path d={`M 1090 ${222 + 3 * Math.sin(t * 8)} q 14 6 0 26`} stroke="#fff" strokeWidth={4} fill="none" /></>)}{t < m('perdido') && <Letrero x={1000} y={360} texto="Alerta de incorporación" fondo={VERDE} id={ID} op={e1(t, m('ganado') + 0.6)} tam={22} />}</>}
        {t >= m('perdido') && <><Hilo x1={810} y1={440} x2={960} y2={540} u={sm(t, m('perdido'), m('perdido') + 0.8)} id={ID} />{caja(1040, 540, 170, 110, ROSA, e1(t, m('perdido')), <><Cruz x={1040} y={530} r={26} /></>)}<Letrero x={1000} y={640} texto="Encuesta de salida" fondo={ROSA} id={ID} op={e1(t, m('perdido') + 0.6)} tam={22} /></>}
      </Toma>

      {/* 2 · reglas, métricas y gerencia */}
      <Toma t={t} a={m('quien')} b={m('caras')} cy={470}>
        {[['Clientes nuevos', AZUL_M], ['Clientes actuales', VERDE]].map(([n, col], k) => t < m('metricas') && (
          <g key={n} opacity={e1(t, m('quien') + 0.6 * k)}>
            <rect x={80} y={190 + k * 170} width={1040} height={130} rx={24} fill={c.panel2} />
            <Txt x={110} y={265 + k * 170} fontSize={28} fill={col}>{n}</Txt>
            {[0, 1, 2].map((j) => <g key={j}><circle cx={560 + j * 180} cy={255 + k * 170} r={36} fill={[NARANJA, TEAL, VIOLETA][j]} /><Busto x={560 + j * 180} y={261 + k * 170} s={0.85} color="#fff" /></g>)}
          </g>
        ))}
        {t >= m('reglas') && t < m('metricas') && (
          <g opacity={e1(t, m('reglas'))}>
            {[['1ª línea', 440], ['2ª línea', 820]].map(([n, x]) => <g key={n as string}><rect x={(x as number) - 110} y={570} width={220} height={120} rx={20} fill={c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} /><Txt x={x as number} y={640} textAnchor="middle" fontSize={30} fill={c.texto}>{n}</Txt></g>)}
            {t >= m('linea') && <g transform={`translate(${630 + (ticket < 0.5 ? 0 : -190 * sm(ticket, 0.5, 1))} ${520 + 60 * sm(ticket, 0.5, 1)})`}><rect x={-46} y={-30} width={92} height={60} rx={10} fill={AMBAR} /><rect x={-30} y={-12} width={60} height={8} rx={4} fill="#fff" /><rect x={-30} y={4} width={40} height={8} rx={4} fill="#fff" /></g>}
          </g>
        )}
        {t >= m('metricas') && (
          <g opacity={e1(t, m('metricas'))}>
            <Reloj x={300} y={330} r={80} t={t * 2} />
            <Txt x={300} y={460} textAnchor="middle" fontSize={28} fill={c.texto}>Minutos para atender</Txt>
            <Calendario x={300} y={590} s={0.5} marcados={Math.min(5, Math.floor((t - m('metricas')) * 1.5))} />
            <Txt x={300} y={730} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('metricas') + 1)}>Días para seguir</Txt>
          </g>
        )}
        {t >= m('automatiza') && <g opacity={e1(t, m('automatiza'))}>
          <Engranaje x={760} y={560} r={90} t={giro} color={TEAL} hueco={c.panel} />
          <Engranaje x={900} y={470} r={60} t={-giro * 1.5} color={AZUL_M} hueco={c.panel} />
        </g>}
        {t >= m('gerencia') && <g opacity={e1(t, m('gerencia'))}>
          <Persona id={ID} x={820} y={360} s={0.7} corbata cuerpo={VIOLETA} />
          <g transform={`translate(820 300) rotate(${20 * Math.sin(t * 1.5)})`}><circle r={44} fill="none" stroke={GRIS} strokeWidth={10} /><rect x={-4} y={-44} width={8} height={88} fill={GRIS} /><rect x={-44} y={-4} width={88} height={8} fill={GRIS} /></g>
        </g>}
        {t >= m('gerencia') && <Letrero x={600} y={820} texto="La gerencia dirige el sistema" id={ID} op={e1(t, m('gerencia'))} tam={26} />}
      </Toma>

      {/* 3 · dos caras */}
      <Toma t={t} a={m('caras')} b={fin + 1} cy={470}>
        <g transform="translate(600 470)" opacity={e1(t, m('caras'))}>
          <path d="M -60 260 L -60 90 Q -60 30 0 30 L 0 260 Z" fill={ROSA} opacity={1 - 0.5 * prof} />
          <path d="M 0 30 Q 60 30 60 90 L 60 260 L 0 260 Z" fill={AZUL_M} />
          <path d="M -12 34 L 12 34 L 16 140 L 0 160 L -16 140 Z" fill="#fff" opacity={0.9} transform="translate(30 0)" />
          <path d="M 0 -160 A 110 110 0 0 0 0 60 Z" fill="#f7c4a0" opacity={1 - 0.4 * prof} />
          <path d="M 0 -160 A 110 110 0 0 1 0 60 Z" fill="#e8b48f" />
          <circle cx={-40} cy={-60} r={9} fill="#3b2a20" /><path d="M -60 -10 Q -40 10 -20 -10" stroke="#3b2a20" strokeWidth={5} fill="none" />
          <rect x={20} y={-76} width={50} height={32} rx={8} fill="none" stroke="#1f2937" strokeWidth={6} /><circle cx={45} cy={-60} r={7} fill="#3b2a20" />
          <path d="M 22 -4 H 62" stroke="#3b2a20" strokeWidth={5} />
        </g>
        {t >= m('caras') && <><Letrero x={330} y={300} texto="Humana" fondo={ROSA} id={ID} op={e1(t, m('caras') + 0.6)} tam={26} /><Letrero x={870} y={300} texto="Profesional" fondo={AZUL_M} id={ID} op={e1(t, m('caras') + 1.2)} tam={26 + 8 * prof} /></>}
        {t >= m('profesional') && <Letrero x={870} y={620} texto="Beneficios para su cargo" fondo={AZUL_M} id={ID} op={e1(t, m('profesional') + 0.8)} tam={24} />}
        {t >= m('importa') && <g opacity={e1(t, m('importa'))}><Corazon x={330} y={560} s={0.8} /><Letrero x={330} y={680} texto="Su negocio te importa" fondo={ROSA} id={ID} tam={24} /></g>}
      </Toma>
    </Lienzo>
  );
};
