import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Busto, Visto, e1, sm, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Herramienta ICP: el constructor de segmentos como una ficha que se llena en tres pasos.
 * 1 · Perfil de la cuenta (los campos se completan), análisis de dolor (las barras del dolor y la lupa sobre el nicho crítico,
 *     diez veces más efectiva) y buyer personas (objetivos en verde, miedos en rojo).
 * 2 · El modelo ICE: tres segmentos acumulan impacto, confianza y facilidad; gana el de más puntos y los demás esperan.
 */

const ID = 'vc14', P = 'vc-icp-tool';

export const IcpToolVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('constructor'), 'Constructor de segmentos'], [m('cuenta'), 'Perfil de la cuenta'], [m('dolor'), 'Análisis de dolor'], [m('personas'), 'Buyer personas'],
    [m('ice'), 'Modelo ICE'], [m('priorizar'), 'Obliga a priorizar'],
  ];
  const paso = t >= m('personas') ? 2 : t >= m('dolor') ? 1 : 0;
  const CAMPOS = ['Segmento', 'Industria', 'Tamaño', 'Geografía'];
  const ICE: [string, string][] = [['impacto', AZUL_M], ['confianza', VERDE], ['facilidad', AMBAR]];
  const ALT = [[120, 70, 60], [150, 130, 110], [80, 90, 140]];
  const prio = sm(t, m('priorizar'), m('priorizar') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Herramienta ICP">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la ficha */}
      <Toma t={t} a={0} b={m('ice')} cy={470}>
        <g opacity={e1(t, m('constructor'))}>
          <rect x={150} y={130} width={900} height={660} rx={30} fill={c.panel} style={{ filter: `drop-shadow(0 8px 20px rgba(0,0,0,${c.sombra}))` }} />
          {['Cuenta', 'Dolor', 'Personas'].map((s, k) => (
            <g key={s} opacity={t >= m(['cuenta', 'dolor', 'personas'][k]) ? 1 : 0.35}>
              <rect x={190 + k * 280} y={160} width={260} height={64} rx={32} fill={paso === k && t >= m('cuenta') ? `url(#${ID}-marcaH)` : c.panel2} />
              <Txt x={320 + k * 280} y={202} textAnchor="middle" fontSize={28} fill={paso === k && t >= m('cuenta') ? '#fff' : c.texto}>{`${k + 1} · ${s}`}</Txt>
            </g>
          ))}
        </g>
        {paso === 0 && CAMPOS.map((s, k) => t >= m('cuenta') + 0.9 * k && (
          <g key={s} opacity={e1(t, m('cuenta') + 0.9 * k)}>
            <Txt x={200} y={320 + k * 110} fontSize={30} fill={c.texto}>{s}</Txt>
            <rect x={480} y={290 + k * 110} width={520} height={44} rx={12} fill={c.panel2} />
            <rect x={490} y={300 + k * 110} width={(200 + 60 * k) * sm(t, m('cuenta') + 0.9 * k, m('cuenta') + 0.9 * k + 1)} height={24} rx={8} fill={AZUL_M} opacity={0.7} />
          </g>
        ))}
        {paso === 1 && (
          <g>
            {['Problema central', 'Dolores', 'Prerrequisitos', 'Resultados'].map((s, k) => t >= m('dolor') + 1.2 * k && (
              <g key={s} opacity={e1(t, m('dolor') + 1.2 * k)}>
                <rect x={200} y={280 + k * 100} width={(movil ? 300 : 360) * sm(t, m('dolor') + 1.2 * k, m('dolor') + 1.2 * k + 1)} height={44} rx={22} fill={k === 3 ? VERDE : ROSA} opacity={0.85} />
                {!movil && <Txt x={220} y={311 + k * 100} fontSize={22} fill="#fff">{s}</Txt>}
              </g>
            ))}
            {t >= m('nicho') && (
              <g opacity={e1(t, m('nicho'))}>
                {Array.from({ length: 18 }, (_, k) => <circle key={k} cx={680 + (k % 6) * 50} cy={330 + Math.floor(k / 6) * 60} r={12} fill={k === 8 || k === 9 ? NARANJA : GRIS} opacity={k === 8 || k === 9 ? 1 : 0.5} />)}
                <circle cx={855} cy={390} r={70} fill="none" stroke={NARANJA} strokeWidth={10} />
                <rect x={900} y={440} width={20} height={80} rx={10} fill={NARANJA} transform="rotate(-45 910 480)" />
              </g>
            )}
            {t >= m('diez') && <Letrero x={830} y={640} texto="10 veces más efectiva" id={ID} op={e1(t, m('diez'))} tam={28} />}
          </g>
        )}
        {paso === 2 && [0, 1, 2].map((k) => (
          <g key={k} opacity={e1(t, m('personas') + 0.5 * k)} transform={`translate(${330 + k * 270} 0)`}>
            <rect x={-115} y={270} width={230} height={430} rx={22} fill={c.panel2} />
            <circle cx={0} cy={350} r={50} fill={[AZUL_M, VIOLETA, VERDE][k]} /><Busto x={0} y={356} s={1.4} color="#fff" />
            <rect x={-80} y={440} width={160} height={16} rx={8} fill={c.apagado} />
            <rect x={-80} y={500} width={160 * sm(t, m('personas') + 1 + 0.4 * k, m('personas') + 2 + 0.4 * k)} height={22} rx={11} fill={VERDE} />
            {t >= m('miedos') && <rect x={-80} y={560} width={130 * sm(t, m('miedos') + 0.4 * k, m('miedos') + 1 + 0.4 * k)} height={22} rx={11} fill={ROSA} />}
            {!movil && k === 0 && <><Txt x={-80} y={492} fontSize={20} fill={c.tenue}>Objetivos</Txt>{t >= m('miedos') && <Txt x={-80} y={552} fontSize={20} fill={c.tenue}>Miedos</Txt>}</>}
          </g>
        ))}
      </Toma>

      {/* 2 · modelo ICE */}
      <Toma t={t} a={m('ice')} b={fin + 1} cy={470}>
        {ICE.map(([a, col], k) => t >= m(a) && (
          <g key={a} opacity={e1(t, m(a))}>
            <rect x={200 + k * 290} y={150} width={36} height={36} rx={8} fill={col} />
            <Txt x={250 + k * 290} y={178} fontSize={28} fill={c.texto}>{['Impacto', 'Confianza', 'Facilidad'][k]}</Txt>
          </g>
        ))}
        {[0, 1, 2].map((s) => {
          const x = 330 + s * 270;
          let base = 720;
          const gana = s === 1 && t >= m('puntos');
          return (
            <g key={s} opacity={e1(t, m('ice') + 0.3 * s) * (s === 1 ? 1 : 1 - 0.6 * prio)}>
              <rect x={x - 80} y={730} width={160} height={10} rx={5} fill={c.apagado} />
              {ICE.map(([a, col], k) => {
                const h = ALT[s][k] * sm(t, m(a) + 0.2 * s, m(a) + 0.2 * s + 1);
                base -= h;
                return h > 0.5 && <rect key={a} x={x - 70} y={base} width={140} height={h} rx={10} fill={col} />;
              })}
              <Txt x={x} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>{`Segmento ${'ABC'[s]}`}</Txt>
              {gana && <g opacity={e1(t, m('puntos'))}><Visto x={x} y={base - 50} r={30} /></g>}
            </g>
          );
        })}
      </Toma>
    </Lienzo>
  );
};
