import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Reloj, Hoja, Propuesta, Telefono, Calendario, Pin, Cruz, Visto, Curva, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Táctica: mapear y medir.
 * Toma 1: el camino del cliente se dibuja en papel; aparecen tres alfileres —demora (reloj), información perdida
 * (hoja que se vuela) y queja (burbuja roja)—; un paso inútil se tacha y el camino queda funcionando «a mano».
 * Toma 2: el cronómetro del presupuesto y la línea de base punteada.
 * Toma 3 (ejemplos ilustrativos): el presupuesto que sale solo por la cinta, pero tarda cinco días; la clínica
 * dental que primero confirma por teléfono y después automatiza el recordatorio: las ausencias bajan.
 */

const ID = 'cp11', P = 'cp-mapa';

const CAMINO: [number, number][] = [[140, 600], [330, 470], [520, 560], [710, 400], [900, 500], [1070, 380]];

export const MapaCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('mapear'), 'Mapear el proceso'], [m('camino'), 'El camino del cliente'], [m('elimina'), 'Eliminar lo que no aporta'], [m('mano'), 'Que funcione a mano'],
    [m('mide'), 'Medir antes y después'], [m('base'), 'La línea de base'], [m('electricas'), 'Ejemplo ilustrativo'], [m('clinica'), 'Una clínica dental'], [m('apoyo'), 'La tecnología apoya'],
  ];
  const traza = sm(t, m('camino'), m('camino') + 2.4);
  const PINES: [string, number, string][] = [['demora', 1, AMBAR], ['pierde', 2, AZUL_M], ['queja', 3, ROJO_M]];
  const tachado = sm(t, m('elimina'), m('elimina') + 0.8);
  const crono = sm(t, m('tarda'), m('tarda') + 3);
  const ausencias = sm(t, m('recordatorio') + 0.5, m('recordatorio') + 2.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Mapear y medir">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el mapa en papel */}
      <Toma t={t} a={0} b={m('mide')} cy={500}>
        <rect x={80} y={230} width={1040} height={500} rx={20} fill={isDark ? '#3b3529' : '#fdf6e3'} style={sombra(c.sombra, 6, 14)} opacity={e1(t, m('dibuja'))} transform={`rotate(-1 600 480)`} />
        <Curva pts={CAMINO} u={traza} color={NARANJA} grosor={10} punteada={t < m('mano')} />
        {CAMINO.map(([x, y], k) => <g key={k} opacity={traza * 6 > k ? 1 : 0}><circle cx={x} cy={y} r={26} fill={k === 2 && tachado > 0 ? GRIS : `url(#${ID}-marca)`} /><Txt x={x} y={y + 9} textAnchor="middle" fontSize={24} fill="#fff">{k + 1}</Txt></g>)}
        {PINES.map(([n, k, col]) => t >= m(n) && (
          <g key={n} opacity={e1(t, m(n)) * (n === 'pierde' ? 1 - tachado : 1)}>
            <Pin x={CAMINO[k][0]} y={CAMINO[k][1] - 40} s={0.8} color={col} />
            {n === 'demora' && <Reloj x={CAMINO[k][0] + 10} y={CAMINO[k][1] - 160} r={36} t={t} vel={2} aro={AMBAR} />}
            {n === 'pierde' && <Hoja x={CAMINO[k][0] + 20 + 30 * Math.sin(t * 2)} y={CAMINO[k][1] - 200 - 10 * Math.sin(t * 3)} w={60} h={78} rot={20 * Math.sin(t * 2)} lineas={3} />}
            {n === 'queja' && <g transform={`translate(${CAMINO[k][0]} ${CAMINO[k][1] - 170})`}><rect x={-46} y={-34} width={92} height={60} rx={16} fill={ROJO_M} /><path d="M -10 26 L 0 44 L 10 26 Z" fill={ROJO_M} /><Txt x={0} y={8} textAnchor="middle" fontSize={34} fill="#fff">!!</Txt></g>}
          </g>
        ))}
        {t >= m('elimina') && <g opacity={e1(t, m('elimina'))}><Cruz x={CAMINO[2][0]} y={CAMINO[2][1]} r={34} /></g>}
        {t >= m('mano') && <Letrero x={600} y={790} texto="Funciona a mano: recién ahí, automatizar" fondo={VERDE} id={ID} tam={28} op={e1(t, m('mano'))} />}
        {t >= m('dibuja') && t < m('mano') && <Letrero x={600} y={790} texto="En papel, con tu equipo" fondo={GRIS} id={ID} tam={28} op={e1(t, m('dibuja'))} />}
      </Toma>

      {/* 2 · medir: la línea de base */}
      <Toma t={t} a={m('mide')} b={m('electricas')} cy={480}>
        <g transform="translate(330 460)" opacity={e1(t, m('mide'))}>
          <circle r={150} fill={c.panel} style={sombra(c.sombra, 6, 14)} />
          <circle r={130} fill="none" stroke={c.apagado} strokeWidth={14} />
          <path d={`M 0 -130 A 130 130 0 ${crono > 0.5 ? 1 : 0} 1 ${130 * Math.sin(crono * 2 * Math.PI - 0.0001)} ${-130 * Math.cos(crono * 2 * Math.PI - 0.0001)}`} stroke={NARANJA} strokeWidth={14} fill="none" />
          <rect x={-14} y={-190} width={28} height={30} rx={6} fill={GRIS} />
          <g transform={`rotate(${crono * 360})`}><rect x={-4} y={-110} width={8} height={110} rx={4} fill={c.texto} /></g>
          <circle r={12} fill={c.texto} />
        </g>
        {t >= m('tarda') && <g opacity={e1(t, m('tarda'))}><Hoja x={650} y={300} w={110} h={140} lineas={5} /><Txt f="a" x={650} y={412} textAnchor="middle" fontSize={26} fill={c.texto}>Presupuesto</Txt></g>}
        {t >= m('base') && (
          <g opacity={e1(t, m('base'))}>
            <path d="M 560 620 H 1120" stroke={AZUL_M} strokeWidth={6} strokeDasharray="16 12" />
            <Curva pts={[[600, 560], [700, 600], [800, 570], [900, 610], [1000, 580], [1100, 600]]} u={sm(t, m('base'), m('base') + 1.4)} color={GRIS} grosor={6} />
            <Letrero x={840} y={700} texto="Línea de base" fondo={AZUL_M} id={ID} tam={28} />
          </g>
        )}
        {t >= m('tarde') && <Letrero x={600} y={812} texto="Sin ella, no sabrás si mejoraste" id={ID} tam={28} op={e1(t, m('tarde'))} />}
      </Toma>

      {/* 3 · dos ejemplos ilustrativos */}
      <Toma t={t} a={m('electricas')} b={fin + 1} cy={480}>
        {ventana(t, m('electricas'), m('clinica')) > 0.01 && (
          <g opacity={ventana(t, m('electricas'), m('clinica'))}>
            <rect x={150} y={520} width={700} height={28} rx={14} fill={GRIS} />
            {[0, 1, 2].map((k) => { const u = ((t - m('electricas')) * 0.4 + k / 3) % 1; return <Propuesta key={k} x={180 + u * 640} y={480} s={0.7} />; })}
            <Calendario x={1000} y={420} s={0.9} marcados={Math.min(5, Math.floor((t - m('cinco')) * 2) + 1)} op={e1(t, m('cinco'))} />
            {t >= m('sale') && <Letrero x={500} y={700} texto="Sale solo, pero llega tarde" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('sale'))} />}
          </g>
        )}
        {t >= m('clinica') && (
          <g opacity={e1(t, m('clinica'))}>
            <g transform="translate(200 640)">
              <path d="M -70 0 H 90 L 110 -60 H -20 L -60 -140 H -90 L -50 -40 H -70 Z" fill={AZUL_M} /><rect x={-10} y={0} width={20} height={90} fill={GRIS} />
            </g>
            <Calendario x={460} y={330} s={0.8} marcados={t >= m('agenda') ? 8 : 0} op={e1(t, m('agenda'))} />
            {t >= m('confirmo') && <Cruz x={460} y={440} r={22} op={e1(t, m('confirmo')) * (1 - sm(t, m('llamada'), m('llamada') + 0.5))} />}
            {t >= m('llamada') && <g opacity={e1(t, m('llamada'))}><Telefono x={700} y={420} s={0.8} /><Visto x={760} y={300} r={24} /></g>}
            {t >= m('recordatorio') && (
              <g opacity={e1(t, m('recordatorio'))}>
                {[0, 1].map((k) => <rect key={k} x={840 + k * 180} y={680 - (k === 0 ? 260 : lerp(260, 90, ausencias))} width={80} height={k === 0 ? 260 : lerp(260, 90, ausencias)} rx={12} fill={k === 0 ? GRIS : VERDE} />)}
                <Txt f="a" x={880} y={720} textAnchor="middle" fontSize={24} fill={c.tenue}>Antes</Txt>
                <Txt f="a" x={1060} y={720} textAnchor="middle" fontSize={24} fill={c.tenue}>Después</Txt>
              </g>
            )}
            {t >= m('apoyo') && <Letrero x={500} y={812} texto="La tecnología apoya lo que ya funciona" fondo={VERDE} id={ID} tam={28} op={e1(t, m('apoyo'))} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
