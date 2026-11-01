import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Lead, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Hoja, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Por qué marketing y ventas necesitan un SLA», en cinco tomas.
 * 1 · El acuerdo de ida y vuelta: marketing envía leads calificados (punto naranja) y ventas devuelve el contacto a tiempo (punto rosado).
 * 2 · Dos cifras: 69 % de las empresas de alto desempeño frente a solo 7 de cada 100 empleados que saben qué hacer.
 * 3 · La brecha: sin acuerdo, marketing celebra el volumen y ventas se queja de la calidad; el SLA une a ambos en una meta.
 * 4 · Ni más ni menos: el número exacto y la mezcla de ventas (una grande, tres pequeñas y una mediana); lo que sobra se pierde.
 * 5 · Metas complementarias: de una cuerda que tira hacia lados opuestos a un solo foco, el ingreso.
 */

const ID = 'ro18';
const nombres = ['acuerdo', 'garantiza', 'idaVuelta', 'proveedor', 'promete', 'contactar', 'naranja', 'rosado', 'primera', 'cifras', 'c69', 'c7', 'origen', 'brecha', 'opuestas', 'volumen', 'calidad', 'compromiso', 'conjunto', 'niMas', 'exacto', 'mezcla', 'grande', 'bookbinder', 'sobran', 'faltan', 'comenos', 'complementarias', 'competir', 'cook', 'ingreso', 'pregunta'] as const;
type N = typeof nombres[number];

