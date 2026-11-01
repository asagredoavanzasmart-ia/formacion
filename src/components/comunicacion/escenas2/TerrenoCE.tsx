import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Cruz, Etiqueta, Gesto, Hoja, Institucion, PanelPregunta, Rotulo, Visto, MIN_TXT, W, H, borde, e1, marcador, ventana } from '../escenas/comunCE';
import { BarraV } from '../escenas/comunPersuasion';
import type { PropsCE } from '../escenas/comunCE';

/**
 * «Preparar el terreno y elegir la batalla» (Detert), escena propia. Acto A: una alcancía de vidrio que se
 * llena de monedas de buena voluntad, los créditos de idiosincrasia, y que se gastan al desafiar una
 * norma. Acto B: Catherine Gill: dos años de buen desempeño y una balanza justa antes de hablar del sesgo;
 * Franco Bernabè aparta los privilegios del cargo para que perderlo no le cambie la vida. Acto C: elegir
 * la batalla: dos preguntas; los seis meses de Mandy reuniendo evidencia, proveedores alternativos y
 * mejoras cuantificadas, hasta el sí; y la fusión que Tachi Yamada aprovecha como momento.
 */

const ID = 'ce2o';
const nombres = ['excelencia', 'creditos', 'voluntad', 'gastar', 'gill', 'root', 'sesgo', 'dosAnos', 'genero', 'cambios', 'costo', 'bernabe', 'privilegios', 'batallas', 'importante', 'momento', 'mandy', 'proveedor', 'lazos', 'seisMeses', 'evidencia', 'alternativos', 'cuantifico', 'positiva', 'crisis', 'yamada', 'pregunta'] as const;

