import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Txt, Persona, Nodo, Flujo, Arco, Brujula, Portatil, Nube, Curva, Visto, Cruz, e1, sm, lerp, tono, sombra, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS, ROJO_M } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Superar los problemas principales, en tres frentes (tres tomas).
 * 1 · Identificación: una pila de monedas (monto e impacto) eleva la franja de decisión por el organigrama hasta la
 *     dirección. Los contactos suben información, el dinero vuelve a quien libera los fondos y aparece el presupuesto.
 *     El coach traza el camino y marca, paso a paso, el proceso de decisión.
 * 2 · Bloqueo: un muro con un usuario que cierra el paso al comprador económico. Primero se le ayuda: recibe la
 *     solución, gana prestigio y la lleva por la puerta. Si no basta, los ejecutivos tienden un puente sobre el muro.
 *     Rodear el muro es el último recurso: llega la tormenta de la venganza del comprador.
 * 3 · Abordaje: al económico no se le hace una demostración; se le da visión. Por la ventana se dibuja su futuro,
 *     con rentabilidad, estabilidad y crecimiento; los casos de éxito se apilan y él sube a un podio: su imagen.
 */

const ID = 'vc18', P = 'vc-superar';
type Pt = [number, number];
const TOP: Pt = [700, 220], G2: Pt = [540, 410], F2: Pt = [860, 410];
const BASE: Pt[] = [[440, 600], [620, 600], [780, 600], [960, 600]];

