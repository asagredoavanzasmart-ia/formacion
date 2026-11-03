import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Lead, Persona, Busto, Visto, Cruz, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Creador de flujos (Pearce): todo empieza con un lead.
 * 1 · El lead pasa tres puertas: identificar, calificar y convertir.
 * 2 · Las fuentes se encienden una a una (web, llamada en frío, redes, contactos, boca a boca, feria, lista comprada, anuncios,
 *     WhatsApp) y sueltan leads. Con una política clara cada fuente tiene su carril y su responsable; sin flujo, los leads
 *     caen al vacío. El camino completo termina en el CRM.
 */

const ID = 'vc22', P = 'vc-flujos';

const Icono: React.FC<{ k: number; col: string }> = ({ k, col }) => {
  switch (k) {
    case 0: return <g><rect x={-24} y={-18} width={48} height={36} rx={5} fill="#fff" /><rect x={-24} y={-18} width={48} height={9} rx={4} fill={col} opacity={0.6} /></g>;
    case 1: return <path d="M -16 -18 Q -22 -12 -16 0 Q -6 16 10 20 Q 18 22 20 14 L 12 6 L 4 10 Q -6 4 -8 -6 L -4 -14 Z" fill="#fff" />;
    case 2: return <g><circle cx={-8} cy={-4} r={16} fill="#fff" /><path d="M -18 8 L -24 20 L -8 12 Z" fill="#fff" /><circle cx={14} cy={8} r={10} fill="#fff" opacity={0.8} /></g>;
    case 3: return <g><circle cx={-10} cy={-8} r={8} fill="#fff" /><circle cx={12} cy={-8} r={8} fill="#fff" /><path d="M -22 18 Q -10 2 0 14 Q 10 2 24 18 Z" fill="#fff" /></g>;
    case 4: return <g><path d="M -20 -10 Q 0 -24 20 -10 Q 0 4 -20 -10 Z" fill="#fff" /><path d="M -10 6 Q 0 0 10 6 Q 0 14 -10 6 Z" fill="#fff" opacity={0.8} /></g>;
    case 5: return <g><path d="M -24 18 V -6 L 0 -22 L 24 -6 V 18 Z" fill="#fff" /><rect x={-6} y={4} width={12} height={14} fill={col} /></g>;
    case 6: return <g><rect x={-16} y={-22} width={32} height={44} rx={4} fill="#fff" />{[0, 1, 2].map((j) => <rect key={j} x={-10} y={-14 + j * 11} width={20} height={5} rx={2} fill={col} opacity={0.6} />)}</g>;
    case 7: return <g><rect x={-24} y={-14} width={48} height={28} rx={14} fill="#fff" /><path d="M -6 -6 L 8 0 L -6 6 Z" fill={col} /></g>;
    default: return <g><circle r={20} fill="#fff" /><path d="M -10 14 L -16 22 L -4 18 Z" fill="#fff" /><path d="M -6 -6 Q -8 4 2 8 L 6 4 L 2 0 Z" fill="#25d366" /></g>;
  }
};

