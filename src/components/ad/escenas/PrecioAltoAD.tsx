import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Medidor, Telefono, Billete, Barra, Curva, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * El precio alto cambia el resultado.
 * Toma 1: dos clientes frente a frente: el que pagó barato (medidor de atención bajo, resultado que cae, teléfono de
 * soporte que suena) y el que pagó caro (compromiso alto). Luego el teatro de Arkes y Blumer: butacas ocupadas según el
 * precio pagado.
 * Toma 2: el negocio de fotografía: la cámara recorta lo que sobra, la etiqueta pasa de 300 a 1.500 y la utilidad
 * semanal sube de 1.000 a 38.000 (barras ×5 y ×38).
 */

const ID = 'ad07', P = 'ad-precio-alto';

const Camara: React.FC<{ x: number; y: number; s?: number; t: number; flash?: number }> = ({ x, y, s = 1, t, flash = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-50} width={160} height={110} rx={18} fill="#334155" />
    <rect x={-50} y={-70} width={60} height={26} rx={8} fill="#475569" />
    <circle cx={0} cy={6} r={40} fill="#0f172a" /><circle cx={0} cy={6} r={26} fill="#1e3a8a" /><circle cx={-8} cy={-2} r={8} fill="#fff" opacity={0.5} />
    {flash > 0.01 && <circle cx={56} cy={-30} r={20 + 40 * flash} fill="#fde68a" opacity={(1 - flash) * 0.9} />}
  </g>
);

