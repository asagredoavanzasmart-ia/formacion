import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, PersonaCara, Reloj, Burbuja, Balanza, Pizarra, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El comité y la indecisión.
 * Toma 1: el comprador que imagina Brunson, solo frente al escenario de un seminario de 90 minutos, levanta la mano;
 * en una empresa, en cambio, una mesa se llena hasta con diez personas (Gartner: entre seis y diez).
 * Toma 2: The Jolt Effect (2022): 2,5 millones de conversaciones; una barra muestra que entre 40 y 60 % de las
 * oportunidades se pierden porque nadie decide. La mesa se queda sentada con caras de duda y, cuando aparece el reloj
 * de la escasez, las caras empeoran.
 * Toma 3: lo que cierra: una balanza entre el riesgo percibido y decidir; tres apoyos (alcance acotado, casos
 * parecidos, garantías) inclinan la balanza. Luego, la enseñanza comercial de The Challenger Sale en una pizarra.
 */

const ID = 'br26', P = 'br-comite';

const Mesa: React.FC<{ n: number; e: number; c: ReturnType<typeof tono>; t: number }> = ({ n, e, t }) => {
  // Sillas repartidas a igual distancia en x sobre el borde trasero de la mesa: nadie queda encimado.
  const sillas = Array.from({ length: 10 }, (_, k) => { const x = 300 + k * (600 / 9); return [x, 580 - 130 * Math.sqrt(Math.max(0, 1 - ((x - 600) / 330) ** 2))] as const; });
  const orden = sillas.map((p, k) => [p, k] as const).sort((a, b) => a[0][1] - b[0][1]);
  return (
    <g>
      {orden.map(([[x, y], k]) => k < n ? <g key={k}><PersonaCara id={ID} x={x} y={y + 10} s={0.5} cuerpo={[AZUL_M, ROSA, VERDE, TEAL, VIOLETA, AMBAR, GRIS, NARANJA, AZUL_M, ROSA][k]} corbata={k % 2 === 0} e={e + 0.1 * Math.sin(t * 2 + k)} /></g> : null)}
      <ellipse cx={600} cy={640} rx={300} ry={90} fill="#92400e" />
      <ellipse cx={600} cy={628} rx={300} ry={90} fill="#b45309" />
    </g>
  );
};

