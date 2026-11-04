import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Edificio, Engranaje, Calendario, Hoja, Gente, Suelo, PantallaCRM, Visto, Cruz, Hilo, e1, sm, ventana, lerp, escribe, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Táctica: el problema de negocio en una frase.
 * Toma 1 (ejemplo ilustrativo): la empresa de mantenimiento; el gerente en la feria compra un sistema grande; pasan
 * seis meses, los técnicos siguen con cuadernos, los clientes se van; el software funciona, pero falta el problema.
 * Toma 2: la frase se escribe en una hoja; se marcan cliente, momento y resultado; se la lleva al proveedor.
 * Toma 3: la lista de las cinco preguntas, que se marcan; una respuesta vaga queda en rojo.
 */

const ID = 'cp05', P = 'cp-problema';

const LINEAS = ['Perdemos clientes de mantenimiento', 'porque nadie les hace seguimiento', 'después de cada servicio.'];
const PREG = ['¿Qué decisión mejora?', '¿Qué proceso cambia?', '¿Quién lo utiliza?', '¿Qué gana el cliente?', '¿Cómo sabremos que funciona?'];

export const ProblemaCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('empresa'), 'Ejemplo ilustrativo'], [m('grande'), 'Un sistema grande'], [m('seis'), 'Seis meses después'], [m('funciona'), 'El software funciona'],
    [m('falto'), 'Faltó el problema de negocio'], [m('frase'), 'El problema en una frase'], [m('dice'), 'Cliente, momento y resultado'], [m('proveedor'), 'Que el proveedor lo resuelva'],
    [m('cinco'), 'Cinco preguntas básicas'], [m('vaga'), 'Una respuesta vaga'],
  ];
  const camina = sm(t, m('feria'), m('feria') + 1.4);
  const escr = sm(t, m('frase') + 0.2, m('perdemos') + 3.5);
  const PREGM = ['decision', 'proceso', 'quien', 'gana', 'sabremos'];
  const tam = movil ? 34 : 32;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El problema en una frase">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la empresa de mantenimiento */}
      <Toma t={t} a={0} b={m('frase')} cy={540}>
        <Suelo y={752} isDark={isDark} />
        <g opacity={e1(t, m('empresa'))}>
          <Edificio x={150} y={750} w={150} h={250} color="#475569" />
          <Engranaje x={150} y={440} r={40} t={t * 0.5} color={AMBAR} hueco="#475569" />
        </g>
        <Persona id={ID} x={lerp(320, 520, camina)} y={750} s={0.85} corbata cuerpo={VIOLETA} />
        {ventana(t, m('feria'), m('grande') + 0.6) > 0.01 && (
          <g opacity={ventana(t, m('feria'), m('grande') + 0.6)}>
            <rect x={680} y={480} width={380} height={270} rx={14} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
            <path d="M 660 480 L 700 410 H 1040 L 1080 480 Z" fill={NARANJA} />
            <Txt x={870} y={465} textAnchor="middle" fontSize={34} fill="#fff">Feria</Txt>
            <Letrero x={870} y={580} texto="¡Más ventas!" id={ID} tam={28} />
          </g>
        )}
        {t >= m('grande') && <g opacity={e1(t, m('grande') + 0.4)}><PantallaCRM x={880} y={746} n={6} isDark={isDark} t={t} /></g>}
        {t >= m('seis') && <Calendario x={1080} y={250} s={0.8} marcados={Math.min(6, Math.floor((t - m('seis')) * 3))} op={e1(t, m('seis')) * (1 - sm(t, m('funciona') - 0.3, m('funciona')))} />}
        {ventana(t, m('cuadernos'), m('funciona')) > 0.01 && (
          <g opacity={ventana(t, m('cuadernos'), m('funciona'))}>
            <Hoja x={150} y={300} w={110} h={140} rot={-6} lineas={5} />
            <Hoja x={290} y={330} w={110} h={140} rot={5} lineas={5} />
            <Txt f="a" x={220} y={440} textAnchor="middle" fontSize={26} fill={c.texto}>Cuadernos</Txt>
          </g>
        )}
        {t >= m('irse') && t < m('funciona') && <Gente x={1060} y={640} n={3} activos={3} color={ROSA} paso={50} s={0.7} fuera={sm(t, m('irse'), m('irse') + 2)} op={e1(t, m('irse'))} />}
        {t >= m('funciona') && <Visto x={880} y={330} r={40} op={e1(t, m('funciona'))} />}
        {t >= m('falto') && <g opacity={e1(t, m('falto'))}><Txt x={520} y={470 + 8 * Math.sin(t * 3)} textAnchor="middle" fontSize={110} fill={NARANJA}>?</Txt><Letrero x={600} y={812} texto="¿Qué problema de negocio?" fondo={ROSA} id={ID} tam={28} /></g>}
      </Toma>

      {/* 2 · la frase */}
      <Toma t={t} a={m('frase')} b={m('cinco')} cy={480}>
        <rect x={110} y={210} width={980} height={330} rx={26} fill={c.panel} style={sombra(c.sombra, 6, 16)} opacity={e1(t, m('frase'))} />
        <rect x={110} y={210} width={16} height={330} rx={8} fill={`url(#${ID}-marca)`} opacity={e1(t, m('frase'))} />
        {LINEAS.map((ln, k) => {
          const ini = k / 3, u = sm(escr, ini, ini + 1 / 3);
          return <Txt key={k} f="a" x={160} y={300 + k * 82} fontSize={44} fill={c.texto}>{escribe(ln, u)}</Txt>;
        })}
        {t >= m('dice') && (['Cliente', 'Momento', 'Resultado'] as const).map((n, k) => (
          <Letrero key={n} x={250 + k * 350} y={620} texto={n} fondo={[AZUL_M, VERDE, NARANJA][k]} id={ID} tam={28} op={e1(t, m('dice') + 0.5 * k)} />
        ))}
        {ventana(t, m('listo'), m('proveedor')) > 0.01 && <Letrero x={600} y={760} texto="Sin esta frase, no compres" fondo={ROSA} id={ID} tam={28} op={ventana(t, m('listo'), m('proveedor'))} />}
        {t >= m('proveedor') && (
          <g opacity={e1(t, m('proveedor'))}>
            <Persona id={ID} x={1060} y={830} s={0.55} corbata cuerpo="#334155" />
            <Hilo x1={780} y1={760} x2={990} y2={720} u={sm(t, m('proveedor'), m('proveedor') + 0.9)} id={ID} grosor={5} />
            <Letrero x={420} y={760} texto="¿Cómo resuelves esto?" id={ID} tam={28} />
          </g>
        )}
      </Toma>

      {/* 3 · las cinco preguntas */}
      <Toma t={t} a={m('cinco')} b={fin + 1} cy={480}>
        <rect x={200} y={150} width={800} height={560} rx={26} fill={c.panel} style={sombra(c.sombra, 6, 16)} opacity={e1(t, m('cinco'))} />
        <rect x={520} y={128} width={160} height={44} rx={14} fill={GRIS} opacity={e1(t, m('cinco'))} />
        {PREG.map((q, k) => {
          const on = t >= m(PREGM[k]);
          const vaga = k === 2 && t >= m('vaga');
          const y = 240 + k * 100;
          return (
            <g key={q} opacity={e1(t, m('cinco') + 0.15 * k)}>
              <rect x={240} y={y - 32} width={44} height={44} rx={10} fill={vaga ? ROSA : on ? VERDE : c.panel2} />
              {on && !vaga && <path d={`M ${250} ${y - 10} L ${260} ${y + 2} L ${276} ${y - 20}`} stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />}
              {vaga && <path d={`M 250 ${y - 10} Q 256 ${y - 22} 262 ${y - 10} T 274 ${y - 10}`} stroke="#fff" strokeWidth={5} fill="none" />}
              <Txt f="a" x={310} y={y} fontSize={tam} fill={vaga ? ROSA : on ? c.texto : c.tenue}>{q}</Txt>
            </g>
          );
        })}
        {t >= m('vaga') && <Letrero x={600} y={790} texto="Una respuesta vaga: no está maduro" fondo={ROSA} id={ID} tam={28} op={e1(t, m('vaga'))} />}
        {t >= m('vaga') && <Cruz x={940} y={440} r={24} op={e1(t, m('vaga') + 0.3)} />}
      </Toma>
    </Lienzo>
  );
};
