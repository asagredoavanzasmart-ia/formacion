import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, Hoja, Insignia, PanelPregunta, Reloj, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «La confianza según la cultura» (Meyer, reglas 3 a 5), escena propia. Acto A: la confianza de la
 * cabeza (un cerebro con engranajes) y la del corazón; en Estados Unidos van separadas y en China se
 * entrelazan; en los mercados emergentes el corazón es un candado que se abre con comidas, tés y
 * paciencia hasta dejar un amigo y un trato. Acto B: la empresa danesa pregunta por una fecha; el
 * proveedor indonesio dice sí a la cara y no por correo; la pregunta se cambia por «¿cuánto tardarías?»
 * y aparecen las señales de un no. Acto C: el papel escrito que inquieta en Burundi y en Nigeria y el
 * contrato chino que se reabre a las seis semanas, como un paso más del baile.
 */

const ID = 'ce19';
const nombres = ['regla3', 'cognitiva', 'cabeza', 'afectiva', 'corazon', 'chua', 'eeuu', 'chinos', 'emergentes', 'vinculo', 'comidas', 'humano', 'paciencia', 'amigo', 'regla4', 'danesa', 'indonesio', 'cara', 'correo', 'groseria', 'haremos', 'cuanto', 'silencio', 'inspiracion', 'intentare', 'regla5', 'escrito', 'burundi', 'nigeriano', 'pluma', 'china', 'semanas', 'baile', 'pregunta'] as const;

/* Cabeza de perfil con un engranaje que gira: la confianza que nace del razonamiento. */
const Cabeza: React.FC<{ x: number; y: number; s?: number; t: number; c: ReturnType<typeof tono>; id: string }> = ({ x, y, s = 1, t, c, id }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 70 L -60 30 Q -86 -10 -70 -50 Q -50 -96 4 -96 Q 66 -96 74 -36 L 90 -6 L 72 4 L 74 40 Q 72 58 46 56 L 30 56 L 30 70 Z" fill={c.apagado} style={sombra(c.sombra, 4, 10)} />
    <g transform={`translate(4 -30) rotate(${t * 40})`}>
      {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-7} y={-40} width={14} height={16} rx={3} fill={`url(#${id}-marca)`} transform={`rotate(${k * 45})`} />)}
      <circle r={28} fill={`url(#${id}-marca)`} /><circle r={10} fill={c.panel2} />
    </g>
  </g>
);

/* Corazón que late; `lleno` de 0 a 1 tiñe su interior. */
const Corazon: React.FC<{ x: number; y: number; s?: number; t: number; lleno?: number; c: ReturnType<typeof tono>; id: string }> = ({ x, y, s = 1, t, lleno = 1, c, id }) => {
  const late = 1 + 0.04 * Math.max(0, Math.sin(t * 6));
  const d = 'M 0 70 C -90 10 -90 -70 -40 -76 C -16 -79 -4 -62 0 -50 C 4 -62 16 -79 40 -76 C 90 -70 90 10 0 70 Z';
  return (
    <g transform={`translate(${x} ${y}) scale(${s * late})`}>
      <defs><clipPath id={`${id}-cz-${x}`}><rect x={-100} y={70 - 150 * lleno} width={200} height={150 * lleno} /></clipPath></defs>
      <path d={d} fill={c.apagado} style={sombra(c.sombra, 4, 10)} />
      <path d={d} fill={ROSA} clipPath={`url(#${id}-cz-${x})`} />
    </g>
  );
};

/* Taza con vapor. */
const Taza: React.FC<{ x: number; y: number; t: number; c: ReturnType<typeof tono> }> = ({ x, y, t, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={4} rx={34} ry={7} fill="#000" opacity={0.12} />
    <path d="M -26 -36 L 26 -36 L 20 0 L -20 0 Z" fill={c.blanco} style={sombra(c.sombra, 2, 6)} />
    <path d="M 24 -28 Q 42 -26 38 -12 Q 34 -4 22 -8" stroke={c.blanco} strokeWidth={6} fill="none" />
    <ellipse cx={0} cy={-36} rx={26} ry={6} fill="#a16207" />
    {[-10, 6].map((dx, k) => <path key={k} d={`M ${dx} -48 q 8 -14 0 -28 q -8 -14 0 -28`} stroke={c.tenue} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.3 + 0.3 * Math.sin(t * 3 + k * 2)} transform={`translate(0 ${-((t * 12 + k * 9) % 10)})`} />)}
  </g>
);

