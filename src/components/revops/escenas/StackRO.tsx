import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Monitor, Reloj, Burbuja, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Administrar el stack tecnológico», en cinco tomas.
 * 1 · Se hereda un stack desordenado: cada departamento compró lo suyo; la meta es que cada herramienta tenga una razón.
 * 2 · El mapa de flujo de valor: hoy el cliente pasa por siete sistemas y el dato se destiñe en cada traspaso;
 *     integrado, tres sistemas y un recorrido corto.
 * 3 · Mcleish: mostrar el recorrido cambia la conversación (no «voy a sacar cuatro sistemas»); sacar uno también es un
 *     cambio que pide acompañamiento y revisar qué datos se dejarían de capturar.
 * 4 · RevOps no es TI: TI hace que funcione; RevOps pregunta por qué.
 * 5 · Cuatro preguntas antes de aprobar una herramienta nueva.
 */

const ID = 'ro35';
const nombres = ['heredar', 'compro', 'voz', 'razon', 'mapa', 'camino', 'hoy', 'siete', 'tarde', 'integrado', 'corto', 'mcleish', 'sinBeneficio', 'sacar', 'favorita', 'cambio', 'resistirse', 'capturar', 'noTi', 'porque', 'eficiencia', 'crece', 'cuatro', 'q1', 'q2', 'tarjeta', 'chat', 'q3', 'espagueti', 'q4', 'mano', 'pregunta'] as const;
type N = typeof nombres[number];

