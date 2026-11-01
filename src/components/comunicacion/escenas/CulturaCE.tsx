import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Brazos, Burbuja, Chip, Copa, Cruz, Etiqueta, Gesto, Hoja, MesaRestaurante, Ondas, PanelPregunta, Plato, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «La misma frase, otra cultura» (Meyer), escena propia. Acto A: la llamada de Tim Carr con su cliente
 * saudí: sus tres principios, las ondas de una buena llamada, el repaso de acuerdos, el silencio, la
 * pregunta que duele y la línea que se corta. Acto B: Erin Meyer: la misma frase lleva al sí en una
 * cultura y al no en otra. Acto C: «discrepo totalmente» rompe la cuerda que une a dos personas y «no
 * entiendo bien tu punto» la repara; la regla de intensificadores y atenuantes con los países de cada
 * lado; «un poco» puede ser serio y «completamente», solo un debate. Acto D: el alemán preocupado ante
 * franceses que alzan la voz y agitan los brazos… y la cena feliz.
 */

const ID = 'ce1c';
const nombres = ['carr', 'saudi', 'principios', 'batna', 'intereses', 'llamadaBien', 'acordado', 'silencio', 'teDije', 'promesas', 'negocio', 'meyer', 'si', 'no', 'regla1', 'totalmente', 'rompe', 'mexico', 'noEntiendo', 'intens', 'atenuantes', 'rusos', 'mexicanos', 'peruano', 'aleman', 'disfrutable', 'regla2', 'alzar', 'caia', 'cenaron', 'pregunta'] as const;

/* Teléfono junto a la oreja de una Persona (x, y de la Persona); `lado` 1 = derecha, −1 = izquierda. */
const Telefono: React.FC<{ x: number; y: number; lado: number; color: string }> = ({ x, y, lado, color }) => (
  <rect x={x + lado * 36 - 9} y={y - 160} width={18} height={44} rx={6} fill={color} />
);