/* Sobre de correo. */
const Sobre: React.FC<{ x: number; y: number; c: ReturnType<typeof tono>; abre?: number }> = ({ x, y, c, abre = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-60} y={-38} width={120} height={76} rx={8} fill={c.blanco} style={sombra(c.sombra, 3, 8)} />
    <path d={`M -60 -38 L 0 ${-38 + 44 * (1 - 2 * abre)} L 60 -38`} fill="none" stroke={c.apagado} strokeWidth={4} />
  </g>
);

export const ConfianzaCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('baile') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Cómo nace la confianza'], [M('cognitiva'), 'Confianza de la cabeza'], [M('afectiva'), 'Confianza del corazón'], [M('chua'), 'Roy Chua'],
    [M('emergentes'), 'Primero, el vínculo'], [M('comidas'), 'Comidas y tés'], [M('amigo'), 'Un amigo y un trato'], [M('regla4'), 'Sin preguntas de sí o no'],
    [M('cara'), 'Sí a la cara'], [M('correo'), 'No por correo'], [M('cuanto'), 'Mejor: ¿cuánto tardarías?'], [M('silencio'), 'Señales de un no'],
    [M('regla5'), 'Cuidado con el papel'], [M('china'), 'Un contrato que se reabre'], [M('baile'), 'Un paso más del baile'],
  ];

  const aA1 = ventana(t, -1, M('chua'));
  const aA2 = ventana(t, M('chua'), M('emergentes'));
  const aA3 = ventana(t, M('emergentes'), M('regla4'));
  const aB = ventana(t, M('regla4'), M('regla5'));
  const aC = ac(t, M('regla5'), M('regla5') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La confianza de la cabeza y del corazón, el sí que no es sí y el contrato que inquieta">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A1 · cabeza y corazón */}
            {aA1 > 0.01 && (
              <g opacity={aA1}>
                <g opacity={e1(t, M('cognitiva'))}>
                  <Cabeza x={380} y={330} t={t} c={c} id={ID} />
                  <Etiqueta x={380} y={460} texto="cabeza" op={e1(t, M('cabeza'))} c={c} id={ID} marca />
                  {['logros', 'habilidades', 'fiabilidad'].map((txt, k) => <Chip key={txt} x={380} y={540 + k * 90} texto={txt} c={c} id={ID} op={e1(t, M('cabeza') + 0.6 + k * 0.5)} />)}
                </g>
                <g opacity={e1(t, M('afectiva'))}>
                  <Corazon x={820} y={330} t={t} c={c} id={ID} lleno={ac(t, M('corazon'), M('corazon') + 1)} />
                  <Etiqueta x={820} y={460} texto="corazón" op={e1(t, M('corazon'))} c={c} id={ID} marca />
                  {['cercanía', 'empatía', 'amistad'].map((txt, k) => <Chip key={txt} x={820} y={540 + k * 90} texto={txt} c={c} id={ID} op={e1(t, M('corazon') + 0.6 + k * 0.5)} />)}
                </g>
              </g>
            )}

            {/* A2 · separadas en Estados Unidos, entrelazadas en China */}
            {aA2 > 0.01 && (
              <g opacity={aA2}>
                <Persona id={ID} x={600} y={420} s={0.8} cuerpo="#334155" corbata />
                <Gesto x={600} y={420} s={0.8} animo={0.4} />
                <Etiqueta x={600} y={480} texto="Roy Chua" op={1} c={c} id={ID} />
                {(() => {
                  const sep = ac(t, M('eeuu'), M('eeuu') + 1);
                  const jun = ac(t, M('chinos'), M('chinos') + 1.2);
                  return (
                    <g>
                      <g opacity={e1(t, M('eeuu'))}>
                        <Cabeza x={160 - 30 * sep} y={660} s={0.6} t={t} c={c} id={ID} />
                        <Corazon x={330 + 30 * sep} y={660} s={0.6} t={t} c={c} id={ID} />
                        <line x1={245} y1={600} x2={245} y2={720} stroke={c.apagado} strokeWidth={5} strokeDasharray="10 10" opacity={sep} />
                        <Etiqueta x={245} y={790} texto="Estados Unidos" op={1} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('chinos'))}>
                        <Cabeza x={870 + 60 * jun} y={660} s={0.6} t={t} c={c} id={ID} />
                        <g opacity={0.9}><Corazon x={1060 - 60 * jun} y={660} s={0.6} t={t} c={c} id={ID} /></g>
                        <Etiqueta x={960} y={790} texto="China" op={1} c={c} id={ID} />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* A3 · el vínculo afectivo: comidas, tés y paciencia */}
            {aA3 > 0.01 && (
              <g opacity={aA3}>
                {(() => {
                  const llena = ac(t, M('comidas'), M('amigo'));
                  return (
                    <g>
                      <Corazon x={600} y={300} s={0.95} t={t} c={c} id={ID} lleno={llena} />
                      {/* candado que se abre cuando el corazón se llena */}
                      <g transform={`translate(600 ${300 - 10 * ac(t, M('amigo'), M('amigo') + 0.6)})`} opacity={1 - ac(t, M('amigo') + 0.4, M('amigo') + 1)}>
                        <path d={`M -22 -6 V -30 Q -22 -54 0 -54 Q 22 -54 22 ${-30 - 20 * ac(t, M('amigo'), M('amigo') + 0.5)}`} stroke={c.texto} strokeWidth={9} fill="none" />
                        <rect x={-32} y={-8} width={64} height={50} rx={10} fill={c.texto} />
                      </g>
                      <Chip x={600} y={180} texto="vínculo afectivo" c={c} id={ID} op={e1(t, M('vinculo'))} marca />
                      <Persona id={ID} x={200} y={760} cuerpo="#334155" corbata />
                      <Gesto x={200} y={760} animo={0.2 + 0.6 * llena} />
                      <Persona id={ID} x={1000} y={760} cuerpo="#0f766e" pelo="#3b2a20" />
                      <Gesto x={1000} y={760} animo={0.1 + 0.7 * llena} />
                      <g opacity={e1(t, M('comidas'))}>
                        <rect x={360} y={690} width={480} height={24} rx={10} fill={c.apagado} />
                        <rect x={420} y={714} width={18} height={60} fill={c.apagado} /><rect x={762} y={714} width={18} height={60} fill={c.apagado} />
                        <Taza x={480} y={690} t={t} c={c} />
                        <Taza x={720} y={690} t={t + 1} c={c} />
                      </g>
                      <Chip x={600} y={520} texto="tu lado humano" c={c} id={ID} op={ventana(t, M('humano'), M('paciencia') + 1.2)} />
                      <g opacity={ventana(t, M('paciencia') + 1.2, M('amigo'))}><Reloj x={600} y={540} c={c} progreso={ac(t, M('paciencia'), M('amigo'))} /></g>
                      <g opacity={e1(t, M('amigo'))}>
                        <Chip x={430} y={540} texto="un amigo" c={c} id={ID} op={1} />
                        <Chip x={770} y={540} texto="un trato" c={c} id={ID} op={e1(t, M('amigo') + 1.2)} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B · el sí que es no */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const sorpresa = ac(t, M('correo') + 0.8, M('correo') + 1.4);
                  const abre = ac(t, M('correo') + 0.6, M('correo') + 1.2);
                  const vuela = ac(t, M('correo'), M('correo') + 0.8);
                  const tCuanto = M('cuanto');
                  const sennal = M('silencio');
                  return (
                    <g>
                      <g opacity={e1(t, M('regla4'))}>
                        <Persona id={ID} x={200} y={750} cuerpo="#1e3a8a" pelo="#d6b27a" />
                        <Gesto x={200} y={750} animo={0.3 - 0.8 * sorpresa * (1 - ac(t, tCuanto, tCuanto + 0.6))} />
                        <Etiqueta x={200} y={815} texto="Dinamarca" op={e1(t, M('danesa'))} c={c} id={ID} />
                      </g>
                      <g opacity={e1(t, M('regla4') + 0.3)}>
                        <Persona id={ID} x={1000} y={750} cuerpo="#b45309" />
                        <Gesto x={1000} y={750} animo={0.4} />
                        <Etiqueta x={1000} y={815} texto="Indonesia" op={e1(t, M('indonesio'))} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('danesa') + 0.3, M('cara'))}>
                        <Burbuja x={240} y={560} w={400} texto="¿Pueden cumplir la fecha?" u={ac(t, M('danesa') + 0.3, M('danesa') + 1.6)} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('cara'), M('correo') + 0.4)}>
                        <Burbuja x={960} y={560} w={200} texto="Sí." u={1} c={c} lado="der" id={ID} marca />
                      </g>
                      {/* el correo que viaja y dice no */}
                      <g opacity={ventana(t, M('correo'), M('groseria'))}>
                        <Sobre x={900 - 600 * vuela} y={420 - 120 * Math.sin(Math.PI * vuela)} c={c} abre={abre} />
                        <g opacity={abre}><Insignia x={300} y={320} texto="No." c={c} id={ID} tono="alerta" ancho={160} /></g>
                      </g>
                      <Chip x={600} y={250} texto="decir no = grosería" c={c} id={ID} op={ventana(t, M('groseria'), M('haremos'))} />
                      <g opacity={ventana(t, M('haremos'), tCuanto)}>
                        <Burbuja x={960} y={560} w={420} texto="Haremos lo posible." u={ac(t, M('haremos'), M('haremos') + 1.2)} c={c} lado="der" id={ID} />
                      </g>
                      <g opacity={ventana(t, tCuanto, sennal)}>
                        <Burbuja x={240} y={560} w={420} texto="¿Cuánto tardarías en hacerlo?" u={ac(t, tCuanto, tCuanto + 1.4)} c={c} id={ID} marca />
                        <g opacity={e1(t, tCuanto)}>
                          <Txt f="a" x={600} y={260} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>«¿Lo harás?»</Txt>
                          <line x1={500} y1={250} x2={700} y2={250} stroke="#c2263e" strokeWidth={5} />
                        </g>
                      </g>
                      {/* señales de un no */}
                      {([['silencio extra', M('silencio')], ['inspiración profunda', M('inspiracion')], ['«lo intentaré…»', M('intentare')]] as const).map(([txt, t0], k) => (
                        <Chip key={txt} x={600} y={240 + k * 95} texto={txt} c={c} id={ID} op={e1(t, t0)} />
                      ))}
                      <g opacity={e1(t, M('intentare') + 1.6)}><Insignia x={600} y={530} texto="no es un sí" c={c} id={ID} tono="alerta" giro={-4} /></g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · cuidado con ponerlo por escrito */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const reabre = ac(t, M('semanas') + 0.6, M('semanas') + 1.4);
                  const pluma = ac(t, M('pluma'), M('pluma') + 0.8);
                  const china = ac(t, M('china') - 0.3, M('china') + 0.3);
                  return (
                    <g>
                      <g opacity={e1(t, M('escrito'))}>
                        <Hoja x={600} y={380} w={300} h={300} c={c} cabeza={NARANJA} titulo={china > 0.5 ? 'contrato' : 'resumen'} llena={ac(t, M('escrito'), M('escrito') + 1.2)} tituloTam={26} rot={-6 * reabre * Math.sin(t * 5)} />
                      </g>
                      <g opacity={e1(t, M('burundi'))}>
                        <Persona id={ID} x={180} y={750} cuerpo="#15803d" />
                        <Gesto x={180} y={750} animo={-0.4} />
                        <Etiqueta x={180} y={815} texto="Burundi" op={1} c={c} id={ID} />
                        <Chip x={260} y={260} texto="desconfianza" c={c} id={ID} op={ventana(t, M('burundi') + 1.4, M('china'))} />
                      </g>
                      <g opacity={e1(t, M('nigeriano'))}>
                        <Persona id={ID} x={1020} y={750} cuerpo="#7c2d12" />
                        <Gesto x={1020} y={750} animo={0.4 - 0.9 * pluma} />
                        <Etiqueta x={1020} y={815} texto="Nigeria" op={1} c={c} id={ID} />
                      </g>
                      {/* la pluma que se le ofrece */}
                      <g opacity={ventana(t, M('pluma'), M('china'))} transform={`translate(${760 + 140 * pluma} ${560}) rotate(-35)`}>
                        <rect x={-6} y={-60} width={12} height={100} rx={5} fill={c.texto} />
                        <path d="M -6 40 L 0 58 L 6 40 Z" fill={NARANJA} />
                      </g>
                      {/* China: firmado y reabierto a las seis semanas */}
                      <g opacity={china * (1 - reabre)}><Visto x={720} y={500} s={1.2} /></g>
                      <g opacity={reabre}><Cruz x={720} y={500} s={1.2} /></g>
                      <Chip x={600} y={640} texto="seis semanas" c={c} id={ID} op={e1(t, M('semanas'))} />
                      {/* el baile: pasos que van y vuelven */}
                      <g opacity={e1(t, M('baile'))}>
                        {[0, 1, 2].map((k) => {
                          const x = 470 + k * 130 + 12 * Math.sin(t * 3 + k);
                          return <path key={k} d={`M ${x} 730 q 30 -36 60 0`} stroke={`url(#${ID}-marcaH)`} strokeWidth={7} fill="none" strokeLinecap="round" />;
                        })}
                        <Etiqueta x={600} y={800} texto="un paso más" op={1} c={c} id={ID} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}
          </g>
          <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
