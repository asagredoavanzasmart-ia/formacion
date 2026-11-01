import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Equipo, Cruz, Visto, Rotulo, Persona, Txt, Engranaje, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Qué candidato buscar», en una toma: el cuadrante.
 * Dos ejes (responsabilidades específicas o amplias; experiencia directa o transferible) y cuatro celdas que se
 * encienden al nombrarse: especialista acreditado, líder con experiencia, generalista en transición y la celda que no
 * se recomienda. Cada perfil aparece con su detalle (credencial, el motor de leads ya construido, el ingeniero de ventas).
 */

const ID = 'ro49';
const nombres = ['tres', 'cuadrante', 'ejes', 'especificas', 'directa', 'necesidades', 'especialista', 'credenciales', 'rapido', 'nibur', 'lider', 'etapa', 'motor', 'generalista', 'empezo', 'barritault', 'ingeniero', 'dekiba', 'contexto', 'cuarto', 'noRec', 'direccion', 'pregunta'] as const;
type N = typeof nombres[number];

export const CuadranteRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Tres perfiles'], [m('ejes'), 'Dos ejes'], [m('especialista'), 'Especialista acreditado'], [m('lider'), 'Líder con experiencia'],
    [m('generalista'), 'Generalista en transición'], [m('dekiba'), 'El contexto importa'], [m('cuarto'), 'El cuarto cuadrante'],
  ];

  const X0 = 300, Y0 = 170, CW = 400, CH = 280;
  const CELDAS: { n: N; col: number; fila: number; txt: string; color: string }[] = [
    { n: 'especialista', col: 0, fila: 0, txt: 'Especialista acreditado', color: AZUL_M },
    { n: 'lider', col: 1, fila: 0, txt: 'Líder con experiencia', color: VIOLETA },
    { n: 'generalista', col: 1, fila: 1, txt: 'Generalista en transición', color: VERDE },
    { n: 'cuarto', col: 0, fila: 1, txt: 'No se recomienda', color: '#94a3b8' },
  ];
  const act = CELDAS.reduce((a, cl, k) => (t >= m(cl.n) ? k : a), -1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Qué candidato buscar">
      <Rotulo t={t} lista={rotulos} id={ID} />

      <Toma t={t} a={-1} b={fin + 1} zi={1}>
        {t < m('ejes') && <g opacity={1 - ac(t, m('ejes') - 0.4, m('ejes'))}>{[0, 1, 2].map((k) => <g key={k} opacity={e1(t, m('tres') + k * 0.3)}><Persona id={ID} x={360 + k * 240} y={560} s={0.8} cuerpo={[AZUL_M, VIOLETA, VERDE][k]} /><Txt x={360 + k * 240} y={350} textAnchor="middle" fontSize={60} fill={c.tenue} peso={800}>?</Txt></g>)}</g>}
        {t >= m('ejes') && (
          <g opacity={e1(t, m('ejes'))}>
            {CELDAS.map((cl, k) => { const on = t >= m(cl.n); return (
              <g key={cl.n}>
                <rect x={X0 + cl.col * (CW + 12)} y={Y0 + cl.fila * (CH + 12)} width={CW} height={CH} rx={22} fill={on ? cl.color : c.panel2} opacity={on ? (k === act ? 0.22 : 0.12) : 1} />
                {on && <g opacity={e1(t, m(cl.n))}>
                  <Persona id={ID} x={X0 + cl.col * (CW + 12) + 80} y={Y0 + cl.fila * (CH + 12) + 230} s={0.55} cuerpo={cl.color} />
                  <Txt f="a" x={X0 + cl.col * (CW + 12) + 130} y={Y0 + cl.fila * (CH + 12) + 60} fontSize={20} fill={c.texto} peso={700}>{cl.txt}</Txt>
                </g>}
              </g>
            ); })}
            {/* ejes */}
            {t >= m('especificas') && <g opacity={e1(t, m('especificas'))}><rect x={X0} y={Y0 + 2 * CH + 40} width={2 * CW + 12} height={6} rx={3} fill={c.tenue} /><Txt f="a" x={X0} y={Y0 + 2 * CH + 76} fontSize={20} fill={c.tenue}>Específicas</Txt><Txt f="a" x={X0 + 2 * CW + 12} y={Y0 + 2 * CH + 76} textAnchor="end" fontSize={20} fill={c.tenue}>Amplias →</Txt></g>}
            {t >= m('directa') && <g opacity={e1(t, m('directa'))}><rect x={X0 - 40} y={Y0} width={6} height={2 * CH + 12} rx={3} fill={c.tenue} /><Txt f="a" x={X0 - 56} y={Y0 + CH / 2} textAnchor="end" fontSize={20} fill={c.tenue}>Directa</Txt><Txt f="a" x={X0 - 56} y={Y0 + CH * 1.5 + 12} textAnchor="end" fontSize={20} fill={c.tenue}>Transferible</Txt></g>}
            {/* detalles de cada perfil */}
            {t >= m('credenciales') && act === 0 && <g opacity={e1(t, m('credenciales'))} transform={`translate(${X0 + 230} ${Y0 + 150})`}><rect x={-60} y={-40} width={120} height={84} rx={10} fill="#fff" style={sombra(0.2, 2, 6)} /><circle cx={0} cy={-6} r={18} fill={AMBAR} /><path d="M -10 10 l -8 30 l 18 -10 l 18 10 l -8 -30" fill={AMBAR} />{t >= m('rapido') && <Txt f="a" x={0} y={80} textAnchor="middle" fontSize={20} fill={AZUL_M} peso={700}>valor rápido</Txt>}</g>}
            {t >= m('motor') && act === 1 && <g opacity={e1(t, m('motor'))}><Engranaje x={X0 + CW + 12 + 250} y={Y0 + 160} r={40} t={t} color={VIOLETA} hueco={c.panel} /><Txt f="a" x={X0 + CW + 12 + 250} y={Y0 + 240} textAnchor="middle" fontSize={18} fill={c.texto}>ya lo construyó</Txt></g>}
            {t >= m('ingeniero') && act === 2 && <g opacity={e1(t, m('ingeniero'))}><Letrero x={X0 + CW + 12 + 250} y={Y0 + CH + 12 + 160} texto="Ingeniero de ventas" fondo={VERDE} id={ID} tam={20} /></g>}
            {t >= m('contexto') && act === 2 && <Letrero x={600} y={130} texto="Lo que funcionó antes no garantiza nada" fondo={PIZARRA} id={ID} op={e1(t, m('contexto'))} tam={20} />}
            {t >= m('noRec') && <g opacity={e1(t, m('noRec'))}><Cruz x={X0 + 300} y={Y0 + CH + 12 + 150} r={34} /></g>}
            {t >= m('direccion') && <Letrero x={X0 + CW / 2} y={Y0 + 2 * CH + 12 - 20} texto="Un rol sin dirección clara" fondo={ROJO_M} id={ID} op={e1(t, m('direccion'))} tam={20} />}
            {t >= m('necesidades') && t < m('especialista') && <Letrero x={710} y={Y0 + CH + 6} texto="Según lo que el equipo necesita hoy" id={ID} op={e1(t, m('necesidades'))} tam={22} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
