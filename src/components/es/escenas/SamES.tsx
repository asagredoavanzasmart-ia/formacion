import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Edificio, Propuesta, Visto, Cruz, Burbuja, Curva, Fajo, Suelo, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Sam Elliot, el ejecutivo que dijo que no.
 * Toma 1: la empresa chica absorbida por la grande; Sam en su escritorio y los pedidos que se apilan (sí a todo);
 * dos barras: estrés sube, calidad baja; el mentor con el consejo.
 * Toma 2: dos filtros en fila (la pregunta tímida y la estricta): los pedidos rebotan y solo pasa el sí rotundo; la
 * agenda pierde la reunión semanal y las juntas a las que solo estaba invitado; los colegas pasan de la decepción al respeto.
 * Toma 3: la evaluación que sube y el bono.
 */

const ID = 'es01', P = 'es-sam';

const Escritorio: React.FC<{ x: number; y: number; c: ReturnType<typeof tono> }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-78} width={300} height={22} rx={8} fill="#a16b3f" />
    <rect x={-136} y={-56} width={18} height={56} fill="#8b5a2b" /><rect x={118} y={-56} width={18} height={56} fill="#8b5a2b" />
    <ellipse cx={0} cy={4} rx={170} ry={10} fill="#000" opacity={0.12} />
  </g>
);

