import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Edificio, Libro, Hoja, Visto, Brujula, Megafono, Billete, Cifra, Flujo, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * Portada: origen y fiabilidad del método.
 * Toma 1: el ciclo que se financia solo (cliente → efectivo → anuncio → cliente siguiente).
 * Toma 2: la trayectoria de Hormozi como un camino: gimnasio (2013) → Gym Launch con gimnasios clientes → torta del 66 %
 * → Acquisition.com y los dos libros.
 * Toma 3: cómo leer el método: lupa de «órdenes de magnitud» sobre las cifras de práctica y tres estudios revisados por
 * pares que se apilan como respaldo; la brújula del tres a uno es una convención.
 */

const ID = 'ad01', P = 'ad-portada';

export const PortadaAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('financien'), 'Clientes que financian al siguiente'], [m('hormozi'), 'Alex Hormozi'], [m('negocios'), 'Nació en ventas a negocios'], [m('libros'), 'Dos libros, un método'],
    [m('practicante'), 'Conocimiento de practicante'], [m('pares'), 'Lo que confirma la investigación'], [m('convenciones'), 'Reglas que orientan'],
  ];
  // Ciclo de la toma 1: cuatro estaciones en un círculo.
  const CX = 600, CY = 470, R = 230;
  const est = [[-90, 'Cliente'], [0, 'Efectivo'], [90, 'Anuncio'], [180, 'Siguiente']] as const;
  const pos = (a: number): [number, number] => [CX + R * Math.cos((a * Math.PI) / 180), CY + R * Math.sin((a * Math.PI) / 180)];
  const giro = ((t - m('financien')) * 70) % 360;
  // Camino de la toma 2.
  const hitos: [string, number, string][] = [['gimnasio', 170, '2013'], ['launch', 430, '2016'], ['vendio', 700, '2021'], ['acquisition', 960, 'Hoy']];
  const avance = sm(t, m('gimnasio'), m('acquisition') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Ofertas y adquisición">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El ciclo que se financia solo */}
      <Toma t={t} a={0} b={m('hormozi')} cy={470}>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={c.apagado} strokeWidth={14} strokeDasharray="4 22" strokeLinecap="round" />
        <path d={`M ${CX} ${CY - R} A ${R} ${R} 0 1 1 ${CX - 0.1} ${CY - R}`} stroke={`url(#${ID}-marcaH)`} strokeWidth={14} fill="none" strokeLinecap="round"
          strokeDasharray={2 * Math.PI * R} strokeDashoffset={2 * Math.PI * R * (1 - sm(t, 0.3, Math.max(1.5, m('financien') + 1.5)))} />
        {est.map(([a, n], k) => {
          const [x, y] = pos(a);
          const on = e1(t, 0.4 + k * 0.35);
          return (
            <g key={n} opacity={on}>
              <circle cx={x} cy={y} r={74} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
              {k === 0 && <Persona id={ID} x={x} y={y + 52} s={0.42} />}
              {k === 1 && <Billete x={x} y={y} s={1.1} rot={-8} />}
              {k === 2 && <Megafono x={x - 30} y={y + 18} s={0.55} habla={1} t={t} />}
              {k === 3 && <Persona id={ID} x={x} y={y + 52} s={0.42} cuerpo={AZUL_M} />}
              <Letrero x={x} y={y + (k === 0 ? -112 : 112)} texto={n} id={ID} tam={26} fondo={k === 3 ? AZUL_M : undefined} />
            </g>
          );
        })}
        {[0, 1, 2].map((k) => { const a = giro + k * 120; const [x, y] = pos(a); return <circle key={k} cx={x} cy={y} r={12} fill={AMBAR} opacity={e1(t, m('financien'))} />; })}
      </Toma>

      {/* 2 · La trayectoria: un camino con cuatro hitos */}
      <Toma t={t} a={m('hormozi')} b={m('practicante')} cy={480}>
        <rect x={120} y={612} width={900} height={16} rx={8} fill={c.apagado} />
        <rect x={120} y={612} width={900 * avance} height={16} rx={8} fill={`url(#${ID}-marcaH)`} />
        {hitos.map(([n, x, anio], k) => {
          const on = t >= m(n) - 0.1;
          return (
            <g key={n} opacity={on ? e1(t, m(n)) : 0}>
              <circle cx={x} cy={620} r={22} fill={[NARANJA, ROSA, VIOLETA, AZUL_M][k]} />
              <Txt x={x} y={690} textAnchor="middle" fontSize={34} fill={c.texto} peso={800}>{anio}</Txt>
            </g>
          );
        })}
        {t >= m('gimnasio') && (
          <g opacity={e1(t, m('gimnasio'))}>
            <Edificio x={170} y={580} w={130} h={150} color={NARANJA} />
            <g transform="translate(170 400)"><rect x={-34} y={-6} width={68} height={12} rx={6} fill={c.texto} /><rect x={-46} y={-20} width={16} height={40} rx={5} fill={c.texto} /><rect x={30} y={-20} width={16} height={40} rx={5} fill={c.texto} /></g>
          </g>
        )}
        {t >= m('launch') && (
          <g opacity={e1(t, m('launch'))}>
            <Edificio x={430} y={580} w={150} h={210} color={ROSA} />
            {!movil && <Txt f="a" x={430} y={330} textAnchor="middle" fontSize={26} fill={c.texto}>Gym Launch</Txt>}
            {[0, 1, 2].map((k) => <g key={k} opacity={e1(t, m('negocios') + k * 0.2)}><Edificio x={330 + k * 100} y={300 - (k === 1 ? 30 : 0)} w={52} h={64} color={GRIS} /></g>)}
            {t >= m('negocios') && <Letrero x={430} y={190} texto="Le vende a negocios" id={ID} tam={28} op={e1(t, m('negocios') + 0.4)} />}
          </g>
        )}
        {t >= m('vendio') && (
          <g opacity={e1(t, m('vendio'))} transform="translate(700 470)">
            <circle r={96} fill={c.apagado} />
            <path d={`M 0 0 L 0 -96 A 96 96 0 1 1 ${96 * Math.sin(2 * Math.PI * 0.66 * sm(t, m('vendio'), m('vendio') + 1.2))} ${-96 * Math.cos(2 * Math.PI * 0.66 * sm(t, m('vendio'), m('vendio') + 1.2))} Z`} fill={VIOLETA} />
            <Cifra x={0} y={-118} valor={66} u={sm(t, m('vendio'), m('vendio') + 1.2)} suf=" %" tam={48} color={VIOLETA} />
            <Letrero x={0} y={140} texto="46,2 M US$" fondo={VIOLETA} id={ID} tam={28} op={e1(t, m('vendio') + 0.8)} />
          </g>
        )}
        {t >= m('acquisition') && (
          <g opacity={e1(t, m('acquisition'))}>
            <Edificio x={960} y={580} w={150} h={300} color={AZUL_M} />
            {!movil && <Txt f="a" x={960} y={240} textAnchor="middle" fontSize={26} fill={c.texto}>Acquisition.com</Txt>}
          </g>
        )}
        {ventana(t, m('libros'), m('practicante') + 1) > 0.01 && (
          <g opacity={ventana(t, m('libros'), m('practicante') + 1)}>
            <rect x={0} y={0} width={1200} height={860} fill={c.panel} opacity={0.97} />
            <Libro x={440} y={720} color={NARANJA} titulo="Ofertas" autor="2021" c={c} op={e1(t, m('libros'))} />
            <Libro x={760} y={720} color={ROSA} titulo="Prospectos" autor="2023" c={c} op={e1(t, m('libros') + 0.4)} />
            <Letrero x={600} y={280} texto="$100M Offers · $100M Leads" id={ID} tam={30} op={e1(t, m('libros') + 0.6)} />
          </g>
        )}
      </Toma>

      {/* 3 · Cómo leer el método: práctica con lupa y evidencia que la respalda */}
      <Toma t={t} a={m('practicante')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('practicante'))}>
          {[0, 1, 2].map((k) => <Hoja key={k} x={230 + k * 26} y={430 - k * 18} w={170} h={220} rot={-6 + k * 6} lineas={6} color={NARANJA} />)}
          <Letrero x={260} y={640} texto="Cifras de sus empresas" id={ID} tam={28} />
        </g>
        {t >= m('magnitud') && (
          <g opacity={e1(t, m('magnitud'))} transform={`translate(${lerp(420, 330, sm(t, m('magnitud'), m('magnitud') + 1))} 400)`}>
            <circle r={84} fill="#ffffff" opacity={0.35} /><circle r={84} fill="none" stroke={c.texto} strokeWidth={14} />
            <rect x={56} y={56} width={22} height={90} rx={10} fill={c.texto} transform="rotate(-45 56 56)" />
            <Txt x={0} y={14} textAnchor="middle" fontSize={40} fill={c.texto} peso={800}>≈</Txt>
          </g>
        )}
        {t >= m('magnitud') && <Letrero x={260} y={720} texto="Órdenes de magnitud" fondo={AMBAR} id={ID} tam={28} op={e1(t, m('magnitud') + 0.4)} />}
        {t >= m('pares') && (
          <g opacity={e1(t, m('pares'))}>
            <rect x={640} y={640} width={460} height={20} rx={10} fill={c.apagado} />
            {([['janakiraman', 'Devoluciones', '2016'], ['arkes', 'Precio y compromiso', '1985'], ['schmitt', 'Referidos +16 %', '2011']] as const).map(([n, txt, anio], k) => {
              const u = sm(t, m(n), m(n) + 0.7);
              const y = lerp(140, 600 - k * 128, u);
              return (
                <g key={n} opacity={t >= m(n) - 0.1 ? 1 : 0} transform={`translate(870 ${y})`}>
                  <rect x={-220} y={-56} width={440} height={112} rx={18} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                  <rect x={-220} y={-56} width={14} height={112} rx={7} fill={[VERDE, NARANJA, AZUL_M][k]} />
                  <Txt f="a" x={-186} y={-6} fontSize={30} fill={c.texto}>{txt}</Txt>
                  <Txt f="a" x={-186} y={32} fontSize={24} peso={400} fill={c.tenue}>{anio}</Txt>
                  <Visto x={170} y={0} r={28} op={sm(t, m(n) + 0.6, m(n) + 1)} />
                </g>
              );
            })}
            <Letrero x={870} y={720} texto="Revisado por pares" fondo={VERDE} id={ID} tam={28} op={e1(t, m('pares') + 0.3)} />
          </g>
        )}
        {t >= m('convenciones') && (
          <g opacity={e1(t, m('convenciones'))}>
            <rect x={0} y={0} width={1200} height={860} fill={c.panel} opacity={0.97} />
            <Brujula x={600} y={430} r={140} ang={20 * Math.sin(t * 1.4)} id={ID} />
            <Letrero x={600} y={660} texto="3 a 1: una brújula, no una ley" id={ID} tam={32} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
