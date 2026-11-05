import React from 'react';
import { useEscenaES, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Estrella, Hoja, Visto, Cruz, Suelo, Colinas, e1, sm, ventana, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitES';
import type { PropsCE } from './kitES';

/**
 * Pequeñas victorias.
 * Toma 1: una escalera de peldaños bajos que alguien sube; cada peldaño se enciende con una estrella (Herzberg: logro y
 * reconocimiento; Amabile y Kramer: progresar en algo significativo, con la pila de diarios).
 * Toma 2: la primera acción obvia: el sobre con un disco que viaja al buzón (Netflix); la versión fea: el avión liviano de
 * MacCready que vuela, cae, se repara y vuelve a volar; la franja de error aceptado de Hoffman.
 * Toma 3 (Richmond): el policía entrega una multa positiva al joven con casco; el adolescente la pega en su pared.
 */

const ID = 'es21', P = 'es-victorias';

const AvionFeo: React.FC<{ x: number; y: number; rot: number }> = ({ x, y, rot }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-170} y={-6} width={340} height={10} rx={5} fill="#cbd5e1" />
    <path d="M -170 -6 L -150 -26 L 150 -26 L 170 -6 Z" fill="#e2e8f0" opacity={0.85} />
    <rect x={-6} y={-6} width={12} height={70} fill="#94a3b8" />
    <circle cx={0} cy={70} r={14} fill="#f7c4a0" />
    <path d="M -20 54 L 20 54 L 14 90 L -14 90 Z" fill={NARANJA} />
  </g>
);

