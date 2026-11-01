import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Lead, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Reloj, Calendario, Moneda3D, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Qué tan rápido contactar», en seis tomas.
 * 1 · Llega un lead y el reloj corre: lo antes posible; el SLA fija el plazo más rápido que se puede cumplir.
 * 2 · La probabilidad de calificarlo: 60 veces en la primera hora, 9 después, 1 a las 24 horas (2.241 empresas, 42 horas de promedio).
 * 3 · Huify: siete personas y una regla de cinco minutos, aunque todo ventas esté en una conferencia; ingresos por 6.
 *     El «por 1.000» de Harcus no está en el estudio.
 * 4 · PeopleDoc: el equipo de primer contacto se muda dentro de marketing; las reuniones calificadas suben 60 %.
 * 5 · El ritmo: una línea recta de 0 a 100.000 en 30 días, no una súper campaña ni semanas dormidas.
 * 6 · Cuántas veces insistir: depende del tamaño; se parte de supuestos, se mide y se corrige en 3 a 6 meses.
 */

const ID = 'ro21';
const nombres = ['masRapido', 'fija', 'prob', 'h1', 'h2', 'h24', 'auditoria', 'empresas', 'promedio', 'gana', 'huify', 'regla', 'conferencia', 'exito', 'seis', 'fresca', 'mil', 'noAparece', 'calificar', 'peopledoc', 'movieron', 'reuniones', 'ritmo', 'recta', 'campana', 'dormidas', 'desperdicia', 'ociosos', 'forma', 'insistir', 'tamanos', 'investigacion', 'medicion', 'meses', 'pregunta'] as const;
type N = typeof nombres[number];

