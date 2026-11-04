import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Ficha, Medidor, Sello, Visto, Cruz, e1, sm, ventana, lerp, azar, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Error 6: datos sin propósito.
 * Toma 1: el CRM como un depósito al que entran datos de todos lados; dos islas de canales que no se hablan.
 * Toma 2 (Reinares): un colador con tres medidores debajo —fidelidad, valor actual, valor a largo plazo—: los datos
 * que ayudan a estimarlos pasan; los demás rebotan.
 * Toma 3: la montaña de datos tapa a la persona que debería actuar; un ojo que espía y la desconfianza del cliente.
 * Toma 4: Safeway — el supermercado pionero de los noventa con su programa, la pila de información y el cartel de
 * programa cancelado; no supo convertirla en acciones individuales.
 */

const ID = 'cp16', P = 'cp-datos';

const Dato: React.FC<{ x: number; y: number; k: number; op?: number }> = ({ x, y, k, op = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${(azar(k) - 0.5) * 30})`} opacity={op}>
    <rect x={-22} y={-16} width={44} height={32} rx={6} fill={[NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR][k % 6]} />
    <rect x={-14} y={-8} width={22} height={5} rx={2} fill="#fff" opacity={0.7} /><rect x={-14} y={2} width={14} height={5} rx={2} fill="#fff" opacity={0.5} />
  </g>
);

export const DatosCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('deposito'), 'El CRM como depósito'], [m('canales'), 'Canales que no se hablan'], [m('tentacion'), 'Captar todo'], [m('consejo'), 'Solo lo que puedas utilizar'],
    [m('saturacion'), 'Saturación'], [m('espiados'), 'Clientes espiados'], [m('safeway'), 'El caso Safeway'], [m('habitual'), 'Una situación habitual'],
  ];
  const lleno = sm(t, m('deposito'), m('canales'));
  const MED: [string, string][] = [['fidelidad', 'Fidelidad'], ['actual', 'Valor actual'], ['largo', 'Largo plazo']];
  const monte = sm(t, m('saturacion'), m('montana') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Datos sin propósito">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el depósito y las islas */}
      <Toma t={t} a={0} b={m('tentacion')} cy={500}>
        {ventana(t, 0, m('canales')) > 0.01 && (
          <g opacity={ventana(t, 0, m('canales'))}>
            <g transform="translate(600 720)">
              <path d="M -200 0 V -260 L 0 -360 L 200 -260 V 0 Z" fill={GRIS} />
              <rect x={-160} y={-240} width={320} height={240} rx={10} fill={isDark ? '#1f2937' : '#e5e7eb'} />
              <rect x={-160} y={-240 * lleno} width={320} height={240 * lleno} rx={10} fill={AMBAR} opacity={0.7} />
              <Txt x={0} y={-290} textAnchor="middle" fontSize={34} fill="#fff">CRM</Txt>
            </g>
            {Array.from({ length: 10 }, (_, k) => { const u = ((t - m('deposito')) * 0.5 + k / 10) % 1; const lado = k % 2 ? 1 : -1; return <Dato key={k} k={k} x={600 + lado * lerp(520, 80, u)} y={lerp(200 + (k % 3) * 80, 560, u)} op={1 - u * 0.4} />; })}
          </g>
        )}
        {t >= m('canales') && (
          <g opacity={e1(t, m('canales'))}>
            {[[300, 'Tienda'], [900, 'Correo']].map(([x, n], k) => (
              <g key={k} transform={`translate(${x} ${520 + 8 * Math.sin(t * 1.5 + k)})`}>
                <ellipse cx={0} cy={60} rx={220} ry={50} fill={isDark ? '#0c4a6e' : '#7dd3fc'} />
                <ellipse cx={0} cy={30} rx={170} ry={50} fill={VERDE} />
                <Persona id={ID} x={0} y={30} s={0.55} cuerpo={k ? AZUL_M : NARANJA} />
                <Txt f="a" x={0} y={150} textAnchor="middle" fontSize={28} fill={c.texto}>{n}</Txt>
              </g>
            ))}
            <Cruz x={600} y={520} r={34} />
          </g>
        )}
      </Toma>

      {/* 2 · el colador de Reinares */}
      <Toma t={t} a={m('tentacion')} b={m('saturacion')} cy={480}>
        <path d="M 300 300 H 900 L 760 420 H 440 Z" fill={GRIS} opacity={e1(t, m('tentacion'))} />
        {Array.from({ length: 8 }, (_, k) => <circle key={k} cx={480 + k * 34} cy={400} r={6} fill={isDark ? '#1b1b1b' : '#f5f6f8'} opacity={e1(t, m('tentacion'))} />)}
        {t >= m('toda') && Array.from({ length: 9 }, (_, k) => {
          const u = ((t - m('toda')) * 0.45 + k / 9) % 1;
          const pasa = t >= m('consejo') && k % 3 === 0;
          const x = 360 + ((k * 61) % 480), y = pasa ? lerp(150, 560, u) : lerp(150, 330, Math.min(1, u * 2)) - (u > 0.5 ? 200 * (u - 0.5) : 0);
          const xx = pasa ? lerp(x, 600, u) : x + (u > 0.5 ? (k % 2 ? 1 : -1) * 500 * (u - 0.5) : 0);
          return <Dato key={k} k={k} x={xx} y={y} op={pasa ? 1 : 1 - Math.max(0, u - 0.6) * 2} />;
        })}
        {MED.map(([n, rot2], k) => (
          <g key={n} opacity={e1(t, m(n))}>
            <Medidor x={300 + k * 300} y={680} r={90} v={0.3 + 0.2 * k + 0.1 * Math.sin(t + k)} color={[ROSA, NARANJA, VIOLETA][k]} c={c} />
            <Txt f="a" x={300 + k * 300} y={740} textAnchor="middle" fontSize={28} fill={c.texto}>{rot2}</Txt>
          </g>
        ))}
        {t >= m('consejo') && <Letrero x={600} y={812} texto="Si no ayuda a estimar el valor, sobra" id={ID} tam={26} op={e1(t, m('consejo') + 0.5)} />}
      </Toma>

      {/* 3 · la montaña y la desconfianza */}
      <Toma t={t} a={m('saturacion')} b={m('safeway')} cy={480}>
        <Persona id={ID} x={740} y={760} s={0.9} cuerpo={VIOLETA} />
        {Array.from({ length: 40 }, (_, k) => {
          const f = Math.floor(Math.sqrt(k * 2)), base = 760 - f * 40;
          const on = k / 40 < monte;
          return on && <Dato key={k} k={k} x={600 + ((k * 53) % (260 - f * 20)) - (130 - f * 10) + 140} y={base} />;
        })}
        {t >= m('montana') && <Letrero x={400} y={300} texto="No puede actuar" fondo={GRIS} id={ID} tam={28} op={e1(t, m('montana'))} />}
        {t >= m('espiados') && (
          <g opacity={e1(t, m('espiados'))}>
            <g transform="translate(1000 300)"><ellipse rx={84} ry={44} fill="#334155" /><ellipse rx={76} ry={36} fill="#f1f5f9" /><circle r={28} fill={AZUL_M} /><circle r={13} fill="#0f172a" /><circle cx={9} cy={-9} r={7} fill="#fff" /></g>
            <Persona id={ID} x={1000} y={760} s={0.8} cuerpo={ROSA} />
          </g>
        )}
        {t >= m('desconfianza') && <Letrero x={1000} y={450} texto="Desconfianza" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('desconfianza'))} />}
      </Toma>

      {/* 4 · Safeway */}
      <Toma t={t} a={m('safeway')} b={fin + 1} cy={480}>
        <g transform="translate(360 700)" opacity={e1(t, m('safeway'))}>
          <rect x={-240} y={-260} width={480} height={260} rx={12} fill={isDark ? '#7f1d1d' : '#b91c1c'} />
          <rect x={-240} y={-320} width={480} height={70} rx={12} fill="#fff" />
          <Txt x={0} y={-272} textAnchor="middle" fontSize={40} fill="#b91c1c">Safeway</Txt>
          {[-150, 0, 150].map((x) => <rect key={x} x={x - 50} y={-200} width={100} height={130} rx={8} fill="#fde68a" opacity={0.85} />)}
          <rect x={-40} y={-90} width={80} height={90} rx={6} fill="#450a0a" />
        </g>
        {t >= m('noventa') && <Letrero x={360} y={300} texto="Pionero a inicios de los noventa" fondo={GRIS} id={ID} tam={26} op={e1(t, m('noventa')) * (1 - sm(t, m('cancelo'), m('cancelo') + 0.4))} />}
        {t >= m('safeway') && Array.from({ length: 18 }, (_, k) => <Dato key={k} k={k} x={760 + (k % 6) * 60} y={700 - Math.floor(k / 6) * 44 - 30 * Math.floor(k / 6) * sm(t, m('safeway'), m('cancelo'))} op={e1(t, m('safeway') + 0.05 * k)} />)}
        {t >= m('cancelo') && <Sello x={360} y={300} texto="CANCELADO" u={sm(t, m('cancelo'), m('cancelo') + 0.6)} />}
        {t >= m('acciones') && <Letrero x={600} y={812} texto="Mucha información, ninguna acción individual" id={ID} tam={26} op={e1(t, m('acciones'))} />}
      </Toma>
    </Lienzo>
  );
};
