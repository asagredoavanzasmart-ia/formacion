import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Propuesta, Reloj, Cruz, Visto, e1, sm, lerp, tono, sombra, useMovil, NARANJA, ROSA, AZUL_M, VERDE, AMBAR, GRIS, ROJO_M } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * La oferta irresistible: el valor percibido es lo que decide.
 * 1 · La reunión que se posterga: «lo hablo con mi socio», «me lo tengo que pensar», «no es el momento». Corre el
 *     calendario y la propuesta termina en la pila de pendientes. El precio se tacha: el medidor de valor está bajo.
 * 2 · El árbol: las objeciones son las ramas (no confío en ti, en mí, en el sistema) y el tronco es el valor percibido.
 *     Cuando el valor sube, el tronco engorda y las ramas se quiebran y caen solas. Antes de la reunión viajan videos,
 *     casos, correos y preguntas frecuentes: cada uno apaga una duda del cliente.
 * 3 · El Ferrari: sube a la plataforma; el cartel baja de un millón a cien mil y el medidor muestra el valor muy
 *     por encima del precio. Corre la cuenta de 24 horas y el comprador junta el dinero. Rechazarla, un error.
 */

const ID = 'vc15', P = 'vc-oferta';

/* Auto deportivo de perfil, apoyado en (x, y). `giro` rota las llantas. */
const Deportivo: React.FC<{ x: number; y: number; giro: number }> = ({ x, y, giro }) => (
  <g transform={`translate(${x} ${y})`}>
    <defs>
      <linearGradient id={`${ID}-rojo`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f87171" /><stop offset="0.45" stopColor="#dc2626" /><stop offset="1" stopColor="#991b1b" /></linearGradient>
    </defs>
    <ellipse cx={0} cy={2} rx={270} ry={16} fill="#000" opacity={0.22} />
    <rect x={-262} y={-130} width={74} height={12} rx={4} fill="#7f1d1d" />
    <rect x={-238} y={-120} width={10} height={24} fill="#7f1d1d" />
    <path d="M -255 -38 L -258 -86 Q -256 -104 -232 -106 L -120 -110 Q -70 -164 10 -166 Q 70 -166 120 -116 L 214 -96 Q 252 -88 258 -60 L 260 -38 Q 260 -26 248 -26 L -244 -26 Q -255 -26 -255 -38 Z" fill={`url(#${ID}-rojo)`} />
    <path d="M -96 -114 Q -52 -152 6 -154 Q 58 -153 98 -118 Z" fill="#1e293b" />
    <path d="M -12 -153 L -4 -114" stroke="#dc2626" strokeWidth={8} />
    <path d="M -80 -122 Q -50 -144 -12 -147" stroke="#fff" strokeOpacity={0.35} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M -40 -68 Q 10 -86 64 -70 Q 12 -58 -40 -68 Z" fill="#7f1d1d" />
    <path d="M -230 -92 Q 0 -104 220 -84" stroke="#fff" strokeOpacity={0.3} strokeWidth={4} fill="none" />
    <path d="M 226 -84 L 254 -72 L 250 -64 L 224 -74 Z" fill="#fde68a" />
    <rect x={-258} y={-84} width={12} height={16} rx={3} fill="#fb923c" />
    {[-160, 160].map((cx) => (
      <g key={cx} transform={`translate(${cx} -42)`}>
        <circle r={50} fill="#7f1d1d" />
        <circle r={42} fill="#111827" />
        <circle r={27} fill="#cbd5e1" />
        <g transform={`rotate(${giro})`}>{[0, 72, 144, 216, 288].map((a) => <rect key={a} x={-3.5} y={-25} width={7} height={22} rx={3} fill="#64748b" transform={`rotate(${a})`} />)}</g>
        <circle r={7} fill="#475569" />
      </g>
    ))}
  </g>
);

/* Termómetro de valor: tubo vertical que se llena (0 a 1). (x, y0) es la boca, y1 el fondo del tubo. */
const Medidor: React.FC<{ x: number; y0: number; y1: number; nivel: number; color: string; isDark: boolean; brillo?: number }> = ({ x, y0, y1, nivel, color, isDark, brillo = 0 }) => {
  const c = tono(isDark);
  const yN = lerp(y1, y0, nivel);
  return (
    <g>
      {brillo > 0 && <rect x={x - 40} y={y0 - 16} width={80} height={y1 - y0 + 90} rx={40} fill={color} opacity={0.12 * brillo} />}
      <rect x={x - 24} y={y0} width={48} height={y1 - y0 + 10} rx={24} fill={c.panel2} style={sombra(c.sombra, 3, 8)} />
      <circle cx={x} cy={y1 + 32} r={38} fill={c.panel2} />
      <rect x={x - 14} y={yN} width={28} height={y1 - yN + 20} rx={14} fill={color} />
      <circle cx={x} cy={y1 + 32} r={28} fill={color} />
      {[0.25, 0.5, 0.75].map((k) => <rect key={k} x={x + 26} y={lerp(y1, y0, k) - 2} width={14} height={4} rx={2} fill={c.tenue} opacity={0.5} />)}
    </g>
  );
};

export const OfertaVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('socio'), 'Objeciones que postergan'], [m('posicionamiento'), 'Problema de oferta'], [m('objecion'), 'El precio no es la objeción'],
    [m('ramas'), 'Ramas y tronco'], [m('ti'), 'Tres desconfianzas'], [m('alto'), 'Sube el valor percibido'], [m('caen'), 'Se caen solas'],
    [m('antes'), 'Antes de la reunión'], [m('resueltas'), 'Dudas resueltas'], [m('ferrari'), 'El caso del Ferrari'], [m('cien'), 'Valor muy sobre el precio'],
    [m('horas'), '24 horas para decidir'], [m('nada'), 'Nada que pensar'], [m('error'), 'Así tiene que ser tu oferta'],
  ];

  /* 1 · la reunión */
  const dichos: [string, string][] = [['socio', '«Lo hablo con mi socio»'], ['pensar', '«Me lo tengo que pensar»'], ['momento', '«No es el momento»']];
  let dicho: [string, string] | null = null;
  for (const d of dichos) if (t >= m(d[0])) dicho = d;
  const dia = Math.round(lerp(2, 31, sm(t, m('socio'), m('posicionamiento') + 3)));
  const relojT = t + 6 * Math.max(0, t - m('momento'));
  const xProp = 560 + 160 * sm(t, m('socio'), m('socio') + 0.8) - 330 * sm(t, m('pensar'), m('pensar') + 0.9);
  const yProp = 572 - 22 * sm(t, m('momento'), m('momento') + 0.8);

  /* 2 · el árbol */
  const valor = 0.25 + 0.75 * sm(t, m('alto'), m('caen'));
  const hb = lerp(30, 80, valor), ht = lerp(18, 48, valor);
  const RAMAS: { a: string; largo: string; corto: string; base: [number, number]; punta: [number, number]; dir: number }[] = [
    { a: 'ti', largo: 'No confío en ti', corto: 'En ti', base: [588, 530], punta: [330, 370], dir: -1 },
    { a: 'mi', largo: 'No confío en mí', corto: 'En mí', base: [600, 490], punta: [600, 240], dir: 1 },
    { a: 'sistema', largo: 'No confío en el sistema', corto: 'En el sistema', base: [612, 530], punta: [870, 370], dir: 1 },
  ];
  const caida = (k: number) => sm(t, m('caen') + 0.3 * k, m('caen') + 1.3 + 0.3 * k);
  const fundido = (k: number) => 1 - sm(t, m('caen') + 1.6 + 0.3 * k, m('caen') + 2.6 + 0.3 * k);
  const HOJAS: [number, number, number, string][] = [[0, 8, 74, '#10b981'], [-62, 24, 52, '#059669'], [62, 24, 52, '#059669'], [-32, -44, 50, '#34d399'], [36, -44, 50, '#34d399']];
  const DUDAS: [number, number][] = [[992, 600], [1046, 562], [1104, 562], [1154, 600]];
  const llegadas = [m('videos'), m('videos') + 1.2, m('videos') + 2.4, m('faq')];
  const vuelo = (k: number) => sm(t, llegadas[k] - 1.1, llegadas[k]);

  /* 3 · el Ferrari */
  const xAuto = lerp(-420, 610, sm(t, m('ferrari'), m('ferrari') + 1.8));
  const nivelValor = 0.9 * sm(t, m('millon'), m('millon') + 1);
  const nivelPrecio = lerp(0.9, 0.1, sm(t, m('cien'), m('cien') + 1.2));
  const yPrecio = lerp(740, 300, nivelPrecio);
  const resto = 1 - 0.85 * sm(t, m('horas'), m('error'));
  const salto = t >= m('dinero') && t < m('error') ? Math.abs(Math.sin(t * 7)) * 14 : 0;
  const xComprador = lerp(1260, 1070, sm(t, m('ferrari') + 0.8, m('ferrari') + 2));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La oferta irresistible">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la reunión que se posterga */}
      <Toma t={t} a={0} b={m('ramas')} cy={470}>
        <Reloj x={250} y={220} r={46} t={relojT} aro={GRIS} />
        {t >= m('socio') && (
          <g transform="translate(1060 200)" opacity={e1(t, m('socio'))}>
            <rect x={-62} y={-60} width={124} height={124} rx={16} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
            <path d="M -62 -44 Q -62 -60 -46 -60 L 46 -60 Q 62 -60 62 -44 L 62 -24 L -62 -24 Z" fill={ROSA} />
            <circle cx={-30} cy={-62} r={7} fill={GRIS} /><circle cx={30} cy={-62} r={7} fill={GRIS} />
            <Txt x={0} y={44} textAnchor="middle" fontSize={56} fill={c.texto}>{dia}</Txt>
          </g>
        )}
        <Persona id={ID} x={250} y={720} s={1.05} />
        <Persona id={ID} x={880} y={720} s={1.05} cuerpo={AZUL_M} />
        <rect x={320} y={598} width={500} height={20} rx={8} fill="#c08457" />
        <rect x={334} y={618} width={472} height={24} rx={6} fill="#a16207" />
        <rect x={356} y={640} width={18} height={80} rx={6} fill="#a16207" /><rect x={766} y={640} width={18} height={80} rx={6} fill="#a16207" />
        {t >= m('momento') && [0, 1].map((k) => <Propuesta key={k} x={392 + 6 * k} y={584 - 8 * k} s={0.7} rot={-6 + 8 * k} sello={GRIS} op={e1(t, m('momento') + 0.3 * k)} />)}
        <Propuesta x={xProp} y={yProp} s={0.7} sello={t >= m('momento') + 0.6 ? GRIS : NARANJA} op={e1(t, 0.2)} />
        {dicho && t < m('precio') && <Burbuja key={dicho[1]} x={880} y={420} w={movil ? 560 : 440} lado="der" texto={dicho[1]} u={sm(t, m(dicho[0]), m(dicho[0]) + 0.9)} c={c} id={ID} tam={28} />}
        {t >= m('precio') && (
          <g opacity={e1(t, m('precio'))} transform={`translate(560 455) rotate(${-8 + 3 * Math.sin(t * 2)})`}>
            <path d="M -70 -46 H 30 L 78 0 L 30 46 H -70 Q -84 46 -84 32 V -32 Q -84 -46 -70 -46 Z" fill={AMBAR} style={sombra(c.sombra, 3, 8)} />
            <circle cx={-56} cy={0} r={10} fill={c.panel} />
            <Txt x={0} y={16} textAnchor="middle" fontSize={44} fill="#fff">$</Txt>
            {t >= m('objecion') && <Cruz x={0} y={0} r={58} op={e1(t, m('objecion'))} />}
          </g>
        )}
        {t >= m('objecion') && (
          <g opacity={e1(t, m('objecion') + 0.4)}>
            <Txt x={1080} y={318} textAnchor="middle" fontSize={26} fill={c.texto}>Valor</Txt>
            <Medidor x={1080} y0={340} y1={620} nivel={0.16 + 0.02 * Math.sin(t * 3)} color={ROJO_M} isDark={isDark} />
          </g>
        )}
      </Toma>

      {/* 2 · el árbol de las objeciones */}
      <Toma t={t} a={m('ramas')} b={m('ferrari')} cy={470}>
        <ellipse cx={600} cy={796} rx={430} ry={26} fill={isDark ? '#14532d' : '#bbf7d0'} opacity={0.7} />
        <path d={`M ${600 - hb - 22} 796 Q ${600 - hb} 780 ${600 - hb} 770 L ${600 + hb} 770 Q ${600 + hb} 780 ${600 + hb + 22} 796 Z`} fill="#6f4220" />
        <path d={`M ${600 - hb} 790 C ${600 - hb * 0.8} 650 ${600 - ht} 560 ${600 - ht} 470 L ${600 + ht} 470 C ${600 + ht} 560 ${600 + hb * 0.8} 650 ${600 + hb} 790 Z`} fill="#92582a" />
        <path d={`M 600 470 L ${600 + ht} 470 C ${600 + ht} 560 ${600 + hb * 0.8} 650 ${600 + hb} 790 L 600 790 Z`} fill="#000" opacity={0.16} />
        {[560, 640, 710].map((y, k) => <path key={k} d={`M ${600 - ht * 0.5} ${y} q ${ht * 0.4} 12 ${ht * 0.8} 0`} stroke="#6f4220" strokeWidth={4} fill="none" opacity={0.6} />)}
        {t >= m('alto') && t < m('antes') && <rect x={600 - hb - 16} y={460} width={2 * hb + 32} height={340} rx={40} fill={VERDE} opacity={0.1 + 0.06 * Math.sin(t * 5)} />}
        {RAMAS.map((r, k) => {
          const f = caida(k);
          const op = fundido(k);
          if (op < 0.01) return null;
          const [bx, by] = r.base, [px, py] = r.punta;
          return (
            <g key={r.a} opacity={op} transform={`translate(0 ${330 * f * f}) rotate(${r.dir * 75 * f} ${bx} ${by})`}>
              <path d={`M ${bx} ${by} Q ${(bx + px) / 2 + r.dir * 10} ${(by + py) / 2 + 40} ${px} ${py}`} stroke="#92582a" strokeWidth={22} fill="none" strokeLinecap="round" />
              {HOJAS.map(([dx, dy, rr, col], j) => <circle key={j} cx={px + dx} cy={py + dy} r={rr} fill={col} opacity={0.95} />)}
              {f > 0.02 && f < 0.4 && <path d={`M ${bx - 8} ${by - 10} l 10 8 l -6 6 l 12 8`} stroke={c.texto} strokeWidth={4} fill="none" />}
            </g>
          );
        })}
        {RAMAS.map((r, k) => t >= m(r.a) && <Letrero key={r.a} x={r.punta[0]} y={r.punta[1] + 8} texto={movil ? r.corto : r.largo} fondo={ROSA} id={ID} op={e1(t, m(r.a)) * (1 - caida(k))} tam={24} />)}
        {t >= m('tronco') && <Letrero x={600} y={700} texto="Valor percibido" id={ID} op={e1(t, m('tronco'))} tam={26} />}

        {t >= m('antes') && <Persona id={ID} x={130} y={800} s={0.85} />}
        {t >= m('antes') && <g opacity={e1(t, m('antes'))}><Persona id={ID} x={1070} y={800} s={0.85} cuerpo={AZUL_M} /></g>}
        {t >= m('antes') && DUDAS.map(([x, y], k) => {
          const lista = t >= llegadas[k];
          return (
            <g key={k} opacity={e1(t, m('antes') + 0.25 * k)}>
              {lista ? <Visto x={x} y={y} r={24} op={e1(t, llegadas[k], 0.4)} /> : (
                <g transform={`translate(${x} ${y + 3 * Math.sin(t * 4 + k)})`}><circle r={24} fill={ROSA} /><Txt x={0} y={11} textAnchor="middle" fontSize={30} fill="#fff">?</Txt></g>
              )}
            </g>
          );
        })}
        {[0, 1, 2, 3].map((k) => {
          const u = vuelo(k);
          if (u <= 0 || u >= 1) return null;
          const [ex, ey] = DUDAS[k];
          const x = (1 - u) * (1 - u) * 190 + 2 * (1 - u) * u * 600 + u * u * ex;
          const y = (1 - u) * (1 - u) * 600 + 2 * (1 - u) * u * 170 + u * u * ey;
          return (
            <g key={k} transform={`translate(${x} ${y}) rotate(${-10 + 20 * u})`}>
              {k === 0 && <><rect x={-34} y={-24} width={68} height={48} rx={10} fill={ROSA} /><path d="M -8 -12 L 14 0 L -8 12 Z" fill="#fff" /></>}
              {k === 1 && <><rect x={-26} y={-32} width={52} height={64} rx={6} fill="#fff" style={sombra(0.25, 3, 6)} /><path d="M 0 -18 L 6 -6 L 18 -6 L 8 2 L 12 15 L 0 7 L -12 15 L -8 2 L -18 -6 L -6 -6 Z" fill={AMBAR} /></>}
              {k === 2 && <><rect x={-34} y={-22} width={68} height={44} rx={6} fill="#fff" style={sombra(0.25, 3, 6)} /><path d="M -34 -20 L 0 6 L 34 -20" stroke={NARANJA} strokeWidth={5} fill="none" /></>}
              {k === 3 && <><rect x={-26} y={-32} width={52} height={64} rx={6} fill={AZUL_M} /><Txt x={0} y={14} textAnchor="middle" fontSize={38} fill="#fff">?</Txt></>}
            </g>
          );
        })}
      </Toma>

      {/* 3 · el caso del Ferrari */}
      <Toma t={t} a={m('ferrari')} b={fin + 1} cy={470}>
        <ellipse cx={610} cy={724} rx={280} ry={34} fill={c.panel2} style={sombra(c.sombra, 3, 10)} />
        {[0, 1, 2].map((k) => { const a = ((t * 0.4 + k / 3) % 1) * Math.PI * 2; return <ellipse key={k} cx={610 + 240 * Math.cos(a)} cy={724 + 26 * Math.sin(a)} rx={18} ry={4} fill={c.tenue} opacity={0.35 * (0.5 + 0.5 * Math.sin(a))} />; })}
        <Deportivo x={xAuto} y={718} giro={(xAuto / (2 * Math.PI * 42)) * 360} />

        {t >= m('millon') && (
          <g opacity={e1(t, m('millon'))}>
            <path d="M 480 120 V 236 M 740 120 V 236" stroke={GRIS} strokeWidth={4} />
            <rect x={370} y={236} width={480} height={190} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Txt x={610} y={318} textAnchor="middle" fontSize={60} fill={c.tenue}>1.000.000 €</Txt>
            {t >= m('cien') && <line x1={420} y1={298} x2={lerp(420, 800, sm(t, m('cien'), m('cien') + 0.6))} y2={298} stroke={ROSA} strokeWidth={8} strokeLinecap="round" />}
            {t >= m('cien') && <Txt x={610} y={404} textAnchor="middle" fontSize={76} fill={VERDE} opacity={e1(t, m('cien') + 0.4)}>100.000 €</Txt>}
          </g>
        )}

        {t >= m('millon') && (
          <g opacity={e1(t, m('millon'))}>
            <Txt x={120} y={282} textAnchor="middle" fontSize={26} fill={c.texto}>Valor</Txt>
            <Medidor x={120} y0={300} y1={740} nivel={nivelValor} color={VERDE} isDark={isDark} brillo={t >= m('nada') ? 0.6 + 0.4 * Math.sin(t * 5) : 0} />
            <g transform={`translate(0 ${yPrecio})`}>
              <path d="M 88 0 H 152 M 160 0 l -14 -9 v 18 z" stroke={ROSA} strokeWidth={5} fill={ROSA} />
              <Txt x={172} y={9} fontSize={24} fill={ROSA}>Precio</Txt>
            </g>
          </g>
        )}

        {t >= m('horas') && (
          <g opacity={e1(t, m('horas'))} transform="translate(1060 300)">
            <circle r={74} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
            <circle r={58} fill="none" stroke={GRIS} strokeOpacity={0.25} strokeWidth={12} />
            <circle r={58} fill="none" stroke={ROSA} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={`${resto} 1`} transform="rotate(-90)" />
            <Txt x={0} y={14} textAnchor="middle" fontSize={40} fill={c.texto}>24 h</Txt>
          </g>
        )}

        <Persona id={ID} x={xComprador} y={800 - salto} s={0.9} cuerpo={AZUL_M} />
        {t >= m('dinero') && (
          <g transform={`translate(985 ${790 - salto * 0.6}) scale(${lerp(0.6, 1.1, sm(t, m('dinero'), m('nada')))})`} opacity={e1(t, m('dinero'))}>
            <path d="M -40 0 Q -52 -50 -20 -70 L -14 -82 L 14 -82 L 20 -70 Q 52 -50 40 0 Z" fill="#b45309" />
            <rect x={-18} y={-84} width={36} height={10} rx={5} fill="#78350f" />
            <Txt x={0} y={-22} textAnchor="middle" fontSize={34} fill="#fff">€</Txt>
          </g>
        )}
        {[0, 1, 2, 3, 4].map((k) => {
          const t0 = m('dinero') + 0.6 + 0.8 * k;
          const u = sm(t, t0, t0 + 0.8);
          if (u <= 0 || u >= 1) return null;
          return <g key={k} transform={`translate(${lerp(1180 - 30 * k, 985, u)} ${lerp(430 + 40 * (k % 2), 720, u) - 80 * Math.sin(Math.PI * u)})`}><circle r={15} fill={AMBAR} /><circle r={9} fill="none" stroke="#fde68a" strokeWidth={3} /></g>;
        })}

        {t >= m('error') && (() => {
          const u = sm(t, m('error'), m('error') + 0.45);
          const w = movil ? 580 : 460;
          return (
            <g opacity={u} transform={`translate(610 480) rotate(-2) scale(${lerp(1.6, 1, u)})`}>
              <rect x={-w / 2} y={-38} width={w} height={76} rx={14} fill={c.panel} opacity={0.92} stroke={ROSA} strokeWidth={6} />
              <Txt x={0} y={12} textAnchor="middle" fontSize={34} fill={ROSA}>Rechazarla: un error</Txt>
            </g>
          );
        })()}
      </Toma>
    </Lienzo>
  );
};
