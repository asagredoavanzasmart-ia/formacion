import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Telefono, Sobre, Megafono, Burbuja, Corazon, Hoja, Gente, Flujo, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Alcance cálido.
 * Toma 1: la matriz de los cuatro canales: dos ejes (uno a uno / uno a muchos; conocidos / desconocidos); cada
 * cuadrante se enciende con su ícono (mensaje, contenido, llamada en frío, megáfono).
 * Toma 2: el teléfono con la agenda que se llena (mil contactos) y cien mensajes por día que salen como aviones.
 * Toma 3: la conversación ACA: tres burbujas (reconocer, cumplido, pregunta) que crecen como escalones; luego no se le
 * vende: se le pregunta por alguien más y aparecen cinco fichas de caso de estudio gratuitas.
 */

const ID = 'ad19', P = 'ad-calido';

export const CalidoAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('cuatro'), 'Solo cuatro formas'], [m('conocen'), 'Quienes ya te conocen'], [m('aca'), 'El marco ACA'], [m('novende'), 'No le vendes'], [m('casos'), 'Cinco casos gratuitos'],
  ];
  const CUAD: [string, string, number, number, string][] = [['calido', 'Cálido', 380, 300, NARANJA], ['contenido', 'Contenido', 820, 300, VIOLETA], ['frio', 'En frío', 380, 600, AZUL_M], ['pagados', 'Anuncios', 820, 600, ROSA]];
  const ACA: [string, string, string][] = [['reconocer', 'Reconocer', AZUL_M], ['cumplido', 'Cumplido', ROSA], ['preguntar', 'Preguntar', VERDE]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Alcance cálido">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Los cuatro canales */}
      <Toma t={t} a={0} b={m('conocen')} cy={460}>
        <g opacity={e1(t, m('cuatro'))}>
          {!movil && <><Txt f="a" x={380} y={160} textAnchor="middle" fontSize={26} fill={c.tenue}>Uno a uno</Txt><Txt f="a" x={820} y={160} textAnchor="middle" fontSize={26} fill={c.tenue}>Uno a muchos</Txt>
            <Txt f="a" x={140} y={300} textAnchor="middle" fontSize={26} fill={c.tenue}>Te conocen</Txt><Txt f="a" x={140} y={600} textAnchor="middle" fontSize={26} fill={c.tenue}>Desconocidos</Txt></>}
          {CUAD.map(([n, txt, x, y, col], k) => (
            <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.15}>
              <rect x={x - 200} y={y - 130} width={400} height={260} rx={30} fill={col} opacity={0.16} />
              <g transform={`translate(${x} ${y - 20})`}>
                {k === 0 && <Telefono x={0} y={30} s={0.55} />}
                {k === 1 && <g><rect x={-70} y={-50} width={140} height={90} rx={10} fill="#0b1220" /><path d="M -14 -22 L 20 -4 L -14 14 Z" fill={col} /></g>}
                {k === 2 && <Sobre x={0} y={0} s={1} color={col} />}
                {k === 3 && <Megafono x={-30} y={20} s={0.6} habla={1} t={t} />}
              </g>
              <Letrero x={x} y={y + 90} texto={txt} fondo={col} id={ID} tam={26} />
            </g>
          ))}
        </g>
      </Toma>

      {/* 2 · Los contactos y los cien mensajes */}
      <Toma t={t} a={m('conocen')} b={m('aca')} cy={470}>
        <g opacity={e1(t, m('conocen'))}>
          <Persona id={ID} x={200} y={680} s={0.8} cuerpo={NARANJA} />
          <g transform="translate(470 470)">
            <rect x={-110} y={-200} width={220} height={400} rx={30} fill="#1e293b" />
            <rect x={-96} y={-180} width={192} height={360} rx={16} fill="#0b1220" />
            {Array.from({ length: 8 }, (_, k) => <g key={k} opacity={sm(t, m('contactos') + k * 0.12, m('contactos') + k * 0.12 + 0.3)}><circle cx={-70} cy={-150 + k * 42} r={14} fill={[ROSA, AZUL_M, VERDE, AMBAR][k % 4]} /><rect x={-48} y={-156 + k * 42} width={120} height={12} rx={6} fill="#334155" /></g>)}
          </g>
          {t >= m('mil') && <Letrero x={470} y={720} texto="Tus primeros mil" id={ID} tam={28} op={e1(t, m('mil'))} />}
          {t >= m('cien') && (
            <g opacity={e1(t, m('cien'))}>
              {Array.from({ length: 6 }, (_, k) => { const ph = ((t - m('cien')) * 0.5 + k / 6) % 1; return <g key={k} transform={`translate(${lerp(600, 1100, ph)} ${300 + k * 60 - 60 * Math.sin(Math.PI * ph)}) rotate(-10)`} opacity={Math.sin(Math.PI * ph)}><path d="M -26 0 L 26 -14 L 8 14 Z" fill={ROSA} /><path d="M 8 14 L 2 2 L 26 -14 Z" fill="#000" opacity={0.15} /></g>; })}
              <Letrero x={880} y={720} texto="100 mensajes al día" fondo={ROSA} id={ID} tam={28} />
            </g>
          )}
        </g>
      </Toma>

      {/* 3 · ACA y los cinco casos */}
      <Toma t={t} a={m('aca')} b={fin + 1} cy={470}>
        <g opacity={ventana(t, m('aca'), m('novende') + 0.3)}>
          <Persona id={ID} x={150} y={720} s={0.7} cuerpo={NARANJA} />
          <Persona id={ID} x={1050} y={720} s={0.7} cuerpo={AZUL_M} />
          {ACA.map(([n, txt, col], k) => {
            const u = sm(t, m(n), m(n) + 0.6);
            return (
              <g key={n} opacity={u} transform={`translate(${380 + k * 220} ${600 - k * 110})`}>
                <rect x={-100} y={-50} width={200} height={100} rx={26} fill={col} style={sombra(0.22, 3, 8)} />
                <Txt x={0} y={12} textAnchor="middle" fontSize={movil ? 30 : 28} fill="#fff" peso={800}>{txt}</Txt>
              </g>
            );
          })}
          {t >= m('aca') && <Letrero x={600} y={190} texto="A · C · A" id={ID} tam={36} op={e1(t, m('aca'))} />}
        </g>
        {t >= m('novende') && (
          <g opacity={e1(t, m('novende'))}>
            <Persona id={ID} x={180} y={720} s={0.7} cuerpo={NARANJA} />
            <Burbuja x={230} y={430} w={460} texto="¿Conoces a alguien que…?" u={sm(t, m('conoce'), m('conoce') + 1.4)} c={c} id={ID} tam={32} />
          </g>
        )}
        {t >= m('casos') && (
          <g opacity={e1(t, m('casos'))}>
            {[0, 1, 2, 3, 4].map((k) => <g key={k} transform={`translate(${640 + (k % 3) * 160} ${330 + Math.floor(k / 3) * 220})`} opacity={sm(t, m('casos') + k * 0.2, m('casos') + k * 0.2 + 0.5)}>
              <Hoja x={0} y={0} w={120} h={150} lineas={5} color={VERDE} />
              <Txt x={0} y={-40} textAnchor="middle" fontSize={26} fill={VERDE} peso={800}>Caso {k + 1}</Txt>
            </g>)}
            <Letrero x={800} y={780} texto="Gratis a cambio de una reseña" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
