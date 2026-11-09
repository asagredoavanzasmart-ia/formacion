import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Txt, Persona, Propuesta, Edificio, Burbuja, Brujula, Busto, Visto, Cruz, e1, sm, lerp, ventana, tono, sombra, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, TEAL, AMBAR, GRIS, ROJO_M } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * El comprador técnico es el portero, literal: una barrera con escáner entre la propuesta y el edificio del comprador
 * económico. El escáner mide la propuesta y la barrera baja: puede bloquear. Arriba a la izquierda, el selector de los
 * tres perfiles marca quién está en la puerta; cada uno trae sus objetos:
 * 1 · Ingeniero especialista (casco): medidor de influencia al máximo, la llave que le delega el económico, el filtro
 *     que descarta a los competidores, la ficha técnica que supera la exigencia y la estrella del experto.
 * 2 · Asesor o consultor (maletín): el escudo de su reputación, el foco ante su gerencia, el medidor de riesgo que baja
 *     y su transformación en coach (brújula) camino al económico.
 * 3 · Técnico con recelo (brazos cruzados): aferra la palanca de la barrera, ve la propuesta como amenaza; saltarlo
 *     está prohibido (sabotearía el engranaje de la implementación); se descubre su miedo, gana una medalla, conserva
 *     el control y un usuario entusiasta destraba la barrera. Al final, el coach valida antes de avanzar.
 */

const ID = 'vc09', P = 'vc-tecnico';
const SUELO = 790;
const XG = 765;

/* Medidor semicircular; `v` de 0 a 1. */
const Medidor: React.FC<{ x: number; y: number; r: number; v: number; texto: string; c: ReturnType<typeof tono>; invertido?: boolean; op?: number }> = ({ x, y, r, v, texto, c, invertido = false, op = 1 }) => {
  const a = Math.PI * (1 - v);
  const zonas = invertido ? [VERDE, AMBAR, ROJO_M] : [GRIS, AMBAR, NARANJA];
  return (
    <g opacity={op} transform={`translate(${x} ${y})`}>
      <path d={`M ${-r - 16} 8 A ${r + 16} ${r + 16} 0 0 1 ${r + 16} 8 Z`} fill={c.panel} style={sombra(c.sombra, 3, 10)} />
      {zonas.map((col, k) => {
        const a0 = Math.PI * (1 - k / 3), a1 = Math.PI * (1 - (k + 1) / 3);
        return <path key={k} d={`M ${r * Math.cos(a0)} ${-r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${r * Math.cos(a1)} ${-r * Math.sin(a1)}`} stroke={col} strokeWidth={12} fill="none" />;
      })}
      <line x1={0} y1={0} x2={(r - 14) * Math.cos(a)} y2={-(r - 14) * Math.sin(a)} stroke={c.texto} strokeWidth={6} strokeLinecap="round" />
      <circle r={8} fill={c.texto} />
      <Txt x={0} y={46} textAnchor="middle" fontSize={22} fill={c.texto}>{texto}</Txt>
    </g>
  );
};

/* Engranaje; `giro` en grados. */
const Rueda: React.FC<{ x: number; y: number; r: number; giro: number; color: string }> = ({ x, y, r, giro, color }) => (
  <g transform={`translate(${x} ${y}) rotate(${giro})`}>
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-r * 0.16} y={-r - 10} width={r * 0.32} height={20} rx={4} fill={color} transform={`rotate(${k * 45})`} />)}
    <circle r={r} fill={color} /><circle r={r * 0.38} fill="#fff" opacity={0.85} />
  </g>
);

