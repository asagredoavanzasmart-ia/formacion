import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Sobre, Persona, Visto, Cruz, Sello, Barra, Frasco, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La lista es el activo.
 * Toma 1: el error del estudiante: un disco con un millón de correos dispara sobres que rebotan como quejas; el cable de
 * internet se corta y la caja apenas suma 70 dólares. Frente a eso, una lista que crece con permiso (cada sobre trae un
 * visto).
 * Toma 2: la regla orientativa (un dólar por nombre al mes) y la ventana de 30 días: cuatro embudos de entrada que apenas
 * dejan utilidad, y después el seguimiento que multiplica: 16,49 por cada dólar.
 */

const ID = 'br20', P = 'br-lista';

export const ListaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('activo'), 'El activo central'], [m('estudiante'), 'Un error de estudiante'], [m('permiso'), 'Con permiso'],
    [m('dolar'), 'Un dólar al mes'], [m('cuatro'), 'Treinta días'], [m('seguimiento'), 'La ganancia está en el seguimiento'],
  ];
  const corta = sm(t, m('corto'), m('corto') + 0.6);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La lista es el activo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El error y el permiso */}
      <Toma t={t} a={0} b={m('dolar')} cy={470}>
        <g opacity={ventana(t, 0.2, m('permiso'))}>
          <circle cx={230} cy={420} r={110} fill="#cbd5e1" style={sombra(0.22, 3, 8)} />
          <circle cx={230} cy={420} r={30} fill={c.panel} />
          <circle cx={230} cy={420} r={110} fill="url(#br20-marcaH)" opacity={0.18} />
          {t >= m('disco') && <Cifra x={230} y={600} valor={1000000} u={sm(t, m('disco'), m('disco') + 1)} tam={44} color={AZUL_M} miles />}
          {t >= m('disco') && Array.from({ length: 8 }, (_, k) => {
            const ph = ((t - m('disco')) * 0.8 + k / 8) % 1;
            const vuelve = ph > 0.6;
            return <Sobre key={k} x={vuelve ? lerp(760, 420, (ph - 0.6) / 0.4) : lerp(360, 760, ph / 0.6)} y={300 + (k % 4) * 70} s={0.4} color={vuelve ? ROJO_M : AZUL_M} rot={vuelve ? -20 : 0} op={t < m('corto') ? 1 : 1 - corta} />;
          })}
          <path d={`M 800 520 H ${lerp(1060, 920, corta)}`} stroke={c.texto} strokeWidth={12} strokeLinecap="round" />
          <path d={`M ${lerp(1060, 990, corta)} 520 H 1100`} stroke={c.texto} strokeWidth={12} strokeLinecap="round" opacity={t >= m('corto') ? 1 : 0} />
          {t >= m('corto') && <Letrero x={950} y={430} texto="Servicio cortado" fondo={ROJO_M} id={ID} tam={28} op={corta} />}
          {t >= m('setenta') && <Letrero x={950} y={640} texto="Ventas: $70" fondo={GRIS} id={ID} tam={28} op={e1(t, m('setenta'))} />}
        </g>
        {t >= m('permiso') && (
          <g opacity={e1(t, m('permiso'))}>
            <Frasco x={600} y={720} w={220} h={360} v={0.2 + 0.6 * sm(t, m('permiso'), m('dolar'))} t={t} c={c} color={VERDE} />
            {Array.from({ length: 5 }, (_, k) => { const ph = ((t - m('permiso')) * 0.6 + k / 5) % 1; return <g key={k} opacity={Math.sin(Math.PI * ph)}><Sobre x={lerp(300, 600, ph)} y={lerp(240, 380, ph)} s={0.4} color={VERDE} /><Visto x={lerp(300, 600, ph) + 26} y={lerp(240, 380, ph) - 22} r={14} /></g>; })}
            <Letrero x={600} y={790} texto="Se construye con permiso" fondo={VERDE} id={ID} tam={28} />
          </g>
        )}
      </Toma>

      {/* 2 · Un dólar al mes y la ventana de 30 días */}
      <Toma t={t} a={m('dolar')} b={fin + 1} cy={470}>
        <g opacity={ventana(t, m('dolar'), m('cuatro'))}>
          <Persona id={ID} x={460} y={560} s={0.9} cuerpo={AZUL_M} />
          <Txt x={640} y={470} fontSize={64} fill={VERDE} peso={800}>= $1 al mes</Txt>
          <Letrero x={600} y={680} texto="Regla orientativa del autor" fondo={GRIS} id={ID} tam={26} />
        </g>
        {t >= m('cuatro') && (
          <g opacity={e1(t, m('cuatro'))}>
            <rect x={110} y={200} width={460} height={560} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Txt x={340} y={260} textAnchor="middle" fontSize={28} fill={c.tenue}>Embudos de entrada</Txt>
            <Txt x={150} y={350} fontSize={28} fill={c.texto} peso={800}>Anuncios</Txt>
            <Txt x={530} y={350} textAnchor="end" fontSize={28} fill={ROJO_M} peso={800}>−$128 mil</Txt>
            {t >= m('gastaron') && <Txt x={150} y={420} fontSize={28} fill={c.texto} peso={800} opacity={e1(t, m('gastaron'))}>Ventas</Txt>}
            {t >= m('gastaron') && <Txt x={530} y={420} textAnchor="end" fontSize={28} fill={VERDE} peso={800} opacity={e1(t, m('gastaron'))}>+$142 mil</Txt>}
            <rect x={150} y={450} width={380} height={4} rx={2} fill={c.apagado} />
            {t >= m('gastaron') && <Txt x={530} y={510} textAnchor="end" fontSize={34} fill={c.texto} peso={800} opacity={e1(t, m('gastaron') + 0.5)}>≈ +$14 mil</Txt>}
            {t >= m('contactos') && <Cifra x={340} y={640} valor={14205} u={sm(t, m('contactos'), m('contactos') + 1)} tam={52} color={AZUL_M} miles />}
            {t >= m('contactos') && <Txt x={340} y={690} textAnchor="middle" fontSize={24} fill={c.tenue}>contactos nuevos</Txt>}
          </g>
        )}
        {t >= m('siguientes') && (
          <g opacity={e1(t, m('siguientes'))}>
            <rect x={630} y={200} width={460} height={560} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Txt x={860} y={260} textAnchor="middle" fontSize={28} fill={c.tenue}>30 días de seguimiento</Txt>
            <Cifra x={860} y={380} valor={234} u={sm(t, m("siguientes"), m("siguientes") + 1.2)} pre="$" suf=" mil" tam={56} color={VERDE} />
            {t >= m('dieciseis') && <Cifra x={860} y={540} valor={16.49} u={sm(t, m('dieciseis'), m('dieciseis') + 1)} dec={2} pre="×" tam={80} color={VERDE} />}
            {t >= m('dieciseis') && <Txt x={860} y={590} textAnchor="middle" fontSize={24} fill={c.tenue}>por cada dólar inicial</Txt>}
            {t >= m('seguimiento') && <Sello x={860} y={690} texto="Sin auditar" u={sm(t, m('seguimiento'), m('seguimiento') + 0.6)} color={GRIS} tam={28} />}
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
