import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Sobre, Persona, Visto, Sello, Frasco, Moneda3D, Tarjeta, Conector, Pastilla, Cara, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La lista es el activo.
 * Toma 1: el estudiante en su escritorio inserta un disco con un millón de correos; los sobres salen hacia una fila de
 * personas que se enojan y devuelven quejas; el cable de internet se corta y la caja apenas marca 70 dólares.
 * Toma 2: con permiso: personas que dicen «sí» y sus sobres, con un visto, llenan el frasco de la lista.
 * Toma 3: un nombre vale cerca de un dólar al mes; en 30 días los embudos de entrada dejan poco pero suman 14.205
 * contactos al frasco, y en los 30 días siguientes el frasco devuelve 234 mil dólares: 16,49 por cada dólar inicial.
 */

const ID = 'br20', P = 'br-lista';

export const ListaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('activo'), 'El activo central'], [m('estudiante'), 'Un error de estudiante'], [m('permiso'), 'Con permiso'],
    [m('dolar'), 'Un dólar al mes'], [m('cuatro'), 'Treinta días'], [m('seguimiento'), 'La ganancia está en el seguimiento'],
  ];
  const corta = sm(t, m('corto'), m('corto') + 0.6);
  const enojo = sm(t, m('disco') + 1.5, m('disco') + 2.5);
  const lleno = sm(t, m('permiso'), m('dolar'));
  const contactos = sm(t, m('contactos'), m('contactos') + 2);
  const devuelve = sm(t, m('siguientes'), m('siguientes') + 2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La lista es el activo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El error del estudiante */}
      <Toma t={t} a={0} b={m('permiso')} cy={470}>
        <g opacity={E('estudiante', 0.6, -0.4)}>
          <rect x={90} y={600} width={380} height={20} rx={6} fill="#a16207" />
          <rect x={110} y={620} width={16} height={150} fill="#92400e" /><rect x={434} y={620} width={16} height={150} fill="#92400e" />
          <Persona id={ID} x={170} y={600} s={0.75} cuerpo={AZUL_M} />
          <rect x={250} y={500} width={170} height={100} rx={8} fill="#1f2937" /><rect x={236} y={596} width={198} height={10} rx={4} fill="#475569" />
          {t >= m('disco') && <g transform={`translate(${lerp(500, 380, sm(t, m('disco'), m('disco') + 0.8))} 560)`}><circle r={34} fill="#e2e8f0" /><circle r={34} fill={`url(#${ID}-marca)`} opacity={0.3} /><circle r={9} fill={c.panel} /></g>}
          <Pastilla x={330} y={440} texto={movil ? '1 millón' : '1.000.000 de correos'} fondo={AZUL_M} tam={24} op={E('disco')} />
          <path d={`M 430 560 C 520 560 520 700 ${lerp(600, 560, corta)} 700`} stroke={c.texto} strokeWidth={8} fill="none" />
          <path d={`M ${lerp(600, 640, corta)} 700 H 700`} stroke={c.texto} strokeWidth={8} opacity={t >= m('corto') ? 1 : 0} />
          {t < m('corto') && <path d="M 600 700 H 700" stroke={c.texto} strokeWidth={8} />}
          <rect x={700} y={670} width={90} height={60} rx={10} fill="#475569" />
          <Txt x={745} y={708} textAnchor="middle" fontSize={20} fill="#fff" peso={800}>Internet</Txt>
          {corta > 0 && <Pastilla x={600} y={770} texto={movil ? 'Cortado' : 'Servicio cortado'} fondo={ROJO_M} tam={24} op={corta} />}
        </g>
        {t >= m('disco') && Array.from({ length: 6 }, (_, k) => {
          const p = ((t - m('disco')) * 0.7 + k / 6) % 1;
          return <Sobre key={k} x={lerp(420, 880 + (k % 3) * 100, p)} y={lerp(520, 300 + Math.floor(k / 3) * 140, p) - 80 * Math.sin(Math.PI * p)} s={0.35} color={AZUL_M} op={Math.sin(Math.PI * p) * (1 - corta)} />;
        })}
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const x = 880 + (k % 3) * 100, y = 380 + Math.floor(k / 3) * 140;
          return <g key={k} opacity={E('disco', 0.5, 0.6)}><Persona id={ID} x={x} y={y} s={0.42} cuerpo={GRIS} /><Cara id={ID} x={x} y={y - 56} r={14} e={-enojo} enojo={enojo} />{enojo > 0.5 && <g opacity={enojo}><rect x={x + 14} y={y - 110} width={34} height={22} rx={5} fill={ROJO_M} /><Txt x={x + 31} y={y - 93} textAnchor="middle" fontSize={16} fill="#fff" peso={800}>!</Txt></g>}</g>;
        })}
        <Pastilla x={980} y={240} texto={movil ? '+30 quejas' : 'Más de 30 quejas'} fondo={ROJO_M} tam={24} op={E('disco', 0.5, 2.4)} />
        {t >= m('setenta') && <g opacity={E('setenta')}><rect x={880} y={640} width={220} height={120} rx={16} fill="#334155" /><rect x={900} y={655} width={180} height={50} rx={8} fill="#a3e635" opacity={0.85} /><Txt x={990} y={692} textAnchor="middle" fontSize={34} fill="#1f2937" peso={800}>$70</Txt></g>}
      </Toma>

      {/* 2 · Con permiso */}
      <Toma t={t} a={m('permiso')} b={m('dolar')} cy={470}>
        {[0, 1, 2, 3].map((k) => {
          const x = 180 + k * 120;
          return (
            <g key={k} opacity={E('permiso', 0.5, k * 0.25)}>
              <Persona id={ID} x={x} y={720} s={0.6} cuerpo={[NARANJA, ROSA, VIOLETA, TEAL][k]} />
              <Cara id={ID} x={x} y={640} r={18} e={1} />
              <rect x={x - 30} y={530} width={60} height={34} rx={10} fill={VERDE} /><Txt x={x} y={555} textAnchor="middle" fontSize={20} fill="#fff" peso={800}>Sí</Txt>
            </g>
          );
        })}
        {Array.from({ length: 5 }, (_, k) => { const p = ((t - m('permiso')) * 0.5 + k / 5) % 1; return <g key={k} opacity={Math.sin(Math.PI * p)}><Sobre x={lerp(240 + (k % 4) * 120, 870, p)} y={lerp(500, 420, p) - 90 * Math.sin(Math.PI * p)} s={0.4} color={VERDE} /><Visto x={lerp(240 + (k % 4) * 120, 870, p) + 26} y={lerp(500, 420, p) - 90 * Math.sin(Math.PI * p) - 20} r={12} /></g>; })}
        <Frasco x={870} y={760} w={230} h={360} v={0.15 + 0.65 * lleno} t={t} c={c} color={VERDE} />
        <Pastilla x={870} y={330} texto={movil ? 'Con permiso' : 'Se construye con permiso'} fondo={VERDE} tam={26} op={E('permiso')} />
      </Toma>

      {/* 3 · Un dólar al mes y los 30 días */}
      <Toma t={t} a={m('dolar')} b={fin + 1} cy={470}>
        <Frasco x={600} y={760} w={190} h={300} v={0.2 + 0.6 * contactos} t={t} c={c} color={VIOLETA} />
        <Txt x={600} y={800} textAnchor="middle" fontSize={24} fill={c.texto} peso={800}>Tu lista</Txt>
        <Pastilla x={600} y={250} texto={movil ? '1 nombre ≈ $1/mes' : 'Cada nombre ≈ $1 al mes'} fondo={GRIS} tam={26} op={E('dolar') * (1 - E('cuatro'))} />
        {t >= m('dolar') && t < m('cuatro') + 1 && [0, 1, 2].map((k) => { const p = (t * 0.6 + k / 3) % 1; return <Moneda3D key={k} x={600 + (k - 1) * 40} y={lerp(300, 440, p)} r={16} giro={Math.cos(t * 4)} op={Math.sin(Math.PI * p) * (1 - E('cuatro'))} />; })}
        <Tarjeta x={60} y={200} w={420} h={500} titulo={movil ? 'Entrada · 30 días' : 'Embudos de entrada · 30 días'} c={c} id={ID} op={E('cuatro')} acento={NARANJA} tam={22}>
          <Txt x={40} y={120} fontSize={28} fill={c.texto} peso={800}>{movil ? 'Gasto' : 'Anuncios'}</Txt>
          <Txt x={380} y={120} textAnchor="end" fontSize={28} fill={ROJO_M} peso={800}>−$128 mil</Txt>
          <Txt x={40} y={180} fontSize={28} fill={c.texto} peso={800} opacity={E('gastaron')}>Ventas</Txt>
          <Txt x={380} y={180} textAnchor="end" fontSize={28} fill={VERDE} peso={800} opacity={E('gastaron')}>+$142 mil</Txt>
          <rect x={40} y={205} width={340} height={4} rx={2} fill={c.apagado} />
          <Txt x={380} y={256} textAnchor="end" fontSize={30} fill={c.texto} peso={800} opacity={E('gastaron', 0.5, 0.6)}>≈ +$14 mil</Txt>
          {contactos > 0 && <Cifra x={210} y={380} valor={14205} u={contactos} tam={50} color={VIOLETA} miles />}
          <Txt x={210} y={420} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800} opacity={contactos}>contactos nuevos</Txt>
        </Tarjeta>
        {contactos > 0 && contactos < 1 && Array.from({ length: 5 }, (_, k) => { const p = (t * 0.8 + k / 5) % 1; return <circle key={k} cx={lerp(480, 590, p)} cy={lerp(560, 560, p) - 40 * Math.sin(Math.PI * p)} r={9} fill={VIOLETA} opacity={Math.sin(Math.PI * p)} />; })}
        <Tarjeta x={720} y={200} w={420} h={500} titulo={movil ? '30 días después' : 'Los 30 días siguientes'} c={c} id={ID} op={E('siguientes')} acento={VERDE} tam={22}>
          <Cifra x={210} y={150} valor={234} u={devuelve} pre="$" suf=" mil" tam={56} color={VERDE} />
          <Cifra x={210} y={300} valor={16.49} u={sm(t, m('dieciseis'), m('dieciseis') + 1)} dec={2} pre="×" tam={78} color={VERDE} />
          <Txt x={210} y={350} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800} opacity={E('dieciseis')}>{movil ? 'por dólar' : 'por cada dólar inicial'}</Txt>
        </Tarjeta>
        {devuelve > 0 && Array.from({ length: 4 }, (_, k) => { const p = (t * 0.7 + k / 4) % 1; return <Moneda3D key={k} x={lerp(650, 760, p)} y={lerp(560, 420, p) - 30 * Math.sin(Math.PI * p)} r={14} giro={Math.cos(t * 5)} op={Math.sin(Math.PI * p)} />; })}
        <Pastilla x={930} y={770} texto={movil ? 'En el seguimiento' : 'La ganancia está en el seguimiento'} fondo={VERDE} tam={22} op={E('seguimiento')} />
        {t >= m('seguimiento') && <Sello x={930} y={630} texto="Sin auditar" u={sm(t, m('seguimiento') + 0.6, m('seguimiento') + 1.2)} color={GRIS} tam={24} rot={-4} />}
      </Toma>
    </Lienzo>
  );
};
