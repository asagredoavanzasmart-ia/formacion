import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Edificio, Pin, PilaMonedas, Hoja, Persona, Visto, Cruz, Curva, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Un mercado viable.
 * Toma 1: una plataforma («tu mercado») que se sostiene sobre cuatro pilares que se levantan al nombrarse: dolor
 * (llama), poder adquisitivo (monedas), fácil de localizar (pin) y crecimiento (brote).
 * Toma 2: los dos contraejemplos rompen un pilar cada uno: el periódico que cae un 25 % al año quiebra el crecimiento;
 * el currículum del desempleado deja el pilar del dinero vacío.
 * Toma 3: en B2B, el mismo servicio frente a una constructora mediana (sí) y una microempresa (no puede pagar).
 */

const ID = 'ad05', P = 'ad-mercado';

const Llama: React.FC<{ x: number; y: number; s?: number; t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.05 * Math.sin(t * 8))} ${s * (1 + 0.08 * Math.sin(t * 6))})`}>
    <path d="M 0 -60 C 30 -30 36 -6 22 16 C 12 30 -12 30 -22 16 C -34 -2 -20 -20 -8 -30 C -6 -16 4 -12 6 -18 C 10 -30 4 -44 0 -60 Z" fill={ROJO_M} />
    <path d="M 0 -30 C 14 -12 16 2 8 12 C 2 18 -8 18 -12 10 C -16 0 -6 -12 0 -30 Z" fill={AMBAR} />
  </g>
);

export const MercadoAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('correcto'), 'El mercado correcto'], [m('cuatro'), 'Cuatro indicadores'], [m('contra'), 'Dos contraejemplos'], [m('empresas'), 'En ventas a empresas'],
  ];
  const PIL: [string, string, string][] = [['dolor', 'Dolor', ROJO_M], ['poder', 'Dinero', AMBAR], ['localizado', 'Localizable', AZUL_M], ['crecimiento', 'Crece', VERDE]];
  const roto = (k: number) => (k === 3 ? sm(t, m('caida'), m('caida') + 0.8) : k === 1 ? sm(t, m('cero'), m('cero') + 0.8) : 0);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Un mercado viable">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 y 2 · La plataforma sobre cuatro pilares, y los pilares que se rompen */}
      <Toma t={t} a={0} b={m('empresas')} cy={470}>
        <g opacity={e1(t, m('correcto'))}>
          <g transform={`rotate(${4 * roto(3) - 3 * roto(1)} 600 300)`}>
            <rect x={200} y={260} width={800} height={60} rx={18} fill={`url(#${ID}-marca)`} style={sombra(0.25, 5, 12)} />
            <Txt x={600} y={302} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>Tu mercado</Txt>
          </g>
          {PIL.map(([n, txt, col], k) => {
            const x = 290 + k * 207;
            const u = sm(t, m(n), m(n) + 0.8);
            const r = roto(k);
            const h = 360 * u;
            return (
              <g key={n} opacity={u > 0.01 ? 1 : 0}>
                <rect x={x - 46} y={700 - h} width={92} height={h * (1 - 0.45 * r)} rx={14} fill={r > 0.5 ? GRIS : col} />
                {r > 0.01 && <rect x={x - 46} y={700 - h * 0.45 * r} width={92} height={h * 0.45 * r} rx={14} fill={GRIS} transform={`rotate(${30 * r} ${x} 700)`} opacity={1 - 0.5 * r} />}
                <g transform={`translate(${x} 480)`} opacity={1 - 0.6 * r}>
                  {k === 0 && <Llama x={0} y={20} s={0.9} t={t} />}
                  {k === 1 && <PilaMonedas x={0} y={40} n={4} w={60} />}
                  {k === 2 && <Pin x={0} y={30} s={1} color="#fff" />}
                  {k === 3 && <path d={`M 0 40 V ${-10 - 20 * u} M 0 0 Q -30 -10 -34 -36 Q -8 -30 0 0 M 0 -10 Q 30 -20 34 -46 Q 8 -40 0 -10`} stroke="#fff" fill="#fff" strokeWidth={6} />}
                </g>
                <Letrero x={x} y={760} texto={txt} fondo={r > 0.5 ? GRIS : col} id={ID} tam={26} />
              </g>
            );
          })}
        </g>
        {t >= m('periodicos') && (
          <g opacity={ventana(t, m('periodicos'), m('curriculums'))}>
            <g transform="translate(960 190)"><Hoja x={0} y={0} w={150} h={110} lineas={4} color={GRIS} /><Txt x={0} y={-30} textAnchor="middle" fontSize={22} fill="#334155" peso={800}>DIARIO</Txt></g>
            <Curva pts={[[880, 110], [940, 150], [1000, 190], [1060, 250]]} u={sm(t, m('periodicos'), m('periodicos') + 1)} color={ROJO_M} grosor={8} />
            <Cifra x={960} y={300} valor={-25} u={sm(t, m('periodicos'), m('periodicos') + 1)} suf=" %/año" tam={40} color={ROJO_M} />
          </g>
        )}
        {t >= m('curriculums') && (
          <g opacity={ventana(t, m('curriculums'), m('empresas'))}>
            <Persona id={ID} x={980} y={250} s={0.5} cuerpo={GRIS} />
            <g transform="translate(1060 210)"><rect x={-30} y={-20} width={60} height={40} rx={8} fill="#92400e" /><rect x={-30} y={-20} width={60} height={12} rx={6} fill="#78350f" /></g>
            <Letrero x={960} y={300} texto="Dolor sin dinero" fondo={ROJO_M} id={ID} tam={26} />
          </g>
        )}
      </Toma>

      {/* 3 · En B2B: por industria y tamaño */}
      <Toma t={t} a={m('empresas')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('empresas'))}>
          <rect x={460} y={340} width={280} height={200} rx={24} fill={`url(#${ID}-marca)`} style={sombra(0.25, 4, 12)} />
          <Txt x={600} y={452} textAnchor="middle" fontSize={34} fill="#fff" peso={800}>Tu servicio</Txt>
        </g>
        {t >= m('constructoras') && (
          <g opacity={e1(t, m('constructoras'))}>
            <Edificio x={240} y={700} w={190} h={300} color={AZUL_M} />
            <g transform={`translate(260 ${250 + 10 * Math.sin(t * 2)})`}><path d="M -50 0 H 50 L 30 -30 H -30 Z" fill={AMBAR} /><rect x={-6} y={-90} width={12} height={60} fill={AMBAR} /><rect x={-6} y={-90} width={90} height={10} fill={AMBAR} /></g>
            <Visto x={330} y={430} r={40} op={sm(t, m('constructoras') + 0.4, m('constructoras') + 0.9)} />
            <Letrero x={240} y={770} texto="Constructora mediana" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
        {t >= m('micro') && (
          <g opacity={e1(t, m('micro'))}>
            <Edificio x={960} y={700} w={110} h={110} color={GRIS} />
            <Cruz x={1020} y={540} r={40} op={sm(t, m('micro') + 0.4, m('micro') + 0.9)} />
            <Letrero x={960} y={770} texto="Microempresa" fondo={ROJO_M} id={ID} tam={26} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
