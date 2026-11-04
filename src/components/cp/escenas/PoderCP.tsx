import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Edificio, Propuesta, Visto, Cruz, Flujo, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VIOLETA, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * El poder cambió de lado (Newell).
 * Toma 1: un balancín entre la empresa y el cliente. Antes la empresa pesa y tiene el volante; ahora el balancín se
 * inclina hacia el cliente, que toma el volante y decide qué recibir (tres sobres: uno entra, dos se rechazan).
 * Arriba, la sigla: CRM se da vuelta y queda CMR.
 * Toma 2: la empresa como una cara con dos oídos y una boca: las ofertas que empuja rebotan; lo que escucha entra.
 */

const ID = 'cp04', P = 'cp-poder';

const Volante: React.FC<{ x: number; y: number; r?: number; giro: number; color: string }> = ({ x, y, r = 34, giro, color }) => (
  <g transform={`translate(${x} ${y}) rotate(${giro})`}>
    <circle r={r} fill="none" stroke={color} strokeWidth={10} />
    <circle r={9} fill={color} />
    {[0, 120, 240].map((a) => <rect key={a} x={-4} y={0} width={8} height={r} fill={color} transform={`rotate(${a})`} />)}
  </g>
);

export const PoderCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('equilibrio'), 'El poder se desplazó'], [m('ahora'), 'Ahora lo tiene el cliente'], [m('sigla'), 'De CRM a CMR'], [m('oidos'), 'Dos oídos y una boca'],
  ];
  // Inclinación: antes hacia la empresa (izquierda abajo), ahora hacia el cliente.
  const giro = lerp(-12, 12, sm(t, m('ahora') - 0.3, m('ahora') + 1.2));
  const rad = (giro * Math.PI) / 180;
  const extremo = (lado: number): [number, number] => [600 + lado * 340 * Math.cos(rad), 600 + lado * 340 * Math.sin(rad)];
  const [ix, iy] = extremo(-1), [dx, dy] = extremo(1);
  const delCliente = sm(t, m('ahora'), m('ahora') + 1);
  const [vx, vy] = [lerp(ix + 70, dx - 60, delCliente), lerp(iy - 190, dy - 230, delCliente) - 60 * Math.sin(Math.PI * delCliente)];
  const swap = sm(t, m('cmr') - 0.4, m('cmr') + 0.6);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El poder cambió de lado">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el balancín y la sigla */}
      <Toma t={t} a={0} b={m('oidos')} cy={520}>
        {t >= m('sigla') && (
          <g opacity={e1(t, m('sigla'))}>
            <Txt x={480} y={210} textAnchor="middle" fontSize={92} fill={NARANJA}>C</Txt>
            <Txt x={lerp(600, 720, swap)} y={210 - 40 * Math.sin(Math.PI * swap)} textAnchor="middle" fontSize={92} fill={ROSA}>R</Txt>
            <Txt x={lerp(720, 600, swap)} y={210 + 40 * Math.sin(Math.PI * swap)} textAnchor="middle" fontSize={92} fill={AZUL_M}>M</Txt>
          </g>
        )}
        <g opacity={e1(t, m('equilibrio'))}>
          <path d="M 560 760 L 600 600 L 640 760 Z" fill={GRIS} />
          <rect x={-360} y={-10} width={720} height={20} rx={10} fill={isDark ? '#94a3b8' : '#475569'} transform={`translate(600 600) rotate(${giro})`} />
          <g transform={`translate(${ix} ${iy})`}><Edificio x={0} y={-8} w={120} h={170} color={VIOLETA} /></g>
          <g transform={`translate(${dx} ${dy})`}><Persona id={ID} x={0} y={-8} s={0.75} cuerpo={NARANJA} /></g>
          <Volante x={vx} y={vy} giro={t * 40} color={isDark ? '#cbd5e1' : '#334155'} />
        </g>
        {t >= m('decide') && t < m('sigla') + 0.2 && [0, 1, 2].map((k) => {
          const u = sm(t, m('decide') + 0.4 * k, m('decide') + 0.4 * k + 0.9);
          const ok = k === 1;
          const x = lerp(1180, dx + 110, u), y = lerp(260 + k * 90, dy - 330 + k * 70, u);
          return <g key={k}><Propuesta x={ok || u < 1 ? x : x + 60 * (u - 1)} y={y} s={0.55} op={1} />{u >= 1 && (ok ? <Visto x={x + 36} y={y - 30} r={18} /> : <Cruz x={x + 36} y={y - 30} r={18} />)}</g>;
        })}
        <Letrero x={600} y={812} texto={t >= m('cmr') ? 'El cliente gestiona la relación' : t >= m('gestiona') ? 'La empresa gestiona al cliente' : t >= m('ahora') ? 'Decide qué recibir, de quién y cuándo' : 'Antes: el control era de la empresa'} fondo={t >= m('ahora') ? undefined : GRIS} id={ID} tam={28} op={e1(t, m('antes'))} />
      </Toma>

      {/* 2 · dos oídos y una sola boca */}
      <Toma t={t} a={m('oidos')} b={fin + 1} cy={480}>
        <g opacity={e1(t, m('oidos'))}>
          <circle cx={420} cy={460} r={170} fill="#f7c4a0" />
          {[-1, 1].map((l) => <ellipse key={l} cx={420 + l * 175} cy={460} rx={34} ry={56} fill="#eeb08a" opacity={1} transform={`scale(1) `} />)}
          {[-1, 1].map((l) => <ellipse key={`o${l}`} cx={420 + l * 175} cy={460} rx={44 + 6 * Math.sin(t * 4)} ry={66 + 6 * Math.sin(t * 4)} fill="none" stroke={NARANJA} strokeWidth={6} opacity={t >= m('escuchar') ? 0.9 : 0.4} />)}
          <circle cx={360} cy={420} r={14} fill="#334155" /><circle cx={480} cy={420} r={14} fill="#334155" />
          <rect x={395} y={520} width={50} height={16} rx={8} fill="#b4232a" />
          <path d="M 260 330 Q 420 230 580 330 Q 420 300 260 330 Z" fill="#2b1a12" />
        </g>
        <Persona id={ID} x={1000} y={760} s={0.9} cuerpo={NARANJA} />
        {ventana(t, m('empujar'), m('escuchar')) > 0.01 && [0, 1, 2].map((k) => {
          const u = ((t - m('empujar')) * 0.7 + k / 3) % 1;
          const x = u < 0.6 ? lerp(470, 900, u / 0.6) : lerp(900, 760, (u - 0.6) / 0.4);
          return <g key={k} opacity={ventana(t, m('empujar'), m('escuchar'))}><Propuesta x={x} y={520 + (u < 0.6 ? 0 : 80 * (u - 0.6))} s={0.5} />{u > 0.6 && <Cruz x={900} y={460} r={20} />}</g>;
        })}
        {t >= m('escuchar') && <Flujo x1={960} y1={560} x2={620} y2={470} t={t} n={6} color={[NARANJA, ROSA]} op={e1(t, m('escuchar'))} />}
        <Letrero x={600} y={812} texto={t >= m('escuchar') ? 'Escuchar y responder mejor' : t >= m('empujar') ? 'Empujar ofertas no funciona' : 'Dos oídos y una sola boca'} fondo={t >= m('escuchar') ? undefined : GRIS} id={ID} tam={28} op={e1(t, m('oidos'))} />
        {!movil && <Txt f="a" x={420} y={700} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('oidos'))}>La empresa</Txt>}
      </Toma>
    </Lienzo>
  );
};
