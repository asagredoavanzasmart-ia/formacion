import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Avion, Moneda3D, Taza, Hoja, Sello, Calendario, Basurero, Suelo, Cifra, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Salir de un compromiso.
 * Toma 1: el Concorde cruza el cielo soltando monedas que caen a un pozo: el costo hundido; el informe de los ministros
 * con el sello «no rentable».
 * Toma 2 (plano cercano): la taza con dos etiquetas de precio: el dueño pide 5,25 y el comprador ofrece 2,25–2,75.
 * Toma 3: las tácticas: la puerta de «¿entraríamos hoy?», el contador que vuelve a cero, el ranking de proyectos que se
 * financia de arriba abajo hasta que se acaba el dinero, y el piloto de reversa: el informe que se apaga y nadie lo extraña.
 */

const ID = 'es14', P = 'es-compromisos';

export const CompromisosES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('concorde'), 'El Concorde'], [m('perdio'), 'Décadas de pérdidas'], [m('hundido'), 'La trampa del costo hundido'], [m('dotacion'), 'El efecto de dotación'],
    [m('nuestro'), 'Lo nuestro vale más'], [m('entrar'), '¿Entraríamos hoy?'], [m('basecero'), 'Presupuesto base cero'], [m('ranking'), 'Presupuesto en ranking'],
    [m('opinion'), 'Una segunda opinión'], [m('reversa'), 'Piloto de reversa'], [m('menos'), 'Nadie lo echó de menos'],
  ];
  const vuelo = ((t - m('concorde')) * 0.08) % 1;
  const dinero = sm(t, m('ranking') + 0.6, m('ranking') + 3.4);
  const PROY = ['A', 'B', 'C', 'D', 'E'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Salir de un compromiso">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el Concorde y el pozo */}
      <Toma t={t} a={0} b={m('dotacion')} cy={470}>
        <Avion x={lerp(-200, 1400, vuelo)} y={250} s={0.8} concorde cola={AZUL_M} op={e1(t, m('concorde'))} />
        {t >= m('perdio') && Array.from({ length: 5 }, (_, k) => {
          const u = ((t - m('perdio')) * 0.6 + k / 5) % 1;
          const x0 = lerp(-200, 1400, vuelo) - 40;
          return <Moneda3D key={k} x={lerp(x0, 600, u)} y={lerp(270, 640, u)} r={20} op={Math.min(1, (1 - u) * 4)} />;
        })}
        {t >= m('perdio') && (
          <g opacity={e1(t, m('perdio'))}>
            <ellipse cx={600} cy={660} rx={240} ry={56} fill="#1f2937" />
            <ellipse cx={600} cy={650} rx={220} ry={44} fill="#0b1220" />
            <Txt x={600} y={770} textAnchor="middle" fontSize={32} fill={c.texto}>{t >= m('hundido') ? 'Costo hundido' : 'Pérdidas'}</Txt>
          </g>
        )}
        {t >= m('ministros') && t < m('hundido') + 0.5 && (
          <g opacity={ventana(t, m('ministros'), m('hundido') + 0.5)}>
            <Hoja x={980} y={480} w={180} h={230} lineas={7} />
            <Sello x={980} y={480} texto="NO RENTABLE" u={sm(t, m('ministros') + 0.6, m('ministros') + 1.2)} tam={26} />
          </g>
        )}
        {t >= m('hundido') && <Letrero x={600} y={420} texto="Seguir porque ya se invirtió" fondo={ROJO_M} id={ID} tam={30} op={e1(t, m('hundido'))} />}
      </Toma>

      {/* 2 · la taza (plano cercano) */}
      <Toma t={t} a={m('dotacion')} b={m('entrar')} cy={470} zi={1.2}>
        <Taza x={600} y={640} s={2.4} t={t} op={e1(t, m('taza'))} />
        {t >= m('vendian') && (
          <g opacity={e1(t, m('vendian'))} transform={`rotate(-8 280 420)`}>
            <rect x={120} y={340} width={320} height={160} rx={20} fill={NARANJA} />
            <Txt x={280} y={400} textAnchor="middle" fontSize={28} fill="#fff">El dueño pide</Txt>
            <Cifra x={280} y={470} valor={5.25} dec={2} u={sm(t, m('vendian'), m('vendian') + 0.8)} pre="US$ " tam={52} color="#fff" />
          </g>
        )}
        {t >= m('ofrecian') && (
          <g opacity={e1(t, m('ofrecian'))} transform={`rotate(8 920 420)`}>
            <rect x={740} y={340} width={360} height={160} rx={20} fill={AZUL_M} />
            <Txt x={920} y={400} textAnchor="middle" fontSize={28} fill="#fff">El comprador ofrece</Txt>
            <Txt x={920} y={470} textAnchor="middle" fontSize={46} fill="#fff">US$ 2,25–2,75</Txt>
          </g>
        )}
        {t >= m('nuestro') && <Letrero x={600} y={790} texto="Lo que es nuestro parece valer más" id={ID} tam={30} op={e1(t, m('nuestro'))} />}
        {!movil && <Txt f="a" x={600} y={190} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('taza'))}>Estudio de Daniel Kahneman y sus colegas</Txt>}
      </Toma>

      {/* 3 · las tácticas */}
      <Toma t={t} a={m('entrar')} b={fin + 1} cy={480}>
        {ventana(t, m('entrar') - 0.1, m('reversa')) > 0.01 && (
          <g opacity={ventana(t, m('entrar') - 0.1, m('reversa'))}>
            <g opacity={e1(t, m('entrar'))}>
              <rect x={90} y={200} width={300} height={190} rx={20} fill={c.panel} />
              <Txt x={240} y={280} textAnchor="middle" fontSize={30} fill={c.texto}>¿Entraríamos</Txt>
              <Txt x={240} y={326} textAnchor="middle" fontSize={30} fill={c.texto}>hoy?</Txt>
            </g>
            <g opacity={e1(t, m('basecero'))}>
              <rect x={90} y={430} width={300} height={190} rx={20} fill={c.panel} />
              <Txt x={240} y={500} textAnchor="middle" fontSize={26} fill={c.texto}>Base cero</Txt>
              {t >= m('basecero') + 1 ? <Txt x={240} y={590} textAnchor="middle" fontSize={70} fill={NARANJA}>0</Txt> : <Txt x={240} y={570} textAnchor="middle" fontSize={28} fill={c.tenue}>el año anterior</Txt>}
            </g>
            <g opacity={e1(t, m('ranking'))}>
              <rect x={470} y={190} width={640} height={460} rx={24} fill={c.panel} />
              {PROY.map((p, k) => {
                const lleno = Math.min(1, Math.max(0, dinero * 3.2 - k));
                const corta = k >= 3;
                return (
                  <g key={p}>
                    <Txt x={510} y={260 + k * 82} fontSize={30} fill={c.texto}>{p}</Txt>
                    <rect x={560} y={230 + k * 82} width={500 - k * 50} height={44} rx={12} fill={c.apagado} />
                    <rect x={560} y={230 + k * 82} width={(500 - k * 50) * (corta ? 0 : lleno)} height={44} rx={12} fill={VERDE} />
                    {corta && t >= m('tres') && <Txt x={1090} y={262 + k * 82} textAnchor="end" fontSize={24} fill={ROJO_M}>sin fondos</Txt>}
                  </g>
                );
              })}
              {Array.from({ length: 4 }, (_, k) => { const u = ((t - m('ranking')) * 0.8 + k / 4) % 1; return dinero < 1 && <Moneda3D key={k} x={600 + k * 30} y={lerp(180, 230 + Math.min(2, Math.floor(dinero * 3.2)) * 82, u)} r={14} op={1 - u} />; })}
              {t >= m('tres') && <Txt f="a" x={790} y={630} textAnchor="middle" fontSize={26} fill={c.texto}>Se financia de arriba abajo</Txt>}
            </g>
            {t >= m('opinion') && <g opacity={e1(t, m('opinion'))}><Letrero x={790} y={730} texto="Segunda opinión, sin apego" fondo={VIOLETA} id={ID} tam={26} /></g>}
          </g>
        )}
        {t >= m('reversa') && (
          <g opacity={e1(t, m('reversa'))}>
            <Suelo y={740} isDark={isDark} x0={80} x1={1120} />
            <g transform="translate(300 560)">
              <rect x={-150} y={-120} width={300} height={240} rx={20} fill="#475569" />
              <Hoja x={0} y={-10} w={140} h={170} lineas={6} op={1 - sm(t, m('reversa') + 0.5, m('reversa') + 1)} />
              <circle cx={120} cy={-90} r={14} fill={t >= m('reversa') + 0.6 ? ROJO_M : VERDE} />
            </g>
            <Txt x={300} y={800} textAnchor="middle" fontSize={26} fill={c.texto}>Informe semanal: apagado</Txt>
            <Calendario x={760} y={300} s={1} marcados={Math.min(14, Math.floor((t - m('reversa')) * 2))} />
            {[0, 1].map((k) => <Persona key={k} id={ID} x={lerp(600 + k * 200, 1100 + k * 200, ((t - m('reversa')) * 0.15 + k * 0.4) % 1)} y={740} s={0.9} cuerpo={[AZUL_M, ROSA][k]} />)}
            {t >= m('menos') && <g opacity={e1(t, m('menos'))}><Letrero x={760} y={520} texto="Nadie lo echó de menos: se elimina" fondo={VERDE} id={ID} tam={28} /></g>}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};

