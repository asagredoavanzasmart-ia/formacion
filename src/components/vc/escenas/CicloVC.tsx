import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Txt, Persona, Reloj, Edificio, Visto, Cruz, e1, sm, lerp, ventana, tono, sombra, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS, ROJO_M } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Ciclo normal de ventas.
 * 1 · Un camino medido con cinta: un desconocido gris avanza y llega como cliente recurrente (una vuelta que se repite).
 *     La fórmula: cinco barras de tiempo se suman en una sola y se dividen en partes iguales. Dos reglas: de 3 a 9 meses
 *     ronda los 6; de 10 a 20 semanas ronda las 15.
 * 2 · Cinco estaciones sobre la mesa de trabajo: recopilación (un calendario de 24 meses deja caer las ventas en una
 *     caja), medición (cada venta es una barra del teléfono a la firma), depuración (la renovación automática y la
 *     venta relámpago de 2 días salen), resultado (la línea del promedio) y aplicación (pronóstico de ingresos, la
 *     tarjeta que avanza de etapa a tiempo y el «Cerrado» anticipado que se tacha).
 * 3 · Michael Pearce: qué información importa en cada etapa y cuántos contactos hacen falta antes de comprar.
 */

const ID = 'vc21', P = 'vc-ciclo';

const Fono: React.FC<{ x: number; y: number; s?: number; color?: string; op?: number }> = ({ x, y, s = 1, color = AZUL_M, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
    <circle r={18} fill={color} />
    <path d="M -8 -8 Q -10 0 -2 8 Q 6 14 10 8 L 6 4 Q 2 6 -2 2 Q -6 -2 -4 -6 Z" fill="#fff" />
  </g>
);
const Pluma: React.FC<{ x: number; y: number; s?: number; op?: number }> = ({ x, y, s = 1, op = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(-40)`} opacity={op}>
    <rect x={-4} y={-22} width={8} height={30} rx={3} fill={VIOLETA} /><path d="M -4 8 L 0 18 L 4 8 Z" fill="#334155" />
  </g>
);

export const CicloVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('ciclo'), 'El ciclo normal de ventas'], [m('desconocido'), 'De desconocido a cliente recurrente'], [m('formula'), 'Tiempo total ÷ ventas reales'],
    [m('meses'), 'De 3 a 9 meses…'], [m('semanas'), '…o de 10 a 20 semanas'], [m('fases'), 'Cinco fases'], [m('recopilacion'), '1 · Recopilación'],
    [m('medicion'), '2 · Medición'], [m('depuracion'), '3 · Depuración'], [m('resultado'), '4 · Resultado'], [m('aplicacion'), '5 · Aplicación'],
    [m('predices'), 'Predices ingresos'], [m('mover'), 'Avanza de etapa a tiempo'], [m('antes'), 'Sin cerrar antes de tiempo'], [m('pearce'), 'Michael Pearce'],
    [m('informacion'), '¿Qué información en cada etapa?'], [m('contactar'), '¿Cuántos contactos antes de comprar?'],
  ];

  /* 1 · el camino */
  const viaje = sm(t, m('ciclo') + 0.4, m('desconocido') + 1.6);
  const xV = lerp(220, 980, viaje);
  const color = viaje >= 1 ? NARANJA : GRIS;
  const L = [111, 185, 148, 222, 135];
  const suma = sm(t, m('formula') + 0.8, m('formula') + 2.2);
  const divide = sm(t, m('formula') + 2.6, m('formula') + 3.6);

  /* 2 · estaciones */
  const FASES = ['recopilacion', 'medicion', 'depuracion', 'resultado', 'aplicacion'];
  let fase = -1;
  FASES.forEach((a, k) => { if (t >= m(a)) fase = k; });
  const BARRAS = [340, 640, 420, 300, 46, 380];
  const fuera = (k: number) => (k === 1 || k === 4) ? sm(t, m('dosdias') + 1.2, m('dosdias') + 2.2) : 0;
  const prom = 368;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Ciclo normal de ventas">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el ciclo, la fórmula y las reglas */}
      <Toma t={t} a={0} b={m('fases')} cy={470}>
        <rect x={180} y={320} width={840} height={14} rx={7} fill={c.apagado} />
        <rect x={180} y={320} width={(xV - 180)} height={14} rx={7} fill={AMBAR} opacity={0.85} />
        {Array.from({ length: Math.floor((xV - 180) / 40) }, (_, k) => <rect key={k} x={200 + k * 40} y={320} width={3} height={k % 5 === 4 ? 14 : 8} fill="#92400e" />)}
        <Persona id={ID} x={150} y={320} s={0.62} cuerpo={GRIS} />
        <Persona id={ID} x={xV} y={316} s={0.62} cuerpo={color} />
        <Reloj x={600} y={180} r={34} t={t * (viaje < 1 ? 5 : 0)} aro={viaje < 1 ? NARANJA : VERDE} />
        {t >= m('desconocido') && (
          <g opacity={e1(t, m('desconocido'))}>
            <Txt x={150} y={372} textAnchor="middle" fontSize={22} fill={c.tenue}>{movil ? '¿?' : 'Desconocido'}</Txt>
            <Edificio x={1070} y={330} w={56} h={86} color={AZUL_M} />
            {viaje >= 1 && (
              <g transform={`translate(${xV} 260) rotate(${t * 160})`} opacity={sm(t, m('desconocido') + 1.6, m('desconocido') + 2)}>
                <path d="M 0 -44 A 44 44 0 1 1 -38 22" stroke={VERDE} strokeWidth={6} fill="none" strokeLinecap="round" />
                <path d="M -46 12 L -38 26 L -26 16" stroke={VERDE} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
          </g>
        )}
        {t >= m('formula') && t < m('meses') && (
          <g opacity={ventana(t, m('formula'), m('meses'))}>
            {L.map((w, k) => {
              const x0 = 200, y0 = 430 + k * 40;
              const xs = 200 + L.slice(0, k).reduce((a, b) => a + b, 0);
              const x = lerp(x0, xs, suma), y = lerp(y0, 560, suma);
              return <rect key={k} x={x} y={y} width={w} height={28} rx={8} fill={[AZUL_M, VERDE, AMBAR, VIOLETA, TEAL][k]} opacity={0.9} />;
            })}
            {divide > 0.01 && Array.from({ length: 4 }, (_, k) => <line key={k} x1={200 + 160 * (k + 1)} y1={540} x2={200 + 160 * (k + 1)} y2={608} stroke={c.texto} strokeWidth={4} strokeDasharray="6 6" opacity={divide} />)}
            {divide > 0.01 && <rect x={200} y={552} width={160} height={44} rx={10} fill="none" stroke={NARANJA} strokeWidth={5} opacity={divide} />}
            {divide > 0.5 && <Txt x={280} y={650} textAnchor="middle" fontSize={26} fill={NARANJA} opacity={divide}>Ciclo normal</Txt>}
            {[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={sm(t, m('formula') + 2.6 + 0.15 * k, m('formula') + 2.9 + 0.15 * k)} transform={`translate(${760 + k * 56} 440)`}><rect x={-20} y={-26} width={40} height={52} rx={5} fill={c.panel} style={sombra(c.sombra, 2, 5)} /><rect x={-12} y={-14} width={24} height={5} rx={2} fill={GRIS} /><rect x={-12} y={-4} width={18} height={5} rx={2} fill={GRIS} /><path d="M -10 14 q 6 -6 10 0 q 4 6 10 -2" stroke={VIOLETA} strokeWidth={3} fill="none" /></g>)}
          </g>
        )}
        {t >= m('meses') && [0, 1].map((k) => {
          const on = t >= m(k ? 'semanas' : 'meses');
          if (!on) return null;
          const y = 470 + k * 180, max = k ? 25 : 12, a = k ? 10 : 3, b = k ? 20 : 9, med = k ? 15 : 6;
          const X = (v: number) => 220 + (v / max) * 760;
          const u = sm(t, m(k ? 'quince' : 'seis'), m(k ? 'quince' : 'seis') + 0.6);
          return (
            <g key={k} opacity={e1(t, m(k ? 'semanas' : 'meses'))}>
              <Txt x={200} y={y + 10} textAnchor="end" fontSize={24} fill={c.tenue}>{k ? 'Semanas' : 'Meses'}</Txt>
              <rect x={220} y={y - 10} width={760} height={20} rx={10} fill={c.panel2} />
              {Array.from({ length: max + 1 }, (_, j) => <rect key={j} x={X(j) - 1.5} y={y - (j % (k ? 5 : 3) === 0 ? 18 : 10)} width={3} height={j % (k ? 5 : 3) === 0 ? 36 : 20} fill={c.tenue} opacity={0.6} />)}
              <rect x={X(a)} y={y - 10} width={(X(b) - X(a)) * sm(t, m(k ? 'semanas' : 'meses') + 0.2, m(k ? 'semanas' : 'meses') + 1)} height={20} rx={10} fill={AZUL_M} opacity={0.55} />
              {u > 0 && (
                <g opacity={u} transform={`translate(${X(med)} ${y})`}>
                  <path d="M 0 -22 L -14 -46 L 14 -46 Z" fill={NARANJA} />
                  <Txt x={0} y={-58} textAnchor="middle" fontSize={28} fill={NARANJA}>{k ? '≈ 15' : '≈ 6'}</Txt>
                </g>
              )}
              <Txt x={X(a)} y={y + 50} textAnchor="middle" fontSize={22} fill={c.texto}>{a}</Txt>
              <Txt x={X(b)} y={y + 50} textAnchor="middle" fontSize={22} fill={c.texto}>{b}</Txt>
            </g>
          );
        })}
      </Toma>

      {/* 2 · las cinco fases */}
      <Toma t={t} a={m('fases')} b={m('pearce')} cy={470}>
        <line x1={200} y1={190} x2={1000} y2={190} stroke={c.apagado} strokeWidth={6} />
        <line x1={200} y1={190} x2={200 + 200 * Math.max(0, fase)} y2={190} stroke={NARANJA} strokeWidth={6} />
        {FASES.map((a, k) => {
          const on = k <= fase, act = k === fase;
          return (
            <g key={a} opacity={e1(t, m('fases') + 0.15 * k)} transform={`translate(${200 + 200 * k} 190) scale(${act ? 1.12 + 0.04 * Math.sin(t * 4) : 1})`}>
              <circle r={30} fill={on ? `url(#${ID}-marca)` : c.panel2} style={sombra(c.sombra, 2, 6)} />
              <Txt x={0} y={10} textAnchor="middle" fontSize={28} fill={on ? '#fff' : c.tenue}>{k + 1}</Txt>
              {!movil && <Txt x={0} y={66} textAnchor="middle" fontSize={22} fill={act ? NARANJA : c.tenue}>{['Recopilar', 'Medir', 'Depurar', 'Promediar', 'Aplicar'][k]}</Txt>}
            </g>
          );
        })}

        {/* recopilación */}
        {fase === 0 && (
          <g opacity={ventana(t, m('recopilacion'), m('medicion'))}>
            {Array.from({ length: 24 }, (_, k) => <rect key={k} x={192 + k * 34} y={300} width={30} height={30} rx={6} fill={t >= m('recopilacion') + 0.08 * k ? AZUL_M : c.panel2} opacity={t >= m('recopilacion') + 0.08 * k ? 0.75 : 1} />)}
            <Txt x={600} y={372} textAnchor="middle" fontSize={24} fill={c.texto}>{movil ? '12 a 24 meses' : 'Ventas cerradas: últimos 12 a 24 meses'}</Txt>
            <path d="M 470 640 L 490 760 L 710 760 L 730 640 Z" fill="#b45309" /><path d="M 460 640 L 740 640 L 720 660 L 480 660 Z" fill="#92400e" />
            {Array.from({ length: 8 }, (_, k) => {
              const t0 = m('recopilacion') + 1.6 + 0.45 * k, u = sm(t, t0, t0 + 0.8);
              if (u <= 0) return null;
              const x = lerp(240 + k * 100, 560 + (k % 4) * 26, u), y = lerp(330, 640 - Math.floor(k / 4) * 10, u) - 60 * Math.sin(Math.PI * u);
              return <g key={k} transform={`translate(${x} ${y}) rotate(${(1 - u) * (k % 2 ? 30 : -30)})`}><rect x={-18} y={-24} width={36} height={46} rx={4} fill={c.panel} style={sombra(c.sombra, 2, 4)} /><rect x={-10} y={-14} width={20} height={4} rx={2} fill={GRIS} /><rect x={-10} y={-5} width={14} height={4} rx={2} fill={GRIS} /><path d="M -9 12 q 5 -6 9 0 q 4 6 9 -2" stroke={VIOLETA} strokeWidth={3} fill="none" /></g>;
            })}
          </g>
        )}

        {/* medición, depuración y resultado: las barras de cada venta */}
        {fase >= 1 && fase <= 3 && (
          <g opacity={ventana(t, m('medicion'), m('aplicacion'))}>
            {BARRAS.map((w, k) => {
              const y = 330 + k * 66;
              const crece = sm(t, m('medicion') + 0.2 * k, m('medicion') + 1 + 0.2 * k);
              const anomala = k === 1 || k === 4;
              const roja = anomala && t >= (k === 1 ? m('depuracion') + 0.5 : m('relampago') + 0.3);
              const f = fuera(k);
              return (
                <g key={k} opacity={1 - f} transform={`translate(${360 * f} ${80 * f})`}>
                  <rect x={260} y={y - 14} width={w * crece} height={28} rx={14} fill={roja ? ROJO_M : AZUL_M} opacity={0.85} />
                  {t >= m('primer') && <Fono x={240} y={y} s={0.9} op={e1(t, m('primer') + 0.12 * k)} />}
                  {t >= m('firma') && <Pluma x={260 + w + 18} y={y + 4} op={e1(t, m('firma') + 0.12 * k)} />}
                  {roja && k === 1 && <g transform={`translate(${260 + w + 60} ${y}) rotate(${t * 140})`}><path d="M 0 -14 A 14 14 0 1 1 -12 7" stroke={ROJO_M} strokeWidth={4} fill="none" /></g>}
                  {roja && k === 4 && <path d={`M ${340} ${y - 18} l -10 18 h 10 l -8 18`} stroke={AMBAR} strokeWidth={5} fill="none" strokeLinejoin="round" />}
                  {k === 4 && t >= m('dosdias') && <Txt x={380} y={y + 9} fontSize={24} fill={ROJO_M} opacity={e1(t, m('dosdias'))}>2 días</Txt>}
                </g>
              );
            })}
            {t >= m('dosdias') && t < m('dosdias') + 2.4 && <line x1={260 + prom} y1={300} x2={260 + prom} y2={720} stroke={c.tenue} strokeWidth={3} strokeDasharray="8 8" opacity={ventana(t, m('dosdias'), m('dosdias') + 2.4)} />}
            {t >= m('resultado') && (() => {
              const u = sm(t, m('resultado') + 0.3, m('resultado') + 1.6);
              return (
                <g opacity={e1(t, m('resultado'))}>
                  <line x1={260 + prom * u} y1={290} x2={260 + prom * u} y2={730} stroke={NARANJA} strokeWidth={6} />
                  <circle cx={260 + prom * u} cy={290} r={10} fill={NARANJA} />
                  {u >= 1 && <Txt x={260 + prom + 20} y={770} fontSize={28} fill={NARANJA} opacity={sm(t, m('resultado') + 1.6, m('resultado') + 2)}>≈ 6 meses</Txt>}
                </g>
              );
            })()}
          </g>
        )}

        {/* aplicación */}
        {fase === 4 && (
          <g opacity={e1(t, m('aplicacion'))}>
            <rect x={120} y={320} width={480} height={400} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <line x1={160} y1={660} x2={560} y2={660} stroke={c.apagado} strokeWidth={4} />
            {[0.35, 0.5, 0.42, 0.6, 0.7, 0.82].map((v, k) => {
              const fut = k >= 3;
              const u = fut ? sm(t, m('predices') + 0.3 * (k - 3), m('predices') + 0.8 + 0.3 * (k - 3)) : 1;
              return <rect key={k} x={176 + k * 64} y={660 - 260 * v * u} width={42} height={260 * v * u} rx={8} fill={fut ? 'none' : AZUL_M} stroke={fut ? VERDE : 'none'} strokeWidth={4} strokeDasharray={fut ? '8 6' : undefined} />;
            })}
            <Txt x={360} y={700} textAnchor="middle" fontSize={24} fill={c.texto}>Ingresos</Txt>
            <g transform="translate(660 320)">
              {[0, 1, 2].map((k) => <rect key={k} x={k * 150} y={0} width={136} height={400} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} />)}
              {['Etapa 1', 'Etapa 2', 'Etapa 3'].map((n, k) => !movil && <Txt key={n} x={68 + k * 150} y={40} textAnchor="middle" fontSize={22} fill={c.tenue}>{n}</Txt>)}
              {(() => {
                const u = sm(t, m('mover') + 1.4, m('mover') + 2.2);
                const x = 68 + 150 * u;
                return (
                  <g transform={`translate(${x} 180) rotate(${6 * Math.sin(Math.PI * u)})`}>
                    <rect x={-54} y={-50} width={108} height={100} rx={12} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
                    <Reloj x={0} y={-6} r={26} t={t * (u < 1 ? 4 : 0)} aro={u >= 1 ? VERDE : NARANJA} />
                    {u >= 1 && <Visto x={40} y={-42} r={14} />}
                  </g>
                );
              })()}
              {t >= m('antes') && (() => {
                const u = sm(t, m('antes'), m('antes') + 0.5);
                return (
                  <g opacity={u} transform={`translate(368 320) rotate(-10) scale(${lerp(1.5, 1, u)})`}>
                    <rect x={movil ? -96 : -62} y={movil ? -34 : -24} width={movil ? 192 : 124} height={movil ? 68 : 48} rx={10} fill={c.panel} stroke={VERDE} strokeWidth={4} />
                    <Txt x={0} y={movil ? 15 : 9} textAnchor="middle" fontSize={22} fill={VERDE}>Cerrado</Txt>
                    <Cruz x={movil ? 84 : 50} y={movil ? -36 : -26} r={18} op={sm(t, m('antes') + 0.5, m('antes') + 0.9)} />
                  </g>
                );
              })()}
            </g>
          </g>
        )}
      </Toma>

      {/* 3 · Michael Pearce */}
      <Toma t={t} a={m('pearce')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('pearce'))} transform={`translate(260 420) rotate(${-5 + 2 * Math.sin(t * 1.4)})`}>
          <rect x={-90} y={-120} width={180} height={240} rx={10} fill={isDark ? '#7c2d12' : '#9a3412'} style={sombra(0.3, 5, 12)} />
          <rect x={-90} y={-120} width={22} height={240} rx={5} fill="#000" opacity={0.25} />
          <Txt x={10} y={-30} textAnchor="middle" fontSize={44} fill="#fff">CRM</Txt>
          <rect x={-46} y={-4} width={110} height={8} rx={4} fill="#fff" opacity={0.7} /><rect x={-46} y={12} width={80} height={8} rx={4} fill="#fff" opacity={0.5} />
          <Txt x={10} y={90} textAnchor="middle" fontSize={22} fill="#fff">Pearce</Txt>
        </g>
        {t >= m('informacion') && (
          <g opacity={e1(t, m('informacion'))}>
            {[0, 1, 2, 3].map((k) => {
              const x = 480 + k * 165;
              return (
                <g key={k}>
                  <rect x={x} y={260} width={150} height={360} rx={18} fill={c.panel2} />
                  <circle cx={x + 75} cy={300} r={20} fill={`url(#${ID}-marca)`} />
                  <Txt x={x + 75} y={308} textAnchor="middle" fontSize={22} fill="#fff">{k + 1}</Txt>
                  {Array.from({ length: [2, 3, 3, 2][k] }, (_, j) => {
                    const t0 = m('informacion') + 0.4 + 0.25 * (k * 3 + j), u = e1(t, t0);
                    return <rect key={j} x={x + 18} y={350 + j * 62 - 20 * (1 - u)} width={114} height={46} rx={12} fill={[AZUL_M, VERDE, AMBAR, VIOLETA][k]} opacity={0.75 * u} />;
                  })}
                </g>
              );
            })}
          </g>
        )}
        {t >= m('contactar') && (() => {
          const n = Math.min(7, 1 + Math.floor((t - m('contactar')) / 0.5));
          return (
            <g opacity={e1(t, m('contactar'))}>
              <Persona id={ID} x={260} y={790} s={0.62} cuerpo={GRIS} />
              <g transform={`translate(380 700) rotate(${10 * Math.sin(t * 18)})`}><Fono x={0} y={0} s={1.6} color={NARANJA} /></g>
              {[0, 1, 2].map((k) => { const u = (t * 1.4 + k / 3) % 1; return <path key={k} d={`M ${410 + 30 * u} ${672 - 10 * u} q 10 28 0 56`} stroke={NARANJA} strokeWidth={4} fill="none" opacity={1 - u} />; })}
              <rect x={480} y={660} width={640} height={90} rx={22} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
              {Array.from({ length: 7 }, (_, k) => <circle key={k} cx={530 + k * 64} cy={705} r={20} fill={k < n ? NARANJA : c.panel2} />)}
              <Txt x={1040} y={716} textAnchor="middle" fontSize={34} fill={NARANJA}>{n}</Txt>
            </g>
          );
        })()}
      </Toma>
    </Lienzo>
  );
};