export const CulturaCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('cenaron') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Tim Carr'], [M('principios'), 'Conocía los principios'], [M('llamadaBien'), 'La llamada fue bien'], [M('acordado'), 'Repasó cada acuerdo'],
    [M('silencio'), 'Silencio'], [M('negocio'), 'Fin del negocio'], [M('meyer'), 'Erin Meyer'], [M('regla1'), 'Cómo discrepar'],
    [M('mexico'), 'Discrepar con suavidad'], [M('intens'), 'Intensificadores y atenuantes'], [M('peruano'), '«Un poco» puede ser serio'],
    [M('aleman'), '«Completamente», solo un debate'], [M('regla2'), 'Las emociones'], [M('cenaron'), 'Y cenaron juntos'],
  ];

  const aA = ventana(t, -1, M('meyer') + 1);
  const aB = ventana(t, M('meyer') + 1, M('regla1'));
  const aC1 = ventana(t, M('regla1'), M('intens'));
  const aC2 = ventana(t, M('intens'), M('regla2'));
  const aD1 = ventana(t, M('regla2'), M('cenaron'));
  const aD2 = ac(t, M('cenaron'), M('cenaron') + 0.5);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Lo que te lleva al sí en una cultura te lleva al no en otra: cómo se discrepa y qué significan las emociones">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* ACTO A · la llamada de Tim Carr */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const bien = ventana(t, M('llamadaBien'), M('silencio'));
                  const herido = ac(t, M('promesas'), M('promesas') + 0.6);
                  const corte = ac(t, M('negocio'), M('negocio') + 0.6);
                  return (
                    <g>
                      <Persona id={ID} x={200} y={750} cuerpo="#334155" corbata />
                      <Gesto x={200} y={750} animo={0.5 * (1 - herido) - 0.6 * herido} />
                      <Telefono x={200} y={750} lado={1} color={c.texto} />
                      <Etiqueta x={200} y={815} texto="Tim Carr" op={1} c={c} id={ID} />
                      <g opacity={e1(t, M('saudi'))}>
                        <Persona id={ID} x={1000} y={750} cuerpo="#0f766e" />
                        <Gesto x={1000} y={750} animo={0.5 * (1 - herido) - 0.4 * herido} />
                        <Telefono x={1000} y={750} lado={-1} color={c.texto} />
                        <Etiqueta x={1000} y={815} texto="cliente" op={1} c={c} id={ID} />
                      </g>
                      {/* la línea de la llamada */}
                      <g opacity={e1(t, M('saudi') + 0.3)}>
                        <path d="M 250 640 Q 425 600 600 640 T 950 640" fill="none" stroke={corte > 0.5 ? c.apagado : NARANJA} strokeWidth={5} strokeDasharray={corte > 0.5 ? '6 14' : undefined} opacity={1 - 0.5 * corte} />
                        {corte > 0.01 && <g opacity={corte}><Cruz x={600} y={640} s={1.2} /></g>}
                      </g>
                      <Ondas x1={270} y1={560} x2={560} y2={560} t={t} color={NARANJA} op={bien} n={3} />
                      <Ondas x1={930} y1={530} x2={640} y2={530} t={t + 0.5} color={ROSA} op={bien} n={3} />
                      {/* sus principios */}
                      <g opacity={ventana(t, M('principios'), M('acordado'))}>
                        <rect x={380} y={200} width={440} height={240} rx={24} fill={c.panel} style={sombra(c.sombra)} />
                        {([['personas', M('principios') + 0.6], ['BATNA', M('batna')], ['intereses', M('intereses')]] as const).map(([txt, t0], k) => (
                          <g key={txt} opacity={e1(t, t0)}>
                            <Visto x={440} y={250 + k * 70} s={0.75} />
                            <Txt f="a" x={480} y={260 + k * 70} fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                          </g>
                        ))}
                      </g>
                      {/* el repaso de quién acordó qué */}
                      <g opacity={ventana(t, M('acordado'), M('silencio') + 0.4)}>
                        <Hoja x={600} y={320} w={300} h={240} c={c} cabeza={NARANJA} titulo="acuerdos" llena={ac(t, M('acordado'), M('acordado') + 1.6)} tituloTam={26} />
                      </g>
                      <g opacity={ventana(t, M('silencio'), M('teDije'))}>
                        <Burbuja x={980} y={560} w={140} texto="…" u={1} c={c} lado="der" id={ID} />
                      </g>
                      <g opacity={ventana(t, M('teDije'), M('promesas'))}>
                        <Burbuja x={980} y={560} w={380} texto="Te dije que lo haría." u={ac(t, M('teDije'), M('teDije') + 1.2)} c={c} lado="der" id={ID} />
                      </g>
                      <g opacity={ventana(t, M('promesas'), M('negocio') + 1.2)}>
                        <Burbuja x={980} y={560} w={420} texto="¿Crees que no cumplo mis promesas?" u={ac(t, M('promesas'), M('promesas') + 1.4)} c={c} lado="der" id={ID} marca />
                      </g>
                      <Chip x={460} y={250} texto="sin negocio" c={c} id={ID} op={e1(t, M('negocio'))} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ACTO B · Erin Meyer: al sí en una cultura, al no en otra */}
            {aB > 0.01 && (
              <g opacity={aB}>
                <Persona id={ID} x={200} y={750} pelo="#c49a6c" />
                <Gesto x={200} y={750} animo={0.4} />
                <Etiqueta x={200} y={815} texto="Erin Meyer" op={1} c={c} id={ID} />
                <Chip x={640} y={260} texto="la misma frase" c={c} id={ID} op={e1(t, M('meyer') + 1.2)} marca />
                {([['sí', 460, VERDE, M('si'), 'una cultura'], ['no', 820, '#c2263e', M('no'), 'otra cultura']] as const).map(([txt, x, col, t0, et]) => {
                  const op = e1(t, t0);
                  if (op < 0.01) return null;
                  const u = ac(t, t0, t0 + 0.6);
                  return (
                    <g key={txt} opacity={op}>
                      <path d={`M 640 300 Q ${(640 + x) / 2} 380 ${640 + (x - 640) * u} ${300 + 180 * u}`} fill="none" stroke={c.apagado} strokeWidth={6} strokeLinecap="round" />
                      <circle cx={x} cy={540} r={70 * u} fill={col} style={sombra(c.sombra)} />
                      <Txt x={x} y={560} textAnchor="middle" fontSize={56} fill="#fff" peso={800} opacity={u}>{txt}</Txt>
                      <Etiqueta x={x} y={660} texto={et} op={u} c={c} id={ID} />
                    </g>
                  );
                })}
              </g>
            )}

            {/* C1 · «discrepo totalmente» rompe la cuerda; «no entiendo bien tu punto» la repara */}
            {aC1 > 0.01 && (
              <g opacity={aC1}>
                {(() => {
                  const rota = ac(t, M('rompe'), M('rompe') + 0.6) * (1 - ac(t, M('noEntiendo') + 0.6, M('noEntiendo') + 1.4));
                  const suave = M('mexico');
                  return (
                    <g>
                      <Persona id={ID} x={300} y={750} cuerpo="#334155" corbata />
                      <Persona id={ID} x={900} y={750} cuerpo="#0f766e" pelo="#3b2a20" />
                      <Gesto x={900} y={750} animo={0.3 - 0.9 * rota} />
                      {/* la cuerda de la relación */}
                      <g opacity={e1(t, M('regla1') + 0.4)}>
                        <path d={`M 345 690 Q ${470 - 20 * rota} ${720 + 40 * rota} ${600 - 30 * rota} ${700 + 60 * rota}`} fill="none" stroke={NARANJA} strokeWidth={8} strokeLinecap="round" />
                        <path d={`M 855 690 Q ${730 + 20 * rota} ${720 + 40 * rota} ${600 + 30 * rota} ${700 + 60 * rota}`} fill="none" stroke={NARANJA} strokeWidth={8} strokeLinecap="round" />
                      </g>
                      <g opacity={ventana(t, M('totalmente') - 0.3, suave)}>
                        <Burbuja x={320} y={560} w={360} texto="Discrepo totalmente" u={ac(t, M('totalmente') - 0.3, M('totalmente') + 1)} c={c} id={ID} marca />
                      </g>
                      <g opacity={e1(t, M('noEntiendo') - 0.4)}>
                        <Burbuja x={320} y={560} w={380} texto="No entiendo bien tu punto" u={ac(t, M('noEntiendo') - 0.4, M('noEntiendo') + 1.2)} c={c} id={ID} />
                      </g>
                      <Chip x={860} y={250} texto="experiencia en México" c={c} id={ID} op={e1(t, M('mexico'))} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C2 · intensificadores y atenuantes */}
            {aC2 > 0.01 && (
              <g opacity={aC2}>
                <defs>
                  <linearGradient id={`${ID}-escala`} x1="0" x2="1">
                    <stop offset="0%" stopColor={c.apagado} />
                    <stop offset="100%" stopColor={ROSA} />
                  </linearGradient>
                </defs>
                <rect x={200} y={340} width={800} height={30} rx={15} fill={`url(#${ID}-escala)`} opacity={e1(t, M('intens') - 0.2)} />
                <Txt f="a" x={850} y={320} textAnchor="middle" fontSize={MIN_TXT} fill={ROSA} opacity={e1(t, M('intens'))}>intensificadores</Txt>
                <Txt f="a" x={350} y={320} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={e1(t, M('atenuantes'))}>atenuantes</Txt>
                <g opacity={ventana(t, M('intens') + 0.5, M('peruano'))}><Chip x={850} y={230} texto="totalmente" c={c} id={ID} op={1} marca /></g>
                <g opacity={ventana(t, M('atenuantes') + 0.5, M('peruano'))}><Chip x={350} y={230} texto="un poco" c={c} id={ID} op={1} /></g>
                <g opacity={e1(t, M('peruano'))}><Chip x={350} y={230} texto="«un poco» = serio" c={c} id={ID} op={1} marca /></g>
                <g opacity={e1(t, M('aleman'))}><Chip x={850} y={230} texto="solo un debate" c={c} id={ID} op={1} /></g>
                {['rusos', 'franceses', 'alemanes', 'israelíes', 'holandeses'].map((txt, k) => (
                  <Chip key={txt} x={850} y={440 + k * 80} texto={txt} c={c} id={ID} op={e1(t, M('rusos') + k * 0.3) * (t > M('aleman') && k !== 2 ? 0.45 : 1)} marca={k === 2 && t > M('aleman')} />
                ))}
                {['mexicanos', 'tailandeses', 'japoneses', 'peruanos', 'ghaneses'].map((txt, k) => (
                  <Chip key={txt} x={350} y={440 + k * 80} texto={txt} c={c} id={ID} op={e1(t, M('mexicanos') + k * 0.3) * (t > M('peruano') && k !== 3 ? 0.45 : 1)} marca={k === 3 && t > M('peruano')} />
                ))}
              </g>
            )}

            {/* D1 · el alemán y los franceses que alzan la voz */}
            {aD1 > 0.01 && (
              <g opacity={aD1}>
                {(() => {
                  const fuerte = ac(t, M('alzar'), M('alzar') + 0.6);
                  const preoc = ac(t, M('caia'), M('caia') + 0.6);
                  return (
                    <g>
                      <Persona id={ID} x={200} y={750} cuerpo="#334155" corbata />
                      <Gesto x={200} y={750} animo={0.2 - 0.7 * preoc} />
                      <Etiqueta x={200} y={815} texto="alemán" op={1} c={c} id={ID} />
                      {[680, 920].map((x, k) => {
                        const a = 30 + fuerte * (60 + 40 * Math.sin(t * 7 + k * 2));
                        const b = 30 + fuerte * (60 + 40 * Math.sin(t * 6 + k * 2 + 1.5));
                        return (
                          <g key={x}>
                            <Brazos x={x} y={750} izq={a} der={b} id={ID} color={k ? '#475569' : '#64748b'} />
                            <Persona id={ID} x={x} y={750} cuerpo={k ? '#475569' : '#64748b'} pelo={k ? '#5b3a26' : '#2b1a12'} />
                            <Gesto x={x} y={750} animo={0.2 - 0.5 * fuerte} />
                          </g>
                        );
                      })}
                      <Etiqueta x={800} y={815} texto="franceses" op={1} c={c} id={ID} />
                      <Ondas x1={720} y1={560} x2={880} y2={560} t={t * (1 + fuerte)} color={ROSA} op={fuerte} n={4} />
                      <Ondas x1={880} y1={520} x2={720} y2={520} t={t * (1 + fuerte) + 0.5} color={NARANJA} op={fuerte} n={4} />
                      <g opacity={e1(t, M('caia') - 0.3)}>
                        <Burbuja x={220} y={560} w={340} texto="¿Se cae el trato?" u={ac(t, M('caia') - 0.3, M('caia') + 1)} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D2 · todos cenan juntos */}
            {aD2 > 0.01 && (
              <g opacity={aD2}>
                {[380, 600, 820].map((x, k) => (
                  <g key={x}>
                    <Persona id={ID} x={x} y={660} cuerpo={['#334155', '#64748b', '#475569'][k]} pelo={['#2b1a12', '#2b1a12', '#5b3a26'][k]} corbata={k === 0} />
                    <Gesto x={x} y={660} animo={0.9} />
                  </g>
                ))}
                <MesaRestaurante x0={260} x1={900} y={640} c={c} />
                <Plato x={400} y={620} c={c} comida="pasta" s={0.8} />
                <Plato x={620} y={620} c={c} comida="carne" s={0.8} />
                <Plato x={830} y={620} c={c} comida="pasta" s={0.8} />
                <Copa x={500} y={612} c={c} />
                <Copa x={725} y={612} c={c} />
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