export const SamES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('sam'), 'Sam Elliot'], [m('todo'), 'Sí a todo'], [m('estres'), 'Más estrés, menos calidad'], [m('consejo'), 'El consejo del mentor'],
    [m('timida'), 'Primer filtro'], [m('estricta'), 'Un filtro más estricto'], [m('reunion'), 'Menos reuniones'], [m('colegas'), 'De la decepción al respeto'],
    [m('evaluacion'), 'Mejor evaluación'], [m('idea'), 'Lo que de verdad importa'],
  ];
  const pila = Math.min(6, Math.floor(Math.max(0, t - m('todo')) * 2.2));
  const estres = sm(t, m('todo'), m('jubilarse'));
  const AGENDA = ['Reunión semanal', 'Llamada', 'Junta (invitado)', 'Proyecto clave', 'Junta (invitado)', 'Proyecto clave'];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El ejecutivo que dijo que no">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · sí a todo */}
      <Toma t={t} a={0} b={m('timida')} cy={500}>
        <Suelo y={720} isDark={isDark} x0={120} x1={1080} />
        {ventana(t, m('comprada') - 0.2, m('todo') + 0.5) > 0.01 && (
          <g opacity={ventana(t, m('comprada') - 0.2, m('todo') + 0.5)}>
            <Edificio x={980} y={720} w={180} h={330} color="#475569" />
            <g transform={`translate(${lerp(760, 960, sm(t, m('comprada') + 0.6, m('comprada') + 2))} 0)`} opacity={1 - sm(t, m('comprada') + 1.6, m('comprada') + 2.2)}><Edificio x={0} y={720} w={110} h={170} color={NARANJA} /></g>
          </g>
        )}
        <Persona id={ID} x={420} y={720} s={1.05} cuerpo={NARANJA} ojos={1 - 0.6 * estres} />
        <Escritorio x={420} y={720} c={c} />
        {Array.from({ length: pila }, (_, k) => <Propuesta key={k} x={360 + (azar(k) - 0.5) * 30} y={630 - k * 14} s={0.42} rot={(azar(k + 3) - 0.5) * 16} />)}
        {t >= m('todo') && t < m('jubilarse') && [0, 1].map((k) => { const u = ((t - m('todo')) * 0.55 + k / 2) % 1; return <Propuesta key={`v${k}`} x={lerp(1100, 380, u)} y={lerp(300 + k * 80, 600, u) - 80 * Math.sin(Math.PI * u)} s={0.42} rot={u * 40} op={1 - u * 0.3} />; })}
        {t >= m('sam') && <g opacity={e1(t, m('sam'))}><Letrero x={420} y={790} texto="Sam Elliot" fondo={GRIS} id={ID} tam={28} /></g>}
        {t >= m('estres') && (
          <g opacity={e1(t, m('estres'))}>
            {[['Estrés', estres, ROJO_M], ['Calidad', 1 - estres * 0.75, VERDE]].map(([n, v, col], k) => (
              <g key={n as string} transform={`translate(${760 + k * 150} 620)`}>
                <rect x={-40} y={-260} width={80} height={260} rx={14} fill={c.apagado} />
                <rect x={-40} y={-260 * (v as number)} width={80} height={260 * (v as number)} rx={14} fill={col as string} />
                <Txt x={0} y={44} textAnchor="middle" fontSize={30} fill={c.texto}>{n as string}</Txt>
              </g>
            ))}
          </g>
        )}
        {t >= m('consejo') && (
          <g opacity={e1(t, m('consejo'))}>
            <Persona id={ID} x={180} y={720} s={1} cuerpo={VIOLETA} pelo="#9ca3af" />
            <Burbuja x={200} y={520} w={520} texto="Haz solo lo que harías como asesor" u={sm(t, m('consejo'), m('consejo') + 1.6)} c={c} id={ID} tam={34} />
          </g>
        )}
      </Toma>

      {/* 2 · dos filtros, agenda y colegas */}
      <Toma t={t} a={m('timida')} b={m('evaluacion')} cy={480}>
        {ventana(t, m('timida') - 0.1, m('reunion')) > 0.01 && (
          <g opacity={ventana(t, m('timida') - 0.1, m('reunion'))}>
            {[['timida', '¿Puedo cumplirlo?', 420], ['estricta', '¿Es lo más importante?', 760]].map(([n, txt, x]) => (
              <g key={n as string} opacity={e1(t, m(n as string))}>
                <rect x={(x as number) - 16} y={260} width={32} height={420} rx={16} fill={n === 'timida' ? AZUL_M : ROSA} />
                <Txt x={x as number} y={240} textAnchor="middle" fontSize={30} fill={c.texto}>{txt as string}</Txt>
              </g>
            ))}
            {Array.from({ length: 6 }, (_, k) => {
              const u = ((t - m('timida')) * 0.32 + k / 6) % 1;
              const pasa1 = k % 2 === 0, pasa2 = k === 0;
              const fuerte = t >= m('estricta');
              const corte = !pasa1 ? 0.35 : fuerte && !pasa2 ? 0.7 : 2;
              const x = lerp(140, 1100, Math.min(u, corte));
              const cae = Math.max(0, u - corte) * 900;
              return (
                <g key={k} opacity={1 - Math.max(0, u - corte) * 2.5}>
                  <Propuesta x={x} y={330 + (k % 3) * 120 + cae} s={0.8} />
                  {u > corte && <Cruz x={x + 40} y={300 + (k % 3) * 120} r={20} />}
                  {u > 0.85 && corte > 1 && <Visto x={x + 40} y={300 + (k % 3) * 120} r={20} />}
                </g>
              );
            })}
            {t >= m('rotundo') && <Letrero x={600} y={760} texto="Si no es un sí rotundo, es un no" id={ID} tam={30} op={e1(t, m('rotundo'))} />}
          </g>
        )}
        {t >= m('reunion') && (
          <g opacity={e1(t, m('reunion')) * (1 - sm(t, m('colegas') - 0.3, m('colegas') + 0.3))}>
            <rect x={300} y={170} width={600} height={540} rx={24} fill={c.panel} />
            <rect x={300} y={170} width={600} height={64} rx={24} fill={NARANJA} />
            <Txt x={600} y={214} textAnchor="middle" fontSize={32} fill="#fff">Agenda de Sam</Txt>
            {AGENDA.map((a, k) => {
              const tacha = (k === 0 && t >= m('reunion') + 0.6) || (a.includes('invitado') && t >= m('invitado'));
              return (
                <g key={k} opacity={tacha ? 0.45 : 1}>
                  <rect x={340} y={260 + k * 72} width={520} height={56} rx={12} fill={a.includes('clave') ? VERDE : AZUL_M} opacity={0.85} />
                  <Txt x={364} y={298 + k * 72} fontSize={28} fill="#fff">{a}</Txt>
                  {tacha && <rect x={334} y={286 + k * 72} width={532} height={6} rx={3} fill={ROJO_M} />}
                </g>
              );
            })}
          </g>
        )}
        {t >= m('colegas') && (
          <g opacity={e1(t, m('colegas'))}>
            {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={360 + k * 240} y={700} s={0.95} cuerpo={[AZUL_M, VIOLETA, ROSA][k]} ojos={t >= m('colegas') + 1.6 ? 1 : 0.5} />)}
            <Letrero x={600} y={300} texto={t >= m('colegas') + 1.6 ? 'Respeto' : 'Decepción'} fondo={t >= m('colegas') + 1.6 ? VERDE : GRIS} id={ID} tam={34} />
          </g>
        )}
      </Toma>

      {/* 3 · evaluación y bono */}
      <Toma t={t} a={m('evaluacion')} b={fin + 1} cy={480}>
        <rect x={160} y={220} width={560} height={420} rx={24} fill={c.panel} opacity={e1(t, m('evaluacion'))} />
        <Curva pts={[[200, 590], [320, 560], [440, 470], [560, 360], [680, 260]]} u={sm(t, m('evaluacion'), m('evaluacion') + 1.5)} color={VERDE} grosor={12} />
        <Txt x={440} y={690} textAnchor="middle" fontSize={30} fill={c.texto} opacity={e1(t, m('evaluacion'))}>Evaluación de desempeño</Txt>
        {t >= m('bono') && <g opacity={e1(t, m('bono'))}><g transform={`translate(920 ${600 - 20 * sm(t, m('bono'), m('bono') + 0.6)})`}><Fajo x={0} y={0} n={8} w={200} /></g><Txt x={920} y={690} textAnchor="middle" fontSize={30} fill={c.texto}>El mayor bono</Txt></g>}
        {t >= m('idea') && <Letrero x={600} y={780} texto="Hacer menos, contribuir más" id={ID} tam={32} op={e1(t, m('idea'))} />}
        {!movil && t >= m('evaluacion') && <Txt f="a" x={440} y={200} textAnchor="middle" fontSize={22} fill={c.tenue}>Caso contado por McKeown</Txt>}
      </Toma>
    </Lienzo>
  );
};
