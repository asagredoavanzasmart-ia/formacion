import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, Sello, Balde, Megafono, Cubo, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Retener vale más.
 * Toma 1: un embudo vierte clientes en un balde que pierde agua por cuatro agujeros (la retención casi no aparece en
 * los libros). Reichheld y Sasser (1990): al tapar parte de la fuga (5 % menos de deserción) la barra de utilidades sube
 * entre 25 y 85 %, y el cliente que se queda ya no paga otra adquisición.
 * Toma 2: Oliver (1980): el anuncio promete «en 10 minutos» y lo que llega es más bajo; la brecha se pinta en rojo.
 * Anderson (1998): un cliente muy insatisfecho con su megáfono alcanza a muchos; uno satisfecho, a pocos.
 * Al final, la frase atribuida a Bill Bernbach: un gran anuncio hace fracasar más rápido a un mal producto.
 */

const ID = 'br27', P = 'br-retencion';

export const RetencionBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('poco'), 'Casi solo adquisición'], [m('reichheld'), 'Reichheld y Sasser (1990)'], [m('oliver'), 'Expectativas (Oliver, 1980)'],
    [m('anderson'), 'Boca a boca (Anderson, 1998)'], [m('bernbach'), 'Un gran anuncio, un mal producto'],
  ];
  const tapa = t >= m('cinco') ? 2 : 0;
  const nivel = 0.35 + 0.45 * sm(t, m('cinco'), m('cinco') + 2.5);
  const util = sm(t, m('utilidades'), m('utilidades') + 1.6);
  const brecha = sm(t, m('diez'), m('diez') + 1);
  const habla = sm(t, m('insatisfechos'), m('insatisfechos') + 1.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Retener vale más">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El balde */}
      <Toma t={t} a={0} b={m('oliver')} cy={470}>
        <g opacity={E('poco', 0.6, -0.4)}>
          <path d="M 210 190 H 430 L 350 270 V 310 H 290 V 270 Z" fill={`url(#${ID}-marca)`} />
          <Txt x={320} y={176} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>Adquisición</Txt>
          {Array.from({ length: 4 }, (_, k) => { const p = (t * 0.7 + k / 4) % 1; return <circle key={k} cx={320} cy={lerp(320, 420, p)} r={11} fill={NARANJA} opacity={Math.sin(Math.PI * p)} />; })}
          <Balde x={320} y={700} t={t} nivel={nivel} fugas={4} tapados={tapa} s={1.05} />
          <Pastilla x={320} y={800} texto={tapa ? 'Menos deserción' : (movil ? 'Se escapan' : 'Los clientes se escapan')} fondo={tapa ? VERDE : ROJO_M} tam={24} />
        </g>
        <Tarjeta x={620} y={200} w={500} h={540} titulo={movil ? 'Utilidades' : 'Utilidades, según el sector'} c={c} id={ID} op={E('reichheld')} acento={VERDE}>
          <Pastilla x={250} y={110} texto="−5 % de deserción" fondo={VERDE} tam={26} op={E('cinco')} />
          <rect x={60} y={460} width={380} height={5} rx={2} fill={c.apagado} />
          <rect x={120} y={460 - 70 * util} width={260} height={70 * util} rx={12} fill={VERDE} />
          <rect x={120} y={460 - 260 * util} width={260} height={190 * util} rx={12} fill={VERDE} opacity={0.3} />
          <Txt x={250} y={448 - 260 * util} textAnchor="middle" fontSize={34} fill={c.texto} peso={800} opacity={util}>+25 a +85 %</Txt>
          <Txt x={250} y={505} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>Harvard Business Review</Txt>
        </Tarjeta>
        <Conector x1={440} y1={560} x2={620} y2={500} u={E('cinco')} t={t} color={VERDE} curva={0.15} puntos={3} />
        {t >= m('retenido') && <Sello x={870} y={800} texto={movil ? 'Ya adquirido' : 'No paga otra adquisición'} u={sm(t, m('retenido'), m('retenido') + 0.6)} color={VERDE} tam={24} rot={-3} />}
      </Toma>

      {/* 2 · Expectativas y boca a boca */}
      <Toma t={t} a={m('oliver')} b={fin + 1} cy={470}>
        <g opacity={E('oliver') * (1 - 0.7 * E('anderson'))}>
          <rect x={110} y={200} width={300} height={160} rx={20} fill={`url(#${ID}-marca)`} />
          <Txt x={260} y={262} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>Anuncio</Txt>
          <Txt x={260} y={310} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>«En 10 minutos»</Txt>
          <rect x={120} y={700} width={420} height={6} rx={3} fill={c.apagado} />
          <rect x={150} y={700 - 300 * sm(t, m('oliver'), m('oliver') + 1)} width={140} height={300 * sm(t, m('oliver'), m('oliver') + 1)} rx={12} fill={VIOLETA} />
          <rect x={370} y={700 - lerp(300, 120, brecha) * sm(t, m('satisfaccion'), m('satisfaccion') + 1)} width={140} height={lerp(300, 120, brecha) * sm(t, m('satisfaccion'), m('satisfaccion') + 1)} rx={12} fill={AZUL_M} />
          <rect x={370} y={400} width={140} height={180 * brecha} rx={12} fill={ROJO_M} opacity={0.3} />
          <Txt x={220} y={745} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>Prometido</Txt>
          <Txt x={440} y={745} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>Percibido</Txt>
          <Conector x1={260} y1={360} x2={220} y2={395} u={E('oliver')} t={t} color={VIOLETA} puntos={2} grosor={4} />
          <Pastilla x={330} y={800} texto={movil ? 'Desconfirmación' : 'Desconfirmación negativa'} fondo={ROJO_M} tam={24} op={brecha} />
        </g>
        {t >= m('anderson') && (
          <g opacity={E('anderson')}>
            {[0, 1].map((k) => {
              const x = k === 0 ? 760 : 1020, n = k === 0 ? 9 : 3, r = k === 0 ? 150 : 70;
              const u = sm(habla, k * 0.3, k * 0.3 + 0.7);
              return (
                <g key={k}>
                  {Array.from({ length: n }, (_, j) => { const a = (j / n) * Math.PI * 2; return <g key={j} opacity={u}><Persona id={ID} x={x + Math.cos(a) * r * u} y={460 + Math.sin(a) * r * 0.7 * u + 40} s={0.32} cuerpo={GRIS} /></g>; })}
                  <Cara id={ID} x={x} y={440} r={40} e={k === 0 ? -1 : 1} enojo={k === 0 ? 1 : 0} />
                  {k === 0 && <Megafono x={x - 40} y={520} s={0.5} habla={habla} t={t} />}
                  <Txt x={x} y={680} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>{k === 0 ? (movil ? 'Insatisfecho' : 'Muy insatisfecho') : 'Satisfecho'}</Txt>
                </g>
              );
            })}
          </g>
        )}
        {t >= m('bernbach') && <Pastilla x={800} y={235} texto={movil ? 'Gran anuncio + mal producto' : 'Gran anuncio + mal producto = fracaso más rápido'} fondo={NARANJA} tam={24} op={E('bernbach')} />}
      </Toma>
    </Lienzo>
  );
};
