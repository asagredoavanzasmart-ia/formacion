import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Monitor, Burbuja, Bloque, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Evaluar candidatos», en cinco tomas.
 * 1 · Sorey: la selección emula el trabajo en terreno (datos y sistemas bajo presión) y estandarizarla da a todos la
 *     misma oportunidad: candidatos frente a la misma pista con las mismas vallas.
 * 2 · Tres fases en secuencia: base técnica, evaluación de habilidades (Barritault valora el razonamiento) y entrevista
 *     cara a cara con preguntas estandarizadas.
 * 3 · Tres tipos de evaluación: personalidad, conductual y habilidades.
 * 4 · La pauta: una pregunta, una respuesta sólida (con números) y una débil; para APIs, una llamada de prueba en vivo.
 * 5 · Robinson: contratar a gente más inteligente, dejarla proponer y medir los resultados.
 */

const ID = 'ro50';
const nombres = ['sorey', 'emular', 'terreno', 'presion', 'estandarizar', 'afinidad', 'fases', 'base', 'senales', 'habilidades', 'casa', 'barritault', 'razonamiento', 'cara', 'estandarizadas', 'tipos', 'personalidad', 'conductual', 'habil2', 'pauta', 'preguntaP', 'solida', 'debil', 'apis', 'llamada', 'robinson', 'inteligentes', 'medir', 'pregunta'] as const;
type N = typeof nombres[number];

