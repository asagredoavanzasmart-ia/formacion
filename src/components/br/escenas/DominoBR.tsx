import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Domino, Barra, Sello, Hoja, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El gran dominó.
 * Toma 1: Belcher revisa diez años de ofertas: con una sola creencia la conversión es alta; con dos, cae a la mitad.
 * Toma 2: una fila de fichas pequeñas (las objeciones) y una ficha grande al frente: al caer la grande, arrastra a todas.
 * La frase lógica se arma por partes (oportunidad → deseo → vehículo).
 * Toma 3: ClickFunnels como ejemplo, con la nota de que conviene al autor; y el criterio: si la frase no es verdadera,
 * la ficha no cae y lo que hay es una mejora.
 */

const ID = 'br08', P = 'br-domino';

export const DominoBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('diez'), 'Diez años de ofertas'], [m('domino'), 'El gran dominó'], [m('logica'), 'La frase'], [m('clickfunnels'), 'El ejemplo de ClickFunnels'], [m('criterio'), 'El criterio'],
  ];
  const caeG = sm(t, m('peso'), m('peso') + 0.7);
  const PIEZAS: [string, string][] = [['clave', 'Clave del deseo'], ['vehiculo', 'Solo por mi vehículo']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El gran dominó">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Una creencia o dos */}
      <Toma t={t} a={0} b={m('domino')} cy={470}>
        <g opacity={e1(t, 0.3)}>
          {Array.from({ length: 10 }, (_, k) => <Hoja key={k} x={170 + (k % 5) * 18} y={420 - Math.floor(k / 5) * 14 - (k % 5) * 6} s={0.9} />)}
          <Letrero x={210} y={560} texto="10 años de ofertas" fondo={GRIS} id={ID} tam={26} />
        </g>
        {t >= m('mitad') - 0.4 && (
          <g opacity={e1(t, m('mitad') - 0.4)}>
            <rect x={420} y={680} width={640} height={6} rx={3} fill={c.apagado} />
            <Barra x={600} y={680} w={150} hMax={380} valor={100} max={100} u={1} color={VERDE} rotulo="Una creencia" c={c} suf="" />
            <Barra x={880} y={680} w={150} hMax={380} valor={50} max={100} u={sm(t, m('mitad'), m('mitad') + 1)} color={ROJO_M} rotulo="Dos o más" c={c} suf="" />
            <Letrero x={880} y={200} texto="Conversión a la mitad" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('mitad') + 0.5)} />
          </g>
        )}
      </Toma>

      {/* 2 · La ficha que arrastra */}
      <Toma t={t} a={m('domino')} b={m('clickfunnels')} cy={470}>
        <g opacity={e1(t, m('domino'))}>
          <rect x={120} y={700} width={960} height={12} rx={6} fill={c.apagado} />
          <Domino x={250} y={700} h={300} cae={caeG} color={NARANJA} puntos={4} texto={movil ? '' : 'Una'} tam={30} />
          {Array.from({ length: 6 }, (_, k) => {
            const cae = sm(t, m('peso') + 0.35 + k * 0.12, m('peso') + 0.75 + k * 0.12);
            return <Domino key={k} x={470 + k * 100} y={700} h={150} cae={cae} color={GRIS} puntos={2} />;
          })}
          {t >= m('unica') && <Letrero x={250} y={320} texto="La única creencia" fondo={NARANJA} id={ID} tam={28} op={e1(t, m('unica')) * (1 - caeG)} />}
          {t < m('peso') && <Txt x={720} y={500} textAnchor="middle" fontSize={28} fill={c.tenue} opacity={e1(t, m('unica'))}>Objeciones</Txt>}
        </g>
        {t >= m('logica') && (
          <g opacity={ventana(t, m('logica'), m('clickfunnels'))}>
            <rect x={420} y={180} width={680} height={150} rx={24} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            <Txt x={460} y={240} fontSize={28} fill={c.texto} peso={800}>Si creen que…</Txt>
            {PIEZAS.map(([n, txt], k) => t >= m(n) - 0.1 ? (
              <g key={n} opacity={e1(t, m(n))}>
                <rect x={460 + k * 320} y={262} width={300} height={50} rx={14} fill={[ROSA, VIOLETA][k]} />
                <Txt x={610 + k * 320} y={296} textAnchor="middle" fontSize={24} fill="#fff" peso={800}>{txt}</Txt>
              </g>
            ) : null)}
          </g>
        )}
        {t >= m('peso') && <Letrero x={720} y={430} texto="Lo demás pierde peso" fondo={VERDE} id={ID} tam={30} op={e1(t, m('peso') + 0.8)} />}
      </Toma>

      {/* 3 · El ejemplo y el criterio */}
      <Toma t={t} a={m('clickfunnels')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('clickfunnels'))}>
          <rect x={120} y={190} width={960} height={190} rx={28} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Txt x={600} y={270} textAnchor="middle" fontSize={32} fill={c.texto} peso={800}>«Los embudos son la clave del éxito en línea</Txt>
          <Txt x={600} y={325} textAnchor="middle" fontSize={32} fill={c.texto} peso={800}>y solo se obtienen con ClickFunnels»</Txt>
          {t >= m('conviene') && <Sello x={movil ? 720 : 870} y={420} texto={movil ? 'Le conviene' : 'Conviene al autor'} u={sm(t, m('conviene'), m('conviene') + 0.6)} color={ROJO_M} tam={28} rot={-6} />}
        </g>
        {t >= m('criterio') && (
          <g opacity={e1(t, m('criterio'))}>
            <rect x={120} y={720} width={960} height={10} rx={5} fill={c.apagado} />
            <Domino x={360} y={720} h={210} cae={sm(t, m('criterio') + 0.6, m('criterio') + 1.3)} color={VERDE} puntos={3} />
            <Letrero x={360} y={800} texto={movil ? 'Cae' : 'Frase verdadera: cae'} fondo={VERDE} id={ID} tam={26} />
            <Domino x={840} y={720} h={210} cae={0.06 * Math.sin(t * 5) * sm(t, m('mejora'), m('mejora') + 0.5)} color={GRIS} puntos={3} />
            {t >= m('mejora') && <Letrero x={840} y={800} texto={movil ? 'No cae' : 'No cae: es una mejora'} fondo={GRIS} id={ID} tam={26} op={e1(t, m('mejora'))} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