export const SlaRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Por qué un SLA'], [m('acuerdo'), 'Acuerdo de nivel de servicio'], [m('idaVuelta'), 'Un acuerdo de ida y vuelta'],
    [m('cifras'), 'Dos cifras'], [m('brecha'), 'La brecha que cierra el SLA'],
    [m('niMas'), 'Ni más ni menos leads'], [m('mezcla'), 'Una mezcla de ventas'],
    [m('comenos'), 'Metas complementarias'], [m('cook'), 'Un solo foco: el ingreso'],
  ];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Por qué marketing y ventas necesitan un SLA">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · ida y vuelta */}
      <Toma t={t} a={-1} b={m('cifras')} zi={1}>
        <Suelo y={700} isDark={isDark} />
        <Equipo id={ID} k="mkt" x={230} y={700} s={0.85} t={t} op={e1(t, 0.3)} />
        <Equipo id={ID} k="ven" x={970} y={700} s={0.85} t={t} op={e1(t, 0.6)} flip />
        {t >= m('acuerdo') && (() => { const firma = sm(t, m('garantiza'), m('garantiza') + 1.2); return (
          <g opacity={e1(t, m('acuerdo'))} transform="translate(600 300)">
            <rect x={-110} y={-120} width={220} height={240} rx={16} fill="#fff" style={sombra(0.25, 4, 12)} />
            <Txt f="a" x={0} y={-80} textAnchor="middle" fontSize={30} fill={NARANJA} peso={700}>SLA</Txt>
            {[0, 1, 2, 3].map((k) => <rect key={k} x={-80} y={-50 + k * 30} width={k === 3 ? 100 : 160} height={10} rx={5} fill="#cbd5e1" />)}
            <path d="M -70 90 q 20 -30 40 0 t 40 0 t 40 0" stroke={NARANJA} strokeWidth={4} fill="none" strokeDasharray="160" strokeDashoffset={160 * (1 - firma)} strokeLinecap="round" />
          </g>
        ); })()}
        {t >= m('promete') && (() => { const ph = ((t - m('naranja')) * 0.4) % 1; const ida = t >= m('naranja'); return (
          <g opacity={e1(t, m('promete'))}>
            <Letrero x={420} y={500} texto="Leads calificados" fondo={AMBAR} id={ID} tam={24} />
            {ida && <Lead x={lerp(320, 880, ph)} y={570 - 60 * Math.sin(Math.PI * ph)} s={0.7} color={NARANJA} />}
          </g>
        ); })()}
        {t >= m('contactar') && (() => { const ph = ((t - m('rosado')) * 0.4 + 0.5) % 1; const vuelta = t >= m('rosado'); return (
          <g opacity={e1(t, m('contactar')) * (t >= m('primera') ? 0.4 + 0.6 * Math.abs(Math.sin(t * 2)) : 1)}>
            <Letrero x={780} y={760} texto="Contacto a tiempo" fondo={ROSA} id={ID} tam={24} />
            {vuelta && <circle cx={lerp(880, 320, ph)} cy={640 + 30 * Math.sin(Math.PI * ph)} r={14} fill={ROSA} />}
          </g>
        ); })()}
        {t >= m('proveedor') && <Letrero x={600} y={150} texto="Cada uno, proveedor y cliente del otro" fondo={PIZARRA} id={ID} op={e1(t, m('proveedor'))} tam={24} />}
      </Toma>

      {/* TOMA 2 · dos cifras */}
      <Toma t={t} a={m('cifras')} b={m('brecha')}>
        {t >= m('c69') && (
          <g opacity={e1(t, m('c69'))}>
            <circle cx={320} cy={420} r={150} fill="none" stroke={c.apagado} strokeWidth={34} />
            <circle cx={320} cy={420} r={150} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={34} strokeDasharray={`${942 * 0.69 * sm(t, m('c69'), m('c69') + 1.5)} 2000`} transform="rotate(-90 320 420)" strokeLinecap="round" />
            <Txt x={320} y={440} textAnchor="middle" fontSize={64} fill={c.texto} peso={800}>{Math.round(69 * sm(t, m('c69'), m('c69') + 1.5))} %</Txt>
            <Letrero x={320} y={640} texto="Alto desempeño: comunicar" id={ID} tam={22} />
          </g>
        )}
        {t >= m('c7') && (
          <g opacity={e1(t, m('c7'))}>
            {Array.from({ length: 100 }, (_, k) => <circle key={k} cx={660 + (k % 10) * 44} cy={240 + Math.floor(k / 10) * 40} r={14} fill={k < 7 && t >= m('c7') + 0.5 + k * 0.1 ? NARANJA : c.apagado} />)}
            <Letrero x={858} y={720} texto="Solo 7 de 100 saben qué hacer" fondo={PIZARRA} id={ID} tam={22} />
          </g>
        )}
        {t >= m('origen') && <Letrero x={600} y={810} texto="Referencia, no dato verificado" fondo={AMBAR} id={ID} op={e1(t, m('origen'))} tam={22} />}
      </Toma>

      {/* TOMA 3 · la brecha: metas opuestas */}
      <Toma t={t} a={m('brecha')} b={m('niMas')}>
        {(() => { const une = sm(t, m('compromiso'), m('compromiso') + 1.6); return (
          <g>
            <Suelo y={700} isDark={isDark} />
            <g transform={`translate(${lerp(0, 120, une)} 0)`}><Equipo id={ID} k="mkt" x={230} y={700} s={0.75} t={t} nombre={false} /></g>
            <g transform={`translate(${lerp(0, -120, une)} 0)`}><Equipo id={ID} k="ven" x={970} y={700} s={0.75} t={t} nombre={false} flip /></g>
            {/* meta común arriba */}
            <g opacity={e1(t, m('brecha'))}>
              <rect x={596} y={180} width={8} height={130} fill={PIZARRA} /><path d="M 604 180 h 80 l -16 22 l 16 22 h -80 Z" fill={VERDE} />
              <Letrero x={600} y={350} texto="Meta de ingresos" fondo={VERDE} id={ID} tam={22} />
            </g>
            {t >= m('volumen') && <g opacity={e1(t, m('volumen')) * (1 - une)}>{Array.from({ length: 7 }, (_, k) => <Lead key={k} x={160 + (k % 3) * 60} y={460 - Math.floor(k / 3) * 50} s={0.55} color={AMBAR} />)}<Letrero x={230} y={250} texto="¡Volumen!" fondo={AMBAR} id={ID} /></g>}
            {t >= m('calidad') && <g opacity={e1(t, m('calidad')) * (1 - une)}><Cruz x={970} y={420} r={34} /><Letrero x={970} y={250} texto="Mala calidad" fondo={ROJO_M} id={ID} /></g>}
            {t >= m('opuestas') && une < 1 && <g opacity={1 - une}><path d="M 340 560 h -90 m 0 0 l 20 -14 m -20 14 l 20 14" stroke={AMBAR} strokeWidth={8} fill="none" strokeLinecap="round" /><path d="M 860 560 h 90 m 0 0 l -20 -14 m 20 14 l -20 14" stroke={NARANJA} strokeWidth={8} fill="none" strokeLinecap="round" /></g>}
            {une > 0.01 && <g opacity={une}>
              <Flujo x1={350} y1={520} x2={590} y2={330} t={t} n={3} vel={0.6} arco={40} color={AMBAR} r={8} />
              <Flujo x1={850} y1={520} x2={610} y2={330} t={t + 0.3} n={3} vel={0.6} arco={40} color={NARANJA} r={8} />
              <Letrero x={600} y={790} texto={t >= m('conjunto') ? 'Responsables juntos del ingreso' : 'Un compromiso por lado'} id={ID} />
            </g>}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 4 · ni más ni menos; la mezcla */}
      <Toma t={t} a={m('niMas')} b={m('comenos')}>
        <Suelo y={700} isDark={isDark} />
        <Equipo id={ID} k="ven" x={980} y={700} s={0.75} t={t} nombre={false} flip />
        {t >= m('exacto') && <Letrero x={980} y={760} texto="El número exacto" id={ID} op={e1(t, m('exacto'))} tam={24} />}
        {t >= m('mezcla') && (() => {
          const cajas = [{ s: 1.6, txt: 'Grande', col: NARANJA }, { s: 0.8, txt: '', col: AMBAR }, { s: 0.8, txt: '', col: AMBAR }, { s: 0.8, txt: '', col: AMBAR }, { s: 1.1, txt: 'Mediana', col: ROSA }];
          let x = 180;
          return cajas.map((cj, k) => { const w = 70 * cj.s; const cx = x + w / 2; x += w + 24; const on = t >= m('grande') + k * 0.35; return (
            <g key={k} opacity={on ? e1(t, m('grande') + k * 0.35) : 0}>
              <rect x={cx - w / 2} y={700 - w} width={w} height={w} rx={12} fill={cj.col} />
              <rect x={cx - w / 2} y={700 - w} width={w} height={w * 0.25} rx={10} fill="#fff" opacity={0.2} />
              {cj.txt && <Txt f="a" x={cx} y={740} textAnchor="middle" fontSize={22} fill={c.tenue}>{cj.txt}</Txt>}
            </g>
          ); });
        })()}
        {t >= m('mezcla') && <Letrero x={430} y={380} texto="1 grande · 3 pequeñas · 1 mediana" fondo={PIZARRA} id={ID} op={e1(t, m('mezcla'))} tam={24} />}
        {t >= m('sobran') && <g opacity={e1(t, m('sobran'))}>{[0, 1, 2].map((k) => { const ph = ((t - m('sobran')) * 0.4 + k / 3) % 1; return <Lead key={k} x={820 + k * 30} y={lerp(380, 700, ph)} s={0.5} color="#94a3b8" op={1 - ph} rot={ph * 90} />; })}<Letrero x={820} y={140} texto="Lo que sobra se pierde" fondo="#94a3b8" id={ID} tam={22} /></g>}
        {t >= m('faltan') && <Letrero x={820} y={225} texto="Lo que falta deja sin trabajo" fondo={ROJO_M} id={ID} op={e1(t, m('faltan'))} tam={22} />}
      </Toma>

      {/* TOMA 5 · metas complementarias */}
      <Toma t={t} a={m('comenos')} b={fin + 1}>
        {(() => { const junta = sm(t, m('complementarias'), m('complementarias') + 1.8); const tira = (1 - junta) * 10 * Math.sin(t * 5); return (
          <g>
            <Suelo y={700} isDark={isDark} />
            <g transform={`translate(${lerp(0, 230, junta) + tira} 0)`}><Equipo id={ID} k="mkt" x={200} y={700} s={0.75} t={t} nombre={false} /></g>
            <g transform={`translate(${lerp(0, -230, junta) + tira} 0)`}><Equipo id={ID} k="ven" x={1000} y={700} s={0.75} t={t} nombre={false} flip /></g>
            {junta < 0.95 && <path d={`M ${260 + tira + 230 * junta} 600 Q 600 ${640 + 20 * Math.sin(t * 5)} ${940 + tira - 230 * junta} 600`} stroke="#a16207" strokeWidth={8} fill="none" opacity={1 - junta} />}
            {t >= m('competir') && junta < 0.5 && <Letrero x={600} y={300} texto="Incentivos que los hacen competir" fondo={ROJO_M} id={ID} op={e1(t, m('competir'))} />}
            {junta > 0.5 && <Letrero x={600} y={300} texto="Metas complementarias" fondo={VERDE} id={ID} op={sm(junta, 0.5, 1)} />}
            {t >= m('cook') && <g opacity={e1(t, m('cook'))}>
              <circle cx={600} cy={480} r={70} fill={`url(#${ID}-marca)`} />
              <Txt x={600} y={500} textAnchor="middle" fontSize={60} fill="#fff" peso={800}>$</Txt>
              {t >= m('ingreso') && <Letrero x={600} y={160} texto="Un solo foco: el ingreso" id={ID} op={e1(t, m('ingreso'))} />}
            </g>}
          </g>
        ); })()}
      </Toma>
    </Lienzo>
  );
};
