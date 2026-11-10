import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Regalo, Megafono, Reloj, EtiquetaPrecio, Gente, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * El nombre y la fatiga.
 * Toma 1: un cartel de marquesina que se arma con cinco piezas de colores (razón, cliente, meta, plazo, palabra) y
 * termina mostrando el nombre ilustrativo.
 * Toma 2: el público que se cansa del mismo anuncio (caras que bajan la vista) y una escalera de seis peldaños, del
 * cambio más barato (imagen) al más caro (estructura financiera); un indicador sube peldaño a peldaño.
 */

const ID = 'ad16', P = 'ad-nombre';

export const NombreAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('cinco'), 'Un nombre en cinco partes'], [m('ejemplo'), 'Un nombre ilustrativo'], [m('fatiga'), 'Cuando la campaña se fatiga'], [m('jerarquia'), 'Del cambio más barato al más caro'],
  ];
  const PZ: [string, string, string][] = [['razon', 'Razón', NARANJA], ['anuncio', 'Cliente', ROSA], ['meta', 'Meta', VIOLETA], ['plazo', 'Plazo', AZUL_M], ['palabra', 'Palabra', VERDE]];
  const ESC: [string, string][] = [['imagen', 'Imagen'], ['texto', 'Texto'], ['titular', 'Titular'], ['duracion', 'Duración'], ['gratuito', 'Gratuito'], ['estructura', 'Estructura']];
  const paso = ESC.reduce((a, [n], k) => (t >= m(n) - 0.1 ? k : a), -1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El nombre y la fatiga">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · La marquesina */}
      <Toma t={t} a={0} b={m('fatiga')} cy={470}>
        <g opacity={e1(t, m('cinco'))}>
          <rect x={110} y={250} width={980} height={300} rx={30} fill="#1e293b" style={sombra(0.3, 5, 14)} />
          {Array.from({ length: 22 }, (_, k) => <circle key={k} cx={140 + k * 44} cy={270} r={8} fill={AMBAR} opacity={0.4 + 0.6 * ((Math.floor(t * 4) + k) % 2)} />)}
          {Array.from({ length: 22 }, (_, k) => <circle key={k} cx={140 + k * 44} cy={530} r={8} fill={AMBAR} opacity={0.4 + 0.6 * ((Math.floor(t * 4) + k + 1) % 2)} />)}
          {PZ.map(([n, txt, col], k) => {
            const u = sm(t, m(n), m(n) + 0.6);
            return (
              <g key={n} opacity={u} transform={`translate(${220 + k * 190} ${lerp(140, 400, u)})`}>
                <rect x={-85} y={-50} width={170} height={100} rx={18} fill={col} />
                <Txt x={0} y={12} textAnchor="middle" fontSize={movil ? 30 : 30} fill="#fff" peso={800}>{txt}</Txt>
              </g>
            );
          })}
        </g>
        {t >= m('ejemplo') && (
          <g opacity={e1(t, m('ejemplo'))}>
            <rect x={110} y={600} width={980} height={150} rx={26} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Txt f="a" x={600} y={665} textAnchor="middle" fontSize={30} fill={c.texto}>Acelerador de cierre de fin de año</Txt>
            <Txt f="a" x={600} y={712} textAnchor="middle" fontSize={26} fill={c.tenue}>para distribuidoras industriales · 20 reuniones en 30 días</Txt>
          </g>
        )}
      </Toma>

      {/* 2 · La fatiga y la escalera */}
      <Toma t={t} a={m('fatiga')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('fatiga'))}>
          <Megafono x={130} y={300} s={0.8} habla={lerp(1, 0.2, sm(t, m('fatiga'), m('jerarquia')))} t={t} />
          {Array.from({ length: 6 }, (_, k) => (
            <g key={k} transform={`translate(${130 + (k % 3) * 80} ${470 + Math.floor(k / 3) * 110})`}>
              <circle r={28} fill="#f7c4a0" />
              <path d={t >= m('fatiga') + 1 ? 'M -12 10 Q 0 4 12 10' : 'M -12 6 Q 0 16 12 6'} stroke="#3b2a20" strokeWidth={4} fill="none" strokeLinecap="round" />
              <circle cx={-9} cy={-4} r={3.5} fill="#3b2a20" /><circle cx={9} cy={-4} r={3.5} fill="#3b2a20" />
            </g>
          ))}
          {!movil && <Txt f="a" x={210} y={720} textAnchor="middle" fontSize={24} fill={c.tenue}>«Ya lo vi»</Txt>}
        </g>
        {t >= m('jerarquia') && (
          <g opacity={e1(t, m('jerarquia'))}>
            {ESC.map(([n, txt], k) => {
              const on = k <= paso;
              const x = 420 + k * 120, h = 90 + k * 80;
              return (
                <g key={n}>
                  <rect x={x} y={760 - h} width={110} height={h} rx={12} fill={on ? (k === 5 ? ROJO_M : [AZUL_M, TEAL, VIOLETA, ROSA, AMBAR][k]) : c.apagado} />
                  {!movil && <Txt f="a" x={x + 55} y={760 - h - 14} textAnchor="middle" fontSize={22} fill={on ? c.texto : c.tenue}>{txt}</Txt>}
                </g>
              );
            })}
            {movil && paso >= 0 && <Letrero x={600} y={190} texto={ESC[paso][1]} fondo={paso === 5 ? ROJO_M : AZUL_M} id={ID} tam={30} />}
            {paso >= 0 && <circle cx={475 + paso * 120} cy={760 - (90 + paso * 80) - 70} r={16} fill={NARANJA} />}
            <Letrero x={540} y={800} texto="Más barato" fondo={VERDE} id={ID} tam={24} />
            <Letrero x={1040} y={800} texto="Último recurso" fondo={ROJO_M} id={ID} tam={24} op={paso >= 5 ? 1 : 0.4} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