export const ComiteBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('individual'), 'Un comprador individual'], [m('gartner'), 'Un comité'], [m('dixon'), 'The Jolt Effect (2022)'],
    [m('escasez'), 'La escasez empeora'], [m('reducir'), 'Reducir el riesgo'], [m('challenger'), 'Enseñanza comercial'],
  ];
  const sillas = Math.round(lerp(1, 10, sm(t, m('seis'), m('seis') + 2)));
  const barra = sm(t, m('indecision'), m('indecision') + 1.4);
  const escasez = sm(t, m('escasez'), m('escasez') + 1);
  const apoyos = sm(t, m('acotar'), m('acotar') + 3);
  const inc = lerp(-14, 12, apoyos);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El comité y la indecisión">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · De uno a un comité */}
      <Toma t={t} a={0} b={m('dixon')} cy={470}>
        <g opacity={E('individual', 0.6, -0.4) * (1 - E('gartner'))}>
          <rect x={300} y={200} width={600} height={260} rx={20} fill={VIOLETA} />
          <Persona id={ID} x={600} y={430} s={0.7} cuerpo={NARANJA} corbata />
          <Txt x={600} y={250} textAnchor="middle" fontSize={30} fill="#fff" peso={800}>Seminario · 90 min</Txt>
          {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={350 + k * 70} cy={600} r={18} fill={GRIS} opacity={0.5} />)}
          <Persona id={ID} x={600} y={720} s={0.75} cuerpo={AZUL_M} />
          <rect x={628} y={560 - 10 * Math.abs(Math.sin(t * 3))} width={14} height={70} rx={7} fill={AZUL_M} />
          <Pastilla x={760} y={540} texto="«¡Compro!»" fondo={VERDE} tam={24} />
        </g>
        <g opacity={E('gartner')}>
          <Mesa n={sillas} e={0} c={c} t={t} />
          <Pastilla x={600} y={790} texto={movil ? '6 a 10 personas' : 'Entre 6 y 10 personas deciden'} fondo={AZUL_M} tam={26} op={E('seis')} />
          <Pastilla x={600} y={240} texto="Según Gartner" fondo={c.panel} color={AZUL_M} tam={22} />
        </g>
      </Toma>

      {/* 2 · No hacer nada */}
      <Toma t={t} a={m('dixon')} b={m('reducir')} cy={470}>
        <g opacity={0.9}><Mesa n={10} e={lerp(0, -0.6, sm(t, m('nada'), m('nada') + 1)) - 0.4 * escasez} c={c} t={t} /></g>
        <Tarjeta x={80} y={180} w={1040} h={190} c={c} id={ID} op={E('dixon')} acento={VIOLETA}>
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={0.4 + 0.5 * Math.abs(Math.sin(t * 1.5 + k))}><rect x={30 + (k % 3) * 52} y={40 + Math.floor(k / 3) * 46} width={44} height={32} rx={12} fill={[AZUL_M, ROSA, VIOLETA][k % 3]} /></g>)}
          <Cifra x={300} y={90} valor={2.5} u={sm(t, m('millones'), m('millones') + 1)} dec={1} suf=" mill." tam={40} color={AZUL_M} />
          <Txt x={300} y={128} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>conversaciones</Txt>
          <rect x={440} y={60} width={560} height={64} rx={16} fill={c.apagado} />
          <rect x={440} y={60} width={560 * 0.4 * barra} height={64} rx={16} fill={AMBAR} />
          <rect x={440 + 560 * 0.4} y={60} width={560 * 0.2 * barra} height={64} fill={AMBAR} opacity={0.5} />
          <Txt x={440 + 112} y={102} textAnchor="middle" fontSize={26} fill="#fff" peso={800} opacity={barra}>40–60 %</Txt>
          <Txt x={720} y={160} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800} opacity={barra}>{movil ? 'se pierden sin decidir' : 'de las oportunidades se pierden por indecisión'}</Txt>
        </Tarjeta>
        <Pastilla x={600} y={790} texto={movil ? 'Prefieren no hacer nada' : 'Prefieren no hacer nada: miedo a equivocarse'} fondo={GRIS} tam={24} op={E('nada')} />
        {t >= m('escasez') && <g opacity={escasez}><Reloj x={1060} y={500} r={50} t={t} vel={7} aro={ROJO_M} /><Pastilla x={1060} y={590} texto="Empeora" fondo={ROJO_M} tam={22} /></g>}
      </Toma>

      {/* 3 · Reducir el riesgo y enseñar */}
      <Toma t={t} a={m('reducir')} b={fin + 1} cy={470}>
        <g opacity={1 - 0.75 * E('challenger')}>
          <Balanza x={380} y={780} inc={inc} c={c} brazo={190} alto={300}
            izq={<g transform={`scale(${1 - 0.3 * apoyos})`}>
              <rect x={-18} y={-92} width={36} height={24} rx={10} fill="none" stroke={ROJO_M} strokeWidth={9} />
              <path d="M -66 0 L -48 -74 H 48 L 66 0 Z" fill={ROJO_M} />
              <path d="M 0 -74 H 48 L 66 0 H 0 Z" fill="#000" opacity={0.12} />
              {!movil && <Txt x={0} y={-28} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>Riesgo</Txt>}
            </g>}
            der={<g>{[0, 1, 2].map((k) => <rect key={k} x={-60 + k * 42} y={-40 - (1 - sm(apoyos, k / 3, k / 3 + 0.3)) * 160} width={36} height={40} rx={6} fill={[VERDE, TEAL, AZUL_M][k]} opacity={sm(apoyos, k / 3 - 0.05, k / 3 + 0.1)} />)}</g>} />
          <Pastilla x={380} y={250} texto={movil ? 'Riesgo percibido' : 'Reducir el riesgo percibido'} fondo={ROJO_M} tam={26} op={E('reducir')} />
          {(['Alcance acotado', 'Casos parecidos', 'Garantías reales'] as const).map((txt, k) => <Pastilla key={txt} x={880} y={(movil ? 262 : 290) + k * (movil ? 70 : 60)} texto={txt} fondo={[VERDE, TEAL, AZUL_M][k]} tam={26} op={sm(apoyos, k / 3 - 0.05, k / 3 + 0.1)} />)}
        </g>
        {t >= m('challenger') && (
          <g opacity={E('challenger')}>
            <Pizarra x={640} y={450} w={460} h={280} u={sm(t, m('challenger'), m('ensenanza') + 1)} isDark={isDark} titulo={movil ? 'Datos nuevos' : 'Reencuadrar con datos'} />
            <Pastilla x={870} y={800} texto="The Challenger Sale" fondo={VIOLETA} tam={24} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
