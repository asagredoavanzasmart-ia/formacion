import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Semaforo, Paso, Hoja, Reloj, Bandera, Sello, Dial, Lista, Termometro, Lupa, Visto, Suelo, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * Cuándo sí y cuándo no. Toma 1: un semáforo; en verde, cuatro momentos para hablar; en rojo, cinco para esperar, y
 * se destaca la preferencia personal. Toma 2: Sarah hace malabares con tres carpetas y llega a la meta justo antes del
 * plazo; a ti te estresa; el sello «tu estilo» baja el medidor de credibilidad. Toma 3: lo que se puede cambiar
 * (herramientas) frente a lo que cambia poco (rasgos), y el protocolo concreto. Toma 4: primero los hechos y que bajen
 * las emociones; pronto, pero no a la carrera.
 */

const ID = 'fb05', P = 'fb-cuando';

export const CuandoFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('mitad'), 'Elegir el momento'], [m('conviene'), 'Conviene hablar'], [m('esperar'), 'Conviene esperar'], [m('traicionero'), 'El más traicionero'],
    [m('sarah'), 'Sarah y su ritmo'], [m('imponiendo'), 'Imponer tu estilo'], [m('cambiar'), '¿Se puede cambiar?'], [m('protocolo'), 'Pide una conducta concreta'],
    [m('momento'), 'Pronto, no a la carrera'],
  ];
  const SI = ['Reconocer', 'Se usará pronto', 'Ya lo espera', 'Afecta al equipo'];
  const NO = ['Falta información', 'Momento difícil', 'Sin calma', 'Sin solución', 'Tu preferencia'];
  const luz = 0.5 + 0.5 * sm(t, m('conviene') - 0.2, m('conviene') + 0.4) - sm(t, m('esperar') - 0.2, m('esperar') + 0.4);
  const avance = sm(t, m('sarah') + 0.5, m('sarah') + 4);
  const cred = 0.85 - 0.6 * sm(t, m('imponiendo') + 1, m('imponiendo') + 2.2);
  const calma = sm(t, m('hechos') + 0.8, m('hechos') + 2.5);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Cuándo sí y cuándo no">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · el semáforo */}
      <TomaFB t={t} a={0} b={m('sarah')} cy={470}>
        <Semaforo x={600} y={560} v={luz} s={1.1} />
        {SI.map((txt, k) => <Paso key={k} x={60} y={230 + k * 105} w={440} texto={txt} color={VERDE} c={c} op={e1(t, m('conviene') + k * 0.7)} tam={28} />)}
        {NO.map((txt, k) => {
          const clave = k === 4;
          const foco = clave ? sm(t, m('traicionero'), m('traicionero') + 0.6) : 0;
          const o = e1(t, k === 4 ? m('preferencia') : m('esperar') + k * 0.7) * (clave ? 1 : 1 - 0.5 * sm(t, m('traicionero'), m('traicionero') + 0.6));
          return (
            <g key={k} transform={clave ? `translate(${700 + 220} ${190 + k * 95}) scale(${1 + 0.08 * foco}) translate(${-920} ${-(190 + k * 95)})` : undefined}>
              <Paso x={700} y={190 + k * 95} w={440} texto={txt} color={ROJO_M} c={c} op={o} tam={28} />
            </g>
          );
        })}
      </TomaFB>

      {/* 2 · Sarah */}
      <TomaFB t={t} a={m('sarah')} b={m('cambiar')} cy={480}>
        <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
        <Persona id={ID} x={300} y={720} s={1.05} cuerpo={VIOLETA} />
        {[0, 1, 2].map((k) => { const a = t * 2.2 + (k * 2 * Math.PI) / 3; return <Hoja key={k} x={300 + 110 * Math.cos(a)} y={430 + 40 * Math.sin(a)} w={50} h={64} color={[AZUL_M, VERDE, NARANJA][k]} rot={a * 20} />; })}
        <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Sarah</Txt>
        <Reloj x={130} y={300} r={50} t={t * 5} />
        {/* barra de avance hacia el plazo */}
        <rect x={480} y={260} width={520} height={30} rx={15} fill={c.apagado} />
        <rect x={480} y={260} width={500 * avance} height={30} rx={15} fill={VERDE} />
        <Bandera x={1000} y={290} alto={110} color={ROJO_M} t={t} />
        <Txt x={1000} y={330} textAnchor="middle" fontSize={26} fill={c.texto}>Plazo</Txt>
        {t >= m('estresaria') && (
          <g opacity={e1(t, m('estresaria'))}>
            <Persona id={ID} x={860} y={720} s={1.05} cuerpo={NARANJA} ojos={0.4} />
            {[0, 1].map((k) => <path key={k} d={`M ${830 + k * 60} ${520 - ((t * 40 + k * 20) % 30)} q 8 14 0 22 q -8 -8 0 -22`} fill="#60a5fa" />)}
            <Txt x={860} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Tú</Txt>
          </g>
        )}
        {t >= m('tiempo') && <Letrero x={740} y={380} texto="A tiempo y bien hecho" fondo={VERDE} id={ID} tam={28} op={vent(t, m('tiempo'), m('imponiendo') + 0.2)} />}
        {t >= m('imponiendo') && (
          <g opacity={e1(t, m('imponiendo'))}>
            <Sello x={600} y={420} texto="TU ESTILO" u={sm(t, m('imponiendo'), m('imponiendo') + 0.6)} tam={40} />
            <Dial x={600} y={610} v={cred} texto="Credibilidad" c={c} id={ID} r={60} color={cred > 0.5 ? VERDE : ROJO_M} />
          </g>
        )}
      </TomaFB>

      {/* 3 · lo que se puede cambiar */}
      <TomaFB t={t} a={m('cambiar')} b={m('momento')} cy={470}>
        {[['habilidades', 'Se puede cambiar', ['Habilidades', 'Gestión del tiempo', 'Conocimiento'], VERDE, 320], ['actitudes', 'Cambia poco', ['Actitudes', 'Hábitos', 'Personalidad'], GRIS, 880]].map(([n, tit, items, col, x], k) => {
          const o = e1(t, m(n as string));
          const atenua = k === 1 ? 1 - sm(t, m('protocolo') - 0.1, m('protocolo') + 0.4) : 1;
          return o > 0.01 ? (
            <g key={k} opacity={o * atenua}>
              <rect x={(x as number) - 230} y={170} width={460} height={420} rx={28} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }} />
              <rect x={(x as number) - 230} y={170} width={460} height={70} rx={28} fill={col as string} />
              <Txt x={x as number} y={218} textAnchor="middle" fontSize={32} fill="#fff">{tit as string}</Txt>
              {(items as string[]).map((it, j) => <Txt key={j} x={x as number} y={320 + j * 90} textAnchor="middle" fontSize={32} fill={c.texto} opacity={e1(t, m(n as string) + 0.4 + j * 0.5)}>{it}</Txt>)}
            </g>
          ) : null;
        })}
        {t >= m('protocolo') && (
          <g opacity={e1(t, m('protocolo') + 0.4)}>
            <Lista x={880} y={400} s={0.9} titulo="Coordinación" n={3} hechos={Math.min(3, Math.floor(Math.max(0, t - m('protocolo') - 0.6) * 2))} c={c} />
            <Letrero x={600} y={690} texto="Un protocolo concreto" id={ID} tam={30} />
          </g>
        )}
      </TomaFB>

      {/* 4 · el momento */}
      <TomaFB t={t} a={m('momento')} b={fin + 1} cy={470}>
        <path d="M 160 520 L 1040 520" stroke={c.apagado} strokeWidth={10} strokeLinecap="round" />
        <path d="M 160 520 L 1040 520" stroke={`url(#${ID}-marcaH)`} strokeWidth={10} strokeLinecap="round" strokeDasharray={880} strokeDashoffset={880 * (1 - sm(t, m('momento'), m('hechos') + 3))} />
        <g opacity={e1(t, m('momento'))}>
          <Txt x={160} y={600} textAnchor="middle" fontSize={28} fill={c.texto}>Ocurre</Txt>
          <circle cx={160} cy={520} r={18} fill={NARANJA} />
        </g>
        {t >= m('hechos') && (
          <g opacity={e1(t, m('hechos'))}>
            <Lupa x={460} y={360} r={70} c={c} id={ID} clip={`${ID}-lupa`}><Hoja x={0} y={0} w={60} h={80} /></Lupa>
            <Txt x={460} y={600} textAnchor="middle" fontSize={28} fill={c.texto}>Los hechos</Txt>
            <Termometro x={760} y={440} alto={260} v={1 - 0.7 * calma} color={calma > 0.5 ? AZUL_M : ROJO_M} c={c} />
            <Txt x={760} y={600} textAnchor="middle" fontSize={28} fill={c.texto}>Calma</Txt>
            <circle cx={1040} cy={520} r={22} fill={VERDE} opacity={sm(t, m('hechos') + 2.5, m('hechos') + 3)} />
            <Txt x={1040} y={600} textAnchor="middle" fontSize={28} fill={c.texto} opacity={sm(t, m('hechos') + 2.5, m('hechos') + 3)}>Hablar</Txt>
          </g>
        )}
        {!movil && <Txt f="a" x={600} y={700} textAnchor="middle" fontSize={22} fill={GRIS} opacity={e1(t, m('momento') + 0.5)}>Pronto, pero no a la carrera</Txt>}
      </TomaFB>
    </Lienzo>
  );
};
