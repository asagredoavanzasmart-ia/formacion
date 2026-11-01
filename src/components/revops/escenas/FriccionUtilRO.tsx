import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Rueda, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Calendario, Reloj, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Cuando la fricción suma valor», en seis tomas.
 * 1 · Al principio se barre toda fricción entre el prospecto y el defensor; con madurez, una balanza: la fricción
 *     debe calzar con el valor que agrega.
 * 2 · Davidoff y la matriz: valor alto o bajo, con o sin fricción; cuatro celdas con su veredicto.
 * 3 · Fechas de inicio: la agencia parte solo el 1 y el 15; quien quería el 5 firma antes de fin de mes.
 * 4 · Formulario de pasaporte: 17 documentos a mitad de camino; pedirlos al inicio sube los completados y el NPS.
 * 5 · La fricción que se traslada: se aplasta un bulto y aparece otro; se decide con costo y beneficio.
 * 6 · Cómo empezar: dibujar el flywheel, listar fuerzas y fricciones, quitar las negativas y sumar las positivas.
 */

const ID = 'ro15';
const nombres = ['asumir', 'proposito', 'calzar', 'defensor', 'efectos', 'objetivo', 'davidoff', 'altoValor', 'pocoValor', 'herramienta', 'preguntas', 'cuatro', 'eliminala', 'usala', 'ideal', 'cuidado', 'casos', 'fechas', 'dias', 'cinco', 'finMes', 'acelera', 'cirujano', 'semanas', 'pasaporte', 'docs', 'inicio', 'subieron', 'bancarios', 'traslada', 'otro', 'costo', 'empezar', 'dibuja', 'elimina', 'resta', 'final', 'pregunta'] as const;
type N = typeof nombres[number];