export const PrecioAltoAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('cambia'), 'El precio cambia el resultado'], [m('barato'), 'Cuando cobras barato'], [m('caro'), 'Cuando paga caro'], [m('respaldo'), 'Arkes y Blumer, 1985'],
    [m('fotografia'), 'El caso de fotografía'], [m('cinco'), '×5 en precio, ×38 en utilidad'], [m('margen'), 'El margen extra'],
  ];
  const atencionBarato = lerp(0.6, 0.15, sm(t, m('atencion'), m('atencion') + 1));
  const ring = t >= m('soporte') ? Math.sin(t * 30) * 4 : 0;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El precio alto cambia el resultado">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Barato frente a caro, y el teatro */}
      <Toma t={t} a={0} b={m('fotografia')} cy={470}>
        <g opacity={ventana(t, m('barato') - 0.2, m('respaldo'))}>
          <rect x={80} y={170} width={480} height={600} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Persona id={ID} x={220} y={640} s={0.7} cuerpo={GRIS} ojos={lerp(1, 0.2, sm(t, m('atencion'), m('atencion') + 1))} />
          <Medidor x={420} y={330} r={80} v={atencionBarato} color={ROJO_M} c={c} />
          {!movil && <Txt f="a" x={420} y={380} textAnchor="middle" fontSize={22} fill={c.tenue}>Atención</Txt>}
          {t >= m('peores') && <Curva pts={[[340, 450], [390, 480], [440, 540], [500, 580]]} u={sm(t, m('peores'), m('peores') + 0.8)} color={ROJO_M} grosor={8} />}
          {t >= m('soporte') && <g transform={`translate(${430 + ring} 660)`}><Telefono x={0} y={0} s={0.5} /></g>}
          <Letrero x={320} y={730} texto="Pagó barato" fondo={GRIS} id={ID} tam={28} />
        </g>
        {t >= m('caro') && (
          <g opacity={ventana(t, m('caro'), m('respaldo'))}>
            <rect x={640} y={170} width={480} height={600} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Persona id={ID} x={780} y={640} s={0.7} cuerpo={NARANJA} corbata />
            <Medidor x={980} y={330} r={80} v={sm(t, m('caro'), m('caro') + 1) * 0.92} color={VERDE} c={c} />
            <Curva pts={[[900, 580], [950, 540], [1000, 480], [1060, 430]]} u={sm(t, m('caro') + 0.4, m('caro') + 1.2)} color={VERDE} grosor={8} />
            <Letrero x={880} y={730} texto="Pagó caro: se compromete" id={ID} tam={28} />
          </g>
        )}
        {t >= m('respaldo') && (
          <g opacity={e1(t, m('respaldo'))}>
            <path d="M 160 200 H 1040 V 260 Q 600 320 160 260 Z" fill={ROJO_M} />
            {[0, 1].map((g) => (
              <g key={g}>
                {Array.from({ length: 12 }, (_, k) => {
                  const fila = Math.floor(k / 4), col = k % 4;
                  const x = (g === 0 ? 230 : 690) + col * 80, y = 440 + fila * 100;
                  const ocupa = g === 0 ? k < 10 : k < 6;
                  const u = sm(t, m('teatro') + k * 0.05, m('teatro') + k * 0.05 + 0.5);
                  return (
                    <g key={k}>
                      <rect x={x - 30} y={y} width={60} height={50} rx={10} fill={g === 0 ? NARANJA : GRIS} opacity={0.35} />
                      {ocupa && u > 0.01 && <g opacity={u}><circle cx={x} cy={y - 14} r={16} fill="#f7c4a0" /><path d={`M ${x - 22} ${y + 10} Q ${x - 22} ${y - 12} ${x} ${y - 12} Q ${x + 22} ${y - 12} ${x + 22} ${y + 10} Z`} fill={g === 0 ? NARANJA : GRIS} /></g>}
                    </g>
                  );
                })}
              </g>
            ))}
            <Letrero x={350} y={780} texto="Precio completo" id={ID} tam={28} />
            <Letrero x={810} y={780} texto="Con descuento" fondo={GRIS} id={ID} tam={28} />
            {!movil && <Txt f="a" x={600} y={360} textAnchor="middle" fontSize={24} fill={c.tenue}>Asistencia a funciones (ilustrativo)</Txt>}
          </g>
        )}
      </Toma>

      {/* 2 · El caso de fotografía */}
      <Toma t={t} a={m('fotografia')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('fotografia'))}>
          <Camara x={220} y={300} s={1.1} t={t} flash={((t - m('fotografia')) * 0.6) % 1} />
          {[0, 1, 2, 3].map((k) => {
            const sale = k > 0 ? sm(t, m('eliminaron') + k * 0.15, m('eliminaron') + k * 0.15 + 0.8) : 0;
            return <rect key={k} x={130 + k * 50 + sale * 40} y={430 + sale * 160} width={40} height={40} rx={8} fill={k === 0 ? NARANJA : GRIS} opacity={1 - sale} transform={`rotate(${sale * 40} ${150 + k * 50} 450)`} />;
          })}
          {t >= m('eliminaron') && <Letrero x={220} y={520} texto="Solo lo que más valora" id={ID} tam={26} op={e1(t, m('eliminaron') + 0.4)} />}
        </g>
        {t >= m('ticket') && (
          <g opacity={e1(t, m('ticket'))}>
            <Cifra x={220} y={680} valor={lerp(300, 1500, sm(t, m('ticket') + 0.3, m('ticket') + 1.5))} u={1} pre="$" tam={74} color={NARANJA} miles />
            <Letrero x={220} y={740} texto="Ticket promedio" id={ID} tam={26} />
          </g>
        )}
        {t >= m('cinco') && (
          <g opacity={e1(t, m('cinco'))}>
            <rect x={470} y={720} width={660} height={8} rx={4} fill={c.apagado} />
            <Barra x={610} y={720} w={140} hMax={480} valor={1} max={38} u={sm(t, m('treinta'), m('treinta') + 1)} color={GRIS} rotulo="Antes" c={c} suf=" mil" />
            <Barra x={960} y={720} w={140} hMax={480} valor={38} max={38} u={sm(t, m('treinta'), m('treinta') + 1.6)} color={VERDE} rotulo="Después" c={c} suf=" mil" />
            {!movil && <Txt f="a" x={790} y={800} textAnchor="middle" fontSize={24} fill={c.tenue}>Utilidad por semana (US$)</Txt>}
            <Letrero x={600} y={150} texto="×5 precio → ×38 utilidad" fondo={VERDE} id={ID} tam={30} op={e1(t, m('semana'))} />
          </g>
        )}
        {t >= m('margen') && (
          <g opacity={e1(t, m('margen'))}>
            <Letrero x={600} y={820} texto="Mejor servicio y más poder para adquirir" fondo={AZUL_M} id={ID} tam={26} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
