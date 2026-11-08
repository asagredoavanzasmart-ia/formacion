import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Burbuja, Hoja, Lupa, Estrella, Gente, Cifra, Calendario, Paso, Edificio, Engranaje, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * La espiral del fracaso. Toma 1: Steve, supervisor estrella, frente a su línea nueva; Jeff pide informes (hojas que
 * vuelan hacia Steve) sin explicar; Steve los entrega tarde; Jeff lo mira con lupa (más control) y Steve se encoge;
 * su estrella se apaga y piensa en irse. Toma 2: la espiral que gira sola: control → deja de proponer → peor imagen
 * → más control; los datos: 50 parejas, 850 gerentes, hasta el 90 % y los primeros cinco días. Toma 3: cinco pasos
 * para revertirla y la prevención (la supervisión que baja a medida que el desempeño sube).
 */

const ID = 'fb10', P = 'fb-espiral';

export const EspiralFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('fabrica'), 'El jefe que fabrica el problema'], [m('steve'), 'Steve, supervisor estrella'], [m('jeff'), 'Jeff pide informes'], [m('noexplico'), 'Sin explicar por qué'],
    [m('desconfianza'), 'Lo vive como desconfianza'], [m('controlarlo'), 'Más control'], [m('renunciar'), 'Piensa en renunciar'],
    [m('espiral'), 'Una espiral que se alimenta sola'], [m('parejas'), '50 parejas, 850 gerentes'], [m('noventa'), 'Hasta el 90 %'], [m('cinco'), 'Los primeros cinco días'],
    [m('revertir'), 'Cinco pasos para revertirla'], [m('prevenir'), 'Para prevenirla'],
  ];
  const control = sm(t, m('controlarlo'), m('renunciar'));
  const animo = 1 - sm(t, m('desconfianza'), m('renunciar'));
  const PASOS = [
    ['revertir', 'Lugar neutro: hablar de la relación'], ['revertir', 'Acordar con hechos dónde hay problema'], ['pregunta', '«¿Qué hago yo que te lo hace difícil?»'],
    ['pregunta', 'Menos supervisión si mejora'], ['pregunta', 'Avisarse cuando algo moleste'],
  ] as const;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La espiral del fracaso">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · Steve y Jeff */}
      <TomaFB t={t} a={0} b={m('espiral')} cy={500}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        {t >= m('steve') && (
          <g opacity={e1(t, m('steve'))}>
            <g opacity={1 - sm(t, m('renunciar') - 0.5, m('renunciar'))}><Engranaje x={1000} y={560} r={70} t={t} color={GRIS} hueco={c.panel} />
            <Engranaje x={1080} y={470} r={44} t={-t * 1.6} color={GRIS} hueco={c.panel} /></g>
            <g transform={`translate(780 720) scale(${lerp(1.05, 0.88, control)}) translate(-780 -720)`}>
              <Persona id={ID} x={780} y={720} s={1.05} cuerpo={NARANJA} ojos={0.4 + 0.6 * animo} />
            </g>
            <Estrella x={780} y={480} r={30} fill="#fbbf24" op={0.15 + 0.85 * animo} rot={t * 20} />
            <Txt x={780} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Steve</Txt>
          </g>
        )}
        {t >= m('jeff') && (
          <g opacity={e1(t, m('jeff'))}>
            <Persona id={ID} x={280} y={720} s={1.05} cuerpo={VIOLETA} corbata />
            <Txt x={280} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Jeff</Txt>
          </g>
        )}
        {t >= m('informes') && t < m('controlarlo') + 0.5 && [0, 1, 2].map((k) => {
          const u = ((t - m('informes')) * 0.45 + k / 3) % 1;
          return <Hoja key={k} x={lerp(340, 720, u)} y={lerp(560, 520, u) - 70 * Math.sin(Math.PI * u)} w={40} h={52} rot={u * 60} op={Math.min(1, u * 6, (1 - u) * 6) * vent(t, m('informes'), m('controlarlo') + 0.5)} />;
        })}
        {vent(t, m('informes'), m('desconfianza')) > 0.01 && <g opacity={vent(t, m('informes'), m('desconfianza'))}><Burbuja x={300} y={500} w={360} texto="Informe de cada rechazo" u={sm(t, m('informes'), m('informes') + 1)} c={c} id={ID} tam={28} /></g>}
        {vent(t, m('desconfianza'), m('controlarlo')) > 0.01 && <g opacity={vent(t, m('desconfianza'), m('controlarlo'))}><Burbuja x={760} y={440} w={380} texto="No confía en mí" u={sm(t, m('desconfianza'), m('desconfianza') + 1)} c={c} id={ID} tam={28} lado="der" /></g>}
        {vent(t, m('proactivo'), m('controlarlo')) > 0.01 && <Letrero x={280} y={470} texto="«No es proactivo»" fondo={GRIS} id={ID} tam={28} op={vent(t, m('proactivo'), m('controlarlo'))} />}
        {control > 0.01 && (
          <g opacity={control * (1 - sm(t, m('renunciar'), m('renunciar') + 0.6))}>
            <Lupa x={lerp(420, 620, control)} y={480} r={70} c={c} id={ID} clip={`${ID}-lupa`} rot={150} />
          </g>
        )}
        {t >= m('renunciar') && (
          <g opacity={e1(t, m('renunciar'))}>
            <rect x={940} y={520} width={100} height={200} rx={6} fill="#a16b3f" />
            <circle cx={1020} cy={620} r={7} fill="#fbbf24" />
            <Letrero x={780} y={380} texto="Pensaba en renunciar" fondo={ROJO_M} id={ID} tam={28} />
          </g>
        )}
      </TomaFB>

      {/* 2 · la espiral y los datos */}
      <TomaFB t={t} a={m('espiral')} b={m('revertir')} cy={470}>
        {vent(t, m('espiral'), m('noventa')) > 0.01 && (
          <g opacity={vent(t, m('espiral'), m('noventa'))}>
            <g transform={`translate(400 450) rotate(${t * 30})`}>
              <path d={Array.from({ length: 120 }, (_, k) => { const a = k * 0.16, r = 20 + k * 1.6; return `${k ? 'L' : 'M'} ${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`; }).join(' ')} stroke={ROJO_M} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.75} />
            </g>
            {['Más control', 'Deja de proponer', 'Peor imagen'].map((txt, k) => (
              <g key={k} opacity={sm(t, m('espiral') + 0.6 + k * 0.8, m('espiral') + 1.1 + k * 0.8)}>
                <Paso x={680} y={300 + k * 120} w={440} texto={txt} color={ROJO_M} c={c} tam={30} />
              </g>
            ))}
            {t >= m('parejas') && (
              <g opacity={e1(t, m('parejas'))}>
                <Cifra x={760} y={700} valor={50} u={sm(t, m('parejas'), m('parejas') + 1)} tam={56} color={NARANJA} />
                <Txt x={760} y={740} textAnchor="middle" fontSize={26} fill={c.texto}>parejas</Txt>
                <Cifra x={1000} y={700} valor={850} u={sm(t, m('parejas') + 1.5, m('parejas') + 2.5)} tam={56} color={AZUL_M} />
                <Txt x={1000} y={740} textAnchor="middle" fontSize={26} fill={c.texto}>gerentes</Txt>
              </g>
            )}
          </g>
        )}
        {t >= m('noventa') && (
          <g opacity={e1(t, m('noventa'))}>
            <Cifra x={600} y={260} valor={90} u={sm(t, m('noventa'), m('noventa') + 1.2)} pre="hasta " suf=" %" tam={70} color={ROJO_M} />
            <Txt x={600} y={310} textAnchor="middle" fontSize={28} fill={c.texto}>de los jefes separa a su equipo</Txt>
            <rect x={150} y={360} width={420} height={260} rx={26} fill={c.panel} />
            <rect x={630} y={360} width={420} height={260} rx={26} fill={c.panel} />
            <Gente x={210} y={520} n={3} activos={3} color={VERDE} paso={120} s={0.8} />
            <Gente x={690} y={520} n={3} activos={3} color={GRIS} paso={120} s={0.8} />
            <Txt x={360} y={590} textAnchor="middle" fontSize={28} fill={c.texto}>De confianza</Txt>
            <Txt x={840} y={590} textAnchor="middle" fontSize={28} fill={c.texto}>Mano de obra</Txt>
            {t >= m('cinco') && (
              <g opacity={e1(t, m('cinco'))}>
                <Calendario x={600} y={720} s={0.7} marcados={Math.min(5, Math.floor(Math.max(0, t - m('cinco')) * 4))} />
                <Txt x={720} y={730} fontSize={28} fill={c.texto}>Primeros 5 días</Txt>
              </g>
            )}
          </g>
        )}
      </TomaFB>

      {/* 3 · revertir y prevenir */}
      <TomaFB t={t} a={m('revertir')} b={fin + 1} cy={470}>
        {vent(t, m('revertir'), m('prevenir')) > 0.01 && (
          <g opacity={vent(t, m('revertir'), m('prevenir'))}>
            {PASOS.map(([n, txt], k) => (
              <Paso key={k} x={120} y={180 + k * 116} w={960} texto={txt} color={[AZUL_M, VIOLETA, NARANJA, VERDE, ROSA][k]} c={c} op={e1(t, m(n) + (n === 'revertir' ? k * 1.4 : (k - 2) * 1.6))} tam={30} />
            ))}
          </g>
        )}
        {t >= m('prevenir') && (
          <g opacity={e1(t, m('prevenir'))}>
            <path d="M 180 640 L 1020 640" stroke={c.apagado} strokeWidth={6} />
            <path d="M 180 640 L 180 220" stroke={c.apagado} strokeWidth={6} />
            <path d={`M 180 260 C 500 280, 700 560, 1020 600`} stroke={VIOLETA} strokeWidth={10} fill="none" strokeDasharray={1000} strokeDashoffset={1000 * (1 - sm(t, m('prevenir'), m('prevenir') + 2))} />
            <path d={`M 180 600 C 500 580, 700 300, 1020 260`} stroke={VERDE} strokeWidth={10} fill="none" strokeDasharray={1000} strokeDashoffset={1000 * (1 - sm(t, m('prevenir'), m('prevenir') + 2))} />
            <Txt x={1010} y={240} textAnchor="end" fontSize={28} fill={VERDE}>Dominio de la tarea</Txt>
            <Txt x={1010} y={580} textAnchor="end" fontSize={28} fill={VIOLETA}>Supervisión</Txt>
            <Txt x={600} y={700} textAnchor="middle" fontSize={28} fill={c.texto}>Involúcrate al principio, suelta después</Txt>
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
