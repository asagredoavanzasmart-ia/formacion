import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Curva, Telefono, Flujo, Visto, Suelo, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Actualizaciones y junta directiva.
 * 1 · La hoja mensual se arma por partes (párrafo fijo, novedad, petición, dos o tres gráficos que suben) y vuela a muchos
 *     inversionistas; la línea recta se proyecta y ahora ellos te buscan.
 * 2 · La mesa de la junta: llamadas una a una antes de la reunión (sin sorpresas); tres opciones con la del medio destacada;
 *     ante el desacuerdo, «¿qué sugieren?».
 */

const ID = 'ep15', P = 'ep-junta';

export const JuntaEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('continuo'), 'Un trabajo continuo'], [m('mensual'), 'Una hoja al mes'], [m('rectas'), 'La gente proyecta líneas rectas'],
    [m('reglas'), 'Tres reglas de la junta'], [m('sorpresas'), 'Sin sorpresas'], [m('ricitos'), 'Ricitos de Oro'], [m('sugieren'), '¿Qué sugieren?'],
  ];
  const vuela = sm(t, m('rectas') - 0.6, m('busquen'));
  const MIEMBROS: [number, number][] = [[320, 520], [480, 470], [720, 470], [880, 520]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Actualizaciones y junta directiva">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la hoja mensual */}
      <Toma t={t} a={0} b={m('reglas')} cy={470}>
        <g transform={`translate(${lerp(420, 420, vuela)} 450)`} opacity={e1(t, m('hoja'))}>
          <rect x={-180} y={-280} width={360} height={500} rx={18} fill="#fff" style={{ filter: 'drop-shadow(0 6px 14px rgba(15,23,42,0.3))' }} />
          {t >= m('parrafo') && <g opacity={e1(t, m('parrafo'))}>{[0, 1].map((k) => <rect key={k} x={-150} y={-250 + k * 22} width={k ? 200 : 300} height={10} rx={5} fill={GRIS} />)}</g>}
          {t >= m('novedad') && <g opacity={e1(t, m('novedad'))}>{[0, 1].map((k) => <rect key={k} x={-150} y={-190 + k * 22} width={k ? 240 : 300} height={10} rx={5} fill={NARANJA} />)}</g>}
          {t >= m('peticion') && <g opacity={e1(t, m('peticion'))}><rect x={-150} y={-130} width={300} height={34} rx={10} fill={AZUL_M} opacity={0.25} /><Txt f="a" x={-136} y={-106} fontSize={20} fill={AZUL_M}>¿Un candidato?</Txt></g>}
          {t >= m('graficos') && [0, 1].map((k) => (
            <g key={k} transform={`translate(${-150 + k * 160} -70)`} opacity={e1(t, m('graficos') + 0.3 * k)}>
              <rect width={140} height={130} rx={10} fill={c.panel2} />
              {[0, 1, 2, 3].map((b) => <rect key={b} x={14 + b * 30} y={120 - (20 + b * 24) * sm(t, m('graficos') + 0.3 * k, m('graficos') + 1.2 + 0.3 * k)} width={20} height={(20 + b * 24) * sm(t, m('graficos') + 0.3 * k, m('graficos') + 1.2 + 0.3 * k)} rx={4} fill={k ? ROSA : VERDE} />)}
            </g>
          ))}
        </g>
        {t >= m('mensual') && <Letrero x={420} y={760} texto="Mensual o bimestral" id={ID} op={e1(t, m('mensual'))} tam={26} />}
        {t >= m('rectas') && <g opacity={e1(t, m('rectas'))}>
          {[0, 1, 2, 3].map((k) => <Persona key={k} id={ID} x={820 + (k % 2) * 160} y={340 + Math.floor(k / 2) * 240} s={0.42} cuerpo={[AZUL_M, VIOLETA, AMBAR, VERDE][k]} />)}
          <Flujo x1={600} y1={420} x2={880} y2={300} t={t} n={4} vel={0.8} arco={40} color={NARANJA} op={1 - sm(t, m('busquen'), m('busquen') + 1)} />
          {t >= m('busquen') && <Flujo x1={880} y1={300} x2={600} y2={420} t={t} n={4} vel={0.8} arco={40} color={VERDE} op={e1(t, m('busquen'))} />}
        </g>}
        {t >= m('busquen') && <Letrero x={900} y={760} texto="Ahora te buscan" fondo={VERDE} id={ID} op={e1(t, m('busquen'))} />}
      </Toma>

      {/* 2 · la junta */}
      <Toma t={t} a={m('reglas')} b={fin + 1} cy={470}>
        {MIEMBROS.map(([x, y], k) => <Persona key={k} id={ID} x={x} y={y} s={0.55} cuerpo={[AZUL_M, VIOLETA, AMBAR, VERDE][k]} />)}
        <path d="M 200 560 H 1000 L 960 640 H 240 Z" fill="#7c4a1e" /><rect x={240} y={640} width={720} height={14} fill="#5b3716" />
        {t >= m('sorpresas') && t < m('ricitos') && MIEMBROS.map(([x, y], k) => {
          const t0 = m('sorpresas') + 0.5 * k;
          return t >= t0 && <g key={k} opacity={e1(t, t0)}><Telefono x={x + 40} y={y - 160} s={0.24} widgets={0} /><Visto x={x - 40} y={y - 170} r={18} /></g>;
        })}
        {t >= m('sorpresas') && t < m('ricitos') && <Letrero x={600} y={760} texto="Prepara a cada miembro antes" id={ID} op={e1(t, m('sorpresas'))} tam={26} />}
        {t >= m('ricitos') && t < m('sugieren') && ['Muy agresiva', 'La que quieres', 'Muy conservadora'].map((o, k) => (
          <g key={o} opacity={e1(t, m('ricitos') + 0.4 * k)} transform={`translate(${300 + k * 300} ${180 + (k === 1 ? -10 : 0)})`}>
            <rect x={-130} y={-50} width={260} height={100} rx={20} fill={k === 1 ? NARANJA : c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} transform={k === 1 && t >= m('medio') ? `scale(${1.08 + 0.03 * Math.sin(t * 4)})` : undefined} />
            <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={26} fill={k === 1 ? '#fff' : c.texto}>{o}</Txt>
          </g>
        ))}
        {t >= m('sugieren') && <Burbuja x={360} y={150} w={480} texto="¿Qué sugieren?" u={sm(t, m('sugieren'), m('sugieren') + 1)} c={c} id={ID} marca />}
        {t >= m('precision') && <Letrero x={600} y={760} texto="Hechos como hechos, esperanzas como esperanzas" fondo={GRIS} id={ID} op={e1(t, m('precision'))} tam={24} />}
      </Toma>
    </Lienzo>
  );
};
