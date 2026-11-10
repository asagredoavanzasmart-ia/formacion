import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Iman, Medidor, Regalo, Portatil, Hoja, Persona, Telefono, Monitor, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Tres tipos, cuatro vehículos.
 * Toma 1: una grilla de 3 × 4 (tipos en filas, vehículos en columnas) que se enciende hasta doce combinaciones.
 * Toma 2: los tres tipos dramatizados: el velocímetro del sitio que marca «30 % más lento» y cuenta ventas perdidas; la
 * muestra gratis (una porción con reloj); el portón de madera con la primera de tres capas de sellador.
 * Toma 3: los cuatro vehículos (software, información, servicio, producto) y el mismo activo en texto, audio y video
 * que multiplica el consumo; en B2B, el diagnóstico gana.
 */

const ID = 'ad18', P = 'ad-tipos-iman';

export const TiposImanAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('doce'), 'Doce combinaciones'], [m('revela'), 'Revelar un problema'], [m('muestra'), 'Una muestra gratuita'], [m('paso'), 'El primer paso gratis'],
    [m('vehiculos'), 'Cuatro vehículos'], [m('formatos'), 'Texto, audio y video'], [m('diagnostico'), 'En B2B: el diagnóstico'],
  ];
  const VEH: [string, string, string][] = [['software', 'Software', AZUL_M], ['informacion', 'Información', VIOLETA], ['servicio', 'Servicio', NARANJA], ['fisico', 'Producto', TEAL]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Tres tipos, cuatro vehículos">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La grilla de doce */}
      <Toma t={t} a={0} b={m('revela')} cy={470}>
        <g opacity={e1(t, 0.2)}>
          {Array.from({ length: 12 }, (_, k) => {
            const f = Math.floor(k / 4), col = k % 4;
            const on = sm(t, m('doce') + k * 0.08, m('doce') + k * 0.08 + 0.4);
            return <rect key={k} x={300 + col * 160} y={220 + f * 160} width={140} height={140} rx={20} fill={on > 0.5 ? [ROSA, AMBAR, VERDE][f] : c.apagado} opacity={0.4 + 0.6 * on} />;
          })}
          {(['Revelar', 'Muestra', '1er paso'] as const).map((s, k) => <Txt key={s} f="a" x={280} y={300 + k * 160} textAnchor="end" fontSize={26} fill={c.texto}>{s}</Txt>)}
          <Iman x={150} y={460} s={0.8} rot={90} atrae={1} t={t} />
          {t >= m('doce') && <Cifra x={620} y={760} valor={12} u={sm(t, m('doce'), m('doce') + 1)} tam={70} color={NARANJA} />}
        </g>
      </Toma>

      {/* 2 · Los tres tipos */}
      <Toma t={t} a={m('revela')} b={m('vehiculos')} cy={470}>
        {([['revela', 230, ROSA], ['muestra', 600, AMBAR], ['paso', 970, VERDE]] as const).map(([n, x, col], k) => (
          <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.12}>
            <rect x={x - 170} y={180} width={340} height={540} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            {k === 0 && <g>
              <Medidor x={x} y={420} r={110} v={lerp(0.2, 0.85, sm(t, m('velocidad'), m('velocidad') + 1))} color={ROJO_M} c={c} />
              {t >= m('lento') && <Cifra x={x} y={510} valor={30} u={sm(t, m('lento'), m('lento') + 1)} suf=" % lento" tam={40} color={ROJO_M} />}
              {t >= m('lento') && <Cifra x={x} y={580} valor={Math.floor((t - m('lento')) * 3)} u={1} pre="−" suf=" ventas/h" tam={30} color={c.texto} />}
            </g>}
            {k === 1 && <g>
              <circle cx={x} cy={400} r={110} fill={AMBAR} opacity={0.25} />
              <path d={`M ${x} 400 L ${x} 290 A 110 110 0 0 1 ${x + 95} 345 Z`} fill={AMBAR} />
              <Txt f="a" x={x} y={560} textAnchor="middle" fontSize={22} fill={c.texto}>Por tiempo o cantidad</Txt>
            </g>}
            {k === 2 && <g>
              {Array.from({ length: 5 }, (_, j) => <rect key={j} x={x - 130} y={290 + j * 50} width={260} height={40} rx={6} fill="#a16207" />)}
              {[0, 1, 2].map((j) => <rect key={j} x={x - 130} y={290} width={260 * (j === 0 ? sm(t, m('sellador'), m('sellador') + 1.2) : 0)} height={240} rx={6} fill={VERDE} opacity={0.35} />)}
              <Txt x={x} y={590} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>1 de 3 capas</Txt>
            </g>}
            <Letrero x={x} y={680} texto={movil ? ['Revelar', 'Muestra', '1er paso'][k] : ['Revelar un problema', 'Muestra gratis', 'Primer paso'][k]} fondo={col} id={ID} tam={26} />
          </g>
        ))}
      </Toma>

      {/* 3 · Los vehículos y los formatos */}
      <Toma t={t} a={m('vehiculos')} b={fin + 1} cy={470}>
        {VEH.map(([n, txt, col], k) => {
          const x = 180 + k * 280;
          return (
            <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.15}>
              <rect x={x - 120} y={180} width={240} height={300} rx={26} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
              <g transform={`translate(${x} 330)`}>
                {k === 0 && <g><rect x={-70} y={-60} width={140} height={110} rx={10} fill={col} />{Array.from({ length: 6 }, (_, j) => <rect key={j} x={-58 + (j % 3) * 42} y={-48 + Math.floor(j / 3) * 46} width={34} height={36} rx={4} fill="#fff" opacity={0.6} />)}</g>}
                {k === 1 && <g><rect x={-80} y={-56} width={160} height={100} rx={12} fill="#0b1220" /><path d="M -14 -26 L 22 -6 L -14 14 Z" fill={col} /><Txt f="a" x={0} y={80} textAnchor="middle" fontSize={24} fill={c.tenue}>13 min</Txt></g>}
                {k === 2 && <Persona id={ID} x={0} y={60} s={0.55} cuerpo={col} />}
                {k === 3 && <g><rect x={-60} y={-50} width={120} height={100} rx={8} fill="#a16207" /><rect x={-60} y={-50} width={120} height={22} rx={8} fill="#78350f" /><rect x={-10} y={-50} width={20} height={100} fill="#fde68a" opacity={0.6} /></g>}
              </g>
              <Letrero x={x} y={440} texto={txt} fondo={col} id={ID} tam={26} />
            </g>
          );
        })}
        {t >= m('formatos') && (
          <g opacity={ventana(t, m('formatos'), m('diagnostico') + 0.2)}>
            {(['Texto', 'Audio', 'Video'] as const).map((s, k) => <Letrero key={s} x={360 + k * 240} y={580} texto={s} fondo={[GRIS, AMBAR, ROJO_M][k]} id={ID} tam={28} />)}
            <Letrero x={600} y={680} texto="×2 a ×4 de consumo" fondo={VERDE} id={ID} tam={30} />
          </g>
        )}
        {t >= m('diagnostico') && (
          <g opacity={e1(t, m('diagnostico'))}>
            <Medidor x={600} y={690} r={90} v={0.85} color={ROSA} c={c} />
            <Letrero x={600} y={780} texto="Le pone cifra al dolor" fondo={ROSA} id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
