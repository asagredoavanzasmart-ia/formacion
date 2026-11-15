import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, PersonaCara, Sello, Balde, Megafono, Cubo, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL, resorte } from './kitBR';
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

      {/* 2 · Expectativas (Oliver, 1980): la satisfacción es la brecha entre la línea de lo prometido y el nivel de lo
          percibido. Primero lo percibido supera la promesa (verde); luego el anuncio promete «tu vida en 10 minutos», la
          línea sube con un resorte, lo percibido se queda en lo ordinario y la brecha se pinta en rojo. */}
      <Toma t={t} a={m('oliver')} b={m('anderson')} cy={470}>
        {(() => {
          const tS = m('satisfaccion'), t10 = m('diez');
          const traza = sm(t, tS, tS + 0.9);
          const llena = resorte(t, tS + 1.2, { rigidez: 60, amortiguacion: 13 });
          const sube = resorte(t, t10, { rigidez: 90, amortiguacion: 10 });
          const baja = resorte(t, t10 + 0.6, { rigidez: 70, amortiguacion: 14 });
          const yPiso = 740, yProm = lerp(430, 268, sube), yPerc = lerp(yPiso, 384, llena) + (560 - 384) * baja;
          const supera = yPerc < yProm;
          const gap = Math.abs(yProm - yPerc);
          const malo = sm(t, t10 + 1.0, t10 + 1.6);
          const liquido = supera ? VERDE : AZUL_M;
          const xT = 560, wT = 124;
          return (
            <g>
              <rect x={110} y={yPiso} width={980} height={10} rx={5} fill={c.apagado} opacity={E('oliver')} />
              {/* Anuncio: un cartel sobre un poste */}
              <g opacity={E('oliver', 0.6)}>
                <rect x={222} y={470} width={16} height={270} fill="#64748b" />
                <rect x={100} y={312} width={260} height={168} rx={22} fill={`url(#${ID}-marca)`} style={sombra(0.2, 6, 14)} />
                <Txt x={230} y={368} textAnchor="middle" fontSize={24} fill="#fff" peso={800} opacity={0.85}>Anuncio</Txt>
                <g opacity={1 - sm(t, t10 - 0.2, t10 + 0.2)}><Txt x={230} y={428} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>{movil ? 'Promesa' : 'Lo que prometes'}</Txt></g>
                <g opacity={sm(t, t10, t10 + 0.4)}>
                  {movil
                    ? <Txt x={230} y={432} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>10 minutos</Txt>
                    : <><Txt x={230} y={418} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>Transforma tu vida</Txt><Txt x={230} y={454} textAnchor="middle" fontSize={26} fill="#fff" peso={800}>en 10 minutos</Txt></>}
                </g>
              </g>
              {/* Tubo de lo percibido: vidrio con el nivel del líquido */}
              <g opacity={E('satisfaccion', 0.5)}>
                <rect x={xT} y={236} width={wT} height={yPiso - 236} rx={24} fill={c.panel} opacity={0.6} />
                <rect x={xT} y={236} width={wT} height={yPiso - 236} rx={24} fill="none" stroke={c.apagado} strokeWidth={4} />
                {llena > 0.01 && <>
                  <rect x={xT + 6} y={yPerc} width={wT - 12} height={Math.max(0, yPiso - 6 - yPerc)} rx={18} fill={liquido} />
                  <rect x={xT + 6} y={yPerc} width={34} height={Math.max(0, yPiso - 6 - yPerc)} rx={17} fill="#fff" opacity={0.2} />
                  <ellipse cx={xT + wT / 2} cy={yPerc + 2} rx={wT / 2 - 6} ry={7} fill="#fff" opacity={0.35} />
                </>}
                <Txt x={xT + wT / 2} y={784} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>Percibido</Txt>
              </g>
              {/* Lo que faltó: el volumen de la promesa que no se cumplió, rayado en rojo */}
              {!supera && malo > 0.01 && <g opacity={malo}>
                <rect x={xT + 6} y={yProm} width={wT - 12} height={gap} rx={10} fill={ROJO_M} opacity={0.16} />
                <rect x={xT + 6} y={yProm} width={wT - 12} height={gap} rx={10} fill="none" stroke={ROJO_M} strokeWidth={3} strokeDasharray="10 8" />
              </g>}
              {/* Línea de la promesa: nace en el anuncio y cruza el escenario */}
              <path fill="none" d={`M 360 ${yProm < 330 ? 330 : yProm} V ${yProm} H ${lerp(360, 1060, traza)}`} stroke={VIOLETA} strokeWidth={5} strokeDasharray="16 10" strokeLinecap="round" />
              <Txt x={1060} y={yProm - 16} textAnchor="end" fontSize={24} fill={VIOLETA} peso={800} opacity={sm(traza, 0.7, 1)}>Prometido</Txt>
              {/* Medida de la brecha a la izquierda del tubo */}
              {llena > 0.6 && <g opacity={sm(llena, 0.6, 1)}>
                <path d={`M 536 ${yProm} V ${yPerc} M 524 ${yProm} H 548 M 524 ${yPerc} H 548`} stroke={supera ? VERDE : ROJO_M} strokeWidth={5} strokeLinecap="round" />
                <Txt x={514} y={(yProm + yPerc) / 2 + 9} textAnchor="end" fontSize={26} fill={supera ? VERDE : ROJO_M} peso={800}>{supera ? '+' : (movil ? 'Brecha' : 'Brecha')}</Txt>
              </g>}
              {/* Cliente: sonríe si lo percibido supera lo prometido; se enoja con la brecha */}
              <g opacity={E('satisfaccion', 0.5, 0.4)}>
                <PersonaCara id={ID} x={930} y={yPiso} s={1} cuerpo={TEAL} corbata e={llena > 0.8 ? (supera ? 1 : -1 * malo) : 0} enojo={malo} />
              </g>
              <Pastilla x={890} y={500} texto="Satisfecho" fondo={VERDE} tam={24} op={supera && llena > 0.8 ? sm(llena, 0.8, 1) * (1 - sm(t, t10 - 0.3, t10)) : 0} />
              <Pastilla x={870} y={430} texto={movil ? 'Desconfirmación' : 'Desconfirmación negativa'} fondo={ROJO_M} tam={24} op={sm(t, t10 + 1.8, t10 + 2.3)} />
              {/* La fórmula, arriba y al centro */}
              <Pastilla x={600} y={172} texto={movil ? 'Percibido − prometido' : 'Satisfacción = percibido − prometido'} fondo={c.panel} color={VIOLETA} tam={26} op={E('satisfaccion')} />
            </g>
          );
        })()}
      </Toma>

      {/* 3 · Boca a boca */}
      <Toma t={t} a={m('anderson')} b={fin + 1} cy={470}>
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
