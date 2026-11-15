import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Calendario, Persona, Sello, Megafono, Regalo, Conector, Pastilla, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Volver a hablarles.
 * Toma 1: el caso de 2.000 dólares como un embudo de cinco franjas (100.000 → 4.000 → 2.000 → 600 → 60) por el que
 * caen puntos; los que no actúan se escurren por un costado hasta un charco de 3.940 interesados.
 * Toma 2: el charco se separa en tres grupos y de cada uno sale un arco que vuelve al embudo en una etapa distinta:
 * los comprometidos a la franja del anuncio (vender el clic, 5 días), los aterrizados a la de la página (vender el
 * registro, 7 días) y los propios al siguiente escalón. Abajo se encienden, en orden, emoción, lógica y miedo.
 */

const ID = 'br19', P = 'br-retargeting';

export const RetargetingBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('forma'), 'Volver a hablarles'], [m('dosmil'), 'Un caso de 2.000 dólares'], [m('quedan'), 'Los que no actuaron'],
    [m('comprometidos'), 'Tres grupos'], [m('orden'), 'Emoción, lógica, miedo'], [m('unavez'), 'Se crean una vez'],
  ];
  const F: [string, number, string, string][] = [['cienmil', 100000, 'Ven', GRIS], ['cuatro', 4000, 'Interactúan', AZUL_M], ['dos', 2000, 'Clic', VIOLETA], ['treinta', 600, 'Datos', ROSA], ['diez', 60, 'Compran', VERDE]];
  const charco = sm(t, m('quedan'), m('quedan') + 1.5);
  const G: [string, string, string, string, string, string, number, number, number][] = [
    ['comprometidos', 'Comprometidos', 'Compr.', AZUL_M, 'cinco', 'Vender el clic', 290, 480, 5],
    ['aterrizados', 'Aterrizados', 'Aterr.', ROSA, 'siete', 'Vender el registro', 470, 440, 7],
    ['propios', 'Propios', 'Propios', VERDE, 'propios', 'Siguiente oferta', 660, 395, 0],
  ];
  const ciclo = ((t - m('orden')) * 0.8) % 3;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Volver a hablarles">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El embudo del caso y el charco */}
      <Toma t={t} a={0} b={m('comprometidos')} cy={470}>
        <g opacity={E('dosmil', 0.6, -0.4)}>
          <Megafono x={960} y={250} s={0.7} habla={1} t={t} />
          <Cifra x={1080} y={250} valor={2000} u={1} pre="$" tam={40} color={NARANJA} miles />
          <Txt x={1080} y={286} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>en anuncios</Txt>
        </g>
        {F.map(([n, v, txt, col], k) => {
          const w0 = 560 - k * 100, y = 200 + k * 108;
          const u = t >= m(n) - 0.1 ? Math.min(1, E(n)) : 0.12;
          return (
            <g key={n} opacity={u}>
              <path d={`M ${560 - w0 / 2} ${y} H ${560 + w0 / 2} L ${560 + (w0 - 100) / 2} ${y + 98} H ${560 - (w0 - 100) / 2} Z`} fill={col} />
              <Txt x={560} y={y + 60} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>{v.toLocaleString('es-CL')}</Txt>
              {!movil && k > 0 && <Txt x={560 - w0 / 2 - 14} y={y + 58} textAnchor="end" fontSize={24} fill={c.texto} peso={800}>{txt}</Txt>}
            </g>
          );
        })}
        {Array.from({ length: 6 }, (_, k) => { const p = (t * 0.5 + k / 6) % 1; return <circle key={k} cx={560 + 30 * Math.sin(k * 2)} cy={200 + p * 520} r={8} fill={NARANJA} opacity={Math.sin(Math.PI * p) * E('cienmil')} />; })}
        {charco > 0 && (
          <g>
            {Array.from({ length: 6 }, (_, k) => { const p = (t * 0.6 + k / 6) % 1; return <circle key={k} cx={lerp(760, 960, p)} cy={lerp(360, 640, p) - 60 * Math.sin(Math.PI * p)} r={8} fill={AMBAR} opacity={Math.sin(Math.PI * p) * charco} />; })}
            <ellipse cx={980} cy={700} rx={170 * charco} ry={46 * charco} fill={AMBAR} opacity={0.35} />
            {Array.from({ length: 5 }, (_, k) => <Persona key={k} id={ID} x={890 + k * 46} y={710} s={0.36} cuerpo={AMBAR} />)}
            <Cifra x={980} y={570} valor={3940} u={charco} tam={48} color={AMBAR} miles />
            <Pastilla x={980} y={800} texto={movil ? 'Sin actuar' : 'Interesados que no actuaron'} fondo={AMBAR} tam={24} op={charco} />
          </g>
        )}
      </Toma>

      {/* 2 · Tres grupos que vuelven */}
      <Toma t={t} a={m('comprometidos')} b={fin + 1} cy={470}>
        <g opacity={E('comprometidos', 0.6, -0.4)}>
          {([[250, 360, 'Anuncio', NARANJA], [330, 280, 'Página', VIOLETA], [410, 200, 'Compra', VERDE]] as const).map(([y, w, txt, col]) => (
            <g key={txt}>
              <path d={`M ${300 - w / 2} ${y} H ${300 + w / 2} L ${300 + (w - 80) / 2} ${y + 72} H ${300 - (w - 80) / 2} Z`} fill={col} />
              <Txt x={300} y={y + 46} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>{txt}</Txt>
            </g>
          ))}
          <path d="M 300 490 V 596" stroke={c.apagado} strokeWidth={6} strokeDasharray="10 8" />
          <rect x={210} y={600} width={180} height={110} rx={18} fill={c.panel} style={sombra(0.14, 4, 10)} />
          <Regalo x={300} y={665} s={0.6} color={VERDE} />
        </g>
        {G.map(([n, txt, corto, col, nD, dest, gy, tx, dias], k) => {
          const u = E(n, 0.6);
          const arco = sm(t, m(nD), m(nD) + 1);
          return (
            <g key={n} opacity={Math.min(1, u)}>
              {[0, 1, 2].map((j) => <Persona key={j} id={ID} x={860 + j * 50} y={gy + 40} s={0.38} cuerpo={col} />)}
              <Pastilla x={910} y={gy - 50} texto={movil ? corto : txt} fondo={col} tam={24} />
              {dias > 0 && <g opacity={arco}><Calendario x={1100} y={gy} s={0.42} marcados={dias} /><Txt x={1100} y={gy + 66} textAnchor="middle" fontSize={22} fill={c.texto} peso={800}>{`${dias} días`}</Txt></g>}
              <Conector x1={830} y1={gy + 10} x2={k === 2 ? 395 : tx} y2={k === 2 ? 650 : gy} u={arco} t={t} color={col} curva={k === 2 ? 0.1 : -0.1} puntos={4} vel={0.5} />
              {!movil && <Pastilla x={640} y={k === 2 ? 720 : gy - 40} texto={dest} fondo={c.panel} color={col} tam={22} op={arco} />}
            </g>
          );
        })}
        {t >= m('orden') && (
          <g opacity={E('orden')}>
            {(['Emoción', 'Lógica', 'Miedo'] as const).map((txt, k) => <Pastilla key={txt} x={movil ? 640 : 480 + k * 150} y={805} texto={txt} fondo={[ROSA, AZUL_M, AMBAR][k]} tam={24} op={Math.floor(ciclo) === k ? 1 : movil ? 0 : 0.35} s={Math.floor(ciclo) === k ? 1.08 : 1} />)}
          </g>
        )}
        {t >= m('unavez') && <Sello x={1030} y={800} texto="Una vez" u={sm(t, m('unavez'), m('unavez') + 0.6)} color={GRIS} tam={26} rot={-6} />}
      </Toma>
    </Lienzo>
  );
};
