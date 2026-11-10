import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Persona, Volante, Edificio, Telefono, Sobre, Calendario, Reloj, Burbuja, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Más: la regla del cien.
 * Toma 1: tres botones del protocolo (más, mejor, nuevo); se enciende «más». La regla: tres contadores de 100
 * (contactos, minutos, días) y un reloj que marca la mañana sin reuniones.
 * Toma 2: el primer gimnasio: 300 volantes vuelan; solo llama un vecino enojado. El mentor: una montaña de 5.000
 * volantes, y luego 5.000 por día. Una barra compara 300 con 5.000.
 * Toma 3: en B2B, la secuencia de correos abandonada a los 50 envíos: una curva que apenas empezaba.
 */

const ID = 'ad26', P = 'ad-mas';

export const MasAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('protocolo'), 'Más, mejor y nuevo'], [m('cien'), 'La regla del cien'], [m('trescientos'), 'Los 300 volantes'], [m('mentor'), 'El mentor: 5.000'],
    [m('fraccion'), 'Una fracción del volumen'], [m('correos'), 'En ventas a empresas'],
  ];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Más: la regla del cien">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El protocolo y la regla del cien */}
      <Toma t={t} a={0} b={m('trescientos')} cy={470}>
        <g opacity={e1(t, m('protocolo'))}>
          {(['Más', 'Mejor', 'Nuevo'] as const).map((s, k) => (
            <g key={s} transform={`translate(${330 + k * 270} 220)`}>
              <rect x={-110} y={-50} width={220} height={100} rx={50} fill={k === 0 && t >= m('cien') ? NARANJA : c.apagado} style={sombra(c.sombra, 3, 8)} />
              <Txt x={0} y={14} textAnchor="middle" fontSize={40} fill={k === 0 && t >= m('cien') ? '#fff' : c.tenue} peso={800}>{s}</Txt>
            </g>
          ))}
        </g>
        {([['contactos', 'Contactos al día', AZUL_M], ['minutos', 'Minutos al día', VIOLETA], ['dias', 'Días seguidos', VERDE]] as const).map(([n, txt, col], k) => (
          <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0}>
            <rect x={150 + k * 310} y={330} width={280} height={250} rx={28} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
            <Cifra x={290 + k * 310} y={470} valor={100} u={sm(t, m(n), m(n) + 1)} tam={90} color={col} />
            <Txt f="a" x={290 + k * 310} y={540} textAnchor="middle" fontSize={26} fill={c.texto}>{movil ? txt.split(' ')[0] : txt}</Txt>
          </g>
        ))}
        {t >= m('mediodia') && (
          <g opacity={e1(t, m('mediodia'))}>
            <Reloj x={450} y={710} r={56} t={t} vel={0.5} />
            <Letrero x={720} y={710} texto="Sin reuniones hasta el mediodía" fondo={AMBAR} id={ID} tam={26} />
          </g>
        )}
      </Toma>

      {/* 2 · Los volantes */}
      <Toma t={t} a={m('trescientos')} b={m('correos')} cy={470}>
        <g opacity={e1(t, m('trescientos'))}>
          <Edificio x={170} y={720} w={170} h={220} color={NARANJA} />
          <Persona id={ID} x={330} y={720} s={0.65} cuerpo={NARANJA} />
          {Array.from({ length: 6 }, (_, k) => { const ph = ((t - m('trescientos')) * 0.5 + k / 6) % 1; return <Volante key={k} x={lerp(360, 640, ph)} y={560 - 200 * Math.sin(Math.PI * ph) + k * 10} s={0.7} rot={ph * 200} op={t < m('mentor') ? Math.sin(Math.PI * ph) : 0} />; })}
          {t >= m('vecino') && (
            <g opacity={ventana(t, m('vecino'), m('mentor'))}>
              <Telefono x={720} y={420} s={0.5} />
              <Burbuja x={760} y={300} w={300} texto="¡Basta de papeles!" u={sm(t, m('vecino'), m('vecino') + 1)} c={c} id={ID} tam={28} />
            </g>
          )}
          {t >= m('concluyo') && <Letrero x={600} y={780} texto="«Los volantes no funcionan»" fondo={GRIS} id={ID} tam={26} op={ventana(t, m('concluyo'), m('mentor'))} />}
        </g>
        {t >= m('mentor') && (
          <g opacity={e1(t, m('mentor'))}>
            <Persona id={ID} x={560} y={720} s={0.65} cuerpo={VIOLETA} corbata />
            {Array.from({ length: 18 }, (_, k) => <Volante key={k} x={760 + (k % 6) * 50} y={700 - Math.floor(k / 6) * 70 - (k % 2) * 10} s={0.8} rot={-12 + (k * 7) % 24} op={sm(t, m('cincomil') + k * 0.04, m('cincomil') + k * 0.04 + 0.3)} />)}
            {t >= m('cincomil') && <Cifra x={900} y={380} valor={5000} u={sm(t, m('cincomil'), m('cincomil') + 1)} tam={80} color={VIOLETA} miles />}
            {t >= m('dia') && <Letrero x={900} y={300} texto="…y 5.000 por día" fondo={VIOLETA} id={ID} tam={28} op={e1(t, m('dia'))} />}
          </g>
        )}
        {t >= m('fraccion') && (
          <g opacity={e1(t, m('fraccion'))}>
            <rect x={140} y={200} width={920} height={40} rx={20} fill={c.apagado} />
            <rect x={140} y={200} width={920 * 0.06} height={40} rx={20} fill={ROJO_M} />
            <Txt x={220} y={186} fontSize={30} fill={ROJO_M} peso={800}>300</Txt>
            <Txt x={1060} y={186} textAnchor="end" fontSize={30} fill={c.texto} peso={800}>5.000</Txt>
          </g>
        )}
      </Toma>

      {/* 3 · La secuencia abandonada */}
      <Toma t={t} a={m('correos')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('correos'))}>
          <rect x={140} y={700} width={920} height={8} rx={4} fill={c.apagado} />
          <path d="M 140 700 Q 600 690 1060 300" stroke={c.apagado} strokeWidth={10} fill="none" strokeDasharray="14 14" />
          <path d="M 140 700 Q 260 698 300 694" stroke={AZUL_M} strokeWidth={12} fill="none" strokeLinecap="round" />
          {Array.from({ length: 5 }, (_, k) => <Sobre key={k} x={180 + k * 30} y={640 - k * 6} s={0.4} color={AZUL_M} />)}
          <path d="M 330 600 V 760" stroke={ROJO_M} strokeWidth={8} strokeDasharray="10 8" />
          <Letrero x={330} y={560} texto="50 envíos: abandonada" fondo={ROJO_M} id={ID} tam={26} />
          {t >= m('tasa') && <Letrero x={880} y={260} texto="Su tasa real estaba aquí" fondo={AZUL_M} id={ID} tam={26} op={e1(t, m('tasa'))} />}
        </g>
      </Toma>
    </Lienzo>
  );
};