export const SuperarVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const D = isDark;
  const rot: [number, string][] = [
    [m('identificacion'), 'Identificación'], [m('monto'), 'Más monto, más arriba'], [m('investigar'), 'Investiga con tus contactos'],
    [m('fondos'), 'Quién libera los fondos'], [m('coach'), 'El coach te guía'], [m('proceso'), 'El proceso de decisión'],
    [m('bloqueo'), 'Bloqueo'], [m('ayudale'), 'Primero, ayúdale'], [m('prestigio'), 'Gana prestigio'], [m('paralelo'), 'Venta en paralelo'],
    [m('rodear'), 'Rodear: último recurso'], [m('riesgo'), 'Alto riesgo'], [m('venganza'), 'La venganza del comprador'],
    [m('abordaje'), 'Abordaje'], [m('demostraciones'), 'Sin demostraciones'], [m('vision'), 'Conocimiento y visión'], [m('razon'), 'Una razón de negocio'],
    [m('futuro'), 'Predecir su futuro'], [m('exito'), 'Casos de éxito'], [m('personal'), 'Su imagen y su posición'],
  ];

  /* 1 · identificación */
  const subida = sm(t, m('monto'), m('arriba') + 0.8);
  const monedas = 2 + Math.round(7 * subida);
  const yBanda = lerp(600, 220, subida);
  const anchoBanda = lerp(330, 140, subida);
  const topePila = 650 - monedas * 18;
  const pasos: [Pt, number][] = [[BASE[3], m('proceso')], [F2, m('proceso') + 0.6], [TOP, m('proceso') + 1.2]];

  /* 2 · bloqueo */
  const muro = 350 * sm(t, m('bloqueo'), m('bloqueo') + 0.8);
  const reinicio = sm(t, m('paralelo') - 0.2, m('paralelo') + 0.6);
  const xTu = 170 + 80 * sm(t, m('ayudale'), m('ayudale') + 1) * (1 - reinicio);
  const viaje = sm(t, m('prestigio') + 0.6, m('prestigio') + 2.4) * (1 - reinicio);
  const xBloq = lerp(400, 720, viaje);
  const puerta = sm(t, m('prestigio') + 0.2, m('prestigio') + 0.8) * (1 - reinicio);
  const entrega = sm(t, m('ayudale') + 0.3, m('ayudale') + 1.3);
  const enRuta = (u: number): Pt => {
    const v = 1 - u;
    return [v * v * v * 170 + 3 * v * v * u * 250 + 3 * v * u * u * 760 + u * u * u * 860, v * v * v * 790 + 3 * v * v * u * 330 + 3 * v * u * u * 330 + u * u * u * 790];
  };
  const uRodeo = 0.6 * sm(t, m('rodear') + 0.4, m('venganza'));
  const [rx, ry] = enRuta(uRodeo);
  const rodeando = t >= m('rodear');
  const bloqueando = t >= m('bloqueo') && (t < m('ayudale') || t >= m('paralelo') + 0.6);

  /* 3 · abordaje */
  const podio = 50 * sm(t, m('personal'), m('personal') + 0.9);
  const plantas = sm(t, m('crecimiento'), m('crecimiento') + 1.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Superar los problemas principales">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · identificación */}
      <Toma t={t} a={0} b={m('bloqueo')} cy={470}>
        {t >= m('basar') && (
          <rect x={700 - anchoBanda} y={yBanda - 62} width={2 * anchoBanda} height={124} rx={40} fill={NARANJA} opacity={0.12 * e1(t, m('basar'))} stroke={NARANJA} strokeOpacity={0.45} strokeWidth={3} strokeDasharray="12 10" />
        )}
        <g opacity={e1(t, m('frentes'))} stroke={GRIS} strokeOpacity={0.5} strokeWidth={5} fill="none">
          <path d="M 700 266 V 335 H 540 V 364 M 700 335 H 860 V 364" />
          <path d="M 540 456 V 520 H 440 V 554 M 540 520 H 620 V 554 M 860 456 V 520 H 780 V 554 M 860 520 H 960 V 554" />
        </g>
        {t >= m('proceso') && (
          <path d="M 960 554 V 520 H 860 V 456 M 860 364 V 335 H 700 V 266" stroke={VERDE} strokeWidth={7} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - sm(t, m('proceso'), m('proceso') + 1.4)} />
        )}
        <Nodo x={TOP[0]} y={TOP[1]} r={46} nombre="Dirección" color={AZUL_M} op={e1(t, m('frentes'))} pulso={t >= m('arriba') && t < m('coach') ? 0.5 + 0.5 * Math.sin(t * 5) : 0} isDark={D} id={ID} />
        <Nodo x={G2[0]} y={G2[1]} r={46} nombre="Gerencia" color={VIOLETA} op={e1(t, m('frentes') + 0.2)} isDark={D} id={ID} />
        <Nodo x={F2[0]} y={F2[1]} r={46} nombre="Finanzas" color={VERDE} op={e1(t, m('frentes') + 0.3)} isDark={D} id={ID} />
        {BASE.map(([x, y], k) => <Nodo key={k} x={x} y={y} r={40} nombre="" color={GRIS} op={e1(t, m('frentes') + 0.4 + 0.1 * k)} isDark={D} id={ID} />)}
        <Txt x={700} y={690} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={e1(t, m('frentes') + 0.6)}>Usuarios</Txt>
        {t >= m('proceso') && pasos.map(([[x, y], t0], k) => t >= t0 && <Visto key={k} x={x + (k === 2 ? 40 : 34)} y={y - (k === 2 ? 40 : 34)} r={k === 2 ? 24 : 18} op={e1(t, t0, 0.4)} />)}

        {t >= m('basar') && (
          <g opacity={e1(t, m('basar'))}>
            {Array.from({ length: monedas }, (_, k) => (
              <g key={k} transform={`translate(170 ${650 - k * 18})`}>
                <rect x={-56} y={-8} width={112} height={16} fill="#b45309" />
                <ellipse cx={0} cy={8} rx={56} ry={14} fill="#b45309" />
                <ellipse cx={0} cy={-8} rx={56} ry={14} fill="#fbbf24" />
              </g>
            ))}
            {[0, 1].map((k) => { const u = (t * 0.7 + k / 2) % 1; return <ellipse key={k} cx={170} cy={topePila - 8} rx={60 + 50 * u} ry={16 + 12 * u} fill="none" stroke={AMBAR} strokeWidth={3} opacity={(1 - u) * 0.7 * subida} />; })}
            <Txt x={170} y={712} textAnchor="middle" fontSize={24} fill={c.texto}>{movil ? 'Monto' : 'Monto e impacto'}</Txt>
            <line x1={232} y1={topePila - 8} x2={700 - anchoBanda} y2={yBanda} stroke={NARANJA} strokeWidth={4} strokeDasharray="10 8" opacity={0.8 * (1 - sm(t, m('investigar'), m('investigar') + 0.6))} />
          </g>
        )}
        {t >= m('investigar') && t < m('coach') && BASE.map(([x, y], k) => {
          const padre = k < 2 ? G2 : F2;
          return <g key={k} opacity={e1(t, m('investigar') + 0.2 * k)}><Flujo x1={x} y1={y - 40} x2={padre[0]} y2={padre[1] + 46} t={t} n={2} vel={0.8} arco={0} color={AZUL_M} r={6} /></g>;
        })}
        {t >= m('investigar') && t < m('coach') && [G2, F2].map(([x, y], k) => <g key={k} opacity={e1(t, m('investigar') + 0.6)}><Flujo x1={x} y1={y - 46} x2={TOP[0]} y2={TOP[1] + 46} t={t} n={2} vel={0.8} arco={0} color={AZUL_M} r={6} /></g>)}
        {t >= m('fondos') && <g opacity={e1(t, m('fondos'))}><Flujo x1={TOP[0] - 46} y1={TOP[1]} x2={236} y2={topePila - 20} t={t} n={5} vel={0.5} arco={70} color={AMBAR} r={10} /></g>}
        {t >= m('presupuesto') && (
          <g opacity={e1(t, m('presupuesto'))}>
            <line x1={752} y1={220} x2={960} y2={210} stroke={AMBAR} strokeWidth={4} strokeDasharray="8 8" />
            <g transform="translate(1010 210)">
              <rect x={-38} y={-52} width={76} height={92} rx={18} fill={D ? '#1e3a5f' : '#dbeafe'} opacity={0.9} />
              {[[-14, 20], [12, 22], [0, 2], [-16, -14], [14, -10]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={11} fill={AMBAR} />)}
              <rect x={-42} y={-62} width={84} height={16} rx={6} fill={AZUL_M} />
            </g>
            <Txt x={1010} y={292} textAnchor="middle" fontSize={24} fill={c.texto}>Presupuesto</Txt>
          </g>
        )}
        {t >= m('coach') && (
          <g opacity={e1(t, m('coach'))}>
            <Persona id={ID} x={1110} y={840} s={0.7} cuerpo={VERDE} />
            <Brujula x={1030} y={770} r={34} ang={-40 + 12 * Math.sin(t * 2)} id={ID} />
            <Txt x={1110} y={698} textAnchor="middle" fontSize={24} fill={c.texto}>Coach</Txt>
            <path d="M 1090 670 C 1150 480 900 330 752 236" stroke={VERDE} strokeWidth={5} fill="none" strokeDasharray="12 10" opacity={0.8} />
            {(() => {
              const u = (t * 0.45) % 1, v = 1 - u;
              const x = v * v * v * 1090 + 3 * v * v * u * 1150 + 3 * v * u * u * 900 + u * u * u * 752;
              const y = v * v * v * 670 + 3 * v * v * u * 480 + 3 * v * u * u * 330 + u * u * u * 236;
              return <circle cx={x} cy={y} r={10} fill={VERDE} opacity={Math.sin(Math.PI * u)} />;
            })()}
          </g>
        )}
      </Toma>

      {/* 2 · bloqueo */}
      <Toma t={t} a={m('bloqueo')} b={m('abordaje')} cy={470}>
        <rect x={60} y={790} width={1080} height={10} rx={5} fill={D ? '#3a3f47' : '#dfe3e8'} />
        <rect x={760} y={470} width={350} height={320} rx={18} fill={c.panel2} opacity={0.9} />
        <rect x={950} y={505} width={130} height={90} rx={10} fill={D ? '#1e3a5f' : '#dbeafe'} />
        <Persona id={ID} x={920} y={790} s={0.9} corbata cuerpo={VERDE} />
        <Txt x={920} y={834} textAnchor="middle" fontSize={24} fill={c.texto}>Económico</Txt>

        {muro > 1 && (
          <g>
            <rect x={470} y={790 - muro} width={70} height={muro} rx={6} fill="#b4532a" />
            {Array.from({ length: Math.floor(muro / 30) }, (_, k) => <line key={k} x1={470} x2={540} y1={790 - 30 * (k + 1)} y2={790 - 30 * (k + 1)} stroke={c.panel} strokeOpacity={0.5} strokeWidth={3} />)}
            {muro > 160 && <rect x={478} y={640} width={54} height={150} rx={6} fill={c.panel2} />}
            {muro > 160 && <rect x={478} y={640} width={54 * (1 - puerta)} height={150} rx={6} fill="#7c2d12" />}
          </g>
        )}

        {t >= m('paralelo') && t < m('rodear') && (
          <g opacity={e1(t, m('paralelo'))}>
            <rect x={60} y={400} width={290} height={14} rx={7} fill={D ? '#3a3f47' : '#dfe3e8'} />
            <rect x={740} y={400} width={330} height={14} rx={7} fill={D ? '#3a3f47' : '#dfe3e8'} />
            {t >= m('ejecutivo') && <g opacity={e1(t, m('ejecutivo'))}><Persona id={ID} x={200} y={400} s={0.7} corbata cuerpo={NARANJA} /><Txt x={200} y={450} textAnchor="middle" fontSize={24} fill={c.texto}>Tu ejecutivo</Txt></g>}
            {t >= m('cliente') && <g opacity={e1(t, m('cliente'))}><Persona id={ID} x={900} y={400} s={0.7} corbata cuerpo={AZUL_M} /><Txt x={900} y={450} textAnchor="middle" fontSize={24} fill={c.texto}>Su ejecutivo</Txt></g>}
            {t >= m('cliente') && <Arco x1={250} y1={300} x2={850} y2={300} u={sm(t, m('cliente') + 0.3, m('cliente') + 1.5)} color={NARANJA} alto={110} grosor={8} />}
            {t >= m('cliente') + 1.5 && <Flujo x1={960} y1={480} x2={960} y2={600} t={t} n={3} vel={0.8} arco={0} color={NARANJA} r={7} />}
          </g>
        )}

        {rodeando && (
          <g opacity={e1(t, m('rodear'))}>
            <path d="M 170 790 C 250 330 760 330 860 790" stroke={t >= m('venganza') ? GRIS : ROSA} strokeWidth={6} fill="none" strokeDasharray="14 12" />
            {t >= m('riesgo') && t < m('venganza') && (
              <g opacity={e1(t, m('riesgo'))} transform={`translate(505 ${230 + 4 * Math.sin(t * 4)})`}>
                <path d="M 0 -46 L 44 32 L -44 32 Z" fill={AMBAR} stroke={AMBAR} strokeWidth={10} strokeLinejoin="round" />
                <rect x={-5} y={-18} width={10} height={30} rx={5} fill="#fff" /><circle cx={0} cy={22} r={6} fill="#fff" />
              </g>
            )}
            {t >= m('venganza') && (
              <g opacity={e1(t, m('venganza'))}>
                <Nube x={560} y={200} s={0.5} t={t} color={GRIS} />
                <path d={`M 560 250 L ${rx + 10} ${ry - 230} L ${rx - 14} ${ry - 220} L ${rx + 4} ${ry - 170}`} stroke={AMBAR} strokeWidth={8} fill="none" strokeLinejoin="round" opacity={0.6 + 0.4 * Math.sin(t * 18)} />
              </g>
            )}
          </g>
        )}

        <g transform={`translate(${xBloq} 0)`}>
          {puerta > 0.5 && <circle cx={0} cy={700} r={80 + 6 * Math.sin(t * 4)} fill={AMBAR} opacity={0.16} />}
          <Persona id={ID} x={0} y={790} s={0.8} cuerpo={t >= m('venganza') ? ROJO_M : VIOLETA} />
          {bloqueando && <g opacity={e1(t, t >= m('paralelo') ? m('paralelo') + 0.6 : m('bloqueo') + 0.6)}><rect x={-70} y={710} width={140} height={20} rx={10} fill={t >= m('venganza') ? ROJO_M : VIOLETA} /><circle cx={-70} cy={720} r={14} fill={`url(#${ID}-cara)`} /><circle cx={70} cy={720} r={14} fill={`url(#${ID}-cara)`} /></g>}
          {t >= m('prestigio') && t < m('paralelo') + 0.4 && (
            <g opacity={e1(t, m('prestigio')) * (1 - reinicio)} transform="translate(0 712)">
              <circle r={18} fill={AMBAR} /><path d="M 0 -11 L 3.5 -3.5 L 11 -3.5 L 5 1.5 L 7 9 L 0 4.5 L -7 9 L -5 1.5 L -11 -3.5 L -3.5 -3.5 Z" fill="#fff" />
            </g>
          )}
          <Txt x={0} y={834} textAnchor="middle" fontSize={24} fill={c.texto}>Usuario</Txt>
        </g>
        {t >= m('bloqueo') && t < m('ayudale') && <Cruz x={288} y={620} r={24} op={e1(t, m('bloqueo') + 0.6)} />}

        {t >= m('ayudale') && t < m('paralelo') + 0.4 && (() => {
          const x = entrega < 1 ? lerp(xTu + 40, 360, entrega) : xBloq - 40;
          const y = entrega < 1 ? 690 - 60 * Math.sin(Math.PI * entrega) : 690;
          return (
            <g opacity={1 - reinicio} transform={`translate(${x} ${y})`}>
              <rect x={-24} y={-22} width={48} height={44} rx={6} fill={AMBAR} />
              <rect x={-5} y={-22} width={10} height={44} fill={ROSA} /><rect x={-24} y={-5} width={48} height={10} fill={ROSA} />
            </g>
          );
        })()}

        {rodeando
          ? <Persona id={ID} x={rx} y={ry} s={0.8} />
          : <g><Persona id={ID} x={xTu} y={790} s={0.85} /><Txt x={xTu} y={834} textAnchor="middle" fontSize={24} fill={c.texto}>Tú</Txt></g>}
      </Toma>

      {/* 3 · abordaje */}
      <Toma t={t} a={m('abordaje')} b={fin + 1} cy={470}>
        <rect x={560} y={130} width={580} height={340} rx={22} fill={D ? '#1e3a5f' : '#dbeafe'} stroke={c.panel2} strokeWidth={12} />
        <rect x={566} y={410} width={568} height={54} rx={4} fill={VERDE} opacity={0.25} />
        <circle cx={630} cy={lerp(230, 200, sm(t, m('vision'), m('vision') + 2))} r={32} fill={AMBAR} opacity={0.9} />

        {t >= m('demostraciones') && t < m('vision') + 0.6 && (
          <g opacity={e1(t, m('demostraciones')) * (1 - sm(t, m('vision'), m('vision') + 0.6))} transform={`translate(${lerp(0, 140, sm(t, m('vision'), m('vision') + 0.6))} 0)`}>
            <Portatil x={780} y={680} s={1}><path d="M -12 -18 L 16 0 L -12 18 Z" fill="#fff" /></Portatil>
            {t >= m('demostraciones') + 0.8 && <Cruz x={880} y={560} r={34} op={e1(t, m('demostraciones') + 0.8)} />}
          </g>
        )}

        {t >= m('vision') && (
          <g opacity={e1(t, m('vision'))}>
            <path d="M 470 640 L 430 790 M 470 640 L 510 790 M 470 640 L 470 790" stroke={GRIS} strokeWidth={6} strokeLinecap="round" />
            <g transform="translate(470 630) rotate(-38)">
              <rect x={-30} y={-18} width={170} height={36} rx={14} fill="#475569" />
              <rect x={120} y={-24} width={34} height={48} rx={10} fill={NARANJA} />
            </g>
            <path d="M 590 520 L 700 440" stroke={AMBAR} strokeWidth={4} strokeDasharray="6 10" opacity={0.5 + 0.3 * Math.sin(t * 4)} />
          </g>
        )}

        {t >= m('razon') && <Curva pts={[[610, 400], [690, 388], [770, 365], [850, 340]]} u={sm(t, m('razon'), m('razon') + 1.4)} color={VERDE} grosor={8} />}
        {t >= m('futuro') && (
          <g opacity={e1(t, m('futuro'))}>
            <path d={`M 850 340 L ${lerp(850, 1100, sm(t, m('futuro'), m('futuro') + 1.4))} ${lerp(340, 210, sm(t, m('futuro'), m('futuro') + 1.4))} L ${lerp(850, 1100, sm(t, m('futuro'), m('futuro') + 1.4))} ${lerp(340, 330, sm(t, m('futuro'), m('futuro') + 1.4))} Z`} fill={VERDE} opacity={0.2} />
            <Curva pts={[[850, 340], [950, 305], [1100, 262]]} u={sm(t, m('futuro'), m('futuro') + 1.4)} color={VERDE} grosor={6} punteada />
            <circle cx={850} cy={340} r={10} fill={VERDE} />
          </g>
        )}

        {t >= m('rentabilidad') && (
          <g opacity={e1(t, m('rentabilidad'))}>
            {[0, 1, 2].map((k) => <g key={k} transform={`translate(660 ${630 - k * 16})`}><ellipse cx={0} cy={6} rx={40} ry={11} fill="#b45309" /><ellipse cx={0} cy={-4} rx={40} ry={11} fill="#fbbf24" /></g>)}
            <path d={`M 712 ${620 - 20 * sm(t, m('rentabilidad'), m('rentabilidad') + 0.8)} l 0 -50 m -14 14 l 14 -14 l 14 14`} stroke={VERDE} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <Txt x={670} y={700} textAnchor="middle" fontSize={24} fill={c.texto}>{movil ? 'Renta' : 'Rentabilidad'}</Txt>
          </g>
        )}
        {t >= m('estabilidad') && (
          <g opacity={e1(t, m('estabilidad'))} transform={`translate(880 600) scale(${lerp(0.7, 1, e1(t, m('estabilidad')))})`}>
            <path d="M 0 -50 L 42 -34 Q 42 20 0 46 Q -42 20 -42 -34 Z" fill={AZUL_M} />
            <path d="M -16 0 L -4 12 L 18 -12" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        {t >= m('estabilidad') && <Txt x={880} y={700} textAnchor="middle" fontSize={24} fill={c.texto} opacity={e1(t, m('estabilidad'))}>{movil ? 'Estable' : 'Estabilidad'}</Txt>}
        {t >= m('crecimiento') && (
          <g opacity={e1(t, m('crecimiento'))}>
            <path d="M 1060 650 L 1100 650 L 1094 680 L 1066 680 Z" fill="#b45309" />
            <path d={`M 1080 650 V ${650 - 80 * plantas}`} stroke={VERDE} strokeWidth={6} strokeLinecap="round" />
            <ellipse cx={1080 - 18 * plantas} cy={650 - 44 * plantas} rx={18 * plantas} ry={9 * plantas} fill={VERDE} transform={`rotate(-30 ${1080 - 18 * plantas} ${650 - 44 * plantas})`} />
            <ellipse cx={1080 + 18 * plantas} cy={650 - 66 * plantas} rx={18 * plantas} ry={9 * plantas} fill="#34d399" transform={`rotate(30 ${1080 + 18 * plantas} ${650 - 66 * plantas})`} />
            <Txt x={1080} y={720} textAnchor="middle" fontSize={24} fill={c.texto}>{movil ? 'Crece' : 'Crecimiento'}</Txt>
          </g>
        )}

        {t >= m('exito') && [0, 1, 2].map((k) => (
          <g key={k} opacity={e1(t, m('exito') + 0.4 * k)} transform={`translate(130 ${lerp(700 - 90 * k - 60, 700 - 90 * k, e1(t, m('exito') + 0.4 * k))})`}>
            <rect x={-44} y={-36} width={88} height={72} rx={10} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            <path d="M -18 -14 L -12 -2 L 1 -2 L -9 6 L -5 19 L -18 11 L -31 19 L -27 6 L -37 -2 L -24 -2 Z" fill={AMBAR} transform="translate(8 0)" />
            <rect x={6} y={-16} width={26} height={6} rx={3} fill={GRIS} opacity={0.5} /><rect x={6} y={0} width={20} height={6} rx={3} fill={GRIS} opacity={0.5} />
          </g>
        ))}

        {podio > 0.5 && <path d={`M 300 110 L ${222} ${790 - podio} L ${378} ${790 - podio} Z`} fill={AMBAR} opacity={0.14} />}
        {podio > 0.5 && <rect x={222} y={790 - podio} width={156} height={podio} rx={8} fill={`url(#${ID}-marca)`} />}
        <Persona id={ID} x={300} y={790 - podio} s={1.05} corbata cuerpo={VERDE} />
        {podio > 25 && <g transform={`translate(300 ${790 - podio - 60})`} opacity={e1(t, m('personal') + 0.5)}><circle r={16} fill={AMBAR} /><path d="M 0 -9 L 3 -3 L 9 -3 L 4 1 L 6 8 L 0 4 L -6 8 L -4 1 L -9 -3 L -3 -3 Z" fill="#fff" /></g>}
        <Txt x={300} y={836} textAnchor="middle" fontSize={24} fill={c.texto}>Económico</Txt>
      </Toma>
    </Lienzo>
  );
};
