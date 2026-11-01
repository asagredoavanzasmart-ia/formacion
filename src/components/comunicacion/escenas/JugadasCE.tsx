import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, sombra, tono } from '../../remotion/comun';
import { Burbuja, Chip, Etiqueta, Gesto, Hoja, PanelPregunta, Rotulo, MIN_TXT, W, H, borde, e1, marcador, ventana } from './comunCE';
import type { PropsCE } from './comunCE';

/**
 * «Jugadas a mano» (Weeks), escena propia. Arriba, tres naipes (honrar, replantear, nombrar la táctica)
 * que se levantan cuando se juegan. Acto A: David honra a Jeremy reconociendo su parte. Acto B:
 * Elizabeth replantea su intención ante Rafael y retoma la lista; una balanza que queda nivelada: sin
 * pelear ni apaciguar, nadie pierde la cara. Acto C: la táctica de Karen es una flecha roja; Nick la
 * nombra, la etiqueta se pega y la flecha cae: seguir exigiría más agresión. Acto D: Jacqueline en el
 * directorio: el chiste flota, ella vuelve a la agenda, nombra lo que siente y Richard retrocede.
 */

const ID = 'ce32';
const nombres = ['jugadas', 'honrar', 'comparto', 'aprecio', 'sinProvocar', 'desarmar', 'entiendo', 'repasemos', 'concedes', 'sinPelear', 'cara', 'tacticas', 'nombrandolas', 'trabajado', 'distinta', 'nombrar', 'agresion', 'jacqueline', 'chiste', 'flotara', 'volvio', 'richard', 'relegada', 'retrocedio', 'pregunta'] as const;

type C = ReturnType<typeof tono>;

/* Tres naipes: se levantan cuando su jugada está activa. */
const Naipes: React.FC<{ t: number; t0: number; activo: number; c: C; id: string }> = ({ t, t0, activo, c, id }) => (
  <g>
    {[0, 1, 2].map((k) => {
      const on = k === activo;
      const op = ac(t, t0 + k * 0.3, t0 + k * 0.3 + 0.4);
      return (
        <g key={k} opacity={op} transform={`translate(${520 + k * 80} ${215 - (on ? 18 : 0)}) rotate(${(k - 1) * 10})`}>
          <rect x={-40} y={-56} width={80} height={112} rx={12} fill={on ? `url(#${id}-marca)` : c.panel} style={sombra(c.sombra, 3, 8)} />
          <Txt x={0} y={14} textAnchor="middle" fontSize={40} fill={on ? '#fff' : c.tenue}>{k + 1}</Txt>
        </g>
      );
    })}
  </g>
);

