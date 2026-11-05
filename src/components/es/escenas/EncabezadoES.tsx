import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Hoja, Avion, Visto, Flecha, Estrella, Suelo, Sello, e1, sm, ventana, lerp, azar, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Encontrar el encabezado.
 * Toma 1 (Nora Ephron): el profesor dicta los hechos en la pizarra; los estudiantes escriben quién, qué y dónde; cae el
 * diario con el encabezado correcto: el jueves no habrá clases.
 * Toma 2 (vuelo 401): el avión en perfecto estado; plano cercano del tablero: la luz verde que no se enciende recibe toda la
 * atención mientras la aguja del altímetro baja; el avión desciende.
 * Toma 3: el equipo con flechas que se van por la tangente; la pregunta en el centro las alinea; el diario de 90 días.
 */

const ID = 'es07', P = 'es-encabezado';

export const EncabezadoES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('ephron'), 'Nora Ephron'], [m('simms'), 'Los hechos'], [m('encabezado'), '¿Cuál es el encabezado?'], [m('jueves'), 'El jueves no habrá clases'],
    [m('vuelo'), 'Vuelo 401, 1972'], [m('luz'), 'Todos miran una luz'], [m('altura'), 'Nadie mira la altura'], [m('pregunta'), 'Aclarar la pregunta'],
    [m('gano'), 'Ganaron por mucho'], [m('diario'), 'Un diario breve'],
  ];
  const HECHOS = ['Jueves', 'Sacramento', 'Margaret Mead', 'Gobernador'];
  const baja = sm(t, m('altura'), m('altura') + 3);
  const orden = sm(t, m('cohen') + 1.5, m('cohen') + 2.6);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Encontrar el encabezado">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la clase de periodismo */}
      <Toma t={t} a={0} b={m('vuelo')} cy={480}>
        <g opacity={1 - sm(t, m('jueves') - 0.2, m('jueves') + 0.4)}>
        <Suelo y={760} isDark={isDark} x0={80} x1={1120} />
        <rect x={110} y={180} width={520} height={340} rx={14} fill="#14532d" opacity={e1(t, m('simms'))} />
        {HECHOS.map((h, k) => <Txt key={h} f="a" x={150} y={250 + k * 70} fontSize={36} fill="#f8fafc" opacity={e1(t, m('sacramento') - 1 + 0.4 * k)}>{`· ${h}`}</Txt>)}
        <Persona id={ID} x={700} y={760} s={1.05} cuerpo="#334155" pelo="#9ca3af" />
        {t >= m('simms') && <Letrero x={700} y={540} texto="Charlie Simms" fondo={GRIS} id={ID} tam={26} op={e1(t, m('simms'))} />}
        {[0, 1, 2].map((k) => (
          <g key={k} opacity={e1(t, m('ephron') + 0.2 * k)}>
            <Persona id={ID} x={880 + k * 100} y={760} s={0.7} cuerpo={[NARANJA, ROSA, AZUL_M][k]} />
            {t >= m('encabezado') && <Hoja x={880 + k * 100} y={600 - 10 * Math.sin(t * 3 + k)} w={60} h={76} lineas={3} />}
          </g>
        ))}
        </g>
        {t >= m('jueves') && (
          <g transform={`translate(600 ${lerp(-300, 420, sm(t, m('jueves'), m('jueves') + 0.8))}) rotate(${lerp(-12, -3, sm(t, m('jueves'), m('jueves') + 0.8))})`}>
            <rect x={-330} y={-150} width={660} height={300} rx={10} fill="#f8fafc" style={{ filter: 'drop-shadow(0 10px 16px rgba(0,0,0,.25))' }} />
            <Txt x={0} y={-80} textAnchor="middle" fontSize={30} fill="#64748b">EL DIARIO ESCOLAR</Txt>
            <Txt x={0} y={0} textAnchor="middle" fontSize={50} fill="#0f172a">El jueves no</Txt>
            <Txt x={0} y={64} textAnchor="middle" fontSize={50} fill="#0f172a">habrá clases</Txt>
          </g>
        )}
        {t >= m('punto') && <Letrero x={600} y={680} texto="Qué significa para quien lo lee" id={ID} tam={28} op={e1(t, m('punto'))} />}
      </Toma>

      {/* 2 · el vuelo 401 */}
      <Toma t={t} a={m('vuelo')} b={m('pregunta')} cy={470}>
        {ventana(t, m('vuelo') - 0.1, m('luz')) > 0.01 && (
          <g opacity={ventana(t, m('vuelo') - 0.1, m('luz'))}>
            <Avion x={600} y={420} s={1.2} cola="#1d4ed8" />
            {t >= m('perfecto') && <g opacity={e1(t, m('perfecto'))}><Visto x={900} y={260} r={40} /><Letrero x={600} y={640} texto="En perfecto estado" fondo={VERDE} id={ID} tam={30} /></g>}
          </g>
        )}
        {t >= m('luz') && (
          <g opacity={e1(t, m('luz'))}>
            <rect x={140} y={200} width={920} height={420} rx={30} fill="#1f2937" />
            <g transform="translate(360 410)">
              <circle r={120} fill="#0b1220" />
              <circle r={42} fill={0.5 + 0.5 * Math.sin(t * 3) > 0.5 ? '#14532d' : '#166534'} />
              <circle r={150 + 10 * Math.sin(t * 4)} fill="none" stroke="#fde68a" strokeWidth={6} opacity={0.6} />
              <Txt x={0} y={170} textAnchor="middle" fontSize={26} fill="#e5e7eb">Luz del tren</Txt>
            </g>
            <g transform="translate(820 410)">
              <circle r={120} fill="#0b1220" />
              {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-3} y={-112} width={6} height={18} fill="#94a3b8" transform={`rotate(${k * 36})`} />)}
              <rect x={-5} y={-100} width={10} height={100} rx={5} fill={baja > 0.3 ? ROJO_M : '#f8fafc'} transform={`rotate(${lerp(20, -150, baja)})`} />
              <circle r={12} fill="#f8fafc" />
              <Txt x={0} y={170} textAnchor="middle" fontSize={26} fill="#e5e7eb">Altímetro</Txt>
            </g>
            {t >= m('altura') && <Letrero x={600} y={720} texto="Nadie miró la altura" fondo={ROJO_M} id={ID} tam={30} op={e1(t, m('altura'))} />}
          </g>
        )}
        {!movil && <Txt f="a" x={600} y={170} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('vuelo'))}>Eastern Air Lines · Everglades de Florida</Txt>}
      </Toma>

      {/* 3 · aclarar la pregunta */}
      <Toma t={t} a={m('pregunta')} b={fin + 1} cy={480}>
        {ventana(t, m('pregunta') - 0.1, m('diario')) > 0.01 && (
          <g opacity={ventana(t, m('pregunta') - 0.1, m('diario'))}>
            <ellipse cx={600} cy={520} rx={300} ry={110} fill="#a16b3f" />
            {[0, 1, 2, 3, 4, 5].map((k) => {
              const a = (k / 6) * Math.PI * 2;
              const x = 600 + 380 * Math.cos(a), y = 520 + 170 * Math.sin(a);
              const caos = (azar(k) - 0.5) * 3;
              const ang = lerp(a + caos, Math.atan2(520 - y, 600 - x), orden);
              return (
                <g key={k}>
                  <Persona id={ID} x={x} y={y + 120} s={0.6} cuerpo={[NARANJA, ROSA, AZUL_M, VIOLETA, VERDE, '#0ea5e9'][k]} />
                  <Flecha x1={x} y1={y - 20} x2={x + 110 * Math.cos(ang)} y2={y - 20 + 110 * Math.sin(ang)} color={orden > 0.5 ? NARANJA : GRIS} grosor={8} u={e1(t, m('pregunta') + 0.1 * k)} />
                </g>
              );
            })}
            {t >= m('cohen') && <g opacity={e1(t, m('cohen') + 1.2)}><circle cx={600} cy={520} r={70} fill={NARANJA} /><Txt x={600} y={548} textAnchor="middle" fontSize={80} fill="#fff">?</Txt></g>}
            {t >= m('cohen') && <Letrero x={600} y={230} texto="¿Qué pregunta tratamos de responder?" id={ID} tam={28} op={e1(t, m('cohen'))} />}
            {t >= m('gano') && [0, 1, 2].map((k) => <Estrella key={k} x={980 + k * 50} y={230 - 10 * Math.sin(t * 4 + k)} r={24} fill="#f59e0b" />)}
            {!movil && t >= m('cohen') && <Txt f="a" x={600} y={800} textAnchor="middle" fontSize={22} fill={c.tenue}>El equipo de Elay Cohen, de Salesforce</Txt>}
          </g>
        )}
        {t >= m('diario') && (
          <g opacity={e1(t, m('diario'))}>
            <rect x={340} y={220} width={520} height={480} rx={20} fill="#7c3aed" />
            <rect x={370} y={240} width={470} height={440} rx={12} fill="#f8fafc" />
            {Array.from({ length: 7 }, (_, k) => <rect key={k} x={400} y={300 + k * 52} width={lerp(0, 380 - (k % 3) * 60, sm(t, m('diario') + 0.3 * k, m('diario') + 0.3 * k + 0.6))} height={10} rx={5} fill="#cbd5e1" />)}
            <Sello x={720} y={620} texto="CADA 90 DÍAS" u={sm(t, m('diario') + 2.4, m('diario') + 3)} color={NARANJA} tam={26} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
