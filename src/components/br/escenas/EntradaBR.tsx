import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, Libro, Megafono, Regalo, Moneda3D, Sello, Tarjeta, Conector, Pastilla, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Trabajar o comprar la entrada.
 * Toma 1: una carpa donde un referente ya reunió a su público; dos caminos llegan a la puerta: arriba, alguien que
 * entrega valor (un regalo) y se gana el paso; abajo, una boletería donde se paga con monedas.
 * Toma 2: el lanzamiento: libros que vuelan a sus contactos, la entrevista en el perfil de Tony Robbins, el megáfono
 * de los anuncios que la impulsa, 20 dólares por libro y los contadores (2,5 millones de vistas y 71.248 libros).
 * Toma 3: ninguna vía basta sola: el tráfico pagado cae a cero cuando se apaga el interruptor y el ganado sube
 * despacio acumulándose en capas.
 */

const ID = 'br15', P = 'br-entrada';

export const EntradaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('dos'), 'Dos caminos'], [m('lanzamiento'), 'El lanzamiento del libro'], [m('robbins'), 'En el perfil de Robbins'],
    [m('video'), 'Cifras del autor'], [m('regla'), 'Ninguna basta sola'],
  ];
  const camA = sm(t, m('trabajas'), m('trabajas') + 3);
  const camB = sm(t, m('compras'), m('compras') + 2.4);
  const apaga = sm(t, m('apagas'), m('apagas') + 0.6);
  const graf = sm(t, m('regla'), m('regla') + 2.5);
  const xG = (u: number) => 140 + 820 * u;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Trabajar o comprar la entrada">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Dos caminos a la misma audiencia */}
      <Toma t={t} a={0} b={m('lanzamiento')} cy={470}>
        <g opacity={E('dos', 0.6, -0.5)}>
          <path d="M 740 700 V 380 L 920 220 L 1100 380 V 700 Z" fill="#fde7d2" />
          <path d="M 740 380 L 920 220 L 1100 380 Z" fill={ROSA} />
          <path d="M 920 220 L 1100 380 H 920 Z" fill="#000" opacity={0.1} />
          <Persona id={ID} x={920} y={520} s={0.6} cuerpo={VIOLETA} corbata />
          <rect x={860} y={520} width={120} height={20} rx={6} fill="#78350f" />
          {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={790 + (k % 4) * 90} cy={600 + Math.floor(k / 4) * 50} r={18} fill={`url(#${ID}-cara)`} />)}
          <rect x={720} y={420} width={20} height={280} fill="#78350f" />
          <Txt x={920} y={760} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>{movil ? 'Su público' : 'Un público ya reunido'}</Txt>
        </g>
        <path d="M 100 400 C 400 400 500 470 720 470" stroke={c.apagado} strokeWidth={14} fill="none" opacity={E('trabajas')} />
        <path d="M 100 660 C 400 660 500 560 720 560" stroke={c.apagado} strokeWidth={14} fill="none" opacity={E('compras')} />
        {t >= m('trabajas') && (
          <g>
            <Pastilla x={260} y={320} texto={movil ? 'Trabajas' : 'Trabajas tu entrada'} fondo={VERDE} tam={26} op={E('trabajas')} />
            <Persona id={ID} x={lerp(120, 680, camA)} y={lerp(400, 470, sm(camA, 0.4, 1))} s={0.5} cuerpo={VERDE} />
            {camA < 0.85 && <Regalo x={lerp(150, 710, camA)} y={lerp(350, 420, sm(camA, 0.4, 1))} s={0.4} color={VERDE} />}
          </g>
        )}
        {t >= m('compras') && (
          <g>
            <Pastilla x={260} y={760} texto={movil ? 'La compras' : 'La compras con anuncios'} fondo={NARANJA} tam={26} op={E('compras')} />
            <g opacity={E('compras')}>
              <rect x={420} y={520} width={120} height={120} rx={10} fill={NARANJA} />
              <rect x={440} y={540} width={80} height={50} rx={6} fill="#fde68a" />
              <Txt x={480} y={625} textAnchor="middle" fontSize={20} fill="#fff" peso={800}>Entrada</Txt>
            </g>
            <Persona id={ID} x={lerp(120, 680, camB)} y={lerp(660, 560, sm(camB, 0.4, 1))} s={0.5} cuerpo={NARANJA} />
            {camB > 0.2 && camB < 0.6 && <Moneda3D x={lerp(320, 470, sm(camB, 0.2, 0.5))} y={580} r={16} giro={Math.cos(t * 6)} />}
          </g>
        )}
      </Toma>

      {/* 2 · El lanzamiento */}
      <Toma t={t} a={m('lanzamiento')} b={m('regla')} cy={470}>
        <g opacity={E('lanzamiento')}>
          <Libro x={180} y={480} color={ROSA} titulo="Secretos" autor="" s={0.8} c={c} />
          {[0, 1, 2].map((k) => { const p = ((t - m('lanzamiento')) * 0.5 + k / 3) % 1; return <g key={k} opacity={Math.sin(Math.PI * p)}><rect x={lerp(200, 120 + k * 90, p) - 14} y={lerp(300, 610, p) - 20} width={28} height={40} rx={4} fill={ROSA} /></g>; })}
          {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={120 + k * 90} y={720} s={0.45} cuerpo={[TEAL, AMBAR, VIOLETA][k]} />)}
          <Txt x={210} y={780} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>Sus contactos</Txt>
        </g>
        <g opacity={E('robbins')}>
          <rect x={430} y={220} width={380} height={260} rx={20} fill="#0b1220" />
          <circle cx={460} cy={250} r={8} fill={ROJO_M} opacity={0.6 + 0.4 * Math.sin(t * 6)} />
          <Persona id={ID} x={560} y={440} s={0.55} cuerpo={AZUL_M} corbata />
          <Persona id={ID} x={690} y={440} s={0.55} cuerpo={NARANJA} />
          <Pastilla x={620} y={520} texto={movil ? 'Robbins' : 'Perfil de Tony Robbins'} fondo={AZUL_M} tam={24} />
        </g>
        <Conector x1={280} y1={400} x2={430} y2={360} u={E('robbins')} t={t} color={ROSA} puntos={2} />
        {t >= m('pago') && <g opacity={E('pago')}><Megafono x={960} y={330} s={0.85} habla={1} t={t} /><Conector x1={890} y1={350} x2={815} y2={350} u={1} t={t} color={NARANJA} puntos={3} /></g>}
        <Pastilla x={620} y={600} texto={movil ? '$20 por libro' : '$20 por cada libro vendido'} fondo={VERDE} tam={26} op={E('veinte')} />
        {t >= m('video') && <g opacity={E('video')}><Cifra x={950} y={510} valor={2500000} u={sm(t, m('video'), m('video') + 1.4)} pre="+" tam={40} color={AZUL_M} miles /><Txt x={950} y={548} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>vistas</Txt></g>}
        {t >= m('vendio') && <g opacity={E('vendio')}><Cifra x={950} y={680} valor={71248} u={sm(t, m('vendio'), m('vendio') + 1.4)} tam={46} color={VERDE} miles /><Txt x={950} y={718} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>{movil ? 'en 7 días' : 'libros en una semana'}</Txt></g>}
        {t >= m('vendio') && <Sello x={620} y={760} texto="Según el autor" u={sm(t, m('vendio') + 1, m('vendio') + 1.6)} color={GRIS} tam={24} rot={-3} />}
      </Toma>

      {/* 3 · Ninguna basta sola */}
      <Toma t={t} a={m('regla')} b={fin + 1} cy={470}>
        <Tarjeta x={100} y={190} w={1000} h={560} titulo={movil ? 'Tráfico en el tiempo' : 'Tráfico a lo largo del tiempo'} c={c} id={ID} op={E('regla', 0.6, -0.3)}>
          <path d="M 40 470 H 960 M 40 470 V 90" stroke={c.apagado} strokeWidth={4} />
          {(() => {
            const pts: string[] = [];
            for (let k = 0; k <= 60; k++) { const u = k / 60; if (u > graf) break; const corte = 0.55; const v = u < 0.08 ? u / 0.08 : u < corte ? 1 : Math.max(0, 1 - ((u - corte) / 0.04) * apaga); pts.push(`${k ? 'L' : 'M'} ${xG(u) - 100} ${470 - 300 * v}`); }
            return <path d={pts.join(' ')} stroke={NARANJA} strokeWidth={8} fill="none" strokeLinejoin="round" />;
          })()}
          {[0, 1, 2].map((capa) => {
            const pts: string[] = [`M ${xG(0) - 100} 470`];
            for (let k = 0; k <= 60; k++) { const u = k / 60; if (u > graf) break; pts.push(`L ${xG(u) - 100} ${470 - 260 * Math.pow(u, 1.6) * (1 - capa * 0.3)}`); }
            pts.push(`L ${xG(Math.min(1, graf)) - 100} 470 Z`);
            return <path key={capa} d={pts.join(' ')} fill={VERDE} opacity={0.2 + capa * 0.18} />;
          })}
          <Pastilla x={260} y={130} texto="Pagado" fondo={NARANJA} tam={24} op={graf} />
          <Pastilla x={830} y={250} texto={movil ? 'Ganado' : 'Ganado: se acumula'} fondo={VERDE} tam={24} op={E('acumula')} />
          <g opacity={E('apagas')} transform="translate(560 120)">
            <rect x={-50} y={-26} width={100} height={52} rx={26} fill={apaga > 0.5 ? GRIS : VERDE} />
            <circle cx={apaga > 0.5 ? -24 : 24} cy={0} r={20} fill="#fff" />
            <Txt x={70} y={10} fontSize={24} fill={c.texto} peso={800}>{movil ? 'Apagado' : 'Apagas los anuncios'}</Txt>
          </g>
        </Tarjeta>
      </Toma>
    </Lienzo>
  );
};