export const VictoriasES: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaES(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('impulso'), 'Avances pequeños y visibles'], [m('herzberg'), 'Frederick Herzberg, 1968'], [m('amabile'), 'Amabile y Kramer'], [m('tacticas'), 'Tres tácticas'],
    [m('primera'), 'La primera acción obvia'], [m('fea'), 'Una primera versión fea'], [m('hoffman'), 'Reid Hoffman'], [m('visible'), 'El progreso visible'],
    [m('multas'), 'Multas positivas'], [m('pared'), 'Un reconocimiento que se guarda'],
  ];
  const sube = Math.min(5, Math.floor(Math.max(0, t - m('impulso')) * 0.4));
  const vuelo = (t - m('maccready')) % 4;
  const cae = vuelo > 2 && vuelo < 3;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Pequeñas victorias">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la escalera de victorias */}
      <Toma t={t} a={0} b={m('tacticas')} cy={480}>
        <Suelo y={760} isDark={isDark} x0={80} x1={1120} />
        {Array.from({ length: 6 }, (_, k) => (
          <g key={k} opacity={e1(t, m('impulso') + 0.15 * k)}>
            <rect x={160 + k * 130} y={760 - (k + 1) * 60} width={130} height={(k + 1) * 60} rx={6} fill={k <= sube ? NARANJA : c.apagado} opacity={k <= sube ? 0.9 : 1} />
            {k <= sube && <Estrella x={225 + k * 130} y={730 - (k + 1) * 60 - 6 * Math.sin(t * 4 + k)} r={18} fill="#f59e0b" />}
          </g>
        ))}
        <Persona id={ID} x={225 + sube * 130} y={760 - (sube + 1) * 60} s={0.85} cuerpo={AZUL_M} />
        {t >= m('logro') && <Letrero x={980} y={260} texto="Logro + reconocimiento" fondo={VIOLETA} id={ID} tam={26} op={e1(t, m('logro'))} />}
        {t >= m('amabile') && (
          <g opacity={e1(t, m('amabile'))}>
            {[0, 1, 2, 3].map((k) => <Hoja key={k} x={1000 + k * 8} y={420 - k * 10} w={110} h={140} lineas={5} />)}
            <Txt x={1010} y={530} textAnchor="middle" fontSize={24} fill={c.texto}>Miles de diarios</Txt>
          </g>
        )}
        {t >= m('victoria') && <Letrero x={600} y={190} texto="Progresar en algo significativo" id={ID} tam={28} op={e1(t, m('victoria'))} />}
      </Toma>

      {/* 2 · primera acción obvia y versión fea */}
      <Toma t={t} a={m('tacticas')} b={m('visible')} cy={470}>
        {ventana(t, m('tacticas') - 0.1, m('fea')) > 0.01 && (
          <g opacity={ventana(t, m('tacticas') - 0.1, m('fea'))}>
            <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
            <g transform="translate(980 720)"><rect x={-8} y={-160} width={16} height={160} fill="#64748b" /><rect x={-70} y={-240} width={140} height={90} rx={30} fill={AZUL_M} /><rect x={-50} y={-200} width={100} height={10} rx={5} fill="#1e3a8a" /></g>
            {t >= m('netflix') && (() => {
              const u = sm(t, m('disco'), m('disco') + 2.4);
              return (
                <g transform={`translate(${lerp(260, 960, u)} ${lerp(500, 500, u) - 120 * Math.sin(Math.PI * u)})`}>
                  <rect x={-70} y={-46} width={140} height={92} rx={8} fill="#fef3c7" />
                  <circle cx={0} cy={0} r={30} fill="#cbd5e1" /><circle r={8} fill="#fef3c7" />
                </g>
              );
            })()}
            {t >= m('disco') + 2.4 && <Visto x={1060} y={430} r={30} />}
            <Persona id={ID} x={220} y={720} s={1} cuerpo={ROJO_M} />
            <Letrero x={600} y={250} texto="Netflix: un solo disco por correo" id={ID} tam={28} op={e1(t, m('netflix'))} />
          </g>
        )}
        {t >= m('fea') && (
          <g opacity={e1(t, m('fea'))}>
            <Colinas y={640} isDark={isDark} t={t} op={0.7} />
            {t >= m('maccready') && <AvionFeo x={lerp(240, 960, (vuelo % 2) / 2)} y={cae ? 360 + (vuelo - 2) * 280 : 360 + 20 * Math.sin(t * 2)} rot={cae ? (vuelo - 2) * 40 : 4 * Math.sin(t * 2)} />}
            {t >= m('maccready') && cae && <Cruz x={900} y={300} r={26} />}
            {t >= m('fallar') && <Letrero x={600} y={230} texto="Se repara en minutos: volar y fallar cientos de veces" fondo={GRIS} id={ID} tam={24} op={e1(t, m('fallar'))} />}
            {t >= m('error') && (
              <g opacity={e1(t, m('error'))}>
                <rect x={300} y={720} width={600} height={40} rx={20} fill={c.apagado} />
                <rect x={300 + 600 * 0.1} y={720} width={600 * 0.1} height={40} fill={ROJO_M} opacity={0.8} />
                <Txt x={600} y={810} textAnchor="middle" fontSize={26} fill={c.texto}>Hoffman: 10–20 % de error para ir rápido</Txt>
              </g>
            )}
            {!movil && t >= m('maccready') && <Txt f="a" x={600} y={170} textAnchor="middle" fontSize={22} fill={c.tenue}>Paul MacCready, premio Kremer</Txt>}
          </g>
        )}
      </Toma>

      {/* 3 · Richmond */}
      <Toma t={t} a={m('visible')} b={fin + 1} cy={480}>
        <Suelo y={740} isDark={isDark} x0={80} x1={1120} />
        {ventana(t, m('visible') - 0.1, m('pared')) > 0.01 && (
          <g opacity={ventana(t, m('visible') - 0.1, m('pared'))}>
            <g opacity={e1(t, m('richmond'))}>
              <Persona id={ID} x={360} y={740} s={1.05} cuerpo="#1e3a8a" />
              <rect x={326} y={548} width={68} height={16} rx={6} fill="#0f172a" /><rect x={334} y={530} width={52} height={22} rx={8} fill="#1e3a8a" />
            </g>
            <Persona id={ID} x={760} y={740} s={0.95} cuerpo={NARANJA} />
            <path d="M 712 600 Q 760 560 808 600 Z" fill={VERDE} opacity={e1(t, m('multas'))} />
            {t >= m('multas') && (() => { const u = sm(t, m('multas') + 0.4, m('multas') + 1.4); return <g transform={`translate(${lerp(420, 700, u)} 600)`}><rect x={-50} y={-34} width={100} height={68} rx={8} fill="#fde68a" /><Txt x={0} y={8} textAnchor="middle" fontSize={20} fill="#78350f">¡Bien!</Txt></g>; })()}
            {t >= m('multas') && <Letrero x={600} y={260} texto="Por llevar casco: una entrada al cine" fondo={VERDE} id={ID} tam={26} op={e1(t, m('multas') + 1)} />}
          </g>
        )}
        {t >= m('pared') && (
          <g opacity={e1(t, m('pared'))}>
            <rect x={240} y={180} width={720} height={420} rx={10} fill={isDark ? '#3f3f46' : '#f5f5f4'} />
            <g transform={`translate(600 ${lerp(500, 360, sm(t, m('pared'), m('pared') + 1))}) rotate(-4)`}>
              <rect x={-110} y={-70} width={220} height={140} rx={10} fill="#fde68a" />
              <circle cx={0} cy={-80} r={10} fill={ROJO_M} />
              <Txt x={0} y={0} textAnchor="middle" fontSize={30} fill="#78350f">Multa</Txt>
              <Txt x={0} y={40} textAnchor="middle" fontSize={30} fill="#78350f">positiva</Txt>
            </g>
            <Persona id={ID} x={820} y={740} s={0.95} cuerpo={NARANJA} />
            <Letrero x={600} y={680} texto="La guardó en vez de canjearla" id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