export const StackRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Administrar el stack'], [m('compro'), 'Cada uno compró lo suyo'], [m('razon'), 'Cada herramienta, una razón'],
    [m('mapa'), 'El mapa de flujo de valor'], [m('integrado'), 'Integrado: 3 sistemas'], [m('mcleish'), 'Mostrar el recorrido'], [m('cambio'), 'Sacar también es cambiar'],
    [m('noTi'), 'RevOps no es TI'], [m('cuatro'), 'Cuatro preguntas'],
  ];

  const APPS = [VIOLETA, VERDE, AZUL_M, ROSA, AMBAR, TEAL, NARANJA, PIZARRA, '#a855f7'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Administrar el stack tecnológico">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · un stack heredado */}
      <Toma t={t} a={-1} b={m('mapa')} zi={1}>
        {(() => { const orden = sm(t, m('razon'), m('razon') + 2); return (
          <g>
            {APPS.map((col, k) => {
              const xs = 300 + ((k * 137) % 600), ys = 260 + ((k * 89) % 300);
              const xo = 270 + (k % 3) * 330, yo = 260 + Math.floor(k / 3) * 150;
              const x = lerp(xs, xo, orden), y = lerp(ys, yo, orden);
              return <g key={k} opacity={e1(t, m('heredar') + k * 0.15)} transform={`translate(${x} ${y + (1 - orden) * 6 * Math.sin(t * 2 + k)}) rotate(${(1 - orden) * ((k % 5) - 2) * 8})`}>
                <rect x={-50} y={-40} width={100} height={80} rx={18} fill={col} style={sombra(0.2, 2, 6)} />
                <rect x={-20} y={-16} width={40} height={32} rx={8} fill="#fff" opacity={0.85} />
                {orden > 0.6 && <Txt f="a" x={70} y={8} fontSize={20} fill={c.tenue} opacity={sm(orden, 0.6, 1)}>{['CRM', 'Correo', 'Chat', 'Encuestas', 'Facturación', 'Soporte', 'Anuncios', 'BI', 'Firma'][k]}</Txt>}
              </g>;
            })}
            {t >= m('compro') && orden < 0.5 && <Letrero x={600} y={720} texto="Cada área compró sin mirar al resto" fondo={PIZARRA} id={ID} op={e1(t, m('compro')) * (1 - orden * 2)} tam={22} />}
            {t >= m('voz') && <g opacity={e1(t, m('voz'))}><Equipo id={ID} k="ops" x={1080} y={760} s={0.45} t={t} nombre={false} /></g>}
            {orden > 0.5 && <Letrero x={600} y={760} texto="Cada herramienta con una razón" id={ID} op={sm(orden, 0.5, 1)} />}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 2 · el mapa de flujo de valor */}
      <Toma t={t} a={m('mapa')} b={m('mcleish')}>
        {(() => {
          const integ = sm(t, m('integrado'), m('integrado') + 1.2);
          const n = integ > 0.5 ? 3 : 7;
          const xs = Array.from({ length: n }, (_, k) => 140 + (k * 920) / (n - 1));
          const ph = ((t - m('camino')) * (integ > 0.5 ? 0.35 : 0.2)) % 1;
          const seg = Math.min(n - 1.001, ph * (n - 1)), k0 = Math.floor(seg);
          const px = lerp(xs[k0], xs[k0 + 1], seg - k0);
          const destiñe = integ > 0.5 ? 0 : t >= m('siete') ? ph : 0;
          return (
            <g>
              {xs.map((x, k) => <g key={`${n}-${k}`} opacity={e1(t, (integ > 0.5 ? m('integrado') : m('hoy')) + k * 0.12)}>
                <rect x={x - 54} y={360} width={108} height={90} rx={16} fill={integ > 0.5 ? [AZUL_M, VERDE, NARANJA][k] : APPS[k]} />
                <rect x={x - 22} y={386} width={44} height={36} rx={8} fill="#fff" opacity={0.85} />
                {k < n - 1 && <rect x={x + 54} y={402} width={xs[k + 1] - x - 108} height={6} rx={3} fill={c.apagado} />}
              </g>)}
              {t >= m('camino') && <g><circle cx={px} cy={320} r={18} fill={NARANJA} opacity={1 - 0.75 * destiñe} /><circle cx={px} cy={320} r={18} fill="#94a3b8" opacity={0.75 * destiñe} /></g>}
              {t >= m('camino') && <Letrero x={600} y={200} texto={integ > 0.5 ? 'Integrado: 3 sistemas' : 'Hoy: 7 sistemas'} fondo={integ > 0.5 ? VERDE : PIZARRA} id={ID} op={e1(t, m('camino'))} />}
              {t >= m('siete') && integ < 0.5 && <Letrero x={600} y={560} texto="Siete traspasos: el dato se aleja" fondo={ROJO_M} id={ID} op={e1(t, m('siete'))} tam={22} />}
              {t >= m('corto') && <Letrero x={600} y={560} texto="Recorrido corto, datos que no se pierden" fondo={VERDE} id={ID} op={e1(t, m('corto'))} tam={22} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 3 · mostrar el recorrido; sacar también es cambio */}
      <Toma t={t} a={m('mcleish')} b={m('noTi')}>
        <Suelo y={700} isDark={isDark} />
        <Equipo id={ID} k="ops" x={240} y={700} s={0.75} t={t} nombre={false} />
        {t < m('cambio') && <g opacity={1 - ac(t, m('cambio') - 0.4, m('cambio'))}>
          {t >= m('sinBeneficio') && <Burbuja x={320} y={200} w={480} texto="«Movemos al cliente por siete sistemas sin beneficio»" u={sm(t, m('sinBeneficio'), m('sinBeneficio') + 1.5)} c={c} id={ID} tam={24} />}
          {t >= m('sacar') && <g opacity={e1(t, m('sacar'))}><Txt f="a" x={700} y={470} fontSize={24} fill={c.tenue} textDecoration="line-through">«Voy a sacar cuatro sistemas»</Txt></g>}
          {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={800 + k * 110} y={700} s={0.55} cuerpo={[AMBAR, NARANJA, TEAL][k]} />)}
          {t >= m('favorita') && <Letrero x={910} y={560} texto="Ya no se discute la herramienta favorita" fondo={VERDE} id={ID} op={e1(t, m('favorita'))} tam={20} />}
        </g>}
        {t >= m('cambio') && <g opacity={e1(t, m('cambio'))}>
          <g transform="translate(860 520)"><Monitor x={0} y={0} w={200} h={120} /></g>
          {[0, 1].map((k) => <Persona key={k} id={ID} x={760 + k * 200} y={700} s={0.55} cuerpo={[AMBAR, TEAL][k]} />)}
          {t >= m('resistirse') && <Letrero x={860} y={180} texto="El equipo se resiste: acompañar" fondo={AMBAR} id={ID} op={e1(t, m('resistirse'))} tam={22} />}
          {t >= m('capturar') && <Letrero x={860} y={250} texto="¿Qué datos dejarían de capturarse?" fondo={PIZARRA} id={ID} op={e1(t, m('capturar'))} tam={22} />}
        </g>}
      </Toma>

      {/* TOMA 4 · RevOps no es TI */}
      <Toma t={t} a={m('noTi')} b={m('cuatro')}>
        <rect x={598} y={170} width={4} height={600} rx={2} fill={c.apagado} />
        <g opacity={e1(t, m('noTi'))}>
          <Persona id={ID} x={300} y={640} s={0.75} cuerpo={AZUL_M} />
          <g transform="translate(300 360)"><rect x={-24} y={-70} width={48} height={110} rx={12} fill={PIZARRA} transform="rotate(35)" /><circle cx={34} cy={-46} r={32} fill={PIZARRA} /><circle cx={34} cy={-46} r={14} fill={c.panel} /></g>
          <Letrero x={300} y={710} texto="TI: que funcione" fondo={AZUL_M} id={ID} />
        </g>
        {t >= m('porque') && <g opacity={e1(t, m('porque'))}>
          <Equipo id={ID} k="ops" x={900} y={640} s={0.75} t={t} nombre={false} />
          <Txt x={900} y={360} textAnchor="middle" fontSize={84} fill={NARANJA} peso={800}>¿por qué?</Txt>
          <Letrero x={900} y={710} texto="RevOps: para qué existe" id={ID} />
        </g>}
        {t >= m('eficiencia') && <Letrero x={900} y={200} texto="Eficiencia, transparencia, uso responsable" fondo={VIOLETA} id={ID} op={e1(t, m('eficiencia'))} tam={20} />}
        {t >= m('crece') && <Letrero x={600} y={800} texto="Sin el porqué, crece sin control" fondo={ROJO_M} id={ID} op={e1(t, m('crece'))} tam={22} />}
      </Toma>

      {/* TOMA 5 · cuatro preguntas */}
      <Toma t={t} a={m('cuatro')} b={fin + 1}>
        {(() => {
          const Q: { n: N; txt: string; col: string }[] = [
            { n: 'q1', txt: '¿Ya lo hace lo que hay?', col: AZUL_M }, { n: 'q2', txt: '¿Quién la aprueba?', col: VIOLETA },
            { n: 'q3', txt: '¿Profundidad o complejidad?', col: NARANJA }, { n: 'q4', txt: '¿Vale la pena automatizar?', col: VERDE },
          ];
          const act = Q.reduce((a, q, k) => (t >= m(q.n) ? k : a), -1);
          return (
            <g>
              {Q.map((q, k) => t >= m(q.n) && (
                <g key={q.n} opacity={e1(t, m(q.n)) * (k === act ? 1 : 0.45)}>
                  <rect x={90} y={180 + k * 120} width={470} height={96} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                  <circle cx={140} cy={228 + k * 120} r={28} fill={q.col} /><Txt x={140} y={239 + k * 120} textAnchor="middle" fontSize={28} fill="#fff" peso={800}>{k + 1}</Txt>
                  <Txt f="a" x={185} y={236 + k * 120} fontSize={24} fill={c.texto}>{q.txt}</Txt>
                </g>
              ))}
              {act === 0 && <g><g transform="translate(850 560)"><Monitor x={0} y={0} w={260} h={160}><rect x={20} y={20} width={220} height={20} rx={10} fill={AZUL_M} />{[0, 1, 2].map((j) => <rect key={j} x={20} y={56 + j * 26} width={160} height={14} rx={7} fill="#94a3b8" />)}</Monitor></g><Letrero x={850} y={620} texto="Si el CRM ya lo hace, cuesta negociar" fondo={AZUL_M} id={ID} tam={20} /></g>}
              {act === 1 && <g>{['Operaciones', 'Finanzas', 'TI'].map((txt, j) => <Letrero key={txt} x={850} y={260 + j * 70} texto={txt} fondo={[VIOLETA, VERDE, AZUL_M][j]} id={ID} tam={22} />)}{t >= m('tarjeta') && <g opacity={e1(t, m('tarjeta'))}><rect x={760} y={500} width={180} height={110} rx={14} fill={PIZARRA} /><rect x={760} y={530} width={180} height={20} fill="#1f2937" /><Cruz x={940} y={500} r={24} /></g>}{t >= m('chat') && <Letrero x={850} y={680} texto="Si no, cada área con su propio chat" fondo={ROJO_M} id={ID} op={e1(t, m('chat'))} tam={20} />}</g>}
              {act === 2 && <g>{Array.from({ length: 6 }, (_, j) => <path key={j} d={`M 680 ${300 + j * 40} C 760 ${200 + j * 70} 900 ${520 - j * 50} 1060 ${300 + ((j * 53) % 240)}`} stroke={[AMBAR, ROSA, VIOLETA, AZUL_M, VERDE, NARANJA][j]} strokeWidth={7} fill="none" />)}{t >= m('espagueti') && <Letrero x={870} y={640} texto="Sistema «espagueti»" fondo={ROJO_M} id={ID} op={e1(t, m('espagueti'))} tam={22} />}</g>}
              {act === 3 && <g><Reloj x={760} y={400} r={70} t={t} vel={0.3} aro={VERDE} /><Txt f="a" x={760} y={520} textAnchor="middle" fontSize={22} fill={c.texto}>30 min a mano</Txt><Reloj x={990} y={400} r={70} t={t} vel={4} aro={ROJO_M} /><Txt f="a" x={990} y={520} textAnchor="middle" fontSize={22} fill={c.texto}>10 h automatizando</Txt>{t >= m('mano') && <Letrero x={870} y={620} texto="Primero se resuelve a mano" fondo={VERDE} id={ID} op={e1(t, m('mano'))} tam={22} />}</g>}
            </g>
          );
        })()}
      </Toma>
    </Lienzo>
  );
};
