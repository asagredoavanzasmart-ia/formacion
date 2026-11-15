import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Escalon, Domino, Engranaje, Visto, Cruz, Persona, Regalo, Megafono, Frasco, Tarjeta, Conector, Pastilla, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Qué conservar.
 * Toma 1: el sistema para captar demanda: una escalera que un cliente sube y, a su lado, las piezas que se quedan
 * (oferta de entrada, una frase, tráfico propio) que se encienden y se conectan a la escalera; las que se descartan
 * (teatralidad, presión, creer que el primer día es todo) caen a un cesto tachadas.
 * Toma 2: el engranaje del embudo conectado con producto, venta consultiva, marca y retención: una máquina que gira.
 * Si se copian solo las tácticas, los engranajes se sueltan y los clientes salen por la puerta giratoria.
 * Toma 3: el primer paso como tres tareas que se marcan, cada una con su objeto: la escalera, el gran dominó y la
 * lista de 50 lugares y 50 frases.
 */

const ID = 'br29', P = 'br-sintesis';

export const SintesisBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('sistema'), 'Un sistema para captar demanda'], [m('quedarse'), 'Lo que se queda'], [m('descartarse'), 'Lo que se descarta'],
    [m('conectas'), 'Conectado al negocio'], [m('copias'), 'Solo tácticas'], [m('revisa'), 'Tu primer paso'],
  ];
  const sube = sm(t, m('escalera'), m('escalera') + 2.5);
  const Q: [string, string, string, string][] = [['entrada', 'Oferta de entrada', 'Entrada', NARANJA], ['frase', 'Una sola frase', 'Una frase', ROSA], ['propio', 'Tráfico propio', 'Tráfico propio', VIOLETA]];
  const D = ['Teatralidad', 'Presión', 'El día uno es todo'];
  const conecta = sm(t, m('conectas'), m('conectas') + 1.5);
  const suelta = sm(t, m('copias'), m('copias') + 1.2);
  const GEAR: [string, string, string][] = [['Producto', 'Producto', AZUL_M], ['Venta consultiva', 'Consultiva', VIOLETA], ['Marca', 'Marca', ROSA], ['Retención', 'Retención', VERDE]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Qué conservar">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Conservar y descartar */}
      <Toma t={t} a={0} b={m('conectas')} cy={470}>
        <g opacity={E('sistema', 0.6, -0.4)}>
          <rect x={80} y={720} width={480} height={12} rx={6} fill={c.apagado} />
          {[0, 1, 2, 3].map((k) => <Escalon key={k} x={100 + k * 110} y={720} w={110} h={90 + k * 90} color={[AMBAR, NARANJA, ROSA, VIOLETA][k]} />)}
          <Persona id={ID} x={lerp(150, 480, sube)} y={lerp(630, 360, sube)} s={0.5} cuerpo={TEAL} />
          <Pastilla x={320} y={790} texto={movil ? 'Escalera completa' : 'Escalera de valor completa'} fondo={NARANJA} tam={24} op={E('escalera')} />
        </g>
        {Q.map(([n, txt, corto, col], k) => {
          const u = E(n, 0.5);
          return (
            <g key={n} opacity={u}>
              <rect x={640} y={210 + k * 92} width={330} height={72} rx={18} fill={c.panel} style={sombra(0.12, 4, 8)} />
              <rect x={640} y={210 + k * 92} width={12} height={72} rx={5} fill={col} />
              <Visto x={690} y={246 + k * 92} r={20} />
              <Txt x={722} y={256 + k * 92} fontSize={26} fill={c.texto} peso={800}>{movil ? corto : txt}</Txt>
              <Conector x1={640} y1={246 + k * 92} x2={520} y2={320 + k * 40} u={u} t={t} color={col} puntos={2} grosor={4} curva={0.1} />
            </g>
          );
        })}
        {D.map((txt, k) => {
          const u = E('descartarse', 0.5, k * 0.4);
          const cae = sm(t, m('descartarse') + 1.2 + k * 0.5, m('descartarse') + 2 + k * 0.5);
          return (
            <g key={txt} opacity={u * (1 - 0.6 * cae)} transform={`translate(${cae * (980 - 800)} ${cae * (720 - (520 + k * 70))}) scale(${1 - 0.5 * cae})`} style={{ transformOrigin: `800px ${520 + k * 70}px` }}>
              <rect x={640} y={500 + k * 70} width={320} height={56} rx={14} fill={ROJO_M} opacity={0.15} />
              <Cruz x={675} y={528 + k * 70} r={18} />
              <Txt x={705} y={537 + k * 70} fontSize={24} fill={c.texto} peso={800}>{txt}</Txt>
            </g>
          );
        })}
        <g opacity={E('descartarse')}>
          <path d="M 1000 690 H 1120 L 1104 800 H 1016 Z" fill="#64748b" />
          <rect x={990} y={676} width={140} height={18} rx={8} fill="#475569" />
        </g>
      </Toma>

      {/* 2 · La máquina */}
      <Toma t={t} a={m('conectas')} b={m('revisa')} cy={470}>
        <g opacity={E('conectas')}>
          <Engranaje x={600} y={470} r={110} t={t * (suelta > 0.5 ? 3 : 1)} color={NARANJA} hueco={c.panel} />
          <Txt x={600} y={478} textAnchor="middle" fontSize={22} fill={c.texto} peso={800}>Embudo</Txt>
          {GEAR.map(([txt, corto, col], k) => {
            const a = (k / 4) * Math.PI * 2 - Math.PI / 4;
            const d = lerp(380, 215, conecta) + 120 * suelta;
            const x = 600 + Math.cos(a) * d * 1.3, y = 470 + Math.sin(a) * d * 0.9;
            return (
              <g key={txt} opacity={1 - 0.65 * suelta}>
                <Engranaje x={x} y={y} r={64} t={suelta > 0.5 ? 0 : -t * 1.7} color={col} hueco={c.panel} />
                <Txt x={x} y={y + (Math.sin(a) > 0 ? 104 : -88)} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>{movil ? corto : txt}</Txt>
              </g>
            );
          })}
          <Pastilla x={600} y={800} texto={suelta > 0.5 ? (movil ? 'Gira en falso' : 'Solo tácticas: gira en falso') : 'Máquina comercial'} fondo={suelta > 0.5 ? ROJO_M : VERDE} tam={26} op={E('conectas', 0.5, 1.2)} />
          {suelta > 0.5 && Array.from({ length: 4 }, (_, k) => { const p = (t * 0.5 + k / 4) % 1; return <g key={k} opacity={Math.sin(Math.PI * p)}><Persona id={ID} x={lerp(700, 1120, p)} y={600} s={0.35} cuerpo={GRIS} /></g>; })}
        </g>
      </Toma>

      {/* 3 · El primer paso */}
      <Toma t={t} a={m('revisa')} b={fin + 1} cy={470}>
        {([['revisa', 'Revisa tu escalera de valor', 'Tu escalera'], ['domino', 'Escribe tu gran dominó y tres dudas', 'Tu gran dominó'], ['lista', 'Lista 50 lugares y 50 frases', 'Lista 50 y 50']] as const).map(([n, txt, corto], k) => {
          const u = t >= m(n) - 0.1 ? Math.min(1, E(n)) : 0.2;
          const hecho = sm(t, m(n) + 0.6, m(n) + 1);
          const y = 220 + k * 175;
          return (
            <g key={n} opacity={u}>
              <rect x={120} y={y} width={960} height={140} rx={26} fill={c.panel} style={sombra(0.14, 6, 14)} />
              <rect x={160} y={y + 40} width={60} height={60} rx={14} fill={c.panel2} />
              {hecho > 0 && <Visto x={190} y={y + 70} r={26} op={hecho} />}
              <Txt x={250} y={y + 82} fontSize={30} fill={c.texto} peso={800}>{movil ? corto : txt}</Txt>
              <g transform={`translate(960 ${y + 70})`}>
                {k === 0 && [0, 1, 2, 3].map((j) => <rect key={j} x={-60 + j * 30} y={40 - (j + 1) * 20} width={28} height={(j + 1) * 20} rx={4} fill={[AMBAR, NARANJA, ROSA, VIOLETA][j]} />)}
                {k === 1 && <Domino x={0} y={40} h={74} cae={sm(t, m(n) + 0.5, m(n) + 1.3)} color={NARANJA} puntos={2} />}
                {k === 2 && <><Txt x={-20} y={8} textAnchor="middle" fontSize={34} fill={VIOLETA} peso={800}>50</Txt><Txt x={50} y={8} textAnchor="middle" fontSize={34} fill={ROSA} peso={800}>50</Txt></>}
              </g>
            </g>
          );
        })}
      </Toma>
    </Lienzo>
  );
};
