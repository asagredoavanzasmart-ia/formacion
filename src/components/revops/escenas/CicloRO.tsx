import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Cruz, Visto, Rotulo, Persona, Txt, Monitor, Engranaje, Flujo, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Los tres elementos», en cuatro tomas.
 * 1 · Un ciclo que no termina: recolectar datos, comunicarlos a los líderes con un plan y alinear a los equipos;
 *     los equipos retroalimentan el siguiente giro. El motor operativo permanente.
 * 2 · Cada elemento de cerca: sin datos limpios todo es especulación; la brecha y la propuesta; métricas compartidas
 *     (si no, la fricción crece).
 * 3 · Brathwaite: seguir las conversiones hasta el ingreso y encontrar la brecha; preguntar al equipo o a un grupo focal.
 *     Powers: la señal aparece con el tiempo.
 * 4 · Cuando todo marcha: refrigerante al motor y a buscar la próxima oportunidad (un mercado nuevo, un segmento mayor).
 */

const ID = 'ro52';
const nombres = ['tres', 'recolectar', 'comunicar', 'alinear', 'retroalimentan', 'motor', 'rotacion', 'r1', 'especulacion', 'r2', 'brecha', 'r3', 'friccion', 'brathwaite', 'conversiones', 'hayBrecha', 'equipo', 'focal', 'powers', 'senal', 'cadena', 'cae', 'marcha', 'refrigerante', 'oportunidad', 'mercado', 'pregunta'] as const;
type N = typeof nombres[number];

const ELEM = [{ txt: 'Recolectar datos', col: AZUL_M }, { txt: 'Comunicar a líderes', col: VIOLETA }, { txt: 'Alinear equipos', col: NARANJA }];