export const JugadasCE: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const c = tono(isDark);
  const M = marcador(nombres, marcas);
  const t = estatico ? M('retrocedio') + 1.5 : frame / fps;
  const fin = estatico ? 1e6 : durationInFrames / fps;
  const tP = M('pregunta');
  const vP = estatico ? 0 : e1(t, tP, 0.6);
  const fondo = 1 - 0.72 * ac(t, tP, tP + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Jugadas a mano'], [M('honrar'), '1 · Honrar al otro'], [M('sinProvocar'), 'Sin provocar'], [M('desarmar'), '2 · Replantear tu intención'],
    [M('sinPelear'), 'Ni pelear ni apaciguar'], [M('tacticas'), '3 · Combatir la táctica'], [M('nombrar'), 'Nombrarla la desarma'], [M('jacqueline'), 'Jacqueline'],
    [M('volvio'), 'Vuelve al tema'], [M('relegada'), 'Nombra lo que siente'], [M('retrocedio'), 'Richard retrocede'],
  ];

  const activo = t > M('tacticas') ? 2 : t > M('desarmar') ? 1 : t > M('honrar') ? 0 : -1;
  const aA = ventana(t, -1, M('desarmar'));
  const aB = ventana(t, M('desarmar'), M('tacticas'));
  const aC = ventana(t, M('tacticas'), M('jacqueline'));
  const aD = ac(t, M('jacqueline'), M('jacqueline') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Durante una conversación tensa: honrar al otro, replantear tu intención y nombrar la táctica">
        <Gradientes id={ID} />
        <g opacity={borde(t, fin)}>
          <g opacity={fondo}>
            <Rotulo t={t} lista={rotulos} id={ID} />
            <g opacity={1 - aD}><Naipes t={t} t0={M('jugadas')} activo={activo} c={c} id={ID} /></g>

            {/* A · David honra a Jeremy */}
            {aA > 0.01 && (
              <g opacity={aA}>
                <g opacity={e1(t, M('honrar'))}>
                  <Persona id={ID} x={250} y={760} cuerpo="#334155" corbata />
                  <Gesto x={250} y={760} animo={0.4} />
                  <Etiqueta x={250} y={820} texto="David" op={1} c={c} id={ID} />
                  <Persona id={ID} x={950} y={760} cuerpo="#0e7490" />
                  <Gesto x={950} y={760} animo={0.1 + 0.5 * ac(t, M('aprecio'), M('aprecio') + 1)} />
                  <Etiqueta x={950} y={820} texto="Jeremy" op={1} c={c} id={ID} />
                </g>
                <g opacity={ventana(t, M('comparto') - 0.3, M('aprecio'))}>
                  <Burbuja x={280} y={560} w={520} texto="Comparto la responsabilidad: tardé en hablarte." u={ac(t, M('comparto') - 0.3, M('comparto') + 2)} c={c} id={ID} />
                </g>
                <g opacity={e1(t, M('aprecio') - 0.2)}>
                  <Burbuja x={280} y={560} w={460} texto="Te aprecio y te respeto." u={ac(t, M('aprecio') - 0.2, M('aprecio') + 1)} c={c} id={ID} marca />
                </g>
                <Chip x={950} y={290} texto="sin provocar" c={c} id={ID} op={e1(t, M('sinProvocar'))} />
              </g>
            )}

            {/* B · Elizabeth replantea su intención */}
            {aB > 0.01 && (
              <g opacity={aB}>
                {(() => {
                  const nivel = ac(t, M('sinPelear'), M('sinPelear') + 1.5);
                  return (
                    <g>
                      <Persona id={ID} x={250} y={760} cuerpo="#be185d" pelo="#5b3a26" />
                      <Gesto x={250} y={760} animo={0.4 + 0.3 * ac(t, M('cara'), M('cara') + 0.6)} />
                      <Etiqueta x={250} y={820} texto="Elizabeth" op={1} c={c} id={ID} />
                      <Persona id={ID} x={950} y={760} cuerpo="#334155" />
                      <Gesto x={950} y={760} animo={-0.3 + 0.8 * ac(t, M('cara'), M('cara') + 0.6)} />
                      <Etiqueta x={950} y={820} texto="Rafael" op={1} c={c} id={ID} />
                      <g opacity={ventana(t, M('entiendo') - 0.3, M('repasemos'))}>
                        <Burbuja x={280} y={560} w={540} texto="Entiendo cómo lo tomaste; no era lo que quise decir." u={ac(t, M('entiendo') - 0.3, M('entiendo') + 2.4)} c={c} id={ID} />
                      </g>
                      <g opacity={ventana(t, M('repasemos'), M('sinPelear'))}>
                        <Burbuja x={280} y={560} w={460} texto="Repasemos la lista." u={ac(t, M('repasemos'), M('repasemos') + 0.8)} c={c} id={ID} marca />
                        <Hoja x={800} y={430} w={200} h={220} c={c} cabeza={NARANJA} titulo="lista" llena={1} tituloTam={22} />
                      </g>
                      <g opacity={ventana(t, M('concedes'), M('sinPelear'))}>
                        {['concede', 'aclara', 'retoma'].map((txt, k) => <Chip key={txt} x={520} y={320} texto={txt} c={c} id={ID} op={ventana(t, M('concedes') + k * 2, M('concedes') + k * 2 + 2.2)} />)}
                      </g>
                      {/* la balanza nivelada: nadie gana, nadie pierde la cara */}
                      <g opacity={e1(t, M('sinPelear'))}>
                        <g transform={`translate(600 420) rotate(${12 * (1 - nivel) * Math.sin(t * 3)})`}>
                          <rect x={-220} y={-6} width={440} height={12} rx={6} fill={c.tenue} />
                          <rect x={-250} y={6} width={60} height={22} rx={6} fill={ROSA} />
                          <rect x={190} y={6} width={60} height={22} rx={6} fill="#334155" />
                        </g>
                        <path d="M 600 420 L 570 520 H 630 Z" fill={c.tenue} />
                        <Chip x={600} y={600} texto="nadie pierde la cara" c={c} id={ID} op={e1(t, M('cara'))} marca />
                      </g>
                    </g>
                  );
                })()}
              </g>
            )}

            {/* C · nombrar la táctica de Karen */}
            {aC > 0.01 && (
              <g opacity={aC}>
                {(() => {
                  const etiqueta = ac(t, M('nombrar'), M('nombrar') + 0.8);
                  const cae = ac(t, M('nombrar') + 0.8, M('nombrar') + 2);
                  return (
                    <g>
                      <Persona id={ID} x={250} y={760} cuerpo="#334155" corbata />
                      <Gesto x={250} y={760} animo={0.3} />
                      <Etiqueta x={250} y={820} texto="Nick" op={1} c={c} id={ID} />
                      <Persona id={ID} x={950} y={760} cuerpo="#be185d" pelo="#7c3f1d" />
                      <Gesto x={950} y={760} animo={-0.7 * (1 - cae) + 0.1 * cae} />
                      <Etiqueta x={950} y={820} texto="Karen" op={1} c={c} id={ID} />
                      {/* la táctica: una flecha roja que apunta a Nick */}
                      <g opacity={1 - 0.8 * cae} transform={`translate(${890 + 20 * Math.sin(t * 3) * (1 - cae)} ${420 + 340 * cae}) rotate(${70 * cae})`}>
                        <path d="M 150 0 H -150" stroke="#dc2626" strokeWidth={14} strokeLinecap="round" />
                        <path d="M -130 -30 L -180 0 L -130 30 Z" fill="#dc2626" />
                        <g opacity={etiqueta} transform={`translate(40 ${-60 + 30 * (1 - etiqueta)})`}>
                          <rect x={-90} y={-26} width={180} height={52} rx={10} fill={c.blanco} style={sombra(c.sombra, 3, 8)} />
                          <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>táctica</Txt>
                        </g>
                      </g>
                      <g opacity={ventana(t, M('trabajado') - 0.3, M('nombrar') + 1)}>
                        <Burbuja x={280} y={560} w={420} texto="No sé cómo hablarlo si lo ves tan distinto." u={ac(t, M('trabajado') - 0.3, M('distinta') + 1)} c={c} id={ID} marca />
                      </g>
                      <Chip x={600} y={300} texto="seguir exige más agresión" c={c} id={ID} op={e1(t, M('agresion'))} />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* D · Jacqueline y el chiste */}
            {aD > 0.01 && (
              <g opacity={aD}>
                {(() => {
                  const atras = ac(t, M('retrocedio'), M('retrocedio') + 1);
                  return (
                    <g>
                      {[460, 680].map((x, k) => (
                        <g key={x}>
                          <Persona id={ID} x={x} y={700} s={0.8} cuerpo={k ? '#475569' : '#1f2937'} corbata />
                          <Gesto x={x} y={700} s={0.8} animo={0.6 * ventana(t, M('chiste'), M('volvio'))} />
                        </g>
                      ))}
                      <g transform={`translate(${120 * atras} ${-10 * atras})`}>
                        <Persona id={ID} x={900} y={700} s={0.8 - 0.1 * atras} cuerpo="#334155" corbata />
                        <Gesto x={900} y={700} s={0.8 - 0.1 * atras} animo={0.6 - 0.8 * atras} />
                      </g>
                      <rect x={300} y={690} width={760} height={30} rx={12} fill={c.apagado} />
                      <rect x={330} y={720} width={700} height={100} fill={c.panel2} opacity={0.6} />
                      <Persona id={ID} x={200} y={780} cuerpo="#7c3aed" pelo="#3b2a20" />
                      <Gesto x={200} y={780} animo={0.2} />
                      <Etiqueta x={200} y={835} texto="Jacqueline" op={1} c={c} id={ID} />
                      <g opacity={ventana(t, M('chiste'), M('volvio'))} transform={`translate(0 ${-40 * ac(t, M('flotara'), M('volvio'))})`}>
                        <Burbuja x={880} y={500} w={300} texto="Ja, ja, ja…" u={1} c={c} lado="der" id={ID} />
                      </g>
                      <g opacity={ventana(t, M('volvio'), M('relegada') - 0.3)}>
                        <Hoja x={640} y={330} w={200} h={200} c={c} cabeza={NARANJA} titulo="agenda" llena={1} tituloTam={22} />
                      </g>
                      <g opacity={e1(t, M('relegada') - 0.3)}>
                        <Burbuja x={230} y={560} w={560} texto="Richard, a mí ese humor me hace sentir relegada." u={ac(t, M('relegada') - 0.6, M('relegada') + 1.4)} c={c} id={ID} marca />
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