export const TerrenoCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('yamada') + 2 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Preparar el terreno'], [M('creditos'), 'Créditos de idiosincrasia'], [M('gastar'), 'Para gastar al desafiar'], [M('gill'), 'Catherine Gill'],
    [M('cambios'), 'La escucharon'], [M('costo'), 'Bajar el costo'], [M('batallas'), 'Elegir la batalla'], [M('mandy'), 'Mandy espera'],
    [M('positiva'), 'El sí'], [M('crisis'), 'Una crisis como momento'],
  ];

  const aA = ventana(t, -1, M('gill'));
  const aB1 = ventana(t, M('gill'), M('costo'));
  const aB2 = ventana(t, M('costo'), M('batallas'));
  const aC = ac(t, M('batallas'), M('batallas') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Una reserva de buena voluntad, la pregunta correcta y el momento justo">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />

            {/* A · la alcancía de los créditos */}
            {aA > 0.01 && (
              <g opacity={aA}>
                {(() => {
                  const llena = ac(t, M('excelencia'), M('gastar'));
                  const gasta = ac(t, M('gastar'), M('gastar') + 2);
                  const n = Math.round(14 * llena - 6 * gasta);
                  return (
                    <g>
                      <Persona id={ID} x={200} y={760} cuerpo="#334155" />
                      <Gesto x={200} y={760} animo={0.5} />
                      <path d="M 450 360 Q 450 330 480 330 H 680 Q 710 330 710 360 V 720 Q 710 750 680 750 H 480 Q 450 750 450 720 Z" fill="#bfdbfe" opacity={0.45} stroke={c.tenue} strokeWidth={4} />
                      {Array.from({ length: Math.max(0, n) }, (_, k) => <ellipse key={k} cx={500 + (k % 4) * 54} cy={720 - Math.floor(k / 4) * 30} rx={24} ry={10} fill="#fbbf24" stroke="#b45309" strokeWidth={2} />)}
                      <Etiqueta x={580} y={300} texto="reputación de excelencia" op={e1(t, M('excelencia'))} c={c} id={ID} />
                      <Chip x={580} y={810} texto="créditos de idiosincrasia" c={c} id={ID} op={e1(t, M('creditos'))} marca />
                      <g opacity={e1(t, M('gastar'))}>
                        <rect x={880} y={380} width={60} height={380} rx={6} fill={c.apagado} />
                        <Etiqueta x={910} y={350} texto="una norma" op={1} c={c} id={ID} />
                        {[0, 1, 2].map((k) => {
                          const u = ((t - M('gastar')) * 0.6 + k / 3) % 1;
                          return <ellipse key={k} cx={720 + 150 * u} cy={560 - 60 * Math.sin(Math.PI * u)} rx={22} ry={9} fill="#fbbf24" opacity={Math.sin(Math.PI * u)} />;
                        })}
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* B1 · Catherine Gill */}
            {aB1 > 0.01 && (
              <g opacity={aB1}>
                <Persona id={ID} x={200} y={760} cuerpo="#7c3aed" pelo="#c49a6c" />
                <Gesto x={200} y={760} animo={0.5} />
                <Etiqueta x={200} y={820} texto="Catherine Gill" op={1} c={c} id={ID} />
                <Chip x={600} y={250} texto="Root Capital" c={c} id={ID} op={ventana(t, M('root'), M('dosAnos'))} />
                <Chip x={600} y={250} texto="sesgo contra las mujeres" c={c} id={ID} op={ventana(t, M('dosAnos'), M('cambios')) * e1(t, M('sesgo'))} />
                <g opacity={e1(t, M('dosAnos'))}>
                  {Array.from({ length: 8 }, (_, k) => <BarraV key={k} x={420 + k * 60} base={640} alto={120 + k * 18} valor="" etiqueta="" u={ac(t, M('dosAnos') + k * 0.25, M('dosAnos') + k * 0.25 + 0.6)} c={c} id={ID} marca={k > 4} ancho={42} />)}
                  <Etiqueta x={630} y={700} texto="dos años" op={1} c={c} id={ID} />
                </g>
                <g opacity={e1(t, M('genero'))}>
                  <g transform="translate(990 460)">
                    <rect x={-6} y={-90} width={12} height={170} fill={c.tenue} />
                    <rect x={-110} y={-96} width={220} height={12} rx={6} fill={c.tenue} />
                    <path d="M -110 -84 L -140 -20 H -80 Z M 110 -84 L 80 -20 H 140 Z" fill={c.apagado} />
                    <rect x={-50} y={80} width={100} height={14} rx={6} fill={c.tenue} />
                  </g>
                  <Etiqueta x={990} y={600} texto="justa" op={1} c={c} id={ID} />
                </g>
                <g opacity={e1(t, M('cambios'))}><Visto x={990} y={300} s={1.1} /><Chip x={930} y={780} texto="cambios concretos" c={c} id={ID} op={1} marca /></g>
              </g>
            )}

            {/* B2 · Bernabè: perder el cargo no le cambia la vida */}
            {aB2 > 0.01 && (
              <g opacity={aB2}>
                <Persona id={ID} x={220} y={760} cuerpo="#1f2937" corbata />
                <Gesto x={220} y={760} animo={0.5} />
                <Etiqueta x={220} y={820} texto="Franco Bernabè" op={e1(t, M('bernabe'))} c={c} id={ID} />
                <Chip x={600} y={260} texto="reducir el costo" c={c} id={ID} op={1} />
                <g opacity={e1(t, M('privilegios'))}>
                  <g transform="translate(560 520)">
                    <path d="M -110 0 Q -110 -30 -80 -34 L -50 -36 Q -30 -70 20 -70 Q 60 -70 76 -36 L 100 -32 Q 116 -28 116 0 V 12 H -110 Z" fill="#1f2937" />
                    <circle cx={-60} cy={14} r={20} fill="#111827" /><circle cx={70} cy={14} r={20} fill="#111827" />
                  </g>
                  <g transform="translate(880 520)">
                    <rect x={-90} y={-110} width={180} height={130} rx={10} fill={c.panel} style={sombra(c.sombra)} />
                    <rect x={-60} y={-40} width={120} height={20} rx={6} fill="#a16207" />
                    <rect x={-20} y={-80} width={40} height={40} rx={6} fill={c.apagado} />
                  </g>
                  <Cruz x={650} y={450} s={0.9} /><Cruz x={960} y={400} s={0.9} />
                  <Etiqueta x={720} y={650} texto="sin privilegios del cargo" op={1} c={c} id={ID} />
                </g>
              </g>
            )}

            {/* C · elegir la batalla: Mandy y Yamada */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const fusion = ac(t, M('crisis'), M('crisis') + 1.6);
                  const items: [string, number][] = [['evidencia', M('evidencia')], ['alternativas', M('alternativos')], ['mejoras', M('cuantifico')]];
                  return (
                    <g>
                      <g opacity={ventana(t, M('batallas'), M('crisis'))}>
                        <g opacity={ventana(t, M('batallas'), M('mandy'))}><path d="M 520 360 L 680 520 M 680 360 L 520 520" stroke={c.tenue} strokeWidth={14} strokeLinecap="round" /><rect x={500} y={370} width={40} height={14} rx={5} fill="#a16207" transform="rotate(45 520 377)" /><rect x={660} y={370} width={40} height={14} rx={5} fill="#a16207" transform="rotate(-45 680 377)" /></g>
                        <Chip x={360} y={250} texto="¿importa?" c={c} id={ID} op={e1(t, M('importante'))} />
                        <Chip x={760} y={250} texto="¿es el momento?" c={c} id={ID} op={e1(t, M('momento'))} />
                        <g opacity={e1(t, M('mandy'))}>
                          <Persona id={ID} x={200} y={760} cuerpo="#0f766e" pelo="#7c3f1d" />
                          <Gesto x={200} y={760} animo={0.2 + 0.6 * ac(t, M('positiva'), M('positiva') + 0.6)} />
                          <Etiqueta x={200} y={820} texto="Mandy" op={1} c={c} id={ID} />
                        </g>
                        <g opacity={ventana(t, M('proveedor'), M('seisMeses'))}>
                          <Persona id={ID} x={980} y={760} cuerpo="#78716c" />
                          <Gesto x={980} y={760} animo={-0.5} />
                          <Etiqueta x={980} y={820} texto="proveedor" op={1} c={c} id={ID} />
                          <Chip x={700} y={460} texto="lazos antiguos" c={c} id={ID} op={e1(t, M('lazos'))} />
                        </g>
                        {/* seis meses de preparación */}
                        <g opacity={e1(t, M('seisMeses'))}>
                          <path d="M 330 400 H 1050" stroke={c.apagado} strokeWidth={8} strokeLinecap="round" />
                          {Array.from({ length: 6 }, (_, k) => <circle key={k} cx={360 + k * 135} cy={400} r={14} fill={k < Math.round(6 * ac(t, M('seisMeses'), M('positiva'))) ? NARANJA : c.panel2} />)}
                          <Txt f="a" x={690} y={370} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>6 meses</Txt>
                          {items.map(([txt, t0], k) => (
                            <g key={txt} opacity={e1(t, t0)}>
                              <Hoja x={420 + k * 230} y={560} w={150} h={150} c={c} cabeza={[NARANJA, ROSA, '#7c3aed'][k]} titulo="" llena={1} />
                              <Etiqueta x={420 + k * 230} y={690} texto={txt} op={1} c={c} id={ID} />
                            </g>
                          ))}
                          <g opacity={e1(t, M('positiva'))}><Visto x={1040} y={560} s={1.2} /></g>
                        </g>
                      </g>
                      {/* la fusión de Tachi Yamada */}
                      <g opacity={e1(t, M('crisis'))}>
                        <Institucion x={600 - 200 * (1 - fusion)} y={620} s={0.8} c={c} id={ID} />
                        <g opacity={1 - fusion}><Institucion x={800} y={620} s={0.8} c={c} id={ID} /></g>
                        <Chip x={600} y={330} texto="una fusión" c={c} id={ID} op={1} />
                        <Etiqueta x={600} y={720} texto="Tachi Yamada" op={e1(t, M('yamada'))} c={c} id={ID} marca />
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
