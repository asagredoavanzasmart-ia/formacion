import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Libro, Billete, Megafono, Gente, Curva, Sello, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Trabajar o comprar la entrada.
 * Toma 1: una puerta hacia una audiencia: por la izquierda se entra trabajando (una llave que se va forjando con valor y
 * relación), por la derecha pagando (un torniquete con billetes).
 * Toma 2: el lanzamiento: la entrevista con Tony Robbins en su propio perfil, los anuncios que la empujan a sus seguidores,
 * la comisión de 20 dólares por libro, el contador de vistas y los libros vendidos en una semana.
 * Toma 3: las dos curvas: el tráfico pagado sube y se corta al apagar los anuncios; el ganado crece despacio y se acumula.
 */

const ID = 'br15', P = 'br-entrada';

export const EntradaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('dos'), 'Dos caminos'], [m('lanzamiento'), 'El lanzamiento del libro'], [m('video'), 'Cifras del autor'], [m('regla'), 'Ninguna basta sola'],
  ];
  const llave = sm(t, m('trabajas'), m('trabajas') + 2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Trabajar o comprar la entrada">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Dos caminos a la misma audiencia */}
      <Toma t={t} a={0} b={m('lanzamiento')} cy={470}>
        <g opacity={e1(t, 0.3)}>
          <rect x={460} y={200} width={280} height={420} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Gente x={500} y={430} n={4} activos={4} color={VIOLETA} paso={66} s={0.65} />
          <Gente x={533} y={560} n={3} activos={3} color={VIOLETA} paso={66} s={0.65} />
          <Txt x={600} y={260} textAnchor="middle" fontSize={28} fill={c.texto} peso={800}>Su audiencia</Txt>
        </g>
        {t >= m('trabajas') - 0.1 && (
          <g opacity={e1(t, m('trabajas'))}>
            <Persona id={ID} x={170} y={640} s={0.7} cuerpo={TEAL} />
            <g transform={`translate(${lerp(260, 420, llave)} 470) rotate(-20)`}>
              <circle r={30} fill="none" stroke={AMBAR} strokeWidth={12} />
              <rect x={28} y={-6} width={70 * llave} height={12} rx={6} fill={AMBAR} />
            </g>
            <Letrero x={200} y={740} texto="Trabajar: valor y relación" fondo={TEAL} id={ID} tam={24} />
          </g>
        )}
        {t >= m('compras') - 0.1 && (
          <g opacity={e1(t, m('compras'))}>
            <Persona id={ID} x={1030} y={640} s={0.7} cuerpo={AMBAR} corbata />
            {[0, 1, 2].map((k) => { const ph = ((t - m('compras')) * 0.7 + k / 3) % 1; return <Billete key={k} x={lerp(980, 760, ph)} y={460 - 40 * Math.sin(Math.PI * ph)} s={0.6} rot={-10} op={Math.sin(Math.PI * ph)} />; })}
            <Letrero x={1000} y={740} texto="Comprar: anuncios" fondo={AMBAR} id={ID} tam={24} />
          </g>
        )}
      </Toma>

      {/* 2 · El lanzamiento */}
      <Toma t={t} a={m('lanzamiento')} b={m('regla')} cy={470}>
        <g opacity={e1(t, m('lanzamiento'))}>
          <Libro x={190} y={560} color={ROSA} titulo="Secretos" autor="" s={0.85} c={c} />
          <Letrero x={190} y={640} texto={movil ? 'El libro' : 'Secretos de expertos'} fondo={ROSA} id={ID} tam={24} />
        </g>
        {t >= m('robbins') && (
          <g opacity={e1(t, m('robbins'))}>
            <rect x={380} y={210} width={420} height={300} rx={22} fill="#0b1220" />
            <Persona id={ID} x={510} y={470} s={0.52} cuerpo={AZUL_M} corbata />
            <Persona id={ID} x={670} y={470} s={0.52} cuerpo={NARANJA} />
            <circle cx={420} cy={240} r={8} fill={ROJO_M} opacity={0.6 + 0.4 * Math.sin(t * 6)} />
            <Letrero x={590} y={560} texto={movil ? 'Robbins' : 'En el perfil de Robbins'} fondo={AZUL_M} id={ID} tam={24} />
          </g>
        )}
        {t >= m('pago') && <Megafono x={860} y={360} s={0.75} habla={1} t={t} />}
        {t >= m('veinte') && <Letrero x={590} y={640} texto={movil ? '$20 por libro' : '$20 por cada libro'} fondo={VERDE} id={ID} tam={26} op={e1(t, m('veinte'))} />}
        {t >= m('video') && (
          <g opacity={e1(t, m('video'))}>
            <Cifra x={1000} y={250} valor={2500000} u={sm(t, m('video'), m('video') + 1.2)} tam={46} color={AZUL_M} pre="+" miles />
            <Txt x={1000} y={290} textAnchor="middle" fontSize={24} fill={c.tenue}>vistas</Txt>
          </g>
        )}
        {t >= m('vendio') && (
          <g opacity={e1(t, m('vendio'))}>
            <Cifra x={1000} y={540} valor={71248} u={sm(t, m('vendio'), m('vendio') + 1.2)} tam={54} color={VERDE} miles />
            <Txt x={1000} y={580} textAnchor="middle" fontSize={24} fill={c.tenue}>{movil ? 'en 7 días' : 'libros en una semana'}</Txt>
            <Sello x={940} y={720} texto="Según el autor" u={sm(t, m('vendio') + 0.6, m('vendio') + 1.2)} color={GRIS} tam={26} />
          </g>
        )}
      </Toma>

      {/* 3 · Las dos curvas */}
      <Toma t={t} a={m('regla')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('regla'))}>
          <rect x={140} y={200} width={920} height={500} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <rect x={200} y={640} width={800} height={6} rx={3} fill={c.apagado} />
          <Curva pts={[[200, 630], [320, 380], [520, 360], [600, 370], [620, 620], [1000, 625]]} u={sm(t, m('regla') + 0.3, m('apagas') + 0.8)} color={AMBAR} grosor={10} />
          <Curva pts={[[200, 630], [400, 600], [600, 540], [800, 440], [1000, 300]]} u={sm(t, m('apagas') + 0.6, m('acumula') + 1.2)} color={VERDE} grosor={10} />
          {t >= m('apagas') && <Letrero x={620} y={300} texto="Apagas los anuncios" fondo={AMBAR} id={ID} tam={26} op={e1(t, m('apagas'))} />}
          {t >= m('acumula') && <Letrero x={890} y={250} texto="El ganado se acumula" fondo={VERDE} id={ID} tam={26} op={e1(t, m('acumula'))} />}
          <Txt x={600} y={690} textAnchor="middle" fontSize={24} fill={c.tenue}>Tráfico en el tiempo</Txt>
        </g>
      </Toma>
    </Lienzo>
  );
};
