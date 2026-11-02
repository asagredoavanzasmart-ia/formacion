import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Moneda3D, Calendario, Pin, Hoja, Visto, Cruz, Flecha, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * El precio lo pone el mercado.
 * 1 · El hardware con su costo ×2 se tacha; la flecha se invierte: primero lo que el cliente pagaría, después si se gana dinero.
 * 2 · El valor creado como una barra y la porción que se cobra (10 a 25 %); la balanza del valor de vida frente al costo de
 *     adquisición (al menos tres veces); el ahorro con techo frente a la ganancia sin techo.
 * 3 · El mapa de Waze: el pin de Eldan aparece y al día siguiente llega el correo de Avis; la renovación cierra el círculo.
 */

const ID = 'ep24', P = 'ep-dinero';

export const DineroEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('mercado'), 'El precio lo pone el mercado'], [m('reves'), 'Al revés'], [m('guia'), 'Del 10 al 25 %'], [m('tres'), 'Tres veces'],
    [m('ahorrar'), 'Ahorrar o ganar'], [m('vender'), 'El modelo de Waze'], [m('renueven'), 'Que renueven'],
  ];
  const tacha = sm(t, m('reves'), m('reves') + 0.6);
  const porcion = sm(t, m('guia'), m('guia') + 1.4);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El precio lo pone el mercado">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · al revés */}
      <Toma t={t} a={0} b={m('guia')} cy={470}>
        <g transform="translate(260 420)" opacity={e1(t, m('hardware'))}>
          <rect x={-110} y={-90} width={220} height={180} rx={20} fill="#334155" /><rect x={-80} y={-60} width={160} height={90} rx={10} fill="#0ea5e9" opacity={0.6} />
          {[0, 1, 2].map((k) => <circle key={k} cx={-50 + k * 50} cy={60} r={10} fill="#94a3b8" />)}
          <Txt f="a" x={0} y={140} textAnchor="middle" fontSize={26} fill={c.texto}>Costo</Txt>
        </g>
        {t >= m('duplicaba') && <g opacity={e1(t, m('duplicaba'))}>
          <Flecha x1={400} y1={420} x2={620} y2={420} color={GRIS} grosor={12} />
          <Txt x={510} y={390} textAnchor="middle" fontSize={44} fill={GRIS}>×2</Txt>
          <rect x={660} y={360} width={200} height={120} rx={20} fill={GRIS} /><Txt x={760} y={432} textAnchor="middle" fontSize={34} fill="#fff">Precio</Txt>
          {tacha > 0.05 && <line x1={380} y1={330} x2={880} y2={510} stroke="#e5484d" strokeWidth={12} opacity={tacha} strokeLinecap="round" />}
        </g>}
        {t >= m('pagar') && <g opacity={e1(t, m('pagar'))}>
          {[0, 1, 2].map((k) => <Persona key={k} id={ID} x={880 + k * 90} y={760} s={0.42} cuerpo={[AZUL_M, ROSA, VERDE][k]} />)}
          <Flecha x1={970} y1={620} x2={760} y2={520} color={VERDE} grosor={12} u={sm(t, m('pagar'), m('pagar') + 1)} />
          <Letrero x={500} y={640} texto="Primero: cuánto pagaría el cliente" fondo={VERDE} id={ID} tam={24} />
        </g>}
      </Toma>

      {/* 2 · proporciones */}
      <Toma t={t} a={m('guia')} b={m('vender')} cy={470}>
        {t < m('tres') ? <g>
          <rect x={200} y={300} width={800} height={150} rx={24} fill={VERDE} opacity={0.3} />
          <rect x={200} y={300} width={800 * 0.25 * porcion} height={150} rx={24} fill={VERDE} />
          <Txt x={600} y={270} textAnchor="middle" fontSize={34} fill={c.texto}>Valor que creas</Txt>
          <Letrero x={300} y={510} texto="Cobras del 10 al 25 %" fondo={VERDE} id={ID} op={porcion} />
          {t >= m('justo') && <Letrero x={760} y={620} texto="Un precio justo" fondo={AZUL_M} id={ID} op={e1(t, m('justo'))} tam={26} />}
          {t >= m('competencia') && <Letrero x={760} y={700} texto="Márgenes altos atraen competencia" fondo={GRIS} id={ID} op={e1(t, m('competencia'))} tam={22} />}
        </g> : t < m('ahorrar') ? <g>
          <g transform="translate(600 300)">
            <path d="M -24 360 L 0 0 L 24 360 Z" fill="#64748b" />
            <g transform="rotate(-12)">
              <rect x={-320} y={-10} width={640} height={20} rx={10} fill="#334155" />
              <g transform="translate(-280 0) rotate(12)">{[0, 1, 2].map((k) => <Moneda3D key={k} x={-40 + k * 40} y={60 - (k % 2) * 30} r={30} />)}</g>
              <g transform="translate(280 0) rotate(12)"><Moneda3D x={0} y={60} r={30} /></g>
            </g>
          </g>
          <Letrero x={300} y={560} texto="Valor de vida del cliente" fondo={VERDE} id={ID} tam={24} />
          <Letrero x={900} y={420} texto="Costo de adquisición" fondo={GRIS} id={ID} tam={24} />
          <Letrero x={600} y={740} texto="Al menos tres veces" id={ID} op={e1(t, m('tres') + 0.6)} />
          {t >= m('recurrentes') && <g opacity={e1(t, m('recurrentes'))}><Calendario x={980} y={640} s={0.6} marcados={Math.floor((t - m('recurrentes')) * 3) % 15} /></g>}
        </g> : <g>
          <g transform="translate(330 0)">
            <rect x={-130} y={620 - 260} width={260} height={260} rx={20} fill={AZUL_M} opacity={e1(t, m('ahorrar'))} />
            {t >= m('techo') && <rect x={-170} y={330} width={340} height={20} rx={10} fill="#e5484d" opacity={e1(t, m('techo'))} />}
            <Txt f="a" x={0} y={670} textAnchor="middle" fontSize={28} fill={c.texto}>Ahorrar</Txt>
          </g>
          {t >= m('ganarlo') && <g transform="translate(870 0)" opacity={e1(t, m('ganarlo'))}>
            <rect x={-130} y={620 - 260 - 220 * sm(t, m('techo'), m('techo') + 2)} width={260} height={260 + 220 * sm(t, m('techo'), m('techo') + 2)} rx={20} fill={VERDE} />
            <Txt f="a" x={0} y={670} textAnchor="middle" fontSize={28} fill={c.texto}>Ganar</Txt>
          </g>}
          {t >= m('techo') && <Letrero x={600} y={760} texto="El ahorro tiene techo; la ganancia, no" id={ID} op={e1(t, m('techo'))} tam={24} />}
        </g>}
      </Toma>

      {/* 3 · Waze, Eldan, Avis */}
      <Toma t={t} a={m('vender')} b={fin + 1} cy={470}>
        <rect x={140} y={170} width={620} height={560} rx={30} fill={isDark ? '#1e293b' : '#e0f2fe'} />
        {[[180, 300, 720, 300], [180, 480, 720, 480], [330, 200, 330, 700], [560, 200, 560, 700]].map(([a, b, c2, d], k) => <line key={k} x1={a} y1={b} x2={c2} y2={d} stroke="#94a3b8" strokeWidth={16} strokeLinecap="round" />)}
        {t >= m('vender') && t < m('publicidad') && <g opacity={e1(t, m('vender'))}><Hoja x={940} y={430} w={150} h={190} /><Cruz x={1010} y={340} r={28} /><Letrero x={940} y={580} texto="Vender mapas y datos" fondo={GRIS} id={ID} tam={24} /></g>}
        {t >= m('eldan') && <g transform={`translate(330 ${lerp(170, 300, sm(t, m('eldan'), m('eldan') + 0.6))})`}><Pin x={0} y={0} s={1.2} color={AZUL_M} /><Letrero x={0} y={-110} texto="Eldan" fondo={AZUL_M} id={ID} tam={24} /></g>}
        {t >= m('avis') && <g opacity={e1(t, m('avis'))} transform={`translate(${lerp(1200, 960, sm(t, m('avis'), m('avis') + 1))} 400)`}>
          <rect x={-130} y={-80} width={260} height={160} rx={14} fill="#fff" style={{ filter: 'drop-shadow(0 4px 10px rgba(15,23,42,0.3))' }} />
          <path d="M -130 -80 L 0 10 L 130 -80" stroke="#e5484d" strokeWidth={8} fill="none" />
          <Txt f="a" x={0} y={60} textAnchor="middle" fontSize={22} fill="#334155">¿Y nosotros?</Txt>
          <Letrero x={0} y={140} texto="Avis" fondo="#e5484d" id={ID} tam={24} />
        </g>}
        {t >= m('senal') && <Letrero x={450} y={780} texto="Los clientes vienen a ti" id={ID} op={e1(t, m('senal'))} />}
        {t >= m('renueven') && <g opacity={e1(t, m('renueven'))} transform="translate(960 640)">
          <path d={`M 0 -70 A 70 70 0 1 1 -66 24`} stroke={VERDE} strokeWidth={14} fill="none" transform={`rotate(${t * 90})`} />
          <Visto x={0} y={0} r={30} />
        </g>}
      </Toma>
    </Lienzo>
  );
};