export const TecnicoVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('portero'), 'El portero'], [m('medible'), 'Evalúa lo medible'], [m('bloqueo'), 'Puede bloquear'], [m('tres'), 'Tres perfiles'],
    [m('ingeniero'), 'El ingeniero especialista'], [m('influencia'), 'Influencia alta'], [m('delega'), 'El económico delega en él'], [m('filtro'), 'El filtro real'],
    [m('especificaciones'), 'Especificaciones medibles'], [m('supera'), 'Supera sus exigencias'], [m('experto'), 'Que se vea como el experto'],
    [m('asesor'), 'El asesor o consultor'], [m('reputacion'), 'Protege su reputación'], [m('solucionador'), 'Lúcelo ante su gerencia'],
    [m('menor'), 'La opción de menor riesgo'], [m('transformalo'), 'Transfórmalo en coach'], [m('recelo'), 'El técnico con recelo'],
    [m('control'), 'Teme perder el control'], [m('amenaza'), 'Te ve como amenaza'], [m('saltes'), 'No lo saltes'], [m('sabotea'), 'Sabotearía la implementación'],
    [m('teme'), '¿Por qué teme?'], [m('gana'), 'Cómo gana con el cambio'], [m('enfatiza'), 'Mantiene el control'], [m('usuario'), 'Un usuario entusiasta'],
    [m('valida'), 'Valida con tu coach'],
  ];
  const perfil = t >= m('recelo') ? 2 : t >= m('asesor') ? 1 : t >= m('ingeniero') ? 0 : -1;
  const tPerfil = [m('ingeniero'), m('asesor'), m('recelo')];

  /* la barrera: abierta al inicio, baja al bloquear, sube cuando el usuario destraba */
  const cierra = sm(t, m('bloqueo'), m('bloqueo') + 0.5);
  const abre = sm(t, m('usuario') + 1.2, m('usuario') + 2);
  const angBrazo = lerp(-72, 0, cierra) + 72 * -abre;
  const verdeLuz = t < m('medible') || abre > 0.5;
  /* la propuesta: llega al escáner, retrocede al bloquearse y pasa al final */
  const xProp = (() => {
    let x = lerp(300, 600, sm(t, m('medible') - 0.6, m('medible') + 0.4));
    x = lerp(x, 450, sm(t, m('bloqueo'), m('bloqueo') + 0.6));
    return lerp(x, 880, sm(t, m('usuario') + 1.8, m('usuario') + 3.2));
  })();
  const escanea = ventana(t, m('medible'), m('bloqueo') + 0.3) + ventana(t, m('filtro') + 0.2, m('filtro') + 2.6);

  /* el portero que está en la puerta, con su entrada y salida */
  const presencia = (k: number) => {
    const a = tPerfil[k], b = k < 2 ? tPerfil[k + 1] : fin + 1;
    return sm(t, a, a + 0.7) * (1 - sm(t, b - 0.5, b));
  };
  const xPortero = (k: number) => XG + 140 * (1 - presencia(k));
  const coachAsesor = sm(t, m('transformalo'), m('transformalo') + 0.8);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Comprador técnico">
      <Rotulo t={t} lista={rot} id={ID} />

      <Toma t={t} a={0} b={fin + 1} cy={470}>
        <rect x={60} y={SUELO} width={1080} height={10} rx={5} fill={c.apagado} />
        <Edificio x={1050} y={SUELO} w={140} h={300} color={isDark ? '#334155' : '#64748b'} op={e1(t, 0.2)} />
        <Persona id={ID} x={900} y={SUELO} s={0.88} corbata cuerpo={VERDE} />
        <Txt x={900} y={834} textAnchor="middle" fontSize={24} fill={c.texto}>{movil ? 'Económico' : 'Comprador económico'}</Txt>
        <Persona id={ID} x={160} y={SUELO} s={0.88} cuerpo={NARANJA} />
        <Txt x={160} y={834} textAnchor="middle" fontSize={24} fill={c.texto}>Tú</Txt>

        {/* la barrera y el escáner */}
        <g opacity={e1(t, m('portero'))}>
          <rect x={520} y={470} width={30} height={SUELO - 470} rx={8} fill={isDark ? '#64748b' : '#475569'} />
          <rect x={650} y={470} width={30} height={SUELO - 470} rx={8} fill={isDark ? '#64748b' : '#475569'} />
          <rect x={510} y={456} width={180} height={22} rx={10} fill={isDark ? '#94a3b8' : '#334155'} />
          {escanea > 0.01 && <path d={`M 560 478 L 640 478 L ${xProp + 40} 760 L ${xProp - 40} 760 Z`} fill={t >= m('filtro') ? VERDE : AZUL_M} opacity={0.18 * escanea} />}
          {escanea > 0.01 && <rect x={xProp - 44} y={lerp(690, 770, (Math.sin(t * 5) + 1) / 2)} width={88} height={4} rx={2} fill={t >= m('filtro') ? VERDE : AZUL_M} opacity={escanea} />}
          <g transform={`translate(535 610) rotate(${angBrazo})`}>
            <rect x={0} y={-10} width={142} height={20} rx={10} fill="#fff" style={sombra(0.2, 2, 4)} />
            {[0, 1, 2].map((k) => <rect key={k} x={18 + k * 44} y={-10} width={24} height={20} fill={ROJO_M} />)}
          </g>
          <circle cx={600} cy={440} r={16} fill={verdeLuz ? VERDE : ROJO_M} />
          <circle cx={600} cy={440} r={26 + 4 * Math.sin(t * 6)} fill={verdeLuz ? VERDE : ROJO_M} opacity={0.2} />
        </g>

        {/* competidores en la fila (filtro) */}
        {t >= m('filtro') && t < m('especificaciones') + 1 && [0, 1].map((k) => {
          const caida = sm(t, m('filtro') + 1.4 + 0.5 * k, m('filtro') + 2.2 + 0.5 * k);
          return (
            <g key={k} opacity={ventana(t, m('filtro'), m('especificaciones') + 1) * (1 - caida)} transform={`translate(${360 - 80 * k} ${740 + 60 * caida}) rotate(${40 * caida})`}>
              <Propuesta x={0} y={0} s={0.8} sello={GRIS} />
              {t >= m('filtro') + 1.2 + 0.5 * k && <Cruz x={28} y={-34} r={14} />}
            </g>
          );
        })}
        <Propuesta x={xProp} y={740} s={0.8} op={e1(t, 0.3)} />
        {t >= m('supera') && t < m('asesor') && <Visto x={xProp + 30} y={700} r={16} op={e1(t, m('supera') + 1)} />}

        {/* selector de perfiles */}
        {t >= m('tres') && (['Ingeniero', 'Asesor', 'Con recelo'] as const).map((n, k) => {
          const on = perfil === k;
          const y = 220 + k * 78;
          return (
            <g key={n} opacity={e1(t, m('tres') + 0.3 * k) * (on ? 1 : perfil >= 0 ? 0.45 : 0.8)} transform={`translate(${130} ${y}) scale(${on ? 1.08 : 1})`}>
              {on && <circle r={38} fill={NARANJA} opacity={0.18} />}
              <circle r={30} fill={[AMBAR, AZUL_M, VIOLETA][k]} style={sombra(c.sombra, 2, 6)} />
              <Busto x={0} y={6} s={0.7} color="#fff" />
              <Txt x={46} y={9} fontSize={22} fill={on ? NARANJA : c.texto}>{n}</Txt>
            </g>
          );
        })}

        {/* 1 · el ingeniero especialista */}
        {presencia(0) > 0.01 && (
          <g opacity={presencia(0)}>
            <Persona id={ID} x={xPortero(0)} y={SUELO} s={0.9} cuerpo={AMBAR} />
            <path d={`M ${xPortero(0) - 32} ${SUELO - 140} Q ${xPortero(0) - 32} ${SUELO - 182} ${xPortero(0)} ${SUELO - 182} Q ${xPortero(0) + 32} ${SUELO - 182} ${xPortero(0) + 32} ${SUELO - 140} Z`} fill="#facc15" />
            <rect x={xPortero(0) - 40} y={SUELO - 144} width={80} height={10} rx={5} fill="#eab308" />
            {t >= m('delega') && (() => {
              const u = sm(t, m('delega'), m('delega') + 1.2);
              const x = lerp(870, xPortero(0) + 38, u), y = lerp(680, 690, u) - 60 * Math.sin(Math.PI * u);
              return (
                <g transform={`translate(${x} ${y}) rotate(${-30 + 30 * u})`}>
                  <circle r={13} fill="none" stroke={AMBAR} strokeWidth={7} /><rect x={10} y={-4} width={34} height={8} rx={3} fill={AMBAR} />
                  <rect x={34} y={2} width={6} height={10} fill={AMBAR} /><rect x={24} y={2} width={6} height={8} fill={AMBAR} />
                </g>
              );
            })()}
            {t >= m('experto') && (
              <g opacity={e1(t, m('experto'))} transform={`translate(${xPortero(0)} ${SUELO - 230}) rotate(${8 * Math.sin(t * 2)})`}>
                <circle r={34} fill={AMBAR} opacity={0.25} />
                <path d="M 0 -26 L 7 -9 L 25 -8 L 11 4 L 16 22 L 0 12 L -16 22 L -11 4 L -25 -8 L -7 -9 Z" fill={AMBAR} />
              </g>
            )}
          </g>
        )}
        {t >= m('influencia') && t < m('especificaciones') && <Medidor x={880} y={330} r={58} v={lerp(0.2, t >= m('indiscutible') ? 0.97 : 0.85, sm(t, m('influencia'), m('influencia') + 1))} texto="Influencia" c={c} op={ventana(t, m('influencia'), m('especificaciones'))} />}
        {t >= m('especificaciones') && t < m('asesor') && (
          <g opacity={ventana(t, m('especificaciones'), m('asesor'))}>
            <rect x={450} y={180} width={320} height={210} rx={20} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <rect x={470} y={198} width={120} height={10} rx={5} fill={c.tenue} opacity={0.6} />
            {[0, 1, 2].map((k) => {
              const meta = 0.62, v = lerp(0.3, [0.85, 0.78, 0.92][k], sm(t, m('especificaciones') + 0.3 * k, m('especificaciones') + 1 + 0.3 * k)) * (t >= m('supera') ? 1 : 0.7);
              return <rect key={k} x={500 + k * 90} y={370 - 150 * v} width={56} height={150 * v} rx={8} fill={t >= m('supera') && v > meta ? VERDE : AZUL_M} />;
            })}
            <line x1={470} y1={370 - 150 * 0.62} x2={750} y2={370 - 150 * 0.62} stroke={ROJO_M} strokeWidth={4} strokeDasharray="10 8" />
          </g>
        )}

        {/* 2 · el asesor o consultor */}
        {presencia(1) > 0.01 && (
          <g opacity={presencia(1)}>
            {t >= m('solucionador') && <path d={`M ${XG - 30} 100 L ${XG + 30} 100 L ${XG + 120} ${SUELO} L ${XG - 120} ${SUELO} Z`} fill={AMBAR} opacity={0.12 * ventana(t, m('solucionador'), m('recelo'))} />}
            <Persona id={ID} x={xPortero(1)} y={SUELO} s={0.9} corbata cuerpo={lerp(0, 1, coachAsesor) > 0.5 ? TEAL : AZUL_M} />
            <rect x={xPortero(1) + 36} y={SUELO - 70} width={46} height={36} rx={6} fill="#78350f" />
            <rect x={xPortero(1) + 50} y={SUELO - 78} width={18} height={10} rx={3} fill="none" stroke="#78350f" strokeWidth={4} />
            {t >= m('reputacion') && (
              <g opacity={e1(t, m('reputacion')) * (1 - coachAsesor)} transform={`translate(${xPortero(1)} ${SUELO - 230})`}>
                <path d="M 0 -40 L 34 -26 Q 34 14 0 40 Q -34 14 -34 -26 Z" fill={AZUL_M} style={sombra(0.2, 2, 6)} />
                <path d="M 0 -18 L 5 -6 L 18 -5 L 8 4 L 11 17 L 0 10 L -11 17 L -8 4 L -18 -5 L -5 -6 Z" fill="#fff" />
              </g>
            )}
            {t >= m('transformalo') && <Brujula x={xPortero(1)} y={SUELO - 240} r={38} ang={-30 + 20 * Math.sin(t * 2)} id={ID} op={coachAsesor} />}
            {t >= m('transformalo') && <path d={`M ${xPortero(1) + 40} ${SUELO - 250} C ${xPortero(1) + 100} ${SUELO - 330} 900 ${SUELO - 300} 900 ${SUELO - 190}`} stroke={TEAL} strokeWidth={5} fill="none" strokeDasharray="10 9" strokeDashoffset={-t * 30} opacity={sm(t, m('transformalo') + 0.6, m('transformalo') + 1.2)} />}
          </g>
        )}
        {t >= m('menor') && t < m('recelo') && <Medidor x={880} y={330} r={58} v={lerp(0.85, 0.12, sm(t, m('menor'), m('menor') + 1.4))} texto="Riesgo" c={c} invertido op={ventana(t, m('menor'), m('recelo'))} />}

        {/* 3 · el técnico con recelo */}
        {presencia(2) > 0.01 && (() => {
          const x = xPortero(2);
          const brillo = t >= m('enfatiza') ? 0.5 + 0.5 * Math.sin(t * 5) : 0;
          return (
            <g opacity={presencia(2)}>
              {t >= m('control') && (
                <g opacity={e1(t, m('control'))}>
                  <path d={`M 680 700 Q 740 760 ${x + 72} ${SUELO - 8}`} stroke={GRIS} strokeWidth={4} strokeDasharray="6 6" fill="none" />
                  <rect x={x + 56} y={SUELO - 24} width={40} height={24} rx={6} fill={GRIS} />
                  <line x1={x + 76} y1={SUELO - 20} x2={x + 62} y2={SUELO - 120} stroke={isDark ? '#cbd5e1' : '#334155'} strokeWidth={8} strokeLinecap="round" />
                  <circle cx={x + 62} cy={SUELO - 124} r={14} fill={brillo > 0 ? VERDE : ROJO_M} />
                  {brillo > 0 && <circle cx={x + 62} cy={SUELO - 124} r={24 + 6 * brillo} fill={VERDE} opacity={0.2} />}
                </g>
              )}
              <Persona id={ID} x={x} y={SUELO} s={0.9} cuerpo={VIOLETA} />
              {t < m('gana') && <g><rect x={x - 46} y={SUELO - 92} width={92} height={22} rx={11} fill={VIOLETA} /><rect x={x - 46} y={SUELO - 92} width={92} height={22} rx={11} fill="#000" opacity={0.15} /></g>}
              {t >= m('amenaza') && (
                <g opacity={e1(t, m('amenaza'))} transform={`translate(${x + 30} ${SUELO - 300})`}>
                  <circle cx={-22} cy={82} r={7} fill={c.panel} style={sombra(c.sombra, 2, 4)} /><circle cx={-12} cy={62} r={11} fill={c.panel} style={sombra(c.sombra, 2, 4)} />
                  <ellipse cx={0} cy={0} rx={62} ry={46} fill={c.panel} style={sombra(c.sombra, 3, 10)} />
                  {t < m('gana') ? (
                    <g transform={`scale(${1 + 0.06 * Math.sin(t * 8)})`}>
                      <path d="M 0 -30 L 30 22 L -30 22 Z" fill={ROJO_M} /><rect x={-3} y={-12} width={6} height={20} rx={3} fill="#fff" /><circle cx={0} cy={14} r={3.5} fill="#fff" />
                    </g>
                  ) : (
                    <g opacity={e1(t, m('gana'))}>
                      <circle r={26} fill={AMBAR} /><path d="M 0 -15 L 4 -5 L 15 -4 L 7 3 L 9 14 L 0 8 L -9 14 L -7 3 L -15 -4 L -4 -5 Z" fill="#fff" />
                    </g>
                  )}
                </g>
              )}
            </g>
          );
        })()}
        {t >= m('saltes') && t < m('teme') && (
          <g opacity={ventana(t, m('saltes'), m('teme'))}>
            <path d="M 450 700 Q 640 -300 880 600" stroke={ROJO_M} strokeWidth={5} fill="none" strokeDasharray="12 10" />
            <Cruz x={652} y={176} r={30} op={sm(t, m('saltes') + 0.4, m('saltes') + 0.9)} />
          </g>
        )}
        {t >= m('sabotea') && t < m('teme') && (() => {
          const traba = sm(t, m('sabotea') + 0.5, m('sabotea') + 0.9);
          const giro = (t - m('sabotea')) * 90 * (1 - traba);
          return (
            <g opacity={ventana(t, m('sabotea'), m('teme'))}>
              <Rueda x={320} y={500} r={38} giro={giro} color={traba > 0.5 ? ROJO_M : GRIS} />
              <Rueda x={392} y={540} r={28} giro={-giro * 1.35 + 22} color={traba > 0.5 ? ROJO_M : GRIS} />
              <g transform={`translate(${lerp(240, 352, traba)} ${lerp(420, 516, traba)}) rotate(${lerp(-60, 30, traba)})`}>
                <rect x={-6} y={-40} width={12} height={60} rx={4} fill="#475569" /><circle cy={-44} r={13} fill="#475569" /><circle cy={-52} r={7} fill={c.panel} />
              </g>
            </g>
          );
        })()}
        {t >= m('teme') && t < m('usuario') && <Burbuja x={180} y={600} w={360} texto="¿Qué te preocupa?" u={sm(t, m('teme'), m('teme') + 1)} c={c} id={ID} tam={26} />}
        {t >= m('usuario') && (() => {
          const salto = Math.abs(Math.sin((t - m('usuario')) * 6)) * 22 * (1 - sm(t, m('valida'), m('valida') + 0.6));
          return (
            <g opacity={e1(t, m('usuario'))}>
              <Persona id={ID} x={lerp(60, 290, sm(t, m('usuario'), m('usuario') + 1))} y={SUELO - salto} s={0.8} cuerpo={ROSA} />
              <Txt x={290} y={834} textAnchor="middle" fontSize={24} fill={c.texto}>Usuario</Txt>
            </g>
          );
        })()}
        {t >= m('valida') && (
          <g opacity={e1(t, m('valida'))}>
            <Persona id={ID} x={420} y={SUELO} s={0.78} cuerpo={TEAL} />
            <Brujula x={420} y={520} r={36} ang={lerp(-60, 10, sm(t, m('valida'), m('valida') + 1))} id={ID} />
            <Visto x={600} y={390} r={24} op={e1(t, m('valida') + 0.8)} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