export const CicloRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Un ciclo de tres elementos'], [m('motor'), 'El motor permanente'], [m('r1'), '1 · Recolectar datos'], [m('r2'), '2 · Comunicar y comprometer'], [m('r3'), '3 · Alinear equipos'],
    [m('brathwaite'), 'Encontrar la brecha'], [m('powers'), 'La señal llega con el tiempo'], [m('marcha'), 'Cuando todo marcha'],
  ];

  const P = (k: number, r = 220): [number, number] => { const a = -Math.PI / 2 + (k * 2 * Math.PI) / 3; return [600 + r * Math.cos(a), 470 + r * Math.sin(a)]; };
  const NN: N[] = ['recolectar', 'comunicar', 'alinear'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Los tres elementos">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · el ciclo */}
      <Toma t={t} a={-1} b={m('r1')} zi={1}>
        <circle cx={600} cy={470} r={220} fill="none" stroke={c.apagado} strokeWidth={14} strokeDasharray="22 16" strokeDashoffset={-t * (t >= m('motor') ? 80 : 30)} opacity={e1(t, m('tres'))} />
        {ELEM.map((el, k) => { const [x, y] = P(k); return t >= m(NN[k]) && (
          <g key={el.txt} opacity={e1(t, m(NN[k]))}>
            <circle cx={x} cy={y} r={70} fill={el.col} />
            <Txt x={x} y={y + 16} textAnchor="middle" fontSize={44} fill="#fff" peso={800}>{k + 1}</Txt>
            <Letrero x={x} y={y + (k === 0 ? -100 : 110)} texto={el.txt} fondo={el.col} id={ID} tam={22} />
          </g>
        ); })}
        {t >= m('retroalimentan') && (() => { const a = t * 1.4; return <circle cx={600 + 220 * Math.cos(a)} cy={470 + 220 * Math.sin(a)} r={14} fill="#fff" stroke={`url(#${ID}-marca)`} strokeWidth={6} />; })()}
        {t >= m('motor') && <g opacity={e1(t, m('motor'))}><Engranaje x={600} y={470} r={60} t={t * 3} color={PIZARRA} hueco={c.panel} /></g>}
      </Toma>

      {/* TOMA 2 · cada elemento */}
      <Toma t={t} a={m('r1')} b={m('brathwaite')}>
        {(() => { const el = t >= m('r3') ? 2 : t >= m('r2') ? 1 : 0; return (
          <g>
            {ELEM.map((e, k) => <g key={e.txt} opacity={k === el ? 1 : 0.35}><Letrero x={240 + k * 360} y={170} texto={`${k + 1} · ${e.txt}`} fondo={e.col} id={ID} tam={22} /></g>)}
            <Suelo y={700} isDark={isDark} />
            {el === 0 && <g opacity={e1(t, m('r1'))}>
              {[0, 1, 2].map((k) => <g key={k} transform={`translate(${300 + k * 300} 600) scale(0.5)`}><Monitor x={0} y={0} w={220} h={140}><rect x={20} y={20} width={180} height={18} rx={9} fill={AZUL_M} /></Monitor></g>)}
              <Flujo x1={300} y1={460} x2={600} y2={300} t={t} n={4} vel={0.6} arco={30} color={AZUL_M} r={8} /><Flujo x1={900} y1={460} x2={600} y2={300} t={t + 0.3} n={4} vel={0.6} arco={30} color={AZUL_M} r={8} />
              {[0, 1, 2].map((q) => <ellipse key={q} cx={600} cy={300 - q * 22} rx={80} ry={22} fill={AZUL_M} opacity={1 - q * 0.2} />)}
              {t >= m('especulacion') && <Letrero x={600} y={760} texto="Sin datos limpios, todo es especulación" fondo={PIZARRA} id={ID} op={e1(t, m('especulacion'))} tam={22} />}
            </g>}
            {el === 1 && <g opacity={e1(t, m('r2'))}>
              <Equipo id={ID} k="ops" x={300} y={700} s={0.8} t={t} nombre={false} />
              {[0, 1].map((k) => <Persona key={k} id={ID} x={820 + k * 140} y={700} s={0.8} cuerpo={PIZARRA} corbata />)}
              {t >= m('brecha') && <g opacity={e1(t, m('brecha'))}><rect x={430} y={300} width={300} height={190} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} /><rect x={470} y={430} width={50} height={40} rx={6} fill="#94a3b8" /><rect x={560} y={340} width={50} height={130} rx={6} fill={VERDE} /><path d="M 520 420 V 340" stroke={ROJO_M} strokeWidth={4} strokeDasharray="6 6" /><Txt f="a" x={640} y={400} fontSize={18} fill={ROJO_M}>brecha</Txt></g>}
              {t >= m('brecha') && <Letrero x={580} y={540} texto="La brecha y una propuesta concreta" fondo={VIOLETA} id={ID} tam={20} />}
            </g>}
            {el === 2 && <g opacity={e1(t, m('r3'))}>
              {(['mkt', 'ven', 'ser'] as const).map((k, j) => <Equipo key={k} id={ID} k={k} x={300 + j * 300} y={700} s={0.7} t={t} nombre={false} />)}
              <rect x={420} y={330} width={360} height={80} rx={18} fill={NARANJA} /><Txt f="a" x={600} y={380} textAnchor="middle" fontSize={24} fill="#fff" peso={700}>Métricas compartidas</Txt>
              {[300, 600, 900].map((x) => <path key={x} d={`M ${x} 550 L 600 410`} stroke={NARANJA} strokeWidth={4} strokeDasharray="8 8" />)}
              {t >= m('friccion') && <Letrero x={600} y={250} texto="Si no, crece la fricción entre equipos" fondo={ROJO_M} id={ID} op={e1(t, m('friccion'))} tam={20} />}
            </g>}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 3 · encontrar la brecha */}
      <Toma t={t} a={m('brathwaite')} b={m('marcha')}>
        {(() => {
          const etapas = [100, 60, 42, 12, 10];
          const foco = t >= m('hayBrecha') || t >= m('cae');
          return (
            <g>
              {t >= m('conversiones') && etapas.map((v, k) => <g key={k} opacity={e1(t, m('conversiones') + k * 0.3)}>
                <rect x={160 + k * 190} y={600 - v * 3.4} width={130} height={v * 3.4} rx={12} fill={foco && k === 3 ? ROJO_M : `url(#${ID}-marca)`} opacity={foco && k !== 3 ? 0.5 : 1} />
                {k < 4 && <Txt f="a" x={320 + k * 190} y={420} textAnchor="middle" fontSize={20} fill={foco && k === 2 ? ROJO_M : c.tenue} peso={700}>{Math.round((etapas[k + 1] / v) * 100)} %</Txt>}
              </g>)}
              {t >= m('conversiones') && <Txt f="a" x={1020} y={640} textAnchor="end" fontSize={20} fill={c.tenue}>… hasta el ingreso</Txt>}
              {foco && <Letrero x={700} y={160} texto="Ahí está la brecha" fondo={ROJO_M} id={ID} tam={22} />}
              {t >= m('equipo') && <g opacity={e1(t, m('equipo'))}>{[0, 1, 2].map((k) => <Persona key={k} id={ID} x={300 + k * 90} y={790} s={0.35} cuerpo={NARANJA} />)}<Txt f="a" x={300} y={700} fontSize={20} fill={c.texto}>«Sabemos qué falla»</Txt></g>}
              {t >= m('focal') && <g opacity={e1(t, m('focal'))}>{[0, 1, 2].map((k) => <Persona key={k} id={ID} x={760 + k * 90} y={790} s={0.35} cuerpo={AZUL_M} />)}<Txt f="a" x={760} y={700} fontSize={20} fill={c.texto}>Grupo focal</Txt></g>}
              {t >= m('senal') && <Letrero x={600} y={230} texto="Menor costo, más conversión, más valor" fondo={VERDE} id={ID} op={e1(t, m('senal'))} tam={20} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 4 · cuando todo marcha */}
      <Toma t={t} a={m('marcha')} b={fin + 1}>
        <Engranaje x={360} y={470} r={110} t={t * 2} color={NARANJA} hueco={c.panel} />
        {t >= m('refrigerante') && <g opacity={e1(t, m('refrigerante'))}>
          <rect x={540} y={260} width={70} height={110} rx={14} fill={AZUL_M} /><rect x={560} y={240} width={30} height={24} rx={6} fill={AZUL_M} />
          {[0, 1, 2].map((k) => { const ph = (t * 0.8 + k / 3) % 1; return <path key={k} d={`M ${520 - ph * 60} ${370 + ph * 60} q -6 10 0 14 q 6 -4 0 -14 Z`} fill="#7dd3fc" opacity={1 - ph} />; })}
          <Letrero x={360} y={660} texto="Refrigerante al motor y seguir" fondo={AZUL_M} id={ID} tam={22} />
        </g>}
        {t >= m('oportunidad') && <g opacity={e1(t, m('oportunidad'))}>
          <path d="M 700 600 C 800 500 880 420 1000 320" stroke={VERDE} strokeWidth={8} fill="none" strokeDasharray="14 12" />
          <rect x={1000} y={220} width={8} height={110} fill={PIZARRA} /><path d="M 1008 220 h 70 l -14 20 l 14 20 h -70 Z" fill={VERDE} />
          {t >= m('mercado') && <Letrero x={880} y={680} texto="Un mercado nuevo, un segmento mayor" fondo={VERDE} id={ID} tam={20} />}
        </g>}
      </Toma>
    </Lienzo>
  );
};
