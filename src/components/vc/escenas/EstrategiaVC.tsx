import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Calendario, Hoja, Cruz, Hilo, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Estrategia frente a táctica: un iceberg.
 * 1 · Arriba del agua, la táctica (presentaciones, objeciones, cierres): la parte visible, de resultado inmediato.
 *     Bajo el agua crece la estrategia: antes de la reunión, el plan global, el mapa de influencias. Sin ella, se improvisa.
 * 2 · El partido: la táctica es la jugada en la cancha; la estrategia, la pizarra que decide quién sale a jugar.
 */

const ID = 'vc04', P = 'vc-estrategia';

export const EstrategiaVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('plan'), 'Antes del plan táctico'], [m('tactica'), 'Táctica: el qué'], [m('estrategia'), 'Estrategia: el cómo'],
    [m('improvisar'), 'No se improvisa'], [m('partido'), 'Un partido'], [m('decide'), 'La estrategia decide'],
  ];
  const AG = 420;
  const crece = sm(t, m('estrategia'), m('estrategia') + 1.5);
  const ola = (x: number) => AG + 6 * Math.sin(x / 60 + t * 2);
  const agua = `M 60 ${ola(60)} ${Array.from({ length: 22 }, (_, k) => `L ${60 + k * 51} ${ola(60 + k * 51)}`).join(' ')} L 1140 820 L 60 820 Z`;
  const TAC: [string, string][] = [['presentaciones', 'Presentaciones'], ['objeciones', 'Objeciones'], ['objeciones', 'Cierres']];
  const tT = (k: number) => (k === 2 ? m('objeciones') + 1.3 : m(TAC[k][0]));
  // Cancha
  const JUG: [number, number][] = [[380, 360], [520, 520], [700, 330], [820, 560]];
  const balon = t - m('cancha');
  const tramoB = Math.max(0, Math.floor(balon / 1.2)) % JUG.length;
  const uB = sm((balon % 1.2) / 1.2, 0, 1);
  const pa = JUG[tramoB], pb = JUG[(tramoB + 1) % JUG.length];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Estrategia frente a táctica">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el iceberg */}
      <Toma t={t} a={0} b={m('partido')} cy={470}>
        <path d={`M 440 ${AG} L 520 250 L 600 200 L 700 260 L 760 ${AG} Z`} fill={isDark ? '#e2e8f0' : '#f8fafc'} opacity={e1(t, m('plan'))} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
        <path d={`M 600 200 L 700 260 L 760 ${AG} L 620 ${AG} Z`} fill="#000" opacity={0.06 * e1(t, m('plan'))} />
        <path d={agua} fill={isDark ? 'rgba(37,99,235,0.35)' : 'rgba(96,165,250,0.35)'} opacity={e1(t, m('plan'))} />
        <g opacity={e1(t, m('plan')) * (0.45 + 0.55 * crece)} transform={`translate(600 ${AG}) scale(${0.55 + 0.45 * crece}) translate(-600 ${-AG})`}>
          <path d={`M 440 ${AG + 4} L 300 560 L 340 720 L 600 800 L 880 720 L 920 560 L 760 ${AG + 4} Z`} fill={isDark ? '#93c5fd' : '#bfdbfe'} opacity={0.85} />
        </g>
        {TAC.map(([, n], k) => t >= tT(k) && <Letrero key={n} x={[300, 600, 900][k]} y={[300, 140, 300][k]} texto={n} fondo={AZUL_M} id={ID} op={e1(t, tT(k))} tam={24} />)}
        {t >= m('visible') && t < m('estrategia') && <Letrero x={1000} y={400} texto={t >= m('inmediato') ? 'Resultado inmediato' : 'La parte visible'} fondo={GRIS} id={ID} op={e1(t, t >= m('inmediato') ? m('inmediato') : m('visible'))} tam={24} />}
        {t >= m('estrategia') && <Letrero x={600} y={470} texto="Estrategia" id={ID} op={e1(t, m('estrategia'))} tam={30} />}
        {t >= m('antes') && <g opacity={e1(t, m('antes'))}><Calendario x={420} y={600} s={0.55} marcados={Math.min(5, Math.floor((t - m('antes')) * 2))} /></g>}
        {t >= m('global') && <g opacity={e1(t, m('global'))}><Hoja x={600} y={650} w={90} h={110} lineas={4} color={VIOLETA} /></g>}
        {t >= m('influencias') && (
          <g opacity={e1(t, m('influencias'))}>
            {[[740, 560], [820, 640], [740, 700]].map(([x, y], k, a) => <React.Fragment key={k}>{k > 0 && <Hilo x1={a[0][0]} y1={a[0][1]} x2={x} y2={y} u={sm(t, m('influencias') + 0.3 * k, m('influencias') + 0.3 * k + 0.8)} id={ID} grosor={4} />}<circle cx={x} cy={y} r={20} fill={[NARANJA, AMBAR, VERDE][k]} /></React.Fragment>)}
          </g>
        )}
        {t >= m('improvisar') && <g opacity={e1(t, m('improvisar'))}>
          <Persona id={ID} x={1020} y={800} s={0.5} cuerpo={GRIS} />
          <Cruz x={1020} y={640} r={26} op={e1(t, m('encanto'))} />
          <Letrero x={movil ? 600 : 220} y={movil ? 820 : 780} texto={t >= m('encanto') ? 'El encanto se gasta mal' : 'Sin tarea, se improvisa'} fondo={ROSA} id={ID} op={e1(t, t >= m('encanto') ? m('encanto') : m('improvisar'))} tam={24} />
        </g>}
      </Toma>

      {/* 2 · el partido */}
      <Toma t={t} a={m('partido')} b={fin + 1} cy={470}>
        <rect x={250} y={200} width={700} height={460} rx={24} fill="#16a34a" opacity={isDark ? 0.75 : 0.9} />
        <rect x={270} y={220} width={660} height={420} rx={12} fill="none" stroke="#fff" strokeWidth={4} opacity={0.7} />
        <line x1={600} y1={220} x2={600} y2={640} stroke="#fff" strokeWidth={4} opacity={0.7} /><circle cx={600} cy={430} r={60} fill="none" stroke="#fff" strokeWidth={4} opacity={0.7} />
        {JUG.map(([x, y], k) => <circle key={k} cx={x} cy={y} r={20} fill={[NARANJA, ROSA, AMBAR, AZUL_M][k]} opacity={e1(t, m('partido') + 0.2 * k)} />)}
        {t >= m('cancha') && <circle cx={lerp(pa[0], pb[0], uB) + 22} cy={lerp(pa[1], pb[1], uB) - 22} r={12} fill="#fff" />}
        {t >= m('cancha') && <Letrero x={600} y={160} texto="Táctica: la jugada" fondo={AZUL_M} id={ID} op={e1(t, m('cancha'))} tam={24} />}
        {t >= m('decide') && (
          <g opacity={e1(t, m('decide'))} transform="translate(1050 430)">
            <rect x={-90} y={-130} width={180} height={230} rx={16} fill={isDark ? '#1f2937' : '#334155'} />
            {[0, 1, 2, 3].map((k) => <circle key={k} cx={-40 + (k % 2) * 80} cy={-70 + Math.floor(k / 2) * 90} r={16} fill={[NARANJA, ROSA, AMBAR, AZUL_M][k]} />)}
            <path d={`M -40 -70 Q 0 ${-20 + 10 * Math.sin(t * 2)} 40 20`} stroke="#fff" strokeWidth={4} fill="none" strokeDasharray="8 8" />
          </g>
        )}
        {t >= m('decide') && <Letrero x={600} y={760} texto="Estrategia: quién sale a jugar" id={ID} op={e1(t, m('decide'))} tam={26} />}
      </Toma>
    </Lienzo>
  );
};