export const FlujosVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('lead'), 'Todo empieza con un lead'], [m('canales'), 'Muchos canales'], [m('politica'), 'Una política clara'], [m('pierden'), 'Sin flujo, se pierden'], [m('camino'), 'El camino completo'],
  ];
  const PUERTAS = ['Identificar', 'Calificar', 'Convertir'];
  const pasoLead = sm(t, m('calificarlo'), m('calificarlo') + 4);
  const FUENTES: [string, string, string][] = [['web', 'Sitio web', AZUL_M], ['frio', 'Llamada en frío', TEAL], ['social', 'Redes', VIOLETA], ['social', 'Contactos', AMBAR], ['boca', 'Boca a boca', ROSA], ['feria', 'Feria', NARANJA], ['lista', 'Lista comprada', GRIS], ['anuncios', 'Anuncios', AZUL_M], ['whatsapp', 'WhatsApp', VERDE]];
  const tF = (k: number) => (k === 3 ? m('social') + 1.6 : m(FUENTES[k][0]));
  const pos = (k: number): [number, number] => [110 + (k % 2) * 190, 180 + Math.floor(k / 2) * 125 + (k % 2) * 62];
  const ordenado = t >= m('politica') ? sm(t, m('recorrido'), m('recorrido') + 1.5) : 0;
  const caos = t >= m('pierden') && t < m('camino');
  const crmX = 1040, crmY = 470;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Creador de flujos">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · las tres puertas del lead */}
      <Toma t={t} a={0} b={m('canales')} cy={470}>
        {PUERTAS.map((n, k) => (
          <g key={n} opacity={e1(t, m('calificarlo') + 0.5 * k)}>
            <rect x={380 + k * 260} y={330} width={30} height={300} rx={8} fill={GRIS} /><rect x={470 + k * 260} y={330} width={30} height={300} rx={8} fill={GRIS} />
            <rect x={370 + k * 260} y={310} width={140} height={30} rx={8} fill={[AZUL_M, AMBAR, VERDE][k]} />
            <Txt x={440 + k * 260} y={690} textAnchor="middle" fontSize={28} fill={c.texto}>{n}</Txt>
            {pasoLead > (k + 0.6) / 3 && <Visto x={440 + k * 260} y={260} r={22} />}
          </g>
        ))}
        <Lead x={lerp(180, 1000, pasoLead)} y={480} s={1.3} op={e1(t, m('lead'))} />
        {t >= m('lead') && t < m('calificarlo') && <Letrero x={600} y={800} texto="Una empresa a la que puedes venderle" id={ID} op={e1(t, m('lead') + 0.6)} tam={24} />}
      </Toma>

      {/* 2 · fuentes, carriles y CRM */}
      <Toma t={t} a={m('canales')} b={fin + 1} cy={470}>
        {FUENTES.map(([, n, col], k) => {
          const [x, y] = pos(k), t0 = tF(k);
          if (t < t0) return null;
          const lane = ordenado;
          const midY = lerp(y, crmY, 0.5);
          return (
            <g key={n}>
              {lane > 0.01 && <path d={`M ${x + 40} ${y} C ${600} ${y} ${700} ${midY} ${crmX - 90} ${lerp(crmY - 100, crmY + 100, k / 8)}`} fill="none" stroke={col} strokeWidth={6} opacity={0.6 * lane} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - lane} />}
              {lane > 0.6 && t >= m('responsable') && <g opacity={e1(t, m('responsable') + 0.15 * k)}><Busto x={lerp(x + 40, crmX - 90, 0.42)} y={lerp(y, midY, 0.5) - 6} s={0.55} color={col} /></g>}
              {/* leads que salen de la fuente */}
              {[0, 1].map((j) => {
                const ph = ((t - t0) * 0.35 + j * 0.5 + k * 0.11) % 1;
                if (caos && (k + j) % 3 === 0) { const yy = y + 300 * ph; return <Lead key={j} x={x + 60 + 120 * ph} y={yy} s={0.45} op={1 - ph} rot={90 * ph} />; }
                const lx = lane > 0.6 ? lerp(x + 40, crmX - 90, ph) : x + 60 + 140 * ph;
                const ly = lane > 0.6 ? lerp(y, lerp(crmY - 100, crmY + 100, k / 8), ph) - Math.sin(Math.PI * ph) * 20 : y;
                return <Lead key={j} x={lx} y={ly} s={0.45} op={lane > 0.6 ? 1 : 1 - ph} color={col} />;
              })}
              <circle cx={x} cy={y} r={40} fill={col} opacity={e1(t, t0)} />
              <g transform={`translate(${x} ${y})`} opacity={e1(t, t0)}><Icono k={k} col={col} /></g>
              {!movil && <Txt x={x} y={y + 60} textAnchor="middle" fontSize={20} fill={c.tenue} opacity={e1(t, t0)}>{n}</Txt>}
            </g>
          );
        })}
        {caos && <g opacity={e1(t, m('pierden'))}><Cruz x={500} y={760} r={30} /><Letrero x={760} y={800} texto="Leads perdidos u olvidados" fondo={ROSA} id={ID} tam={24} /></g>}
        {t >= m('politica') && !caos && t < m('camino') && <Letrero x={760} y={800} texto={t >= m('responsable') ? 'Cada carril, un responsable' : 'Un recorrido por fuente'} id={ID} op={e1(t, t >= m('responsable') ? m('responsable') : m('politica'))} tam={24} />}
        {t >= m('camino') && (
          <g opacity={e1(t, m('crm'))}>
            <ellipse cx={crmX} cy={crmY - 110} rx={90} ry={28} fill={TEAL} />
            <rect x={crmX - 90} y={crmY - 110} width={180} height={220} fill={TEAL} />
            <ellipse cx={crmX} cy={crmY + 110} rx={90} ry={28} fill={TEAL} />
            <ellipse cx={crmX} cy={crmY - 110} rx={90} ry={28} fill="#5eead4" opacity={0.6} />
            <Txt x={crmX} y={crmY + 12} textAnchor="middle" fontSize={34} fill="#fff">CRM</Txt>
          </g>
        )}
        {t >= m('camino') && <Letrero x={600} y={800} texto="Canal por canal, hasta el CRM" id={ID} op={e1(t, m('camino'))} tam={24} />}
      </Toma>
    </Lienzo>
  );
};
