import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Edificio, Busto, Visto, Cruz, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Pipeline CRM.
 * 1 · Un tablero de ocho columnas: la tarjeta de la oportunidad avanza de etapa en etapa al nombrarse.
 * 2 · Pearce: el universo de empresas por categoría (cubiertas y por cubrir); no existe un cliente único: la cadena ordenada
 *     se enreda, casi cualquiera puede vetar y cada contacto se registra según su rol.
 * 3 · Grupo Andino: tres contactos con su rol; la bitácora de interacciones, el valor, el semáforo, los motivos y el pronóstico.
 */

const ID = 'vc23', P = 'vc-crm';

export const CrmVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('etapas'), 'Ocho etapas'], [m('categoria'), 'Categoría de negocio'], [m('unico'), 'No existe un cliente único'], [m('reunen'), 'Todos, según su rol'],
    [m('andino'), 'Grupo Andino'], [m('interaccion'), 'Cada interacción registrada'], [m('ponderar'), 'Pronóstico ponderado'],
  ];
  const ET: [string, string][] = [['prospeccion', 'Prospección'], ['investigacion', 'Investigación'], ['calificacion', 'Calificación'], ['descubrimiento', 'Descubrimiento'], ['mapeo', 'Mapeo'], ['propuesta', 'Propuesta'], ['negociacion', 'Negociación'], ['cierre', 'Cierre']];
  let et = -1;
  ET.forEach(([a], k) => { if (t >= m(a)) et = k; });
  const ROLES: [string, string, string][] = [['reunen', 'Reúnen información', 'Reúnen'], ['recomiendan', 'Recomiendan', 'Recom.'], ['influyen', 'Influyen', 'Influyen'], ['participan', 'Participan', 'Participan'], ['ultima', 'Última palabra', 'Deciden']];
  const enreda = sm(t, m('cadena'), m('cadena') + 2);
  const CONT: [string, string, string, string][] = [['Dir. de operaciones', 'Usuario', AZUL_M, 'Operaciones'], ['Gerente de finanzas', 'Económica', VERDE, 'Finanzas'], ['Dir. de tecnología', 'Técnica', VIOLETA, 'Tecnología']];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Pipeline CRM">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el tablero */}
      <Toma t={t} a={0} b={m('categoria')} cy={470}>
        {ET.map(([a, n], k) => {
          const x = 80 + k * 133, on = t >= m(a);
          return (
            <g key={a} opacity={on ? 1 : 0.3}>
              <rect x={x} y={180} width={120} height={540} rx={16} fill={et === k ? (isDark ? '#3b2a1e' : '#fff1e6') : c.panel2} />
              <circle cx={x + 60} cy={225} r={26} fill={on ? `url(#${ID}-marca)` : c.apagado} />
              <Txt x={x + 60} y={235} textAnchor="middle" fontSize={26} fill="#fff">{k}</Txt>
              {!movil && <Txt x={x + 60} y={760} textAnchor="middle" fontSize={20} fill={et === k ? NARANJA : c.tenue}>{['Prospectar', 'Investigar', 'Calificar', 'Descubrir', 'Mapear', 'Proponer', 'Negociar', 'Cerrar'][k]}</Txt>}
            </g>
          );
        })}
        {et >= 0 && (() => {
          const u = sm(t, m(ET[et][0]), m(ET[et][0]) + 0.8);
          const x = lerp(80 + Math.max(0, et - 1) * 133, 80 + et * 133, u) + 60;
          const giro = 6 * Math.sin(Math.PI * u) * (et > 0 ? 1 : 0);
          return (
            <g transform={`translate(${x} ${450 - 18 * Math.sin(Math.PI * u)}) rotate(${giro})`}>
              <rect x={-50} y={-92} width={100} height={184} rx={14} fill={c.panel} style={{ filter: `drop-shadow(0 ${6 + 8 * Math.sin(Math.PI * u)}px 14px rgba(0,0,0,${c.sombra}))` }} />
              <path d="M -50 -64 V -78 Q -50 -92 -36 -92 H 36 Q 50 -92 50 -78 V -64 Z" fill={`url(#${ID}-marca)`} />
              <rect x={-30} y={-80} width={60} height={6} rx={3} fill="#fff" opacity={0.85} />
              <Edificio x={-6} y={26} w={46} h={74} color={AZUL_M} />
              <rect x={-36} y={42} width={72} height={8} rx={4} fill={c.texto} opacity={0.75} />
              <rect x={-36} y={56} width={48} height={7} rx={3.5} fill={c.tenue} opacity={0.5} />
              {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={-35 + k * 10} cy={78} r={3.6} fill={k <= et ? NARANJA : c.apagado} />)}
            </g>
          );
        })()}
        {et >= 0 && <Letrero x={600} y={820} texto={ET[et][1]} id={ID} op={1} tam={26} />}
      </Toma>

      {/* 2 · categorías y el cliente que no es único */}
      <Toma t={t} a={m('categoria')} b={m('andino')} cy={470}>
        {t < m('unico') && [0, 1, 2].map((f) => (
          <g key={f} opacity={e1(t, m('categoria') + 0.4 * f)}>
            <Txt x={150} y={290 + f * 170} fontSize={26} fill={c.texto}>{`Categoría ${'ABC'[f]}`}</Txt>
            {Array.from({ length: 6 }, (_, k) => <Edificio key={k} x={480 + k * 110} y={330 + f * 170} w={60} h={90} color={k < 3 - f + 1 ? [AZUL_M, VERDE, AMBAR][f] : c.apagado} />)}
          </g>
        ))}
        {t >= m('categoria') + 2 && t < m('unico') && <Letrero x={600} y={820} texto="Cuánto cubres y cuánto potencial queda" id={ID} op={e1(t, m('categoria') + 2)} tam={24} />}
        {t >= m('unico') && (
          <g opacity={e1(t, m('unico'))}>
            {[0, 1, 2, 3, 4].map((k) => {
              const xO = 240 + k * 180, yO = 420;
              const x = lerp(xO, 600 + 300 * Math.cos(k * 2.4), enreda), y = lerp(yO, 430 + 150 * Math.sin(k * 2.4), enreda);
              return (
                <g key={k}>
                  {k < 4 && <line x1={x} y1={y} x2={lerp(xO + 180, 600 + 300 * Math.cos((k + 1) * 2.4), enreda)} y2={lerp(yO, 430 + 150 * Math.sin((k + 1) * 2.4), enreda)} stroke={GRIS} strokeWidth={5} strokeDasharray={enreda > 0.5 ? '8 10' : undefined} />}
                  {k < 4 && enreda > 0.5 && <line x1={x} y1={y} x2={600 + 300 * Math.cos(((k + 2) % 5) * 2.4)} y2={430 + 150 * Math.sin(((k + 2) % 5) * 2.4)} stroke={GRIS} strokeWidth={4} opacity={0.5} />}
                  <circle cx={x} cy={y} r={46} fill={[AMBAR, TEAL, AZUL_M, VIOLETA, VERDE][k]} />
                  <Busto x={x} y={y + 6} s={1.1} color="#fff" />
                  {t >= m('vetar') && t < m('reunen') && <Cruz x={x + 40} y={y - 40} r={16} op={e1(t, m('vetar') + 0.25 * k)} />}
                  {t >= m(ROLES[k][0]) && <Letrero x={x} y={y + (k % 2 ? 90 : -90)} texto={movil ? ROLES[k][2] : ROLES[k][1]} fondo={[AMBAR, TEAL, AZUL_M, VIOLETA, VERDE][k]} id={ID} op={e1(t, m(ROLES[k][0]))} tam={22} />}
                </g>
              );
            })}
            {t >= m('vetar') && t < m('reunen') && <Letrero x={600} y={820} texto="Casi cualquiera puede vetar" fondo={ROSA} id={ID} op={e1(t, m('vetar'))} tam={26} />}
          </g>
        )}
      </Toma>

      {/* 3 · Grupo Andino */}
      <Toma t={t} a={m('andino')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('andino'))}>
          <rect x={80} y={140} width={540} height={620} rx={26} fill={c.panel} style={{ filter: `drop-shadow(0 6px 16px rgba(0,0,0,${c.sombra}))` }} />
          <rect x={80} y={140} width={540} height={70} rx={26} fill={`url(#${ID}-marcaH)`} />
          <Txt x={350} y={188} textAnchor="middle" fontSize={32} fill="#fff">Grupo Andino</Txt>
          {CONT.map(([n, r, col, corto], k) => (
            <g key={n} opacity={e1(t, m('andino') + 1.5 + 1.8 * k)} transform={`translate(0 ${k * 120})`}>
              <circle cx={150} cy={290} r={40} fill={col} /><Busto x={150} y={296} s={0.95} color="#fff" />
              <Txt x={210} y={284} fontSize={26} fill={c.texto}>{movil ? corto : n}</Txt>
              <Txt x={210} y={318} fontSize={24} fill={col}>{`Compradora ${r.toLowerCase()}`.replace('Compradora usuario', 'Comprador usuario')}</Txt>
            </g>
          ))}
          {t >= m('interaccion') && [0, 1, 2].map((k) => <g key={k} opacity={e1(t, m('interaccion') + 0.6 * k)}><circle cx={130} cy={650 + k * 30} r={8} fill={NARANJA} /><rect x={150} y={644 + k * 30} width={380 - 60 * k} height={12} rx={6} fill={c.apagado} /></g>)}
        </g>
        {t >= m('ponderar') && (
          <g opacity={e1(t, m('ponderar'))}>
            <Txt x={700} y={230} fontSize={28} fill={c.texto}>Valor</Txt>
            <rect x={700} y={250} width={400 * sm(t, m('ponderar'), m('ponderar') + 1.2)} height={34} rx={17} fill={AZUL_M} />
          </g>
        )}
        {t >= m('semaforo') && (
          <g opacity={e1(t, m('semaforo'))} transform="translate(760 430)">
            <rect x={-44} y={-110} width={88} height={220} rx={24} fill={isDark ? '#111827' : '#334155'} />
            {[ROSA, AMBAR, VERDE].map((col, k) => <circle key={col} cx={0} cy={-68 + k * 68} r={26} fill={col} opacity={k === Math.floor(t * 0.8) % 3 ? 1 : 0.25} />)}
          </g>
        )}
        {t >= m('gano') && <g opacity={e1(t, m('gano'))}><Visto x={920} y={380} r={30} /><Txt x={960} y={390} fontSize={26} fill={c.texto}>Ganó</Txt><Cruz x={920} y={470} r={30} /><Txt x={960} y={480} fontSize={26} fill={c.texto}>Perdió</Txt></g>}
        {t >= m('pronostico') && (
          <g opacity={e1(t, m('pronostico'))}>
            {[0.5, 0.3, 0.8].map((v, k) => <rect key={k} x={700 + (k ? [0, 160, 280][k] : 0)} y={620} width={[160, 120, 140][k] * sm(t, m('pronostico') + 0.3 * k, m('pronostico') + 0.3 * k + 0.8)} height={50} fill={[VERDE, AMBAR, AZUL_M][k]} opacity={v + 0.2} />)}
            <Txt x={700} y={600} fontSize={28} fill={c.texto}>Pronóstico ponderado</Txt>
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
