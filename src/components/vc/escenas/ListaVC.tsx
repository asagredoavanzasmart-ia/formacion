import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Propuesta, Visto, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Lista de verificación.
 * 1 · El portapapeles con siete preguntas que se marcan una a una; la aguja del riesgo pasa de rojo a verde: estrategia sólida.
 * 2 · El mismo camino de la portada, ahora con todas las paradas en verde, y la frase que cierra el recorrido.
 */

const ID = 'vc25', P = 'vc-lista';

export const ListaVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [[m('economico'), 'Antes de avanzar'], [m('solida'), 'De riesgo alto a sólida'], [m('recorrido'), 'El recorrido completo'], [m('frase'), 'Hoy, para ganar mañana']];
  const ITEMS: [string, string, string][] = [
    ['economico', 'Comprador económico real', 'Económico'], ['usuario', 'Ganancias del usuario', 'Usuario'], ['tecnico', 'Specs del técnico', 'Técnico'],
    ['coach', 'Un coach confiable', 'Coach'], ['modo', 'Crecimiento o problemas', 'Modo'], ['banderas', 'Banderas mitigadas', 'Banderas'], ['razon', 'Razón de negocio', 'Razón'],
  ];
  let n = 0;
  ITEMS.forEach(([a]) => { n += sm(t, m(a), m(a) + 0.8); });
  const aguja = lerp(-80, 80, Math.min(1, n / 7));
  const STOPS = [250, 470, 690, 910];
  const FRASE = 'La estrategia no consiste en lo que vas a hacer, sino en lo que estás haciendo hoy para ganar mañana.';
  const porLinea = movil ? 24 : 34;
  const lineas: string[] = []; let l = '';
  for (const p of FRASE.split(' ')) { if ((l + ' ' + p).trim().length > porLinea) { lineas.push(l.trim()); l = p; } else l += ' ' + p; }
  lineas.push(l.trim());

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Lista de verificación">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el portapapeles y el medidor */}
      <Toma t={t} a={0} b={m('recorrido')} cy={470}>
        <g opacity={e1(t, 0.4)}>
          <rect x={80} y={140} width={600} height={680} rx={28} fill={c.panel} style={{ filter: `drop-shadow(0 8px 18px rgba(0,0,0,${c.sombra}))` }} />
          <rect x={300} y={120} width={160} height={44} rx={14} fill={GRIS} />
        </g>
        {ITEMS.map(([a, s, corto], k) => (
          <g key={a} opacity={t >= m(a) ? 1 : 0.35}>
            <rect x={120} y={196 + k * 86} width={50} height={50} rx={12} fill={c.panel2} />
            {t >= m(a) && <Visto x={145} y={221 + k * 86} r={22} op={e1(t, m(a))} />}
            <Txt x={190} y={232 + k * 86} fontSize={movil ? 28 : 30} fill={c.texto}>{movil ? corto : s}</Txt>
          </g>
        ))}
        <g transform="translate(930 520)" opacity={e1(t, m('economico'))}>
          <path d="M -170 0 A 170 170 0 0 1 -85 -147" stroke={ROSA} strokeWidth={36} fill="none" />
          <path d="M -85 -147 A 170 170 0 0 1 85 -147" stroke={AMBAR} strokeWidth={36} fill="none" />
          <path d="M 85 -147 A 170 170 0 0 1 170 0" stroke={VERDE} strokeWidth={36} fill="none" />
          <g transform={`rotate(${aguja})`}><rect x={-6} y={-150} width={12} height={150} rx={6} fill={c.texto} /></g>
          <circle r={18} fill={c.texto} />
          <Txt x={-170} y={60} textAnchor="middle" fontSize={26} fill={ROSA}>Riesgo</Txt>
          <Txt x={170} y={60} textAnchor="middle" fontSize={26} fill={VERDE}>Sólida</Txt>
        </g>
        {t >= m('solida') && <Letrero x={930} y={680} texto="Estrategia sólida" fondo={VERDE} id={ID} op={e1(t, m('solida'))} tam={28} />}
      </Toma>

      {/* 2 · el recorrido y la frase */}
      <Toma t={t} a={m('recorrido')} b={fin + 1} cy={470}>
        <g opacity={t < m('frase') ? 1 : 1 - sm(t, m('frase'), m('frase') + 0.8)}>
          <rect x={80} y={640} width={1040} height={60} rx={30} fill={`url(#${ID}-marcaH)`} opacity={0.85} />
          <line x1={110} y1={670} x2={1090} y2={670} stroke="#fff" strokeWidth={5} strokeDasharray="30 22" opacity={0.7} />
          {STOPS.map((x, k) => (
            <g key={x} opacity={e1(t, m('recorrido') + 0.6 * k)}>
              <rect x={x - 4} y={470} width={8} height={170} rx={4} fill={GRIS} />
              <circle cx={x} cy={470} r={22} fill={VERDE} />
              <Persona id={ID} x={x + 60} y={630} s={0.42} cuerpo={[AZUL_M, VIOLETA, AMBAR, TEAL][k]} />
              <Visto x={x + 60} y={420} r={22} op={e1(t, m('recorrido') + 0.6 * k + 0.4)} />
            </g>
          ))}
          <Propuesta x={lerp(120, 1080, sm(t, m('recorrido'), m('recorrido') + 8))} y={600} s={0.75} />
        </g>
        {t >= m('frase') && (
          <g opacity={e1(t, m('frase'))}>
            <rect x={100} y={220} width={1000} height={120 + lineas.length * 62} rx={36} fill={c.panel} style={{ filter: `drop-shadow(0 10px 24px rgba(0,0,0,${c.sombra}))` }} />
            <rect x={100} y={220} width={14} height={120 + lineas.length * 62} rx={7} fill={`url(#${ID}-marca)`} />
            <Txt x={150} y={300} fontSize={60} fill={NARANJA}>«</Txt>
            {lineas.map((ln, j) => <Txt key={j} x={200} y={300 + j * 62} fontSize={40} fill={c.texto} opacity={e1(t, m('frase') + 0.6 * j)}>{ln}</Txt>)}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