export const FriccionUtilRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Cuando la fricción suma valor'], [m('asumir'), 'Al principio: toda es mala'], [m('proposito'), 'Con madurez: a propósito'], [m('calzar'), 'Que calce con el valor'],
    [m('davidoff'), 'Doug Davidoff'], [m('preguntas'), 'Valor y fricción'],
    [m('fechas'), 'Fechas de inicio'], [m('pasaporte'), 'Formulario de pasaporte'], [m('traslada'), 'La fricción se traslada'], [m('empezar'), 'Cómo empezar'],
  ];

  const CELDAS: { n: N; fila: number; col: number; txt: string; col2: string }[] = [
    { n: 'eliminala', fila: 0, col: 0, txt: 'Elimínala', col2: ROJO_M },
    { n: 'usala', fila: 0, col: 1, txt: 'Úsala', col2: VERDE },
    { n: 'ideal', fila: 1, col: 0, txt: 'Lo ideal', col2: AZUL_M },
    { n: 'cuidado', fila: 1, col: 1, txt: 'Cuidado', col2: AMBAR },
  ];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Cuando la fricción suma valor">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · barrer todo o calzar fricción con valor */}
      <Toma t={t} a={-1} b={m('davidoff')} zi={1}>
        <Suelo y={660} isDark={isDark} />
        {(t < m('proposito') || t >= m('defensor')) && (() => {
          const fase2 = t >= m('defensor');
          const barre = fase2 ? sm(t, m('defensor') + 0.5, m('defensor') + 2.2) : 0;
          const op = fase2 ? e1(t, m('defensor')) : 1 - ac(t, m('proposito') - 0.4, m('proposito'));
          const efecto = sm(t, m('efectos'), m('efectos') + 0.8);
          return (
            <g opacity={op}>
              <Persona id={ID} x={170} y={660} s={0.6} cuerpo="#94a3b8" />
              <Letrero x={170} y={720} texto="Prospecto" fondo={PIZARRA} id={ID} tam={22} />
              <Persona id={ID} x={1030} y={660} s={0.6} cuerpo={NARANJA} />
              {fase2 && <Letrero x={1030} y={720} texto="Defensor" id={ID} tam={22} />}
              {[0, 1, 2, 3].map((k) => <g key={k} transform={`translate(${380 + k * 140 + barre * (k % 2 ? 300 : -300)} ${620 - barre * 200}) rotate(${barre * 180})`} opacity={1 - barre}>
                <rect x={-30} y={-40} width={60} height={80} rx={10} fill={ROJO_M} />
              </g>)}
              {!fase2 && <Letrero x={600} y={300} texto="Al principio: toda fricción es mala" fondo={PIZARRA} id={ID} op={e1(t, m('asumir'))} />}
              {/* efecto secundario: quitar todo abre un hueco nuevo */}
              {efecto > 0.01 && <g opacity={efecto}><path d="M 560 662 l 20 30 l 20 -18 l 20 26" stroke={ROJO_M} strokeWidth={6} fill="none" strokeLinecap="round" /><Letrero x={600} y={420} texto="Vigila los efectos secundarios" fondo={PIZARRA} id={ID} op={1 - ac(t, m('objetivo') - 0.3, m('objetivo'))} tam={24} /></g>}
              {t >= m('objetivo') && <Letrero x={600} y={420} texto="Que la fricción esté justificada" id={ID} op={e1(t, m('objetivo'))} tam={24} />}
            </g>
          );
        })()}
        {t >= m('proposito') && t < m('defensor') && (() => {
          const inc = Math.sin(t * 1.4) * 4 * (1 - sm(t, m('calzar'), m('calzar') + 1.5));
          return (
            <g opacity={e1(t, m('proposito')) * (1 - ac(t, m('defensor') - 0.4, m('defensor')))}>
              <rect x={590} y={300} width={20} height={360} fill={PIZARRA} />
              <path d="M 540 660 h 120 l -30 -40 h -60 Z" fill={PIZARRA} />
              <g transform={`rotate(${inc} 600 300)`}>
                <rect x={330} y={290} width={540} height={14} rx={7} fill={c.texto} />
                <path d="M 330 304 L 290 420 H 470 L 430 304 Z" fill={ROSA} opacity={0.85} />
                <path d="M 770 304 L 730 420 H 910 L 870 304 Z" fill={NARANJA} opacity={0.85} />
                <Txt f="a" x={380} y={460} textAnchor="middle" fontSize={26} fill={c.texto}>Fricción</Txt>
                <Txt f="a" x={820} y={460} textAnchor="middle" fontSize={26} fill={c.texto}>Valor</Txt>
              </g>
              {t >= m('calzar') && <Letrero x={600} y={740} texto="La fricción calza con el valor" id={ID} op={e1(t, m('calzar'))} tam={24} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 2 · Davidoff y la matriz de cuatro celdas */}
      <Toma t={t} a={m('davidoff')} b={m('fechas')}>
        {t < m('preguntas') && (
          <g opacity={1 - ac(t, m('preguntas') - 0.4, m('preguntas'))}>
            <rect x={200} y={230} width={800} height={260} rx={28} fill={c.panel} style={sombra(c.sombra, 4, 14)} />
            <Txt f="a" x={240} y={300} fontSize={30} fill={c.texto}>«Toda experiencia de alto valor</Txt>
            <Txt f="a" x={240} y={346} fontSize={30} fill={c.texto}>tiene fricción».</Txt>
            {t >= m('pocoValor') && <Txt f="a" x={240} y={410} fontSize={26} fill={ROJO_M} opacity={e1(t, m('pocoValor'))}>El problema: fricción donde hay poco valor.</Txt>}
            {t >= m('herramienta') && <Letrero x={600} y={560} texto="La fricción es una herramienta" id={ID} op={e1(t, m('herramienta'))} />}
          </g>
        )}
        {t >= m('preguntas') && (
          <g opacity={e1(t, m('preguntas'))}>
            <Txt f="a" x={340} y={190} textAnchor="middle" fontSize={24} fill={c.tenue}>Con fricción</Txt>
            <Txt f="a" x={860} y={190} textAnchor="middle" fontSize={24} fill={c.tenue}>Sin fricción</Txt>
            <Txt f="a" x={120} y={370} textAnchor="middle" fontSize={24} fill={c.tenue}>Bajo</Txt>
            <Txt f="a" x={120} y={630} textAnchor="middle" fontSize={24} fill={c.tenue}>Alto</Txt>
            {/* celdas: filas = valor (bajo, alto), columnas = fricción (con, sin) */}
            {[
              { n: 'eliminala' as N, x: 340, y: 370, txt: 'Elimínala', col: ROJO_M },
              { n: 'usala' as N, x: 340, y: 630, txt: 'Úsala', col: VERDE },
              { n: 'ideal' as N, x: 860, y: 370, txt: 'Lo ideal', col: AZUL_M },
              { n: 'cuidado' as N, x: 860, y: 630, txt: 'Cuidado', col: AMBAR },
            ].map((cel) => (
              <g key={cel.n} opacity={t >= m('cuatro') ? e1(t, m('cuatro')) : 0}>
                <rect x={cel.x - 240} y={cel.y - 115} width={480} height={230} rx={24} fill={t >= m(cel.n) ? cel.col : c.panel2} opacity={t >= m(cel.n) ? 0.18 : 1} />
                {t >= m(cel.n) && <Letrero x={cel.x} y={cel.y} texto={cel.txt} fondo={cel.col} id={ID} op={e1(t, m(cel.n))} tam={30} />}
              </g>
            ))}
          </g>
        )}
      </Toma>

      {/* TOMA 3 · fechas de inicio */}
      <Toma t={t} a={m('fechas')} b={m('pasaporte')}>
        {(() => {
          const dia = (d: number): [number, number] => [300 + ((d - 1) % 7) * 70, 290 + Math.floor((d - 1) / 7) * 70];
          return (
            <g>
              <rect x={240} y={180} width={500} height={420} rx={24} fill="#fff" style={sombra(0.25, 4, 12)} />
              <rect x={240} y={180} width={500} height={60} rx={24} fill={ROSA} /><rect x={240} y={210} width={500} height={30} fill={ROSA} />
              <Txt f="a" x={490} y={222} textAnchor="middle" fontSize={26} fill="#fff" peso={700}>Abril</Txt>
              {Array.from({ length: 30 }, (_, k) => {
                const d = k + 1, [x, y] = dia(d);
                const libre = t >= m('dias') && (d === 1 || d === 15);
                return <g key={d}>
                  <rect x={x - 28} y={y - 26} width={56} height={52} rx={10} fill={libre ? VERDE : d === 5 && t >= m('cinco') ? '#fecaca' : '#f1f5f9'} />
                  <Txt f="a" x={x} y={y + 9} textAnchor="middle" fontSize={22} fill={libre ? '#fff' : '#475569'}>{d}</Txt>
                </g>;
              })}
              {t >= m('cinco') && <Letrero x={490} y={660} texto="¿Empezar el 5? Será el 15" fondo={PIZARRA} id={ID} op={e1(t, m('cinco'))} tam={24} />}
              {t >= m('finMes') && (() => { const u = sm(t, m('finMes'), m('finMes') + 1.6); return (
                <g opacity={e1(t, m('finMes'))}>
                  <g transform={`translate(${lerp(1040, 880, u)} ${lerp(260, 420, u)}) rotate(${-6 + 6 * u})`}><Hoja x={0} y={0} w={110} h={140} lineas={4} /></g>
                  <Equipo id={ID} k="ven" x={960} y={720} s={0.55} t={t} nombre={false} />
                  {t >= m('acelera') && <Letrero x={940} y={200} texto="Firma antes de fin de mes" id={ID} op={e1(t, m('acelera'))} tam={24} />}
                </g>
              ); })()}
              {t >= m('cirujano') && <g opacity={e1(t, m('cirujano'))}><rect x={240} y={700} width={500} height={70} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} /><Txt f="a" x={490} y={744} textAnchor="middle" fontSize={24} fill={c.texto}>{t >= m('semanas') ? 'Como el cirujano: en tres semanas' : 'Como el cirujano o el estilista'}</Txt></g>}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 4 · formulario de pasaporte */}
      <Toma t={t} a={m('pasaporte')} b={m('traslada')}>
        {(() => {
          const mueve = sm(t, m('inicio'), m('inicio') + 1.5);
          const yDocs = lerp(470, 250, mueve);
          return (
            <g>
              <rect x={170} y={180} width={420} height={560} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 14)} />
              {Array.from({ length: 6 }, (_, k) => { const hueco = t >= m('docs') ? 1 : 0; const slot = lerp(k < 4 ? k : k + hueco, k + hueco, mueve); return <rect key={k} x={210} y={220 + slot * 74} width={340} height={44} rx={10} fill={c.panel2} />; })}
              {t >= m('docs') && (
                <g opacity={e1(t, m('docs'))} transform={`translate(0 ${lerp(4, 0, mueve) * 74})`}>
                  <rect x={200} y={210} width={360} height={64} rx={14} fill={ROJO_M} opacity={0.9} />
                  <Txt f="a" x={380} y={251} textAnchor="middle" fontSize={24} fill="#fff" peso={700}>17 documentos requeridos</Txt>
                </g>
              )}
              {t >= m('docs') && mueve < 0.5 && <Letrero x={380} y={790} texto="A mitad de camino: abandono" fondo={ROJO_M} id={ID} op={e1(t, m('docs'))} tam={22} />}
              {mueve > 0.5 && <Letrero x={380} y={790} texto="Al inicio: más fricción" fondo={PIZARRA} id={ID} op={sm(mueve, 0.5, 1)} tam={22} />}
              {t >= m('subieron') && (
                <g opacity={e1(t, m('subieron'))}>
                  {['Completados', 'Satisfacción', 'NPS'].map((txt, k) => { const h = (120 + k * 30) * sm(t, m('subieron') + k * 0.4, m('subieron') + 1 + k * 0.4); return <g key={txt}>
                    <rect x={700 + k * 140 - 45} y={600 - h} width={90} height={h} rx={12} fill={[VERDE, AZUL_M, ROSA][k]} />
                    <path d={`M ${700 + k * 140} ${570 - h} l -16 22 h 32 Z`} fill={[VERDE, AZUL_M, ROSA][k]} />
                    <Txt f="a" x={700 + k * 140} y={640} textAnchor="middle" fontSize={20} fill={c.tenue}>{txt}</Txt>
                  </g>; })}
                </g>
              )}
              {t >= m('bancarios') && <Letrero x={840} y={730} texto="Cuenta gratis… ¿y los datos bancarios?" fondo={PIZARRA} id={ID} op={e1(t, m('bancarios'))} tam={20} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 5 · la fricción se traslada */}
      <Toma t={t} a={m('traslada')} b={m('empezar')}>
        {(() => {
          const ciclo = ((t - m('traslada')) * 0.5) % 2;
          const a = ciclo < 1 ? 1 - sm(ciclo, 0.2, 0.6) : sm(ciclo, 1.2, 1.6);
          const b = 1 - a;
          return (
            <g>
              <path d={`M 140 560 H 440 Q 500 ${560 - 110 * a} 560 560 H 700 Q 760 ${560 - 110 * b} 820 560 H 1060`} stroke="none" fill="none" />
              <path d={`M 140 600 V 560 H 440 Q 500 ${560 - 110 * a} 560 560 H 700 Q 760 ${560 - 110 * b} 820 560 H 1060 V 600 Z`} fill={TEAL} opacity={0.8} />
              <g transform={`translate(${a < 0.5 ? 500 : 760} ${380})`}>
                <rect x={-14} y={-90} width={28} height={110} rx={12} fill="#b45309" />
                <rect x={-60} y={-120} width={120} height={50} rx={14} fill={PIZARRA} />
              </g>
              {t >= m('otro') && <Letrero x={600} y={690} texto="Se quita aquí, aparece allá" fondo={PIZARRA} id={ID} op={e1(t, m('otro'))} />}
              {t >= m('costo') && <Letrero x={600} y={220} texto="Análisis de costo y beneficio" id={ID} op={e1(t, m('costo'))} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 6 · cómo empezar */}
      <Toma t={t} a={m('empezar')} b={fin + 1}>
        {t >= m('dibuja') && <g opacity={e1(t, m('dibuja'))}><Rueda x={300} y={450} r={170} giro={t * 25} id={ID} centro="" isDark={isDark} /></g>}
        {t >= m('dibuja') && (() => {
          const quita = sm(t, m('elimina'), m('elimina') + 1.5);
          const items = [
            { txt: '+ Referidos', col: VERDE, neg: false }, { txt: '− Cobro sorpresa', col: ROJO_M, neg: true },
            { txt: '+ Onboarding', col: VERDE, neg: false }, { txt: '− Espera en chat', col: ROJO_M, neg: true },
            { txt: '− Descuento agresivo', col: AMBAR, neg: true },
          ];
          return items.map((it, k) => {
            const fuera = it.neg && k < 4 ? quita : k === 4 ? sm(t, m('final'), m('final') + 1.5) : 0;
            const vis = k === 4 ? e1(t, m('resta')) : e1(t, m('dibuja') + 0.6 + k * 0.4);
            return (
              <g key={it.txt} opacity={vis * (1 - fuera)} transform={`translate(${fuera * 200} 0)`}>
                <rect x={560} y={190 + k * 110} width={460} height={84} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                <rect x={560} y={190 + k * 110} width={12} height={84} rx={6} fill={it.col} />
                <Txt f="a" x={600} y={243 + k * 110} fontSize={28} fill={c.texto}>{it.txt}</Txt>
              </g>
            );
          });
        })()}
        {t >= m('resta') && <Letrero x={300} y={700} texto="También hay fuerza que resta" fondo={AMBAR} id={ID} op={e1(t, m('resta'))} tam={24} />}
      </Toma>
    </Lienzo>
  );
};