export const EntrevistaRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Evaluar candidatos'], [m('emular'), 'Emular el trabajo real'], [m('estandarizar'), 'La misma oportunidad para todos'],
    [m('fases'), 'Tres fases'], [m('tipos'), 'Tres tipos de evaluación'], [m('pauta'), 'La pauta de ejemplo'], [m('robinson'), 'Más inteligentes que yo'],
  ];

  const fase = t >= m('cara') ? 2 : t >= m('habilidades') ? 1 : t >= m('base') ? 0 : -1;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Evaluar candidatos">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · emular el trabajo y estandarizar */}
      <Toma t={t} a={-1} b={m('fases')} zi={1}>
        {t < m('estandarizar') && <g opacity={1 - ac(t, m('estandarizar') - 0.4, m('estandarizar'))}>
          <Suelo y={680} isDark={isDark} />
          <g opacity={e1(t, m('sorey'))}><Equipo id={ID} k="ops" x={300} y={680} s={0.8} t={t} nombre={false} /><g transform="translate(300 420) scale(0.45)"><Monitor x={0} y={0} w={240} h={150}><rect x={20} y={20} width={200} height={20} rx={10} fill={NARANJA} /></Monitor></g><Letrero x={300} y={740} texto="En terreno" fondo={VIOLETA} id={ID} tam={22} /></g>
          {t >= m('emular') && <path d="M 430 520 h 300" stroke={c.tenue} strokeWidth={6} strokeDasharray="12 10" opacity={e1(t, m('emular'))} />}
          {t >= m('emular') && <g opacity={e1(t, m('emular'))}><Persona id={ID} x={900} y={680} s={0.8} cuerpo={AZUL_M} /><g transform="translate(900 420) scale(0.45)"><Monitor x={0} y={0} w={240} h={150}><rect x={20} y={20} width={200} height={20} rx={10} fill={NARANJA} /></Monitor></g><Letrero x={900} y={740} texto="En la selección" fondo={AZUL_M} id={ID} tam={22} /></g>}
          {t >= m('presion') && <g opacity={e1(t, m('presion'))}><circle cx={600} cy={300} r={50} fill="#fff" stroke={ROJO_M} strokeWidth={8} /><line x1={600} y1={300} x2={600 + 34 * Math.cos(t * 4)} y2={300 + 34 * Math.sin(t * 4)} stroke="#334155" strokeWidth={6} strokeLinecap="round" /><Letrero x={600} y={390} texto="Datos y sistemas, bajo presión" fondo={ROJO_M} id={ID} tam={20} /></g>}
        </g>}
        {t >= m('estandarizar') && <g opacity={e1(t, m('estandarizar'))}>
          {[0, 1, 2].map((k) => { const y = 420 + k * 130; const u = ((t - m('estandarizar')) * 0.15 + k * 0.05) % 1; return <g key={k}>
            <rect x={140} y={y} width={920} height={8} rx={4} fill={c.apagado} />
            {[0, 1, 2].map((j) => <rect key={j} x={380 + j * 220} y={y - 40} width={12} height={46} rx={4} fill={NARANJA} />)}
            <Persona id={ID} x={lerp(160, 1020, u)} y={y} s={0.4} cuerpo={[AZUL_M, TEAL, VIOLETA][k]} />
          </g>; })}
          <Letrero x={600} y={300} texto="Las mismas pruebas para cada candidato" id={ID} tam={22} />
          {t >= m('afinidad') && <Letrero x={600} y={230} texto="Sin favoritismos por afinidad" fondo={PIZARRA} id={ID} op={e1(t, m('afinidad'))} tam={20} />}
        </g>}
      </Toma>

      {/* TOMA 2 · tres fases */}
      <Toma t={t} a={m('fases')} b={m('tipos')}>
        {['Base técnica', 'Habilidades', 'Cara a cara'].map((txt, k) => <g key={txt} opacity={e1(t, m('fases') + k * 0.3) * (fase >= 0 && fase !== k ? 0.4 : 1)}>
          <Bloque x={250 + k * 350} y={640 - k * 50} w={240} h={66} color={[AZUL_M, VIOLETA, NARANJA][k]} alto={20 + k * 10} />
          <Letrero x={250 + k * 350} y={760 - k * 50} texto={`${k + 1} · ${txt}`} fondo={[AZUL_M, VIOLETA, NARANJA][k]} id={ID} tam={22} />
        </g>)}
        {fase === 0 && t >= m('senales') && <g opacity={e1(t, m('senales'))}><Hoja x={190} y={330} w={120} h={150} lineas={5} color={AZUL_M} /><Visto x={320} y={330} r={24} /><Txt f="a" x={250} y={290} textAnchor="middle" fontSize={20} fill={c.texto}>Señales, aunque no sea su cargo</Txt></g>}
        {fase === 1 && <g opacity={e1(t, m('habilidades'))}>
          {t >= m('casa') && <g><rect x={480} y={300} width={240} height={150} rx={14} fill={c.panel} style={sombra(c.sombra, 3, 8)} /><Txt f="a" x={600} y={340} textAnchor="middle" fontSize={20} fill={c.texto}>Ejercicio para casa</Txt><polyline points="520,420 560,380 600,400 640,360 680,370" fill="none" stroke={VIOLETA} strokeWidth={5} /></g>}
          {t >= m('razonamiento') && <Letrero x={600} y={230} texto="Importa el razonamiento, no la respuesta" fondo={VIOLETA} id={ID} op={e1(t, m('razonamiento'))} tam={20} />}
        </g>}
        {fase === 2 && <g opacity={e1(t, m('cara'))}>
          <Persona id={ID} x={860} y={480} s={0.5} cuerpo={AZUL_M} /><Equipo id={ID} k="ops" x={1020} y={480} s={0.5} t={t} nombre={false} flip />
          {t >= m('estandarizadas') && [0, 1, 2].map((k) => <rect key={k} x={830} y={220 + k * 30} width={220} height={20} rx={8} fill={NARANJA} opacity={0.75} />)}
          {t >= m('estandarizadas') && <Letrero x={940} y={180} texto="Mismas preguntas" fondo={NARANJA} id={ID} op={e1(t, m('estandarizadas'))} tam={20} />}
        </g>}
      </Toma>

      {/* TOMA 3 · tres tipos de evaluación */}
      <Toma t={t} a={m('tipos')} b={m('pauta')}>
        {([['personalidad', 'Personalidad', 'Qué la motiva', ROSA], ['conductual', 'Conductual', 'Equipo y conflictos', AMBAR], ['habil2', 'Habilidades', 'Dónde está hoy', VERDE]] as [N, string, string, string][]).map(([n, tit, sub, col], k) => t >= m(n) && (
          <g key={n} opacity={e1(t, m(n))}>
            <rect x={110 + k * 340} y={240} width={300} height={420} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <rect x={110 + k * 340} y={240} width={300} height={80} rx={24} fill={col} /><rect x={110 + k * 340} y={290} width={300} height={30} fill={col} />
            <Txt f="a" x={260 + k * 340} y={292} textAnchor="middle" fontSize={26} fill="#fff" peso={700}>{tit}</Txt>
            <Persona id={ID} x={260 + k * 340} y={540} s={0.6} cuerpo={col} />
            <Txt f="a" x={260 + k * 340} y={610} textAnchor="middle" fontSize={22} fill={c.tenue}>{sub}</Txt>
          </g>
        ))}
      </Toma>

      {/* TOMA 4 · la pauta */}
      <Toma t={t} a={m('pauta')} b={m('robinson')}>
        {t >= m('preguntaP') && <Burbuja x={140} y={170} w={920} texto="«Cuéntame cuando hiciste que varios sistemas funcionaran juntos»" u={sm(t, m('preguntaP'), m('preguntaP') + 2)} c={c} id={ID} tam={24} />}
        {t >= m('solida') && <g opacity={e1(t, m('solida'))}>
          <rect x={140} y={360} width={440} height={220} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Visto x={190} y={410} r={26} /><Txt f="a" x={230} y={418} fontSize={24} fill={VERDE} peso={700}>Respuesta sólida</Txt>
          {['5 sistemas integrados', 'Stack 30 % más barato', 'Integración construida'].map((txt, k) => <Txt key={txt} f="a" x={180} y={470 + k * 34} fontSize={20} fill={c.texto}>· {txt}</Txt>)}
        </g>}
        {t >= m('debil') && <g opacity={e1(t, m('debil'))}>
          <rect x={620} y={360} width={440} height={220} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Cruz x={670} y={410} r={26} /><Txt f="a" x={710} y={418} fontSize={24} fill={ROJO_M} peso={700}>Respuesta débil</Txt>
          {['«Me gustan los sistemas»', '«Ayudé a mi tía con el correo»'].map((txt, k) => <Txt key={txt} f="a" x={660} y={470 + k * 34} fontSize={20} fill={c.texto}>· {txt}</Txt>)}
        </g>}
        {t >= m('apis') && <g opacity={e1(t, m('apis'))}><rect x={300} y={630} width={600} height={80} rx={18} fill={AZUL_M} /><Txt f="a" x={600} y={680} textAnchor="middle" fontSize={24} fill="#fff" peso={700}>{t >= m('llamada') ? 'APIs: una llamada de prueba en vivo' : 'Comprensión básica de APIs'}</Txt></g>}
      </Toma>

      {/* TOMA 5 · Robinson */}
      <Toma t={t} a={m('robinson')} b={fin + 1}>
        <Suelo y={700} isDark={isDark} />
        <Equipo id={ID} k="ops" x={360} y={700} s={0.75} t={t} nombre={false} />
        {t >= m('inteligentes') && <g opacity={e1(t, m('inteligentes'))}><Persona id={ID} x={720} y={700} s={0.95} cuerpo={VERDE} /><path d="M 700 470 l 20 -60 l 20 60 Z" fill={AMBAR} transform="translate(0 -40)" /><Burbuja x={150} y={230} w={440} texto="«Contrato a gente más inteligente que yo»" u={sm(t, m('inteligentes'), m('inteligentes') + 1.4)} c={c} id={ID} tam={22} /></g>}
        {t >= m('medir') && <g opacity={e1(t, m('medir'))}><polyline points="860,600 920,560 980,570 1040,500 1100,460" fill="none" stroke={VERDE} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" /><Letrero x={980} y={760} texto="Proponen, se prueba, se mide" fondo={VERDE} id={ID} tam={20} /></g>}
      </Toma>
    </Lienzo>
  );
};
