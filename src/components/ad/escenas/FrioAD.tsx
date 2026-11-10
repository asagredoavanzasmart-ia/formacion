import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Sobre, Telefono, Hoja, Pin, Embudo, Reloj, Billete, Gente, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Alcance en frío.
 * Toma 1: un desconocido con un muro de desconfianza; tres herramientas lo derriban: la lista (hojas con nombres), la
 * personalización (un pin sobre su ciudad y su empresa) y el volumen (sobres que salen en ráfaga, seguidos de una llamada).
 * Toma 2: el embudo del correo en frío: 30 % abre → 10 % de esos responde → 3 % prospectos → 1 % clientes.
 * Toma 3: la cuenta de la llamada: un reloj de 15/h, contactos a 10 centavos y 50 por cita → 120 por cita, 360 por
 * cliente frente a 3.600 de ganancia: 10 a 1.
 */

const ID = 'ad22', P = 'ad-frio';

export const FrioAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('desconocidos'), 'Uno a uno con desconocidos'], [m('lista'), 'La lista'], [m('personalizar'), 'Los primeros segundos'], [m('volumen'), 'El volumen'],
    [m('predecir'), 'Ingresos predecibles'], [m('llamadas'), 'La cuenta de las llamadas'], [m('retorno'), '10 a 1'],
  ];
  const muro = 1 - 0.33 * (sm(t, m('lista'), m('lista') + 1) + sm(t, m('personalizar'), m('personalizar') + 1) + sm(t, m('volumen'), m('volumen') + 1));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Alcance en frío">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El muro de la desconfianza */}
      <Toma t={t} a={0} b={m('predecir')} cy={470}>
        <g opacity={e1(t, m('desconocidos'))}>
          <Persona id={ID} x={1000} y={700} s={0.85} cuerpo={GRIS} />
          {Array.from({ length: 12 }, (_, k) => {
            const f = Math.floor(k / 3), col = k % 3;
            const vis = k < 12 * muro;
            return <rect key={k} x={760 + col * 52 + (f % 2) * 26} y={700 - (f + 1) * 70} width={48} height={64} rx={6} fill="#a8a29e" opacity={vis ? 1 : 0} />;
          })}
          {t >= m('problemas') && <Letrero x={830} y={190} texto="No te conoce ni confía" fondo={GRIS} id={ID} tam={26} op={ventana(t, m('problemas'), m('lista'))} />}
        </g>
        {([['lista', 'Lista', 180, AZUL_M], ['personalizar', 'Personalizar', 370, VIOLETA], ['volumen', 'Volumen', 560, NARANJA]] as const).map(([n, txt, y, col], k) => (
          <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0}>
            <g transform={`translate(240 ${y + 90})`}>
              {k === 0 && [0, 1, 2].map((j) => <Hoja key={j} x={-30 + j * 30} y={0} w={80} h={100} lineas={4} color={col} rot={-8 + j * 8} />)}
              {k === 1 && <g><circle r={60} fill={col} opacity={0.2} /><Pin x={0} y={20} s={1.2} color={col} />{t >= m('valor') && <Reloj x={110} y={0} r={36} t={t} vel={3} aro={col} />}</g>}
              {k === 2 && Array.from({ length: 4 }, (_, j) => { const ph = ((t - m(n)) * 0.8 + j / 4) % 1; return <Sobre key={j} x={lerp(-40, 400, ph)} y={-20 * Math.sin(Math.PI * ph)} s={0.6} color={col} op={Math.sin(Math.PI * ph)} />; })}
            </g>
            <Letrero x={480} y={y + 90} texto={txt} fondo={col} id={ID} tam={26} ancla="start" />
          </g>
        ))}
        {t >= m('correo') && (
          <g opacity={ventana(t, m('correo'), m('predecir'))}>
            <Telefono x={1000} y={330} s={0.6} />
            <Letrero x={1000} y={170} texto="«Te llamo por el correo»" fondo={TEAL} id={ID} tam={24} />
          </g>
        )}
      </Toma>

      {/* 2 · El correo en frío */}
      <Toma t={t} a={m('predecir')} b={m('llamadas')} cy={470}>
        <g opacity={e1(t, m('predecir'))}>
          <Embudo x={500} y={210} w={640} alto={110} tam={30} franjas={[
            { n: '100 correos', color: GRIS }, { n: '30 % abre', color: AZUL_M }, { n: '3 % prospectos', color: VIOLETA }, { n: '1 % clientes', color: VERDE },
          ].slice(0, 1 + (t >= m('apertura') ? 1 : 0) + (t >= m('tres') ? 1 : 0) + (t >= m('uno') ? 1 : 0))} />
          {t >= m('apertura') && !movil && <Txt f="a" x={940} y={390} fontSize={24} fill={c.tenue} opacity={e1(t, m('apertura') + 0.5)}>10 % de los abiertos responde</Txt>}
          {[0, 1, 2].map((k) => { const ph = ((t * 0.6) + k / 3) % 1; return <Sobre key={k} x={500 + 200 * Math.sin(k * 2)} y={160 + 500 * ph * (t >= m('uno') ? 1 : 0.5)} s={0.5} op={1 - ph} />; })}
        </g>
      </Toma>

      {/* 3 · La cuenta de la llamada */}
      <Toma t={t} a={m('llamadas')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('llamadas'))}>
          <Persona id={ID} x={180} y={600} s={0.75} cuerpo={AZUL_M} />
          <Telefono x={290} y={470} s={0.5} />
          {[['15/h', 200], ['0,10 c/u', 270], ['50 por cita', 340]].map(([s, y], k) => <Letrero key={k} x={560} y={y as number} texto={s as string} fondo={[GRIS, AMBAR, VIOLETA][k]} id={ID} tam={26} />)}
          <Gente x={480} y={560} n={2} activos={2} color={VERDE} paso={80} s={0.6} />
          {!movil && <Txt f="a" x={520} y={600} textAnchor="middle" fontSize={22} fill={c.tenue}>2 citas al día</Txt>}
        </g>
        {t >= m('cita') && (
          <g opacity={e1(t, m('cita'))}>
            <Cifra x={880} y={260} valor={120} u={sm(t, m('cita'), m('cita') + 0.8)} pre="$" suf=" por cita" tam={50} color={VIOLETA} />
          </g>
        )}
        {t >= m('cliente') && (
          <g opacity={e1(t, m('cliente'))}>
            <rect x={700} y={360} width={360} height={60} rx={30} fill={ROJO_M} />
            <Txt x={880} y={402} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>360 por cliente</Txt>
            <rect x={700} y={450} width={360} height={240} rx={30} fill={VERDE} />
            <Txt x={880} y={590} textAnchor="middle" fontSize={44} fill="#fff" peso={800}>3.600</Txt>
            {!movil && <Txt f="a" x={880} y={720} textAnchor="middle" fontSize={22} fill={c.tenue}>ganancia bruta</Txt>}
          </g>
        )}
        {t >= m('retorno') && <Letrero x={880} y={780} texto="Retorno 10 a 1" fondo={VERDE} id={ID} tam={34} op={e1(t, m('retorno'))} />}
      </Toma>
    </Lienzo>
  );
};