export const ContactoRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Qué tan rápido contactar'], [m('masRapido'), 'Lo antes posible'], [m('fija'), 'Un plazo que se cumpla'],
    [m('prob'), 'La probabilidad de calificar'], [m('auditoria'), 'Harvard Business Review, 2011'],
    [m('huify'), 'Caso Huify'], [m('mil'), '¿Por 1.000?'], [m('peopledoc'), 'Caso PeopleDoc'],
    [m('ritmo'), 'El ritmo importa'], [m('insistir'), '¿Cuántas veces insistir?'],
  ];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Qué tan rápido contactar">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · el reloj corre */}
      <Toma t={t} a={-1} b={m('prob')} zi={1}>
        <Suelo y={700} isDark={isDark} />
        {(() => { const u = sm(t, 0.3, 2); return <Lead x={lerp(150, 520, u)} y={lerp(300, 560, u)} s={1.2} color={NARANJA} rot={(1 - u) * -20} />; })()}
        <Equipo id={ID} k="ven" x={800} y={700} s={0.85} t={t} nombre={false} />
        <Reloj x={600} y={300} r={90} t={t} vel={2} aro={t >= m('masRapido') ? ROJO_M : NARANJA} />
        {t >= m('masRapido') && <Letrero x={600} y={450} texto="Lo antes posible" fondo={ROJO_M} id={ID} op={e1(t, m('masRapido'))} />}
        {t >= m('fija') && (() => { const corto = sm(t, m('fija') + 1.5, m('fija') + 3.5); return (
          <g opacity={e1(t, m('fija'))}>
            <rect x={900} y={300} width={220} height={100} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            <Txt f="a" x={920} y={338} fontSize={22} fill={c.tenue}>Plazo del SLA</Txt>
            <Txt x={920} y={384} fontSize={38} fill={c.texto} peso={800}>{Math.round(lerp(24, 4, corto))} horas</Txt>
          </g>
        ); })()}
      </Toma>

      {/* TOMA 2 · 60, 9 y 1 */}
      <Toma t={t} a={m('prob')} b={m('huify')}>
        {([['h1', 60, '< 1 hora'], ['h2', 9, '1 hora después'], ['h24', 1, '24 horas o más']] as [N, number, string][]).map(([n, v, txt], k) => {
          const u = sm(t, m(n), m(n) + 1.2), h = 380 * (v / 60) * u + 6;
          return t >= m(n) && (
            <g key={n} opacity={e1(t, m(n))}>
              <rect x={210 + k * 230} y={660 - h} width={150} height={h} rx={14} fill={k === 0 ? `url(#${ID}-marca)` : k === 1 ? AMBAR : '#94a3b8'} />
              <Txt x={285 + k * 230} y={640 - h} textAnchor="middle" fontSize={44} fill={c.texto} peso={800}>{Math.round(v * u) || 1}×</Txt>
              <Txt f="a" x={285 + k * 230} y={700} textAnchor="middle" fontSize={22} fill={c.tenue}>{txt}</Txt>
            </g>
          );
        })}
        {t >= m('empresas') && <g opacity={e1(t, m('empresas'))}><rect x={920} y={240} width={220} height={150} rx={20} fill={c.panel} style={sombra(c.sombra, 3, 8)} /><Txt x={1030} y={300} textAnchor="middle" fontSize={44} fill={c.texto} peso={800}>2.241</Txt><Txt f="a" x={1030} y={340} textAnchor="middle" fontSize={22} fill={c.tenue}>empresas</Txt></g>}
        {t >= m('promedio') && <g opacity={e1(t, m('promedio'))}><Reloj x={1030} y={520} r={60} t={t} vel={4} aro={PIZARRA} /><Letrero x={1030} y={630} texto="Promedio: 42 horas" fondo={PIZARRA} id={ID} tam={22} /></g>}
        {t >= m('gana') && <Letrero x={500} y={780} texto="En una hora le ganas a casi todos" fondo={VERDE} id={ID} op={e1(t, m('gana'))} />}
      </Toma>

      {/* TOMA 3 · Huify */}
      <Toma t={t} a={m('huify')} b={m('peopledoc')}>
        <Suelo y={700} isDark={isDark} />
        {Array.from({ length: 7 }, (_, k) => <Persona key={k} id={ID} x={120 + k * 70} y={700} s={0.4} cuerpo={k < 4 ? NARANJA : TEAL} />)}
        <Letrero x={330} y={760} texto="7 personas" fondo={PIZARRA} id={ID} tam={22} />
        {t >= m('regla') && <g opacity={e1(t, m('regla'))}><Reloj x={330} y={330} r={70} t={t} vel={6} aro={VERDE} /><Letrero x={330} y={450} texto="Todo lead: 5 minutos" fondo={VERDE} id={ID} tam={24} /></g>}
        {t >= m('conferencia') && <g opacity={e1(t, m('conferencia')) * (t >= m('seis') ? 0.35 : 1)}><rect x={650} y={180} width={200} height={110} rx={14} fill={AZUL_M} /><Txt f="a" x={750} y={245} textAnchor="middle" fontSize={22} fill="#fff">Conferencia</Txt>{[0, 1, 2].map((k) => <Persona key={k} id={ID} x={690 + k * 60} y={360} s={0.3} cuerpo={NARANJA} />)}</g>}
        {t >= m('exito') && <g opacity={e1(t, m('exito'))}><path d="M 530 520 q -10 22 0 44" stroke="#1f2937" strokeWidth={8} fill="none" /><Letrero x={530} y={480} texto="Llama éxito del cliente" fondo={TEAL} id={ID} tam={22} /></g>}
        {t >= m('seis') && (() => { const u = sm(t, m('seis'), m('seis') + 1.5); return <g opacity={e1(t, m('seis'))}>
          {[1, 6].map((v, k) => <g key={v}><rect x={890 + k * 130 - 45} y={660 - 60 * v * (k ? u : 1)} width={90} height={60 * v * (k ? u : 1)} rx={12} fill={k ? `url(#${ID}-marca)` : '#94a3b8'} /><Txt x={890 + k * 130} y={640 - 60 * v * (k ? u : 1)} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>×{v}</Txt></g>)}
        </g>; })()}
        {t >= m('mil') && (() => { const g = sm(t, m('noAparece'), m('noAparece') + 0.4); return (
          <g opacity={e1(t, m('mil'))} transform="translate(600 250)">
            <Txt x={0} y={20} textAnchor="middle" fontSize={70} fill={c.tenue} peso={800} textDecoration={g > 0.5 ? 'line-through' : undefined}>×1.000</Txt>
            {g > 0.01 && <g transform={`rotate(-10) scale(${lerp(1.4, 1, g)})`} opacity={g}><rect x={-150} y={40} width={300} height={60} rx={12} fill="none" stroke={ROJO_M} strokeWidth={6} /><Txt f="a" x={0} y={80} textAnchor="middle" fontSize={24} fill={ROJO_M} peso={700}>No está en el estudio</Txt></g>}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 4 · PeopleDoc */}
      <Toma t={t} a={m('peopledoc')} b={m('ritmo')}>
        {(() => { const muda = sm(t, m('movieron'), m('movieron') + 2); return (
          <g>
            <rect x={140} y={260} width={420} height={380} rx={26} fill={AMBAR} opacity={0.15} />
            <Letrero x={350} y={230} texto="Marketing" fondo={AMBAR} id={ID} />
            <rect x={680} y={260} width={420} height={380} rx={26} fill={NARANJA} opacity={0.15} />
            <Letrero x={890} y={230} texto="Ventas" id={ID} />
            {[0, 1].map((k) => <Persona key={k} id={ID} x={260 + k * 120} y={460} s={0.45} cuerpo={AMBAR} />)}
            {[0, 1].map((k) => <Persona key={k} id={ID} x={lerp(800 + k * 120, 260 + k * 120, muda)} y={lerp(600, 610, muda)} s={0.45} cuerpo={AZUL_M} />)}
            {[0].map((k) => <Persona key={k} id={ID} x={960} y={460} s={0.45} cuerpo={NARANJA} corbata />)}
            {muda > 0.5 && <Letrero x={350} y={680} texto="Primer contacto humano" fondo={AZUL_M} id={ID} op={sm(muda, 0.5, 1)} tam={22} />}
            {t >= m('reuniones') && <Letrero x={890} y={700} texto="Reuniones calificadas +60 %" fondo={VERDE} id={ID} op={e1(t, m('reuniones'))} />}
          </g>
        ); })()}
      </Toma>

      {/* TOMA 5 · el ritmo */}
      <Toma t={t} a={m('ritmo')} b={m('insistir')}>
        {(() => {
          const X0 = 200, X1 = 1000, Y0 = 680, Y1 = 260;
          const recta = sm(t, m('recta'), m('recta') + 1.5);
          const forma = sm(t, m('forma'), m('forma') + 1.5);
          const y = (u: number) => Y0 - (Y1 - Y0) * -1 * lerp(u, u + 0.12 * Math.sin(u * Math.PI * 2), forma);
          const pts = Array.from({ length: 31 }, (_, k) => k / 30).filter((u) => u <= recta).map((u) => `${lerp(X0, X1, u)},${Y0 - (Y0 - Y1) * lerp(u, u + 0.12 * Math.sin(u * Math.PI * 2), forma)}`).join(' ');
          return (
            <g>
              <rect x={X0} y={Y0} width={X1 - X0} height={5} rx={2} fill={c.apagado} /><rect x={X0} y={Y1 - 20} width={5} height={Y0 - Y1 + 20} rx={2} fill={c.apagado} />
              <Txt f="a" x={X0 - 14} y={Y1 + 8} textAnchor="end" fontSize={22} fill={c.tenue}>100.000</Txt>
              <Txt f="a" x={X1} y={Y0 + 40} textAnchor="end" fontSize={22} fill={c.tenue}>30 días</Txt>
              {recta > 0.01 && <polyline points={pts} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />}
              {t >= m('campana') && <g opacity={e1(t, m('campana')) * (1 - forma)}><path d={`M ${X0} ${Y0} L ${X0 + 120} ${Y0 - 330} L ${X0 + 220} ${Y0 - 360} L ${X1} ${Y0 - 400}`} stroke={ROJO_M} strokeWidth={6} fill="none" strokeDasharray="12 10" />{t >= m('desperdicia') && <Letrero x={X0 + 440} y={Y0 - 470} texto="Leads que nadie llama" fondo={ROJO_M} id={ID} tam={22} />}</g>}
              {t >= m('dormidas') && <g opacity={e1(t, m('dormidas')) * (1 - forma)}><path d={`M ${X0} ${Y0} L ${X0 + 600} ${Y0 - 30} L ${X1} ${Y0 - 420}`} stroke="#94a3b8" strokeWidth={6} fill="none" strokeDasharray="12 10" />{t >= m('ociosos') && <Letrero x={X0 + 520} y={Y0 - 80} texto="Vendedores ociosos" fondo={PIZARRA} id={ID} tam={22} />}</g>}
              {forma > 0.5 && <Letrero x={600} y={190} texto="Menos en meses ocupados, más en tranquilos" fondo={AZUL_M} id={ID} op={sm(forma, 0.5, 1)} tam={22} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 6 · cuántas veces insistir */}
      <Toma t={t} a={m('insistir')} b={fin + 1}>
        <Suelo y={560} isDark={isDark} x0={150} x1={1050} />
        {t >= m('tamanos') && [[0.9, 'Grandes'], [0.7, 'Medianas'], [0.5, 'Pequeñas']].map(([s, txt], k) => (
          <g key={txt as string} opacity={e1(t, m('tamanos') + k * 0.3)}>
            <rect x={280 + k * 320 - 70 * (s as number)} y={560 - 260 * (s as number)} width={140 * (s as number)} height={260 * (s as number)} rx={10} fill={[PIZARRA, AZUL_M, TEAL][k]} />
            {Array.from({ length: 6 }, (_, j) => <rect key={j} x={280 + k * 320 - 50 * (s as number) + (j % 2) * 60 * (s as number)} y={560 - 230 * (s as number) + Math.floor(j / 2) * 70 * (s as number)} width={34 * (s as number)} height={34 * (s as number)} rx={4} fill="#fff" opacity={0.6} />)}
            <Txt f="a" x={280 + k * 320} y={600} textAnchor="middle" fontSize={24} fill={c.tenue}>{txt as string}</Txt>
          </g>
        ))}
        {([['investigacion', 'Supuestos razonables', AMBAR], ['medicion', 'Medir', VIOLETA], ['meses', 'Corregir: 3 a 6 meses', VERDE]] as [N, string, string][]).map(([n, txt, col], k) => t >= m(n) && (
          <g key={n} opacity={e1(t, m(n))}>
            <Letrero x={260 + k * 340} y={720} texto={txt} fondo={col} id={ID} tam={24} />
            {k < 2 && <path d={`M ${370 + k * 340} 720 h 70`} stroke={c.apagado} strokeWidth={6} strokeLinecap="round" />}
          </g>
        ))}
        {t >= m('meses') && <g opacity={e1(t, m('meses'))}><Calendario x={1000} y={260} s={0.7} marcados={Math.min(14, Math.floor((t - m('meses')) * 3))} /></g>}
      </Toma>
    </Lienzo>
  );
};
